/**
 * Type Definitions for Swarm Visualization Dashboard (SVD)
 * 
 * Based on /swarm/architecture/SWARM_ARCHITECTURE_V1.md Section 3
 */

import type { Agent, Task, Conflict } from '../implementation/engine/types';
import type { ARAStatus } from '../implementation/ara/types';

export interface Wave {
  id: string;
  tasks: Task[];
  status: 'planned' | 'running' | 'completed' | 'failed' | 'paused';
  startedAt?: Date;
  completedAt?: Date;
}

export interface TelemetrySnapshot {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  blockedAgents: number;
  totalTasks: number;
  runningTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageTaskDuration: number;
  systemUtilization: number;
  governanceAlerts: number;
}

export interface SwarmState {
  agents: Agent[];
  tasks: Task[];
  conflicts: Conflict[];
  waves: Wave[];
  araStatus: ARAStatus;
  telemetry: TelemetrySnapshot;
  timestamp: Date;
}

export interface AgentStateView {
  id: string;
  name: string;
  status: string;
  currentTasks: string[];
  performance: {
    successRate: number;
    avgResponseTime: number;
    tasksCompleted: number;
  };
}

export interface TaskHeatmap {
  timeSlots: string[];
  taskCounts: number[];
  agentUtilization: Record<string, number[]>;
}

export interface WaveProgress {
  waveId: string;
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  estimatedCompletion: Date;
  criticalPath: string[];
}

export interface TelemetryEvent {
  timestamp: Date;
  source: string;
  type: string;
  data: Record<string, unknown>;
}

export interface TelemetryCollector {
  recordEvent(event: TelemetryEvent): void;
  getRecentEvents(count: number): TelemetryEvent[];
  getEventsInRange(start: Date, end: Date): TelemetryEvent[];
  aggregateMetrics(period: 'hour' | 'day' | 'week'): TelemetrySnapshot;
}

export interface GovernanceAlert {
  id: string;
  type: string;
  severity: string;
  message: string;
  timestamp: Date;
}

export interface DashboardRenderer {
  renderAgentStates(agents: Agent[]): string;
  renderTaskHeatmap(tasks: Task[]): string;
  renderWaveProgress(wave: Wave): string;
  renderGovernanceAlerts(alerts: GovernanceAlert[]): string;
  renderSwarmTopology(swarm: SwarmState): string;
  renderConflictEvents(conflicts: Conflict[]): string;
  renderFullDashboard(state: SwarmState): string;
}

export interface DashboardServer {
  start(port?: number): void;
  stop(): void;
  getCurrentState(): SwarmState;
  streamUpdates(callback: (state: SwarmState) => void): void;
}
