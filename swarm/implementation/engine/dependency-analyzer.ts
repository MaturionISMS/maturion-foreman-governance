/**
 * Dependency Analyzer Implementation
 * 
 * Analyzes task dependencies and computes execution order
 */

import type { DependencyAnalyzer } from './types';

interface DependencyNode {
  taskId: string;
  dependencies: Set<string>;
  dependents: Set<string>;
}

class DependencyAnalyzerImpl implements DependencyAnalyzer {
  private nodes: Map<string, DependencyNode>;

  constructor() {
    this.nodes = new Map();
  }

  addTask(taskId: string, dependencies: string[]): void {
    if (!this.nodes.has(taskId)) {
      this.nodes.set(taskId, {
        taskId,
        dependencies: new Set(dependencies),
        dependents: new Set()
      });
    }

    // Update dependents
    for (const depId of dependencies) {
      if (!this.nodes.has(depId)) {
        this.nodes.set(depId, {
          taskId: depId,
          dependencies: new Set(),
          dependents: new Set()
        });
      }
      this.nodes.get(depId)!.dependents.add(taskId);
    }
  }

  detectCircularDependencies(): string[] | null {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = (taskId: string, path: string[]): string[] | null => {
      if (recursionStack.has(taskId)) {
        return [...path, taskId];
      }
      if (visited.has(taskId)) {
        return null;
      }

      visited.add(taskId);
      recursionStack.add(taskId);

      const node = this.nodes.get(taskId);
      if (node) {
        for (const depId of node.dependencies) {
          const cycle = dfs(depId, [...path, taskId]);
          if (cycle) return cycle;
        }
      }

      recursionStack.delete(taskId);
      return null;
    };

    for (const taskId of this.nodes.keys()) {
      if (!visited.has(taskId)) {
        const cycle = dfs(taskId, []);
        if (cycle) return cycle;
      }
    }

    return null;
  }

  getExecutionOrder(): string[] {
    const order: string[] = [];
    const visited = new Set<string>();
    const temp = new Set<string>();

    const visit = (taskId: string): void => {
      if (visited.has(taskId)) return;
      if (temp.has(taskId)) {
        throw new Error('Circular dependency detected');
      }

      temp.add(taskId);

      const node = this.nodes.get(taskId);
      if (node) {
        for (const depId of node.dependencies) {
          visit(depId);
        }
      }

      temp.delete(taskId);
      visited.add(taskId);
      order.push(taskId);
    };

    for (const taskId of this.nodes.keys()) {
      if (!visited.has(taskId)) {
        visit(taskId);
      }
    }

    return order;
  }

  canExecute(taskId: string, completedTasks: Set<string>): boolean {
    const node = this.nodes.get(taskId);
    if (!node) return false;

    for (const depId of node.dependencies) {
      if (!completedTasks.has(depId)) {
        return false;
      }
    }

    return true;
  }

  getBlockedTasks(): string[] {
    const blocked: string[] = [];

    for (const [taskId, node] of this.nodes.entries()) {
      // Task is blocked if it has dependencies that don't exist
      for (const depId of node.dependencies) {
        if (!this.nodes.has(depId)) {
          blocked.push(taskId);
          break;
        }
      }
    }

    return blocked;
  }
}

export function createDependencyAnalyzer(): DependencyAnalyzer {
  return new DependencyAnalyzerImpl();
}
