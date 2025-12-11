/**
 * Test Group: PR Creation
 * 
 * These tests validate:
 * - Missing diffs → cannot create PR
 * - PR metadata missing → FAIL
 * - PR creation with empty commit set → FAIL
 * 
 * RED QA: These tests must FAIL initially to ensure
 * PR creation validation is properly enforced.
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  createPRWithEvidence,
  BuilderTask_Extended,
  BuilderRuntimeConfig,
  RuntimeValidation,
  EvidenceRecord
} from '@/lib/foreman/execution/builder-runtime'
import { BuilderTaskOutput } from '@/types/builder'

describe('PR Creation', () => {
  
  const createMockTask = (): BuilderTask_Extended => ({
    id: 'test-pr-1',
    builder: 'ui',
    module: 'test-module',
    taskDescription: 'PR creation test',
    status: 'approved',
    approved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    architecture: {
      title: 'Test Architecture',
      content: 'Complete architecture',
      checklistValidated: true,
      validationTimestamp: new Date().toISOString(),
      completeness: 'complete'
    },
    qaSuite: {
      testCount: 5,
      failingCount: 0,
      status: 'green',
      tests: [
        { name: 'test-1', status: 'passed' }
      ],
      createdAt: new Date().toISOString(),
      executionLog: 'All tests passing'
    },
    acceptanceCriteria: [
      { criterion: 'All tests pass', met: true }
    ],
    buildInstruction: 'Build to Green'
  })
  
  const createMockConfig = (): BuilderRuntimeConfig => ({
    owner: 'test-owner',
    repo: 'test-repo',
    issueNumber: 1,
    branch: 'test-branch',
    builderAgent: 'maturion-builder',
    autoRollback: false,
    governanceMode: 'strict'
  })
  
  const createMockValidation = (): RuntimeValidation => ({
    builderIntegrity: { passed: true },
    taskFormat: { passed: true, violations: [] },
    qaTransition: { passed: true },
    outputCompliance: { passed: true, violations: [] },
    cs5Compliance: { passed: true, violations: [] },
    cs6Compliance: { passed: true, violations: [] }
  })
  
  const createMockEvidence = (): EvidenceRecord[] => [
    {
      type: 'architecture',
      timestamp: new Date().toISOString(),
      description: 'Architecture validated',
      data: {}
    },
    {
      type: 'red-qa',
      timestamp: new Date().toISOString(),
      description: 'Red QA created',
      data: {}
    },
    {
      type: 'green-qa',
      timestamp: new Date().toISOString(),
      description: 'Tests now passing',
      data: {}
    }
  ]
  
  it('should FAIL when trying to create PR with no diffs/artifacts', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    // Output with no artifacts
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [], // Empty - no diffs
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should fail to create PR without diffs')
    assert.ok(result.error, 'Should provide error message')
    assert.ok(
      result.error?.includes('no diffs') || result.error?.includes('no artifacts'),
      'Should report missing diffs'
    )
  })
  
  it('should FAIL when trying to create PR with undefined artifacts', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    // Output with undefined artifacts
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: undefined, // Undefined
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should handle undefined artifacts')
  })
  
  it('should FAIL when PR metadata is missing (task ID)', async () => {
    const task = createMockTask()
    task.id = '' // Missing ID
    
    const config = createMockConfig()
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function complete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should fail without task ID')
  })
  
  it('should FAIL when PR metadata is missing (issue number)', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    config.issueNumber = 0 // Invalid issue number
    
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function complete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should fail without valid issue number')
  })
  
  it('should FAIL when evidence trail is empty', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    const validation = createMockValidation()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function complete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    // Empty evidence trail
    const evidence: EvidenceRecord[] = []
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should fail without evidence trail')
  })
  
  it('should FAIL when validation has failures but PR is attempted', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    const evidence = createMockEvidence()
    
    // Validation with failures
    const validation: RuntimeValidation = {
      builderIntegrity: { passed: true },
      taskFormat: { passed: true, violations: [] },
      qaTransition: { passed: false }, // QA transition failed
      outputCompliance: { passed: true, violations: [] },
      cs5Compliance: { passed: true, violations: [] },
      cs6Compliance: { passed: true, violations: [] }
    }
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function complete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should not create PR with failed validation')
  })
  
  it('should FAIL when trying to create PR with empty commit set', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    // Artifacts exist but content is empty
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'empty.ts',
          path: '/lib/test/empty.ts',
          content: '', // Empty content
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should fail with empty commits')
  })
  
  it('should FAIL when PR title generation is missing task description', async () => {
    const task = createMockTask()
    task.taskDescription = '' // Empty description
    
    const config = createMockConfig()
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function complete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, false, 'Should fail without task description')
  })
  
  it('should successfully create PR with complete valid data', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    const validation = createMockValidation()
    const evidence = createMockEvidence()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function complete() { return "done"; }',
          metadata: {}
        },
        {
          type: 'test',
          name: 'implementation.test.ts',
          path: '/tests/test/implementation.test.ts',
          content: 'test("should work", () => { expect(true).toBe(true); })',
          metadata: {}
        }
      ],
      qaResults: [
        { check: 'all-tests', status: 'passed', message: 'All tests passing' }
      ]
    }
    
    const result = await createPRWithEvidence(task, output, validation, evidence, config)
    
    assert.strictEqual(result.success, true, 'Should create PR successfully')
    assert.ok(result.prUrl, 'Should provide PR URL')
  })
})
