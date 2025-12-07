/**
 * Builder Feedback Types
 * Structured feedback from builder agents back to Foreman
 * 
 * Part of Issue #14: Multi-Agent Reasoning Feedback Loop
 * Enables builders to provide insights that improve reasoning, memory, and governance
 */

/**
 * Builder feedback data model
 * Emitted by builders after task completion to inform Foreman's learning
 */
export interface BuilderFeedback {
  /** Unique task identifier this feedback relates to */
  taskId: string
  
  /** Builder that generated this feedback */
  builder: 'local' | 'copilot'
  
  /** Difficulty score from 0 (trivial) to 1 (extremely difficult) */
  difficultyScore: number
  
  /** Optional reasoning path the builder followed */
  reasoningPath?: string
  
  /** List of failures encountered during task execution */
  failures?: string[]
  
  /** Areas of uncertainty the builder experienced */
  uncertainties?: string[]
  
  /** Suggestions for improvement from the builder's perspective */
  improvementsSuggested?: string[]
  
  /** Memory context that was missing or would have been helpful */
  missingMemoryDetected?: string[]
  
  /** Governance rules that conflicted or were unclear */
  governanceConflicts?: string[]
  
  /** New knowledge that could be added to memory */
  newKnowledgeCandidates?: string[]
  
  /** ISO 8601 timestamp when feedback was generated */
  timestamp: string
}

/**
 * Feedback validation result
 */
export interface FeedbackValidationResult {
  valid: boolean
  errors?: string[]
  warnings?: string[]
}

/**
 * Aggregated feedback metrics for analytics
 */
export interface FeedbackMetrics {
  totalFeedbackCount: number
  averageDifficulty: number
  commonFailures: Map<string, number>
  commonUncertainties: Map<string, number>
  governanceConflictRate: number
  missingMemoryRate: number
  builderBreakdown: {
    local: number
    copilot: number
  }
  timeRange: {
    from: string
    to: string
  }
}

/**
 * Feedback processing result
 */
export interface FeedbackProcessingResult {
  feedbackId: string
  processed: boolean
  patternsDetected: string[]
  driftIssuesIdentified: number
  memoryUpdates: number
  evolutionTriggered: boolean
  consolidationTriggered: boolean
  errors?: string[]
  timestamp: string
}
