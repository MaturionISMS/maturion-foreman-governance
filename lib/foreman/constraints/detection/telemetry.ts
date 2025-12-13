/**
 * Telemetry & Reporting Engine
 * 
 * Emits structured violation events and integrates with Memory Fabric and FL/CI.
 * All operations are non-blocking and error-tolerant.
 * 
 * Wave 3B: Observe and Report (Non-Blocking)
 */

import {
  ClassifiedViolation,
  ViolationEvent,
  ViolationQueryFilters,
  FLCIClassification,
  LearningSuggestion,
} from '../../../../types/violations';

/**
 * Emit structured violation event (non-blocking)
 * 
 * @param violation - Classified violation to emit
 */
export async function emitViolationEvent(
  violation: ClassifiedViolation
): Promise<void> {
  try {
    // Create event
    const event: ViolationEvent = {
      eventId: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      violation: {
        id: violation.id,
        constraintId: violation.constraintId,
        severity: violation.severity,
        category: violation.category,
        nature: violation.nature,
        description: violation.description,
        location: violation.location || {},
        context: violation.context,
      },
      signature: {
        commit: 'unknown', // Would come from signature in real implementation
        branch: 'unknown',
        signatureHash: 'unknown',
      },
      metadata: {
        detectionMethod: 'wave3b-detector',
        falsePositive: violation.falsePositive,
        suppressionId: violation.suppressionId,
      },
    };

    // Emit event (non-blocking, fire-and-forget)
    // In real implementation, would emit to event bus / telemetry system
    // For now, just log to console
    if (process.env.NODE_ENV !== 'test') {
      console.log('[Telemetry] Violation event emitted:', event.eventId);
    }

    // Complete quickly (< 100ms requirement)
    return Promise.resolve();
  } catch (error) {
    // Non-blocking: log error but don't throw
    console.warn('[Telemetry] Failed to emit violation event:', error);
    return Promise.resolve();
  }
}

/**
 * Emit batch of violation events (non-blocking)
 * 
 * @param violations - Array of classified violations
 */
export async function emitViolationBatch(
  violations: ClassifiedViolation[]
): Promise<void> {
  try {
    // Emit each violation (in parallel, non-blocking)
    const promises = violations.map(v => emitViolationEvent(v));
    
    // Don't wait for all to complete - fire and forget
    Promise.all(promises).catch(error => {
      console.warn('[Telemetry] Batch emission had errors:', error);
    });

    // Return immediately (non-blocking)
    return Promise.resolve();
  } catch (error) {
    // Non-blocking: log error but don't throw
    console.warn('[Telemetry] Failed to emit violation batch:', error);
    return Promise.resolve();
  }
}

/**
 * Store violation in Memory Fabric (non-blocking)
 * 
 * @param violation - Classified violation to store
 */
export async function storeViolationInMemory(
  violation: ClassifiedViolation
): Promise<void> {
  try {
    // In real implementation, would store in Memory Fabric
    // For now, simulate storage with log
    if (process.env.NODE_ENV !== 'test') {
      console.log('[Telemetry] Storing violation in Memory Fabric:', violation.id);
    }

    // Simulate async storage (non-blocking)
    return Promise.resolve();
  } catch (error) {
    // Non-blocking: log error but don't throw
    console.warn('[Telemetry] Failed to store violation in Memory Fabric:', error);
    return Promise.resolve();
  }
}

/**
 * Query violations from Memory Fabric
 * 
 * @param filters - Query filters
 * @returns Array of violations matching filters
 */
export async function queryViolationsFromMemory(
  filters: ViolationQueryFilters
): Promise<ClassifiedViolation[]> {
  try {
    // In real implementation, would query Memory Fabric
    // For now, return empty array
    if (process.env.NODE_ENV !== 'test') {
      console.log('[Telemetry] Querying violations from Memory Fabric:', filters);
    }

    return Promise.resolve([]);
  } catch (error) {
    // Graceful degradation: return empty array on error
    console.warn('[Telemetry] Failed to query violations from Memory Fabric:', error);
    return Promise.resolve([]);
  }
}

/**
 * Classify violation for FL/CI system
 * 
 * @param violation - Classified violation
 * @returns FL/CI classification
 */
export function classifyForFLCI(
  violation: ClassifiedViolation
): FLCIClassification {
  // Determine FL category based on violation nature
  let flCategory: FLCIClassification['flCategory'];
  let ciAction: FLCIClassification['ciAction'];

  switch (violation.nature) {
    case 'governance':
      flCategory = 'architecture_gap';
      ciAction = 'update_architecture';
      break;
    case 'structural':
      flCategory = 'implementation_gap';
      ciAction = 'fix_code';
      break;
    case 'contract':
      flCategory = 'type_safety_gap';
      ciAction = 'add_type_validation';
      break;
    default:
      flCategory = 'qa_gap';
      ciAction = 'add_test';
  }

  // Determine priority based on severity
  let priority: FLCIClassification['priority'];
  switch (violation.severity) {
    case 'critical':
      priority = 'immediate';
      break;
    case 'high':
      priority = 'high';
      break;
    case 'medium':
      priority = 'medium';
      break;
    default:
      priority = 'low';
  }

  // Generate learning suggestion
  const learningSuggestion = `Consider ${ciAction} to address ${violation.category} violation`;

  return {
    violationId: violation.id,
    flCategory,
    ciAction,
    priority,
    learningSuggestion,
  };
}

/**
 * Generate learning suggestion from violation
 * 
 * @param violation - Classified violation
 * @returns Learning suggestion
 */
export function generateLearningSuggestion(
  violation: ClassifiedViolation
): LearningSuggestion {
  let targetDocument: string;
  let proposedChange: string;
  let reasoning: string;

  switch (violation.nature) {
    case 'governance':
      targetDocument = '/foreman/constitution/governance-rules.md';
      proposedChange = `Add or update constraint for ${violation.category}`;
      reasoning = `Governance violation detected that may indicate missing or incomplete constraint definition`;
      break;
    case 'structural':
      targetDocument = '/foreman/architecture-design-checklist.md';
      proposedChange = `Add checklist item for ${violation.category}`;
      reasoning = `Structural violation suggests missing architectural guideline`;
      break;
    case 'contract':
      targetDocument = '/foreman/qa/api-contract-tests.md';
      proposedChange = `Add contract test for ${violation.category}`;
      reasoning = `Contract violation indicates missing API/type stability test`;
      break;
    default:
      targetDocument = '/foreman/constraints/registry.json';
      proposedChange = `Review and update constraint ${violation.constraintId}`;
      reasoning = `Violation suggests constraint may need refinement`;
  }

  return {
    violationId: violation.id,
    suggestion: `${violation.description} - Consider updating governance documentation`,
    targetDocument,
    proposedChange,
    reasoning,
  };
}
