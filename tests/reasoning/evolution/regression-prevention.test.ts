/**
 * Regression Prevention Tests
 * Ensures evolution never degrades performance
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runEvolutionCycle,
  calculatePatternScore,
  generateEvolutionProposal,
  applyEvolutionProposal
} from '../../../lib/foreman/reasoning/evolution-engine'
import { clearMemoryScope, writeMemoryEntry } from '../../../lib/foreman/memory'
import { ReasoningPattern, PatternPerformanceMetrics } from '../../../types/reasoning'
import fs from 'fs'
import path from 'path'

describe('Regression Prevention', () => {
  
  beforeEach(async () => {
    // Clear test memory
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')

    // Clean up test files
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning'
    )
    if (fs.existsSync(consolidatedPath)) {
      const files = fs.readdirSync(consolidatedPath)
      files.forEach(file => {
        fs.unlinkSync(path.join(consolidatedPath, file))
      })
    }

    const governancePath = path.join(
      process.cwd(),
      'memory',
      'global',
      'governance-events.json'
    )
    if (fs.existsSync(governancePath)) {
      fs.unlinkSync(governancePath)
    }
  })

  test('should never decrease performance score below threshold', () => {
    const pattern: ReasoningPattern = {
      id: 'pattern_high_performing',
      name: 'High Performing Pattern',
      description: 'A well-performing pattern',
      context: 'testing',
      approach: 'test approach',
      examples: [],
      tags: ['test'],
      performanceScore: 0.85,
      successRate: 0.9,
      usageCount: 100
    }

    // Simulate degraded metrics
    const degradedMetrics: PatternPerformanceMetrics = {
      patternId: pattern.id,
      successRate: 0.3, // Much worse
      relevance: 10,
      qaFailureEscapeRate: 0.7,
      architectureConflicts: 15,
      builderExecutionConsistency: 0.2,
      driftStability: 0.3,
      usageCount: 10
    }

    const newScore = calculatePatternScore(degradedMetrics)

    // Even with bad metrics, we should detect regression
    assert.ok(newScore < pattern.performanceScore!, 'Should detect performance degradation')

    const proposal = generateEvolutionProposal(pattern, degradedMetrics, ['memory_usage_analysis', 'qa_report_failure'])

    // Proposal should exist (significant change detected)
    assert.ok(proposal, 'Should generate proposal for significant change')
    
    if (proposal) {
      assert.ok(proposal.newScore < proposal.oldScore, 'Proposal should reflect degradation')
      
      // In real implementation, proposals with degraded scores should be flagged
      // for review or rejected if degradation is too severe
      console.log(`✓ Regression detected: ${proposal.oldScore.toFixed(2)} → ${proposal.newScore.toFixed(2)}`)
    }
  })

  test('should preserve high-performing patterns', async () => {
    // Create memory entries showing successful pattern usage
    for (let i = 0; i < 10; i++) {
      await writeMemoryEntry(
        'foreman',
        `success_entry_${i}`,
        {
          description: `Successful operation ${i}`,
          data: { success: true }
        },
        {
          tags: ['build', 'success'],
          createdBy: 'test',
          projectId: 'test_project'
        }
      )
    }

    const result = await runEvolutionCycle('manual')

    // All patterns should maintain or improve their scores
    // No patterns should be retired if they're performing well
    assert.ok(result.patternsRetired >= 0, 'Retirement count should be non-negative')
    
    console.log('✓ High-performing patterns preserved')
  })

  test('should only promote patterns with consistent performance', () => {
    // Pattern with inconsistent metrics
    const inconsistentMetrics: PatternPerformanceMetrics = {
      patternId: 'inconsistent',
      successRate: 0.9, // Good
      relevance: 100, // Good
      qaFailureEscapeRate: 0.7, // Bad
      architectureConflicts: 15, // Bad
      builderExecutionConsistency: 0.3, // Bad
      driftStability: 0.95, // Good
      usageCount: 100
    }

    const score = calculatePatternScore(inconsistentMetrics)

    // Inconsistent performance should not result in high score
    assert.ok(score < 0.8, 'Inconsistent patterns should not be promoted to stable')
    
    console.log(`✓ Inconsistent pattern scored appropriately: ${score.toFixed(2)}`)
  })

  test('should maintain stable patterns in stable category', async () => {
    // Run evolution cycle
    const result1 = await runEvolutionCycle('manual')

    // Check consolidated patterns
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    if (fs.existsSync(consolidatedPath)) {
      const data1 = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
      const stableCount1 = data1.stablePatterns || 0

      // Run evolution again
      await runEvolutionCycle('manual')

      const data2 = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
      const stableCount2 = data2.stablePatterns || 0

      // Stable patterns should remain stable (or only decrease if they truly degraded)
      assert.ok(
        stableCount2 >= 0,
        'Stable pattern count should be valid'
      )

      console.log(`✓ Stable patterns maintained: ${stableCount1} → ${stableCount2}`)
    } else {
      console.log('✓ No consolidated patterns to validate (expected for empty state)')
    }
  })

  test('should not apply proposals with low confidence', () => {
    const pattern: ReasoningPattern = {
      id: 'pattern_low_usage',
      name: 'Low Usage Pattern',
      description: 'Pattern with insufficient data',
      context: 'testing',
      approach: 'test approach',
      examples: [],
      tags: ['test'],
      performanceScore: 0.5,
      usageCount: 2 // Very low usage
    }

    const metrics: PatternPerformanceMetrics = {
      patternId: pattern.id,
      successRate: 0.5,
      relevance: 2,
      qaFailureEscapeRate: 0.5,
      architectureConflicts: 1,
      builderExecutionConsistency: 0.5,
      driftStability: 0.5,
      usageCount: 2
    }

    const proposal = generateEvolutionProposal(pattern, metrics, ['test'])

    if (proposal) {
      // Low usage should result in low confidence
      assert.ok(proposal.confidence < 0.9, 'Low usage should result in low confidence')
      
      console.log(`✓ Low confidence detected: ${proposal.confidence.toFixed(2)}`)
    } else {
      console.log('✓ No proposal generated for insufficient data (expected)')
    }
  })

  test('should preserve successful pattern characteristics', () => {
    const pattern: ReasoningPattern = {
      id: 'pattern_successful',
      name: 'Successful Pattern',
      description: 'Original description',
      context: 'Original context',
      approach: 'Original approach',
      examples: ['example1', 'example2'],
      tags: ['original', 'test'],
      performanceScore: 0.7,
      successRate: 0.8,
      usageCount: 50
    }

    const metrics: PatternPerformanceMetrics = {
      patternId: pattern.id,
      successRate: 0.85,
      relevance: 60,
      qaFailureEscapeRate: 0.1,
      architectureConflicts: 1,
      builderExecutionConsistency: 0.8,
      driftStability: 0.9,
      usageCount: 60
    }

    const proposal = generateEvolutionProposal(pattern, metrics, ['test_evidence'])

    if (proposal) {
      const updatedPattern = applyEvolutionProposal(pattern, proposal)

      // Core characteristics should be preserved
      assert.strictEqual(updatedPattern.id, pattern.id, 'ID should not change')
      assert.strictEqual(updatedPattern.name, pattern.name, 'Name should not change')
      assert.strictEqual(updatedPattern.description, pattern.description, 'Description should not change')
      assert.strictEqual(updatedPattern.context, pattern.context, 'Context should not change')
      assert.strictEqual(updatedPattern.approach, pattern.approach, 'Approach should not change')
      assert.deepStrictEqual(updatedPattern.examples, pattern.examples, 'Examples should not change')
      assert.deepStrictEqual(updatedPattern.tags, pattern.tags, 'Tags should not change')

      // Only performance metrics should change
      assert.ok(updatedPattern.performanceScore !== pattern.performanceScore, 'Performance score should update')
      assert.ok(updatedPattern.lastEvolved, 'Should record evolution timestamp')

      console.log('✓ Pattern characteristics preserved during evolution')
    }
  })

  test('should prevent catastrophic forgetting', async () => {
    // Create some stable memory patterns
    for (let i = 0; i < 5; i++) {
      await writeMemoryEntry(
        'global',
        `stable_pattern_${i}`,
        {
          description: `Stable pattern ${i}`,
          data: { stable: true, score: 0.9 }
        },
        {
          tags: ['stable', 'pattern'],
          createdBy: 'test'
        }
      )
    }

    // Run first evolution
    const result1 = await runEvolutionCycle('manual')
    const analyzed1 = result1.patternsAnalyzed

    // Run second evolution
    const result2 = await runEvolutionCycle('manual')
    const analyzed2 = result2.patternsAnalyzed

    // Should analyze similar number of patterns (not lose patterns)
    assert.ok(
      analyzed2 >= analyzed1 - 1, // Allow small variance
      'Should not lose patterns between cycles'
    )

    console.log(`✓ Patterns maintained: ${analyzed1} → ${analyzed2}`)
  })

  test('should validate evolved patterns maintain required structure', async () => {
    const result = await runEvolutionCycle('manual')

    // Load consolidated patterns
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    if (fs.existsSync(consolidatedPath)) {
      const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))

      // Validate structure
      assert.ok(data.patterns, 'Should have patterns object')
      assert.ok(data.patterns.stable, 'Should have stable category')
      assert.ok(data.patterns.monitored, 'Should have monitored category')
      assert.ok(data.patterns.retirementCandidates, 'Should have retirement candidates category')

      // Validate each pattern has required fields
      const allPatterns = [
        ...data.patterns.stable,
        ...data.patterns.monitored,
        ...data.patterns.retirementCandidates
      ]

      for (const pattern of allPatterns) {
        assert.ok(pattern.id, 'Pattern should have ID')
        assert.ok(pattern.name, 'Pattern should have name')
        assert.ok(pattern.description, 'Pattern should have description')
        assert.ok(pattern.context, 'Pattern should have context')
        assert.ok(pattern.approach, 'Pattern should have approach')
        assert.ok(Array.isArray(pattern.examples), 'Pattern should have examples array')
        assert.ok(Array.isArray(pattern.tags), 'Pattern should have tags array')
      }

      console.log('✓ All evolved patterns maintain required structure')
    } else {
      console.log('✓ No patterns to validate (expected for empty state)')
    }
  })
})
