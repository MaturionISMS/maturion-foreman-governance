/**
 * ARA Controller Implementation
 * 
 * Main controller for Autonomous Refactoring Agent
 */

import type { ARAController, ARAConfig, ARACycleResult, ARAStatus } from './types';
import { createViolationDetector } from './violation-detector';
import { createRefactoringEngine } from './refactoring-engine';

class ARAControllerImpl implements ARAController {
  private config: ARAConfig | null = null;
  private status: ARAStatus = {
    running: false,
    totalViolationsDetected: 0,
    totalRefactoringsExecuted: 0,
    currentViolations: 0
  };

  private detector = createViolationDetector();
  private engine = createRefactoringEngine();

  start(config: ARAConfig): void {
    this.config = config;
    this.status.running = true;
  }

  stop(): void {
    this.status.running = false;
  }

  async runCycle(): Promise<ARACycleResult> {
    if (!this.config) {
      throw new Error('ARA not configured');
    }

    const errors: string[] = [];
    let violationsDetected = 0;
    let refactoringsProposed = 0;
    let refactoringsExecuted = 0;
    let refactoringsBlocked = 0;

    try {
      // 1. Scan for violations
      const violations = await this.detector.scanDirectory('./');
      violationsDetected = violations.length;
      this.status.totalViolationsDetected += violationsDetected;
      this.status.currentViolations = violationsDetected;

      // 2. Propose refactorings
      const refactorings = violations
        .map(v => this.engine.proposeRefactoring(v))
        .filter(r => r !== null) as any[];
      refactoringsProposed = refactorings.length;

      // 3. Filter by safety
      const safeRefactorings = refactorings.filter(r => r.safety === 'safe');
      const cs2Refactorings = refactorings.filter(r => r.safety === 'requires_cs2');

      // 4. Execute safe refactorings (up to max per cycle)
      const toExecute = safeRefactorings.slice(0, this.config.maxRefactoringsPerCycle);
      
      if (this.config.autoExecuteSafeRefactorings) {
        for (const refactoring of toExecute) {
          const result = await this.engine.executeRefactoring(refactoring);
          if (result.success) {
            refactoringsExecuted++;
            this.status.totalRefactoringsExecuted++;
          } else {
            errors.push(result.error || 'Unknown error');
          }
        }
      }

      // 5. Block CS2 refactorings if respectCS2 is true
      if (this.config.respectCS2) {
        refactoringsBlocked = cs2Refactorings.length;
      }

      this.status.lastCycleAt = new Date();

    } catch (error) {
      errors.push((error as Error).message);
    }

    return {
      violationsDetected,
      refactoringsProposed,
      refactoringsExecuted,
      refactoringsBlocked,
      errors
    };
  }

  getStatus(): ARAStatus {
    return { ...this.status };
  }
}

export function createARAController(): ARAController {
  return new ARAControllerImpl();
}
