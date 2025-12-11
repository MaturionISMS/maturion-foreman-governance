/**
 * Mutation Governor Types (PHASE_10)
 * 
 * Defines types for mutation classification, throttling, and governance.
 * See: docs/autonomy/PHASE_10.md for complete specification
 */

/**
 * Mutation classification levels
 */
export type MutationType = 'safe' | 'regulated' | 'forbidden';

/**
 * Constitutional verdict for mutation
 */
export type ConstitutionalVerdict = 'approved' | 'blocked' | 'requires_review';

/**
 * Impact radius categories
 */
export type ImpactLevel = 'low' | 'medium' | 'high';

/**
 * Sequence types for mutations
 */
export type SequenceType = 'linear' | 'parallel' | 'conditional';

/**
 * Mutation classification result
 */
export interface MutationClassification {
  type: MutationType;
  filesAffected: string[];
  impactRadius: number;
  impactLevel: ImpactLevel;
  protectedPathsViolated: string[];
  reasoning: string;
}

/**
 * Context for mutation decision
 */
export interface MutationContext {
  prNumber?: number;
  issueNumber?: number;
  waveId?: string;
  buildId?: string;
  sequenceId?: string;
  taskDescription: string;
  existingMutationsInPR: number;
  existingMutationsInWave: number;
  isRecoveryAttempt: boolean;
}

/**
 * Governance result for mutation request
 */
export interface MutationGovernanceResult {
  allowed: boolean;
  verdict: ConstitutionalVerdict;
  blockers?: string[];
  warnings?: string[];
  checks: MutationGovernanceCheck[];
  throttled: boolean;
  recoveryPath?: string;
  estimatedImpact: {
    radius: number;
    level: ImpactLevel;
    filesAffected: number;
    testsRequired: number;
  };
}

/**
 * Individual governance check
 */
export interface MutationGovernanceCheck {
  checkType: 'classification' | 'throttling' | 'cs1' | 'sequence' | 'recovery';
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Record of a mutation attempt
 */
export interface MutationRecord {
  id: string;
  timestamp: string;
  mutationType: MutationType;
  filesAffected: string[];
  impactRadius: number;
  verdict: ConstitutionalVerdict;
  sequenceId: string;
  context: MutationContext;
  outcome: 'approved' | 'blocked' | 'completed' | 'failed' | 'recovered';
  recoveryPath?: string;
  error?: string;
  durationMs?: number;
}

/**
 * Throttling configuration
 */
export interface MutationThrottleConfig {
  maxMutationsPerPR: number;
  maxMutationsPerIssue: number;
  maxMutationsPerWave: number;
  cooldownPeriodSeconds: number;
  maxConcurrentMutations: number;
}

/**
 * Default throttling limits
 */
export const DEFAULT_THROTTLE_CONFIG: MutationThrottleConfig = {
  maxMutationsPerPR: 50,
  maxMutationsPerIssue: 100,
  maxMutationsPerWave: 200,
  cooldownPeriodSeconds: 60,
  maxConcurrentMutations: 5,
};

/**
 * Mutation metrics for current PR
 */
export interface MutationPRMetrics {
  prNumber: number;
  mutationCount: number;
  lastMutationTimestamp: string;
  mutationsByType: {
    safe: number;
    regulated: number;
    forbidden: number;
  };
  blockedAttempts: number;
  recoveredMutations: number;
}

/**
 * Daily mutation statistics
 */
export interface MutationDailyStats {
  date: string;
  totalMutations: number;
  blockedMutations: number;
  recoveredMutations: number;
  averageImpactRadius: number;
  mutationsByType: {
    safe: number;
    regulated: number;
    forbidden: number;
  };
}

/**
 * Complete mutation metrics storage
 */
export interface MutationMetrics {
  currentPR?: MutationPRMetrics;
  currentWave?: {
    waveId: string;
    mutationCount: number;
    startTime: string;
  };
  dailyStats: MutationDailyStats;
  history: MutationRecord[];
}

/**
 * Mutation statistics summary
 */
export interface MutationStats {
  pr: {
    count: number;
    limit: number;
    percentage: number;
    byType: { safe: number; regulated: number; forbidden: number };
  };
  wave: {
    count: number;
    limit: number;
    percentage: number;
  };
  daily: {
    count: number;
    blocked: number;
    recovered: number;
    averageImpact: number;
  };
  throttled: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Mutation sequence definition
 */
export interface MutationSequence {
  id: string;
  type: SequenceType;
  mutations: MutationStep[];
  dependencies?: Record<string, string[]>; // stepId -> [dependsOn stepIds]
  rollbackPlan?: RollbackPlan;
}

/**
 * Individual step in a mutation sequence
 */
export interface MutationStep {
  id: string;
  description: string;
  files: string[];
  estimatedImpact: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
  snapshot?: MutationSnapshot;
}

/**
 * Pre-mutation state snapshot
 */
export interface MutationSnapshot {
  timestamp: string;
  files: Record<string, string>; // filepath -> content hash
  gitCommit?: string;
}

/**
 * Rollback plan for a sequence
 */
export interface RollbackPlan {
  steps: RollbackStep[];
  triggerConditions: string[];
  autoRollback: boolean;
}

/**
 * Individual rollback step
 */
export interface RollbackStep {
  stepId: string;
  action: 'revert' | 'restore' | 'patch';
  files: string[];
  snapshot?: MutationSnapshot;
}

/**
 * Protected paths configuration (CS1)
 */
export const PROTECTED_PATHS = [
  '.github/workflows/',
  '.github/foreman/agent-contract.md',
  'BUILD_PHILOSOPHY.md',
  'foreman/architecture-design-checklist.md',
  'foreman/constitution/',
  'docs/governance/',
] as const;

/**
 * Check if a path is protected
 */
export function isProtectedPath(filePath: string): boolean {
  return PROTECTED_PATHS.some(protectedPath => {
    if (protectedPath.endsWith('/')) {
      return filePath.startsWith(protectedPath);
    }
    return filePath === protectedPath || filePath.endsWith(protectedPath);
  });
}

/**
 * Calculate impact radius for files
 */
export function calculateImpactRadius(
  filesAffected: number,
  importsAffected: number = 0,
  testsRequired: number = 0
): number {
  return filesAffected + (importsAffected * 2) + (testsRequired * 3);
}

/**
 * Determine impact level from radius
 */
export function getImpactLevel(radius: number): ImpactLevel {
  if (radius <= 5) return 'low';
  if (radius <= 15) return 'medium';
  return 'high';
}
