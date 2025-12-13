/**
 * Agent Registry Implementation
 * 
 * Manages dynamic collection of agents in the swarm
 */

import type { Agent, AgentRegistry } from './types';

class AgentRegistryImpl implements AgentRegistry {
  private agents: Map<string, Agent>;

  constructor() {
    this.agents = new Map();
  }

  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  unregisterAgent(agentId: string): void {
    this.agents.delete(agentId);
  }

  getAgent(agentId: string): Agent | null {
    return this.agents.get(agentId) || null;
  }

  getAgentsByCapability(type: string): Agent[] {
    return Array.from(this.agents.values()).filter(
      agent => agent.capability.type === type
    );
  }

  getAvailableAgents(): Agent[] {
    return Array.from(this.agents.values()).filter(agent => {
      if (agent.status === 'idle') return true;
      if (agent.status === 'busy') {
        return agent.currentTasks.length < agent.capability.maxConcurrentTasks;
      }
      return false;
    });
  }

  updateAgentStatus(agentId: string, status: Agent['status']): void {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = status;
    }
  }
}

export function createAgentRegistry(): AgentRegistry {
  return new AgentRegistryImpl();
}
