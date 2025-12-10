/**
 * Wave Orchestrator Tests
 * Tests for multi-issue wave orchestration
 */

import { 
  calculateComplexity, 
  prioritizeIssues, 
  executeWave 
} from '@/lib/foreman/execution/wave-orchestrator'
import { PilotIssue } from '@/lib/foreman/autonomy/pilot-selection'

// Test helpers
function createMockIssue(overrides: Partial<PilotIssue> = {}): PilotIssue {
  return {
    number: 123,
    title: 'Test issue',
    labels: ['docs'],
    body: 'Test issue body',
    state: 'open',
    ...overrides
  }
}

// Test suite
async function runTests() {
  console.log('🧪 Wave Orchestrator Tests\n')
  
  let passed = 0
  let failed = 0
  
  // Test 1: Complexity calculation for documentation
  console.log('Test 1: Documentation issue should have low complexity')
  try {
    const issue = createMockIssue({ labels: ['documentation'] })
    const complexity = calculateComplexity(issue)
    
    if (complexity.complexityScore < 20 && complexity.riskLevel === 'low') {
      console.log(`✅ PASS: Documentation complexity: ${complexity.complexityScore} (low risk)\n`)
      passed++
    } else {
      console.log(`❌ FAIL: Documentation complexity: ${complexity.complexityScore} (expected < 20)\n`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 2: Complexity calculation for architecture
  console.log('Test 2: Architecture issue should have high complexity')
  try {
    const issue = createMockIssue({ labels: ['architecture'] })
    const complexity = calculateComplexity(issue)
    
    if (complexity.complexityScore >= 50 && complexity.riskLevel === 'medium') {
      console.log(`✅ PASS: Architecture complexity: ${complexity.complexityScore} (medium risk)\n`)
      passed++
    } else {
      console.log(`❌ FAIL: Architecture complexity: ${complexity.complexityScore} (expected >= 50)\n`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 3: Issue prioritization (simplest first)
  console.log('Test 3: Issues should be prioritized by complexity (simplest first)')
  try {
    const issues = [
      createMockIssue({ number: 1, labels: ['architecture'] }),
      createMockIssue({ number: 2, labels: ['docs'] }),
      createMockIssue({ number: 3, labels: ['enhancement'] })
    ]
    
    const prioritized = prioritizeIssues(issues)
    
    // First issue should be docs (lowest complexity)
    if (prioritized[0].issue.number === 2) {
      console.log('✅ PASS: Issues prioritized correctly (docs first)\n')
      passed++
    } else {
      console.log(`❌ FAIL: First issue is #${prioritized[0].issue.number}, expected #2\n`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 4: Complexity factors
  console.log('Test 4: Complexity calculation should include multiple factors')
  try {
    const issue = createMockIssue({ labels: ['api'] })
    const complexity = calculateComplexity(issue)
    
    const hasFactors = 
      typeof complexity.factors.fileCount === 'number' &&
      typeof complexity.factors.linesOfCodeEstimate === 'number' &&
      typeof complexity.factors.dependencyCount === 'number'
    
    if (hasFactors) {
      console.log('✅ PASS: Complexity factors calculated\n')
      passed++
    } else {
      console.log('❌ FAIL: Complexity factors missing\n')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 5: Builder recommendation
  console.log('Test 5: High complexity should recommend local builder')
  try {
    const issue = createMockIssue({ 
      labels: ['architecture', 'schema'],
      body: 'Long description '.repeat(100) + 'refactor migration'
    })
    const complexity = calculateComplexity(issue)
    
    if (complexity.complexityScore > 60 && complexity.recommendedBuilder === 'local-builder') {
      console.log(`✅ PASS: Local builder recommended for complexity ${complexity.complexityScore}\n`)
      passed++
    } else {
      console.log(`❌ FAIL: Expected local-builder, got ${complexity.recommendedBuilder}\n`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 6: Duration estimation
  console.log('Test 6: Duration should scale with complexity')
  try {
    const lowComplexity = calculateComplexity(createMockIssue({ labels: ['docs'] }))
    const highComplexity = calculateComplexity(createMockIssue({ labels: ['architecture'] }))
    
    if (highComplexity.estimatedDurationMinutes > lowComplexity.estimatedDurationMinutes) {
      console.log('✅ PASS: Duration scales with complexity\n')
      passed++
    } else {
      console.log('❌ FAIL: Duration does not scale correctly\n')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Summary
  console.log('─'.repeat(50))
  console.log(`\nTest Summary:`)
  console.log(`  Passed: ${passed}`)
  console.log(`  Failed: ${failed}`)
  console.log(`  Total:  ${passed + failed}`)
  console.log(`\n${failed === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`)
  
  return failed === 0
}

// Run tests
runTests()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(error => {
    console.error('Test suite error:', error)
    process.exit(1)
  })
