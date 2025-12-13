# QIEL Environment Alignment

## Overview

This document describes how Foreman's internal QIEL pipeline and GitHub's merge-queue QIEL pipeline have been unified to ensure **IDENTICAL** results in both environments.

## Problem Statement

Prior to this alignment, Foreman and GitHub had diverged:

- **Foreman** used synthetic logs and different thresholds
- **GitHub** used real build/lint/test logs
- **Result**: Foreman would report `QIEL PASS` while GitHub reported `QIEL FAIL`
- **Impact**: 90+ Quality Integrity Incidents generated overnight, failed merges

This violated:
- **True North Philosophy**: One source of truth
- **One Build Law**: Same build everywhere
- **Governance Safety Rails**: Configuration drift

## Solution: Unified Configuration

### Single Source of Truth

All QIEL configuration is now defined in:

```
lib/foreman/qiel-config.ts
```

This file contains:
- Node.js version requirement
- Log file paths
- QIW (Quality Integrity Watchdog) thresholds
- Drift Monitor configuration
- QIEL execution settings
- Build commands
- Governance memory settings

### Configuration Consumption

#### Foreman Consumption
```typescript
import { QIEL_CONFIG } from '@/lib/foreman/qiel-config';

// Use unified log paths
const buildLog = QIEL_CONFIG.logPaths.build;  // /tmp/build.log

// Use unified Node version
const nodeVersion = QIEL_CONFIG.nodeVersion;  // '20'

// Use unified QIW thresholds
const blockOnErrors = QIEL_CONFIG.qiw.blockOnErrors;  // true
```

#### GitHub Actions Consumption
`.github/workflows/qiel.yml` references the same configuration values:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Must match QIEL_CONFIG.nodeVersion

- name: Run TypeScript typecheck
  run: npm run typecheck 2>&1 | tee /tmp/build.log  # Must match QIEL_CONFIG.logPaths.build
```

## Key Alignment Points

### 1. Log Generation (CRITICAL CHANGE)

**Before**: Foreman used synthetic logs
```typescript
// OLD - DO NOT USE
const fakeBuildLog = "Build complete (simulated)";
```

**After**: Foreman runs ACTUAL commands
```typescript
// NEW - ACTUAL COMMAND EXECUTION
import { generateAllLogs } from '@/lib/foreman/qa/log-generator';

const result = generateAllLogs(projectDir);
// Runs: npm run typecheck 2>&1 | tee /tmp/build.log
// Runs: npm run lint 2>&1 | tee /tmp/lint.log
// Runs: npm run test:all 2>&1 | tee /tmp/test.log
```

### 2. Node Version Alignment

Both environments MUST use Node.js version **20**.

- **Local**: Check with `npm run qa:diff`
- **GitHub**: Defined in `.github/workflows/qiel.yml`
- **Config**: `QIEL_CONFIG.nodeVersion = '20'`

### 3. Log Path Alignment

All logs MUST be written to `/tmp/` directory:

| Log Type | Path |
|----------|------|
| Build | `/tmp/build.log` |
| Lint | `/tmp/lint.log` |
| Test | `/tmp/test.log` |

These paths are **identical** in:
- Foreman's log generator
- GitHub Actions workflow
- QIEL configuration

### 4. QIW Threshold Alignment

Quality Integrity Watchdog uses identical thresholds:

```typescript
{
  blockOnCritical: true,    // Block on any critical anomaly
  blockOnErrors: true,      // Block on any error
  blockOnWarnings: false,   // Zero-warning policy enforced separately
}
```

Error patterns are **identical**:
- TypeScript errors: `error TS\d{4}:`
- Module errors: `Module not found`, `Cannot find module`
- Build errors: `Build failed`, `Compilation error`

### 5. Drift Monitor Alignment

Drift Monitor uses identical thresholds:

```typescript
{
  stalenessThresholds: {
    reasoningPatterns: 180,   // 6 months
    architectureLessons: 365, // 1 year
    issues: 90,               // 3 months
    projectMemory: 30,        // 1 month
  },
  errorThreshold: 3,          // Block if >= 3 errors
  blockOnCritical: true,
  blockOnMultipleErrors: true,
}
```

### 6. Build Command Alignment

Both environments run **identical** commands:

| Stage | Command |
|-------|---------|
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Test | `npm run test:all` |

Commands are defined in `QIEL_CONFIG.execution.buildCommands`.

## Environment Diff Tool

Use the environment diff tool to validate alignment:

```bash
npm run qa:diff
```

This tool checks:
- ✅ Node version matches
- ✅ GitHub workflow configuration matches
- ✅ Package.json scripts exist
- ✅ Log directory exists
- ✅ Environment variables are set

### Exit Codes

- **0**: Environments are ALIGNED → Safe to merge
- **1**: Environments are MISALIGNED → Blocks PR creation

### Example Output

```
✅ ✅ ✅ ENVIRONMENTS ARE ALIGNED ✅ ✅ ✅

Foreman and GitHub Actions use IDENTICAL configuration.
QIEL will produce IDENTICAL results in both environments.

Summary:
  - Total Differences: 0
  - Status: PASS
  - Safe to merge: YES
```

## Pre-flight Validation

Before creating a PR, Foreman should run:

```typescript
import { validateGitHubWorkflowAlignment } from '@/lib/foreman/qiel-config';

const validation = validateGitHubWorkflowAlignment();

if (!validation.aligned) {
  console.error('❌ Environment mismatch detected!');
  console.error('Differences:', validation.differences);
  // BLOCK PR creation
  throw new Error('Environment alignment required before PR creation');
}
```

## Governance Memory Updates

All alignment changes are logged to governance memory:

```typescript
{
  whatChanged: "QIEL configuration unified",
  where: "lib/foreman/qiel-config.ts",
  why: "Eliminate drift between Foreman and GitHub",
  impact: "Zero false positives, zero false negatives",
  timestamp: "2024-12-08T06:00:00.000Z"
}
```

## Testing & Validation

### Side-by-Side QIEL Runs

To validate identical results:

1. Run QIEL locally:
   ```bash
   npm run qiel:quick
   ```

2. Check GitHub Actions QIEL run on same commit

3. Compare reports:
   - Same number of blockers
   - Same QI incidents
   - Same pass/fail status

### Expected Outcome

After alignment:
- ✅ **Zero** duplicated QI Incidents
- ✅ **Zero** overnight incident storms
- ✅ **100%** agreement between Foreman and GitHub
- ✅ **Zero** false positives
- ✅ **Zero** false negatives

## Maintenance

### When to Update Configuration

Update `lib/foreman/qiel-config.ts` when:
- Adding new QIW error patterns
- Changing drift thresholds
- Updating Node version
- Adding new QIEL checks
- Modifying timeout values

### CI Validation

CI automatically validates configuration alignment:

```yaml
- name: Validate QIEL Config Alignment
  run: npm run qa:diff
```

If `.github/workflows/qiel.yml` changes without updating `qiel-config.ts`, CI will **FAIL**.

## Troubleshooting

### Issue: Foreman PASS, GitHub FAIL

**Cause**: Configuration drift

**Solution**:
1. Run `npm run qa:diff`
2. Fix all reported differences
3. Re-run QIEL locally
4. Verify results match

### Issue: Different Node version

**Cause**: Local Node version ≠ GitHub Node version

**Solution**:
```bash
nvm install 20
nvm use 20
npm run qa:diff  # Verify
```

### Issue: Missing logs

**Cause**: Commands not executed, or wrong log path

**Solution**:
```bash
# Check log paths in config
cat lib/foreman/qiel-config.ts | grep logPaths

# Verify logs exist
ls -la /tmp/*.log
```

## References

- **Configuration**: `lib/foreman/qiel-config.ts`
- **GitHub Workflow**: `.github/workflows/qiel.yml`
- **Log Generator**: `lib/foreman/qa/log-generator.ts`
- **Environment Diff**: `scripts/qiel-env-diff.ts`
- **QIEL Runner**: `lib/foreman/qa/qiel-runner.ts`

## Compliance

This alignment ensures compliance with:
- ✅ **True North Philosophy**: One source of truth
- ✅ **One Build Law**: Same build everywhere
- ✅ **Governance Safety Rails**: Zero drift tolerance
- ✅ **Quality Integrity Contract**: Identical enforcement
- ✅ **Zero-Warning Policy**: Same thresholds everywhere
