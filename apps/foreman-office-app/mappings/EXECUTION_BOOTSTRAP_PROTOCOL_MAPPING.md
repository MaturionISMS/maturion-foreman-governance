# Execution Bootstrap Protocol - foreman-office-app Implementation Mapping

## Repository
**Name**: maturion-foreman-office-app  
**Type**: FM Orchestration + Next.js Application  
**Governance Version**: Aligned to governance/canon v1.0.0+  
**Last Updated**: 2026-01-11

---

## Purpose

This document maps the canonical **Execution Bootstrap Protocol** to foreman-office-app-specific implementation requirements.

**Canonical Reference**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

---

## Agent Types in This Repository

### 1. FM Orchestrator Agent
**Contract**: `.github/agents/ForemanApp-agent.md`  
**Role**: Orchestrating builds, managing governance, learning, failures  
**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v2.0.0+)

### 2. Builder Agents
**Contracts**: `.github/agents/*-builder.md` (e.g., next-app-builder.md)  
**Role**: Building Next.js application code  
**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v2.0.0+)

---

## Execution Bootstrap Protocol Application

### Mandatory PREHANDOVER_PROOF For:

#### FM Orchestrator PRs
- ✅ Workflow changes (`.github/workflows/**`)
- ✅ Agent contract changes (`.github/agents/**`)
- ✅ Learning promotion artifacts
- ✅ Failure promotion artifacts
- ✅ Effectiveness tracking updates
- ✅ Governance alignment updates

#### Builder PRs
- ✅ Next.js component changes (`app/**`, `components/**`, `lib/**`)
- ✅ API route changes (`app/api/**`)
- ✅ Test changes (`*.test.ts`, `*.test.tsx`)
- ✅ Configuration changes (`next.config.js`, `tsconfig.json`, `package.json`)
- ✅ Vercel deployment configuration changes

#### Optional For:
- 📄 README updates (pure documentation)
- 📄 Incident reports
- 📄 Evidence artifacts (non-executable)

---

## Repository-Specific Execution Requirements

### For Builder PRs (Next.js)

#### Step 3: Execute/Verify Locally

**Required Commands**:
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Run build
npm run build

# Optional: Run dev server and validate
npm run dev
# Verify at http://localhost:3000
```

**Exit Code Requirements**: All commands MUST exit with code 0

---

#### Step 4: Capture Output

**Minimum Required Evidence**:
```markdown
### Execution Validation

\`\`\`
$ npm run lint
✅ ESLint: 0 errors, 0 warnings
Exit code: 0

$ npm run type-check
✅ TypeScript: No errors
Exit code: 0

$ npm test
✅ Test Suites: X passed, X total
✅ Tests: Y passed, Y total
✅ Coverage: Z%
Exit code: 0

$ npm run build
✅ Next.js build completed
✅ Route (app): X routes
✅ Build Output: .next/ (size: X MB)
Exit code: 0
\`\`\`
```

---

#### Step 5: Validate Preflight

**Gates Applicable to Next.js Builder PRs**:

1. **Builder QA Enforcement Gate**
   - Validation: Check `.qa/builder/BUILD_QA_REPORT.json`
   - Required: `build_status == "PASS"`, `merge_readiness.ready == true`

2. **QIEL (100% GREEN QA)**
   - Validation: Local test suite execution
   - Required: 100% pass rate, zero failures, zero skipped

3. **Architecture Completeness**
   - Validation: Check `architecture/builds/<build-id>/` exists
   - Required: Architecture doc and checklist complete

4. **Constitutional Safeguards (CS1-CS6)**
   - Validation: No protected files modified, no governance bypasses
   - Required: git diff shows only authorized changes

**Enumeration Method**: Check `.github/workflows/` for path triggers matching modified files

---

### For FM Orchestrator PRs

#### Step 3: Execute/Verify Locally

**Required Validations**:
```bash
# If workflow changes
yamllint .github/workflows/*.yml
yq eval '.on.pull_request' .github/workflows/<modified-workflow>.yml

# If agent contract changes
# Validate YAML header structure
yq eval '.agent' .github/agents/<modified-contract>.md

# If learning/failure promotion
# Validate artifact structure matches schema
```

---

#### Step 5: Validate Preflight

**Gates Applicable to FM Orchestration PRs**:

1. **Agent Governance Validation**
   - Validation: Check agent contract structure
   - Required: YAML header valid, bindings present

2. **Governance Scope-to-Diff Gate**
   - Validation: Scope declaration matches file diff
   - Required: Scope accurate, no out-of-scope changes

3. **FM Learning Promotion Gate** (if applicable)
   - Validation: Learning artifacts conform to schema
   - Required: Learning promotion rule satisfied

4. **FM Failure Promotion Gate** (if applicable)
   - Validation: Failure artifacts conform to schema
   - Required: Failure promotion rule satisfied

---

## Vercel-Specific Considerations

### Vercel Deployment Simulation

**Optional but Recommended**: Simulate Vercel build locally

```bash
# Use Vercel CLI
npx vercel build
npx vercel deploy --prebuilt --yes

# Or simulate with environment variables
VERCEL=1 npm run build
```

**Include in PREHANDOVER_PROOF** if Vercel-specific features modified:
- Edge functions (`app/api/**/route.ts` with `export const runtime = 'edge'`)
- Environment variables (`.env.local`, `vercel.json`)
- Redirects/rewrites (`next.config.js`)

---

## Example PREHANDOVER_PROOF (Builder PR)

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Add new UserProfileCard component with tests

**Verification**:
\`\`\`
$ ls -la components/UserProfileCard.tsx
-rw-r--r-- 1 user group 2345 Jan 11 14:30 components/UserProfileCard.tsx

$ ls -la components/UserProfileCard.test.tsx
-rw-r--r-- 1 user group 1234 Jan 11 14:30 components/UserProfileCard.test.tsx
\`\`\`

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: Build-to-Green for Next.js application

**Commands Executed**:
\`\`\`
$ npm install
added 1234 packages
Exit code: 0

$ npm run lint
✅ ESLint: 0 errors, 0 warnings
Exit code: 0

$ npm run type-check
✅ TypeScript: No errors found
Exit code: 0

$ npm test
✅ Test Suites: 15 passed, 15 total
✅ Tests: 87 passed, 87 total
✅ Coverage: 92.5%
Exit code: 0

$ npm run build
✅ Next.js build completed successfully
✅ Route (app): 24 routes compiled
✅ Build Output: .next/ (3.2 MB)
Exit code: 0
\`\`\`

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `components/**`):

1. **Builder QA Enforcement Gate** — ✅ PASS
   - Validation: Checked .qa/builder/BUILD_QA_REPORT.json
   - Evidence: build_status == "PASS", merge_readiness.ready == true

2. **QIEL (100% GREEN QA)** — ✅ PASS
   - Validation: Local test suite execution
   - Evidence: 87/87 tests passing, 0 failures

3. **Architecture Completeness** — ✅ PASS
   - Validation: Checked architecture/builds/build-123/
   - Evidence: Architecture doc present, checklist complete

4. **Constitutional Safeguards** — ✅ PASS
   - Validation: git diff shows only components/ changes
   - Evidence: No protected files, no governance bypasses

**Summary**: 4 applicable gates GREEN

**Gate Enumeration Method**: Reviewed .github/workflows/ for paths: ["components/**", "**/*.tsx"]

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 14:45:00 UTC  
**Environment**: macOS 14.0, Node 20.10.0, Next.js 14.0.4, npm 10.2.3  
**Validator**: next-app-builder (GitHub Copilot)

---

### Handover Guarantee

**I guarantee**:
- ✅ Component and tests created and functional
- ✅ Full Next.js build and test suite completed (100% GREEN)
- ✅ All 4 gates validated in preflight
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Local environment differs from CI (Node version, dependencies), OR
- Incomplete gate enumeration, OR
- Governance defect

**Known Environment Differences**: 
- Local: Next.js 14.0.4, CI: Next.js 14.0.3 (minor version)
- All features tested compatible with both versions

**Root Cause Commitment**: If CI fails, I will compare local vs CI environments and document.
```

---

## Compliance Tracking

### Contract Updates Required

- [ ] `.github/agents/ForemanApp-agent.md` updated with PREHANDOVER_PROOF obligation
- [ ] `.github/agents/*-builder.md` (all builders) updated with PREHANDOVER_PROOF obligation
- [ ] `governance/GOVERNANCE_ALIGNMENT.md` updated with ripple entry

### Documentation Updates Required

- [ ] Update PR template (if exists) to reference PREHANDOVER_PROOF
- [ ] Update CONTRIBUTING.md with protocol requirement
- [ ] Add agent onboarding materials

### Optional Enhancements

- [ ] Install validation script: `.github/scripts/validate-prehandover-proof.sh`
- [ ] Add PREHANDOVER_PROOF examples to repository docs
- [ ] Create test PR demonstrating protocol compliance

---

## Related Documents

**Governance (Canonical)**:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
- `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md`
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v2.0.0)
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v2.0.0)

**Repository-Specific**:
- `apps/foreman-office-app/docs/FOREMAN_APP_ARCHITECTURE.md`
- `apps/foreman-office-app/docs/FOREMAN_APP_VERCEL_ARCHITECTURE.md`

**Ripple**:
- `governance/templates/RIPPLE_SIGNAL_EXECUTION_BOOTSTRAP_PROTOCOL.md`

---

**Status**: Active Mapping  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-11

---

*End of foreman-office-app Execution Bootstrap Protocol Mapping*
