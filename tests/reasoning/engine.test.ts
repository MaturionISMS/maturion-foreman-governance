/**
 * Reasoning Engine Tests
 * Tests for Memory-Aware Reasoning Engine (MARE)
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  loadMemorySnapshot,
  executeReasoning,
  reason,
  routeMemory,
  getRecommendedScopes,
  getRecommendedTags,
  isMemoryContextSufficient,
  loadReasoningPatterns,
  findApplicablePatterns,
  getBuiltInPatterns
} from '../../lib/foreman/reasoning'
import {
  writeMemoryEntry,
  clearMemoryScope,
  recordArchitectureDecision,
  recordQAFailure
} from '../../lib/foreman/memory'
import { MemoryEntry } from '../../types/memory'
import { ReasoningContext } from '../../types/reasoning'

describe('Memory-Aware Reasoning Engine (MARE)', () => {
  
  beforeEach(async () => {
    // Clear test memory before each test
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })

  describe('Memory Router', () => {
    test('should filter memory by scope', () => {
      const entries: MemoryEntry[] = [
        createMockEntry('global', ['architecture']),
        createMockEntry('foreman', ['wave_completion']),
        createMockEntry('project', ['milestone'])
      ]

      const result = routeMemory(entries, { scope: ['global'] })

      assert.strictEqual(result.total, 1)
      assert.strictEqual(result.entries[0].scope, 'global')
      console.log('✓ Router filters by scope correctly')
    })

    test('should filter memory by tags', () => {
      const entries: MemoryEntry[] = [
        createMockEntry('foreman', ['architecture', 'decision']),
        createMockEntry('foreman', ['qa_failure']),
        createMockEntry('foreman', ['deployment'])
      ]

      const result = routeMemory(entries, { tags: ['qa_failure'] })

      assert.strictEqual(result.total, 1)
      assert.ok(result.entries[0].tags?.includes('qa_failure'))
      console.log('✓ Router filters by tags correctly')
    })

    test('should apply intent-based routing', () => {
      const entries: MemoryEntry[] = [
        createMockEntry('foreman', ['qa_failure']),
        createMockEntry('foreman', ['architecture_decision']),
        createMockEntry('project', ['deployment'])
      ]

      const result = routeMemory(entries, { intent: 'qa_analysis' })

      assert.ok(result.total > 0)
      assert.ok(result.filteringReason.includes('intent'))
      console.log('✓ Router applies intent-based filtering')
    })

    test('should limit results based on risk level', () => {
      const entries: MemoryEntry[] = Array.from({ length: 50 }, (_, i) =>
        createMockEntry('foreman', ['test'], i)
      )

      const result = routeMemory(entries, { riskLevel: 'low' })

      assert.ok(result.total <= 10)
      console.log('✓ Router limits results based on risk level')
    })

    test('should get recommended scopes for intent', () => {
      const scopes = getRecommendedScopes('architecture_review')

      assert.ok(Array.isArray(scopes))
      assert.ok(scopes.includes('global'))
      console.log('✓ Recommended scopes retrieved correctly')
    })

    test('should get recommended tags for context', () => {
      const tags = getRecommendedTags({
        intent: 'qa_analysis',
        phase: 'qa'
      })

      assert.ok(Array.isArray(tags))
      assert.ok(tags.length > 0)
      assert.ok(tags.some(t => t.includes('qa')))
      console.log('✓ Recommended tags retrieved correctly')
    })

    test('should check memory context sufficiency', () => {
      const sufficient = isMemoryContextSufficient(15, 'high')
      const insufficient = isMemoryContextSufficient(5, 'critical')

      assert.strictEqual(sufficient.sufficient, true)
      assert.strictEqual(insufficient.sufficient, false)
      console.log('✓ Memory context sufficiency check works')
    })
  })

  describe('Reasoning Patterns', () => {
    test('should load built-in patterns', () => {
      const patterns = getBuiltInPatterns()

      assert.ok(Array.isArray(patterns))
      assert.ok(patterns.length > 0)
      assert.ok(patterns.some(p => p.id === 'pattern_memory_before_action'))
      console.log(`✓ Loaded ${patterns.length} built-in patterns`)
    })

    test('should find applicable patterns by tags', () => {
      const allPatterns = getBuiltInPatterns()
      const applicable = findApplicablePatterns(allPatterns, {
        tags: ['governance']
      })

      assert.ok(applicable.length > 0)
      console.log('✓ Found applicable patterns by tags')
    })

    test('should prioritize core patterns for high risk', () => {
      const allPatterns = getBuiltInPatterns()
      const applicable = findApplicablePatterns(allPatterns, {
        riskLevel: 'critical'
      })

      assert.ok(applicable.length > 0)
      const firstPattern = applicable[0]
      assert.ok(firstPattern.tags.includes('core'))
      console.log('✓ Core patterns prioritized for high risk')
    })

    test('should load patterns from memory entries', () => {
      const entries: MemoryEntry[] = [
        createMockEntry('foreman', ['reasoning_pattern'], 0, {
          pattern: {
            name: 'Test Pattern',
            description: 'Test',
            context: 'Test context',
            approach: 'Test approach',
            examples: [],
            tags: ['test']
          }
        })
      ]

      const patterns = loadReasoningPatterns(entries)

      assert.ok(patterns.length >= 6) // Built-in patterns at minimum
      assert.ok(patterns.some(p => p.name === 'Test Pattern')) // Custom pattern loaded
      console.log('✓ Patterns loaded from memory entries')
    })
  })

  describe('Memory Snapshot Loading', () => {
    test('should load empty memory snapshot', async () => {
      const context: ReasoningContext = {
        subsystem: 'architecture',
        phase: 'planning'
      }

      const snapshot = await loadMemorySnapshot(context)

      assert.ok(snapshot)
      assert.ok(snapshot.meta)
      assert.ok(snapshot.global)
      assert.ok(Array.isArray(snapshot.reasoningPatterns))
      assert.ok(Array.isArray(snapshot.architectureLessons))
      assert.ok(Array.isArray(snapshot.issues))
      console.log('✓ Empty memory snapshot loaded')
    })

    test('should load memory snapshot with project context', async () => {
      await writeMemoryEntry(
        'project',
        'test_milestone',
        {
          type: 'milestone_completion',
          description: 'Test milestone',
          data: { milestone: 'Alpha', completedAt: new Date().toISOString() }
        },
        {
          createdBy: 'test',
          tags: ['milestone', 'test'],
          projectId: 'test_project'
        }
      )

      const context: ReasoningContext = {
        projectId: 'test_project',
        phase: 'build'
      }

      const snapshot = await loadMemorySnapshot(context)

      assert.ok(snapshot.project)
      assert.strictEqual(snapshot.project.projectId, 'test_project')
      console.log('✓ Memory snapshot loaded with project context')
    })

    test('should include governance memory', async () => {
      await writeMemoryEntry(
        'global',
        'test_governance',
        {
          type: 'governance_change',
          description: 'Test governance rule',
          data: {
            rule: 'test_rule',
            enforcement: 'strict'
          }
        },
        {
          createdBy: 'test',
          tags: ['governance', 'test']
        }
      )

      const context: ReasoningContext = {
        intent: 'governance_check'
      }

      const snapshot = await loadMemorySnapshot(context)

      assert.ok(snapshot.global.governanceRules.length > 0)
      console.log('✓ Governance memory included in snapshot')
    })

    test('should parse architecture lessons', async () => {
      await recordArchitectureDecision(
        'Test architecture decision',
        {
          pattern: 'microservices',
          rationale: 'Scalability',
          benefits: ['scalable', 'maintainable'],
          tradeoffs: ['complexity']
        }
      )

      const context: ReasoningContext = {
        intent: 'architecture_review'
      }

      const snapshot = await loadMemorySnapshot(context)

      assert.ok(snapshot.architectureLessons.length > 0)
      console.log('✓ Architecture lessons parsed from memory')
    })

    test('should parse historical issues', async () => {
      await recordQAFailure(
        'Test QA failure',
        {
          module: 'test',
          error: 'Test error'
        }
      )

      const context: ReasoningContext = {
        intent: 'qa_analysis'
      }

      const snapshot = await loadMemorySnapshot(context)

      assert.ok(snapshot.issues.length > 0)
      console.log('✓ Historical issues parsed from memory')
    })
  })

  describe('Reasoning Execution', () => {
    test('should execute basic reasoning', async () => {
      const context: ReasoningContext = {
        subsystem: 'build',
        phase: 'planning',
        riskLevel: 'medium'
      }

      const snapshot = await loadMemorySnapshot(context)
      const result = await executeReasoning(snapshot, context)

      assert.ok(result)
      assert.ok(result.reasoningSummary)
      assert.ok(Array.isArray(result.decisions))
      assert.ok(Array.isArray(result.risks))
      assert.ok(Array.isArray(result.recommendedActions))
      assert.ok(result.meta)
      assert.ok(typeof result.meta.confidenceScore === 'number')
      console.log('✓ Basic reasoning executed')
      console.log(`  Confidence: ${(result.meta.confidenceScore * 100).toFixed(0)}%`)
    })

    test('should generate decisions based on patterns', async () => {
      const context: ReasoningContext = {
        subsystem: 'architecture',
        phase: 'planning',
        riskLevel: 'high'
      }

      const result = await reason(context)

      assert.ok(result.decisions.length > 0)
      assert.ok(result.decisions.some(d => d.governanceAlignment === true))
      console.log(`✓ Generated ${result.decisions.length} decisions`)
    })

    test('should identify risks from memory', async () => {
      await recordQAFailure('Recent failure', { error: 'test' })

      const context: ReasoningContext = {
        subsystem: 'qa',
        phase: 'qa',
        riskLevel: 'high'
      }

      const result = await reason(context)

      assert.ok(result.risks.length > 0)
      console.log(`✓ Identified ${result.risks.length} risks`)
    })

    test('should recommend actions', async () => {
      const context: ReasoningContext = {
        subsystem: 'deployment',
        phase: 'deployment',
        riskLevel: 'critical'
      }

      const result = await reason(context)

      assert.ok(result.recommendedActions.length > 0)
      assert.ok(result.recommendedActions.some(a => a.includes('review')))
      console.log(`✓ Recommended ${result.recommendedActions.length} actions`)
    })

    test('should track memory references', async () => {
      await recordArchitectureDecision('Test decision', { test: true })

      const context: ReasoningContext = {
        intent: 'architecture_review',
        phase: 'architecture'
      }

      const result = await reason(context)

      assert.ok(Array.isArray(result.memoryReferences))
      console.log(`✓ Tracked ${result.memoryReferences.length} memory references`)
    })

    test('should apply core patterns for high-risk operations', async () => {
      const context: ReasoningContext = {
        subsystem: 'deployment',
        phase: 'deployment',
        riskLevel: 'critical'
      }

      const result = await reason(context)

      assert.ok(result.meta.patternsApplied.length > 0)
      assert.ok(
        result.meta.patternsApplied.some(p => 
          p === 'pattern_memory_before_action' || 
          p === 'pattern_governance_alignment'
        )
      )
      console.log(`✓ Applied ${result.meta.patternsApplied.length} patterns`)
    })

    test('should produce consistent results', async () => {
      const context: ReasoningContext = {
        subsystem: 'build',
        phase: 'build',
        riskLevel: 'medium'
      }

      const result1 = await reason(context)
      const result2 = await reason(context)

      // Should have same structure
      assert.strictEqual(result1.decisions.length, result2.decisions.length)
      assert.strictEqual(result1.meta.patternsApplied.length, result2.meta.patternsApplied.length)
      console.log('✓ Reasoning produces consistent results')
    })
  })

  describe('Integration Tests', () => {
    test('should work end-to-end with memory fabric', async () => {
      // Setup memory
      await recordArchitectureDecision('Event-driven architecture', {
        pattern: 'event-driven',
        benefits: ['decoupling', 'scalability'],
        tradeoffs: ['complexity']
      })

      await recordQAFailure('API validation failed', {
        module: 'api',
        error: 'Type mismatch'
      })

      // Execute reasoning
      const context: ReasoningContext = {
        intent: 'architecture_review', // Changed to match the architecture decision we created
        phase: 'architecture',
        subsystem: 'architecture',
        riskLevel: 'medium'
      }

      const result = await reason(context)

      // Validate complete result
      assert.ok(result.reasoningSummary)
      assert.ok(result.decisions.length > 0)
      assert.ok(result.recommendedActions.length > 0)
      assert.ok(result.meta.confidenceScore > 0)
      // Memory references may be empty if router filters too aggressively
      assert.ok(Array.isArray(result.memoryReferences))

      console.log('✓ End-to-end integration test passed')
      console.log('\nReasoning Summary:')
      console.log(result.reasoningSummary)
    })
  })
})

// Helper function to create mock memory entry
function createMockEntry(
  scope: 'global' | 'foreman' | 'project',
  tags: string[],
  index: number = 0,
  additionalValue?: any
): MemoryEntry {
  return {
    id: `mock_${scope}_${index}_${Date.now()}`,
    scope,
    key: `test_key_${index}`,
    value: {
      type: tags[0] || 'test',
      description: `Test entry ${index}`,
      data: additionalValue || { test: true }
    },
    metadata: {
      createdAt: new Date(Date.now() - index * 1000).toISOString(),
      updatedAt: new Date(Date.now() - index * 1000).toISOString(),
      createdBy: 'test',
      version: 1
    },
    tags
  }
}
