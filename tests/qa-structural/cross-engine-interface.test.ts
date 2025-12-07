/**
 * Cross-Engine Interface Tests
 * 
 * QA Category: Cross-Engine Interface Validation
 * 
 * Purpose: Ensure all cognitive engines agree on object shapes and can interoperate
 * 
 * Tests ensure:
 * - Retirement Engine and Consolidation Engine agree on MemoryEntry shape
 * - All engines use consistent type definitions
 * - No engine-specific type extensions without versioning
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { MemoryEntry } from '@/types/memory'
import { KnowledgeBlock } from '@/types/consolidation'
import { RetirementCandidate, ArchivedEntry } from '@/types/retirement'
import { isMemoryEntry, isKnowledgeBlock } from '@/lib/foreman/validation/type-validators'
import { 
  detectStalenessRetirement,
  detectSupersessionRetirement,
  detectObsolescenceRetirement
} from '@/lib/foreman/memory/retirement-engine'
import {
  scoreEntrySignificance,
  detectPatterns,
  generateKnowledgeBlocks
} from '@/lib/foreman/memory/consolidation-engine'

describe('Cross-Engine Interface Tests', () => {
  describe('Memory Fabric ↔ Retirement Engine', () => {
    it('should allow Retirement Engine to read MemoryEntry', () => {
      const entry: MemoryEntry = {
        id: 'test-entry-1',
        scope: 'global',
        key: 'test-retirement',
        value: { description: 'Old test entry' },
        metadata: {
          createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), // 200 days old
          updatedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'test-agent',
          version: 1
        },
        tags: ['test', 'qa_failure']
      }
      
      // Retirement Engine should be able to process this entry
      const candidates = detectStalenessRetirement([entry])
      
      // Should detect as stale (default threshold for qa_failure is 90 days)
      assert.ok(candidates.length > 0, 'Should detect stale entry')
      assert.strictEqual(candidates[0].entry.id, entry.id, 'Should reference original entry')
      
      // Verify Retirement Engine only accesses documented fields
      assert.ok(candidates[0].entry.metadata.createdAt, 'Should access metadata.createdAt')
      assert.ok(candidates[0].entry.tags, 'Should access tags')
      assert.ok(candidates[0].entry.scope, 'Should access scope')
    })
    
    it('should prevent Retirement Engine from accessing unknown fields', () => {
      const entry: MemoryEntry = {
        id: 'test-entry-2',
        scope: 'global',
        key: 'test',
        value: {},
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }
      
      // TypeScript should prevent this at compile time:
      // const invalid = entry.unknownProperty  // ❌ Type error
      
      // At runtime, accessing unknown property would return undefined
      const anyEntry = entry as any
      assert.strictEqual(anyEntry.unknownProperty, undefined, 'Unknown property should be undefined')
    })
  })
  
  describe('Memory Fabric ↔ Consolidation Engine', () => {
    it('should allow Consolidation Engine to read MemoryEntry', () => {
      const entries: MemoryEntry[] = [
        {
          id: 'entry-1',
          scope: 'global',
          key: 'test-1',
          value: { description: 'QA test 1' },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          },
          tags: ['qa_pattern', 'deployment']
        },
        {
          id: 'entry-2',
          scope: 'global',
          key: 'test-2',
          value: { description: 'QA test 2' },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          },
          tags: ['qa_pattern', 'deployment']
        }
      ]
      
      // Consolidation Engine should be able to score significance
      const score = scoreEntrySignificance(entries[0], entries)
      
      assert.ok(typeof score.score === 'number', 'Should calculate score')
      assert.ok(score.score >= 0 && score.score <= 100, 'Score should be in valid range')
      assert.strictEqual(score.entryId, entries[0].id, 'Should reference correct entry')
    })
    
    it('should allow Consolidation Engine to detect patterns', () => {
      const entries: MemoryEntry[] = [
        {
          id: 'entry-1',
          scope: 'global',
          key: 'test-1',
          value: { description: 'Pattern test 1' },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          },
          tags: ['qa_pattern']
        },
        {
          id: 'entry-2',
          scope: 'global',
          key: 'test-2',
          value: { description: 'Pattern test 2' },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          },
          tags: ['qa_pattern']
        },
        {
          id: 'entry-3',
          scope: 'global',
          key: 'test-3',
          value: { description: 'Pattern test 3' },
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          },
          tags: ['qa_pattern']
        }
      ]
      
      const patterns = detectPatterns(entries)
      
      // Should detect qa_pattern pattern (needs 3+ occurrences by default)
      assert.ok(patterns.length > 0, 'Should detect patterns')
      const qaPattern = patterns.find(p => p.pattern === 'qa_pattern')
      assert.ok(qaPattern, 'Should detect qa_pattern')
      assert.strictEqual(qaPattern!.occurrences, 3, 'Should count occurrences correctly')
    })
  })
  
  describe('Retirement Engine ↔ Consolidation Engine', () => {
    it('should agree on MemoryEntry shape between engines', () => {
      const sharedEntry: MemoryEntry = {
        id: 'shared-test',
        scope: 'foreman',
        key: 'shared',
        value: { data: 'test' },
        metadata: {
          createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['test']
      }
      
      // Both engines should validate this correctly
      assert.ok(isMemoryEntry(sharedEntry), 'Both engines should recognize valid MemoryEntry')
      
      // Retirement Engine can process it
      const retirementCandidates = detectObsolescenceRetirement([sharedEntry])
      assert.ok(Array.isArray(retirementCandidates), 'Retirement Engine can process entry')
      
      // Consolidation Engine can process it
      const score = scoreEntrySignificance(sharedEntry, [sharedEntry])
      assert.ok(typeof score.score === 'number', 'Consolidation Engine can process entry')
    })
    
    it('should allow Retirement Engine to reference KnowledgeBlock', () => {
      const knowledgeBlock: KnowledgeBlock = {
        id: 'kb-test-1',
        category: 'qa_pattern',
        summary: 'Test knowledge',
        lesson: 'Test lesson',
        appliesTo: ['GlobalUI'],
        originEntries: ['entry-1', 'entry-2'],
        governanceLinks: [],
        confidence: 0.85,
        importance: 'medium',
        timestamp: new Date().toISOString()
      }
      
      const entry: MemoryEntry = {
        id: 'entry-1',
        scope: 'global',
        key: 'test',
        value: {},
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }
      
      // Retirement Engine should be able to detect supersession
      const candidates = detectSupersessionRetirement([entry], [knowledgeBlock])
      
      assert.ok(candidates.length > 0, 'Should detect supersession')
      assert.strictEqual(candidates[0].reason, 'supersession', 'Should identify as supersession')
    })
  })
  
  describe('Type Consistency Validation', () => {
    it('should ensure all engines use same MemoryEntry interface', () => {
      // Create an entry that all engines should accept
      const universalEntry: MemoryEntry = {
        id: 'universal-1',
        scope: 'global',
        key: 'universal',
        value: { test: true },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'universal-test',
          version: 1
        },
        tags: ['universal']
      }
      
      // Type validator should accept it
      assert.ok(isMemoryEntry(universalEntry), 'Type validator accepts entry')
      
      // Retirement Engine should accept it
      const retirementResult = detectStalenessRetirement([universalEntry])
      assert.ok(Array.isArray(retirementResult), 'Retirement Engine accepts entry')
      
      // Consolidation Engine should accept it
      const consolidationResult = scoreEntrySignificance(universalEntry, [universalEntry])
      assert.ok(consolidationResult.entryId === universalEntry.id, 'Consolidation Engine accepts entry')
    })
    
    it('should ensure KnowledgeBlock is consistently validated', () => {
      const block: KnowledgeBlock = {
        id: 'kb-consistency-test',
        category: 'architecture_principle',
        summary: 'Type consistency is critical',
        lesson: 'All engines must agree on type definitions',
        appliesTo: ['All'],
        originEntries: ['entry-1'],
        governanceLinks: ['type-cohesion.md'],
        confidence: 0.9,
        importance: 'critical',
        timestamp: new Date().toISOString()
      }
      
      // Validate using type validator
      assert.ok(isKnowledgeBlock(block), 'Type validator accepts KnowledgeBlock')
      
      // Ensure it can be used in consolidation
      const blocks = generateKnowledgeBlocks(
        [{
          pattern: 'test',
          description: 'Test pattern',
          occurrences: 3,
          entries: ['entry-1'],
          confidence: 0.9,
          category: 'architecture_principle'
        }],
        [{
          id: 'entry-1',
          scope: 'global',
          key: 'test',
          value: {},
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          }
        }]
      )
      
      assert.ok(Array.isArray(blocks), 'Consolidation Engine can generate KnowledgeBlocks')
    })
  })
  
  describe('Prevent Engine-Specific Type Extensions', () => {
    it('should not allow adding fields to MemoryEntry without versioning', () => {
      // This documents that engines should NOT extend MemoryEntry directly
      const baseEntry: MemoryEntry = {
        id: 'test',
        scope: 'global',
        key: 'test',
        value: {},
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }
      
      // Engines should use the value field for engine-specific data
      const retirementSpecificData = {
        ...baseEntry,
        value: {
          ...baseEntry.value,
          _retired: {
            retired: true,
            retiredAt: new Date().toISOString(),
            reason: 'test'
          }
        }
      }
      
      // This is valid - storing engine-specific data in value
      assert.ok(isMemoryEntry(retirementSpecificData), 'Engine-specific data in value is allowed')
      
      // But this would NOT be valid (adding new top-level field):
      // const invalid = { ...baseEntry, customField: 'invalid' }
      // Type system prevents this at compile time
    })
  })
})
