/**
 * Builder Performance Analytics Aggregator
 * Collects and analyzes builder performance metrics
 */

import { BuilderPerformanceAnalytics } from '@/types/analytics'
import { getAllMemory } from '../memory/storage'
import { MemoryEntry } from '@/types/memory'

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
 * Get builder performance analytics
 */
export async function getBuilderPerformanceAnalytics(): Promise<BuilderPerformanceAnalytics> {
  const memoryObj = await getAllMemory()
  const allMemory = flattenMemory(memoryObj)
  
  // Filter builder-related memory entries
  const builderEntries = allMemory.filter(
    entry => entry.tags?.includes('builder') || entry.metadata?.createdBy?.includes('builder')
  )
  
  // Group by builder
  const builderMap = new Map<string, {
    tasks: number
    successes: number
    failures: number
    qaPass: number
    qaFail: number
    totalBuildTime: number
    iterations: number[]
  }>()
  
  for (const entry of builderEntries) {
    const builderId = entry.metadata?.createdBy || 'unknown'
    
    if (!builderMap.has(builderId)) {
      builderMap.set(builderId, {
        tasks: 0,
        successes: 0,
        failures: 0,
        qaPass: 0,
        qaFail: 0,
        totalBuildTime: 0,
        iterations: []
      })
    }
    
    const builder = builderMap.get(builderId)!
    builder.tasks++
    
    // Analyze task outcome from value
    if (entry.value) {
      if (entry.value.success === true) {
        builder.successes++
      } else if (entry.value.success === false) {
        builder.failures++
      }
      
      if (entry.value.qaResult === 'passed') {
        builder.qaPass++
      } else if (entry.value.qaResult === 'failed') {
        builder.qaFail++
      }
      
      if (entry.value.buildTimeMs) {
        builder.totalBuildTime += entry.value.buildTimeMs
      }
      
      if (entry.value.iterationCount) {
        builder.iterations.push(entry.value.iterationCount)
      }
    }
  }
  
  // Convert to metrics
  const builderMetrics = Array.from(builderMap.entries()).map(([builderId, data]) => {
    const successRate = data.tasks > 0 ? data.successes / data.tasks : 0
    const failureRate = data.tasks > 0 ? data.failures / data.tasks : 0
    const qaPassRate = (data.qaPass + data.qaFail) > 0 
      ? data.qaPass / (data.qaPass + data.qaFail) 
      : 0
    const avgBuildTimeMs = data.tasks > 0 ? data.totalBuildTime / data.tasks : 0
    const avgIterationCount = data.iterations.length > 0
      ? data.iterations.reduce((a, b) => a + b, 0) / data.iterations.length
      : 0
    
    // Infer builder type from ID
    let builderType = 'unknown'
    if (builderId.includes('ui')) builderType = 'ui'
    else if (builderId.includes('api')) builderType = 'api'
    else if (builderId.includes('qa')) builderType = 'qa'
    else if (builderId.includes('schema')) builderType = 'schema'
    else if (builderId.includes('integration')) builderType = 'integration'
    
    return {
      builderId,
      builderType,
      avgIterationCount: Math.round(avgIterationCount * 10) / 10,
      successRate: Math.round(successRate * 100) / 100,
      failureRate: Math.round(failureRate * 100) / 100,
      qaPassRate: Math.round(qaPassRate * 100) / 100,
      avgBuildTimeMs: Math.round(avgBuildTimeMs)
    }
  })
  
  // Build performance trend (simplified)
  const performanceTrend: Array<{
    timestamp: string
    builderId: string
    successRate: number
  }> = []
  
  const now = new Date().toISOString()
  for (const metric of builderMetrics) {
    performanceTrend.push({
      timestamp: now,
      builderId: metric.builderId,
      successRate: metric.successRate
    })
  }
  
  return {
    builderMetrics,
    performanceTrend
  }
}
