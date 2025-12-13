# Lessons Learned Registry

## Purpose

This directory contains **explicit, auditable, and governed** learning from FL/CI (Feedback Loop / Continuous Improvement) incidents.

## Governance Requirements

Per FL/CI Constitutional Requirements:

1. **EXPLICIT**: All learnings must be documented in markdown files
2. **AUDITABLE**: Full incident context, root cause, and resolution documented
3. **GOVERNED**: Requires human approval before integration into Build Philosophy
4. **NEVER SILENT**: No heuristic-only updates - all changes visible and traceable

## Structure

Each learning document follows this structure:

```
/foreman/lessons-learned/
├── README.md (this file)
├── [incident-id]-[short-description].md
└── governance-log.md
```

## Document Template

Each lesson learned document must include:

1. **Incident ID**: Unique identifier
2. **Date**: When incident occurred
3. **Severity**: Critical, High, Medium, Low
4. **Root Cause**: What went wrong
5. **Impact**: What broke and why
6. **Resolution**: How it was fixed
7. **Prevention**: Proposed changes to prevent recurrence
8. **Approval Status**: Pending, Approved, Rejected, Implemented
9. **Approved By**: Human who approved (if approved)
10. **Implementation Date**: When changes were applied
11. **Evidence**: Links to commits, PRs, issues

## Approval Workflow

```
1. Incident Occurs
   ↓
2. Foreman Documents Lesson Learned (Explicit)
   ↓
3. Creates Proposal for Build Philosophy Update
   ↓
4. Submits to Human for Approval (Auditable)
   ↓
5. Human Reviews and Approves/Rejects (Governed)
   ↓
6. If Approved: Update Build Philosophy (Traceable)
   ↓
7. Log to Governance Memory (Never Silent)
```

## Integration with Build Philosophy

Approved learnings are integrated into:
- `/BUILD_PHILOSOPHY.md`
- `/foreman/architecture-design-checklist.md`
- `/foreman/qa/quality-integrity-contract.md`
- Relevant builder specifications

## Governance Log

All approvals/rejections logged in `governance-log.md` with:
- Timestamp
- Lesson ID
- Decision (Approved/Rejected)
- Approver
- Reason
- Implementation status

## Current Lessons

1. `001-typescript-compilation-validation.md` - TypeScript compilation in Red QA (Pending Approval)

---

**Status**: Active  
**Version**: 1.0  
**Authority**: FL/CI Governance  
**Last Updated**: 2025-12-13
