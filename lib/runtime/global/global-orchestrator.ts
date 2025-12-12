/**
 * Global Autonomy Orchestrator
 */

import { workspaceManager } from '../multi-repo/workspace';
import { buildRecoveryEngine } from '../recovery/build-recovery-engine';
import { waveExecutor } from '../waves/wave-executor';
import { autonomyRuntime, TaskQueueItem } from '../autonomy/autonomy-runtime';

export interface GlobalTask {
  id: string;
  type: 'single_issue' | 'wave' | 'multi_repo';
  priority: number;
  repositories: string[];
  dependencies: string[];
  metadata: Record<string, unknown>;
}

export interface GlobalStatus {
  systemHealth: 'healthy' | 'degraded' | 'critical';
  autonomyEnabled: boolean;
  activeWaves: number;
  queuedTasks: number;
  completedTasks: number;
  failedTasks: number;
  systemMode: string;
}

export class GlobalAutonomyOrchestrator {
  private isRunning: boolean;

  constructor() {
    this.isRunning = false;
  }

  start(): void {
    if (this.isRunning) return;
    console.log('🚀 Global Autonomy Orchestrator starting...');
    this.isRunning = true;
    autonomyRuntime.enable();
  }

  stop(): void {
    if (!this.isRunning) return;
    console.log('⏸️  Global Autonomy Orchestrator stopping...');
    this.isRunning = false;
    autonomyRuntime.disable();
  }

  getStatus(): GlobalStatus {
    const runtimeStatus = autonomyRuntime.getStatus();
    const recoveryMode = buildRecoveryEngine.getSystemMode();
    const workspaceHealth = workspaceManager.getWorkspaceHealth();

    let systemHealth: 'healthy' | 'degraded' | 'critical' = 'healthy';
    if (recoveryMode === 'safe') systemHealth = 'critical';
    else if (recoveryMode === 'degraded') systemHealth = 'degraded';

    return {
      systemHealth,
      autonomyEnabled: runtimeStatus.enabled,
      activeWaves: 0,
      queuedTasks: runtimeStatus.queueSize,
      completedTasks: runtimeStatus.completedCount,
      failedTasks: 0,
      systemMode: recoveryMode
    };
  }
}

export const globalOrchestrator = new GlobalAutonomyOrchestrator();
