/**
 * Drift Computation Engine
 * Wave 4A.1 - Longitudinal Drift Detection
 * 
 * Computes deterministic, reproducible drift classifications by comparing persisted signatures.
 * MUST be deterministic and reproducible.
 */

import { randomUUID } from 'crypto';
import {
  PersistedSignature,
  DriftComputation,
  DriftClassification,
  DriftClassificationResult,
  TimeWindow,
} from '@/types/longitudinal';

/**
 * Deterministic thresholds for drift classification
 */
const DRIFT_THRESHOLDS = {
  stable: {
    maxChurnRate: 0.05,        // < 5% change per signature
    maxViolationIncrease: 0,   // No increase in violations
  },
  gradual: {
    maxChurnRate: 0.15,        // < 15% change per signature
    maxViolationIncrease: 2,   // Up to 2 new violations per window
  },
  accelerating: {
    minChurnIncrease: 0.5,     // 50% increase in churn rate over window
  },
  regressive: {
    minViolationIncrease: 3,   // 3+ new violations per window
  },
};

/**
 * Compute drift between two signatures
 * MUST be deterministic and reproducible
 */
export function computeDrift(params: {
  oldSignature: PersistedSignature;
  newSignature: PersistedSignature;
}): DriftComputation {
  const { oldSignature, newSignature } = params;

  const oldModules = new Set(oldSignature.signature.structure.modules.map(m => m.name));
  const newModules = new Set(newSignature.signature.structure.modules.map(m => m.name));

  // Detect added modules
  const modulesAdded = Array.from(newModules).filter(m => !oldModules.has(m)).sort();

  // Detect removed modules
  const modulesRemoved = Array.from(oldModules).filter(m => !newModules.has(m)).sort();

  // Detect modified modules (by comparing hashes)
  const oldModuleMap = new Map(
    oldSignature.signature.structure.modules.map(m => [m.name, m.hash])
  );
  const newModuleMap = new Map(
    newSignature.signature.structure.modules.map(m => [m.name, m.hash])
  );

  const modulesModified: string[] = [];
  for (const [name, oldHash] of oldModuleMap) {
    const newHash = newModuleMap.get(name);
    if (newHash && newHash !== oldHash) {
      modulesModified.push(name);
    }
  }
  modulesModified.sort();

  // Count dependency changes
  const oldDeps = oldSignature.signature.structure.dependencies.edges.length;
  const newDeps = newSignature.signature.structure.dependencies.edges.length;
  const dependenciesAdded = Math.max(0, newDeps - oldDeps);
  const dependenciesRemoved = Math.max(0, oldDeps - newDeps);

  // Contract changes
  const apisChanged = Math.abs(
    oldSignature.signature.contracts.apis.length - newSignature.signature.contracts.apis.length
  );
  const typesChanged = Math.abs(
    oldSignature.signature.contracts.types.length - newSignature.signature.contracts.types.length
  );
  const eventsChanged = Math.abs(
    oldSignature.signature.contracts.events.length - newSignature.signature.contracts.events.length
  );

  // Governance changes
  const oldConstraints = new Set(oldSignature.signature.governance.constraints);
  const newConstraints = new Set(newSignature.signature.governance.constraints);
  
  const constraintsAdded = Array.from(newConstraints)
    .filter(c => !oldConstraints.has(c))
    .sort();
  
  const constraintsRemoved = Array.from(oldConstraints)
    .filter(c => !newConstraints.has(c))
    .sort();

  const protectedPathsChanged = 
    JSON.stringify(oldSignature.signature.governance.protectedPaths.sort()) !==
    JSON.stringify(newSignature.signature.governance.protectedPaths.sort());

  // Calculate metrics
  const totalModules = Math.max(oldModules.size, newModules.size);
  const totalChanges = modulesAdded.length + modulesRemoved.length + modulesModified.length;
  
  const structuralChurnRate = totalModules > 0 ? totalChanges / totalModules : 0;
  
  const contractStabilityScore = 1.0 - Math.min(1.0, (apisChanged + typesChanged + eventsChanged) / 10);
  
  const governanceAlignmentScore = 1.0 - Math.min(1.0, (constraintsAdded.length + constraintsRemoved.length) / 10);

  return {
    id: randomUUID(),
    oldSignatureId: oldSignature.id,
    newSignatureId: newSignature.id,
    timestamp: new Date().toISOString(),
    structuralChanges: {
      modulesAdded,
      modulesRemoved,
      modulesModified,
      dependenciesAdded,
      dependenciesRemoved,
    },
    contractChanges: {
      apisChanged,
      typesChanged,
      eventsChanged,
    },
    governanceChanges: {
      constraintsAdded,
      constraintsRemoved,
      protectedPathsChanged,
    },
    metrics: {
      totalChanges,
      structuralChurnRate,
      contractStabilityScore,
      governanceAlignmentScore,
    },
  };
}

/**
 * Classify drift pattern over a time window
 */
export function classifyDriftPattern(params: {
  signatures: PersistedSignature[];
  window: TimeWindow;
}): DriftClassificationResult {
  const { signatures } = params;

  if (signatures.length < 2) {
    // Not enough signatures to compute drift
    return {
      classification: 'Stable',
      confidence: 0.5,
      supportingMetrics: {
        averageChurnRate: 0,
        violationTrend: 'stable',
        stabilityTrend: 'stable',
      },
      observationWindow: {
        startTime: signatures[0]?.timestamp || new Date().toISOString(),
        endTime: signatures[signatures.length - 1]?.timestamp || new Date().toISOString(),
        signatureCount: signatures.length,
      },
    };
  }

  // Sort by timestamp to get chronological order
  const sorted = [...signatures].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Compute drift for each consecutive pair
  const computations: DriftComputation[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    computations.push(computeDrift({
      oldSignature: sorted[i],
      newSignature: sorted[i + 1],
    }));
  }

  // Calculate average churn rate
  const avgChurn = computations.reduce((sum, c) => sum + c.metrics.structuralChurnRate, 0) / computations.length;

  // Calculate violation trend
  const violationCounts = sorted.map(s => s.signature.governance.constraints.length);
  const violationTrend = violationCounts[violationCounts.length - 1] - violationCounts[0];

  // Calculate churn acceleration
  const firstHalf = computations.slice(0, Math.floor(computations.length / 2));
  const secondHalf = computations.slice(Math.floor(computations.length / 2));
  
  const firstHalfChurn = firstHalf.length > 0
    ? firstHalf.reduce((sum, c) => sum + c.metrics.structuralChurnRate, 0) / firstHalf.length
    : 0;
  
  const secondHalfChurn = secondHalf.length > 0
    ? secondHalf.reduce((sum, c) => sum + c.metrics.structuralChurnRate, 0) / secondHalf.length
    : 0;
  
  const churnAcceleration = secondHalfChurn - firstHalfChurn;

  // Apply classification logic
  let classification: DriftClassification;
  let confidence: number;

  if (violationTrend >= DRIFT_THRESHOLDS.regressive.minViolationIncrease) {
    classification = 'Regressive';
    confidence = 0.9;
  } else if (churnAcceleration >= DRIFT_THRESHOLDS.accelerating.minChurnIncrease) {
    classification = 'Accelerating';
    confidence = 0.85;
  } else if (avgChurn <= DRIFT_THRESHOLDS.stable.maxChurnRate && 
             violationTrend <= DRIFT_THRESHOLDS.stable.maxViolationIncrease) {
    classification = 'Stable';
    confidence = 0.9;
  } else if (avgChurn <= DRIFT_THRESHOLDS.gradual.maxChurnRate && 
             violationTrend <= DRIFT_THRESHOLDS.gradual.maxViolationIncrease) {
    classification = 'Gradual';
    confidence = 0.8;
  } else {
    // Default to Accelerating if none of the above
    classification = 'Accelerating';
    confidence = 0.7;
  }

  // Determine trends
  const violationTrendType: 'increasing' | 'stable' | 'decreasing' = 
    violationTrend > 1 ? 'increasing' : 
    violationTrend < -1 ? 'decreasing' : 
    'stable';

  const stabilityTrendType: 'improving' | 'stable' | 'degrading' = 
    churnAcceleration < -0.1 ? 'improving' :
    churnAcceleration > 0.1 ? 'degrading' :
    'stable';

  return {
    classification,
    confidence,
    supportingMetrics: {
      averageChurnRate: avgChurn,
      violationTrend: violationTrendType,
      stabilityTrend: stabilityTrendType,
    },
    observationWindow: {
      startTime: sorted[0].timestamp,
      endTime: sorted[sorted.length - 1].timestamp,
      signatureCount: sorted.length,
    },
  };
}

/**
 * Analyze constraint stress over time
 */
export function analyzeConstraintStress(params: {
  constraintId: string;
  signatures: PersistedSignature[];
}): {
  constraintId: string;
  stressCount: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  observations: Array<{
    timestamp: string;
    violated: boolean;
    sourceType: string;
    sourceId: string;
  }>;
} {
  const { constraintId, signatures } = params;

  const observations = signatures.map(sig => ({
    timestamp: sig.timestamp,
    violated: sig.signature.governance.constraints.includes(constraintId),
    sourceType: sig.sourceType,
    sourceId: sig.sourceId,
  }));

  const stressCount = observations.filter(o => o.violated).length;

  // Determine trend
  const firstHalf = observations.slice(0, Math.floor(observations.length / 2));
  const secondHalf = observations.slice(Math.floor(observations.length / 2));

  const firstHalfViolations = firstHalf.filter(o => o.violated).length;
  const secondHalfViolations = secondHalf.filter(o => o.violated).length;

  const trend: 'increasing' | 'stable' | 'decreasing' = 
    secondHalfViolations > firstHalfViolations * 1.2 ? 'increasing' :
    secondHalfViolations < firstHalfViolations * 0.8 ? 'decreasing' :
    'stable';

  return {
    constraintId,
    stressCount,
    trend,
    observations,
  };
}
