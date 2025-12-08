/**
 * PR Gatekeeper - Governance-First PR Creation Enforcement
 * 
 * This module enforces the critical rule:
 * "Foreman MUST NOT create PRs unless QIEL passes under merge-queue conditions"
 * 
 * Per GSR-QA-STRICT-001 and True North Philosophy:
 * - NO bypasses
 * - NO whitelisting
 * - NO pattern softening
 * - ZERO tolerance for ANY failures
 * 
 * This gatekeeper runs QIEL EXACTLY as GitHub Actions does:
 * - Same Node version (from QIEL_CONFIG)
 * - Same build/lint/test commands
 * - Same thresholds and validation rules
 * - Same environment variables
 * - Same drift monitoring
 * - Same QIW rules
 * 
 * Exit Criteria:
 * - Build logs: ZERO errors, ZERO warnings
 * - Lint logs: ZERO errors, ZERO warnings
 * - Test logs: ZERO errors, ZERO warnings
 * - QIW: ALL checks pass
 * - Drift Monitor: ZERO critical drift
 * - Memory Fabric: Valid and cohesive
 * - Governance: ZERO violations
 * - Schema: ZERO mismatches
 * - QIEL overall: PASSED
 */

import { runQIEL, QIELResult } from './qa/qiel-runner';
import { QIEL_CONFIG } from './qiel-config';
import { logGovernanceEvent } from './memory/governance-memory';
import { writeMemory } from './memory/storage';

/**
 * PR Gatekeeper Result
 */
export interface PRGatekeeperResult {
  allowed: boolean;
  reason: string;
  qielResult: QIELResult;
  blockingIssues: string[];
  governanceViolations: string[];
  timestamp: string;
}

/**
 * Enforce PR Gatekeeper - The ONLY gate for PR creation
 * 
 * This function MUST be called before ANY PR creation attempt.
 * It runs QIEL exactly as GitHub Actions would run it during merge-queue.
 * 
 * @param buildId - Optional build ID for tracking
 * @param sequenceId - Optional sequence ID for tracking
 * @returns PRGatekeeperResult with allowed=true only if QIEL passes completely
 */
export async function enforcePRGatekeeper(options?: {
  buildId?: string;
  sequenceId?: string;
  commitSha?: string;
  branch?: string;
  logsDir?: string;
}): Promise<PRGatekeeperResult> {
  const {
    buildId,
    sequenceId,
    commitSha,
    branch,
    logsDir = '/tmp',
  } = options || {};

  const timestamp = new Date().toISOString();

  console.log('═══════════════════════════════════════════════════════');
  console.log('  PR GATEKEEPER - GOVERNANCE-FIRST ENFORCEMENT');
  console.log('  Validating QIEL compliance before PR creation');
  console.log(`  Config Version: ${QIEL_CONFIG.version}`);
  console.log('═══════════════════════════════════════════════════════\n');

  // Log gatekeeper invocation to governance memory
  await logGovernanceEvent({
    type: 'pr_gatekeeper_invoked',
    severity: 'info',
    description: 'PR Gatekeeper enforcement started',
    metadata: {
      buildId,
      sequenceId,
      commitSha,
      branch,
      timestamp,
    },
  });

  let qielResult: QIELResult;
  const blockingIssues: string[] = [];
  const governanceViolations: string[] = [];

  try {
    // Run QIEL EXACTLY as GitHub Actions does
    // This uses the same configuration, same commands, same thresholds
    console.log('[PR Gatekeeper] Running QIEL validation...');
    console.log('[PR Gatekeeper] Using merge-queue conditions (strict mode)\n');

    qielResult = await runQIEL({
      logsDir,
      skipDeploymentSimulation: false, // Run full QIEL for PR creation
      skipEngineValidation: false,
      buildId,
      sequenceId,
      commitSha,
      branch,
    });

    console.log(`\n[PR Gatekeeper] QIEL validation completed`);
    console.log(`[PR Gatekeeper] Overall result: ${qielResult.passed ? 'PASSED ✅' : 'FAILED ❌'}`);

  } catch (error) {
    // QIEL execution failed critically
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('[PR Gatekeeper] CRITICAL: QIEL execution failed');
    console.error('[PR Gatekeeper] Error:', errorMessage);

    blockingIssues.push(`QIEL execution failed: ${errorMessage}`);
    governanceViolations.push('QIEL_EXECUTION_FAILURE');

    // Log critical governance event
    await logGovernanceEvent({
      type: 'pr_blocked_qiel_execution_failure',
      severity: 'critical',
      description: 'PR creation blocked due to QIEL execution failure',
      metadata: {
        buildId,
        sequenceId,
        error: errorMessage,
        timestamp,
      },
    });

    // Record governance memory incident
    await recordGovernanceIncident({
      type: 'pr_creation_blocked',
      reason: 'QIEL execution failed',
      blockingIssues,
      governanceViolations,
      buildId,
      sequenceId,
      timestamp,
    });

    // Return blocked result
    return {
      allowed: false,
      reason: `PR blocked by governance: QIEL execution failed - ${errorMessage}`,
      qielResult: {
        passed: false,
        timestamp,
        checks: {
          logsGenerated: false,
          logsExist: false,
          buildLogsPassed: false,
          lintLogsPassed: false,
          testLogsPassed: false,
          zeroWarningPassed: false,
          deploymentSimulationPassed: false,
          schemaCohesionPassed: false,
          engineLoadPassed: false,
        },
        results: {} as any,
        qiIncidents: [],
        regressionTestsGenerated: 0,
        totalRegressionTests: 0,
        overallSummary: errorMessage,
        blockersFound: [errorMessage],
        reportMarkdown: '',
        configVersion: QIEL_CONFIG.version,
      },
      blockingIssues,
      governanceViolations,
      timestamp,
    };
  }

  // Analyze QIEL result for blocking issues
  if (!qielResult.passed) {
    blockingIssues.push('QIEL validation failed');
    
    // Add specific blockers from QIEL
    if (qielResult.blockersFound.length > 0) {
      blockingIssues.push(...qielResult.blockersFound);
    }

    // Categorize governance violations
    if (!qielResult.checks.buildLogsPassed) {
      governanceViolations.push('BUILD_ERRORS_OR_WARNINGS');
    }
    if (!qielResult.checks.lintLogsPassed) {
      governanceViolations.push('LINT_ERRORS_OR_WARNINGS');
    }
    if (!qielResult.checks.testLogsPassed) {
      governanceViolations.push('TEST_FAILURES_OR_ERRORS');
    }
    if (!qielResult.checks.zeroWarningPassed) {
      governanceViolations.push('ZERO_WARNING_POLICY_VIOLATION');
    }
    if (!qielResult.checks.deploymentSimulationPassed) {
      governanceViolations.push('DEPLOYMENT_SIMULATION_FAILURE');
    }
    if (!qielResult.checks.schemaCohesionPassed) {
      governanceViolations.push('SCHEMA_COHESION_VIOLATION');
    }
    if (!qielResult.checks.engineLoadPassed) {
      governanceViolations.push('ENGINE_LOAD_FAILURE');
    }
    if (qielResult.qiIncidents.length > 0) {
      governanceViolations.push('QUALITY_INTEGRITY_INCIDENTS');
    }
  }

  // Check for any QI Incidents (these ALWAYS block)
  if (qielResult.qiIncidents.length > 0) {
    blockingIssues.push(`${qielResult.qiIncidents.length} Quality Integrity Incident(s) detected`);
    
    if (!governanceViolations.includes('QUALITY_INTEGRITY_INCIDENTS')) {
      governanceViolations.push('QUALITY_INTEGRITY_INCIDENTS');
    }
  }

  // Determine if PR creation is allowed
  const allowed = qielResult.passed && blockingIssues.length === 0;

  // Construct reason message
  let reason: string;
  if (allowed) {
    reason = 'PR creation allowed: QIEL passed under merge-queue conditions';
  } else {
    reason = `PR blocked by governance: QIEL not passed under merge-queue conditions. ${blockingIssues.length} blocker(s) found.`;
  }

  // Log result to governance memory
  const eventType = allowed ? 'pr_allowed' : 'pr_blocked_qiel_failure';
  const severity = allowed ? 'info' : 'critical';

  await logGovernanceEvent({
    type: eventType,
    severity,
    description: reason,
    metadata: {
      buildId,
      sequenceId,
      commitSha,
      branch,
      allowed,
      blockingIssues,
      governanceViolations,
      qielPassed: qielResult.passed,
      qiIncidentsCount: qielResult.qiIncidents.length,
      timestamp,
    },
  });

  // If blocked, record detailed governance incident
  if (!allowed) {
    await recordGovernanceIncident({
      type: 'pr_creation_blocked',
      reason: 'QIEL validation failed',
      blockingIssues,
      governanceViolations,
      qielResult,
      buildId,
      sequenceId,
      timestamp,
    });

    console.error('\n❌ PR GATEKEEPER: PR CREATION BLOCKED');
    console.error('━'.repeat(60));
    console.error(`Reason: ${reason}`);
    console.error(`Blocking Issues: ${blockingIssues.length}`);
    blockingIssues.forEach((issue, idx) => {
      console.error(`  ${idx + 1}. ${issue}`);
    });
    console.error(`Governance Violations: ${governanceViolations.length}`);
    governanceViolations.forEach((violation, idx) => {
      console.error(`  ${idx + 1}. ${violation}`);
    });
    console.error('━'.repeat(60));
    console.error('');
  } else {
    console.log('\n✅ PR GATEKEEPER: PR CREATION ALLOWED');
    console.log('━'.repeat(60));
    console.log('QIEL passed all checks under merge-queue conditions');
    console.log('Governance compliance validated');
    console.log('PR creation may proceed');
    console.log('━'.repeat(60));
    console.log('');
  }

  return {
    allowed,
    reason,
    qielResult,
    blockingIssues,
    governanceViolations,
    timestamp,
  };
}

/**
 * Record governance incident to memory fabric
 */
async function recordGovernanceIncident(incident: {
  type: string;
  reason: string;
  blockingIssues: string[];
  governanceViolations: string[];
  qielResult?: QIELResult;
  buildId?: string;
  sequenceId?: string;
  timestamp: string;
}): Promise<void> {
  try {
    await writeMemory({
      entry: {
        id: `pr_gatekeeper_block_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        scope: 'global',
        category: 'governance',
        type: 'incident',
        tags: [
          'pr_gatekeeper',
          'pr_creation_blocked',
          'governance_violation',
          'qiel_failure',
          ...incident.governanceViolations.map(v => v.toLowerCase()),
        ],
        value: {
          incident: {
            type: incident.type,
            reason: incident.reason,
            blockingIssues: incident.blockingIssues,
            governanceViolations: incident.governanceViolations,
            qielPassed: incident.qielResult?.passed || false,
            qiIncidents: incident.qielResult?.qiIncidents.length || 0,
            buildId: incident.buildId,
            sequenceId: incident.sequenceId,
            timestamp: incident.timestamp,
          },
        },
        metadata: {
          source: 'PRGatekeeper',
          requiresCorrection: true,
          severity: 'critical',
        },
      }
    });

    console.log('[PR Gatekeeper] Governance incident recorded to memory fabric');
  } catch (error) {
    console.error('[PR Gatekeeper] CRITICAL: Failed to record governance incident:', error);
    // This is critical - governance violations MUST be recorded
    // Log to governance events as fallback
    await logGovernanceEvent({
      type: 'governance_incident_recording_failed',
      severity: 'critical',
      description: 'Failed to record PR gatekeeper incident to memory fabric',
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error',
        incident,
      },
    });
  }
}

/**
 * Validate builder assignment logic
 * Ensures builders cannot hand over code that cannot pass strict QIEL
 * 
 * This should be called BEFORE builder task approval
 * 
 * TODO: Fully implement this function to pre-validate builder outputs
 * Currently returns placeholder success - needs actual QIEL simulation
 */
export async function validateBuilderHandover(options: {
  builderId: string;
  taskId: string;
  artifacts: any[];
}): Promise<{ valid: boolean; reason: string }> {
  const { builderId, taskId, artifacts } = options;

  console.log(`[PR Gatekeeper] Validating builder handover for task ${taskId}`);

  // TODO: In a full implementation, this would:
  // 1. Simulate QIEL run on the builder's artifacts
  // 2. Check if the code would pass strict QIEL
  // 3. Block handover if QIEL would fail
  
  // For now, log the validation attempt
  await logGovernanceEvent({
    type: 'builder_handover_validation',
    severity: 'info',
    description: `Validating builder handover for task ${taskId}`,
    metadata: {
      builderId,
      taskId,
      artifactsCount: artifacts.length,
    },
  });

  // PLACEHOLDER: In full implementation, would run pre-validation checks
  // WARNING: This currently allows all handovers - to be implemented
  return {
    valid: true,
    reason: 'Builder handover validation passed (PLACEHOLDER - not yet fully implemented)',
  };
}
