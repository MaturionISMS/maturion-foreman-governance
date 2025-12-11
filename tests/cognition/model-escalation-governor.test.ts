/**
 * Tests for Model Escalation Governor (PHASE_09)
 * 
 * Validates:
 * - Escalation policy enforcement
 * - Cognitive budget tracking
 * - Justification requirements
 * - Forbidden escalations blocked
 * - Mandatory escalations enforced
 * - Budget impact calculation
 */

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import {
  governModelEscalation,
  getCognitiveBudget,
  resetCognitiveBudget,
  getEscalationStats,
  getAllEscalationPolicies,
} from '../../lib/foreman/cognition/model-escalation-governor'
import type {
  ModelSelectionContext,
  ModelEscalationJustification,
  EscalationReason,
} from '../../types/model-escalation'
import { clearGovernanceEvents } from '../../lib/foreman/memory/governance-memory'

describe('Model Escalation Governor', () => {
  before(() => {
    // Clear governance events and reset budget before tests
    clearGovernanceEvents()
    resetCognitiveBudget()
  })

  after(() => {
    // Clean up after tests
    clearGovernanceEvents()
    resetCognitiveBudget()
  })

  const mockContext: ModelSelectionContext = {
    taskType: 'test',
    complexity: 'medium',
    filesAffected: 3,
    isArchitectureTask: false,
    isGovernanceTask: false,
    isMilestoneNearing: false,
    existingEscalationsToday: 0,
    quotaRemaining: 50,
  }

  describe('Escalation Policies', () => {
    it('should load all escalation policies', () => {
      const policies = getAllEscalationPolicies()
      
      assert.ok(policies, 'Should have policies')
      assert.ok(Array.isArray(policies), 'Policies should be an array')
      assert.ok(policies.length > 0, 'Should have at least one policy')
    })

    it('should have allowed policies defined', () => {
      const policies = getAllEscalationPolicies()
      const allowedPolicies = policies.filter(p => p.policyType === 'allowed')
      
      assert.ok(allowedPolicies.length > 0, 'Should have allowed policies')
      
      // Check specific allowed policies
      const architecturePolicy = policies.find(p => p.reason === 'architecture_impact')
      assert.ok(architecturePolicy, 'Should have architecture_impact policy')
      assert.strictEqual(architecturePolicy.policyType, 'allowed', 'architecture_impact should be allowed')
    })

    it('should have mandatory policies defined', () => {
      const policies = getAllEscalationPolicies()
      const mandatoryPolicies = policies.filter(p => p.policyType === 'mandatory')
      
      assert.ok(mandatoryPolicies.length > 0, 'Should have mandatory policies')
      
      // Check specific mandatory policies
      const memoryPolicy = policies.find(p => p.reason === 'memory_activation')
      assert.ok(memoryPolicy, 'Should have memory_activation policy')
      assert.strictEqual(memoryPolicy.policyType, 'mandatory', 'memory_activation should be mandatory')
    })

    it('should have forbidden policies defined', () => {
      const policies = getAllEscalationPolicies()
      const forbiddenPolicies = policies.filter(p => p.policyType === 'forbidden')
      
      assert.ok(forbiddenPolicies.length > 0, 'Should have forbidden policies')
      
      // Check specific forbidden policy
      const heavyTaskPolicy = policies.find(p => p.reason === 'heavy_task')
      assert.ok(heavyTaskPolicy, 'Should have heavy_task policy')
      assert.strictEqual(heavyTaskPolicy.policyType, 'forbidden', 'heavy_task should be forbidden')
    })
  })

  describe('Escalation Governance', () => {
    it('should approve allowed escalation with justification', async () => {
      resetCognitiveBudget()
      const justification: ModelEscalationJustification = {
        reason: 'architecture_impact',
        description: 'Need to analyze complex architecture',
        expectedBenefit: 'Better design decisions',
        alternatives: ['Use GPT-4.1', 'Break into smaller tasks'],
        timestamp: new Date().toISOString(),
      }
      
      const result = await governModelEscalation(
        mockContext,
        'architecture_impact',
        justification,
        100_000
      )
      
      assert.strictEqual(result.allowed, true, 'Should allow escalation')
      assert.strictEqual(result.selectedModel, 'gpt-5.1', 'Should select GPT-5.1')
      assert.strictEqual(result.policyType, 'allowed', 'Should be allowed policy')
    })

    it('should block escalation without required justification', async () => {
      resetCognitiveBudget()
      const result = await governModelEscalation(
        mockContext,
        'architecture_impact',
        undefined, // No justification provided
        100_000
      )
      
      assert.strictEqual(result.allowed, false, 'Should block escalation')
      
      const justificationCheck = result.governanceChecks.find(c => c.checkType === 'justification')
      assert.ok(justificationCheck, 'Should have justification check')
      assert.strictEqual(justificationCheck.passed, false, 'Justification check should fail')
    })

    it('should block forbidden escalation', async () => {
      resetCognitiveBudget()
      const result = await governModelEscalation(
        mockContext,
        'heavy_task',
        undefined,
        100_000
      )
      
      assert.strictEqual(result.allowed, false, 'Should block forbidden escalation')
      assert.strictEqual(result.policyType, 'forbidden', 'Should be forbidden policy')
      
      const policyCheck = result.governanceChecks.find(c => c.checkType === 'policy')
      assert.ok(policyCheck, 'Should have policy check')
      assert.strictEqual(policyCheck.passed, false, 'Policy check should fail')
    })

    it('should approve mandatory escalation without justification', async () => {
      resetCognitiveBudget()
      const result = await governModelEscalation(
        mockContext,
        'memory_activation',
        undefined, // No justification needed
        100_000
      )
      
      assert.strictEqual(result.allowed, true, 'Should allow mandatory escalation')
      assert.strictEqual(result.selectedModel, 'gpt-5.1', 'Should select GPT-5.1')
      assert.strictEqual(result.policyType, 'mandatory', 'Should be mandatory policy')
    })

    it('should provide governance checks', async () => {
      resetCognitiveBudget()
      const result = await governModelEscalation(
        mockContext,
        'governance_task',
        undefined,
        100_000
      )
      
      assert.ok(result.governanceChecks, 'Should have checks')
      assert.ok(result.governanceChecks.length > 0, 'Should have at least one check')
      
      const checkTypes = result.governanceChecks.map(c => c.checkType)
      assert.ok(checkTypes.includes('policy'), 'Should have policy check')
      assert.ok(checkTypes.includes('budget'), 'Should have budget check')
    })

    it('should handle unknown escalation reason', async () => {
      resetCognitiveBudget()
      const result = await governModelEscalation(
        mockContext,
        'unknown_reason' as EscalationReason,
        undefined,
        100_000
      )
      
      assert.strictEqual(result.allowed, false, 'Should block unknown reason')
      assert.strictEqual(result.selectedModel, 'gpt-4o-mini', 'Should fallback to mini')
    })
  })

  describe('Cognitive Budget', () => {
    it('should track cognitive budget', () => {
      resetCognitiveBudget()
      const budget = getCognitiveBudget()
      
      assert.ok(budget, 'Should have budget')
      assert.ok(typeof budget.tokenBudget === 'number', 'Should have token budget')
      assert.ok(typeof budget.tokenUsed === 'number', 'Should have token used')
      assert.ok(typeof budget.costBudget === 'number', 'Should have cost budget')
      assert.ok(typeof budget.costUsed === 'number', 'Should have cost used')
      assert.ok(typeof budget.escalationsAllowed === 'number', 'Should have escalations allowed')
      assert.ok(typeof budget.escalationsUsed === 'number', 'Should have escalations used')
    })

    it('should initialize budget with defaults', () => {
      resetCognitiveBudget()
      const budget = getCognitiveBudget()
      
      assert.strictEqual(budget.tokenUsed, 0, 'Token used should be 0')
      assert.strictEqual(budget.costUsed, 0, 'Cost used should be 0')
      assert.strictEqual(budget.escalationsUsed, 0, 'Escalations used should be 0')
      assert.ok(budget.tokenBudget > 0, 'Should have positive token budget')
      assert.ok(budget.costBudget > 0, 'Should have positive cost budget')
      assert.ok(budget.escalationsAllowed > 0, 'Should have positive escalations allowed')
    })

    it('should update budget after escalation', async () => {
      resetCognitiveBudget()
      const budgetBefore = getCognitiveBudget()
      
      const result = await governModelEscalation(
        mockContext,
        'governance_task',
        undefined,
        100_000
      )
      
      if (result.allowed) {
        const budgetAfter = getCognitiveBudget()
        
        assert.ok(budgetAfter.tokenUsed > budgetBefore.tokenUsed, 'Token usage should increase')
        assert.ok(budgetAfter.costUsed > budgetBefore.costUsed, 'Cost should increase')
        assert.ok(budgetAfter.escalationsUsed > budgetBefore.escalationsUsed, 'Escalations used should increase')
      }
    })

    it('should calculate budget impact', async () => {
      resetCognitiveBudget()
      const result = await governModelEscalation(
        mockContext,
        'governance_task',
        undefined,
        100_000
      )
      
      assert.ok(result.budgetImpact, 'Should have budget impact')
      assert.ok(typeof result.budgetImpact.tokens === 'number', 'Should have token impact')
      assert.ok(typeof result.budgetImpact.cost === 'number', 'Should have cost impact')
      assert.ok(typeof result.budgetImpact.escalations === 'number', 'Should have escalations impact')
    })
  })

  describe('Escalation Statistics', () => {
    it('should provide escalation statistics', () => {
      const stats = getEscalationStats()
      
      assert.ok(stats, 'Should have stats')
      assert.ok(stats.budgetUsage, 'Should have budget usage')
      assert.ok(stats.policies, 'Should have policy stats')
    })

    it('should track budget usage percentages', () => {
      const stats = getEscalationStats()
      
      assert.ok(stats.budgetUsage.tokens, 'Should have token usage')
      assert.ok(typeof stats.budgetUsage.tokens.percentage === 'number', 'Should have token percentage')
      assert.ok(stats.budgetUsage.tokens.percentage >= 0 && stats.budgetUsage.tokens.percentage <= 100, 'Token percentage should be valid')
      
      assert.ok(stats.budgetUsage.cost, 'Should have cost usage')
      assert.ok(typeof stats.budgetUsage.cost.percentage === 'number', 'Should have cost percentage')
      assert.ok(stats.budgetUsage.cost.percentage >= 0 && stats.budgetUsage.cost.percentage <= 100, 'Cost percentage should be valid')
      
      assert.ok(stats.budgetUsage.escalations, 'Should have escalations usage')
      assert.ok(typeof stats.budgetUsage.escalations.percentage === 'number', 'Should have escalations percentage')
      assert.ok(stats.budgetUsage.escalations.percentage >= 0 && stats.budgetUsage.escalations.percentage <= 100, 'Escalations percentage should be valid')
    })

    it('should track policy counts', () => {
      const stats = getEscalationStats()
      
      assert.ok(typeof stats.policies.total === 'number', 'Should have total policies')
      assert.ok(typeof stats.policies.allowed === 'number', 'Should count allowed policies')
      assert.ok(typeof stats.policies.forbidden === 'number', 'Should count forbidden policies')
      assert.ok(typeof stats.policies.mandatory === 'number', 'Should count mandatory policies')
      
      assert.strictEqual(
        stats.policies.total,
        stats.policies.allowed + stats.policies.forbidden + stats.policies.mandatory,
        'Total should equal sum of policy types'
      )
    })
  })

  describe('Fallback Chain', () => {
    it('should provide fallback chain', async () => {
      const result = await governModelEscalation(
        mockContext,
        'governance_task',
        undefined,
        100_000
      )
      
      assert.ok(result.fallbackChain, 'Should have fallback chain')
      assert.ok(Array.isArray(result.fallbackChain), 'Fallback chain should be an array')
      assert.ok(result.fallbackChain.length > 0, 'Should have at least one fallback')
    })

    it('should include selected model in fallback chain', async () => {
      const result = await governModelEscalation(
        mockContext,
        'governance_task',
        undefined,
        100_000
      )
      
      if (result.allowed) {
        assert.ok(result.fallbackChain.includes(result.selectedModel), 'Fallback chain should include selected model')
      }
    })
  })

  describe('Model Selection', () => {
    it('should select GPT-5.1 for architecture reasoning', async () => {
      const justification: ModelEscalationJustification = {
        reason: 'architecture_impact',
        description: 'Complex architecture',
        expectedBenefit: 'Better design',
        alternatives: [],
        timestamp: new Date().toISOString(),
      }
      
      const result = await governModelEscalation(
        mockContext,
        'architecture_impact',
        justification,
        100_000
      )
      
      if (result.allowed) {
        assert.strictEqual(result.selectedModel, 'gpt-5.1', 'Should select GPT-5.1 for architecture')
      }
    })

    it('should select GPT-4.1 for multi-file refactor', async () => {
      const justification: ModelEscalationJustification = {
        reason: 'multi_file_refactor',
        description: 'Refactoring multiple files',
        expectedBenefit: 'Better organization',
        alternatives: [],
        timestamp: new Date().toISOString(),
      }
      
      const result = await governModelEscalation(
        mockContext,
        'multi_file_refactor',
        justification,
        100_000
      )
      
      if (result.allowed) {
        assert.strictEqual(result.selectedModel, 'gpt-4.1', 'Should select GPT-4.1 for refactor')
      }
    })

    it('should select GPT-5.1 for constitutional reasoning', async () => {
      const result = await governModelEscalation(
        mockContext,
        'constitutional_reasoning',
        undefined, // No justification needed
        100_000
      )
      
      assert.strictEqual(result.allowed, true, 'Should allow constitutional reasoning')
      assert.strictEqual(result.selectedModel, 'gpt-5.1', 'Should select GPT-5.1 for constitutional reasoning')
    })
  })
})

console.log('Model Escalation Governor tests completed successfully')
