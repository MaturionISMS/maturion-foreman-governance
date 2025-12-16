/**
 * CS1 (Constitutional Integrity) Validator Tests (RED QA)
 * 
 * Tests for CS1 validator: Ensures constitutional files remain immutable.
 * Control 2: Constitutional Integrity
 * 
 * Per BUILD_PHILOSOPHY.md: Red QA → Build to Green
 */

import { describe, it, expect } from '@jest/globals';

describe('CS1 Validator (Constitutional Integrity)', () => {
  describe('Hash Verification', () => {
    it('should load baseline hashes', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: [],
      };
      
      const result = await validateCS1(context);
      
      expect(result.evidence).toContainEqual(expect.objectContaining({
        path: expect.stringContaining('baseline-hashes.json')
      }));
    });

    it('should pass when protected files unchanged', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/some-file.ts', 'components/button.tsx'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('PASS');
      expect(result.checks.protectedFilesIntact).toBe(true);
    });

    it('should fail when BUILD_PHILOSOPHY.md modified', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['BUILD_PHILOSOPHY.md'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('CRITICAL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'PROTECTED_FILE_MODIFIED',
        description: expect.stringContaining('BUILD_PHILOSOPHY.md')
      }));
    });

    it('should fail when GOVERNANCE_GATE_CANON.md modified', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['GOVERNANCE_GATE_CANON.md'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('CRITICAL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'PROTECTED_FILE_MODIFIED',
        description: expect.stringContaining('GOVERNANCE_GATE_CANON.md')
      }));
    });

    it('should fail when workflow files modified', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['.github/workflows/qiel.yml'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('CRITICAL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'PROTECTED_FILE_MODIFIED',
        description: expect.stringContaining('.github/workflows')
      }));
    });

    it('should fail when constitution files modified', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['foreman/constitution/CS1_CONSTITUTIONAL_INTEGRITY.md'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('CRITICAL');
    });
  });

  describe('Suppression Detection', () => {
    it('should pass when no suppressions found', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/clean-code.ts'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.checks.noSuppressions).toBe(true);
    });

    it('should fail when eslint-disable found', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/suppressed-code.ts'], // Contains /* eslint-disable */
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'SUPPRESSION_DETECTED',
        description: expect.stringContaining('eslint-disable')
      }));
    });

    it('should fail when @ts-ignore found', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/ts-ignore-code.ts'], // Contains // @ts-ignore
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'SUPPRESSION_DETECTED',
        description: expect.stringContaining('@ts-ignore')
      }));
    });

    it('should fail when @ts-expect-error found', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/ts-expect-error-code.ts'], // Contains // @ts-expect-error
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'SUPPRESSION_DETECTED',
        description: expect.stringContaining('@ts-expect-error')
      }));
    });
  });

  describe('Protected Paths Validation', () => {
    it('should validate all protected paths exist', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: [],
      };
      
      const result = await validateCS1(context);
      
      expect(result.checks.protectedPathsIntact).toBe(true);
    });

    it('should fail if protected file deleted', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Temporarily rename BUILD_PHILOSOPHY.md to simulate deletion
      const buildPhilFile = path.join(process.cwd(), 'BUILD_PHILOSOPHY.md');
      const backupFile = path.join(process.cwd(), 'BUILD_PHILOSOPHY.md.backup');
      
      try {
        // Backup the file
        await fs.rename(buildPhilFile, backupFile);
        
        const context = {
          prNumber: 123,
          commitSha: 'abc123',
          workspaceRoot: '/workspace',
          changedFiles: [], // BUILD_PHILOSOPHY.md deleted (will be detected by validator)
        };
        
        const result = await validateCS1(context);
        
        expect(result.status).toBe('FAIL');
        expect(result.severity).toBe('CRITICAL');
        expect(result.violations).toContainEqual(expect.objectContaining({
          type: 'PROTECTED_FILE_DELETED',
          description: expect.stringContaining('BUILD_PHILOSOPHY.md')
        }));
      } finally {
        // Restore the file
        try {
          await fs.rename(backupFile, buildPhilFile);
        } catch (e) {
          // File might not have been backed up if test failed early
        }
      }
    });
  });

  describe('Governance Bypass Detection', () => {
    it('should pass when no bypass attempts detected', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/normal-code.ts'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.checks.noBypassAttempts).toBe(true);
    });

    it('should fail when governance bypass detected in comments', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/bypass-code.ts'], // Contains comments bypassing checks
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'GOVERNANCE_BYPASS_DETECTED'
      }));
    });
  });

  describe('Constitutional File Integrity', () => {
    it('should validate agent-contract.md integrity', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: [],
      };
      
      const result = await validateCS1(context);
      
      expect(result.checks.constitutionalFilesIntact).toBe(true);
      expect(result.evidence).toContainEqual(expect.objectContaining({
        path: expect.stringContaining('.github/foreman/agent-contract.md')
      }));
    });

    it('should fail when agent-contract.md modified', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['.github/foreman/agent-contract.md'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('CRITICAL');
      expect(result.violations).toContainEqual(expect.objectContaining({
        type: 'CONSTITUTIONAL_FILE_MODIFIED',
        description: expect.stringContaining('agent-contract.md')
      }));
    });
  });

  describe('Overall CS1 Result', () => {
    it('should return PASS only when all checks pass', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['lib/safe-change.ts'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('PASS');
      expect(result.checks.protectedFilesIntact).toBe(true);
      expect(result.checks.noSuppressions).toBe(true);
      expect(result.checks.protectedPathsIntact).toBe(true);
      expect(result.checks.noBypassAttempts).toBe(true);
      expect(result.checks.constitutionalFilesIntact).toBe(true);
      expect(result.violations).toEqual([]);
    });

    it('should return CRITICAL severity when protected files modified', async () => {
      const { validateCS1 } = await import('@/lib/foreman/governance/validators/cs1-validator');
      
      const context = {
        prNumber: 123,
        commitSha: 'abc123',
        workspaceRoot: '/workspace',
        changedFiles: ['BUILD_PHILOSOPHY.md'],
      };
      
      const result = await validateCS1(context);
      
      expect(result.status).toBe('FAIL');
      expect(result.severity).toBe('CRITICAL');
    });
  });
});
