/**
 * Parking Station Storage Service
 * 
 * Manages persistence and retrieval of parking station entries.
 * Foreman-exclusive write access with governance logging.
 */

import fs from 'fs/promises'
import path from 'path'
import type {
  ParkingStationEntry,
  ParkingStationFilter,
  ParkingStationStats,
  UpgradeStatus,
  UpgradeCategory,
  ImplementationWave,
} from '@/types/parking-station'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'

/**
 * Storage file location
 */
const STORAGE_FILE = path.join(
  process.cwd(),
  'memory',
  'foreman',
  'parking-station.json'
)

/**
 * Storage schema version
 */
const SCHEMA_VERSION = '1.0.0'

/**
 * Internal storage structure
 */
interface ParkingStationStorage {
  version: string
  lastUpdated: string
  totalEntries: number
  entries: ParkingStationEntry[]
}

/**
 * Initialize storage file if it doesn't exist
 */
async function ensureStorageExists(): Promise<void> {
  try {
    await fs.access(STORAGE_FILE)
  } catch {
    // File doesn't exist, create it
    const initialData: ParkingStationStorage = {
      version: SCHEMA_VERSION,
      lastUpdated: new Date().toISOString(),
      totalEntries: 0,
      entries: [],
    }
    
    await fs.mkdir(path.dirname(STORAGE_FILE), { recursive: true })
    await fs.writeFile(STORAGE_FILE, JSON.stringify(initialData, null, 2), 'utf-8')
    
    await logGovernanceEvent({
      type: 'parking_station_initialized',
      severity: 'info',
      description: 'Parking Station storage initialized',
      metadata: { file: STORAGE_FILE },
    })
  }
}

/**
 * Read storage file
 */
async function readStorage(): Promise<ParkingStationStorage> {
  await ensureStorageExists()
  const data = await fs.readFile(STORAGE_FILE, 'utf-8')
  return JSON.parse(data)
}

/**
 * Write storage file
 */
async function writeStorage(storage: ParkingStationStorage): Promise<void> {
  storage.lastUpdated = new Date().toISOString()
  storage.totalEntries = storage.entries.length
  await fs.writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2), 'utf-8')
}

/**
 * Add a new entry to the parking station
 * Foreman-exclusive operation
 */
export async function addEntry(entry: ParkingStationEntry): Promise<void> {
  const storage = await readStorage()
  
  // Check for duplicate ID
  if (storage.entries.some(e => e.id === entry.id)) {
    throw new Error(`Entry with ID ${entry.id} already exists`)
  }
  
  // Add entry
  storage.entries.push(entry)
  await writeStorage(storage)
  
  // Log to governance
  await logGovernanceEvent({
    type: 'parking_station_entry_created',
    severity: 'info',
    description: `Created parking station entry: ${entry.name}`,
    metadata: {
      entryId: entry.id,
      category: entry.category,
      source: entry.source,
      priority: entry.priority,
    },
  })
}

/**
 * Update an existing entry
 * Foreman-exclusive operation
 */
export async function updateEntry(
  id: string,
  updates: Partial<ParkingStationEntry>
): Promise<void> {
  const storage = await readStorage()
  
  const index = storage.entries.findIndex(e => e.id === id)
  if (index === -1) {
    throw new Error(`Entry with ID ${id} not found`)
  }
  
  const original = storage.entries[index]
  
  // Apply updates
  storage.entries[index] = {
    ...original,
    ...updates,
    id: original.id, // Preserve ID
    updatedAt: new Date().toISOString(),
  }
  
  await writeStorage(storage)
  
  // Log to governance
  await logGovernanceEvent({
    type: 'parking_station_entry_updated',
    severity: 'info',
    description: `Updated parking station entry: ${original.name}`,
    metadata: {
      entryId: id,
      updates: Object.keys(updates),
      statusChange: updates.status !== original.status ? {
        from: original.status,
        to: updates.status,
      } : undefined,
    },
  })
}

/**
 * Delete an entry
 * Foreman-exclusive operation
 */
export async function deleteEntry(id: string): Promise<void> {
  const storage = await readStorage()
  
  const index = storage.entries.findIndex(e => e.id === id)
  if (index === -1) {
    throw new Error(`Entry with ID ${id} not found`)
  }
  
  const entry = storage.entries[index]
  storage.entries.splice(index, 1)
  await writeStorage(storage)
  
  // Log to governance
  await logGovernanceEvent({
    type: 'parking_station_entry_deleted',
    severity: 'info',
    description: `Deleted parking station entry: ${entry.name}`,
    metadata: { entryId: id, name: entry.name },
  })
}

/**
 * Get a single entry by ID
 */
export async function getEntry(id: string): Promise<ParkingStationEntry | null> {
  const storage = await readStorage()
  return storage.entries.find(e => e.id === id) || null
}

/**
 * Get all entries with optional filtering
 */
export async function getAllEntries(
  filter?: ParkingStationFilter
): Promise<ParkingStationEntry[]> {
  const storage = await readStorage()
  let results = [...storage.entries]
  
  if (!filter) {
    return results
  }
  
  // Apply filters
  if (filter.category) {
    results = results.filter(e => e.category === filter.category)
  }
  
  if (filter.status) {
    results = results.filter(e => e.status === filter.status)
  }
  
  if (filter.source) {
    results = results.filter(e => e.source === filter.source)
  }
  
  if (filter.suggestedWave) {
    results = results.filter(e => e.suggestedWave === filter.suggestedWave)
  }
  
  if (filter.search) {
    const searchLower = filter.search.toLowerCase()
    results = results.filter(e =>
      e.name.toLowerCase().includes(searchLower) ||
      e.summary.toLowerCase().includes(searchLower) ||
      e.description?.toLowerCase().includes(searchLower) ||
      e.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }
  
  if (filter.tags && filter.tags.length > 0) {
    results = results.filter(e =>
      filter.tags!.some(tag => e.tags.includes(tag))
    )
  }
  
  if (filter.minPriority !== undefined) {
    results = results.filter(e => e.priority >= filter.minPriority!)
  }
  
  if (filter.maxPriority !== undefined) {
    results = results.filter(e => e.priority <= filter.maxPriority!)
  }
  
  // Sort by priority descending by default
  results.sort((a, b) => b.priority - a.priority)
  
  return results
}

/**
 * Get statistics about the parking station
 */
export async function getStats(): Promise<ParkingStationStats> {
  const storage = await readStorage()
  const entries = storage.entries
  
  const byStatus: Record<UpgradeStatus, number> = {
    'Parked': 0,
    'Promoted': 0,
    'Implemented': 0,
    'Rejected': 0,
  }
  
  const byCategory: Record<UpgradeCategory, number> = {
    'UI': 0,
    'Governance': 0,
    'Mutation Layer': 0,
    'Builders': 0,
    'QA': 0,
    'Memory': 0,
    'Architecture': 0,
    'Performance': 0,
    'Security': 0,
    'Documentation': 0,
    'Testing': 0,
    'Analytics': 0,
    'Workflow': 0,
    'Other': 0,
  }
  
  const byWave: Record<ImplementationWave, number> = {
    'Quick Win': 0,
    'Wave 1': 0,
    'Wave 2': 0,
    'Wave 3': 0,
    'Future': 0,
    'Backlog': 0,
  }
  
  let totalPriority = 0
  
  for (const entry of entries) {
    byStatus[entry.status]++
    byCategory[entry.category]++
    byWave[entry.suggestedWave]++
    totalPriority += entry.priority
  }
  
  return {
    total: entries.length,
    byStatus,
    byCategory,
    byWave,
    averagePriority: entries.length > 0 ? totalPriority / entries.length : 0,
    lastUpdated: storage.lastUpdated,
  }
}

/**
 * Bulk add entries (used by discovery engine)
 */
export async function bulkAddEntries(entries: ParkingStationEntry[]): Promise<void> {
  const storage = await readStorage()
  
  // Filter out duplicates
  const newEntries = entries.filter(
    e => !storage.entries.some(existing => existing.id === e.id)
  )
  
  if (newEntries.length === 0) {
    return
  }
  
  storage.entries.push(...newEntries)
  await writeStorage(storage)
  
  // Log to governance
  await logGovernanceEvent({
    type: 'parking_station_bulk_add',
    severity: 'info',
    description: `Bulk added ${newEntries.length} entries to parking station`,
    metadata: {
      count: newEntries.length,
      categories: [...new Set(newEntries.map(e => e.category))],
    },
  })
}

/**
 * Clear all entries (for testing purposes only)
 * Should not be used in production
 */
export async function clearAllEntries(): Promise<void> {
  const storage = await readStorage()
  storage.entries = []
  await writeStorage(storage)
  
  await logGovernanceEvent({
    type: 'parking_station_cleared',
    severity: 'high',
    description: 'All parking station entries cleared',
    metadata: { action: 'clear_all' },
  })
}
