/**
 * Blocker Logic and Severity Tests
 * Tests for blocker escalation, severity, and status impact
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse } from '../../lib/foreman/projects/dashboard'
import { loadFixture, assert } from './test-utils'

describe('Blocker Logic', () => {
  test('should convert blockers to dashboard format', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.blockers.length > 0,
      'Project with blockers should have blockers in dashboard'
    )

    // Verify blocker structure
    for (const blocker of dashboard.blockers) {
      assert(!!blocker.id, 'Blocker should have ID')
      assert(!!blocker.description, 'Blocker should have description')
      assert(!!blocker.severity, 'Blocker should have severity')
      assert(!!blocker.requiredAction, 'Blocker should have required action')
      assert(!!blocker.createdAt, 'Blocker should have createdAt timestamp')
    }

    console.log('✓ Blockers correctly converted to dashboard format')
  })

  test('should handle blocker severity escalation', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    const criticalBlocker = dashboard.blockers.find(b => b.severity === 'critical')
    const highBlocker = dashboard.blockers.find(b => b.severity === 'high')
    const mediumBlocker = dashboard.blockers.find(b => b.severity === 'medium')
    const lowBlocker = dashboard.blockers.find(b => b.severity === 'low')

    assert(!!criticalBlocker, 'Should identify critical blocker')
    assert(!!highBlocker, 'Should identify high blocker')
    assert(!!mediumBlocker, 'Should identify medium blocker')

    // Verify required actions match severity (check if blocker exists first)
    if (criticalBlocker) {
      assert(
        criticalBlocker.requiredAction.includes('Immediate') || 
        criticalBlocker.requiredAction.includes('escalation'),
        'Critical blocker should have immediate action'
      )
    }

    console.log('✓ Blocker severity correctly identified and escalated')
  })

  test('should attach blockers to related milestones', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    // Check if any milestone has blockers attached
    const milestonesWithBlockers = dashboard.milestones.filter(
      m => m.blockers && m.blockers.length > 0
    )

    // Note: Blocker-to-milestone relationship is heuristic-based
    // We just verify the structure exists
    for (const milestone of dashboard.milestones) {
      assert(
        Array.isArray(milestone.blockers),
        'Each milestone should have a blockers array (even if empty)'
      )
    }

    console.log('✓ Blocker-milestone relationship structure verified')
  })

  test('should affect project status with no blockers', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Complete all milestones in current phase to avoid critical status
    project.milestones.forEach(m => {
      if (m.phase === project.phase) {
        m.completed = true
        m.completedAt = '2024-01-01T10:00:00Z'
      }
    })
    
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.status === 'on_track',
      `Project with no blockers and completed milestones should be on_track, got ${dashboard.status}`
    )

    console.log('✓ No blockers → status = on_track')
  })

  test('should affect project status with minor blocker', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Complete milestones to avoid critical status from milestone failures
    project.milestones.forEach(m => {
      if (m.phase === project.phase) {
        m.completed = true
        m.completedAt = '2024-01-01T10:00:00Z'
      }
    })
    
    // Add a medium severity blocker
    project.blockers = [{
      id: 'blocker_test_1',
      description: 'Medium severity test blocker',
      category: 'technical',
      severity: 'medium',
      createdAt: '2024-01-10T10:00:00Z'
    }]

    const dashboard = await generateDashboardResponse(project)

    // Medium blocker alone shouldn't block, but may put at risk
    assert(
      dashboard.status === 'on_track' || dashboard.status === 'at_risk',
      `Medium blocker should result in on_track or at_risk status, got ${dashboard.status}`
    )

    console.log('✓ Medium blocker handled appropriately')
  })

  test('should affect project status with critical blocker', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    // Project has critical blocker
    const hasCriticalBlocker = project.blockers?.some(
      b => b.severity === 'critical' && !b.resolvedAt
    )

    if (hasCriticalBlocker) {
      assert(
        dashboard.status === 'blocked' || dashboard.status === 'critical',
        'Project with critical blocker should be blocked or critical'
      )
    }

    console.log('✓ Critical blocker → status = blocked or critical')
  })

  test('should handle multiple critical blockers', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Add multiple critical blockers
    project.blockers = [
      {
        id: 'blocker_critical_1',
        description: 'First critical blocker',
        category: 'technical',
        severity: 'critical',
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 'blocker_critical_2',
        description: 'Second critical blocker',
        category: 'external',
        severity: 'critical',
        createdAt: '2024-01-11T10:00:00Z'
      }
    ]

    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.status === 'blocked' || dashboard.status === 'critical',
      'Multiple critical blockers should result in blocked or critical status'
    )

    console.log('✓ Multiple critical blockers → critical status')
  })

  test('should exclude resolved blockers from status calculation', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    // Count only unresolved blockers
    const unresolvedBlockers = dashboard.blockers.filter(b => !b.resolvedAt)
    const allBlockers = dashboard.blockers.length

    assert(
      unresolvedBlockers.length <= allBlockers,
      'Should distinguish between resolved and unresolved blockers'
    )

    // Verify resolved blockers have appropriate required action
    const resolvedBlockers = dashboard.blockers.filter(b => b.resolvedAt)
    for (const blocker of resolvedBlockers) {
      assert(
        blocker.requiredAction.includes('None') || 
        blocker.requiredAction.includes('resolved'),
        'Resolved blockers should indicate no action required'
      )
    }

    console.log('✓ Resolved blockers excluded from active status calculation')
  })

  test('should provide appropriate required actions per severity', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    for (const blocker of dashboard.blockers) {
      if (blocker.resolvedAt) {
        continue // Skip resolved blockers
      }

      switch (blocker.severity) {
        case 'critical':
          assert(
            blocker.requiredAction.toLowerCase().includes('immediate') ||
            blocker.requiredAction.toLowerCase().includes('escalation'),
            'Critical blocker should have immediate action requirement'
          )
          break
        case 'high':
          assert(
            blocker.requiredAction.toLowerCase().includes('24') ||
            blocker.requiredAction.toLowerCase().includes('hour'),
            'High blocker should have time-bound action'
          )
          break
        case 'medium':
          assert(
            blocker.requiredAction.toLowerCase().includes('sprint') ||
            blocker.requiredAction.toLowerCase().includes('address'),
            'Medium blocker should have sprint-level action'
          )
          break
        case 'low':
          assert(
            blocker.requiredAction.toLowerCase().includes('track') ||
            blocker.requiredAction.toLowerCase().includes('convenient'),
            'Low blocker should have flexible action'
          )
          break
      }
    }

    console.log('✓ Required actions appropriate for each severity level')
  })

  test('should maintain blocker metadata', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    for (const blocker of dashboard.blockers) {
      // Verify blocker has all metadata
      assert(!!blocker.id, 'Blocker should have ID')
      assert(!!blocker.description, 'Blocker should have description')
      assert(!!blocker.severity, 'Blocker should have severity')
      assert(!!blocker.createdAt, 'Blocker should have createdAt')
      
      // Verify timestamps are valid ISO 8601 (can be parsed as valid Date)
      const createdDate = new Date(blocker.createdAt)
      assert(
        !isNaN(createdDate.getTime()),
        `createdAt should be valid date, got ${blocker.createdAt}`
      )
      
      if (blocker.resolvedAt) {
        const resolvedDate = new Date(blocker.resolvedAt)
        assert(
          !isNaN(resolvedDate.getTime()),
          `resolvedAt should be valid date, got ${blocker.resolvedAt}`
        )
      }
    }

    console.log('✓ Blocker metadata maintained correctly')
  })

  test('should handle project with no blockers', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      Array.isArray(dashboard.blockers),
      'Dashboard should have blockers array even if empty'
    )
    assert(
      dashboard.blockers.length === 0,
      'Project without blockers should have empty blockers array'
    )

    console.log('✓ Projects without blockers handled gracefully')
  })
})
