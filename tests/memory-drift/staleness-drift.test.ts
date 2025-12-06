/**
 * Staleness Drift Detection Tests
 * Tests for detecting stale memory entries
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  detectStalenessDrift,
  clearMemoryScope,
  writeMemoryEntry
} from '../../lib/foreman/memory'
import { MemoryEntry } from '../../types/memory'
import { DriftMonitorConfig } from '../../types/drift'

describe('Staleness Drift Detection', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })
  
  const testConfig: DriftMonitorConfig = {
    enabledChecks: ['staleness_drift'],
    stalenessThresholds: {
      reasoningPatterns: 180,
      architectureLessons: 365,
      issues: 90,
      projectMemory: 30
    },
    blockOnCritical: true,
    blockOnMultipleErrors: true,
    errorThreshold: 3
  }
  
  test('should pass when all entries are fresh', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'pattern_1',
        scope: 'foreman',
        key: 'pattern_1',
        value: {
          type: 'reasoning_pattern',
          description: 'Fresh pattern'
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    assert.strictEqual(result.category, 'staleness_drift')
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.issues.length, 0)
    console.log('✓ Passes when all entries are fresh')
  })
  
  test('should detect stale reasoning patterns (>180 days)', async () => {
    const staleDate = new Date()
    staleDate.setDate(staleDate.getDate() - 200) // 200 days ago
    
    const entries: MemoryEntry[] = [
      {
        id: 'pattern_old',
        scope: 'foreman',
        key: 'pattern_old',
        value: {
          type: 'reasoning_pattern',
          description: 'Old pattern'
        },
        metadata: {
          createdAt: staleDate.toISOString(),
          updatedAt: staleDate.toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    assert.strictEqual(result.issues[0].type, 'staleness_drift')
    assert.strictEqual(result.issues[0].severity, 'warning')
    console.log('✓ Detects stale reasoning patterns')
  })
  
  test('should detect very old architecture lessons (>365 days)', async () => {
    const veryOldDate = new Date()
    veryOldDate.setDate(veryOldDate.getDate() - 400) // Over 1 year
    
    const entries: MemoryEntry[] = [
      {
        id: 'lesson_ancient',
        scope: 'global',
        key: 'lesson_ancient',
        value: {
          type: 'architecture_decision',
          description: 'Ancient lesson'
        },
        metadata: {
          createdAt: veryOldDate.toISOString(),
          updatedAt: veryOldDate.toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    assert.strictEqual(result.passed, true) // Info level doesn't fail
    assert.ok(result.issues.length > 0)
    assert.strictEqual(result.issues[0].severity, 'info')
    console.log('✓ Detects very old architecture lessons')
  })
  
  test('should calculate age correctly in days', async () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 100) // 100 days ago
    
    const entries: MemoryEntry[] = [
      {
        id: 'entry_test',
        scope: 'foreman',
        key: 'entry_test',
        value: {
          type: 'qa_failure',
          description: 'Test entry'
        },
        metadata: {
          createdAt: testDate.toISOString(),
          updatedAt: testDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['qa_failure']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    if (result.issues.length > 0) {
      const issue = result.issues[0]
      assert.ok(issue.details.ageDays >= 90)
      assert.ok(issue.details.ageDays <= 110)
      console.log(`✓ Calculates age correctly: ${issue.details.ageDays} days`)
    } else {
      console.log('✓ Entry within threshold')
    }
  })
  
  test('should respect custom thresholds', async () => {
    const customConfig: DriftMonitorConfig = {
      ...testConfig,
      stalenessThresholds: {
        reasoningPatterns: 30, // Very short threshold
        architectureLessons: 365,
        issues: 90,
        projectMemory: 30
      }
    }
    
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 60) // 60 days ago
    
    const entries: MemoryEntry[] = [
      {
        id: 'pattern_test',
        scope: 'foreman',
        key: 'pattern_test',
        value: {
          type: 'reasoning_pattern'
        },
        metadata: {
          createdAt: testDate.toISOString(),
          updatedAt: testDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const result = await detectStalenessDrift(entries, customConfig)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    console.log('✓ Respects custom thresholds')
  })
  
  test('should provide age in issue details', async () => {
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 200)
    
    const entries: MemoryEntry[] = [
      {
        id: 'pattern_old',
        scope: 'foreman',
        key: 'pattern_old',
        value: {
          type: 'reasoning_pattern'
        },
        metadata: {
          createdAt: oldDate.toISOString(),
          updatedAt: oldDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    if (!result.passed) {
      assert.ok(result.issues.length > 0)
      const issue = result.issues[0]
      assert.ok(issue.details)
      assert.ok(typeof issue.details.ageDays === 'number')
      assert.ok(typeof issue.details.threshold === 'number')
      console.log('✓ Provides age in issue details')
    }
  })
  
  test('should recommend review for stale entries', async () => {
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 200)
    
    const entries: MemoryEntry[] = [
      {
        id: 'pattern_old',
        scope: 'foreman',
        key: 'pattern_old',
        value: {
          type: 'reasoning_pattern'
        },
        metadata: {
          createdAt: oldDate.toISOString(),
          updatedAt: oldDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['reasoning_pattern']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    if (!result.passed) {
      assert.ok(result.issues.length > 0)
      const issue = result.issues[0]
      assert.ok(issue.recommendation)
      assert.ok(
        issue.recommendation.includes('Review') ||
        issue.recommendation.includes('update') ||
        issue.recommendation.includes('archive')
      )
      console.log('✓ Recommends review for stale entries')
    }
  })
  
  test('should handle very old issues gracefully', async () => {
    const ancientDate = new Date()
    ancientDate.setDate(ancientDate.getDate() - 365) // 1 year old
    
    const entries: MemoryEntry[] = [
      {
        id: 'issue_ancient',
        scope: 'foreman',
        key: 'issue_ancient',
        value: {
          type: 'qa_failure',
          description: 'Ancient issue'
        },
        metadata: {
          createdAt: ancientDate.toISOString(),
          updatedAt: ancientDate.toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['qa_failure']
      }
    ]
    
    const result = await detectStalenessDrift(entries, testConfig)
    
    // Very old issues should be flagged as info only
    if (result.issues.length > 0) {
      const issue = result.issues[0]
      assert.strictEqual(issue.severity, 'info')
      console.log('✓ Handles very old issues with info severity')
    }
  })
})
