/**
 * Evolution Cycle Tests
 * End-to-end tests for the evolution cycle
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runEvolutionCycle,
  getEvolutionStats,
  shouldTriggerEvolution
} from '../../../lib/foreman/reasoning/evolution-engine'
import { clearMemoryScope, writeMemoryEntry } from '../../../lib/foreman/memory'
import fs from 'fs'
import path from 'path'

describe('Evolution Cycle', () => {
  
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
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )
    if (fs.existsSync(consolidatedPath)) {
      fs.unlinkSync(consolidatedPath)
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

  test('should run evolution cycle successfully', async () => {
    const result = await runEvolutionCycle('manual')

    assert.ok(result.timestamp, 'Should have timestamp')
    assert.strictEqual(result.cycleType, 'manual', 'Should be manual cycle')
    assert.ok(result.patternsAnalyzed >= 0, 'Should analyze patterns')
    assert.ok(result.summary, 'Should have summary')
    assert.ok(Array.isArray(result.proposals), 'Should have proposals array')
    assert.ok(Array.isArray(result.evolutionEvents), 'Should have events array')
    
    console.log(`✓ Evolution cycle completed: ${result.summary}`)
  })

  test('should produce valid results', async () => {
    const result = await runEvolutionCycle('build_wave')

    assert.strictEqual(result.cycleType, 'build_wave', 'Cycle type should match')
    assert.ok(result.patternsAnalyzed >= 0, 'Should count analyzed patterns')
    assert.ok(result.patternsUpdated >= 0, 'Updated count should be non-negative')
    assert.ok(result.patternsPromoted >= 0, 'Promoted count should be non-negative')
    assert.ok(result.patternsRetired >= 0, 'Retired count should be non-negative')
    
    console.log('✓ Evolution results are valid')
  })

  test('should save consolidated patterns', async () => {
    await runEvolutionCycle('deployment')

    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    assert.ok(fs.existsSync(consolidatedPath), 'Should create consolidated patterns file')

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
    assert.ok(data.lastUpdated, 'Should have lastUpdated field')
    assert.ok(data.patterns, 'Should have patterns field')
    assert.ok(typeof data.totalPatterns === 'number', 'Should count total patterns')
    
    console.log('✓ Consolidated patterns saved correctly')
  })

  test('should log governance events', async () => {
    const result = await runEvolutionCycle('scheduled')

    const governancePath = path.join(
      process.cwd(),
      'memory',
      'global',
      'governance-events.json'
    )

    if (result.evolutionEvents.length > 0) {
      assert.ok(fs.existsSync(governancePath), 'Should create governance events file')

      const events = JSON.parse(fs.readFileSync(governancePath, 'utf-8'))
      assert.ok(Array.isArray(events), 'Events should be an array')
      
      if (events.length > 0) {
        const event = events[0]
        assert.ok(event.type, 'Event should have type')
        assert.ok(event.patternId, 'Event should have patternId')
        assert.ok(event.timestamp, 'Event should have timestamp')
        assert.ok(event.sourceEvidence, 'Event should have source evidence')
      }
      
      console.log('✓ Governance events logged correctly')
    } else {
      console.log('✓ No evolution events in this cycle (expected for empty patterns)')
    }
  })

  test('should get evolution statistics', async () => {
    await runEvolutionCycle('manual')
    
    const stats = await getEvolutionStats()

    assert.ok(typeof stats.totalPatterns === 'number', 'Should count total patterns')
    assert.ok(typeof stats.stablePatterns === 'number', 'Should count stable patterns')
    assert.ok(typeof stats.monitoredPatterns === 'number', 'Should count monitored patterns')
    assert.ok(typeof stats.retirementCandidates === 'number', 'Should count retirement candidates')
    assert.ok(typeof stats.totalEvolutions === 'number', 'Should count total evolutions')
    
    console.log('✓ Evolution statistics retrieved')
  })

  test('should trigger evolution based on context', () => {
    const shouldTrigger1 = shouldTriggerEvolution({ buildWaveCompleted: true })
    assert.strictEqual(shouldTrigger1, true, 'Should trigger on build wave completion')

    const shouldTrigger2 = shouldTriggerEvolution({ deploymentCompleted: true })
    assert.strictEqual(shouldTrigger2, true, 'Should trigger on deployment completion')

    const shouldTrigger3 = shouldTriggerEvolution({ daysSinceLastEvolution: 8 })
    assert.strictEqual(shouldTrigger3, true, 'Should trigger after 7 days')

    const shouldTrigger4 = shouldTriggerEvolution({ daysSinceLastEvolution: 5 })
    assert.strictEqual(shouldTrigger4, false, 'Should not trigger before 7 days')

    console.log('✓ Evolution trigger logic working correctly')
  })

  test('should handle empty pattern list gracefully', async () => {
    // Run cycle with no custom patterns
    const result = await runEvolutionCycle('manual', { minUsageCount: 1000 })

    assert.ok(result.summary, 'Should have summary even with no updates')
    assert.ok(result.patternsAnalyzed >= 0, 'Should handle empty results')
    
    console.log('✓ Empty pattern list handled gracefully')
  })

  test('should respect configuration options', async () => {
    const config = {
      minUsageCount: 100,
      minConfidence: 0.9,
      enableRetirement: false,
      enablePromotion: false
    }

    const result = await runEvolutionCycle('manual', config)

    // With high thresholds, we expect no updates
    assert.strictEqual(result.patternsRetired, 0, 'Should respect enableRetirement')
    assert.strictEqual(result.patternsPromoted, 0, 'Should respect enablePromotion')
    
    console.log('✓ Configuration options respected')
  })
})
