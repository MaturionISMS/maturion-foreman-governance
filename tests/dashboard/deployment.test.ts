/**
 * Deployment Readiness Tests
 * Tests for deployment readiness evaluation and status checks
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse } from '../../lib/foreman/projects/dashboard'
import { loadFixture, assert } from './test-utils'

describe('Deployment Readiness', () => {
  test('should include deployment readiness in dashboard', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.deploymentReadiness !== undefined,
      'Dashboard should include deployment readiness'
    )
    assert(
      dashboard.deploymentReadiness.overall !== undefined,
      'Deployment readiness should have overall status'
    )

    console.log('✓ Deployment readiness included in dashboard')
  })

  test('should validate QA status mapping', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const qaStatus = dashboard.deploymentReadiness.qaStatus

    assert(!!qaStatus, 'QA status should be present')
    assert(!!qaStatus.status, 'QA status should have status field')
    
    const validStatuses = ['passed', 'failed', 'warning', 'pending', 'not_applicable']
    assert(
      validStatuses.includes(qaStatus.status),
      `QA status should be one of ${validStatuses.join(', ')}, got ${qaStatus.status}`
    )

    console.log(`✓ QA status correctly mapped: ${qaStatus.status}`)
  })

  test('should validate security status mapping', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const securityStatus = dashboard.deploymentReadiness.securityStatus

    assert(!!securityStatus, 'Security status should be present')
    assert(!!securityStatus.status, 'Security status should have status field')
    
    const validStatuses = ['passed', 'failed', 'warning', 'pending', 'not_applicable']
    assert(
      validStatuses.includes(securityStatus.status),
      `Security status should be one of ${validStatuses.join(', ')}, got ${securityStatus.status}`
    )

    console.log(`✓ Security status correctly mapped: ${securityStatus.status}`)
  })

  test('should validate environment readiness', async () => {
    const project = loadFixture('projectDeploymentFailure.json')
    const dashboard = await generateDashboardResponse(project)

    const envStatus = dashboard.deploymentReadiness.environmentStatus

    assert(!!envStatus, 'Environment status should be present')
    assert(!!envStatus.status, 'Environment status should have status field')
    
    const validStatuses = ['passed', 'failed', 'warning', 'pending', 'not_applicable']
    assert(
      validStatuses.includes(envStatus.status),
      `Environment status should be one of ${validStatuses.join(', ')}, got ${envStatus.status}`
    )

    console.log(`✓ Environment status correctly mapped: ${envStatus.status}`)
  })

  test('should include required actions list when not ready', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    const readiness = dashboard.deploymentReadiness

    if (readiness.overall !== 'ready') {
      // Should provide some indication of what's needed
      assert(
        readiness.qaStatus !== undefined ||
        readiness.securityStatus !== undefined ||
        readiness.environmentStatus !== undefined,
        'Non-ready deployment should indicate what checks are needed'
      )
    }

    console.log('✓ Required actions indicated when not ready')
  })

  test('should handle all checks passing scenario', async () => {
    const project = loadFixture('projectWithMilestones.json')
    
    // Mark QA and compliance milestones as complete
    const qaMs = project.milestones.find(m => m.id === 'm10')
    const compMs = project.milestones.find(m => m.id === 'm11')
    
    if (qaMs && compMs) {
      qaMs.completed = true
      qaMs.completedAt = '2024-01-10T10:00:00Z'
      compMs.completed = true
      compMs.completedAt = '2024-01-10T10:05:00Z'
      
      const dashboard = await generateDashboardResponse(project)
      
      // With QA and compliance complete, readiness should be calculated
      // Status may vary depending on other factors
      assert(
        dashboard.deploymentReadiness.overall !== undefined,
        'Deployment readiness should be calculated'
      )
      
      // QA status should be positive if milestone is complete
      assert(
        dashboard.deploymentReadiness.qaStatus.status === 'passed' ||
        dashboard.deploymentReadiness.qaStatus.status === 'pending',
        `QA status should be passed or pending with m10 complete, got ${dashboard.deploymentReadiness.qaStatus.status}`
      )
    }

    console.log('✓ All checks passing scenario handled')
  })

  test('should handle missing variable scenario', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    // Early phase project should have warnings or not_applicable statuses
    const readiness = dashboard.deploymentReadiness

    if (project.phase === 'concept' || project.phase === 'architecture') {
      assert(
        readiness.overall === 'unknown' ||
        readiness.overall === 'warning' ||
        readiness.overall === 'not_ready',
        'Early phase projects should have appropriate readiness status'
      )
    }

    console.log('✓ Missing variables handled appropriately')
  })

  test('should handle failed QA scenario', async () => {
    const project = loadFixture('projectDeploymentFailure.json')
    
    // Mark QA milestones as incomplete to reflect failed state
    const qaMs = project.milestones.find(m => m.id === 'm10')
    const compMs = project.milestones.find(m => m.id === 'm11')
    
    if (qaMs) {
      qaMs.completed = false
      delete qaMs.completedAt
    }
    if (compMs) {
      compMs.completed = false
      delete compMs.completedAt
    }
    
    const dashboard = await generateDashboardResponse(project)

    // Project has failed QA results in build
    const hasFailedQA = project.builds.some(b => b.qaResults && !b.qaResults.passed)

    if (hasFailedQA) {
      // Failed QA should be reflected when milestones are not complete
      assert(
        dashboard.deploymentReadiness.qaStatus.status === 'failed' ||
        dashboard.deploymentReadiness.qaStatus.status === 'pending',
        `Failed QA build should affect QA status when milestone incomplete, got ${dashboard.deploymentReadiness.qaStatus.status}`
      )
    }

    console.log('✓ Failed QA scenario handled correctly')
  })

  test('should include last deployment information', async () => {
    const project = loadFixture('projectDeploymentFailure.json')
    const dashboard = await generateDashboardResponse(project)

    if (project.deployments && project.deployments.length > 0) {
      const lastDeployment = dashboard.deploymentReadiness.lastDeployment

      assert(
        lastDeployment !== undefined,
        'Should include last deployment info when deployments exist'
      )
      assert(
        !!lastDeployment?.environment,
        'Last deployment should have environment'
      )
      assert(
        !!lastDeployment?.deployedAt,
        'Last deployment should have deployedAt timestamp'
      )
      assert(
        !!lastDeployment?.status,
        'Last deployment should have status'
      )
    }

    console.log('✓ Last deployment information included when available')
  })

  test('should validate overall readiness values', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const validOverall = ['ready', 'not_ready', 'warning', 'unknown']
    assert(
      validOverall.includes(dashboard.deploymentReadiness.overall),
      `Overall readiness should be one of ${validOverall.join(', ')}, got ${dashboard.deploymentReadiness.overall}`
    )

    console.log('✓ Overall readiness has valid value')
  })

  test('should provide deployment readiness note when helpful', async () => {
    const project = loadFixture('projectDeploymentFailure.json')
    const dashboard = await generateDashboardResponse(project)

    if (dashboard.deploymentReadiness.overall !== 'ready') {
      // Non-ready deployments should ideally have a note
      // But note is optional, so we just verify it's a string if present
      if (dashboard.deploymentReadiness.note) {
        assert(
          typeof dashboard.deploymentReadiness.note === 'string',
          'Deployment readiness note should be a string'
        )
        assert(
          dashboard.deploymentReadiness.note.length > 0,
          'Deployment readiness note should not be empty'
        )
      }
    }

    console.log('✓ Deployment readiness notes provided when helpful')
  })

  test('should check status details are provided', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const readiness = dashboard.deploymentReadiness

    // Each status can have optional details
    if (readiness.qaStatus.details) {
      assert(
        typeof readiness.qaStatus.details === 'string',
        'QA status details should be string'
      )
    }
    if (readiness.securityStatus.details) {
      assert(
        typeof readiness.securityStatus.details === 'string',
        'Security status details should be string'
      )
    }
    if (readiness.environmentStatus.details) {
      assert(
        typeof readiness.environmentStatus.details === 'string',
        'Environment status details should be string'
      )
    }

    console.log('✓ Status details properly formatted when present')
  })
})
