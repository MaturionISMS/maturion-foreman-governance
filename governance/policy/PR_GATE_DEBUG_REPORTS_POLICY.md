# PR Gate Debug Reports Policy

**Authority:** Johan Ras  
**Status:** Canonical  
**Responsibility Domain:** PR Gate Observability & Debug Artifacts  
**Version:** 1.0

---

## 1. Purpose

This policy establishes the canonical mechanism for PR gates to emit structured, repository-visible debug artifacts that describe gate execution results before failing.

### Problem Statement

The current PR gate enforcement model relies on:
- GitHub UI
- PR comments via API
- CI logs (ephemeral)

This creates a **structural visibility gap**:
- Builder agents cannot access GitHub Issues API, PR comments, or Actions logs
- Johan is functionally code-illiterate by design and cannot rely on CI logs
- Builders may hand over work that appears complete but fails PR gates after handover

This violates the core invariant:
> **Builders must never hand over builds that will fail PR gates.**

The issue is not governance logic, but **where the truth lives**.

### Solution

Move PR gate failure truth from:
- ❌ GitHub UI / ephemeral logs

To:
- ✅ Repository-visible, machine-readable artifacts

So that:
- Builder agents can see, reason about, and fix failures
- Johan can inspect failures via files, not logs
- Automation becomes possible
- One-Time Build Law becomes mechanically enforceable

---

## 2. Gate Debug Report Format

Every PR gate MUST emit a structured debug report before failing.

### 2.1 Report Location

Reports MUST be written to:
```
.github/gate-reports/<gate-name>-<pr-number>.md
```

Examples:
- `.github/gate-reports/scope-declaration-683.md`
- `.github/gate-reports/cascading-failure-683.md`
- `.github/gate-reports/governance-gate-683.md`

### 2.2 Report Schema

Reports MUST include the following sections:

```markdown
# Gate Debug Report: <Gate Name>

**PR Number:** <number>
**Commit SHA:** <sha>
**Execution Time:** <ISO 8601 timestamp>
**Gate Result:** PASS | FAIL
**Exit Code:** <number>

---

## Gate Configuration

- **Workflow File:** `.github/workflows/<file>.yml`
- **Trigger:** <pull_request event type>
- **Runner:** <OS>

---

## Execution Summary

<Human-readable description of what the gate checked>

---

## Check Results

### Check 1: <Name>
- **Status:** ✅ PASS | ❌ FAIL
- **Details:** <Specific findings>
- **Evidence:** <File paths, line numbers, commands executed>

### Check 2: <Name>
- **Status:** ✅ PASS | ❌ FAIL  
- **Details:** <Specific findings>
- **Evidence:** <File paths, line numbers, commands executed>

---

## Failure Analysis (if FAIL)

**Root Cause:**
<Clear explanation of why gate failed>

**Required Actions:**
1. <Action 1>
2. <Action 2>

**Examples / References:**
<Links to canonical examples or schema files>

---

## Artifacts

**Files Inspected:**
- `<path>` (line X-Y)
- `<path>` (entire file)

**Commands Executed:**
```bash
<actual commands run>
```

**Output:**
```
<relevant output excerpts>
```

---

## Machine-Readable Summary

```json
{
  "gate": "<gate-name>",
  "pr": <number>,
  "commit": "<sha>",
  "result": "PASS" | "FAIL",
  "exit_code": <number>,
  "timestamp": "<ISO 8601>",
  "checks": [
    {
      "name": "<check-name>",
      "status": "PASS" | "FAIL",
      "evidence": ["<path>", "<command>"]
    }
  ],
  "required_actions": ["<action>"]
}
```

---

**Signature:**  
Gate: `<gate-name>`  
Authority: Governance System  
Generated: <timestamp>
```

---

## 3. Normative Requirements

### 3.1 Gate Debug Reports Are Authoritative

**NORMATIVE REQUIREMENT:**

Gate Debug Reports emitted to `.github/gate-reports/` are the **authoritative source of truth** for gate execution results.

**For:**
- Builder agents
- FM agents
- Governance agents
- Human oversight (Johan)

**Non-Authoritative Surfaces (Diagnostic Only):**
- GitHub UI
- CI logs
- PR comments
- GitHub Actions output

Agents MUST make decisions (handover, escalation, retry) **solely** based on Gate Debug Reports.

### 3.2 Prohibited Behavior

Agents are **STRICTLY FORBIDDEN** from:

❌ Relying on CI logs for gate status  
❌ Relying on PR comments for gate status  
❌ Relying on GitHub UI state for gate status  
❌ Assuming gate passed without reading its debug report  
❌ Handing over PRs when gate reports are missing  
❌ Treating absence of report as "gate passed"

**Violation Consequence:** Classified as catastrophic builder failure per Builder Handover Compliance rule.

### 3.3 Failure to Emit Report = Gate Failure

**MANDATORY RULE:**

If a gate runs but does NOT emit a report to `.github/gate-reports/`, the gate MUST be considered **FAILED**.

Agents MUST escalate with:
- Gate name
- Evidence of missing report
- Request for gate workflow fix

### 3.4 Machine-Readable Schema (Normative)

All Gate Debug Reports MUST include a machine-readable JSON summary block conforming to:

**Schema Location:** `governance/schema/GATE_DEBUG_REPORT_SCHEMA.json`

**Required Fields (Non-Negotiable):**
- `gate_name` (string)
- `gate_id` (string, kebab-case)
- `pr_number` (integer)
- `status` (enum: "PASS" | "FAIL")
- `failure_signatures` (array of strings, empty if PASS)
- `failure_count` (integer >= 0)
- `summary` (string)
- `required_action` (array of strings, empty if PASS)
- `timestamp_utc` (ISO 8601 string)
- `source_commit` (string, 40-char SHA)

**Optional Fields:**
- `exit_code` (integer)
- `checks` (array of check objects)
- `workflow_file` (string)
- `runner` (string)

Agents MUST parse this JSON block to determine gate status programmatically.

### 3.5 Report Location (Canonical)

Reports MUST be written to:
```
.github/gate-reports/<gate-id>-<pr-number>.md
```

Examples:
- `.github/gate-reports/cascading-failure-683.md`
- `.github/gate-reports/scope-declaration-683.md`

**NOT:** `.governance/gate-reports/` (incorrect path)

## 4. Integration Requirements

### 4.1 Mandatory for All Gates

ALL PR gates MUST emit debug reports per this policy:
- `governance-scope-declaration-gate.yml`
- `governance-cascading-failure-gate.yml`
- `governance-gate.yml`
- `fm-*-gate.yml` (all FM gates)
- Any future PR gates

### 4.2 Emission Timing

Reports MUST be emitted:
- **Before** the workflow exits with failure status
- **After** all checks have completed
- **Regardless** of pass/fail outcome (for auditability)

### 4.3 Commit and Push

Gate workflows MUST:
1. Generate the report file
2. Commit it to `.github/gate-reports/`
3. Push to the PR branch
4. Then exit with appropriate status

This ensures the report is visible in the repository before CI fails.

---

## 5. Builder Agent Requirements

### 5.1 Pre-Handover Verification

Before handing over ANY PR, builder agents MUST:

1. **Enumerate applicable gates** (see Builder Handover Compliance rule)
2. **Check for gate reports** in `.github/gate-reports/` for current PR
3. **Parse report results**:
   - If any report shows `"result": "FAIL"` → MUST fix or escalate
   - If no reports exist → gate has not run yet → MUST NOT hand over
   - If all reports show `"result": "PASS"` → may proceed with handover

### 5.2 Report-Based Escalation

If a gate report shows FAIL:
- Agent MUST read the **Failure Analysis** section
- Agent MUST attempt to implement **Required Actions**
- If unable to fix: MUST escalate per `PR_GATE_FAILURE_HANDLING_PROTOCOL.md`

### 5.3 Prohibited Assumptions

Agents are STRICTLY FORBIDDEN from:
- Assuming a gate will pass without checking its report
- Handing over when gate reports are missing
- Treating the absence of a report as "gate passed"

---

## 6. Johan's Interface

Johan can now inspect gate failures by:
1. Opening `.github/gate-reports/<gate>-<pr>.md`
2. Reading the **Execution Summary** (human-readable)
3. Reviewing **Failure Analysis** (if present)
4. Checking **Required Actions** (actionable steps)

No CI log spelunking required.

---

## 7. Relationship to Other Policies

This policy supports:
- **PR_GATE_FAILURE_HANDLING_PROTOCOL.md** (Step 1: Investigate → now reads gate reports)
- **AGENT_NON_STALLING_AND_ESCALATION_POLICY.md** (Section 3.1: PR Gate Failure Rule)
- **Builder Handover Compliance** (preflight verification now mechanically possible)

---

## 8. Governance Safeguards

### 8.1 No Weakening of Enforcement

This policy does NOT:
- Relax thresholds
- Disable checks
- Add bypasses
- Modify gate logic

It only adds **observability**.

### 8.2 One-Time Build Law

Gate reports make it mechanically enforceable that:
> A builder can see gate results before handover.

This closes the visibility gap that previously made Builder Handover Compliance unverifiable.

---

## 9. Implementation Authority

**One-Time Authorized Override** by Johan Ras:
- Agents may modify gate workflows to add report emission
- Agents may create `.github/gate-reports/` directory
- Agents may write this policy file

Scope limited to observability enhancement only.

---

## 10. Mandatory Adoption Timeline

- **Immediate:** This policy is canonical upon commit
- **Phase 1 (This PR):** Implement for `governance-cascading-failure-gate.yml` (blocker)
- **Phase 2 (Next PR):** Implement for remaining governance gates
- **Phase 3 (Future):** Implement for FM gates

---

## 11. Audit Trail

All gate reports are:
- Committed to version control
- Immutable once pushed
- Timestamped
- Traceable to specific PR and commit

This creates a permanent record of gate execution history.

---

**Authority:** Johan Ras  
**Classification:** Canonical Governance Policy  
**Binding:** Immediate  
**Responsibility Domain:** PR Gate Observability & Debug Artifacts
