# FM-TO-MATURION DELEGATED ACTION POLICY

## Status
Canonical Governance Policy  
Version: v1.0  
Authority: Governance Administrator  
Required By: G-C13  
Effective Date: 2025-12-25

---

## 1. Purpose

This policy establishes the complete governance framework for FM-to-Maturion delegated platform actions, defining:
- When and how FM delegates platform actions to Maturion
- What instructions FM must provide
- What audit evidence Maturion must generate
- How delegation failures are handled
- Integration with existing governance canon

This policy implements the delegation model defined in PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md with explicit instruction and audit requirements.

---

## 2. Constitutional Authority

This policy derives authority from and implements:
- **PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md** - Platform authority separation and delegation protocol
- **FM_ROLE_CANON.md** - FM responsibilities and authority boundaries
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - FM role as orchestrator, Maturion as executor
- **BUILD_PHILOSOPHY.md** - Evidence requirements and audit trail standards
- **AUDIT_READINESS_MODEL.md** - Evidence immutability and traceability requirements

---

## 3. Core Principles

### 3.1 Explicit Delegation Only
- FM cannot execute platform actions directly
- All platform actions require explicit delegation instruction
- No implicit, assumed, or "helpful" autonomous actions
- Every delegation documented and traceable

### 3.2 Complete Instruction Specification
- Instructions must be complete and unambiguous
- All action parameters must be specified
- Authorization evidence must be provided
- Expected outcomes must be defined

### 3.3 Comprehensive Audit Trail
- Every platform action generates audit record
- Audit records are immutable evidence
- Complete traceability from request to outcome
- Failure diagnostics captured for learning

### 3.4 Evidence-Driven Authorization
- Authorization based on governance compliance evidence
- QA status, gate status, human approvals verified
- No platform action without authorization evidence
- Evidence integrity maintained for audit

---

## 4. Delegation Requirements

### 4.1 When FM Must Delegate

FM MUST delegate to Maturion for ALL platform actions including:

**Issue Management**:
- Creating GitHub issues
- Modifying issue state, labels, assignees
- Commenting on issues
- Closing issues

**Pull Request Management**:
- Creating GitHub pull requests
- Modifying PR state, labels, reviewers
- Merging pull requests
- Closing pull requests
- Commenting on pull requests
- Requesting reviews

**Repository Management**:
- Creating or deleting branches via GitHub API
- Creating tags via GitHub API
- Modifying repository settings

**Workflow Management**:
- Triggering workflows via GitHub API
- Canceling workflow runs
- Re-running workflows

**Canonical Rule**: If an action affects GitHub platform state beyond file content, FM MUST delegate to Maturion.

### 4.2 When FM May NOT Delegate

FM MUST NOT delegate:
- File system operations (creating, editing, deleting files)
- Local git operations (committing, branching locally)
- Build and test execution
- QA validation
- Architecture design
- Evidence generation
- Governance validation

**Canonical Rule**: If an action is within repository scope (file system, builds, tests, evidence), FM executes autonomously without delegation.

---

## 5. Instruction Requirements

### 5.1 Instruction Schema Compliance

Every delegated action instruction MUST conform to:
- **DELEGATED_ACTION_INSTRUCTION.schema.md** - Complete schema definition
- All REQUIRED fields present and valid
- Proper instruction ID format (DAI-YYYY-NNNN)
- Valid action type from normative list
- Complete action parameters for action type

### 5.2 Instruction Completeness Criteria

An instruction is complete if and only if:
- ✅ Instruction identity is unique and valid
- ✅ Requestor identity is verified
- ✅ Action type is specified from normative list
- ✅ All required parameters for action type are provided
- ✅ Authorization context demonstrates why action is permitted
- ✅ Evidence references are valid and accessible
- ✅ Expected outcome is clearly defined
- ✅ Audit context provides traceability

**Incomplete instructions MUST be rejected by Maturion.**

### 5.3 Authorization Context Requirements

Authorization context MUST include one or more of:

**For PR Creation**:
- QA Status: 100% GREEN verified
- Test Debt: ZERO verified
- Architecture Compliance: VERIFIED
- Governance Compliance: VERIFIED
- Builder QA Report: Present and valid

**For PR Merge**:
- All PR Creation requirements (above)
- Human Approval: VERIFIED
- All Governance Gates: PASSED
- No Merge Conflicts: VERIFIED
- Branch Protection: SATISFIED

**For Issue Creation**:
- Escalation Requirement: Documented
- Failure Evidence: Complete
- Impact Assessment: Documented
- OR Human Instruction: VERIFIED

**For Emergency Actions**:
- Emergency Type: Documented
- Impact Assessment: Documented
- Emergency Approval: VERIFIED
- Remediation Plan: Documented

### 5.4 Evidence Reference Requirements

Instructions MUST reference:
- **Architecture Evidence**: Architecture document path (if applicable)
- **QA Evidence**: Builder QA Report path (if applicable)
- **Governance Evidence**: Compliance report path (if applicable)
- **CI/CD Evidence**: Workflow run URLs (if applicable)
- **Human Approval Evidence**: Approval reference (if required)

All referenced evidence MUST exist and be accessible for validation.

---

## 6. Audit Record Requirements

### 6.1 Audit Record Schema Compliance

Every executed platform action MUST generate an audit record conforming to:
- **DELEGATED_ACTION_AUDIT.schema.md** - Complete schema definition
- All REQUIRED fields present and valid
- Proper audit record ID format (DAR-YYYY-NNNN)
- Matching instruction ID (DAI-YYYY-NNNN → DAR-YYYY-NNNN)
- Complete execution evidence

### 6.2 Audit Record Completeness Criteria

An audit record is complete if and only if:
- ✅ Audit identity is unique and valid
- ✅ Action identity links to source instruction
- ✅ Execution identity documents who/when/how
- ✅ Authorization evidence verifies delegation was valid
- ✅ Execution evidence documents GitHub API interactions
- ✅ Outcome evidence documents results and state changes
- ✅ Platform evidence confirms resource creation/modification
- ✅ Failure evidence captured if execution failed
- ✅ Traceability links connect to governance artifacts

### 6.3 Mandatory Evidence Capture

Audit records MUST capture:

**Authorization Verification**:
- Requestor authority verified
- Instruction schema validated
- Authorization context verified
- Evidence references validated

**Execution Details**:
- GitHub API endpoint, method, request/response
- Execution timeline (start, end, duration)
- Pre/post execution state
- All execution steps

**Outcome Documentation**:
- Execution result (SUCCESS/FAILURE/PARTIAL)
- Expected outcome achieved (YES/NO)
- Success criteria evaluation
- Platform resource evidence (URL, ID, state)

**Failure Diagnostics** (if applicable):
- Failure stage, type, error details
- Failure impact and severity
- Remediation actions taken
- Follow-up requirements

### 6.4 Audit Record Immutability

Audit records MUST be:
- **Immutable** after creation (no modifications permitted)
- **Permanent** (never deleted or rotated)
- **Versioned** (if schema changes, old format remains accessible)
- **Integrity-protected** (hash validation)
- **Timestamped** (cryptographic timestamp where feasible)

---

## 7. Delegation Workflow

### 7.1 Standard Delegation Flow (Success Path)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. FM Determines Platform Action Required                       │
│    - Evaluates need for platform action                         │
│    - Confirms delegation is required                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. FM Generates Delegated Action Instruction                    │
│    - Assigns instruction ID (DAI-YYYY-NNNN)                     │
│    - Compiles complete instruction per schema                   │
│    - Validates instruction completeness                         │
│    - Commits instruction to repository                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. FM Delegates to Maturion                                     │
│    - Provides instruction ID and location                       │
│    - Waits for Maturion acknowledgment                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Maturion Receives Delegation                                 │
│    - Locates instruction file                                   │
│    - Validates schema compliance                                │
│    - Verifies authorization context                             │
│    - Validates evidence references                              │
│    - Updates instruction status to EXECUTING                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Maturion Executes Platform Action                            │
│    - Calls GitHub API with specified parameters                 │
│    - Captures request/response details                          │
│    - Documents execution steps                                  │
│    - Verifies expected outcome                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Maturion Generates Audit Record                              │
│    - Assigns audit record ID (DAR-YYYY-NNNN)                    │
│    - Compiles complete audit record per schema                  │
│    - Validates audit record completeness                        │
│    - Commits audit record to repository                         │
│    - Updates audit record catalog                               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Maturion Notifies FM of Completion                           │
│    - Provides execution result                                  │
│    - Provides platform resource evidence (URL, ID, state)       │
│    - Provides audit record reference                            │
│    - Updates instruction status to COMPLETED                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. FM Verifies Completion                                       │
│    - Confirms expected outcome achieved                         │
│    - Records result in FM evidence trail                        │
│    - Continues with dependent workflows                         │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Failure Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Maturion Execution Fails                                        │
│    - GitHub API error, authorization failure, validation error  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ Maturion Generates Failure Audit Record                         │
│    - Captures complete failure evidence                         │
│    - Documents error details and context                        │
│    - Assesses failure impact                                    │
│    - Documents remediation actions                              │
│    - Updates instruction status to FAILED                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ Maturion Notifies FM of Failure                                 │
│    - Provides failure reason and error details                  │
│    - Provides remediation guidance                              │
│    - Provides audit record reference                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ FM Evaluates Failure                                            │
│    - Reviews failure evidence                                   │
│    - Determines if retry appropriate                            │
│    - Determines if instruction correction needed                │
│    - Determines if escalation required                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                ┌──────────┴───────────┐
                │                      │
                ▼                      ▼
    ┌──────────────────┐   ┌─────────────────────┐
    │ Retry (Corrected)│   │ Escalate to Human   │
    │ New Instruction  │   │ Authority           │
    └──────────────────┘   └─────────────────────┘
```

---

## 8. Failure Handling Requirements

### 8.1 Maturion Failure Response

When execution fails, Maturion MUST:
1. **HALT execution** - Do not retry autonomously
2. **Document failure** - Complete failure evidence in audit record
3. **Assess impact** - Evaluate severity and state consistency
4. **Attempt remediation** - Rollback if necessary and possible
5. **Notify FM** - Detailed failure information with guidance
6. **Wait for FM decision** - Do not modify instruction or retry without FM authorization

**Prohibited Behaviors**:
- ❌ Autonomous retry without FM instruction
- ❌ Modifying instruction parameters to "make it work"
- ❌ Proceeding as if action succeeded when it failed
- ❌ Suppressing failure evidence
- ❌ Creating workarounds to bypass failure

### 8.2 FM Failure Response

When delegation fails, FM MUST:
1. **Review failure evidence** - Examine audit record and error details
2. **Classify failure** - Determine failure type and cause
3. **Assess recoverability** - Can failure be corrected and retried?
4. **Determine remediation** - What action is required?

**FM Options**:
- **Retry with Corrections**: Generate new instruction with corrected parameters
- **Escalate to Human**: Failure requires human decision or intervention
- **Abandon Action**: Action no longer required or not feasible
- **Request Clarification**: Failure reason unclear, need more information

**FM MUST NOT**:
- ❌ Bypass delegation by creating workarounds
- ❌ Proceed as if action succeeded when it failed
- ❌ Ignore failure without resolution or escalation
- ❌ Attempt direct platform action to bypass failure

### 8.3 Escalation Requirements

**Escalation Threshold**: Defined as three (3) or more failures for the same action type within a single workflow execution context.

FM MUST escalate to human authority (Johan) when:
- Repeated delegation failures exceed escalation threshold (3+ for same action)
- Critical platform action blocked
- Authorization evidence ambiguous or conflicting
- Governance rule conflict detected
- Emergency action required
- Platform constraint prevents authorized action

Escalation MUST include:
- Complete failure evidence from audit records
- Pattern analysis if repeated failures
- Impact assessment
- Recommended remediation options
- Lowest-risk path forward

---

## 9. Catalog and Traceability Requirements

### 9.1 Instruction Catalog

FM MUST maintain instruction catalog at:
```
.governance/delegated-actions/INSTRUCTION_CATALOG.md
```

Catalog MUST include:
- Complete list of all instructions (DAI-YYYY-NNNN)
- Action type, requestor, created date, status
- Link to corresponding audit record (DAR-YYYY-NNNN)
- Summary statistics and status

### 9.2 Audit Record Catalog

Maturion MUST maintain audit record catalog at:
```
.governance/delegated-actions/AUDIT_RECORD_CATALOG.md
```

Catalog MUST include:
- Complete list of all audit records (DAR-YYYY-NNNN)
- Action type, executor, execution date, result
- Link to source instruction (DAI-YYYY-NNNN)
- Platform resource URL
- Summary statistics and audit readiness status

### 9.3 Bidirectional Traceability

Complete traceability chains MUST exist:
- **Instruction → Audit Record** (1:1 relationship)
- **Audit Record → Instruction** (reverse link)
- **Instruction → Evidence** (authorization evidence)
- **Audit Record → Evidence** (execution evidence)
- **Instruction → Issue/PR** (context)
- **Audit Record → Platform Resource** (GitHub URL)

Broken traceability chains indicate governance violation.

### 9.4 Evidence Catalog Integration

Delegated action artifacts MUST be registered in Evidence Catalog:
- Instructions as evidence of authorization
- Audit records as evidence of execution
- Linked to relevant control mappings
- Accessible for compliance verification

---

## 10. Access Control and Visibility

### 10.1 Human Authority (Johan)
- ✅ Full read access to all instructions and audit records
- ✅ Real-time visibility via FM App
- ✅ Historical query capability
- ✅ Drill-down from summary to detail
- ✅ Can override or cancel pending delegations

### 10.2 Watchdog
- ✅ Read-only access for governance observation
- ✅ Alerting on anomalous patterns
- ✅ Hard stop capability for violations
- ✅ Real-time monitoring of delegation activity

### 10.3 Governance Administrator
- ✅ Read-only access for compliance audits
- ✅ Evidence validation
- ✅ Governance gap detection
- ✅ Schema compliance verification

### 10.4 FM
- ✅ Read/write access to own instructions
- ✅ Read-only access to own audit records
- ✅ Confirmation of action completion
- ✅ Failure diagnostics access
- ❌ Cannot modify audit records
- ❌ Cannot access other requestor's delegations (if multi-FM future)

### 10.5 Maturion
- ✅ Read-only access to instructions for execution
- ✅ Write-only access to audit records (creation only)
- ✅ Update access to instruction status fields
- ❌ Cannot modify instruction parameters
- ❌ Cannot modify audit records after creation
- ❌ Cannot delete instructions or audit records

---

## 11. Repository Structure Requirements

### 11.1 Mandatory Directory Structure

Every repository requiring delegated actions MUST have:

```
.governance/
└── delegated-actions/
    ├── INSTRUCTION_CATALOG.md           # Instruction registry (FM maintained)
    ├── AUDIT_RECORD_CATALOG.md          # Audit registry (Maturion maintained)
    ├── instructions/                    # Instruction files
    │   ├── DAI-2025-0001.md            # Human-readable instruction
    │   ├── DAI-2025-0001.json          # Machine-readable instruction
    │   ├── DAI-2025-0002.md
    │   ├── DAI-2025-0002.json
    │   └── ...
    └── audit-records/                   # Audit record files
        ├── DAR-2025-0001.md            # Human-readable audit record
        ├── DAR-2025-0001.json          # Machine-readable audit record
        ├── DAR-2025-0002.md
        ├── DAR-2025-0002.json
        └── ...
```

### 11.2 File Naming Conventions

**Instructions**:
- Markdown: `DAI-YYYY-NNNN.md`
- JSON: `DAI-YYYY-NNNN.json`
- Sequential numbering within year
- Zero-padded to 4 digits

**Audit Records**:
- Markdown: `DAR-YYYY-NNNN.md`
- JSON: `DAR-YYYY-NNNN.json`
- Matches instruction numbering (DAI-2025-0001 → DAR-2025-0001)

### 11.3 Retention and Archival

All delegated action artifacts MUST be:
- ✅ **Retained permanently** (no deletion or rotation)
- ✅ **Committed to version control** (git history maintained)
- ✅ **Accessible for audit** (human and machine-readable)
- ✅ **Integrity-protected** (hash validation)
- ✅ **Timestamped** (ISO 8601, cryptographic where feasible)

---

## 12. Integration with Existing Governance

### 12.1 PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md

This policy **implements** Section 5.2 (Delegation Protocol) and Section 7 (Audit Requirements) with:
- Explicit instruction schema (DELEGATED_ACTION_INSTRUCTION.schema.md)
- Explicit audit schema (DELEGATED_ACTION_AUDIT.schema.md)
- Complete workflow definition
- Failure handling protocol

**No conflicts. This policy is implementation-specific refinement.**

### 12.2 FM_ROLE_CANON.md

This policy **clarifies** FM responsibilities regarding platform actions:
- FM determines when platform actions needed (decision authority)
- FM generates delegation instructions (orchestration)
- FM does NOT execute platform actions directly (authority boundary)
- FM validates completion and continues workflow (supervision)

**No conflicts. This policy enforces FM authority boundaries.**

### 12.3 BUILD_PHILOSOPHY.md

This policy **extends** evidence requirements:
- Delegated actions require QA-as-Proof evidence
- Audit records are immutable evidence artifacts
- One-Time Build Law applies to delegation (correct instruction first time)
- Evidence trail completeness includes delegation audit

**No conflicts. This policy aligns with Build Philosophy principles.**

### 12.4 AUDIT_READINESS_MODEL.md

This policy **implements** audit readiness requirements:
- Delegated actions generate audit evidence
- Evidence is immutable and permanent
- Complete traceability maintained
- Evidence cataloged and accessible

**No conflicts. This policy strengthens audit readiness.**

---

## 13. Compliance and Standards Alignment

### 13.1 ISO 27001 Alignment

This policy supports:
- **A.9.2.1** - User registration and de-registration (delegation authorization)
- **A.9.4.1** - Information access restriction (access control to audit records)
- **A.12.4.1** - Event logging (comprehensive audit records)
- **A.12.4.2** - Protection of log information (immutability)
- **A.12.4.3** - Administrator and operator logs (Maturion execution logs)

### 13.2 ISO 31000 Alignment

This policy supports:
- Risk treatment action traceability (delegated actions as risk treatments)
- Control effectiveness verification (audit evidence)
- Residual risk documentation (failure evidence)

### 13.3 NIST CSF Alignment

This policy supports:
- **ID.AM-6** - Cybersecurity roles and responsibilities (FM vs Maturion separation)
- **PR.AC-4** - Access permissions managed (delegation authorization)
- **PR.PT-1** - Audit/log records (comprehensive audit records)
- **DE.CM-1** - Network monitoring (delegation activity monitoring)
- **DE.CM-7** - Unauthorized actions detection (delegation without authorization detected)
- **RS.AN-1** - Notifications analyzed (failure analysis)

---

## 14. Enforcement

### 14.1 Pre-Execution Enforcement (Maturion)

Maturion MUST reject delegations that:
- ❌ Lack valid instruction file
- ❌ Fail schema validation
- ❌ Have incomplete authorization context
- ❌ Reference invalid or inaccessible evidence
- ❌ Have malformed parameters for action type

**Rejection response MUST include detailed validation errors for FM correction.**

### 14.2 Post-Execution Enforcement (Governance Administrator)

Governance Administrator MUST verify:
- ✅ All executed actions have corresponding audit records
- ✅ Audit records conform to schema
- ✅ Instruction-audit traceability is complete
- ✅ Catalogs are up-to-date and accurate
- ✅ Evidence accessibility maintained
- ✅ Retention compliance

**Violations MUST be escalated to human authority.**

### 14.3 Continuous Enforcement (Watchdog)

Watchdog MUST monitor for:
- 🚨 FM attempting direct platform actions (authority violation)
- 🚨 Maturion executing without instruction (autonomous action violation)
- 🚨 Missing audit records for executed actions (audit gap)
- 🚨 Instruction-audit ID mismatch (traceability violation)
- 🚨 Modified audit records (immutability violation)

**Critical violations trigger immediate hard stop and escalation.**

---

## 15. Learning and Evolution

### 15.1 Pattern Detection

Continuous analysis of audit records enables:
- Success rate tracking by action type
- Failure pattern identification
- Performance optimization opportunities
- Authorization bottleneck detection
- Governance gap identification

### 15.2 Schema Evolution

Instruction and audit schemas MAY evolve based on:
- New GitHub API capabilities
- New action types required
- Performance optimizations
- Security enhancements
- Compliance requirement changes

**Evolution Process**:
1. Pattern or gap detected in audit records
2. Proposal submitted to Governance Administrator
3. Evaluation against canonical principles
4. Human authority (Johan) approval required
5. Schema versioned and backward compatibility maintained
6. Migration guidance provided

**Non-Regression Principle**: Schema evolution MUST NOT weaken authorization requirements, audit requirements, or authority boundaries.

### 15.3 Prohibited Evolution

Schemas and policy MUST NOT evolve to:
- ❌ Allow FM direct platform access
- ❌ Allow Maturion autonomous decision-making
- ❌ Weaken audit requirements
- ❌ Reduce evidence requirements
- ❌ Enable delegation bypasses

---

## 16. Non-Compliance Consequences

Failure to comply with this policy constitutes:
- **Platform authority boundary violation** (if FM attempts direct action)
- **Delegation protocol breach** (if instruction schema not followed)
- **Audit trail gap** (if audit records not generated)
- **Evidence requirement failure** (if authorization evidence not provided)
- **Governance completeness RED state**
- **Audit readiness RED state**
- **ISO 27001 control failure** (logging and access control)
- **Potential regulatory non-compliance**

**Consequences**:
- Immediate escalation to human authority
- PR merge blocked until compliance restored
- Root cause analysis required
- Governance learning promoted if pattern detected
- Agent execution may be halted pending remediation

---

## 17. Success Criteria

This policy is successfully implemented when:
- ✅ All platform actions use explicit delegation instructions
- ✅ All instructions conform to DELEGATED_ACTION_INSTRUCTION.schema.md
- ✅ All executed actions have corresponding audit records
- ✅ All audit records conform to DELEGATED_ACTION_AUDIT.schema.md
- ✅ Instruction-audit traceability is complete and bidirectional
- ✅ Catalogs are maintained and current
- ✅ Evidence is accessible and integrity-protected
- ✅ Failures are documented and analyzed
- ✅ Audit readiness status is GREEN
- ✅ No authority boundary violations detected

---

## 18. Relationship to Issue G-C13

This policy **completes** issue G-C13 by providing:

**Canonical Instruction Model** ✅:
- Complete schema defined (DELEGATED_ACTION_INSTRUCTION.schema.md)
- Requestor identity, action specification, justification, evidence requirements specified
- Normative action types defined with required parameters
- Authorization context requirements explicit

**Canonical Audit Requirements** ✅:
- Complete schema defined (DELEGATED_ACTION_AUDIT.schema.md)
- Who requested, who executed, what was done, when, why documented
- Evidence capture requirements explicit
- Traceability linkage defined

**Prohibitions** ✅:
- No implicit delegation (explicit instruction required)
- No undocumented execution (audit record mandatory)
- No platform action without recorded instruction (enforcement defined)

**Implementation Agnostic** ✅:
- Schemas define contract, not implementation
- Multiple implementations can satisfy schemas
- Integration points with existing governance clear

**Acceptance Criteria Met** ✅:
- PR opened (in progress)
- Awaiting review

---

**End of FM-TO-MATURION DELEGATED ACTION POLICY**

---

**Document Metadata**:
- Policy ID: FM_MATURION_DELEGATED_ACTION_POLICY_V1
- Authority: Canonical Governance Policy
- Required By: G-C13
- Implements: PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md Sections 5.2, 7
- Enforcement: Maturion (instruction validation), Governance Administrator (audit verification), Watchdog (violation detection)
- Integration: DELEGATED_ACTION_INSTRUCTION.schema.md, DELEGATED_ACTION_AUDIT.schema.md, FM_ROLE_CANON.md, AUDIT_READINESS_MODEL.md
