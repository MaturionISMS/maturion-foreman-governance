/**
 * Governance Failure Classifier
 * 
 * Classifies governance failures and generates learning signals
 * for FL/CI system integration.
 */

import type {
  GovernanceFailureType,
  CorrectiveDomain,
  RCACategory,
} from './failure-artifact';

/**
 * Classification Rule
 */
export interface ClassificationRule {
  correctiveDomain: CorrectiveDomain;
  rcaCategory: RCACategory;
  improvementAction: string;
  preventionStrategy: string;
}

/**
 * Classify a failure
 */
export async function classifyFailure(
  failureType: GovernanceFailureType
): Promise<ClassificationRule> {
  // Implementation delegates to existing classify function
  return determineCorrectiveDomain(failureType);
}

/**
 * Determine corrective domain from failure type
 */
export async function determineCorrectiveDomain(
  failureType: GovernanceFailureType
): Promise<ClassificationRule> {
  const rules: Record<GovernanceFailureType, ClassificationRule> = {
    QIEL: {
      correctiveDomain: 'QA',
      rcaCategory: 'qa_gap',
      improvementAction: 'Enhance QA validation',
      preventionStrategy: 'Update QIEL validators',
    },
    CS1: {
      correctiveDomain: 'POLICY',
      rcaCategory: 'policy_gap',
      improvementAction: 'Strengthen constitutional protections',
      preventionStrategy: 'Update hash verification',
    },
    CS2: {
      correctiveDomain: 'ARCHITECTURE',
      rcaCategory: 'architecture_gap',
      improvementAction: 'Clarify architecture approval',
      preventionStrategy: 'Update CS2 workflow',
    },
    CS3: {
      correctiveDomain: 'POLICY',
      rcaCategory: 'policy_gap',
      improvementAction: 'Enhance incident feedback',
      preventionStrategy: 'Update verification workflow',
    },
    CS4: {
      correctiveDomain: 'POLICY',
      rcaCategory: 'policy_gap',
      improvementAction: 'Strengthen compliance',
      preventionStrategy: 'Update alert system',
    },
    CS5: {
      correctiveDomain: 'IMPLEMENTATION',
      rcaCategory: 'implementation_gap',
      improvementAction: 'Fix performance patterns',
      preventionStrategy: 'Update OPOJD validators',
    },
    CS6: {
      correctiveDomain: 'POLICY',
      rcaCategory: 'policy_gap',
      improvementAction: 'Clarify boundaries',
      preventionStrategy: 'Update boundary checks',
    },
    GSR: {
      correctiveDomain: 'QA',
      rcaCategory: 'qa_gap',
      improvementAction: 'Ensure 100% QA passing',
      preventionStrategy: 'Update GSR validators',
    },
    BUILD_PHILOSOPHY: {
      correctiveDomain: 'ARCHITECTURE',
      rcaCategory: 'architecture_gap',
      improvementAction: 'Ensure Architecture → Red QA → Build to Green',
      preventionStrategy: 'Update build philosophy validators',
    },
  };

  return rules[failureType];
}

/**
 * Generate RCA category
 */
export async function generateRCACategory(
  failureType: GovernanceFailureType
): Promise<RCACategory> {
  const rule = await determineCorrectiveDomain(failureType);
  return rule.rcaCategory;
}

/**
 * Suggest improvement action
 */
export async function suggestImprovementAction(
  failureType: GovernanceFailureType
): Promise<string> {
  const rule = await determineCorrectiveDomain(failureType);
  return rule.improvementAction;
}

/**
 * Suggest prevention strategy
 */
export async function suggestPreventionStrategy(
  failureType: GovernanceFailureType
): Promise<string> {
  const rule = await determineCorrectiveDomain(failureType);
  return rule.preventionStrategy;
}
