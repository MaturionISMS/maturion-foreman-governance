/**
 * Analytics Dashboard Types
 * Type definitions for Cognitive Analytics Dashboard (Issue #13)
 */

import { DriftReport, DriftSeverity } from './drift'
import { ConsolidationResult } from './consolidation'
import { RetirementStatistics } from './retirement'
import { PatternPerformanceMetrics } from './reasoning'

/**
 * Memory Health Metrics
 */
export interface MemoryHealthMetrics {
  activeCount: number
  consolidatedCount: number
  archivedCount: number
  totalSize: number
  driftStatus: 'healthy' | 'warning' | 'error' | 'critical'
  stalenessIndicators: {
    staleEntries: number
    avgAgeInDays: number
    oldestEntryDays: number
  }
  fragmentation: {
    fragmentationScore: number // 0-1
    duplicateCount: number
    orphanedReferences: number
  }
  dependencyConsistency: {
    consistencyScore: number // 0-1
    brokenReferences: number
    circularDependencies: number
  }
}

/**
 * Memory Growth Trend
 */
export interface MemoryGrowthTrend {
  timestamp: string
  activeCount: number
  consolidatedCount: number
  archivedCount: number
}

/**
 * Drift Analytics
 */
export interface DriftAnalytics {
  activeDriftAlerts: number
  criticalCount: number
  errorCount: number
  warningCount: number
  infoCount: number
  driftByCategory: Record<string, number>
  driftBySeverity: Record<DriftSeverity, number>
  topAffectedFiles: Array<{
    file: string
    issueCount: number
    severity: DriftSeverity
  }>
  remediationProposals: Array<{
    issue: string
    proposal: string
    autoFixable: boolean
  }>
  driftFrequencyTrend: Array<{
    timestamp: string
    issueCount: number
  }>
}

/**
 * Consolidation Analytics
 */
export interface ConsolidationAnalytics {
  knowledgeBlocksCreated: number
  consolidationCyclesExecuted: number
  compressionRatio: number // Ratio of consolidated to original
  highConfidencePatterns: number
  consolidationEvents: Array<{
    timestamp: string
    blocksCreated: number
    entriesProcessed: number
  }>
}

/**
 * Retirement Analytics
 */
export interface RetirementAnalytics {
  retiredEntries: number
  supersededLessons: number
  deprecatedPatterns: number
  archiveDistribution: Record<string, number>
  retirementByCategory: Array<{
    category: string
    count: number
    month: string
  }>
  retirementVolumeTrend: Array<{
    timestamp: string
    count: number
    reason: string
  }>
}

/**
 * Evolution Analytics
 */
export interface EvolutionAnalytics {
  patternsImproved: number
  patternsRemoved: number
  evolutionCycles: number
  performanceScoreMovement: {
    improved: number
    degraded: number
    stable: number
  }
  newHeuristicsCreated: number
  cognitiveImprovementCurve: Array<{
    timestamp: string
    avgScore: number
  }>
}

/**
 * Builder Performance Analytics
 */
export interface BuilderPerformanceAnalytics {
  builderMetrics: Array<{
    builderId: string
    builderType: string
    avgIterationCount: number
    successRate: number
    failureRate: number
    qaPassRate: number
    avgBuildTimeMs: number
  }>
  performanceTrend: Array<{
    timestamp: string
    builderId: string
    successRate: number
  }>
}

/**
 * Project Intelligence Analytics
 */
export interface ProjectIntelligenceAnalytics {
  projects: Array<{
    projectId: string
    projectName: string
    phase: string
    progressPercentage: number
    blockerCount: number
    driftIssues: number
    activeMemoryUsage: number
    consolidatedKnowledgeUsage: number
  }>
  sCurves: Array<{
    projectId: string
    progress: Array<{
      timestamp: string
      completion: number
    }>
  }>
}

/**
 * Governance Alignment Analytics
 */
export interface GovernanceAlignmentAnalytics {
  violationsDetected: number
  rulesReferencedCount: number
  topReferencedRules: Array<{
    rule: string
    referenceCount: number
  }>
  topViolatedRules: Array<{
    rule: string
    violationCount: number
  }>
  governanceUpdatesAffectingMemory: number
  complianceTrend: Array<{
    timestamp: string
    complianceScore: number
  }>
}

/**
 * Analytics Event - Tracking event for analytics
 */
export interface AnalyticsEvent {
  id: string
  type: 'memory_update' | 'drift_detected' | 'consolidation' | 'retirement' | 'evolution' | 'builder_run'
  timestamp: string
  source: string
  metadata: Record<string, any>
}

/**
 * Analytics Metric - Quantitative measurement
 */
export interface AnalyticsMetric {
  name: string
  value: number
  unit?: string
  timestamp: string
  category: 'memory' | 'drift' | 'consolidation' | 'retirement' | 'evolution' | 'builder' | 'governance'
  tags?: string[]
}

/**
 * Complete Analytics Summary
 */
export interface AnalyticsSummary {
  timestamp: string
  memory: MemoryHealthMetrics
  drift: DriftAnalytics
  consolidation: ConsolidationAnalytics
  retirement: RetirementAnalytics
  evolution: EvolutionAnalytics
  builders: BuilderPerformanceAnalytics
  projects: ProjectIntelligenceAnalytics
  governance: GovernanceAlignmentAnalytics
  systemHealth: {
    overallScore: number // 0-100
    status: 'healthy' | 'warning' | 'critical'
    alerts: string[]
  }
}

/**
 * Analytics Event - Single analytics event instance
 */
export interface AnalyticsEvent {
  id: string
  type: string
  timestamp: string
  data: Record<string, any>
  metadata?: Record<string, any>
}

/**
 * Analytics Metric - Performance metric measurement
 */
export interface AnalyticsMetric {
  name: string
  value: number
  unit: string
  timestamp: string
  tags?: string[]
}
