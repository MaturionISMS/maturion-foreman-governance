# Builder-First PR Merge Model (Canonical)

**Status**: Constitutional - Mandatory  
**Authority**: Supreme (Cannot be overridden)  
**Version**: 1.0.0  
**Effective Date**: 2025-12-22  
**Supersedes**: Legacy CI-as-Truth model, governance-cascading-failure-gate, governance-scope-declaration-gate

---

## Executive Summary

This document defines the **Builder-First PR Merge Model**, establishing Builder QA reports as the **canonical source of truth** for PR merge readiness. This model completes the governance transition from:

```
❌ OLD: CI-as-Truth → Builder responds to CI
✅ NEW: Builder QA-as-Truth → CI enforces Builder's truth
```

Under this model:
- **Builders** generate QA reports that determine merge readiness
- **CI/PR Gates** enforce presence and validity of Builder QA artifacts only
- **No CI diagnostics, inference, or debugging authority**

---

## Constitutional Mandate

### Governance Alignment

This model implements and enforces:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - QA as proof, not intent
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, 100% GREEN mandate
- **QA_POLICY_MASTER.md** - Builder QA execution as canonical truth
- **Zero Test Debt Constitutional Rule** - No partial correctness

### Authority Hierarchy

1. **Johan** (Human Authority)
2. **Canonical Governance Documents** (GOVERNANCE_PURPOSE_AND_SCOPE, etc.)
3. **Builder QA Reports** (`.qa/builder/*` artifacts)
4. **PR Enforcement Gates** (Validate Builder QA artifacts only)
5. ~~CI Diagnostics~~ (No longer source of truth)

---

## Core Principles

### Principle 1: Builder QA is Canonical Truth

**Definition**: Builder-generated QA artifacts in `.qa/builder/*` are the **sole authority** on:
- Build quality and correctness
- Test execution results
- Governance compliance status
- Merge readiness

**Implementation**: 
- Builders execute tests, analyze results, and generate reports
- Reports declare PASS/FAIL and READY/NOT_READY
- CI trusts Builder's assessment without reinterpretation

**Rationale**: 
- Builders have full context of the build process
- Builders follow Build Philosophy and governance rules
- Builders are accountable for quality assessment
- CI cannot see or access everything Builders can (e.g., local tools, reasoning context)

---

### Principle 2: CI is Enforcement, Not Truth

**Definition**: CI/PR gates **enforce** the presence and validity of Builder QA artifacts. They do **NOT**:
- Generate their own truth
- Diagnose failures independently
- Interpret logs or test output
- Read PR comments or GitHub Issues
- Use `gh api` to infer state
- Act as debugging systems

**Implementation**:
- Gates check: "Do required artifacts exist?"
- Gates validate: "Are artifacts valid JSON/Markdown?"
- Gates verify: "Do artifacts indicate PASS/COMPLIANT/READY?"
- Gates block: "If not, merge is not authorized"

**Rationale**:
- CI has limited visibility (no local builder context, reasoning logs, etc.)
- CI cannot reconstruct Builder's decision-making process
- Allowing CI to "second-guess" Builder creates dual sources of truth
- This causes confusion, conflicts, and governance drift

---

### Principle 3: Deterministic Merge Flow

**Definition**: A PR's merge outcome is **deterministic** based solely on Builder QA artifacts.

**Guarantee**: If Builder QA artifacts show:
- `BUILD_QA_REPORT.json` → `build_status: "PASS"` AND `merge_readiness.ready: true`
- `GOVERNANCE_COMPLIANCE_REPORT.json` → `compliance_status: "COMPLIANT"`

Then: **PR MUST merge cleanly** (no unexpected failures)

**Anti-Pattern**: PR fails due to:
- CI infrastructure issues
- GitHub API permission errors
- Network timeouts
- Legacy gate assumptions
- "CI saw something Builder didn't see"

**Resolution**: Any non-deterministic failure is a **governance defect** and must be fixed.

---

## Required Builder QA Artifacts

### Location
All Builder QA artifacts MUST be placed in:
```
.qa/builder/
```

### Required Files

#### 1. BUILD_QA_REPORT.json
**Purpose**: Machine-readable report of build and test execution

**Schema**: `governance/schemas/BUILD_QA_REPORT.schema.json`

**Required Fields**:
- `build_status`: "PASS" | "FAIL" | "INCOMPLETE"
- `merge_readiness.ready`: boolean (true = READY_FOR_MERGE)
- `test_results`: Full test execution details
- `qa_execution`: Pre/post build QA status (RED → GREEN)

**Authority**: This report is the canonical source for:
- Build success/failure
- Test pass/fail counts
- Merge authorization

---

#### 2. GOVERNANCE_COMPLIANCE_REPORT.json
**Purpose**: Machine-readable governance compliance assessment

**Schema**: `governance/schemas/GOVERNANCE_COMPLIANCE_REPORT.schema.json`

**Required Fields**:
- `compliance_status`: "COMPLIANT" | "NON_COMPLIANT" | "REQUIRES_REVIEW"
- `governance_checks`: Individual check results
  - `build_philosophy_compliance`
  - `zero_test_debt_compliance`
  - `scope_isolation`
  - `evidence_completeness`

**Authority**: This report is the canonical source for:
- Governance rule compliance
- Constitutional adherence
- Policy violations

---

#### 3. SUMMARY.md
**Purpose**: Human-readable summary of QA execution and results

**Structure**: `governance/schemas/BUILDER_QA_SUMMARY.structure.md`

**Required Sections**:
- Header (Issue #, Builder ID, Timestamp, Status)
- Executive Summary (Merge Readiness)
- Build Status (Build-to-Green indicator)
- Governance Compliance (Overall assessment)
- Test Execution Details
- Blocking Issues (if NOT_READY)

**Authority**: This summary is for human review and audit trail.

---

## PR Enforcement Gate

### Gate Name
`builder-qa-enforcement-gate.yml` (template for application repositories)

### Important: Repository Type Distinction

**This gate is for APPLICATION repositories only**, not for the governance repository itself.

**Application Repositories** (need this gate):
- Contain application code requiring builds, tests, compilation
- Have Builder agents making code changes
- Generate `.qa/builder/*` artifacts after build-to-green
- Need deterministic merge decisions based on build quality

**Governance Repository** (does NOT use this gate):
- Contains only documentation, schemas, policies, templates
- No application code to build or test
- No Builder QA artifacts generated
- Uses `governance-gate.yml` instead (validates governance structure)

**Template Location**: `governance/templates/workflows/builder-qa-enforcement-gate.yml.template`

Application repositories should copy this template to their `.github/workflows/` directory.

### Gate Purpose
Enforce presence and validity of Builder QA artifacts.

### Gate Responsibilities

**ALLOWED** (Enforcement Only):
- ✅ Check that `.qa/builder/BUILD_QA_REPORT.json` exists
- ✅ Check that `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` exists
- ✅ Check that `.qa/builder/SUMMARY.md` exists
- ✅ Validate JSON syntax (can be parsed)
- ✅ Verify `build_status = "PASS"`
- ✅ Verify `merge_readiness.ready = true`
- ✅ Verify `compliance_status = "COMPLIANT"`
- ✅ Block merge if any check fails

**FORBIDDEN** (Not Enforcement):
- ❌ Read PR comments
- ❌ Read GitHub Issues
- ❌ Use `gh api` to infer state
- ❌ Parse log files for failures
- ❌ Run tests independently
- ❌ Diagnose root causes
- ❌ Interpret CI output
- ❌ Act as debugging system
- ❌ Second-guess Builder's assessment

---

### Gate Decision Logic

```
IF artifacts_exist AND 
   artifacts_valid_json AND 
   build_status == "PASS" AND 
   merge_readiness.ready == true AND 
   compliance_status == "COMPLIANT"
THEN
   AUTHORIZE MERGE
ELSE
   BLOCK MERGE
END
```

**Simple Rule**: Gate trusts Builder's reports. If Builder says "READY", gate allows merge. If Builder says "NOT_READY", gate blocks.

---

## PR Merge Contract (Non-Negotiable)

### A PR May ONLY Fail If:

1. **Required artifacts missing**
   - `.qa/builder/BUILD_QA_REPORT.json` does not exist
   - `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json` does not exist
   - `.qa/builder/SUMMARY.md` does not exist

2. **Artifacts are invalid**
   - JSON cannot be parsed (syntax error)
   - Required fields missing from schema
   - Values do not conform to schema types

3. **Builder explicitly reports failure**
   - `build_status != "PASS"`
   - `merge_readiness.ready != true`
   - `compliance_status != "COMPLIANT"`

4. **Deliberate governance violation**
   - Bypass attempt detected
   - Falsified artifacts
   - Unauthorized override

### A PR MUST NOT Fail Due To:

- ❌ CI infrastructure issues
- ❌ GitHub API rate limits or permissions
- ❌ Network timeouts or transient errors
- ❌ Legacy gate assumptions
- ❌ CI "seeing" something Builder couldn't see
- ❌ PR comment content
- ❌ Issue metadata
- ❌ "Cascading failure" counts
- ❌ "Scope declaration" format checks
- ❌ Any form of CI diagnosis or inference

**Guarantee**: If Builder QA artifacts are present, valid, and show PASS/COMPLIANT/READY, the PR **WILL** merge.

---

## Transition Safety Rules

### During Transition Period

**Context**: This model supersedes legacy gates that may have been enforced previously.

**Safety Rule**: Until all legacy gates are decommissioned:
- Governance overrides for legacy gate failures are **authorized**
- Overrides MUST be documented in PR comments
- Overrides cite this document as authority
- No new work may depend on legacy gates

### After Transition Complete

**Effective**: When this document takes effect

**Rule**: Any PR failure is considered **intentional enforcement**:
- If gate blocks → Builder QA artifacts show NOT_READY
- If gate passes → Builder QA artifacts show READY
- No ambiguity, no surprises, no exceptions

**Unexpected Failure Handling**: If PR fails unexpectedly (not due to Builder QA artifacts):
- Classify as **governance defect**
- File incident report
- Fix gate implementation
- Do NOT ask Builder to "work around" gate

---

## Builder Responsibilities

### Pre-Handover (Before PR Creation)

1. **Execute full build-to-green process**
   - Architecture → Red QA → Build → Green QA
   - Follow Build Philosophy strictly
   - Achieve 100% test pass (Zero Test Debt)

2. **Generate QA artifacts**
   - Create `.qa/builder/BUILD_QA_REPORT.json`
   - Create `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`
   - Create `.qa/builder/SUMMARY.md`
   - Ensure all conform to schemas

3. **Validate merge readiness**
   - Verify `build_status = "PASS"`
   - Verify `merge_readiness.ready = true`
   - Verify `compliance_status = "COMPLIANT"`
   - Confirm no test debt, no governance violations

4. **Commit artifacts to PR branch**
   - Add `.qa/builder/*` files to git
   - Commit with message indicating QA completion
   - Push to PR branch before requesting review

### During PR Review

- **Respond to human feedback** (Johan's review)
- **Regenerate artifacts** if code changes
- **Update status** if build state changes
- **Never bypass** artifact generation

### Post-Merge

- **Archive evidence** (if required by governance)
- **Record effectiveness** (success/failure of deployed build)

---

## FM (Foreman) Responsibilities

### QA Orchestration

- Design and provide **Red QA** to builders before build starts
- Define **success criteria** and test requirements
- Ensure builders have architecture and context

### Artifact Review

- **Read Builder QA reports** to understand build state
- **Do NOT run independent CI diagnostics**
- **Trust Builder's assessment** unless evidence of falsification

### Escalation

- If Builder reports indicate failure → Work with Builder to resolve
- If gate blocks unexpectedly → Investigate gate logic, NOT Builder
- If governance violation detected → Follow incident protocol

---

## Governance Administrator Responsibilities

### Schema Maintenance

- Maintain canonical schemas for Builder QA artifacts
- Evolve schemas as governance requirements change
- Ensure schemas are enforceable and auditable

### Gate Integrity

- Audit PR gates to ensure enforcement-only model
- Detect and remove any CI diagnosis logic
- Verify no `gh api` usage for truth inference
- Confirm deterministic merge flow

### Documentation

- Keep this document current and accurate
- Document any exceptions or overrides
- Maintain audit trail of gate behavior

---

## Decommissioned Legacy Gates

### Removed Gates

The following gates are **permanently decommissioned** as of 2025-12-22:

1. **governance-cascading-failure-gate.yml**
   - **Why**: Used `gh api` to read PR comments and infer failure causality
   - **Violation**: CI inferring truth from metadata, not artifacts
   - **Replaced By**: Builder QA artifacts declare failure state directly

2. **governance-scope-declaration-gate.yml**
   - **Why**: Enforced legacy scope declaration format
   - **Violation**: Conflicted with Builder QA report-based model
   - **Replaced By**: Scope compliance included in GOVERNANCE_COMPLIANCE_REPORT.json

### Verification

No workflow may:
- Use `gh api` to read PR comments or issues
- Count "failure signatures" in PR metadata
- Enforce scope declaration file formats
- Infer build state from anything other than `.qa/builder/*` artifacts

---

## Audit & Compliance

### ISO 27001 Alignment

This model satisfies:
- **A.14.2** (Security in development) - Structured, auditable QA process
- **A.12.1.2** (Change management) - Formal approval via Builder QA artifacts
- **A.18.2** (Compliance reviews) - Evidence-based compliance via artifacts

### Evidence Trail

Every PR merge has:
- Builder QA artifacts (`.qa/builder/*`)
- Gate enforcement logs (CI workflow runs)
- Human review (Johan's approval)
- Commit history (who, what, when)

### Auditability

An auditor can:
1. Read Builder QA artifacts to see build quality assessment
2. Read gate logs to see enforcement decisions
3. Verify artifacts conform to canonical schemas
4. Confirm no CI inference or diagnosis occurred

---

## Success Criteria

This model succeeds when:

✅ **PRs with valid Builder QA artifacts always merge cleanly**  
✅ **No surprise failures due to CI infrastructure or assumptions**  
✅ **Merge outcome is deterministic based on artifacts alone**  
✅ **CI never acts as debugging or diagnostic authority**  
✅ **Builders are empowered as canonical QA authority**  
✅ **Governance is enforced through artifacts, not interpretation**

---

## Failure Modes & Mitigation

### Failure Mode 1: Missing Artifacts
**Symptom**: PR fails because `.qa/builder/*` files absent  
**Cause**: Builder forgot to generate or commit artifacts  
**Mitigation**: Builder must generate artifacts before PR  
**NOT**: Gate tries to "work around" missing artifacts

### Failure Mode 2: Invalid Artifacts
**Symptom**: PR fails because JSON syntax errors  
**Cause**: Builder generated malformed JSON  
**Mitigation**: Builder fixes JSON and regenerates  
**NOT**: Gate tries to "repair" invalid JSON

### Failure Mode 3: Builder Reports Failure
**Symptom**: PR fails because `build_status != "PASS"`  
**Cause**: Build genuinely failed (tests failing, etc.)  
**Mitigation**: Builder fixes build, achieves GREEN, regenerates artifacts  
**NOT**: Override gate to "merge anyway"

### Failure Mode 4: Gate Logic Error
**Symptom**: PR fails despite valid PASS/READY artifacts  
**Cause**: Gate implementation bug  
**Mitigation**: Fix gate logic, NOT Builder artifacts  
**Classification**: Governance defect, NOT build failure

---

## Glossary

- **Builder**: AI agent executing build-to-green (e.g., GitHub Copilot, Local Builder)
- **Builder QA Artifacts**: JSON and Markdown files in `.qa/builder/*`
- **Canonical Truth**: Single authoritative source (Builder QA reports)
- **Enforcement-Only**: Gate validates artifacts exist/valid, does NOT diagnose
- **Build-to-Green**: Process of RED QA → Build → GREEN QA
- **Merge Readiness**: Boolean indicator from Builder (ready to merge or not)
- **CI Inference**: CI attempting to determine truth from logs/metadata (FORBIDDEN)
- **Deterministic**: Same inputs always produce same outputs (guaranteed merge flow)

---

## Version History

### v1.0.0 (2025-12-22)
- Initial release
- Establishes Builder-First PR Merge Model
- Decommissions legacy cascading failure and scope declaration gates
- Defines Builder QA artifact schemas and enforcement gate
- Implements enforcement-only CI model

---

## Authority Statement

**This document is constitutional and binding.**

All PRs MUST follow this model. No repository, agent, or workflow may:
- Redefine what constitutes "merge readiness"
- Add additional CI-based truth sources
- Override Builder QA artifacts with CI diagnostics
- Introduce new forms of CI inference

**Violations are governance incidents and must be escalated.**

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Last Updated**: 2025-12-22

---

*End of Builder-First PR Merge Model v1.0.0*
