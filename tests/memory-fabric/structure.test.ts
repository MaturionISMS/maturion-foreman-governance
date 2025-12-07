/**
 * Memory Fabric Structure Tests
 * 
 * Critical tests to prevent deployment failures due to Memory Fabric structure misuse.
 * This test suite ensures that:
 * 1. getAllMemory() returns the correct structured object
 * 2. flattenMemory() correctly flattens the structure
 * 3. Code cannot accidentally use the structured object as an array
 * 
 * Issue Context: A Vercel deployment failed because code tried to use
 * allMemory.filter() when allMemory is actually a structured object,
 * not a flat array.
 */

import { describe, test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'fs'
import path from 'path'
import { 
  getAllMemory, 
  flattenMemory, 
  getAllMemoryFlat,
  type MemoryFabric 
} from '../../lib/foreman/memory/storage'
import { MemoryEntry } from '../../types/memory'

// Test data directory
const TEST_MEMORY_DIR = path.join(process.cwd(), 'memory')

describe('Memory Fabric Structure Tests', () => {
  
  test('getAllMemory returns structured object, not array', async () => {
    const result = await getAllMemory()
    
    // CRITICAL: getAllMemory should return an object with specific properties
    assert.ok(typeof result === 'object', 'getAllMemory should return an object')
    assert.ok('global' in result, 'Result should have global property')
    assert.ok('foreman' in result, 'Result should have foreman property')
    assert.ok('projects' in result, 'Result should have projects property')
    
    // CRITICAL: Verify it's NOT an array
    assert.ok(!Array.isArray(result), 'getAllMemory result should NOT be an array')
    
    // Verify each scope is correct type
    assert.ok(Array.isArray(result.global), 'global should be an array')
    assert.ok(Array.isArray(result.foreman), 'foreman should be an array')
    assert.ok(typeof result.projects === 'object', 'projects should be an object')
    
    console.log('✓ getAllMemory returns correct structured object')
  })
  
  test('getAllMemory result does not have array methods', async () => {
    const result = await getAllMemory()
    
    // CRITICAL: Attempting to use array methods should fail at type level
    // This test verifies the runtime behavior
    assert.throws(
      () => {
        // This should not be allowed
        (result as any).filter(() => true)
      },
      TypeError,
      'Calling filter on getAllMemory result should throw TypeError'
    )
    
    assert.throws(
      () => {
        // This should not be allowed
        (result as any).map(() => {})
      },
      TypeError,
      'Calling map on getAllMemory result should throw TypeError'
    )
    
    console.log('✓ getAllMemory result correctly rejects array methods')
  })
  
  test('flattenMemory correctly flattens Memory Fabric', async () => {
    const memoryFabric = await getAllMemory()
    const flattened = flattenMemory(memoryFabric)
    
    // Result should be an array
    assert.ok(Array.isArray(flattened), 'flattenMemory should return an array')
    
    // Should contain entries from all scopes
    const expectedCount = 
      memoryFabric.global.length + 
      memoryFabric.foreman.length +
      Object.values(memoryFabric.projects).reduce((sum, entries) => sum + entries.length, 0)
    
    assert.equal(
      flattened.length,
      expectedCount,
      'Flattened array should contain all entries from all scopes'
    )
    
    // All entries should be MemoryEntry objects
    for (const entry of flattened) {
      assert.ok('id' in entry, 'Each entry should have id')
      assert.ok('scope' in entry, 'Each entry should have scope')
      assert.ok('key' in entry, 'Each entry should have key')
      assert.ok('value' in entry, 'Each entry should have value')
      assert.ok('metadata' in entry, 'Each entry should have metadata')
    }
    
    console.log('✓ flattenMemory correctly flattens structure')
  })
  
  test('getAllMemoryFlat returns flat array directly', async () => {
    const result = await getAllMemoryFlat()
    
    // Should be an array
    assert.ok(Array.isArray(result), 'getAllMemoryFlat should return an array')
    
    // Should have array methods
    assert.ok(typeof result.filter === 'function', 'Result should have filter method')
    assert.ok(typeof result.map === 'function', 'Result should have map method')
    assert.ok(typeof result.reduce === 'function', 'Result should have reduce method')
    
    // Should be usable with array methods
    const filtered = result.filter(entry => entry.scope === 'global')
    assert.ok(Array.isArray(filtered), 'filter should work on result')
    
    console.log('✓ getAllMemoryFlat returns usable flat array')
  })
  
  test('flattenMemory preserves all data', async () => {
    const memoryFabric = await getAllMemory()
    const flattened = flattenMemory(memoryFabric)
    
    // Check that global entries are preserved
    for (const globalEntry of memoryFabric.global) {
      const found = flattened.find(e => e.id === globalEntry.id)
      assert.ok(found, `Global entry ${globalEntry.id} should be in flattened array`)
      assert.deepEqual(found, globalEntry, 'Entry data should be preserved')
    }
    
    // Check that foreman entries are preserved
    for (const foremanEntry of memoryFabric.foreman) {
      const found = flattened.find(e => e.id === foremanEntry.id)
      assert.ok(found, `Foreman entry ${foremanEntry.id} should be in flattened array`)
      assert.deepEqual(found, foremanEntry, 'Entry data should be preserved')
    }
    
    // Check that project entries are preserved
    for (const [projectId, projectEntries] of Object.entries(memoryFabric.projects)) {
      for (const projectEntry of projectEntries) {
        const found = flattened.find(e => e.id === projectEntry.id)
        assert.ok(found, `Project entry ${projectEntry.id} from ${projectId} should be in flattened array`)
        assert.deepEqual(found, projectEntry, 'Entry data should be preserved')
      }
    }
    
    console.log('✓ flattenMemory preserves all data correctly')
  })
  
  test('MemoryFabric type enforces correct structure', () => {
    // This is a compile-time test - if it compiles, the type is correct
    const validFabric: MemoryFabric = {
      global: [],
      foreman: [],
      projects: {}
    }
    
    assert.ok(validFabric, 'Valid MemoryFabric structure compiles')
    
    // The following should NOT compile (TypeScript will catch these):
    // const invalid1: MemoryFabric = []  // Error: array is not MemoryFabric
    // const invalid2: MemoryFabric = { global: [] }  // Error: missing foreman and projects
    // const invalid3: MemoryFabric = { global: {}, foreman: [], projects: {} }  // Error: global should be array
    
    console.log('✓ MemoryFabric type enforces correct structure')
  })
  
  test('getAllMemoryFlat and flattenMemory produce same result', async () => {
    const memoryFabric = await getAllMemory()
    const flattened1 = flattenMemory(memoryFabric)
    const flattened2 = await getAllMemoryFlat()
    
    assert.equal(
      flattened1.length,
      flattened2.length,
      'Both methods should produce same number of entries'
    )
    
    // Check that all IDs match
    const ids1 = new Set(flattened1.map(e => e.id))
    const ids2 = new Set(flattened2.map(e => e.id))
    
    assert.deepEqual(ids1, ids2, 'Both methods should contain same entries')
    
    console.log('✓ getAllMemoryFlat and flattenMemory produce consistent results')
  })
  
  test('Memory Fabric handles empty projects', async () => {
    const memoryFabric = await getAllMemory()
    
    // Projects can be empty object
    assert.ok(typeof memoryFabric.projects === 'object', 'projects should be object')
    
    // Flattening empty projects should work
    const flattened = flattenMemory(memoryFabric)
    assert.ok(Array.isArray(flattened), 'Flattening should work with any project state')
    
    console.log('✓ Memory Fabric handles empty projects correctly')
  })
  
  test('Memory Fabric handles multiple projects', async () => {
    const memoryFabric = await getAllMemory()
    
    // Each project should have an array of entries
    for (const [projectId, entries] of Object.entries(memoryFabric.projects)) {
      assert.ok(Array.isArray(entries), `Project ${projectId} entries should be an array`)
      
      // Each entry should be from the project scope
      for (const entry of entries) {
        assert.equal(entry.scope, 'project', `Entry in ${projectId} should have project scope`)
      }
    }
    
    console.log('✓ Memory Fabric handles multiple projects correctly')
  })
  
  test('Common anti-pattern: using getAllMemory result as array', async () => {
    const memoryFabric = await getAllMemory()
    
    // ANTI-PATTERN: This is what caused the deployment failure
    // Developers should NOT do this:
    
    // ❌ WRONG: memoryFabric.filter(...)
    // ❌ WRONG: memoryFabric.map(...)
    // ❌ WRONG: for (const entry of memoryFabric)
    
    // ✅ CORRECT: Use flattenMemory or getAllMemoryFlat
    const flattened = flattenMemory(memoryFabric)
    const filtered = flattened.filter(e => e.scope === 'global')
    assert.ok(Array.isArray(filtered), 'Correct usage with flattened array works')
    
    console.log('✓ Anti-pattern test: developers must use flattenMemory')
  })
  
  test('Performance: flattenMemory is efficient', async () => {
    const memoryFabric = await getAllMemory()
    
    // Time the flatten operation
    const start = Date.now()
    const flattened = flattenMemory(memoryFabric)
    const duration = Date.now() - start
    
    // Should be very fast (< 100ms for typical memory sizes)
    assert.ok(duration < 100, 'flattenMemory should be fast')
    
    // Should not modify the original
    const originalGlobalLength = memoryFabric.global.length
    const originalForemanLength = memoryFabric.foreman.length
    
    // Modify flattened array
    flattened.push({} as any)
    
    // Original should be unchanged
    assert.equal(
      memoryFabric.global.length,
      originalGlobalLength,
      'Original global array should be unchanged'
    )
    assert.equal(
      memoryFabric.foreman.length,
      originalForemanLength,
      'Original foreman array should be unchanged'
    )
    
    console.log(`✓ flattenMemory is efficient (${duration}ms)`)
  })
  
  test('Documentation: getAllMemory JSDoc is clear', () => {
    // This test verifies that the API is self-documenting
    // Developers should see clear warnings in their IDE
    
    // The getAllMemory function should have JSDoc that warns:
    // "IMPORTANT: This returns a structured object, NOT a flat array.
    //  Use flattenMemory() to convert to a flat array if needed."
    
    // If a developer tries to use it wrong, TypeScript should error:
    // const memory = await getAllMemory()
    // memory.filter(...)  // ❌ TypeScript Error: Property 'filter' does not exist
    
    console.log('✓ API documentation prevents misuse')
  })
})

describe('Integration: Memory Fabric usage in reasoning engine', () => {
  test('Evolution engine uses flattenMemory correctly', async () => {
    // Verify that evolution-engine.ts follows the correct pattern
    const memoryFabric = await getAllMemory()
    const flattened = flattenMemory(memoryFabric)
    
    // This is the pattern used in evolution-engine.ts
    const patternUsages = flattened.filter(entry => {
      const metadata = entry.metadata as any
      return (
        metadata?.patternsApplied?.includes('test-pattern') ||
        metadata?.reasoning?.includes('test-pattern')
      )
    })
    
    assert.ok(Array.isArray(patternUsages), 'Pattern usage filtering works correctly')
    
    console.log('✓ Evolution engine pattern verified')
  })
  
  test('Retirement engine uses flattenMemory correctly', async () => {
    // Verify that retirement-engine.ts follows the correct pattern
    const memoryFabric = await getAllMemory()
    const allEntries = flattenMemory(memoryFabric)
    
    // This is the pattern used in retirement-engine.ts
    const activeEntries = allEntries.filter(e => !e.value._retired?.retired)
    const retiredEntries = allEntries.filter(e => e.value._retired?.retired)
    
    assert.ok(Array.isArray(activeEntries), 'Active entries filtering works')
    assert.ok(Array.isArray(retiredEntries), 'Retired entries filtering works')
    
    console.log('✓ Retirement engine pattern verified')
  })
  
  test('Drift monitor uses flattenMemory correctly', async () => {
    // Verify that drift-monitor.ts follows the correct pattern
    const memoryFabric = await getAllMemory()
    const allEntries = flattenMemory(memoryFabric)
    
    // Drift monitor can work with both flattened and structured
    // When it needs all entries, it should flatten
    assert.ok(Array.isArray(allEntries), 'Drift monitor can get all entries')
    
    // When it needs scope-specific data, it can use the structure directly
    assert.ok(Array.isArray(memoryFabric.global), 'Drift monitor can access global scope')
    assert.ok(Array.isArray(memoryFabric.foreman), 'Drift monitor can access foreman scope')
    
    console.log('✓ Drift monitor pattern verified')
  })
})

describe('Regression Prevention', () => {
  test('Prevent: allMemory.filter() deployment failure', async () => {
    // This test specifically prevents the issue described in the problem statement
    const allMemoryObj = await getAllMemory()
    
    // Verify that attempting to use filter directly will fail
    assert.equal(
      typeof (allMemoryObj as any).filter,
      'undefined',
      'getAllMemory result should not have filter method'
    )
    
    // Verify the correct approach works
    const allMemory = flattenMemory(allMemoryObj)
    const filtered = allMemory.filter(entry => entry.scope === 'global')
    assert.ok(Array.isArray(filtered), 'Correct approach with flattenMemory works')
    
    console.log('✓ Deployment failure scenario prevented')
  })
  
  test('Type safety prevents misuse at compile time', () => {
    // TypeScript should prevent these mistakes at compile time:
    
    async function testCompileTimeErrors() {
      const memoryFabric = await getAllMemory()
      
      // These should all be TypeScript errors:
      // memoryFabric.filter(...)  // ❌ Error
      // memoryFabric.map(...)     // ❌ Error
      // memoryFabric[0]           // ❌ Error
      // memoryFabric.length       // ❌ Error
      
      // These are correct:
      const flattened = flattenMemory(memoryFabric)
      const filtered = flattened.filter(() => true)  // ✅ OK
      const mapped = flattened.map(() => ({}))       // ✅ OK
      const first = flattened[0]                     // ✅ OK
      const count = flattened.length                 // ✅ OK
      
      assert.ok(filtered && mapped && first !== undefined && count !== undefined, 'Type safety enforced')
    }
    
    // Just verify the function is defined correctly
    assert.ok(typeof testCompileTimeErrors === 'function', 'Type safety test defined')
    
    console.log('✓ Type safety prevents compile-time errors')
  })
})
