/**
 * Knowledge Retirement Types
 * Type definitions for Memory Lifecycle Governance System
 * 
 * Implements lifecycle states for long-term memory management:
 * - Active Memory: Used by reasoning engine
 * - Consolidated Knowledge: Evergreen knowledge from Issue #9
 * - Archival Memory: Historically important but not actively used
 * - Deprecated Memory: Contradicted or superseded knowledge
 */

import { MemoryEntry, MemoryScope } from './memory'
import { KnowledgeBlock } from './consolidation'

/**
 * Memory Lifecycle State Classification
 */
export type MemoryLifecycleState =
  | 'active'        // Used by reasoning engine
  | 'consolidated'  // Extracted evergreen knowledge
  | 'archival'      // Historically important, not actively used
  | 'deprecated'    // Contradicted or superseded

/**
 * Retirement Reason Classification
 */
export type RetirementReason =
  | 'staleness'           // Memory too old
  | 'supersession'        // Replaced by consolidated knowledge
  | 'obsolescence'        // References removed modules/features
  | 'contradiction'       // Conflicts with other memory
  | 'consolidation'       // Merged into knowledge block
  | 'manual_review'       // Flagged for human review

/**
 * Retirement Severity
 */
export type RetirementSeverity =
  | 'low'      // Can be retired automatically
  | 'medium'   // Should be reviewed
  | 'high'     // Requires manual approval
  | 'critical' // Must be reviewed by human

/**
 * Archival Entry - Full snapshot of retired memory
 */
export interface ArchivedEntry {
  originalEntry: MemoryEntry
  retirementInfo: RetirementInfo
  archivedAt: string // ISO 8601 timestamp
  archiveVersion: number // Version for tracking changes
}

/**
 * Retirement Information
 */
export interface RetirementInfo {
  reason: RetirementReason
  severity: RetirementSeverity
  lifecycle: MemoryLifecycleState
  explanation: string
  supersededBy?: string // ID of knowledge block or newer entry
  contradictedBy?: string[] // IDs of conflicting entries
  obsoleteReferences?: string[] // Removed modules/features
  manualReviewRequired: boolean
  reviewedBy?: string // Human reviewer
  reviewedAt?: string // ISO 8601 timestamp
}

/**
 * Retirement Candidate - Entry eligible for retirement
 */
export interface RetirementCandidate {
  entry: MemoryEntry
  reason: RetirementReason
  severity: RetirementSeverity
  score: number // 0-100 retirement confidence score
  explanation: string
  recommendedAction: 'retire' | 'archive' | 'deprecate' | 'review'
  metadata: {
    ageInDays: number
    lastAccessed?: string
    usageCount?: number
    conflictCount?: number
    obsoleteReferences?: string[]
  }
}

/**
 * Retirement Report
 */
export interface RetirementReport {
  timestamp: string
  totalEntriesEvaluated: number
  candidatesIdentified: number
  entriesRetired: number
  entriesArchived: number
  entriesDeprecated: number
  entriesFlaggedForReview: number
  candidates: RetirementCandidate[]
  retirements: ArchivedEntry[]
  summary: string
  driftImpact?: {
    contradictionsResolved: number
    stalenessReduced: number
    redundancyEliminated: number
  }
}

/**
 * Retirement Configuration
 */
export interface RetirementConfig {
  // Staleness thresholds (in days)
  stalenessThresholds: {
    reasoningPatterns: number
    architectureLessons: number
    issues: number
    projectMemory: number
    generalMemory: number
  }
  
  // Retirement behavior
  autoRetireStale: boolean
  autoRetireSuperseded: boolean
  autoRetireObsolete: boolean
  autoRetireConflicting: boolean
  
  // Review requirements
  requireManualReviewForHigh: boolean
  requireManualReviewForCritical: boolean
  
  // Archival settings
  enableArchival: boolean
  archivalRetentionYears: number
  
  // Consolidation integration
  retireWhenConsolidated: boolean
  minConsolidationConfidence: number
  
  // Drift integration
  resolveConflictsOnRetirement: boolean
}

/**
 * Retirement Event - For governance event logging
 */
export interface RetirementEvent {
  type: 'retirement' | 'archival' | 'deprecation' | 'restoration'
  entryId: string
  scope: MemoryScope
  reason: RetirementReason
  lifecycle: MemoryLifecycleState
  timestamp: string
  actor: string // 'retirement-engine' or human username
  metadata: {
    previousState: MemoryLifecycleState
    newState: MemoryLifecycleState
    archiveLocation?: string
    supersededBy?: string
    reviewRequired: boolean
  }
}

/**
 * Retirement Marker - Inserted into original dataset
 */
export interface RetirementMarker {
  retired: true
  retiredAt: string
  reason: RetirementReason
  lifecycle: MemoryLifecycleState
  archiveLocation: string
  supersededBy?: string
  consolidatedInto?: string
  manualReviewRequired: boolean
}

/**
 * Restoration Request - For bringing memory back to active
 */
export interface RestorationRequest {
  archiveId: string
  reason: string
  requestedBy: string
  targetState: MemoryLifecycleState
}

/**
 * Restoration Result
 */
export interface RestorationResult {
  success: boolean
  entry?: MemoryEntry
  error?: string
  restoredFrom: string
  restoredAt: string
}

/**
 * Retirement Statistics
 */
export interface RetirementStatistics {
  totalActive: number
  totalArchived: number
  totalDeprecated: number
  totalConsolidated: number
  
  retirementsByReason: Record<RetirementReason, number>
  retirementsByScope: Record<MemoryScope, number>
  
  averageAgeAtRetirement: number // Days
  oldestActiveEntry: number // Days
  
  storageReduction: {
    beforeBytes: number
    afterBytes: number
    reductionPercentage: number
  }
  
  lastRetirementRun: string
  nextScheduledRun?: string
}
