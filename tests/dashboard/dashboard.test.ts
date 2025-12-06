/**
 * Dashboard Aggregation Layer Tests
 * Tests for the main dashboard generation and aggregation functionality
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse } from '../../lib/foreman/projects/dashboard'
import { loadFixture, assert, assertInRange } from './test-utils'

describe('Dashboard Aggregation', () => {
  test('should generate complete dashboard for minimal project', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    // Verify all required fields are present
    assert(!!dashboard.projectId, 'projectId should be present')
    assert(!!dashboard.projectName, 'projectName should be present')
    assert(typeof dashboard.overallProgress === 'number', 'overallProgress should be a number')
    assert(!!dashboard.phaseProgress, 'phaseProgress should be present')
    assert(!!dashboard.status, 'status should be present')
    assert(Array.isArray(dashboard.milestones), 'milestones should be an array')
    assert(Array.isArray(dashboard.blockers), 'blockers should be an array')
    assert(Array.isArray(dashboard.phaseTimeline), 'phaseTimeline should be an array')
    assert(Array.isArray(dashboard.sCurveData), 'sCurveData should be an array')
    assert(!!dashboard.deploymentReadiness, 'deploymentReadiness should be present')
    assert(Array.isArray(dashboard.memorySnapshots), 'memorySnapshots should be an array')
    assert(!!dashboard.lastUpdated, 'lastUpdated should be present')

    console.log('✓ Minimal project dashboard has all required fields')
  })

  test('should never omit required fields', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    const requiredFields = [
      'projectId',
      'projectName',
      'overallProgress',
      'phaseProgress',
      'status',
      'milestones',
      'blockers',
      'phaseTimeline',
      'sCurveData',
      'deploymentReadiness',
      'memorySnapshots',
      'lastUpdated'
    ]

    for (const field of requiredFields) {
      assert(
        field in dashboard,
        `Required field "${field}" is missing from dashboard`
      )
      assert(
        dashboard[field as keyof typeof dashboard] !== undefined,
        `Required field "${field}" is undefined`
      )
      assert(
        dashboard[field as keyof typeof dashboard] !== null,
        `Required field "${field}" is null`
      )
    }

    console.log('✓ All required fields are present and non-null')
  })

  test('should return serializable JSON', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    // Verify JSON serialization works
    let serialized: string
    try {
      serialized = JSON.stringify(dashboard)
    } catch (error) {
      throw new Error(`Dashboard is not serializable: ${error}`)
    }

    // Verify deserialization works
    let deserialized: any
    try {
      deserialized = JSON.parse(serialized)
    } catch (error) {
      throw new Error(`Serialized dashboard cannot be parsed: ${error}`)
    }

    // Verify round-trip integrity
    assert(
      deserialized.projectId === dashboard.projectId,
      'Round-trip serialization should preserve projectId'
    )
    assert(
      deserialized.overallProgress === dashboard.overallProgress,
      'Round-trip serialization should preserve overallProgress'
    )

    console.log('✓ Dashboard is fully serializable')
  })

  test('should calculate correct project ID and name', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.projectId === project.id,
      `projectId should match: expected ${project.id}, got ${dashboard.projectId}`
    )
    assert(
      dashboard.projectName === project.name,
      `projectName should match: expected ${project.name}, got ${dashboard.projectName}`
    )

    console.log('✓ Project ID and name correctly mapped')
  })

  test('should use all required data sources', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    // Verify milestones data source used
    assert(
      dashboard.milestones.length > 0,
      'Should include milestone data'
    )

    // Verify phase timeline data
    assert(
      dashboard.phaseTimeline.length > 0,
      'Should include phase timeline data'
    )

    // Verify S-curve data
    assert(
      dashboard.sCurveData.length > 0,
      'Should include S-curve data'
    )

    // Verify deployment readiness
    assert(
      dashboard.deploymentReadiness.overall !== undefined,
      'Should include deployment readiness'
    )

    // Verify memory snapshots (even if empty)
    assert(
      dashboard.memorySnapshots !== undefined,
      'Should include memory snapshots'
    )

    console.log('✓ All data sources are utilized')
  })

  test('should be deterministic for same input', async () => {
    const project = loadFixture('projectMinimal.json')
    
    const dashboard1 = await generateDashboardResponse(project)
    const dashboard2 = await generateDashboardResponse(project)

    // Note: lastUpdated will differ, so we compare other fields
    assert(
      dashboard1.projectId === dashboard2.projectId,
      'Project ID should be deterministic'
    )
    assert(
      dashboard1.overallProgress === dashboard2.overallProgress,
      'Overall progress should be deterministic'
    )
    assert(
      dashboard1.status === dashboard2.status,
      'Status should be deterministic'
    )
    assert(
      dashboard1.milestones.length === dashboard2.milestones.length,
      'Milestone count should be deterministic'
    )

    console.log('✓ Dashboard generation is deterministic')
  })

  test('should handle project with no builds', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.blockers.length === 0,
      'Project with no blockers should have empty blockers array'
    )
    assert(
      dashboard.deploymentReadiness.overall !== undefined,
      'Should calculate deployment readiness even without builds'
    )

    console.log('✓ Handles project with no builds gracefully')
  })

  test('should handle project with multiple milestones', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.milestones.length === project.milestones.length,
      `Should include all milestones: expected ${project.milestones.length}, got ${dashboard.milestones.length}`
    )

    // Verify milestone data structure
    for (const milestone of dashboard.milestones) {
      assert(!!milestone.id, 'Each milestone should have an ID')
      assert(!!milestone.name, 'Each milestone should have a name')
      assert(!!milestone.phase, 'Each milestone should have a phase')
      assert(typeof milestone.weight === 'number', 'Each milestone should have a weight')
      assert(!!milestone.status, 'Each milestone should have a status')
    }

    console.log('✓ Handles multiple milestones correctly')
  })

  test('should validate progress percentage range', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    assertInRange(
      dashboard.overallProgress,
      0,
      100,
      'Overall progress should be 0-100'
    )

    for (const phase in dashboard.phaseProgress) {
      const progress = dashboard.phaseProgress[phase as keyof typeof dashboard.phaseProgress]
      assertInRange(
        progress,
        0,
        100,
        `Phase ${phase} progress should be 0-100`
      )
    }

    console.log('✓ Progress percentages are within valid range')
  })
})
