/**
 * Type Definitions for Swarm Coordination Engine
 * 
 * Based on /swarm/architecture/SWARM_ARCHITECTURE_V1.md
 */

export interface AgentCapability {
  type: 'builder' | 'foreman' | 'maturion-builder' | 'qa' | 'ara' | 'validator';
  skills: string[];
  context: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  governanceDomain: string[];
  maxConcurrentTasks: number;
  performance: {
    avgResponseTime: number;
    successRate: number;
    lastActive: Date;
  };
}

export interface Agent {
  id: string;
  name: string;
  capability: AgentCapability;
  status: 'idle' | 'busy' | 'blocked' | 'escalating' | 'recovering';
  currentTasks: string[];
  totalTasksCompleted: number;
  metadata: Record<string, unknown>;
}

export interface AgentRegistry {
  registerAgent(agent: Agent): void;
  unregisterAgent(agentId: string): void;
  getAgent(agentId: string): Agent | null;
  getAgentsByCapability(type: string): Agent[];
  getAvailableAgents(): Agent[];
  updateAgentStatus(agentId: string, status: Agent['status']): void;
}

export interface TaskRequirements {
  type: string;
  skills: string[];
  context: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  governanceConstraints: string[];
  priority: number;
}

export interface Task {
  id: string;
  type: string;
  requirements: TaskRequirements;
  dependencies: string[];
  priority: number;
  status: 'pending' | 'assigned' | 'running' | 'completed' | 'failed' | 'blocked' | 'cancelled';
  assignedAgent?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  metadata: Record<string, unknown>;
}

export interface MatchResult {
  agentId: string;
  matchScore: number;
  reason: string;
  estimatedDuration?: number;
}

export interface CapabilityMatcher {
  findBestAgent(task: TaskRequirements): MatchResult | null;
  findAllMatchingAgents(task: TaskRequirements): MatchResult[];
  calculateMatchScore(agent: Agent, task: TaskRequirements): number;
}

export interface TaskDistributor {
  submitTask(task: Task): void;
  assignTask(taskId: string, agentId: string): void;
  distributeReadyTasks(): Promise<void>;
  getTaskStatus(taskId: string): Task['status'];
  cancelTask(taskId: string): void;
}

export interface AgentOperation {
  agentId: string;
  type: string;
  target: string;
  timestamp: Date;
}

export interface Conflict {
  id: string;
  type: 'file' | 'resource' | 'architecture' | 'governance';
  agentIds: string[];
  taskIds: string[];
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
  resolvedAt?: Date;
  resolution?: string;
}

export interface ConflictResolution {
  strategy: 'priority' | 'backoff' | 'merge' | 'escalate';
  winningAgent?: string;
  backoffAgents: string[];
  requiresHumanReview: boolean;
}

export interface ConflictResolver {
  detectConflict(operations: AgentOperation[]): Conflict | null;
  resolveConflict(conflict: Conflict): ConflictResolution;
  applyBackoff(agentId: string, duration: number): void;
  escalateConflict(conflict: Conflict): void;
}

export interface DependencyAnalyzer {
  addTask(taskId: string, dependencies: string[]): void;
  detectCircularDependencies(): string[] | null;
  getExecutionOrder(): string[];
  canExecute(taskId: string, completedTasks: Set<string>): boolean;
  getBlockedTasks(): string[];
}

export interface AgentLoad {
  agentId: string;
  currentTasks: number;
  maxCapacity: number;
  utilizationPercentage: number;
  estimatedAvailableAt?: Date;
}

export interface ScheduleDecision {
  schedule: 'immediate' | 'queued' | 'delayed' | 'rejected';
  assignedAgent?: string;
  estimatedStartTime?: Date;
  reason: string;
}

export interface LoadBalancer {
  getAgentLoad(agentId: string): AgentLoad;
  getAllAgentLoads(): AgentLoad[];
  isOverloaded(agentId: string): boolean;
  rebalanceTasks(): Promise<void>;
  scheduleTask(task: Task): ScheduleDecision;
}

export interface CS5Violation {
  agentId: string;
  metric: string;
  threshold: number;
  actual: number;
  timestamp: Date;
}

export interface CS6Violation {
  operation: string;
  reason: string;
  timestamp: Date;
}

export interface SwarmCoordinator {
  registerAgent(agent: Agent): Promise<void>;
  submitTask(task: Task): Promise<void>;
  distributeReadyTasks(): Promise<void>;
  getTaskStatus(taskId: string): Task['status'];
  checkCS5Compliance(): CS5Violation[];
  checkCS6Compliance(): CS6Violation[];
}
