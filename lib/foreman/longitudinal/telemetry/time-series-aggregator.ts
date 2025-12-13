/**
 * Time-Series Aggregator
 * Wave 4A.2 - Drift Telemetry & Time-Series Reporting
 * 
 * Query and aggregate drift observations across time windows for trend analysis.
 * MUST be deterministic and reproducible.
 */

import {
  TimeWindow,
  DriftObservation,
  DriftClassification,
  PersistedSignature,
} from '@/types/longitudinal';
import {
  TimeSeriesTelemetry,
  DriftDirection,
  SubsystemAttribution,
  ConstraintTrend,
  EdgeCaseClassification,
} from '@/types/telemetry';
import { queryDriftObservations } from '@/lib/foreman/longitudinal/memory-integration';
import { getHistoricalSignatures } from '@/lib/foreman/longitudinal/signature-persistence';

/**
 * Get time-series telemetry for a specific time window
 * MUST be deterministic and reproducible
 */
export async function getTimeSeriesTelemetry(params: {
  window: TimeWindow;
  subsystem?: string;
  category?: 'structural' | 'contract' | 'governance';
}): Promise<TimeSeriesTelemetry> {
  try {
    // Query drift observations
    const observations = await queryDriftObservations({
      window: params.window,
      limit: params.window.type === 'commits' && typeof params.window.value === 'number' 
        ? params.window.value 
        : undefined,
    });

    // Query signatures for the window
    let signatureQuery: any = {};
    
    if (params.window.type === 'commits' && typeof params.window.value === 'number') {
      signatureQuery.limit = params.window.value;
    } else if (params.window.type === 'custom' && typeof params.window.value === 'object') {
      signatureQuery.since = new Date(params.window.value.start);
      signatureQuery.until = new Date(params.window.value.end);
    } else {
      signatureQuery.limit = 100;
    }
    
    const signatures = await getHistoricalSignatures(signatureQuery);

    // Build time-series data points
    const series = observations.map(obs => {
      const magnitude = calculateDriftMagnitude(obs);
      
      return {
        timestamp: obs.timestamp,
        sourceType: obs.context.sourceType,
        sourceId: obs.context.sourceId,
        
        drift: {
          magnitude,
          classification: obs.classification,
          confidence: obs.classificationConfidence,
        },
        
        categories: {
          structural: {
            churnRate: obs.computation.metrics.structuralChurnRate,
            modulesChanged: obs.computation.structuralChanges.modulesAdded.length +
                          obs.computation.structuralChanges.modulesRemoved.length +
                          obs.computation.structuralChanges.modulesModified.length,
          },
          contract: {
            stabilityScore: obs.computation.metrics.contractStabilityScore,
            changesCount: obs.computation.contractChanges.apisChanged +
                        obs.computation.contractChanges.typesChanged +
                        obs.computation.contractChanges.eventsChanged,
          },
          governance: {
            alignmentScore: obs.computation.metrics.governanceAlignmentScore,
            constraintsChanged: obs.computation.governanceChanges.constraintsAdded.length +
                              obs.computation.governanceChanges.constraintsRemoved.length,
          },
        },
      };
    });

    // Calculate summary metrics
    const driftMagnitudes = series.map(s => s.drift.magnitude);
    const averageDrift = driftMagnitudes.length > 0
      ? driftMagnitudes.reduce((sum, m) => sum + m, 0) / driftMagnitudes.length
      : 0;
    const peakDrift = driftMagnitudes.length > 0 ? Math.max(...driftMagnitudes) : 0;
    const minDrift = driftMagnitudes.length > 0 ? Math.min(...driftMagnitudes) : 0;
    
    // Calculate volatility (standard deviation)
    const volatility = calculateVolatility(driftMagnitudes, averageDrift);
    
    // Determine overall direction
    const overallDirection = determineOverallDirection(series, volatility);

    // Detect edge cases
    const telemetry: TimeSeriesTelemetry = {
      window: {
        type: params.window.type,
        value: typeof params.window.value === 'object' && 'start' in params.window.value
          ? { 
              start: params.window.value.start instanceof Date 
                ? params.window.value.start.toISOString()
                : params.window.value.start, 
              end: params.window.value.end instanceof Date
                ? params.window.value.end.toISOString()
                : params.window.value.end
            }
          : params.window.value,
        signatureCount: signatures.length,
        observationCount: observations.length,
      },
      series,
      summary: {
        overallDirection,
        averageDrift,
        peakDrift,
        minDrift,
        volatility,
      },
      edgeCases: [],
      infrastructureGaps: [],
    };

    // Detect edge cases
    telemetry.edgeCases = detectEdgeCases({ telemetry });

    // Check for infrastructure gaps
    if (signatures.length < 3) {
      telemetry.infrastructureGaps.push({
        type: 'insufficient_historical_data',
        description: 'Less than 3 signatures available for trend analysis',
        severity: 'medium',
      });
    }

    return telemetry;
  } catch (error) {
    console.error('[Telemetry] Error getting time-series telemetry:', error);
    
    // Return minimal telemetry on error
    return {
      window: {
        type: params.window.type,
        value: typeof params.window.value === 'object' && 'start' in params.window.value
          ? { 
              start: params.window.value.start instanceof Date
                ? params.window.value.start.toISOString()
                : params.window.value.start, 
              end: params.window.value.end instanceof Date
                ? params.window.value.end.toISOString()
                : params.window.value.end
            }
          : params.window.value,
        signatureCount: 0,
        observationCount: 0,
      },
      series: [],
      summary: {
        overallDirection: 'stable',
        averageDrift: 0,
        peakDrift: 0,
        minDrift: 0,
        volatility: 0,
      },
      edgeCases: [{
        type: 'unclassifiable',
        severity: 'error',
        description: 'Failed to generate telemetry',
        affectedObservations: [],
        recommendation: 'Check system logs for error details',
      }],
      infrastructureGaps: [],
    };
  }
}

/**
 * Analyze drift direction over time
 * Returns improving/degrading/oscillating classification
 */
export async function getDriftDirection(params: {
  window: TimeWindow;
  subsystem?: string;
}): Promise<DriftDirection> {
  try {
    const telemetry = await getTimeSeriesTelemetry(params);
    
    if (telemetry.series.length < 2) {
      return {
        direction: 'stable',
        confidence: 0.5,
        trend: {
          slopeDirection: 'flat',
          slopeValue: 0,
          volatility: 0,
        },
        periods: {
          improving: 0,
          degrading: 0,
          stable: 1,
        },
        rationale: 'Insufficient data for trend analysis',
      };
    }

    // Calculate trend slope
    const magnitudes = telemetry.series.map(s => s.drift.magnitude);
    const slope = calculateTrendSlope(magnitudes);
    const slopeDirection: 'upward' | 'downward' | 'flat' = 
      slope > 0.01 ? 'upward' : 
      slope < -0.01 ? 'downward' : 
      'flat';

    // Count period classifications
    const improving = telemetry.series.filter(s => 
      s.drift.classification === 'Stable' || 
      (s.drift.magnitude < telemetry.summary.averageDrift * 0.8)
    ).length;
    
    const degrading = telemetry.series.filter(s => 
      s.drift.classification === 'Regressive' || 
      (s.drift.magnitude > telemetry.summary.averageDrift * 1.5)
    ).length;
    
    const stable = telemetry.series.length - improving - degrading;

    // Determine direction
    let direction: 'improving' | 'degrading' | 'oscillating' | 'stable';
    let confidence: number;
    let rationale: string;

    if (telemetry.summary.volatility > 0.5) {
      direction = 'oscillating';
      confidence = 0.8;
      rationale = 'High volatility indicates oscillating drift pattern';
    } else if (slopeDirection === 'downward') {
      direction = 'improving';
      confidence = 0.85;
      rationale = 'Drift magnitude is decreasing over time';
    } else if (slopeDirection === 'upward') {
      direction = 'degrading';
      confidence = 0.85;
      rationale = 'Drift magnitude is increasing over time';
    } else {
      direction = 'stable';
      confidence = 0.9;
      rationale = 'Drift magnitude remains relatively constant';
    }

    return {
      direction,
      confidence,
      trend: {
        slopeDirection,
        slopeValue: slope,
        volatility: telemetry.summary.volatility,
      },
      periods: {
        improving,
        degrading,
        stable,
      },
      rationale,
    };
  } catch (error) {
    console.error('[Telemetry] Error analyzing drift direction:', error);
    return {
      direction: 'stable',
      confidence: 0.3,
      trend: {
        slopeDirection: 'flat',
        slopeValue: 0,
        volatility: 0,
      },
      periods: {
        improving: 0,
        degrading: 0,
        stable: 0,
      },
      rationale: 'Error analyzing drift direction',
    };
  }
}

/**
 * Get subsystem-level attribution
 * Shows which subsystems are stable vs unstable
 */
export async function getSubsystemAttribution(params: {
  window: TimeWindow;
}): Promise<SubsystemAttribution[]> {
  try {
    const observations = await queryDriftObservations({
      window: params.window,
    });

    if (observations.length === 0) {
      return [];
    }

    // Group observations by subsystem (extract from structural changes)
    const subsystemMap = new Map<string, DriftObservation[]>();
    
    for (const obs of observations) {
      // Collect all subsystems mentioned in structural changes
      const subsystems = new Set<string>();
      
      for (const moduleName of obs.computation.structuralChanges.modulesAdded) {
        subsystems.add(extractSubsystem(moduleName));
      }
      for (const moduleName of obs.computation.structuralChanges.modulesRemoved) {
        subsystems.add(extractSubsystem(moduleName));
      }
      for (const moduleName of obs.computation.structuralChanges.modulesModified) {
        subsystems.add(extractSubsystem(moduleName));
      }
      
      // If no subsystems found, use a default
      if (subsystems.size === 0) {
        subsystems.add('core');
      }
      
      for (const subsystem of subsystems) {
        if (!subsystemMap.has(subsystem)) {
          subsystemMap.set(subsystem, []);
        }
        subsystemMap.get(subsystem)!.push(obs);
      }
    }

    // Build attribution for each subsystem
    const attributions: SubsystemAttribution[] = [];
    
    for (const [subsystem, subsystemObs] of subsystemMap) {
      const churnRates = subsystemObs.map(o => o.computation.metrics.structuralChurnRate);
      const averageChurn = churnRates.reduce((sum, c) => sum + c, 0) / churnRates.length;
      
      const violationCount = subsystemObs.filter(o => 
        o.computation.governanceChanges.constraintsAdded.length > 0
      ).length;
      
      const changeFrequency = subsystemObs.length / observations.length;
      
      // Classify stability
      let classification: 'stable' | 'unstable' | 'improving' | 'degrading';
      let confidence: number;
      
      if (averageChurn < 0.05 && violationCount === 0) {
        classification = 'stable';
        confidence = 0.9;
      } else if (averageChurn > 0.2 || violationCount > 2) {
        classification = 'unstable';
        confidence = 0.85;
      } else {
        // Check trend
        const firstHalf = subsystemObs.slice(0, Math.floor(subsystemObs.length / 2));
        const secondHalf = subsystemObs.slice(Math.floor(subsystemObs.length / 2));
        
        const firstHalfChurn = firstHalf.length > 0
          ? firstHalf.reduce((sum, o) => sum + o.computation.metrics.structuralChurnRate, 0) / firstHalf.length
          : 0;
        
        const secondHalfChurn = secondHalf.length > 0
          ? secondHalf.reduce((sum, o) => sum + o.computation.metrics.structuralChurnRate, 0) / secondHalf.length
          : 0;
        
        if (secondHalfChurn < firstHalfChurn * 0.8) {
          classification = 'improving';
          confidence = 0.75;
        } else if (secondHalfChurn > firstHalfChurn * 1.2) {
          classification = 'degrading';
          confidence = 0.75;
        } else {
          classification = 'stable';
          confidence = 0.7;
        }
      }
      
      // Determine trend
      const trend: 'improving' | 'degrading' | 'stable' = 
        classification === 'improving' ? 'improving' :
        classification === 'degrading' ? 'degrading' :
        'stable';
      
      attributions.push({
        subsystem,
        stability: {
          classification,
          confidence,
          metrics: {
            averageChurn,
            changeFrequency,
            violationCount,
          },
        },
        observations: subsystemObs.map(o => ({
          timestamp: o.timestamp,
          churn: o.computation.metrics.structuralChurnRate,
          violated: o.computation.governanceChanges.constraintsAdded.length > 0,
        })),
        trend,
      });
    }

    // Sort by instability (most unstable first)
    attributions.sort((a, b) => {
      const scoreA = a.stability.metrics.averageChurn + (a.stability.metrics.violationCount * 0.1);
      const scoreB = b.stability.metrics.averageChurn + (b.stability.metrics.violationCount * 0.1);
      return scoreB - scoreA;
    });

    return attributions;
  } catch (error) {
    console.error('[Telemetry] Error getting subsystem attribution:', error);
    return [];
  }
}

/**
 * Get constraint stress trends
 */
export async function getConstraintTrends(params: {
  window: TimeWindow;
  constraintId?: string;
}): Promise<ConstraintTrend[]> {
  try {
    const observations = await queryDriftObservations({
      window: params.window,
    });

    if (observations.length === 0) {
      return [];
    }

    // Group observations by constraint
    const constraintMap = new Map<string, DriftObservation[]>();
    
    for (const obs of observations) {
      for (const constraint of obs.computation.governanceChanges.constraintsAdded) {
        if (!constraintMap.has(constraint)) {
          constraintMap.set(constraint, []);
        }
        constraintMap.get(constraint)!.push(obs);
      }
    }

    // Build trends for each constraint
    const trends: ConstraintTrend[] = [];
    
    for (const [constraintId, constraintObs] of constraintMap) {
      // Filter if specific constraint requested
      if (params.constraintId && constraintId !== params.constraintId) {
        continue;
      }
      
      const totalViolations = constraintObs.length;
      const violationRate = totalViolations / observations.length;
      
      // Determine trend
      const firstHalf = constraintObs.slice(0, Math.floor(constraintObs.length / 2));
      const secondHalf = constraintObs.slice(Math.floor(constraintObs.length / 2));
      
      const trend: 'increasing' | 'stable' | 'decreasing' = 
        secondHalf.length > firstHalf.length * 1.2 ? 'increasing' :
        secondHalf.length < firstHalf.length * 0.8 ? 'decreasing' :
        'stable';
      
      // Build timeline
      const timeline = constraintObs.map(o => ({
        timestamp: o.timestamp,
        violated: true,
        severity: violationRate > 0.5 ? 'high' as const : 
                 violationRate > 0.2 ? 'medium' as const : 
                 'low' as const,
      }));
      
      // Predict next period risk
      const nextPeriodRisk: 'low' | 'medium' | 'high' = 
        trend === 'increasing' ? 'high' :
        trend === 'stable' && violationRate > 0.3 ? 'medium' :
        'low';
      
      const rationale = 
        trend === 'increasing' ? 'Violation frequency is increasing' :
        trend === 'decreasing' ? 'Violation frequency is decreasing' :
        violationRate > 0.3 ? 'Consistent violation rate above 30%' :
        'Low and stable violation rate';
      
      trends.push({
        constraintId,
        stress: {
          totalViolations,
          violationRate,
          trend,
        },
        timeline,
        prediction: {
          nextPeriodRisk,
          rationale,
        },
      });
    }

    // Sort by risk (highest risk first)
    trends.sort((a, b) => {
      const riskScore = { high: 3, medium: 2, low: 1 };
      return riskScore[b.prediction.nextPeriodRisk] - riskScore[a.prediction.nextPeriodRisk];
    });

    return trends;
  } catch (error) {
    console.error('[Telemetry] Error getting constraint trends:', error);
    return [];
  }
}

/**
 * Detect and classify edge cases in telemetry data
 */
export function detectEdgeCases(params: {
  telemetry: TimeSeriesTelemetry;
}): EdgeCaseClassification[] {
  const edgeCases: EdgeCaseClassification[] = [];
  const { telemetry } = params;
  
  // 1. Sparse or early historical data
  if (telemetry.window.signatureCount < 3) {
    edgeCases.push({
      type: 'sparse_data',
      severity: 'info',
      description: 'Insufficient historical data for trend analysis',
      affectedObservations: [],
      recommendation: 'Continue monitoring. Trend confidence will improve with more data.',
    });
  }
  
  // 2. Sudden spikes
  const driftValues = telemetry.series.map(s => s.drift.magnitude);
  if (driftValues.length > 0) {
    const avgDrift = telemetry.summary.averageDrift;
    const spikes = telemetry.series.filter(s => s.drift.magnitude > avgDrift * 3);
    
    if (spikes.length > 0) {
      edgeCases.push({
        type: 'sudden_spike',
        severity: 'warning',
        description: `Detected ${spikes.length} sudden drift spike(s) (>3x average)`,
        affectedObservations: spikes.map(s => s.sourceId),
        recommendation: 'Investigate large architectural changes or refactorings.',
      });
    }
  }
  
  // 3. Oscillating patterns
  if (telemetry.summary.volatility > 0.5) {
    edgeCases.push({
      type: 'oscillating',
      severity: 'warning',
      description: 'High drift volatility detected (oscillating pattern)',
      affectedObservations: [],
      recommendation: 'Review for inconsistent architectural decisions or experimental changes.',
    });
  }
  
  // 4. Unclassifiable drift
  const lowConfidence = telemetry.series.filter(s => s.drift.confidence < 0.5);
  if (lowConfidence.length > telemetry.series.length * 0.3) {
    edgeCases.push({
      type: 'unclassifiable',
      severity: 'warning',
      description: `${lowConfidence.length} observations have low classification confidence`,
      affectedObservations: lowConfidence.map(s => s.sourceId),
      recommendation: 'Infrastructure Gap: Improve signature granularity or classification thresholds.',
    });
  }
  
  return edgeCases;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Calculate drift magnitude from observation
 * Normalized to 0.0 - 1.0
 */
function calculateDriftMagnitude(obs: DriftObservation): number {
  const structuralWeight = 0.4;
  const contractWeight = 0.3;
  const governanceWeight = 0.3;
  
  const structuralScore = obs.computation.metrics.structuralChurnRate;
  const contractScore = 1.0 - obs.computation.metrics.contractStabilityScore;
  const governanceScore = 1.0 - obs.computation.metrics.governanceAlignmentScore;
  
  return Math.min(1.0, 
    structuralScore * structuralWeight +
    contractScore * contractWeight +
    governanceScore * governanceWeight
  );
}

/**
 * Calculate volatility (standard deviation) of drift magnitudes
 */
function calculateVolatility(magnitudes: number[], average: number): number {
  if (magnitudes.length < 2) {
    return 0;
  }
  
  const squaredDiffs = magnitudes.map(m => Math.pow(m - average, 2));
  const variance = squaredDiffs.reduce((sum, sq) => sum + sq, 0) / magnitudes.length;
  return Math.sqrt(variance);
}

/**
 * Determine overall drift direction from series
 */
function determineOverallDirection(
  series: any[],
  volatility: number
): 'improving' | 'degrading' | 'oscillating' | 'stable' {
  if (series.length < 2) {
    return 'stable';
  }
  
  if (volatility > 0.5) {
    return 'oscillating';
  }
  
  const magnitudes = series.map(s => s.drift.magnitude);
  const slope = calculateTrendSlope(magnitudes);
  
  if (slope > 0.01) {
    return 'degrading';
  } else if (slope < -0.01) {
    return 'improving';
  } else {
    return 'stable';
  }
}

/**
 * Calculate trend slope using linear regression
 */
function calculateTrendSlope(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }
  
  const n = values.length;
  const xValues = Array.from({ length: n }, (_, i) => i);
  
  const sumX = xValues.reduce((sum, x) => sum + x, 0);
  const sumY = values.reduce((sum, y) => sum + y, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * values[i], 0);
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  
  return slope;
}

/**
 * Extract subsystem name from module name
 */
function extractSubsystem(moduleName: string): string {
  // Simple heuristic: take first part of module name
  const parts = moduleName.split(/[-_]/);
  return parts[0] || 'core';
}
