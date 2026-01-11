# Execution Bootstrap Protocol Monitoring - Implementation Guide

## Document Purpose

This guide provides step-by-step instructions for setting up local monitoring of Execution Bootstrap Protocol compliance in application repositories (foreman-office-app, PartPulse, R_Roster, etc.).

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL_MONITORING_AND_ENFORCEMENT.md`  
**Audience**: Governance Liaisons, FM Agents, Repository Administrators  
**Version**: 1.0.0  
**Date**: 2026-01-11

---

## Prerequisites

Before implementing monitoring in your repository, ensure:

- [x] Execution Bootstrap Protocol has been layered down (ripple complete)
- [x] FM agent contract includes PREHANDOVER_PROOF obligations
- [x] All builder agent contracts include PREHANDOVER_PROOF obligations
- [x] GOVERNANCE_ALIGNMENT.md exists and is up to date
- [x] Repository participates in governed build execution

---

## Step 1: Establish Incident Tracking Directory

### 1.1 Create Directory Structure

```bash
cd [your-repository-root]
mkdir -p governance/incidents/protocol-violations
```

### 1.2 Create README

Create `governance/incidents/protocol-violations/README.md`:

```markdown
# Execution Bootstrap Protocol Violations

This directory tracks all violations of the Execution Bootstrap Protocol in this repository.

**Protocol Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` (maturion-foreman-governance)

**Monitoring Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL_MONITORING_AND_ENFORCEMENT.md`

## Violation Recording

All protocol violations MUST be recorded here with incident ID: `PV-[YYYY-MM-DD]-[REPO]-[PR-NUMBER]`

See template: `governance/templates/PROTOCOL_VIOLATION_INCIDENT_TEMPLATE.md` (maturion-foreman-governance)

## Severity Levels

- **CRITICAL**: Escalate immediately to Maturion
- **HIGH**: Escalate to Governance Administrator
- **MEDIUM**: Track and remediate locally
- **LOW**: Document and guide

## Quarterly Reporting

Violations are aggregated for quarterly monitoring reports submitted to maturion-foreman-governance.

**Next Report Due**: [Date from monitoring protocol]
```

### 1.3 Create Violation Template (Optional)

Optionally create a local copy of the violation incident template for convenience:

```bash
# Reference from governance repository
cp [path-to-governance-repo]/governance/templates/PROTOCOL_VIOLATION_INCIDENT_TEMPLATE.md \
   governance/incidents/protocol-violations/TEMPLATE.md
```

---

## Step 2: Set Up Local Tracking Spreadsheet

### 2.1 Create Tracking File

Create `governance/incidents/protocol-violations/TRACKING.md`:

```markdown
# Protocol Violation Tracking - [Repository Name]

**Current Quarter**: Q[X] [YEAR]  
**Last Updated**: [YYYY-MM-DD]

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Violations This Quarter | [X] |
| CRITICAL | [X] |
| HIGH | [X] |
| MEDIUM | [X] |
| LOW | [X] |
| Resolved | [X] |
| Open | [X] |

## Violations List

| ID | Date | PR | Agent | Severity | Type | Status |
|----|------|----|----|----------|------|--------|
| [ID] | [Date] | [#XXX] | [Agent] | [SEV] | [Type] | [OPEN/RESOLVED] |

## Quarterly Summary

**Compliance Rate**: [XX]% ([X] compliant PRs / [X] total requiring proof)

**Top Issues**:
1. [Issue type] - [X] occurrences
2. [Issue type] - [X] occurrences
3. [Issue type] - [X] occurrences
```

### 2.2 Update Weekly

- Review new FM and Builder PRs each week
- Check for PREHANDOVER_PROOF compliance
- Record any violations immediately
- Update summary statistics

---

## Step 3: Implement Weekly PR Review Process

### 3.1 Set Up Review Checklist

Create or update `.github/PULL_REQUEST_TEMPLATE.md` to remind agents:

```markdown
## Pre-Submission Checklist

**For FM and Builder PRs requiring execution verification**:
- [ ] PREHANDOVER_PROOF included in description (see governance/templates/PREHANDOVER_PROOF_TEMPLATE.md)
- [ ] All 6 sections complete (Artifacts, Execution, Gates, Exit Codes, Timestamp, Guarantee)
- [ ] All gates enumerated and validated
- [ ] All exit codes are 0
- [ ] CI will confirm success (not discover failures)

**Authority**: Execution Bootstrap Protocol (maturion-foreman-governance)
```

### 3.2 Weekly Review Script (Optional)

Create `.github/scripts/weekly-protocol-review.sh`:

```bash
#!/bin/bash
# Weekly review of PR compliance with Execution Bootstrap Protocol
# Run manually each week during monitoring period

REPO_NAME=$(basename "$(git rev-parse --show-toplevel)")
WEEK_START=$(date -d "last Monday" +%Y-%m-%d)
WEEK_END=$(date -d "next Sunday" +%Y-%m-%d)

echo "=== Execution Bootstrap Protocol Weekly Review ==="
echo "Repository: $REPO_NAME"
echo "Week: $WEEK_START to $WEEK_END"
echo ""

# Get PRs created this week
echo "PRs created this week:"
gh pr list --state all --limit 100 --json number,title,author,createdAt,body \
  --jq ".[] | select(.createdAt >= \"$WEEK_START\" and .createdAt <= \"$WEEK_END\") | 
  \"#\(.number) - \(.title) by \(.author.login) - \(if (.body | contains(\"PREHANDOVER_PROOF\")) then \"✅ HAS PROOF\" else \"❌ NO PROOF\" end)\""

echo ""
echo "Next steps:"
echo "1. Review each PR for PREHANDOVER_PROOF compliance"
echo "2. Record violations in governance/incidents/protocol-violations/"
echo "3. Update TRACKING.md"
echo "4. Notify agents of violations (if any)"
```

Make executable:
```bash
chmod +x .github/scripts/weekly-protocol-review.sh
```

### 3.3 Manual Review Process

**Every Week**:
1. Run weekly review script (or manually list recent PRs)
2. For each FM/Builder PR:
   - Check if PREHANDOVER_PROOF required (execution-related change?)
   - Check if PREHANDOVER_PROOF present
   - Check if PREHANDOVER_PROOF complete (all 6 sections)
   - Validate gate enumeration (compare to CI workflow triggers)
3. Record violations immediately
4. Notify agent if violation found

---

## Step 4: Configure CI Validation (Optional)

### 4.1 Add PREHANDOVER_PROOF Validation to CI

Create `.github/workflows/prehandover-proof-validation.yml`:

```yaml
name: PREHANDOVER_PROOF Validation

on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  validate-prehandover-proof:
    name: Validate PREHANDOVER_PROOF
    runs-on: ubuntu-latest
    
    steps:
      - name: Check out code
        uses: actions/checkout@v4
      
      - name: Download validation script
        run: |
          # Download from governance repository
          # Note: Requires governance repository to be public or appropriate access configured
          curl -O https://raw.githubusercontent.com/APGI-cmy/maturion-foreman-governance/main/governance/templates/workflows/validate-prehandover-proof.sh || \
            echo "ERROR: Could not download validation script. Ensure governance repository is accessible." && exit 1
          chmod +x validate-prehandover-proof.sh
      
      - name: Get PR body
        id: pr
        uses: actions/github-script@v7
        with:
          script: |
            const pr = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.payload.pull_request.number
            });
            return pr.data.body || '';
      
      - name: Validate PREHANDOVER_PROOF
        run: |
          echo "${{ steps.pr.outputs.result }}" > pr_body.txt
          
          # Determine if PREHANDOVER_PROOF required
          # Check if PR modifies execution-related files (code, workflows, configs)
          REQUIRES_PROOF=false
          
          # Check for execution-related file extensions
          # Covers: workflows, code files, configs, scripts, tests
          if git diff --name-only origin/${{ github.base_ref }}...HEAD | \
             grep -qE '\.(yml|yaml|ts|tsx|js|jsx|py|go|rs|java|sh|bash|json|toml|lock|sql|tf|hcl)$' || \
             git diff --name-only origin/${{ github.base_ref }}...HEAD | \
             grep -qE '\.github/(workflows|agents)/'; then
            REQUIRES_PROOF=true
          fi
          
          # For comprehensive check, see EXECUTION_BOOTSTRAP_PROTOCOL.md Section 2
          
          if [ "$REQUIRES_PROOF" = "true" ]; then
            echo "PR requires PREHANDOVER_PROOF - validating..."
            ./validate-prehandover-proof.sh --require-proof pr_body.txt
          else
            echo "PR does not require PREHANDOVER_PROOF (documentation-only)"
            ./validate-prehandover-proof.sh pr_body.txt
          fi
```

**Note**: This workflow is OPTIONAL. Manual review is the primary enforcement mechanism during bootstrap.

---

## Step 5: Establish Quarterly Reporting Process

### 5.1 Prepare Data Collection for Quarterly Reports

At the end of each quarter, collect:

**Compliance Metrics**:
- Total FM PRs created
- FM PRs requiring PREHANDOVER_PROOF
- FM PRs with PREHANDOVER_PROOF (count)
- Total Builder PRs created (per builder)
- Builder PRs requiring PREHANDOVER_PROOF (per builder)
- Builder PRs with PREHANDOVER_PROOF (per builder)

**Effectiveness Metrics**:
- Total CI runs for PRs with PREHANDOVER_PROOF
- CI failures for PRs with PREHANDOVER_PROOF
- Total CI runs for PRs without PREHANDOVER_PROOF
- CI failures for PRs without PREHANDOVER_PROOF
- Issues caught in preflight (manual count from PREHANDOVER_PROOF)
- Issues discovered in CI (manual count from CI failures)

**Violation Metrics**:
- All violations from `governance/incidents/protocol-violations/TRACKING.md`
- Violations by severity
- Violations by agent
- Resolution status

### 5.2 Submit Quarterly Data

**Deadline**: Within 2 weeks after quarter end

**Submission Method**: 
1. Create summary report in your repository: `governance/reports/EXECUTION_BOOTSTRAP_PROTOCOL_COMPLIANCE_Q[X]-[YEAR].md`
2. Submit data to maturion-foreman-governance via:
   - GitHub Issue in governance repository (recommended)
   - PR to update ripple tracking document
   - Email to Governance Administrator (bootstrap mode)

**Report Contents** (use template):
- Repository name and quarter
- Compliance metrics summary
- Violations summary
- Notable issues or patterns
- Recommendations for next quarter

---

## Step 6: Agent Notification and Training

### 6.1 Violation Notification Process

**When violation detected**:

1. **Create Incident Record**:
   ```bash
   # Create file governance/incidents/protocol-violations/PV-YYYY-MM-DD-REPO-PR.md
   # Use template from Step 1.3
   ```

2. **Notify Agent** (comment on PR):
   ```markdown
   ## Protocol Violation Detected
   
   **Violation**: [Type, e.g., "PR merged without required PREHANDOVER_PROOF"]
   **Severity**: [MEDIUM]
   **Incident ID**: PV-[YYYY-MM-DD]-[REPO]-[PR]
   
   **Required Action**:
   - Review Execution Bootstrap Protocol: [link to governance canon]
   - Review PREHANDOVER_PROOF template: [link to template]
   - Apply protocol to all future PRs
   
   **Escalation**: If unclear, see [escalation guide link]
   
   This violation has been recorded in governance/incidents/protocol-violations/.
   ```

3. **Update Tracking**: Record in TRACKING.md

4. **Follow Up**: Monitor next PR from agent for compliance

### 6.2 Training Materials

Provide agents with:
- Link to `EXECUTION_BOOTSTRAP_PROTOCOL.md` in governance repository
- Link to `PREHANDOVER_PROOF_TEMPLATE.md`
- Link to `EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md` (examples)
- Link to `EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md` (when to escalate)

Create local onboarding document: `governance/onboarding/EXECUTION_VERIFICATION_QUICK_START.md`

---

## Step 7: Continuous Improvement

### 7.1 Monthly Review

**Mid-Quarter** (Month 2 of each quarter):
- Review TRACKING.md statistics
- Identify common violation patterns
- Update training materials if needed
- Check for governance defects (protocol unclear?)
- Adjust local processes if needed

### 7.2 Pattern Detection

If you observe:
- **Same violation type ≥3 times**: Document pattern and escalate to Governance Administrator
- **Agent with ≥2 violations**: Mandatory training required
- **Protocol ambiguity**: Escalate for clarification

### 7.3 Quarterly Retrospective

After each quarterly report:
- Review what went well
- Identify process improvements
- Update local monitoring processes
- Share learnings with governance repository

---

## Monitoring Checklist (Quick Reference)

**Weekly**:
- [ ] Review new FM and Builder PRs
- [ ] Check PREHANDOVER_PROOF compliance
- [ ] Record violations immediately
- [ ] Update TRACKING.md

**Monthly**:
- [ ] Review compliance trends
- [ ] Identify patterns
- [ ] Update training materials if needed

**Quarterly**:
- [ ] Collect all metrics
- [ ] Prepare compliance report
- [ ] Submit to governance repository by deadline
- [ ] Conduct retrospective
- [ ] Plan improvements for next quarter

---

## Troubleshooting

### Q: How do I know if a PR requires PREHANDOVER_PROOF?

**A**: PREHANDOVER_PROOF is REQUIRED if the PR:
- Modifies workflows (`.github/workflows/*.yml`)
- Modifies agent contracts (`.github/agents/*.md`)
- Modifies code files (`.ts`, `.tsx`, `.js`, `.jsx`, etc.)
- Modifies configuration affecting CI/builds
- Could fail in CI

**OPTIONAL** (but recommended) for:
- Pure documentation (`.md` content only, no structure)
- Learning promotion entries
- Incident reports

**When in doubt, require it.**

---

### Q: What if an agent doesn't know how to create PREHANDOVER_PROOF?

**A**: Point them to:
1. Template: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
2. Reference implementations: `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md`
3. Escalation guide: `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md`

Offer to review draft PREHANDOVER_PROOF before submission.

---

### Q: What if CI fails despite PREHANDOVER_PROOF showing all GREEN?

**A**: This indicates either:
1. **Incomplete preflight validation** (agent missed a gate or check)
2. **Governance defect** (gate misapplied or environment difference)

**Action**:
- Record as violation (HIGH severity if production impact)
- Perform root cause analysis
- If governance defect, escalate immediately to Governance Administrator
- Do NOT blame agent if governance is defective

---

### Q: How do I escalate violations?

**A**: See `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_ESCALATION.md` in governance repository

**Quick guide**:
- **LOW/MEDIUM violations**: Handle locally with agent notification
- **HIGH violations**: Create GitHub Issue in governance repository, tag Governance Administrator
- **CRITICAL violations**: Immediate escalation to Maturion (Johan Ras in bootstrap)

---

## Support and Resources

**Questions or Issues**:
- Create issue in maturion-foreman-governance repository
- Tag: `execution-bootstrap-protocol`, `monitoring`
- Mention: @governance-administrator (or FM in bootstrap)

**Additional Resources**:
- Canonical Protocol: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
- Monitoring Protocol: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL_MONITORING_AND_ENFORCEMENT.md`
- All templates: `governance/templates/` in governance repository

---

**Implementation Status**: [PENDING / IN PROGRESS / COMPLETE]  
**Implemented By**: [Name]  
**Implementation Date**: [YYYY-MM-DD]  
**Guide Version**: 1.0.0  
**Last Updated**: 2026-01-11

---

*End of Execution Bootstrap Protocol Monitoring Implementation Guide*
