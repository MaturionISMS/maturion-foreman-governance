/**
 * Wave 3A: Architecture Constraint Foundations - Red QA Test Suite
 * 
 * This test suite validates the Constraint Taxonomy, Architecture Signatures,
 * and Constraint Registry implementations.
 * 
 * These tests are designed to be RED (failing) initially, then turn GREEN
 * as the implementation is completed following the Build Philosophy.
 * 
 * Test Categories:
 * 1. Constraint Taxonomy - Type definitions and categorization
 * 2. Architecture Signatures - Deterministic generation and versioning
 * 3. Constraint Registry - Read-only operations and validation
 * 4. Integration - End-to-end workflows
 */

import {
  ConstraintType,
  ConstraintSeverity,
  ConstraintScope,
  ConstraintDeclaration,
  ArchitectureSignature,
  ModuleSignature,
  SignatureComparisonResult,
  ConstraintQueryResult,
} from '../../types/constraints';

// Import functions to be implemented
import {
  getAllConstraints,
  getConstraintById,
  queryConstraints,
  validateConstraint,
  generateArchitectureSignature,
  compareSignatures,
  hashSignature,
  loadSignatureFromFile,
  saveSignatureToFile,
} from '../../lib/foreman/constraints';

describe('Wave 3A: Constraint Taxonomy', () => {
  describe('Type Definitions', () => {
    it('should have valid ConstraintType values', () => {
      const validTypes: ConstraintType[] = ['structural', 'contract', 'governance'];
      
      validTypes.forEach(type => {
        const constraint: Partial<ConstraintDeclaration> = {
          type,
        };
        expect(constraint.type).toBeDefined();
      });
    });

    it('should have valid ConstraintSeverity values', () => {
      const validSeverities: ConstraintSeverity[] = ['critical', 'high', 'medium', 'low'];
      
      validSeverities.forEach(severity => {
        const constraint: Partial<ConstraintDeclaration> = {
          severity,
        };
        expect(constraint.severity).toBeDefined();
      });
    });

    it('should have valid ConstraintScope patterns', () => {
      const validScopes: ConstraintScope[] = [
        'global',
        'module:foreman',
        'layer:application',
        'path:/lib/foreman/*',
      ];
      
      validScopes.forEach(scope => {
        const constraint: Partial<ConstraintDeclaration> = {
          scope,
        };
        expect(constraint.scope).toBeDefined();
      });
    });
  });

  describe('Constraint Declaration Structure', () => {
    it('should validate a complete constraint declaration', () => {
      const constraint: ConstraintDeclaration = {
        id: 'structural.no-circular-deps',
        version: '1.0.0',
        type: 'structural',
        category: 'dependency_direction',
        rule: 'No circular dependencies allowed',
        scope: 'global',
        severity: 'critical',
        owner: 'foreman',
        source: '/foreman/constitution/architectural-rules.md',
        examples: {
          valid: ['Module A → B → C (acyclic)'],
          invalid: ['Module A → B → A (circular)'],
        },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = validateConstraint(constraint);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject incomplete constraint declaration', () => {
      const incompleteConstraint = {
        id: 'test.incomplete',
        type: 'structural',
        // Missing required fields
      } as any;

      const result = validateConstraint(incompleteConstraint);
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject invalid constraint type', () => {
      const invalidConstraint = {
        id: 'test.invalid',
        version: '1.0.0',
        type: 'invalid-type',
        category: 'test',
        rule: 'Test rule',
        scope: 'global',
        severity: 'low',
        owner: 'test',
        source: 'test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as any;

      const result = validateConstraint(invalidConstraint);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid constraint type');
    });
  });
});

describe('Wave 3A: Architecture Signatures', () => {
  describe('Signature Generation', () => {
    it('should generate a complete architecture signature', async () => {
      const signature = await generateArchitectureSignature();
      
      expect(signature).toBeDefined();
      expect(signature.version).toMatch(/^\d+\.\d+\.\d+$/); // Semver
      expect(signature.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/); // ISO 8601
      expect(signature.repository).toBeDefined();
      expect(signature.repository.commit).toMatch(/^[a-f0-9]{40}$/); // Git SHA
      expect(signature.structure).toBeDefined();
      expect(signature.contracts).toBeDefined();
      expect(signature.governance).toBeDefined();
      expect(signature.hash).toMatch(/^[a-f0-9]{64}$/); // SHA-256
    });

    it('should generate deterministic signatures', async () => {
      const signature1 = await generateArchitectureSignature();
      const signature2 = await generateArchitectureSignature();
      
      expect(signature1.hash).toBe(signature2.hash);
    });

    it('should include all modules in signature', async () => {
      const signature = await generateArchitectureSignature();
      
      expect(signature.structure.modules).toBeDefined();
      expect(signature.structure.modules.length).toBeGreaterThan(0);
      
      // Check module structure
      signature.structure.modules.forEach(module => {
        expect(module.name).toBeDefined();
        expect(module.path).toBeDefined();
        expect(module.exports).toBeInstanceOf(Array);
        expect(module.imports).toBeInstanceOf(Array);
        expect(module.layer).toBeDefined();
        expect(module.hash).toMatch(/^[a-f0-9]{64}$/);
      });
    });

    it('should include dependency graph in signature', async () => {
      const signature = await generateArchitectureSignature();
      
      expect(signature.structure.dependencies).toBeDefined();
      expect(signature.structure.dependencies.nodes).toBeInstanceOf(Array);
      expect(signature.structure.dependencies.edges).toBeInstanceOf(Array);
      
      // Check dependency structure
      signature.structure.dependencies.edges.forEach(edge => {
        expect(edge.from).toBeDefined();
        expect(edge.to).toBeDefined();
        expect(['import', 'require']).toContain(edge.type);
      });
    });

    it('should include protected paths in governance section', async () => {
      const signature = await generateArchitectureSignature();
      
      expect(signature.governance.protectedPaths).toBeDefined();
      expect(signature.governance.protectedPaths).toContain('.github/foreman/');
      expect(signature.governance.protectedPaths).toContain('BUILD_PHILOSOPHY.md');
      expect(signature.governance.protectedPaths).toContain('foreman/constitution/');
    });
  });

  describe('Signature Hashing', () => {
    it('should generate consistent hashes for same signature', () => {
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [],
          dependencies: { nodes: [], edges: [] },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: [],
          constraints: [],
          version: '1.0.0',
        },
        hash: '',
      };

      const hash1 = hashSignature(signature);
      const hash2 = hashSignature(signature);
      
      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should generate different hashes for different signatures', () => {
      const signature1: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [],
          dependencies: { nodes: [], edges: [] },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: [],
          constraints: [],
          version: '1.0.0',
        },
        hash: '',
      };

      const signature2: ArchitectureSignature = {
        ...signature1,
        repository: {
          ...signature1.repository,
          commit: 'b'.repeat(40),
        },
      };

      const hash1 = hashSignature(signature1);
      const hash2 = hashSignature(signature2);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('Signature Comparison', () => {
    it('should detect identical signatures', () => {
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [],
          dependencies: { nodes: [], edges: [] },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: [],
          constraints: [],
          version: '1.0.0',
        },
        hash: '',
      };

      signature.hash = hashSignature(signature);

      const result = compareSignatures(signature, signature);
      
      expect(result.identical).toBe(true);
      expect(result.differences).toEqual([]);
      expect(result.oldHash).toBe(result.newHash);
    });

    it('should detect added modules', () => {
      const oldSignature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [],
          dependencies: { nodes: [], edges: [] },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: [],
          constraints: [],
          version: '1.0.0',
        },
        hash: '',
      };

      const newSignature: ArchitectureSignature = {
        ...oldSignature,
        structure: {
          ...oldSignature.structure,
          modules: [{
            name: 'new-module',
            path: '/lib/new-module.ts',
            exports: ['func1'],
            imports: [],
            layer: 'application',
            hash: 'a'.repeat(64),
          }],
        },
      };

      oldSignature.hash = hashSignature(oldSignature);
      newSignature.hash = hashSignature(newSignature);

      const result = compareSignatures(oldSignature, newSignature);
      
      expect(result.identical).toBe(false);
      expect(result.differences.length).toBeGreaterThan(0);
      expect(result.differences.some(d => d.type === 'added' && d.path.includes('module'))).toBe(true);
    });

    it('should detect modified modules', () => {
      const module1: ModuleSignature = {
        name: 'test-module',
        path: '/lib/test.ts',
        exports: ['func1'],
        imports: [],
        layer: 'application',
        hash: 'a'.repeat(64),
      };

      const module2: ModuleSignature = {
        ...module1,
        hash: 'b'.repeat(64), // Content changed
      };

      const oldSignature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [module1],
          dependencies: { nodes: [], edges: [] },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: [],
          constraints: [],
          version: '1.0.0',
        },
        hash: '',
      };

      const newSignature: ArchitectureSignature = {
        ...oldSignature,
        structure: {
          ...oldSignature.structure,
          modules: [module2],
        },
      };

      oldSignature.hash = hashSignature(oldSignature);
      newSignature.hash = hashSignature(newSignature);

      const result = compareSignatures(oldSignature, newSignature);
      
      expect(result.identical).toBe(false);
      expect(result.differences.length).toBeGreaterThan(0);
      expect(result.differences.some(d => d.type === 'modified')).toBe(true);
    });
  });

  describe('Signature Persistence', () => {
    const testPath = '/tmp/test-wave3a-signature.json';

    it('should save signature to file', async () => {
      const signature = await generateArchitectureSignature();
      
      await saveSignatureToFile(signature, testPath);
      
      const loaded = await loadSignatureFromFile(testPath);
      
      expect(loaded.hash).toBe(signature.hash);
      expect(loaded.version).toBe(signature.version);
    });

    it('should load signature from file', async () => {
      // First save a signature
      const signature = await generateArchitectureSignature();
      await saveSignatureToFile(signature, testPath);
      
      // Then load it
      const loaded = await loadSignatureFromFile(testPath);
      
      expect(loaded).toBeDefined();
      expect(loaded.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(loaded.hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });
});

describe('Wave 3A: Constraint Registry', () => {
  describe('Registry Operations', () => {
    it('should list all registered constraints', async () => {
      const constraints = await getAllConstraints();
      
      expect(constraints).toBeDefined();
      expect(Array.isArray(constraints)).toBe(true);
      
      // Validate each constraint structure
      constraints.forEach(constraint => {
        expect(constraint.id).toBeDefined();
        expect(constraint.version).toMatch(/^\d+\.\d+\.\d+$/);
        expect(constraint.type).toBeDefined();
        expect(constraint.rule).toBeDefined();
        expect(constraint.scope).toBeDefined();
        expect(constraint.severity).toBeDefined();
      });
    });

    it('should get constraint by ID', async () => {
      const testId = 'structural.no-circular-deps';
      const constraint = await getConstraintById(testId);
      
      if (constraint) {
        expect(constraint.id).toBe(testId);
        expect(constraint.type).toBe('structural');
      } else {
        // Constraint might not exist in registry yet
        expect(constraint).toBeNull();
      }
    });

    it('should return null for non-existent constraint', async () => {
      const constraint = await getConstraintById('non-existent-constraint');
      
      expect(constraint).toBeNull();
    });

    it('should query constraints by type', async () => {
      const result = await queryConstraints({ type: 'structural' });
      
      expect(result).toBeDefined();
      expect(result.constraints).toBeInstanceOf(Array);
      expect(result.total).toBeGreaterThanOrEqual(0);
      expect(result.filtered).toBeLessThanOrEqual(result.total);
      
      // All returned constraints should match the filter
      result.constraints.forEach(constraint => {
        expect(constraint.type).toBe('structural');
      });
    });

    it('should query constraints by severity', async () => {
      const result = await queryConstraints({ severity: 'critical' });
      
      expect(result).toBeDefined();
      expect(result.constraints).toBeInstanceOf(Array);
      
      result.constraints.forEach(constraint => {
        expect(constraint.severity).toBe('critical');
      });
    });

    it('should query constraints by multiple filters', async () => {
      const result = await queryConstraints({
        type: 'governance',
        severity: 'critical',
      });
      
      expect(result).toBeDefined();
      expect(result.constraints).toBeInstanceOf(Array);
      
      result.constraints.forEach(constraint => {
        expect(constraint.type).toBe('governance');
        expect(constraint.severity).toBe('critical');
      });
    });

    it('should return empty result for no matches', async () => {
      const result = await queryConstraints({
        type: 'structural',
        severity: 'critical',
        scope: 'module:non-existent-module',
      });
      
      expect(result).toBeDefined();
      expect(result.constraints).toEqual([]);
      expect(result.filtered).toBe(0);
    });
  });

  describe('Registry Validation', () => {
    it('should validate constraint with all required fields', () => {
      const validConstraint: ConstraintDeclaration = {
        id: 'test.valid',
        version: '1.0.0',
        type: 'contract',
        category: 'api_stability',
        rule: 'Test rule',
        scope: 'global',
        severity: 'medium',
        owner: 'foreman',
        source: '/test/source.md',
        examples: {
          valid: ['example 1'],
          invalid: ['example 2'],
        },
        metadata: { test: true },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = validateConstraint(validConstraint);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject constraint with missing version', () => {
      const invalid = {
        id: 'test.invalid',
        type: 'structural',
        category: 'test',
        rule: 'Test',
        scope: 'global',
        severity: 'low',
        owner: 'test',
        source: 'test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as any;

      const result = validateConstraint(invalid);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required field: version');
    });

    it('should reject constraint with invalid semver version', () => {
      const invalid: any = {
        id: 'test.invalid',
        version: 'not-semver',
        type: 'structural',
        category: 'test',
        rule: 'Test',
        scope: 'global',
        severity: 'low',
        owner: 'test',
        source: 'test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = validateConstraint(invalid);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('version'))).toBe(true);
    });
  });
});

describe('Wave 3A: Integration Tests', () => {
  describe('End-to-End Workflow', () => {
    it('should generate signature and validate against registry', async () => {
      // Generate current architecture signature
      const signature = await generateArchitectureSignature();
      expect(signature).toBeDefined();
      
      // Get all constraints from registry
      const constraints = await getAllConstraints();
      expect(constraints).toBeDefined();
      
      // Verify governance constraints reference protected paths in signature
      const governanceConstraints = await queryConstraints({ type: 'governance' });
      expect(governanceConstraints.constraints).toBeDefined();
      
      // Verify signature includes protected paths
      expect(signature.governance.protectedPaths.length).toBeGreaterThan(0);
    });

    it('should detect drift between two signatures', async () => {
      // Generate baseline signature
      const baseline = await generateArchitectureSignature();
      
      // Simulate a change (would happen in real codebase)
      // For test: just use same signature to verify comparison works
      const current = await generateArchitectureSignature();
      
      // Compare signatures
      const comparison = compareSignatures(baseline, current);
      
      expect(comparison).toBeDefined();
      expect(comparison.identical).toBeDefined();
      expect(comparison.differences).toBeDefined();
      expect(comparison.oldHash).toBe(baseline.hash);
      expect(comparison.newHash).toBe(current.hash);
    });
  });

  describe('Version Stability', () => {
    it('should maintain signature schema version stability', async () => {
      const signature = await generateArchitectureSignature();
      
      // Version should be stable for Wave 3A
      expect(signature.version).toBe('1.0.0');
    });

    it('should maintain constraint declaration version stability', async () => {
      const constraints = await getAllConstraints();
      
      // All constraints should have valid semver versions
      constraints.forEach(constraint => {
        expect(constraint.version).toMatch(/^\d+\.\d+\.\d+$/);
      });
    });
  });
});
