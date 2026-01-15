# LOCKED SECTION CHANGE REQUEST

**Purpose**: Standard template for requesting modification of locked agent contract sections  
**Authority**: `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md`  
**Process**: Submit to CS2 via `governance/agent-contract-instructions/pending/`

---

## Request Metadata

**Request ID**: `LOCK-CHANGE-[YYYY-MM-DD]-[NNN]`  
**Requested By**: `[Agent Name or Human Name]`  
**Request Date**: `[YYYY-MM-DD]`  
**Priority**: `[ROUTINE | URGENT | EMERGENCY]`

---

## Affected Locked Section

**Lock ID**: `[Lock ID from section metadata]`  
**Contract File**: `[Path to .agent file]`  
**Section Title**: `[Section heading]`  
**Current Lock Authority**: `[Canonical document providing lock authority]`

---

## Current Content

```markdown
[Paste the COMPLETE current locked section content, including all metadata]
```

---

## Proposed Change

```markdown
[Paste the COMPLETE proposed locked section content with modifications]
```

**Change Summary**: `[Brief description of what is being changed]`

**Change Type**:
- [ ] Addition of new requirement
- [ ] Removal of existing requirement
- [ ] Modification of existing requirement (strengthen)
- [ ] Modification of existing requirement (weaken)
- [ ] Clarification of existing requirement (no semantic change)
- [ ] Factual correction (path, version, date, typo)
- [ ] Structural refactoring (preserve all requirements)

---

## Justification

### Escalation Condition

**Which escalation condition from Section 5 of AGENT_CONTRACT_PROTECTION_PROTOCOL.md applies?**

- [ ] 1. Rule Contradiction (new canon conflicts with locked rule)
- [ ] 2. Rule Modification Request (strengthen/weaken/clarify)
- [ ] 3. File Length Refactoring (contract >30,000 chars)
- [ ] 4. Factual Error Correction (paths, versions, dates)
- [ ] 5. Security Vulnerability (locked rule creates risk)
- [ ] 6. Constitutional Canon Update (Tier-0 upstream change)
- [ ] 7. Gap Analysis Discovery (new protection needed)
- [ ] Other (describe):

### Detailed Justification

**Why is this change necessary?**

[Provide comprehensive explanation including:]
- What problem does this change solve?
- What governance requirement necessitates this change?
- What happens if this change is NOT made?
- What alternative approaches were considered?

### Canonical Authority for Change

**Which canonical governance document supports this change?**

- **Document**: `[governance/canon/DOCUMENT_NAME.md]`
- **Relevant Section**: `[Section number/title]`
- **Quote**: `[Relevant quote from canonical source]`

---

## Impact Analysis

### Affected Repositories

**Which repositories have this locked section in their agent contracts?**

- [ ] maturion-foreman-governance
- [ ] office-app
- [ ] PartPulse
- [ ] R_Roster
- [ ] Other (specify):

**Ripple Required**: `[YES | NO]`

If YES, describe ripple propagation plan:

[Describe how this change will be propagated to all affected repositories]

### Affected Agents

**Which agent contracts contain this locked section?**

- [ ] governance-repo-administrator
- [ ] agent-contract-administrator
- [ ] ForemanApp (FM)
- [ ] Builder agents (specify):
- [ ] Other (specify):

### Risk Assessment

**What are the risks of making this change?**

- **Governance Risk**: `[LOW | MEDIUM | HIGH]` — Risk of weakening governance discipline
- **Operational Risk**: `[LOW | MEDIUM | HIGH]` — Risk of breaking agent execution
- **Security Risk**: `[LOW | MEDIUM | HIGH]` — Risk of introducing security vulnerability
- **Compatibility Risk**: `[LOW | MEDIUM | HIGH]` — Risk of breaking existing workflows

**Mitigation Plan**:

[Describe how risks will be mitigated]

### Backward Compatibility

**Is this change backward compatible with existing agent behavior?**

- [ ] YES — No changes to agent behavior required
- [ ] NO — Agents must change behavior to comply

If NO, describe required behavioral changes:

[Describe what agents must do differently after this change]

---

## Testing and Validation Plan

### Pre-Modification Testing

**How will you validate this change is correct BEFORE applying to contracts?**

- [ ] Local contract schema validation
- [ ] CI gate execution (which gates?):
- [ ] Gap analysis re-run
- [ ] Protection registry update test
- [ ] Other (specify):

### Post-Modification Testing

**How will you validate this change succeeded AFTER applying to contracts?**

- [ ] All CI gates pass
- [ ] Protection registry synchronized
- [ ] Cross-repository consistency verified
- [ ] Agent execution not broken
- [ ] Other (specify):

---

## CS2 Approval Section

**CS2 Decision**: `[PENDING | APPROVED | REVISION REQUESTED | REJECTED]`

**Approval Date**: `[YYYY-MM-DD]`  
**Approved By**: `[Johan Ras | Maturion]`

**CS2 Comments**:

```
[CS2 provides approval comments, conditions, or rejection reasoning here]
```

**Conditions** (if any):

- [ ] Condition 1:
- [ ] Condition 2:
- [ ] Condition 3:

---

## Execution Record

**Executed By**: `agent-contract-administrator`  
**Execution Date**: `[YYYY-MM-DD]`  
**Execution PR**: `#[PR_NUMBER]`

**Files Modified**:

- [ ] `[contract-file-1.agent.md]`
- [ ] `[contract-file-2.agent.md]`
- [ ] `governance/contracts/protection-registry.md`

**Execution Notes**:

[Agent Contract Administrator provides execution notes here]

---

## Post-Execution Verification

**Verification Date**: `[YYYY-MM-DD]`  
**Verified By**: `[Agent or Human Name]`

**Verification Checklist**:

- [ ] All locked section metadata updated (Last Reviewed date)
- [ ] Protection registry synchronized
- [ ] All CI gates passing
- [ ] Cross-repository ripple completed (if applicable)
- [ ] Documentation updated

**Verification Evidence**:

```
[Paste CI gate execution output or other verification evidence]
```

---

## Fast-Track Eligibility

**Is this change eligible for fast-track approval?**

- [ ] YES — Factual error correction only, no requirement changes
- [ ] NO — Requires full CS2 review

If YES, provide evidence this is purely factual:

- **Error Type**: `[Typo | Path | Version | Date | Cross-reference]`
- **Current (incorrect)**: `[...]`
- **Proposed (correct)**: `[...]`
- **No semantic change**: `[Confirm no requirement meaning changed]`

---

## Notes

[Additional context, concerns, or notes relevant to this change request]

---

**Template Version**: 1.0.0  
**Last Updated**: 2026-01-15  
**Authority**: `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md`
