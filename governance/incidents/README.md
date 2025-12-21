# Governance Incidents Directory

This directory contains incident records for temporary overrides and governance exceptions.

## Purpose

When agents encounter governance blocks that require temporary overrides,
each authorized override must be registered as an incident in this directory.

## File Naming Convention

```
override-[YYYYMMDD]-[sequence].md
```

Examples:
- `override-20251221-001.md`
- `override-20251221-002.md`
- `override-20251222-001.md`

## Schema

Each incident file must conform to the schema defined in:
`governance/policy/ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md` (Section 7.2)

## Authority

Only incidents authorized by Johan may be recorded here.

## Learning

Recurring incidents of the same type indicate governance defects
and must trigger learning promotion to canonical governance improvements.

## Related Policies

- `governance/policy/AGENT_NON_STALLING_AND_ESCALATION_POLICY.md`
- `governance/policy/ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md`
- `governance/policy/GOVERNANCE_FM_TRANSITION_POLICY.md`

---

End of README
