# QA Enforcement and Compliance

## QA-First Philosophy

In the Maturion system, **Quality Assurance is not optional**. QA is the primary gatekeeper for all code that enters the repository. This is not a supplement to human review—it is the *replacement* for human review.

## Enhanced QA System (2025 Upgrade)

Following the Quality Integrity Contract mandate, the QA system has been enhanced with:

### 1. Log Parsing QA
- **Mandatory parsing** of `/tmp/build.log`, `/tmp/lint.log`, `/tmp/test.log`
- **Pattern detection** for errors, warnings, and failures
- **Whitelist support** for known acceptable warnings
- **Zero tolerance** for unwhitelisted errors and warnings

### 2. Zero-Warning Build Policy
- Build warnings → QA FAIL (unless whitelisted)
- Lint warnings → QA FAIL (unless whitelisted)
- TypeScript warnings → QA FAIL (unless whitelisted)
- Unused variables → QA FAIL
- Deprecated APIs → QA FAIL

This prevents gradual erosion of quality standards.

### 3. Vercel Deployment Simulation
- Production build simulation (`next build`)
- Production lint simulation (`next lint`)
- Strict mode validation (TypeScript + React)
- Build output artifact validation

Ensures deployment readiness before PR creation.

### 4. QA Miss Tracking
- **Governance memory** stores all instances where QA passed but failures existed
- Tracks: missed signal, root cause, architectural gap, QA gap, enforcement rule
- Creates learning mechanism to prevent recurrence
- Enables continuous improvement of QA system

### Implementation
See:
- `lib/foreman/qa/enhanced-qa-runner.ts` - Main QA orchestrator
- `lib/foreman/qa/log-parsing-qa.ts` - Log parsing engine
- `lib/foreman/qa/zero-warning-policy.ts` - Warning enforcement
- `lib/foreman/qa/vercel-simulation-qa.ts` - Deployment simulation
- `lib/foreman/memory/qa-miss-tracker.ts` - Learning mechanism
- `foreman/governance/quality-integrity-contract.md` - Complete specification

## Why QA Enforcement is Supreme

### The Problem with Human Code Review

Human code review suffers from inherent limitations:

1. **Inconsistency**: Reviewers apply standards subjectively
2. **Fatigue**: Attention degrades over time and volume
3. **Blind Spots**: Humans miss subtle bugs and patterns
4. **Speed**: Manual review creates bottlenecks
5. **Availability**: Reviewers may be unavailable or overloaded
6. **Bias**: Personal preferences influence feedback
7. **Scope**: Humans can't review 100% of code thoroughly

### The Advantage of Automated QA

Automated QA validation provides:

1. **Consistency**: Same rules applied uniformly, every time
2. **Thoroughness**: Every line checked against standards
3. **Speed**: Instant validation of any volume
4. **Objectivity**: No personal bias or politics
5. **Scalability**: Handles any number of concurrent reviews
6. **Completeness**: 100% coverage of validation rules
7. **Auditability**: Clear, documented reasoning for all findings

**Conclusion**: Automated QA is categorically superior to human review for deterministic quality checks.

## QA Builder Responsibilities

The QA Builder is the ultimate code quality authority:

### Primary Responsibilities

1. **Validate All Builder Outputs**
   - UI components meet accessibility standards
   - API endpoints have proper error handling
   - Schemas are type-safe and well-defined
   - Integrations handle failures gracefully

2. **Generate Test Coverage**
   - Create unit tests for all functions
   - Build integration tests for workflows
   - Ensure minimum coverage thresholds met

3. **Enforce Code Standards**
   - Linting rules satisfied
   - Formatting consistent
   - Naming conventions followed
   - Code complexity within limits

4. **Security Validation**
   - No hardcoded secrets or credentials
   - Input validation on all user data
   - SQL injection protection in queries
   - XSS protection in UI components

5. **Performance Checks**
   - No obvious performance anti-patterns
   - Async operations handled properly
   - Resource cleanup in error cases
   - Database queries optimized

6. **Documentation Validation**
   - Public APIs documented
   - Complex logic explained
   - Type definitions complete
   - README files updated

### QA-of-QA Meta-Review

The QA Builder also reviews **itself**:

- Are validation checks comprehensive?
- Are test cases thorough?
- Are quality criteria appropriate?
- Is the QA process itself sound?

This meta-review ensures the QA framework remains robust and effective.

## QA Validation Pipeline

Every build sequence includes QA validation per the Quality Integrity Contract (QIC):

```
Builder Outputs → QA Builder → QIC Validation → QA Results → PR Assembly Gate
                       ↓
                   QA-of-QA
```

### Step 1: Artifact Collection

QA Builder receives all artifacts from code-writing builders:
- Code files from UI, API, Schema, Integration builders
- Configuration changes
- Documentation updates

### Step 2: QIC Validation Execution

QA Builder runs QIC validation suite (see QIC requirements):

**QIC-1: Build Integrity**
```typescript
{
  "check": "build_integrity",
  "status": "passed",
  "message": "Build logs contain no error patterns"
}
```

**QIC-2: Lint Integrity**
```typescript
{
  "check": "lint_integrity",
  "status": "passed", 
  "message": "Lint runs in strict mode with zero errors"
}
```

**QIC-3: Runtime Integrity**
```typescript
{
  "check": "runtime_integrity",
  "status": "passed",
  "message": "All runtime checks passed"
}
```

**QIC-4: Deployment Simulation**
```typescript
{
  "check": "deployment_simulation",
  "status": "passed",
  "message": "Preview and production builds succeeded"
}
```

**QIC-5: Silent Failure Prevention**
```typescript
{
  "check": "silent_failure_prevention",
  "status": "passed",
  "message": "No silent failures detected"
}
```

**Additional Checks**
```typescript
{
  "check": "type_safety",
  "status": "passed",
  "message": "All TypeScript types are properly defined"
}

{
  "check": "test_coverage",
  "status": "passed",
  "message": "Coverage: 87% (threshold: 80%)"
}

{
  "check": "security_scan",
  "status": "warning",
  "message": "Dependency has known vulnerability (low severity)"
}
```

### Step 3: Results Aggregation

QA results aggregated into overall assessment:
- **All Passed**: Green light for PR assembly
- **Warnings Only**: Proceed with warnings noted in PR
- **Any Failed**: Block PR assembly until issues resolved

### Step 4: QIC-6 Governance Memory Integration

**All QA failures are recorded as QI Incidents** per QIC-6:
```typescript
import { recordQIIncident } from '@/lib/foreman/governance/qic-loader'

if (checkResult.status === 'failed') {
  await recordQIIncident(checkResult, {
    buildId: currentBuildId,
    sequenceId: currentSequenceId,
    commitSha: currentCommitSha,
    branch: currentBranch,
  })
}
```

### Step 5: QA-of-QA Review

Meta-review validates the QA process:
- Were all QIC requirements checked?
- Are results accurate and actionable?
- Is the QA configuration appropriate?

## QA Checks Catalog

### Type Safety Checks

**Objective**: Ensure type correctness across codebase

**Checks**:
- TypeScript compilation succeeds without errors
- All function parameters typed
- All return types specified
- No `any` types (except documented exceptions)
- Proper type exports and imports

**Tool**: TypeScript compiler (`tsc --noEmit`)

### Code Quality Checks

**Objective**: Enforce coding standards and best practices

**Checks**:
- ESLint rules satisfied (no errors)
- Consistent code formatting
- No unused variables or imports
- Appropriate function complexity
- Proper naming conventions

**Tools**: ESLint, Prettier

### Test Coverage Checks

**Objective**: Ensure adequate test coverage

**Checks**:
- Minimum coverage threshold met (default: 80%)
- All public functions tested
- Critical paths have integration tests
- Edge cases covered

**Tools**: Jest, Vitest, or configured test framework

### Security Checks

**Objective**: Identify security vulnerabilities

**Checks**:
- No hardcoded secrets or credentials
- No SQL injection vulnerabilities
- XSS protection in place
- CSRF protection for mutations
- Dependency vulnerabilities scanned

**Tools**: npm audit, custom secret detection patterns

### Performance Checks

**Objective**: Prevent performance regressions

**Checks**:
- No synchronous blocking in async code
- Database queries use indexes
- API responses paginated
- Large files lazy-loaded
- Proper resource cleanup

**Method**: Static analysis, pattern detection

### Documentation Checks

**Objective**: Ensure code is documented

**Checks**:
- Public APIs have JSDoc comments
- README updated if features added
- Breaking changes documented
- Type definitions complete

**Method**: Documentation linter

## QA Enforcement Gates

QA results control build sequence progression:

### Green Light (All Passed)

```json
{
  "qaStatus": "passed",
  "checks": [
    {"check": "type_safety", "status": "passed"},
    {"check": "linting", "status": "passed"},
    {"check": "tests", "status": "passed"},
    {"check": "security", "status": "passed"}
  ],
  "canProceed": true
}
```

**Action**: Proceed to PR assembly

### Yellow Light (Warnings)

```json
{
  "qaStatus": "warning",
  "checks": [
    {"check": "type_safety", "status": "passed"},
    {"check": "security", "status": "warning", "message": "Low-severity dependency issue"}
  ],
  "canProceed": true,
  "warnings": ["Address dependency vulnerability in next sprint"]
}
```

**Action**: Proceed to PR assembly with warnings noted

### Red Light (Failures)

```json
{
  "qaStatus": "failed",
  "checks": [
    {"check": "type_safety", "status": "failed", "message": "Type errors in user.ts"},
    {"check": "tests", "status": "failed", "message": "Coverage: 62% (threshold: 80%)"}
  ],
  "canProceed": false,
  "blockers": ["Fix type errors", "Add tests to meet coverage threshold"]
}
```

**Action**: **BLOCK PR ASSEMBLY** - Sequence fails until issues resolved

## QA Failure Handling

When QA checks fail:

### Step 1: Log Failure Details

```typescript
console.error('[QA] Validation failed:', {
  sequenceId: 'seq_123',
  failedChecks: ['type_safety', 'test_coverage'],
  details: {
    type_safety: 'Type error in user.ts:42',
    test_coverage: 'Coverage 62% < 80%'
  }
})
```

### Step 2: Update Sequence Status

```typescript
{
  "status": "failed",
  "error": "QA validation failed",
  "qaResults": [/* failed check details */]
}
```

### Step 3: Prevent PR Assembly

Do NOT create pull request when QA fails. The build sequence ends in failed state.

### Step 4: Surface to Admin (if applicable)

If in manual approval mode, notify admin of QA failures for investigation.

### Step 5: Require Manual Fix

QA failures require manual intervention:
- Developer fixes the issues
- Re-run the build sequence
- QA validates again

**No auto-retry on QA failures** - QA failures indicate genuine issues that need human resolution.

## Compliance Enforcement

QA Builder enforces compliance rules:

### Organization ID Compliance

**Rule**: All tasks must include valid `organisationId`

**Enforcement**: Pre-dispatch validation rejects tasks without org ID

### Secret Protection Compliance

**Rule**: No secrets in code, logs, or PR descriptions

**Enforcement**: QA Builder scans for secret patterns, fails if found

### Governance Policy Compliance

**Rule**: All code changes respect loaded governance rules

**Enforcement**: Governance rules compiled into QA validation criteria

### Audit Trail Compliance

**Rule**: All actions logged for audit purposes

**Enforcement**: Automatic logging at every step

## QA Configuration

QA validation is configurable per organization:

### Coverage Thresholds

```typescript
{
  "qa": {
    "coverage": {
      "statements": 80,
      "branches": 75,
      "functions": 80,
      "lines": 80
    }
  }
}
```

### Linting Rules

```typescript
{
  "qa": {
    "linting": {
      "rules": "eslint:recommended",
      "customRules": {
        "no-console": "warn"
      }
    }
  }
}
```

### Security Scanning

```typescript
{
  "qa": {
    "security": {
      "dependencyScan": true,
      "secretDetection": true,
      "allowedLicenses": ["MIT", "Apache-2.0"]
    }
  }
}
```

## QA as the Ultimate Reviewer

**QA Builder replaces human code review.**

This is a fundamental architectural decision:

- **Humans review architecture and strategy** (high-level thinking)
- **QA reviews code and implementation** (detailed validation)

**Rationale**: Machines are better than humans at:
- Checking rules consistently
- Scanning for patterns
- Running tests exhaustively
- Validating types completely
- Finding security issues systematically

**Humans are better at**:
- Defining the right architecture
- Making strategic trade-offs
- Understanding business context
- Creating governance rules

**Division of Labor**: Let each do what they do best.

## No Human Code Review Required

**This is not a limitation—it is a feature.**

By eliminating human code review, we achieve:

1. **Faster Velocity**: No waiting for reviewer availability
2. **Higher Consistency**: Same standards, always
3. **Better Quality**: Comprehensive automated checks
4. **Lower Cost**: No engineer time spent on review
5. **Scalability**: System handles any volume
6. **Focus**: Engineers focus on architecture, not code details

**The architecture ensures correctness. QA enforces the architecture. Therefore, human review is redundant.**

---

*This QA enforcement document defines the role of QA as the ultimate code quality authority, replacing human review with systematic automated validation.*
