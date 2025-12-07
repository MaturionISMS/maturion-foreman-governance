/**
 * Auto-generated regression test
 * Prevents recurrence of: BuildError
 * Original error: Build error detected: Error: ENOENT: no such file or directory, open '/home/runner/work/maturion-foreman-app/maturion-foreman-app/.next/server/pages-manifest.json'
 * Source: build.log:13
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Regression: BuildError', () => {
  it('should-not-have-build-in-build-log-13', () => {
    // Check that build log doesn't contain the error pattern
    const buildLogPath = path.join('/tmp', 'build.log');
    
    if (!fs.existsSync(buildLogPath)) {
      // If no build log, skip test
      return;
    }
    
    const buildLog = fs.readFileSync(buildLogPath, 'utf-8');
    
    // Pattern that should NOT appear in build log
    const errorPattern = /Build.*error.*detected.*Error.*ENOENT/i;
    
    assert.ok(
      !errorPattern.test(buildLog),
      `Build log should not contain BuildError: Build error detected: Error: ENOENT: no such file or directory, open '/home/runner/work/maturion-foreman-app/maturion-foreman-app/.next/server/pages-manifest.json'`
    );
  });
});
