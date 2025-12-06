/**
 * Memory Types
 * Type definitions for Unified Memory Fabric
 */

/**
 * Scope of memory storage
 * - global: System-wide memory (architecture decisions, governance changes)
 * - foreman: Foreman-specific memory (orchestration patterns, builder performance)
 * - project: Project-specific memory (project lifecycle, milestones, deployments)
 */
export type MemoryScope = 'global' | 'foreman' | 'project'

/**
 * Memory entry metadata
 */
export interface MemoryMetadata {
  createdAt: string // ISO 8601 timestamp
  updatedAt: string // ISO 8601 timestamp
  createdBy: string // Agent identifier (e.g., "foreman", "qa-builder")
  version: number // Version number for tracking changes
}

/**
 * Core memory entry structure
 */
export interface MemoryEntry {
  id: string // Unique identifier for the memory entry
  scope: MemoryScope
  key: string // Unique key within scope (e.g., "architecture-decision-001")
  value: any // Memory content (can be any JSON-serializable value)
  metadata: MemoryMetadata
  tags?: string[] // Optional tags for categorization and search
}

/**
 * Context for writing memory entries
 */
export interface MemoryWriteContext {
  scope: MemoryScope
  key: string
  value: any
  tags?: string[]
  createdBy: string
  organisationId?: string // For multi-tenant support
  projectId?: string // For project-scoped memory
}

/**
 * Context for reading memory entries
 */
export interface MemoryReadContext {
  scope: MemoryScope
  key?: string // Optional - if not provided, returns all entries in scope
  tags?: string[] // Optional - filter by tags
  organisationId?: string // For multi-tenant support
  projectId?: string // For project-scoped memory
}

/**
 * Memory query result
 */
export interface MemoryQueryResult {
  entries: MemoryEntry[]
  total: number
  scope: MemoryScope
}

/**
 * Storage backend configuration
 */
export interface MemoryStorageConfig {
  basePath: string // Base path for JSON storage (e.g., "/memory")
  enableVersionControl: boolean // Whether to track versions in git
  maxEntriesPerFile: number // Maximum entries per JSON file
}

/**
 * Memory event types for tracking changes
 */
export type MemoryEventType =
  | 'architecture_decision'
  | 'wave_completion'
  | 'deployment'
  | 'qa_failure'
  | 'builder_task_completion'
  | 'governance_change'
  | 'error_escalation'
  | 'milestone_completion'
  | 'project_state_transition'

/**
 * Memory event for major system events
 */
export interface MemoryEvent {
  type: MemoryEventType
  scope: MemoryScope
  description: string
  data: any
  timestamp: string // ISO 8601 timestamp
  createdBy: string
}
