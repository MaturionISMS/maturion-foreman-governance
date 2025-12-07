/**
 * Builder Feedback Processor
 * Processes feedback from builders to improve reasoning, memory, and governance
 * 
 * Part of Issue #14: Multi-Agent Reasoning Feedback Loop
 * 
 * Capabilities:
 * - Parse and validate builder feedback
 * - Detect repeated failure patterns
 * - Identify missing memory context
 * - Detect governance violations
 * - Extract new lesson candidates
 * - Score builder effectiveness
 * - Pass results to Drift Monitor, Consolidation Engine, Evolution Engine
 */

import fs from 'fs'
import path from 'path'
import {
  BuilderFeedback,
  FeedbackValidationResult,
  FeedbackProcessingResult
} from '@/types/builder-feedback'
import { DriftIssue } from '@/types/drift'
import { writeMemory } from '@/lib/foreman/memory/storage'
import { runDriftMonitoring } from '@/lib/foreman/memory/drift-monitor'

/**
 * Feedback history storage path
 */
const FEEDBACK_HISTORY_PATH = path.join(
  process.cwd(),
  'memory',
  'global',
  'builder-feedback-history.json'
)

/**
 * Feedback pattern detection thresholds
 */
const PATTERN_THRESHOLDS = {
  MIN_OCCURRENCES: 3, // Minimum occurrences to consider a pattern
  DIFFICULTY_THRESHOLD: 0.7, // Difficulty score threshold for concern
  GOVERNANCE_CONFLICT_THRESHOLD: 2, // Number of conflicts before escalation
  MISSING_MEMORY_THRESHOLD: 3 // Number of missing memory mentions before action
}

/**
 * Validate builder feedback structure
 */
export function validateFeedback(feedback: BuilderFeedback): FeedbackValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Required fields
  if (!feedback.taskId) errors.push('taskId is required')
  if (!feedback.builder) errors.push('builder is required')
  if (!['local', 'copilot'].includes(feedback.builder)) {
    errors.push('builder must be "local" or "copilot"')
  }
  if (typeof feedback.difficultyScore !== 'number') {
    errors.push('difficultyScore must be a number')
  } else if (feedback.difficultyScore < 0 || feedback.difficultyScore > 1) {
    errors.push('difficultyScore must be between 0 and 1')
  }
  if (!feedback.timestamp) errors.push('timestamp is required')

  // Validate timestamp format
  if (feedback.timestamp) {
    try {
      new Date(feedback.timestamp).toISOString()
    } catch {
      errors.push('timestamp must be valid ISO 8601 format')
    }
  }

  // Warnings for high difficulty without context
  if (feedback.difficultyScore > PATTERN_THRESHOLDS.DIFFICULTY_THRESHOLD) {
    if (!feedback.failures?.length && !feedback.uncertainties?.length) {
      warnings.push('High difficulty score without failures or uncertainties specified')
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined
  }
}

/**
 * Process builder feedback
 * Main entry point for feedback processing pipeline
 */
export async function processFeedback(
  feedback: BuilderFeedback
): Promise<FeedbackProcessingResult> {
  const result: FeedbackProcessingResult = {
    feedbackId: `fb_${Date.now()}_${feedback.taskId}`,
    processed: false,
    patternsDetected: [],
    driftIssuesIdentified: 0,
    memoryUpdates: 0,
    evolutionTriggered: false,
    consolidationTriggered: false,
    timestamp: new Date().toISOString()
  }

  try {
    // 1. Validate feedback
    const validation = validateFeedback(feedback)
    if (!validation.valid) {
      result.errors = validation.errors
      return result
    }

    // 2. Store feedback in history
    await storeFeedbackInHistory(feedback)
    result.memoryUpdates++

    // 3. Detect patterns
    const patterns = await detectPatterns(feedback)
    result.patternsDetected = patterns

    // 4. Check for agent-experience drift
    const driftIssues = await checkAgentExperienceDrift(feedback)
    result.driftIssuesIdentified = driftIssues.length

    // 5. Extract new knowledge candidates
    if (feedback.newKnowledgeCandidates?.length) {
      await extractKnowledgeCandidates(feedback)
      result.consolidationTriggered = true
    }

    // 6. Update governance if conflicts detected
    if (feedback.governanceConflicts?.length) {
      await recordGovernanceConflicts(feedback)
    }

    // 7. Trigger evolution if patterns warrant it
    if (patterns.length > 0) {
      result.evolutionTriggered = true
    }

    result.processed = true
  } catch (error) {
    result.errors = [error instanceof Error ? error.message : 'Unknown error']
  }

  return result
}

/**
 * Store feedback in persistent history
 */
async function storeFeedbackInHistory(feedback: BuilderFeedback): Promise<void> {
  // Ensure directory exists
  const dir = path.dirname(FEEDBACK_HISTORY_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Load existing history
  let history: BuilderFeedback[] = []
  if (fs.existsSync(FEEDBACK_HISTORY_PATH)) {
    const content = fs.readFileSync(FEEDBACK_HISTORY_PATH, 'utf-8')
    history = JSON.parse(content)
  }

  // Add new feedback
  history.push(feedback)

  // Keep only last 1000 feedback entries to prevent unbounded growth
  if (history.length > 1000) {
    history = history.slice(-1000)
  }

  // Write back
  fs.writeFileSync(FEEDBACK_HISTORY_PATH, JSON.stringify(history, null, 2))
}

/**
 * Detect patterns in feedback
 */
async function detectPatterns(feedback: BuilderFeedback): Promise<string[]> {
  const patterns: string[] = []

  // Load recent feedback history
  const recentFeedback = await getRecentFeedback(30) // Last 30 days

  // Pattern 1: Repeated failures
  if (feedback.failures?.length) {
    const failurePatterns = detectRepeatedFailures(feedback.failures, recentFeedback)
    patterns.push(...failurePatterns)
  }

  // Pattern 2: Repeated uncertainties
  if (feedback.uncertainties?.length) {
    const uncertaintyPatterns = detectRepeatedUncertainties(
      feedback.uncertainties,
      recentFeedback
    )
    patterns.push(...uncertaintyPatterns)
  }

  // Pattern 3: Missing memory patterns
  if (feedback.missingMemoryDetected?.length) {
    const memoryPatterns = detectMissingMemoryPatterns(
      feedback.missingMemoryDetected,
      recentFeedback
    )
    patterns.push(...memoryPatterns)
  }

  // Pattern 4: Governance conflicts
  if (feedback.governanceConflicts?.length) {
    patterns.push('governance_conflict_detected')
  }

  // Pattern 5: High difficulty without clear reason
  if (feedback.difficultyScore > PATTERN_THRESHOLDS.DIFFICULTY_THRESHOLD) {
    if (!feedback.failures?.length && !feedback.uncertainties?.length) {
      patterns.push('unexplained_high_difficulty')
    }
  }

  return patterns
}

/**
 * Check for agent-experience drift
 */
async function checkAgentExperienceDrift(
  feedback: BuilderFeedback
): Promise<DriftIssue[]> {
  const driftIssues: DriftIssue[] = []
  const recentFeedback = await getRecentFeedback(30)

  // Check for repeated missing memory
  if (feedback.missingMemoryDetected?.length) {
    const missingMemoryCount = recentFeedback.filter(
      (f) => f.missingMemoryDetected && f.missingMemoryDetected.length > 0
    ).length

    if (missingMemoryCount >= PATTERN_THRESHOLDS.MISSING_MEMORY_THRESHOLD) {
      driftIssues.push({
        type: 'agent_experience_drift',
        severity: 'warning',
        description: `Builders repeatedly reporting missing memory context (${missingMemoryCount} times in 30 days)`,
        location: 'memory/global',
        details: {
          occurrences: missingMemoryCount,
          missingContext: feedback.missingMemoryDetected
        },
        recommendation: 'Review and enhance memory fabric with commonly needed context',
        timestamp: new Date().toISOString()
      })
    }
  }

  // Check for repeated governance conflicts
  if (feedback.governanceConflicts?.length) {
    const conflictCount = recentFeedback.filter(
      (f) => f.governanceConflicts && f.governanceConflicts.length > 0
    ).length

    if (conflictCount >= PATTERN_THRESHOLDS.GOVERNANCE_CONFLICT_THRESHOLD) {
      driftIssues.push({
        type: 'agent_experience_drift',
        severity: 'error',
        description: `Builders repeatedly encountering governance conflicts (${conflictCount} times in 30 days)`,
        location: 'foreman/governance',
        details: {
          occurrences: conflictCount,
          conflicts: feedback.governanceConflicts
        },
        recommendation: 'Review and clarify governance rules to resolve conflicts',
        timestamp: new Date().toISOString()
      })
    }
  }

  // Check for consistently high difficulty
  const highDifficultyCount = recentFeedback.filter(
    (f) => f.difficultyScore > PATTERN_THRESHOLDS.DIFFICULTY_THRESHOLD
  ).length

  if (highDifficultyCount > recentFeedback.length * 0.5) {
    driftIssues.push({
      type: 'agent_experience_drift',
      severity: 'warning',
      description: `Over 50% of recent tasks rated high difficulty (${highDifficultyCount}/${recentFeedback.length})`,
      location: 'reasoning/patterns',
      details: {
        highDifficultyRate: highDifficultyCount / recentFeedback.length,
        totalTasks: recentFeedback.length
      },
      recommendation: 'Review reasoning patterns and task allocation strategies',
      timestamp: new Date().toISOString()
    })
  }

  return driftIssues
}

/**
 * Extract knowledge candidates from feedback
 */
async function extractKnowledgeCandidates(feedback: BuilderFeedback): Promise<void> {
  if (!feedback.newKnowledgeCandidates?.length) return

  // Store knowledge candidates for consolidation engine
  const candidatesPath = path.join(
    process.cwd(),
    'memory',
    'global',
    'knowledge-candidates.json'
  )

  const dir = path.dirname(candidatesPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  let candidates: any[] = []
  if (fs.existsSync(candidatesPath)) {
    candidates = JSON.parse(fs.readFileSync(candidatesPath, 'utf-8'))
  }

  candidates.push({
    source: 'builder_feedback',
    taskId: feedback.taskId,
    builder: feedback.builder,
    candidates: feedback.newKnowledgeCandidates,
    timestamp: feedback.timestamp
  })

  // Keep only last 500 candidates
  if (candidates.length > 500) {
    candidates = candidates.slice(-500)
  }

  fs.writeFileSync(candidatesPath, JSON.stringify(candidates, null, 2))
}

/**
 * Record governance conflicts for review
 */
async function recordGovernanceConflicts(feedback: BuilderFeedback): Promise<void> {
  if (!feedback.governanceConflicts?.length) return

  const conflictsPath = path.join(
    process.cwd(),
    'memory',
    'global',
    'governance-conflicts.json'
  )

  const dir = path.dirname(conflictsPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  let conflicts: any[] = []
  if (fs.existsSync(conflictsPath)) {
    conflicts = JSON.parse(fs.readFileSync(conflictsPath, 'utf-8'))
  }

  conflicts.push({
    taskId: feedback.taskId,
    builder: feedback.builder,
    conflicts: feedback.governanceConflicts,
    timestamp: feedback.timestamp
  })

  // Keep only last 200 conflicts
  if (conflicts.length > 200) {
    conflicts = conflicts.slice(-200)
  }

  fs.writeFileSync(conflictsPath, JSON.stringify(conflicts, null, 2))
}

/**
 * Get recent feedback within specified days
 */
async function getRecentFeedback(days: number): Promise<BuilderFeedback[]> {
  if (!fs.existsSync(FEEDBACK_HISTORY_PATH)) {
    return []
  }

  const history: BuilderFeedback[] = JSON.parse(
    fs.readFileSync(FEEDBACK_HISTORY_PATH, 'utf-8')
  )

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return history.filter((f) => new Date(f.timestamp) >= cutoffDate)
}

/**
 * Detect repeated failures
 */
function detectRepeatedFailures(
  failures: string[],
  recentFeedback: BuilderFeedback[]
): string[] {
  const patterns: string[] = []
  const failureCounts = new Map<string, number>()

  // Count failures in recent history
  recentFeedback.forEach((f) => {
    f.failures?.forEach((failure) => {
      failureCounts.set(failure, (failureCounts.get(failure) || 0) + 1)
    })
  })

  // Check current failures
  failures.forEach((failure) => {
    const count = (failureCounts.get(failure) || 0) + 1
    if (count >= PATTERN_THRESHOLDS.MIN_OCCURRENCES) {
      patterns.push(`repeated_failure:${failure}`)
    }
  })

  return patterns
}

/**
 * Detect repeated uncertainties
 */
function detectRepeatedUncertainties(
  uncertainties: string[],
  recentFeedback: BuilderFeedback[]
): string[] {
  const patterns: string[] = []
  const uncertaintyCounts = new Map<string, number>()

  // Count uncertainties in recent history
  recentFeedback.forEach((f) => {
    f.uncertainties?.forEach((uncertainty) => {
      uncertaintyCounts.set(uncertainty, (uncertaintyCounts.get(uncertainty) || 0) + 1)
    })
  })

  // Check current uncertainties
  uncertainties.forEach((uncertainty) => {
    const count = (uncertaintyCounts.get(uncertainty) || 0) + 1
    if (count >= PATTERN_THRESHOLDS.MIN_OCCURRENCES) {
      patterns.push(`repeated_uncertainty:${uncertainty}`)
    }
  })

  return patterns
}

/**
 * Detect missing memory patterns
 */
function detectMissingMemoryPatterns(
  missingMemory: string[],
  recentFeedback: BuilderFeedback[]
): string[] {
  const patterns: string[] = []
  const memoryCounts = new Map<string, number>()

  // Count missing memory in recent history
  recentFeedback.forEach((f) => {
    f.missingMemoryDetected?.forEach((memory) => {
      memoryCounts.set(memory, (memoryCounts.get(memory) || 0) + 1)
    })
  })

  // Check current missing memory
  missingMemory.forEach((memory) => {
    const count = (memoryCounts.get(memory) || 0) + 1
    if (count >= PATTERN_THRESHOLDS.MIN_OCCURRENCES) {
      patterns.push(`missing_memory:${memory}`)
    }
  })

  return patterns
}

/**
 * Get feedback statistics
 */
export async function getFeedbackStatistics(days: number = 30) {
  const recentFeedback = await getRecentFeedback(days)

  if (recentFeedback.length === 0) {
    return {
      totalCount: 0,
      averageDifficulty: 0,
      builderBreakdown: { local: 0, copilot: 0 },
      topFailures: [],
      topUncertainties: [],
      governanceConflictRate: 0,
      missingMemoryRate: 0
    }
  }

  // Calculate statistics
  const totalDifficulty = recentFeedback.reduce((sum, f) => sum + f.difficultyScore, 0)
  const builderCounts = { local: 0, copilot: 0 }
  const failureCounts = new Map<string, number>()
  const uncertaintyCounts = new Map<string, number>()
  let governanceConflictCount = 0
  let missingMemoryCount = 0

  recentFeedback.forEach((f) => {
    builderCounts[f.builder]++
    
    if (f.governanceConflicts?.length) governanceConflictCount++
    if (f.missingMemoryDetected?.length) missingMemoryCount++
    
    f.failures?.forEach((failure) => {
      failureCounts.set(failure, (failureCounts.get(failure) || 0) + 1)
    })
    
    f.uncertainties?.forEach((uncertainty) => {
      uncertaintyCounts.set(uncertainty, (uncertaintyCounts.get(uncertainty) || 0) + 1)
    })
  })

  // Top failures and uncertainties
  const topFailures = Array.from(failureCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([failure, count]) => ({ failure, count }))

  const topUncertainties = Array.from(uncertaintyCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([uncertainty, count]) => ({ uncertainty, count }))

  return {
    totalCount: recentFeedback.length,
    averageDifficulty: totalDifficulty / recentFeedback.length,
    builderBreakdown: builderCounts,
    topFailures,
    topUncertainties,
    governanceConflictRate: governanceConflictCount / recentFeedback.length,
    missingMemoryRate: missingMemoryCount / recentFeedback.length
  }
}
