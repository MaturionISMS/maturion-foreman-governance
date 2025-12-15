/**
 * Type Definitions for Governance-Aligned Builder Reasoning Blueprint
 * 
 * These types define the contracts for all stages of the governance blueprint pipeline.
 */

import type { BuilderArtifact } from '../integration-contract';

/**
 * Result of Governance Pre-Check (Stage 1)
 */
export interface GovernanceCheckResult {
  success: boolean;
  canProceed: boolean;
  error?: string;
  violations: string[];
  governanceMindsetLoaded: boolean;
  prGatekeeperRulesLoaded: boolean;
  governanceFiles?: Record<string, string>;
}

/**
 * Result of Architecture Interpretation (Stage 2)
 */
export interface ArchitectureCheckResult {
  success: boolean;
  error?: string;
  missingElements: string[];
  contradictions: Array<{
    element: string;
    conflict: string;
  }>;
  missingDependencies: string[];
  schemaMisalignments: Array<{
    component: string;
    issue: string;
  }>;
}

/**
 * Builder Implementation Plan (Stage 3)
 */
export interface BuilderPlan {
  implementation: string[];
  tests: string[];
  coverage?: number;
  dependencies?: string[];
}

/**
 * Result of Plan Validation (Stage 3)
 */
export interface PlanValidationResult {
  success: boolean;
  error?: string;
  shortcutPatternsDetected: Array<{
    pattern: string;
    location: string;
  }>;
  architectureViolations: Array<{
    violation: string;
    expected: string;
    actual: string;
  }>;
}

/**
 * Builder Output (Stage 4)
 */
export interface BuilderOutput {
  files: Array<{
    path: string;
    content: string;
  }>;
  tests: Array<{
    path: string;
    content: string;
  }>;
}

/**
 * Code Validation Result (Stage 4)
 */
export interface CodeValidationResult {
  success: boolean;
  issues: string[];
  driftDetected: boolean;
}

/**
 * Result of Self-Review (Stage 5)
 */
export interface SelfReviewResult {
  success: boolean;
  qielSimulationRan: boolean;
  missingTests: string[];
  warnings: string[];
  schemaViolations: Array<{
    file: string;
    issue: string;
  }>;
  memoryFabricViolations: Array<{
    file: string;
    issue: string;
  }>;
}

/**
 * Reasoning Document (Stage 6)
 */
export interface ReasoningDocument {
  decisions: string[];
  alternatives?: string[];
}

/**
 * Compliance Statement (Stage 6)
 */
export interface ComplianceStatement {
  compliant: boolean;
  governanceChecks: string[];
  attestation: string;
}

/**
 * Architecture Alignment Summary (Stage 6)
 */
export interface ArchitectureAlignment {
  satisfied: boolean;
  requirements: string[];
  evidence: string[];
}

/**
 * Risk Disclosure (Stage 6)
 */
export interface Risk {
  type: string;
  description: string;
}

/**
 * Complete Handover Package (Stage 6)
 */
export interface HandoverPackage {
  implementation: BuilderArtifact[];
  tests: BuilderArtifact[];
  schemaUpdates?: BuilderArtifact[];
  migrations?: BuilderArtifact[];
  reasoningDocument: ReasoningDocument;
  complianceStatement: ComplianceStatement;
  architectureAlignment: ArchitectureAlignment;
  risks: Risk[];
}

/**
 * Handover Validation Result (Stage 6)
 */
export interface HandoverValidationResult {
  success: boolean;
  error?: string;
  missingArtifacts: string[];
}

/**
 * Blueprint Execution Result
 */
export interface BlueprintExecutionResult {
  success: boolean;
  failedStage?: string;
  subsequentStagesRan: boolean;
  handoverPackage?: HandoverPackage;
  error?: string;
}

/**
 * Drift Detection Result
 */
export interface DriftResult {
  detected: boolean;
  type?: string;
  location?: string;
  description?: string;
}

/**
 * Reasoning Pattern
 */
export interface ReasoningPattern {
  type: 'approved' | 'forbidden';
  pattern: string;
  example?: string;
  reason?: string;
}

/**
 * Reasoning Patterns Collection
 */
export interface ReasoningPatterns {
  approved: ReasoningPattern[];
  forbidden: ReasoningPattern[];
  governanceExamples: Array<{
    scenario: string;
    correctReasoning: string;
  }>;
  antiPatterns: Array<{
    pattern: string;
    why: string;
  }>;
}

/**
 * Governance Memory Log Entry
 */
export interface BuilderReasoningTrace {
  type: 'builder_reasoning_trace';
  builderId: string;
  timestamp: string;
  blueprintCompliant: boolean;
  governanceViolations: string[];
  driftDetected: boolean;
  stagesCompleted: string[];
  stagesFailed: string[];
  handoverApproved: boolean;
}
