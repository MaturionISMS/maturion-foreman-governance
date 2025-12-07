/**
 * Memory Analytics Aggregator
 * Collects and analyzes memory health metrics
 */

import { getAllMemory } from '../memory/storage'
import { runDriftMonitoring } from '../memory/drift-monitor'
import { MemoryHealthMetrics, MemoryGrowthTrend } from '@/types/analytics'
import { MemoryEntry } from '@/types/memory'
import { getEntryAgeInDays, getEntryDateString } from './date-utils'
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
 * Get memory health metrics
 */
export async function getMemoryHealthMetrics(): Promise<MemoryHealthMetrics> {
  const memoryObj = await getAllMemory()
  const allMemory = flattenMemory(memoryObj)
  
  // Count by lifecycle state
  let activeCount = 0
  let consolidatedCount = 0
  let archivedCount = 0
  
  // Calculate staleness
  const now = Date.now()
  let totalAge = 0
  let oldestAge = 0
  let staleCount = 0
  const STALE_THRESHOLD_DAYS = 90
  
  // Track duplicates and references
  const keys = new Set<string>()
  let duplicateCount = 0
  
  for (const entry of allMemory) {
    // Count by state (if we had lifecycle state in entries)
    // For now, use tags or scope to infer
    if (entry.tags?.includes('consolidated') || entry.scope === 'global') {
      consolidatedCount++
    } else if (entry.tags?.includes('archived')) {
      archivedCount++
    } else {
      activeCount++
    }
    
    // Calculate age
    const ageDays = getEntryAgeInDays(entry)
    if (ageDays > 0) {
      totalAge += ageDays
      oldestAge = Math.max(oldestAge, ageDays)
      
      if (ageDays > STALE_THRESHOLD_DAYS) {
        staleCount++
      }
    }
    
    // Track duplicates
    if (keys.has(entry.key)) {
      duplicateCount++
    }
    keys.add(entry.key)
  }
  
  const avgAge = allMemory.length > 0 && !isNaN(totalAge) ? totalAge / allMemory.length : 0
  
  // Run drift monitoring to get drift status
  const driftReport = await runDriftMonitoring()
  const driftStatus = driftReport.overallStatus
  
  // Calculate fragmentation score (0-1, lower is better)
  const fragmentationScore = allMemory.length > 0 
    ? Math.min(duplicateCount / allMemory.length, 1)
    : 0
  
  // Calculate dependency consistency (simplified for now)
  const consistencyScore = 1 - fragmentationScore
  
  return {
    activeCount,
    consolidatedCount,
    archivedCount,
    totalSize: allMemory.length,
    driftStatus,
    stalenessIndicators: {
      staleEntries: staleCount,
      avgAgeInDays: Math.round(avgAge),
      oldestEntryDays: Math.round(oldestAge)
    },
    fragmentation: {
      fragmentationScore,
      duplicateCount,
      orphanedReferences: 0 // TODO: Implement reference tracking
    },
    dependencyConsistency: {
      consistencyScore,
      brokenReferences: 0, // TODO: Implement reference validation
      circularDependencies: 0 // TODO: Implement circular dependency detection
    }
  }
}

/**
 * Get memory growth trend over time
 */
export async function getMemoryGrowthTrend(): Promise<MemoryGrowthTrend[]> {
  const memoryObj = await getAllMemory()
  const allMemory = flattenMemory(memoryObj)
  
  // Group by date
  const trendMap = new Map<string, { active: number; consolidated: number; archived: number }>()
  
  for (const entry of allMemory) {
    const dateString = getEntryDateString(entry)
    if (!dateString) continue
    
    if (!trendMap.has(dateString)) {
      trendMap.set(dateString, { active: 0, consolidated: 0, archived: 0 })
    }
    
    const trend = trendMap.get(dateString)!
    
    if (entry.tags?.includes('consolidated') || entry.scope === 'global') {
      trend.consolidated++
    } else if (entry.tags?.includes('archived')) {
      trend.archived++
    } else {
      trend.active++
    }
  }
  
  // Convert to array and sort by date
  const trends: MemoryGrowthTrend[] = []
  const sortedDates = Array.from(trendMap.keys()).sort()
  
  // Calculate cumulative counts
  let cumulativeActive = 0
  let cumulativeConsolidated = 0
  let cumulativeArchived = 0
  
  for (const date of sortedDates) {
    const trend = trendMap.get(date)!
    cumulativeActive += trend.active
    cumulativeConsolidated += trend.consolidated
    cumulativeArchived += trend.archived
    
    trends.push({
      timestamp: date,
      activeCount: cumulativeActive,
      consolidatedCount: cumulativeConsolidated,
      archivedCount: cumulativeArchived
    })
  }
  
  return trends
}
