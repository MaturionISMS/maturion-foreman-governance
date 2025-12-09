/**
 * Parking Station Tests
 * Basic tests for parking station functionality
 */

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import {
  addEntry,
  updateEntry,
  getEntry,
  getAllEntries,
  getStats,
  clearAllEntries,
} from '../../lib/foreman/parking-station/storage'
import type { ParkingStationEntry } from '../../types/parking-station'

describe('Parking Station Storage', () => {
  before(async () => {
    // Clear entries before tests
    await clearAllEntries()
  })

  after(async () => {
    // Clean up after tests
    await clearAllEntries()
  })

  it('should add a new entry', async () => {
    const entry: ParkingStationEntry = {
      id: 'test_entry_1',
      name: 'Test Enhancement',
      category: 'UI',
      source: 'Manual Entry',
      sourceLocation: '/test/file.md',
      summary: 'This is a test enhancement',
      suggestedWave: 'Wave 1',
      priority: 75,
      status: 'Parked',
      tags: ['test', 'ui'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'test-runner',
    }

    await addEntry(entry)
    const retrieved = await getEntry('test_entry_1')
    
    assert.ok(retrieved, 'Entry should be retrieved')
    assert.strictEqual(retrieved?.name, 'Test Enhancement')
    assert.strictEqual(retrieved?.priority, 75)
  })

  it('should update an entry', async () => {
    await updateEntry('test_entry_1', { status: 'Promoted', priority: 85 })
    
    const updated = await getEntry('test_entry_1')
    assert.strictEqual(updated?.status, 'Promoted')
    assert.strictEqual(updated?.priority, 85)
  })

  it('should filter entries by category', async () => {
    const entry2: ParkingStationEntry = {
      id: 'test_entry_2',
      name: 'Test QA Enhancement',
      category: 'QA',
      source: 'Manual Entry',
      sourceLocation: '/test/qa.md',
      summary: 'QA improvement',
      suggestedWave: 'Wave 2',
      priority: 60,
      status: 'Parked',
      tags: ['test', 'qa'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'test-runner',
    }
    
    await addEntry(entry2)
    
    const uiEntries = await getAllEntries({ category: 'UI' })
    assert.strictEqual(uiEntries.length, 1)
    assert.strictEqual(uiEntries[0].category, 'UI')
    
    const qaEntries = await getAllEntries({ category: 'QA' })
    assert.strictEqual(qaEntries.length, 1)
    assert.strictEqual(qaEntries[0].category, 'QA')
  })

  it('should search entries', async () => {
    const results = await getAllEntries({ search: 'QA' })
    assert.ok(results.length > 0)
    assert.ok(results.some(e => e.name.includes('QA')))
  })

  it('should get statistics', async () => {
    const stats = await getStats()
    
    assert.ok(stats.total >= 2, 'Should have at least 2 entries')
    assert.ok(stats.byStatus.Parked >= 1)
    assert.ok(stats.byStatus.Promoted >= 1)
    assert.ok(stats.byCategory.UI >= 1)
    assert.ok(stats.byCategory.QA >= 1)
    assert.ok(stats.averagePriority > 0)
  })

  it('should filter by priority range', async () => {
    const highPriority = await getAllEntries({ minPriority: 80 })
    assert.ok(highPriority.every(e => e.priority >= 80))
    
    const lowPriority = await getAllEntries({ maxPriority: 70 })
    assert.ok(lowPriority.every(e => e.priority <= 70))
  })
})

describe('Parking Station Discovery', () => {
  it('should be able to run a scan', async () => {
    // We won't actually run the full scan in tests to avoid creating real entries
    // Just verify the module exports exist
    const { runFullScan } = await import('../../lib/foreman/parking-station/discovery-engine')
    assert.ok(typeof runFullScan === 'function', 'runFullScan should be a function')
  })
})

console.log('✅ Parking Station tests defined')
