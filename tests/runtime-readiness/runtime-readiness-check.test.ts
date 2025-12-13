/**
 * Runtime Readiness Check - Red QA Test Suite
 * 
 * Purpose: Validate Runtime Readiness Check system implementation
 * Status: RED (Tests will fail until implementation is complete)
 * Architecture: /architecture/runtime-readiness-check-architecture.md
 * 
 * This test suite validates that the Maturion system can:
 * 1. Start cleanly with no manual intervention
 * 2. Orchestrate jobs and persist state
 * 3. Run stably for extended periods
 * 4. Stop cleanly and recover state
 * 5. Emit observable telemetry
 * 6. Generate GO/NO-GO verdicts with evidence
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import * as fs from 'fs/promises';
import * as path from 'path';

// Types - These should match the architecture
type CheckStatus = 'PASS' | 'FAIL';
type VerdictStatus = 'GO' | 'NO-GO';
type GapType = 'INFRASTRUCTURE_GAP' | 'PERMISSION_GAP' | 'CONFIG_GAP';
type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

interface CheckResult {
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
  gapType?: GapType;
}

interface InfrastructureGap {
  type: GapType;
  component: string;
  description: string;
  severity: Severity;
  remediation: string;
}

interface RuntimeReadinessOptions {
  stabilityProbeDuration?: number;
  skipLongRunning?: boolean;
  logLevel?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  persistState?: boolean;
}

interface StartupValidationResult {
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

interface ControlPlaneCheckResult {
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

interface StabilityProbeResult {
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
  events: Array<{
    timestamp: string;
    type: string;
    severity: string;
    message: string;
  }>;
  gaps: InfrastructureGap[];
}

interface StateRecoveryResult {
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

interface TelemetryResult {
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

interface RuntimeReadinessVerdict {
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
  evidenceTrail: Array<{
    module: string;
    timestamp: string;
    type: string;
    description: string;
  }>;
  recommendations: string[];
  nextSteps: string[];
}

// Import the actual implementation (will fail until implementation exists)
let executeRuntimeReadinessCheck: (options?: RuntimeReadinessOptions) => Promise<RuntimeReadinessVerdict>;
let validateStartup: () => Promise<StartupValidationResult>;
let checkControlPlane: (sessionId: string) => Promise<ControlPlaneCheckResult>;
let runStabilityProbe: (options: { duration: number; sessionId: string }) => Promise<StabilityProbeResult>;
let checkStateRecovery: (sessionId: string) => Promise<StateRecoveryResult>;
let checkTelemetry: (sessionId: string) => Promise<TelemetryResult>;

try {
  const runtimeReadiness = require('../../lib/runtime-readiness');
  executeRuntimeReadinessCheck = runtimeReadiness.executeRuntimeReadinessCheck;
  validateStartup = runtimeReadiness.validateStartup;
  checkControlPlane = runtimeReadiness.checkControlPlane;
  runStabilityProbe = runtimeReadiness.runStabilityProbe;
  checkStateRecovery = runtimeReadiness.checkStateRecovery;
  checkTelemetry = runtimeReadiness.checkTelemetry;
} catch (error) {
  // Expected to fail initially - implementation doesn't exist yet
  console.log('⚠️  Runtime readiness implementation not found (expected for Red QA)');
}

const STATE_DIR = path.join(process.cwd(), 'memory', 'governance', 'runtime-readiness', 'state');
const EVIDENCE_DIR = path.join(process.cwd(), 'memory', 'governance', 'runtime-readiness', 'evidence');

describe('Runtime Readiness Check - Red QA Suite', () => {
  
  beforeEach(async () => {
    // Clean up any existing test state
    try {
      await fs.rm(STATE_DIR, { recursive: true, force: true });
      await fs.rm(EVIDENCE_DIR, { recursive: true, force: true });
    } catch (error) {
      // Directories might not exist yet
    }
  });

  afterEach(async () => {
    // Clean up test state
    try {
      await fs.rm(STATE_DIR, { recursive: true, force: true });
      await fs.rm(EVIDENCE_DIR, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('1. Startup Validation Module', () => {
    
    it('should validate all required environment variables', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result).toBeDefined();
      expect(result.status).toBe('PASS' as CheckStatus);
      expect(result.checks.environmentVariables).toBeDefined();
      expect(result.checks.environmentVariables.passed).toBe(true);
      expect(result.timestamp).toBeDefined();
    });

    it('should check MCP server connectivity', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result.checks.mcpConnectivity).toBeDefined();
      expect(typeof result.checks.mcpConnectivity.passed).toBe('boolean');
      expect(result.checks.mcpConnectivity.message).toBeDefined();
      
      // If MCP connectivity fails, it should be classified as INFRASTRUCTURE_GAP
      if (!result.checks.mcpConnectivity.passed) {
        expect(result.checks.mcpConnectivity.gapType).toBe('INFRASTRUCTURE_GAP');
        expect(result.gaps.length).toBeGreaterThan(0);
      }
    });

    it('should validate GitHub authentication', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result.checks.githubAuth).toBeDefined();
      expect(typeof result.checks.githubAuth.passed).toBe('boolean');
      
      // If GitHub auth fails, it should be classified as PERMISSION_GAP
      if (!result.checks.githubAuth.passed) {
        expect(result.checks.githubAuth.gapType).toBe('PERMISSION_GAP');
      }
    });

    it('should check CI orchestration availability', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result.checks.ciOrchestration).toBeDefined();
      expect(typeof result.checks.ciOrchestration.passed).toBe('boolean');
    });

    it('should verify file system permissions', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result.checks.fileSystemPermissions).toBeDefined();
      expect(result.checks.fileSystemPermissions.passed).toBe(true);
      
      // Should be able to write to state directory
      expect(result.checks.fileSystemPermissions.message).toContain('writable');
    });

    it('should validate configuration integrity', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result.checks.configurationIntegrity).toBeDefined();
      expect(result.checks.configurationIntegrity.passed).toBe(true);
    });

    it('should classify all gaps explicitly', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      expect(result.gaps).toBeDefined();
      expect(Array.isArray(result.gaps)).toBe(true);
      
      // Each gap must have required fields
      result.gaps.forEach((gap) => {
        expect(gap.type).toBeDefined();
        expect(['INFRASTRUCTURE_GAP', 'PERMISSION_GAP', 'CONFIG_GAP']).toContain(gap.type);
        expect(gap.component).toBeDefined();
        expect(gap.description).toBeDefined();
        expect(gap.severity).toBeDefined();
        expect(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).toContain(gap.severity);
        expect(gap.remediation).toBeDefined();
      });
    });
  });

  describe('2. Control Plane Check Module', () => {
    
    it('should initiate a non-destructive test job', async () => {
      expect(checkControlPlane).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkControlPlane(sessionId);
      
      expect(result).toBeDefined();
      expect(result.status).toBe('PASS' as CheckStatus);
      expect(result.checks.jobInitiation).toBeDefined();
      expect(result.checks.jobInitiation.passed).toBe(true);
      expect(result.jobMetrics.jobId).toBeDefined();
    });

    it('should persist job state to governance memory', async () => {
      expect(checkControlPlane).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkControlPlane(sessionId);
      
      expect(result.checks.statePersistence).toBeDefined();
      expect(result.checks.statePersistence.passed).toBe(true);
      
      // Verify state file exists
      const stateFiles = await fs.readdir(STATE_DIR).catch(() => []);
      expect(stateFiles.length).toBeGreaterThan(0);
    });

    it('should transition between execution phases', async () => {
      expect(checkControlPlane).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkControlPlane(sessionId);
      
      expect(result.checks.phaseTransitions).toBeDefined();
      expect(result.checks.phaseTransitions.passed).toBe(true);
      expect(result.jobMetrics.phasesExecuted).toBeDefined();
      expect(result.jobMetrics.phasesExecuted.length).toBeGreaterThan(0);
      expect(result.jobMetrics.stateTransitions).toBeGreaterThan(0);
    });

    it('should interact with GitHub (where permitted)', async () => {
      expect(checkControlPlane).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkControlPlane(sessionId);
      
      expect(result.checks.githubInteraction).toBeDefined();
      expect(typeof result.checks.githubInteraction.passed).toBe('boolean');
      
      // If fails, should be classified
      if (!result.checks.githubInteraction.passed) {
        expect(result.checks.githubInteraction.gapType).toBeDefined();
      }
    });

    it('should poll and interpret CI results (if available)', async () => {
      expect(checkControlPlane).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkControlPlane(sessionId);
      
      expect(result.checks.ciPolling).toBeDefined();
      expect(typeof result.checks.ciPolling.passed).toBe('boolean');
    });

    it('should complete within expected time', async () => {
      expect(checkControlPlane).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const startTime = Date.now();
      
      await checkControlPlane(sessionId);
      
      const duration = Date.now() - startTime;
      
      // Should complete in < 5 minutes (300,000 ms)
      expect(duration).toBeLessThan(300000);
    });
  });

  describe('3. Stability Probe Module', () => {
    
    it('should run for specified duration without critical failures', async () => {
      expect(runStabilityProbe).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      // Use short duration for testing (30 seconds instead of 30 minutes)
      const result = await runStabilityProbe({
        duration: 30000, // 30 seconds
        sessionId,
      });
      
      expect(result).toBeDefined();
      expect(result.status).toBe('PASS' as CheckStatus);
      expect(result.duration).toBeGreaterThanOrEqual(30000);
    }, 60000); // 60 second timeout

    it('should execute multiple execution phases', async () => {
      expect(runStabilityProbe).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await runStabilityProbe({
        duration: 30000,
        sessionId,
      });
      
      expect(result.metrics.phaseTransitions).toBeGreaterThan(0);
    }, 60000); // 60 second timeout

    it('should not detect memory leaks', async () => {
      expect(runStabilityProbe).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await runStabilityProbe({
        duration: 30000,
        sessionId,
      });
      
      expect(result.metrics.memoryUsage).toBeDefined();
      expect(result.metrics.memoryUsage.leakDetected).toBe(false);
      expect(result.metrics.memoryUsage.end).toBeLessThanOrEqual(
        result.metrics.memoryUsage.start * 1.1 // Max 10% growth
      );
    }, 60000); // 60 second timeout

    it('should not detect deadlocks', async () => {
      expect(runStabilityProbe).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await runStabilityProbe({
        duration: 30000,
        sessionId,
      });
      
      expect(result.metrics.deadlocksDetected).toBe(0);
    }, 60000); // 60 second timeout

    it('should not leave orphaned processes', async () => {
      expect(runStabilityProbe).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await runStabilityProbe({
        duration: 30000,
        sessionId,
      });
      
      expect(result.metrics.processCount.orphaned).toBe(0);
    }, 60000); // 60 second timeout

    it('should emit runtime events', async () => {
      expect(runStabilityProbe).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await runStabilityProbe({
        duration: 30000,
        sessionId,
      });
      
      expect(result.events).toBeDefined();
      expect(Array.isArray(result.events)).toBe(true);
      expect(result.events.length).toBeGreaterThan(0);
      
      // Each event must have required fields
      result.events.forEach((event) => {
        expect(event.timestamp).toBeDefined();
        expect(event.type).toBeDefined();
        expect(event.severity).toBeDefined();
        expect(event.message).toBeDefined();
      });
    }, 60000); // 60 second timeout
  });

  describe('4. State Persistence & Recovery Module', () => {
    
    it('should persist execution state during operation', async () => {
      expect(checkStateRecovery).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkStateRecovery(sessionId);
      
      expect(result).toBeDefined();
      expect(result.checks.statePersistence).toBeDefined();
      expect(result.checks.statePersistence.passed).toBe(true);
      expect(result.stateMetrics.bytesPersisted).toBeGreaterThan(0);
      expect(result.stateMetrics.filesCreated).toBeGreaterThan(0);
    });

    it('should execute intentional stop without corruption', async () => {
      expect(checkStateRecovery).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkStateRecovery(sessionId);
      
      expect(result.checks.cleanStop).toBeDefined();
      expect(result.checks.cleanStop.passed).toBe(true);
      expect(result.stateMetrics.dataIntegrity).toBe(true);
    });

    it('should demonstrate state recovery on restart', async () => {
      expect(checkStateRecovery).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkStateRecovery(sessionId);
      
      expect(result.checks.stateRecovery).toBeDefined();
      expect(result.checks.stateRecovery.passed).toBe(true);
      expect(result.stateMetrics.recoveryTime).toBeGreaterThan(0);
      expect(result.stateMetrics.recoveryTime).toBeLessThan(5000); // < 5 seconds
    });

    it('should validate idempotent recovery behavior', async () => {
      expect(checkStateRecovery).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkStateRecovery(sessionId);
      
      expect(result.checks.idempotency).toBeDefined();
      expect(result.checks.idempotency.passed).toBe(true);
    });
  });

  describe('5. Observability & Telemetry Layer', () => {
    
    it('should emit logs correctly', async () => {
      expect(checkTelemetry).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkTelemetry(sessionId);
      
      expect(result).toBeDefined();
      expect(result.checks.logEmission).toBeDefined();
      expect(result.checks.logEmission.passed).toBe(true);
      expect(result.telemetryMetrics.logsEmitted).toBeGreaterThan(0);
    });

    it('should classify errors explicitly', async () => {
      expect(checkTelemetry).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkTelemetry(sessionId);
      
      expect(result.checks.errorClassification).toBeDefined();
      expect(result.checks.errorClassification.passed).toBe(true);
      expect(result.telemetryMetrics.errorsClassified).toBeGreaterThanOrEqual(0);
    });

    it('should write telemetry to Memory Fabric', async () => {
      expect(checkTelemetry).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkTelemetry(sessionId);
      
      expect(result.checks.memoryFabricIntegration).toBeDefined();
      expect(result.checks.memoryFabricIntegration.passed).toBe(true);
      
      // Verify telemetry files exist
      const telemetryDir = path.join(process.cwd(), 'memory', 'governance', 'runtime-readiness', 'telemetry');
      const telemetryFiles = await fs.readdir(telemetryDir).catch(() => []);
      expect(telemetryFiles.length).toBeGreaterThan(0);
    });

    it('should detect silent failures', async () => {
      expect(checkTelemetry).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkTelemetry(sessionId);
      
      expect(result.checks.silentFailureDetection).toBeDefined();
      expect(result.checks.silentFailureDetection.passed).toBe(true);
      expect(result.telemetryMetrics.silentFailures).toBe(0);
    });

    it('should surface all anomalies with explanations', async () => {
      expect(checkTelemetry).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      const result = await checkTelemetry(sessionId);
      
      expect(result.checks.anomalyReporting).toBeDefined();
      expect(result.checks.anomalyReporting.passed).toBe(true);
      expect(typeof result.telemetryMetrics.anomaliesDetected).toBe('number');
    });
  });

  describe('6. Verdict Generator', () => {
    
    it('should execute full runtime readiness check', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true, // Skip stability probe for quick test
        persistState: true,
      });
      
      expect(result).toBeDefined();
      expect(result.verdict).toBeDefined();
      expect(['GO', 'NO-GO']).toContain(result.verdict);
    });

    it('should aggregate results from all modules', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      expect(result.moduleResults).toBeDefined();
      expect(result.moduleResults.startupValidation).toBeDefined();
      expect(result.moduleResults.controlPlaneCheck).toBeDefined();
      expect(result.moduleResults.stateRecovery).toBeDefined();
      expect(result.moduleResults.telemetry).toBeDefined();
    });

    it('should generate GO verdict when all checks pass', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      // If all modules pass, verdict should be GO
      const allPass = 
        result.moduleResults.startupValidation.status === 'PASS' &&
        result.moduleResults.controlPlaneCheck.status === 'PASS' &&
        result.moduleResults.stateRecovery.status === 'PASS' &&
        result.moduleResults.telemetry.status === 'PASS';
      
      if (allPass) {
        expect(result.verdict).toBe('GO');
      }
    });

    it('should classify all infrastructure gaps', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      expect(result.summary.infrastructureGaps).toBeDefined();
      expect(Array.isArray(result.summary.infrastructureGaps)).toBe(true);
      
      result.summary.infrastructureGaps.forEach((gap) => {
        expect(gap.type).toBeDefined();
        expect(gap.severity).toBeDefined();
        expect(gap.remediation).toBeDefined();
      });
    });

    it('should produce evidence trail', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      expect(result.evidenceTrail).toBeDefined();
      expect(Array.isArray(result.evidenceTrail)).toBe(true);
      expect(result.evidenceTrail.length).toBeGreaterThan(0);
      
      result.evidenceTrail.forEach((evidence) => {
        expect(evidence.module).toBeDefined();
        expect(evidence.timestamp).toBeDefined();
        expect(evidence.type).toBeDefined();
        expect(evidence.description).toBeDefined();
      });
    });

    it('should provide recommendations', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      expect(result.recommendations).toBeDefined();
      expect(Array.isArray(result.recommendations)).toBe(true);
    });

    it('should provide next steps', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      expect(result.nextSteps).toBeDefined();
      expect(Array.isArray(result.nextSteps)).toBe(true);
    });

    it('should persist verdict to evidence directory', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      await executeRuntimeReadinessCheck({
        skipLongRunning: true,
        persistState: true,
      });
      
      // Verify evidence directory exists and contains verdict
      const evidenceFiles = await fs.readdir(EVIDENCE_DIR);
      expect(evidenceFiles.length).toBeGreaterThan(0);
      
      const verdictFile = evidenceFiles.find((f) => f.includes('verdict'));
      expect(verdictFile).toBeDefined();
    });

    it('should generate summary statistics', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      expect(result.summary).toBeDefined();
      expect(result.summary.totalChecks).toBeGreaterThan(0);
      expect(result.summary.passedChecks).toBeGreaterThanOrEqual(0);
      expect(result.summary.failedChecks).toBeGreaterThanOrEqual(0);
      expect(result.summary.totalChecks).toBe(
        result.summary.passedChecks + result.summary.failedChecks
      );
    });
  });

  describe('7. Integration Tests', () => {
    
    it('should execute complete runtime readiness check end-to-end', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const startTime = Date.now();
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true, // Skip for speed
        persistState: true,
        logLevel: 'INFO',
      });
      const duration = Date.now() - startTime;
      
      // Should complete
      expect(result).toBeDefined();
      expect(result.verdict).toBeDefined();
      
      // Should have all module results
      expect(result.moduleResults.startupValidation).toBeDefined();
      expect(result.moduleResults.controlPlaneCheck).toBeDefined();
      expect(result.moduleResults.stateRecovery).toBeDefined();
      expect(result.moduleResults.telemetry).toBeDefined();
      
      // Should have evidence and recommendations
      expect(result.evidenceTrail.length).toBeGreaterThan(0);
      expect(result.recommendations).toBeDefined();
      expect(result.nextSteps).toBeDefined();
      
      // Should complete in reasonable time (< 10 minutes without stability probe)
      expect(duration).toBeLessThan(600000);
    });

    it('should handle infrastructure gaps gracefully', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      // Execute check which may encounter infrastructure gaps
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      // Should still complete and classify gaps
      expect(result).toBeDefined();
      
      // All gaps must be classified
      result.summary.infrastructureGaps.forEach((gap) => {
        expect(gap.type).toBeDefined();
        expect(gap.severity).toBeDefined();
        expect(gap.remediation).toBeDefined();
      });
      
      // If critical gaps exist, verdict should be NO-GO
      const criticalGaps = result.summary.infrastructureGaps.filter(
        (g) => g.severity === 'CRITICAL'
      );
      if (criticalGaps.length > 0) {
        expect(result.verdict).toBe('NO-GO');
      }
    });

    it('should clean up test state after execution', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const sessionId = `test-session-${Date.now()}`;
      
      await executeRuntimeReadinessCheck({
        skipLongRunning: true,
        persistState: true,
      });
      
      // State and evidence should exist
      const stateExists = await fs.access(STATE_DIR).then(() => true).catch(() => false);
      const evidenceExists = await fs.access(EVIDENCE_DIR).then(() => true).catch(() => false);
      
      expect(stateExists || evidenceExists).toBe(true);
    });
  });

  describe('8. Error Handling & Classification', () => {
    
    it('should classify INFRASTRUCTURE_GAP errors correctly', async () => {
      expect(validateStartup).toBeDefined();
      
      // Run startup validation which may detect infrastructure gaps
      const result = await validateStartup();
      
      const infrastructureGaps = result.gaps.filter((g) => g.type === 'INFRASTRUCTURE_GAP');
      
      infrastructureGaps.forEach((gap) => {
        expect(gap.component).toBeDefined();
        expect(gap.description).toBeDefined();
        expect(gap.remediation).toBeDefined();
      });
    });

    it('should classify PERMISSION_GAP errors correctly', async () => {
      expect(validateStartup).toBeDefined();
      
      const result = await validateStartup();
      
      const permissionGaps = result.gaps.filter((g) => g.type === 'PERMISSION_GAP');
      
      permissionGaps.forEach((gap) => {
        expect(gap.component).toBeDefined();
        expect(gap.description).toBeDefined();
        expect(gap.remediation).toBeDefined();
      });
    });

    it('should provide remediation for all gaps', async () => {
      expect(executeRuntimeReadinessCheck).toBeDefined();
      
      const result = await executeRuntimeReadinessCheck({
        skipLongRunning: true,
      });
      
      result.summary.infrastructureGaps.forEach((gap) => {
        expect(gap.remediation).toBeDefined();
        expect(gap.remediation.length).toBeGreaterThan(0);
      });
    });
  });
});
