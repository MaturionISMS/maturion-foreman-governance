# Architecture: Strict Builder Handover Contract (SBHC)

**Issue**: #241  
**Wave**: 0 (Builder Constitutional Systems - 2 of 18)  
**Status**: Architecture Complete  
**Date**: 2025-12-15

---

## Executive Summary

The **Strict Builder Handover Contract (SBHC)** establishes a constitutional framework for work transitions between Foreman and Builder agents, ensuring accountability, traceability, and zero-ambiguity handovers. This system enforces that every builder assignment includes complete context, clear success criteria, and explicit governance constraints.

---

## Constitutional Mandate

### Governance Alignment
- **OPOJD**: Each handover is complete and unambiguous
- **Build Philosophy**: Builders receive architecture before implementation
- **GSR**: Governance constraints passed explicitly to builders
- **Zero Test Debt**: Success criteria include passing tests
- **SBHC Meta-Rule**: This contract IS the constitutional requirement for all handovers

### Problem Statement

Current state:
- No formal contract between Foreman and Builders
- Implicit assumptions about context transfer
- Unclear success criteria
- No accountability for incomplete handovers
- Builders may proceed without full governance understanding

Required state:
- Every builder assignment has explicit contract
- Complete context transfer guaranteed
- Clear success/failure criteria
- Accountability chain established
- Constitutional constraints enforced at handover

---

## Architecture

### Core Components

#### 1. HandoverContract Interface

```typescript
interface HandoverContract {
  // Identity
  contract_id: string
  foreman_id: string
  builder_id: string
  issue_number: number
  issue_title: string
  
  // Context
  task_description: string
  architecture_doc: string  // REQUIRED before handover
  test_requirements: string[]
  implementation_requirements: string[]
  
  // Governance
  governance_constraints: {
    zero_test_debt: boolean
    build_philosophy_compliance: boolean
    gsr_enforcement: boolean
    opojd_requirements: string[]
  }
  
  // Success Criteria
  success_criteria: {
    tests_passing: boolean
    architecture_compliance: boolean
    zero_debt_maintained: boolean
    evidence_provided: string[]
  }
  
  // Accountability
  handover_timestamp: string
  acceptance_timestamp?: string
  completion_timestamp?: string
  builder_acceptance_signature: string
  
  // Status
  status: 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'rejected'
  rejection_reason?: string
}
```

#### 2. ContractValidator

Validates contracts before handover:
- Architecture document exists
- Test requirements specified
- Success criteria measurable
- Governance constraints explicit
- No ambiguous terms

```typescript
interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

class ContractValidator {
  validate(contract: HandoverContract): ValidationResult
  validateArchitectureExists(docPath: string): boolean
  validateSuccessCriteriaMeasurable(criteria: any): boolean
  validateGovernanceComplete(constraints: any): boolean
}
```

#### 3. HandoverManager

Manages contract lifecycle:
- Creates contracts from Foreman assignments
- Validates contracts before handover
- Tracks builder acceptance
- Monitors execution
- Verifies completion against criteria

```typescript
class HandoverManager {
  createContract(assignment: BuilderAssignment): HandoverContract
  validateAndPropose(contract: HandoverContract): ValidationResult
  acceptContract(contractId: string, builderId: string): void
  rejectContract(contractId: string, reason: string): void
  markInProgress(contractId: string): void
  markCompleted(contractId: string, evidence: Evidence): void
  getContractStatus(contractId: string): HandoverContract
}
```

#### 4. Evidence Collector

Collects completion evidence:
- Architecture compliance proof
- Test pass evidence
- Implementation files
- Commit SHAs
- Governance verification

```typescript
interface Evidence {
  architecture_compliance: {
    document: string
    compliance_percentage: number
    deviations: string[]
  }
  test_evidence: {
    test_file: string
    passing: boolean
    coverage: number
  }
  implementation: {
    files: string[]
    commits: string[]
    lines_of_code: number
  }
  governance_verification: {
    gsr_compliant: boolean
    zero_debt: boolean
    build_philosophy: boolean
  }
}
```

---

## Contract Flow

### Phase 1: Contract Creation (Foreman)

```
1. Foreman identifies work for Builder
2. Architecture MUST exist before contract creation
3. Test requirements specified
4. Success criteria defined
5. Governance constraints enumerated
6. Contract proposed to Builder
```

### Phase 2: Contract Validation

```
ContractValidator checks:
- Architecture document exists and is complete
- Test requirements are measurable
- Success criteria are unambiguous
- Governance constraints are explicit
- No implicit assumptions present
```

### Phase 3: Contract Acceptance (Builder)

```
Builder reviews contract:
- Context is complete: YES/NO
- Success criteria clear: YES/NO
- Governance understood: YES/NO

If YES to all → Accept contract
If NO to any → Reject with specific reason
```

### Phase 4: Execution

```
Builder proceeds with accepted contract:
- Architecture guides implementation
- Test requirements drive QA
- Success criteria define done
- Governance constraints enforced
```

### Phase 5: Completion Verification

```
HandoverManager verifies:
- All success criteria met
- Evidence provided
- Tests passing
- Zero debt maintained
- Governance compliant

If verified → Mark complete
If not → Request remediation
```

---

## Integration Points

### With Foreman Orchestration
- Foreman CANNOT assign work without creating contract
- Contract validation blocks invalid handovers
- Foreman receives completion verification

### With Builder Runtime
- Builders CANNOT start without accepting contract
- Contract provides complete execution context
- Builders report against contract criteria

### With Governance Memory
- All contracts recorded permanently
- Acceptance/rejection decisions logged
- Completion evidence archived
- Accountability chain maintained

### With Issue Tracker
- Contract links to GitHub issue
- Issue closure requires contract completion
- Evidence attached to issue comments

---

## Success Criteria

### Contract Creation
- ✅ Architecture document exists
- ✅ Test requirements specified
- ✅ Success criteria measurable
- ✅ Governance explicit
- ✅ No ambiguity

### Contract Acceptance
- ✅ Builder reviews in < 1 second
- ✅ Acceptance/rejection explicit
- ✅ Rejection reason specific
- ✅ Accountability established

### Contract Execution
- ✅ Builder follows architecture
- ✅ Tests written per requirements
- ✅ Success criteria met
- ✅ Evidence provided
- ✅ Governance maintained

### Contract Completion
- ✅ All criteria verified
- ✅ Evidence collected
- ✅ Zero debt confirmed
- ✅ Issue closable

---

## Implementation Strategy

### Step 1: Core Interfaces (TypeScript)
- Define `HandoverContract` interface
- Define `Evidence` interface
- Define validation result types

### Step 2: Contract Validator
- Implement architecture validation
- Implement success criteria validation
- Implement governance validation

### Step 3: Handover Manager
- Implement contract creation
- Implement validation logic
- Implement lifecycle management
- Implement evidence collection

### Step 4: Integration
- Wire to Foreman orchestrator
- Wire to Builder runtime
- Wire to Governance memory
- Wire to Issue tracker

### Step 5: Testing
- Test valid contract acceptance
- Test invalid contract rejection
- Test completion verification
- Test evidence collection
- Test governance enforcement

---

## Zero Test Debt Strategy

### Test Coverage Requirements

```typescript
describe('HandoverContract', () => {
  test('creates valid contract from assignment')
  test('requires architecture before creation')
  test('validates all required fields')
  test('generates unique contract ID')
})

describe('ContractValidator', () => {
  test('rejects contract without architecture')
  test('rejects unmeasurable success criteria')
  test('rejects ambiguous governance constraints')
  test('accepts fully specified contract')
})

describe('HandoverManager', () => {
  test('prevents handover without valid contract')
  test('records acceptance with timestamp')
  test('tracks execution status')
  test('verifies completion against criteria')
  test('collects evidence automatically')
})

describe('Evidence Collector', () => {
  test('collects architecture compliance proof')
  test('collects test evidence')
  test('collects implementation files')
  test('verifies governance compliance')
})
```

### Build Philosophy Sequence
1. ✅ **Architecture** (this document)
2. ⏳ **Red QA** (test file created, expected RED)
3. ⏳ **Build to Green** (implementation follows)
4. ⏳ **Evidence** (completion verification)

---

## Governance Compliance

### GSR (Governance Supremacy Rule)
- Contracts enforce governance at handover boundary
- Builders cannot proceed without governance understanding
- Completion requires governance verification

### OPOJD (One-Prompt One-Job Doctrine)
- Each contract is complete and unambiguous
- No mid-execution clarification requests
- Success criteria defined upfront

### Build Philosophy
- Architecture REQUIRED before implementation
- Tests REQUIRED before green status
- Evidence REQUIRED before completion

### Zero Test Debt
- No stubs in contract implementation
- All contracts testable
- Evidence verification automated

### SBHC (Meta)
- This system IS the constitutional requirement
- All future builder work flows through contracts
- No exceptions to contract requirement

---

## Risk Mitigation

### Risk: Contract Overhead
- **Mitigation**: Automated contract generation from assignments
- **Mitigation**: Templates for common patterns
- **Mitigation**: Validation in < 100ms

### Risk: Builder Rejection
- **Mitigation**: Clear rejection reasons required
- **Mitigation**: Foreman iterates until acceptable
- **Mitigation**: Contract improvement feedback loop

### Risk: Evidence Collection Burden
- **Mitigation**: Automated evidence gathering
- **Mitigation**: Integration with existing tools
- **Mitigation**: Evidence templates

### Risk: Governance Constraint Complexity
- **Mitigation**: Standard constraint templates
- **Mitigation**: Clear documentation per constraint
- **Mitigation**: Validation prevents ambiguity

---

## Future Extensions

### V2: Multi-Builder Contracts
- Support for collaborative work
- Parallel builder assignments
- Dependency contracts between builders

### V3: Contract Negotiation
- Builders propose modifications
- Foreman reviews and accepts/rejects
- Iterative refinement

### V4: Performance Metrics
- Track contract creation time
- Track acceptance rate
- Track completion velocity
- Optimize based on metrics

---

## Conclusion

The Strict Builder Handover Contract (SBHC) establishes constitutional accountability for all Foreman-to-Builder work transitions. By requiring complete context, explicit governance, and measurable success criteria, SBHC ensures that builders have everything needed for one-time successful execution while maintaining full governance compliance.

**Status**: Architecture Complete - Ready for Red QA
**Next**: Create test file with expected failures
**Wave 0 Progress**: 2 of 18 issues
