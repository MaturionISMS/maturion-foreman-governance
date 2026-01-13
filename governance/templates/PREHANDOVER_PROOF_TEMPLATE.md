# PREHANDOVER_PROOF Template

**Purpose**: Standard template for documenting execution verification before PR handover.  
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

---

## Related Documents

- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — Full protocol specification
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Preflight obligation foundation
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` — Integration with layer-down process
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_*.md` — Role-specific gate checklists

---

**Status**: Active Template  
**Authority**: EXECUTION_BOOTSTRAP_PROTOCOL.md  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-11

---

*End of PREHANDOVER_PROOF Template*
