---
RESPONSIBILITY_DOMAIN: Governance Administration
---

# Governance Scope Declaration - Agent Contract v2.5.0 Upgrade

## Changed Files

### Modified Files
- `.github/agents/CodexAdvisor-agent.md` — Upgraded v2.0.0 → v2.5.0
- `.github/agents/governance-repo-administrator.agent.md` — Upgraded unversioned → v2.5.0

### New Files (Governance Artifacts)
- `.agent-admin/scans/scan_20260115_142350.md` — Comprehensive governance scan (precondition)
- `.agent-admin/risk-assessments/risk_001_20260115.md` — Risk assessment (precondition)
- `.agent-admin/change-records/change_001_20260115.md` — Change record documentation
- `SCOPE_DECLARATION.md` — Detailed scope declaration (root-level)

## Scope Rationale

This PR upgrades all agent contracts in the canonical governance repository to v2.5.0 reference-based protection model with bidirectional governance evolution framework.

**Task**: Upgrade All Agent Contracts to Canonical v2.5.0

**Changes Implemented**:
- Migrated from embedded LOCKED sections to reference-based protection
- Added Protection Registry section to all contracts
- Added bidirectional governance evolution framework
- Added cross-repository agent benchmarking requirements
- Added self-assessment and improvement proposal generation
- Reduced line counts: CodexAdvisor (856→407, 52%), governance-repo-administrator (930→422, 55%)
- Updated YAML metadata with `protection_model: reference-based` and `references_locked_protocol: true`

**Authority**:
- Task instruction: "Upgrade All Agent Contracts to Canonical v2.5.0"
- AGENT_CONTRACT_PROTECTION_PROTOCOL.md (Tier-0)
- GOVERNANCE_RIPPLE_MODEL.md (Canonical)
- MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md v2.0.0

**Impact**:
- Establishes canonical v2.5.0 reference model for all repositories
- Enables agent-driven governance evolution (back-to-front feedback loop)
- Reduces contract maintenance burden through reference-based approach
- Maintains full protection coverage through canonical protocol references

**Consumer Repo Impact**:
- office-app, PartPulse, R_Roster will require separate v2.5.0 upgrade tasks
- This PR establishes the canonical model for those upgrades
