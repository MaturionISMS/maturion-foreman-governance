/**
 * Autonomous Pilot Execution Flow Tests
 * 
 * Tests the end-to-end autonomous execution orchestration.
 */

import { 
  generateExecutionPlan, 
  formatExecutionPlan,
  PilotIssue 
} from '../../lib/foreman/autonomy/execution-flow'

console.log('🧪 Running Autonomous Pilot Execution Flow Tests...\n')

function runTests() {
  let passed = 0
  let failed = 0
  
  // Test 1: Generate execution plan for documentation issue
  console.log('Test 1: Generate execution plan for documentation issue...')
  try {
    const docIssue: PilotIssue = {
      number: 100,
      title: 'Update README documentation',
      labels: ['docs', 'documentation'],
      body: 'Need to update the README with latest changes',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(docIssue)
    
    if (plan.issueNumber === 100 && 
        plan.steps.length > 0 &&
        plan.scope.length > 0) {
      console.log('✅ Test 1 PASSED: Execution plan generated for documentation issue')
      console.log(`   Steps: ${plan.steps.length}`)
      console.log(`   Scope: ${plan.scope.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 1 FAILED: Execution plan is incomplete')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 1 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 2: Generate execution plan for parking-station issue
  console.log('\nTest 2: Generate execution plan for parking-station issue...')
  try {
    const parkingIssue: PilotIssue = {
      number: 101,
      title: 'Add dashboard widget',
      labels: ['parking-station', 'enhancement'],
      body: 'Add new widget to parking station',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(parkingIssue)
    
    const hasDashboardScope = plan.scope.some(s => 
      s.toLowerCase().includes('dashboard') || s.toLowerCase().includes('ui')
    )
    
    if (hasDashboardScope) {
      console.log('✅ Test 2 PASSED: Execution plan includes dashboard scope')
      console.log(`   Scope: ${plan.scope.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 2 FAILED: Dashboard scope not included')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 2 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 3: Verify execution steps include pre-flight validation
  console.log('\nTest 3: Verify execution steps include pre-flight validation...')
  try {
    const issue: PilotIssue = {
      number: 102,
      title: 'Update docs',
      labels: ['docs'],
      body: 'Documentation update',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(issue)
    
    const hasPreFlight = plan.steps.some(step => 
      step.description.toLowerCase().includes('pre-flight')
    )
    
    if (hasPreFlight) {
      console.log('✅ Test 3 PASSED: Pre-flight validation is included in steps')
      passed++
    } else {
      console.log('❌ Test 3 FAILED: Pre-flight validation missing from steps')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 3 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 4: Verify execution steps follow Build Philosophy
  console.log('\nTest 4: Verify execution steps follow Build Philosophy...')
  try {
    const issue: PilotIssue = {
      number: 103,
      title: 'Governance docs update',
      labels: ['governance', 'docs'],
      body: 'Update governance documentation',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(issue)
    
    const hasArchitecture = plan.steps.some(step => 
      step.description.toLowerCase().includes('architecture')
    )
    const hasRedQA = plan.steps.some(step => 
      step.description.toLowerCase().includes('red qa')
    )
    const hasBuildToGreen = plan.steps.some(step => 
      step.description.toLowerCase().includes('build to green')
    )
    
    if (hasArchitecture && hasRedQA && hasBuildToGreen) {
      console.log('✅ Test 4 PASSED: Build Philosophy steps present')
      console.log('   - Architecture Design ✓')
      console.log('   - Red QA Creation ✓')
      console.log('   - Build to Green ✓')
      passed++
    } else {
      console.log('❌ Test 4 FAILED: Missing Build Philosophy steps')
      console.log(`   Architecture: ${hasArchitecture}`)
      console.log(`   Red QA: ${hasRedQA}`)
      console.log(`   Build to Green: ${hasBuildToGreen}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 4 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 5: Format execution plan as markdown
  console.log('\nTest 5: Format execution plan as markdown...')
  try {
    const issue: PilotIssue = {
      number: 104,
      title: 'Test issue',
      labels: ['docs'],
      body: 'Test',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(issue)
    const markdown = formatExecutionPlan(plan)
    
    if (markdown.includes('Autonomous Execution Plan') &&
        markdown.includes('Execution Steps') &&
        markdown.includes('Safety Rails')) {
      console.log('✅ Test 5 PASSED: Execution plan formatted as markdown')
      console.log(`   Length: ${markdown.length} characters`)
      passed++
    } else {
      console.log('❌ Test 5 FAILED: Markdown format incomplete')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 5 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 6: Verify QA checks in each step
  console.log('\nTest 6: Verify QA checks in each step...')
  try {
    const issue: PilotIssue = {
      number: 105,
      title: 'Enhancement',
      labels: ['enhancement', 'docs'],
      body: 'Enhancement request',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(issue)
    
    const stepsWithQA = plan.steps.filter(step => step.qaCheck)
    const totalSteps = plan.steps.length
    
    console.log(`   Steps with QA: ${stepsWithQA.length}/${totalSteps}`)
    
    if (stepsWithQA.length >= totalSteps * 0.7) {
      console.log('✅ Test 6 PASSED: Most steps have QA checks')
      passed++
    } else {
      console.log('❌ Test 6 FAILED: Too few steps have QA checks')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 6 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 7: Verify governance steps included
  console.log('\nTest 7: Verify governance steps included...')
  try {
    const issue: PilotIssue = {
      number: 106,
      title: 'Governance update',
      labels: ['governance'],
      body: 'Update governance',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(issue)
    
    const hasGovernanceReport = plan.steps.some(step => 
      step.description.toLowerCase().includes('governance')
    )
    
    if (hasGovernanceReport) {
      console.log('✅ Test 7 PASSED: Governance report step included')
      passed++
    } else {
      console.log('❌ Test 7 FAILED: Governance report step missing')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 7 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 8: Verify PR creation step
  console.log('\nTest 8: Verify PR creation step...')
  try {
    const issue: PilotIssue = {
      number: 107,
      title: 'Documentation fix',
      labels: ['docs'],
      body: 'Fix documentation',
      state: 'open'
    }
    
    const plan = generateExecutionPlan(issue)
    
    const hasPRCreation = plan.steps.some(step => 
      step.description.toLowerCase().includes('pr')
    )
    
    if (hasPRCreation) {
      console.log('✅ Test 8 PASSED: PR creation step included')
      passed++
    } else {
      console.log('❌ Test 8 FAILED: PR creation step missing')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 8 FAILED: ${error.message}`)
    failed++
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('TEST SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total Tests: ${passed + failed}`)
  console.log(`Passed: ${passed}`)
  console.log(`Failed: ${failed}`)
  console.log('='.repeat(60))
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed')
    process.exit(1)
  } else {
    console.log('\n✅ All tests passed')
    process.exit(0)
  }
}

runTests()
