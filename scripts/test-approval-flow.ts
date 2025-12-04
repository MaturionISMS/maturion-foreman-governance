import { dispatchBuilderTask, approveTask, getBuilderTask, listBuilderTasks } from '@/lib/foreman/dispatch'

async function testApprovalFlow() {
  console.log('=== Testing Admin Approval Flow ===\n')
  
  try {
    // Create a task
    console.log('1. Creating a UI Builder task...')
    const task = await dispatchBuilderTask('ui', {
      module: 'test-component',
      taskDescription: 'Create a test component for approval flow testing',
      organisationId: 'org_test_001',
      context: { test: true }
    })
    console.log('Task created:', {
      id: task.id,
      status: task.status,
      approved: task.approved
    })
    console.log('')
    
    // List pending tasks
    console.log('2. Listing pending approval tasks...')
    const pendingTasks = listBuilderTasks({ 
      status: 'pending_approval',
      approved: false 
    })
    console.log(`Found ${pendingTasks.length} pending task(s)`)
    console.log('')
    
    // Approve the task
    console.log('3. Approving the task...')
    const approvedTask = approveTask(task.id, 'admin_test_user')
    console.log('Task approved:', {
      id: approvedTask.id,
      status: approvedTask.status,
      approved: approvedTask.approved,
      approvedBy: approvedTask.approvedBy
    })
    console.log('')
    
    // Verify approval
    console.log('4. Verifying task approval...')
    const verifiedTask = getBuilderTask(task.id)
    if (verifiedTask) {
      console.log('✓ Task verified:', {
        approved: verifiedTask.approved,
        status: verifiedTask.status,
        approvedBy: verifiedTask.approvedBy
      })
    }
    console.log('')
    
    console.log('=== Approval Flow Test Complete ===')
  } catch (error) {
    console.error('Error during approval flow test:', error)
    throw error
  }
}

testApprovalFlow().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})
