/**
 * Memory Fabric Integration
 * Wave 4A.1 - Longitudinal Drift Detection
 * 
 * Integrates drift observations into Memory Fabric for time-indexed, queryable access.
 */

import { randomUUID } from 'crypto';
import {
  DriftObservation,
  DriftComputation,
  DriftClassificationResult,
  ExecutionContext,
  TimeWindow,
  StabilityMetrics,
  DriftClassification,
} from '@/types/longitudinal';
import { writeMemory, readMemory } from '@/lib/foreman/memory/storage';

/**
 * Convert trend string to numeric value for storage
 */
function trendToValue(trend: 'increasing' | 'stable' | 'decreasing'): number {
  return trend === 'increasing' ? 1 : trend === 'decreasing' ? -1 : 0;
}

/**
 * Convert stability trend to numeric value for storage
 */
function stabilityTrendToValue(trend: 'improving' | 'stable' | 'degrading'): number {
  return trend === 'improving' ? 1 : trend === 'degrading' ? -1 : 0;
}

/**
 * Store drift observation in Memory Fabric
 */
export async function storeDriftObservation(observation: {
  driftId: string;
  computation: DriftComputation;
  classification: DriftClassificationResult;
  context: ExecutionContext;
}): Promise<void> {
  const driftObservation: DriftObservation = {
    id: observation.driftId,
    timestamp: observation.context.timestamp,
    oldSignatureId: observation.computation.oldSignatureId,
    newSignatureId: observation.computation.newSignatureId,
    computation: observation.computation,
    classification: observation.classification.classification,
    classificationConfidence: observation.classification.confidence,
    supportingMetrics: {
      averageChurnRate: observation.classification.supportingMetrics.averageChurnRate,
      violationTrendValue: trendToValue(observation.classification.supportingMetrics.violationTrend),
      stabilityTrendValue: stabilityTrendToValue(observation.classification.supportingMetrics.stabilityTrend),
    },
    context: observation.context,
  };

  await writeMemory({
    scope: 'foreman',
    key: `longitudinal.drift.${observation.context.timestamp}.${observation.driftId}`,
    value: {
      type: 'longitudinal_drift_observation',
      description: `Drift observation: ${observation.classification.classification}`,
      data: driftObservation,
    },
    tags: [
      'longitudinal_drift',
      'observe_only',
      observation.classification.classification.toLowerCase(),
      observation.context.sourceType,
    ],
    createdBy: 'longitudinal-drift-monitor',
  });
}

/**
 * Query drift observations over time
 */
export async function queryDriftObservations(query: {
  window?: TimeWindow;
  classification?: DriftClassification;
  sourceType?: 'commit' | 'pr' | 'wave';
  limit?: number;
}): Promise<DriftObservation[]> {
  try {
    // Query memory fabric
    const memoryResult = await readMemory({
      scope: 'foreman',
      tags: ['longitudinal_drift'],
    });

    if (!memoryResult.entries || memoryResult.entries.length === 0) {
      return [];
    }

    let observations: DriftObservation[] = memoryResult.entries
      .map(entry => entry.value.data as DriftObservation)
      .filter(obs => obs !== null && obs !== undefined);

    // Apply filters
    if (query.classification) {
      observations = observations.filter(obs => obs.classification === query.classification);
    }

    if (query.sourceType) {
      observations = observations.filter(obs => obs.context.sourceType === query.sourceType);
    }

    // Apply time window filter
    if (query.window) {
      const now = Date.now();
      
      if (query.window.type === 'days' && typeof query.window.value === 'number') {
        const cutoff = now - query.window.value * 24 * 60 * 60 * 1000;
        observations = observations.filter(obs => 
          new Date(obs.timestamp).getTime() >= cutoff
        );
      } else if (query.window.type === 'commits' && typeof query.window.value === 'number') {
        // For commits, just limit the result set
        observations = observations.slice(0, query.window.value);
      } else if (query.window.type === 'custom' && typeof query.window.value === 'object') {
        const { start, end } = query.window.value;
        observations = observations.filter(obs => {
          const obsTime = new Date(obs.timestamp).getTime();
          return obsTime >= start.getTime() && obsTime <= end.getTime();
        });
      }
    }

    // Sort by timestamp (newest first)
    observations.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Apply limit
    if (query.limit) {
      observations = observations.slice(0, query.limit);
    }

    return observations;
  } catch (error) {
    console.error('[Longitudinal] Error querying drift observations:', error);
    return [];
  }
}

/**
 * Get stability metrics for a time period
 */
export async function getStabilityMetrics(period: {
  start: Date;
  end: Date;
}): Promise<StabilityMetrics> {
  try {
    const observations = await queryDriftObservations({
      window: {
        type: 'custom',
        value: { start: period.start, end: period.end },
      },
    });

    if (observations.length === 0) {
      return {
        period: {
          start: period.start.toISOString(),
          end: period.end.toISOString(),
        },
        signatureCount: 0,
        driftObservationCount: 0,
        overallClassification: 'Stable',
        trends: {
          structuralChurn: 'stable',
          violations: 'stable',
          stability: 'stable',
        },
        topConstraintsStressed: [],
      };
    }

    // Count classifications
    const classificationCounts = {
      Stable: 0,
      Gradual: 0,
      Accelerating: 0,
      Regressive: 0,
    };

    for (const obs of observations) {
      classificationCounts[obs.classification]++;
    }

    // Determine overall classification (most common)
    let overallClassification: DriftClassification = 'Stable';
    let maxCount = 0;

    for (const [classification, count] of Object.entries(classificationCounts)) {
      if (count > maxCount) {
        maxCount = count;
        overallClassification = classification as DriftClassification;
      }
    }

    // Calculate trends
    const firstHalf = observations.slice(Math.floor(observations.length / 2));
    const secondHalf = observations.slice(0, Math.floor(observations.length / 2));

    const firstHalfChurn = firstHalf.length > 0
      ? firstHalf.reduce((sum, obs) => sum + (obs.supportingMetrics.averageChurnRate || 0), 0) / firstHalf.length
      : 0;

    const secondHalfChurn = secondHalf.length > 0
      ? secondHalf.reduce((sum, obs) => sum + (obs.supportingMetrics.averageChurnRate || 0), 0) / secondHalf.length
      : 0;

    const structuralChurn: 'increasing' | 'stable' | 'decreasing' = 
      secondHalfChurn > firstHalfChurn * 1.2 ? 'increasing' :
      secondHalfChurn < firstHalfChurn * 0.8 ? 'decreasing' :
      'stable';

    const firstHalfViolations = firstHalf.filter(obs => 
      (obs.supportingMetrics.violationTrendValue || 0) > 0
    ).length;

    const secondHalfViolations = secondHalf.filter(obs => 
      (obs.supportingMetrics.violationTrendValue || 0) > 0
    ).length;

    const violations: 'increasing' | 'stable' | 'decreasing' = 
      secondHalfViolations > firstHalfViolations * 1.2 ? 'increasing' :
      secondHalfViolations < firstHalfViolations * 0.8 ? 'decreasing' :
      'stable';

    const firstHalfStability = firstHalf.filter(obs => 
      (obs.supportingMetrics.stabilityTrendValue || 0) > 0
    ).length;

    const secondHalfStability = secondHalf.filter(obs => 
      (obs.supportingMetrics.stabilityTrendValue || 0) > 0
    ).length;

    const stability: 'improving' | 'stable' | 'degrading' = 
      secondHalfStability > firstHalfStability * 1.2 ? 'improving' :
      secondHalfStability < firstHalfStability * 0.8 ? 'degrading' :
      'stable';

    // Count unique signatures
    const uniqueSignatures = new Set<string>();
    observations.forEach(obs => {
      uniqueSignatures.add(obs.oldSignatureId);
      uniqueSignatures.add(obs.newSignatureId);
    });

    return {
      period: {
        start: period.start.toISOString(),
        end: period.end.toISOString(),
      },
      signatureCount: uniqueSignatures.size,
      driftObservationCount: observations.length,
      overallClassification,
      trends: {
        structuralChurn,
        violations,
        stability,
      },
      topConstraintsStressed: [], // Would need constraint stress analysis data
    };
  } catch (error) {
    console.error('[Longitudinal] Error getting stability metrics:', error);
    return {
      period: {
        start: period.start.toISOString(),
        end: period.end.toISOString(),
      },
      signatureCount: 0,
      driftObservationCount: 0,
      overallClassification: 'Stable',
      trends: {
        structuralChurn: 'stable',
        violations: 'stable',
        stability: 'stable',
      },
      topConstraintsStressed: [],
    };
  }
}
