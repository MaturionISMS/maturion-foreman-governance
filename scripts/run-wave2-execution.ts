#!/usr/bin/env tsx
/**
 * Wave 2 Execution Script
 * 
 * Runs the complete Wave 2 Execution:
 * - Closes all QIC/QIEL incidents
 * - Rebuilds dependency graph
 * - Initializes constitutional layering
 * - Executes remaining issues
 * - Enables autonomous mode
 * 
 * Usage:
 *   npx tsx scripts/run-wave2-execution.ts [options]
 * 
 * Options:
 *   --owner <owner>     GitHub repository owner (default: MaturionISMS)
 *   --repo <repo>       GitHub repository name (default: maturion-foreman-app)
 *   --dry-run          Run in dry-run mode (no actual changes)
 *   --skip-incidents   Skip closing QIC/QIEL incidents
 *   --skip-dependencies Skip rebuilding dependency graph
 *   --skip-constitutional Skip initializing constitutional layering
 *   --skip-execution   Skip executing remaining issues
 *   --skip-autonomous  Skip enabling autonomous mode
 *   --help             Show this help message
 */

import { runWave2Execution, Wave2ExecutionConfig } from '../lib/foreman/wave2-execution';

// Parse command line arguments
function parseArgs(): Wave2ExecutionConfig & { help: boolean } {
  const args = process.argv.slice(2);
  const result: Wave2ExecutionConfig & { help: boolean } = {
    owner: 'MaturionISMS',
    repo: 'maturion-foreman-app',
    closeQICIncidents: true,
    rebuildDependencyGraph: true,
    initializeConstitutionalLayering: true,
    executeRemainingIssues: true,
    enterAutonomousMode: true,
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--owner' && i + 1 < args.length) {
      result.owner = args[++i];
    } else if (arg === '--repo' && i + 1 < args.length) {
      result.repo = args[++i];
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    } else if (arg === '--skip-incidents') {
      result.closeQICIncidents = false;
    } else if (arg === '--skip-dependencies') {
      result.rebuildDependencyGraph = false;
    } else if (arg === '--skip-constitutional') {
      result.initializeConstitutionalLayering = false;
    } else if (arg === '--skip-execution') {
      result.executeRemainingIssues = false;
    } else if (arg === '--skip-autonomous') {
      result.enterAutonomousMode = false;
    }
  }

  return result;
}

// Show help message
function showHelp(): void {
  console.log(`
Wave 2 Execution Script

Usage:
  npx tsx scripts/run-wave2-execution.ts [options]

Options:
  --owner <owner>         GitHub repository owner (default: MaturionISMS)
  --repo <repo>           GitHub repository name (default: maturion-foreman-app)
  --dry-run              Run in dry-run mode (no actual changes)
  --skip-incidents       Skip closing QIC/QIEL incidents
  --skip-dependencies    Skip rebuilding dependency graph
  --skip-constitutional  Skip initializing constitutional layering
  --skip-execution       Skip executing remaining issues
  --skip-autonomous      Skip enabling autonomous mode
  --help                 Show this help message

Examples:
  # Run complete Wave 2 execution
  npx tsx scripts/run-wave2-execution.ts

  # Dry run to see what would happen
  npx tsx scripts/run-wave2-execution.ts --dry-run

  # Run for specific repository
  npx tsx scripts/run-wave2-execution.ts --owner myorg --repo myrepo

  # Close incidents only
  npx tsx scripts/run-wave2-execution.ts --skip-dependencies --skip-constitutional --skip-execution --skip-autonomous

  # Execute remaining issues only
  npx tsx scripts/run-wave2-execution.ts --skip-incidents --skip-dependencies --skip-constitutional --skip-autonomous
`);
}

async function main() {
  const config = parseArgs();

  if (config.help) {
    showHelp();
    process.exit(0);
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  🌙 OVERNIGHT EXECUTION WAVE 2 ORCHESTRATOR                ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check if GITHUB_MCP_TOKEN is available
  if (!process.env.GITHUB_MCP_TOKEN) {
    console.error('❌ Error: GITHUB_MCP_TOKEN environment variable is not set');
    console.error('Please set GITHUB_MCP_TOKEN to a valid GitHub personal access token or GitHub App token');
    process.exit(1);
  }

  // Show configuration
  console.log('📋 Configuration:');
  console.log(`   Repository: ${config.owner}/${config.repo}`);
  console.log(`   Dry Run: ${config.dryRun ? 'Yes' : 'No'}`);
  console.log(`   Close QIC Incidents: ${config.closeQICIncidents ? 'Yes' : 'No'}`);
  console.log(`   Rebuild Dependency Graph: ${config.rebuildDependencyGraph ? 'Yes' : 'No'}`);
  console.log(`   Initialize Constitutional Layering: ${config.initializeConstitutionalLayering ? 'Yes' : 'No'}`);
  console.log(`   Execute Remaining Issues: ${config.executeRemainingIssues ? 'Yes' : 'No'}`);
  console.log(`   Enable Autonomous Mode: ${config.enterAutonomousMode ? 'Yes' : 'No'}`);
  console.log('');

  if (config.dryRun) {
    console.log('⚠️  DRY RUN MODE - No actual changes will be made\n');
  }

  // Run Wave 2 execution
  try {
    const result = await runWave2Execution(config);

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    if (result.success) {
      console.log('║  ✅ WAVE 2 EXECUTION COMPLETED SUCCESSFULLY                ║');
    } else {
      console.log('║  ❌ WAVE 2 EXECUTION FAILED                                ║');
    }
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Final Results:');
    console.log(`   Success: ${result.success ? '✅ Yes' : '❌ No'}`);
    console.log(`   Phases Completed: ${result.phasesCompleted.length}`);
    console.log(`   Phases Failed: ${result.phasesFailed.length}`);
    console.log(`   QIC Incidents Closed: ${result.incidentsClosed}`);
    console.log(`   Dependency Graph Rebuilt: ${result.dependencyGraphRebuilt ? 'Yes' : 'No'}`);
    console.log(`   Constitutional Layering: ${result.constitutionalLayeringInitialized ? 'Active' : 'Inactive'}`);
    console.log(`   Issues Executed: ${result.issuesExecuted}`);
    console.log(`   Autonomous Mode: ${result.autonomousModeEnabled ? 'Enabled' : 'Disabled'}`);
    console.log(`   QIEL Validation: ${result.qielValidationPassed ? 'Passed' : 'Failed'}`);
    console.log('');

    if (result.phasesCompleted.length > 0) {
      console.log('✅ Phases Completed:');
      result.phasesCompleted.forEach((phase, idx) => {
        console.log(`   ${idx + 1}. ${phase}`);
      });
      console.log('');
    }

    if (result.phasesFailed.length > 0) {
      console.log('❌ Phases Failed:');
      result.phasesFailed.forEach((phase, idx) => {
        console.log(`   ${idx + 1}. ${phase}`);
      });
      console.log('');
    }

    if (result.reports.length > 0) {
      console.log('📋 Reports:');
      result.reports.forEach((report, idx) => {
        console.log(`   ${idx + 1}. ${report}`);
      });
      console.log('');
    }

    if (result.errors.length > 0) {
      console.log('⚠️  Errors encountered:');
      result.errors.forEach((error, idx) => {
        console.log(`   ${idx + 1}. ${error}`);
      });
      console.log('');
    }

    // Exit with appropriate code
    if (!result.success) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error('\n╔════════════════════════════════════════════════════════════╗');
    console.error('║  ❌ WAVE 2 EXECUTION FAILED                                ║');
    console.error('╚════════════════════════════════════════════════════════════╝\n');
    console.error('Error:', (error as Error).message);
    console.error('\nStack trace:');
    console.error((error as Error).stack);
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
