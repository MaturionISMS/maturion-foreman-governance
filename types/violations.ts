/**
 * Constraint Violation Detection & Classification - Type Definitions
 * Wave 3B: Violation Detection Engine
 * 
 * This file defines all types for the Architecture Constraint Violation Detection System.
 * These types enable detection, classification, and reporting of architectural violations.
 * 
 * Version: 1.0.0
 * Status: Wave 3B Types
 */

import type {
  ConstraintType,
  ConstraintDeclaration,
  ArchitectureSignature,
} from './constraints';

/**
 * Violation Severity
 * 
 * Indicates the criticality of a constraint violation:
 * - critical: Immediate action required, blocks future enforcement
 * - high: Must be fixed before merge (when enforcement enabled)
 * - medium: Should be fixed soon
 * - low: Advisory, fix when convenient
 * - info: Informational, no action needed (e.g., false positive candidates)
 */
export type ViolationSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

/**
 * Violation Category
 * 
 * Specific category of the constraint violation,
 * mapped from constraint categories.
 */
export type ViolationCategory =
  | 'dependency_direction'
  | 'layer_violation'
  | 'import_restriction'
  | 'module_boundary'
  | 'api_stability'
  | 'type_stability'
  | 'event_schema'
  | 'protected_path'
  | 'constitutional'
  | 'cs_boundary'
  | 'governance_integrity';

/**
 * Violation Nature
 * 
 * High-level classification of violation type:
 * - governance: Affects constitutional, governance, or CS boundaries
 * - structural: Affects code organization, dependencies, layers
 * - contract: Affects APIs, types, events, interfaces
 */
export type ViolationNature = 'governance' | 'structural' | 'contract';

/**
 * Raw Violation (before classification)
 * 
 * Initial violation detected by the detection engine,
 * before severity and category classification.
 */
export interface RawViolation {
  /** ID of the violated constraint */
  constraintId: string;
  
  /** Type of constraint violated */
  type: ConstraintType;
  
  /** Human-readable description of the violation */
  description: string;
  
  /** Location of the violation (if applicable) */
  location?: {
    /** File path where violation occurred */
    file?: string;
    
    /** Line number in file */
    line?: number;
    
    /** Module name */
    module?: string;
    
    /** Architectural layer */
    layer?: string;
  };
  
  /** Additional context about the violation */
  context: Record<string, any>;
  
  /** ISO 8601 timestamp when violation was detected */
  detectedAt: string;
}

/**
 * Classified Violation (after classification)
 * 
 * Violation with severity, category, and nature assigned
 * by the classification engine.
 */
export interface ClassifiedViolation extends RawViolation {
  /** Unique violation identifier */
  id: string;
  
  /** Assigned severity level */
  severity: ViolationSeverity;
  
  /** Assigned category */
  category: ViolationCategory;
  
  /** Assigned nature (governance/structural/contract) */
  nature: ViolationNature;
  
  /** Whether this is likely a false positive */
  falsePositive: boolean;
  
  /** If suppressed, the suppression ID */
  suppressionId?: string;
}

/**
 * Violation Report
 * 
 * Complete report of all detected violations (before classification).
 */
export interface ViolationReport {
  /** Architecture signature hash */
  signatureHash: string;
  
  /** Git commit SHA */
  commit: string;
  
  /** ISO 8601 timestamp of detection */
  timestamp: string;
  
  /** All detected violations */
  violations: RawViolation[];
  
  /** Summary statistics */
  summary: {
    /** Total number of violations */
    total: number;
    
    /** Count by constraint type */
    byType: Record<ConstraintType, number>;
  };
}

/**
 * Classified Violation Report
 * 
 * Complete report of all violations after classification.
 */
export interface ClassifiedViolationReport {
  /** Architecture signature hash */
  signatureHash: string;
  
  /** Git commit SHA */
  commit: string;
  
  /** ISO 8601 timestamp of detection */
  timestamp: string;
  
  /** All classified violations */
  violations: ClassifiedViolation[];
  
  /** Summary statistics */
  summary: {
    /** Total number of violations */
    total: number;
    
    /** Count by severity */
    bySeverity: Record<ViolationSeverity, number>;
    
    /** Count by category */
    byCategory: Record<ViolationCategory, number>;
    
    /** Count by nature */
    byNature: Record<ViolationNature, number>;
    
    /** Number of false positives */
    falsePositiveCount: number;
  };
}

/**
 * Structural Violation
 * 
 * Violation related to code structure (circular deps, layers, etc.).
 */
export interface StructuralViolation extends RawViolation {
  type: 'structural';
  
  /** Specific type of structural violation */
  structuralType: 'circular_dependency' | 'layer_violation' | 'import_restriction' | 'module_boundary';
  
  /** List of affected modules */
  affectedModules: string[];
  
  /** Dependency chain (for circular dependency violations) */
  dependencyChain?: string[];
}

/**
 * Contract Violation
 * 
 * Violation related to API/type/event contracts (breaking changes).
 */
export interface ContractViolation extends RawViolation {
  type: 'contract';
  
  /** Specific type of contract violation */
  contractType: 'api' | 'type' | 'event';
  
  /** Old version of the contract */
  oldVersion: string;
  
  /** New version of the contract */
  newVersion: string;
  
  /** Whether this is a breaking change */
  breakingChange: boolean;
  
  /** Whether migration is required */
  migrationRequired: boolean;
}

/**
 * Governance Violation
 * 
 * Violation related to governance rules (protected paths, CS boundaries).
 */
export interface GovernanceViolation extends RawViolation {
  type: 'governance';
  
  /** Specific type of governance violation */
  governanceType: 'protected_path' | 'constitutional' | 'cs_boundary' | 'integrity';
  
  /** Protected file that was modified (if applicable) */
  protectedFile?: string;
  
  /** CS boundary that was violated (if applicable) */
  csBoundary?: string;
}

/**
 * Violation Query Filters
 * 
 * Filters for querying stored violations from Memory Fabric.
 */
export interface ViolationQueryFilters {
  /** Filter by severity */
  severity?: ViolationSeverity;
  
  /** Filter by category */
  category?: ViolationCategory;
  
  /** Filter by nature */
  nature?: ViolationNature;
  
  /** Filter by constraint ID */
  constraintId?: string;
  
  /** Filter violations since this timestamp (ISO 8601) */
  since?: string;
  
  /** Filter violations until this timestamp (ISO 8601) */
  until?: string;
  
  /** Only return false positives */
  falsePositivesOnly?: boolean;
}

/**
 * Violation Event
 * 
 * Structured event emitted for each violation (telemetry).
 */
export interface ViolationEvent {
  /** Unique event identifier */
  eventId: string;
  
  /** ISO 8601 timestamp when event was emitted */
  timestamp: string;
  
  /** Event schema version */
  version: string;
  
  /** Violation details */
  violation: {
    /** Violation ID */
    id: string;
    
    /** Violated constraint ID */
    constraintId: string;
    
    /** Violation severity */
    severity: ViolationSeverity;
    
    /** Violation category */
    category: ViolationCategory;
    
    /** Violation nature */
    nature: ViolationNature;
    
    /** Human-readable description */
    description: string;
    
    /** Location where violation occurred */
    location: {
      file?: string;
      line?: number;
      module?: string;
      layer?: string;
    };
    
    /** Additional context */
    context: Record<string, any>;
  };
  
  /** Architecture signature information */
  signature: {
    /** Git commit SHA */
    commit: string;
    
    /** Git branch */
    branch: string;
    
    /** Signature hash */
    signatureHash: string;
  };
  
  /** Detection metadata */
  metadata: {
    /** Detection method used */
    detectionMethod: string;
    
    /** Whether this is a false positive */
    falsePositive: boolean;
    
    /** Suppression ID (if suppressed) */
    suppressionId?: string;
  };
}

/**
 * FL/CI Classification
 * 
 * Classification of violation for Feedback Loop / Continuous Improvement system.
 */
export interface FLCIClassification {
  /** Violation ID */
  violationId: string;
  
  /** FL category (gap type) */
  flCategory: 'architecture_gap' | 'qa_gap' | 'implementation_gap' | 'type_safety_gap';
  
  /** Recommended CI action */
  ciAction: 'update_architecture' | 'add_test' | 'fix_code' | 'add_type_validation';
  
  /** Priority for addressing */
  priority: 'immediate' | 'high' | 'medium' | 'low';
  
  /** Learning suggestion text */
  learningSuggestion: string;
}

/**
 * Learning Suggestion
 * 
 * Suggestion for improving governance based on detected violation.
 */
export interface LearningSuggestion {
  /** Violation ID that triggered this suggestion */
  violationId: string;
  
  /** Suggestion text */
  suggestion: string;
  
  /** Document to update */
  targetDocument: string;
  
  /** Proposed change */
  proposedChange: string;
  
  /** Reasoning for the change */
  reasoning: string;
}

/**
 * Severity Aggregate
 * 
 * Aggregation of violations by severity.
 */
export interface SeverityAggregate {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

/**
 * Category Aggregate
 * 
 * Aggregation of violations by category.
 */
export interface CategoryAggregate {
  dependency_direction: number;
  layer_violation: number;
  import_restriction: number;
  module_boundary: number;
  api_stability: number;
  type_stability: number;
  event_schema: number;
  protected_path: number;
  constitutional: number;
  cs_boundary: number;
  governance_integrity: number;
}
