# APP DESCRIPTION REQUIREMENT POLICY

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Johan Ras  
Applies To: All Applications, All Repositories  
Required By: Issue - Enforce App Description → Functional Requirement Specification (FRS) Structural Alignment

---

## 1. Purpose

This policy establishes **App Descriptions as mandatory upstream authority artifacts** for all applications in the Maturion ecosystem.

App Descriptions define the **root identity, purpose, and scope** of an application and **precede all downstream specifications**, including Functional Requirement Specifications (FRS), architecture compilation, and build authorization.

**Constitutional Principle**:
> **No Architecture or Functional Requirement Specification may exist without an authoritative App Description.**

The App Description is the **first artifact** in the canonical flow:

```
App Description (Authoritative)
    ↓
Functional Requirement Specification (Derived)
    ↓
Architecture Compilation
    ↓
Build Authorization
    ↓
Implementation
```

---

## 2. Constitutional Authority

This policy derives authority from:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Build Model Section 5.1 (Requirement Specification Pre-Architecture)
- **REQUIREMENT_SPECIFICATION_GOVERNANCE.md** - Requirements-First principle
- **ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md** - Architecture cannot exist without clear requirements
- **One-Time Build Law** - Completeness requires upstream clarity

---

## 3. Core Requirements

### 3.1 App Descriptions Are MANDATORY

**Rule**: Every application MUST have an authoritative App Description.

**Rationale**: App Descriptions define product intent, which precedes functional specifications. Without product intent, requirements cannot be correctly derived.

**Enforcement**: 
- Architecture compilation MUST NOT proceed without validated App Description
- Build Authorization Gate MUST validate App Description existence
- FRS MUST explicitly reference and derive from App Description

### 3.2 App Descriptions Define Authoritative Product Intent

**Rule**: App Descriptions are the **single source of truth** for:
- Application purpose
- Application scope
- Success criteria
- Product vision

**Implications**:
- FRS requirements MUST align with App Description
- Architecture MUST derive True North from App Description
- No FRS requirement may contradict App Description intent
- Scope changes require App Description update first

### 3.3 App Descriptions MUST Exist BEFORE Downstream Artifacts

**Ordering Rule**: App Description creation precedes:
1. **Functional Requirement Specifications (FRS)**
2. **Architecture Compilation**
3. **Build Authorization**
4. **Implementation**

**Blocking Rule**: No downstream artifact may be created without an approved, authoritative App Description.

---

## 4. App Description Canonical Location

### 4.1 Canonical Location (REQUIRED)

**Rule**: The authoritative App Description MUST be located at:

```
docs/governance/{APP}_APP_DESCRIPTION.md
```

Where `{APP}` is the application name (e.g., `FOREMAN_APP_DESCRIPTION.md`, `PARTPULSE_APP_DESCRIPTION.md`).

**Rationale**: 
- Governance artifacts must have predictable, canonical locations
- Centralized governance documentation ensures discoverability
- Audit and compliance require consistent artifact locations

### 4.2 Root Location (OPTIONAL)

**Rule**: A convenience duplicate MAY exist at:

```
/APP_DESCRIPTION.md
```

(At repository root)

**Constraints**:
- Root location is **OPTIONAL ONLY**
- Root version is a **convenience duplicate** for developer access
- Canonical governance location is `docs/governance/{APP}_APP_DESCRIPTION.md`
- **All governance references MUST use the canonical location**
- If root duplicate exists, it MUST be kept in sync with canonical version

**Recommendation**: Use symbolic link or automated sync to maintain consistency if root duplicate is used.

---

## 5. App Description Content Requirements

### 5.1 Required Sections

Every App Description MUST include:

1. **Status Header**
   - Version
   - Status: `Authoritative | Draft | Superseded`
   - Owner (identified by name/role)
   - Approval Date
   - Last Updated

2. **Application Identity**
   - Application name
   - Purpose statement (what the app does)
   - Target users/audience
   - Core value proposition

3. **Scope Definition**
   - What is in scope
   - What is explicitly out of scope
   - Boundaries and constraints

4. **Success Criteria**
   - How to measure successful delivery
   - Key outcomes expected
   - Definition of "done" for the application

5. **Strategic Context**
   - Why this application exists
   - Business or operational driver
   - Relationship to other applications or systems

### 5.2 Optional Sections

App Description MAY include:
- High-level feature list (non-exhaustive)
- User personas
- Key use cases
- Non-functional priorities (performance, security, etc.)
- Future evolution considerations

---

## 6. App Description Approval and Authority

### 6.1 Approval Authority

**Rule**: App Descriptions MUST be approved by:
- **Johan (Human Authority)** - Final approval for all applications
- **OR** Designated Product Owner (if delegated by Johan)

### 6.2 Status: Authoritative

**Rule**: An App Description is considered **Authoritative** when:
- All required sections are complete
- Approval from designated authority is documented
- Status field is set to `Authoritative`
- Version is identified

**Non-Authoritative App Descriptions**:
- Status: `Draft` - Under development, not yet approved
- Status: `Superseded` - Replaced by newer version

**Blocking Rule**: Only App Descriptions with status `Authoritative` may be used as upstream authority for FRS, Architecture, or Build.

---

## 7. App Description Versioning and Evolution

### 7.1 Immutability After Approval

**Rule**: Once marked `Authoritative`, App Descriptions are **immutable**.

**Rationale**: Immutability ensures:
- Audit trail integrity
- Traceability stability
- Downstream artifacts reference stable source

### 7.2 Creating New Versions

To update an authoritative App Description:
1. Create new version with incremented version number
2. Reference previous version (Supersedes)
3. Follow full approval process
4. Mark previous version as `Superseded`
5. Update all downstream references (FRS, Architecture) to new version

---

## 8. Relationship to Functional Requirement Specifications (FRS)

### 8.1 Derivation Requirement

**Rule**: Every FRS MUST explicitly state derivation from App Description.

**Required Statement Location**: FRS header or Section 0 (preamble)

**Example Derivation Statement**:
> "This Functional Requirement Specification is derived from `FOREMAN_APP_DESCRIPTION.md` version 1.2, approved 2025-12-15. All requirements herein implement the application purpose, scope, and success criteria defined in that authoritative document."

### 8.2 Alignment Validation

**Rule**: FRS MUST align with App Description in:
- **Purpose**: FRS requirements must implement App Description purpose
- **Scope**: FRS scope must not exceed App Description scope
- **Success Criteria**: FRS acceptance criteria must map to App Description success criteria

**Contradiction Rule**: No FRS requirement may contradict App Description intent. If contradiction is discovered, App Description takes precedence and FRS must be corrected.

### 8.3 Traceability

**Rule**: Traceability matrix MUST exist showing:
- App Description → FRS derivation
- App Description success criteria → FRS acceptance criteria
- App Description scope boundaries → FRS scope boundaries

---

## 9. Relationship to Architecture Compilation

### 9.1 Architecture Input Requirement

**Rule**: Architecture Compilation MUST validate App Description before proceeding.

**Validation Requirements** (per ARCHITECTURE_COMPILATION_CONTRACT.md):
- App Description exists at canonical location
- Status is `Authoritative`
- Owner is identified
- Version is identified
- Approval status is confirmed

### 9.2 True North Derivation

**Rule**: Architecture "True North" MUST be derived from App Description.

**Required Statement** (per minimum-architecture-template.md):
> "This True North is derived from `{APP}_APP_DESCRIPTION.md` version {X.Y}."

**Alignment Confirmation**:
- Architecture must confirm no contradiction with App Description intent
- Architecture must reference App Description file explicitly

---

## 10. Relationship to Build Authorization Gate

### 10.1 Build Precondition

**Rule**: Build Authorization Gate MUST validate App Description before build may proceed.

**Blocking Conditions** (per BUILD_AUTHORIZATION_GATE.md):
- App Description missing
- App Description not authoritative
- FRS does not reference App Description
- Derivation lineage unclear

### 10.2 Evidence Requirements

**Rule**: Build Authorization Gate MUST require evidence:
- `architecture/builds/<build-id>/app-description-validation.md`
- FRS header or Section 0 showing derivation statement

---

## 11. Enforcement

### 11.1 Pre-FRS Enforcement

**Gate**: No FRS may be created without approved, authoritative App Description.

**Validation**:
- FRS creation checklist includes App Description validation
- FRS references App Description explicitly
- FRS derivation statement is present

### 11.2 Pre-Architecture Enforcement

**Gate**: No Architecture Compilation may proceed without validated App Description.

**Validation** (per ARCHITECTURE_COMPILATION_CONTRACT.md Section III):
- App Description exists
- App Description is authoritative
- FRS references App Description
- Alignment checklist is complete

### 11.3 Pre-Build Enforcement

**Gate**: No Build Authorization may be granted without validated App Description → FRS → Architecture lineage.

**Validation** (per BUILD_AUTHORIZATION_GATE.md Precondition 1):
- App Description exists and is authoritative
- FRS explicitly states derivation from App Description
- Evidence artifacts exist

---

## 12. Integration with Other Governance Artifacts

This policy integrates with:
- **ARCHITECTURE_COMPILATION_CONTRACT.md** - Defines App Description as Input #1
- **BUILD_AUTHORIZATION_GATE.md** - Defines App Description validation as Precondition 1
- **minimum-architecture-template.md** - Requires True North derivation from App Description
- **app-description-frs-alignment-checklist.md** - Defines validation procedure
- **REQUIREMENT_SPECIFICATION_GOVERNANCE.md** - FRS as downstream artifact
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Requirement Specification as first step

---

## 13. Explicit Non-Goals

This policy does NOT:
- Define App Description content format in detail (deferred to template or schema)
- Implement CI workflow changes (structural policy only)
- Modify runtime behavior
- Change existing approved App Descriptions retroactively

---

## 14. Migration and Retroactive Application

### 14.1 Existing Applications Without App Descriptions

**Rule**: Existing applications without App Descriptions MUST create them before next architecture update or build.

**Process**:
1. Review existing documentation (README, FRS, architecture) to extract intent
2. Create App Description at canonical location
3. Obtain approval from Johan or designated authority
4. Update FRS and Architecture to reference App Description
5. Validate alignment using app-description-frs-alignment-checklist.md

### 14.2 Existing Applications With Informal Descriptions

**Rule**: Applications with informal descriptions (e.g., README.md with purpose statement) MAY formalize into App Description.

**Process**:
1. Extract relevant content
2. Structure per App Description requirements (Section 5)
3. Place at canonical location
4. Obtain approval
5. Update downstream references

---

## 15. Compliance and Audit

### 15.1 Audit Criteria

Compliance with this policy is verified by:
- App Description exists at canonical location for all applications
- App Description status is `Authoritative`
- FRS explicitly references App Description
- Architecture True North derived from App Description
- Alignment checklist exists and is complete

### 15.2 Non-Compliance Consequences

Failure to comply with this policy constitutes:
- **Governance violation** - Incomplete upstream authority
- **Architecture incompleteness** - Cannot proceed without App Description
- **Build blocking condition** - Build Authorization Gate blocks
- **Audit failure** - Traceability gap

---

## 16. Continuous Improvement

This policy is subject to:
- Learning promotion from downstream failures
- Feedback from FRS and Architecture processes
- Audit findings
- Compliance requirements evolution

Updates to this policy require:
- Documented rationale
- Governance Administrator review
- Johan approval

---

## 17. Success Criteria

This policy is successful when:
- All applications have authoritative App Descriptions
- FRS derivation from App Description is explicit and validated
- Architecture True North aligns with App Description
- Build Authorization Gate validates lineage
- Traceability is complete and auditable
- Governance is machine-checkable

---

## 18. Guiding Principle

> **You cannot specify what you have not first defined.**  
> **Product intent precedes requirements.**

App Descriptions are not bureaucracy. They are **clarity at the root of system definition** and guarantee structural integrity across all downstream artifacts.

Governance must enforce order before complexity.

---

**End of APP DESCRIPTION REQUIREMENT POLICY**

---

**Document Metadata**:
- Policy ID: APP_DESCRIPTION_REQUIREMENT_POLICY_V1.0
- Authority: Canonical Governance Policy
- Required By: Issue - Enforce App Description → FRS Structural Alignment
- Enforcement: Architecture Compilation Contract, Build Authorization Gate, Governance Administrator
- Integration: ARCHITECTURE_COMPILATION_CONTRACT.md, BUILD_AUTHORIZATION_GATE.md, minimum-architecture-template.md, app-description-frs-alignment-checklist.md
