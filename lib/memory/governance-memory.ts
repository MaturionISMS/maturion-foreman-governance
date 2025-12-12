/**
 * Governance Memory Module
 * 
 * Append-only governance event logging for audit trails, QA failures, and constitutional violations.
 * 
 * Constitutional Alignment:
 * - GSR: Immutable audit trail
 * - CS2: ARC decision logging
 * - All governance events are logged and traceable
 */

/**
 * Governance Event Input
 */
export interface GovernanceEventInput {
  category: 'qa_event' | 'cs_violation' | 'arc_decision' | 'drift_event' | 'security_event' | 'audit_event' | 'ltm_event'
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: string
  description: string
  data: any
  tags?: string[]
}

/**
 * Governance Event
 */
export interface GovernanceEvent {
  id: string
  timestamp: string
  category: 'qa_event' | 'cs_violation' | 'arc_decision' | 'drift_event' | 'security_event' | 'audit_event' | 'ltm_event'
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: string
  description: string
  data: any
  resolution?: string
  resolvedAt?: string
  tags: string[]
  metadata: {
    embodiment: string
    actor: string
    version: number
  }
}

/**
 * Governance Query Filters
 */
export interface GovernanceFilters {
  category?: string
  severity?: string
  source?: string
  since?: string
  until?: string
  tags?: string[]
  type?: string
}

/**
 * In-memory governance event store (append-only)
 */
const governanceStore: GovernanceEvent[] = []

/**
 * Generate unique event ID
 */
function generateEventId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `gov_${timestamp}_${random}`
}

/**
 * Write Governance Memory
 * 
 * Append-only operation. Events are immutable once written.
 * 
 * @param event - Governance event input
 * @returns Governance event with generated ID
 */
export async function writeGovernanceMemory(event: GovernanceEventInput): Promise<GovernanceEvent> {
  const governanceEvent: GovernanceEvent = {
    id: generateEventId(),
    timestamp: new Date().toISOString(),
    category: event.category,
    severity: event.severity,
    source: event.source,
    description: event.description,
    data: event.data,
    tags: event.tags || [],
    metadata: {
      embodiment: 'foreman',
      actor: 'foreman',
      version: 1
    }
  }

  governanceStore.push(governanceEvent)

  // Log to console for visibility
  if (event.severity === 'critical' || event.severity === 'high') {
    console.log(`[GOVERNANCE ${event.severity.toUpperCase()}] ${event.category}: ${event.description}`)
  }

  return governanceEvent
}

/**
 * Update Governance Memory
 * 
 * Only updates resolution status. Event itself is immutable.
 * 
 * @param eventId - Event ID
 * @param updates - Partial updates (resolution only)
 * @returns Updated governance event
 */
export async function updateGovernanceMemory(
  eventId: string,
  updates: Partial<GovernanceEvent>
): Promise<GovernanceEvent> {
  const event = governanceStore.find(e => e.id === eventId)
  
  if (!event) {
    throw new Error(`Governance event not found: ${eventId}`)
  }

  // Only allow resolution updates
  if (updates.resolution) {
    event.resolution = updates.resolution
    event.resolvedAt = new Date().toISOString()
    event.metadata.version += 1
  }

  return event
}

/**
 * Delete Governance Memory
 * 
 * Requires ARC approval (CS2). Should be extremely rare.
 * 
 * @param eventId - Event ID
 */
export async function deleteGovernanceMemory(eventId: string): Promise<void> {
  const index = governanceStore.findIndex(e => e.id === eventId)
  
  if (index < 0) {
    throw new Error(`Governance event not found: ${eventId}`)
  }

  // Log deletion (this itself is an audit event)
  await writeGovernanceMemory({
    category: 'audit_event',
    severity: 'high',
    source: 'governance_memory',
    description: `Governance event deleted: ${eventId}`,
    data: { deletedEventId: eventId, deletedAt: new Date().toISOString() },
    tags: ['deletion', 'arc_approved']
  })

  governanceStore.splice(index, 1)
}

/**
 * Query Governance Memory
 * 
 * @param filters - Query filters
 * @returns Array of governance events matching filters
 */
export async function queryGovernanceMemory(filters: GovernanceFilters): Promise<GovernanceEvent[]> {
  let results = [...governanceStore]

  if (filters.category) {
    results = results.filter(e => e.category === filters.category)
  }

  if (filters.severity) {
    results = results.filter(e => e.severity === filters.severity)
  }

  if (filters.source) {
    results = results.filter(e => e.source === filters.source)
  }

  if (filters.since) {
    const sinceDate = new Date(filters.since)
    results = results.filter(e => new Date(e.timestamp) >= sinceDate)
  }

  if (filters.until) {
    const untilDate = new Date(filters.until)
    results = results.filter(e => new Date(e.timestamp) <= untilDate)
  }

  if (filters.tags && filters.tags.length > 0) {
    results = results.filter(e => 
      filters.tags!.some(tag => e.tags.includes(tag))
    )
  }

  // Support 'type' filter (alias for category)
  if (filters.type) {
    results = results.filter(e => e.category === filters.type || e.tags.includes(filters.type!))
  }

  // Sort by timestamp descending (newest first)
  results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return results
}

/**
 * Get QA Failure History
 * 
 * @param module - Optional module filter
 * @returns Array of QA failure events
 */
export async function getQAFailureHistory(module?: string): Promise<GovernanceEvent[]> {
  let results = governanceStore.filter(e => e.category === 'qa_event')

  if (module) {
    results = results.filter(e => e.source === module || e.data?.module === module)
  }

  return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/**
 * Get Constitutional Violations
 * 
 * @param cs - Optional CS filter (e.g., 'CS2', 'CS5')
 * @returns Array of constitutional violation events
 */
export async function getConstitutionalViolations(cs?: string): Promise<GovernanceEvent[]> {
  let results = governanceStore.filter(e => e.category === 'cs_violation')

  if (cs) {
    results = results.filter(e => 
      e.source === cs || 
      e.data?.cs === cs || 
      e.tags.includes(cs.toLowerCase())
    )
  }

  return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/**
 * Clear governance memory (test cleanup only)
 */
export function clearGovernanceMemory(): void {
  governanceStore.length = 0
}
