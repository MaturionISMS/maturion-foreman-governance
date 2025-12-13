/**
 * Dashboard Renderer Implementation
 * 
 * Renders swarm state as ASCII art CLI dashboard
 */

import type { Agent, Task, Conflict } from '../implementation/engine/types';
import type { DashboardRenderer, SwarmState, Wave, GovernanceAlert } from './types';

class DashboardRendererImpl implements DashboardRenderer {
  renderAgentStates(agents: Agent[]): string {
    let output = '┌─────────────────────────────────────────────────────────────┐\n';
    output += '│ AGENT STATUS                                                │\n';
    output += '├─────────────────────────────────────────────────────────────┤\n';
    
    for (const agent of agents) {
      const icon = agent.status === 'idle' ? '✓' : 
                   agent.status === 'busy' ? '⚙' : 
                   agent.status === 'blocked' ? '⚠' : '•';
      const statusPadded = `[${agent.status.toUpperCase()}]`.padEnd(10);
      const successRate = `${(agent.capability.performance.successRate * 100).toFixed(0)}% success`;
      const tasks = `${agent.totalTasksCompleted} tasks`;
      
      output += `│  ${icon} ${agent.name.padEnd(15)} ${statusPadded} ${successRate.padEnd(15)} ${tasks.padEnd(10)}│\n`;
    }
    
    output += '└─────────────────────────────────────────────────────────────┘\n';
    return output;
  }

  renderTaskHeatmap(tasks: Task[]): string {
    return 'Task heatmap visualization\n';
  }

  renderWaveProgress(wave: Wave): string {
    const completed = wave.tasks.filter(t => t.status === 'completed').length;
    const total = wave.tasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const barLength = 20;
    const filledLength = Math.round((percentage / 100) * barLength);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    
    let output = '┌─────────────────────────────────────────────────────────────┐\n';
    output += `│ WAVE PROGRESS (${wave.id})                                      │\n`;
    output += '├─────────────────────────────────────────────────────────────┤\n';
    output += `│  Progress: [${bar}] ${percentage}% (${completed}/${total} tasks)          │\n`;
    output += '└─────────────────────────────────────────────────────────────┘\n';
    
    return output;
  }

  renderGovernanceAlerts(alerts: GovernanceAlert[]): string {
    let output = '┌─────────────────────────────────────────────────────────────┐\n';
    output += '│ GOVERNANCE ALERTS                                           │\n';
    output += '├─────────────────────────────────────────────────────────────┤\n';
    
    if (alerts.length === 0) {
      output += '│  No alerts                                                  │\n';
    } else {
      for (const alert of alerts) {
        const icon = alert.severity === 'critical' ? '⚠' : 'ℹ';
        output += `│  ${icon} ${alert.message.substring(0, 55).padEnd(55)}│\n`;
      }
    }
    
    output += '└─────────────────────────────────────────────────────────────┘\n';
    return output;
  }

  renderSwarmTopology(swarm: SwarmState): string {
    return 'Swarm topology visualization\n';
  }

  renderConflictEvents(conflicts: Conflict[]): string {
    let output = '┌─────────────────────────────────────────────────────────────┐\n';
    output += '│ CONFLICTS                                                   │\n';
    output += '├─────────────────────────────────────────────────────────────┤\n';
    
    if (conflicts.length === 0) {
      output += '│  No conflicts                                               │\n';
    } else {
      for (const conflict of conflicts) {
        output += `│  ⚠ ${conflict.description.substring(0, 55).padEnd(55)}│\n`;
        if (conflict.resolution) {
          output += `│     Resolution: ${conflict.resolution.substring(0, 45).padEnd(45)}│\n`;
        }
      }
    }
    
    output += '└─────────────────────────────────────────────────────────────┘\n';
    return output;
  }

  renderFullDashboard(state: SwarmState): string {
    let output = '\n';
    output += '┌─────────────────────────────────────────────────────────────┐\n';
    output += '│              SWARM COORDINATION DASHBOARD v1.0              │\n';
    output += '└─────────────────────────────────────────────────────────────┘\n';
    output += '\n';
    
    output += this.renderAgentStates(state.agents);
    output += '\n';
    
    output += '┌─────────────────────────────────────────────────────────────┐\n';
    output += '│ TASK EXECUTION                                              │\n';
    output += '├─────────────────────────────────────────────────────────────┤\n';
    output += `│  Running:    ${state.telemetry.runningTasks.toString().padEnd(48)}│\n`;
    output += `│  Completed:  ${state.telemetry.completedTasks.toString().padEnd(48)}│\n`;
    output += `│  Failed:     ${state.telemetry.failedTasks.toString().padEnd(48)}│\n`;
    output += `│  Utilization: ${state.telemetry.systemUtilization}%${' '.repeat(46)}│\n`;
    output += '└─────────────────────────────────────────────────────────────┘\n';
    output += '\n';
    
    if (state.waves.length > 0) {
      output += this.renderWaveProgress(state.waves[0]);
      output += '\n';
    }
    
    const alerts: GovernanceAlert[] = [];
    if (state.araStatus.running) {
      alerts.push({
        id: 'ara-info',
        type: 'ARA_STATUS',
        severity: 'info',
        message: `ARA: ${state.araStatus.currentViolations} violations, ${state.araStatus.totalRefactoringsExecuted} fixed`,
        timestamp: new Date()
      });
    }
    
    output += this.renderGovernanceAlerts(alerts);
    output += '\n';
    
    output += this.renderConflictEvents(state.conflicts);
    output += '\n';
    
    return output;
  }
}

export function createDashboardRenderer(): DashboardRenderer {
  return new DashboardRendererImpl();
}
