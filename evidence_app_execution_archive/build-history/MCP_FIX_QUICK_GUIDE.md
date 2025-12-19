# Quick Fix Guide: Enable MCP Server Access to maturion-isms

**⏱️ Estimated Time**: 10 minutes  
**✅ Difficulty**: Easy  
**🎯 Goal**: Allow GitHub MCP Server to access MaturionISMS/maturion-isms repository

---

## Problem

The GitHub MCP server can access `maturion-foreman-app` but not `maturion-isms` (returns 404).

**Root Cause**: GitHub Actions token doesn't have cross-repository access.

---

## Solution: Create Personal Access Token

### Step 1: Generate Token (5 min)

1. Go to: https://github.com/settings/tokens/new
2. **Token name**: `Foreman MCP - ISMS Access`
3. **Expiration**: 90 days (or as per your policy)
4. **Scopes** - Select:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read org and team membership)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you'll only see it once!)

---

### Step 2: Add Token to Environment (2 min)

#### For Local Development:

1. Open `.env.local` in maturion-foreman-app
2. Find the existing `GITHUB_TOKEN` line
3. Replace it with your new token:

```bash
# OLD (limited permissions)
# GITHUB_TOKEN=github_pat_11B27E6YA0HEy9iNbf6jeD_...

# NEW (full repo access)
GITHUB_TOKEN=ghp_YourNewTokenHere
```

4. Save the file

#### For GitHub Actions (if using):

1. Go to: https://github.com/MaturionISMS/maturion-foreman-app/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `MCP_GITHUB_TOKEN`
4. Value: Your PAT (paste the token)
5. Click **"Add secret"**

---

### Step 3: Restart Services (1 min)

#### Local Development:
```bash
# Stop the running server (Ctrl+C)
# Start it again
npm run dev
```

#### GitHub Actions:
- New workflow runs will automatically use the new token
- Or trigger a new workflow run manually

---

### Step 4: Verify Access (2 min)

Test that the fix worked:

```bash
# Using GitHub CLI (if available)
gh repo view MaturionISMS/maturion-isms

# Should show repository information, not 404
```

Or wait for Foreman to attempt access - it should succeed now!

---

## Verification Checklist

- [ ] Created PAT with `repo` scope
- [ ] Token copied to clipboard
- [ ] `.env.local` updated with new token (or GitHub secret added)
- [ ] Services restarted
- [ ] Test access successful

---

## Security Notes

✅ **Safe**: `.env.local` is in `.gitignore` - won't be committed  
✅ **Secure**: Token only has access to repos you specify  
⚠️ **Important**: Never share or commit your PAT  
📅 **Reminder**: Rotate token before expiration (90 days)

---

## Troubleshooting

### Still getting 404?

1. **Check token scopes**: Ensure `repo` is selected
2. **Verify organization access**: Token must have access to MaturionISMS org
3. **Restart completely**: Kill all node processes and restart

### Token not working?

1. **Double-check copy**: Ensure full token was copied (starts with `ghp_`)
2. **Environment loaded**: Verify `.env.local` changes saved
3. **No quotes**: Don't wrap token in quotes in `.env.local`

---

## What This Fixes

✅ MCP server can now read maturion-isms files  
✅ Foreman can access ISMS architecture patterns  
✅ Build Philosophy verification can complete  
✅ Full 100% compliance achievable  

---

## Alternative: GitHub App Method

If you prefer using GitHub App instead of PAT:

1. Go to GitHub App settings
2. Add maturion-isms to installed repositories
3. Ensure "Contents: Read" permission is granted
4. Foreman will use GitHub App credentials instead

Both methods work - PAT is simpler for quick setup!

---

**Need Help?** 
- See full diagnostic: `MCP_SERVER_DIAGNOSTIC_REPORT.md`
- Check MCP config: `/home/runner/work/_temp/mcp-server/mcp-config.json`
- MCP server logs: GitHub Actions logs

---

**Status**: Ready to implement  
**Priority**: High (blocks ISMS alignment)  
**Impact**: Unlocks full Build Philosophy compliance
