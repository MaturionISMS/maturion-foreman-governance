/**
 * Drift Detection Agent Experience Tests
 * Tests for agent-experience drift detection from builder feedback
 */

import { describe, it, beforeEach } from 'node:test'
import * as assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import { processFeedback } from '@/lib/foreman/feedback/processor'
import { detectAgentExperienceDrift } from '@/lib/foreman/memory/drift-monitor'
import { BuilderFeedback } from '@/types/builder-feedback'

const FEEDBACK_HISTORY_PATH = path.join(
  process.cwd(),
  'memory',
  'global',
  'builder-feedback-history.json'
)

describe('Drift Detection - Agent Experience', () => {
  beforeEach(() => {
    // Clean up test files
    if (fs.existsSync(FEEDBACK_HISTORY_PATH)) {
      fs.unlinkSync(FEEDBACK_HISTORY_PATH)
    }
  })
  
  it('should detect drift when builders report high difficulty consistently', async () => {
    // Create feedback with consistently high difficulty
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 10; i++) {
      feedbacks.push({
        taskId: `task-${i}`,
        builder: i % 2 === 0 ? 'local' : 'copilot',
        difficultyScore: 0.8,
        timestamp: new Date().toISOString()
      })
    }
    
    // Store feedback
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    // Run drift detection
    const result = await detectAgentExperienceDrift()
    
    assert.strictEqual(result.category, 'agent_experience_drift')
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    assert.ok(result.issues.some(i => i.description.includes('high difficulty')))
  })
  
  it('should detect drift from repeated missing memory reports', async () => {
    // Create feedback with missing memory
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 5; i++) {
      feedbacks.push({
        taskId: `task-${i}`,
        builder: 'local',
        difficultyScore: 0.6,
        missingMemoryDetected: ['Missing API documentation context'],
        timestamp: new Date().toISOString()
      })
    }
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    const result = await detectAgentExperienceDrift()
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.some(i => i.description.includes('missing memory')))
    assert.ok(result.issues.some(i => i.severity === 'warning'))
  })
  
  it('should detect drift from governance conflicts', async () => {
    // Create feedback with governance conflicts
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 3; i++) {
      feedbacks.push({
        taskId: `task-${i}`,
        builder: 'copilot',
        difficultyScore: 0.7,
        governanceConflicts: ['Conflicting rules detected'],
        timestamp: new Date().toISOString()
      })
    }
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    const result = await detectAgentExperienceDrift()
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.some(i => i.description.includes('governance conflicts')))
    assert.ok(result.issues.some(i => i.severity === 'error'))
  })
  
  it('should pass when builders perform well', async () => {
    // Create feedback with low difficulty
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 5; i++) {
      feedbacks.push({
        taskId: `task-${i}`,
        builder: 'local',
        difficultyScore: 0.3,
        timestamp: new Date().toISOString()
      })
    }
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    const result = await detectAgentExperienceDrift()
    
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.issues.length, 0)
  })
  
  it('should handle no feedback gracefully', async () => {
    const result = await detectAgentExperienceDrift()
    
    assert.strictEqual(result.category, 'agent_experience_drift')
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.issues.length, 0)
  })
  
  it('should provide actionable recommendations', async () => {
    // Create problematic feedback
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 4; i++) {
      feedbacks.push({
        taskId: `task-${i}`,
        builder: 'local',
        difficultyScore: 0.5,
        missingMemoryDetected: ['Missing architecture context'],
        timestamp: new Date().toISOString()
      })
    }
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    const result = await detectAgentExperienceDrift()
    
    assert.strictEqual(result.passed, false)
    const issue = result.issues[0]
    assert.ok(issue.recommendation)
    assert.ok(issue.recommendation.length > 0)
    assert.ok(issue.recommendation.includes('memory') || issue.recommendation.includes('context'))
  })
})
