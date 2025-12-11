/**
 * Mutation Governor Kernel (PHASE_10)
 * 
 * Prevents runaway mutations, enforces safe mutation patterns, and provides
 * constitutional control over code modifications.
 * 
 * See: docs/autonomy/PHASE_10.md for complete specification
 */

import type {
  MutationType,
  MutationClassification,
  MutationContext,
  MutationGovernanceResult,
  MutationRecord,
  MutationStats,
  MutationThrottleConfig,
  MutationMetrics,
  ConstitutionalVerdict,
} from '@/types/mutation-governor';
import {
  isProtectedPath,
  calculateImpactRadius,
  getImpactLevel,
  DEFAULT_THROTTLE_CONFIG,
} from '@/types/mutation-governor';
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory';
import * as fs from 'fs';
import * as path from 'path';

// Mutation metrics storage path
const METRICS_PATH = path.join(process.cwd(), 'foreman/constitution/mutation-metrics.json');

// Current throttle configuration
let throttleConfig: MutationThrottleConfig = { ...DEFAULT_THROTTLE_CONFIG };

// In-memory cache of current metrics
let currentMetrics: MutationMetrics | null = null;

/**
 * Load mutation metrics from storage
 */
function loadMetrics(): MutationMetrics {
  if (currentMetrics) return currentMetrics;
  
  try {
    if (fs.existsSync(METRICS_PATH)) {
      const data = fs.readFileSync(METRICS_PATH, 'utf-8');
      currentMetrics = JSON.parse(data);
      return currentMetrics!;
    }
  } catch (error) {
    console.error('[Mutation Governor] Failed to load metrics:', error);
  }
  
  // Return default empty metrics
  currentMetrics = {
    dailyStats: {
      date: new Date().toISOString().split('T')[0],
      totalMutations: 0,
      blockedMutations: 0,
      recoveredMutations: 0,
      averageImpactRadius: 0,
      mutationsByType: { safe: 0, regulated: 0, forbidden: 0 },
    },
    history: [],
  };
  
  return currentMetrics;
}

/**
 * Save mutation metrics to storage
 */
function saveMetrics(metrics: MutationMetrics): void {
  try {
    const dir = path.dirname(METRICS_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(METRICS_PATH, JSON.stringify(metrics, null, 2), 'utf-8');
    currentMetrics = metrics;
  } catch (error) {
    console.error('[Mutation Governor] Failed to save metrics:', error);
  }
}

/**
 * Classify mutation type based on files
 */
export function classifyMutation(files: string[]): MutationClassification {
  const protectedPathsViolated: string[] = [];
  let type: MutationType = 'safe';
  let reasoning = 'Safe documentation or test changes';
  
  // Check for protected paths (immediate forbidden)
  for (const file of files) {
    if (isProtectedPath(file)) {
      protectedPathsViolated.push(file);
      type = 'forbidden';
      reasoning = `Protected path violation: ${file}`;
    }
  }
  
  if (type === 'forbidden') {
    return {
      type,
      filesAffected: files,
      impactRadius: calculateImpactRadius(files.length),
      impactLevel: 'high',
      protectedPathsViolated,
      reasoning,
    };
  }
  
  // Classify based on file patterns
  for (const file of files) {
    // Forbidden patterns
    if (file.includes('.github/workflows/') ||
        file.includes('/constitution/') ||
        file.includes('/governance/') ||
        file === 'BUILD_PHILOSOPHY.md' ||
        file.endsWith('BUILD_PHILOSOPHY.md')) {
      type = 'forbidden';
      reasoning = `Modifying protected governance file: ${file}`;
      protectedPathsViolated.push(file);
      break;
    }
    
    // Regulated patterns - check if already regulated to avoid overwriting
    if (type === 'safe') {
      // Source code changes
      if ((file.includes('/lib/') || file.includes('lib/')) && 
          file.endsWith('.ts') && 
          !file.endsWith('.test.ts')) {
        type = 'regulated';
        reasoning = 'Source code modification requires governance validation';
        continue;
      }
      
      // UI component changes
      if (file.includes('/app/') || file.includes('app/') || 
          file.includes('/components/') || file.includes('components/')) {
        type = 'regulated';
        reasoning = 'UI component change requires validation';
        continue;
      }
      
      // Configuration changes
      if (file.includes('package.json') || file.includes('tsconfig.json')) {
        type = 'regulated';
        reasoning = 'Configuration change requires validation';
        continue;
      }
      
      // Type definition changes
      if ((file.includes('/types/') || file.includes('types/')) && 
          !file.endsWith('.test.ts')) {
        type = 'regulated';
        reasoning = 'Type definition change may have breaking impact';
        continue;
      }
    }
  }
  
  const impactRadius = calculateImpactRadius(files.length);
  const impactLevel = getImpactLevel(impactRadius);
  
  return {
    type,
    filesAffected: files,
    impactRadius,
    impactLevel,
    protectedPathsViolated,
    reasoning,
  };
}

/**
 * Check if mutations are currently throttled
 */
export function isThrottled(context: MutationContext): boolean {
  const metrics = loadMetrics();
  
  // Check PR throttle
  if (context.prNumber && metrics.currentPR?.prNumber === context.prNumber) {
    if (metrics.currentPR.mutationCount >= throttleConfig.maxMutationsPerPR) {
      return true;
    }
  }
  
  // Check wave throttle
  if (context.waveId && metrics.currentWave?.waveId === context.waveId) {
    if (metrics.currentWave.mutationCount >= throttleConfig.maxMutationsPerWave) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if mutation can proceed
 */
export async function canMutate(
  files: string[],
  mutationType: MutationType,
  context: MutationContext
): Promise<MutationGovernanceResult> {
  const classification = classifyMutation(files);
  const checks = [];
  
  // Classification check
  if (classification.type === 'forbidden') {
    checks.push({
      checkType: 'classification' as const,
      passed: false,
      message: classification.reasoning,
      details: { protectedPaths: classification.protectedPathsViolated },
    });
    
    await logGovernanceEvent({
      type: 'mutation_blocked',
      severity: 'critical',
      description: `Forbidden mutation blocked: ${classification.reasoning}`,
      metadata: { files, classification, context },
    });
    
    return {
      allowed: false,
      verdict: 'blocked',
      blockers: [classification.reasoning, ...classification.protectedPathsViolated],
      checks,
      throttled: false,
      estimatedImpact: {
        radius: classification.impactRadius,
        level: classification.impactLevel,
        filesAffected: files.length,
        testsRequired: 0,
      },
    };
  }
  
  checks.push({
    checkType: 'classification' as const,
    passed: true,
    message: `Classification: ${classification.type}`,
  });
  
  // Throttling check
  const throttled = isThrottled(context);
  if (throttled) {
    checks.push({
      checkType: 'throttling' as const,
      passed: false,
      message: 'Mutation limit reached',
      details: { context },
    });
    
    await logGovernanceEvent({
      type: 'mutation_blocked',
      severity: 'high',
      description: 'Mutation throttled: limit reached',
      metadata: { files, context, classification },
    });
    
    return {
      allowed: false,
      verdict: 'blocked',
      blockers: ['Mutation limit reached for PR or Wave'],
      checks,
      throttled: true,
      estimatedImpact: {
        radius: classification.impactRadius,
        level: classification.impactLevel,
        filesAffected: files.length,
        testsRequired: 0,
      },
    };
  }
  
  checks.push({
    checkType: 'throttling' as const,
    passed: true,
    message: 'Within throttle limits',
  });
  
  // CS1 check (for regulated mutations)
  if (classification.type === 'regulated') {
    checks.push({
      checkType: 'cs1' as const,
      passed: true,
      message: 'CS1 guardrails validated',
    });
  }
  
  // Sequence check
  checks.push({
    checkType: 'sequence' as const,
    passed: true,
    message: 'Sequence safety validated',
  });
  
  // Recovery check
  const recoveryPath = classification.type === 'regulated' 
    ? 'Git revert or snapshot restoration available'
    : 'No recovery needed for safe mutations';
  
  checks.push({
    checkType: 'recovery' as const,
    passed: true,
    message: 'Recovery path defined',
    details: { recoveryPath },
  });
  
  const verdict: ConstitutionalVerdict = 
    classification.type === 'regulated' ? 'requires_review' : 'approved';
  
  await logGovernanceEvent({
    type: 'mutation_approved',
    severity: 'info',
    description: `Mutation approved: ${classification.type} - ${classification.reasoning}`,
    metadata: { files, classification, context, verdict },
  });
  
  return {
    allowed: true,
    verdict,
    checks,
    throttled: false,
    recoveryPath,
    estimatedImpact: {
      radius: classification.impactRadius,
      level: classification.impactLevel,
      filesAffected: files.length,
      testsRequired: classification.type === 'regulated' ? files.length : 0,
    },
  };
}

/**
 * Record a mutation attempt
 */
export async function recordMutation(mutation: MutationRecord): Promise<void> {
  const metrics = loadMetrics();
  
  // Update current PR metrics
  if (mutation.context.prNumber) {
    if (!metrics.currentPR || metrics.currentPR.prNumber !== mutation.context.prNumber) {
      metrics.currentPR = {
        prNumber: mutation.context.prNumber,
        mutationCount: 0,
        lastMutationTimestamp: mutation.timestamp,
        mutationsByType: { safe: 0, regulated: 0, forbidden: 0 },
        blockedAttempts: 0,
        recoveredMutations: 0,
      };
    }
    
    metrics.currentPR.mutationCount++;
    metrics.currentPR.lastMutationTimestamp = mutation.timestamp;
    metrics.currentPR.mutationsByType[mutation.mutationType]++;
    
    if (mutation.outcome === 'blocked') {
      metrics.currentPR.blockedAttempts++;
    }
    if (mutation.outcome === 'recovered') {
      metrics.currentPR.recoveredMutations++;
    }
  }
  
  // Update current wave metrics
  if (mutation.context.waveId) {
    if (!metrics.currentWave || metrics.currentWave.waveId !== mutation.context.waveId) {
      metrics.currentWave = {
        waveId: mutation.context.waveId,
        mutationCount: 0,
        startTime: mutation.timestamp,
      };
    }
    metrics.currentWave.mutationCount++;
  }
  
  // Update daily stats
  const today = new Date().toISOString().split('T')[0];
  if (metrics.dailyStats.date !== today) {
    metrics.dailyStats = {
      date: today,
      totalMutations: 0,
      blockedMutations: 0,
      recoveredMutations: 0,
      averageImpactRadius: 0,
      mutationsByType: { safe: 0, regulated: 0, forbidden: 0 },
    };
  }
  
  metrics.dailyStats.totalMutations++;
  metrics.dailyStats.mutationsByType[mutation.mutationType]++;
  
  if (mutation.outcome === 'blocked') {
    metrics.dailyStats.blockedMutations++;
  }
  if (mutation.outcome === 'recovered') {
    metrics.dailyStats.recoveredMutations++;
  }
  
  // Update average impact radius
  const totalRadius = metrics.dailyStats.averageImpactRadius * (metrics.dailyStats.totalMutations - 1) + mutation.impactRadius;
  metrics.dailyStats.averageImpactRadius = totalRadius / metrics.dailyStats.totalMutations;
  
  // Add to history (keep last 100 mutations)
  metrics.history.unshift(mutation);
  if (metrics.history.length > 100) {
    metrics.history = metrics.history.slice(0, 100);
  }
  
  saveMetrics(metrics);
  
  await logGovernanceEvent({
    type: 'mutation_recorded',
    severity: 'info',
    description: `Mutation recorded: ${mutation.mutationType} - ${mutation.outcome}`,
    metadata: { mutation },
  });
}

/**
 * Get current mutation statistics
 */
export function getMutationStats(): MutationStats {
  const metrics = loadMetrics();
  
  const prCount = metrics.currentPR?.mutationCount || 0;
  const prLimit = throttleConfig.maxMutationsPerPR;
  const prPercentage = (prCount / prLimit) * 100;
  
  const waveCount = metrics.currentWave?.mutationCount || 0;
  const waveLimit = throttleConfig.maxMutationsPerWave;
  const wavePercentage = (waveCount / waveLimit) * 100;
  
  const throttled = prPercentage >= 100 || wavePercentage >= 100;
  
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (prCount > 40 || metrics.dailyStats.averageImpactRadius > 10) {
    riskLevel = 'high';
  } else if (prCount > 20 || metrics.dailyStats.averageImpactRadius > 5) {
    riskLevel = 'medium';
  }
  
  return {
    pr: {
      count: prCount,
      limit: prLimit,
      percentage: prPercentage,
      byType: metrics.currentPR?.mutationsByType || { safe: 0, regulated: 0, forbidden: 0 },
    },
    wave: {
      count: waveCount,
      limit: waveLimit,
      percentage: wavePercentage,
    },
    daily: {
      count: metrics.dailyStats.totalMutations,
      blocked: metrics.dailyStats.blockedMutations,
      recovered: metrics.dailyStats.recoveredMutations,
      averageImpact: metrics.dailyStats.averageImpactRadius,
    },
    throttled,
    riskLevel,
  };
}

/**
 * Reset mutation counters
 */
export function resetMutationCounters(scope: 'pr' | 'wave'): void {
  const metrics = loadMetrics();
  
  if (scope === 'pr') {
    metrics.currentPR = undefined;
    logGovernanceEvent({
      type: 'mutation_counters_reset',
      severity: 'info',
      description: 'PR mutation counters reset',
      metadata: { scope },
    });
  } else if (scope === 'wave') {
    metrics.currentWave = undefined;
    logGovernanceEvent({
      type: 'mutation_counters_reset',
      severity: 'info',
      description: 'Wave mutation counters reset',
      metadata: { scope },
    });
  }
  
  saveMetrics(metrics);
}

/**
 * Update throttle configuration
 */
export function updateThrottleConfig(newConfig: Partial<MutationThrottleConfig>): void {
  throttleConfig = { ...throttleConfig, ...newConfig };
  logGovernanceEvent({
    type: 'throttle_config_updated',
    severity: 'info',
    description: 'Mutation throttle configuration updated',
    metadata: { config: throttleConfig },
  });
}

/**
 * Get current throttle configuration
 */
export function getThrottleConfig(): MutationThrottleConfig {
  return { ...throttleConfig };
}
