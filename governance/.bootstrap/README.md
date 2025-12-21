# Bootstrap Directory

This directory contains temporary bootstrap marker files used during governance transitions.

## Purpose

When new governance requirements are introduced that require FM-level initialization,
a bootstrap marker file is placed here to signal that bootstrap mode is active.

## Bootstrap Marker File

When active, this directory will contain:

```
ACTIVE_BOOTSTRAP.md
```

This file signals to FM enforcement gates that bootstrap mode is active
and certain enforcement checks should be temporarily deferred.

## File Format

See `governance/policy/GOVERNANCE_FM_TRANSITION_POLICY.md` (Section 4.1) for the
required format and contents of bootstrap marker files.

## Lifecycle

1. **Activation:** Bootstrap marker created when governance PR introduces new requirements
2. **Authorization:** Johan must explicitly authorize bootstrap mode
3. **Duration:** Time-bound, typically one iteration maximum
4. **Removal:** Follow-up PR that completes initialization must remove the marker
5. **Enforcement:** Full enforcement resumes immediately after marker removal

## Authority

Only governance PRs authorized by Johan may create bootstrap markers.

Bootstrap markers must not remain indefinitely - they are temporary by design.

## Related Policies

- `governance/policy/GOVERNANCE_FM_TRANSITION_POLICY.md`
- `governance/policy/AGENT_NON_STALLING_AND_ESCALATION_POLICY.md`
- `governance/policy/ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md`

---

End of README
