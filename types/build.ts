/**
 * Build Types
 * Type definitions for build wave execution
 */

export interface BuildWave {
  id: string
  name: string
  status: BuildWaveStatus
  phases: BuildPhase[]
  createdAt: Date
  updatedAt: Date
  startedAt?: Date
  completedAt?: Date
}

export type BuildWaveStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export interface BuildPhase {
  id: string
  name: string
  order: number
  status: BuildPhaseStatus
  steps: BuildStep[]
  dependencies?: string[]
}

export type BuildPhaseStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

export interface BuildStep {
  id: string
  name: string
  type: BuildStepType
  status: BuildStepStatus
  command?: string
  params?: Record<string, any>
  output?: string
  error?: string
  startedAt?: Date
  completedAt?: Date
}

export type BuildStepType =
  | 'command'
  | 'script'
  | 'test'
  | 'deploy'
  | 'notification'
  | 'approval'

export type BuildStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

export interface BuildConfig {
  timeout?: number
  retryAttempts?: number
  failFast?: boolean
  parallelExecution?: boolean
}

export interface BuildResult {
  success: boolean
  duration: number
  output?: string
  artifacts?: BuildArtifact[]
  error?: string
}

export interface BuildArtifact {
  name: string
  path: string
  size: number
  type: string
}
