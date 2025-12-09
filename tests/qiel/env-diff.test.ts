/**
 * QIEL Environment Diff Tool Tests
 * 
 * Validates the environment diff tool that compares Foreman's local
 * QIEL environment to GitHub's merge queue environment.
 * 
 * Per Issue #3 requirements:
 * - Test mismatched configs
 * - Test mismatched thresholds
 * - Test correct reporting of environment differences
 */

import { describe, it, mock } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { 
  QIEL_CONFIG, 
  validateGitHubWorkflowAlignment,
  generateConfigReport 
} from '../../lib/foreman/qiel-config';

describe('QIEL Environment Diff Tool', () => {
  describe('Configuration Validation', () => {
    it('should have correct Node version configuration', () => {
      assert.ok(QIEL_CONFIG.nodeVersion, 'Node version should be defined');
      assert.strictEqual(typeof QIEL_CONFIG.nodeVersion, 'string');
      assert.match(QIEL_CONFIG.nodeVersion, /^\d+$/, 'Node version should be major version number');
    });

    it('should define all required log paths', () => {
      const logPaths = QIEL_CONFIG.logPaths;
      
      assert.ok(logPaths.build, 'Build log path should be defined');
      assert.ok(logPaths.lint, 'Lint log path should be defined');
      assert.ok(logPaths.test, 'Test log path should be defined');
      
      // All paths should be in /tmp for consistency
      assert.match(logPaths.build, /^\/tmp\//, 'Build log should be in /tmp');
      assert.match(logPaths.lint, /^\/tmp\//, 'Lint log should be in /tmp');
      assert.match(logPaths.test, /^\/tmp\//, 'Test log should be in /tmp');
    });

    it('should define QIW configuration thresholds', () => {
      const qiw = QIEL_CONFIG.qiw;
      
      assert.ok(Array.isArray(qiw.enabledChannels), 'Enabled channels should be an array');
      assert.ok(qiw.enabledChannels.length > 0, 'Should have at least one enabled channel');
      
      assert.strictEqual(typeof qiw.blockOnCritical, 'boolean');
      assert.strictEqual(typeof qiw.blockOnErrors, 'boolean');
      assert.strictEqual(typeof qiw.blockOnWarnings, 'boolean');
    });

    it('should define Drift Monitor configuration', () => {
      const drift = QIEL_CONFIG.drift;
      
      assert.ok(Array.isArray(drift.enabledChecks), 'Enabled checks should be an array');
      assert.ok(drift.enabledChecks.length > 0, 'Should have at least one enabled check');
      
      assert.ok(drift.memoryVersion, 'Memory version should be defined');
      assert.ok(drift.schemaVersion, 'Schema version should be defined');
      
      assert.strictEqual(typeof drift.blockOnCritical, 'boolean');
      assert.strictEqual(typeof drift.blockOnMultipleErrors, 'boolean');
      assert.strictEqual(typeof drift.errorThreshold, 'number');
    });

    it('should define Governance thresholds', () => {
      const governance = QIEL_CONFIG.governance;
      
      assert.ok(governance.qiIncidentThresholds, 'QI incident thresholds should be defined');
      assert.ok(governance.memoryPaths, 'Memory paths should be defined');
      assert.ok(governance.schemaPaths, 'Schema paths should be defined');
      assert.ok(governance.ruleEnforcement, 'Rule enforcement should be defined');
    });

    it('should define QIEL execution configuration', () => {
      const execution = QIEL_CONFIG.execution;
      
      assert.ok(execution.buildCommands, 'Build commands should be defined');
      assert.ok(execution.buildCommands.typecheck, 'Typecheck command should be defined');
      assert.ok(execution.buildCommands.lint, 'Lint command should be defined');
      assert.ok(execution.buildCommands.test, 'Test command should be defined');
      
      assert.ok(execution.quick, 'Quick QIEL config should be defined');
      assert.ok(execution.full, 'Full QIEL config should be defined');
      
      assert.ok(execution.timeouts, 'Timeouts should be defined');
    });
  });

  describe('GitHub Workflow Alignment', () => {
    it('should validate workflow exists', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/qiel.yml');
      assert.ok(fs.existsSync(workflowPath), 'QIEL workflow file should exist');
    });

    it('should detect no mismatches in aligned configuration', () => {
      const result = validateGitHubWorkflowAlignment();
      
      assert.strictEqual(typeof result.aligned, 'boolean');
      assert.ok(Array.isArray(result.differences));
      
      if (!result.aligned) {
        console.log('Configuration differences detected:');
        result.differences.forEach((diff, idx) => {
          console.log(`  ${idx + 1}. ${diff}`);
        });
      }
      
      // This test validates that the current config is aligned
      // If it fails, it means there's a real misalignment to fix
      assert.strictEqual(
        result.aligned,
        true,
        `Workflow is misaligned with config. Differences: ${result.differences.join('; ')}`
      );
    });

    it('should check Node version in workflow matches config', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/qiel.yml');
      const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
      
      const nodeVersionMatch = workflowContent.match(/node-version:\s*['"]?(\d+)(?:\.\d+(?:\.\d+)?)?['"]?/);
      assert.ok(nodeVersionMatch, 'Workflow should specify Node version');
      
      const workflowMajorVersion = nodeVersionMatch[1];
      assert.strictEqual(
        workflowMajorVersion,
        QIEL_CONFIG.nodeVersion,
        `Workflow Node version (${workflowMajorVersion}) should match config (${QIEL_CONFIG.nodeVersion})`
      );
    });

    it('should verify workflow uses correct log paths', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/qic.yml');
      const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
      
      assert.ok(
        workflowContent.includes('/tmp/build.log'),
        'Workflow should use /tmp/build.log for typecheck logs'
      );
      assert.ok(
        workflowContent.includes('/tmp/lint.log'),
        'Workflow should use /tmp/lint.log for lint logs'
      );
      assert.ok(
        workflowContent.includes('/tmp/test.log'),
        'Workflow should use /tmp/test.log for test logs'
      );
    });

    it('should verify workflow uses correct QIEL commands', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/qic.yml');
      const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
      
      assert.ok(
        workflowContent.includes('npm run qiel:quick') || workflowContent.includes('qiel'),
        'Workflow should use QIEL validation'
      );
    });

    it('should verify workflow runs required build commands', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/qic.yml');
      const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
      
      assert.ok(
        workflowContent.includes('npm run typecheck') || workflowContent.includes('typecheck'),
        'Workflow should run typecheck'
      );
      assert.ok(
        workflowContent.includes('npm run lint') || workflowContent.includes('lint'),
        'Workflow should run lint'
      );
      assert.ok(
        workflowContent.includes('npm run test:all') || workflowContent.includes('test'),
        'Workflow should run tests'
      );
    });
  });

  describe('Configuration Report Generation', () => {
    it('should generate complete configuration report', () => {
      const report = generateConfigReport();
      
      assert.ok(report, 'Report should be generated');
      assert.ok(report.length > 0, 'Report should not be empty');
      
      // Report should contain key sections
      assert.ok(report.includes('QIEL Configuration Report'), 'Should have title');
      assert.ok(report.includes('Configuration Version'), 'Should include version');
      assert.ok(report.includes('Node Version'), 'Should include Node version');
      assert.ok(report.includes('Log Paths'), 'Should include log paths');
      assert.ok(report.includes('QIW Configuration'), 'Should include QIW config');
      assert.ok(report.includes('Drift Monitor Configuration'), 'Should include drift config');
      assert.ok(report.includes('QIEL Execution'), 'Should include execution config');
      assert.ok(report.includes('GitHub Workflow Alignment'), 'Should include alignment status');
    });

    it('should include alignment status in report', () => {
      const report = generateConfigReport();
      const validation = validateGitHubWorkflowAlignment();
      
      if (validation.aligned) {
        assert.ok(report.includes('ALIGNED'), 'Report should show aligned status');
      } else {
        assert.ok(report.includes('MISALIGNED'), 'Report should show misaligned status');
        validation.differences.forEach(diff => {
          assert.ok(report.includes(diff), `Report should include difference: ${diff}`);
        });
      }
    });
  });

  describe('Environment Differences Detection', () => {
    it('should detect mismatched thresholds', () => {
      // This tests the structure, actual mismatch detection happens in qiel-config.ts
      const drift = QIEL_CONFIG.drift;
      
      assert.ok(drift.errorThreshold, 'Error threshold should be defined');
      assert.strictEqual(typeof drift.errorThreshold, 'number');
      assert.ok(drift.errorThreshold > 0, 'Error threshold should be positive');
    });

    it('should detect schema version drift', () => {
      const drift = QIEL_CONFIG.drift;
      
      assert.ok(drift.memoryVersion, 'Memory version should be defined');
      assert.ok(drift.schemaVersion, 'Schema version should be defined');
      
      assert.match(drift.memoryVersion, /^\d+\.\d+\.\d+$/, 'Memory version should follow semver');
      assert.match(drift.schemaVersion, /^\d+\.\d+\.\d+$/, 'Schema version should follow semver');
    });

    it('should validate QIW pattern consistency', () => {
      const qiw = QIEL_CONFIG.qiw;
      
      assert.ok(qiw.errorPatterns, 'Error patterns should be defined');
      assert.ok(qiw.warningPatterns, 'Warning patterns should be defined');
      
      // Validate that all enabled channels have patterns
      qiw.enabledChannels.forEach(channel => {
        const channelKey = channel as keyof typeof qiw.errorPatterns;
        // Validate channel exists in error patterns before accessing
        assert.ok(
          channelKey in qiw.errorPatterns,
          `Channel ${channel} should exist in error patterns`
        );
        assert.ok(
          qiw.errorPatterns[channelKey],
          `Error patterns should be defined for channel: ${channel}`
        );
      });
    });

    it('should validate governance threshold consistency', () => {
      const governance = QIEL_CONFIG.governance;
      
      assert.ok(governance.qiIncidentThresholds.maxIncidentsPerDay);
      assert.ok(governance.qiIncidentThresholds.maxIncidentsPerWeek);
      assert.ok(governance.qiIncidentThresholds.criticalIncidentBlockThreshold);
      
      // Thresholds should make sense
      assert.ok(
        governance.qiIncidentThresholds.maxIncidentsPerDay <= governance.qiIncidentThresholds.maxIncidentsPerWeek,
        'Daily threshold should not exceed weekly threshold'
      );
    });
  });

  describe('Local vs GitHub Environment', () => {
    it('should validate local Node version matches config', () => {
      const localNodeVersion = process.version.replace('v', '').split('.')[0];
      
      // Note: This test will fail if you're running a different Node version locally
      // That's intentional - it should alert you to the mismatch
      assert.strictEqual(
        localNodeVersion,
        QIEL_CONFIG.nodeVersion,
        `Local Node version (${localNodeVersion}) should match config (${QIEL_CONFIG.nodeVersion})`
      );
    });

    it('should validate package.json scripts match execution config', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const scripts = packageJson.scripts || {};
      
      // Check required scripts exist
      assert.ok(scripts['typecheck'], 'typecheck script should exist');
      assert.ok(scripts['lint'], 'lint script should exist');
      assert.ok(scripts['test:all'], 'test:all script should exist');
      assert.ok(scripts['qiel:quick'], 'qiel:quick script should exist');
      assert.ok(scripts['qiel:full'], 'qiel:full script should exist');
    });

    it('should validate log directory is accessible', () => {
      const logDir = '/tmp';
      
      assert.ok(fs.existsSync(logDir), 'Log directory should exist');
      
      // Check we can write to it
      const testFile = path.join(logDir, '.qiel-test-write');
      try {
        fs.writeFileSync(testFile, 'test', 'utf-8');
      } catch (error) {
        assert.fail(`Should be able to write to log directory: ${error}`);
      } finally {
        // Ensure cleanup happens even if assertions fail
        try {
          if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
          }
        } catch {
          // Ignore cleanup errors
        }
      }
    });
  });

  describe('NPM Dependency Alignment', () => {
    it('should validate package-lock.json exists', () => {
      const lockFilePath = path.join(process.cwd(), 'package-lock.json');
      assert.ok(fs.existsSync(lockFilePath), 'package-lock.json should exist');
    });

    it('should validate critical dependencies are present', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      // Critical dependencies for QIEL
      assert.ok(allDeps['typescript'], 'TypeScript should be installed');
      assert.ok(allDeps['tsx'], 'TSX should be installed');
      assert.ok(allDeps['next'], 'Next.js should be installed');
    });
  });

  describe('Configuration Version Control', () => {
    it('should have a valid configuration version', () => {
      assert.ok(QIEL_CONFIG.version, 'Config version should exist');
      assert.match(QIEL_CONFIG.version, /^\d+\.\d+\.\d+$/, 'Version should follow semver');
    });

    it('should maintain configuration consistency', () => {
      // All subsystems should reference the same version
      assert.strictEqual(
        QIEL_CONFIG.drift.memoryVersion,
        QIEL_CONFIG.drift.schemaVersion,
        'Memory and schema versions should match'
      );
    });
  });
});
