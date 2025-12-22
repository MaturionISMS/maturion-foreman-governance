# BUILDER QA HANDOVER POLICY

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Governance Administrator  
Effective Date: 2025-12-22  
Required By: Post-Transition Governance Model

---

## 1. Purpose

This policy defines the **Builder QA Handover Contract** - the canonical requirements for Builder agents to hand over work to the Governance Gate for merge authorization.

This policy implements the post-transition governance model where:
- **Builder QA is the source of truth** for merge readiness
- **PR Gates validate compliance**, not correctness
- **Separation of duties** is absolute and non-negotiable

This policy is **normative**. All Builder agents MUST comply.

---

## 2. Constitutional Authority

This policy derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, Build-to-Green mandate
- **QA_POLICY_MASTER.md** - QA coverage requirements and Gate-Eligible Green
- **GOVERNANCE_GATE_CANON.md** - Gate as enforcement-only, evidence-based validation

---

## 3. Core Principles

### 3.1 Agent-Scoped QA Is Absolute

**Builder agents are responsible ONLY for Builder QA.**

Builder QA includes:
- Architecture conformance
- Implementation correctness
- Test execution and pass rate
- Build-to-Green achievement
- Evidence generation

Builder QA does NOT include:
- Governance policy validation (Governance Administrator responsibility)
- FM orchestration validation (FM responsibility)
- Cross-repository coordination (FM responsibility)

**Violation of QA scope boundaries is a catastrophic governance failure.**

### 3.2 Builder QA Is the Source of Truth

Builder QA Reports are the **PRIMARY and AUTHORITATIVE** source of merge readiness.

- Builder executes full QA suite
- Builder generates conforming QA reports
- Builder declares READY or NOT_READY
- Builder attests to report accuracy

**CI output, PR comments, logs, or gate diagnostics are NOT substitutes for Builder QA Reports.**

### 3.3 Handover Is a Contractual Act

Handover is a **formal contract** where Builder:
1. Declares work complete
2. Attests QA is 100% PASS
3. Provides evidence bundle
4. Authorizes gate evaluation

Handover is **irrevocable** - once submitted, Builder cannot modify reports (only generate new versions).

### 3.4 Gates Validate Compliance, Not Correctness

PR Gates validate:
- ✅ Required reports exist
- ✅ Reports conform to schema
- ✅ Reports declare READY
- ✅ Evidence is complete
- ✅ Governance rules followed

PR Gates DO NOT:
- ❌ Re-run Builder QA
- ❌ Discover defects
- ❌ Validate implementation correctness
- ❌ Interpret CI logs
- ❌ Judge test quality

**If compliance checks pass, gate MUST pass. If compliance checks fail, gate MUST fail.**

---

## 4. Handover Pre-Conditions

Builder MUST meet ALL pre-conditions before handover:

### 4.1 QA Execution Complete
- ✅ All required tests executed
- ✅ All QA domains covered (10 mandatory domains per QA_POLICY_MASTER.md)
- ✅ All tests passing (100% PASS)
- ✅ Zero test debt (no skipped tests without justification)
- ✅ Build-to-Green achieved

### 4.2 Evidence Generated
- ✅ `.qa/builder/SUMMARY.md` exists and conforms to schema
- ✅ `.qa/builder/BUILD_QA_REPORT.json` exists and conforms to schema
- ✅ `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` exists and conforms to schema
- ✅ All evidence artifacts referenced in reports exist
- ✅ Evidence is immutable (committed to version control)

### 4.3 Governance Compliance Verified
- ✅ Build Philosophy compliant (One-Time Build Law, Requirements-first, Architecture-before-code)
- ✅ Zero Test Debt compliant
- ✅ Scope isolation maintained
- ✅ Evidence trail complete
- ✅ All 10 QA domains addressed

### 4.4 Architecture Conformance Verified
- ✅ Architecture document exists and referenced
- ✅ Implementation follows architecture
- ✅ No unauthorized deviations
- ✅ Architecture compliance explicitly verified

### 4.5 Handover Decision Declared
- ✅ Status = READY (not NOT_READY or INCOMPLETE)
- ✅ Merge Readiness = READY
- ✅ Handover Decision = READY_FOR_MERGE
- ✅ Builder attestation present

**If ANY pre-condition is not met, handover is INVALID and gate MUST fail.**

---

## 5. Handover Artifacts (Mandatory)

Builder MUST provide these artifacts:

### 5.1 Human-Readable Summary
**Path**: `.qa/builder/SUMMARY.md`  
**Schema**: `governance/schemas/BUILDER_QA_REPORT.schema.md` Section 5  
**Purpose**: Human-readable QA summary and merge readiness declaration

**Required Content**:
- Issue number and Builder ID
- Executive summary with handover decision
- Build status (Build-to-Green, test results, test debt)
- Governance compliance assessment
- Test execution details with QA domain coverage
- Blocking issues (if any)
- Architecture compliance verification
- Evidence artifact references
- Builder attestation

### 5.2 Machine-Readable QA Report
**Path**: `.qa/builder/BUILD_QA_REPORT.json`  
**Schema**: `governance/schemas/BUILDER_QA_REPORT.schema.md` Section 6  
**Purpose**: Machine-readable QA data for automated gate validation

**Required Content**:
- Report metadata (issue, builder, timestamp, repository)
- Build status (Build-to-Green, test results)
- Governance compliance (all dimensions)
- Test execution details
- QA domain coverage (all 10 domains)
- Blocking issues (if any)
- Architecture compliance
- Handover decision with attestation

### 5.3 Governance Compliance Report
**Path**: `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`  
**Schema**: `governance/schemas/BUILDER_QA_REPORT.schema.md` Section 7  
**Purpose**: Detailed governance compliance verification

**Required Content**:
- Build Philosophy compliance (One-Time Build Law, Requirements-first, Architecture-before-code)
- QA Policy compliance (Gate-Eligible Green, 10-domain coverage, Zero Test Debt)
- Scope control compliance
- Evidence trail completeness
- Overall compliance assessment

### 5.4 Supporting Evidence (as referenced)
**Path**: `.qa/builder/evidence/*`  
**Purpose**: Test results, logs, coverage reports, etc.

**Requirements**:
- All referenced evidence MUST exist
- Evidence MUST be immutable
- Evidence MUST be traceable to execution

---

## 6. Handover Process

### 6.1 Builder Execution Phase
1. Builder receives issue assignment from FM
2. Builder reviews architecture and requirements
3. Builder implements changes
4. Builder executes full QA suite
5. Builder iterates until 100% PASS achieved
6. Builder generates QA reports
7. Builder verifies all pre-conditions met

### 6.2 Handover Submission Phase
1. Builder commits all implementation code
2. Builder commits all QA reports to `.qa/builder/`
3. Builder commits all evidence artifacts
4. Builder declares Handover Decision = READY_FOR_MERGE in reports
5. Builder attests to report accuracy
6. Builder pushes to PR branch
7. Builder signals handover complete (via PR comment or FM notification)

### 6.3 Gate Validation Phase
1. PR merge attempted (manual or automated)
2. Governance Gate activates
3. Gate validates report presence
4. Gate validates schema conformance
5. Gate validates compliance checks
6. Gate makes PASS/FAIL decision
7. Gate allows merge (PASS) or blocks merge (FAIL)

### 6.4 Post-Handover Phase
- If gate PASSES: PR merges, work complete
- If gate FAILS: Builder reviews gate failure, remediates governance issues, re-submits

---

## 7. Handover Decision Semantics

### 7.1 READY_FOR_MERGE
**Meaning**: Builder declares that work is complete, QA is 100% PASS, all governance requirements met, and PR is authorized for gate evaluation and merge.

**Builder Commitment**:
- All tests passing
- Zero test debt
- Architecture compliant
- Governance compliant
- Evidence complete
- Attestation provided

**Gate Action**: Proceed with validation. If validation passes, MERGE. If validation fails, BLOCK with governance failure reason.

### 7.2 NOT_READY_FOR_MERGE
**Meaning**: Builder declares that work is NOT ready for merge due to blocking issues.

**Builder Commitment**:
- Blocking issues documented
- Remediation plan provided (if appropriate)
- No attestation of readiness

**Gate Action**: BLOCK merge immediately. Do not proceed with validation.

### 7.3 REQUIRES_REVIEW (Borderline)
**Meaning**: Builder is uncertain about readiness and requests human judgment.

**Builder Commitment**:
- QA may be passing but edge cases exist
- Governance compliance unclear
- Human review explicitly requested

**Gate Action**: BLOCK merge pending human review. Escalate per PR_GATE_FAILURE_HANDLING_PROTOCOL.md.

---

## 8. Failure Handling

### 8.1 QA Failure Before Handover
If Builder QA fails (tests fail, test debt exists, architecture non-conformance):
- Builder MUST fix failures
- Builder MUST re-run QA
- Builder MUST NOT hand over until 100% PASS
- Builder MUST NOT declare READY_FOR_MERGE

**Handover with failing QA is a governance violation.**

### 8.2 Gate Validation Failure After Handover
If Gate validation fails (missing reports, schema non-conformance, compliance violations):
- Gate BLOCKS merge
- Gate provides failure reason
- Builder reviews failure
- Builder remediates governance issue (not code issues - those should be resolved before handover)
- Builder re-submits handover

**Gate failures are governance/process failures, not code defects.**

### 8.3 Post-Merge Discovery
If issues are discovered after merge:
- Failure recording per FAILURE_SCHEMA.schema.md
- Learning promotion per LEARNING_SCHEMA.schema.md
- Root cause analysis required
- Builder QA process improvement required

**Post-merge failures indicate Builder QA gaps, not gate failures.**

---

## 9. Governance Invariants

### 9.1 Non-Negotiable Invariants
1. **Builder QA must be 100% PASS before handover**
2. **Builder cannot hand over NOT_READY work**
3. **Gates validate compliance, never correctness**
4. **Reports are immutable after submission**
5. **Builder attestation is required and binding**
6. **Evidence must be complete and traceable**
7. **Separation of duties is absolute**

### 9.2 Prohibited Actions
1. ❌ Builder handing over with failing tests
2. ❌ Builder declaring READY without running QA
3. ❌ Gate re-running Builder QA
4. ❌ Gate validating code correctness
5. ❌ Governance agent running Builder QA
6. ❌ Modifying reports after submission
7. ❌ Manual merge without gate validation

---

## 10. Enforcement

### 10.1 Gate Enforcement
- PR Gates enforce this policy automatically
- Gate validation is mandatory and non-bypassable
- Gate failure BLOCKS merge (no exceptions except documented emergency bypass)

### 10.2 Governance Administrator Enforcement
- Governance Administrator audits handover compliance
- Non-compliant handovers recorded as governance incidents
- Repeated violations trigger escalation per ESCALATION_POLICY.md

### 10.3 Builder Accountability
- Builders are accountable for QA accuracy
- False READY declarations are governance violations
- Persistent QA gaps may result in builder contract review

---

## 11. Integration with Other Governance

This policy integrates with:
- **BUILDER_QA_REPORT.schema.md**: Defines report structure
- **QA_POLICY_MASTER.md**: Defines QA coverage requirements
- **BUILD_PHILOSOPHY.md**: Defines Build-to-Green and One-Time Build Law
- **GOVERNANCE_GATE_CANON.md**: Defines gate enforcement model
- **PR_GATE_FAILURE_HANDLING_PROTOCOL.md**: Defines failure handling
- **GOVERNANCE_COMPLETENESS_MODEL.md**: Satisfies Builder QA canonicalization

---

## 12. Audit and Compliance

### 12.1 Audit Requirements
- All Builder QA Reports retained as audit evidence
- Handover compliance auditable via report history
- Gate decisions auditable via workflow logs
- Builder attestations legally binding

### 12.2 Compliance Verification
- Quarterly compliance audits of handover process
- Builder QA effectiveness measured by post-merge failure rate
- Gate effectiveness measured by false positive/negative rate

---

## 13. Policy Change Control

This policy may only be changed by:
1. Governance Administrator proposes change
2. Change reviewed against higher canon (GOVERNANCE_PURPOSE_AND_SCOPE.md, BUILD_PHILOSOPHY.md)
3. Johan approves change
4. Change implemented via governance PR
5. Change communicated to all Builders

**No agent may unilaterally modify handover requirements.**

---

## 14. Conclusion

This policy ensures:
- Clear handover contracts
- Separation of duties
- Evidence-based merge decisions
- Accountability and traceability
- Audit readiness
- Governance integrity

**Builders prove correctness. Governance verifies compliance. Gates enforce contracts.**

---

**End of BUILDER_QA_HANDOVER_POLICY**

---

**Document Metadata**:
- Policy ID: BUILDER_QA_HANDOVER_POLICY_V1
- Authority: Canonical Governance Policy
- Effective Date: 2025-12-22
- Required By: Post-Transition Governance Model
- Enforcement: Mandatory for all Builder agents
- Integration: BUILDER_QA_REPORT.schema.md, QA_POLICY_MASTER.md, GOVERNANCE_GATE_CANON.md
