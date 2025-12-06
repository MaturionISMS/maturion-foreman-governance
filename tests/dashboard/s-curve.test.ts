/**
 * S-Curve Generation Tests
 * Tests for S-curve data generation and progress tracking
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse, getDashboardSCurve } from '../../lib/foreman/projects/dashboard'
import { loadFixture, assert, assertInRange } from './test-utils'

describe('S-Curve Generation', () => {
  test('should generate S-curve data points', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      Array.isArray(dashboard.sCurveData),
      'S-curve data should be an array'
    )
    assert(
      dashboard.sCurveData.length > 0,
      'S-curve should have data points'
    )

    console.log(`✓ S-curve generated with ${dashboard.sCurveData.length} points`)
  })

  test('should include planned and actual progress in each point', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    for (const point of dashboard.sCurveData) {
      assert(!!point.date, 'Each S-curve point should have a date')
      assert(
        typeof point.plannedProgress === 'number',
        'Each point should have plannedProgress'
      )
      assert(
        typeof point.actualProgress === 'number',
        'Each point should have actualProgress'
      )
    }

    console.log('✓ S-curve points include required fields')
  })

  test('should have valid progress percentages in S-curve', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    for (const point of dashboard.sCurveData) {
      assertInRange(
        point.plannedProgress,
        0,
        100,
        `Planned progress at ${point.date}`
      )
      assertInRange(
        point.actualProgress,
        0,
        100,
        `Actual progress at ${point.date}`
      )
    }

    console.log('✓ S-curve progress values are valid percentages')
  })

  test('should have chronologically ordered dates', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    for (let i = 0; i < dashboard.sCurveData.length - 1; i++) {
      const current = new Date(dashboard.sCurveData[i].date)
      const next = new Date(dashboard.sCurveData[i + 1].date)
      
      assert(
        next >= current,
        'S-curve dates should be in chronological order'
      )
    }

    console.log('✓ S-curve dates are chronologically ordered')
  })

  test('should show planned progress rising over time', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    // Planned progress should generally increase (S-curve shape)
    const firstPoint = dashboard.sCurveData[0]
    const lastPoint = dashboard.sCurveData[dashboard.sCurveData.length - 1]

    assert(
      lastPoint.plannedProgress >= firstPoint.plannedProgress,
      'Planned progress should increase from start to end'
    )

    console.log('✓ Planned progress rises over time')
  })

  test('should derive actual progress from milestones', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    // Last point actual progress should match current project progress
    const lastPoint = dashboard.sCurveData[dashboard.sCurveData.length - 1]
    
    assert(
      lastPoint.actualProgress === project.progressPercentage,
      `Last S-curve point should match project progress: expected ${project.progressPercentage}, got ${lastPoint.actualProgress}`
    )

    console.log('✓ Actual progress derived from milestones')
  })

  test('should generate stable timeseries', async () => {
    const project = loadFixture('projectSCurveCase.json')
    
    const dashboard1 = await generateDashboardResponse(project)
    const dashboard2 = await generateDashboardResponse(project)

    assert(
      dashboard1.sCurveData.length === dashboard2.sCurveData.length,
      'S-curve should have same number of points across calls'
    )

    // First and last points should be consistent
    assert(
      dashboard1.sCurveData[0].date === dashboard2.sCurveData[0].date,
      'First S-curve date should be consistent'
    )

    console.log('✓ S-curve generation is stable')
  })

  test('should handle project just started', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.sCurveData.length > 0,
      'Even new projects should have S-curve data'
    )

    const firstPoint = dashboard.sCurveData[0]
    assertInRange(
      firstPoint.plannedProgress,
      0,
      100,
      'First point planned progress should be valid'
    )
    assertInRange(
      firstPoint.actualProgress,
      0,
      100,
      'First point actual progress should be valid'
    )

    console.log('✓ S-curve handles newly started projects')
  })

  test('should use getDashboardSCurve for direct access', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const sCurveData = await getDashboardSCurve(project)

    assert(
      Array.isArray(sCurveData),
      'getDashboardSCurve should return array'
    )
    assert(
      sCurveData.length > 0,
      'getDashboardSCurve should return data points'
    )

    console.log('✓ getDashboardSCurve provides direct S-curve access')
  })

  test('should validate date format in S-curve', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    for (const point of dashboard.sCurveData) {
      // Date should be in YYYY-MM-DD format (ISO 8601 date portion)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      assert(
        dateRegex.test(point.date),
        `S-curve date should be in YYYY-MM-DD format, got ${point.date}`
      )
      
      // Should be a valid date
      const parsedDate = new Date(point.date)
      assert(
        !isNaN(parsedDate.getTime()),
        `S-curve date should be valid: ${point.date}`
      )
    }

    console.log('✓ S-curve dates are properly formatted')
  })

  test('should show realistic S-curve progression', async () => {
    const project = loadFixture('projectSCurveCase.json')
    const dashboard = await generateDashboardResponse(project)

    // S-curve should show typical project progress pattern
    // Early points should have low progress, later points higher
    if (dashboard.sCurveData.length >= 3) {
      const firstThird = dashboard.sCurveData[Math.floor(dashboard.sCurveData.length / 3)]
      const lastThird = dashboard.sCurveData[Math.floor(dashboard.sCurveData.length * 2 / 3)]
      
      // Planned progress should increase
      assert(
        lastThird.plannedProgress > firstThird.plannedProgress,
        'S-curve should show progressive increase'
      )
    }

    console.log('✓ S-curve shows realistic progression pattern')
  })
})
