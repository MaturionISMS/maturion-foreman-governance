# Execution Bootstrap Protocol - Escalation Instructions

## Status
**Type**: Escalation Protocol  
**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Version**: 1.0.0  
**Effective Date**: 2026-01-11  
**Owner**: Governance Administrator

---

## Purpose

This document defines escalation procedures and instructions for **Execution Bootstrap Protocol violations**, blockers, and ambiguous scenarios.

**Key Principle**: Escalation is success, not failure. When governance is unclear, blocked, or violated, immediate escalation prevents accumulated technical debt.

---

## When to Escalate

### Category 1: Protocol Violations (IMMEDIATE)

**Escalate immediately when:**

- ✅ PR merged WITHOUT required PREHANDOVER_PROOF
- ✅ PREHANDOVER_PROOF attached but execution not performed
- ✅ Agent claims completion without local validation
- ✅ Reviewer approves PR missing PREHANDOVER_PROOF
- ✅ Gate failures discovered in CI that should have been caught in preflight
- ✅ Repeated pattern of incomplete PREHANDOVER_PROOF (3+ occurrences)

**Why immediate**: Violations weaken governance enforcement and create precedent for shortcuts.

**Escalation Target**: Governance Administrator (or Maturion if governance administrator involved in violation)

---

### Category 2: Execution Blockers (HALT)

**HALT execution and escalate when:**

- ✅ Cannot execute Step 3 locally (missing tools, unclear commands)
- ✅ Gate requirements contradict each other
- ✅ Execution succeeds locally but fails in CI consistently
- ✅ Unclear whether PREHANDOVER_PROOF required for specific PR type
- ✅ PREHANDOVER_PROOF requirements exceed available tooling
- ✅ Constitutional vs procedural conflict (cannot satisfy both)

**Why HALT**: Attempting to work around governance blockers creates technical debt and weakens enforcement.

**Escalation Target**: Governance Administrator

---

### Category 3: Ambiguity (CLARIFICATION)

**Escalate for clarification when:**

- ✅ Uncertain which gates apply to PR
- ✅ Gate validation method unclear
- ✅ Exit code non-zero but expected (e.g., git diff)
- ✅ Environment differences between local and CI unknown
- ✅ PREHANDOVER_PROOF template doesn't fit PR type
- ✅ Multiple checklists apply (FM + Builder + Governance)

**Why escalate**: Assumptions lead to incomplete validation and future incidents.

**Escalation Target**: Governance Administrator (or FM if application-specific)

---

## Escalation Channels

### For Agents (Bootstrap Mode)

**Primary**: Create GitHub Issue in governance repository
- Label: `escalation`, `execution-bootstrap-protocol`
- Assign: @governance-repo-administrator (or Maturion/Johan)
- Title format: `[ESCALATION] Execution Bootstrap Protocol: <brief description>`

**Secondary**: Comment on PR blocking escalation
- Tag: @governance-repo-administrator or @APGI-cmy
- Format: "ESCALATION: <category> - <brief description>"

**Emergency**: For critical production-blocking issues
- Notify Maturion/Johan directly via agreed channel

---

### For Humans (Bootstrap Mode)

**Primary**: GitHub Issue in governance repository
- Same format as agents
- Include evidence and attempted solutions

**Alternative**: Direct communication with Maturion/Johan
- Use for high-priority or sensitive escalations

---

## Escalation Templates

### Template 1: Protocol Violation

```markdown
## [ESCALATION] Protocol Violation: Missing PREHANDOVER_PROOF

**Category**: Protocol Violation (Immediate)

**Violation Details**:
- **PR Number**: #XXX
- **Repository**: <repo-name>
- **Agent/Actor**: <agent or human name>
- **Violation Type**: PR merged without required PREHANDOVER_PROOF

**Evidence**:
- PR URL: <url>
- Changes involved: [Workflows / Contracts / Configuration]
- PREHANDOVER_PROOF required: YES
- PREHANDOVER_PROOF present: NO
- PR merged: YES (timestamp)

**Impact**:
- CI failures discovered post-merge
- Governance enforcement weakened
- Precedent set for shortcuts

**Incident Recommendation**:
Create incident report: `governance/incidents/INCIDENT-<date>-<pr-number>-PREHANDOVER-VIOLATION.md`

**Requested Action**:
1. Review violation with agent/actor
2. Determine if governance defect (unclear requirements) or agent failure
3. Update agent contract or protocol if ambiguity found
4. Document in incident report for future learning

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 11.2

**Escalated By**: <name>  
**Escalation Date**: <YYYY-MM-DD>
```

---

### Template 2: Execution Blocker

```markdown
## [ESCALATION] Execution Blocker: Cannot Validate Gate Locally

**Category**: Execution Blocker (HALT)

**Blocker Details**:
- **Agent/Actor**: <name>
- **PR/Work**: <description>
- **Protocol Step**: Step 5 (Preflight Gate Validation)
- **Gate**: <gate name>

**Problem Statement**:
Unable to validate <gate name> locally due to <reason>.

**Attempted Solutions**:
1. <solution 1> - Result: <result>
2. <solution 2> - Result: <result>
3. <solution 3> - Result: <result>

**Evidence**:
\`\`\`
[Paste error messages, command output, or description]
\`\`\`

**Current Status**:
Work HALTED pending clarification.

**Questions**:
1. How should <gate name> be validated locally?
2. Is simulation acceptable if actual gate execution unavailable?
3. Are there alternative validation methods?

**Requested Action**:
Provide guidance on gate validation method or update protocol with clarification.

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 11.2

**Escalated By**: <name>  
**Escalation Date**: <YYYY-MM-DD>
```

---

### Template 3: Ambiguity Clarification

```markdown
## [ESCALATION] Clarification: PREHANDOVER_PROOF Required?

**Category**: Ambiguity (Clarification)

**Scenario**:
<Brief description of PR or change>

**Question**:
Is PREHANDOVER_PROOF required for this type of PR?

**Details**:
- **Changes**: <list of changes>
- **Files Modified**: <list of files>
- **Can Fail in CI**: UNKNOWN / YES / NO
- **Similar PRs**: <reference to similar PRs if available>

**Reasoning for Uncertainty**:
<Explain why requirement is unclear>

**Attempted Determination**:
- Checked `EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 2 (Scope): <finding>
- Checked `PREHANDOVER_PROOF_TEMPLATE.md` "When to Use": <finding>
- Conclusion: UNCERTAIN

**Requested Clarification**:
1. Is PREHANDOVER_PROOF required? YES / NO / RECOMMENDED
2. If YES, which sections are applicable?
3. If NO, should future similar PRs also skip?

**Preferred Action**:
Default to including PREHANDOVER_PROOF unless explicitly told not required.

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 2.3

**Escalated By**: <name>  
**Escalation Date**: <YYYY-MM-DD>
```

---

### Template 4: Repeated Pattern

```markdown
## [ESCALATION] Repeated Pattern: Incomplete PREHANDOVER_PROOF

**Category**: Protocol Violation (Pattern)

**Pattern Details**:
- **Agent/Repository**: <name>
- **Occurrences**: <count> in <timeframe>
- **Pattern**: <description of repeated issue>

**Evidence**:
1. PR #XXX - <issue>
2. PR #YYY - <issue>
3. PR #ZZZ - <issue>

**Impact**:
- Governance enforcement weakened by repeated violations
- Risk of normalizing incomplete handovers
- CI failures not prevented by preflight validation

**Root Cause Hypothesis**:
<Agent misunderstanding / Governance ambiguity / Tooling gap / etc.>

**Requested Action**:
1. Review pattern with agent
2. Determine if agent training needed
3. Determine if protocol clarification needed
4. Update agent contract or protocol as needed
5. Create incident report if systemic

**Recommendation**:
If governance defect, update protocol.
If agent issue, update agent contract with explicit obligation.

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 5.1

**Escalated By**: <name>  
**Escalation Date**: <YYYY-MM-DD>
```

---

## Response SLAs (Bootstrap Mode)

### Immediate Escalations (Protocol Violations)
- **Target Response**: Within 24 hours
- **Target Resolution**: Within 72 hours or incident report created

### HALT Escalations (Execution Blockers)
- **Target Response**: Within 4 hours (during business hours)
- **Target Resolution**: Clarification provided within 24 hours

### Clarification Escalations
- **Target Response**: Within 48 hours
- **Target Resolution**: Guidance or protocol update within 1 week

**Note**: SLAs are targets. Actual response depends on availability of Governance Administrator and Maturion.

---

## Escalation Handling Process

### Step 1: Triage

Governance Administrator reviews escalation and determines:
1. **Category confirmed**: Violation / Blocker / Ambiguity
2. **Severity**: CRITICAL / HIGH / MEDIUM / LOW
3. **Root cause hypothesis**: Agent issue / Governance defect / Tooling gap
4. **Immediate action required**: YES / NO

### Step 2: Investigation

Gather evidence:
- Review PR and related PRs
- Review agent contract
- Review canonical documents
- Review CI logs
- Identify pattern (isolated vs repeated)

### Step 3: Resolution

Determine action:
- **Agent issue**: Update agent contract, provide training/clarification
- **Governance defect**: Update protocol or template, clarify ambiguity
- **Tooling gap**: Provide workaround, create tooling backlog item
- **Incident pattern**: Create incident report

### Step 4: Communication

Respond to escalation with:
1. **Acknowledgment**: "Escalation received and triaged"
2. **Finding**: Root cause and resolution
3. **Action**: What was updated and why
4. **Guidance**: How to proceed with current work
5. **Prevention**: How to avoid in future

### Step 5: Closure

- Update escalation issue with resolution
- Link to updated documents or incident reports
- Close escalation issue
- Monitor for repeat pattern

---

## Violation Consequences

### For Agents

**First Violation** (unintentional):
- ✅ Clarification provided
- ✅ Agent contract updated if ambiguity found
- ✅ No penalty

**Repeated Violations** (pattern):
- ✅ Incident report created
- ✅ Agent contract explicitly updated with prohibition
- ✅ Review of agent's recent PRs for additional violations
- ✅ Escalation to Maturion if systemic

**Intentional Bypass** (deliberate):
- ✅ Immediate escalation to Maturion
- ✅ Agent contract review and potential revision
- ✅ Incident report with "governance bypass" classification

### For Reviewers

**First Approval Without PREHANDOVER_PROOF**:
- ✅ Clarification provided
- ✅ Review process guidance updated

**Repeated Approvals Without PREHANDOVER_PROOF**:
- ✅ Escalation to Maturion
- ✅ Review authority re-evaluated

---

## Governance Defect Process

If escalation reveals governance defect (ambiguity, contradiction, gap):

### Step 1: Acknowledge

```markdown
**Governance Defect Confirmed**

The escalation revealed a governance defect, not an agent failure.

**Defect Type**: <Ambiguity / Contradiction / Gap>
**Root Cause**: <description>
```

### Step 2: Document

Create or update:
- Incident report (if significant)
- Bootstrap execution learnings
- Protocol or template with clarification

### Step 3: Ripple

If defect affects other repositories:
- Create ripple signal
- Notify downstream repositories
- Update cross-repo protocol

### Step 4: Prevent

Add to:
- Agent onboarding materials
- Protocol FAQ section
- Reference implementation guide

---

## Examples of Resolved Escalations

### Example 1: Gate Validation Method Unclear

**Escalation**: "How do I validate FM Learning Promotion Gate locally?"

**Resolution**:
- Updated `PR_GATE_RELEASE_CHECKLIST_FM.md` with validation method
- Added to `EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md`
- Provided workaround: Manual checklist validation acceptable

**Closure**: Escalation resolved, protocol clarified.

---

### Example 2: PREHANDOVER_PROOF for Documentation PR

**Escalation**: "Is PREHANDOVER_PROOF required for markdown-only PR?"

**Resolution**:
- Confirmed: OPTIONAL for pure documentation changes
- Updated `EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 2.2 for clarity
- Provided guidance: "When uncertain, include it"

**Closure**: Escalation resolved, protocol clarified.

---

### Example 3: Repeated Incomplete PREHANDOVER_PROOF

**Escalation**: "Agent X has submitted 4 PRs with incomplete PREHANDOVER_PROOF"

**Investigation**:
- Reviewed all 4 PRs
- Pattern: Missing exit codes and gate enumeration
- Root cause: Agent contract lacked explicit obligation

**Resolution**:
- Updated agent contract with explicit PREHANDOVER_PROOF obligation
- Provided training to agent
- Created incident report for pattern tracking

**Closure**: Agent contract updated, pattern documented.

---

## Related Documents

- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` - Full protocol
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` - Template
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` - FM requirements
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` - Builder requirements
- `governance/canon/AGENT_RECRUITMENT.md` - Agent recruitment and escalation
- `governance/incidents/**` - Historical incident reports

---

**Status**: Active Escalation Protocol  
**Authority**: EXECUTION_BOOTSTRAP_PROTOCOL.md  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-11

---

*End of Execution Bootstrap Protocol Escalation Instructions*
