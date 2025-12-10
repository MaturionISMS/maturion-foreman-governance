/**
 * QIEL Environment Alignment Tests
 * 
 * Validates that QIEL configuration is unified and environments are aligned.
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { QIEL_CONFIG, validateGitHubWorkflowAlignment } from '../../lib/foreman/qiel-config';
import * as fs from 'fs';
import * as path from 'path';

describe('QIEL Environment Alignment', () => {
  it('should have a valid configuration version', () => {
    assert.ok(QIEL_CONFIG.version, 'Config version should exist');
    assert.match(QIEL_CONFIG.version, /^\d+\.\d+\.\d+$/, 'Config version should follow semver');
  });

  it('should define Node version', () => {
    assert.ok(QIEL_CONFIG.nodeVersion, 'Node version should be defined');
    assert.strictEqual(typeof QIEL_CONFIG.nodeVersion, 'string');
    assert.ok(parseInt(QIEL_CONFIG.nodeVersion) >= 18, 'Node version should be 18 or higher');
  });

  it('should define all required log paths', () => {
    assert.ok(QIEL_CONFIG.logPaths.build, 'Build log path should be defined');
    assert.ok(QIEL_CONFIG.logPaths.lint, 'Lint log path should be defined');
    assert.ok(QIEL_CONFIG.logPaths.test, 'Test log path should be defined');
    
    // All log paths should be in /tmp
    assert.match(QIEL_CONFIG.logPaths.build, /^\/tmp\//, 'Build log should be in /tmp');
    assert.match(QIEL_CONFIG.logPaths.lint, /^\/tmp\//, 'Lint log should be in /tmp');
    assert.match(QIEL_CONFIG.logPaths.test, /^\/tmp\//, 'Test log should be in /tmp');
  });

  it('should block on critical issues', () => {
    assert.strictEqual(
      QIEL_CONFIG.qiw.blockOnCritical,
      true,
      'Should block on critical issues'
    );
    assert.strictEqual(
      QIEL_CONFIG.drift.blockOnCritical,
      true,
      'Drift monitor should block on critical issues'
    );
  });

  it('should block on errors', () => {
    assert.strictEqual(
      QIEL_CONFIG.qiw.blockOnErrors,
      true,
      'Should block on errors'
    );
  });
});
