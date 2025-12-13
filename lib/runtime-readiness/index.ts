/**
 * Runtime Readiness Check - Main Entry Point
 * 
 * Architecture: /architecture/runtime-readiness-check-architecture.md
 * Purpose: Execute complete runtime readiness check and generate GO/NO-GO verdict
 */

import { validateStartup } from './startup-validator';
import { checkControlPlane } from './control-plane-checker';
import { runStabilityProbe } from './stability-probe';
import { checkStateRecovery } from './state-manager';
import { checkTelemetry } from './telemetry-collector';
import { generateVerdict, persistVerdict } from './verdict-generator';

import type {
  RuntimeReadinessVerdict,
  RuntimeReadinessOptions,
} from '../../types/runtime-readiness';

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Main execution function for runtime readiness check
 * 
 * This function orchestrates all runtime readiness checks:
 * 1. Startup Validation
 * 2. Control Plane Check
 * 3. Stability Probe (optional, can be skipped for quick checks)
 * 4. State Recovery Check
 * 5. Telemetry Check
 * 6. Verdict Generation
 * 
 * @param options - Configuration options for the check
 * @returns Runtime readiness verdict (GO or NO-GO)
 */
export async function executeRuntimeReadinessCheck(
  options: RuntimeReadinessOptions = {}
): Promise<RuntimeReadinessVerdict> {
  const sessionId = generateSessionId();
  const startTime = new Date().toISOString();
  
  console.log('');
  console.log('═'.repeat(80));
  console.log('Runtime Readiness Check');
  console.log('═'.repeat(80));
  console.log(`Session ID: ${sessionId}`);
  console.log(`Start Time: ${startTime}`);
  console.log('');
  
  try {
    // Step 1: Startup Validation
    console.log('Step 1/5: Startup Validation...');
    const startupResult = await validateStartup();
    console.log(`  Status: ${startupResult.status}`);
    if (startupResult.gaps.length > 0) {
      console.log(`  Gaps: ${startupResult.gaps.length} identified`);
    }
    
    // Step 2: Control Plane Check
    console.log('Step 2/5: Control Plane Check...');
    const controlPlaneResult = await checkControlPlane(sessionId);
    console.log(`  Status: ${controlPlaneResult.status}`);
    console.log(`  Job ID: ${controlPlaneResult.jobMetrics.jobId}`);
    
    // Step 3: Stability Probe (optional)
    let stabilityResult;
    if (!options.skipLongRunning) {
      console.log('Step 3/5: Stability Probe...');
      console.log(`  Duration: ${(options.stabilityProbeDuration || 30 * 60 * 1000) / 1000}s`);
      stabilityResult = await runStabilityProbe({
        duration: options.stabilityProbeDuration || 30 * 60 * 1000,
        sessionId,
      });
      console.log(`  Status: ${stabilityResult.status}`);
      console.log(`  Memory Leak Detected: ${stabilityResult.metrics.memoryUsage.leakDetected}`);
    } else {
      console.log('Step 3/5: Stability Probe... SKIPPED');
    }
    
    // Step 4: State Recovery Check
    console.log('Step 4/5: State Recovery Check...');
    const stateRecoveryResult = await checkStateRecovery(sessionId);
    console.log(`  Status: ${stateRecoveryResult.status}`);
    console.log(`  Files Created: ${stateRecoveryResult.stateMetrics.filesCreated}`);
    console.log(`  Bytes Persisted: ${stateRecoveryResult.stateMetrics.bytesPersisted}`);
    
    // Step 5: Telemetry Check
    console.log('Step 5/5: Telemetry Check...');
    const telemetryResult = await checkTelemetry(sessionId);
    console.log(`  Status: ${telemetryResult.status}`);
    console.log(`  Logs Emitted: ${telemetryResult.telemetryMetrics.logsEmitted}`);
    
    // Step 6: Generate Verdict
    console.log('');
    console.log('Generating Verdict...');
    const verdict = await generateVerdict({
      startupResult,
      controlPlaneResult,
      stabilityResult,
      stateRecoveryResult,
      telemetryResult,
    });
    
    // Persist verdict if requested
    if (options.persistState !== false) {
      await persistVerdict(verdict, sessionId);
    }
    
    // Display verdict
    console.log('');
    console.log('═'.repeat(80));
    console.log('RUNTIME READINESS VERDICT');
    console.log('═'.repeat(80));
    console.log('');
    console.log(`Verdict: ${verdict.verdict === 'GO' ? '✅ GO' : '❌ NO-GO'}`);
    console.log('');
    console.log('Summary:');
    console.log(`  Total Checks: ${verdict.summary.totalChecks}`);
    console.log(`  Passed: ${verdict.summary.passedChecks}`);
    console.log(`  Failed: ${verdict.summary.failedChecks}`);
    console.log(`  Critical Gaps: ${verdict.summary.criticalGaps}`);
    console.log(`  Total Gaps: ${verdict.summary.infrastructureGaps.length}`);
    console.log('');
    
    if (verdict.recommendations.length > 0) {
      console.log('Recommendations:');
      verdict.recommendations.forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec}`);
      });
      console.log('');
    }
    
    if (verdict.nextSteps.length > 0) {
      console.log('Next Steps:');
      verdict.nextSteps.forEach((step, i) => {
        console.log(`  ${i + 1}. ${step}`);
      });
      console.log('');
    }
    
    if (verdict.summary.infrastructureGaps.length > 0) {
      console.log('Infrastructure Gaps:');
      verdict.summary.infrastructureGaps.forEach((gap, i) => {
        console.log(`  ${i + 1}. [${gap.severity}] ${gap.component}`);
        console.log(`     ${gap.description}`);
        console.log(`     Remediation: ${gap.remediation}`);
      });
      console.log('');
    }
    
    console.log('═'.repeat(80));
    console.log('');
    
    return verdict;
  } catch (error) {
    console.error('');
    console.error('═'.repeat(80));
    console.error('RUNTIME READINESS CHECK FAILED');
    console.error('═'.repeat(80));
    console.error('');
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    console.error('');
    throw error;
  }
}

// Re-export all module functions for testing
export { validateStartup } from './startup-validator';
export { checkControlPlane } from './control-plane-checker';
export { runStabilityProbe } from './stability-probe';
export { checkStateRecovery } from './state-manager';
export { checkTelemetry } from './telemetry-collector';
export { generateVerdict, persistVerdict } from './verdict-generator';

// Re-export types
export type * from '../../types/runtime-readiness';
