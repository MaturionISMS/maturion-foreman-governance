# QIW Threshold Unification

## Overview

This document describes the unification of Quality Integrity Watchdog (QIW) thresholds across all environments to ensure **IDENTICAL** anomaly detection in Foreman and GitHub Actions.

## Problem Statement

Prior to unification:
- **Foreman's QIW** ignored anomalies that GitHub flagged
- **GitHub's QIW** reported anomalies Foreman missed
- **Result**: False positives, false negatives, QI Incident storms

This created:
- 90+ Quality Integrity Incidents in a single night
- Merge queue failures when Foreman certified PR as safe
- Environmental drift between local and CI

## Solution: Unified QIW Configuration

All QIW thresholds are now defined in:

```
lib/foreman/qiel-config.ts → QIEL_CONFIG.qiw
```

## Unified QIW Thresholds

### Blocking Behavior

```typescript
{
  blockOnCritical: true,   // HALT on critical anomalies
  blockOnErrors: true,     // HALT on error anomalies
  blockOnWarnings: false,  // Zero-warning enforced separately
}
```

**Meaning**:
- **Critical** anomaly → QA BLOCKED (cannot merge)
- **Error** anomaly → QA BLOCKED (cannot merge)
- **Warning** anomaly → Logged, but enforced via Zero-Warning Policy

### Monitored Channels

Both Foreman and GitHub monitor **identical** channels:

```typescript
enabledChannels: [
  'build',
  'lint',
  'test',
  'deployment_simulation',
  'runtime_initialization',
]
```

Each channel has its own log file and error patterns.

## Error Pattern Alignment

### Build Channel Errors

Identical regex patterns for detecting build errors:

```typescript
errorPatterns: {
  build: [
    '\\bERROR\\b',           // Generic ERROR keyword
    '\\bError:',             // Error: prefix
    'Build failed',          // Build failure message
    'Compilation error',     // Compilation issues
    'Failed to compile',     // Compilation failure
    'TypeError:',            // JavaScript type errors
    'ReferenceError:',       // Reference errors
    'SyntaxError:',          // Syntax errors
    'error TS\\d{4}:',       // TypeScript error codes (e.g., error TS2345)
    'Module not found',      // Missing modules
    'Cannot find module',    // Import errors
    'Unexpected token',      // Parsing errors
  ],
}
```

### Lint Channel Errors

```typescript
errorPatterns: {
  lint: [
    '\\berror\\b',           // ESLint error keyword
    '✖',                     // ESLint error symbol
    '\\d+:\\d+\\s+error',    // Line:col error format
  ],
}
```

### Test Channel Errors

```typescript
errorPatterns: {
  test: [
    '\\bFAIL\\b',            // Test failure
    '\\bfailed\\b',          // Failed test
    '\\bERROR\\b',           // Test error
    'TypeError:',            // Runtime type errors
    'ReferenceError:',       // Reference errors in tests
    'AssertionError:',       // Failed assertions
    'Test.*failed',          // Test failure messages
    '\\d+ failing',          // Count of failing tests
  ],
}
```

### Deployment Simulation Errors

```typescript
errorPatterns: {
  deployment_simulation: [
    '\\bERROR\\b',
    'Build failed',
    'Deployment failed',
    'Failed to start',
    'Error:',
  ],
}
```

### Runtime Initialization Errors

```typescript
errorPatterns: {
  runtime_initialization: [
    '\\bERROR\\b',
    'TypeError:',
    'ReferenceError:',
    'Failed to initialize',
    'Unhandled.*exception',
  ],
}
```

## Warning Pattern Alignment

### Build Channel Warnings

```typescript
warningPatterns: {
  build: [
    '\\bWARN\\b',
    '\\bWarning:',
    '⚠',
    'warning TS\\d{4}:',     // TypeScript warnings
    'deprecated',            // Deprecated API usage
  ],
}
```

### Lint Channel Warnings

```typescript
warningPatterns: {
  lint: [
    '\\bwarning\\b',
    '⚠',
    '\\d+:\\d+\\s+warning',
  ],
}
```

### Test Channel Warnings

```typescript
warningPatterns: {
  test: [
    '\\bskipped\\b',         // Skipped tests
    '\\bpending\\b',         // Pending tests
    '\\bWARN\\b',
  ],
}
```

## Deprecated API Detection

Unified patterns for detecting deprecated API usage:

```typescript
deprecatedApiPatterns: [
  'deprecated',
  'DeprecationWarning',
  'DEPRECATED',
  'will be removed',
  'is deprecated',
  'use .* instead',
]
```

**Action**: When detected:
1. Log as **warning** in QIW report
2. Add to governance memory
3. Suggest migration path
4. Block merge if not whitelisted

## Stale Pattern Detection

Unified threshold for stale pattern detection:

```typescript
stalePatternThresholdDays: 180  // 6 months
```

Patterns older than 180 days trigger:
- Drift Monitor warning
- Recommendation to review/update
- Governance memory entry

## Anomaly Severity Classification

### Critical

**Definition**: Execution must halt immediately

**Examples**:
- Missing log file
- Log file parse error
- Governance rule violation
- High-confidence contradiction

**Action**:
- QA BLOCKED
- PR creation BLOCKED
- Immediate resolution required

### Error

**Definition**: Needs immediate attention

**Examples**:
- Build error (TypeScript, compilation)
- Lint error
- Test failure
- Schema mismatch

**Action**:
- QA BLOCKED
- Logged to governance memory
- QI Incident created
- Regression test generated

### Warning

**Definition**: Should be reviewed

**Examples**:
- Deprecated API usage
- TypeScript warning
- Skipped tests
- Unwhitelisted warning

**Action**:
- Logged to QIW report
- Zero-Warning Policy enforcement
- May block merge if unwhitelisted

### Info

**Definition**: Informational only

**Examples**:
- Stale pattern (not critical)
- Old project memory
- Minor drift

**Action**:
- Logged only
- Does not block QA

## Context Capture

When an anomaly is detected, QIW captures:

```typescript
{
  id: 'qiw-1733645678-abc123def',
  channel: 'build',
  severity: 'error',
  description: 'Error detected in build log',
  logFile: '/tmp/build.log',
  lineNumber: 42,
  logLine: 'error TS2345: Argument of type...',
  context: '...\n  40: function example() {\n  41:   const x = 1;\n→ 42:   error TS2345...\n  43:   return x;\n  44: }\n...',
  pattern: 'error TS\\d{4}:',
  recommendation: 'Fix TypeScript error - check type definitions',
  blocksQA: true,
  detectedAt: '2024-12-08T06:30:00.000Z'
}
```

**Context size**: 2 lines before + 2 lines after anomaly

## Recommendation Engine

QIW provides **actionable** recommendations for each anomaly:

| Pattern | Recommendation |
|---------|----------------|
| `error TS\d{4}:` | Fix TypeScript error - check type definitions and usage |
| `Module not found` | Install missing dependency or fix import path |
| `deprecated` | Update to use non-deprecated API or whitelist if intentional |
| `Test.*failed` | Fix failing test - check test assertions and implementation |
| `Build failed` | Fix build error - check compilation errors and dependencies |
| `\berror\b` (lint) | Fix linting issue - follow code style or update eslint config |

## Governance Memory Integration

When QIW detects critical/error anomalies, it writes to governance memory:

```typescript
{
  whatFailed: 'Error detected in build log',
  where: 'build.log:42',
  why: 'TypeScript compilation error - type safety violation',
  recommendedFix: 'Fix TypeScript error - check type definitions',
  missingArchitectureRule: 'All code MUST pass TypeScript strict mode',
  channel: 'build',
  severity: 'error',
  timestamp: '2024-12-08T06:30:00.000Z',
  buildSequenceId: 'build-123',
  projectId: 'maturion-foreman-app'
}
```

This creates:
- **Traceability**: Every failure is logged
- **Learning**: Patterns emerge from repeated failures
- **Prevention**: Missing rules are identified

## Zero-Warning Policy Integration

QIW integrates with Zero-Warning Policy:

1. **QIW detects warnings** in logs
2. **Zero-Warning Policy** checks against whitelist
3. **Unwhitelisted warnings** → BLOCK merge

Whitelist location:
```
foreman/qa/allowed-warnings.json
```

Format:
```json
{
  "build": [
    "Specific warning message 1",
    "Specific warning message 2"
  ],
  "lint": [],
  "test": []
}
```

## Threshold Validation

Use the environment diff tool to validate QIW thresholds:

```bash
npm run qa:diff
```

Checks:
- ✅ Error patterns match between Foreman and GitHub
- ✅ Warning patterns match
- ✅ Blocking behavior matches
- ✅ Enabled channels match
- ✅ Deprecated API patterns match

## Testing QIW Alignment

### Test Case 1: Identical Error Detection

**Setup**:
1. Introduce TypeScript error
2. Run QIEL locally
3. Run QIEL on GitHub

**Expected**:
- Both detect **same** error
- Both report **same** severity
- Both **BLOCK** merge

### Test Case 2: Identical Warning Detection

**Setup**:
1. Introduce deprecated API usage
2. Run QIEL locally
3. Run QIEL on GitHub

**Expected**:
- Both detect **same** warning
- Both log to QIW report
- Both check whitelist
- Both have **same** blocking decision

### Test Case 3: No False Positives

**Setup**:
1. Clean codebase (no errors)
2. Run QIEL locally
3. Run QIEL on GitHub

**Expected**:
- Both report **ZERO** anomalies
- Both **PASS** QA
- Both allow merge

## Maintenance

### Adding New Error Pattern

1. Update `lib/foreman/qiel-config.ts`:
   ```typescript
   errorPatterns: {
     build: [
       ...existing,
       'NewErrorPattern',
     ],
   }
   ```

2. Validate alignment:
   ```bash
   npm run qa:diff
   ```

3. Test locally:
   ```bash
   npm run qiel:quick
   ```

4. Commit both config and tests

### Changing Threshold

1. Update in **one place** only: `qiel-config.ts`
2. Run environment diff to verify propagation
3. Test side-by-side runs
4. Document in governance memory

## Compliance

This unification ensures:
- ✅ **Identical** error detection in all environments
- ✅ **Identical** warning detection in all environments
- ✅ **Zero** false positives
- ✅ **Zero** false negatives
- ✅ **100%** agreement between Foreman and GitHub
- ✅ **Zero** overnight QI Incident storms
- ✅ **Traceability** via governance memory
- ✅ **Prevention** via regression tests

## References

- **QIW Configuration**: `lib/foreman/qiel-config.ts → QIEL_CONFIG.qiw`
- **QIW Implementation**: `lib/foreman/watchdog/quality-integrity-watchdog.ts`
- **Governance Memory Writer**: `lib/foreman/qa/qi-incident-writer.ts`
- **Environment Diff Tool**: `scripts/qiel-env-diff.ts`
