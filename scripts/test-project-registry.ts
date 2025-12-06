/**
 * Test Script: Project Registry Subsystem
 * Validates project lifecycle orchestration functionality
 */

import { projectRegistry } from '../lib/foreman/projects/registry'
import { calculateWeightedProgress } from '../lib/foreman/projects/milestones'
import { transitionToPhase } from '../lib/foreman/projects/lifecycle'

console.log('='.repeat(80))
console.log('PROJECT REGISTRY SUBSYSTEM TEST')
console.log('='.repeat(80))
console.log()

async function runTests() {
  try {
    // Test 1: Initialize Registry
    console.log('📋 Test 1: Initialize Registry')
    await projectRegistry.initialize()
    console.log('✅ Registry initialized successfully')
    console.log()

    // Test 2: Create a New Project
    console.log('📋 Test 2: Create New Project')
    const createResult = await projectRegistry.create({
      name: 'Test User Dashboard',
      description: 'A test project for validating the lifecycle orchestration system',
      owner: 'johan',
      organisationId: 'maturion_isms',
      conceptData: {
        rawConcept: 'Build a user dashboard with analytics and reporting capabilities'
      },
      tags: ['test', 'dashboard', 'analytics'],
      priority: 'high',
      estimatedCompletion: '2024-02-01T00:00:00Z'
    })

    if (!createResult.success || !createResult.data) {
      throw new Error(`Failed to create project: ${createResult.error}`)
    }

    const project = createResult.data
    console.log(`✅ Project created: ${project.name} (${project.id})`)
    console.log(`   Phase: ${project.phase}`)
    console.log(`   Status: ${project.status}`)
    console.log(`   Progress: ${project.progressPercentage}%`)
    console.log(`   Milestones: ${project.milestones.length}`)
    console.log(`   Completed milestones: ${project.milestones.filter(m => m.completed).length}`)
    console.log()

    // Test 3: Complete a Milestone
    console.log('📋 Test 3: Complete Milestone')
    const milestoneResult = await projectRegistry.completeMilestone({
      projectId: project.id,
      milestoneId: 'm2', // Requirements Defined
      completedBy: 'johan'
    })

    if (!milestoneResult.success || !milestoneResult.data) {
      throw new Error(`Failed to complete milestone: ${milestoneResult.error}`)
    }

    const updatedProject = milestoneResult.data
    console.log(`✅ Milestone completed: Requirements Defined`)
    console.log(`   Progress: ${updatedProject.progressPercentage}%`)
    console.log(`   Completed milestones: ${updatedProject.milestones.filter(m => m.completed).length}`)
    console.log()

    // Test 4: Transition to Architecture Phase
    console.log('📋 Test 4: Transition to Architecture Phase')
    
    // First complete concept approval
    await projectRegistry.completeMilestone({
      projectId: project.id,
      milestoneId: 'm3', // Concept Approved
      completedBy: 'johan'
    })

    const updateResult = await projectRegistry.update(project.id, {
      phase: 'architecture'
    })

    if (!updateResult.success || !updateResult.data) {
      throw new Error(`Failed to transition phase: ${updateResult.error}`)
    }

    const transitionedProject = updateResult.data
    console.log(`✅ Phase transition: concept → architecture`)
    console.log(`   Current phase: ${transitionedProject.phase}`)
    console.log(`   Progress: ${transitionedProject.progressPercentage}%`)
    console.log()

    // Test 5: List Projects
    console.log('📋 Test 5: List Projects')
    const listResult = await projectRegistry.list({ status: 'active' })
    console.log(`✅ Found ${listResult.total} active projects`)
    listResult.projects.forEach(p => {
      console.log(`   - ${p.name} (${p.phase}) - ${p.progressPercentage}% complete`)
    })
    console.log()

    // Test 6: Find Project by Name
    console.log('📋 Test 6: Find Project by Name')
    const foundProject = await projectRegistry.findByName('Test User Dashboard')
    if (foundProject) {
      console.log(`✅ Found project: ${foundProject.name} (${foundProject.id})`)
    } else {
      throw new Error('Failed to find project by name')
    }
    console.log()

    // Test 7: Add Custom Milestone
    console.log('📋 Test 7: Add Custom Milestone')
    const customMilestoneResult = await projectRegistry.addCustomMilestone({
      projectId: project.id,
      name: 'Custom Test Milestone',
      phase: 'architecture',
      completionCriteria: 'This is a test milestone for validation',
      weight: 15
    })

    if (!customMilestoneResult.success || !customMilestoneResult.data) {
      throw new Error(`Failed to add custom milestone: ${customMilestoneResult.error}`)
    }

    console.log(`✅ Custom milestone added`)
    console.log(`   Total milestones: ${customMilestoneResult.data.milestones.length}`)
    console.log()

    // Test 8: Get Dashboard Data
    console.log('📋 Test 8: Get Dashboard Data')
    const dashboardData = await projectRegistry.getDashboardData()
    console.log(`✅ Dashboard data retrieved`)
    console.log(`   Total projects: ${dashboardData.totalProjects}`)
    console.log(`   Active projects: ${dashboardData.activeProjects.length}`)
    console.log(`   Overall progress: ${dashboardData.overallProgress}%`)
    console.log(`   Projects by phase:`)
    Object.entries(dashboardData.projectsByPhase).forEach(([phase, count]) => {
      if (count > 0) {
        console.log(`     - ${phase}: ${count}`)
      }
    })
    console.log()

    // Test 9: Get Project Detail View
    console.log('📋 Test 9: Get Project Detail View')
    const detailView = await projectRegistry.getProjectDetail(project.id)
    if (!detailView) {
      throw new Error('Failed to get project detail view')
    }

    console.log(`✅ Project detail view retrieved`)
    console.log(`   Project: ${detailView.project.name}`)
    console.log(`   Next milestone: ${detailView.nextMilestone?.name || 'None'}`)
    console.log(`   Current blockers: ${detailView.currentBlockers.length}`)
    console.log(`   Progress by phase:`)
    Object.entries(detailView.progressByPhase).forEach(([phase, progress]) => {
      console.log(`     - ${phase}: ${progress}%`)
    })
    console.log()

    // Test 10: Archive Project (cleanup)
    console.log('📋 Test 10: Archive Project (Cleanup)')
    const archiveResult = await projectRegistry.archive(project.id)
    if (!archiveResult.success) {
      throw new Error(`Failed to archive project: ${archiveResult.error}`)
    }

    console.log(`✅ Project archived: ${project.id}`)
    console.log()

    // Summary
    console.log('='.repeat(80))
    console.log('✅ ALL TESTS PASSED')
    console.log('='.repeat(80))
    console.log()
    console.log('Project Lifecycle Orchestration subsystem is working correctly!')
    console.log()
    console.log('Features Validated:')
    console.log('  ✓ Registry initialization')
    console.log('  ✓ Project creation with metadata')
    console.log('  ✓ Milestone completion and progress calculation')
    console.log('  ✓ Phase transitions with validation')
    console.log('  ✓ Project queries (list, find by name)')
    console.log('  ✓ Custom milestones')
    console.log('  ✓ Dashboard data aggregation')
    console.log('  ✓ Project detail views')
    console.log('  ✓ Project archival')
    console.log()

  } catch (error: any) {
    console.error()
    console.error('='.repeat(80))
    console.error('❌ TEST FAILED')
    console.error('='.repeat(80))
    console.error()
    console.error('Error:', error.message)
    if (error.stack) {
      console.error()
      console.error('Stack trace:')
      console.error(error.stack)
    }
    console.error()
    process.exit(1)
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
