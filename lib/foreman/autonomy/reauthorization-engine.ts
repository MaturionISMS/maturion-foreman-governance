/**
 * Re-Authorization Engine
 * 
 * Architecture: /architecture/autonomy-reauthorization-architecture.md
 * 
 * Orchestrates the autonomy re-authorization workflow.
 */

import { stateModel } from './state-model';
import { systemValidator } from './system-validator';
import { statePersistence } from './state-persistence';
import { randomUUID } from 'crypto';
import type { SystemStateSnapshot } from './state-model';
import type { SystemValidationResult } from './system-validator';

export interface ReauthorizationRequest {
  id: string;
  programId: string;
  timestamp: Date;
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'CANCELLED';
  systemState?: SystemStateSnapshot;
  validationResult?: SystemValidationResult;
}

export interface ReauthorizationRequestResult {
  requestId: string;
  systemState: SystemStateSnapshot;
  validationResult?: SystemValidationResult;
  error?: string;
  validationFailures?: string[];
}

export interface OwnerDecisionResult {
  state: any; // AutonomyState
  decision: 'APPROVE' | 'DENY';
  timestamp: Date;
}

export interface ReauthorizationStatus {
  requestId?: string;
  status: string;
  state?: any;
}

// In-memory store of requests
const requests = new Map<string, ReauthorizationRequest>();

/**
 * Request reauthorization after program completion
 */
export async function requestReauthorization(programId: string): Promise<ReauthorizationRequestResult> {
  try {
    // Ensure in CORRECTION_MODE
    const currentState = stateModel.getCurrentState();
    
    if (currentState.executionMode !== 'CORRECTION_MODE') {
      // Transition to CORRECTION_MODE first
      stateModel.transitionToCorrectionMode(`Program ${programId} completed`, programId);
    }

    // Validate system state
    const validationResult = await systemValidator.validateSystemState(programId);

    // If system is not clean, block the request
    if (!validationResult.isClean) {
      return {
        requestId: '',
        systemState: createEmptySystemState(),
        validationResult,
        error: 'System validation failed',
        validationFailures: validationResult.violations,
      };
    }

    // Create reauthorization request
    const requestId = `reauth_${Date.now()}_${randomUUID().replace(/-/g, '').substring(0, 9)}`;
    
    const systemState: SystemStateSnapshot = {
      timestamp: new Date(),
      testsPassing: validationResult.checks.testsPassing.passed,
      zeroTestDebt: validationResult.checks.zeroTestDebt.passed,
      ciStable: validationResult.checks.ciStable.passed,
      incidentsResolved: validationResult.checks.incidentsResolved.passed,
      buildGreen: validationResult.checks.buildGreen.passed,
      lintClean: validationResult.checks.lintClean.passed,
    };

    const request: ReauthorizationRequest = {
      id: requestId,
      programId,
      timestamp: new Date(),
      status: 'PENDING',
      systemState,
      validationResult,
    };

    requests.set(requestId, request);

    // Persist request
    await statePersistence.saveReauthorizationRequest(request);

    // Update state to AWAITING_AUTHORIZATION
    stateModel.requestReauthorization();

    console.log(`[Reauthorization Engine] Request created: ${requestId}`);

    return {
      requestId,
      systemState,
      validationResult,
    };
  } catch (error) {
    console.error('[Reauthorization Engine] Request failed:', error);
    throw error;
  }
}

/**
 * Process Owner decision on reauthorization
 */
export async function processOwnerDecision(
  requestId: string,
  decision: 'APPROVE' | 'DENY',
  ownerId: string,
  reason?: string
): Promise<OwnerDecisionResult> {
  try {
    // Validate request exists
    const request = requests.get(requestId);
    
    if (!request) {
      throw new Error(`Reauthorization request not found: ${requestId}`);
    }

    if (request.status !== 'PENDING') {
      throw new Error(`Request ${requestId} is not pending: ${request.status}`);
    }

    // Validate Owner ID
    if (!ownerId || ownerId.trim() === '') {
      throw new Error('Owner ID is required');
    }

    // Record decision in state model
    stateModel.recordOwnerDecision(decision, ownerId, reason, request.systemState);

    // Update request status
    request.status = decision === 'APPROVE' ? 'APPROVED' : 'DENIED';
    requests.set(requestId, request);
    await statePersistence.saveReauthorizationRequest(request);

    // If approved, transition to FORWARD_EXECUTION
    if (decision === 'APPROVE') {
      stateModel.transitionToForwardExecution();
      console.log(`[Reauthorization Engine] Request ${requestId} APPROVED by ${ownerId}`);
    } else {
      console.log(`[Reauthorization Engine] Request ${requestId} DENIED by ${ownerId}`);
    }

    return {
      state: stateModel.getCurrentState(),
      decision,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('[Reauthorization Engine] Decision processing failed:', error);
    throw error;
  }
}

/**
 * Get reauthorization status
 */
export async function getReauthorizationStatus(requestId?: string): Promise<ReauthorizationStatus> {
  if (requestId) {
    const request = requests.get(requestId);
    
    if (!request) {
      throw new Error(`Reauthorization request not found: ${requestId}`);
    }

    return {
      requestId: request.id,
      status: request.status,
      state: stateModel.getCurrentState(),
    };
  }

  // Return current autonomy state
  return {
    status: 'CURRENT_STATE',
    state: stateModel.getCurrentState(),
  };
}

/**
 * Cancel reauthorization request
 */
export async function cancelReauthorizationRequest(
  requestId: string,
  reason: string
): Promise<{ cancelled: boolean; reason: string }> {
  try {
    const request = requests.get(requestId);
    
    if (!request) {
      throw new Error(`Reauthorization request not found: ${requestId}`);
    }

    if (request.status !== 'PENDING') {
      throw new Error(`Cannot cancel request ${requestId}: status is ${request.status}`);
    }

    request.status = 'CANCELLED';
    requests.set(requestId, request);
    await statePersistence.saveReauthorizationRequest(request);

    console.log(`[Reauthorization Engine] Request ${requestId} cancelled: ${reason}`);

    return {
      cancelled: true,
      reason,
    };
  } catch (error) {
    console.error('[Reauthorization Engine] Cancellation failed:', error);
    throw error;
  }
}

/**
 * Helper: Create empty system state
 */
function createEmptySystemState(): SystemStateSnapshot {
  return {
    timestamp: new Date(),
    testsPassing: false,
    zeroTestDebt: false,
    ciStable: false,
    incidentsResolved: false,
    buildGreen: false,
    lintClean: false,
  };
}

// Export singleton
export const reauthorizationEngine = {
  requestReauthorization,
  processOwnerDecision,
  getReauthorizationStatus,
  cancelReauthorizationRequest,
};
