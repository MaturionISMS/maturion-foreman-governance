/**
 * Short-Term Memory (STM) Tests
 * 
 * RED QA: These tests MUST FAIL initially because STM implementation is incomplete.
 * 
 * Test Coverage:
 * - STM creation and storage
 * - STM retrieval by session ID
 * - STM auto-expiry after session end
 * - STM ordering (FIFO)
 * - STM priority-based pruning
 * - Session isolation (no cross-session leaks)
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'

// These imports will fail initially (RED QA)
import {
  storeSTM,
  recallSTM,
  pruneSTM,
  clearSTMSession,
  getSTMSize
} from '@/lib/memory/stm'

describe('Short-Term Memory (STM)', () => {
  const testSessionId = 'test_session_001'
  const testSessionId2 = 'test_session_002'

  beforeEach(async () => {
    // Clean up before each test
    await clearSTMSession(testSessionId)
    await clearSTMSession(testSessionId2)
  })

  afterEach(async () => {
    // Clean up after each test
    await clearSTMSession(testSessionId)
    await clearSTMSession(testSessionId2)
  })

  describe('STM Creation and Storage', () => {
    test('should store STM entry with correct structure', async () => {
      const entry = await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: {
          type: 'user_input',
          data: { message: 'Create a dashboard' }
        },
        metadata: {
          priority: 'high'
        }
      })

      expect(entry).toBeDefined()
      expect(entry.id).toBeDefined()
      expect(entry.tier).toBe('STM')
      expect(entry.category).toBe('conversation')
      expect(entry.sessionId).toBe(testSessionId)
      expect(entry.metadata.createdAt).toBeDefined()
      expect(entry.metadata.expiresAt).toBeDefined()
      expect(entry.metadata.volatile).toBe(true)
    })

    test('should auto-generate expiry time for STM', async () => {
      const entry = await storeSTM({
        sessionId: testSessionId,
        category: 'active_task',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'build_wave', data: { waveId: 'wave_6' } }
      })

      const expiryTime = new Date(entry.metadata.expiresAt)
      const now = new Date()
      const diff = expiryTime.getTime() - now.getTime()

      // Expiry should be in the future (within 24 hours)
      expect(diff).toBeGreaterThan(0)
      expect(diff).toBeLessThan(24 * 60 * 60 * 1000) // < 24 hours
    })

    test('should store multiple STM entries in same session', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'message_1', data: {} }
      })

      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'message_2', data: {} }
      })

      const size = await getSTMSize(testSessionId)
      expect(size).toBe(2)
    })
  })

  describe('STM Retrieval', () => {
    test('should retrieve STM entries by session ID', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'test', data: { value: 'test1' } }
      })

      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'test', data: { value: 'test2' } }
      })

      const entries = await recallSTM({
        sessionId: testSessionId
      })

      expect(entries).toHaveLength(2)
      expect(entries[0].sessionId).toBe(testSessionId)
      expect(entries[1].sessionId).toBe(testSessionId)
    })

    test('should filter STM by category', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'message', data: {} }
      })

      await storeSTM({
        sessionId: testSessionId,
        category: 'active_task',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'task', data: {} }
      })

      const conversationEntries = await recallSTM({
        sessionId: testSessionId,
        categories: ['conversation']
      })

      expect(conversationEntries).toHaveLength(1)
      expect(conversationEntries[0].category).toBe('conversation')
    })

    test('should return entries in FIFO order (most recent first)', async () => {
      const entry1 = await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'message', data: { order: 1 } }
      })

      // Wait 100ms to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 100))

      const entry2 = await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'message', data: { order: 2 } }
      })

      const entries = await recallSTM({
        sessionId: testSessionId,
        orderBy: 'createdAt',
        order: 'DESC'
      })

      expect(entries[0].id).toBe(entry2.id) // Most recent first
      expect(entries[1].id).toBe(entry1.id)
    })

    test('should respect limit parameter', async () => {
      for (let i = 0; i < 10; i++) {
        await storeSTM({
          sessionId: testSessionId,
          category: 'conversation',
          actor: 'foreman',
          embodiment: 'foreman_app',
          content: { type: 'message', data: { index: i } }
        })
      }

      const entries = await recallSTM({
        sessionId: testSessionId,
        limit: 5
      })

      expect(entries).toHaveLength(5)
    })
  })

  describe('Session Isolation (CRITICAL)', () => {
    test('should NOT return entries from different session', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'session1_data', data: {} }
      })

      await storeSTM({
        sessionId: testSessionId2,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'session2_data', data: {} }
      })

      const session1Entries = await recallSTM({ sessionId: testSessionId })
      const session2Entries = await recallSTM({ sessionId: testSessionId2 })

      expect(session1Entries).toHaveLength(1)
      expect(session2Entries).toHaveLength(1)
      expect(session1Entries[0].content.type).toBe('session1_data')
      expect(session2Entries[0].content.type).toBe('session2_data')
    })

    test('should enforce session boundary even with same content', async () => {
      const contentData = { type: 'same_content', data: { value: 'identical' } }

      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: contentData
      })

      await storeSTM({
        sessionId: testSessionId2,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: contentData
      })

      const session1Entries = await recallSTM({ sessionId: testSessionId })
      expect(session1Entries).toHaveLength(1)
      expect(session1Entries[0].sessionId).toBe(testSessionId)
      expect(session1Entries[0].sessionId).not.toBe(testSessionId2)
    })
  })

  describe('STM Auto-Expiry', () => {
    test('should mark STM as expired after session end', async () => {
      const entry = await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'test', data: {} },
        metadata: {
          expiresAt: new Date(Date.now() - 1000) // Expired 1 second ago
        }
      })

      // Wait for cleanup (simulated)
      await pruneSTM(testSessionId)

      const entries = await recallSTM({
        sessionId: testSessionId,
        includeExpired: false
      })

      expect(entries).toHaveLength(0)
    })

    test('should NOT return expired entries by default', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'expired', data: {} },
        metadata: {
          expiresAt: new Date(Date.now() - 1000)
        }
      })

      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'active', data: {} }
      })

      const entries = await recallSTM({
        sessionId: testSessionId
      })

      // Only non-expired entry should be returned
      expect(entries.length).toBeLessThan(2)
    })
  })

  describe('Priority-Based Pruning', () => {
    test('should prune low-priority entries when limit exceeded', async () => {
      // Store 5 high-priority entries
      for (let i = 0; i < 5; i++) {
        await storeSTM({
          sessionId: testSessionId,
          category: 'conversation',
          actor: 'foreman',
          embodiment: 'foreman_app',
          content: { type: 'high', data: { index: i } },
          metadata: { priority: 'high' }
        })
      }

      // Store 10 low-priority entries
      for (let i = 0; i < 10; i++) {
        await storeSTM({
          sessionId: testSessionId,
          category: 'conversation',
          actor: 'foreman',
          embodiment: 'foreman_app',
          content: { type: 'low', data: { index: i } },
          metadata: { priority: 'low' }
        })
      }

      // Prune with limit of 10
      await pruneSTM(testSessionId, { limit: 10 })

      const entries = await recallSTM({ sessionId: testSessionId })

      // Should keep all 5 high-priority and 5 low-priority (total 10)
      expect(entries).toHaveLength(10)

      const highPriorityCount = entries.filter(e => e.metadata.priority === 'high').length
      expect(highPriorityCount).toBe(5)
    })
  })

  describe('STM Clear and Cleanup', () => {
    test('should clear all STM for a session', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'test1', data: {} }
      })

      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'test2', data: {} }
      })

      await clearSTMSession(testSessionId)

      const entries = await recallSTM({ sessionId: testSessionId })
      expect(entries).toHaveLength(0)
    })

    test('should NOT affect other sessions when clearing', async () => {
      await storeSTM({
        sessionId: testSessionId,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'session1', data: {} }
      })

      await storeSTM({
        sessionId: testSessionId2,
        category: 'conversation',
        actor: 'foreman',
        embodiment: 'foreman_app',
        content: { type: 'session2', data: {} }
      })

      await clearSTMSession(testSessionId)

      const session1Entries = await recallSTM({ sessionId: testSessionId })
      const session2Entries = await recallSTM({ sessionId: testSessionId2 })

      expect(session1Entries).toHaveLength(0)
      expect(session2Entries).toHaveLength(1)
    })
  })
})
