# CROSS-REPOSITORY LAYER-DOWN PROTOCOL

## Status
**Type**: Canonical Governance Process  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-01-05  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Extends GOVERNANCE_LAYERDOWN_CONTRACT.md  
**Purpose**: Define explicit, controlled protocol for governance propagation across repositories

---

## 1. Purpose

This protocol defines the **explicit, controlled mechanism** for propagating governance changes from the governance repository (`maturion-foreman-governance`) to downstream application repositories (FM app, SlotMaster, future applications).

It exists to:
- **Prevent governance drift** across repositories
- **Ensure version synchronization** between governance and applications
- **Establish explicit boundaries** for cross-repo governance visibility
- **Prevent "control creep"** where governance visibility becomes implicit authority
- **Provide audit trail** for all governance propagation
- **Define governance liaison responsibilities** in downstream repos

**Constitutional Principle**: All governance consumption by downstream repositories MUST go through this explicit layer-down protocol. Direct cross-repo reading of governance internals is PROHIBITED.

---

## 2. Constitutional Authority

This protocol derives authority from and complements:
- **GOVERNANCE_LAYERDOWN_CONTRACT.md** — Base layer-down requirements
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Governance as canonical memory
- **GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md** — Version synchronization semantics
- **CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md** — Ripple signaling mechanism
- **GOVERNANCE_CANON_MANIFEST.md** — Canonical file inventory with layer-down status

This protocol addresses the concern from PR #869:
> "It is ALARMING that the Governors have this elevated view without explicit, controlled, layered-down protocols in every dependent repo."

---

## 3. Scope

### 3.1 In Scope

✅ **Covered by this protocol**:
- Governance version synchronization requirements
- Layer-down initiation and completion process
- Governance liaison agent responsibilities
- Cross-repo reading boundaries (what's allowed vs. prohibited)
- Breaking change communication protocol
- Audit trail and evidence requirements
- Governance alignment tracking in downstream repos

### 3.2 Out of Scope (Absolute)

❌ **NOT covered by this protocol**:
- Implementation details of governance standards (see canon documents)
- Enforcement mechanisms in downstream repos (see PR gate workflows)
- Agent recruitment process (see AGENT_RECRUITMENT.md)
- Architecture design (FM's role)
- Build execution (Builder's role)

---

## 4. Core Principles

### 4.1 Governance Public API vs. Internal

**Principle**: Downstream repositories MAY ONLY consume governance canon files explicitly marked as `PUBLIC_API` or `OPTIONAL` in the Governance Canon Manifest. `INTERNAL` files are off-limits.

**Rationale**:
- Prevents implicit coupling to governance implementation details
- Enables governance refactoring without breaking downstream repos
- Provides stable interface for governance consumption

**Enforcement**:
- Governance liaison agents validate consumption against manifest
- Direct references to INTERNAL canon files are governance violations
- Agent contracts MUST reference canon files by name AND version

---

### 4.2 Explicit Version Synchronization

**Principle**: Every downstream repository MUST explicitly track which governance version it is aligned with. Implicit alignment is PROHIBITED.

**Rationale**:
- Enables deterministic governance validation
- Prevents silent drift when governance evolves
- Provides audit trail for governance propagation
- Supports rollback and troubleshooting

**Enforcement**:
- `GOVERNANCE_ALIGNMENT.md` required in all downstream repos
- Governance liaison agent responsible for maintaining alignment
- Platform readiness validation checks governance version alignment

---

### 4.3 Layer-Down as Single Point of Contact

**Principle**: All governance propagation MUST go through the governance liaison agent in the downstream repository. Direct cross-repo governance reading by other agents is PROHIBITED.

**Rationale**:
- Prevents uncontrolled governance coupling
- Centralizes governance interpretation responsibility
- Enables governance change impact assessment before propagation
- Provides single audit point for governance consumption

**Enforcement**:
- Only governance liaison agent has authority to consume PUBLIC_API canon
- Other agents (FM, builders, watchdog) consume governance via local copies
- Governance liaison validates all governance references in agent contracts

---

### 4.4 Breaking Changes Require Explicit Migration

**Principle**: Breaking changes to PUBLIC_API canon files MUST be communicated explicitly via ripple signals and layer-down issues. Silent propagation is PROHIBITED.

**Rationale**:
- Prevents surprise failures in downstream repos
- Gives downstream repos time to plan migration
- Ensures governance changes are consciously adopted, not accidentally inherited

**Enforcement**:
- Major version bumps (e.g., 1.x → 2.0) trigger ripple signals
- FM repo layer-down issues created for breaking changes
- Downstream repos acknowledge and complete migration before alignment update

---

## 5. Governance Visibility Boundaries

### 5.1 What Governance Agents CAN Read (Across Repos)

**PERMITTED**:
1. **PUBLIC_API canon files** from governance repo (via manifest)
2. **Downstream repo governance alignment status** (for audit/validation)
3. **Evidence artifacts** in downstream repos (for audit/verification)
4. **Ripple signals** in downstream repos (for awareness)

**JUSTIFICATION**: These reads support governance audit, validation, and ripple awareness without creating implicit control.

---

### 5.2 What Governance Agents CANNOT Read (Across Repos)

**PROHIBITED**:
1. **INTERNAL governance files** from other repos (no cross-governance reading)
2. **Application implementation code** (no feature inspection)
3. **Builder task details** (no implementation micromanagement)
4. **FM planning artifacts** (no execution interference)
5. **Downstream repo `.github/agents/` files** (no agent contract reading)

**JUSTIFICATION**: These reads create control creep, implicit authority, or violate role boundaries.

---

### 5.3 What Downstream Agents CAN Read (From Governance Repo)

**PERMITTED** (only by governance liaison agent):
1. **PUBLIC_API canon files** (per manifest, by version)
2. **OPTIONAL canon files** (per manifest, by version)
3. **Templates** referenced in PUBLIC_API canon
4. **Schemas** referenced in PUBLIC_API canon
5. **Ripple signals** targeting downstream repo

**JUSTIFICATION**: These reads are necessary for governance consumption and alignment.

---

### 5.4 What Downstream Agents CANNOT Read (From Governance Repo)

**PROHIBITED** (all downstream agents including governance liaison):
1. **INTERNAL canon files** (per manifest)
2. **DEPRECATED canon files** (no longer binding)
3. **Governance reports** (internal governance assessments)
4. **Parking station enhancements** (not yet canonical)
5. **Governance `.github/agents/` files** (governance agent contracts are governance-internal)

**JUSTIFICATION**: These reads create implicit coupling, consume non-binding governance, or violate governance internal boundaries.

---

## 6. Layer-Down Process

### 6.1 Initiation Triggers

Layer-down is initiated when:
1. **Breaking change** to PUBLIC_API canon file (major version bump)
2. **New PUBLIC_API canon file** added to manifest
3. **Periodic synchronization** (monthly or per-wave IBWR)
4. **Platform readiness validation** (before wave execution)
5. **Explicit governance liaison request** (if deviation detected)

---

### 6.2 Layer-Down Steps

**Step 1: Governance Repo Actions**
1. Update canon file(s) with new version
2. Update `GOVERNANCE_CANON_MANIFEST.md` with version and effective date
3. Document change in `CHANGELOG.md` with migration notes (if breaking)
4. Create ripple signal using `RIPPLE_SIGNAL.template.md` (if breaking)
5. Create FM repo issue with layer-down instructions

**Step 2: Downstream Repo Actions** (Governance Liaison Agent)
1. Receive ripple signal or layer-down issue
2. Review governance canon manifest for changes
3. Identify affected canon files in downstream repo
4. Update agent contracts with new canonical version references
5. Validate PR gates align with new canonical requirements
6. Test governance changes in isolated branch
7. Document layer-down completion evidence
8. Update `GOVERNANCE_ALIGNMENT.md` with new version

**Step 3: Validation & Closure**
1. Governance liaison submits layer-down completion evidence
2. FM validates evidence (if applicable)
3. Governance repo closes layer-down issue
4. Downstream repo documents completion in audit trail

---

### 6.3 Layer-Down Evidence Requirements

Each layer-down completion MUST include:
1. **Version alignment confirmation**: Governance version/commit hash
2. **Canon file consumption list**: Which files were updated/added
3. **Agent contract updates**: Diffs showing version reference updates
4. **PR gate validation**: Evidence gates align with new canon
5. **Test results**: Validation that governance changes don't break execution
6. **Deviation documentation**: Any intentional deviations from canon (rare)

---

## 7. Governance Liaison Agent Responsibilities

### 7.1 Core Responsibilities

The governance liaison agent in each downstream repository is responsible for:

1. **Version Synchronization**
   - Maintain `GOVERNANCE_ALIGNMENT.md` with current version
   - Monitor governance repo for ripple signals
   - Respond to layer-down issues within 48 hours

2. **Canon Consumption Validation**
   - Ensure only PUBLIC_API/OPTIONAL canon consumed
   - Validate agent contracts reference canonical versions
   - Reject INTERNAL/DEPRECATED canon references

3. **Layer-Down Execution**
   - Execute layer-down steps per protocol
   - Test governance changes before merge
   - Document completion evidence

4. **Governance Audit Support**
   - Provide governance alignment status on request
   - Support governance scans and validations
   - Escalate governance violations

5. **Breaking Change Migration**
   - Plan and execute migrations for breaking changes
   - Coordinate with FM if execution impact
   - Document migration completion

### 7.2 Governance Liaison Authority

The governance liaison agent has authority to:
- ✅ Read PUBLIC_API/OPTIONAL canon from governance repo
- ✅ Update agent contracts with canonical version references
- ✅ Validate PR gates against canonical requirements
- ✅ Request FM pause if governance violation detected
- ✅ Escalate to human CS2 if governance conflict unresolvable

The governance liaison agent does NOT have authority to:
- ❌ Override FM execution decisions
- ❌ Modify governance canon (governance-repo only)
- ❌ Bypass PR gates or enforcement mechanisms
- ❌ Approve own layer-down PRs (requires FM or CS2 approval)

---

## 8. Breaking Change Communication Protocol

### 8.1 Breaking Change Definition

A breaking change is any modification to a PUBLIC_API canon file that:
- Changes required behavior or semantics
- Removes or renames required fields/sections
- Introduces new mandatory requirements
- Invalidates existing downstream implementations
- Requires code/config changes in downstream repos

### 8.2 Breaking Change Process

**Timeline**: Minimum 7 days notice before enforcement

**Steps**:
1. **T-0 (Change Approved)**: Governance repo updates canon with new version (major bump)
2. **T-0**: Create ripple signal with migration instructions
3. **T-0**: Create FM repo layer-down issue
4. **T+1 day**: Governance liaison acknowledges issue
5. **T+7 days (max)**: Governance liaison completes layer-down
6. **T+7 days**: Governance repo closes issue
7. **Ongoing**: Monitor downstream repo for governance violations

**Emergency Breaking Changes** (critical security/safety):
- Timeline compressed to 24 hours
- CS2 human approval required
- Migration assistance provided by governance agent

---

## 9. Governance Alignment Tracking

### 9.1 GOVERNANCE_ALIGNMENT.md Structure

Every downstream repository MUST maintain a `GOVERNANCE_ALIGNMENT.md` file:

```markdown
# Governance Alignment Status

**Repository**: maturion-foreman-office-app  
**Governance Repo**: maturion-foreman-governance  
**Aligned Version**: v1.0.0 (commit: abc123...)  
**Last Synchronization**: 2026-01-05  
**Governance Liaison**: Governance Liaison Agent  

## Canon Files Consumed

| Canon File | Version | Layer-Down Date | Status |
|-----------|---------|-----------------|--------|
| FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md | 1.1.0 | 2026-01-03 | ACTIVE |
| BUILDER_FIRST_PR_MERGE_MODEL.md | 1.0.0 | 2025-12-31 | ACTIVE |
| ... | ... | ... | ... |

## Known Deviations

None currently.

## Audit Trail

| Date | Action | Authority |
|------|--------|-----------|
| 2026-01-05 | Initial alignment documented | Governance Liaison Agent |
```

### 9.2 Alignment Validation

Governance alignment is validated during:
- Platform readiness declarations
- Wave initiation (before architecture freeze)
- IBWR (In-Between Wave Reconciliation)
- Governance scans and audits
- Breaking change migrations

**Validation Failure**: If alignment validation fails, wave execution MUST be paused until alignment restored.

---

## 10. Audit Trail Requirements

### 10.1 Governance Repo Audit Trail

The governance repository MUST maintain:
1. **CHANGELOG.md**: All canon changes with version history
2. **GOVERNANCE_CANON_MANIFEST.md**: Current version inventory
3. **Ripple signals**: Archived in `governance/evidence/ripple-signals/`
4. **Layer-down issues**: Tracked in GitHub issues

### 10.2 Downstream Repo Audit Trail

Each downstream repository MUST maintain:
1. **GOVERNANCE_ALIGNMENT.md**: Version synchronization status
2. **Layer-down completion evidence**: In `.architecture/commissioning/`
3. **Agent contract version history**: Git history of `.github/agents/`
4. **PR gate evolution**: Git history of `.github/workflows/`

---

## 11. Non-Compliance Handling

### 11.1 Governance Violation Types

**Type 1: Unauthorized Canon Consumption** (reading INTERNAL files)
- **Severity**: High
- **Response**: Governance liaison escalates to FM, FM halts execution
- **Remediation**: Remove unauthorized references, layer-down proper PUBLIC_API canon

**Type 2: Version Drift** (outdated governance version)
- **Severity**: Medium
- **Response**: Governance scan flags deviation
- **Remediation**: Layer-down latest PUBLIC_API changes, update alignment

**Type 3: Direct Cross-Repo Reading** (bypassing governance liaison)
- **Severity**: High
- **Response**: Governance liaison escalates to CS2
- **Remediation**: Remove direct references, enforce liaison-only access

**Type 4: Silent Canon Modification** (downstream repo modifying local canon copies)
- **Severity**: Critical
- **Response**: Governance liaison escalates to CS2, execution halted
- **Remediation**: Revert modifications, re-layer-down canonical versions

---

## 12. Future Automation (Post-Bootstrap)

This protocol is currently **manual** (bootstrap mode). Future automation may include:
- Automated ripple signal generation
- Automated governance alignment validation
- Automated layer-down PR creation
- Automated version synchronization checks
- Dashboard for governance alignment status

**Constraint**: Automation MUST preserve explicit layer-down semantics. Automated governance propagation is PROHIBITED.

---

## 13. Success Criteria

✅ **This protocol is successful when**:
1. All downstream repos maintain current `GOVERNANCE_ALIGNMENT.md`
2. All agent contracts reference canonical versions explicitly
3. No INTERNAL canon files consumed by downstream repos
4. Breaking changes communicated and migrated within 7 days
5. Governance scans report zero version drift
6. Layer-down completion evidence exists for all canon changes
7. Governance liaison agents fulfill responsibilities consistently

---

## 14. Relationship to Other Protocols

| Protocol | Relationship |
|----------|-------------|
| **GOVERNANCE_LAYERDOWN_CONTRACT.md** | Base contract; this protocol adds cross-repo coordination |
| **GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md** | Version semantics; this protocol adds synchronization process |
| **CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md** | Ripple signaling; this protocol adds layer-down triggering |
| **AGENT_RECRUITMENT.md** | Agent appointment; this protocol adds governance liaison appointment |
| **REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md** | Initial seeding; this protocol adds ongoing synchronization |

---

## 15. Review and Maintenance

This protocol is reviewed:
- **Monthly**: Governance administrator reviews alignment status across repos
- **Per-Wave**: IBWR includes governance alignment validation
- **Per-Breaking-Change**: Protocol effectiveness assessed during migration
- **Per-Platform-Readiness**: Alignment validated before wave execution

**Improvement Triggers**:
- Version drift detected across repos
- Layer-down completion time exceeds 7 days
- Unauthorized canon consumption detected
- Governance liaison escalations exceed threshold

---

**End of Protocol**

**Protocol Metadata**:
- Protocol ID: CROSS_REPO_LAYER_DOWN_PROTOCOL_v1_0_0
- Authority: Governance Administrator Agent
- Effective: 2026-01-05
- Next Review: 2026-02-05 (monthly)
- Supersedes: None (initial version)
