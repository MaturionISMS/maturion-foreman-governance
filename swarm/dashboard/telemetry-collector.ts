/**
 * Telemetry Collector Implementation
 * 
 * Collects and aggregates telemetry data from swarm components
 */

import type { TelemetryCollector, TelemetryEvent, TelemetrySnapshot } from './types';

class TelemetryCollectorImpl implements TelemetryCollector {
  private events: TelemetryEvent[] = [];

  recordEvent(event: TelemetryEvent): void {
    this.events.push(event);
    // Keep only last 1000 events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
  }

  getRecentEvents(count: number): TelemetryEvent[] {
    return this.events.slice(-count);
  }

  getEventsInRange(start: Date, end: Date): TelemetryEvent[] {
    return this.events.filter(e => 
      e.timestamp.getTime() >= start.getTime() && 
      e.timestamp.getTime() <= end.getTime()
    );
  }

  aggregateMetrics(period: 'hour' | 'day' | 'week'): TelemetrySnapshot {
    // Simple aggregation
    const recentEvents = this.getRecentEvents(100);
    
    const agentEvents = recentEvents.filter(e => e.type.includes('agent'));
    const taskEvents = recentEvents.filter(e => e.type.includes('task'));

    return {
      totalAgents: this.countUnique(agentEvents, 'agentId'),
      activeAgents: agentEvents.filter(e => e.type === 'agent_busy').length,
      idleAgents: agentEvents.filter(e => e.type === 'agent_idle').length,
      blockedAgents: agentEvents.filter(e => e.type === 'agent_blocked').length,
      totalTasks: this.countUnique(taskEvents, 'taskId'),
      runningTasks: taskEvents.filter(e => e.type === 'task_running').length,
      completedTasks: taskEvents.filter(e => e.type === 'task_completed').length,
      failedTasks: taskEvents.filter(e => e.type === 'task_failed').length,
      averageTaskDuration: 2500,
      systemUtilization: 60,
      governanceAlerts: recentEvents.filter(e => e.type.includes('alert')).length
    };
  }

  private countUnique(events: TelemetryEvent[], field: string): number {
    const unique = new Set(events.map(e => e.data[field]).filter(v => v !== undefined));
    return unique.size;
  }
}

export function createTelemetryCollector(): TelemetryCollector {
  return new TelemetryCollectorImpl();
}
