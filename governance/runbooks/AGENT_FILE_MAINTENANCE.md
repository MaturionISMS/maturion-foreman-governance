# .agent File Maintenance Protocol

## Status
**Type**: Governance Runbook — Maintenance Protocol  
**Authority**: Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-12  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Define maintenance protocol for repository `.agent` files

---

## 1. Purpose

This runbook defines the **ongoing maintenance protocol** for repository `.agent` files, ensuring:
- Files remain synchronized with canonical governance
- Changes are made with appropriate authority
- Ripple awareness obligations are met
- Validation occurs before and after changes

**Use this runbook**:
- When updating `.agent` files
- During governance ripples
- When agent roster changes
- During repository type changes
- When governance version updates

**Authority**: This protocol is mandatory for all `.agent` file modifications.

---

## 2. Scope

This maintenance protocol applies to:
- Repository-level `.agent` file at repository root
- All modifications to `.agent` files (content, bindings, scope, etc.)
- Governance version synchronization
- Agent roster updates

This protocol does NOT apply to:
- Individual agent contracts in `.github/agents/` (see agent contract migration guide)
- Application configuration files
- Build or deployment configuration

---

## 3. Maintenance Authority Matrix

### 3.1 Who Can Modify `.agent` Files

| Authority Level | Repositories | Scope of Changes | Approval Required |
|----------------|--------------|------------------|-------------------|
| **Maturion** | ALL | Any change, including constitutional fields | Self-authorizing |
| **Governance Administrator** | Governance repos only | Canonical references, bindings, agent roster | Maturion for constitutional changes |
| **Foreman (FM)** | Application repos (where FM is agent) | Bindings, agent roster (not scope or constraints) | Maturion for scope/constraint changes |
| **Governance Liaison** | Assigned repos | Governance version updates, binding additions | FM or Maturion |
| **Individual Agents** | NONE | NO direct modification authority | MUST escalate |

### 3.2 Authority Escalation

**Escalation Required For**:
- Changes to `scope.restricted_paths` or `scope.escalation_required_paths`
- Changes to `constraints` section
- Changes to `enforcement` section
- Changes to `governance.canon` (governance source)
- Addition or removal of agents in roster
- Any change not explicitly within agent's authority

**Escalation Target**:
- Application repos: Escalate to FM
- Governance repos: Escalate to Governance Administrator
- Constitutional changes: Escalate to Maturion

### 3.3 Prohibited Actions

ALL agents MUST NOT:
- Modify their own authority or scope in `.agent` file
- Remove themselves from restricted paths
- Weaken constraints or enforcement rules
- Change governance source without authorization
- Bypass validation before committing changes

**Violation**: Any prohibited action invalidates the agent's legitimacy and requires immediate rollback.

---

## 4. Update Triggers

### 4.1 Mandatory Update Triggers

`.agent` file MUST be updated when:

#### Trigger 1: Governance Ripple Received

**Condition**: Governance ripple signal received from canonical governance  
**Required Update**: Update bindings, canonical reference, or other affected fields per ripple signal  
**Authority**: Governance Liaison or FM  
**Validation**: Full validation (Levels 1-4) required

**Procedure**:
1. Read ripple signal documentation
2. Identify changes required to `.agent` file
3. Update fields per ripple guidance
4. Validate `.agent` file (all levels)
5. Update `governance/alignment/GOVERNANCE_ALIGNMENT.md`
6. Commit and push changes
7. Document ripple response in evidence

#### Trigger 2: Agent Roster Change

**Condition**: Agent added, removed, or contract changed  
**Required Update**: Update `agents` array or `agent` section  
**Authority**: FM (for application repos), Governance Administrator (for governance repos)  
**Validation**: Schema compliance (Level 2) and semantic validation (Level 3) required

**Procedure**:
1. Verify agent recruitment authorization (see AGENT_RECRUITMENT.md)
2. Add/remove/update agent entry in `.agent` file
3. Verify agent contract exists at specified path
4. Validate `.agent` file (Levels 2-3 minimum)
5. Update initialization or commissioning evidence
6. Commit and push changes

#### Trigger 3: Governance Version Update

**Condition**: Canonical governance reference updated (branch, tag, or commit)  
**Required Update**: Update `governance.canon.reference` and potentially bindings  
**Authority**: Governance Liaison or Governance Administrator  
**Validation**: Semantic validation (Level 3) required

**Procedure**:
1. Verify new governance version is stable and released
2. Review governance changelog for breaking changes
3. Update `governance.canon.reference` in `.agent` file
4. Review and update bindings if canonical documents moved/renamed
5. Validate `.agent` file (Level 3 minimum)
6. Update `governance/alignment/GOVERNANCE_ALIGNMENT.md` with new version
7. Commit and push changes
8. Document version update in alignment history

#### Trigger 4: Mandatory Binding Addition

**Condition**: New canonical document becomes mandatory for repository type  
**Required Update**: Add new binding to `governance.bindings` array  
**Authority**: Governance Liaison or FM  
**Validation**: Semantic validation (Level 3) required

**Procedure**:
1. Verify binding requirement from AGENT_FILE_BINDING_REQUIREMENTS.md
2. Add binding to `governance.bindings` array with correct `id`, `path`, `role`
3. Verify binding path exists in canonical governance repository
4. Validate `.agent` file (Level 3 minimum)
5. Commit and push changes
6. Document binding addition rationale

#### Trigger 5: Repository Type Change

**Condition**: Repository changes from library → application, or governance → application, etc.  
**Required Update**: Update `scope`, `capabilities`, `bindings`, potentially `agents` roster  
**Authority**: Maturion (constitutional change)  
**Validation**: Full validation (Levels 1-4) required

**Procedure**:
1. Obtain Maturion authorization for type change
2. Review AGENT_FILE_BINDING_REQUIREMENTS.md for new type's requirements
3. Update all affected sections (scope, capabilities, bindings, roster)
4. Validate `.agent` file (all levels)
5. Update repository documentation and commissioning evidence
6. Commit and push changes
7. Document type change and rationale

### 4.2 Optional Update Triggers

`.agent` file SHOULD be updated when:

#### Trigger 6: Optional Binding Becomes Relevant

**Condition**: Repository adopts new capability making optional binding relevant  
**Example**: Repository implements architecture docs → add `architecture-completeness` binding  
**Authority**: FM or Governance Liaison  
**Validation**: Semantic validation (Level 3) recommended

#### Trigger 7: Scope Refinement

**Condition**: Agent scope needs clarification or refinement (not expansion)  
**Example**: Add specific subdirectories to `allowed_paths` for clarity  
**Authority**: FM (with Maturion approval for expansion)  
**Validation**: Schema compliance (Level 2) and semantic validation (Level 3) required

#### Trigger 8: Documentation Enhancement

**Condition**: Markdown content after YAML front matter needs improvement  
**Authority**: Any agent (does not change YAML front matter)  
**Validation**: Governance alignment check (Level 4) to ensure no duplication

---

## 5. Maintenance Procedure

### Step 1: Pre-Change Validation

**Before making any changes**:

1. ✅ **Run current validation**: Execute AGENT_FILE_VALIDATION.md Levels 1-4
2. ✅ **Document current state**: Capture current `.agent` file content (git diff baseline)
3. ✅ **Verify authority**: Confirm you have authority for planned change (see Section 3)
4. ✅ **Review ripple obligations**: Check if change triggers ripple to other repos

**Outcome**: Baseline validation and authority verification complete

---

### Step 2: Make Changes

**During modification**:

1. ✅ **Edit YAML front matter**: Make required changes to `.agent` file
2. ✅ **Follow schema**: Ensure all changes conform to AGENT_FILE_SCHEMA.md
3. ✅ **Maintain required values**: Do not weaken mandatory constraints
4. ✅ **Update bindings carefully**: Add/remove bindings per AGENT_FILE_BINDING_REQUIREMENTS.md
5. ✅ **Document changes**: Add comments in commit message explaining rationale

**Outcome**: Changes applied, schema conformance maintained

---

### Step 3: Post-Change Validation

**After making changes**:

1. ✅ **Run validation**: Execute AGENT_FILE_VALIDATION.md appropriate levels
   - Syntax changes: Levels 1-2
   - Binding changes: Levels 1-3
   - Major changes: All levels 1-4
2. ✅ **Fix validation errors**: Remediate any issues found
3. ✅ **Verify no regressions**: Compare with baseline validation (Step 1)
4. ✅ **Check for unintended changes**: Review git diff

**Outcome**: Validation passes, no regressions

---

### Step 4: Ripple Awareness

**Before committing changes**:

1. ✅ **Identify downstream impacts**: Check if change affects:
   - Other repositories (cross-references)
   - Agent contracts in `.github/agents/`
   - Governance alignment documents
   - CI workflows or branch protection
2. ✅ **Prepare ripple notifications**: Document required updates to downstream artifacts
3. ✅ **Create ripple signal** (if needed): Use RIPPLE_SIGNAL.template.md
4. ✅ **Update affected artifacts**: Make necessary changes to related files

**Outcome**: Ripple obligations identified and addressed

---

### Step 5: Commit and Document

**When committing changes**:

1. ✅ **Stage changes**: `git add .agent`
2. ✅ **Write descriptive commit message**:
   ```
   Update .agent file: [brief description]
   
   Trigger: [update trigger from Section 4]
   Authority: [who authorized change]
   Validation: [validation levels run and passed]
   Ripple: [downstream impacts, if any]
   
   Rationale: [why change was necessary]
   ```
3. ✅ **Commit**: `git commit -m "..."`
4. ✅ **Update governance alignment**: Update `governance/alignment/GOVERNANCE_ALIGNMENT.md` if canonical reference changed
5. ✅ **Push changes**: `git push`

**Outcome**: Changes committed with full traceability

---

### Step 6: Post-Commit Verification

**After pushing changes**:

1. ✅ **Verify CI passes**: Check that CI workflows execute successfully
2. ✅ **Verify gates pass**: Ensure PR gates (if applicable) validate correctly
3. ✅ **Monitor for issues**: Watch for agent failures or validation errors
4. ✅ **Document completion**: Update initialization or commissioning evidence

**Outcome**: Changes deployed successfully, no failures

---

## 6. Ripple Awareness Obligations

### 6.1 When `.agent` Changes Ripple

Changes to `.agent` file may trigger ripples to:

**Internal Ripples (Same Repository)**:
- Agent contracts in `.github/agents/` (scope or binding changes)
- CI workflows in `.github/workflows/` (scope or validation changes)
- Governance alignment documents (version or binding changes)
- Evidence documents (commissioning, initialization)

**External Ripples (Other Repositories)**:
- Repositories with `cross_references` pointing to this repo
- Governance repository (if this is application repo with learnings)
- Application repositories (if this is governance repo with canon updates)

### 6.2 Ripple Signal Creation

If change affects other repositories, create ripple signal:

**Template**: `governance/templates/RIPPLE_SIGNAL.template.md`

**Required Fields**:
- **Change Summary**: What changed in `.agent` file
- **Impact Analysis**: Which repos/agents affected
- **Action Required**: What downstream repos must do
- **Timeline**: When changes must be propagated
- **Authority**: Who authorized change

**Distribution**: Post ripple signal to affected repositories' governance liaison or FM.

### 6.3 Ripple Tracking

When responding to ripple or creating ripple:

1. Document in `governance/alignment/GOVERNANCE_ALIGNMENT.md`:
   ```markdown
   ## Ripple History
   
   | Date | Type | Change | Response |
   |------|------|--------|----------|
   | 2026-01-12 | Inbound | Binding addition: XYZ | Updated .agent file |
   | 2026-01-15 | Outbound | Scope change | Signaled to 3 downstream repos |
   ```
2. Update evidence documents with ripple response
3. Close ripple signal when all actions complete

---

## 7. Common Maintenance Scenarios

### Scenario 1: Add New Agent to Repository

**Trigger**: Agent Roster Change (Section 4.1.2)  
**Authority**: FM or Governance Administrator  
**Validation**: Levels 2-3

**Procedure**:
1. Verify agent recruitment authorized per AGENT_RECRUITMENT.md
2. Create agent contract in `.github/agents/[agent-name].md`
3. Update `.agent` file:
   ```yaml
   agents:
     # ... existing agents ...
     - id: new-agent-id
       class: builder
       contract: .github/agents/new-agent.md
       role: agent-role-description
   ```
4. Validate `.agent` file (Levels 2-3)
5. Commit changes with descriptive message
6. Update commissioning evidence

### Scenario 2: Update Governance Version

**Trigger**: Governance Version Update (Section 4.1.3)  
**Authority**: Governance Liaison  
**Validation**: Level 3

**Procedure**:
1. Review governance changelog for version `v2.4.0` (example)
2. Update `.agent` file:
   ```yaml
   governance:
     canon:
       repository: MaturionISMS/maturion-foreman-governance
       path: /governance/canon
       reference: v2.4.0  # Updated from v2.3.0
   ```
3. Review bindings - update paths if documents moved
4. Validate `.agent` file (Level 3)
5. Update `governance/alignment/GOVERNANCE_ALIGNMENT.md`:
   ```markdown
   ## Layer-Down History
   
   | Date | Governance Version | Changes Applied | Authority |
   |------|-------------------|-----------------|-----------|
   | 2026-01-12 | v2.4.0 | Version update, no binding changes | Governance Liaison |
   ```
6. Commit and push changes

### Scenario 3: Add Mandatory Binding (Governance Ripple)

**Trigger**: Mandatory Binding Addition (Section 4.1.4)  
**Authority**: Governance Liaison or FM  
**Validation**: Level 3

**Procedure**:
1. Receive ripple signal: "All application repos must add `new-protocol` binding"
2. Verify binding requirement in AGENT_FILE_BINDING_REQUIREMENTS.md
3. Update `.agent` file:
   ```yaml
   governance:
     bindings:
       # ... existing bindings ...
       - id: new-protocol
         path: governance/canon/NEW_PROTOCOL.md
         role: new-protocol-requirements
   ```
4. Validate binding path exists in canonical governance
5. Validate `.agent` file (Level 3)
6. Commit changes with ripple reference
7. Respond to ripple signal: "Binding added, validation passed"

### Scenario 4: Refine Scope (No Expansion)

**Trigger**: Scope Refinement (Section 4.2.2)  
**Authority**: FM (for clarification), Maturion (for expansion)  
**Validation**: Levels 2-3

**Procedure**:
1. Identify need for scope clarification (e.g., add subdirectory to allowed paths)
2. Verify change is clarification, NOT expansion of authority
3. Update `.agent` file:
   ```yaml
   scope:
     allowed_paths:
       - "src/**"
       - "src/components/ui/**"  # Added for clarity
   ```
4. Validate `.agent` file (Levels 2-3)
5. Commit changes with rationale
6. If expansion (not clarification), escalate to Maturion first

### Scenario 5: Remove Deprecated Binding

**Trigger**: Governance Ripple signaling binding deprecation  
**Authority**: Governance Liaison  
**Validation**: Level 3

**Procedure**:
1. Receive ripple signal: "Binding `old-protocol` deprecated, replace with `new-protocol-v2`"
2. Update `.agent` file:
   ```yaml
   governance:
     bindings:
       # Remove old binding
       # - id: old-protocol
       #   path: governance/canon/OLD_PROTOCOL.md
       #   role: old-protocol-requirements
       
       # Add new binding
       - id: new-protocol-v2
         path: governance/canon/NEW_PROTOCOL_V2.md
         role: new-protocol-requirements
   ```
3. Validate `.agent` file (Level 3)
4. Update documentation referencing old binding
5. Commit and respond to ripple signal

---

## 8. Validation Requirements

### 8.1 Pre-Commit Validation

**MANDATORY**: Always validate `.agent` file before committing

**Minimum Validation Levels**:
- **Syntax-only changes**: Level 1
- **Minor content changes**: Levels 1-2
- **Binding or scope changes**: Levels 1-3
- **Major changes (agent roster, governance version)**: All levels 1-4

**Automation**: CI workflows SHOULD reject commits with invalid `.agent` files

### 8.2 Post-Commit Validation

**RECOMMENDED**: Verify `.agent` file after merge

**Checks**:
- CI gates executed successfully
- No agent failures reported
- Downstream ripples acknowledged
- Evidence documents updated

### 8.3 Periodic Validation

**MANDATORY**: Validate `.agent` file during governance drift checks

**Frequency**: Quarterly or when governance ripple received  
**Levels**: 3-4 (focus on semantic and alignment)  
**Authority**: Governance Liaison or Governance Administrator

---

## 9. Emergency Procedures

### 9.1 Rollback Procedure

If `.agent` file change causes failures:

1. **HALT**: Stop all agent operations immediately
2. **ASSESS**: Determine scope of failure (agents affected, operations blocked)
3. **ROLLBACK**: Revert `.agent` file to last known good state:
   ```bash
   # First, find the last good commit (replace <previous-commit-sha> with actual SHA)
   git log -n 5 --oneline .agent
   
   # Example output:
   # abc1234 Update .agent file: add new binding (BROKEN)
   # def5678 Update .agent file: version update (LAST GOOD)
   # ghi9012 Initial .agent file creation
   
   # Revert to last good commit (e.g., def5678)
   git checkout def5678 .agent
   git commit -m "Emergency rollback: .agent file to def5678 (last known good state)"
   git push
   ```
4. **VERIFY**: Validate rolled-back `.agent` file
5. **INVESTIGATE**: Determine root cause of failure
6. **REMEDIATE**: Fix issue in separate change, validate thoroughly
7. **DOCUMENT**: Create incident report in `governance/incidents/`

### 9.2 Conflict Resolution

If `.agent` file has merge conflicts:

1. **DO NOT auto-resolve**: Manual resolution required
2. **UNDERSTAND both changes**: Read both conflicting versions
3. **RESOLVE conservatively**: Prefer more restrictive scope, more bindings
4. **VALIDATE after resolution**: Run full validation (Levels 1-4)
5. **DOCUMENT resolution**: Note which version's changes were kept/merged
6. **ESCALATE if uncertain**: Consult Governance Administrator or Maturion

### 9.3 Corruption Detection

If `.agent` file appears corrupted:

1. **VERIFY corruption**: Run syntax validation (Level 1)
2. **CHECK git history**: Determine when corruption occurred
3. **RESTORE from backup**: Use last known good commit
4. **RE-APPLY legitimate changes**: Apply changes from corrupted version if valid
5. **FULL VALIDATION**: Run all levels 1-4
6. **INCIDENT REPORT**: Document corruption and recovery

---

## 10. Maintenance Schedule

### 10.1 Routine Maintenance

| Frequency | Activity | Authority | Validation |
|-----------|----------|-----------|------------|
| **On every change** | Pre/post-commit validation | Change author | Levels per Section 8.1 |
| **Quarterly** | Governance drift check | Governance Liaison | Levels 3-4 |
| **On governance ripple** | Update per ripple signal | Governance Liaison or FM | Level 3 minimum |
| **Annually** | Full governance alignment review | Governance Administrator | All levels 1-4 |

### 10.2 Event-Driven Maintenance

| Event | Activity | Authority | Validation |
|-------|----------|-----------|------------|
| **Agent roster change** | Update agents section | FM or Gov Admin | Levels 2-3 |
| **Repository type change** | Full `.agent` rewrite | Maturion | All levels 1-4 |
| **Canonical document deprecation** | Remove/replace binding | Governance Liaison | Level 3 |
| **New mandatory binding** | Add binding | Governance Liaison or FM | Level 3 |
| **Governance version update** | Update canon reference | Governance Liaison | Level 3 |

---

## 11. Documentation Requirements

### 11.1 Change Documentation

Every `.agent` file change MUST be documented with:

1. **Commit Message**: Descriptive message per Section 5.5
2. **Governance Alignment Update**: If canonical reference or bindings changed
3. **Evidence Update**: If initialization or commissioning evidence affected
4. **Ripple Signal**: If change affects other repositories

### 11.2 Maintenance Log

Maintain maintenance log in `governance/alignment/GOVERNANCE_ALIGNMENT.md`:

```markdown
## .agent File Maintenance History

| Date | Change Type | Authority | Validation | Notes |
|------|------------|-----------|------------|-------|
| 2026-01-12 | Agent added | FM | Levels 2-3 PASS | Added ui-builder agent |
| 2026-01-15 | Version update | Gov Liaison | Level 3 PASS | Updated to governance v2.4.0 |
| 2026-01-20 | Binding added | Gov Liaison | Level 3 PASS | Added new-protocol binding per ripple |
```

---

## 12. Related Documents

| Document | Purpose |
|----------|---------|
| **governance/schemas/AGENT_FILE_SCHEMA.md** | Schema specification for `.agent` files |
| **governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md** | Mandatory and optional bindings |
| **governance/runbooks/AGENT_FILE_VALIDATION.md** | Validation procedure for `.agent` files |
| **governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md** | Layer-down procedure including `.agent` creation |
| **governance/canon/GOVERNANCE_RIPPLE_MODEL.md** | Ripple propagation protocol |
| **governance/canon/AGENT_RECRUITMENT.md** | Agent legitimacy and appointment |

---

## 13. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-12 | Initial maintenance protocol definition |

---

## 14. Authority and Precedence

**Authority**: This maintenance protocol is canonical and mandatory for all `.agent` file modifications.

**Precedence**:
- ALL `.agent` file changes MUST follow this protocol
- Validation is MANDATORY before committing changes
- Authority matrix (Section 3) MUST be respected
- Prohibited actions (Section 3.3) MUST NOT be performed

**Enforcement**:
- CI gates SHOULD reject changes without validation evidence
- Governance liaison MUST monitor `.agent` file changes
- Unauthorized changes MUST be rolled back immediately

**Violations**:
- Violating this protocol invalidates agent legitimacy
- Unauthorized changes require immediate rollback and incident report
- Repeated violations escalate to Maturion

---

**This is the single, authoritative maintenance protocol for repository `.agent` files.**

**Version**: 1.0.0  
**Last Updated**: 2026-01-12  
**Next Review**: 2026-07-12 (6 months)
