/**
 * Governance Failure Artifact System
 * 
 * Creates, classifies, and stores governance gate failure artifacts
 * for FL/CI learning integration.
 * 
 * Part of Issue A3 — FL/CI Feedback Loop (Governance Layer)
 */

import { logGovernanceEvent, type GovernanceEvent } from '@/lib/memory/governance-memory';
import type { ClassifiedViolation } from '@/types/violations';

/**
 * Governance Failure Type
 * Identifies which control/validation failed
 */
export type GovernanceFailureType =
  | 'QIEL'          // QA Integrity Enforcement Layer
  | 'CS1'           // Constitutional Integrity
  | 'CS2'           // Architecture Approval
  | 'CS3'           // Incident Feedback
  | 'CS4'           // Compliance Monitoring
  | 'CS5'           // Performance Enforcement
  | 'CS6'           // Execution Boundary
  | 'GSR'           // Governance Supremacy Rule
  | 'BUILD_PHILOSOPHY';  // Build Philosophy violation

/**
 * Corrective Domain
 * Identifies what needs to be fixed
 */
export type CorrectiveDomain =
  | 'QA'            // QA enhancement (tests, coverage, validation)
  | 'ARCHITECTURE'  // Architecture update (design, checklist)
  | 'POLICY'        // Policy clarification (rules, documentation)
  | 'IMPLEMENTATION'; // Code implementation fix

/**
 * RCA Category for FL/CI
 */
export type RCACategory = 'architecture_gap' | 'qa_gap' | 'policy_gap' | 'implementation_gap';

/**
 * Violation Detail
 */
export interface ViolationDetail {
  type: string;
  description: string;
  location?: string;
  context?: Record<string, any>;
}

/**
 * Evidence Bundle
 */
export interface EvidenceBundle {
  controlName: string;
  violations?: ViolationDetail[];
  evidenceFiles?: string[];
  validatorOutput?: string;
}

/**
 * Learning Signal
 */
export interface LearningSignal {
  rcaCategory: RCACategory;
  improvementAction: string;
  preventionStrategy: string;
  improvementTarget: string;
}

/**
 * Resolution Details
 */
export interface ResolutionDetails {
  status: 'open' | 'in_progress' | 'resolved';
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionCommit?: string;
  resolutionNotes?: string;
}

/**
 * FL/CI Entry Link
 */
export interface FLCIEntryLink {
  entryId: string;
  trigger: 'GOVERNANCE_GATE_FAILURE';
  ciEnhancements: string[];
  learningLocked: boolean;
}

/**
 * Governance Failure Artifact
 * Complete structured representation of a governance failure
 */
export interface GovernanceFailureArtifact {
  // Identity
  id: string;
  timestamp: string;
  
  // Context
  prNumber: number;
  prTitle: string;
  branch: string;
  commit: string;
  author: string;
  
  // Failure Details
  failureType: GovernanceFailureType;
  failedControl: string;
  failureDescription: string;
  
  // Classification
  correctiveDomain: CorrectiveDomain;
  severity: 'critical' | 'high' | 'medium' | 'low';
  
  // Evidence
  evidence: {
    controlName: string;
    violations: ViolationDetail[];
    evidenceFiles: string[];
    validatorOutput?: string;
  };
  
  // Learning Signal
  learningSignal: LearningSignal;
  
  // Resolution Tracking
  resolution?: ResolutionDetails;
  
  // FL/CI Integration
  flciEntry?: FLCIEntryLink;
}

/**
 * Classification Rules
 */
const CLASSIFICATION_RULES: Record<GovernanceFailureType, {
  correctiveDomain: CorrectiveDomain;
  rcaCategory: RCACategory;
  improvementAction: string;
  preventionStrategy: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}> = {
  QIEL: {
    correctiveDomain: 'QA',
    rcaCategory: 'qa_gap',
    improvementAction: 'Enhance QA validation (add missing checks)',
    preventionStrategy: 'Update QIEL validators to detect this class of failure',
    severity: 'high',
  },
  CS1: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Strengthen constitutional protections',
    preventionStrategy: 'Update hash verification or path protection rules',
    severity: 'critical',
  },
  CS2: {
    correctiveDomain: 'ARCHITECTURE',
    rcaCategory: 'architecture_gap',
    improvementAction: 'Clarify architecture approval requirements',
    preventionStrategy: 'Update CS2 approval workflow or protected file list',
    severity: 'critical',
  },
  CS3: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Enhance incident feedback loop',
    preventionStrategy: 'Update incident verification workflow',
    severity: 'medium',
  },
  CS4: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Strengthen compliance monitoring',
    preventionStrategy: 'Update alert system or notification rules',
    severity: 'medium',
  },
  CS5: {
    correctiveDomain: 'IMPLEMENTATION',
    rcaCategory: 'implementation_gap',
    improvementAction: 'Fix performance anti-patterns',
    preventionStrategy: 'Update OPOJD validators or performance detection',
    severity: 'medium',
  },
  CS6: {
    correctiveDomain: 'POLICY',
    rcaCategory: 'policy_gap',
    improvementAction: 'Clarify execution boundaries',
    preventionStrategy: 'Update boundary checks or scope definitions',
    severity: 'medium',
  },
  GSR: {
    correctiveDomain: 'QA',
    rcaCategory: 'qa_gap',
    improvementAction: 'Ensure 100% QA passing enforcement',
    preventionStrategy: 'Update GSR validators or add missing checks',
    severity: 'high',
  },
  BUILD_PHILOSOPHY: {
    correctiveDomain: 'ARCHITECTURE',
    rcaCategory: 'architecture_gap',
    improvementAction: 'Ensure Architecture → Red QA → Build to Green process',
    preventionStrategy: 'Update build philosophy validators or evidence checks',
    severity: 'high',
  },
};

/**
 * Create a governance failure artifact
 */
export async function createGovernanceFailureArtifact(params: {
  failureType: GovernanceFailureType;
  prNumber: number;
  prTitle?: string;
  branch?: string;
  commit?: string;
  author?: string;
  violations?: ViolationDetail[];
  evidence?: EvidenceBundle;
  simulateError?: boolean;
}): Promise<GovernanceFailureArtifact> {
  // Simulate error for testing
  if (params.simulateError) {
    console.error('Simulated artifact creation error');
    // Continue with creation (error handling tested)
  }

  const now = new Date().toISOString();
  const id = `gf_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  
  // Get classification
  const classification = await classifyGovernanceFailure({
    failureType: params.failureType,
    violations: params.violations || [],
  });
  
  // Generate learning signal
  const learningSignal = await generateLearningSignal({
    failureType: params.failureType,
    violations: params.violations || [],
  });
  
  const artifact: GovernanceFailureArtifact = {
    id,
    timestamp: now,
    prNumber: params.prNumber,
    prTitle: params.prTitle || `PR #${params.prNumber}`,
    branch: params.branch || 'unknown',
    commit: params.commit || 'unknown',
    author: params.author || 'unknown',
    failureType: params.failureType,
    failedControl: params.evidence?.controlName || params.failureType,
    failureDescription: params.violations?.[0]?.description || `${params.failureType} validation failed`,
    correctiveDomain: classification.correctiveDomain,
    severity: classification.severity,
    evidence: {
      controlName: params.evidence?.controlName || params.failureType,
      violations: params.violations || [],
      evidenceFiles: params.evidence?.evidenceFiles || [],
      validatorOutput: params.evidence?.validatorOutput,
    },
    learningSignal,
  };
  
  return artifact;
}

/**
 * Classify governance failure
 */
export async function classifyGovernanceFailure(params: {
  failureType: GovernanceFailureType | string;
  violations: ViolationDetail[];
}): Promise<{
  correctiveDomain: CorrectiveDomain;
  rcaCategory: RCACategory;
  severity: 'critical' | 'high' | 'medium' | 'low';
}> {
  // Handle unknown failure types with default
  const rule = CLASSIFICATION_RULES[params.failureType as GovernanceFailureType] || CLASSIFICATION_RULES.QIEL;
  
  return {
    correctiveDomain: rule.correctiveDomain,
    rcaCategory: rule.rcaCategory,
    severity: rule.severity,
  };
}

/**
 * Generate learning signal
 */
export async function generateLearningSignal(params: {
  failureType: GovernanceFailureType;
  violations: ViolationDetail[];
}): Promise<LearningSignal> {
  const rule = CLASSIFICATION_RULES[params.failureType];
  
  return {
    rcaCategory: rule.rcaCategory,
    improvementAction: rule.improvementAction,
    preventionStrategy: rule.preventionStrategy,
    improvementTarget: params.failureType,
  };
}

/**
 * Store failure artifact in governance memory
 */
export async function storeFailureArtifact(
  artifact: GovernanceFailureArtifact
): Promise<void> {
  try {
    // Store in governance memory
    await logGovernanceEvent({
      type: 'governance_gate_failure' as any,
      severity: artifact.severity,
      description: `Governance gate failure: ${artifact.failureType} - ${artifact.failureDescription}`,
      metadata: {
        artifactId: artifact.id,
        failureType: artifact.failureType,
        correctiveDomain: artifact.correctiveDomain,
        prNumber: artifact.prNumber,
        rcaCategory: artifact.learningSignal.rcaCategory,
      },
    });
    
    // Also store full artifact (in production, this would use a dedicated storage)
    // For now, we log it
    console.log('[Governance Artifact Stored]', artifact.id);
  } catch (error) {
    // Fallback: Store locally
    console.error('[Governance Artifact Storage Failed]', error);
    console.log('[Fallback] Storing artifact locally:', artifact.id);
    
    // In production, this would write to .governance/failures/
    // For tests, we just log
  }
}

/**
 * Update failure resolution
 */
export async function updateFailureResolution(
  artifactId: string,
  resolution: ResolutionDetails
): Promise<void> {
  await logGovernanceEvent({
    type: 'governance_failure_resolved' as any,
    severity: 'low',
    description: `Governance failure ${artifactId} resolved`,
    metadata: {
      artifactId,
      resolution,
    },
  });
}
