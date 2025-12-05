#!/usr/bin/env node
/**
 * Test Autonomous Mode Implementation
 * Tests the new autonomous mode toggle and safeguards
 */

import { 
  isAutonomousModeEnabled,
  getAutonomousSafeguards,
  dispatchBuilderTask,
  getBuilderTask,
  executeBuilderTask,
  validateGovernanceRules,
  logAutonomousAction,
  getAutonomousActionLogs
} from '../lib/foreman/dispatch'
import { BuilderRequest } from '../types/builder'

console.log('🧪 Testing Autonomous Mode Implementation\n')

// Test 1: Check autonomous mode detection
console.log('1. Testing autonomous mode detection...')
const originalMode = process.env.MATURION_AUTONOMOUS_MODE
process.env.MATURION_AUTONOMOUS_MODE = 'false'
console.log('   - Manual mode:', isAutonomousModeEnabled() === false ? '✅' : '❌')

process.env.MATURION_AUTONOMOUS_MODE = 'true'
console.log('   - Autonomous mode:', isAutonomousModeEnabled() === true ? '✅' : '❌')

// Reset
if (originalMode !== undefined) {
  process.env.MATURION_AUTONOMOUS_MODE = originalMode
} else {
  delete process.env.MATURION_AUTONOMOUS_MODE
}

// Test 2: Check safeguards
console.log('\n2. Testing safeguards configuration...')
const originalSafeguards = process.env.MATURION_AUTONOMOUS_SAFE_GUARDS
process.env.MATURION_AUTONOMOUS_SAFE_GUARDS = 'qa,compliance,tests'
const safeguards = getAutonomousSafeguards()
console.log('   - Safeguards loaded:', safeguards.length === 3 ? '✅' : '❌')
console.log('   - QA safeguard:', safeguards.includes('qa') ? '✅' : '❌')
console.log('   - Compliance safeguard:', safeguards.includes('compliance') ? '✅' : '❌')
console.log('   - Tests safeguard:', safeguards.includes('tests') ? '✅' : '❌')

// Reset
if (originalSafeguards !== undefined) {
  process.env.MATURION_AUTONOMOUS_SAFE_GUARDS = originalSafeguards
} else {
  delete process.env.MATURION_AUTONOMOUS_SAFE_GUARDS
}

// Test 3: Test autonomous task dispatch
console.log('\n3. Testing autonomous task dispatch...')
process.env.MATURION_AUTONOMOUS_MODE = 'true'

const request: BuilderRequest = {
  module: 'test-module',
  taskDescription: 'Test autonomous task',
  organisationId: 'org_test_123',
  context: { test: true },
  metadata: { source: 'test-script' }
}

async function testAutonomousDispatch() {
  try {
    // Ensure autonomous mode is on
    process.env.MATURION_AUTONOMOUS_MODE = 'true'
    
    const task = await dispatchBuilderTask('ui', request)
    console.log('   - Task created:', task.id ? '✅' : '❌')
    console.log('   - Auto-approved:', task.approved === true ? '✅' : '❌')
    console.log('   - Approved by system:', task.approvedBy === 'system_auto_approval' ? '✅' : '❌')
    console.log('   - Initial status:', task.status === 'approved' ? '✅' : '❌')
    
    // Test 4: Test task execution
    console.log('\n4. Testing task execution with QA gates...')
    const executedTask = await executeBuilderTask(task.id)
    console.log('   - Task executed:', executedTask.status === 'completed' ? '✅' : '❌')
    console.log('   - QA results present:', executedTask.output?.qaResults && executedTask.output.qaResults.length > 0 ? '✅' : '❌')
    console.log('   - QA validation passed:', executedTask.output?.qaResults?.some(r => r.check === 'qa_validation' && r.status === 'passed') ? '✅' : '❌')
    console.log('   - QA-of-QA passed:', executedTask.output?.qaResults?.some(r => r.check === 'qa_of_qa' && r.status === 'passed') ? '✅' : '❌')
    
    // Test 5: Test governance validation
    console.log('\n5. Testing governance validation...')
    const governanceValid = validateGovernanceRules(executedTask)
    console.log('   - Governance rules passed:', governanceValid ? '✅' : '❌')
    
    // Test 6: Test autonomous action logging
    console.log('\n6. Testing autonomous action logging...')
    const logs = getAutonomousActionLogs({ organisationId: 'org_test_123' })
    console.log('   - Actions logged:', logs.length > 0 ? '✅' : '❌')
    console.log('   - Log contains task ID:', logs.some(l => l.taskId === task.id) ? '✅' : '❌')
    console.log('   - Log contains success result:', logs.some(l => l.result === 'success') ? '✅' : '❌')
    
  } catch (error) {
    console.error('   ❌ Error during test:', error)
  }
}

// Test 7: Test manual mode
console.log('\n7. Testing manual approval mode...')
process.env.MATURION_AUTONOMOUS_MODE = 'false'

async function testManualMode() {
  try {
    const task = await dispatchBuilderTask('api', {
      ...request,
      module: 'manual-test-module'
    })
    console.log('   - Task created:', task.id ? '✅' : '❌')
    console.log('   - Not auto-approved:', task.approved === false ? '✅' : '❌')
    console.log('   - Awaiting approval:', task.status === 'pending_approval' ? '✅' : '❌')
  } catch (error) {
    console.error('   ❌ Error during manual mode test:', error)
  }
}

// Run tests
async function runAllTests() {
  await testAutonomousDispatch()
  
  // Reset to manual mode for next test
  process.env.MATURION_AUTONOMOUS_MODE = 'false'
  
  await testManualMode()
  
  // Reset environment
  if (originalMode !== undefined) {
    process.env.MATURION_AUTONOMOUS_MODE = originalMode
  } else {
    delete process.env.MATURION_AUTONOMOUS_MODE
  }
  
  console.log('\n✅ All tests completed!\n')
}

runAllTests().catch(console.error)
