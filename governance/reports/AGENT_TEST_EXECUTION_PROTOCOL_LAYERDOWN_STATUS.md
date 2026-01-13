# AGENT TEST EXECUTION PROTOCOL LAYER-DOWN STATUS

## Document Metadata
**Created**: 2026-01-13  
**Protocol**: `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md` v1.0.0  
**Owner**: Governance Administrator  
**Purpose**: Track layer-down of Agent Test Execution Protocol to all application repositories

---

## Executive Summary

**Protocol Purpose**: Enforce CI-Confirmatory-Not-Diagnostic by requiring agents to run tests in agent environment before PR creation.

**Layer-Down Scope**: All application repositories with automated test suites

**Target Completion**: Within 2 weeks of protocol approval (by 2026-01-27)

**Current Status**: NOT STARTED (awaiting protocol approval)

---

## Repository Layer-Down Tracking

### Application Repositories Requiring Layer-Down

| Repository | FM | Builders | Test Suite | Status | Start Date | Completion Date | Notes |
|------------|----|----|----------|--------|------------|-----------------|-------|
| foreman-office-app | ForemanApp | multiple | Jest | PLANNED | TBD | TBD | Node.js app with extensive test suite |
| partpulse | TBD | TBD | TBD | PLANNED | TBD | TBD | Status to be determined |
| ai-foreman | TBD | TBD | TBD | PLANNED | TBD | TBD | Status to be determined |
| [Add other repos] | | | | | | | |

**Legend**:
- **PLANNED**: Layer-down scheduled but not started
- **IN PROGRESS**: Layer-down work underway
- **BLOCKED**: Blocked by dependency or issue
- **COMPLETE**: Layer-down complete and verified
- **N/A**: Repository does not require protocol (no test suite)

---

## Layer-Down Checklist Template

For each repository, complete the following phases:

### Phase 1: Documentation and Environment (Days 1-2)
- [ ] Review existing test suite structure
- [ ] Document test commands used by CI
- [ ] Create or update test environment setup documentation
- [ ] Identify test runner and runtime requirements
- [ ] Document any environment-specific requirements

### Phase 2: Agent Contract Updates (Days 3-4)
- [ ] Update `.agent` file to bind to AGENT_TEST_EXECUTION_PROTOCOL.md
- [ ] Add `capabilities.test_execution` section to `.agent` file
- [ ] Update builder contracts to require test execution before handover
- [ ] Update FM contract to enforce test evidence in PREHANDOVER_PROOF
- [ ] Validate `.agent` schema compliance

### Phase 3: Template and Process Integration (Day 5)
- [ ] Update PR template to include Test Execution Validation section
- [ ] Add test execution reminder to builder workflow documentation
- [ ] Update PREHANDOVER_PROOF examples with test evidence
- [ ] Create repository-specific test execution guide (if needed)

### Phase 4: CI Gate Alignment (Day 6)
- [ ] Verify CI test gate exists (create if missing)
- [ ] Verify CI test gate uses same test command as documented
- [ ] Update CI test gate to reference protocol in failure messages
- [ ] Test CI gate execution (ensure confirmation, not discovery)
- [ ] Document expected test gate behavior

### Phase 5: Training and Rollout (Day 7)
- [ ] Train builders on test execution requirements
- [ ] Train FM on test evidence validation
- [ ] Communicate protocol to all agents in repository
- [ ] Monitor first 5 PRs for protocol compliance
- [ ] Document any issues or adjustments needed

### Phase 6: Verification and Completion
- [ ] Verify first 5 PRs include test execution evidence
- [ ] Verify CI test gate confirmatory behavior (not discovery)
- [ ] Update layer-down status to COMPLETE
- [ ] Document lessons learned
- [ ] Report completion to Governance Administrator

---

## Repository-Specific Layer-Down Details

### foreman-office-app

**Status**: PLANNED

**Test Suite Details**:
- **Framework**: Jest
- **Runtime**: Node.js v18.x
- **Package Manager**: npm
- **Test Command**: `npm test`
- **Test Types**: Unit, integration, component tests
- **Current Coverage**: To be determined
- **CI Test Gate**: Exists (Test Suite Execution gate)

**Layer-Down Plan**:
1. Document test environment setup in `architecture/TEST_ENVIRONMENT_SETUP.md`
2. Update `.agent` file with test execution capabilities
3. Update ForemanApp contract to enforce test evidence
4. Update builder contracts to require local test execution
5. Create test execution examples in PR template
6. Train builders (session scheduled for TBD)
7. Monitor first 5 PRs for compliance

**Dependencies**:
- None identified

**Risks**:
- Builders may need local environment setup assistance
- Some tests may be slow (need subset strategy)

**Owner**: ForemanApp (FM)

---

### partpulse

**Status**: PLANNED

**Test Suite Details**: To be determined

**Layer-Down Plan**: To be determined after test suite assessment

**Owner**: TBD (FM assignment pending)

---

### ai-foreman

**Status**: PLANNED

**Test Suite Details**: To be determined

**Layer-Down Plan**: To be determined after test suite assessment

**Owner**: TBD (FM assignment pending)

---

## Blocker and Issue Tracking

### Active Blockers

| Repository | Blocker | Impact | Resolution Plan | Owner | Status |
|------------|---------|--------|-----------------|-------|--------|
| [None] | | | | | |

### Resolved Blockers

| Repository | Blocker | Resolution | Date Resolved |
|------------|---------|------------|---------------|
| [None] | | | |

---

## Layer-Down Metrics

### Completion Metrics

- **Repositories Requiring Layer-Down**: 3 (estimated)
- **Repositories Complete**: 0
- **Repositories In Progress**: 0
- **Repositories Blocked**: 0
- **Completion Percentage**: 0%

### Compliance Metrics (Post-Layer-Down)

**Target Metrics** (to be tracked after layer-down):
- Test Evidence Inclusion Rate: >95% of PRs with code changes
- CI Test Gate Failure Rate: <2% (environment differences only)
- Exception Rate: <5% of PRs
- Local Test Failure Rate: (tracked to measure agent discipline)

**Actual Metrics** (to be updated monthly):
- Not yet applicable (layer-down not complete)

---

## Lessons Learned

### foreman-office-app

**Lessons**: To be documented after layer-down

### partpulse

**Lessons**: To be documented after layer-down

### ai-foreman

**Lessons**: To be documented after layer-down

---

## Communication and Training

### Training Materials Created

- [ ] Test execution protocol walkthrough document
- [ ] Video tutorial on local test setup (optional)
- [ ] Common issues and troubleshooting guide
- [ ] Exception request process guide

### Training Sessions Conducted

| Repository | Date | Attendees | Topics Covered | Recording |
|------------|------|-----------|----------------|-----------|
| [None] | | | | |

---

## Timeline and Milestones

### Target Milestones

| Milestone | Target Date | Status | Actual Date | Notes |
|-----------|-------------|--------|-------------|-------|
| Protocol Approved | 2026-01-13 | IN PROGRESS | TBD | Awaiting PR merge |
| Layer-Down Begins | 2026-01-14 | PLANNED | TBD | Day after approval |
| First Repo Complete | 2026-01-20 | PLANNED | TBD | foreman-office-app |
| All Repos Complete | 2026-01-27 | PLANNED | TBD | 2-week target |
| First Compliance Review | 2026-02-10 | PLANNED | TBD | 2 weeks after completion |

---

## Governance Administrator Actions

### Weekly Review Actions

**Week of 2026-01-13**:
- [ ] Monitor protocol PR approval
- [ ] Prepare layer-down kickoff communication
- [ ] Schedule training sessions with FMs
- [ ] Create repository-specific assessment checklists

**Week of 2026-01-20**:
- [ ] Monitor layer-down progress
- [ ] Address blockers and questions
- [ ] Review first PRs for compliance
- [ ] Adjust protocol or guidance as needed

**Week of 2026-01-27**:
- [ ] Verify all repositories complete
- [ ] Document lessons learned
- [ ] Report completion to Maturion
- [ ] Schedule first compliance review

---

## Related Documents

- `governance/runbooks/AGENT_TEST_EXECUTION_PROTOCOL.md` — Protocol definition
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` — Parent protocol
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Constitutional mandate
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — Updated template
- `governance/canon/.agent.schema.md` — Agent file schema (updated)
- `governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md` — Binding requirements (updated)

---

## Status Updates

### 2026-01-13
- Protocol document created
- Layer-down tracking document created
- Awaiting protocol approval to begin layer-down

---

**Status**: TRACKING ACTIVE  
**Next Review**: Weekly (Mondays)  
**Owner**: Governance Administrator  
**Last Updated**: 2026-01-13

---

*End of Layer-Down Status Tracking*
