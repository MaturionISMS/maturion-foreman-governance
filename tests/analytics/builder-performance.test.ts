/**
 * Builder Performance Tests
 * Tests for builder performance analytics
 */

import { describe, test } from 'node:test'
import { getBuilderPerformanceAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Builder Performance Analytics', () => {
  test('should return builder performance analytics', async () => {
    const analytics = await getBuilderPerformanceAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(Array.isArray(analytics.builderMetrics), 'Builder metrics should be an array')
    assert(Array.isArray(analytics.performanceTrend), 'Performance trend should be an array')

    console.log('✓ Builder performance analytics structure validated')
  })

  test('should validate builder metrics', async () => {
    const analytics = await getBuilderPerformanceAnalytics()

    for (const metric of analytics.builderMetrics) {
      assert(metric.builderId !== undefined, 'Builder should have ID')
      assert(metric.builderType !== undefined, 'Builder should have type')
      assert(metric.avgIterationCount >= 0, 'Average iteration count should be >= 0')
      assert(metric.successRate >= 0, 'Success rate should be >= 0')
      assert(metric.successRate <= 1, 'Success rate should be <= 1')
      assert(metric.failureRate >= 0, 'Failure rate should be >= 0')
      assert(metric.failureRate <= 1, 'Failure rate should be <= 1')
      assert(metric.qaPassRate >= 0, 'QA pass rate should be >= 0')
      assert(metric.qaPassRate <= 1, 'QA pass rate should be <= 1')
      assert(metric.avgBuildTimeMs >= 0, 'Average build time should be >= 0')
    }

    console.log(`✓ Validated ${analytics.builderMetrics.length} builder metrics`)
  })

  test('should track performance trend', async () => {
    const analytics = await getBuilderPerformanceAnalytics()

    for (const point of analytics.performanceTrend) {
      assert(point.timestamp !== undefined, 'Trend point should have timestamp')
      assert(point.builderId !== undefined, 'Trend point should have builder ID')
      assert(point.successRate >= 0, 'Success rate should be >= 0')
      assert(point.successRate <= 1, 'Success rate should be <= 1')
    }

    console.log(`✓ Performance trend: ${analytics.performanceTrend.length} data points`)
  })

  test('should validate rate consistency', async () => {
    const analytics = await getBuilderPerformanceAnalytics()

    for (const metric of analytics.builderMetrics) {
      // Success rate + failure rate should not exceed 1
      const totalRate = metric.successRate + metric.failureRate
      assert(
        totalRate <= 1.01, // Allow small floating point error
        `Success + failure rate (${totalRate}) should not exceed 1 for ${metric.builderId}`
      )
    }

    console.log('✓ Rate consistency validated')
  })
})
