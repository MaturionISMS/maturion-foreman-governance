/**
 * CS5 Test: Performance Regression Detection
 * 
 * Ensures performance does not regress over time.
 * Tracks violation counts and enforces improvement.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { detectPerformanceRegression } from '../../lib/foreman/performance/enforcement-engine';
import type { PerformanceScanResult } from '../../lib/foreman/performance/performance-scanner';

describe('CS5: Performance Regression Detection', () => {
  describe('Regression Detection Logic', () => {
    it('should detect increase in critical violations', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: [],
        criticalCount: 1,
        highCount: 2,
        mediumCount: 3,
        lowCount: 4,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: false,
        violations: [],
        criticalCount: 3, // Increased from 1
        highCount: 2,
        mediumCount: 3,
        lowCount: 4,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, true, 'Should detect critical violation increase');
      assert.ok(
        result.details.some(d => d.includes('Critical violations increased')),
        'Should report critical increase'
      );

      console.log('✓ Critical violation increase detected');
    });

    it('should detect increase in high severity violations', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: [],
        criticalCount: 0,
        highCount: 2,
        mediumCount: 3,
        lowCount: 4,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: false,
        violations: [],
        criticalCount: 0,
        highCount: 5, // Increased from 2
        mediumCount: 3,
        lowCount: 4,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, true, 'Should detect high violation increase');
      assert.ok(
        result.details.some(d => d.includes('High violations increased')),
        'Should report high severity increase'
      );

      console.log('✓ High severity violation increase detected');
    });

    it('should detect significant total violation increase', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: new Array(10).fill(null),
        criticalCount: 0,
        highCount: 0,
        mediumCount: 5,
        lowCount: 5,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: false,
        violations: new Array(25).fill(null), // 150% increase (>10% threshold)
        criticalCount: 0,
        highCount: 0,
        mediumCount: 12,
        lowCount: 13,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, true, 'Should detect significant total increase');
      assert.ok(
        result.details.some(d => d.includes('Total violations increased significantly')),
        'Should report total increase'
      );

      console.log('✓ Significant total violation increase detected');
    });

    it('should NOT detect regression when violations decrease', async () => {
      const baseline: PerformanceScanResult = {
        passed: false,
        violations: new Array(10).fill(null),
        criticalCount: 3,
        highCount: 2,
        mediumCount: 3,
        lowCount: 2,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: true,
        violations: new Array(5).fill(null), // Decreased
        criticalCount: 1, // Decreased
        highCount: 1, // Decreased
        mediumCount: 2,
        lowCount: 1,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, false, 'Should NOT detect regression when improving');

      console.log('✓ No regression when violations decrease');
    });

    it('should NOT detect regression for minor increases (<10%)', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: new Array(100).fill(null),
        criticalCount: 0,
        highCount: 0,
        mediumCount: 50,
        lowCount: 50,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: true,
        violations: new Array(105).fill(null), // Only 5% increase
        criticalCount: 0,
        highCount: 0,
        mediumCount: 52,
        lowCount: 53,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, false, 'Should NOT detect minor increases');

      console.log('✓ Minor increases (<10%) not flagged as regression');
    });
  });

  describe('Baseline Handling', () => {
    it('should handle missing baseline gracefully', async () => {
      const result = await detectPerformanceRegression({
        baseline: undefined,
        current: {
          passed: true,
          violations: [],
          criticalCount: 0,
          highCount: 0,
          mediumCount: 0,
          lowCount: 0,
          filesScanned: 100,
          timestamp: new Date().toISOString(),
          blockingViolations: [],
          summary: 'Current',
        },
      });

      assert.strictEqual(result.hasRegression, false, 'Should not flag regression without baseline');
      assert.ok(
        result.details.some(d => d.includes('No baseline')),
        'Should indicate missing baseline'
      );

      console.log('✓ Missing baseline handled gracefully');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero violations in baseline', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: [],
        criticalCount: 0,
        highCount: 0,
        mediumCount: 0,
        lowCount: 0,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: false,
        violations: new Array(5).fill(null),
        criticalCount: 2,
        highCount: 1,
        mediumCount: 1,
        lowCount: 1,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, true, 'Should detect regression from zero violations');

      console.log('✓ Regression from zero violations detected');
    });

    it('should handle identical scans', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: new Array(10).fill(null),
        criticalCount: 1,
        highCount: 2,
        mediumCount: 3,
        lowCount: 4,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: true,
        violations: new Array(10).fill(null),
        criticalCount: 1,
        highCount: 2,
        mediumCount: 3,
        lowCount: 4,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, false, 'Should not flag identical scans');

      console.log('✓ Identical scans handled correctly');
    });
  });

  describe('Regression Reporting', () => {
    it('should provide detailed regression information', async () => {
      const baseline: PerformanceScanResult = {
        passed: true,
        violations: [],
        criticalCount: 1,
        highCount: 1,
        mediumCount: 1,
        lowCount: 1,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Baseline',
      };

      const current: PerformanceScanResult = {
        passed: false,
        violations: [],
        criticalCount: 3,
        highCount: 4,
        mediumCount: 2,
        lowCount: 1,
        filesScanned: 100,
        timestamp: new Date().toISOString(),
        blockingViolations: [],
        summary: 'Current',
      };

      const result = await detectPerformanceRegression({ baseline, current });

      assert.strictEqual(result.hasRegression, true);
      assert.ok(result.details.length > 0, 'Should provide details');
      assert.ok(result.details.some(d => d.includes('Critical')), 'Should mention critical');
      assert.ok(result.details.some(d => d.includes('High')), 'Should mention high');

      console.log('✓ Detailed regression information provided');
    });
  });
});

console.log('\n✅ CS5 Performance Regression Detection tests completed');
