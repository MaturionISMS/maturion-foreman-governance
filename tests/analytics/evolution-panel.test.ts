/**
 * Evolution Panel Tests
 * Tests for reasoning pattern evolution analytics
 */

import { describe, test } from 'node:test'
import { getEvolutionAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Evolution Analytics', () => {
  test('should return evolution analytics', async () => {
    const analytics = await getEvolutionAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(analytics.patternsImproved >= 0, 'Patterns improved should be >= 0')
    assert(analytics.patternsRemoved >= 0, 'Patterns removed should be >= 0')
    assert(analytics.evolutionCycles >= 0, 'Evolution cycles should be >= 0')
    assert(analytics.newHeuristicsCreated >= 0, 'New heuristics should be >= 0')

    console.log('✓ Evolution analytics structure validated')
  })

  test('should track performance score movement', async () => {
    const analytics = await getEvolutionAnalytics()

    assert(analytics.performanceScoreMovement !== undefined, 'Performance score movement should exist')
    assert(analytics.performanceScoreMovement.improved >= 0, 'Improved count should be >= 0')
    assert(analytics.performanceScoreMovement.degraded >= 0, 'Degraded count should be >= 0')
    assert(analytics.performanceScoreMovement.stable >= 0, 'Stable count should be >= 0')

    console.log(`✓ Score movement: ${analytics.performanceScoreMovement.improved} improved, ${analytics.performanceScoreMovement.degraded} degraded, ${analytics.performanceScoreMovement.stable} stable`)
  })

  test('should track cognitive improvement curve', async () => {
    const analytics = await getEvolutionAnalytics()

    assert(Array.isArray(analytics.cognitiveImprovementCurve), 'Cognitive improvement curve should be an array')

    for (const point of analytics.cognitiveImprovementCurve) {
      assert(point.timestamp !== undefined, 'Curve point should have timestamp')
      assert(point.avgScore >= 0, 'Average score should be >= 0')
      assert(point.avgScore <= 1, 'Average score should be <= 1')
    }

    console.log(`✓ Cognitive improvement curve: ${analytics.cognitiveImprovementCurve.length} data points`)
  })

  test('should validate score ranges', async () => {
    const analytics = await getEvolutionAnalytics()

    for (const point of analytics.cognitiveImprovementCurve) {
      assert(
        point.avgScore >= 0 && point.avgScore <= 1,
        'Average score should be between 0 and 1'
      )
    }

    console.log('✓ All score ranges validated')
  })
})
