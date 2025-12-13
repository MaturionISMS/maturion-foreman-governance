/**
 * Architecture Constraint Foundations - Type Definitions
 * Wave 3A: Constraint Model & Signatures
 * 
 * This file defines the core types for the Architecture Constraint Engine (ACE).
 * These types enable architectural enforcement, drift detection, and safe autonomous evolution.
 * 
 * Version: 1.0.0
 * Status: Foundation Types (Read-Only in Wave 3A)
 */

/**
 * Constraint Type Classification
 * 
 * Defines the three primary categories of architectural constraints:
 * - structural: Physical and logical organization (modules, layers, dependencies)
 * - contract: Interfaces and agreements between components (APIs, types, events)
 * - governance: Constitutional and safety boundaries (protected paths, CS1-CS6)
 */
export type ConstraintType = 'structural' | 'contract' | 'governance';

/**
 * Constraint Severity
 * 
 * Indicates the criticality of constraint violations:
 * - critical: Must be fixed immediately, blocks all progress
 * - high: Must be fixed before merge
 * - medium: Should be fixed soon
 * - low: Nice to fix, advisory only
 */
export type ConstraintSeverity = 'critical' | 'high' | 'medium' | 'low';

/**
 * Constraint Scope
 * 
 * Defines where a constraint applies:
 * - global: Entire codebase
 * - module:${name}: Specific module
 * - layer:${name}: Architectural layer
 * - path:${pattern}: Specific path pattern
 */
export type ConstraintScope = 
  | 'global'
  | `module:${string}`
  | `layer:${string}`
  | `path:${string}`;

/**
 * Module Signature
 * 
 * Canonical representation of a single module's architecture.
 * Used to build the complete system architecture signature.
 */
export interface ModuleSignature {
  /** Module name (e.g., 'foreman', 'constraints') */
  name: string;
  
  /** Relative path from repository root */
  path: string;
  
  /** List of exported symbols (functions, classes, types) */
  exports: string[];
  
  /** List of external module imports */
  imports: string[];
  
  /** Architectural layer this module belongs to */
  layer: string;
  
  /** Content hash (SHA-256) of module code */
  hash: string;
}

/**
 * Dependency Graph
 * 
 * Represents the dependency relationships between modules.
 * Used for detecting circular dependencies and layering violations.
 */
export interface DependencyGraph {
  /** List of all module names in the system */
  nodes: string[];
  
  /** Directed edges representing dependencies */
  edges: Array<{
    /** Source module that imports */
    from: string;
    
    /** Target module that is imported */
    to: string;
    
    /** Type of import mechanism */
    type: 'import' | 'require';
  }>;
}

/**
 * Layer Definition
 * 
 * Defines an architectural layer and its dependency rules.
 * Layers enforce separation of concerns and prevent inverted dependencies.
 */
export interface LayerDefinition {
  /** Layer name (e.g., 'application', 'infrastructure', 'domain') */
  name: string;
  
  /** Human-readable description of layer purpose */
  description: string;
  
  /** Names of layers this layer is allowed to depend on */
  allowedDependencies: string[];
  
  /** List of modules belonging to this layer */
  modules: string[];
}

/**
 * API Contract
 * 
 * Defines the contract for an API endpoint.
 * Used for detecting breaking changes in public APIs.
 */
export interface APIContract {
  /** API endpoint path (e.g., '/api/foreman/status') */
  endpoint: string;
  
  /** HTTP method or function name */
  method: string;
  
  /** JSON schema for request body or parameters */
  requestSchema: Record<string, any>;
  
  /** JSON schema for response body */
  responseSchema: Record<string, any>;
  
  /** API version (semver) */
  version: string;
}

/**
 * Type Contract
 * 
 * Defines the contract for a TypeScript type or interface.
 * Used for detecting breaking changes in public type definitions.
 */
export interface TypeContract {
  /** Type or interface name */
  name: string;
  
  /** File path where type is defined */
  file: string;
  
  /** TypeScript definition string */
  definition: string;
  
  /** Whether this type is exported from the module */
  exported: boolean;
  
  /** Type contract version (semver) */
  version: string;
}

/**
 * Event Contract
 * 
 * Defines the contract for an event in the system.
 * Used for detecting breaking changes in event schemas.
 */
export interface EventContract {
  /** Event name (e.g., 'constraint_violation') */
  name: string;
  
  /** JSON schema for event payload */
  payload: Record<string, any>;
  
  /** Event schema version (semver) */
  version: string;
}

/**
 * Architecture Signature
 * 
 * Complete, canonical, versioned representation of the system architecture.
 * This signature is deterministic and hashable, enabling precise drift detection.
 * 
 * Properties:
 * - Deterministic: Same codebase state → Same signature (always)
 * - Versioned: Includes schema version for evolution
 * - Hashable: Can be reduced to a cryptographic hash
 * - Comprehensive: Captures all architecturally significant aspects
 */
export interface ArchitectureSignature {
  /** Signature schema version (semver, e.g., '1.0.0') */
  version: string;
  
  /** ISO 8601 timestamp of signature generation */
  timestamp: string;
  
  /** Repository metadata */
  repository: {
    /** Git repository URL */
    url: string;
    
    /** Git commit SHA (40 characters) */
    commit: string;
    
    /** Git branch name */
    branch: string;
  };
  
  /** Structural architecture information */
  structure: {
    /** All modules in the system */
    modules: ModuleSignature[];
    
    /** Dependency relationships between modules */
    dependencies: DependencyGraph;
    
    /** Architectural layers and their rules */
    layers: LayerDefinition[];
  };
  
  /** Contract definitions */
  contracts: {
    /** Public API contracts */
    apis: APIContract[];
    
    /** Public type contracts */
    types: TypeContract[];
    
    /** Event contracts */
    events: EventContract[];
  };
  
  /** Governance information */
  governance: {
    /** Protected file paths (immutable) */
    protectedPaths: string[];
    
    /** Active constraint IDs */
    constraints: string[];
    
    /** Governance version */
    version: string;
  };
  
  /** SHA-256 hash of entire signature (excluding this field) */
  hash: string;
}

/**
 * Constraint Declaration
 * 
 * Complete declaration of an architectural constraint.
 * Stored in the Constraint Registry and used for validation.
 */
export interface ConstraintDeclaration {
  /** Unique constraint identifier (e.g., 'structural.no-circular-deps') */
  id: string;
  
  /** Constraint version (semver) */
  version: string;
  
  /** Constraint type classification */
  type: ConstraintType;
  
  /** Specific category within type (e.g., 'dependency_direction', 'api_stability') */
  category: string;
  
  /** Human-readable rule description */
  rule: string;
  
  /** Where this constraint applies */
  scope: ConstraintScope;
  
  /** Violation severity */
  severity: ConstraintSeverity;
  
  /** Who owns and maintains this constraint */
  owner: string;
  
  /** Source document or file defining this constraint */
  source: string;
  
  /** Examples of compliant and non-compliant code */
  examples: {
    /** Examples that satisfy the constraint */
    valid: string[];
    
    /** Examples that violate the constraint */
    invalid: string[];
  };
  
  /** Additional constraint-specific metadata */
  metadata: Record<string, any>;
  
  /** ISO 8601 timestamp when constraint was created */
  createdAt: string;
  
  /** ISO 8601 timestamp when constraint was last updated */
  updatedAt: string;
}

/**
 * Constraint Registry Query Result
 * 
 * Result of querying the constraint registry with filters.
 */
export interface ConstraintQueryResult {
  /** Matching constraints */
  constraints: ConstraintDeclaration[];
  
  /** Total number of constraints in registry */
  total: number;
  
  /** Number of constraints matching the filter */
  filtered: number;
}

/**
 * Signature Comparison Result
 * 
 * Result of comparing two architecture signatures.
 * Used for drift detection and change analysis.
 */
export interface SignatureComparisonResult {
  /** Whether signatures are identical */
  identical: boolean;
  
  /** List of differences between signatures */
  differences: Array<{
    /** Type of change */
    type: 'added' | 'removed' | 'modified';
    
    /** Path to changed element (e.g., 'structure.modules[5]') */
    path: string;
    
    /** Human-readable description of the change */
    description: string;
  }>;
  
  /** Hash of old signature */
  oldHash: string;
  
  /** Hash of new signature */
  newHash: string;
}
