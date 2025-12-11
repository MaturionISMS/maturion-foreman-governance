/**
 * Tests for Builder Runtime Engine
 * 
 * Validates:
 * - Builder agent loading and integrity validation
 * - Task format validation (Build to Green)
 * - Architecture and Red QA validation
 * - CS5 enforcement (no TODOs)
 * - CS6 enforcement (external builder blocking)
 * - Evidence trail creation
 */

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  loadBuilderAgent,
  validateBuilderIntegrity,
  validateTaskFormat,
  prepareBuilderTask,
  enforceCS5,
  enforceCS6,
  BuilderTask_Extended,
  ArchitectureDocument,
  RedQASuite,
  AcceptanceCriteria
} from '../../lib/foreman/execution/builder-runtime'

describe('Builder Runtime Engine', () => {
  
  describe('Layer 1: Builder Loading', () => {
    it('should load maturion-builder agent', async () => {
      const agent = await loadBuilderAgent('maturion-builder')
      
      assert.ok(agent, 'Agent should be loaded')
      assert.strictEqual(agent.loaded, true, 'Agent should be marked as loaded')
      assert.strictEqual(agent.validated, true, 'Agent should be validated')
      assert.ok(agent.hash, 'Agent should have a hash')
      assert.ok(agent.hash.length > 0, 'Hash should not be empty')
    })
    
    it('should validate builder integrity', () => {
      const agentPath = path.join(process.cwd(), '.github', 'agents', 'maturion-builder.agent.md')
      const result = validateBuilderIntegrity(agentPath)
      
      assert.ok(result, 'Validation result should exist')
      assert.strictEqual(result.valid, true, 'Builder agent should be valid')
      assert.ok(!result.error, 'Should not have errors')
    })
    
    it('should fail validation for missing builder agent', () => {
      const fakePath = path.join(process.cwd(), '.github', 'agents', 'nonexistent.agent.md')
      const result = validateBuilderIntegrity(fakePath)
      
      assert.strictEqual(result.valid, false, 'Should fail for missing file')
      assert.ok(result.error, 'Should have error message')
    })
  })
  
  describe('Layer 2: Task Preparation', () => {
    const createMockTask = (overrides?: Partial<BuilderTask_Extended>): BuilderTask_Extended => ({
      id: 'test-task-1',
      builder: 'ui' as const,
      module: 'test-module',
      taskDescription: 'Test task',
      status: 'approved' as const,
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      architecture: {
        title: 'Test Architecture',
        content: 'Complete architecture document',
        checklistValidated: true,
        validationTimestamp: new Date().toISOString(),
        completeness: 'complete' as const
      },
      qaSuite: {
        testCount: 10,
        failingCount: 5,
        status: 'red' as const,
        tests: [
          { name: 'test-1', status: 'failed' as const, message: 'Not implemented' }
        ],
        createdAt: new Date().toISOString(),
        executionLog: 'Test execution log'
      },
      acceptanceCriteria: [
        { criterion: 'All tests pass', met: false }
      ],
      buildInstruction: 'Build to Green' as const,
      ...overrides
    })
    
    it('should validate correct Build to Green task', () => {
      const task = createMockTask()
      const result = validateTaskFormat(task)
      
      assert.strictEqual(result.valid, true, 'Task should be valid')
      assert.strictEqual(result.violations.length, 0, 'Should have no violations')
    })
    
    it('should reject task with wrong instruction', () => {
      const task = createMockTask({ buildInstruction: 'Build feature X' as any })
      const result = validateTaskFormat(task)
      
      assert.strictEqual(result.valid, false, 'Task should be invalid')
      assert.ok(result.violations.length > 0, 'Should have violations')
      assert.ok(
        result.violations.some(v => v.includes('Invalid build instruction')),
        'Should have instruction violation'
      )
    })
    
    it('should reject task without architecture', () => {
      const task = createMockTask({ architecture: undefined as any })
      const result = validateTaskFormat(task)
      
      assert.strictEqual(result.valid, false, 'Task should be invalid')
      assert.ok(
        result.violations.some(v => v.includes('Architecture document missing')),
        'Should have architecture violation'
      )
    })
    
    it('should reject task with incomplete architecture', () => {
      const task = createMockTask({
        architecture: {
          title: 'Test',
          content: 'Incomplete',
          checklistValidated: false,
          validationTimestamp: new Date().toISOString(),
          completeness: 'incomplete' as const
        }
      })
      const result = validateTaskFormat(task)
      
      assert.strictEqual(result.valid, false, 'Task should be invalid')
      assert.ok(
        result.violations.some(v => v.includes('Architecture not validated')),
        'Should have validation violation'
      )
    })
    
    it('should reject task with green QA', () => {
      const task = createMockTask({
        qaSuite: {
          testCount: 10,
          failingCount: 0,
          status: 'green' as const,
          tests: [],
          createdAt: new Date().toISOString(),
          executionLog: 'All tests passing'
        }
      })
      const result = validateTaskFormat(task)
      
      assert.strictEqual(result.valid, false, 'Task should be invalid')
      assert.ok(
        result.violations.some(v => v.includes('must be "red"')),
        'Should require red QA'
      )
    })
    
    it('should reject task without acceptance criteria', () => {
      const task = createMockTask({ acceptanceCriteria: [] })
      const result = validateTaskFormat(task)
      
      assert.strictEqual(result.valid, false, 'Task should be invalid')
      assert.ok(
        result.violations.some(v => v.includes('Acceptance criteria missing')),
        'Should have criteria violation'
      )
    })
    
    it('should prepare valid task for builder execution', () => {
      const task = createMockTask()
      const result = prepareBuilderTask(task)
      
      assert.strictEqual(result.valid, true, 'Preparation should succeed')
      assert.ok(result.payload, 'Should have payload')
      assert.strictEqual(result.payload.buildInstruction, 'Build to Green', 'Should have correct instruction')
      assert.ok(result.payload.architecture, 'Should have architecture')
      assert.ok(result.payload.qaSuite, 'Should have QA suite')
      assert.ok(result.payload.acceptanceCriteria, 'Should have acceptance criteria')
    })
  })
  
  describe('Layer 6: CS5 & CS6 Enforcement', () => {
    it('should pass CS5 for clean output (no TODOs)', () => {
      const output = {
        success: true,
        artifacts: [
          {
            type: 'code' as const,
            name: 'clean-implementation.ts',
            content: 'function complete() { return "done"; }'
          }
        ]
      }
      
      const result = enforceCS5(output)
      
      assert.strictEqual(result.passed, true, 'CS5 should pass')
      assert.strictEqual(result.violations.length, 0, 'Should have no violations')
    })
    
    it('should fail CS5 for output with TODO', () => {
      const output = {
        success: true,
        artifacts: [
          {
            type: 'code' as const,
            name: 'incomplete.ts',
            content: '// TODO: Implement this function\nfunction incomplete() {}'
          }
        ]
      }
      
      const result = enforceCS5(output)
      
      assert.strictEqual(result.passed, false, 'CS5 should fail')
      assert.ok(result.violations.length > 0, 'Should have violations')
      assert.ok(
        result.violations.some(v => v.includes('TODO')),
        'Should detect TODO'
      )
    })
    
    it('should fail CS5 for output with FIXME', () => {
      const output = {
        success: true,
        artifacts: [
          {
            type: 'code' as const,
            name: 'buggy.ts',
            content: '// FIXME: This is broken\nfunction buggy() {}'
          }
        ]
      }
      
      const result = enforceCS5(output)
      
      assert.strictEqual(result.passed, false, 'CS5 should fail')
      assert.ok(
        result.violations.some(v => v.includes('FIXME')),
        'Should detect FIXME'
      )
    })
    
    it('should pass CS6 for internal builder', () => {
      const result = enforceCS6('maturion-builder')
      
      assert.strictEqual(result.passed, true, 'CS6 should pass for internal builder')
      assert.strictEqual(result.violations.length, 0, 'Should have no violations')
    })
    
    it('should pass CS6 for local builder', () => {
      const result = enforceCS6('local-builder')
      
      assert.strictEqual(result.passed, true, 'CS6 should pass for local builder')
      assert.strictEqual(result.violations.length, 0, 'Should have no violations')
    })
    
    it('should fail CS6 for external builder', () => {
      const result = enforceCS6('external-builder')
      
      assert.strictEqual(result.passed, false, 'CS6 should fail for external builder')
      assert.ok(result.violations.length > 0, 'Should have violations')
      assert.ok(
        result.violations.some(v => v.includes('External builder detected')),
        'Should detect external builder'
      )
    })
    
    it('should fail CS6 for GitHub Copilot', () => {
      const result = enforceCS6('github-copilot')
      
      assert.strictEqual(result.passed, false, 'CS6 should fail for GitHub Copilot')
      assert.ok(
        result.violations.some(v => v.includes('GitHub Copilot external builder detected')),
        'Should detect GitHub Copilot'
      )
    })
  })
})
