# APP-SPECIFIC STARTUP REQUIREMENTS DECLARATION CONTRACT

## Status
Canonical Governance Standard  
Version: v1.0  
Authority: Johan Ras  
Applies To: All Maturion Applications, Foreman (FM), Builders, Governance Administrator

---

## 1. Purpose

This document defines the **mandatory contract** for how each application declares its unique commissioning and startup requirements in a structured, auditable, and machine-interpretable way.

Application startup requirements are **governance-critical declarations** that enable:

- **Explicit validation requirements** tailored to each application's unique characteristics
- **Human authorization checkpoints** appropriate to application risk profile
- **Automated interpretation** by FM app for commissioning orchestration
- **Audit trail completeness** demonstrating compliance with application-specific needs
- **Consistency** across applications while respecting application-specific complexity

**Foundational Principle**: Each application is unique, but the way it declares its uniqueness must be standardized.

---

## 2. Constitutional Authority

This contract derives authority from:

- **CONSTITUTION.md** - Governance supremacy and constitutional requirements
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory
- **SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md** - Commissioning phases and validation requirements
- **ACTIVATION_STATE_MODEL.md** - Activation state progression and authorization
- **ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md** - Architecture must document deployment, runtime, and operational requirements
- **FM_GOVERNANCE_LOADING_PROTOCOL.md** - How FM app loads and interprets governance

**Relationship to SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md**:

The commissioning protocol defines **universal phases** and **process** (INSTALLED → VALIDATED → COMMISSIONED → ACTIVATED).

This document defines **how each application declares its specific requirements** within those universal phases.

---

## 3. Scope

### 3.1 In Scope

- Declaration schema and structure for app-specific startup requirements
- Required checks per application (technical, security, operational, compliance)
- Required human confirmations and authorization checkpoints
- Optional vs mandatory step distinction
- How FM app must interpret these declarations
- Validation requirements for startup requirement declarations
- Integration with commissioning protocol phases
- Audit trail requirements for startup validation

### 3.2 Out of Scope (Absolute)

- ❌ Universal commissioning phases (defined in SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md)
- ❌ Generic validation categories (technical/security/operational/compliance framework)
- ❌ Human authority model (defined in GOVERNANCE_PURPOSE_AND_SCOPE.md)
- ❌ FM app implementation details (this is governance, not execution)
- ❌ Runtime activation mechanics (defined in ACTIVATION_STATE_MODEL.md)

---

## 4. Core Definitions

### 4.1 Startup Requirement Declaration

A **startup requirement declaration** is a formal, structured, auditable document that specifies:

- What validation checks this specific application requires before activation
- What human confirmations are mandatory for this application
- Which steps are optional vs mandatory
- What evidence must be collected during commissioning
- What constitutes success or failure for this application's startup

**Critical Distinction**: Startup requirements are **application-specific**, not universal. Different applications have different risk profiles, dependencies, and operational characteristics.

### 4.2 Declaration Location

Every application MUST declare its startup requirements in:

**Primary Location**: `APP_STARTUP_REQUIREMENTS.md` in the application's repository root or `.architecture/` directory

**Backup Location**: If application has no dedicated repository, declaration MAY be in governance repository under `governance/applications/[app-name]/STARTUP_REQUIREMENTS.md`

**Discovery**: FM app MUST discover startup requirement declarations via:
1. Repository filesystem scan (check root and `.architecture/`)
2. Governance repository applications registry (if centralized)
3. Application manifest reference (if application provides manifest)

### 4.3 Declaration Lifecycle

Startup requirement declarations follow application lifecycle:

- **Created**: During architecture phase (before first build)
- **Updated**: When application requirements change (architecture evolution)
- **Validated**: During commissioning (declaration completeness verified)
- **Interpreted**: By FM app during commissioning orchestration
- **Archived**: When application retired (historical record)

**Versioning**: Declarations are versioned with application code (git commit SHA). No separate version numbering required.

---

## 5. Required Declaration Schema

All startup requirement declarations MUST conform to this schema:

### 5.1 Document Structure (MANDATORY)

```markdown
# Application Startup Requirements Declaration

## Application Information
- **Application Name**: [human-readable name]
- **Application ID**: [unique-identifier]
- **Application Type**: [web-app|service|cli-tool|library|integration]
- **Deployment Target**: [platform, e.g., "Vercel", "AWS Lambda", "Node.js standalone"]
- **Risk Profile**: [low|medium|high|critical]
- **Declaration Version**: [git commit SHA]
- **Last Updated**: [ISO 8601 date]

## Purpose
[Brief description of application's purpose and operational scope]

## Commissioning Phase Requirements

### Phase 1: INSTALLED
[Validation requirements specific to installation phase]

### Phase 2: VALIDATED
[Validation requirements specific to validation phase]

### Phase 3: COMMISSIONED
[Validation requirements specific to commissioning phase]

### Phase 4: ACTIVATED
[Activation requirements and initial execution validation]

## Human Authorization Checkpoints

### Checkpoint 1: Installation → Validation
[Application-specific authorization requirements]

### Checkpoint 2: Validation → Commissioning
[Application-specific authorization requirements]

### Checkpoint 3: Commissioning → Activation
[Application-specific authorization requirements]

## Evidence Requirements
[Application-specific evidence artifacts and formats]

## Success Criteria
[Application-specific success definitions]

## Failure Handling
[Application-specific failure scenarios and responses]
```

### 5.2 Application Information Section (MANDATORY)

**Required Fields**:

- **Application Name**: Human-readable name (e.g., "Foreman App", "PartPulse Production", "Builder Service")
- **Application ID**: Unique identifier (e.g., `fm-app-v1`, `partpulse-prod`, `builder-svc`)
- **Application Type**: Classification determining commissioning approach
  - `web-app`: Browser-accessed web application
  - `service`: Backend service or API
  - `cli-tool`: Command-line tool or script
  - `library`: Reusable code library
  - `integration`: Integration connector or adapter
- **Deployment Target**: Exact platform and environment (e.g., "Vercel Production", "AWS Lambda us-east-1", "Docker on Azure")
- **Risk Profile**: Risk classification determining authorization rigor
  - `low`: Limited impact if failed (e.g., internal tools, read-only dashboards)
  - `medium`: Moderate impact (e.g., reporting services, non-critical features)
  - `high`: Significant impact (e.g., production applications, customer-facing services)
  - `critical`: Severe impact (e.g., authentication services, financial systems, governance systems)
- **Declaration Version**: Git commit SHA of this declaration
- **Last Updated**: ISO 8601 timestamp of last declaration update

**Validation**: FM app MUST validate all required fields are present and valid.

---

### 5.3 Commissioning Phase Requirements (MANDATORY)

For each commissioning phase (INSTALLED, VALIDATED, COMMISSIONED, ACTIVATED), declaration MUST specify:

#### 5.3.1 Technical Validation Checks

**Structure**:

```markdown
#### Technical Validation
- [ ] **[Check Name]** (MANDATORY|OPTIONAL)
  - **Purpose**: [why this check is needed]
  - **Validation Method**: [how to validate]
  - **Success Criteria**: [what constitutes pass]
  - **Failure Impact**: [what happens if fails]
  - **Evidence**: [what evidence is required]
```

**Example**:

```markdown
#### Technical Validation
- [ ] **Application Starts Successfully** (MANDATORY)
  - **Purpose**: Verify application can initialize without errors
  - **Validation Method**: Execute startup command and check exit code
  - **Success Criteria**: Process starts, listens on expected port, responds to health check
  - **Failure Impact**: BLOCKING - Cannot proceed to next phase
  - **Evidence**: Startup logs, health check response, process status
  
- [ ] **Database Connection** (MANDATORY)
  - **Purpose**: Verify application can connect to required database
  - **Validation Method**: Execute database connection test
  - **Success Criteria**: Connection established, schema version verified
  - **Failure Impact**: BLOCKING - Cannot proceed to next phase
  - **Evidence**: Connection test logs, schema validation output
  
- [ ] **API Endpoint Response** (OPTIONAL)
  - **Purpose**: Verify optional external API integration
  - **Validation Method**: Call external API health endpoint
  - **Success Criteria**: API responds with 200 OK
  - **Failure Impact**: WARNING - Log warning, continue with degraded functionality
  - **Evidence**: API response logs
```

**Mandatory vs Optional**:
- **MANDATORY**: Check MUST pass for phase to succeed. Failure blocks progression.
- **OPTIONAL**: Check failure logged as warning, phase may proceed with acknowledgment.

**FM Interpretation**:
- FM app MUST execute all MANDATORY checks before phase transition
- FM app MUST execute all OPTIONAL checks and log results
- FM app MUST collect all required evidence
- FM app MUST halt phase progression if any MANDATORY check fails

---

#### 5.3.2 Security Validation Checks

**Structure**:

```markdown
#### Security Validation
- [ ] **[Check Name]** (MANDATORY|OPTIONAL)
  - **Purpose**: [security concern addressed]
  - **Validation Method**: [how to validate security]
  - **Success Criteria**: [what constitutes secure]
  - **Failure Impact**: [security risk if fails]
  - **Evidence**: [security validation artifacts]
```

**Example**:

```markdown
#### Security Validation
- [ ] **Environment Secrets Validation** (MANDATORY)
  - **Purpose**: Verify no secrets hardcoded in code or configuration
  - **Validation Method**: Scan code and config files for secret patterns
  - **Success Criteria**: No secrets found, all secrets sourced from secure environment
  - **Failure Impact**: BLOCKING - Security risk, cannot proceed
  - **Evidence**: Secret scan report, environment variable configuration

- [ ] **Authentication Mechanism Test** (MANDATORY)
  - **Purpose**: Verify authentication works correctly
  - **Validation Method**: Attempt authentication with valid and invalid credentials
  - **Success Criteria**: Valid auth succeeds, invalid auth fails, no bypass possible
  - **Failure Impact**: BLOCKING - Security violation, cannot proceed
  - **Evidence**: Authentication test results, security test logs
```

---

#### 5.3.3 Operational Validation Checks

**Structure**:

```markdown
#### Operational Validation
- [ ] **[Check Name]** (MANDATORY|OPTIONAL)
  - **Purpose**: [operational capability verified]
  - **Validation Method**: [how to validate operation]
  - **Success Criteria**: [what constitutes operational]
  - **Failure Impact**: [operational risk if fails]
  - **Evidence**: [operational validation artifacts]
```

**Example**:

```markdown
#### Operational Validation
- [ ] **Health Check Endpoint** (MANDATORY)
  - **Purpose**: Verify monitoring can detect application health
  - **Validation Method**: Call /health endpoint
  - **Success Criteria**: Endpoint returns 200 with health status JSON
  - **Failure Impact**: BLOCKING - Cannot monitor application, cannot proceed
  - **Evidence**: Health check response, endpoint test logs

- [ ] **Graceful Shutdown** (MANDATORY)
  - **Purpose**: Verify application can stop safely without data loss
  - **Validation Method**: Send SIGTERM, verify graceful shutdown
  - **Success Criteria**: Application stops cleanly, in-flight operations complete
  - **Failure Impact**: BLOCKING - Risk of data corruption, cannot proceed
  - **Evidence**: Shutdown logs, data integrity verification
```

---

#### 5.3.4 Compliance Validation Checks

**Structure**:

```markdown
#### Compliance Validation
- [ ] **[Check Name]** (MANDATORY|OPTIONAL)
  - **Purpose**: [compliance requirement addressed]
  - **Validation Method**: [how to validate compliance]
  - **Success Criteria**: [what constitutes compliant]
  - **Failure Impact**: [compliance risk if fails]
  - **Evidence**: [compliance validation artifacts]
```

**Example**:

```markdown
#### Compliance Validation
- [ ] **Audit Logging Enabled** (MANDATORY)
  - **Purpose**: Verify all required events are logged for audit trail
  - **Validation Method**: Trigger audit events, verify logs created
  - **Success Criteria**: All required events logged with complete context
  - **Failure Impact**: BLOCKING - Audit trail incomplete, cannot proceed
  - **Evidence**: Audit log samples, log configuration verification

- [ ] **Data Retention Policy Configured** (MANDATORY)
  - **Purpose**: Verify data retention rules are enforced
  - **Validation Method**: Check data retention configuration
  - **Success Criteria**: Retention policy configured per governance requirements
  - **Failure Impact**: BLOCKING - Compliance violation, cannot proceed
  - **Evidence**: Retention policy configuration, enforcement verification
```

---

### 5.4 Human Authorization Checkpoints (MANDATORY)

For each authorization checkpoint, declaration MUST specify:

**Structure**:

```markdown
### Checkpoint [N]: [Source Phase] → [Target Phase]

**Authorization Required**: [YES|NO|CONDITIONAL]

**Authorizing Authority**: [Johan|FM|Delegated]

**Required Review Items**:
- [ ] [Item 1 to review before authorization]
- [ ] [Item 2 to review before authorization]
- [ ] [Item N to review before authorization]

**Authorization Evidence**:
- [How authorization is recorded]

**Bypass Conditions**: [NONE|specific emergency conditions]

**Application-Specific Considerations**:
- [Any special considerations for this application's authorization]
```

**Example**:

```markdown
### Checkpoint 2: Validation → Commissioning

**Authorization Required**: YES

**Authorizing Authority**: Johan (human owner)

**Required Review Items**:
- [ ] All MANDATORY technical validation checks passed
- [ ] All MANDATORY security validation checks passed
- [ ] No critical vulnerabilities detected
- [ ] Performance benchmarks within acceptable range
- [ ] Error handling validated with failure injection tests

**Authorization Evidence**:
- GitHub PR approval comment by Johan
- OR GitHub issue approval comment by Johan
- OR Explicit authorization record in application audit trail

**Bypass Conditions**: NONE (this is critical checkpoint for high-risk application)

**Application-Specific Considerations**:
- This application has direct database write access
- This application serves production users
- Extra scrutiny required for security validation results
```

---

### 5.5 Evidence Requirements (MANDATORY)

Declaration MUST specify what evidence artifacts are required:

**Structure**:

```markdown
## Evidence Requirements

### Evidence Artifacts
- **[Artifact Name]**
  - **Type**: [log|report|screenshot|file|configuration]
  - **Location**: [where artifact must be stored]
  - **Format**: [expected format]
  - **Retention**: [how long to retain]
  - **Purpose**: [why this evidence is needed]
```

**Example**:

```markdown
## Evidence Requirements

### Evidence Artifacts

- **Startup Validation Log**
  - **Type**: Log file
  - **Location**: `.architecture/commissioning/startup-validation.log`
  - **Format**: Plain text with timestamps
  - **Retention**: Application lifetime
  - **Purpose**: Demonstrates successful startup validation

- **Security Scan Report**
  - **Type**: Report
  - **Location**: `.architecture/commissioning/security-scan-report.json`
  - **Format**: JSON (CodeQL or equivalent format)
  - **Retention**: Application lifetime
  - **Purpose**: Demonstrates no critical vulnerabilities

- **Human Authorization Record**
  - **Type**: File
  - **Location**: `.architecture/commissioning/authorization-record.md`
  - **Format**: Markdown with timestamps and approver identity
  - **Retention**: Application lifetime
  - **Purpose**: Audit trail of human authorization decisions
```

**FM Interpretation**:
- FM app MUST collect and store all required evidence artifacts
- FM app MUST verify evidence artifacts are complete before phase transition
- FM app MUST make evidence artifacts accessible for audit

---

### 5.6 Success Criteria (MANDATORY)

Declaration MUST define application-specific success:

**Structure**:

```markdown
## Success Criteria

### Phase Success Definitions

#### INSTALLED Phase Success
- [Specific criteria for successful installation]

#### VALIDATED Phase Success
- [Specific criteria for successful validation]

#### COMMISSIONED Phase Success
- [Specific criteria for successful commissioning]

#### ACTIVATED Phase Success
- [Specific criteria for successful activation]

### Overall Startup Success
- [What constitutes fully successful application startup]
```

**Example**:

```markdown
## Success Criteria

### Phase Success Definitions

#### INSTALLED Phase Success
- Application code deployed to production environment
- All dependencies installed
- Configuration files present and valid
- Environment variables set

#### VALIDATED Phase Success
- All MANDATORY technical checks pass
- All MANDATORY security checks pass
- All MANDATORY operational checks pass
- All MANDATORY compliance checks pass
- No BLOCKING failures

#### COMMISSIONED Phase Success
- All validation evidence collected and reviewed
- Human authorization received from Johan
- Pre-activation checklist complete
- No blocking operational concerns

#### ACTIVATED Phase Success
- Application started successfully
- Health check responds within 5 seconds
- Initial requests processed successfully
- No errors in startup logs
- Activation recorded in audit trail

### Overall Startup Success
Application is SUCCESSFULLY STARTED when:
- All commissioning phases completed
- All MANDATORY checks passed
- Human authorization obtained at all checkpoints
- Application actively processing requests
- Monitoring confirms healthy operation
- No security or operational violations detected
```

---

### 5.7 Failure Handling (MANDATORY)

Declaration MUST specify failure scenarios and responses:

**Structure**:

```markdown
## Failure Handling

### Failure Categories

#### [Failure Category Name]
- **Symptoms**: [how to recognize this failure]
- **Impact**: [consequence of this failure]
- **Response**: [what FM app should do]
- **Escalation**: [when to escalate to human]
- **Recovery**: [how to recover]
```

**Example**:

```markdown
## Failure Handling

### Failure Categories

#### Installation Failure
- **Symptoms**: Deployment fails, dependencies missing, configuration invalid
- **Impact**: Cannot proceed to validation phase
- **Response**: HALT commissioning, collect error logs, rollback deployment
- **Escalation**: Immediate - escalate to builder agent for remediation
- **Recovery**: Fix deployment issues, re-deploy, restart commissioning from INSTALLED phase

#### Security Validation Failure
- **Symptoms**: Secrets detected in code, authentication bypass possible, vulnerabilities found
- **Impact**: BLOCKING - Security risk prevents activation
- **Response**: HALT commissioning immediately, create security incident, notify Johan
- **Escalation**: Immediate - escalate to security review and Johan approval
- **Recovery**: Remediate security issues, re-validate, human authorization required

#### Activation Failure
- **Symptoms**: Application fails to start, health check fails, immediate errors
- **Impact**: Application not operational
- **Response**: ROLLBACK to COMMISSIONED state, collect diagnostic logs
- **Escalation**: Escalate to builder agent and Johan for investigation
- **Recovery**: Diagnose issue, fix, re-commission, re-activate with authorization
```

---

## 6. FM App Interpretation Requirements

### 6.1 Declaration Loading (MANDATORY)

FM app MUST:

1. **Discover** startup requirement declaration in application repository
2. **Load** declaration content
3. **Validate** declaration schema completeness
4. **Parse** declaration structure
5. **Cache** declaration for commissioning execution

**Validation Failures**: If declaration missing, incomplete, or invalid:
- HALT commissioning
- Report declaration issues to builder agent
- Escalate to governance administrator if declaration schema violation

### 6.2 Check Execution (MANDATORY)

For each declared check, FM app MUST:

1. **Interpret** check specification (purpose, method, criteria)
2. **Execute** validation method as specified
3. **Evaluate** result against success criteria
4. **Classify** result as PASS, FAIL, or WARNING
5. **Collect** required evidence
6. **Record** result in commissioning audit trail

**MANDATORY Check Failure**: HALT phase progression, escalate per declaration

**OPTIONAL Check Failure**: Log warning, continue with acknowledgment

### 6.3 Authorization Checkpoint Orchestration (MANDATORY)

At each authorization checkpoint, FM app MUST:

1. **Present** checkpoint context to authorizing entity
2. **Provide** review items for consideration
3. **Request** explicit authorization
4. **Wait** for authorization (no timeout, human decision required)
5. **Record** authorization in audit trail
6. **Proceed** only after authorization received

**No Authorization**: If authorization not received, commissioning PAUSES. FM app MUST NOT bypass checkpoint.

### 6.4 Evidence Collection (MANDATORY)

FM app MUST:

1. **Identify** all required evidence artifacts from declaration
2. **Collect** artifacts during commissioning
3. **Store** artifacts in specified locations
4. **Validate** artifact completeness
5. **Make available** for audit and review

**Missing Evidence**: If required evidence not collected, treat as commissioning failure.

### 6.5 Success Evaluation (MANDATORY)

FM app MUST:

1. **Evaluate** each phase against declared success criteria
2. **Confirm** all MANDATORY requirements satisfied
3. **Verify** authorization checkpoints completed
4. **Validate** evidence collection complete
5. **Declare** phase success or failure explicitly

**Partial Success Prohibition**: FM app MUST NOT declare phase successful if any MANDATORY requirement not satisfied.

### 6.6 Failure Handling (MANDATORY)

When failure occurs, FM app MUST:

1. **Classify** failure per declaration failure categories
2. **Execute** declared response actions
3. **Collect** diagnostic evidence
4. **Escalate** per declaration escalation rules
5. **Document** failure in audit trail
6. **Support** recovery per declaration recovery procedures

**No Silent Failures**: All failures MUST be visible, logged, and escalated appropriately.

---

## 7. Optional vs Mandatory Distinction

### 7.1 MANDATORY Checks

**Definition**: Checks that MUST pass for phase to succeed.

**Characteristics**:
- Failure BLOCKS phase progression
- Failure requires remediation before retry
- Human authorization cannot bypass (unless emergency)
- Evidence MUST be collected
- Audit trail MUST record pass/fail

**Use Cases**:
- Security-critical validations
- Functional correctness requirements
- Compliance-mandated checks
- Operational safety requirements

**FM Interpretation**: FM app MUST NOT allow phase progression if MANDATORY check fails.

---

### 7.2 OPTIONAL Checks

**Definition**: Checks that provide additional validation but do not block progression.

**Characteristics**:
- Failure logged as WARNING
- Phase may proceed with acknowledgment
- Human may review and decide
- Evidence SHOULD be collected
- Audit trail records warning

**Use Cases**:
- Performance optimizations (not blocking)
- Optional feature validations
- Non-critical integrations
- Informational checks

**FM Interpretation**: FM app MUST execute OPTIONAL checks, log results, and present warnings to human for review.

---

### 7.3 Decision Framework

When designing startup requirements, application architects MUST classify each check:

**Classify as MANDATORY if**:
- Failure creates security risk
- Failure violates governance requirements
- Failure prevents core functionality
- Failure causes data integrity issues
- Failure impacts production users

**Classify as OPTIONAL if**:
- Failure degrades non-critical feature
- Failure impacts performance but not correctness
- Failure is informational warning
- Failure can be addressed post-activation

**No Ambiguity**: Every check MUST be explicitly classified. Unclear classification is declaration incompleteness.

---

## 8. Validation Requirements

### 8.1 Declaration Validation (Before Use)

Before FM app uses startup requirement declaration, it MUST validate:

**Schema Completeness**:
- [ ] All MANDATORY sections present
- [ ] All required fields populated
- [ ] Application information complete
- [ ] At least one check defined per phase
- [ ] At least one authorization checkpoint defined

**Check Specification Completeness**:
- [ ] Every check has purpose
- [ ] Every check has validation method
- [ ] Every check has success criteria
- [ ] Every check has failure impact
- [ ] Every check has evidence requirement
- [ ] Every check classified as MANDATORY or OPTIONAL

**Authorization Checkpoint Completeness**:
- [ ] Every checkpoint specifies authority
- [ ] Every checkpoint lists review items
- [ ] Every checkpoint defines evidence
- [ ] Every checkpoint addresses bypass conditions

**Evidence Completeness**:
- [ ] All referenced evidence artifacts defined
- [ ] Evidence types specified
- [ ] Evidence locations specified
- [ ] Evidence formats specified

**Success Criteria Completeness**:
- [ ] Success defined for each phase
- [ ] Overall success criteria defined
- [ ] Criteria measurable and verifiable

**Failure Handling Completeness**:
- [ ] Failure categories defined
- [ ] Responses specified for each category
- [ ] Escalation paths defined
- [ ] Recovery procedures defined

### 8.2 Validation Failure Handling

If declaration validation fails:

1. **HALT** commissioning immediately
2. **Report** validation failures to builder agent
3. **Escalate** to governance administrator if schema violation
4. **Require** declaration fix before commissioning retry
5. **Record** validation failure in audit trail

**No Commissioning Without Valid Declaration**: FM app MUST NOT attempt commissioning without valid startup requirement declaration.

---

## 9. Integration with Commissioning Protocol

### 9.1 Relationship to Universal Phases

**SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md** defines universal phases:
1. INSTALLED
2. VALIDATED
3. COMMISSIONED
4. ACTIVATED

**APP_STARTUP_REQUIREMENTS_DECLARATION.md** (this document) defines:
- Application-specific checks within each universal phase
- Application-specific authorization requirements
- Application-specific evidence artifacts
- Application-specific success criteria

**Integration Model**:

```
Universal Phase (Protocol)
    ↓
Application-Specific Checks (Declaration)
    ↓
FM App Execution (Implementation)
    ↓
Evidence Collection (Audit Trail)
```

### 9.2 Phase Mapping

**INSTALLED Phase**:
- **Universal Requirements**: Deployment complete, infrastructure provisioned
- **Application-Specific**: Declared installation checks (e.g., config files present, dependencies installed)
- **FM Execution**: Execute declared checks, collect evidence

**VALIDATED Phase**:
- **Universal Requirements**: Technical, security, operational, compliance validation
- **Application-Specific**: Declared validation checks for each category
- **FM Execution**: Execute all declared checks, determine MANDATORY vs OPTIONAL, collect evidence

**COMMISSIONED Phase**:
- **Universal Requirements**: Ready for activation, human authorization pending
- **Application-Specific**: Declared pre-activation checks, authorization checkpoint requirements
- **FM Execution**: Present authorization context, wait for human decision

**ACTIVATED Phase**:
- **Universal Requirements**: Application running, processing workloads
- **Application-Specific**: Declared initial execution checks (e.g., health check response time)
- **FM Execution**: Verify application meets declared activation criteria

---

### 9.3 Audit Trail Integration

Commissioning audit trail (per SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md) MUST include:

- **Declaration Reference**: Which startup requirement declaration version used
- **Check Results**: Pass/fail for each declared check
- **Evidence Links**: References to collected evidence artifacts
- **Authorization Records**: Human authorization confirmations
- **Failure Records**: Any declared failure scenarios encountered

**Audit Trail Structure**:

```markdown
## Commissioning Audit Trail

### Application
- Name: [app name]
- Declaration Version: [commit SHA]
- Declaration Location: [file path]

### VALIDATED Phase
- Start: [timestamp]
- Completion: [timestamp]

#### Technical Validation
- [Check Name]: PASS - [evidence link]
- [Check Name]: PASS - [evidence link]
- [Check Name]: FAIL - [evidence link] - [remediation required]

#### Security Validation
- [Check Name]: PASS - [evidence link]

[... continue for all phases and checks ...]
```

---

## 10. Risk Profile and Authorization Rigor

### 10.1 Risk Profile Classification

Application risk profile determines authorization checkpoint rigor:

**LOW Risk**:
- Limited user impact if failed
- Read-only or non-critical operations
- Internal tools or development utilities
- **Authorization**: FM may authorize on Johan's behalf if pre-authorized
- **Validation**: Standard checks, OPTIONAL checks may be minimal

**MEDIUM Risk**:
- Moderate user impact if failed
- Non-critical features or reporting services
- Limited write operations
- **Authorization**: FM must request Johan approval, but may batch requests
- **Validation**: Standard checks with additional operational focus

**HIGH Risk**:
- Significant user impact if failed
- Production-facing applications
- Customer-impacting services
- **Authorization**: Johan explicit approval required at each checkpoint
- **Validation**: Rigorous checks, extensive security validation

**CRITICAL Risk**:
- Severe impact if failed (financial, legal, security)
- Authentication/authorization services
- Financial transaction systems
- Governance systems
- **Authorization**: Johan explicit approval required at each checkpoint, may require dual authorization
- **Validation**: Exhaustive checks, security audit, compliance review

**Declaration Requirement**: Every application MUST declare its risk profile in startup requirements declaration.

---

### 10.2 Authorization Authority by Risk Profile

| Risk Profile | Installation→Validation | Validation→Commissioning | Commissioning→Activation |
|--------------|-------------------------|--------------------------|--------------------------|
| LOW          | FM (delegated)          | FM (delegated)           | Johan OR FM (delegated)  |
| MEDIUM       | FM (delegated)          | Johan (explicit)         | Johan (explicit)         |
| HIGH         | Johan (explicit)        | Johan (explicit)         | Johan (explicit)         |
| CRITICAL     | Johan (explicit)        | Johan + Review (explicit) | Johan + Review (explicit) |

**FM Interpretation**: FM app MUST respect risk-based authorization requirements. Attempting to bypass authorization for HIGH or CRITICAL applications is governance violation.

---

## 11. Declaration Examples

### 11.1 Simple Web Application (Low Risk)

```markdown
# Application Startup Requirements Declaration

## Application Information
- **Application Name**: Internal Dashboard
- **Application ID**: internal-dashboard-v1
- **Application Type**: web-app
- **Deployment Target**: Vercel Production
- **Risk Profile**: low
- **Declaration Version**: abc123def456
- **Last Updated**: 2025-12-24T12:00:00Z

## Purpose
Internal read-only dashboard for team metrics visualization.

## Commissioning Phase Requirements

### Phase 2: VALIDATED

#### Technical Validation
- [ ] **Application Starts Successfully** (MANDATORY)
  - **Purpose**: Verify Next.js application initializes
  - **Validation Method**: npm run build && npm start
  - **Success Criteria**: Process starts, serves homepage
  - **Failure Impact**: BLOCKING
  - **Evidence**: Startup logs

#### Security Validation
- [ ] **No Hardcoded Secrets** (MANDATORY)
  - **Purpose**: Verify secure configuration
  - **Validation Method**: grep for secret patterns
  - **Success Criteria**: No secrets found
  - **Failure Impact**: BLOCKING
  - **Evidence**: Secret scan report

## Human Authorization Checkpoints

### Checkpoint 2: Validation → Commissioning
**Authorization Required**: YES
**Authorizing Authority**: FM (delegated by Johan for low-risk apps)
**Required Review Items**:
- [ ] Technical and security checks passed
**Authorization Evidence**: FM authorization log

[... continue with remaining sections ...]
```

---

### 11.2 Production Service (High Risk)

```markdown
# Application Startup Requirements Declaration

## Application Information
- **Application Name**: Customer API Gateway
- **Application ID**: api-gateway-prod
- **Application Type**: service
- **Deployment Target**: AWS Lambda us-east-1
- **Risk Profile**: high
- **Declaration Version**: xyz789abc012
- **Last Updated**: 2025-12-24T14:00:00Z

## Purpose
Production API gateway serving customer requests with authentication and rate limiting.

## Commissioning Phase Requirements

### Phase 2: VALIDATED

#### Technical Validation
- [ ] **API Endpoint Health** (MANDATORY)
  - **Purpose**: Verify all endpoints respond
  - **Validation Method**: Execute endpoint test suite
  - **Success Criteria**: All endpoints return expected responses
  - **Failure Impact**: BLOCKING
  - **Evidence**: API test results

- [ ] **Performance Benchmarks** (MANDATORY)
  - **Purpose**: Verify acceptable latency
  - **Validation Method**: Load test with 1000 req/sec
  - **Success Criteria**: p95 latency < 100ms
  - **Failure Impact**: BLOCKING
  - **Evidence**: Load test report

#### Security Validation
- [ ] **Authentication Enforcement** (MANDATORY)
  - **Purpose**: Verify no endpoints bypassable
  - **Validation Method**: Attempt unauthenticated access
  - **Success Criteria**: All protected endpoints reject unauthenticated requests
  - **Failure Impact**: BLOCKING - Security violation
  - **Evidence**: Security test report

- [ ] **Rate Limiting Active** (MANDATORY)
  - **Purpose**: Prevent abuse
  - **Validation Method**: Exceed rate limit, verify rejection
  - **Success Criteria**: Rate limits enforced, requests rejected appropriately
  - **Failure Impact**: BLOCKING
  - **Evidence**: Rate limit test logs

## Human Authorization Checkpoints

### Checkpoint 3: Commissioning → Activation
**Authorization Required**: YES
**Authorizing Authority**: Johan (explicit human approval)
**Required Review Items**:
- [ ] All MANDATORY checks passed
- [ ] No critical or high vulnerabilities
- [ ] Performance benchmarks met
- [ ] Security validation thorough
- [ ] Rollback plan prepared
**Authorization Evidence**: Johan GitHub approval comment with timestamp
**Bypass Conditions**: NONE

[... continue with remaining sections ...]
```

---

## 12. Enforcement and Compliance

### 12.1 Builder Responsibility

Builders MUST:
- Create startup requirement declaration during architecture phase
- Include declaration in application repository
- Update declaration when requirements change
- Ensure declaration completeness per Section 5 schema
- Validate declaration before PR submission

**Gate Enforcement**: PR gates MUST verify startup requirement declaration exists and is valid.

---

### 12.2 FM App Responsibility

FM app MUST:
- Load and validate startup requirement declarations
- Execute declared checks during commissioning
- Respect MANDATORY vs OPTIONAL distinctions
- Collect all required evidence
- Enforce authorization checkpoints
- Record audit trail per declarations
- Handle failures per declared procedures

**Validation**: Governance administrator audits FM app compliance with declaration interpretation requirements.

---

### 12.3 Governance Administrator Responsibility

Governance Administrator MUST:
- Maintain this canonical contract
- Validate startup requirement declarations for schema compliance
- Audit FM app interpretation of declarations
- Review declaration evolution for governance drift
- Update contract when learning promotion required

**No Weakening**: Governance administrator MUST NOT weaken declaration requirements to expedite commissioning.

---

## 13. Audit Trail Requirements

Per AUDIT_READINESS_MODEL.md, commissioning audit trail MUST include:

**Declaration Traceability**:
- Which declaration version used for commissioning
- Declaration validation result
- Declaration completeness confirmation

**Check Execution Records**:
- All declared checks executed
- Pass/fail result for each check
- MANDATORY vs OPTIONAL classification respected
- Evidence collected for each check

**Authorization Records**:
- All authorization checkpoints presented to authority
- Authorization granted/denied with timestamp
- Authorizing entity identity
- Review items presented

**Failure Records**:
- All failures encountered
- Failure classification per declaration
- Response actions taken
- Escalation paths followed
- Recovery procedures initiated

**Retention**: Audit trail retained for application lifetime per governance requirements.

---

## 14. Relationship to Other Governance Artifacts

This contract integrates with:

- **SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md**: Defines universal commissioning phases; this contract defines application-specific requirements within those phases
- **ACTIVATION_STATE_MODEL.md**: Defines activation states; declarations specify checks for state transitions
- **ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md**: Architecture must be complete; startup requirements declaration is mandatory architecture component
- **FM_GOVERNANCE_LOADING_PROTOCOL.md**: FM app must load governance; this contract defines how FM interprets application-specific declarations
- **GOVERNANCE_PURPOSE_AND_SCOPE.md**: Defines human authority; declarations specify authorization checkpoints
- **AUDIT_READINESS_MODEL.md**: Defines audit trail requirements; declarations specify evidence artifacts

---

## 15. Success Criteria

This contract succeeds when:

✅ **All applications have valid startup requirement declarations**  
✅ **FM app interprets declarations consistently and correctly**  
✅ **MANDATORY vs OPTIONAL distinction respected in commissioning**  
✅ **Human authorization checkpoints enforced per risk profile**  
✅ **Complete audit trail demonstrates declaration compliance**  
✅ **Commissioning adapts to application-specific needs while maintaining governance**

---

## 16. Compliance and Standards Alignment

### 16.1 ISO 27001 Alignment

This contract satisfies:

- **A.12.1.2** (Change management): Startup requirements provide change-specific validation
- **A.14.2.8** (System security testing): Declarations mandate security validation per application
- **A.14.2.9** (System acceptance testing): Declarations define application-specific acceptance criteria
- **A.18.2.3** (Technical compliance review): Declarations enable audit of application-specific compliance

### 16.2 NIST CSF Alignment

This contract supports:

- **PR.IP-1** (Baseline configuration): Declarations specify application-specific baselines
- **PR.DS-6** (Integrity checking): Declarations mandate integrity validation
- **DE.CM-1** (Network monitoring): Declarations specify operational validation requirements
- **RS.AN-1** (Notifications): Declarations define escalation and notification requirements

---

## 17. Changelog

### Version 1.0 (2025-12-24)

**Status**: Initial Release  
**Authority**: Johan Ras  
**Trigger**: Issue G-C3 — Define App-Specific Startup Requirement Declaration Contract

**Summary**: Created canonical contract for how applications declare unique commissioning requirements in structured, auditable, machine-interpretable format.

**Key Requirements Established**:
- Declaration schema and structure (application info, phase requirements, authorization checkpoints, evidence, success criteria, failure handling)
- MANDATORY vs OPTIONAL check distinction
- FM app interpretation requirements (loading, execution, authorization, evidence, success evaluation, failure handling)
- Risk profile classification and authorization rigor
- Validation requirements for declarations
- Integration with commissioning protocol phases
- Complete audit trail requirements
- Declaration examples for different risk profiles

**Effect**: Applications can now declare unique startup requirements while maintaining consistent governance interpretation, enabling FM app to orchestrate commissioning appropriately per application risk and complexity.

---

**End of APP-SPECIFIC STARTUP REQUIREMENTS DECLARATION CONTRACT**

---

**Document Metadata**:
- Document ID: APP_STARTUP_REQUIREMENTS_DECLARATION_V1.0
- Authority: Canonical Governance Standard
- Integrates With: SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md, ACTIVATION_STATE_MODEL.md, ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md, FM_GOVERNANCE_LOADING_PROTOCOL.md, GOVERNANCE_PURPOSE_AND_SCOPE.md, AUDIT_READINESS_MODEL.md
- Enforcement: Architecture Review + PR Gates + FM App Interpretation + Governance Administrator Audit
