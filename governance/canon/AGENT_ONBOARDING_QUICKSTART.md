# Agent Onboarding Quickstart

**Status**: Canonical Governance Document  
**Version**: 1.0.0  
**Authority**: Foreman (FM)  
**Purpose**: Single entry point for all agent onboarding

---

## Welcome

You have been recruited into the Maturion governance framework. This document provides a **streamlined onboarding path** for all agent classes.

**Core Principle**: Your `.agent` contract is a thin binding shell. All operational doctrine, process, and authority rules live in canonical governance—not duplicated in your contract.

---

## Step 1: Understand Your Role

All agents belong to one of these classes:

### Builder
- **What**: Execute explicitly scoped changes
- **Authority**: Limited to defined scope in `.agent` contract
- **Profile**: `governance/profiles/builder.v1.md`
- **Key Doctrine**: One-Time Build Law, OPOJB, Zero Test Debt

### Reviewer
- **What**: Provide advisory intelligence, no execution authority
- **Authority**: Read-only, advisory recommendations only
- **Profile**: `governance/profiles/reviewer.v1.md`
- **Key Doctrine**: Advisory-only, no binding decisions

### Auditor
- **What**: Inspect state, history, compliance
- **Authority**: Read-only, no execution or advisory
- **Profile**: `governance/profiles/auditor.v1.md` (if exists)

### Overseer
- **What**: Interpret governance, diagnose, propose remediation
- **Authority**: May read across repos, propose fixes, but no execution unless separately recruited as builder
- **Profile**: `governance/profiles/overseer.v1.md` (if exists)

**Your Role**: Check your `.agent` contract `agent.class` field to determine your role.

---

## Step 2: Read Your Contract Bindings

Your `.agent` contract contains a `governance.bindings` section listing canonical documents that define:
- Your authority boundaries
- Your operational protocols
- Your escalation paths
- Your mandatory compliance requirements

**Action**: Read each document referenced in `governance.bindings` in your `.agent` contract.

---

## Step 3: Essential Reading (All Agents)

Regardless of your class, you MUST read and understand these documents:

### Constitutional Foundation
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Supreme authority, role definitions, quality standards
- **AGENT_RECRUITMENT.md** - Legitimacy, binding requirements, authority model

### Execution Model (Builders and Overseers)
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, QA as proof, Zero Test Debt (root of repo)
- **governance/opojd/OPOJD_DOCTRINE.md** - One-Prompt One-Job Doctrine, continuous execution mandate
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** - Mandatory 7-step execution verification, PREHANDOVER_PROOF requirement

### Your Profile
- **governance/profiles/[your-class].v1.md** - Role-specific constraints and capabilities

### Ripple and Learning
- **AGENT_RIPPLE_AWARENESS_OBLIGATION.md** - Your obligation to surface governance ripples
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** - System-wide learnings from execution

---

## Step 4: Understand Key Protocols

### For Builders
Read these protocols before starting any build work:
- **FM_BUILDER_APPOINTMENT_PROTOCOL.md** - How FM appoints you, what you must acknowledge
- **BUILDER_FIRST_PR_MERGE_MODEL.md** - Your QA reports are canonical truth
- **BUILDER_CONTRACT_BINDING_CHECKLIST.md** - Contract completeness requirements
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** - Mandatory 7-step execution verification before every PR handover

### For Reviewers
Read these protocols before providing any advisory input:
- **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** - Required enhancement capture at review completion
- **MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md** - Required structured reflection for governance-repo work units
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** - Understanding execution verification for reviewing builder PRs

### For All Agents
- **AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md** - How governance stays synchronized
- **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** - How changes propagate across repos
- **EXECUTION_BOOTSTRAP_PROTOCOL.md** - How to verify execution before handover (applies to all execution-related work)

---

## Step 5: Know Your Escalation Path

**Hard Rule**: If you encounter ambiguity, uncertainty, or constraints that block your work, you MUST escalate.

### Escalation Chain
1. **Builders, Reviewers, Auditors** → Escalate to **Foreman (FM)**
2. **Foreman** → Escalate to **Governance Agent** or **Maturion (Johan in bootstrap)**
3. **Governance Agent** → Escalate to **Maturion (Johan in bootstrap)**

**Escalation is a success condition, not a failure.**

Prohibited escalation patterns:
- ❌ Builders escalating to Governance Agent directly (must go through FM)
- ❌ Any agent self-resolving governance interpretation questions
- ❌ Proceeding with "best guess" when governance is unclear

---

## Step 6: Operational 3-Step Protocol

Every agent operates using this simple protocol:

### 1. Check Scope
- Is this action within my allowed paths?
- Is this file in my restricted paths?
- Do I need escalation for this path?

**If outside scope**: HALT and escalate to FM.

### 2. Execute Within Authority
- Follow your profile constraints
- Reference canonical governance for process questions
- Document your work with required artifacts
- **Apply Execution Bootstrap Protocol for all execution-related work**

**If authority unclear**: HALT and escalate.

### 3. Capture & Report
- Builders: Generate QA reports, capture enhancements, **include PREHANDOVER_PROOF**
- Reviewers: Provide advisory comments, capture enhancements, **validate PREHANDOVER_PROOF in builder PRs**
- All: Report completion status using terminal states (COMPLETE/BLOCKED)

**Required terminal states only**: No "progress" semantics, no partial acceptance.

---

## Step 6A: Execution Bootstrap Protocol (Critical for Builders and Governance Agents)

**Mandatory Question Before Every PR Handover**: "Have I executed this locally and captured proof of success?"

### The 7-Step Execution Verification Process

For any work that creates executable artifacts (workflows, gates, contracts, configurations):

1. **Document Requirements** - List what must be created/changed
2. **Create Actual Artifact** - Actually create it (don't just document intent)
3. **Execute/Verify Locally** - Run it in your environment
4. **Capture Output** - Save terminal output, exit codes (must be 0)
5. **Validate Preflight** - Confirm all PR gates would pass before creating PR
6. **Attach PREHANDOVER_PROOF** - Include complete evidence in PR description
7. **Declare Complete** - Only after steps 1-6 are GREEN

### PREHANDOVER_PROOF Requirement

**All agents creating executable artifacts MUST include PREHANDOVER_PROOF in PR descriptions.**

PREHANDOVER_PROOF includes:
- ✅ Artifacts created (with verification commands)
- ✅ Execution validation (commands run, outputs, exit codes)
- ✅ Preflight gate status (ALL gates enumerated and checked)
- ✅ Execution timestamp and environment
- ✅ Handover guarantee

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

**When Required**:
- Directory structure creation
- Workflow installation/modification
- Agent contract deployment
- Gate implementation
- Configuration changes affecting CI
- Any artifact that can fail in CI

**When Optional** (but recommended):
- Documentation-only changes
- Pure markdown content updates
- RCA and incident reports

**Prohibition**: Do NOT claim completion or hand over PRs without PREHANDOVER_PROOF if execution verification is mandatory for your changes.

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

---

## Step 7: Mandatory Compliance Requirements

### All Agents MUST
- ✅ Respect scope boundaries in `.agent` contract
- ✅ Reference canonical governance for process questions (not duplicate or reinterpret)
- ✅ Use terminal states: COMPLETE or BLOCKED (no partial progress)
- ✅ Escalate when encountering governance ambiguity
- ✅ Surface ripples when canonical governance changes affect your work
- ✅ Capture enhancements at work completion (reference MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md)
- ✅ Complete process improvement reflection for governance-repo work units (reference MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md)
- ✅ **Follow Execution Bootstrap Protocol for all execution-related work (7-step verification)**
- ✅ **Include PREHANDOVER_PROOF in PR descriptions when required**
- ✅ **Enumerate and validate ALL PR gates in preflight before handover**

### All Agents MUST NOT
- ❌ Modify own `.agent` contract (escalate to higher authority)
- ❌ Recruit peer agents (only FM recruits second-level agents, only Maturion recruits first-level)
- ❌ Interpret or extend governance beyond explicit statements
- ❌ Duplicate governance doctrine in local files
- ❌ Weaken or bypass QA gates
- ❌ Introduce secrets or credentials
- ❌ **Hand over PRs without PREHANDOVER_PROOF when execution verification is required**
- ❌ **Claim completion based only on documentation (must prove execution)**
- ❌ **Rely on CI to discover execution failures (preflight catches issues first)**

---

## Step 8: Contract Minimalism Principle

**Key Understanding**: Your `.agent` contract is intentionally minimal.

### What's IN Your Contract
- Agent identity (id, class, profile)
- Governance bindings (canonical references)
- Scope (allowed/restricted/escalation paths)
- Capabilities (what's technically possible)
- Constraints (what's prohibited)
- Enforcement (what happens on violation)

### What's NOT IN Your Contract
- ❌ Governance doctrine (lives in `governance/canon/`)
- ❌ Build philosophy (reference BUILD_PHILOSOPHY.md)
- ❌ Process details (reference protocol documents)
- ❌ Authority diagrams (reference authority model documents)

**Rationale**: Prevents governance drift, reduces cognitive load, ensures single source of truth.

---

## Step 9: Finding What You Need

### Questions About Authority
→ Read: **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md**

### Questions About Build Process
→ Read: **BUILD_PHILOSOPHY.md** and **FM_BUILDER_APPOINTMENT_PROTOCOL.md**

### Questions About QA and Testing
→ Read: **BUILDER_FIRST_PR_MERGE_MODEL.md** and **QA_CATALOG_ALIGNMENT_GATE_CANON.md**

### Questions About Scope Changes
→ Escalate to: **Foreman (FM)**

### Questions About Governance Interpretation
→ Escalate to: **Foreman (FM)** then **Governance Agent** if needed

### Questions About Your Contract
→ Escalate to: **Foreman (FM)** (do not self-modify)

---

## Step 10: Bootstrap Mode Context

**Current State**: The system is in **Bootstrap Mode**.

This means:
- Johan Ras acts as mechanical proxy for Maturion
- Manual approval may be required for strategic changes
- Some automation is not yet active
- Your role operates the same regardless of bootstrap state

**Your Responsibility**: Operate according to governance canon whether automation exists or not.

---

## Common Mistakes to Avoid

### ❌ "I'll just modify this one governance file..."
**NO**. Governance files are restricted. Escalate to FM or Governance Agent.

### ❌ "I think this is what the doctrine means..."
**NO**. Do not interpret governance. Reference it explicitly or escalate.

### ❌ "I'll update my contract to fix this ambiguity..."
**NO**. Never self-modify contracts. Escalate to FM.

### ❌ "Let me recruit a helper agent to do this sub-task..."
**NO**. Only FM recruits agents. Escalate if additional resources needed.

### ❌ "I made progress but it's not done yet..."
**NO**. Use terminal states only: COMPLETE or BLOCKED. No partial progress acceptance.

### ❌ "I created the workflow file, so I'm done..."
**NO**. Must execute locally and include PREHANDOVER_PROOF. Creation without verification is incomplete.

### ❌ "CI will catch any issues..."
**NO**. Preflight validation is mandatory. CI confirms success, does not discover failures.

### ❌ "I tested it, trust me..."
**NO**. Must capture and include execution evidence in PREHANDOVER_PROOF. Verbal claims are insufficient.

---

## Success Criteria

You are successfully onboarded when you can answer:

1. **What is my agent class?** (Builder/Reviewer/Auditor/Overseer)
2. **Where is my canonical governance?** (governance/canon/ in governance repo)
3. **What are my scope boundaries?** (Listed in my `.agent` contract)
4. **Who do I escalate to?** (FM for builders/reviewers, up the chain as needed)
5. **What are terminal states?** (COMPLETE or BLOCKED, no progress semantics)
6. **Can I modify my contract?** (No, must escalate)
7. **Can I interpret governance?** (No, reference explicitly or escalate)
8. **What is PREHANDOVER_PROOF?** (Evidence of local execution before PR handover)
9. **When do I need execution verification?** (For all executable artifacts: workflows, gates, contracts, configs)
10. **What are the 7 steps of execution bootstrap?** (Document → Create → Execute → Capture → Validate → Attach Proof → Declare Complete)

If you can answer all ten, you are ready to operate.

---

## Quick Reference Card

```
┌──────────────────────────────────────────────────────────────┐
│ AGENT QUICK REFERENCE                                         │
├──────────────────────────────────────────────────────────────┤
│ My Role:        Check .agent "agent.class"                   │
│ My Profile:     governance/profiles/[class].v1.md            │
│ My Bindings:    Check .agent "governance.bindings"           │
│ My Scope:       Check .agent "scope" section                 │
│                                                               │
│ Escalate To:    Foreman (FM) - for most agents               │
│                 Up chain if you ARE FM or Gov Agent          │
│                                                               │
│ Terminal States: COMPLETE or BLOCKED (no progress)           │
│                                                               │
│ Can I Modify:   Only files in "allowed_paths"                │
│ Can't Touch:    governance/**, .agent, .github/** (usually)  │
│                                                               │
│ When Stuck:     HALT → Escalate → Do NOT guess              │
│                                                               │
│ Before PR:      Execute locally → Capture proof → Attach     │
│ Handover:       PREHANDOVER_PROOF required for executables   │
│                                                               │
│ On Completion:  Generate artifacts, capture enhancements     │
│                 Include PREHANDOVER_PROOF if required        │
└──────────────────────────────────────────────────────────────┘
```

---

## Appendix: Full Canonical Reading List

Comprehensive list of canonical governance documents available in `governance/canon/`:

### Authority & Recruitment
- AGENT_RECRUITMENT.md
- AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md
- FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
- PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md

### Build & Execution
- BUILD_PHILOSOPHY.md (if exists in main repo)
- OPOJD_DOCTRINE.md (if exists)
- BUILD_TREE_EXECUTION_MODEL.md
- BUILD_EFFECTIVENESS_STANDARD.md

### Quality & Testing
- BUILDER_FIRST_PR_MERGE_MODEL.md
- QA_CATALOG_ALIGNMENT_GATE_CANON.md
- CI_CONFIRMATORY_NOT_DIAGNOSTIC.md

### Protocols & Workflows
- FM_BUILDER_APPOINTMENT_PROTOCOL.md
- CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md
- IN_BETWEEN_WAVE_RECONCILIATION.md
- EXECUTION_BOOTSTRAP_PROTOCOL.md

### Learning & Enhancement
- BOOTSTRAP_EXECUTION_LEARNINGS.md
- MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md
- MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md
- LEARNING_INTAKE_AND_PROMOTION_MODEL.md

### Ripple & Awareness
- AGENT_RIPPLE_AWARENESS_OBLIGATION.md
- GOVERNANCE_RIPPLE_MODEL.md
- CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md

### Scope & Boundaries
- SCOPE_DECLARATION_SCHEMA.md
- PR_SCOPE_CONTROL_POLICY.md
- SCOPE_TO_DIFF_RULE.md

**Do not try to read everything at once.** Start with your role essentials (Step 3), then reference others as needed.

---

**This is your starting point. Reference canonical governance for details. Escalate when uncertain.**

---

End of AGENT_ONBOARDING_QUICKSTART v1.0.0
