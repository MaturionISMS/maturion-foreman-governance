/**
 * Knowledge Consolidation Engine
 * Automated Knowledge Consolidation Layer for Unified Memory Fabric
 * 
 * Transforms raw memory entries into long-term, stable, high-signal evergreen knowledge.
 * Prevents memory bloat, repetition, contradictions, and reasoning degradation.
 */

import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import {
  KnowledgeBlock,
  KnowledgeCategory,
  KnowledgeImportance,
  SignificanceScore,
  PatternDetectionResult,
  DuplicateCollapseResult,
  ConsolidationResult,
  ConsolidationConfig,
  ConsolidationTrigger,
  ArchivedEntryReference
} from '@/types/consolidation'
import { MemoryEntry, MemoryScope } from '@/types/memory'
import { getAllMemory } from './storage'

/**
 * Default consolidation configuration
 */
const DEFAULT_CONFIG: ConsolidationConfig = {
  minConfidence: 0.3, // Lowered from 0.7 to 0.3 to allow more blocks
  minOccurrences: 3,
  significanceThreshold: 60,
  maxAgeForArchival: 180, // 6 months
  enableArchival: true,
  enableDuplicateCollapse: true,
  scopes: ['global', 'foreman', 'project']
}

/**
 * Knowledge block counter for ID generation
 */
let knowledgeBlockCounter = 0

/**
 * Schema validator
 */
let schemaValidator: any = null

/**
 * Get or create schema validator
 */
function getSchemaValidator(): any {
  if (!schemaValidator) {
    const schemaPath = path.join(process.cwd(), 'memory', 'schemas', 'knowledge-block.json')
    
    if (fs.existsSync(schemaPath)) {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'))
      const ajv = new Ajv({ allErrors: true })
      addFormats(ajv)
      schemaValidator = ajv.compile(schema)
    }
  }
  
  return schemaValidator
}

/**
 * Generate unique knowledge block ID
 */
function generateKnowledgeBlockId(): string {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  knowledgeBlockCounter++
  const counter = String(knowledgeBlockCounter).padStart(3, '0')
  return `kb_${dateStr}_${counter}`
}

/**
 * Get consolidated knowledge storage path
 */
function getConsolidatedPath(category: string): string {
  const basePath = path.join(process.cwd(), 'memory', 'global', 'consolidated')
  
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true })
  }
  
  return path.join(basePath, `${category}.json`)
}

/**
 * Load existing knowledge blocks for a category
 */
function loadKnowledgeBlocks(category: string): KnowledgeBlock[] {
  const filePath = getConsolidatedPath(category)
  
  if (!fs.existsSync(filePath)) {
    return []
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    if (!content.trim()) {
      return []
    }
    
    const data = JSON.parse(content)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`[Consolidation] Error loading knowledge blocks from ${filePath}:`, error)
    return []
  }
}

/**
 * Save knowledge blocks for a category
 */
function saveKnowledgeBlocks(category: string, blocks: KnowledgeBlock[]): void {
  const filePath = getConsolidatedPath(category)
  
  try {
    const content = JSON.stringify(blocks, null, 2)
    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`[Consolidation] Saved ${blocks.length} knowledge blocks to ${category}.json`)
  } catch (error) {
    console.error(`[Consolidation] Error saving knowledge blocks to ${filePath}:`, error)
    throw error
  }
}

/**
 * Score entry significance
 * 
 * Evaluates memory entries based on:
 * - Frequency of pattern
 * - Severity of related issues
 * - Number of projects affected
 * - Relevance to architecture/governance
 * - Recurrence across build waves
 * - Drift risk
 */
export function scoreEntrySignificance(
  entry: MemoryEntry,
  allEntries: MemoryEntry[]
): SignificanceScore {
  const factors = {
    frequency: 0,
    severity: 0,
    projectCount: 0,
    governanceRelevance: 0,
    recurrence: 0,
    driftRisk: 0
  }
  
  // Frequency: How often similar patterns appear
  const similarEntries = allEntries.filter(e => 
    e.tags?.some(tag => entry.tags?.includes(tag))
  )
  factors.frequency = Math.min(similarEntries.length * 5, 30)
  
  // Severity: Based on tags indicating critical issues - INCREASED WEIGHT
  const severityTags = ['critical', 'error_escalation', 'deployment_failure', 'blocker']
  const hasSeverity = entry.tags?.some(tag => severityTags.includes(tag))
  factors.severity = hasSeverity ? 35 : 10 // Increased from 25 to 35
  
  // Project count: How many projects are affected
  const projectEntries = allEntries.filter(e => 
    e.scope === 'project' && e.tags?.some(tag => entry.tags?.includes(tag))
  )
  const uniqueProjects = new Set(projectEntries.map(e => e.key.split('_')[0]))
  factors.projectCount = Math.min(uniqueProjects.size * 10, 20)
  
  // Governance relevance
  const governanceTags = ['governance', 'architecture_decision', 'architecture']
  const hasGovernance = entry.tags?.some(tag => governanceTags.includes(tag))
  factors.governanceRelevance = hasGovernance ? 15 : 0
  
  // Recurrence: Time-based pattern detection
  const daysSinceCreation = (Date.now() - new Date(entry.metadata.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  const recentSimilar = similarEntries.filter(e => {
    const days = (Date.now() - new Date(e.metadata.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    return days < 30
  })
  factors.recurrence = recentSimilar.length > 1 ? 10 : 0
  
  // Drift risk: Version count and contradictions
  const highVersion = entry.metadata.version > 3
  factors.driftRisk = highVersion ? 5 : 0
  
  // Calculate total score
  const score = Object.values(factors).reduce((sum, val) => sum + val, 0)
  
  // Classify - ADJUSTED THRESHOLDS
  let classification: 'high' | 'medium' | 'low'
  let recommendation: 'consolidate' | 'keep' | 'archive' | 'delete'
  
  if (score >= 60) { // Lowered from 70 to 60
    classification = 'high'
    recommendation = 'consolidate'
  } else if (score >= 35) { // Lowered from 40 to 35
    classification = 'medium'
    recommendation = 'keep'
  } else {
    classification = 'low'
    recommendation = daysSinceCreation > 180 ? 'archive' : 'keep'
  }
  
  return {
    entryId: entry.id,
    score,
    factors,
    classification,
    recommendation
  }
}

/**
 * Detect patterns in memory entries
 * 
 * Identifies recurring patterns and lessons from raw memory
 */
export function detectPatterns(entries: MemoryEntry[]): PatternDetectionResult[] {
  const patterns: PatternDetectionResult[] = []
  
  // Group entries by tags
  const tagGroups: Map<string, MemoryEntry[]> = new Map()
  
  for (const entry of entries) {
    if (!entry.tags) continue
    
    for (const tag of entry.tags) {
      if (!tagGroups.has(tag)) {
        tagGroups.set(tag, [])
      }
      tagGroups.get(tag)!.push(entry)
    }
  }
  
  // Analyze each tag group
  for (const [tag, groupEntries] of tagGroups) {
    if (groupEntries.length < DEFAULT_CONFIG.minOccurrences) continue
    
    // Extract common patterns
    const descriptions = groupEntries
      .map(e => e.value.description || '')
      .filter(d => d.length > 0)
    
    if (descriptions.length === 0) continue
    
    // Determine category based on tag
    let category: KnowledgeCategory = 'architecture_principle'
    if (tag.includes('qa')) category = 'qa_pattern'
    else if (tag.includes('deployment')) category = 'deployment_lesson'
    else if (tag.includes('governance')) category = 'governance_behaviour'
    else if (tag.includes('build')) category = 'build_pattern'
    else if (tag.includes('error')) category = 'error_resolution'
    
    // Calculate confidence based on consistency
    const confidence = Math.min(groupEntries.length / 10, 1)
    
    patterns.push({
      pattern: tag,
      description: `Pattern detected in ${tag} entries`,
      occurrences: groupEntries.length,
      entries: groupEntries.map(e => e.id),
      confidence,
      category
    })
  }
  
  return patterns
}

/**
 * Collapse duplicate entries
 * 
 * Identifies and collapses near-duplicate memory entries
 */
export function collapseDuplicates(entries: MemoryEntry[]): DuplicateCollapseResult[] {
  const results: DuplicateCollapseResult[] = []
  const processed = new Set<string>()
  
  for (let i = 0; i < entries.length; i++) {
    if (processed.has(entries[i].id)) continue
    
    const duplicates: MemoryEntry[] = []
    
    for (let j = i + 1; j < entries.length; j++) {
      if (processed.has(entries[j].id)) continue
      
      // Check if entries are duplicates
      const isDuplicate = 
        entries[i].key === entries[j].key ||
        (entries[i].tags?.join(',') === entries[j].tags?.join(',') &&
         entries[i].value.description === entries[j].value.description)
      
      if (isDuplicate) {
        duplicates.push(entries[j])
        processed.add(entries[j].id)
      }
    }
    
    if (duplicates.length > 0) {
      results.push({
        keptEntry: entries[i].id,
        collapsedEntries: duplicates.map(d => d.id),
        reason: 'Duplicate or near-duplicate entries detected'
      })
    }
    
    processed.add(entries[i].id)
  }
  
  return results
}

/**
 * Link knowledge to governance documents
 */
export function linkKnowledgeToGovernance(
  knowledgeBlock: KnowledgeBlock,
  governancePath: string = path.join(process.cwd(), 'foreman', 'governance')
): string[] {
  const links: string[] = []
  
  if (!fs.existsSync(governancePath)) {
    return links
  }
  
  // Map categories to governance documents
  const categoryMappings: Record<string, string[]> = {
    architecture_principle: ['architecture-naming-conventions.md', 'autonomy-rules.md'],
    governance_behaviour: ['governance-model.md', 'memory-rules.md'],
    qa_pattern: ['autonomy-rules.md'],
    deployment_lesson: ['autonomy-rules.md'],
    build_pattern: ['autonomy-rules.md'],
    error_resolution: ['autonomy-rules.md'],
    performance_insight: ['autonomy-rules.md']
  }
  
  const possibleFiles = categoryMappings[knowledgeBlock.category] || []
  
  for (const file of possibleFiles) {
    const filePath = path.join(governancePath, file)
    if (fs.existsSync(filePath)) {
      links.push(file)
    }
  }
  
  return links
}

/**
 * Link knowledge to projects
 */
export function linkKnowledgeToProjects(
  knowledgeBlock: KnowledgeBlock,
  allEntries: MemoryEntry[]
): string[] {
  const projects = new Set<string>()
  
  // Find all projects mentioned in origin entries
  for (const entryId of knowledgeBlock.originEntries) {
    const entry = allEntries.find(e => e.id === entryId)
    if (!entry) continue
    
    if (entry.scope === 'project') {
      // Extract project ID from key
      const projectId = entry.key.split('_')[0]
      if (projectId) {
        projects.add(projectId)
      }
    }
  }
  
  // If no projects found, assume global applicability
  if (projects.size === 0) {
    return ['GlobalUI', 'Builder', 'PartPulse']
  }
  
  return Array.from(projects)
}

/**
 * Generate knowledge blocks from patterns
 */
export function generateKnowledgeBlocks(
  patterns: PatternDetectionResult[],
  allEntries: MemoryEntry[],
  config: ConsolidationConfig = DEFAULT_CONFIG
): KnowledgeBlock[] {
  const blocks: KnowledgeBlock[] = []
  
  for (const pattern of patterns) {
    if (pattern.confidence < config.minConfidence) continue
    if (pattern.occurrences < config.minOccurrences) continue
    
    // Get source entries
    const sourceEntries = allEntries.filter(e => pattern.entries.includes(e.id))
    
    // Generate summary and lesson
    const summary = generateSummary(pattern, sourceEntries)
    const lesson = generateLesson(pattern, sourceEntries)
    
    // Determine importance
    const importance = determineImportance(pattern, sourceEntries)
    
    // Create knowledge block
    const block: KnowledgeBlock = {
      id: generateKnowledgeBlockId(),
      category: pattern.category,
      summary,
      lesson,
      appliesTo: [],
      originEntries: pattern.entries,
      governanceLinks: [],
      confidence: pattern.confidence,
      importance,
      timestamp: new Date().toISOString(),
      metadata: {
        consolidatedFrom: pattern.entries.length,
        firstSeen: sourceEntries.reduce((earliest, e) => {
          const created = new Date(e.metadata.createdAt)
          return created < new Date(earliest) ? e.metadata.createdAt : earliest
        }, sourceEntries[0].metadata.createdAt),
        validationCount: 0
      }
    }
    
    // Link to projects
    block.appliesTo = linkKnowledgeToProjects(block, allEntries)
    
    // Link to governance
    block.governanceLinks = linkKnowledgeToGovernance(block)
    
    // Validate against schema
    const validator = getSchemaValidator()
    if (validator && !validator(block)) {
      console.warn(`[Consolidation] Knowledge block failed schema validation:`, validator.errors)
      continue
    }
    
    blocks.push(block)
  }
  
  return blocks
}

/**
 * Generate summary from pattern
 */
function generateSummary(pattern: PatternDetectionResult, entries: MemoryEntry[]): string {
  const descriptions = entries
    .map(e => e.value.description)
    .filter(d => d && d.length > 0)
  
  if (descriptions.length === 0) {
    return `Pattern observed in ${pattern.pattern} (${pattern.occurrences} occurrences)`
  }
  
  // Use first description as base, ensure it's under 500 chars
  const base = descriptions[0].substring(0, 480)
  return `${base} (observed ${pattern.occurrences} times)`
}

/**
 * Generate lesson from pattern
 */
function generateLesson(pattern: PatternDetectionResult, entries: MemoryEntry[]): string {
  // Extract lessons based on category
  if (pattern.category === 'architecture_principle') {
    return `Architecture pattern '${pattern.pattern}' should be consistently applied across projects to maintain system coherence.`
  } else if (pattern.category === 'qa_pattern') {
    return `QA pattern '${pattern.pattern}' has been observed ${pattern.occurrences} times. Ensure testing procedures account for this recurring scenario.`
  } else if (pattern.category === 'deployment_lesson') {
    return `Deployment pattern '${pattern.pattern}' requires attention. This pattern has occurred ${pattern.occurrences} times and should be incorporated into deployment procedures.`
  } else if (pattern.category === 'error_resolution') {
    return `Error pattern '${pattern.pattern}' has been resolved ${pattern.occurrences} times. Document the resolution approach for future reference.`
  }
  
  return `Pattern '${pattern.pattern}' observed across ${pattern.occurrences} instances. Review and incorporate into operational procedures.`
}

/**
 * Determine importance level
 */
function determineImportance(
  pattern: PatternDetectionResult,
  entries: MemoryEntry[]
): KnowledgeImportance {
  // Check for critical tags
  const criticalTags = ['critical', 'blocker', 'deployment_failure']
  const hasCritical = entries.some(e => 
    e.tags?.some(tag => criticalTags.includes(tag))
  )
  
  if (hasCritical) return 'critical'
  
  // High importance if many occurrences or governance related
  if (pattern.occurrences >= 10 || pattern.category === 'governance_behaviour') {
    return 'high'
  }
  
  // Medium for moderate patterns
  if (pattern.occurrences >= 5) {
    return 'medium'
  }
  
  return 'low'
}

/**
 * Archive low-value entries
 */
export function archiveLowValueEntries(
  entries: MemoryEntry[],
  scores: SignificanceScore[],
  config: ConsolidationConfig = DEFAULT_CONFIG
): ArchivedEntryReference[] {
  if (!config.enableArchival) return []
  
  const archived: ArchivedEntryReference[] = []
  const now = Date.now()
  
  for (const score of scores) {
    if (score.recommendation !== 'archive') continue
    
    const entry = entries.find(e => e.id === score.entryId)
    if (!entry) continue
    
    // Check age
    const age = now - new Date(entry.metadata.createdAt).getTime()
    const ageDays = age / (1000 * 60 * 60 * 24)
    
    if (ageDays < config.maxAgeForArchival) continue
    
    // Create archive reference
    archived.push({
      originalId: entry.id,
      archivedAt: new Date().toISOString(),
      reason: `Low significance score (${score.score}) and age (${Math.floor(ageDays)} days)`,
      retentionUntil: new Date(now + 365 * 24 * 60 * 60 * 1000).toISOString() // Keep for 1 year
    })
  }
  
  return archived
}

/**
 * Run consolidation
 * 
 * Main consolidation process:
 * 1. Load all memory entries
 * 2. Detect patterns
 * 3. Collapse duplicates
 * 4. Score significance
 * 5. Generate knowledge blocks
 * 6. Archive low-value entries
 * 7. Save consolidated knowledge
 */
export async function runConsolidation(
  config: ConsolidationConfig = DEFAULT_CONFIG,
  trigger?: ConsolidationTrigger
): Promise<ConsolidationResult> {
  console.log('[Consolidation] Starting knowledge consolidation...')
  
  if (trigger) {
    console.log(`[Consolidation] Trigger: ${trigger.type}`)
  }
  
  // Step 1: Load all memory
  const allMemory = await getAllMemory()
  const allEntries: MemoryEntry[] = []
  
  if (config.scopes.includes('global')) {
    allEntries.push(...allMemory.global)
  }
  if (config.scopes.includes('foreman')) {
    allEntries.push(...allMemory.foreman)
  }
  if (config.scopes.includes('project')) {
    for (const projectEntries of Object.values(allMemory.projects)) {
      allEntries.push(...projectEntries)
    }
  }
  
  console.log(`[Consolidation] Loaded ${allEntries.length} memory entries`)
  
  // Step 2: Detect patterns
  console.log('[Consolidation] Detecting patterns...')
  const patterns = detectPatterns(allEntries)
  console.log(`[Consolidation] Detected ${patterns.length} patterns`)
  
  // Step 3: Collapse duplicates
  console.log('[Consolidation] Collapsing duplicates...')
  const duplicates = config.enableDuplicateCollapse ? collapseDuplicates(allEntries) : []
  console.log(`[Consolidation] Collapsed ${duplicates.length} duplicate groups`)
  
  // Step 4: Score significance
  console.log('[Consolidation] Scoring entry significance...')
  const scores = allEntries.map(entry => scoreEntrySignificance(entry, allEntries))
  const highSignificance = scores.filter(s => s.classification === 'high').length
  console.log(`[Consolidation] Found ${highSignificance} high-significance entries`)
  
  // Step 5: Generate knowledge blocks
  console.log('[Consolidation] Generating knowledge blocks...')
  const newBlocks = generateKnowledgeBlocks(patterns, allEntries, config)
  console.log(`[Consolidation] Generated ${newBlocks.length} new knowledge blocks`)
  
  // Step 6: Save knowledge blocks by category
  const blocksByCategory: Map<string, KnowledgeBlock[]> = new Map()
  
  for (const block of newBlocks) {
    const categoryKey = block.category.replace(/_/g, '-')
    const existing = loadKnowledgeBlocks(categoryKey)
    
    // Check if block already exists
    const isDuplicate = existing.some(eb => 
      eb.summary === block.summary || 
      (eb.originEntries.length > 0 && block.originEntries.length > 0 &&
       eb.originEntries.some(id => block.originEntries.includes(id)))
    )
    
    if (!isDuplicate) {
      existing.push(block)
      saveKnowledgeBlocks(categoryKey, existing)
      
      if (!blocksByCategory.has(categoryKey)) {
        blocksByCategory.set(categoryKey, [])
      }
      blocksByCategory.get(categoryKey)!.push(block)
    }
  }
  
  // Step 7: Archive low-value entries
  console.log('[Consolidation] Archiving low-value entries...')
  const archived = archiveLowValueEntries(allEntries, scores, config)
  console.log(`[Consolidation] Archived ${archived.length} entries`)
  
  // Generate summary
  const summary = generateConsolidationSummary(
    allEntries.length,
    patterns.length,
    newBlocks.length,
    duplicates.length,
    archived.length
  )
  
  const result: ConsolidationResult = {
    blocksGenerated: newBlocks.length,
    entriesArchived: archived.length,
    duplicatesCollapsed: duplicates.length,
    knowledgeBlocks: newBlocks,
    archivedEntries: archived.map(a => a.originalId),
    timestamp: new Date().toISOString(),
    summary
  }
  
  console.log('[Consolidation] Consolidation complete')
  console.log(summary)
  
  return result
}

/**
 * Generate consolidation summary
 */
function generateConsolidationSummary(
  totalEntries: number,
  patternsDetected: number,
  blocksGenerated: number,
  duplicatesCollapsed: number,
  entriesArchived: number
): string {
  const lines: string[] = []
  
  lines.push('Knowledge Consolidation Report')
  lines.push('─'.repeat(50))
  lines.push(`Total Memory Entries: ${totalEntries}`)
  lines.push(`Patterns Detected: ${patternsDetected}`)
  lines.push(`Knowledge Blocks Generated: ${blocksGenerated}`)
  lines.push(`Duplicates Collapsed: ${duplicatesCollapsed}`)
  lines.push(`Entries Archived: ${entriesArchived}`)
  lines.push('─'.repeat(50))
  
  return lines.join('\n')
}

/**
 * Check if consolidation should be triggered
 */
export function shouldTriggerConsolidation(
  trigger: ConsolidationTrigger,
  allMemory: {
    global: MemoryEntry[]
    foreman: MemoryEntry[]
    projects: Record<string, MemoryEntry[]>
  }
): boolean {
  switch (trigger.type) {
    case 'entry_count':
      const totalEntries = 
        allMemory.global.length +
        allMemory.foreman.length +
        Object.values(allMemory.projects).flat().length
      return totalEntries >= (trigger.threshold || 30)
    
    case 'phase_transition':
    case 'wave_completion':
    case 'deployment':
    case 'scheduled':
    case 'manual':
      return true
    
    default:
      return false
  }
}
