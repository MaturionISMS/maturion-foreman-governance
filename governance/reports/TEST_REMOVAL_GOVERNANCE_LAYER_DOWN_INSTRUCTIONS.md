# Test Removal Governance Layer-Down Instructions

**Document Type**: Layer-Down Coordination  
**Status**: READY FOR CREATION  
**Target Repository**: MaturionISMS/maturion-foreman-office-app  
**Created**: 2026-01-08  
**Triggered By**: INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL  
**Related PR**: APGI-cmy/maturion-foreman-governance#477  
**Priority**: HIGH

---

## Purpose

This document provides instructions for creating a layer-down issue in the FM App repository to ensure all agent contracts are updated with test removal governance requirements.

---

## Context

### Incident Summary

60 Wave 0 tests were incorrectly identified for removal as "speculative" when they validated architectural requirements. Root cause: wrong traceability methodology (looking for class names in architecture instead of mapping behaviors to requirements).

### Governance Response

Two new canonical policies created:
1. **TEST_REMOVAL_GOVERNANCE_GATE.md** - Mandatory governance gate for all test removal
2. **ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md** - Correct vs incorrect traceability methodology

**Bootstrap Learning**: BL-021 recorded in canonical location

### Layer-Down Requirement

**All agent contracts** in office-app repo must be updated with test removal authorization requirements to prevent recurrence.

---

## Issue Creation Instructions

### When to Create Issue

**Timing**: After this PR is merged to main branch in governance repo

**Why**: Layer-down references governance commit hash for version alignment. Must wait for merge to have stable reference.

---

### How to Create Issue

**Step 1**: Navigate to FM App repository issue tracker:
- URL: https://github.com/MaturionISMS/maturion-foreman-office-app/issues
- **Note**: Verify current repository location before use if repository has been moved

**Step 2**: Create new issue with:
- **Title**: "URGENT: Layer Down Test Removal Governance Policies to Agent Contracts"
- **Body**: Copy content from template below
- **Labels**: `governance`, `layer-down`, `high-priority`, `emergency-governance`
- **Assignee**: Governance Liaison Agent or @ForemanApp
- **Milestone**: Current wave milestone

**Step 3**: Update issue with governance commit hash:
- Find merge commit hash from this PR
- Replace `[commit hash]` placeholders with actual commit
- Replace `[PR link]` with this PR URL

**Step 4**: Notify stakeholders:
- Comment in this PR: "Layer-down issue created: [link]"
- Tag CS2 and FM for awareness

---

## Issue Content Template

```markdown
## URGENT: Layer Down Test Removal Governance Policies to Agent Contracts

**Priority**: HIGH  
**Type**: Emergency Governance Layer-Down  
**Authority**: CS2  
**Triggered By**: INCIDENT-2026-01-08-INCORRECT-TEST-REMOVAL  
**Governance PR**: [PR link]  
**Governance Commit**: [commit hash]

---

### Background

60 Wave 0 tests were incorrectly identified for removal as "speculative" when they validated architectural requirements. Root cause: wrong traceability methodology.

**Governance Response**: Two new canonical policies created in governance repo:
1. `governance/policy/TEST_REMOVAL_GOVERNANCE_GATE.md`
2. `governance/policy/ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md`

**Bootstrap Learning**: BL-021 recorded

**This layer-down is MANDATORY to prevent recurrence.**

---

### Required Actions

#### 1. Update All Agent Contracts

**Files to Update** (all in `.github/agents/`):
- [ ] `ForemanApp-agent.md`
- [ ] `ui-builder.md`
- [ ] `api-builder.md`
- [ ] `schema-builder.md`
- [ ] `integration-builder.md`
- [ ] `qa-builder.md`

**Add Section to Each**:

```markdown
## Test Removal Authorization (MANDATORY)

Agents SHALL NOT remove tests without:
1. Traceability analysis proving test doesn't map to architecture
2. CS2 approval if removing >10 tests
3. Documentation in TEST_REMOVAL_LOG.md

Violation = Test Dodging = Work Stoppage

**Required Reading**:
- Governance policy: `TEST_REMOVAL_GOVERNANCE_GATE.md`
- Traceability methodology: `ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md`
- Bootstrap learning: BL-021 in `BOOTSTRAP_EXECUTION_LEARNINGS.md`

**Key Principles**:
- Tests drive implementation (not just validate existing code)
- Unimplemented features are valid test targets
- Architecture specifies requirements, not implementation details
- Map test behavior → requirement → architecture section
- Never search for class names in architecture

**Prohibited Justifications for Test Removal**:
- ❌ "Tests are speculative" (without traceability proof)
- ❌ "Features not implemented" (tests exist to drive implementation)
- ❌ "Class names not in architecture" (wrong abstraction level)
- ❌ "Tests are noisy" or "slowing development"
- ❌ "Too many RED tests" (implement features, don't remove tests)
```

#### 2. Create TEST_REMOVAL_LOG.md (if doesn't exist)

**File**: Root of office-app repo or `docs/` directory

**Purpose**: Audit trail for all test removals

**Content Template**:
```markdown
# Test Removal Log

This log records all test removal decisions as required by TEST_REMOVAL_GOVERNANCE_GATE.md policy.

## Format

For each removal:
- Date
- Tests removed (count and names)
- Traceability analysis summary
- Approval authority (FM / Governance Admin / CS2)
- Justification category (requirement removed / duplicate coverage / malformed test)
- Impact assessment
- Documentation link

## Entries

[Add entries here as tests are removed]
```

#### 3. Verification Steps

- [ ] All 6 agent contracts updated with test removal section
- [ ] TEST_REMOVAL_LOG.md created (or confirmed exists)
- [ ] Changes committed to office-app repository
- [ ] PR created with layer-down changes
- [ ] PR references this issue and governance PR
- [ ] Layer-down completion evidence documented

---

### Timeline

**Acknowledgement**: Within 24 hours  
**Completion**: Within 48 hours (URGENT)  
**Blocking**: All test removal actions blocked until layer-down complete

---

### Success Criteria

✅ All 6 agent contracts contain test removal authorization section  
✅ TEST_REMOVAL_LOG.md exists in office-app repo  
✅ Changes merged to main branch  
✅ Evidence documented in this issue  
✅ Issue closed with layer-down confirmation

---

### Reference Materials

**Governance Repo** (maturion-foreman-governance):
- `governance/policy/TEST_REMOVAL_GOVERNANCE_GATE.md` - Complete policy
- `governance/policy/ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md` - Traceability methodology with examples
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` - BL-021 canonical entry
- `docs/bootstrap-learning/LESSON_60_TESTS_INCORRECT_REMOVAL.md` - Standalone lesson document
- Governance commit: [commit hash]

**Key Governance Principles**:
1. Tests drive implementation (proactive, not reactive)
2. Architecture specifies WHAT (requirements), not HOW (implementation)
3. Traceability maps: Test → Behavior → Requirement → Architecture Section
4. Burden of proof on remover, not reviewer
5. High-volume removals (>10 tests) require CS2 approval

---

### Questions or Blockers?

Comment on this issue with any questions or technical blockers. Governance Administrator will provide clarification or escalate to CS2 if needed.

---

**Assignee**: @GovernanceLiaison or @ForemanApp  
**Authority**: CS2 mandated layer-down  
**Non-Negotiable**: All agents must comply with test removal governance
```

---

## Expected Timeline (For Issue Creator)

**Note**: This timeline is for the Governance Administrator creating and monitoring the layer-down issue. The timeline inside the issue template above is for the assignee completing the layer-down work.

**Issue Creation**: Immediately after PR merge  
**Governance Liaison Acknowledgement**: 24 hours  
**Layer-Down Completion**: 48 hours (URGENT)  
**Issue Closure**: After layer-down evidence merged

**Note**: This is an emergency governance layer-down. Normal 7-day timeline does not apply.

---

## Success Criteria

Layer-down is successful when:

✅ Issue created in FM repo with complete content  
✅ Governance liaison acknowledges receipt (24 hours)  
✅ All 6 agent contracts updated with test removal section  
✅ TEST_REMOVAL_LOG.md created in office-app (if doesn't exist)  
✅ Changes committed and PR created  
✅ PR merged to office-app main branch  
✅ Layer-down completion evidence documented  
✅ Issue closed with confirmation

---

## Monitoring

**Governance Administrator Agent responsibilities**:
1. Create issue after PR merge
2. Monitor issue for acknowledgement (24 hours)
3. Check for questions or blockers
4. Validate layer-down completion evidence
5. Close layer-down tracking in governance repo
6. Verify agent contracts in next governance scan

**Escalation Triggers**:
- No acknowledgement after 24 hours → Escalate to CS2
- Technical blockers reported → Provide governance clarification
- Layer-down incomplete after 48 hours → Escalate to FM and CS2
- Any pushback on requirements → Escalate to CS2 immediately

---

## Post-Layer-Down Actions

After layer-down complete and issue closed:

1. **Verify agent contracts** in next governance scan
2. **Document layer-down completion** in governance repo audit trail
3. **Monitor test removal proposals** for compliance with new policies
4. **Update governance canon manifest** (if needed)
5. **Close this tracking document** with completion status

---

## Verification Checklist

Before creating issue, verify:

- [ ] This PR merged to main in governance repo
- [ ] Governance repo commit hash identified
- [ ] Issue template content prepared
- [ ] FM repo issue tracker accessible

After creating issue, verify:

- [ ] Issue title correct and marked URGENT
- [ ] Issue body complete (no missing sections)
- [ ] Commit hash placeholders replaced
- [ ] PR link placeholders replaced
- [ ] Labels applied (including emergency-governance)
- [ ] Assignee set
- [ ] Notification comment added to this PR
- [ ] CS2 tagged for awareness

---

## Appendix: Agent Contract Files

**Location**: All in `.github/agents/` in office-app repo

**Files**:
1. `ForemanApp-agent.md` - FM contract (primary execution authority)
2. `ui-builder.md` - UI builder contract
3. `api-builder.md` - API builder contract
4. `schema-builder.md` - Schema builder contract
5. `integration-builder.md` - Integration builder contract
6. `qa-builder.md` - QA builder contract

**Update Requirement**: ALL must have identical "Test Removal Authorization" section

**Placement**: Add as new section after existing contract content, before final notes/footer

---

## Appendix: Key Policy Points to Emphasize

When updating agent contracts, emphasize:

1. **Zero-Tolerance Policy**: No test removal without governance process
2. **Correct Methodology**: Map behavior → requirement → architecture (NOT class name matching)
3. **Approval Thresholds**: CS2 approval for >10 tests
4. **Burden of Proof**: On remover to prove test lacks architectural basis
5. **Prohibited Justifications**: "Speculative", "not implemented", "class not found", "noisy"
6. **Violation Response**: Immediate work stoppage + test restoration + incident report

---

**Document Status**: READY FOR ACTION (after PR merge)  
**Priority**: HIGH - Emergency Governance  
**Authority**: CS2 (Johan Ras)
