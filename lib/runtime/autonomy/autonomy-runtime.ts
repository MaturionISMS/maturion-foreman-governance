/**
 * Autonomy Runtime
 * 
 * Core execution loop, state machine, and task scheduler enabling
 * autonomous operation without human intervention.
 */

export type AutonomyState =
  | 'IDLE'
  | 'READY'
  | 'EXECUTING_TASK'
  | 'EXECUTING_WAVE'
  | 'WAITING_FOR_APPROVAL'
  | 'GOVERNANCE_BLOCKED'
  | 'RECOVERY_MODE'
  | 'SAFE_MODE'
  | 'PAUSED_BY_USER'
  | 'DEGRADED_MODE';

export interface AutonomyConfig {
  enabled: boolean;
  maxConcurrentTasks: number;
  taskTimeout: number;
  healthCheckInterval: number;
}

export interface TaskQueueItem {
  id: string;
  type: string;
  priority: number;
  createdAt: Date;
  dependencies: string[];
  metadata: Record<string, unknown>;
}

/**
 * Autonomy State Machine
 */
export class AutonomyStateMachine {
  private currentState: AutonomyState;
  private stateHistory: Array<{ state: AutonomyState; timestamp: Date; reason?: string }>;

  constructor() {
    this.currentState = 'IDLE';
    this.stateHistory = [{ state: 'IDLE', timestamp: new Date() }];
  }

  getCurrentState(): AutonomyState {
    return this.currentState;
  }

  transition(newState: AutonomyState, reason?: string): void {
    if (!this.canTransition(this.currentState, newState)) {
      throw new Error(`Invalid state transition: ${this.currentState} -> ${newState}`);
    }

    this.currentState = newState;
    this.stateHistory.push({ state: newState, timestamp: new Date(), reason });
  }

  private canTransition(from: AutonomyState, to: AutonomyState): boolean {
    const validTransitions: Record<AutonomyState, AutonomyState[]> = {
      IDLE: ['READY'],
      READY: ['EXECUTING_TASK', 'EXECUTING_WAVE', 'PAUSED_BY_USER', 'IDLE'],
      EXECUTING_TASK: ['READY', 'GOVERNANCE_BLOCKED', 'RECOVERY_MODE', 'SAFE_MODE', 'WAITING_FOR_APPROVAL'],
      EXECUTING_WAVE: ['READY', 'GOVERNANCE_BLOCKED', 'RECOVERY_MODE', 'SAFE_MODE', 'PAUSED_BY_USER'],
      WAITING_FOR_APPROVAL: ['READY', 'EXECUTING_TASK', 'EXECUTING_WAVE'],
      GOVERNANCE_BLOCKED: ['READY', 'SAFE_MODE'],
      RECOVERY_MODE: ['READY', 'DEGRADED_MODE', 'SAFE_MODE'],
      SAFE_MODE: ['READY', 'IDLE'],
      PAUSED_BY_USER: ['READY', 'IDLE'],
      DEGRADED_MODE: ['READY', 'SAFE_MODE', 'RECOVERY_MODE']
    };

    return validTransitions[from]?.includes(to) ?? false;
  }

  canExecute(): boolean {
    return ['READY', 'EXECUTING_TASK', 'EXECUTING_WAVE', 'DEGRADED_MODE'].includes(this.currentState);
  }

  isBlocked(): boolean {
    return ['GOVERNANCE_BLOCKED', 'SAFE_MODE', 'PAUSED_BY_USER', 'WAITING_FOR_APPROVAL'].includes(this.currentState);
  }
}

/**
 * Task Scheduler
 */
export class TaskScheduler {
  private queue: TaskQueueItem[];
  private completedTasks: Set<string>;

  constructor() {
    this.queue = [];
    this.completedTasks = new Set();
  }

  enqueue(task: TaskQueueItem): void {
    this.queue.push(task);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  getNextTask(): TaskQueueItem | null {
    for (const task of this.queue) {
      if (this.canExecute(task)) {
        return task;
      }
    }
    return null;
  }

  private canExecute(task: TaskQueueItem): boolean {
    // Check if all dependencies are completed
    for (const depId of task.dependencies) {
      if (!this.completedTasks.has(depId)) {
        return false;
      }
    }
    return true;
  }

  markCompleted(taskId: string): void {
    this.completedTasks.add(taskId);
    this.queue = this.queue.filter(t => t.id !== taskId);
  }

  markFailed(taskId: string): void {
    this.queue = this.queue.filter(t => t.id !== taskId);
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  getCompletedCount(): number {
    return this.completedTasks.size;
  }
}

/**
 * Execution Loop
 */
export class ExecutionLoop {
  private stateMachine: AutonomyStateMachine;
  private scheduler: TaskScheduler;
  private isRunning: boolean;
  private loopInterval: NodeJS.Timeout | null;

  constructor() {
    this.stateMachine = new AutonomyStateMachine();
    this.scheduler = new TaskScheduler();
    this.isRunning = false;
    this.loopInterval = null;
  }

  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.stateMachine.transition('READY', 'Execution loop started');

    this.loopInterval = setInterval(async () => {
      await this.tick();
    }, 1000);
  }

  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }

    this.stateMachine.transition('IDLE', 'Execution loop stopped');
  }

  pause(): void {
    if (this.stateMachine.canExecute()) {
      this.stateMachine.transition('PAUSED_BY_USER', 'User requested pause');
    }
  }

  resume(): void {
    if (this.stateMachine.getCurrentState() === 'PAUSED_BY_USER') {
      this.stateMachine.transition('READY', 'User requested resume');
    }
  }

  private async tick(): Promise<void> {
    if (!this.stateMachine.canExecute()) {
      return;
    }

    const nextTask = this.scheduler.getNextTask();
    if (!nextTask) {
      return;
    }

    try {
      this.stateMachine.transition('EXECUTING_TASK', `Executing task ${nextTask.id}`);
      await this.executeTask(nextTask);
      this.scheduler.markCompleted(nextTask.id);
      this.stateMachine.transition('READY', `Task ${nextTask.id} completed`);
    } catch (error) {
      this.scheduler.markFailed(nextTask.id);
      this.stateMachine.transition('RECOVERY_MODE', `Task ${nextTask.id} failed`);
    }
  }

  private async executeTask(task: TaskQueueItem): Promise<void> {
    // Placeholder for task execution
    console.log(`Executing task: ${task.id}`);
    // 1. Validate architecture & Red QA
    // 2. Trigger builder execution
    // 3. Apply governance checks
    // 4. Inspect QIC + QIEL results
    // 5. Auto-merge PR when allowed
    // 6. Update memory & telemetry
  }

  enqueueTask(task: TaskQueueItem): void {
    this.scheduler.enqueue(task);
  }

  getState(): AutonomyState {
    return this.stateMachine.getCurrentState();
  }

  getQueueSize(): number {
    return this.scheduler.getQueueSize();
  }

  getCompletedCount(): number {
    return this.scheduler.getCompletedCount();
  }
}

/**
 * Autonomy Runtime (Main Orchestrator)
 */
export class AutonomyRuntime {
  private executionLoop: ExecutionLoop;
  private config: AutonomyConfig;

  constructor(config: Partial<AutonomyConfig> = {}) {
    this.config = {
      enabled: false,
      maxConcurrentTasks: 3,
      taskTimeout: 300000, // 5 minutes
      healthCheckInterval: 60000, // 1 minute
      ...config
    };
    this.executionLoop = new ExecutionLoop();
  }

  enable(): void {
    if (this.config.enabled) {
      return;
    }

    this.config.enabled = true;
    this.executionLoop.start();
  }

  disable(): void {
    if (!this.config.enabled) {
      return;
    }

    this.config.enabled = false;
    this.executionLoop.stop();
  }

  pause(): void {
    this.executionLoop.pause();
  }

  resume(): void {
    this.executionLoop.resume();
  }

  enqueueTask(task: TaskQueueItem): void {
    this.executionLoop.enqueueTask(task);
  }

  getStatus() {
    return {
      enabled: this.config.enabled,
      state: this.executionLoop.getState(),
      queueSize: this.executionLoop.getQueueSize(),
      completedCount: this.executionLoop.getCompletedCount(),
      config: this.config
    };
  }

  isEnabled(): boolean {
    return this.config.enabled;
  }
}

// Singleton instance
export const autonomyRuntime = new AutonomyRuntime();
