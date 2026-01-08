# FM Builder Appointment Instruction Template

**Template Version**: 2.0.0  
**Template Authority**: Canonical (implements FM_BUILDER_APPOINTMENT_PROTOCOL.md)  
**Purpose**: Streamlined instruction FM issues to builders during constitutional appointment  
**Canonical References**: FM_BUILDER_APPOINTMENT_PROTOCOL.md, AGENT_ONBOARDING_QUICKSTART.md

---

## Instructions for FM

This template implements **Step 3** (Explicit Constitutional Onboarding) of FM_BUILDER_APPOINTMENT_PROTOCOL.md.

**FM MUST**:
1. Copy this template for each builder appointment
2. Fill in all `[BRACKETED]` placeholders with specific values
3. Issue complete instruction to builder before execution authorization
4. Require builder acknowledgment per FM_BUILDER_APPOINTMENT_PROTOCOL.md Step 4
5. Direct builder to AGENT_ONBOARDING_QUICKSTART.md for detailed governance understanding

**DO NOT**:
- Duplicate governance doctrine in this instruction (it lives in canon)
- Paraphrase constitutional requirements (reference them explicitly)
- Assume builder "already knows" governance (verify acknowledgment)

---

# BUILDER APPOINTMENT INSTRUCTION

**Issued By**: Foreman (FM)  
**Issued To**: `[BUILDER_ID]` (Builder)  
**Appointment Date**: `[ISO_8601_TIMESTAMP]`  
**Task Reference**: `[TASK_ID]` or `[ISSUE_NUMBER]`  
**Repository**: `[REPOSITORY_NAME]`

---

## 1. Constitutional Onboarding (MANDATORY READING)

Before starting any work, you MUST read and acknowledge:

### 1.1 Agent Onboarding
**READ FIRST**: `governance/canon/AGENT_ONBOARDING_QUICKSTART.md`

This document provides your complete onboarding path, including:
- Your role and authority boundaries
- Canonical governance references
- Escalation protocols
- 3-step operational protocol
- Mandatory compliance requirements

### 1.2 Your Agent Contract
**Agent Contract Location**: `[PATH_TO_AGENT_CONTRACT]`

Your contract defines:
- Your scope (allowed/restricted/escalation paths)
- Your capabilities
- Your governance bindings (canonical references)
- Your escalation target

**READ**: Your entire `.agent` contract before proceeding.

### 1.3 Builder Profile
**Builder Profile**: `governance/profiles/builder.v1.md`

Defines your role constraints, allowed actions, prohibited actions, and escalation rules.

### 1.4 Core Governance (Essential Reading)
You MUST understand these before execution:
- **FM_BUILDER_APPOINTMENT_PROTOCOL.md** - This appointment process and your obligations
- **BUILDER_FIRST_PR_MERGE_MODEL.md** - Your QA reports are canonical truth
- **BUILD_PHILOSOPHY.md** (if available in repo) - One-Time Build Law, Zero Test Debt
- **OPOJD_DOCTRINE.md** (if available in repo) - Continuous execution mandate

**All governance lives in `governance/canon/` - reference it, do not duplicate it.**

---

## 2. Your Task Specification

### 2.1 Architecture (YOUR LAW)
You MUST implement EXACTLY as specified in the architecture.

**Architecture Document**: `[ARCHITECTURE_PATH]`  
**Architecture Version**: `[ARCHITECTURE_VERSION]`

**Key Points**:
```
[SUMMARY_OF_KEY_ARCHITECTURAL_DECISIONS]
```

**If architecture is ambiguous or incomplete**: STOP and escalate to FM (BLOCKED state).

### 2.2 Red QA Suite (YOUR SUCCESS CRITERIA)
Your task is complete when this QA suite is **100% GREEN**.

**Red QA Location**: `[RED_QA_PATH]`  
**Current State**: RED (failing because implementation does not exist)

**QA Coverage Summary**:
```
[SUMMARY_OF_QA_COVERAGE]
Example: 83 tests covering unit, integration, UI, accessibility
```

**Zero Test Debt**: 100% GREEN required. Not 99%. Not "mostly passing."

### 2.3 Scope Boundaries
**Allowed Paths** (you MAY modify):
```
[LIST_ALLOWED_PATHS]
```

**Restricted Paths** (you MUST NOT modify):
```
[LIST_RESTRICTED_PATHS]
```

**Escalation-Required Paths** (escalate before modifying):
```
[LIST_ESCALATION_PATHS]
```

**If you need to modify files outside allowed paths**: STOP and escalate to FM (BLOCKED state).

---

## 3. Execution Requirements (Constitutional)

### 3.1 One-Time Build Law
You MUST deliver a **fully functional, 100% GREEN build on first attempt**.

**Reference**: BUILD_PHILOSOPHY.md (One-Time Build Law)

- No "progress" submissions
- No partial delivery
- No "almost done" states
- Terminal states only: COMPLETE or BLOCKED

### 3.2 OPOJD (One-Prompt One-Job Doctrine)
You MUST execute continuously without mid-build approval requests.

**Reference**: OPOJD_DOCTRINE.md

- Execute from start to completion in one continuous session
- Do NOT request mid-build approval from FM or humans
- Do NOT submit partial work for review
- If you encounter a blocker: Document it and report BLOCKED state

### 3.3 QA as Canonical Truth
Your QA reports determine merge readiness.

**Reference**: BUILDER_FIRST_PR_MERGE_MODEL.md

- Generate BUILD_QA_REPORT.json and GOVERNANCE_COMPLIANCE_REPORT.json in `.qa/builder/`
- Your assessment is canonical - CI enforces presence, not interpretation
- If your QA reports say "READY", CI trusts you

### 3.4 Escalation Protocol
**When to Escalate to FM**:
- Architecture is ambiguous or incomplete
- Required change falls outside allowed_paths
- Governance requirements are unclear
- Conflicting constraints or requirements
- Any uncertainty about authority boundaries

**Escalation is success, not failure.**

---

## 4. Deliverables Checklist

When reporting COMPLETE, you MUST have:

- [ ] Implementation matches architecture exactly
- [ ] All Red QA tests are 100% GREEN (zero failures)
- [ ] Build passes with zero errors, zero warnings
- [ ] No modifications outside allowed_paths
- [ ] QA reports generated in `.qa/builder/`
  - [ ] BUILD_QA_REPORT.json (build_status: "PASS", merge_readiness.ready: true)
  - [ ] GOVERNANCE_COMPLIANCE_REPORT.json (compliance_status: "COMPLIANT")
- [ ] Enhancement proposals captured (if any) in parking station
- [ ] Completion report with evidence links

**If any item is incomplete**: State is BLOCKED, not "partially complete."

---

## 5. Acknowledgment Required

Before FM authorizes execution, you MUST acknowledge:

**I acknowledge that I have**:
1. ✅ Read AGENT_ONBOARDING_QUICKSTART.md
2. ✅ Read my `.agent` contract at `[PATH_TO_AGENT_CONTRACT]`
3. ✅ Read governance/profiles/builder.v1.md
4. ✅ Read FM_BUILDER_APPOINTMENT_PROTOCOL.md
5. ✅ Read BUILDER_FIRST_PR_MERGE_MODEL.md
6. ✅ Understand One-Time Build Law (100% GREEN, no partial delivery)
7. ✅ Understand OPOJD (continuous execution, no mid-build approval)
8. ✅ Understand terminal states (COMPLETE or BLOCKED, no "progress")
9. ✅ Understand scope boundaries (allowed/restricted/escalation paths)
10. ✅ Understand escalation protocol (escalate when uncertain)

**Respond with**: "ACKNOWLEDGED - Ready for execution authorization" when all items checked.

---

## 6. Execution Authorization

**FM Authorization Status**: [PENDING / AUTHORIZED]

**Authorized By**: [FM_AGENT_ID]  
**Authorization Timestamp**: [ISO_8601_TIMESTAMP]

**Execution may NOT begin until FM changes status to AUTHORIZED.**

---

## 7. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│ BUILDER QUICK REFERENCE                                      │
├─────────────────────────────────────────────────────────────┤
│ My Role:        Builder ([BUILDER_CLASS])                   │
│ My Contract:    [PATH_TO_AGENT_CONTRACT]                    │
│ My Profile:     governance/profiles/builder.v1.md           │
│                                                              │
│ Architecture:   [ARCHITECTURE_PATH]                         │
│ Red QA:         [RED_QA_PATH]                               │
│                                                              │
│ Success:        100% GREEN QA (not 99%, not "mostly")      │
│ States:         COMPLETE or BLOCKED (no "progress")         │
│ Execution:      Continuous (OPOJD - no mid-build pauses)   │
│                                                              │
│ When Stuck:     HALT → Escalate to FM → Do NOT guess       │
│                                                              │
│ Deliverables:   Build GREEN + QA reports + enhancements    │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Additional Resources

**Governance Canon**: `governance/canon/` in governance repo  
**Onboarding Guide**: `governance/canon/AGENT_ONBOARDING_QUICKSTART.md`  
**Builder Profile**: `governance/profiles/builder.v1.md`  
**Appointment Protocol**: `governance/canon/FM_BUILDER_APPOINTMENT_PROTOCOL.md`

**Questions?** Escalate to FM.

---

**This appointment instruction is complete. Builder may proceed to acknowledgment.**

---

End of FM Builder Appointment Instruction Template v2.0.0
