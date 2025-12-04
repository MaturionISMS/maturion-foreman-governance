/**
 * Builder Types
 * Type definitions for Builder Agents
 */

export type BuilderType = 'ui' | 'api' | 'schema' | 'integration' | 'qa'

export interface BuilderCapability {
  name: string
  type: BuilderType
  description: string
  permissions: BuilderPermission[]
  supportedTaskTypes: string[]
  inputFormat: BuilderInputFormat
  outputFormat: BuilderOutputFormat
}

export interface BuilderPermission {
  resource: string
  access: 'read' | 'write' | 'execute'
  scope: string
}

export interface BuilderInputFormat {
  required: string[]
  optional: string[]
  schema: Record<string, any>
}

export interface BuilderOutputFormat {
  fields: string[]
  schema: Record<string, any>
}

export interface BuilderTask {
  id: string
  builder: BuilderType
  module: string
  taskDescription: string
  status: BuilderTaskStatus
  approved: boolean
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
  input?: Record<string, any>
  output?: BuilderTaskOutput
  error?: string
}

export type BuilderTaskStatus = 'pending_approval' | 'approved' | 'running' | 'completed' | 'failed' | 'rejected'

export interface BuilderTaskOutput {
  success: boolean
  data?: any
  artifacts?: BuilderArtifact[]
  qaResults?: QAResult[]
  error?: string
}

export interface BuilderArtifact {
  type: 'code' | 'schema' | 'documentation' | 'test'
  name: string
  path?: string
  content?: string
  metadata?: Record<string, any>
}

export interface QAResult {
  check: string
  status: 'passed' | 'failed' | 'warning'
  message?: string
  details?: Record<string, any>
}

export interface BuilderRequest {
  module: string
  taskDescription: string
  organisationId: string
  context?: Record<string, any>
  metadata?: Record<string, any>
}

export interface BuilderResponse {
  success: boolean
  taskId?: string
  status: string
  message?: string
  output?: BuilderTaskOutput
  error?: string
}
