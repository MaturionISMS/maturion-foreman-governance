# BYG Doctrine — Build As You Go

## 1. Purpose

The Build As You Go (BYG) doctrine defines how Maturion systems are designed, built, validated, and evolved.

BYG exists to enable:
- Rapid, reliable delivery
- Predictable outcomes
- Continuous architectural learning
- Strong governance without loss of speed

The ultimate goal of BYG is **one-time builds**: systems that are built once, correctly, because the architecture fully anticipates reality.

---

## 2. Core Principle

> Architecture is incomplete until reality proves it complete.

Architecture defines intent.  
QA is the executable specification of that intent.  
Code is a consequence.

No build is considered correct unless it satisfies architecture as verified by QA.

---

## 3. Roles and Authority

### Foreman (FM)
- Designs architecture end-to-end
- Designs QA to fully test that architecture
- Acts as gatekeeper for builds
- Detects architectural and governance misalignments
- May correct builder behavior within delegated authority
- May not modify constitutional governance

### Builder
- Executes builds against provided architecture and QA
- Builds from RED to GREEN
- Does not reinterpret architecture
- Does not modify governance
- Does not self-approve

### Codex
- Sole executor of governance mutations
- Performs governance audits and alignment
- Executes approved governance changes
- Ensures ripple-effect consistency across repositories and agents

### Human
- Sole release authority
- Sole authority to classify failures as architectural
- Approves or rejects governance changes
- Final arbiter of escalation decisions

---

## 4. Phases and RED States

### Build RED
- Indicates incomplete implementation
- Expected during BUILD-TO-GREEN
- Informational
- Merge not allowed

### Build GREEN
- Indicates full compliance with architecture
- Required for handover
- Enables merge consideration

### Governance RED
- Indicates authority violation, phase mismatch, or governance breach
- Never allowed to merge
- Requires human intervention

RED states must never be conflated.

---

## 5. Learning and Failure Semantics

BYG enforces compulsory learning.

- First occurrence of a failure cause:
  - Allowed
  - Must be recorded as a Lesson Learned
- Second occurrence of the same cause:
  - Catastrophic
  - Indicates governance or architectural negligence
- Third occurrence:
  - Systemic failure
  - Triggers full process and governance review

Unrecorded learning is a governance failure.

---

## 6. Lessons Learned

All Lessons Learned must be:
- Explicitly recorded
- Typed (functional, environmental, deployment, security, UX, etc.)
- Mapped to architecture changes
- Reflected in updated QA

Lessons Learned form permanent institutional memory.

---

## 7. BYG Operation

BYG allows architecture to evolve in real operational contexts.

When feedback is received:
1. Feedback is classified by the Human
2. Architecture and QA are updated
3. Builder produces a new GREEN build
4. Delivery occurs rapidly and with confidence

BYG replaces patching with architectural evolution.

---

## 8. Non-Negotiables

- No self-governance
- No silent rule changes
- No bypassing QA
- No authority ambiguity
- No repeated failures without learning

---

## 9. Success Criterion

BYG is successful when:
- One-time builds become normal
- Failures become rare and predictable
- Architecture anticipates reality
- Speed and control coexist
