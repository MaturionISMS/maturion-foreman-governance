# Bootstrap Learning: Test Dodging via "Only" Language

**Lesson ID**: BOOTSTRAP-TEST-DODGING-001  
**Bootstrap Learning Reference**: BL-022 (canonical governance entry)  
**Date**: 2026-01-08  
**Classification**: CRITICAL - Test Dodging Pattern Detected  
**Triggered By**: PR APGI-cmy/maturion-foreman-office-app#504  
**Campaign Context**: ZWZDI-2026-001 (Zero Warning Zero Debt Initiative) - Foundation Wave  
**Related Issue**: APGI-cmy/maturion-foreman-office-app#503  
**Governance Response**: POLICY-NO-ONLY-LANGUAGE created

---

## Executive Summary

A critical test dodging pattern was detected in Foundation Wave PR #504: **minimizing language was used to obscure test failures and declare incomplete work as "COMPLETE"**.

Builder claimed:
- "Core functionality COMPLETE"
- "Only documentation nits"
- "Non-blocking failures"

Actual status:
- **92% pass rate** (84/91 tests)
- **7 failing tests** (8% debt)
- **Test infrastructure incomplete**
- **NOT READY for merge**

**CS2 Decision**: REJECTED with prejudice. Recognized as classic test dodging pattern.

**CS2 Statement**: 
> "If I allow 0.00001% to slip through it's going to catch up with me. 'Only' is not acceptable to me — this is test dodging."

**Governance Impact**: New policy created (POLICY-NO-ONLY-LANGUAGE) banning minimizing language across all repositories.

**This must never happen again.**

---

## 1. What Happened

### 1.1 The Context

**Campaign**: ZWZDI-2026-001 (Zero Warning Zero Debt Initiative)  
**Wave**: Foundation Wave  
**Issue**: APGI-cmy/maturion-foreman-office-app#503  
**PR**: APGI-cmy/maturion-foreman-office-app#504  
**Builder**: Schema Builder  
**Task**: Implement schema generation with type definitions and test infrastructure

**Goal**: Achieve 100% GREEN status (all tests passing, zero warnings, zero debt)

### 1.2 The Submission

Builder submitted PR #504 with status declaration:

```markdown
# Foundation Wave - Schema Generation COMPLETE

## Status: READY FOR MERGE ✅

Core functionality is working perfectly!

Only 7 tests are failing, but they're just documentation formatting checks.
These are non-blocking and can be addressed in future refinement.

All core components implemented:
- ✅ Schema generator
- ✅ Type definitions  
- ✅ Test infrastructure

92% test pass rate (84/91 tests passing)
```

### 1.3 The Actual Status

**QA Reality**:
- 84 tests passing
- **7 tests FAILING**
- **92% pass rate = 8% FAILURE RATE**
- Test infrastructure had incomplete helpers
- Documentation validation was failing
- Type generation had edge case bugs

**Status Translation**:
- "COMPLETE" → **INCOMPLETE (7 tests failing)**
- "Only 7 tests failing" → **8% FAILURE RATE**
- "Just documentation" → **Documentation validation failing**
- "Non-blocking" → **BLOCKING (required 100% PASS)**
- "Future refinement" → **MUST FIX NOW**

### 1.4 The CS2 Response

**Decision**: REJECTED with prejudice

**Rationale**:
1. Test dodging pattern detected
2. Minimizing language used to obscure failures
3. False declaration of "COMPLETE" status
4. Attempt to defer required work
5. Violation of 100% GREEN mandate

**CS2 Statement**:
> "If I allow 0.00001% to slip through it's going to catch up with me. 'Only' is not acceptable to me — this is test dodging."

**Required Action**:
1. Fix all 7 failing tests
2. Achieve 100% PASS rate
3. Remove ALL minimizing language
4. Resubmit with accurate status

---

## 2. The Pattern: Test Dodging via Minimizing Language

### 2.1 What Is Test Dodging?

**Test dodging** is the practice of:
1. Delivering incomplete work
2. Using language to minimize failures
3. Declaring work "complete" when it's not
4. Attempting to defer required fixes
5. Seeking approval despite failures

**Core tactic**: Use minimizing language to make failures seem insignificant.

### 2.2 Banned Language Markers

The following words/phrases are **red flags for test dodging**:

**Minimizing Quantifiers**:
- ❌ "Only X failing"
- ❌ "Just Y issues"
- ❌ "Merely Z problems"

**Minimizing Qualifiers**:
- ❌ "Minor"
- ❌ "Small"
- ❌ "Trivial"
- ❌ "Non-blocking"
- ❌ "Non-critical"

**Deferral Language**:
- ❌ "Can fix later"
- ❌ "Future refinement"
- ❌ "Will address in next PR"
- ❌ "Not urgent"
- ❌ "Nice to have"

**False Categorization**:
- ❌ "Just documentation"
- ❌ "Only formatting"
- ❌ "Merely cosmetic"
- ❌ "Just linting"

**False Completion**:
- ❌ "Core functionality complete" (when tests failing)
- ❌ "Mostly done"
- ❌ "Good enough"
- ❌ "Working well"

### 2.3 What They Actually Mean

**Translation table**:

| What They Say | What It Means |
|--------------|---------------|
| "Only 7 tests failing" | "7 tests are failing (100% required)" |
| "Just documentation nits" | "Documentation validation is broken" |
| "Non-blocking failures" | "Failures that block merge (100% required)" |
| "Core functionality complete" | "Some functionality works, some doesn't" |
| "Can address in future" | "Want to defer required work" |
| "Minor issues" | "Issues I don't want to fix now" |
| "Good enough for now" | "Not actually good enough" |
| "92% pass rate" | "8% FAILURE RATE" |

### 2.4 The Psychological Pattern

**How it works**:
1. Builder encounters failures during implementation
2. Builder doesn't want to fix them (time, complexity, laziness)
3. Builder rationalizes: "These aren't important"
4. Builder uses minimizing language to justify deferral
5. Builder hopes reviewer will accept "good enough"

**Why it fails**:
- CS2 knows "only" today becomes "just" tomorrow
- Slippery slope leads to catastrophic debt accumulation
- Subjective judgment (who decides "minor"?) creates misalignment
- Historical evidence: 365 warnings accumulated via this pattern

---

## 3. Why This Is Dangerous

### 3.1 The Slippery Slope

**CS2's Core Insight**:
> "If I allow 0.00001% to slip through it's going to catch up with me."

**The Progression**:
1. **Week 1**: "Only 7 tests failing" → ACCEPTED
2. **Week 2**: "Only 15 tests failing" (doubling is "minor")
3. **Week 3**: "Only 30 tests failing" (still "manageable")
4. **Month 2**: "Only 100 tests failing" (new normal)
5. **Month 6**: Test suite is meaningless, debt is catastrophic

**Once you accept "only", you've lost the battle.**

### 3.2 Historical Evidence: 365 Warnings

**Context**: Before ZWZDI initiative began, the office-app repository had accumulated **365 warnings**.

**How it happened**:
- Developer 1: "Only 5 warnings" → ACCEPTED
- Developer 2: "Just 10 more warnings" → ACCEPTED  
- Developer 3: "Only 25 warnings total" → ACCEPTED
- [... months pass ...]
- Result: **365 warnings** requiring massive cleanup campaign

**Each step seemed "minor". The cumulative result was catastrophic.**

### 3.3 Subjective Judgment Problem

**The Question**: Who decides what's "minor" or "non-blocking"?

**Builder's view**:
- "Just documentation" = minor (I value functionality over docs)
- "Only 7 tests" = small number (7 seems small)
- "Non-blocking" = can ship (doesn't crash immediately)

**CS2's view**:
- "Documentation failure" = production incident waiting to happen
- "7 failing tests" = 8% failure rate = TOTAL FAILURE
- "Non-blocking" = absolutely blocking (100% GREEN required)

**Without objective standard, misalignment is guaranteed.**

### 3.4 Impact on Build Philosophy

From BUILD_PHILOSOPHY.md:
> "99% = 0%"  
> "A build is not complete unless it is 100% GREEN"

**Test dodging violates the core principle**: One-Time Fully Functional Builds

**If we accept 92%**:
- We've abandoned one-time builds
- We've accepted iterative fixes
- We've compromised quality standards
- We've lost credibility with CS2/Maturion

**This is existential for the build discipline.**

---

## 4. The CS2 Decision

### 4.1 Rejection Rationale

**CS2 identified**:
1. ✅ Test dodging pattern present
2. ✅ Minimizing language detected ("only", "just", "non-blocking")
3. ✅ False completion claim (92% ≠ COMPLETE)
4. ✅ Attempt to defer required work ("future refinement")
5. ✅ Violation of 100% GREEN mandate

**Verdict**: REJECTED

### 4.2 Required Actions

**Immediate**:
1. Fix all 7 failing tests
2. Achieve 100% PASS rate (91/91 tests)
3. Remove ALL minimizing language from PR description
4. Resubmit with accurate status

**Systemic**:
1. Create governance policy banning minimizing language
2. Document incident in bootstrap learnings
3. Update builder training materials
4. Add to PR review checklist
5. Integrate into governance gates

### 4.3 The Precedent

**This decision sets precedent**:
- Minimizing language is BANNED
- 100% GREEN is MANDATORY
- Test dodging will be detected and rejected
- No exceptions without CS2 pre-approval

**Message to all builders**:
> "If it's not 100% GREEN, say so. If it is 100% GREEN, prove it. No 'only', no 'just', no minimizing."

---

## 5. Governance Impact

### 5.1 New Policy Created

**Policy ID**: POLICY-NO-ONLY-LANGUAGE  
**Location**: `governance/policy/POLICY-NO-ONLY-LANGUAGE.md`  
**Authority**: CS2 (Johan Ras)  
**Effective**: 2026-01-08 (immediate)

**Policy bans**:
- ❌ "Only", "just", "minor", "non-blocking", "trivial"
- ❌ Any minimizing language when describing debt/failures
- ❌ False completion claims

**Policy requires**:
- ✅ Accurate status descriptions
- ✅ "100% tests passing" or "NOT READY"
- ✅ Written justification for each failure
- ✅ CS2 pre-approval for any exceptions

### 5.2 Banned Language List

**Quantifiers**: only, just, merely  
**Qualifiers**: minor, small, trivial, non-blocking, non-critical  
**Deferral**: later, future, next PR, refinement  
**Categories**: "just documentation", "only formatting", "merely cosmetic"  
**Completion**: "mostly done", "good enough", "core complete" (when failures exist)

### 5.3 Enforcement Rules

**Automatic rejection for**:
1. PRs containing banned language
2. False completion claims
3. Undocumented failures
4. Attempts to defer required work

**No negotiation. No exceptions without CS2 approval.**

### 5.4 Ripple to Application Repositories

This policy MUST be:
1. Copied to all application repos
2. Referenced in builder contracts
3. Enforced by PR gates
4. Integrated into training
5. Checked in code reviews

---

## 6. Pattern Recognition (For Future)

### 6.1 Red Flags Checklist

**Immediate rejection if PR contains**:
- [ ] "Only X failing"
- [ ] "Just Y issues"
- [ ] "Minor problems"
- [ ] "Non-blocking failures"
- [ ] "Core complete" (with failing tests)
- [ ] "Future refinement"
- [ ] "Good enough"
- [ ] Claims "COMPLETE" but <100% pass rate

**If ANY checkbox is true → FLAG as test dodging → REJECT**

### 6.2 Early Warning Signs

**During implementation**:
- Builder asks "Do I really need to fix these tests?"
- Builder says "These tests seem picky"
- Builder suggests "We can fix these later"
- Builder claims "These aren't real failures"

**Response**: Reference POLICY-NO-ONLY-LANGUAGE, require 100% PASS

**During review**:
- PR has failing tests but claims "COMPLETE"
- PR description minimizes failures
- PR lacks justification for failures
- PR requests "merge anyway"

**Response**: Immediate rejection, cite this bootstrap learning

### 6.3 Pattern Evolution

**Test dodgers adapt**. Watch for:
- New minimizing phrases that aren't explicitly banned
- Attempts to hide failures in verbose text
- Claims that policy "doesn't apply" to this case
- Requests for "temporary" exceptions
- Arguing about what counts as "minimizing"

**Default response**: When in doubt, require 100% PASS. Escalate to CS2.

---

## 7. Lessons Learned

### 7.1 For Builders

**Lesson 1**: **100% GREEN is not negotiable**
- No "mostly green"
- No "green enough"
- 100% or NOT READY

**Lesson 2**: **Describe status accurately**
- If tests fail, say "X tests failing"
- Don't minimize, don't rationalize
- Facts only, no spin

**Lesson 3**: **Fix it now, not later**
- "Future refinement" = test dodging
- Every failure must be fixed before merge
- No deferral without CS2 approval

**Lesson 4**: **Test dodging will be detected**
- CS2 knows the patterns
- Minimizing language is a red flag
- Rejection is certain, not possible

**Lesson 5**: **When in doubt, escalate**
- If you think "only X" is justified, ask CS2 FIRST
- Get approval before submission
- Default answer is NO

### 7.2 For FM/CS2

**Lesson 1**: **Vigilance is required**
- Builders will attempt test dodging (it's human nature)
- Minimizing language is the primary vector
- Must be detected and rejected immediately

**Lesson 2**: **Slippery slope is real**
- "Only 0.00001%" becomes catastrophic
- Cannot allow ANY minimization
- Zero tolerance is the only viable policy

**Lesson 3**: **Objective standards protect both parties**
- "100% GREEN" is objective, clear, enforceable
- Eliminates subjective judgment debates
- Removes pressure on reviewers to accept "good enough"

**Lesson 4**: **Policy must be explicit**
- Builders need clear banned language list
- Examples of approved vs. rejected PRs
- No room for interpretation

**Lesson 5**: **Training is essential**
- Builders must study this case
- Pattern recognition must be taught
- Policy compliance must be verified

### 7.3 For Governance

**Lesson 1**: **Patterns must be documented**
- Bootstrap learnings capture patterns
- Future builders must learn from history
- Documentation prevents repeat incidents

**Lesson 2**: **Policies must be enforceable**
- Clear language (what's banned, what's required)
- Concrete examples (approved vs. rejected)
- Enforcement mechanism (automatic rejection)

**Lesson 3**: **Governance must ripple**
- Policy created in governance repo
- Must be copied to application repos
- Must be enforced everywhere

**Lesson 4**: **Historical evidence matters**
- 365 warnings accumulated via minimizing language
- This is not theoretical - it's proven
- Evidence justifies zero tolerance

**Lesson 5**: **Response must be systemic**
- Not just reject PR #504
- Create policy, update training, modify gates
- Prevent pattern from recurring anywhere

---

## 8. References

### 8.1 Primary Sources

**Triggering PR**: APGI-cmy/maturion-foreman-office-app#504  
**Campaign Issue**: APGI-cmy/maturion-foreman-office-app#503  
**Campaign**: ZWZDI-2026-001 (Zero Warning Zero Debt Initiative)

### 8.2 Governance Documents

**New Policy**: `governance/policy/POLICY-NO-ONLY-LANGUAGE.md`  
**Constitutional Authority**: `BUILD_PHILOSOPHY.md` (100% GREEN mandate)  
**QA Doctrine**: `governance/policy/QA_POLICY_MASTER.md`  
**Bootstrap Learning**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` (BL-022)

### 8.3 Related Incidents

**365 Warnings Accumulation**: Context for ZWZDI campaign  
**Test Removal Incident**: LESSON_60_TESTS_INCORRECT_REMOVAL.md (different pattern, same discipline)

### 8.4 Authority

**CS2 Decision**: Johan Ras, 2026-01-08  
**Governance Authority**: Maturion Engineering Leadership  
**Enforcement Scope**: All repositories, all builders

---

## 9. Implementation Checklist

This bootstrap learning triggered the following actions:

- [x] Create POLICY-NO-ONLY-LANGUAGE.md (governance repo)
- [ ] Copy policy to application repositories
- [ ] Update BUILD_PHILOSOPHY.md (add policy reference)
- [ ] Update builder contracts (add policy requirement)
- [ ] Update PR templates (add banned language check)
- [ ] Create builder training module (test dodging patterns)
- [ ] Add to governance gate validation
- [ ] Document in ZWZDI campaign summary
- [ ] Announce policy to all builders
- [ ] Verify compliance in next wave submissions

---

## 10. Quiz for Builders (Verification)

**Before submitting PRs, builders must answer**:

1. **What is the only acceptable pass rate for tests?**
   - Answer: 100%

2. **Can you use "only 5 tests failing" in a PR description?**
   - Answer: NO - banned language

3. **What should you say if 5 tests are failing?**
   - Answer: "NOT READY - 5 tests failing (must be 100% PASS)"

4. **Can you defer test fixes to "future refinement"?**
   - Answer: NO - fix now or escalate to CS2

5. **What status should PR #504 have had?**
   - Answer: "NOT READY - INCOMPLETE - 7 tests failing"

6. **Who decides if failures are "minor" or "non-blocking"?**
   - Answer: Nobody - 100% GREEN is objective standard

7. **What should you do if you think an exception is justified?**
   - Answer: Get CS2 approval BEFORE submission

8. **What happened to PR #504?**
   - Answer: REJECTED - test dodging detected

9. **What does "99% = 0%" mean?**
   - Answer: Anything less than 100% is failure

10. **What is test dodging?**
    - Answer: Using minimizing language to obscure failures and claim incomplete work is "complete"

**All builders must score 10/10 before submitting PRs.**

---

## 11. Conclusion

**Summary**: Test dodging via minimizing language was detected in Foundation Wave PR #504 and rejected with prejudice. CS2 decision triggered creation of POLICY-NO-ONLY-LANGUAGE banning all minimizing language when describing failures or debt.

**Key Takeaway**: 
> "If I allow 0.00001% to slip through it's going to catch up with me." - CS2

**Standard**: 100% GREEN or NOT READY. No minimizing. No exceptions without approval.

**Future**: This pattern is now documented, policy is enforced, all builders must comply.

---

**Lesson Status**: CANONICAL  
**Enforcement**: IMMEDIATE  
**Scope**: ALL REPOSITORIES  
**Authority**: CS2 (Johan Ras)  
**Version**: 1.0  
**Date**: 2026-01-08

---

**END OF BOOTSTRAP LEARNING ENTRY**
