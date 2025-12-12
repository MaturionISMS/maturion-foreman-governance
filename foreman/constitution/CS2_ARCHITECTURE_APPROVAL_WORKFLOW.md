# CS2: Architecture Approval Workflow

## Overview

**CS2 (Architecture Approval Workflow)** defines the governance process for architecture changes and protected file modifications in the Maturion Engineering Ecosystem.

This constitutional document ensures:
- Architecture changes require explicit approval
- Protected files are safeguarded
- Constitutional integrity is maintained
- One-Prompt One-Job Doctrine (OPOJD) is enforced

---

## Core Principles

### Architecture Approval Requirement

All architecture changes must go through the approval workflow:

1. **Architecture Proposal Phase**
   - Document proposed architecture
   - Define scope and impact
   - Identify affected systems
   - List alternatives considered

2. **Review Phase**
   - Technical review (correctness, completeness)
   - Security review (vulnerability assessment)
   - Governance review (constitutional compliance)

3. **Approval Phase**
   - Human approval required (cannot be automated)
   - Must be explicit and documented
   - Approval authority: Owner (Johan) or designated approver

4. **Implementation Phase**
   - Follow Build Philosophy (Architecture → Red QA → Build to Green)
   - All changes tracked and auditable
   - Evidence trail maintained

---

## Protected Files

The following files and directories require CS2 approval for modification:

### Constitutional Files
- `.github/foreman/agent-contract.md` - Foreman's constitutional contract
- `/BUILD_PHILOSOPHY.md` - Supreme authority for build processes
- `/foreman/constitution/*` - All constitutional documents
- `/maturion/philosophy/maturion-governance-constitution.md` - Governance constitution

### Workflow Files
- `.github/workflows/*` - All GitHub Actions workflows
- `.github/workflows/qiel.yml` - QIEL enforcement workflow
- `.github/workflows/qic.yml` - Quality Integrity Contract workflow
- `.github/workflows/deploy-check.yml` - Deployment verification workflow

### Governance Files
- `docs/governance/*` - Governance documentation
- `/foreman/governance/*` - Governance rules and procedures
- `/foreman/constitution/guardrails.json` - Immutable paths and protections

### Agent Files (Context-Dependent)
- `.github/agents/foreman.agent.md` - Foreman agent definition
- `.github/agents/builder.agent.md` - Builder agent definition
- `.github/agents/maturion-builder.agent.md` - Maturion-Builder agent definition

**Note**: Agent files may be modified under specific constitutional patches with explicit Owner approval (as granted for OPOJD Constitutional Patch).

---

## OPOJD Extension — Architecture-Only Approval Requirement

Under the **One-Prompt One-Job Doctrine (OPOJD)**, the Owner's approval is required **ONLY** for architectural changes as defined in CS2.

### Approval Scope

**Requires CS2 Approval:**
- Architecture design and changes
- Protected file modifications (listed above)
- Constitutional document updates
- Governance rule changes

**Does NOT Require Approval After Architecture Acceptance:**
Once architecture is approved, all downstream stages **MUST** execute autonomously without pause:

1. **Red QA generation** - Automatic, no approval needed
2. **Build to Green** - Automatic, no approval needed
3. **Validation** - Automatic, no approval needed
4. **Merge** - Automatic (subject to automated gates), no approval needed
5. **Evidence generation** - Automatic, no approval needed
6. **Deployment** (if applicable) - Automatic (subject to gates), no approval needed

### Execution Flow

```
[Architecture Proposal] → [CS2 APPROVAL REQUIRED] → [Architecture Approved]
                                                              ↓
                                            [Autonomous Execution Begins]
                                                              ↓
                    [Red QA] → [Build to Green] → [Validation] → [Merge] → [Deploy]
                         ↑                                                      ↓
                         └──────────── No Approval Required ──────────────────┘
```

### Agent Behavior Under OPOJD

**Agents MUST NOT:**
- Request additional approval after architecture acceptance
- Pause execution mid-task without constitutional reason
- Ask "Should I continue?" between lifecycle phases
- Wait for human confirmation for downstream stages

**Agents MUST:**
- Execute entire job lifecycle after architecture approval
- Assume permission to continue unless CS1-CS6 boundary triggered
- Escalate only for governance violations or unrecoverable failures
- Maintain evidence trail of autonomous execution

### Exceptions to Autonomous Execution

Execution **MAY** pause only when:

1. **CS1 (Constitutional Integrity)** - Constitutional boundary violation detected
2. **CS2 (Architecture Approval)** - Additional protected file modification required
3. **CS3 (Incident Feedback)** - Critical incident requires human review
4. **CS4 (Compliance Monitoring)** - Compliance violation detected
5. **CS5 (Performance Enforcement)** - Performance degradation threshold exceeded
6. **CS6 (Execution Boundary)** - Execution boundary violation detected
7. **Unrecoverable Failure** - 3+ QA failures or critical system error

### Evidence Requirements

After architecture approval, agents must maintain evidence of:
- Architecture approval timestamp and approver
- Autonomous execution timeline
- State transitions with reasons
- Any pauses with constitutional justification
- Completion status and QA results

This evidence is required for governance validation and audit.

---

## CS2 Trigger Conditions

CS2 is triggered when:

1. **Protected File Modification Detected**
   - Any file in protected paths is being modified
   - Change detection occurs before modification

2. **Architecture Change Proposed**
   - New architecture document created
   - Existing architecture significantly updated
   - System boundaries changed

3. **Constitutional Document Update**
   - Any file in `/foreman/constitution/`
   - `BUILD_PHILOSOPHY.md`
   - Agent contract files

4. **Workflow Modification**
   - GitHub Actions workflows changed
   - CI/CD pipeline updated
   - Governance enforcement workflows modified

---

## CS2 State Transition

### Normal Flow (No CS2 Trigger)
```
ARCHITECTURE_DESIGN → CHECKLIST_VALIDATION → RED_QA_CREATION → BUILD_TO_GREEN → VALIDATION → MERGE
```

### With CS2 Trigger
```
ARCHITECTURE_DESIGN → CS2_TRIGGERED → WAITING_FOR_APPROVAL → [APPROVAL] → RED_QA_CREATION → ...
                                              ↓
                                         [REJECTED]
                                              ↓
                                      ARCHITECTURE_REVISION
```

### WAITING_FOR_APPROVAL State

**Entry Conditions:**
- CS2 triggered
- Protected file modification requested
- Architecture approval needed

**Exit Conditions:**
- Owner approval granted → Continue to Red QA
- Owner rejection → Return to architecture design
- Timeout (24 hours) → Escalate to Owner

**Behavior While Waiting:**
- Agent status: `WAITING_FOR_APPROVAL`
- No other work proceeds
- Notification sent to Owner
- Evidence logged

---

## Approval Process

### Manual Approval

**Format:**
```
@foreman

CS2 Approval Granted: [Reason]

You may proceed with:
- [Specific change 1]
- [Specific change 2]
- [Specific change N]

This approval is valid for this PR only and expires upon merge.
```

**Requirements:**
- Must be from Owner or designated approver
- Must be explicit (no implied approval)
- Must specify scope of approval
- Must reference specific changes

### Temporary Permission

For constitutional patches (like OPOJD), Owner may grant temporary permission:

```
@foreman

Temporary CS2 Override: [Constitutional Patch Name]

You may modify protected files for this commit only:
- [File 1]
- [File 2]
- [File N]

Permission automatically revoked after merge.
Follow Architecture → Red QA → Build-to-Green → Validation → Merge → Evidence.
```

---

## Integration with Other Constitutional Safeguards

### CS1 Integration
- CS2 approval cannot override CS1 (constitutional integrity)
- Secret exposure still blocked even with CS2 approval
- Guardrails remain enforced

### CS5 Integration
- CS2 is the **ONLY** legitimate pause reason (along with CS1, CS3, CS4, CS6)
- Unnecessary pauses = CS5 violation (Anti-Interruption Rule)
- After CS2 approval, continuous execution required (OPOJD)

### CS6 Integration
- CS2 defines execution boundary for protected files
- After approval, CS6 continuous execution applies
- Assume-Continue Principle activated after approval

### QIC Integration
- CS2 changes still require 100% QA passing
- Quality standards not relaxed for approved changes
- Build Philosophy still supreme

---

## Emergency Procedures

### Emergency CS2 Bypass

**Only for critical security vulnerabilities or system-breaking bugs.**

**Requirements:**
1. Document critical nature of issue
2. Explain why immediate change needed
3. Create incident report
4. Obtain verbal approval (if possible)
5. Create follow-up PR for constitutional review

**Process:**
1. Create emergency branch
2. Make minimal necessary changes
3. Document all changes in commit message
4. Merge with `EMERGENCY_CS2_BYPASS` flag
5. Create post-merge review issue
6. Conduct constitutional review within 24 hours

**Emergency bypasses:**
- Must be reverted if review fails
- Cannot set precedent for future bypasses
- Require full constitutional review
- Must strengthen governance to prevent recurrence

---

## Compliance

### How to Verify CS2 Compliance

```bash
# Check if protected files modified
npm run guardrail:report

# Verify CS2 approval in PR
# Look for explicit approval comment from Owner

# Check architecture approval evidence
# Verify architecture document exists and is complete

# Run constitutional QA
npm run test tests/qic/architecture-integrity.test.ts
```

### CS2 Violation Consequences

**If CS2 bypassed:**
- PR automatically blocked
- Merge prevented
- Incident created
- Owner notified
- Constitutional review triggered

**If CS2 process incomplete:**
- PR marked as non-compliant
- Cannot merge until compliant
- Must obtain proper approval
- Must follow complete workflow

---

## Summary

CS2 ensures architecture changes are:
- ✅ Properly reviewed and approved
- ✅ Follow constitutional process
- ✅ Maintain governance integrity
- ✅ Support OPOJD autonomous execution after approval
- ✅ Protected files safeguarded
- ✅ Evidence trail maintained

**CS2 is the gatekeeper for architecture. OPOJD is the executor after the gate opens.**

---

## Version and Authority

**Version**: 2.0 (OPOJD Integration)  
**Last Updated**: 2025-12-12  
**Authority**: Maturion Engineering Leadership (Johan)  
**Status**: Active and Enforced  
**Integration**: Part of Constitutional Framework (CS1-CS6)

---

## Related Documents

- `/BUILD_PHILOSOPHY.md` - Supreme authority for building
- `/foreman/constitution/CS5_PERFORMANCE_ENFORCEMENT.md` - Anti-Interruption Rule
- `/foreman/constitution/CS6_EXECUTION_BOUNDARY.md` - Continuous Execution Mandate
- `/maturion/philosophy/maturion-governance-constitution.md` - OPOJD definition
- `.github/foreman/agent-contract.md` - Foreman's constitutional contract
- `/foreman/architecture-design-checklist.md` - Architecture completeness requirements

