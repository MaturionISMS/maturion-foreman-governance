/**
 * Type Cohesion Validators
 * 
 * Canonical validation functions for all cognitive engine types.
 * Implements Type Cohesion Contract v1.0.0
 * 
 * Purpose: Prevent type mismatches that pass local QA but fail in production
 */

import { MemoryEntry, MemoryMetadata, MemoryScope } from '@/types/memory'
import { 
  RetirementInfo, 
  RetirementCandidate, 
  RetirementReason, 
  RetirementSeverity,
  MemoryLifecycleState
} from '@/types/retirement'
import { KnowledgeBlock, KnowledgeCategory, KnowledgeImportance } from '@/types/consolidation'

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean
  errors: string[]
}

/**
 * Validate ISO 8601 timestamp
 * Note: This is a pragmatic validation that checks basic ISO 8601 format.
 * For production, consider using a library like date-fns or luxon for comprehensive validation.
 */
function isValidISO8601(timestamp: string): boolean {
  if (typeof timestamp !== 'string') return false
  const date = new Date(timestamp)
  // Check if date is valid and the string can round-trip through ISO format
  return !isNaN(date.getTime()) && timestamp.includes('T') && timestamp.includes('Z')
}

/**
 * Validate MemoryScope enum
 */
function isValidMemoryScope(scope: any): scope is MemoryScope {
  return ['global', 'foreman', 'project'].includes(scope)
}

/**
 * Validate MemoryMetadata
 */
export function validateMemoryMetadata(metadata: unknown): ValidationResult {
  const errors: string[] = []
  
  if (!metadata || typeof metadata !== 'object') {
    return { valid: false, errors: ['metadata must be an object'] }
  }
  
  const m = metadata as any
  
  // Required fields
  if (typeof m.createdAt !== 'string') {
    errors.push('metadata.createdAt must be a string')
  } else if (!isValidISO8601(m.createdAt)) {
    errors.push('metadata.createdAt must be valid ISO 8601 timestamp')
  }
  
  if (typeof m.updatedAt !== 'string') {
    errors.push('metadata.updatedAt must be a string')
  } else if (!isValidISO8601(m.updatedAt)) {
    errors.push('metadata.updatedAt must be valid ISO 8601 timestamp')
  }
  
  if (typeof m.createdBy !== 'string' || m.createdBy.length === 0) {
    errors.push('metadata.createdBy must be a non-empty string')
  }
  
  if (typeof m.version !== 'number') {
    errors.push('metadata.version must be a number')
  } else if (m.version < 1 || !Number.isInteger(m.version)) {
    errors.push('metadata.version must be a positive integer')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate MemoryEntry (canonical shape)
 */
export function validateMemoryEntry(entry: unknown): ValidationResult {
  const errors: string[] = []
  
  if (!entry || typeof entry !== 'object') {
    return { valid: false, errors: ['entry must be an object'] }
  }
  
  const e = entry as any
  
  // Required fields
  if (typeof e.id !== 'string' || e.id.length === 0) {
    errors.push('id must be a non-empty string')
  }
  
  if (!isValidMemoryScope(e.scope)) {
    errors.push('scope must be one of: global, foreman, project')
  }
  
  if (typeof e.key !== 'string' || e.key.length === 0) {
    errors.push('key must be a non-empty string')
  }
  
  // value can be any JSON-serializable value, so just check it exists
  if (e.value === undefined) {
    errors.push('value is required')
  }
  
  // Validate metadata
  const metadataResult = validateMemoryMetadata(e.metadata)
  if (!metadataResult.valid) {
    errors.push(...metadataResult.errors)
  }
  
  // Optional fields
  if (e.tags !== undefined) {
    if (!Array.isArray(e.tags)) {
      errors.push('tags must be an array if present')
    } else if (!e.tags.every((tag: any) => typeof tag === 'string')) {
      errors.push('all tags must be strings')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Type guard for MemoryEntry
 */
export function isMemoryEntry(entry: unknown): entry is MemoryEntry {
  return validateMemoryEntry(entry).valid
}

/**
 * Validate RetirementReason enum
 */
function isValidRetirementReason(reason: any): reason is RetirementReason {
  return [
    'staleness',
    'supersession',
    'obsolescence',
    'contradiction',
    'consolidation',
    'manual_review'
  ].includes(reason)
}

/**
 * Validate RetirementSeverity enum
 */
function isValidRetirementSeverity(severity: any): severity is RetirementSeverity {
  return ['low', 'medium', 'high', 'critical'].includes(severity)
}

/**
 * Validate MemoryLifecycleState enum
 */
function isValidMemoryLifecycleState(state: any): state is MemoryLifecycleState {
  return ['active', 'consolidated', 'archival', 'deprecated'].includes(state)
}

/**
 * Validate RetirementInfo (canonical shape)
 */
export function validateRetirementInfo(info: unknown): ValidationResult {
  const errors: string[] = []
  
  if (!info || typeof info !== 'object') {
    return { valid: false, errors: ['info must be an object'] }
  }
  
  const i = info as any
  
  // Required fields
  if (!isValidRetirementReason(i.reason)) {
    errors.push('reason must be a valid RetirementReason')
  }
  
  if (!isValidRetirementSeverity(i.severity)) {
    errors.push('severity must be a valid RetirementSeverity')
  }
  
  if (!isValidMemoryLifecycleState(i.lifecycle)) {
    errors.push('lifecycle must be a valid MemoryLifecycleState')
  }
  
  if (typeof i.explanation !== 'string' || i.explanation.length === 0) {
    errors.push('explanation must be a non-empty string')
  }
  
  if (typeof i.manualReviewRequired !== 'boolean') {
    errors.push('manualReviewRequired must be a boolean')
  }
  
  // Optional fields
  if (i.supersededBy !== undefined && typeof i.supersededBy !== 'string') {
    errors.push('supersededBy must be a string if present')
  }
  
  if (i.contradictedBy !== undefined) {
    if (!Array.isArray(i.contradictedBy)) {
      errors.push('contradictedBy must be an array if present')
    } else if (!i.contradictedBy.every((id: any) => typeof id === 'string')) {
      errors.push('all contradictedBy entries must be strings')
    }
  }
  
  if (i.obsoleteReferences !== undefined) {
    if (!Array.isArray(i.obsoleteReferences)) {
      errors.push('obsoleteReferences must be an array if present')
    } else if (!i.obsoleteReferences.every((ref: any) => typeof ref === 'string')) {
      errors.push('all obsoleteReferences entries must be strings')
    }
  }
  
  if (i.reviewedBy !== undefined && typeof i.reviewedBy !== 'string') {
    errors.push('reviewedBy must be a string if present')
  }
  
  if (i.reviewedAt !== undefined) {
    if (typeof i.reviewedAt !== 'string') {
      errors.push('reviewedAt must be a string if present')
    } else if (!isValidISO8601(i.reviewedAt)) {
      errors.push('reviewedAt must be valid ISO 8601 timestamp if present')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Type guard for RetirementInfo
 */
export function isRetirementInfo(info: unknown): info is RetirementInfo {
  return validateRetirementInfo(info).valid
}

/**
 * Validate RetirementCandidate (canonical shape)
 */
export function validateRetirementCandidate(candidate: unknown): ValidationResult {
  const errors: string[] = []
  
  if (!candidate || typeof candidate !== 'object') {
    return { valid: false, errors: ['candidate must be an object'] }
  }
  
  const c = candidate as any
  
  // Validate entry
  const entryResult = validateMemoryEntry(c.entry)
  if (!entryResult.valid) {
    errors.push('entry: ' + entryResult.errors.join(', '))
  }
  
  // Validate reason
  if (!isValidRetirementReason(c.reason)) {
    errors.push('reason must be a valid RetirementReason')
  }
  
  // Validate severity
  if (!isValidRetirementSeverity(c.severity)) {
    errors.push('severity must be a valid RetirementSeverity')
  }
  
  // Validate score
  if (typeof c.score !== 'number') {
    errors.push('score must be a number')
  } else if (c.score < 0 || c.score > 100) {
    errors.push('score must be between 0 and 100 inclusive')
  }
  
  // Validate explanation
  if (typeof c.explanation !== 'string' || c.explanation.length === 0) {
    errors.push('explanation must be a non-empty string')
  }
  
  // Validate recommendedAction
  if (!['retire', 'archive', 'deprecate', 'review'].includes(c.recommendedAction)) {
    errors.push('recommendedAction must be one of: retire, archive, deprecate, review')
  }
  
  // Validate metadata
  if (!c.metadata || typeof c.metadata !== 'object') {
    errors.push('metadata must be an object')
  } else {
    if (typeof c.metadata.ageInDays !== 'number' || c.metadata.ageInDays < 0) {
      errors.push('metadata.ageInDays must be a non-negative number')
    }
    
    // Optional metadata fields
    if (c.metadata.lastAccessed !== undefined && typeof c.metadata.lastAccessed !== 'string') {
      errors.push('metadata.lastAccessed must be a string if present')
    }
    if (c.metadata.usageCount !== undefined && typeof c.metadata.usageCount !== 'number') {
      errors.push('metadata.usageCount must be a number if present')
    }
    if (c.metadata.conflictCount !== undefined && typeof c.metadata.conflictCount !== 'number') {
      errors.push('metadata.conflictCount must be a number if present')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Type guard for RetirementCandidate
 */
export function isRetirementCandidate(candidate: unknown): candidate is RetirementCandidate {
  return validateRetirementCandidate(candidate).valid
}

/**
 * Validate KnowledgeCategory enum
 */
function isValidKnowledgeCategory(category: any): category is KnowledgeCategory {
  return [
    'architecture_principle',
    'qa_pattern',
    'deployment_lesson',
    'governance_behaviour',
    'build_pattern',
    'error_resolution',
    'performance_insight',
    'consolidated_reasoning_patterns'
  ].includes(category)
}

/**
 * Validate KnowledgeImportance enum
 */
function isValidKnowledgeImportance(importance: any): importance is KnowledgeImportance {
  return ['low', 'medium', 'high', 'critical'].includes(importance)
}

/**
 * Validate KnowledgeBlock (canonical shape)
 */
export function validateKnowledgeBlock(block: unknown): ValidationResult {
  const errors: string[] = []
  
  if (!block || typeof block !== 'object') {
    return { valid: false, errors: ['block must be an object'] }
  }
  
  const b = block as any
  
  // Required fields
  if (typeof b.id !== 'string' || b.id.length === 0) {
    errors.push('id must be a non-empty string')
  }
  
  if (!isValidKnowledgeCategory(b.category)) {
    errors.push('category must be a valid KnowledgeCategory')
  }
  
  if (typeof b.summary !== 'string' || b.summary.length === 0) {
    errors.push('summary must be a non-empty string')
  } else if (b.summary.length > 500) {
    errors.push('summary should not exceed 500 characters')
  }
  
  if (typeof b.lesson !== 'string' || b.lesson.length === 0) {
    errors.push('lesson must be a non-empty string')
  }
  
  if (!Array.isArray(b.appliesTo)) {
    errors.push('appliesTo must be an array')
  } else if (!b.appliesTo.every((item: any) => typeof item === 'string')) {
    errors.push('all appliesTo entries must be strings')
  }
  
  if (!Array.isArray(b.originEntries)) {
    errors.push('originEntries must be an array')
  } else if (!b.originEntries.every((item: any) => typeof item === 'string')) {
    errors.push('all originEntries must be strings')
  }
  
  if (!Array.isArray(b.governanceLinks)) {
    errors.push('governanceLinks must be an array')
  } else if (!b.governanceLinks.every((item: any) => typeof item === 'string')) {
    errors.push('all governanceLinks must be strings')
  }
  
  if (typeof b.confidence !== 'number') {
    errors.push('confidence must be a number')
  } else if (b.confidence < 0 || b.confidence > 1) {
    errors.push('confidence must be between 0 and 1 inclusive')
  }
  
  if (!isValidKnowledgeImportance(b.importance)) {
    errors.push('importance must be a valid KnowledgeImportance')
  }
  
  if (typeof b.timestamp !== 'string') {
    errors.push('timestamp must be a string')
  } else if (!isValidISO8601(b.timestamp)) {
    errors.push('timestamp must be valid ISO 8601 timestamp')
  }
  
  // Optional fields
  if (b.lastValidated !== undefined) {
    if (typeof b.lastValidated !== 'string') {
      errors.push('lastValidated must be a string if present')
    } else if (!isValidISO8601(b.lastValidated)) {
      errors.push('lastValidated must be valid ISO 8601 timestamp if present')
    }
  }
  
  if (b.metadata !== undefined) {
    if (typeof b.metadata !== 'object') {
      errors.push('metadata must be an object if present')
    } else {
      if (typeof b.metadata.consolidatedFrom !== 'number') {
        errors.push('metadata.consolidatedFrom must be a number')
      }
      if (typeof b.metadata.firstSeen !== 'string') {
        errors.push('metadata.firstSeen must be a string')
      } else if (!isValidISO8601(b.metadata.firstSeen)) {
        errors.push('metadata.firstSeen must be valid ISO 8601 timestamp')
      }
      if (typeof b.metadata.validationCount !== 'number') {
        errors.push('metadata.validationCount must be a number')
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Type guard for KnowledgeBlock
 */
export function isKnowledgeBlock(block: unknown): block is KnowledgeBlock {
  return validateKnowledgeBlock(block).valid
}

/**
 * Flatten MemoryEntry for storage
 */
export function flattenMemoryEntry(entry: MemoryEntry): Record<string, any> {
  const flattened: Record<string, any> = {
    id: entry.id,
    scope: entry.scope,
    key: entry.key,
    value: entry.value,
    metadata: {
      createdAt: entry.metadata.createdAt,
      updatedAt: entry.metadata.updatedAt,
      createdBy: entry.metadata.createdBy,
      version: entry.metadata.version
    }
  }
  
  if (entry.tags) {
    flattened.tags = entry.tags
  }
  
  return flattened
}

/**
 * Flatten KnowledgeBlock for storage
 */
export function flattenKnowledgeBlock(block: KnowledgeBlock): Record<string, any> {
  const flattened: Record<string, any> = {
    id: block.id,
    category: block.category,
    summary: block.summary,
    lesson: block.lesson,
    appliesTo: block.appliesTo,
    originEntries: block.originEntries,
    governanceLinks: block.governanceLinks,
    confidence: block.confidence,
    importance: block.importance,
    timestamp: block.timestamp
  }
  
  if (block.lastValidated) {
    flattened.lastValidated = block.lastValidated
  }
  
  if (block.metadata) {
    flattened.metadata = block.metadata
  }
  
  return flattened
}

/**
 * Validate all fields are known (no unknown property access)
 * This is a runtime check to complement TypeScript compile-time checks
 */
export function detectUnknownFields(
  obj: Record<string, any>,
  knownFields: string[]
): string[] {
  const unknownFields: string[] = []
  
  for (const key in obj) {
    if (!knownFields.includes(key)) {
      unknownFields.push(key)
    }
  }
  
  return unknownFields
}
