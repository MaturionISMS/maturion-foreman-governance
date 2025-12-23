# Legacy Memory Archive

**Status**: Archived — Reference Only  
**Date Archived**: 2024-12-23  
**Reason**: Transition to canonical memory structure

---

## Purpose

This directory contains the **legacy memory structure** from the pre-canonical governance model.

This content was part of the old Foreman application runtime and is **NOT** part of the new canonical governance memory model.

---

## What's Archived Here

The following legacy memory directories and content:

- **architecture/** - Legacy memory fabric architecture docs
- **evidence/** - Legacy execution evidence
- **foreman/** - Legacy Foreman-specific memory
- **global/** - Legacy global memory (different structure than canonical GLOBAL/)
- **implementation/** - Legacy implementation reports
- **lessons-learned/** - Legacy incident and lesson-learned logs
- **projects/** - Legacy project memory
- **qa/** - Legacy QA memory
- **retirement/** - Legacy retirement content
- **schemas/** - Legacy memory schemas
- **README_LEGACY.md** - Original memory README (for reference)

---

## Status: ARCHIVED (Not Active)

This legacy content is:
- ❌ NOT part of the canonical memory structure
- ❌ NOT to be used by new implementations
- ❌ NOT governed by new memory authority policies
- ✅ Preserved for historical reference only
- ✅ Available in git history for recovery if needed

---

## Why Archived

The legacy memory structure was:
- Designed for the old Foreman application runtime
- Mixed governance and application concerns
- Not aligned with the new canonical governance model
- Part of the bootstrap contamination that was cleaned up

The new canonical structure (`memory/GLOBAL/`, `memory/TENANT/`, etc.) provides:
- Clear governance-only design
- Identity-level memory (not embodiment-level)
- Explicit permission model (GLOBAL permitted, TENANT disabled)
- Memory authority policies (read/write/forget)
- Audit trail requirements

---

## For Developers

When working with memory:
- **DO** use the canonical structure (`memory/GLOBAL/`, `memory/TENANT/`, etc.)
- **DO** follow memory authority policies in `memory/AUTHORITY/`
- **DO NOT** attempt to use this legacy content
- **DO NOT** add new content to this archive
- **MAY** reference this archive for historical context only

---

## For Agents

When proposing memory operations:
- **DO** use canonical memory structure
- **DO** follow `MEMORY_WRITE_POLICY.md` for write proposals
- **DO** follow `MEMORY_READ_POLICY.md` for read access
- **DO NOT** reference or use legacy memory
- **DO NOT** attempt to migrate legacy content without governance approval

---

## Migration Considerations

If legacy content needs to be migrated to canonical structure:

1. **DO NOT** do this automatically
2. **DO** escalate to governance authority
3. **DO** provide clear justification for migration
4. **DO** propose as memory write per `MEMORY_WRITE_POLICY.md`
5. **DO** document transformation from legacy to canonical format

Most legacy content should **NOT** be migrated - it was application-specific, not governance-level memory.

---

## Recovery

If you need to recover content from this archive:

```bash
# List archive contents
ls -la memory/_LEGACY_ARCHIVED/

# View specific file
cat memory/_LEGACY_ARCHIVED/path/to/file.md

# Search in archive
grep -r "pattern" memory/_LEGACY_ARCHIVED/
```

All content is also available in git history before the Wave M1 canonical structure transition.

---

**Archived — Reference Only — Do Not Use for Active Operations**
