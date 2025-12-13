/**
 * Task Distributor Implementation
 * 
 * Distributes tasks to agents based on capability matching and dependencies
 */

import type { Task, TaskDistributor } from './types';

class TaskDistributorImpl implements TaskDistributor {
  private tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map();
  }

  submitTask(task: Task): void {
    this.tasks.set(task.id, task);
  }

  assignTask(taskId: string, agentId: string): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.assignedAgent = agentId;
      task.status = 'assigned';
    }
  }

  async distributeReadyTasks(): Promise<void> {
    // Simple implementation: mark assigned tasks as not pending
    for (const task of this.tasks.values()) {
      if (task.status === 'assigned' && task.dependencies.length === 0) {
        task.status = 'running';
      }
    }
  }

  getTaskStatus(taskId: string): Task['status'] {
    const task = this.tasks.get(taskId);
    return task ? task.status : 'pending';
  }

  cancelTask(taskId: string): void {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = 'cancelled' as any;
    }
  }
}

export function createTaskDistributor(): TaskDistributor {
  return new TaskDistributorImpl();
}
