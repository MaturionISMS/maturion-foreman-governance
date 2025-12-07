/**
 * Consolidation Panel Tests
 * Tests for knowledge consolidation analytics
 */

import { describe, test } from 'node:test'
import { getConsolidationAnalytics } from '../../lib/foreman/analytics'
import { assert } from '../dashboard/test-utils'

describe('Consolidation Analytics', () => {
  test('should return consolidation analytics', async () => {
    const analytics = await getConsolidationAnalytics()

    assert(analytics !== null, 'Analytics should not be null')
    assert(analytics.knowledgeBlocksCreated >= 0, 'Knowledge blocks should be >= 0')
    assert(analytics.consolidationCyclesExecuted >= 0, 'Cycles executed should be >= 0')
    assert(analytics.compressionRatio >= 0, 'Compression ratio should be >= 0')
    assert(analytics.highConfidencePatterns >= 0, 'High confidence patterns should be >= 0')

    console.log('✓ Consolidation analytics structure validated')
  })

  test('should track consolidation events', async () => {
    const analytics = await getConsolidationAnalytics()

    assert(Array.isArray(analytics.consolidationEvents), 'Consolidation events should be an array')

    for (const event of analytics.consolidationEvents) {
      assert(event.timestamp !== undefined, 'Event should have timestamp')
      assert(event.blocksCreated >= 0, 'Blocks created should be >= 0')
      assert(event.entriesProcessed >= 0, 'Entries processed should be >= 0')
    }

    console.log(`✓ Tracked ${analytics.consolidationEvents.length} consolidation events`)
  })

  test('should validate compression ratio', async () => {
    const analytics = await getConsolidationAnalytics()

    assert(analytics.compressionRatio >= 0, 'Compression ratio should be >= 0')
    assert(analytics.compressionRatio <= 1, 'Compression ratio should be <= 1')

    console.log(`✓ Compression ratio: ${analytics.compressionRatio.toFixed(3)}`)
  })

  test('should track high confidence patterns', async () => {
    const analytics = await getConsolidationAnalytics()

    assert(
      analytics.highConfidencePatterns <= analytics.knowledgeBlocksCreated,
      'High confidence patterns should not exceed total knowledge blocks'
    )

    console.log(`✓ ${analytics.highConfidencePatterns}/${analytics.knowledgeBlocksCreated} blocks are high confidence`)
  })

  test('should sort events chronologically', async () => {
    const analytics = await getConsolidationAnalytics()

    for (let i = 1; i < analytics.consolidationEvents.length; i++) {
      const prev = new Date(analytics.consolidationEvents[i - 1].timestamp)
      const curr = new Date(analytics.consolidationEvents[i].timestamp)
      
      assert(
        curr >= prev,
        'Consolidation events should be sorted chronologically'
      )
    }

    console.log('✓ Events are chronologically sorted')
  })
})
