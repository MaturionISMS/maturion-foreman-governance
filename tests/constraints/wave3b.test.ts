/**
 * Wave 3B: Constraint Violation Detection & Classification - Red QA Test Suite
 * 
 * This test suite validates the Violation Detection Engine, Classification Engine,
 * and Telemetry & Reporting systems.
 * 
 * These tests are designed to be RED (failing) initially, then turn GREEN
 * as the implementation is completed following the Build Philosophy.
 * 
 * Test Categories:
 * 1. Violation Detection - Correct detection of all violation types
 * 2. Violation Classification - Severity, category, nature assignment
 * 3. False Positive Resistance - Valid code doesn't trigger violations
 * 4. Telemetry Integration - Events, Memory Fabric, FL/CI, non-blocking
 * 5. Integration - End-to-end workflows
 */

import {
  ArchitectureSignature,
  ConstraintDeclaration,
  ModuleSignature,
} from '../../types/constraints';

import {
  ViolationReport,
  ClassifiedViolationReport,
  RawViolation,
  ClassifiedViolation,
  StructuralViolation,
  ContractViolation,
  GovernanceViolation,
  ViolationSeverity,
  ViolationCategory,
  ViolationNature,
  ViolationEvent,
  FLCIClassification,
  ViolationQueryFilters,
} from '../../types/violations';

// Import functions to be implemented
import {
  detectViolations,
  detectStructuralViolations,
  detectContractViolations,
  detectGovernanceViolations,
} from '../../lib/foreman/constraints/detection/violation-detector';

import {
  classifyViolation,
  classifyViolationReport,
  aggregateBySeverity,
  aggregateByCategory,
  identifyFalsePositives,
} from '../../lib/foreman/constraints/detection/violation-classifier';

import {
  emitViolationEvent,
  emitViolationBatch,
  storeViolationInMemory,
  queryViolationsFromMemory,
  classifyForFLCI,
  generateLearningSuggestion,
} from '../../lib/foreman/constraints/detection/telemetry';

describe('Wave 3B: Violation Detection', () => {
  describe('Structural Violation Detection', () => {
    it('should detect circular dependencies', async () => {
      // Create signature with circular dependency
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [
            {
              name: 'moduleA',
              path: '/lib/moduleA.ts',
              exports: ['funcA'],
              imports: ['./moduleB'],
              layer: 'application',
              hash: 'a'.repeat(64),
            },
            {
              name: 'moduleB',
              path: '/lib/moduleB.ts',
              exports: ['funcB'],
              imports: ['./moduleA'], // Circular!
              layer: 'application',
              hash: 'b'.repeat(64),
            },
          ],
          dependencies: {
            nodes: ['moduleA', 'moduleB'],
            edges: [
              { from: 'moduleA', to: 'moduleB', type: 'import' },
              { from: 'moduleB', to: 'moduleA', type: 'import' }, // Circular!
            ],
          },
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
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
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
        },
      ];

      const violations = await detectStructuralViolations(signature, constraints);

      expect(violations.length).toBeGreaterThan(0);
      expect(violations[0].structuralType).toBe('circular_dependency');
      expect(violations[0].affectedModules).toContain('moduleA');
      expect(violations[0].affectedModules).toContain('moduleB');
      expect(violations[0].dependencyChain).toBeDefined();
    });

    it('should detect layer violations', async () => {
      // Create signature with layer violation
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [
            {
              name: 'appModule',
              path: '/lib/app.ts',
              exports: ['app'],
              imports: ['./infra'], // App importing infrastructure - wrong direction!
              layer: 'application',
              hash: 'a'.repeat(64),
            },
            {
              name: 'infraModule',
              path: '/lib/infra.ts',
              exports: ['infra'],
              imports: [],
              layer: 'infrastructure',
              hash: 'b'.repeat(64),
            },
          ],
          dependencies: {
            nodes: ['appModule', 'infraModule'],
            edges: [
              { from: 'appModule', to: 'infraModule', type: 'import' },
            ],
          },
          layers: [
            {
              name: 'application',
              description: 'Application layer',
              allowedDependencies: [], // Cannot depend on infrastructure
              modules: ['appModule'],
            },
            {
              name: 'infrastructure',
              description: 'Infrastructure layer',
              allowedDependencies: [],
              modules: ['infraModule'],
            },
          ],
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
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
          id: 'structural.layer-dependency',
          version: '1.0.0',
          type: 'structural',
          category: 'layer_violation',
          rule: 'Layers must respect dependency rules',
          scope: 'global',
          severity: 'high',
          owner: 'foreman',
          source: '/foreman/constitution/architectural-rules.md',
          examples: {
            valid: ['Infrastructure → Domain → Application'],
            invalid: ['Application → Infrastructure'],
          },
          metadata: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const violations = await detectStructuralViolations(signature, constraints);

      expect(violations.length).toBeGreaterThan(0);
      expect(violations[0].structuralType).toBe('layer_violation');
      expect(violations[0].description).toContain('application');
      expect(violations[0].description).toContain('infrastructure');
    });

    it('should not detect violations in valid structure', async () => {
      // Create signature with valid structure
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [
            {
              name: 'moduleA',
              path: '/lib/moduleA.ts',
              exports: ['funcA'],
              imports: ['./moduleB'], // One direction only - valid
              layer: 'application',
              hash: 'a'.repeat(64),
            },
            {
              name: 'moduleB',
              path: '/lib/moduleB.ts',
              exports: ['funcB'],
              imports: [], // No circular import
              layer: 'application',
              hash: 'b'.repeat(64),
            },
          ],
          dependencies: {
            nodes: ['moduleA', 'moduleB'],
            edges: [
              { from: 'moduleA', to: 'moduleB', type: 'import' },
            ],
          },
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
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
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
        },
      ];

      const violations = await detectStructuralViolations(signature, constraints);

      expect(violations.length).toBe(0);
    });
  });

  describe('Contract Violation Detection', () => {
    it('should detect breaking API changes', async () => {
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
          apis: [
            {
              endpoint: '/api/test',
              method: 'GET',
              requestSchema: {},
              responseSchema: { data: 'string' },
              version: '1.0.0',
            },
          ],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: [],
          constraints: [],
          version: '1.0.0',
        },
        hash: 'old'.repeat(16),
      };

      const newSignature: ArchitectureSignature = {
        ...oldSignature,
        repository: {
          ...oldSignature.repository,
          commit: 'b'.repeat(40),
        },
        contracts: {
          apis: [
            {
              endpoint: '/api/test',
              method: 'GET',
              requestSchema: {},
              responseSchema: { result: 'string' }, // Changed field name - breaking!
              version: '2.0.0',
            },
          ],
          types: [],
          events: [],
        },
        hash: 'new'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
          id: 'contract.api-stability',
          version: '1.0.0',
          type: 'contract',
          category: 'api_stability',
          rule: 'Public APIs must maintain backward compatibility',
          scope: 'global',
          severity: 'high',
          owner: 'foreman',
          source: '/foreman/constitution/api-rules.md',
          examples: {
            valid: ['Adding optional fields', 'New endpoints'],
            invalid: ['Removing fields', 'Changing field types'],
          },
          metadata: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const violations = await detectContractViolations(oldSignature, newSignature, constraints);

      expect(violations.length).toBeGreaterThan(0);
      expect(violations[0].contractType).toBe('api');
      expect(violations[0].breakingChange).toBe(true);
      expect(violations[0].oldVersion).toBe('1.0.0');
      expect(violations[0].newVersion).toBe('2.0.0');
    });
  });

  describe('Governance Violation Detection', () => {
    it('should detect protected path modifications', async () => {
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [
            {
              name: 'BUILD_PHILOSOPHY',
              path: 'BUILD_PHILOSOPHY.md', // Protected file!
              exports: [],
              imports: [],
              layer: 'constitutional',
              hash: 'modified'.repeat(8), // Hash changed - file modified!
            },
          ],
          dependencies: { nodes: [], edges: [] },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: ['BUILD_PHILOSOPHY.md', '.github/foreman/', 'foreman/constitution/'],
          constraints: [],
          version: '1.0.0',
        },
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
          id: 'governance.protected-paths',
          version: '1.0.0',
          type: 'governance',
          category: 'protected_path',
          rule: 'Protected files must not be modified by agents',
          scope: 'global',
          severity: 'critical',
          owner: 'johan',
          source: '/foreman/constitution/governance-rules.md',
          examples: {
            valid: ['Reading protected files', 'Agent-created files'],
            invalid: ['Modifying BUILD_PHILOSOPHY.md', 'Changing workflows'],
          },
          metadata: {
            protectedPaths: ['BUILD_PHILOSOPHY.md', '.github/foreman/', 'foreman/constitution/'],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const violations = await detectGovernanceViolations(signature, constraints);

      expect(violations.length).toBeGreaterThan(0);
      expect(violations[0].governanceType).toBe('protected_path');
      expect(violations[0].protectedFile).toContain('BUILD_PHILOSOPHY');
    });
  });

  describe('Complete Violation Detection', () => {
    it('should detect all violation types in one scan', async () => {
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [
            {
              name: 'moduleA',
              path: '/lib/moduleA.ts',
              exports: [],
              imports: ['./moduleB'],
              layer: 'application',
              hash: 'a'.repeat(64),
            },
            {
              name: 'moduleB',
              path: '/lib/moduleB.ts',
              exports: [],
              imports: ['./moduleA'], // Circular dependency
              layer: 'application',
              hash: 'b'.repeat(64),
            },
            {
              name: 'BUILD_PHILOSOPHY',
              path: 'BUILD_PHILOSOPHY.md', // Protected file
              exports: [],
              imports: [],
              layer: 'constitutional',
              hash: 'modified'.repeat(8),
            },
          ],
          dependencies: {
            nodes: ['moduleA', 'moduleB'],
            edges: [
              { from: 'moduleA', to: 'moduleB', type: 'import' },
              { from: 'moduleB', to: 'moduleA', type: 'import' },
            ],
          },
          layers: [],
        },
        contracts: {
          apis: [],
          types: [],
          events: [],
        },
        governance: {
          protectedPaths: ['BUILD_PHILOSOPHY.md'],
          constraints: [],
          version: '1.0.0',
        },
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
          id: 'structural.no-circular-deps',
          version: '1.0.0',
          type: 'structural',
          category: 'dependency_direction',
          rule: 'No circular dependencies',
          scope: 'global',
          severity: 'critical',
          owner: 'foreman',
          source: '/test',
          examples: { valid: [], invalid: [] },
          metadata: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'governance.protected-paths',
          version: '1.0.0',
          type: 'governance',
          category: 'protected_path',
          rule: 'No protected file modifications',
          scope: 'global',
          severity: 'critical',
          owner: 'johan',
          source: '/test',
          examples: { valid: [], invalid: [] },
          metadata: {
            protectedPaths: ['BUILD_PHILOSOPHY.md'],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const report = await detectViolations(signature, constraints);

      expect(report.violations.length).toBeGreaterThan(0);
      expect(report.summary.total).toBeGreaterThan(0);
      expect(report.summary.byType.structural).toBeDefined();
      expect(report.summary.byType.governance).toBeDefined();
    });

    it('should be deterministic (same input → same output)', async () => {
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
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [];

      const report1 = await detectViolations(signature, constraints);
      const report2 = await detectViolations(signature, constraints);

      expect(report1.violations.length).toBe(report2.violations.length);
      expect(report1.summary.total).toBe(report2.summary.total);
    });
  });
});

describe('Wave 3B: Violation Classification', () => {
  describe('Severity Classification', () => {
    it('should classify critical violations correctly', () => {
      const rawViolation: RawViolation = {
        constraintId: 'governance.protected-paths',
        type: 'governance',
        description: 'Protected file modified',
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const constraint: ConstraintDeclaration = {
        id: 'governance.protected-paths',
        version: '1.0.0',
        type: 'governance',
        category: 'protected_path',
        rule: 'Protected files must not be modified',
        scope: 'global',
        severity: 'critical',
        owner: 'johan',
        source: '/test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const classified = classifyViolation(rawViolation, constraint);

      expect(classified.severity).toBe('critical');
      expect(classified.id).toBeDefined();
    });

    it('should elevate governance violations by one level', () => {
      const rawViolation: RawViolation = {
        constraintId: 'governance.test',
        type: 'governance',
        description: 'Governance violation',
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const constraint: ConstraintDeclaration = {
        id: 'governance.test',
        version: '1.0.0',
        type: 'governance',
        category: 'constitutional',
        rule: 'Test rule',
        scope: 'global',
        severity: 'medium', // Should be elevated to high
        owner: 'test',
        source: '/test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const classified = classifyViolation(rawViolation, constraint);

      expect(classified.severity).toBe('high'); // Elevated from medium
    });
  });

  describe('Category Classification', () => {
    it('should assign category from constraint', () => {
      const rawViolation: RawViolation = {
        constraintId: 'structural.circular',
        type: 'structural',
        description: 'Circular dependency detected',
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const constraint: ConstraintDeclaration = {
        id: 'structural.circular',
        version: '1.0.0',
        type: 'structural',
        category: 'dependency_direction',
        rule: 'No circular dependencies',
        scope: 'global',
        severity: 'critical',
        owner: 'foreman',
        source: '/test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const classified = classifyViolation(rawViolation, constraint);

      expect(classified.category).toBe('dependency_direction');
    });
  });

  describe('Nature Classification', () => {
    it('should classify governance violations as nature: governance', () => {
      const rawViolation: RawViolation = {
        constraintId: 'governance.test',
        type: 'governance',
        description: 'Governance violation',
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const constraint: ConstraintDeclaration = {
        id: 'governance.test',
        version: '1.0.0',
        type: 'governance',
        category: 'protected_path',
        rule: 'Test',
        scope: 'global',
        severity: 'critical',
        owner: 'test',
        source: '/test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const classified = classifyViolation(rawViolation, constraint);

      expect(classified.nature).toBe('governance');
    });

    it('should classify structural violations as nature: structural', () => {
      const rawViolation: RawViolation = {
        constraintId: 'structural.test',
        type: 'structural',
        description: 'Structural violation',
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const constraint: ConstraintDeclaration = {
        id: 'structural.test',
        version: '1.0.0',
        type: 'structural',
        category: 'layer_violation',
        rule: 'Test',
        scope: 'global',
        severity: 'high',
        owner: 'test',
        source: '/test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const classified = classifyViolation(rawViolation, constraint);

      expect(classified.nature).toBe('structural');
    });

    it('should classify contract violations as nature: contract', () => {
      const rawViolation: RawViolation = {
        constraintId: 'contract.test',
        type: 'contract',
        description: 'Contract violation',
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const constraint: ConstraintDeclaration = {
        id: 'contract.test',
        version: '1.0.0',
        type: 'contract',
        category: 'api_stability',
        rule: 'Test',
        scope: 'global',
        severity: 'high',
        owner: 'test',
        source: '/test',
        examples: { valid: [], invalid: [] },
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const classified = classifyViolation(rawViolation, constraint);

      expect(classified.nature).toBe('contract');
    });
  });

  describe('Complete Report Classification', () => {
    it('should classify entire violation report', () => {
      const rawReport: ViolationReport = {
        signatureHash: 'test'.repeat(16),
        commit: 'a'.repeat(40),
        timestamp: new Date().toISOString(),
        violations: [
          {
            constraintId: 'structural.circular',
            type: 'structural',
            description: 'Circular dependency',
            context: {},
            detectedAt: new Date().toISOString(),
          },
          {
            constraintId: 'governance.protected',
            type: 'governance',
            description: 'Protected file modified',
            context: {},
            detectedAt: new Date().toISOString(),
          },
        ],
        summary: {
          total: 2,
          byType: {
            structural: 1,
            governance: 1,
            contract: 0,
          },
        },
      };

      const constraints: ConstraintDeclaration[] = [
        {
          id: 'structural.circular',
          version: '1.0.0',
          type: 'structural',
          category: 'dependency_direction',
          rule: 'No circular deps',
          scope: 'global',
          severity: 'critical',
          owner: 'foreman',
          source: '/test',
          examples: { valid: [], invalid: [] },
          metadata: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'governance.protected',
          version: '1.0.0',
          type: 'governance',
          category: 'protected_path',
          rule: 'No protected modifications',
          scope: 'global',
          severity: 'critical',
          owner: 'johan',
          source: '/test',
          examples: { valid: [], invalid: [] },
          metadata: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const classifiedReport = classifyViolationReport(rawReport, constraints);

      expect(classifiedReport.violations.length).toBe(2);
      expect(classifiedReport.summary.total).toBe(2);
      expect(classifiedReport.summary.bySeverity.critical).toBeGreaterThan(0);
      expect(classifiedReport.summary.byNature.structural).toBe(1);
      expect(classifiedReport.summary.byNature.governance).toBe(1);
    });
  });

  describe('Aggregation Functions', () => {
    it('should aggregate violations by severity', () => {
      const violations: ClassifiedViolation[] = [
        {
          id: '1',
          constraintId: 'test.1',
          type: 'structural',
          description: 'Test 1',
          severity: 'critical',
          category: 'dependency_direction',
          nature: 'structural',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
        {
          id: '2',
          constraintId: 'test.2',
          type: 'governance',
          description: 'Test 2',
          severity: 'high',
          category: 'protected_path',
          nature: 'governance',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
        {
          id: '3',
          constraintId: 'test.3',
          type: 'structural',
          description: 'Test 3',
          severity: 'critical',
          category: 'layer_violation',
          nature: 'structural',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
      ];

      const aggregate = aggregateBySeverity(violations);

      expect(aggregate.critical).toBe(2);
      expect(aggregate.high).toBe(1);
      expect(aggregate.medium).toBe(0);
    });

    it('should aggregate violations by category', () => {
      const violations: ClassifiedViolation[] = [
        {
          id: '1',
          constraintId: 'test.1',
          type: 'structural',
          description: 'Test 1',
          severity: 'critical',
          category: 'dependency_direction',
          nature: 'structural',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
        {
          id: '2',
          constraintId: 'test.2',
          type: 'structural',
          description: 'Test 2',
          severity: 'high',
          category: 'dependency_direction',
          nature: 'structural',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
      ];

      const aggregate = aggregateByCategory(violations);

      expect(aggregate.dependency_direction).toBe(2);
      expect(aggregate.layer_violation).toBe(0);
    });
  });

  describe('False Positive Identification', () => {
    it('should identify false positive candidates', () => {
      const violations: ClassifiedViolation[] = [
        {
          id: '1',
          constraintId: 'test.1',
          type: 'structural',
          description: 'Test 1',
          severity: 'info', // Info severity suggests false positive
          category: 'dependency_direction',
          nature: 'structural',
          falsePositive: true,
          context: {},
          detectedAt: new Date().toISOString(),
        },
        {
          id: '2',
          constraintId: 'test.2',
          type: 'governance',
          description: 'Test 2',
          severity: 'critical', // Real violation
          category: 'protected_path',
          nature: 'governance',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
      ];

      const falsePositives = identifyFalsePositives(violations);

      expect(falsePositives.length).toBe(1);
      expect(falsePositives[0].id).toBe('1');
      expect(falsePositives[0].falsePositive).toBe(true);
    });
  });
});

describe('Wave 3B: Telemetry Integration', () => {
  describe('Event Emission', () => {
    it('should emit violation event (non-blocking)', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'test.constraint',
        type: 'structural',
        description: 'Test violation',
        severity: 'high',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      // Should not throw even if emission fails
      await expect(emitViolationEvent(violation)).resolves.not.toThrow();
    });

    it('should emit batch of violations (non-blocking)', async () => {
      const violations: ClassifiedViolation[] = [
        {
          id: '1',
          constraintId: 'test.1',
          type: 'structural',
          description: 'Test 1',
          severity: 'high',
          category: 'dependency_direction',
          nature: 'structural',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
        {
          id: '2',
          constraintId: 'test.2',
          type: 'governance',
          description: 'Test 2',
          severity: 'critical',
          category: 'protected_path',
          nature: 'governance',
          falsePositive: false,
          context: {},
          detectedAt: new Date().toISOString(),
        },
      ];

      // Should not throw
      await expect(emitViolationBatch(violations)).resolves.not.toThrow();
    });

    it('should complete emission quickly (< 100ms)', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'test.constraint',
        type: 'structural',
        description: 'Test violation',
        severity: 'high',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const start = Date.now();
      await emitViolationEvent(violation);
      const duration = Date.now() - start;

      // Non-blocking operations should complete very quickly
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Memory Fabric Storage', () => {
    it('should store violation in Memory Fabric (non-blocking)', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'test.constraint',
        type: 'structural',
        description: 'Test violation',
        severity: 'high',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      // Should not throw
      await expect(storeViolationInMemory(violation)).resolves.not.toThrow();
    });

    it('should query violations from Memory Fabric', async () => {
      const filters: ViolationQueryFilters = {
        severity: 'critical',
        nature: 'governance',
      };

      const violations = await queryViolationsFromMemory(filters);

      expect(Array.isArray(violations)).toBe(true);
      // Should not throw even if Memory Fabric is unavailable
    });

    it('should handle Memory Fabric failures gracefully', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'test.constraint',
        type: 'structural',
        description: 'Test violation',
        severity: 'high',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      // Even if Memory Fabric is down, should not throw
      await expect(storeViolationInMemory(violation)).resolves.not.toThrow();
    });
  });

  describe('FL/CI Integration', () => {
    it('should classify violation for FL/CI', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'test.constraint',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const flciClassification = classifyForFLCI(violation);

      expect(flciClassification.violationId).toBe('test-violation-1');
      expect(flciClassification.flCategory).toBeDefined();
      expect(flciClassification.ciAction).toBeDefined();
      expect(flciClassification.priority).toBeDefined();
      expect(flciClassification.learningSuggestion).toBeDefined();
    });

    it('should generate learning suggestion', () => {
      const violation: ClassifiedViolation = {
        id: 'test-violation-1',
        constraintId: 'test.constraint',
        type: 'structural',
        description: 'Circular dependency detected',
        severity: 'critical',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      const suggestion = generateLearningSuggestion(violation);

      expect(suggestion.violationId).toBe('test-violation-1');
      expect(suggestion.suggestion).toBeDefined();
      expect(suggestion.targetDocument).toBeDefined();
      expect(suggestion.proposedChange).toBeDefined();
      expect(suggestion.reasoning).toBeDefined();
    });
  });
});

describe('Wave 3B: Integration Tests', () => {
  describe('End-to-End Workflow', () => {
    it('should detect, classify, and report violations', async () => {
      // Create test signature with violations
      const signature: ArchitectureSignature = {
        version: '1.0.0',
        timestamp: '2025-12-13T00:00:00Z',
        repository: {
          url: 'https://github.com/test/repo',
          commit: 'a'.repeat(40),
          branch: 'main',
        },
        structure: {
          modules: [
            {
              name: 'moduleA',
              path: '/lib/moduleA.ts',
              exports: [],
              imports: ['./moduleB'],
              layer: 'application',
              hash: 'a'.repeat(64),
            },
            {
              name: 'moduleB',
              path: '/lib/moduleB.ts',
              exports: [],
              imports: ['./moduleA'], // Circular!
              layer: 'application',
              hash: 'b'.repeat(64),
            },
          ],
          dependencies: {
            nodes: ['moduleA', 'moduleB'],
            edges: [
              { from: 'moduleA', to: 'moduleB', type: 'import' },
              { from: 'moduleB', to: 'moduleA', type: 'import' },
            ],
          },
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
        hash: 'test'.repeat(16),
      };

      const constraints: ConstraintDeclaration[] = [
        {
          id: 'structural.no-circular-deps',
          version: '1.0.0',
          type: 'structural',
          category: 'dependency_direction',
          rule: 'No circular dependencies',
          scope: 'global',
          severity: 'critical',
          owner: 'foreman',
          source: '/test',
          examples: { valid: [], invalid: [] },
          metadata: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      // Step 1: Detect violations
      const rawReport = await detectViolations(signature, constraints);
      expect(rawReport.violations.length).toBeGreaterThan(0);

      // Step 2: Classify violations
      const classifiedReport = classifyViolationReport(rawReport, constraints);
      expect(classifiedReport.violations.length).toBeGreaterThan(0);
      expect(classifiedReport.summary.bySeverity).toBeDefined();

      // Step 3: Emit telemetry (non-blocking)
      await expect(emitViolationBatch(classifiedReport.violations)).resolves.not.toThrow();
    });
  });

  describe('No Side Effects Verification', () => {
    it('should not block execution on detection', async () => {
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
        hash: 'test'.repeat(16),
      };

      // Should complete without blocking
      const report = await detectViolations(signature, []);
      expect(report).toBeDefined();
    });

    it('should not block execution on telemetry', async () => {
      const violation: ClassifiedViolation = {
        id: 'test-1',
        constraintId: 'test',
        type: 'structural',
        description: 'Test',
        severity: 'high',
        category: 'dependency_direction',
        nature: 'structural',
        falsePositive: false,
        context: {},
        detectedAt: new Date().toISOString(),
      };

      // Should complete quickly, not block
      const start = Date.now();
      await emitViolationEvent(violation);
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(100); // Non-blocking
    });

    it('should not throw on errors (observe only)', async () => {
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
        hash: 'test'.repeat(16),
      };

      // Should not throw even with invalid input
      await expect(detectViolations(signature, [])).resolves.not.toThrow();
    });
  });
});
