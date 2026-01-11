# Execution Bootstrap Protocol - PartPulse Implementation Mapping

## Repository
**Name**: PartPulse  
**Type**: FM Orchestration + Part Distribution Application  
**Governance Version**: Aligned to governance/canon v1.0.0+  
**Last Updated**: 2026-01-11

---

## Purpose

This document maps the canonical **Execution Bootstrap Protocol** to PartPulse-specific implementation requirements.

**Canonical Reference**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`

---

## Agent Types in This Repository

### 1. FM Orchestrator Agent
**Contract**: `.github/agents/PartPulseFM-agent.md` (or equivalent)  
**Role**: Orchestrating builds, managing governance, learning, failures  
**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v2.0.0+)

### 2. Builder Agents
**Contracts**: `.github/agents/*-builder.md`  
**Role**: Building PartPulse application code  
**Checklist**: `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v2.0.0+)

---

## Execution Bootstrap Protocol Application

### Mandatory PREHANDOVER_PROOF For:

#### FM Orchestrator PRs
- ✅ Workflow changes (`.github/workflows/**`)
- ✅ Agent contract changes (`.github/agents/**`)
- ✅ Learning promotion artifacts
- ✅ Failure promotion artifacts
- ✅ Effectiveness tracking updates
- ✅ Governance alignment updates

#### Builder PRs
- ✅ Application code changes (source files)
- ✅ Test changes
- ✅ Configuration changes affecting build/CI
- ✅ Database schema changes
- ✅ API changes
- ✅ Build script changes

#### Optional For:
- 📄 README updates (pure documentation)
- 📄 Incident reports
- 📄 Evidence artifacts (non-executable)

---

## Repository-Specific Execution Requirements

### For Builder PRs (PartPulse Application)

#### Step 3: Execute/Verify Locally

**Required Commands** (adapt to PartPulse stack):
```bash
# Install dependencies
[package manager install command, e.g., npm install, pip install -r requirements.txt]

# Run linting
[linting command, e.g., npm run lint, flake8, pylint]

# Run type checking (if applicable)
[type check command, e.g., npm run type-check, mypy]

# Run tests
[test command, e.g., npm test, pytest, mvn test]

# Run build
[build command, e.g., npm run build, python setup.py build, mvn package]
```

**Technology Stack Notes**:
- Adapt commands to PartPulse's actual technology stack
- Document PartPulse-specific testing requirements
- Include database migration testing if schema changes

**Exit Code Requirements**: All commands MUST exit with code 0

---

#### Step 4: Capture Output

**Minimum Required Evidence**:
```markdown
### Execution Validation

\`\`\`
$ [install command]
[Output showing dependencies installed]
Exit code: 0

$ [lint command]
✅ Linting: No errors, no warnings
Exit code: 0

$ [type check command] (if applicable)
✅ Type checking: No errors
Exit code: 0

$ [test command]
✅ Tests: X passed, X total
✅ Coverage: Y%
Exit code: 0

$ [build command]
✅ Build completed successfully
✅ Build artifacts: [location and size]
Exit code: 0
\`\`\`
```

---

#### Step 5: Validate Preflight

**Gates Applicable to PartPulse Builder PRs**:

1. **Builder QA Enforcement Gate**
   - Validation: Check `.qa/builder/BUILD_QA_REPORT.json`
   - Required: `build_status == "PASS"`, `merge_readiness.ready == true`

2. **QIEL (100% GREEN QA)**
   - Validation: Local test suite execution
   - Required: 100% pass rate, zero failures, zero skipped

3. **Architecture Completeness**
   - Validation: Check `architecture/builds/<build-id>/` exists
   - Required: Architecture doc and checklist complete

4. **Constitutional Safeguards (CS1-CS6)**
   - Validation: No protected files modified, no governance bypasses
   - Required: git diff shows only authorized changes

**Enumeration Method**: Check `.github/workflows/` for path triggers matching modified files

---

### For FM Orchestrator PRs

#### Step 3: Execute/Verify Locally

**Required Validations**:
```bash
# If workflow changes
yamllint .github/workflows/*.yml
yq eval '.on.pull_request' .github/workflows/<modified-workflow>.yml

# If agent contract changes
# Validate YAML header structure
yq eval '.agent' .github/agents/<modified-contract>.md

# If learning/failure promotion
# Validate artifact structure matches schema
```

---

#### Step 5: Validate Preflight

**Gates Applicable to FM Orchestration PRs**:

1. **Agent Governance Validation**
   - Validation: Check agent contract structure
   - Required: YAML header valid, bindings present

2. **Governance Scope-to-Diff Gate**
   - Validation: Scope declaration matches file diff
   - Required: Scope accurate, no out-of-scope changes

3. **FM Learning Promotion Gate** (if applicable)
   - Validation: Learning artifacts conform to schema
   - Required: Learning promotion rule satisfied

4. **FM Failure Promotion Gate** (if applicable)
   - Validation: Failure artifacts conform to schema
   - Required: Failure promotion rule satisfied

---

## PartPulse-Specific Considerations

### Database Schema Changes

If PR includes database schema changes:

**Additional Step 3 Requirements**:
```bash
# Test database migrations
[migration command, e.g., alembic upgrade head, flyway migrate]

# Verify schema changes
[schema verification command]

# Test rollback (if applicable)
[rollback command, e.g., alembic downgrade -1]
```

**Include in PREHANDOVER_PROOF**:
```markdown
### Database Migration Validation

\`\`\`
$ [migration command]
✅ Migration completed successfully
✅ Schema version: [version]
Exit code: 0

$ [rollback command]
✅ Rollback completed successfully
Exit code: 0

$ [migration command]
✅ Re-applied migration successfully
Exit code: 0
\`\`\`
```

---

### API Changes

If PR includes API changes:

**Additional Step 3 Requirements**:
```bash
# Run API contract tests
[API test command]

# Test API locally
[start local server]
[run API smoke tests]
```

**Include in PREHANDOVER_PROOF**:
```markdown
### API Validation

\`\`\`
$ [API test command]
✅ API contract tests: X passed
✅ Endpoints tested: [list]
Exit code: 0
\`\`\`
```

---

## Example PREHANDOVER_PROOF (Builder PR)

```markdown
## PREHANDOVER_PROOF

### Artifacts Created

**Requirement**: Add new PartInventoryService with tests

**Verification**:
\`\`\`
$ ls -la src/services/PartInventoryService.[ext]
-rw-r--r-- 1 user group 3456 Jan 11 14:30 src/services/PartInventoryService.[ext]

$ ls -la tests/services/test_PartInventoryService.[ext]
-rw-r--r-- 1 user group 2345 Jan 11 14:30 tests/services/test_PartInventoryService.[ext]
\`\`\`

**Status**: ✅ VERIFIED

---

### Execution Validation

**Requirement**: Build-to-Green for PartPulse application

**Commands Executed**:
\`\`\`
$ [install command]
Dependencies installed successfully
Exit code: 0

$ [lint command]
✅ Linting: 0 errors, 0 warnings
Exit code: 0

$ [test command]
✅ Tests: 42 passed, 42 total
✅ Coverage: 88.5%
Exit code: 0

$ [build command]
✅ Build completed successfully
✅ Build artifacts: dist/ (2.1 MB)
Exit code: 0
\`\`\`

**Status**: ✅ ALL GREEN

---

### Preflight Gate Status

**Gates Triggered by This PR** (changes to `src/services/**`):

1. **Builder QA Enforcement Gate** — ✅ PASS
   - Validation: Checked .qa/builder/BUILD_QA_REPORT.json
   - Evidence: build_status == "PASS", merge_readiness.ready == true

2. **QIEL (100% GREEN QA)** — ✅ PASS
   - Validation: Local test suite execution
   - Evidence: 42/42 tests passing, 0 failures

3. **Architecture Completeness** — ✅ PASS
   - Validation: Checked architecture/builds/build-456/
   - Evidence: Architecture doc present, checklist complete

4. **Constitutional Safeguards** — ✅ PASS
   - Validation: git diff shows only src/services/ and tests/services/ changes
   - Evidence: No protected files, no governance bypasses

**Summary**: 4 applicable gates GREEN

**Gate Enumeration Method**: Reviewed .github/workflows/ for paths matching modified files

---

### Execution Timestamp

**Validation Performed**: 2026-01-11 15:00:00 UTC  
**Environment**: [OS, runtime version, package versions]  
**Validator**: partpulse-builder (GitHub Copilot)

---

### Handover Guarantee

**I guarantee**:
- ✅ Service and tests created and functional
- ✅ Full build and test suite completed (100% GREEN)
- ✅ All 4 gates validated in preflight
- ✅ CI will confirm success (not discover failures)

**If CI fails after this guarantee, it indicates**:
- Local environment differs from CI, OR
- Incomplete gate enumeration, OR
- Governance defect

**Known Environment Differences**: 
- [List any known differences]

**Root Cause Commitment**: If CI fails, I will compare environments and document.
```

---

## Compliance Tracking

### Contract Updates Required

- [ ] `.github/agents/PartPulseFM-agent.md` updated with PREHANDOVER_PROOF obligation
- [ ] `.github/agents/*-builder.md` (all builders) updated with PREHANDOVER_PROOF obligation
- [ ] `governance/GOVERNANCE_ALIGNMENT.md` updated with ripple entry

### Documentation Updates Required

- [ ] Update PR template (if exists) to reference PREHANDOVER_PROOF
- [ ] Update CONTRIBUTING.md with protocol requirement
- [ ] Add agent onboarding materials

### Optional Enhancements

- [ ] Install validation script: `.github/scripts/validate-prehandover-proof.sh`
- [ ] Add PREHANDOVER_PROOF examples to repository docs
- [ ] Create test PR demonstrating protocol compliance

---

## Technology Stack Documentation

**TODO**: Document PartPulse's actual technology stack:
- Programming language(s): [e.g., Python, JavaScript, Java]
- Framework(s): [e.g., Django, Express, Spring Boot]
- Database: [e.g., PostgreSQL, MySQL, MongoDB]
- Build tool: [e.g., npm, Maven, Gradle]
- Test framework: [e.g., pytest, Jest, JUnit]

**This section should be updated** with PartPulse-specific details once repository structure is known.

---

## Related Documents

**Governance (Canonical)**:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
- `governance/templates/EXECUTION_BOOTSTRAP_PROTOCOL_REFERENCE_IMPLEMENTATION.md`
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_FM.md` (v2.0.0)
- `governance/templates/PR_GATE_RELEASE_CHECKLIST_BUILDER.md` (v2.0.0)

**Repository-Specific**:
- `apps/partpulse/docs/REPOSITORY_OVERVIEW.md`
- [Additional PartPulse architecture docs as they become available]

**Ripple**:
- `governance/templates/RIPPLE_SIGNAL_EXECUTION_BOOTSTRAP_PROTOCOL.md`

---

**Status**: Active Mapping  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-11

**Note**: This mapping contains placeholder commands where PartPulse-specific details are not yet documented. Update this mapping as PartPulse repository structure and technology stack become clear.

---

*End of PartPulse Execution Bootstrap Protocol Mapping*
