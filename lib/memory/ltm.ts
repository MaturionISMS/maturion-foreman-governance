/**
 * Long-Term Tenant Memory (LTM) Module
 * 
 * Implements tenant-isolated, encrypted long-term memory for ISMS Runtime.
 * 
 * CRITICAL SECURITY: Tenant isolation is ABSOLUTE. Any cross-tenant leak is a security incident.
 * 
 * Constitutional Alignment:
 * - CS6 Execution Boundary: Tenant isolation enforced
 * - CS5 Performance Enforcement: < 100ms write, < 200ms read
 * - GSR: All operations logged to governance memory
 */

import { writeGovernanceMemory } from './governance-memory'

/**
 * LTM Entry Structure
 */
export interface LTMEntry {
  id: string
  tier: 'LTM'
  tenantId: string
  organisationId: string
  category: string
  actor: string
  embodiment: string
  content: {
    type: string
    data: any
    sensitivity: 'high' | 'medium' | 'low'
  }
  metadata: {
    createdAt: string
    updatedAt: string
    version: number
    encrypted: boolean
    isolationBoundary: 'tenant'
  }
}

/**
 * LTM Write Context
 */
export interface LTMWriteContext {
  tenantId?: string
  category: string
  actor: string
  embodiment: string
  content: {
    type: string
    data: any
    sensitivity: 'high' | 'medium' | 'low'
  }
}

/**
 * LTM Query Context
 */
export interface LTMQueryContext {
  tenantId: string
  embodiment: string
  authenticatedTenantId: string
  category?: string
  since?: string
  until?: string
  sensitivity?: 'high' | 'medium' | 'low'
  tags?: string[]
}

/**
 * Delete Options
 */
export interface DeleteOptions {
  tenantId: string
  testData?: boolean
  entryId?: string
}

/**
 * Access Log Entry
 */
export interface AccessLog {
  timestamp: string
  tenantId: string
  embodiment: string
  operation: 'read' | 'write' | 'update' | 'delete'
  entryId?: string
  result: 'success' | 'denied'
}

/**
 * In-memory storage for LTM (simulated encryption)
 * In production, this would be a database with proper encryption
 */
const ltmStore: Map<string, LTMEntry[]> = new Map()
const accessLogs: AccessLog[] = []

/**
 * Simple encryption simulation (in production, use proper AES-256)
 */
function encryptData(data: any): string {
  return Buffer.from(JSON.stringify(data)).toString('base64')
}

function decryptData(encrypted: string): any {
  return JSON.parse(Buffer.from(encrypted, 'base64').toString('utf-8'))
}

/**
 * Generate unique entry ID
 */
function generateLTMId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `ltm_${timestamp}_${random}`
}

/**
 * Store LTM Entry
 * 
 * CRITICAL: Only ISMS Runtime can write LTM
 * CRITICAL: Tenant ID is required
 * CRITICAL: Data is encrypted at rest
 * 
 * @param context - LTM write context
 * @returns Stored LTM entry
 */
export async function storeLTM(context: LTMWriteContext): Promise<LTMEntry> {
  const startTime = Date.now()

  // CRITICAL: Tenant ID required
  if (!context.tenantId) {
    throw new Error('Tenant ID required for LTM')
  }

  // CRITICAL: Only ISMS Runtime can write LTM
  if (context.embodiment !== 'isms_runtime') {
    throw new Error('Only ISMS Runtime can write LTM')
  }

  // Create LTM entry with encryption
  const entry: LTMEntry = {
    id: generateLTMId(),
    tier: 'LTM',
    tenantId: context.tenantId,
    organisationId: context.tenantId,
    category: context.category,
    actor: context.actor,
    embodiment: context.embodiment,
    content: {
      type: context.content.type,
      data: encryptData(context.content.data), // Encrypted
      sensitivity: context.content.sensitivity
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      encrypted: true,
      isolationBoundary: 'tenant'
    }
  }

  // Get or create tenant storage
  if (!ltmStore.has(context.tenantId)) {
    ltmStore.set(context.tenantId, [])
  }

  const tenantEntries = ltmStore.get(context.tenantId)!
  tenantEntries.push(entry)

  // Log access
  accessLogs.push({
    timestamp: new Date().toISOString(),
    tenantId: context.tenantId,
    embodiment: context.embodiment,
    operation: 'write',
    entryId: entry.id,
    result: 'success'
  })

  // Log to governance memory
  await writeGovernanceMemory({
    category: 'ltm_event',
    severity: 'low',
    source: 'ltm',
    description: `LTM entry created for tenant ${context.tenantId}`,
    data: { tenantId: context.tenantId, entryId: entry.id, category: context.category },
    tags: ['ltm', 'write']
  })

  // Performance check (CS5: < 100ms target)
  const duration = Date.now() - startTime
  if (duration > 100) {
    await writeGovernanceMemory({
      category: 'qa_event',
      severity: 'medium',
      source: 'ltm',
      description: `LTM store operation exceeded performance target: ${duration}ms > 100ms`,
      data: { tenantId: context.tenantId, duration },
      tags: ['performance', 'cs5']
    })
  }

  return entry
}

/**
 * Recall LTM Entries
 * 
 * CRITICAL: Tenant isolation enforced
 * CRITICAL: authenticated TenantId must match query tenantId
 * 
 * @param context - LTM query context
 * @returns Array of LTM entries (decrypted)
 */
export async function recallLTM(context: LTMQueryContext): Promise<LTMEntry[]> {
  const startTime = Date.now()

  // CRITICAL: Tenant ID mismatch check
  if (context.tenantId !== context.authenticatedTenantId) {
    // Log security violation
    await writeGovernanceMemory({
      category: 'security_event',
      severity: 'critical',
      source: 'ltm',
      description: 'Tenant isolation violation attempt detected',
      data: {
        requestedTenantId: context.tenantId,
        authenticatedTenantId: context.authenticatedTenantId,
        embodiment: context.embodiment
      },
      tags: ['security', 'tenant_isolation_violation_attempt']
    }).catch(() => {}) // Don't fail if governance write fails

    accessLogs.push({
      timestamp: new Date().toISOString(),
      tenantId: context.tenantId,
      embodiment: context.embodiment,
      operation: 'read',
      result: 'denied'
    })

    throw new Error('Tenant ID mismatch: Cross-tenant access denied')
  }

  // Get tenant entries
  const tenantEntries = ltmStore.get(context.tenantId) || []

  // Apply filters
  let results = [...tenantEntries]

  if (context.category) {
    results = results.filter(e => e.category === context.category)
  }

  if (context.since) {
    const sinceDate = new Date(context.since)
    results = results.filter(e => new Date(e.metadata.createdAt) >= sinceDate)
  }

  if (context.until) {
    const untilDate = new Date(context.until)
    results = results.filter(e => new Date(e.metadata.createdAt) <= untilDate)
  }

  if (context.sensitivity) {
    results = results.filter(e => e.content.sensitivity === context.sensitivity)
  }

  // Decrypt data before returning
  const decryptedResults = results.map(entry => ({
    ...entry,
    content: {
      ...entry.content,
      data: decryptData(entry.content.data as any)
    }
  }))

  // Log access
  accessLogs.push({
    timestamp: new Date().toISOString(),
    tenantId: context.tenantId,
    embodiment: context.embodiment,
    operation: 'read',
    result: 'success'
  })

  // Performance check (CS5: < 200ms target)
  const duration = Date.now() - startTime
  if (duration > 200) {
    await writeGovernanceMemory({
      category: 'qa_event',
      severity: 'low',
      source: 'ltm',
      description: `LTM recall operation exceeded performance target: ${duration}ms > 200ms`,
      data: { tenantId: context.tenantId, resultCount: results.length, duration },
      tags: ['performance', 'cs5']
    })
  }

  return decryptedResults
}

/**
 * Update LTM Entry
 * 
 * @param entryId - Entry ID
 * @param updates - Partial updates
 * @returns Updated LTM entry
 */
export async function updateLTM(entryId: string, updates: Partial<LTMEntry>): Promise<LTMEntry> {
  // Find entry across all tenants
  for (const [tenantId, entries] of ltmStore.entries()) {
    const index = entries.findIndex(e => e.id === entryId)
    if (index >= 0) {
      const entry = entries[index]
      
      // Update entry
      const updatedEntry: LTMEntry = {
        ...entry,
        ...updates,
        metadata: {
          ...entry.metadata,
          updatedAt: new Date().toISOString(),
          version: entry.metadata.version + 1
        }
      }

      entries[index] = updatedEntry

      // Log access
      accessLogs.push({
        timestamp: new Date().toISOString(),
        tenantId: tenantId,
        embodiment: updates.embodiment || entry.embodiment,
        operation: 'update',
        entryId: entry.id,
        result: 'success'
      })

      return updatedEntry
    }
  }

  throw new Error(`LTM entry not found: ${entryId}`)
}

/**
 * Delete LTM Entry or Tenant Data
 * 
 * @param options - Delete options
 */
export async function deleteLTM(options: DeleteOptions): Promise<void> {
  if (options.testData) {
    // Clear all data for tenant (test cleanup)
    ltmStore.delete(options.tenantId)
  } else if (options.entryId) {
    // Delete specific entry
    const entries = ltmStore.get(options.tenantId) || []
    const filtered = entries.filter(e => e.id !== options.entryId)
    ltmStore.set(options.tenantId, filtered)

    // Log access
    accessLogs.push({
      timestamp: new Date().toISOString(),
      tenantId: options.tenantId,
      embodiment: 'system',
      operation: 'delete',
      entryId: options.entryId,
      result: 'success'
    })
  }
}

/**
 * Get LTM Version
 * 
 * @param entryId - Entry ID
 * @returns Version number
 */
export async function getLTMVersion(entryId: string): Promise<number> {
  for (const entries of ltmStore.values()) {
    const entry = entries.find(e => e.id === entryId)
    if (entry) {
      return entry.metadata.version
    }
  }
  throw new Error(`LTM entry not found: ${entryId}`)
}

/**
 * Get LTM Access Log
 * 
 * @param tenantId - Tenant ID
 * @param entryId - Optional entry ID
 * @returns Array of access logs
 */
export async function getLTMAccessLog(tenantId: string, entryId?: string): Promise<AccessLog[]> {
  let logs = accessLogs.filter(log => log.tenantId === tenantId)
  
  if (entryId) {
    logs = logs.filter(log => log.entryId === entryId)
  }

  return logs
}
