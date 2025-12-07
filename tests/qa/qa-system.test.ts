/**
 * Tests for Enhanced QA System
 * 
 * Validates:
 * - Log parsing detects errors and warnings
 * - Zero-warning policy enforcement
 * - Error pattern matching
 * - Whitelist functionality
 */

import { describe, it, after } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { parseLogFile, parseAllLogs, validateLogsExist } from '../../lib/foreman/qa/log-parsing-qa';
import { runZeroWarningPolicy } from '../../lib/foreman/qa/zero-warning-policy';

describe('Log Parsing QA', () => {
  const testLogsDir = path.join(process.cwd(), 'tests', 'qa', 'fixtures');

  it('should detect build errors in log file', () => {
    // Create test log with errors
    const testLog = `
Building application...
ERROR: Failed to compile
Build completed with errors
`;
    const logPath = path.join(testLogsDir, 'test-build-error.log');
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(logPath, testLog);

    const result = parseLogFile(logPath, 'build');
    
    assert.strictEqual(result.exists, true, 'Log file should exist');
    assert.strictEqual(result.parsed, true, 'Log should be parsed');
    assert.ok(result.errors.length > 0, 'Should detect errors');
    assert.strictEqual(result.passed, false, 'Should fail with errors');

    // Cleanup
    fs.unlinkSync(logPath);
  });

  it('should detect lint errors in log file', () => {
    const testLog = `
Running linter...
error: Unexpected token
✖ 1 problem (1 error, 0 warnings)
`;
    const logPath = path.join(testLogsDir, 'test-lint-error.log');
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(logPath, testLog);

    const result = parseLogFile(logPath, 'lint');
    
    assert.strictEqual(result.exists, true);
    assert.ok(result.errors.length > 0, 'Should detect lint errors');
    assert.strictEqual(result.passed, false);

    fs.unlinkSync(logPath);
  });

  it('should detect warnings and check whitelist', () => {
    const testLog = `
Building...
Warning: This is a test warning
Build completed
`;
    const logPath = path.join(testLogsDir, 'test-warnings.log');
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(logPath, testLog);

    const result = parseLogFile(logPath, 'build');
    
    assert.strictEqual(result.exists, true);
    assert.ok(result.warnings.length > 0, 'Should detect warnings');
    assert.ok(result.unwhitelistedWarnings.length > 0, 'Warning should not be whitelisted');
    assert.strictEqual(result.passed, false, 'Should fail with unwhitelisted warnings');

    fs.unlinkSync(logPath);
  });

  it('should pass with whitelisted warnings', () => {
    const testLog = `
Building...
Schema not found: /home/runner/work/maturion-foreman-app/maturion-foreman-app/memory/schemas/historical-issues-schema.json
Build completed
`;
    const logPath = path.join(testLogsDir, 'test-whitelisted.log');
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(logPath, testLog);

    const result = parseLogFile(logPath, 'build');
    
    assert.strictEqual(result.exists, true);
    // This warning is in the whitelist, so it should be filtered out
    assert.strictEqual(result.unwhitelistedWarnings.length, 0, 'Whitelisted warning should be filtered');
    assert.strictEqual(result.passed, true, 'Should pass with only whitelisted warnings');

    fs.unlinkSync(logPath);
  });

  it('should handle missing log files', () => {
    const nonExistentPath = path.join(testLogsDir, 'nonexistent.log');
    const result = parseLogFile(nonExistentPath, 'build');
    
    assert.strictEqual(result.exists, false, 'Should detect missing log');
    assert.strictEqual(result.parsed, false, 'Should not parse missing log');
    assert.strictEqual(result.passed, false, 'Should fail for missing log');
  });

  it('should validate logs exist check', () => {
    const validation = validateLogsExist(testLogsDir);
    
    assert.strictEqual(validation.allExist, false, 'Required logs should not exist in test dir');
    assert.ok(validation.missing.length > 0, 'Should list missing logs');
  });

  it('should detect TypeScript errors', () => {
    const testLog = `
Compiling...
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
`;
    const logPath = path.join(testLogsDir, 'test-ts-error.log');
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(logPath, testLog);

    const result = parseLogFile(logPath, 'build');
    
    assert.strictEqual(result.exists, true);
    assert.ok(result.errors.length > 0, 'Should detect TypeScript errors');
    
    // Check that the error message contains TS error code
    const tsError = result.errors.find(e => e.message.includes('TS2345'));
    assert.ok(tsError, 'Should capture TS error code');

    fs.unlinkSync(logPath);
  });

  it('should detect runtime errors in test logs', () => {
    const testLog = `
Running tests...
TypeError: Cannot read property 'x' of undefined
ReferenceError: foo is not defined
`;
    const logPath = path.join(testLogsDir, 'test-runtime-error.log');
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(logPath, testLog);

    const result = parseLogFile(logPath, 'test');
    
    assert.strictEqual(result.exists, true);
    assert.ok(result.errors.length >= 2, 'Should detect runtime errors');
    
    // Should detect both TypeError and ReferenceError
    const hasTypeError = result.errors.some(e => e.message.includes('TypeError'));
    const hasRefError = result.errors.some(e => e.message.includes('ReferenceError'));
    assert.ok(hasTypeError, 'Should detect TypeError');
    assert.ok(hasRefError, 'Should detect ReferenceError');

    fs.unlinkSync(logPath);
  });

  after(() => {
    const testLogsDir = path.join(process.cwd(), 'tests', 'qa', 'fixtures');
    if (fs.existsSync(testLogsDir)) {
      const files = fs.readdirSync(testLogsDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(testLogsDir, file));
      });
      fs.rmdirSync(testLogsDir);
    }
  });
});

describe('Zero-Warning Policy', () => {
  const testLogsDir = path.join(process.cwd(), 'tests', 'qa', 'fixtures');

  it('should detect build warnings', () => {
    const buildLog = `
Building...
Warning: Unused variable 'x'
webpack compiled with 1 warning
`;
    const buildPath = path.join(testLogsDir, 'build.log');
    const lintPath = path.join(testLogsDir, 'lint.log');
    const testPath = path.join(testLogsDir, 'test.log');
    
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(buildPath, buildLog);
    fs.writeFileSync(lintPath, '');
    fs.writeFileSync(testPath, '');

    const result = runZeroWarningPolicy(testLogsDir);
    
    assert.ok(result.buildWarnings.length > 0, 'Should detect build warnings');
    assert.strictEqual(result.passed, false, 'Should fail with warnings');

    // Cleanup
    fs.unlinkSync(buildPath);
    fs.unlinkSync(lintPath);
    fs.unlinkSync(testPath);
  });

  it('should pass with no warnings', () => {
    const buildLog = 'Build completed successfully\n';
    const lintLog = 'Linting passed\n';
    const testLog = 'All tests passed\n';
    
    const buildPath = path.join(testLogsDir, 'build.log');
    const lintPath = path.join(testLogsDir, 'lint.log');
    const testPath = path.join(testLogsDir, 'test.log');
    
    fs.mkdirSync(testLogsDir, { recursive: true });
    fs.writeFileSync(buildPath, buildLog);
    fs.writeFileSync(lintPath, lintLog);
    fs.writeFileSync(testPath, testLog);

    const result = runZeroWarningPolicy(testLogsDir);
    
    assert.strictEqual(result.totalIssues, 0, 'Should have no issues');
    assert.strictEqual(result.passed, true, 'Should pass with no warnings');

    // Cleanup
    fs.unlinkSync(buildPath);
    fs.unlinkSync(lintPath);
    fs.unlinkSync(testPath);
  });

  after(() => {
    const testLogsDir = path.join(process.cwd(), 'tests', 'qa', 'fixtures');
    if (fs.existsSync(testLogsDir)) {
      const files = fs.readdirSync(testLogsDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(testLogsDir, file));
      });
      fs.rmdirSync(testLogsDir);
    }
  });
});
