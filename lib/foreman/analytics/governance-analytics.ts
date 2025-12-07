/**
 * Governance Alignment Analytics Aggregator
 * Collects and analyzes governance compliance metrics
 */

import { GovernanceAlignmentAnalytics } from '@/types/analytics'
import { getAllMemory } from '../memory/storage'
import { runDriftMonitoring } from '../memory/drift-monitor'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Get governance alignment analytics
 */
export async function getGovernanceAlignmentAnalytics(): Promise<GovernanceAlignmentAnalytics> {
  const allMemory = await getAllMemory()
  const driftReport = await runDriftMonitoring()
  
  // Count governance violations from drift report
  const governanceIssues = driftReport.checks
    .filter(check => check.category === 'governance_drift')
    .flatMap(check => check.issues)
  
  const violationsDetected = governanceIssues.length
  
  // Track rule references and violations
  const ruleReferenceMap = new Map<string, number>()
  const ruleViolationMap = new Map<string, number>()
  
  // Count governance-related memory entries
  const governanceEntries = allMemory.filter(
    entry => entry.tags?.includes('governance') || 
             entry.scope === 'foreman' ||
             entry.value?.governanceLinks
  )
  
  for (const entry of governanceEntries) {
    // Count references
    if (entry.value?.governanceLinks) {
      for (const link of entry.value.governanceLinks) {
        ruleReferenceMap.set(link, (ruleReferenceMap.get(link) || 0) + 1)
      }
    }
  }
  
  // Count violations from drift issues
  for (const issue of governanceIssues) {
    const rule = issue.details?.rule || 'unknown'
    ruleViolationMap.set(rule, (ruleViolationMap.get(rule) || 0) + 1)
  }
  
  // Get top referenced rules
  const topReferencedRules = Array.from(ruleReferenceMap.entries())
    .map(([rule, count]) => ({ rule, referenceCount: count }))
    .sort((a, b) => b.referenceCount - a.referenceCount)
    .slice(0, 10)
  
  // Get top violated rules
  const topViolatedRules = Array.from(ruleViolationMap.entries())
    .map(([rule, count]) => ({ rule, violationCount: count }))
    .sort((a, b) => b.violationCount - a.violationCount)
    .slice(0, 10)
  
  // Count governance updates affecting memory
  const governanceUpdateEntries = allMemory.filter(
    entry => entry.type === 'governance_update' || 
             entry.tags?.includes('governance_update')
  )
  const governanceUpdatesAffectingMemory = governanceUpdateEntries.length
  
  // Calculate compliance score
  const totalRules = ruleReferenceMap.size
  const violatedRules = ruleViolationMap.size
  const complianceScore = totalRules > 0 
    ? Math.round(((totalRules - violatedRules) / totalRules) * 100) / 100
    : 1.0
  
  // Build compliance trend (simplified)
  const complianceTrend: Array<{
    timestamp: string
    complianceScore: number
  }> = [{
    timestamp: new Date().toISOString(),
    complianceScore
  }]
  
  return {
    violationsDetected,
    rulesReferencedCount: totalRules,
    topReferencedRules,
    topViolatedRules,
    governanceUpdatesAffectingMemory,
    complianceTrend
  }
}
