# SCOPE DECLARATION

SCOPE_SCHEMA_VERSION: v1
PR_ID: create-canonical-agent-template
OWNER: governance-repo-administrator
DATE_UTC: 2026-01-26

---

## PR Responsibility Domain

RESPONSIBILITY_DOMAIN: Create canonical AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md with copy-paste sections for FM, Builder, and Liaison agents

---

## Explicitly In Scope

IN_SCOPE:
- Create governance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md (canonical template with Universal Tier-0 and role-specific Tier-1 LOCKED sections)
- Update governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md Section 11.2 (cross-reference new template)
- Update GOVERNANCE_ARTIFACT_INVENTORY.md (document new template artifact)
- Update governance/scope-declaration.md (this file - scope documentation)

---

## Explicitly Out of Scope

OUT_OF_SCOPE:
- Agent contract modifications (applying template to existing contracts - separate effort)
- Consumer repository updates (office-app, PartPulse, R_Roster) - Not applicable for template creation
- PREHANDOVER_PROOF.md creation - Will be created after validation passes
- Tests - No test infrastructure for governance templates
- CI gate workflows - No workflow modifications needed
- Other template files or canonical documents

---

## Files Changed

A governance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md
M governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md
M GOVERNANCE_ARTIFACT_INVENTORY.md
M governance/scope-declaration.md

---

## Expected Verification Signal

EXPECTED_VERIFICATION:
- CI: GREEN (all governance gates must pass)
- TESTS: NOT APPLICABLE (no test infrastructure for governance templates)
- GOVERNANCE_GATES: GREEN
  - Governance Scope-to-Diff Enforcement (must match this scope declaration)
  - Governance Policy Validation
  - Locked Section Protection Gate

---

## Scope Freeze Declaration

SCOPE_FROZEN: YES

**Summary**: Created canonical AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md (v1.0.0) with copy-paste ready LOCKED sections for Universal (Tier-0), FM-specific (Tier-1), Builder-specific (Tier-1), and Liaison-specific (Tier-1) agent contracts. Updated AGENT_CONTRACT_PROTECTION_PROTOCOL.md Section 11.2 to cross-reference template. Updated GOVERNANCE_ARTIFACT_INVENTORY.md with new artifact. Authority: AGENT_CONTRACT_PROTECTION_PROTOCOL.md v1.1.0, Issue #[TBD].

---

**Authority**: `governance/canon/SCOPE_TO_DIFF_RULE.md`, `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md` v1.1.0
**Issue**: Create: Canonical Agent File LOCKED Sections Template (FM, Builder, Liaison)
