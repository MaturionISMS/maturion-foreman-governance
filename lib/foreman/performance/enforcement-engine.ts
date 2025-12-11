/**
 * CS5 Performance Enforcement Engine
 * 
 * Enforces performance standards before PR merge.
 * Integrates with PR Gatekeeper to block non-compliant code.
 * 
 * Constitutional Requirements:
 * - PRs cannot merge with performance violations
 * - Foreman must instruct builders to fix issues
 * - Cannot override or bypass performance requirements
 * - Performance warnings create Parking Station items
 * - Must re-scan after fixes
 */

import { runPerformanceScan, PerformanceScanResult, PerformanceViolation } from './performance-scanner';
import { getCriticalPatterns } from './patterns';
import { logGovernanceEvent } from '../memory/governance-memory';
import { raiseAlert, raiseCriticalAlert } from '../alerts/alert-engine';

export interface PerformanceEnforcementResult {
  allowed: boolean;
  reason: string;
  scanResult: PerformanceScanResult;
  blockingIssues: string[];
  requiresFixes: boolean;
  timestamp: string;
}

/**
 * Enforce performance standards for PR creation
 * 
 * This is called by PR Gatekeeper before allowing PR creation.
 * Returns allowed=true only if no blocking violations exist.
 */
export async function enforcePerformanceStandards(options?: {
  changedFiles?: string[];
  buildId?: string;
  sequenceId?: string;
}): Promise<PerformanceEnforcementResult> {
  const timestamp = new Date().toISOString();
  const { changedFiles, buildId, sequenceId } = options || {};

  console.log('═══════════════════════════════════════════════════════');
  console.log('  CS5 PERFORMANCE ENFORCEMENT ENGINE');
  console.log('  Validating performance standards for PR creation');
  console.log('═══════════════════════════════════════════════════════\n');

  // Log enforcement invocation
  await logGovernanceEvent({
    type: 'performance_enforcement_invoked',
    severity: 'info',
    description: 'Performance enforcement started',
    metadata: {
      buildId,
      sequenceId,
      changedFilesCount: changedFiles?.length || 0,
      timestamp,
    },
  });

  // Run full performance scan
  const scanResult = await runPerformanceScan({
    createParkingStationEntries: true,
  });

  const blockingIssues: string[] = [];

  // Check for blocking violations
  if (scanResult.blockingViolations.length > 0) {
    blockingIssues.push(
      `${scanResult.blockingViolations.length} critical performance violation(s) detected`
    );

    // Group violations by pattern for clearer reporting
    const violationsByPattern = new Map<string, PerformanceViolation[]>();
    for (const violation of scanResult.blockingViolations) {
      const key = violation.pattern.id;
      if (!violationsByPattern.has(key)) {
        violationsByPattern.set(key, []);
      }
      violationsByPattern.get(key)!.push(violation);
    }

    for (const [patternId, violations] of violationsByPattern) {
      const pattern = violations[0].pattern;
      blockingIssues.push(
        `${pattern.name}: ${violations.length} violation(s) - ${pattern.fix || 'Must be fixed'}`
      );
    }
  }

  // Check for high severity violations (warnings but tracked)
  if (scanResult.highCount > 0) {
    console.warn(
      `[Performance Enforcement] ${scanResult.highCount} high-severity violation(s) detected (tracked in Parking Station)`
    );
  }

  // Determine if PR creation is allowed
  const allowed = scanResult.passed && blockingIssues.length === 0;
  const requiresFixes = !allowed;

  // Construct reason
  let reason: string;
  if (allowed) {
    reason = 'Performance standards met: No blocking violations detected';
  } else {
    reason = `Performance standards NOT met: ${blockingIssues.length} blocking issue(s) prevent PR merge`;
  }

  // Log result to governance memory
  await logGovernanceEvent({
    type: allowed ? 'performance_enforcement_passed' : 'performance_enforcement_failed',
    severity: allowed ? 'info' : 'critical',
    description: reason,
    metadata: {
      allowed,
      blockingIssues,
      violationsCount: scanResult.violations.length,
      criticalCount: scanResult.criticalCount,
      highCount: scanResult.highCount,
      mediumCount: scanResult.mediumCount,
      lowCount: scanResult.lowCount,
      buildId,
      sequenceId,
      timestamp,
    },
  });

  // Raise alerts for critical failures
  if (!allowed) {
    await raiseCriticalAlert({
      category: 'qa',
      message: 'Performance Enforcement Failed',
      details: `PR blocked due to ${scanResult.blockingViolations.length} critical performance violation(s).\n\n${blockingIssues.join('\n')}`,
      metadata: {
        buildId,
        sequenceId,
        blockingCount: scanResult.blockingViolations.length,
        totalViolations: scanResult.violations.length,
        timestamp,
      },
    });
  }

  // Print results
  console.log('\n[Performance Enforcement] Results:');
  console.log(`  Status: ${allowed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  Blocking Issues: ${blockingIssues.length}`);
  console.log(`  Total Violations: ${scanResult.violations.length}`);
  console.log(`  Critical: ${scanResult.criticalCount}`);
  console.log(`  High: ${scanResult.highCount}`);
  console.log(`  Medium: ${scanResult.mediumCount}`);
  console.log(`  Low: ${scanResult.lowCount}`);

  if (!allowed) {
    console.error('\n❌ PERFORMANCE ENFORCEMENT: PR CREATION BLOCKED');
    console.error('━'.repeat(60));
    console.error('Reason:', reason);
    console.error('\nBlocking Issues:');
    blockingIssues.forEach((issue, idx) => {
      console.error(`  ${idx + 1}. ${issue}`);
    });
    console.error('━'.repeat(60));
  } else {
    console.log('\n✅ PERFORMANCE ENFORCEMENT: PR CREATION ALLOWED');
    console.log('━'.repeat(60));
    console.log('All performance standards met');
    console.log('No blocking violations detected');
    console.log('━'.repeat(60));
  }

  return {
    allowed,
    reason,
    scanResult,
    blockingIssues,
    requiresFixes,
    timestamp,
  };
}

/**
 * Generate builder instructions for fixing performance violations
 * 
 * When enforcement fails, this generates specific instructions
 * for builders to fix the violations.
 */
export async function generateBuilderFixInstructions(
  scanResult: PerformanceScanResult
): Promise<string> {
  if (scanResult.blockingViolations.length === 0) {
    return 'No performance violations to fix.';
  }

  const instructions: string[] = [];
  instructions.push('# Performance Violations - Builder Fix Instructions\n');
  instructions.push('The following performance violations must be fixed before PR merge:\n');

  // Group violations by pattern
  const violationsByPattern = new Map<string, PerformanceViolation[]>();
  for (const violation of scanResult.blockingViolations) {
    const key = violation.pattern.id;
    if (!violationsByPattern.has(key)) {
      violationsByPattern.set(key, []);
    }
    violationsByPattern.get(key)!.push(violation);
  }

  // Generate instructions for each pattern
  for (const [patternId, violations] of violationsByPattern) {
    const pattern = violations[0].pattern;
    instructions.push(`## ${pattern.name} (${violations.length} violation(s))\n`);
    instructions.push(`**Description:** ${pattern.description}\n`);
    if (pattern.fix) {
      instructions.push(`**Fix:** ${pattern.fix}\n`);
    }
    instructions.push('\n**Violations:**\n');

    violations.slice(0, 10).forEach((v, idx) => {
      instructions.push(`${idx + 1}. \`${v.file}:${v.line}\``);
      instructions.push(`   Code: \`${v.code}\``);
    });

    if (violations.length > 10) {
      instructions.push(`\n... and ${violations.length - 10} more violations\n`);
    }

    instructions.push('\n');
  }

  instructions.push('---\n');
  instructions.push('**Required Action:**\n');
  instructions.push('1. Fix all violations listed above\n');
  instructions.push('2. Run performance scan to verify fixes\n');
  instructions.push('3. Ensure no new violations introduced\n');
  instructions.push('4. Re-submit for performance enforcement\n');

  return instructions.join('\n');
}

/**
 * Validate that performance regressions have not occurred
 * 
 * Compares current scan against baseline to detect regressions.
 */
export async function detectPerformanceRegression(options?: {
  baseline?: PerformanceScanResult;
  current?: PerformanceScanResult;
}): Promise<{
  hasRegression: boolean;
  details: string[];
}> {
  const baseline = options?.baseline;
  const current = options?.current || (await runPerformanceScan({ createParkingStationEntries: false }));

  if (!baseline) {
    return {
      hasRegression: false,
      details: ['No baseline available for regression detection'],
    };
  }

  const details: string[] = [];
  let hasRegression = false;

  // Check if critical violations increased
  if (current.criticalCount > baseline.criticalCount) {
    hasRegression = true;
    details.push(
      `Critical violations increased: ${baseline.criticalCount} → ${current.criticalCount} (+${current.criticalCount - baseline.criticalCount})`
    );
  }

  // Check if high violations increased
  if (current.highCount > baseline.highCount) {
    hasRegression = true;
    details.push(
      `High violations increased: ${baseline.highCount} → ${current.highCount} (+${current.highCount - baseline.highCount})`
    );
  }

  // Check if total violations increased significantly (>10%)
  const totalIncrease = current.violations.length - baseline.violations.length;
  const percentIncrease =
    baseline.violations.length > 0
      ? (totalIncrease / baseline.violations.length) * 100
      : totalIncrease > 0
        ? 100
        : 0;

  if (percentIncrease > 10) {
    hasRegression = true;
    details.push(
      `Total violations increased significantly: ${baseline.violations.length} → ${current.violations.length} (+${percentIncrease.toFixed(1)}%)`
    );
  }

  // Log regression detection
  await logGovernanceEvent({
    type: hasRegression ? 'performance_regression_detected' : 'performance_regression_check_passed',
    severity: hasRegression ? 'high' : 'info',
    description: hasRegression
      ? `Performance regression detected: ${details.join('; ')}`
      : 'No performance regression detected',
    metadata: {
      hasRegression,
      baseline: {
        totalViolations: baseline.violations.length,
        critical: baseline.criticalCount,
        high: baseline.highCount,
      },
      current: {
        totalViolations: current.violations.length,
        critical: current.criticalCount,
        high: current.highCount,
      },
      details,
    },
  });

  // Raise alert if regression detected
  if (hasRegression) {
    await raiseAlert({
      type: 'high',
      category: 'qa',
      message: 'Performance Regression Detected',
      details: `Performance has regressed:\n\n${details.join('\n')}`,
      severity: 4,
      metadata: {
        baselineViolations: baseline.violations.length,
        currentViolations: current.violations.length,
        criticalIncrease: current.criticalCount - baseline.criticalCount,
        highIncrease: current.highCount - baseline.highCount,
      },
    });
  }

  return {
    hasRegression,
    details,
  };
}
