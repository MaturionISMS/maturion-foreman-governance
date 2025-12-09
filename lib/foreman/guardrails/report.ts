/**
 * Guardrail Status Report Generator
 * 
 * Produces the Immutable Guardrail Status Report in the exact format requested.
 */

import * as fs from 'fs'
import * as path from 'path'
import { GuardrailValidationResult, loadGuardrails } from './runtime'

/**
 * Generate Immutable Guardrail Status Report
 */
export function generateGuardrailStatusReport(validationResult: GuardrailValidationResult): string {
  const config = loadGuardrails()
  
  const report: string[] = []
  
  // Header
  report.push('=== IMMUTABLE GUARDRAIL STATUS REPORT ===')
  report.push('')
  report.push(`Generated: ${validationResult.timestamp.toISOString()}`)
  report.push(`Overall Status: ${validationResult.overall.toUpperCase()}`)
  report.push('')
  
  // Section 1: Existing Protections
  report.push('Section 1: Existing Protections')
  report.push('─'.repeat(50))
  report.push('')
  
  report.push('Protected Workflow Files:')
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows')
  if (fs.existsSync(workflowsDir)) {
    const workflows = fs.readdirSync(workflowsDir)
      .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))
    
    workflows.forEach(workflow => {
      const isRequired = config.requiredChecks.some(check => 
        workflow.startsWith(check)
      )
      const marker = isRequired ? '✓' : '•'
      report.push(`  ${marker} ${workflow}`)
    })
  } else {
    report.push('  ⚠ No workflows directory found')
  }
  report.push('')
  
  report.push('Immutable Paths:')
  config.immutablePaths.forEach(immutablePath => {
    const fullPath = path.join(process.cwd(), immutablePath)
    const exists = fs.existsSync(fullPath)
    const marker = exists ? '✓' : '✗'
    report.push(`  ${marker} ${immutablePath}`)
  })
  report.push('')
  
  report.push('Protected Files:')
  config.protectedFiles.forEach(protectedFile => {
    const fullPath = path.join(process.cwd(), protectedFile)
    const exists = fs.existsSync(fullPath)
    const marker = exists ? '✓' : '✗'
    report.push(`  ${marker} ${protectedFile}`)
  })
  report.push('')
  
  // Section 2: Current Permissions You Have
  report.push('Section 2: Current Permissions You Have')
  report.push('─'.repeat(50))
  report.push('')
  
  const isProtectedMode = process.env.MATURION_PROTECTED_MODE === 'true'
  const hasGitHubToken = process.env.GITHUB_TOKEN !== undefined
  const isAutonomousMode = process.env.MATURION_AUTONOMOUS_MODE === 'true'
  
  report.push('Foreman Runtime Permissions:')
  report.push(`  Protected Mode: ${isProtectedMode ? 'ENABLED ✓' : 'DISABLED'}`)
  report.push(`  Autonomous Mode: ${isAutonomousMode ? 'ENABLED' : 'DISABLED ✓'}`)
  report.push(`  GitHub Token: ${hasGitHubToken ? 'Present' : 'Not Present'}`)
  report.push('')
  
  report.push('Write Access to Protected Paths:')
  let writableCount = 0
  config.protectedFiles.forEach(protectedFile => {
    const fullPath = path.join(process.cwd(), protectedFile)
    
    if (!fs.existsSync(fullPath)) {
      report.push(`  ? ${protectedFile} (file not found)`)
      return
    }
    
    try {
      fs.accessSync(fullPath, fs.constants.W_OK)
      report.push(`  ✗ ${protectedFile} (WRITABLE - RISK!)`)
      writableCount++
    } catch {
      report.push(`  ✓ ${protectedFile} (read-only)`)
    }
  })
  report.push('')
  
  if (writableCount > 0 && isProtectedMode) {
    report.push(`⚠ WARNING: ${writableCount} protected file(s) are writable in protected mode!`)
    report.push('')
  }
  
  // Section 3: Governance Enforcement Tests You Have
  report.push('Section 3: Governance Enforcement Tests You Have')
  report.push('─'.repeat(50))
  report.push('')
  
  report.push('Required CI/CD Checks:')
  config.requiredChecks.forEach(check => {
    const possibleFiles = [
      path.join(workflowsDir, `${check}.yml`),
      path.join(workflowsDir, `${check}.yaml`)
    ]
    const exists = possibleFiles.some(f => fs.existsSync(f))
    const marker = exists ? '✓' : '✗'
    report.push(`  ${marker} ${check}`)
  })
  report.push('')
  
  report.push('Guardrail Runtime Checks:')
  validationResult.checks.forEach(check => {
    const marker = check.status === 'passed' ? '✓' : '✗'
    report.push(`  ${marker} ${check.check}: ${check.status.toUpperCase()}`)
  })
  report.push('')
  
  // Section 4: Gaps & Missing Guardrails
  report.push('Section 4: Gaps & Missing Guardrails')
  report.push('─'.repeat(50))
  report.push('')
  
  if (validationResult.violations.length === 0) {
    report.push('✓ No gaps detected. All guardrails are in place.')
  } else {
    report.push('⚠ The following gaps were detected:')
    report.push('')
    validationResult.violations.forEach((violation, index) => {
      report.push(`${index + 1}. ${violation}`)
    })
    report.push('')
    report.push('ACTION REQUIRED: Address these gaps immediately.')
  }
  report.push('')
  
  // Footer
  report.push('═'.repeat(50))
  
  return report.join('\n')
}

/**
 * Write report to file
 */
export function writeReportToFile(report: string, filename: string = 'guardrail-status-report.txt'): void {
  const reportsDir = path.join(process.cwd(), 'reports')
  
  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }
  
  const reportPath = path.join(reportsDir, filename)
  fs.writeFileSync(reportPath, report, 'utf-8')
  
  console.log(`[Guardrails] Report written to: ${reportPath}`)
}

/**
 * Display report to console
 */
export function displayReport(report: string): void {
  console.log('\n')
  console.log(report)
  console.log('\n')
}
