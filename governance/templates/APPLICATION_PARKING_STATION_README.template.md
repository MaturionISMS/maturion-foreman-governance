# Application Parking Station README Template

**Purpose**: Template for `.architecture/parking-station/README.md` in application repositories

---

# [Application Name] Parking Station

## Purpose

The Application Parking Station is a canonical repository for **enhancement and improvement proposals** that are:

- Identified during work execution
- Conceptually valuable
- Not currently required for current scope
- Intentionally deferred for explicit authorization

This parking station implements the **Mandatory Enhancement & Improvement Capture Standard** defined in governance canon.

## Parking Station Rules

### While Parked

Items in the parking station are **documentation-only**:

- ❌ **NO implementation permitted**
- ❌ **NO proactive execution**
- ❌ **NO scope expansion**
- ❌ **NO conversion to tasks without authorization**
- ❌ **NO escalation as blockers**

### Activation Requirements

To unpark an item, **all** conditions must be met:

1. **System Stability**
   - Application is in stable state
   - No critical issues or blockers
   - Current work scope is complete

2. **Explicit Authorization**
   - FM provides written authorization
   - Scope and priority defined
   - Resources allocated

3. **New Work Unit**
   - Cannot proceed directly from parked document
   - Must create new issue with:
     - Explicit scope and acceptance criteria
     - Impact analysis
     - Risk assessment
     - Success criteria

## Submission Format

Each enhancement proposal should follow this structure:

```markdown
## Enhancement: [Brief Title]

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Submitted**: [YYYY-MM-DD]  
**Submitted By**: [Agent/Builder that identified this]  
**Work Context**: [Issue/PR/Task that revealed this opportunity]

**Proposal**: 
[Plain language description of the enhancement or improvement. 
Keep it concise (1-3 paragraphs). Avoid prescriptive implementation detail.]

**Benefit**: 
[Why this would be valuable. What problem it solves or what it improves.]

**Estimated Impact**: [Optional: Low/Medium/High]
```

## Routing and Submission

Enhancements are submitted by:
- Agents at work unit completion
- Builders at PR handover
- FM during review or oversight

All submissions MUST include the `PARKED — NOT AUTHORIZED FOR EXECUTION` marker.

## Governance Compliance

This parking station is governed by:

- `MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md` (Capture requirements)
- `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` (Learning preservation)
- `GOVERNANCE_PURPOSE_AND_SCOPE.md` (Governance as canonical memory)

## Authority Hierarchy

1. **Johan Ras (Human Owner / FM Authority)**
2. **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** (Canon)
3. **Application-Specific Governance** (If applicable)
4. **This Parking Station** (Local implementation)

## Parked Items Inventory

| ID | Title | Submitted | Status | Context |
|----|-------|-----------|--------|---------|
| [Example entries below - delete when creating actual README] |
| E001 | Example Enhancement | 2025-12-31 | PARKED | Issue #123 |

## Change Control

Changes to parking station documents:
- New submissions: No approval required (auto-park)
- Updates to submissions: Submitter or FM approval
- Unparking: Requires explicit FM authorization
- Deletion: Requires FM approval

## Review Cadence

Parking station reviews are conducted:
- By FM at discretion
- Not on fixed schedule
- Based on system readiness and priorities
- Never automatically

## Guiding Principle

> **Capture learning continuously.  
> Execute deliberately.  
> Improve systematically.**

---

**Document Control**

- **Template Version**: 1.0.0
- **Governance Standard**: MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md
- **Created**: [Date when this README is created in application repo]
- **Last Updated**: [Date]
- **Status**: Active

---

End of Parking Station README
