# WARNING_DISCOVERY_REPORT Schema

## Status
**Type**: Canonical Schema Definition  
**Authority**: Binding on ALL agents  
**Version**: 1.0.0  
**Date**: 2026-01-07  
**Integration**: WARNING_DISCOVERY_BLOCKER_PROTOCOL.md, QA_POLICY_MASTER.md Section 3.3

---

## Purpose

Defines the required structure and content for Warning Discovery Reports generated when an agent discovers warnings or test debt from prior work.

---

## Required Fields

### 1. Discovery Metadata

```json
{
  "discoveryMetadata": {
    "discoveringAgentId": "string (required) - ID of agent that discovered warnings",
    "discoveryTimestamp": "ISO 8601 datetime (required) - When warnings were discovered",
    "currentTask": "string (required) - Description of task being executed when discovered",
    "currentWave": "string (optional) - Wave number if applicable",
    "currentSubwave": "string (optional) - Subwave number if applicable",
    "currentJobReference": "string (optional) - Job/issue reference",
    "repository": "string (required) - Repository where warnings discovered"
  }
}
```

---

### 2. Warning Details

```json
{
  "warningDetails": {
    "warnings": [
      {
        "sourceFile": "string (required) - File path relative to repository root",
        "lineNumber": "number (optional) - Line number if applicable",
        "warningMessage": "string (required) - Full warning text",
        "warningSeverity": "enum (required) - CRITICAL | HIGH | MEDIUM | LOW",
        "warningType": "enum (required) - BUILD | LINT | TEST | TEST_DEBT | SUPPRESSED",
        "warningCategory": "string (optional) - Category per tool (e.g., typescript-error, eslint-no-unused-vars)"
      }
    ],
    "totalWarnings": "number (required) - Total count of warnings discovered"
  }
}
```

**Warning Severity** (per QA_POLICY_MASTER.md Section 3.3.5):
- `CRITICAL`: Security, data corruption, memory leaks, API violations, imminent deprecations
- `HIGH`: Performance, type safety, accessibility, best practice violations with known failure modes
- `MEDIUM`: Style (if permitted), optional chaining, informational with no runtime impact
- `LOW`: Third-party library warnings, platform-specific with workarounds

**Warning Type**:
- `BUILD`: Build/compilation warnings
- `LINT`: Linter warnings (ESLint, Pylint, etc.)
- `TEST`: Test framework warnings
- `TEST_DEBT`: Skipped tests, incomplete tests, stubbed tests
- `SUPPRESSED`: Warnings that were suppressed without whitelist justification

---

### 3. Origin Assessment

```json
{
  "originAssessment": {
    "suspectedOriginWave": "string (optional) - Best guess of originating wave",
    "suspectedOriginSubwave": "string (optional) - Best guess of originating subwave",
    "suspectedOriginJob": "string (optional) - Best guess of originating job/issue",
    "suspectedResponsibleAgent": "string (optional) - Best guess of responsible agent",
    "gitCommitReference": "string (optional) - Commit SHA if identifiable",
    "mergeTimestamp": "ISO 8601 datetime (optional) - When suspected origin merged",
    "assessmentMethod": "string (required) - How origin was assessed (e.g., git blame, CI logs, manual inspection)",
    "assessmentConfidence": "enum (required) - HIGH | MEDIUM | LOW - Confidence in origin assessment"
  }
}
```

---

### 4. Impact Assessment

```json
{
  "impactAssessment": {
    "canCurrentWorkProceed": "enum (required) - YES | NO | UNKNOWN",
    "affectsCurrentWorkCorrectness": "boolean (required)",
    "affectsCurrentWorkArchitecture": "boolean (required)",
    "isCurrentWorkBlocked": "boolean (required) - Always true if warnings from prior work",
    "impactDescription": "string (required) - Detailed description of impact on current work",
    "blockingJustification": "string (required) - Why current work must halt"
  }
}
```

---

### 5. Evidence Artifacts

```json
{
  "evidenceArtifacts": {
    "ciLogReferences": [
      {
        "logUrl": "string (optional) - URL to CI log",
        "logExcerpt": "string (optional) - Relevant excerpt from log",
        "logTimestamp": "ISO 8601 datetime (optional)"
      }
    ],
    "localBuildLogExcerpts": "string (optional) - Excerpts from local build logs",
    "screenshots": [
      {
        "screenshotPath": "string (optional) - Path to screenshot file",
        "screenshotDescription": "string (optional) - What screenshot shows"
      }
    ],
    "gitDiffContext": "string (optional) - Git diff showing warning context"
  }
}
```

---

### 6. Escalation Request

```json
{
  "escalationRequest": {
    "escalationTimestamp": "ISO 8601 datetime (required) - When escalated",
    "escalationRecipient": "enum (required) - FOREMAN | GOVERNANCE_ADMIN",
    "requestedAction": "string (required) - Must be 'Require original agent remediation as BLOCKER'",
    "urgency": "enum (required) - IMMEDIATE | HIGH | MEDIUM",
    "blockingStatement": "string (required) - Explicit statement that current work is BLOCKED"
  }
}
```

---

## Complete Schema Example

```json
{
  "schemaVersion": "1.0.0",
  "reportType": "WARNING_DISCOVERY_REPORT",
  "discoveryMetadata": {
    "discoveringAgentId": "ui-builder-01",
    "discoveryTimestamp": "2026-01-07T14:30:00Z",
    "currentTask": "Implement parking station UI components",
    "currentWave": "2",
    "currentSubwave": "2.5",
    "currentJobReference": "issue-405",
    "repository": "maturion-foreman-office-app"
  },
  "warningDetails": {
    "warnings": [
      {
        "sourceFile": "src/components/ParkingStation.tsx",
        "lineNumber": 42,
        "warningMessage": "React Hook useEffect has a missing dependency: 'fetchData'. Either include it or remove the dependency array.",
        "warningSeverity": "HIGH",
        "warningType": "LINT",
        "warningCategory": "react-hooks/exhaustive-deps"
      },
      {
        "sourceFile": "src/utils/api.ts",
        "lineNumber": 15,
        "warningMessage": "Argument of type 'string | undefined' is not assignable to parameter of type 'string'.",
        "warningSeverity": "HIGH",
        "warningType": "BUILD",
        "warningCategory": "typescript-error-2345"
      }
    ],
    "totalWarnings": 2
  },
  "originAssessment": {
    "suspectedOriginWave": "2",
    "suspectedOriginSubwave": "2.3",
    "suspectedOriginJob": "issue-401",
    "suspectedResponsibleAgent": "api-builder-01",
    "gitCommitReference": "abc123def456",
    "mergeTimestamp": "2026-01-06T18:00:00Z",
    "assessmentMethod": "Git blame analysis + CI log review",
    "assessmentConfidence": "HIGH"
  },
  "impactAssessment": {
    "canCurrentWorkProceed": "NO",
    "affectsCurrentWorkCorrectness": true,
    "affectsCurrentWorkArchitecture": false,
    "isCurrentWorkBlocked": true,
    "impactDescription": "The useEffect warning affects component lifecycle and may cause stale data. The TypeScript warning indicates potential runtime errors.",
    "blockingJustification": "Current UI components depend on api.ts module; undefined handling error could cause runtime failures in parking station UI."
  },
  "evidenceArtifacts": {
    "ciLogReferences": [
      {
        "logUrl": "https://github.com/org/repo/actions/runs/12345",
        "logExcerpt": "Warning: React Hook useEffect has a missing dependency...",
        "logTimestamp": "2026-01-07T14:25:00Z"
      }
    ],
    "localBuildLogExcerpts": "npm run lint output:\n/src/components/ParkingStation.tsx\n  42:5  warning  React Hook useEffect has a missing dependency...",
    "screenshots": [],
    "gitDiffContext": "File api.ts modified in commit abc123def456 introducing optional parameter without proper handling"
  },
  "escalationRequest": {
    "escalationTimestamp": "2026-01-07T14:35:00Z",
    "escalationRecipient": "FOREMAN",
    "requestedAction": "Require original agent remediation as BLOCKER",
    "urgency": "IMMEDIATE",
    "blockingStatement": "Current work on issue-405 subwave 2.5 is BLOCKED pending remediation of warnings from prior work (issue-401 subwave 2.3)"
  }
}
```

---

## Validation Rules

### Required Field Validation
- All fields marked `(required)` MUST be present and non-empty
- All timestamps MUST be valid ISO 8601 format
- All enums MUST use specified values

### Warning Details Validation
- `totalWarnings` MUST equal length of `warnings` array
- Each warning MUST have at least `sourceFile`, `warningMessage`, `warningSeverity`, `warningType`
- `warningSeverity` MUST be one of: CRITICAL, HIGH, MEDIUM, LOW
- `warningType` MUST be one of: BUILD, LINT, TEST, TEST_DEBT, SUPPRESSED

### Impact Assessment Validation
- If `canCurrentWorkProceed` = "NO", then `isCurrentWorkBlocked` MUST be `true`
- `blockingJustification` MUST be at least 50 characters (substantive)

### Escalation Request Validation
- `requestedAction` MUST be exactly "Require original agent remediation as BLOCKER"
- `urgency` for CRITICAL warnings MUST be "IMMEDIATE"

---

## Usage

### When to Generate
- IMMEDIATELY upon discovering warnings from prior work
- Before any attempt to work around warnings
- Before any attempt to suppress warnings
- Before continuing current work

### Who Generates
- Discovering agent (the agent that found the warnings)
- NOT the original agent (they generate WARNING_REMEDIATION_REPORT)

### What Happens Next
1. Discovering agent halts current work
2. Discovering agent generates this report
3. Discovering agent escalates to FM/Governance
4. FM/Governance identifies original agent
5. Original agent re-assigned to remediate as BLOCKER
6. Original agent generates WARNING_REMEDIATION_REPORT
7. Discovering agent verifies and generates WARNING_VERIFICATION_REPORT
8. Only then may discovering agent resume work

---

## Storage Location

**Path**: `/governance/evidence/warnings/discovery/WARNING_DISCOVERY_REPORT_<timestamp>_<discoveringAgentId>.json`

**Example**: `/governance/evidence/warnings/discovery/WARNING_DISCOVERY_REPORT_2026-01-07T14-35-00Z_ui-builder-01.json`

**Committed**: YES - Must be committed to repository for audit trail

---

## Integration

This schema is referenced by:
- `WARNING_DISCOVERY_BLOCKER_PROTOCOL.md` Section 2.2
- `QA_POLICY_MASTER.md` Section 3.3.2
- `BUILDER_QA_HANDOVER_POLICY.md` Section 8.4
- `ESCALATION_POLICY.md` (reactive escalation: warning discovery)

---

## Template

See: `governance/templates/WARNING_DISCOVERY_REPORT.template.md`

---

**Document Authority**: Governance Administrator  
**Approval**: Johan (Maturion Engineering Leadership)  
**Effective Date**: 2026-01-07
