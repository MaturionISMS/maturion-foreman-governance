/**
 * Summary Endpoint Tests
 * Tests for /api/foreman/analytics/summary endpoint
 */

import { describe, test } from 'node:test'
import { getAnalyticsSummary } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Analytics Summary Endpoint', () => {
  test('should return complete analytics summary', async () => {
    const summary = await getAnalyticsSummary()

    // Validate structure
    assert(summary !== null, 'Summary should not be null')
    assert(summary.timestamp !== undefined, 'Summary should have timestamp')
    assert(summary.memory !== undefined, 'Summary should have memory analytics')
    assert(summary.drift !== undefined, 'Summary should have drift analytics')
    assert(summary.consolidation !== undefined, 'Summary should have consolidation analytics')
    assert(summary.retirement !== undefined, 'Summary should have retirement analytics')
    assert(summary.evolution !== undefined, 'Summary should have evolution analytics')
    assert(summary.builders !== undefined, 'Summary should have builder analytics')
    assert(summary.projects !== undefined, 'Summary should have project analytics')
    assert(summary.governance !== undefined, 'Summary should have governance analytics')
    assert(summary.systemHealth !== undefined, 'Summary should have system health')

    console.log('✓ Complete analytics summary structure validated')
  })

  test('should have valid system health', async () => {
    const summary = await getAnalyticsSummary()

    assert(summary.systemHealth.overallScore >= 0, 'Overall score should be >= 0')
    assert(summary.systemHealth.overallScore <= 100, 'Overall score should be <= 100')
    assert(
      ['healthy', 'warning', 'critical'].includes(summary.systemHealth.status),
      'Status should be healthy, warning, or critical'
    )
    assert(Array.isArray(summary.systemHealth.alerts), 'Alerts should be an array')

    console.log('✓ System health validated')
    console.log(`  Overall score: ${summary.systemHealth.overallScore}`)
    console.log(`  Status: ${summary.systemHealth.status}`)
  })

  test('should be deterministic for same state', async () => {
    const summary1 = await getAnalyticsSummary()
    const summary2 = await getAnalyticsSummary()

    // Memory counts should be the same
    assert(
      summary1.memory.activeCount === summary2.memory.activeCount,
      'Active memory count should be deterministic'
    )
    assert(
      summary1.memory.consolidatedCount === summary2.memory.consolidatedCount,
      'Consolidated memory count should be deterministic'
    )

    console.log('✓ Summary is deterministic')
  })

  test('should return valid metric ranges', async () => {
    const summary = await getAnalyticsSummary()

    // Validate memory metrics
    assert(summary.memory.activeCount >= 0, 'Active count should be >= 0')
    assert(summary.memory.consolidatedCount >= 0, 'Consolidated count should be >= 0')
    assert(summary.memory.archivedCount >= 0, 'Archived count should be >= 0')
    assert(summary.memory.fragmentation.fragmentationScore >= 0, 'Fragmentation score should be >= 0')
    assert(summary.memory.fragmentation.fragmentationScore <= 1, 'Fragmentation score should be <= 1')

    // Validate drift metrics
    assert(summary.drift.activeDriftAlerts >= 0, 'Active drift alerts should be >= 0')
    assert(summary.drift.criticalCount >= 0, 'Critical count should be >= 0')
    assert(summary.drift.errorCount >= 0, 'Error count should be >= 0')

    // Validate consolidation metrics
    assert(summary.consolidation.knowledgeBlocksCreated >= 0, 'Knowledge blocks should be >= 0')
    assert(summary.consolidation.compressionRatio >= 0, 'Compression ratio should be >= 0')

    console.log('✓ All metric ranges validated')
  })

  test('should not hallucinate metrics', async () => {
    const summary = await getAnalyticsSummary()

    // Verify that counts are consistent
    const totalMemory = summary.memory.activeCount + 
                       summary.memory.consolidatedCount + 
                       summary.memory.archivedCount
    
    assert(
      totalMemory === summary.memory.totalSize,
      `Total memory (${totalMemory}) should equal totalSize (${summary.memory.totalSize})`
    )

    // Verify drift counts add up
    const totalDriftIssues = summary.drift.criticalCount + 
                             summary.drift.errorCount + 
                             summary.drift.warningCount + 
                             summary.drift.infoCount
    
    assert(
      totalDriftIssues === summary.drift.activeDriftAlerts,
      `Total drift issues (${totalDriftIssues}) should equal active alerts (${summary.drift.activeDriftAlerts})`
    )

    console.log('✓ No hallucinated metrics detected')
  })

  test('should align with governance', async () => {
    const summary = await getAnalyticsSummary()

    // System should not be healthy if there are critical drift issues
    if (summary.drift.criticalCount > 0) {
      assert(
        summary.systemHealth.status !== 'healthy',
        'System should not be healthy with critical drift issues'
      )
    }

    // System should have alerts if drift status is critical
    if (summary.memory.driftStatus === 'critical') {
      assert(
        summary.systemHealth.alerts.length > 0,
        'System should have alerts when drift status is critical'
      )
    }

    console.log('✓ Governance alignment validated')
  })
})
