/**
 * Autonomy Pre-Flight Validation Tests
 * 
 * Tests the pre-flight validation system that ensures all required
 * systems are operational before autonomous execution.
 */

import { runAutonomyPreflight, generatePreFlightFailureReport } from '../../lib/foreman/autonomy/pre-flight'

console.log('🧪 Running Autonomy Pre-Flight Validation Tests...\n')

async function runTests() {
  let passed = 0
  let failed = 0
  
  // Test 1: Run pre-flight validation
  console.log('Test 1: Running pre-flight validation...')
  try {
    const report = await runAutonomyPreflight()
    
    console.log(`  Status: ${report.overallStatus}`)
    console.log(`  Can Proceed: ${report.canProceed}`)
    console.log(`  Total Checks: ${report.checks.length}`)
    console.log(`  Failed Checks: ${report.failedChecks.length}`)
    console.log(`  Warnings: ${report.warnings.length}`)
    console.log(`  Summary: ${report.summary}`)
    
    if (report.checks.length > 0) {
      console.log('✅ Test 1 PASSED: Pre-flight validation executed successfully')
      passed++
    } else {
      console.log('❌ Test 1 FAILED: No checks were executed')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 1 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 2: Check individual validation results
  console.log('\nTest 2: Checking individual validation results...')
  try {
    const report = await runAutonomyPreflight()
    
    console.log('\n  Individual Check Results:')
    report.checks.forEach(check => {
      const status = check.passed ? '✅' : '❌'
      const severity = check.severity.toUpperCase()
      console.log(`  ${status} [${severity}] ${check.checkName}`)
      console.log(`     ${check.details}`)
    })
    
    console.log('\n✅ Test 2 PASSED: Individual checks displayed')
    passed++
  } catch (error: any) {
    console.log(`\n❌ Test 2 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 3: Generate failure report if needed
  console.log('\nTest 3: Testing failure report generation...')
  try {
    const report = await runAutonomyPreflight()
    
    if (!report.canProceed) {
      const failureReport = generatePreFlightFailureReport(report)
      console.log('\n  Generated Failure Report:')
      console.log('  ---')
      console.log(failureReport.split('\n').map(line => '  ' + line).join('\n'))
      console.log('  ---')
    } else {
      console.log('  ℹ️  All checks passed - no failure report needed')
    }
    
    console.log('\n✅ Test 3 PASSED: Failure report generation works')
    passed++
  } catch (error: any) {
    console.log(`\n❌ Test 3 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 4: Verify critical vs warning classification
  console.log('\nTest 4: Verifying check severity classification...')
  try {
    const report = await runAutonomyPreflight()
    
    const criticalChecks = report.checks.filter(c => c.severity === 'critical')
    const warningChecks = report.checks.filter(c => c.severity === 'warning')
    
    console.log(`  Critical Checks: ${criticalChecks.length}`)
    console.log(`  Warning Checks: ${warningChecks.length}`)
    
    // Verify that failed critical checks block execution
    const failedCritical = report.failedChecks.filter(c => c.severity === 'critical')
    if (failedCritical.length > 0 && report.canProceed) {
      console.log('❌ Test 4 FAILED: Failed critical checks should block execution')
      failed++
    } else {
      console.log('✅ Test 4 PASSED: Severity classification is correct')
      passed++
    }
  } catch (error: any) {
    console.log(`❌ Test 4 FAILED: ${error.message}`)
    failed++
  }
  
  // Test 5: Verify environment variable checks
  console.log('\nTest 5: Verifying environment variable detection...')
  try {
    const report = await runAutonomyPreflight()
    
    const autonomyCheck = report.checks.find(c => c.checkName === 'Autonomy Mode Enabled')
    const mcpTokenCheck = report.checks.find(c => c.checkName === 'GitHub MCP Token')
    const githubTokenCheck = report.checks.find(c => c.checkName === 'GitHub Token')
    
    console.log(`  Autonomy Enabled: ${autonomyCheck?.passed ? '✅' : '❌'}`)
    console.log(`  GitHub MCP Token: ${mcpTokenCheck?.passed ? '✅' : '❌'}`)
    console.log(`  GitHub Token: ${githubTokenCheck?.passed ? '✅' : '❌'}`)
    
    if (autonomyCheck && mcpTokenCheck && githubTokenCheck) {
      console.log('✅ Test 5 PASSED: Environment variable checks are present')
      passed++
    } else {
      console.log('❌ Test 5 FAILED: Some environment variable checks are missing')
      failed++
    }
  } catch (error: any) {
    console.log(`❌ Test 5 FAILED: ${error.message}`)
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

runTests().catch(error => {
  console.error('\n💥 Test suite crashed:', error)
  process.exit(1)
})
