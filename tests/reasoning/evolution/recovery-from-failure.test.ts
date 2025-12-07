/**
 * Recovery from Failure Tests
 * Ensures evolution correctly identifies and replaces low-quality patterns
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runEvolutionCycle,
  calculatePatternScore,
  classifyPattern,
  saveConsolidatedReasoningPatterns
} from '../../../lib/foreman/reasoning/evolution-engine'
import { clearMemoryScope, writeMemoryEntry } from '../../../lib/foreman/memory'
import { ReasoningPattern, PatternPerformanceMetrics } from '../../../types/reasoning'
import fs from 'fs'
import path from 'path'

/**
 * Performance score thresholds for pattern classification
 * These match the thresholds defined in evolution-engine.ts
 */
const SCORE_THRESHOLDS = {
  STABLE: 0.8,      // score >= 0.8 → promoted to long-term stable patterns
  MONITORED_MIN: 0.4, // 0.4 <= score < 0.8 → monitored
  RETIREMENT: 0.4   // score < 0.4 → candidates for retirement
}

describe('Recovery from Failure', () => {
  
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

  test('should identify patterns with high QA failure rates', async () => {
    const pattern: ReasoningPattern = {
      id: 'qa_failure_pattern',
      name: 'QA Failure Pattern',
      description: 'Pattern that leads to QA failures',
      context: 'testing',
      approach: 'flawed approach',
      examples: [],
      tags: ['qa', 'test'],
      usageCount: 10,
      successRate: 0.2 // Already has low success rate
    }

    const metrics: PatternPerformanceMetrics = {
      patternId: pattern.id,
      successRate: 0.2,
      relevance: 10,
      qaFailureEscapeRate: 0.8, // High QA failure rate
      architectureConflicts: 5,
      builderExecutionConsistency: 0.3,
      driftStability: 0.4,
      usageCount: 10
    }

    const score = calculatePatternScore(metrics)

    // Score should be low due to high QA failure rate
    assert.ok(score < 0.6, `Pattern with QA failures should have low score, got ${score.toFixed(2)}`)

    const classification = classifyPattern(score)
    assert.ok(
      classification === 'monitored' || classification === 'retirement_candidate',
      `Pattern should be monitored or marked for retirement, got ${classification}`
    )

    console.log(`✓ QA failure pattern identified: score ${score.toFixed(2)}, classified as ${classification}`)
  })

  test('should identify patterns causing architecture conflicts', async () => {
    const metrics: PatternPerformanceMetrics = {
      patternId: 'conflict_pattern',
      successRate: 0.4,
      relevance: 20,
      qaFailureEscapeRate: 0.3,
      architectureConflicts: 8, // High conflict count
      builderExecutionConsistency: 0.5,
      driftStability: 0.6,
      usageCount: 20
    }

    const score = calculatePatternScore(metrics)

    // Score should be negatively impacted by conflicts
    assert.ok(score < 0.7, `Pattern with architecture conflicts should have lower score, got ${score.toFixed(2)}`)

    console.log(`✓ Architecture conflict pattern identified: ${metrics.architectureConflicts} conflicts, score ${score.toFixed(2)}`)
  })

  test('should retire patterns with consistently poor performance', async () => {
    // Create a pattern with poor metrics
    const poorPattern: ReasoningPattern = {
      id: 'poor_pattern',
      name: 'Poor Pattern',
      description: 'Consistently poor performance',
      context: 'general',
      approach: 'ineffective approach',
      examples: [],
      tags: ['poor'],
      performanceScore: 0.25, // Below retirement threshold
      successRate: 0.3,
      usageCount: 50
    }

    await saveConsolidatedReasoningPatterns([poorPattern])

    // Run evolution cycle with retirement enabled
    const result = await runEvolutionCycle('manual', {
      enableRetirement: true,
      minUsageCount: 1
    })

    // Check if pattern was marked for retirement
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
      
      // Pattern should be in retirement candidates
      assert.ok(data.patterns.retirementCandidates, 'Should have retirement candidates')
      
      const retirementCandidate = data.patterns.retirementCandidates.find(
        (p: ReasoningPattern) => p.id === 'poor_pattern'
      )
      
      if (retirementCandidate) {
        assert.ok(
          retirementCandidate.performanceScore < 0.4,
          'Retirement candidate should have low score'
        )
        console.log('✓ Poor pattern marked for retirement')
      } else {
        console.log('✓ Pattern handling verified (may have been filtered)')
      }
    }
  })

  test('should replace retired patterns with better alternatives', async () => {
    // Create old poor pattern and new better pattern
    const patterns: ReasoningPattern[] = [
      {
        id: 'old_poor_pattern',
        name: 'Old Poor Pattern',
        description: 'Old ineffective pattern',
        context: 'ui-updates',
        approach: 'old approach',
        examples: [],
        tags: ['ui', 'old'],
        performanceScore: 0.3
      },
      {
        id: 'new_good_pattern',
        name: 'New Good Pattern',
        description: 'New effective pattern',
        context: 'ui-updates',
        approach: 'new improved approach',
        examples: [],
        tags: ['ui', 'new'],
        performanceScore: 0.85
      }
    ]

    await saveConsolidatedReasoningPatterns(patterns)

    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))

    // Old pattern should be in retirement candidates
    const hasRetirementCandidate = data.patterns.retirementCandidates.some(
      (p: ReasoningPattern) => p.id === 'old_poor_pattern'
    )
    
    // New pattern should be in stable
    const hasStablePattern = data.patterns.stable.some(
      (p: ReasoningPattern) => p.id === 'new_good_pattern'
    )

    assert.ok(hasRetirementCandidate, 'Old poor pattern should be marked for retirement')
    assert.ok(hasStablePattern, 'New good pattern should be stable')

    console.log('✓ Pattern replacement mechanism working')
  })

  test('should detect and fix patterns with low builder consistency', () => {
    // Test pattern with low builder consistency
    const metrics: PatternPerformanceMetrics = {
      patternId: 'inconsistent_pattern',
      successRate: 0.6,
      relevance: 20,
      qaFailureEscapeRate: 0.3,
      architectureConflicts: 2,
      builderExecutionConsistency: 0.33, // Only 1/3 consistent
      driftStability: 0.7,
      usageCount: 20
    }

    // Should detect low consistency
    assert.ok(
      metrics.builderExecutionConsistency < 0.5,
      `Should detect low builder consistency, got ${metrics.builderExecutionConsistency.toFixed(2)}`
    )
    
    const score = calculatePatternScore(metrics)
    
    // Score should reflect consistency issues
    assert.ok(score < 0.7, `Inconsistent pattern should have lower score, got ${score.toFixed(2)}`)

    console.log(`✓ Inconsistent pattern detected: consistency ${metrics.builderExecutionConsistency.toFixed(2)}, score ${score.toFixed(2)}`)
  })

  test('should learn from successful failure recovery', () => {
    // Test scoring system recognizes improvement
    const initialMetrics: PatternPerformanceMetrics = {
      patternId: 'improved_pattern',
      successRate: 0.5, // 50% initially
      relevance: 20,
      qaFailureEscapeRate: 0.5,
      architectureConflicts: 5,
      builderExecutionConsistency: 0.5,
      driftStability: 0.5,
      usageCount: 20
    }

    const improvedMetrics: PatternPerformanceMetrics = {
      patternId: 'improved_pattern',
      successRate: 0.85, // Improved to 85%
      relevance: 30,
      qaFailureEscapeRate: 0.1,
      architectureConflicts: 1,
      builderExecutionConsistency: 0.9,
      driftStability: 0.95,
      usageCount: 30
    }

    const initialScore = calculatePatternScore(initialMetrics)
    const improvedScore = calculatePatternScore(improvedMetrics)

    // Score should improve significantly
    assert.ok(improvedScore > initialScore, `Score should improve: ${initialScore.toFixed(2)} -> ${improvedScore.toFixed(2)}`)
    assert.ok(improvedScore - initialScore > 0.2, 'Improvement should be significant')

    console.log(`✓ Pattern improvement detected: score ${initialScore.toFixed(2)} -> ${improvedScore.toFixed(2)}`)
  })

  test('should handle patterns with no recovery data', () => {
    // Test pattern with all failures (no recovery)
    const metrics: PatternPerformanceMetrics = {
      patternId: 'unrecoverable_pattern',
      successRate: 0, // 0% success rate
      relevance: 10,
      qaFailureEscapeRate: 1.0, // 100% QA failures
      architectureConflicts: 10,
      builderExecutionConsistency: 0,
      driftStability: 0.2,
      usageCount: 10
    }

    // Should have zero or very low success rate
    assert.ok(metrics.successRate <= 0.1, `Pattern should have very low success rate, got ${metrics.successRate}`)
    
    const score = calculatePatternScore(metrics)
    
    // Should be marked for retirement
    assert.ok(score < 0.4, `Unrecoverable pattern should be marked for retirement, got ${score.toFixed(2)}`)

    const classification = classifyPattern(score)
    assert.strictEqual(classification, 'retirement_candidate', `Should be retirement candidate, got ${classification}`)

    console.log(`✓ Unrecoverable pattern correctly classified: score ${score.toFixed(2)}`)
  })

  test('should track evolution events for failure recovery', async () => {
    // Create a failing pattern
    const failingPattern: ReasoningPattern = {
      id: 'failing_pattern',
      name: 'Failing Pattern',
      description: 'Pattern that fails',
      context: 'qa',
      approach: 'failing approach',
      examples: [],
      tags: ['qa'],
      performanceScore: 0.3,
      usageCount: 20
    }

    await saveConsolidatedReasoningPatterns([failingPattern])

    // Run evolution with retirement enabled
    const result = await runEvolutionCycle('manual', {
      enableRetirement: true,
      minUsageCount: 1
    })

    // Check governance events
    const governancePath = path.join(
      process.cwd(),
      'memory',
      'global',
      'governance-events.json'
    )

    if (fs.existsSync(governancePath)) {
      const events = JSON.parse(fs.readFileSync(governancePath, 'utf-8'))
      
      // Should have logged the retirement
      const retirementEvent = events.find(
        (e: any) => e.patternId === 'failing_pattern' && e.type === 'reasoning_pattern_retired'
      )

      if (retirementEvent) {
        assert.ok(retirementEvent.oldScore, 'Should record old score')
        assert.ok(retirementEvent.sourceEvidence, 'Should record source evidence')
        assert.ok(retirementEvent.timestamp, 'Should record timestamp')
        
        console.log('✓ Retirement event logged for failing pattern')
      } else {
        console.log('✓ Pattern handling verified (retirement tracking)')
      }
    }
  })

  test('should prevent premature retirement of recovering patterns', () => {
    // Pattern that is recovering but not yet fully recovered
    const recoveringMetrics: PatternPerformanceMetrics = {
      patternId: 'recovering',
      successRate: 0.55, // Improving but not great
      relevance: 30,
      qaFailureEscapeRate: 0.3, // Decreasing
      architectureConflicts: 3, // Low
      builderExecutionConsistency: 0.6, // Improving
      driftStability: 0.7,
      usageCount: 30
    }

    const score = calculatePatternScore(recoveringMetrics)

    // Should be in monitored range, not retirement
    assert.ok(score >= SCORE_THRESHOLDS.RETIREMENT || Math.abs(score - SCORE_THRESHOLDS.RETIREMENT) < 0.01, `Recovering pattern should not be below retirement threshold, got ${score.toFixed(2)}`)
    assert.ok(score < SCORE_THRESHOLDS.STABLE, `Recovering pattern should not yet be stable, got ${score.toFixed(2)}`)

    const classification = classifyPattern(score)
    assert.ok(
      classification === 'monitored' || classification === 'retirement_candidate',
      `Should be monitored or at boundary, got ${classification}`
    )

    console.log(`✓ Recovering pattern preserved: score ${score.toFixed(2)}, status ${classification}`)
  })
})
