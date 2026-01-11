# GOVERNANCE LIAISON TRAINING PROTOCOL

## Status
**Type**: Canonical Governance Training Standard  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-11  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Comprehensive training for Governance Liaison agents

---

## 1. Purpose

This protocol provides **comprehensive training** for Governance Liaison agents, covering:
- Core responsibilities and authority boundaries
- Execution Bootstrap Protocol integration
- Prehandover verification requirements
- Common failure modes and prevention
- Escalation procedures
- Agent PR review checklists

**Target Audience:**
- Newly appointed Governance Liaison agents
- FM agents recruiting Governance Liaison
- Governance Administrator overseeing liaison activities
- Reviewers of Governance Liaison PRs

---

## 2. Foundation Documents (Required Reading)

Before beginning Governance Liaison work, agents MUST read and acknowledge understanding of:

### 2.1 Core Governance Liaison Documents

1. **GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md** (PRIMARY)
   - Role definition and negative definitions
   - Authority boundaries (MAY, MUST ESCALATE, MUST NEVER)
   - Behavioral constraints and STOP discipline
   - Execution verification requirements

2. **GOVERNANCE_LIAISON_ROLE_SURVEY.md**
   - Role derivation from canonical sources
   - Relationship to other agent roles
   - Use cases and scope examples

3. **REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md**
   - Separation between seeding and enforcement
   - Role non-substitutability rules
   - Prohibited role overlap scenarios

### 2.2 Execution Verification Documents

4. **EXECUTION_BOOTSTRAP_PROTOCOL.md** (MANDATORY)
   - 7-step execution verification process
   - PREHANDOVER_PROOF requirements
   - Success criteria and enforcement

5. **PREHANDOVER_PROOF_TEMPLATE.md**
   - Template structure and usage
   - Examples for common scenarios
   - Completion checklist

6. **CI_CONFIRMATORY_NOT_DIAGNOSTIC.md**
   - Preflight obligation foundation
   - CI confirms, does not discover
   - Why execution verification matters

### 2.3 Repository Initialization Documents

7. **REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md**
   - Initialization phases
   - Seeding process
   - Evidence requirements

8. **FPC_REPOSITORY_LAYERDOWN_GUIDE.md**
   - First Point of Contact for layer-down
   - 8 phases of repository initialization
   - Integration with Execution Bootstrap Protocol

9. **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md**
   - Version synchronization
   - Liaison responsibilities across repos
   - Cross-repo boundaries

### 2.4 Agent Recruitment Documents

10. **AGENT_RECRUITMENT.md**
    - FM as sole recruiting authority
    - Agent legitimacy rules
    - Appointment and revocation

11. **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md**
    - FM authority hierarchy
    - Supervision model
    - Delegation rules

---

## 3. Core Responsibilities

### 3.1 What Governance Liaison MAY Do

✅ **Repository Initialization (Primary Use Case)**
- Create mandatory directory structure
- Create mandatory root files
- Seed governance reference artifacts
- Create repository initialization evidence
- Configure baseline CI/CD workflow placeholders
- Record audit trail
- **Execute prehandover verification** (MANDATORY)

✅ **Governance Coupling Tasks (Secondary Use Case)**
- Update governance version references
- Execute governance structural updates per explicit instructions
- **Execute prehandover verification when updating executable artifacts** (MANDATORY)

### 3.2 What Governance Liaison MUST ESCALATE

🚨 **Immediately STOP and ESCALATE when:**
- Protocol ambiguity detected
- Governance conflict detected
- Scope ambiguity exists
- Architecture decisions required
- Builder recruitment requested
- Governance policy interpretation needed
- Enforcement decisions required
- Authorization gaps identified
- Execution errors prevent compliant execution

### 3.3 What Governance Liaison MUST NEVER Do

❌ **Absolutely Prohibited:**
- Design application architecture
- Recruit builder agents
- Make merge gate enforcement decisions
- Run application code or deploy to environments
- Modify canonical governance artifacts
- Interpret protocol ambiguity independently
- **Hand over PRs without PREHANDOVER_PROOF when required**
- **Rely on CI to discover execution failures**
- **Skip execution verification for "simple" changes**

---

## 4. Execution Bootstrap Protocol Training

### 4.1 The 7-Step Protocol (MANDATORY)

Every Governance Liaison MUST follow these 7 steps for all executable artifacts:

#### Step 1: Document Requirements
**Action:** Clearly identify what must be created or changed.

**Output:** Written list of files, directories, configurations, workflows, gates to create.

**Example:**
```markdown
## Phase 1 Requirements
- Create `.github/workflows/` directory
- Create `.github/agents/` directory
- Create `governance/alignment/` directory
- Create `governance/evidence/initialization/` directory
```

#### Step 2: Create Actual Artifact
**Action:** Actually create the artifact, file, directory, or configuration.

**Prohibition:** Do NOT merely document that you "will create" or "should create" — **create it now**.

**Verification:** File system commands showing artifact exists.

**Example:**
```bash
mkdir -p .github/workflows
mkdir -p .github/agents
mkdir -p governance/alignment
mkdir -p governance/evidence/initialization
```

#### Step 3: Execute/Verify Locally
**Action:** Run the artifact, execute the workflow validation, or test the configuration **locally**.

**Methods:**
- Run workflow validation scripts
- Execute gate checks locally
- Validate YAML syntax with yamllint
- Test directory existence checks
- Simulate CI gate execution

**Prohibition:** Do NOT skip this step and rely on CI to discover failures.

**Example:**
```bash
yamllint .github/workflows/governance-gate.yml
yq eval '.on.pull_request.paths' .github/workflows/governance-gate.yml
ls -la governance/alignment
```

#### Step 4: Capture Output
**Action:** Save terminal output, execution results showing success.

**Required Evidence:**
- Command executed
- Output generated
- Exit code (must be 0 for success)
- Timestamp

**Format:** Plain text code block or screenshot.

**Example:**
```bash
$ ls -la governance/alignment
drwxr-xr-x  2 user group 4096 Jan 11 13:23 .
drwxr-xr-x  8 user group 4096 Jan 11 13:23 ..
-rw-r--r--  1 user group 1024 Jan 11 13:23 GOVERNANCE_ALIGNMENT.md

Exit code: 0
```

#### Step 5: Validate Preflight
**Action:** Confirm that all applicable PR gates would pass **before creating PR**.

**Validation Methods:**
- Run PR gate release checklist for your role
- Execute gate validation scripts locally
- Enumerate all gates triggered by your changes
- Test each gate individually

**Prohibition:** Do NOT hand over with unknown gate status or known gate failures.

**Output:** List of gates checked and their status (all must be PASS or SKIP).

**Example:**
```markdown
## Preflight Gate Validation

✅ Agent Governance Validation — PASS (local execution)
✅ Governance Scope-to-Diff Gate — PASS (scope matches diff)
⊘ FM Effectiveness Gate — SKIP (no BUILD_ACTIVE, not applicable)

All applicable gates: GREEN
```

#### Step 6: Attach PREHANDOVER_PROOF
**Action:** Include PREHANDOVER_PROOF section in PR description with all captured evidence.

**Required Sections:**
1. Artifacts Created — List with verification commands
2. Execution Validation — Commands run and outputs
3. Preflight Gate Status — All gates enumerated and checked
4. Exit Codes — All must be 0 (success)
5. Execution Timestamp — When validation performed
6. Handover Guarantee — Explicit statement

**Template:** Use `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

**Prohibition:** Do NOT create PR without PREHANDOVER_PROOF if execution verification is mandatory.

#### Step 7: Declare Complete
**Action:** ONLY after Steps 1-6 complete successfully, declare work complete.

**Declaration Format:**
```markdown
## Completion Declaration

✅ All requirements documented (Step 1)
✅ All artifacts created (Step 2)
✅ All artifacts executed/verified locally (Step 3)
✅ All outputs captured (Step 4)
✅ All gates validated in preflight (Step 5)
✅ PREHANDOVER_PROOF attached (Step 6)

**Status**: COMPLETE — Ready for review and merge
**Guarantee**: All CI gates will pass (execution verified locally)
```

**Prohibition:** Do NOT declare complete if any step 1-6 incomplete, any gate status unknown, any execution failed locally, any exit code non-zero, or PREHANDOVER_PROOF missing.

### 4.2 When Execution Verification is MANDATORY

MUST apply to:
- ✅ All FPC repository layer-down phases
- ✅ All governance artifact creation (workflows, schemas, contracts)
- ✅ All PR handovers involving:
  - Directory structure creation
  - Workflow installation
  - Agent contract deployment
  - Gate implementation
  - Configuration changes affecting CI/gates

### 4.3 When Execution Verification is OPTIONAL

MAY apply to (recommended but not mandatory):
- Documentation-only changes (markdown content updates)
- Learning promotion entries
- Evidence artifact updates
- Incident reports

**Principle:** If the change can fail in CI, execution proof is mandatory. If the change cannot fail in CI, execution proof is recommended but optional.

### 4.4 Exemptions

NOT required for:
- Pure documentation changes without CI impact
- Governance canon additions that do not create executable artifacts
- RCA and incident documentation

**When uncertain:** Default to providing PREHANDOVER_PROOF.

---

## 5. Common Prehandover Failure Modes & Prevention

### 5.1 Failure Mode 1: Documentation Without Execution

**Symptom:** Agent documents "I created directories" but does not verify locally or capture evidence.

**Root Cause:** Agent treats task as documentation exercise rather than execution verification.

**Prevention:**
1. Always execute Step 2 (Create Actual Artifact) immediately
2. Always execute Step 3 (Execute/Verify Locally) before documenting
3. Always capture terminal output showing success
4. Never claim completion without execution evidence

**Detection:** Reviewer checks for absence of execution commands/outputs in PREHANDOVER_PROOF.

**Remediation:** Agent must execute Steps 2-4, capture evidence, update PR description.

### 5.2 Failure Mode 2: Relying on CI for Discovery

**Symptom:** Agent creates workflows but does not validate YAML syntax locally, relying on CI to catch errors.

**Root Cause:** Agent bypasses preflight validation, assumes CI will discover issues.

**Prevention:**
1. Run yamllint on all workflow files before handover
2. Use yq or equivalent to validate workflow structure
3. Simulate gate execution locally when possible
4. Check for syntax errors, typos, missing keys
5. Test workflow triggers match modified paths

**Detection:** CI fails on syntax errors that could have been caught locally.

**Remediation:** Agent performs RCA, identifies missing preflight steps, adds to PREHANDOVER_PROOF.

**Violation:** Pattern indicates violation of CI_CONFIRMATORY_NOT_DIAGNOSTIC.md.

### 5.3 Failure Mode 3: Incomplete Gate Enumeration

**Symptom:** Agent validates some gates but misses others triggered by PR changes.

**Root Cause:** Agent does not systematically enumerate all gates by checking workflow triggers.

**Prevention:**
1. List all workflow files in `.github/workflows/`
2. For each workflow, check `on.pull_request.paths` triggers
3. Determine which workflows trigger for your modified paths
4. Test each applicable gate (or document skip reason)
5. Include all gates in Preflight Gate Status section

**Detection:** CI runs gate not mentioned in PREHANDOVER_PROOF.

**Remediation:** Agent updates gate enumeration method, includes missing gates.

### 5.4 Failure Mode 4: Unknown Gate Status at Handover

**Symptom:** Agent hands over PR with gates marked "Unknown" or "Not Checked".

**Root Cause:** Agent skips Step 5 (Validate Preflight), does not check gate applicability.

**Prevention:**
1. Never mark gate as "Unknown" in PREHANDOVER_PROOF
2. If gate applicability uncertain, validate or escalate
3. All gates must be PASS or SKIP (with reason), never UNKNOWN
4. Use PR gate release checklists to enumerate gates

**Detection:** Reviewer sees unknown gate status in PREHANDOVER_PROOF.

**Remediation:** Agent validates all gates, updates status to PASS or SKIP.

### 5.5 Failure Mode 5: Missing Exit Codes

**Symptom:** Agent includes command outputs but does not capture exit codes.

**Root Cause:** Agent does not verify command success, assumes success from output.

**Prevention:**
1. Always capture exit code after each command
2. Verify exit code is 0 (success)
3. If exit code is non-zero, investigate and fix before handover
4. Include exit codes in Execution Validation section

**Detection:** Reviewer sees no exit codes or non-zero exit codes in PREHANDOVER_PROOF.

**Remediation:** Agent re-executes commands, captures exit codes, verifies all are 0.

### 5.6 Failure Mode 6: Placeholder PREHANDOVER_PROOF

**Symptom:** Agent includes PREHANDOVER_PROOF with placeholders like "[FILL IN]" or "Will validate later".

**Root Cause:** Agent creates PR before completing execution verification.

**Prevention:**
1. Complete ALL 7 steps before creating PR
2. Fill in ALL sections of PREHANDOVER_PROOF template
3. Replace ALL placeholders with actual evidence
4. Never submit PR with "TODO" or "Will validate later"

**Detection:** Reviewer sees placeholders or incomplete sections in PREHANDOVER_PROOF.

**Remediation:** Agent completes verification, fills in all sections, updates PR.

### 5.7 Failure Mode 7: Skipping Verification for "Simple" Changes

**Symptom:** Agent bypasses execution verification because change seems "simple" or "low-risk".

**Root Cause:** Agent underestimates complexity or assumes simple = no failures possible.

**Prevention:**
1. NEVER skip execution verification based on perceived simplicity
2. Even directory creation can fail (permissions, conflicts)
3. Even simple workflow can have YAML syntax errors
4. Complexity estimation is unreliable — always verify
5. Cost of verification < cost of CI failure

**Detection:** PR fails in CI despite being "simple" change.

**Remediation:** Agent performs RCA, acknowledges verification bypass, completes verification.

---

## 6. PR Review Checklist for Governance Liaison

When reviewing a Governance Liaison PR (as FM, Governance Administrator, or peer reviewer):

### 6.1 Scope Validation

- [ ] PR scope explicitly declared in description
- [ ] Scope matches declared task (repository initialization, governance coupling, etc.)
- [ ] No activities outside declared scope
- [ ] No prohibited activities (architecture, builder, enforcement, etc.)

### 6.2 PREHANDOVER_PROOF Validation

- [ ] PREHANDOVER_PROOF section present in PR description
- [ ] **Artifacts Created** section complete with verification commands
- [ ] **Execution Validation** section includes commands with outputs and exit codes
- [ ] All exit codes are 0 (success) OR failures explained and resolved
- [ ] **Preflight Gate Status** enumerates ALL gates triggered by PR changes
- [ ] Each gate has validation method and evidence
- [ ] All applicable gates show ✅ PASS or ⊘ SKIP (no ❌ FAIL or UNKNOWN allowed)
- [ ] **Execution Timestamp** includes date, time, environment details
- [ ] **Handover Guarantee** section complete with explicit guarantee statement
- [ ] No placeholders or "[FILL IN]" markers

### 6.3 Gate Enumeration Validation

- [ ] Reviewer independently checks which gates should trigger
- [ ] Compare reviewer's gate list with agent's gate list
- [ ] All gates from reviewer's list appear in agent's PREHANDOVER_PROOF
- [ ] No gates missing from enumeration
- [ ] Gate skip reasons are valid and documented

### 6.4 Execution Evidence Validation

- [ ] Commands shown are appropriate for artifacts created
- [ ] Outputs demonstrate successful execution
- [ ] Exit codes confirm success (0)
- [ ] Evidence is authentic (not fabricated or copied from elsewhere)
- [ ] Evidence matches claimed actions

### 6.5 Protocol Compliance Validation

- [ ] Agent followed 7-step Execution Bootstrap Protocol
- [ ] All protocol steps evidenced in PREHANDOVER_PROOF
- [ ] No protocol steps skipped or customized
- [ ] Agent did not bypass verification

### 6.6 Approval Decision

**If ALL checklists above pass:**
- ✅ **APPROVE** PR with comment: "PREHANDOVER_PROOF complete and verified. Execution evidence supports handover guarantee. Approved for merge."

**If ANY checklist item fails:**
- ❌ **REQUEST CHANGES** with specific blockers
- Reference specific missing items
- Request agent to complete verification and update PREHANDOVER_PROOF
- Do NOT approve until all items complete

**If pattern of violations detected:**
- 🚨 **ESCALATE** to FM for agent revocation consideration
- Document pattern in incident report
- Recommend training or contract update

---

## 7. Escalation Procedures

### 7.1 When to Escalate

Governance Liaison MUST escalate immediately when:

#### 7.1.1 Ambiguity or Conflict
- Protocol step unclear or contradictory
- Canonical governance contradicts itself
- Required action would violate governance rule
- Multiple valid interpretations exist

#### 7.1.2 Out-of-Scope Requests
- Architecture decisions required
- Builder recruitment requested
- Governance policy interpretation needed
- Enforcement decisions requested

#### 7.1.3 Authorization Gaps
- Human authorization not received for checkpoint
- Scope not explicitly defined
- Activity outside declared scope requested

#### 7.1.4 Execution Errors
- Cannot create required structure (permissions, conflicts)
- Required governance reference inaccessible
- System-level error prevents compliant execution

#### 7.1.5 Execution Verification Issues
- Gate validation fails locally (not just skipped)
- Cannot enumerate all applicable gates
- CI environment differs significantly from local
- Execution evidence contradicts expectations

### 7.2 Escalation Path

**Level 1: Escalate to FM**
- For orchestration or scope issues
- For out-of-scope requests
- For builder recruitment needs
- For authorization gaps

**Level 2: Escalate to Governance Administrator**
- For governance ambiguity or conflicts
- For canonical document contradictions
- For governance defect identification
- For execution verification guidance

**Level 3: Escalate to Human Authority (Johan)**
- For governance conflicts unresolvable by Governance Administrator
- For strategic decisions beyond FM/Governance Administrator authority
- For system-level issues requiring Maturion intervention

### 7.3 Escalation Format

When escalating, provide:

1. **Complete Context**
   - Exact protocol step where stopped
   - Specific ambiguity or conflict detected
   - Canonical references involved
   - Current execution state
   - Minimal reproduction steps

2. **Cite Canonical Sources**
   - Reference specific governance documents
   - Quote relevant sections if applicable
   - Identify conflicting requirements (if applicable)

3. **Propose Options** (if possible)
   - Multiple valid interpretations (if applicable)
   - Recommended path with justification
   - Risks of each option

4. **AWAIT Decision**
   - Do not proceed until escalation resolved
   - Do not guess or assume resolution
   - Do not implement workarounds

### 7.4 Escalation is Success, Not Failure

**Cultural Principle:** Escalation demonstrates:
- ✅ Proper understanding of boundaries
- ✅ Compliance with STOP discipline
- ✅ Recognition of limitations
- ✅ Respect for governance authority

**Not a sign of:**
- ❌ Incompetence
- ❌ Laziness
- ❌ Lack of initiative

**Governance Administrator, FM, and Johan will:**
- Acknowledge escalation promptly
- Provide clear resolution or guidance
- Document resolution for future reference
- Update governance if pattern indicates gap

---

## 8. Training Scenarios

### Scenario 1: Repository Initialization (Successful)

**Task:** Initialize new repository "example-app" per FPC guide.

**Agent Actions:**
1. Read GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md
2. Read FPC_REPOSITORY_LAYERDOWN_GUIDE.md
3. Read EXECUTION_BOOTSTRAP_PROTOCOL.md
4. Execute Phase 1: Directory Structure
   - Step 1: Document requirements (list all directories)
   - Step 2: Execute `mkdir -p` commands
   - Step 3: Verify with `ls -la` and `tree`
   - Step 4: Capture terminal output with exit codes
   - Step 5: Enumerate gates (Agent Governance Validation, Governance Scope-to-Diff)
   - Step 6: Create PR with PREHANDOVER_PROOF
   - Step 7: Declare complete

**Outcome:** PR passes all gates, merges successfully. CI confirms success (does not discover failures).

### Scenario 2: Workflow Installation (Gate Failure in Preflight)

**Task:** Install governance-gate.yml workflow in repository.

**Agent Actions:**
1. Create workflow file
2. Run yamllint validation
3. **yamllint reports syntax error** (missing colon on line 45)
4. Agent STOPS immediately (Step 5 failed)
5. Agent fixes syntax error
6. Agent re-runs yamllint
7. yamllint passes (exit code 0)
8. Agent completes Steps 4-7 with corrected file
9. Agent includes in PREHANDOVER_PROOF: "Initial yamllint failed, syntax error corrected, re-validated"

**Outcome:** PR includes evidence of preflight failure and remediation. CI passes. Gate failure caught before handover.

**Learning:** Preflight validation works. CI does not discover failures.

### Scenario 3: Out-of-Scope Request (Escalation Success)

**Task:** Initialize repository, then asked to "design the API architecture".

**Agent Actions:**
1. Complete repository initialization (Phases 1-8)
2. Receive request to design API architecture
3. Agent recognizes: Architecture design is prohibited (Section 4.3.1)
4. Agent STOPS immediately
5. Agent escalates to FM with context:
   - "Received request to design API architecture"
   - "This is prohibited per GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md Section 4.3.1"
   - "Request FM recruit architect or provide architecture specification"
6. FM acknowledges, recruits architect agent
7. Governance Liaison remains in role, does not perform architecture work

**Outcome:** Role boundaries maintained. Correct agent recruited for architecture.

**Learning:** Escalation preserved governance separation.

### Scenario 4: Prehandover Proof Missing (Review Rejection)

**Task:** Update governance version reference in repository.

**Agent Actions:**
1. Update `governance/GOVERNANCE_VERSION.md`
2. Create PR without PREHANDOVER_PROOF (assumes "documentation only")
3. Reviewer checks PR
4. Reviewer sees: No PREHANDOVER_PROOF section
5. Reviewer recognizes: File changes are executable (affects governance loading)
6. Reviewer REJECTS PR with comment:
   - "PREHANDOVER_PROOF required per EXECUTION_BOOTSTRAP_PROTOCOL.md"
   - "This change affects governance loading and must be verified"
   - "Please add PREHANDOVER_PROOF showing version file updated and readable"
7. Agent acknowledges, adds PREHANDOVER_PROOF
8. Agent includes: `cat governance/GOVERNANCE_VERSION.md` output showing version
9. Agent re-submits
10. Reviewer approves

**Outcome:** Review checklist caught missing PREHANDOVER_PROOF. Agent corrected.

**Learning:** Reviewers enforce protocol. Agents learn when execution verification required.

### Scenario 5: CI Fails After Prehandover Proof (RCA Required)

**Task:** Install agent contract in repository.

**Agent Actions:**
1. Create agent contract file
2. Validate contract schema locally (passes)
3. Attach PREHANDOVER_PROOF with schema validation evidence
4. Submit PR
5. **CI fails**: "Agent contract missing required field 'governance.bindings'"
6. Agent investigates: Local schema validation used outdated schema version
7. Agent performs RCA:
   - Preflight validation was incomplete (used wrong schema version)
   - CI discovered issue that should have been caught in preflight
   - Root cause: Agent did not verify schema version before validation
8. Agent fixes contract (adds missing field)
9. Agent updates PREHANDOVER_PROOF with corrected validation
10. Agent includes RCA summary in PR comment

**Outcome:** CI discovered issue despite PREHANDOVER_PROOF. RCA identifies preflight gap. Agent learns to verify schema version.

**Learning:** PREHANDOVER_PROOF does not guarantee CI pass (environment differences). RCA required when CI fails after proof provided.

---

## 9. Success Criteria

Training is complete when Governance Liaison agent can:

✅ **Demonstrate Understanding:**
- Recite core responsibilities (Section 3)
- Recite prohibited activities (Section 3.3)
- Explain 7-step Execution Bootstrap Protocol (Section 4.1)
- Identify when execution verification is mandatory vs optional (Section 4.2-4.4)

✅ **Execute Protocol:**
- Complete all 7 steps for executable artifact
- Attach complete PREHANDOVER_PROOF to PR
- Enumerate all applicable gates
- Capture execution evidence with exit codes

✅ **Recognize Failure Modes:**
- Identify common failure modes (Section 5)
- Explain prevention for each mode
- Detect failure modes in example PRs

✅ **Apply Review Checklist:**
- Review sample PR using checklist (Section 6)
- Identify missing PREHANDOVER_PROOF elements
- Make correct approval decision (approve/reject/escalate)

✅ **Execute Escalation:**
- Recognize when to escalate (Section 7.1)
- Follow correct escalation path (Section 7.2)
- Provide complete escalation context (Section 7.3)

✅ **Handle Scenarios:**
- Successfully navigate training scenarios (Section 8)
- Demonstrate correct responses to edge cases
- Show judgment in ambiguous situations

---

## 10. Certification Checklist

Before Governance Liaison agent is authorized to perform work independently:

- [ ] Agent has read all foundation documents (Section 2)
- [ ] Agent acknowledges understanding of core responsibilities (Section 3)
- [ ] Agent can recite 7-step Execution Bootstrap Protocol (Section 4.1)
- [ ] Agent can identify when execution verification is mandatory (Section 4.2)
- [ ] Agent can list common failure modes and prevention (Section 5)
- [ ] Agent can apply PR review checklist (Section 6)
- [ ] Agent can execute escalation procedure (Section 7)
- [ ] Agent has completed all training scenarios (Section 8)
- [ ] Agent has been tested on edge cases and passed
- [ ] Agent contract includes all required elements per Section 8.2 of GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md
- [ ] FM or Governance Administrator certifies agent training complete

**Certification Authority:** FM or Governance Administrator

**Certification Evidence:** Documented in agent contract or initialization evidence.

---

## 11. Ongoing Training Requirements

After initial certification, Governance Liaison agents MUST:

### 11.1 Stay Current with Governance Updates

- Monitor governance/canon/ for canonical updates
- Read governance changelog regularly
- Acknowledge new governance versions
- Update working knowledge when canonical documents change

### 11.2 Learn from Incidents

- Review incident reports in governance/incidents/
- Study RCAs for prehandover failures
- Apply learnings to future work
- Update local practices to prevent recurrence

### 11.3 Participate in Training Updates

- Review training protocol updates when released
- Complete refresher training when required
- Provide feedback on training effectiveness
- Share learnings with other agents (via Governance Administrator)

### 11.4 Maintain Execution Discipline

- Never bypass execution verification
- Never skip PREHANDOVER_PROOF when required
- Always enumerate gates in preflight
- Always capture exit codes
- Always escalate when uncertain

---

## 12. Related Documents

**Core Governance Liaison:**
- `governance/canon/GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md`
- `governance/canon/GOVERNANCE_LIAISON_ROLE_SURVEY.md`
- `governance/canon/GOVERNANCE_LIAISON_MINIMUM_REQUIREMENTS_VALIDATION.md`

**Execution Verification:**
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md`

**Repository Initialization:**
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md`
- `governance/canon/REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md`
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md`

**Agent Recruitment:**
- `governance/canon/AGENT_RECRUITMENT.md`
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- `governance/canon/REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md`

**PR Gates and Review:**
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_*.md`
- `governance/canon/PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md`
- `governance/canon/AGENT_ROLE_GATE_APPLICABILITY.md`

---

## 13. Version History

### v1.0.0 (2026-01-11)

**Status:** Initial Release  
**Authority:** Johan Ras (Human Authority)  
**Trigger:** Issue — Update Governance Liaison Training Materials for Execution Bootstrap Protocol

**Summary:** Created comprehensive training protocol for Governance Liaison agents integrating Execution Bootstrap Protocol requirements.

**Key Training Modules:**
- Foundation documents (Section 2)
- Core responsibilities (Section 3)
- Execution Bootstrap Protocol training (Section 4)
- Common prehandover failure modes & prevention (Section 5)
- PR review checklist (Section 6)
- Escalation procedures (Section 7)
- Training scenarios (Section 8)
- Success criteria (Section 9)
- Certification checklist (Section 10)
- Ongoing training requirements (Section 11)

**Effect:** All Governance Liaison agents have standardized training covering execution verification, prehandover proof, failure mode prevention, and escalation procedures.

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Effective**: Immediate upon merge  
**Last Updated**: 2026-01-11

---

*End of Governance Liaison Training Protocol v1.0.0*
