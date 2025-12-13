/**
 * Longitudinal Drift Detection Types
 * Wave 4A.1 - Observe-Only Architecture Drift
 */

import { ArchitectureSignature } from './constraints';

/**
 * Source type for architecture snapshots
 */
export type SignatureSourceType = 'commit' | 'pr' | 'wave';

/**
 * Time window specification
 */
export interface TimeWindow {
  type: 'commits' | 'days' | 'prs' | 'waves' | 'custom';
  value: number | { start: Date; end: Date };
}

/**
 * Persisted architecture signature
 */
export interface PersistedSignature {
  id: string;
  signatureHash: string;
  signature: ArchitectureSignature;
  sourceType: SignatureSourceType;
  sourceId: string;
  timestamp: string;
  metadata: {
    commitMessage?: string;
    prTitle?: string;
    waveNumber?: string;
    author?: string;
    isBaseline?: boolean;
    [key: string]: any;
  };
}

/**
 * Signature persistence result
 */
export interface SignaturePersistenceResult {
  success: boolean;
  signatureId: string;
  stored: boolean;
  error?: string;
}

/**
 * Drift computation between two signatures
 */
export interface DriftComputation {
  id: string;
  oldSignatureId: string;
  newSignatureId: string;
  timestamp: string;
  
  structuralChanges: {
    modulesAdded: string[];
    modulesRemoved: string[];
    modulesModified: string[];
    dependenciesAdded: number;
    dependenciesRemoved: number;
  };
  
  contractChanges: {
    apisChanged: number;
    typesChanged: number;
    eventsChanged: number;
  };
  
  governanceChanges: {
    constraintsAdded: string[];
    constraintsRemoved: string[];
    protectedPathsChanged: boolean;
  };
  
  metrics: {
    totalChanges: number;
    structuralChurnRate: number;
    contractStabilityScore: number;
    governanceAlignmentScore: number;
  };
}

/**
 * Drift classification types
 */
export type DriftClassification = 
  | 'Stable'
  | 'Gradual'
  | 'Accelerating'
  | 'Regressive';

/**
 * Drift classification result
 */
export interface DriftClassificationResult {
  classification: DriftClassification;
  confidence: number;
  supportingMetrics: {
    averageChurnRate: number;
    violationTrend: 'increasing' | 'stable' | 'decreasing';
    stabilityTrend: 'improving' | 'stable' | 'degrading';
  };
  observationWindow: {
    startTime: string;
    endTime: string;
    signatureCount: number;
  };
}

/**
 * Infrastructure gap record
 */
export interface InfrastructureGap {
  type: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

/**
 * Drift observation
 */
export interface DriftObservation {
  id: string;
  timestamp: string;
  oldSignatureId: string;
  newSignatureId: string;
  computation: DriftComputation;
  classification: DriftClassification;
  classificationConfidence: number;
  supportingMetrics: Record<string, number>;
  context: {
    sourceType: SignatureSourceType;
    sourceId: string;
    branch?: string;
    author?: string;
  };
  infrastructureGaps?: InfrastructureGap[];
}

/**
 * Stability metrics
 */
export interface StabilityMetrics {
  period: {
    start: string;
    end: string;
  };
  signatureCount: number;
  driftObservationCount: number;
  overallClassification: DriftClassification;
  trends: {
    structuralChurn: 'increasing' | 'stable' | 'decreasing';
    violations: 'increasing' | 'stable' | 'decreasing';
    stability: 'improving' | 'stable' | 'degrading';
  };
  topConstraintsStressed: Array<{
    constraintId: string;
    stressCount: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }>;
}

/**
 * Constraint stress analysis
 */
export interface ConstraintStressAnalysis {
  constraintId: string;
  stressCount: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  observations: Array<{
    timestamp: string;
    violated: boolean;
    sourceType: SignatureSourceType;
    sourceId: string;
  }>;
}

/**
 * Execution context
 */
export interface ExecutionContext {
  sourceType: SignatureSourceType;
  sourceId: string;
  branch?: string;
  author?: string;
  timestamp: string;
}
