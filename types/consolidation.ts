/**
 * Knowledge Consolidation Types
 * Type definitions for Automated Knowledge Consolidation Layer
 */

import { MemoryEntry, MemoryScope } from './memory'

/**
 * Knowledge block category classification
 */
export type KnowledgeCategory =
  | 'architecture_principle'
  | 'qa_pattern'
  | 'deployment_lesson'
  | 'governance_behaviour'
  | 'build_pattern'
  | 'error_resolution'
  | 'performance_insight'
  | 'consolidated_reasoning_patterns' // New: evolved reasoning patterns

/**
 * Knowledge block importance level
 */
export type KnowledgeImportance = 'low' | 'medium' | 'high' | 'critical'

/**
 * Knowledge Block - consolidated, evergreen knowledge
 */
export interface KnowledgeBlock {
  id: string
  category: KnowledgeCategory
  summary: string
  lesson: string
  appliesTo: string[] // Projects or components
  originEntries: string[] // IDs of source memory entries
  governanceLinks: string[] // Links to governance documents
  confidence: number // 0-1 confidence score
  importance: KnowledgeImportance
  timestamp: string // ISO 8601
  lastValidated?: string // ISO 8601
  metadata?: {
    consolidatedFrom: number // Number of source entries
    firstSeen: string // ISO 8601
    validationCount: number
  }
}

/**
 * Entry significance score result
 */
export interface SignificanceScore {
  entryId: string
  score: number // 0-100
  factors: {
    frequency: number // Pattern occurrence count
    severity: number // Related issue severity
    projectCount: number // Number of affected projects
    governanceRelevance: number // Alignment with governance
    recurrence: number // Recurrence across build waves
    driftRisk: number // Risk of causing drift
  }
  classification: 'high' | 'medium' | 'low'
  recommendation: 'consolidate' | 'keep' | 'archive' | 'delete'
}

/**
 * Pattern detection result
 */
export interface PatternDetectionResult {
  pattern: string
  description: string
  occurrences: number
  entries: string[] // Entry IDs
  confidence: number // 0-1
  category: KnowledgeCategory
}

/**
 * Duplicate collapse result
 */
export interface DuplicateCollapseResult {
  keptEntry: string
  collapsedEntries: string[]
  reason: string
  newKnowledgeBlock?: KnowledgeBlock
}

/**
 * Consolidation Candidate - Entry eligible for consolidation
 */
export interface ConsolidationCandidate {
  entries: MemoryEntry[]
  pattern: string
  category: KnowledgeCategory
  confidence: number // 0-1
  significance: number // 0-100
  recommendedAction: 'consolidate' | 'archive' | 'keep'
}

/**
 * Consolidation Decision - Action to take on candidates
 */
export interface ConsolidationDecision {
  candidateId: string
  action: 'consolidate' | 'archive' | 'keep' | 'review'
  knowledgeBlockId?: string
  confidence: number // 0-1
  executedAt?: string
}

/**
 * Consolidation run result
 */
export interface ConsolidationResult {
  blocksGenerated: number
  entriesArchived: number
  duplicatesCollapsed: number
  knowledgeBlocks: KnowledgeBlock[]
  archivedEntries: string[]
  timestamp: string
  summary: string
}

/**
 * Consolidation configuration
 */
export interface ConsolidationConfig {
  minConfidence: number // Minimum confidence to generate knowledge block
  minOccurrences: number // Minimum pattern occurrences
  significanceThreshold: number // Minimum significance score
  maxAgeForArchival: number // Days before entry is archivable
  enableArchival: boolean
  enableDuplicateCollapse: boolean
  scopes: MemoryScope[] // Scopes to consolidate
}

/**
 * Consolidation trigger conditions
 */
export interface ConsolidationTrigger {
  type: 'entry_count' | 'phase_transition' | 'wave_completion' | 'deployment' | 'scheduled' | 'manual'
  threshold?: number
  projectId?: string
}

/**
 * Archived entry reference
 */
export interface ArchivedEntryReference {
  originalId: string
  archivedAt: string
  reason: string
  consolidatedInto?: string // Knowledge block ID
  retentionUntil?: string // When to permanently delete
}

/**
 * Consolidation Candidate - Entries eligible for consolidation
 */
export interface ConsolidationCandidate {
  entries: string[] // Entry IDs
  commonality: number // 0-100 similarity score
  proposedKnowledge: string
  category: KnowledgeCategory
  importance: KnowledgeImportance
}

/**
 * Consolidation Decision - Decision made about a candidate
 */
export interface ConsolidationDecision {
  candidateId: string
  action: 'consolidate' | 'skip' | 'manual_review'
  reason: string
  knowledgeBlockId?: string
  approvedBy?: string
  approvedAt?: string
}
