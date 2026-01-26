# EXECUTION BOOTSTRAP PROTOCOL

## Status
**Type**: Canonical Governance Process — Mandatory Enforcement  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-11  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md, CI_CONFIRMATORY_NOT_DIAGNOSTIC.md

---

## 1. Purpose

This protocol establishes **mandatory execution verification** at every phase of FPC (First Point of Contact) repository layer-down and all governance-enforced work.

**Problem Addressed**: Agents claiming completion by **documenting** that artifacts exist without **proving** they execute successfully.

**Solution**: Make execution verification mandatory before any handover, with explicit prehandover proof required in every PR.

**Constitutional Basis**:
- **CI_CONFIRMATORY_NOT_DIAGNOSTIC.md** — CI confirms preflight success, does not discover failures
- **PR_GATE_PRECONDITION_RULE.md** — No green gate, no handover
- **Incident INCIDENT-2026-01-08-PR895-CATASTROPHIC-HANDOVER-FAILURE** — Pattern of handover without verification

---

## 2. Scope

This protocol applies to:

### 2.1 Mandatory Application

**MUST Apply To**:
- ✅ All FPC repository layer-down phases
- ✅ All governance artifact creation (workflows, schemas, contracts)
- ✅ All PR handovers involving:
  - Directory structure creation
  - Workflow installation
  - Agent contract deployment
  - Gate implementation
  - Configuration changes affecting CI/gates

**Mandatory Question Before Handover**: "Have I executed this locally and captured proof of success?"

### 2.2 Optional Application

**MAY Apply To** (recommended but not mandatory):
- Documentation-only changes (markdown content updates)
- Learning promotion entries
- Evidence artifact updates
- Incident reports

**Principle**: If the change can fail in CI, execution proof is mandatory. If the change cannot fail in CI, execution proof is recommended but optional.

### 2.3 Exemptions

**NOT Required For**:
- Pure documentation changes without CI impact
- Governance canon additions that do not create executable artifacts
- RCA and incident documentation

**Note**: When uncertain, default to providing prehandover proof.

---

## 3. The 7-Step Execution Bootstrap Protocol

This protocol MUST be followed for each FPC phase or work unit requiring execution verification.

### Step 1: Document Requirements

**Action**: Clearly identify what must be created or changed.

**Output**: Written list of:
- Files to create
- Directories to establish
- Configurations to apply
- Workflows to install
- Gates to satisfy

**Example**:
```markdown
## Phase 1 Requirements
- Create `.github/workflows/` directory
- Create `.github/agents/` directory
- Create `governance/alignment/` directory
- Create `governance/evidence/initialization/` directory
```

---

### Step 2: Create Actual Artifact

**Action**: Actually create the artifact, file, directory, or configuration.

**Prohibition**: Do NOT merely document that you "will create" or "should create" — **create it now**.

**Verification**: File system commands (`ls`, `cat`, `tree`) showing artifact exists.

**Example**:
```bash
mkdir -p .github/workflows
mkdir -p .github/agents
mkdir -p governance/alignment
mkdir -p governance/evidence/initialization
```

---

### Step 3: Execute/Verify Locally

**Action**: Run the artifact, execute the workflow, validate the directory, or test the configuration **locally in your environment**.

**Methods**:
- Run workflow validation scripts
- Execute gate checks locally
- Validate YAML syntax
- Test directory existence checks
- Simulate CI gate execution
- Run preflight validation commands

**For Application Repositories with Tests**:

In addition to standard execution verification, **test execution is mandatory** per `AGENT_TEST_EXECUTION_PROTOCOL.md`:

1. ✅ Run test suite in agent environment
2. ✅ Achieve GREEN test state (exit code 0, all tests passed)
3. ✅ Capture test execution output
4. ✅ Include test evidence in PREHANDOVER_PROOF
5. ✅ Do NOT create PR until tests GREEN locally

**Reference**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`

**Prohibition**: Do NOT skip this step and rely on CI to discover failures.

**Example**:
```bash
# Validate workflow syntax
yamllint .github/workflows/governance-gate.yml

# Verify workflow triggers and structure
yq eval '.on.pull_request.paths' .github/workflows/governance-gate.yml

# Verify directory structure
ls -la governance/alignment
ls -la governance/evidence/initialization

# For application repos: Run tests
npm test  # or pytest, cargo test, etc.
# Exit code: 0 (all tests passed)
```

---

### Step 4: Capture Output

**Action**: Save terminal output, execution results, command outputs showing success.

**Required Evidence**:
- Command executed
- Output generated
- Exit code (must be 0 for success)
- Timestamp

**Format**: Plain text, code block, or screenshot.

**Example**:
```bash
$ ls -la governance/alignment
drwxr-xr-x  2 user group 4096 Jan 11 13:23 .
drwxr-xr-x  8 user group 4096 Jan 11 13:23 ..
-rw-r--r--  1 user group 1024 Jan 11 13:23 GOVERNANCE_ALIGNMENT.md

Exit code: 0
```

---

### Step 5: Validate Preflight

**Action**: Confirm that all applicable PR gates would pass **before creating PR**.

**Validation Methods**:
- Run PR gate release checklist for your role
- Execute gate validation scripts locally
- Use GPCA (Gate Predictive Compliance Analysis) if available
- Enumerate all gates triggered by your changes
- Test each gate individually
- **NEW - MANDATORY**: Verify Gate Script Alignment (see below)

**Gate Script Alignment Verification** (MANDATORY):

Before handover, agent MUST verify that local validation aligns with CI gate workflow expectations:

1. **Read CI Workflow Files**:
   - Parse all `.github/workflows/*.yml` files that will run on this PR
   - Identify which gates will be triggered by PR changes

2. **Identify Expected Scripts/Checks**:
   - For each gate workflow, extract:
     - Validation script paths (e.g., `.github/scripts/validate-*.sh`)
     - Check commands or validation logic (e.g., `yamllint`, `grep`, `diff` commands)
     - Required files or artifacts (e.g., `SCOPE_DECLARATION.md`, `PREHANDOVER_PROOF.md`)
   - **Examples of validation logic to extract**:
     - Script execution: `bash .github/scripts/validate-scope-to-diff.sh`
     - Inline checks: `test -f governance/scope-declaration.md`
     - Command validation: `yamllint .github/workflows/*.yml`
     - Python scripts: `python3 .github/scripts/check_locked_sections.py --mode detect-modifications`

3. **Verify Script Existence and Executability**:
   - Confirm all referenced scripts exist in repository
   - Verify scripts are executable (`chmod +x` if needed)
   - Check scripts match expected validation logic

4. **Validate Local Proof Alignment**:
   - Ensure local validation covers exactly what CI gate expects
   - Verify command syntax matches between local and CI
   - Confirm file paths and artifact names match

5. **Handle Mismatches**:
   - **If agent's proof incomplete**: Fix before handover, re-run all gates
   - **If gate workflow is wrong** (script missing, logic mismatch): **HALT and escalate to CS2/owner for urgent correction**
     - **Escalation procedure**: 
       - Create GitHub issue with title: `[URGENT] Gate/Agent Drift Detected: [gate-name]`
       - Label: `gate-drift`, `escalation`, `cs2-required`
       - Include: Workflow file path, missing/incorrect script, evidence of mismatch
       - Notify CS2 via issue mention: `@APGI-cmy` (or repository owner)
       - DO NOT proceed with handover until drift resolved
   - **NO handover permitted** with gate drift/misalignment

6. **Document Alignment**:
   - Include gate script alignment verification in PREHANDOVER_PROOF
   - List all gates checked and alignment status
   - Document any scripts verified or mismatches resolved

**Authority**: CI_CONFIRMATORY_NOT_DIAGNOSTIC.md Method 5, AGENT_CONTRACT_PROTECTION_PROTOCOL.md Tier-0 Section 9

**Prohibition**: Do NOT hand over with unknown gate status, known gate failures, or gate/agent drift.

**Output**: List of gates checked and their status (all must be PASS or SKIP).

**Example**:
```markdown
## Preflight Gate Validation

✅ Agent Governance Validation — PASS (local execution)
✅ Governance Scope-to-Diff Gate — PASS (scope matches diff)
⊘ FM Effectiveness Gate — SKIP (no BUILD_ACTIVE, not applicable)
⊘ FM Failure Promotion Gate — SKIP (no BUILD_ACTIVE, not applicable)
⊘ FM Learning Promotion Gate — SKIP (no BUILD_ACTIVE, not applicable)

All applicable gates: GREEN
```

---

### Step 5.1: Zero-Warning Enforcement (MANDATORY)

**NEW - Post-PR #1009 Incident Enhancement**

**Action**: Verify that ALL validation commands produce ZERO warnings and exit code 0. Any warning or non-zero exit code MUST trigger immediate HALT and remediation.

**🔒 Zero-Warning Rule (Authority: BUILD_PHILOSOPHY.md, STOP_AND_FIX_DOCTRINE.md)**:

**CRITICAL PROHIBITIONS**:
- ❌ **PROHIBITED**: Handing over with ANY warning in validation output
- ❌ **PROHIBITED**: Handing over with any gate showing "skipped" due to uncommitted changes
- ❌ **PROHIBITED**: Documenting warnings and proceeding ("will fix later")
- ❌ **PROHIBITED**: Stating "will validate in CI" to defer local validation
- ❌ **PROHIBITED**: Exit codes != 0 for any validation command
- ❌ **PROHIBITED**: Treating "pre-existing issues" as exemption from remediation

**REQUIRED ACTIONS**:
- ✅ **REQUIRED**: ALL validation commands must exit 0 with NO warnings
- ✅ **REQUIRED**: If ANY warning: HALT, fix completely, re-run ALL gates, only proceed when 100% clean
- ✅ **REQUIRED**: Local validation is MANDATORY (CI is confirmatory, not diagnostic)
- ✅ **REQUIRED**: Commit all changes BEFORE running validation (especially scope-to-diff)
- ✅ **REQUIRED**: Fix ALL issues discovered during validation (per STOP_AND_FIX_DOCTRINE.md)
- ✅ **REQUIRED**: Document exit 0 with zero warnings in PREHANDOVER_PROOF

**Zero-Warning Validation Workflow**:
```bash
# 1. Commit all changes FIRST (review changes before staging)
git status  # Review what will be committed
git add <specific-files>  # Or 'git add .' after review
git commit -m "Changes ready for validation"

# 2. Run each gate validation
yamllint .github/agents/*.md
EXIT_CODE_1=$?

.github/scripts/validate-scope-to-diff.sh main
EXIT_CODE_2=$?

python .github/scripts/check_locked_sections.py --mode=detect-modifications --base-ref=main --head-ref=HEAD
EXIT_CODE_3=$?

# 3. Check for ANY non-zero exit code
if [ $EXIT_CODE_1 -ne 0 ] || [ $EXIT_CODE_2 -ne 0 ] || [ $EXIT_CODE_3 -ne 0 ]; then
  echo "❌ VALIDATION FAILED - HALTING"
  echo "Exit codes: yamllint=$EXIT_CODE_1, scope-to-diff=$EXIT_CODE_2, locked-sections=$EXIT_CODE_3"
  echo "MUST FIX ALL ISSUES BEFORE PROCEEDING"
  exit 1
fi

# 4. Verify zero warnings in output (manual review)
echo "✅ All validation commands: exit 0, zero warnings"
```

**If Validation Produces Warnings or Errors**:
1. **HALT immediately** - Do NOT proceed with handover
2. **Fix ALL issues** - Apply STOP_AND_FIX_DOCTRINE.md completely
3. **Re-run ALL gates** - Not just the failed one
4. **Verify 100% clean** - Zero warnings, all exit 0
5. **Document remediation** - Include in PREHANDOVER_PROOF
6. **ONLY THEN proceed** - No partial handovers permitted

**Rationale**: PR #1009 was handed over with scope-to-diff warnings ("no files detected") and yamllint failures, violating BUILD_PHILOSOPHY.md and CI_CONFIRMATORY_NOT_DIAGNOSTIC.md. This enhancement prevents recurrence.

**Authority**:
- BUILD_PHILOSOPHY.md - "Warnings = Errors" principle
- STOP_AND_FIX_DOCTRINE.md - "Zero tolerance for technical debt"
- CI_CONFIRMATORY_NOT_DIAGNOSTIC.md - "CI confirms preflight success"
- Incident: `governance/memory/INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md`

---

### Step 6: Attach PREHANDOVER_PROOF

**Action**: Include PREHANDOVER_PROOF section in PR description with all captured evidence.

**Required Sections**:
1. **Artifacts Created** — List with verification commands
2. **Execution Validation** — Commands run and outputs
3. **Preflight Gate Status** — All gates enumerated and checked
4. **Exit Codes** — All must be 0 (success)
5. **Timestamp** — When validation performed

**Template**: See `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

**Prohibition**: Do NOT create PR without PREHANDOVER_PROOF if execution verification is mandatory for the change.

**Example**: See Section 6 for full template.

---

### Step 7: Declare Complete

**Action**: ONLY after Steps 1-6 complete successfully, declare work complete and hand over for review.

**Declaration Format**:
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

**Prohibition**: Do NOT declare complete if:
- ❌ Any step 1-6 incomplete
- ❌ Any gate status unknown
- ❌ Any execution failed locally
- ❌ Any exit code non-zero
- ❌ PREHANDOVER_PROOF missing

---

## 4. PREHANDOVER_PROOF Template

Every PR requiring execution verification MUST include this section in the PR description:

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: [What was supposed to be created]

**Verification**:
```
[Command showing artifact exists]
[Output from command]
```

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: [What was supposed to execute successfully]

**Commands Executed**:
```
[Command 1]
[Output 1]
[Exit code: 0]

[Command 2]
[Output 2]
[Exit code: 0]
```

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR**:
1. [Gate Name 1] — ✅ PASS (evidence: [how validated])
2. [Gate Name 2] — ✅ PASS (evidence: [how validated])
3. [Gate Name 3] — ⊘ SKIP (reason: [why not applicable])

**Summary**: All applicable gates GREEN before handover.

---

### Gate Script Alignment Verification (MANDATORY)

**CI Workflow Files Reviewed**:
1. `.github/workflows/[workflow-1].yml` — ✅ REVIEWED
2. `.github/workflows/[workflow-2].yml` — ✅ REVIEWED

**Expected Scripts/Checks Validated**:
1. `.github/scripts/[script-1].sh` — ✅ EXISTS, EXECUTABLE, LOGIC VERIFIED
2. [Check command or validation logic] — ✅ LOCAL VALIDATION MATCHES

**Alignment Status**: ✅ LOCAL VALIDATION ALIGNS WITH ALL CI GATE EXPECTATIONS

**Mismatch Resolution** (if any): [Document any mismatches found and how resolved]

---

### Execution Timestamp

**Validation Performed**: [YYYY-MM-DD HH:MM:SS UTC]  
**Environment**: [Local development environment description]  
**Validator**: [Agent name or human name]

---

### Handover Guarantee

**I guarantee**:
- ✅ All artifacts exist and are functional
- ✅ All executions succeeded locally
- ✅ All applicable gates validated in preflight
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Preflight validation was incomplete, OR
- Governance defect exists (gate misapplied, environment difference)
```

**Authority**: This template is mandatory for all execution-verified PRs.

---

## 5. Enforcement

### 5.1 Agent Responsibilities

**All Agents MUST**:
- ✅ Follow 7-step protocol for applicable work
- ✅ Attach PREHANDOVER_PROOF to every PR requiring execution verification
- ✅ Validate all gates in preflight before handover
- ✅ Capture and include execution evidence
- ✅ Declare complete ONLY after execution GREEN locally

**All Agents MUST NOT**:
- ❌ Claim completion based only on documentation
- ❌ Hand over PRs without execution verification
- ❌ Rely on CI to discover execution failures
- ❌ Skip prehandover proof requirement
- ❌ Declare "complete" without local validation

### 5.2 Reviewer Responsibilities

**Reviewers MUST**:
- ✅ Check for PREHANDOVER_PROOF in PR description
- ✅ Verify that prehandover proof is complete (all 7 steps)
- ✅ Confirm that gates were enumerated and validated
- ✅ Validate that evidence supports claims

**Reviewers MUST NOT**:
- ❌ Approve PRs missing PREHANDOVER_PROOF (if execution verification required)
- ❌ Accept "I tested it" without captured evidence
- ❌ Approve PRs with unknown gate status
- ❌ Bypass prehandover proof requirement

**Review Checklist**:
```markdown
- [ ] PREHANDOVER_PROOF section present in PR description
- [ ] Artifacts created and verified (Step 2)
- [ ] Execution validation performed (Step 3)
- [ ] Output captured (Step 4)
- [ ] Gates enumerated and validated (Step 5)
- [ ] Completion declaration includes guarantee (Step 7)
```

### 5.3 Governance Administrator Enforcement

**Governance Administrator MUST**:
- ✅ Enforce this protocol in all governance PRs
- ✅ Add prehandover proof language to agent contracts
- ✅ Validate prehandover proof completeness before approval
- ✅ Escalate violations to Maturion authority
- ✅ Document enforcement in incident reports

**Integration Required**: Update `governance-repo-administrator.agent.md` to include prehandover proof obligation.

---

## 6. Sample PREHANDOVER_PROOF (Complete Example)

### Example: FPC Phase 1 (Directory Structure)

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Create mandatory FPC directory structure per GOVERNANCE_LAYERDOWN_CONTRACT.md

**Verification**:
```
$ ls -la .github/
drwxr-xr-x  4 user group 4096 Jan 11 13:23 .
drwxr-xr-x 12 user group 4096 Jan 11 13:23 ..
drwxr-xr-x  2 user group 4096 Jan 11 13:23 workflows
drwxr-xr-x  2 user group 4096 Jan 11 13:23 agents

$ ls -la governance/
drwxr-xr-x  8 user group 4096 Jan 11 13:23 .
drwxr-xr-x 12 user group 4096 Jan 11 13:23 ..
drwxr-xr-x  2 user group 4096 Jan 11 13:23 alignment
drwxr-xr-x  3 user group 4096 Jan 11 13:23 evidence
drwxr-xr-x  2 user group 4096 Jan 11 13:23 policies
drwxr-xr-x  2 user group 4096 Jan 11 13:23 schemas
drwxr-xr-x  2 user group 4096 Jan 11 13:23 memory

$ ls -la governance/evidence/
drwxr-xr-x  3 user group 4096 Jan 11 13:23 .
drwxr-xr-x  8 user group 4096 Jan 11 13:23 ..
drwxr-xr-x  2 user group 4096 Jan 11 13:23 initialization
drwxr-xr-x  2 user group 4096 Jan 11 13:23 commissioning
```

**Status**: ✅ VERIFIED — All required directories exist

---

### Execution Validation

**Requirement**: Validate directory structure matches FPC canonical requirements

**Commands Executed**:
```
$ # Verify all required directories exist (collect all missing before failing)
$ MISSING_DIRS=""
$ for dir in .github/workflows .github/agents governance/alignment governance/evidence/initialization governance/evidence/commissioning governance/policies governance/schemas governance/memory; do
  if [ -d "$dir" ]; then
    echo "✅ $dir: EXISTS"
  else
    echo "❌ $dir: MISSING"
    MISSING_DIRS="$MISSING_DIRS $dir"
  fi
done

✅ .github/workflows: EXISTS
✅ .github/agents: EXISTS
✅ governance/alignment: EXISTS
✅ governance/evidence/initialization: EXISTS
✅ governance/evidence/commissioning: EXISTS
✅ governance/policies: EXISTS
✅ governance/schemas: EXISTS
✅ governance/memory: EXISTS

$ # Check if any directories were missing
$ if [ -n "$MISSING_DIRS" ]; then
  echo "❌ Missing directories:$MISSING_DIRS"
  exit 1
fi

Exit code: 0
```

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `.github/**` and `governance/**`):
1. **Agent Governance Validation** — ✅ PASS
   - Validated locally: Checked `.agent` file exists and has required structure
   - Command: `[ -f .agent ] && grep -q "governance:" .agent && echo "✅ governance section present" || echo "❌ validation failed"`
   - Exit code: 0
   - Output: "✅ governance section present"

2. **Governance Scope-to-Diff Gate** — ✅ PASS
   - Validated: PR scope declares "governance structure initialization"
   - Diff: Only `.github/` and `governance/` directories modified
   - Scope matches diff: TRUE

3. **FM Effectiveness Gate** — ⊘ SKIP
   - Reason: No `architecture/BUILD_ACTIVE` file (not an application repo)
   - Not applicable to governance-only changes

4. **FM Failure Promotion Gate** — ⊘ SKIP
   - Reason: No `architecture/BUILD_ACTIVE` file
   - Not applicable to governance-only changes

5. **FM Learning Promotion Gate** — ⊘ SKIP
   - Reason: No `architecture/BUILD_ACTIVE` file
   - Not applicable to governance-only changes

**Summary**: 2 applicable gates GREEN, 3 gates correctly SKIPPED before handover.

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 13:45:00 UTC  
**Environment**: Ubuntu 22.04, bash 5.1.16, yamllint 1.26.3  
**Validator**: governance-repo-administrator agent (via GitHub Copilot)

---

### Handover Guarantee

**I guarantee**:
- ✅ All 8 required directories exist and are accessible
- ✅ Directory structure validation executed successfully (exit code 0)
- ✅ All 5 gates enumerated; 2 applicable gates validated and GREEN
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Incomplete gate enumeration (missed a gate), OR
- Environment difference between local and CI, OR
- Governance defect (gate misapplied or incorrectly configured)

**Root Cause Commitment**: If CI fails, I will perform RCA to determine whether failure was due to incomplete preflight validation or governance defect.
```

---

## 7. Integration with FPC Repository Layer-Down Guide

This protocol integrates into **FPC_REPOSITORY_LAYERDOWN_GUIDE.md** as follows:

### 7.1 Required Updates to FPC Guide

Each of the 8 FPC phases MUST include:

```markdown
### Execution Bootstrap Protocol (MANDATORY)

Before declaring this phase complete:

1. ✅ **Create Actual Artifacts** — Do not just document, actually create
2. ✅ **Execute/Verify Locally** — Run validation, check directories, test workflows
3. ✅ **Capture Output** — Save terminal logs showing success
4. ✅ **Validate Preflight** — Check all gates triggered by this phase
5. ✅ **Attach PREHANDOVER_PROOF** — Include in PR description (see template)
6. ✅ **Declare Complete** — ONLY after execution GREEN locally

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
```

### 7.2 Phase-Specific Integration

**Phase 1 (Directory Structure)**:
- Execute: `ls -la` commands showing directories exist
- Validate: Directory structure completeness script

**Phase 2 (Core Governance Files)**:
- Execute: `cat` commands showing files created and populated
- Validate: File presence and schema validation

**Phase 3 (PR Gate Workflows)**:
- Execute: `yamllint` on workflow files
- Validate: Workflow syntax, gate enumeration, simulation

**Phase 4 (Agent Contracts)**:
- Execute: Agent contract validation script
- Validate: Contract schema compliance, no contradictions

**Phase 5 (Governance Policies & Schemas)**:
- Execute: Schema reference validation
- Validate: No schema drift

**Phase 6 (Latest Learnings Integration)**:
- Execute: Learning review checklist completion
- Validate: Learnings applied

**Phase 7 (Repository-Specific Mapping)**:
- Execute: Mapping document validation
- Validate: Mapping completeness

**Phase 8 (Branch Protection & Activation)**:
- Execute: Test PR creation and gate execution
- Validate: All gates execute (pass or skip, not fail)

---

## 8. Success Criteria

This protocol is successful when:

- ✅ No PR is accepted without PREHANDOVER_PROOF (for execution-verified changes)
- ✅ Agents demonstrate local execution before every handover
- ✅ CI failures decrease (preflight catches issues before handover)
- ✅ No repeat of "documented but not executed" failures (R_Roster PR #8 pattern)
- ✅ All agents attach execution evidence to PRs
- ✅ Reviewers validate prehandover proof completeness
- ✅ Gate failures caught in preflight, not CI
- ✅ CI functions as confirmatory, not diagnostic

---

## 9. Migration Path

### 9.1 Immediate Adoption (Effective Date: 2026-01-11)

**From This Point Forward**:
- ✅ All new FPC layer-downs MUST use this protocol
- ✅ All governance PRs requiring execution verification MUST include PREHANDOVER_PROOF
- ✅ All agents MUST follow 7-step protocol for applicable work

**Bootstrap Mode Transition**:
- Update governance-repo-administrator agent contract immediately
- Document protocol in agent onboarding materials
- Add to governance liaison minimum requirements

### 9.2 Retroactive Application

**NOT Required**:
- Existing repositories do NOT need to re-layer down
- Historical PRs do NOT need retroactive prehandover proof

**Recommended**:
- Review recent incidents for protocol violations
- Apply learnings to agent contracts
- Update governance liaison training

### 9.3 Ripple to Other Repositories

**Governance-to-FM Ripple**:
- FM must enforce prehandover proof for builder PRs
- Builder contracts must reflect execution verification obligation
- FM orchestration must validate prehandover proof completeness

**Timeline**: Ripple complete within 1 governance version cycle (see CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md)

---

## 10. Relationship to Other Canon

This protocol integrates with and operationalizes:

| Canonical Document | Relationship |
|-------------------|--------------|
| **CI_CONFIRMATORY_NOT_DIAGNOSTIC.md** | This protocol IS the preflight execution verification mechanism that CI_CONFIRMATORY_NOT_DIAGNOSTIC requires |
| **FPC_REPOSITORY_LAYERDOWN_GUIDE.md** | This protocol integrates into every FPC phase as mandatory execution verification |
| **PR_GATE_PRECONDITION_RULE.md** | This protocol enforces "no green gate, no handover" through prehandover proof |
| **PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md** | This protocol provides evidence for gate evaluation |
| **AGENT_ROLE_GATE_APPLICABILITY.md** | This protocol requires agents to enumerate applicable gates before handover |
| **BUILDER_FIRST_PR_MERGE_MODEL.md** | This protocol extends to builder PRs (via FM ripple) |
| **BOOTSTRAP_EXECUTION_LEARNINGS.md** | This protocol captures learning from R_Roster PR #8 failure |

---

## 11. Prohibitions

### 11.1 Absolutely Prohibited

**Agents MUST NEVER**:
- ❌ Claim completion based only on checklist or documentation
- ❌ Hand over PRs relying on CI to discover failures
- ❌ Skip execution verification "because it's simple"
- ❌ Attach placeholder prehandover proof ("will validate later")
- ❌ Declare "I created the evidence file" without creating actual artifacts
- ❌ Bypass prehandover proof requirement for "low-risk" changes
- ❌ **Hand over with ANY validation warnings or non-zero exit codes** (NEW - Post-PR #1009)
- ❌ **State "will validate in CI" to defer local validation** (NEW - Post-PR #1009)
- ❌ **Proceed with warnings documented but not fixed** (NEW - Post-PR #1009)
- ❌ **Treat "pre-existing issues" as exemption from STOP-AND-FIX** (NEW - Post-PR #1009)

**Reviewers MUST NEVER**:
- ❌ Approve PRs without prehandover proof (if execution verification required)
- ❌ Accept "trust me, it works" without evidence
- ❌ Waive prehandover proof requirement
- ❌ Merge PRs with unknown gate status

### 11.2 Escalation Required

If an agent encounters:
- Governance defect preventing local execution
- Gate misapplication blocking handover
- Ambiguous execution requirements
- Contradictory prehandover obligations

**Agent MUST**:
- ✅ HALT execution immediately
- ✅ Document the defect with evidence
- ✅ Escalate to Governance Administrator (or Maturion if governance defect)
- ✅ Do NOT attempt to work around or bypass

**Escalation is success, not failure.**

### 11.3 Agent Contract Propagation Wait

**When agent contracts are updated in main branch:**

Agents rely on contract files in `.github/agents/*.agent.md` for their operational instructions. When these contracts are updated and merged to main, there may be a propagation delay before agents load the updated version.

**Required Actions**:
- ✅ Wait 5-10 minutes after merging agent contract changes before creating issues that require the updated contract
- ✅ Verify agent contract version in self-governance check (check version number or last-updated timestamp)
- ✅ If agent loads stale contract (wrong version), HALT and wait for propagation
- ✅ Document propagation wait in issue description if creating immediately after contract merge

**Rationale**: Agents may cache or load contracts at session start. Immediate issue creation after contract merge may result in agent operating under old contract, leading to governance violations.

**Verification Method**:
```bash
# Check contract version/timestamp before starting work
# Example for governance-repo-administrator:
grep "version:" .github/agents/governance-repo-administrator.agent.md
grep "Last Updated:" .github/agents/governance-repo-administrator.agent.md

# Or check all agent contracts:
grep "version:" .github/agents/*.agent.md

# Compare with expected version from recent PR
# If mismatch, wait 5-10 minutes and re-check
```

**If Stale Contract Detected**:
1. HALT work immediately
2. Wait 5-10 minutes for propagation
3. Re-check contract version
4. If still stale after 15 minutes, escalate to CS2
5. Do NOT proceed with stale contract

---

## 12. Authority Statement

**This protocol is constitutional and binding.**

All governed repositories, agents, and workflows MUST comply with this protocol.

No execution path may:
- Bypass execution verification for applicable changes
- Accept PRs without prehandover proof
- Declare completion without local validation
- Rely on CI for discovery of execution failures

**Violations are governance incidents and must be escalated per escalation policy.**

**Root Authority**:
- R_Roster PR #8 catastrophic failure (documented but not executed)
- INCIDENT-2026-01-08-PR895-CATASTROPHIC-HANDOVER-FAILURE (handover without verification)
- CI_CONFIRMATORY_NOT_DIAGNOSTIC.md (preflight mandatory)

---

## 13. Version History

### v1.1.0 (2026-01-26)
- **CRITICAL ENHANCEMENT**: Added Step 5.1 "Zero-Warning Enforcement" (Post-PR #1009 Incident)
- Prohibits handover with ANY validation warnings or non-zero exit codes
- Prohibits "will validate in CI" deferral statements
- Requires HALT and complete remediation for any warning
- Adds zero-warning validation workflow with exit code checks
- Added Section 11.3 "Agent Contract Propagation Wait" for contract update timing
- Updated Section 11.1 prohibitions to include zero-warning violations
- Authority: BUILD_PHILOSOPHY.md, STOP_AND_FIX_DOCTRINE.md, INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md

### v1.0.0 (2026-01-11)
- Initial protocol definition
- Establishes 7-step execution bootstrap process
- Defines PREHANDOVER_PROOF template
- Integrates with FPC Repository Layer-Down Guide
- Establishes enforcement obligations
- Provides sample prehandover proof
- Defines success criteria and migration path

---

## 14. Related Documents

- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Preflight obligation foundation
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` — Primary integration point
- `governance/canon/PR_GATE_PRECONDITION_RULE.md` — No green gate, no handover
- `governance/canon/STOP_AND_FIX_DOCTRINE.md` — Zero tolerance for warnings and errors
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — Template for agents
- `governance/incidents/INCIDENT-2026-01-08-PR895-CATASTROPHIC-HANDOVER-FAILURE.md` — Root incident
- `governance/memory/INCIDENT_2026-01-26_PR_1009_INCOMPLETE_HANDOVER.md` — Zero-warning enforcement trigger
- `.github/agents/governance-repo-administrator.agent.md` — Enforcement authority

---

**Status**: Active and Enforced  
**Owner**: Governance Administrator  
**Approval Authority**: Johan Ras  
**Effective**: Immediate upon merge  
**Last Updated**: 2026-01-26

---

*End of Execution Bootstrap Protocol v1.0.0*
