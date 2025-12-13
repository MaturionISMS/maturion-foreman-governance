/**
 * Runtime Readiness Check - Type Definitions
 * 
 * Architecture: /architecture/runtime-readiness-check-architecture.md
 * Purpose: Type definitions for Runtime Readiness Check system
 */

export type CheckStatus = 'PASS' | 'FAIL';
export type VerdictStatus = 'GO' | 'NO-GO';
export type GapType = 'INFRASTRUCTURE_GAP' | 'PERMISSION_GAP' | 'CONFIG_GAP';
export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type EventType = 'PHASE_TRANSITION' | 'RESOURCE_SPIKE' | 'ERROR' | 'WARNING';
export type EventSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
export type EvidenceType = 'PASS' | 'FAIL' | 'GAP_IDENTIFIED';

export interface CheckResult {
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  gapType?: GapType;
}

export interface InfrastructureGap {
  type: GapType;
  component: string;
  description: string;
  severity: Severity;
  remediation: string;
}

export interface RuntimeEvent {
  timestamp: string;
  type: EventType;
  severity: EventSeverity;
  message: string;
  details?: Record<string, unknown>;
}

export interface Evidence {
  module: string;
  timestamp: string;
  type: EvidenceType;
  description: string;
  details?: Record<string, unknown>;
}

export interface Checkpoint {
  id: string;
  timestamp: string;
  phase: string;
  data: Record<string, unknown>;
}

export interface RuntimeState {
  sessionId: string;
  startTime: string;
  phase: string;
  checkpoints: Checkpoint[];
  metrics: Record<string, unknown>;
}

export interface StartupValidationResult {
  status: CheckStatus;
  timestamp: string;
  checks: {
    environmentVariables: CheckResult;
    mcpConnectivity: CheckResult;
    githubAuth: CheckResult;
    ciOrchestration: CheckResult;
    fileSystemPermissions: CheckResult;
    configurationIntegrity: CheckResult;
  };
  gaps: InfrastructureGap[];
}

export interface ControlPlaneCheckResult {
  status: CheckStatus;
  timestamp: string;
  checks: {
    jobInitiation: CheckResult;
    statePersistence: CheckResult;
    phaseTransitions: CheckResult;
    githubInteraction: CheckResult;
    ciPolling: CheckResult;
  };
  jobMetrics: {
    jobId: string;
    startTime: string;
    endTime: string;
    phasesExecuted: string[];
    stateTransitions: number;
    githubOperations: number;
  };
  gaps: InfrastructureGap[];
}

export interface StabilityProbeResult {
  status: CheckStatus;
  timestamp: string;
  duration: number;
  metrics: {
    memoryUsage: {
      start: number;
      end: number;
      peak: number;
      leakDetected: boolean;
    };
    cpuUsage: {
      average: number;
      peak: number;
    };
    processCount: {
      start: number;
      end: number;
      orphaned: number;
    };
    phaseTransitions: number;
    deadlocksDetected: number;
  };
  events: RuntimeEvent[];
  gaps: InfrastructureGap[];
}

export interface StateRecoveryResult {
  status: CheckStatus;
  timestamp: string;
  checks: {
    statePersistence: CheckResult;
    cleanStop: CheckResult;
    stateRecovery: CheckResult;
    idempotency: CheckResult;
  };
  stateMetrics: {
    bytesPersisted: number;
    filesCreated: number;
    recoveryTime: number;
    dataIntegrity: boolean;
  };
  gaps: InfrastructureGap[];
}

export interface TelemetryResult {
  status: CheckStatus;
  timestamp: string;
  checks: {
    logEmission: CheckResult;
    errorClassification: CheckResult;
    memoryFabricIntegration: CheckResult;
    silentFailureDetection: CheckResult;
    anomalyReporting: CheckResult;
  };
  telemetryMetrics: {
    logsEmitted: number;
    errorsClassified: number;
    anomaliesDetected: number;
    silentFailures: number;
  };
  gaps: InfrastructureGap[];
}

export interface RuntimeReadinessVerdict {
  verdict: VerdictStatus;
  timestamp: string;
  summary: {
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
    criticalGaps: number;
    infrastructureGaps: InfrastructureGap[];
  };
  moduleResults: {
    startupValidation: StartupValidationResult;
    controlPlaneCheck: ControlPlaneCheckResult;
    stabilityProbe: StabilityProbeResult;
    stateRecovery: StateRecoveryResult;
    telemetry: TelemetryResult;
  };
  evidenceTrail: Evidence[];
  recommendations: string[];
  nextSteps: string[];
}

export interface RuntimeReadinessOptions {
  stabilityProbeDuration?: number; // milliseconds, default: 30 minutes
  skipLongRunning?: boolean; // skip stability probe for quick validation
  logLevel?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  persistState?: boolean; // persist state to memory fabric, default: true
}
