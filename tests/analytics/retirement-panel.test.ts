/**
 * Retirement Panel Tests
 * Tests for knowledge retirement analytics
 */

import { describe, test } from 'node:test'
import { getRetirementAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Retirement Analytics', () => {
  test('should return retirement analytics', async () => {
    const analytics = await getRetirementAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(analytics.retiredEntries >= 0, 'Retired entries should be >= 0')
    assert(analytics.supersededLessons >= 0, 'Superseded lessons should be >= 0')
    assert(analytics.deprecatedPatterns >= 0, 'Deprecated patterns should be >= 0')

    console.log('✓ Retirement analytics structure validated')
  })

  test('should track archive distribution', async () => {
    const analytics = await getRetirementAnalytics()

    assert(typeof analytics.archiveDistribution === 'object', 'Archive distribution should be an object')

    for (const [category, count] of Object.entries(analytics.archiveDistribution)) {
      assert(count >= 0, `Count for ${category} should be >= 0`)
    }

    console.log(`✓ Archive distribution across ${Object.keys(analytics.archiveDistribution).length} categories`)
  })

  test('should categorize retirements', async () => {
    const analytics = await getRetirementAnalytics()

    assert(Array.isArray(analytics.retirementByCategory), 'Retirement by category should be an array')

    for (const category of analytics.retirementByCategory) {
      assert(category.category !== undefined, 'Category should have name')
      assert(category.count >= 0, 'Category count should be >= 0')
      assert(category.month !== undefined, 'Category should have month')
    }

    console.log(`✓ Retirements categorized into ${analytics.retirementByCategory.length} types`)
  })

  test('should track retirement volume trend', async () => {
    const analytics = await getRetirementAnalytics()

    assert(Array.isArray(analytics.retirementVolumeTrend), 'Retirement volume trend should be an array')

    for (const point of analytics.retirementVolumeTrend) {
      assert(point.timestamp !== undefined, 'Trend point should have timestamp')
      assert(point.count >= 0, 'Count should be >= 0')
      assert(point.reason !== undefined, 'Trend point should have reason')
    }

    console.log(`✓ Retirement volume trend: ${analytics.retirementVolumeTrend.length} data points`)
  })
})
