# AI Model Usage Escalation Policy

**Status**: ACTIVE — Operational Governance  
**Authority**: Canonical  
**Effective Date**: 2026-01-03  
**Integration**: COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md, FM_ROLE_CANON.md  

---

## Purpose
Control cost while preserving correctness and governance safety through **proactive complexity-aware escalation** and **reactive failure-based escalation**.

## Principle
The **overseeing intelligence must be at least one level higher**
than the implementing intelligence.

No layer may approve itself.

## Levels (Conceptual)
- L1: Builder / Implementer (routine work, cheaper model)
- L2: Foreman Runtime (coordination + guardrails)
- L3: Codex Control (independent oversight, rare)
- L4: Human + Highest model (last line of defense)

## Escalation Triggers (ACTIVE)

Escalation is **NO LONGER FAILURE-ONLY**. Escalation SHALL be triggered by:

### Proactive Escalation (Complexity-Aware)
Escalate **before** execution when:
- **Task complexity exceeds available cognitive capability** (FM assesses during planning)
- **Cognitive saturation detected** (FM recognizes inability to reason effectively)
- **No suitable capability class available** for task requirements
- **Architectural complexity beyond current model capacity** (multi-layer integration, high ambiguity)

### Reactive Escalation (Failure-Based)
Escalate **after** failures occur when:
- repeated CI failures without clear cause
- governance deadlock (merge blocked by phase mismatch)
- architecture ambiguity or contradictions
- security / permissions uncertainty
- repeated regressions or unstable behavior
- cross-repo changes required
- **warning or test-debt discovery from prior work** (per QA_POLICY_MASTER.md Section 3.3)

### Stop-and-Fix Escalation
Escalate **during Stop-and-Fix remediation** when:
- **Unresolvable issue**: Issue requires domain expertise agent lacks (database internals, network protocols, etc.)
- **Authority boundary**: Issue requires changing code/architecture outside agent's authority
- **External blocker**: Issue caused by external system, tool, or infrastructure failure beyond agent control
- **Governance decision needed**: Issue requires governance policy interpretation or decision
- **Prolonged investigation**: Issue cannot be resolved within reasonable time (> 4 hours investigation)
- **Multiple fix attempts failed**: Root cause remains unclear after genuine remediation attempts

**Stop-and-Fix Escalation Requirements**:
- Provide complete issue description, reproduction steps, investigation summary
- Document root cause hypothesis and blocker justification
- Ensure work is in SAFE state (no broken builds, no data loss risk)
- Commit work-in-progress on feature branch, wait for CS2 guidance
- Tag escalation: "STOP-AND-FIX ESCALATION - Requires CS2 Intervention"

See: `governance/canon/STOP_AND_FIX_DOCTRINE.md` Section 5

**Note**: Stop-and-Fix escalation is NOT a failure—it is appropriate use of escalation path when remediation exceeds agent's capability or authority.

## FM Authority and Responsibility (ACTIVE)

**FM SHALL**:
- **Assess complexity** during planning phase against available cognitive capability
- **Decide** whether to escalate authority, switch capability class, or halt execution
- **Escalate proactively** when task complexity exceeds available capability (before attempting execution)
- **Halt execution** when cognitive limits are reached and no escalation path is viable
- **Provide** complexity assessment, capability gap analysis, and recommended escalation path

**FM halt on cognitive limits is**:
- **Proactive** (not failure)
- **Non-punitive** (not builder blame)
- **Not a defect** (capability awareness)
- **Governance-expected** behavior

## Integration with Capability Orchestration (ACTIVE)

Escalation decisions SHALL consider:
- **Authority level** (L1 → L2 → L3 → L4): hierarchical model tier
- **Capability class** (see COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md): functional capability selection

FM SHALL distinguish:
- **When to escalate authority tier** (task requires higher oversight)
- **When to switch capability class** (task requires different functional capability)
- **When to halt** (task exceeds all available capabilities)

See COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md Section 5.4 for capability selection criteria.

## Cost Rule
Escalation is **no longer exclusively a failure signal**.

- **Proactive escalation** (complexity-aware) is **expected behavior** and indicates healthy governance
- **Reactive escalation** (failure-based) indicates system below needs strengthening
- Frequent reactive escalation means the system below needs strengthening
