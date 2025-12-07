/**
 * Governance Panel Tests
 * Tests for governance alignment analytics
 */

import { describe, test } from 'node:test'
import { getGovernanceAlignmentAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Governance Alignment Analytics', () => {
  test('should return governance alignment analytics', async () => {
    const analytics = await getGovernanceAlignmentAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(analytics.violationsDetected >= 0, 'Violations detected should be >= 0')
    assert(analytics.rulesReferencedCount >= 0, 'Rules referenced should be >= 0')
    assert(analytics.governanceUpdatesAffectingMemory >= 0, 'Governance updates should be >= 0')

    console.log('✓ Governance alignment analytics structure validated')
  })

  test('should track top referenced rules', async () => {
    const analytics = await getGovernanceAlignmentAnalytics()

    assert(Array.isArray(analytics.topReferencedRules), 'Top referenced rules should be an array')

    for (const rule of analytics.topReferencedRules) {
      assert(rule.rule !== undefined, 'Rule should have identifier')
      assert(rule.referenceCount >= 0, 'Reference count should be >= 0')
    }

    console.log(`✓ Tracked ${analytics.topReferencedRules.length} referenced rules`)
  })

  test('should track top violated rules', async () => {
    const analytics = await getGovernanceAlignmentAnalytics()

    assert(Array.isArray(analytics.topViolatedRules), 'Top violated rules should be an array')

    for (const rule of analytics.topViolatedRules) {
      assert(rule.rule !== undefined, 'Rule should have identifier')
      assert(rule.violationCount >= 0, 'Violation count should be >= 0')
    }

    console.log(`✓ Tracked ${analytics.topViolatedRules.length} violated rules`)
  })

  test('should track compliance trend', async () => {
    const analytics = await getGovernanceAlignmentAnalytics()

    assert(Array.isArray(analytics.complianceTrend), 'Compliance trend should be an array')

    for (const point of analytics.complianceTrend) {
      assert(point.timestamp !== undefined, 'Trend point should have timestamp')
      assert(point.complianceScore >= 0, 'Compliance score should be >= 0')
      assert(point.complianceScore <= 1, 'Compliance score should be <= 1')
    }

    console.log(`✓ Compliance trend: ${analytics.complianceTrend.length} data points`)
  })

  test('should sort rules by count', async () => {
    const analytics = await getGovernanceAlignmentAnalytics()

    // Verify referenced rules are sorted descending
    for (let i = 1; i < analytics.topReferencedRules.length; i++) {
      assert(
        analytics.topReferencedRules[i].referenceCount <= analytics.topReferencedRules[i - 1].referenceCount,
        'Referenced rules should be sorted by count (descending)'
      )
    }

    // Verify violated rules are sorted descending
    for (let i = 1; i < analytics.topViolatedRules.length; i++) {
      assert(
        analytics.topViolatedRules[i].violationCount <= analytics.topViolatedRules[i - 1].violationCount,
        'Violated rules should be sorted by count (descending)'
      )
    }

    console.log('✓ Rules correctly sorted by count')
  })
})
