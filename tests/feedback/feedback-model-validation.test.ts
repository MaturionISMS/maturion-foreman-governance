/**
 * Feedback Model Validation Tests
 * Tests for builder feedback data model validation
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { validateFeedback } from '@/lib/foreman/feedback/processor'
import { BuilderFeedback } from '@/types/builder-feedback'

describe('Feedback Model Validation', () => {
  it('should accept valid feedback', () => {
    const validFeedback: BuilderFeedback = {
      taskId: 'task-123',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(validFeedback)
    assert.strictEqual(result.valid, true)
    assert.strictEqual(result.errors, undefined)
  })
  
  it('should reject feedback without taskId', () => {
    const invalidFeedback: any = {
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(invalidFeedback)
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors)
    assert.ok(result.errors.some(e => e.includes('taskId')))
  })
  
  it('should reject feedback with invalid builder', () => {
    const invalidFeedback: any = {
      taskId: 'task-123',
      builder: 'invalid',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(invalidFeedback)
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors)
    assert.ok(result.errors.some(e => e.includes('builder')))
  })
  
  it('should reject feedback with difficulty score out of range', () => {
    const invalidFeedback: BuilderFeedback = {
      taskId: 'task-123',
      builder: 'copilot',
      difficultyScore: 1.5,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(invalidFeedback)
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors)
    assert.ok(result.errors.some(e => e.includes('difficultyScore')))
  })
  
  it('should reject feedback with invalid timestamp', () => {
    const invalidFeedback: any = {
      taskId: 'task-123',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: 'not-a-timestamp'
    }
    
    const result = validateFeedback(invalidFeedback)
    assert.strictEqual(result.valid, false)
    assert.ok(result.errors)
    assert.ok(result.errors.some(e => e.includes('timestamp')))
  })
  
  it('should warn about high difficulty without context', () => {
    const feedback: BuilderFeedback = {
      taskId: 'task-123',
      builder: 'local',
      difficultyScore: 0.8,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(feedback)
    assert.strictEqual(result.valid, true)
    assert.ok(result.warnings)
    assert.ok(result.warnings.some(w => w.includes('High difficulty')))
  })
  
  it('should accept feedback with all optional fields', () => {
    const completeFeedback: BuilderFeedback = {
      taskId: 'task-123',
      builder: 'copilot',
      difficultyScore: 0.6,
      timestamp: new Date().toISOString(),
      reasoningPath: 'Used pattern X to solve Y',
      failures: ['Failed to compile module A'],
      uncertainties: ['Unclear about approach B'],
      improvementsSuggested: ['Add more documentation'],
      missingMemoryDetected: ['Missing context for API X'],
      governanceConflicts: ['Rule A conflicts with Rule B'],
      newKnowledgeCandidates: ['New pattern discovered for Z']
    }
    
    const result = validateFeedback(completeFeedback)
    assert.strictEqual(result.valid, true)
    assert.strictEqual(result.errors, undefined)
  })
})
