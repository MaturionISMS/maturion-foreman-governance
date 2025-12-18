# Governance Incident Response Doctrine (GIRD)

## 1. Purpose

The Governance Incident Response Doctrine defines how the system responds when governance, merge, or authority controls fail.

Governance failures are treated as incidents, not build defects.

The objective is to preserve:
- Authority boundaries
- Architectural integrity
- Learning discipline
- Delivery speed without governance erosion

---

## 2. Definition: Governance Incident

A Governance Incident occurs when any governance, merge, or authority-enforcing control fails, including but not limited to:

- Test dodging or skipped validations
- “99% build” submissions or missing attestations
- Phase mismatches (e.g. BUILD_TO_GREEN enforced during RED_QA)
- Builder modification of governance-owned files
- Agent mentality drift (.agent misalignment)
- Invalid or missing governance attestations
- Any form of self-governance

All Governance Incidents are classified as Governance RED.

---

## 3. Authority and Responsibility

### Builder
- May not resolve governance incidents
- May not reinterpret governance rules
- Must halt when Governance RED is active

---

### Foreman (FM)
FM is the first-line responder for governance incidents.

FM must:
1. Detect the incident automatically
2. Classify the incident type
3. Correct behavioral compliance issues within delegated authority:
   - Builder enforcement rules
   - Task constraints
   - .agent files in builder repositories
4. Record resolution actions
5. Notify the Human immediately

FM may not:
- Modify constitutional governance
- Modify merge gate canon
- Modify phase definitions
- Self-approve governance mutations

---

### Codex
Codex is the sole executor of governance mutations.

Codex acts only when:
- FM escalates a governance misalignment
- The Human explicitly approves

Codex is responsible for:
- Governance rule updates
- Ripple-effect analysis
- Cross-repository alignment
- Agent mentality realignment
- Ensuring no partial governance state remains

---

### Human
The Human is the sole authority.

The Human:
- Receives unmissable alerts for all governance incidents
- Reviews FM remediation
- Approves, rejects, or approves with changes
- Authorises escalation to Codex

---

## 4. Governance Attestation Requirement

No merge may proceed without a valid Governance Attestation.

The attestation must confirm:
- Active phase
- QA executed without skipping
- No governance-owned files modified
- Agent alignment verified
- Authority boundaries respected

Missing or invalid attestations automatically trigger a Governance Incident.

---

## 5. Incident Visibility and Auditability

All governance incidents must be:
- Visible in the FM dashboard
- Tracked end-to-end
- Drill-down capable

Each incident record must include:
- Time of occurrence
- Repository and PR
- Failed gate or rule
- Active phase
- Root cause classification
- Resolution applied
- Files affected
- Lessons Learned status
- Repeat count for the same cause

Untracked incidents are governance failures.

---

## 6. Learning Enforcement

Governance incidents participate in the BYG learning model.

- First occurrence: allowed, must be recorded
- Second occurrence: catastrophic
- Third occurrence: systemic failure

Failure to record or enforce learning is itself a governance violation.

---

## 7. Non-Negotiables

- Governance failures are never ignored
- Builders never fix governance
- FM never mutates constitutions
- Codex never acts without approval
- Humans are always informed
- Silent recovery is forbidden

---

## 8. Success Criterion

This doctrine is successful when:
- Governance incidents become rare
- Builder behavior aligns automatically
- Merge confidence increases
- Authority boundaries remain intact
- Speed and control coexist
