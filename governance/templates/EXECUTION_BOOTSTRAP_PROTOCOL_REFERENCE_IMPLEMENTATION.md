# Execution Bootstrap Protocol - Reference Implementation Guide

## Status
**Type**: Reference Implementation Guide  
**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Version**: 1.0.0  
**Effective Date**: 2026-01-11  
**For**: FM Agents, Builder Agents, Governance Administrators

---

## Purpose

This guide provides step-by-step reference implementations for executing the **7-Step Execution Bootstrap Protocol** across common scenarios.

Use this guide to understand how to properly implement the protocol for different types of PRs.

---

## Quick Reference: When to Use This Protocol

### MANDATORY (Must include PREHANDOVER_PROOF)
- ✅ Workflow file changes (`.github/workflows/**`)
- ✅ Agent contract changes (`.github/agents/**`)
- ✅ Directory structure creation
- ✅ Configuration changes affecting CI
- ✅ Schema or policy creation
- ✅ Gate implementation
- ✅ Builder PRs (code, tests, build artifacts)

### OPTIONAL (Recommended but not required)
- 📄 Pure documentation changes (markdown content only)
- 📄 Learning promotion entries
- 📄 Incident reports
- 📄 Evidence artifact updates

**When uncertain, include PREHANDOVER_PROOF.**

---

## Reference Implementation #1: Builder PR (Build-to-Green)

**Scenario**: Builder implementing a new feature with tests

### Step 1: Document Requirements

Create a checklist of what needs to be built:

```markdown
## Implementation Requirements

### Code Changes
- [ ] Add new UserService.authenticate() method
- [ ] Update UserController to use new authentication
- [ ] Add input validation for auth parameters

### Test Requirements
- [ ] Red QA: Authentication failure scenarios
- [ ] Red QA: Invalid input handling
- [ ] Red QA: Successful authentication flow
- [ ] Integration tests with database

### Configuration
- [ ] Update environment variables for auth tokens
- [ ] Add auth config to .env.example
```

### Step 2: Create Actual Artifacts

Actually write the code and tests:

```bash
# Create the code
cat > src/services/UserService.ts << 'EOF'
export class UserService {
  async authenticate(username: string, password: string): Promise<User> {
    // Implementation
  }
}
EOF

# Create the tests
cat > src/services/UserService.test.ts << 'EOF'
describe('UserService.authenticate', () => {
  it('should fail with invalid credentials', async () => {
    // Test implementation
  });
  // Additional tests...
});
EOF
```

### Step 3: Execute/Verify Locally

Run the full build and test suite:

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run full test suite
npm run test

# Run build
npm run build
```

### Step 4: Capture Output

Save all command outputs with exit codes:

```bash
# Create evidence file
cat > /tmp/build_evidence.txt << 'EOF'
$ npm run lint
✅ ESLint passed (0 errors, 0 warnings)
Exit code: 0

$ npm run type-check
✅ TypeScript compilation successful
Exit code: 0

$ npm run test
✅ Test Suites: 45 passed, 45 total
✅ Tests: 234 passed, 234 total
✅ Coverage: 87.5%
Exit code: 0

$ npm run build
✅ Build completed successfully
✅ Output: dist/ (5.2 MB)
Exit code: 0
EOF
```

### Step 5: Validate Preflight

Check all gates that will be triggered:

```bash
# List modified files
git diff --name-only HEAD

# Identify triggered gates from .github/workflows/
# For this example: builder-qa-gate.yml will trigger

# Validate BUILD_QA_REPORT.json
cat .qa/builder/BUILD_QA_REPORT.json | jq '.build_status'
# Should output: "PASS"

# Validate GOVERNANCE_COMPLIANCE_REPORT.json
cat .qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json | jq '.compliance_status'
# Should output: "COMPLIANT"
```

### Step 6: Attach PREHANDOVER_PROOF

Include in PR description:

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Implement UserService.authenticate() with comprehensive tests

**Verification**:
\`\`\`
$ ls -la src/services/UserService.ts
-rw-r--r-- 1 user group 3456 Jan 11 14:30 src/services/UserService.ts

$ ls -la src/services/UserService.test.ts
-rw-r--r-- 1 user group 5678 Jan 11 14:30 src/services/UserService.test.ts

$ grep -c "describe\\|it" src/services/UserService.test.ts
15
\`\`\`

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: Build-to-Green completed (lint, type-check, test, build)

**Commands Executed**:
\`\`\`
$ npm run lint
✅ ESLint passed (0 errors, 0 warnings)
Exit code: 0

$ npm run type-check
✅ TypeScript compilation successful
Exit code: 0

$ npm run test
✅ Test Suites: 45 passed, 45 total
✅ Tests: 234 passed, 234 total
✅ Coverage: 87.5%
Exit code: 0

$ npm run build
✅ Build completed successfully
Exit code: 0
\`\`\`

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `src/**`):

1. **Builder QA Enforcement Gate** — ✅ PASS
   - Validation method: Checked BUILD_QA_REPORT.json
   - Evidence: `build_status == "PASS"`, `merge_readiness.ready == true`

2. **QIEL (100% GREEN QA)** — ✅ PASS
   - Validation method: Local test suite execution
   - Evidence: 234/234 tests passing, 0 failures, 0 skipped

3. **Architecture Completeness** — ✅ PASS
   - Validation method: Checked architecture/builds/<build-id>/
   - Evidence: Architecture document present, checklist complete

4. **Constitutional Safeguards (CS1-CS6)** — ✅ PASS
   - Validation method: No protected files modified, no governance bypasses
   - Evidence: git diff shows only src/services/** changes

**Summary**: 4 applicable gates GREEN, 0 gates FAIL

**Gate Enumeration Method**: Reviewed .github/workflows/ for paths: ["src/**", "**/*.ts"]

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 14:45:00 UTC  
**Environment**: macOS 14.0, Node 20.10.0, npm 10.2.3, TypeScript 5.3.3  
**Validator**: builder-agent (GitHub Copilot)

---

### Handover Guarantee

**I guarantee**:
- ✅ All code and tests created and functional
- ✅ Full build and test suite executed successfully (100% GREEN)
- ✅ All 4 gates validated in preflight
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Local environment differs from CI (document below), OR
- Incomplete gate enumeration (I missed a gate), OR
- Governance defect (gate misconfigured)

**Known Environment Differences**: 
- Local: Node 20.10.0, CI: Node 20.9.0 (minor version difference)
- All tests verified compatible with both versions

**Root Cause Commitment**: If CI fails, I will perform RCA comparing local vs CI environments and document findings.
```

### Step 7: Declare Complete

Only after all steps complete:

```markdown
## Completion Declaration

✅ All requirements documented (Step 1)
✅ All artifacts created (Step 2)
✅ All artifacts executed/verified locally (Step 3)
✅ All outputs captured (Step 4)
✅ All gates validated in preflight (Step 5)
✅ PREHANDOVER_PROOF attached (Step 6)

**Status**: COMPLETE — Ready for review and merge
**Guarantee**: All CI gates will pass (execution verified locally)
```

---

## Reference Implementation #2: FM Orchestration PR (Workflow Change)

**Scenario**: FM agent updating governance workflow configuration

### Step 1: Document Requirements

```markdown
## Workflow Update Requirements

- [ ] Update governance-gate.yml to add new path trigger
- [ ] Add validation for .qa/builder/ directory changes
- [ ] Test workflow syntax validity
```

### Step 2: Create Actual Artifacts

```bash
# Edit workflow file
vim .github/workflows/governance-gate.yml
# Add: - ".qa/builder/**" to on.pull_request.paths
```

### Step 3: Execute/Verify Locally

```bash
# Validate YAML syntax
yamllint .github/workflows/governance-gate.yml

# Validate workflow structure
yq eval '.on.pull_request.paths' .github/workflows/governance-gate.yml

# Verify all required paths present
yq eval '.on.pull_request.paths | contains([".qa/builder/**"])' \
  .github/workflows/governance-gate.yml
```

### Step 4: Capture Output

```bash
$ yamllint .github/workflows/governance-gate.yml
✅ No errors found
Exit code: 0

$ yq eval '.on.pull_request.paths' .github/workflows/governance-gate.yml
- ".github/**"
- "governance/**"
- ".qa/builder/**"
Exit code: 0

$ yq eval '.on.pull_request.paths | contains([".qa/builder/**"])' \
    .github/workflows/governance-gate.yml
true
Exit code: 0
```

### Step 5: Validate Preflight

```bash
# Enumerate gates triggered by .github/workflows/** changes
ls .github/workflows/*.yml

# Check agent governance validation
# (Simulated - actual gate runs in CI)
echo "✅ Agent governance bindings valid"

# Scope-to-diff validation
# Changes only to .github/workflows/ - matches scope
```

### Step 6: Attach PREHANDOVER_PROOF

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Update governance-gate.yml with .qa/builder path trigger

**Verification**:
\`\`\`
$ git diff .github/workflows/governance-gate.yml
+      - ".qa/builder/**"

$ wc -l .github/workflows/governance-gate.yml
152 .github/workflows/governance-gate.yml
\`\`\`

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: Workflow YAML valid and path correctly added

**Commands Executed**:
\`\`\`
$ yamllint .github/workflows/governance-gate.yml
✅ No errors found
Exit code: 0

$ yq eval '.on.pull_request.paths | contains([".qa/builder/**"])' \
    .github/workflows/governance-gate.yml
true
Exit code: 0
\`\`\`

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `.github/workflows/**`):

1. **Agent Governance Validation** — ✅ PASS
   - Validation method: Checked agent contract bindings
   - Evidence: No agent contracts modified, governance bindings intact

2. **Governance Scope-to-Diff Gate** — ✅ PASS
   - Validation method: Manual scope vs diff check
   - Evidence: Scope: "workflow path trigger update", Diff: only .github/workflows/

**Summary**: 2 applicable gates GREEN

**Gate Enumeration Method**: Listed all .github/workflows/*.yml, checked paths

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 15:00:00 UTC  
**Environment**: Ubuntu 22.04, yamllint 1.26.3, yq 4.30.8  
**Validator**: fm-orchestrator-agent

---

### Handover Guarantee

**I guarantee**:
- ✅ Workflow file modified and syntactically valid
- ✅ Path trigger verified with yq
- ✅ All 2 gates validated in preflight
- ✅ CI will confirm success

**If CI fails after this guarantee, it indicates**:
- yamllint/yq version difference, OR
- GitHub Actions syntax incompatibility, OR
- Governance defect

**Known Environment Differences**: None known

**Root Cause Commitment**: If CI fails, I will compare local vs CI tool versions.
```

### Step 7: Declare Complete

```markdown
## Completion Declaration

✅ All steps complete (1-6)
**Status**: COMPLETE — Ready for review and merge
```

---

## Reference Implementation #3: Directory Structure (FPC Phase 1)

**Scenario**: Governance Administrator creating FPC directory structure

### Step 1: Document Requirements

```markdown
## Phase 1 Requirements (FPC Repository Layer-Down)

- [ ] Create .github/workflows/
- [ ] Create .github/agents/
- [ ] Create governance/alignment/
- [ ] Create governance/evidence/initialization/
- [ ] Create governance/evidence/commissioning/
- [ ] Create governance/policies/
- [ ] Create governance/schemas/
- [ ] Create governance/memory/
```

### Step 2: Create Actual Artifacts

```bash
mkdir -p .github/workflows
mkdir -p .github/agents
mkdir -p governance/alignment
mkdir -p governance/evidence/initialization
mkdir -p governance/evidence/commissioning
mkdir -p governance/policies
mkdir -p governance/schemas
mkdir -p governance/memory
```

### Step 3: Execute/Verify Locally

```bash
# Verify all directories exist
for dir in .github/workflows .github/agents governance/alignment \
  governance/evidence/initialization governance/evidence/commissioning \
  governance/policies governance/schemas governance/memory; do
  if [ -d "$dir" ]; then
    echo "✅ $dir: EXISTS"
  else
    echo "❌ $dir: MISSING"
    exit 1
  fi
done
```

### Step 4: Capture Output

```bash
$ tree -L 3 .github/ governance/
.github/
├── workflows
└── agents

governance/
├── alignment
├── evidence
│   ├── initialization
│   └── commissioning
├── policies
├── schemas
└── memory

Exit code: 0
```

### Step 5: Validate Preflight

```bash
# Check gates triggered by .github/** and governance/** changes
# Agent governance validation - PASS (no contracts yet)
# Scope-to-diff - PASS (scope: "directory structure", diff: directories only)
```

### Step 6: Attach PREHANDOVER_PROOF

Use the complete example from `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 6.

### Step 7: Declare Complete

After all validation passes.

---

## Common Pitfalls and How to Avoid Them

### ❌ Pitfall 1: "Documented but not executed"

**Wrong**:
```markdown
## Changes Made
- I created the workflow file
- I added the tests
- Everything should work
```

**Right**:
```markdown
## PREHANDOVER_PROOF

### Execution Validation
\`\`\`
$ npm run test
✅ Tests: 45 passed, 45 total
Exit code: 0
\`\`\`
```

### ❌ Pitfall 2: Skipping gate enumeration

**Wrong**:
```markdown
I tested locally and everything works.
```

**Right**:
```markdown
### Preflight Gate Status

**Gates Triggered by This PR**:
1. Builder QA Gate — ✅ PASS (verified BUILD_QA_REPORT.json)
2. QIEL Gate — ✅ PASS (all tests passing locally)
3. Architecture Gate — ✅ PASS (architecture doc present)
```

### ❌ Pitfall 3: Missing exit codes

**Wrong**:
```markdown
I ran the build and it worked.
```

**Right**:
```markdown
$ npm run build
Build completed successfully
Exit code: 0
```

### ❌ Pitfall 4: No timestamp

**Wrong**:
```markdown
I validated everything earlier.
```

**Right**:
```markdown
**Validation Performed**: 2026-01-11 14:30:00 UTC
**Environment**: Node 20.10.0, npm 10.2.3
```

---

## Tools and Helpers

### Validation Script

Use the provided validation script to check PREHANDOVER_PROOF completeness:

```bash
# Save PR description to file
gh pr view 123 --json body -q .body > pr_desc.txt

# Validate
./governance/templates/workflows/validate-prehandover-proof.sh pr_desc.txt
```

### Evidence Generator (Bash)

Quick script to capture command output:

```bash
#!/bin/bash
# Save this as capture-evidence.sh

cmd="$@"
echo "$ $cmd"
eval "$cmd"
exit_code=$?
echo "Exit code: $exit_code"
exit $exit_code
```

Usage:
```bash
./capture-evidence.sh npm run test >> evidence.txt
./capture-evidence.sh npm run build >> evidence.txt
```

---

## Escalation: When to HALT and Escalate

### Escalate to Governance Administrator when:

1. **Gate cannot be validated locally** (missing tools, unclear requirements)
2. **Gate requirements contradict** (conflicting canonical documents)
3. **Execution fails repeatedly** despite following protocol
4. **Unknown whether PREHANDOVER_PROOF required** (ambiguous PR type)

### Escalation Template

```markdown
## Escalation: Execution Bootstrap Protocol Blocker

**Issue**: Unable to complete Step X of Execution Bootstrap Protocol

**Attempted**:
- [List what you tried]

**Blocker**:
- [Describe specific blocker]

**Evidence**:
\`\`\`
[Paste error messages, output]
\`\`\`

**Request**: Clarification on how to proceed with PREHANDOVER_PROOF

**Authority**: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md Section 11.2
```

---

## Related Documents

- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` - Full protocol specification
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` - Template for PR descriptions
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` - FM agent requirements
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` - Builder agent requirements
- `governance/templates/workflows/validate-prehandover-proof.sh` - Validation script

---

**Status**: Active Reference Guide  
**Authority**: EXECUTION_BOOTSTRAP_PROTOCOL.md  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-11

---

*End of Execution Bootstrap Protocol Reference Implementation Guide*
