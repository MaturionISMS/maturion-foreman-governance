# Enhancement Proposal: Automated Minimizing Language Detection

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Created**: 2026-01-08  
**Triggered By**: POLICY-NO-ONLY-LANGUAGE implementation (Issue #1)  
**Category**: Governance Enforcement Automation  
**Priority**: Medium

---

## Problem Statement

The POLICY-NO-ONLY-LANGUAGE bans minimizing language ("only", "just", "minor", "non-blocking") when describing test failures or technical debt. Currently, enforcement relies on manual review - humans must read PR descriptions and identify banned language patterns.

This creates several risks:
- Reviewers may miss subtle variations of banned language
- Inconsistent enforcement across different reviewers
- Time-consuming manual scanning of lengthy PR descriptions
- Test dodging attempts may evolve faster than reviewer awareness

**Current State**: Manual enforcement via human code review  
**Desired State**: Automated detection with immediate feedback

---

## Enhancement Description

Create an automated CI gate that scans PR descriptions, commit messages, and QA reports for banned minimizing language patterns defined in POLICY-NO-ONLY-LANGUAGE.

The gate would:

1. **Scan PR content** for banned language patterns when PR is opened or updated
2. **Detect variations** including case-insensitive matches and common substitutions
3. **Provide immediate feedback** via PR comment with specific violations highlighted
4. **Block merge** if banned language is detected (unless CS2 override present)
5. **Track patterns** to identify evolving test dodging tactics

This would shift enforcement from reactive (reviewer catches it) to proactive (system prevents it), ensuring consistent policy application across all PRs and reducing reviewer cognitive load.

The automation would reference the canonical banned language list in POLICY-NO-ONLY-LANGUAGE and could be updated as new patterns emerge, creating a feedback loop that improves detection over time.

---

## Benefits

- Immediate detection before human review
- Consistent enforcement across all PRs
- Reduced reviewer cognitive load
- Educational feedback for builders
- Pattern tracking for policy evolution
- Prevention rather than correction

---

## Related Documents

- `governance/policy/POLICY-NO-ONLY-LANGUAGE.md` - Source of banned language patterns
- `docs/bootstrap-learning/BOOTSTRAP-TEST-DODGING-001.md` - Pattern recognition guide
- `.github/workflows/governance-gate.yml` - Potential integration point

---

## Routing

This enhancement is now **PARKED** in `governance/parking-station/` per MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md.

Review and potential execution authorization is at the discretion of FM/Maturion leadership when governance automation wave is prioritized.

---

**End of Enhancement Proposal**
