/**
 * Drift Panel Tests
 * Tests for drift monitoring analytics
 */

import { describe, test } from 'node:test'
import { getDriftAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Drift Analytics', () => {
  test('should return drift analytics', async () => {
    const analytics = await getDriftAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(analytics.activeDriftAlerts >= 0, 'Active drift alerts should be >= 0')
    assert(analytics.criticalCount >= 0, 'Critical count should be >= 0')
    assert(analytics.errorCount >= 0, 'Error count should be >= 0')
    assert(analytics.warningCount >= 0, 'Warning count should be >= 0')
    assert(analytics.infoCount >= 0, 'Info count should be >= 0')

    console.log('✓ Drift analytics structure validated')
  })

  test('should categorize drift by type', async () => {
    const analytics = await getDriftAnalytics()

    assert(typeof analytics.driftByCategory === 'object', 'Drift by category should be an object')

    for (const [category, count] of Object.entries(analytics.driftByCategory)) {
      assert(count >= 0, `Drift count for ${category} should be >= 0`)
    }

    console.log(`✓ Drift categorized into ${Object.keys(analytics.driftByCategory).length} types`)
  })

  test('should categorize drift by severity', async () => {
    const analytics = await getDriftAnalytics()

    assert(typeof analytics.driftBySeverity === 'object', 'Drift by severity should be an object')
    assert(analytics.driftBySeverity.critical >= 0, 'Critical severity count should be >= 0')
    assert(analytics.driftBySeverity.error >= 0, 'Error severity count should be >= 0')
    assert(analytics.driftBySeverity.warning >= 0, 'Warning severity count should be >= 0')
    assert(analytics.driftBySeverity.info >= 0, 'Info severity count should be >= 0')

    console.log('✓ Drift categorized by severity')
  })

  test('should track affected files', async () => {
    const analytics = await getDriftAnalytics()

    assert(Array.isArray(analytics.topAffectedFiles), 'Top affected files should be an array')

    for (const file of analytics.topAffectedFiles) {
      assert(file.file !== undefined, 'File should have a path')
      assert(file.issueCount >= 0, 'Issue count should be >= 0')
      assert(file.severity !== undefined, 'File should have severity')
    }

    console.log(`✓ Tracking ${analytics.topAffectedFiles.length} affected files`)
  })

  test('should provide remediation proposals', async () => {
    const analytics = await getDriftAnalytics()

    assert(Array.isArray(analytics.remediationProposals), 'Remediation proposals should be an array')

    for (const proposal of analytics.remediationProposals) {
      assert(proposal.issue !== undefined, 'Proposal should describe issue')
      assert(proposal.proposal !== undefined, 'Proposal should have recommendation')
      assert(typeof proposal.autoFixable === 'boolean', 'Proposal should indicate if auto-fixable')
    }

    console.log(`✓ Generated ${analytics.remediationProposals.length} remediation proposals`)
  })

  test('should track drift frequency trend', async () => {
    const analytics = await getDriftAnalytics()

    assert(Array.isArray(analytics.driftFrequencyTrend), 'Drift frequency trend should be an array')

    for (const point of analytics.driftFrequencyTrend) {
      assert(point.timestamp !== undefined, 'Trend point should have timestamp')
      assert(point.issueCount >= 0, 'Issue count should be >= 0')
    }

    console.log(`✓ Drift frequency trend: ${analytics.driftFrequencyTrend.length} data points`)
  })

  test('should maintain count consistency', async () => {
    const analytics = await getDriftAnalytics()

    // Severity counts should sum to total active alerts
    const severityTotal = analytics.criticalCount + 
                         analytics.errorCount + 
                         analytics.warningCount + 
                         analytics.infoCount

    assert(
      severityTotal === analytics.activeDriftAlerts,
      `Severity counts (${severityTotal}) should equal active alerts (${analytics.activeDriftAlerts})`
    )

    console.log('✓ Count consistency validated')
  })

  test('should identify auto-fixable issues', async () => {
    const analytics = await getDriftAnalytics()

    const autoFixableCount = analytics.remediationProposals.filter(p => p.autoFixable).length
    const totalProposals = analytics.remediationProposals.length

    if (totalProposals > 0) {
      console.log(`✓ ${autoFixableCount}/${totalProposals} issues are auto-fixable`)
    } else {
      console.log('✓ No drift issues to auto-fix')
    }
  })
})
