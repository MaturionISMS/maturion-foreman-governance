/**
 * Memory Router
 * Deterministic filtering and relevance engine for memory selection
 * 
 * This module implements routing logic to select relevant memory segments
 * based on context without using LLM-based decisions.
 */

import { MemoryEntry, MemoryScope } from '@/types/memory'
import { MemoryRouterFilter, MemoryRouterResult } from '@/types/reasoning'

/**
 * Intent-based routing rules
 * Maps user intents to relevant tags and scopes
 */
const INTENT_ROUTING_RULES: Record<string, { scopes: MemoryScope[]; tags: string[] }> = {
  'architecture_review': {
    scopes: ['global', 'project'],
    tags: ['architecture_decision', 'architecture', 'design_pattern']
  },
  'build_planning': {
    scopes: ['foreman', 'project'],
    tags: ['wave_completion', 'builder_task_completion', 'build']
  },
  'qa_analysis': {
    scopes: ['foreman', 'project'],
    tags: ['qa_failure', 'qa', 'testing', 'validation']
  },
  'deployment_planning': {
    scopes: ['project', 'foreman'],
    tags: ['deployment', 'deployment_failure', 'rollback']
  },
  'error_resolution': {
    scopes: ['foreman', 'project'],
    tags: ['error_escalation', 'qa_failure', 'deployment_failure']
  },
  'governance_check': {
    scopes: ['global', 'foreman'],
    tags: ['governance_change', 'governance', 'compliance']
  },
  'milestone_planning': {
    scopes: ['project'],
    tags: ['milestone_completion', 'milestone', 'project_state_transition']
  }
}

/**
 * Phase-based routing rules
 * Maps lifecycle phases to relevant memory types
 */
const PHASE_ROUTING_RULES: Record<string, string[]> = {
  'concept': ['architecture_decision', 'governance', 'governance_change', 'project_state_transition'],
  'architecture': ['architecture_decision', 'design_pattern', 'governance', 'governance_change'],
  'build': ['wave_completion', 'builder_task_completion', 'qa_failure', 'governance', 'governance_change', 'architecture_decision'],
  'deployment': ['deployment', 'deployment_failure', 'rollback', 'governance', 'governance_change'],
  'qa': ['qa_failure', 'testing', 'validation', 'quality_gate', 'governance', 'governance_change'],
  'planning': ['milestone', 'wave_completion', 'project_state_transition', 'governance', 'governance_change']
}

/**
 * Subsystem-based routing rules
 * Maps subsystems to relevant memory types
 */
const SUBSYSTEM_ROUTING_RULES: Record<string, string[]> = {
  'architecture': ['architecture_decision', 'design_pattern', 'governance', 'governance_change'],
  'build': ['wave_completion', 'builder_task_completion', 'build', 'governance', 'governance_change', 'architecture_decision'],
  'qa': ['qa_failure', 'testing', 'validation', 'governance', 'governance_change'],
  'deployment': ['deployment', 'deployment_failure', 'environment', 'governance', 'governance_change'],
  'orchestration': ['wave_completion', 'orchestration', 'task_execution', 'governance', 'governance_change']
}

/**
 * Risk-based filtering
 * Higher risk requires more memory context
 */
const RISK_ROUTING_RULES: Record<string, { maxResults: number; priorityTags: string[] }> = {
  'low': {
    maxResults: 10,
    priorityTags: []
  },
  'medium': {
    maxResults: 25,
    priorityTags: ['qa_failure', 'governance']
  },
  'high': {
    maxResults: 50,
    priorityTags: ['error_escalation', 'deployment_failure', 'governance']
  },
  'critical': {
    maxResults: 100,
    priorityTags: ['error_escalation', 'deployment_failure', 'governance', 'architecture_decision']
  }
}

/**
 * Route memory entries based on context
 * 
 * This is a deterministic function that uses predefined rules
 * rather than LLM-based reasoning.
 * 
 * @param entries - All available memory entries
 * @param filter - Filtering criteria
 * @returns Filtered and sorted memory entries
 */
export function routeMemory(
  entries: MemoryEntry[],
  filter: MemoryRouterFilter
): MemoryRouterResult {
  let filteredEntries = [...entries]
  let filteringReasons: string[] = []

  // Step 1: Filter by scope
  if (filter.scope && filter.scope.length > 0) {
    filteredEntries = filteredEntries.filter(e => filter.scope!.includes(e.scope))
    filteringReasons.push(`Filtered by scope: ${filter.scope.join(', ')}`)
  }

  // Step 2: Apply intent-based routing
  if (filter.intent && INTENT_ROUTING_RULES[filter.intent]) {
    const intentRule = INTENT_ROUTING_RULES[filter.intent]
    
    // Filter by scope from intent rule
    filteredEntries = filteredEntries.filter(e => 
      intentRule.scopes.includes(e.scope)
    )
    
    // Boost entries with matching tags
    filteredEntries = filteredEntries.filter(e => {
      if (!e.tags || e.tags.length === 0) return false
      return e.tags.some(tag => intentRule.tags.includes(tag))
    })
    
    filteringReasons.push(`Applied intent routing: ${filter.intent}`)
  }

  // Step 3: Apply phase-based filtering
  if (filter.phase && PHASE_ROUTING_RULES[filter.phase]) {
    const phaseTags = PHASE_ROUTING_RULES[filter.phase]
    
    filteredEntries = filteredEntries.filter(e => {
      if (!e.tags || e.tags.length === 0) return false
      return e.tags.some(tag => phaseTags.includes(tag))
    })
    
    filteringReasons.push(`Applied phase filtering: ${filter.phase}`)
  }

  // Step 4: Apply subsystem-based filtering
  if (filter.subsystem && SUBSYSTEM_ROUTING_RULES[filter.subsystem]) {
    const subsystemTags = SUBSYSTEM_ROUTING_RULES[filter.subsystem]
    
    filteredEntries = filteredEntries.filter(e => {
      if (!e.tags || e.tags.length === 0) return false
      return e.tags.some(tag => subsystemTags.includes(tag))
    })
    
    filteringReasons.push(`Applied subsystem filtering: ${filter.subsystem}`)
  }

  // Step 5: Apply explicit tag filtering
  if (filter.tags && filter.tags.length > 0) {
    filteredEntries = filteredEntries.filter(e => {
      if (!e.tags || e.tags.length === 0) return false
      return filter.tags!.some(tag => e.tags && e.tags.includes(tag))
    })
    
    filteringReasons.push(`Applied tag filtering: ${filter.tags.join(', ')}`)
  }

  // Step 6: Sort by recency (most recent first)
  filteredEntries.sort((a, b) => {
    const timeA = new Date(a.metadata.createdAt).getTime()
    const timeB = new Date(b.metadata.createdAt).getTime()
    return timeB - timeA
  })

  // Step 7: Apply risk-based limits and priority
  if (filter.riskLevel && RISK_ROUTING_RULES[filter.riskLevel]) {
    const riskRule = RISK_ROUTING_RULES[filter.riskLevel]
    
    // Separate priority entries
    const priorityEntries = filteredEntries.filter(e => {
      if (!e.tags || e.tags.length === 0) return false
      return e.tags.some(tag => riskRule.priorityTags.includes(tag))
    })
    
    const regularEntries = filteredEntries.filter(e => {
      if (!e.tags || e.tags.length === 0) return true
      return !e.tags.some(tag => riskRule.priorityTags.includes(tag))
    })
    
    // Combine with priority first
    filteredEntries = [...priorityEntries, ...regularEntries].slice(0, riskRule.maxResults)
    
    filteringReasons.push(`Applied risk-based filtering: ${filter.riskLevel} (max ${riskRule.maxResults})`)
  }

  // Step 8: Apply max results limit
  if (filter.maxResults && filter.maxResults > 0) {
    filteredEntries = filteredEntries.slice(0, filter.maxResults)
    filteringReasons.push(`Limited to ${filter.maxResults} results`)
  }

  return {
    entries: filteredEntries,
    total: filteredEntries.length,
    filteringReason: filteringReasons.join('; ')
  }
}

/**
 * Get recommended scopes for a given intent
 * 
 * @param intent - User intent
 * @returns Recommended memory scopes
 */
export function getRecommendedScopes(intent?: string): MemoryScope[] {
  if (!intent) return ['global', 'foreman', 'project']
  
  const intentRule = INTENT_ROUTING_RULES[intent]
  if (intentRule) return intentRule.scopes
  
  return ['global', 'foreman', 'project']
}

/**
 * Get recommended tags for a given context
 * 
 * @param context - Reasoning context
 * @returns Recommended tags
 */
export function getRecommendedTags(context: {
  intent?: string
  phase?: string
  subsystem?: string
}): string[] {
  const tags: Set<string> = new Set()
  
  // Add tags from intent
  if (context.intent && INTENT_ROUTING_RULES[context.intent]) {
    INTENT_ROUTING_RULES[context.intent].tags.forEach(tag => tags.add(tag))
  }
  
  // Add tags from phase
  if (context.phase && PHASE_ROUTING_RULES[context.phase]) {
    PHASE_ROUTING_RULES[context.phase].forEach(tag => tags.add(tag))
  }
  
  // Add tags from subsystem
  if (context.subsystem && SUBSYSTEM_ROUTING_RULES[context.subsystem]) {
    SUBSYSTEM_ROUTING_RULES[context.subsystem].forEach(tag => tags.add(tag))
  }
  
  return Array.from(tags)
}

/**
 * Check if memory context is sufficient for reasoning
 * 
 * @param memoryCount - Number of memory entries loaded
 * @param riskLevel - Risk level of the operation
 * @returns Whether memory context is sufficient
 */
export function isMemoryContextSufficient(
  memoryCount: number,
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
): { sufficient: boolean; reason?: string } {
  const minRequirements: Record<string, number> = {
    'low': 1,
    'medium': 5,
    'high': 10,
    'critical': 20
  }
  
  const required = minRequirements[riskLevel]
  
  if (memoryCount >= required) {
    return { sufficient: true }
  }
  
  return {
    sufficient: false,
    reason: `Insufficient memory context: loaded ${memoryCount}, required ${required} for ${riskLevel} risk operations`
  }
}
