# FM Repository Layer-Down Issue Instructions

**Document Type**: Layer-Down Coordination  
**Status**: READY FOR CREATION  
**Target Repository**: MaturionISMS/maturion-foreman-office-app  
**Created**: 2026-01-05  
**Related PR**: [This PR in maturion-foreman-governance]

---

## Purpose

This document provides instructions for creating a layer-down issue in the FM App repository to instruct the Governance Liaison Agent to layer down the governance changes implemented in this PR.

---

## Context

This PR implemented governance folder corrections and new cross-repository protocols in response to FL/CI Learning Ripple Report (PR #869) concerns about cross-repo visibility and control boundaries.

**Key Changes**:
1. Reorganized governance/ folder (21 → 2 root files)
2. Created `GOVERNANCE_CANON_MANIFEST.md` (84 files classified)
3. Created `CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` (explicit boundaries)
4. Updated `GOVERNANCE_LAYERDOWN_CONTRACT.md` v1.1.0

These changes establish **explicit, controlled layer-down protocols** to prevent governance drift and "control creep" across repositories.

---

## Issue Creation Instructions

### When to Create Issue

**Timing**: After this PR is merged to main branch in governance repo

**Why**: Layer-down issues reference the governance repo commit hash for version alignment. Must wait for merge to have stable commit reference.

---

### How to Create Issue

**Step 1**: Navigate to FM App repository issue tracker:
- URL: https://github.com/MaturionISMS/maturion-foreman-office-app/issues

**Step 2**: Create new issue with:
- **Title**: "Layer Down Governance Folder Corrections and Cross-Repo Protocol"
- **Body**: Copy content from `/tmp/FM_REPO_LAYER_DOWN_ISSUE.md` (or governance repo reference)
- **Labels**: `governance`, `layer-down`, `high-priority`
- **Assignee**: Governance Liaison Agent (if automated) or manual assignment
- **Milestone**: Current wave milestone (if applicable)

**Step 3**: Update issue with governance commit hash:
- Find merge commit hash from this PR
- Replace `[commit hash]` placeholders in issue body with actual commit
- Replace `[Link to PR in maturion-foreman-governance]` with this PR URL

**Step 4**: Notify stakeholders:
- Comment in this PR: "Layer-down issue created: [link]"
- Tag relevant parties (FM, Governance Liaison, CS2 if needed)

---

## Issue Content Template Location

**Full issue template**: `/tmp/FM_REPO_LAYER_DOWN_ISSUE.md`

**Key Sections**:
1. Background and context
2. Governance changes summary (3 new/updated standards)
3. Layer-down instructions (6-step process, 7-day timeline)
4. Acceptance criteria
5. Cross-repo reading boundaries (NEW)
6. Critical path canon files (7 must-have)

---

## Expected Timeline

**Issue Creation**: Immediately after PR merge  
**Governance Liaison Acknowledgement**: Day 1  
**Layer-Down Completion**: Day 7 (max)  
**Issue Closure**: After layer-down evidence merged

**Note**: 7-day timeline gives downstream repo time to review, validate, and document alignment without pressure.

---

## Success Criteria

Layer-down is successful when:

✅ Issue created in FM repo with correct content  
✅ Governance liaison acknowledges receipt  
✅ `GOVERNANCE_ALIGNMENT.md` created in FM App root  
✅ Agent contracts validated (no INTERNAL canon references)  
✅ PR gates validated (align with canonical requirements)  
✅ Layer-down completion evidence documented  
✅ Changes merged to FM App main branch  
✅ Issue closed by governance liaison

---

## Monitoring

**Governance Administrator Agent responsibilities**:
1. Create issue after PR merge
2. Monitor issue for acknowledgement (48 hours)
3. Check for questions or blockers
4. Validate layer-down completion evidence
5. Close layer-down tracking in governance repo

**Escalation Triggers**:
- No acknowledgement after 48 hours → Escalate to CS2
- Timeline extension requested → Review justification, grant if reasonable
- Technical blockers reported → Provide governance clarification or escalate to CS2
- Layer-down incomplete after 7 days → Escalate to FM and CS2

---

## Post-Layer-Down Actions

After layer-down complete and issue closed:

1. **Update governance canon manifest** (if needed)
2. **Document layer-down completion** in governance repo audit trail
3. **Verify governance alignment** in next FM repo scan
4. **Update CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** if process improvements identified

---

## References

- **Issue Template**: `/tmp/FM_REPO_LAYER_DOWN_ISSUE.md`
- **Governance Changes**: This PR
- **FL/CI Report**: `governance/reports/FOREMAN_REPO_FL_CI_GOVERNANCE_SCAN.md` (PR #869)
- **Audit Report**: `governance/reports/GOVERNANCE_FOLDER_AUDIT_2026_01_05.md`
- **Canon Manifest**: `governance/canon/GOVERNANCE_CANON_MANIFEST.md`
- **Layer-Down Protocol**: `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md`

---

## Appendix: Quick Validation Checklist

Before creating issue, verify:

- [ ] This PR merged to main in governance repo
- [ ] Governance repo commit hash identified
- [ ] Issue template content prepared
- [ ] Placeholder values identified for replacement
- [ ] FM repo issue tracker accessible
- [ ] Governance liaison agent contact confirmed

After creating issue, verify:

- [ ] Issue title correct
- [ ] Issue body complete (no missing sections)
- [ ] Commit hash placeholders replaced
- [ ] PR link placeholders replaced
- [ ] Labels applied
- [ ] Assignee set (if applicable)
- [ ] Notification comment added to this PR

---

**Document Status**: READY FOR ACTION (after PR merge)
