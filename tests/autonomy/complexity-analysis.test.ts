/**
 * Issue Complexity Analysis Tests
 * 
 * Tests the ML issue complexity and safety predictor system.
 */

import {
  calculateComplexityScore,
  calculateSafetyScore,
  classifyRisk
} from '../../lib/foreman/analysis/issue-complexity'
import { PilotIssue } from '../../lib/foreman/autonomy/pilot-selection'

console.log('🧪 Running Issue Complexity Analysis Tests...\n')

function runTests() {
  let passed = 0
  let failed = 0
  
  // Test 1: Simple documentation issue (should be SAFE)
  console.log('Test 1: Simple documentation issue...')
  try {
    const simpleIssue: PilotIssue = {
      number: 1,
      title: 'Update README documentation',
      labels: ['documentation', 'docs'],
      body: 'Need to update the README with latest changes',
      state: 'open'
    }
    
    const classification = classifyRisk(simpleIssue)
    
    if (classification.level === 'SAFE' && classification.allowAutonomousExecution) {
      console.log('✅ Test 1 PASSED: Simple documentation issue correctly classified as SAFE')
      console.log(`   Complexity: ${classification.complexity.score}/100`)
      console.log(`   Safety: ${classification.safety.score}/100`)
      console.log(`   Recommendation: ${classification.recommendation}`)
      passed++
    } else {
      console.log('❌ Test 1 FAILED: Simple documentation should be SAFE')
      console.log(`   Classification: ${classification.level}`)
      console.log(`   Allow autonomous: ${classification.allowAutonomousExecution}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 1 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 2: Workflow modification (should be UNSAFE)
  console.log('\nTest 2: Workflow modification issue...')
  try {
    const workflowIssue: PilotIssue = {
      number: 2,
      title: 'Modify GitHub workflow',
      labels: ['workflow'],
      body: 'Need to update .github/workflows/ci.yml',
      state: 'open'
    }
    
    const classification = classifyRisk(workflowIssue)
    
    if (classification.level === 'UNSAFE' && classification.escalateToJohan) {
      console.log('✅ Test 2 PASSED: Workflow modification correctly classified as UNSAFE')
      console.log(`   Complexity: ${classification.complexity.score}/100`)
      console.log(`   Safety: ${classification.safety.score}/100`)
      console.log(`   Escalate: ${classification.escalateToJohan}`)
      passed++
    } else {
      console.log('❌ Test 2 FAILED: Workflow modification should be UNSAFE')
      console.log(`   Classification: ${classification.level}`)
      console.log(`   Escalate: ${classification.escalateToJohan}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 2 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 3: High complexity enhancement (should be CONDITIONAL or near threshold)
  console.log('\nTest 3: High complexity enhancement...')
  try {
    const complexIssue: PilotIssue = {
      number: 3,
      title: 'Refactor core architecture framework',
      labels: ['enhancement', 'architecture', 'large', 'breaking-change', 'feature'],
      body: 'Need to refactor and rewrite the core system architecture with complex integration, breaking changes affecting multiple files and dependencies. This is a large system-wide change.',
      state: 'open'
    }
    
    const classification = classifyRisk(complexIssue)
    
    // Should be high complexity (close to or exceeding threshold)
    if (classification.complexity.score >= 65) {
      console.log('✅ Test 3 PASSED: Complex enhancement has high complexity score')
      console.log(`   Classification: ${classification.level}`)
      console.log(`   Complexity: ${classification.complexity.score}/100`)
      console.log(`   Safety: ${classification.safety.score}/100`)
      console.log(`   Note: Complexity near/at threshold for human review`)
      passed++
    } else {
      console.log('❌ Test 3 FAILED: Complex enhancement should have high complexity')
      console.log(`   Complexity: ${classification.complexity.score}/100 (expected >= 65)`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 3 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 4: Governance-protected paths (should be UNSAFE)
  console.log('\nTest 4: Governance-protected paths...')
  try {
    const governanceIssue: PilotIssue = {
      number: 4,
      title: 'Update BUILD_PHILOSOPHY.md',
      labels: ['governance'],
      body: 'Need to update BUILD_PHILOSOPHY.md with new principles',
      state: 'open'
    }
    
    const classification = classifyRisk(governanceIssue)
    
    if (classification.level === 'UNSAFE' && classification.escalateToJohan) {
      console.log('✅ Test 4 PASSED: Governance file modification correctly classified as UNSAFE')
      console.log(`   Complexity: ${classification.complexity.score}/100`)
      console.log(`   Safety: ${classification.safety.score}/100`)
      console.log(`   Reasoning: ${classification.reasoning.join('; ')}`)
      passed++
    } else {
      console.log('❌ Test 4 FAILED: Governance file should be UNSAFE')
      console.log(`   Classification: ${classification.level}`)
      console.log(`   Escalate: ${classification.escalateToJohan}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 4 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 5: Security-sensitive issue (should have high security score)
  console.log('\nTest 5: Security-sensitive issue...')
  try {
    const securityIssue: PilotIssue = {
      number: 5,
      title: 'Update authentication system',
      labels: ['security', 'authentication'],
      body: 'Need to update the authentication with new credentials handling',
      state: 'open'
    }
    
    const classification = classifyRisk(securityIssue)
    
    if (classification.complexity.factors.securitySensitivity > 5) {
      console.log('✅ Test 5 PASSED: Security issue has high security sensitivity score')
      console.log(`   Security sensitivity: ${classification.complexity.factors.securitySensitivity}/10`)
      console.log(`   Classification: ${classification.level}`)
      passed++
    } else {
      console.log('❌ Test 5 FAILED: Security issue should have high security score')
      console.log(`   Security sensitivity: ${classification.complexity.factors.securitySensitivity}/10`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 5 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 6: Complexity score calculation
  console.log('\nTest 6: Complexity score calculation...')
  try {
    const testIssue: PilotIssue = {
      number: 6,
      title: 'Small bug fix',
      labels: ['bug'],
      body: 'Fix a small bug in the component',
      state: 'open'
    }
    
    const complexity = calculateComplexityScore(testIssue)
    
    if (complexity.score >= 0 && complexity.score <= 100 && complexity.breakdown.length > 0) {
      console.log('✅ Test 6 PASSED: Complexity score calculated correctly')
      console.log(`   Score: ${complexity.score}/100`)
      console.log(`   Breakdown: ${complexity.breakdown.slice(0, 3).join(', ')}...`)
      passed++
    } else {
      console.log('❌ Test 6 FAILED: Invalid complexity score')
      console.log(`   Score: ${complexity.score}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 6 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 7: Safety score calculation
  console.log('\nTest 7: Safety score calculation...')
  try {
    const testIssue: PilotIssue = {
      number: 7,
      title: 'Update test suite',
      labels: ['test'],
      body: 'Add more tests',
      state: 'open'
    }
    
    const safety = calculateSafetyScore(testIssue)
    
    if (safety.score >= 0 && safety.score <= 100 && safety.breakdown.length > 0) {
      console.log('✅ Test 7 PASSED: Safety score calculated correctly')
      console.log(`   Score: ${safety.score}/100`)
      console.log(`   Breakdown: ${safety.breakdown.slice(0, 3).join(', ')}...`)
      passed++
    } else {
      console.log('❌ Test 7 FAILED: Invalid safety score')
      console.log(`   Score: ${safety.score}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 7 FAILED: ${error.message}`)
    failed++
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log(`Test Results: ${passed} passed, ${failed} failed`)
  console.log('='.repeat(60))
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed')
    process.exit(1)
  } else {
    console.log('\n✅ All tests passed!')
    process.exit(0)
  }
}

runTests()
