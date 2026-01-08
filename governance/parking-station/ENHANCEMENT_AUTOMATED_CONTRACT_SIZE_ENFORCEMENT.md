# ENHANCEMENT: Automated Agent Contract Size Enforcement

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Submitted**: 2026-01-08  
**Submitted By**: governance-repo-administrator (copilot agent)  
**Context**: Issue #[PR895 Corrections] - Implementation of agent contract enhancements

---

## Context

While implementing corrections from PR #895 and adding operational requirements to the governance-repo-administrator contract, discovered that individual agent contracts (`.github/agents/*.agent.md` files) lack automated CI enforcement of size limits.

Current state:
- Repository-level `.agent` file has 300-line hard limit (enforced by agent-governance-check.yml)
- Agent contract migration guide recommends 150-250 lines target, 300 line max for `.agent.md` files
- No automated validation of `.agent.md` file sizes during CI

The governance-repo-administrator.agent.md grew to 349 lines with essential operational additions, which is acceptable per migration guide ("Don't remove operational details that are specific to this agent's role") but signals potential future bloat risk.

---

## Proposal

Add CI validation to `agent-governance-check.yml` to check all `.github/agents/*.agent.md` files against size thresholds:

- **Warning threshold**: 250 lines (migration guide recommended max)
- **Error threshold**: 400 lines (allows operational detail while preventing verbose duplication)
- **Reporting**: Show line count for each contract, flag those exceeding thresholds

Implementation approach:
1. Add step to existing agent-governance-check workflow
2. Iterate through all `.agent.md` files in `.github/agents/`
3. Count lines excluding YAML front matter
4. Emit warning or error based on thresholds
5. Include helpful message referencing AGENT_CONTRACT_MIGRATION_GUIDE.md

---

## Benefits

- **Proactive bloat prevention**: Catch verbose contracts early in PR process
- **Migration tracking**: Visibility into which contracts need migration
- **Consistency enforcement**: Automated alignment with migration guide standards
- **Developer feedback**: Clear signal when contract needs refactoring

---

## Non-Goals

This enhancement does NOT:
- Prevent legitimate operational detail (errors set higher than strict 300 target)
- Replace manual review (warnings allow justified exceptions)
- Block critical fixes (can be overridden with explicit justification)

---

## Review Authority

When this enhancement is reviewed:
- Governance Administrator: Technical implementation alignment
- Maturion/Johan: Policy decision on thresholds and enforcement level

---

End of Enhancement Proposal
