# QA Template for New Projects

This template defines the standard QA configuration that ALL new Maturion projects must inherit.

## Required Files

### 1. `.qa-config.json`

```json
{
  "version": "1.0",
  "enforceQualityIntegrityContract": true,
  "logParsing": {
    "enabled": true,
    "requiredLogs": [
      "/tmp/build.log",
      "/tmp/lint.log",
      "/tmp/test.log"
    ],
    "errorPatterns": [
      "\\bERR\\b",
      "\\bERROR\\b",
      "\\bError:",
      "TypeError:",
      "ReferenceError:",
      "SyntaxError:",
      "RangeError:",
      "Build failed",
      "Compilation error",
      "Failed to compile",
      "\\bFAIL\\b",
      "\\bfailed\\b",
      "✖",
      "TS\\d{4}:"
    ],
    "warningPatterns": [
      "\\bWARN\\b",
      "\\bWarning:",
      "⚠",
      "warning\\s+TS\\d{4}:"
    ]
  },
  "zeroWarningPolicy": {
    "enabled": true,
    "enforceForBuild": true,
    "enforceForLint": true,
    "enforceForTypeScript": true,
    "enforceForUnusedVariables": true,
    "enforceForDeprecatedAPIs": true
  },
  "vercelSimulation": {
    "enabled": true,
    "productionBuild": true,
    "productionLint": true,
    "strictMode": true,
    "validateBuildOutput": true
  },
  "qaMissTracking": {
    "enabled": true,
    "storePath": "memory/qa-misses"
  }
}
```

### 2. `allowed-warnings.json`

Create in `qa/` or project root:

```json
{
  "build": [],
  "lint": [],
  "test": []
}
```

**Start with empty arrays.** Only add warnings after explicit approval and documentation.

### 3. QA Scripts in `package.json`

```json
{
  "scripts": {
    "qa:logs": "npx tsx scripts/qa-check-logs.ts",
    "qa:warnings": "npx tsx scripts/qa-check-warnings.ts",
    "qa:vercel": "npx tsx scripts/qa-vercel-simulation.ts",
    "qa:full": "npx tsx scripts/qa-full-check.ts",
    "precommit": "npm run qa:full"
  }
}
```

### 4. QA Check Scripts

Create `scripts/qa-full-check.ts`:

```typescript
import { runEnhancedQA } from '../lib/foreman/qa/enhanced-qa-runner';

async function runQA() {
  console.log('Running full QA check...');
  
  const result = runEnhancedQA({
    projectDir: process.cwd(),
    logsDir: '/tmp',
    skipVercelSimulation: false,
  });

  console.log(result.overallSummary);
  
  if (!result.passed) {
    console.error('QA FAILED - Fix issues before committing');
    console.error('Blockers:', result.blockersFound);
    process.exit(1);
  }
  
  console.log('QA PASSED ✅');
}

runQA();
```

## Integration with Build Pipeline

### Pre-Build Hook

Add to build process:

```bash
#!/bin/bash
# Pre-build QA check

# Run build and capture output
npm run build 2>&1 | tee /tmp/build.log

# Run lint and capture output
npm run lint 2>&1 | tee /tmp/lint.log

# Run tests and capture output
npm test 2>&1 | tee /tmp/test.log

# Run QA validation
npm run qa:logs
```

### CI/CD Integration

Add to `.github/workflows/qa.yml`:

```yaml
name: QA Validation

on: [push, pull_request]

jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with log capture
        run: npm run build 2>&1 | tee /tmp/build.log
      
      - name: Lint with log capture
        run: npm run lint 2>&1 | tee /tmp/lint.log
      
      - name: Test with log capture
        run: npm test 2>&1 | tee /tmp/test.log
      
      - name: Run QA validation
        run: npm run qa:full
      
      - name: Upload QA report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: qa-report
          path: /tmp/qa-report.md
```

## Enforcement Rules

### Mandatory Checks

All projects MUST enforce:

1. ✅ Build log parsing
2. ✅ Lint log parsing
3. ✅ Test log parsing
4. ✅ Zero-warning policy (unless whitelisted)
5. ✅ Vercel simulation (for Next.js projects)
6. ✅ QA miss tracking

### QA Failure = Build Failure

If QA fails, the build MUST fail. No exceptions.

```typescript
if (!qaResult.passed) {
  throw new Error('QA validation failed - see logs for details');
}
```

### Whitelist Approval Process

To add a warning to the whitelist:

1. Document WHY the warning is acceptable
2. Get architectural approval
3. Add to `allowed-warnings.json`
4. Include justification comment in file

Example:

```json
{
  "build": [
    "// Approved 2025-12-07: Known Next.js cache warning in CI environment",
    "No build cache found"
  ]
}
```

## Propagation Mechanism

### For New Projects

When scaffolding a new project:

```bash
# Copy QA template files
cp -r templates/qa/.qa-config.json ./
cp templates/qa/allowed-warnings.json ./qa/
cp -r templates/qa/scripts/ ./scripts/

# Update package.json with QA scripts
npm run setup:qa
```

### For Existing Projects

To retrofit QA to existing project:

```bash
# Install QA dependencies
npm install --save-dev tsx

# Copy QA modules
cp -r foreman-app/lib/foreman/qa/ ./lib/qa/

# Copy configuration
cp foreman-app/.qa-config.json ./

# Update package.json
# Add QA scripts manually
```

## Verification

After setup, verify QA is working:

```bash
# Test log parsing
npm run qa:logs

# Test zero-warning policy
npm run qa:warnings

# Test Vercel simulation
npm run qa:vercel

# Run full QA suite
npm run qa:full
```

All checks should PASS for a clean project.

## Continuous Improvement

### Learning from QA Misses

When a QA miss is detected:

1. System records it in `memory/qa-misses/`
2. Root cause analysis added
3. New pattern added to detection
4. All projects updated with new pattern

### Quarterly QA Review

Every quarter:

1. Review QA miss statistics
2. Update error patterns based on learnings
3. Refine whitelist (remove unnecessary entries)
4. Update this template with improvements

## Support

Questions about QA template:
- See: `foreman/governance/quality-integrity-contract.md`
- See: `foreman/qa/qa-enforcement.md`
- Contact: Architecture team
