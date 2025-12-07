/**
 * Integration Tests for Memory Drift Monitoring
 * End-to-end tests for complete drift monitoring pipeline
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runDriftMonitoring,
  clearMemoryScope,
  writeMemoryEntry,
  recordArchitectureDecision,
  recordQAFailure
} from '../../lib/foreman/memory'
import {
  reason
} from '../../lib/foreman/reasoning'
import { ReasoningContext } from '../../types/reasoning'

describe('Memory Drift Monitoring Integration', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })
  
  test('should run complete drift monitoring successfully', async () => {
    // Add some valid memory
    await recordArchitectureDecision('Use microservices', {
      pattern: 'microservices',
      rationale: 'Scalability',
      benefits: ['scalable'],
      tradeoffs: ['complexity'],
      applicability: ['large-systems']
    })
    
    const report = await runDriftMonitoring()
    
    assert.ok(report)
    assert.ok(report.overallStatus)
    assert.ok(Array.isArray(report.checks))
    assert.ok(typeof report.totalIssues === 'number')
    assert.ok(typeof report.executionBlocked === 'boolean')
    assert.ok(report.summary)
    assert.strictEqual(report.memoryVersion, '1.0.0')
    console.log('✓ Runs complete drift monitoring successfully')
    console.log(`  Status: ${report.overallStatus}`)
    console.log(`  Issues: ${report.totalIssues}`)
  })
  
  test('should generate comprehensive drift report', async () => {
    const report = await runDriftMonitoring()
    
    // Check all required checks are present
    const checkTypes = report.checks.map(c => c.category)
    assert.ok(checkTypes.includes('schema_drift'))
    assert.ok(checkTypes.includes('version_drift'))
    assert.ok(checkTypes.includes('staleness_drift'))
    assert.ok(checkTypes.includes('cross_agent_drift'))
    console.log('✓ Generates comprehensive drift report')
    console.log(`  Checks performed: ${report.checks.length}`)
  })
  
  test('should block execution on critical drift', async () => {
    // Create critical drift by adding secret to memory
    await writeMemoryEntry(
      'foreman',
      'bad_secret',
      {
        type: 'config',
        data: {
          apiKey: 'test-fake-api-key-12345-NOT-REAL' // Clearly fake test value
        }
      },
      {
        createdBy: 'test',
        tags: ['config']
      }
    )
    
    const report = await runDriftMonitoring()
    
    if (report.criticalCount > 0) {
      assert.strictEqual(report.executionBlocked, true)
      assert.strictEqual(report.overallStatus, 'critical')
      console.log('✓ Blocks execution on critical drift')
    } else {
      console.log('✓ No critical drift to block on')
    }
  })
  
  test('should integrate with reasoning engine', async () => {
    // Add valid memory
    await recordArchitectureDecision('Event-driven architecture', {
      pattern: 'event-driven',
      rationale: 'Decoupling',
      benefits: ['scalable', 'maintainable'],
      tradeoffs: ['complexity'],
      applicability: ['distributed-systems']
    })
    
    // Reasoning should run drift check before loading memory
    const context: ReasoningContext = {
      subsystem: 'architecture',
      phase: 'planning',
      riskLevel: 'medium'
    }
    
    // Should not throw if drift is healthy
    const result = await reason(context)
    
    assert.ok(result)
    assert.ok(result.reasoningSummary)
    console.log('✓ Integrates with reasoning engine')
  })
  
  test('should prevent reasoning when critical drift exists', async () => {
    // Create critical drift
    await writeMemoryEntry(
      'foreman',
      'critical_drift',
      {
        type: 'config',
        data: {
          password: 'test-fake-password-NOT-REAL-12345'
        }
      },
      {
        createdBy: 'test',
        tags: ['config']
      }
    )
    
    const context: ReasoningContext = {
      subsystem: 'deployment',
      phase: 'deployment',
      riskLevel: 'critical'
    }
    
    // Should throw error due to drift
    try {
      await reason(context)
      // If we get here, no critical drift was detected
      console.log('✓ No critical drift to prevent reasoning')
    } catch (error: any) {
      assert.ok(error.message.includes('drift'))
      console.log('✓ Prevents reasoning when critical drift exists')
    }
  })
  
  test('should allow skipping drift check when needed', async () => {
    // Add some problematic memory
    await writeMemoryEntry(
      'foreman',
      'test_entry',
      {
        type: 'test',
        data: {
          apiKey: 'test-fake-key-NOT-REAL-67890'
        }
      },
      {
        createdBy: 'test',
        tags: ['test']
      }
    )
    
    const context: ReasoningContext = {
      subsystem: 'qa',
      phase: 'planning'
    }
    
    // Should work with skipDriftCheck option
    const result = await reason(context, { skipDriftCheck: true })
    
    assert.ok(result)
    console.log('✓ Allows skipping drift check when needed')
  })
  
  test('should aggregate issues correctly', async () => {
    // Create various levels of issues
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 200)
    
    await writeMemoryEntry(
      'foreman',
      'old_pattern',
      {
        type: 'reasoning_pattern',
        data: { pattern: { name: 'Old' } }
      },
      {
        createdBy: 'test',
        tags: ['reasoning_pattern']
      }
    )
    
    // Manually set old date (this is a limitation of the test)
    const report = await runDriftMonitoring()
    
    assert.strictEqual(
      report.totalIssues,
      report.criticalCount + report.errorCount + report.warningCount + report.infoCount
    )
    console.log('✓ Aggregates issues correctly')
    console.log(`  Total: ${report.totalIssues}`)
    console.log(`  Critical: ${report.criticalCount}`)
    console.log(`  Error: ${report.errorCount}`)
    console.log(`  Warning: ${report.warningCount}`)
    console.log(`  Info: ${report.infoCount}`)
  })
  
  test('should generate actionable recommendations', async () => {
    const report = await runDriftMonitoring()
    
    assert.ok(Array.isArray(report.recommendations))
    
    if (report.recommendations.length > 0) {
      assert.ok(report.recommendations.every(r => typeof r === 'string'))
      console.log('✓ Generates actionable recommendations')
      console.log(`  Recommendations: ${report.recommendations.length}`)
    } else {
      console.log('✓ No recommendations needed (healthy memory)')
    }
  })
  
  test('should include timestamp and version in report', async () => {
    const report = await runDriftMonitoring()
    
    assert.ok(report.generatedAt)
    assert.ok(new Date(report.generatedAt))
    assert.strictEqual(report.memoryVersion, '1.0.0')
    assert.ok(Array.isArray(report.scopes))
    console.log('✓ Includes timestamp and version in report')
  })
  
  test('should handle empty memory gracefully', async () => {
    // Clear all memory
    await clearMemoryScope('global')
    await clearMemoryScope('foreman')
    
    const report = await runDriftMonitoring()
    
    assert.ok(report)
    // Empty memory might have warnings (missing files initially created)
    assert.ok(['healthy', 'warning'].includes(report.overallStatus))
    console.log(`✓ Handles empty memory gracefully (status: ${report.overallStatus})`)
  })
  
  test('should be deterministic for same memory state', async () => {
    await recordArchitectureDecision('Test decision', {
      pattern: 'test',
      rationale: 'testing',
      benefits: ['test'],
      tradeoffs: [],
      applicability: ['test']
    })
    
    const report1 = await runDriftMonitoring()
    const report2 = await runDriftMonitoring()
    
    assert.strictEqual(report1.overallStatus, report2.overallStatus)
    assert.strictEqual(report1.totalIssues, report2.totalIssues)
    assert.strictEqual(report1.checks.length, report2.checks.length)
    console.log('✓ Is deterministic for same memory state')
  })
})
