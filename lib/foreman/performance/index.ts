/**
 * CS5 Performance Enforcement Module
 * 
 * Mandatory Performance Optimization System
 * 
 * Exports:
 * - Performance Scanner: Detect inefficiencies and violations
 * - Enforcement Engine: Block PRs with violations
 * - Patterns: Performance anti-patterns and forbidden code
 */

export {
  runPerformanceScan,
  quickPerformanceScan,
  scanFiles,
  type PerformanceScanResult,
  type PerformanceViolation,
} from './performance-scanner';

export {
  enforcePerformanceStandards,
  generateBuilderFixInstructions,
  detectPerformanceRegression,
  type PerformanceEnforcementResult,
} from './enforcement-engine';

export {
  ALL_PATTERNS,
  FORBIDDEN_COMMENTS,
  INEFFICIENT_PATTERNS,
  REACT_PATTERNS,
  getCriticalPatterns,
  getPatternsByAction,
  getPatternsBySeverity,
  type PerformancePattern,
  type PerformanceSeverity,
} from './patterns';
