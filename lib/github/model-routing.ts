/**
 * GitHub Builder Model Routing Engine
 * 
 * Central Master Routing Engine for GitHub AI builders.
 * Implements multi-tier model selection with struggle detection and escalation.
 * 
 * **CRITICAL**: This is ONLY for GitHub AI builders.
 * Does NOT affect lib/foreman/model-escalation.ts (Maturion App logic).
 * 
 * Protected under CS1 Guardrails.
 */

import fs from 'fs';
import path from 'path';

/**
 * Task Types for Classification
 */
export type TaskType =
  | 'docs'              // T1: Documentation updates
  | 'simple-ui'         // T1: Simple UI components
  | 'config-update'     // T1: Configuration changes
  | 'crud'              // T2: CRUD operations
  | 'api-endpoint'      // T2: API endpoint implementation
  | 'component'         // T2: React component
  | 'integration'       // T2: Service integration
  | 'architecture'      // T3: Architecture design
  | 'red-qa'            // T3: Red QA creation
  | 'refactor'          // T3: Large refactoring
  | 'multi-module';     // T3: Multi-module changes

/**
 * Model Tiers
 */
export type ModelTier = 'T1' | 'T2' | 'T3';

/**
 * Task Descriptor Input
 */
export interface GitHubTaskDescriptor {
  taskType: TaskType;
  complexity: 'low' | 'medium' | 'high';
  filesAffected: number;
  repositoryId: string;
  branchName: string;
  isArchitectureTask: boolean;
  isGovernanceTask: boolean;
  requiresRedQA: boolean;
  estimatedTokens?: number;
}

/**
 * Routing Decision Output
 */
export interface ModelRoutingDecision {
  tier: ModelTier;
  modelId: string;
  justification: string;
  maxRetries: number;
  escalationPath: ModelTier[];
  estimatedCost: number;
}

/**
 * Struggle Signal Type
 */
export type StruggleType =
  | 'repeated_errors'
  | 'invalid_code_generation'
  | 'missing_imports'
  | 'partial_file_rewrites'
  | 'qic_failure'
  | 'token_overflow'
  | 'ambiguity_detected'
  | 'directive_not_followed';

/**
 * Struggle Signal
 */
export interface StruggleSignal {
  type: StruggleType;
  severity: 'low' | 'medium' | 'high';
  message: string;
  recommendEscalation: boolean;
}

/**
 * Build Attempt
 */
export interface BuildAttempt {
  attemptNumber: number;
  modelId: string;
  tier: ModelTier;
  timestamp: string;
  result: 'success' | 'failure' | 'partial';
  struggleSignal?: StruggleSignal;
  errorMessage?: string;
  outputQuality?: number;
}

/**
 * Task History for De-escalation
 */
export interface TaskHistory {
  taskId: string;
  tier: ModelTier;
  outcome: 'success' | 'failure';
  attemptsUsed: number;
  timestamp: string;
}

/**
 * Tier Configuration (loaded from config file)
 */
interface TierConfig {
  tiers: {
    [key: string]: {
      name: string;
      models: string[];
      taskTypes: TaskType[];
      maxRetries: number;
      costMultiplier: number;
    };
  };
  escalationRules: {
    [key: string]: {
      threshold: number;
      action: string;
    };
  };
}

/**
 * Load tier configuration from config file
 */
function loadTierConfig(): TierConfig {
  try {
    const configPath = path.join(process.cwd(), 'config/model-tiers.json');
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // Fallback to default config if file not found
    console.warn('Tier config not found, using default configuration');
    return getDefaultTierConfig();
  }
}

/**
 * Default tier configuration (fallback)
 */
function getDefaultTierConfig(): TierConfig {
  return {
    tiers: {
      T1: {
        name: 'Tier 1 - Lightweight Tasks',
        models: ['gpt-4o-mini', 'claude-haiku'],
        taskTypes: ['docs', 'simple-ui', 'config-update'],
        maxRetries: 3,
        costMultiplier: 1,
      },
      T2: {
        name: 'Tier 2 - Standard Tasks',
        models: ['gpt-4o', 'claude-sonnet-lite'],
        taskTypes: ['crud', 'api-endpoint', 'component', 'integration'],
        maxRetries: 3,
        costMultiplier: 5,
      },
      T3: {
        name: 'Tier 3 - Complex Tasks',
        models: ['claude-3.5-sonnet'],
        taskTypes: ['architecture', 'red-qa', 'refactor', 'multi-module'],
        maxRetries: 3,
        costMultiplier: 20,
      },
    },
    escalationRules: {
      repeatedErrors: { threshold: 2, action: 'escalate' },
      invalidCodeGeneration: { threshold: 1, action: 'escalate' },
      missingImports: { threshold: 2, action: 'escalate' },
      partialFileRewrites: { threshold: 1, action: 'escalate' },
      qicFailures: { threshold: 1, action: 'escalate' },
      tokenOverflow: { threshold: 1, action: 'escalate' },
      ambiguityDetected: { threshold: 2, action: 'escalate' },
    },
  };
}

/**
 * Classify task type to determine tier
 */
function classifyTask(descriptor: GitHubTaskDescriptor): ModelTier {
  const config = loadTierConfig();

  // Check T3 first (highest priority)
  if (
    config.tiers.T3.taskTypes.includes(descriptor.taskType) ||
    descriptor.isArchitectureTask ||
    (descriptor.isGovernanceTask && descriptor.requiresRedQA)
  ) {
    return 'T3';
  }

  // Check T2
  if (config.tiers.T2.taskTypes.includes(descriptor.taskType)) {
    return 'T2';
  }

  // Default to T1
  return 'T1';
}

/**
 * Select model from tier
 */
function selectModelFromTier(tier: ModelTier): string {
  const config = loadTierConfig();
  const tierModels = config.tiers[tier].models;

  // Return first (cheapest) model in tier
  return tierModels[0];
}

/**
 * Calculate escalation path
 */
function getEscalationPath(currentTier: ModelTier): ModelTier[] {
  const allTiers: ModelTier[] = ['T1', 'T2', 'T3'];
  const currentIndex = allTiers.indexOf(currentTier);

  // Return tiers from current onwards
  return allTiers.slice(currentIndex);
}

/**
 * Estimate cost based on tier
 */
function estimateCost(tier: ModelTier): number {
  const config = loadTierConfig();
  const costMultiplier = config.tiers[tier].costMultiplier;

  // Base cost per request (arbitrary unit)
  const baseCost = 0.01;
  return baseCost * costMultiplier;
}

/**
 * Main Routing Function: Select GitHub Builder Model
 * 
 * @param descriptor - Task descriptor with classification data
 * @returns Routing decision with model, tier, and justification
 */
export function selectGitHubBuilderModel(
  descriptor: GitHubTaskDescriptor
): ModelRoutingDecision {
  // Classify task to determine tier
  const tier = classifyTask(descriptor);

  // Select model from tier
  const modelId = selectModelFromTier(tier);

  // Get configuration
  const config = loadTierConfig();
  const maxRetries = config.tiers[tier].maxRetries;

  // Calculate escalation path
  const escalationPath = getEscalationPath(tier);

  // Estimate cost
  const estimatedCost = estimateCost(tier);

  // Build justification
  const justification = buildJustification(descriptor, tier, modelId);

  return {
    tier,
    modelId,
    justification,
    maxRetries,
    escalationPath,
    estimatedCost,
  };
}

/**
 * Build justification string
 */
function buildJustification(
  descriptor: GitHubTaskDescriptor,
  tier: ModelTier,
  modelId: string
): string {
  const taskType = descriptor.taskType.toUpperCase();
  const complexity = descriptor.complexity;

  let reason = `${taskType} task classified as ${tier}`;

  if (descriptor.isArchitectureTask) {
    reason += ', architecture task requires highest capability';
  } else if (descriptor.isGovernanceTask && descriptor.requiresRedQA) {
    reason += ', governance task with Red QA requires highest capability';
  } else if (complexity === 'high') {
    reason += ', high complexity';
  } else if (complexity === 'low') {
    reason += ', low complexity suitable for lightweight model';
  }

  reason += `, selected ${modelId} as primary model`;

  return reason;
}

/**
 * Detect Struggle Signals
 * 
 * Analyzes build attempts to detect struggle patterns
 * that indicate escalation is needed.
 * 
 * Priority order (check most specific first):
 * 1. QIC failures (highest priority)
 * 2. Invalid code generation
 * 3. Missing imports (specific pattern)
 * 4. Repeated errors (general pattern)
 */
export function detectStruggle(attempts: BuildAttempt[]): StruggleSignal | null {
  if (attempts.length === 0) {
    return null;
  }

  // Check for success - no struggle
  const lastAttempt = attempts[attempts.length - 1];
  if (lastAttempt.result === 'success') {
    return null;
  }

  // Priority 1: Detect QIC failures (immediate escalation)
  const hasQICFailure = attempts.some((a) =>
    a.errorMessage?.includes('QIC validation failed')
  );
  if (hasQICFailure) {
    return {
      type: 'qic_failure',
      severity: 'high',
      message: 'Quality gate validation failed',
      recommendEscalation: true,
    };
  }

  // Priority 2: Detect invalid code generation (syntax errors, type errors)
  const hasInvalidCode = attempts.some(
    (a) =>
      a.errorMessage?.includes('TypeError') ||
      a.errorMessage?.includes('SyntaxError') ||
      a.errorMessage?.includes('Cannot read property')
  );
  if (hasInvalidCode) {
    return {
      type: 'invalid_code_generation',
      severity: 'high',
      message: 'Invalid code generation detected',
      recommendEscalation: true,
    };
  }

  // Priority 3: Detect missing imports (2+ occurrences)
  const missingImportCount = attempts.filter(
    (a) =>
      a.errorMessage?.includes('Cannot find name') ||
      a.errorMessage?.includes('Cannot find module')
  ).length;
  if (missingImportCount >= 2) {
    return {
      type: 'missing_imports',
      severity: 'medium',
      message: 'Multiple missing import errors detected',
      recommendEscalation: true,
    };
  }

  // Priority 4: Detect repeated errors (2+ failures) - general pattern
  const failureCount = attempts.filter((a) => a.result === 'failure').length;
  if (failureCount >= 2) {
    return {
      type: 'repeated_errors',
      severity: 'medium',
      message: `${failureCount} repeated failures detected`,
      recommendEscalation: true,
    };
  }

  // No struggle detected yet (single failure is normal)
  return null;
}

/**
 * Escalate Tier
 * 
 * Given current tier and struggle signal, determine next tier.
 * Returns null if already at highest tier.
 */
export function escalateTier(
  currentTier: ModelTier,
  struggleReason: StruggleSignal
): ModelTier | null {
  if (currentTier === 'T1') {
    return 'T2';
  }
  if (currentTier === 'T2') {
    return 'T3';
  }
  // Already at T3, cannot escalate further
  return null;
}

/**
 * Consider De-escalation
 * 
 * Analyze task history to determine if de-escalation is appropriate.
 * De-escalate if consistent success with minimal retries.
 */
export function considerDeEscalation(history: TaskHistory[]): boolean {
  // Need at least 3 tasks for de-escalation consideration
  if (history.length < 3) {
    return false;
  }

  // Check last 3 tasks
  const recentHistory = history.slice(-3);

  // All must be successful
  const allSuccess = recentHistory.every((task) => task.outcome === 'success');
  if (!allSuccess) {
    return false;
  }

  // All must have used 1 attempt (no retries)
  const noRetries = recentHistory.every((task) => task.attemptsUsed === 1);
  if (!noRetries) {
    return false;
  }

  // De-escalation is appropriate
  return true;
}
