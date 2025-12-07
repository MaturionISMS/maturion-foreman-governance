/**
 * Knowledge Retirement Engine
 * Memory Lifecycle Governance System
 * 
 * Implements retirement mechanism for long-term memory management:
 * - Identifies memory eligible for retirement
 * - Determines retirement category and severity
 * - Moves entries to archival storage
 * - Maintains full auditability and reversibility
 * - Integrates with drift monitor and consolidation engine
 * 
 * Core Principle: Retirement never deletes data.
 */

import fs from 'fs'
import path from 'path'
import {
  MemoryLifecycleState,
  RetirementReason,
  RetirementSeverity,
  RetirementCandidate,
  RetirementReport,
  RetirementConfig,
  RetirementEvent,
  RetirementMarker,
  ArchivedEntry,
  RetirementInfo,
  RestorationRequest,
  RestorationResult,
  RetirementStatistics
} from '@/types/retirement'
import { MemoryEntry, MemoryScope } from '@/types/memory'
import { KnowledgeBlock } from '@/types/consolidation'
import { getAllMemory, flattenMemory } from './storage'
import { DriftReport } from '@/types/drift'

/**
 * Default retirement configuration
 */
const DEFAULT_CONFIG: RetirementConfig = {
  stalenessThresholds: {
    reasoningPatterns: 180,    // 6 months
    architectureLessons: 365,  // 1 year
    issues: 90,                // 3 months
    projectMemory: 30,         // 1 month
    generalMemory: 180         // 6 months
  },
  autoRetireStale: true,
  autoRetireSuperseded: true,
  autoRetireObsolete: true,
  autoRetireConflicting: false, // Requires manual review
  requireManualReviewForHigh: true,
  requireManualReviewForCritical: true,
  enableArchival: true,
  archivalRetentionYears: 3,
  retireWhenConsolidated: true,
  minConsolidationConfidence: 0.8,
  resolveConflictsOnRetirement: true
}

/**
 * Get archive path for scope and date
 */
function getArchivePath(scope: MemoryScope, date: Date, deprecated: boolean = false): string {
  const basePath = path.join(process.cwd(), 'memory', 'archive')
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  
  if (deprecated) {
    return path.join(basePath, 'deprecated', scope, `${year}`, month)
  }
  
  return path.join(basePath, scope, `${year}`, month)
}

/**
 * Ensure archive directory exists
 */
function ensureArchiveDir(archivePath: string): void {
  if (!fs.existsSync(archivePath)) {
    fs.mkdirSync(archivePath, { recursive: true })
  }
}

/**
 * Load consolidated knowledge blocks
 */
function loadConsolidatedKnowledge(): KnowledgeBlock[] {
  const basePath = path.join(process.cwd(), 'memory', 'global', 'consolidated')
  
  if (!fs.existsSync(basePath)) {
    return []
  }
  
  const blocks: KnowledgeBlock[] = []
  const files = fs.readdirSync(basePath)
  
  for (const file of files) {
    if (!file.endsWith('.json')) continue
    
    try {
      const filePath = path.join(basePath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      if (!content.trim()) continue
      
      const categoryBlocks = JSON.parse(content)
      if (Array.isArray(categoryBlocks)) {
        blocks.push(...categoryBlocks)
      }
    } catch (error) {
      console.error(`[Retirement] Error loading consolidated knowledge from ${file}:`, error)
    }
  }
  
  return blocks
}

/**
 * Detect staleness retirement candidates
 */
export function detectStalenessRetirement(
  entries: MemoryEntry[],
  config: RetirementConfig = DEFAULT_CONFIG
): RetirementCandidate[] {
  console.log('[Retirement] Detecting staleness candidates...')
  
  const candidates: RetirementCandidate[] = []
  const now = Date.now()
  
  for (const entry of entries) {
    const age = now - new Date(entry.metadata.createdAt).getTime()
    const ageDays = age / (1000 * 60 * 60 * 24)
    
    // Determine threshold based on entry type
    let threshold = config.stalenessThresholds.generalMemory
    
    if (entry.tags?.includes('reasoning_pattern')) {
      threshold = config.stalenessThresholds.reasoningPatterns
    } else if (entry.tags?.includes('architecture') || entry.tags?.includes('architecture_decision')) {
      threshold = config.stalenessThresholds.architectureLessons
    } else if (entry.tags?.includes('qa_failure') || entry.tags?.includes('error_escalation')) {
      threshold = config.stalenessThresholds.issues
    } else if (entry.scope === 'project') {
      threshold = config.stalenessThresholds.projectMemory
    }
    
    // Check if stale
    if (ageDays > threshold) {
      // Determine severity
      let severity: RetirementSeverity = 'low'
      if (entry.tags?.includes('critical') || entry.tags?.includes('governance')) {
        severity = 'critical'
      } else if (entry.tags?.includes('architecture_decision')) {
        severity = 'high'
      } else if (ageDays > threshold * 1.5) {
        severity = 'medium'
      }
      
      // Calculate confidence score
      const excessAge = ageDays - threshold
      const score = Math.min(50 + (excessAge / threshold) * 50, 100)
      
      candidates.push({
        entry,
        reason: 'staleness',
        severity,
        score,
        explanation: `Entry is ${Math.floor(ageDays)} days old, exceeding ${threshold} day threshold by ${Math.floor(excessAge)} days`,
        recommendedAction: severity === 'low' ? 'archive' : 'review',
        metadata: {
          ageInDays: Math.floor(ageDays)
        }
      })
    }
  }
  
  console.log(`[Retirement] Found ${candidates.length} staleness candidates`)
  return candidates
}

/**
 * Detect supersession retirement candidates
 */
export function detectSupersessionRetirement(
  entries: MemoryEntry[],
  consolidatedKnowledge: KnowledgeBlock[],
  config: RetirementConfig = DEFAULT_CONFIG
): RetirementCandidate[] {
  console.log('[Retirement] Detecting supersession candidates...')
  
  const candidates: RetirementCandidate[] = []
  
  for (const entry of entries) {
    // Check if entry is referenced in any consolidated knowledge
    for (const block of consolidatedKnowledge) {
      if (block.originEntries.includes(entry.id) && block.confidence >= config.minConsolidationConfidence) {
        candidates.push({
          entry,
          reason: 'supersession',
          severity: 'low', // Low severity - consolidated knowledge is reliable
          score: block.confidence * 100,
          explanation: `Entry superseded by consolidated knowledge block ${block.id} (${block.category})`,
          recommendedAction: 'retire',
          metadata: {
            ageInDays: Math.floor((Date.now() - new Date(entry.metadata.createdAt).getTime()) / (1000 * 60 * 60 * 24))
          }
        })
        break // Only retire once per block
      }
    }
  }
  
  console.log(`[Retirement] Found ${candidates.length} supersession candidates`)
  return candidates
}

/**
 * Detect obsolescence retirement candidates
 */
export function detectObsolescenceRetirement(
  entries: MemoryEntry[]
): RetirementCandidate[] {
  console.log('[Retirement] Detecting obsolescence candidates...')
  
  const candidates: RetirementCandidate[] = []
  
  // Common obsolete patterns
  const obsoletePatterns = [
    /\bremoved\b/i,
    /\bdeleted\b/i,
    /\bdeprecated\b/i,
    /\barchived\b/i,
    /\blegacy\b/i,
    /\bold\s+version\b/i
  ]
  
  // Obsolete module/feature indicators
  const obsoleteIndicators = [
    'deprecated',
    'removed',
    'legacy',
    'old',
    'obsolete'
  ]
  
  for (const entry of entries) {
    const description = entry.value.description || ''
    const key = entry.key
    
    // Check description for obsolete patterns
    const hasObsoletePattern = obsoletePatterns.some(pattern => pattern.test(description))
    
    // Check key for obsolete indicators
    const hasObsoleteKey = obsoleteIndicators.some(indicator => 
      key.toLowerCase().includes(indicator)
    )
    
    // Check tags for obsolete indicators
    const hasObsoleteTags = entry.tags?.some(tag => 
      obsoleteIndicators.some(indicator => tag.toLowerCase().includes(indicator))
    )
    
    if (hasObsoletePattern || hasObsoleteKey || hasObsoleteTags) {
      let severity: RetirementSeverity = 'medium'
      if (entry.tags?.includes('architecture_decision')) {
        severity = 'high'
      }
      
      candidates.push({
        entry,
        reason: 'obsolescence',
        severity,
        score: 75,
        explanation: `Entry references obsolete components or features`,
        recommendedAction: 'deprecate',
        metadata: {
          ageInDays: Math.floor((Date.now() - new Date(entry.metadata.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        }
      })
    }
  }
  
  console.log(`[Retirement] Found ${candidates.length} obsolescence candidates`)
  return candidates
}

/**
 * Detect contradiction-based retirement candidates
 */
export function detectContradictionRetirement(
  entries: MemoryEntry[],
  driftReport?: DriftReport
): RetirementCandidate[] {
  console.log('[Retirement] Detecting contradiction candidates...')
  
  const candidates: RetirementCandidate[] = []
  
  if (!driftReport) {
    return candidates
  }
  
  // Find contradiction issues from drift report
  const contradictions = driftReport.checks
    .filter(check => check.category === 'contradiction_drift')
    .flatMap(check => check.issues)
  
  for (const issue of contradictions) {
    if (!issue.affectedEntries || issue.affectedEntries.length < 2) continue
    
    // Find the oldest entry to retire
    const affectedEntries = entries.filter(e => issue.affectedEntries!.includes(e.id))
    if (affectedEntries.length < 2) continue
    
    // Sort by creation date
    affectedEntries.sort((a, b) => 
      new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime()
    )
    
    // Retire the oldest entry
    const oldestEntry = affectedEntries[0]
    const newestEntry = affectedEntries[affectedEntries.length - 1]
    
    let severity: RetirementSeverity = 'medium'
    if (issue.severity === 'critical') {
      severity = 'high'
    }
    
    candidates.push({
      entry: oldestEntry,
      reason: 'contradiction',
      severity,
      score: 70,
      explanation: `Entry contradicts newer entry ${newestEntry.id}: ${issue.description}`,
      recommendedAction: 'review',
      metadata: {
        ageInDays: Math.floor((Date.now() - new Date(oldestEntry.metadata.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
        conflictCount: affectedEntries.length
      }
    })
  }
  
  console.log(`[Retirement] Found ${candidates.length} contradiction candidates`)
  return candidates
}

/**
 * Archive retired entry
 */
function archiveEntry(
  entry: MemoryEntry,
  retirementInfo: RetirementInfo
): string {
  const now = new Date()
  const deprecated = retirementInfo.lifecycle === 'deprecated'
  const archivePath = getArchivePath(entry.scope, now, deprecated)
  
  ensureArchiveDir(archivePath)
  
  const archiveFile = path.join(archivePath, 'retired-entries.json')
  
  // Load existing archives
  let archives: ArchivedEntry[] = []
  if (fs.existsSync(archiveFile)) {
    try {
      const content = fs.readFileSync(archiveFile, 'utf-8')
      if (content.trim()) {
        archives = JSON.parse(content)
      }
    } catch (error) {
      console.error(`[Retirement] Error loading archive file:`, error)
    }
  }
  
  // Add new archive
  const archivedEntry: ArchivedEntry = {
    originalEntry: entry,
    retirementInfo,
    archivedAt: now.toISOString(),
    archiveVersion: 1
  }
  
  archives.push(archivedEntry)
  
  // Save archives
  fs.writeFileSync(archiveFile, JSON.stringify(archives, null, 2), 'utf-8')
  
  return archiveFile
}

/**
 * Log retirement event
 */
function logRetirementEvent(event: RetirementEvent): void {
  const eventLogPath = path.join(process.cwd(), 'memory', 'governance-events.json')
  
  // Load existing events
  let events: any[] = []
  if (fs.existsSync(eventLogPath)) {
    try {
      const content = fs.readFileSync(eventLogPath, 'utf-8')
      if (content.trim()) {
        events = JSON.parse(content)
      }
    } catch (error) {
      console.error(`[Retirement] Error loading event log:`, error)
      events = []
    }
  }
  
  // Add new event
  events.push({
    type: 'memory_retirement',
    timestamp: event.timestamp,
    actor: event.actor,
    scope: event.scope,
    action: event.type,
    details: {
      entryId: event.entryId,
      reason: event.reason,
      lifecycle: event.lifecycle,
      ...event.metadata
    }
  })
  
  // Keep only last 1000 events
  if (events.length > 1000) {
    events = events.slice(-1000)
  }
  
  // Save events
  fs.writeFileSync(eventLogPath, JSON.stringify(events, null, 2), 'utf-8')
}

/**
 * Insert retirement marker into original dataset
 */
function insertRetirementMarker(
  entry: MemoryEntry,
  retirementInfo: RetirementInfo,
  archiveLocation: string
): void {
  const marker: RetirementMarker = {
    retired: true,
    retiredAt: new Date().toISOString(),
    reason: retirementInfo.reason,
    lifecycle: retirementInfo.lifecycle,
    archiveLocation,
    supersededBy: retirementInfo.supersededBy,
    manualReviewRequired: retirementInfo.manualReviewRequired
  }
  
  // Create a defensive copy to avoid mutation
  // Note: This is for documentation purposes - in practice, entry.value is updated
  // but the original entry object is preserved in the archive
  entry.value = {
    ...entry.value,
    _retired: marker
  }
}

/**
 * Execute retirement for candidates
 */
export function executeRetirement(
  candidates: RetirementCandidate[],
  config: RetirementConfig = DEFAULT_CONFIG
): RetirementReport {
  console.log('[Retirement] Executing retirement...')
  
  const retirements: ArchivedEntry[] = []
  const flaggedForReview: RetirementCandidate[] = []
  
  for (const candidate of candidates) {
    // Check if manual review is required
    const requiresReview = 
      (candidate.severity === 'high' && config.requireManualReviewForHigh) ||
      (candidate.severity === 'critical' && config.requireManualReviewForCritical) ||
      (candidate.reason === 'contradiction' && !config.autoRetireConflicting)
    
    if (requiresReview) {
      flaggedForReview.push(candidate)
      console.log(`[Retirement] Flagged for review: ${candidate.entry.id} (${candidate.reason}, ${candidate.severity})`)
      continue
    }
    
    // Determine lifecycle state
    let lifecycle: MemoryLifecycleState = 'archival'
    if (candidate.recommendedAction === 'deprecate') {
      lifecycle = 'deprecated'
    }
    
    // Create retirement info
    const retirementInfo: RetirementInfo = {
      reason: candidate.reason,
      severity: candidate.severity,
      lifecycle,
      explanation: candidate.explanation,
      supersededBy: candidate.reason === 'supersession' ? 'consolidated-knowledge' : undefined,
      manualReviewRequired: false
    }
    
    // Archive entry
    const archiveLocation = archiveEntry(candidate.entry, retirementInfo)
    
    // Insert retirement marker
    insertRetirementMarker(candidate.entry, retirementInfo, archiveLocation)
    
    // Log event
    logRetirementEvent({
      type: 'retirement',
      entryId: candidate.entry.id,
      scope: candidate.entry.scope,
      reason: candidate.reason,
      lifecycle,
      timestamp: new Date().toISOString(),
      actor: 'retirement-engine',
      metadata: {
        previousState: 'active',
        newState: lifecycle,
        archiveLocation,
        supersededBy: retirementInfo.supersededBy,
        reviewRequired: false
      }
    })
    
    retirements.push({
      originalEntry: candidate.entry,
      retirementInfo,
      archivedAt: new Date().toISOString(),
      archiveVersion: 1
    })
    
    console.log(`[Retirement] Retired: ${candidate.entry.id} → ${archiveLocation}`)
  }
  
  const report: RetirementReport = {
    timestamp: new Date().toISOString(),
    totalEntriesEvaluated: candidates.length,
    candidatesIdentified: candidates.length,
    entriesRetired: retirements.length,
    entriesArchived: retirements.filter(r => r.retirementInfo.lifecycle === 'archival').length,
    entriesDeprecated: retirements.filter(r => r.retirementInfo.lifecycle === 'deprecated').length,
    entriesFlaggedForReview: flaggedForReview.length,
    candidates: flaggedForReview,
    retirements,
    summary: generateRetirementSummary(retirements, flaggedForReview)
  }
  
  console.log('[Retirement] Execution complete')
  console.log(report.summary)
  
  return report
}

/**
 * Generate retirement summary
 */
function generateRetirementSummary(
  retirements: ArchivedEntry[],
  flaggedForReview: RetirementCandidate[]
): string {
  const lines: string[] = []
  
  lines.push('Knowledge Retirement Report')
  lines.push('─'.repeat(50))
  lines.push(`Total Retirements: ${retirements.length}`)
  lines.push(`Archived: ${retirements.filter(r => r.retirementInfo.lifecycle === 'archival').length}`)
  lines.push(`Deprecated: ${retirements.filter(r => r.retirementInfo.lifecycle === 'deprecated').length}`)
  lines.push(`Flagged for Review: ${flaggedForReview.length}`)
  lines.push('─'.repeat(50))
  
  // Group by reason
  const byReason: Record<RetirementReason, number> = {
    staleness: 0,
    supersession: 0,
    obsolescence: 0,
    contradiction: 0,
    consolidation: 0,
    manual_review: 0
  }
  
  retirements.forEach(r => {
    byReason[r.retirementInfo.reason] = (byReason[r.retirementInfo.reason] || 0) + 1
  })
  
  lines.push('Retirements by Reason:')
  Object.entries(byReason).forEach(([reason, count]) => {
    if (count > 0) {
      lines.push(`  - ${reason}: ${count}`)
    }
  })
  
  return lines.join('\n')
}

/**
 * Run complete retirement process
 */
export async function runRetirement(
  config: RetirementConfig = DEFAULT_CONFIG,
  driftReport?: DriftReport
): Promise<RetirementReport> {
  console.log('[Retirement] Starting retirement process...')
  
  // Load all memory
  const allMemory = await getAllMemory()
  const allEntries = flattenMemory(allMemory)
  
  // Filter out already retired entries
  const activeEntries = allEntries.filter(e => !e.value._retired?.retired)
  
  console.log(`[Retirement] Loaded ${activeEntries.length} active entries`)
  
  // Load consolidated knowledge
  const consolidatedKnowledge = loadConsolidatedKnowledge()
  console.log(`[Retirement] Loaded ${consolidatedKnowledge.length} consolidated knowledge blocks`)
  
  // Detect candidates
  const candidates: RetirementCandidate[] = []
  
  if (config.autoRetireStale) {
    candidates.push(...detectStalenessRetirement(activeEntries, config))
  }
  
  if (config.autoRetireSuperseded) {
    candidates.push(...detectSupersessionRetirement(activeEntries, consolidatedKnowledge, config))
  }
  
  if (config.autoRetireObsolete) {
    candidates.push(...detectObsolescenceRetirement(activeEntries))
  }
  
  if (driftReport) {
    candidates.push(...detectContradictionRetirement(activeEntries, driftReport))
  }
  
  console.log(`[Retirement] Identified ${candidates.length} retirement candidates`)
  
  // Execute retirement
  const report = executeRetirement(candidates, config)
  
  return report
}

/**
 * Restore archived entry
 */
export async function restoreEntry(request: RestorationRequest): Promise<RestorationResult> {
  console.log(`[Retirement] Restoring entry ${request.archiveId}...`)
  
  // Parse archive location
  const archivePath = request.archiveId
  
  if (!fs.existsSync(archivePath)) {
    return {
      success: false,
      error: `Archive file not found: ${archivePath}`,
      restoredFrom: archivePath,
      restoredAt: new Date().toISOString()
    }
  }
  
  try {
    // Load archives
    const content = fs.readFileSync(archivePath, 'utf-8')
    const archives: ArchivedEntry[] = JSON.parse(content)
    
    // Find entry
    const archived = archives.find(a => a.originalEntry.id === request.archiveId)
    
    if (!archived) {
      return {
        success: false,
        error: `Entry not found in archive`,
        restoredFrom: archivePath,
        restoredAt: new Date().toISOString()
      }
    }
    
    // Remove retirement marker
    const entry = archived.originalEntry
    delete entry.value._retired
    
    // Update metadata
    entry.metadata.updatedAt = new Date().toISOString()
    entry.metadata.version += 1
    
    // Log restoration event
    logRetirementEvent({
      type: 'restoration',
      entryId: entry.id,
      scope: entry.scope,
      reason: 'manual_review',
      lifecycle: request.targetState,
      timestamp: new Date().toISOString(),
      actor: request.requestedBy,
      metadata: {
        previousState: archived.retirementInfo.lifecycle,
        newState: request.targetState,
        reviewRequired: false
      }
    })
    
    console.log(`[Retirement] Restored entry ${entry.id}`)
    
    return {
      success: true,
      entry,
      restoredFrom: archivePath,
      restoredAt: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: `Error restoring entry: ${error}`,
      restoredFrom: archivePath,
      restoredAt: new Date().toISOString()
    }
  }
}

/**
 * Get retirement statistics
 */
export async function getRetirementStatistics(): Promise<RetirementStatistics> {
  const allMemory = await getAllMemory()
  const allEntries = flattenMemory(allMemory)
  
  const activeEntries = allEntries.filter(e => !e.value._retired?.retired)
  const retiredEntries = allEntries.filter(e => e.value._retired?.retired)
  
  // Count by lifecycle state
  const archivedEntries = retiredEntries.filter(e => 
    e.value._retired?.lifecycle === 'archival'
  )
  const deprecatedEntries = retiredEntries.filter(e => 
    e.value._retired?.lifecycle === 'deprecated'
  )
  
  // Count by reason
  const retirementsByReason: Record<RetirementReason, number> = {
    staleness: 0,
    supersession: 0,
    obsolescence: 0,
    contradiction: 0,
    consolidation: 0,
    manual_review: 0
  }
  
  retiredEntries.forEach(e => {
    const reason = e.value._retired?.reason as RetirementReason | undefined
    if (reason && reason in retirementsByReason) {
      retirementsByReason[reason] = (retirementsByReason[reason] || 0) + 1
    }
  })
  
  // Count by scope
  const retirementsByScope: Record<MemoryScope, number> = {
    global: retiredEntries.filter(e => e.scope === 'global').length,
    foreman: retiredEntries.filter(e => e.scope === 'foreman').length,
    project: retiredEntries.filter(e => e.scope === 'project').length
  }
  
  // Calculate average age at retirement
  let totalAge = 0
  retiredEntries.forEach(e => {
    if (e.value._retired?.retiredAt) {
      const retiredAt = new Date(e.value._retired.retiredAt).getTime()
      const createdAt = new Date(e.metadata.createdAt).getTime()
      totalAge += (retiredAt - createdAt) / (1000 * 60 * 60 * 24)
    }
  })
  const averageAgeAtRetirement = retiredEntries.length > 0 ? totalAge / retiredEntries.length : 0
  
  // Find oldest active entry
  let oldestActiveEntry = 0
  activeEntries.forEach(e => {
    const age = (Date.now() - new Date(e.metadata.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    if (age > oldestActiveEntry) {
      oldestActiveEntry = age
    }
  })
  
  // Calculate storage reduction (approximate)
  const activeSize = JSON.stringify(activeEntries).length
  const retiredSize = JSON.stringify(retiredEntries).length
  const totalSize = activeSize + retiredSize
  
  return {
    totalActive: activeEntries.length,
    totalArchived: archivedEntries.length,
    totalDeprecated: deprecatedEntries.length,
    totalConsolidated: loadConsolidatedKnowledge().length,
    retirementsByReason,
    retirementsByScope,
    averageAgeAtRetirement: Math.floor(averageAgeAtRetirement),
    oldestActiveEntry: Math.floor(oldestActiveEntry),
    storageReduction: {
      beforeBytes: totalSize,
      afterBytes: activeSize,
      reductionPercentage: totalSize > 0 ? ((retiredSize / totalSize) * 100) : 0
    },
    lastRetirementRun: new Date().toISOString()
  }
}
