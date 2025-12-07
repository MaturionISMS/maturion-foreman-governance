/**
 * Memory Drift Monitor Types
 * Type definitions for Unified Memory Fabric Stability System
 */

import { MemoryEntry, MemoryScope } from './memory'

/**
 * Drift Type Classification
 */
export type DriftType =
  | 'schema_drift'          // Memory structure mismatch
  | 'version_drift'         // Memory version mismatch
  | 'contradiction_drift'   // Conflicting entries
  | 'staleness_drift'       // Memory too old to rely on
  | 'cross_agent_drift'     // Foreman App ≠ GitHub Foreman ≠ Local Builder
  | 'project_drift'         // Project memory missing required files
  | 'pattern_drift'         // Reasoning patterns diverge from governance
  | 'governance_drift'      // Memory contradicts governance rules
  | 'agent_experience_drift' // Builder repeatedly struggles with missing memory/conflicts

/**
 * Drift Severity Classification
 */
export type DriftSeverity =
  | 'info'      // Informational only
  | 'warning'   // Should be reviewed
  | 'error'     // Needs attention
  | 'critical'  // Execution must halt

/**
 * Detailed drift issue
 */
export interface DriftIssue {
  type: DriftType
  severity: DriftSeverity
  description: string
  location: string // File path or memory key
  details: any // Type-specific details
  recommendation: string // Corrective action
  affectedEntries?: string[] // IDs of affected memory entries
  timestamp: string
}

/**
 * Drift check result for a specific category
 */
export interface DriftCheckResult {
  category: DriftType
  passed: boolean
  issues: DriftIssue[]
  checkedAt: string
  metadata?: any
}

/**
 * Complete drift report
 */
export interface DriftReport {
  overallStatus: 'healthy' | 'warning' | 'error' | 'critical'
  totalIssues: number
  criticalCount: number
  errorCount: number
  warningCount: number
  infoCount: number
  checks: DriftCheckResult[]
  executionBlocked: boolean
  recommendations: string[]
  summary: string
  generatedAt: string
  memoryVersion: string
  scopes: MemoryScope[]
}

/**
 * Drift monitoring configuration
 */
export interface DriftMonitorConfig {
  enabledChecks: DriftType[]
  stalenessThresholds: {
    reasoningPatterns: number // Days
    architectureLessons: number // Days
    issues: number // Days
    projectMemory: number // Days
  }
  blockOnCritical: boolean
  blockOnMultipleErrors: boolean
  errorThreshold: number
}

/**
 * Schema validation configuration
 */
export interface SchemaValidationConfig {
  schemaPath: string
  required: boolean
}

/**
 * Cross-agent memory comparison
 */
export interface CrossAgentMemoryState {
  agent: string // 'foreman-app' | 'github-foreman' | 'local-builder'
  scope: MemoryScope
  entryCount: number
  lastUpdated: string
  version: string
  checksum?: string
}

/**
 * Contradiction detection context
 */
export interface ContradictionContext {
  entry1: MemoryEntry
  entry2: MemoryEntry
  contradictionType: 'direct' | 'implicit' | 'governance'
  confidence: 'low' | 'medium' | 'high'
  explanation: string
}

/**
 * Governance rule reference
 */
export interface GovernanceRule {
  id: string
  rule: string
  source: string // File path in /foreman/governance
  enforcement: 'strict' | 'advisory' | 'deprecated'
}

/**
 * Drift Entry - Record of detected drift
 */
export interface DriftEntry {
  id: string
  type: DriftType
  severity: DriftSeverity
  description: string
  detectedAt: string
  resolvedAt?: string
  status: 'open' | 'resolved' | 'acknowledged'
  affectedEntries: string[]
}

/**
 * Memory integrity snapshot
 */
export interface MemoryIntegritySnapshot {
  scopes: {
    global: { entryCount: number; lastUpdated: string }
    foreman: { entryCount: number; lastUpdated: string }
    projects: Record<string, { entryCount: number; lastUpdated: string }>
  }
  version: string
  capturedAt: string
  checksum?: string
}

/**
 * Drift Entry - Single drift detection instance
 */
export interface DriftEntry {
  id: string
  type: DriftType
  severity: DriftSeverity
  detectedAt: string
  description: string
  affectedEntries: string[]
  recommendation: string
}
