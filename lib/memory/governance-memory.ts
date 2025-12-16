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
  category: 'qa_event' | 'cs_violation' | 'arc_decision' | 'drift_event' | 'security_event' | 'audit_event' | 'ltm_event' | 'constitutional_event' | 'incident'
  actor: string
  content: {
    type: string
    description: string
    [key: string]: any
  }
  metadata?: {
    [key: string]: any
  }
  tags?: string[]
}

/**
 * Governance Event
 */
export interface GovernanceEvent {
  id: string
  tier: string
  timestamp: string
  category: 'qa_event' | 'cs_violation' | 'arc_decision' | 'drift_event' | 'security_event' | 'audit_event' | 'ltm_event' | 'constitutional_event' | 'incident'
  actor: string
  content: {
    type: string
    description: string
    [key: string]: any
  }
  resolution?: string
  resolvedAt?: string
  tags: string[]
  metadata: {
    immutable: boolean
    embodiment: string
    version: number
    [key: string]: any
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
    tier: 'Governance Memory',
    timestamp: new Date().toISOString(),
    category: event.category,
    actor: event.actor,
    content: event.content,
    tags: event.tags || [],
    metadata: {
      immutable: true,
      embodiment: 'foreman',
      version: 1,
      ...event.metadata,
    },
  }

  governanceStore.push(governanceEvent)
  return governanceEvent
}

/**
 * Simple governance event logger (backward compatible with existing tests)
 */
export async function logGovernanceEvent(event: {
  type: string
  severity: string
  description: string
  metadata?: Record<string, any>
}): Promise<void> {
  await writeGovernanceMemory({
    category: 'audit_event',
    actor: 'foreman',
    content: {
      type: event.type,
      description: event.description,
      severity: event.severity,
      ...event.metadata,
    },
    tags: [event.type, event.severity],
    metadata: event.metadata,
  })
}
      version: 1,
      ...(event.metadata || {})
    }
  }

  governanceStore.push(governanceEvent)

  // Log to console for visibility
  const severity = event.content.severity || 'medium'
  if (severity === 'critical' || severity === 'high') {
    console.log(`[GOVERNANCE ${severity.toUpperCase()}] ${event.category}: ${event.content.description}`)
  }

  return governanceEvent
}

/**
 * Update Governance Memory
 * 
 * Governance Memory is IMMUTABLE. This function throws an error.
 * Only resolution can be updated via separate function.
 * 
 * @param params - Update parameters
 * @throws Error - Governance Memory is immutable
 */
export async function updateGovernanceMemory(params: {
  entryId: string
  newContent?: any
  resolution?: string
}): Promise<GovernanceEvent> {
  // Governance Memory is immutable - block all updates except resolution
  if (params.newContent) {
    throw new Error('Governance Memory is immutable. Cannot update content.')
  }

  const event = governanceStore.find(e => e.id === params.entryId)
  
  if (!event) {
    throw new Error(`Governance event not found: ${params.entryId}`)
  }

  // Only allow resolution updates
  if (params.resolution) {
    event.resolution = params.resolution
    event.resolvedAt = new Date().toISOString()
    event.metadata.version += 1
  }

  return event
}

/**
 * Delete Governance Memory
 * 
 * Governance Memory is IMMUTABLE. Deletions are blocked.
 * Only ARC-approved redaction is allowed.
 * 
 * @param params - Delete parameters
 * @throws Error - Governance Memory is immutable
 */
export async function deleteGovernanceMemory(params: { entryId: string }): Promise<void> {
  throw new Error('Governance Memory is immutable. Use attemptRedaction with ARC approval for compliance requirements.')
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

  if (filters.source) {
    results = results.filter(e => e.actor === filters.source)
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

  // Support 'type' filter (content.type matching)
  if (filters.type) {
    results = results.filter(e => e.content.type === filters.type)
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
    results = results.filter(e => e.actor === module || e.content?.module === module)
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
      e.actor === cs || 
      e.content?.cs === cs || 
      e.tags.includes(cs.toLowerCase())
    )
  }

  return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/**
 * Redaction Result
 */
export interface RedactionResult {
  targetEntryId: string
  arcApproved: boolean
  redactedAt: string
  reason: string
  approver?: string
  redactionEventId: string
}

/**
 * Attempt Redaction
 * 
 * Only allowed with ARC approval for compliance requirements (GDPR, etc.)
 * Original entry is marked as redacted but not deleted.
 * 
 * @param params - Redaction parameters
 * @returns Redaction result
 * @throws Error if ARC approval not granted
 */
export async function attemptRedaction(params: {
  entryId: string
  reason: string
  arcApproved: boolean
  approver?: string
}): Promise<RedactionResult> {
  if (!params.arcApproved) {
    throw new Error('Redaction requires ARC approval. Cannot proceed without arcApproved=true.')
  }

  const event = governanceStore.find(e => e.id === params.entryId)
  
  if (!event) {
    throw new Error(`Governance event not found: ${params.entryId}`)
  }

  // Mark as redacted (metadata update allowed for compliance)
  event.metadata.redacted = true
  event.metadata.redactedAt = new Date().toISOString()
  event.metadata.redactionReason = params.reason
  event.metadata.redactionApprover = params.approver

  // Log redaction event
  const redactionEvent = await writeGovernanceMemory({
    category: 'audit_event',
    actor: params.approver || 'arc',
    content: {
      type: 'governance_redaction',
      description: `Governance event redacted: ${params.entryId}`,
      reason: params.reason,
      targetEntryId: params.entryId,
      approver: params.approver,
      timestamp: new Date().toISOString()
    },
    metadata: {
      arcApproved: true,
      auditRequired: true
    },
    tags: ['redaction', 'arc_approved', 'compliance']
  })

  return {
    targetEntryId: params.entryId,
    arcApproved: params.arcApproved,
    redactedAt: event.metadata.redactedAt as string,
    reason: params.reason,
    approver: params.approver,
    redactionEventId: redactionEvent.id
  }
}

/**
 * Clear governance memory (test cleanup only)
 */
export function clearGovernanceMemory(): void {
  governanceStore.length = 0
}

/**
 * Log governance gate failure
 * Extension for Issue A3 — FL/CI Feedback Loop
 */
export async function logGovernanceGateFailure(artifact: {
  id: string
  failureType: string
  correctiveDomain: string
  prNumber: number
  learningSignal: { rcaCategory: string }
  severity: string
  failureDescription: string
}): Promise<void> {
  await logGovernanceEvent({
    type: 'governance_gate_failure',
    severity: artifact.severity,
    description: `Governance gate failure: ${artifact.failureType} - ${artifact.failureDescription}`,
    metadata: {
      artifactId: artifact.id,
      failureType: artifact.failureType,
      correctiveDomain: artifact.correctiveDomain,
      prNumber: artifact.prNumber,
      rcaCategory: artifact.learningSignal.rcaCategory,
    },
  })
}

/**
 * Query governance failures
 * Extension for Issue A3 — FL/CI Feedback Loop
 */
export async function queryGovernanceFailures(filters: {
  artifactId?: string
  failureType?: string
  correctiveDomain?: string
  since?: string
  until?: string
  resolved?: boolean
}): Promise<any[]> {
  // Query governance memory store
  let results = governanceStore.filter(event => {
    if (event.content.type !== 'governance_gate_failure') return false
    
    if (filters.artifactId && event.metadata.artifactId !== filters.artifactId) {
      return false
    }
    if (filters.failureType && event.metadata.failureType !== filters.failureType) {
      return false
    }
    if (filters.correctiveDomain && event.metadata.correctiveDomain !== filters.correctiveDomain) {
      return false
    }
    if (filters.since && event.timestamp < filters.since) {
      return false
    }
    if (filters.until && event.timestamp > filters.until) {
      return false
    }
    return true
  })

  // Map to artifact structure for compatibility with tests
  return results.map(event => ({
    id: event.metadata.artifactId || event.id,
    failureType: event.metadata.failureType,
    correctiveDomain: event.metadata.correctiveDomain,
    prNumber: event.metadata.prNumber,
    timestamp: event.timestamp,
    learningSignal: {
      rcaCategory: event.metadata.rcaCategory,
    },
    resolution: event.resolution ? {
      status: 'resolved',
      resolvedAt: event.resolvedAt,
    } : undefined,
    flciEntry: event.metadata.flciEntryId ? {
      entryId: event.metadata.flciEntryId,
    } : undefined,
  }))
}

/**
 * Get failure statistics
 * Extension for Issue A3 — FL/CI Feedback Loop
 */
export async function getFailureStatistics(timeRange?: {
  since: string
  until: string
}): Promise<{
  total: number
  byType: Record<string, number>
  byDomain: Record<string, number>
  resolved: number
  pending: number
}> {
  let failures = governanceStore.filter(event => 
    event.content.type === 'governance_gate_failure'
  )

  if (timeRange) {
    failures = failures.filter(event => 
      event.timestamp >= timeRange.since &&
      event.timestamp <= timeRange.until
    )
  }

  const byType: Record<string, number> = {}
  const byDomain: Record<string, number> = {}
  let resolved = 0
  let pending = 0

  failures.forEach(event => {
    const type = event.metadata.failureType || 'unknown'
    const domain = event.metadata.correctiveDomain || 'unknown'
    
    byType[type] = (byType[type] || 0) + 1
    byDomain[domain] = (byDomain[domain] || 0) + 1
    
    if (event.resolution) {
      resolved++
    } else {
      pending++
    }
  })

  return {
    total: failures.length,
    byType,
    byDomain,
    resolved,
    pending,
  }
}
