/**
 * End-to-End Build Flow Tests
 * Tests complete flow: Chat → Reasoning → Memory Injection → Builder → PR
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  dispatchBuilderTask,
  executeBuilderTask
} from '../../lib/foreman/dispatch'
import {
  compileBuilderMemoryContext,
  formatMemoryForBuilder
} from '../../lib/builder/memory-injector'
import { generatePRDescription, assemblePRContext } from '../../lib/github/pr-builder'
import { BuilderRequest } from '../../types/builder'
import {
  writeMemoryEntry,
  clearMemoryScope,
  recordArchitectureDecision,
  recordQAFailure
} from '../../lib/foreman/memory'

describe('End-to-End Build Flow', () => {
  beforeEach(async () => {
    // Clear test memory before each test
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
    
    // Reset autonomous mode
    delete process.env.MATURION_AUTONOMOUS_MODE
  })

  test('should execute full build flow with memory context', async () => {
    // Enable autonomous mode for test
    process.env.MATURION_AUTONOMOUS_MODE = 'true'
    
    // Step 1: Set up memory (simulate past learnings)
    await recordArchitectureDecision(
      'Use reusable components',
      {
        pattern: 'Component-Based Architecture',
        rationale: 'Better maintainability',
        benefits: ['Reusability', 'Testability'],
        tradeoffs: ['Initial complexity'],
        applicability: ['ui', 'components']
      }
    )

    await writeMemoryEntry(
      'global',
      'governance-testing',
      {
        data: {
          rule: 'All code must have tests',
          enforcement: 'strict'
        },
        description: 'Test coverage required'
      },
      {
        tags: ['governance', 'governance_change'],
        createdBy: 'test'
      }
    )

    // Step 2: Create builder request (simulates chat command)
    const request: BuilderRequest = {
      module: 'user-profile',
      taskDescription: 'Create user profile component',
      organisationId: 'test-org',
      metadata: {
        wave: 'wave-1',
        projectId: 'test-project'
      }
    }

    // Step 3: Dispatch task (includes memory injection)
    const task = await dispatchBuilderTask('ui', request)

    assert.ok(task, 'Task should be created')
    assert.ok(task.memoryContext, 'Task should have memory context')

    // Verify memory context includes relevant data
    assert.ok(
      task.memoryContext.architectureLessons.length > 0,
      'Should include architecture lessons'
    )
    assert.ok(
      task.memoryContext.governanceRules.length > 0,
      'Should include governance rules'
    )

    console.log('✓ Step 1-3: Task created with memory context')

    // Step 4: Execute task (simulates builder execution)
    const executedTask = await executeBuilderTask(task.id)

    assert.strictEqual(executedTask.status, 'completed', 'Task should complete')
    assert.ok(executedTask.output, 'Task should have output')

    console.log('✓ Step 4: Task executed successfully')

    // Step 5: Generate PR (includes memory references)
    const prContext = assemblePRContext(
      [executedTask],
      executedTask.output!.qaResults || [],
      'Implemented user profile component based on memory guidance'
    )

    const prDescription = generatePRDescription(prContext)

    // Verify PR includes memory context
    assert.ok(prDescription.includes('Memory Context'), 'PR should mention memory context')
    assert.ok(prDescription.includes('Governance Rules'), 'PR should include governance rules')

    console.log('✓ Step 5: PR generated with memory context')
    console.log('✓ Full end-to-end flow completed successfully')
  })

  test('should reference memory in builder reasoning', async () => {
    // Create QA failure memory
    await recordQAFailure(
      'Missing error handling in API calls',
      {
        resolution: 'Added try-catch blocks',
        timestamp: new Date().toISOString(),
        createdBy: 'test'
      }
    )

    const request: BuilderRequest = {
      module: 'api-client',
      taskDescription: 'Build API client',
      organisationId: 'test-org'
    }

    const task = await dispatchBuilderTask('api', request)

    // Builder should receive QA insights from past failures if any exist in memory
    // For this test, we'll just verify the structure
    assert.ok(task.memoryContext, 'Builder should have memory context')
    assert.ok(Array.isArray(task.memoryContext.qaInsights), 'QA insights should be an array')

    console.log('✓ Builder receives memory context with QA insights structure')
  })

  test('should format memory for builder consumption', async () => {
    await recordArchitectureDecision(
      'Use try-catch for async operations',
      {
        pattern: 'Error Handling Pattern',
        rationale: 'Prevent unhandled promise rejections',
        benefits: ['Better error handling'],
        tradeoffs: ['More code'],
        applicability: ['api', 'backend']
      }
    )

    const request: BuilderRequest = {
      module: 'error-handling',
      taskDescription: 'Implement error handling',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')
    const formatted = formatMemoryForBuilder(context)

    // Verify formatted output is readable
    assert.ok(formatted.includes('# Memory Context for Builder'), 'Should have header')
    assert.ok(formatted.length > 0, 'Should have content')

    console.log('✓ Memory formatted correctly for builder')
  })

  test('should track memory references in PR', async () => {
    // Create multiple memory entries
    await recordArchitectureDecision(
      'Use v1, v2 URL prefixes',
      {
        pattern: 'API Versioning',
        rationale: 'Backward compatibility',
        benefits: ['No breaking changes'],
        tradeoffs: ['More endpoints'],
        applicability: ['api']
      }
    )

    const request: BuilderRequest = {
      module: 'api-versioning',
      taskDescription: 'Implement API versioning',
      organisationId: 'test-org'
    }

    const task = await dispatchBuilderTask('api', request)

    // Memory references should be tracked
    assert.ok(
      task.memoryContext?.memoryReferences && task.memoryContext.memoryReferences.length > 0,
      'Should track memory references'
    )

    console.log(`✓ Tracked ${task.memoryContext?.memoryReferences.length} memory references`)
  })

  test('should prevent contradictory changes via memory', async () => {
    // Create architecture decision
    await writeMemoryEntry(
      'global',
      'no-class-components',
      {
        data: {
          rule: 'No class components',
          enforcement: 'strict'
        },
        description: 'Use only functional components'
      },
      {
        tags: ['governance', 'governance_change', 'architecture'],
        createdBy: 'test'
      }
    )

    const request: BuilderRequest = {
      module: 'components',
      taskDescription: 'Create new component',
      organisationId: 'test-org'
    }

    const task = await dispatchBuilderTask('ui', request)

    // Task should include the governance rule
    const hasRule = task.memoryContext?.governanceRules.some(r =>
      r.rule.includes('No class components')
    )

    assert.ok(hasRule, 'Builder should receive governance rule to prevent violation')

    console.log('✓ Memory prevents contradictory changes via governance')
  })

  test('should compile minimal memory for simple tasks', async () => {
    // Simple task with no specific memory
    const request: BuilderRequest = {
      module: 'simple-util',
      taskDescription: 'Add utility function',
      organisationId: 'test-org'
    }

    const context = await compileBuilderMemoryContext(request, 'api')

    // Should still compile context, even if minimal
    assert.ok(context, 'Should compile context')
    assert.ok(context.sizeBytes > 0, 'Context should have size')
    assert.ok(context.compiledAt, 'Context should have timestamp')

    console.log(`✓ Minimal context compiled (${context.sizeBytes} bytes)`)
  })
})
