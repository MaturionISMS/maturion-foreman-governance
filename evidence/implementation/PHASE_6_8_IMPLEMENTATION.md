# Phase 6 & 8 Implementation Guide

## Phase 6: Pre-flight Validation ✅ COMPLETE

Pre-flight validation ensures environment alignment BEFORE PR creation, preventing misaligned code from entering the pipeline.

### What It Does

1. **Environment Alignment Check** - Validates Foreman and GitHub environments match
2. **Workflow Alignment Check** - Ensures `.github/workflows/qiel.yml` matches config
3. **Node Version Check** - Confirms correct Node.js version is installed
4. **Dependencies Check** - Verifies all required npm scripts exist
5. **Governance Memory Logging** - Records all mismatches for traceability
6. **PR Blocking** - Prevents PR creation if misalignment detected

### Usage

#### Command Line
```bash
# Run pre-flight validation
npm run qa:preflight

# Exit code 0 = Safe to create PR
# Exit code 1 = PR creation blocked
```

#### Pre-commit Hook (Optional)
Add to `.git/hooks/pre-push`:
```bash
#!/bin/bash
npm run qa:preflight || {
  echo "❌ Pre-flight validation failed - push blocked"
  exit 1
}
```

#### Manual Validation Before PR
```bash
# 1. Run pre-flight validation
npm run qa:preflight

# 2. If failed, fix mismatches
npm run qa:diff  # See details

# 3. Re-run validation
npm run qa:preflight

# 4. Create PR only if passed
```

### Output Example

**Success**:
```
╔═══════════════════════════════════════════════════════╗
║   QIEL Pre-flight Validation                         ║
║   Validating environment before PR creation          ║
╚═══════════════════════════════════════════════════════╝

[Preflight] Check 1: Environment alignment...
✅ Environment alignment check PASSED

[Preflight] Check 2: GitHub workflow alignment...
✅ Workflow alignment check PASSED

[Preflight] Check 3: Node.js version...
✅ Node version check PASSED: 20

[Preflight] Check 4: Dependencies...
✅ Dependencies check PASSED

═══════════════════════════════════════════════════════
  QIEL Pre-flight Validation Report
═══════════════════════════════════════════════════════

Timestamp: 2024-12-08T07:40:00.000Z
Status: ✅ PASSED
PR Creation: ✅ ALLOWED

Checks:
  Environment Alignment: ✅
  Workflow Alignment: ✅
  Node Version: ✅
  Dependencies: ✅

✅ ENVIRONMENT VALIDATED
Safe to create pull request.
```

**Failure**:
```
╔═══════════════════════════════════════════════════════╗
║   QIEL Pre-flight Validation                         ║
║   Validating environment before PR creation          ║
╚═══════════════════════════════════════════════════════╝

[Preflight] Check 1: Environment alignment...
❌ Environment alignment check FAILED

[Preflight] Check 2: GitHub workflow alignment...
❌ Workflow alignment check FAILED

[Preflight] Check 3: Node.js version...
✅ Node version check PASSED: 20

[Preflight] Check 4: Dependencies...
✅ Dependencies check PASSED

═══════════════════════════════════════════════════════
  QIEL Pre-flight Validation Report
═══════════════════════════════════════════════════════

Timestamp: 2024-12-08T07:40:00.000Z
Status: ❌ FAILED
PR Creation: 🚫 BLOCKED

Checks:
  Environment Alignment: ❌
  Workflow Alignment: ❌
  Node Version: ✅
  Dependencies: ✅

Mismatches Detected:
  1. Node version mismatch in workflow
  2. QIW thresholds differ

Recommendations:
  1. Update .github/workflows/qiel.yml to match lib/foreman/qiel-config.ts
  2. Run "npm run qa:diff" to verify alignment

⚠️  PR CREATION BLOCKED
Fix all mismatches before creating a pull request.
Run "npm run qa:diff" to verify alignment.

Per True North Philosophy:
  - Configuration drift is not permitted
  - All environments must be identical
  - Zero tolerance for misalignment
═══════════════════════════════════════════════════════
```

### Governance Memory

All pre-flight validations are logged to `memory/foreman/preflight-validations.json`:

```json
[
  {
    "id": "preflight-1733645678000",
    "timestamp": "2024-12-08T07:40:00.000Z",
    "passed": false,
    "checks": {
      "environmentAlignment": false,
      "workflowAlignment": false,
      "nodeVersion": true,
      "dependencies": true
    },
    "mismatches": [
      "Node version mismatch in workflow",
      "QIW thresholds differ"
    ],
    "recommendations": [
      "Update .github/workflows/qiel.yml to match lib/foreman/qiel-config.ts"
    ],
    "blocksPR": true,
    "type": "preflight-validation"
  }
]
```

This provides:
- **Traceability**: Every validation attempt is recorded
- **History**: Track configuration drift over time
- **Debugging**: Understand what was misaligned and when

---

## Phase 8: CI/CD Integration ✅ COMPLETE

CI/CD integration automatically validates QIEL configuration changes and blocks merges if drift is detected.

### What It Does

1. **Automatic Validation** - Runs on every PR that touches QIEL config
2. **Drift Detection** - Compares `qiel-config.ts` with `qiel.yml`
3. **Blocking Mechanism** - Fails CI if misalignment detected
4. **PR Comments** - Posts alignment status directly on PR
5. **Artifact Upload** - Saves diff reports for review
6. **Merge Queue Protection** - Ensures only aligned code reaches main

### Workflow Triggers

The validation workflow (`.github/workflows/qiel-config-validation.yml`) runs when:

1. **Pull Request** targeting `main` or `develop` with changes to:
   - `lib/foreman/qiel-config.ts`
   - `.github/workflows/qiel.yml`
   - `lib/foreman/qa/**`
   - `lib/foreman/watchdog/**`
   - `lib/foreman/memory/drift-monitor.ts`

2. **Push** to `main` or `develop` with changes to:
   - `lib/foreman/qiel-config.ts`
   - `.github/workflows/qiel.yml`

### Workflow Steps

1. **Checkout** - Get latest code
2. **Setup Node** - Install Node.js 20
3. **Install Dependencies** - Run `npm ci`
4. **Run Diff** - Execute `npm run qa:diff`
5. **Check Alignment** - Parse diff output for misalignment
6. **Upload Artifact** - Save diff report
7. **Comment on PR** - Post alignment status
8. **Block if Failed** - Exit with code 1 if misaligned

### PR Comment Example

**Aligned**:
```markdown
## ✅ QIEL Configuration Validation

**Status**: ALIGNED

✅ QIEL configuration is properly synchronized across all environments.

<details>
<summary>View Full Diff Report</summary>

...diff report...

</details>
```

**Misaligned**:
```markdown
## ❌ QIEL Configuration Validation

**Status**: MISALIGNED

⚠️ **BLOCKING**: QIEL configuration changes detected but not synchronized.

**Action Required**:
1. Update `lib/foreman/qiel-config.ts` to match `.github/workflows/qiel.yml`
2. Or update `.github/workflows/qiel.yml` to match `lib/foreman/qiel-config.ts`
3. Run `npm run qa:diff` locally to verify alignment

Per **True North Philosophy**, configuration drift is not permitted.

<details>
<summary>View Full Diff Report</summary>

...diff report with differences...

</details>
```

### Integration with Merge Queue

The workflow integrates with GitHub's merge queue:

1. **Required Check** - Add to branch protection rules
2. **Merge Blocking** - PR cannot merge if validation fails
3. **Status Badge** - Shows alignment status on PR

### Setup Instructions

#### 1. Enable Workflow
The workflow is automatically enabled when the file exists in `.github/workflows/`.

#### 2. Add to Branch Protection
In GitHub repository settings:

1. Go to **Settings** → **Branches** → **Branch protection rules**
2. Add rule for `main` and `develop`
3. Enable **Require status checks to pass before merging**
4. Add check: **Validate QIEL Configuration Alignment**
5. Enable **Require branches to be up to date before merging**

#### 3. Configure Merge Queue (Optional)
1. Go to **Settings** → **Merge queue**
2. Enable for `main` branch
3. Add **Validate QIEL Configuration Alignment** as required check

### Workflow Permissions

Required permissions in workflow:
- `contents: read` - Read repository code
- `pull-requests: write` - Comment on PRs
- `issues: write` - Create QI incidents

### Monitoring

#### View Workflow Runs
1. Go to **Actions** tab
2. Select **QIEL Config Validation** workflow
3. View run history and status

#### Download Diff Reports
1. Open failed workflow run
2. Scroll to **Artifacts** section
3. Download `qiel-diff-report`

### Troubleshooting

#### Issue: Workflow not running
**Cause**: File paths don't match trigger patterns

**Solution**: Ensure changes touch one of:
- `lib/foreman/qiel-config.ts`
- `.github/workflows/qiel.yml`
- Files in `lib/foreman/qa/` or `lib/foreman/watchdog/`

#### Issue: False positive misalignment
**Cause**: Local environment differs from CI

**Solution**:
```bash
# Run locally to debug
npm run qa:diff

# Check Node version matches
node --version  # Should be v20.x
```

#### Issue: Cannot merge despite aligned config
**Cause**: Workflow failed for other reasons

**Solution**: Check workflow logs in Actions tab

---

## Combined Usage Flow

### Development Workflow

1. **Before Making Changes**
   ```bash
   npm run qa:diff  # Verify current alignment
   ```

2. **Make Changes**
   - Edit `lib/foreman/qiel-config.ts`
   - Update QIW thresholds, drift rules, etc.

3. **Update Workflow** (if needed)
   - Edit `.github/workflows/qiel.yml`
   - Match config changes

4. **Pre-flight Validation**
   ```bash
   npm run qa:preflight  # MUST pass before PR
   ```

5. **Create PR**
   - PR automatically triggers QIEL Config Validation workflow
   - Workflow comments on PR with status

6. **CI Validation**
   - Workflow runs `qa:diff` in CI
   - Blocks merge if misaligned
   - Uploads diff report as artifact

7. **Fix if Failed**
   ```bash
   # See what's misaligned
   npm run qa:diff
   
   # Fix mismatches
   # (edit qiel-config.ts or qiel.yml)
   
   # Verify fix
   npm run qa:preflight
   
   # Push fix
   git push
   ```

8. **Merge** (only if CI passes)

### Maintenance Workflow

#### Updating QIEL Configuration

1. **Plan Change**
   - Document what threshold/rule is changing
   - Understand impact on both Foreman and GitHub

2. **Update Config**
   ```typescript
   // lib/foreman/qiel-config.ts
   export const QIEL_CONFIG = {
     qiw: {
       blockOnErrors: true,  // Changed from false
       // ...
     }
   };
   ```

3. **Update Workflow**
   ```yaml
   # .github/workflows/qiel.yml
   - name: Check QIEL errors
     run: |
       if grep "ERROR" /tmp/build.log; then
         exit 1  # Now blocking
       fi
   ```

4. **Validate Locally**
   ```bash
   npm run qa:diff      # Should show ALIGNED
   npm run qa:preflight # Should pass
   ```

5. **Commit Both**
   ```bash
   git add lib/foreman/qiel-config.ts .github/workflows/qiel.yml
   git commit -m "feat: Enable error blocking in QIW"
   ```

6. **Create PR**
   - CI validates alignment
   - Review diff report in PR comment
   - Merge if validated

---

## Files Created

### Workflows
- `.github/workflows/qiel-config-validation.yml` - CI/CD validation workflow

### Scripts
- `scripts/pre-flight-validation.ts` - Pre-flight validation script

### Package.json
- Added `qa:preflight` script

### Documentation
- This file: Implementation guide

---

## Compliance

### True North Philosophy ✅
- **One Source of Truth**: `lib/foreman/qiel-config.ts`
- **Zero Drift**: Validated before PR creation and in CI
- **Traceability**: All validations logged to governance memory

### One Build Law ✅
- **Identical Builds**: Same config in Foreman and GitHub
- **Identical Validation**: Same checks everywhere
- **Identical Enforcement**: CI blocks misalignment

### Governance Safety Rails ✅
- **Pre-flight Blocking**: Prevents misaligned PRs
- **CI Blocking**: Prevents misaligned merges
- **Memory Logging**: Complete audit trail

---

## Expected Outcomes

### Before Phase 6 & 8
- ❌ Configuration drift not detected until merge
- ❌ PRs created with misaligned config
- ❌ Merge queue failures
- ❌ No audit trail of mismatches

### After Phase 6 & 8
- ✅ Misalignment detected before PR creation
- ✅ PRs blocked if environment misaligned
- ✅ CI validates every config change
- ✅ Complete governance memory of all validations
- ✅ Zero configuration drift
- ✅ 100% alignment between environments

---

## Summary

**Phase 6 (Pre-flight Validation)**:
- Validates BEFORE PR creation
- Logs to governance memory
- Provides immediate feedback
- Command: `npm run qa:preflight`

**Phase 8 (CI/CD Integration)**:
- Validates IN CI pipeline
- Comments on PRs
- Blocks merge if misaligned
- Workflow: `.github/workflows/qiel-config-validation.yml`

Together, they create **multiple layers of protection** against configuration drift, ensuring **True North Philosophy** compliance at every stage of the development workflow.
