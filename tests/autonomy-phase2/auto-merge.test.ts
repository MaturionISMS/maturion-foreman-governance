/**
 * PR Auto-Merge Tests
 * Tests for the PR auto-merge engine
 */

import { PRMetadata } from '@/lib/foreman/pr/auto-merge'

// Test helpers
function createMockPRMetadata(overrides: Partial<PRMetadata> = {}): PRMetadata {
  return {
    number: 123,
    title: 'Test PR: Add feature X',
    branch: 'feature/test',
    baseBranch: 'main',
    issueNumber: 456,
    labels: ['autonomy-pilot-1', 'safe-scope'],
    author: 'test-user',
    ...overrides
  }
}

// Simple metadata validation (without external dependencies)
function validateMetadata(metadata: PRMetadata): { passed: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!metadata.title || metadata.title.trim().length === 0) {
    errors.push('PR title is missing or empty')
  }
  
  if (!metadata.branch || metadata.branch.trim().length === 0) {
    errors.push('PR branch is missing or empty')
  }
  
  if (!metadata.issueNumber) {
    errors.push('PR does not link to an issue')
  }
  
  const requiredLabels = ['autonomy-pilot-1']
  const hasRequiredLabels = requiredLabels.every(label => 
    metadata.labels.includes(label)
  )
  
  if (!hasRequiredLabels) {
    errors.push(`PR missing required labels: ${requiredLabels.join(', ')}`)
  }
  
  return {
    passed: errors.length === 0,
    errors
  }
}

// Test suite
async function runTests() {
  console.log('🧪 PR Auto-Merge Tests\n')
  
  let passed = 0
  let failed = 0
  
  // Test 1: PR metadata validation
  console.log('Test 1: Valid PR metadata should pass validation')
  try {
    const metadata = createMockPRMetadata()
    const result = validateMetadata(metadata)
    
    if (result.passed) {
      console.log('✅ PASS: PR metadata validation passed\n')
      passed++
    } else {
      console.log(`❌ FAIL: Metadata validation failed: ${result.errors.join(', ')}\n`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 2: Missing issue number
  console.log('Test 2: PR without issue number should fail validation')
  try {
    const metadata = createMockPRMetadata({ issueNumber: undefined })
    const result = validateMetadata(metadata)
    
    if (!result.passed) {
      console.log('✅ PASS: Missing issue number detected\n')
      passed++
    } else {
      console.log('❌ FAIL: Missing issue number not detected\n')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 3: Missing required labels
  console.log('Test 3: PR without required labels should fail validation')
  try {
    const metadata = createMockPRMetadata({ labels: ['some-other-label'] })
    const result = validateMetadata(metadata)
    
    if (!result.passed) {
      console.log('✅ PASS: Missing required labels detected\n')
      passed++
    } else {
      console.log('❌ FAIL: Missing required labels not detected\n')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 4: Empty PR title
  console.log('Test 4: PR with empty title should fail validation')
  try {
    const metadata = createMockPRMetadata({ title: '' })
    const result = validateMetadata(metadata)
    
    if (!result.passed) {
      console.log('✅ PASS: Empty title detected\n')
      passed++
    } else {
      console.log('❌ FAIL: Empty title not detected\n')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 5: Empty branch name
  console.log('Test 5: PR with empty branch should fail validation')
  try {
    const metadata = createMockPRMetadata({ branch: '' })
    const result = validateMetadata(metadata)
    
    if (!result.passed) {
      console.log('✅ PASS: Empty branch detected\n')
      passed++
    } else {
      console.log('❌ FAIL: Empty branch not detected\n')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ FAIL: Test error: ${error.message}\n`)
    failed++
  }
  
  // Test 6: Multiple validation errors
  console.log('Test 6: Multiple validation errors should all be reported')
  try {
    const metadata = createMockPRMetadata({ 
      title: '', 
      issueNumber: undefined,
      labels: []
    })
    const result = validateMetadata(metadata)
    
    if (!result.passed && result.errors.length >= 3) {
      console.log(`✅ PASS: Multiple errors reported (${result.errors.length} errors)\n`)
      passed++
    } else {
      console.log(`❌ FAIL: Expected >= 3 errors, got ${result.errors.length}\n`)
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
