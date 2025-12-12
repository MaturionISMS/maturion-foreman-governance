/**
 * Build Recovery Engine
 * 
 * Enables automatic recovery from build failures with controlled retry,
 * checkpointing, and degraded/safe mode transitions.
 */

export type FailureType =
  | 'missing_architecture'
  | 'red_qa_failure'
  | 'missing_file'
  | 'type_error'
  | 'runtime_error'
  | 'pr_merge_failure'
  | 'drift_detected'
  | 'ci_failure'
  | 'builder_corruption'
  | 'memory_sync_failure';

export type FailureSeverity = 'low' | 'medium' | 'high' | 'critical';
export type RecoveryStrategy = 'retry' | 'retry_with_backoff' | 'fallback' | 'rollback' | 'halt';
export type SystemMode = 'normal' | 'degraded' | 'safe';

export interface Failure {
  id: string;
  type: FailureType;
  severity: FailureSeverity;
  message: string;
  context: Record<string, unknown>;
  timestamp: Date;
  stackTrace?: string;
}

export interface RecoveryPolicy {
  failureType: FailureType;
  strategy: RecoveryStrategy;
  maxRetries: number;
  backoffMs: number;
  requiresApproval: boolean;
}

export interface Checkpoint {
  id: string;
  timestamp: Date;
  taskState: unknown;
  waveState: unknown;
  autonomyState: unknown;
  metadata: Record<string, unknown>;
}

export class FailureClassifier {
  classify(error: Error, context: Record<string, unknown>): Failure {
    const type = this.determineFailureType(error, context);
    const severity = this.determineSeverity(type, error);

    return {
      id: `failure-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      severity,
      message: error.message,
      context,
      timestamp: new Date(),
      stackTrace: error.stack
    };
  }

  private determineFailureType(error: Error, context: Record<string, unknown>): FailureType {
    const message = error.message.toLowerCase();
    if (message.includes('architecture') && message.includes('missing')) return 'missing_architecture';
    if (message.includes('test') && message.includes('fail')) return 'red_qa_failure';
    if (message.includes('file') && message.includes('not found')) return 'missing_file';
    if (message.includes('type')) return 'type_error';
    if (message.includes('pr') || message.includes('merge')) return 'pr_merge_failure';
    if (message.includes('drift')) return 'drift_detected';
    if (message.includes('ci') || message.includes('workflow')) return 'ci_failure';
    if (message.includes('memory') || message.includes('sync')) return 'memory_sync_failure';
    if (context.builderOutput === 'corrupted') return 'builder_corruption';
    return 'runtime_error';
  }

  private determineSeverity(type: FailureType, error: Error): FailureSeverity {
    const criticalTypes: FailureType[] = ['memory_sync_failure', 'builder_corruption'];
    const highTypes: FailureType[] = ['missing_architecture', 'drift_detected', 'pr_merge_failure'];
    const mediumTypes: FailureType[] = ['red_qa_failure', 'ci_failure', 'type_error'];
    if (criticalTypes.includes(type)) return 'critical';
    if (highTypes.includes(type)) return 'high';
    if (mediumTypes.includes(type)) return 'medium';
    return 'low';
  }
}

export class RecoveryPolicyEngine {
  private policies: Map<FailureType, RecoveryPolicy>;

  constructor() {
    this.policies = new Map();
    this.initializeDefaultPolicies();
  }

  getPolicy(failureType: FailureType): RecoveryPolicy {
    return this.policies.get(failureType) || {
      failureType,
      strategy: 'retry',
      maxRetries: 3,
      backoffMs: 1000,
      requiresApproval: false
    };
  }

  private initializeDefaultPolicies(): void {
    this.policies.set('missing_architecture', {
      failureType: 'missing_architecture',
      strategy: 'halt',
      maxRetries: 0,
      backoffMs: 0,
      requiresApproval: true
    });
    this.policies.set('red_qa_failure', {
      failureType: 'red_qa_failure',
      strategy: 'retry',
      maxRetries: 3,
      backoffMs: 5000,
      requiresApproval: false
    });
    this.policies.set('pr_merge_failure', {
      failureType: 'pr_merge_failure',
      strategy: 'retry_with_backoff',
      maxRetries: 5,
      backoffMs: 10000,
      requiresApproval: false
    });
    this.policies.set('drift_detected', {
      failureType: 'drift_detected',
      strategy: 'halt',
      maxRetries: 0,
      backoffMs: 0,
      requiresApproval: true
    });
  }
}

export class RetryEngine {
  private attempts: Map<string, number>;

  constructor() {
    this.attempts = new Map();
  }

  async retry<T>(
    operation: () => Promise<T>,
    policy: RecoveryPolicy,
    failureId: string
  ): Promise<T> {
    const attemptCount = this.attempts.get(failureId) || 0;

    if (attemptCount >= policy.maxRetries) {
      throw new Error(`Max retries (${policy.maxRetries}) exceeded for ${failureId}`);
    }

    if (attemptCount > 0) {
      const backoff = policy.backoffMs * Math.pow(2, attemptCount - 1);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }

    this.attempts.set(failureId, attemptCount + 1);

    try {
      const result = await operation();
      this.attempts.delete(failureId);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAttemptCount(failureId: string): number {
    return this.attempts.get(failureId) || 0;
  }
}

export class CheckpointManager {
  private checkpoints: Map<string, Checkpoint>;

  constructor() {
    this.checkpoints = new Map();
  }

  createCheckpoint(
    taskState: unknown,
    waveState: unknown,
    autonomyState: unknown,
    metadata: Record<string, unknown> = {}
  ): Checkpoint {
    const checkpoint: Checkpoint = {
      id: `checkpoint-${Date.now()}`,
      timestamp: new Date(),
      taskState,
      waveState,
      autonomyState,
      metadata
    };
    this.checkpoints.set(checkpoint.id, checkpoint);
    return checkpoint;
  }

  getLatestCheckpoint(): Checkpoint | undefined {
    const sorted = Array.from(this.checkpoints.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
    return sorted[0];
  }

  async restoreCheckpoint(id: string): Promise<Checkpoint> {
    const checkpoint = this.checkpoints.get(id);
    if (!checkpoint) {
      throw new Error(`Checkpoint ${id} not found`);
    }
    return checkpoint;
  }
}

export class SystemModeController {
  private currentMode: SystemMode;

  constructor() {
    this.currentMode = 'normal';
  }

  getCurrentMode(): SystemMode {
    return this.currentMode;
  }

  enterDegradedMode(reason: string): void {
    console.warn(`Entering DEGRADED mode: ${reason}`);
    this.currentMode = 'degraded';
  }

  enterSafeMode(reason: string): void {
    console.error(`Entering SAFE mode: ${reason}`);
    this.currentMode = 'safe';
  }

  canExecute(): boolean {
    return this.currentMode !== 'safe';
  }
}

export class BuildRecoveryEngine {
  private classifier: FailureClassifier;
  private policyEngine: RecoveryPolicyEngine;
  private retryEngine: RetryEngine;
  private checkpointManager: CheckpointManager;
  private modeController: SystemModeController;

  constructor() {
    this.classifier = new FailureClassifier();
    this.policyEngine = new RecoveryPolicyEngine();
    this.retryEngine = new RetryEngine();
    this.checkpointManager = new CheckpointManager();
    this.modeController = new SystemModeController();
  }

  async handleFailure(
    error: Error,
    context: Record<string, unknown>,
    operation: () => Promise<unknown>
  ): Promise<unknown> {
    const failure = this.classifier.classify(error, context);
    const policy = this.policyEngine.getPolicy(failure.type);

    if (policy.requiresApproval || failure.severity === 'critical') {
      this.modeController.enterSafeMode(`Critical failure: ${failure.message}`);
      throw new Error(`Recovery halted: ${failure.message}. Requires approval.`);
    }

    switch (policy.strategy) {
      case 'retry':
      case 'retry_with_backoff':
        return await this.retryEngine.retry(operation, policy, failure.id);
      case 'halt':
        this.modeController.enterSafeMode(`Halt strategy for ${failure.type}`);
        throw error;
      default:
        throw new Error(`Unknown recovery strategy: ${policy.strategy}`);
    }
  }

  createCheckpoint(
    taskState: unknown,
    waveState: unknown,
    autonomyState: unknown
  ): Checkpoint {
    return this.checkpointManager.createCheckpoint(taskState, waveState, autonomyState);
  }

  getSystemMode(): SystemMode {
    return this.modeController.getCurrentMode();
  }

  canExecute(): boolean {
    return this.modeController.canExecute();
  }
}

export const buildRecoveryEngine = new BuildRecoveryEngine();
