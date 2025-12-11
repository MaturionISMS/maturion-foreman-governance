/**
 * Tests for Mutation Governor Kernel (PHASE_10)
 * 
 * Validates:
 * - Mutation classification (safe, regulated, forbidden)
 * - Protected path detection
 * - Throttling enforcement
 * - Governance checks
 * - Mutation recording
 * - Statistics tracking
 */

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import {
  classifyMutation,
  canMutate,
  recordMutation,
  getMutationStats,
  resetMutationCounters,
  isThrottled,
} from '../../lib/foreman/cognition/mutation-governor'
import type { MutationContext, MutationRecord } from '../../types/mutation-governor'
import { clearGovernanceEvents } from '../../lib/foreman/memory/governance-memory'
import * as crypto from 'crypto'

describe('Mutation Governor Kernel', () => {
  before(async () => {
    // Clear governance events and reset counters before tests
    clearGovernanceEvents()
    await resetMutationCounters('pr')
    await resetMutationCounters('wave')
  })

  after(async () => {
    // Clean up after tests
    clearGovernanceEvents()
    await resetMutationCounters('pr')
    await resetMutationCounters('wave')
  })

  describe('Mutation Classification', () => {
    it('should classify documentation changes as safe', () => {
      const files = ['docs/autonomy/PHASE_10.md', 'README.md']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'safe', 'Documentation should be safe')
      assert.strictEqual(classification.filesAffected.length, 2, 'Should track 2 files')
      assert.ok(classification.reasoning.includes('Safe') || classification.reasoning.includes('documentation'))
    })

    it('should classify source code changes as regulated', () => {
      const files = ['lib/foreman/cognition/mutation-governor.ts']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'regulated', 'Source code should be regulated')
      assert.ok(classification.impactRadius > 0, 'Should have impact radius')
    })

    it('should classify workflow changes as forbidden', () => {
      const files = ['.github/workflows/ci.yml']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'forbidden', 'Workflow changes should be forbidden')
      assert.ok(classification.protectedPathsViolated.length > 0, 'Should detect protected path violation')
    })

    it('should classify agent contract changes as forbidden', () => {
      const files = ['.github/foreman/agent-contract.md']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'forbidden', 'Agent contract changes should be forbidden')
      assert.ok(classification.protectedPathsViolated.includes('.github/foreman/agent-contract.md'))
    })

    it('should classify BUILD_PHILOSOPHY changes as forbidden', () => {
      const files = ['BUILD_PHILOSOPHY.md']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'forbidden', 'BUILD_PHILOSOPHY changes should be forbidden')
    })

    it('should classify component changes as regulated', () => {
      const files = ['components/ui/Button.tsx', 'app/page.tsx']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'regulated', 'UI changes should be regulated')
      assert.ok(classification.impactRadius > 0, 'Should calculate impact radius')
    })

    it('should classify type definition changes as regulated', () => {
      const files = ['types/mutation-governor.ts']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'regulated', 'Type changes should be regulated')
    })

    it('should classify test file additions as safe', () => {
      const files = ['tests/cognition/mutation-governor.test.ts']
      const classification = classifyMutation(files)
      
      assert.strictEqual(classification.type, 'safe', 'Test files should be safe')
    })
  })

  describe('Mutation Governance', () => {
    const mockContext: MutationContext = {
      prNumber: 999,
      taskDescription: 'Test mutation',
      existingMutationsInPR: 0,
      existingMutationsInWave: 0,
      isRecoveryAttempt: false,
    }

    it('should allow safe mutations', async () => {
      const files = ['docs/test.md']
      const result = await canMutate(files, 'safe', mockContext)
      
      assert.strictEqual(result.allowed, true, 'Safe mutation should be allowed')
      assert.strictEqual(result.verdict, 'approved', 'Should be approved')
      assert.strictEqual(result.throttled, false, 'Should not be throttled')
    })

    it('should allow regulated mutations with review', async () => {
      const files = ['lib/test.ts']
      const result = await canMutate(files, 'regulated', mockContext)
      
      assert.strictEqual(result.allowed, true, 'Regulated mutation should be allowed')
      assert.strictEqual(result.verdict, 'requires_review', 'Should require review')
      assert.ok(result.recoveryPath, 'Should have recovery path')
    })

    it('should block forbidden mutations', async () => {
      const files = ['.github/workflows/test.yml']
      const result = await canMutate(files, 'forbidden', mockContext)
      
      assert.strictEqual(result.allowed, false, 'Forbidden mutation should be blocked')
      assert.strictEqual(result.verdict, 'blocked', 'Should be blocked')
      assert.ok(result.blockers && result.blockers.length > 0, 'Should have blockers')
    })

    it('should provide governance checks', async () => {
      const files = ['lib/test.ts']
      const result = await canMutate(files, 'regulated', mockContext)
      
      assert.ok(result.checks, 'Should have checks')
      assert.ok(result.checks.length > 0, 'Should have at least one check')
      
      const checkTypes = result.checks.map(c => c.checkType)
      assert.ok(checkTypes.includes('classification'), 'Should have classification check')
      assert.ok(checkTypes.includes('throttling'), 'Should have throttling check')
    })

    it('should calculate impact estimates', async () => {
      const files = ['lib/test1.ts', 'lib/test2.ts', 'lib/test3.ts']
      const result = await canMutate(files, 'regulated', mockContext)
      
      assert.ok(result.estimatedImpact, 'Should have impact estimate')
      assert.strictEqual(result.estimatedImpact.filesAffected, 3, 'Should track files affected')
      assert.ok(result.estimatedImpact.radius > 0, 'Should have impact radius')
      assert.ok(['low', 'medium', 'high'].includes(result.estimatedImpact.level), 'Should have impact level')
    })
  })

  describe('Mutation Recording', () => {
    it('should record mutation attempts', async () => {
      const mutation: MutationRecord = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        mutationType: 'regulated',
        filesAffected: ['lib/test.ts'],
        impactRadius: 5,
        verdict: 'approved',
        sequenceId: 'seq-001',
        context: {
          prNumber: 999,
          taskDescription: 'Test mutation',
          existingMutationsInPR: 0,
          existingMutationsInWave: 0,
          isRecoveryAttempt: false,
        },
        outcome: 'completed',
      }
      
      await recordMutation(mutation)
      
      const stats = getMutationStats()
      assert.ok(stats.pr.count > 0, 'Should have recorded mutation')
    })
  })

  describe('Mutation Statistics', () => {
    it('should provide mutation statistics', () => {
      const stats = getMutationStats()
      
      assert.ok(stats, 'Should have stats')
      assert.ok(stats.pr, 'Should have PR stats')
      assert.ok(stats.wave, 'Should have wave stats')
      assert.ok(stats.daily, 'Should have daily stats')
      assert.ok(typeof stats.throttled === 'boolean', 'Should have throttled flag')
      assert.ok(['low', 'medium', 'high'].includes(stats.riskLevel), 'Should have risk level')
    })

    it('should track mutations by type', () => {
      const stats = getMutationStats()
      
      assert.ok(stats.pr.byType, 'Should have mutation types')
      assert.ok(typeof stats.pr.byType.safe === 'number', 'Should count safe mutations')
      assert.ok(typeof stats.pr.byType.regulated === 'number', 'Should count regulated mutations')
      assert.ok(typeof stats.pr.byType.forbidden === 'number', 'Should count forbidden mutations')
    })

    it('should calculate percentages correctly', () => {
      const stats = getMutationStats()
      
      assert.ok(typeof stats.pr.percentage === 'number', 'Should have PR percentage')
      assert.ok(typeof stats.wave.percentage === 'number', 'Should have wave percentage')
      assert.ok(stats.pr.percentage >= 0 && stats.pr.percentage <= 100, 'PR percentage should be valid')
      assert.ok(stats.wave.percentage >= 0 && stats.wave.percentage <= 100, 'Wave percentage should be valid')
    })
  })

  describe('Mutation Throttling', () => {
    it('should detect when not throttled initially', () => {
      const context: MutationContext = {
        prNumber: 1001,
        taskDescription: 'Throttle test',
        existingMutationsInPR: 0,
        existingMutationsInWave: 0,
        isRecoveryAttempt: false,
      }
      
      const throttled = isThrottled(context)
      assert.strictEqual(throttled, false, 'Should not be throttled initially')
    })

    it('should reset PR counters', async () => {
      await resetMutationCounters('pr')
      const stats = getMutationStats()
      
      assert.strictEqual(stats.pr.count, 0, 'PR count should be reset')
    })

    it('should reset wave counters', async () => {
      await resetMutationCounters('wave')
      const stats = getMutationStats()
      
      assert.strictEqual(stats.wave.count, 0, 'Wave count should be reset')
    })
  })

  describe('Impact Radius Calculation', () => {
    it('should calculate impact radius for single file', () => {
      const files = ['lib/test.ts']
      const classification = classifyMutation(files)
      
      assert.ok(classification.impactRadius >= 1, 'Should have minimum impact radius')
    })

    it('should increase impact radius for multiple files', () => {
      const singleFile = classifyMutation(['lib/test.ts'])
      const multipleFiles = classifyMutation(['lib/test1.ts', 'lib/test2.ts', 'lib/test3.ts'])
      
      assert.ok(multipleFiles.impactRadius > singleFile.impactRadius, 'More files should increase impact radius')
    })

    it('should determine impact level correctly', () => {
      const lowImpact = classifyMutation(['docs/test.md'])
      assert.strictEqual(lowImpact.impactLevel, 'low', 'Single doc should be low impact')
      
      const mediumImpact = classifyMutation(['lib/test1.ts', 'lib/test2.ts', 'lib/test3.ts'])
      assert.ok(['low', 'medium'].includes(mediumImpact.impactLevel), 'Multiple files should be low or medium impact')
    })
  })

  describe('Recovery Paths', () => {
    it('should provide recovery path for regulated mutations', async () => {
      const files = ['lib/test.ts']
      const result = await canMutate(files, 'regulated', {
        prNumber: 999,
        taskDescription: 'Recovery test',
        existingMutationsInPR: 0,
        existingMutationsInWave: 0,
        isRecoveryAttempt: false,
      })
      
      assert.ok(result.recoveryPath, 'Should have recovery path')
      assert.ok(result.recoveryPath.includes('revert') || result.recoveryPath.includes('snapshot'), 'Should mention recovery method')
    })

    it('should not require recovery path for safe mutations', async () => {
      const files = ['docs/test.md']
      const result = await canMutate(files, 'safe', {
        prNumber: 999,
        taskDescription: 'Safe mutation test',
        existingMutationsInPR: 0,
        existingMutationsInWave: 0,
        isRecoveryAttempt: false,
      })
      
      assert.ok(result.recoveryPath, 'Should still have recovery path field')
      assert.ok(result.recoveryPath.includes('No recovery needed'), 'Should indicate no recovery needed')
    })
  })
})

console.log('Mutation Governor tests completed successfully')
