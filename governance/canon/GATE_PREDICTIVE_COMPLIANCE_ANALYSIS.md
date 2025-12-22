# GATE-PREDICTIVE COMPLIANCE ANALYSIS (GPCA)

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Governance Administrator  
Effective Date: 2025-12-22  
Required By: Post-Transition Governance Model, GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

This document defines the **Gate-Predictive Compliance Analysis (GPCA)** model - a pre-handover, read-only compliance prediction mechanism that enables agents to predict PR gate outcomes before submission.

GPCA exists to:
- Eliminate blind PR submissions
- Reduce wasted gate debugging time
- Enable agents to predict PR gate outcomes deterministically
- Ensure PR gate failures are never surprises
- Maintain separation of duties while providing predictability

GPCA is a **refinement**, not a correction. Core governance principles remain unchanged.

---

## 2. Constitutional Authority

This policy derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, predictability mandate
- **PR_GATE_PRECONDITION_RULE.md** - Gate precondition enforcement
- **BUILDER_QA_HANDOVER_POLICY.md** - Builder handover contracts
- **GOVERNANCE_GATE_CANON.md** - Gate enforcement model

---

## 3. Core Principles

### 3.1 GPCA Is Prediction, Not Enforcement

GPCA produces **predictions** about gate outcomes, not authoritative decisions.

- GPCA predicts whether a submission will pass gates
- PR Gates make actual enforcement decisions
- GPCA and gates must remain consistent
- Gates are authoritative, GPCA is advisory

### 3.2 GPCA Is Read-Only Analysis

GPCA is a **read-only compliance analysis** that:
- Consumes governance artifacts
- Analyzes declared evidence
- Predicts gate outcomes
- Does NOT execute QA
- Does NOT validate correctness
- Does NOT inspect runtime artifacts

### 3.3 GPCA Is NOT QA (Critical)

GPCA **must never**:
- ❌ Run tests
- ❌ Execute another agent's QA
- ❌ Validate implementation correctness
- ❌ Inspect CI logs
- ❌ Re-interpret test results
- ❌ Discover code defects

**Doing so is a catastrophic separation-of-duties violation.**

### 3.4 Predictability Invariant (Mandatory)

> **Any PR gate failure NOT predicted by GPCA is a governance defect, not a builder failure.**

This invariant ensures:
- Gates are transparent and predictable
- No hidden gate requirements
- No surprise failures
- Complete governance documentation
- Continuous governance improvement

**This invariant is non-negotiable.**

---

## 4. GPCA Inputs (Read-Only)

GPCA may **only** consume these inputs:

### 4.1 Canonical Governance Artifacts
- PR gate requirement definitions
- Governance schemas (BUILDER_QA_REPORT, GOVERNANCE_COMPLIANCE_REPORT, etc.)
- Governance policies (BUILDER_QA_HANDOVER_POLICY, PR_GATE_PRECONDITION_RULE, etc.)
- Agent role definitions and contracts
- Compliance rules and invariants

### 4.2 Declared Evidence Artifacts (Metadata Only)
- Builder QA report files (`.qa/builder/SUMMARY.md`, `BUILD_QA_REPORT.json`)
- Governance compliance reports (`.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`)
- Evidence file presence (not content analysis)
- Schema conformance check results
- Declared handover status

### 4.3 Repository Metadata
- File existence checks
- Directory structure validation
- Schema validation results
- Declared compliance status

### 4.4 Prohibited Inputs

GPCA must **NEVER** consume:
- ❌ Execution artifacts (CI logs, test output)
- ❌ Runtime state
- ❌ Test results (except as declared in QA reports)
- ❌ Build logs
- ❌ Code quality metrics
- ❌ Implementation details

**GPCA validates declared evidence, not execution correctness.**

---

## 5. GPCA Outputs

GPCA produces one of two predictions:

### 5.1 PREDICT_PASS

**Meaning**: Based on current evidence and governance rules, the PR gate is predicted to **PASS**.

**Interpretation**:
- All required artifacts present
- All artifacts conform to schemas
- All governance rules satisfied
- All compliance checks predicted to pass
- No blocking issues detected

**Builder Action**: Proceed with handover submission

**Confidence**: High (but not absolute - gates make final decision)

### 5.2 PREDICT_FAIL

**Meaning**: Based on current evidence and governance rules, the PR gate is predicted to **FAIL**.

**Interpretation**:
- One or more required artifacts missing
- One or more artifacts violate schemas
- One or more governance rules violated
- One or more compliance checks predicted to fail
- Blocking issues detected

**Builder Action**: DO NOT submit handover until issues resolved

**Failure Reasons**: GPCA must provide explicit governance reason(s):
- Missing required artifact
- Schema non-compliance
- Invalid READY declaration
- Unauthorized agent scope
- Evidence incompleteness
- Governance rule violation

**Required Output**: Specific, actionable failure description with references to violated governance rules

---

## 6. GPCA Execution Model

### 6.1 Who Can Run GPCA

GPCA may be executed by:
- **Builder agents** (before handover submission) - RECOMMENDED
- **Governance Administrator** (for governance validation)
- **Foreman (FM)** (for orchestration purposes)

GPCA should **NOT** be run by:
- ❌ PR Gate (gates enforce, not predict)
- ❌ Unauthorized agents

### 6.2 When GPCA Should Run

**Recommended Execution Points**:
1. **Before handover submission** (Builder pre-flight check)
2. **During governance validation** (Governance Administrator audit)
3. **During governance evolution** (testing gate rule changes)

**NOT recommended**:
- ❌ During active development
- ❌ After gate failure (too late)
- ❌ As substitute for gate execution

### 6.3 GPCA Execution Procedure

1. **Collect Governance Requirements**: Load all applicable PR gate rules
2. **Analyze Evidence**: Check presence and conformance of required artifacts
3. **Evaluate Compliance**: Assess governance rule satisfaction
4. **Generate Prediction**: Produce PREDICT_PASS or PREDICT_FAIL
5. **Provide Rationale**: If PREDICT_FAIL, provide specific failure reasons
6. **Document Result**: Record prediction for audit trail

### 6.4 GPCA Is Optional But Recommended

GPCA execution is **optional** for builders:
- Builders MAY run GPCA before handover
- Builders are NOT required to run GPCA
- Running GPCA improves efficiency but does not change requirements
- Skipping GPCA increases risk of gate failure

**Best Practice**: Always run GPCA before handover submission

---

## 7. Agent Responsibilities (Refined)

### 7.1 Builder Agent

**Responsibilities**:
- Runs Builder QA (mandatory)
- Fixes QA failures (mandatory)
- Generates QA reports (mandatory)
- Declares READY status (mandatory)
- **Optionally** runs GPCA before submission (recommended)
- Interprets GPCA predictions
- Remediates predicted failures before submission

**Prohibited Actions**:
- ❌ Substituting GPCA for Builder QA
- ❌ Declaring READY based solely on GPCA prediction
- ❌ Skipping QA execution

**Separation of Duties**: Builder QA proves correctness; GPCA predicts compliance

### 7.2 Governance Administrator

**Responsibilities**:
- Defines PR gate requirements (mandatory)
- Defines governance schemas (mandatory)
- Maintains GPCA prediction logic (mandatory)
- May run GPCA for governance validation (optional)
- Investigates GPCA mispredictions (mandatory)
- Updates governance when mispredictions occur (mandatory)

**Prohibited Actions**:
- ❌ Running Builder QA
- ❌ Validating implementation correctness
- ❌ Substituting GPCA for gate enforcement

**Separation of Duties**: Governance defines rules; gates enforce rules; GPCA predicts outcomes

### 7.3 PR Gate

**Responsibilities**:
- Enforces governance compliance (mandatory)
- Makes authoritative PASS/FAIL decisions (mandatory)
- Must behave consistently with GPCA predictions (mandatory)
- Reports failures with clear classifications (mandatory)

**Prohibited Actions**:
- ❌ Running Builder QA
- ❌ Discovering code defects
- ❌ Making unpredictable decisions

**Separation of Duties**: Gates enforce; GPCA predicts; consistency is mandatory

### 7.4 Foreman (FM)

**Responsibilities**:
- Orchestrates builder activities (mandatory)
- May use GPCA for workflow optimization (optional)
- Investigates systematic prediction failures (mandatory)
- Updates builder contracts based on patterns (mandatory)

---

## 8. GPCA and Gate Consistency

### 8.1 Consistency Requirement

PR Gates **must** behave consistently with GPCA predictions:
- If GPCA predicts PASS, gate should PASS (assuming no changes)
- If GPCA predicts FAIL, gate should FAIL (same failure reason)
- Inconsistencies indicate governance defects

### 8.2 GPCA Misprediction Handling

If GPCA and gate disagree:

**Case 1: GPCA predicts PASS, gate FAILS**
- **Classification**: Governance defect (GPCA_MISPREDICTION_FALSE_POSITIVE)
- **Root Cause**: GPCA missed a gate requirement
- **Responsibility**: Governance Administrator
- **Action**: Update GPCA logic to detect the missed requirement
- **Effect**: Prevents future false positives

**Case 2: GPCA predicts FAIL, gate PASSES**
- **Classification**: Governance defect (GPCA_MISPREDICTION_FALSE_NEGATIVE)
- **Root Cause**: GPCA has overly strict check
- **Responsibility**: Governance Administrator
- **Action**: Update GPCA logic to remove incorrect check
- **Effect**: Prevents unnecessary builder work

**Case 3: Same outcome, different reason**
- **Classification**: Minor inconsistency (GPCA_REASON_MISMATCH)
- **Root Cause**: GPCA and gate use different error messages
- **Responsibility**: Governance Administrator
- **Action**: Align GPCA and gate error messaging
- **Effect**: Improves clarity

### 8.3 Misprediction Investigation

Every misprediction **must**:
1. Be recorded as governance incident
2. Have root cause analysis performed
3. Result in governance update
4. Be documented in audit trail
5. Be prevented from recurring

**Repeated mispredictions indicate systemic governance gaps.**

---

## 9. GPCA Report Schema

GPCA execution should produce a report conforming to:

**Schema Location**: `governance/schemas/GPCA_PREDICTION_REPORT.schema.md`

**Required Content**:
- Prediction timestamp
- Executor identity (which agent ran GPCA)
- Repository and PR context
- Prediction outcome (PREDICT_PASS / PREDICT_FAIL)
- Governance rules evaluated
- Evidence artifacts analyzed
- Failure reasons (if PREDICT_FAIL)
- Confidence assessment
- Recommendations

**Report Storage**: `.qa/gpca/PREDICTION_REPORT.md` (optional artifact)

---

## 10. GPCA Scope and Limitations

### 10.1 What GPCA Validates

GPCA validates **governance compliance**:
- Required artifact presence
- Schema conformance
- Declared handover status
- Governance rule satisfaction
- Evidence completeness (metadata)
- Compliance assertions

### 10.2 What GPCA Does NOT Validate

GPCA does NOT validate **implementation correctness**:
- ❌ Code quality
- ❌ Test effectiveness
- ❌ Functional correctness
- ❌ Performance
- ❌ Security vulnerabilities
- ❌ Architecture adherence (beyond declared compliance)

**Builder QA validates correctness; GPCA predicts compliance.**

---

## 11. Integration with Existing Governance

### 11.1 BUILDER_QA_HANDOVER_POLICY.md

GPCA is **optional pre-submission check**:
- Does not replace Builder QA
- Does not replace QA report generation
- Does not change handover requirements
- Provides early feedback on compliance

### 11.2 PR_GATE_PRECONDITION_RULE.md

GPCA helps enforce:
- Gates are predictable
- No blind submissions required
- Builders have visibility into gate requirements

### 11.3 PR_GATE_FAILURE_HANDLING_PROTOCOL.md

GPCA adds new failure classification:
- GPCA_MISPREDICTION (governance defect)
- Triggers governance investigation
- Results in governance updates

### 11.4 GOVERNANCE_COMPLETENESS_MODEL.md

GPCA contributes to governance completeness:
- Explicit gate requirements
- Predictable enforcement
- Auditable governance evolution

---

## 12. GPCA Governance Invariants

### 12.1 Non-Negotiable Invariants

1. **GPCA must never execute QA** (separation of duties)
2. **GPCA must never validate correctness** (Builder QA responsibility)
3. **GPCA must never be authoritative** (gates make final decisions)
4. **GPCA and gates must remain consistent** (predictability mandate)
5. **GPCA mispredictions are governance defects** (not builder failures)
6. **GPCA is read-only analysis** (no side effects)
7. **GPCA inputs are governance artifacts only** (no runtime data)

### 12.2 Prohibited Actions

1. ❌ Running tests during GPCA
2. ❌ Inspecting CI logs during GPCA
3. ❌ Validating code during GPCA
4. ❌ Using GPCA as substitute for QA
5. ❌ Using GPCA as substitute for gates
6. ❌ Making GPCA authoritative
7. ❌ Allowing unpredictable gates

---

## 13. GPCA and Governance Evolution

GPCA supports governance evolution:

### 13.1 Testing Gate Changes

Before deploying new gate rules:
1. Update GPCA logic
2. Test GPCA predictions on historical PRs
3. Verify no false positives/negatives
4. Deploy gate changes
5. Monitor for mispredictions

### 13.2 Validating Governance Completeness

GPCA helps validate:
- All gate requirements documented
- All schemas published
- All rules explicit
- No hidden requirements

### 13.3 Continuous Improvement

GPCA mispredictions drive:
- Governance clarification
- Schema refinement
- Gate improvement
- Documentation updates

---

## 14. Enforcement

### 14.1 Governance Administrator Enforcement

Governance Administrator must:
- Maintain GPCA consistency with gates
- Investigate all mispredictions
- Update GPCA logic when gates change
- Document GPCA validation procedures

### 14.2 Builder Accountability

Builders are encouraged but not required to:
- Run GPCA before handover
- Act on GPCA predictions
- Report GPCA issues

Builders remain accountable for:
- Builder QA execution (mandatory)
- QA report accuracy (mandatory)
- Meeting handover requirements (mandatory)

### 14.3 Gate Accountability

Gates must:
- Behave consistently with documented requirements
- Provide clear failure classifications
- Enable GPCA predictions
- Report failures transparently

---

## 15. Success Criteria

GPCA implementation is successful when:
- ✅ GPCA is formally defined and documented
- ✅ Separation of duties is preserved
- ✅ PR gate outcomes are predictable
- ✅ No blind PR submissions required
- ✅ GPCA and gates remain consistent
- ✅ Mispredictions trigger governance improvements
- ✅ Builders can confidently predict gate outcomes

---

## 16. Conclusion

GPCA enables:
- Predictable PR gate outcomes
- Reduced wasted debugging time
- Maintained separation of duties
- Continuous governance improvement
- Transparent enforcement
- Agent autonomy with accountability

**Predict before you enforce. Learn without weakening. Evolve without breaking trust.**

---

**End of GATE-PREDICTIVE COMPLIANCE ANALYSIS**

---

**Document Metadata**:
- Policy ID: GPCA_V1
- Authority: Canonical Governance Policy
- Effective Date: 2025-12-22
- Required By: Post-Transition Governance Model
- Integration: BUILDER_QA_HANDOVER_POLICY.md, PR_GATE_PRECONDITION_RULE.md, GOVERNANCE_GATE_CANON.md
