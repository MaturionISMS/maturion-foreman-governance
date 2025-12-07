/**
 * Consolidation Analytics Aggregator
 * Collects and analyzes knowledge consolidation metrics
 */

import { ConsolidationAnalytics } from '@/types/analytics'
import { getAllMemory } from '../memory/storage'
import { MemoryEntry } from '@/types/memory'
import { getEntryDateString } from './date-utils'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Flatten memory object to array
 */
function flattenMemory(memoryObj: {
  global: MemoryEntry[]
  foreman: MemoryEntry[]
  projects: Record<string, MemoryEntry[]>
}): MemoryEntry[] {
  const allEntries: MemoryEntry[] = []
  allEntries.push(...memoryObj.global)
  allEntries.push(...memoryObj.foreman)
  for (const projectEntries of Object.values(memoryObj.projects)) {
    allEntries.push(...projectEntries)
  }
  return allEntries
}

/**
 * Get consolidation analytics
 */
export async function getConsolidationAnalytics(): Promise<ConsolidationAnalytics> {
  const memoryObj = await getAllMemory()
  const allMemory = flattenMemory(memoryObj)
  
  // Count consolidated knowledge blocks
  const consolidatedEntries = allMemory.filter(
    entry => entry.tags?.includes('consolidated') || entry.tags?.includes('knowledge_block')
  )
  
  // Count high confidence patterns
  const highConfidencePatterns = consolidatedEntries.filter(
    entry => entry.value?.confidence && entry.value.confidence >= 0.8
  ).length
  
  // Calculate compression ratio
  const originalCount = allMemory.length
  const consolidatedCount = consolidatedEntries.length
  const compressionRatio = originalCount > 0 
    ? consolidatedCount / originalCount 
    : 0
  
  // Group consolidation events by date
  const eventMap = new Map<string, { blocksCreated: number; entriesProcessed: number }>()
  
  for (const entry of consolidatedEntries) {
    const dateString = getEntryDateString(entry)
    if (!dateString) continue
    
    if (!eventMap.has(dateString)) {
      eventMap.set(dateString, { blocksCreated: 0, entriesProcessed: 0 })
    }
    
    const event = eventMap.get(dateString)!
    event.blocksCreated++
    
    // Estimate entries processed from metadata
    if (entry.value?.metadata?.consolidatedFrom) {
      event.entriesProcessed += entry.value.metadata.consolidatedFrom
    } else {
      event.entriesProcessed++
    }
  }
  
  // Convert to array and sort
  const consolidationEvents = Array.from(eventMap.entries())
    .map(([timestamp, data]) => ({
      timestamp,
      blocksCreated: data.blocksCreated,
      entriesProcessed: data.entriesProcessed
    }))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
  
  // Estimate consolidation cycles (one per day with events)
  const consolidationCyclesExecuted = eventMap.size
  
  return {
    knowledgeBlocksCreated: consolidatedEntries.length,
    consolidationCyclesExecuted,
    compressionRatio: Math.round(compressionRatio * 100) / 100,
    highConfidencePatterns,
    consolidationEvents
  }
}
