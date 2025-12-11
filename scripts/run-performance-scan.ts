#!/usr/bin/env tsx
/**
 * CS5 Performance Scanner CLI
 * 
 * Run performance scan from command line.
 * Reports violations and creates Parking Station entries.
 */

import { runPerformanceScan, quickPerformanceScan } from '../lib/foreman/performance/performance-scanner';
import { enforcePerformanceStandards } from '../lib/foreman/performance/enforcement-engine';

async function main() {
  const args = process.argv.slice(2);
  const isQuick = args.includes('--quick');
  const isEnforce = args.includes('--enforce');

  console.log('═══════════════════════════════════════════════════════');
  console.log('  CS5 PERFORMANCE SCANNER CLI');
  console.log('═══════════════════════════════════════════════════════\n');

  try {
    if (isEnforce) {
      // Run enforcement (includes scan + PR blocking logic)
      const result = await enforcePerformanceStandards();
      
      console.log('\n═══════════════════════════════════════════════════════');
      console.log('  ENFORCEMENT RESULT');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`Status: ${result.allowed ? '✅ ALLOWED' : '❌ BLOCKED'}`);
      console.log(`Reason: ${result.reason}`);
      console.log(`Blocking Issues: ${result.blockingIssues.length}`);
      
      if (!result.allowed) {
        console.log('\nBlocking Issues:');
        result.blockingIssues.forEach((issue, idx) => {
          console.log(`  ${idx + 1}. ${issue}`);
        });
        
        process.exit(1);
      }
    } else if (isQuick) {
      // Quick scan (critical only)
      const result = await quickPerformanceScan();
      
      console.log('\n═══════════════════════════════════════════════════════');
      console.log('  QUICK SCAN RESULT (Critical Only)');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
      console.log(`Blocking Violations: ${result.blockingViolations.length}`);
      console.log(`Files Scanned: ${result.filesScanned}`);
      
      if (!result.passed) {
        process.exit(1);
      }
    } else {
      // Full scan
      const result = await runPerformanceScan();
      
      console.log('\n═══════════════════════════════════════════════════════');
      console.log('  FULL SCAN RESULT');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
      console.log(`Total Violations: ${result.violations.length}`);
      console.log(`  Critical: ${result.criticalCount}`);
      console.log(`  High: ${result.highCount}`);
      console.log(`  Medium: ${result.mediumCount}`);
      console.log(`  Low: ${result.lowCount}`);
      console.log(`Blocking Violations: ${result.blockingViolations.length}`);
      console.log(`Files Scanned: ${result.filesScanned}`);
      
      if (!result.passed) {
        process.exit(1);
      }
    }
    
    console.log('\n✅ Performance scan completed successfully');
  } catch (error) {
    console.error('\n❌ Performance scan failed:');
    console.error(error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
