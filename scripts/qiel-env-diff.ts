#!/usr/bin/env tsx
/**
 * QIEL Environment Diff Tool
 * 
 * Compares Foreman's local environment configuration with GitHub Actions
 * to ensure ZERO DRIFT between environments.
 * 
 * Usage:
 *   npx tsx scripts/qiel-env-diff.ts
 *   npm run qa:diff --env github
 * 
 * Per QIEL Environment Alignment requirements:
 * - Validates Node version matches
 * - Validates QIEL configuration matches
 * - Validates log paths match
 * - Validates build commands match
 * - Validates thresholds match
 * - Validates drift rules match
 * - Validates QIW patterns match
 * 
 * Exit Codes:
 * - 0: Environments are ALIGNED
 * - 1: Environments have DIFFERENCES (blocks PR creation)
 */

import { 
  QIEL_CONFIG,
  validateGitHubWorkflowAlignment,
  generateConfigReport,
} from '../lib/foreman/qiel-config';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Compare local environment with GitHub Actions
 */
function compareEnvironments(): {
  aligned: boolean;
  differences: string[];
  recommendations: string[];
} {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║   QIEL Environment Diff Tool                         ║');
  console.log('║   Comparing Foreman vs GitHub Actions                ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  const differences: string[] = [];
  const recommendations: string[] = [];

  // 1. Validate GitHub workflow alignment
  console.log('[Diff] Validating GitHub workflow configuration...');
  const workflowValidation = validateGitHubWorkflowAlignment();
  
  if (!workflowValidation.aligned) {
    differences.push(...workflowValidation.differences);
    recommendations.push('Update .github/workflows/qiel.yml to match lib/foreman/qiel-config.ts');
  } else {
    console.log('✅ GitHub workflow is aligned with config\n');
  }

  // 2. Check Node version locally
  console.log('[Diff] Validating Node.js version...');
  const localNodeVersion = process.version.replace('v', '').split('.')[0];
  
  if (localNodeVersion !== QIEL_CONFIG.nodeVersion) {
    differences.push(
      `Local Node version mismatch: Local=${localNodeVersion}, Config=${QIEL_CONFIG.nodeVersion}`
    );
    recommendations.push(`Install Node.js ${QIEL_CONFIG.nodeVersion} to match GitHub Actions`);
    console.log(`❌ Node version mismatch: ${localNodeVersion} vs ${QIEL_CONFIG.nodeVersion}\n`);
  } else {
    console.log(`✅ Node version matches: ${localNodeVersion}\n`);
  }

  // 3. Validate package.json scripts match expected commands
  console.log('[Diff] Validating package.json scripts...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const scripts = packageJson.scripts || {};

    // Required scripts derived from unified config to maintain single source of truth
    const requiredScripts: string[] = [
      // Build commands from config
      ...Object.keys(QIEL_CONFIG.execution.buildCommands).map(cmd => {
        // Extract script name from command like "npm run typecheck" -> "typecheck"
        const command = QIEL_CONFIG.execution.buildCommands[cmd as keyof typeof QIEL_CONFIG.execution.buildCommands];
        return command.replace(/^npm run /, '');
      }),
      // QIEL commands
      'qiel:quick',
      'qiel:full',
    ];

    // Remove duplicates
    const uniqueRequiredScripts = Array.from(new Set(requiredScripts));

    for (const scriptName of uniqueRequiredScripts) {
      if (!scripts[scriptName]) {
        differences.push(`Missing required script in package.json: ${scriptName}`);
        recommendations.push(`Add "${scriptName}" script to package.json`);
      }
    }

    if (uniqueRequiredScripts.every(s => scripts[s])) {
      console.log('✅ All required npm scripts are present\n');
    }
  } else {
    differences.push('package.json not found');
  }

  // 4. Validate log directory exists
  console.log('[Diff] Validating log directory...');
  const logDir = '/tmp';
  
  if (!fs.existsSync(logDir)) {
    differences.push(`Log directory does not exist: ${logDir}`);
    recommendations.push(`Create log directory: mkdir -p ${logDir}`);
  } else {
    console.log(`✅ Log directory exists: ${logDir}\n`);
  }

  // 5. Check for environment variables
  console.log('[Diff] Validating environment variables...');
  const requiredEnvVars = QIEL_CONFIG.environment.requiredEnvVars;
  const missingEnvVars: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }

  if (missingEnvVars.length > 0) {
    differences.push(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    recommendations.push(`Set required environment variables: ${missingEnvVars.join(', ')}`);
    console.log(`❌ Missing environment variables: ${missingEnvVars.join(', ')}\n`);
  } else {
    console.log('✅ All required environment variables are set\n');
  }

  // 6. Generate configuration summary
  console.log('[Diff] Configuration Summary:');
  console.log(`  - QIEL Config Version: ${QIEL_CONFIG.version}`);
  console.log(`  - Node Version: ${QIEL_CONFIG.nodeVersion}`);
  console.log(`  - QIW Enabled Channels: ${QIEL_CONFIG.qiw.enabledChannels.length}`);
  console.log(`  - Drift Checks Enabled: ${QIEL_CONFIG.drift.enabledChecks.length}`);
  console.log(`  - Memory Version: ${QIEL_CONFIG.drift.memoryVersion}`);
  console.log(`  - Schema Version: ${QIEL_CONFIG.drift.schemaVersion}\n`);

  return {
    aligned: differences.length === 0,
    differences,
    recommendations,
  };
}

/**
 * Main execution
 */
async function main() {
  const result = compareEnvironments();

  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║   QIEL Environment Diff Results                      ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  if (result.aligned) {
    console.log('✅ ✅ ✅ ENVIRONMENTS ARE ALIGNED ✅ ✅ ✅\n');
    console.log('Foreman and GitHub Actions use IDENTICAL configuration.');
    console.log('QIEL will produce IDENTICAL results in both environments.\n');
    
    console.log('Summary:');
    console.log(`  - Total Differences: 0`);
    console.log(`  - Status: PASS`);
    console.log(`  - Safe to merge: YES\n`);

    // Generate and save full configuration report
    const report = generateConfigReport();
    const reportPath = path.join(process.cwd(), 'qiel-env-report.md');
    fs.writeFileSync(reportPath, report, 'utf-8');
    console.log(`Full configuration report saved to: ${reportPath}\n`);

    process.exit(0);
  } else {
    console.log('❌ ❌ ❌ ENVIRONMENTS ARE MISALIGNED ❌ ❌ ❌\n');
    console.log('Foreman and GitHub Actions have DIFFERENT configuration.');
    console.log('This will cause QIEL to report different results!\n');

    console.log('Summary:');
    console.log(`  - Total Differences: ${result.differences.length}`);
    console.log(`  - Status: FAIL`);
    console.log(`  - Safe to merge: NO\n`);

    console.log('Differences Found:\n');
    result.differences.forEach((diff, idx) => {
      console.log(`  ${idx + 1}. ${diff}`);
    });
    console.log('');

    if (result.recommendations.length > 0) {
      console.log('Recommendations:\n');
      result.recommendations.forEach((rec, idx) => {
        console.log(`  ${idx + 1}. ${rec}`);
      });
      console.log('');
    }

    console.log('⚠️  BLOCKING PR CREATION');
    console.log('Fix all differences before creating a PR.\n');

    // Generate and save full configuration report
    const report = generateConfigReport();
    const reportPath = path.join(process.cwd(), 'qiel-env-report.md');
    fs.writeFileSync(reportPath, report, 'utf-8');
    console.log(`Full configuration report saved to: ${reportPath}\n`);

    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error running environment diff:', error);
    process.exit(1);
  });
}

export { compareEnvironments };
