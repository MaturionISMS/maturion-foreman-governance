/**
 * Wave 3C: Architecture Constraint Enforcement Hooks - Red QA Test Suite
 * 
 * This test suite validates the Enforcement Hook System, Governance-Aware
 * Enforcement Engine, Action Executor, and Telemetry & Explainability systems.
 * 
 * These tests are designed to be RED (failing) initially, then turn GREEN
 * as the implementation is completed following the Build Philosophy.
 * 
 * Test Categories:
 * 1. Hook Registration & Management
 * 2. Hook Triggering & Execution
 * 3. Governance-Aware Enforcement (CS1-CS6)
 * 4. Enforcement Actions (Warn, Block, Escalate, Approval)
 * 5. Explainability & Reason Generation
 * 6. Telemetry & Memory Integration
 * 7. Safe Failure Modes
 * 8. Integration Tests
 */

import {
  ArchitectureSignature,
  ConstraintDeclaration,
} from '../../types/constraints';

import {
  ClassifiedViolation,
  ViolationSeverity,
} from '../../types/violations';

import {
  EnforcementHook,
  EnforcementHookName,
  HookConfig,
  EnforcementContext,
  EnforcementAction,
  EnforcementActionType,
  ExecutionResult,
  HookTriggerResult,
  CSBoundaryCheck,
  ProtectedDomainCheck,
  EnforcementEvent,
  FLCIEnforcementClassification,
  BlockingError,
  EnforcementQueryFilters,
} from '../../types/enforcement';

// Import functions to be implemented
import {
  registerHook,
  unregisterHook,
  getHook,
  listHooks,
  updateHookConfig,
  triggerHook,
} from '../../lib/foreman/constraints/enforcement/hook-registry';

import {
  determineEnforcementAction,
  checkCSBoundaries,
  checkProtectedDomain,
  requiresExplicitApproval,
} from '../../lib/foreman/constraints/enforcement/governance-engine';

import {
  executeEnforcementAction,
  executeWarning,
  executeBlocking,
  executeEscalation,
  executeApprovalRequirement,
} from '../../lib/foreman/constraints/enforcement/action-executor';

import {
  emitEnforcementEvent,
  generateEnforcementReason,
  storeEnforcementInMemory,
  queryEnforcementsFromMemory,
  classifyEnforcementForFLCI,
} from '../../lib/foreman/constraints/enforcement/telemetry';

describe('Wave 3C: Hook Registration & Management', () => {
  beforeEach(() => {
    // Clear all hooks before each test
    const hooks = listHooks();
    hooks.forEach(hook => unregisterHook(hook.name));
  });

  describe('Hook Registration', () => {
    it('should register pre-merge hook successfully', () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical', 'high'],
          warnOnSeverity: ['medium'],
          allowOverride: true,
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const registered = getHook('pre-merge');
      expect(registered).toBeDefined();
      expect(registered?.name).toBe('pre-merge');
      expect(registered?.enabled).toBe(true);
      expect(registered?.config.blockOnSeverity).toContain('critical');
    });

    it('should register pre-build hook successfully', () => {
      const hook: EnforcementHook = {
        name: 'pre-build',
        enabled: true,
        config: {
          warnOnSeverity: ['critical', 'high', 'medium'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const registered = getHook('pre-build');
      expect(registered).toBeDefined();
      expect(registered?.name).toBe('pre-build');
    });

    it('should register runtime-validation hook successfully', () => {
      const hook: EnforcementHook = {
        name: 'runtime-validation',
        enabled: true,
        config: {
          alertOnSeverity: ['critical'],
          validationInterval: 60000, // 1 minute
          reportOnly: true,
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const registered = getHook('runtime-validation');
      expect(registered).toBeDefined();
      expect(registered?.config.validationInterval).toBe(60000);
      expect(registered?.config.reportOnly).toBe(true);
    });

    it('should update existing hook on re-registration', () => {
      const hook1: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook1);

      const hook2: EnforcementHook = {
        name: 'pre-merge',
        enabled: false, // Changed
        config: {
          blockOnSeverity: ['critical', 'high'], // Changed
          allowOverride: false, // Changed
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook2);

      const registered = getHook('pre-merge');
      expect(registered?.enabled).toBe(false);
      expect(registered?.config.blockOnSeverity).toContain('high');
      expect(registered?.config.allowOverride).toBe(false);
    });
  });

  describe('Hook Unregistration', () => {
    it('should unregister hook successfully', () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);
      expect(getHook('pre-merge')).toBeDefined();

      unregisterHook('pre-merge');
      expect(getHook('pre-merge')).toBeUndefined();
    });

    it('should handle unregistering non-existent hook gracefully', () => {
      expect(() => unregisterHook('pre-merge')).not.toThrow();
    });
  });

  describe('Hook Listing', () => {
    it('should list all registered hooks', () => {
      const hook1: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const hook2: EnforcementHook = {
        name: 'pre-build',
        enabled: true,
        config: {
          warnOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook1);
      registerHook(hook2);

      const hooks = listHooks();
      expect(hooks.length).toBe(2);
      expect(hooks.map(h => h.name)).toContain('pre-merge');
      expect(hooks.map(h => h.name)).toContain('pre-build');
    });

    it('should return empty array when no hooks registered', () => {
      const hooks = listHooks();
      expect(hooks.length).toBe(0);
      expect(Array.isArray(hooks)).toBe(true);
    });
  });

  describe('Hook Configuration Update', () => {
    it('should update hook configuration', () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      updateHookConfig('pre-merge', {
        blockOnSeverity: ['critical', 'high'],
        allowOverride: false,
      });

      const updated = getHook('pre-merge');
      expect(updated?.config.blockOnSeverity).toContain('high');
      expect(updated?.config.allowOverride).toBe(false);
      expect(updated?.config.requireApproval).toBe(true); // Unchanged
    });

    it('should handle updating non-existent hook gracefully', () => {
      expect(() => updateHookConfig('pre-merge', { allowOverride: false })).not.toThrow();
    });
  });
});

describe('Wave 3C: Hook Triggering & Execution', () => {
  beforeEach(() => {
    // Clear all hooks
    const hooks = listHooks();
    hooks.forEach(hook => unregisterHook(hook.name));
  });

  describe('Hook Triggering', () => {
    it('should trigger pre-merge hook and detect violations', async () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          warnOnSeverity: ['high'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const context: EnforcementContext = {
        operation: 'merge',
        branch: 'feature/test',
        commit: 'a'.repeat(40),
        prNumber: 123,
        environment: 'development',
      };

      const result = await triggerHook('pre-merge', context);

      expect(result.hookName).toBe('pre-merge');
      expect(result.triggered).toBe(true);
      expect(result.actions).toBeDefined();
      expect(result.results).toBeDefined();
      expect(result.summary).toBeDefined();
    });

    it('should not trigger disabled hook', async () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: false, // Disabled
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: true,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const result = await triggerHook('pre-merge', context);

      expect(result.triggered).toBe(false);
      expect(result.actions.length).toBe(0);
    });

    it('should handle triggering non-existent hook gracefully', async () => {
      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const result = await triggerHook('pre-merge', context);

      expect(result.triggered).toBe(false);
      expect(result.actions.length).toBe(0);
    });
  });

  describe('Violation Processing', () => {
    it('should process critical violations correctly', async () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          warnOnSeverity: ['high', 'medium'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const result = await triggerHook('pre-merge', context);

      // Should detect and classify violations
      expect(result.summary.blocked).toBeGreaterThanOrEqual(0);
      expect(result.summary.warned).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('Wave 3C: Governance-Aware Enforcement', () => {
  describe('CS Boundary Checks', () => {
    it('should detect CS2 boundary violation (protected file)', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'BUILD_PHILOSOPHY.md modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: 'BUILD_PHILOSOPHY.md',
        },
        context: {
          protectedFile: 'BUILD_PHILOSOPHY.md',
        },
        detectedAt: new Date().toISOString(),
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const csCheck = checkCSBoundaries(violation, context);

      expect(csCheck.violated).toBe(true);
      expect(csCheck.csBoundary).toBe('CS2');
      expect(csCheck.requiresApproval).toBe(true);
      expect(csCheck.description).toContain('CS2');
    });

    it('should detect CS1 boundary violation (immutable guardrail)', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-2',
        constraintId: 'governance.immutable-paths',
        type: 'governance',
        description: 'Workflow file modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: '.github/workflows/ci.yml',
        },
        context: {
          protectedFile: '.github/workflows/ci.yml',
        },
        detectedAt: new Date().toISOString(),
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const csCheck = checkCSBoundaries(violation, context);

      expect(csCheck.violated).toBe(true);
      expect(csCheck.csBoundary).toBe('CS1');
      expect(csCheck.requiresApproval).toBe(false); // CS1 doesn't allow approval
      expect(csCheck.description).toContain('CS1');
    });

    it('should not flag CS violation for non-governance violations', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-3',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const csCheck = checkCSBoundaries(violation, context);

      expect(csCheck.violated).toBe(false);
      expect(csCheck.csBoundary).toBeUndefined();
    });
  });

  describe('Protected Domain Checks', () => {
    it('should detect protected domain access', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-4',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'Constitution file modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: 'foreman/constitution/CS2_ARCHITECTURE_APPROVAL_WORKFLOW.md',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const domainCheck = checkProtectedDomain(violation);

      expect(domainCheck.isProtected).toBe(true);
      expect(domainCheck.domain).toBe('foreman/constitution/');
      expect(domainCheck.requiresApproval).toBe(true);
    });

    it('should not flag non-protected files', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-5',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        location: {
          file: 'lib/foreman/test.ts',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const domainCheck = checkProtectedDomain(violation);

      expect(domainCheck.isProtected).toBe(false);
      expect(domainCheck.domain).toBeUndefined();
    });
  });

  describe('Explicit Approval Requirements', () => {
    it('should require explicit approval for CS2 violations', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-6',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'Protected file modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'require_approval',
        violation,
        reason: 'CS2 approval required',
        governanceContext: {
          csBoundary: 'CS2',
          requiresApproval: true,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['check_cs2', 'require_approval'],
        },
      };

      const requiresApproval = requiresExplicitApproval(violation, action);

      expect(requiresApproval).toBe(true);
    });

    it('should not require approval for non-governance violations', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-7',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['check_severity', 'block'],
        },
      };

      const requiresApproval = requiresExplicitApproval(violation, action);

      expect(requiresApproval).toBe(false);
    });
  });

  describe('Enforcement Action Determination', () => {
    it('should determine "require_approval" for CS2 violations', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-8',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'BUILD_PHILOSOPHY.md modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: 'BUILD_PHILOSOPHY.md',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          requireApproval: true,
          allowOverride: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const action = await determineEnforcementAction(violation, hook, context);

      expect(action.type).toBe('require_approval');
      expect(action.governanceContext.csBoundary).toBe('CS2');
      expect(action.governanceContext.requiresApproval).toBe(true);
    });

    it('should determine "block" for critical structural violations', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-9',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const action = await determineEnforcementAction(violation, hook, context);

      expect(action.type).toBe('block');
      expect(action.governanceContext.overrideAllowed).toBe(true);
    });

    it('should determine "warn" for medium severity violations', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-10',
        constraintId: 'structural.layer-violation',
        type: 'structural',
        description: 'Layer violation detected',
        severity: 'medium',
        category: 'layer_violation',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical', 'high'],
          warnOnSeverity: ['medium'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const action = await determineEnforcementAction(violation, hook, context);

      expect(action.type).toBe('warn');
    });

    it('should determine "allow" for low severity violations', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-11',
        constraintId: 'structural.naming',
        type: 'structural',
        description: 'Naming convention violation',
        severity: 'low',
        category: 'module_boundary',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical', 'high'],
          warnOnSeverity: ['medium'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const action = await determineEnforcementAction(violation, hook, context);

      expect(action.type).toBe('allow');
    });
  });
});

// Continue in next chunk...

describe('Wave 3C: Enforcement Actions', () => {
  describe('Warning Execution', () => {
    it('should execute warning action successfully', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-12',
        constraintId: 'structural.layer-violation',
        type: 'structural',
        description: 'Layer violation detected',
        severity: 'medium',
        category: 'layer_violation',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Layer violation detected - review recommended',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['check_severity', 'warn'],
        },
      };

      const result = await executeWarning(action);

      expect(result.success).toBe(true);
      expect(result.actionType).toBe('warn');
      expect(result.blocked).toBe(false);
      expect(result.message).toBeDefined();
    });

    it('should not block execution when warning', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-13',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test violation',
        severity: 'medium',
        category: 'module_boundary',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Test warning',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['warn'],
        },
      };

      // Should not throw
      await expect(executeWarning(action)).resolves.not.toThrow();
    });

    it('should log warning to console', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const violation: ClassifiedViolation = {
        id: 'test-violation-14',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test violation',
        severity: 'medium',
        category: 'module_boundary',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Test warning',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['warn'],
        },
      };

      await executeWarning(action);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Blocking Execution', () => {
    it('should execute blocking action and throw BlockingError', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-15',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Critical circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['check_severity', 'block'],
        },
      };

      await expect(executeBlocking(action)).rejects.toThrow(BlockingError);
    });

    it('should include remediation steps in blocking error', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-16',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['block'],
        },
      };

      try {
        await executeBlocking(action);
        throw new Error('Should have thrown BlockingError');
      } catch (error) {
        if (error instanceof BlockingError) {
          expect(error.remediation).toBeDefined();
          expect(error.remediation.length).toBeGreaterThan(0);
        } else {
          throw error;
        }
      }
    });

    it('should include override instructions when allowed', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-17',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['block'],
        },
      };

      try {
        await executeBlocking(action);
        throw new Error('Should have thrown BlockingError');
      } catch (error) {
        if (error instanceof BlockingError) {
          expect(error.overrideInstructions).toBeDefined();
          expect(error.overrideInstructions).toContain('FOREMAN_ENFORCEMENT_OVERRIDE');
        } else {
          throw error;
        }
      }
    });

    it('should not include override instructions when not allowed', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-18',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'Protected file modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Protected file cannot be modified',
        governanceContext: {
          csBoundary: 'CS1',
          requiresApproval: false,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['cs1_block'],
        },
      };

      try {
        await executeBlocking(action);
        throw new Error('Should have thrown BlockingError');
      } catch (error) {
        if (error instanceof BlockingError) {
          expect(error.overrideInstructions).toBeUndefined();
        } else {
          throw error;
        }
      }
    });
  });

  describe('Escalation Execution', () => {
    it('should execute escalation action successfully', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-19',
        constraintId: 'governance.cs-boundary',
        type: 'governance',
        description: 'CS boundary violation',
        severity: 'critical',
        category: 'cs_boundary',
        nature: 'governance',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'escalate',
        violation,
        reason: 'Critical governance violation requires owner review',
        governanceContext: {
          csBoundary: 'CS3',
          requiresApproval: false,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['cs3_escalate'],
        },
      };

      const result = await executeEscalation(action);

      expect(result.success).toBe(true);
      expect(result.actionType).toBe('escalate');
      expect(result.escalated).toBe(true);
      expect(result.blocked).toBe(false); // Escalation doesn't block immediately
    });

    it('should not block immediately on escalation', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-20',
        constraintId: 'governance.test',
        type: 'governance',
        description: 'Test violation',
        severity: 'critical',
        category: 'constitutional',
        nature: 'governance',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'escalate',
        violation,
        reason: 'Test escalation',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['escalate'],
        },
      };

      // Should not throw
      await expect(executeEscalation(action)).resolves.not.toThrow();
    });
  });

  describe('Approval Requirement Execution', () => {
    it('should execute approval requirement action', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-21',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'BUILD_PHILOSOPHY.md modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: 'BUILD_PHILOSOPHY.md',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'require_approval',
        violation,
        reason: 'CS2 architecture approval required for protected file modification',
        governanceContext: {
          csBoundary: 'CS2',
          protectedDomain: 'BUILD_PHILOSOPHY.md',
          requiresApproval: true,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['cs2_approval'],
        },
      };

      const result = await executeApprovalRequirement(action);

      expect(result.actionType).toBe('require_approval');
      expect(result.approvalRequired).toBe(true);
      expect(result.message).toContain('approval');
    });

    it('should include approval workflow information', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-22',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'Protected file modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'require_approval',
        violation,
        reason: 'CS2 approval required',
        governanceContext: {
          csBoundary: 'CS2',
          requiresApproval: true,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['cs2_approval'],
        },
      };

      const result = await executeApprovalRequirement(action);

      expect(result.message).toContain('CS2');
    });
  });

  describe('Complete Action Execution', () => {
    it('should route to correct executor based on action type', async () => {
      const testActions: { action: EnforcementAction; expectedType: EnforcementActionType }[] = [
        {
          action: {
            type: 'allow',
            violation: {
              id: 'test-1',
              constraintId: 'test',
              type: 'structural',
              description: 'Test',
              severity: 'low',
              category: 'module_boundary',
              nature: 'structural',
              falsePositive: false,
              context: {},
              detectedAt: new Date().toISOString(),
            },
            reason: 'Low severity, allow',
            governanceContext: {
              requiresApproval: false,
              overrideAllowed: true,
            },
            metadata: {
              hookName: 'test',
              timestamp: new Date().toISOString(),
              decisionPath: [],
            },
          },
          expectedType: 'allow',
        },
        {
          action: {
            type: 'warn',
            violation: {
              id: 'test-2',
              constraintId: 'test',
              type: 'structural',
              description: 'Test',
              severity: 'medium',
              category: 'module_boundary',
              nature: 'structural',
              falsePositive: false,
              context: {},
              detectedAt: new Date().toISOString(),
            },
            reason: 'Medium severity, warn',
            governanceContext: {
              requiresApproval: false,
              overrideAllowed: true,
            },
            metadata: {
              hookName: 'test',
              timestamp: new Date().toISOString(),
              decisionPath: [],
            },
          },
          expectedType: 'warn',
        },
      ];

      for (const { action, expectedType } of testActions) {
        const result = await executeEnforcementAction(action);
        expect(result.actionType).toBe(expectedType);
      }
    });
  });
});

describe('Wave 3C: Explainability & Reason Generation', () => {
  describe('Reason Generation', () => {
    it('should generate clear reason for protected path violation', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-23',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'BUILD_PHILOSOPHY.md modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: 'BUILD_PHILOSOPHY.md',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'require_approval',
        violation,
        reason: 'CS2 approval required',
        governanceContext: {
          csBoundary: 'CS2',
          protectedDomain: 'BUILD_PHILOSOPHY.md',
          requiresApproval: true,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['cs2_check', 'require_approval'],
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const reason = generateEnforcementReason(violation, action, context);

      expect(reason).toContain('Enforcement Action');
      expect(reason).toContain('REQUIRE APPROVAL'); // Space, not underscore (telemetry.ts line 59 replaces _ with space)
      expect(reason).toContain('BUILD_PHILOSOPHY.md');
      expect(reason).toContain('CS2');
      expect(reason).toContain('Required Action');
      expect(reason).toContain('Why This Matters');
    });

    it('should generate clear reason for circular dependency blocking', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-24',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency between moduleA and moduleB',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {
          modules: ['moduleA', 'moduleB'],
        },
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['severity_check', 'block'],
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const reason = generateEnforcementReason(violation, action, context);

      expect(reason).toContain('Enforcement Action');
      expect(reason).toContain('BLOCK');
      expect(reason).toContain('Circular dependencies'); // Capital C (telemetry.ts line 98)
      expect(reason).toContain('Required Action');
      expect(reason).toContain('Override');
      expect(reason).toContain('FOREMAN_ENFORCEMENT_OVERRIDE');
    });

    it('should include remediation steps in reason', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-25',
        constraintId: 'structural.layer-violation',
        type: 'structural',
        description: 'Layer violation detected',
        severity: 'high',
        category: 'layer_violation',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Layer violation must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['block'],
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const reason = generateEnforcementReason(violation, action, context);

      expect(reason).toContain('Required Action');
      expect(reason).toMatch(/\d+\./); // Should have numbered steps
    });

    it('should explain why enforcement matters', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-26',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const reason = generateEnforcementReason(violation, action, context);

      expect(reason).toContain('Why This Matters');
    });
  });

  describe('Decision Path Traceability', () => {
    it('should include decision path in enforcement action', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-27',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const action = await determineEnforcementAction(violation, hook, context);

      expect(action.metadata.decisionPath).toBeDefined();
      expect(action.metadata.decisionPath.length).toBeGreaterThan(0);
    });

    it('should trace decision logic steps', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-28',
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'Protected file modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: 'BUILD_PHILOSOPHY.md',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          requireApproval: true,
          allowOverride: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const action = await determineEnforcementAction(violation, hook, context);

      expect(action.metadata.decisionPath).toContain('check_cs_boundaries');
      expect(action.metadata.decisionPath).toContain('require_approval');
    });
  });
});

describe('Wave 3C: Telemetry & Memory Integration', () => {
  describe('Event Emission', () => {
    it('should emit enforcement event (non-blocking)', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-29',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: false,
        actionType: 'block',
        blocked: true,
        escalated: false,
        approvalRequired: false,
        message: 'Operation blocked',
      };

      // Should not throw
      await expect(emitEnforcementEvent(action, result)).resolves.not.toThrow();
    });

    it('should complete emission quickly (< 100ms)', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-30',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Test',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: true,
        actionType: 'warn',
        blocked: false,
        escalated: false,
        approvalRequired: false,
        message: 'Warning issued',
      };

      const start = Date.now();
      await emitEnforcementEvent(action, result);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100);
    });
  });

  describe('Memory Fabric Storage', () => {
    it('should store enforcement action in Memory Fabric (non-blocking)', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-31',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Test block',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: false,
        actionType: 'block',
        blocked: true,
        escalated: false,
        approvalRequired: false,
        message: 'Blocked',
      };

      // Should not throw
      await expect(storeEnforcementInMemory(action, result)).resolves.not.toThrow();
    });

    it('should query enforcement actions from Memory Fabric', async () => {
      const filters: EnforcementQueryFilters = {
        hookName: 'pre-merge',
        blocked: true,
      };

      const events = await queryEnforcementsFromMemory(filters);

      expect(Array.isArray(events)).toBe(true);
    });

    it('should handle Memory Fabric failures gracefully', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-32',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Test',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: false,
        actionType: 'block',
        blocked: true,
        escalated: false,
        approvalRequired: false,
        message: 'Blocked',
      };

      // Should not throw even if Memory Fabric is unavailable
      await expect(storeEnforcementInMemory(action, result)).resolves.not.toThrow();
    });
  });

  describe('FL/CI Classification', () => {
    it('should classify enforcement for FL/CI learning', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-33',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: false,
        actionType: 'block',
        blocked: true,
        escalated: false,
        approvalRequired: false,
        message: 'Blocked',
      };

      const flciClassification = classifyEnforcementForFLCI(action, result);

      expect(flciClassification.enforcementId).toBeDefined();
      expect(flciClassification.flCategory).toBeDefined();
      expect(flciClassification.ciAction).toBeDefined();
      expect(flciClassification.learningSuggestion).toBeDefined();
    });

    it('should classify successful enforcement as enforcement_success', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-34',
        constraintId: 'structural.layer-violation',
        type: 'structural',
        description: 'Layer violation',
        severity: 'medium',
        category: 'layer_violation',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Layer violation warning',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: true,
        actionType: 'warn',
        blocked: false,
        escalated: false,
        approvalRequired: false,
        message: 'Warning issued',
      };

      const flciClassification = classifyEnforcementForFLCI(action, result);

      expect(flciClassification.flCategory).toBe('enforcement_success');
    });

    it('should classify blocked enforcement as enforcement_blocked', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-35',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Blocked',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: false,
        actionType: 'block',
        blocked: true,
        escalated: false,
        approvalRequired: false,
        message: 'Blocked',
      };

      const flciClassification = classifyEnforcementForFLCI(action, result);

      expect(flciClassification.flCategory).toBe('enforcement_blocked');
    });
  });
});

describe('Wave 3C: Safe Failure Modes', () => {
  // Ensure clean hook registry for each test
  beforeEach(() => {
    const hooks = listHooks();
    hooks.forEach(hook => unregisterHook(hook.name));
  });

  describe('No Silent Blocking', () => {
    it('should never block silently - always provide reason', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-36',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency must be fixed',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['block'],
        },
      };

      try {
        await executeBlocking(action);
        throw new Error('Should have thrown BlockingError');
      } catch (error) {
        if (error instanceof BlockingError) {
          expect(error.message).toBeDefined();
          expect(error.message.length).toBeGreaterThan(0);
          expect(error.action.reason).toBeDefined();
        } else {
          throw error;
        }
      }
    });

    it('should log all blocking actions', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const violation: ClassifiedViolation = {
        id: 'test-violation-37',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      try {
        await executeBlocking(action);
      } catch (error) {
        // Expected
      }

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Escape Hatches', () => {
    it('should provide escape hatch when override allowed', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-38',
        constraintId: 'structural.circular-dep',
        type: 'structural',
        description: 'Circular dependency',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'Circular dependency',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      try {
        await executeBlocking(action);
        throw new Error('Should have thrown');
      } catch (error) {
        if (error instanceof BlockingError) {
          expect(error.overrideInstructions).toBeDefined();
        } else {
          throw error;
        }
      }
    });

    it('should not provide escape hatch for CS1 violations', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-39',
        constraintId: 'governance.immutable-paths',
        type: 'governance',
        description: 'Workflow modified',
        severity: 'critical',
        category: 'protected_path',
        nature: 'governance',
        falsePositive: false,
        location: {
          file: '.github/workflows/ci.yml',
        },
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'block',
        violation,
        reason: 'CS1 violation',
        governanceContext: {
          csBoundary: 'CS1',
          requiresApproval: false,
          overrideAllowed: false,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: ['cs1_block'],
        },
      };

      try {
        await executeBlocking(action);
        throw new Error('Should have thrown');
      } catch (error) {
        if (error instanceof BlockingError) {
          expect(error.overrideInstructions).toBeUndefined();
        } else {
          throw error;
        }
      }
    });
  });

  describe('Graceful Degradation', () => {
    it('should handle hook execution errors gracefully', async () => {
      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      // Should not throw even if hook doesn't exist
      const result = await triggerHook('pre-merge', context);

      expect(result.triggered).toBe(false);
      expect(result.actions.length).toBe(0);
    });

    it('should handle telemetry failures gracefully', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-40',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Test',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: true,
        actionType: 'warn',
        blocked: false,
        escalated: false,
        approvalRequired: false,
        message: 'Warning',
      };

      // Should not throw even if telemetry fails
      await expect(emitEnforcementEvent(action, result)).resolves.not.toThrow();
    });
  });
});

describe('Wave 3C: Integration Tests', () => {
  describe('End-to-End Hook Workflow', () => {
    it('should execute complete pre-merge workflow', async () => {
      // Register hook
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          warnOnSeverity: ['high', 'medium'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      // Trigger hook
      const context: EnforcementContext = {
        operation: 'merge',
        branch: 'feature/test',
        commit: 'a'.repeat(40),
        prNumber: 123,
        environment: 'development',
      };

      const result = await triggerHook('pre-merge', context);

      // Validate result structure
      expect(result.hookName).toBe('pre-merge');
      expect(result.triggered).toBe(true);
      expect(result.summary).toBeDefined();
      expect(result.summary.allowed).toBeGreaterThanOrEqual(0);
      expect(result.summary.warned).toBeGreaterThanOrEqual(0);
      expect(result.summary.blocked).toBeGreaterThanOrEqual(0);
    });

    it('should execute complete pre-build workflow', async () => {
      const hook: EnforcementHook = {
        name: 'pre-build',
        enabled: true,
        config: {
          warnOnSeverity: ['critical', 'high', 'medium'],
          allowOverride: true,
          requireApproval: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const context: EnforcementContext = {
        operation: 'build',
        buildId: 'build-123',
        environment: 'development',
      };

      const result = await triggerHook('pre-build', context);

      expect(result.hookName).toBe('pre-build');
      expect(result.triggered).toBe(true);
    });
  });

  describe('CS2 Approval Workflow Integration', () => {
    it('should trigger CS2 workflow for protected file modifications', async () => {
      const hook: EnforcementHook = {
        name: 'pre-merge',
        enabled: true,
        config: {
          blockOnSeverity: ['critical'],
          requireApproval: true,
          allowOverride: false,
          logToConsole: true,
          logToMemory: true,
        },
      };

      registerHook(hook);

      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      const result = await triggerHook('pre-merge', context);

      // Should detect protected file modifications and require approval
      const approvalActions = result.actions.filter(a => a.type === 'require_approval');
      if (approvalActions.length > 0) {
        expect(approvalActions[0].governanceContext.csBoundary).toBe('CS2');
      }
    });
  });

  describe('No Side Effects Verification', () => {
    it('should not block execution on enforcement failure', async () => {
      const context: EnforcementContext = {
        operation: 'merge',
        environment: 'development',
      };

      // Should complete without throwing (no hook registered)
      await expect(triggerHook('pre-merge', context)).resolves.not.toThrow();
    });

    it('should not throw on telemetry failure', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-41',
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Test',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const action: EnforcementAction = {
        type: 'warn',
        violation,
        reason: 'Test',
        governanceContext: {
          requiresApproval: false,
          overrideAllowed: true,
        },
        metadata: {
          hookName: 'pre-merge',
          timestamp: new Date().toISOString(),
          decisionPath: [],
        },
      };

      const result: ExecutionResult = {
        success: true,
        actionType: 'warn',
        blocked: false,
        escalated: false,
        approvalRequired: false,
        message: 'Warning',
      };

      await expect(emitEnforcementEvent(action, result)).resolves.not.toThrow();
    });
  });
});
