# PR GATE FAILURE HANDLING PROTOCOL

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Governance Administrator  
Effective Date: 2025-12-22  
Required By: GOVERNANCE_COMPLETENESS_MODEL.md, POST_TRANSITION_GOVERNANCE_SCAN

---

## 1. Purpose

This protocol defines the **canonical procedure** for handling PR Gate failures across all repositories in the Maturion Engineering Ecosystem.

PR Gate failures represent **governance and process compliance violations**, not code defects. This protocol ensures:
- Clear failure classification
- Unambiguous responsibility assignment
- Defined escalation paths
- Controlled emergency bypass procedures
- Complete audit trail

This protocol is **normative and mandatory**.

---

## 2. Constitutional Authority

This protocol derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory and enforcement
- **GOVERNANCE_GATE_CANON.md** - Gates as final merge authority
- **QA_POLICY_MASTER.md** - QA and verification doctrine
- **BUILD_PHILOSOPHY.md** - One-Time Build Law and zero-tolerance for failures

---

## 3. Core Principles

### 3.1 Gates Enforce Compliance, Not Correctness
- Gates validate **process compliance** (evidence, schemas, declarations)
- Gates do NOT validate **implementation correctness** (code quality, test effectiveness)
- Gate failures indicate **governance violations**, not builder mistakes

### 3.2 Failures Must Be Classified
Every gate failure MUST be classified into one of the defined categories (Section 5).

Unclassified failures cannot be remediated correctly.

### 3.3 Responsibility Is Explicit
For every failure type, responsibility is explicitly assigned:
- Builder responsibility (execution domain)
- Governance Administrator responsibility (governance domain)
- FM responsibility (orchestration domain)

Ambiguous responsibility is a protocol failure.

### 3.4 Escalation Is Controlled
Escalation paths are predefined and mandatory.

No silent bypasses. No ad-hoc approvals.

### 3.5 Audit Trail Is Complete
Every gate failure, remediation, and resolution MUST be documented for audit.

---

## 4. Gate Failure Detection

### 4.1 When Gates Activate
PR Gates activate at **PR merge time** (never during development or build).

Gate execution is triggered by:
- Manual merge attempt
- Automated merge workflow
- PR status check requirement

### 4.2 Gate Execution Phases
1. **Presence Check**: Verify required artifacts exist
2. **Schema Validation**: Validate artifacts conform to schemas
3. **Content Validation**: Validate artifact content consistency
4. **Compliance Check**: Evaluate governance rule compliance
5. **Decision**: PASS or FAIL

### 4.3 Failure Output
When gate FAILS, it MUST produce:
- **Failure Classification** (from Section 5)
- **Failure Description** (what rule was violated)
- **Responsible Party** (who must remediate)
- **Remediation Guidance** (how to fix)
- **Failure Timestamp** (when failure occurred)
- **Failure ID** (unique identifier for tracking)

---

## 5. Failure Classification (NORMATIVE)

Every gate failure MUST be classified as one of these types:

### 5.1 Missing Governance Artifact (GOVERNANCE)
**Classification**: `MISSING_ARTIFACT`  
**Description**: Required governance artifact not present  
**Examples**:
- `.qa/builder/SUMMARY.md` missing
- `.qa/builder/BUILD_QA_REPORT.json` missing
- Scope declaration missing
- Architecture document missing

**Responsible Party**: Builder (for Builder artifacts), Governance Administrator (for governance artifacts)

**Remediation**: Generate missing artifact per schema

**Severity**: CRITICAL (blocks merge)

---

### 5.2 Schema Non-Compliance (GOVERNANCE)
**Classification**: `SCHEMA_VIOLATION`  
**Description**: Artifact exists but does not conform to canonical schema  
**Examples**:
- SUMMARY.md missing required sections
- BUILD_QA_REPORT.json invalid JSON
- Wrong field types or values
- Missing required fields

**Responsible Party**: Builder (for Builder artifacts), Governance Administrator (for governance artifacts)

**Remediation**: Update artifact to conform to schema

**Severity**: CRITICAL (blocks merge)

---

### 5.3 Evidence Incompleteness (GOVERNANCE)
**Classification**: `EVIDENCE_INCOMPLETE`  
**Description**: Evidence trail is incomplete or broken  
**Examples**:
- Referenced evidence files missing
- Test results not provided
- Architecture compliance not documented
- Evidence artifacts not committed

**Responsible Party**: Builder

**Remediation**: Generate complete evidence bundle

**Severity**: CRITICAL (blocks merge)

---

### 5.4 Inconsistent Report Content (GOVERNANCE)
**Classification**: `CONTENT_INCONSISTENCY`  
**Description**: Report content is self-contradictory or logically inconsistent  
**Examples**:
- Status = READY but Merge Readiness = NOT_READY
- Zero Test Debt = Compliant but Skipped Tests > 0
- Build-to-Green = Achieved but Post-Build QA = FAIL
- Test counts don't sum correctly

**Responsible Party**: Builder

**Remediation**: Correct inconsistencies in reports

**Severity**: HIGH (blocks merge)

---

### 5.5 NOT_READY Declaration (INTENTIONAL BLOCK)
**Classification**: `NOT_READY_DECLARED`  
**Description**: Builder explicitly declared Handover Decision = NOT_READY_FOR_MERGE  
**Examples**:
- Builder found blocking issues
- Builder QA failed
- Builder requires additional work

**Responsible Party**: Builder

**Remediation**: Resolve blocking issues, re-run QA, declare READY when actually ready

**Severity**: INFORMATIONAL (intentional block, not a failure)

---

### 5.6 Governance Rule Violation (GOVERNANCE)
**Classification**: `GOVERNANCE_VIOLATION`  
**Description**: Specific governance rule violated  
**Examples**:
- Scope-to-diff mismatch
- Build Philosophy violation (test debt exists)
- QA coverage incomplete (missing domains)
- Cross-agent QA execution detected

**Responsible Party**: Builder (for execution violations), Governance Administrator (for policy violations)

**Remediation**: Comply with violated governance rule

**Severity**: CRITICAL (blocks merge)

---

### 5.7 Unauthorized Action (CATASTROPHIC)
**Classification**: `UNAUTHORIZED_ACTION`  
**Description**: Agent exceeded scope or performed prohibited action  
**Examples**:
- Governance agent ran Builder QA
- Builder modified governance policy
- Agent validated own governance
- Cross-scope QA execution

**Responsible Party**: FM (orchestration failure) and involved agent

**Remediation**: Immediate escalation, root cause analysis, agent contract review

**Severity**: CATASTROPHIC (blocks merge, triggers escalation)

---

### 5.8 Gate Infrastructure Failure (INFRASTRUCTURE)
**Classification**: `GATE_INFRASTRUCTURE_FAILURE`  
**Description**: Gate itself failed due to infrastructure issues  
**Examples**:
- GitHub Actions failure
- Gate script error
- Network timeout
- Schema file missing from governance repo

**Responsible Party**: Governance Administrator (for governance repo issues), Infrastructure (for platform issues)

**Remediation**: Fix gate infrastructure, re-run gate

**Severity**: CRITICAL (blocks merge but not PR fault)

---

### 5.9 GPCA Misprediction (GOVERNANCE DEFECT)

**Classification**: `GPCA_MISPREDICTION`  
**Description**: Gate outcome differs from GPCA prediction, violating Predictability Invariant  
**Examples**:
- GPCA predicted PASS, gate FAILED (false positive)
- GPCA predicted FAIL, gate PASSED (false negative)
- GPCA and gate disagree on failure reason (reason mismatch)

**Responsible Party**: Governance Administrator

**Remediation**: 
1. Record misprediction as governance incident
2. Perform root cause analysis
3. Update GPCA logic to align with gate behavior
4. Update governance documentation if ambiguous
5. Validate fix against historical cases
6. Document in governance change log

**Severity**: HIGH (governance defect, undermines predictability)

**Note**: GPCA mispredictions are **always governance defects**, never builder failures

**Reference**: `governance/canon/GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md` Section 8.2

---

## 6. Responsibility Assignment

### 6.1 Builder Responsibility
Builder is responsible for gate failures classified as:
- MISSING_ARTIFACT (for Builder QA artifacts)
- SCHEMA_VIOLATION (for Builder QA reports)
- EVIDENCE_INCOMPLETE
- CONTENT_INCONSISTENCY
- NOT_READY_DECLARED
- GOVERNANCE_VIOLATION (for execution violations like test debt, QA coverage)

**Builder Actions**:
1. Review gate failure output
2. Identify root cause
3. Remediate issue
4. Re-generate reports if needed
5. Re-submit PR
6. Verify gate passes

### 6.2 Governance Administrator Responsibility
Governance Administrator is responsible for gate failures classified as:
- MISSING_ARTIFACT (for governance policy artifacts)
- SCHEMA_VIOLATION (for schema files themselves)
- GOVERNANCE_VIOLATION (for policy ambiguity or conflicts)
- GATE_INFRASTRUCTURE_FAILURE (for governance repo issues)
- **GPCA_MISPREDICTION** (predictability invariant violation)

**Governance Administrator Actions**:
1. Review gate failure
2. Identify governance gap or error
3. Create governance fix PR
4. Update canonical governance
5. Communicate fix to affected parties

**Additional Actions for GPCA_MISPREDICTION**:
1. Record misprediction incident
2. Perform root cause analysis
3. Update GPCA prediction logic
4. Validate fix against historical cases
5. Update governance documentation
6. Document in governance change log

### 6.3 FM Responsibility
FM is responsible for gate failures classified as:
- UNAUTHORIZED_ACTION (orchestration failure)
- Repeated pattern of builder failures (indicates inadequate builder contract)

**FM Actions**:
1. Review failure pattern
2. Analyze orchestration gaps
3. Update builder contracts if needed
4. Escalate to Johan if systemic issue

### 6.4 Infrastructure Responsibility
Infrastructure team is responsible for gate failures classified as:
- GATE_INFRASTRUCTURE_FAILURE (for platform issues)

**Infrastructure Actions**:
1. Investigate platform issue
2. Fix infrastructure
3. Verify gate operational
4. Communicate resolution

---

## 7. Remediation Procedures

### 7.1 Standard Remediation (Builder)
**For**: MISSING_ARTIFACT, SCHEMA_VIOLATION, EVIDENCE_INCOMPLETE, CONTENT_INCONSISTENCY, GOVERNANCE_VIOLATION (execution)

**Procedure**:
1. **Review Failure**: Read gate failure output carefully
2. **Identify Issue**: Determine which artifact or rule is violated
3. **Fix Locally**: Remediate issue in local workspace
4. **Re-Generate Reports**: Generate corrected QA reports
5. **Validate Locally**: Verify reports conform to schema (use schema validators if available)
6. **Commit and Push**: Commit corrected artifacts
7. **Re-Trigger Gate**: Push to PR branch to re-trigger gate
8. **Verify Pass**: Confirm gate passes

**Timeline**: Standard remediation should be completed within 1 business day

### 7.2 Governance Remediation (Governance Administrator)
**For**: MISSING_ARTIFACT (governance), SCHEMA_VIOLATION (schema errors), GOVERNANCE_VIOLATION (policy issues), GATE_INFRASTRUCTURE_FAILURE (governance repo)

**Procedure**:
1. **Assess Impact**: Determine if issue affects single PR or multiple PRs
2. **Create Fix PR**: Create governance PR to fix issue
3. **Fast-Track Review**: Expedite governance PR review and merge
4. **Communicate**: Notify affected builders
5. **Verify Fix**: Confirm gate issue resolved
6. **Document**: Record issue in governance incident log

**Timeline**: Critical governance issues should be resolved within 4 hours

### 7.3 Emergency Remediation (Catastrophic)
**For**: UNAUTHORIZED_ACTION

**Procedure**:
1. **Immediate Block**: Gate blocks merge immediately
2. **Escalate to FM**: FM notified immediately
3. **Escalate to Johan**: Johan notified for catastrophic failures
4. **Root Cause Analysis**: Comprehensive RCA performed
5. **Agent Contract Review**: Review and update agent contracts
6. **Governance Update**: Update governance to prevent recurrence
7. **Audit Trail**: Complete documentation of incident and remediation

**Timeline**: Immediate escalation, resolution timeline determined by severity

---

## 8. Escalation Paths

### 8.1 Level 1: Builder Self-Remediation
**Scope**: Standard gate failures (MISSING_ARTIFACT, SCHEMA_VIOLATION, EVIDENCE_INCOMPLETE, CONTENT_INCONSISTENCY)

**Action**: Builder remediates without escalation

**Timeline**: 1 business day

**Escalation Trigger**: Builder unable to remediate or needs clarification

---

### 8.2 Level 2: Governance Administrator Support
**Scope**: Builder needs governance clarification, or governance artifact issues

**Action**: Builder contacts Governance Administrator via:
- PR comment tagging @GovernanceAdministrator
- Issue escalation
- Direct communication channel

**Timeline**: 4 hours for critical issues, 1 business day for non-critical

**Escalation Trigger**: Governance policy ambiguity or systemic issue detected

---

### 8.3 Level 3: FM Orchestration Review
**Scope**: Repeated failures, orchestration gaps, builder contract issues

**Action**: Governance Administrator or Builder escalates to FM

**Timeline**: 1 business day for review, timeline for fix varies by complexity

**Escalation Trigger**: Pattern of failures indicating systemic issue

---

### 8.4 Level 4: Johan Decision
**Scope**: Catastrophic failures, governance conflicts, emergency situations

**Action**: FM escalates to Johan

**Timeline**: Immediate notification, resolution timeline determined by Johan

**Escalation Trigger**: UNAUTHORIZED_ACTION, governance canon conflicts, emergency merge required

---

## 9. Emergency Bypass Procedure

### 9.1 When Emergency Bypass Is Permitted
Emergency bypass of PR gates is permitted ONLY in these circumstances:
1. **Production outage** requiring immediate fix
2. **Security vulnerability** requiring immediate patch
3. **Compliance deadline** with regulatory consequences
4. **Gate infrastructure failure** preventing legitimate merge

Emergency bypass is **NEVER permitted** for:
- ❌ Convenience
- ❌ Tight deadlines
- ❌ Builder QA failures
- ❌ Code defects

### 9.2 Emergency Bypass Authorization
Emergency bypass REQUIRES:
1. **Johan Authorization** (explicit approval required)
2. **Documented Justification** (why bypass is necessary)
3. **Risk Assessment** (consequences of bypassing gate)
4. **Remediation Plan** (how to fix issue post-merge)
5. **Complete Audit Trail** (full documentation of bypass)

### 9.3 Emergency Bypass Procedure
1. **Request Bypass**: Builder or FM requests emergency bypass from Johan
2. **Provide Justification**: Complete emergency bypass request form
3. **Johan Reviews**: Johan evaluates request and risk
4. **Authorization Given**: If approved, Johan provides explicit written authorization
5. **Bypass Executed**: Designated person executes manual merge with bypass flag
6. **Audit Trail Created**: Full documentation recorded in governance incident log
7. **Post-Merge Remediation**: Issue fixed per remediation plan
8. **Retrospective**: Incident reviewed to prevent future bypasses

### 9.4 Emergency Bypass Audit Requirements
Every emergency bypass MUST be documented with:
- Bypass request timestamp
- Requestor identity
- Justification
- Risk assessment
- Johan authorization (screenshot, email, or signed approval)
- Bypass execution timestamp
- Merged PR details
- Post-merge remediation status
- Retrospective findings

**Emergency bypasses are subject to quarterly audit.**

---

## 10. Evidence and Audit Requirements

### 10.1 Gate Failure Evidence
Every gate failure MUST produce:
- Gate execution log
- Failure classification
- Failure description
- Failure timestamp
- PR details (number, branch, author)
- Failure ID (unique identifier)

Evidence stored in: `.github/gate-logs/gate-failure-[TIMESTAMP]-[PR_NUMBER].log`

### 10.2 Remediation Evidence
Every remediation MUST produce:
- Original failure details
- Remediation actions taken
- Updated artifacts
- Re-run gate result
- Remediation timestamp
- Remediator identity

Evidence stored in: PR comments and commit history

### 10.3 Escalation Evidence
Every escalation MUST produce:
- Escalation reason
- Escalation path taken
- Escalation timestamp
- Escalation outcome
- Resolution details

Evidence stored in: Governance incident log or escalated issue

### 10.4 Emergency Bypass Evidence
Every emergency bypass MUST produce:
- Complete audit trail (per Section 9.4)
- Johan authorization artifact
- Risk assessment document
- Remediation plan and execution proof

Evidence stored in: `governance/incidents/emergency-bypass-[TIMESTAMP].md`

---

## 11. Failure Patterns and Systemic Issues

### 11.1 Pattern Detection
Governance Administrator MUST monitor for failure patterns:
- Same failure type recurring across multiple PRs
- Same builder repeatedly failing same checks
- Governance ambiguity causing frequent escalations
- Gate infrastructure failures

### 11.2 Pattern Response
When pattern detected:
1. **Document Pattern**: Record pattern details
2. **Root Cause Analysis**: Identify systemic cause
3. **Governance Update**: Update governance to address root cause
4. **Communication**: Notify affected parties
5. **Preventive Action**: Implement measures to prevent recurrence

**Pattern Promotion**: Systematic patterns should be promoted via **GOVERNANCE_RIPPLE_MODEL.md** upward ripple mechanism

### 11.3 Builder Performance Monitoring
Persistent gate failures by a builder may indicate:
- Inadequate builder contract
- Insufficient training
- Orchestration gaps
- Systemic QA issues

FM MUST review builder performance and update contracts if needed.

### 11.4 GPCA Misprediction Pattern Monitoring
Governance Administrator MUST specifically monitor for:
- Repeated GPCA mispredictions (same failure type)
- GPCA mispredictions across multiple repositories
- Systematic predictability gaps in governance

**Misprediction patterns indicate governance incompleteness and MUST trigger governance updates.**

---

## 12. Integration with Other Governance

This protocol integrates with:
- **GOVERNANCE_GATE_CANON.md**: Defines gate execution model
- **BUILDER_QA_HANDOVER_POLICY.md**: Defines what builders must provide
- **BUILDER_QA_REPORT.schema.md**: Defines report structure
- **ESCALATION_POLICY.md**: General escalation procedures
- **GOVERNANCE_COMPLETENESS_MODEL.md**: Completeness requirements
- **GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md**: Defines GPCA and misprediction handling
- **GOVERNANCE_RIPPLE_MODEL.md**: Defines learning promotion from failures

---

## 13. Protocol Change Control

This protocol may only be changed by:
1. Governance Administrator proposes change
2. Change reviewed against higher canon
3. Johan approves change
4. Change implemented via governance PR
5. Change communicated to all stakeholders

**No unilateral protocol modifications permitted.**

---

## 14. Conclusion

This protocol ensures:
- Clear failure classification
- Explicit responsibility assignment
- Controlled escalation
- Complete audit trail
- Emergency bypass controls
- Continuous improvement

**Gate failures are governance signals, not builder punishments. Handle them systematically.**

---

**End of PR_GATE_FAILURE_HANDLING_PROTOCOL**

---

**Document Metadata**:
- Protocol ID: PR_GATE_FAILURE_HANDLING_PROTOCOL_V1
- Authority: Canonical Governance Policy
- Effective Date: 2025-12-22
- Required By: GOVERNANCE_COMPLETENESS_MODEL.md
- Enforcement: Mandatory for all PR gate failures
- Integration: GOVERNANCE_GATE_CANON.md, BUILDER_QA_HANDOVER_POLICY.md
