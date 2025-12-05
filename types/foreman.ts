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
}
