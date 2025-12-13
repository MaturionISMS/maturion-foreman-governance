/**
 * Constraint Violation Detection & Classification - Public API
 * Wave 3B: Detection Engine
 * 
 * This module provides the public API for violation detection, classification,
 * and telemetry operations.
 */

// Export Detection Engine functions
export {
  detectViolations,
  detectStructuralViolations,
  detectContractViolations,
  detectGovernanceViolations,
  detectViolationsByType,
} from './violation-detector';

// Export Classification Engine functions
export {
  classifyViolation,
  classifyViolationReport,
  aggregateBySeverity,
  aggregateByCategory,
  identifyFalsePositives,
} from './violation-classifier';

// Export Telemetry Engine functions
export {
  emitViolationEvent,
  emitViolationBatch,
  storeViolationInMemory,
  queryViolationsFromMemory,
  classifyForFLCI,
  generateLearningSuggestion,
} from './telemetry';
