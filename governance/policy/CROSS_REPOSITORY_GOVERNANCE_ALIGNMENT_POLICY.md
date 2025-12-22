# CROSS-REPOSITORY GOVERNANCE ALIGNMENT POLICY

## Status
Canonical Governance Policy  
Version: v1  
Authority: Johan Ras  
Applies To: ALL agents operating across multiple repositories  
Precedence: Implements AGENT_NON_STALLING_AND_ESCALATION_POLICY.md

---

## 1. Purpose

This policy establishes the **canonical model** for how agents propagate governance
decisions, behavioral requirements, and enforcement standards across multiple repositories
in the Maturion ecosystem.

Governance defined in the governance repository must **cascade** to operational repositories
(FM, builders, application repos) to ensure consistency.

This policy was created through a training scenario in PR #683 to codify:
- Which agents may attempt cross-repo changes
- How to handle permission/scope limitations
- When and how to escalate
- How to document learning from attempts

---

## 2. Core Principle

**Governance coherence requires cross-repository alignment.**

When governance canon is established or updated in the governance repository,
it MUST be propagated to relevant operational repositories where agents execute work.

**Silent divergence is prohibited.**

---

## 3. Authorized Cross-Repository Agents

The following agents are **authorized to attempt** cross-repository governance propagation:

### 3.1 Governance Administrator
- **Primary repository**: `maturion-foreman-governance`
- **May attempt to propagate to**: Any Maturion repository with agent contracts
- **Authority**: Propose changes only; requires owner authorization for execution
- **Constraint**: Cannot merge autonomously in any repository

### 3.2 Foreman (Future)
- **Primary repository**: FM repository
- **May attempt to propagate to**: Builder repositories
- **Authority**: To be defined in future policy

### 3.3 Escalation Requirement
All cross-repository attempts that encounter:
- Permission limitations
- Scope restrictions
- Contract conflicts
- Missing access

MUST escalate to Johan with:
- **Target repositories** identified
- **Proposed changes** (file paths and content summary)
- **Blocking conditions** (permissions, scope, contracts)
- **Requested authorization** (specific scope expansion or temporary override)

---

## 4. Cross-Repository Propagation Model

### 4.1 Governance Cascade Flow

```
Governance Repository (Canon)
    ↓
    ├─→ FM Repository (Foreman + FM Agent Instructions)
    │     ↓
    │     └─→ Builder Repositories (Builder Agent Instructions)
    │
    └─→ Application Repositories (Application-Specific Agents)
```

### 4.2 What Must Propagate

When governance canon is added or updated, the following MUST cascade:

1. **Agent Behavioral Requirements**
   - PR gate failure handling procedures
   - Non-stalling and escalation rules
   - Incident registration requirements
   - Scope declaration requirements

2. **Enforcement Standards**
   - Gate compliance rules
   - Quality thresholds
   - Evidence requirements

3. **Agent Contracts**
   - Behavioral constraints
   - Mandatory procedures
   - Prohibited actions

### 4.3 What Does NOT Propagate

The following remain repository-specific:
- Domain-specific enforcement logic
- Application-specific gates
- Repository-specific workflows
- Build/test configurations

---

## 5. Propagation Procedure (5-Step Model)

### Step 1: Identify Target Repositories
- List all repositories with agents affected by the governance change
- Identify specific agent contract files that need updates
- Example: `.github/agents/*.md` or `governance/agents/*.md`

### Step 2: Attempt Access Assessment
- Check if agent has permission to clone/read target repository
- Check if agent contract allows cross-repo operations
- Document any permission or scope limitations

### Step 3: Prepare Propagation Artifacts
- Draft updated agent contract language
- Prepare governance reference additions
- Document exact file paths and changes

### Step 4: Execute or Escalate

**If authorized and unblocked:**
- Open PR in target repository
- Reference source governance change
- Link to canonical policy

**If blocked (expected for most agents):**
- ESCALATE to Johan with:
  - Target repositories list
  - Proposed changes (file-by-file)
  - Blocking condition (permission, scope, contract)
  - Requested authorization scope
  - Risk assessment

### Step 5: Record Learning
- Document what was attempted
- Document what was blocked
- Document escalation outcome
- Update this policy with learning

---

## 6. Training Scenario: PR #683 Cross-Repo Attempt

### 6.1 Context
PR #683 established:
- Agent non-stalling policy
- PR gate failure handling protocol
- Mandatory escalation requirements

These **must propagate** to:
- FM repository (Foreman agent instructions)
- Builder repositories (Builder agent instructions)

### 6.2 Attempt: Governance Administrator Cross-Repo Access

**Target Repositories:**
1. `MaturionISMS/maturion-foreman` (FM repository)
2. Builder repositories (specific names to be determined)

**Proposed Changes:**
1. Update `.github/agents/foreman.md` (if exists)
2. Add reference to `AGENT_NON_STALLING_AND_ESCALATION_POLICY.md`
3. Add reference to `PR_GATE_FAILURE_HANDLING_PROTOCOL.md`
4. Add constraint: "A task is NOT complete while any applicable PR gate is RED"

**Expected Blocker:**
Governance Administrator contract states:
- "Scope is restricted to the governance repository only"
- "Must not modify application/runtime code or non-governance repositories"

**Escalation Trigger:**
Agent cannot access or modify target repositories due to contract constraints.

### 6.3 Escalation Format

```
ESCALATION: Cross-Repository Governance Propagation

Context:
PR #683 established mandatory PR gate failure handling governance.
This governance must cascade to FM and builder repositories.

Problem:
Governance Administrator is restricted to governance repository only.
Cannot access or modify:
- MaturionISMS/maturion-foreman
- Builder repositories

Proposed Solution:
1. Authorize Governance Administrator to:
   - Clone target repositories (read-only)
   - Open PRs in target repositories
   - Propose agent contract updates only
   
2. OR: Authorize Johan to execute propagation directly

3. OR: Delegate to a cross-repository agent (if exists)

Target Changes:
- Repository: MaturionISMS/maturion-foreman
  - File: .github/agents/foreman.md (or equivalent)
  - Change: Add references to PR_GATE_FAILURE_HANDLING_PROTOCOL.md
  - Change: Add constraint about PR gate completion requirements

- Repository: Builder repos (names TBD)
  - Similar changes to builder agent contracts

Scope & Risk:
- Scope: Agent contract language only (behavioral)
- Risk: Minimal - governance alignment, no operational logic change
- Reversible: Yes, via PR revert

Requested Authorization:
Temporary scope expansion for Governance Administrator to:
- Read target repositories
- Open governance-alignment PRs in target repositories
- Propose agent contract changes only
- No merge authority in target repositories
```

---

## 7. Prohibited Behaviors

Agents MUST NOT:
- Attempt unauthorized repository access
- Silently skip cross-repo propagation
- Assume "someone else will handle it"
- Make cross-repo changes without escalation when blocked
- Modify operational code under guise of "governance alignment"
- Expand scope beyond agent contracts and governance references

---

## 8. Success Criteria

Cross-repository governance alignment is successful when:

1. ✅ Governance changes are identified for propagation
2. ✅ Target repositories and files are specified
3. ✅ Access/permission assessment is completed
4. ✅ Either:
   - Changes are proposed in target repos (if authorized), OR
   - Escalation is submitted with clear problem + solution
5. ✅ Learning is documented in governance canon
6. ✅ Agent contracts are updated with cross-repo model

**Silent abandonment is failure.**

---

## 9. Learning and Evolution

This policy evolves through training scenarios:

**PR #683 Learning:**
- Governance Administrator cannot access other repositories
- Cross-repo propagation requires explicit authorization
- Escalation model works: attempt → block → escalate → authorize → execute
- Process itself is now codified

**Future Learning:**
- Document successful cross-repo propagations
- Document escalation response times
- Document authorization patterns
- Update policy with new patterns

---

## 10. Relationship to Other Policies

This policy implements:
- `AGENT_NON_STALLING_AND_ESCALATION_POLICY.md` (cross-repo context)

This policy is subordinate to:
- `GOVERNANCE_PURPOSE_AND_SCOPE.md`
- Agent contract constraints

This policy supports:
- `PR_GATE_FAILURE_HANDLING_PROTOCOL.md` (propagation target)

---

## 11. Mandatory Visibility Requirement (FM Office)

**REQUIRED GOVERNANCE OUTCOME**

All cross-repository governance or policy adjustments initiated by any agent
MUST trigger visibility to Johan via the Foreman Office.

### 11.1 Scope of Visibility Requirement

This requirement applies to:
- Any cross-repository governance propagation attempt
- Any cross-repository policy write action
- Any authorized override enabling cross-repository action
- Any governance alignment PR opened in non-governance repositories

### 11.2 Required Visibility Outcomes

When ANY of the above actions occur, the following outcomes are REQUIRED:

1. **Dashboard Notification**
   - Event MUST appear in Johan's FM Office dashboard
   - Notification MUST be persistent (not dismissible until reviewed)
   - Notification MUST include: agent, target repository, action type, timestamp

2. **Audible Alert**
   - FM Office MUST emit audible notification
   - Alert distinguishes cross-repo actions from routine events
   - Alert persists until acknowledged

3. **Persistent Event Record**
   - Event MUST be recorded in FM event log
   - Record MUST be immutable and auditable
   - Record MUST include: full context, authorization reference, outcome

### 11.3 Implementation Status Declaration

**This capability is REQUIRED but may be non-functional initially.**

- Requirement exists immediately upon policy adoption
- Lack of FM Office dashboard implementation does NOT waive the requirement
- Agents MUST comply with interim obligations (Section 11.4)
- Implementation timeline is separate from requirement establishment

**Governance supremacy:** This requirement is binding even when infrastructure does not yet support it.

### 11.4 Agent Obligations (Interim and Ongoing)

Until FM Office dashboard visibility is fully implemented, agents MUST:

1. **Record Cross-Repo Events as Governance Incidents**
   - Create incident record in `governance/incidents/` directory
   - Include all details required for future dashboard integration
   - Use standardized incident format for cross-repo actions

2. **Mark Events as "FM_VISIBILITY_PENDING"**
   - Add explicit marker: `FM_VISIBILITY_STATUS: PENDING`
   - Include timestamp when FM visibility was attempted
   - Update marker when FM Office integration is live

3. **Escalate to Johan Directly**
   - In absence of dashboard, escalate via GitHub comment/notification
   - Provide same information that would appear on dashboard
   - Do NOT proceed silently even if FM Office is unavailable

4. **Do NOT Assume Visibility**
   - Never assume "Johan will see it eventually"
   - Explicit notification required for every cross-repo action
   - Silent execution is prohibited regardless of infrastructure state

### 11.5 Prohibited Silent Actions

**No agent may perform cross-repository governance actions silently.**

Even with proper authorization, an agent MUST NOT:
- Execute cross-repo propagation without triggering FM Office visibility
- Skip incident recording because "it's just governance alignment"
- Assume dashboard notification will happen automatically
- Proceed when FM visibility cannot be confirmed

**Violation constitutes governance breach.**

### 11.6 Future-Proofing for Automated Enforcement

When FM Office dashboard is implemented, it MUST:

1. **Automatically Consume Incident Records**
   - Scan `governance/incidents/` for `FM_VISIBILITY_PENDING` events
   - Import historical events into dashboard
   - Update visibility status markers

2. **Enforce Pre-Execution Visibility**
   - Block cross-repo actions until FM notification confirmed
   - Require dashboard acknowledgment before proceeding
   - Prevent silent execution via technical controls

3. **Provide Audit Trail**
   - Complete history of cross-repo governance actions
   - Filterable by agent, repository, time period
   - Exportable for compliance review

### 11.7 Incident Record Template

Required fields for cross-repo governance incidents:

```yaml
incident_type: cross_repository_governance_action
fm_visibility_status: PENDING  # or CONFIRMED when dashboard live
timestamp_utc: YYYY-MM-DDTHH:MM:SSZ
agent_id: governance-administrator
action_type: governance_propagation | policy_write | override_authorization
target_repositories:
  - repository: org/repo-name
    files_affected: [list]
    action: PR_opened | change_proposed | escalated
authorization_reference: comment_id or document path
context: Brief description of what governance is being aligned
outcome: success | blocked | escalated
johan_notification_method: github_comment | dashboard | email | none
dashboard_integration_ready: false  # true when FM Office live
```

### 11.8 Escalation When FM Office Unavailable

If FM Office visibility cannot be achieved:

1. Create incident record with `FM_VISIBILITY_STATUS: PENDING`
2. Escalate directly to Johan via GitHub comment
3. Include all information that would appear on dashboard
4. Do NOT proceed until visibility confirmed by owner response

---

## 12. Enforcement

### 12.1 Governance Administrator
- MUST attempt propagation when governance changes
- MUST escalate when blocked
- MUST document attempts and outcomes
- **MUST trigger FM Office visibility for all cross-repo actions**
- **MUST create incident records with FM_VISIBILITY_PENDING marker**

### 12.2 Foreman (Future)
- MUST propagate FM governance to builder repos
- MUST escalate when blocked
- MUST maintain coherence
- **MUST ensure FM Office dashboard displays cross-repo actions**

### 12.3 Builders
- MUST comply with propagated governance
- MUST escalate conflicts or ambiguities
- MUST NOT operate under outdated governance
- **MUST NOT perform cross-repo actions silently**

---

## 13. Metrics

**Cross-Repository Propagation Metrics:**
- Propagation attempts: [count]
- Successful propagations: [count]
- Escalations required: [count]
- Average escalation resolution time: [duration]
- Repositories aligned: [count]
- Repositories with governance drift: [count]
- **FM visibility events triggered: [count]**
- **FM visibility events pending: [count]**

These metrics inform governance automation maturity.

---

## 14. Infrastructure Prerequisites

**Learning from PR #683 Training Exercise**

Cross-repository operations require infrastructure support beyond policy authorization.

### 13.1 Required Infrastructure

For an agent to execute cross-repository governance propagation, the following infrastructure must be in place:

1. **GitHub Repository Access**
   - Personal Access Token (PAT), OAuth token, or SSH keys
   - Read access to target repositories minimum
   - PR creation permissions for target repositories

2. **Network Access**
   - Ability to reach GitHub.com or GitHub Enterprise instances
   - No firewall blocks on git protocols

3. **Execution Environment Support**
   - Credentials securely available in agent execution context
   - Git client installed and configured

### 13.2 Authorization vs. Capability

**Critical Distinction:**

- **Authorization (Governance Layer):** Policy-level permission from owner to perform cross-repo operations
- **Capability (Infrastructure Layer):** Technical ability to access and modify target repositories

**Both are required.** Authorization without capability results in incomplete implementation.

**Example from PR #683:**
- Authorization: GRANTED by Johan (Comment 3679084028)
- Capability: MISSING (no GitHub credentials in execution environment)
- Outcome: Training completed via simulation, infrastructure gap documented

### 13.3 Infrastructure Provisioning

Before authorizing cross-repository operations, ensure:

1. **Credential Provisioning**
   - Create GitHub PAT with appropriate scopes
   - Configure token with repository-level restrictions
   - Set token expiration for time-bound operations
   - Provide token to agent execution environment securely

2. **Scope Limitation**
   - Grant minimum required permissions (read + PR creation)
   - Restrict to specific target repositories only
   - No merge/admin permissions unless explicitly authorized
   - Use repository-specific tokens when possible

3. **Security Controls**
   - Token should expire after operation completes
   - Token should be revoked immediately if misused
   - Audit all operations performed with token
   - Token should not be logged or persisted

### 13.4 Escalation When Infrastructure Missing

If an agent is authorized but infrastructurally blocked:

1. **Document the infrastructure gap** with specifics:
   - What infrastructure is missing
   - What was attempted
   - What error occurred

2. **Propose infrastructure solutions** (multiple options):
   - Token provisioning with scope definition
   - Manual content provision by owner
   - Simulation-based completion

3. **Complete objectives via simulation** when appropriate:
   - Document proposed changes
   - Record learning outcomes
   - Update governance with prerequisites

4. **Do NOT:**
   - Wait silently
   - Assume infrastructure will appear
   - Attempt unauthorized credential acquisition
   - Skip documentation

**Training mode:** Infrastructure gaps during training should be documented as learning, not failures.

### 13.5 Future Infrastructure Automation

When cross-repository governance propagation becomes routine, consider:

1. **Standardized Token Provisioning**
   - Pre-configured tokens for common propagation scenarios
   - Automated token lifecycle management
   - Token scope templates by operation type

2. **Infrastructure Readiness Checks**
   - Pre-flight checks before attempting propagation
   - Clear error messages when infrastructure missing
   - Guided setup instructions

3. **Multi-Repository Orchestration**
   - Batch propagation support
   - Dependency-aware propagation order
   - Rollback capabilities

---

End of CROSS-REPOSITORY GOVERNANCE ALIGNMENT POLICY
