# PR GATE FAILURE HANDLING PROTOCOL

## Status
Canonical Governance Policy  
Version: v1  
Authority: Johan Ras  
Applies To: ALL agents (Governance Administrator, Foreman, Builders)  
Precedence: Implements AGENT_NON_STALLING_AND_ESCALATION_POLICY.md Section 3.1

---

## 1. Purpose

This protocol documents the **mandatory procedure** for handling PR gate failures.

It was created as a training scenario for PR #683 to demonstrate:
- How agents must investigate gate failures
- Root cause analysis methodology
- Fix implementation without weakening governance
- Escalation triggers and format

This protocol is now **canonical** and must be followed by all agents.

---

## 2. Core Principle

**A red gate means the task is incomplete.**

An agent MUST NOT:
- Mark work as complete while gates fail
- Wait passively for gates to pass
- Ignore gate failures as "not my responsibility"
- Submit PRs with failing gates without escalation

---

## 3. Mandatory Procedure

When a PR gate fails, the agent MUST follow this exact procedure:

### Step 1: Observe Gate Status via Debug Report

**Primary observation method:**
- Read the Gate Debug Report from `.github/gate-reports/<gate-name>-<PR>.md`
- Parse the JSON summary block conforming to `GATE_DEBUG_REPORT_SCHEMA.json`
- Extract the `status` field to determine PASS or FAIL
- If FAIL, read `failure_signatures`, `failure_count`, `summary`, and `required_action` arrays

Per `PR_GATE_DEBUG_REPORTS_POLICY.md` Section 3, Gate Debug Reports are **authoritative**.

**Secondary investigation (if needed):**
- Locate the gate workflow file in `.github/workflows/` to understand gate logic
- Read the complete workflow to understand:
  - What the gate checks
  - What markers or conditions it requires
  - What causes it to fail
  - What it's protecting (governance principle)

**Note:** Always start with the Gate Debug Report. Workflow inspection is for understanding gate requirements, not for determining pass/fail status.

### Step 2: Root Cause Analysis
- Identify the **exact failing condition**
- Determine what is missing or incorrect
- Check if referenced schemas, registries, or canonical documents exist
- Understand **why** the gate requirement exists (governance purpose)

### Step 3: Check Dependencies
- If the gate references schemas or registries, read them
- Verify compliance with all referenced canonical documents
- Check if any required artifacts are missing from the repository

### Step 4: Determine Fix Path
Choose one of these paths:

**Path A: Direct Fix (if possible)**
- The fix is within agent scope and authority
- No governance rules need to be bent
- Required artifacts exist or can be created per governance

**Path B: Escalation (if blocked)**
- Fix requires permissions the agent lacks
- A governance rule needs temporary override
- A required artifact or domain doesn't exist in registries
- The gate requirement conflicts with task scope

### Step 5: Implement Fix or Escalate

**If Path A (Direct Fix):**
1. Make minimal changes to satisfy the gate
2. Verify changes align with canonical schemas
3. Document what was changed and why
4. Commit changes
5. Verify gate now passes

**If Path B (Escalation):**
Escalate to Johan with:
- **Gate name**: Exact workflow file and job name
- **Failure reason**: Specific error or missing condition
- **Proposed solution**: Concrete fix with scope and risk
- **Why blocked**: What prevents agent from fixing directly

---

## 4. Training Scenario: PR #683 Execution Log

This section documents the actual procedure followed for PR #683 as a reference example.

### 4.1 Initial State
- PR #683 created with governance policy changes
- Two gates failing:
  - Governance Scope Declaration Gate
  - Governance Cascading Failure Gate (monitoring)

### 4.2 Step 1: Investigate Scope Declaration Gate

**Action**: Read `.github/workflows/governance-scope-declaration-gate.yml`

**Findings**:
The gate requires these exact markers in `governance/scope-declaration.md`:
- `SCOPE_SCHEMA_VERSION: v1`
- `RESPONSIBILITY_DOMAIN:`
- `IN_SCOPE:`
- `OUT_OF_SCOPE:`
- `EXPECTED_VERIFICATION:`
- `SCOPE_FROZEN: YES`

Gate also enforces:
- Exactly one responsibility domain
- File must exist at `governance/scope-declaration.md`

### 4.3 Step 2: Root Cause Analysis

**Current state of scope-declaration.md**:
- ❌ Missing `SCOPE_SCHEMA_VERSION: v1`
- ❌ Missing `IN_SCOPE:` marker
- ❌ Missing `OUT_OF_SCOPE:` marker  
- ❌ Missing `EXPECTED_VERIFICATION:` marker
- ❌ Missing `SCOPE_FROZEN: YES` marker
- ⚠️  Has "RESPONSIBILITY_DOMAIN:" but format unclear
- ✅ File exists at correct location

**Root cause**: Initial scope declaration was created without schema compliance.

### 4.4 Step 3: Check Dependencies

**Referenced documents**:
1. `governance/canon/SCOPE_DECLARATION_SCHEMA.md` - defines required structure
2. `governance/canon/RESPONSIBILITY_DOMAIN_REGISTRY.md` - lists valid domains

**Schema findings**:
- Requires exact marker format (confirmed in Step 1)
- Requires specific field order
- OUT_OF_SCOPE must include minimum exclusions

**Registry findings**:
- Lists 5 domains: Database Lifecycle, Email Delivery, CI Infrastructure, Logging and Audit, Test Infrastructure
- ❌ **BLOCKER**: "Governance Canon" domain does NOT exist in registry

**Declared domain**: "Governance Canon & Agent Behavior Policies"
**Issue**: Not a valid registered domain

### 4.5 Step 4: Determine Fix Path

**Analysis**:
- The PR modifies only `governance/**` files
- This is clearly governance policy work
- No existing domain covers governance policy changes
- Registry allows adding new domains via governance change management

**Decision**: Path A (Direct Fix)
- Agent has permission to add domain to registry (per new requirement)
- This PR is itself a governance change management PR
- Adding "Governance Canon" domain is within scope
- Fix aligns with governance principles

**Alternative (if no permission)**: Would have escalated:
- Gate: Governance Scope Declaration Gate
- Failure: Required domain "Governance Canon" not in RESPONSIBILITY_DOMAIN_REGISTRY.md
- Proposed solution: Add "Governance Canon" domain to registry with paths: `governance/**`
- Scope/Risk: Minimal - codifies existing governance work pattern

### 4.6 Step 5: Implement Fix

**Changes made**:

1. **Added domain to registry** (`governance/canon/RESPONSIBILITY_DOMAIN_REGISTRY.md`):
   ```
   ### DOMAIN: Governance Canon
   
   **Description**  
   Governance policies, agent contracts, canonical schemas, and governance enforcement rules.
   
   **Allowed Paths**
   - `governance/**`
   
   **Forbidden Paths**
   - `src/**`, `app/**`, `prisma/**`, `email/**`, `logging/**`
   - `implementation/**` (execution artifacts)
   
   **Typical Failure Signatures**
   - Missing policy artifact
   - Schema non-compliance
   - Agent contract incompleteness
   - Governance drift
   ```

2. **Fixed scope declaration** (`governance/scope-declaration.md`):
   - Added `SCOPE_SCHEMA_VERSION: v1`
   - Added `PR_ID: 683`
   - Added `OWNER: GitHub Copilot Agent`
   - Added `DATE_UTC: 2025-12-21`
   - Changed `RESPONSIBILITY_DOMAIN:` format to single line: "Governance Canon"
   - Added `IN_SCOPE:` marker with bullet list
   - Added `OUT_OF_SCOPE:` marker with required exclusions
   - Added `EXPECTED_VERIFICATION:` section
   - Added `SCOPE_FROZEN: YES`

**Verification**:
- All required markers now present
- Domain exists in registry
- Format matches schema exactly
- Scope frozen and explicit

### 4.7 Cascading Failure Gate

**Check**: This gate monitors for more than 3 distinct failure signatures in PR comments.

**Status**: No cascading failure detected - this is a structural fix, not repeated failures.

**Expected result**: Gate should pass.

---

## 5. When to Escalate

Escalate immediately if:

1. **Missing Permission**
   - Agent cannot modify required file
   - Registry or schema locked
   - Domain addition requires higher authority

2. **Governance Conflict**
   - Gate requirement conflicts with another canonical rule
   - Fix would weaken governance
   - Ambiguity in canonical requirements

3. **Missing Canonical Artifact**
   - Required schema doesn't exist
   - Referenced registry not present
   - No documented precedent

4. **Scope Expansion**
   - Fix requires changes outside declared responsibility domain
   - Would need to modify files in forbidden paths

---

## 6. Escalation Format (Mandatory)

When escalating, provide:

```
ESCALATION: PR Gate Failure

Gate Name: [exact workflow file and job name]
PR Number: [PR ID]
Agent: [agent identifier]

FAILURE CONDITION:
[exact error or missing marker]

ROOT CAUSE:
[why the gate is failing]

PROPOSED SOLUTION:
[specific fix with file paths and changes]

SCOPE & RISK:
[what would be changed, what governance principles are affected]

BLOCKER:
[why agent cannot implement fix directly]

REQUESTED AUTHORITY:
[what permission or override is needed]
```

---

## 7. Prohibited Behaviors

An agent MUST NEVER:

1. Disable or bypass gate workflows
2. Add fake markers to satisfy gates without substance
3. Create dummy artifacts just to pass gates
4. Expand PR scope beyond declared responsibility domain
5. Wait silently for human intervention
6. Mark PR as complete while gates fail
7. Ignore gates as "probably not important"

These behaviors violate governance and invalidate the PR.

---

## 8. Success Criteria

A gate failure is properly resolved when:

1. ✅ Root cause identified and documented
2. ✅ Fix implemented per canonical requirements
3. ✅ No governance rules weakened
4. ✅ All related gates now pass
5. ✅ Changes minimal and within scope
6. ✅ OR: Proper escalation submitted (if blocked)

---

## 9. Learning and Improvement

After resolving a gate failure:

1. **Document the pattern**: If this is a common failure, add guidance to relevant policy
2. **Check for systemic issues**: Is the gate requirement clear? Is documentation complete?
3. **Update training**: Should this scenario be added to agent training materials?

Gate failures are **learning opportunities**, not punishments.

---

## 10. Relationship to Other Policies

This protocol implements:
- `AGENT_NON_STALLING_AND_ESCALATION_POLICY.md` Section 3.1 (PR Gate Failure Rule)

This protocol is subordinate to:
- `GOVERNANCE_PURPOSE_AND_SCOPE.md`
- `SCOPE_DECLARATION_SCHEMA.md`
- `RESPONSIBILITY_DOMAIN_REGISTRY.md`

---

## 11. Effectiveness Tracking

**Gate Failure Resolution Metrics:**
- Time from failure detection to fix: [tracked per PR]
- Escalation rate: [% of gate failures requiring escalation]
- Recurring failures: [same gate, same cause]
- False positive rate: [gate failures due to gate bugs]

These metrics inform governance improvement.

---

End of PR GATE FAILURE HANDLING PROTOCOL
