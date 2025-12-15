/**
 * Red QA Test Suite: Governance-Aligned Builder Reasoning Blueprint
 * 
 * Wave: 0
 * Issue: #240
 * Status: RED (intentionally failing until implementation)
 * 
 * This test suite validates the complete Builder Reasoning Blueprint implementation.
 * Tests MUST fail initially (RED) and pass only after correct implementation (GREEN).
 * 
 * Test Coverage Target: 100%
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';

// These imports will fail initially - that's expected (RED QA)
import { GovernanceBlueprint } from '@/lib/builder/reasoning/governance-blueprint';
import { 
  GovernancePreCheck, 
  ArchitectureInterpret,
  GovernancePlanning,
  CodeGeneration,
  SelfReview,
  Handover
} from '@/lib/builder/reasoning/stages';
import { 
  GovernanceCheckResult,
  ArchitectureCheckResult,
  BuilderPlan,
  BuilderOutput,
  SelfReviewResult,
  HandoverPackage
} from '@/lib/builder/reasoning/types';
import { validateGovernanceIntegrity } from '@/lib/builder/reasoning/validators/governance-validator';
import { validateArchitecture } from '@/lib/builder/reasoning/validators/architecture-validator';
import { detectDrift } from '@/lib/builder/reasoning/validators/drift-detector';

describe('Governance Blueprint - Stage 1: Governance Pre-Check', () => {
  let preCheck: GovernancePreCheck;

  beforeEach(() => {
    preCheck = new GovernancePreCheck();
  });

  test('should refuse to start if governance files are missing', async () => {
    // Simulate missing governance file
    jest.spyOn(require('fs'), 'existsSync').mockReturnValue(false);
    
    const result = await preCheck.execute();
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('governance file missing');
    expect(result.canProceed).toBe(false);
  });

  test('should refuse to start if constitutional hash verification fails', async () => {
    // Simulate hash mismatch
    const result = await preCheck.execute({
      governanceFiles: {
        'BUILD_PHILOSOPHY.md': 'corrupted-hash'
      }
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('hash mismatch');
    expect(result.violations).toContain('CONSTITUTIONAL_INTEGRITY');
  });

  test('should pass when all governance integrity checks pass', async () => {
    const result = await preCheck.execute({
      governanceFiles: {
        'BUILD_PHILOSOPHY.md': 'correct-hash',
        '.github/foreman/agent-contract.md': 'correct-hash'
      }
    });
    
    expect(result.success).toBe(true);
    expect(result.canProceed).toBe(true);
    expect(result.violations).toHaveLength(0);
  });

  test('should load governance mindset rules', async () => {
    const result = await preCheck.execute();
    
    expect(result.governanceMindsetLoaded).toBe(true);
    expect(result.prGatekeeperRulesLoaded).toBe(true);
  });
});

describe('Governance Blueprint - Stage 2: Architectural Interpretation', () => {
  let architectureInterpret: ArchitectureInterpret;

  beforeEach(() => {
    architectureInterpret = new ArchitectureInterpret();
  });

  test('should refuse incomplete architecture', async () => {
    const incompleteArchitecture = {
      title: 'Test Feature',
      // Missing: components, types, flows, etc.
    };
    
    const result = await architectureInterpret.execute(incompleteArchitecture);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('incomplete architecture');
    expect(result.missingElements).toContain('components');
  });

  test('should detect architecture contradictions', async () => {
    const contradictoryArchitecture = {
      components: [
        { name: 'UserService', method: 'POST' },
        { name: 'UserService', method: 'GET' } // Same name, different method
      ]
    };
    
    const result = await architectureInterpret.execute(contradictoryArchitecture);
    
    expect(result.success).toBe(false);
    expect(result.contradictions).toHaveLength(1);
  });

  test('should validate all dependencies exist', async () => {
    const architectureWithMissingDeps = {
      components: [{ name: 'UserService', dependencies: ['NonExistentService'] }]
    };
    
    const result = await architectureInterpret.execute(architectureWithMissingDeps);
    
    expect(result.success).toBe(false);
    expect(result.missingDependencies).toContain('NonExistentService');
  });

  test('should validate schema alignment', async () => {
    const architectureWithSchemaMismatch = {
      types: [{ name: 'User', fields: ['id', 'name'] }],
      components: [{ 
        name: 'UserComponent', 
        uses: { type: 'User', fields: ['id', 'email'] } // 'email' not in User type
      }]
    };
    
    const result = await architectureInterpret.execute(architectureWithSchemaMismatch);
    
    expect(result.success).toBe(false);
    expect(result.schemaMisalignments).toHaveLength(1);
  });

  test('should pass with complete, consistent architecture', async () => {
    const completeArchitecture = {
      title: 'Test Feature',
      components: [
        { name: 'UserService', method: 'POST', path: '/api/users' }
      ],
      types: [
        { name: 'User', fields: ['id', 'name', 'email'] }
      ],
      flows: [
        { name: 'Create User', steps: ['Validate', 'Save', 'Respond'] }
      ]
    };
    
    const result = await architectureInterpret.execute(completeArchitecture);
    
    expect(result.success).toBe(true);
    expect(result.missingElements).toHaveLength(0);
    expect(result.contradictions).toHaveLength(0);
  });
});

describe('Governance Blueprint - Stage 3: Governance-Bound Planning', () => {
  let planning: GovernancePlanning;

  beforeEach(() => {
    planning = new GovernancePlanning();
  });

  test('should reject plans with missing test coverage', async () => {
    const planWithoutTests = {
      implementation: ['create user service'],
      tests: [] // No tests!
    };
    
    const result = await planning.validatePlan(planWithoutTests);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('missing test coverage');
  });

  test('should reject plans with shortcut patterns', async () => {
    const planWithShortcut = {
      implementation: ['skip validation for performance'],
      tests: ['test user creation']
    };
    
    const result = await planning.validatePlan(planWithShortcut);
    
    expect(result.success).toBe(false);
    expect(result.shortcutPatternsDetected).toHaveLength(1);
  });

  test('should reject plans that violate architecture', async () => {
    const architecture = {
      components: [{ name: 'UserService', location: '/lib/services' }]
    };
    
    const planViolatingArchitecture = {
      implementation: ['create UserService in /app/api'], // Wrong location!
      tests: ['test user service']
    };
    
    const result = await planning.validatePlan(planViolatingArchitecture, architecture);
    
    expect(result.success).toBe(false);
    expect(result.architectureViolations).toHaveLength(1);
  });

  test('should require strict typing in plan', async () => {
    const planWithoutTypes = {
      implementation: ['create function without types'],
      tests: ['test function']
    };
    
    const result = await planning.validatePlan(planWithoutTypes);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('strict typing required');
  });

  test('should accept governance-compliant plan', async () => {
    const architecture = {
      components: [{ name: 'UserService', location: '/lib/services' }]
    };
    
    const compliantPlan = {
      implementation: [
        'create UserService in /lib/services',
        'add strict TypeScript types',
        'add comprehensive error handling'
      ],
      tests: [
        'test user creation success',
        'test user creation validation errors',
        'test user creation database errors'
      ],
      coverage: 100
    };
    
    const result = await planning.validatePlan(compliantPlan, architecture);
    
    expect(result.success).toBe(true);
    expect(result.shortcutPatternsDetected).toHaveLength(0);
    expect(result.architectureViolations).toHaveLength(0);
  });
});

describe('Governance Blueprint - Stage 4: Constitutional Code Generation', () => {
  let codeGeneration: CodeGeneration;

  beforeEach(() => {
    codeGeneration = new CodeGeneration();
  });

  test('should detect and block implicit behavior', async () => {
    const codeWithImplicitBehavior = `
      function createUser(data) { // No type!
        // Silently fails if data is invalid
        return db.save(data);
      }
    `;
    
    const result = await codeGeneration.validate(codeWithImplicitBehavior);
    
    expect(result.success).toBe(false);
    expect(result.issues).toContain('implicit behavior detected');
  });

  test('should detect missing error handling', async () => {
    const codeWithoutErrorHandling = `
      async function createUser(data: UserData) {
        const user = await db.save(data); // No try-catch!
        return user;
      }
    `;
    
    const result = await codeGeneration.validate(codeWithoutErrorHandling);
    
    expect(result.success).toBe(false);
    expect(result.issues).toContain('missing error handling');
  });

  test('should detect drift patterns', async () => {
    const codeWithDriftPattern = `
      function createUser(data: UserData) {
        // TODO: Add validation later
        return db.save(data);
      }
    `;
    
    const result = await codeGeneration.validate(codeWithDriftPattern);
    
    expect(result.success).toBe(false);
    expect(result.driftDetected).toBe(true);
  });

  test('should require explicit, strict code', async () => {
    const explicitCode = `
      async function createUser(data: UserData): Promise<Result<User, Error>> {
        try {
          const validationResult = validateUserData(data);
          if (!validationResult.success) {
            return { success: false, error: validationResult.error };
          }
          
          const user = await db.save(data);
          return { success: true, data: user };
        } catch (error) {
          logger.error('User creation failed', error);
          return { success: false, error: new DatabaseError(error) };
        }
      }
    `;
    
    const result = await codeGeneration.validate(explicitCode);
    
    expect(result.success).toBe(true);
    expect(result.issues).toHaveLength(0);
    expect(result.driftDetected).toBe(false);
  });
});

describe('Governance Blueprint - Stage 5: Self-Review Under Governance', () => {
  let selfReview: SelfReview;

  beforeEach(() => {
    selfReview = new SelfReview();
  });

  test('should simulate QIEL/QIW logic', async () => {
    const output = {
      files: [{ path: 'user-service.ts', content: 'code' }],
      tests: []
    };
    
    const result = await selfReview.execute(output);
    
    expect(result.qielSimulationRan).toBe(true);
    expect(result.success).toBe(false); // Should fail due to missing tests
  });

  test('should identify missing tests', async () => {
    const outputWithoutTests = {
      files: [
        { path: 'user-service.ts', content: 'export function createUser() {}' }
      ],
      tests: []
    };
    
    const result = await selfReview.execute(outputWithoutTests);
    
    expect(result.success).toBe(false);
    expect(result.missingTests).toContain('createUser');
  });

  test('should check for warnings', async () => {
    const outputWithWarnings = {
      files: [
        { path: 'user-service.ts', content: 'var user; // eslint warning: no-var' }
      ],
      tests: [
        { path: 'user-service.test.ts', content: 'test("user", () => {})' }
      ]
    };
    
    const result = await selfReview.execute(outputWithWarnings);
    
    expect(result.success).toBe(false);
    expect(result.warnings).toHaveLength(1);
  });

  test('should verify schema alignment', async () => {
    const outputWithSchemaMismatch = {
      files: [
        { 
          path: 'user-service.ts', 
          content: 'function createUser(data: any) {}' // Should be UserData!
        }
      ],
      tests: [
        { path: 'user-service.test.ts', content: 'test("user", () => {})' }
      ]
    };
    
    const result = await selfReview.execute(outputWithSchemaMismatch);
    
    expect(result.success).toBe(false);
    expect(result.schemaViolations).toHaveLength(1);
  });

  test('should verify memory fabric usage', async () => {
    const outputWithoutMemoryFabric = {
      files: [
        { 
          path: 'user-service.ts', 
          content: 'function createUser() { /* no memory fabric logging */ }' 
        }
      ],
      tests: [
        { path: 'user-service.test.ts', content: 'test("user", () => {})' }
      ]
    };
    
    const result = await selfReview.execute(outputWithoutMemoryFabric);
    
    expect(result.success).toBe(false);
    expect(result.memoryFabricViolations).toHaveLength(1);
  });

  test('should pass with 100% compliant output', async () => {
    const compliantOutput = {
      files: [
        { 
          path: 'user-service.ts', 
          content: `
            import { logToMemoryFabric } from '@/lib/memory';
            
            export async function createUser(data: UserData): Promise<Result<User, Error>> {
              logToMemoryFabric('user_creation_started', { data });
              // ... proper implementation
              return { success: true, data: user };
            }
          `
        }
      ],
      tests: [
        { 
          path: 'user-service.test.ts', 
          content: 'test("createUser success", () => {}); test("createUser validation", () => {});' 
        }
      ]
    };
    
    const result = await selfReview.execute(compliantOutput);
    
    expect(result.success).toBe(true);
    expect(result.missingTests).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    expect(result.schemaViolations).toHaveLength(0);
  });
});

describe('Governance Blueprint - Stage 6: Formal Handover Package', () => {
  let handover: Handover;

  beforeEach(() => {
    handover = new Handover();
  });

  test('should require all handover artifacts', async () => {
    const incompleteHandover = {
      implementation: [{ path: 'user-service.ts', content: 'code' }],
      // Missing: tests, reasoning, compliance statement, etc.
    };
    
    const result = await handover.validate(incompleteHandover);
    
    expect(result.success).toBe(false);
    expect(result.missingArtifacts).toContain('tests');
    expect(result.missingArtifacts).toContain('reasoningDocument');
    expect(result.missingArtifacts).toContain('complianceStatement');
  });

  test('should require governance compliance statement', async () => {
    const handoverWithoutCompliance = {
      implementation: [{ path: 'user-service.ts', content: 'code' }],
      tests: [{ path: 'user-service.test.ts', content: 'test' }],
      reasoningDocument: { decisions: [] },
      // Missing: complianceStatement
    };
    
    const result = await handover.validate(handoverWithoutCompliance);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('compliance statement required');
  });

  test('should require architecture alignment summary', async () => {
    const handoverWithoutAlignment = {
      implementation: [{ path: 'user-service.ts', content: 'code' }],
      tests: [{ path: 'user-service.test.ts', content: 'test' }],
      reasoningDocument: { decisions: [] },
      complianceStatement: { compliant: true },
      // Missing: architectureAlignment
    };
    
    const result = await handover.validate(handoverWithoutAlignment);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('architecture alignment required');
  });

  test('should require explicit disclosure of risks/uncertainties', async () => {
    const handoverWithoutRisks = {
      implementation: [{ path: 'user-service.ts', content: 'code' }],
      tests: [{ path: 'user-service.test.ts', content: 'test' }],
      reasoningDocument: { decisions: [] },
      complianceStatement: { compliant: true },
      architectureAlignment: { satisfied: true },
      risks: [] // Empty is suspicious - should be explicit "no risks"
    };
    
    const result = await handover.validate(handoverWithoutRisks);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('explicit risk disclosure required');
  });

  test('should accept complete handover package', async () => {
    const completeHandover: HandoverPackage = {
      implementation: [
        { type: 'file_create', path: 'lib/services/user-service.ts', content: 'code' }
      ],
      tests: [
        { type: 'file_create', path: 'tests/services/user-service.test.ts', content: 'test' }
      ],
      schemaUpdates: [
        { type: 'file_modify', path: 'types/user.ts', content: 'updated types' }
      ],
      reasoningDocument: {
        decisions: ['Used explicit error handling', 'Added memory fabric logging'],
        alternatives: ['Considered implicit returns, rejected for clarity']
      },
      complianceStatement: {
        compliant: true,
        governanceChecks: ['GSR', 'QIC', 'QIEL'],
        attestation: 'All governance requirements met'
      },
      architectureAlignment: {
        satisfied: true,
        requirements: ['Component location', 'Type definitions', 'Error handling'],
        evidence: ['Files in correct locations', 'All types defined', 'Try-catch blocks present']
      },
      risks: [
        { type: 'none', description: 'No identified risks or uncertainties' }
      ]
    };
    
    const result = await handover.validate(completeHandover);
    
    expect(result.success).toBe(true);
    expect(result.missingArtifacts).toHaveLength(0);
  });
});

describe('Governance Blueprint - Full Pipeline Integration', () => {
  let blueprint: GovernanceBlueprint;

  beforeEach(() => {
    blueprint = new GovernanceBlueprint();
  });

  test('should execute all stages in sequence', async () => {
    const request = {
      builderType: 'api' as const,
      module: 'users',
      taskDescription: 'Create user service',
      organisationId: 'test-org',
      architecture: {
        components: [{ name: 'UserService', location: '/lib/services' }]
      }
    };
    
    const stages = [];
    blueprint.on('stageComplete', (stage) => stages.push(stage));
    
    await blueprint.execute(request);
    
    expect(stages).toEqual([
      'governance-pre-check',
      'architecture-interpret',
      'governance-planning',
      'code-generation',
      'self-review',
      'handover'
    ]);
  });

  test('should abort on stage 1 failure', async () => {
    // Simulate corrupted governance
    jest.spyOn(require('fs'), 'readFileSync').mockReturnValue('corrupted');
    
    const request = {
      builderType: 'api' as const,
      module: 'users',
      taskDescription: 'Create user service',
      organisationId: 'test-org'
    };
    
    const result = await blueprint.execute(request);
    
    expect(result.success).toBe(false);
    expect(result.failedStage).toBe('governance-pre-check');
    expect(result.subsequentStagesRan).toBe(false);
  });

  test('should log all reasoning traces to governance memory', async () => {
    const mockMemoryLog = jest.fn();
    jest.spyOn(require('@/lib/memory'), 'logToGovernanceMemory').mockImplementation(mockMemoryLog);
    
    const request = {
      builderType: 'api' as const,
      module: 'users',
      taskDescription: 'Create user service',
      organisationId: 'test-org'
    };
    
    await blueprint.execute(request);
    
    expect(mockMemoryLog).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'builder_reasoning_trace',
        blueprintCompliant: expect.any(Boolean)
      })
    );
  });

  test('should produce complete handover package on success', async () => {
    const request = {
      builderType: 'api' as const,
      module: 'users',
      taskDescription: 'Create user service',
      organisationId: 'test-org',
      architecture: {
        components: [{ name: 'UserService', location: '/lib/services' }],
        types: [{ name: 'User', fields: ['id', 'name'] }]
      }
    };
    
    const result = await blueprint.execute(request);
    
    expect(result.success).toBe(true);
    expect(result.handoverPackage).toBeDefined();
    expect(result.handoverPackage.implementation).toBeDefined();
    expect(result.handoverPackage.tests).toBeDefined();
    expect(result.handoverPackage.complianceStatement).toBeDefined();
  });
});

describe('Governance Blueprint - Memory Fabric Integration', () => {
  test('should store approved reasoning patterns', async () => {
    const mockMemoryWrite = jest.fn();
    jest.spyOn(require('@/lib/memory/builder'), 'storePattern').mockImplementation(mockMemoryWrite);
    
    const approvedPattern = {
      type: 'approved',
      pattern: 'explicit-error-handling',
      example: 'try-catch with typed errors'
    };
    
    await blueprint.storeReasoningPattern(approvedPattern);
    
    expect(mockMemoryWrite).toHaveBeenCalledWith('patterns.json', expect.objectContaining({
      approved: expect.arrayContaining([approvedPattern])
    }));
  });

  test('should store forbidden reasoning patterns', async () => {
    const forbiddenPattern = {
      type: 'forbidden',
      pattern: 'skip-validation-for-performance',
      reason: 'violates governance'
    };
    
    await blueprint.storeReasoningPattern(forbiddenPattern);
    
    const patterns = await blueprint.getReasoningPatterns();
    expect(patterns.forbidden).toContainEqual(forbiddenPattern);
  });
});

describe('Governance Blueprint - Drift Detection Integration', () => {
  test('should detect QA softening attempts', async () => {
    const codeAttemptingSoftening = `
      // Disabled failing test temporarily
      test.skip('user validation', () => {});
    `;
    
    const driftResult = await detectDrift(codeAttemptingSoftening);
    
    expect(driftResult.detected).toBe(true);
    expect(driftResult.type).toBe('qa-softening');
  });

  test('should detect incomplete code attempts', async () => {
    const incompleteCode = `
      function createUser() {
        // TODO: Implement
      }
    `;
    
    const driftResult = await detectDrift(incompleteCode);
    
    expect(driftResult.detected).toBe(true);
    expect(driftResult.type).toBe('incomplete-implementation');
  });

  test('should detect test skipping attempts', async () => {
    const testSkippingCode = `
      // Tests will be added later
      export function criticalFunction() {}
    `;
    
    const driftResult = await detectDrift(testSkippingCode);
    
    expect(driftResult.detected).toBe(true);
    expect(driftResult.type).toBe('test-skipping');
  });
});

/**
 * RED QA Status Report
 * 
 * Current Status: 🔴 RED (All tests failing as expected)
 * 
 * Tests Created: 40+
 * Coverage Target: 100%
 * 
 * Next Step: Build to Green
 * - Implement governance-blueprint.ts
 * - Implement all 6 stages
 * - Implement validators
 * - Implement memory integration
 * - Run tests until 100% GREEN
 * 
 * This RED QA defines the contract that the implementation must satisfy.
 */
