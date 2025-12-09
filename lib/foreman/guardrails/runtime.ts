/**
 * Immutable Guardrail Runtime Engine
 * 
 * This module enforces constitutional governance by:
 * - Validating immutability of protected paths
 * - Confirming required workflow checks exist
 * - Detecting unauthorized write access
 * - Validating the Foreman Agent Contract
 * - Evaluating governance drift
 * 
 * All checks are critical. Any failure halts execution.
 */

import * as fs from 'fs'
import * as path from 'path'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'

/**
 * Guardrails Configuration
 */
export interface GuardrailsConfig {
  immutablePaths: string[]
  requiredChecks: string[]
  protectedFiles: string[]
}

/**
 * Guardrail Check Result
 */
export interface GuardrailCheckResult {
  check: string
  status: 'passed' | 'failed'
  message: string
  details?: any
}

/**
 * Full Guardrail Validation Result
 */
export interface GuardrailValidationResult {
  overall: 'passed' | 'failed'
  checks: GuardrailCheckResult[]
  violations: string[]
  timestamp: Date
}

/**
 * Load guardrails configuration
 */
export function loadGuardrails(): GuardrailsConfig {
  const configPath = path.join(process.cwd(), 'foreman', 'constitution', 'guardrails.json')
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Guardrails configuration not found at: ${configPath}`)
  }
  
  try {
    const configContent = fs.readFileSync(configPath, 'utf-8')
    const config = JSON.parse(configContent) as GuardrailsConfig
    
    // Validate config structure
    if (!config.immutablePaths || !Array.isArray(config.immutablePaths)) {
      throw new Error('Invalid guardrails config: immutablePaths must be an array')
    }
    if (!config.requiredChecks || !Array.isArray(config.requiredChecks)) {
      throw new Error('Invalid guardrails config: requiredChecks must be an array')
    }
    if (!config.protectedFiles || !Array.isArray(config.protectedFiles)) {
      throw new Error('Invalid guardrails config: protectedFiles must be an array')
    }
    
    return config
  } catch (error) {
    throw new Error(`Failed to load guardrails configuration: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Check if immutable paths exist and are accessible
 */
export function checkImmutablePaths(config: GuardrailsConfig): GuardrailCheckResult {
  const missingPaths: string[] = []
  const inaccessiblePaths: string[] = []
  
  for (const immutablePath of config.immutablePaths) {
    const fullPath = path.join(process.cwd(), immutablePath)
    
    if (!fs.existsSync(fullPath)) {
      missingPaths.push(immutablePath)
      continue
    }
    
    try {
      // Try to read to confirm accessibility
      const stats = fs.statSync(fullPath)
      if (!stats.isDirectory() && !stats.isFile()) {
        inaccessiblePaths.push(immutablePath)
      }
    } catch (error) {
      inaccessiblePaths.push(immutablePath)
    }
  }
  
  if (missingPaths.length > 0 || inaccessiblePaths.length > 0) {
    return {
      check: 'immutable_paths',
      status: 'failed',
      message: `Immutable path validation failed`,
      details: {
        missing: missingPaths,
        inaccessible: inaccessiblePaths,
        total: config.immutablePaths.length
      }
    }
  }
  
  return {
    check: 'immutable_paths',
    status: 'passed',
    message: `All ${config.immutablePaths.length} immutable paths verified`,
    details: {
      paths: config.immutablePaths
    }
  }
}

/**
 * Validate that required workflow checks exist
 */
export function validateRequiredChecks(config: GuardrailsConfig): GuardrailCheckResult {
  const workflowsDir = path.join(process.cwd(), '.github', 'workflows')
  const missingChecks: string[] = []
  const foundChecks: string[] = []
  
  if (!fs.existsSync(workflowsDir)) {
    return {
      check: 'required_checks',
      status: 'failed',
      message: 'Workflows directory not found',
      details: {
        missing: config.requiredChecks,
        path: workflowsDir
      }
    }
  }
  
  for (const checkName of config.requiredChecks) {
    // Check for workflow file with this name
    const possibleFiles = [
      path.join(workflowsDir, `${checkName}.yml`),
      path.join(workflowsDir, `${checkName}.yaml`)
    ]
    
    const exists = possibleFiles.some(filePath => fs.existsSync(filePath))
    
    if (exists) {
      foundChecks.push(checkName)
    } else {
      missingChecks.push(checkName)
    }
  }
  
  if (missingChecks.length > 0) {
    return {
      check: 'required_checks',
      status: 'failed',
      message: `Missing required workflow checks`,
      details: {
        missing: missingChecks,
        found: foundChecks,
        total: config.requiredChecks.length
      }
    }
  }
  
  return {
    check: 'required_checks',
    status: 'passed',
    message: `All ${config.requiredChecks.length} required checks verified`,
    details: {
      checks: foundChecks
    }
  }
}

/**
 * Detect unauthorized write access
 * Simulates checking Foreman's permissions on protected paths
 */
export function detectUnauthorizedWriteAccess(config: GuardrailsConfig): GuardrailCheckResult {
  // In a real implementation, this would check GitHub token permissions
  // For now, we simulate by checking if we're in a protected mode
  
  const isProtectedMode = process.env.MATURION_PROTECTED_MODE === 'true'
  const hasWriteToken = process.env.GITHUB_TOKEN !== undefined
  
  // Check if protected files are writable
  const writablePaths: string[] = []
  
  for (const protectedFile of config.protectedFiles) {
    const fullPath = path.join(process.cwd(), protectedFile)
    
    if (!fs.existsSync(fullPath)) {
      continue
    }
    
    try {
      // Check if file is writable
      fs.accessSync(fullPath, fs.constants.W_OK)
      writablePaths.push(protectedFile)
    } catch {
      // Not writable - this is good for protected files
    }
  }
  
  // In protected mode, we expect files to be read-only
  if (isProtectedMode && writablePaths.length > 0) {
    return {
      check: 'write_access',
      status: 'failed',
      message: `Protected files have write access in protected mode`,
      details: {
        writable: writablePaths,
        protectedMode: isProtectedMode,
        hasToken: hasWriteToken
      }
    }
  }
  
  return {
    check: 'write_access',
    status: 'passed',
    message: `Write access permissions validated`,
    details: {
      protectedMode: isProtectedMode,
      protectedFiles: config.protectedFiles.length,
      writableCount: writablePaths.length
    }
  }
}

/**
 * Validate Foreman Agent Contract
 */
export function validateAgentContract(): GuardrailCheckResult {
  const contractPath = path.join(process.cwd(), '.github', 'foreman', 'agent-contract.md')
  
  if (!fs.existsSync(contractPath)) {
    return {
      check: 'agent_contract',
      status: 'failed',
      message: 'Agent contract file not found',
      details: {
        path: contractPath
      }
    }
  }
  
  try {
    const content = fs.readFileSync(contractPath, 'utf-8')
    
    // Basic validation - contract should not be empty and should contain key sections
    if (content.length < 100) {
      return {
        check: 'agent_contract',
        status: 'failed',
        message: 'Agent contract appears to be incomplete',
        details: {
          length: content.length,
          path: contractPath
        }
      }
    }
    
    // Check for essential contract markers and structure
    // Validate that the contract contains required sections
    const hasHeader = content.includes('# ') || content.includes('## ')
    const hasGuidelines = content.toLowerCase().includes('foreman') || 
                          content.toLowerCase().includes('agent')
    
    // Additional validation: check for key governance concepts
    const hasGovernanceTerms = content.toLowerCase().includes('governance') ||
                               content.toLowerCase().includes('autonomy') ||
                               content.toLowerCase().includes('constitutional')
    
    if (!hasHeader || !hasGuidelines) {
      return {
        check: 'agent_contract',
        status: 'failed',
        message: 'Agent contract missing essential content',
        details: {
          hasHeader,
          hasGuidelines,
          hasGovernanceTerms,
          path: contractPath
        }
      }
    }
    
    return {
      check: 'agent_contract',
      status: 'passed',
      message: 'Agent contract validated',
      details: {
        path: contractPath,
        size: content.length,
        hasGovernanceTerms
      }
    }
  } catch (error) {
    return {
      check: 'agent_contract',
      status: 'failed',
      message: `Failed to read agent contract: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: {
        path: contractPath
      }
    }
  }
}

/**
 * Evaluate governance drift
 * Detects if any protections are missing or compromised
 */
export function evaluateGovernanceDrift(config: GuardrailsConfig): GuardrailCheckResult {
  const driftIssues: string[] = []
  
  // Check 1: Verify all protected files exist
  for (const protectedFile of config.protectedFiles) {
    const fullPath = path.join(process.cwd(), protectedFile)
    if (!fs.existsSync(fullPath)) {
      driftIssues.push(`Protected file missing: ${protectedFile}`)
    }
  }
  
  // Check 2: Verify immutable paths haven't been compromised
  const immutableCheck = checkImmutablePaths(config)
  if (immutableCheck.status === 'failed') {
    driftIssues.push(`Immutable paths compromised: ${JSON.stringify(immutableCheck.details)}`)
  }
  
  // Check 3: Verify required checks are still present
  const checksValidation = validateRequiredChecks(config)
  if (checksValidation.status === 'failed') {
    driftIssues.push(`Required checks missing: ${JSON.stringify(checksValidation.details)}`)
  }
  
  // Check 4: Verify agent contract integrity
  const contractCheck = validateAgentContract()
  if (contractCheck.status === 'failed') {
    driftIssues.push(`Agent contract compromised: ${contractCheck.message}`)
  }
  
  if (driftIssues.length > 0) {
    return {
      check: 'governance_drift',
      status: 'failed',
      message: `Governance drift detected`,
      details: {
        issues: driftIssues,
        count: driftIssues.length
      }
    }
  }
  
  return {
    check: 'governance_drift',
    status: 'passed',
    message: 'No governance drift detected',
    details: {
      protectedFiles: config.protectedFiles.length,
      immutablePaths: config.immutablePaths.length,
      requiredChecks: config.requiredChecks.length
    }
  }
}

/**
 * Run all guardrail checks
 */
export async function runGuardrailChecks(): Promise<GuardrailValidationResult> {
  const startTime = new Date()
  const checks: GuardrailCheckResult[] = []
  const violations: string[] = []
  
  try {
    // Load configuration
    const config = loadGuardrails()
    
    // Run all checks
    const checksToRun = [
      () => checkImmutablePaths(config),
      () => validateRequiredChecks(config),
      () => detectUnauthorizedWriteAccess(config),
      () => validateAgentContract(),
      () => evaluateGovernanceDrift(config)
    ]
    
    for (const checkFn of checksToRun) {
      const result = checkFn()
      checks.push(result)
      
      // Log to governance memory
      await logGovernanceEvent({
        type: 'guardrail_check',
        severity: result.status === 'failed' ? 'critical' : 'info',
        description: `${result.check}: ${result.message}`,
        metadata: {
          check: result.check,
          status: result.status,
          details: result.details
        }
      })
      
      if (result.status === 'failed') {
        violations.push(`${result.check}: ${result.message}`)
      }
    }
    
    const overall = violations.length === 0 ? 'passed' : 'failed'
    
    // Log overall result
    await logGovernanceEvent({
      type: 'guardrail_validation',
      severity: overall === 'failed' ? 'critical' : 'info',
      description: overall === 'passed' 
        ? 'All guardrail checks passed' 
        : `Guardrail validation failed with ${violations.length} violation(s)`,
      metadata: {
        overall,
        checksRun: checks.length,
        violations,
        timestamp: startTime.toISOString()
      }
    })
    
    return {
      overall,
      checks,
      violations,
      timestamp: startTime
    }
  } catch (error) {
    // Critical error - couldn't even load configuration
    await logGovernanceEvent({
      type: 'guardrail_validation',
      severity: 'critical',
      description: `Guardrail validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    })
    
    return {
      overall: 'failed',
      checks: [],
      violations: [error instanceof Error ? error.message : 'Unknown error'],
      timestamp: startTime
    }
  }
}

/**
 * Raise critical alert when guardrails are compromised
 */
export function raiseCriticalAlert(message: string): void {
  console.error('═'.repeat(80))
  console.error('🚨 CRITICAL GOVERNANCE VIOLATION 🚨')
  console.error('═'.repeat(80))
  console.error(message)
  console.error('═'.repeat(80))
  console.error('Execution halted to prevent governance violations.')
  console.error('═'.repeat(80))
}

/**
 * Halt execution when guardrails fail
 */
export function haltExecution(violations: string[]): never {
  raiseCriticalAlert(
    `Guardrail validation failed:\n${violations.map((v, i) => `  ${i + 1}. ${v}`).join('\n')}`
  )
  
  process.exit(1)
}
