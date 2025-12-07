/**
 * Memory Drift Monitor Engine
 * Unified Memory Fabric Stability System
 * 
 * Continuously checks memory for:
 * - Schema violations
 * - Version mismatches
 * - Contradictions
 * - Staleness
 * - Cross-agent divergence
 * - Governance violations
 * 
 * Halts execution when critical drift is detected.
 */

import * as fs from 'fs'
import * as path from 'path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import {
  DriftReport,
  DriftCheckResult,
  DriftIssue,
  DriftType,
  DriftSeverity,
  DriftMonitorConfig,
  ContradictionContext,
  MemoryIntegritySnapshot
} from '@/types/drift'
import {
  MemoryEntry,
  MemoryScope
} from '@/types/memory'
import {
  HistoricalIssue,
  ArchitectureLesson,
  ReasoningPattern,
  ProjectMemory
} from '@/types/reasoning'
import { getAllMemory, flattenMemory } from './index'

/**
 * Default drift monitoring configuration
 */
const DEFAULT_CONFIG: DriftMonitorConfig = {
  enabledChecks: [
    'schema_drift',
    'version_drift',
    'contradiction_drift',
    'staleness_drift',
    'cross_agent_drift',
    'project_drift',
    'pattern_drift',
    'governance_drift',
    'agent_experience_drift'
  ],
  stalenessThresholds: {
    reasoningPatterns: 180, // 6 months
    architectureLessons: 365, // 1 year
    issues: 90, // 3 months
    projectMemory: 30 // 1 month
  },
  blockOnCritical: true,
  blockOnMultipleErrors: true,
  errorThreshold: 3
}

/**
 * Current memory version
 */
const MEMORY_VERSION = '1.0.0'

/**
 * JSON schema validator cache
 */
const schemaValidatorCache = new Map<string, any>()

/**
 * Get or create a validator for a schema
 */
function getSchemaValidator(schemaName: string, schema: any): any {
  const cacheKey = schemaName
  
  if (!schemaValidatorCache.has(cacheKey)) {
    const ajv = new Ajv({ allErrors: true })
    addFormats(ajv)
    const validator = ajv.compile(schema)
    schemaValidatorCache.set(cacheKey, validator)
  }
  
  return schemaValidatorCache.get(cacheKey)
}

/**
 * Load JSON schema from file
 */
function loadSchema(schemaName: string): any {
  const schemaPath = path.join(process.cwd(), 'memory', 'schemas', schemaName)
  
  if (!fs.existsSync(schemaPath)) {
    console.warn(`[Drift Monitor] Schema not found: ${schemaPath}`)
    return null
  }
  
  try {
    const content = fs.readFileSync(schemaPath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`[Drift Monitor] Error loading schema ${schemaName}:`, error)
    return null
  }
}

/**
 * Detect schema drift
 */
export async function detectSchemaDrift(
  entries: MemoryEntry[]
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking schema drift...')
  
  const issues: DriftIssue[] = []
  
  // Load schemas
  const schemas = {
    'historical-issues': loadSchema('historical-issues-schema.json'),
    'knowledge-base': loadSchema('knowledge-base-schema.json'),
    'reasoning-patterns': loadSchema('reasoning-patterns-schema.json'),
    'project-memory': loadSchema('project-memory-schema.json')
  }
  
  // Check historical issues
  const issueEntries = entries.filter(e => 
    e.tags?.includes('qa_failure') || 
    e.tags?.includes('deployment_failure') || 
    e.tags?.includes('error_escalation')
  )
  
  for (const entry of issueEntries) {
    if (schemas['historical-issues']) {
      const validate = getSchemaValidator('historical-issues', schemas['historical-issues'])
      const issueData = extractHistoricalIssue(entry)
      
      if (!validate(issueData)) {
        issues.push({
          type: 'schema_drift',
          severity: 'error',
          description: `Historical issue schema violation in entry ${entry.id}`,
          location: entry.id,
          details: validate.errors,
          recommendation: 'Update entry to match historical-issues-schema.json',
          affectedEntries: [entry.id],
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  // Check architecture lessons
  const lessonEntries = entries.filter(e => 
    e.tags?.includes('architecture_decision') || 
    e.tags?.includes('architecture')
  )
  
  for (const entry of lessonEntries) {
    if (schemas['knowledge-base']) {
      const validate = getSchemaValidator('knowledge-base', schemas['knowledge-base'])
      const lessonData = extractArchitectureLesson(entry)
      
      if (!validate(lessonData)) {
        issues.push({
          type: 'schema_drift',
          severity: 'error',
          description: `Architecture lesson schema violation in entry ${entry.id}`,
          location: entry.id,
          details: validate.errors,
          recommendation: 'Update entry to match knowledge-base-schema.json',
          affectedEntries: [entry.id],
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  // Check reasoning patterns
  const patternEntries = entries.filter(e => 
    e.tags?.includes('reasoning_pattern') || 
    e.tags?.includes('pattern')
  )
  
  for (const entry of patternEntries) {
    if (schemas['reasoning-patterns']) {
      const validate = getSchemaValidator('reasoning-patterns', schemas['reasoning-patterns'])
      const patternData = extractReasoningPattern(entry)
      
      if (!validate(patternData)) {
        issues.push({
          type: 'schema_drift',
          severity: 'warning',
          description: `Reasoning pattern schema violation in entry ${entry.id}`,
          location: entry.id,
          details: validate.errors,
          recommendation: 'Update entry to match reasoning-patterns-schema.json',
          affectedEntries: [entry.id],
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  return {
    category: 'schema_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect version drift
 */
export async function detectVersionDrift(
  entries: MemoryEntry[]
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking version drift...')
  
  const issues: DriftIssue[] = []
  
  // Check for entries with missing or invalid version
  for (const entry of entries) {
    if (!entry.metadata || typeof entry.metadata.version !== 'number') {
      issues.push({
        type: 'version_drift',
        severity: 'warning',
        description: `Entry ${entry.id} has missing or invalid version`,
        location: entry.id,
        details: { metadata: entry.metadata },
        recommendation: 'Regenerate entry with proper versioning',
        affectedEntries: [entry.id],
        timestamp: new Date().toISOString()
      })
    }
    
    // Check for version rollback (version decreased)
    if (entry.metadata && entry.metadata.version < 1) {
      issues.push({
        type: 'version_drift',
        severity: 'error',
        description: `Entry ${entry.id} has invalid version number: ${entry.metadata.version}`,
        location: entry.id,
        details: { version: entry.metadata.version },
        recommendation: 'Fix version number to be >= 1',
        affectedEntries: [entry.id],
        timestamp: new Date().toISOString()
      })
    }
  }
  
  return {
    category: 'version_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect contradiction drift
 */
export async function detectContradictionDrift(
  entries: MemoryEntry[]
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking contradiction drift...')
  
  const issues: DriftIssue[] = []
  
  // Check architecture decisions for contradictions
  const archDecisions = entries.filter(e => 
    e.tags?.includes('architecture_decision')
  )
  
  for (let i = 0; i < archDecisions.length; i++) {
    for (let j = i + 1; j < archDecisions.length; j++) {
      const contradiction = detectContradiction(archDecisions[i], archDecisions[j])
      
      if (contradiction) {
        issues.push({
          type: 'contradiction_drift',
          severity: contradiction.confidence === 'high' ? 'critical' : 'warning',
          description: `Contradiction detected: ${contradiction.explanation}`,
          location: `${archDecisions[i].id} vs ${archDecisions[j].id}`,
          details: contradiction,
          recommendation: 'Resolve contradiction by updating or deprecating one of the conflicting entries',
          affectedEntries: [archDecisions[i].id, archDecisions[j].id],
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  return {
    category: 'contradiction_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect staleness drift
 */
export async function detectStalenessDrift(
  entries: MemoryEntry[],
  config: DriftMonitorConfig = DEFAULT_CONFIG
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking staleness drift...')
  
  const issues: DriftIssue[] = []
  const now = Date.now()
  
  // Check reasoning patterns
  const patterns = entries.filter(e => e.tags?.includes('reasoning_pattern'))
  for (const entry of patterns) {
    const age = now - new Date(entry.metadata.createdAt).getTime()
    const ageDays = age / (1000 * 60 * 60 * 24)
    
    if (ageDays > config.stalenessThresholds.reasoningPatterns) {
      issues.push({
        type: 'staleness_drift',
        severity: 'warning',
        description: `Reasoning pattern ${entry.id} is ${Math.floor(ageDays)} days old`,
        location: entry.id,
        details: { ageDays: Math.floor(ageDays), threshold: config.stalenessThresholds.reasoningPatterns },
        recommendation: 'Review and update or archive this pattern',
        affectedEntries: [entry.id],
        timestamp: new Date().toISOString()
      })
    }
  }
  
  // Check architecture lessons
  const lessons = entries.filter(e => e.tags?.includes('architecture'))
  for (const entry of lessons) {
    const age = now - new Date(entry.metadata.createdAt).getTime()
    const ageDays = age / (1000 * 60 * 60 * 24)
    
    if (ageDays > config.stalenessThresholds.architectureLessons) {
      issues.push({
        type: 'staleness_drift',
        severity: 'info',
        description: `Architecture lesson ${entry.id} is ${Math.floor(ageDays)} days old`,
        location: entry.id,
        details: { ageDays: Math.floor(ageDays), threshold: config.stalenessThresholds.architectureLessons },
        recommendation: 'Review relevance of this architectural lesson',
        affectedEntries: [entry.id],
        timestamp: new Date().toISOString()
      })
    }
  }
  
  // Check issues
  const issueEntries = entries.filter(e => 
    e.tags?.includes('qa_failure') || e.tags?.includes('error_escalation')
  )
  for (const entry of issueEntries) {
    const age = now - new Date(entry.metadata.createdAt).getTime()
    const ageDays = age / (1000 * 60 * 60 * 24)
    
    if (ageDays > config.stalenessThresholds.issues) {
      // Old issues are less relevant but not necessarily bad
      if (ageDays > config.stalenessThresholds.issues * 2) {
        issues.push({
          type: 'staleness_drift',
          severity: 'info',
          description: `Historical issue ${entry.id} is ${Math.floor(ageDays)} days old`,
          location: entry.id,
          details: { ageDays: Math.floor(ageDays), threshold: config.stalenessThresholds.issues },
          recommendation: 'Consider archiving very old issues',
          affectedEntries: [entry.id],
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  return {
    category: 'staleness_drift',
    passed: issues.filter(i => i.severity !== 'info').length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect cross-agent drift
 */
export async function detectCrossAgentDrift(): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking cross-agent drift...')
  
  const issues: DriftIssue[] = []
  
  // For now, we only have one agent (foreman-app)
  // This will be expanded when GitHub Foreman and Local Builder are implemented
  
  // Placeholder: check that memory files exist and are readable
  const memoryBasePath = path.join(process.cwd(), 'memory')
  
  const requiredPaths = [
    path.join(memoryBasePath, 'global', 'memory.json'),
    path.join(memoryBasePath, 'foreman', 'memory.json')
  ]
  
  for (const filePath of requiredPaths) {
    if (!fs.existsSync(filePath)) {
      issues.push({
        type: 'cross_agent_drift',
        severity: 'error',
        description: `Required memory file missing: ${filePath}`,
        location: filePath,
        details: { path: filePath },
        recommendation: 'Initialize memory file',
        affectedEntries: [],
        timestamp: new Date().toISOString()
      })
    }
  }
  
  return {
    category: 'cross_agent_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect project drift
 */
export async function detectProjectDrift(
  entries: MemoryEntry[]
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking project drift...')
  
  const issues: DriftIssue[] = []
  
  // Check project-scoped entries for completeness
  const projectEntries = entries.filter(e => e.scope === 'project')
  
  // Group by project ID
  const projectGroups: Record<string, MemoryEntry[]> = {}
  for (const entry of projectEntries) {
    const projectId = entry.key.split('_')[0] || 'unknown'
    if (!projectGroups[projectId]) {
      projectGroups[projectId] = []
    }
    projectGroups[projectId].push(entry)
  }
  
  // Check each project has minimum required memory
  for (const [projectId, entries] of Object.entries(projectGroups)) {
    const hasMilestones = entries.some(e => e.tags?.includes('milestone'))
    const hasPhase = entries.some(e => e.tags?.includes('project_state_transition'))
    
    if (!hasMilestones && entries.length > 0) {
      issues.push({
        type: 'project_drift',
        severity: 'warning',
        description: `Project ${projectId} has no milestone entries`,
        location: `project:${projectId}`,
        details: { projectId, entryCount: entries.length },
        recommendation: 'Record project milestones in memory',
        affectedEntries: entries.map(e => e.id),
        timestamp: new Date().toISOString()
      })
    }
    
    if (!hasPhase && entries.length > 0) {
      issues.push({
        type: 'project_drift',
        severity: 'info',
        description: `Project ${projectId} has no phase transition entries`,
        location: `project:${projectId}`,
        details: { projectId, entryCount: entries.length },
        recommendation: 'Record project phase transitions',
        affectedEntries: entries.map(e => e.id),
        timestamp: new Date().toISOString()
      })
    }
  }
  
  return {
    category: 'project_drift',
    passed: issues.filter(i => i.severity !== 'info').length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect pattern drift
 */
export async function detectPatternDrift(
  entries: MemoryEntry[]
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking pattern drift...')
  
  const issues: DriftIssue[] = []
  
  // Check that reasoning patterns follow expected structure
  const patternEntries = entries.filter(e => e.tags?.includes('reasoning_pattern'))
  
  for (const entry of patternEntries) {
    const pattern = entry.value.data?.pattern || entry.value
    
    // Check for required fields
    if (!pattern.name || !pattern.description || !pattern.context || !pattern.approach) {
      issues.push({
        type: 'pattern_drift',
        severity: 'error',
        description: `Reasoning pattern ${entry.id} is missing required fields`,
        location: entry.id,
        details: { pattern },
        recommendation: 'Update pattern to include all required fields',
        affectedEntries: [entry.id],
        timestamp: new Date().toISOString()
      })
    }
  }
  
  return {
    category: 'pattern_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect governance drift
 */
export async function detectGovernanceDrift(
  entries: MemoryEntry[]
): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking governance drift...')
  
  const issues: DriftIssue[] = []
  
  // Load governance rules from governance directory
  const governanceRules = loadGovernanceRules()
  
  // Check that memory doesn't contradict governance
  for (const entry of entries) {
    // Check if memory claims authority above governance
    if (entry.value.data?.enforcement === 'mandatory' && 
        !entry.tags?.includes('governance')) {
      issues.push({
        type: 'governance_drift',
        severity: 'critical',
        description: `Entry ${entry.id} claims mandatory enforcement without governance tag`,
        location: entry.id,
        details: { entry: entry.value },
        recommendation: 'Remove enforcement claim or add proper governance tag',
        affectedEntries: [entry.id],
        timestamp: new Date().toISOString()
      })
    }
    
    // Check for governance contradictions
    for (const rule of governanceRules) {
      if (contradictsGovernance(entry, rule)) {
        issues.push({
          type: 'governance_drift',
          severity: 'critical',
          description: `Entry ${entry.id} contradicts governance rule: ${rule.rule}`,
          location: entry.id,
          details: { entry: entry.value, rule },
          recommendation: `Update entry to comply with ${rule.source}`,
          affectedEntries: [entry.id],
          timestamp: new Date().toISOString()
        })
      }
    }
  }
  
  return {
    category: 'governance_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Detect agent-experience drift
 * Checks builder feedback for patterns indicating memory/governance issues
 */
export async function detectAgentExperienceDrift(): Promise<DriftCheckResult> {
  console.log('[Drift Monitor] Checking agent-experience drift...')
  
  const issues: DriftIssue[] = []
  
  // Load builder feedback history
  const feedbackPath = path.join(process.cwd(), 'memory', 'global', 'builder-feedback-history.json')
  
  if (!fs.existsSync(feedbackPath)) {
    // No feedback yet, nothing to check
    return {
      category: 'agent_experience_drift',
      passed: true,
      issues: [],
      checkedAt: new Date().toISOString()
    }
  }
  
  try {
    const feedbackHistory: BuilderFeedback[] = JSON.parse(fs.readFileSync(feedbackPath, 'utf-8'))
    
    // Get recent feedback (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentFeedback = feedbackHistory.filter((f: BuilderFeedback) => 
      new Date(f.timestamp) >= thirtyDaysAgo
    )
    
    if (recentFeedback.length === 0) {
      return {
        category: 'agent_experience_drift',
        passed: true,
        issues: [],
        checkedAt: new Date().toISOString()
      }
    }
    
    // Check 1: High difficulty rate
    const highDifficultyCount = recentFeedback.filter((f: BuilderFeedback) => f.difficultyScore > 0.7).length
    const highDifficultyRate = highDifficultyCount / recentFeedback.length
    
    if (highDifficultyRate > 0.5) {
      issues.push({
        type: 'agent_experience_drift',
        severity: 'warning',
        description: `Over 50% of builder tasks rated high difficulty (${Math.round(highDifficultyRate * 100)}%)`,
        location: 'memory/global/builder-feedback-history.json',
        details: {
          highDifficultyCount,
          totalTasks: recentFeedback.length,
          rate: highDifficultyRate
        },
        recommendation: 'Review reasoning patterns and task allocation strategies',
        timestamp: new Date().toISOString()
      })
    }
    
    // Check 2: Missing memory patterns
    const missingMemoryCount = recentFeedback.filter((f: BuilderFeedback) => 
      f.missingMemoryDetected && f.missingMemoryDetected.length > 0
    ).length
    
    if (missingMemoryCount >= 3) {
      issues.push({
        type: 'agent_experience_drift',
        severity: 'warning',
        description: `Builders repeatedly reporting missing memory context (${missingMemoryCount} times in 30 days)`,
        location: 'memory/global',
        details: {
          occurrences: missingMemoryCount,
          totalTasks: recentFeedback.length
        },
        recommendation: 'Review and enhance memory fabric with commonly needed context',
        timestamp: new Date().toISOString()
      })
    }
    
    // Check 3: Governance conflicts
    const governanceConflictCount = recentFeedback.filter((f: BuilderFeedback) => 
      f.governanceConflicts && f.governanceConflicts.length > 0
    ).length
    
    if (governanceConflictCount >= 2) {
      issues.push({
        type: 'agent_experience_drift',
        severity: 'error',
        description: `Builders repeatedly encountering governance conflicts (${governanceConflictCount} times in 30 days)`,
        location: 'foreman/governance',
        details: {
          occurrences: governanceConflictCount,
          totalTasks: recentFeedback.length
        },
        recommendation: 'Review and clarify governance rules to resolve conflicts',
        timestamp: new Date().toISOString()
      })
    }
    
  } catch (error) {
    console.error('[Drift Monitor] Error checking agent-experience drift:', error)
  }
  
  return {
    category: 'agent_experience_drift',
    passed: issues.length === 0,
    issues,
    checkedAt: new Date().toISOString()
  }
}

/**
 * Run complete drift monitoring
 */
export async function runDriftMonitoring(
  config: DriftMonitorConfig = DEFAULT_CONFIG,
  options: { includeRetirementSuggestions?: boolean } = {}
): Promise<DriftReport> {
  console.log('[Drift Monitor] Starting drift monitoring...')
  
  // Load all memory
  const allMemory = await getAllMemory()
  const allEntries = flattenMemory(allMemory)
  
  console.log(`[Drift Monitor] Loaded ${allEntries.length} memory entries`)
  
  // Run all enabled checks
  const checks: DriftCheckResult[] = []
  
  if (config.enabledChecks.includes('schema_drift')) {
    checks.push(await detectSchemaDrift(allEntries))
  }
  
  if (config.enabledChecks.includes('version_drift')) {
    checks.push(await detectVersionDrift(allEntries))
  }
  
  if (config.enabledChecks.includes('contradiction_drift')) {
    checks.push(await detectContradictionDrift(allEntries))
  }
  
  if (config.enabledChecks.includes('staleness_drift')) {
    checks.push(await detectStalenessDrift(allEntries, config))
  }
  
  if (config.enabledChecks.includes('cross_agent_drift')) {
    checks.push(await detectCrossAgentDrift())
  }
  
  if (config.enabledChecks.includes('project_drift')) {
    checks.push(await detectProjectDrift(allEntries))
  }
  
  if (config.enabledChecks.includes('pattern_drift')) {
    checks.push(await detectPatternDrift(allEntries))
  }
  
  if (config.enabledChecks.includes('governance_drift')) {
    checks.push(await detectGovernanceDrift(allEntries))
  }
  
  if (config.enabledChecks.includes('agent_experience_drift')) {
    checks.push(await detectAgentExperienceDrift())
  }
  
  // Aggregate results
  const allIssues = checks.flatMap(c => c.issues)
  const criticalCount = allIssues.filter(i => i.severity === 'critical').length
  const errorCount = allIssues.filter(i => i.severity === 'error').length
  const warningCount = allIssues.filter(i => i.severity === 'warning').length
  const infoCount = allIssues.filter(i => i.severity === 'info').length
  
  // Determine overall status
  let overallStatus: DriftReport['overallStatus'] = 'healthy'
  if (criticalCount > 0) {
    overallStatus = 'critical'
  } else if (errorCount > 0) {
    overallStatus = 'error'
  } else if (warningCount > 0) {
    overallStatus = 'warning'
  }
  
  // Determine if execution should be blocked
  const executionBlocked = 
    (config.blockOnCritical && criticalCount > 0) ||
    (config.blockOnMultipleErrors && errorCount >= config.errorThreshold)
  
  // Generate recommendations
  const recommendations = generateRecommendations(checks, config)
  
  // Add retirement suggestion if contradictions or staleness detected
  if (options.includeRetirementSuggestions) {
    const hasContradictions = checks.some(c => c.category === 'contradiction_drift' && !c.passed)
    const hasStaleness = checks.some(c => c.category === 'staleness_drift' && c.issues.some(i => i.severity !== 'info'))
    
    if (hasContradictions || hasStaleness) {
      recommendations.push('Run retirement engine to resolve drift issues')
    }
  }
  
  // Generate summary
  const summary = generateSummary(checks, overallStatus, executionBlocked)
  
  const report: DriftReport = {
    overallStatus,
    totalIssues: allIssues.length,
    criticalCount,
    errorCount,
    warningCount,
    infoCount,
    checks,
    executionBlocked,
    recommendations,
    summary,
    generatedAt: new Date().toISOString(),
    memoryVersion: MEMORY_VERSION,
    scopes: ['global', 'foreman', 'project']
  }
  
  console.log(`[Drift Monitor] Completed: ${overallStatus} (${allIssues.length} issues)`)
  console.log(`[Drift Monitor] Execution blocked: ${executionBlocked}`)
  
  return report
}

/**
 * Helper: Extract historical issue from memory entry
 */
function extractHistoricalIssue(entry: MemoryEntry): HistoricalIssue {
  return {
    id: entry.id,
    type: entry.value.type || 'unknown',
    description: entry.value.description || '',
    resolution: entry.value.data?.resolution || 'unknown',
    timestamp: entry.metadata.createdAt,
    scope: entry.scope,
    tags: entry.tags || []
  }
}

/**
 * Helper: Extract architecture lesson from memory entry
 */
function extractArchitectureLesson(entry: MemoryEntry): ArchitectureLesson {
  return {
    id: entry.id,
    pattern: entry.value.data?.pattern || '',
    description: entry.value.description || '',
    rationale: entry.value.data?.rationale || '',
    benefits: entry.value.data?.benefits || [],
    tradeoffs: entry.value.data?.tradeoffs || [],
    applicability: entry.value.data?.applicability || [],
    timestamp: entry.metadata.createdAt,
    source: entry.metadata.createdBy
  }
}

/**
 * Helper: Extract reasoning pattern from memory entry
 */
function extractReasoningPattern(entry: MemoryEntry): ReasoningPattern {
  const pattern = entry.value.data?.pattern || entry.value
  return {
    id: entry.id,
    name: pattern.name || '',
    description: pattern.description || '',
    context: pattern.context || '',
    approach: pattern.approach || '',
    examples: pattern.examples || [],
    tags: entry.tags || [],
    successRate: pattern.successRate,
    usageCount: pattern.usageCount
  }
}

/**
 * Helper: Detect contradiction between two entries
 */
function detectContradiction(
  entry1: MemoryEntry,
  entry2: MemoryEntry
): ContradictionContext | null {
  const pattern1 = entry1.value.data?.pattern
  const pattern2 = entry2.value.data?.pattern
  
  if (!pattern1 || !pattern2 || typeof pattern1 !== 'string' || typeof pattern2 !== 'string') {
    return null
  }
  
  // Contradiction patterns - detect opposing actions
  const contradictionPatterns = [
    { add: /\b(require|add|include)\s+(\w+)/i, remove: /\b(remove|delete|exclude)\s+(\w+)/i },
  ]
  
  // Check for direct contradictions
  for (const { add, remove } of contradictionPatterns) {
    const pattern1AddMatch = pattern1.match(add)
    const pattern1RemoveMatch = pattern1.match(remove)
    const pattern2AddMatch = pattern2.match(add)
    const pattern2RemoveMatch = pattern2.match(remove)
    
    // One says add, other says remove
    if (pattern1AddMatch && pattern1AddMatch[2] && pattern2RemoveMatch && pattern2RemoveMatch[2]) {
      const component1 = pattern1AddMatch[2].toLowerCase()
      const component2 = pattern2RemoveMatch[2].toLowerCase()
      
      // Must reference the same component
      if (component1 === component2 || component1.includes(component2) || component2.includes(component1)) {
        return {
          entry1,
          entry2,
          contradictionType: 'direct',
          confidence: 'high',
          explanation: `One decision adds/requires '${component1}' while another removes/excludes '${component2}'`
        }
      }
    }
    
    if (pattern1RemoveMatch && pattern1RemoveMatch[2] && pattern2AddMatch && pattern2AddMatch[2]) {
      const component1 = pattern1RemoveMatch[2].toLowerCase()
      const component2 = pattern2AddMatch[2].toLowerCase()
      
      // Must reference the same component
      if (component1 === component2 || component1.includes(component2) || component2.includes(component1)) {
        return {
          entry1,
          entry2,
          contradictionType: 'direct',
          confidence: 'high',
          explanation: `One decision removes/excludes '${component1}' while another adds/requires '${component2}'`
        }
      }
    }
  }
  
  return null
}

/**
 * Helper: Load governance rules
 */
function loadGovernanceRules(): Array<{ id: string; rule: string; source: string; enforcement: string }> {
  const governancePath = path.join(process.cwd(), 'foreman', 'governance')
  const rules: Array<{ id: string; rule: string; source: string; enforcement: string }> = []
  
  if (!fs.existsSync(governancePath)) {
    return rules
  }
  
  // Load key governance rules
  const governanceFiles = [
    'memory-rules.md',
    'governance-model.md',
    'autonomy-rules.md'
  ]
  
  for (const file of governanceFiles) {
    const filePath = path.join(governancePath, file)
    if (fs.existsSync(filePath)) {
      rules.push({
        id: file.replace('.md', ''),
        rule: `Governance from ${file}`,
        source: filePath,
        enforcement: 'strict'
      })
    }
  }
  
  return rules
}

/**
 * Helper: Check if entry contradicts governance
 */
function contradictsGovernance(
  entry: MemoryEntry,
  rule: { id: string; rule: string; source: string; enforcement: string }
): boolean {
  // Memory Before Action doctrine check
  if (rule.id === 'memory-rules' && entry.value.data?.skipMemory === true) {
    return true
  }
  
  // Comprehensive secret detection
  // Check for common secret patterns in field names
  const secretFieldPatterns = [
    'apiKey', 'api_key', 'API_KEY',
    'secret', 'SECRET',
    'password', 'PASSWORD', 'pwd',
    'token', 'TOKEN',
    'privateKey', 'private_key',
    'accessToken', 'access_token',
    'refreshToken', 'refresh_token',
    'clientSecret', 'client_secret',
    'authToken', 'auth_token'
  ]
  
  // Check for secret patterns in values (API keys, tokens, etc.)
  const secretValuePatterns = [
    /sk-[a-zA-Z0-9]{20,}/,  // OpenAI-style secret keys
    /pk-[a-zA-Z0-9]{20,}/,  // Public keys
    /ghp_[a-zA-Z0-9]{36}/,  // GitHub personal access tokens
    /gho_[a-zA-Z0-9]{36}/,  // GitHub OAuth tokens
    /-----BEGIN (RSA |EC )?PRIVATE KEY-----/, // Private keys
    /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/ // JWT tokens
  ]
  
  // Recursively check object for secrets
  function hasSecret(obj: any, depth = 0): boolean {
    if (depth > 5) return false // Prevent infinite recursion
    
    if (typeof obj === 'string') {
      // Check if value matches secret pattern
      return secretValuePatterns.some(pattern => pattern.test(obj))
    }
    
    if (obj && typeof obj === 'object') {
      for (const [key, value] of Object.entries(obj)) {
        // Check if field name indicates a secret
        if (secretFieldPatterns.some(pattern => 
          key.toLowerCase().includes(pattern.toLowerCase())
        )) {
          return true
        }
        
        // Recursively check nested objects
        if (hasSecret(value, depth + 1)) {
          return true
        }
      }
    }
    
    return false
  }
  
  if (hasSecret(entry.value)) {
    return true
  }
  
  return false
}

/**
 * Helper: Generate recommendations
 */
function generateRecommendations(
  checks: DriftCheckResult[],
  config: DriftMonitorConfig
): string[] {
  const recommendations: string[] = []
  
  for (const check of checks) {
    if (!check.passed) {
      // Add unique recommendations
      for (const issue of check.issues) {
        if (!recommendations.includes(issue.recommendation)) {
          recommendations.push(issue.recommendation)
        }
      }
    }
  }
  
  // Add general recommendations based on config
  if (checks.some(c => c.category === 'staleness_drift' && !c.passed)) {
    recommendations.push('Schedule periodic memory review and archival process')
  }
  
  if (checks.some(c => c.category === 'governance_drift' && !c.passed)) {
    recommendations.push('Review and align memory with latest governance rules')
  }
  
  return recommendations
}

/**
 * Helper: Generate summary
 */
function generateSummary(
  checks: DriftCheckResult[],
  status: string,
  blocked: boolean
): string {
  const lines: string[] = []
  
  lines.push(`Memory Drift Monitor Report`)
  lines.push(`Overall Status: ${status.toUpperCase()}`)
  lines.push(`Execution ${blocked ? 'BLOCKED' : 'ALLOWED'}`)
  lines.push(``)
  lines.push(`Checks Performed: ${checks.length}`)
  
  for (const check of checks) {
    const status = check.passed ? '✓' : '✗'
    const issueCount = check.issues.length
    lines.push(`${status} ${check.category}: ${issueCount} issue(s)`)
  }
  
  if (blocked) {
    lines.push(``)
    lines.push(`⚠️  CRITICAL: Execution is blocked due to drift issues`)
    lines.push(`Action Required: Resolve critical/error issues before proceeding`)
  }
  
  return lines.join('\n')
}

/**
 * Helper: Create memory integrity snapshot
 */
export async function createMemorySnapshot(): Promise<MemoryIntegritySnapshot> {
  const allMemory = await getAllMemory()
  
  const globalUpdated = allMemory.global.reduce((latest, entry) => {
    const updated = new Date(entry.metadata.updatedAt).getTime()
    return updated > latest ? updated : latest
  }, 0)
  
  const foremanUpdated = allMemory.foreman.reduce((latest, entry) => {
    const updated = new Date(entry.metadata.updatedAt).getTime()
    return updated > latest ? updated : latest
  }, 0)
  
  const projects: Record<string, { entryCount: number; lastUpdated: string }> = {}
  for (const [projectId, entries] of Object.entries(allMemory.projects)) {
    const updated = entries.reduce((latest, entry) => {
      const entryUpdated = new Date(entry.metadata.updatedAt).getTime()
      return entryUpdated > latest ? entryUpdated : latest
    }, 0)
    
    projects[projectId] = {
      entryCount: entries.length,
      lastUpdated: new Date(updated).toISOString()
    }
  }
  
  return {
    scopes: {
      global: {
        entryCount: allMemory.global.length,
        lastUpdated: new Date(globalUpdated).toISOString()
      },
      foreman: {
        entryCount: allMemory.foreman.length,
        lastUpdated: new Date(foremanUpdated).toISOString()
      },
      projects
    },
    version: MEMORY_VERSION,
    capturedAt: new Date().toISOString()
  }
}
