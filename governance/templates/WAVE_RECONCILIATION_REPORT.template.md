# Wave [N] Reconciliation Report

**Wave Number**: [N]  
**Wave Name**: [Descriptive Name]  
**Project**: [Project Name]  
**Report Date**: [YYYY-MM-DD]  
**Foreman**: [FM Instance/Version]  
**Governance Administrator**: [Name/Role]

---

## Executive Summary

[Brief overview of wave reconciliation: key findings, governance changes made, ripple actions taken. 2-3 paragraphs.]

**Key Findings**:
- [Finding 1]
- [Finding 2]
- [Finding 3]

**Governance Changes**:
- [Change 1]
- [Change 2]

**Next-Wave Impact**:
- [Impact 1]
- [Impact 2]

---

## 1. What Went Wrong

### 1.1 Failures That Occurred

| Failure Description | Root Cause | Impact | Resolution | Category |
|---------------------|------------|--------|------------|----------|
| [Description] | [Root cause analysis] | [HIGH/MED/LOW] | [How resolved] | [Governance Gap / Execution Issue / Tooling Problem] |

### 1.2 Root Cause Analysis

#### Governance Gaps
[List governance gaps that caused or contributed to failures]
- [Gap 1]: [Description and impact]
- [Gap 2]: [Description and impact]

#### Execution Issues
[List execution issues not caused by governance gaps]
- [Issue 1]: [Description and resolution]
- [Issue 2]: [Description and resolution]

#### Tooling Problems
[List tooling or infrastructure issues]
- [Problem 1]: [Description and mitigation]
- [Problem 2]: [Description and mitigation]

### 1.3 Impact on Wave Timeline or Quality

**Timeline Impact**:
- Planned duration: [N days]
- Actual duration: [N days]
- Delay: [N days] ([Reason])

**Quality Impact**:
- Rework required: [N iterations]
- QA pass rate on first attempt: [X%]
- Builder effectiveness: [X%]

---

## 2. What Almost Went Wrong

### 2.1 Near-Misses

| Near-Miss Description | Why It Almost Happened | How It Was Avoided | Risk Level |
|----------------------|------------------------|-------------------|------------|
| [Description] | [Contributing factors] | [Prevention action] | [HIGH/MED/LOW] |

### 2.2 Execution Stress Points

**Governance Stretched**:
[Cases where governance was unclear or ambiguous but execution succeeded]
- [Stress Point 1]: [Description and resolution]
- [Stress Point 2]: [Description and resolution]

**Manual Interventions Required**:
[Cases where human intervention was needed beyond normal governance]
- [Intervention 1]: [Why needed, what was done]
- [Intervention 2]: [Why needed, what was done]

**Workarounds Implemented**:
[Cases where workarounds were needed to proceed]
- [Workaround 1]: [Why needed, what was done, should it be governance?]
- [Workaround 2]: [Why needed, what was done, should it be governance?]

---

## 3. What Worked by Luck vs. by Design

### 3.1 Successes Relying on Implicit Knowledge

[Successes that worked but were not documented in governance]
- [Success 1]: [What worked, why it was luck, how to make it design]
- [Success 2]: [What worked, why it was luck, how to make it design]

### 3.2 Successes Relying on Manual Intervention

[Successes that required human intervention not guaranteed by governance]
- [Success 1]: [What required intervention, should it be automated/governed?]
- [Success 2]: [What required intervention, should it be automated/governed?]

### 3.3 Successes Relying on Specific Agent Behavior

[Successes that worked because of specific agent behavior, not governance guarantee]
- [Success 1]: [What behavior, why not guaranteed, should it be governed?]
- [Success 2]: [What behavior, why not guaranteed, should it be governed?]

### 3.4 Successes Guaranteed by Governance (Repeatable)

[Successes that were guaranteed by governance and are repeatable]
- [Success 1]: [What worked, what governance ensured it]
- [Success 2]: [What worked, what governance ensured it]

**Design vs. Luck Ratio**: [X% by design, Y% by luck]  
**Target for Next Wave**: [Increase design successes to Z%]

---

## 3A. Combined Subwave Testing (CST) Checkpoint Results

**Authority**: COMBINED_TESTING_PATTERN.md § 4 (BL-025)

### 3A.1 CST Checkpoints Identified

**CST Convergence Points Planned:**
- [Checkpoint 1]: [Subwaves/modules converging, integration risk assessment]
- [Checkpoint 2]: [Subwaves/modules converging, integration risk assessment]

**CST Decision Rationale:**
- Why CST was applied at these checkpoints (integration risk justification)
- Why CST was NOT applied at other points (low risk or adequate regression coverage)

### 3A.2 CST Execution Results

| CST Checkpoint | Scenarios Tested | Execution Date | Result | Issues Discovered | Resolution |
|----------------|------------------|----------------|--------|-------------------|------------|
| [Checkpoint 1] | [Integration scenarios] | [YYYY-MM-DD] | [PASS/FAIL] | [Integration issues found] | [How resolved] |
| [Checkpoint 2] | [Integration scenarios] | [YYYY-MM-DD] | [PASS/FAIL] | [Integration issues found] | [How resolved] |

**Overall CST Assessment:**
- CST provided early integration feedback: [YES/NO]
- Integration issues caught before wave completion: [N issues]
- Rework avoided due to CST: [Estimated effort saved]

### 3A.3 CST Lessons Learned

**What Worked Well:**
- [CST success 1]
- [CST success 2]

**What Could Be Improved:**
- [CST improvement 1]
- [CST improvement 2]

**Recommendations for Next Wave CST:**
- [Recommendation 1]
- [Recommendation 2]

---

## 3B. Combined Wave Testing (CWT) Validation Results (MANDATORY)

**Authority**: COMBINED_TESTING_PATTERN.md § 5 (BL-025)

> **CWT is constitutionally required. IBWR CANNOT complete without CWT PASS.**

### 3B.1 CWT Scope

**Waves Covered:**
- Wave 1 through Wave [N] (complete cross-wave integration)

**Modules Covered:**
- [Module 1]: [Integration points tested]
- [Module 2]: [Integration points tested]
- [Module 3]: [Integration points tested]

**Scenarios Covered:**
- Happy path scenarios: [N scenarios]
- Error path scenarios: [N scenarios]
- Edge case scenarios: [N scenarios]

### 3B.2 CWT Execution Evidence

**CWT Execution Date:** [YYYY-MM-DD]

**Test Execution Method:**
- [ ] Automated integration test suite
- [ ] Manual validation with documented steps
- [ ] Combination of automated and manual

**CWT Test Results:**

| Test Category | Tests Executed | Tests Passed | Tests Failed | Coverage |
|---------------|----------------|--------------|--------------|----------|
| Cross-Wave Integration | [N tests] | [N passed] | [N failed] | [X%] |
| Cross-Module Integration | [N tests] | [N passed] | [N failed] | [X%] |
| Multi-Scenario (Happy) | [N tests] | [N passed] | [N failed] | [X%] |
| Multi-Scenario (Error) | [N tests] | [N passed] | [N failed] | [X%] |
| Multi-Scenario (Edge) | [N tests] | [N passed] | [N failed] | [X%] |

**Overall CWT Pass Rate:** [X%] (Must be 100% for IBWR completion)

### 3B.3 CWT Validation Results

**Cross-Wave Integration Validation:**
- [ ] All waves through Wave [N] integrate correctly
- [ ] Wave-to-wave dependencies validated
- [ ] No cross-wave regressions detected

**Cross-Module Integration Validation:**
- [ ] All modules in Wave [N] integrate correctly
- [ ] Module-to-module interfaces validated
- [ ] Architectural boundaries tested (frontend ↔ backend, service ↔ database, etc.)

**Multi-Scenario Coverage Validation:**
- [ ] Happy path scenarios validate correctly
- [ ] Error path scenarios handle failures gracefully
- [ ] Edge case scenarios behave correctly
- [ ] Complex multi-module interactions validated

### 3B.4 CWT PASS Verdict (MANDATORY)

**CWT Overall Verdict:** [PASS / FAIL]

**If PASS:**
- [ ] All CWT tests passed (100% GREEN)
- [ ] Cross-wave integration validated
- [ ] Cross-module integration validated
- [ ] Multi-scenario coverage complete
- [ ] IBWR may proceed

**If FAIL:**
- [ ] Integration issues documented (see below)
- [ ] Corrective actions defined
- [ ] IBWR BLOCKED until CWT PASS achieved
- [ ] Wave closure CANNOT proceed

**CWT Failure Details (if applicable):**
- [Failure 1]: [Description, root cause, corrective action]
- [Failure 2]: [Description, root cause, corrective action]

### 3B.5 CWT Evidence Archive

**CWT Test Logs:** [Link or path to test execution logs]  
**CWT Test Results:** [Link or path to detailed results]  
**CWT Coverage Report:** [Link or path to coverage analysis]

---

## 4. Governance Gaps Identified

### 4.1 Governance Gaps Summary

| Gap ID | Description | Discovery Context | Severity | Classification |
|--------|-------------|-------------------|----------|----------------|
| GAP-[N]-[ID] | [Description] | [When/how discovered] | [HIGH/MED/LOW] | [Tier-0 / Tier-1 / BL-XXX] |

### 4.2 Governance Deviations or Undocumented Assumptions

**Cases Where Governance Was Unclear**:
- [Case 1]: [What was unclear, how interpreted, should be clarified]
- [Case 2]: [What was unclear, how interpreted, should be clarified]

**Cases Where FM/Builders Had to Interpret Governance**:
- [Case 1]: [What required interpretation, how interpreted, should be explicit]
- [Case 2]: [What required interpretation, how interpreted, should be explicit]

**Cases Where Governance Conflicts Occurred**:
- [Case 1]: [What conflicted, how resolved, should be reconciled]
- [Case 2]: [What conflicted, how resolved, should be reconciled]

**Cases Where Governance Gaps Required Escalation**:
- [Case 1]: [What gap, what escalation, how resolved]
- [Case 2]: [What gap, what escalation, how resolved]

---

## 5. Corrective Actions Proposed

### 5.1 Classification Decisions

#### Tier-0 (Constitutional) Changes

| Gap ID | Proposed Canon Update | Rationale |
|--------|----------------------|-----------|
| GAP-[N]-[ID] | [Document name and change description] | [Why Tier-0 classification] |

**Total Tier-0 Changes**: [N]

#### Tier-1 (Policy/Procedure) Changes

| Gap ID | Proposed Policy Update | Rationale |
|--------|------------------------|-----------|
| GAP-[N]-[ID] | [Document name and change description] | [Why Tier-1 classification] |

**Total Tier-1 Changes**: [N]

#### Bootstrap Learnings (BL-XXX)

| Gap ID | Proposed BL Entry | Rationale |
|--------|-------------------|-----------|
| GAP-[N]-[ID] | BL-[XXX] — [Title] | [Why Bootstrap Learning classification] |

**Total Bootstrap Learnings**: [N]

#### No Action Required

| Gap ID | Observation | Rationale for No Action |
|--------|-------------|------------------------|
| GAP-[N]-[ID] | [Description] | [Why no governance change needed] |

**Total No Action**: [N]

### 5.2 Governance Updates Implemented

**Canon Documents Created/Updated**:
- [ ] [Document name]: [Change description]
- [ ] [Document name]: [Change description]

**Policy Documents Updated**:
- [ ] [Document name]: [Change description]
- [ ] [Document name]: [Change description]

**Bootstrap Learnings Added**:
- [ ] BL-[XXX] in BOOTSTRAP_EXECUTION_LEARNINGS.md: [Title]
- [ ] BL-[XXX] in BOOTSTRAP_EXECUTION_LEARNINGS.md: [Title]

**Status**: [ALL COMPLETE / PARTIAL / PENDING]

---

## 6. Ripple Layer-Down Plan

### 6.1 Governance → FM Contract

**FM Agent Contract Updates**:
- [ ] [Section]: [Change description]
- [ ] [Section]: [Change description]

**New FM Responsibilities**:
- [Responsibility 1]
- [Responsibility 2]

**New FM Prohibitions**:
- [Prohibition 1]
- [Prohibition 2]

### 6.2 FM Contract → Builder Contracts

**Builder Contract Updates**:
- [ ] [Contract name] [Section]: [Change description]
- [ ] [Contract name] [Section]: [Change description]

**New Builder Obligations**:
- [Obligation 1]
- [Obligation 2]

**New Builder Prohibitions**:
- [Prohibition 1]
- [Prohibition 2]

### 6.3 Builder Instruction Updates

**"Build to Green" Template Updates**:
- [ ] [Template name]: [Change description]
- [ ] [Template name]: [Change description]

**New Acceptance Criteria**:
- [Criteria 1]
- [Criteria 2]

**New Evidence Requirements**:
- [Requirement 1]
- [Requirement 2]

### 6.4 Ripple Verification Checklist

- [ ] All governance documents updated and committed
- [ ] FM agent contract updated (if impacted)
- [ ] Builder contracts updated (if impacted)
- [ ] Builder instruction templates updated (if impacted)
- [ ] Cross-references validated
- [ ] No governance conflicts introduced
- [ ] Changes merged to respective repositories

**Ripple Propagation Status**: [COMPLETE / IN PROGRESS / BLOCKED]

---

## 7. Next-Wave Safeguards

### 7.1 What Must Be Different in Wave [N+1]

**New Governance Requirements Starting Wave [N+1]**:
- [Requirement 1]: [Description and rationale]
- [Requirement 2]: [Description and rationale]

**New FM Behaviors Required**:
- [Behavior 1]: [Description and rationale]
- [Behavior 2]: [Description and rationale]

**New Builder Obligations**:
- [Obligation 1]: [Description and rationale]
- [Obligation 2]: [Description and rationale]

### 7.2 What Is Now Prohibited in Wave [N+1]

**Behaviors That Caused Failures in Wave [N]**:
- [Prohibition 1]: [What is prohibited and why]
- [Prohibition 2]: [What is prohibited and why]

**Workarounds That Are Now Governed Against**:
- [Prohibition 1]: [What workaround is no longer allowed]
- [Prohibition 2]: [What workaround is no longer allowed]

**Ambiguities That Are Now Explicitly Resolved**:
- [Resolution 1]: [What was ambiguous, how now resolved]
- [Resolution 2]: [What was ambiguous, how now resolved]

### 7.3 What Is Now Mandatory in Wave [N+1]

**New Evidence Requirements**:
- [Requirement 1]: [What evidence, why mandatory]
- [Requirement 2]: [What evidence, why mandatory]

**New Validation Steps**:
- [Step 1]: [What validation, why mandatory]
- [Step 2]: [What validation, why mandatory]

**New Escalation Triggers**:
- [Trigger 1]: [What triggers escalation, why mandatory]
- [Trigger 2]: [What triggers escalation, why mandatory]

### 7.4 Safeguards Integration Status

- [ ] Safeguards documented in Wave [N+1] planning
- [ ] Wave [N+1] cannot violate new prohibitions
- [ ] Wave [N+1] will satisfy new mandatory requirements
- [ ] Safeguards communicated to FM and builders

**Integration Status**: [COMPLETE / IN PROGRESS / PENDING]

---

## 8. IBWR Completion Checklist

### 8.1 All Outputs Produced

- [ ] Wave Reconciliation Report generated (this document)
- [ ] Corrective governance actions classified and documented
- [ ] Governance changes written (canon updates, policy updates, BL entries)
- [ ] Ripple layer-down plan created
- [ ] Next-wave safeguards documented

### 8.2 CWT Validation Complete (MANDATORY)

**Authority**: COMBINED_TESTING_PATTERN.md § 5 (BL-025)

- [ ] CWT executed after wave QA PASS
- [ ] CWT scope documented (waves, modules, scenarios)
- [ ] Cross-wave integration validated (PASS)
- [ ] Cross-module integration validated (PASS)
- [ ] Multi-scenario coverage verified (PASS)
- [ ] CWT PASS verdict recorded (Section 3B.4)
- [ ] CWT evidence documented and auditable

**Blocking Rule:**
> **IBWR CANNOT complete without CWT PASS.**

### 8.3 Governance Changes Implemented

- [ ] Governance canon updated (if Tier-0 changes)
- [ ] Policy/procedure documents updated (if Tier-1 changes)
- [ ] Bootstrap learnings added (if BL-XXX classifications)
- [ ] Changes committed and merged to governance repository

### 8.4 Ripple Propagation Verified

- [ ] FM agent contract updated (if impacted)
- [ ] Builder contracts/instructions updated (if impacted)
- [ ] Template updates completed (if impacted)
- [ ] Cross-references validated
- [ ] Ripple propagation checklist complete

### 8.5 Next-Wave Safeguards Integrated

- [ ] Wave [N+1] planning incorporates safeguards
- [ ] Wave [N+1] cannot violate new prohibitions
- [ ] Wave [N+1] will satisfy new mandatory requirements

### 8.6 Human Authority Approval (Bootstrap Mode)

- [ ] Human authority (Johan) reviewed IBWR outputs
- [ ] Human authority approved governance changes
- [ ] Human authority verified ripple propagation
- [ ] Human authority authorized Wave [N+1] start

**IBWR Status**: [COMPLETE / IN PROGRESS / BLOCKED]

---

## 9. Lessons Learned for IBWR Process

### 9.1 What Worked Well in This IBWR

- [Success 1]
- [Success 2]
- [Success 3]

### 9.2 What Could Be Improved in IBWR Process

- [Improvement 1]
- [Improvement 2]
- [Improvement 3]

### 9.3 Recommendations for Future IBWRs

- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

---

## 10. Sign-Off

### 10.1 Foreman (FM)

**FM Name/Instance**: [FM Instance/Version]  
**Date**: [YYYY-MM-DD]  
**IBWR Outputs Complete**: [YES / NO]  
**Signature/Approval**: [FM certification statement]

### 10.2 Governance Administrator

**Administrator**: [Name/Role]  
**Date**: [YYYY-MM-DD]  
**Governance Changes Validated**: [YES / NO]  
**Ripple Propagation Verified**: [YES / NO]  
**Signature/Approval**: [Administrator certification statement]

### 10.3 Human Authority (Bootstrap Mode)

**Authority**: Johan Ras  
**Date**: [YYYY-MM-DD]  
**IBWR Completion Verified**: [YES / NO]  
**Wave [N+1] Authorized**: [YES / NO]  
**Signature/Approval**: [Human authority authorization statement]

---

## 11. References

**Governance Canon**:
- IN_BETWEEN_WAVE_RECONCILIATION.md (Authority)
- MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md
- WAVE_MODEL.md
- FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
- LEARNING_INTAKE_AND_PROMOTION_MODEL.md
- BOOTSTRAP_EXECUTION_LEARNINGS.md

**Wave Artifacts**:
- [Link to WAVE_[N]_IMPLEMENTATION_PROGRESS.md]
- [Link to Wave [N] closure certification]
- [Link to Wave [N] QA results]
- [Link to governance changes made]

**Template Version**: 1.0.0  
**Template Authority**: governance/canon/IN_BETWEEN_WAVE_RECONCILIATION.md  
**Template Location**: governance/templates/WAVE_RECONCILIATION_REPORT.template.md
