/**
 * Governance Conflict Detection Tests
 * Tests for detecting and handling governance conflicts in feedback
 */

import { describe, it, beforeEach } from 'node:test'
import * as assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import { processFeedback } from '@/lib/foreman/feedback/processor'
import { BuilderFeedback } from '@/types/builder-feedback'

const CONFLICTS_PATH = path.join(
  process.cwd(),
  'memory',
  'global',
  'governance-conflicts.json'
)

describe('Governance Conflict Detection', () => {
  beforeEach(() => {
    // Clean up test files
    if (fs.existsSync(CONFLICTS_PATH)) {
      fs.unlinkSync(CONFLICTS_PATH)
    }
  })
  
  it('should record governance conflicts from feedback', async () => {
    const feedback: BuilderFeedback = {
      taskId: 'conflict-task-1',
      builder: 'local',
      difficultyScore: 0.7,
      governanceConflicts: [
        'Rule A requires tests, but Rule B prohibits test files in src/',
        'Governance requires TypeScript, but project uses JavaScript'
      ],
      timestamp: new Date().toISOString()
    }
    
    const result = await processFeedback(feedback)
    
    assert.strictEqual(result.processed, true)
    
    // Verify conflicts were recorded
    assert.ok(fs.existsSync(CONFLICTS_PATH))
    const conflicts = JSON.parse(fs.readFileSync(CONFLICTS_PATH, 'utf-8'))
    
    assert.strictEqual(conflicts.length, 1)
    assert.strictEqual(conflicts[0].taskId, 'conflict-task-1')
    assert.strictEqual(conflicts[0].builder, 'local')
    assert.strictEqual(conflicts[0].conflicts.length, 2)
  })
  
  it('should accumulate multiple conflict reports', async () => {
    const feedbacks: BuilderFeedback[] = [
      {
        taskId: 'conflict-1',
        builder: 'local',
        difficultyScore: 0.6,
        governanceConflicts: ['Conflict A'],
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'conflict-2',
        builder: 'copilot',
        difficultyScore: 0.7,
        governanceConflicts: ['Conflict B'],
        timestamp: new Date().toISOString()
      },
      {
        taskId: 'conflict-3',
        builder: 'local',
        difficultyScore: 0.5,
        governanceConflicts: ['Conflict C'],
        timestamp: new Date().toISOString()
      }
    ]
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    const conflicts = JSON.parse(fs.readFileSync(CONFLICTS_PATH, 'utf-8'))
    assert.strictEqual(conflicts.length, 3)
  })
  
  it('should not create conflicts file when no conflicts reported', async () => {
    const feedback: BuilderFeedback = {
      taskId: 'no-conflict-task',
      builder: 'copilot',
      difficultyScore: 0.3,
      timestamp: new Date().toISOString()
    }
    
    await processFeedback(feedback)
    
    // Conflicts file should not be created
    assert.strictEqual(fs.existsSync(CONFLICTS_PATH), false)
  })
  
  it('should limit conflict history size', async () => {
    // Create more than 200 conflicts
    const feedbacks: BuilderFeedback[] = []
    for (let i = 0; i < 250; i++) {
      feedbacks.push({
        taskId: `conflict-${i}`,
        builder: 'local',
        difficultyScore: 0.5,
        governanceConflicts: [`Conflict ${i}`],
        timestamp: new Date().toISOString()
      })
    }
    
    for (const feedback of feedbacks) {
      await processFeedback(feedback)
    }
    
    const conflicts = JSON.parse(fs.readFileSync(CONFLICTS_PATH, 'utf-8'))
    
    // Should keep only last 200
    assert.strictEqual(conflicts.length, 200)
    
    // Should have most recent conflicts
    assert.strictEqual(conflicts[conflicts.length - 1].taskId, 'conflict-249')
  })
  
  it('should include timestamps in conflict records', async () => {
    const timestamp = new Date().toISOString()
    const feedback: BuilderFeedback = {
      taskId: 'timestamp-test',
      builder: 'local',
      difficultyScore: 0.6,
      governanceConflicts: ['Test conflict'],
      timestamp
    }
    
    await processFeedback(feedback)
    
    const conflicts = JSON.parse(fs.readFileSync(CONFLICTS_PATH, 'utf-8'))
    assert.strictEqual(conflicts[0].timestamp, timestamp)
  })
  
  it('should preserve conflict details across multiple builders', async () => {
    const localFeedback: BuilderFeedback = {
      taskId: 'local-conflict',
      builder: 'local',
      difficultyScore: 0.6,
      governanceConflicts: ['Local builder detected conflict X'],
      timestamp: new Date().toISOString()
    }
    
    const copilotFeedback: BuilderFeedback = {
      taskId: 'copilot-conflict',
      builder: 'copilot',
      difficultyScore: 0.5,
      governanceConflicts: ['Copilot builder detected conflict Y'],
      timestamp: new Date().toISOString()
    }
    
    await processFeedback(localFeedback)
    await processFeedback(copilotFeedback)
    
    const conflicts = JSON.parse(fs.readFileSync(CONFLICTS_PATH, 'utf-8'))
    
    assert.strictEqual(conflicts.length, 2)
    assert.strictEqual(conflicts[0].builder, 'local')
    assert.strictEqual(conflicts[1].builder, 'copilot')
  })
})
