/**
 * Memory-Aware Reasoning Engine (MARE)
 * 
 * The intelligence layer that transforms memory into operational cognition,
 * guiding Foreman's planning, architecture evaluation, builder selection,
 * QA predictions, and corrective actions.
 * 
 * Operates at Autonomy Class A1:
 * - Uses memory inputs correctly
 * - Avoids hallucination or ungrounded assumptions
 * - Behaves consistently across all Foreman agents
 * - Produces interpretable outputs
 * 
 * GSR Integration:
 * - Enforces Governance Supremacy Rule at all reasoning phases
 * - Ensures governance rules override user requests and implementation context
 */

import {
  MemorySnapshot,
  ReasoningContext,
  ReasoningResult,
  ReasoningDecision,
  ProjectMemory,
  GlobalMemory,
  ReasoningPattern,
  ArchitectureLesson,
  HistoricalIssue,
  MilestoneMemory,
  DeploymentMemory,
  BlockerMemory,
  DecisionMemory,
  GovernanceMemory
} from '@/types/reasoning'
import { MemoryEntry, MemoryScope } from '@/types/memory'
import {
  loadMemoryBeforeAction,
  runDriftMonitoring,
  runConsolidation,
  shouldTriggerConsolidation
} from '@/lib/foreman/memory'
import { getAllMemory } from '@/lib/foreman/memory/storage'
import { KnowledgeBlock } from '@/types/consolidation'
import {
  routeMemory,
  getRecommendedScopes,
  getRecommendedTags,
  isMemoryContextSufficient
} from './router'
import {
  loadReasoningPatterns,
  findApplicablePatterns,
  applyPattern
} from './patterns'
import { validateGovernanceAtPhase } from '../governance/gsr-enforcement'
import { DriftReport } from '@/types/drift'
import fs from 'fs'
import path from 'path'

/**
 * Current memory version
 */
const MEMORY_VERSION = '1.0.0'

/**
 * Consolidation threshold for automatic triggering
 */
const CONSOLIDATION_THRESHOLD = 30

/**
 * Load memory snapshot for reasoning
 * 
 * Implements deterministic 5-step sequence:
 * 0. Run drift monitoring (NEW)
 * 1. Load project memory
 * 2. Load global memory
 * 3. Load governance memory
 * 4. Select relevant memories using memory router
 * 5. Produce MemorySnapshot
 * 
 * @param context - Reasoning context
 * @returns Memory snapshot
 */
export async function loadMemorySnapshot(
  context: ReasoningContext,
  options: { skipDriftCheck?: boolean, skipConsolidationCheck?: boolean } = {}
): Promise<MemorySnapshot> {
  console.log('[MARE] Loading memory snapshot...')
  
  // Step 0: Run drift monitoring before loading memory
  if (!options.skipDriftCheck) {
    console.log('[MARE] Step 0: Running drift monitoring...')
    const driftReport = await runDriftMonitoring()
    
    if (driftReport.executionBlocked) {
      console.error('[MARE] CRITICAL: Memory drift detected - execution blocked')
      console.error(driftReport.summary)
      throw new Error(
        `Memory drift detected - execution blocked. ` +
        `Critical issues: ${driftReport.criticalCount}, ` +
        `Error issues: ${driftReport.errorCount}. ` +
        `Run drift monitoring for details.`
      )
    }
    
    if (driftReport.overallStatus !== 'healthy') {
      console.warn(`[MARE] Warning: Memory drift status is ${driftReport.overallStatus}`)
      console.warn(`[MARE] Issues: ${driftReport.totalIssues} (${driftReport.warningCount} warnings, ${driftReport.infoCount} info)`)
    } else {
      console.log('[MARE] Drift check passed: memory is healthy')
    }
  }
  
  const scopesToLoad: MemoryScope[] = getRecommendedScopes(context.intent)
  const recommendedTags = getRecommendedTags({
    intent: context.intent,
    phase: context.phase,
    subsystem: context.subsystem
  })
  
  let allMemoryEntries: MemoryEntry[] = []
  
  // Step 1: Load project memory
  if (context.projectId && scopesToLoad.includes('project')) {
    console.log(`[MARE] Step 1: Loading project memory for ${context.projectId}`)
    const projectMemory = await loadMemoryBeforeAction('project', {
      projectId: context.projectId,
      tags: recommendedTags.length > 0 ? recommendedTags : undefined
    })
    allMemoryEntries.push(...projectMemory.entries)
  }
  
  // Step 2: Load global memory
  if (scopesToLoad.includes('global')) {
    console.log('[MARE] Step 2: Loading global memory')
    const globalMemory = await loadMemoryBeforeAction('global', {
      tags: recommendedTags.length > 0 ? recommendedTags : undefined
    })
    allMemoryEntries.push(...globalMemory.entries)
  }
  
  // Step 3: Load governance memory (foreman scope)
  if (scopesToLoad.includes('foreman')) {
    console.log('[MARE] Step 3: Loading governance/foreman memory')
    const foremanMemory = await loadMemoryBeforeAction('foreman', {
      tags: recommendedTags.length > 0 ? recommendedTags : undefined
    })
    allMemoryEntries.push(...foremanMemory.entries)
  }
  
  // Step 3.1: Filter out retired memory (retirement integration)
  console.log('[MARE] Step 3.1: Filtering out retired memory...')
  const beforeFilter = allMemoryEntries.length
  allMemoryEntries = allMemoryEntries.filter(e => !e.value._retired?.retired)
  const afterFilter = allMemoryEntries.length
  if (beforeFilter !== afterFilter) {
    console.log(`[MARE] Excluded ${beforeFilter - afterFilter} retired entries from reasoning`)
  }
  
  // Step 3.5: Load consolidated knowledge blocks
  console.log('[MARE] Step 3.5: Loading consolidated knowledge blocks')
  const consolidatedBlocks = loadConsolidatedKnowledge()
  console.log(`[MARE] Loaded ${consolidatedBlocks.length} consolidated knowledge blocks`)
  
  // Inject high-confidence blocks into reasoning context
  const highConfidenceBlocks = consolidatedBlocks.filter(b => b.confidence >= 0.8)
  console.log(`[MARE] Injecting ${highConfidenceBlocks.length} high-confidence knowledge blocks`)
  
  // Convert knowledge blocks to memory entries for processing
  for (const block of highConfidenceBlocks) {
    const syntheticEntry: MemoryEntry = {
      id: block.id,
      scope: 'global',
      key: `knowledge_${block.id}`,
      value: {
        type: 'consolidated_knowledge',
        description: block.summary,
        data: {
          lesson: block.lesson,
          category: block.category,
          importance: block.importance,
          appliesTo: block.appliesTo,
          governanceLinks: block.governanceLinks
        }
      },
      metadata: {
        createdAt: block.timestamp,
        updatedAt: block.lastValidated || block.timestamp,
        createdBy: 'consolidation-engine',
        version: 1
      },
      tags: ['consolidated_knowledge', block.category, block.importance]
    }
    allMemoryEntries.push(syntheticEntry)
  }
  
  // Step 4: Select relevant memories using router
  console.log('[MARE] Step 4: Filtering memory with router')
  const routedMemory = routeMemory(allMemoryEntries, {
    scope: scopesToLoad,
    intent: context.intent,
    phase: context.phase,
    subsystem: context.subsystem,
    riskLevel: context.riskLevel,
    tags: context.tags
  })
  
  console.log(`[MARE] Router selected ${routedMemory.total} relevant entries: ${routedMemory.filteringReason}`)
  
  // Check if memory context is sufficient
  const sufficiencyCheck = isMemoryContextSufficient(
    routedMemory.total,
    context.riskLevel || 'medium'
  )
  
  if (!sufficiencyCheck.sufficient) {
    console.warn(`[MARE] Warning: ${sufficiencyCheck.reason}`)
  }
  
  // Step 5: Parse and structure memory into snapshot
  console.log('[MARE] Step 5: Producing memory snapshot')
  
  const projectMemory = context.projectId
    ? parseProjectMemory(routedMemory.entries, context.projectId)
    : null
  
  const globalMemory = parseGlobalMemory(routedMemory.entries)
  const reasoningPatterns = loadReasoningPatterns(routedMemory.entries)
  const architectureLessons = parseArchitectureLessons(routedMemory.entries)
  const issues = parseHistoricalIssues(routedMemory.entries)
  
  const snapshot: MemorySnapshot = {
    project: projectMemory,
    global: globalMemory,
    reasoningPatterns,
    architectureLessons,
    issues,
    meta: {
      loadedAt: new Date().toISOString(),
      memoryVersion: MEMORY_VERSION,
      scope: scopesToLoad
    }
  }
  
  console.log('[MARE] Memory snapshot loaded successfully')
  console.log(`[MARE] - Reasoning patterns: ${reasoningPatterns.length}`)
  console.log(`[MARE] - Architecture lessons: ${architectureLessons.length}`)
  console.log(`[MARE] - Historical issues: ${issues.length}`)
  console.log(`[MARE] - Consolidated knowledge: ${highConfidenceBlocks.length}`)
  
  // Step 6: Check consolidation triggers
  if (!options.skipConsolidationCheck) {
    const allMemory = await getAllMemory()
    await checkConsolidationTrigger(context, allMemory)
  }
  
  return snapshot
}

/**
 * Execute reasoning based on memory snapshot
 * 
 * @param snapshot - Memory snapshot
 * @param context - Reasoning context
 * @returns Reasoning result
 */
export async function executeReasoning(
  snapshot: MemorySnapshot,
  context: ReasoningContext
): Promise<ReasoningResult> {
  console.log('[MARE] Executing reasoning...')
  
  const patternsApplied: string[] = []
  const decisions: ReasoningDecision[] = []
  const risks: string[] = []
  const recommendedActions: string[] = []
  const memoryReferences: string[] = []
  
  // Find and apply applicable reasoning patterns
  const applicablePatterns = findApplicablePatterns(snapshot.reasoningPatterns, {
    tags: context.tags,
    phase: context.phase,
    subsystem: context.subsystem,
    riskLevel: context.riskLevel
  })
  
  console.log(`[MARE] Found ${applicablePatterns.length} applicable reasoning patterns`)
  
  // Apply each pattern and collect guidance
  let overallConfidence = 0
  applicablePatterns.forEach(pattern => {
    const result = applyPattern(pattern, context)
    patternsApplied.push(pattern.id)
    
    // Track confidence
    const confidenceValue = result.confidence === 'high' ? 0.9 : 
                           result.confidence === 'medium' ? 0.6 : 0.3
    overallConfidence += confidenceValue
    
    console.log(`[MARE] Applied pattern: ${pattern.name} (confidence: ${result.confidence})`)
  })
  
  // Calculate average confidence
  const confidenceScore = applicablePatterns.length > 0
    ? overallConfidence / applicablePatterns.length
    : 0.5
  
  // Analyze risks from memory
  analyzeRisksFromMemory(snapshot, risks, memoryReferences)
  
  // Generate decisions based on patterns and memory
  generateDecisions(snapshot, context, applicablePatterns, decisions, memoryReferences)
  
  // Generate recommended actions
  generateRecommendedActions(snapshot, context, decisions, recommendedActions)
  
  // Build reasoning summary
  const reasoningSummary = buildReasoningSummary(
    snapshot,
    context,
    applicablePatterns,
    decisions,
    risks
  )
  
  const result: ReasoningResult = {
    reasoningSummary,
    memoryReferences,
    decisions,
    risks,
    recommendedActions,
    meta: {
      executedAt: new Date().toISOString(),
      patternsApplied,
      confidenceScore
    }
  }
  
  console.log('[MARE] Reasoning complete')
  console.log(`[MARE] - Confidence: ${(confidenceScore * 100).toFixed(0)}%`)
  console.log(`[MARE] - Decisions: ${decisions.length}`)
  console.log(`[MARE] - Risks identified: ${risks.length}`)
  console.log(`[MARE] - Actions recommended: ${recommendedActions.length}`)
  
  return result
}

/**
 * Parse project memory from entries
 */
function parseProjectMemory(entries: MemoryEntry[], projectId: string): ProjectMemory {
  const projectEntries = entries.filter(e => e.scope === 'project')
  
  const milestones: MilestoneMemory[] = []
  const deployments: DeploymentMemory[] = []
  const blockers: BlockerMemory[] = []
  const decisions: DecisionMemory[] = []
  let phase: ProjectMemory['phase'] = 'concept'
  
  projectEntries.forEach(entry => {
    if (entry.tags?.includes('milestone_completion') || entry.tags?.includes('milestone')) {
      if (entry.value.data?.milestone) {
        milestones.push({
          id: entry.id,
          name: entry.value.data.milestone,
          status: 'completed',
          completedAt: entry.value.data.completedAt || entry.metadata.createdAt
        })
      }
    }
    
    if (entry.tags?.includes('deployment')) {
      if (entry.value.data?.environment) {
        deployments.push({
          environment: entry.value.data.environment,
          timestamp: entry.metadata.createdAt,
          version: entry.value.data.version,
          success: !entry.tags?.includes('deployment_failure'),
          issues: entry.value.data.issues
        })
      }
    }
    
    if (entry.tags?.includes('blocker')) {
      blockers.push({
        id: entry.id,
        description: entry.value.description || '',
        severity: entry.value.data?.severity || 'medium',
        status: entry.value.data?.status || 'open',
        category: entry.value.data?.category
      })
    }
    
    if (entry.tags?.includes('architecture_decision') || entry.tags?.includes('decision')) {
      decisions.push({
        id: entry.id,
        description: entry.value.description || '',
        rationale: entry.value.data?.rationale || '',
        timestamp: entry.metadata.createdAt,
        createdBy: entry.metadata.createdBy
      })
    }
    
    if (entry.tags?.includes('project_state_transition') && entry.value.data?.phase) {
      phase = entry.value.data.phase
    }
  })
  
  return {
    projectId,
    phase,
    milestones,
    deployments,
    blockers,
    decisions
  }
}

/**
 * Parse global memory from entries
 */
function parseGlobalMemory(entries: MemoryEntry[]): GlobalMemory {
  const globalEntries = entries.filter(e => e.scope === 'global')
  
  const architectureDecisions: ArchitectureLesson[] = []
  const governanceRules: GovernanceMemory[] = []
  const systemPatterns: string[] = []
  
  globalEntries.forEach(entry => {
    if (entry.tags?.includes('architecture_decision')) {
      architectureDecisions.push({
        id: entry.id,
        pattern: entry.value.data?.pattern || '',
        description: entry.value.description || '',
        rationale: entry.value.data?.rationale || '',
        benefits: entry.value.data?.benefits || [],
        tradeoffs: entry.value.data?.tradeoffs || [],
        applicability: entry.value.data?.applicability || [],
        timestamp: entry.metadata.createdAt,
        source: entry.metadata.createdBy
      })
    }
    
    if (entry.tags?.includes('governance') || entry.tags?.includes('governance_change')) {
      governanceRules.push({
        id: entry.id,
        rule: entry.value.data?.rule || entry.key,
        description: entry.value.description || '',
        enforcement: entry.value.data?.enforcement || 'advisory'
      })
    }
    
    if (entry.tags?.includes('pattern') && entry.value.data?.pattern) {
      systemPatterns.push(entry.value.data.pattern)
    }
  })
  
  return {
    architectureDecisions,
    governanceRules,
    systemPatterns
  }
}

/**
 * Parse architecture lessons from entries
 */
function parseArchitectureLessons(entries: MemoryEntry[]): ArchitectureLesson[] {
  const lessons: ArchitectureLesson[] = []
  
  entries.forEach(entry => {
    if (entry.tags?.includes('architecture_decision') || entry.tags?.includes('architecture')) {
      lessons.push({
        id: entry.id,
        pattern: entry.value.data?.pattern || '',
        description: entry.value.description || '',
        rationale: entry.value.data?.rationale || '',
        benefits: entry.value.data?.benefits || [],
        tradeoffs: entry.value.data?.tradeoffs || [],
        applicability: entry.value.data?.applicability || [],
        timestamp: entry.metadata.createdAt,
        source: entry.metadata.createdBy
      })
    }
  })
  
  return lessons
}

/**
 * Parse historical issues from entries
 */
function parseHistoricalIssues(entries: MemoryEntry[]): HistoricalIssue[] {
  const issues: HistoricalIssue[] = []
  
  entries.forEach(entry => {
    if (entry.tags?.includes('qa_failure') || 
        entry.tags?.includes('deployment_failure') || 
        entry.tags?.includes('error_escalation')) {
      issues.push({
        id: entry.id,
        type: entry.value.type || 'unknown',
        description: entry.value.description || '',
        resolution: entry.value.data?.resolution || 'unknown',
        timestamp: entry.metadata.createdAt,
        scope: entry.scope,
        tags: entry.tags || []
      })
    }
  })
  
  return issues
}

/**
 * Analyze risks from memory
 */
function analyzeRisksFromMemory(
  snapshot: MemorySnapshot,
  risks: string[],
  memoryReferences: string[]
): void {
  // Check for recent failures
  const recentFailures = snapshot.issues.filter(issue => {
    const issueTime = new Date(issue.timestamp).getTime()
    const dayAgo = Date.now() - (24 * 60 * 60 * 1000)
    return issueTime > dayAgo
  })
  
  if (recentFailures.length > 0) {
    risks.push(`Recent failures detected: ${recentFailures.length} issues in last 24 hours`)
    recentFailures.forEach(f => memoryReferences.push(f.id))
  }
  
  // Check for active blockers
  if (snapshot.project?.blockers) {
    const activeBlockers = snapshot.project.blockers.filter(b => b.status === 'open')
    if (activeBlockers.length > 0) {
      risks.push(`Active blockers: ${activeBlockers.length} open blockers`)
    }
  }
  
  // Check for governance violations
  const governanceIssues = snapshot.global.governanceRules.filter(
    rule => rule.enforcement === 'strict'
  )
  if (governanceIssues.length > 0) {
    risks.push(`Strict governance rules active: ${governanceIssues.length} rules require compliance`)
  }
}

/**
 * Generate decisions based on patterns and memory
 */
function generateDecisions(
  snapshot: MemorySnapshot,
  context: ReasoningContext,
  patterns: ReasoningPattern[],
  decisions: ReasoningDecision[],
  memoryReferences: string[]
): void {
  // Apply Memory Before Action pattern
  const memoryBeforeAction = patterns.find(p => p.id === 'pattern_memory_before_action')
  if (memoryBeforeAction) {
    decisions.push({
      action: 'Load memory context before proceeding',
      rationale: memoryBeforeAction.approach,
      confidence: 'high',
      memorySupport: [memoryBeforeAction.id],
      governanceAlignment: true
    })
  }
  
  // Check governance alignment
  const governancePattern = patterns.find(p => p.id === 'pattern_governance_alignment')
  if (governancePattern && snapshot.global.governanceRules.length > 0) {
    decisions.push({
      action: 'Validate against governance rules',
      rationale: 'Strict governance rules are active',
      confidence: 'high',
      memorySupport: snapshot.global.governanceRules.map(r => r.id),
      governanceAlignment: true
    })
    snapshot.global.governanceRules.forEach(r => memoryReferences.push(r.id))
  }
  
  // Check for past similar situations
  if (snapshot.issues.length > 0) {
    const relevantIssues = snapshot.issues.filter(issue => 
      context.tags?.some(tag => issue.tags.includes(tag))
    )
    
    if (relevantIssues.length > 0) {
      decisions.push({
        action: 'Review past similar issues before proceeding',
        rationale: `${relevantIssues.length} similar issues found in memory`,
        confidence: 'medium',
        memorySupport: relevantIssues.map(i => i.id),
        governanceAlignment: true
      })
      relevantIssues.forEach(i => memoryReferences.push(i.id))
    }
  }
}

/**
 * Generate recommended actions
 */
function generateRecommendedActions(
  snapshot: MemorySnapshot,
  context: ReasoningContext,
  decisions: ReasoningDecision[],
  actions: string[]
): void {
  // Base recommendations on decisions
  decisions.forEach(decision => {
    actions.push(decision.action)
  })
  
  // Add context-specific recommendations
  if (context.phase === 'build' && snapshot.issues.length > 0) {
    actions.push('Run QA validation before deployment')
  }
  
  if (context.riskLevel === 'critical' || context.riskLevel === 'high') {
    actions.push('Request human review before proceeding')
  }
  
  if (snapshot.project?.blockers?.some(b => b.severity === 'critical')) {
    actions.push('Resolve critical blockers before continuing')
  }
}

/**
 * Build reasoning summary
 */
function buildReasoningSummary(
  snapshot: MemorySnapshot,
  context: ReasoningContext,
  patterns: ReasoningPattern[],
  decisions: ReasoningDecision[],
  risks: string[]
): string {
  const parts: string[] = []
  
  parts.push(`Memory-Aware Reasoning Analysis`)
  parts.push(`Context: ${context.subsystem || 'general'} / ${context.phase || 'planning'}`)
  parts.push(``)
  parts.push(`Memory Loaded:`)
  parts.push(`- Reasoning Patterns: ${snapshot.reasoningPatterns.length}`)
  parts.push(`- Architecture Lessons: ${snapshot.architectureLessons.length}`)
  parts.push(`- Historical Issues: ${snapshot.issues.length}`)
  
  if (snapshot.project) {
    parts.push(`- Project Phase: ${snapshot.project.phase}`)
    parts.push(`- Active Blockers: ${snapshot.project.blockers.filter(b => b.status === 'open').length}`)
  }
  
  parts.push(``)
  parts.push(`Patterns Applied: ${patterns.map(p => p.name).join(', ')}`)
  parts.push(``)
  parts.push(`Decisions Made: ${decisions.length}`)
  
  if (risks.length > 0) {
    parts.push(``)
    parts.push(`Risks Identified: ${risks.length}`)
    risks.forEach(risk => parts.push(`- ${risk}`))
  }
  
  return parts.join('\n')
}

/**
 * Convenience function: Load memory and execute reasoning in one call
 * 
 * @param context - Reasoning context
 * @param options - Options for reasoning (skipDriftCheck, skipConsolidationCheck)
 * @returns Reasoning result
 */
/**
 * GSR governance message for QA/build/deployment phases
 */
const GSR_GOVERNANCE_MESSAGE = 
  'GOVERNANCE SUPREMACY RULE: 100% QA passing is required before any build handover or PR merge. ' +
  'No exceptions for pre-existing, unrelated, minor, historical, or out-of-scope failures.'

export async function reason(
  context: ReasoningContext,
  options: { skipDriftCheck?: boolean, skipConsolidationCheck?: boolean } = {}
): Promise<ReasoningResult> {
  if (process.env.NODE_ENV === 'development') {
    console.log('[MARE] Starting reasoning process...')
    console.log('[MARE] Context:', {
      intent: context.intent,
      phase: context.phase,
      subsystem: context.subsystem,
      projectId: context.projectId
    })
  }
  
  // GSR-5: Governance check at intent interpretation phase
  if (process.env.NODE_ENV === 'development') {
    console.log('[MARE] GSR-5: Validating governance at intent interpretation...')
  }
  const intentGovernanceCheck = validateGovernanceAtPhase('intent', {
    userRequest: context.intent
  })
  
  if (!intentGovernanceCheck.allowed) {
    console.error('[MARE] Governance violation at intent phase:', intentGovernanceCheck.reason)
    throw new Error(`Governance override: ${intentGovernanceCheck.reason}`)
  }
  
  // Step 1: Load memory snapshot with drift monitoring and consolidation checks
  const snapshot = await loadMemorySnapshot(context, options)
  
  // GSR-5: Governance check at planning phase
  if (process.env.NODE_ENV === 'development') {
    console.log('[MARE] GSR-5: Validating governance at planning phase...')
  }
  const planningGovernanceCheck = validateGovernanceAtPhase('planning', {
    userRequest: context.intent
  })
  
  if (!planningGovernanceCheck.allowed) {
    console.error('[MARE] Governance violation at planning phase:', planningGovernanceCheck.reason)
    throw new Error(`Governance override: ${planningGovernanceCheck.reason}`)
  }
  
  // Step 2: Execute reasoning based on memory
  const result = await executeReasoning(snapshot, context)
  
  // GSR-5: Add governance supremacy note to reasoning
  if (context.phase === 'qa' || context.phase === 'build' || context.phase === 'deployment') {
    result.recommendedActions.unshift(GSR_GOVERNANCE_MESSAGE)
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[MARE] Reasoning process complete')
  }
  
  return result
}

/**
 * Export drift monitoring for direct use
 */
export { runDriftMonitoring, createMemorySnapshot } from '@/lib/foreman/memory'

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
      console.error(`[MARE] Error loading consolidated knowledge from ${file}:`, error)
    }
  }
  
  return blocks
}

/**
 * Check if consolidation should be triggered
 */
async function checkConsolidationTrigger(
  context: ReasoningContext,
  allMemory: {
    global: MemoryEntry[]
    foreman: MemoryEntry[]
    projects: Record<string, MemoryEntry[]>
  }
): Promise<void> {
  // Check entry count trigger
  const totalEntries = 
    allMemory.global.length +
    allMemory.foreman.length +
    Object.values(allMemory.projects).flat().length
  
  if (totalEntries >= CONSOLIDATION_THRESHOLD) {
    console.log(`[MARE] Consolidation threshold reached (${totalEntries} entries, threshold: ${CONSOLIDATION_THRESHOLD})`)
    
    // Trigger consolidation
    try {
      const result = await runConsolidation()
      console.log(`[MARE] Consolidation complete: ${result.blocksGenerated} blocks generated`)
    } catch (error) {
      console.error('[MARE] Consolidation failed:', error)
    }
  }
}
