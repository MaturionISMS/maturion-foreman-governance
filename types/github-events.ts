/**
 * GitHub Mutation Event Types
 * 
 * Defines types for all GitHub mutation events logged to Governance Memory.
 * These events provide a complete audit trail of all GitHub operations.
 */

/**
 * GitHub Mutation Event - Base interface for all mutation events
 */
export interface GitHubMutationEvent {
  id: string
  timestamp: string
  eventType: GitHubMutationEventType
  actor: 'foreman' | 'human' | 'system'
  target: GitHubMutationTarget
  mutation: GitHubMutation
  governance: GitHubGovernanceContext
  metadata: GitHubMutationMetadata
}

/**
 * Event types for GitHub mutations
 */
export type GitHubMutationEventType =
  | 'issue_closed'
  | 'issue_reopened'
  | 'issue_commented'
  | 'issue_labeled'
  | 'issue_assigned'
  | 'pr_created'
  | 'pr_updated'
  | 'pr_labeled'
  | 'pr_commented'
  | 'pr_reviewed'
  | 'pr_review_requested'
  | 'pr_assigned'
  | 'branch_protection_updated'
  | 'governance_metadata_applied'

/**
 * Target resource for mutation
 */
export interface GitHubMutationTarget {
  owner: string
  repo: string
  resourceType: 'issue' | 'pr' | 'branch'
  resourceId: number | string
}

/**
 * Mutation details
 */
export interface GitHubMutation {
  operation: string
  parameters: Record<string, any>
  result: 'success' | 'failure' | 'blocked'
  blockReason?: string
  errorDetails?: any
}

/**
 * Governance context for mutation
 */
export interface GitHubGovernanceContext {
  qaStatus?: 'passed' | 'failed' | 'skipped'
  complianceStatus?: 'passed' | 'failed' | 'skipped'
  approvalRequired: boolean
  approvedBy?: string
  governanceTags: string[]
  secretsDetected?: boolean
  orgValidated?: boolean
}

/**
 * Metadata for mutation event
 */
export interface GitHubMutationMetadata {
  buildSequenceId?: string
  organisationId?: string
  autonomousMode: boolean
  errorDetails?: any
  retryCount?: number
  transientFailure?: boolean
}

/**
 * PR Metadata Schema - Extended metadata for PR operations
 */
export interface PRMetadata {
  buildSequenceId: string
  qaResults: QAResultsSummary
  complianceResults: ComplianceResultsSummary
  linkedIssues: number[]
  builders: string[]
  governanceTags: string[]
}

/**
 * QA Results Summary
 */
export interface QAResultsSummary {
  passed: boolean
  totalChecks: number
  passedChecks: number
  blockers: string[]
}

/**
 * Compliance Results Summary
 */
export interface ComplianceResultsSummary {
  passed: boolean
  secretsDetected: boolean
  orgValidated: boolean
}

/**
 * Governance Approval
 */
export interface GovernanceApproval {
  approvedBy: string
  reason: string
  timestamp?: string
  role?: string
}

/**
 * Branch Protection Rules
 */
export interface BranchProtectionRules {
  required_status_checks?: {
    strict: boolean
    contexts: string[]
  }
  enforce_admins?: boolean
  required_pull_request_reviews?: {
    required_approving_review_count: number
    dismiss_stale_reviews?: boolean
    require_code_owner_reviews?: boolean
  }
  restrictions?: {
    users?: string[]
    teams?: string[]
  } | null
  allow_force_pushes?: boolean
  allow_deletions?: boolean
}

/**
 * GitHub Comment
 */
export interface GitHubComment {
  id: number
  body: string
  user: {
    login: string
    id: number
  }
  created_at: string
  updated_at: string
  html_url: string
}

/**
 * GitHub PR
 */
export interface GitHubPR {
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  html_url: string
  head: {
    ref: string
    sha: string
  }
  base: {
    ref: string
    sha: string
  }
  created_at: string
  updated_at: string
}

/**
 * PR Configuration
 */
export interface PRConfig {
  owner: string
  repo: string
  head: string
  base: string
  title: string
  body: string
  metadata: PRMetadata
  draft?: boolean
  maintainer_can_modify?: boolean
}

/**
 * PR Updates
 */
export interface PRUpdates {
  title?: string
  body?: string
  state?: 'open' | 'closed'
  base?: string
}

/**
 * Governance Violation Error
 */
export class GovernanceViolationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GovernanceViolationError'
  }
}

/**
 * Compliance Violation Error
 */
export class ComplianceViolationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ComplianceViolationError'
  }
}

/**
 * Governance Approval Required Error
 */
export class GovernanceApprovalRequiredError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GovernanceApprovalRequiredError'
  }
}

/**
 * Mutation Failure Error
 */
export class MutationFailureError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MutationFailureError'
  }
}

/**
 * Governance labels available for issues and PRs
 */
export const GOVERNANCE_LABELS = {
  QA_APPROVED: 'qa-approved',
  QA_BLOCKED: 'qa-blocked',
  COMPLIANCE_APPROVED: 'compliance-approved',
  COMPLIANCE_BLOCKED: 'compliance-blocked',
  GOVERNANCE_APPROVED: 'governance-approved',
  AWAITING_GOVERNANCE: 'awaiting-governance',
  AUTONOMOUS_BUILD: 'autonomous-build',
  MANUAL_APPROVAL: 'manual-approval',
} as const

export type GovernanceLabel = typeof GOVERNANCE_LABELS[keyof typeof GOVERNANCE_LABELS]
