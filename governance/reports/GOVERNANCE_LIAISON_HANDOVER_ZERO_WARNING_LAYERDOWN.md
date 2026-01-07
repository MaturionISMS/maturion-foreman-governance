# Governance Liaison Handover Instructions
## Zero-Warning/Test-Debt Policy Alignment Layer-Down

**Date**: 2026-01-07  
**From**: Governance Administrator  
**To**: Governance Liaison (FM Repository)  
**Priority**: HIGH  
**Action Required**: Layer-down governance canon updates to FM repository

---

## Purpose

This handover instructs the Governance Liaison to layer down the zero-warning/test-debt policy alignment from the governance repository to the FM Office App repository, updating agent contracts and creating necessary infrastructure.

---

## Context

The governance canon has been comprehensively updated to make the doctrine of **"Zero warnings and zero test debt – all must be immediately remedied before downstream work proceeds"** explicit, aligned, and non-optional.

**Key Updates**:
- QA_POLICY_MASTER.md Section 3.3: Warning Discovery Blocker Protocol
- FM_PREAUTH_CHECKLIST_CANON.md Section 2.6: Warning Status Validation
- ESCALATION_POLICY.md: Warning discovery escalation trigger
- BUILDER_QA_HANDOVER_POLICY.md Section 8.4: Warning discovery during execution
- PR_GATE_FAILURE_HANDLING_PROTOCOL.md Section 5.10: UNRESOLVED_WARNINGS classification
- NEW: WARNING_DISCOVERY_BLOCKER_PROTOCOL.md comprehensive canon
- NEW: Three warning report schemas

**See**: `governance/reports/ZERO_WARNING_RIPPLE_NOTIFICATION.md` for complete change summary

---

## Layer-Down Tasks

### Task 1: Update ForemanApp Agent Contract

**File**: `.github/agents/ForemanApp-agent.md`

**Required Updates**:

#### 1.1 Add Warning Status Validation to Planning Responsibilities

Find the section describing FM planning responsibilities and add:

```markdown
### Warning Status Validation (Mandatory Before Authorization)

Before authorizing ANY wave or subwave, FM MUST execute Section 2.6 of FM_PREAUTH_CHECKLIST_CANON.md (Warning Status Validation):

1. **Verify Prior Work Warning Status**
   - ALL previous waves/subwaves have zero unresolved warnings
   - CI build logs from previous waves show zero warnings (or all whitelisted)
   - No warning accumulation across waves
   - Latest merged commits from previous work are warning-free

2. **Review Warning Whitelist** (if exists)
   - All whitelisted warnings have valid justification
   - All whitelisted warnings have resolution plans
   - No expired whitelist entries
   - Whitelist not growing unbounded

3. **Validate Warning Discovery Protocol Ready**
   - Agent contracts include warning discovery obligations
   - Escalation path for warning discovery is clear
   - Warning Discovery Report schemas available

**If Section 2.6 validation FAILS, FM MUST NOT authorize downstream work until warnings remediated.**

**Reference**: governance/canon/FM_PREAUTH_CHECKLIST_CANON.md Section 2.6  
**Reference**: governance/canon/WARNING_DISCOVERY_BLOCKER_PROTOCOL.md
```

---

#### 1.2 Add Warning Discovery Escalation Obligations

Find the section describing FM escalation responsibilities and add:

```markdown
### Warning Discovery Escalation (Mandatory Response)

When FM receives a WARNING_DISCOVERY_REPORT from any agent:

**FM MUST**:
1. **ACKNOWLEDGE IMMEDIATELY** (within 1 execution session)
   - Confirm receipt of WARNING_DISCOVERY_REPORT
   - Acknowledge discovering agent's work is BLOCKED
   - Commit to resolution timeline

2. **IDENTIFY RESPONSIBLE AGENT**
   - Determine which job/wave/subwave introduced warnings
   - Identify agent that executed that work
   - Review agent's handover reports for accuracy

3. **RE-ASSIGN ORIGINAL AGENT AS BLOCKER**
   - Re-assign original agent to remediate warnings
   - Mark as BLOCKER priority (higher than normal work)
   - Provide warning discovery report as evidence
   - Set clear acceptance criteria: Zero warnings, verified by discovering agent

4. **MONITOR REMEDIATION**
   - Original agent generates WARNING_REMEDIATION_REPORT
   - Discovering agent verifies and generates WARNING_VERIFICATION_REPORT
   - Only when verified may agents resume work

5. **FORWARD-SCAN FOR PATTERN**
   - Scan ALL pending work for same warning pattern
   - Correct ALL instances before any further authorization
   - Document forward-scan results

**Reference**: governance/canon/WARNING_DISCOVERY_BLOCKER_PROTOCOL.md Section 3  
**Reference**: governance/escalation/ESCALATION_POLICY.md (reactive escalation: warning discovery)
```

---

### Task 2: Update Builder Agent Contracts

**Files**: `.github/agents/*-builder.md` (all builder contracts: ui-builder, api-builder, etc.)

**Required Updates**:

#### 2.1 Add Warning Discovery Obligations Section

Add a new section to EVERY builder agent contract:

```markdown
## Warning and Test-Debt Discovery Obligations

When this agent discovers warnings or test debt from prior work:

### Discovery and Halt (Mandatory)
1. **IMMEDIATELY HALT current work**
   - Stop all implementation, testing, handover preparation
   - Do NOT work around warnings
   - Do NOT suppress or ignore warnings

2. **GENERATE WARNING_DISCOVERY_REPORT**
   - Document warning details (source, line, message, severity)
   - Document suspected origin (which job/wave/subwave)
   - Document impact on current work
   - Use schema: `governance/schemas/WARNING_DISCOVERY_REPORT.schema.md`

3. **ESCALATE TO FOREMAN**
   - Submit WARNING_DISCOVERY_REPORT
   - Request blocker resolution before resuming
   - Provide evidence (CI logs, build logs, screenshots)

4. **BLOCK HANDOVER until warnings remediated**
   - Declare current work BLOCKED
   - Do NOT declare READY_FOR_MERGE
   - Wait for FM to re-assign original agent

5. **VERIFY REMEDIATION after original agent fixes**
   - Re-validate warnings are resolved
   - Generate WARNING_VERIFICATION_REPORT
   - Only then may resume work

### Prohibited Actions
- ❌ Proceeding with work despite unresolved warnings
- ❌ Suppressing warnings without escalation
- ❌ Claiming "not my responsibility" and continuing
- ❌ Working around warnings instead of escalating
- ❌ Handing over with unresolved prior warnings

### If This Agent is the Original Responsible Agent
When re-assigned to remediate warnings this agent introduced:
- ACCEPT re-assignment as BLOCKER priority
- REMEDIATE all warnings from WARNING_DISCOVERY_REPORT
- GENERATE WARNING_REMEDIATION_REPORT with evidence
- SUBMIT for verification by discovering agent

Discovery of warnings from prior work is a BLOCKER requiring original agent re-assignment and remediation before downstream work may proceed.

**Reference**: governance/canon/WARNING_DISCOVERY_BLOCKER_PROTOCOL.md  
**Reference**: governance/policy/BUILDER_QA_HANDOVER_POLICY.md Section 8.4  
**Reference**: governance/policy/QA_POLICY_MASTER.md Section 3.3
```

---

### Task 3: Create Warning Evidence Directory Structure

**Location**: Repository root

**Required Directories**:
```
/governance/
  /evidence/
    /warnings/
      /discovery/      (stores WARNING_DISCOVERY_REPORT files)
      /remediation/    (stores WARNING_REMEDIATION_REPORT files)
      /verification/   (stores WARNING_VERIFICATION_REPORT files)
      /forward-scan/   (stores forward-scan execution logs)
  /qa/
    warning-whitelist.json (initially empty file)
```

**Action**:
1. Create directory structure as shown above
2. Create empty `warning-whitelist.json` with initial structure:
   ```json
   {
     "schemaVersion": "1.0.0",
     "lastReviewed": "2026-01-07",
     "entries": []
   }
   ```
3. Add `.gitkeep` files to empty directories to ensure they're tracked
4. Commit structure with message: "Initialize warning evidence infrastructure per governance canon"

---

### Task 4: Update CI/CD Workflows (RECOMMENDED)

**File**: `.github/workflows/ci.yml` (or equivalent CI workflow)

**Recommended Addition** (not mandatory but strongly recommended):

Add a linter step that fails on ANY warnings:

```yaml
- name: Run Linter (Zero-Warning Policy)
  run: |
    npm run lint
    # Fail if linter reports any warnings
    if npm run lint 2>&1 | grep -i "warning"; then
      echo "❌ FAILED: Warnings detected (violates zero-warning policy)"
      echo "See governance/canon/QA_POLICY_MASTER.md Section 3.3"
      exit 1
    fi
```

**Benefit**: Catches warnings automatically before PR merge, enforces zero-warning policy

---

### Task 5: Update QA Suite (RECOMMENDED)

**Files**: Test suite configuration files

**Recommended Updates**:

1. **Add Warning Count to QA Report**
   - Update test suite to capture warning count
   - Include warning count in BUILD_QA_REPORT.json
   - Gate can validate warningCount === 0

2. **Add Linter Check to QA Suite**
   - Include `npm run lint` (or equivalent) in QA execution
   - Treat warnings as QA failures
   - Document in QA report if warnings found

---

### Task 6: Update Documentation (If Local Docs Exist)

**Files**: Any local governance or QA documentation

**Updates Needed**:
- Reference WARNING_DISCOVERY_BLOCKER_PROTOCOL.md
- Document warning whitelist process
- Document evidence directory structure
- Link to schemas for warning reports

---

## Acceptance Criteria

Layer-down is complete when:
- ✅ ForemanApp-agent.md updated with Section 2.6 validation and warning escalation
- ✅ ALL builder agent contracts updated with warning discovery obligations
- ✅ Warning evidence directory structure created
- ✅ warning-whitelist.json file created (empty initially)
- ✅ .gitkeep files added to empty directories
- ✅ All changes committed to repository
- ✅ OPTIONAL: CI updated with linter check
- ✅ OPTIONAL: QA suite updated to include warning detection
- ✅ Handover completion report generated

---

## Timeline

**Target Completion**: Within 1 week of receiving this handover

**Priority Sequence**:
1. Task 1 & 2 (agent contracts) - HIGHEST PRIORITY
2. Task 3 (directory structure) - HIGH PRIORITY
3. Task 4 & 5 (CI/QA) - RECOMMENDED (can be done later)
4. Task 6 (docs) - LOWEST PRIORITY

---

## Validation

After completion, Governance Liaison SHOULD:
1. Generate handover completion report
2. Confirm all agent contracts updated
3. Confirm directory structure exists
4. Provide evidence (commit SHAs, file paths)
5. Notify Governance Administrator of completion

---

## Support and Questions

**For Questions About**:
- **Policy Intent**: Contact Governance Administrator (this repository)
- **Agent Contract Language**: Use templates provided in this document
- **Schema Usage**: Reference schemas in governance/schemas/
- **Implementation Issues**: Escalate to Governance Administrator

**For Blockers**:
- Escalate immediately to Governance Administrator
- Do not proceed with partial layer-down
- Do not modify governance canon language (use as-is)

---

## References

**Governance Canon**:
- `governance/canon/WARNING_DISCOVERY_BLOCKER_PROTOCOL.md` (comprehensive protocol)
- `governance/canon/QA_POLICY_MASTER.md` Section 3.3 (core policy)
- `governance/canon/FM_PREAUTH_CHECKLIST_CANON.md` Section 2.6 (FM validation)
- `governance/policy/BUILDER_QA_HANDOVER_POLICY.md` Section 8.4 (builder obligations)
- `governance/escalation/ESCALATION_POLICY.md` (warning discovery trigger)

**Schemas**:
- `governance/schemas/WARNING_DISCOVERY_REPORT.schema.md`
- `governance/schemas/WARNING_REMEDIATION_REPORT.schema.md`
- `governance/schemas/WARNING_VERIFICATION_REPORT.schema.md`

**Ripple Notification**:
- `governance/reports/ZERO_WARNING_RIPPLE_NOTIFICATION.md` (complete change summary)

---

**Document Authority**: Governance Administrator  
**Approval**: Governance Administrator  
**Effective Date**: 2026-01-07  
**Action Required**: Layer-down to FM repository per tasks above
