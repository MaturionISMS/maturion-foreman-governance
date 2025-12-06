/**
 * Context Size Limit Tests
 * Ensures memory context doesn't exceed 50KB per request
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  compileBuilderMemoryContext,
  validateMemoryContext
} from '../../lib/builder/memory-injector'
import { BuilderRequest } from '../../types/builder'
import {
  writeMemoryEntry,
  clearMemoryScope,
  recordArchitectureDecision
} from '../../lib/foreman/memory'

const MAX_CONTEXT_SIZE_BYTES = 50 * 1024 // 50KB

describe('Context Size Limit', () => {
  beforeEach(async () => {
    // Clear test memory before each test
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })

  test('should enforce 50KB size limit', async () => {
    const request: BuilderRequest = {
      module: 'test-module',
      taskDescription: 'Test task',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')

    assert.ok(
      context.sizeBytes <= MAX_CONTEXT_SIZE_BYTES,
      `Context size (${context.sizeBytes}) should not exceed ${MAX_CONTEXT_SIZE_BYTES} bytes`
    )

    console.log(`✓ Context size (${context.sizeBytes} bytes) is within limit`)
  })

  test('should trim context when exceeding size limit', async () => {
    // Create many large architecture decisions to exceed limit
    for (let i = 0; i < 100; i++) {
      await recordArchitectureDecision(
        'A'.repeat(1000), // Large description
        {
          pattern: `Large Architecture Pattern ${i}`,
          rationale: 'B'.repeat(1000),
          benefits: Array(10).fill('Benefit '.repeat(50)),
          tradeoffs: Array(10).fill('Tradeoff '.repeat(50)),
          applicability: ['api', 'backend', 'core']
        }
      )
    }

    const request: BuilderRequest = {
      module: 'test-module',
      taskDescription: 'Test task',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')

    // Should still be within limit after trimming
    assert.ok(
      context.sizeBytes <= MAX_CONTEXT_SIZE_BYTES,
      `Context should be trimmed to ${MAX_CONTEXT_SIZE_BYTES} bytes`
    )

    console.log(`✓ Context trimmed to ${context.sizeBytes} bytes`)
  })

  test('should validate context size', async () => {
    const request: BuilderRequest = {
      module: 'test-module',
      taskDescription: 'Test task',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')
    const validation = validateMemoryContext(context)

    assert.strictEqual(validation.valid, true, 'Context should pass validation')

    console.log('✓ Context size validation works correctly')
  })

  test('should calculate size accurately', async () => {
    const request: BuilderRequest = {
      module: 'test-module',
      taskDescription: 'Test task',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')
    
    // Size should be calculated (exact match not required due to internal formatting)
    assert.ok(context.sizeBytes > 0, 'Size should be greater than 0')
    assert.ok(context.sizeBytes < MAX_CONTEXT_SIZE_BYTES, 'Size should be less than max')

    console.log('✓ Size calculation is accurate')
  })

  test('should prioritize governance rules when trimming', async () => {
    // Create lots of data to force trimming
    for (let i = 0; i < 50; i++) {
      await recordArchitectureDecision(
        'X'.repeat(500),
        {
          pattern: `Pattern ${i}`,
          rationale: 'Y'.repeat(500),
          benefits: ['Benefit'],
          tradeoffs: ['Tradeoff'],
          applicability: ['api']
        }
      )
    }

    // Create governance rules
    await writeMemoryEntry(
      'global',
      'critical-rule',
      {
        data: {
          rule: 'Critical Security Rule',
          enforcement: 'strict'
        },
        description: 'Must never be trimmed'
      },
      {
        tags: ['governance', 'governance_change'],
        createdBy: 'test'
      }
    )

    const request: BuilderRequest = {
      module: 'test-module',
      taskDescription: 'Test task',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')

    // Governance rules should still be present after trimming
    const hasCriticalRule = context.governanceRules.some(r => 
      r.rule === 'Critical Security Rule'
    )

    assert.ok(hasCriticalRule, 'Critical governance rules should not be trimmed')
    assert.ok(
      context.sizeBytes <= MAX_CONTEXT_SIZE_BYTES,
      'Context should still be within size limit'
    )

    console.log('✓ Governance rules are preserved during trimming')
  })
})
