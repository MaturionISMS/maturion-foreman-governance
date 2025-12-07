/**
 * Auto-generated regression test
 * Prevents recurrence of: LintError
 * Original error: Lint error detected: error: Unexpected token
 * Source: lint.log:1
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Regression: LintError', () => {
  it('should-not-have-lint-in-lint-log-1', () => {
    // Check that lint log doesn't contain the error pattern
    const lintLogPath = path.join('/tmp', 'lint.log');
    
    if (!fs.existsSync(lintLogPath)) {
      // If no lint log, skip test
      return;
    }
    
    const lintLog = fs.readFileSync(lintLogPath, 'utf-8');
    
    // Pattern that should NOT appear in lint log
    const errorPattern = /Lint.*error.*detected.*error.*Unexpected/i;
    
    assert.ok(
      !errorPattern.test(lintLog),
      `Lint log should not contain LintError: Lint error detected: error: Unexpected token`
    );
  });
});
