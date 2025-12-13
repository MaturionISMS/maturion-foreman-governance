/**
 * Type Definitions for Autonomous Refactoring Agent (ARA)
 * 
 * Based on /swarm/architecture/SWARM_ARCHITECTURE_V1.md Section 2
 */

export interface Violation {
  id: string;
  type: 'code_smell' | 'architecture_violation' | 'anti_pattern' | 'naming_inconsistency' | 'dead_module';
  severity: 'low' | 'medium' | 'high' | 'critical';
  file: string;
  line?: number;
  description: string;
  suggestedFix?: string;
  detectedAt: Date;
}

export interface CodeTransformation {
  original: string;
  modified: string;
  diff: string;
}

export interface Refactoring {
  id: string;
  type: 'rename' | 'extract' | 'inline' | 'move' | 'remove' | 'restructure';
  violation: Violation;
  targetFile: string;
  transformation: CodeTransformation;
  safety: 'safe' | 'requires_review' | 'requires_cs2';
  estimatedImpact: 'low' | 'medium' | 'high';
}

export interface ValidationResult {
  valid: boolean;
  blockers: string[];
  warnings: string[];
  requiresCS2: boolean;
}

export interface RefactoringResult {
  success: boolean;
  refactoringId: string;
  filesModified: string[];
  testsRun?: number;
  testsPassed?: number;
  error?: string;
}

export interface ViolationDetector {
  scanDirectory(path: string): Promise<Violation[]>;
  scanFile(path: string): Promise<Violation[]>;
  detectCodeSmells(code: string): Promise<Violation[]>;
  detectArchitectureViolations(code: string, architecture: any): Promise<Violation[]>;
  detectAntiPatterns(code: string): Promise<Violation[]>;
}

export interface RefactoringEngine {
  proposeRefactoring(violation: Violation): Refactoring | null;
  validateRefactoring(refactoring: Refactoring): ValidationResult;
  executeRefactoring(refactoring: Refactoring): Promise<RefactoringResult>;
  rollbackRefactoring(refactoringId: string): Promise<void>;
}

export interface ARAConfig {
  enabled: boolean;
  autoExecuteSafeRefactorings: boolean;
  scanInterval: number;
  maxRefactoringsPerCycle: number;
  respectCS2: boolean;
}

export interface ARACycleResult {
  violationsDetected: number;
  refactoringsProposed: number;
  refactoringsExecuted: number;
  refactoringsBlocked: number;
  errors: string[];
}

export interface ARAStatus {
  running: boolean;
  lastCycleAt?: Date;
  totalViolationsDetected: number;
  totalRefactoringsExecuted: number;
  currentViolations: number;
}

export interface ARAController {
  start(config: ARAConfig): void;
  stop(): void;
  runCycle(): Promise<ARACycleResult>;
  getStatus(): ARAStatus;
}
