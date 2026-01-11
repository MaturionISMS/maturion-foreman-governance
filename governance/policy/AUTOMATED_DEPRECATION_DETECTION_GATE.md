# AUTOMATED DEPRECATION DETECTION GATE

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Corporate Governance Canon  
Effective Date: 2026-01-11  
Triggered By: Wave 2.13 Builder Reflection (datetime.utcnow() deprecation discovery)  
Owner: Johan Ras (Maturion Engineering Leadership)  
Source Learning: BL-026

---

## 1. Purpose

This policy establishes a **mandatory automated deprecation detection gate** for technical debt prevention across all repositories in the Maturion Engineering Ecosystem.

Deprecation warnings represent future technical debt that:
- Will become breaking changes in future language/library versions
- Accumulate silently without active detection
- Require remediation waves if left unaddressed
- Violate the Zero Warning Test Debt mandate

This policy ensures that deprecation warnings are:
- Detected automatically before commit
- Blocked at CI/CD gates
- Remediated immediately or justified explicitly
- Never allowed to accumulate as technical debt

This policy is **normative and mandatory**.

---

## 2. Constitutional Authority

This policy derives authority from and implements:
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, Zero Technical Debt
- **QA_POLICY_MASTER.md Section 1.1.2** - Gate-Eligible Green requires zero warnings
- **CONSTITUTIONAL_SANDBOX_PATTERN.md (BL-024)** - Zero Test Debt Mandate (Constitutional Rule #2)
- **WARNING_DISCOVERY_BLOCKER_PROTOCOL.md** - Zero warnings doctrine enforcement
- **BOOTSTRAP_EXECUTION_LEARNINGS.md** - BL-026 documenting deprecation prevention learning

---

## 3. Core Principles

### 3.1 Proactive Prevention Over Reactive Remediation

**Deprecation warnings MUST be prevented from entering the codebase.**

Prevention mechanisms include:
- Pre-commit hooks with deprecation detection
- CI/CD pipeline deprecation checks
- Automated linting with deprecation rules
- Build-time deprecation scanning

**Rationale**: Preventing entry is cheaper and safer than remediation waves.

### 3.2 Zero Tolerance for Deprecation Debt

**All code changes MUST pass automated deprecation detection before merge.**

This mandate applies to:
- All application code
- All test code
- All build and deployment scripts
- All configuration files
- All dependencies and imports

**Exception**: Deprecated APIs may be used only with explicit justification and FM approval (see Section 5).

### 3.3 Language and Ecosystem Agnostic

This policy applies uniformly across all languages and ecosystems:
- Python (e.g., `datetime.utcnow()`, `asyncio.coroutine`, etc.)
- JavaScript/TypeScript (e.g., deprecated Node.js APIs, deprecated npm packages)
- Go (e.g., deprecated standard library functions)
- Java (e.g., `@Deprecated` annotations)
- Any other language used in Maturion repositories

**Implementation specifics vary by language; the mandate does not.**

### 3.4 Integration with Zero Warning Doctrine

Deprecation warnings are a subset of "warnings" as defined in QA_POLICY_MASTER.md.

Therefore:
- Deprecation warnings trigger WARNING_DISCOVERY_BLOCKER_PROTOCOL
- Gate-Eligible Green requires zero deprecation warnings
- Prior-work deprecations require original agent re-assignment
- All warning whitelist governance applies to deprecations

---

## 4. Mandatory Implementation Requirements

All repositories MUST implement deprecation detection at two enforcement points:

### 4.1 Pre-Commit Detection (Developer Machine)

**Requirement**: Integrate deprecation detection into pre-commit hooks.

**Purpose**: Provide immediate feedback before code is committed.

**Implementation by Language**:

#### Python
- Tool: `ruff` (recommended) or `pylint` with deprecation checks enabled
- Configuration: Enable `UP` rules (pyupgrade) in `ruff.toml`
- Hook: Block commit if deprecation warnings detected
- Example configuration:
  ```toml
  [tool.ruff]
  select = ["UP"]  # pyupgrade rules including deprecation detection
  ```

#### JavaScript/TypeScript
- Tool: ESLint with `deprecation` plugin
- Configuration: Enable `deprecation/deprecation` rule
- Hook: Block commit if deprecation warnings detected
- Example configuration:
  ```json
  {
    "plugins": ["deprecation"],
    "rules": {
      "deprecation/deprecation": "error"
    }
  }
  ```

#### Go
- Tool: `staticcheck` with deprecation checks
- Configuration: Enable `SA1019` (deprecated API usage)
- Hook: Block commit if deprecation warnings detected

#### Other Languages
- Use ecosystem-standard linting tools
- Enable all deprecation detection rules
- Configure as commit blocker

### 4.2 CI/CD Gate Detection (GitHub Actions)

**Requirement**: Execute deprecation detection in all PR workflows.

**Purpose**: Enforce policy regardless of local hook configuration.

**Implementation**:
- Add deprecation detection step to PR workflow
- Run with same tooling as pre-commit hooks
- Block PR merge if deprecation warnings detected
- Report findings clearly in PR check status

**Example GitHub Actions Step (Python)**:
```yaml
- name: Check for deprecation warnings
  run: |
    ruff check --select UP .
    if [ $? -ne 0 ]; then
      echo "::error::Deprecation warnings detected. See ruff output above."
      exit 1
    fi
```

**Gate Behavior**:
- ✅ PASS: Zero deprecation warnings detected
- ❌ FAIL: One or more deprecation warnings detected
- 🚫 BLOCKED: PR cannot merge until remediated or exception granted

---

## 5. Exception Process

### 5.1 When Exceptions Are Allowed

Exceptions to the zero-deprecation mandate may be granted ONLY when:

1. **No Alternative Exists**: The deprecated API is the only way to achieve required functionality
2. **Migration Not Yet Feasible**: Replacement API exists but migration is not practical in current context
3. **External Dependency**: Deprecation is in third-party code that cannot be immediately updated
4. **Planned Migration**: Migration is scheduled and tracked as technical debt

### 5.2 Exception Requirements

To use a deprecated API, the following is MANDATORY:

#### 5.2.1 Code Documentation
Add inline comment at each usage site:
```python
# DEPRECATION EXCEPTION: datetime.utcnow() usage approved
# Justification: Required for backward compatibility with legacy API
# Technical Debt: Issue #1234 - Migrate to timezone-aware datetime
# Approved By: FM (Johan Ras)
# Approval Date: 2026-01-11
# Target Remediation: Q1 2026
datetime.utcnow()
```

#### 5.2.2 Technical Debt Ticket
Create and link issue tracking:
- What is deprecated
- Why exception is needed
- Migration plan
- Target remediation date

#### 5.2.3 FM Approval
- Exception MUST be approved by FM before commit
- Approval must be documented in PR description
- Approval authority cannot be delegated to builders

#### 5.2.4 Whitelist Entry
Add to repository's deprecation whitelist file:
```yaml
# .deprecation-whitelist.yml
exceptions:
  - file: src/api/legacy_endpoints.py
    line: 42
    pattern: datetime.utcnow
    justification: Legacy API compatibility requirement
    ticket: "#1234"
    approved_by: FM
    approved_date: 2026-01-11
    target_remediation: 2026-03-31
```

### 5.3 Exception Review

All deprecation exceptions MUST be reviewed quarterly:
- Validate ticket is still tracked
- Verify remediation progress
- Escalate if target date exceeded
- Revoke exception if no longer justified

---

## 6. Enforcement and Compliance

### 6.1 Gate Behavior

When deprecation warnings are detected:

1. **Pre-Commit Hook**: Block commit with clear error message
2. **CI/CD Pipeline**: Fail PR check with deprecation details
3. **PR Review**: Gate flags deprecation violation
4. **Merge Authority**: PR blocked until remediated or exception granted

### 6.2 Violation Classification

Per PR_GATE_FAILURE_HANDLING_PROTOCOL.md, deprecation violations are classified as:

- **Category**: `UNRESOLVED_WARNINGS`
- **Severity**: BLOCKER (prevents merge)
- **Responsibility**: Builder who introduced deprecation
- **Resolution**: Remediate or obtain exception approval

### 6.3 Discovery of Prior Deprecations

If a builder discovers deprecation warnings from prior work:

**MANDATORY ACTION**: Follow WARNING_DISCOVERY_BLOCKER_PROTOCOL:
1. HALT current work immediately
2. Generate warning discovery report
3. Escalate to FM
4. FM re-assigns original builder
5. Original builder remediates as BLOCKER
6. Discovering builder resumes only after remediation

**Rationale**: Prevents building on unstable foundation.

---

## 7. Tooling Standards

### 7.1 Recommended Tools by Language

| Language | Tool | Configuration |
|----------|------|---------------|
| Python | ruff | `select = ["UP"]` |
| Python (alt) | pylint | Enable deprecation checks |
| JavaScript/TS | ESLint | `deprecation/deprecation` plugin |
| Go | staticcheck | Enable `SA1019` |
| Java | SpotBugs | Enable deprecation detector |
| C# | Roslyn Analyzers | Enable deprecation warnings |

### 7.2 Tool Configuration Requirements

All deprecation detection tools MUST:
- Run automatically (no manual invocation)
- Exit with non-zero code on detection
- Provide clear, actionable error messages
- Identify exact file, line, and deprecation reason
- Be version-controlled in repository

### 7.3 Minimum Detection Scope

Tools MUST detect:
- Deprecated functions and methods
- Deprecated classes and types
- Deprecated parameters and arguments
- Deprecated configuration options
- Deprecated import patterns
- Deprecated language features

---

## 8. Implementation Guidance

### 8.1 New Repository Setup

For new repositories:
1. Configure pre-commit hooks with deprecation detection (day 1)
2. Add CI/CD deprecation gate to PR workflow (day 1)
3. Create `.deprecation-whitelist.yml` template (day 1)
4. Document tools and configuration in README (day 1)

### 8.2 Existing Repository Migration

For existing repositories:
1. Audit codebase for existing deprecations
2. Create remediation plan (issue per deprecation)
3. Configure tooling (initially in audit-only mode)
4. Remediate all existing deprecations OR obtain exceptions
5. Enable blocking mode only after zero-deprecation state achieved
6. Add CI/CD gate enforcement

**Migration MUST NOT introduce new technical debt.**

### 8.3 Dependency Updates

When updating dependencies:
1. Check release notes for deprecations
2. Scan for new deprecation warnings before merge
3. Remediate or obtain exceptions before update completes
4. Update tests to reflect API changes

---

## 9. Benefits

### 9.1 Technical Debt Prevention
- Prevents deprecation debt from accumulating
- Eliminates need for remediation waves
- Reduces future maintenance burden

### 9.2 Proactive Quality Management
- Catches issues before they become breaking changes
- Provides early warning of required migrations
- Aligns with One-Time Build Law

### 9.3 Constitutional Compliance
- Implements Zero Warning Test Debt mandate (BL-024)
- Enforces Gate-Eligible Green requirements
- Integrates with existing warning governance

### 9.4 Future-Proofing
- Prepares codebase for language/library upgrades
- Reduces migration risk and cost
- Maintains compatibility with modern standards

---

## 10. Cross-References

### 10.1 Canonical Governance
- `BUILD_PHILOSOPHY.md` - One-Time Build Law, Zero Technical Debt
- `governance/policy/QA_POLICY_MASTER.md` - Gate-Eligible Green definition
- `governance/canon/CONSTITUTIONAL_SANDBOX_PATTERN.md` - Zero Test Debt Mandate (BL-024)
- `governance/canon/WARNING_DISCOVERY_BLOCKER_PROTOCOL.md` - Warning enforcement
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` - BL-026 source learning
- `governance/policy/PR_GATE_FAILURE_HANDLING_PROTOCOL.md` - Violation handling

### 10.2 Implementation References
- Wave 2.13 Builder Reflection - datetime.utcnow() deprecation discovery
- Python PEP-604 - Type union deprecation example
- QA_POLICY_MASTER Section 3.2.2 - Warning whitelisting governance

### 10.3 Related Protocols
- WARNING_DISCOVERY_BLOCKER_PROTOCOL - Prior work warning handling
- BUILDER_QA_HANDOVER_POLICY - Zero test debt pre-conditions
- FM_PREAUTH_CHECKLIST_CANON - Warning status validation

---

## 11. Ripple Plan

### 11.1 Governance Canon (This Repository)
- ✅ Create AUTOMATED_DEPRECATION_DETECTION_GATE.md (this document)
- ✅ Add BL-026 to BOOTSTRAP_EXECUTION_LEARNINGS.md
- [ ] Update GOVERNANCE_CANON_MANIFEST.md with policy reference
- [ ] Notify governance liaison of new policy availability

### 11.2 Application Repositories (Layer-Down Required)
- [ ] foreman-office-app: Implement Python deprecation detection
- [ ] partpulse: Implement language-appropriate deprecation detection
- [ ] ai-foreman: Implement language-appropriate deprecation detection
- [ ] Future repos: Include deprecation gate in repository template

### 11.3 FM Contract Updates (Advisory)
- [ ] Propose FM pre-auth checklist update: Deprecation status validation
- [ ] Propose FM wave planning: Deprecation audit in readiness phase
- [ ] Propose FM handover validation: Zero deprecation verification

### 11.4 Builder Contract Updates (Advisory)
- [ ] Propose builder contracts: Deprecation detection obligation
- [ ] Propose builder QA checklist: Deprecation scan requirement
- [ ] Propose builder onboarding: Deprecation policy training

---

## 12. Maintenance and Evolution

### 12.1 Policy Review
This policy MUST be reviewed:
- Annually (minimum)
- When new languages are adopted
- When tooling standards change
- When significant deprecations are discovered ecosystem-wide

### 12.2 Tool Updates
Deprecation detection tools MUST be updated:
- When new language versions are released
- When tool updates improve detection
- When new deprecation patterns emerge

### 12.3 Exception Audits
Deprecation exceptions MUST be audited quarterly:
- Q1, Q2, Q3, Q4 reviews mandatory
- Expired exceptions removed from whitelist
- Overdue remediations escalated to FM

---

## 13. Version History

### v1.0 (2026-01-11)
- Initial policy creation
- Triggered by Wave 2.13 datetime.utcnow() deprecation discovery
- Implements BL-026 learning
- Establishes mandatory pre-commit and CI/CD detection
- Defines exception process with FM approval requirement
- Language-agnostic mandate with per-language implementation guidance

---

**Maintained By**: Maturion Governance Administrator  
**Policy Owner**: Johan Ras (Maturion Engineering Leadership)  
**Authority**: Constitutional — Applies to ALL Maturion repositories  
**Compliance**: Mandatory — No repository may weaken or bypass this policy

---

**End of AUTOMATED_DEPRECATION_DETECTION_GATE Policy**
