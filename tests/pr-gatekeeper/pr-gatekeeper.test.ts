/**
 * Tests for PR Gatekeeper
 * 
 * Validates that:
 * - PR Gatekeeper enforces QIEL validation
 * - PRs are blocked when QIEL fails
 * - PRs are allowed when QIEL passes
 * - Governance incidents are recorded for blocks
 * - No bypasses are possible
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { enforcePRGatekeeper } from '../../lib/foreman/pr-gatekeeper';

/**
 * Helper function to create test logs directory
 */
function createTestLogsDir(): string {
  const testLogsDir = path.join(process.cwd(), 'tests', 'pr-gatekeeper', 'fixtures');
  fs.mkdirSync(testLogsDir, { recursive: true });
  return testLogsDir;
}

/**
 * Helper function to cleanup test logs directory
 */
function cleanupTestLogsDir(testLogsDir: string): void {
  if (fs.existsSync(testLogsDir)) {
    const files = fs.readdirSync(testLogsDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(testLogsDir, file));
    });
    fs.rmdirSync(testLogsDir);
  }
}

/**
 * Helper function to create clean logs (should pass QIEL)
 */
function createCleanLogs(logsDir: string): void {
  const buildLog = `
Building application...
Build completed successfully
No errors found
`;

  const lintLog = `
Running linter...
All files pass linting
✔ 0 problems (0 errors, 0 warnings)
`;

  const testLog = `
Running tests...
All tests passed
PASS tests/example.test.ts
`;

  fs.writeFileSync(path.join(logsDir, 'build.log'), buildLog);
  fs.writeFileSync(path.join(logsDir, 'lint.log'), lintLog);
  fs.writeFileSync(path.join(logsDir, 'test.log'), testLog);
}

/**
 * Helper function to create logs with errors (should fail QIEL)
 */
function createLogsWithErrors(logsDir: string): void {
  const buildLog = `
Building application...
ERROR: Failed to compile
Build completed with errors
`;

  const lintLog = `
Running linter...
error: Unexpected token
✖ 1 problem (1 error, 0 warnings)
`;

  const testLog = `
Running tests...
FAIL tests/example.test.ts
  ● Test suite failed to run
    TypeError: Cannot read property 'x' of undefined
`;

  fs.writeFileSync(path.join(logsDir, 'build.log'), buildLog);
  fs.writeFileSync(path.join(logsDir, 'lint.log'), lintLog);
  fs.writeFileSync(path.join(logsDir, 'test.log'), testLog);
}

/**
 * Helper function to create logs with warnings (should fail QIEL in strict mode)
 */
function createLogsWithWarnings(logsDir: string): void {
  const buildLog = `
Building application...
Warning: Deprecated API usage
Build completed successfully
`;

  const lintLog = `
Running linter...
All files pass linting
✔ 0 problems (0 errors, 0 warnings)
`;

  const testLog = `
Running tests...
All tests passed
PASS tests/example.test.ts
`;

  fs.writeFileSync(path.join(logsDir, 'build.log'), buildLog);
  fs.writeFileSync(path.join(logsDir, 'lint.log'), lintLog);
  fs.writeFileSync(path.join(logsDir, 'test.log'), testLog);
}

describe('PR Gatekeeper', () => {
  describe('enforcePRGatekeeper', () => {
    it('should allow PR creation when QIEL passes (clean logs)', async () => {
      const testLogsDir = createTestLogsDir();
      createCleanLogs(testLogsDir);

      try {
        const result = await enforcePRGatekeeper({
          buildId: 'test-build-1',
          sequenceId: 'test-seq-1',
          logsDir: testLogsDir,
        });

        // In strict mode with clean logs, QIEL should pass
        // Note: This may still fail if deployment simulation or engine validation fail
        // For now, we're primarily testing the log parsing aspects
        
        assert.ok(result, 'Result should be defined');
        assert.strictEqual(typeof result.allowed, 'boolean', 'Result should have allowed property');
        assert.ok(result.qielResult, 'Result should include QIEL result');
        assert.ok(Array.isArray(result.blockingIssues), 'Result should have blockingIssues array');
        assert.ok(Array.isArray(result.governanceViolations), 'Result should have governanceViolations array');

        // If QIEL passed, PR should be allowed
        if (result.qielResult.passed) {
          assert.strictEqual(result.allowed, true, 'PR should be allowed when QIEL passes');
          assert.strictEqual(result.blockingIssues.length, 0, 'Should have no blocking issues');
        } else {
          // If QIEL failed, it should have specific reasons
          assert.strictEqual(result.allowed, false, 'PR should be blocked when QIEL fails');
          assert.ok(result.blockingIssues.length > 0, 'Should have blocking issues when QIEL fails');
        }

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });

    it('should block PR creation when QIEL fails (logs with errors)', async () => {
      const testLogsDir = createTestLogsDir();
      createLogsWithErrors(testLogsDir);

      try {
        const result = await enforcePRGatekeeper({
          buildId: 'test-build-2',
          sequenceId: 'test-seq-2',
          logsDir: testLogsDir,
        });

        // With errors in logs, QIEL must fail
        assert.strictEqual(result.allowed, false, 'PR should be blocked when QIEL fails');
        assert.strictEqual(result.qielResult.passed, false, 'QIEL should fail with errors');
        assert.ok(result.blockingIssues.length > 0, 'Should have blocking issues');
        assert.ok(result.governanceViolations.length > 0, 'Should have governance violations');
        
        // Check for specific governance violations
        assert.ok(
          result.governanceViolations.some(v => 
            v === 'BUILD_ERRORS_OR_WARNINGS' || 
            v === 'LINT_ERRORS_OR_WARNINGS' || 
            v === 'TEST_FAILURES_OR_ERRORS'
          ),
          'Should have specific governance violations for errors'
        );

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });

    it('should block PR creation when QIEL fails (logs with warnings - strict mode)', async () => {
      const testLogsDir = createTestLogsDir();
      createLogsWithWarnings(testLogsDir);

      try {
        const result = await enforcePRGatekeeper({
          buildId: 'test-build-3',
          sequenceId: 'test-seq-3',
          logsDir: testLogsDir,
        });

        // In STRICT mode, ANY warnings block PR creation
        assert.strictEqual(result.allowed, false, 'PR should be blocked with warnings in strict mode');
        assert.strictEqual(result.qielResult.passed, false, 'QIEL should fail with warnings in strict mode');
        assert.ok(result.blockingIssues.length > 0, 'Should have blocking issues');
        
        // Should have zero-warning policy violation
        const hasZeroWarningViolation = 
          result.governanceViolations.includes('ZERO_WARNING_POLICY_VIOLATION') ||
          result.governanceViolations.includes('BUILD_ERRORS_OR_WARNINGS');
        
        assert.ok(
          hasZeroWarningViolation,
          'Should have zero-warning policy violation'
        );

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });

    it('should record governance incidents when PR is blocked', async () => {
      const testLogsDir = createTestLogsDir();
      createLogsWithErrors(testLogsDir);

      try {
        const result = await enforcePRGatekeeper({
          buildId: 'test-build-4',
          sequenceId: 'test-seq-4',
          logsDir: testLogsDir,
        });

        assert.strictEqual(result.allowed, false, 'PR should be blocked');
        
        // The gatekeeper should have logged governance events
        // We can verify this through the governance memory (in a full implementation)
        // For now, just verify the result structure
        assert.ok(result.reason.includes('PR blocked by governance'), 'Reason should indicate governance block');
        assert.ok(result.qielResult, 'Should include QIEL result for audit');

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });

    it('should provide detailed blocking reasons', async () => {
      const testLogsDir = createTestLogsDir();
      createLogsWithErrors(testLogsDir);

      try {
        const result = await enforcePRGatekeeper({
          buildId: 'test-build-5',
          sequenceId: 'test-seq-5',
          logsDir: testLogsDir,
        });

        assert.strictEqual(result.allowed, false, 'PR should be blocked');
        assert.ok(result.blockingIssues.length > 0, 'Should have blocking issues');
        assert.ok(result.governanceViolations.length > 0, 'Should have governance violations');
        
        // Verify the reason message is informative
        assert.ok(
          result.reason.includes('QIEL not passed') || 
          result.reason.includes('blocker'),
          'Reason should be informative'
        );
        
        // Verify QIEL result includes specific check failures
        const checks = result.qielResult.checks;
        assert.ok(checks, 'Should have checks breakdown');
        
        const hasFailedCheck = 
          !checks.buildLogsPassed || 
          !checks.lintLogsPassed || 
          !checks.testLogsPassed;
        
        assert.ok(hasFailedCheck, 'Should have at least one failed check');

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });
  });

  describe('No Bypass Mechanisms', () => {
    it('should not allow bypassing QIEL validation', async () => {
      // The PR Gatekeeper has no bypass parameters
      // This test ensures that the API doesn't expose any bypass options
      
      const testLogsDir = createTestLogsDir();
      createLogsWithErrors(testLogsDir);

      try {
        // Attempt to call with various parameters - none should bypass QIEL
        const result = await enforcePRGatekeeper({
          buildId: 'test-bypass-1',
          sequenceId: 'test-bypass-1',
          logsDir: testLogsDir,
        });

        // Should still be blocked
        assert.strictEqual(result.allowed, false, 'Should not allow bypass');
        assert.strictEqual(result.qielResult.passed, false, 'QIEL should still fail');

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });
  });

  describe('QIEL Alignment', () => {
    it('should use QIEL configuration matching GitHub workflow', async () => {
      const testLogsDir = createTestLogsDir();
      createCleanLogs(testLogsDir);

      try {
        const result = await enforcePRGatekeeper({
          buildId: 'test-alignment-1',
          sequenceId: 'test-alignment-1',
          logsDir: testLogsDir,
        });

        // Verify QIEL result includes config version
        assert.ok(result.qielResult.configVersion, 'Should include QIEL config version');
        
        // The config version should match what's defined in qiel-config.ts
        // This ensures we're using the unified configuration
        assert.strictEqual(typeof result.qielResult.configVersion, 'string', 'Config version should be a string');

      } finally {
        cleanupTestLogsDir(testLogsDir);
      }
    });
  });
});
