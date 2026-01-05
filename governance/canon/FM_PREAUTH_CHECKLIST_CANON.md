# FM PRE-AUTHORIZATION CHECKLIST CANON

## Status
**Type**: Canonical Gate Definition  
**Authority**: Supreme - Applies to ALL wave/subwave planning and builder appointments  
**Version**: 1.0.0  
**Date**: 2026-01-05  
**Owner**: Maturion Engineering Leadership (Johan)  
**Derived From**: BL-018, BL-019, BL-020 (FM App Wave 2)

---

## Purpose

This document defines the **FM Pre-Authorization Checklist** that acts as a **mandatory pre-authorization checkpoint** for all wave and subwave planning before FM authorizes execution.

This checklist ensures that FM systematically validates:
- QA Catalog alignment and semantic correctness
- QA-to-Red test foundation completeness
- Architecture alignment with planned scope
- BL/FL-CI ratchet compliance
- Dependency gate satisfaction

**Failure to execute this checklist before authorization is a governance violation.**

**Critical Principle**: FM authorization without checklist completion permits governance failures that can negate the entire build model. The checklist is FM's **structural defense** against authorization mistakes at the planning/gating layer.

---

## Constitutional Mandate

This checklist derives authority from and implements:

- **QA_CATALOG_ALIGNMENT_GATE_CANON.md** — QA Catalog alignment validation
- **ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md** — Architecture readiness validation
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md** — BL forward-scan obligation
- **BOOTSTRAP_EXECUTION_LEARNINGS.md (BL-018)** — QA Catalog verification requirement
- **BOOTSTRAP_EXECUTION_LEARNINGS.md (BL-019)** — Second-time failure prohibition and forward-scan mandate
- **BOOTSTRAP_EXECUTION_LEARNINGS.md (BL-020)** — FM Pre-Authorization structural failure
- **FM_BUILDER_APPOINTMENT_PROTOCOL.md** — Pre-appointment readiness validation (Step 1)
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM planning and authorization authority
- **BUILD_PHILOSOPHY.md** — One-Time Build Law, QA-as-Proof, Zero Test Debt

**BL-020 Requirement** (Canonical):
> "FM must execute an explicit, structured pre-authorization checklist before:
> - Declaring subwaves 'READY FOR AUTHORIZATION', or
> - Issuing builder appointments.
> 
> This checklist must be defined canonically at governance level, rippled to FM repo, and layered down into ForemanApp .agent as a strong reference."

This document is the **implementation** of that requirement.

---

## 1. When the Checklist Must Be Run

### 1.1 Mandatory Execution Triggers

FM **MUST** execute this checklist **BEFORE**:

1. **New Wave Authorization**
   - Before declaring a wave segment "READY FOR AUTHORIZATION"
   - Before planning subwave assignments within a wave
   - Before communicating wave start to execution team

2. **New Subwave Authorization**
   - Before issuing builder appointments for ANY subwave
   - Before declaring a subwave "READY FOR BUILDER ASSIGNMENT"
   - Before creating builder issue specifications

3. **Re-Authorization After Block**
   - Before re-authorizing blocked work (e.g., Subwave 2.5 after BL-020 corrections)
   - After any BL/FL-CI corrections that affect wave/subwave foundations
   - After any architecture updates that affect pending work

4. **After BL/FL-CI Creation (Forward-Scan)**
   - After ANY new Bootstrap Learning is recorded
   - After ANY new FL/CI (Failure Learning / Continuous Improvement) entry
   - Forward-scan ALL pending work for the same failure pattern

### 1.2 Non-Negotiable Sequencing

The checklist is FM's **final gate** before authorization:

```
Architecture Complete → QA Catalog Extended → QA-to-Red Created → 
BL/FL-CI Clear → Dependencies Met → [FM PRE-AUTHORIZATION CHECKLIST] → 
Authorization → Builder Appointment
```

**No step may be skipped. No authorization without checklist PASS.**

---

## 2. What Must Be Checked (Mandatory Items)

FM **MUST** verify ALL of the following items. Failure of ANY item results in checklist FAIL and authorization BLOCK.

### 2.1 QA Catalog Alignment ✓

**Gate Reference**: Per `QA_CATALOG_ALIGNMENT_GATE_CANON.md`

**Mandatory Validations**:

1. **QA Range Existence**
   - All QA IDs in assigned range exist in canonical `QA_CATALOG.md`
   - No undefined QA IDs in the range
   - No gaps in sequential QA assignments

2. **Semantic Alignment**
   - QA component descriptions semantically match wave/subwave feature intent
   - QA categories align with implementation type (component/flow/state/failure)
   - No semantic mismatch (e.g., analytics QAs assigned to caching features)

3. **Collision Prevention**
   - Assigned QA range not already allocated to other subwaves
   - No overlapping QA assignments across Wave 2 or future waves
   - QA ID uniqueness preserved

**Verification Method**:
- Cross-reference subwave spec QA range with `QA_CATALOG.md`
- Validate component names and descriptions match
- Check for existing allocations in wave planning documents

**Failure Action**:
- STOP authorization
- Create/update BL entry if new pattern discovered
- Correct QA Catalog or subwave spec before proceeding

---

### 2.2 QA-to-Red Foundation ✓

**Requirement**: For every QA in the assigned range, a corresponding RED test must exist.

**Mandatory Validations**:

1. **Test Existence**
   - RED test file exists at documented location
   - Test file path matches subwave spec claims
   - Test files are committed and visible in repository

2. **QA Coverage**
   - Each QA ID has at least one corresponding RED test
   - Test descriptions reference correct QA IDs
   - No QA IDs without test coverage

3. **Test Status**
   - Tests are in RED state (failing correctly before implementation)
   - Tests execute without errors (test infrastructure works)
   - Test suite runs successfully (no blocking test failures)

**Verification Method**:
- Review test file locations in subwave spec
- Execute test suite and verify RED state
- Cross-reference QA IDs with test descriptions

**Failure Action**:
- STOP authorization
- Create QA-to-Red tests before authorization
- Update test locations in subwave spec if mismatched

---

### 2.3 Architecture Alignment ✓

**Requirement**: Architecture must cover all components the subwave claims to build.

**Mandatory Validations**:

1. **Architecture Coverage**
   - Architecture spec includes sections for all subwave components
   - Component descriptions in architecture match subwave intent
   - No subwave promises functionality that architecture does not define

2. **Architecture Completeness**
   - Architecture addresses all completeness domains per `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`
   - Deployment targets, runtime entrypoints, environment variables documented
   - No incomplete architecture sections for subwave scope

3. **Architecture-QA Traceability**
   - QA Catalog entries reference architectural elements
   - Architecture sections have corresponding QA coverage
   - No orphaned QA entries or architecture sections

**Verification Method**:
- Cross-reference subwave feature list with architecture document
- Validate architecture section completeness per canonical requirements
- Check QA Catalog entries reference correct architectural elements

**Failure Action**:
- STOP authorization
- Update architecture before authorization
- Extend QA Catalog if architecture expansion requires new QAs

---

### 2.4 BL/FL-CI Ratchet Status ✓

**Requirement**: No active BL/FL-CI entries remain unaddressed for patterns affecting this wave/subwave.

**Mandatory Validations**:

1. **BL Forward-Scan**
   - ALL Bootstrap Learnings reviewed for applicability to this wave/subwave
   - BL-018/BL-019 QA Catalog patterns checked
   - BL-020 FM authorization patterns verified

2. **Active BL/FL-CI Resolution**
   - No OPEN BL/FL-CI entries block this wave/subwave
   - All ratchets from applicable BLs applied to wave/subwave spec
   - All corrections from FL/CI entries incorporated

3. **Second-Time Failure Prevention**
   - This wave/subwave does not repeat any previous failure pattern
   - Forward-scan completed after any new BL/FL-CI creation
   - All similar patterns across pending work corrected

**Verification Method**:
- Review `BOOTSTRAP_EXECUTION_LEARNINGS.md` for applicable learnings
- Check FM app `FLCI_REGISTRY.md` for active entries
- Cross-reference wave/subwave spec with known failure patterns

**Failure Action**:
- STOP authorization
- Apply BL/FL-CI corrections to wave/subwave spec
- Forward-scan ALL pending work if pattern applies broadly
- Re-run checklist after corrections

---

### 2.5 Dependency Gates ✓

**Requirement**: All declared dependencies are satisfied or explicitly waived.

**Mandatory Validations**:

1. **Sequential Dependencies**
   - All prerequisite waves/subwaves are COMPLETE
   - No subwave starts before dependencies finish
   - Wave N-1 closure certified before Wave N authorization

2. **Component Dependencies**
   - All required components from earlier waves available
   - Infrastructure dependencies satisfied (e.g., database, API endpoints)
   - Shared utilities/libraries exist and tested

3. **Gate Dependencies**
   - All declared gate requirements met (e.g., GATE-SUBWAVE-2.3, GATE-SUBWAVE-2.4)
   - Gates explicitly PASS or waived per canon with justification
   - No implicit gate assumptions

**Verification Method**:
- Review subwave spec dependency declarations
- Check wave closure certification for prerequisite waves
- Validate gate status in execution tracking documents

**Failure Action**:
- STOP authorization
- Wait for dependencies to complete
- If dependency cannot be met, re-plan wave/subwave scope

---

## 3. Checklist Outcomes

### 3.1 PASS ✓

**Definition**: ALL mandatory items validated successfully.

**FM Actions Authorized**:
- Issue builder appointments
- Mark wave/subwave as "READY FOR AUTHORIZATION"
- Create builder issue specifications
- Proceed to execution phase

**Evidence Required**:
- Checklist execution record (date, wave/subwave, result)
- References to validated artifacts (QA_CATALOG.md commit, test run results)
- Explicit PASS declaration in wave/subwave planning document

---

### 3.2 FAIL ✗

**Definition**: ANY mandatory item fails validation.

**FM Actions Required**:

1. **STOP Authorization**
   - Do NOT issue builder appointments
   - Do NOT mark wave/subwave as READY
   - Do NOT proceed to execution

2. **Document Failure**
   - Record which checklist item(s) failed
   - Document root cause of failure
   - Create or update BL/FL-CI entry if new pattern

3. **Correct Foundation**
   - Fix QA Catalog misalignment
   - Create missing QA-to-Red tests
   - Update architecture
   - Resolve BL/FL-CI blockers
   - Satisfy dependency gates

4. **Re-Run Checklist**
   - After corrections complete, re-execute full checklist
   - Do NOT proceed until checklist PASS achieved

**Evidence Required**:
- Checklist execution record with FAIL result and failed items
- BL/FL-CI entry (if new pattern discovered)
- Correction actions documented
- Re-execution record with PASS result

---

## 4. Relationship to Existing Gates

### 4.1 QA-Catalog-Alignment Gate

**Relationship**: Checklist Item 2.1 (QA Catalog Alignment) **implements** the QA-Catalog-Alignment Gate defined in `QA_CATALOG_ALIGNMENT_GATE_CANON.md`.

**Integration**:
- The checklist **reuses** QA-Catalog-Alignment Gate validation logic
- FM executes gate validation as part of checklist execution
- Gate PASS required for checklist item 2.1 PASS
- Gate FAIL triggers checklist FAIL

**Key Principle**: The checklist does NOT duplicate the gate. It **invokes** the gate as one of its mandatory items.

---

### 4.2 FM Builder Appointment Protocol

**Relationship**: This checklist is **Step 1** of the FM Builder Appointment Protocol defined in `FM_BUILDER_APPOINTMENT_PROTOCOL.md`.

**Integration**:
- FM Builder Appointment Protocol § 4.1 "Pre-Appointment Readiness Validation"
- Checklist PASS is **precondition** for appointment process
- Checklist FAIL blocks appointment initiation
- Appointment protocol assumes checklist already executed and PASS

**Key Principle**: Appointment protocol focuses on **how** to appoint builders (constitutional onboarding). This checklist focuses on **when** appointment is authorized (readiness validation).

---

## 5. Lifecycle: Governance → FM Repo → .agent Binding → Runtime Practice

This section defines the **cross-repository lifecycle** for this checklist, specifying how it ripples from governance canon into FM execution.

### 5.1 Stage 1: Governance Introduction (THIS DOCUMENT)

**Status**: ✅ **COMPLETE** (this document)

**Location**: `maturion-foreman-governance` repository  
**Artifact**: `governance/canon/FM_PREAUTH_CHECKLIST_CANON.md`

**Authority**: Canonical governance standard (PUBLIC_API in Governance Canon Manifest)

**Purpose**: Define checklist requirements at governance level as **binding standard** for all FM instances.

**Completion Criteria**:
- [x] Canonical checklist document created
- [x] Integrated with existing governance canon (ARCHITECTURE_COMPLETENESS, LEARNING_INTAKE, BOOTSTRAP_LEARNINGS, WAVE_MODEL)
- [x] Added to Governance Canon Manifest as PUBLIC_API
- [x] Lifecycle stages defined for ripple and layer-down

---

### 5.2 Stage 2: First Ripple to FM Repo (Documentation Layer)

**Status**: ⏳ **PENDING** (requires FM repo layer-down issue)

**Location**: `maturion-foreman-office-app` repository  
**Target Artifact**: `governance/specs/FM_PREAUTH_CHECKLIST.md` (FM-local version)

**Responsible Agent**: GovernanceLiaison agent in FM repo

**Purpose**: Create FM-local implementation specification of this canonical checklist, adapted to FM app execution context.

**Required Actions**:

1. **Create FM-Local Checklist Document**
   - Path: `governance/specs/FM_PREAUTH_CHECKLIST.md`
   - Content: FM-specific implementation of canonical checklist
   - Include: Concrete validation procedures, tool references, automation scripts
   - Format: Executable checklist with clear PASS/FAIL criteria

2. **Integrate into FM Documentation**
   - Reference checklist in `governance/README.md`
   - Link from wave planning documentation
   - Add to FM operational runbooks

3. **Create Validation Tools (Optional but Recommended)**
   - QA Catalog alignment validation script
   - Test coverage verification script
   - Dependency gate status checker
   - Automated checklist runner (future)

**Completion Criteria**:
- [ ] `governance/specs/FM_PREAUTH_CHECKLIST.md` created in FM repo
- [ ] FM-local checklist consistent with canonical version
- [ ] Documentation cross-references established
- [ ] Validation tools created (if applicable)

**Evidence Required**:
- PR in FM repo with checklist document
- FM `GOVERNANCE_ALIGNMENT.md` updated with checklist version

---

### 5.3 Stage 3: Layer-Down into .agent Contracts

**Status**: ⏳ **PENDING** (requires ForemanApp .agent update)

**Location**: `maturion-foreman-office-app` repository  
**Target Artifact**: `.github/agents/ForemanApp-agent.md`

**Responsible Agent**: GovernanceLiaison agent in FM repo

**Purpose**: Add **strong reference** to FM Pre-Authorization Checklist in ForemanApp .agent contract, ensuring the agent MUST execute checklist before authorization.

**Required Actions**:

1. **Update ForemanApp .agent Contract**
   - Location: `.github/agents/ForemanApp-agent.md`
   - Section: Add "FM Pre-Authorization Checklist" obligation in planning/authorization workflow
   - Content: Explicit instruction to execute `governance/specs/FM_PREAUTH_CHECKLIST.md` before authorization
   - Enforcement: Strong language requiring checklist execution (not optional)

2. **Add to Agent Workflow**
   - Update agent instructions for wave/subwave planning
   - Add checklist execution step before builder appointment
   - Define reporting format for checklist results (PASS/FAIL)

3. **Bind to Existing Gates**
   - Reference QA-Catalog-Alignment Gate as checklist item
   - Reference FM Builder Appointment Protocol precondition
   - Ensure agent knows checklist FAIL blocks authorization

**Completion Criteria**:
- [ ] ForemanApp-agent.md updated with checklist reference
- [ ] Checklist execution mandatory in agent planning workflow
- [ ] Agent instructions include reporting requirements
- [ ] Strong enforcement language present (MUST execute, MUST report)

**Evidence Required**:
- PR in FM repo updating ForemanApp-agent.md
- Agent contract references canonical checklist version
- FM `GOVERNANCE_ALIGNMENT.md` updated with agent contract version

---

### 5.4 Stage 4: Second Ripple (Runtime Practice)

**Status**: ⏳ **PENDING** (requires FM operational execution)

**Location**: FM execution in `maturion-foreman-office-app`  
**Manifestation**: Actual checklist execution during wave/subwave planning

**Responsible Agent**: ForemanApp agent during execution

**Purpose**: FM actually applies the checklist to wave/subwave authorization decisions, recording evidence of execution.

**Required Actions**:

1. **Execute Checklist for All Future Waves/Subwaves**
   - Before ANY new wave authorization
   - Before ANY new subwave/builder appointment
   - Before re-authorization of blocked work

2. **Record Execution Evidence**
   - Checklist execution record in wave/subwave planning document
   - PASS/FAIL result with date and FM identity
   - Failed items documented (if FAIL)
   - References to validated artifacts (QA Catalog commit, test runs)

3. **Report Results**
   - Checklist PASS: Proceed with authorization
   - Checklist FAIL: Document blockers, create BL/FL-CI entries, correct foundations, re-run

4. **Forward-Scan After BL/FL-CI**
   - Execute checklist on ALL pending work after new BL/FL-CI creation
   - Identify and correct additional instances of failure patterns
   - Prevent second-time failures (BL-019 prevention)

**Completion Criteria**:
- [ ] FM executes checklist before every wave/subwave authorization
- [ ] Execution evidence recorded in wave/subwave documents
- [ ] Checklist failures trigger corrective actions
- [ ] Forward-scan performed after BL/FL-CI creation

**Evidence Required**:
- Checklist execution records in wave planning documents
- BL/FL-CI entries referencing checklist (if failures discovered)
- Forward-scan results after new learnings

---

### 5.5 Layer-Down Issue Creation (Follow-Up Action)

**Governance Repo Action**: After this governance PR merges, create layer-down issue in FM repo.

**Issue Title**: "Layer-Down: FM Pre-Authorization Checklist Canon (BL-020 Structural Fix)"

**Issue Body Template**:

```markdown
## Layer-Down: FM Pre-Authorization Checklist Canon

**Source**: `maturion-foreman-governance` governance/canon/FM_PREAUTH_CHECKLIST_CANON.md v1.0.0  
**Authority**: BL-020 structural fix  
**Target Stages**: Stage 2 (FM-local doc) + Stage 3 (.agent binding)

### Objectives

1. Create FM-local implementation of canonical FM Pre-Authorization Checklist
2. Update ForemanApp-agent.md to reference and enforce checklist
3. Integrate checklist into FM planning/authorization workflow

### Deliverables

- [ ] `governance/specs/FM_PREAUTH_CHECKLIST.md` created
- [ ] ForemanApp-agent.md updated with checklist obligation
- [ ] FM documentation cross-references established
- [ ] `GOVERNANCE_ALIGNMENT.md` updated with checklist version

### Completion Criteria

FM repo layer-down COMPLETE when:
- FM-local checklist document exists and consistent with canonical version
- ForemanApp .agent contract includes strong checklist reference
- Agent workflow requires checklist execution before authorization
- Evidence of layer-down completion documented

**Assignee**: GovernanceLiaison agent in FM repo  
**Priority**: High (BL-020 structural fix)  
**Blocks**: Future wave/subwave authorizations without checklist
```

---

## 6. Enforcement and Compliance

### 6.1 Mandatory Enforcement

**Constitutional Requirement**: This checklist is **non-negotiable** and **non-waivable**.

- FM authorization without checklist execution is a **governance violation**
- Checklist FAIL without corrective action is a **constitutional violation**
- Second-time failures (same pattern) trigger **EMERGENCY classification** and **TARP activation** (per BL-019)

### 6.2 Audit Trail

**Evidence Requirements**:

Every wave/subwave MUST have:
- Checklist execution record (embedded in planning document or separate artifact)
- PASS result with date and validation references
- If FAIL: Documented blockers, corrections, and re-execution with PASS

**Audit Questions**:
- Was the checklist executed before authorization?
- Did the checklist result in PASS?
- Are all validation artifacts referenced and available?
- If FAIL occurred, were corrections completed and checklist re-run?

### 6.3 Violation Response

**If FM authorizes without checklist execution**:
1. **Immediate STOP** — Revoke authorization, recall builder appointments
2. **Root Cause Analysis** — Why was checklist skipped?
3. **BL/FL-CI Entry** — Document as governance violation
4. **Corrective Action** — Execute checklist, correct failures, re-authorize only after PASS
5. **Agent Contract Review** — Strengthen .agent binding if enforcement inadequate

---

## 7. Integration with BL-018/BL-019/BL-020

### 7.1 BL-018: QA Catalog Verification Requirement

**Relationship**: Checklist Item 2.1 (QA Catalog Alignment) **implements** BL-018 learning.

**BL-018 Requirement**:
> "Wave planning MUST verify QA Catalog before subwave assignment."

**Implementation**: Mandatory QA Catalog Alignment check in checklist ensures BL-018 learning applied to ALL future waves.

---

### 7.2 BL-019: Forward-Scan Obligation

**Relationship**: Checklist Item 2.4 (BL/FL-CI Ratchet Status) **implements** BL-019 learning.

**BL-019 Requirement**:
> "When ANY Bootstrap Learning or FL/CI entry is recorded, the system MUST perform a forward-scan of ALL relevant pending work to identify and correct additional instances of the same failure pattern."

**Implementation**: Mandatory BL forward-scan check in checklist ensures BL-019 learning applied after ANY new BL/FL-CI creation.

---

### 7.3 BL-020: FM Pre-Authorization Structural Failure

**Relationship**: This entire checklist **IS** the structural fix for BL-020.

**BL-020 Problem Statement**:
> "FM does not consistently run an explicit, structured pre-authorization checklist before declaring subwaves 'READY FOR AUTHORIZATION' or issuing builder appointments."

**BL-020 Structural Fix**: Canonize FM Pre-Authorization Checklist at governance level, ripple to FM repo, layer down into ForemanApp .agent, enforce at runtime.

**Implementation**: This document + lifecycle stages 1-4 implement complete BL-020 structural fix.

---

## 8. Future Evolution

### 8.1 Automation Potential

**Future Enhancement**: Automate checklist validation where possible.

**Automation Candidates**:
- QA Catalog alignment validation (script-based)
- QA-to-Red test existence verification (script-based)
- Dependency gate status checking (CI/CD integration)
- Automated checklist runner with machine-readable output (JSON)

**Principle**: Automation augments FM judgment, does not replace it. FM remains accountable for authorization decisions.

---

### 8.2 Checklist Evolution

**Versioning**: This checklist may evolve as new learnings emerge.

**Evolution Process**:
1. New learning discovered (e.g., BL-021, BL-022)
2. Evaluate if learning requires new checklist item
3. If yes: Update canonical checklist (version bump), ripple to FM repo, layer down to .agent
4. If no: Existing checklist items sufficient

**Backward Compatibility**: New checklist items added without removing existing items (additive evolution preferred).

---

## 9. Summary

### 9.1 Core Purpose

The FM Pre-Authorization Checklist is FM's **structural defense mechanism** against authorization mistakes at the planning/gating layer. It ensures FM systematically validates readiness before authorizing waves/subwaves or appointing builders.

### 9.2 Mandatory Nature

- **Non-negotiable**: Checklist execution required before ALL authorizations
- **Non-waivable**: Checklist FAIL blocks authorization absolutely
- **Auditable**: Execution evidence required for every wave/subwave

### 9.3 Lifecycle Integration

- **Governance Canon**: Defined here as canonical standard
- **FM Repo**: Rippled to FM-local implementation doc
- **.agent Binding**: Layered down into ForemanApp agent contract
- **Runtime Practice**: FM executes checklist during every authorization decision

### 9.4 BL Integration

- **BL-018**: QA Catalog verification implemented as checklist item 2.1
- **BL-019**: Forward-scan obligation implemented as checklist item 2.4
- **BL-020**: Entire checklist is structural fix for BL-020

---

## 10. Cross-References

**Governance Canon Dependencies**:
- `QA_CATALOG_ALIGNMENT_GATE_CANON.md` — Gate definition for checklist item 2.1
- `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` — Architecture validation for checklist item 2.3
- `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` — BL forward-scan obligation
- `BOOTSTRAP_EXECUTION_LEARNINGS.md` — BL-018, BL-019, BL-020 learnings
- `FM_BUILDER_APPOINTMENT_PROTOCOL.md` — Pre-appointment readiness validation (Step 1)
- `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` — FM authorization authority
- `BUILD_PHILOSOPHY.md` — One-Time Build Law, constitutional principles

**FM Repo Targets** (Layer-Down):
- `governance/specs/FM_PREAUTH_CHECKLIST.md` — FM-local checklist implementation (Stage 2)
- `.github/agents/ForemanApp-agent.md` — Agent contract binding (Stage 3)

**Evidence Artifacts** (Runtime):
- Wave/subwave planning documents — Checklist execution records (Stage 4)
- `FLCI_REGISTRY.md` — BL/FL-CI entries blocking authorization (Stage 4)

---

**End of Canon**
