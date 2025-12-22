# Scope Declaration

SCOPE_SCHEMA_VERSION: v1
PR_ID: 683
OWNER: GitHub Copilot Agent
DATE_UTC: 2025-12-21

## PR Responsibility Domain

RESPONSIBILITY_DOMAIN: Governance Canon

## Explicitly In Scope

IN_SCOPE:
- Governance policy definition
- Agent behavior governance contracts
- Escalation, override, and bootstrap policy canon
- PR gate failure handling protocol
- Governance completeness model updates
- Agent non-stalling policy
- Responsibility domain registry updates

## Explicitly Out of Scope

OUT_OF_SCOPE:
- Tests (no test changes in this PR)
- CI workflow logic changes (behavior contract only)
- Migrations
- Email
- Logging
- Audit (beyond governance audit)
- Deployment
- Infrastructure
- FM operational artifacts
- FM evidence initialization
- Application code
- Runtime systems

## Expected Verification Signal

EXPECTED_VERIFICATION:
- CI: GREEN (after scope declaration compliance)
- TESTS: UNCHANGED
- GOVERNANCE_GATES: GREEN

## Scope Freeze Declaration

SCOPE_FROZEN: YES

---

## Authority
Johan Ras
