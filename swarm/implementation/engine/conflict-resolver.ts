/**
 * Conflict Resolver Implementation
 * 
 * Detects and resolves conflicts between concurrent agent operations
 */

import type { AgentOperation, Conflict, ConflictResolver, ConflictResolution } from './types';

class ConflictResolverImpl implements ConflictResolver {
  private backoffMap: Map<string, number>;

  constructor() {
    this.backoffMap = new Map();
  }

  detectConflict(operations: AgentOperation[]): Conflict | null {
    // Group operations by target
    const targetMap = new Map<string, AgentOperation[]>();
    
    for (const op of operations) {
      const existing = targetMap.get(op.target) || [];
      existing.push(op);
      targetMap.set(op.target, existing);
    }

    // Find conflicts (multiple agents on same target)
    for (const [target, ops] of targetMap.entries()) {
      if (ops.length > 1 && ops[0].type === 'file_modify') {
        return {
          id: `conflict-${Date.now()}`,
          type: 'file',
          agentIds: ops.map(op => op.agentId),
          taskIds: [],
          description: `Multiple agents modifying ${target}`,
          severity: 'medium',
          detectedAt: new Date()
        };
      }
    }

    return null;
  }

  resolveConflict(conflict: Conflict): ConflictResolution {
    if (conflict.type === 'governance' || conflict.severity === 'critical') {
      return {
        strategy: 'escalate',
        backoffAgents: conflict.agentIds,
        requiresHumanReview: true
      };
    }

    // Default: priority-based resolution
    return {
      strategy: 'priority',
      winningAgent: conflict.agentIds[0],
      backoffAgents: conflict.agentIds.slice(1),
      requiresHumanReview: false
    };
  }

  applyBackoff(agentId: string, duration: number): void {
    this.backoffMap.set(agentId, Date.now() + duration);
  }

  escalateConflict(conflict: Conflict): void {
    // Log escalation
    console.warn('Conflict escalated:', conflict.id);
  }
}

export function createConflictResolver(): ConflictResolver {
  return new ConflictResolverImpl();
}
