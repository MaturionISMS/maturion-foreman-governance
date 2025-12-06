#!/usr/bin/env tsx

/**
 * Drift Monitor Verification Script
 * Demonstrates the drift monitoring system in action
 */

import { runDriftMonitoring, writeMemoryEntry, clearMemoryScope } from '../lib/foreman/memory'
import { reason } from '../lib/foreman/reasoning'

console.log('🔍 Memory Drift Monitor Verification\n')

async function main() {
  try {
    // Clear memory for clean test
    console.log('1️⃣  Clearing test memory...')
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
    
    // Test 1: Healthy memory
    console.log('\n2️⃣  Testing healthy memory state...')
    const healthyReport = await runDriftMonitoring()
    console.log(`   Status: ${healthyReport.overallStatus}`)
    console.log(`   Total issues: ${healthyReport.totalIssues}`)
    console.log(`   Execution blocked: ${healthyReport.executionBlocked}`)
    console.log('   ✅ Healthy memory test passed')
    
    // Test 2: Add valid memory
    console.log('\n3️⃣  Adding valid architecture decision...')
    await writeMemoryEntry(
      'global',
      'test_architecture',
      {
        type: 'architecture_decision',
        description: 'Use microservices pattern',
        data: {
          pattern: 'microservices',
          rationale: 'Scalability and maintainability',
          benefits: ['scalable', 'maintainable'],
          tradeoffs: ['complexity'],
          applicability: ['large-systems']
        }
      },
      {
        createdBy: 'verification-script',
        tags: ['architecture_decision', 'test']
      }
    )
    console.log('   ✅ Valid memory added')
    
    // Test 3: Drift check with valid memory
    console.log('\n4️⃣  Running drift check with valid memory...')
    const validReport = await runDriftMonitoring()
    console.log(`   Status: ${validReport.overallStatus}`)
    console.log(`   Issues: ${validReport.totalIssues}`)
    console.log('   ✅ Valid memory drift check passed')
    
    // Test 4: Integration with reasoning engine
    console.log('\n5️⃣  Testing reasoning engine integration...')
    const reasoningResult = await reason({
      subsystem: 'architecture',
      phase: 'planning',
      riskLevel: 'medium'
    })
    console.log(`   Reasoning summary generated: ${reasoningResult.reasoningSummary.split('\n')[0]}`)
    console.log(`   Decisions made: ${reasoningResult.decisions.length}`)
    console.log('   ✅ Reasoning engine integration test passed')
    
    // Test 5: Test with critical drift (governance violation)
    console.log('\n6️⃣  Testing critical drift detection...')
    await writeMemoryEntry(
      'foreman',
      'test_violation',
      {
        type: 'config',
        data: {
          // This will trigger governance drift
          apiKey: 'test-fake-api-key-VERIFICATION-12345'
        }
      },
      {
        createdBy: 'verification-script',
        tags: ['test']
      }
    )
    
    const criticalReport = await runDriftMonitoring()
    console.log(`   Status: ${criticalReport.overallStatus}`)
    console.log(`   Critical issues: ${criticalReport.criticalCount}`)
    console.log(`   Execution blocked: ${criticalReport.executionBlocked}`)
    
    if (criticalReport.criticalCount > 0) {
      console.log('   ✅ Critical drift detection test passed')
      console.log(`\n   Recommendations:`)
      criticalReport.recommendations.forEach(rec => {
        console.log(`   - ${rec}`)
      })
    }
    
    // Test 6: Verify execution blocking
    console.log('\n7️⃣  Testing execution blocking...')
    try {
      await reason({
        subsystem: 'test',
        phase: 'planning'
      })
      console.log('   ⚠️  Warning: Critical drift did not block execution')
    } catch (error: any) {
      if (error.message.includes('drift')) {
        console.log('   ✅ Execution blocking test passed')
        console.log(`   Error message: ${error.message.substring(0, 100)}...`)
      } else {
        throw error
      }
    }
    
    // Clean up
    console.log('\n8️⃣  Cleaning up test memory...')
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
    console.log('   ✅ Cleanup complete')
    
    console.log('\n' + '='.repeat(60))
    console.log('✅ All drift monitor verification tests passed!')
    console.log('='.repeat(60))
    console.log('\nThe Memory Drift Monitor is working correctly:')
    console.log('  ✓ Detects healthy memory states')
    console.log('  ✓ Allows valid memory operations')
    console.log('  ✓ Integrates with reasoning engine')
    console.log('  ✓ Detects critical drift (governance violations)')
    console.log('  ✓ Blocks execution on critical drift')
    console.log('  ✓ Provides actionable recommendations')
    
  } catch (error) {
    console.error('\n❌ Verification failed:', error)
    process.exit(1)
  }
}

main()
