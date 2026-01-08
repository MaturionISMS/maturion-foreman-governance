# Maturion Governance Repository

**Status**: Pure Governance Repository (Wave 2.5 Cleanup Complete)

This repository serves as the **highest-order authority** for all Maturion systems. It contains governance policies, constitutional rules, escalation procedures, and enforcement mechanisms.

## Repository Purpose

This is a **PURE GOVERNANCE REPOSITORY** containing only:
- ✅ Governance policies and doctrines
- ✅ Constitutional rules and constraints
- ✅ Escalation procedures
- ✅ Runbooks and templates
- ✅ Governance validation CI

**All application code has been removed** as part of Wave 2.5 governance cleanup (bootstrap contamination removal).

## Governance Structure

### `/governance` - All Governance Content

```
governance/
├── CONSTITUTION.md                    # Constitutional authority
├── philosophy/
│   ├── BYG_DOCTRINE.md               # Build As You Go doctrine (BINDING)
│   └── GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md  # Incident response (BINDING)
├── escalation/
│   └── ESCALATION_POLICY.md          # Escalation procedures (BINDING)
├── runbooks/
│   └── FOREMAN_GOVERNANCE_RUNBOOK.md # Operational runbooks
├── templates/
│   └── BUILDER_TASK_TEMPLATE.md      # Task templates
├── policy/
│   └── QA_POLICY_MASTER.md           # Quality policies
├── opojd/                             # OPOJD doctrine and compliance
├── autonomy/                          # Autonomy execution reports
├── waves/                             # Modernization waves
└── tech-surveys/                      # Technology surveys
```

## Binding Documents

The following documents are **BINDING** and must be respected by all systems and agents:

1. **`governance/philosophy/BYG_DOCTRINE.md`** - Build As You Go doctrine
   - Defines roles: Foreman, Builder, Codex
   - Establishes architecture-first approach
   - Requires QA validation before build acceptance

2. **`governance/philosophy/GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`** - Incident response
   - Defines incident classification and response
   - Establishes escalation thresholds
   - Requires governance alignment

3. **`governance/CONSTITUTION.md`** - Constitutional authority
   - Non-negotiables for all AI execution
   - Governance supremacy rule
   - Required outputs per task

4. **`governance/escalation/ESCALATION_POLICY.md`** - Escalation procedures
   - When to escalate to higher authority
   - Who has decision authority
   - Escalation paths and timeframes

## Agent Onboarding

**New agents start here**: `governance/canon/AGENT_ONBOARDING_QUICKSTART.md`

This streamlined onboarding guide provides:
- Your role and authority boundaries
- Essential canonical governance documents
- 3-step operational protocol
- Escalation rules
- Mandatory compliance requirements

### Agent Contract Structure

All agent contracts follow a **minimal, reference-based format**:
- **YAML header**: Identity, governance bindings, scope, capabilities, constraints
- **Mission**: 1-2 sentence core purpose
- **Allowed/Forbidden actions**: Concise operational boundaries
- **Escalation protocol**: When and how to escalate
- **Onboarding references**: Links to canonical governance

**Contract templates**: `governance/templates/AGENT_CONTRACT.template.md`

### Key Principle: Contract Minimalism

Agent contracts are **thin binding shells**. All governance doctrine, philosophy, and detailed process lives in `governance/canon/` and is **referenced, not duplicated**.

This approach:
- ✅ Reduces cognitive load
- ✅ Prevents governance drift
- ✅ Ensures single source of truth
- ✅ Simplifies updates and maintenance

**Migration guide**: `governance/canon/AGENT_CONTRACT_MIGRATION_GUIDE.md` (for future waves)

---

## Governance CI/CD

This repository includes governance validation workflows:

- **`governance-gate.yml`** - Validates governance structure and file integrity on PRs
- **`foreman-governance.yml`** - Validates governance policies on push/PR

These workflows ensure:
- ✅ All critical governance files are present
- ✅ No secrets are committed
- ✅ CODEOWNERS protection is active
- ✅ No application code artifacts exist

## CODEOWNERS Protection

All governance content is protected by `.github/CODEOWNERS`:
- Changes to `governance/**` require admin approval
- Changes to `.github/workflows/**` require admin approval
- Prevents unauthorized governance modifications

## History

**Wave 2.5 (December 2024)**: Bootstrap cleanup completed
- Removed all application code (app, components, lib, types, tests, scripts)
- Removed Foreman app runtime logic
- Removed swarm, architecture, maturion directories
- Removed Node.js/Next.js/TypeScript configuration
- Removed application-specific CI workflows
- Preserved all governance content unchanged
- Updated CI to governance-only validation

**Reason**: Bootstrap contamination - the repository was initially created with both governance and Foreman application code mixed together. This cleanup establishes clear separation of concerns.

## What Was Removed

The following were removed as non-governance artifacts:
- `/app`, `/components`, `/lib`, `/types` - Application UI and logic
- `/tests` - Application tests
- `/scripts` - Application automation scripts
- `/foreman`, `/swarm`, `/maturion` - Runtime application directories
- `/architecture`, `/evidence`, `/memory` - Build-time artifacts
- `/sandbox`, `/warmup`, `/qa-parking`, `/reports` - Development artifacts
- `package.json`, `next.config.mjs`, `tsconfig.json` - Application configuration
- `.github/agents/`, `.github/foreman/` - Application agent configs
- Application CI workflows (qiel, qic, deploy-check, etc.)

## Important Notes

1. **This is NOT governance weakening** - All governance rules, policies, and enforcement remain intact
2. **No doctrine text was changed** - All binding documents preserved exactly as they were
3. **No new gates added** - Only removed application code, kept governance validation
4. **Foreman app still exists** - Just moved to its proper application repository
5. **This cleanup enables Wave 3** - Clean governance hierarchy for future enforcement

## For Developers

When working with this repository:
1. **DO NOT** add application code - this is governance-only
2. **DO** respect binding documents when making governance changes
3. **DO** get admin approval for governance modifications (via CODEOWNERS)
4. **DO** ensure governance gate CI passes before merging

## Contact

For questions about governance policies or this repository:
- See `governance/escalation/ESCALATION_POLICY.md` for escalation procedures
- See `governance/runbooks/` for operational guidance

---

**Repository Type**: Pure Governance  
**Authority Level**: Highest Order  
**Last Updated**: Wave 2.5 (December 2024)
