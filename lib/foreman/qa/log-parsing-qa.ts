/**
 * Log Parsing QA
 * 
 * Parses build, lint, and test logs to detect errors, warnings, and failures
 * that may have been missed by exit codes alone.
 * 
 * Implements the Quality Integrity Contract requirement that ALL logs
 * must be parsed and validated for error patterns.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface LogParsingResult {
  logFile: string;
  exists: boolean;
  parsed: boolean;
  errors: ErrorEntry[];
  warnings: WarningEntry[];
  passed: boolean;
  summary: string;
}

export interface ErrorEntry {
  line: number;
  message: string;
  pattern: string;
  context?: string;
}

export interface WarningEntry {
  line: number;
  message: string;
  pattern: string;
  context?: string;
}

/**
 * Error patterns that indicate failures
 * Based on Quality Integrity Contract
 */
const ERROR_PATTERNS = [
  /\bERR\b/i,
  /\bERROR\b/i,
  /\bError:/,
  /TypeError:/,
  /ReferenceError:/,
  /SyntaxError:/,
  /RangeError:/,
  /Build failed/i,
  /Compilation error/i,
  /Failed to compile/i,
  /\bFAIL\b/,
  /\bfailed\b/,
  /✖/,
  /error TS\d{4}:/, // TypeScript error codes (more specific)
];

/**
 * Warning patterns that should be caught
 * Based on Zero-Warning Policy
 */
const WARNING_PATTERNS = [
  /\bWARN\b/i,
  /\bWarning:/,
  /⚠/,
  /warning\s+TS\d{4}:/, // TypeScript warnings
];

/**
 * Parse a log file for errors and warnings
 */
export function parseLogFile(
  logFilePath: string,
  logType: 'build' | 'lint' | 'test'
): LogParsingResult {
  const result: LogParsingResult = {
    logFile: logFilePath,
    exists: false,
    parsed: false,
    errors: [],
    warnings: [],
    passed: false,
    summary: '',
  };

  // Check if log file exists
  if (!fs.existsSync(logFilePath)) {
    result.summary = `Log file not found: ${logFilePath}`;
    return result;
  }

  result.exists = true;

  try {
    const content = fs.readFileSync(logFilePath, 'utf-8');
    const lines = content.split('\n');

    // Parse each line for errors and warnings
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();
      
      // Skip test framework metadata lines (comments, TAP output, etc.)
      if (logType === 'test') {
        // Skip TAP format lines and test framework metadata
        if (
          trimmedLine.startsWith('#') ||           // Comments
          trimmedLine.startsWith('ok ') ||         // Passing tests
          trimmedLine.startsWith('not ok') ||      // Failing tests (handled by TAP)
          /^\d+\.\.\d+$/.test(trimmedLine) ||      // TAP plan
          /^duration_ms:/.test(trimmedLine) ||     // Test metadata
          /^location:/.test(trimmedLine) ||        // Test metadata
          /^failureType:/.test(trimmedLine) ||     // Test metadata
          /^stack:/.test(trimmedLine) ||           // Stack traces (metadata)
          /^operator:/.test(trimmedLine) ||        // Assertion metadata
          /^code:/.test(trimmedLine) ||            // Error codes (metadata)
          /^name:/.test(trimmedLine) ||            // Error names (metadata)
          /^error:/.test(trimmedLine) ||           // Error field (metadata)
          /^type:/.test(trimmedLine) ||            // Type field (metadata)
          /^Subtest:/.test(trimmedLine)            // Subtest names
        ) {
          return; // Skip this line
        }
      }

      // Check for errors
      for (const pattern of ERROR_PATTERNS) {
        if (pattern.test(line)) {
          result.errors.push({
            line: lineNumber,
            message: line.trim(),
            pattern: pattern.source,
            context: getContext(lines, index),
          });
          break; // Only match first pattern per line
        }
      }

      // Check for warnings
      for (const pattern of WARNING_PATTERNS) {
        if (pattern.test(line)) {
          const warning: WarningEntry = {
            line: lineNumber,
            message: line.trim(),
            pattern: pattern.source,
            context: getContext(lines, index),
          };

          result.warnings.push(warning);
          break; // Only match first pattern per line
        }
      }
    });

    result.parsed = true;

    // Determine pass/fail status - STRICT MODE: zero tolerance for errors AND warnings
    result.passed = result.errors.length === 0 && result.warnings.length === 0;

    // Generate summary
    if (result.passed) {
      result.summary = `${logType} log parsed: 0 errors, 0 warnings`;
    } else {
      const issues: string[] = [];
      if (result.errors.length > 0) {
        issues.push(`${result.errors.length} errors`);
      }
      if (result.warnings.length > 0) {
        issues.push(`${result.warnings.length} warnings`);
      }
      result.summary = `${logType} log FAILED: ${issues.join(', ')}`;
    }
  } catch (error) {
    result.summary = `Failed to parse ${logType} log: ${error}`;
    result.passed = false;
  }

  return result;
}

/**
 * Get context lines around an error/warning
 */
function getContext(lines: string[], index: number): string {
  const contextLines = 2;
  const start = Math.max(0, index - contextLines);
  const end = Math.min(lines.length, index + contextLines + 1);
  return lines.slice(start, end).join('\n');
}

/**
 * Parse all standard log files (build, lint, test)
 */
export function parseAllLogs(
  logsDir: string = '/tmp'
): {
  build: LogParsingResult;
  lint: LogParsingResult;
  test: LogParsingResult;
  allPassed: boolean;
  summary: string;
} {
  const buildLog = parseLogFile(path.join(logsDir, 'build.log'), 'build');
  const lintLog = parseLogFile(path.join(logsDir, 'lint.log'), 'lint');
  const testLog = parseLogFile(path.join(logsDir, 'test.log'), 'test');

  const allPassed = buildLog.passed && lintLog.passed && testLog.passed;

  const summaries: string[] = [];
  if (!buildLog.passed) summaries.push(`Build: ${buildLog.summary}`);
  if (!lintLog.passed) summaries.push(`Lint: ${lintLog.summary}`);
  if (!testLog.passed) summaries.push(`Test: ${testLog.summary}`);

  const summary = allPassed
    ? 'All logs parsed successfully with no errors or unwhitelisted warnings'
    : `Log parsing FAILED: ${summaries.join('; ')}`;

  return {
    build: buildLog,
    lint: lintLog,
    test: testLog,
    allPassed,
    summary,
  };
}

/**
 * Validate that required logs exist
 */
export function validateLogsExist(
  logsDir: string = '/tmp'
): {
  allExist: boolean;
  missing: string[];
} {
  const requiredLogs = ['build.log', 'lint.log', 'test.log'];
  const missing: string[] = [];

  for (const logFile of requiredLogs) {
    const logPath = path.join(logsDir, logFile);
    if (!fs.existsSync(logPath)) {
      missing.push(logFile);
    }
  }

  return {
    allExist: missing.length === 0,
    missing,
  };
}

/**
 * Generate detailed QA report from log parsing results
 */
export function generateLogParsingReport(results: {
  build: LogParsingResult;
  lint: LogParsingResult;
  test: LogParsingResult;
  allPassed: boolean;
  summary: string;
}): string {
  const sections: string[] = [];

  sections.push('# Log Parsing QA Report\n');
  sections.push(`**Overall Status**: ${results.allPassed ? '✅ PASSED' : '❌ FAILED'}\n`);
  sections.push(`**Summary**: ${results.summary}\n`);

  // Build log report
  sections.push('## Build Log\n');
  sections.push(`- **File**: ${results.build.logFile}`);
  sections.push(`- **Exists**: ${results.build.exists ? 'Yes' : 'No'}`);
  sections.push(`- **Parsed**: ${results.build.parsed ? 'Yes' : 'No'}`);
  sections.push(`- **Errors**: ${results.build.errors.length}`);
  sections.push(`- **Warnings**: ${results.build.warnings.length}`);
  sections.push(`- **Status**: ${results.build.passed ? '✅ PASSED' : '❌ FAILED'}\n`);

  if (results.build.errors.length > 0) {
    sections.push('### Build Errors\n');
    results.build.errors.forEach(err => {
      sections.push(`- Line ${err.line}: ${err.message}`);
    });
    sections.push('');
  }

  if (results.build.warnings.length > 0) {
    sections.push('### Build Warnings\n');
    results.build.warnings.forEach(warn => {
      sections.push(`- Line ${warn.line}: ${warn.message}`);
    });
    sections.push('');
  }

  // Lint log report
  sections.push('## Lint Log\n');
  sections.push(`- **File**: ${results.lint.logFile}`);
  sections.push(`- **Exists**: ${results.lint.exists ? 'Yes' : 'No'}`);
  sections.push(`- **Parsed**: ${results.lint.parsed ? 'Yes' : 'No'}`);
  sections.push(`- **Errors**: ${results.lint.errors.length}`);
  sections.push(`- **Warnings**: ${results.lint.warnings.length}`);
  sections.push(`- **Status**: ${results.lint.passed ? '✅ PASSED' : '❌ FAILED'}\n`);

  if (results.lint.errors.length > 0) {
    sections.push('### Lint Errors\n');
    results.lint.errors.forEach(err => {
      sections.push(`- Line ${err.line}: ${err.message}`);
    });
    sections.push('');
  }

  if (results.lint.warnings.length > 0) {
    sections.push('### Lint Warnings\n');
    results.lint.warnings.forEach(warn => {
      sections.push(`- Line ${warn.line}: ${warn.message}`);
    });
    sections.push('');
  }

  // Test log report
  sections.push('## Test Log\n');
  sections.push(`- **File**: ${results.test.logFile}`);
  sections.push(`- **Exists**: ${results.test.exists ? 'Yes' : 'No'}`);
  sections.push(`- **Parsed**: ${results.test.parsed ? 'Yes' : 'No'}`);
  sections.push(`- **Errors**: ${results.test.errors.length}`);
  sections.push(`- **Warnings**: ${results.test.warnings.length}`);
  sections.push(`- **Status**: ${results.test.passed ? '✅ PASSED' : '❌ FAILED'}\n`);

  if (results.test.errors.length > 0) {
    sections.push('### Test Errors\n');
    results.test.errors.forEach(err => {
      sections.push(`- Line ${err.line}: ${err.message}`);
    });
    sections.push('');
  }

  if (results.test.warnings.length > 0) {
    sections.push('### Test Warnings\n');
    results.test.warnings.forEach(warn => {
      sections.push(`- Line ${warn.line}: ${warn.message}`);
    });
    sections.push('');
  }

  return sections.join('\n');
}
