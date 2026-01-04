# Wave [N] Implementation Progress

**Wave Number**: [N]  
**Wave Name**: [Descriptive Name]  
**Project**: [Project Name]  
**Status**: `NOT_STARTED` | `IN_PROGRESS` | `COMPLETE` | `BLOCKED`  
**Start Date**: [YYYY-MM-DD]  
**Last Updated**: [YYYY-MM-DD]  
**Foreman**: [FM Instance/Version]

---

## Executive Summary

[Brief overview of wave purpose, scope, and current status. 2-3 sentences.]

---

## 1. Wave Scope Definition

### 1.1 Wave Purpose

[Describe what this wave achieves in the overall system. What capabilities or features does this wave deliver?]

### 1.2 Issues in Scope

| Issue # | Title | Priority | Status |
|---------|-------|----------|--------|
| #[NUM] | [Issue Title] | [HIGH/MED/LOW] | [NOT_STARTED/IN_PROGRESS/COMPLETE/BLOCKED] |
| #[NUM] | [Issue Title] | [HIGH/MED/LOW] | [NOT_STARTED/IN_PROGRESS/COMPLETE/BLOCKED] |

**Total Issues**: [N]  
**Complete**: [N]  
**In Progress**: [N]  
**Blocked**: [N]

### 1.3 Dependencies

**Prerequisites** (must exist before this wave starts):
- [Dependency 1]: [Status - MET/NOT_MET]
- [Dependency 2]: [Status - MET/NOT_MET]

**Dependent Waves** (what depends on this wave):
- Wave [N+1]: [Description]
- Wave [N+2]: [Description]

### 1.4 Success Criteria

**Wave is complete when**:
- [ ] All issues in scope merged to target branch
- [ ] All instructed artifacts created and indexed
- [ ] Cumulative QA passes (this wave + all previous waves = 100% GREEN)
- [ ] Zero test debt (no skipped/stubbed/incomplete tests)
- [ ] All governance gates passed
- [ ] Evidence trail complete
- [ ] Wave closure certified based on evidence

---

## 2. Phase-by-Phase Status

### 2.1 Issue #[NUM] — [Issue Title]

**Status**: `NOT_STARTED` | `IN_PROGRESS` | `COMPLETE` | `BLOCKED`  
**Priority**: [HIGH/MED/LOW]  
**Assigned PR**: #[NUM] (if applicable)

#### Phases

| Phase | Status | Date | Notes |
|-------|--------|------|-------|
| Architecture | `NOT_STARTED` / `IN_PROGRESS` / `COMPLETE` / `BLOCKED` | [YYYY-MM-DD] | [Notes] |
| QA Creation (Red QA) | `NOT_STARTED` / `IN_PROGRESS` / `COMPLETE` / `BLOCKED` | [YYYY-MM-DD] | [Notes] |
| Build to Green | `NOT_STARTED` / `IN_PROGRESS` / `COMPLETE` / `BLOCKED` | [YYYY-MM-DD] | [Notes] |
| Validation | `NOT_STARTED` / `IN_PROGRESS` / `COMPLETE` / `BLOCKED` | [YYYY-MM-DD] | [Notes] |
| Merge | `NOT_STARTED` / `IN_PROGRESS` / `COMPLETE` / `BLOCKED` | [YYYY-MM-DD] | [Notes] |

#### Key Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| [Artifact Name] | [Path] | [Status] |

#### Blockers (if any)

- [Blocker description and resolution plan]

---

### 2.2 Issue #[NUM] — [Issue Title]

[Repeat structure for each issue in wave]

---

## 3. Artifact Index

### 3.1 Code Artifacts

| Artifact Name | Artifact Path | Status | Related Issue | Related PR | Notes |
|---------------|---------------|--------|---------------|------------|-------|
| [Component Name] | `src/[path]/[file]` | `COMPLETE` / `IN_PROGRESS` / `MISSING` / `BLOCKED` | #[NUM] | #[NUM] | [Notes] |
| [Test Suite Name] | `tests/[path]/[file]` | `COMPLETE` / `IN_PROGRESS` / `MISSING` / `BLOCKED` | #[NUM] | #[NUM] | [Notes] |

**Total Code Artifacts**: [N]  
**Complete**: [N]  
**In Progress**: [N]  
**Missing**: [N]

---

### 3.2 Documentation Artifacts

| Artifact Name | Artifact Path | Status | Related Issue | Related PR | Notes |
|---------------|---------------|--------|---------------|------------|-------|
| [Doc Name] | `docs/[path]/[file]` | `COMPLETE` / `IN_PROGRESS` / `MISSING` / `BLOCKED` | #[NUM] | #[NUM] | [Notes] |

**Total Documentation Artifacts**: [N]  
**Complete**: [N]  
**In Progress**: [N]  
**Missing**: [N]

---

### 3.3 Governance/QA Artifacts

| Artifact Name | Artifact Path | Status | Related Issue | Related PR | Notes |
|---------------|---------------|--------|---------------|------------|-------|
| [QA Suite Name] | `tests/[path]/[file]` | `COMPLETE` / `IN_PROGRESS` / `MISSING` / `BLOCKED` | #[NUM] | #[NUM] | [Notes] |

**Total Governance/QA Artifacts**: [N]  
**Complete**: [N]  
**In Progress**: [N]  
**Missing**: [N]

---

## 4. Execution Timeline

| Date | Event | Details |
|------|-------|---------|
| [YYYY-MM-DD] | Wave Started | [Initial context] |
| [YYYY-MM-DD] | Issue #[NUM] Architecture Complete | [Notes] |
| [YYYY-MM-DD] | Issue #[NUM] Red QA Complete | [N tests failing as expected] |
| [YYYY-MM-DD] | Issue #[NUM] Build to Green Complete | [All tests GREEN] |
| [YYYY-MM-DD] | Issue #[NUM] Merged | PR #[NUM] |
| [YYYY-MM-DD] | [Event] | [Details] |

---

## 5. QA and Compliance Status

### 5.1 Wave QA Summary

**Wave-Specific QA**:
- Total Tests Created: [N]
- Tests Passing: [N]
- Tests Failing: [N]
- Test Coverage: [X%]
- Status: `ALL_GREEN` | `SOME_RED` | `ALL_RED` | `NOT_RUN`

**Cumulative QA** (this wave + all previous waves):
- Total Tests: [N]
- Tests Passing: [N]
- Tests Failing: [N]
- Status: `ALL_GREEN` | `SOME_RED` | `ALL_RED` | `NOT_RUN`

### 5.2 Test Debt Status

- [ ] Zero test debt confirmed
- [ ] No skipped tests
- [ ] No stubbed tests
- [ ] No incomplete test infrastructure

**Test Debt Count**: [0 required]  
**Status**: `COMPLIANT` | `NON_COMPLIANT`

### 5.3 Governance Gate Status

| Gate | Status | Notes |
|------|--------|-------|
| Architecture Approved | `PASS` / `FAIL` / `NOT_RUN` | [Notes] |
| QA-to-Red Validated | `PASS` / `FAIL` / `NOT_RUN` | [Notes] |
| Build-to-Green Achieved | `PASS` / `FAIL` / `NOT_RUN` | [Notes] |
| Cumulative QA GREEN | `PASS` / `FAIL` / `NOT_RUN` | [Notes] |
| Zero Test Debt | `PASS` / `FAIL` / `NOT_RUN` | [Notes] |
| Governance Compliance | `PASS` / `FAIL` / `NOT_RUN` | [Notes] |

**All Gates Pass**: `YES` | `NO`

---

## 6. Corrections and Root Cause Analysis

### 6.1 Progress Recording Gaps

[Document any instances where progress was not properly recorded initially]

| Date | Gap Description | Root Cause | Corrective Action | Status |
|------|-----------------|------------|-------------------|--------|
| [YYYY-MM-DD] | [Description] | [Why it occurred] | [What was done] | [RESOLVED/ONGOING] |

### 6.2 Execution Context Degradation

[Document any instances where execution context degraded (multiple PRs, time gaps, etc.)]

**Context Degradation Events**:
- [Event 1]: [Description, impact, resolution]
- [Event 2]: [Description, impact, resolution]

### 6.3 Artifact Location Changes

[Document any artifacts that were moved, renamed, or relocated]

| Original Path | New Path | Reason | Date |
|---------------|----------|--------|------|
| [Path] | [New Path] | [Reason] | [YYYY-MM-DD] |

---

## 7. Blockers and Escalations

### 7.1 Current Blockers

| Blocker ID | Description | Impact | Owner | Resolution Plan | Status |
|------------|-------------|--------|-------|-----------------|--------|
| [ID] | [Description] | [HIGH/MED/LOW] | [Owner] | [Plan] | [OPEN/RESOLVED] |

### 7.2 Escalations

| Date | Issue | Escalated To | Resolution | Status |
|------|-------|--------------|------------|--------|
| [YYYY-MM-DD] | [Issue] | [Authority] | [Resolution] | [RESOLVED/PENDING] |

---

## 8. Wave Completion Certification

### 8.1 Certification Checklist

**Artifact Index Verification**:
- [ ] All code artifacts indexed
- [ ] All documentation artifacts indexed
- [ ] All governance/QA artifacts indexed
- [ ] No `MISSING` artifacts
- [ ] All artifact paths verified correct

**Phase Status Verification**:
- [ ] All issues show `COMPLETE` for all phases
- [ ] All PRs merged to target branch
- [ ] No issues remain `IN_PROGRESS` or `BLOCKED`

**QA and Compliance Verification**:
- [ ] Wave-specific QA 100% GREEN
- [ ] Cumulative QA 100% GREEN (this wave + all previous)
- [ ] Zero test debt confirmed
- [ ] All governance gates passed

**Evidence Verification**:
- [ ] Execution timeline complete
- [ ] All corrections documented
- [ ] All blockers resolved or escalated
- [ ] Evidence trail complete

### 8.2 Certification Verdict

**Status**: `COMPLETE` | `IN_PROGRESS` | `BLOCKED`

**Evidence-Based Verdict**:
[Provide explicit determination based on verification above]

**Example** (replace bracketed placeholders with actual values):
"Wave [N] is COMPLETE. All [X] issues merged, all [Y] artifacts indexed and verified, cumulative QA is 100% GREEN ([Z] tests passing, 0 failures), zero test debt confirmed, all governance gates passed. Wave closure certification completed on [YYYY-MM-DD]."

**Note**: Replace [X], [Y], [Z], [N], and [YYYY-MM-DD] with actual counts, wave number, and date.

**Certification Statement**:
> Wave [N] closure certified on [YYYY-MM-DD] based on evidence review. All artifacts indexed, all QA GREEN, zero test debt, all governance requirements met.

**Certified By**: [FM Instance/Version]  
**Certification Date**: [YYYY-MM-DD]  
**Supporting Evidence**: [Links to QA results, artifact index, governance gate reports]

---

## 9. Post-Wave Learnings

### 9.1 What Worked Well

- [Success 1]
- [Success 2]
- [Success 3]

### 9.2 What Could Be Improved

- [Improvement 1]
- [Improvement 2]
- [Improvement 3]

### 9.3 Recommendations for Future Waves

- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

---

## 10. References

**Governance Canon**:
- MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md
- WAVE_MODEL.md
- FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
- FM_ROLE_CANON.md

**Related Artifacts**:
- [Link to architecture documents]
- [Link to QA test suites]
- [Link to related PRs]
- [Link to issue tracker]

**Template Version**: 1.0.0  
**Template Authority**: governance/canon/MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md  
**Template Location**: governance/templates/WAVE_IMPLEMENTATION_PROGRESS.template.md
