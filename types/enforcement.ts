/**
 * Architecture Constraint Enforcement - Type Definitions
 * Wave 3C: Enforcement Hooks with Governance Awareness
 * 
 * This file defines types for the enforcement hook system that controls
 * how architecture constraint violations are acted upon.
 * 
 * Version: 1.0.0
 * Status: Foundation Types (Wave 3C)
 */

import {
  ClassifiedViolation,
} from './violations';

import {
  ConstraintScope,
} from './constraints';

/**
 * Enforcement Hook Names
 * 
 * Defines the three primary enforcement hook points:
 * - pre-merge: Before PR merge to protected branch
 * - pre-build: Before build execution starts  
 * - runtime-validation: During runtime at governance checkpoints
 */
export type EnforcementHookName = 'pre-merge' | 'pre-build' | 'runtime-validation';

/**
 * Hook Configuration
 * 
 * Configuration for enforcement behavior at a hook point.
 */
export interface HookConfig {
  // Severity-based configuration
  blockOnSeverity?: ('critical' | 'high' | 'medium' | 'low')[];
  warnOnSeverity?: ('critical' | 'high' | 'medium' | 'low')[];
  alertOnSeverity?: ('critical' | 'high' | 'medium' | 'low')[];
  
  // Nature-based configuration
  blockOnNature?: ('governance' | 'structural' | 'contract')[];
  warnOnNature?: ('governance' | 'structural' | 'contract')[];
  
  // Override and approval
  allowOverride: boolean;
  requireApproval: boolean;
  
  // Reporting
  logToConsole: boolean;
  logToMemory: boolean;
  
  // Runtime-specific
  validationInterval?: number;
  reportOnly?: boolean;
}

/**
 * Enforcement Hook Definition
 * 
 * Complete definition of an enforcement hook.
 */
export interface EnforcementHook {
  name: EnforcementHookName;
  enabled: boolean;
  config: HookConfig;
}

/**
 * Enforcement Context
 * 
 * Context information for enforcement decisions.
 */
export interface EnforcementContext {
  operation: string;               // What operation triggered enforcement
  user?: string;                   // Who initiated operation
  branch?: string;                 // Git branch
  commit?: string;                 // Git commit
  prNumber?: number;               // PR number (if pre-merge)
  buildId?: string;                // Build ID (if pre-build)
  environment: 'development' | 'staging' | 'production';
}

/**
 * Enforcement Action Type
 * 
 * Types of enforcement actions that can be taken.
 */
export type EnforcementActionType = 
  | 'allow'             // No enforcement, pass through
  | 'warn'              // Log warning, continue execution
  | 'block'             // Block operation, require fix
  | 'escalate'          // Escalate to owner for decision
  | 'require_approval'; // Trigger CS2 architecture approval

/**
 * Enforcement Action
 * 
 * Complete enforcement action with governance context.
 */
export interface EnforcementAction {
  type: EnforcementActionType;
  violation: ClassifiedViolation;
  reason: string;
  governanceContext: {
    csBoundary?: 'CS1' | 'CS2' | 'CS3' | 'CS4' | 'CS5' | 'CS6';
    protectedDomain?: string;
    requiresApproval: boolean;
    overrideAllowed: boolean;
  };
  metadata: {
    hookName: string;
    timestamp: string;
    decisionPath: string[];
  };
}

/**
 * Execution Result
 * 
 * Result of executing an enforcement action.
 */
export interface ExecutionResult {
  success: boolean;
  actionType: EnforcementActionType;
  blocked: boolean;
  escalated: boolean;
  approvalRequired: boolean;
  message: string;
  remediationSteps?: string[];
  overrideInstructions?: string;
}

/**
 * Hook Trigger Result
 * 
 * Result of triggering an enforcement hook.
 */
export interface HookTriggerResult {
  hookName: string;
  triggered: boolean;
  actions: EnforcementAction[];
  results: ExecutionResult[];
  summary: {
    allowed: number;
    warned: number;
    blocked: number;
    escalated: number;
    approvalRequired: number;
  };
}

/**
 * CS Boundary Check
 * 
 * Result of checking CS1-CS6 boundaries.
 */
export interface CSBoundaryCheck {
  violated: boolean;
  csBoundary?: 'CS1' | 'CS2' | 'CS3' | 'CS4' | 'CS5' | 'CS6';
  description: string;
  requiresApproval: boolean;
}

/**
 * Protected Domain Check
 * 
 * Result of checking protected domain access.
 */
export interface ProtectedDomainCheck {
  isProtected: boolean;
  domain?: string;
  paths: string[];
  requiresApproval: boolean;
}

/**
 * Enforcement Event (Telemetry)
 * 
 * Telemetry event for enforcement actions.
 */
export interface EnforcementEvent {
  eventId: string;
  timestamp: string;
  version: string;
  enforcement: {
    hookName: string;
    actionType: EnforcementActionType;
    violation: ClassifiedViolation;
    reason: string;
    governanceContext: {
      csBoundary?: string;
      protectedDomain?: string;
      requiresApproval: boolean;
    };
  };
  result: {
    blocked: boolean;
    escalated: boolean;
    approvalRequired: boolean;
    success: boolean;
  };
  explainability: {
    decisionPath: string[];
    rules: string[];
    overridden: boolean;
    overrideReason?: string;
  };
}

/**
 * FL/CI Enforcement Classification
 * 
 * Classification of enforcement action for FL/CI learning.
 */
export interface FLCIEnforcementClassification {
  enforcementId: string;
  flCategory: 'enforcement_success' | 'enforcement_blocked' | 'enforcement_escalated' | 'enforcement_overridden';
  ciAction: 'strengthen_rule' | 'refine_detection' | 'update_severity' | 'add_escape_hatch';
  learningSuggestion: string;
}

/**
 * Enforcement Query Filters
 * 
 * Filters for querying enforcement events from memory.
 */
export interface EnforcementQueryFilters {
  hookName?: EnforcementHookName;
  actionType?: EnforcementActionType;
  blocked?: boolean;
  escalated?: boolean;
  since?: string;
  until?: string;
}

/**
 * Blocking Error
 * 
 * Error thrown when enforcement blocks an operation.
 */
export class BlockingError extends Error {
  constructor(
    public action: EnforcementAction,
    public remediation: string[],
    public overrideInstructions?: string
  ) {
    super(action.reason);
    this.name = 'BlockingError';
  }
}
