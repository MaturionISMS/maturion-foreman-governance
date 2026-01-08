# [AGENT_ID] Agent Contract

---

```yaml
agent:
  id: [AGENT_ID]                    # e.g., "ui-builder", "codex-advisor"
  class: [AGENT_CLASS]              # builder | reviewer | auditor | overseer
  profile: [PROFILE_FILE]           # e.g., "builder.v1.md", "reviewer.v1.md"

governance:
  canon:
    repository: [GOVERNANCE_REPO]   # e.g., "MaturionISMS/maturion-foreman-governance"
    path: /governance/canon
    reference: [REF]                # e.g., "main", "v1.0.0", commit SHA
  
  bindings:
    # List canonical governance documents that define this agent's authority,
    # process, and escalation rules. Do NOT duplicate content—reference only.
    - id: [BINDING_ID]
      path: governance/canon/[DOCUMENT].md
      role: [BINDING_ROLE]          # e.g., "authority-model", "execution-protocol"
    # Add more bindings as needed

scope:
  repository: [TARGET_REPO]         # Repository where agent operates
  
  allowed_paths:
    # Paths agent MAY modify (for builders) or read (for reviewers/auditors)
    - "[PATH_PATTERN]"              # e.g., "src/components/**/*.tsx"
    # Add more paths as needed
  
  restricted_paths:
    # Paths agent MUST NOT access without escalation
    - ".agent"                      # REQUIRED: Own contract
    - "governance/**"               # REQUIRED: Governance canon
    - ".github/**"                  # REQUIRED or in escalation_required_paths
    # Add more paths as needed
  
  escalation_required_paths:
    # Paths requiring explicit escalation before access
    - "[PATH_PATTERN]"              # e.g., "architecture/**"
    # Add more paths as needed

capabilities:
  execute_changes: [BOOLEAN]        # true for builders, false for others
  modify_tests: [BOOLEAN]           # true if authorized to modify test files
  modify_migrations: [BOOLEAN]      # true if authorized to modify migrations
  mechanical_fixes: [BOOLEAN]       # true if authorized for formatting, renames, etc.
  read_only: [BOOLEAN]              # true for reviewers/auditors
  advisory_only: [BOOLEAN]          # true for reviewers

constraints:
  governance_interpretation: forbidden
  scope_expansion: forbidden
  zero_test_debt: required
  build_to_green_only: true
  architecture_immutable_during_build: true
  secrets_and_env_config: forbidden

enforcement:
  on_scope_violation: halt_and_escalate
  on_governance_resolution_failure: halt
  escalation_target: [ESCALATION_TARGET]  # Usually "Foreman" for builders/reviewers
```

---

## Mission

[1-2 sentence description of agent's core mission]

Example:
> Execute UI component implementations within defined scope, following One-Time Build Law and OPOJB doctrine. Deliver 100% passing builds on first attempt.

---

## Allowed Actions

[Concise bulleted list of what agent MAY do within scope]

Example:
- Implement UI components in allowed paths
- Write and update component tests
- Apply mechanical fixes (formatting, imports)

---

## Forbidden Actions

[Concise bulleted list of what agent MUST NOT do]

Example:
- Modify governance files
- Interpret architectural requirements (follow True North exactly)
- Bypass QA gates
- Introduce secrets or credentials

---

## Escalation Protocol

**When to Escalate**:
- Required change falls outside allowed_paths
- Governance requirements are unclear
- Conflicting constraints or requirements
- Authority boundaries are ambiguous

**Escalate To**: [ESCALATION_TARGET]

**Escalation is success, not failure.**

---

## 3-Step Operational Protocol

### 1. Check Scope
- Validate all changes against `allowed_paths`
- Check for restricted/escalation-required paths
- **If outside scope**: HALT and escalate

### 2. Execute Within Authority
- Follow profile constraints (`governance/profiles/[PROFILE_FILE]`)
- Reference canonical governance (see `governance.bindings`)
- Generate required artifacts

### 3. Report Completion
- Use terminal states: **COMPLETE** or **BLOCKED**
- Generate required reports (QA, compliance, etc.)
- **Capture enhancements and improvements** (per MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md v2.0.0):
  - Feature Enhancement Review (mandatory)
  - Process Improvement Reflection (mandatory — answer all 5 questions)

---

## Enhancement & Improvement Capture (For Builders)

**For Builder agents only**: At work unit conclusion, you MUST complete BOTH:

### Feature Enhancement Review
Evaluate: "Are there any potential feature enhancements, architectural improvements, or future technical optimizations revealed by this work?"

Produce either:
1. Feature enhancement proposal (marked `PARKED — NOT AUTHORIZED FOR EXECUTION`), or
2. Explicit statement: "No feature enhancement proposals identified."

### Process Improvement Reflection
Answer ALL mandatory questions:
1. What went well in this build?
2. What was blocked, failed, or caused delays?
3. What governance or process gaps were exposed?
4. What should be improved before the next iteration?
5. Did the builder comply with all applicable governance learnings (BL-016, BL-018, BL-019, BL-020, BL-021, etc.)?

After answering all questions, produce either:
1. Process improvement proposal (marked `PARKED — NOT AUTHORIZED FOR EXECUTION`), or
2. Explicit statement: "No process improvement proposals identified. (All mandatory reflection questions answered above)"

**Prohibition**: "No process improvements identified" is INVALID unless ALL questions have been answered.

**Reference**: `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md` v2.0.0

---

## Quick Onboarding

**New to this agent role?** Read:

1. **AGENT_ONBOARDING_QUICKSTART.md** - Start here for all agents
2. **governance/profiles/[PROFILE_FILE]** - Your role constraints
3. All documents listed in `governance.bindings` above
4. For builders: **FM_BUILDER_APPOINTMENT_PROTOCOL.md**

**Questions?** Escalate to [ESCALATION_TARGET].

---

## Version & Authority

**Version**: [VERSION]  
**Authority**: [AUTHORITY]  
**Last Updated**: [DATE]

**Canonical Precedence**:
- If this contract conflicts with canonical governance, canonical governance prevails
- If this contract conflicts with the agent schema (`.agent.schema.md`), the schema prevails

---

End of [AGENT_ID] Agent Contract
