/**
 * Builder Memory Injector
 * Compiles and injects relevant memory context into builder tasks
 * 
 * This layer ensures builders receive:
 * - Historical issues
 * - Architecture lessons
 * - Reasoning patterns
 * - Project-specific requirements
 * - Consolidated knowledge blocks
 * - QA insights
 * 
 * Safety requirements:
 * 1. No over-injection - filter to relevant memory only
 * 2. Size limits - max 50KB per request
 * 3. No hallucination - only use actual memory entries
 */

import {
  BuilderMemoryContext,
  BuilderType,
  BuilderRequest
} from '@/types/builder'
import {
  HistoricalIssue,
  ArchitectureLesson,
  ReasoningPattern,
  GovernanceMemory,
  ReasoningContext,
  MemorySnapshot
} from '@/types/reasoning'
import { MemoryEntry } from '@/types/memory'
import { loadMemorySnapshot } from '@/lib/foreman/reasoning/engine'

/**
 * Maximum memory context size in bytes (50KB)
 */
const MAX_CONTEXT_SIZE_BYTES = 50 * 1024

/**
 * Compile memory context for a builder task
 * 
 * @param request - Builder request
 * @param builderType - Type of builder
 * @param projectId - Optional project ID
 * @returns Memory context for the builder
 */
export async function compileBuilderMemoryContext(
  request: BuilderRequest,
  builderType: BuilderType,
  projectId?: string
): Promise<BuilderMemoryContext> {
  console.log('[Memory Injector] Compiling memory context for builder task...')
  console.log(`[Memory Injector] Builder: ${builderType}, Module: ${request.module}`)

  // Build reasoning context for memory loading
  const reasoningContext: ReasoningContext = {
    phase: 'build',
    subsystem: 'build',
    tags: buildTagsForBuilder(builderType, request.module),
    projectId,
    organisationId: request.organisationId
  }

  // Load memory snapshot
  const snapshot = await loadMemorySnapshot(reasoningContext)

  // Filter memory for this specific builder task
  const filtered = filterMemoryForBuilder(snapshot, builderType, request)

  // Compile into builder memory context
  const context: BuilderMemoryContext = {
    historicalIssues: filtered.historicalIssues,
    architectureLessons: filtered.architectureLessons,
    reasoningPatterns: filtered.reasoningPatterns,
    governanceRules: filtered.governanceRules,
    projectRequirements: filtered.projectRequirements,
    qaInsights: filtered.qaInsights,
    memoryReferences: collectMemoryReferences(filtered),
    compiledAt: new Date().toISOString(),
    sizeBytes: 0 // Will be calculated after
  }

  // Calculate size
  const contextJson = JSON.stringify(context)
  context.sizeBytes = Buffer.byteLength(contextJson, 'utf8')

  // Validate size limit
  if (context.sizeBytes > MAX_CONTEXT_SIZE_BYTES) {
    console.warn(`[Memory Injector] Context size (${context.sizeBytes} bytes) exceeds limit (${MAX_CONTEXT_SIZE_BYTES} bytes)`)
    return trimMemoryContext(context)
  }

  console.log(`[Memory Injector] Memory context compiled:`)
  console.log(`  - Historical issues: ${context.historicalIssues.length}`)
  console.log(`  - Architecture lessons: ${context.architectureLessons.length}`)
  console.log(`  - Reasoning patterns: ${context.reasoningPatterns.length}`)
  console.log(`  - Governance rules: ${context.governanceRules.length}`)
  console.log(`  - Size: ${context.sizeBytes} bytes`)

  return context
}

/**
 * Build tags for memory filtering based on builder type and module
 */
function buildTagsForBuilder(builderType: BuilderType, module: string): string[] {
  const tags: string[] = []

  // Builder-specific tags
  switch (builderType) {
    case 'ui':
      tags.push('ui', 'frontend', 'components')
      break
    case 'api':
      tags.push('api', 'backend', 'endpoints')
      break
    case 'schema':
      tags.push('schema', 'database', 'types')
      break
    case 'integration':
      tags.push('integration', 'external-api', 'webhooks')
      break
    case 'qa':
      tags.push('qa', 'testing', 'validation')
      break
  }

  // Module-specific tags
  tags.push(module)

  // Common tags for all builders
  tags.push('architecture_decision', 'governance', 'qa_failure')

  return tags
}

/**
 * Filtered memory result
 */
interface FilteredMemory {
  historicalIssues: HistoricalIssue[]
  architectureLessons: ArchitectureLesson[]
  reasoningPatterns: ReasoningPattern[]
  governanceRules: GovernanceMemory[]
  projectRequirements: string[]
  qaInsights: string[]
}

/**
 * Filter memory snapshot for builder relevance
 */
function filterMemoryForBuilder(
  snapshot: MemorySnapshot,
  builderType: BuilderType,
  request: BuilderRequest
): FilteredMemory {
  // Filter historical issues - only recent and relevant ones
  const historicalIssues = snapshot.issues
    .filter(issue => {
      // Only issues from last 30 days
      const issueTime = new Date(issue.timestamp).getTime()
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
      if (issueTime < thirtyDaysAgo) return false

      // Only issues relevant to this builder type
      const relevantTags = buildTagsForBuilder(builderType, request.module)
      return issue.tags.some(tag => relevantTags.includes(tag))
    })
    .slice(0, 10) // Max 10 issues

  // Filter architecture lessons - only applicable ones
  const architectureLessons = snapshot.architectureLessons
    .filter(lesson => {
      const relevantTags = buildTagsForBuilder(builderType, request.module)
      return lesson.applicability.some(ctx => {
        // Use exact matching on lowercase to avoid false positives
        const ctxLower = ctx.toLowerCase()
        return relevantTags.some(tag => {
          const tagLower = tag.toLowerCase()
          // Check for exact word match or exact tag match
          const wordBoundaryRegex = new RegExp(`\\b${tagLower}\\b`)
          return ctxLower === tagLower || wordBoundaryRegex.test(ctxLower)
        })
      })
    })
    .slice(0, 5) // Max 5 lessons

  // Filter reasoning patterns - only applicable ones
  const reasoningPatterns = snapshot.reasoningPatterns
    .filter(pattern => {
      const relevantTags = buildTagsForBuilder(builderType, request.module)
      return pattern.tags.some(tag => relevantTags.includes(tag))
    })
    .slice(0, 5) // Max 5 patterns

  // Get all strict governance rules
  const governanceRules = snapshot.global.governanceRules
    .filter(rule => rule.enforcement === 'strict')
    .slice(0, 10) // Max 10 rules

  // Extract project requirements
  const projectRequirements: string[] = []
  if (snapshot.project) {
    snapshot.project.decisions.forEach(decision => {
      projectRequirements.push(`${decision.description}: ${decision.rationale}`)
    })
  }

  // Extract QA insights from recent failures
  const qaInsights: string[] = []
  historicalIssues
    .filter(issue => issue.tags.includes('qa_failure'))
    .forEach(issue => {
      qaInsights.push(`${issue.description}: ${issue.resolution}`)
    })

  return {
    historicalIssues,
    architectureLessons,
    reasoningPatterns,
    governanceRules,
    projectRequirements: projectRequirements.slice(0, 5),
    qaInsights: qaInsights.slice(0, 5)
  }
}

/**
 * Collect all memory references from filtered memory
 */
function collectMemoryReferences(filtered: FilteredMemory): string[] {
  const references: string[] = []

  filtered.historicalIssues.forEach(issue => references.push(issue.id))
  filtered.architectureLessons.forEach(lesson => references.push(lesson.id))
  filtered.reasoningPatterns.forEach(pattern => references.push(pattern.id))
  filtered.governanceRules.forEach(rule => references.push(rule.id))

  return references
}

/**
 * Trim memory context to fit within size limit
 * Removes items in order of least importance
 */
function trimMemoryContext(context: BuilderMemoryContext): BuilderMemoryContext {
  console.log('[Memory Injector] Trimming memory context to fit size limit...')

  const trimmed = { ...context }

  // Helper function to estimate item size
  const estimateItemSize = (item: any): number => {
    return Buffer.byteLength(JSON.stringify(item), 'utf8')
  }

  // Helper function to recalculate total size
  const recalculateSize = (): number => {
    return Buffer.byteLength(JSON.stringify(trimmed), 'utf8')
  }

  // Priority order: governance > architecture > patterns > issues > insights
  // Keep governance rules intact (most critical)
  
  // Trim QA insights first
  while (trimmed.sizeBytes > MAX_CONTEXT_SIZE_BYTES && trimmed.qaInsights && trimmed.qaInsights.length > 0) {
    trimmed.qaInsights.pop()
    trimmed.sizeBytes = recalculateSize()
  }

  // Trim project requirements
  while (trimmed.sizeBytes > MAX_CONTEXT_SIZE_BYTES && trimmed.projectRequirements && trimmed.projectRequirements.length > 0) {
    trimmed.projectRequirements.pop()
    trimmed.sizeBytes = recalculateSize()
  }

  // Trim historical issues
  while (trimmed.sizeBytes > MAX_CONTEXT_SIZE_BYTES && trimmed.historicalIssues.length > 0) {
    trimmed.historicalIssues.pop()
    trimmed.sizeBytes = recalculateSize()
  }

  // Trim reasoning patterns
  while (trimmed.sizeBytes > MAX_CONTEXT_SIZE_BYTES && trimmed.reasoningPatterns.length > 0) {
    trimmed.reasoningPatterns.pop()
    trimmed.sizeBytes = recalculateSize()
  }

  // Trim architecture lessons
  while (trimmed.sizeBytes > MAX_CONTEXT_SIZE_BYTES && trimmed.architectureLessons.length > 0) {
    trimmed.architectureLessons.pop()
    trimmed.sizeBytes = recalculateSize()
  }

  // Last resort: trim governance rules (but keep at least 1)
  while (trimmed.sizeBytes > MAX_CONTEXT_SIZE_BYTES && trimmed.governanceRules.length > 1) {
    trimmed.governanceRules.pop()
    trimmed.sizeBytes = recalculateSize()
  }

  console.log(`[Memory Injector] Trimmed context to ${trimmed.sizeBytes} bytes`)
  return trimmed
}

/**
 * Validate memory context
 * Ensures context is valid and safe for builder consumption
 */
export function validateMemoryContext(context: BuilderMemoryContext): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check size limit
  if (context.sizeBytes > MAX_CONTEXT_SIZE_BYTES) {
    errors.push(`Context size (${context.sizeBytes} bytes) exceeds limit (${MAX_CONTEXT_SIZE_BYTES} bytes)`)
  }

  // Check required fields
  if (!context.historicalIssues) {
    errors.push('Missing historicalIssues field')
  }
  if (!context.architectureLessons) {
    errors.push('Missing architectureLessons field')
  }
  if (!context.reasoningPatterns) {
    errors.push('Missing reasoningPatterns field')
  }
  if (!context.governanceRules) {
    errors.push('Missing governanceRules field')
  }
  if (!context.memoryReferences) {
    errors.push('Missing memoryReferences field')
  }
  if (!context.compiledAt) {
    errors.push('Missing compiledAt field')
  }

  // Check timestamp format
  if (context.compiledAt && isNaN(Date.parse(context.compiledAt))) {
    errors.push('Invalid compiledAt timestamp')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Format memory context for builder consumption
 * Creates a human-readable summary for builders
 */
export function formatMemoryForBuilder(context: BuilderMemoryContext): string {
  const lines: string[] = []

  lines.push('# Memory Context for Builder')
  lines.push('')
  lines.push(`Compiled: ${context.compiledAt}`)
  lines.push(`Size: ${context.sizeBytes} bytes`)
  lines.push('')

  if (context.governanceRules.length > 0) {
    lines.push('## Governance Rules (MUST FOLLOW)')
    context.governanceRules.forEach(rule => {
      lines.push(`- **${rule.rule}**: ${rule.description} [${rule.enforcement}]`)
    })
    lines.push('')
  }

  if (context.architectureLessons.length > 0) {
    lines.push('## Architecture Lessons')
    context.architectureLessons.forEach(lesson => {
      lines.push(`- **${lesson.pattern}**: ${lesson.description}`)
      lines.push(`  Rationale: ${lesson.rationale}`)
    })
    lines.push('')
  }

  if (context.reasoningPatterns.length > 0) {
    lines.push('## Reasoning Patterns')
    context.reasoningPatterns.forEach(pattern => {
      lines.push(`- **${pattern.name}**: ${pattern.description}`)
      lines.push(`  Context: ${pattern.context}`)
      lines.push(`  Approach: ${pattern.approach}`)
    })
    lines.push('')
  }

  if (context.historicalIssues.length > 0) {
    lines.push('## Historical Issues (Learn from these)')
    context.historicalIssues.forEach(issue => {
      lines.push(`- **${issue.type}**: ${issue.description}`)
      lines.push(`  Resolution: ${issue.resolution}`)
    })
    lines.push('')
  }

  if (context.projectRequirements && context.projectRequirements.length > 0) {
    lines.push('## Project Requirements')
    context.projectRequirements.forEach(req => {
      lines.push(`- ${req}`)
    })
    lines.push('')
  }

  if (context.qaInsights && context.qaInsights.length > 0) {
    lines.push('## QA Insights')
    context.qaInsights.forEach(insight => {
      lines.push(`- ${insight}`)
    })
    lines.push('')
  }

  lines.push('---')
  lines.push(`Memory references: ${context.memoryReferences.join(', ')}`)

  return lines.join('\n')
}
