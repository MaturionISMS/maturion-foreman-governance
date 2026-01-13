# AGENT TEST EXECUTION PROTOCOL
## CI-Confirmatory-Not-Diagnostic Implementation

## Status
**Type**: Canonical Governance Runbook — Mandatory Enforcement  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-13  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to CI_CONFIRMATORY_NOT_DIAGNOSTIC.md, EXECUTION_BOOTSTRAP_PROTOCOL.md  
**Applies To**: All application repositories with test suites  
**Related Canon**: CI_CONFIRMATORY_NOT_DIAGNOSTIC.md, EXECUTION_BOOTSTRAP_PROTOCOL.md, BUILD_PHILOSOPHY.md  
**Bootstrap Context**: Addresses merge gate failures post-handover pattern

---

## 1. Purpose and Scope

### 1.1 Purpose

This protocol establishes **mandatory test execution in agent environment before PR creation** to enforce CI-Confirmatory-Not-Diagnostic doctrine.

**Problem Addressed**: PRs are created before agents run tests in their environment. CI runs tests for the first time during merge gate evaluation, which means test failures are often only discovered after handover.

**Impact Without This Protocol**:
- Merge gates fail after agent handover (too late)
- Human time wasted on post-handover failures
- Build-to-Green discipline violated
- CI serves as diagnosis, not confirmation

**Solution**: Agents must run tests in agent environment **before** PR creation, verify GREEN test state locally, include test execution results in PREHANDOVER_PROOF, and only then create PR. CI serves as confirmation—not discovery.

### 1.2 Scope

This protocol applies to:

**MUST Apply To**:
- ✅ All application repositories with automated test suites
- ✅ All builder agents making code changes
- ✅ All FM agents orchestrating builders
- ✅ All PRs containing code changes that have associated tests
- ✅ All test types: unit, integration, E2E, component

**MAY Apply To** (recommended but not mandatory):
- Documentation changes that include code examples
- Infrastructure changes with validation tests
- Configuration changes with smoke tests

**NOT Required For**:
- Pure documentation changes without executable code
- Governance artifact updates in governance-only repositories
- Emergency hotfixes (with explicit Maturion authorization and incident documentation)

### 1.3 Constitutional Mandate

This protocol derives authority from and operationalizes:
- **CI_CONFIRMATORY_NOT_DIAGNOSTIC.md** — CI confirms preflight success, does not discover failures
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** — Execution verification mandatory before handover
- **BUILD_PHILOSOPHY.md** — One-Time Build Law, 100% GREEN mandate
- **PR_GATE_PRECONDITION_RULE.md** — No green gate, no handover

---

## 2. Agent Test Environment Requirements

### 2.1 Environment Parity Obligation

Agents MUST execute tests in an environment that **reasonably approximates** the CI test environment.

**Reasonable Approximation** means:
- ✅ Same major runtime version (e.g., Node 18.x if CI uses Node 18.x)
- ✅ Same package manager (npm, pip, cargo, etc.)
- ✅ Same test runner (Jest, pytest, RSpec, etc.)
- ✅ Required environment variables defined
- ✅ Required dependencies installed
- ✅ Database/external services mocked or available as needed

**NOT Required**:
- ❌ Identical minor/patch versions (18.15.0 vs 18.16.0 acceptable)
- ❌ Identical OS (local macOS vs CI Ubuntu acceptable if tests are portable)
- ❌ Identical hardware/performance characteristics

**Rationale**: Perfect parity impossible; reasonable approximation sufficient to catch most failures before handover.

### 2.2 Environment Discovery and Documentation

Before first test execution, agents MUST:

1. **Identify runtime requirements** from repository documentation:
   - Check `README.md`, `CONTRIBUTING.md`, `architecture/README.md`
   - Check package manager files (`package.json`, `requirements.txt`, `Cargo.toml`, etc.)
   - Check CI workflow files (`.github/workflows/**`) for runtime versions

2. **Document environment setup** if not already documented:
   - Runtime version and installation method
   - Package manager and version
   - Required global tools
   - Environment variables required
   - Database/service setup instructions
   - Test command(s)

3. **Store environment documentation** in repository-appropriate location:
   - Application repos: `architecture/TEST_ENVIRONMENT_SETUP.md` or similar
   - Update existing setup documentation if present

4. **Include environment details in PREHANDOVER_PROOF**:
   - Runtime version used
   - Package manager version
   - Test runner version
   - Environment variables set (sanitized, no secrets)

### 2.3 Environment Mismatch Handling

If agent cannot create reasonable approximation of CI environment:

**Agent MUST**:
- ✅ Document the environment gap with specific details
- ✅ Escalate to FM (if builder) or Governance Administrator (if FM/other)
- ✅ Request repository documentation updates or CI environment clarification
- ✅ HALT until environment gap resolved

**Agent MUST NOT**:
- ❌ Proceed without test execution ("environment too different")
- ❌ Skip test execution and rely on CI
- ❌ Assume tests will pass in CI if cannot run locally

**Exception Process**: See Section 6 (Exceptions/Overrides)

---

## 3. Test Execution Procedure

This procedure MUST be followed for every PR containing code changes with associated tests.

### 3.1 Pre-Execution Validation

**Before running tests, agent MUST verify**:

```bash
# Step 1: Verify runtime available
$ node --version  # or python --version, cargo --version, etc.
v18.18.0

# Step 2: Verify package manager available
$ npm --version  # or pip --version, cargo --version, etc.
9.8.1

# Step 3: Verify dependencies installed (or install them)
$ npm install  # or pip install -r requirements.txt, cargo build, etc.
[Installation output]
Exit code: 0

# Step 4: Verify test runner available
$ npm test -- --version  # or pytest --version, cargo test --version, etc.
Jest v29.5.0

# Step 5: Verify required environment variables set (if any)
$ echo "DATABASE_URL=$DATABASE_URL"  # Example, sanitize output
DATABASE_URL=postgresql://localhost:5432/test_db

# Step 6: Verify database/services available (if required)
$ pg_isready  # Example for PostgreSQL
/var/run/postgresql:5432 - accepting connections
Exit code: 0
```

**Validation Criteria**:
- ✅ All exit codes must be 0
- ✅ All required tools present and correct versions
- ✅ All dependencies installed successfully
- ✅ All required services available (or properly mocked)

**If validation fails**:
- Document specific failure (tool missing, version wrong, dependency conflict)
- Resolve issue before proceeding
- Capture resolution steps for documentation
- Re-run validation until all checks pass

### 3.2 Test Execution Command

**Agent MUST execute the exact test command used by CI** (or as close as possible).

**Command Discovery Process**:

1. **Check CI workflow files** (`.github/workflows/**`) for test commands:
   ```yaml
   # Example from CI workflow
   - name: Run tests
     run: npm test
   ```

2. **Check repository documentation** (`README.md`, `CONTRIBUTING.md`, `architecture/**`)

3. **Check package manager configuration** (`package.json` scripts, `Makefile` targets, etc.)

4. **Ask FM or repository owner** if test command unclear

**Common Test Commands by Ecosystem**:
- **Node.js**: `npm test`, `npm run test:unit`, `npm run test:integration`
- **Python**: `pytest`, `python -m pytest`, `pytest tests/`
- **Rust**: `cargo test`
- **Ruby**: `bundle exec rspec`
- **Go**: `go test ./...`
- **Java**: `mvn test`, `gradle test`
- **.NET**: `dotnet test`

**Execute Test Command**:

```bash
# Step 7: Run tests
$ npm test
[Test output - all tests]
Exit code: 0  # MUST be 0 for GREEN state
```

### 3.3 Capturing and Validating Output

**Agent MUST capture**:

1. **Complete command executed** (exactly as typed)
2. **Test execution output** (full output or summary)
3. **Exit code** (MUST be 0 for GREEN)
4. **Execution timestamp**
5. **Number of tests run**
6. **Number of tests passed**
7. **Number of tests failed** (MUST be 0 for GREEN)
8. **Execution duration** (optional but recommended)

**Example Output Capture**:

```bash
$ npm test

> office-app@1.0.0 test
> jest

 PASS  src/components/Dashboard.test.tsx
 PASS  src/services/api.test.ts
 PASS  src/utils/validators.test.ts
 PASS  src/pages/Home.test.tsx

Test Suites: 4 passed, 4 total
Tests:       42 passed, 42 total
Snapshots:   0 total
Time:        8.342 s
Ran all test suites.

Exit code: 0
Execution timestamp: 2026-01-13 10:30:45 UTC
```

**GREEN State Validation Criteria**:

✅ **Test state is GREEN if and only if**:
- Exit code is 0
- All tests passed (no failures, no errors)
- No test suites skipped (unless explicitly intended)
- Test runner completed successfully (no crashes)

❌ **Test state is NOT GREEN if**:
- Exit code is non-zero
- Any tests failed
- Any tests errored
- Test runner crashed or timed out
- Tests were skipped unintentionally

### 3.4 Handling Failures

**If tests fail locally (exit code non-zero or failures present)**:

**Agent MUST**:
1. ✅ **Fix the failures immediately** — This is agent's responsibility
2. ✅ **Re-run tests** to verify fix
3. ✅ **Iterate until GREEN** — No handover until all tests pass
4. ✅ **Document iterations** in commit messages ("Fix test failure in Dashboard component")
5. ✅ **Include final GREEN test run** in PREHANDOVER_PROOF

**Agent MUST NOT**:
- ❌ Create PR with failing tests ("CI will show us what's wrong")
- ❌ Skip failing tests to achieve GREEN
- ❌ Mock/stub failing tests to hide failures
- ❌ Assume CI will pass when local tests fail
- ❌ Request PR review before achieving GREEN

**If Unable to Fix Failures**:
- Document specific failures with error messages
- Escalate to FM (if builder) or Maturion (if FM)
- Request guidance on fix approach
- Do NOT hand over until failures resolved

### 3.5 No Handover Until GREEN

**Prohibition**: Agent MUST NOT create PR or hand over work until test state is GREEN locally.

**Handover Precondition**:
- ✅ Tests executed in agent environment
- ✅ Test execution completed successfully (exit code 0)
- ✅ All tests passed (no failures, no errors)
- ✅ Test output captured
- ✅ Evidence included in PREHANDOVER_PROOF

**Handover Guarantee**: "I guarantee all tests passed locally before PR creation. CI will confirm success, not discover failures."

**Escalation**: If unable to achieve GREEN after reasonable effort:
- Document specific blockers
- Escalate per escalation protocol (Section 6.3)
- Do NOT bypass by creating PR anyway

---

## 4. PREHANDOVER_PROOF Evidence Requirements

### 4.1 Required Fields for Test Execution Evidence

Every PR with code changes MUST include test execution evidence in PREHANDOVER_PROOF with these fields:

#### Field 1: Test Command Executed

**Requirement**: Exact command used to run tests

**Example**:
```markdown
**Test Command**: `npm test`
```

#### Field 2: Execution Date and Environment

**Requirement**: Timestamp and environment details

**Example**:
```markdown
**Execution Date**: 2026-01-13 10:30:45 UTC  
**Environment**: 
- OS: Ubuntu 22.04
- Runtime: Node.js v18.18.0
- Package Manager: npm 9.8.1
- Test Runner: Jest v29.5.0
```

#### Field 3: Exit Code

**Requirement**: Test command exit code (MUST be 0)

**Example**:
```markdown
**Exit Code**: 0 (SUCCESS)
```

#### Field 4: Test Execution Summary

**Requirement**: High-level summary of test results

**Example**:
```markdown
**Test Summary**:
- Test Suites: 4 passed, 4 total
- Tests: 42 passed, 42 total
- Duration: 8.342s
- Status: ✅ ALL GREEN
```

#### Field 5: Test Output (Full or Abbreviated)

**Requirement**: Test execution output showing all tests passed

**Options**:
- **Full output**: Include complete test runner output (preferred for short runs)
- **Abbreviated output**: Include summary + list of test files (acceptable for long runs)
- **Link to output**: Attach full output as file if extremely long (rare)

**Example (Abbreviated)**:
```markdown
**Test Output**:
```
$ npm test

> office-app@1.0.0 test
> jest

 PASS  src/components/Dashboard.test.tsx (42 tests)
 PASS  src/services/api.test.ts (15 tests)
 PASS  src/utils/validators.test.ts (8 tests)
 PASS  src/pages/Home.test.tsx (12 tests)

Test Suites: 4 passed, 4 total
Tests: 77 passed, 77 total
Time: 8.342 s

Exit code: 0
```
```

### 4.2 PREHANDOVER_PROOF Template Section

Add this section to existing PREHANDOVER_PROOF template:

```markdown
---

### Test Execution Validation

**Requirement**: All tests must pass in agent environment before PR creation

**Test Command Executed**:
```
[Exact command used to run tests]
```

**Execution Details**:
- **Date**: [YYYY-MM-DD HH:MM:SS UTC]
- **Environment**: [OS, Runtime version, Package manager, Test runner]
- **Exit Code**: [0 = SUCCESS, non-zero = FAILURE]

**Test Results Summary**:
```
[Test execution output showing all tests passed]
[Include: test suites passed/total, tests passed/total, duration, final status]
```

**Status**: ✅ ALL GREEN | ❌ FAILURES PRESENT

**Iterations** (if any):
- [Describe any test failures encountered and how they were resolved]
- [Include "All tests GREEN on final run" confirmation]

**Guarantee**: All tests passed locally before PR creation. CI will confirm success, not discover test failures.
```

### 4.3 Complete PREHANDOVER_PROOF Example with Tests

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Add user dashboard component with real-time updates

**Verification**:
```
$ ls -la src/components/Dashboard.tsx src/components/Dashboard.test.tsx
-rw-r--r-- 1 user group  3421 Jan 13 10:15 src/components/Dashboard.tsx
-rw-r--r-- 1 user group  2156 Jan 13 10:20 src/components/Dashboard.test.tsx
```

**Status**: ✅ VERIFIED

---

### Test Execution Validation

**Requirement**: All tests must pass in agent environment before PR creation

**Test Command Executed**:
```
npm test
```

**Execution Details**:
- **Date**: 2026-01-13 10:30:45 UTC
- **Environment**: Ubuntu 22.04, Node.js v18.18.0, npm 9.8.1, Jest v29.5.0
- **Exit Code**: 0 (SUCCESS)

**Test Results Summary**:
```
$ npm test

> office-app@1.0.0 test
> jest

 PASS  src/components/Dashboard.test.tsx
   Dashboard Component
     ✓ renders without crashing (45 ms)
     ✓ displays user name correctly (12 ms)
     ✓ updates data on real-time event (89 ms)
     ✓ handles loading state (23 ms)
     ✓ handles error state (31 ms)

 PASS  src/services/api.test.ts
   API Service
     ✓ fetches user data (67 ms)
     ✓ handles network errors (45 ms)
     [... 8 more tests ...]

 PASS  src/utils/validators.test.ts
   Validators
     ✓ validates email format (5 ms)
     ✓ validates phone format (4 ms)
     [... 6 more tests ...]

Test Suites: 3 passed, 3 total
Tests: 23 passed, 23 total
Snapshots: 0 total
Time: 8.342 s
Ran all test suites.

Exit code: 0
```

**Status**: ✅ ALL GREEN

**Iterations**:
- Initial run: 1 test failed in Dashboard.test.tsx (incorrect mock data)
- Fixed mock data structure to match API contract
- Second run: All tests passed (exit code 0)

**Guarantee**: All 23 tests passed locally before PR creation. CI will confirm success, not discover test failures.

---

### Preflight Gate Status

**Gates Triggered by This PR**:

1. **Test Suite Execution Gate** — ✅ PASS
   - Validation method: Ran tests locally with `npm test`
   - Evidence: Exit code 0, all 23 tests passed (see Test Execution Validation above)

2. **Build Effectiveness Validation Gate** — ✅ PASS
   - Validation method: Verified BUILD_ACTIVE present, effectiveness tracked
   - Evidence: architecture/BUILD_ACTIVE exists, wave status recorded

[... additional gates ...]

**Summary**: All applicable gates GREEN before handover.

---

### Execution Timestamp

**Validation Performed**: 2026-01-13 10:35:00 UTC  
**Environment**: Ubuntu 22.04, Node.js v18.18.0  
**Validator**: dashboard-builder agent

---

### Handover Guarantee

**I guarantee**:
- ✅ All artifacts exist and are functional
- ✅ All tests passed locally (23/23 passed, exit code 0)
- ✅ All applicable gates validated in preflight
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Environment difference between local and CI (document for next time), OR
- CI test configuration differs from local (governance defect), OR
- Incomplete test coverage (missed test case)

**Root Cause Commitment**: If CI test failures occur, I will perform RCA to determine cause and document in incident report if systemic.
```

---

## 5. Failure Scenarios and Remediation

### 5.1 Scenario: Tests Fail Locally Before First PR

**Situation**: Agent runs tests, tests fail, agent has not yet created PR.

**Correct Response**:
1. ✅ Investigate test failures (read error messages, check test code)
2. ✅ Fix failures (correct implementation, update tests if needed)
3. ✅ Re-run tests until GREEN
4. ✅ Document iterations in commits
5. ✅ Include final GREEN run in PREHANDOVER_PROOF
6. ✅ Create PR with GREEN test evidence

**Incorrect Response**:
- ❌ Create PR with failing tests ("let's see what CI says")
- ❌ Skip failing tests to achieve GREEN artificially
- ❌ Ignore test failures and proceed to handover

**Outcome**: Agent achieves GREEN locally, hands over with confidence, CI confirms success.

### 5.2 Scenario: Agent Environment Insufficient to Run Tests

**Situation**: Agent cannot install runtime, dependencies, or required services.

**Correct Response**:
1. ✅ Document specific environment gap:
   - What is missing (tool, service, dependency)
   - What is required (version, configuration)
   - Why cannot be installed locally (constraints, access, cost)
2. ✅ Escalate to FM (if builder) or Governance Administrator (if FM/other)
3. ✅ Request one of:
   - Repository documentation update (clarify test environment setup)
   - Alternative test execution method (Docker container, cloud environment)
   - Exception authorization (see Section 6)
4. ✅ HALT execution until resolution

**Incorrect Response**:
- ❌ Proceed without running tests ("environment too hard to set up")
- ❌ Assume tests will pass in CI
- ❌ Create PR without test evidence

**Outcome**: Environment gap documented, resolution path identified, no bypass of test execution requirement.

### 5.3 Scenario: Tests Pass Locally But Fail in CI

**Situation**: Agent includes GREEN test evidence in PREHANDOVER_PROOF, but CI test gate fails.

**Correct Response**:
1. ✅ Perform Root Cause Analysis:
   - Compare local and CI environments (runtime versions, dependencies, environment variables)
   - Check for environment-specific test failures (timing, resources, external dependencies)
   - Review CI logs for specific failure details
2. ✅ Classify failure cause:
   - **Environment Difference**: Document difference, update test environment setup guide
   - **Test Flakiness**: Fix flaky tests (remove timing dependencies, improve mocking)
   - **Missed Test Case**: Add missing test case to local test suite
   - **CI Configuration Issue**: Escalate as governance defect
3. ✅ Fix identified issue
4. ✅ Re-run tests locally to verify fix
5. ✅ Update PR with fix and updated PREHANDOVER_PROOF
6. ✅ Document learning in incident report if systemic pattern

**Incorrect Response**:
- ❌ Blame CI ("local tests passed, CI is wrong")
- ❌ Disable failing CI test to force pass
- ❌ Merge despite CI failure
- ❌ Skip RCA and repeat same failure on next PR

**Outcome**: Environment parity improved, test suite more robust, learning captured for future PRs.

### 5.4 Scenario: Test Execution Takes Extremely Long

**Situation**: Full test suite takes 30+ minutes to run locally, impractical for every PR.

**Correct Response**:
1. ✅ Run relevant subset of tests:
   - Unit tests for changed modules
   - Integration tests for affected components
   - Smoke tests for critical paths
2. ✅ Document subset rationale in PREHANDOVER_PROOF:
   - "Ran unit tests for Dashboard component (23 tests) and related integration tests (8 tests)"
   - "Full test suite runs in CI (expected duration: 35 minutes)"
   - "Subset execution time: 2 minutes, all passed"
3. ✅ Include evidence of subset execution
4. ✅ Guarantee: "Relevant tests passed locally, full suite will run in CI"
5. ✅ Optional: Run full suite overnight or in background, update PR if failures found

**Incorrect Response**:
- ❌ Skip all tests ("too slow to run")
- ❌ Run zero tests and claim full suite passed
- ❌ Disable slow tests permanently to speed up execution

**Outcome**: Reasonable balance between test coverage and execution time, relevant tests validated locally, full validation in CI.

### 5.5 Scenario: New Feature Has No Tests Yet

**Situation**: Agent adds new feature, no tests exist yet, plans to add tests in follow-up PR.

**Correct Response**:
1. ✅ Add tests in the same PR as the feature (strongly preferred)
2. ✅ If tests truly cannot be added yet (missing test infrastructure):
   - Document explicitly in PREHANDOVER_PROOF: "No tests exist for this feature yet"
   - Explain why tests not included (e.g., "Test framework being set up in parallel PR")
   - Commit to adding tests (e.g., "Tests will be added in PR #XXX within 2 days")
   - Include feature validation evidence (manual testing, screenshots, logs)
3. ✅ Escalate if no-test pattern becomes frequent (indicates systemic test gap)

**Incorrect Response**:
- ❌ Silently merge feature without tests or explanation
- ❌ Claim "tests passed" when no tests exist
- ❌ Defer tests indefinitely ("we'll add tests later")

**Outcome**: Explicit acknowledgment of test gap, commitment to add tests, awareness of technical debt.

---

## 6. Exceptions and Overrides

### 6.1 Exception Categories

This protocol recognizes three exception categories:

#### 6.1.1 Environment Impossibility Exception

**Definition**: Agent genuinely cannot create test environment approximation.

**Examples**:
- Tests require proprietary hardware not available to agent
- Tests require cloud resources with significant cost
- Tests require credentials/access agent cannot obtain
- Tests require OS agent cannot access (e.g., Windows-only tests on macOS agent)

**Authorization**: FM (for builders) or Governance Administrator (for FM/other)

**Requirements**:
- Must document specific impossibility with evidence
- Must propose alternative validation (manual testing, staging deployment, pair review)
- Must include explicit exception acknowledgment in PREHANDOVER_PROOF

#### 6.1.2 Emergency Hotfix Exception

**Definition**: Critical production issue requires immediate fix without full test execution.

**Examples**:
- Security vulnerability requiring immediate patch
- Production outage requiring urgent fix
- Data loss scenario requiring emergency intervention

**Authorization**: Maturion (Johan in bootstrap) ONLY

**Requirements**:
- Must document emergency justification
- Must include incident report reference
- Must commit to retroactive test execution within 24 hours
- Must include explicit emergency exception in PREHANDOVER_PROOF

#### 6.1.3 Test Infrastructure Gap Exception

**Definition**: Repository lacks test infrastructure, agent is working to establish it.

**Examples**:
- New repository with no test framework yet
- Test framework migration in progress
- Test infrastructure broken by external factor

**Authorization**: FM (for builders) or Governance Administrator (for FM/other)

**Requirements**:
- Must document infrastructure gap
- Must include plan to establish test infrastructure (timeline, approach)
- Must commit to adding tests once infrastructure ready
- Must include explicit gap acknowledgment in PREHANDOVER_PROOF

### 6.2 Exception Documentation Requirements

All exceptions MUST include this section in PREHANDOVER_PROOF:

```markdown
---

### Test Execution Exception

**Exception Category**: [Environment Impossibility | Emergency Hotfix | Test Infrastructure Gap]

**Justification**:
[Detailed explanation of why test execution protocol cannot be followed]

**Evidence of Exception Validity**:
[Proof that exception is genuine, not convenience]

**Alternative Validation Performed**:
[What validation was done instead of automated test execution]

**Authorization**:
- **Authorized By**: [FM name/Maturion name]
- **Authorization Date**: [YYYY-MM-DD]
- **Authorization Evidence**: [Link to approval comment/message]

**Remediation Plan**:
[How will test execution be achieved in future]
[Timeline for remediation]

**Risk Acknowledgment**: I acknowledge that CI will serve as primary test validation for this PR due to documented exception. If CI test failures occur, I commit to full RCA and remediation.
```

### 6.3 Exception Escalation Process

**If agent believes exception is warranted**:

1. ✅ **Document exception case** with specific details
2. ✅ **Request authorization** from appropriate authority:
   - Builder → FM
   - FM → Governance Administrator
   - Governance Administrator → Maturion
   - Emergency → Maturion directly
3. ✅ **Wait for explicit authorization** before proceeding
4. ✅ **Include authorization evidence** in PREHANDOVER_PROOF
5. ✅ **Propose remediation plan** (how to avoid exception in future)

**Agent MUST NOT**:
- ❌ Self-authorize exceptions
- ❌ Assume exception is acceptable without authorization
- ❌ Proceed with PR creation before authorization received
- ❌ Use exception as regular practice (exceptions are rare)

**Escalation Paths**:
- Builder → FM (via PR comment or direct message)
- FM → Governance Administrator (via governance repo issue)
- Governance Administrator → Maturion (via governance escalation protocol)

### 6.4 Exception Monitoring and Review

**Governance Administrator MUST**:
- ✅ Track all test execution exceptions (monthly report)
- ✅ Identify patterns indicating systemic issues
- ✅ Escalate frequent exceptions as governance defect
- ✅ Recommend protocol adjustments if exception rate high

**Exception Rate Thresholds**:
- **Acceptable**: <5% of PRs use exceptions
- **Warning**: 5-10% of PRs use exceptions (investigate patterns)
- **Critical**: >10% of PRs use exceptions (protocol may be impractical)

---

## 7. Integration with Governance Canon

### 7.1 Updates to EXECUTION_BOOTSTRAP_PROTOCOL.md

**Integration Point**: Step 3 (Execute/Verify Locally) in 7-Step Protocol

**Required Addition**:

> ### Step 3: Execute/Verify Locally
> 
> **For Application Repositories with Tests**:
> 
> In addition to standard execution verification, **test execution is mandatory** per `AGENT_TEST_EXECUTION_PROTOCOL.md`:
> 
> 1. ✅ Run test suite in agent environment
> 2. ✅ Achieve GREEN test state (exit code 0, all tests passed)
> 3. ✅ Capture test execution output
> 4. ✅ Include test evidence in PREHANDOVER_PROOF
> 5. ✅ Do NOT create PR until tests GREEN locally
> 
> **Reference**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`

### 7.2 Updates to PREHANDOVER_PROOF_TEMPLATE.md

**Integration Point**: After "Execution Validation" section

**Required Addition**: Test Execution Validation section (see Section 4.2)

### 7.3 Updates to AGENT_FILE_SCHEMA (.agent.schema.md)

**Integration Point**: `capabilities` section

**Required Addition**:

```yaml
capabilities:
  test_execution:
    enabled: [true|false]
    test_command: [string]  # Command used to run tests
    test_environment:
      runtime: [string]      # Runtime and version
      test_runner: [string]  # Test runner and version
      dependencies_command: [string]  # Command to install dependencies
    documentation_path: [string]  # Path to test environment setup docs
```

**Mandatory for Application Repos**: If repository has tests, `test_execution.enabled` MUST be `true`.

### 7.4 Updates to AGENT_FILE_BINDING_REQUIREMENTS.md

**Integration Point**: Section 3.1 (Application Repositories)

**Required Addition**:

> #### AGENT_TEST_EXECUTION_PROTOCOL.md
> 
> **Binding ID**: `agent-test-execution-protocol`  
> **Path**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`  
> **Role**: `test-execution-before-handover`
> 
> **Why Mandatory**: Enforces CI-Confirmatory-Not-Diagnostic by requiring test execution in agent environment before PR creation.
> 
> **Applicability**: All application repositories with automated test suites.
> 
> **Example**:
> ```yaml
>     - id: agent-test-execution-protocol
>       path: governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md
>       role: test-execution-before-handover
> ```

### 7.5 Relationship to Other Canon

This protocol integrates with and operationalizes:

| Canonical Document | Relationship |
|-------------------|--------------|
| **CI_CONFIRMATORY_NOT_DIAGNOSTIC.md** | This protocol operationalizes preflight test execution requirement |
| **EXECUTION_BOOTSTRAP_PROTOCOL.md** | This protocol extends Step 3 (Execute/Verify Locally) with test-specific requirements |
| **BUILD_PHILOSOPHY.md** | This protocol enforces One-Time Build Law by preventing test failures in CI |
| **PR_GATE_PRECONDITION_RULE.md** | This protocol ensures test gate preconditions satisfied before handover |
| **BUILDER_FIRST_PR_MERGE_MODEL.md** | This protocol integrates into builder QA requirements |
| **PREHANDOVER_PROOF_TEMPLATE.md** | This protocol adds test execution evidence requirements |

---

## 8. Validation Checklist

### 8.1 Agent Pre-Handover Checklist

Before creating PR, agent MUST verify:

- [ ] **Test environment established** (runtime, dependencies, test runner installed)
- [ ] **Test command identified** (exact command used by CI or equivalent)
- [ ] **Tests executed locally** (command run in agent environment)
- [ ] **Tests passed (GREEN state)** (exit code 0, no failures)
- [ ] **Test output captured** (full or summary with key metrics)
- [ ] **PREHANDOVER_PROOF includes test evidence** (all required fields present)
- [ ] **Iterations documented** (if tests failed initially, how they were fixed)
- [ ] **Exception documented** (if applicable, with authorization)
- [ ] **Test execution gate marked PASS** in Preflight Gate Status

**Only after ALL checklist items complete**, agent may create PR and hand over.

### 8.2 Reviewer Pre-Approval Checklist

Before approving PR, reviewer MUST verify:

- [ ] **PREHANDOVER_PROOF present** in PR description
- [ ] **Test Execution Validation section present** with all required fields
- [ ] **Test command documented** (exact command shown)
- [ ] **Exit code is 0** (or exception documented)
- [ ] **Test results show GREEN** (all tests passed, no failures)
- [ ] **Environment details provided** (runtime, test runner versions)
- [ ] **Execution timestamp recent** (tests run within reasonable time before PR)
- [ ] **Exception authorization present** (if exception claimed)
- [ ] **Handover guarantee includes test confirmation** ("all tests passed locally")

**If any checklist item incomplete**, request updates before approval.

### 8.3 CI Gate Validation (Confirmation, Not Discovery)

CI test gate SHOULD:

- ✅ Execute same tests as agent ran locally (or superset)
- ✅ Confirm tests pass (should match agent's local results)
- ✅ Report discrepancies (if CI results differ from agent evidence)
- ✅ Block merge if tests fail (even with agent evidence — environment difference discovered)

CI test gate SHOULD NOT:
- ❌ Be the first time tests are executed (agent already ran them)
- ❌ Discover test failures agent should have caught locally
- ❌ Serve as diagnostic tool for agent

**If CI test gate fails despite GREEN agent evidence**:
- Investigate environment difference (see Section 5.3)
- Document discrepancy in incident report if pattern emerges
- Update test environment setup documentation

---

## 9. Layer-Down Plan for Application Repositories

### 9.1 Layer-Down Scope

This protocol MUST be layered down to:

- ✅ All application repositories with automated test suites
- ✅ All repositories with FM + Builder agents
- ✅ All repositories where code changes have associated tests

### 9.2 Layer-Down Checklist (Per Repository)

**Phase 1: Documentation and Environment**
- [ ] Review existing test suite and test commands
- [ ] Document test environment setup (if not already documented)
- [ ] Add `architecture/TEST_ENVIRONMENT_SETUP.md` or similar
- [ ] Update repository README with test execution instructions
- [ ] Identify test command(s) used by CI

**Phase 2: Agent Contract Updates**
- [ ] Update `.agent` file to bind to AGENT_TEST_EXECUTION_PROTOCOL.md
- [ ] Add `capabilities.test_execution` section to `.agent` file
- [ ] Update builder contracts to require test execution before handover
- [ ] Update FM contract to enforce test evidence in PREHANDOVER_PROOF

**Phase 3: Template and Process Integration**
- [ ] Update PR template to include Test Execution Validation section
- [ ] Add test execution reminder to builder workflow documentation
- [ ] Update PREHANDOVER_PROOF examples with test evidence

**Phase 4: CI Gate Alignment**
- [ ] Verify CI test gate exists (create if missing)
- [ ] Verify CI test gate uses same test command as documented
- [ ] Update CI test gate to reference this protocol in failure messages
- [ ] Test CI gate execution (ensure works as confirmation, not discovery)

**Phase 5: Training and Rollout**
- [ ] Train builders on test execution requirements
- [ ] Train FM on test evidence validation
- [ ] Communicate protocol to all agents in repository
- [ ] Monitor first 5 PRs for protocol compliance

### 9.3 Layer-Down Timeline

**Target Timeline**: 1 week per application repository

- **Day 1-2**: Documentation and environment setup
- **Day 3-4**: Agent contract updates
- **Day 5**: Template and process integration
- **Day 6**: CI gate alignment and testing
- **Day 7**: Training and rollout

**Parallel Execution**: Multiple repositories may be layered down in parallel.

### 9.4 Layer-Down Ownership

**Governance Administrator**:
- Coordinates layer-down across repositories
- Provides protocol guidance and answers questions
- Reviews layer-down completion per repository
- Tracks layer-down status in `governance/reports/AGENT_TEST_EXECUTION_PROTOCOL_LAYERDOWN_STATUS.md`

**FM (per application repository)**:
- Executes layer-down in their repository
- Updates builder contracts
- Trains builders on new requirements
- Validates first PRs for compliance

**Builders**:
- Learn test execution requirements
- Set up test environment locally
- Execute tests before every PR
- Provide test evidence in PREHANDOVER_PROOF

---

## 10. Success Criteria

This protocol is successful when:

- ✅ **Zero merge gates fail due to test failures post-handover** (CI confirms success, not discovers failures)
- ✅ **All PRs with code changes include test execution evidence** in PREHANDOVER_PROOF
- ✅ **Agents demonstrate local test execution before every handover**
- ✅ **Test failures caught and fixed before PR creation** (not during CI)
- ✅ **CI test gate serves as confirmation** (rarely fails, high confidence in agent evidence)
- ✅ **Human review time decreased** (no post-handover failures to debug)
- ✅ **Build-to-Green discipline preserved** (no CI-discovery pattern)
- ✅ **Exception rate <5%** (protocol practical for vast majority of PRs)
- ✅ **Test environment documentation exists** for all application repositories
- ✅ **Agent contracts reflect test execution obligation** in all application repositories

---

## 11. Prohibitions and Constraints

### 11.1 Absolutely Prohibited

**Agents MUST NEVER**:
- ❌ Create PR with code changes before running tests locally
- ❌ Skip test execution and rely on CI to run tests first time
- ❌ Claim "tests passed locally" without execution evidence
- ❌ Mock/disable/skip tests to achieve artificial GREEN state
- ❌ Use exceptions as regular practice (exceptions are rare)
- ❌ Self-authorize exceptions without proper authorization
- ❌ Proceed with handover when tests fail locally

**Reviewers MUST NEVER**:
- ❌ Approve PRs without test execution evidence (if code changes with tests)
- ❌ Accept "I ran tests, they passed" without captured output
- ❌ Waive test execution requirement without authorized exception
- ❌ Merge PRs with failing local tests

### 11.2 Environment Constraints

**This protocol does NOT require**:
- ❌ Perfect environment parity (reasonable approximation sufficient)
- ❌ Identical CI environment locally (major versions match, minor variations OK)
- ❌ Expensive infrastructure (cloud services, proprietary hardware) without exception
- ❌ Running entire test suite if impractically long (relevant subset acceptable with documentation)

**This protocol DOES require**:
- ✅ Reasonable test environment approximation
- ✅ Running relevant tests that validate changes
- ✅ Achieving GREEN state locally (exit code 0, tests passed)
- ✅ Capturing and documenting test execution
- ✅ Escalating if environment setup impossible

### 11.3 Exception Constraints

**Exceptions**:
- ✅ Are rare (<5% of PRs expected)
- ✅ Require explicit authorization
- ✅ Must be documented with justification
- ✅ Must include remediation plan
- ✅ Must include alternative validation

**Exceptions CANNOT**:
- ❌ Become regular practice ("tests too slow, always skip")
- ❌ Be self-authorized by agents
- ❌ Bypass all validation (alternative validation required)
- ❌ Be used for convenience (only genuine impossibility)

---

## 12. Monitoring and Enforcement

### 12.1 Compliance Monitoring

**Governance Administrator MUST**:
- ✅ Audit PR descriptions for test execution evidence (monthly)
- ✅ Track exception rate and patterns (monthly)
- ✅ Monitor CI test gate failure rate (should decrease over time)
- ✅ Identify repositories with low compliance (require training/remediation)
- ✅ Report protocol effectiveness to Maturion (quarterly)

**Metrics to Track**:
- **Test Evidence Inclusion Rate**: % of PRs with code changes that include test evidence
- **Local Test Failure Rate**: % of PRs where agent encountered test failures locally (fixed before handover)
- **CI Test Gate Failure Rate**: % of PRs where CI test gate fails despite agent evidence (should be low)
- **Exception Rate**: % of PRs using test execution exceptions
- **Time to GREEN**: Average time for agent to achieve GREEN test state

**Target Metrics**:
- Test Evidence Inclusion Rate: >95%
- CI Test Gate Failure Rate: <2% (environment differences only)
- Exception Rate: <5%

### 12.2 Protocol Violations

**Violation Classifications**:

**Minor Violation** (coaching/reminder):
- Incomplete test evidence (missing fields)
- Test output not captured (but tests run)
- Late evidence addition (added after PR creation)

**Major Violation** (requires correction before merge):
- No test evidence when required
- Tests not run locally (relied on CI)
- False claim of test execution
- Exception used without authorization

**Critical Violation** (escalation to Maturion):
- Pattern of violations by same agent
- Systemic non-compliance in repository
- Authorization abuse
- Evidence falsification

**Response to Violations**:
- Minor: Comment on PR with protocol reference, request completion
- Major: Block PR approval until corrected
- Critical: Escalate per escalation protocol, possible agent suspension

### 12.3 Protocol Evolution

**This protocol may be updated when**:
- Exception rate exceeds 10% (protocol may be impractical)
- New testing technologies emerge (new test runners, frameworks)
- CI infrastructure changes (different environment requirements)
- Learnings indicate protocol improvements

**Update Process**:
- Governance Administrator proposes updates based on monitoring data
- Maturion approves updates
- Updates ripple to all application repositories
- Agents trained on changes

---

## 13. Related Documents

- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Constitutional mandate for preflight test execution
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — 7-step execution verification protocol
- `governance/canon/BUILD_PHILOSOPHY.md` — One-Time Build Law, 100% GREEN mandate
- `governance/canon/PR_GATE_PRECONDITION_RULE.md` — No green gate, no handover
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — Template for execution evidence
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` — Builder QA requirements
- `governance/canon/.agent.schema.md` — Agent file structure and validation
- `governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md` — Mandatory governance bindings

---

## 14. Version History

### v1.0.0 (2026-01-13)
- Initial protocol definition
- Establishes test execution in agent environment before PR creation
- Defines PREHANDOVER_PROOF test evidence requirements
- Defines agent test environment requirements
- Provides failure scenarios and remediation
- Establishes exception process
- Integrates with EXECUTION_BOOTSTRAP_PROTOCOL and CI_CONFIRMATORY_NOT_DIAGNOSTIC
- Provides layer-down plan for application repositories
- Defines success criteria and monitoring

---

## 15. Authority Statement

**This protocol is canonical and binding.**

All application repositories with test suites, agents, and workflows MUST comply with this protocol.

No execution path may:
- Create PR with code changes before running tests locally
- Skip test execution and rely on CI for first-time test discovery
- Hand over work without test execution evidence
- Bypass test execution requirement without authorized exception

**Violations are governance incidents and must be escalated per escalation policy.**

**Root Authority**:
- CI_CONFIRMATORY_NOT_DIAGNOSTIC.md (CI confirms, does not discover)
- EXECUTION_BOOTSTRAP_PROTOCOL.md (execution verification mandatory)
- BUILD_PHILOSOPHY.md (One-Time Build Law)
- Pattern of merge gate failures post-handover due to test failures

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Effective**: Immediate upon merge  
**Last Updated**: 2026-01-13

---

*End of Agent Test Execution Protocol v1.0.0*
