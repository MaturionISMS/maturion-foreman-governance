# RIPPLE SIGNAL: Execution Bootstrap Protocol Enforcement

## Ripple Metadata
**Signal ID**: RS-2026-01-11-EXECUTION-BOOTSTRAP-PROTOCOL  
**Type**: MANDATORY COMPLIANCE  
**Severity**: HIGH  
**Effective Date**: 2026-01-11  
**Compliance Deadline**: 2026-02-11 (30 days)  
**Issuing Authority**: Maturion Governance Administrator  
**Canonical Source**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

---

## Executive Summary

**MANDATORY**: All FM orchestration and builder agent PRs in ALL repositories must comply with the **7-Step Execution Bootstrap Protocol** effective immediately.

**Key Changes**:
1. All FM and Builder PRs MUST include PREHANDOVER_PROOF in PR description
2. All agents MUST execute locally and validate gates before handover
3. PR Gate Release Checklists updated with mandatory Category 0 (Execution Bootstrap)
4. Enforcement scripts, reference implementations, and escalation procedures provided

**Impact**: Moderate — Requires agent contract updates and process changes in all application repositories

**Ripple Targets**: 
- foreman-office-app (FM + Builders)
- PartPulse (FM + Builders)
- R_Roster (FM + Builders)
- All future application repositories with FM orchestration or builder agents

---

## What Changed

### 1. Governance Canon Updates

**New Documents**:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` (v1.0.0) — Full protocol specification
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — PR description template
- `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md` — Implementation guide
- `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md` — Escalation procedures
- `governance/templates/workflows/validate-prehandover-proof.sh` — Validation script

**Updated Documents**:
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v1.0.0 → v2.0.0)
  - Added mandatory Category 0: Execution Bootstrap Protocol
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v1.1.0 → v2.0.0)
  - Added mandatory Category 0: Execution Bootstrap Protocol

### 2. New Requirements

All FM Orchestration and Builder PRs MUST:

1. ✅ **Document requirements** (Step 1) — Clear list of what must be created/changed
2. ✅ **Create actual artifacts** (Step 2) — Actually create, not just document
3. ✅ **Execute/verify locally** (Step 3) — Run validation, tests, builds locally
4. ✅ **Capture output** (Step 4) — Terminal logs, exit codes, timestamps
5. ✅ **Validate preflight** (Step 5) — Enumerate and check all gates before PR
6. ✅ **Attach PREHANDOVER_PROOF** (Step 6) — Complete proof in PR description
7. ✅ **Declare complete** (Step 7) — Only after Steps 1-6 complete and GREEN

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

### 3. Scope

**MANDATORY FOR**:
- ✅ Workflow file changes
- ✅ Agent contract changes
- ✅ Configuration changes affecting CI
- ✅ Builder PRs (code, tests, builds)
- ✅ FM orchestration PRs (governance, learning, failures)
- ✅ Any artifact that can fail in CI

**OPTIONAL FOR**:
- 📄 Pure documentation changes (markdown content only)
- 📄 Learning promotion entries
- 📄 Incident reports

**When uncertain, include PREHANDOVER_PROOF.**

---

## Required Actions by Repository

### All Application Repositories (foreman-office-app, PartPulse, R_Roster, etc.)

#### Action 1: Update FM Agent Contracts

**What**: Add explicit PREHANDOVER_PROOF obligation to FM agent contracts

**Where**: `.github/agents/ForemanApp-agent.md` (or equivalent)

**Add Section**:
```markdown
## Execution Bootstrap Protocol (MANDATORY)

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

Before creating any PR involving workflows, gates, contracts, or configurations:

1. ✅ Follow 7-step Execution Bootstrap Protocol
2. ✅ Attach PREHANDOVER_PROOF to PR description
3. ✅ Validate all gates in preflight
4. ✅ Capture execution evidence (commands, outputs, exit codes)
5. ✅ Declare complete ONLY after execution GREEN locally

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v2.0.0+)

**Prohibition**: Do NOT hand over PRs without PREHANDOVER_PROOF when required.

**Escalation**: If unclear whether PREHANDOVER_PROOF required, escalate per `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`.
```

**Deadline**: 2026-02-11

---

#### Action 2: Update Builder Agent Contracts

**What**: Add explicit PREHANDOVER_PROOF obligation to all builder agent contracts

**Where**: `.github/agents/*-builder.md` (all builders)

**Add Section**:
```markdown
## Execution Bootstrap Protocol (MANDATORY)

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

Before creating any PR:

1. ✅ Follow 7-step Execution Bootstrap Protocol
2. ✅ Run full local build and test suite
3. ✅ Capture build logs and test output
4. ✅ Attach PREHANDOVER_PROOF to PR description
5. ✅ Validate preflight gates (BUILD_QA_REPORT, GOVERNANCE_COMPLIANCE_REPORT, QIEL)
6. ✅ Declare complete ONLY after 100% GREEN locally

**Builder-Specific Requirements**:
- Step 3 MUST include: Full build execution, complete test suite, linting, type checking
- Step 4 MUST include: Build logs showing 100% GREEN, zero failures, zero warnings
- Step 5 MUST include: QA report validation

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v2.0.0+)

**Prohibition**: Do NOT hand over Builder PRs without PREHANDOVER_PROOF demonstrating local Build-to-Green completion.
```

**Deadline**: 2026-02-11

---

#### Action 3: Update GOVERNANCE_ALIGNMENT.md

**What**: Record governance version alignment

**Where**: `governance/GOVERNANCE_ALIGNMENT.md`

**Add Entry**:
```markdown
### 2026-01-11: Execution Bootstrap Protocol Ripple

**Canonical Version Aligned**: v1.0.0 (EXECUTION_BOOTSTRAP_PROTOCOL.md)

**Changes Implemented**:
- ✅ FM agent contract updated with PREHANDOVER_PROOF obligation
- ✅ Builder agent contracts updated with PREHANDOVER_PROOF obligation
- ✅ PR Gate Release Checklists updated to v2.0.0
- ✅ Validation script installed (optional)
- ✅ Reference implementation guide available
- ✅ Escalation procedures documented

**Compliance Status**: COMPLIANT (as of YYYY-MM-DD)

**Ripple Signal**: RS-2026-01-11-EXECUTION-BOOTSTRAP-PROTOCOL
```

**Deadline**: 2026-02-11

---

#### Action 4: Optional - Install Validation Script

**What**: Install PREHANDOVER_PROOF validation script for local/CI use

**Where**: `.github/scripts/validate-prehandover-proof.sh`

**Source**: `governance/templates/workflows/validate-prehandover-proof.sh`

**Usage**:
```bash
# Validate PR description
gh pr view <number> --json body -q .body > /tmp/pr_desc.txt
.github/scripts/validate-prehandover-proof.sh /tmp/pr_desc.txt
```

**Benefit**: Automated validation of PREHANDOVER_PROOF completeness

**Status**: OPTIONAL (recommended for mature repositories)

**Deadline**: N/A (optional)

---

#### Action 5: Communicate to Agents

**What**: Notify all agents (FM, Builders) of new requirement

**How**: 
- Update agent onboarding materials
- Add to agent training documentation
- Reference in PR templates
- Add to CONTRIBUTING.md (if exists)

**Message**:
```markdown
## New Requirement: PREHANDOVER_PROOF (Effective 2026-01-11)

All FM and Builder PRs must include PREHANDOVER_PROOF in PR description.

**What is PREHANDOVER_PROOF?**
Execution evidence proving you validated locally before handover.

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`  
**Guide**: `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md`  
**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_<ROLE>.md` (v2.0.0+)

**Required for**: Workflows, contracts, configs, builder PRs, FM orchestration PRs  
**Optional for**: Pure documentation changes

**When uncertain, include PREHANDOVER_PROOF.**

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
```

**Deadline**: 2026-01-25 (2 weeks)

---

## Validation Checklist

Use this checklist to verify repository compliance:

### Repository: _______________

- [ ] **FM agent contract updated** with PREHANDOVER_PROOF obligation
- [ ] **Builder agent contracts updated** with PREHANDOVER_PROOF obligation (all builders)
- [ ] **GOVERNANCE_ALIGNMENT.md updated** with ripple entry
- [ ] **Agents notified** of new requirement
- [ ] **PR templates updated** (if applicable)
- [ ] **CONTRIBUTING.md updated** (if applicable)
- [ ] **Optional: Validation script installed** (recommended)
- [ ] **Test PR created** with PREHANDOVER_PROOF to validate understanding
- [ ] **Compliance declared** in GOVERNANCE_ALIGNMENT.md

**Compliance Date**: _______________  
**Verified By**: _______________

---

## Timeline

| Date | Milestone |
|------|-----------|
| 2026-01-11 | Ripple signal issued, protocol effective immediately |
| 2026-01-25 | All agents notified (2 weeks) |
| 2026-02-11 | All repositories compliant (30 days) |
| 2026-02-18 | Compliance review and reporting (37 days) |
| 2026-03-11 | Quarterly compliance audit (60 days) |

---

## Support and Resources

### Documentation

1. **Protocol Specification**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
2. **Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
3. **Reference Guide**: `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md`
4. **Escalation**: `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`
5. **FM Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v2.0.0)
6. **Builder Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v2.0.0)

### Tools

- **Validation Script**: `governance/templates/workflows/validate-prehandover-proof.sh`
- **Evidence Capture Helper**: See Reference Implementation Guide Section "Tools and Helpers"

### Support

- **Questions**: Create issue in `maturion-foreman-governance` with label `execution-bootstrap-protocol`
- **Escalations**: Use templates in `EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`
- **Blockers**: Tag @governance-repo-administrator or @APGI-cmy

---

## Enforcement

### Immediate (2026-01-11 onwards)

- All new FM and Builder PRs SHOULD include PREHANDOVER_PROOF
- Reviewers SHOULD request PREHANDOVER_PROOF if missing (where required)
- Agents SHOULD follow 7-step protocol

### Transitional (2026-01-11 to 2026-02-11)

- Grace period for agent contract updates
- Clarifications and escalations handled promptly
- Patterns documented for learning

### Mandatory (2026-02-11 onwards)

- All FM and Builder PRs MUST include PREHANDOVER_PROOF (where required)
- Reviewers MUST NOT approve PRs missing required PREHANDOVER_PROOF
- Violations escalated per `EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`

---

## Rationale

### Problem Addressed

**Historical Pattern**: Agents claiming completion by documenting that artifacts exist without proving they execute successfully.

**Incidents**:
- R_Roster PR #8: Directories documented but not created
- PR #895: Catastrophic handover without verification
- Multiple: CI failures discovering issues that should have been caught in preflight

**Constitutional Basis**:
- `CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — CI confirms preflight success, does not discover failures
- `PR_GATE_PRECONDITION_RULE.md` — No green gate, no handover

### Solution

Make execution verification **mandatory** before any handover, with explicit prehandover proof required in every applicable PR.

**Success Criteria**:
- ✅ No PR accepted without PREHANDOVER_PROOF (for execution-verified changes)
- ✅ Agents demonstrate local execution before every handover
- ✅ CI failures decrease (preflight catches issues)
- ✅ No repeat of "documented but not executed" failures

---

## FAQ

### Q1: Is PREHANDOVER_PROOF required for ALL PRs?

**A**: No. MANDATORY for PRs involving workflows, gates, contracts, configurations, or builder PRs (anything that can fail in CI). OPTIONAL for pure documentation changes.

### Q2: What if I can't run CI gates locally?

**A**: Use simulation, manual checklist validation, or enumerate gates and explain validation approach. Goal is to demonstrate you evaluated gates BEFORE handover.

### Q3: What if PREHANDOVER_PROOF is incomplete?

**A**: Reviewer should request updates. If pattern repeats, escalate per `EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`.

### Q4: What if I'm uncertain whether PREHANDOVER_PROOF is required?

**A**: Default to including it. If uncertain, escalate for clarification.

### Q5: How do I validate compliance in my repository?

**A**: Use the validation checklist above. Create test PR with PREHANDOVER_PROOF. Verify agent contracts updated.

### Q6: What happens if I violate this protocol?

**A**: First violation: Clarification and guidance. Repeated violations: Escalation and incident report. See `EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`.

---

## Quarterly Compliance Reporting

### Required Metrics

Each repository must track and report quarterly:

1. **Total FM PRs created**: <count>
2. **FM PRs with PREHANDOVER_PROOF**: <count> (<percentage>%)
3. **Total Builder PRs created**: <count>
4. **Builder PRs with PREHANDOVER_PROOF**: <count> (<percentage>%)
5. **PRs merged without required PREHANDOVER_PROOF**: <count> (target: 0)
6. **CI failures caught in preflight**: <count>
7. **CI failures not caught in preflight**: <count>
8. **Escalations related to protocol**: <count>

**Report Format**: Create `governance/evidence/compliance/EXECUTION_BOOTSTRAP_PROTOCOL_COMPLIANCE_Q<X>_<YEAR>.md`

**Reporting Deadline**: Within 2 weeks of quarter end

**First Report Due**: 2026-04-14 (Q1 2026)

---

## Related Ripple Signals

- None yet (this is the inaugural ripple for this protocol)

---

## Acknowledgment

Repositories must acknowledge receipt and planned compliance by creating an issue:

**Title**: `[RIPPLE] Execution Bootstrap Protocol Compliance - <Repo Name>`

**Body**:
```markdown
## Ripple Signal Acknowledgment

**Signal ID**: RS-2026-01-11-EXECUTION-BOOTSTRAP-PROTOCOL  
**Repository**: <repo-name>  
**Acknowledged By**: <name>  
**Acknowledgment Date**: <YYYY-MM-DD>

**Planned Compliance Date**: <YYYY-MM-DD> (must be ≤ 2026-02-11)

**Action Items**:
- [ ] FM agent contract update
- [ ] Builder agent contracts update
- [ ] GOVERNANCE_ALIGNMENT.md update
- [ ] Agent notification
- [ ] Optional: Validation script installation
- [ ] Test PR with PREHANDOVER_PROOF
- [ ] Compliance declaration

**Assigned To**: <name>
```

**Deadline for Acknowledgment**: 2026-01-18 (7 days)

---

**Status**: Active Ripple Signal  
**Authority**: Governance Administrator  
**Last Updated**: 2026-01-11

---

*End of Ripple Signal: Execution Bootstrap Protocol Enforcement*
