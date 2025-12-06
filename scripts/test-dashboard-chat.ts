/**
 * Test Dashboard Chat Commands
 * Validates that dashboard commands work correctly via the chat interface
 */

import { compileForemanChatContext } from '../lib/foreman/chat-profile'
import { executeChatActions } from '../lib/foreman/chat-executor'
import { ForemanAction } from '../types/foreman'
import { createProject, getDashboardData } from '../lib/foreman/projects/registry'
import { generateDashboardResponse } from '../lib/foreman/projects/dashboard'
import { formatProjectDashboard, formatDashboardOverview } from '../lib/foreman/dashboard-formatter'

async function testDashboardChatCommands() {
  console.log('🧪 Testing Dashboard Chat Commands\n')

  const organisationId = 'test_org'
  const conversationId = 'test_conv_' + Date.now()

  // Test 1: Compile chat context and verify dashboard commands are included
  console.log('📝 Test 1: Verify dashboard commands in chat context')
  const chatContext = await compileForemanChatContext(organisationId)
  
  const dashboardKeywords = [
    'Dashboard Commands',
    'High-Level Dashboard View',
    'Blocker Summary',
    'S-Curve Summary',
    'Deployment Readiness',
    'Phase and Milestone Analytics',
    'GET_PROJECT_DASHBOARD'
  ]
  
  let foundKeywords = 0
  dashboardKeywords.forEach(keyword => {
    if (chatContext.includes(keyword)) {
      console.log(`  ✅ Found: "${keyword}"`)
      foundKeywords++
    } else {
      console.log(`  ❌ Missing: "${keyword}"`)
    }
  })
  
  console.log(`\n  Result: ${foundKeywords}/${dashboardKeywords.length} keywords found`)
  console.log()

  // Test 2: Create a test project
  console.log('📝 Test 2: Create test project for dashboard testing')
  const projectResult = await createProject({
    name: 'Test Dashboard Project',
    description: 'A test project for dashboard integration',
    owner: 'test-user',
    organisationId,
    conceptData: {
      rawConcept: 'Build a test project to validate dashboard integration'
    },
    priority: 'high',
    tags: ['test', 'dashboard']
  })

  if (projectResult.success && projectResult.data) {
    console.log(`  ✅ Project created: ${projectResult.data.id}`)
    console.log(`     Name: ${projectResult.data.name}`)
    console.log(`     Phase: ${projectResult.data.phase}`)
    console.log(`     Status: ${projectResult.data.status}`)
    console.log()
  } else {
    console.log(`  ❌ Failed to create project: ${projectResult.error}`)
    return
  }

  const testProject = projectResult.data!

  // Test 3: Execute GET_PROJECT_DASHBOARD action
  console.log('📝 Test 3: Execute GET_PROJECT_DASHBOARD action')
  const dashboardAction: ForemanAction = {
    type: 'GET_PROJECT_DASHBOARD',
    params: {
      projectName: testProject.name
    },
    requiresApproval: false,
    organisationId
  }

  const executionResult = await executeChatActions(
    [dashboardAction],
    organisationId,
    conversationId
  )

  if (executionResult.success) {
    console.log('  ✅ Dashboard action executed successfully')
    console.log(`     Status updates: ${executionResult.statusUpdates.length}`)
    
    // Find the complete status update
    const completeUpdate = executionResult.statusUpdates.find(u => u.status === 'complete')
    if (completeUpdate) {
      console.log('\n  📊 Dashboard Output Preview:')
      console.log('  ' + '-'.repeat(60))
      const preview = completeUpdate.message.substring(0, 500)
      console.log(preview.split('\n').map(line => '  ' + line).join('\n'))
      if (completeUpdate.message.length > 500) {
        console.log('  ... (truncated)')
      }
      console.log('  ' + '-'.repeat(60))
    }
    console.log()
  } else {
    console.log(`  ❌ Dashboard action failed: ${executionResult.error}`)
    console.log()
  }

  // Test 4: Execute GET_PROJECT_STATUS action
  console.log('📝 Test 4: Execute GET_PROJECT_STATUS action')
  const statusAction: ForemanAction = {
    type: 'GET_PROJECT_STATUS',
    params: {
      projectName: testProject.name
    },
    requiresApproval: false,
    organisationId
  }

  const statusResult = await executeChatActions(
    [statusAction],
    organisationId,
    conversationId
  )

  if (statusResult.success) {
    console.log('  ✅ Status action executed successfully')
    console.log(`     Status updates: ${statusResult.statusUpdates.length}`)
    console.log()
  } else {
    console.log(`  ❌ Status action failed: ${statusResult.error}`)
    console.log()
  }

  // Test 5: Get dashboard overview
  console.log('📝 Test 5: Get dashboard overview')
  const overviewAction: ForemanAction = {
    type: 'GET_PROJECT_DASHBOARD',
    params: {},
    requiresApproval: false,
    organisationId
  }

  const overviewResult = await executeChatActions(
    [overviewAction],
    organisationId,
    conversationId
  )

  if (overviewResult.success) {
    console.log('  ✅ Overview action executed successfully')
    
    const completeUpdate = overviewResult.statusUpdates.find(u => u.status === 'complete')
    if (completeUpdate) {
      console.log('\n  📊 Overview Output Preview:')
      console.log('  ' + '-'.repeat(60))
      const preview = completeUpdate.message.substring(0, 500)
      console.log(preview.split('\n').map(line => '  ' + line).join('\n'))
      if (completeUpdate.message.length > 500) {
        console.log('  ... (truncated)')
      }
      console.log('  ' + '-'.repeat(60))
    }
    console.log()
  } else {
    console.log(`  ❌ Overview action failed: ${overviewResult.error}`)
    console.log()
  }

  // Test 6: Test dashboard formatter directly
  console.log('📝 Test 6: Test dashboard formatter directly')
  try {
    const dashboardResponse = await generateDashboardResponse(testProject)
    const formatted = formatProjectDashboard(dashboardResponse)
    
    console.log('  ✅ Dashboard formatted successfully')
    console.log(`     Output length: ${formatted.length} characters`)
    console.log(`     Sections: ${formatted.split('\n##').length - 1}`)
    
    // Verify key sections are present
    const expectedSections = [
      '## Status',
      '## Overall Progress',
      '## Milestones',
      '## Phase Timeline',
      '## Deployment Readiness'
    ]
    
    const foundSections = expectedSections.filter(section => formatted.includes(section))
    console.log(`     Found sections: ${foundSections.length}/${expectedSections.length}`)
    
    if (foundSections.length < expectedSections.length) {
      const missingSections = expectedSections.filter(s => !formatted.includes(s))
      console.log(`     Missing: ${missingSections.join(', ')}`)
    }
    console.log()
  } catch (error) {
    console.log(`  ❌ Formatter failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    console.log()
  }

  // Test 7: Test overview formatter
  console.log('📝 Test 7: Test overview formatter')
  try {
    const dashboardData = await getDashboardData()
    const formatted = formatDashboardOverview(dashboardData)
    
    console.log('  ✅ Overview formatted successfully')
    console.log(`     Output length: ${formatted.length} characters`)
    console.log(`     Active projects: ${dashboardData.activeProjects.length}`)
    console.log(`     Total projects: ${dashboardData.totalProjects}`)
    console.log()
  } catch (error) {
    console.log(`  ❌ Overview formatter failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    console.log()
  }

  // Summary
  console.log('='.repeat(60))
  console.log('📊 Dashboard Chat Command Test Summary')
  console.log('='.repeat(60))
  console.log('All tests completed. Review output above for any failures.')
  console.log()
}

// Run tests
testDashboardChatCommands()
  .then(() => {
    console.log('✅ Test script completed successfully')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Test script failed:', error)
    process.exit(1)
  })
