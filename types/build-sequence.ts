/**
 * Build Sequence Types
 * Type definitions for build sequence orchestration
 */

import { BuilderTask, BuilderType, BuilderRequest, QAResult } from './builder'

export interface ArchitectureGap {
  area: string
  description: string
  priority: 'high' | 'medium' | 'low'
  suggestedTasks: string[]
}

export interface BuildSequence {
  id: string
  organisationId: string
  status: BuildSequenceStatus
  architectureGaps: ArchitectureGap[]
  tasks: BuilderTask[]
  qaResults: QAResult[]
  prUrl?: string
  createdAt: Date
  updatedAt: Date
  startedAt?: Date
  completedAt?: Date
  error?: string
}

export type BuildSequenceStatus = 
  | 'pending'
  | 'analyzing_architecture'
  | 'generating_tasks'
  | 'awaiting_approval'
  | 'executing_tasks'
  | 'running_qa'
  | 'assembling_pr'
  | 'completed'
  | 'failed'

// Specific trigger context types for different sources
export interface WebhookTriggerContext {
  event: string
  payload?: Record<string, any>
}

export interface IssueCommandTriggerContext {
  issue?: string
  issueNumber?: number
  repository?: string
  command?: string
}

export interface ScheduledTriggerContext {
  schedule: string
  branch?: string
  cron?: string
}

export type TriggerContext = 
  | WebhookTriggerContext 
  | IssueCommandTriggerContext 
  | ScheduledTriggerContext
  | Record<string, any>

export interface BuildSequenceConfig {
  organisationId: string
  triggerSource: 'webhook' | 'issue_command' | 'scheduled'
  triggerContext?: TriggerContext
  autonomousBuildEnabled?: boolean
  skipArchitectureAnalysis?: boolean
}

// AI-generated task request (includes builder field)
export interface AIGeneratedTaskRequest extends BuilderRequest {
  builder: BuilderType
}

export interface PRContext {
  title: string
  description: string
  builderOutputs: BuilderTask[]
  qaResults: QAResult[]
  changeRecords: ChangeRecord[]
  complianceResults: ComplianceResult[]
}

export interface ChangeRecord {
  type: 'addition' | 'modification' | 'deletion'
  file: string
  description: string
  builder?: BuilderType
  taskId?: string
}

export interface ComplianceResult {
  check: string
  status: 'passed' | 'failed' | 'warning'
  message: string
  details?: any
}

