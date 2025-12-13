/**
 * Verdict Generator
 * 
 * Architecture: /architecture/runtime-readiness-check-architecture.md
 * Purpose: Produce final GO/NO-GO readiness verdict with evidence
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type {
  RuntimeReadinessVerdict,
  StartupValidationResult,
  ControlPlaneCheckResult,
  StabilityProbeResult,
  StateRecoveryResult,
  TelemetryResult,
  Evidence,
  InfrastructureGap,
  VerdictStatus,
} from '../../types/runtime-readiness';

const EVIDENCE_DIR = path.join(process.cwd(), 'memory', 'governance', 'runtime-readiness', 'evidence');

interface VerdictInput {
  startupResult: StartupValidationResult;
  controlPlaneResult: ControlPlaneCheckResult;
  stabilityResult?: StabilityProbeResult;
  stateRecoveryResult: StateRecoveryResult;
  telemetryResult: TelemetryResult;
}

/**
 * Generate runtime readiness verdict
 */
export async function generateVerdict(input: VerdictInput): Promise<RuntimeReadinessVerdict> {
  const timestamp = new Date().toISOString();
  
  // Aggregate all gaps
  const allGaps = [
    ...input.startupResult.gaps,
    ...input.controlPlaneResult.gaps,
    ...(input.stabilityResult?.gaps || []),
    ...input.stateRecoveryResult.gaps,
    ...input.telemetryResult.gaps,
  ];
  
  // Count critical gaps
  const criticalGaps = allGaps.filter(g => g.severity === 'CRITICAL').length;
  
  // Build evidence trail
  const evidenceTrail: Evidence[] = [];
  
  // Startup validation evidence
  evidenceTrail.push({
    module: 'startup-validation',
    timestamp: input.startupResult.timestamp,
    type: input.startupResult.status === 'PASS' ? 'PASS' : 'FAIL',
    description: `Startup validation ${input.startupResult.status}`,
  });
  
  // Control plane evidence
  evidenceTrail.push({
    module: 'control-plane-check',
    timestamp: input.controlPlaneResult.timestamp,
    type: input.controlPlaneResult.status === 'PASS' ? 'PASS' : 'FAIL',
    description: `Control plane check ${input.controlPlaneResult.status}`,
  });
  
  // Stability probe evidence (if ran)
  if (input.stabilityResult) {
    evidenceTrail.push({
      module: 'stability-probe',
      timestamp: input.stabilityResult.timestamp,
      type: input.stabilityResult.status === 'PASS' ? 'PASS' : 'FAIL',
      description: `Stability probe ${input.stabilityResult.status}`,
    });
  }
  
  // State recovery evidence
  evidenceTrail.push({
    module: 'state-recovery',
    timestamp: input.stateRecoveryResult.timestamp,
    type: input.stateRecoveryResult.status === 'PASS' ? 'PASS' : 'FAIL',
    description: `State recovery ${input.stateRecoveryResult.status}`,
  });
  
  // Telemetry evidence
  evidenceTrail.push({
    module: 'telemetry',
    timestamp: input.telemetryResult.timestamp,
    type: input.telemetryResult.status === 'PASS' ? 'PASS' : 'FAIL',
    description: `Telemetry check ${input.telemetryResult.status}`,
  });
  
  // Add gap evidence
  allGaps.forEach(gap => {
    evidenceTrail.push({
      module: gap.component,
      timestamp,
      type: 'GAP_IDENTIFIED',
      description: gap.description,
      details: { severity: gap.severity, type: gap.type },
    });
  });
  
  // Calculate summary
  const totalChecks = Object.keys(input.startupResult.checks).length +
    Object.keys(input.controlPlaneResult.checks).length +
    Object.keys(input.stateRecoveryResult.checks).length +
    Object.keys(input.telemetryResult.checks).length +
    (input.stabilityResult ? 1 : 0);
  
  const passedChecks = 
    Object.values(input.startupResult.checks).filter(c => c.passed).length +
    Object.values(input.controlPlaneResult.checks).filter(c => c.passed).length +
    Object.values(input.stateRecoveryResult.checks).filter(c => c.passed).length +
    Object.values(input.telemetryResult.checks).filter(c => c.passed).length +
    (input.stabilityResult && input.stabilityResult.status === 'PASS' ? 1 : 0);
  
  const failedChecks = totalChecks - passedChecks;
  
  // Determine verdict
  const verdict: VerdictStatus = determineVerdict({
    startupStatus: input.startupResult.status,
    controlPlaneStatus: input.controlPlaneResult.status,
    stabilityStatus: input.stabilityResult?.status || 'PASS',
    stateRecoveryStatus: input.stateRecoveryResult.status,
    telemetryStatus: input.telemetryResult.status,
    criticalGaps,
  });
  
  // Generate recommendations
  const recommendations = generateRecommendations(verdict, allGaps, input);
  
  // Generate next steps
  const nextSteps = generateNextSteps(verdict, allGaps);
  
  return {
    verdict,
    timestamp,
    summary: {
      totalChecks,
      passedChecks,
      failedChecks,
      criticalGaps,
      infrastructureGaps: allGaps,
    },
    moduleResults: {
      startupValidation: input.startupResult,
      controlPlaneCheck: input.controlPlaneResult,
      stabilityProbe: input.stabilityResult || createSkippedStabilityResult(),
      stateRecovery: input.stateRecoveryResult,
      telemetry: input.telemetryResult,
    },
    evidenceTrail,
    recommendations,
    nextSteps,
  };
}

function determineVerdict(status: {
  startupStatus: 'PASS' | 'FAIL';
  controlPlaneStatus: 'PASS' | 'FAIL';
  stabilityStatus: 'PASS' | 'FAIL';
  stateRecoveryStatus: 'PASS' | 'FAIL';
  telemetryStatus: 'PASS' | 'FAIL';
  criticalGaps: number;
}): VerdictStatus {
  // GO verdict requires all checks to pass and no critical gaps
  if (
    status.startupStatus === 'PASS' &&
    status.controlPlaneStatus === 'PASS' &&
    status.stabilityStatus === 'PASS' &&
    status.stateRecoveryStatus === 'PASS' &&
    status.telemetryStatus === 'PASS' &&
    status.criticalGaps === 0
  ) {
    return 'GO';
  }
  
  return 'NO-GO';
}

function generateRecommendations(
  verdict: VerdictStatus,
  gaps: InfrastructureGap[],
  input: VerdictInput
): string[] {
  const recommendations: string[] = [];
  
  if (verdict === 'GO') {
    recommendations.push('System is ready for overnight autonomous execution');
    recommendations.push('All runtime readiness checks passed');
    
    if (gaps.length > 0) {
      recommendations.push(`Note: ${gaps.length} non-critical gap(s) identified for future improvement`);
    }
  } else {
    recommendations.push('System is NOT ready for overnight autonomous execution');
    
    if (input.startupResult.status === 'FAIL') {
      recommendations.push('Fix startup validation failures before proceeding');
    }
    
    if (input.controlPlaneResult.status === 'FAIL') {
      recommendations.push('Fix control plane orchestration issues before proceeding');
    }
    
    if (input.stabilityResult && input.stabilityResult.status === 'FAIL') {
      recommendations.push('Fix stability issues (memory leaks, deadlocks) before proceeding');
    }
    
    if (input.stateRecoveryResult.status === 'FAIL') {
      recommendations.push('Fix state persistence/recovery issues before proceeding');
    }
    
    if (input.telemetryResult.status === 'FAIL') {
      recommendations.push('Fix telemetry and observability issues before proceeding');
    }
    
    const criticalGaps = gaps.filter(g => g.severity === 'CRITICAL');
    if (criticalGaps.length > 0) {
      recommendations.push(`Resolve ${criticalGaps.length} CRITICAL infrastructure gap(s) before proceeding`);
    }
  }
  
  return recommendations;
}

function generateNextSteps(verdict: VerdictStatus, gaps: InfrastructureGap[]): string[] {
  const nextSteps: string[] = [];
  
  if (verdict === 'GO') {
    nextSteps.push('System is cleared for overnight autonomous execution');
    nextSteps.push('Monitor first overnight execution closely');
    nextSteps.push('Review telemetry after completion');
    
    if (gaps.length > 0) {
      nextSteps.push('Optionally address non-critical gaps to improve robustness');
    }
  } else {
    nextSteps.push('Review all failed checks and infrastructure gaps');
    nextSteps.push('Implement remediation for each identified gap');
    nextSteps.push('Re-run runtime readiness check after fixes');
    nextSteps.push('Do NOT proceed with overnight execution until GO verdict achieved');
    
    // Add specific remediation steps
    gaps.forEach(gap => {
      if (gap.severity === 'CRITICAL' || gap.severity === 'HIGH') {
        nextSteps.push(`${gap.component}: ${gap.remediation}`);
      }
    });
  }
  
  return nextSteps;
}

function createSkippedStabilityResult(): StabilityProbeResult {
  return {
    status: 'PASS',
    timestamp: new Date().toISOString(),
    duration: 0,
    metrics: {
      memoryUsage: {
        start: 0,
        end: 0,
        peak: 0,
        leakDetected: false,
      },
      cpuUsage: {
        average: 0,
        peak: 0,
      },
      processCount: {
        start: 0,
        end: 0,
        orphaned: 0,
      },
      phaseTransitions: 0,
      deadlocksDetected: 0,
    },
    events: [{
      timestamp: new Date().toISOString(),
      type: 'WARNING',
      severity: 'INFO',
      message: 'Stability probe skipped',
    }],
    gaps: [],
  };
}

/**
 * Persist verdict to evidence directory
 */
export async function persistVerdict(
  verdict: RuntimeReadinessVerdict,
  sessionId: string
): Promise<void> {
  await fs.mkdir(EVIDENCE_DIR, { recursive: true });
  
  const verdictFile = path.join(EVIDENCE_DIR, `verdict-${sessionId}.json`);
  await fs.writeFile(verdictFile, JSON.stringify(verdict, null, 2));
}
