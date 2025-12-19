# Required User Actions: Enable Full Foreman Capabilities

**Generated**: 2025-12-10  
**Priority**: HIGH  
**Blocking**: ISMS Module Pattern Scanning

---

## Executive Summary

Foreman has completed a comprehensive Build Philosophy verification and identified **2 critical capabilities** that require user action to enable. This document specifies exactly what needs to be done to unlock full autonomous operation.

---

## Action 1: Enable ISMS Repository Access 🔒 CRITICAL

### Current Status
- ❌ **BLOCKED**: Cannot access `MaturionISMS/maturion-isms` repository
- **Error**: `404 Not Found` when attempting to read files
- **Impact**: Cannot scan ISMS module architectural patterns
- **Blocker for**: Architecture alignment verification (Build Philosophy Phase 2)

### Why This Matters
The Build Philosophy requires Foreman to:
1. Scan the ISMS repository's `architecture/modules/` directory
2. Analyze module architectural patterns
3. Align Foreman App architecture with ISMS patterns
4. Ensure consistency across the Maturion ecosystem

**Without this access, Foreman cannot complete the Build Philosophy verification task.**

---

### Solution Options

#### Option A: Verify and Approve Fine-Grained Token (RECOMMENDED IF YOU HAVE ONE)

**The Most Common Issue**: Fine-grained tokens require **organization approval** even when "All repositories" is selected.

**Quick Diagnosis**:
1. Go to [GitHub Settings → Personal access tokens (fine-grained)](https://github.com/settings/tokens?type=beta)
2. Click on your "Maturion Foreman" token
3. Look for "**Access on the MaturionISMS organization**" section
4. Check status:
   - ✅ Shows "Update" with "Cancel" = **Approved** (good!)
   - ⏳ Shows "Pending approval" = **Needs admin approval**
   - ❌ Shows "Request access" = **Not requested yet**

**If Status is Pending or Not Requested**:

1. **Request Organization Access**:
   - Click "Request access" or "Update" button for MaturionISMS
   
2. **Approve the Request** (you are the admin):
   - Go to: [Organization PAT Requests](https://github.com/organizations/MaturionISMS/settings/personal-access-tokens/pending_requests)
   - Find your token request
   - Click "Approve"
   - Wait 1-2 minutes for approval to take effect

3. **Verify Approval**:
   ```bash
   npx tsx scripts/validate-github-token.ts
   ```

4. **Update Environment Variables**:
   - Regenerate the token (optional but recommended after approval)
   - Update `.env.local` with the token
   - Update Vercel environment variables
   - Redeploy application

**Required Token Configuration**:
- ✅ **Repository access**: All repositories (current and future)
- ✅ **Organization**: MaturionISMS (must show as **approved**, not pending)
- ✅ **Permissions**:
  - Contents: Read and write
  - Pull requests: Read and write  
  - Issues: Read and write
  - Metadata: Read-only (mandatory)
  - Workflows: Read and write (if modifying GitHub Actions)
  - Variables: Read and write
  - Deployments: Read and write

**Advantages**:
- ✅ More secure (granular permissions)
- ✅ Better audit trail
- ✅ Modern GitHub best practice

**Disadvantages**:
- ⚠️ Requires organization approval step
- ⚠️ Slightly more complex setup

---

#### Option B: Use Classic Personal Access Token (SIMPLER ALTERNATIVE)

If fine-grained tokens continue to have approval issues, use a classic PAT:

**Steps**:
1. Go to [GitHub Settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Set the following scopes:
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Action workflows)
   - ✅ `read:org` (read organization data)
4. Generate and copy token immediately
5. Update `.env.local`:
   ```bash
   GITHUB_TOKEN=ghp_your_classic_token_here
   ```
6. Update Vercel environment variables
7. Verify access:
   ```bash
   npx tsx scripts/validate-github-token.ts
   ```

**Advantages**:
- ✅ **No organization approval required** - Works immediately
- ✅ Simpler setup
- ✅ Proven compatibility

**Disadvantages**:
- ⚠️ Less granular permissions
- ⚠️ Access to all repositories in all organizations

---

#### Option B: Install GitHub App with ISMS Access

**Steps**:
1. Go to the GitHub App settings
2. Update installation to include `maturion-isms` repository
3. **Required Permissions**:
   - ✅ Repository contents: Read
   - ✅ Repository metadata: Read
   - ✅ Pull requests: Read and write
   - ✅ Issues: Read and write
4. Update `.env` with installation details:
   ```bash
   GITHUB_APP_ID=your_app_id
   GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
   GITHUB_APP_INSTALLATION_ID=your_installation_id
   ```
5. Restart Foreman App

**Advantages**:
- ✅ More secure (granular permissions per repository)
- ✅ Better audit trail
- ✅ Automatic token renewal

**Disadvantages**:
- ⚠️ More complex setup
- ⚠️ Requires GitHub App configuration

---

#### Option C: Add to GitHub MCP Server Configuration

**Steps**:
1. Check if GitHub MCP Server has a configuration file
2. Add `maturion-isms` to allowed repositories
3. Ensure authentication is properly configured
4. Restart MCP Server

**Advantages**:
- ✅ Centralized access control

**Disadvantages**:
- ⚠️ Depends on MCP Server implementation
- ⚠️ May not be supported

---

### Recommended Approach

**Use Option A (Personal Access Token)** for immediate unblocking:
- Fastest to implement
- Works with existing setup
- Can migrate to GitHub App later for production

**Migrate to Option B (GitHub App)** for production:
- More secure
- Better governance
- Professional setup

---

### Verification After Enabling Access

Run the automated validation script:

```bash
npx tsx scripts/validate-github-token.ts
```

This script will:
- ✅ Test GitHub API authentication
- ✅ Verify MaturionISMS organization access
- ✅ Check maturion-isms repository access
- ✅ Confirm required permissions
- ✅ Test read access to repository contents
- ✅ Validate governance repository access

Expected output:
```
✅ Authenticated as: YourUsername
✅ Can access MaturionISMS organization
✅ Can access maturion-isms repository
✅ Can read maturion-isms repository contents
✅ All critical tests passed!
```

**If validation fails**, see detailed troubleshooting: [docs/GITHUB_TOKEN_TROUBLESHOOTING.md](docs/GITHUB_TOKEN_TROUBLESHOOTING.md)

Once access is enabled and verified, Foreman will automatically:
1. ✅ Scan `maturion-isms/architecture/modules/`
2. ✅ Analyze architectural patterns
3. ✅ Compare with Foreman App architecture
4. ✅ Generate alignment report
5. ✅ Create Red QA for any gaps
6. ✅ Build to Green (fix gaps)
7. ✅ Verify 100% QA passing

**Expected Timeline**: 15-30 minutes after access is granted

---

## Action 2: Confirm PR Merge Authority 🔐 GOVERNANCE

### Current Status
- ✅ **IMPLEMENTED**: PR merge function added to `lib/github/mutations.ts`
- ⏳ **PENDING**: Governance approval for autonomous PR merging
- **Question**: Should Foreman auto-merge PRs after validation?

### Why This Matters
The Build Philosophy workflow ends with PR merge:
```
Architecture → Red QA → Build to Green → Validation → MERGE
```

Currently, Foreman can:
- ✅ Create PRs
- ✅ Update PRs
- ✅ Validate QA (100% passing)
- ✅ Validate compliance
- ✅ Tag with governance labels

But cannot:
- ❌ Auto-merge PRs (requires explicit approval)

---

### Decision Required

**Question**: Should Foreman be allowed to auto-merge PRs when all gates pass?

**Gates that must pass before merge**:
1. ✅ Architecture checklist complete
2. ✅ Red QA existed before build
3. ✅ QA is now 100% GREEN
4. ✅ All compliance checks pass
5. ✅ No blocking labels
6. ✅ All CI/CD checks pass

**Options**:

#### Option 1: Enable Auto-Merge (Full Autonomy) ✅ RECOMMENDED

**Behavior**: Foreman automatically merges PRs when all gates pass

**Advantages**:
- ✅ Fully autonomous workflow
- ✅ Faster deployment
- ✅ Aligned with Build Philosophy
- ✅ QA gates provide safety

**Safety**:
- 🛡️ 100% QA passing required
- 🛡️ All compliance checks required
- 🛡️ Governance labels required
- 🛡️ Full audit trail maintained

**Configuration**:
```bash
# Add to .env
MATURION_AUTO_MERGE_ENABLED=true
MATURION_AUTO_MERGE_METHOD=squash  # or 'merge' or 'rebase'
```

---

#### Option 2: Require Manual Approval (Semi-Autonomous)

**Behavior**: Foreman prepares PR and tags as ready, user merges manually

**Advantages**:
- ✅ Human oversight for major changes
- ✅ Time to review before merge

**Disadvantages**:
- ❌ Not fully autonomous
- ❌ Requires user availability
- ❌ Slower workflow

**Configuration**:
```bash
# Add to .env
MATURION_AUTO_MERGE_ENABLED=false
```

---

#### Option 3: Conditional Auto-Merge (Hybrid)

**Behavior**: Auto-merge only for specific types of changes

**Examples**:
- ✅ Auto-merge: Documentation updates, minor bug fixes
- ⏳ Manual: Architecture changes, new features

**Configuration**:
```bash
# Add to .env
MATURION_AUTO_MERGE_ENABLED=true
MATURION_AUTO_MERGE_RULES=minor_changes_only
```

---

### Recommended Decision

**Enable Option 1: Full Auto-Merge** because:
1. Build Philosophy already guarantees quality via QA gates
2. Manual merge is redundant with 100% QA passing
3. Johan's philosophy: "I do not review code; architecture + QA are the judges"
4. Faster iteration supports autonomous operation

**If concerned about risk**:
- Start with Option 3 (conditional) for low-risk changes
- Monitor for 1-2 weeks
- Expand to Option 1 after confidence builds

---

## Action 3: Verify CI/CD Integration (Optional but Recommended)

### Current Status
- ⏳ **NOT CONFIGURED**: GitHub Actions workflows may not have PR merge permissions

### Why This Matters
If Foreman runs in GitHub Actions, the workflow needs permission to merge PRs.

### Configuration Required

Add to `.github/workflows/foreman-workflow.yml`:
```yaml
permissions:
  contents: write        # To push changes
  pull-requests: write   # To create/merge PRs
  issues: write          # To manage issues
  checks: read           # To read CI status
```

---

## Summary: Actions Required

| Action | Priority | Owner | Status | ETA |
|--------|----------|-------|--------|-----|
| Enable ISMS repository access | 🔴 CRITICAL | User | ⏳ Pending | 5 min |
| Confirm PR merge authority | 🟡 HIGH | User | ⏳ Pending | Decision |
| Verify CI/CD permissions | 🟢 MEDIUM | User | ⏳ Pending | 5 min |

---

## Next Steps After User Actions

Once user completes these actions, Foreman will:

### Immediate (Phase 1)
1. ✅ Scan ISMS repository module patterns
2. ✅ Analyze architectural consistency
3. ✅ Generate alignment report
4. ✅ Identify any architectural gaps

### Build Phase (Phase 2)
5. ✅ Create Red QA for identified gaps
6. ✅ Run QA - verify RED status
7. ✅ Build to Green (fix gaps)
8. ✅ Re-run QA - verify 100% GREEN

### Validation Phase (Phase 3)
9. ✅ Run complete QA suite
10. ✅ Verify zero errors, zero warnings
11. ✅ Validate Build Philosophy compliance
12. ✅ Generate evidence trail

### Completion (Phase 4)
13. ✅ Create PR with all changes
14. ✅ Validate PR ready for merge
15. ✅ (If approved) Auto-merge PR
16. ✅ Report: Fully Functional Foreman App Delivered ✅

---

## Contact & Support

If you encounter issues with any of these actions:
1. Check the error messages in Foreman logs
2. Verify environment variables are set correctly
3. Ensure GitHub token/app has proper permissions
4. Restart Foreman App after configuration changes

---

## Conclusion

**Two simple user actions unlock full Foreman capabilities**:
1. 🔒 Grant ISMS repository access (5 minutes)
2. 🔐 Approve auto-merge authority (decision)

**Result**: Fully autonomous Build Philosophy workflow ✅

**Timeline**: 30-45 minutes from access granted to fully functional Foreman App

---

**Status**: Awaiting User Actions  
**Foreman**: Ready and standing by 🤖

