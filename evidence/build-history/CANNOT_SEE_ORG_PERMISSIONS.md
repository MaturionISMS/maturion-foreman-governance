# Cannot See Organization Permissions Section

**Issue**: When editing your fine-grained token, you cannot see "Organization permissions" section.

---

## Why This Happens

There are a few reasons why the "Organization permissions" section might not be visible:

### Reason 1: Token Type is Classic (Not Fine-Grained)

**Classic tokens don't have organization permissions section** - they use scopes instead.

**How to check**:
- Your token value starts with `ghp_` = Classic token
- Your token value starts with `github_pat_` = Fine-grained token

**If you have a classic token**:
- ✅ **Good news**: Classic tokens don't need organization permissions!
- ✅ The `repo` scope already includes organization access
- ✅ Your 404 issue is something else

**Solution for classic tokens**: Skip to "Alternative Solutions" below.

---

### Reason 2: Organization Permissions Collapsed/Hidden

The section might be collapsed in the UI.

**Where to look**:

When editing your token at https://github.com/settings/tokens, scroll through ALL sections:

```
1. Token name
2. Expiration
3. Description (optional)
4. Resource owner (dropdown)  ← CHECK THIS!
5. Repository access (radio buttons)
6. Permissions (expandable sections):
   ├─ Repository permissions (always visible)
   ├─ Organization permissions ← MIGHT BE HERE
   └─ Account permissions (optional)
```

**Organization permissions might appear**:
- After "Repository permissions"
- Only if "Resource owner" is set to an organization
- Collapsed by default (click to expand)

---

### Reason 3: Resource Owner Not Set to Organization

Fine-grained tokens show organization permissions **only when Resource owner is set to the organization**.

**Fix**:

1. Edit your token
2. Look for "**Resource owner**" dropdown (near the top)
3. Check if it's set to:
   - Your personal account ❌
   - MaturionISMS organization ✅

4. If it shows your personal account:
   - Click the dropdown
   - Select "**MaturionISMS**"
   - Organization permissions section should appear!

---

## Quick Diagnostic

### Step 1: Check Your Token Type

Look at your token value in `.env.local`:

```env
GITHUB_TOKEN=ghp_...           # Classic token
GITHUB_TOKEN=github_pat_...    # Fine-grained token
```

**If classic (`ghp_`)**: You don't need organization permissions! See "Solution for Classic Tokens" below.

**If fine-grained (`github_pat_`)**: Continue to Step 2.

---

### Step 2: Verify Token Configuration

Visit your token at: https://github.com/settings/tokens?type=beta

Look for these fields **in this exact order**:

1. **Token name**: "Maturion Foreman"
2. **Expiration**: (your selected date)
3. **Resource owner**: Should show "MaturionISMS" ← **CHECK THIS!**
4. **Repository access**: "All repositories"
5. **Permissions** (scroll down):
   - Repository permissions (expandable)
   - Organization permissions (expandable) ← **Should be here after Resource owner**
   - Account permissions (expandable)

---

## Solution for Classic Tokens

If you're using a classic token (`ghp_`):

**Classic tokens use scopes, not organization permissions.**

### Check Your Scopes

1. Go to: https://github.com/settings/tokens
2. Click your token
3. Look at "Selected scopes":
   - ✅ `repo` (full control of private repositories)
   - ✅ `workflow` (update GitHub Actions)

**If you have `repo` scope checked**: 
- ✅ Your token already has organization access!
- ✅ The 404 error is NOT from missing organization permissions
- ✅ The issue is something else (see below)

### Test Classic Token

```bash
# Test if classic token works
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/MaturionISMS/maturion-isms
```

**If this works**: Token is fine, issue is in application configuration  
**If 404**: Repository doesn't exist or has different name  
**If 401**: Token is invalid or expired  

---

## Alternative Solutions

### Option 1: Create New Fine-Grained Token with Org Permissions

If you can't find organization permissions on your current token, create a new one:

1. Go to: https://github.com/settings/tokens?type=beta
2. Click "**Generate new token**"
3. Token name: "Maturion Foreman New"
4. Expiration: 90 days
5. **Resource owner**: Select "**MaturionISMS**" (NOT your personal account) ← KEY!
6. Repository access: "All repositories"
7. Repository permissions:
   - Contents: Read and write
   - Pull requests: Read and write
   - Issues: Read and write
   - Metadata: Read-only
   - Workflows: Read and write
8. **Organization permissions** (should now be visible):
   - Members: Read-only ✅
9. Generate token
10. Copy token value
11. Update `.env.local`:
    ```env
    GITHUB_TOKEN=github_pat_NEW_VALUE
    ```

---

### Option 2: Use Classic Token (Simpler)

Classic tokens are simpler and don't have this organization permissions complexity:

1. Go to: https://github.com/settings/tokens/new
2. Note: "Foreman Access Token"
3. Expiration: 90 days
4. Select scopes:
   - ✅ `repo` (all sub-scopes)
   - ✅ `workflow`
5. Generate token
6. Copy token
7. Update `.env.local`:
   ```env
   GITHUB_TOKEN=ghp_your_new_classic_token
   ```

**Classic tokens work immediately for organization owners!**

---

### Option 3: Check if Repository Exists

The 404 might not be from token permissions at all. The repository might not exist:

**Verify**:
1. Visit: https://github.com/MaturionISMS/maturion-isms
2. **If you see the repo**: Token issue
3. **If you get 404**: Repository doesn't exist!

**If repository doesn't exist**:
- Create it at: https://github.com/organizations/MaturionISMS/repositories/new
- Name it exactly: `maturion-isms`
- Make it private
- Then your token will work!

---

## Recommended Path Forward

Since you can't see organization permissions:

### Path A: Use Classic Token (Fastest)

1. Create classic token with `repo` scope
2. Update `.env.local`
3. Run `npm run validate:github-token`
4. Done in 2 minutes!

### Path B: Create New Fine-Grained Token

1. Create new fine-grained token
2. **Make sure to select "MaturionISMS" as Resource owner**
3. Organization permissions should appear
4. Add Members: Read-only
5. Update `.env.local`

### Path C: Check if Repo Exists

1. Visit https://github.com/MaturionISMS/maturion-isms
2. If 404, create the repository
3. Then existing token might work!

---

## What to Share for Debugging

To help debug further, please share:

1. **Token type**: 
   ```bash
   # From your .env.local, does it start with:
   ghp_           # = Classic
   github_pat_    # = Fine-grained
   ```

2. **Token settings location**: Where did you create/edit the token?
   - https://github.com/settings/tokens (classic)
   - https://github.com/settings/tokens?type=beta (fine-grained)

3. **Validation output**:
   ```bash
   npm run validate:github-token
   ```
   Share the complete output

4. **Repository check**:
   - Visit: https://github.com/MaturionISMS/maturion-isms
   - Tell us: "Repo exists" or "404 not found"

---

## Most Likely Scenario

Based on "cannot see organization permissions":

**You likely have a CLASSIC token, not a fine-grained token.**

Classic tokens:
- ✅ Don't have organization permissions section (they use scopes)
- ✅ Don't need organization permissions (repo scope includes it)
- ✅ Should already work for organization repositories

**Next step**: Run the validation script and share the output!

```bash
npm run validate:github-token
```

This will tell us:
- Token type (classic vs fine-grained)
- What's actually failing
- Exact error message
- How to fix it

---

## Quick Test

Run this to see what token type you have:

```bash
# In your project directory
grep GITHUB_TOKEN .env.local
```

Look at the token format:
- `GITHUB_TOKEN=ghp_...` = Classic token (no org permissions needed!)
- `GITHUB_TOKEN=github_pat_...` = Fine-grained (needs org permissions)

Share the format (not the actual token!) and we can guide you from there!

---

**Next Steps**:
1. Check your token format (classic vs fine-grained)
2. Run validation script: `npm run validate:github-token`
3. Share the validation output
4. We'll solve it immediately! 🎯
