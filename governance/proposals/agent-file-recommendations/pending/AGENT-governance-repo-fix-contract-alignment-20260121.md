# Agent File Recommendation: Fix Governance Repository Agent Contract Misalignment

**Recommendation ID**: AGENT-governance-repo-fix-contract-alignment-20260121  
**Date**: 2026-01-21  
**Agent**: governance-liaison (acting in governance repo context)  
**Target Agent Files**: 
- `.github/agents/governance-repo-administrator.agent.md`
- `.github/agents/CodexAdvisor-agent.md` (review needed)  
**Priority**: CRITICAL

---

## Current State

**Critical Misalignment Detected**:

### File 1: `.github/agents/governance-repo-administrator.agent.md`
**Current content**: Contains **governance-liaison** agent contract for FM repository
- Agent ID: `governance-liaison`
- Repository: `APGI-cmy/maturion-foreman-office-app` (FM app)
- Description: "FM-repository governance alignment and enforcement agent"

**Expected content**: Should contain **governance-repo-administrator** agent contract for governance repository
- Agent ID: `governance-repo-administrator`
- Repository: `APGI-cmy/maturion-foreman-governance` (governance repo)
- Description: "Canonical governance repository administrator and propagation agent"

### File 2: `.github/agents/CodexAdvisor-agent.md`
**Status**: Needs review
- Verify agent ID and contract alignment
- Update authority level metadata (Level 0, CS2-direct)
- Add CS2-direct protection language per CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0

---

## Impact of Misalignment

**Catastrophic Impact**:
1. **Agent Identity Confusion**: Custom agents invoked in governance repo receive wrong contract
2. **Authority Boundary Violation**: governance-liaison contract for FM repo loaded in governance repo context
3. **Repository Context Mismatch**: Agent thinks it's in FM repo when actually in governance repo
4. **Scope Violations**: Allowed/restricted paths wrong for governance repo operations
5. **Blocked Governance Work**: Cannot safely perform governance-repo-administrator duties

**Constitutional Violation**: Per agent contract self-awareness requirements (Agent Principle #6), agents MUST know identity, location, and repository context. Current state violates this requirement.

---

## Proposed Action

### CS2 Must Create Proper governance-repo-administrator Contract

The governance-repo-administrator contract should:
- Have agent ID: `governance-repo-administrator`
- Target repository: `APGI-cmy/maturion-foreman-governance`
- Authority Level: Level 1 (can modify consumer repo agent contracts)
- Include Level 1 authority permissions and prohibitions
- Reference CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0
- Include self-modification prohibition

### CS2 Must Resolve Misplaced File

Options:
1. Archive current content to `governance/agents/governance-liaison-fm-repo.agent.md` (for reference)
2. Delete entirely (content exists in FM repo)
3. Document the misalignment issue

### CS2 Must Review CodexAdvisor Contract

Verify:
- Correct agent ID
- Authority level metadata (Level 0, CS2-direct)
- CS2-direct protection language
- Repository context

---

## Rationale

**Why Critical**:
1. **Constitutional Violation**: Agent self-awareness requirement violated
2. **Blocked Governance Work**: Cannot safely perform governance-repo-administrator duties
3. **Authority Model Implementation**: New granular authority model cannot be implemented
4. **Ripple Propagation Blocked**: governance-repo-administrator must be properly configured

**Why CS2 Authority Required**:
- Agent contract files can ONLY be modified by CS2
- Even governance-repo-administrator (Level 1) cannot modify contracts in governance repository
- Governance repository agent contracts are CS2-direct authority

**Authority Source**: 
- CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0
- AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v3.0.0
- AGENT_CONTRACT_PROTECTION_PROTOCOL.md

---

## Expected Improvement

**After CS2 Implementation**:
1. governance-repo-administrator can be invoked correctly in governance repo
2. Authority Level 1 powers can be exercised
3. Layer-down of agent authority model v2.0 can proceed
4. Governance ripple propagation unblocked
5. Constitutional compliance restored

**Success Criteria**:
- [ ] New governance-repo-administrator.agent.md created with correct contract
- [ ] Old misplaced contract archived/documented
- [ ] CodexAdvisor-agent.md reviewed and updated
- [ ] Agent invocation in governance repo works correctly
- [ ] Layer-down tracking updated

---

## Urgency

**CRITICAL - BLOCKING**:
This issue BLOCKS:
- Agent authority model v2.0 layer-down to consumer repos
- Governance ripple propagation
- governance-repo-administrator agent invocation
- Consumer repo agent contract updates

**Cannot proceed with governance alignment automation until resolved.**

---

## Escalation

**To**: CS2 (Johan Ras)  
**Request**: 
1. Review this recommendation
2. Create proper governance-repo-administrator.agent.md contract
3. Resolve misaligned file issue
4. Review and update CodexAdvisor-agent.md
5. Confirm governance repo agent contracts aligned

**Blocking Status**: YES - Blocks Phase 2 of agent authority model layer-down  
**Escalation Date**: 2026-01-21

---

**Status**: AWAITING CS2 REVIEW

---

**Tracking**: governance/reports/AGENT_AUTHORITY_MODEL_V2_LAYER_DOWN_STATUS.md
