# URGENT: GitHub Token Fix for Organization Owner

**Your Situation**: Solo organization owner with fine-grained token showing "All repositories" but getting 404 errors

**Status**: No approval needed - you're the owner! Issue is likely token value or repository name.

---

## TL;DR - Do This Now (2 Minutes)

### 1. Regenerate Token
- Go to: https://github.com/settings/tokens?type=beta
- Click "Maturion Foreman" token
- Click "Regenerate token"
- **Copy the entire new value**

### 2. Update .env.local
```env
GITHUB_TOKEN=paste_your_new_token_here
```

### 3. Test
```bash
npm run validate:github-token
```

### 4. Check Repository Exists
Visit: https://github.com/MaturionISMS/maturion-isms

If 404 → Repository doesn't exist (that's your problem!)

---

## Why This Happened

As organization owner:
- ✅ You don't need approval for tokens
- ✅ "No pending requests" is normal for you
- ✅ Token should work immediately

But you're getting 404 because:
- ⚠️ Token value in `.env.local` is old/regenerated, OR
- ⚠️ Repository `maturion-isms` doesn't exist or has different name

---

## Quick Diagnostic

Run this RIGHT NOW:

```bash
# Test if repo exists using your token
curl -H "Authorization: token YOUR_TOKEN_FROM_ENV_FILE" \
     https://api.github.com/repos/MaturionISMS/maturion-isms
```

**What you'll see**:

1. **JSON data**: ✅ Repo exists, token works! Issue is app config.
2. **404**: ❌ Repository doesn't exist or name is wrong
3. **401**: ❌ Token is invalid/expired

---

## Most Likely: Repository Doesn't Exist

Based on your screenshots and "All repositories" being selected correctly, the issue is probably:

**The repository `maturion-isms` doesn't exist yet.**

### Verify:
1. Visit: https://github.com/MaturionISMS
2. Look for repositories related to ISMS
3. Check if any are named `maturion-isms`

### If repository doesn't exist:
- You need to create it first, OR
- Update code to use a different repository

### If repository has a different name:
- Find the correct name
- Update configuration

---

## Alternative: Use Classic Token (Simpler for Solo Dev)

1. Go to: https://github.com/settings/tokens/new
2. Scopes: `repo`, `workflow`
3. Generate and copy
4. Update `.env.local`:
   ```env
   GITHUB_TOKEN=ghp_your_classic_token
   ```
5. Test: `npm run validate:github-token`

**Classic tokens work immediately for org owners.**

---

## What to Do Next

### Option A: If Repository Doesn't Exist

Create the repository:
1. Go to: https://github.com/organizations/MaturionISMS/repositories/new
2. Name: `maturion-isms`
3. Private repository
4. Create
5. Then your token will work!

### Option B: If Repository Has Different Name

Find the correct repository and update the code:
1. Check what repositories exist in your organization
2. Find the one that should be used
3. Update the code to use the correct name

### Option C: Use Different Repository for Testing

While debugging, you can test with a repository you know exists:

Edit `lib/github/loadFiles.ts` temporarily to use `maturion-foreman-app` instead:
```typescript
const DEFAULT_GOVERNANCE_REPO_NAME = 'maturion-foreman-app'; // instead of 'maturion-ai-foreman'
```

This will prove your token works!

---

## Action Items (Pick One)

**Path 1 - Fix Token** (if repo exists):
1. ✅ Regenerate token at GitHub
2. ✅ Copy new value to `.env.local`
3. ✅ Run `npm run validate:github-token`
4. ✅ Share the output

**Path 2 - Fix Repository** (if repo doesn't exist):
1. ✅ Create `maturion-isms` repository
2. ✅ Or find the correct repository name
3. ✅ Or update code to use existing repo
4. ✅ Then regenerate token

**Path 3 - Use Classic Token** (simplest):
1. ✅ Create classic token with `repo` scope
2. ✅ Update `.env.local`
3. ✅ Run `npm run validate:github-token`
4. ✅ Done!

---

## Share This for Help

Run these and share the output:

```bash
# Test 1: Validation script
npm run validate:github-token

# Test 2: Direct repository check
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/MaturionISMS/maturion-isms

# Test 3: Organization repos list
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/orgs/MaturionISMS/repos | grep '"name"'
```

This will show us:
1. What error the validation script gives
2. If the repository exists
3. What repositories you actually have

---

## Bottom Line

As organization owner working solo:
- 🎯 **No approval issues** - that's not your problem
- 🎯 **Most likely**: Token value is old OR repository doesn't exist
- 🎯 **Quick fix**: Regenerate token + verify repo exists
- 🎯 **Simpler alternative**: Use classic token

**Next step**: Run `npm run validate:github-token` and share the output! 🚀
