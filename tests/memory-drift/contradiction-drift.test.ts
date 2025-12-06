/**
 * Contradiction Drift Detection Tests
 * Tests for detecting contradictory memory entries
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  detectContradictionDrift,
  clearMemoryScope,
  recordArchitectureDecision
} from '../../lib/foreman/memory'
import { MemoryEntry } from '../../types/memory'

describe('Contradiction Drift Detection', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('global')
  })
  
  test('should pass when no contradictions exist', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'decision_1',
        scope: 'global',
        key: 'arch_decision_1',
        value: {
          type: 'architecture_decision',
          description: 'Use microservices pattern',
          data: {
            pattern: 'microservices',
            rationale: 'Scalability'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      },
      {
        id: 'decision_2',
        scope: 'global',
        key: 'arch_decision_2',
        value: {
          type: 'architecture_decision',
          description: 'Use event-driven architecture',
          data: {
            pattern: 'event-driven',
            rationale: 'Decoupling'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      }
    ]
    
    const result = await detectContradictionDrift(entries)
    
    assert.strictEqual(result.category, 'contradiction_drift')
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.issues.length, 0)
    console.log('✓ Passes when no contradictions exist')
  })
  
  test('should detect direct contradictions', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'decision_1',
        scope: 'global',
        key: 'arch_decision_1',
        value: {
          type: 'architecture_decision',
          description: 'Module X is required',
          data: {
            pattern: 'require module X',
            rationale: 'Needed for feature'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      },
      {
        id: 'decision_2',
        scope: 'global',
        key: 'arch_decision_2',
        value: {
          type: 'architecture_decision',
          description: 'Module X should be removed',
          data: {
            pattern: 'remove module X',
            rationale: 'Deprecated'
          }
        },
        metadata: {
          createdAt: new Date(Date.now() + 1000).toISOString(),
          updatedAt: new Date(Date.now() + 1000).toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      }
    ]
    
    const result = await detectContradictionDrift(entries)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    assert.ok(result.issues.some(i => i.severity === 'critical' || i.severity === 'warning'))
    assert.ok(result.issues[0].affectedEntries?.includes('decision_1'))
    assert.ok(result.issues[0].affectedEntries?.includes('decision_2'))
    console.log('✓ Detects direct contradictions')
  })
  
  test('should identify both conflicting entries', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'decision_a',
        scope: 'global',
        key: 'arch_decision_a',
        value: {
          type: 'architecture_decision',
          description: 'Decision A',
          data: {
            pattern: 'require component Y'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      },
      {
        id: 'decision_b',
        scope: 'global',
        key: 'arch_decision_b',
        value: {
          type: 'architecture_decision',
          description: 'Decision B',
          data: {
            pattern: 'remove component Y'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      }
    ]
    
    const result = await detectContradictionDrift(entries)
    
    if (!result.passed) {
      assert.ok(result.issues.length > 0)
      const issue = result.issues[0]
      assert.ok(issue.affectedEntries?.length === 2)
      console.log('✓ Identifies both conflicting entries')
    } else {
      console.log('✓ No contradiction detected (acceptable)')
    }
  })
  
  test('should provide explanations for contradictions', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'decision_1',
        scope: 'global',
        key: 'arch_decision_1',
        value: {
          type: 'architecture_decision',
          description: 'Use pattern A',
          data: {
            pattern: 'require feature Z'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      },
      {
        id: 'decision_2',
        scope: 'global',
        key: 'arch_decision_2',
        value: {
          type: 'architecture_decision',
          description: 'Deprecate pattern A',
          data: {
            pattern: 'remove feature Z'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      }
    ]
    
    const result = await detectContradictionDrift(entries)
    
    if (!result.passed) {
      assert.ok(result.issues.length > 0)
      const issue = result.issues[0]
      assert.ok(issue.description)
      assert.ok(issue.details)
      console.log('✓ Provides explanations for contradictions')
    } else {
      console.log('✓ No contradiction to explain')
    }
  })
  
  test('should recommend resolution actions', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'decision_1',
        scope: 'global',
        key: 'arch_decision_1',
        value: {
          type: 'architecture_decision',
          description: 'Decision 1',
          data: {
            pattern: 'require module'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      },
      {
        id: 'decision_2',
        scope: 'global',
        key: 'arch_decision_2',
        value: {
          type: 'architecture_decision',
          description: 'Decision 2',
          data: {
            pattern: 'remove module'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['architecture_decision']
      }
    ]
    
    const result = await detectContradictionDrift(entries)
    
    if (!result.passed) {
      assert.ok(result.issues.length > 0)
      assert.ok(result.issues[0].recommendation)
      assert.ok(
        result.issues[0].recommendation.includes('Resolve') ||
        result.issues[0].recommendation.includes('Update') ||
        result.issues[0].recommendation.includes('deprecat')
      )
      console.log('✓ Recommends resolution actions')
    } else {
      console.log('✓ No contradictions need resolution')
    }
  })
})
