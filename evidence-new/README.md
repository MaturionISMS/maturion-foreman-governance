# Governance Evidence Archive

This directory contains **governance, assurance, and long-term institutional memory** evidence for the Maturion Foreman ecosystem.

## Purpose

This evidence archive serves as the **long-term memory, assurance, and governance authority** for:
- Governance evolution and constitutional changes
- Architectural decision records and compliance evidence
- Wave execution and phase delivery records (architectural milestones)
- Policy implementation and enforcement evidence
- Quality governance surveys and assessments
- Lessons learned and institutional memory

## Scope (Post-Cleanup)

✅ **This directory contains ONLY governance and assurance evidence.**

❌ **App execution and build artifacts have been moved to:** `/evidence_app_execution_archive/`

This separation ensures:
- Governance signal clarity
- Protection of institutional memory
- Clear distinction between governance and operational concerns

## Directory Structure

### Root Files (Governance & Assurance)
- **GOVERNANCE_HARDENING_SUMMARY.md** - Constitutional hardening evidence
- **FINAL_COMPLIANCE_REPORT.md** - Governance compliance validation
- **STRUCTURAL_CLEANUP_REPORT.md** - Repository structure governance
- **autonomy-reauthorization-implementation-evidence.md** - Constitutional autonomy controls
- **cs1-validator-fix-summary.md** - Constitutional safeguard implementation
- **e2e-autonomous-mcp-validation-final-summary.md** - Autonomy governance validation
- **governance-gate-dry-run-execution.md** - Governance gate enforcement evidence
- **red-qa-report-e2e-autonomous-mcp-validation.md** - Quality governance report

### `/evidence-new/wave-execution/`
Contains architectural delivery milestones and wave completion evidence:
- Wave execution summaries (WAVE_*.md)
- Phase execution records (PHASE_*.md)
- Architectural milestone completions
- Multi-wave coordination evidence

### `/evidence-new/surveys/`
Contains governance surveys and policy assessments:
- PR merge gate failure surveys
- Policy compliance surveys
- Governance effectiveness assessments

## Governance

### Evidence Retention Policy

**All evidence is retained permanently for audit and learning purposes.**

Governance evidence files:
- ✅ Are **immutable** (should not be edited after creation)
- ✅ Serve as **constitutional audit trail** for governance validation
- ✅ Enable **institutional learning** and memory preservation
- ✅ Support **assurance and compliance** verification
- ✅ Document **governance evolution** over time
- ✅ Protect **long-term institutional memory**

### Classification Rules

**KEEP in `/evidence-new/`:**
- Documents governance decisions and constitutional changes
- Proves architectural or policy compliance
- Captures lessons learned at governance level
- Serves long-term institutional memory
- Supports assurance or non-regression guarantees

**MOVED to `/evidence_app_execution_archive/`:**
- Build execution records and operational status
- Runtime failures, fixes, and recovery evidence
- CI/CD execution logs and permissions issues
- Token management and access configuration
- App lifecycle and delivery-specific artifacts
- Operational test debt elimination records

### Evidence Organization

When new evidence is created:
1. Determine if it's **governance/assurance** or **app execution**
2. Place governance evidence in `/evidence-new/`
3. Place app execution evidence in `/evidence_app_execution_archive/`
4. Use descriptive naming: `CATEGORY_DESCRIPTION_TYPE.md`
5. Include timestamp/version if applicable

### Evidence Usage

Governance evidence is used by:
- **Governance Memory**: Institutional learning from governance events
- **Audit Processes**: Verifying constitutional compliance
- **Assurance Verification**: Confirming policy adherence
- **Architecture Governance**: Tracking architectural decisions and rationale
- **Constitutional Evolution**: Understanding governance improvements
- **Long-Term Memory**: Preserving institutional knowledge

## Accessing Evidence

Evidence files are:
- **Searchable**: Use grep/search tools to find relevant governance evidence
- **Referenced**: Linked from governance documents and constitutional rules
- **Analyzable**: Parseable for governance pattern detection

## Examples

**Finding governance-related evidence:**
```bash
grep -r "governance" evidence-new/ --include="*.md"
```

**Finding wave execution evidence:**
```bash
ls evidence-new/wave-execution/WAVE_*.md
```

**Finding constitutional evidence:**
```bash
grep -r "constitutional" evidence-new/ --include="*.md"
```

**Finding compliance reports:**
```bash
ls evidence-new/*COMPLIANCE*.md
```

## Related Documents

- `/BUILD_PHILOSOPHY.md` - Build philosophy and quality standards
- `/foreman/governance/` - Active governance rules and policies
- `/foreman/constitution/` - Constitutional safeguards (CS1-CS6)
- `/maturion/philosophy/maturion-governance-constitution.md` - Governance constitution
- `/evidence_app_execution_archive/` - App execution and build artifacts (separated from governance)

---

**Status**: Active Governance Evidence Archive  
**Established**: 2025-12-13  
**Cleanup Executed**: 2025-12-19 (Issue: Evidence Folder Cleanup - Governance vs App Execution)  
**Authority**: Governance Centre (Maturion Mind) - Long-Term Memory & Assurance  
**Maintenance**: Governance evidence only - app execution artifacts archived separately
