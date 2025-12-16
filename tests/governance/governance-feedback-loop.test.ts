/**
 * Red QA: Governance Feedback Loop (FL/CI)
 * 
 * This test suite validates the governance feedback loop implementation.
 * Tests are designed to FAIL initially (Red QA) and pass after implementation (Build to Green).
 * 
 * Issue: A3 — FL/CI Feedback Loop (Governance Layer)
 * Architecture: /foreman/architecture/governance-feedback-loop-architecture.md
 * 
 * Test Categories:
 * 1. Failure Artifact Creation
 * 2. Failure Classification
 * 3. Learning Signal Generation
 * 4. Memory Storage Integration
 * 5. FL/CI System Integration
 * 6. Governance Gate Integration
 * 7. Error Handling
 * 8. End-to-End Flow
 */

import {
  GovernanceFailureArtifact,
  GovernanceFailureType,
  CorrectiveDomain,
  createGovernanceFailureArtifact,
  classifyGovernanceFailure,
  generateLearningSignal,
  storeFailureArtifact,
  updateFailureResolution,
} from '@/lib/foreman/governance/failure-artifact';

import {
  ClassificationRule,
  classifyFailure,
  determineCorrectiveDomain,
  generateRCACategory,
  suggestImprovementAction,
  suggestPreventionStrategy,
} from '@/lib/foreman/governance/failure-classifier';

import {
  logGovernanceGateFailure,
  queryGovernanceFailures,
  getFailureStatistics,
} from '@/lib/memory/governance-memory';

import { getFLCIEntry, createFLCIEntry } from '@/foreman/feedback-loop/fl-ci-system';

describe('Governance Feedback Loop - Red QA', () => {
  describe('1. Failure Artifact Creation', () => {
    test('creates artifact from QIEL failure', async () => {
      // ARRANGE
      const qielFailure = {
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 123,
        prTitle: 'Test PR',
        branch: 'feature/test',
        commit: 'abc123',
        author: 'test-user',
        violations: [
          {
            type: 'test_failure',
            description: '3 tests failed',
            location: 'tests/unit/example.test.ts',
          },
        ],
        evidence: {
          controlName: 'QIEL',
          evidenceFiles: ['qa-logs.txt'],
        },
      };

      // ACT
      const artifact = await createGovernanceFailureArtifact(qielFailure);

      // ASSERT
      expect(artifact).toBeDefined();
      expect(artifact.id).toBeDefined();
      expect(artifact.failureType).toBe('QIEL');
      expect(artifact.prNumber).toBe(123);
      expect(artifact.timestamp).toBeDefined();
      expect(artifact.correctiveDomain).toBeDefined();
      expect(artifact.evidence.violations).toHaveLength(1);
    });

    test('creates artifact from CS1 violation', async () => {
      // ARRANGE
      const cs1Violation = {
        failureType: 'CS1' as GovernanceFailureType,
        prNumber: 456,
        prTitle: 'Modify constitution',
        branch: 'feature/update',
        commit: 'def456',
        author: 'test-user',
        violations: [
          {
            type: 'protected_path_modification',
            description: 'Modified foreman/constitution/CS1.md',
            location: 'foreman/constitution/CS1.md',
          },
        ],
        evidence: {
          controlName: 'CS1',
          evidenceFiles: ['hash-verification.json'],
        },
      };

      // ACT
      const artifact = await createGovernanceFailureArtifact(cs1Violation);

      // ASSERT
      expect(artifact).toBeDefined();
      expect(artifact.failureType).toBe('CS1');
      expect(artifact.correctiveDomain).toBeDefined();
      expect(artifact.severity).toBe('critical'); // CS1 is critical
    });

    test('generates unique artifact IDs', async () => {
      // ARRANGE
      const failure1 = {
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 100,
        violations: [{ type: 'test', description: 'fail' }],
      };

      const failure2 = {
        failureType: 'CS2' as GovernanceFailureType,
        prNumber: 101,
        violations: [{ type: 'test', description: 'fail' }],
      };

      // ACT
      const artifact1 = await createGovernanceFailureArtifact(failure1);
      const artifact2 = await createGovernanceFailureArtifact(failure2);

      // ASSERT
      expect(artifact1.id).toBeDefined();
      expect(artifact2.id).toBeDefined();
      expect(artifact1.id).not.toBe(artifact2.id);
    });

    test('includes all required fields in artifact', async () => {
      // ARRANGE
      const failure = {
        failureType: 'GSR' as GovernanceFailureType,
        prNumber: 200,
        prTitle: 'Test PR',
        branch: 'test',
        commit: 'abc',
        author: 'user',
        violations: [{ type: 'gsr', description: 'QA not 100%' }],
        evidence: { controlName: 'GSR', evidenceFiles: [] },
      };

      // ACT
      const artifact = await createGovernanceFailureArtifact(failure);

      // ASSERT - All required fields present
      expect(artifact.id).toBeDefined();
      expect(artifact.timestamp).toBeDefined();
      expect(artifact.prNumber).toBeDefined();
      expect(artifact.prTitle).toBeDefined();
      expect(artifact.branch).toBeDefined();
      expect(artifact.commit).toBeDefined();
      expect(artifact.author).toBeDefined();
      expect(artifact.failureType).toBeDefined();
      expect(artifact.failedControl).toBeDefined();
      expect(artifact.failureDescription).toBeDefined();
      expect(artifact.correctiveDomain).toBeDefined();
      expect(artifact.severity).toBeDefined();
      expect(artifact.evidence).toBeDefined();
      expect(artifact.learningSignal).toBeDefined();
    });
  });

  describe('2. Failure Classification', () => {
    test('classifies QIEL failure correctly', async () => {
      // ARRANGE
      const qielFailure = {
        failureType: 'QIEL' as GovernanceFailureType,
        violations: [{ type: 'test_failure', description: 'Tests failed' }],
      };

      // ACT
      const classification = await classifyGovernanceFailure(qielFailure);

      // ASSERT
      expect(classification.correctiveDomain).toBe('QA');
      expect(classification.rcaCategory).toBe('qa_gap');
      expect(classification.improvementAction).toContain('QA');
    });

    test('classifies CS1 violation correctly', async () => {
      // ARRANGE
      const cs1Violation = {
        failureType: 'CS1' as GovernanceFailureType,
        violations: [{ type: 'constitutional', description: 'Protected file modified' }],
      };

      // ACT
      const classification = await classifyGovernanceFailure(cs1Violation);

      // ASSERT
      expect(classification.correctiveDomain).toBe('POLICY');
      expect(classification.rcaCategory).toBe('policy_gap');
      expect(classification.improvementAction).toContain('constitutional');
    });

    test('classifies CS2 failure correctly', async () => {
      // ARRANGE
      const cs2Failure = {
        failureType: 'CS2' as GovernanceFailureType,
        violations: [{ type: 'architecture_approval', description: 'No approval' }],
      };

      // ACT
      const classification = await classifyGovernanceFailure(cs2Failure);

      // ASSERT
      expect(classification.correctiveDomain).toBe('ARCHITECTURE');
      expect(classification.rcaCategory).toBe('architecture_gap');
    });

    test('classifies CS5 violation correctly', async () => {
      // ARRANGE
      const cs5Violation = {
        failureType: 'CS5' as GovernanceFailureType,
        violations: [{ type: 'performance', description: 'OPOJD violation' }],
      };

      // ACT
      const classification = await classifyGovernanceFailure(cs5Violation);

      // ASSERT
      expect(classification.correctiveDomain).toBe('IMPLEMENTATION');
      expect(classification.rcaCategory).toBe('implementation_gap');
    });

    test('assigns correct severity levels', async () => {
      // ARRANGE
      const cs1 = { failureType: 'CS1' as GovernanceFailureType, violations: [] };
      const qiel = { failureType: 'QIEL' as GovernanceFailureType, violations: [] };

      // ACT
      const cs1Classification = await classifyGovernanceFailure(cs1);
      const qielClassification = await classifyGovernanceFailure(qiel);

      // ASSERT
      expect(cs1Classification.severity).toBe('critical'); // CS1 is critical
      expect(qielClassification.severity).toBe('high'); // QIEL is high
    });
  });

  describe('3. Learning Signal Generation', () => {
    test('generates learning signal for QIEL failure', async () => {
      // ARRANGE
      const qielFailure = {
        failureType: 'QIEL' as GovernanceFailureType,
        violations: [{ type: 'test_failure', description: '5 tests failed' }],
      };

      // ACT
      const signal = await generateLearningSignal(qielFailure);

      // ASSERT
      expect(signal).toBeDefined();
      expect(signal.rcaCategory).toBe('qa_gap');
      expect(signal.improvementAction).toBeDefined();
      expect(signal.improvementAction.length).toBeGreaterThan(10);
      expect(signal.preventionStrategy).toBeDefined();
      expect(signal.improvementTarget).toBeDefined();
    });

    test('generates specific improvement actions', async () => {
      // ARRANGE
      const cs2Failure = {
        failureType: 'CS2' as GovernanceFailureType,
        violations: [{ type: 'no_approval', description: 'Architecture change unapproved' }],
      };

      // ACT
      const signal = await generateLearningSignal(cs2Failure);

      // ASSERT
      expect(signal.improvementAction).toContain('architecture approval');
      expect(signal.improvementTarget).toContain('CS2');
    });

    test('generates prevention strategies', async () => {
      // ARRANGE
      const gsrFailure = {
        failureType: 'GSR' as GovernanceFailureType,
        violations: [{ type: 'qa_bypass', description: 'Merge with failing QA' }],
      };

      // ACT
      const signal = await generateLearningSignal(gsrFailure);

      // ASSERT
      expect(signal.preventionStrategy).toBeDefined();
      expect(signal.preventionStrategy).toContain('GSR');
      expect(signal.preventionStrategy.length).toBeGreaterThan(20);
    });

    test('identifies improvement targets correctly', async () => {
      // ARRANGE
      const qielFailure = {
        failureType: 'QIEL' as GovernanceFailureType,
        violations: [],
      };

      // ACT
      const signal = await generateLearningSignal(qielFailure);

      // ASSERT
      expect(signal.improvementTarget).toMatch(/QIEL|qa|test/i);
    });
  });

  describe('4. Memory Storage Integration', () => {
    test('stores artifact in governance memory', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 300,
        violations: [{ type: 'test', description: 'fail' }],
      });

      // ACT
      await storeFailureArtifact(artifact);
      const stored = await queryGovernanceFailures({ artifactId: artifact.id });

      // ASSERT
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe(artifact.id);
    });

    test('logs governance gate failure event', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'CS1' as GovernanceFailureType,
        prNumber: 400,
        violations: [{ type: 'test', description: 'fail' }],
      });

      // ACT
      await logGovernanceGateFailure(artifact);

      // ASSERT - Event logged (verify via governance memory query)
      const failures = await queryGovernanceFailures({
        failureType: 'CS1',
        since: new Date(Date.now() - 1000).toISOString(),
      });
      expect(failures.length).toBeGreaterThan(0);
    });

    test('queries failures by type', async () => {
      // ARRANGE - Create multiple failures
      await createAndStoreFailure('QIEL', 500);
      await createAndStoreFailure('QIEL', 501);
      await createAndStoreFailure('CS1', 502);

      // ACT
      const qielFailures = await queryGovernanceFailures({ failureType: 'QIEL' });

      // ASSERT
      expect(qielFailures.length).toBeGreaterThanOrEqual(2);
      expect(qielFailures.every(f => f.failureType === 'QIEL')).toBe(true);
    });

    test('queries failures by corrective domain', async () => {
      // ARRANGE
      await createAndStoreFailure('QIEL', 600); // QA domain
      await createAndStoreFailure('CS2', 601); // ARCHITECTURE domain

      // ACT
      const qaFailures = await queryGovernanceFailures({ correctiveDomain: 'QA' });

      // ASSERT
      expect(qaFailures.length).toBeGreaterThan(0);
      expect(qaFailures.every(f => f.correctiveDomain === 'QA')).toBe(true);
    });

    test('retrieves failure statistics', async () => {
      // ARRANGE - Create diverse failures
      await createAndStoreFailure('QIEL', 700);
      await createAndStoreFailure('CS1', 701);
      await createAndStoreFailure('CS2', 702);

      // ACT
      const stats = await getFailureStatistics();

      // ASSERT
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.byType).toBeDefined();
      expect(stats.byDomain).toBeDefined();
      expect(stats.resolved).toBeDefined();
      expect(stats.pending).toBeDefined();
    });
  });

  describe('5. FL/CI System Integration', () => {
    test('creates FL/CI entry for governance failure', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 800,
        violations: [{ type: 'test', description: 'fail' }],
      });

      // ACT
      const flciEntry = await createFLCIEntry({
        trigger: 'GOVERNANCE_GATE_FAILURE',
        artifactId: artifact.id,
        failureType: artifact.failureType,
        learningSignal: artifact.learningSignal,
      });

      // ASSERT
      expect(flciEntry).toBeDefined();
      expect(flciEntry.id).toBeDefined();
      expect(flciEntry.trigger).toBe('GOVERNANCE_GATE_FAILURE');
      expect(flciEntry.artifactId).toBe(artifact.id);
    });

    test('links artifact to FL/CI entry', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'CS1' as GovernanceFailureType,
        prNumber: 900,
        violations: [{ type: 'test', description: 'fail' }],
      });

      // ACT
      const flciEntry = await createFLCIEntry({
        trigger: 'GOVERNANCE_GATE_FAILURE',
        artifactId: artifact.id,
      });

      const retrievedArtifact = await queryGovernanceFailures({ artifactId: artifact.id });

      // ASSERT
      expect(retrievedArtifact[0].flciEntry).toBeDefined();
      expect(retrievedArtifact[0].flciEntry.entryId).toBe(flciEntry.id);
    });

    test('FL/CI entry includes CI enhancements', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 1000,
        violations: [{ type: 'test', description: 'fail' }],
      });

      // ACT
      const flciEntry = await createFLCIEntry({
        trigger: 'GOVERNANCE_GATE_FAILURE',
        artifactId: artifact.id,
        learningSignal: artifact.learningSignal,
      });

      // ASSERT
      expect(flciEntry.ciEnhancements).toBeDefined();
      expect(flciEntry.ciEnhancements.length).toBeGreaterThan(0);
    });
  });

  describe('6. Governance Gate Integration', () => {
    test('governance gate failure triggers artifact creation', async () => {
      // ARRANGE - Simulate governance gate execution
      const gateResult = {
        passed: false,
        failedControl: 'QIEL',
        violations: [{ type: 'test_failure', description: '2 tests failed' }],
      };

      // ACT - This would be called by the workflow
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 1100,
        violations: gateResult.violations,
      });

      // ASSERT
      expect(artifact).toBeDefined();
      expect(artifact.failureType).toBe('QIEL');
    });

    test('artifact includes evidence from gate execution', async () => {
      // ARRANGE
      const gateEvidence = {
        controlName: 'QIEL',
        evidenceFiles: ['qiel-report.json', 'test-results.xml'],
        validatorOutput: 'QIEL validation failed: 3 tests failed',
      };

      // ACT
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 1200,
        violations: [],
        evidence: gateEvidence,
      });

      // ASSERT
      expect(artifact.evidence.controlName).toBe('QIEL');
      expect(artifact.evidence.evidenceFiles).toHaveLength(2);
      expect(artifact.evidence.validatorOutput).toContain('QIEL validation failed');
    });
  });

  describe('7. Error Handling', () => {
    test('handles artifact creation failure gracefully', async () => {
      // ARRANGE - Simulate memory unavailable
      const mockMemoryUnavailable = jest.spyOn(console, 'error').mockImplementation();

      // ACT & ASSERT - Should not throw, should fallback
      await expect(
        createGovernanceFailureArtifact({
          failureType: 'QIEL' as GovernanceFailureType,
          prNumber: 1300,
          violations: [],
          simulateError: true, // Test flag
        })
      ).resolves.not.toThrow();

      mockMemoryUnavailable.mockRestore();
    });

    test('uses default classification if classification fails', async () => {
      // ARRANGE
      const unknownFailure = {
        failureType: 'UNKNOWN' as any, // Invalid type
        violations: [],
      };

      // ACT
      const classification = await classifyGovernanceFailure(unknownFailure);

      // ASSERT - Should have default values
      expect(classification.correctiveDomain).toBe('QA'); // Default
      expect(classification.rcaCategory).toBe('qa_gap'); // Default
    });

    test('stores artifact locally if memory unavailable', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 1400,
        violations: [],
      });

      // Simulate memory failure
      jest.spyOn(require('@/lib/memory/governance-memory'), 'logGovernanceEvent')
        .mockRejectedValueOnce(new Error('Memory unavailable'));

      // ACT
      await storeFailureArtifact(artifact);

      // ASSERT - Check local file system (implementation detail)
      // Verify artifact was written to .governance/failures/
      const fs = require('fs');
      const localPath = `.governance/failures/${artifact.id}.json`;
      expect(fs.existsSync(localPath)).toBe(true);
    });
  });

  describe('8. End-to-End Flow', () => {
    test('complete governance failure to learning signal flow', async () => {
      // ARRANGE
      const prNumber = 1500;
      const failureType = 'QIEL' as GovernanceFailureType;
      const violations = [
        { type: 'test_failure', description: '5 tests failed' },
      ];

      // ACT

      // Step 1: Create artifact
      const artifact = await createGovernanceFailureArtifact({
        failureType,
        prNumber,
        violations,
        prTitle: 'E2E Test PR',
        branch: 'feature/e2e',
        commit: 'e2e123',
        author: 'test-user',
        evidence: {
          controlName: 'QIEL',
          evidenceFiles: ['test-report.json'],
        },
      });
      expect(artifact).toBeDefined();

      // Step 2: Classify
      expect(artifact.correctiveDomain).toBe('QA');
      expect(artifact.learningSignal.rcaCategory).toBe('qa_gap');

      // Step 3: Store in memory
      await storeFailureArtifact(artifact);
      const stored = await queryGovernanceFailures({ artifactId: artifact.id });
      expect(stored).toHaveLength(1);

      // Step 4: Create FL/CI entry
      const flciEntry = await createFLCIEntry({
        trigger: 'GOVERNANCE_GATE_FAILURE',
        artifactId: artifact.id,
        learningSignal: artifact.learningSignal,
      });
      expect(flciEntry).toBeDefined();

      // Step 5: Verify link
      const updatedArtifact = await queryGovernanceFailures({ artifactId: artifact.id });
      expect(updatedArtifact[0].flciEntry).toBeDefined();

      // ASSERT - Full flow completed
      expect(artifact.id).toBeDefined();
      expect(artifact.failureType).toBe('QIEL');
      expect(artifact.correctiveDomain).toBe('QA');
      expect(artifact.learningSignal).toBeDefined();
      expect(stored[0].id).toBe(artifact.id);
      expect(flciEntry.artifactId).toBe(artifact.id);
    });

    test('artifact resolution flow', async () => {
      // ARRANGE
      const artifact = await createGovernanceFailureArtifact({
        failureType: 'CS2' as GovernanceFailureType,
        prNumber: 1600,
        violations: [],
      });
      await storeFailureArtifact(artifact);

      // ACT - Update resolution
      const resolution = {
        status: 'resolved' as const,
        resolvedAt: new Date().toISOString(),
        resolvedBy: 'foreman',
        resolutionCommit: 'fix-abc123',
        resolutionNotes: 'Architecture approval obtained',
      };
      await updateFailureResolution(artifact.id, resolution);

      // ASSERT
      const updated = await queryGovernanceFailures({ artifactId: artifact.id });
      expect(updated[0].resolution).toBeDefined();
      expect(updated[0].resolution.status).toBe('resolved');
      expect(updated[0].resolution.resolvedBy).toBe('foreman');
    });

    test('statistics reflect resolved vs pending failures', async () => {
      // ARRANGE
      const resolved = await createGovernanceFailureArtifact({
        failureType: 'QIEL' as GovernanceFailureType,
        prNumber: 1700,
        violations: [],
      });
      await storeFailureArtifact(resolved);
      await updateFailureResolution(resolved.id, {
        status: 'resolved',
        resolvedAt: new Date().toISOString(),
      });

      const pending = await createGovernanceFailureArtifact({
        failureType: 'CS1' as GovernanceFailureType,
        prNumber: 1701,
        violations: [],
      });
      await storeFailureArtifact(pending);

      // ACT
      const stats = await getFailureStatistics();

      // ASSERT
      expect(stats.resolved).toBeGreaterThan(0);
      expect(stats.pending).toBeGreaterThan(0);
    });
  });
});

// Helper function for tests
async function createAndStoreFailure(
  failureType: GovernanceFailureType,
  prNumber: number
): Promise<GovernanceFailureArtifact> {
  const artifact = await createGovernanceFailureArtifact({
    failureType,
    prNumber,
    violations: [{ type: 'test', description: 'test failure' }],
  });
  await storeFailureArtifact(artifact);
  return artifact;
}
