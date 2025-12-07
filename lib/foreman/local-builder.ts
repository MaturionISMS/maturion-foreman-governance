/**
 * Local Builder Utility
 * Handles communication with local hybrid builder and fallback logic
 */

import { LocalBuilderConfig, LocalBuilderPayload, LocalBuilderResponse, FallbackEvent } from '@/types/local-builder'
import { BuilderTask } from '@/types/builder'
import { recordGovernanceEvent } from './memory'
import localBuilderConfigJson from '@/config/local-builder.json'

const localBuilderConfig = localBuilderConfigJson as LocalBuilderConfig

/**
 * In-memory fallback event store
 */
const fallbackEventStore: FallbackEvent[] = []

/**
 * Check if local builder is enabled
 */
export function isLocalBuilderEnabled(): boolean {
  return localBuilderConfig.enabled
}

/**
 * Get local builder configuration
 */
export function getLocalBuilderConfig(): LocalBuilderConfig {
  return localBuilderConfig
}

/**
 * Check health of local builder
 */
export async function checkLocalBuilderHealth(): Promise<boolean> {
  if (!isLocalBuilderEnabled()) {
    return false
  }

  const timeoutMs = localBuilderConfig.health_check_timeout_ms || 5000

  try {
    const response = await fetch(localBuilderConfig.health_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(timeoutMs),
    })

    return response.ok
  } catch (error) {
    console.error('[LocalBuilder] Health check failed:', error)
    return false
  }
}

/**
 * Detect if Copilot SWE is unavailable
 * This simulates detection - in production, this would check actual Copilot API status
 */
export async function detectCopilotUnavailability(): Promise<boolean> {
  // Check environment variable for simulation
  const simulateFailure = process.env.SIMULATE_COPILOT_FAILURE === 'true'
  
  if (simulateFailure) {
    console.log('[LocalBuilder] Simulated Copilot unavailability detected')
    return true
  }

  // In production, this would:
  // 1. Check Copilot API health endpoint
  // 2. Track recent failure rates
  // 3. Check token quota/rate limits
  // For now, return false (Copilot available)
  return false
}

/**
 * Determine if fallback should be triggered
 */
export async function shouldTriggerFallback(
  task: BuilderTask,
  executionTimeMs?: number
): Promise<{ shouldFallback: boolean; reason?: string }> {
  if (!isLocalBuilderEnabled()) {
    return { shouldFallback: false }
  }

  const conditions = localBuilderConfig.conditions

  // Check for simulated Copilot failure
  if (conditions.copilot_failure) {
    const copilotUnavailable = await detectCopilotUnavailability()
    if (copilotUnavailable) {
      return { shouldFallback: true, reason: 'copilot_unavailable' }
    }
  }

  // Check for pipeline timeout
  if (conditions.pipeline_timeout_seconds && executionTimeMs) {
    const timeoutMs = conditions.pipeline_timeout_seconds * 1000
    if (executionTimeMs > timeoutMs) {
      return { shouldFallback: true, reason: 'timeout' }
    }
  }

  // Check for token exhaustion (would be implemented with actual API tracking)
  if (conditions.token_exhaustion) {
    const tokenExhausted = process.env.SIMULATE_TOKEN_EXHAUSTION === 'true'
    if (tokenExhausted) {
      return { shouldFallback: true, reason: 'token_exhaustion' }
    }
  }

  // Check for high complexity escalation
  if (conditions.high_complexity_escalation) {
    const highComplexity = task.input?.metadata?.complexity === 'high'
    if (highComplexity) {
      return { shouldFallback: true, reason: 'high_complexity' }
    }
  }

  return { shouldFallback: false }
}

/**
 * Execute task using local builder
 */
export async function executeWithLocalBuilder(
  task: BuilderTask
): Promise<LocalBuilderResponse> {
  console.log(`[LocalBuilder] Executing task ${task.id} with local builder`)

  // Check health first
  const isHealthy = await checkLocalBuilderHealth()
  if (!isHealthy) {
    throw new Error('Local builder is not healthy')
  }

  // Assemble builder payload
  const payload: LocalBuilderPayload = {
    task_id: task.id,
    issue_number: task.input?.metadata?.issueNumber as number | undefined,
    repo_path: localBuilderConfig.local_repo_path,
    task_description: task.taskDescription,
    builder_type: task.builder,
    module: task.module,
    context: task.input?.context,
    metadata: task.input?.metadata,
  }

  const timeoutMs = localBuilderConfig.execution_timeout_ms || 300000

  try {
    const response = await fetch(localBuilderConfig.builder_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    })

    if (!response.ok) {
      throw new Error(`Local builder returned ${response.status}: ${response.statusText}`)
    }

    const result = await response.json() as LocalBuilderResponse

    console.log(`[LocalBuilder] Task ${task.id} completed with local builder`)
    return result
  } catch (error) {
    console.error(`[LocalBuilder] Failed to execute task ${task.id}:`, error)
    throw error
  }
}

/**
 * Record fallback event
 */
export async function recordFallbackEvent(
  event: FallbackEvent,
  organisationId: string
): Promise<void> {
  // Store in memory
  fallbackEventStore.push(event)

  // Record in governance memory
  try {
    await recordGovernanceEvent(
      'local_builder_fallback',
      {
        timestamp: event.timestamp,
        reason: event.reason,
        taskId: event.task_id,
        builderType: event.builder_type,
        success: event.success,
        error: event.error,
      },
      { organisationId }
    )
    console.log(`[LocalBuilder] Fallback event recorded in governance memory`)
  } catch (error) {
    console.error('[LocalBuilder] Failed to record governance event:', error)
    // Don't fail if memory write fails
  }
}

/**
 * Get fallback event history
 */
export function getFallbackEvents(filter?: {
  taskId?: string
  builderType?: string
  success?: boolean
}): FallbackEvent[] {
  let events = [...fallbackEventStore]

  if (filter?.taskId) {
    events = events.filter(e => e.task_id === filter.taskId)
  }

  if (filter?.builderType) {
    events = events.filter(e => e.builder_type === filter.builderType)
  }

  if (filter?.success !== undefined) {
    events = events.filter(e => e.success === filter.success)
  }

  return events
}
