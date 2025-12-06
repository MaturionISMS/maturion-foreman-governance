/**
 * Foreman Types
 * Type definitions for Foreman orchestration engine
 */

import { BuilderType } from './builder'

export interface ForemanTask {
  id: string
  type: ForemanTaskType
  status: ForemanTaskStatus
  params?: Record<string, any>
  result?: any
  error?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export type ForemanTaskType =
  | 'interpret-governance'
  | 'run-build-wave'
  | 'run-self-test'
  | 'apply-file-changes'
  | 'webhook-handler'
  | 'issue-response'
  | 'code-review'

export type ForemanTaskStatus = 'pending' | 'running' | 'completed' | 'failed'

export interface GovernanceRule {
  id: string
  name: string
  description: string
  conditions: GovernanceCondition[]
  actions: GovernanceAction[]
}

export interface GovernanceCondition {
  type: string
  operator: string
  value: any
}

export interface GovernanceAction {
  type: string
  params: Record<string, any>
}

/**
 * Foreman Action Types
 * Actions that Foreman can propose and execute
 */
export type ForemanActionType =
  | 'CREATE_ISSUE'
  | 'CREATE_PR'
  | 'ADD_COMMENT'
  | 'TRIGGER_BUILDER_TASK'
  | 'RUN_QA'
  | 'APPLY_GOVERNANCE'
  | 'RUN_BUILD_WAVE'
  | 'GENERATE_ARCHITECTURE'
  | 'REFACTOR'
  | 'CREATE_FEATURE'
  | 'MODIFY_FILE'
  | 'QA_RUN'
  | 'SELF_TEST'
  | 'INTEGRATION_TEST'
  | 'BUILDER_TASK'
  // Project Lifecycle Actions
  | 'CREATE_PROJECT'
  | 'UPDATE_PHASE'
  | 'UPDATE_MILESTONES'
  | 'RECORD_BLOCKER'
  | 'GET_PROJECT_STATUS'
  | 'GET_PROJECT_DASHBOARD'

export interface ForemanAction {
  type: ForemanActionType
  params: Record<string, any>
  requiresApproval: boolean
  organisationId: string
}

export interface TriggerBuilderTaskAction extends ForemanAction {
  type: 'TRIGGER_BUILDER_TASK'
  params: {
    module: string
    builder: BuilderType
    task_description: string
    context?: Record<string, any>
  }
  requiresApproval: true
}

export interface RunBuildWaveAction extends ForemanAction {
  type: 'RUN_BUILD_WAVE'
  params: {
    wave: string
    module?: string
  }
  requiresApproval: boolean
}

export interface GenerateArchitectureAction extends ForemanAction {
  type: 'GENERATE_ARCHITECTURE'
  params: {
    module: string
  }
  requiresApproval: boolean
}

export interface RefactorAction extends ForemanAction {
  type: 'REFACTOR'
  params: {
    scope: string
    description: string
  }
  requiresApproval: boolean
}

export interface CreateFeatureAction extends ForemanAction {
  type: 'CREATE_FEATURE'
  params: {
    module: string
    feature: string
  }
  requiresApproval: boolean
}

export interface ModifyFileAction extends ForemanAction {
  type: 'MODIFY_FILE'
  params: {
    path: string
    intent: string
  }
  requiresApproval: boolean
}

export interface QARunAction extends ForemanAction {
  type: 'QA_RUN'
  params: {
    target: string
  }
  requiresApproval: boolean
}

export interface SelfTestAction extends ForemanAction {
  type: 'SELF_TEST'
  params: Record<string, any>
  requiresApproval: false
}

export interface IntegrationTestAction extends ForemanAction {
  type: 'INTEGRATION_TEST'
  params: Record<string, any>
  requiresApproval: boolean
}

export interface BuilderTaskAction extends ForemanAction {
  type: 'BUILDER_TASK'
  params: {
    builder: string
    instruction: string
  }
  requiresApproval: boolean
}

// ============================================================================
// Project Lifecycle Action Interfaces
// ============================================================================

export interface CreateProjectAction extends ForemanAction {
  type: 'CREATE_PROJECT'
  params: {
    name: string
    description: string
    owner: string
    conceptData?: {
      rawConcept: string
    }
    tags?: string[]
    priority?: 'low' | 'medium' | 'high' | 'critical'
    estimatedCompletion?: string
  }
  requiresApproval: false
}

export interface UpdatePhaseAction extends ForemanAction {
  type: 'UPDATE_PHASE'
  params: {
    projectId?: string
    projectName?: string
    phase: 'concept' | 'architecture' | 'build' | 'deployment' | 'completed' | 'archived'
  }
  requiresApproval: boolean
}

export interface UpdateMilestonesAction extends ForemanAction {
  type: 'UPDATE_MILESTONES'
  params: {
    projectId?: string
    projectName?: string
    milestoneId?: string
    milestoneName?: string
    completedBy: string
  }
  requiresApproval: false
}

export interface RecordBlockerAction extends ForemanAction {
  type: 'RECORD_BLOCKER'
  params: {
    projectId?: string
    projectName?: string
    description: string
    category?: 'technical' | 'approval' | 'external' | 'resource'
    severity?: 'low' | 'medium' | 'high' | 'critical'
  }
  requiresApproval: false
}

export interface GetProjectStatusAction extends ForemanAction {
  type: 'GET_PROJECT_STATUS'
  params: {
    projectId?: string
    projectName?: string
  }
  requiresApproval: false
}

export interface GetProjectDashboardAction extends ForemanAction {
  type: 'GET_PROJECT_DASHBOARD'
  params: {
    projectId?: string
    projectName?: string
    view?: 'overview' | 'detail'
  }
  requiresApproval: false
}

export interface ForemanConfig {
  maxConcurrentTasks?: number
  taskTimeout?: number
  retryAttempts?: number
}

export interface ForemanStatus {
  status: 'active' | 'idle' | 'error'
  lastActivity?: Date
  pendingTasks: number
  runningTasks: number
  completedTasks: number
  failedTasks: number
}

/**
 * Chat Types
 * Types for Foreman chat interface
 */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  organisationId: string
  conversationId: string
  metadata?: ChatMessageMetadata
  proposedActions?: ForemanAction[] // Support for displaying proposed actions in chat
}

export interface ChatMessageMetadata {
  wave?: string
  module?: string
  actionType?: string
  builderType?: string
  complexity?: 'low' | 'medium' | 'high'
  tags?: string[]
}

export interface ChatRequest {
  message: string
  organisationId?: string
  conversationId?: string
  contextFlags?: string[]
}

export interface ChatResponse {
  replyText: string
  proposedActions?: ForemanAction[]
  telemetry?: {
    subSystemsInvolved: string[]
    behaviourRulesReferenced?: string[]
    contextFlags?: string[]
  }
  metadata?: ChatMessageMetadata
  autonomyIntent?: 'execute' | 'proposal_only'
  executionStatus?: ChatExecutionStatus
}

export interface ChatExecutionStatus {
  status: 'planning' | 'selecting_builder' | 'running' | 'qa_phase' | 'opening_pr' | 'complete' | 'error'
  message?: string
  builderUsed?: string
  filesChanged?: string[]
  prLink?: string
  qaSummary?: string
  complianceSummary?: string
  error?: string
}
