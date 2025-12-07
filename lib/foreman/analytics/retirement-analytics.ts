/**
 * Retirement Analytics Aggregator
 * Collects and analyzes knowledge retirement metrics
 */

import { RetirementAnalytics } from '@/types/analytics'
import { getRetirementStatistics } from '../memory/retirement-engine'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Get retirement analytics
 */
export async function getRetirementAnalytics(): Promise<RetirementAnalytics> {
  const stats = await getRetirementStatistics()
  
  // Build archive distribution
  const archiveDistribution: Record<string, number> = {
    'Active': stats.totalActive,
    'Archived': stats.totalArchived,
    'Deprecated': stats.totalDeprecated,
    'Consolidated': stats.totalConsolidated
  }
  
  // Build retirement by category (from reasons)
  const retirementByCategory: Array<{
    category: string
    count: number
    month: string
  }> = []
  
  const now = new Date()
  const currentMonth = now.toISOString().slice(0, 7)
  
  for (const [reason, count] of Object.entries(stats.retirementsByReason)) {
    if (count > 0) {
      retirementByCategory.push({
        category: reason,
        count,
        month: currentMonth
      })
    }
  }
  
  // Build retirement volume trend (simplified)
  const retirementVolumeTrend: Array<{
    timestamp: string
    count: number
    reason: string
  }> = []
  
  for (const [reason, count] of Object.entries(stats.retirementsByReason)) {
    if (count > 0) {
      retirementVolumeTrend.push({
        timestamp: stats.lastRetirementRun,
        count,
        reason
      })
    }
  }
  
  return {
    retiredEntries: stats.totalArchived + stats.totalDeprecated,
    supersededLessons: stats.retirementsByReason.supersession || 0,
    deprecatedPatterns: stats.totalDeprecated,
    archiveDistribution,
    retirementByCategory,
    retirementVolumeTrend
  }
}
