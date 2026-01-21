# SCOPE DECLARATION

**PR**: Agent Authority Model v2.0 - Granular Authority Hierarchy  
**Date**: 2026-01-21  
**Authority**: CS2_AGENT_FILE_AUTHORITY_MODEL.md v2.0.0, AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v3.0.0

---

## Files Changed

### Modified (M)
M governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md
M governance/canon/CS2_AGENT_FILE_AUTHORITY_MODEL.md
M governance/templates/AGENT_CONTRACT.template.md

### Added (A)
A governance/proposals/agent-file-recommendations/pending/AGENT-governance-repo-fix-contract-alignment-20260121.md
A governance/reports/AGENT_AUTHORITY_MODEL_V2_LAYER_DOWN_STATUS.md

### Deleted (D)
(none)

### Renamed (R)
(none)

---

## Change Summary

**Type**: Canonical Governance Update  
**Breaking Change**: Yes (v1.0.0 → v2.0.0 for CS2_AGENT_FILE_AUTHORITY_MODEL.md)  
**Impact**: All repositories with agent contracts

**Changes**:
1. CS2_AGENT_FILE_AUTHORITY_MODEL.md: v1.0.0 → v2.0.0 (granular 5-level authority hierarchy)
2. AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md: v2.0.0 → v3.0.0 (detailed authority delegation)
3. AGENT_CONTRACT.template.md: Added authority-level specific language
4. Created layer-down tracking report
5. Created CS2 agent file recommendation (fix contract misalignment)

---

## Governance Compliance

**Ripple Requirement**: YES - Must propagate to all consumer repositories  
**Layer-Down Required**: YES - Per CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md  
**Tracking**: governance/reports/AGENT_AUTHORITY_MODEL_V2_LAYER_DOWN_STATUS.md

**Affected Repositories**:
- maturion-foreman-governance (governance source) - ✅ Updated
- maturion-foreman-office-app (consumer) - ⏳ Awaiting propagation
- PartPulse (consumer) - ⏳ Awaiting propagation
- R_Roster (consumer) - ⏳ Awaiting propagation

---

## Authority

**Change Authority**: CS2 (Johan Ras)  
**Implementation**: governance-liaison (acting in governance repo context)  
**Approval Status**: Awaiting CS2 review and approval

---

**End of Scope Declaration**
