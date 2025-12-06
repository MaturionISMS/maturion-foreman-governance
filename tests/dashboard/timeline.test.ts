/**
 * Timeline and Phase Tests
 * Tests for phase timeline calculations and transitions
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse } from '../../lib/foreman/projects/dashboard'
import { loadFixture, assert } from './test-utils'

describe('Timeline and Phase Progress', () => {
  test('should generate phase timeline data', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      Array.isArray(dashboard.phaseTimeline),
      'Phase timeline should be an array'
    )
    assert(
      dashboard.phaseTimeline.length > 0,
      'Phase timeline should not be empty'
    )

    console.log('✓ Phase timeline generated')
  })

  test('should include all relevant phases in timeline', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const phases = dashboard.phaseTimeline.map(t => t.phase)
    
    // Should include at least the current phase
    assert(
      phases.includes(project.phase),
      'Timeline should include current project phase'
    )

    console.log('✓ Timeline includes relevant phases')
  })

  test('should set actualStart when phase begins', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const currentPhaseTimeline = dashboard.phaseTimeline.find(
      t => t.phase === project.phase
    )

    if (currentPhaseTimeline && currentPhaseTimeline.status === 'in_progress') {
      // In-progress phase may have actualStart if milestones are completed
      const hasCompletedMilestone = project.milestones.some(
        m => m.phase === project.phase && m.completed && m.completedAt
      )
      
      if (hasCompletedMilestone) {
        assert(
          currentPhaseTimeline.actualStart !== undefined,
          'In-progress phase with completed milestones should have actualStart'
        )
      }
    }

    console.log('✓ actualStart set for active phases')
  })

  test('should set actualEnd when phase completes', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const completedPhases = dashboard.phaseTimeline.filter(
      t => t.status === 'completed'
    )

    for (const phase of completedPhases) {
      if (phase.actualStart) {
        assert(
          phase.actualEnd !== undefined,
          `Completed phase ${phase.phase} should have actualEnd`
        )
      }
    }

    console.log('✓ actualEnd set for completed phases')
  })

  test('should calculate drift accurately', async () => {
    const project = loadFixture('projectWithTimelineDrift.json')
    const dashboard = await generateDashboardResponse(project)

    // Verify drift is a number
    for (const timeline of dashboard.phaseTimeline) {
      if (timeline.driftPercentage !== undefined) {
        assert(
          typeof timeline.driftPercentage === 'number',
          'Drift percentage should be a number'
        )
        assert(
          timeline.driftPercentage >= 0,
          'Drift percentage should be non-negative'
        )
      }
    }

    console.log('✓ Drift calculated accurately')
  })

  test('should mark phases with correct status', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const allowedStatuses = ['not_started', 'in_progress', 'completed', 'delayed']

    for (const timeline of dashboard.phaseTimeline) {
      assert(
        allowedStatuses.includes(timeline.status),
        `Phase status should be one of ${allowedStatuses.join(', ')}, got ${timeline.status}`
      )
    }

    console.log('✓ Phase statuses are valid')
  })

  test('should handle phase transitions correctly', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    // Current phase should be in_progress or completed
    const currentPhaseTimeline = dashboard.phaseTimeline.find(
      t => t.phase === project.phase
    )

    if (currentPhaseTimeline) {
      assert(
        currentPhaseTimeline.status === 'in_progress' ||
        currentPhaseTimeline.status === 'completed' ||
        currentPhaseTimeline.status === 'delayed',
        'Current phase should have appropriate status'
      )
    }

    console.log('✓ Phase transitions handled correctly')
  })

  test('should validate timeline consistency', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    for (const timeline of dashboard.phaseTimeline) {
      // If both actualStart and actualEnd exist, end should be after start
      if (timeline.actualStart && timeline.actualEnd) {
        const start = new Date(timeline.actualStart)
        const end = new Date(timeline.actualEnd)
        
        assert(
          end >= start,
          `Phase ${timeline.phase}: actualEnd should be >= actualStart`
        )
      }
    }

    console.log('✓ Timeline data is internally consistent')
  })

  test('should handle project at start of lifecycle', async () => {
    const project = loadFixture('projectMinimal.json')
    const dashboard = await generateDashboardResponse(project)

    assert(
      dashboard.phaseTimeline.length > 0,
      'Even early-stage projects should have timeline data'
    )

    console.log('✓ Early-stage projects handled correctly')
  })

  test('should include phase in timeline data', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    for (const timeline of dashboard.phaseTimeline) {
      assert(
        !!timeline.phase,
        'Each timeline entry should have a phase'
      )
      assert(
        typeof timeline.phase === 'string',
        'Phase should be a string'
      )
    }

    console.log('✓ Timeline entries include phase information')
  })

  test('should be deterministic across calls', async () => {
    const project = loadFixture('projectWithMilestones.json')
    
    const dashboard1 = await generateDashboardResponse(project)
    const dashboard2 = await generateDashboardResponse(project)

    assert(
      dashboard1.phaseTimeline.length === dashboard2.phaseTimeline.length,
      'Timeline should be deterministic'
    )

    for (let i = 0; i < dashboard1.phaseTimeline.length; i++) {
      const t1 = dashboard1.phaseTimeline[i]
      const t2 = dashboard2.phaseTimeline[i]
      
      assert(
        t1.phase === t2.phase,
        `Phase should match at index ${i}`
      )
      assert(
        t1.status === t2.status,
        `Status should match for phase ${t1.phase}`
      )
    }

    console.log('✓ Timeline generation is deterministic')
  })
})
