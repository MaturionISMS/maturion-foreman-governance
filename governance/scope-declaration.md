# Scope Declaration

SCOPE_SCHEMA_VERSION: v1
PR_ID: 954
OWNER: Agent Contract Administrator
DATE_UTC: 2026-01-14

## PR Responsibility Domain
RESPONSIBILITY_DOMAIN: Governance Administration

## Explicitly In Scope
IN_SCOPE:
- Agent administrative artifacts (.agent-admin/scans/)
- Governance administration documentation

## Explicitly Out of Scope
OUT_OF_SCOPE:
- Tests
- CI workflows
- Application code
- Database migrations
- Email configuration
- Logging configuration
- Deployment configuration

## Expected Verification Signal
EXPECTED_VERIFICATION:
- CI: GREEN
- TESTS: UNCHANGED
- GOVERNANCE_GATES: GREEN

## Scope Freeze Declaration
SCOPE_FROZEN: YES
