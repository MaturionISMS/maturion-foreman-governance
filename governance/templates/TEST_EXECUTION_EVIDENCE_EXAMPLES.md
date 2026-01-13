# TEST EXECUTION EVIDENCE EXAMPLES

## Document Metadata
**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`  
**Purpose**: Provide concrete examples of test execution evidence for PREHANDOVER_PROOF  
**Audience**: All agents in application repositories with test suites  
**Version**: 1.0.0  
**Date**: 2026-01-13

---

## Purpose

This document provides **concrete examples** of test execution evidence to include in PREHANDOVER_PROOF. Use these examples as templates for your own test evidence.

**Note**: Each example shows the complete markdown you would include in your PR description. The nested code blocks (marked with triple backticks) are part of the example and should be included as shown.

---

## Example 1: Node.js Application with Jest

### Scenario
Agent makes changes to React components, needs to run unit and integration tests before PR creation.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: All unit and integration tests must pass for Dashboard and related components

**Applicability**: ✅ Required (code changes with associated tests)

**Test Command Executed**:
```
npm test
```

**Execution Details**:
- **Date**: 2026-01-13 10:30:45 UTC
- **Environment**: 
  - OS: Ubuntu 22.04.3 LTS
  - Runtime: Node.js v18.18.0
  - Package Manager: npm v9.8.1
  - Test Runner: Jest v29.5.0

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
     ✓ caches responses correctly (34 ms)
     ✓ retries on failure (112 ms)

 PASS  src/utils/validators.test.ts
   Validators
     ✓ validates email format (5 ms)
     ✓ validates phone format (4 ms)
     ✓ validates URL format (6 ms)

Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        3.421 s
Ran all test suites.

Exit code: 0
```

**Status**: ✅ ALL GREEN

**Iterations**:
- First run: 1 test failed in Dashboard.test.tsx ("updates data on real-time event" failed due to incorrect mock)
- Fixed: Updated mock event data structure to match WebSocket message format
- Second run: All tests passed (exit code 0)

**Guarantee**: All 12 tests passed locally before PR creation. CI will confirm success, not discover test failures.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`
```

---

## Example 2: Python Application with pytest

### Scenario
Agent adds new API endpoint, needs to run pytest suite including new endpoint tests.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: All pytest tests must pass including new user registration endpoint tests

**Applicability**: ✅ Required (code changes with associated tests)

**Test Command Executed**:
```
pytest tests/
```

**Execution Details**:
- **Date**: 2026-01-13 14:22:18 UTC
- **Environment**:
  - OS: macOS Sonoma 14.2
  - Runtime: Python 3.11.5
  - Package Manager: pip 23.3.1
  - Test Runner: pytest 7.4.3
- **Exit Code**: 0 (SUCCESS)

**Test Results Summary**:
```
$ pytest tests/

========================= test session starts ==========================
platform darwin -- Python 3.11.5, pytest-7.4.3, pluggy-1.3.0
rootdir: /Users/agent/projects/api-service
configfile: pytest.ini
plugins: asyncio-0.21.1, cov-4.1.0
collected 47 items

tests/test_auth.py ........                                      [ 17%]
tests/test_users.py .............                                [ 44%]
tests/test_registration.py .....                                 [ 55%]
tests/test_database.py ..........                                [ 76%]
tests/test_api.py ...........                                    [100%]

========================== 47 passed in 5.23s ==========================

Exit code: 0
```

**Status**: ✅ ALL GREEN

**Iterations**:
- Tests passed on first execution (no failures)

**Guarantee**: All 47 tests passed locally before PR creation. CI will confirm success, not discover test failures.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`
```

---

## Example 3: Rust Application with Cargo

### Scenario
Agent refactors core business logic, needs to run cargo test suite.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: All cargo tests must pass for refactored payment processing module

**Applicability**: ✅ Required (code changes with associated tests)

**Test Command Executed**:
```
cargo test
```

**Execution Details**:
- **Date**: 2026-01-13 09:15:33 UTC
- **Environment**:
  - OS: Ubuntu 22.04.3 LTS
  - Runtime: Rust 1.75.0 (stable)
  - Package Manager: Cargo 1.75.0
  - Test Runner: Built-in Rust test runner
- **Exit Code**: 0 (SUCCESS)

**Test Results Summary**:
```
$ cargo test

   Compiling payment-service v0.3.0 (/home/agent/payment-service)
    Finished test [unoptimized + debuginfo] target(s) in 4.32s
     Running unittests src/lib.rs (target/debug/deps/payment_service-a1b2c3d4e5f6)

running 23 tests
test payment::tests::test_amount_validation ... ok
test payment::tests::test_currency_conversion ... ok
test payment::tests::test_transaction_creation ... ok
test payment::tests::test_refund_processing ... ok
test payment::tests::test_payment_gateway_integration ... ok
test processor::tests::test_stripe_integration ... ok
test processor::tests::test_paypal_integration ... ok
[... 16 more tests ...]

test result: ok. 23 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 2.14s

     Running tests/integration_test.rs (target/debug/deps/integration_test-1a2b3c4d)

running 8 tests
test test_end_to_end_payment_flow ... ok
test test_refund_workflow ... ok
test test_multi_currency_support ... ok
[... 5 more tests ...]

test result: ok. 8 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 3.45s

Exit code: 0
```

**Status**: ✅ ALL GREEN

**Iterations**:
- First run: 2 tests failed in payment::tests (incorrect amount calculation after refactor)
- Fixed: Corrected decimal precision handling in refactored code
- Second run: All tests passed (exit code 0)

**Guarantee**: All 31 tests (23 unit + 8 integration) passed locally before PR creation. CI will confirm success, not discover test failures.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`
```

---

## Example 4: Long-Running Test Suite (Subset Strategy)

### Scenario
Agent makes small change, full test suite takes 45 minutes, runs relevant subset locally.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: Relevant tests must pass for user profile component changes

**Applicability**: ✅ Required (code changes with associated tests)

**Test Strategy**: Subset execution (full suite runs in CI)

**Test Command Executed**:
```
npm test -- --testPathPattern="profile" --testPathPattern="auth"
```

**Execution Details**:
- **Date**: 2026-01-13 11:45:22 UTC
- **Environment**:
  - OS: macOS Ventura 13.6
  - Runtime: Node.js v18.18.0
  - Package Manager: npm v9.8.1
  - Test Runner: Jest v29.5.0
- **Exit Code**: 0 (SUCCESS)

**Test Results Summary**:
```
$ npm test -- --testPathPattern="profile" --testPathPattern="auth"

> large-app@2.1.0 test
> jest --testPathPattern="profile" --testPathPattern="auth"

 PASS  src/components/profile/UserProfile.test.tsx (8 tests)
 PASS  src/components/profile/ProfileEditor.test.tsx (12 tests)
 PASS  src/services/auth/AuthService.test.ts (15 tests)
 PASS  src/utils/auth/validators.test.ts (7 tests)

Test Suites: 4 passed, 4 total
Tests:       42 passed, 42 total
Snapshots:   2 passed, 2 total
Time:        4.127 s
Ran all test suites matching /profile|auth/i.

Exit code: 0
```

**Subset Rationale**:
- Full test suite: 847 tests, ~45 minutes execution time
- Changes affect: User profile components and auth utilities
- Relevant subset: 42 tests, ~4 minutes execution time
- Full suite will run in CI (expected duration: 45 minutes)

**Status**: ✅ RELEVANT TESTS GREEN

**Iterations**:
- Tests passed on first execution (no failures)

**Guarantee**: All 42 relevant tests passed locally before PR creation. Full suite of 847 tests will run in CI for comprehensive validation. CI will confirm success, not discover failures in changed areas.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md` Section 5.4 (Long-Running Tests)
```

---

## Example 5: Test Execution with Environment Variables

### Scenario
Agent makes changes requiring database connection, uses test database with environment variables.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: All database integration tests must pass with test database connection

**Applicability**: ✅ Required (code changes with associated tests)

**Test Command Executed**:
```
DATABASE_URL=postgresql://localhost:5432/test_db npm test
```

**Execution Details**:
- **Date**: 2026-01-13 13:08:47 UTC
- **Environment**:
  - OS: Ubuntu 22.04.3 LTS
  - Runtime: Node.js v18.18.0
  - Package Manager: npm v9.8.1
  - Test Runner: Jest v29.5.0
  - Database: PostgreSQL 15.3
  - Environment Variables: DATABASE_URL (set to test database)
- **Exit Code**: 0 (SUCCESS)

**Environment Setup**:
```
$ pg_isready
/var/run/postgresql:5432 - accepting connections

$ psql -U postgres -d test_db -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public';"
 count 
-------
    15
(1 row)

Exit code: 0
```

**Test Results Summary**:
```
$ DATABASE_URL=postgresql://localhost:5432/test_db npm test

> api-app@1.5.0 test
> jest

 PASS  tests/database/users.test.ts (12 tests)
 PASS  tests/database/posts.test.ts (9 tests)
 PASS  tests/integration/user-workflow.test.ts (6 tests)

Test Suites: 3 passed, 3 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        8.742 s
Ran all test suites.

Exit code: 0
```

**Status**: ✅ ALL GREEN

**Iterations**:
- First run: Database connection failed (PostgreSQL not running)
- Fixed: Started PostgreSQL service with `sudo systemctl start postgresql`
- Second run: All tests passed (exit code 0)

**Guarantee**: All 27 tests passed locally with test database before PR creation. CI will confirm success with same database configuration, not discover test failures.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`
```

---

## Example 6: Exception - Test Infrastructure Gap

### Scenario
New repository, test framework being set up in parallel PR, no tests exist yet for new feature.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: Tests for new authentication module

**Applicability**: ⚠️ EXCEPTION DOCUMENTED

---

### Test Execution Exception

**Exception Category**: Test Infrastructure Gap

**Justification**: 
This repository is newly initialized. Test infrastructure (Jest + React Testing Library) is being established in parallel PR #23. No test framework is available in the current branch to execute tests against.

**Evidence of Exception Validity**:
- Repository created 2026-01-10 (3 days ago)
- Test infrastructure PR #23 created 2026-01-12, currently in review
- No `package.json` test scripts exist in current branch
- No test files exist in repository yet
- This PR is first feature implementation in new repository

**Alternative Validation Performed**:
1. Manual testing of authentication flow:
   - Tested login with valid credentials: SUCCESS
   - Tested login with invalid credentials: FAILURE (expected)
   - Tested session persistence: SUCCESS
   - Tested logout flow: SUCCESS
   - Screenshots attached in PR description

2. Code review by peer developer (John Smith):
   - Reviewed authentication logic for correctness
   - Verified OAuth integration follows best practices
   - Approved implementation approach

**Authorization**:
- **Authorized By**: ForemanApp (FM)
- **Authorization Date**: 2026-01-13
- **Authorization Evidence**: [Link to FM approval comment in this PR]

**Remediation Plan**:
- Test infrastructure PR #23 will be merged within 2 days (by 2026-01-15)
- Follow-up PR #25 will add comprehensive tests for authentication module (scheduled for 2026-01-16)
- All future PRs will include test execution evidence per protocol
- This is a ONE-TIME exception for initial feature in new repository

**Risk Acknowledgment**: I acknowledge that CI will not run tests for this PR due to documented test infrastructure gap. Manual validation and peer review have been performed as alternative validation. I commit to adding comprehensive tests in PR #25 within 3 days.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md` Section 6.1.3 (Test Infrastructure Gap Exception)
```

---

## Example 7: Not Applicable - Documentation-Only Change

### Scenario
Agent updates README and API documentation, no code changes, tests not applicable.

### Test Execution Evidence

```markdown
### Test Execution Validation

**Requirement**: N/A (documentation-only changes)

**Applicability**: ⊘ NOT APPLICABLE

**Rationale**: This PR contains only documentation updates:
- Updated README.md with new installation instructions
- Updated API.md with endpoint descriptions
- Updated CONTRIBUTING.md with test execution requirements

**Files Changed**:
- README.md (documentation)
- docs/API.md (documentation)
- CONTRIBUTING.md (documentation)

**No Code Changes**: No `.ts`, `.tsx`, `.js`, `.py`, `.rs`, or other code files modified.

**No Tests Required**: Documentation changes cannot fail in CI test gates.

**Status**: ⊘ NOT APPLICABLE

**Note**: While test execution is not required for documentation-only changes, this PR still follows Execution Bootstrap Protocol for other validation (directory structure, YAML syntax if applicable, etc.).

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md` Section 1.2 (Scope - Not Required For documentation changes)
```

---

## Common Patterns and Best Practices

### Pattern 1: Include Both Summary and Detail

**Good**:
```
Test Suites: 4 passed, 4 total
Tests: 42 passed, 42 total
Time: 8.342s

[Include list of test files or full output]
```

**Not Ideal**:
```
Tests passed.
```

### Pattern 2: Document Iterations and Fixes

**Good**:
```
**Iterations**:
- First run: 2 tests failed (incorrect mock data)
- Fixed: Updated mock to match API contract
- Second run: All tests passed
```

**Not Ideal**:
```
**Iterations**: None
```
(If you iterated, document it! Shows good practice.)

### Pattern 3: Be Specific About Environment

**Good**:
```
- Runtime: Node.js v18.18.0
- Test Runner: Jest v29.5.0
- Environment Variables: DATABASE_URL (test database)
```

**Not Ideal**:
```
- Environment: Node.js
```

### Pattern 4: Explicit Exit Codes

**Good**:
```
Exit code: 0 (SUCCESS)
```

**Not Ideal**:
```
Tests passed.
```
(Always include the literal exit code!)

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: No Evidence

❌ **Bad**:
```markdown
### Test Execution Validation

I ran the tests and they all passed.
```

✅ **Good**: Include actual command output (see examples above)

### Anti-Pattern 2: Vague Claims

❌ **Bad**:
```markdown
All tests are green locally, CI should pass.
```

✅ **Good**: Include specific test counts, exit codes, execution time

### Anti-Pattern 3: Missing Iterations

❌ **Bad**:
```markdown
**Iterations**: None
```
(When you actually had to fix 3 test failures)

✅ **Good**: Document what failed and how you fixed it (shows discipline)

### Anti-Pattern 4: False Exceptions

❌ **Bad**:
```markdown
**Exception**: Tests too slow, didn't run them
```
(Not a valid exception category)

✅ **Good**: Use subset strategy for long tests (Example 4) or request legitimate exception

---

## Questions and Answers

### Q: Can I abbreviate test output if it's very long?

**A**: Yes, for test suites with hundreds of tests, include:
- Full summary (suites, tests, time)
- List of test files/suites
- First few test names as examples
- Note: "Full output available upon request"

### Q: What if my environment differs slightly from CI?

**A**: Document the difference in "Known Environment Differences" section. Minor version differences (Node 18.18.0 vs 18.16.0) are acceptable as long as tests pass.

### Q: Do I need to re-run tests for every commit?

**A**: Yes, if commits include code changes. Re-run tests after final commit before PR creation.

### Q: What if tests are flaky?

**A**: Fix flaky tests! Document in iterations section. Don't hand over with flaky tests.

---

## Related Documents

- `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md` — Full protocol
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — Complete template
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — Parent protocol
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Constitutional mandate

---

**Status**: Active Examples  
**Authority**: AGENT_TEST_EXECUTION_PROTOCOL.md  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-13

---

*End of Test Execution Evidence Examples*
