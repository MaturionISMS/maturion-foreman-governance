/**
 * Wave Execution Engine
 * 
 * Orchestrates multi-task execution in coordinated waves with
 * dependency resolution and governance enforcement.
 */

export interface Task {
  id: string;
  type: string;
  priority: number;
  dependencies: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  metadata: Record<string, unknown>;
}

export interface Wave {
  id: string;
  tasks: Task[];
  status: 'planned' | 'running' | 'completed' | 'failed' | 'paused';
  startedAt?: Date;
  completedAt?: Date;
}

export interface DependencyNode {
  taskId: string;
  dependencies: Set<string>;
  dependents: Set<string>;
}

export class DependencyGraphEngine {
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
}

export class WavePlanner {
  planWaves(tasks: Task[]): Wave[] {
    const waves: Wave[] = [];
    const remaining = new Set(tasks.map(t => t.id));
    const completed = new Set<string>();
    const depGraph = new DependencyGraphEngine();

    // Build dependency graph
    for (const task of tasks) {
      depGraph.addTask(task.id, task.dependencies);
    }

    // Check for circular dependencies
    const cycle = depGraph.detectCircularDependencies();
    if (cycle) {
      throw new Error(`Circular dependency detected: ${cycle.join(' -> ')}`);
    }

    let waveNumber = 0;
    while (remaining.size > 0) {
      const waveTasks: Task[] = [];

      for (const taskId of remaining) {
        if (depGraph.canExecute(taskId, completed)) {
          const task = tasks.find(t => t.id === taskId);
          if (task) {
            waveTasks.push(task);
          }
        }
      }

      if (waveTasks.length === 0) {
        throw new Error('Cannot make progress - possible dependency issue');
      }

      waves.push({
        id: `wave-${waveNumber++}`,
        tasks: waveTasks,
        status: 'planned'
      });

      for (const task of waveTasks) {
        remaining.delete(task.id);
        completed.add(task.id);
      }
    }

    return waves;
  }
}

export class WaveScheduler {
  private activeWave: Wave | null;
  private isPaused: boolean;

  constructor() {
    this.activeWave = null;
    this.isPaused = false;
  }

  canStartWave(): boolean {
    return !this.activeWave && !this.isPaused;
  }

  startWave(wave: Wave): void {
    if (!this.canStartWave()) {
      throw new Error('Cannot start wave - another wave is active or system is paused');
    }

    wave.status = 'running';
    wave.startedAt = new Date();
    this.activeWave = wave;
  }

  completeWave(wave: Wave): void {
    wave.status = 'completed';
    wave.completedAt = new Date();
    if (this.activeWave?.id === wave.id) {
      this.activeWave = null;
    }
  }

  pause(): void {
    this.isPaused = true;
    if (this.activeWave) {
      this.activeWave.status = 'paused';
    }
  }

  resume(): void {
    this.isPaused = false;
    if (this.activeWave && this.activeWave.status === 'paused') {
      this.activeWave.status = 'running';
    }
  }

  getActiveWave(): Wave | null {
    return this.activeWave;
  }
}

export class WaveExecutor {
  private scheduler: WaveScheduler;
  private planner: WavePlanner;

  constructor() {
    this.scheduler = new WaveScheduler();
    this.planner = new WavePlanner();
  }

  async executeWaves(tasks: Task[]): Promise<void> {
    const waves = this.planner.planWaves(tasks);

    for (const wave of waves) {
      if (!this.scheduler.canStartWave()) {
        console.log('Waiting for scheduler...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      this.scheduler.startWave(wave);
      await this.executeWave(wave);
      this.scheduler.completeWave(wave);
    }
  }

  private async executeWave(wave: Wave): Promise<void> {
    for (const task of wave.tasks) {
      task.status = 'running';
      try {
        await this.executeTask(task);
        task.status = 'completed';
      } catch (error) {
        task.status = 'failed';
        throw error;
      }
    }
  }

  private async executeTask(task: Task): Promise<void> {
    // Placeholder for task execution
    console.log(`Executing task ${task.id}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  pause(): void {
    this.scheduler.pause();
  }

  resume(): void {
    this.scheduler.resume();
  }

  getActiveWave(): Wave | null {
    return this.scheduler.getActiveWave();
  }
}

export const waveExecutor = new WaveExecutor();
