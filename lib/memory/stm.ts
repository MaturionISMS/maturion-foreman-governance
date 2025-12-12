/**
 * Short-Term Memory (STM) Module
 * 
 * Implements volatile, session-based memory for Maturion embodiments.
 * Memory persists only during active sessions and is automatically cleared.
 * 
 * Constitutional Alignment:
 * - CS6 Execution Boundary: Session isolation enforced
 * - CS5 Performance Enforcement: < 10ms write, < 50ms read
 * - GSR: All operations auditable
 */

import { writeGovernanceMemory } from './governance-memory'

/**
 * STM Entry Structure
 */
export interface STMEntry {
  id: string
  tier: 'STM'
  sessionId: string
  category: 'conversation' | 'active_task' | 'reasoning_trace'
  actor: string
  embodiment: string
  content: {
    type: string
    data: any
  }
  metadata: {
    createdAt: string
    expiresAt: string
    priority?: 'high' | 'medium' | 'low'
    volatile: true
  }
}

/**
 * STM Write Context
 */
export interface STMWriteContext {
  sessionId: string
  category: 'conversation' | 'active_task' | 'reasoning_trace'
  actor: string
  embodiment: string
  content: {
    type: string
    data: any
  }
  metadata?: {
    priority?: 'high' | 'medium' | 'low'
  }
}

/**
 * STM Query Context (combining sessionId with filters)
 */
export interface STMQueryContext {
  sessionId: string
  category?: string
  actor?: string
  since?: string
  tags?: string[]
  limit?: number
}

/**
 * STM Query Filters
 */
export interface STMFilters {
  category?: string
  actor?: string
  since?: string
  tags?: string[]
  limit?: number
}

/**
 * Prune Strategy
 */
export type PruneStrategy = 'oldest' | 'lowest_priority' | 'all'

/**
 * In-memory storage for STM (volatile)
 * Key: sessionId -> Array of STMEntry
 */
const stmStore: Map<string, STMEntry[]> = new Map()

/**
 * Session size limits (CS5 Performance Enforcement)
 */
const MAX_SESSION_SIZE_MB = 10
const PRUNE_THRESHOLD_MB = 8
const MAX_ENTRY_SIZE_MB = 1

/**
 * Calculate size of an object in MB (or bytes for smaller objects)
 */
function calculateSizeMB(obj: any): number {
  const str = JSON.stringify(obj)
  // Use Buffer.byteLength in Node.js environment
  const bytes = Buffer.byteLength(str, 'utf8')
  return bytes / (1024 * 1024)
}

/**
 * Calculate size in bytes
 */
function calculateSizeBytes(obj: any): number {
  const str = JSON.stringify(obj)
  return Buffer.byteLength(str, 'utf8')
}

/**
 * Generate unique entry ID
 */
function generateEntryId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `stm_${timestamp}_${random}`
}

/**
 * Calculate expiry time (just under 24 hours from now to avoid boundary issues)
 */
function calculateExpiryTime(): string {
  const expiry = new Date()
  expiry.setTime(expiry.getTime() + (24 * 60 * 60 * 1000) - 1) // 24 hours minus 1ms
  return expiry.toISOString()
}

/**
 * Store STM Entry
 * 
 * @param context - STM write context
 * @returns Stored STM entry
 * @throws Error if session memory limit exceeded or content too large
 */
export async function storeSTM(context: STMWriteContext): Promise<STMEntry> {
  const startTime = Date.now()

  // Validate sessionId
  if (!context.sessionId || typeof context.sessionId !== 'string') {
    throw new Error('InvalidSessionIdError: sessionId is required and must be a string')
  }

  // Validate content size (CS5)
  const contentSize = calculateSizeMB(context.content)
  if (contentSize > MAX_ENTRY_SIZE_MB) {
    throw new Error(`ContentTooLargeError: Content size ${contentSize.toFixed(2)}MB exceeds limit of ${MAX_ENTRY_SIZE_MB}MB`)
  }

  // Create STM entry
  const entry: STMEntry = {
    id: generateEntryId(),
    tier: 'STM',
    sessionId: context.sessionId,
    category: context.category,
    actor: context.actor,
    embodiment: context.embodiment,
    content: context.content,
    metadata: {
      createdAt: new Date().toISOString(),
      expiresAt: calculateExpiryTime(),
      priority: context.metadata?.priority || 'medium',
      volatile: true
    }
  }

  // Get or create session storage
  if (!stmStore.has(context.sessionId)) {
    stmStore.set(context.sessionId, [])
  }

  const sessionEntries = stmStore.get(context.sessionId)!

  // Check session size limit (CS5)
  const currentSize = calculateSizeMB(sessionEntries)
  const newSize = currentSize + calculateSizeMB(entry)

  if (newSize > MAX_SESSION_SIZE_MB) {
    // Try auto-pruning
    const prunedCount = await pruneSTM(context.sessionId, 'oldest')
    const sizeAfterPrune = calculateSizeMB(stmStore.get(context.sessionId)!)

    if (sizeAfterPrune + calculateSizeMB(entry) > MAX_SESSION_SIZE_MB) {
      throw new Error(`SessionMemoryLimitError: Session memory limit of ${MAX_SESSION_SIZE_MB}MB exceeded even after pruning ${prunedCount} entries`)
    }
  }

  // Store entry
  sessionEntries.push(entry)

  // Check if should prune (CS5)
  if (newSize > PRUNE_THRESHOLD_MB) {
    // Prune lowest priority or oldest entries
    await pruneSTM(context.sessionId, 'lowest_priority')
  }

  // Performance check (CS5: < 10ms target)
  const duration = Date.now() - startTime
  if (duration > 10) {
    await writeGovernanceMemory({
      category: 'qa_event',
      severity: 'medium',
      source: 'stm',
      description: `STM store operation exceeded performance target: ${duration}ms > 10ms`,
      data: { sessionId: context.sessionId, duration },
      tags: ['performance', 'cs5']
    })
  }

  return entry
}

/**
 * Recall STM Entries
 * 
 * Supports both old signature (sessionId, filters) and new signature (context object)
 * 
 * @param contextOrSessionId - STM query context or session ID string
 * @param filters - Optional filters (if sessionId provided as first param)
 * @returns Array of STM entries matching filters
 */
export async function recallSTM(
  contextOrSessionId: STMQueryContext | string,
  filters?: STMFilters
): Promise<STMEntry[]> {
  const startTime = Date.now()

  // Handle both signatures
  let sessionId: string
  let queryFilters: STMFilters = {}

  if (typeof contextOrSessionId === 'string') {
    // Old signature: recallSTM(sessionId, filters)
    sessionId = contextOrSessionId
    queryFilters = filters || {}
  } else {
    // New signature: recallSTM({ sessionId, category, ... })
    sessionId = contextOrSessionId.sessionId
    queryFilters = contextOrSessionId
  }

  // Validate sessionId
  if (!sessionId || typeof sessionId !== 'string') {
    throw new Error('SessionNotFoundError: sessionId is required')
  }

  // Get session entries
  const sessionEntries = stmStore.get(sessionId) || []

  // Filter out expired entries automatically
  const now = new Date()
  let results = sessionEntries.filter(e => new Date(e.metadata.expiresAt) > now)

  // Apply filters
  if (queryFilters.category) {
    results = results.filter(e => e.category === queryFilters.category)
  }
  if (queryFilters.actor) {
    results = results.filter(e => e.actor === queryFilters.actor)
  }
  if (queryFilters.since) {
    const sinceDate = new Date(queryFilters.since)
    results = results.filter(e => new Date(e.metadata.createdAt) >= sinceDate)
  }

  // Sort by createdAt descending (newest first)
  results.sort((a, b) => 
    new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime()
  )

  // Apply limit if specified
  if (queryFilters.limit && queryFilters.limit > 0) {
    results = results.slice(0, queryFilters.limit)
  }

  // Performance check (CS5: < 50ms target)
  const duration = Date.now() - startTime
  if (duration > 50) {
    await writeGovernanceMemory({
      category: 'qa_event',
      severity: 'low',
      source: 'stm',
      description: `STM recall operation exceeded performance target: ${duration}ms > 50ms`,
      data: { sessionId, resultCount: results.length, duration },
      tags: ['performance', 'cs5']
    })
  }

  return results
}

/**
 * Prune STM Entries
 * 
 * Removes entries based on strategy to free memory
 * 
 * @param sessionId - Session ID
 * @param strategy - Pruning strategy ('oldest', 'lowest_priority', 'all')
 * @returns Number of entries pruned
 */
export async function pruneSTM(sessionId: string, strategy: PruneStrategy): Promise<number> {
  if (!stmStore.has(sessionId)) {
    return 0
  }

  const sessionEntries = stmStore.get(sessionId)!
  const originalCount = sessionEntries.length

  if (strategy === 'all') {
    stmStore.set(sessionId, [])
    return originalCount
  }

  if (strategy === 'oldest') {
    // Sort by age and remove oldest 20%
    const sorted = [...sessionEntries].sort((a, b) => 
      new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime()
    )
    const pruneCount = Math.ceil(sessionEntries.length * 0.2)
    stmStore.set(sessionId, sorted.slice(pruneCount))
    return pruneCount
  }

  if (strategy === 'lowest_priority') {
    // Keep high priority, remove 50% of low and 20% of medium
    const highPriority = sessionEntries.filter(e => e.metadata.priority === 'high')
    const mediumPriority = sessionEntries.filter(e => e.metadata.priority === 'medium')
    const lowPriority = sessionEntries.filter(e => e.metadata.priority === 'low')

    // Keep most recent entries within each priority
    const keepMediumCount = Math.ceil(mediumPriority.length * 0.8) // Keep 80%
    const keepLowCount = Math.ceil(lowPriority.length * 0.5) // Keep 50%
    
    // Sort by timestamp to keep most recent
    const sortedMedium = mediumPriority.sort((a, b) => 
      new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime()
    )
    const sortedLow = lowPriority.sort((a, b) => 
      new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime()
    )

    const remaining = [
      ...highPriority,
      ...sortedMedium.slice(0, keepMediumCount),
      ...sortedLow.slice(0, keepLowCount)
    ]
    
    stmStore.set(sessionId, remaining)
    return originalCount - remaining.length
  }

  return 0
}

/**
 * Clear STM Session
 * 
 * Removes all entries for a session
 * 
 * @param sessionId - Session ID
 */
export async function clearSTMSession(sessionId: string): Promise<void> {
  stmStore.delete(sessionId)
}

/**
 * Get STM Session Size
 * 
 * @param sessionId - Session ID
 * @returns Number of entries in session
 */
export async function getSTMSize(sessionId: string): Promise<number> {
  const sessionEntries = stmStore.get(sessionId) || []
  return sessionEntries.length
}

/**
 * Auto-expiry check (should be called periodically)
 * Removes expired entries
 */
export async function runSTMExpiryCheck(): Promise<number> {
  let expiredCount = 0
  const now = new Date()

  for (const [sessionId, entries] of stmStore.entries()) {
    const validEntries = entries.filter(e => new Date(e.metadata.expiresAt) > now)
    const removed = entries.length - validEntries.length

    if (removed > 0) {
      stmStore.set(sessionId, validEntries)
      expiredCount += removed
    }

    // Remove empty sessions
    if (validEntries.length === 0) {
      stmStore.delete(sessionId)
    }
  }

  return expiredCount
}
