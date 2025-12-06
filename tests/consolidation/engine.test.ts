/**
 * Knowledge Consolidation Engine Tests
 * Tests for Automated Knowledge Consolidation Layer
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert'
import {
  runConsolidation,
  generateKnowledgeBlocks,
  detectPatterns,
  collapseDuplicates,
  scoreEntrySignificance,
  archiveLowValueEntries,
  linkKnowledgeToGovernance,
  linkKnowledgeToProjects,
  shouldTriggerConsolidation
} from '../../lib/foreman/memory/consolidation-engine'
import {
  writeMemoryEntry,
  clearMemoryScope,
  recordArchitectureDecision,
  recordQAFailure,
  getAllMemory
} from '../../lib/foreman/memory'
import { MemoryEntry } from '../../types/memory'
import { KnowledgeBlock, ConsolidationTrigger } from '../../types/consolidation'

describe('Knowledge Consolidation Engine', () => {
  
  beforeEach(async () => {
    // Clear test memory before each test
    await clearMemoryScope('foreman')
    await clearMemoryScope('global')
  })

  describe('Pattern Detection', () => {
    test('should detect patterns from memory entries', () => {
      const entries: MemoryEntry[] = [
        createMockEntry('foreman', ['qa_failure'], 0),
        createMockEntry('foreman', ['qa_failure'], 1),
        createMockEntry('foreman', ['qa_failure'], 2),
        createMockEntry('foreman', ['deployment'], 3)
      ]

      const patterns = detectPatterns(entries)

      assert.ok(patterns.length > 0)
      const qaPattern = patterns.find(p => p.pattern === 'qa_failure')
      assert.ok(qaPattern)
      assert.strictEqual(qaPattern.occurrences, 3)
      console.log('✓ Pattern detection works correctly')
    })

    test('should categorize patterns correctly', () => {
      const entries: MemoryEntry[] = [
        createMockEntry('global', ['architecture', 'architecture_decision'], 0),
        createMockEntry('global', ['architecture', 'architecture_decision'], 1),
        createMockEntry('global', ['architecture', 'architecture_decision'], 2)
      ]

      const patterns = detectPatterns(entries)

      assert.ok(patterns.length > 0)
      const archPattern = patterns.find(p => p.pattern === 'architecture')
      assert.ok(archPattern)
      assert.strictEqual(archPattern.category, 'architecture_principle')
      console.log('✓ Pattern categorization works correctly')
    })
  })

  describe('Significance Scoring', () => {
    test('should score entries based on frequency', () => {
      const entries: MemoryEntry[] = Array.from({ length: 5 }, (_, i) =>
        createMockEntry('foreman', ['frequent_tag'], i)
      )

      const score = scoreEntrySignificance(entries[0], entries)

      assert.ok(score.score > 0)
      assert.ok(score.factors.frequency > 0)
      console.log(`✓ Frequency scoring works (score: ${score.score})`)
    })

    test('should give high scores to critical entries', () => {
      const criticalEntry = createMockEntry('foreman', ['critical', 'blocker'], 0)
      const normalEntry = createMockEntry('foreman', ['info'], 1)
      // Add more critical entries to increase frequency score
      const criticalEntry2 = createMockEntry('foreman', ['critical', 'blocker'], 2)
      const criticalEntry3 = createMockEntry('foreman', ['critical', 'blocker'], 3)

      const allEntries = [criticalEntry, normalEntry, criticalEntry2, criticalEntry3]
      const criticalScore = scoreEntrySignificance(criticalEntry, allEntries)
      const normalScore = scoreEntrySignificance(normalEntry, allEntries)

      assert.ok(criticalScore.score > normalScore.score)
      assert.strictEqual(criticalScore.classification, 'high')
      console.log('✓ Critical entries receive higher scores')
    })
  })

  describe('Knowledge Block Generation', () => {
    test('should generate knowledge blocks from patterns', () => {
      const entries: MemoryEntry[] = Array.from({ length: 5 }, (_, i) =>
        createMockEntry('global', ['architecture_decision'], i)
      )

      const patterns = detectPatterns(entries)
      const blocks = generateKnowledgeBlocks(patterns, entries)

      assert.ok(blocks.length > 0)
      assert.ok(blocks[0].id.startsWith('kb_'))
      assert.ok(blocks[0].summary.length > 0)
      assert.ok(blocks[0].lesson.length > 0)
      console.log(`✓ Generated ${blocks.length} knowledge block(s)`)
    })
  })

  describe('Full Consolidation Run', () => {
    test('should run complete consolidation process', async () => {
      // Setup test data
      await recordArchitectureDecision('Test architecture decision 1', {
        pattern: 'microservices',
        rationale: 'Scalability'
      })
      await recordArchitectureDecision('Test architecture decision 2', {
        pattern: 'microservices',
        rationale: 'Maintainability'
      })
      await recordArchitectureDecision('Test architecture decision 3', {
        pattern: 'microservices',
        rationale: 'Flexibility'
      })

      await recordQAFailure('QA failure 1', { error: 'Test error' })
      await recordQAFailure('QA failure 2', { error: 'Test error' })
      await recordQAFailure('QA failure 3', { error: 'Test error' })

      // Run consolidation
      const result = await runConsolidation(undefined, {
        type: 'manual'
      })

      assert.ok(result)
      assert.ok(result.timestamp)
      assert.ok(result.summary)
      assert.ok(typeof result.blocksGenerated === 'number')
      assert.ok(typeof result.duplicatesCollapsed === 'number')
      assert.ok(typeof result.entriesArchived === 'number')
      
      console.log('✓ Full consolidation run completed')
      console.log(result.summary)
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
    id: `mock_${scope}_${index}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
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
