/**
 * Memory Storage Layer
 * Handles reading and writing memory entries to JSON files
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  MemoryEntry,
  MemoryScope,
  MemoryWriteContext,
  MemoryReadContext,
  MemoryQueryResult,
  MemoryStorageConfig,
  MemoryMetadata,
} from '@/types/memory'

const DEFAULT_CONFIG: MemoryStorageConfig = {
  basePath: path.join(process.cwd(), 'memory'),
  enableVersionControl: true,
  maxEntriesPerFile: 100,
}

/**
 * Get the file path for a memory scope
 */
function getMemoryFilePath(scope: MemoryScope, projectId?: string): string {
  const basePath = DEFAULT_CONFIG.basePath
  
  switch (scope) {
    case 'global':
      return path.join(basePath, 'global', 'memory.json')
    case 'foreman':
      return path.join(basePath, 'foreman', 'memory.json')
    case 'project':
      if (!projectId) {
        throw new Error('projectId is required for project-scoped memory')
      }
      return path.join(basePath, 'projects', `${projectId}.json`)
    default:
      throw new Error(`Invalid memory scope: ${scope}`)
  }
}

/**
 * Ensure directory exists
 */
function ensureDirectoryExists(filePath: string): void {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * Read all memory entries from a file
 */
function readMemoryFile(filePath: string): MemoryEntry[] {
  try {
    ensureDirectoryExists(filePath)
    
    if (!fs.existsSync(filePath)) {
      return []
    }
    
    const content = fs.readFileSync(filePath, 'utf-8')
    if (!content.trim()) {
      return []
    }
    
    const data = JSON.parse(content)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`[Memory Storage] Error reading ${filePath}:`, error)
    return []
  }
}

/**
 * Write memory entries to a file
 */
function writeMemoryFile(filePath: string, entries: MemoryEntry[]): void {
  try {
    ensureDirectoryExists(filePath)
    
    const content = JSON.stringify(entries, null, 2)
    fs.writeFileSync(filePath, content, 'utf-8')
  } catch (error) {
    console.error(`[Memory Storage] Error writing ${filePath}:`, error)
    throw error
  }
}

/**
 * Generate a unique ID for a memory entry
 */
function generateMemoryId(scope: MemoryScope, key: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `${scope}_${key}_${timestamp}_${random}`.replace(/[^a-zA-Z0-9_-]/g, '_')
}

/**
 * Write a memory entry
 */
export async function writeMemory(context: MemoryWriteContext): Promise<MemoryEntry> {
  const filePath = getMemoryFilePath(context.scope, context.projectId)
  const entries = readMemoryFile(filePath)
  
  // Check if entry with this key already exists
  const existingIndex = entries.findIndex(
    (e) => e.scope === context.scope && e.key === context.key
  )
  
  const now = new Date().toISOString()
  
  let entry: MemoryEntry
  
  if (existingIndex >= 0) {
    // Update existing entry
    const existing = entries[existingIndex]
    entry = {
      ...existing,
      value: context.value,
      tags: context.tags || existing.tags,
      metadata: {
        ...existing.metadata,
        updatedAt: now,
        version: existing.metadata.version + 1,
      },
    }
    entries[existingIndex] = entry
  } else {
    // Create new entry
    const metadata: MemoryMetadata = {
      createdAt: now,
      updatedAt: now,
      createdBy: context.createdBy,
      version: 1,
    }
    
    entry = {
      id: generateMemoryId(context.scope, context.key),
      scope: context.scope,
      key: context.key,
      value: context.value,
      metadata,
      tags: context.tags,
    }
    
    entries.push(entry)
  }
  
  writeMemoryFile(filePath, entries)
  
  return entry
}

/**
 * Read memory entries
 */
export async function readMemory(context: MemoryReadContext): Promise<MemoryQueryResult> {
  const filePath = getMemoryFilePath(context.scope, context.projectId)
  let entries = readMemoryFile(filePath)
  
  // Filter by key if provided
  if (context.key) {
    entries = entries.filter((e) => e.key === context.key)
  }
  
  // Filter by tags if provided
  if (context.tags && context.tags.length > 0) {
    entries = entries.filter((e) => {
      if (!e.tags || e.tags.length === 0) return false
      return context.tags!.some((tag) => e.tags && e.tags.includes(tag))
    })
  }
  
  return {
    entries,
    total: entries.length,
    scope: context.scope,
  }
}

/**
 * Delete a memory entry by key
 */
export async function deleteMemory(
  scope: MemoryScope,
  key: string,
  projectId?: string
): Promise<boolean> {
  const filePath = getMemoryFilePath(scope, projectId)
  const entries = readMemoryFile(filePath)
  
  const filteredEntries = entries.filter(
    (e) => !(e.scope === scope && e.key === key)
  )
  
  if (filteredEntries.length === entries.length) {
    return false // Entry not found
  }
  
  writeMemoryFile(filePath, filteredEntries)
  return true
}

/**
 * Clear all memory entries in a scope
 */
export async function clearMemory(scope: MemoryScope, projectId?: string): Promise<number> {
  const filePath = getMemoryFilePath(scope, projectId)
  const entries = readMemoryFile(filePath)
  const count = entries.length
  
  writeMemoryFile(filePath, [])
  return count
}

/**
 * Get all memory entries across all scopes (for debugging/admin)
 */
export async function getAllMemory(): Promise<{
  global: MemoryEntry[]
  foreman: MemoryEntry[]
  projects: Record<string, MemoryEntry[]>
}> {
  const globalEntries = readMemoryFile(getMemoryFilePath('global'))
  const foremanEntries = readMemoryFile(getMemoryFilePath('foreman'))
  
  // Read all project files
  const projectsDir = path.join(DEFAULT_CONFIG.basePath, 'projects')
  const projects: Record<string, MemoryEntry[]> = {}
  
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir)
    for (const file of files) {
      if (file.endsWith('.json')) {
        const projectId = file.replace('.json', '')
        const filePath = path.join(projectsDir, file)
        projects[projectId] = readMemoryFile(filePath)
      }
    }
  }
  
  return {
    global: globalEntries,
    foreman: foremanEntries,
    projects,
  }
}
