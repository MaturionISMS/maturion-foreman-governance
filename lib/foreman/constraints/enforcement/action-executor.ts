/**
 * Enforcement Action Executor
 * Wave 3C: Architecture Constraint Enforcement Hooks
 */

import {
  EnforcementAction,
  ExecutionResult,
  BlockingError,
} from '../../../../types/enforcement';

export async function executeEnforcementAction(
  action: EnforcementAction
): Promise<ExecutionResult> {
  switch (action.type) {
    case 'allow':
      return {
        success: true,
        actionType: 'allow',
        blocked: false,
        escalated: false,
        approvalRequired: false,
        message: 'Operation allowed',
      };

    case 'warn':
      return executeWarning(action);

    case 'block':
      return executeBlocking(action);

    case 'escalate':
      return executeEscalation(action);

    case 'require_approval':
      return executeApprovalRequirement(action);

    default:
      return {
        success: true,
        actionType: 'allow',
        blocked: false,
        escalated: false,
        approvalRequired: false,
        message: 'Unknown action type, allowing by default',
      };
  }
}

export async function executeWarning(action: EnforcementAction): Promise<ExecutionResult> {
  console.warn(`[Enforcement Warning] ${action.reason}`);
  console.warn(`Violation: ${action.violation.description}`);

  return {
    success: true,
    actionType: 'warn',
    blocked: false,
    escalated: false,
    approvalRequired: false,
    message: action.reason,
  };
}

export async function executeBlocking(action: EnforcementAction): Promise<ExecutionResult> {
  console.error(`[Enforcement Block] ${action.reason}`);
  console.error(`Violation: ${action.violation.description}`);

  const remediation = [
    `1. Review the violation: ${action.violation.description}`,
    `2. Fix the ${action.violation.category} issue`,
    `3. Run enforcement check again to verify`,
  ];

  const overrideInstructions = action.governanceContext.overrideAllowed
    ? 'Override: Set FOREMAN_ENFORCEMENT_OVERRIDE=true with justification'
    : undefined;

  throw new BlockingError(action, remediation, overrideInstructions);
}

export async function executeEscalation(action: EnforcementAction): Promise<ExecutionResult> {
  console.warn(`[Enforcement Escalation] ${action.reason}`);
  console.warn(`Violation escalated to owner for review`);

  return {
    success: true,
    actionType: 'escalate',
    blocked: false,
    escalated: true,
    approvalRequired: false,
    message: action.reason,
  };
}

export async function executeApprovalRequirement(
  action: EnforcementAction
): Promise<ExecutionResult> {
  console.warn(`[Enforcement Approval Required] ${action.reason}`);
  console.warn(`CS${action.governanceContext.csBoundary?.slice(-1)} approval workflow triggered`);

  return {
    success: true,
    actionType: 'require_approval',
    blocked: false,
    escalated: false,
    approvalRequired: true,
    message: `${action.reason} - CS2 approval workflow required`,
  };
}
