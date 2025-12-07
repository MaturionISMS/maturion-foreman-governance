/**
 * Project Panel Tests
 * Tests for project intelligence analytics
 */

import { describe, test } from 'node:test'
import { getProjectIntelligenceAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Project Intelligence Analytics', () => {
  test('should return project intelligence analytics', async () => {
    const analytics = await getProjectIntelligenceAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(Array.isArray(analytics.projects), 'Projects should be an array')
    assert(Array.isArray(analytics.sCurves), 'S-curves should be an array')

    console.log('✓ Project intelligence analytics structure validated')
  })

  test('should validate project metrics', async () => {
    const analytics = await getProjectIntelligenceAnalytics()

    for (const project of analytics.projects) {
      assert(project.projectId !== undefined, 'Project should have ID')
      assert(project.projectName !== undefined, 'Project should have name')
      assert(project.phase !== undefined, 'Project should have phase')
      assert(project.progressPercentage >= 0, 'Progress should be >= 0')
      assert(project.progressPercentage <= 100, 'Progress should be <= 100')
      assert(project.blockerCount >= 0, 'Blocker count should be >= 0')
      assert(project.driftIssues >= 0, 'Drift issues should be >= 0')
      assert(project.activeMemoryUsage >= 0, 'Active memory usage should be >= 0')
      assert(project.consolidatedKnowledgeUsage >= 0, 'Consolidated knowledge usage should be >= 0')
    }

    console.log(`✓ Validated ${analytics.projects.length} project metrics`)
  })

  test('should validate S-curves', async () => {
    const analytics = await getProjectIntelligenceAnalytics()

    for (const curve of analytics.sCurves) {
      assert(curve.projectId !== undefined, 'S-curve should have project ID')
      assert(Array.isArray(curve.progress), 'Progress should be an array')

      for (const point of curve.progress) {
        assert(point.timestamp !== undefined, 'Progress point should have timestamp')
        assert(point.completion >= 0, 'Completion should be >= 0')
        assert(point.completion <= 100, 'Completion should be <= 100')
      }
    }

    console.log(`✓ Validated ${analytics.sCurves.length} S-curves`)
  })

  test('should match project count with S-curve count', async () => {
    const analytics = await getProjectIntelligenceAnalytics()

    assert(
      analytics.projects.length === analytics.sCurves.length,
      'Number of projects should match number of S-curves'
    )

    console.log('✓ Project and S-curve counts match')
  })

  test('should validate progress monotonicity', async () => {
    const analytics = await getProjectIntelligenceAnalytics()

    for (const curve of analytics.sCurves) {
      // Progress should generally increase over time
      for (let i = 1; i < curve.progress.length; i++) {
        const prev = curve.progress[i - 1]
        const curr = curve.progress[i]
        
        assert(
          curr.completion >= prev.completion,
          `Progress should not decrease for project ${curve.projectId}`
        )
      }
    }

    console.log('✓ Progress monotonicity validated')
  })
})
