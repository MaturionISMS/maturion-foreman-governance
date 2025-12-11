/**
 * Test Group: Output Validation
 * 
 * These tests validate:
 * - Red QA → remains red → FAIL
 * - Output modifies forbidden paths → FAIL
 * - Output contains TODO comments → FAIL
 * - Output contains lint/type errors → FAIL
 * 
 * RED QA: These tests must FAIL initially to ensure
 * output validation is properly enforced.
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  validateBuilderOutput,
  enforceCS5,
  BuilderTask_Extended,
  BuilderRuntimeConfig
} from '@/lib/foreman/execution/builder-runtime'
import { BuilderTaskOutput } from '@/types/builder'

describe('Output Validation', () => {
  
  const createMockTask = (): BuilderTask_Extended => ({
    id: 'test-validation-1',
    builder: 'ui',
    module: 'test-module',
    taskDescription: 'Output validation test',
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
      failingCount: 5,
      status: 'red', // Initial RED status
      tests: [
        { name: 'test-1', status: 'failed', message: 'Not implemented' }
      ],
      createdAt: new Date().toISOString(),
      executionLog: 'Tests failing'
    },
    acceptanceCriteria: [
      { criterion: 'All tests pass', met: false },
      { criterion: 'No lint errors', met: false }
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
  
  it('should FAIL when Red QA remains red after build', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'implementation.ts',
          path: '/lib/test/implementation.ts',
          content: 'function incomplete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    // Simulate QA still being red after build
    process.env.SIMULATE_QA_STILL_RED = 'true'
    
    try {
      const result = await validateBuilderOutput(output, task, config)
      
      assert.strictEqual(result.valid, false, 'Should fail when QA is still red')
      assert.strictEqual(result.qaTransition.achieved, false, 'QA transition should not be achieved')
      assert.ok(
        result.violations.some(v => v.includes('did not transition')),
        'Should report failed transition'
      )
      
    } finally {
      delete process.env.SIMULATE_QA_STILL_RED
    }
  })
  
  it('should FAIL when output modifies forbidden paths (workflows)', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'workflow-change.yml',
          path: '.github/workflows/ci.yml', // FORBIDDEN PATH
          content: 'Modified workflow',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await validateBuilderOutput(output, task, config)
    
    assert.strictEqual(result.valid, false, 'Should fail for forbidden path modification')
    assert.ok(
      result.violations.some(v => v.includes('Protected paths modified')),
      'Should detect workflow modification'
    )
  })
  
  it('should FAIL when output modifies forbidden paths (constitution)', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'constitution-change.md',
          path: 'foreman/constitution/rules.md', // FORBIDDEN PATH
          content: 'Modified rules',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await validateBuilderOutput(output, task, config)
    
    assert.strictEqual(result.valid, false, 'Should fail for constitution modification')
    assert.ok(
      result.violations.some(v => v.includes('Protected paths modified')),
      'Should detect constitution modification'
    )
  })
  
  it('should FAIL when output modifies forbidden paths (BUILD_PHILOSOPHY)', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'philosophy-change.md',
          path: 'BUILD_PHILOSOPHY.md', // FORBIDDEN PATH
          content: 'Modified philosophy',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = await validateBuilderOutput(output, task, config)
    
    assert.strictEqual(result.valid, false, 'Should fail for BUILD_PHILOSOPHY modification')
  })
  
  it('should FAIL when output contains TODO comments', () => {
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'incomplete.ts',
          content: '// TODO: Implement this function\nfunction incomplete() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = enforceCS5(output)
    
    assert.strictEqual(result.passed, false, 'CS5 should fail for TODO comments')
    assert.ok(result.violations.length > 0, 'Should have violations')
    assert.ok(
      result.violations.some(v => v.includes('TODO')),
      'Should detect TODO comment'
    )
  })
  
  it('should FAIL when output contains FIXME comments', () => {
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'buggy.ts',
          content: '// FIXME: This needs to be fixed\nfunction buggy() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = enforceCS5(output)
    
    assert.strictEqual(result.passed, false, 'CS5 should fail for FIXME comments')
    assert.ok(
      result.violations.some(v => v.includes('FIXME')),
      'Should detect FIXME comment'
    )
  })
  
  it('should FAIL when output contains HACK comments', () => {
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'hacky.ts',
          content: '// HACK: Temporary workaround\nfunction hacky() {}',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    const result = enforceCS5(output)
    
    assert.strictEqual(result.passed, false, 'CS5 should fail for HACK comments')
  })
  
  it('should FAIL when output contains lint errors', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'linting-issue.ts',
          path: '/lib/test/linting-issue.ts',
          content: 'const unused = "variable";\nfunction noReturn() { }',
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    // Simulate lint failure
    process.env.SIMULATE_LINT_FAILURE = 'true'
    
    try {
      const result = await validateBuilderOutput(output, task, config)
      
      assert.strictEqual(result.valid, false, 'Should fail when lint errors present')
      assert.ok(
        result.violations.some(v => v.includes('Lint')),
        'Should report lint failures'
      )
      
    } finally {
      delete process.env.SIMULATE_LINT_FAILURE
    }
  })
  
  it('should FAIL when output contains type errors', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'type-issue.ts',
          path: '/lib/test/type-issue.ts',
          content: 'const x: string = 123;', // Type error
          metadata: {}
        }
      ],
      qaResults: []
    }
    
    // Simulate type check failure
    process.env.SIMULATE_TYPECHECK_FAILURE = 'true'
    
    try {
      const result = await validateBuilderOutput(output, task, config)
      
      assert.strictEqual(result.valid, false, 'Should fail when type errors present')
      assert.ok(
        result.violations.some(v => v.includes('Type check')),
        'Should report type check failures'
      )
      
    } finally {
      delete process.env.SIMULATE_TYPECHECK_FAILURE
    }
  })
  
  it('should successfully validate clean output with Green QA', async () => {
    const task = createMockTask()
    const config = createMockConfig()
    
    const output: BuilderTaskOutput = {
      success: true,
      artifacts: [
        {
          type: 'code',
          name: 'clean-implementation.ts',
          path: '/lib/test/clean-implementation.ts',
          content: 'function complete() { return "done"; }',
          metadata: {}
        }
      ],
      qaResults: [
        { check: 'all-tests', status: 'passed', message: 'All tests passing' }
      ]
    }
    
    // Clean environment
    delete process.env.SIMULATE_QA_STILL_RED
    delete process.env.SIMULATE_LINT_FAILURE
    delete process.env.SIMULATE_TYPECHECK_FAILURE
    
    const result = await validateBuilderOutput(output, task, config)
    
    assert.strictEqual(result.valid, true, 'Should pass for clean output')
    assert.strictEqual(result.qaTransition.achieved, true, 'QA should transition to green')
  })
})
