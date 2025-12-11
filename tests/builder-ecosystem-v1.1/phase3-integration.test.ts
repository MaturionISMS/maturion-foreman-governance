/**
 * Phase 3 Integration Test - Comprehensive Validation
 * Demonstrates all Phase 3 features are implemented and working
 */

import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { BuilderRequestV1_1 } from '@/types/builder-protocol-v1.1'
import { validateBuilderRequest, validateProtectedPaths, validateQATransition } from '@/lib/foreman/validation/protocol-v1.1-validator'
import { createCheckpoint, validateCheckpointIntegrity, resumeFromCheckpoint } from '@/lib/foreman/checkpointing/checkpoint-engine'
import { getBuilderHeartbeat, getBuilderHealthStatus } from '@/lib/foreman/telemetry/builder-telemetry'
import { generatePREvidence, validateTimelineOrder } from '@/lib/foreman/evidence/pr-evidence-generator'
import { validatePhilosophyTreeAccess } from '@/lib/foreman/philosophy-tree/philosophy-integration'
import { enforceQICAnchorPoints } from '@/lib/foreman/integration/qic-qiel-integration'
import { routeTaskToBuilder } from '@/lib/foreman/routing/builder-routing'

describe('Phase 3 - Builder Ecosystem v1.1 Integration', () => {
  
  describe('Protocol v1.1 Compliance', () => {
    
    it('validates protocol version 1.1', () => {
      const invalidRequest = {
        protocol_version: "1.0",
        instruction: "Build to Green",
        architecture: { reference: "/arch/test.md", summary: "Test" },
        qa_suite: { name: "test", location: "tests/", current_status: "RED" as const, total_tests: 5, passing_tests: 0, failing_tests: 5 },
        acceptance_criteria: "All tests pass",
        organisationId: "test-org",
        metadata: { task_id: "task-1", priority: "normal" as const, timeout_seconds: 3600 }
      }
      
      const result = validateBuilderRequest(invalidRequest)
      assert.strictEqual(result.valid, false)
      assert.strictEqual(result.error?.error, 'BuildPhilosophyViolation')
    })
    
    it('validates Build to Green instruction', () => {
      const invalidRequest = {
        protocol_version: "1.1",
        instruction: "Build feature X",
        architecture: { reference: "/arch/test.md", summary: "Test" },
        qa_suite: { name: "test", location: "tests/", current_status: "RED" as const, total_tests: 5, passing_tests: 0, failing_tests: 5 },
        acceptance_criteria: "All tests pass",
        organisationId: "test-org",
        metadata: { task_id: "task-1", priority: "normal" as const, timeout_seconds: 3600 }
      }
      
      const result = validateBuilderRequest(invalidRequest)
      assert.strictEqual(result.valid, false)
    })
    
    it('validates RED QA requirement', () => {
      const greenQARequest = {
        protocol_version: "1.1",
        instruction: "Build to Green",
        architecture: { reference: "/arch/test.md", summary: "Test" },
        qa_suite: { name: "test", location: "tests/", current_status: "GREEN" as const, total_tests: 5, passing_tests: 5, failing_tests: 0 },
        acceptance_criteria: "All tests pass",
        organisationId: "test-org",
        metadata: { task_id: "task-1", priority: "normal" as const, timeout_seconds: 3600 }
      }
      
      const result = validateBuilderRequest(greenQARequest)
      assert.strictEqual(result.valid, false)
      assert.ok(result.error?.message.includes('RED'))
    })
    
    it('accepts valid Build to Green request', () => {
      const validRequest: BuilderRequestV1_1 = {
        protocol_version: "1.1",
        instruction: "Build to Green",
        architecture: { reference: "/arch/test.md", summary: "Test" },
        qa_suite: { name: "test", location: "tests/", current_status: "RED", total_tests: 5, passing_tests: 0, failing_tests: 5 },
        acceptance_criteria: "All tests pass",
        organisationId: "test-org",
        metadata: { task_id: "task-1", priority: "normal", timeout_seconds: 3600 }
      }
      
      const result = validateBuilderRequest(validRequest)
      assert.strictEqual(result.valid, true)
    })
  })
  
  describe('Constitutional Constraints (CS3)', () => {
    
    it('rejects modifications to protected paths', () => {
      const protectedPaths = [
        '.github/workflows/ci.yml',
        'BUILD_PHILOSOPHY.md',
        'foreman/constitution/rules.md'
      ]
      
      const result = validateProtectedPaths(protectedPaths)
      assert.strictEqual(result.valid, false)
    })
    
    it('allows non-protected paths', () => {
      const safePaths = [
        'lib/foreman/new-feature.ts',
        'tests/new-test.ts'
      ]
      
      const result = validateProtectedPaths(safePaths)
      assert.strictEqual(result.valid, true)
    })
  })
  
  describe('Checkpointing System', () => {
    
    it('creates checkpoints successfully', async () => {
      const checkpoint = await createCheckpoint(
        'test-task-1',
        'test-builder',
        1,
        { total: 10, passing: 3, failing: 7 },
        ['assumption-1'],
        ['qa-assumption-1'],
        'Next iteration'
      )
      
      assert.ok(checkpoint.checkpoint_id)
      assert.strictEqual(checkpoint.task_id, 'test-task-1')
      assert.strictEqual(checkpoint.iteration, 1)
    })
    
    it('validates checkpoint integrity', async () => {
      const checkpoint = await createCheckpoint(
        'test-task-2',
        'test-builder',
        1,
        { total: 10, passing: 5, failing: 5 },
        [],
        [],
        'Test'
      )
      
      const isValid = validateCheckpointIntegrity(checkpoint)
      assert.strictEqual(isValid, true)
    })
    
    it('resumes from checkpoint', async () => {
      const taskId = 'test-task-3'
      await createCheckpoint(taskId, 'test-builder', 1, { total: 10, passing: 2, failing: 8 }, [], [], 'Action')
      
      const recovery = resumeFromCheckpoint(taskId)
      assert.ok(recovery)
      assert.strictEqual(recovery!.taskId, taskId)
    })
  })
  
  describe('Telemetry & Health Monitoring', () => {
    
    it('gets builder heartbeat', async () => {
      const heartbeat = await getBuilderHeartbeat('test-builder')
      
      assert.ok(heartbeat)
      assert.strictEqual(heartbeat.builder, 'test-builder')
      assert.ok(['active', 'idle', 'unhealthy', 'degraded'].includes(heartbeat.status))
    })
    
    it('gets builder health status', async () => {
      const health = await getBuilderHealthStatus('test-builder')
      
      assert.ok(health)
      assert.ok(['healthy', 'degraded', 'unhealthy', 'dead'].includes(health.status))
      assert.ok(health.checks)
    })
  })
  
  describe('QA Transition Validation', () => {
    
    it('validates RED to GREEN transition', () => {
      const result = validateQATransition('RED', 'GREEN', 5, 0)
      assert.strictEqual(result.valid, true)
    })
    
    it('rejects invalid transitions', () => {
      const result = validateQATransition('GREEN', 'RED', 0, 5)
      assert.strictEqual(result.valid, false)
    })
  })
  
  describe('PR Evidence Generation', () => {
    
    it('generates complete evidence', () => {
      const evidence = generatePREvidence({
        architectureReference: '/arch/test.md',
        architectureValidated: true,
        redQALog: 'pre-build.log',
        redQAFailingCount: 5,
        buildInstruction: 'Build to Green',
        builderName: 'test-builder',
        protocolVersion: '1.1',
        validationPassed: true,
        greenQALog: 'final.log',
        greenQAPassRate: '100%',
        iterationCount: 3,
        timelineSteps: [
          { step: 'Architecture', timestamp: '2025-01-01T00:00:00Z' },
          { step: 'Build', timestamp: '2025-01-01T00:01:00Z' }
        ]
      })
      
      assert.strictEqual(evidence.build_instruction, 'Build to Green')
      assert.strictEqual(evidence.red_qa_evidence.pre_build_status, 'RED')
      assert.strictEqual(evidence.green_qa_evidence.final_status, 'GREEN')
    })
    
    it('validates timeline order', () => {
      const validTimeline = [
        { step: 'Start', timestamp: '2025-01-01T00:00:00Z' },
        { step: 'End', timestamp: '2025-01-01T00:01:00Z' }
      ]
      
      assert.strictEqual(validateTimelineOrder(validTimeline), true)
      
      const invalidTimeline = [
        { step: 'End', timestamp: '2025-01-01T00:01:00Z' },
        { step: 'Start', timestamp: '2025-01-01T00:00:00Z' }
      ]
      
      assert.strictEqual(validateTimelineOrder(invalidTimeline), false)
    })
  })
  
  describe('Philosophy Tree Integration', () => {
    
    it('prevents writes to Philosophy Tree', () => {
      const canWrite = validatePhilosophyTreeAccess('maturion-philosophy-tree.md', 'write')
      assert.strictEqual(canWrite, false)
    })
    
    it('allows reads from Philosophy Tree', () => {
      const canRead = validatePhilosophyTreeAccess('maturion-philosophy-tree.md', 'read')
      assert.strictEqual(canRead, true)
    })
  })
  
  describe('QIC Integration', () => {
    
    it('detects build integrity violations', async () => {
      const buildOutput = 'ERROR: Build failed with TypeError'
      const violations = await enforceQICAnchorPoints(buildOutput)
      
      assert.ok(violations.length > 0)
      assert.strictEqual(violations[0].type, 'build')
    })
    
    it('passes clean build output', async () => {
      const buildOutput = 'Build successful, all tests passed'
      const violations = await enforceQICAnchorPoints(buildOutput)
      
      assert.strictEqual(violations.length, 0)
    })
  })
  
  describe('Builder Routing', () => {
    
    it('routes UI tasks to UI builder', () => {
      const route = routeTaskToBuilder('ui component', 'simple')
      assert.strictEqual(route.builder, 'ui')
    })
    
    it('routes API tasks to API builder', () => {
      const route = routeTaskToBuilder('api endpoint', 'simple')
      assert.strictEqual(route.builder, 'api')
    })
    
    it('routes complex tasks to local builder', () => {
      const route = routeTaskToBuilder('general task', 'complex')
      assert.strictEqual(route.builder, 'local')
    })
  })
})
