# Execution Bootstrap Protocol Ripple Plan

**Type**: Governance Canon Ripple  
**Source**: Canonical Protocol EXECUTION_BOOTSTRAP_PROTOCOL.md v1.0.0  
**Origin**: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md  
**Date**: 2026-01-11  
**Status**: Layer-Down Advisory (Cross-Repo)  
**Issue Reference**: Add Execution Bootstrap Protocol to All Agent Onboarding

---

## Executive Summary

**What Changed**: Canonization of Execution Bootstrap Protocol establishing mandatory 7-step execution verification before PR handover for all executable artifacts.

**Core Principle**: "CI confirms success, does NOT discover failures" — all execution verification MUST happen in preflight, before PR handover.

**Key Requirements**:
- 7-step execution verification process (Document → Create → Execute → Capture → Validate → Attach → Declare)
- PREHANDOVER_PROOF required in PR descriptions for executable artifacts
- All PR gates enumerated and validated in preflight
- Local execution with captured evidence before handover

**Impact**: Eliminates "documented but not executed" failures (R_Roster PR #8 pattern, INCIDENT-2026-01-08-PR895).

---

## Ripple Scope

### In-Repo (Governance) — COMPLETED

- ✅ EXECUTION_BOOTSTRAP_PROTOCOL.md created (v1.0.0, canonical definition)
- ✅ PREHANDOVER_PROOF_TEMPLATE.md created (template for agents)
- ✅ AGENT_ONBOARDING_QUICKSTART.md updated (Step 6A, mandatory compliance)
- ✅ governance/profiles/builder.v1.md updated (v1.2, Section 8)
- ✅ governance/profiles/reviewer.v1.md updated (v1.1, Section 8)
- ✅ FM_BUILDER_APPOINTMENT_PROTOCOL.md updated (v1.2.0, Section 3.7)
- ✅ PR_GATE_RELEASE_CHECKLIST_BUILDER.md updated (v1.2.0, Category 8)
- ✅ PR_GATE_RELEASE_CHECKLIST_FM.md updated (v1.1.0, Category 4)
- ✅ PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md updated (v1.1.0, Category 4)
- ✅ BUILDER_CONTRACT_BINDING_CHECKLIST.md updated (v1.2.0, Section A.13)

### Cross-Repo (Application Repos) — ADVISORY PROPOSALS

**Target Repositories**:
- maturion-foreman-office-app (FM + Builders)
- R_Roster (Builders)
- Any future application repositories with FM/Builder agents
- External contractor repositories

**Nature**: Read-only advisory proposals. All cross-repo changes require contract owner approval and FM coordination.

---

## Layer-Down Proposals (Advisory)

### Phase 1: FM Agent Contract Updates

**Target File**: `.github/agents/ForemanApp-agent.md` (or equivalent FM contract)

**Proposed Addition**:

```markdown
## Execution Bootstrap Protocol Enforcement

FM is responsible for enforcing the Execution Bootstrap Protocol (maturion-foreman-governance/governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md) across all builder PRs.

### FM Responsibilities

**During Builder Appointment** (Constitutional Onboarding):
- MUST explicitly communicate 7-step execution verification requirement
- MUST explain PREHANDOVER_PROOF obligation for executable artifacts
- MUST require builder acknowledgment of execution bootstrap protocol
- MUST verify builder understanding before authorization

**During Builder PR Review**:
- MUST validate PREHANDOVER_PROOF completeness for PRs with executable artifacts
- MUST verify all 7 steps documented (Document → Create → Execute → Capture → Validate → Attach → Declare)
- MUST confirm all gates enumerated and validated in preflight
- MUST verify exit codes are 0 (success) before approval
- MUST request builder to provide PREHANDOVER_PROOF if missing

**Prohibition**:
- MUST NOT approve builder PRs with executable artifacts lacking PREHANDOVER_PROOF
- MUST NOT accept "I tested it" without captured evidence
- MUST NOT bypass prehandover proof requirement

### Template Reference

Builder PREHANDOVER_PROOF template: `maturion-foreman-governance/governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

### Escalation

If builder repeatedly submits PRs without PREHANDOVER_PROOF: FM MUST escalate to Governance Administrator for contract remediation.
```

**Justification**: FM is the orchestrator and supervisor of builders. FM must enforce execution verification requirements during appointment and PR review.

**Authority**: Advisory proposal requiring FM contract owner approval.

---

### Phase 2: Builder Agent Contract Updates

**Target Files**: `.github/agents/*-builder.md` (all builder contracts)

**Proposed Addition**:

```markdown
## Execution Bootstrap Protocol Binding

This builder is bound to the Execution Bootstrap Protocol (maturion-foreman-governance/governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md).

### 7-Step Execution Verification Process

Before handing over any PR with executable artifacts (workflows, gates, contracts, configurations), this builder MUST:

1. **Document Requirements** - List what must be created/changed
2. **Create Actual Artifact** - Actually create it (don't just document intent)
3. **Execute/Verify Locally** - Run it in your environment
4. **Capture Output** - Save terminal output, exit codes (must be 0)
5. **Validate Preflight** - Confirm ALL PR gates would pass before creating PR
6. **Attach PREHANDOVER_PROOF** - Include complete evidence in PR description
7. **Declare Complete** - Only after steps 1-6 are GREEN

### PREHANDOVER_PROOF Requirement

**Mandatory For**:
- Directory structure creation
- Workflow installation/modification
- Agent contract deployment
- Gate implementation
- Configuration changes affecting CI
- Any artifact that can fail in CI

**PREHANDOVER_PROOF Must Include**:
- Artifacts created (with verification commands)
- Execution validation (commands run, outputs, exit codes)
- Preflight gate status (ALL gates enumerated and checked)
- Execution timestamp and environment
- Handover guarantee

**Template**: `maturion-foreman-governance/governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

### Prohibitions

This builder MUST NOT:
- Hand over PRs without PREHANDOVER_PROOF when required
- Claim completion based only on artifact creation without execution
- Rely on CI to discover execution failures (preflight catches issues first)
- Skip gate enumeration or preflight validation
- Declare "complete" without local validation success

### Critical Principle

**CI confirms success, does NOT discover failures.** This builder MUST catch all execution issues in preflight validation before handover.
```

**Justification**: Builders create executable artifacts and must prove local execution before handover. This prevents "documented but not executed" failures.

**Authority**: Advisory proposal requiring builder contract owner approval and FM coordination.

---

### Phase 3: Repository Documentation Updates

**Target Files**: Repository README.md, CONTRIBUTING.md, or developer documentation

**Proposed Addition**:

```markdown
## PR Handover Requirements

All PRs containing executable artifacts (workflows, gates, contracts, configurations) MUST include PREHANDOVER_PROOF in the PR description.

### What is PREHANDOVER_PROOF?

PREHANDOVER_PROOF is evidence that:
1. Artifacts were created and verified locally
2. Execution succeeded with exit codes 0
3. All PR gates were enumerated and validated in preflight
4. Handover guarantees execution success (CI confirms, not discovers)

### Template

See: `maturion-foreman-governance/governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

### Why Required?

Prevents "documented but not executed" failures where artifacts exist but fail in CI. Local execution verification ensures CI confirms success rather than discovering failures.

### When Required?

**Mandatory**:
- Workflow files (`.github/workflows/*.yml`)
- Agent contracts (`.github/agents/*.md`)
- Gate implementations
- CI/CD configurations

**Optional** (but recommended):
- Documentation-only changes
- Markdown content updates
```

**Justification**: Repository-level documentation ensures all contributors (human and agent) understand execution verification requirements.

**Authority**: Advisory proposal requiring repository owner approval.

---

### Phase 4: External Contractor Guidance

**Target Audience**: External contractors, third-party builders, guest contributors

**Proposed Document**: `docs/CONTRACTOR_EXECUTION_REQUIREMENTS.md` (or similar)

**Content**:

```markdown
# Execution Requirements for External Contributors

## Overview

This repository follows the **Execution Bootstrap Protocol** from the Maturion governance framework.

All PRs with executable artifacts must include **PREHANDOVER_PROOF** — evidence of local execution before handover.

## What You Need to Know

### 1. Executable Artifacts

If your PR includes:
- Workflow files (`.github/workflows/*.yml`)
- Configuration files affecting CI
- Scripts or automation
- Agent contracts or governance files

Then you MUST provide PREHANDOVER_PROOF.

### 2. What is PREHANDOVER_PROOF?

Documented evidence that you:
- Created the artifacts locally
- Executed them successfully (exit codes 0)
- Validated all PR gates in preflight
- Guarantee CI will confirm success (not discover failures)

### 3. Template

Copy this template into your PR description:
[Link to PREHANDOVER_PROOF_TEMPLATE.md or inline template]

### 4. Example

See: [Link to example PR with PREHANDOVER_PROOF]

## Why This Matters

**Principle**: "CI confirms success, does NOT discover failures."

By proving local execution before PR handover:
- CI becomes confirmatory (validates your work) instead of diagnostic (finds your errors)
- Reduces CI churn and pipeline pollution
- Faster PR approval (reviewers trust execution evidence)
- Higher quality handovers

## Questions?

Contact: [FM/Repository maintainer contact]
```

**Justification**: External contributors may not be familiar with Maturion governance. Clear, standalone guidance ensures consistent execution verification across all contributor types.

**Authority**: Advisory proposal requiring repository owner approval.

---

## Implementation Sequence

### Recommended Rollout

**Phase 1: Governance Repo** ✅ COMPLETE
- All governance documents updated
- Templates and checklists ready
- Onboarding materials revised

**Phase 2: FM Contract Update** (Next)
- Update FM contract with enforcement obligations
- FM becomes PREHANDOVER_PROOF validator
- Requires FM contract owner approval

**Phase 3: Builder Contract Updates** (After Phase 2)
- Update all builder contracts with execution bootstrap binding
- Requires builder contract owner approval + FM coordination
- Can be done incrementally (builder by builder)

**Phase 4: Repository Documentation** (Parallel with Phase 3)
- Update README, CONTRIBUTING.md
- Add contractor guidance if needed
- Requires repository owner approval

**Phase 5: Validation and Enforcement** (Final)
- Verify all contracts updated
- Confirm PREHANDOVER_PROOF compliance
- Document enforcement metrics

---

## Success Criteria

Execution Bootstrap Protocol ripple is successful when:

- ✅ All FM contracts reference and enforce execution bootstrap protocol
- ✅ All builder contracts include execution bootstrap binding
- ✅ Repository documentation explains PREHANDOVER_PROOF requirement
- ✅ External contractor guidance published (if applicable)
- ✅ Builder PRs consistently include PREHANDOVER_PROOF for executable artifacts
- ✅ FM reviews validate PREHANDOVER_PROOF completeness
- ✅ CI failures decrease (preflight catches issues before handover)
- ✅ No repeat of "documented but not executed" failures

---

## Risks and Mitigations

### Risk 1: Contractor Resistance

**Risk**: External contractors unfamiliar with protocol may resist PREHANDOVER_PROOF requirement

**Mitigation**:
- Provide clear, standalone guidance document
- Include template and examples
- Explain benefit ("CI confirms, not discovers")
- Support contractors during first submission

### Risk 2: Legacy Contracts

**Risk**: Existing builder contracts without execution bootstrap binding remain in use

**Mitigation**:
- Incremental contract updates (wave-based)
- FM enforces regardless of contract (constitutional authority)
- Document contract update wave plan

### Risk 3: Incomplete Adoption

**Risk**: Some builders skip PREHANDOVER_PROOF due to lack of enforcement

**Mitigation**:
- FM validation mandatory (Category 4 in FM checklist)
- Gate enforcement (Category 8 in builder checklist)
- Escalation path for violations

---

## Related Documents

- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — Canonical protocol definition
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — Template for agents
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Preflight obligation foundation
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` — Integration with layer-down
- `governance/incidents/INCIDENT-2026-01-08-PR895-CATASTROPHIC-HANDOVER-FAILURE.md` — Root incident

---

## Contacts

**Governance Authority**: governance-repo-administrator agent  
**Escalation**: Maturion Engineering Leadership (Johan Ras)  
**Questions**: Open issue in maturion-foreman-governance with label `execution-bootstrap-ripple`

---

**Status**: Advisory — Cross-repo implementation pending contract owner approvals  
**Created**: 2026-01-11  
**Author**: governance-repo-administrator agent (GitHub Copilot)

---

*End of Execution Bootstrap Protocol Ripple Plan*
