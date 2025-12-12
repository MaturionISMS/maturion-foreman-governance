/**
 * Embodiment Sync Module
 * 
 * Synchronizes memory across Maturion embodiments (Foreman, ISMS Runtime, Command, Marketing).
 * 
 * Constitutional Alignment:
 * - Semantic Memory (SM) synced globally
 * - Episodic Memory (EM) shared across embodiments
 * - STM NOT synced (session-specific)
 * - LTM NOT synced (tenant-isolated)
 */

import { writeGovernanceMemory } from '../governance-memory'

/**
 * Memory Scope for sync
 */
export type MemoryScope = 'global' | 'foreman' | 'project'

/**
 * Conflict
 */
export interface Conflict {
  id: string
  embodimentA: string
  embodimentB: string
  scope: MemoryScope
  key: string
  valueA: any
  valueB: any
  timestamp: string
}

/**
 * Resolution Strategy
 */
export type ResolutionStrategy = 'last_write_wins' | 'manual' | 'merge'

/**
 * Sync Result
 */
export interface SyncResult {
  embodiment?: string
  scope?: MemoryScope
  synced: Array<{
    embodiment: string
    scope: MemoryScope
    entriesSynced: number
  }>
  conflicts: Conflict[]
  timestamp: string
}

/**
 * Sync Status
 */
export interface SyncStatus {
  lastSync: string
  embodiments: string[]
  conflicts: number
  pendingSync: boolean
}

/**
 * In-memory sync state
 */
const syncState: {
  lastSync: Map<string, string>
  conflicts: Conflict[]
} = {
  lastSync: new Map(),
  conflicts: []
}

/**
 * Simulated embodiment memory stores
 */
const embodimentStores: Map<string, Map<string, any>> = new Map([
  ['foreman', new Map()],
  ['isms_runtime', new Map()],
  ['command_maturion', new Map()],
  ['marketing_maturion', new Map()]
])

/**
 * Generate conflict ID
 */
function generateConflictId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `conflict_${timestamp}_${random}`
}

/**
 * Sync Memory Across Embodiments
 * 
 * Synchronizes shared memory (EM, SM) across embodiments.
 * STM and LTM are NOT synced.
 * 
 * @param scope - Memory scope to sync
 * @returns Sync result
 */
export async function syncMemoryAcrossEmbodiments(scope: MemoryScope): Promise<SyncResult> {
  const timestamp = new Date().toISOString()
  const synced: Array<{ embodiment: string; scope: MemoryScope; entriesSynced: number }> = []
  const conflicts: Conflict[] = []

  // Get all embodiments
  const embodiments = Array.from(embodimentStores.keys())

  // Collect all entries from all embodiments for this scope
  const allEntries: Map<string, { embodiment: string; value: any; timestamp: string }[]> = new Map()

  for (const embodiment of embodiments) {
    const store = embodimentStores.get(embodiment)!
    const scopeKey = `${scope}_memory`
    const entries = store.get(scopeKey) || []

    if (Array.isArray(entries)) {
      for (const entry of entries) {
        const key = entry.key || entry.id
        if (!allEntries.has(key)) {
          allEntries.set(key, [])
        }
        allEntries.get(key)!.push({
          embodiment,
          value: entry,
          timestamp: entry.metadata?.updatedAt || entry.metadata?.createdAt || timestamp
        })
      }
    }
  }

  // Detect conflicts and sync
  for (const [key, versions] of allEntries.entries()) {
    if (versions.length > 1) {
      // Multiple versions exist - check for conflicts
      const uniqueValues = new Set(versions.map(v => JSON.stringify(v.value)))
      
      if (uniqueValues.size > 1) {
        // Conflict detected
        const conflict: Conflict = {
          id: generateConflictId(),
          embodimentA: versions[0].embodiment,
          embodimentB: versions[1].embodiment,
          scope,
          key,
          valueA: versions[0].value,
          valueB: versions[1].value,
          timestamp
        }

        conflicts.push(conflict)
        syncState.conflicts.push(conflict)

        // Log conflict to governance memory
        await writeGovernanceMemory({
          category: 'drift_event',
          severity: 'medium',
          source: 'embodiment_sync',
          description: `Memory conflict detected between ${conflict.embodimentA} and ${conflict.embodimentB}`,
          data: { conflict },
          tags: ['conflict', 'sync']
        })
      }
    }

    // Sync: use last-write-wins by default
    const latest = versions.reduce((prev, current) =>
      new Date(current.timestamp) > new Date(prev.timestamp) ? current : prev
    )

    // Update all embodiments with latest value
    for (const embodiment of embodiments) {
      const store = embodimentStores.get(embodiment)!
      const scopeKey = `${scope}_memory`
      let entries = store.get(scopeKey) || []
      
      if (!Array.isArray(entries)) {
        entries = []
      }

      // Remove old version and add latest
      entries = entries.filter((e: any) => (e.key || e.id) !== key)
      entries.push(latest.value)
      
      store.set(scopeKey, entries)
    }
  }

  // Record sync status
  for (const embodiment of embodiments) {
    syncState.lastSync.set(embodiment, timestamp)
    synced.push({
      embodiment,
      scope,
      entriesSynced: allEntries.size
    })
  }

  // Log sync to governance memory
  await writeGovernanceMemory({
    category: 'audit_event',
    severity: 'low',
    source: 'embodiment_sync',
    description: `Memory sync completed for scope ${scope}`,
    data: {
      scope,
      embodiments,
      entriesSynced: allEntries.size,
      conflictsDetected: conflicts.length
    },
    tags: ['sync', 'embodiment']
  })

  return {
    scope,
    synced,
    conflicts,
    timestamp
  }
}

/**
 * Detect Conflict
 * 
 * Detects memory conflicts between two embodiments
 * 
 * @param embodimentA - First embodiment
 * @param embodimentB - Second embodiment
 * @returns Array of conflicts
 */
export async function detectConflict(embodimentA: string, embodimentB: string): Promise<Conflict[]> {
  const conflicts: Conflict[] = []
  const timestamp = new Date().toISOString()

  const storeA = embodimentStores.get(embodimentA)
  const storeB = embodimentStores.get(embodimentB)

  if (!storeA || !storeB) {
    return conflicts
  }

  // Compare all scopes
  const scopes: MemoryScope[] = ['global', 'foreman', 'project']

  for (const scope of scopes) {
    const scopeKey = `${scope}_memory`
    const entriesA = storeA.get(scopeKey) || []
    const entriesB = storeB.get(scopeKey) || []

    // Create key-value maps
    const mapA = new Map(
      (Array.isArray(entriesA) ? entriesA : []).map((e: any) => [(e.key || e.id), e])
    )
    const mapB = new Map(
      (Array.isArray(entriesB) ? entriesB : []).map((e: any) => [(e.key || e.id), e])
    )

    // Find conflicts
    for (const [key, valueA] of mapA.entries()) {
      if (mapB.has(key)) {
        const valueB = mapB.get(key)
        if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
          conflicts.push({
            id: generateConflictId(),
            embodimentA,
            embodimentB,
            scope,
            key,
            valueA,
            valueB,
            timestamp
          })
        }
      }
    }
  }

  return conflicts
}

/**
 * Resolve Conflict
 * 
 * Resolves a memory conflict using specified strategy
 * 
 * @param conflict - Conflict to resolve
 * @param strategy - Resolution strategy
 */
export async function resolveConflict(conflict: Conflict, strategy: ResolutionStrategy): Promise<void> {
  if (strategy === 'last_write_wins') {
    // Use timestamp to determine winner
    const timestampA = conflict.valueA?.metadata?.updatedAt || conflict.valueA?.metadata?.createdAt || ''
    const timestampB = conflict.valueB?.metadata?.updatedAt || conflict.valueB?.metadata?.createdAt || ''

    const winner = new Date(timestampA) > new Date(timestampB) ? conflict.valueA : conflict.valueB
    const winnerEmbodiment = new Date(timestampA) > new Date(timestampB) ? conflict.embodimentA : conflict.embodimentB

    // Update both embodiments with winner
    const storeA = embodimentStores.get(conflict.embodimentA)!
    const storeB = embodimentStores.get(conflict.embodimentB)!

    const scopeKey = `${conflict.scope}_memory`
    
    // Update embodimentA
    let entriesA = storeA.get(scopeKey) || []
    if (Array.isArray(entriesA)) {
      entriesA = entriesA.filter((e: any) => (e.key || e.id) !== conflict.key)
      entriesA.push(winner)
      storeA.set(scopeKey, entriesA)
    }

    // Update embodimentB
    let entriesB = storeB.get(scopeKey) || []
    if (Array.isArray(entriesB)) {
      entriesB = entriesB.filter((e: any) => (e.key || e.id) !== conflict.key)
      entriesB.push(winner)
      storeB.set(scopeKey, entriesB)
    }

    // Remove from conflicts
    syncState.conflicts = syncState.conflicts.filter(c => c.id !== conflict.id)

    // Log resolution
    await writeGovernanceMemory({
      category: 'audit_event',
      severity: 'low',
      source: 'embodiment_sync',
      description: `Conflict resolved: ${conflict.id} using ${strategy}`,
      data: {
        conflictId: conflict.id,
        strategy,
        winner: winnerEmbodiment
      },
      tags: ['conflict_resolution', 'sync']
    })
  } else if (strategy === 'manual') {
    // Manual resolution - log and wait for human intervention
    await writeGovernanceMemory({
      category: 'drift_event',
      severity: 'high',
      source: 'embodiment_sync',
      description: `Manual conflict resolution required: ${conflict.id}`,
      data: { conflict },
      tags: ['manual_resolution_required', 'conflict']
    })
  }
}

/**
 * Get Sync Status
 * 
 * @returns Current sync status
 */
export async function getSyncStatus(): Promise<SyncStatus> {
  const embodiments = Array.from(embodimentStores.keys())
  const lastSyncTimes = Array.from(syncState.lastSync.values())
  const lastSync = lastSyncTimes.length > 0 
    ? lastSyncTimes.reduce((a, b) => a > b ? a : b)
    : new Date().toISOString()

  return {
    lastSync,
    embodiments,
    conflicts: syncState.conflicts.length,
    pendingSync: syncState.conflicts.length > 0
  }
}

/**
 * Force Sync Embodiment
 * 
 * Forces a sync for a specific embodiment
 * 
 * @param embodiment - Embodiment to sync
 * @returns Sync result
 */
export async function forceSyncEmbodiment(embodiment: string): Promise<SyncResult> {
  const timestamp = new Date().toISOString()
  const synced: Array<{ embodiment: string; scope: MemoryScope; entriesSynced: number }> = []

  // Sync all scopes for this embodiment
  const scopes: MemoryScope[] = ['global', 'foreman', 'project']

  for (const scope of scopes) {
    const result = await syncMemoryAcrossEmbodiments(scope)
    const embodimentSync = result.synced.find(s => s.embodiment === embodiment)
    if (embodimentSync) {
      synced.push(embodimentSync)
    }
  }

  return {
    embodiment,
    synced,
    conflicts: syncState.conflicts,
    timestamp
  }
}
