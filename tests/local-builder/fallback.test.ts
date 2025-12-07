/**
 * Local Builder Fallback Tests
 * Tests for local builder fallback integration and validation
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import {
  isLocalBuilderEnabled,
  getLocalBuilderConfig,
  detectCopilotUnavailability,
  shouldTriggerFallback,
  getFallbackEvents,
} from '@/lib/foreman/local-builder'
import { BuilderTask } from '@/types/builder'

describe('Local Builder Configuration', () => {
  it('should load local builder configuration', () => {
    const config = getLocalBuilderConfig()
    
    assert.strictEqual(typeof config, 'object', 'Config should be an object')
    assert.strictEqual(config.enabled, true, 'Local builder should be enabled')
    assert.strictEqual(config.builder_url, 'http://localhost:5050/builder/run', 'Builder URL should match')
    assert.strictEqual(config.health_url, 'http://localhost:5050/health', 'Health URL should match')
    assert.strictEqual(config.fallback_interval_minutes, 30, 'Fallback interval should be 30 minutes')
  })

  it('should indicate local builder is enabled', () => {
    const enabled = isLocalBuilderEnabled()
    assert.strictEqual(enabled, true, 'Local builder should be enabled')
  })

  it('should have correct fallback conditions', () => {
    const config = getLocalBuilderConfig()
    
    assert.strictEqual(config.conditions.copilot_failure, true, 'Copilot failure condition should be enabled')
    assert.strictEqual(config.conditions.token_exhaustion, true, 'Token exhaustion condition should be enabled')
    assert.strictEqual(config.conditions.high_complexity_escalation, true, 'High complexity condition should be enabled')
    assert.strictEqual(config.conditions.pipeline_timeout_seconds, 45, 'Pipeline timeout should be 45 seconds')
  })
})

describe('Copilot Unavailability Detection', () => {
  it('should detect simulated Copilot unavailability', async () => {
    // Set environment variable to simulate failure
    process.env.SIMULATE_COPILOT_FAILURE = 'true'
    
    const unavailable = await detectCopilotUnavailability()
    
    assert.strictEqual(unavailable, true, 'Should detect simulated Copilot unavailability')
    
    // Clean up
    delete process.env.SIMULATE_COPILOT_FAILURE
  })

  it('should return false when Copilot is available', async () => {
    // Ensure environment variable is not set
    delete process.env.SIMULATE_COPILOT_FAILURE
    
    const unavailable = await detectCopilotUnavailability()
    
    assert.strictEqual(unavailable, false, 'Should return false when Copilot is available')
  })
})

describe('Fallback Triggering Logic', () => {
  const mockTask: BuilderTask = {
    id: 'test_task_1',
    builder: 'api',
    module: 'test-module',
    taskDescription: 'Test task',
    status: 'approved',
    approved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  it('should trigger fallback on Copilot unavailability', async () => {
    process.env.SIMULATE_COPILOT_FAILURE = 'true'
    
    const result = await shouldTriggerFallback(mockTask)
    
    assert.strictEqual(result.shouldFallback, true, 'Should trigger fallback')
    assert.strictEqual(result.reason, 'copilot_unavailable', 'Reason should be copilot_unavailable')
    
    delete process.env.SIMULATE_COPILOT_FAILURE
  })

  it('should trigger fallback on pipeline timeout', async () => {
    const executionTimeMs = 50000 // 50 seconds
    
    const result = await shouldTriggerFallback(mockTask, executionTimeMs)
    
    assert.strictEqual(result.shouldFallback, true, 'Should trigger fallback on timeout')
    assert.strictEqual(result.reason, 'timeout', 'Reason should be timeout')
  })

  it('should trigger fallback on token exhaustion', async () => {
    process.env.SIMULATE_TOKEN_EXHAUSTION = 'true'
    
    const result = await shouldTriggerFallback(mockTask)
    
    assert.strictEqual(result.shouldFallback, true, 'Should trigger fallback')
    assert.strictEqual(result.reason, 'token_exhaustion', 'Reason should be token_exhaustion')
    
    delete process.env.SIMULATE_TOKEN_EXHAUSTION
  })

  it('should trigger fallback on high complexity', async () => {
    const highComplexityTask: BuilderTask = {
      ...mockTask,
      input: {
        module: mockTask.module,
        taskDescription: mockTask.taskDescription,
        organisationId: 'test-org',
        metadata: { complexity: 'high' },
      },
    }
    
    const result = await shouldTriggerFallback(highComplexityTask)
    
    assert.strictEqual(result.shouldFallback, true, 'Should trigger fallback')
    assert.strictEqual(result.reason, 'high_complexity', 'Reason should be high_complexity')
  })

  it('should not trigger fallback when conditions are not met', async () => {
    // Ensure no simulation env vars are set
    delete process.env.SIMULATE_COPILOT_FAILURE
    delete process.env.SIMULATE_TOKEN_EXHAUSTION
    
    const result = await shouldTriggerFallback(mockTask)
    
    assert.strictEqual(result.shouldFallback, false, 'Should not trigger fallback')
    assert.strictEqual(result.reason, undefined, 'Reason should be undefined')
  })
})

describe('Fallback Event Recording', () => {
  it('should store fallback events', () => {
    const events = getFallbackEvents()
    
    assert.ok(Array.isArray(events), 'Should return an array of events')
  })

  it('should filter events by task ID', () => {
    const events = getFallbackEvents({ taskId: 'test_task_1' })
    
    assert.ok(Array.isArray(events), 'Should return filtered events')
  })

  it('should filter events by builder type', () => {
    const events = getFallbackEvents({ builderType: 'api' })
    
    assert.ok(Array.isArray(events), 'Should return filtered events')
  })

  it('should filter events by success status', () => {
    const events = getFallbackEvents({ success: true })
    
    assert.ok(Array.isArray(events), 'Should return filtered events')
  })
})

describe('Local Builder Integration', () => {
  it('should have correct builder URL format', () => {
    const config = getLocalBuilderConfig()
    
    assert.ok(config.builder_url.startsWith('http://'), 'Builder URL should start with http://')
    assert.ok(config.builder_url.includes('localhost'), 'Builder URL should include localhost')
  })

  it('should have correct health URL format', () => {
    const config = getLocalBuilderConfig()
    
    assert.ok(config.health_url.startsWith('http://'), 'Health URL should start with http://')
    assert.ok(config.health_url.includes('localhost'), 'Health URL should include localhost')
  })

  it('should have valid local repo path', () => {
    const config = getLocalBuilderConfig()
    
    assert.ok(config.local_repo_path, 'Local repo path should be defined')
    assert.strictEqual(typeof config.local_repo_path, 'string', 'Local repo path should be a string')
  })
})
