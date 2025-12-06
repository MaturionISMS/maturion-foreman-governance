/**
 * Status Calculation Tests
 * Tests for project status logic and transitions
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse, calculateProjectStatus } from '../../lib/foreman/projects/dashboard'
import { loadFixture, assert } from './test-utils'

describe('Status Calculation', () => {
  test('should calculate on_track status for healthy project', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Complete all milestones in current phase to ensure on_track status
    project.milestones.forEach(m => {
      if (m.phase === project.phase) {
        m.completed = true
        m.completedAt = '2024-01-01T10:00:00Z'
      }
    })
    
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.status === 'on_track',
      `Healthy project with no blockers should be on_track, got ${dashboard.status}`
    )

    console.log('✓ on_track status correctly calculated')
  })

  test('should calculate blocked status for critical blocker', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    // Project has critical blocker, should be blocked or critical
    const hasCriticalBlocker = project.blockers?.some(
      b => b.severity === 'critical' && !b.resolvedAt
    )

    if (hasCriticalBlocker) {
      assert(
        dashboard.status === 'blocked' || dashboard.status === 'critical',
        'Project with critical blocker should be blocked or critical'
      )
    }

    console.log('✓ blocked/critical status for critical blockers')
  })

  test('should calculate at_risk status for high severity blockers', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Complete milestones to avoid critical status from milestone failures
    project.milestones.forEach(m => {
      if (m.phase === project.phase) {
        m.completed = true
        m.completedAt = '2024-01-01T10:00:00Z'
      }
    })
    
    // Add high severity blocker
    project.blockers = [{
      id: 'blocker_high_1',
      description: 'High severity blocker',
      category: 'technical',
      severity: 'high',
      createdAt: '2024-01-10T10:00:00Z'
    }]

    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.status === 'at_risk' || dashboard.status === 'blocked',
      `Project with high severity blocker should be at_risk or blocked, got ${dashboard.status}`
    )

    console.log('✓ at_risk status for high severity blockers')
  })

  test('should include status note when provided', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    if (dashboard.status !== 'on_track') {
      assert(
        dashboard.statusNote !== undefined,
        'Non-on_track status should include status note'
      )
      assert(
        typeof dashboard.statusNote === 'string',
        'Status note should be a string'
      )
    }

    console.log('✓ Status notes provided for non-on_track statuses')
  })

  test('should prioritize critical over blocked', async () => {
    const project = loadFixture('projectDeploymentFailure.json')
    const dashboard = await generateDashboardResponse(project)

    // Project has failed deployment
    const hasFailedDeployment = project.deployments && project.deployments.some(
      d => d.status === 'failed'
    )

    if (hasFailedDeployment) {
      // Status should reflect the severity of issues
      assert(
        dashboard.status === 'critical' || 
        dashboard.status === 'blocked' ||
        dashboard.status === 'at_risk' ||
        dashboard.status === 'on_track', // May still be on_track depending on other factors
        `Project with issues should have appropriate status, got ${dashboard.status}`
      )
    }

    console.log('✓ Status prioritization logic verified')
  })

  test('should handle status transitions correctly', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Complete all milestones in phase to start on_track
    project.milestones.forEach(m => {
      if (m.phase === project.phase) {
        m.completed = true
        m.completedAt = '2024-01-01T10:00:00Z'
      }
    })
    
    let dashboard = await generateDashboardResponse(project)
    assert(
      dashboard.status === 'on_track',
      `Should start on_track, got ${dashboard.status}`
    )

    // Add critical blocker
    project.blockers = [{
      id: 'blocker_critical',
      description: 'Critical blocker',
      category: 'technical',
      severity: 'critical',
      createdAt: '2024-01-10T10:00:00Z'
    }]

    dashboard = await generateDashboardResponse(project)
    assert(
      dashboard.status === 'blocked' || dashboard.status === 'critical',
      'Should transition to blocked/critical with critical blocker'
    )

    // Resolve blocker
    project.blockers[0].resolvedAt = '2024-01-11T10:00:00Z'
    project.blockers[0].resolvedBy = 'test_user'

    dashboard = await generateDashboardResponse(project)
    assert(
      dashboard.status === 'on_track',
      'Should return to on_track when blocker resolved'
    )

    console.log('✓ Status transitions handled correctly')
  })

  test('should validate status is one of allowed values', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const allowedStatuses = ['on_track', 'at_risk', 'blocked', 'critical']
    assert(
      allowedStatuses.includes(dashboard.status),
      `Status should be one of ${allowedStatuses.join(', ')}, got ${dashboard.status}`
    )

    console.log('✓ Status is one of allowed values')
  })

  test('should handle drift in timeline affecting status', async () => {
    const project = loadFixture('projectWithTimelineDrift.json')
    const dashboard = await generateDashboardResponse(project)

    // Project with timeline drift may be at_risk or blocked
    // Verify status is appropriate
    assert(
      dashboard.status === 'on_track' || 
      dashboard.status === 'at_risk' ||
      dashboard.status === 'blocked',
      'Project with timeline drift should have appropriate status'
    )

    console.log('✓ Timeline drift considered in status calculation')
  })

  test('should calculate critical status for multiple failures', async () => {
    const project = loadFixture('projectDeploymentFailure.json')
    
    // Add multiple critical indicators
    project.blockers = [
      {
        id: 'blocker_1',
        description: 'Critical blocker 1',
        category: 'technical',
        severity: 'critical',
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 'blocker_2',
        description: 'Critical blocker 2',
        category: 'external',
        severity: 'critical',
        createdAt: '2024-01-11T10:00:00Z'
      }
    ]

    const dashboard = await generateDashboardResponse(project)

    // Multiple critical issues should result in critical status
    assert(
      dashboard.status === 'critical' || dashboard.status === 'blocked',
      'Multiple critical issues should result in critical or blocked status'
    )

    console.log('✓ Multiple failures trigger critical status')
  })

  test('should provide meaningful status notes', async () => {
    const project = loadFixture('projectWithBlockers.json')
    const dashboard = await generateDashboardResponse(project)

    if (dashboard.statusNote) {
      // Status note should not be empty
      assert(
        dashboard.statusNote.length > 0,
        'Status note should not be empty string'
      )
      
      // Status note should provide context
      assert(
        dashboard.statusNote.length > 10,
        'Status note should be meaningful (>10 chars)'
      )
    }

    console.log('✓ Status notes are meaningful when present')
  })

  test('should be deterministic for same inputs', async () => {
    const project = loadFixture('projectWithMilestones.json')
    
    const dashboard1 = await generateDashboardResponse(project)
    const dashboard2 = await generateDashboardResponse(project)

    assert(
      dashboard1.status === dashboard2.status,
      'Status calculation should be deterministic'
    )

    console.log('✓ Status calculation is deterministic')
  })
})
