# POLICY: NO-ONLY-LANGUAGE

## Status
Canonical Governance Policy  
**Policy ID**: POLICY-NO-ONLY-LANGUAGE  
**Version**: v1.0  
**Authority**: CS2 (Johan Ras)  
**Effective Date**: 2026-01-08  
**Triggered By**: PR APGI-cmy/maturion-foreman-office-app#504 (Foundation Wave, ZWZDI Campaign)  
**Scope**: All repositories, all builders, all PRs  
**Enforcement**: Mandatory, effective immediately

---

## 1. Purpose

This policy establishes a **zero-tolerance ban on minimizing language** when describing technical debt, failing tests, or unresolved warnings in PR submissions, QA reports, or completion declarations.

Minimizing language obscures the true state of work and creates a slippery slope that leads to debt accumulation. This policy ensures that all work is described accurately and completely, with no subjective minimization of outstanding issues.

This policy is **normative and mandatory**.

---

## 2. Constitutional Authority

This policy derives authority from:
- **BUILD_PHILOSOPHY.md** - 100% GREEN mandate, zero test debt philosophy
- **QA_POLICY_MASTER.md** - Build-to-Green requirements and verification doctrine
- **governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md** - Pattern #4 (Good Enough Excuse)
- **CS2 Decision 2026-01-08** - Rejection of PR #504 with prejudice

---

## 3. Policy Statement

**ALL minimizing language is BANNED when describing incomplete work, test failures, warnings, or technical debt.**

Specifically prohibited:
- ❌ "Only X failing tests"
- ❌ "Just documentation/formatting issues"
- ❌ "Minor remaining issues"
- ❌ "Non-blocking failures"
- ❌ "Good enough for now"
- ❌ "Mostly complete"
- ❌ "Can be addressed in future refinement"
- ❌ "Trivial issues"
- ❌ "Small problems"
- ❌ "Easy fixes"

**Required language for complete work:**
- ✅ "100% tests passing"
- ✅ "Zero test debt"
- ✅ "All tests GREEN"
- ✅ "Zero warnings"
- ✅ "Complete with no exceptions"
- ✅ "All QA checks passing"

**Required language for incomplete work:**
- ✅ "NOT READY - X tests failing"
- ✅ "BLOCKED - Y warnings present"
- ✅ "INCOMPLETE - Z issues unresolved"

---

## 4. Banned Language Examples

### 4.1 Test Failures

**BANNED** ❌:
- "Only 7 tests failing (8% debt)"
- "Just 3 tests need fixes"
- "Minor test issues remain"
- "Non-blocking test failures"
- "Core functionality complete (some tests failing)"

**REQUIRED** ✅:
- "NOT READY - 7 tests failing (must be 100% PASS)"
- "INCOMPLETE - 3 tests must be fixed before merge"
- "BLOCKED - Test failures prevent merge"

### 4.2 Warnings

**BANNED** ❌:
- "Only documentation warnings"
- "Just linting issues"
- "Minor formatting warnings"
- "Non-critical warnings"

**REQUIRED** ✅:
- "NOT READY - Warnings present (must be zero)"
- "INCOMPLETE - Linting must pass"
- "BLOCKED - Documentation warnings must be fixed"

### 4.3 Incomplete Features

**BANNED** ❌:
- "Mostly complete"
- "Good enough for now"
- "Can polish later"
- "Just needs refinement"

**REQUIRED** ✅:
- "INCOMPLETE - Feature X not implemented"
- "NOT READY - Missing functionality Y"
- "PARTIAL - Requires completion of Z"

### 4.4 Technical Debt

**BANNED** ❌:
- "Only temporary workaround"
- "Just needs refactoring later"
- "Minor technical debt"
- "Non-blocking debt"

**REQUIRED** ✅:
- "Technical debt present - must be resolved"
- "Workaround implemented - permanent fix required"
- "Debt introduced - documented in DEBT_LOG.md"

---

## 5. Rationale

### 5.1 Slippery Slope

**CS2 Statement**: "If I allow 0.00001% to slip through it's going to catch up with me."

Minimizing language is the first step on a slippery slope:
1. Today: "Only 7 tests failing"
2. Tomorrow: "Only 15 tests failing"
3. Next week: "Just 30 tests failing"
4. Result: **365 warnings accumulated** (historical evidence)

**There is no "acceptable" amount of minimization.**

### 5.2 Subjective Judgment

Who decides what's "minor" or "non-blocking"?
- Builder thinks "just documentation" is minor
- CS2 knows documentation failures become production incidents
- Result: **Misalignment between builder and authority**

**Objective standard required: 100% GREEN or NOT READY.**

### 5.3 Zero Tolerance Principle

From BUILD_PHILOSOPHY.md:
> "99% = 0%"
> "92% pass rate = TOTAL FAILURE"

**This is not negotiable. This is the operating constraint.**

### 5.4 Historical Evidence

**Case Study**: Foundation Wave PR #504
- 92% pass rate (84/91 tests)
- 7 failing tests described as "only documentation nits"
- Declared "COMPLETE" with "core functionality COMPLETE"
- **CS2 REJECTED**: Recognized as test dodging

**Pattern**: 365 warnings accumulated via minimizing language over time

**Lesson**: "Only" language masks accumulation until it becomes catastrophic.

---

## 6. Enforcement Rules

### 6.1 Automatic Rejection

PRs containing banned language SHALL be:
1. Immediately flagged by reviewers (human or automated)
2. Rejected with reference to this policy
3. Returned to builder for accurate status description

**No negotiation. No exceptions without CS2 pre-approval.**

### 6.2 Required Justification for Failures

If ANY test fails, ANY warning exists, or ANY issue is unresolved:
1. Builder MUST provide written justification for EACH failure/warning
2. Justification must include: root cause, impact assessment, resolution plan
3. Builder MUST obtain CS2 sign-off BEFORE submission
4. PR must be marked "NOT READY" or "INCOMPLETE"

**No exceptions.**

### 6.3 CS2 Pre-Approval Required

If builder believes an exception is warranted:
1. Submit written request to CS2 with complete analysis
2. Wait for explicit approval before submission
3. Include CS2 approval reference in PR description
4. Expect scrutiny - exceptions are rare

**Default answer is NO.**

---

## 7. Examples

### 7.1 REJECTED PR Description ❌

```markdown
# Foundation Wave - Schema Generation COMPLETE

## Status: READY FOR MERGE ✅

All core functionality is working perfectly!

Only 7 tests are failing, but they're just documentation formatting checks.
These are non-blocking and can be addressed in future refinement.

Core components:
- ✅ Schema generator working
- ✅ Type definitions generated
- ✅ Test infrastructure in place

92% test pass rate (84/91 tests passing)
```

**Rejection Reason**:
- Uses "only", "just", "non-blocking"
- Minimizes 7 failing tests (8% failure rate)
- Declares "COMPLETE" when incomplete
- No justification for failures
- No CS2 pre-approval

**Correct Status**: NOT READY - 7 tests failing

---

### 7.2 APPROVED PR Description ✅

```markdown
# Foundation Wave - Schema Generation COMPLETE

## Status: READY FOR MERGE ✅

## QA Results: 100% PASS

- ✅ All 91 tests passing (100% pass rate)
- ✅ Zero warnings
- ✅ All linting passing
- ✅ All type checks passing
- ✅ Zero test debt

## Core Components Implemented

- ✅ Schema generator with full validation
- ✅ Type definitions with complete coverage
- ✅ Test infrastructure with all helpers implemented
- ✅ Documentation complete

## Evidence

- QA report: [link]
- Test output: [link]
- Build logs: [link]
```

**Approval Reason**:
- Accurate status description
- 100% pass rate explicitly stated
- Zero warnings/debt confirmed
- No minimizing language
- Evidence provided

---

### 7.3 APPROVED Incomplete PR Description ✅

```markdown
# Foundation Wave - Schema Generation INCOMPLETE

## Status: NOT READY - BLOCKED

## Blocking Issues (7 tests failing)

1. Test: `schema-validation.test.ts:45` - FAIL
   - Root cause: Missing null check in validator
   - Impact: Schema validation fails for empty input
   - Resolution: Add null guard (30min)

2. Test: `type-generation.test.ts:23` - FAIL
   - Root cause: Type definition incomplete
   - Impact: Generated types missing optional fields
   - Resolution: Update type generator (1hr)

[... remaining 5 tests with similar detail ...]

## Current Status

- 84/91 tests passing (92% pass rate)
- 7 tests failing - MUST be 100% PASS before merge
- CS2 sign-off REQUIRED before resubmission

## Next Steps

1. Fix all 7 failing tests
2. Verify 100% pass rate
3. Obtain CS2 approval
4. Resubmit as READY
```

**Approval Reason**:
- Accurate status: "NOT READY - BLOCKED"
- No minimizing language
- Each failure documented with justification
- Clear resolution plan
- Recognizes CS2 approval required

---

## 8. Precedent

### 8.1 First Case: PR #504 (Foundation Wave)

**Date**: 2026-01-08  
**Campaign**: ZWZDI-2026-001 (Zero Warning Zero Debt Initiative)  
**Repository**: APGI-cmy/maturion-foreman-office-app  
**Builder**: Schema Builder

**Status Claimed**:
- "COMPLETE"
- "Only documentation nits"
- "Non-blocking failures"
- "Core functionality COMPLETE"

**Actual Status**:
- 92% pass rate (84/91 tests)
- 7 failing tests (8% debt)
- Test infrastructure incomplete
- Documentation validation failing

**CS2 Decision**: REJECTED with prejudice

**CS2 Statement**: 
> "If I allow 0.00001% to slip through it's going to catch up with me. 'Only' is not acceptable to me — this is test dodging."

**Outcome**:
- PR rejected
- Builder required to achieve 100% PASS
- This policy created
- Precedent set for all future work

### 8.2 Bootstrap Learning Entry

**Entry ID**: BOOTSTRAP-TEST-DODGING-001  
**Location**: `docs/bootstrap-learning/BOOTSTRAP-TEST-DODGING-001.md`  
**Pattern**: Test dodging via minimizing language  
**Status**: Canonical learning - must be studied by all builders

---

## 9. Related Policies

This policy is related to and enforces:

1. **BUILD_PHILOSOPHY.md**
   - Section: "100% GREEN Philosophy"
   - Rule: "99% = 0%"
   - Mandate: "Zero test debt - no exceptions"

2. **governance/policy/QA_POLICY_MASTER.md**
   - Section: "Build-to-Green"
   - Rule: "100% tests passing required"
   - Mandate: "Gate-Eligible Green status"

3. **governance/policy/TEST_REMOVAL_GOVERNANCE_GATE.md**
   - Section: "Zero-Tolerance Policy"
   - Rule: "Tests SHALL NOT be removed without proof"
   - Connection: Both prevent debt accumulation

4. **governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md**
   - Pattern #4: "Good Enough Excuse"
   - Learning: Minimizing language masks accumulation
   - Evidence: 365 warnings accumulated

5. **T0-003: Zero Test Debt Constitutional Rule**
   - Constitutional: Zero test debt mandate
   - Authority: Supreme - cannot be overridden
   - Enforcement: This policy implements T0-003

---

## 10. Training and Education

### 10.1 Builder Onboarding

All builders MUST:
1. Read this policy in full
2. Study BOOTSTRAP-TEST-DODGING-001 case
3. Review approved and rejected examples
4. Acknowledge policy compliance
5. Demonstrate understanding via quiz

### 10.2 Continuous Reinforcement

This policy MUST be:
1. Referenced in builder contracts
2. Included in PR templates
3. Checked in code reviews
4. Enforced by governance gates
5. Reinforced in retrospectives

### 10.3 Pattern Recognition

Builders must learn to recognize:
- Early warning signs of test dodging
- Subtle forms of minimizing language
- Rationalizations that mask incomplete work
- Pressure to compromise standards

**When in doubt: Escalate to CS2, do not compromise.**

---

## 11. Governance Ripple

### 11.1 Downstream Repositories

This policy MUST be:
1. Copied to all application repositories
2. Referenced in governance documentation
3. Enforced by local PR gates
4. Integrated into builder training

### 11.2 Policy Layering

**Governance Repository** (upstream):
- `governance/policy/POLICY-NO-ONLY-LANGUAGE.md` (this file)
- Authority: Supreme - cannot be weakened downstream

**Application Repositories** (downstream):
- Copy to `governance/policies/POLICY-NO-ONLY-LANGUAGE.md`
- Reference in `GOVERNANCE_LEARNING_BRIEF.md`
- Enforce via PR review and gates

### 11.3 Campaign Integration

**ZWZDI Campaign** (Zero Warning Zero Debt Initiative):
- Reference in `PLANNING_PHASE_COMPLETION_SUMMARY.md`
- Add to builder training checklist
- Include in wave handover requirements
- Verify compliance in wave retrospectives

---

## 12. Updates and Amendments

### 12.1 Policy Authority

This policy may only be updated by:
- CS2 (Johan Ras) - Direct authority
- Governance Administrator - With CS2 approval
- Maturion Leadership - Constitutional amendments

### 12.2 Amendment Process

Policy amendments require:
1. Written proposal with rationale
2. Impact analysis across all repositories
3. CS2 review and approval
4. Governance ripple plan
5. Version increment and changelog

### 12.3 Emergency Amendments

In case of urgent needs:
1. CS2 may issue temporary amendment
2. Temporary amendment valid for 48 hours
3. Permanent amendment must follow standard process
4. All changes documented in CHANGELOG.md

---

## 13. Compliance and Audit

### 13.1 Continuous Monitoring

Governance Administrator SHALL:
1. Monitor all PRs for banned language
2. Flag violations immediately
3. Track compliance metrics
4. Report patterns to CS2
5. Recommend policy adjustments

### 13.2 Compliance Metrics

Track and report:
- Number of violations detected
- Response time to violations
- Repeat offenders
- Policy effectiveness
- Builder training completion

### 13.3 Incident Response

When violations occur:
1. Immediate flag and rejection
2. Reference this policy
3. Require corrective action
4. Document in incident log
5. Update training if pattern emerges

---

## 14. Summary

**Policy**: BAN on minimizing language when describing incomplete work  
**Scope**: All repositories, all builders, all PRs  
**Enforcement**: Immediate rejection, no exceptions without CS2 approval  
**Rationale**: Prevents debt accumulation via slippery slope  
**Authority**: CS2 decision 2026-01-08, constitutional mandate  
**Precedent**: PR #504 rejection (test dodging incident)  

**Key Principle**: 
> "If it's not 100% GREEN, say so. If it is 100% GREEN, prove it. No 'only', no 'just', no minimizing."

---

## 15. Acceptance and Acknowledgment

By submitting work in the Maturion ecosystem, builders acknowledge:
1. They have read and understood this policy
2. They will not use banned minimizing language
3. They will describe work status accurately
4. They will seek CS2 approval for any exceptions
5. They accept that violations will result in immediate rejection

**This is non-negotiable. This is the standard.**

---

**Policy Status**: ACTIVE  
**Enforcement**: IMMEDIATE  
**Version**: 1.0  
**Last Updated**: 2026-01-08  
**Next Review**: 2026-04-08 (quarterly)

---

**END OF POLICY**
