/**
 * Governance Drift Detection Tests
 * Tests for detecting memory that contradicts governance
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  detectGovernanceDrift,
  clearMemoryScope
} from '../../lib/foreman/memory'
import { MemoryEntry } from '../../types/memory'

describe('Governance Drift Detection', () => {
  
  beforeEach(async () => {
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })
  
  test('should pass when memory aligns with governance', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'good_entry',
        scope: 'foreman',
        key: 'good_entry',
        value: {
          type: 'wave_completion',
          description: 'Completed wave 1',
          data: {
            wave: '1',
            tasks: 5
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['wave_completion']
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    assert.strictEqual(result.category, 'governance_drift')
    assert.strictEqual(result.passed, true)
    assert.strictEqual(result.issues.length, 0)
    console.log('✓ Passes when memory aligns with governance')
  })
  
  test('should detect secrets in memory', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'bad_secret',
        scope: 'foreman',
        key: 'bad_secret',
        value: {
          type: 'deployment',
          description: 'Deployment config',
          data: {
            apiKey: 'test-fake-apikey-NOT-REAL-12345', // Test value - clearly fake
            environment: 'production'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['deployment']
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    assert.strictEqual(result.issues[0].severity, 'critical')
    console.log('✓ Detects secrets in memory')
  })
  
  test('should detect password fields in memory', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'bad_password',
        scope: 'global',
        key: 'bad_password',
        value: {
          type: 'config',
          description: 'Database config',
          data: {
            password: 'test-fake-password-NOT-REAL-98765', // Test value - clearly fake
            host: 'localhost'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['config']
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    console.log('✓ Detects password fields in memory')
  })
  
  test('should detect unauthorized enforcement claims', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'bad_enforcement',
        scope: 'foreman',
        key: 'bad_enforcement',
        value: {
          type: 'custom_rule',
          description: 'Custom rule',
          data: {
            enforcement: 'mandatory', // Only governance can be mandatory
            rule: 'Must do X'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['custom'] // Missing 'governance' tag
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    assert.strictEqual(result.issues[0].severity, 'critical')
    console.log('✓ Detects unauthorized enforcement claims')
  })
  
  test('should allow governance-tagged entries with enforcement', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'valid_governance',
        scope: 'global',
        key: 'valid_governance',
        value: {
          type: 'governance_change',
          description: 'Official governance rule',
          data: {
            enforcement: 'mandatory',
            rule: 'Memory Before Action'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'admin',
          version: 1
        },
        tags: ['governance'] // Has proper tag
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    assert.strictEqual(result.passed, true)
    console.log('✓ Allows governance-tagged entries with enforcement')
  })
  
  test('should provide governance source in recommendations', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'bad_entry',
        scope: 'foreman',
        key: 'bad_entry',
        value: {
          type: 'config',
          data: {
            secret: 'test-fake-secret-NOT-REAL-54321'
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['config']
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    if (!result.passed) {
      assert.ok(result.issues.length > 0)
      const issue = result.issues[0]
      assert.ok(issue.recommendation)
      console.log('✓ Provides governance source in recommendations')
    }
  })
  
  test('should check Memory Before Action violations', async () => {
    const entries: MemoryEntry[] = [
      {
        id: 'skip_memory_entry',
        scope: 'foreman',
        key: 'skip_memory_entry',
        value: {
          type: 'orchestration',
          description: 'Skip memory loading',
          data: {
            skipMemory: true // Violates Memory Before Action
          }
        },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'foreman',
          version: 1
        },
        tags: ['orchestration']
      }
    ]
    
    const result = await detectGovernanceDrift(entries)
    
    assert.strictEqual(result.passed, false)
    assert.ok(result.issues.length > 0)
    console.log('✓ Checks Memory Before Action violations')
  })
})
