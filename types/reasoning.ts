/**
 * Reasoning Engine Types
 * Type definitions for Memory-Aware Reasoning Engine (MARE)
 */

import { MemoryEntry, MemoryScope } from './memory'

/**
 * Project Memory - project-specific context
 */
export interface ProjectMemory {
  projectId: string
  phase: 'concept' | 'architecture' | 'build' | 'deployment' | 'completed' | 'archived'
  milestones: MilestoneMemory[]
  deployments: DeploymentMemory[]
  blockers: BlockerMemory[]
  decisions: DecisionMemory[]
}

export interface MilestoneMemory {
  id: string
  name: string
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  completedAt?: string
  blockers?: string[]
}

export interface DeploymentMemory {
  environment: string
  timestamp: string
  version?: string
  success: boolean
  issues?: string[]
}

export interface BlockerMemory {
  id: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'resolved'
  category?: 'technical' | 'approval' | 'external' | 'resource'
}

export interface DecisionMemory {
  id: string
  description: string
  rationale: string
  timestamp: string
  createdBy: string
}

/**
 * Global Memory - system-wide context
 */
export interface GlobalMemory {
  architectureDecisions: ArchitectureLesson[]
  governanceRules: GovernanceMemory[]
  systemPatterns: string[]
}

export interface GovernanceMemory {
  id: string
  rule: string
  description: string
  enforcement: 'strict' | 'advisory' | 'deprecated'
}

/**
 * Reasoning Pattern - learned decision-making patterns
 */
export interface ReasoningPattern {
  id: string
  name: string
  description: string
  context: string // When to apply this pattern
  approach: string // How to apply this pattern
  examples: string[]
  tags: string[]
  successRate?: number
  usageCount?: number
}

/**
 * Architecture Lesson - learned from past architectural decisions
 */
export interface ArchitectureLesson {
  id: string
  pattern: string
  description: string
  rationale: string
  benefits: string[]
  tradeoffs: string[]
  applicability: string[] // Which contexts this applies to
  timestamp: string
  source: string // Where this lesson came from
}

/**
 * Historical Issue - past issues and their resolutions
 */
export interface HistoricalIssue {
  id: string
  type: string
  description: string
  resolution: string
  timestamp: string
  scope: MemoryScope
  tags: string[]
}

/**
 * Memory Snapshot - consolidated memory context
 */
export interface MemorySnapshot {
  project: ProjectMemory | null
  global: GlobalMemory
  reasoningPatterns: ReasoningPattern[]
  architectureLessons: ArchitectureLesson[]
  issues: HistoricalIssue[]
  meta: {
    loadedAt: string
    memoryVersion: string
    scope: MemoryScope[]
  }
}

/**
 * Reasoning Context - input to reasoning engine
 */
export interface ReasoningContext {
  intent?: string // User intent or command
  phase?: 'concept' | 'architecture' | 'build' | 'deployment' | 'qa' | 'planning'
  subsystem?: 'architecture' | 'build' | 'qa' | 'deployment' | 'orchestration'
  riskLevel?: 'low' | 'medium' | 'high' | 'critical'
  tags?: string[]
  projectId?: string
  organisationId?: string
}

/**
 * Decision - a decision made by the reasoning engine
 */
export interface ReasoningDecision {
  action: string
  rationale: string
  confidence: 'low' | 'medium' | 'high'
  memorySupport: string[] // References to memory entries that support this decision
  governanceAlignment: boolean
  risks?: string[]
}

/**
 * Reasoning Result - output from reasoning engine
 */
export interface ReasoningResult {
  reasoningSummary: string
  memoryReferences: string[] // IDs of memory entries used
  decisions: ReasoningDecision[]
  risks: string[]
  recommendedActions: string[]
  meta: {
    executedAt: string
    patternsApplied: string[]
    confidenceScore: number // 0-1
  }
}

/**
 * Memory Router Filter - filtering criteria for memory selection
 */
export interface MemoryRouterFilter {
  scope?: MemoryScope[]
  tags?: string[]
  intent?: string
  phase?: string
  subsystem?: string
  riskLevel?: string
  maxResults?: number
}

/**
 * Memory Router Result - filtered memory entries
 */
export interface MemoryRouterResult {
  entries: MemoryEntry[]
  total: number
  relevanceScores?: Map<string, number>
  filteringReason: string
}
