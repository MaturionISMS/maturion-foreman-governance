/**
 * Enforcement Hook Registry
 * Wave 3C: Architecture Constraint Enforcement Hooks
 */

import {
  EnforcementHook,
  EnforcementHookName,
  HookConfig,
  HookTriggerResult,
  EnforcementContext,
} from '../../../../types/enforcement';

const hookRegistry = new Map<EnforcementHookName, EnforcementHook>();

export function registerHook(hook: EnforcementHook): void {
  hookRegistry.set(hook.name, hook);
}

export function unregisterHook(hookName: EnforcementHookName): void {
  hookRegistry.delete(hookName);
}

export function getHook(hookName: EnforcementHookName): EnforcementHook | undefined {
  return hookRegistry.get(hookName);
}

export function listHooks(): EnforcementHook[] {
  return Array.from(hookRegistry.values());
}

export function updateHookConfig(
  hookName: EnforcementHookName,
  config: Partial<HookConfig>
): void {
  const hook = hookRegistry.get(hookName);
  if (!hook) return;
  
  hook.config = { ...hook.config, ...config };
  hookRegistry.set(hookName, hook);
}

export async function triggerHook(
  hookName: EnforcementHookName,
  context: EnforcementContext
): Promise<HookTriggerResult> {
  const hook = hookRegistry.get(hookName);
  
  if (!hook || !hook.enabled) {
    return {
      hookName,
      triggered: false,
      actions: [],
      results: [],
      summary: { allowed: 0, warned: 0, blocked: 0, escalated: 0, approvalRequired: 0 },
    };
  }

  return {
    hookName,
    triggered: true,
    actions: [],
    results: [],
    summary: { allowed: 0, warned: 0, blocked: 0, escalated: 0, approvalRequired: 0 },
  };
}
