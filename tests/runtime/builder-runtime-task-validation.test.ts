/**
 * Test Group: Task Validation
 * 
 * These tests validate:
 * - Missing architecture → FAIL
 * - Missing Red QA → FAIL
 * - Red QA that is not failing → FAIL
 * - buildInstruction not exactly "Build to Green" → FAIL
 * 
 * RED QA: These tests must FAIL initially to ensure
 * proper task validation enforcement.
 */

import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  validateTaskFormat,
  prepareBuilderTask,
  BuilderTask_Extended
} from '@/lib/foreman/execution/builder-runtime'

describe('Task Validation', () => {
  
  const createMockTask = (overrides?: Partial<BuilderTask_Extended>): BuilderTask_Extended => ({
    id: 'test-task-validation',
    builder: 'ui',
    module: 'test-module',
    taskDescription: 'Task validation test',
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
      status: 'red',
      tests: [
        { name: 'test-1', status: 'failed', message: 'Not implemented' },
        { name: 'test-2', status: 'failed', message: 'Not implemented' }
      ],
      createdAt: new Date().toISOString(),
      executionLog: 'All tests failing'
    },
    acceptanceCriteria: [
      { criterion: 'All tests pass', met: false },
      { criterion: 'No lint errors', met: false }
    ],
    buildInstruction: 'Build to Green',
    ...overrides
  })
  
  it('should FAIL when architecture is missing', () => {
    const task = createMockTask({ architecture: undefined as any })
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for missing architecture')
    assert.ok(
      result.violations.some(v => v.includes('Architecture document missing')),
      'Should report missing architecture'
    )
  })
  
  it('should FAIL when architecture is not checklist-validated', () => {
    const task = createMockTask({
      architecture: {
        title: 'Test',
        content: 'Content',
        checklistValidated: false, // Not validated
        validationTimestamp: new Date().toISOString(),
        completeness: 'complete'
      }
    })
    
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for unvalidated architecture')
    assert.ok(
      result.violations.some(v => v.includes('not validated against checklist')),
      'Should report unvalidated architecture'
    )
  })
  
  it('should FAIL when architecture is incomplete', () => {
    const task = createMockTask({
      architecture: {
        title: 'Test',
        content: 'Partial content',
        checklistValidated: true,
        validationTimestamp: new Date().toISOString(),
        completeness: 'incomplete' // Marked as incomplete
      }
    })
    
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for incomplete architecture')
    assert.ok(
      result.violations.some(v => v.includes('incomplete')),
      'Should report incomplete architecture'
    )
  })
  
  it('should FAIL when Red QA is missing', () => {
    const task = createMockTask({ qaSuite: undefined as any })
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for missing QA suite')
    assert.ok(
      result.violations.some(v => v.includes('QA suite missing')),
      'Should report missing QA suite'
    )
  })
  
  it('should FAIL when QA suite is not RED (failing)', () => {
    const task = createMockTask({
      qaSuite: {
        testCount: 5,
        failingCount: 0, // No failures
        status: 'green', // Passing
        tests: [
          { name: 'test-1', status: 'passed' }
        ],
        createdAt: new Date().toISOString(),
        executionLog: 'All tests passing'
      }
    })
    
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for green QA')
    assert.ok(
      result.violations.some(v => v.includes('must be "red"')),
      'Should require RED QA status'
    )
  })
  
  it('should FAIL when QA has zero failing tests', () => {
    const task = createMockTask({
      qaSuite: {
        testCount: 5,
        failingCount: 0, // Zero failures
        status: 'red', // Status is red but no failures
        tests: [],
        createdAt: new Date().toISOString(),
        executionLog: 'Inconsistent state'
      }
    })
    
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail when no tests are failing')
    assert.ok(
      result.violations.some(v => v.includes('no failing tests')),
      'Should require failing tests'
    )
  })
  
  it('should FAIL when buildInstruction is not exactly "Build to Green"', () => {
    const task = createMockTask({ buildInstruction: 'Build the feature' as any })
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for wrong instruction')
    assert.ok(
      result.violations.some(v => v.includes('Invalid build instruction')),
      'Should reject non-standard instruction'
    )
  })
  
  it('should FAIL when acceptance criteria are missing', () => {
    const task = createMockTask({ acceptanceCriteria: [] })
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for missing acceptance criteria')
    assert.ok(
      result.violations.some(v => v.includes('Acceptance criteria missing')),
      'Should require acceptance criteria'
    )
  })
  
  it('should FAIL when acceptance criteria are undefined', () => {
    const task = createMockTask({ acceptanceCriteria: undefined as any })
    const result = validateTaskFormat(task)
    
    assert.strictEqual(result.valid, false, 'Should fail for undefined acceptance criteria')
  })
  
  it('should successfully prepare a valid Build to Green task', () => {
    const task = createMockTask()
    const result = prepareBuilderTask(task)
    
    assert.strictEqual(result.valid, true, 'Should prepare valid task')
    assert.ok(result.payload, 'Should create payload')
    assert.strictEqual(result.payload.buildInstruction, 'Build to Green')
  })
})
