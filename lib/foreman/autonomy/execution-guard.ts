/**
 * Execution Guard
 * 
 * Architecture: /architecture/autonomy-reauthorization-architecture.md
 * 
 * Enforces execution blocking when in CORRECTION_MODE.
 * Integrates with chat executor, build sequence, wave execution, and task scheduler.
 */

import { stateModel } from './state-model';

// Manual override (for testing or emergency situations)
let manualBlockActive = false;
let manualBlockReason = '';

/**
 * Check if execution is allowed
 * Returns true if execution can proceed, false if blocked
 */
export function checkExecutionAllowed(): boolean {
  // Check manual block first
  if (manualBlockActive) {
    console.log(`[Execution Guard] Execution blocked (manual): ${manualBlockReason}`);
    return false;
  }

  // Check autonomy state
  const state = stateModel.getCurrentState();
  
  if (state.executionMode === 'CORRECTION_MODE') {
    console.log('[Execution Guard] Execution blocked: System in CORRECTION_MODE');
    return false;
  }

  if (state.authorizationStatus !== 'AUTHORIZED') {
    console.log(`[Execution Guard] Execution blocked: Authorization status is ${state.authorizationStatus}`);
    return false;
  }

  return true;
}

/**
 * Block execution with reason (manual override)
 */
export function blockExecution(reason: string): void {
  manualBlockActive = true;
  manualBlockReason = reason;
  console.log(`[Execution Guard] Execution manually blocked: ${reason}`);
}

/**
 * Unblock execution (manual override)
 */
export function unblockExecution(): void {
  manualBlockActive = false;
  manualBlockReason = '';
  console.log('[Execution Guard] Execution manually unblocked');
}

/**
 * Get current block status
 */
export function getBlockStatus(): { blocked: boolean; reason?: string; mode?: string } {
  if (manualBlockActive) {
    return {
      blocked: true,
      reason: manualBlockReason,
      mode: 'MANUAL',
    };
  }

  const state = stateModel.getCurrentState();
  
  if (state.executionMode === 'CORRECTION_MODE') {
    return {
      blocked: true,
      reason: state.lastTransitionReason,
      mode: 'CORRECTION_MODE',
    };
  }

  if (state.authorizationStatus !== 'AUTHORIZED') {
    return {
      blocked: true,
      reason: `Authorization status: ${state.authorizationStatus}`,
      mode: 'AWAITING_AUTHORIZATION',
    };
  }

  return {
    blocked: false,
  };
}

/**
 * Assert execution is allowed (throws if blocked)
 * Use this in critical execution paths
 */
export function assertExecutionAllowed(operation: string): void {
  if (!checkExecutionAllowed()) {
    const status = getBlockStatus();
    throw new Error(
      `Execution blocked for operation "${operation}": ${status.reason || 'Unknown reason'} (mode: ${status.mode})`
    );
  }
}

/**
 * Integration: Check before chat command execution
 */
export function checkChatExecutionAllowed(command: string): boolean {
  const allowed = checkExecutionAllowed();
  
  if (!allowed) {
    const status = getBlockStatus();
    console.log(`[Execution Guard] Chat command blocked: ${command} (${status.reason})`);
  }
  
  return allowed;
}

/**
 * Integration: Check before build sequence execution
 */
export function checkBuildSequenceAllowed(sequenceId: string): boolean {
  const allowed = checkExecutionAllowed();
  
  if (!allowed) {
    const status = getBlockStatus();
    console.log(`[Execution Guard] Build sequence blocked: ${sequenceId} (${status.reason})`);
  }
  
  return allowed;
}

/**
 * Integration: Check before wave execution
 */
export function checkWaveExecutionAllowed(waveId: string): boolean {
  const allowed = checkExecutionAllowed();
  
  if (!allowed) {
    const status = getBlockStatus();
    console.log(`[Execution Guard] Wave execution blocked: ${waveId} (${status.reason})`);
  }
  
  return allowed;
}

/**
 * Integration: Check before task execution
 */
export function checkTaskExecutionAllowed(taskId: string): boolean {
  const allowed = checkExecutionAllowed();
  
  if (!allowed) {
    const status = getBlockStatus();
    console.log(`[Execution Guard] Task execution blocked: ${taskId} (${status.reason})`);
  }
  
  return allowed;
}

// Export singleton
export const executionGuard = {
  checkExecutionAllowed,
  blockExecution,
  unblockExecution,
  getBlockStatus,
  assertExecutionAllowed,
  checkChatExecutionAllowed,
  checkBuildSequenceAllowed,
  checkWaveExecutionAllowed,
  checkTaskExecutionAllowed,
};
