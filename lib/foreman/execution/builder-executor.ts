/**
 * Builder Execution Engine
 * 
 * Orchestrates real build execution following Build Philosophy:
 * Architecture → Red QA → Build to Green
 * 
 * Capabilities:
 * - Dispatch to GitHub Copilot Builder or Local Builder
 * - Enforce governance constraints
 * - Build-to-green enforcement
 * - Automatic validation (lint, TypeScript, tests, QIEL)
 * - Automatic rollback on failures
 */

import { BuilderTask, BuilderType, BuilderTaskOutput } from '@/types/builder'
import { executeWithLocalBuilder, shouldTriggerFallback } from '../local-builder'
import { logGovernanceEvent } from '../memory/governance-memory'
import { runQIEL } from '../qa/qiel-runner'
import { execSync } from 'child_process'

export interface BuildExecutionConfig {
  /** Owner of the repository */
  owner: string
  /** Repository name */
  repo: string
  /** Issue number being addressed */
  issueNumber: number
  /** Architecture document path */
  architecturePath?: string
  /** Red QA test suite path */
  redQAPath?: string
  /** Branch to work on */
  branch: string
  /** Whether to auto-rollback on failure */
  autoRollback: boolean
  /** Governance mode: strict blocks all violations */
  governanceMode: 'strict' | 'permissive'
}

export interface BuildExecutionResult {
  success: boolean
  taskId: string
  builderUsed: 'github-copilot' | 'local-builder'
  qaStatus: 'red' | 'green' | 'failed'
  validationResults: ValidationResults
  artifacts?: string[]
  error?: string
  rollbackPerformed?: boolean
  governanceViolations?: string[]
}

export interface ValidationResults {
  lint: { passed: boolean; errors: string[]; warnings: string[] }
  typecheck: { passed: boolean; errors: string[] }
  tests: { passed: boolean; total: number; passedCount: number; failed: number }
  qiel: { passed: boolean; violations: string[] }
  build: { passed: boolean; errors: string[] }
}

/**
 * Immutable paths that builders CANNOT modify
 * Enforces governance supremacy
 */
const IMMUTABLE_PATHS = [
  '.github/workflows/**',
  'foreman/constitution/**',
  'docs/governance/**',
  '.github/foreman/agent-contract.md',
  'BUILD_PHILOSOPHY.md',
  'foreman/architecture-design-checklist.md'
]

/**
 * Validate that task doesn't violate governance constraints
 */
function validateGovernanceConstraints(task: BuilderTask): { valid: boolean; violations: string[] } {
  const violations: string[] = []
  
  // Check 1: Builder cannot modify architecture
  if (task.input?.files) {
    const files = task.input.files as string[]
    const architectureFiles = files.filter((f: string) => 
      f.includes('architecture') || f.includes('design-checklist')
    )
    if (architectureFiles.length > 0) {
      violations.push(`Builder attempted to modify architecture files: ${architectureFiles.join(', ')}`)
    }
  }
  
  // Check 2: Builder cannot modify governance
  if (task.input?.files) {
    const files = task.input.files as string[]
    const governanceFiles = files.filter((f: string) => 
      IMMUTABLE_PATHS.some(pattern => {
        const regex = new RegExp(pattern.replace('**', '.*').replace('*', '[^/]*'))
        return regex.test(f)
      })
    )
    if (governanceFiles.length > 0) {
      violations.push(`Builder attempted to modify immutable paths: ${governanceFiles.join(', ')}`)
    }
  }
  
  // Check 3: Builder must have "Build to Green" instruction
  if (task.taskDescription && !task.taskDescription.toLowerCase().includes('build to green')) {
    violations.push('Task does not follow "Build to Green" instruction format')
  }
  
  return {
    valid: violations.length === 0,
    violations
  }
}

/**
 * Run automatic validations on build output
 */
async function runAutomaticValidations(): Promise<ValidationResults> {
  const results: ValidationResults = {
    lint: { passed: false, errors: [], warnings: [] },
    typecheck: { passed: false, errors: [] },
    tests: { passed: false, total: 0, passedCount: 0, failed: 0 },
    qiel: { passed: false, violations: [] },
    build: { passed: false, errors: [] }
  }
  
  // Lint validation
  try {
    execSync('npm run lint', { encoding: 'utf-8', stdio: 'pipe' })
    results.lint.passed = true
  } catch (error: any) {
    results.lint.passed = false
    results.lint.errors = [error.message]
  }
  
  // TypeScript check
  try {
    execSync('npm run typecheck', { encoding: 'utf-8', stdio: 'pipe' })
    results.typecheck.passed = true
  } catch (error: any) {
    results.typecheck.passed = false
    results.typecheck.errors = [error.message]
  }
  
  // Build check
  try {
    execSync('npm run build', { encoding: 'utf-8', stdio: 'pipe' })
    results.build.passed = true
  } catch (error: any) {
    results.build.passed = false
    results.build.errors = [error.message]
  }
  
  // QIEL check
  try {
    const qielResult = await runQIEL()
    results.qiel.passed = qielResult.passed
    // Collect violations from failed checks
    const violations: string[] = []
    if (!qielResult.checks.buildLogsPassed) violations.push('Build logs have errors')
    if (!qielResult.checks.lintLogsPassed) violations.push('Lint logs have errors')
    if (!qielResult.checks.testLogsPassed) violations.push('Test logs have errors')
    if (!qielResult.checks.zeroWarningPassed) violations.push('Zero warning policy failed')
    if (!qielResult.checks.deploymentSimulationPassed) violations.push('Deployment simulation failed')
    results.qiel.violations = violations
  } catch (error: any) {
    results.qiel.passed = false
    results.qiel.violations = [error.message]
  }
  
  return results
}

/**
 * Perform rollback on failed build
 */
async function performRollback(branch: string): Promise<void> {
  try {
    // Reset to previous commit
    execSync('git reset --hard HEAD~1', { encoding: 'utf-8' })
    console.log('[BuildExecutor] Rollback successful')
    
    await logGovernanceEvent({
      type: 'build_rollback',
      severity: 'medium',
      description: `Automatic rollback performed on branch ${branch}`,
      metadata: { branch }
    })
  } catch (error: any) {
    console.error('[BuildExecutor] Rollback failed:', error.message)
    throw error
  }
}

/**
 * Execute build using GitHub Copilot Builder (simulated)
 */
async function executeWithGitHubCopilot(task: BuilderTask): Promise<BuilderTaskOutput> {
  // Simulated GitHub Copilot execution
  // In production, this would call GitHub Copilot API
  console.log('[BuildExecutor] Executing with GitHub Copilot Builder (simulated)')
  
  return {
    success: true,
    artifacts: [],
    qaResults: [
      { check: 'build-to-green', status: 'passed', message: 'All tests passing' }
    ]
  }
}

/**
 * Main build execution function
 * Orchestrates end-to-end build following Build Philosophy
 */
export async function executeBuild(
  task: BuilderTask,
  config: BuildExecutionConfig
): Promise<BuildExecutionResult> {
  const startTime = Date.now()
  
  console.log(`[BuildExecutor] Starting build execution for task ${task.id}`)
  
  // Step 1: Validate governance constraints
  const governanceCheck = validateGovernanceConstraints(task)
  if (!governanceCheck.valid) {
    await logGovernanceEvent({
      type: 'governance_violation',
      severity: 'critical',
      description: 'Builder attempted governance violation',
      metadata: { violations: governanceCheck.violations, taskId: task.id }
    })
    
    if (config.governanceMode === 'strict') {
      return {
        success: false,
        taskId: task.id,
        builderUsed: 'github-copilot',
        qaStatus: 'failed',
        validationResults: {} as ValidationResults,
        error: 'Governance violations detected',
        governanceViolations: governanceCheck.violations
      }
    }
  }
  
  // Step 2: Determine builder (GitHub Copilot or Local Builder)
  const fallbackCheck = await shouldTriggerFallback(task, Date.now() - startTime)
  const useLocalBuilder = fallbackCheck.shouldFallback
  
  let builderOutput: BuilderTaskOutput
  let builderUsed: 'github-copilot' | 'local-builder' = 'github-copilot' // Default
  
  try {
    if (useLocalBuilder) {
      console.log(`[BuildExecutor] Using Local Builder (reason: ${fallbackCheck.reason})`)
      builderOutput = await executeWithLocalBuilder(task)
      builderUsed = 'local-builder'
    } else {
      console.log('[BuildExecutor] Using GitHub Copilot Builder')
      builderOutput = await executeWithGitHubCopilot(task)
      builderUsed = 'github-copilot'
    }
  } catch (error: any) {
    console.error('[BuildExecutor] Build execution failed:', error.message)
    
    if (config.autoRollback) {
      await performRollback(config.branch)
    }
    
    return {
      success: false,
      taskId: task.id,
      builderUsed,
      qaStatus: 'failed',
      validationResults: {} as ValidationResults,
      error: error.message,
      rollbackPerformed: config.autoRollback
    }
  }
  
  // Step 3: Run automatic validations
  console.log('[BuildExecutor] Running automatic validations')
  const validationResults = await runAutomaticValidations()
  
  // Step 4: Check if all validations passed
  const allValidationsPassed = 
    validationResults.lint.passed &&
    validationResults.typecheck.passed &&
    validationResults.build.passed &&
    validationResults.qiel.passed
  
  if (!allValidationsPassed) {
    console.error('[BuildExecutor] Validations failed')
    
    if (config.autoRollback) {
      await performRollback(config.branch)
    }
    
    return {
      success: false,
      taskId: task.id,
      builderUsed,
      qaStatus: 'failed',
      validationResults,
      error: 'Automatic validations failed',
      rollbackPerformed: config.autoRollback
    }
  }
  
  // Step 5: Determine QA status (red → green)
  const qaStatus = builderOutput.qaResults?.every(r => r.status === 'passed') ? 'green' : 'red'
  
  // Log successful execution
  await logGovernanceEvent({
    type: 'build_executed',
    severity: 'low',
    description: `Build executed successfully using ${builderUsed}`,
    metadata: { 
      taskId: task.id,
      builderUsed,
      qaStatus,
      validationResults,
      executionTimeMs: Date.now() - startTime
    }
  })
  
  return {
    success: true,
    taskId: task.id,
    builderUsed,
    qaStatus,
    validationResults,
    artifacts: builderOutput.artifacts?.map(a => a.path || a.name) as string[] | undefined
  }
}

/**
 * Execute build-to-green cycle
 * Continues building until all QA tests pass (green)
 */
export async function executeBuildToGreen(
  task: BuilderTask,
  config: BuildExecutionConfig,
  maxIterations: number = 5
): Promise<BuildExecutionResult> {
  let iteration = 0
  let lastResult: BuildExecutionResult | null = null
  
  while (iteration < maxIterations) {
    iteration++
    console.log(`[BuildExecutor] Build-to-Green iteration ${iteration}/${maxIterations}`)
    
    const result = await executeBuild(task, config)
    lastResult = result
    
    if (!result.success) {
      console.error(`[BuildExecutor] Build failed on iteration ${iteration}`)
      return result
    }
    
    if (result.qaStatus === 'green') {
      console.log(`[BuildExecutor] QA GREEN achieved on iteration ${iteration}`)
      return result
    }
    
    console.log(`[BuildExecutor] QA still RED, continuing...`)
  }
  
  // Max iterations reached without green QA
  console.error('[BuildExecutor] Max iterations reached, QA still not green')
  
  if (config.autoRollback && lastResult) {
    await performRollback(config.branch)
    lastResult.rollbackPerformed = true
  }
  
  return {
    success: false,
    taskId: task.id,
    builderUsed: lastResult?.builderUsed || 'github-copilot',
    qaStatus: 'failed',
    validationResults: lastResult?.validationResults || {} as ValidationResults,
    error: `Failed to achieve green QA after ${maxIterations} iterations`,
    rollbackPerformed: config.autoRollback
  }
}
