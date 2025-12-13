/**
 * Violation Classifier
 * 
 * Classification engine for constraint violations.
 * Assigns severity, category, and nature to detected violations.
 * 
 * Wave 3B: Classification Logic
 */

import { ConstraintDeclaration } from '../../../../types/constraints';
import {
  RawViolation,
  ClassifiedViolation,
  ViolationReport,
  ClassifiedViolationReport,
  ViolationSeverity,
  ViolationCategory,
  ViolationNature,
  SeverityAggregate,
  CategoryAggregate,
} from '../../../../types/violations';

/**
 * Classify a single violation
 * 
 * @param violation - Raw violation to classify
 * @param constraint - Constraint that was violated
 * @returns Classified violation with severity, category, nature
 */
export function classifyViolation(
  violation: RawViolation,
  constraint: ConstraintDeclaration
): ClassifiedViolation {
  // Generate unique ID
  const id = `${constraint.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Determine severity (with governance elevation rule)
  const severity = determineSeverity(violation, constraint);

  // Assign category from constraint
  const category = constraint.category as ViolationCategory;

  // Determine nature from type
  const nature = determineNature(violation.type);

  // Check if likely false positive
  const falsePositive = isLikelyFalsePositive(violation, severity);

  return {
    ...violation,
    id,
    severity,
    category,
    nature,
    falsePositive,
  };
}

/**
 * Determine severity for a violation
 * 
 * Rule: Governance violations are elevated by one level
 */
function determineSeverity(
  violation: RawViolation,
  constraint: ConstraintDeclaration
): ViolationSeverity {
  let severity: ViolationSeverity = constraint.severity as ViolationSeverity;

  // Governance elevation rule: elevate governance violations by one level
  if (violation.type === 'governance') {
    const severityOrder: ViolationSeverity[] = ['info', 'low', 'medium', 'high', 'critical'];
    const currentIndex = severityOrder.indexOf(severity);
    
    if (currentIndex >= 0 && currentIndex < severityOrder.length - 1) {
      severity = severityOrder[currentIndex + 1];
    }
  }

  return severity;
}

/**
 * Determine nature from constraint type
 */
function determineNature(type: 'structural' | 'contract' | 'governance'): ViolationNature {
  const natureMap: Record<string, ViolationNature> = {
    structural: 'structural',
    contract: 'contract',
    governance: 'governance',
  };

  return natureMap[type] || 'structural';
}

/**
 * Check if violation is likely a false positive
 */
function isLikelyFalsePositive(
  violation: RawViolation,
  severity: ViolationSeverity
): boolean {
  // If severity is 'info', it's likely a false positive candidate
  return severity === 'info';
}

/**
 * Classify entire violation report
 * 
 * @param rawReport - Raw violation report
 * @param constraints - All constraints
 * @returns Classified violation report
 */
export function classifyViolationReport(
  rawReport: ViolationReport,
  constraints: ConstraintDeclaration[]
): ClassifiedViolationReport {
  // Build constraint map for quick lookup
  const constraintMap = new Map(constraints.map(c => [c.id, c]));

  // Classify each violation
  const classifiedViolations: ClassifiedViolation[] = rawReport.violations.map(violation => {
    const constraint = constraintMap.get(violation.constraintId);
    if (!constraint) {
      // If constraint not found, use default classification
      return {
        ...violation,
        id: `unknown-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        severity: 'medium' as ViolationSeverity,
        category: 'module_boundary' as ViolationCategory,
        nature: determineNature(violation.type),
        falsePositive: false,
      };
    }
    return classifyViolation(violation, constraint);
  });

  // Aggregate by severity, category, nature
  const bySeverity = aggregateBySeverity(classifiedViolations);
  const byCategory = aggregateByCategory(classifiedViolations);
  
  const byNature: Record<ViolationNature, number> = {
    governance: classifiedViolations.filter(v => v.nature === 'governance').length,
    structural: classifiedViolations.filter(v => v.nature === 'structural').length,
    contract: classifiedViolations.filter(v => v.nature === 'contract').length,
  };

  const falsePositiveCount = classifiedViolations.filter(v => v.falsePositive).length;

  return {
    signatureHash: rawReport.signatureHash,
    commit: rawReport.commit,
    timestamp: rawReport.timestamp,
    violations: classifiedViolations,
    summary: {
      total: classifiedViolations.length,
      bySeverity,
      byCategory,
      byNature,
      falsePositiveCount,
    },
  };
}

/**
 * Aggregate violations by severity
 * 
 * @param violations - Classified violations
 * @returns Severity aggregate
 */
export function aggregateBySeverity(
  violations: ClassifiedViolation[]
): SeverityAggregate {
  return {
    critical: violations.filter(v => v.severity === 'critical').length,
    high: violations.filter(v => v.severity === 'high').length,
    medium: violations.filter(v => v.severity === 'medium').length,
    low: violations.filter(v => v.severity === 'low').length,
    info: violations.filter(v => v.severity === 'info').length,
  };
}

/**
 * Aggregate violations by category
 * 
 * @param violations - Classified violations
 * @returns Category aggregate
 */
export function aggregateByCategory(
  violations: ClassifiedViolation[]
): CategoryAggregate {
  return {
    dependency_direction: violations.filter(v => v.category === 'dependency_direction').length,
    layer_violation: violations.filter(v => v.category === 'layer_violation').length,
    import_restriction: violations.filter(v => v.category === 'import_restriction').length,
    module_boundary: violations.filter(v => v.category === 'module_boundary').length,
    api_stability: violations.filter(v => v.category === 'api_stability').length,
    type_stability: violations.filter(v => v.category === 'type_stability').length,
    event_schema: violations.filter(v => v.category === 'event_schema').length,
    protected_path: violations.filter(v => v.category === 'protected_path').length,
    constitutional: violations.filter(v => v.category === 'constitutional').length,
    cs_boundary: violations.filter(v => v.category === 'cs_boundary').length,
    governance_integrity: violations.filter(v => v.category === 'governance_integrity').length,
  };
}

/**
 * Identify false positive candidates
 * 
 * @param violations - Classified violations
 * @returns Violations flagged as false positives
 */
export function identifyFalsePositives(
  violations: ClassifiedViolation[]
): ClassifiedViolation[] {
  return violations.filter(v => v.falsePositive);
}
