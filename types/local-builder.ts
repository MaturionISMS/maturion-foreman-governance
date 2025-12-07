/**
 * Local Builder Configuration Types
 * Type definitions for local hybrid builder fallback configuration
 */

export interface LocalBuilderConfig {
  enabled: boolean
  builder_url: string
  health_url: string
  fallback_interval_minutes: number
  local_repo_path: string
  conditions: FallbackConditions
  health_check_timeout_ms?: number
  execution_timeout_ms?: number
}

export interface FallbackConditions {
  copilot_failure: boolean
  token_exhaustion: boolean
  high_complexity_escalation: boolean
  pipeline_timeout_seconds: number
}

export interface LocalBuilderPayload {
  task_id: string
  issue_number?: number
  repo_path: string
  task_description: string
  builder_type: string
  module: string
  context?: Record<string, any>
  metadata?: Record<string, any>
}

export interface LocalBuilderResponse {
  success: boolean
  task_id: string
  status: string
  output?: any
  error?: string
  execution_time_ms?: number
}

export interface FallbackEvent {
  timestamp: Date
  reason: 'copilot_unavailable' | 'token_exhaustion' | 'timeout' | 'high_complexity'
  task_id: string
  builder_type: string
  local_builder_used: boolean
  success: boolean
  error?: string
}
