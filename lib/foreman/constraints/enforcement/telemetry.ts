/**
 * Enforcement Telemetry & Explainability
 * Wave 3C: Architecture Constraint Enforcement Hooks
 */

import {
  EnforcementAction,
  ExecutionResult,
  EnforcementContext,
  EnforcementEvent,
  FLCIEnforcementClassification,
  EnforcementQueryFilters,
} from '../../../../types/enforcement';
import { ClassifiedViolation } from '../../../../types/violations';

export async function emitEnforcementEvent(
  action: EnforcementAction,
  result: ExecutionResult
): Promise<void> {
  try {
    const event: EnforcementEvent = {
      eventId: `enforcement-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      enforcement: {
        hookName: action.metadata.hookName,
        actionType: action.type,
        violation: action.violation,
        reason: action.reason,
        governanceContext: action.governanceContext,
      },
      result: {
        blocked: result.blocked,
        escalated: result.escalated,
        approvalRequired: result.approvalRequired,
        success: result.success,
      },
      explainability: {
        decisionPath: action.metadata.decisionPath,
        rules: [],
        overridden: false,
      },
    };

    // Non-blocking emission (fire and forget)
    // In real implementation, would emit to Memory Fabric
    await Promise.resolve();
  } catch (error) {
    // Graceful degradation - log but don't throw
    console.warn('[Telemetry] Failed to emit enforcement event:', error);
  }
}

export function generateEnforcementReason(
  violation: ClassifiedViolation,
  action: EnforcementAction,
  context: EnforcementContext
): string {
  const actionTypeUpper = action.type.toUpperCase().replace('_', ' ');
  
  let reason = `Enforcement Action: ${actionTypeUpper}\n\n`;
  reason += `Reason: ${action.reason}\n\n`;

  if (action.governanceContext.csBoundary) {
    reason += `Governance Rule: ${action.governanceContext.csBoundary} `;
    if (action.governanceContext.csBoundary === 'CS2') {
      reason += `Architecture Approval Workflow (Constitutional Safeguard)\n\n`;
    } else if (action.governanceContext.csBoundary === 'CS1') {
      reason += `Immutable Guardrails (Constitutional Protection)\n\n`;
    } else {
      reason += `(Constitutional Safeguard)\n\n`;
    }
  }

  if (violation.location?.file) {
    reason += `File: '${violation.location.file}'\n\n`;
  }

  reason += `Constraint Violated: ${violation.constraintId} (severity: ${violation.severity})\n\n`;

  reason += `Required Action:\n`;
  if (action.type === 'require_approval') {
    reason += `1. Submit architecture change proposal via CS2 workflow\n`;
    reason += `2. Await Johan's approval\n`;
    reason += `3. After approval, changes can proceed\n\n`;
  } else if (action.type === 'block') {
    reason += `1. Identify ${violation.category} issue\n`;
    reason += `2. Refactor to resolve the violation\n`;
    reason += `3. Run detection again to verify fix\n\n`;
  } else if (action.type === 'warn') {
    reason += `1. Review the ${violation.category} issue\n`;
    reason += `2. Plan remediation\n`;
    reason += `3. Fix when convenient\n\n`;
  }

  reason += `Why This Matters:\n`;
  if (violation.category === 'dependency_direction') {
    reason += `Circular dependencies make code unmaintainable and prevent proper testing.\n\n`;
  } else if (violation.category === 'protected_path') {
    reason += `Protected files define system governance. Changes require explicit review to maintain constitutional integrity.\n\n`;
  } else if (violation.category === 'layer_violation') {
    reason += `Layer violations compromise architectural boundaries and maintainability.\n\n`;
  } else {
    reason += `This constraint ensures architectural integrity and system quality.\n\n`;
  }

  if (action.governanceContext.overrideAllowed) {
    reason += `Override: Set FOREMAN_ENFORCEMENT_OVERRIDE=true with justification`;
  } else {
    reason += `Override: Not permitted (Constitutional protection)`;
  }

  return reason;
}

export async function storeEnforcementInMemory(
  action: EnforcementAction,
  result: ExecutionResult
): Promise<void> {
  try {
    // Non-blocking storage (fire and forget)
    // In real implementation, would store in Memory Fabric
    await Promise.resolve();
  } catch (error) {
    console.warn('[Telemetry] Failed to store enforcement in memory:', error);
  }
}

export async function queryEnforcementsFromMemory(
  filters: EnforcementQueryFilters
): Promise<EnforcementEvent[]> {
  try {
    // In real implementation, would query from Memory Fabric
    return [];
  } catch (error) {
    console.warn('[Telemetry] Failed to query enforcements from memory:', error);
    return [];
  }
}

export function classifyEnforcementForFLCI(
  action: EnforcementAction,
  result: ExecutionResult
): FLCIEnforcementClassification {
  let flCategory: FLCIEnforcementClassification['flCategory'];

  if (result.success && !result.blocked) {
    flCategory = 'enforcement_success';
  } else if (result.blocked) {
    flCategory = 'enforcement_blocked';
  } else if (result.escalated) {
    flCategory = 'enforcement_escalated';
  } else {
    flCategory = 'enforcement_overridden';
  }

  return {
    enforcementId: `flci-${Date.now()}`,
    flCategory,
    ciAction: result.blocked ? 'strengthen_rule' : 'refine_detection',
    learningSuggestion: `Enforcement ${action.type} for ${action.violation.category} resulted in ${flCategory}`,
  };
}
