/**
 * Multi-Agent Harmonization Tests
 * Tests that Local Builder and Copilot Builder produce compatible feedback
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import { validateFeedback, processFeedback } from '@/lib/foreman/feedback/processor'
import { BuilderFeedback } from '@/types/builder-feedback'

describe('Multi-Agent Harmonization', () => {
  it('should accept feedback from local builder', () => {
    const localFeedback: BuilderFeedback = {
      taskId: 'local-task-1',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(localFeedback)
    assert.strictEqual(result.valid, true)
  })
  
  it('should accept feedback from copilot builder', () => {
    const copilotFeedback: BuilderFeedback = {
      taskId: 'copilot-task-1',
      builder: 'copilot',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = validateFeedback(copilotFeedback)
    assert.strictEqual(result.valid, true)
  })
  
  it('should process feedback from both builders consistently', async () => {
    const localFeedback: BuilderFeedback = {
      taskId: 'harmonize-local',
      builder: 'local',
      difficultyScore: 0.6,
      failures: ['Test failure'],
      timestamp: new Date().toISOString()
    }
    
    const copilotFeedback: BuilderFeedback = {
      taskId: 'harmonize-copilot',
      builder: 'copilot',
      difficultyScore: 0.6,
      failures: ['Test failure'],
      timestamp: new Date().toISOString()
    }
    
    const localResult = await processFeedback(localFeedback)
    const copilotResult = await processFeedback(copilotFeedback)
    
    // Both should process successfully
    assert.strictEqual(localResult.processed, true)
    assert.strictEqual(copilotResult.processed, true)
    
    // Both should have same structure
    assert.ok(localResult.feedbackId)
    assert.ok(copilotResult.feedbackId)
    assert.strictEqual(typeof localResult.patternsDetected, typeof copilotResult.patternsDetected)
  })
  
  it('should aggregate feedback from both builders', async () => {
    // Clean up first to ensure accurate count
    const feedbackPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'builder-feedback-history.json'
    )
    if (fs.existsSync(feedbackPath)) {
      fs.unlinkSync(feedbackPath)
    }
    
    const feedbacks: BuilderFeedback[] = [
      {
        taskId: 'aggregate-1',
        builder: 'local',
        difficultyScore: 0.4,
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'aggregate-2',
        builder: 'copilot',
        difficultyScore: 0.5,
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'aggregate-3',
        builder: 'local',
        difficultyScore: 0.6,
        timestamp: new Date().toISOString()
      }
    ]
    
    for (const feedback of feedbacks) {
      const result = await processFeedback(feedback)
      assert.strictEqual(result.processed, true)
    }
    
    // Get statistics
    const { getFeedbackStatistics } = await import('@/lib/foreman/feedback/processor')
    const stats = await getFeedbackStatistics(30)
    
    assert.strictEqual(stats.totalCount, 3)
    assert.strictEqual(stats.builderBreakdown.local, 2)
    assert.strictEqual(stats.builderBreakdown.copilot, 1)
  })
  
  it('should handle different optional fields from different builders', async () => {
    const localFeedback: BuilderFeedback = {
      taskId: 'local-optional',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString(),
      reasoningPath: 'Local builder reasoning',
      failures: ['Local failure']
    }
    
    const copilotFeedback: BuilderFeedback = {
      taskId: 'copilot-optional',
      builder: 'copilot',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString(),
      uncertainties: ['Copilot uncertainty'],
      missingMemoryDetected: ['Missing docs']
    }
    
    const localResult = await processFeedback(localFeedback)
    const copilotResult = await processFeedback(copilotFeedback)
    
    assert.strictEqual(localResult.processed, true)
    assert.strictEqual(copilotResult.processed, true)
  })
  
  it('should maintain builder attribution in feedback history', async () => {
    const feedbacks: BuilderFeedback[] = [
      {
        taskId: 'attr-1',
        builder: 'local',
        difficultyScore: 0.3,
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'attr-2',
        builder: 'copilot',
        difficultyScore: 0.4,
        timestamp: new Date().toISOString()
      }
    ]
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    // Verify attribution is preserved
    const { getFeedbackStatistics } = await import('@/lib/foreman/feedback/processor')
    const stats = await getFeedbackStatistics(30)
    
    assert.ok(stats.builderBreakdown.local >= 1)
    assert.ok(stats.builderBreakdown.copilot >= 1)
  })
})
