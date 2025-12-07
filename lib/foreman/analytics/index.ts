/**
 * Analytics Dashboard Module
 * Central module for Cognitive Analytics Dashboard (Issue #13)
 * 
 * Provides comprehensive analytics across:
 * - Memory health and drift
 * - Knowledge consolidation
 * - Pattern evolution
 * - Builder performance
 * - Project intelligence
 * - Governance alignment
 */

import { AnalyticsSummary } from '@/types/analytics'
import { getMemoryHealthMetrics, getMemoryGrowthTrend } from './memory-analytics'
import { getDriftAnalytics } from './drift-analytics'
import { getConsolidationAnalytics } from './consolidation-analytics'
import { getRetirementAnalytics } from './retirement-analytics'
import { getEvolutionAnalytics } from './evolution-analytics'
import { getBuilderPerformanceAnalytics } from './builder-analytics'
import { getProjectIntelligenceAnalytics } from './project-analytics'
import { getGovernanceAlignmentAnalytics } from './governance-analytics'

/**
 * Get complete analytics summary
 * This is the main entry point for the analytics dashboard
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  console.log('[Analytics] Generating complete analytics summary...')
  
  // Gather all analytics data in parallel for performance
  const [
    memory,
    drift,
    consolidation,
    retirement,
    evolution,
    builders,
    projects,
    governance
  ] = await Promise.all([
    getMemoryHealthMetrics(),
    getDriftAnalytics(),
    getConsolidationAnalytics(),
    getRetirementAnalytics(),
    getEvolutionAnalytics(),
    getBuilderPerformanceAnalytics(),
    getProjectIntelligenceAnalytics(),
    getGovernanceAlignmentAnalytics()
  ])
  
  // Calculate overall system health
  const systemHealth = calculateSystemHealth({
    memory,
    drift,
    consolidation,
    retirement,
    evolution,
    builders,
    projects,
    governance
  })
  
  const summary: AnalyticsSummary = {
    timestamp: new Date().toISOString(),
    memory,
    drift,
    consolidation,
    retirement,
    evolution,
    builders,
    projects,
    governance,
    systemHealth
  }
  
  console.log('[Analytics] Analytics summary generated successfully')
  console.log('[Analytics] System health:', systemHealth.status, 'Score:', systemHealth.overallScore)
  
  return summary
}

/**
 * Calculate overall system health score
 */
function calculateSystemHealth(analytics: Partial<AnalyticsSummary>): {
  overallScore: number
  status: 'healthy' | 'warning' | 'critical'
  alerts: string[]
} {
  const alerts: string[] = []
  let totalScore = 100
  
  // Memory health (30 points)
  if (analytics.memory) {
    if (analytics.memory.driftStatus === 'critical') {
      totalScore -= 30
      alerts.push('Critical memory drift detected')
    } else if (analytics.memory.driftStatus === 'error') {
      totalScore -= 20
      alerts.push('Memory drift errors detected')
    } else if (analytics.memory.driftStatus === 'warning') {
      totalScore -= 10
      alerts.push('Memory drift warnings detected')
    }
    
    if (analytics.memory.stalenessIndicators.staleEntries > 50) {
      totalScore -= 10
      alerts.push(`${analytics.memory.stalenessIndicators.staleEntries} stale memory entries`)
    }
  }
  
  // Drift status (25 points)
  if (analytics.drift) {
    if (analytics.drift.criticalCount > 0) {
      totalScore -= 25
      alerts.push(`${analytics.drift.criticalCount} critical drift issues`)
    } else if (analytics.drift.errorCount > 5) {
      totalScore -= 15
      alerts.push(`${analytics.drift.errorCount} drift errors`)
    } else if (analytics.drift.errorCount > 0) {
      totalScore -= 5
    }
  }
  
  // Builder performance (20 points)
  if (analytics.builders) {
    const avgSuccessRate = analytics.builders.builderMetrics.length > 0
      ? analytics.builders.builderMetrics.reduce((sum, b) => sum + b.successRate, 0) / 
        analytics.builders.builderMetrics.length
      : 1.0
    
    if (avgSuccessRate < 0.5) {
      totalScore -= 20
      alerts.push('Low builder success rate')
    } else if (avgSuccessRate < 0.7) {
      totalScore -= 10
      alerts.push('Below-average builder success rate')
    }
  }
  
  // Governance compliance (15 points)
  if (analytics.governance) {
    if (analytics.governance.violationsDetected > 10) {
      totalScore -= 15
      alerts.push(`${analytics.governance.violationsDetected} governance violations`)
    } else if (analytics.governance.violationsDetected > 5) {
      totalScore -= 8
      alerts.push(`${analytics.governance.violationsDetected} governance violations`)
    } else if (analytics.governance.violationsDetected > 0) {
      totalScore -= 3
    }
  }
  
  // Evolution progress (10 points)
  if (analytics.evolution) {
    if (analytics.evolution.performanceScoreMovement.degraded > 
        analytics.evolution.performanceScoreMovement.improved) {
      totalScore -= 10
      alerts.push('More patterns degrading than improving')
    }
  }
  
  // Ensure score is in valid range
  totalScore = Math.max(0, Math.min(100, totalScore))
  
  // Determine status
  let status: 'healthy' | 'warning' | 'critical'
  if (totalScore >= 80) {
    status = 'healthy'
  } else if (totalScore >= 50) {
    status = 'warning'
  } else {
    status = 'critical'
  }
  
  return {
    overallScore: totalScore,
    status,
    alerts
  }
}

// Re-export all analytics functions
export {
  getMemoryHealthMetrics,
  getMemoryGrowthTrend,
  getDriftAnalytics,
  getConsolidationAnalytics,
  getRetirementAnalytics,
  getEvolutionAnalytics,
  getBuilderPerformanceAnalytics,
  getProjectIntelligenceAnalytics,
  getGovernanceAlignmentAnalytics
}
