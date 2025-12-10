/**
 * Wave Orchestrator
 * 
 * Orchestrates multi-issue waves for autonomous execution.
 * Implements complexity scoring, predictive builder selection,
 * bounded parallel execution, and recovery mechanisms.
 * 
 * Phase 3 functionality for Autonomous Mode.
 */

import { PilotIssue } from '../autonomy/pilot-selection'
import { executeAutonomousPilot, ExecutionResult } from '../autonomy/execution-flow'
import { logGovernanceEvent } from '../memory/governance-memory'
import { recordIncident } from '../incidents/recorder'

export interface WaveConfig {
  /** Maximum number of issues to execute in parallel */
  maxParallelIssues: number
  /** Maximum number of issues in a wave */
  maxWaveSize: number
  /** Whether to continue on individual issue failure */
  continueOnFailure: boolean
  /** Timeout per issue in milliseconds */
  issueTimeoutMs: number
}

export interface IssueComplexity {
  issueNumber: number
  complexityScore: number
  estimatedDurationMinutes: number
  recommendedBuilder: 'github-copilot' | 'local-builder'
  riskLevel: 'low' | 'medium' | 'high'
  factors: {
    fileCount: number
    linesOfCodeEstimate: number
    dependencyCount: number
    isArchitecturalChange: boolean
    requiresSchemaChanges: boolean
  }
}

export interface WaveResult {
  waveId: string
  success: boolean
  totalIssues: number
  completedIssues: number
  failedIssues: number
  executionResults: ExecutionResult[]
  startTime: string
  endTime: string
  durationMs: number
  errors: string[]
}

/**
 * Default wave configuration
 */
const DEFAULT_WAVE_CONFIG: WaveConfig = {
  maxParallelIssues: 3,
  maxWaveSize: 10,
  continueOnFailure: true,
  issueTimeoutMs: 30 * 60 * 1000 // 30 minutes
}

/**
 * Calculate complexity score for an issue
 * Returns 0-100, where higher = more complex
 */
export function calculateComplexity(issue: PilotIssue): IssueComplexity {
  let score = 0
  const factors = {
    fileCount: 0,
    linesOfCodeEstimate: 0,
    dependencyCount: 0,
    isArchitecturalChange: false,
    requiresSchemaChanges: false
  }
  
  // Factor 1: Label-based complexity
  if (issue.labels.includes('documentation') || issue.labels.includes('docs')) {
    score += 10
    factors.fileCount = 2
    factors.linesOfCodeEstimate = 100
  }
  
  if (issue.labels.includes('parking-station')) {
    score += 20
    factors.fileCount = 3
    factors.linesOfCodeEstimate = 200
  }
  
  if (issue.labels.includes('governance')) {
    score += 15
    factors.fileCount = 2
    factors.linesOfCodeEstimate = 150
  }
  
  if (issue.labels.includes('enhancement')) {
    score += 30
    factors.fileCount = 5
    factors.linesOfCodeEstimate = 400
  }
  
  if (issue.labels.includes('api')) {
    score += 40
    factors.fileCount = 6
    factors.linesOfCodeEstimate = 500
    factors.dependencyCount = 2
  }
  
  if (issue.labels.includes('schema')) {
    score += 35
    factors.fileCount = 4
    factors.linesOfCodeEstimate = 300
    factors.requiresSchemaChanges = true
  }
  
  if (issue.labels.includes('architecture')) {
    score += 50
    factors.fileCount = 10
    factors.linesOfCodeEstimate = 800
    factors.isArchitecturalChange = true
  }
  
  // Factor 2: Body length as complexity indicator
  const bodyLength = issue.body?.length || 0
  if (bodyLength > 1000) score += 10
  if (bodyLength > 2000) score += 10
  
  // Factor 3: Keywords in title/body
  const text = `${issue.title} ${issue.body}`.toLowerCase()
  if (text.includes('refactor')) score += 20
  if (text.includes('migration')) score += 30
  if (text.includes('breaking change')) score += 40
  
  // Cap at 100
  score = Math.min(score, 100)
  
  // Determine estimated duration
  const estimatedDurationMinutes = Math.ceil((score / 100) * 60) // 0-60 minutes
  
  // Determine recommended builder
  const recommendedBuilder = score > 60 ? 'local-builder' : 'github-copilot'
  
  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high'
  if (score < 30) riskLevel = 'low'
  else if (score < 60) riskLevel = 'medium'
  else riskLevel = 'high'
  
  return {
    issueNumber: issue.number,
    complexityScore: score,
    estimatedDurationMinutes,
    recommendedBuilder,
    riskLevel,
    factors
  }
}

/**
 * Sort issues by complexity (simplest first for quick wins)
 */
export function prioritizeIssues(issues: PilotIssue[]): { issue: PilotIssue; complexity: IssueComplexity }[] {
  const scored = issues.map(issue => ({
    issue,
    complexity: calculateComplexity(issue)
  }))
  
  // Sort by complexity score ascending (simplest first)
  return scored.sort((a, b) => a.complexity.complexityScore - b.complexity.complexityScore)
}

/**
 * Execute issues with bounded parallelism
 */
async function executeBounded(
  owner: string,
  repo: string,
  issues: { issue: PilotIssue; complexity: IssueComplexity }[],
  config: WaveConfig
): Promise<ExecutionResult[]> {
  const results: ExecutionResult[] = []
  const executing: Set<Promise<ExecutionResult>> = new Set()
  
  for (const { issue, complexity } of issues) {
    // Wait if we've hit max parallel limit
    while (executing.size >= config.maxParallelIssues) {
      // Wait for any promise to complete
      const completed = await Promise.race(Array.from(executing))
      results.push(completed)
      
      // Remove all completed promises from the set
      // Since we don't know which exact promise completed, we filter by checking resolution
      for (const promise of Array.from(executing)) {
        promise.then((result) => {
          if (result === completed) {
            executing.delete(promise)
          }
        })
      }
      
      // Give a small delay to allow promise cleanup
      await new Promise(resolve => setTimeout(resolve, 10))
    }
    
    // Start execution with timeout
    const executionPromise = executeWithTimeout(
      executeAutonomousPilot(owner, repo, issue),
      config.issueTimeoutMs,
      issue.number
    )
    
    // Auto-remove from set when complete
    executionPromise.then(() => executing.delete(executionPromise))
    
    executing.add(executionPromise)
  }
  
  // Wait for remaining executions
  const remaining = await Promise.all(Array.from(executing))
  results.push(...remaining)
  
  return results
}

/**
 * Execute with timeout
 */
async function executeWithTimeout(
  promise: Promise<ExecutionResult>,
  timeoutMs: number,
  issueNumber: number
): Promise<ExecutionResult> {
  return Promise.race([
    promise,
    new Promise<ExecutionResult>((_, reject) => 
      setTimeout(() => reject(new Error(`Issue #${issueNumber} execution timeout`)), timeoutMs)
    )
  ]).catch((error: Error) => ({
    success: false,
    issueNumber,
    errors: [error.message],
    warnings: [],
    executionLog: [`[ERROR] ${error.message}`],
    timestamp: new Date().toISOString()
  }))
}

/**
 * Log wave to parking station
 */
async function logWaveToParking(waveResult: WaveResult): Promise<void> {
  const logEntry = {
    waveId: waveResult.waveId,
    timestamp: waveResult.startTime,
    totalIssues: waveResult.totalIssues,
    completedIssues: waveResult.completedIssues,
    failedIssues: waveResult.failedIssues,
    durationMs: waveResult.durationMs,
    success: waveResult.success
  }
  
  console.log('[WaveOrchestrator] Logging to parking station:', logEntry)
  
  // In production, would write to parking station storage
  // For now, just log to governance memory
  await logGovernanceEvent({
    type: 'wave_execution',
    severity: waveResult.success ? 'low' : 'medium',
    description: `Wave ${waveResult.waveId} completed: ${waveResult.completedIssues}/${waveResult.totalIssues} successful`,
    metadata: logEntry
  })
}

/**
 * Execute a wave of issues
 */
export async function executeWave(
  owner: string,
  repo: string,
  issues: PilotIssue[],
  config: Partial<WaveConfig> = {}
): Promise<WaveResult> {
  const waveId = `wave-${Date.now()}`
  const startTime = new Date().toISOString()
  const mergedConfig = { ...DEFAULT_WAVE_CONFIG, ...config }
  
  console.log(`[WaveOrchestrator] Starting wave ${waveId} with ${issues.length} issues`)
  
  // Limit wave size
  const limitedIssues = issues.slice(0, mergedConfig.maxWaveSize)
  
  if (limitedIssues.length < issues.length) {
    console.log(`[WaveOrchestrator] Wave size limited to ${mergedConfig.maxWaveSize} issues`)
  }
  
  // Prioritize by complexity
  const prioritized = prioritizeIssues(limitedIssues)
  
  console.log('[WaveOrchestrator] Issue priorities:')
  prioritized.forEach(({ issue, complexity }) => {
    console.log(`  - Issue #${issue.number}: ${complexity.complexityScore} (${complexity.riskLevel} risk)`)
  })
  
  // Execute with bounded parallelism
  const executionResults = await executeBounded(owner, repo, prioritized, mergedConfig)
  
  const endTime = new Date().toISOString()
  const durationMs = new Date(endTime).getTime() - new Date(startTime).getTime()
  
  // Count results
  const completedIssues = executionResults.filter(r => r.success).length
  const failedIssues = executionResults.filter(r => !r.success).length
  const errors = executionResults
    .filter(r => !r.success)
    .flatMap(r => r.errors || [])
  
  const waveResult: WaveResult = {
    waveId,
    success: failedIssues === 0 || mergedConfig.continueOnFailure,
    totalIssues: limitedIssues.length,
    completedIssues,
    failedIssues,
    executionResults,
    startTime,
    endTime,
    durationMs,
    errors
  }
  
  // Log to parking station
  await logWaveToParking(waveResult)
  
  // Record incidents for failures
  if (failedIssues > 0) {
    await recordIncident({
      type: 'wave_failures',
      severity: failedIssues > limitedIssues.length / 2 ? 'high' : 'medium',
      description: `Wave ${waveId} had ${failedIssues} failures out of ${limitedIssues.length} issues`,
      metadata: {
        waveId,
        failedIssues,
        totalIssues: limitedIssues.length,
        errors
      }
    })
  }
  
  console.log(`[WaveOrchestrator] Wave ${waveId} completed: ${completedIssues}/${limitedIssues.length} successful`)
  
  return waveResult
}

/**
 * Recover from wave failure
 * Retries failed issues one-by-one
 */
export async function recoverFromWaveFailure(
  owner: string,
  repo: string,
  failedResults: ExecutionResult[]
): Promise<WaveResult> {
  const recoveryWaveId = `recovery-${Date.now()}`
  const startTime = new Date().toISOString()
  
  console.log(`[WaveOrchestrator] Starting recovery wave for ${failedResults.length} failed issues`)
  
  const recoveryIssues: PilotIssue[] = failedResults.map(r => ({
    number: r.issueNumber,
    title: `Recovery for issue #${r.issueNumber}`,
    labels: ['recovery', 'autonomy-pilot-1'],
    body: '',
    state: 'open'
  }))
  
  // Execute with stricter config (no parallelism, longer timeout)
  const recoveryConfig: WaveConfig = {
    maxParallelIssues: 1, // One at a time for recovery
    maxWaveSize: failedResults.length,
    continueOnFailure: true,
    issueTimeoutMs: 60 * 60 * 1000 // 1 hour timeout
  }
  
  return executeWave(owner, repo, recoveryIssues, recoveryConfig)
}
