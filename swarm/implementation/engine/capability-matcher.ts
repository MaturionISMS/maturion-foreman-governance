/**
 * Capability Matcher Implementation
 * 
 * Matches tasks to agents based on capabilities, context, and governance
 */

import type { Agent, AgentRegistry, CapabilityMatcher, TaskRequirements, MatchResult } from './types';

class CapabilityMatcherImpl implements CapabilityMatcher {
  constructor(private registry: AgentRegistry) {}

  findBestAgent(task: TaskRequirements): MatchResult | null {
    const matches = this.findAllMatchingAgents(task);
    return matches.length > 0 ? matches[0] : null;
  }

  findAllMatchingAgents(task: TaskRequirements): MatchResult[] {
    const availableAgents = this.registry.getAvailableAgents();
    
    const matches = availableAgents
      .map(agent => ({
        agentId: agent.id,
        matchScore: this.calculateMatchScore(agent, task),
        reason: `Agent ${agent.name} matched with ${this.calculateMatchScore(agent, task).toFixed(1)} score`
      }))
      .filter(match => match.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    return matches;
  }

  calculateMatchScore(agent: Agent, task: TaskRequirements): number {
    let score = 0;
    
    // Skill matching (40% weight)
    const matchedSkills = task.skills.filter(s => 
      agent.capability.skills.includes(s)
    );
    const skillMatch = task.skills.length > 0 
      ? matchedSkills.length / task.skills.length 
      : 1;
    score += skillMatch * 40;
    
    // Context matching (20% weight)
    const matchedContext = task.context.filter(c => 
      agent.capability.context.includes(c)
    );
    const contextMatch = task.context.length > 0
      ? matchedContext.length / task.context.length
      : 1;
    score += contextMatch * 20;
    
    // Risk level compatibility (15% weight)
    const riskLevels = ['low', 'medium', 'high', 'critical'];
    const agentRiskIndex = riskLevels.indexOf(agent.capability.riskLevel);
    const taskRiskIndex = riskLevels.indexOf(task.riskLevel);
    const riskMatch = agentRiskIndex >= taskRiskIndex ? 1 : 0.5;
    score += riskMatch * 15;
    
    // Performance history (15% weight)
    score += agent.capability.performance.successRate * 15;
    
    // Availability (10% weight)
    const availabilityScore = agent.status === 'idle' ? 1 :
      agent.currentTasks.length < agent.capability.maxConcurrentTasks ? 0.5 : 0;
    score += availabilityScore * 10;
    
    return score;
  }
}

export function createCapabilityMatcher(registry: AgentRegistry): CapabilityMatcher {
  return new CapabilityMatcherImpl(registry);
}
