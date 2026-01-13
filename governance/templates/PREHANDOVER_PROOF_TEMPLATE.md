# PREHANDOVER_PROOF Template

**Purpose**: Standard template for documenting execution verification before PR handover.  
**Version**: 2.0.0  
**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Mandatory For**: All PRs requiring execution verification (workflows, gates, contracts, configurations)  
**Optional For**: Documentation-only changes (recommended but not required)

---

## When to Use This Template

Use this template in your PR description when your changes include:

- ✅ Directory structure creation
- ✅ Workflow file installation or modification
- ✅ Agent contract deployment
- ✅ Gate implementation or changes
- ✅ Configuration changes affecting CI
- ✅ Schema or policy creation
- ✅ Any artifact that can fail in CI

**When uncertain, include PREHANDOVER_PROOF.**

---

## Template

Copy this template into your PR description and fill in all sections:

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: [Describe what was supposed to be created]

**Verification**:
```
[Paste command showing artifact exists, e.g., ls -la, cat, tree]
[Paste output from command]
```

**Status**: ✅ VERIFIED | ❌ NOT VERIFIED

---

### Execution Validation

**Requirement**: [Describe what was supposed to execute successfully]

**Commands Executed**:
```
[Command 1]
[Output from command 1]
[Exit code: X]

[Command 2]
[Output from command 2]
[Exit code: X]

[Additional commands as needed]
```

**Status**: ✅ ALL GREEN | ⚠️ PARTIAL | ❌ FAILED

---

### Test Execution Validation

**Requirement**: [Describe what tests were supposed to pass - e.g., "All unit tests for Dashboard component must pass"]

**Applicability**: 
- ✅ Required for PRs with code changes that have associated tests
- ⊘ Not applicable for documentation-only changes or governance-only changes
- ⚠️ Exception documented below (if applicable)

**Test Command Executed**:
```
[Exact command used to run tests, e.g., npm test, pytest, cargo test]
```

**Execution Details**:
- **Date**: [YYYY-MM-DD HH:MM:SS UTC]
- **Environment**: [OS, Runtime version, Package manager, Test runner version]
- **Exit Code**: [0 = SUCCESS, non-zero = FAILURE]

**Test Results Summary**:
```
[Test execution output showing all tests passed]
[Include: test suites passed/total, tests passed/total, duration, final status]
[Full output OR abbreviated summary with key metrics]
```

**Status**: ✅ ALL GREEN | ❌ FAILURES PRESENT | ⊘ NOT APPLICABLE | ⚠️ EXCEPTION

**Iterations** (if any):
- [Describe any test failures encountered and how they were resolved]
- [Include "All tests GREEN on final run" confirmation]
- [If no iterations: "Tests passed on first execution"]

**Exception Documentation** (if applicable):
```
**Exception Category**: [Environment Impossibility | Emergency Hotfix | Test Infrastructure Gap]
**Justification**: [Why test execution protocol cannot be followed]
**Alternative Validation**: [What validation was done instead]
**Authorization**: [Authorized by X on YYYY-MM-DD with evidence: link]
**Remediation Plan**: [How will test execution be achieved in future]
```

**Guarantee**: All tests passed locally before PR creation. CI will confirm success, not discover test failures.

**Authority**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md`

---

### Preflight Gate Status

**Gates Triggered by This PR**:

1. **[Gate Name 1]** — ✅ PASS | ⊘ SKIP | ❌ FAIL
   - Validation method: [How you validated this gate]
   - Evidence: [Command/output/reasoning]

2. **[Gate Name 2]** — ✅ PASS | ⊘ SKIP | ❌ FAIL
   - Validation method: [How you validated this gate]
   - Evidence: [Command/output/reasoning]

3. **[Gate Name 3]** — ✅ PASS | ⊘ SKIP | ❌ FAIL
   - Validation method: [How you validated this gate]
   - Evidence: [Command/output/reasoning]

[Add all gates triggered by changes to files in your PR]

**Summary**: [X applicable gates GREEN, Y gates SKIP, Z gates FAIL]

**Gate Enumeration Method**: [How you identified all applicable gates, e.g., "Checked .github/workflows/ for triggers matching modified paths"]

---

### Execution Timestamp

**Validation Performed**: [YYYY-MM-DD HH:MM:SS UTC]  
**Environment**: [Operating system, shell, tool versions]  
**Validator**: [Agent name or your name]

---

### Handover Guarantee

**I guarantee**:
- ✅ All artifacts exist and are functional
- ✅ All executions succeeded locally (or documented failures explained)
- ✅ All applicable gates validated in preflight
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Incomplete preflight validation (I missed a gate or validation step), OR
- Environment difference between local and CI (documented below), OR
- Governance defect (gate misapplied, misconfigured, or contradictory)

**Known Environment Differences** (if any):
- [List any known differences between local environment and CI, e.g., "Local uses bash 5.1, CI uses bash 5.0"]
- [If none: "None known"]

**Root Cause Commitment**: If CI fails, I will perform RCA to determine whether failure was due to incomplete preflight validation or governance defect, and will document findings in incident report if pattern indicates systemic issue.

---

### Embedded Governance Artifacts

**Purpose**: Document all governance artifacts required for this work unit.

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

**Artifact Options**: Builders MAY choose ONE of the following approaches:
1. **Embed artifacts in this PREHANDOVER_PROOF** (use sections below)
2. **Create separate artifact files** in `.agent-admin/` directory and provide cross-references below

**Cross-Reference Format** (if using separate files):
```markdown
- **Governance Scan**: See `.agent-admin/scans/scan_YYYYMMDD_HHMMSS.md`
- **Risk Assessment**: See `.agent-admin/risk-assessments/risk_NNN_YYYYMMDD.md`
- **Change Record**: See `.agent-admin/changes/change_NNN_YYYYMMDD.md`
- **Completion Summary**: See `.agent-admin/COMPLETION_SUMMARY.md`
```

---

#### Artifact 1: Governance Scan

**Scan ID**: [scan_YYYYMMDD_HHMMSS]  
**Timestamp**: [YYYY-MM-DD HH:MM:SS UTC]  
**Agent**: [agent-name]  
**Purpose**: [Brief description of pre-work governance scan purpose]

**Repository Context**:
- Current Repository: [owner/repo-name]
- Repository Type: [governance source / application repo / etc.]
- Branch: [branch-name]
- Status: [✅/⚠️/❌ with brief explanation]

**Governance Documents Discovered**:
- [Key canonical documents relevant to this work]
- [Binding governance policies and protocols]
- [Authority references for this work unit]

**Gap Analysis**:
- [Identified gaps or conflicts in governance coverage]
- [Required updates or clarifications]

**Scan Conclusion**: [✅ Ready to proceed / ⚠️ Proceed with caution / ❌ Blockers identified]

---

#### Artifact 2: Risk Assessment

**Risk Assessment ID**: [risk_NNN_YYYYMMDD]  
**Date**: [YYYY-MM-DD]  
**Agent**: [agent-name]  
**Task**: [Brief task description]

**Risk Categories Assessed**:

1. **[Risk Category 1]**
   - **Risk**: [Description]
   - **Likelihood**: [HIGH/MEDIUM/LOW/VERY LOW]
   - **Impact**: [CATASTROPHIC/HIGH/MEDIUM/LOW]
   - **Mitigation**: [Mitigation strategies]
   - **Residual Risk**: [Assessment after mitigation]

2. **[Risk Category 2]**
   - [Same structure as above]

[Add all relevant risk categories]

**Overall Risk Level**: [CATASTROPHIC/HIGH/MEDIUM/LOW/MINIMAL]

**Recommendation**: [PROCEED / PROCEED WITH CAUTION / HALT AND ESCALATE]

---

#### Artifact 3: Change Record

**Change ID**: [change_NNN_YYYYMMDD]  
**Date**: [YYYY-MM-DD]  
**Agent**: [agent-name]  
**Task**: [Brief task description]

**Change Summary**: [High-level summary of all changes applied]

**Changes Applied**:

1. **[File/Component 1]**
   - **Sections Added**: [List new sections]
   - **Sections Modified**: [List modified sections]
   - **Lines Changed**: [Approximate line count]
   - **Rationale**: [Why these changes were made]

2. **[File/Component 2]**
   - [Same structure as above]

[Document all significant changes]

**Validation Results**:
- ✅ Pre-change validation complete
- ✅ Post-change validation complete
- ✅ No conflicts introduced
- ✅ All requirements met

**Compliance Matrix**: [Optional table showing requirement compliance]

---

#### Artifact 4: Completion Summary

**Task**: [Full task description]  
**Agent**: [agent-name]  
**Date**: [YYYY-MM-DD]  
**Status**: [✅ COMPLETE / ⚠️ PARTIAL / ❌ INCOMPLETE]  
**Exit Code**: [0 for success, non-zero for issues]

**Task Requirements Checklist**:
- [ ] [Requirement 1] - [✅/⚠️/❌ Status]
- [ ] [Requirement 2] - [✅/⚠️/❌ Status]
- [ ] [Requirement N] - [✅/⚠️/❌ Status]

**Changes Summary**: [Brief overview of changes made]

**Validation Summary**: [Summary of all validations performed]

**Impact Analysis**:
- **Immediate Impact**: [What changed immediately]
- **Downstream Impact**: [What downstream systems/repos are affected]
- **Risk Mitigation**: [How risks were addressed]

**Artifacts Created**:
- [List all artifacts created during this work unit]

**Completion Status**: [✅ COMPLETE with detailed justification]

---

### CST Validation Attestation

**Purpose**: Document Combined Subwave Testing (CST) validation when applicable.

**Authority**: `governance/canon/COMBINED_TESTING_PATTERN.md`

**CST Applicability Determination**:

Complete the following checklist to determine if CST is required for this work unit:

- [ ] **Multiple subwaves converge and must integrate** (e.g., UI + API)
- [ ] **Cross-module dependencies reach integration readiness** (e.g., Frontend ↔ Backend)
- [ ] **Architectural boundaries crossed** (e.g., Client ↔ Server, Service ↔ Database)
- [ ] **Significant feature complexity requires mid-wave validation**
- [ ] **Integration failure cost is high** (late detection would require extensive rework)

**CST Decision**: [✅ CST REQUIRED / ⊘ CST NOT REQUIRED]

---

#### If CST Required: Validation Attestation

**CST Checkpoint ID**: [CST-Wave-N-Subwave-X or similar identifier]  
**CST Validator**: [Name/Role of person or agent who performed CST validation]  
**Validation Date**: [YYYY-MM-DD HH:MM:SS UTC]  
**CST Result**: [✅ PASS / ❌ FAIL / ⚠️ PARTIAL]

**Integration Scenarios Tested**:
1. [Scenario 1 description]
   - **Test Method**: [How scenario was tested]
   - **Result**: [✅ PASS / ❌ FAIL]
   - **Evidence**: [Link to test output, logs, or detailed results]

2. [Scenario 2 description]
   - [Same structure]

[Document all integration scenarios tested]

**CST Acceptance Criteria Checklist**:
- [ ] All identified integration points validated
- [ ] Cross-module data flow verified
- [ ] Architectural boundary interactions confirmed
- [ ] Integration test results documented with evidence
- [ ] All CST failures resolved before handover
- [ ] Integration scenarios align with wave planning documents

**CST Evidence Location**: [Path to detailed test results, logs, or validation artifacts]

**Authority Reference**: `governance/canon/COMBINED_TESTING_PATTERN.md` v1.0.0, Section 4 (CST Requirements)

**CST Validator Signature**: [Validator name and role]  
**CST Approval**: ✅ CST validation complete, integration scenarios PASS, handover approved

---

#### If CST Not Required: Justification

**CST Not Required Because**:

Select all that apply:
- [ ] ⊘ Subwaves are isolated and independent (no integration dependencies)
- [ ] ⊘ No architectural boundaries crossed (single-module work)
- [ ] ⊘ Integration risk is low (simple, well-understood patterns)
- [ ] ⊘ Cumulative regression provides sufficient coverage (integration already validated)
- [ ] ⊘ Documentation-only changes (no runtime integration)
- [ ] ⊘ Configuration-only changes (no cross-module interaction)

**Justification**: [2-3 sentences explaining why CST is not applicable to this work unit]

**Governance-Only Work Indicator**: [If applicable: "This work unit modifies governance documentation only and does not create or modify application code, integration points, or runtime behavior."]

**Authority Reference**: `governance/canon/COMBINED_TESTING_PATTERN.md` v1.0.0, Section 4.2 (CST Decision Framework)

**Validator Confirmation**: [Validator name] confirms CST is not required per decision framework criteria above.
```

---

## Completion Checklist

Before submitting PR with PREHANDOVER_PROOF, verify:

- [ ] **Artifacts Created** section complete with verification commands and output
- [ ] **Execution Validation** section includes all commands with exit codes
- [ ] **Preflight Gate Status** enumerates ALL gates triggered by PR changes
- [ ] Each gate has validation method and evidence
- [ ] **Execution Timestamp** includes date, time, environment details
- [ ] **Handover Guarantee** section complete with explicit guarantee statement
- [ ] **Embedded Governance Artifacts** section complete (embedded OR cross-referenced)
  - [ ] Governance Scan documented with repository context and gap analysis
  - [ ] Risk Assessment documented with risk categories and mitigation strategies
  - [ ] Change Record documented with detailed changes and validation results
  - [ ] Completion Summary documented with requirements checklist and impact analysis
- [ ] **CST Validation Attestation** section complete
  - [ ] CST applicability determination completed with checklist
  - [ ] If CST required: validation attestation complete with all scenarios tested
  - [ ] If CST not required: justification documented with decision framework criteria
- [ ] All exit codes are 0 (success) OR failures are explained and resolved
- [ ] All applicable gates show ✅ PASS or ⊘ SKIP (no ❌ FAIL allowed at handover)

---

## Examples

### Example 1: Directory Structure Creation

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Create FPC mandatory directory structure per GOVERNANCE_LAYERDOWN_CONTRACT.md

**Verification**:
```
$ tree -L 2 .github/ governance/
.github/
├── workflows
└── agents

governance/
├── alignment
├── evidence
│   ├── initialization
│   └── commissioning
├── policies
├── schemas
└── memory

5 directories, 0 files
```

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: Validate directory structure matches canonical requirements

**Commands Executed**:
```
$ for dir in .github/workflows .github/agents governance/alignment governance/evidence/initialization governance/evidence/commissioning governance/policies governance/schemas governance/memory; do
  if [ -d "$dir" ]; then
    echo "✅ $dir: EXISTS"
  else
    echo "❌ $dir: MISSING"
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

Exit code: 0
```

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `.github/**` and `governance/**`):

1. **Agent Governance Validation** — ✅ PASS
   - Validation method: Simulated gate locally (no .agent contracts to validate yet)
   - Evidence: Exit code 0 from validation script

2. **Governance Scope-to-Diff Gate** — ✅ PASS
   - Validation method: Manual check of scope declaration vs. file diff
   - Evidence: Scope: "governance structure", Diff: only .github/ and governance/ modified

3. **FM Effectiveness Gate** — ⊘ SKIP
   - Validation method: Checked for architecture/BUILD_ACTIVE
   - Evidence: File does not exist, gate not applicable

**Summary**: 2 applicable gates GREEN, 1 gate SKIP

**Gate Enumeration Method**: Reviewed .github/workflows/*.yml for on.pull_request.paths triggers matching [".github/**", "governance/**"]

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 14:30:00 UTC  
**Environment**: Ubuntu 22.04.3 LTS, bash 5.1.16, tree 2.0.2  
**Validator**: governance-repo-administrator (GitHub Copilot)

---

### Handover Guarantee

**I guarantee**:
- ✅ All 8 required directories exist and are accessible
- ✅ Directory validation script executed successfully (exit code 0)
- ✅ All 3 gates enumerated; 2 applicable gates validated and GREEN, 1 correctly SKIPPED
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Incomplete gate enumeration (I missed a gate in .github/workflows/), OR
- Environment difference (e.g., different tree version, different bash), OR
- Governance defect (gate incorrectly triggered or validated)

**Known Environment Differences**: None known

**Root Cause Commitment**: If CI fails, I will perform RCA and document in incident report if systemic pattern detected.
```

---

### Example 2: Workflow Installation

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Install governance-gate.yml workflow

**Verification**:
```
$ ls -la .github/workflows/governance-gate.yml
-rw-r--r-- 1 user group 5895 Jan 11 14:15 .github/workflows/governance-gate.yml

$ wc -l .github/workflows/governance-gate.yml
147 .github/workflows/governance-gate.yml
```

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: Validate workflow YAML syntax and gate logic

**Commands Executed**:
```
$ yamllint .github/workflows/governance-gate.yml
✅ No errors found

Exit code: 0

$ yq eval '.on.pull_request.paths' .github/workflows/governance-gate.yml
- ".github/**"
- "governance/**"

Exit code: 0
```

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `.github/workflows/**`):

1. **Agent Governance Validation** — ✅ PASS
   - Validation method: Checked agent contract YAML structure validity
   - Evidence: "Governance bindings validated"

2. **Governance Scope-to-Diff Gate** — ✅ PASS
   - Validation method: Scope declares "workflow installation", diff shows only .github/workflows/
   - Evidence: Scope matches diff

3. **governance-gate.yml** (the workflow being installed) — ⊘ SKIP
   - Validation method: Cannot run on itself during installation
   - Evidence: Will execute on subsequent PRs

**Summary**: 2 applicable gates GREEN, 1 gate SKIP (self-reference)

**Gate Enumeration Method**: Listed all .github/workflows/*.yml files and checked on.pull_request triggers

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 14:45:00 UTC  
**Environment**: Ubuntu 22.04.3 LTS, yamllint 1.26.3, yq 4.30.8  
**Validator**: governance-repo-administrator (GitHub Copilot)

---

### Handover Guarantee

**I guarantee**:
- ✅ Workflow file exists and is syntactically valid (yamllint passed)
- ✅ Workflow triggers configured correctly (verified with yq)
- ✅ All 3 gates enumerated; 2 applicable gates GREEN, 1 appropriately SKIPPED
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- yamllint version difference between local and CI, OR
- Workflow syntax valid locally but invalid in GitHub Actions environment, OR
- Governance defect in gate trigger configuration

**Known Environment Differences**: Local yamllint 1.26.3, CI may use different version

**Root Cause Commitment**: If CI fails, I will compare yamllint versions and workflow syntax between local and CI, then document in RCA.
```

---

## Validation Script (Optional)

You can use this script to automate parts of prehandover proof generation:

```bash
#!/bin/bash
# prehandover-proof-generator.sh
# Helps generate PREHANDOVER_PROOF evidence

set -e

echo "## PREHANDOVER_PROOF"
echo ""
echo "### Artifacts Created"
echo ""
echo "**Requirement**: [FILL IN]"
echo ""
echo '**Verification**:'
echo '```'

# List artifacts (customize this)
if [ -d ".github/workflows" ]; then
  echo "$ ls -la .github/workflows"
  ls -la .github/workflows
fi

if [ -d "governance" ]; then
  echo ""
  echo "$ tree -L 2 governance/"
  tree -L 2 governance/
fi

echo '```'
echo ""
echo "**Status**: ✅ VERIFIED"
echo ""
echo "---"
echo ""
echo "### Execution Validation"
echo ""
echo "**Requirement**: [FILL IN]"
echo ""
echo '**Commands Executed**:'
echo '```'

# Validate YAML files
for file in .github/workflows/*.yml; do
  [[ -f "$file" ]] || continue
  echo "$ yamllint $file"
  yamllint "$file"
  EXIT_CODE=$?
  echo "Exit code: $EXIT_CODE"
  if [ $EXIT_CODE -ne 0 ]; then
    echo "⚠️ Validation failed for $file"
  fi
  echo ""
done

echo '```'
echo ""
echo "**Status**: ✅ ALL GREEN"
echo ""
echo "---"
echo ""
echo "### Preflight Gate Status"
echo ""
echo "**Gates Triggered by This PR**:"
echo ""
echo "1. **[Gate Name]** — ✅ PASS | ⊘ SKIP | ❌ FAIL"
echo "   - Validation method: [FILL IN]"
echo "   - Evidence: [FILL IN]"
echo ""
echo "[Add all gates]"
echo ""
echo "**Summary**: [FILL IN]"
echo ""
echo "**Gate Enumeration Method**: [FILL IN]"
echo ""
echo "---"
echo ""
echo "### Execution Timestamp"
echo ""
echo "**Validation Performed**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
echo "**Environment**: [Operating system, bash version - sanitize if needed]"
echo "**Validator**: [FILL IN]"
echo ""
echo "<!-- Note: Avoid exposing sensitive system details in production environments. -->"
echo "<!-- Consider using generic descriptions like 'Ubuntu 22.04, bash 5.x' instead of -->"
echo "<!-- specific kernel versions or detailed system information. -->"
echo ""
echo "---"
echo ""
echo "### Handover Guarantee"
echo ""
echo "**I guarantee**:"
echo "- ✅ All artifacts exist and are functional"
echo "- ✅ All executions succeeded locally"
echo "- ✅ All applicable gates validated in preflight"
echo "- ✅ CI will confirm success (not discover failures)"
echo ""
echo "**If CI fails after this guarantee, it indicates**:"
echo "- Incomplete preflight validation, OR"
echo "- Environment difference between local and CI, OR"
echo "- Governance defect"
echo ""
echo "**Known Environment Differences**: [FILL IN]"
echo ""
echo "**Root Cause Commitment**: If CI fails, I will perform RCA and document findings."
```

---

## FAQ

### Q: Do I need PREHANDOVER_PROOF for documentation-only changes?

**A**: Recommended but not mandatory. If your change cannot fail in CI (pure markdown content update), PREHANDOVER_PROOF is optional. When uncertain, include it.

### Q: What if I can't run CI gates locally?

**A**: Use one of these methods:
1. **Simulate the gate logic** (read the workflow YAML and manually check conditions)
2. **Use preflight checklist** (see `governance/templates/PR_GATE_RELEASE_CHECKLIST_*.md`)
3. **Enumerate gates and explain validation approach** (document why you believe each gate will pass)

The goal is to demonstrate you evaluated gates **before handover**, not to perfectly replicate CI.

### Q: What if I discover a gate failure during preflight?

**A**: Fix it immediately and re-validate. Do NOT hand over with known gate failures. If the failure indicates a governance defect (gate misapplied, contradictory requirements), HALT and escalate to Governance Administrator.

### Q: What if CI fails after I provided PREHANDOVER_PROOF?

**A**: Perform root cause analysis:
1. Did I miss enumerating a gate? (Incomplete preflight)
2. Is there an environment difference? (Document for next time)
3. Is there a governance defect? (Escalate)

Document findings in incident report if pattern is systemic.

### Q: Can I use screenshots instead of text output?

**A**: Text output is strongly preferred (copy-paste from terminal). Screenshots are acceptable if terminal output is not available, but must be readable and include all relevant information (command, output, exit code, timestamp).

### Q: Should I embed governance artifacts in PREHANDOVER_PROOF or create separate files?

**A**: Either approach is acceptable:
- **Embedded** (in PREHANDOVER_PROOF): Best for smaller work units, simple changes, or when artifacts are concise
- **Separate files** (in `.agent-admin/`): Best for complex work units, large changes, or when artifacts need to be referenced independently

If using separate files, provide clear cross-references in the Embedded Governance Artifacts section. Consistency within a repository is recommended.

### Q: What if my work unit doesn't require all 4 governance artifacts?

**A**: All 4 artifacts (scan, risk, change, completion) are required for governance compliance. However:
- For **simple changes**, artifacts may be brief (1-2 paragraphs each)
- For **documentation-only changes**, focus may shift (e.g., lower risk, minimal change complexity)
- **Never skip artifacts** — brevity is acceptable, absence is not

### Q: How do I know if CST validation is required for my work unit?

**A**: Use the CST Decision Framework in the template:
- **CST Required** if: Multiple subwaves integrate, architectural boundaries crossed, or integration failure cost is high
- **CST Not Required** if: Isolated work, no architectural boundaries, or governance-only changes

When uncertain, consult `governance/canon/COMBINED_TESTING_PATTERN.md` Section 4.2 or ask your Foreman.

### Q: What if CST was identified in wave planning but I'm only doing a small subwave?

**A**: CST validation may be deferred to a convergence checkpoint (not every subwave PR):
- Document in **CST Not Required** section: "CST checkpoint planned for [future milestone]"
- Reference wave planning documents showing CST checkpoint location
- Include: "This subwave completes in isolation; CST validation occurs at [checkpoint]"

CST is checkpoint-based, not every-PR-based.

---

## Related Documents

- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — Full protocol specification and governance artifacts requirements
- `governance/canon/COMBINED_TESTING_PATTERN.md` — CST and CWT validation requirements
- `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md` — Agent contract authority and modification protocol
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Preflight obligation foundation
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` — Integration with layer-down process
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_*.md` — Role-specific gate checklists

---

**Status**: Active Template  
**Version**: 2.0.0  
**Last Updated**: 2026-01-13  
**Authority**: EXECUTION_BOOTSTRAP_PROTOCOL.md v2.0.0+, COMBINED_TESTING_PATTERN.md v1.0.0  
**Owner**: Governance Administrator

**Changelog**:
- **v2.0.0** (2026-01-13): Added Embedded Governance Artifacts section and CST Validation Attestation section per Subwave 3.3 learnings
- **v1.0.0** (2026-01-11): Initial template creation with core PREHANDOVER_PROOF sections

---

*End of PREHANDOVER_PROOF Template*
