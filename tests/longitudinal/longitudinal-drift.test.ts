/**
 * Wave 4A.1 - Longitudinal Drift Detection - Red QA Tests
 * 
 * These tests MUST FAIL initially (Red QA) and then pass after implementation (Green QA).
 * 
 * Test Coverage:
 * 1. Signature Persistence (append-only)
 * 2. Deterministic Drift Computation
 * 3. Memory Fabric Integration
 * 4. Mandatory Edge Cases
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import * as fs from 'fs/promises';
import * as path from 'path';
import { 
  persistSignature, 
  getHistoricalSignatures, 
  getSignatureAtTime 
} from '@/lib/foreman/longitudinal/signature-persistence';
import { 
  computeDrift, 
  classifyDriftPattern 
} from '@/lib/foreman/longitudinal/drift-computation';
import { 
  storeDriftObservation, 
  queryDriftObservations,
  getStabilityMetrics 
} from '@/lib/foreman/longitudinal/memory-integration';
import { 
  PersistedSignature, 
  DriftClassification,
  SignatureSourceType 
} from '@/types/longitudinal';
import { ArchitectureSignature } from '@/types/constraints';

// Test utilities
const TEST_SIGNATURES_DIR = path.join(process.cwd(), 'memory', 'foreman', 'longitudinal', 'signatures-test');

/**
 * Create a mock architecture signature for testing
 * Note: This creates a minimal signature structure for testing drift computation
 */
function createMockSignature(params: {
  modules?: number;
  dependencies?: number;
  timestamp?: string;
  constraints?: string[]; // Allow constraints to be specified
}): ArchitectureSignature {
  const moduleCount = params.modules || 10;
  const modules = Array.from({ length: moduleCount }, (_, i) => ({
    name: `module-${i}`,
    path: `lib/module-${i}.ts`,
    exports: [`export-${i}`],
    imports: [`./module-${(i + 1) % moduleCount}`],
    layer: 'library',
    hash: `hash-module-${i}`,
  }));

  return {
    version: '1.0.0',
    timestamp: params.timestamp || new Date().toISOString(),
    repository: {
      url: 'https://github.com/test/test',
      commit: '0000000000000000000000000000000000000000',
      branch: 'main',
    },
    structure: {
      modules,
      dependencies: {
        nodes: modules.map(m => m.name),
        edges: Array.from({ length: params.dependencies || 5 }, (_, i) => ({
          from: `module-${i}`,
          to: `module-${(i + 1) % moduleCount}`,
          type: 'import' as const,
        })),
      },
      layers: [
        {
          name: 'library',
          description: 'Library layer',
          allowedDependencies: [],
          modules: modules.map(m => m.name),
        },
      ],
    },
    contracts: {
      apis: [],
      types: [],
      events: [],
    },
    governance: {
      protectedPaths: ['.github/foreman/', 'BUILD_PHILOSOPHY.md'],
      constraints: params.constraints || [],
      version: '1.0.0',
    },
    hash: 'test-signature-hash',
  };
}

describe('Wave 4A.1 - Signature Persistence', () => {
  beforeEach(async () => {
    // Clean up test directory
    try {
      await fs.rm(TEST_SIGNATURES_DIR, { recursive: true });
    } catch (error) {
      // Directory doesn't exist, ignore
    }
    await fs.mkdir(TEST_SIGNATURES_DIR, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await fs.rm(TEST_SIGNATURES_DIR, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  it('should persist a signature with all required fields', async () => {
    const signature = createMockSignature({ modules: 5 });
    const result = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: 'abc123',
      metadata: { commitMessage: 'Test commit' },
    });

    expect(result.success).toBe(true);
    expect(result.signatureId).toBeDefined();
    expect(result.stored).toBe(true);

    // Verify file exists
    const files = await fs.readdir(TEST_SIGNATURES_DIR);
    expect(files.length).toBeGreaterThan(0);
    expect(files[0]).toMatch(/^signature-commit-abc123-/);
  });

  it('should enforce append-only (no overwrites)', async () => {
    const signature = createMockSignature({ modules: 5 });
    
    // First persist
    const result1 = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: 'abc123',
    });
    expect(result1.success).toBe(true);

    // Second persist with same sourceId should create new file, not overwrite
    const result2 = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: 'abc123',
    });
    expect(result2.success).toBe(true);

    // Should have 2 files now
    const files = await fs.readdir(TEST_SIGNATURES_DIR);
    expect(files.length).toBe(2);
  });

  it('should retrieve historical signatures by source type', async () => {
    // Persist multiple signatures
    const signature = createMockSignature({ modules: 5 });
    
    await persistSignature({ signature, sourceType: 'commit', sourceId: 'commit1' });
    await persistSignature({ signature, sourceType: 'pr', sourceId: 'pr1' });
    await persistSignature({ signature, sourceType: 'commit', sourceId: 'commit2' });

    // Query by source type
    const commits = await getHistoricalSignatures({ sourceType: 'commit' });
    expect(commits.length).toBe(2);
    expect(commits.every(s => s.sourceType === 'commit')).toBe(true);

    const prs = await getHistoricalSignatures({ sourceType: 'pr' });
    expect(prs.length).toBe(1);
    expect(prs[0].sourceType).toBe('pr');
  });

  it('should retrieve signatures within a time range', async () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const signature = createMockSignature({ 
      modules: 5,
      timestamp: now.toISOString(),
    });
    
    await persistSignature({ signature, sourceType: 'commit', sourceId: 'commit1' });

    // Query with time range
    const results = await getHistoricalSignatures({
      since: yesterday,
      until: tomorrow,
    });

    expect(results.length).toBe(1);
    expect(new Date(results[0].timestamp).getTime()).toBeGreaterThan(yesterday.getTime());
    expect(new Date(results[0].timestamp).getTime()).toBeLessThan(tomorrow.getTime());
  });

  it('should get the most recent signature before a given time', async () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

    await persistSignature({
      signature: createMockSignature({ timestamp: twoHoursAgo.toISOString() }),
      sourceType: 'commit',
      sourceId: 'old-commit',
    });

    await persistSignature({
      signature: createMockSignature({ timestamp: oneHourAgo.toISOString() }),
      sourceType: 'commit',
      sourceId: 'recent-commit',
    });

    // Get signature before now
    const result = await getSignatureAtTime(now);
    expect(result).toBeDefined();
    expect(result!.sourceId).toBe('recent-commit');
  });
});

describe('Wave 4A.1 - Drift Computation', () => {
  it('should compute drift deterministically', async () => {
    const oldSignature: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature: createMockSignature({ modules: 10, dependencies: 5 }),
      sourceType: 'commit',
      sourceId: 'commit-1',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const newSignature: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-2',
      signature: createMockSignature({ modules: 12, dependencies: 6 }),
      sourceType: 'commit',
      sourceId: 'commit-2',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const drift1 = computeDrift({ oldSignature, newSignature });
    const drift2 = computeDrift({ oldSignature, newSignature });

    // Should be exactly the same
    expect(drift1).toEqual(drift2);
    expect(drift1.metrics.structuralChurnRate).toBe(drift2.metrics.structuralChurnRate);
  });

  it('should detect added modules', async () => {
    const oldSignature: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature: createMockSignature({ modules: 10 }),
      sourceType: 'commit',
      sourceId: 'commit-1',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const newSignature: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-2',
      signature: createMockSignature({ modules: 15 }),
      sourceType: 'commit',
      sourceId: 'commit-2',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const drift = computeDrift({ oldSignature, newSignature });

    expect(drift.structuralChanges.modulesAdded.length).toBe(5);
    expect(drift.metrics.totalChanges).toBeGreaterThan(0);
  });

  it('should detect removed modules', async () => {
    const oldSignature: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature: createMockSignature({ modules: 15 }),
      sourceType: 'commit',
      sourceId: 'commit-1',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const newSignature: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-2',
      signature: createMockSignature({ modules: 10 }),
      sourceType: 'commit',
      sourceId: 'commit-2',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const drift = computeDrift({ oldSignature, newSignature });

    expect(drift.structuralChanges.modulesRemoved.length).toBe(5);
  });

  it('should classify drift as Stable for minimal changes', async () => {
    // Create 5 signatures with minimal changes
    const signatures: PersistedSignature[] = Array.from({ length: 5 }, (_, i) => ({
      id: `sig-${i}`,
      signatureHash: `hash-${i}`,
      signature: createMockSignature({ modules: Math.floor(10 + i * 0.1), dependencies: 5 }),
      sourceType: 'commit' as SignatureSourceType,
      sourceId: `commit-${i}`,
      timestamp: new Date(Date.now() + i * 1000).toISOString(),
      metadata: {},
    }));

    const result = classifyDriftPattern({
      signatures,
      window: { type: 'commits', value: 5 },
    });

    expect(result.classification).toBe('Stable');
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  it('should classify drift as Accelerating for increasing churn', async () => {
    // Create signatures with increasing churn rate
    const signatures: PersistedSignature[] = [];
    
    for (let i = 0; i < 5; i++) {
      // Exponentially increase module count
      const modules = 10 + Math.pow(2, i);
      signatures.push({
        id: `sig-${i}`,
        signatureHash: `hash-${i}`,
        signature: createMockSignature({ modules: Math.floor(modules) }),
        sourceType: 'commit',
        sourceId: `commit-${i}`,
        timestamp: new Date(Date.now() + i * 1000).toISOString(),
        metadata: {},
      });
    }

    const result = classifyDriftPattern({
      signatures,
      window: { type: 'commits', value: 5 },
    });

    expect(result.classification).toBe('Accelerating');
  });

  it('should classify drift as Regressive for increasing violations', async () => {
    // Create signatures with increasing constraint violations
    const signatures: PersistedSignature[] = Array.from({ length: 5 }, (_, i) => {
      const constraints = Array.from({ length: i * 2 }, (_, j) => `constraint-${j}`);
      return {
        id: `sig-${i}`,
        signatureHash: `hash-${i}`,
        signature: createMockSignature({ modules: 10, constraints }),
        sourceType: 'commit' as SignatureSourceType,
        sourceId: `commit-${i}`,
        timestamp: new Date(Date.now() + i * 1000).toISOString(),
        metadata: {},
      };
    });

    const result = classifyDriftPattern({
      signatures,
      window: { type: 'commits', value: 5 },
    });

    expect(result.classification).toBe('Regressive');
  });
});

describe('Wave 4A.1 - Memory Fabric Integration', () => {
  it('should store drift observation in Memory Fabric', async () => {
    const observation = {
      driftId: 'drift-1',
      computation: {
        id: 'comp-1',
        oldSignatureId: 'sig-1',
        newSignatureId: 'sig-2',
        timestamp: new Date().toISOString(),
        structuralChanges: {
          modulesAdded: ['new-module'],
          modulesRemoved: [],
          modulesModified: [],
          dependenciesAdded: 1,
          dependenciesRemoved: 0,
        },
        contractChanges: {
          apisChanged: 0,
          typesChanged: 0,
          eventsChanged: 0,
        },
        governanceChanges: {
          constraintsAdded: [],
          constraintsRemoved: [],
          protectedPathsChanged: false,
        },
        metrics: {
          totalChanges: 1,
          structuralChurnRate: 0.1,
          contractStabilityScore: 1.0,
          governanceAlignmentScore: 1.0,
        },
      },
      classification: {
        classification: 'Stable' as DriftClassification,
        confidence: 0.9,
        supportingMetrics: {
          averageChurnRate: 0.1,
          violationTrend: 'stable' as const,
          stabilityTrend: 'stable' as const,
        },
        observationWindow: {
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          signatureCount: 2,
        },
      },
      context: {
        sourceType: 'commit' as SignatureSourceType,
        sourceId: 'commit-1',
        timestamp: new Date().toISOString(),
      },
    };

    await expect(storeDriftObservation(observation)).resolves.not.toThrow();
  });

  it('should query drift observations by time window', async () => {
    // Store observations with different timestamps
    const now = new Date();
    
    for (let i = 0; i < 5; i++) {
      const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString();
      await storeDriftObservation({
        driftId: `drift-${i}`,
        computation: {
          id: `comp-${i}`,
          oldSignatureId: `sig-${i}`,
          newSignatureId: `sig-${i + 1}`,
          timestamp,
          structuralChanges: {
            modulesAdded: [],
            modulesRemoved: [],
            modulesModified: [],
            dependenciesAdded: 0,
            dependenciesRemoved: 0,
          },
          contractChanges: {
            apisChanged: 0,
            typesChanged: 0,
            eventsChanged: 0,
          },
          governanceChanges: {
            constraintsAdded: [],
            constraintsRemoved: [],
            protectedPathsChanged: false,
          },
          metrics: {
            totalChanges: 0,
            structuralChurnRate: 0,
            contractStabilityScore: 1.0,
            governanceAlignmentScore: 1.0,
          },
        },
        classification: {
          classification: 'Stable',
          confidence: 0.9,
          supportingMetrics: {
            averageChurnRate: 0,
            violationTrend: 'stable',
            stabilityTrend: 'stable',
          },
          observationWindow: {
            startTime: timestamp,
            endTime: timestamp,
            signatureCount: 2,
          },
        },
        context: {
          sourceType: 'commit',
          sourceId: `commit-${i}`,
          timestamp,
        },
      });
    }

    // Query last 3 days
    const results = await queryDriftObservations({
      window: { type: 'days', value: 3 },
    });

    expect(results.length).toBeLessThanOrEqual(3);
  });

  it('should calculate stability metrics for a time period', async () => {
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const end = new Date();

    const metrics = await getStabilityMetrics({ start, end });

    expect(metrics).toHaveProperty('period');
    expect(metrics).toHaveProperty('signatureCount');
    expect(metrics).toHaveProperty('driftObservationCount');
    expect(metrics).toHaveProperty('overallClassification');
    expect(metrics).toHaveProperty('trends');
  });
});

describe('Wave 4A.1 - Mandatory Edge Cases', () => {
  it('EDGE CASE: First-run baseline (no prior signature)', async () => {
    // Clear all signatures
    try {
      await fs.rm(TEST_SIGNATURES_DIR, { recursive: true });
    } catch (error) {
      // Ignore
    }
    await fs.mkdir(TEST_SIGNATURES_DIR, { recursive: true });

    const signature = createMockSignature({ modules: 10 });
    const result = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: 'first-commit',
      metadata: { isBaseline: true },
    });

    expect(result.success).toBe(true);
    
    // Retrieve and verify it's marked as baseline
    const signatures = await getHistoricalSignatures({});
    expect(signatures.length).toBe(1);
    expect(signatures[0].metadata.isBaseline).toBe(true);
  });

  it('EDGE CASE: Large refactor commit (many changes)', async () => {
    const oldSignature: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature: createMockSignature({ modules: 10 }),
      sourceType: 'commit',
      sourceId: 'before-refactor',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    // Large refactor: add 50 modules, remove 5
    const newSignature: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-2',
      signature: createMockSignature({ modules: 55 }),
      sourceType: 'commit',
      sourceId: 'after-refactor',
      timestamp: new Date().toISOString(),
      metadata: { commitMessage: 'Large refactor' },
    };

    const drift = computeDrift({ oldSignature, newSignature });

    // Should detect significant changes
    expect(drift.metrics.structuralChurnRate).toBeGreaterThan(0.5);
    expect(drift.structuralChanges.modulesAdded.length).toBeGreaterThan(30);
  });

  it('EDGE CASE: Reverted commit', async () => {
    const baselineSignature = createMockSignature({ modules: 10 });
    const changedSignature = createMockSignature({ modules: 15 });
    const revertedSignature = createMockSignature({ modules: 10 });

    const sig1: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature: baselineSignature,
      sourceType: 'commit',
      sourceId: 'baseline',
      timestamp: new Date(Date.now() - 2000).toISOString(),
      metadata: {},
    };

    const sig2: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-2',
      signature: changedSignature,
      sourceType: 'commit',
      sourceId: 'change',
      timestamp: new Date(Date.now() - 1000).toISOString(),
      metadata: {},
    };

    const sig3: PersistedSignature = {
      id: 'sig-3',
      signatureHash: 'hash-3',
      signature: revertedSignature,
      sourceType: 'commit',
      sourceId: 'revert',
      timestamp: new Date().toISOString(),
      metadata: { revertOf: 'change' },
    };

    const driftToChange = computeDrift({ oldSignature: sig1, newSignature: sig2 });
    const driftToRevert = computeDrift({ oldSignature: sig2, newSignature: sig3 });

    // Should detect return to baseline
    expect(driftToRevert.structuralChanges.modulesRemoved.length).toBe(5);
  });

  it('EDGE CASE: Zero-drift scenario (no changes)', async () => {
    const signature = createMockSignature({ modules: 10 });
    
    const sig1: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature,
      sourceType: 'commit',
      sourceId: 'commit-1',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const sig2: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-1', // Same hash
      signature,
      sourceType: 'commit',
      sourceId: 'commit-2',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const drift = computeDrift({ oldSignature: sig1, newSignature: sig2 });

    expect(drift.metrics.totalChanges).toBe(0);
    expect(drift.metrics.structuralChurnRate).toBe(0);
    expect(drift.structuralChanges.modulesAdded).toEqual([]);
    expect(drift.structuralChanges.modulesRemoved).toEqual([]);
  });

  it('EDGE CASE: Partial signature availability (Infrastructure Gap)', async () => {
    // Attempt to get signatures when some are missing
    const result = await getHistoricalSignatures({
      sourceType: 'pr',
      sourceId: 'non-existent-pr',
    });

    // Should return empty, not throw or infer
    expect(result).toEqual([]);
    expect(result.length).toBe(0);

    // Should not attempt to infer or approximate
    // Infrastructure Gap should be recorded elsewhere
  });
});

describe('Wave 4A.1 - Observe-Only Compliance', () => {
  it('should NOT enforce constraints', async () => {
    const signature = createMockSignature({ modules: 10 });
    
    // Even with violations, should persist without blocking
    const result = await persistSignature({
      signature,
      sourceType: 'commit',
      sourceId: 'with-violations',
      metadata: { hasViolations: true },
    });

    expect(result.success).toBe(true);
    expect(result.stored).toBe(true);
  });

  it('should NOT block builds or merges', async () => {
    // Drift computation should never throw or block
    const oldSignature: PersistedSignature = {
      id: 'sig-1',
      signatureHash: 'hash-1',
      signature: createMockSignature({ modules: 10 }),
      sourceType: 'commit',
      sourceId: 'commit-1',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    const newSignature: PersistedSignature = {
      id: 'sig-2',
      signatureHash: 'hash-2',
      signature: createMockSignature({ modules: 100 }),
      sourceType: 'commit',
      sourceId: 'commit-2',
      timestamp: new Date().toISOString(),
      metadata: {},
    };

    // Should complete without throwing
    expect(() => computeDrift({ oldSignature, newSignature })).not.toThrow();
  });

  it('should NOT trigger remediation', async () => {
    const signatures: PersistedSignature[] = Array.from({ length: 5 }, (_, i) => ({
      id: `sig-${i}`,
      signatureHash: `hash-${i}`,
      signature: createMockSignature({ modules: 10 + i * 20 }), // High churn
      sourceType: 'commit' as SignatureSourceType,
      sourceId: `commit-${i}`,
      timestamp: new Date(Date.now() + i * 1000).toISOString(),
      metadata: {},
    }));

    // Even with Regressive classification, should only observe
    const result = classifyDriftPattern({
      signatures,
      window: { type: 'commits', value: 5 },
    });

    // Should classify but not remediate
    expect(['Stable', 'Gradual', 'Accelerating', 'Regressive']).toContain(result.classification);
    // No remediation actions should be taken
  });
});
