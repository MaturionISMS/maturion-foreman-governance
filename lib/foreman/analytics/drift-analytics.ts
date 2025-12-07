/**
 * Drift Analytics Aggregator
 * Collects and analyzes drift monitoring data
 */

import { runDriftMonitoring } from '../memory/drift-monitor'
import { DriftAnalytics } from '@/types/analytics'
import { DriftSeverity } from '@/types/drift'

/**
 * Get drift analytics
 */
export async function getDriftAnalytics(): Promise<DriftAnalytics> {
  const driftReport = await runDriftMonitoring()
  
  // Count by category
  const driftByCategory: Record<string, number> = {}
  const driftBySeverity: Record<DriftSeverity, number> = {
    info: 0,
    warning: 0,
    error: 0,
    critical: 0
  }
  
  // Track affected files
  const fileIssueMap = new Map<string, { count: number; severity: DriftSeverity }>()
  
  // Track remediation proposals
  const remediationProposals: Array<{
    issue: string
    proposal: string
    autoFixable: boolean
  }> = []
  
  for (const check of driftReport.checks) {
    for (const issue of check.issues) {
      // Count by category
      driftByCategory[issue.type] = (driftByCategory[issue.type] || 0) + 1
      
      // Count by severity
      driftBySeverity[issue.severity]++
      
      // Track affected files
      const existingFile = fileIssueMap.get(issue.location)
      if (!existingFile || 
          (issue.severity === 'critical' && existingFile.severity !== 'critical') ||
          (issue.severity === 'error' && existingFile.severity === 'warning')) {
        fileIssueMap.set(issue.location, {
          count: (existingFile?.count || 0) + 1,
          severity: issue.severity
        })
      }
      
      // Add remediation proposal
      remediationProposals.push({
        issue: issue.description,
        proposal: issue.recommendation,
        autoFixable: issue.severity === 'info' || issue.severity === 'warning'
      })
    }
  }
  
  // Get top affected files
  const topAffectedFiles = Array.from(fileIssueMap.entries())
    .map(([file, data]) => ({
      file,
      issueCount: data.count,
      severity: data.severity
    }))
    .sort((a, b) => b.issueCount - a.issueCount)
    .slice(0, 10)
  
  // Create drift frequency trend (simplified for now)
  const driftFrequencyTrend = [{
    timestamp: driftReport.generatedAt,
    issueCount: driftReport.totalIssues
  }]
  
  return {
    activeDriftAlerts: driftReport.totalIssues,
    criticalCount: driftReport.criticalCount,
    errorCount: driftReport.errorCount,
    warningCount: driftReport.warningCount,
    infoCount: driftReport.infoCount,
    driftByCategory,
    driftBySeverity,
    topAffectedFiles,
    remediationProposals,
    driftFrequencyTrend
  }
}
