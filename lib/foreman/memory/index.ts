/**
 * Memory API
 * High-level API for Unified Memory Fabric
 * Implements "Memory Before Action" doctrine
 */

import {
  MemoryEntry,
  MemoryScope,
  MemoryWriteContext,
  MemoryReadContext,
  MemoryEvent,
  MemoryEventType,
  MemoryQueryResult,
} from '@/types/memory'
import {
  writeMemory as storageWrite,
  readMemory as storageRead,
  deleteMemory as storageDelete,
  clearMemory as storageClear,
  getAllMemory as storageGetAll,
} from './storage'

/**
 * Load memory before action (Memory Before Action doctrine)
 * 
 * This function should be called before major orchestration actions
 * to load relevant context from the Unified Memory Fabric
 */
export async function loadMemoryBeforeAction(
  scope: MemoryScope,
  context: {
    tags?: string[]
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryQueryResult> {
  console.log(`[Memory] Loading memory before action (scope: ${scope})`)
  
  const readContext: MemoryReadContext = {
    scope,
    tags: context.tags,
    projectId: context.projectId,
    organisationId: context.organisationId,
  }
  
  const result = await storageRead(readContext)
  
  console.log(`[Memory] Loaded ${result.total} memory entries from ${scope} scope`)
  
  return result
}

/**
 * Write memory after action (Memory After Action doctrine)
 * 
 * This function should be called after major events to persist
 * important context to the Unified Memory Fabric
 */
export async function writeMemoryAfterAction(
  event: MemoryEvent,
  context: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry> {
  console.log(`[Memory] Writing memory after action (type: ${event.type}, scope: ${event.scope})`)
  
  // Create a more structured key with event type and random component for uniqueness
  const random = Math.random().toString(36).substring(2, 9)
  const timestamp = Date.now()
  
  const writeContext: MemoryWriteContext = {
    scope: event.scope,
    key: `${event.type}_${timestamp}_${random}`,
    value: {
      type: event.type,
      description: event.description,
      data: event.data,
      timestamp: event.timestamp,
    },
    tags: [event.type, 'event'],
    createdBy: event.createdBy,
    projectId: context.projectId,
    organisationId: context.organisationId,
  }
  
  const entry = await storageWrite(writeContext)
  
  console.log(`[Memory] Wrote memory entry: ${entry.id}`)
  
  return entry
}

/**
 * Write custom memory entry
 */
export async function writeMemoryEntry(
  scope: MemoryScope,
  key: string,
  value: any,
  options: {
    tags?: string[]
    createdBy: string
    projectId?: string
    organisationId?: string
  }
): Promise<MemoryEntry> {
  const writeContext: MemoryWriteContext = {
    scope,
    key,
    value,
    tags: options.tags,
    createdBy: options.createdBy,
    projectId: options.projectId,
    organisationId: options.organisationId,
  }
  
  return await storageWrite(writeContext)
}

/**
 * Read specific memory entry by key
 */
export async function readMemoryEntry(
  scope: MemoryScope,
  key: string,
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry | null> {
  const readContext: MemoryReadContext = {
    scope,
    key,
    projectId: options.projectId,
    organisationId: options.organisationId,
  }
  
  const result = await storageRead(readContext)
  
  return result.entries.length > 0 ? result.entries[0] : null
}

/**
 * Query memory entries by tags
 */
export async function queryMemoryByTags(
  scope: MemoryScope,
  tags: string[],
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryQueryResult> {
  const readContext: MemoryReadContext = {
    scope,
    tags,
    projectId: options.projectId,
    organisationId: options.organisationId,
  }
  
  return await storageRead(readContext)
}

/**
 * Delete memory entry
 */
export async function deleteMemoryEntry(
  scope: MemoryScope,
  key: string,
  projectId?: string
): Promise<boolean> {
  return await storageDelete(scope, key, projectId)
}

/**
 * Clear all memory in a scope
 */
export async function clearMemoryScope(
  scope: MemoryScope,
  projectId?: string
): Promise<number> {
  return await storageClear(scope, projectId)
}

/**
 * Get all memory (admin/debugging function)
 */
export async function getAllMemory() {
  return await storageGetAll()
}

/**
 * Helper: Record architecture decision
 */
export async function recordArchitectureDecision(
  description: string,
  data: any,
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry> {
  const event: MemoryEvent = {
    type: 'architecture_decision',
    scope: options.projectId ? 'project' : 'global',
    description,
    data,
    timestamp: new Date().toISOString(),
    createdBy: 'foreman',
  }
  
  return await writeMemoryAfterAction(event, options)
}

/**
 * Helper: Record wave completion
 */
export async function recordWaveCompletion(
  wave: string,
  data: any,
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry> {
  const event: MemoryEvent = {
    type: 'wave_completion',
    scope: 'foreman',
    description: `Completed wave: ${wave}`,
    data,
    timestamp: new Date().toISOString(),
    createdBy: 'foreman',
  }
  
  return await writeMemoryAfterAction(event, options)
}

/**
 * Helper: Record deployment
 */
export async function recordDeployment(
  environment: string,
  data: any,
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry> {
  const event: MemoryEvent = {
    type: 'deployment',
    scope: options.projectId ? 'project' : 'foreman',
    description: `Deployment to ${environment}`,
    data,
    timestamp: new Date().toISOString(),
    createdBy: 'foreman',
  }
  
  return await writeMemoryAfterAction(event, options)
}

/**
 * Helper: Record QA failure
 */
export async function recordQAFailure(
  description: string,
  data: any,
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry> {
  const event: MemoryEvent = {
    type: 'qa_failure',
    scope: 'foreman',
    description,
    data,
    timestamp: new Date().toISOString(),
    createdBy: 'qa-builder',
  }
  
  return await writeMemoryAfterAction(event, options)
}

/**
 * Helper: Record milestone completion
 */
export async function recordMilestoneCompletion(
  milestone: string,
  data: any,
  options: {
    projectId?: string
    organisationId?: string
  } = {}
): Promise<MemoryEntry> {
  const event: MemoryEvent = {
    type: 'milestone_completion',
    scope: 'project',
    description: `Completed milestone: ${milestone}`,
    data,
    timestamp: new Date().toISOString(),
    createdBy: 'foreman',
  }
  
  return await writeMemoryAfterAction(event, options)
}

/**
 * Re-export drift monitoring functions
 */
export {
  runDriftMonitoring,
  detectSchemaDrift,
  detectVersionDrift,
  detectContradictionDrift,
  detectStalenessDrift,
  detectCrossAgentDrift,
  detectProjectDrift,
  detectPatternDrift,
  detectGovernanceDrift,
  createMemorySnapshot
} from './drift-monitor'

/**
 * Re-export consolidation functions
 */
export {
  runConsolidation,
  generateKnowledgeBlocks,
  detectPatterns,
  collapseDuplicates,
  scoreEntrySignificance,
  archiveLowValueEntries,
  linkKnowledgeToGovernance,
  linkKnowledgeToProjects,
  shouldTriggerConsolidation
} from './consolidation-engine'
