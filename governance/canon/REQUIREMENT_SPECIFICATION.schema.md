# REQUIREMENT SPECIFICATION SCHEMA

## Status
Canonical Governance Specification  
Version: v1  
Authority: Foreman (FM)  
Governed By: REQUIREMENT_SPECIFICATION_GOVERNANCE.md

---

## 1. Purpose

This document defines the **normative schema** for Requirement Specification artifacts.

A Requirement Specification is valid only if it conforms to this schema.

This schema enforces:
- Structural completeness
- Traceability
- Testability
- Compliance readiness
- Auditability

---

## 2. Canonical Authority

This schema implements:

**REQUIREMENT_SPECIFICATION_GOVERNANCE.md:**
- Section 7: "Required Sections (Normative)" — defines mandatory sections and content
- Section 5: "Versioning" — requires version identification and immutability
- Section 6: "Approval Authority" — requires Johan's approval
- Section 11: "Traceability" — requires linkage to architecture, QA, and compliance

**GOVERNANCE_PURPOSE_AND_SCOPE.md:**
- Section 5.1: "Requirement Specification (Pre-Architecture)" — defines minimum required content
- Section 6: "QA, Gates, and Proof" — requires testable requirements

---

## 3. Requirement Specification Location

Requirement Specifications MUST be stored at one of the following locations:

**Option 1: Build-Specific (Recommended)**
```
architecture/builds/<build-id>/requirements.md
```

**Option 2: Cross-Build Archive**
```
architecture/requirements/<app-name>-v<version>-requirements.md
```

The active build is declared in:
```
architecture/BUILD_ACTIVE
```

---

## 4. Core Invariants

1. **Approval Mandatory**  
   No Requirement Specification is valid without Johan's explicit approval.

2. **Immutability Post-Approval**  
   Once approved, content MUST NOT be modified. Clarifications MUST be addenda.

3. **Completeness Mandatory**  
   All required sections MUST be present and non-empty.

4. **Traceability Mandatory**  
   Architecture and QA artifacts MUST reference the Requirement Specification they implement.

---

## 5. Required Fields (Normative)

Each Requirement Specification MUST include the following exact markers and sections.

### 5.1 Header Section

**Required Markers:**
- `REQUIREMENT_SPECIFICATION_SCHEMA_VERSION: v1`
- `APPLICATION_NAME: <string>`
- `VERSION: <semantic version>` (format: `MAJOR.MINOR.PATCH` without v prefix)
- `REQUIREMENT_SPEC_ID: <string>` (format: `<app-name>-requirements-vMAJOR.MINOR.PATCH`)
- `CREATED_DATE_UTC: <YYYY-MM-DD>`
- `CREATED_BY: Foreman`
- `APPROVAL_STATUS: <PENDING|APPROVED|REJECTED>`
- `APPROVAL_DATE_UTC: <YYYY-MM-DD or NONE>`
- `APPROVAL_AUTHORITY: <Johan Ras or NONE>`
- `PRIOR_VERSION: <requirement-spec-id or NONE>`

**Example:**
```
REQUIREMENT_SPECIFICATION_SCHEMA_VERSION: v1
APPLICATION_NAME: Foreman Office
VERSION: 1.2.0
REQUIREMENT_SPEC_ID: foreman-office-requirements-v1.2.0
CREATED_DATE_UTC: 2023-12-15
CREATED_BY: Foreman
APPROVAL_STATUS: APPROVED
APPROVAL_DATE_UTC: 2023-12-16
APPROVAL_AUTHORITY: Johan Ras
PRIOR_VERSION: foreman-office-requirements-v1.1.0
```

---

### 5.2 Functional Requirements Section

**Marker:** `## FUNCTIONAL REQUIREMENTS`

**Required Content:**
- Primary user-facing capabilities (enumerated)
- Core workflows (described in user terms)
- Expected behaviors (observable outcomes)
- Success criteria (how correctness is defined)

**Must NOT contain:**
- Implementation details (e.g., "use React hooks")
- Technology choices (e.g., "store in PostgreSQL")
- Code-level specifications

**Validity Rule:**  
Section MUST contain at least 3 distinct functional capabilities or workflows.

---

### 5.3 Integration Requirements Section

**Marker:** `## INTEGRATION REQUIREMENTS`

**Required Content:**
- External systems to integrate with (enumerated)
- APIs to consume (with purpose)
- APIs to expose (with purpose)
- Data synchronization requirements
- Authentication and authorization dependencies

**Allowed Values:**
- `NONE` — if no external integrations required

**Validity Rule:**  
If external systems are listed, MUST specify:
- System name
- Integration purpose
- Data flow direction (inbound/outbound/bidirectional)

---

### 5.4 Environment Requirements Section

**Marker:** `## ENVIRONMENT REQUIREMENTS`

**Required Content:**
- Hosting platform (e.g., Vercel, AWS, local Docker)
- Database requirements (type, schema complexity)
- Third-party service dependencies (e.g., SMTP, storage, auth providers)
- Scalability expectations (e.g., concurrent users, data volume)
- Performance expectations (if applicable)

**Validity Rule:**  
MUST specify:
- Where the application will run
- What infrastructure dependencies exist

---

### 5.5 QA Implications Section

**Marker:** `## QA IMPLICATIONS`

**Required Content:**
- How correctness will be verified (UI, API, integration tests)
- UI verification points (specific screens or workflows)
- Critical user journeys to test (end-to-end scenarios)
- Edge cases and error conditions (known failure modes)

**Validity Rule:**  
MUST enumerate at least:
- 1 UI verification point (unless backend-only), OR
- 1 API verification point (if backend or API-only), AND
- At least 2 critical user journeys or test scenarios

---

### 5.6 Risk Signals Section

**Marker:** `## RISK SIGNALS`

**Required Content:**
- Known unknowns (areas of uncertainty)
- Technical risks (e.g., API reliability, new technology, complexity)
- Compliance risks (e.g., data sensitivity, audit requirements, GDPR/POPIA)
- Operational risks (e.g., deployment complexity, rollback scenarios)

**Allowed Values:**
- `NONE` — if no material risks identified (rare)

**Validity Rule:**  
If risks are identified, MUST specify:
- Risk description
- Risk category (TECHNICAL|COMPLIANCE|OPERATIONAL|OTHER)
- Mitigation approach (if known) or flag for architecture

---

### 5.7 Future Extensibility Considerations Section

**Marker:** `## FUTURE EXTENSIBILITY CONSIDERATIONS`

**Required Content:**
- Anticipated evolution paths (what might change in future versions)
- Intentional flexibility points (where architecture should allow extension)
- Known limitations (what is explicitly out of scope for this version)

**Validity Rule:**  
MUST contain at least:
- 1 anticipated evolution path, OR
- 1 known limitation, OR
- Explicit statement: "No future extensibility anticipated for this scope"

---

## 6. Optional Sections

The following sections MAY be included but are not mandatory:

### 6.1 Glossary
- Definitions of domain-specific terms

### 6.2 Constraints
- Hard constraints not captured elsewhere (e.g., budget, timeline, regulatory)

### 6.3 Assumptions
- Explicit assumptions made during requirements definition

---

## 7. Validity Rules (Comprehensive)

A Requirement Specification is INVALID if:

1. **Schema Version Missing**  
   `REQUIREMENT_SPECIFICATION_SCHEMA_VERSION` is absent or not `v1`

2. **Approval Status Invalid**  
   `APPROVAL_STATUS` is not one of: `PENDING`, `APPROVED`, `REJECTED`

3. **Approval Inconsistency**  
   `APPROVAL_STATUS: APPROVED` but `APPROVAL_DATE_UTC` or `APPROVAL_AUTHORITY` is `NONE`

4. **Required Section Missing**  
   Any of sections 5.2-5.7 is absent

5. **Section Empty**  
   Any required section contains no content beyond the marker

6. **Functional Requirements Insufficient**  
   Functional Requirements section contains fewer than 3 capabilities/workflows

7. **QA Implications Insufficient**  
   QA Implications section does not enumerate verification points or test scenarios

8. **Immutability Violation**  
   Requirement Specification marked `APPROVED` is modified without creating a new version

---

## 8. Approval Workflow

### 8.1 Creation (Foreman)
- Foreman translates Johan's intent into structured requirements
- Foreman performs functional analysis
- Foreman creates `requirements.md` conforming to this schema
- `APPROVAL_STATUS: PENDING`

### 8.2 Submission (Foreman)
- Foreman submits to Johan for approval
- Johan reviews via UI or document

### 8.3 Approval (Johan)
- Johan approves: `APPROVAL_STATUS: APPROVED`, `APPROVAL_DATE_UTC` and `APPROVAL_AUTHORITY` set
- Johan rejects: `APPROVAL_STATUS: REJECTED`, requirements revised and resubmitted

### 8.4 Immutability (Post-Approval)
- Once `APPROVED`, content is immutable
- Clarifications require addendum file: `requirements-addendum-<date>.md`
- Material changes require new version

---

## 9. Traceability Requirements

### 9.1 Architecture Linkage

Architecture artifacts MUST include:
- `REQUIREMENT_SPEC_ID: <id>`
- Section: "Requirements Traceability" mapping architecture decisions to requirements

### 9.2 QA Linkage

QA suites MUST include:
- `REQUIREMENT_SPEC_ID: <id>`
- Test cases tagged with functional requirement IDs or descriptions

### 9.3 Compliance Linkage

Compliance artifacts (CONTROL_MAPPING.md) MUST reference:
- `REQUIREMENT_SPEC_ID: <id>`
- Which requirements trigger compliance controls

---

## 10. Template (Normative)

Below is the normative template structure.

```markdown
# REQUIREMENT SPECIFICATION: <APPLICATION_NAME> v<VERSION>

REQUIREMENT_SPECIFICATION_SCHEMA_VERSION: v1
APPLICATION_NAME: <string>
VERSION: <MAJOR.MINOR.PATCH>
REQUIREMENT_SPEC_ID: <app-name>-requirements-v<MAJOR.MINOR.PATCH>
CREATED_DATE_UTC: <YYYY-MM-DD>
CREATED_BY: Foreman
APPROVAL_STATUS: PENDING
APPROVAL_DATE_UTC: NONE
APPROVAL_AUTHORITY: NONE
PRIOR_VERSION: <requirement-spec-id or NONE>

---

## FUNCTIONAL REQUIREMENTS

### Primary Capabilities
1. <Capability 1>
2. <Capability 2>
3. <Capability 3>

### Core Workflows
- <Workflow 1>
- <Workflow 2>

### Expected Behaviors
- <Behavior 1>
- <Behavior 2>

### Success Criteria
- <Criterion 1>
- <Criterion 2>

---

## INTEGRATION REQUIREMENTS

### External Systems
- <System 1>: <Purpose> [<inbound|outbound|bidirectional>]
- <System 2>: <Purpose> [<inbound|outbound|bidirectional>]

Or: NONE

### Authentication/Authorization Dependencies
- <Dependency 1>
- <Dependency 2>

Or: NONE

---

## ENVIRONMENT REQUIREMENTS

### Hosting Platform
- <Platform name and configuration>

### Database Requirements
- <Database type, schema complexity>

### Third-Party Service Dependencies
- <Service 1>: <Purpose>
- <Service 2>: <Purpose>

### Scalability Expectations
- <Concurrent users, data volume, etc.>

### Performance Expectations
- <Response times, throughput, etc.>

Or: NONE

---

## QA IMPLICATIONS

### UI Verification Points
- <Screen/Workflow 1>
- <Screen/Workflow 2>

Or: N/A (backend-only)

### API Verification Points
- <Endpoint 1>: <Expected behavior>
- <Endpoint 2>: <Expected behavior>

Or: N/A (UI-only)

### Critical User Journeys
1. <Journey 1>
2. <Journey 2>

### Edge Cases and Error Conditions
- <Edge case 1>
- <Edge case 2>

---

## RISK SIGNALS

### Technical Risks
- <Risk 1>: <Description> [Mitigation: <approach or TBD>]
- <Risk 2>: <Description> [Mitigation: <approach or TBD>]

### Compliance Risks
- <Risk 1>: <Description> [Mitigation: <approach or TBD>]

### Operational Risks
- <Risk 1>: <Description> [Mitigation: <approach or TBD>]

Or: NONE

---

## FUTURE EXTENSIBILITY CONSIDERATIONS

### Anticipated Evolution Paths
- <Path 1>
- <Path 2>

### Intentional Flexibility Points
- <Flexibility 1>
- <Flexibility 2>

### Known Limitations
- <Limitation 1>
- <Limitation 2>

Or: No future extensibility anticipated for this scope.

---

End of Requirement Specification
```

---

## 11. Validation Checklist (For Foreman)

Before submitting for approval, Foreman MUST verify:

- [ ] Schema version declared
- [ ] All required header fields present
- [ ] All required sections present
- [ ] Functional requirements enumerate at least 3 capabilities/workflows
- [ ] Integration requirements specify external systems or `NONE`
- [ ] Environment requirements specify hosting and dependencies
- [ ] QA implications enumerate verification points and test scenarios
- [ ] Risk signals identify risks or explicitly state `NONE`
- [ ] Future extensibility considerations provided
- [ ] No implementation details or technology choices in requirements
- [ ] All content is problem-focused, not solution-focused

---

## 12. Enforcement

### 12.1 Pre-Architecture Gate

Foreman MUST halt if:
- Requirement Specification is missing
- Requirement Specification is invalid per this schema
- `APPROVAL_STATUS` is not `APPROVED`

### 12.2 QA Design Gate

Foreman MUST halt if:
- QA suite does not reference `REQUIREMENT_SPEC_ID`
- QA test cases do not map to functional requirements

### 12.3 Build Handover Gate

Builders MUST halt if:
- Architecture does not reference `REQUIREMENT_SPEC_ID`
- Scope is ambiguous relative to requirements

---

## 13. Canonical Precedence

This schema is canonical.

If a conflict exists between this schema and any requirement specification artifact,
this schema prevails.

---

End of REQUIREMENT SPECIFICATION SCHEMA
