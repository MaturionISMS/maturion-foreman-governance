/**
 * Wiring Integrity Change Tracker
 * 
 * Tracks changes to critical wiring between UI, API routes, and context engines
 * to prevent regressions and detect silent mismatches.
 * 
 * This implements Part 5 of the Wiring Integrity requirements:
 * - Log UI wiring changes
 * - Log API route changes
 * - Log context engine changes
 * - Log compression pipeline changes
 * - Log model escalation logic changes
 */

import { writeMemory } from './storage';

export type WiringChangeType = 
  | 'ui_route_change'
  | 'api_route_change'
  | 'context_engine_change'
  | 'compression_pipeline_change'
  | 'model_escalation_change'
  | 'file_processor_change';

export interface WiringChangeEvent {
  id: string;
  timestamp: string;
  changeType: WiringChangeType;
  component: string;
  oldValue?: string;
  newValue: string;
  reason: string;
  affectedEndpoints?: string[];
  breakingChange: boolean;
  validatedBy?: string[];
  metadata?: Record<string, any>;
}

/**
 * Generate unique wiring change ID
 */
function generateWiringChangeId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `wiring_change_${timestamp}_${random}`;
}

/**
 * Log a wiring change event to governance memory
 */
export async function logWiringChange(event: Omit<WiringChangeEvent, 'id' | 'timestamp'>): Promise<void> {
  const changeEvent: WiringChangeEvent = {
    id: generateWiringChangeId(),
    timestamp: new Date().toISOString(),
    ...event,
  };

  try {
    await writeMemory({
      scope: 'foreman',
      key: `wiring-change-${changeEvent.id}`,
      value: changeEvent,
      tags: [
        'wiring-integrity',
        'governance',
        'change-tracking',
        changeEvent.changeType,
        changeEvent.breakingChange ? 'breaking' : 'non-breaking',
      ],
      createdBy: 'wiring-tracker',
    });

    console.log(`[WiringTracker] Logged wiring change: ${changeEvent.changeType} - ${changeEvent.component}`);
    
    if (changeEvent.breakingChange) {
      console.warn(`[WiringTracker] ⚠️ BREAKING CHANGE detected in ${changeEvent.component}`);
      console.warn(`[WiringTracker] Affected endpoints: ${changeEvent.affectedEndpoints?.join(', ') || 'Unknown'}`);
    }
  } catch (error) {
    console.error('[WiringTracker] Failed to log wiring change:', error);
    // Don't throw - logging failures shouldn't break the application
  }
}

/**
 * Log UI route wiring change
 */
export async function logUIRouteChange(params: {
  component: string;
  oldEndpoint?: string;
  newEndpoint: string;
  reason: string;
  breakingChange: boolean;
}): Promise<void> {
  await logWiringChange({
    changeType: 'ui_route_change',
    component: params.component,
    oldValue: params.oldEndpoint,
    newValue: params.newEndpoint,
    reason: params.reason,
    affectedEndpoints: [params.newEndpoint],
    breakingChange: params.breakingChange,
    metadata: {
      componentType: 'ui',
      previousEndpoint: params.oldEndpoint,
      currentEndpoint: params.newEndpoint,
    },
  });
}

/**
 * Log API route change
 */
export async function logAPIRouteChange(params: {
  route: string;
  oldHandler?: string;
  newHandler: string;
  reason: string;
  breakingChange: boolean;
  affectedComponents?: string[];
}): Promise<void> {
  await logWiringChange({
    changeType: 'api_route_change',
    component: params.route,
    oldValue: params.oldHandler,
    newValue: params.newHandler,
    reason: params.reason,
    affectedEndpoints: [params.route],
    breakingChange: params.breakingChange,
    metadata: {
      handlerType: 'api',
      affectedUIComponents: params.affectedComponents || [],
    },
  });
}

/**
 * Log context engine change
 */
export async function logContextEngineChange(params: {
  component: string;
  changeDescription: string;
  reason: string;
  breakingChange: boolean;
  affectedRoutes?: string[];
}): Promise<void> {
  await logWiringChange({
    changeType: 'context_engine_change',
    component: params.component,
    newValue: params.changeDescription,
    reason: params.reason,
    affectedEndpoints: params.affectedRoutes || [],
    breakingChange: params.breakingChange,
    metadata: {
      engineType: 'context',
    },
  });
}

/**
 * Log compression pipeline change
 */
export async function logCompressionPipelineChange(params: {
  component: string;
  changeDescription: string;
  reason: string;
  breakingChange: boolean;
  affectedRoutes?: string[];
}): Promise<void> {
  await logWiringChange({
    changeType: 'compression_pipeline_change',
    component: params.component,
    newValue: params.changeDescription,
    reason: params.reason,
    affectedEndpoints: params.affectedRoutes || [],
    breakingChange: params.breakingChange,
    metadata: {
      pipelineType: 'compression',
    },
  });
}

/**
 * Log model escalation logic change
 */
export async function logModelEscalationChange(params: {
  component: string;
  changeDescription: string;
  reason: string;
  breakingChange: boolean;
  affectedRoutes?: string[];
}): Promise<void> {
  await logWiringChange({
    changeType: 'model_escalation_change',
    component: params.component,
    newValue: params.changeDescription,
    reason: params.reason,
    affectedEndpoints: params.affectedRoutes || [],
    breakingChange: params.breakingChange,
    metadata: {
      escalationType: 'model',
    },
  });
}

/**
 * Log file processor change
 */
export async function logFileProcessorChange(params: {
  component: string;
  changeDescription: string;
  reason: string;
  breakingChange: boolean;
  affectedRoutes?: string[];
}): Promise<void> {
  await logWiringChange({
    changeType: 'file_processor_change',
    component: params.component,
    newValue: params.changeDescription,
    reason: params.reason,
    affectedEndpoints: params.affectedRoutes || [],
    breakingChange: params.breakingChange,
    metadata: {
      processorType: 'file',
    },
  });
}

/**
 * Validate wiring integrity on startup
 * Checks that all critical components are properly wired
 */
export async function validateWiringIntegrity(): Promise<{
  valid: boolean;
  issues: string[];
}> {
  const issues: string[] = [];

  try {
    // Check 1: Verify chat route exists and is accessible
    const path = await import('path');
    const chatRoutePath = path.resolve(process.cwd(), 'app/api/foreman/chat/route.ts');
    const fs = await import('fs/promises');
    
    try {
      await fs.access(chatRoutePath);
    } catch {
      issues.push('Critical: /api/foreman/chat route.ts not found');
    }

    // Check 2: Verify UI calls correct endpoint
    const uiPagePath = path.resolve(process.cwd(), 'app/foreman/page.tsx');
    try {
      const uiSource = await fs.readFile(uiPagePath, 'utf-8');
      if (!uiSource.includes('/api/foreman/chat')) {
        issues.push('Critical: UI does not call /api/foreman/chat endpoint');
      }
    } catch {
      issues.push('Critical: UI page.tsx not found');
    }

    // Check 3: Verify context-manager is loaded
    try {
      await import('@/lib/foreman/context-manager');
    } catch {
      issues.push('Critical: context-manager module not found');
    }

    // Check 4: Verify prompt-compressor is loaded
    try {
      await import('@/lib/foreman/context/prompt-compressor');
    } catch {
      issues.push('Critical: prompt-compressor module not found');
    }

    // Check 5: Verify model-escalation is loaded
    try {
      await import('@/lib/foreman/model-escalation');
    } catch {
      issues.push('Critical: model-escalation module not found');
    }

    // Check 6: Verify file-processor is loaded
    try {
      await import('@/lib/foreman/context/file-processor');
    } catch {
      issues.push('Critical: file-processor module not found');
    }

    if (issues.length === 0) {
      console.log('[WiringTracker] ✅ Wiring integrity validation PASSED');
      return { valid: true, issues: [] };
    } else {
      console.error('[WiringTracker] ❌ Wiring integrity validation FAILED');
      for (const issue of issues) {
        console.error(`[WiringTracker]   - ${issue}`);
      }
      return { valid: false, issues };
    }
  } catch (error) {
    console.error('[WiringTracker] Wiring integrity validation error:', error);
    return {
      valid: false,
      issues: [`Validation error: ${error instanceof Error ? error.message : 'Unknown'}`],
    };
  }
}

/**
 * Initialize wiring tracker on app startup
 */
export async function initializeWiringTracker(): Promise<void> {
  console.log('[WiringTracker] Initializing Wiring Integrity Tracker...');
  
  // Validate current wiring
  const validation = await validateWiringIntegrity();
  
  if (!validation.valid) {
    console.error('[WiringTracker] ⚠️ Wiring integrity issues detected on startup');
    for (const issue of validation.issues) {
      console.error(`[WiringTracker]   ${issue}`);
    }
  }
  
  console.log('[WiringTracker] Wiring Integrity Tracker initialized');
}
