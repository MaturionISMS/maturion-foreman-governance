#!/usr/bin/env tsx
/**
 * Overnight Execution Script
 * 
 * Manually triggers the overnight execution orchestrator to process all open issues.
 * This can be run manually or scheduled via cron/GitHub Actions.
 * 
 * Usage:
 *   npx tsx scripts/run-overnight-execution.ts [options]
 * 
 * Options:
 *   --owner <owner>       GitHub repository owner (default: MaturionISMS)
 *   --repo <repo>         GitHub repository name (default: maturion-foreman-app)
 *   --max-issues <num>    Maximum number of issues to process (default: 50)
 *   --dry-run            Run in dry-run mode (no PRs created)
 *   --help               Show this help message
 */

import { runOvernightExecution, getOvernightExecutionConfig } from '../lib/foreman/overnight-execution';
import { getQuotaUsage } from '../lib/foreman/model-escalation';
import { checkLocalBuilderHealth } from '../lib/foreman/desktop-sync';
import { getGovernanceStats } from '../lib/foreman/memory/governance-memory';

// Parse command line arguments
function parseArgs(): {
  owner: string;
  repo: string;
  maxIssues: number;
  dryRun: boolean;
  help: boolean;
} {
  const args = process.argv.slice(2);
  const result = {
    owner: 'MaturionISMS',
    repo: 'maturion-foreman-app',
    maxIssues: 50,
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
    } else if (arg === '--max-issues' && i + 1 < args.length) {
      result.maxIssues = parseInt(args[++i], 10);
    } else if (arg === '--dry-run') {
      result.dryRun = true;
    }
  }

  return result;
}

// Show help message
function showHelp(): void {
  console.log(`
Overnight Execution Script

Usage:
  npx tsx scripts/run-overnight-execution.ts [options]

Options:
  --owner <owner>       GitHub repository owner (default: MaturionISMS)
  --repo <repo>         GitHub repository name (default: maturion-foreman-app)
  --max-issues <num>    Maximum number of issues to process (default: 50)
  --dry-run            Run in dry-run mode (no PRs created)
  --help               Show this help message

Examples:
  # Run with defaults
  npx tsx scripts/run-overnight-execution.ts

  # Run for specific repository
  npx tsx scripts/run-overnight-execution.ts --owner myorg --repo myrepo

  # Dry run to see what would happen
  npx tsx scripts/run-overnight-execution.ts --dry-run

  # Process only 10 issues
  npx tsx scripts/run-overnight-execution.ts --max-issues 10
`);
}

async function main() {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  🌙 OVERNIGHT EXECUTION ORCHESTRATOR                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check if GITHUB_TOKEN is available
  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is not set');
    console.error('Please set GITHUB_TOKEN to a valid GitHub personal access token or GitHub App token');
    process.exit(1);
  }

  // Show configuration
  const config = getOvernightExecutionConfig();
  console.log('📋 Configuration:');
  console.log(`   Repository: ${args.owner}/${args.repo}`);
  console.log(`   Max Issues: ${args.maxIssues}`);
  console.log(`   Dry Run: ${args.dryRun ? 'Yes' : 'No'}`);
  console.log(`   Model Escalation: ${config.enableModelEscalation ? 'Enabled' : 'Disabled'}`);
  console.log(`   Auto-Heal: ${config.enableAutoHeal ? 'Enabled' : 'Disabled'}`);
  console.log(`   Desktop Sync: ${config.enableDesktopSync ? 'Enabled' : 'Disabled'}`);
  console.log('');

  // Show pre-flight status
  console.log('🔍 Pre-flight Checks:');
  
  try {
    const quotaUsage = getQuotaUsage();
    console.log(`   Model Quota: Daily=${quotaUsage.daily}, Hourly=${quotaUsage.hourly}, Concurrent=${quotaUsage.concurrent}`);
    
    if (config.enableDesktopSync) {
      const builderHealth = await checkLocalBuilderHealth();
      console.log(`   Local Builder: ${builderHealth.ready ? '✅ Ready' : '⚠️ Not Ready'}`);
      if (!builderHealth.ready && builderHealth.issues.length > 0) {
        for (const issue of builderHealth.issues) {
          console.log(`      - ${issue}`);
        }
      }
    }

    const governanceStats = getGovernanceStats();
    console.log(`   Governance Events: ${governanceStats.total} total`);
  } catch (error) {
    console.warn(`   ⚠️ Pre-flight check warning: ${(error as Error).message}`);
  }
  
  console.log('');

  if (args.dryRun) {
    console.log('⚠️  DRY RUN MODE - No PRs will be created\n');
  }

  // Run the overnight execution
  try {
    const customConfig = {
      ...config,
      maxIssuesPerRun: args.maxIssues,
      createPRsAutomatically: !args.dryRun,
    };

    const result = await runOvernightExecution(args.owner, args.repo, customConfig);

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  ✅ OVERNIGHT EXECUTION COMPLETED                          ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('📊 Final Results:');
    console.log(`   Run ID: ${result.id}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Duration: ${new Date(result.endTime!).getTime() - new Date(result.startTime).getTime()}ms`);
    console.log(`   Total Issues: ${result.totalIssues}`);
    console.log(`   Processed: ${result.processedIssues}`);
    console.log(`   Successful: ${result.successfulIssues} ✅`);
    console.log(`   Failed: ${result.failedIssues} ❌`);
    console.log(`   Skipped: ${result.skippedIssues} ⏭️`);
    console.log('');

    if (result.errors.length > 0) {
      console.log('⚠️  Errors encountered:');
      for (const error of result.errors) {
        console.log(`   - ${error}`);
      }
      console.log('');
    }

    // Exit with appropriate code
    if (result.status === 'failed') {
      process.exit(1);
    } else if (result.status === 'partial' && result.failedIssues > 0) {
      process.exit(2);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error('\n╔════════════════════════════════════════════════════════════╗');
    console.error('║  ❌ OVERNIGHT EXECUTION FAILED                             ║');
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
