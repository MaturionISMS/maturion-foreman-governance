/**
 * Knowledge Boundaries Module
 * 
 * Enforces memory access boundaries and tenant isolation across the Memory Fabric.
 * 
 * Constitutional Alignment:
 * - CS6 Execution Boundary: Boundary enforcement
 * - GSR: Violation logging to governance memory
 */

import { writeGovernanceMemory } from './governance-memory'

/**
 * Memory Operation
 */
export interface MemoryOperation {
  type: 'read' | 'write' | 'delete'
  tier: 'STM' | 'LTM' | 'EM' | 'SM'
  embodiment: string
  tenantId?: string
  data?: any
}

/**
 * Boundary Check Result
 */
export interface BoundaryCheck {
  allowed: boolean
  reason?: string
  violations?: string[]
  governanceEvent?: any
  severity?: 'critical' | 'high' | 'medium' | 'low'
}

/**
 * Boundary Context
 */
export interface BoundaryContext {
  embodiment: string
  authenticatedTenantId?: string
}

/**
 * Validation Result
 */
export interface ValidationResult {
  valid: boolean
  errors?: string[]
}

/**
 * Embodiment Privileges
 */
const EMBODIMENT_PRIVILEGES = {
  foreman: {
    STM: { read: true, write: true, delete: true },
    EM: { read: true, write: true, delete: true },
    LTM: { read: false, write: false, delete: false },
    SM: { read: true, write: false, delete: false }
  },
  isms_runtime: {
    STM: { read: true, write: true, delete: true },
    EM: { read: true, write: true, delete: true },
    LTM: { read: true, write: true, delete: true },
    SM: { read: true, write: true, delete: false }
  },
  builder: {
    STM: { read: true, write: false, delete: false },
    EM: { read: true, write: false, delete: false },
    LTM: { read: false, write: false, delete: false },
    SM: { read: true, write: false, delete: false }
  },
  command_maturion: {
    STM: { read: true, write: false, delete: false },
    EM: { read: true, write: false, delete: false },
    LTM: { read: true, write: false, delete: false }, // High-level stats only
    SM: { read: true, write: false, delete: false }
  }
}

/**
 * Enforce Knowledge Boundaries
 * 
 * Validates memory operation against boundary rules
 * 
 * @param operation - Memory operation to validate
 * @param context - Optional boundary context for authenticated tenant validation
 * @returns Boundary check result
 */
export async function enforceKnowledgeBoundaries(
  operation: MemoryOperation,
  context?: BoundaryContext
): Promise<BoundaryCheck> {
  const violations: string[] = []
  let severity: 'critical' | 'high' | 'medium' | 'low' = 'medium'

  // Check embodiment privilege
  const hasPrivilege = await hasEmbodimentPrivilege(
    operation.embodiment,
    operation.tier,
    operation.type
  )

  if (!hasPrivilege) {
    violations.push(
      `Embodiment '${operation.embodiment}' does not have '${operation.type}' privilege for tier '${operation.tier}'`
    )
    severity = 'high'
  }

  // Check tenant isolation for LTM
  if (operation.tier === 'LTM' && operation.type !== 'delete') {
    if (!operation.tenantId) {
      violations.push('Tenant ID required for LTM operations')
      severity = 'high'
    } else if (context?.authenticatedTenantId && operation.tenantId !== context.authenticatedTenantId) {
      violations.push('Tenant isolation violation: authenticated tenant mismatch')
      severity = 'critical'
    }
  }

  // Check for tenant isolation in data
  if (operation.data && operation.tenantId) {
    const isolationValid = await verifyTenantIsolation(operation.tenantId, operation.data)
    if (!isolationValid) {
      violations.push('Tenant isolation violation detected in operation data')
      severity = 'critical'
    }
  }

  // Check for guardrail violations (SM write by non-privileged embodiment)
  if (operation.tier === 'SM' && operation.type === 'write') {
    if (operation.embodiment !== 'isms_runtime') {
      violations.push('Guardrail violation: Only ISMS Runtime can write to Semantic Memory')
      severity = 'critical'
    }
  }

  // Check for secrets in data
  if (operation.data) {
    const contentStr = JSON.stringify(operation.data).toLowerCase()
    const secretPatterns = [
      /password\s*[:=]/i,
      /secret\s*[:=]/i,
      /api[_-]?key\s*[:=]/i,
      /token\s*[:=]/i
    ]

    for (const pattern of secretPatterns) {
      if (pattern.test(contentStr)) {
        violations.push(`Secret detected in operation data: ${pattern}`)
        severity = 'critical'
      }
    }
  }

  // If violations exist, log and reject
  if (violations.length > 0) {
    const governanceEvent = await writeGovernanceMemory({
      category: 'security_event',
      severity,
      source: 'boundaries',
      description: 'Knowledge boundary violation detected',
      data: {
        operation,
        violations,
        context
      },
      tags: ['boundary_violation', 'security']
    })

    // Audit the access attempt
    await auditMemoryAccess(operation)

    return {
      allowed: false,
      reason: violations.join('; '),
      violations,
      governanceEvent,
      severity
    }
  }

  // Operation allowed
  await auditMemoryAccess(operation)

  return {
    allowed: true
  }
}

/**
 * Verify Tenant Isolation
 * 
 * Checks that data doesn't contain cross-tenant information
 * 
 * @param tenantId - Expected tenant ID
 * @param data - Data to verify
 * @returns True if isolation is maintained
 */
export async function verifyTenantIsolation(tenantId: string, data: any): Promise<boolean> {
  // Simple check: ensure data doesn't contain other tenant IDs
  const dataStr = JSON.stringify(data)
  
  // Check for common tenant ID patterns
  const tenantIdPattern = /tenant_[a-z0-9_]+/gi
  const foundTenantIds = dataStr.match(tenantIdPattern) || []
  
  // Filter out the expected tenant ID
  const otherTenantIds = foundTenantIds.filter(id => id !== tenantId)
  
  if (otherTenantIds.length > 0) {
    await writeGovernanceMemory({
      category: 'security_event',
      severity: 'critical',
      source: 'boundaries',
      description: 'Cross-tenant data detected',
      data: {
        expectedTenantId: tenantId,
        foundTenantIds: otherTenantIds
      },
      tags: ['tenant_isolation_violation', 'critical']
    })
    
    return false
  }

  return true
}

/**
 * Check Embodiment Privilege
 * 
 * Verifies if an embodiment has privilege for an operation on a tier
 * 
 * @param embodiment - Embodiment name
 * @param tier - Memory tier
 * @param operation - Operation type
 * @returns True if privilege exists
 */
export async function hasEmbodimentPrivilege(
  embodiment: string,
  tier: string,
  operation: string
): Promise<boolean> {
  const privileges = EMBODIMENT_PRIVILEGES[embodiment as keyof typeof EMBODIMENT_PRIVILEGES]
  
  if (!privileges) {
    return false
  }

  const tierPrivileges = privileges[tier as keyof typeof privileges]
  
  if (!tierPrivileges) {
    return false
  }

  return tierPrivileges[operation as keyof typeof tierPrivileges] === true
}

/**
 * Validate Memory Write
 * 
 * Validates a memory entry before writing
 * 
 * @param entry - Memory entry to validate
 * @returns Validation result
 */
export async function validateMemoryWrite(entry: any): Promise<ValidationResult> {
  const errors: string[] = []

  // Check required fields
  if (!entry.id) errors.push('Entry ID is required')
  if (!entry.tier) errors.push('Memory tier is required')
  if (!entry.metadata) errors.push('Metadata is required')
  if (!entry.metadata?.createdAt) errors.push('Created timestamp is required')

  // Check for secrets in content
  if (entry.content) {
    const contentStr = JSON.stringify(entry.content).toLowerCase()
    const secretPatterns = [
      /password/i,
      /secret/i,
      /api[_-]?key/i,
      /token/i,
      /credential/i
    ]

    for (const pattern of secretPatterns) {
      if (pattern.test(contentStr)) {
        errors.push(`Potential secret detected in content: ${pattern}`)
      }
    }
  }

  // LTM-specific validation
  if (entry.tier === 'LTM') {
    if (!entry.tenantId) errors.push('Tenant ID required for LTM')
    if (!entry.metadata?.encrypted) errors.push('LTM must be encrypted')
    if (entry.metadata?.isolationBoundary !== 'tenant') {
      errors.push('LTM isolation boundary must be "tenant"')
    }
  }

  if (errors.length > 0) {
    await writeGovernanceMemory({
      category: 'qa_event',
      severity: 'high',
      source: 'boundaries',
      description: 'Memory write validation failed',
      data: { entryId: entry.id, errors },
      tags: ['validation_error']
    })

    return {
      valid: false,
      errors
    }
  }

  return {
    valid: true
  }
}

/**
 * Audit Memory Access
 * 
 * Logs memory access for audit trail
 * 
 * @param operation - Memory operation
 */
export async function auditMemoryAccess(operation: MemoryOperation): Promise<void> {
  await writeGovernanceMemory({
    category: 'audit_event',
    severity: 'low',
    source: 'boundaries',
    description: `Memory ${operation.type} operation on ${operation.tier}`,
    data: {
      embodiment: operation.embodiment,
      tier: operation.tier,
      operation: operation.type,
      tenantId: operation.tenantId
    },
    tags: ['audit', 'memory_access']
  })
}
