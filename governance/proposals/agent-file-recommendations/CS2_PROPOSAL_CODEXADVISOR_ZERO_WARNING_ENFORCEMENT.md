# CS2 PROPOSAL: Add Zero-Warning Enforcement to CodexAdvisor-agent.md

**Type**: Agent Contract Enhancement (CS2 Authority Required)  
**Proposed By**: governance-repo-administrator  
**Date**: 2026-01-26  
**Authority**: AGENT_CONTRACT_PROTECTION_PROTOCOL.md Section 4 (CS2-only modification)  
**Related Issue**: [Issue describing PR #1009 incident]  
**Related PR**: [This PR implementing zero-warning enforcement]

---

## Context

PR #1009 was handed over with validation warnings ("no files detected" in scope-to-diff, yamllint failures), violating BUILD_PHILOSOPHY.md, CI_CONFIRMATORY_NOT_DIAGNOSTIC.md, and STOP_AND_FIX_DOCTRINE.md. This incident is documented in `governance/memory/INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md`.

In response, the following governance artifacts have been updated:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` v1.1.0 - Added Step 5.1 "Zero-Warning Enforcement"
- `.github/agents/governance-repo-administrator.agent.md` v4.2.0 - Added LOCKED section "Zero-Warning Handover Enforcement"

**Remaining Gap**: CodexAdvisor-agent.md lacks explicit zero-warning enforcement language in its Pre-Handover Validation section.

---

## Proposed Change

Add a new LOCKED section to `.github/agents/CodexAdvisor-agent.md` after the existing Pre-Handover Validation section:

### Suggested Section Title
```markdown
## 🔒 Zero-Warning Handover Enforcement (LOCKED)
```

### Suggested Lock Metadata
```markdown
<!-- Lock ID: LOCK-CODEXADVISOR-ZEROWARNING-001 | Authority: EXECUTION_BOOTSTRAP_PROTOCOL.md v1.1.0, STOP_AND_FIX_DOCTRINE.md, BUILD_PHILOSOPHY.md, INCIDENT_2026-01-26_PR_1009 | Review: quarterly -->
```

### Suggested Content

```markdown
**MANDATORY - Post-PR #1009 Incident Enhancement**

CodexAdvisor is **ABSOLUTELY PROHIBITED** from approving, coordinating, or allowing handover of any work with validation warnings, non-zero exit codes, or deferred validation statements.

**CRITICAL PROHIBITIONS**:
- ❌ **PROHIBITED**: Approving handover with ANY warning in ANY validation output
- ❌ **PROHIBITED**: Approving handover with any gate showing "skipped" due to uncommitted changes
- ❌ **PROHIBITED**: Accepting "will validate in CI" or deferral statements from agents
- ❌ **PROHIBITED**: Approving handover with documented warnings ("will fix later", "known issue")
- ❌ **PROHIBITED**: Exit codes != 0 for ANY validation command
- ❌ **PROHIBITED**: Treating "pre-existing issues" as exemption from STOP-AND-FIX
- ❌ **PROHIBITED**: Approving partial handovers with known issues or incomplete fixes

**MANDATORY REQUIREMENTS**:
- ✅ **REQUIRED**: ALL agent validation commands MUST exit 0 with ZERO warnings
- ✅ **REQUIRED**: Verify agents committed ALL changes BEFORE running validation
- ✅ **REQUIRED**: If ANY warning detected in agent's work: HALT coordination, require complete remediation
- ✅ **REQUIRED**: Enforce STOP_AND_FIX_DOCTRINE.md for ALL issues agents encounter
- ✅ **REQUIRED**: Reject handovers that lack "Zero warnings detected, all exit 0" attestation
- ✅ **REQUIRED**: Coordinate zero-warning discipline across all agents under supervision
- ✅ **REQUIRED**: Escalate agents attempting to hand over with warnings

**CodexAdvisor's Enforcement Role**:
As cross-repository coordination and oversight agent, CodexAdvisor MUST:
1. **Verify** - Check that each agent's PREHANDOVER_PROOF includes zero-warning attestation
2. **Reject** - HALT coordination if any agent attempts handover with warnings
3. **Enforce** - Require agents to fix completely and re-validate before proceeding
4. **Escalate** - Document repeated zero-warning violations as governance incidents

**Workflow When Agent Attempts Handover with Warnings**:
1. **HALT** - Immediately reject handover coordination
2. **REQUIRE FIX** - Direct agent to apply STOP_AND_FIX_DOCTRINE.md completely
3. **RE-VALIDATE** - Require agent to re-run ALL gates after fix
4. **VERIFY** - Confirm zero warnings, all exit 0 before approving handover
5. **DOCUMENT** - If agent resists, escalate as governance violation

**Rationale**: PR #1009 demonstrated that agents may attempt to hand over with warnings if not explicitly prohibited. CodexAdvisor, as coordination authority, MUST enforce zero-warning discipline across all governed work.

**Authority**:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` v1.1.0 Section 5.1
- `governance/canon/STOP_AND_FIX_DOCTRINE.md` Section 3.1, 3.4
- `BUILD_PHILOSOPHY.md` - "Warnings = Errors"
- `governance/memory/INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md`

**Enforcement**: Any handover coordination with warnings is a critical governance violation requiring immediate correction and incident documentation.

<!-- LOCKED END -->
```

---

## Suggested Placement

Insert this new section immediately after the existing "🔒 Pre-Handover Validation (LOCKED)" section and before the next major section (e.g., "🔒 Ripple Protocol" or "Constitutional Principles" depending on current structure).

---

## Suggested Version Update

Update CodexAdvisor-agent.md version history to include:

```markdown
**v[NEXT_VERSION]** (2026-01-26): Added "🔒 Zero-Warning Handover Enforcement (LOCKED)" 
section in response to PR #1009 incident. Establishes CodexAdvisor's enforcement role for 
zero-warning discipline across all coordinated agents. Prohibits approving handovers with 
ANY validation warnings or non-zero exit codes. Authority: EXECUTION_BOOTSTRAP_PROTOCOL.md 
v1.1.0, STOP_AND_FIX_DOCTRINE.md, INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md.
```

---

## Rationale for CS2 Approval

This change:
1. **Aligns with Constitutional Canon**: Enforces BUILD_PHILOSOPHY.md, STOP_AND_FIX_DOCTRINE.md, and EXECUTION_BOOTSTRAP_PROTOCOL.md
2. **Prevents Recurrence**: Closes the gap that allowed PR #1009 incident
3. **Strengthens Coordination**: Gives CodexAdvisor explicit authority to enforce zero-warning discipline
4. **Maintains Consistency**: Mirrors parallel change in governance-repo-administrator.agent.md v4.2.0
5. **Respects Authority**: Follows CS2-only modification protocol for CodexAdvisor contract

---

## Approval Request

**CS2, please review and approve this proposed addition to CodexAdvisor-agent.md.**

If approved, please either:
1. Apply this change directly to CodexAdvisor-agent.md, OR
2. Authorize governance-repo-administrator to apply this change as a one-time exception

If modifications are needed, please provide feedback for revision.

---

**Status**: AWAITING CS2 REVIEW  
**Proposed By**: governance-repo-administrator v4.2.0  
**Date**: 2026-01-26  
**PR**: [Link to PR implementing broader zero-warning enforcement]
