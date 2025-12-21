# GOVERNANCE → FM TRANSITION POLICY

## Status
Canonical Governance Policy  
Authority: Johan Ras  
Applies To: Governance Administrator, Foreman, all enforcement mechanisms  
Precedence: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md

---

## 1. Purpose

To prevent enforcement deadlocks when new governance requirements
are introduced into a system that has not yet initialized
corresponding FM-level operational artifacts.

This policy ensures governance can evolve without creating impossible enforcement states.

---

## 2. Problem Statement

When governance introduces NEW mandatory artifacts or behaviors,
FM enforcement gates may block legitimate work because:

- Required artifacts don't exist yet
- FM has not initialized operational structures
- Enforcement logic assumes steady-state

This creates a deadlock:
- Governance says "X is required"
- FM enforces "X must exist"
- But X cannot exist until governance PR merges
- But governance PR cannot merge because X doesn't exist

This policy breaks the cycle.

---

## 3. Rule

When governance introduces NEW mandatory artifacts or behaviors:

### 3.1 Bootstrap Phase Declaration (MANDATORY)

A **bootstrap phase MUST be declared** in the governance PR.

The PR description MUST include:

```markdown
## BOOTSTRAP OVERRIDE DECLARATION

**Bootstrap Status:** ACTIVE
**Reason:** [new governance requirement without FM initialization]
**Deferred Enforcement:** [list of gates/checks that will fail]
**Initialization Timeline:** [expected timeline for follow-up PR]
**Follow-up PR:** [description of what will complete operationalization]
**Authorization:** Requested from Johan
```

### 3.2 FM Enforcement Gate Staging

FM enforcement gates MUST either:

**Option A: Staged Enforcement**
- Detect bootstrap status
- Reduce blocking errors to warnings during bootstrap
- Resume full enforcement after bootstrap completion

**Option B: Require Initialization Artifacts**
- Check for explicit bootstrap marker files
- Allow merge when bootstrap marker present + Johan approval
- Enforce fully once bootstrap marker removed

### 3.3 Governance PR Requirements

A governance PR introducing new requirements MUST specify:

1. **Bootstrap Status:** YES or NO
2. **If YES:**
   - What enforcement is deferred
   - Why deferral is safe
   - What the follow-up PR will do
   - Expected timeline (max: one iteration)
3. **If NO:**
   - Confirmation all required artifacts already exist
   - Confirmation enforcement can activate immediately

---

## 4. Bootstrap Markers (Implementation Mechanism)

To implement bootstrap detection, governance MAY use:

### 4.1 Bootstrap Marker File

Create a temporary marker file:

```
governance/.bootstrap/ACTIVE_BOOTSTRAP.md
```

Contents:
```markdown
# Active Bootstrap

**Governance PR:** [link]
**New Requirements:** [list]
**Deferred Enforcement:** [list]
**Follow-up PR:** [description]
**Expected Completion:** [date]
**Authorized By:** Johan Ras
```

This marker signals to FM that bootstrap mode is active.

### 4.2 Removal Trigger

The follow-up PR that completes initialization MUST:
- Create all required operational artifacts
- Remove the bootstrap marker file
- Verify all gates now pass with full enforcement

---

## 5. Enforcement Rules

### 5.1 During Bootstrap Phase

- FM enforcement gates MUST detect bootstrap status
- Blocking failures MUST be downgraded to warnings
- PR merge REQUIRES explicit Johan authorization
- Audit trail MUST record bootstrap override usage

### 5.2 After Bootstrap Phase

- Full enforcement resumes immediately
- All previously deferred checks MUST pass
- No bootstrap marker may remain
- Follow-up PR MUST close the bootstrap period

---

## 6. Authorization

### 6.1 Bootstrap Activation

Bootstrap PRs are allowed ONLY with **Johan authorization**.

Authorization MUST be explicit:
```
BOOTSTRAP AUTHORIZATION

I authorize bootstrap mode for [governance PR link].
Enforcement of [specific gates] is temporarily deferred.
Follow-up PR required within [timeline].

Authorized by: Johan Ras
Date: [timestamp]
```

### 6.2 Bootstrap Extension

If bootstrap cannot complete within expected timeline:
- New authorization required
- Reason for delay must be provided
- Maximum one extension allowed

### 6.3 Emergency Bootstrap Termination

Johan may terminate bootstrap immediately if:
- Scope expands beyond declared bounds
- Timeline exceeds approved extension
- Governance integrity is at risk

---

## 7. Prohibited Behaviors

### 7.1 Governance MUST NOT

- Silently assume FM readiness
- Introduce requirements without bootstrap declaration
- Leave bootstrap mode active indefinitely
- Use bootstrap to bypass normal governance discipline

### 7.2 FM MUST NOT

- Assume governance steady-state during bootstrap
- Block legitimate bootstrap PRs with full enforcement
- Skip bootstrap detection in gate logic
- Allow bootstrap mode without authorization

---

## 8. Incident Registration

Bootstrap activations MUST be registered as governance incidents.

Use the ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md incident schema.

Incident category: **BOOTSTRAP**

Recurring bootstrap incidents for similar patterns indicate governance process defects
and MUST trigger governance improvement.

---

## 9. Success Criteria

This policy is successful when:

- New governance requirements deploy smoothly
- FM enforcement never blocks legitimate bootstrap
- Bootstrap periods are short and well-scoped
- Deadlocks are prevented proactively
- Learning reduces future bootstrap needs

---

## 10. Examples

### Example 1: New Schema Requirement

**Scenario:** Governance adds requirement for INCIDENT_SCHEMA.md

**Bootstrap Declaration:**
```markdown
## BOOTSTRAP OVERRIDE DECLARATION

**Bootstrap Status:** ACTIVE
**Reason:** New incident schema requirement, FM incident system not yet initialized
**Deferred Enforcement:** governance-completeness-gate (incident schema check)
**Initialization Timeline:** Within 48 hours
**Follow-up PR:** Create incident schema + FM incident recording system
**Authorization:** Requested from Johan
```

**Follow-up PR:**
- Creates `governance/canon/INCIDENT_SCHEMA.md`
- Updates FM to use new schema
- Removes `.bootstrap/ACTIVE_BOOTSTRAP.md`
- Verifies all gates pass

### Example 2: New Gate Addition

**Scenario:** Governance adds PR_GATE_PRECONDITION_RULE.md

**Bootstrap Declaration:**
```markdown
## BOOTSTRAP OVERRIDE DECLARATION

**Bootstrap Status:** ACTIVE
**Reason:** New PR gate rule, FM runtime not yet enforcing
**Deferred Enforcement:** None (rule adds requirement for builders, not FM)
**Initialization Timeline:** Immediate (no FM changes needed)
**Follow-up PR:** Not required
**Authorization:** Requested from Johan
```

**Outcome:**
- Rule merges immediately
- Builders adopt on next task
- No bootstrap period needed (rule is documentary, not enforced by gate)

---

## 11. Relationship to Other Policies

This policy integrates with:

- **AGENT_NON_STALLING_AND_ESCALATION_POLICY.md:** Bootstrap is a type of temporary override
- **ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md:** Bootstrap uses incident registration
- **GOVERNANCE_COMPLETENESS_MODEL.md:** Bootstrap affects completeness evaluation temporarily
- **GOVERNANCE_PURPOSE_AND_SCOPE.md:** Bootstrap must not weaken One-Time Build philosophy

---

## 12. Principle

**Governance defines what must exist.**  
**FM enforces only what has been initialized.**

Bootstrap is the bridge between definition and enforcement.

It is explicit, time-bound, and traceable —  
never silent, never indefinite, never assumed.

---

End of GOVERNANCE → FM TRANSITION POLICY
