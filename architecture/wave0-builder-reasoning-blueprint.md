# Architecture: Governance-Aligned Builder Reasoning Blueprint

**Wave**: 0  
**Issue**: #240  
**Status**: Design Phase  
**Date**: 2025-12-15

## Executive Summary

This architecture defines a constitutional reasoning framework that all builder agents must follow. The blueprint embeds governance constraints at every stage of builder cognition, ensuring builders cannot generate code that violates doctrine, bypasses QA, or undermines architecture.

## Problem Statement

Current builder agents generate code based on:
- Prompt interpretation
- Architecture files
- Memory fabric
- Previous patterns

However, their reasoning is NOT constitutionally aligned with:
- Immutable Governance Doctrine
- Governance-First Mindset
- Zero-Tolerance QA
- PR Gatekeeper strictness
- Constitutional Hash Verification
- Governance-Safe Learning

This leads to builders occasionally:
- Prioritizing "getting code done" over correctness
- Inferring shortcuts that bypass strict QA
- Generating incomplete implementations
- Normalizing away errors
- Omitting validation steps
- Producing fixes that "make CI green" but violate doctrine

## Architectural Goals

1. **Embed Governance at Reasoning Start**: Builders must verify governance integrity before any work
2. **Enforce Architecture Fidelity**: Builders must interpret architecture exactly as specified
3. **Eliminate Shortcuts**: Builders must plan within governance bounds, never seeking shortcuts
4. **Constitutional Code Generation**: Code must be explicit, strict, and verifiable
5. **Self-Review Under Governance**: Builders must simulate QIEL/QIW logic before handover
6. **Formal Handover Protocol**: Standardized handover package with governance compliance statement

## System Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Builder Executor                         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           Governance Blueprint Pipeline               │ │
│  │                                                       │ │
│  │  Stage 1: Governance Pre-Check                       │ │
│  │           ↓                                          │ │
│  │  Stage 2: Architectural Interpretation              │ │
│  │           ↓                                          │ │
│  │  Stage 3: Governance-Bound Planning                 │ │
│  │           ↓                                          │ │
│  │  Stage 4: Constitutional Code Generation            │ │
│  │           ↓                                          │ │
│  │  Stage 5: Self-Review Under Governance              │ │
│  │           ↓                                          │ │
│  │  Stage 6: Formal Handover Package                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │    Memory: Builder Patterns    │
        │  - Approved templates          │
        │  - Forbidden templates         │
        │  - Governance examples         │
        └───────────────────────────────┘
```

### Stage 1: Governance Pre-Check

**Purpose**: Verify governance integrity before beginning work

**Operations**:
1. Load immutable governance doctrine
2. Verify constitutional hash layer
3. Abort if governance is compromised
4. Check PR Gatekeeper constraints
5. Load governance mindset rules

**Exit Condition**: If any governance requirement is unmet → Builder refuses to begin work

**Failures Detected**:
- Missing governance files
- Hash mismatch in constitutional files
- Corrupted governance memory
- Missing PR Gatekeeper rules

### Stage 2: Architectural Interpretation

**Purpose**: Understand architecture exactly as specified

**Operations**:
1. Parse architecture document
2. Validate all dependencies exist
3. Confirm alignment with project schema
4. Check for contradictions
5. Request clarification if architecture insufficient

**Exit Condition**: Architecture must be complete, consistent, and unambiguous

**Failures Detected**:
- Incomplete architecture
- Conflicting requirements
- Missing dependencies
- Schema misalignment

### Stage 3: Governance-Bound Planning

**Purpose**: Create implementation plan that cannot violate governance

**Plans Must**:
- Fully satisfy architecture
- Never seek shortcuts
- Never suppress errors
- Never remove tests
- Include complete coverage
- Adhere to strict typing
- Follow file placement conventions
- Uphold separation of concerns
- Follow memory fabric contract exactly

**Exit Condition**: Plan approved by governance validator

**Failures Detected**:
- Incomplete coverage plans
- Shortcut patterns
- Architecture violations
- Test omissions

### Stage 4: Constitutional Code Generation

**Purpose**: Generate code that is explicit, strict, and verifiable

**While Generating Code, Builder Must**:
1. Generate the most explicit, strict, verifiable code
2. Add tests ensuring coverage
3. Perform inline governance reasoning
4. Check for drift (pattern evolution integration)
5. Avoid any bypass or silent failure behavior

**Exit Condition**: Code passes inline governance checks

**Failures Detected**:
- Implicit behavior
- Missing error handling
- Insufficient tests
- Drift patterns
- Silent failures

### Stage 5: Self-Review Under Governance

**Purpose**: Validate output against all governance constraints before handover

**Before Handing Over Code, Builder Must**:
1. Run internal simulation equivalent to QIEL/QIW logic
2. Check every governance constraint
3. Identify missing tests
4. Ensure no warnings, no drift
5. Ensure output is ready for PR Gatekeeper
6. Verify schema and architecture alignment
7. Validate types and memory fabric usage

**Exit Condition**: 100% governance compliance

**Failures Detected**:
- Failed governance checks
- Missing tests
- Type errors
- Schema violations
- Memory fabric contract breaches

### Stage 6: Formal Handover Package

**Purpose**: Provide complete, auditable handover to Foreman

**A Valid Builder Handover Must Include**:
1. Implementation (all files)
2. Tests (comprehensive coverage)
3. Schema updates (if applicable)
4. Migration files (if applicable)
5. Reasoning document (explains decisions)
6. Governance compliance statement (attestation)
7. Architecture alignment summary (confirms satisfaction)
8. List of risks or uncertainties (explicit disclosure)

**Exit Condition**: Handover package validated by Foreman

**Failures Detected**:
- Missing artifacts
- Incomplete documentation
- False compliance claims
- Undisclosed uncertainties

## File Structure

```
lib/builder/
├── reasoning/
│   ├── governance-blueprint.ts      # Main blueprint orchestrator
│   ├── stages/
│   │   ├── governance-pre-check.ts   # Stage 1
│   │   ├── architecture-interpret.ts # Stage 2
│   │   ├── governance-planning.ts    # Stage 3
│   │   ├── code-generation.ts        # Stage 4
│   │   ├── self-review.ts            # Stage 5
│   │   └── handover.ts               # Stage 6
│   ├── validators/
│   │   ├── governance-validator.ts
│   │   ├── architecture-validator.ts
│   │   └── drift-detector.ts
│   └── types.ts                      # Type definitions
├── executor.ts                        # Updated to use blueprint
├── capabilities.ts                    # Existing
└── integration-contract.ts            # Existing

memory/builder/
└── patterns.json                      # Reasoning pattern templates

tests/builder/
└── governance-blueprint.test.ts       # Comprehensive tests
```

## Integration Points

### With Builder Executor

The executor must integrate the blueprint as a mandatory pipeline:

```typescript
async function executeBuilder(request: BuilderRequest): Promise<BuilderResponse> {
  // Stage 1: Governance Pre-Check
  await governanceBlueprint.preCheck();
  
  // Stage 2: Architecture Check
  await governanceBlueprint.architectureCheck(request);
  
  // Stage 3: Plan
  const plan = await governanceBlueprint.plan(request);
  await governanceBlueprint.validatePlan(plan);
  
  // Stage 4: Generate Code
  const output = await governanceBlueprint.generateCode(plan);
  
  // Stage 5: Self-Review
  await governanceBlueprint.selfReview(output);
  
  // Stage 6: Finalize Handover
  return await governanceBlueprint.finalizeHandover(output);
}
```

### With Memory Fabric

The blueprint stores and retrieves reasoning patterns from memory:

- **Approved patterns**: Reasoning sequences that consistently produce compliant code
- **Forbidden patterns**: Reasoning sequences that lead to violations
- **Governance examples**: Reference cases for correct reasoning
- **Anti-patterns**: Examples of drift for detection

### With Drift Detector

The blueprint integrates drift detection at Stage 4 and Stage 5:

- If builder attempts to soften QA → Drift incident
- If builder tries to generate incomplete code → Drift incident
- If builder proposes skipping tests → Drift incident
- If builder uses heuristic shortcuts → Drift incident

## Data Models

### GovernanceBlueprint Interface

```typescript
interface GovernanceBlueprint {
  // Stage 1
  preCheck(): Promise<GovernanceCheckResult>;
  
  // Stage 2
  architectureCheck(request: BuilderRequest): Promise<ArchitectureCheckResult>;
  
  // Stage 3
  plan(request: BuilderRequest): Promise<BuilderPlan>;
  validatePlan(plan: BuilderPlan): Promise<PlanValidationResult>;
  
  // Stage 4
  generateCode(plan: BuilderPlan): Promise<BuilderOutput>;
  
  // Stage 5
  selfReview(output: BuilderOutput): Promise<SelfReviewResult>;
  
  // Stage 6
  finalizeHandover(output: BuilderOutput): Promise<HandoverPackage>;
}
```

### HandoverPackage Interface

```typescript
interface HandoverPackage {
  implementation: BuilderArtifact[];
  tests: BuilderArtifact[];
  schemaUpdates?: BuilderArtifact[];
  migrations?: BuilderArtifact[];
  reasoningDocument: ReasoningDocument;
  complianceStatement: ComplianceStatement;
  architectureAlignment: ArchitectureAlignment;
  risks: Risk[];
}
```

### Governance Memory Log

Each builder run logs:

```typescript
{
  type: "builder_reasoning_trace",
  builderId: string,
  timestamp: string,
  blueprintCompliant: boolean,
  governanceViolations: string[],
  driftDetected: boolean,
  stagesCompleted: string[],
  stagesFailed: string[],
  handoverApproved: boolean
}
```

If `blueprintCompliant = false` → Block and escalate.

## Quality Attributes

### Correctness
- **Governance compliance**: 100% adherence to constitutional rules
- **Architecture fidelity**: Exact interpretation of architecture specs
- **Type safety**: All code must pass TypeScript strict mode

### Reliability
- **Predictable behavior**: Same input → Same reasoning → Same output
- **No silent failures**: All errors must be explicit and logged
- **Rollback capability**: Ability to revert to last known good state

### Auditability
- **Complete traces**: Every reasoning step logged
- **Evidence trail**: Full handover package with attestations
- **Governance logs**: All compliance checks recorded

### Security
- **No bypass paths**: Impossible to skip governance stages
- **Immutable rules**: Constitutional files cannot be modified by builders
- **Drift detection**: Automatic detection of reasoning degradation

## Acceptance Criteria

### Builder Behavior After Implementation

**Builder WILL**:
- Think within governance constraints
- Always produce compliant, complete implementations
- Run strict self-review before handover
- Escalate rather than bypass errors
- Improve under governance-based learning
- Produce predictable, safe, auditable reasoning

**Builder WILL NOT**:
- Generate shortcuts or partial implementations
- Suppress or hide errors
- Skip QA requirements
- Weaken architecture or governance
- Introduce drift
- Bypass PR Gatekeeper constraints

### Foreman Behavior After Implementation

**Foreman WILL**:
- Enforce blueprint adherence
- Reject builder output that violates blueprint
- Escalate drift incidents
- Rely on stable, governed builders
- Validate handover packages

## Risks and Mitigations

### Risk 1: Performance Overhead
**Impact**: Six-stage pipeline may slow builder execution  
**Mitigation**: Stages run asynchronously where possible; cache governance checks

### Risk 2: False Positives in Drift Detection
**Impact**: Valid code rejected as drift  
**Mitigation**: Human-in-loop for drift review; pattern learning

### Risk 3: Incomplete Architecture Blocks Progress
**Impact**: Stage 2 fails, builder cannot proceed  
**Mitigation**: Clear escalation path to Foreman; architecture refinement loop

### Risk 4: Self-Review Simulation Inaccuracy
**Impact**: Builder passes self-review but fails actual QIEL  
**Mitigation**: Continuous calibration of self-review against actual results

## Dependencies

### Internal
- Existing builder capabilities system
- Memory fabric infrastructure
- Drift detection system
- PR Gatekeeper

### External
- None (fully internal)

## Testing Strategy

Comprehensive test suite in `tests/builder/governance-blueprint.test.ts`:

1. **Test: Builder refuses to run without intact governance**
   - Corrupt governance file → Builder aborts at Stage 1
   
2. **Test: Builder refuses incomplete architecture**
   - Missing architecture elements → Builder aborts at Stage 2
   
3. **Test: Builder refuses architecture-violating code**
   - Plan violates architecture → Rejected at Stage 3
   
4. **Test: Builder detects and blocks drift**
   - Shortcut pattern attempted → Drift incident at Stage 4
   
5. **Test: Builder requires tests**
   - Code without tests → Rejected at Stage 5
   
6. **Test: Builder rejects shortcut patterns**
   - Heuristic bypass → Rejected at Stage 3
   
7. **Test: Builder requires full compliance before handover**
   - Incomplete handover package → Rejected at Stage 6

8. **Test: Governance memory logging**
   - All reasoning traces logged correctly
   
9. **Test: Integration with executor**
   - Full pipeline executes correctly

## Implementation Phases

### Phase 1: Core Blueprint Infrastructure
- Create governance-blueprint.ts
- Implement six stage interfaces
- Create type definitions

### Phase 2: Stage Implementations
- Implement Stage 1: Governance Pre-Check
- Implement Stage 2: Architectural Interpretation
- Implement Stage 3: Governance-Bound Planning
- Implement Stage 4: Constitutional Code Generation
- Implement Stage 5: Self-Review
- Implement Stage 6: Handover

### Phase 3: Integration
- Integrate with builder executor
- Integrate with memory fabric
- Integrate with drift detector

### Phase 4: Testing
- Create comprehensive test suite
- Validate all acceptance criteria
- Test all failure modes

### Phase 5: Documentation
- Complete reasoning document templates
- Create handover package templates
- Document governance memory schema

## Success Metrics

- **Blueprint Compliance Rate**: 100% of builder runs must pass all stages
- **Governance Violation Rate**: 0 violations in production
- **Drift Detection Rate**: >95% of drift patterns caught
- **False Positive Rate**: <5% of valid code rejected
- **Handover Completeness**: 100% of handovers include all required artifacts

## Architecture Validation

This architecture satisfies the requirements from Issue #240:

✅ Embeds governance at beginning of reasoning chain  
✅ Defines six-stage reasoning blueprint  
✅ Integrates with builder execution pipeline  
✅ Links with governance-safe learning loop  
✅ Updates builder memory for pattern storage  
✅ Adds governance drift checks  
✅ Implements governance memory logging  
✅ Includes comprehensive test plan  

## Approval

**Architecture Status**: ✅ READY FOR RED QA  
**Next Step**: Create Red QA test suite (must be RED)  
**Governance Compliance**: ✅ VERIFIED
