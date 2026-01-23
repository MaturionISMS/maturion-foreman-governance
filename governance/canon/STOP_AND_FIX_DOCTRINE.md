# STOP-AND-FIX DOCTRINE

## Status
**Type**: Tier-0 Constitutional Canon
**Authority**: Supreme - Constitutional
**Version**: 1.0.0
**Effective Date**: 2026-01-23
**Owner**: Maturion Engineering Leadership (Johan Ras)
**Layer-Down Status**: PUBLIC_API
**Applies To**: All Agents, All Builders, All Foreman Instances, All Work, All Repositories

---

## 1. Purpose

This doctrine establishes **zero tolerance for technical debt, test failures, errors, and safety violations** across all Maturion systems. It mandates immediate action when any agent or builder encounters defects, failures, or non-conformance—regardless of origin or responsibility.

The Stop-and-Fix doctrine exists to ensure:
- **Zero technical debt accumulation** across the system
- **Every handover is in a good state** (100% GREEN, zero debt)
- **Safety and quality are everyone's responsibility** (not just the originator)
- **Systematic elimination of defects** before they compound
- **Continuous improvement** through immediate remediation

**Critical Principle**: Like workplace safety, code quality and governance conformance is EVERYONE'S responsibility. "If you see it, you own it."

---

## 2. Constitutional Authority

This doctrine derives supreme authority from and integrates with:

- **BUILD_PHILOSOPHY.md** - 100% GREEN philosophy, Zero Test Debt constitutional requirement
- **BYG_DOCTRINE.md** - One-Time Build Law, compulsory learning, failure semantics
- **DEFECT_RESOLUTION_MAINTENANCE_CANON.md** - Defect resolution standards, maintenance governance
- **ESCALATION_POLICY.md** - Escalation triggers and paths for unresolvable issues
- **FAILURE_PROMOTION_RULE.md** - Learning from failures, prevention of recurrence
- **FM_ROLE_CANON.md** - FM authority to halt execution on quality violations
- **QA_POLICY_MASTER.md** - QA validation requirements, test failure handling

**Integration Principle**: Stop-and-Fix is NOT a new governance layer—it is a **behavioral mandate** that enforces existing quality and governance requirements through immediate action.

---

## 3. Core Principles

### 3.1 Zero Tolerance Philosophy

**Principle**: ANY error, test failure, governance violation, or safety issue discovered during work triggers IMMEDIATE STOP and FIX action.

**Scope of Zero Tolerance**:
- ❌ Test failures (failing, erroring, timing out)
- ❌ Test debt (skipped, incomplete, stubbed tests)
- ❌ Build errors (compilation, linking, packaging)
- ❌ Linter errors and warnings
- ❌ Type errors and schema violations
- ❌ Security vulnerabilities
- ❌ Governance gate failures
- ❌ Safety violations (data loss risk, broken invariants)
- ❌ Performance regressions (when detected)
- ❌ Incomplete test infrastructure (stub helpers, broken fixtures)

**Rationale**:
- Allowing ANY defect to pass downstream creates systemic risk
- Technical debt compounds exponentially if not immediately addressed
- "Small" issues cascade into critical failures
- Deferred fixes are statistically never completed
- Every handover must represent a GOOD STATE for the next agent

### 3.2 Universal Responsibility

**Principle**: EVERY agent and builder is responsible for fixing defects they encounter—REGARDLESS of who introduced them or when they were created.

**The "If You See It, You Own It" Rule**:
- Discovering a test failure → YOU fix it (not "file a bug")
- Discovering test debt → YOU resolve it (not "defer for later")
- Discovering a warning → YOU eliminate it (not "ignore it")
- Discovering a security issue → YOU remediate it (not "document and move on")
- Discovering broken infrastructure → YOU repair it (not "work around it")

**Forbidden Responses**:
- ❌ "Not my job" (quality is everyone's job)
- ❌ "Not my code" (you work on the codebase, you own its quality)
- ❌ "Was already broken" (doesn't matter—fix it now)
- ❌ "Out of scope" (quality is never out of scope)
- ❌ "File a ticket" (fix it immediately, then document)
- ❌ "Will fix in next PR" (fix it in THIS PR)

**Limited Exception**: If fixing requires domain expertise you lack OR would require changing code/architecture outside your authority, you may escalate to CS2 (see Section 5).

### 3.3 Immediate Remediation

**Principle**: When a defect is discovered, work STOPS immediately and remediation begins. No proceeding to "finish the feature first."

**Stop-and-Fix Workflow**:

```
1. DETECT → Agent encounters error/failure/debt/violation
2. STOP → Immediately halt all forward progress on current task
3. ASSESS → Determine root cause and remediation approach
4. FIX → Resolve the issue completely (not partially)
5. VERIFY → Run full validation (all tests, all gates, all checks)
6. DOCUMENT → Record what was found, fixed, and verified
7. CONTINUE → Resume original work ONLY after 100% GREEN restored
```

**Critical Rules**:
- ✅ Stop work IMMEDIATELY when issue detected
- ✅ Fix issue COMPLETELY before proceeding
- ✅ Verify fix with FULL test suite (not just related tests)
- ✅ Document fix in PR description and commit message
- ❌ No "partial fixes" (fix it completely or escalate)
- ❌ No "temporary workarounds" (fix root cause)
- ❌ No "good enough for now" (100% GREEN or bust)

**Time Investment**: Remediation time is NEVER "wasted"—it prevents cascading failures, eliminates debt, and improves system quality for all future work.

### 3.4 No Partial Handovers

**Principle**: Work may ONLY be handed over when in a GOOD STATE. Partial completion, known issues, or deferred fixes are STRICTLY PROHIBITED.

**Good State Definition**:
- ✅ 100% GREEN (all tests passing)
- ✅ Zero test debt (no skips, stubs, incomplete tests)
- ✅ Zero errors (compilation, runtime, deployment)
- ✅ Zero warnings (unless explicitly whitelisted)
- ✅ All gates passing (governance, quality, security)
- ✅ All infrastructure complete (helpers, fixtures, mocks)
- ✅ All documentation current and accurate
- ✅ All security vulnerabilities resolved or escalated

**Handover States**:
1. **COMPLETE** → 100% GREEN, zero debt, ready for next agent
2. **ESCALATED** → Blocker encountered, documented, and escalated to CS2 with full context

**Forbidden States**:
- ❌ PARTIAL → "Most of it works, just X is broken"
- ❌ DEFERRED → "Will fix the failing tests later"
- ❌ DOCUMENTED → "Known issues listed in README"
- ❌ WORKAROUND → "Temporarily disabled the failing check"

**Enforcement**: Agents attempting partial handovers violate this doctrine and must be corrected through governance review.

---

## 4. Operational Requirements

### 4.1 Pre-Work Baseline Validation

**Requirement**: Before beginning ANY work, agents MUST establish and validate the current state baseline.

**Baseline Checks** (execute before starting work):
```bash
# 1. Run all tests to establish baseline
npm test  # or equivalent for repo

# 2. Run all linters
npm run lint  # or equivalent

# 3. Run all type checks
npm run type-check  # or equivalent

# 4. Check build status
npm run build  # or equivalent

# 5. Document baseline state
echo "Baseline: [GREEN/RED], [N] tests passing, [N] warnings"
```

**Purpose**:
- Distinguish pre-existing issues from newly introduced issues
- Establish clear "before" state for comparison
- Identify immediate Stop-and-Fix triggers before starting new work

**Critical Rule**: If baseline is NOT 100% GREEN, you MUST fix all issues BEFORE starting your assigned work. No exceptions.

### 4.2 Continuous Validation

**Requirement**: During work, agents MUST validate continuously to detect issues as early as possible.

**Continuous Validation Practices**:
- ✅ Run related tests after each meaningful change
- ✅ Run full test suite before committing
- ✅ Run linters before committing
- ✅ Validate builds at logical checkpoints
- ✅ Check for warnings and errors continuously

**Early Detection Benefits**:
- Issues caught immediately are easier to fix
- Root cause is fresh in context
- Reduces time spent debugging later
- Prevents multiple issues from compounding

### 4.3 Complete Remediation

**Requirement**: When fixing issues, fixes MUST be complete and verified—not partial or superficial.

**Complete Fix Criteria**:
- ✅ Root cause identified and eliminated (not just symptoms)
- ✅ All related tests passing (not just the initially failing test)
- ✅ No new issues introduced by the fix
- ✅ Fix approach aligns with architecture and governance
- ✅ Fix includes test coverage for the defect (prevent regression)
- ✅ Documentation updated if behavior changed

**Incomplete Fix Indicators** (PROHIBITED):
- ❌ "Fixed the test but not sure why it was failing"
- ❌ "Disabled the check that was causing the error"
- ❌ "Works on my machine but CI still fails"
- ❌ "Fixed most of the issues, just a few left"
- ❌ "Added @ts-ignore to suppress the type error"

### 4.4 Audit Trail

**Requirement**: All Stop-and-Fix actions MUST be documented in the audit trail.

**Documentation Requirements**:
- **What was discovered**: Specific error, failure, or debt found
- **When discovered**: At what point in the workflow
- **What was fixed**: Detailed description of remediation
- **How verified**: Tests run, checks performed, validation results
- **Time invested**: Approximate time spent on remediation

**Documentation Location**:
- Commit messages (reference Stop-and-Fix in message)
- PR description (include "Stop-and-Fix" section)
- PREHANDOVER_PROOF (for governance work)
- Incident reports (for significant issues)

**Audit Purpose**:
- Proves compliance with Stop-and-Fix doctrine
- Enables learning from common issue patterns
- Provides transparency for reviewers
- Supports governance improvement proposals

---

## 5. Escalation Path

### 5.1 When to Escalate

**Escalate to CS2 ONLY when**:
- Issue requires domain expertise you lack (e.g., database internals, network protocols)
- Issue requires changing code/architecture outside your authority
- Issue is caused by external system, tool, or infrastructure failure
- Issue requires governance decision or policy interpretation
- Issue cannot be resolved within reasonable time (> 4 hours of investigation)
- Multiple fix attempts failed and root cause remains unclear

**DO NOT Escalate when**:
- Issue is within your capability to fix (even if time-consuming)
- Issue is clearly documented in governance (read the docs first)
- Issue is a "nice to have" improvement (fix it if you see it)
- You're tired or want to hand off (persist until complete)

### 5.2 Escalation Requirements

**When escalating, you MUST provide**:
1. **Issue Description**: Detailed description of error/failure/debt
2. **Reproduction Steps**: How to reproduce the issue reliably
3. **Investigation Summary**: What you tried, what you ruled out
4. **Root Cause Hypothesis**: Your best understanding of the cause
5. **Blocker Justification**: Why you cannot resolve it yourself
6. **Current State**: Exact state of code, tests, and environment
7. **Recommended Path**: Suggested approach for resolution (if any)

**Escalation Format**: Create escalation issue or add to existing issue with tag "STOP-AND-FIX ESCALATION - Requires CS2 Intervention"

**During Escalation**:
- ✅ Ensure work is in a SAFE state (no broken builds, no data loss risk)
- ✅ Document all actions taken in audit trail
- ✅ Commit work-in-progress on a feature branch (not main)
- ✅ Wait for CS2 guidance before proceeding
- ❌ Do NOT hand over to another agent
- ❌ Do NOT continue with other work in the same session

---

## 6. Integration with Existing Governance

### 6.1 BUILD_PHILOSOPHY.md Integration

Stop-and-Fix **enforces** the 100% GREEN and Zero Test Debt requirements:
- Agents cannot proceed past RED states
- Test debt triggers immediate remediation
- Warnings are treated as errors (per BUILD_PHILOSOPHY.md)

### 6.2 BYG_DOCTRINE.md Integration

Stop-and-Fix **implements** the compulsory learning requirement:
- First occurrence → Fix immediately + document learning
- Second occurrence → Fix immediately + escalate as governance gap
- Third occurrence → Escalate as systemic failure

### 6.3 DEFECT_RESOLUTION_MAINTENANCE_CANON.md Integration

Stop-and-Fix **applies** to defect resolution:
- Maintenance work must meet same standards as new builds
- One-Time Fix Law requires complete remediation
- Production safety requires additional validation

### 6.4 ESCALATION_POLICY.md Integration

Stop-and-Fix **adds reactive escalation trigger**:
- Unresolvable issues discovered during Stop-and-Fix → Escalate
- Repeated issues in same area → Escalate as governance gap
- Issues requiring governance interpretation → Escalate

### 6.5 FAILURE_PROMOTION_RULE.md Integration

Stop-and-Fix **feeds** learning promotion:
- Issues fixed during Stop-and-Fix are candidates for promotion
- Repeated patterns indicate governance gaps requiring canonization
- Fix learnings inform future prevention strategies

---

## 7. Examples

### Example 1: Test Failure Discovered

**Scenario**: Builder working on feature X discovers 3 failing tests in unrelated module Y.

**CORRECT Response** (Stop-and-Fix):
1. STOP work on feature X immediately
2. Investigate failing tests in module Y
3. Determine root cause (e.g., broken test fixture)
4. Fix the root cause completely
5. Verify ALL tests pass (not just the 3)
6. Document fix in commit: "Stop-and-Fix: Repair broken test fixture in module Y"
7. Resume work on feature X

**INCORRECT Response** (Forbidden):
1. "Not my problem, I'm working on feature X"
2. "File a bug ticket for someone else"
3. "Skip those tests for now"
4. "Continue with my feature, will fix later"

### Example 2: Security Vulnerability Discovered

**Scenario**: Agent runs security scan, discovers SQL injection vulnerability in legacy code.

**CORRECT Response** (Stop-and-Fix):
1. STOP current work immediately
2. Assess vulnerability severity and impact
3. Implement parameterized query to fix vulnerability
4. Add test to verify fix and prevent regression
5. Run full security scan to verify no other issues
6. Document fix in PR: "Stop-and-Fix: Eliminate SQL injection in user search (CVE reference)"
7. Resume original work

**INCORRECT Response** (Forbidden):
1. "That code is old, not my responsibility"
2. "Document in security.md and defer"
3. "Add a TODO comment to fix later"
4. "It's low severity, can skip for now"

### Example 3: Baseline Not GREEN

**Scenario**: Agent begins work, runs baseline tests, discovers 15 tests failing.

**CORRECT Response** (Stop-and-Fix):
1. DO NOT start assigned work yet
2. Investigate all 15 failing tests
3. Fix all 15 tests (or escalate if cannot)
4. Verify 100% GREEN baseline achieved
5. Document remediation: "Stop-and-Fix: Restored 100% GREEN baseline (15 tests repaired)"
6. NOW begin assigned work

**INCORRECT Response** (Forbidden):
1. "Those were already failing, I'll just add my feature"
2. "My feature doesn't touch those areas, safe to ignore"
3. "I'll fix them after I finish my feature"
4. "Baseline was already broken, not my fault"

### Example 4: Unresolvable Issue (Escalation)

**Scenario**: Agent discovers database corruption requiring DBA expertise.

**CORRECT Response** (Stop-and-Fix with Escalation):
1. STOP work immediately
2. Document issue: symptoms, investigation, evidence
3. Ensure data is in SAFE state (backups, read-only mode if needed)
4. Create escalation: "STOP-AND-FIX ESCALATION: Database corruption requires DBA intervention"
5. Provide full context: reproduction, investigation, current state
6. WAIT for CS2 guidance (do not proceed)

**INCORRECT Response** (Forbidden):
1. "Work around it by using different table"
2. "Document the corruption and continue"
3. "Hand off to next agent, let them deal with it"
4. "Try random fixes hoping one works"

---

## 8. Enforcement

### 8.1 Governance Gates

All PR merge gates enforce Stop-and-Fix requirements:
- **Test Gate**: No merge if ANY test fails
- **Lint Gate**: No merge if ANY linter error exists
- **Build Gate**: No merge if build fails
- **Security Gate**: No merge if vulnerabilities exist
- **Governance Gate**: No merge if governance violations exist

Gates are **confirmatory**—they verify Stop-and-Fix was followed, not substitute for it.

### 8.2 Human Review

Human reviewers MUST verify Stop-and-Fix compliance:
- Check PR for "Stop-and-Fix" sections documenting remediation
- Verify baseline was established and issues were resolved
- Confirm no technical debt was introduced
- Ensure audit trail is complete

### 8.3 Governance Violations

Violations of Stop-and-Fix doctrine are **critical governance failures**:
- Partial handovers → Reject PR, require complete remediation
- Deferred fixes → Reject PR, require immediate fix
- "Not my job" attitude → Agent training/correction required
- Repeated violations → Escalate to CS2 for systemic review

### 8.4 Learning and Improvement

Stop-and-Fix incidents feed continuous improvement:
- Frequent issues in same area → Governance gap, canonize prevention
- Tool/infrastructure issues → Platform improvement, automation opportunity
- Recurring patterns → Training need, documentation enhancement

---

## 9. Benefits

### 9.1 System Quality

- **Zero technical debt accumulation** across all repositories
- **Continuous quality improvement** through immediate remediation
- **Reduced cascading failures** from defects passing downstream
- **Predictable system state** at all times (always 100% GREEN)

### 9.2 Development Velocity

- **Faster debugging** (issues caught when context is fresh)
- **Reduced rework** (no "fix the fix" cycles)
- **Unblocked progress** (next agent inherits good state)
- **Fewer surprises** (no hidden technical debt bombs)

### 9.3 Governance Health

- **Enforced discipline** (quality is mandatory, not optional)
- **Clear responsibility** (everyone owns quality)
- **Audit transparency** (all actions documented)
- **Learning culture** (every fix improves the system)

### 9.4 Team Culture

- **Shared ownership** ("our code" not "their code")
- **Pride in craftsmanship** (always leaving things better)
- **Trust in handovers** (know previous work is solid)
- **Safety mindset** ("if you see it, you own it")

---

## 10. Analogies and Inspiration

### 10.1 Safety-Critical Industries

Stop-and-Fix is inspired by workplace safety practices:
- **Aviation**: "If you see it, tag it, fix it" (maintenance culture)
- **Manufacturing**: Andon cord (stop production line for quality issues)
- **Healthcare**: Universal precautions (everyone responsible for safety)
- **Nuclear**: Defense-in-depth (multiple quality layers, no pass-through)

**Key Insight**: In safety-critical systems, EVERYONE is responsible for safety—not just the person who created the hazard. Same applies to code quality.

### 10.2 "Broken Windows" Theory

Allowing small defects to persist signals that quality doesn't matter:
- One skipped test → "Skipping tests is okay" → Test debt proliferates
- One ignored warning → "Warnings are noise" → Errors get buried
- One "temporary" workaround → "Shortcuts are fine" → Technical debt compounds

Stop-and-Fix prevents the first broken window.

### 10.3 "Leave It Better Than You Found It"

Stop-and-Fix embodies the Boy Scout Rule:
- Don't just avoid making things worse
- Actively improve what you encounter
- Compound interest of continuous improvement
- Collective ownership of code quality

---

## 11. FAQ

**Q: What if fixing the issue takes longer than my original task?**
A: Fix it anyway. Preventing technical debt is ALWAYS more valuable than new features. If time is a concern, escalate to CS2 for prioritization guidance.

**Q: What if I don't understand the failing code?**
A: Investigate and learn. If truly beyond your expertise, document thoroughly and escalate. But first, make a genuine attempt to understand and fix.

**Q: What if the baseline was already broken when I started?**
A: Fix it. Stop-and-Fix applies to ALL issues you encounter, regardless of origin. Establish 100% GREEN baseline before starting your work.

**Q: What if there are 100+ failing tests?**
A: This is a systemic failure requiring escalation. Document the situation, ensure the system is in a safe state, and escalate to CS2 for guidance. Do NOT attempt to fix all 100 yourself if it will take days.

**Q: What if the fix requires changing architecture?**
A: Escalate. Architecture changes require FM/CS2 approval. Document the issue, explain why architecture change is needed, and wait for guidance.

**Q: What if I'm just investigating/researching?**
A: Stop-and-Fix still applies. If you discover issues during investigation, fix them before completing your research.

**Q: Can I defer a fix if it's "low priority"?**
A: No. Priority is irrelevant—if you see it, fix it. The whole point is to prevent prioritization debates that allow debt to accumulate.

**Q: What if CI is broken and I can't run tests locally?**
A: This is a blocker. CI must work. Escalate CI issues immediately—broken CI prevents all Stop-and-Fix validation.

---

## 12. Summary

**Stop-and-Fix in One Sentence:**
When you encounter ANY error, failure, debt, or violation during work, STOP immediately, FIX it completely, VERIFY 100% GREEN, DOCUMENT the remediation, and ONLY THEN continue.

**The Golden Rule:**
Every handover must be in a GOOD STATE (100% GREEN, zero debt, all gates passing) or escalated to CS2 with full context. No partial handovers, no deferred fixes, no exceptions.

**The Responsibility Principle:**
Quality is everyone's responsibility. "If you see it, you own it." No "not my job," no "file a bug," no "will fix later."

---

## Version History

**v1.0.0** (2026-01-23): Initial canonization as Tier-0 constitutional doctrine. Establishes zero tolerance for technical debt, universal responsibility for quality, immediate remediation requirement, and no partial handover principle. Integrates with BUILD_PHILOSOPHY.md, BYG_DOCTRINE.md, DEFECT_RESOLUTION_MAINTENANCE_CANON.md, ESCALATION_POLICY.md. Applies to all agents, all builders, all work, all repositories.

---

## Related Canon

- **BUILD_PHILOSOPHY.md** - 100% GREEN, Zero Test Debt
- **BYG_DOCTRINE.md** - One-Time Build, Compulsory Learning
- **DEFECT_RESOLUTION_MAINTENANCE_CANON.md** - Defect resolution standards
- **ESCALATION_POLICY.md** - Escalation triggers and paths
- **FAILURE_PROMOTION_RULE.md** - Learning from failures
- **FM_ROLE_CANON.md** - FM authority to halt execution
- **QA_POLICY_MASTER.md** - QA validation requirements
- **POLICY-NO-ONLY-LANGUAGE.md** - Minimizing language prohibition

---

**END OF DOCTRINE**
