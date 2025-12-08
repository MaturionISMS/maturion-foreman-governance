#!/usr/bin/env tsx
/**
 * Pre-flight Validation Script
 * Phase 6: Pre-flight Validation
 * 
 * Validates environment alignment before PR creation.
 * Blocks PR creation if environment mismatch detected.
 * Logs mismatches to governance memory.
 * 
 * Usage:
 *   npx tsx scripts/pre-flight-validation.ts
 *   npm run qa:preflight
 * 
 * Exit Codes:
 *   0 - Environment aligned, safe to create PR
 *   1 - Environment misaligned, PR creation blocked
 */

import { 
  validateGitHubWorkflowAlignment,
  QIEL_CONFIG,
  generateConfigReport,
} from '../lib/foreman/qiel-config';
import { compareEnvironments } from '../scripts/qiel-env-diff';
import * as fs from 'fs';
import * as path from 'path';

interface PreflightResult {
  passed: boolean;
  timestamp: string;
  checks: {
    environmentAlignment: boolean;
    workflowAlignment: boolean;
    nodeVersion: boolean;
    dependencies: boolean;
  };
  mismatches: string[];
  recommendations: string[];
  blocksPR: boolean;
}

/**
 * Run pre-flight validation checks
 */
async function runPreflightValidation(): Promise<PreflightResult> {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║   QIEL Pre-flight Validation                         ║');
  console.log('║   Validating environment before PR creation          ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  const result: PreflightResult = {
    passed: true,
    timestamp: new Date().toISOString(),
    checks: {
      environmentAlignment: false,
      workflowAlignment: false,
      nodeVersion: false,
      dependencies: false,
    },
    mismatches: [],
    recommendations: [],
    blocksPR: false,
  };

  // Check 1: Environment alignment
  console.log('[Preflight] Check 1: Environment alignment...');
  const envComparison = compareEnvironments();
  result.checks.environmentAlignment = envComparison.aligned;
  
  if (!envComparison.aligned) {
    result.passed = false;
    result.mismatches.push(...envComparison.differences);
    result.recommendations.push(...envComparison.recommendations);
    console.log('❌ Environment alignment check FAILED\n');
  } else {
    console.log('✅ Environment alignment check PASSED\n');
  }

  // Check 2: Workflow alignment
  console.log('[Preflight] Check 2: GitHub workflow alignment...');
  const workflowValidation = validateGitHubWorkflowAlignment();
  result.checks.workflowAlignment = workflowValidation.aligned;
  
  if (!workflowValidation.aligned) {
    result.passed = false;
    result.mismatches.push(...workflowValidation.differences);
    result.recommendations.push('Sync .github/workflows/qiel.yml with lib/foreman/qiel-config.ts');
    console.log('❌ Workflow alignment check FAILED\n');
  } else {
    console.log('✅ Workflow alignment check PASSED\n');
  }

  // Check 3: Node version
  console.log('[Preflight] Check 3: Node.js version...');
  const localNodeVersion = process.version.replace('v', '').split('.')[0];
  result.checks.nodeVersion = localNodeVersion === QIEL_CONFIG.nodeVersion;
  
  if (!result.checks.nodeVersion) {
    result.passed = false;
    result.mismatches.push(
      `Node version mismatch: Local=${localNodeVersion}, Required=${QIEL_CONFIG.nodeVersion}`
    );
    result.recommendations.push(`Install Node.js ${QIEL_CONFIG.nodeVersion}`);
    console.log(`❌ Node version check FAILED: ${localNodeVersion} vs ${QIEL_CONFIG.nodeVersion}\n`);
  } else {
    console.log(`✅ Node version check PASSED: ${localNodeVersion}\n`);
  }

  // Check 4: Dependencies
  console.log('[Preflight] Check 4: Dependencies...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const hasRequiredScripts = [
      'typecheck',
      'lint',
      'test:all',
      'qiel:quick',
      'qiel:full',
      'qa:diff',
    ].every(script => packageJson.scripts && packageJson.scripts[script]);
    
    result.checks.dependencies = hasRequiredScripts;
    
    if (!hasRequiredScripts) {
      result.passed = false;
      result.mismatches.push('Missing required npm scripts');
      result.recommendations.push('Ensure all required npm scripts are defined in package.json');
      console.log('❌ Dependencies check FAILED\n');
    } else {
      console.log('✅ Dependencies check PASSED\n');
    }
  } else {
    result.passed = false;
    result.mismatches.push('package.json not found');
    console.log('❌ Dependencies check FAILED\n');
  }

  // Determine if PR should be blocked
  result.blocksPR = !result.passed;

  return result;
}

/**
 * Log mismatches to governance memory
 */
async function logToGovernanceMemory(result: PreflightResult): Promise<void> {
  const governanceDir = path.join(process.cwd(), 'memory/foreman');
  const governanceFile = path.join(governanceDir, 'preflight-validations.json');

  // Ensure directory exists
  if (!fs.existsSync(governanceDir)) {
    fs.mkdirSync(governanceDir, { recursive: true });
  }

  // Load existing governance memory
  let governanceMemory: any[] = [];
  if (fs.existsSync(governanceFile)) {
    try {
      governanceMemory = JSON.parse(fs.readFileSync(governanceFile, 'utf-8'));
    } catch (error) {
      console.warn('[Preflight] Warning: Could not parse existing governance memory');
    }
  }

  // Add new entry
  const entry = {
    id: `preflight-${Date.now()}`,
    timestamp: result.timestamp,
    passed: result.passed,
    checks: result.checks,
    mismatches: result.mismatches,
    recommendations: result.recommendations,
    blocksPR: result.blocksPR,
    type: 'preflight-validation',
  };

  governanceMemory.push(entry);

  // Keep only last 100 entries
  if (governanceMemory.length > 100) {
    governanceMemory = governanceMemory.slice(-100);
  }

  // Write back to file
  fs.writeFileSync(governanceFile, JSON.stringify(governanceMemory, null, 2), 'utf-8');
  
  console.log(`[Preflight] Logged to governance memory: ${governanceFile}`);
}

/**
 * Generate preflight report
 */
function generateReport(result: PreflightResult): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════════════════');
  lines.push('  QIEL Pre-flight Validation Report');
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('');
  lines.push(`Timestamp: ${result.timestamp}`);
  lines.push(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  lines.push(`PR Creation: ${result.blocksPR ? '🚫 BLOCKED' : '✅ ALLOWED'}`);
  lines.push('');

  lines.push('Checks:');
  lines.push(`  Environment Alignment: ${result.checks.environmentAlignment ? '✅' : '❌'}`);
  lines.push(`  Workflow Alignment: ${result.checks.workflowAlignment ? '✅' : '❌'}`);
  lines.push(`  Node Version: ${result.checks.nodeVersion ? '✅' : '❌'}`);
  lines.push(`  Dependencies: ${result.checks.dependencies ? '✅' : '❌'}`);
  lines.push('');

  if (result.mismatches.length > 0) {
    lines.push('Mismatches Detected:');
    result.mismatches.forEach((mismatch, idx) => {
      lines.push(`  ${idx + 1}. ${mismatch}`);
    });
    lines.push('');
  }

  if (result.recommendations.length > 0) {
    lines.push('Recommendations:');
    result.recommendations.forEach((rec, idx) => {
      lines.push(`  ${idx + 1}. ${rec}`);
    });
    lines.push('');
  }

  if (result.blocksPR) {
    lines.push('⚠️  PR CREATION BLOCKED');
    lines.push('Fix all mismatches before creating a pull request.');
    lines.push('Run "npm run qa:diff" to verify alignment.');
  } else {
    lines.push('✅ ENVIRONMENT VALIDATED');
    lines.push('Safe to create pull request.');
  }

  lines.push('');
  lines.push('Per True North Philosophy:');
  lines.push('  - Configuration drift is not permitted');
  lines.push('  - All environments must be identical');
  lines.push('  - Zero tolerance for misalignment');
  lines.push('═══════════════════════════════════════════════════════');

  return lines.join('\n');
}

/**
 * Main execution
 */
async function main() {
  try {
    const result = await runPreflightValidation();

    // Log to governance memory
    await logToGovernanceMemory(result);

    // Generate and display report
    const report = generateReport(result);
    console.log('\n' + report + '\n');

    // Save report to file
    const reportPath = path.join(process.cwd(), 'preflight-validation-report.md');
    fs.writeFileSync(reportPath, report, 'utf-8');
    console.log(`Report saved to: ${reportPath}\n`);

    // Exit with appropriate code
    if (result.blocksPR) {
      console.error('❌ Pre-flight validation FAILED - PR creation blocked\n');
      process.exit(1);
    } else {
      console.log('✅ Pre-flight validation PASSED - Safe to create PR\n');
      process.exit(0);
    }
  } catch (error) {
    console.error('Fatal error during pre-flight validation:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { runPreflightValidation, logToGovernanceMemory };
