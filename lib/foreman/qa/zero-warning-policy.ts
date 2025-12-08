/**
 * Zero-Warning Build Policy (GSR-QA-STRICT-001)
 * 
 * Enforces the STRICT zero-warning policy across build, lint, and TypeScript compilation.
 * 
 * Philosophy: Warnings are errors waiting to happen. A clean build means ZERO warnings.
 * NO EXCEPTIONS. NO WHITELISTING.
 * 
 * Per GSR-QA-STRICT-001: ALL warnings are treated as blockers.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface ZeroWarningPolicyResult {
  passed: boolean;
  buildWarnings: string[];
  lintWarnings: string[];
  typescriptWarnings: string[];
  unusedVariables: string[];
  deprecatedAPIs: string[];
  totalIssues: number;
  summary: string;
}

/**
 * Patterns for detecting specific warning types
 */
const BUILD_WARNING_PATTERNS = [
  /^.*webpack compiled with \d+ warning/i,
  /\d+ warning\(s\)\s*$/i,
  /^Warning: /,
];

const LINT_WARNING_PATTERNS = [
  /warning\s+/i,
  /⚠/,
];

const TYPESCRIPT_WARNING_PATTERNS = [
  /TS\d{4}:.*warning/i,
  /\(TS\d{4}\)/,
];

const UNUSED_VARIABLE_PATTERNS = [
  /'[^']+' is declared but (its value is )?never (read|used)/,
  /'[^']+' is assigned a value but never used/,
  /no-unused-vars/,
];

const DEPRECATED_API_PATTERNS = [
  /deprecated/i,
  /marked as deprecated/i,
  /@deprecated/i,
];

/**
 * Check build warnings in build log
 * STRICT MODE: No whitelisting - all warnings are blockers
 */
function checkBuildWarnings(buildLog: string): string[] {
  const warnings: string[] = [];
  const lines = buildLog.split('\n');

  lines.forEach(line => {
    for (const pattern of BUILD_WARNING_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(line.trim());
        break;
      }
    }
  });

  return warnings;
}

/**
 * Check lint warnings in lint log
 * STRICT MODE: No whitelisting - all warnings are blockers
 */
function checkLintWarnings(lintLog: string): string[] {
  const warnings: string[] = [];
  const lines = lintLog.split('\n');

  lines.forEach(line => {
    for (const pattern of LINT_WARNING_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(line.trim());
        break;
      }
    }
  });

  return warnings;
}

/**
 * Check TypeScript warnings in build/lint logs
 * STRICT MODE: No whitelisting - all warnings are blockers
 */
function checkTypescriptWarnings(
  buildLog: string,
  lintLog: string
): string[] {
  const warnings: string[] = [];
  const combinedLog = `${buildLog}\n${lintLog}`;
  const lines = combinedLog.split('\n');

  lines.forEach(line => {
    for (const pattern of TYPESCRIPT_WARNING_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(line.trim());
        break;
      }
    }
  });

  return warnings;
}

/**
 * Check for unused variables in lint log
 */
function checkUnusedVariables(lintLog: string): string[] {
  const unused: string[] = [];
  const lines = lintLog.split('\n');

  lines.forEach(line => {
    for (const pattern of UNUSED_VARIABLE_PATTERNS) {
      if (pattern.test(line)) {
        unused.push(line.trim());
        break;
      }
    }
  });

  return unused;
}

/**
 * Check for deprecated API usage in all logs
 */
function checkDeprecatedAPIs(
  buildLog: string,
  lintLog: string,
  testLog: string
): string[] {
  const deprecated: string[] = [];
  const combinedLog = `${buildLog}\n${lintLog}\n${testLog}`;
  const lines = combinedLog.split('\n');

  lines.forEach(line => {
    // Skip test output lines that start with #
    if (line.trim().startsWith('#')) {
      return;
    }
    
    for (const pattern of DEPRECATED_API_PATTERNS) {
      if (pattern.test(line)) {
        deprecated.push(line.trim());
        break;
      }
    }
  });

  return deprecated;
}

/**
 * Run STRICT zero-warning policy checks on all logs
 * GSR-QA-STRICT-001: NO whitelisting, ALL warnings block
 */
export function runZeroWarningPolicy(
  logsDir: string = '/tmp'
): ZeroWarningPolicyResult {
  const buildLogPath = path.join(logsDir, 'build.log');
  const lintLogPath = path.join(logsDir, 'lint.log');
  const testLogPath = path.join(logsDir, 'test.log');

  // Read logs
  const buildLog = fs.existsSync(buildLogPath)
    ? fs.readFileSync(buildLogPath, 'utf-8')
    : '';
  const lintLog = fs.existsSync(lintLogPath)
    ? fs.readFileSync(lintLogPath, 'utf-8')
    : '';
  const testLog = fs.existsSync(testLogPath)
    ? fs.readFileSync(testLogPath, 'utf-8')
    : '';

  // Check all warning types - STRICT MODE: No whitelisting
  const buildWarnings = checkBuildWarnings(buildLog);
  const lintWarnings = checkLintWarnings(lintLog);
  const typescriptWarnings = checkTypescriptWarnings(buildLog, lintLog);
  const unusedVariables = checkUnusedVariables(lintLog);
  const deprecatedAPIs = checkDeprecatedAPIs(buildLog, lintLog, testLog);

  const totalIssues =
    buildWarnings.length +
    lintWarnings.length +
    typescriptWarnings.length +
    unusedVariables.length +
    deprecatedAPIs.length;

  const passed = totalIssues === 0;

  const summary = passed
    ? 'Zero-warning policy (STRICT): PASSED - No warnings found'
    : `Zero-warning policy (STRICT): FAILED - ${totalIssues} issues found (${buildWarnings.length} build, ${lintWarnings.length} lint, ${typescriptWarnings.length} TypeScript, ${unusedVariables.length} unused vars, ${deprecatedAPIs.length} deprecated APIs)`;

  return {
    passed,
    buildWarnings,
    lintWarnings,
    typescriptWarnings,
    unusedVariables,
    deprecatedAPIs,
    totalIssues,
    summary,
  };
}

/**
 * Generate detailed report for zero-warning policy results
 */
export function generateZeroWarningReport(
  result: ZeroWarningPolicyResult
): string {
  const sections: string[] = [];

  sections.push('# Zero-Warning Policy Report\n');
  sections.push(
    `**Overall Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`
  );
  sections.push(`**Total Issues**: ${result.totalIssues}\n`);
  sections.push(`**Summary**: ${result.summary}\n`);

  if (result.buildWarnings.length > 0) {
    sections.push('## Build Warnings\n');
    result.buildWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.lintWarnings.length > 0) {
    sections.push('## Lint Warnings\n');
    result.lintWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.typescriptWarnings.length > 0) {
    sections.push('## TypeScript Warnings\n');
    result.typescriptWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.unusedVariables.length > 0) {
    sections.push('## Unused Variables\n');
    result.unusedVariables.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.deprecatedAPIs.length > 0) {
    sections.push('## Deprecated API Usage\n');
    result.deprecatedAPIs.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.passed) {
    sections.push(
      '✅ **All checks passed (STRICT MODE)** - Zero warnings detected\n'
    );
  } else {
    sections.push(
      '❌ **STRICT MODE VIOLATION** - ALL warnings must be fixed before proceeding\n'
    );
    sections.push(
      '**GSR-QA-STRICT-001**: Zero-tolerance QA policy enforced - no whitelisting allowed\n'
    );
  }

  return sections.join('\n');
}
