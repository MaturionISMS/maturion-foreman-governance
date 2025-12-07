# Quality Integrity Contract

## True North → QA System → Structural QA Requirements

This document defines the **Quality Integrity Contract** — an architectural rule that ensures no build, lint, or runtime error can pass QA regardless of exit code.

## Philosophy

**"QA passed" means ZERO failures, ZERO errors, ZERO warnings (unless explicitly whitelisted).**

This contract ensures that:
- Build failures can NEVER result in "QA Passed" status
- Lint failures can NEVER result in "QA Passed" status
- Runtime errors can NEVER result in "QA Passed" status
- Silent failures can NEVER result in "QA Passed" status
- Suppressed errors can NEVER result in "QA Passed" status
- Missing error parsing can NEVER result in "QA Passed" status

## Failure Definitions

### Build Failure

A **build failure** occurs when ANY of the following are true:

1. **Exit Code Failure**
   - Build process exits with non-zero code
   - `next build` returns exit code != 0
   - `tsc` compilation returns exit code != 0

2. **Build Error Messages**
   - Log contains: `Build failed`
   - Log contains: `Compilation error`
   - Log contains: `Failed to compile`
   - Log contains: `ERROR` (case insensitive)
   - Log contains: `Error:` followed by error description

3. **TypeScript Compilation Errors**
   - Any `TS####` error code in output
   - Type errors detected
   - Module resolution failures
   - Missing type declarations (non-whitelisted)

4. **Dependency Errors**
   - Missing dependencies
   - Incompatible dependency versions
   - Failed to install dependencies
   - Circular dependency errors

5. **Build Warnings (Zero-Warning Policy)**
   - TypeScript warnings (unless whitelisted)
   - Webpack warnings (unless whitelisted)
   - Next.js build warnings (unless whitelisted)
   - Any warning flagged as potential error

**Result**: If ANY of the above are present, build status = FAILED, QA cannot pass.

### Lint Failure

A **lint failure** occurs when ANY of the following are true:

1. **Exit Code Failure**
   - Linter exits with non-zero code
   - `npm run lint` returns exit code != 0
   - `eslint` returns exit code != 0

2. **Lint Error Messages**
   - Log contains: `error` (from linter output)
   - Log contains: `✖ ` (error indicator)
   - Linter reports errors found

3. **Lint Warnings (Zero-Warning Policy)**
   - Warnings present (unless whitelisted)
   - Log contains: `warning` (from linter output)
   - Log contains: `⚠` (warning indicator)

4. **Code Quality Issues**
   - Unused variables (unless marked with underscore convention)
   - Deprecated API usage (unless documented exception)
   - Security lint violations
   - Accessibility violations (for UI code)

**Result**: If ANY of the above are present, lint status = FAILED, QA cannot pass.

### Runtime Failure

A **runtime failure** occurs when ANY of the following are true:

1. **Runtime Error Messages**
   - Log contains: `TypeError:`
   - Log contains: `ReferenceError:`
   - Log contains: `SyntaxError:`
   - Log contains: `RangeError:`
   - Log contains: `Error:` in runtime context

2. **Test Failures**
   - Test suite exits with non-zero code
   - Log contains: `FAIL` or `failed`
   - Test assertions fail
   - Test timeouts occur

3. **Unhandled Exceptions**
   - Unhandled promise rejections
   - Uncaught exceptions
   - Process crashes or exits unexpectedly

4. **Vercel Deployment Simulation Failures**
   - Production build fails
   - Preview build fails
   - Strict mode errors occur
   - Runtime initialization fails

**Result**: If ANY of the above are present, runtime status = FAILED, QA cannot pass.

### Suppressed Failure

A **suppressed failure** occurs when:

1. **Hidden Exit Codes**
   - Script uses `|| true` to mask failures
   - Script uses `set +e` to ignore errors
   - Script catches and silently discards errors

2. **Redirected Error Output**
   - Errors redirected to /dev/null
   - Stderr suppressed or not captured
   - Error logs not written to expected location

3. **Conditional Logic Masking Failures**
   - `if` statement catching failures without logging
   - Try-catch blocks with empty catch handlers
   - Error handlers that swallow errors

**Detection**: Log parsing must detect suppressed failures through:
- Analyzing shell script patterns
- Checking for missing expected error output
- Validating log completeness

**Result**: If suppression is detected, status = FAILED, QA cannot pass.

### Silent Error

A **silent error** occurs when:

1. **No Output for Expected Operations**
   - Build runs but produces no build output
   - Tests run but produce no test output
   - Linter runs but produces no lint output

2. **Missing Log Files**
   - /tmp/build.log not created when build runs
   - /tmp/lint.log not created when lint runs
   - /tmp/test.log not created when tests run

3. **Incomplete Logs**
   - Log file ends unexpectedly
   - No completion marker in log
   - Process terminates without final status

4. **Timeout Errors**
   - Process runs longer than expected without output
   - Hanging processes without error messages

**Detection**: Monitor for:
- Expected log files exist
- Log files have minimum expected content
- Log files contain completion markers

**Result**: If silent error is detected, status = FAILED, QA cannot pass.

### Missing Error Parsing

**Missing error parsing** occurs when:

1. **Logs Not Analyzed**
   - Build log exists but not parsed
   - Lint log exists but not parsed
   - Test log exists but not parsed

2. **Insufficient Pattern Matching**
   - Error patterns not comprehensive
   - New error formats not recognized
   - Error messages in unexpected format

3. **Log Parsing Failures**
   - Log parser throws exception
   - Log parser returns incomplete results
   - Log parser skips sections of log

**Prevention**: 
- QA MUST parse all log files
- QA MUST use comprehensive error patterns
- QA MUST validate parsing completeness
- QA MUST fail if log parsing fails

**Result**: If log parsing is incomplete or missing, status = FAILED, QA cannot pass.

## QA Integration Requirements

### Log Parsing is Mandatory

QA MUST parse the following logs:

1. **Build Log** (`/tmp/build.log`)
   - Captures: `npm run build` or `next build` output
   - Must be parsed for all error patterns
   - Must detect build failures, warnings, errors

2. **Lint Log** (`/tmp/lint.log`)
   - Captures: `npm run lint` or `next lint` output
   - Must be parsed for lint errors and warnings
   - Must detect code quality issues

3. **Test Log** (`/tmp/test.log`)
   - Captures: `npm test` or test runner output
   - Must be parsed for test failures and errors
   - Must detect runtime errors during tests

### Error Pattern Detection

QA MUST fail if ANY of the following appear in logs (unless whitelisted):

- `ERR` (error indicator)
- `ERROR` (case insensitive)
- `WARN` (warning indicator, policy: zero warnings)
- `Warning:` (warning message)
- `TypeError:` (runtime type error)
- `ReferenceError:` (reference error)
- `Build failed` (build failure)
- `Compilation error` (compilation failure)
- `Failed to compile` (compilation failure)
- `✖` (error indicator in terminal output)
- `⚠` (warning indicator in terminal output)

### Warning Whitelist

Warnings MAY be allowed if explicitly whitelisted:

**Whitelist File**: `foreman/qa/allowed-warnings.json`

```json
{
  "build": [
    "webpack compiled with 1 warning (this specific warning is expected)"
  ],
  "lint": [
    "@next/next/no-html-link-for-pages is disabled in this file for legacy support"
  ],
  "test": []
}
```

Warnings NOT in whitelist = QA FAIL.

### Zero-Warning Build Policy

**Default Policy**: ZERO WARNINGS ALLOWED

Unless a warning is explicitly whitelisted:
- Build warnings → QA FAIL
- Lint warnings → QA FAIL
- TypeScript warnings → QA FAIL
- Unused variables → QA FAIL
- Deprecated APIs → QA FAIL

This prevents gradual erosion of quality.

### Vercel Deployment Simulation

QA MUST include Vercel deployment simulation:

1. **Production Build**
   - Run: `next build` in production mode
   - Must succeed with zero errors
   - Must succeed with zero warnings (unless whitelisted)

2. **Production Lint**
   - Run: `next lint --strict` 
   - Must pass with zero errors
   - Must pass with zero warnings (unless whitelisted)

3. **Strict Mode Validation**
   - TypeScript strict mode enabled
   - React strict mode enabled
   - All strict checks must pass

4. **Build Output Validation**
   - Verify build artifacts created
   - Verify no broken imports
   - Verify no runtime initialization errors

If ANY Vercel simulation check fails → QA FAIL.

## Enforcement Mechanism

### QA Gate Enforcement

1. **Pre-QA Validation**
   - Verify all required logs exist
   - Verify logs are parseable
   - Verify log parsing completes successfully

2. **Log Parsing Execution**
   - Parse each log file for error patterns
   - Check against whitelist
   - Aggregate all failures

3. **QA Status Determination**
   ```typescript
   if (buildErrors.length > 0) → QA FAIL
   if (lintErrors.length > 0) → QA FAIL
   if (testErrors.length > 0) → QA FAIL
   if (unwhitelistedWarnings.length > 0) → QA FAIL
   if (vercelSimulationFails) → QA FAIL
   if (logParsingFails) → QA FAIL
   
   else → QA PASS
   ```

4. **Post-QA Reporting**
   - Log all detected errors
   - Include error context (file, line, message)
   - Store in QA results for PR description
   - Display in QA dashboard

### Handover Refusal

**Foreman MUST refuse handover if QA fails.**

Handover refusal means:
- No PR creation
- No code merge
- Build sequence marked as FAILED
- Admin notified of QA failures
- Logs provided for debugging

**Johan never again sees a "green QA" with underlying failures.**

## Governance Memory Integration

### QA Miss Tracking

When a failure is missed (QA passes but failure exists), governance memory MUST store:

1. **Missed Signal**
   - What error was missed
   - What log file it appeared in
   - What error pattern should have caught it

2. **Root Cause**
   - Why was the error missed
   - Was the pattern missing?
   - Was log parsing incomplete?
   - Was whitelist too permissive?

3. **Architectural Gap**
   - What architectural rule was missing
   - How should the system prevent this in future

4. **QA Gap**
   - What QA check was missing
   - How should QA be enhanced

5. **Enforcement Rule Added**
   - New error pattern added to detection
   - New QA check added to pipeline
   - Documentation updated

This creates Foreman's learning mechanism, preventing recurrence.

## Auto-Propagation to Future Apps

### Template Integration

These QA rules MUST be in:

1. **Global Architecture Template**
   - New projects inherit quality integrity contract
   - Build/lint/test requirements documented
   - Zero-warning policy enforced

2. **QA Template**
   - Log parsing QA included by default
   - Error patterns comprehensive
   - Vercel simulation included

3. **Project Scaffolding**
   - `.qa-config.json` created with rules
   - `allowed-warnings.json` created (empty by default)
   - QA scripts added to package.json

4. **Foreman Behavior**
   - All future apps get these QA checks
   - No app can opt-out of quality integrity
   - Ensures systemic evolution

## Exit Criteria Validation

The Quality Integrity Contract is complete when:

- ✅ Architecture updated with this document
- ✅ QA suite updated with log parsing and error detection
- ✅ Zero-warning policy enforced
- ✅ Vercel simulation included
- ✅ Governance memory tracks QA misses
- ✅ Future apps inherit these rules automatically
- ✅ QA cannot pass unless logs are 100% clean
- ✅ QA dashboard shows build/lint/test errors
- ✅ Foreman refuses handover if any failure present

---

*This Quality Integrity Contract ensures that QA is the absolute gatekeeper for quality, with no escape hatches or hidden failures.*
