# Canon Creation and Propagation Workflow Checklist

**Version**: 1.0.0  
**Effective Date**: 2026-01-21  
**Authority**: GOVERNANCE_RIPPLE_MODEL.md  
**Purpose**: Ensure complete and traceable governance canon lifecycle management including mandatory inventory maintenance

## Overview

This checklist enforces the complete workflow for creating, modifying, and propagating governance canon documents. **Inventory maintenance is mandatory at every stage** to ensure alignment tracking across central and consumer repositories.

---

## Workflow Stage 1: Canon Creation/Modification

### Pre-Creation Requirements

- [ ] **Determine canon scope and classification**
  - [ ] Identify canon type (PUBLIC_API, REPO_SPECIFIC, OPTIONAL)
  - [ ] Determine mandatory status (required for all repos vs selective)
  - [ ] Assign priority level (CRITICAL, HIGH, MEDIUM, LOW)
  - [ ] Define affected repository types

- [ ] **Review existing governance for conflicts**
  - [ ] Search for similar or overlapping canon
  - [ ] Identify potential conflicts with existing governance
  - [ ] Document integration points with other canon

### Canon Development

- [ ] **Create or modify canon document**
  - [ ] Follow canonical document structure
  - [ ] Include version metadata
  - [ ] Add effective date
  - [ ] Document authority source
  - [ ] Include integration references

- [ ] **Add required metadata sections**
  - [ ] Status (Draft/Active/Deprecated)
  - [ ] Version number
  - [ ] Authority attribution
  - [ ] Effective date
  - [ ] Integration with other governance

### Validation Before Commit

- [ ] **Validate document structure**
  - [ ] Markdown syntax valid
  - [ ] All required sections present
  - [ ] Cross-references correct
  - [ ] Version number incremented appropriately

- [ ] **Run local governance gates**
  - [ ] YAML frontmatter valid (if applicable)
  - [ ] No governance policy violations
  - [ ] Document follows naming conventions

---

## Workflow Stage 2: Central Inventory Update (MANDATORY)

### Update Central Canon Inventory

- [ ] **Update `governance/CANON_INVENTORY.json`**
  - [ ] Add new canon entry with complete metadata
  - [ ] Update modified canon entry (version, hash, last_modified)
  - [ ] Set correct classification (PUBLIC_API, REPO_SPECIFIC, OPTIONAL)
  - [ ] Set mandatory flag (true/false)
  - [ ] Set priority level (CRITICAL, HIGH, MEDIUM, LOW)
  - [ ] Include canonical path
  - [ ] Document scope and applicability

- [ ] **Calculate and record SHA256 hash**
  - [ ] Generate hash: `sha256sum governance/canon/<CANON_FILE>.md` (Unix/Linux) or `Get-FileHash` (PowerShell)
  - [ ] Record hash in inventory entry
  - [ ] Document hash purpose (drift detection)

- [ ] **Update inventory metadata**
  - [ ] Increment inventory version if schema changed
  - [ ] Update last_sync timestamp
  - [ ] Update total_canons count
  - [ ] Document this change in inventory

### Validate Inventory Integrity

- [ ] **Verify inventory file syntax**
  - [ ] JSON syntax valid: `jq . governance/CANON_INVENTORY.json`
  - [ ] All required fields present
  - [ ] No duplicate IDs
  - [ ] Paths resolve correctly

- [ ] **Cross-check inventory against filesystem**
  - [ ] All listed canons exist at specified paths
  - [ ] All canon files have inventory entries
  - [ ] SHA256 hashes match actual files

---

## Workflow Stage 3: Commit and Document Change

### Create Governance Change Record

- [ ] **Document the change**
  - [ ] Create entry in `governance/CHANGELOG.md`
  - [ ] Include version number
  - [ ] Document change type (new/modified/deprecated)
  - [ ] Explain rationale
  - [ ] List affected repositories
  - [ ] Note inventory update completed

- [ ] **Prepare commit message**
  - [ ] Format: `[Canon] <Action> <CanonName> - <Brief description>`
  - [ ] Include inventory update note
  - [ ] Reference issue/PR if applicable

### Commit Changes

- [ ] **Stage all related files**
  - [ ] Canon document: `git add governance/canon/<CANON_FILE>.md`
  - [ ] Inventory: `git add governance/CANON_INVENTORY.json`
  - [ ] Changelog: `git add governance/CHANGELOG.md`
  - [ ] Related templates (if applicable)

- [ ] **Commit with descriptive message**
  - [ ] Execute: `git commit -m "<message>"`
  - [ ] Verify commit includes all expected files
  - [ ] Tag commit if major version change

---

## Workflow Stage 4: Propagation Planning

### Identify Affected Repositories

- [ ] **Determine propagation scope**
  - [ ] List all consumer repositories (office-app, PartPulse, R_Roster, etc.)
  - [ ] Filter by classification (PUBLIC_API → all repos)
  - [ ] Filter by mandatory status (mandatory → immediate propagation)
  - [ ] Prioritize by priority level (CRITICAL first)

- [ ] **Assess breaking vs non-breaking**
  - [ ] Identify breaking changes (schema, required fields, stricter enforcement)
  - [ ] Plan migration strategy for breaking changes
  - [ ] Define transition period (minimum 2 weeks for breaking)
  - [ ] Prepare migration guidance documentation

### Create Propagation Plan

- [ ] **Document propagation strategy**
  - [ ] List target repositories
  - [ ] Define propagation order (dependencies first)
  - [ ] Set timeline (immediate vs phased)
  - [ ] Identify validation criteria
  - [ ] Plan rollback strategy

- [ ] **Prepare communication**
  - [ ] Notify affected teams
  - [ ] Explain change impact
  - [ ] Provide migration guidance
  - [ ] Set effective date

---

## Workflow Stage 5: Downward Propagation Execution

### Layer Down to Consumer Repositories

- [ ] **For each target repository**
  - [ ] Clone/update local repository copy
  - [ ] Create propagation branch
  - [ ] Copy canon to `governance/canon/` directory
  - [ ] Copy related schemas/templates if needed
  - [ ] Verify file integrity (hash check)

### Update Consumer Repository Inventory (MANDATORY)

- [ ] **Run inventory sync script for each repository**
  ```bash
  # Run from governance repository root
  python scripts/sync_repo_inventory.py \
    --repo-root /path/to/consumer-repo \
    --governance-source . \
    --repo-name "APGI-cmy/<repo-name>"
  ```

- [ ] **Verify inventory update results**
  - [ ] New canon appears in `layered_down` array
  - [ ] Canon removed from `missing` array (if was missing)
  - [ ] Coverage percentage updated
  - [ ] Last sync timestamp current
  - [ ] Status shows UP_TO_DATE

- [ ] **Validate inventory file**
  - [ ] JSON syntax valid
  - [ ] Coverage calculation correct
  - [ ] SHA256 hash matches central repository
  - [ ] No drift detected

### Create Propagation PR

- [ ] **Prepare propagation PR**
  - [ ] Commit canon file(s)
  - [ ] Commit updated `GOVERNANCE_ALIGNMENT_INVENTORY.json`
  - [ ] Include change rationale in PR description
  - [ ] Link to governance PR or issue
  - [ ] Tag with `governance-propagation` label

- [ ] **PR description must include**
  - [ ] Canon version propagated
  - [ ] Change summary
  - [ ] Migration guidance (if breaking)
  - [ ] Inventory coverage report (before/after percentages)
  - [ ] Validation criteria

---

## Workflow Stage 6: Propagation Validation

### Verify Propagation Success

- [ ] **For each consumer repository**
  - [ ] PR created and linked
  - [ ] PR passes all CI checks
  - [ ] Inventory updated and committed
  - [ ] Coverage percentage increased or maintained at 100%
  - [ ] No inventory drift detected

- [ ] **Run cross-repository validation**
  - [ ] All target repositories received canon
  - [ ] All inventories synchronized
  - [ ] No version mismatches
  - [ ] All SHA256 hashes match central

### Track Propagation Status

- [ ] **Update propagation tracking**
  - [ ] Document in `governance/reports/layer-down-status/`
  - [ ] Record timestamp for each repository
  - [ ] Note validation status (pass/fail)
  - [ ] Track coverage percentage change
  - [ ] Document any issues or blockers

- [ ] **Create propagation report**
  - [ ] Total repositories targeted
  - [ ] Successful propagations
  - [ ] Failed or blocked propagations
  - [ ] Overall coverage impact
  - [ ] Outstanding issues

---

## Workflow Stage 7: Post-Propagation Audit

### Verify Inventory Integrity Across All Repos

- [ ] **Central governance repository**
  - [ ] `governance/CANON_INVENTORY.json` current
  - [ ] All canons listed with correct metadata
  - [ ] SHA256 hashes accurate
  - [ ] Version numbers correct

- [ ] **Each consumer repository**
  - [ ] `GOVERNANCE_ALIGNMENT_INVENTORY.json` exists
  - [ ] Coverage percentage documented
  - [ ] Missing canons identified (if < 100%)
  - [ ] No MODIFIED status (unless intentional)

### Document Completion

- [ ] **Create completion record**
  - [ ] Summarize propagation outcome
  - [ ] Document final coverage percentages
  - [ ] List any repositories below 100% coverage
  - [ ] Create follow-up issues for gaps
  - [ ] Archive in `governance/reports/ripple-reports/`

- [ ] **Update governance metrics**
  - [ ] Record propagation time (start to completion)
  - [ ] Calculate success rate (% repos updated successfully)
  - [ ] Note any propagation defects
  - [ ] Track time to 100% coverage

---

## Emergency Fast-Track Workflow

For critical security or blocking governance defects:

- [ ] **Follow abbreviated process**
  - [ ] Create/modify canon (Stage 1)
  - [ ] Update inventory immediately (Stage 2)
  - [ ] Commit with `[EMERGENCY]` prefix (Stage 3)
  - [ ] Propagate immediately to all affected repos (Stage 5)
  - [ ] Update consumer inventories immediately
  - [ ] Retrospective documentation within 24 hours

- [ ] **Retrospective requirements**
  - [ ] Document emergency justification
  - [ ] Complete full checklist retrospectively
  - [ ] Create post-incident review
  - [ ] Update governance if process gap identified

---

## CI Integration Specification

### Proposed CI Gate: Inventory Drift Detection

**Purpose**: Automatically detect when governance canon changes without corresponding inventory updates

**Trigger**: On PR to governance repository affecting `governance/canon/**`

**Steps**:
1. Detect changed canon files in PR
2. Verify each changed canon has corresponding inventory entry in `CANON_INVENTORY.json`
3. Verify SHA256 hash in inventory matches file content
4. Verify inventory metadata updated (last_modified timestamp)
5. Fail if inventory missing or stale

**Implementation Location**: `.github/workflows/governance-inventory-validation.yml`

**Exit Criteria**:
- Exit 0: All canon changes have corresponding inventory updates
- Exit 1: Canon changed without inventory update (FAIL)
- Exit 1: Inventory hash mismatch (FAIL)

**Example GitHub Actions Workflow**:
```yaml
name: Governance Inventory Validation

on:
  pull_request:
    paths:
      - 'governance/canon/**'

jobs:
  validate-inventory:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Detect changed canons
        id: changes
        run: |
          git diff --name-only origin/${{ github.base_ref }}...HEAD | \
            grep '^governance/canon/' | \
            grep '\.md$' > changed_canons.txt || true
      
      - name: Verify inventory updated
        run: |
          if [ -s changed_canons.txt ]; then
            echo "Canon files changed - validating inventory..."
            
            # Check if CANON_INVENTORY.json was also updated
            if ! git diff --name-only origin/${{ github.base_ref }}...HEAD | \
              grep -q 'governance/CANON_INVENTORY.json'; then
              echo "❌ FAIL: Canon files changed but CANON_INVENTORY.json not updated"
              exit 1
            fi
            
            # TODO: Create scripts/validate_inventory_hashes.py to verify hash integrity
            # For now, just verify inventory file was modified
            
            echo "✓ Inventory validation passed"
          else
            echo "No canon files changed - skipping inventory validation"
          fi
```

---

## Troubleshooting

### Issue: Forgot to Update Inventory

**Symptom**: Canon committed but inventory not updated

**Solution**:
1. Update inventory: Edit `governance/CANON_INVENTORY.json`
2. Add/update canon entry with metadata
3. Calculate SHA256: `sha256sum governance/canon/<FILE>.md`
4. Commit inventory: `git add governance/CANON_INVENTORY.json && git commit --amend`
5. Re-push (if already pushed, create fixup commit)

### Issue: Inventory Hash Mismatch

**Symptom**: `status: "MODIFIED"` in consumer inventory

**Solution**:
1. Determine if modification intentional
2. If unintentional: Re-layer down from central governance
3. If intentional: Document change, create ripple signal
4. Re-run sync script to update hash

### Issue: Coverage Below 100% After Propagation

**Symptom**: Consumer repo `coverage_percentage < 100.0`

**Solution**:
1. Review `missing` array in consumer inventory
2. Prioritize by `priority` field (CRITICAL first)
3. Layer down missing canons
4. Re-run sync script
5. Verify coverage reaches 100%

---

## Related Documents

- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` - Ripple propagation policy
- `governance/runbooks/GOVERNANCE_INVENTORY_MAINTENANCE.md` - Inventory maintenance runbook
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` - Layer-down protocol
- `.github/agents/governance-repo-administrator.agent.md` - Agent contract

---

## Version History

| Version | Date       | Changes                                           |
|---------|------------|---------------------------------------------------|
| 1.0.0   | 2026-01-21 | Initial release - Complete workflow with inventory enforcement |

---

**Governance Authority**: APGI-cmy/maturion-foreman-governance  
**Document Type**: Workflow Checklist  
**Maintenance**: Governance Repo Administrator
