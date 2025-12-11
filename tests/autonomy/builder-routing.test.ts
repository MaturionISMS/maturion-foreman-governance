/**
 * Builder Capability & Routing Tests
 * 
 * Tests the builder capability registry and smart routing system.
 */

import {
  initializeBuilderProfiles,
  getBuilderCapability,
  getBuilderPerformance,
  updateBuilderPerformance,
  isBuilderAvailable,
  getHealthyBuilders,
  recordBuilderDrift
} from '../../lib/foreman/builders/capability-registry'
import {
  routeToBuilder,
  canBuilderHandle,
  getFallbackBuilder
} from '../../lib/foreman/execution/builder-router'
import { PilotIssue } from '../../lib/foreman/autonomy/pilot-selection'

console.log('🧪 Running Builder Capability & Routing Tests...\n')

function runTests() {
  let passed = 0
  let failed = 0
  
  // Test 1: Initialize builder profiles
  console.log('Test 1: Initialize builder profiles...')
  try {
    initializeBuilderProfiles()
    console.log('✅ Test 1 PASSED: Builder profiles initialized')
    passed++
  } catch (error: any) {
    console.log(`❌ Test 1 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 2: Get builder capabilities
  console.log('\nTest 2: Get builder capabilities...')
  try {
    const copilotCapability = getBuilderCapability('github-copilot')
    const localCapability = getBuilderCapability('local-builder')
    
    if (copilotCapability.performanceCharacteristics.maxComplexitySupported === 80 && 
        localCapability.performanceCharacteristics.maxComplexitySupported === 50) {
      console.log('✅ Test 2 PASSED: Builder capabilities loaded correctly')
      console.log(`   GitHub Copilot max complexity: ${copilotCapability.performanceCharacteristics.maxComplexitySupported}`)
      console.log(`   Local Builder max complexity: ${localCapability.performanceCharacteristics.maxComplexitySupported}`)
      passed++
    } else {
      console.log('❌ Test 2 FAILED: Incorrect capability values')
      console.log(`   GitHub Copilot: ${copilotCapability.performanceCharacteristics.maxComplexitySupported}`)
      console.log(`   Local Builder: ${localCapability.performanceCharacteristics.maxComplexitySupported}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 2 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 3: Get builder performance
  console.log('\nTest 3: Get builder performance...')
  try {
    const performance = getBuilderPerformance('github-copilot')
    
    if (performance.builderType === 'github-copilot' && 
        performance.successRate === 100 &&
        performance.isHealthy === true) {
      console.log('✅ Test 3 PASSED: Builder performance loaded correctly')
      console.log(`   Success rate: ${performance.successRate}%`)
      console.log(`   Is healthy: ${performance.isHealthy}`)
      console.log(`   Availability: ${performance.availability}%`)
      passed++
    } else {
      console.log('❌ Test 3 FAILED: Incorrect performance values')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 3 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 4: Check builder availability
  console.log('\nTest 4: Check builder availability...')
  try {
    const available = isBuilderAvailable('github-copilot')
    const healthyBuilders = getHealthyBuilders()
    
    if (available && healthyBuilders.length >= 1) {
      console.log('✅ Test 4 PASSED: Builder availability checked correctly')
      console.log(`   GitHub Copilot available: ${available}`)
      console.log(`   Healthy builders: ${healthyBuilders.join(', ')}`)
      passed++
    } else {
      console.log('❌ Test 4 FAILED: Incorrect availability check')
      console.log(`   Available: ${available}`)
      console.log(`   Healthy: ${healthyBuilders.length}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 4 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 5: Route simple documentation issue
  console.log('\nTest 5: Route simple documentation issue...')
  try {
    const simpleIssue: PilotIssue = {
      number: 1,
      title: 'Update README',
      labels: ['documentation', 'docs'],
      body: 'Update documentation',
      state: 'open'
    }
    
    const recommendation = routeToBuilder(simpleIssue)
    
    if (recommendation.builderType && recommendation.confidence > 0) {
      console.log('✅ Test 5 PASSED: Issue routed successfully')
      console.log(`   Builder: ${recommendation.builderType}`)
      console.log(`   Confidence: ${recommendation.confidence}%`)
      console.log(`   Risk level: ${recommendation.riskLevel}`)
      console.log(`   Estimated duration: ${(recommendation.estimatedDurationMs / 60000).toFixed(1)} min`)
      passed++
    } else {
      console.log('❌ Test 5 FAILED: Invalid routing recommendation')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 5 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 6: Route complex enhancement issue
  console.log('\nTest 6: Route complex enhancement issue...')
  try {
    const complexIssue: PilotIssue = {
      number: 2,
      title: 'Implement new feature with integration',
      labels: ['enhancement', 'feature'],
      body: 'Complex integration requiring multiple files',
      state: 'open'
    }
    
    const recommendation = routeToBuilder(complexIssue)
    
    if (recommendation.builderType === 'github-copilot') {
      console.log('✅ Test 6 PASSED: Complex issue routed to GitHub Copilot')
      console.log(`   Builder: ${recommendation.builderType}`)
      console.log(`   Reason: ${recommendation.reason}`)
      console.log(`   Risk level: ${recommendation.riskLevel}`)
      passed++
    } else {
      console.log('❌ Test 6 FAILED: Complex issue should route to GitHub Copilot')
      console.log(`   Builder: ${recommendation.builderType}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 6 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 7: Check if builder can handle issue
  console.log('\nTest 7: Check if builder can handle issue...')
  try {
    const simpleIssue: PilotIssue = {
      number: 3,
      title: 'Small fix',
      labels: ['bug'],
      body: 'Fix small bug',
      state: 'open'
    }
    
    // Check if at least one builder can handle the simple issue
    const copilotCanHandle = canBuilderHandle('github-copilot', simpleIssue)
    const localCanHandle = canBuilderHandle('local-builder', simpleIssue)
    
    if (copilotCanHandle || localCanHandle) {
      console.log('✅ Test 7 PASSED: At least one builder can handle simple issue')
      console.log(`   GitHub Copilot: ${copilotCanHandle}`)
      console.log(`   Local builder: ${localCanHandle}`)
      passed++
    } else {
      console.log('❌ Test 7 FAILED: At least one builder should handle simple issue')
      console.log(`   GitHub Copilot: ${copilotCanHandle}`)
      console.log(`   Local builder: ${localCanHandle}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 7 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 8: Get fallback builder
  console.log('\nTest 8: Get fallback builder...')
  try {
    const fallback = getFallbackBuilder('github-copilot')
    
    // Fallback may be null or local-builder depending on state
    if (fallback === null || fallback === 'local-builder') {
      console.log('✅ Test 8 PASSED: Fallback builder logic works')
      console.log(`   Fallback for github-copilot: ${fallback || 'none available'}`)
      passed++
    } else {
      console.log('❌ Test 8 FAILED: Unexpected fallback builder')
      console.log(`   Fallback: ${fallback}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 8 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 9: Update builder performance (success)
  console.log('\nTest 9: Update builder performance (success)...')
  try {
    const beforePerf = getBuilderPerformance('github-copilot')
    const beforeTotal = beforePerf.totalBuilds
    
    updateBuilderPerformance(
      'github-copilot',
      true, // success
      120000, // 2 minutes
      1, // iterations
      true, // QA passed
      123 // issue number
    )
    
    const performance = getBuilderPerformance('github-copilot')
    
    if (performance.totalBuilds === beforeTotal + 1 && performance.successfulBuilds > beforePerf.successfulBuilds) {
      console.log('✅ Test 9 PASSED: Performance updated after successful build')
      console.log(`   Total builds: ${performance.totalBuilds}`)
      console.log(`   Successful: ${performance.successfulBuilds}`)
      console.log(`   Success rate: ${performance.successRate.toFixed(1)}%`)
      passed++
    } else {
      console.log('❌ Test 9 FAILED: Performance not updated correctly')
      console.log(`   Total: ${performance.totalBuilds}, Success: ${performance.successfulBuilds}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 9 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 10: Update builder performance (failure)
  console.log('\nTest 10: Update builder performance (failure)...')
  try {
    const beforePerf = getBuilderPerformance('local-builder')
    const beforeTotal = beforePerf.totalBuilds
    
    updateBuilderPerformance(
      'local-builder',
      false, // failure
      60000,
      1,
      false,
      124,
      'Complexity too high'
    )
    
    const performance = getBuilderPerformance('local-builder')
    
    if (performance.totalBuilds === beforeTotal + 1 && performance.failedBuilds > beforePerf.failedBuilds) {
      console.log('✅ Test 10 PASSED: Performance updated after failed build')
      console.log(`   Total builds: ${performance.totalBuilds}`)
      console.log(`   Failed: ${performance.failedBuilds}`)
      console.log(`   Recent failures: ${performance.recentFailures.length}`)
      passed++
    } else {
      console.log('❌ Test 10 FAILED: Performance not updated correctly')
      console.log(`   Total: ${performance.totalBuilds}, Failed: ${performance.failedBuilds}`)
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 10 FAILED: ${error.message}`)
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
