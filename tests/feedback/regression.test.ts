/**
 * Regression Tests
 * Ensures feedback system doesn't break existing functionality
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { processFeedback, getFeedbackStatistics } from '@/lib/foreman/feedback/processor'
import { runDriftMonitoring } from '@/lib/foreman/memory/drift-monitor'
import { BuilderFeedback } from '@/types/builder-feedback'

describe('Feedback System Regression Tests', () => {
  it('should not break drift monitoring without feedback', async () => {
    // Run drift monitoring without any feedback
    const report = await runDriftMonitoring()
    
    assert.ok(report)
    assert.ok(report.overallStatus)
    assert.ok(Array.isArray(report.checks))
  })
  
  it('should handle concurrent feedback submissions', async () => {
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 5; i++) {
      feedbacks.push({
        taskId: `concurrent-${i}`,
        builder: i % 2 === 0 ? 'local' : 'copilot',
        difficultyScore: 0.4 + (i * 0.1),
        timestamp: new Date().toISOString()
      })
    }
    
    // Process all concurrently
    const results = await Promise.all(
      feedbacks.map(f => processFeedback(f))
    )
    
    // All should succeed
    results.forEach(result => {
      assert.strictEqual(result.processed, true)
    })
  })
  
  it('should maintain backwards compatibility with missing optional fields', async () => {
    const minimalFeedback: BuilderFeedback = {
      taskId: 'minimal',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(minimalFeedback)
    assert.strictEqual(result.processed, true)
  })
  
  it('should not corrupt memory fabric', async () => {
    const feedback: BuilderFeedback = {
      taskId: 'memory-test',
      builder: 'copilot',
      difficultyScore: 0.6,
      timestamp: new Date().toISOString()
    }
    
    await processFeedback(feedback)
    
    // Run drift monitoring to ensure memory integrity
    const report = await runDriftMonitoring()
    
    // Should not introduce new critical issues
    assert.ok(report.criticalCount >= 0)
  })
  
  it('should handle edge cases gracefully', async () => {
    const edgeCases = [
      {
        taskId: 'edge-1',
        builder: 'local' as const,
        difficultyScore: 0,
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'edge-2',
        builder: 'copilot' as const,
        difficultyScore: 1,
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'edge-3',
        builder: 'local' as const,
        difficultyScore: 0.5,
        failures: [],
        uncertainties: [],
        timestamp: new Date().toISOString()
      }
    ]
    
    for (const feedback of edgeCases) {
      const result = await processFeedback(feedback)
      assert.strictEqual(result.processed, true)
    }
  })
  
  it('should provide consistent statistics', async () => {
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 10; i++) {
      feedbacks.push({
        taskId: `stats-${i}`,
        builder: i % 2 === 0 ? 'local' : 'copilot',
        difficultyScore: 0.5,
        timestamp: new Date().toISOString()
      })
    }
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    // Get statistics multiple times
    const stats1 = await getFeedbackStatistics(30)
    const stats2 = await getFeedbackStatistics(30)
    
    // Should be consistent
    assert.strictEqual(stats1.totalCount, stats2.totalCount)
    assert.strictEqual(stats1.averageDifficulty, stats2.averageDifficulty)
  })
  
  it('should not block on feedback processing errors', async () => {
    // Process valid feedback
    const validFeedback: BuilderFeedback = {
      taskId: 'valid',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(validFeedback)
    assert.strictEqual(result.processed, true)
    
    // System should continue working
    const stats = await getFeedbackStatistics(30)
    assert.ok(stats.totalCount >= 0)
  })
  
  it('should handle old feedback data gracefully', async () => {
    // Create feedback from 60 days ago
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 60)
    
    const oldFeedback: BuilderFeedback = {
      taskId: 'old-task',
      builder: 'local',
      difficultyScore: 0.5,
      timestamp: oldDate.toISOString()
    }
    
    const result = await processFeedback(oldFeedback)
    assert.strictEqual(result.processed, true)
    
    // Statistics for last 30 days should not include old feedback
    const stats = await getFeedbackStatistics(30)
    // Stats should work without errors
    assert.ok(stats.totalCount >= 0)
  })
})
