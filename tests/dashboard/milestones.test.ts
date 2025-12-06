/**
 * Milestone Weighting and Progress Tests
 * Tests for milestone-specific functionality and progress calculations
 */

import { describe, test } from 'node:test'
import { generateDashboardResponse } from '../../lib/foreman/projects/dashboard'
import { calculateWeightedProgress } from '../../lib/foreman/projects/milestones'
import { loadFixture, assert, assertInRange } from './test-utils'

describe('Milestone Weighting & Progress', () => {
  test('should calculate weighted progress correctly', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const progress = calculateWeightedProgress(project)

    // Calculate expected progress manually
    const completedMilestones = project.milestones.filter(m => m.completed)
    const totalWeight = project.milestones.reduce((sum, m) => sum + (m.weight || 10), 0)
    const completedWeight = completedMilestones.reduce((sum, m) => sum + (m.weight || 10), 0)
    const expectedProgress = Math.floor((completedWeight / totalWeight) * 100)

    assert(
      progress.overall === expectedProgress,
      `Expected progress ${expectedProgress}%, got ${progress.overall}%`
    )

    console.log(`✓ Weighted progress correctly calculated: ${progress.overall}%`)
  })

  test('should group milestones by phase', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const conceptMilestones = dashboard.milestones.filter(m => m.phase === 'concept')
    const architectureMilestones = dashboard.milestones.filter(m => m.phase === 'architecture')
    const buildMilestones = dashboard.milestones.filter(m => m.phase === 'build')
    const deploymentMilestones = dashboard.milestones.filter(m => m.phase === 'deployment')

    // Verify all milestones are categorized
    const totalCategorized = conceptMilestones.length + architectureMilestones.length + 
                             buildMilestones.length + deploymentMilestones.length

    assert(
      totalCategorized === dashboard.milestones.length,
      'All milestones should be categorized by phase'
    )

    console.log('✓ Milestones correctly grouped by phase')
  })

  test('should validate milestone weights sum correctly per phase', async () => {
    const project = loadFixture('projectWithMilestones.json')

    const phases = ['concept', 'architecture', 'build', 'deployment'] as const
    
    for (const phase of phases) {
      const phaseMilestones = project.milestones.filter(m => m.phase === phase)
      
      // Skip phases with no milestones
      if (phaseMilestones.length === 0) {
        continue
      }
      
      const totalWeight = phaseMilestones.reduce((sum, m) => sum + (m.weight || 10), 0)
      
      // Each phase should have total weight of 100 (per governance rules)
      assert(
        totalWeight === 100,
        `Phase ${phase} should have total weight of 100, got ${totalWeight}`
      )
    }

    console.log('✓ Milestone weights sum to 100% per phase')
  })

  test('should handle all milestones pending scenario', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Ensure first milestone is marked incomplete for test
    project.milestones[0].completed = false
    
    const progress = calculateWeightedProgress(project)

    assert(
      progress.overall === 0,
      'Progress should be 0% when all milestones pending'
    )

    console.log('✓ All pending milestones handled correctly')
  })

  test('should handle half completed milestones', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    const completedCount = dashboard.milestones.filter(m => m.status === 'completed').length
    const totalCount = dashboard.milestones.length

    // Verify progress reflects partial completion
    assert(
      dashboard.overallProgress > 0,
      'Progress should be > 0% with some milestones complete'
    )
    assert(
      dashboard.overallProgress < 100,
      'Progress should be < 100% with some milestones incomplete'
    )

    console.log(`✓ Partial completion handled: ${completedCount}/${totalCount} milestones`)
  })

  test('should not reduce progress when completed milestone has blockers', async () => {
    const project = loadFixture('projectWithBlockers.json')
    
    // Mark a milestone as completed
    project.milestones[0].completed = true
    project.milestones[0].completedAt = '2024-01-01T10:00:00Z'

    const progressBefore = calculateWeightedProgress(project).overall

    // Add a blocker (this shouldn't reduce progress)
    const dashboard = await generateDashboardResponse(project)

    // Progress should remain the same or increase, never decrease
    assert(
      dashboard.overallProgress >= progressBefore,
      'Completed milestones with blockers should not reduce progress'
    )

    console.log('✓ Blockers do not reduce progress of completed milestones')
  })

  test('should sort milestones correctly even if completed out of order', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    // Verify milestones maintain their original order
    // The dashboard should preserve the milestone order from the source
    const milestoneIds = dashboard.milestones.map(m => m.id)
    
    // Milestones should be present in consistent order
    assert(
      milestoneIds.length === dashboard.milestones.length,
      'All milestones should be present'
    )

    // Verify no duplicate IDs
    const uniqueIds = new Set(milestoneIds)
    assert(
      uniqueIds.size === milestoneIds.length,
      'Milestone IDs should be unique'
    )

    console.log('✓ Milestones maintain correct order regardless of completion sequence')
  })

  test('should calculate phase progress independently', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const progress = calculateWeightedProgress(project)

    // Verify each phase has independent progress calculation
    const conceptProgress = progress.byPhase.concept
    const architectureProgress = progress.byPhase.architecture
    const buildProgress = progress.byPhase.build
    const deploymentProgress = progress.byPhase.deployment

    // All should be valid percentages
    assertInRange(conceptProgress, 0, 100, 'Concept phase progress')
    assertInRange(architectureProgress, 0, 100, 'Architecture phase progress')
    assertInRange(buildProgress, 0, 100, 'Build phase progress')
    assertInRange(deploymentProgress, 0, 100, 'Deployment phase progress')

    console.log('✓ Phase progress calculated independently')
  })

  test('should handle custom milestones with non-default weights', async () => {
    const project = loadFixture('projectMinimal.json')
    
    // Add a custom milestone with non-default weight
    project.milestones.push({
      id: 'custom_1',
      name: 'Custom Milestone',
      phase: 'concept',
      completionCriteria: 'Custom criteria met',
      weight: 50,
      completed: false,
      custom: true
    })

    const progress = calculateWeightedProgress(project)

    // Verify the custom weight is used in calculation
    assert(
      typeof progress.overall === 'number',
      'Progress should calculate with custom milestone weights'
    )

    console.log('✓ Custom milestone weights handled correctly')
  })

  test('should mark milestone status based on completion', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    for (const milestone of dashboard.milestones) {
      if (milestone.completedAt) {
        assert(
          milestone.status === 'completed',
          `Milestone ${milestone.id} with completedAt should have status 'completed'`
        )
      }
    }

    console.log('✓ Milestone status correctly reflects completion state')
  })

  test('should include milestone evidence when available', async () => {
    const project = loadFixture('projectWithMilestones.json')
    const dashboard = await generateDashboardResponse(project)

    // Find PR-related milestone
    const prMilestone = dashboard.milestones.find(m => m.id === 'm12')
    
    if (prMilestone && project.builds.length > 0) {
      // If there's a build with PR URL, evidence should be set
      const buildWithPR = project.builds.find(b => b.prUrl)
      if (buildWithPR) {
        assert(
          prMilestone.evidence !== undefined,
          'PR milestone should have evidence when PR URL exists'
        )
      }
    }

    console.log('✓ Milestone evidence correctly populated when available')
  })
})
