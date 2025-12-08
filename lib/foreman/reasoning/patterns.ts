/**
 * Reasoning Patterns
 * Learned decision-making patterns and their application logic
 * 
 * This module manages reasoning patterns that guide Foreman's
 * decision-making across different contexts.
 */

import fs from 'fs'
import path from 'path'
import { ReasoningPattern } from '@/types/reasoning'
import { MemoryEntry } from '@/types/memory'

/**
 * Built-in reasoning patterns
 * These are core patterns that come with MARE
 * 
 * GOVERNANCE-FIRST MINDSET: Core governance patterns are IMMUTABLE
 * and cannot be modified, removed, or overridden at runtime.
 */
const BUILT_IN_PATTERNS: ReasoningPattern[] = [
  {
    id: 'pattern_governance_first_mindset',
    name: 'Governance-First Mindset',
    description: 'Governance overrules convenience. QA is sacrosanct. 100% correctness is non-negotiable. Any anomaly = STOP.',
    context: 'All Foreman actions and decisions',
    approach: 'Before any action: validate governance compliance, check for zero-tolerance violations, detect forbidden actions, ensure QA is 100%, self-police behavior',
    examples: [
      'Before PR creation → validate mindset compliance',
      'Before accepting build → verify 100% QA pass',
      'Before any decision → check governance memory',
      'When detecting drift → create incident and self-correct'
    ],
    tags: ['core', 'governance', 'immutable', 'mindset'],
    successRate: 1.0,
    usageCount: 0,
    immutable: true // CANNOT BE MODIFIED OR REMOVED
  },
  {
    id: 'pattern_zero_tolerance',
    name: 'Zero-Tolerance Enforcement',
    description: 'ANY error, anomaly, drift, failure, skip, or warning is a governance incident. NO EXCEPTIONS.',
    context: 'All QA and validation phases',
    approach: 'Detect any anomaly → trigger governance incident → STOP execution → require fix',
    examples: [
      'Test failure → governance incident → block PR',
      'Warning detected → governance incident → block build',
      'Drift detected → governance incident → require correction'
    ],
    tags: ['core', 'governance', 'immutable', 'qa'],
    successRate: 1.0,
    usageCount: 0,
    immutable: true // CANNOT BE MODIFIED OR REMOVED
  },
  {
    id: 'pattern_no_qa_manipulation',
    name: 'No QA Manipulation',
    description: 'Foreman must NEVER attempt to make QA pass by modifying the QA system',
    context: 'Any action related to QA, tests, linting, validation',
    approach: 'Detect forbidden actions (edit error patterns, remove tests, weaken config) → block action → create governance incident',
    examples: [
      'Attempt to edit error patterns → FORBIDDEN → block and incident',
      'Attempt to exclude from strict mode → FORBIDDEN → block and incident',
      'Attempt to whitelist failures → FORBIDDEN → block and incident'
    ],
    tags: ['core', 'governance', 'immutable', 'qa'],
    successRate: 1.0,
    usageCount: 0,
    immutable: true // CANNOT BE MODIFIED OR REMOVED
  },
  {
    id: 'pattern_auditor_not_developer',
    name: 'Auditor Not Developer',
    description: 'Foreman is an Auditor and Governor, not a Developer. Delegate code work to builders.',
    context: 'All task execution decisions',
    approach: 'When asked to write code → delegate to builder. Focus on: enforce, validate, audit, verify, certify, approve, reject',
    examples: [
      'User asks for code change → delegate to appropriate builder',
      'QA fails → audit results, create incident, require fix',
      'Build complete → certify if QA passes, reject if QA fails'
    ],
    tags: ['core', 'governance', 'immutable', 'identity'],
    successRate: 1.0,
    usageCount: 0,
    immutable: true // CANNOT BE MODIFIED OR REMOVED
  },
  {
    id: 'pattern_memory_before_action',
    name: 'Memory Before Action',
    description: 'Always load relevant memory context before taking any significant action',
    context: 'All major orchestration decisions',
    approach: 'Load memory from relevant scopes, filter by tags and context, validate sufficiency before proceeding',
    examples: [
      'Before starting a build wave, load previous wave outcomes',
      'Before deploying, load deployment history and failure patterns',
      'Before architectural changes, load past architecture decisions'
    ],
    tags: ['core', 'governance', 'memory', 'immutable'],
    successRate: 1.0,
    usageCount: 0,
    immutable: true // CANNOT BE MODIFIED OR REMOVED
  },
  {
    id: 'pattern_governance_alignment',
    name: 'Governance Alignment Check',
    description: 'Verify all decisions align with governance rules before execution',
    context: 'Any action that affects project state or architecture',
    approach: 'Load governance rules from global memory, validate action against rules, flag violations',
    examples: [
      'Check deployment governance before production deploy',
      'Validate architecture change against governance patterns',
      'Ensure QA gates are passed per governance requirements'
    ],
    tags: ['core', 'governance', 'validation', 'immutable'],
    successRate: 1.0,
    usageCount: 0,
    immutable: true // CANNOT BE MODIFIED OR REMOVED
  },
  {
    id: 'pattern_progressive_validation',
    name: 'Progressive Validation',
    description: 'Validate in stages: syntax → logic → integration → deployment',
    context: 'Build and deployment workflows',
    approach: 'Execute validation in phases, fail fast on early stages, provide detailed feedback at each stage',
    examples: [
      'Lint before build, build before test, test before deploy',
      'Validate file syntax before applying changes',
      'Check API contracts before integration'
    ],
    tags: ['qa', 'validation', 'build'],
    successRate: 0.95,
    usageCount: 0
  },
  {
    id: 'pattern_error_context_enrichment',
    name: 'Error Context Enrichment',
    description: 'Enrich errors with memory context to aid in resolution',
    context: 'Error handling and escalation',
    approach: 'When error occurs, load similar past errors, attach resolution history, provide context-aware suggestions',
    examples: [
      'Build failure → load similar failures → suggest known fixes',
      'Deployment error → check deployment history → identify patterns',
      'QA failure → review past failures in same module → recommend approach'
    ],
    tags: ['error_handling', 'recovery', 'memory'],
    successRate: 0.85,
    usageCount: 0
  },
  {
    id: 'pattern_confidence_based_escalation',
    name: 'Confidence-Based Escalation',
    description: 'Escalate decisions when confidence is low or risks are high',
    context: 'All autonomous decisions',
    approach: 'Calculate confidence score, escalate to human if below threshold or risk is critical',
    examples: [
      'Low confidence in architecture decision → escalate for review',
      'Critical risk deployment → require human approval',
      'Unclear governance interpretation → seek clarification'
    ],
    tags: ['autonomy', 'risk_management', 'escalation'],
    successRate: 0.9,
    usageCount: 0
  },
  {
    id: 'pattern_incremental_rollout',
    name: 'Incremental Rollout',
    description: 'Deploy changes incrementally to reduce blast radius',
    context: 'Deployment and architecture changes',
    approach: 'Start small, validate, expand gradually, rollback quickly if issues detected',
    examples: [
      'Deploy to staging before production',
      'Feature flags for gradual rollout',
      'Module-by-module architecture migration'
    ],
    tags: ['deployment', 'risk_management', 'architecture'],
    successRate: 0.92,
    usageCount: 0
  }
]

/**
 * Load reasoning patterns from memory and built-ins
 * Now also loads evolved patterns from consolidation
 * 
 * @param memoryEntries - Memory entries that may contain patterns
 * @returns Combined list of patterns
 */
export function loadReasoningPatterns(memoryEntries: MemoryEntry[]): ReasoningPattern[] {
  const patterns: ReasoningPattern[] = [...BUILT_IN_PATTERNS]
  
  // Load evolved patterns from consolidated directory
  const consolidatedPath = path.join(
    process.cwd(),
    'memory',
    'global',
    'consolidated',
    'reasoning',
    'consolidated_reasoning_patterns.json'
  )

  if (fs.existsSync(consolidatedPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(consolidatedPath, 'utf-8'))
      
      // Add stable patterns first (highest priority)
      if (data.patterns?.stable) {
        patterns.push(...data.patterns.stable)
        console.log(`[Reasoning Patterns] Loaded ${data.patterns.stable.length} stable evolved patterns`)
      }
      
      // Add monitored patterns
      if (data.patterns?.monitored) {
        patterns.push(...data.patterns.monitored)
        console.log(`[Reasoning Patterns] Loaded ${data.patterns.monitored.length} monitored evolved patterns`)
      }
      
    } catch (error) {
      console.warn('[Reasoning Patterns] Failed to load evolved patterns:', error)
    }
  }
  
  // Extract patterns from memory entries
  memoryEntries.forEach(entry => {
    if (entry.tags?.includes('reasoning_pattern')) {
      try {
        // Pattern could be in entry.value.pattern or entry.value.data.pattern
        const patternData = entry.value.pattern || entry.value.data?.pattern
        
        if (!patternData) return
        
        const pattern: ReasoningPattern = {
          id: entry.id,
          name: patternData.name || 'Unnamed Pattern',
          description: patternData.description || '',
          context: patternData.context || '',
          approach: patternData.approach || '',
          examples: patternData.examples || [],
          tags: entry.tags || [],
          successRate: patternData.successRate,
          usageCount: patternData.usageCount || 0
        }
        patterns.push(pattern)
      } catch (error) {
        console.warn(`[Reasoning Patterns] Failed to parse pattern from entry ${entry.id}:`, error)
      }
    }
  })
  
  return patterns
}

/**
 * Find applicable patterns for a given context
 * 
 * @param patterns - All available patterns
 * @param context - Context to match against
 * @returns Applicable patterns sorted by relevance
 */
export function findApplicablePatterns(
  patterns: ReasoningPattern[],
  context: {
    tags?: string[]
    phase?: string
    subsystem?: string
    riskLevel?: string
  }
): ReasoningPattern[] {
  let applicablePatterns = [...patterns]
  
  // Filter by tags if provided
  if (context.tags && context.tags.length > 0) {
    applicablePatterns = applicablePatterns.filter(pattern => {
      return context.tags!.some(tag => pattern.tags.includes(tag))
    })
  }
  
  // Add core patterns if risk is high or critical
  if (context.riskLevel === 'high' || context.riskLevel === 'critical') {
    const corePatterns = patterns.filter(p => p.tags.includes('core'))
    // Merge core patterns with applicable patterns, avoiding duplicates
    const merged = [...corePatterns, ...applicablePatterns]
    const seen = new Map<string, ReasoningPattern>()
    merged.forEach(p => {
      if (!seen.has(p.id)) {
        seen.set(p.id, p)
      }
    })
    applicablePatterns = Array.from(seen.values())
  }
  
  // Sort by success rate and usage count
  applicablePatterns.sort((a, b) => {
    // Prioritize core patterns
    const aCoreWeight = a.tags.includes('core') ? 1 : 0
    const bCoreWeight = b.tags.includes('core') ? 1 : 0
    
    if (aCoreWeight !== bCoreWeight) {
      return bCoreWeight - aCoreWeight
    }
    
    // Then by success rate
    const aRate = a.successRate || 0
    const bRate = b.successRate || 0
    
    if (aRate !== bRate) {
      return bRate - aRate
    }
    
    // Then by usage count (experience)
    const aUsage = a.usageCount || 0
    const bUsage = b.usageCount || 0
    
    return bUsage - aUsage
  })
  
  return applicablePatterns
}

/**
 * Apply a reasoning pattern to generate guidance
 * 
 * @param pattern - Pattern to apply
 * @param context - Context data
 * @returns Guidance based on the pattern
 */
export function applyPattern(
  pattern: ReasoningPattern,
  context: Record<string, any>
): {
  guidance: string
  examples: string[]
  confidence: 'low' | 'medium' | 'high'
} {
  let confidence: 'low' | 'medium' | 'high' = 'medium'
  
  // Adjust confidence based on pattern success rate
  if (pattern.successRate) {
    if (pattern.successRate >= 0.9) confidence = 'high'
    else if (pattern.successRate >= 0.7) confidence = 'medium'
    else confidence = 'low'
  }
  
  // Build guidance
  const guidance = `Pattern: ${pattern.name}\n` +
    `Context: ${pattern.context}\n` +
    `Approach: ${pattern.approach}\n` +
    `Success Rate: ${((pattern.successRate || 0) * 100).toFixed(0)}%`
  
  return {
    guidance,
    examples: pattern.examples,
    confidence
  }
}

/**
 * Get built-in patterns
 * 
 * @returns Array of built-in reasoning patterns
 */
export function getBuiltInPatterns(): ReasoningPattern[] {
  return [...BUILT_IN_PATTERNS]
}

/**
 * Validate a reasoning pattern
 * 
 * @param pattern - Pattern to validate
 * @returns Validation result
 */
export function validatePattern(pattern: ReasoningPattern): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (!pattern.id) errors.push('Pattern must have an id')
  if (!pattern.name) errors.push('Pattern must have a name')
  if (!pattern.description) errors.push('Pattern must have a description')
  if (!pattern.context) errors.push('Pattern must have a context')
  if (!pattern.approach) errors.push('Pattern must have an approach')
  // Tags are optional but encouraged for better pattern matching
  if (!pattern.tags || pattern.tags.length === 0) {
    console.warn(`[Reasoning Patterns] Pattern ${pattern.id} has no tags - this may limit its applicability`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
