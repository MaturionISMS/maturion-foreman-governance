/**
 * Drift Telemetry & Time-Series Reporting Types
 * Wave 4A.2 - Non-Enforcing Intelligence Layer
 */

import {
  TimeWindow,
  DriftClassification,
  InfrastructureGap,
} from './longitudinal';

/**
 * Time-series telemetry representation
 */
export interface TimeSeriesTelemetry {
  window: {
    type: 'commits' | 'days' | 'prs' | 'waves' | 'custom';
    value: number | { start: string; end: string };
    signatureCount: number;
    observationCount: number;
  };
  
  series: Array<{
    timestamp: string;
    sourceType: 'commit' | 'pr' | 'wave';
    sourceId: string;
    
    drift: {
      magnitude: number; // 0.0 - 1.0 normalized drift
      classification: DriftClassification;
      confidence: number;
    };
    
    categories: {
      structural: {
        churnRate: number;
        modulesChanged: number;
      };
      contract: {
        stabilityScore: number;
        changesCount: number;
      };
      governance: {
        alignmentScore: number;
        constraintsChanged: number;
      };
    };
  }>;
  
  summary: {
    overallDirection: 'improving' | 'degrading' | 'oscillating' | 'stable';
    averageDrift: number;
    peakDrift: number;
    minDrift: number;
    volatility: number; // Measure of oscillation
  };
  
  edgeCases: EdgeCaseClassification[];
  infrastructureGaps: InfrastructureGap[];
}

/**
 * Drift direction analysis
 */
export interface DriftDirection {
  direction: 'improving' | 'degrading' | 'oscillating' | 'stable';
  confidence: number;
  
  trend: {
    slopeDirection: 'upward' | 'downward' | 'flat';
    slopeValue: number;
    volatility: number;
  };
  
  periods: {
    improving: number; // Count of improving observations
    degrading: number; // Count of degrading observations
    stable: number; // Count of stable observations
  };
  
  rationale: string; // Human-readable explanation
}

/**
 * Subsystem attribution
 */
export interface SubsystemAttribution {
  subsystem: string;
  
  stability: {
    classification: 'stable' | 'unstable' | 'improving' | 'degrading';
    confidence: number;
    
    metrics: {
      averageChurn: number;
      changeFrequency: number;
      violationCount: number;
    };
  };
  
  observations: Array<{
    timestamp: string;
    churn: number;
    violated: boolean;
  }>;
  
  trend: 'improving' | 'degrading' | 'stable';
}

/**
 * Constraint stress trend
 */
export interface ConstraintTrend {
  constraintId: string;
  
  stress: {
    totalViolations: number;
    violationRate: number; // Violations per observation
    trend: 'increasing' | 'stable' | 'decreasing';
  };
  
  timeline: Array<{
    timestamp: string;
    violated: boolean;
    severity?: 'low' | 'medium' | 'high';
  }>;
  
  prediction: {
    nextPeriodRisk: 'low' | 'medium' | 'high';
    rationale: string;
  };
}

/**
 * Edge case classification
 */
export interface EdgeCaseClassification {
  type: 'sparse_data' | 'sudden_spike' | 'gradual_trend' | 'oscillating' | 'subsystem_disappeared' | 'unclassifiable';
  severity: 'info' | 'warning' | 'error';
  description: string;
  affectedObservations: string[]; // Observation IDs
  recommendation: string;
}

/**
 * Complete telemetry report
 */
export interface TelemetryReport {
  id: string; // UUID
  generatedAt: string; // ISO 8601
  reproducible: boolean; // Always true
  
  metadata: {
    window: TimeWindow;
    signatureCount: number;
    observationCount: number;
    dataCompleteness: number; // 0.0 - 1.0
  };
  
  timeSeries: TimeSeriesTelemetry;
  subsystems: SubsystemAttribution[];
  constraints: ConstraintTrend[];
  
  summary: {
    overallHealth: 'healthy' | 'warning' | 'degrading' | 'critical';
    driftDirection: DriftDirection;
    topIssues: string[]; // Top 5 issues
    recommendations: string[];
  };
  
  artifacts: {
    json?: string; // JSON serialized report
    markdown?: string; // Markdown formatted report
  };
  
  infrastructureGaps: InfrastructureGap[];
  edgeCases: EdgeCaseClassification[];
}

/**
 * Subsystem-specific report
 */
export interface SubsystemReport {
  subsystem: string;
  generatedAt: string;
  
  attribution: SubsystemAttribution;
  
  relatedConstraints: ConstraintTrend[];
  
  summary: {
    stability: 'stable' | 'unstable' | 'improving' | 'degrading';
    keyMetrics: Record<string, number>;
    recommendations: string[];
  };
  
  artifacts: {
    json?: string;
    markdown?: string;
  };
}

/**
 * Constraint-specific report
 */
export interface ConstraintReport {
  constraintId: string;
  generatedAt: string;
  
  trend: ConstraintTrend;
  
  affectedSubsystems: string[];
  
  summary: {
    overallTrend: 'increasing' | 'stable' | 'decreasing';
    riskLevel: 'low' | 'medium' | 'high';
    recommendations: string[];
  };
  
  artifacts: {
    json?: string;
    markdown?: string;
  };
}

/**
 * Report publish result
 */
export interface PublishResult {
  success: boolean;
  reportId: string;
  storedAt: string[];
  error?: string;
}
