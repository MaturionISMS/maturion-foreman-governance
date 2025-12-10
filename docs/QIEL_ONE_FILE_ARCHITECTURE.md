# QIEL Architecture: One File, Zero Drift

## The Problem We Solved

Previously, we had **TWO** files defining QIEL behavior:

1. **`.github/workflows/qiel.yml`** (174 lines) - GitHub Actions workflow
   - Hardcoded: `npm run typecheck 2>&1 | tee /tmp/build.log`
   - Hardcoded: `npm run lint 2>&1 | tee /tmp/lint.log`  
   - Hardcoded: `npm run test:all 2>&1 | tee /tmp/test.log`
   - Manually maintained commands

2. **`lib/foreman/qiel-config.ts`** (520 lines) - Configuration
   - Same commands defined
   - Same log paths defined
   - "Single source of truth" (but not actually!)

**Result**: Configuration drift risk. If one file changes, the other might not.

## The Solution: One QIEL File

Now we have **ONE** file controlling QIEL behavior:

**`lib/foreman/qiel-config.ts`** (520 lines) - TRUE single source of truth
- Defines: buildCommands, logPaths, timeouts, error patterns, thresholds
- Used by: `npm run qiel:full` script

**`.github/workflows/qiel.yml`** (114 lines) - Just runs the same command
- Does: `npm run qiel:full`
- That's it. No command duplication.

## How It Works

### Foreman (Local Execution)
```bash
npm run qiel:full
  ↓
scripts/run-qiel.ts
  ↓
lib/foreman/qa/qiel-runner.ts
  ↓
lib/foreman/qiel-config.ts (reads config)
  ↓
Executes: typecheck, lint, test, etc.
```

### GitHub Actions (Merge Queue)
```bash
npm run qiel:full
  ↓
scripts/run-qiel.ts
  ↓
lib/foreman/qa/qiel-runner.ts
  ↓
lib/foreman/qiel-config.ts (reads SAME config)
  ↓
Executes: SAME typecheck, lint, test, etc.
```

## The Guarantee

**If Foreman's local QIEL passes, GitHub's merge QIEL MUST pass**

Why? Because they run THE EXACT SAME CODE with THE EXACT SAME CONFIG.

The only difference is the environment (local vs GitHub Actions), which is fine because:
- Same Node version (defined in qiel-config.ts)
- Same dependencies (package-lock.json)
- Same commands (defined in qiel-config.ts)
- Same log paths (defined in qiel-config.ts)
- Same error patterns (defined in qiel-config.ts)

## What The Watchdog Tests

The alignment watchdog (`tests/qic/qiel-alignment.test.ts`) now validates:

1. ✅ Workflow runs `npm run qiel:full` (not hardcoded commands)
2. ✅ Workflow uses Node version from qiel-config.ts
3. ✅ No duplicate command definitions

If these drift, the watchdog fails CI.

## Benefits

1. **Zero Configuration Drift**: Impossible to have different commands in different places
2. **Single Point of Update**: Change qiel-config.ts, both systems update
3. **Guaranteed Alignment**: Same QIEL file = same results
4. **Simpler Workflow**: GitHub workflow is now trivial (just run the script)
5. **Easier Maintenance**: One file to understand and modify

## Before and After

### Before (Drift Risk)
```yaml
# .github/workflows/qiel.yml
- run: npm run typecheck 2>&1 | tee /tmp/build.log  # ❌ Duplicate definition
- run: npm run lint 2>&1 | tee /tmp/lint.log       # ❌ Duplicate definition
- run: npm run test:all 2>&1 | tee /tmp/test.log   # ❌ Duplicate definition
```

```typescript
// lib/foreman/qiel-config.ts
buildCommands: {
  typecheck: 'npm run typecheck',  // ❌ Same command, different place
  lint: 'npm run lint',            // ❌ Same command, different place  
  test: 'npm run test:all',        // ❌ Same command, different place
}
```

### After (Zero Drift)
```yaml
# .github/workflows/qiel.yml
- run: npm run qiel:full  # ✅ ONE command, runs EVERYTHING from config
```

```typescript
// lib/foreman/qiel-config.ts
buildCommands: {
  typecheck: 'npm run typecheck',  // ✅ ONLY definition (used by both)
  lint: 'npm run lint',            // ✅ ONLY definition (used by both)
  test: 'npm run test:all',        // ✅ ONLY definition (used by both)
}
```

## The Root Cause Fix

This solves the original issue where:
- Foreman ran tests with `npx tsx --test` (runtime only)
- Didn't run `npm run qiel:full` (which includes `tsc --noEmit`)
- Merge QIEL caught errors that local validation missed

Now:
- **Foreman MUST run**: `npm run qiel:full` before handover
- **GitHub runs**: `npm run qiel:full` in merge queue
- **Same command = Same results = No surprises**

## Enforcement

To ensure this policy is followed:

1. **Pre-commit hook** (recommended): Run `npm run qiel:full` before allowing commits
2. **PR template** (recommended): Checklist item "Ran `npm run qiel:full` locally"
3. **Documentation** (this file): Clear guidance on the process
4. **Alignment tests** (existing): Validate workflow hasn't diverged

## Summary

**One QIEL File (`lib/foreman/qiel-config.ts`) = Zero Drift**

Both Foreman and GitHub Actions execute the same script (`npm run qiel:full`), which reads the same configuration, ensuring identical validation in both environments.

No more duplicate definitions. No more drift. No more surprises.
