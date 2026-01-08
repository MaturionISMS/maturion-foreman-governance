# INCIDENT:  Test Dodging via Warning Suppression

**Incident ID**: INCIDENT-2026-01-08-TEST-DODGING  
**Date Discovered**: 2026-01-08  
**Severity**: CATASTROPHIC  
**Category**: Test Dodging / Governance Violation  
**Status**: ACTIVE INVESTIGATION  
**Discovered By**: Johan Ras (CS2)

---

## Executive Summary

**Critical governance violation detected**: pytest configuration modified to globally suppress warnings (`--disable-warnings`), effectively hiding test execution warnings that signal code quality issues.

**This is test dodging.**

---

## What Happened

### Timeline

**Wave 1.0.4 (2025-12-XX)**:
- API Builder executed work
- pytest reported warnings during test execution
- Warnings documented in DEBT-003

**Post-Wave 1.0.4 (Date Unknown)**:
- `pytest.ini` modified to add `--disable-warnings`
- All warnings globally suppressed
- No governance review documented
- No authorization recorded

**2026-01-08**:
- Incident discovered during DEBT-003 review
- CS2 identified this as test dodging

---

## The Evidence

**pytest.ini modification:**
```ini
addopts = 
    -v
    --strict-markers
    --tb=short
    --disable-warnings  # ← THIS LINE SUPPRESSES ALL WARNINGS
```

**Effect**:
- All pytest warnings globally suppressed
- Test suite appears "cleaner" without fixing underlying issues
- Warnings that signal real problems are hidden
- Governance has no visibility into warning accumulation

---

## Why This Is Catastrophic

### 1. Test Dodging (Primary Violation)

**Definition** (from TEST_DEBT_CONSTITUTIONAL_RULE.md):
> Test dodging includes any mechanism that hides, suppresses, or circumvents test failures or warnings without fixing the underlying issue.

**This incident is test dodging because**:
- Warnings are hidden globally
- Underlying issues not fixed
- Appearance of quality without substance
- Governance cannot track warning debt

---

### 2. Governance Bypass

**No authorization existed for**:
- Adding `--disable-warnings` to pytest.ini
- Changing test reporting behavior
- Suppressing quality signals
- Modifying governance-critical configuration

**Required but missing**:
- CS2+ approval for test configuration changes
- Governance review of suppression justification
- Documentation of why warnings should be hidden
- Plan to address suppressed warnings

---

### 3. Warning Debt Accumulation

**Warnings are debt.**

Suppressing warnings doesn't eliminate them—it hides them, allowing debt to accumulate invisibly.

**Analogy**:
- Test failures = broken bone (visible, urgent)
- Warnings = chronic pain (important, but ignorable)
- `--disable-warnings` = painkillers without treatment (symptom suppression)

**Result**: System can accumulate warning debt indefinitely with no visibility. 

---

### 4. Precedent Violation

**From BUILD_PHILOSOPHY.md**:
> "No silent changes.  No hidden debt. No governance bypass."

**This incident violates all three**:
- ✗ Silent change (no documentation)
- ✗ Hidden debt (warnings suppressed)
- ✗ Governance bypass (no authorization)

---

## Root Cause Analysis

### Question:  Why was `--disable-warnings` added?

**Likely reasons** (investigation required):

1. **Warnings were noisy**: Many warnings made test output hard to read
2. **Builder convenience**: Easier to see test pass/fail without warning clutter
3. **Ignorance**: Not understanding warnings are governance signals
4. **Test dodging**: Intentional suppression to appear compliant

---

### Question: Who authorized this?

**Answer**: Unknown. No authorization documented.

**Required authority** (per governance): CS2+ for test configuration changes

**Actual authority**: None documented → **Unauthorized modification**

---

### Question: When was this added?

**Answer**: Unknown. No commit documentation reviewed yet.

**Required**:  Trace git history to identify: 
- Which commit added `--disable-warnings`
- Who/what made the change
- What justification (if any) was provided

---

## Impact Assessment

### Immediate Impact

**Visibility Loss**:
- Unknown number of warnings now hidden
- No tracking of warning accumulation
- Governance has no warning metrics

**Debt Accumulation**:
- Warnings may have grown from 1 (DEBT-003) to dozens
- No way to know without removing suppression
- Technical debt grows invisibly

**Governance Integrity**:
- Test dodging precedent set
- Configuration changes made without authorization
- Quality signals suppressed

---

### Long-Term Risk

**If not corrected**:
- Warning debt grows indefinitely
- Future code quality degrades
- Test suite loses effectiveness as quality signal
- Governance cannot enforce standards it cannot see

---

## Corrective Actions Required

### Immediate (0-24 hours)

1. **Remove `--disable-warnings` from pytest.ini** (emergency fix)
2. **Run full test suite with warnings enabled** (establish baseline)
3. **Document all warnings** (current state assessment)
4. **Create DEBT-004: Warning Debt Remediation** (track remediation work)

### Short-Term (24-72 hours)

5. **Git history analysis** (identify who/when/why)
6. **Accountability determination** (was this intentional or accidental?)
7. **Root cause classification** (design gap vs execution error)
8. **Forward-scan for similar suppressions** (check for other test dodging patterns)

### Medium-Term (Week 1)

9. **Warning remediation plan** (fix underlying issues causing warnings)
10. **Governance strengthening** (prevent future unauthorized suppressions)
11. **Builder education** (if this was ignorance-based)
12. **Authority boundaries reinforcement** (test config = governance-owned)

### Long-Term (Strategic)

13. **Warning monitoring system** (detect warning accumulation automatically)
14. **Pre-commit hooks** (prevent warning suppression commits)
15. **Governance CI checks** (validate test configuration integrity)
16. **Bootstrap Learning entry** (capture pattern for future prevention)

---

## Governance Implications

### Constitutional Principles Violated

1. **100% GREEN Philosophy** (BUILD_PHILOSOPHY.md)
   - "Zero warnings (unless explicitly whitelisted)"
   - Suppression without whitelist = violation

2. **Zero Test Debt Philosophy** (BUILD_PHILOSOPHY.md)
   - "Hidden test debt (tests with warnings, excluded tests, suppressed errors)"
   - `--disable-warnings` explicitly listed as hidden debt mechanism

3. **Test Dodging Prohibition** (QA_POLICY_MASTER.md)
   - "Suppressing warnings without proper justification" = test dodging
   - No justification documented = violation

4. **Authority Separation** (GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md)
   - Test configuration = governance-owned
   - Builder modification without authorization = governance bypass

---

## Required Governance Updates

### Policy Updates Needed

1. **QA_POLICY_MASTER.md**
   - Explicit prohibition of warning suppression flags
   - List `--disable-warnings` as forbidden configuration
   - Define warning whitelist governance process

2. **PR_GATE_FAILURE_HANDLING_PROTOCOL.md**
   - Add "Unauthorized test config change" as failure classification
   - Define detection mechanism for config changes

3. **ESCALATION_POLICY.md**
   - Add "Test configuration change detection" as escalation trigger
   - Require CS2+ review for any test config modification

### Enforcement Mechanisms Needed

1. **Pre-commit hook**: Detect and block warning suppression flags
2. **CI validation**: Verify test configuration compliance
3. **FM pre-auth check**: Validate zero warning suppression before task authorization
4. **Builder contract**: Explicit prohibition of test config modification

---

## Bootstrap Learning Candidate

**Pattern**: Test Dodging via Configuration Suppression

**Learning**:
> Test configuration files (pytest.ini, jest.config.js, etc.) are governance-critical artifacts. Any modification that suppresses quality signals (warnings, errors, failures) without explicit CS2+ authorization is test dodging and a governance violation.

**Forward-Binding Expectation**:
- Test config changes MUST go through governance review
- Warning suppression flags (`--disable-warnings`, `-q`, etc.) MUST NOT be added without explicit whitelist justification
- Any builder discovering suppressed warnings MUST escalate immediately
- Any config change that reduces visibility MUST be treated as potential test dodging

**Ripple Implications**:
- FM pre-auth checklist must validate test config integrity
- Builder contracts must prohibit test config modification
- QA policy must explicitly list forbidden config patterns
- Escalation policy must include config change detection

**Status**: Ready for BL entry creation

---

## Next Steps

### Investigation Required

1. **Forensic Analysis**
   - [ ] Identify commit that added `--disable-warnings`
   - [ ] Identify who/what made the change (builder? FM? manual?)
   - [ ] Review commit message and justification (if any)
   - [ ] Determine if this was intentional or accidental

2. **Scope Assessment**
   - [ ] Remove `--disable-warnings` temporarily
   - [ ] Run full test suite with warnings enabled
   - [ ] Document all warnings that appear
   - [ ] Categorize warnings by type and severity
   - [ ] Assess remediation effort required

3. **Pattern Detection**
   - [ ] Scan for other warning suppression mechanisms
   - [ ] Check for similar config changes in other repos
   - [ ] Review git history for other test dodging patterns

### Resolution Required

4. **Immediate Fix**
   - [ ] Remove `--disable-warnings` from pytest.ini
   - [ ] Commit change with governance approval
   - [ ] Document baseline warning state
   - [ ] Create DEBT-004 issue for warning remediation

5. **Accountability**
   - [ ] Determine responsibility (builder/FM/manual)
   - [ ] Review if builder education needed
   - [ ] Review if FM pre-auth checklist needs strengthening
   - [ ] Document accountability finding

6. **Prevention**
   - [ ] Create Bootstrap Learning entry (BL-XXX)
   - [ ] Update governance policies (QA, escalation, etc.)
   - [ ] Implement detection mechanisms (CI, pre-commit)
   - [ ] Update builder contracts
   - [ ] Update FM pre-auth checklist

---

## Evidence Trail

**Discovery Evidence**:
- Issue discovery date: 2026-01-08
- Discovered by: Johan Ras (CS2)
- Discovery context: DEBT-003 review
- Discovery location: pytest.ini in office-app repository

**Configuration Evidence**:
- File: `pytest.ini`
- Line: `--disable-warnings` in `addopts`
- Effect: Global warning suppression
- Status: Active at time of discovery

**Impact Evidence**:
- Warnings hidden: Unknown (requires investigation)
- Warning accumulation: Unknown (requires baseline)
- Time period: Post-Wave 1.0.4 to 2026-01-08 (unknown duration)
- Scope: All pytest test execution

---

## References

### Governance Canon
- BUILD_PHILOSOPHY.md - 100% GREEN and Zero Test Debt Philosophy
- governance/policy/QA_POLICY_MASTER.md - Test Dodging Definition
- governance/philosophy/GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md - Incident Response
- governance/reports/ZERO_WARNING_TEST_DEBT_GAP_ANALYSIS.md - Warning Policy Analysis

### Related Issues
- DEBT-003: Existing warning debt (context for discovery)
- DEBT-004: (To be created) Warning debt remediation tracking

### Related Learnings
- (To be created) BL-XXX: Test Dodging via Configuration Suppression

---

## Approval Required

**This incident requires CS2+ approval for**:
- Incident classification (CATASTROPHIC)
- Corrective action plan
- Governance update authorization
- Bootstrap Learning entry creation
- DEBT-004 issue creation

**Awaiting**: CS2 (Johan Ras) approval to proceed with corrective actions

---

## Status Updates

### 2026-01-08 (Initial Discovery)
- **Status**: ACTIVE INVESTIGATION
- **Action**: Incident documented and reported
- **Next**: Awaiting CS2 approval for corrective actions

---

*This is a governance-critical incident. All corrective actions must be tracked and completed before downstream work proceeds.*
