/**
 * Autonomy State Model
 * 
 * Architecture: /architecture/autonomy-reauthorization-architecture.md
 * 
 * Manages execution mode transitions and autonomy authorization state.
 * Enforces CS6 (Execution Boundary) constitutional requirements.
 */

import { statePersistence } from './state-persistence';
import { randomUUID } from 'crypto';

export type ExecutionMode = 
  | 'FORWARD_EXECUTION'    // Normal autonomous operation
  | 'CORRECTION_MODE';     // Remediation/halt mode

export type AutonomyAuthorizationStatus =
  | 'AUTHORIZED'           // Owner approved forward execution
  | 'AWAITING_AUTHORIZATION' // Waiting for Owner decision
  | 'DENIED';              // Owner denied forward execution

export interface AutonomyState {
  executionMode: ExecutionMode;
  authorizationStatus: AutonomyAuthorizationStatus;
  lastTransition: Date;
  lastTransitionReason: string;
  transitionHistory: StateTransition[];
  ownerApproval?: OwnerApproval;
}

export interface StateTransition {
  id: string;
  timestamp: Date;
  fromMode: ExecutionMode;
  toMode: ExecutionMode;
  reason: string;
  triggeredBy: 'SYSTEM' | 'OWNER' | 'PROGRAM';
  programId?: string;
}

export interface OwnerApproval {
  decision: 'APPROVE' | 'DENY';
  timestamp: Date;
  ownerId: string;
  reason?: string;
  systemState: SystemStateSnapshot;
}

export interface SystemStateSnapshot {
  timestamp: Date;
  testsPassing: boolean;
  zeroTestDebt: boolean;
  ciStable: boolean;
  incidentsResolved: boolean;
  buildGreen: boolean;
  lintClean: boolean;
}

// In-memory state (singleton)
let currentState: AutonomyState = {
  executionMode: 'FORWARD_EXECUTION',
  authorizationStatus: 'AUTHORIZED',
  lastTransition: new Date(),
  lastTransitionReason: 'Initial state',
  transitionHistory: [],
};

/**
 * Get current autonomy state
 */
export function getCurrentState(): AutonomyState {
  return { ...currentState };
}

/**
 * Transition to CORRECTION_MODE
 * Called when a halt-inducing program completes
 */
export function transitionToCorrectionMode(reason: string, programId?: string): void {
  const transition: StateTransition = {
    id: `transition_${Date.now()}_${randomUUID().replace(/-/g, '').substring(0, 9)}`,
    timestamp: new Date(),
    fromMode: currentState.executionMode,
    toMode: 'CORRECTION_MODE',
    reason,
    triggeredBy: 'PROGRAM',
    programId,
  };

  currentState = {
    ...currentState,
    executionMode: 'CORRECTION_MODE',
    authorizationStatus: 'AWAITING_AUTHORIZATION',
    lastTransition: new Date(),
    lastTransitionReason: reason,
    transitionHistory: [...currentState.transitionHistory, transition],
    ownerApproval: undefined, // Clear previous approval
  };

  // Persist state
  statePersistence.saveState(currentState).catch(err => {
    console.error('Failed to persist state:', err);
  });

  console.log(`[Autonomy State] Transitioned to CORRECTION_MODE: ${reason}`);
}

/**
 * Request reauthorization (validates system state first)
 * Returns boolean indicating if request can proceed
 */
export function requestReauthorization(): boolean {
  if (currentState.executionMode !== 'CORRECTION_MODE') {
    throw new Error('Cannot request reauthorization: not in CORRECTION_MODE');
  }

  if (currentState.authorizationStatus === 'AWAITING_AUTHORIZATION') {
    console.log('[Autonomy State] Reauthorization already requested');
    return true;
  }

  currentState = {
    ...currentState,
    authorizationStatus: 'AWAITING_AUTHORIZATION',
  };

  statePersistence.saveState(currentState).catch(err => {
    console.error('Failed to persist state:', err);
  });

  console.log('[Autonomy State] Reauthorization requested');
  return true;
}

/**
 * Record Owner decision on reauthorization
 */
export function recordOwnerDecision(
  decision: 'APPROVE' | 'DENY',
  ownerId: string,
  reason?: string,
  systemState?: SystemStateSnapshot
): void {
  if (!ownerId || ownerId.trim() === '') {
    throw new Error('Owner ID is required for decision recording');
  }

  if (currentState.executionMode !== 'CORRECTION_MODE') {
    throw new Error('Cannot record decision: not in CORRECTION_MODE');
  }

  const approval: OwnerApproval = {
    decision,
    timestamp: new Date(),
    ownerId,
    reason,
    systemState: systemState || {
      timestamp: new Date(),
      testsPassing: true,
      zeroTestDebt: true,
      ciStable: true,
      incidentsResolved: true,
      buildGreen: true,
      lintClean: true,
    },
  };

  currentState = {
    ...currentState,
    authorizationStatus: decision === 'APPROVE' ? 'AUTHORIZED' : 'DENIED',
    ownerApproval: approval,
  };

  statePersistence.saveState(currentState).catch(err => {
    console.error('Failed to persist state:', err);
  });

  console.log(`[Autonomy State] Owner decision recorded: ${decision} by ${ownerId}`);
}

/**
 * Transition to FORWARD_EXECUTION
 * Only allowed after Owner approval
 */
export function transitionToForwardExecution(): void {
  if (currentState.executionMode === 'FORWARD_EXECUTION') {
    console.log('[Autonomy State] Already in FORWARD_EXECUTION mode');
    return;
  }

  if (currentState.executionMode === 'CORRECTION_MODE' && 
      currentState.authorizationStatus !== 'AUTHORIZED') {
    throw new Error('Cannot transition to FORWARD_EXECUTION: Owner approval required');
  }

  const transition: StateTransition = {
    id: `transition_${Date.now()}_${randomUUID().replace(/-/g, '').substring(0, 9)}`,
    timestamp: new Date(),
    fromMode: currentState.executionMode,
    toMode: 'FORWARD_EXECUTION',
    reason: 'Owner approved reauthorization',
    triggeredBy: 'OWNER',
  };

  currentState = {
    ...currentState,
    executionMode: 'FORWARD_EXECUTION',
    authorizationStatus: 'AUTHORIZED',
    lastTransition: new Date(),
    lastTransitionReason: 'Owner approved reauthorization',
    transitionHistory: [...currentState.transitionHistory, transition],
  };

  statePersistence.saveState(currentState).catch(err => {
    console.error('Failed to persist state:', err);
  });

  console.log('[Autonomy State] Transitioned to FORWARD_EXECUTION');
}

/**
 * Check if execution is currently blocked
 */
export function isExecutionBlocked(): boolean {
  return currentState.executionMode === 'CORRECTION_MODE';
}

/**
 * Get full transition history
 */
export function getTransitionHistory(): StateTransition[] {
  return [...currentState.transitionHistory];
}

/**
 * Load state from persistence (for recovery)
 */
export async function loadState(): Promise<void> {
  try {
    const loadedState = await statePersistence.loadState();
    if (loadedState) {
      currentState = loadedState;
      console.log('[Autonomy State] State loaded from persistence');
    }
  } catch (error) {
    console.log('[Autonomy State] No persisted state found, using default');
  }
}

/**
 * Reset state (for testing only)
 */
export function resetState(): void {
  currentState = {
    executionMode: 'FORWARD_EXECUTION',
    authorizationStatus: 'AUTHORIZED',
    lastTransition: new Date(),
    lastTransitionReason: 'State reset',
    transitionHistory: [],
  };
}

// Export singleton instance methods
export const stateModel = {
  getCurrentState,
  transitionToCorrectionMode,
  requestReauthorization,
  recordOwnerDecision,
  transitionToForwardExecution,
  isExecutionBlocked,
  getTransitionHistory,
  loadState,
  resetState,
};
