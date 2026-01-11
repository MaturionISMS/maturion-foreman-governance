# Governance Version Matrix

## Purpose

This matrix tracks governance layer-down status and version alignment across all governed repositories in the Maturion ecosystem.

**Authority**: Governance Repository Administrator  
**Canonical Reference**: `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md`

---

## Repository Tracking Matrix

| Repository | Key | Governance Version | Layer-Down Status | Last Sync | Notes |
|------------|-----|-------------------|------------------|-----------|-------|
| maturion-foreman-office-app | foreman-office-app | TBD | PENDING | TBD | Next.js Foreman orchestration app |
| maturion-ai-foreman | ai-foreman | TBD | PENDING | TBD | Python-based Foreman implementation |
| PartPulse | partpulse | v2.1.0 | COMPLETE | 2026-01-11 | FPC layer-down complete, operational, Build-to-Green phase |

---

## Status Definitions

### Layer-Down Status
- **COMPLETE**: FPC layer-down fully completed, governance structure in place
- **IN_PROGRESS**: Layer-down initiated, not yet complete
- **PLANNED**: Repository identified for governance layer-down
- **NOT_APPLICABLE**: Repository does not require full governance layer-down

### Governance Version
- Version number indicates the governance canon version that was layered down
- Format: `vMAJOR.MINOR.PATCH` (SemVer)
- Empty indicates version tracking not yet established

---

## Adding New Repositories

When registering a new repository:

1. Complete FPC layer-down per `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md`
2. Create repository registration in `apps/<repo-key>/`
3. Add entry to this matrix with:
   - Repository name (GitHub repo name)
   - Repository key (canonical short name)
   - Governance version (from layer-down)
   - Status: COMPLETE (if finished) or IN_PROGRESS
   - Date of last sync/completion
   - Brief notes on status or purpose

---

## Sync Protocol

### When to Update
- Upon completion of FPC layer-down for a new repository
- When governance version is upgraded in a repository
- When layer-down status changes
- During periodic governance alignment audits

### Update Process
1. Update this matrix
2. Ensure corresponding `apps/<repo-key>/` directory exists
3. Verify `governance/alignment/GOVERNANCE_ALIGNMENT.md` in target repo reflects same version
4. Document in commit message

---

## Cross-References

### Related Documents
- `apps/README.md` - Repository index and directory structure
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` - Layer-down procedure
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` - Cross-repo protocol
- `governance/canon/GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md` - Versioning semantics

### Per-Repository Documentation
- `apps/<repo-key>/README.md` - Repository registration summary
- `apps/<repo-key>/docs/REPOSITORY_OVERVIEW.md` - Detailed repository information
- `apps/<repo-key>/mappings/GOVERNANCE_GATE_MAPPING.md` - Gate implementation mapping

---

## Maintenance

**Maintained By**: Governance Repository Administrator  
**Review Frequency**: As needed, minimum monthly during active layer-down periods  
**Last Updated**: 2026-01-11

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-01-11 | Initial matrix creation, added PartPulse registration | Governance Repo Admin |

---

**Version**: 1.0.0  
**Authority**: Governance Repository Administrator  
**Status**: Active
