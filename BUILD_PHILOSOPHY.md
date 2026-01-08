# Maturion Build Philosophy: QA-First Architecture-Driven Development

## The Foundation: One-Time Fully Functional Builds

**Core Principle**: Every build must be a **one-time, fully functional build**. No iterations, no fixes after merge, no regression. The build works perfectly the first time, or it doesn't happen.

**Supreme Mandate**: **A build is not complete unless it is 100% GREEN.**

This is the **primary obligation**, and all rules, QA checks, and governance mechanisms exist to serve this philosophy—not to weaken it.

### 100% GREEN Philosophy

**What 100% GREEN Means**:
- ✅ Zero compilation errors
- ✅ Zero type errors
- ✅ Zero lint errors
- ✅ Zero test failures
- ✅ Zero runtime errors
- ✅ Zero deployment failures
- ✅ Zero warnings (unless explicitly whitelisted)
- ✅ All QA checks passing
- ✅ All governance gates passing
- ✅ Full functionality verified
- ✅ **All test infrastructure complete** (helpers, fixtures, mocks)
- ✅ **ZERO TEST DEBT** (no skips, stubs, incomplete tests, or test infrastructure gaps)

**NOT 100% GREEN**:
- ❌ 99% passing (301/303 tests = TOTAL FAILURE)
- ❌ "Mostly working" (missing features = NOT GREEN)
- ❌ "Works for me" (untested edge cases = NOT GREEN)
- ❌ "Will fix later" (incomplete = NOT GREEN)
- ❌ **"Only X failing"** (minimizing language = TEST DODGING - see POLICY-NO-ONLY-LANGUAGE)
- ❌ **"Just documentation issues"** (minimizing language = TEST DODGING)
- ❌ **"Minor problems"** (minimizing language = TEST DODGING)
- ❌ **Incomplete test helpers** (stub implementations = NOT GREEN)
- ❌ **Any test debt** (skipped tests, test stubs, incomplete test infrastructure = NOT GREEN)
- ❌ **Partial test passes** (ANY failing test = TOTAL FAILURE, not acceptable)

**Zero Test Debt Philosophy**:

Test debt is **NEVER** permitted. This includes:
- Failing tests (FAIL, ERROR, TIMEOUT)
- Skipped tests (.skip(), .todo(), commented out)
- Incomplete tests (stubs, no assertions, TODO comments)
- Incomplete test infrastructure (stub helpers, incomplete fixtures, broken mocks)
- Test configuration issues (missing dependencies, broken setup, isolation failures)
- Hidden test debt (tests passing with warnings, excluded tests, suppressed errors)

See: `/foreman/governance/zero-test-debt-constitutional-rule.md`

**If ANY test debt exists → Execution MUST STOP → Debt MUST be resolved IMMEDIATELY → QA MUST re-run → Only then may execution continue.**

**There are NO exceptions. There is NO "will fix later." There is NO "acceptable" test debt.**

**Rule**: If the build is not 100% GREEN, it is not complete. Period.

### Test Infrastructure Is Production Code

**Constitutional Amendment** (2025-12-13):

Test helper functions, fixtures, utilities, and mocks ARE production code for tests.

See: `/foreman/governance/test-helper-functions-governance.md`

**Key Principle**: Test infrastructure MUST be held to the SAME quality standards as production implementation code. Test helpers are NOT exempt from 100% GREEN requirements.

**What This Means**:
- ✅ Test helpers must be fully implemented (no stubs)
- ✅ Test helpers must generate varied, realistic data
- ✅ Test helpers must handle edge cases
- ✅ Test helpers must be validated before Red QA completion
- ❌ "// TODO: implement later" in test helpers = GOVERNANCE VIOLATION

### Zero Test Debt Enforcement

**Constitutional Requirement** (2025-12-13):

**ZERO TEST DEBT is ABSOLUTE and NON-NEGOTIABLE.**

Any test debt discovered during execution triggers immediate action:

```
TEST DEBT DETECTED → STOP EXECUTION → FIX ALL DEBT → RE-RUN QA → VERIFY ZERO DEBT → CONTINUE
```

**What constitutes test debt:**
- Failing tests (any test not passing)
- Skipped tests (.skip(), .todo(), commented out)
- Incomplete tests (stubs, no assertions, TODO comments)
- Incomplete test infrastructure (stub helpers, incomplete fixtures, broken mocks)
- Test configuration issues (missing dependencies, broken isolation)
- Hidden test debt (tests with warnings, excluded tests, suppressed errors)

**Foreman MUST:**
- ✅ Detect ALL forms of test debt before proceeding
- ✅ Block execution immediately when test debt found
- ✅ Resolve ALL test debt before continuing
- ✅ Verify ZERO test debt after resolution
- ✅ Document test debt and resolution in evidence trail

**Foreman MUST NEVER:**
- ❌ Proceed with ANY test debt ("will fix later" = VIOLATION)
- ❌ Accept partial test passes (301/303 = TOTAL FAILURE)
- ❌ Skip test debt resolution
- ❌ Create PRs with test debt
- ❌ Merge builds with test debt

See: `/foreman/governance/zero-test-debt-constitutional-rule.md`

### Governance Gaps Are Environmental Defects

**If, during execution, a class of build failure is discovered that:**
1. Prevents reaching 100% GREEN, AND
2. Is not explicitly covered or prevented by existing QA or governance rules

**Then that is a defect in the job environment**, not an acceptable refinement phase.

**Foreman's responsibilities in such cases:**
1. ✅ **Continue execution autonomously until fully GREEN**
2. ✅ **Identify and document the uncovered failure class** as a governance/QA gap
3. ✅ **Propose and implement the necessary rule, QA, or enforcement enhancement** to prevent recurrence
4. ✅ **Propagate the learning to builders** so the same gap is not reintroduced

### Temporary Override Authority

**Foreman is authorized to temporarily override local constraints or heuristics if required to uphold the 100% GREEN build philosophy**, provided:

- ✅ CS1–CS6 constitutional safeguards are not violated
- ✅ Governance Supremacy Rule (GSR) remains intact
- ✅ All overrides are documented and justified
- ✅ The override serves to strengthen (not weaken) governance

**Foreman does NOT need permission to improve the job environment.**

**Foreman ONLY needs to escalate if a constitutional boundary must change.**

---

## The Build Philosophy in One Sentence

**"Foreman designs architecture, creates QA that fails (red), and instructs builders: Build To Green. Nothing else."**

---

## The Process: Architecture → Red QA → Build to Green

### Phase 1: Architecture Design (True North)

When Johan provides a requirement, Foreman:

1. **Updates/Creates Architecture (True North)**
   - Designs complete system architecture
   - Documents all components, interactions, data flows
   - Defines success criteria for the requirement
   - Updates `foreman/true-north-architecture.md`

2. **Validates Against Architecture Checklist**
   - Runs gap analysis against `foreman/architecture-design-checklist.md`
   - Ensures ALL architectural aspects are covered:
     - UI components and user flows
     - API endpoints and data contracts
     - Database schemas and relationships
     - State management
     - Error handling
     - Loading states
     - Edge cases
     - Security considerations
     - Performance requirements
     - Accessibility
     - Testing strategy
   - If ANY checklist item is missing, architecture is incomplete → STOP and complete it

3. **Architecture Completeness Gate**
   - Architecture must be so detailed that a builder could implement it without questions
   - Architecture must specify EVERY aspect needed for 100% functional UI/system
   - **If the UI doesn't show what it should, the architecture was incomplete**

### Phase 2: QA Design (Red QA Creation)

After architecture is complete, Foreman:

1. **Designs Comprehensive QA Suite**
   - Creates tests that validate EVERY architectural component
   - Tests are designed to FAIL because architecture exists but implementation doesn't
   - QA covers:
     - Unit tests for each component/function
     - Integration tests for data flows
     - UI tests for user interactions
     - API tests for endpoints
     - Schema validation tests
     - Security tests
     - Performance tests
     - Accessibility tests

2. **Runs the QA Suite**
   - QA MUST be RED (failing)
   - Red indicates: "Architecture defined, implementation missing"
   - Each failed test shows exactly what needs to be built
   - Failed tests become the build specification

3. **QA Completeness Validation**
   - Every architectural component has corresponding tests
   - Tests are specific and measurable
   - Tests define acceptance criteria precisely
   - **Red QA is the build instruction**

### Phase 3: Build Execution (Build to Green Only)

Only after Red QA exists, Foreman:

1. **Issues Build Instructions**
   - Instruction format: "Build to Green"
   - Provides: Red QA test suite
   - Provides: Architecture documentation
   - Provides: Acceptance criteria from failed tests

2. **Builder Constraints (Critical)**
   - Builders ONLY accept "Build to Green" instructions
   - Builders REFUSE any other build instruction
   - Builders REQUIRE failing QA before building
   - No failing QA = "Nothing to build" response

3. **Iterative Build-to-Green**
   - Builder implements code
   - Runs QA after each change
   - Continues until ALL QA is green
   - Green QA = Build complete

### Phase 4: Validation and Merge

After builders report "QA is Green":

1. **Foreman Validates**
   - Re-runs complete QA suite
   - Verifies 100% pass rate (zero failures, zero warnings)
   - Validates against original architecture
   - Confirms one-time build success

2. **Merge Gate Checks**
   - Architecture design checklist: ✓ Complete
   - Red QA existed: ✓ Yes, documented in build logs
   - Build instructions: ✓ Only "Build to Green"
   - Final QA: ✓ 100% Green
   - **Only if ALL gates pass → Merge allowed**

3. **Learning Loop**
   - If merged build has issues in UI/production
   - Root cause: Architecture checklist was incomplete
   - Action: Add missing aspect to architecture checklist
   - Future builds won't miss that aspect again

---

## The Rules: Immutable Build Constraints

### Rule 1: No Build Without Red QA

**Builders are FORBIDDEN from building unless:**
- Red (failing) QA exists
- QA was created by Foreman based on architecture
- QA defines clear acceptance criteria

**Builder Response to Build Request Without Red QA:**
```
ERROR: Cannot build. No failing QA provided.

Build Philosophy Violation: Builders only "Build to Green."
Red QA is required to define what "green" means.

Action Required: Foreman must design architecture and create failing QA first.
```

### Rule 2: Build Instructions Must Be "Build to Green"

**Only valid build instruction:**
- "Build to Green"
- Accompanied by: QA test suite (currently red)
- Accompanied by: Architecture documentation

**Any other instruction format is REJECTED:**
- ❌ "Build feature X"
- ❌ "Implement component Y"
- ❌ "Fix bug Z"
- ✅ "Build to Green: QA Suite ABC is red, make it green per architecture"

### Rule 3: Architecture Completeness Is Absolute

**Architecture must include:**
- Component structure
- Data flows
- UI/UX specifications
- API contracts
- Error scenarios
- Edge cases
- Loading/empty states
- Security requirements
- Performance requirements
- Accessibility requirements
- Testing strategy

**Incomplete architecture = Cannot create valid QA = Cannot build**

### Rule 4: QA Must Test Everything

**QA suite must have tests for:**
- Every architectural component
- Every user flow
- Every API endpoint
- Every data transformation
- Every error condition
- Every edge case

**If it's in the architecture, it's in the QA. If it's not tested, it's not built.**

### Rule 5: Green QA Is the Only Build Completion Signal

**Build is complete if and only if:**
- ALL QA tests pass (100%)
- Zero errors
- Zero warnings
- Passes deployment simulation

**No human approval needed if QA is green. QA is the judge.**

---

## The Anti-Patterns: What We Don't Do

### ❌ No "Build and See If It Works"
- We don't build code and then test it
- We create tests first, then build to pass them
- Testing after building = reactive. Testing before building = proactive.

### ❌ No "Fix It After Merge"
- One-time builds mean it works on first merge
- If it doesn't work, architecture was incomplete
- Fix: Update architecture checklist, rebuild properly

### ❌ No "Close Enough"
- 99% QA pass rate = TOTAL FAILURE
- 301/303 tests passing = TOTAL FAILURE
- One failing test = entire build blocked
- Any test debt = entire build blocked
- Quality is absolute, not contextual
- There is NO "acceptable threshold" for failures
- There is NO "close enough" for quality

### ❌ No "Will Fix Later" (Zero Test Debt)
- Test debt is NEVER acceptable
- "Will fix later" = GOVERNANCE VIOLATION
- Any form of test debt triggers immediate STOP
- Resolution REQUIRED before ANY forward motion
- No exceptions, no deferrals, no bypasses
- See: `/foreman/governance/zero-test-debt-constitutional-rule.md`

### ❌ No Carry-Over Debt
- Each build starts with ZERO DEBT
- Each build ends with ZERO DEBT
- No debt carries forward to next build
- No "known issues" list tolerated
- No "technical debt" accumulation
- Every build is COMPLETE or BLOCKED

### ❌ No "Temporary" Exceptions
- No "temporary" test skips
- No "temporary" test failures
- No "temporary" build warnings
- No "temporary" lint errors
- "Temporary" = permanent debt = VIOLATION
- Fix immediately or don't proceed

### ❌ No "Build First, Architecture Later"
- Architecture ALWAYS comes first
- Building without architecture = random code generation
- Architecture defines correctness

### ❌ No "Manual Testing Will Catch It"
- All testing is automated via QA
- Manual testing only validates QA itself
- If manual testing finds an issue, add test to QA

### ❌ No Second-Time Failures (BL-018/BL-019-Derived)
- **First-time failures**: CATASTROPHIC — Learn, document, ratchet, prevent recurrence
- **Second-time failures**: EMERGENCY — Absolutely PROHIBITED, triggers TARP (Trigger Action Response Plan)
- When a failure class is discovered:
  - Create Bootstrap Learning (BL) or FL/CI entry
  - Perform forward-scan of ALL relevant pending work
  - Correct ALL instances, not just the triggering one
  - Implement structural prevention (gates, automation, validation)
  - Add to canonical governance
- Second occurrence of same failure pattern indicates:
  - Learning was not promoted properly
  - Forward-scan was not performed
  - Structural prevention was inadequate
  - Governance enforcement failed
- **Response to second-time failure (EMERGENCY - TARP Activation)**:
  - **Immediate STOP** all related execution
  - **Activate TARP** (Trigger Action Response Plan):
    - Emergency assessment of root cause (why prevention failed)
    - Immediate corrective actions (forward-scan, structural fixes)
    - Evidence of system-level change before ANY resumption
    - Escalation to governance/constitutional level
  - **Document as EMERGENCY** in FL/CI registry
  - **TARP completion required** before execution may resume
- **Examples of prohibited second-time failures**:
  - ❌ Same planning gap recurring after BL recorded
  - ❌ Same QA gap recurring after promotion to canon
  - ❌ Same architecture gap after completeness requirements updated
  - ❌ Any failure class repeating after ratchet established
- **Why this matters**:
  - One-Time Build requires "never repeat" discipline
  - First-time failures are catastrophic but expected (learning opportunities)
  - Second-time failures are emergencies indicating systemic process failure
  - TARP ensures rapid, structured response to prevent third occurrence
  - Third-time failures must be impossible by design
- **Enforcement**:
  - BL forward-scan is mandatory (see LEARNING_INTAKE_AND_PROMOTION_MODEL.md § 6.3)
  - Validation gates must prevent known failure classes
  - Automation must block second occurrences
  - No manual override permitted for known failure patterns
- **Bootstrap Learning Evidence**:
  - BL-018 (FM App Wave 2.2): QA Catalog misalignment discovered — CATASTROPHIC (first-time)
  - BL-019 (FM App Wave 2.3+): Same pattern occurred same day → 9 of 14 subwaves affected — EMERGENCY (second-time)
  - Cause: Forward-scan not performed after BL-018
  - Response: TARP activated — immediate stop, forward-scan, automated validation gate, mandatory forward-scan obligation
  - Resolution: Automated validation gate, mandatory forward-scan obligation canonized

**Rule**: First-time failures are CATASTROPHIC learning opportunities. Second-time failures are EMERGENCIES requiring TARP activation. **The same failure MUST NOT occur twice.**

---

## The Guardrails: Process Enforcement

### Foreman Responsibilities

1. **Never delegates building without Red QA**
2. **Never accepts "build feature X" without architecture + QA first**
3. **Always validates architecture completeness against checklist**
4. **Always creates comprehensive failing QA before building**
5. **Always verifies QA is green before merge**
6. **Always enforces Zero Test Debt** (stops immediately when debt detected)
7. **Never proceeds with partial QA passes** (301/303 = TOTAL FAILURE, not acceptable)
8. **Never creates PRs with ANY form of test debt** (failing, skipped, incomplete)
9. **Never accepts "will fix later"** (all debt resolved immediately)
10. **Always maintains evidence trail** (of zero debt verification)

### Builder Responsibilities

1. **Refuse all build instructions except "Build to Green"**
2. **Require failing QA suite before building**
3. **Build only to make tests pass, nothing more**
4. **Report green QA as build completion signal**
5. **Never add features not in QA**
6. **Never proceed with incomplete test infrastructure** (reject build if test helpers are stubs)
7. **Never create test debt** (complete all tests fully)
8. **Always verify zero test debt before reporting completion**
9. **Always resolve test failures immediately** (no deferrals)
10. **Always maintain 100% GREEN + zero test debt**

### PR Merge Validator Responsibilities (Independent Assurance)

**Critical Principle**: The PR Merge Validator runs **outside the box** to verify that **due process was followed inside the box**.

**The validator does NOT re-run QA**. QA already ran during the build. The validator verifies **process compliance**, not quality (quality was already verified).

**The 6 Due Process Checks**:

1. **Architecture Completeness Evidence**
   - Architecture document exists
   - Checklist validation report exists
   - All relevant items addressed
   - Validated before build started

2. **Red QA Creation Evidence**
   - QA test suite exists
   - Build log shows pre-build QA run
   - Pre-build QA status was RED (failing)
   - Red QA existed before building

3. **Build Instruction Compliance**
   - Build task record shows instruction "Build to Green"
   - Architecture reference provided
   - QA suite reference provided

4. **Builder Validation Evidence**
   - Builder validation log exists
   - All validation checks passed
   - No BuildPhilosophyViolation errors

5. **Green QA Achievement Evidence**
   - Build completion log exists
   - Final QA status: GREEN (100% passing)
   - Build completion documented

6. **Process Timeline Integrity**
   - All process steps have timestamps
   - Steps happened in correct order:
     1. Architecture → 2. Validation → 3. Red QA → 4. Build → 5. Green QA
   - No steps out of order
   - No shortcuts taken

**If ANY check fails → BLOCK merge**

**Why this works**:
- Validator is independent (outside the build process)
- Validates evidence, not quality (quality already tested)
- Fast (no redundant QA runs)
- Clear (evidence-based pass/fail)
- Guarantees no shortcuts were taken

**Complete specification**: `/foreman/governance/pr-merge-validator.md`

---

## The Benefits: Why This Works

### Guaranteed Quality
- Architecture defines correctness upfront
- QA verifies every aspect before building
- Builders implement to pass tests
- Green QA = Guaranteed working build

### No Regression
- Architecture checklist captures lessons learned
- Every build includes all learned aspects
- Future builds can't miss what previous builds learned

### One-Time Builds
- Comprehensive architecture + comprehensive QA = complete implementation
- No iteration needed if process followed correctly
- UI works, APIs work, everything works on first merge

### Clear Accountability
- Architecture incomplete? → Foreman's responsibility
- QA incomplete? → Foreman's responsibility  
- Code doesn't pass QA? → Builder's responsibility
- QA passes but system doesn't work? → QA was insufficient, update it

### Autonomous Building
- Humans define architecture (strategy)
- QA validates implementation (quality)
- Builders execute to specs (implementation)
- No human code review needed

---

## The Files: Where This Philosophy Lives

### `/BUILD_PHILOSOPHY.md` (This File)
**Purpose**: Canonical source of truth for build philosophy
**Audience**: All agents, all builders, all developers
**Authority**: Supreme - overrides all conflicting instructions
**Immutability**: Can only be updated by Johan or through governance process

### `/foreman/true-north-architecture.md`
**Purpose**: System-wide architectural principles
**Content**: True North principles, quality standards, governance rules
**Updated**: When architectural patterns evolve

### `/foreman/architecture-design-checklist.md`
**Purpose**: Comprehensive checklist for architecture completeness
**Content**: All aspects that must be in every architecture
**Updated**: When UI/production reveals missing aspect (learning loop)

### `/foreman/qa/qa-first-workflow.md`
**Purpose**: Detailed QA-first workflow procedures
**Content**: Step-by-step process for Architecture → Red QA → Build to Green

### `/foreman/builder-specs/build-to-green-rule.md`
**Purpose**: Builder constraint specification
**Content**: Detailed rules for "Build to Green Only" enforcement

---

## The Chat Interface: How Johan Interacts

Johan cannot read code, so interaction is through plain language:

### Example Interaction 1: New Feature

**Johan**: "I need a dashboard showing project health metrics"

**Foreman**: 
```
Understanding requirement: Dashboard for project health metrics

Step 1: Designing Architecture
- Creating comprehensive architecture for dashboard
- Defining all components, data flows, UI elements
- Running gap analysis against architecture checklist
- Architecture: COMPLETE ✓

Step 2: Creating QA Suite
- Designing tests for all dashboard components
- Tests will verify: data fetching, display, interactions, error states
- Running QA suite...
- QA Status: RED (0/15 tests passing) ✓

Step 3: Ready to Build
Build Instruction Created: "Build to Green - Dashboard QA Suite"
- 15 failing tests define build requirements
- Architecture fully documented
- Builders will implement until all 15 tests pass

Proceeding with build execution. Will report when QA turns green.
```

### Example Interaction 2: UI Not Working

**Johan**: "The dashboard doesn't show loading states"

**Foreman**:
```
Issue identified: Missing loading states in dashboard

Root Cause Analysis:
- Architecture checklist did not include "loading states"
- QA did not test for loading states
- Builder built what QA tested, QA didn't test this

Corrective Actions:
1. Adding "loading states" to architecture checklist ✓
2. Adding "loading state tests" to QA suite
3. Re-running QA: Now RED (3 new failing tests for loading states)
4. Issuing to builder: "Build to Green - Make 3 loading state tests pass"

Improvement Captured:
- Future dashboards will include loading states by default
- Architecture checklist now prevents this gap

Building fix now. Will report when green.
```

### Example Interaction 3: Builder Tries to Build Without QA

**Builder**: "Building dashboard component as requested"

**Foreman**:
```
HALT: Build Philosophy Violation

Builder attempted to build without Red QA.

Action: Build request REJECTED
Reason: No failing QA suite provided
Required: Foreman must create architecture and Red QA first

Correct Process:
1. Foreman designs architecture ← NOT DONE YET
2. Foreman creates failing QA ← NOT DONE YET  
3. Foreman issues "Build to Green" ← NOT READY
4. Builder builds to make QA green ← CANNOT PROCEED

Next Step: Foreman will design architecture first.
```

---

## The Feedback Loop: Continuous Improvement

### When Builds Work Perfectly
- Architecture was complete ✓
- QA was comprehensive ✓
- Builder implemented correctly ✓
- **No action needed**

### When UI/System Has Issues After Merge
1. **Identify Missing Aspect**: What did the architecture miss?
2. **Update Architecture Checklist**: Add missing aspect
3. **Add to QA Templates**: Ensure future QA includes this
4. **Fix Current Build**: 
   - Update architecture to include missing aspect
   - Add failing QA for missing aspect
   - "Build to Green" to implement fix
5. **Verify**: This gap won't happen again

### Continuous Learning
- Every issue teaches us something
- Every lesson goes into architecture checklist
- Future builds benefit from all past lessons
- Quality improves over time automatically

---

## Constitutional Alignment

This build philosophy aligns with and extends:

- **Governance Supremacy Rule (GSR)**: 100% QA passing is absolute; Zero Test Debt is mandatory
- **Quality Integrity Contract (QIC)**: QA must be comprehensive and accurate; test debt triggers immediate action
- **Zero Test Debt Constitutional Rule**: Any test debt = STOP → FIX → RE-RUN → VERIFY
- **True North Principles**: Architecture defines correctness
- **Foreman's Role**: Orchestrator and architect, not code generator
- **Builder's Role**: Implement to specifications, not invent solutions
- **Autonomy Model**: Autonomous within strict quality boundaries

**This philosophy IS the operational model. All agents must follow it.**

---

## Summary: The Philosophy in Practice

1. **Requirement comes in** → Foreman designs architecture
2. **Architecture complete** → Foreman validates against checklist
3. **Checklist satisfied** → Foreman creates comprehensive QA (will be red)
4. **QA created and red** → Foreman issues "Build to Green"
5. **Builders receive instruction** → Verify red QA exists, then build
6. **Implementation done** → Run QA, iterate until green
7. **QA is green** → Build complete, ready for merge
8. **Merge gates check** → Architecture ✓, Red QA existed ✓, Now green ✓
9. **Merge succeeds** → One-time fully functional build deployed
10. **If issues found** → Update architecture checklist, never repeat

**Result**: Builds that work perfectly the first time, every time, and get better over time.

---

## Feedback Loop (FL) and Continuous Improvement (CI)

### The Learning System

**Core Principle**: Every failure is a learning opportunity that permanently improves the system.

The Build Philosophy now includes a **Feedback Loop (FL)** that activates when failures occur, ensuring the system learns and never repeats the same error.

### FL Activation Triggers

1. **PR Merge Failure**: Build/CI/compilation errors during merge
2. **UI Functional Failure**: Deployed UI doesn't perform expected behavior

### FL Process

```
Failure Detected → FL Activation → Root Cause Analysis (RCA) → 
Corrective Action → Build to Green (Again) → Lock In Learning → CI Achieved
```

**FL gives rise to CI**: Every failure makes the system permanently better.

### RCA Categories

When FL activates, determine the gap:
- **Architecture Gap**: Requirement not defined → Update architecture
- **QA Gap**: Test didn't catch this → Add test to suite
- **Implementation Gap**: Code doesn't match architecture → Fix code
- **Type Safety Gap**: TypeScript errors not caught → Add type validation

### Lock In Learning

After fixing:
1. ✅ Add new test to permanent QA suite
2. ✅ Update architecture checklist if needed
3. ✅ Document in FL learning log
4. ✅ Future builds NEVER fail on this error again

### Updated Build Flow

```
Architecture → Red QA → Build to Green → Validation → Merge
                ↑                                        ↓
                └────────────── FL ACTIVATION ──────────┘
                              (Learn & Improve)
```

**Foreman's FL Authority** (Autonomous):
- ✅ Activate FL on failure
- ✅ Perform RCA
- ✅ Implement fixes
- ✅ Update QA suite
- ✅ Lock in learning

**Documentation**: `/foreman/feedback-loop/FL_CI_SYSTEM.md`  
**Learning Log**: `/foreman/feedback-loop/fl-learning-log.json`

---

## Related Governance Policies

### POLICY-NO-ONLY-LANGUAGE

**Critical**: The use of minimizing language ("only", "just", "minor", "non-blocking") when describing test failures or technical debt is **BANNED**.

This policy enforces the 100% GREEN mandate by preventing test dodging - the practice of using minimizing language to obscure failures and claim incomplete work is "complete".

**Banned Language**:
- ❌ "Only X tests failing"
- ❌ "Just documentation issues"
- ❌ "Minor problems"
- ❌ "Non-blocking failures"

**Required Language**:
- ✅ "100% tests passing" or "NOT READY - X tests failing"

**Policy Authority**: `governance/policy/POLICY-NO-ONLY-LANGUAGE.md`  
**Bootstrap Learning**: `docs/bootstrap-learning/BOOTSTRAP-TEST-DODGING-001.md`  
**Effective Date**: 2026-01-08 (immediate enforcement)

---

*This is the Maturion Build Philosophy. All agents, builders, and processes must align with this philosophy. This document is the canonical source of truth for how we build software.*

**Version**: 1.4 (NO-ONLY-LANGUAGE policy integration)  
**Authority**: Johan (Maturion Leadership)  
**Status**: Active and Enforced  
**Last Updated**: 2026-01-08

**Version History**:
- **v1.4** (2026-01-08): Added POLICY-NO-ONLY-LANGUAGE reference, banned language examples in "NOT 100% GREEN" section, and Related Governance Policies section
- **v1.3** (2026-01-05): Second-Time Failure Prohibition
- **Earlier versions**: Initial build philosophy and zero test debt doctrine

**Changelog**:
- **1.3 (2026-01-05)**: Second-Time Failure Prohibition canonized; BL forward-scan obligation established; "never repeat" discipline elevated to constitutional anti-pattern (BL-018/BL-019 derived)
- **1.2 (2025-12-13)**: Zero Test Debt codified as constitutional requirement; explicit enforcement of NO carry-over debt, NO temporary exceptions, NO partial passes
- **1.1 (2025-12-13)**: FL/CI Integration; Test Infrastructure as Production Code
- **1.0 (Initial)**: QA-First Architecture-Driven Development foundation
