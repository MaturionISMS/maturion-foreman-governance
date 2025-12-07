# Enhanced QA System

## Overview

The Enhanced QA System implements the **Quality Integrity Contract**, ensuring that NO build, lint, or runtime error can pass QA regardless of exit code.

## Components

### 1. Log Parsing QA (`lib/foreman/qa/log-parsing-qa.ts`)

Parses build, lint, and test logs to detect:
- Errors (ERR, ERROR, TypeError, ReferenceError, etc.)
- Warnings (WARN, Warning:, ⚠)
- TypeScript errors (TS#### error codes)
- Build failures
- Runtime errors

**Key Features:**
- Comprehensive error pattern matching
- Whitelist support for approved warnings
- Context capture around errors
- Detailed reporting

### 2. Zero-Warning Policy (`lib/foreman/qa/zero-warning-policy.ts`)

Enforces zero-warning policy across:
- Build warnings
- Lint warnings
- TypeScript warnings
- Unused variables
- Deprecated APIs

**Philosophy:** Warnings are errors waiting to happen. A clean build means ZERO warnings unless explicitly whitelisted.

### 3. Vercel Simulation QA (`lib/foreman/qa/vercel-simulation-qa.ts`)

Simulates Vercel deployment to catch deployment failures:
- Production build (`next build`)
- Production lint (`next lint`)
- TypeScript strict mode validation
- Build output artifact validation

Prevents "works on my machine" deployment failures.

### 4. QA Miss Tracker (`lib/foreman/memory/qa-miss-tracker.ts`)

Tracks instances where QA passed but failures existed:
- Records missed signals
- Analyzes root causes
- Identifies architectural gaps
- Tracks enforcement rules added
- Prevents recurrence

Creates a learning mechanism for continuous improvement.

### 5. Enhanced QA Runner (`lib/foreman/qa/enhanced-qa-runner.ts`)

Integrates all QA checks into single pipeline:
- Validates log files exist
- Parses all logs
- Enforces zero-warning policy
- Runs Vercel simulation (optional)
- Generates comprehensive reports

## Usage

### Quick QA (Logs Only)

```typescript
import { runQuickQA } from './lib/foreman/qa/enhanced-qa-runner';

const result = runQuickQA('/tmp');

if (!result.passed) {
  console.error('QA Failed:', result.blockersFound);
  process.exit(1);
}
```

### Full QA (Including Vercel Simulation)

```typescript
import { runFullQA } from './lib/foreman/qa/enhanced-qa-runner';

const result = runFullQA(
  process.cwd(), // project directory
  '/tmp'         // logs directory
);

if (!result.passed) {
  console.error('QA Failed:', result.overallSummary);
}
```

### Custom QA Configuration

```typescript
import { runEnhancedQA } from './lib/foreman/qa/enhanced-qa-runner';

const result = runEnhancedQA({
  projectDir: process.cwd(),
  logsDir: '/tmp',
  skipVercelSimulation: false,
  buildSequenceId: 'seq_123',
  projectId: 'proj_456',
});
```

## Configuration

### Allowed Warnings (`foreman/qa/allowed-warnings.json`)

Whitelist for approved warnings:

```json
{
  "build": [
    "No build cache found"
  ],
  "lint": [],
  "test": [
    "# Subtest:",
    "ok "
  ]
}
```

**Important:** Start with empty arrays. Only add warnings after explicit approval and documentation.

### Quality Integrity Contract

See: `foreman/governance/quality-integrity-contract.md`

Defines:
- Build failure criteria
- Lint failure criteria
- Runtime failure criteria
- Suppressed failure criteria
- Silent error criteria

## Testing

Run QA system tests:

```bash
npm run test:qa
```

Test coverage:
- Log parsing with various error types
- Warning detection and whitelist handling
- Zero-warning policy enforcement
- Error pattern matching
- Missing log file handling

## Integration

### Build Pipeline

```bash
#!/bin/bash
# Capture logs
npm run build 2>&1 | tee /tmp/build.log
npm run lint 2>&1 | tee /tmp/lint.log
npm test 2>&1 | tee /tmp/test.log

# Run QA
npx tsx scripts/qa-check.ts
```

### CI/CD

```yaml
- name: Run QA validation
  run: |
    npm run build 2>&1 | tee /tmp/build.log
    npm run lint 2>&1 | tee /tmp/lint.log
    npm test 2>&1 | tee /tmp/test.log
    npm run qa:full
```

### Pre-commit Hook

```bash
#!/bin/bash
# Pre-commit QA check
npm run qa:full || exit 1
```

## QA Results

### Passing QA

```
✅ Enhanced QA: ALL CHECKS PASSED - Quality Integrity Contract satisfied
```

All checks green:
- Logs exist ✅
- Log parsing passed ✅
- Zero-warning policy passed ✅
- Vercel simulation passed ✅

### Failing QA

```
❌ Enhanced QA: FAILED - 2 blockers found
```

Blockers listed with details:
- Which check failed
- What errors/warnings found
- Line numbers and context
- Remediation steps

## Governance

### QA Failure = Build Failure

**No exceptions.** If QA fails, the build MUST fail.

### Handover Refusal

Foreman MUST refuse handover if QA fails:
- No PR creation
- No code merge
- Build sequence marked FAILED
- Admin notified

### QA Miss Learning

When QA miss is detected:
1. Record in governance memory
2. Analyze root cause
3. Add missing pattern
4. Update all projects
5. Prevent recurrence

## Metrics

Track QA effectiveness:
- Total QA runs
- Pass rate
- Errors detected
- Warnings caught
- QA misses (should trend to zero)
- Time to detect issues

## Future Enhancements

Planned improvements:
- Machine learning for pattern detection
- Adaptive whitelist management
- Performance regression detection
- Security vulnerability scanning
- Accessibility validation
- Visual regression testing

## Support

For questions:
- See: `foreman/governance/quality-integrity-contract.md`
- See: `foreman/qa/qa-enforcement.md`
- See: `docs/qa-template-for-new-projects.md`
- Contact: Architecture team
