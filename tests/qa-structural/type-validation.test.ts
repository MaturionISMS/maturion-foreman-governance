/**
 * Build-Time Structural Validation Tests
 * 
 * QA Category: TypeScript Structural Tests
 * 
 * Purpose: Detect type mismatches that pass local QA but fail during Vercel deployment
 * 
 * Tests ensure:
 * - NO module references unknown properties
 * - All type definitions are structurally sound
 * - Cross-engine interfaces are consistent
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  validateMemoryEntry,
  validateMemoryMetadata,
  validateRetirementInfo,
  validateRetirementCandidate,
  validateKnowledgeBlock,
  isMemoryEntry,
  isRetirementInfo,
  isKnowledgeBlock,
  detectUnknownFields
} from '@/lib/foreman/validation/type-validators'
import { MemoryEntry } from '@/types/memory'
import { RetirementInfo, RetirementCandidate } from '@/types/retirement'
import { KnowledgeBlock } from '@/types/consolidation'

describe('Build-Time Structural Validation', () => {
  describe('MemoryEntry Validation', () => {
    it('should validate a valid MemoryEntry', () => {
      const validEntry: MemoryEntry = {
        id: 'test-id-123',
        scope: 'global',
        key: 'test-key',
        value: { data: 'test' },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test-agent',
          version: 1
        },
        tags: ['test', 'validation']
      }
      
      const result = validateMemoryEntry(validEntry)
      assert.strictEqual(result.valid, true, 'Valid entry should pass validation')
      assert.strictEqual(result.errors.length, 0, 'Should have no errors')
    })
    
    it('should reject MemoryEntry with missing required fields', () => {
      const invalidEntry = {
        id: 'test-id',
        // missing scope
        key: 'test-key',
        value: {},
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }
      
      const result = validateMemoryEntry(invalidEntry)
      assert.strictEqual(result.valid, false, 'Invalid entry should fail validation')
      assert.ok(result.errors.some(e => e.includes('scope')), 'Should have scope error')
    })
    
    it('should reject MemoryEntry with invalid timestamp', () => {
      const invalidEntry = {
        id: 'test-id',
        scope: 'global',
        key: 'test-key',
        value: {},
        metadata: {
          createdAt: 'not-a-valid-timestamp',
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }
      
      const result = validateMemoryEntry(invalidEntry)
      assert.strictEqual(result.valid, false, 'Should fail for invalid timestamp')
      assert.ok(result.errors.some(e => e.includes('ISO 8601')), 'Should have ISO 8601 error')
    })
    
    it('should reject MemoryEntry with invalid version', () => {
      const invalidEntry = {
        id: 'test-id',
        scope: 'global',
        key: 'test-key',
        value: {},
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 0  // Must be >= 1
        }
      }
      
      const result = validateMemoryEntry(invalidEntry)
      assert.strictEqual(result.valid, false, 'Should fail for invalid version')
      assert.ok(result.errors.some(e => e.includes('version')), 'Should have version error')
    })
    
    it('should use type guard correctly', () => {
      const validEntry: MemoryEntry = {
        id: 'test-id',
        scope: 'global',
        key: 'test-key',
        value: {},
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        }
      }
      
      assert.ok(isMemoryEntry(validEntry), 'Type guard should return true for valid entry')
      assert.ok(!isMemoryEntry({}), 'Type guard should return false for invalid entry')
    })
  })
  
  describe('RetirementInfo Validation', () => {
    it('should validate a valid RetirementInfo', () => {
      const validInfo: RetirementInfo = {
        reason: 'staleness',
        severity: 'low',
        lifecycle: 'archival',
        explanation: 'Entry is too old',
        manualReviewRequired: false
      }
      
      const result = validateRetirementInfo(validInfo)
      assert.strictEqual(result.valid, true, 'Valid info should pass validation')
      assert.strictEqual(result.errors.length, 0, 'Should have no errors')
    })
    
    it('should reject RetirementInfo with invalid enum values', () => {
      const invalidInfo = {
        reason: 'invalid-reason',  // Not a valid RetirementReason
        severity: 'low',
        lifecycle: 'archival',
        explanation: 'Test',
        manualReviewRequired: false
      }
      
      const result = validateRetirementInfo(invalidInfo)
      assert.strictEqual(result.valid, false, 'Should fail for invalid reason')
      assert.ok(result.errors.some(e => e.includes('RetirementReason')), 'Should have reason error')
    })
    
    it('should validate optional fields when present', () => {
      const validInfo: RetirementInfo = {
        reason: 'contradiction',
        severity: 'high',
        lifecycle: 'deprecated',
        explanation: 'Conflicts with newer entry',
        manualReviewRequired: true,
        supersededBy: 'new-entry-id',
        contradictedBy: ['entry-1', 'entry-2'],
        reviewedBy: 'admin',
        reviewedAt: new Date().toISOString()
      }
      
      const result = validateRetirementInfo(validInfo)
      assert.strictEqual(result.valid, true, 'Should validate with optional fields')
    })
  })
  
  describe('RetirementCandidate Validation', () => {
    it('should validate a valid RetirementCandidate', () => {
      const validCandidate: RetirementCandidate = {
        entry: {
          id: 'test-id',
          scope: 'global',
          key: 'test-key',
          value: {},
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          }
        },
        reason: 'staleness',
        severity: 'low',
        score: 75,
        explanation: 'Entry is stale',
        recommendedAction: 'archive',
        metadata: {
          ageInDays: 200
        }
      }
      
      const result = validateRetirementCandidate(validCandidate)
      assert.strictEqual(result.valid, true, 'Valid candidate should pass')
      assert.strictEqual(result.errors.length, 0, 'Should have no errors')
    })
    
    it('should reject RetirementCandidate with invalid score', () => {
      const invalidCandidate = {
        entry: {
          id: 'test-id',
          scope: 'global',
          key: 'test-key',
          value: {},
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            version: 1
          }
        },
        reason: 'staleness',
        severity: 'low',
        score: 150,  // Out of range (0-100)
        explanation: 'Test',
        recommendedAction: 'archive',
        metadata: {
          ageInDays: 100
        }
      }
      
      const result = validateRetirementCandidate(invalidCandidate)
      assert.strictEqual(result.valid, false, 'Should fail for invalid score')
      assert.ok(result.errors.some(e => e.includes('score')), 'Should have score error')
    })
  })
  
  describe('KnowledgeBlock Validation', () => {
    it('should validate a valid KnowledgeBlock', () => {
      const validBlock: KnowledgeBlock = {
        id: 'kb-001',
        category: 'architecture_principle',
        summary: 'Test knowledge block',
        lesson: 'Always validate types',
        appliesTo: ['GlobalUI', 'Builder'],
        originEntries: ['entry-1', 'entry-2'],
        governanceLinks: ['governance.md'],
        confidence: 0.8,
        importance: 'high',
        timestamp: new Date().toISOString()
      }
      
      const result = validateKnowledgeBlock(validBlock)
      assert.strictEqual(result.valid, true, 'Valid block should pass')
      assert.strictEqual(result.errors.length, 0, 'Should have no errors')
    })
    
    it('should reject KnowledgeBlock with invalid confidence', () => {
      const invalidBlock = {
        id: 'kb-001',
        category: 'qa_pattern',
        summary: 'Test',
        lesson: 'Test lesson',
        appliesTo: [],
        originEntries: [],
        governanceLinks: [],
        confidence: 1.5,  // Out of range (0-1)
        importance: 'medium',
        timestamp: new Date().toISOString()
      }
      
      const result = validateKnowledgeBlock(invalidBlock)
      assert.strictEqual(result.valid, false, 'Should fail for invalid confidence')
      assert.ok(result.errors.some(e => e.includes('confidence')), 'Should have confidence error')
    })
    
    it('should validate summary length constraint', () => {
      const longSummary = 'a'.repeat(501)
      const invalidBlock = {
        id: 'kb-001',
        category: 'qa_pattern',
        summary: longSummary,
        lesson: 'Test',
        appliesTo: [],
        originEntries: [],
        governanceLinks: [],
        confidence: 0.5,
        importance: 'low',
        timestamp: new Date().toISOString()
      }
      
      const result = validateKnowledgeBlock(invalidBlock)
      assert.strictEqual(result.valid, false, 'Should fail for too-long summary')
      assert.ok(result.errors.some(e => e.includes('500')), 'Should have length error')
    })
  })
  
  describe('Unknown Field Detection', () => {
    it('should detect unknown fields in objects', () => {
      const obj = {
        id: 'test',
        scope: 'global',
        unknownField: 'value',  // This should be detected
        anotherUnknown: 123
      }
      
      const knownFields = ['id', 'scope', 'key', 'value', 'metadata', 'tags']
      const unknown = detectUnknownFields(obj, knownFields)
      
      assert.strictEqual(unknown.length, 2, 'Should detect 2 unknown fields')
      assert.ok(unknown.includes('unknownField'), 'Should include unknownField')
      assert.ok(unknown.includes('anotherUnknown'), 'Should include anotherUnknown')
    })
    
    it('should return empty array when all fields are known', () => {
      const obj = {
        id: 'test',
        scope: 'global',
        key: 'test-key'
      }
      
      const knownFields = ['id', 'scope', 'key', 'value', 'metadata', 'tags']
      const unknown = detectUnknownFields(obj, knownFields)
      
      assert.strictEqual(unknown.length, 0, 'Should have no unknown fields')
    })
  })
  
  describe('Cross-Engine Type Consistency', () => {
    it('should ensure MemoryEntry is consistent across engines', () => {
      // Simulate what Retirement Engine creates
      const retirementEntry: MemoryEntry = {
        id: 'retirement-test',
        scope: 'global',
        key: 'test',
        value: { retired: true },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'retirement-engine',
          version: 1
        }
      }
      
      // Validate it matches the canonical shape
      assert.ok(isMemoryEntry(retirementEntry), 'Retirement entry should be valid MemoryEntry')
      
      // Simulate what Consolidation Engine creates
      const consolidationEntry: MemoryEntry = {
        id: 'consolidation-test',
        scope: 'global',
        key: 'test',
        value: { consolidated: true },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'consolidation-engine',
          version: 1
        }
      }
      
      // Validate it matches the canonical shape
      assert.ok(isMemoryEntry(consolidationEntry), 'Consolidation entry should be valid MemoryEntry')
    })
    
    it('should ensure both engines can read the same MemoryEntry', () => {
      const sharedEntry: MemoryEntry = {
        id: 'shared-entry',
        scope: 'foreman',
        key: 'shared',
        value: { data: 'shared data' },
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'test',
          version: 1
        },
        tags: ['test', 'shared']
      }
      
      // Both engines should be able to validate this
      const result = validateMemoryEntry(sharedEntry)
      assert.strictEqual(result.valid, true, 'Shared entry should be valid for all engines')
      
      // Verify all engines can access standard fields
      assert.ok(sharedEntry.id, 'Should have id')
      assert.ok(sharedEntry.scope, 'Should have scope')
      assert.ok(sharedEntry.metadata, 'Should have metadata')
      assert.ok(sharedEntry.tags, 'Should have tags')
    })
  })
  
  describe('Regression: Unknown Property Access', () => {
    it('should fail TypeScript compilation for unknown properties', () => {
      // This test documents that TypeScript strict mode prevents unknown property access
      const entry: MemoryEntry = {
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
      
      // These should all compile fine
      const validAccess1 = entry.id
      const validAccess2 = entry.scope
      const validAccess3 = entry.metadata.createdAt
      const validAccess4 = entry.tags ?? []
      
      // This would NOT compile (TypeScript error):
      // const invalidAccess = entry.unknownProperty
      
      // We verify the type system works by checking known fields exist
      assert.ok(typeof validAccess1 === 'string', 'id should be string')
      assert.ok(['global', 'foreman', 'project'].includes(validAccess2), 'scope should be valid')
      assert.ok(typeof validAccess3 === 'string', 'createdAt should be string')
      assert.ok(Array.isArray(validAccess4), 'tags should be array or empty array')
    })
  })
})
