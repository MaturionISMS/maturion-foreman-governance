# Combined Subwave Testing (CST) and Combined Wave Testing (CWT) Pattern

## Status
**Type**: Canonical Governance Pattern  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-09  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to BUILD_PHILOSOPHY.md, WAVE_MODEL.md  
**Applies To**: All Multi-Wave Builds, All Application Repositories  
**Related Canon**: WAVE_MODEL.md, IN_BETWEEN_WAVE_RECONCILIATION.md, MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md  
**Bootstrap Learning**: BL-025

---

## 1. Purpose

This document establishes **Combined Subwave Testing (CST)** and **Combined Wave Testing (CWT)** as the canonical patterns for strategic integration assurance in multi-wave, one-time builds.

CST and CWT exist to ensure that:
- Integration issues are detected early at strategic convergence checkpoints (CST)
- Comprehensive cross-wave validation occurs before wave closure (CWT)
- Testing cost is balanced with integration risk and feedback value
- IBWR process includes absolute cross-wave integration validation
- One-time builds achieve integration confidence without excessive testing overhead

This document establishes:
- What CST and CWT are and when they apply
- Decision framework for CST checkpoint identification
- Mandatory CWT requirements before IBWR
- Evidence and validation requirements
- FM and builder responsibilities

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **BUILD_PHILOSOPHY.md** — One-Time Build Law, quality without regression
- **WAVE_MODEL.md** — Wave execution structure, completion criteria
- **IN_BETWEEN_WAVE_RECONCILIATION.md** — IBWR requirements and wave closure
- **MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md** — Wave closure certification
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** — BL-025 (Combined Testing Pattern)

---

## 3. Core Principle: Strategic Integration Assurance

### 3.1 The Integration Assurance Gap

**Without CST/CWT:**
- Subwaves complete in isolation → integration failures discovered late
- Wave QA validates individual features → cross-feature integration untested
- Cumulative regression catches code-level breaks → doesn't validate complex scenarios
- E2E becomes first comprehensive integration test → expensive, late failures
- IBWR may discover integration gaps → rework after "wave complete"

**With CST/CWT:**
- CST validates integration at strategic convergence checkpoints → earlier feedback
- CWT provides comprehensive cross-wave validation → before IBWR
- Testing cost balanced with integration risk → strategic, not exhaustive
- Integration confidence built incrementally → not deferred to E2E
- Wave closure backed by absolute integration validation → IBWR proceeds safely

---

### 3.2 Two-Tier Integration Testing Model

This canon establishes a two-tier integration testing model:

#### Tier 1: Combined Subwave Testing (CST)
- **Type:** Strategic, selective integration testing
- **When:** At convergence checkpoints within waves
- **Scope:** Cross-subwave, cross-module scenarios at integration points
- **Mandate:** Applied when integration risk justifies cost
- **Purpose:** Early feedback, prevent late-stage rework

#### Tier 2: Combined Wave Testing (CWT)
- **Type:** Comprehensive, mandatory integration testing
- **When:** After wave QA passes, before IBWR completion
- **Scope:** Cross-wave, cross-module, multi-scenario validation
- **Mandate:** ALWAYS required before IBWR (non-negotiable)
- **Purpose:** Absolute integration assurance before wave closure

---

## 4. Combined Subwave Testing (CST)

### 4.1 Definition

**Combined Subwave Testing (CST)** is strategic integration testing conducted at convergence checkpoints where multiple subwaves, modules, or architectural boundaries must interact.

CST is:
- **Strategic:** Applied at high-risk integration points, not everywhere
- **Integration-focused:** Tests cross-module, cross-subwave interactions
- **Risk-based:** Applied when integration risk justifies testing cost
- **Early feedback:** Provides feedback before wave completion

CST is NOT:
- **Exhaustive:** Not applied to every subwave
- **Mandatory:** Applied selectively based on integration risk
- **Replacement for unit/subwave QA:** Complements, doesn't replace component testing
- **Replacement for CWT:** CST is strategic; CWT is mandatory

---

### 4.2 When to Apply CST

#### CST Decision Framework

**APPLY CST When:**
1. ✅ **Multiple subwaves converge and must integrate**
   - Example: UI subwave + API subwave must interact
   - Example: Service A subwave + Service B subwave share data flow

2. ✅ **Cross-module dependencies reach integration readiness**
   - Example: Frontend consumes backend API endpoints
   - Example: Authentication module integrates with authorization module

3. ✅ **Architectural boundaries crossed**
   - Example: Client ↔ Server integration
   - Example: Service ↔ Database integration
   - Example: Module ↔ External API integration

4. ✅ **Significant feature complexity requires mid-wave validation**
   - Example: Complex multi-step workflow spanning subwaves
   - Example: High-risk integration with external dependencies

5. ✅ **Integration failure cost is high**
   - Example: Late detection would require extensive rework
   - Example: Integration spans multiple teams/builders

**SKIP CST When:**
1. ❌ **Subwaves are isolated and independent**
   - Example: Documentation-only subwave
   - Example: Configuration-only subwave with no runtime integration

2. ❌ **No architectural boundaries crossed**
   - Example: Single-module refactoring
   - Example: Isolated bug fixes

3. ❌ **Integration risk is low**
   - Example: Simple, well-understood integration patterns
   - Example: Minimal cross-module interaction

4. ❌ **Cumulative regression provides sufficient coverage**
   - Example: Integration already validated by existing wave QA

**Decision Rule:**
> If integration failure would cause expensive rework or delay wave closure, apply CST.
> If cumulative regression provides sufficient integration assurance, CST may be skipped.

---

### 4.3 CST Scope and Coverage

**CST Validates:**
- Cross-subwave interactions (Subwave A → Subwave B data flow)
- Cross-module interfaces (Module X API consumed by Module Y)
- Architectural boundary crossings (Frontend ↔ Backend, Service ↔ Database)
- Multi-component scenarios (Feature requiring A + B + C cooperation)

**CST Does NOT Validate:**
- Individual subwave correctness (covered by subwave QA)
- Comprehensive wave regression (covered by wave QA)
- Cross-wave integration (covered by CWT)
- Final E2E scenarios (covered by E2E validation)

**CST Coverage Level:**
- **Happy path scenarios:** Core integration paths working correctly
- **Critical error paths:** Integration failures handled gracefully
- **Boundary conditions:** Integration at edge cases (e.g., empty data, max load)

**CST Is NOT Exhaustive:**
CST focuses on strategic integration validation, not comprehensive scenario coverage.

---

### 4.4 CST Execution and Evidence

**CST Execution Timing:**
- After relevant subwaves reach "integration-ready" state
- Before wave completion (provides time to fix integration issues)
- At strategic milestones within wave execution

**CST Execution Responsibility:**
- **FM:** Identifies CST convergence points during wave planning
- **Builders:** Provide integration tests for CST scenarios
- **QA-Builder (if exists):** May execute CST validation
- **FM:** Validates CST execution and evidence

**CST Evidence Requirements:**
- [ ] CST checkpoint identified in wave planning
- [ ] Integration scenarios defined and documented
- [ ] CST tests executed at convergence point
- [ ] CST results recorded (PASS/FAIL with details)
- [ ] Integration issues resolved before wave completion

**CST Failure Response:**
- CST failures MUST be resolved before wave completion
- Integration issues trigger subwave rework or corrective actions
- Wave closure CANNOT proceed with unresolved CST failures

---

### 4.5 CST Documentation

**CST Checkpoints Documented In:**
- Wave planning documents (e.g., `WAVE_N_PLAN.md`)
- Subwave specifications (e.g., Issue #XXX subwave scope)
- Wave implementation progress (e.g., `WAVE_N_IMPLEMENTATION_PROGRESS.md`)

**CST Results Documented In:**
- Wave reconciliation report (Section: CST Checkpoint Results)
- Wave implementation progress (CST status updates)
- IBWR report (CST execution evidence)

---

## 5. Combined Wave Testing (CWT)

### 5.1 Definition

**Combined Wave Testing (CWT)** is comprehensive, mandatory cross-wave, cross-module, multi-scenario integration testing conducted after wave QA passes and before IBWR completion.

CWT is:
- **Mandatory:** ALWAYS required before IBWR (non-negotiable)
- **Comprehensive:** Cross-wave + cross-module + multi-scenario coverage
- **Integration-focused:** Validates entire system state after wave N
- **Blocking:** IBWR CANNOT complete without CWT PASS

CWT is NOT:
- **Optional:** CWT is constitutionally required
- **Deferrable:** CWT cannot be postponed or skipped
- **Replaceable:** No substitute for CWT (not E2E, not cumulative regression)
- **Exhaustive E2E:** CWT validates integration, not full production scenarios

---

### 5.2 When CWT Applies

**CWT Timing:**
- **ALWAYS** after wave N QA passes (cumulative regression GREEN)
- **ALWAYS** before IBWR completion
- **ALWAYS** before wave closure certification finalized
- **ALWAYS** before wave gate merge authorized

**CWT Mandate:**
> **CWT is a constitutional requirement. IBWR CANNOT complete without CWT PASS.**

**No Exceptions:**
- CWT cannot be skipped to accelerate wave closure
- CWT cannot be deferred to next wave or E2E
- CWT failure blocks IBWR completion absolutely

---

### 5.3 CWT Scope and Coverage

**CWT Validates:**

#### Cross-Wave Integration
- All waves through current wave (Wave 1 → Wave 2 → ... → Wave N)
- Wave-to-wave dependencies and interactions
- Cumulative system behavior with all waves integrated

#### Cross-Module Integration
- All modules within current wave
- Module-to-module interfaces and data flows
- Architectural boundaries (frontend ↔ backend, service ↔ database, etc.)

#### Multi-Scenario Validation
- **Happy path scenarios:** Core workflows end-to-end
- **Error path scenarios:** Graceful failure handling
- **Edge case scenarios:** Boundary conditions, unusual inputs
- **Integration scenarios:** Complex multi-module interactions

**CWT Coverage Requirements:**
- ✅ All major integration points covered
- ✅ All cross-wave dependencies validated
- ✅ All architectural boundaries tested
- ✅ Happy path + critical error paths + edge cases

**CWT Is NOT Full E2E:**
CWT validates integration completeness, not exhaustive production scenarios. Full E2E validation occurs later in release pipeline.

---

### 5.4 CWT Execution and Evidence

**CWT Execution Timing:**
- After wave N QA passes (cumulative regression GREEN)
- Before IBWR reconciliation report finalized
- Before wave gate merge authorized

**CWT Execution Responsibility:**
- **FM:** Executes or coordinates CWT execution
- **Builders:** Provide cross-wave integration tests
- **QA-Builder (if exists):** May execute CWT validation
- **FM:** Validates CWT completion and evidence

**CWT Evidence Requirements:**
- [ ] CWT scope defined (waves covered, modules covered, scenarios covered)
- [ ] CWT tests executed (automated or manual with documented steps)
- [ ] CWT results recorded (PASS/FAIL with detailed evidence)
- [ ] Cross-wave integration validated (all waves through Wave N)
- [ ] Cross-module integration validated (all modules in Wave N)
- [ ] Multi-scenario coverage verified (happy + error + edge cases)
- [ ] CWT PASS verdict recorded in IBWR report

**CWT Failure Response:**
- CWT failures BLOCK IBWR completion
- Integration issues trigger corrective actions
- Wave closure CANNOT proceed with unresolved CWT failures
- FM escalates if CWT reveals systemic integration gaps

---

### 5.5 CWT Documentation

**CWT Requirements Documented In:**
- IN_BETWEEN_WAVE_RECONCILIATION.md (Section 4: Required Inputs)
- WAVE_RECONCILIATION_REPORT.template.md (Section: CWT Validation Results)

**CWT Results Documented In:**
- Wave reconciliation report (Section: CWT Validation Results)
- IBWR completion checklist (CWT evidence verified)
- Wave closure certification (CWT PASS prerequisite)

---

## 6. CST vs. CWT Decision Matrix

| Dimension | Combined Subwave Testing (CST) | Combined Wave Testing (CWT) |
|-----------|-------------------------------|----------------------------|
| **Timing** | Mid-wave, at convergence points | After wave QA, before IBWR |
| **Mandate** | Strategic (when integration risk justifies) | Mandatory (always required) |
| **Scope** | Cross-subwave, cross-module at integration points | Cross-wave, cross-module, multi-scenario |
| **Coverage** | Focused on strategic integration points | Comprehensive integration validation |
| **Purpose** | Early feedback, prevent late rework | Absolute integration assurance |
| **Blocking** | Blocks wave completion if failures exist | Blocks IBWR completion if failures exist |
| **Decision** | Apply when integration risk is high | Always apply (non-negotiable) |

---

## 7. Roles and Responsibilities

### 7.1 FM Responsibilities

**CST:**
- Identify CST convergence checkpoints during wave planning
- Document CST scope and scenarios in wave plan
- Coordinate CST execution at appropriate milestones
- Validate CST evidence and resolve CST failures
- Record CST results in wave implementation progress

**CWT:**
- Execute or coordinate CWT execution before IBWR
- Define CWT scope (waves, modules, scenarios)
- Validate CWT evidence and completeness
- Record CWT results in wave reconciliation report
- Block IBWR completion if CWT fails

**FM Cannot:**
- Skip CST when integration risk is high
- Skip CWT under any circumstances
- Declare IBWR complete without CWT PASS
- Defer CWT to next wave or E2E

---

### 7.2 Builder Responsibilities

**CST:**
- Provide integration tests for CST scenarios
- Ensure subwave deliverables are integration-ready
- Support CST execution when required
- Fix integration issues discovered by CST

**CWT:**
- Provide cross-wave integration tests
- Ensure wave deliverables support CWT validation
- Support CWT execution when required
- Fix integration issues discovered by CWT

**Builders Cannot:**
- Deliver subwaves without integration test coverage
- Claim wave completion without CWT validation
- Skip integration testing to accelerate delivery

---

### 7.3 Governance Administrator Responsibilities

**Governance Administrator:**
- Maintains CST/CWT canonical pattern (this document)
- Validates CST/CWT integration into IBWR process
- Reviews CST/CWT evidence in wave reconciliation reports
- Identifies CST/CWT pattern improvements

**Governance Administrator Cannot:**
- Approve IBWR without CWT validation
- Weaken CST/CWT requirements to accelerate waves
- Skip CST/CWT pattern updates when gaps identified

---

## 8. Integration with Existing Governance

### 8.1 Wave Model Integration

**WAVE_MODEL.md Updated Lifecycle:**
1. Wave Planning → **Identify CST convergence checkpoints**
2. Wave Execution → **Execute CST at strategic milestones**
3. Wave QA → Cumulative regression validation
4. Wave Completion → **Execute CWT (mandatory)**
5. IBWR → **Validate CWT evidence, complete reconciliation**
6. Next-Wave Authorization

**Wave Progression Rule (Updated):**
> Waves execute in order (0 → 1 → 2 → 3 → ...). Each wave must pass CWT before IBWR completion. IBWR must complete before next wave begins.

---

### 8.2 IBWR Integration

**IN_BETWEEN_WAVE_RECONCILIATION.md Integration:**

**Section 4: Required Inputs (Updated):**
- Add: CWT execution evidence (scope, tests, results)
- Add: CWT PASS verdict recorded
- Add: Cross-wave integration validation evidence

**Section 6: IBWR Completion Criteria (Updated):**
- [ ] CWT executed and PASS verdict recorded
- [ ] Cross-wave integration validated
- [ ] Multi-scenario coverage verified
- [ ] CWT evidence documented in wave reconciliation report

**Blocking Rule (Reinforced):**
> **IBWR CANNOT complete without CWT PASS. Failure to execute CWT SHALL block next-wave authorization.**

---

### 8.3 Wave Reconciliation Report Integration

**WAVE_RECONCILIATION_REPORT.template.md Updates:**

**New Sections Added:**

#### Section: CST Checkpoint Documentation
- CST convergence points identified in wave planning
- CST scenarios executed during wave
- CST results (PASS/FAIL with evidence)
- Integration issues discovered and resolved

#### Section: CWT Validation Results
- CWT scope (waves covered, modules covered, scenarios covered)
- CWT execution evidence (tests run, results)
- Cross-wave integration validation (PASS/FAIL)
- Multi-scenario coverage verification (PASS/FAIL)
- CWT PASS verdict (required for IBWR completion)

---

## 9. Testing Hierarchy

**Maturion Testing Model (Updated):**

```
Level 1: Unit Tests
  ↓ (validate individual components)
Level 2: Subwave QA
  ↓ (validate subwave features)
Level 3: Wave QA (Cumulative Regression)
  ↓ (validate no regression across waves)
Level 4: Combined Subwave Testing (CST) ← NEW (strategic)
  ↓ (validate integration at convergence points)
Level 5: Combined Wave Testing (CWT) ← NEW (mandatory)
  ↓ (validate cross-wave, cross-module integration)
Level 6: E2E Validation
  ↓ (validate production scenarios)
```

**Key Distinctions:**
- **CST:** Strategic, selective, mid-wave
- **CWT:** Mandatory, comprehensive, pre-IBWR
- **E2E:** Production scenarios, final validation

---

## 10. Cost vs. Assurance Balance

### 10.1 Strategic Testing Principle

**Core Principle:** Testing cost must be justified by integration risk and feedback value.

**CST Application:**
- Apply CST when integration failure cost is high
- Skip CST when cumulative regression provides sufficient assurance
- Balance testing cost with integration risk

**CWT Application:**
- CWT is NOT subject to cost/benefit analysis
- CWT is constitutionally required
- CWT cost is justified by absolute integration assurance before IBWR

**Decision Framework:**
```
Low Integration Risk → Cumulative Regression (Wave QA) sufficient
Medium Integration Risk → Apply CST at convergence points
High Integration Risk (Always) → CWT mandatory before IBWR
```

---

### 10.2 Avoiding Over-Testing

**Over-Testing Indicators:**
- CST applied to every subwave (not strategic)
- CST duplicates cumulative regression coverage
- CST executed without clear integration risk justification

**Right-Sized Testing:**
- CST applied only at strategic convergence points
- CST validates integration not covered by subwave/wave QA
- CWT validates cross-wave integration comprehensively

**Balance Goal:**
- Early integration feedback (CST) without exhaustive overhead
- Comprehensive integration assurance (CWT) before wave closure
- Testing cost justified by integration risk and feedback value

---

## 11. Prohibited Behaviors

### 11.1 FM MUST NOT
- Skip CWT under any circumstances
- Declare IBWR complete without CWT PASS
- Defer CWT to next wave or E2E
- Skip CST when integration risk is high
- Proceed with wave closure with unresolved CST/CWT failures

### 11.2 Builders MUST NOT
- Deliver subwaves without integration test coverage
- Claim wave completion without CWT validation
- Skip integration testing to accelerate delivery
- Provide inadequate CST/CWT test coverage

### 11.3 Governance Administrator MUST NOT
- Approve IBWR without CWT validation
- Weaken CST/CWT requirements to accelerate waves
- Allow CST/CWT pattern gaps to persist

---

## 12. Escalation and Exceptions

### 12.1 When to Escalate

FM MUST escalate to human authority when:
- CWT reveals systemic integration gaps
- CST/CWT execution blocked by missing infrastructure
- CWT timeline exceeds expected duration
- CST/CWT requirements conflict with wave schedule

### 12.2 CWT Override (Emergency Only)

**Override Authority:** Johan (human authority) only

**Override Conditions:**
- Critical production issue requires immediate next wave
- CWT delay unacceptable for business reasons
- Explicit risk acknowledgment documented

**Override Requirements:**
- Document override reason in wave reconciliation report
- Document integration risks accepted
- Document deferred CWT execution plan
- Schedule makeup CWT within 1 week
- Next wave proceeds at risk

**Override is NOT routine.** CWT exists to prevent integration failures. Overrides weaken governance.

---

## 13. Evolution and Continuous Improvement

### 13.1 CST/CWT Pattern Evolution

**First Application:**
- Apply CST/CWT pattern in next IBWR
- Collect evidence on CST convergence point identification
- Measure CWT execution cost and integration issue detection
- Refine CST decision framework based on experience

**Pattern Refinement:**
- Adjust CST convergence criteria based on integration issue patterns
- Refine CWT scope based on cross-wave integration complexity
- Update CST/CWT guidance based on execution learnings

**Meta-Learning:**
- After several waves, assess CST/CWT effectiveness
- Identify CST/CWT pattern improvements
- Update canonical pattern based on evidence

---

### 13.2 Automation Opportunities

**Future State:**
- Automated CST checkpoint identification (based on dependency analysis)
- Automated CWT execution (comprehensive integration test suite)
- Automated CST/CWT evidence collection
- CI gates enforce CST/CWT completion

**Transition Path:**
- Bootstrap mode (manual CST/CWT identification and execution)
- Semi-automated mode (tooling assists, human validates)
- Fully automated mode (CI enforces, human oversees)

---

## 14. Precedence and Final Authority

This document has canonical authority over integration testing strategy for multi-wave builds.

If any wave planning, testing strategy, or IBWR process conflicts with this document, this document prevails.

This canon is subordinate to:
1. Johan Ras (human final authority)
2. BUILD_PHILOSOPHY.md (quality and build standards)
3. WAVE_MODEL.md (wave execution structure)

This canon is superior to:
- All wave testing strategies (must comply with CST/CWT)
- All FM testing decisions (CST strategic, CWT mandatory)
- All builder test plans (must support CST/CWT)

---

## 15. Authority Hierarchy (Canonical Precedence)

If conflict exists, higher authority prevails:

1. **Johan Ras (Human Owner / Final Authority)** — Supreme
2. **BUILD_PHILOSOPHY.md** — One-Time Build Law and quality standards
3. **WAVE_MODEL.md** — Wave execution structure
4. **This Document (COMBINED_TESTING_PATTERN.md)** — Integration testing requirements
5. **IN_BETWEEN_WAVE_RECONCILIATION.md** — IBWR requirements (CWT integrated here)
6. **FM Testing Decisions** — Operational decisions within delegated authority

**Resolution Principle:** If FM attempts to skip CWT, this canon blocks IBWR completion. If FM skips CST when integration risk is high, this canon requires justification or corrective action.

---

**End of COMBINED_TESTING_PATTERN.md**
