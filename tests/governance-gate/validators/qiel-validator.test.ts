/**
 * QIEL Validator Tests (RED QA)
 * 
 * Tests for QIEL (QA Integrity Enforcement Layer) validator.
 * Control 1: Ensures QA is comprehensive, accurate, and absolute.
 * 
 * Per BUILD_PHILOSOPHY.md: Red QA → Build to Green
 */

import { describe, it, expect } from '@jest/globals';

describe('QIEL Validator', () => {
  describe('Evidence Loading (Bootstrap: Infrastructure Incomplete)', () => {
    it('should fail-closed when logs directory does not exist', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      // During bootstrap, log directories don't exist
      // Validator must fail-closed per GOVERNANCE_GATE_CANON.md
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        code: 'QIEL_NO_EVIDENCE'
      }));
    });

    it('should return empty evidence array when infrastructure incomplete', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      // No evidence can be loaded when infrastructure doesn't exist
      expect(result.evidence).toEqual([]);
    });
  });

  describe('100% Test Passing Validation', () => {
    it('should pass when all tests passing', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-all-pass',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('PASS');
      expect(result.checks.allTestsPassing).toBe(true);
    });

    it('should fail when ANY test fails', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-test-failure',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.allTestsPassing).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'TEST_FAILURES',
        severity: 'HIGH'
      }));
    });

    it('should fail when tests skipped', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-skipped-tests',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'TEST_DEBT',
        description: expect.stringContaining('skipped')
      }));
    });
  });

  describe('Build Error Validation', () => {
    it('should pass when build has zero errors', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-clean-build',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.buildLogsPassed).toBe(true);
    });

    it('should fail when build errors detected', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-build-errors',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.buildLogsPassed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'BUILD_ERRORS',
        severity: 'HIGH'
      }));
    });
  });

  describe('Lint Error Validation', () => {
    it('should pass when lint has zero errors', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-clean-lint',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.lintLogsPassed).toBe(true);
    });

    it('should fail when lint errors detected', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-lint-errors',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.lintLogsPassed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'LINT_ERRORS',
        severity: 'HIGH'
      }));
    });
  });

  describe('Zero Warning Validation', () => {
    it('should pass when zero warnings (strict mode)', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-zero-warnings',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.zeroWarningPassed).toBe(true);
    });

    it('should fail when warnings detected', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-warnings',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.zeroWarningPassed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'WARNINGS_DETECTED',
        severity: 'HIGH'
      }));
    });

    it('should pass when warnings are whitelisted', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-whitelisted-warnings',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.zeroWarningPassed).toBe(true);
      expect(result.message).toContain('whitelisted warnings excluded');
    });
  });

  describe('Deployment Simulation Validation', () => {
    it('should pass when deployment simulation succeeds', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-deployment-pass',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.deploymentSimulationPassed).toBe(true);
    });

    it('should fail when deployment simulation fails', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-deployment-fail',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.deploymentSimulationPassed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'DEPLOYMENT_SIMULATION_FAILURE',
        severity: 'HIGH'
      }));
    });
  });

  describe('Schema Cohesion Validation', () => {
    it('should pass when schema cohesion validated', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-schema-pass',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.schemaCohesionPassed).toBe(true);
    });

    it('should fail when schema cohesion violations detected', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-schema-fail',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.schemaCohesionPassed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'SCHEMA_COHESION_VIOLATION',
        severity: 'HIGH'
      }));
    });
  });

  describe('Engine Load Validation', () => {
    it('should pass when engine loads successfully', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-engine-pass',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.engineLoadPassed).toBe(true);
    });

    it('should fail when engine load fails', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-engine-fail',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.engineLoadPassed).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'ENGINE_LOAD_FAILURE',
        severity: 'CRITICAL'
      }));
    });
  });

  describe('Quality Integrity Incidents', () => {
    it('should pass when no QI incidents', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-no-incidents',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.checks.noQIIncidents).toBe(true);
    });

    it('should fail when QI incidents detected', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-qi-incidents',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.checks.noQIIncidents).toBe(false);
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'QUALITY_INTEGRITY_INCIDENTS',
        severity: 'CRITICAL'
      }));
    });
  });

  describe('Overall QIEL Result', () => {
    it('should return PASS only when ALL checks pass', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-all-pass',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('PASS');
      expect(result.checks.allTestsPassing).toBe(true);
      expect(result.checks.buildLogsPassed).toBe(true);
      expect(result.checks.lintLogsPassed).toBe(true);
      expect(result.checks.zeroWarningPassed).toBe(true);
      expect(result.checks.deploymentSimulationPassed).toBe(true);
      expect(result.checks.schemaCohesionPassed).toBe(true);
      expect(result.checks.engineLoadPassed).toBe(true);
      expect(result.checks.noQIIncidents).toBe(true);
      expect(result.violations).toEqual([]);
    });

    it('should return FAIL when ANY check fails', async () => {
      const { validateQIEL } = await import('@/lib/foreman/governance/validators/qiel-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        evidenceDir: '/tmp/evidence-one-failure',
        logsDir: '/tmp/logs',
      };
      
      const result = await validateQIEL(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations.length).toBeGreaterThan(0);
    });
  });
});
