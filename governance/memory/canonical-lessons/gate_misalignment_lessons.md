# Gate Misalignment Lessons

**Date**: 2025-12-24  
**Status**: Canonical Lesson  
**Authority**: Governance Memory  
**Source Basis**: Agent Contract, Phase 1 Classification, Governance Gate Canon

---

## Executive Summary

**Gate misalignment** occurs when PR gates or CI checks are applied incorrectly based on agent role, leading to false failures for compliant work or false passes for non-compliant work.

**Key Lesson**: Gate requirements must be evaluated in the context of the submitting agent's role and scope.

---

## What Gate Misalignment Is

### Definition

**Gate Misalignment**: Applying build-specific gates (Build-to-Green, architecture artifacts, builder QA) to non-builder agents whose scope does not include building.

### Example Misalignment

**Scenario**: Governance Administrator agent updates governance documentation.

**Misaligned Gates** (Incorrectly Applied):
- Require architecture/build artifacts → ❌ NOT APPLICABLE (no building occurred)
- Require builder QA to be 100% GREEN → ❌ NOT APPLICABLE (no code changes)
- Require Build-to-Green evidence → ❌ NOT APPLICABLE (governance work, not builder work)

**Correct Gates** (Should Apply):
- Require governance schema compliance → ✅ APPLICABLE
- Require policy consistency → ✅ APPLICABLE
- Require enforcement semantics alignment → ✅ APPLICABLE
- Require agent contract compliance → ✅ APPLICABLE

**Problem**: If misaligned gates apply, compliant governance work is blocked by gates designed for builders.

---

## How Gate Misalignment Occurs

### Root Cause 1: Path-Based Gate Logic

**Problem**: Gate logic infers applicability from changed file paths, not agent role.

**Example**:
```
If PR changes files in governance/ directory
  → Apply Build-to-Green gates ❌ WRONG
```

**Why Wrong**: Governance changes don't involve building. Build-to-Green gates are irrelevant.

**Correct Logic**:
```
If PR agent role is "Builder"
  → Apply Build-to-Green gates ✅ CORRECT
If PR agent role is "Governance Administrator"
  → Apply governance compliance gates ✅ CORRECT
```

**Lesson**: **Agent role is authoritative, not file paths.**

### Root Cause 2: Universal Gate Assumptions

**Problem**: Assuming all PRs must satisfy all gates.

**Example**:
```
All PRs must provide:
- Architecture artifacts
- Builder QA evidence
- Build-to-Green proof
```

**Why Wrong**: Not all work involves building. Governance work, documentation work, schema work don't build code.

**Correct Approach**:
```
IF agent role = Builder
  THEN require architecture, QA, Build-to-Green
ELSE IF agent role = Governance Administrator
  THEN require governance compliance, schema validation
ELSE IF agent role = Documentation
  THEN require documentation standards compliance
```

**Lesson**: **Gates must be role-scoped.**

### Root Cause 3: CI Workflow Triggers

**Problem**: CI workflows trigger on any PR, regardless of agent role or work type.

**Example**:
```
on: pull_request → Run builder validation workflow
```

**Why Wrong**: Every PR (including governance PRs) triggers builder validation, even when building didn't occur.

**Correct Approach**:
```
on: pull_request
  IF agent role = Builder
    THEN run builder validation
  ELSE IF agent role = Governance Administrator
    THEN run governance validation
```

**Lesson**: **CI triggers must respect agent role.**

---

## Consequences of Misalignment

### False Failures (Type I Error)

**What Happens**: Compliant work is blocked by inapplicable gates.

**Example**:
- Governance Administrator updates policy documents
- Build-to-Green gate triggers
- Gate fails: "No builder QA evidence found"
- PR blocked despite governance work being compliant

**Impact**:
- Compliant work cannot proceed
- Agent blocked by gates designed for different role
- Governance work incorrectly classified as non-compliant

### False Passes (Type II Error)

**What Happens**: Non-compliant work passes because correct gates aren't applied.

**Example**:
- Builder submits code without Red QA
- Only governance gates trigger (because file path matched governance patterns)
- Governance gates pass (code isn't governance work, so governance compliance isn't checked)
- Build-to-Green gates don't trigger
- Non-compliant builder work merges

**Impact**:
- Non-compliant work merges
- Quality gates bypassed
- Governance violations undetected

### Erosion of Gate Trust

**Problem**: If gates fail for compliant work or pass for non-compliant work, trust in gates erodes.

**Consequence**:
- "Gates are broken" → Pressure to disable gates
- "Gates are too strict" → Pressure to weaken gates
- "Gates don't understand context" → Pressure to bypass gates

**Reality**: Gates aren't broken. **Gate applicability logic is broken.**

---

## Correct Gate Applicability Model

### Principle: Agent Role Determines Gate Applicability

**Rule**: Gates MUST evaluate agent role before determining applicability.

### Agent Role Detection

**How to Detect Agent Role**:
1. PR metadata: `agent_role` field (if available)
2. Branch name pattern: `copilot/builder/*` → Builder role
3. Commit message pattern: `[GOVERNANCE]` → Governance Administrator role
4. PR labels: `agent:builder`, `agent:governance-admin`
5. File analysis (fallback): Analyze changed files to infer role

**Preference**: Explicit role declaration (metadata/labels) over inference (file patterns).

### Gate Categories by Agent Role

#### Builder Agent Gates

**Applicable When**: Agent role = Builder

**Required Gates**:
- Architecture completeness check
- Red QA evidence (pre-build logs)
- Build-to-Green instruction verification
- Green QA evidence (post-build validation)
- 100% GREEN verification
- Zero test debt verification
- Builder QA scope compliance

**Example Files**: Code files, test files, build configs, etc.

#### Governance Administrator Agent Gates

**Applicable When**: Agent role = Governance Administrator

**Required Gates**:
- Governance schema compliance
- Policy consistency validation
- Agent contract alignment
- Enforcement semantics validation
- Canon completeness (if canonization work)

**Example Files**: Governance policies, schemas, agent contracts, enforcement workflows (when explicitly authorized)

**NOT Required**:
- Architecture artifacts (governance doesn't build)
- Builder QA evidence (governance doesn't write code)
- Build-to-Green proof (governance doesn't implement features)

#### Documentation Agent Gates

**Applicable When**: Agent role = Documentation

**Required Gates**:
- Documentation standards compliance
- Link validation
- Format consistency
- Completeness verification

**NOT Required**:
- Builder gates
- Governance gates (unless updating governance docs)

### Fallback for Unknown Roles

**If agent role cannot be determined**:
1. Log warning: "Agent role unknown, cannot determine gate applicability"
2. Apply minimal universal gates:
   - No merge conflicts
   - No security vulnerabilities introduced
   - Basic CI passing
3. Escalate for manual review

**Do NOT apply all gates universally as fallback.** This causes misalignment.

---

## Canonical Gate Applicability Rules

### Rule 1: Agent Role is Authoritative

**Statement**: Agent role determines gate applicability, not file paths, not change types, not workflow triggers.

**Enforcement**: All gate logic MUST check agent role before applying gates.

### Rule 2: Gates Are Role-Scoped

**Statement**: Builder gates apply to builders. Governance gates apply to governance administrators. No cross-role gate application.

**Enforcement**: CI workflows MUST filter gate applicability by agent role.

### Rule 3: Misapplied Gates Are Governance Errors

**Statement**: Applying builder gates to governance work (or vice versa) is a **governance error**, not a compliance failure.

**Implication**: Agent should escalate gate misalignment, not attempt to satisfy inapplicable gates.

### Rule 4: Explicit Role Declaration Preferred

**Statement**: Agents should declare role explicitly (PR metadata, labels, commit messages) rather than relying on inference.

**Benefit**: Removes ambiguity, prevents misalignment.

### Rule 5: Gate Logic Must Not Infer Applicability from Paths Alone

**Statement**: Touching a file in `governance/` does not mean builder gates apply. Agent role determines applicability.

**Enforcement**: CI workflows MUST NOT trigger builder validation solely based on file paths.

---

## How to Fix Gate Misalignment

### Step 1: Add Agent Role Declaration

**In PR Description** or **Labels**:
```markdown
**Agent Role**: Governance Administrator
```

or

```
Labels: agent:governance-admin
```

### Step 2: Update CI Workflow Logic

**Before** (Misaligned):
```yaml
on:
  pull_request:
    paths:
      - 'governance/**'
jobs:
  builder-validation:
    runs-on: ubuntu-latest
    steps:
      - name: Validate Build-to-Green
        run: ./scripts/validate-build-to-green.sh
```

**After** (Correctly Aligned):
```yaml
on:
  pull_request:
jobs:
  determine-role:
    runs-on: ubuntu-latest
    outputs:
      agent_role: ${{ steps.detect.outputs.role }}
    steps:
      - name: Detect Agent Role
        id: detect
        run: ./scripts/detect-agent-role.sh

  builder-validation:
    needs: determine-role
    if: needs.determine-role.outputs.agent_role == 'builder'
    runs-on: ubuntu-latest
    steps:
      - name: Validate Build-to-Green
        run: ./scripts/validate-build-to-green.sh

  governance-validation:
    needs: determine-role
    if: needs.determine-role.outputs.agent_role == 'governance-admin'
    runs-on: ubuntu-latest
    steps:
      - name: Validate Governance Compliance
        run: ./scripts/validate-governance-compliance.sh
```

### Step 3: Implement Role Detection Logic

**Script**: `scripts/detect-agent-role.sh`

```bash
#!/bin/bash

# Check PR labels first
if gh pr view --json labels | jq -e '.labels[] | select(.name == "agent:builder")' > /dev/null; then
  echo "builder"
  exit 0
fi

if gh pr view --json labels | jq -e '.labels[] | select(.name == "agent:governance-admin")' > /dev/null; then
  echo "governance-admin"
  exit 0
fi

# Check PR body for agent role declaration
AGENT_ROLE=$(gh pr view --json body | jq -r '.body' | grep -oP '(?<=Agent Role:)\s*\K\S+' || echo "unknown")
echo "$AGENT_ROLE"
```

### Step 4: Document Gate Applicability

**In**: `governance/policy/PR_GATE_APPLICABILITY.md`

```markdown
# PR Gate Applicability

## Agent Role: Builder
- ✅ Architecture completeness check
- ✅ Red QA evidence verification
- ✅ Build-to-Green validation
- ✅ 100% GREEN verification
- ❌ Governance schema compliance (not applicable)

## Agent Role: Governance Administrator
- ❌ Architecture completeness (not applicable)
- ❌ Builder QA verification (not applicable)
- ✅ Governance schema compliance
- ✅ Policy consistency validation
- ✅ Agent contract alignment
```

---

## Lessons That Must Never Be Forgotten

### Lesson 1: Agent Role Determines Gate Applicability

**Not**: File paths, change types, or universal assumptions.

### Lesson 2: Misapplied Gates Are Governance Failures

**Not**: Agent compliance failures. The governance system failed to apply correct gates.

### Lesson 3: Builder-Specific Gates Don't Apply to Non-Builder Agents

**Example**: Governance Administrator doesn't need Build-to-Green proof. That's a builder requirement.

### Lesson 4: Explicit Role Declaration Prevents Misalignment

**Agents should declare role explicitly.** Inference is error-prone.

### Lesson 5: CI Logic Must Respect Agent Role

**CI workflows must filter by agent role**, not trigger universally.

---

## Conclusion

Gate misalignment creates false failures (blocking compliant work) and false passes (allowing non-compliant work). The solution is **role-scoped gate applicability**.

**Immutable Rule**: **Agent role is authoritative for determining which gates apply.**

---

**Source Documents**:
- `GOVERNANCE_GATE_CANON.md`
- `.github/agents/*.agent.md` (agent contracts)
- Issue #[Gate Misalignment] (if exists)
- Governance Repository Administrator Agent Contract
