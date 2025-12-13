/**
 * Governance-Aware Enforcement Engine
 * Wave 3C: Architecture Constraint Enforcement Hooks
 */

import {
  EnforcementAction,
  EnforcementHook,
  EnforcementContext,
  CSBoundaryCheck,
  ProtectedDomainCheck,
} from '../../../../types/enforcement';
import { ClassifiedViolation } from '../../../../types/violations';

const PROTECTED_PATHS = [
  'BUILD_PHILOSOPHY.md',
  '.github/workflows/',
  'foreman/constitution/',
  'foreman/governance/',
];

export async function determineEnforcementAction(
  violation: ClassifiedViolation,
  hook: EnforcementHook,
  context: EnforcementContext
): Promise<EnforcementAction> {
  const csCheck = checkCSBoundaries(violation, context);
  const domainCheck = checkProtectedDomain(violation);

  // CS2 - Architecture Approval required
  if (csCheck.violated && csCheck.csBoundary === 'CS2') {
    return {
      type: 'require_approval',
      violation,
      reason: 'CS2 architecture approval required for protected file modification',
      governanceContext: {
        csBoundary: 'CS2',
        protectedDomain: domainCheck.domain,
        requiresApproval: true,
        overrideAllowed: false,
      },
      metadata: {
        hookName: hook.name,
        timestamp: new Date().toISOString(),
        decisionPath: ['check_cs_boundaries', 'cs2_check', 'require_approval'],
      },
    };
  }

  // CS1 - Immutable guardrails  
  if (csCheck.violated && csCheck.csBoundary === 'CS1') {
    return {
      type: 'block',
      violation,
      reason: 'CS1 immutable guardrail violation',
      governanceContext: {
        csBoundary: 'CS1',
        requiresApproval: false,
        overrideAllowed: false,
      },
      metadata: {
        hookName: hook.name,
        timestamp: new Date().toISOString(),
        decisionPath: ['check_cs_boundaries', 'cs1_block'],
      },
    };
  }

  // Critical violations -> Block
  // Filter out 'info' severity as it's not enforceable
  if (
    (violation.severity !== 'info' && hook.config.blockOnSeverity?.includes(violation.severity as 'critical' | 'high' | 'medium' | 'low')) ||
    hook.config.blockOnNature?.includes(violation.nature)
  ) {
    return {
      type: 'block',
      violation,
      reason: `${violation.severity} ${violation.nature} violation must be fixed`,
      governanceContext: {
        requiresApproval: false,
        overrideAllowed: hook.config.allowOverride,
      },
      metadata: {
        hookName: hook.name,
        timestamp: new Date().toISOString(),
        decisionPath: ['check_severity', 'block'],
      },
    };
  }

  // Medium violations -> Warn
  // Filter out 'info' severity as it's not enforceable
  if (violation.severity !== 'info' && hook.config.warnOnSeverity?.includes(violation.severity as 'critical' | 'high' | 'medium' | 'low')) {
    return {
      type: 'warn',
      violation,
      reason: `${violation.severity} violation detected - review recommended`,
      governanceContext: {
        requiresApproval: false,
        overrideAllowed: true,
      },
      metadata: {
        hookName: hook.name,
        timestamp: new Date().toISOString(),
        decisionPath: ['check_severity', 'warn'],
      },
    };
  }

  // Default -> Allow
  return {
    type: 'allow',
    violation,
    reason: 'Low severity violation logged for awareness',
    governanceContext: {
      requiresApproval: false,
      overrideAllowed: true,
    },
    metadata: {
      hookName: hook.name,
      timestamp: new Date().toISOString(),
      decisionPath: ['allow'],
    },
  };
}

export function checkCSBoundaries(
  violation: ClassifiedViolation,
  context: EnforcementContext
): CSBoundaryCheck {
  // Check for CS2 (protected files that need approval)
  const file = violation.location?.file || '';
  
  if (file === 'BUILD_PHILOSOPHY.md' || file.includes('foreman/constitution/')) {
    return {
      violated: true,
      csBoundary: 'CS2',
      description: 'CS2 Architecture Approval Workflow - Protected file modification requires approval',
      requiresApproval: true,
    };
  }

  // Check for CS1 (immutable guardrails)
  if (file.includes('.github/workflows/')) {
    return {
      violated: true,
      csBoundary: 'CS1',
      description: 'CS1 Immutable Guardrails - Workflow files cannot be modified',
      requiresApproval: false,
    };
  }

  // CS3 for other critical governance violations
  if (violation.type === 'governance' && violation.severity === 'critical') {
    return {
      violated: true,
      csBoundary: 'CS3',
      description: 'CS3 Incident Workflow - Critical governance violation',
      requiresApproval: false,
    };
  }

  return {
    violated: false,
    description: 'No CS boundary violation detected',
    requiresApproval: false,
  };
}

export function checkProtectedDomain(violation: ClassifiedViolation): ProtectedDomainCheck {
  const file = violation.location?.file || '';
  
  for (const protectedPath of PROTECTED_PATHS) {
    if (file === protectedPath || file.includes(protectedPath)) {
      return {
        isProtected: true,
        domain: protectedPath,
        paths: [file],
        requiresApproval: true,
      };
    }
  }

  return {
    isProtected: false,
    paths: [],
    requiresApproval: false,
  };
}

export function requiresExplicitApproval(
  violation: ClassifiedViolation,
  action: EnforcementAction
): boolean {
  return action.governanceContext.requiresApproval;
}
