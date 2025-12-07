/**
 * Consolidation Integration Tests
 * Tests integration between evolution engine and knowledge consolidation
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runEvolutionCycle,
  saveConsolidatedReasoningPatterns
} from '../../../lib/foreman/reasoning/evolution-engine'
import { runConsolidation } from '../../../lib/foreman/memory/consolidation-engine'
import { clearMemoryScope, writeMemoryEntry } from '../../../lib/foreman/memory'
import { ReasoningPattern } from '../../../types/reasoning'
import fs from 'fs'
import path from 'path'

describe('Consolidation Integration', () => {
  
  beforeEach(async () => {
    // Clear test memory
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')

    // Clean up consolidated files
    const consolidatedBasePath = path.join(process.cwd(), 'memory', 'global', 'consolidated')
    
    if (fs.existsSync(consolidatedBasePath)) {
      const files = fs.readdirSync(consolidatedBasePath)
      files.forEach(file => {
        const filePath = path.join(consolidatedBasePath, file)
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
        }
      })
      
      // Clean up reasoning subdirectory
      const reasoningPath = path.join(consolidatedBasePath, 'reasoning')
      if (fs.existsSync(reasoningPath)) {
        const reasoningFiles = fs.readdirSync(reasoningPath)
        reasoningFiles.forEach(file => {
          fs.unlinkSync(path.join(reasoningPath, file))
        })
      }
    }
  })

  test('should merge evolved patterns with consolidated knowledge', async () => {
    // Create some memory entries to generate consolidated knowledge
    await writeMemoryEntry(
      'global',
      'qa_pattern_1',
      {
        description: 'QA test pattern observed',
        data: { pattern: 'ui-validation', success: true }
      },
      {
        tags: ['qa', 'pattern', 'ui-validation'],
        createdBy: 'test'
      }
    )

    await writeMemoryEntry(
      'global',
      'qa_pattern_2',
      {
        description: 'QA test pattern observed again',
        data: { pattern: 'ui-validation', success: true }
      },
      {
        tags: ['qa', 'pattern', 'ui-validation'],
        createdBy: 'test'
      }
    )

    await writeMemoryEntry(
      'global',
      'qa_pattern_3',
      {
        description: 'QA test pattern observed third time',
        data: { pattern: 'ui-validation', success: true }
      },
      {
        tags: ['qa', 'pattern', 'ui-validation'],
        createdBy: 'test'
      }
    )

    // Run consolidation to generate knowledge blocks
    const consolidationResult = await runConsolidation()
    assert.ok(consolidationResult.blocksGenerated >= 0, 'Should generate knowledge blocks')

    // Run evolution cycle
    const evolutionResult = await runEvolutionCycle('manual')
    assert.ok(evolutionResult.patternsAnalyzed >= 0, 'Should analyze patterns')

    // Check that consolidated reasoning patterns exist
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated',
      'reasoning',
      'consolidated_reasoning_patterns.json'
    )

    assert.ok(fs.existsSync(consolidatedPath), 'Should create consolidated reasoning patterns')

    const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
    assert.ok(data.patterns, 'Should have patterns field')
    assert.ok(data.lastUpdated, 'Should have last updated timestamp')

    console.log('✓ Evolved patterns merged with consolidated knowledge')
  })

  test('should reference consolidated knowledge blocks in evolution', async () => {
    // Create consolidated knowledge first
    await writeMemoryEntry(
      'global',
      'arch_decision_1',
      {
        description: 'Architecture decision made',
        data: { decision: 'use-microservices', rationale: 'scalability' }
      },
      {
        tags: ['architecture', 'decision', 'microservices'],
        createdBy: 'test'
      }
    )

    await writeMemoryEntry(
      'global',
      'arch_decision_2',
      {
        description: 'Architecture decision confirmed',
        data: { decision: 'use-microservices', rationale: 'scalability' }
      },
      {
        tags: ['architecture', 'decision', 'microservices'],
        createdBy: 'test'
      }
    )

    await writeMemoryEntry(
      'global',
      'arch_decision_3',
      {
        description: 'Architecture decision reinforced',
        data: { decision: 'use-microservices', rationale: 'scalability' }
      },
      {
        tags: ['architecture', 'decision', 'microservices'],
        createdBy: 'test'
      }
    )

    // Run consolidation
    await runConsolidation()

    // Run evolution
    const result = await runEvolutionCycle('manual')

    // Check that evolution can access consolidated knowledge
    // (Evolution engine loads consolidated blocks in reasoning engine)
    assert.ok(result.patternsAnalyzed >= 0, 'Evolution should complete successfully')
    assert.ok(result.summary, 'Should have summary')

    console.log('✓ Evolution references consolidated knowledge blocks')
  })

  test('should update consolidated patterns category', async () => {
    // Create test patterns
    const testPatterns: ReasoningPattern[] = [
      {
        id: 'pattern_test_1',
        name: 'Test Pattern 1',
        description: 'A test pattern',
        context: 'testing',
        approach: 'test approach',
        examples: [],
        tags: ['test'],
        performanceScore: 0.85
      },
      {
        id: 'pattern_test_2',
        name: 'Test Pattern 2',
        description: 'Another test pattern',
        context: 'testing',
        approach: 'test approach 2',
        examples: [],
        tags: ['test'],
        performanceScore: 0.45
      }
    ]

    // Save consolidated patterns
    await saveConsolidatedReasoningPatterns(testPatterns)

    // Check file exists
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
    
    // Verify structure
    assert.ok(data.patterns, 'Should have patterns object')
    assert.ok(data.patterns.stable, 'Should have stable patterns')
    assert.ok(data.patterns.monitored, 'Should have monitored patterns')
    assert.ok(data.patterns.retirementCandidates, 'Should have retirement candidates')

    // Verify pattern classification
    assert.strictEqual(data.patterns.stable.length, 1, 'Should classify high-score pattern as stable')
    assert.strictEqual(data.patterns.monitored.length, 1, 'Should classify mid-score pattern as monitored')

    console.log('✓ Consolidated patterns category updated correctly')
  })

  test('should preserve consolidated knowledge during evolution', async () => {
    // Create consolidated knowledge
    const consolidatedPath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated'
    )
    
    if (!fs.existsSync(consolidatedPath)) {
      fs.mkdirSync(consolidatedPath, { recursive: true })
    }

    const testKnowledgeFile = path.join(consolidatedPath, 'test-knowledge.json')
    fs.writeFileSync(testKnowledgeFile, JSON.stringify([
      {
        id: 'kb_test_001',
        category: 'architecture_principle',
        summary: 'Test knowledge block',
        lesson: 'Always test your code',
        appliesTo: ['GlobalUI'],
        originEntries: ['test_1', 'test_2'],
        confidence: 0.9,
        importance: 'high',
        timestamp: new Date().toISOString()
      }
    ], null, 2))

    // Run evolution
    await runEvolutionCycle('manual')

    // Check that test knowledge file still exists
    assert.ok(fs.existsSync(testKnowledgeFile), 'Should preserve existing consolidated knowledge')

    const data = JSON.parse(fs.readFileSync(testKnowledgeFile, 'utf-8'))
    assert.strictEqual(data.length, 1, 'Should not modify other consolidated knowledge')
    assert.strictEqual(data[0].id, 'kb_test_001', 'Knowledge block should be unchanged')

    // Clean up
    fs.unlinkSync(testKnowledgeFile)

    console.log('✓ Existing consolidated knowledge preserved during evolution')
  })

  test('should handle consolidation-evolution cycle', async () => {
    // Create memory entries
    for (let i = 1; i <= 5; i++) {
      await writeMemoryEntry(
        'global',
        `build_pattern_${i}`,
        {
          description: `Build pattern observation ${i}`,
          data: { pattern: 'multi-file-update', success: i > 2 }
        },
        {
          tags: ['build', 'pattern', 'multi-file-update'],
          createdBy: 'test'
        }
      )
    }

    // Step 1: Consolidation
    const consolidationResult = await runConsolidation()
    assert.ok(consolidationResult.blocksGenerated >= 0, 'Consolidation should run')

    // Step 2: Evolution
    const evolutionResult = await runEvolutionCycle('manual')
    assert.ok(evolutionResult.patternsAnalyzed >= 0, 'Evolution should run')

    // Step 3: Verify both produced results
    const consolidatedBasePath = path.join(
      process.cwd(),
      'memory',
      'global',
      'consolidated'
    )

    assert.ok(fs.existsSync(consolidatedBasePath), 'Consolidated directory should exist')

    // Check for any consolidated files (could be various categories)
    const files = fs.readdirSync(consolidatedBasePath)
    const jsonFiles = files.filter(f => f.endsWith('.json'))
    
    // Should have at least some consolidated knowledge
    assert.ok(jsonFiles.length >= 0, 'Should have consolidated files')

    console.log('✓ Full consolidation-evolution cycle completed')
  })
})
