/**
 * Manual Integration Test for Project Lifecycle + Chat + Memory
 * This script tests the complete flow of project lifecycle orchestration
 */

import { executeChatActions } from '../lib/foreman/chat-executor'
import { ForemanAction } from '../types/foreman'
import { getAllMemory } from '../lib/foreman/memory/storage'
import { clearCache } from '../lib/foreman/projects/registry'

// Test configuration
const TEST_ORG_ID = 'maturion_test'
const TEST_CONVERSATION_ID = 'test_conv_001'

/**
 * Test 1: Create a new project via chat action
 */
async function testCreateProject() {
  console.log('\n=== Test 1: Create Project ===')
  
  const action: ForemanAction = {
    type: 'CREATE_PROJECT',
    params: {
      name: 'Test User Dashboard',
      description: 'A test dashboard for user analytics',
      owner: 'test_user',
      conceptData: {
        rawConcept: 'Build a dashboard that shows user analytics and metrics',
      },
      tags: ['test', 'dashboard'],
      priority: 'medium',
    },
    requiresApproval: false,
    organisationId: TEST_ORG_ID,
  }

  const result = await executeChatActions([action], TEST_ORG_ID, TEST_CONVERSATION_ID)
  
  console.log('Result:', JSON.stringify(result, null, 2))
  console.log('Status Updates:')
  result.statusUpdates.forEach(update => {
    console.log(`  [${update.status}] ${update.message}`)
  })

  if (result.success && result.taskIds && result.taskIds.length > 0) {
    console.log('✅ Project created successfully!')
    return result.taskIds[0] // Return project ID
  } else {
    console.log('❌ Failed to create project')
    return null
  }
}

/**
 * Test 2: Update project phase
 */
async function testUpdatePhase(projectId: string) {
  console.log('\n=== Test 2: Update Phase ===')
  
  const action: ForemanAction = {
    type: 'UPDATE_PHASE',
    params: {
      projectId,
      phase: 'architecture',
    },
    requiresApproval: true,
    organisationId: TEST_ORG_ID,
  }

  const result = await executeChatActions([action], TEST_ORG_ID, TEST_CONVERSATION_ID)
  
  console.log('Result:', JSON.stringify(result, null, 2))
  console.log('Status Updates:')
  result.statusUpdates.forEach(update => {
    console.log(`  [${update.status}] ${update.message}`)
  })

  if (result.success) {
    console.log('✅ Phase updated successfully!')
  } else {
    console.log('❌ Failed to update phase')
  }
}

/**
 * Test 3: Complete a milestone
 */
async function testCompleteMilestone(projectId: string) {
  console.log('\n=== Test 3: Complete Milestone ===')
  
  const action: ForemanAction = {
    type: 'UPDATE_MILESTONES',
    params: {
      projectId,
      milestoneId: 'm2', // Requirements Defined
      completedBy: 'test_user',
    },
    requiresApproval: false,
    organisationId: TEST_ORG_ID,
  }

  const result = await executeChatActions([action], TEST_ORG_ID, TEST_CONVERSATION_ID)
  
  console.log('Result:', JSON.stringify(result, null, 2))
  console.log('Status Updates:')
  result.statusUpdates.forEach(update => {
    console.log(`  [${update.status}] ${update.message}`)
  })

  if (result.success) {
    console.log('✅ Milestone completed successfully!')
  } else {
    console.log('❌ Failed to complete milestone')
  }
}

/**
 * Test 4: Record a blocker
 */
async function testRecordBlocker(projectId: string) {
  console.log('\n=== Test 4: Record Blocker ===')
  
  const action: ForemanAction = {
    type: 'RECORD_BLOCKER',
    params: {
      projectId,
      description: 'Waiting for API specification approval',
      category: 'approval',
      severity: 'high',
    },
    requiresApproval: false,
    organisationId: TEST_ORG_ID,
  }

  const result = await executeChatActions([action], TEST_ORG_ID, TEST_CONVERSATION_ID)
  
  console.log('Result:', JSON.stringify(result, null, 2))
  console.log('Status Updates:')
  result.statusUpdates.forEach(update => {
    console.log(`  [${update.status}] ${update.message}`)
  })

  if (result.success) {
    console.log('✅ Blocker recorded successfully!')
  } else {
    console.log('❌ Failed to record blocker')
  }
}

/**
 * Test 5: Get project status
 */
async function testGetProjectStatus(projectId: string) {
  console.log('\n=== Test 5: Get Project Status ===')
  
  const action: ForemanAction = {
    type: 'GET_PROJECT_STATUS',
    params: {
      projectId,
    },
    requiresApproval: false,
    organisationId: TEST_ORG_ID,
  }

  const result = await executeChatActions([action], TEST_ORG_ID, TEST_CONVERSATION_ID)
  
  console.log('Result:', JSON.stringify(result, null, 2))
  console.log('Status Updates:')
  result.statusUpdates.forEach(update => {
    console.log(`  [${update.status}] ${update.message}`)
    if (update.metadata) {
      console.log('  Metadata:', JSON.stringify(update.metadata, null, 2))
    }
  })

  if (result.success) {
    console.log('✅ Project status retrieved successfully!')
  } else {
    console.log('❌ Failed to get project status')
  }
}

/**
 * Test 6: Get project dashboard
 */
async function testGetProjectDashboard() {
  console.log('\n=== Test 6: Get Project Dashboard ===')
  
  const action: ForemanAction = {
    type: 'GET_PROJECT_DASHBOARD',
    params: {
      view: 'overview',
    },
    requiresApproval: false,
    organisationId: TEST_ORG_ID,
  }

  const result = await executeChatActions([action], TEST_ORG_ID, TEST_CONVERSATION_ID)
  
  console.log('Result:', JSON.stringify(result, null, 2))
  console.log('Status Updates:')
  result.statusUpdates.forEach(update => {
    console.log(`  [${update.status}] ${update.message}`)
  })

  if (result.success) {
    console.log('✅ Dashboard retrieved successfully!')
  } else {
    console.log('❌ Failed to get dashboard')
  }
}

/**
 * Test 7: Verify memory entries were created
 */
async function testMemoryIntegration() {
  console.log('\n=== Test 7: Verify Memory Integration ===')
  
  const allMemory = await getAllMemory()
  
  console.log('\nGlobal memory entries:', allMemory.global.length)
  console.log('Foreman memory entries:', allMemory.foreman.length)
  console.log('Project memory entries:', Object.keys(allMemory.projects).length)
  
  // Display project memory entries
  for (const [projectId, entries] of Object.entries(allMemory.projects)) {
    console.log(`\nProject ${projectId}:`)
    entries.forEach(entry => {
      console.log(`  - [${entry.metadata.createdAt}] ${entry.key}`)
      if (entry.value.description) {
        console.log(`    ${entry.value.description}`)
      }
    })
  }

  if (Object.keys(allMemory.projects).length > 0) {
    console.log('✅ Memory entries created successfully!')
  } else {
    console.log('❌ No project memory entries found')
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('========================================')
  console.log('Project Lifecycle Integration Test Suite')
  console.log('========================================')
  
  // Clear cache before starting
  clearCache()
  
  try {
    // Test 1: Create project
    const projectId = await testCreateProject()
    
    if (!projectId) {
      console.log('\n❌ Cannot continue tests - project creation failed')
      return
    }

    // Test 2: Update phase (expected to fail due to unmet prerequisites)
    // This validates that governance rules are enforced
    console.log('\nNote: This test should fail - validating governance enforcement')
    await testUpdatePhase(projectId)

    // Test 3: Complete milestone
    await testCompleteMilestone(projectId)

    // Test 4: Record blocker
    await testRecordBlocker(projectId)

    // Test 5: Get project status
    await testGetProjectStatus(projectId)

    // Test 6: Get dashboard
    await testGetProjectDashboard()

    // Test 7: Verify memory integration
    await testMemoryIntegration()

    console.log('\n========================================')
    console.log('Test Suite Complete')
    console.log('========================================')
  } catch (error) {
    console.error('\n❌ Test suite failed with error:', error)
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack)
    }
  }
}

// Run tests
runAllTests()
  .then(() => {
    console.log('\nAll tests executed')
    process.exit(0)
  })
  .catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
