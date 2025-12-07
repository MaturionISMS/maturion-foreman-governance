/**
 * Builder Feedback Flow Tests
 * End-to-end tests for builder → Foreman → memory flow
 */

import { describe, it, beforeEach } from 'node:test'
import * as assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import { processFeedback } from '@/lib/foreman/feedback/processor'
import { BuilderFeedback } from '@/types/builder-feedback'

const FEEDBACK_HISTORY_PATH = path.join(
  process.cwd(),
  'memory',
  'global',
  'builder-feedback-history.json'
)

describe('Builder Feedback Flow', () => {
  beforeEach(() => {
    // Clean up test files before each test
    if (fs.existsSync(FEEDBACK_HISTORY_PATH)) {
      fs.unlinkSync(FEEDBACK_HISTORY_PATH)
    }
  })
  
  it('should process and store feedback in history', async () => {
    const feedback: BuilderFeedback = {
      taskId: 'test-task-1',
      builder: 'local',
      difficultyScore: 0.4,
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(feedback)
    
    assert.strictEqual(result.processed, true)
    assert.strictEqual(result.memoryUpdates, 1)
    assert.ok(result.feedbackId)
    
    // Verify feedback was stored
    assert.ok(fs.existsSync(FEEDBACK_HISTORY_PATH))
    const history = JSON.parse(fs.readFileSync(FEEDBACK_HISTORY_PATH, 'utf-8'))
    assert.strictEqual(history.length, 1)
    assert.strictEqual(history[0].taskId, 'test-task-1')
  })
  
  it('should detect patterns from multiple feedback entries', async () => {
    // Submit multiple feedback with repeated failures
    const feedbacks: BuilderFeedback[] = [
      {
        taskId: 'task-1',
        builder: 'local',
        difficultyScore: 0.5,
        failures: ['Module X compilation failed'],
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'task-2',
        builder: 'local',
        difficultyScore: 0.6,
        failures: ['Module X compilation failed'],
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'task-3',
        builder: 'copilot',
        difficultyScore: 0.7,
        failures: ['Module X compilation failed'],
        timestamp: new Date().toISOString()
      }
    ]
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    // Process one more and check for pattern detection
    const finalFeedback: BuilderFeedback = {
      taskId: 'task-4',
      builder: 'local',
      difficultyScore: 0.5,
      failures: ['Module X compilation failed'],
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(finalFeedback)
    
    assert.strictEqual(result.processed, true)
    assert.ok(result.patternsDetected.length > 0)
    assert.ok(result.patternsDetected.some(p => p.includes('repeated_failure')))
  })
  
  it('should extract knowledge candidates', async () => {
    const feedback: BuilderFeedback = {
      taskId: 'task-with-knowledge',
      builder: 'copilot',
      difficultyScore: 0.3,
      newKnowledgeCandidates: [
        'New pattern for handling API errors',
        'Better approach to state management'
      ],
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(feedback)
    
    assert.strictEqual(result.processed, true)
    assert.strictEqual(result.consolidationTriggered, true)
    
    // Verify knowledge candidates were stored
    const candidatesPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'knowledge-candidates.json'
    )
    
    assert.ok(fs.existsSync(candidatesPath))
    const candidates = JSON.parse(fs.readFileSync(candidatesPath, 'utf-8'))
    assert.ok(candidates.length > 0)
    assert.strictEqual(candidates[candidates.length - 1].taskId, 'task-with-knowledge')
  })
  
  it('should record governance conflicts', async () => {
    const feedback: BuilderFeedback = {
      taskId: 'task-with-conflicts',
      builder: 'local',
      difficultyScore: 0.7,
      governanceConflicts: [
        'Rule A requires X but Rule B forbids X'
      ],
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(feedback)
    
    assert.strictEqual(result.processed, true)
    
    // Verify conflicts were recorded
    const conflictsPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'governance-conflicts.json'
    )
    
    assert.ok(fs.existsSync(conflictsPath))
    const conflicts = JSON.parse(fs.readFileSync(conflictsPath, 'utf-8'))
    assert.ok(conflicts.length > 0)
    assert.strictEqual(conflicts[conflicts.length - 1].taskId, 'task-with-conflicts')
  })
  
  it('should handle invalid feedback gracefully', async () => {
    const invalidFeedback: any = {
      taskId: 'invalid-task',
      builder: 'invalid-builder',
      difficultyScore: 2.0,
      timestamp: 'invalid'
    }
    
    const result = await processFeedback(invalidFeedback)
    
    assert.strictEqual(result.processed, false)
    assert.ok(result.errors)
    assert.ok(result.errors.length > 0)
  })
})
