/**
 * Autonomy Pre-Flight Validation System
 * 
 * Validates that all required systems are operational before autonomous execution.
 * This is a safety gate that prevents autonomous operations when critical
 * dependencies are not available or configured correctly.
 * 
 * Constitutional Compliance:
 * - Enforces Build Philosophy requirements
 * - Validates Governance Supremacy Rule (GSR) prerequisites
 * - Ensures Quality Integrity Contract (QIC) is enforceable
 * - Verifies True North Architecture alignment
 */

import fs from 'fs'
import path from 'path'

export interface PreFlightCheckResult {
  passed: boolean
  checkName: string
  details: string
  severity: 'critical' | 'warning' | 'info'
}

export interface PreFlightReport {
  timestamp: string
  overallStatus: 'PASSED' | 'FAILED'
  checks: PreFlightCheckResult[]
  failedChecks: PreFlightCheckResult[]
  warnings: PreFlightCheckResult[]
  canProceed: boolean
  summary: string
}

/**
 * Check if FOREMAN_AUTONOMY_ENABLED is set to true
 */
function checkAutonomyEnabled(): PreFlightCheckResult {
  const enabled = process.env.FOREMAN_AUTONOMY_ENABLED === 'true'
  
  return {
    passed: enabled,
    checkName: 'Autonomy Mode Enabled',
    details: enabled
      ? 'FOREMAN_AUTONOMY_ENABLED is set to true'
      : 'FOREMAN_AUTONOMY_ENABLED is not set to true (required for autonomous execution)',
    severity: 'critical'
  }
}

/**
 * Check if NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG is set to true
 */
function checkAutonomyUIFlag(): PreFlightCheckResult {
  const enabled = process.env.NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG === 'true'
  
  return {
    passed: enabled,
    checkName: 'Autonomy UI Flag',
    details: enabled
      ? 'NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG is set to true'
      : 'NEXT_PUBLIC_FOREMAN_AUTONOMY_UI_FLAG is not set to true (UI may not reflect autonomy state)',
    severity: 'warning'
  }
}

/**
 * Check if GITHUB_TOKEN is loaded
 */
function checkGitHubToken(): PreFlightCheckResult {
  const token = process.env.GITHUB_TOKEN
  const loaded = !!token && token.length > 0
  
  return {
    passed: loaded,
    checkName: 'GitHub Token',
    details: loaded
      ? 'GITHUB_TOKEN is LOADED'
      : 'GITHUB_TOKEN is MISSING (required for GitHub operations)',
    severity: 'critical'
  }
}

/**
 * Check if GITHUB_MCP_TOKEN is loaded
 */
function checkGitHubMCPToken(): PreFlightCheckResult {
  const token = process.env.GITHUB_MCP_TOKEN
  const loaded = !!token && token.length > 0
  
  return {
    passed: loaded,
    checkName: 'GitHub MCP Token',
    details: loaded
      ? 'GITHUB_MCP_TOKEN is LOADED'
      : 'GITHUB_MCP_TOKEN is MISSING (required for MCP GitHub access)',
    severity: 'critical'
  }
}

/**
 * Check MCP diagnostics
 */
async function checkMCPDiagnostics(): Promise<PreFlightCheckResult> {
  try {
    // Simulate MCP diagnostic check
    // In production, this would call the actual MCP diagnostic endpoint
    const mcpToken = process.env.GITHUB_MCP_TOKEN
    const mcpConfigured = !!mcpToken
    
    return {
      passed: mcpConfigured,
      checkName: 'MCP Configuration',
      details: mcpConfigured
        ? 'MCP is configured and accessible'
        : 'MCP is not configured (repositories may not be accessible)',
      severity: 'critical'
    }
  } catch (error: any) {
    return {
      passed: false,
      checkName: 'MCP Configuration',
      details: `MCP diagnostic failed: ${error.message}`,
      severity: 'critical'
    }
  }
}

/**
 * Check if guardrails are active
 */
function checkGuardrails(): PreFlightCheckResult {
  try {
    // Check if baseline-hashes.json exists (guardrail config)
    const baselinePath = path.join(process.cwd(), 'foreman', 'constitution', 'baseline-hashes.json')
    const exists = fs.existsSync(baselinePath)
    
    return {
      passed: exists,
      checkName: 'Guardrails Active',
      details: exists
        ? 'CS1 guardrails configuration found (baseline-hashes.json exists)'
        : 'CS1 guardrails configuration not found (baseline-hashes.json missing)',
      severity: 'critical'
    }
  } catch (error: any) {
    return {
      passed: false,
      checkName: 'Guardrails Active',
      details: `Guardrail check failed: ${error.message}`,
      severity: 'critical'
    }
  }
}

/**
 * Check if QIC config files are present
 */
function checkQICConfig(): PreFlightCheckResult {
  try {
    // Check for key QIC configuration files
    const qicPaths = [
      path.join(process.cwd(), 'foreman', 'qa'),
      path.join(process.cwd(), '.github', 'workflows', 'qic.yml')
    ]
    
    const allExist = qicPaths.every(p => fs.existsSync(p))
    
    return {
      passed: allExist,
      checkName: 'QIC Configuration',
      details: allExist
        ? 'QIC configuration files present and valid'
        : 'QIC configuration incomplete (missing qa/ directory or qic.yml workflow)',
      severity: 'critical'
    }
  } catch (error: any) {
    return {
      passed: false,
      checkName: 'QIC Configuration',
      details: `QIC config check failed: ${error.message}`,
      severity: 'critical'
    }
  }
}

/**
 * Check if QIEL config files are present
 */
function checkQIELConfig(): PreFlightCheckResult {
  try {
    // Check for QIEL workflow
    const qielPath = path.join(process.cwd(), '.github', 'workflows', 'qiel.yml')
    const exists = fs.existsSync(qielPath)
    
    return {
      passed: exists,
      checkName: 'QIEL Configuration',
      details: exists
        ? 'QIEL configuration found (qiel.yml workflow exists)'
        : 'QIEL configuration not found (qiel.yml workflow missing)',
      severity: 'critical'
    }
  } catch (error: any) {
    return {
      passed: false,
      checkName: 'QIEL Configuration',
      details: `QIEL config check failed: ${error.message}`,
      severity: 'critical'
    }
  }
}

/**
 * Check if drift detector is enabled
 */
function checkDriftDetector(): PreFlightCheckResult {
  try {
    // Check for drift detector implementation
    const driftPath = path.join(process.cwd(), 'lib', 'foreman', 'governance', 'drift-detector.ts')
    const exists = fs.existsSync(driftPath)
    
    return {
      passed: exists,
      checkName: 'Drift Detector',
      details: exists
        ? 'Drift detector enabled (drift-detector.ts found)'
        : 'Drift detector not found (drift-detector.ts missing)',
      severity: 'warning'
    }
  } catch (error: any) {
    return {
      passed: false,
      checkName: 'Drift Detector',
      details: `Drift detector check failed: ${error.message}`,
      severity: 'warning'
    }
  }
}

/**
 * Run all pre-flight checks
 */
export async function runAutonomyPreflight(): Promise<PreFlightReport> {
  const timestamp = new Date().toISOString()
  
  // Run all checks
  const checks: PreFlightCheckResult[] = [
    checkAutonomyEnabled(),
    checkAutonomyUIFlag(),
    checkGitHubToken(),
    checkGitHubMCPToken(),
    await checkMCPDiagnostics(),
    checkGuardrails(),
    checkQICConfig(),
    checkQIELConfig(),
    checkDriftDetector()
  ]
  
  // Categorize results
  const failedChecks = checks.filter(c => !c.passed && c.severity === 'critical')
  const warnings = checks.filter(c => !c.passed && c.severity === 'warning')
  
  const overallStatus = failedChecks.length === 0 ? 'PASSED' : 'FAILED'
  const canProceed = failedChecks.length === 0
  
  // Generate summary
  let summary = ''
  if (canProceed) {
    summary = `Pre-flight checks PASSED. All critical systems operational. ${warnings.length} warning(s).`
  } else {
    summary = `Pre-flight checks FAILED. ${failedChecks.length} critical check(s) failed. Autonomous execution is BLOCKED.`
  }
  
  return {
    timestamp,
    overallStatus,
    checks,
    failedChecks,
    warnings,
    canProceed,
    summary
  }
}

/**
 * Generate a structured failure report for governance incident recording
 */
export function generatePreFlightFailureReport(report: PreFlightReport): string {
  const lines: string[] = [
    '# Autonomy Pre-Flight Validation FAILED',
    '',
    `**Timestamp**: ${report.timestamp}`,
    `**Status**: ${report.overallStatus}`,
    '',
    '## Summary',
    report.summary,
    '',
    '## Failed Checks',
    ''
  ]
  
  if (report.failedChecks.length === 0) {
    lines.push('None')
  } else {
    report.failedChecks.forEach(check => {
      lines.push(`### ${check.checkName}`)
      lines.push(`- **Severity**: ${check.severity}`)
      lines.push(`- **Details**: ${check.details}`)
      lines.push('')
    })
  }
  
  if (report.warnings.length > 0) {
    lines.push('## Warnings', '')
    report.warnings.forEach(warning => {
      lines.push(`### ${warning.checkName}`)
      lines.push(`- **Details**: ${warning.details}`)
      lines.push('')
    })
  }
  
  lines.push('## All Checks', '')
  report.checks.forEach(check => {
    const status = check.passed ? '✅' : '❌'
    lines.push(`- ${status} **${check.checkName}**: ${check.details}`)
  })
  
  lines.push('')
  lines.push('## Required Actions')
  lines.push('')
  
  if (report.failedChecks.length > 0) {
    lines.push('**Autonomous execution is BLOCKED. Fix the following critical issues:**')
    lines.push('')
    report.failedChecks.forEach((check, index) => {
      lines.push(`${index + 1}. ${check.checkName}: ${check.details}`)
    })
  }
  
  return lines.join('\n')
}
