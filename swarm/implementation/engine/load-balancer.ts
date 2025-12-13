/**
 * Load Balancer Implementation
 * 
 * Balances load across agents and schedules task execution
 */

import type { Agent, Task, LoadBalancer, AgentLoad, ScheduleDecision } from './types';

class LoadBalancerImpl implements LoadBalancer {
  private agentLoads: Map<string, AgentLoad>;

  constructor() {
    this.agentLoads = new Map();
  }

  getAgentLoad(agentId: string): AgentLoad {
    if (!this.agentLoads.has(agentId)) {
      this.agentLoads.set(agentId, {
        agentId,
        currentTasks: 0,
        maxCapacity: 5,
        utilizationPercentage: 0
      });
    }
    return this.agentLoads.get(agentId)!;
  }

  getAllAgentLoads(): AgentLoad[] {
    return Array.from(this.agentLoads.values());
  }

  isOverloaded(agentId: string): boolean {
    const load = this.getAgentLoad(agentId);
    return load.utilizationPercentage > 90;
  }

  async rebalanceTasks(): Promise<void> {
    // Placeholder for rebalancing logic
    // Implementation would redistribute tasks from overloaded agents
  }

  scheduleTask(task: Task): ScheduleDecision {
    // Simple scheduling: immediate if any agent available
    const availableAgents = Array.from(this.agentLoads.values())
      .filter(load => load.utilizationPercentage < 80);

    if (availableAgents.length > 0) {
      return {
        schedule: 'immediate',
        assignedAgent: availableAgents[0].agentId,
        reason: 'Agent available with low utilization'
      };
    }

    return {
      schedule: 'queued',
      reason: 'All agents busy, task queued'
    };
  }
}

export function createLoadBalancer(): LoadBalancer {
  return new LoadBalancerImpl();
}
