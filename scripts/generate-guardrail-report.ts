#!/usr/bin/env tsx
/**
 * Generate Immutable Guardrail Status Report
 * 
 * This script demonstrates the Guardrail Runtime Engine by:
 * 1. Running all guardrail checks
 * 2. Generating the status report
 * 3. Writing it to a file
 * 4. Displaying it to console
 */

import { runGuardrailChecks } from '../lib/foreman/guardrails/runtime'
import { generateGuardrailStatusReport, writeReportToFile, displayReport } from '../lib/foreman/guardrails/report'

async function main() {
  console.log('🔒 Immutable Guardrail Runtime Engine')
  console.log('='.repeat(80))
  console.log('')
  
  console.log('Running guardrail checks...')
  const validationResult = await runGuardrailChecks()
  
  console.log('')
  console.log('Generating status report...')
  const report = generateGuardrailStatusReport(validationResult)
  
  // Write to file
  writeReportToFile(report)
  
  // Display to console
  displayReport(report)
  
  // Exit with appropriate code
  if (validationResult.overall === 'failed') {
    console.error('⚠️  GUARDRAIL VALIDATION FAILED')
    console.error('Please address the gaps before proceeding.')
    process.exit(1)
  } else {
    console.log('✅ GUARDRAIL VALIDATION PASSED')
    console.log('All governance protections are in place.')
    process.exit(0)
  }
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
