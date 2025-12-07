/**
 * Memory Panel Tests
 * Tests for memory health analytics
 */

import { describe, test } from 'node:test'
import { getMemoryHealthMetrics, getMemoryGrowthTrend } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Memory Analytics', () => {
  test('should return memory health metrics', async () => {
    const metrics = await getMemoryHealthMetrics()

    assert(metrics !== null, 'Metrics should not be null')
    assert(metrics.activeCount >= 0, 'Active count should be >= 0')
    assert(metrics.consolidatedCount >= 0, 'Consolidated count should be >= 0')
    assert(metrics.archivedCount >= 0, 'Archived count should be >= 0')
    assert(metrics.totalSize >= 0, 'Total size should be >= 0')

    console.log('✓ Memory health metrics structure validated')
  })

  test('should validate drift status values', async () => {
    const metrics = await getMemoryHealthMetrics()

    const validStatuses = ['healthy', 'warning', 'error', 'critical']
    assert(
      validStatuses.includes(metrics.driftStatus),
      `Drift status should be one of ${validStatuses.join(', ')}`
    )

    console.log(`✓ Drift status validated: ${metrics.driftStatus}`)
  })

  test('should track staleness indicators', async () => {
    const metrics = await getMemoryHealthMetrics()

    assert(metrics.stalenessIndicators !== undefined, 'Staleness indicators should exist')
    assert(metrics.stalenessIndicators.staleEntries >= 0, 'Stale entries should be >= 0')
    assert(metrics.stalenessIndicators.avgAgeInDays >= 0, 'Average age should be >= 0')
    assert(metrics.stalenessIndicators.oldestEntryDays >= 0, 'Oldest entry should be >= 0')

    console.log('✓ Staleness indicators validated')
  })

  test('should calculate fragmentation correctly', async () => {
    const metrics = await getMemoryHealthMetrics()

    assert(metrics.fragmentation !== undefined, 'Fragmentation metrics should exist')
    assert(metrics.fragmentation.fragmentationScore >= 0, 'Fragmentation score should be >= 0')
    assert(metrics.fragmentation.fragmentationScore <= 1, 'Fragmentation score should be <= 1')
    assert(metrics.fragmentation.duplicateCount >= 0, 'Duplicate count should be >= 0')

    console.log(`✓ Fragmentation score: ${metrics.fragmentation.fragmentationScore.toFixed(3)}`)
  })

  test('should calculate dependency consistency', async () => {
    const metrics = await getMemoryHealthMetrics()

    assert(metrics.dependencyConsistency !== undefined, 'Dependency consistency should exist')
    assert(metrics.dependencyConsistency.consistencyScore >= 0, 'Consistency score should be >= 0')
    assert(metrics.dependencyConsistency.consistencyScore <= 1, 'Consistency score should be <= 1')

    console.log(`✓ Consistency score: ${metrics.dependencyConsistency.consistencyScore.toFixed(3)}`)
  })

  test('should return memory growth trend', async () => {
    const trend = await getMemoryGrowthTrend()

    assert(Array.isArray(trend), 'Trend should be an array')

    if (trend.length > 0) {
      const latest = trend[trend.length - 1]
      assert(latest.timestamp !== undefined, 'Trend entry should have timestamp')
      assert(latest.activeCount >= 0, 'Active count should be >= 0')
      assert(latest.consolidatedCount >= 0, 'Consolidated count should be >= 0')
      assert(latest.archivedCount >= 0, 'Archived count should be >= 0')
    }

    console.log(`✓ Memory growth trend: ${trend.length} data points`)
  })

  test('should maintain cumulative trend consistency', async () => {
    const trend = await getMemoryGrowthTrend()

    // Cumulative values should never decrease
    for (let i = 1; i < trend.length; i++) {
      assert(
        trend[i].activeCount >= trend[i - 1].activeCount,
        'Active count should not decrease over time'
      )
      assert(
        trend[i].consolidatedCount >= trend[i - 1].consolidatedCount,
        'Consolidated count should not decrease over time'
      )
      assert(
        trend[i].archivedCount >= trend[i - 1].archivedCount,
        'Archived count should not decrease over time'
      )
    }

    console.log('✓ Cumulative trend consistency validated')
  })

  test('should match total size with component counts', async () => {
    const metrics = await getMemoryHealthMetrics()

    const total = metrics.activeCount + metrics.consolidatedCount + metrics.archivedCount
    assert(
      total === metrics.totalSize,
      `Component counts (${total}) should equal total size (${metrics.totalSize})`
    )

    console.log('✓ Total size matches component counts')
  })
})
