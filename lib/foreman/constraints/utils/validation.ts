/**
 * Validation Utilities for Constraint Engine
 * 
 * Provides validation functions for constraint declarations and signatures.
 */

import { ConstraintDeclaration, ConstraintType, ConstraintSeverity } from '../../../../types/constraints';

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate a constraint declaration
 */
export function validateConstraint(constraint: any): ValidationResult {
  const errors: string[] = [];

  // Check required fields
  const requiredFields: (keyof ConstraintDeclaration)[] = [
    'id',
    'version',
    'type',
    'category',
    'rule',
    'scope',
    'severity',
    'owner',
    'source',
    'examples',
    'metadata',
    'createdAt',
    'updatedAt',
  ];

  for (const field of requiredFields) {
    if (!(field in constraint)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate constraint type
  const validTypes: ConstraintType[] = ['structural', 'contract', 'governance'];
  if (constraint.type && !validTypes.includes(constraint.type)) {
    errors.push('Invalid constraint type');
  }

  // Validate severity
  const validSeverities: ConstraintSeverity[] = ['critical', 'high', 'medium', 'low'];
  if (constraint.severity && !validSeverities.includes(constraint.severity)) {
    errors.push('Invalid constraint severity');
  }

  // Validate version format (semver)
  if (constraint.version && !isSemver(constraint.version)) {
    errors.push('Invalid version format (expected semver)');
  }

  // Validate examples structure
  if (constraint.examples) {
    if (!constraint.examples.valid || !Array.isArray(constraint.examples.valid)) {
      errors.push('Invalid examples.valid (expected array)');
    }
    if (!constraint.examples.invalid || !Array.isArray(constraint.examples.invalid)) {
      errors.push('Invalid examples.invalid (expected array)');
    }
  }

  // Validate timestamps
  if (constraint.createdAt && !isISO8601(constraint.createdAt)) {
    errors.push('Invalid createdAt timestamp (expected ISO 8601)');
  }
  if (constraint.updatedAt && !isISO8601(constraint.updatedAt)) {
    errors.push('Invalid updatedAt timestamp (expected ISO 8601)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if string is valid semver
 * 
 * Note: Wave 3A uses simplified semver (X.Y.Z only).
 * Future waves may support pre-release identifiers and build metadata.
 */
function isSemver(version: string): boolean {
  return /^\d+\.\d+\.\d+$/.test(version);
}

/**
 * Check if string is valid ISO 8601 timestamp
 */
function isISO8601(timestamp: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T/.test(timestamp);
}
