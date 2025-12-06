/**
 * Pattern Scoring Tests
 * Tests for reasoning pattern performance scoring
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  calculatePatternScore,
  analyzePatternPerformance,
  classifyPattern
} from '../../../lib/foreman/reasoning/evolution-engine'
import {
  PatternPerformanceMetrics,
  ReasoningPattern
} from '../../../types/reasoning'
import { clearMemoryScope, writeMemoryEntry } from '../../../lib/foreman/memory'

describe('Pattern Scoring', () => {
  
  beforeEach(async () => {
    // Clear test memory
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })

  test('should calculate performance score from metrics', () => {
    const metrics: PatternPerformanceMetrics = {
      patternId: 'test_pattern_1',
      successRate: 0.9,
      relevance: 50,
      qaFailureEscapeRate: 0.1,
      architectureConflicts: 2,
      builderExecutionConsistency: 0.85,
      driftStability: 0.95,
      usageCount: 50
    }

    const score = calculatePatternScore(metrics)

    assert.ok(score >= 0 && score <= 1, 'Score should be between 0 and 1')
    assert.ok(score > 0.5, 'Score should be positive for good metrics')
    console.log(`✓ Score calculated: ${score.toFixed(3)}`)
  })

  test('should give higher score to better metrics', () => {
    const goodMetrics: PatternPerformanceMetrics = {
      patternId: 'good_pattern',
      successRate: 0.95,
      relevance: 100,
      qaFailureEscapeRate: 0.05,
      architectureConflicts: 1,
      builderExecutionConsistency: 0.9,
      driftStability: 0.95,
      usageCount: 100
    }

    const poorMetrics: PatternPerformanceMetrics = {
      patternId: 'poor_pattern',
      successRate: 0.4,
      relevance: 10,
      qaFailureEscapeRate: 0.6,
      architectureConflicts: 15,
      builderExecutionConsistency: 0.3,
      driftStability: 0.4,
      usageCount: 10
    }

    const goodScore = calculatePatternScore(goodMetrics)
    const poorScore = calculatePatternScore(poorMetrics)

    assert.ok(goodScore > poorScore, 'Good metrics should produce higher score')
    console.log(`✓ Good score (${goodScore.toFixed(3)}) > Poor score (${poorScore.toFixed(3)})`)
  })

  test('should classify patterns correctly', () => {
    const stableScore = 0.85
    const monitoredScore = 0.6
    const retirementScore = 0.3

    assert.strictEqual(classifyPattern(stableScore), 'stable')
    assert.strictEqual(classifyPattern(monitoredScore), 'monitored')
    assert.strictEqual(classifyPattern(retirementScore), 'retirement_candidate')
    
    console.log('✓ Pattern classification working correctly')
  })

  test('should handle edge cases in scoring', () => {
    // All perfect metrics
    const perfectMetrics: PatternPerformanceMetrics = {
      patternId: 'perfect',
      successRate: 1.0,
      relevance: 200,
      qaFailureEscapeRate: 0,
      architectureConflicts: 0,
      builderExecutionConsistency: 1.0,
      driftStability: 1.0,
      usageCount: 200
    }

    const perfectScore = calculatePatternScore(perfectMetrics)
    assert.ok(perfectScore > 0.8, 'Perfect metrics should give high score')

    // All poor metrics
    const worstMetrics: PatternPerformanceMetrics = {
      patternId: 'worst',
      successRate: 0,
      relevance: 0,
      qaFailureEscapeRate: 1.0,
      architectureConflicts: 50,
      builderExecutionConsistency: 0,
      driftStability: 0,
      usageCount: 0
    }

    const worstScore = calculatePatternScore(worstMetrics)
    assert.ok(worstScore >= 0, 'Score should not go negative')
    assert.ok(worstScore < 0.3, 'Worst metrics should give low score')
    
    console.log('✓ Edge cases handled correctly')
  })

  test('should analyze pattern performance from memory', async () => {
    const pattern: ReasoningPattern = {
      id: 'pattern_test_1',
      name: 'Test Pattern',
      description: 'A test pattern',
      context: 'testing',
      approach: 'test approach',
      examples: [],
      tags: ['test'],
      usageCount: 0
    }

    // Create some memory entries that use this pattern
    await writeMemoryEntry(
      'foreman',
      'test_entry_1',
      {
        description: 'Successful build',
      },
      {
        tags: ['build'],
        createdBy: 'test',
        projectId: 'test_project'
      }
    )

    await writeMemoryEntry(
      'foreman',
      'test_entry_2',
      {
        description: 'Failed QA',
      },
      {
        tags: ['build', 'qa_failure'],
        createdBy: 'test',
        projectId: 'test_project'
      }
    )

    const metrics = await analyzePatternPerformance(pattern)

    assert.ok(metrics.usageCount >= 0, 'Should count pattern usages')
    assert.ok(metrics.successRate >= 0 && metrics.successRate <= 1, 'Success rate should be valid')
    assert.ok(metrics.qaFailureEscapeRate >= 0, 'QA failure rate should be valid')
    
    console.log('✓ Pattern performance analyzed from memory')
  })

  test('should handle patterns with no usage data', async () => {
    const pattern: ReasoningPattern = {
      id: 'unused_pattern',
      name: 'Unused Pattern',
      description: 'Never used',
      context: 'unused',
      approach: 'none',
      examples: [],
      tags: ['unused'],
      usageCount: 0
    }

    const metrics = await analyzePatternPerformance(pattern)

    assert.strictEqual(metrics.usageCount, 0, 'Should have zero usage')
    assert.ok(metrics.successRate >= 0, 'Should handle division by zero')
    
    console.log('✓ Unused patterns handled correctly')
  })
})
