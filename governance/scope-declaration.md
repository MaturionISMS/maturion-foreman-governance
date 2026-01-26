# SCOPE DECLARATION

SCOPE_SCHEMA_VERSION: v1
PR_ID: TBD (current PR)
OWNER: governance-repo-administrator
DATE_UTC: 2026-01-26

---

## PR Responsibility Domain

RESPONSIBILITY_DOMAIN: Zero-Warning Handover Enforcement (Post-PR #1009 Incident) - Strengthen EXECUTION_BOOTSTRAP_PROTOCOL.md, add LOCKED sections to agent contracts, update onboarding materials

---

## Explicitly In Scope

IN_SCOPE:
- Update governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md (add Section 5.5 Zero-Warning Enforcement)
- Update .github/agents/governance-repo-administrator.agent.md (add LOCKED zero-warning section, v4.1.0 → v4.2.0)
- Update governance/canon/AGENT_ONBOARDING_QUICKSTART.md (add Critical Quality Rules section)
- Update governance/templates/PREHANDOVER_PROOF_TEMPLATE.md (add Zero-Warning Verification section, v2.0.0 → v2.1.0)
- Update GOVERNANCE_ARTIFACT_INVENTORY.md (add/update entries for modified files)
- Update governance/scope-declaration.md (this file)
- Update SCOPE_DECLARATION.md (root level scope file)

---

## Explicitly Out of Scope

OUT_OF_SCOPE:
- CodexAdvisor-agent.md updates (requires CS2 authority - escalation documented)
- Consumer repository updates (office-app, PartPulse, R_Roster) - Ripple occurs after canonical PR merge
- Other governance canon files - Only EXECUTION_BOOTSTRAP_PROTOCOL.md and AGENT_ONBOARDING_QUICKSTART.md modified
- Tests (no test infrastructure for governance canon)
- CI gate workflows - No workflow modifications (using existing gates)

---

## Files Changed

M .github/agents/governance-repo-administrator.agent.md
M governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md
M governance/canon/AGENT_ONBOARDING_QUICKSTART.md
M governance/templates/PREHANDOVER_PROOF_TEMPLATE.md
M SCOPE_DECLARATION.md
M governance/scope-declaration.md
M GOVERNANCE_ARTIFACT_INVENTORY.md

---

## Expected Verification Signal

EXPECTED_VERIFICATION:
- CI: GREEN (all governance gates must pass)
- TESTS: NOT APPLICABLE (no test infrastructure for governance canon)
- GOVERNANCE_GATES: GREEN
  - Governance Scope-to-Diff Enforcement (must match this scope declaration)
  - Agent Governance Check (YAML frontmatter validation)
  - Locked Section Protection Gate

---

## Scope Freeze Declaration

SCOPE_FROZEN: YES

Zero-Warning Handover Enforcement implemented per INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md. Added Section 5.5 to EXECUTION_BOOTSTRAP_PROTOCOL.md mandating exit code 0 on ALL validations. Added LOCKED section to governance-repo-administrator.agent.md v4.2.0 prohibiting handover with ANY warning. Updated AGENT_ONBOARDING_QUICKSTART.md with Critical Quality Rules. Updated PREHANDOVER_PROOF_TEMPLATE.md v2.1.0 with Zero-Warning Verification section. Updated GOVERNANCE_ARTIFACT_INVENTORY.md with all modified file entries. All changes reference STOP_AND_FIX_DOCTRINE.md and BUILD_PHILOSOPHY.md authority.

**PREVENTION**: Explicitly prohibits "will validate in CI" statements, "pre-existing issues" exemptions, and ANY exit code != 0 from ANY validation command. Requires immediate Stop-and-Fix on ANY warning.

---

**Authority**: `governance/canon/SCOPE_TO_DIFF_RULE.md`, `EXECUTION_BOOTSTRAP_PROTOCOL.md`, `STOP_AND_FIX_DOCTRINE.md`, `BUILD_PHILOSOPHY.md`
**Issue**: Strengthen Governance: Enforce Zero-Warning Handover in Pre-Handover Validation (Post-PR #1009 Incident)
