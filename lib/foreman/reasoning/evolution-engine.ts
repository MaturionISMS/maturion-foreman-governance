/**
 * Reasoning Pattern Evolution Engine
 * Enables Foreman to autonomously evolve its reasoning patterns, heuristics, and strategies
 * 
 * Part of Wave M10: Autonomous Memory Improvement
 * 
 * Key capabilities:
 * - Analyze reasoning pattern performance
 * - Score patterns based on success metrics
 * - Promote high-performing patterns to stable status
 * - Retire low-performing patterns
 * - Generate evolution proposals
 * - Update reasoning-patterns.json with improvements
 * - Write consolidated meta-patterns
 */

import fs from 'fs'
import path from 'path'
import {
  ReasoningPattern,
  PatternPerformanceMetrics,
  PatternEvolutionProposal,
  EvolutionEvent
} from '@/types/reasoning'
import { MemoryEntry } from '@/types/memory'
import { KnowledgeBlock } from '@/types/consolidation'
import { getAllMemory } from '@/lib/foreman/memory/storage'
import { loadReasoningPatterns } from './patterns'
import { DriftReport } from '@/types/drift'

/**
 * Performance score thresholds for pattern classification
 */
const SCORE_THRESHOLDS = {
  STABLE: 0.8,      // score >= 0.8 → promoted to long-term stable patterns
  MONITORED_MIN: 0.4, // 0.4 <= score < 0.8 → monitored
  RETIREMENT: 0.4   // score < 0.4 → candidates for retirement
}

/**
 * Scoring weights for performance calculation
 */
const SCORING_WEIGHTS = {
  successRate: 0.30,
  relevance: 0.15,
  qaFailureEscapeRate: -0.25, // Negative weight - lower is better
  architectureConflicts: -0.10, // Negative weight - lower is better
  builderExecutionConsistency: 0.20,
  driftStability: 0.10
}

/**
 * Normalization constants for scoring
 */
const NORMALIZATION_CONSTANTS = {
  MAX_RELEVANCE_USAGE: 100,  // Assume 100+ uses is maximum relevance
  MAX_ARCHITECTURE_CONFLICTS: 10 // Assume 10+ conflicts is worst case
}

/**
 * Governance event limits
 */
const GOVERNANCE_CONFIG = {
  MAX_EVENTS_STORED: 1000  // Keep only last 1000 events to prevent unbounded growth
}

/**
 * Evolution cycle configuration
 */
export interface EvolutionConfig {
  minUsageCount?: number // Minimum usage before scoring
  minConfidence?: number // Minimum confidence for evolution
  enableRetirement?: boolean
  enablePromotion?: boolean
  maxPatternsPerCycle?: number
}

const DEFAULT_EVOLUTION_CONFIG: EvolutionConfig = {
  minUsageCount: 5,
  minConfidence: 0.6,
  enableRetirement: true,
  enablePromotion: true,
  maxPatternsPerCycle: 20
}

/**
 * Evolution cycle result
 */
export interface EvolutionResult {
  timestamp: string
  cycleType: 'build_wave' | 'deployment' | 'scheduled' | 'manual'
  patternsAnalyzed: number
  patternsUpdated: number
  patternsRetired: number
  patternsPromoted: number
  evolutionEvents: EvolutionEvent[]
  proposals: PatternEvolutionProposal[]
  summary: string
}

/**
 * Calculate performance score for a reasoning pattern
 * Score range: 0-1.0
 */
export function calculatePatternScore(metrics: PatternPerformanceMetrics): number {
  const {
    successRate,
    relevance,
    qaFailureEscapeRate,
    architectureConflicts,
    builderExecutionConsistency,
    driftStability
  } = metrics

  // Normalize values
  const normalizedRelevance = Math.min(relevance / NORMALIZATION_CONSTANTS.MAX_RELEVANCE_USAGE, 1.0)
  const normalizedConflicts = Math.max(0, 1 - (architectureConflicts / NORMALIZATION_CONSTANTS.MAX_ARCHITECTURE_CONFLICTS))

  // Calculate weighted score
  let score = 0
  score += successRate * SCORING_WEIGHTS.successRate
  score += normalizedRelevance * SCORING_WEIGHTS.relevance
  score += qaFailureEscapeRate * SCORING_WEIGHTS.qaFailureEscapeRate
  score += normalizedConflicts * Math.abs(SCORING_WEIGHTS.architectureConflicts)
  score += builderExecutionConsistency * SCORING_WEIGHTS.builderExecutionConsistency
  score += driftStability * SCORING_WEIGHTS.driftStability

  // Ensure score is between 0 and 1
  return Math.max(0, Math.min(1, score))
}

/**
 * Analyze pattern performance from a pre-loaded memory array (more efficient)
 * @param pattern - The pattern to analyze
 * @param allMemory - Pre-loaded and flattened memory entries
 */
function analyzePatternPerformanceFromMemory(
  pattern: ReasoningPattern,
  allMemory: MemoryEntry[]
): PatternPerformanceMetrics {
  // Find memory entries that reference this pattern
  const patternUsages = allMemory.filter(entry => {
    const metadata = entry.metadata as any
    return (
      metadata?.patternsApplied?.includes(pattern.id) ||
      metadata?.reasoning?.includes(pattern.id)
    )
  })

  const usageCount = patternUsages.length || pattern.usageCount || 0

  // Calculate metrics from usage
  let successfulOutcomes = 0
  let qaFailures = 0
  let architectureConflicts = 0
  let consistentExecutions = 0
  let driftIssues = 0

  for (const entry of patternUsages) {
    const metadata = entry.metadata as any
    
    // Success rate: entries without errors or failures
    if (!metadata?.error && !metadata?.failed) {
      successfulOutcomes++
    }

    // QA failures
    if (entry.tags?.includes('qa_failure') || metadata?.qaFailed) {
      qaFailures++
    }

    // Architecture conflicts
    if (entry.tags?.includes('architecture_conflict') || metadata?.architectureConflict) {
      architectureConflicts++
    }

    // Builder consistency
    if (metadata?.builderConsistent !== false) {
      consistentExecutions++
    }

    // Drift stability
    if (!metadata?.causedDrift && !entry.tags?.includes('drift')) {
      // No drift issues
    } else {
      driftIssues++
    }
  }

  const totalUsages = usageCount || 1 // Avoid division by zero

  return {
    patternId: pattern.id,
    successRate: successfulOutcomes / totalUsages,
    relevance: usageCount,
    qaFailureEscapeRate: qaFailures / totalUsages,
    architectureConflicts,
    builderExecutionConsistency: consistentExecutions / totalUsages,
    driftStability: 1 - (driftIssues / totalUsages),
    usageCount,
    lastUsed: pattern.usageCount ? new Date().toISOString() : undefined
  }
}

/**
 * Analyze pattern performance from memory entries
 * This version loads memory on-demand (use analyzePatternPerformanceFromMemory for better performance)
 */
export async function analyzePatternPerformance(
  pattern: ReasoningPattern
): Promise<PatternPerformanceMetrics> {
  // Load all memory to analyze pattern usage
  const allMemoryObj = await getAllMemory()
  
  // Flatten all memory entries into a single array
  const allMemory: MemoryEntry[] = [
    ...allMemoryObj.global,
    ...allMemoryObj.foreman,
    ...Object.values(allMemoryObj.projects).flat()
  ]
  
  return analyzePatternPerformanceFromMemory(pattern, allMemory)
}

/**
 * Generate evolution proposal for a pattern
 */
export function generateEvolutionProposal(
  pattern: ReasoningPattern,
  metrics: PatternPerformanceMetrics,
  sourceEvidence: string[]
): PatternEvolutionProposal | null {
  const oldScore = pattern.performanceScore || 0
  const newScore = calculatePatternScore(metrics)

  // Only propose evolution if there's significant change
  const scoreDelta = Math.abs(newScore - oldScore)
  if (scoreDelta < 0.1 && oldScore > 0) {
    return null // No significant change
  }

  const proposedChanges: PatternEvolutionProposal['proposedChanges'] = []

  // Update performance score
  if (newScore !== oldScore) {
    proposedChanges.push({
      field: 'performanceScore',
      oldValue: oldScore,
      newValue: newScore
    })
  }

  // Update success rate
  if (metrics.successRate !== pattern.successRate) {
    proposedChanges.push({
      field: 'successRate',
      oldValue: pattern.successRate,
      newValue: metrics.successRate
    })
  }

  // Update usage count
  if (metrics.usageCount !== pattern.usageCount) {
    proposedChanges.push({
      field: 'usageCount',
      oldValue: pattern.usageCount,
      newValue: metrics.usageCount
    })
  }

  return {
    patternId: pattern.id,
    oldScore,
    newScore,
    proposedChanges,
    sourceEvidence,
    reason: `Performance ${newScore > oldScore ? 'improved' : 'degraded'} from ${oldScore.toFixed(2)} to ${newScore.toFixed(2)}`,
    confidence: metrics.usageCount >= 10 ? 0.9 : 0.6
  }
}

/**
 * Apply evolution proposal to a pattern
 */
export function applyEvolutionProposal(
  pattern: ReasoningPattern,
  proposal: PatternEvolutionProposal
): ReasoningPattern {
  const updatedPattern = { ...pattern }

  for (const change of proposal.proposedChanges) {
    (updatedPattern as any)[change.field] = change.newValue
  }

  updatedPattern.lastEvolved = new Date().toISOString()

  return updatedPattern
}

/**
 * Classify pattern based on performance score
 */
export function classifyPattern(score: number): 'stable' | 'monitored' | 'retirement_candidate' {
  if (score >= SCORE_THRESHOLDS.STABLE) {
    return 'stable'
  } else if (score >= SCORE_THRESHOLDS.MONITORED_MIN) {
    return 'monitored'
  } else {
    return 'retirement_candidate'
  }
}

/**
 * Save evolution event to governance logs
 */
export async function logEvolutionEvent(event: EvolutionEvent): Promise<void> {
  const governanceEventsPath = path.join(
    process.cwd(),
    'memory',
    'global',
    'governance-events.json'
  )

  let events: EvolutionEvent[] = []

  // Load existing events
  if (fs.existsSync(governanceEventsPath)) {
    try {
      const data = fs.readFileSync(governanceEventsPath, 'utf-8')
      events = JSON.parse(data)
    } catch (error) {
      console.warn('[Evolution] Failed to load existing governance events:', error)
    }
  }

  // Add new event
  events.push(event)

  // Keep only last N events to prevent unbounded growth
  if (events.length > GOVERNANCE_CONFIG.MAX_EVENTS_STORED) {
    events = events.slice(-GOVERNANCE_CONFIG.MAX_EVENTS_STORED)
  }

  // Save back
  fs.writeFileSync(governanceEventsPath, JSON.stringify(events, null, 2), 'utf-8')
}

/**
 * Save evolved patterns to consolidated reasoning directory
 */
export async function saveConsolidatedReasoningPatterns(
  patterns: ReasoningPattern[]
): Promise<void> {
  const consolidatedPath = path.join(
    process.cwd(),
    'memory',
    'global',
    'consolidated',
    'reasoning'
  )

  // Ensure directory exists
  if (!fs.existsSync(consolidatedPath)) {
    fs.mkdirSync(consolidatedPath, { recursive: true })
  }

  const filePath = path.join(consolidatedPath, 'consolidated_reasoning_patterns.json')

  // Group patterns by classification
  const grouped = {
    stable: patterns.filter(p => classifyPattern(p.performanceScore || 0) === 'stable'),
    monitored: patterns.filter(p => classifyPattern(p.performanceScore || 0) === 'monitored'),
    retirementCandidates: patterns.filter(p => classifyPattern(p.performanceScore || 0) === 'retirement_candidate')
  }

  const data = {
    lastUpdated: new Date().toISOString(),
    totalPatterns: patterns.length,
    stablePatterns: grouped.stable.length,
    monitoredPatterns: grouped.monitored.length,
    retirementCandidates: grouped.retirementCandidates.length,
    patterns: grouped
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/**
 * Run evolution cycle
 * 
 * Main entry point for pattern evolution. Analyzes all patterns,
 * generates proposals, applies approved changes, and logs events.
 */
export async function runEvolutionCycle(
  cycleType: EvolutionResult['cycleType'] = 'manual',
  config: EvolutionConfig = {}
): Promise<EvolutionResult> {
  const finalConfig = { ...DEFAULT_EVOLUTION_CONFIG, ...config }
  const timestamp = new Date().toISOString()

  console.log(`[Evolution] Starting evolution cycle (${cycleType}) at ${timestamp}`)

  // Load all memory once and cache the flattened array for performance
  const allMemoryObj = await getAllMemory()
  const allMemory: MemoryEntry[] = [
    ...allMemoryObj.global,
    ...allMemoryObj.foreman,
    ...Object.values(allMemoryObj.projects).flat()
  ]
  
  // Load current patterns
  const patterns = loadReasoningPatterns(allMemory)
  console.log(`[Evolution] Loaded ${patterns.length} patterns`)

  const proposals: PatternEvolutionProposal[] = []
  const events: EvolutionEvent[] = []
  const updatedPatterns: ReasoningPattern[] = []

  let patternsUpdated = 0
  let patternsRetired = 0
  let patternsPromoted = 0

  // Analyze each pattern
  for (const pattern of patterns) {
    try {
      // Analyze performance (pass cached memory for efficiency)
      const metrics = analyzePatternPerformanceFromMemory(pattern, allMemory)

      // Skip if not enough usage data
      if (metrics.usageCount < (finalConfig.minUsageCount || 0)) {
        updatedPatterns.push(pattern) // Keep as-is
        continue
      }

      // Generate proposal
      const sourceEvidence = [`usage_count:${metrics.usageCount}`]
      const proposal = generateEvolutionProposal(pattern, metrics, sourceEvidence)

      if (!proposal) {
        updatedPatterns.push(pattern) // No changes needed
        continue
      }

      // Check confidence threshold
      if (proposal.confidence < (finalConfig.minConfidence || 0)) {
        updatedPatterns.push(pattern) // Keep as-is due to low confidence
        continue
      }

      proposals.push(proposal)

      // Apply proposal
      const updatedPattern = applyEvolutionProposal(pattern, proposal)
      updatedPatterns.push(updatedPattern)
      patternsUpdated++

      // Check for promotion or retirement
      const classification = classifyPattern(proposal.newScore)
      const oldClassification = classifyPattern(proposal.oldScore)

      let eventType: EvolutionEvent['type'] = 'reasoning_pattern_updated'

      if (classification === 'stable' && oldClassification !== 'stable' && finalConfig.enablePromotion) {
        patternsPromoted++
        console.log(`[Evolution] Pattern ${pattern.id} promoted to stable`)
      } else if (classification === 'retirement_candidate' && finalConfig.enableRetirement) {
        patternsRetired++
        eventType = 'reasoning_pattern_retired'
        console.log(`[Evolution] Pattern ${pattern.id} marked for retirement`)
      }

      // Log event
      const event: EvolutionEvent = {
        type: eventType,
        patternId: pattern.id,
        oldScore: proposal.oldScore,
        newScore: proposal.newScore,
        sourceEvidence: proposal.sourceEvidence,
        timestamp,
        changes: proposal.proposedChanges.map(c => c.field),
        reason: proposal.reason
      }

      events.push(event)
      await logEvolutionEvent(event)

    } catch (error) {
      console.error(`[Evolution] Error analyzing pattern ${pattern.id}:`, error)
      updatedPatterns.push(pattern) // Keep original on error
    }
  }

  // Save consolidated patterns
  await saveConsolidatedReasoningPatterns(updatedPatterns)

  const summary = `Evolution cycle complete: ${patternsUpdated} updated, ${patternsPromoted} promoted, ${patternsRetired} retired`
  console.log(`[Evolution] ${summary}`)

  return {
    timestamp,
    cycleType,
    patternsAnalyzed: patterns.length,
    patternsUpdated,
    patternsRetired,
    patternsPromoted,
    evolutionEvents: events,
    proposals,
    summary
  }
}

/**
 * Get evolution statistics
 */
export async function getEvolutionStats(): Promise<{
  totalPatterns: number
  stablePatterns: number
  monitoredPatterns: number
  retirementCandidates: number
  lastEvolutionCycle?: string
  totalEvolutions: number
}> {
  // Load all memory first
  const allMemoryObj = await getAllMemory()
  const allMemory: MemoryEntry[] = [
    ...allMemoryObj.global,
    ...allMemoryObj.foreman,
    ...Object.values(allMemoryObj.projects).flat()
  ]
  const patterns = loadReasoningPatterns(allMemory)
  
  let stableCount = 0
  let monitoredCount = 0
  let retirementCount = 0

  for (const pattern of patterns) {
    const classification = classifyPattern(pattern.performanceScore || 0)
    if (classification === 'stable') stableCount++
    else if (classification === 'monitored') monitoredCount++
    else retirementCount++
  }

  // Load governance events to get last cycle
  const governanceEventsPath = path.join(
    process.cwd(),
    'memory',
    'global',
    'governance-events.json'
  )

  let lastCycle: string | undefined
  let totalEvolutions = 0

  if (fs.existsSync(governanceEventsPath)) {
    try {
      const events = JSON.parse(fs.readFileSync(governanceEventsPath, 'utf-8'))
      totalEvolutions = events.length
      if (events.length > 0) {
        lastCycle = events[events.length - 1].timestamp
      }
    } catch (error) {
      // Ignore
    }
  }

  return {
    totalPatterns: patterns.length,
    stablePatterns: stableCount,
    monitoredPatterns: monitoredCount,
    retirementCandidates: retirementCount,
    lastEvolutionCycle: lastCycle,
    totalEvolutions
  }
}

/**
 * Check if evolution cycle should be triggered
 */
export function shouldTriggerEvolution(context: {
  buildWaveCompleted?: boolean
  deploymentCompleted?: boolean
  daysSinceLastEvolution?: number
}): boolean {
  if (context.buildWaveCompleted) return true
  if (context.deploymentCompleted) return true
  if (context.daysSinceLastEvolution && context.daysSinceLastEvolution >= 7) return true
  
  return false
}
