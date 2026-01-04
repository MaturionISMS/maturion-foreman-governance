# Enhancement Proposals — Mandatory Progress Recording Implementation Support

**Status**: PARKED — NOT AUTHORIZED FOR EXECUTION  
**Source**: Governance Issue — Mandatory Canonical Progress Recording & Wave Closure Certification (Issue #[ISSUE_NUMBER])  
**Date**: 2026-01-04  
**Agent**: Governance Repository Administrator

---

## Context

During implementation of mandatory canonical progress recording and wave closure certification governance (BL-017), several potential enhancements were identified that could improve the usability, automation, and effectiveness of the progress recording system.

These enhancements are **informational only** and require **explicit FM authorization** before execution.

---

## Enhancement 1: Automated Progress Artifact Validation

### Description

Create automated validation tooling that validates progress artifacts against the defined schema (WAVE_IMPLEMENTATION_PROGRESS.schema.md) at key checkpoints during wave execution.

### Motivation

- Manual validation is error-prone and time-consuming
- Schema defines clear validation rules that can be automated
- Early detection of completeness gaps prevents wave closure delays
- Automated validation ensures consistency across all waves

### Proposed Implementation Approach

**GitHub Action Workflow**:
- Trigger on PR creation/update when progress artifact modified
- Trigger on wave gate merge request (as PR gate check)
- Parse progress artifact markdown structure
- Validate against schema requirements (4 validation levels)
- Generate validation report with clear error messages
- Block PR merge if Level 4 (Wave Closure Certification) validation fails

**Validation Levels**:
1. Structural Completeness: All required sections present
2. Content Completeness: All required fields populated
3. Data Validity: Dates, enums, counts mathematically correct
4. Wave Closure Certification: All certification requirements met

### Benefits

- Immediate feedback on progress artifact completeness
- Reduces manual validation burden on FM
- Ensures consistency and compliance
- Prevents wave gate merge without certified completion

### Risks and Considerations

- Requires development effort to create validation tooling
- May need maintenance as schema evolves
- False positives could block legitimate progress updates
- Tooling must be tested before enforcement

### Classification

**PARKED — NOT AUTHORIZED FOR EXECUTION**

This is an operational enhancement, not a governance requirement. Progress recording is mandatory; automated validation is optional.

---

## Enhancement 2: Progress Artifact Generation Tooling

### Description

Create tooling to assist FM with creating, populating, and maintaining progress artifacts throughout wave execution.

### Motivation

- Manual artifact creation from template is time-consuming
- Data entry errors possible (typos in issue numbers, paths)
- Repetitive updates at phase transitions could be automated
- Artifact index generation could leverage file system inspection

### Proposed Implementation Approach

**CLI Tool or FM App Feature**:
- Command: `fm progress init --wave N` to scaffold new progress artifact from template
- Command: `fm progress update --issue NUM --phase PHASE` to update issue phase status
- Command: `fm progress add-artifact --name NAME --path PATH --status STATUS` to add to artifact index
- Command: `fm progress generate-index` to auto-generate artifact index from repository scan
- Command: `fm progress certify` to perform certification checklist and generate verdict

**Integration Points**:
- Pull issue data from GitHub issue tracker (titles, numbers, priorities)
- Scan repository for created artifacts (code, tests, docs)
- Validate against schema before committing updates
- Generate timeline entries automatically with timestamps

### Benefits

- Reduces manual effort in progress recording
- Improves accuracy (less manual data entry)
- Ensures timeliness (prompts for updates at phase transitions)
- Lowers cognitive load on FM (less context switching)

### Risks and Considerations

- Requires significant development effort
- Must maintain consistency with template/schema
- Tooling bugs could corrupt progress artifacts
- FM must still validate generated content

### Classification

**PARKED — NOT AUTHORIZED FOR EXECUTION**

This is an operational efficiency enhancement. Progress recording is mandatory; tooling assistance is optional.

---

## Enhancement 3: Visual Progress Dashboard

### Description

Create visual dashboard in FM App that renders progress artifact data in an accessible, at-a-glance format.

### Motivation

- Markdown progress artifacts require manual reading
- Visual representation faster for status assessment
- Blockers and gaps more prominent visually
- Real-time monitoring improves execution awareness

### Proposed Implementation Approach

**FM App Dashboard Feature**:
- Parse current progress artifact(s) for active waves
- Render wave overview: status, completion %, timeline
- Display issue cards: phase status, blockers, completion
- Visualize artifact index: categories, completeness, missing items
- Highlight blockers/gaps in red for visibility
- Provide drill-down to detailed views
- Enable refresh on demand or auto-refresh

**Visual Elements**:
- Progress bars for wave completion, QA status, artifact completeness
- Status indicators (color-coded: green, yellow, red)
- Timeline chart showing wave execution over time
- Checklist views for certification requirements

### Benefits

- Faster wave status assessment
- Improved real-time monitoring
- Better visibility for blockers and gaps
- Enhanced user experience for FM and human authority

### Risks and Considerations

- Requires UI/UX design and development effort
- Must remain synchronized with progress artifact (single source of truth)
- Dashboard bugs could misrepresent wave status
- Visual representation must not replace canonical artifact

### Classification

**PARKED — NOT AUTHORIZED FOR EXECUTION**

This is a usability enhancement. Progress recording in canonical artifact is mandatory; visual dashboard is optional.

---

## Enhancement 4: Progress Artifact Template Versioning

### Description

Establish versioning system for progress artifact template to handle template evolution over time without breaking existing artifacts.

### Motivation

- Template may need updates as governance evolves
- Existing progress artifacts should remain valid under their original template version
- Validation rules should respect template version
- Migration paths needed when template changes significantly

### Proposed Implementation Approach

**Template Versioning**:
- Add version field to template header (e.g., `**Template Version**: 1.0.0`)
- Maintain template changelog documenting version changes
- Archive old template versions for reference
- Update schema to check template version before applying validation rules

**Migration Support**:
- Document migration paths when template changes
- Provide migration scripts for non-breaking changes
- Require manual review for breaking changes
- Allow old template versions for completed waves (immutable)

### Benefits

- Enables template evolution without breaking old artifacts
- Clear versioning improves traceability
- Migration paths reduce upgrade friction
- Backward compatibility preserves historical artifacts

### Risks and Considerations

- Requires governance process for template changes
- Migration effort when template evolves
- Multiple template versions increase maintenance complexity

### Classification

**PARKED — NOT AUTHORIZED FOR EXECUTION**

Current template (v1.0.0) is sufficient for initial use. Versioning becomes relevant when first template update is needed.

---

## Enhancement 5: Integration with Issue Tracker Events

### Description

Integrate progress artifact updates with GitHub issue tracker events to provide automated prompts or updates when issues/PRs change state.

### Motivation

- FM may miss phase transitions if not monitoring actively
- Manual synchronization between issue tracker and progress artifact
- Automated prompts reduce forgetting to update
- Event-driven updates ensure timeliness

### Proposed Implementation Approach

**GitHub Webhooks/Actions**:
- Listen for issue state changes (opened, closed, labeled)
- Listen for PR state changes (opened, merged, closed)
- Trigger FM notification: "Issue #123 merged, update progress artifact"
- Optionally: auto-generate progress update commit (if tooling from Enhancement 2 exists)

**Event-Driven Updates**:
- Issue closed → Prompt FM to update issue phase status to COMPLETE
- PR merged → Prompt FM to update related issue and artifacts
- Issue labeled with blocker → Prompt FM to document blocker in progress artifact

### Benefits

- Ensures timely progress updates
- Reduces risk of missing phase transitions
- Improves synchronization with issue tracker
- Event-driven automation aligns with real-time execution

### Risks and Considerations

- Requires integration development
- Webhook reliability and error handling
- Notification fatigue if too many prompts
- FM must still validate and commit updates

### Classification

**PARKED — NOT AUTHORIZED FOR EXECUTION**

This is an operational automation enhancement. Progress recording is mandatory; event-driven prompts are optional.

---

## Submission

All enhancement proposals are **PARKED** and await explicit FM authorization before execution.

These enhancements are informational only, documenting potential improvements identified during governance work.

**Submitted By**: Governance Repository Administrator  
**Date**: 2026-01-04  
**Authority**: MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md  
**Routing**: governance/parking-station/ENHANCEMENT_PROGRESS_RECORDING_IMPLEMENTATION_SUPPORT.md
