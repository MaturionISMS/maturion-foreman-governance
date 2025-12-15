/**
 * Builder Memory Constitutional Protection (BMCP)
 * Issue #242 - Wave 0 (Builder Constitutional Systems)
 */

export enum MemoryClass {
  GOVERNANCE = 'governance',
  EXECUTION = 'execution',
  EVIDENCE = 'evidence',
  TELEMETRY = 'telemetry',
  BUILDER_PRIVATE = 'builder_private'
}

export enum ProtectionLevel {
  IMMUTABLE = 'immutable',
  FOREMAN_ONLY = 'foreman_only',
  BUILDER_WRITE = 'builder_write',
  BUILDER_READ = 'builder_read'
}

export interface ProtectedMemorySegment {
  segment_id: string
  classification: MemoryClass
  protection_level: ProtectionLevel
  owner: 'foreman' | 'builder' | 'system'
  data: any
  created_at: string
  created_by: string
  last_modified_at?: string
  last_modified_by?: string
  modification_count: number
  write_permission_required: boolean
  integrity_hash: string
}

export interface MemoryAccessRequest {
  requester_id: string
  requester_type: 'foreman' | 'builder'
  segment_id: string
  operation: 'read' | 'write' | 'delete'
  proposed_data?: any
  justification: string
}

export interface MemoryAccessResult {
  granted: boolean
  reason?: string
  validated: boolean
  validation_errors?: string[]
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export interface MemoryAuditEntry {
  timestamp: string
  segment_id: string
  operation: 'read' | 'write' | 'delete' | 'access_denied'
  requester_id: string
  requester_type: 'foreman' | 'builder'
  success: boolean
  data_hash_before?: string
  data_hash_after?: string
  validation_result?: ValidationResult
}

export interface MemoryCheckpoint {
  checkpoint_id: string
  timestamp: string
  segments: { [segmentId: string]: ProtectedMemorySegment }
  creator: string
  description: string
}

/**
 * Memory Validator Interface
 */
export interface MemoryValidator {
  name: string
  validate(segment: ProtectedMemorySegment, newData: any): ValidationResult
}

/**
 * Governance Memory Validator
 */
export class GovernanceMemoryValidator implements MemoryValidator {
  name = 'GovernanceMemoryValidator'

  validate(segment: ProtectedMemorySegment, newData: any): ValidationResult {
    const errors: string[] = []
    
    if (segment.classification === MemoryClass.GOVERNANCE) {
      if (segment.protection_level === ProtectionLevel.IMMUTABLE) {
        errors.push('Governance memory is immutable')
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings: []
    }
  }
}

/**
 * Integrity Validator
 */
export class IntegrityValidator implements MemoryValidator {
  name = 'IntegrityValidator'

  validate(segment: ProtectedMemorySegment, newData: any): ValidationResult {
    const errors: string[] = []
    
    if (!newData) {
      errors.push('Data cannot be null or undefined')
    }
    
    if (typeof newData !== typeof segment.data) {
      errors.push('Data type mismatch')
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings: []
    }
  }
}

/**
 * Conflict Validator
 */
export class ConflictValidator implements MemoryValidator {
  name = 'ConflictValidator'

  validate(segment: ProtectedMemorySegment, newData: any): ValidationResult {
    const errors: string[] = []
    
    // Check for concurrent modifications
    if (segment.modification_count > 0 && !newData.__version) {
      errors.push('Concurrent modification detected - version required')
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings: []
    }
  }
}

/**
 * Memory Audit Logger
 */
export class MemoryAuditLogger {
  private auditLog: MemoryAuditEntry[] = []

  log(entry: MemoryAuditEntry): void {
    this.auditLog.push(entry)
  }

  getAuditTrail(segmentId: string): MemoryAuditEntry[] {
    return this.auditLog.filter(entry => entry.segment_id === segmentId)
  }

  detectAnomalies(): MemoryAuditEntry[] {
    return this.auditLog.filter(entry => entry.operation === 'access_denied')
  }
}

/**
 * Memory Checkpoint Manager
 */
export class MemoryCheckpointManager {
  private checkpoints: { [id: string]: MemoryCheckpoint } = {}

  createCheckpoint(segments: { [id: string]: ProtectedMemorySegment }, creator: string, description: string): string {
    const checkpointId = `CHECKPOINT-${Date.now()}`
    
    const checkpoint: MemoryCheckpoint = {
      checkpoint_id: checkpointId,
      timestamp: new Date().toISOString(),
      segments: JSON.parse(JSON.stringify(segments)), // Deep copy
      creator,
      description
    }
    
    this.checkpoints[checkpointId] = checkpoint
    return checkpointId
  }

  rollbackToCheckpoint(checkpointId: string): { [id: string]: ProtectedMemorySegment } | null {
    const checkpoint = this.checkpoints[checkpointId]
    if (!checkpoint) {
      return null
    }
    
    return JSON.parse(JSON.stringify(checkpoint.segments))
  }

  listCheckpoints(): MemoryCheckpoint[] {
    const checkpointArray: MemoryCheckpoint[] = []
    for (const key in this.checkpoints) {
      if (this.checkpoints.hasOwnProperty(key)) {
        checkpointArray.push(this.checkpoints[key])
      }
    }
    return checkpointArray
  }

  deleteCheckpoint(checkpointId: string): void {
    delete this.checkpoints[checkpointId]
  }
}

/**
 * Memory Protection Manager
 */
export class MemoryProtectionManager {
  private segments: { [id: string]: ProtectedMemorySegment } = {}
  private validators: MemoryValidator[]
  private auditLogger: MemoryAuditLogger
  private checkpointManager: MemoryCheckpointManager

  constructor() {
    this.validators = [
      new GovernanceMemoryValidator(),
      new IntegrityValidator(),
      new ConflictValidator()
    ]
    this.auditLogger = new MemoryAuditLogger()
    this.checkpointManager = new MemoryCheckpointManager()
  }

  /**
   * Request memory access
   */
  requestAccess(request: MemoryAccessRequest): MemoryAccessResult {
    const segment = this.segments[request.segment_id]
    if (!segment) {
      return {
        granted: false,
        reason: 'Segment not found',
        validated: false
      }
    }

    // Check permissions
    if (!this.checkPermissions(segment, request)) {
      this.auditLogger.log({
        timestamp: new Date().toISOString(),
        segment_id: request.segment_id,
        operation: 'access_denied',
        requester_id: request.requester_id,
        requester_type: request.requester_type,
        success: false
      })
      
      return {
        granted: false,
        reason: 'Permission denied',
        validated: false
      }
    }

    // For write operations, validate data
    if (request.operation === 'write' && request.proposed_data) {
      const validation = this.validateWrite(segment, request.proposed_data)
      if (!validation.valid) {
        return {
          granted: false,
          reason: 'Validation failed',
          validated: false,
          validation_errors: validation.errors
        }
      }
    }

    return {
      granted: true,
      validated: true
    }
  }

  /**
   * Read memory segment
   */
  readSegment(segmentId: string, requesterId: string, requesterType: 'foreman' | 'builder'): any {
    const request: MemoryAccessRequest = {
      requester_id: requesterId,
      requester_type: requesterType,
      segment_id: segmentId,
      operation: 'read',
      justification: 'Read operation'
    }

    const accessResult = this.requestAccess(request)
    if (!accessResult.granted) {
      throw new Error(`Access denied: ${accessResult.reason}`)
    }

    const segment = this.segments[segmentId]
    
    // Log read
    this.auditLogger.log({
      timestamp: new Date().toISOString(),
      segment_id: segmentId,
      operation: 'read',
      requester_id: requesterId,
      requester_type: requesterType,
      success: true
    })

    // Return immutable copy
    return JSON.parse(JSON.stringify(segment.data))
  }

  /**
   * Write to memory segment
   */
  writeSegment(segmentId: string, data: any, requesterId: string, requesterType: 'foreman' | 'builder'): boolean {
    const request: MemoryAccessRequest = {
      requester_id: requesterId,
      requester_type: requesterType,
      segment_id: segmentId,
      operation: 'write',
      proposed_data: data,
      justification: 'Write operation'
    }

    const accessResult = this.requestAccess(request)
    if (!accessResult.granted) {
      throw new Error(`Access denied: ${accessResult.reason}`)
    }

    const segment = this.segments[segmentId]
    const oldHash = segment.integrity_hash

    // Create checkpoint for critical segments
    if (segment.classification === MemoryClass.GOVERNANCE) {
      this.checkpointManager.createCheckpoint(this.segments, requesterId, 'Before governance change')
    }

    // Atomic write
    segment.data = data
    segment.last_modified_at = new Date().toISOString()
    segment.last_modified_by = requesterId
    segment.modification_count++
    segment.integrity_hash = this.calculateHash(data)

    // Log write
    this.auditLogger.log({
      timestamp: new Date().toISOString(),
      segment_id: segmentId,
      operation: 'write',
      requester_id: requesterId,
      requester_type: requesterType,
      success: true,
      data_hash_before: oldHash,
      data_hash_after: segment.integrity_hash
    })

    return true
  }

  /**
   * Create new protected memory segment
   */
  createSegment(
    segmentId: string,
    classification: MemoryClass,
    protectionLevel: ProtectionLevel,
    owner: 'foreman' | 'builder' | 'system',
    data: any,
    createdBy: string
  ): void {
    const segment: ProtectedMemorySegment = {
      segment_id: segmentId,
      classification,
      protection_level: protectionLevel,
      owner,
      data,
      created_at: new Date().toISOString(),
      created_by: createdBy,
      modification_count: 0,
      write_permission_required: protectionLevel !== ProtectionLevel.BUILDER_WRITE,
      integrity_hash: this.calculateHash(data)
    }

    this.segments[segmentId] = segment
  }

  /**
   * Validate write operation
   */
  private validateWrite(segment: ProtectedMemorySegment, newData: any): ValidationResult {
    const allErrors: string[] = []
    const allWarnings: string[] = []

    for (const validator of this.validators) {
      const result = validator.validate(segment, newData)
      allErrors.push(...result.errors)
      allWarnings.push(...result.warnings)
    }

    return {
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings
    }
  }

  /**
   * Check permissions for access request
   */
  private checkPermissions(segment: ProtectedMemorySegment, request: MemoryAccessRequest): boolean {
    // Foreman has access to everything
    if (request.requester_type === 'foreman') {
      return true
    }

    // Builder access checks
    if (request.requester_type === 'builder') {
      // Read operations
      if (request.operation === 'read') {
        return segment.protection_level === ProtectionLevel.BUILDER_READ ||
               segment.protection_level === ProtectionLevel.BUILDER_WRITE
      }

      // Write operations
      if (request.operation === 'write') {
        if (segment.protection_level === ProtectionLevel.IMMUTABLE) return false
        if (segment.protection_level === ProtectionLevel.FOREMAN_ONLY) return false
        if (segment.protection_level === ProtectionLevel.BUILDER_WRITE) return true
      }
    }

    return false
  }

  /**
   * Calculate integrity hash (simplified)
   */
  private calculateHash(data: any): string {
    const str = JSON.stringify(data)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return hash.toString(16)
  }

  /**
   * Rollback to checkpoint
   */
  rollbackToCheckpoint(checkpointId: string): void {
    const restoredSegments = this.checkpointManager.rollbackToCheckpoint(checkpointId)
    if (restoredSegments) {
      this.segments = restoredSegments
    }
  }

  /**
   * Get audit trail
   */
  getAuditTrail(segmentId: string): MemoryAuditEntry[] {
    return this.auditLogger.getAuditTrail(segmentId)
  }

  /**
   * Detect anomalies
   */
  detectAnomalies(): MemoryAuditEntry[] {
    return this.auditLogger.detectAnomalies()
  }
}

// Singleton instance
let protectionManagerInstance: MemoryProtectionManager | null = null

export function getMemoryProtectionManager(): MemoryProtectionManager {
  if (!protectionManagerInstance) {
    protectionManagerInstance = new MemoryProtectionManager()
  }
  return protectionManagerInstance
}
