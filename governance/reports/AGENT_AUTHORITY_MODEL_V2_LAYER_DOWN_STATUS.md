# Agent Authority Model v2.0 Layer-Down Status

**Document Type**: Ripple Tracking Report  
**Authority**: CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0, AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v3.0.0  
**Created**: 2026-01-21  
**Status**: IN PROGRESS  
**Tracking**: Governance ripple propagation of granular authority hierarchy

---

## Executive Summary

**Change**: CS2_AGENT_FILE_AUTHORITY_MODEL.md updated from v1.0.0 → v2.0.0
- Introduces granular 5-level authority hierarchy
- Delegates agent contract modification authority while preserving CS2 supremacy
- Enables governance alignment automation

**Impact**: Affects ALL repositories with agent contracts

**Layer-Down Required**:
1. ✅ Governance repository (maturion-foreman-governance) - Canon updated
2. ⏳ Consumer repositories (FM, PartPulse, R_Roster) - Awaiting propagation
3. ⏳ Agent contracts - Require CS2 updates
4. ⏳ Agent contract templates - Updated
5. ⏳ Cross-repo layer-down protocol - To be updated

---

## Canonical Governance Updates

### Completed (maturion-foreman-governance)

✅ **CS2_AGENT_FILE_AUTHORITY_MODEL.md**
- Version: 1.0.0 → 2.0.0
- Date: 2026-01-21
- Changes: Added 5-level granular authority hierarchy
- Authority: CS2 strategic decision
- Commit: [to be filled]

✅ **AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md**
- Version: 2.0.0 → 3.0.0
- Date: 2026-01-21
- Changes: Detailed authority delegation, ripple propagation, enforcement
- Authority: CS2 strategic decision
- Commit: [to be filled]

✅ **AGENT_CONTRACT.template.md**
- Updated: 2026-01-21
- Changes: Added authority-level specific modification language
- Conditional authority boundaries per agent level
- Commit: [to be filled]

### Pending

⏳ **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md**
- Update needed: Add agent authority boundary propagation section
- Impact: Defines how authority model ripples to consumer repos
- Priority: HIGH

⏳ **FPC_REPOSITORY_LAYERDOWN_GUIDE.md**
- Update needed: Add authority model layer-down checklist
- Impact: Guides governance-repo-administrator through propagation
- Priority: MEDIUM

---

## Agent Contract Updates (CS2 Authority Required)

### Governance Repository

❌ **ISSUE DETECTED**: Agent contract files misaligned
- File `.github/agents/governance-repo-administrator.agent.md` contains **governance-liaison** contract (FM repo)
- Should contain **governance-repo-administrator** contract (governance repo)
- **Action Required**: CS2 must correct agent contract file alignment
- **Recommendation Created**: governance/proposals/agent-file-recommendations/AGENT-governance-repo-administrator-fix-contract-alignment-20260121.md (to be created)

⏳ **CodexAdvisor-agent.md**
- Authority level: Level 0 (CS2-direct)
- Update needed: Add authority level metadata
- Add CS2-direct protection language
- Priority: HIGH

⏳ **governance-repo-administrator.agent.md** (once corrected)
- Authority level: Level 1
- Update needed: Add authority to modify consumer repo agent contracts
- Add prohibition on self-modification and CS2-direct contracts
- Priority: HIGH

### Consumer Repositories

⏳ **maturion-foreman-office-app**
- **governance-liaison.agent.md**:
  - Authority level: Level 2
  - Update needed: Add authority to modify FM and builder contracts
  - Add prohibition on self-modification
  - Priority: HIGH
- **Foreman (FM).agent.md**:
  - Authority level: Level 3
  - Update needed: Add authority to modify builder contracts
  - Add prohibition on self-modification
  - Priority: MEDIUM
- **Builder agents**:
  - Authority level: Level 4
  - Update needed: Explicit prohibition on ALL contract modifications
  - Priority: MEDIUM

⏳ **PartPulse** (if agents exist)
- Review and update agent contracts per authority model
- Priority: MEDIUM (if agents deployed)

⏳ **R_Roster** (if agents exist)
- Review and update agent contracts per authority model
- Priority: MEDIUM (if agents deployed)

---

## Layer-Down Execution Plan

### Phase 1: Canonical Governance (COMPLETE)
1. ✅ Update CS2_AGENT_FILE_AUTHORITY_MODEL.md to v2.0.0
2. ✅ Update AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md to v3.0.0
3. ✅ Update AGENT_CONTRACT.template.md
4. ⏳ Update CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md (in progress)
5. ⏳ Create layer-down tracking documentation (this document)

### Phase 2: Agent Contract Corrections (CS2 REQUIRED)
1. ⏳ Create agent file recommendations for CS2
2. ⏳ CS2 reviews and corrects governance repo agent contracts
3. ⏳ CS2 updates CodexAdvisor and governance-repo-administrator contracts

### Phase 3: Consumer Repository Propagation (governance-repo-administrator)
1. ⏳ governance-repo-administrator ripples to maturion-foreman-office-app
2. ⏳ Update governance-liaison contract (authority level 2)
3. ⏳ Update FM contract (authority level 3)
4. ⏳ Update builder contracts (authority level 4)
5. ⏳ Repeat for PartPulse, R_Roster (if agents exist)

### Phase 4: Validation & Completion
1. ⏳ Verify all agent contracts have authority level defined
2. ⏳ Verify all contracts have appropriate modification language
3. ⏳ Verify authority boundaries enforced in CI gates
4. ⏳ Document completion and close ripple tracking

---

## Affected Repositories

### Governance Source
- **maturion-foreman-governance**
  - Status: Canon updated ✅
  - Agent contracts: Require CS2 correction ⏳
  - Impact: HIGH - Defines authority model

### Consumer Repositories  
- **maturion-foreman-office-app**
  - Status: Awaiting propagation ⏳
  - Agents affected: governance-liaison, FM, builders
  - Impact: HIGH - Active development

- **PartPulse**
  - Status: TBD (check if agents exist)
  - Agents affected: TBD
  - Impact: MEDIUM

- **R_Roster**
  - Status: TBD (check if agents exist)
  - Agents affected: TBD
  - Impact: MEDIUM

---

## Authority Mapping

| Repository | Agent | Current Level | Target Level | Can Modify | Cannot Modify |
|------------|-------|---------------|--------------|------------|---------------|
| governance | CS2 | 0 | 0 (no change) | ALL contracts | None |
| governance | CodexAdvisor | 0 (CS2-direct) | 0 (CS2-direct) | None (advisory) | ALL (CS2 only) |
| governance | governance-repo-administrator | TBD | 1 | Consumer repo contracts | Own, CodexAdvisor, governance repo |
| FM | governance-liaison | TBD | 2 | FM, builders (same repo) | Own, higher levels, other repos |
| FM | FM agent | TBD | 3 | Builders (same repo) | Own, governance-liaison, higher |
| FM | Builder agents | TBD | 4 | None | ALL |

---

## Risk Assessment

**HIGH RISK**:
- Agent contract file misalignment in governance repo (governance-repo-administrator.agent.md contains wrong contract)
- Mitigation: CS2 must correct before layer-down proceeds

**MEDIUM RISK**:
- Authority boundaries not yet enforced in CI gates
- Mitigation: Update governance-gate.yml to validate authority boundaries

**LOW RISK**:
- Backward compatibility with existing contracts
- Mitigation: Old contracts still valid, new authority language additive

---

## Success Criteria

- [ ] All canonical governance updated (CS2_AGENT_FILE_AUTHORITY_MODEL.md, AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md, templates)
- [ ] Agent contract file misalignment corrected by CS2
- [ ] All agent contracts updated with authority level metadata
- [ ] All contracts have appropriate modification language per authority level
- [ ] governance-repo-administrator contract updated with Level 1 authority
- [ ] Consumer repo governance-liaison contracts updated with Level 2 authority
- [ ] Consumer repo FM contracts updated with Level 3 authority
- [ ] Consumer repo builder contracts updated with Level 4 prohibition
- [ ] CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md updated
- [ ] CI gates validate authority boundaries
- [ ] All changes auditable through git history
- [ ] Layer-down completion documented

---

## Timeline

**Target Completion**: TBD by CS2

**Phase 1** (Canonical Governance): 2026-01-21 (mostly complete)  
**Phase 2** (CS2 Corrections): Awaiting CS2 availability  
**Phase 3** (Consumer Propagation): After Phase 2 complete  
**Phase 4** (Validation): After Phase 3 complete

---

## References

- **CS2_AGENT_FILE_AUTHORITY_MODEL.md** v2.0.0
- **AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md** v3.0.0
- **GOVERNANCE_RIPPLE_MODEL.md** - Bidirectional governance evolution
- **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** - Cross-repo propagation
- **AGENT_CONTRACT.template.md** - Updated template

---

## Provenance

**Created By**: governance-repo-administrator (implied role)  
**Date**: 2026-01-21  
**Authority**: CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0, AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v3.0.0  
**Tracking Issue**: [To be created - link to GitHub issue]  
**Related PRs**: [To be linked]

---

**End of Layer-Down Status Report**
