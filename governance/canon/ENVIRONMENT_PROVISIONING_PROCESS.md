# ENVIRONMENT PROVISIONING PROCESS

## Status
Canonical Governance Standard  
Version: v1.0  
Authority: Johan Ras  
Applies To: All Applications, All Builds, Foreman (FM), Builders, Owner (Johan)

---

## 1. Purpose

This document defines the **mandatory process** for environment variable provisioning in the Maturion build model.

Environment variable handling is a **first-class architectural concern**, not an implementation detail. This process ensures:

- Environment variables are explicitly defined before build execution
- FM provides complete, one-time instructions to the Owner (Johan)
- Johan provisions environment variables once (local + platform)
- FM validates readiness before allowing build execution to proceed
- No late-stage environment surprises or iterative back-and-forth

**Foundational Principle**: Environment provisioning is a **human-in-the-loop architectural precondition**, not a builder responsibility.

---

## 2. Roles and Responsibilities

### 2.1 Foreman (FM) Responsibilities

FM is responsible for:

1. **Creating `.env.example` File**
   - FM MUST create `.env.example` during architecture design (before build execution)
   - `.env.example` MUST conform to requirements in `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` Section 3.3
   - `.env.example` is derived directly from architecture requirements

2. **Providing Complete One-Time Instructions to Owner**
   - FM MUST provide Johan with a **single, complete instruction set** for environment provisioning
   - Instructions MUST NOT be drip-fed or iterative
   - Instructions MUST include:
     - The `.env.example` file (or reference to it in the repository)
     - A checklist of actions Johan must perform
     - Explicit platform targets (e.g., "Vercel project: maturion-partpulse")
     - List of values FM needs back as feedback
     - Clear indication of which variables are secrets (never shared back) vs. shareable values

3. **Waiting for Owner Confirmation**
   - FM MUST wait for Johan to confirm environment provisioning is complete
   - FM MUST NOT proceed with build execution until confirmation is received

4. **Validating Completeness (Not Secret Values)**
   - FM validates that all required variables are set (confirmation from Johan)
   - FM validates that shareable values (e.g., deployment URLs, project IDs) are provided
   - FM MUST NOT request or validate actual secret values
   - FM records environment readiness as evidence

5. **Authorizing Build Execution**
   - FM authorizes builders to proceed ONLY after environment validation is complete
   - FM communicates environment context to builders (non-secret information)

---

### 2.2 Owner (Johan) Responsibilities

Johan is responsible for:

1. **Creating Local `.env` File**
   - Johan creates a `.env` file locally based on `.env.example`
   - `.env` contains actual values (including secrets)
   - `.env` is NEVER committed to version control (must be in `.gitignore`)

2. **Provisioning Platform Environment Variables**
   - Johan sets environment variables in deployment platforms (e.g., Vercel dashboard, AWS console)
   - Johan ensures platform variables match architecture requirements
   - Johan configures any platform-specific settings related to environment variables

3. **Providing Required Feedback to FM**
   - Johan confirms that environment provisioning is complete
   - Johan provides non-secret values that FM needs for build logic:
     - Public URLs (e.g., deployment URL, API endpoint)
     - Platform-generated identifiers (e.g., Vercel project ID)
     - Any values explicitly marked as "Owner-provided & shareable" in `.env.example`
   - Johan MUST NOT share secret values unless explicitly marked as shareable

4. **One-Time Action Principle**
   - Johan performs environment provisioning ONCE per build
   - If environment changes are needed later, this is a new architecture change (not iteration)

---

### 2.3 Builder Responsibilities

Builders have **NO direct responsibility** for environment variable definition or provisioning.

Builders:
- Receive environment context from FM (non-secret information)
- Assume all environment variables declared in architecture are available
- MUST NOT invent, assume, or hardcode environment values
- MUST NOT request environment variables directly from Johan
- May validate that environment variables are accessible (e.g., via application startup checks), but this is validation, not provisioning

---

## 3. The Environment Provisioning Workflow

### Phase 1: Architecture Design (FM)

**Trigger**: FM begins architecture design for a new build or upgrade.

**Actions**:
1. FM analyzes requirements and identifies all required environment variables
2. FM documents environment variables in architecture (per `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` Section 3.3)
3. FM creates `.env.example` file with:
   - All required variable names
   - Descriptive comments (purpose, format, constraints)
   - Placeholder values only (no secrets)
   - Source of truth indicators (Owner-provided, Platform-generated, Application-generated)
   - Required vs. optional indicators
4. FM commits `.env.example` to the repository (in the architecture PR or branch)

**Completion Criteria**:
- `.env.example` file exists and conforms to governance requirements
- All required environment variables are documented
- Architecture is complete (per `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`)

**Blocking Rule**: If `.env.example` is not created, architecture is **incomplete** and build MUST NOT proceed.

---

### Phase 2: Owner Instruction (FM → Johan)

**Trigger**: Architecture is complete, including `.env.example`.

**Actions**:
1. FM prepares a **complete, one-time instruction set** for Johan, including:
   - Reference to `.env.example` file (location in repository)
   - Checklist of provisioning actions:
     - [ ] Create local `.env` file based on `.env.example`
     - [ ] Set environment variables in [Platform Name, e.g., Vercel]
     - [ ] Confirm provisioning is complete
     - [ ] Provide the following non-secret values: [list specific values needed]
   - Explicit platform targets (e.g., "Vercel project: maturion-partpulse")
   - Clear indication of which values FM needs back (non-secret only)
   - Expected format for feedback (e.g., "Reply with: VERCEL_URL=https://...")

2. FM presents this instruction set to Johan in a single communication (e.g., PR comment, issue comment, direct message)

**Completion Criteria**:
- Johan receives a complete, unambiguous instruction set
- Johan knows exactly what actions to perform
- Johan knows exactly what feedback to provide

**Anti-Pattern**: FM sends multiple messages asking for environment variables one at a time (drip-feeding). This violates the one-time instruction principle.

---

### Phase 3: Owner Provisioning (Johan)

**Trigger**: Johan receives complete instruction set from FM.

**Actions**:
1. Johan reviews `.env.example` file
2. Johan creates local `.env` file with actual values (including secrets)
3. Johan ensures `.env` is in `.gitignore` (never committed)
4. Johan logs into deployment platform (e.g., Vercel)
5. Johan sets environment variables in platform:
   - Via platform dashboard/UI, OR
   - Via platform CLI (e.g., `vercel env add`), OR
   - Via platform configuration file (e.g., `vercel.json` if supported)
6. Johan verifies all required variables are set
7. Johan prepares feedback for FM:
   - Confirmation that provisioning is complete
   - Non-secret values FM requested (e.g., URLs, project IDs)

**Completion Criteria**:
- Local `.env` file exists with actual values
- Platform environment variables are set
- Johan has prepared feedback for FM

**One-Time Principle**: If Johan discovers missing or unclear requirements during this phase, this indicates incomplete architecture. Johan escalates to FM for architecture update, NOT iterative provisioning.

---

### Phase 4: Owner Feedback (Johan → FM)

**Trigger**: Johan completes environment provisioning.

**Actions**:
1. Johan provides feedback to FM (e.g., PR comment, issue comment, direct message)
2. Feedback includes:
   - Confirmation: "Environment provisioning complete"
   - Non-secret values FM requested:
     ```
     VERCEL_URL=https://maturion-partpulse.vercel.app
     VERCEL_PROJECT_ID=prj_abc123
     API_BASE_URL=https://api.maturion.com
     ```
   - Any issues encountered (if architecture was incomplete)

**Completion Criteria**:
- FM receives confirmation that provisioning is complete
- FM receives all non-secret values needed for build logic

**Secret Handling**: Johan MUST NOT share secret values (e.g., database passwords, API keys) unless `.env.example` explicitly marks them as "shareable" (rare case, e.g., for test environments with non-sensitive data).

---

### Phase 5: FM Validation and Authorization (FM)

**Trigger**: FM receives feedback from Johan.

**Actions**:
1. FM validates completeness:
   - Johan confirmed provisioning is complete
   - All requested non-secret values are provided
   - Values conform to expected format (e.g., URLs are valid URLs)
2. FM records environment readiness as evidence:
   - Evidence includes: `.env.example` file, Johan's confirmation, provided values
   - Evidence is stored in architecture artifacts or build evidence
3. FM authorizes build execution:
   - FM instructs builders to proceed
   - FM provides builders with non-secret environment context
   - Builders assume all environment variables are available

**Completion Criteria**:
- Environment readiness is validated and recorded
- Build execution is authorized

**Validation Scope**: FM validates **completeness** (all required variables are set), NOT **correctness** of secret values. Correctness of secret values is validated at runtime (e.g., application startup, integration tests).

---

### Phase 6: Build Execution (Builders)

**Trigger**: FM authorizes build execution after environment validation.

**Actions**:
1. Builders proceed with build-to-green process
2. Builders assume all environment variables declared in architecture are available
3. Builders may include startup validation logic to verify environment variables are accessible:
   - Application fails fast if required variable is missing
   - Application logs clear error messages for missing variables
4. Builders MUST NOT invent, assume, or request environment variables

**Completion Criteria**:
- Build executes successfully (assumes environment is correct)
- Application startup validates environment variables (if architecture requires this)

**Failure Handling**: If application fails due to missing or incorrect environment variable at runtime:
- This is a **validation failure**, not a provisioning failure
- Builders report failure to FM
- FM investigates: Was variable provisioned? Is value correct? Is application validation logic correct?
- FM may request Johan to verify or update environment variable (architecture change)

---

## 4. Required Feedback from Owner

### 4.1 Mandatory Feedback

Johan MUST provide the following feedback to FM:

1. **Confirmation of Completion**
   - Explicit statement: "Environment provisioning complete"
   - Indicates local `.env` file is created
   - Indicates platform environment variables are set

2. **Non-Secret Values Requested by FM**
   - Values explicitly listed in FM's instruction set
   - Examples:
     - Deployment URL (e.g., `VERCEL_URL=https://...`)
     - Project identifier (e.g., `VERCEL_PROJECT_ID=prj_...`)
     - Public API endpoints (e.g., `API_BASE_URL=https://...`)
   - Format: Key-value pairs matching `.env` format

### 4.2 Optional Feedback

Johan MAY provide:

1. **Issues or Ambiguities Encountered**
   - Example: "Variable `XYZ` in `.env.example` has unclear purpose"
   - This triggers architecture update, not iterative provisioning

2. **Platform-Generated Values**
   - Values automatically generated by platform (e.g., Vercel deployment URL after first deploy)
   - Provided when available and relevant to build logic

### 4.3 Forbidden Feedback

Johan MUST NOT provide:

1. **Secret Values** (unless explicitly marked as shareable in `.env.example`)
   - Database passwords
   - API keys
   - JWT secrets
   - Encryption keys
   - Any sensitive credentials

---

## 5. Validation Before Build Continues

### 5.1 Validation Checklist

Before authorizing build execution, FM MUST validate:

- [ ] `.env.example` file exists and is complete
- [ ] Johan confirmed environment provisioning is complete
- [ ] All non-secret values requested by FM are provided
- [ ] Provided values conform to expected format (e.g., valid URLs)
- [ ] No ambiguities or missing information remain

### 5.2 Validation Scope

FM validates **completeness and format**, NOT **correctness of secret values**.

**Completeness**: All required variables are set (confirmed by Johan).

**Format**: Non-secret values conform to expected format (e.g., URLs start with `https://`, IDs match expected pattern).

**Correctness**: Secret values are correct (validated at runtime by application).

### 5.3 Blocking Conditions

Build execution MUST NOT proceed if:

- `.env.example` is missing or incomplete
- Johan has not confirmed provisioning is complete
- Required non-secret values are missing
- Values are in invalid format
- Ambiguities or unresolved issues remain

**Resolution**: FM addresses blocking conditions (e.g., updates architecture, requests clarification from Johan) before authorizing build.

---

## 6. Environment Readiness Evidence

### 6.1 Required Evidence

For audit and governance compliance, FM MUST record:

1. **`.env.example` File**
   - Stored in repository (committed)
   - Version-controlled (part of architecture artifacts)

2. **Owner Confirmation**
   - Johan's confirmation message (e.g., PR comment, issue comment)
   - Timestamp of confirmation
   - Non-secret values provided by Johan

3. **FM Validation Record**
   - Checklist of validation items completed
   - Timestamp of validation
   - Authorization to proceed with build

### 6.2 Evidence Location

Evidence is stored in:
- Repository (`.env.example` file)
- Architecture documentation (environment variable requirements)
- Build evidence artifacts (e.g., `.qa/builder/` directory, architecture evidence directory)
- PR/Issue comments (Owner confirmation and FM validation)

### 6.3 Audit Trail

An auditor can:
1. Read `.env.example` to understand required environment variables
2. Read architecture documentation to understand environment variable purposes and constraints
3. Read Owner confirmation to verify provisioning was performed
4. Read FM validation record to verify readiness was validated before build

---

## 7. What Constitutes Environment Readiness

**Environment Readiness** means:

1. **Architecture Completeness**
   - All environment variables are documented in architecture
   - `.env.example` file exists and conforms to governance requirements

2. **Owner Provisioning**
   - Johan confirmed local `.env` file is created
   - Johan confirmed platform environment variables are set

3. **FM Validation**
   - FM validated completeness (all required variables are set)
   - FM validated format of non-secret values
   - FM recorded evidence of readiness

4. **Build Authorization**
   - FM authorized builders to proceed
   - Builders have non-secret environment context

**NOT Required for Readiness**:
- Validation of secret values (validated at runtime)
- Successful application startup (validated during build execution)
- Integration with external systems (validated during build execution)

---

## 8. Enforcement and Blocking

### 8.1 Enforcement Points

Environment provisioning process is enforced at:

1. **Architecture Completeness Gate**
   - Architecture MUST include `.env.example` file
   - Architecture MUST document all environment variables
   - Architecture is **incomplete** without these (per `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`)

2. **Build Authorization Gate**
   - FM MUST NOT authorize build execution without environment readiness
   - FM blocks builders until environment validation is complete

3. **Builder Execution Gate**
   - Builders MUST NOT proceed without FM authorization
   - Builders MUST NOT invent or assume environment variables

### 8.2 Blocking Rules

**Build Execution is BLOCKED if**:

- `.env.example` file is missing
- `.env.example` is incomplete or invalid
- Johan has not confirmed provisioning is complete
- Required non-secret values are missing
- FM validation is incomplete

**Resolution**: Address blocking condition before proceeding.

### 8.3 Bypass Prohibition

**Bypassing environment provisioning process is FORBIDDEN**.

Violations include:
- Builders hardcoding environment values
- Builders assuming default values not documented in architecture
- FM proceeding without Owner confirmation
- FM skipping validation to "speed up" build

**Consequence**: Bypass is a governance violation and triggers incident investigation.

---

## 9. Special Cases

### 9.1 Application-Generated Values

Some environment variables are generated by the application (e.g., JWT secret, session key).

**Handling**:
- `.env.example` marks these as "Source: Application-generated"
- Architecture specifies generation method (e.g., "Generate 256-bit random hex string")
- Builder generates these values during build setup
- Builder stores generated values securely (e.g., in `.env` file, platform secrets)
- Builder DOES NOT share generated secrets with FM or Johan (unless architecture requires this)

### 9.2 Platform-Generated Values

Some environment variables are auto-generated by deployment platforms (e.g., `VERCEL_URL`).

**Handling**:
- `.env.example` marks these as "Source: Platform-generated"
- Architecture specifies when value becomes available (e.g., "After first deployment")
- Johan may provide these values as feedback after platform generates them
- If value is not available during provisioning (e.g., deployment URL before first deploy), this is acknowledged in architecture

### 9.3 Environment Variable Changes During Development

If environment variables need to be added or changed after initial provisioning:

**This is an architecture change, not iteration**.

**Process**:
1. FM updates architecture documentation
2. FM updates `.env.example` file
3. FM provides updated instruction set to Johan
4. Johan updates local `.env` and platform variables
5. Johan confirms update is complete
6. FM validates and authorizes build continuation

**This is still a one-time action** (for the updated architecture).

---

## 10. Integration with Other Governance Artifacts

This process integrates with:

- **ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md Section 3.3**: Defines what must be documented about environment variables and requires `.env.example` file
- **GOVERNANCE_PURPOSE_AND_SCOPE.md Section 4**: Defines roles of FM, Johan, and Builders
- **BUILD_PHILOSOPHY.md**: Environment provisioning is a precondition for one-time build correctness
- **QA_POLICY_MASTER.md**: Environment validation is part of architecture QA domain
- **LEARNING_INTAKE_AND_PROMOTION_MODEL.md**: Environment-related failures trigger learning promotion

---

## 11. Success Criteria

This process succeeds when:

✅ **Environment setup is done once, correctly**  
✅ **No late-stage environment surprises occur**  
✅ **FM and Johan have a clean, repeatable handshake**  
✅ **Builders never guess or hardcode environment values**  
✅ **Architecture completeness includes runtime reality**

---

## 12. Failure Modes and Mitigation

### Failure Mode 1: Missing `.env.example`

**Symptom**: Architecture does not include `.env.example` file.  
**Cause**: FM oversight or incomplete architecture.  
**Mitigation**: Architecture completeness validation catches this before build authorization.  
**Prevention**: FM uses architecture checklist (from `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md`).

### Failure Mode 2: Incomplete Instructions

**Symptom**: Johan receives unclear or incomplete instructions.  
**Cause**: FM drip-feeds environment requests or forgets to specify platform targets.  
**Mitigation**: Johan escalates to FM for clarification.  
**Prevention**: FM uses instruction template (defined in this document, Section 3, Phase 2).

### Failure Mode 3: Late-Stage Environment Discovery

**Symptom**: Builder discovers missing environment variable during build.  
**Cause**: Architecture incomplete (missed environment variable).  
**Mitigation**: Treat as architecture failure, not builder failure. FM updates architecture and restarts provisioning process.  
**Prevention**: FM performs thorough functional analysis before architecture (per `GOVERNANCE_PURPOSE_AND_SCOPE.md` Section 5.1).

### Failure Mode 4: Incorrect Secret Value

**Symptom**: Application fails at runtime due to incorrect secret value (e.g., wrong database password).  
**Cause**: Johan provided incorrect value or platform configuration error.  
**Mitigation**: FM requests Johan to verify and correct value. This is a validation failure, not provisioning failure.  
**Prevention**: Clear documentation in `.env.example` (format, source, expected value pattern).

### Failure Mode 5: Builder Hardcodes Environment Values

**Symptom**: Builder writes hardcoded values instead of using environment variables.  
**Cause**: Builder bypasses architecture.  
**Mitigation**: Code review or QA catches hardcoded values. Builder must use environment variables per architecture.  
**Prevention**: Architecture explicitly declares all environment variables as required. Builder QA includes check for hardcoded values.

---

## 13. Compliance and Standards Alignment

### ISO 27001 Alignment

This process satisfies:
- **A.9.4.1** (Information access restriction): Secrets managed through controlled provisioning process
- **A.14.2.6** (Secure development environment): Environment variables are part of secure development practices
- **A.12.1.2** (Change management): Environment changes follow formal process

### NIST CSF Alignment

This process supports:
- **PR.IP-2** (System Development Life Cycle): Environment provisioning is part of SDLC
- **PR.AC-1** (Identity and access management): Secret handling follows access control principles

---

## 14. Changelog

### Version 1.0 (2025-12-22)

**Status**: Initial Release  
**Authority**: Johan Ras  
**Trigger**: Issue - Govern Environment Variable Handling & .env.example Creation in Architecture Design

**Summary**: Created canonical environment provisioning process defining FM-to-Johan handshake, responsibilities, and validation workflow.

**Key Requirements Established**:
- `.env.example` as mandatory architectural artifact (created by FM before build)
- FM instruction obligation (complete, one-time instruction set)
- Owner provisioning responsibilities (one-time local + platform setup)
- Required feedback from Owner to FM (non-secret values only)
- Validation requirements before build continues
- Environment readiness definition and evidence requirements

**Effect**: Environment variable handling is now a first-class architectural concern with explicit process and accountability.

---

**End of ENVIRONMENT_PROVISIONING_PROCESS**

---

**Document Metadata**:
- Document ID: ENVIRONMENT_PROVISIONING_PROCESS_V1.0
- Authority: Canonical Governance Standard
- Required By: ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md Section 3.3
- Integrates With: GOVERNANCE_PURPOSE_AND_SCOPE.md, BUILD_PHILOSOPHY.md, QA_POLICY_MASTER.md
- Enforcement: Governance Gate + Foreman + Governance Administrator
