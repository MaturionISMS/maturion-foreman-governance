# ADR-0000: Hybrid GitHub Control Plane (GitHub App + MCP Service)

## Status

**ACCEPTED** - Constitutional Decision Record

**Date**: 2025-12-14

**Decision Authority**: Maturion Engineering Leadership (Johan)

---

## Glossary

- **MCP**: Model Context Protocol - A protocol for exposing tools and capabilities to AI agents in a standardized, discoverable way
- **GitHub App**: GitHub's authorization mechanism for applications to access repositories with scoped permissions
- **GSR**: Governance Supremacy Rule - Constitutional requirement that governance rules override all other considerations
- **QIC**: Quality Integrity Contract - Constitutional requirement for quality standards enforcement
- **QIEL**: QA Integration and Environment Lock-in - Testing framework ensuring 100% QA compliance

---

## Context

Foreman requires autonomous GitHub operations to complete full lifecycle execution without human intervention:

```
Architecture → Red QA → Build to Green → Validate → Create PR → [MERGE PR] → [CLOSE ISSUE] → COMPLETE
```

The merge and issue closure steps previously required human intervention, creating an **Infrastructure Gap** that prevented true autonomous operation.

### Problem Statement

**Without autonomous GitHub control:**
- Foreman cannot complete lifecycles independently
- Human intervention required for every PR merge
- Issue closure remains manual
- Autonomy promise incomplete
- Governance enforcement requires human presence

**Infrastructure Classification**: Missing capability preventing autonomous lifecycle completion

---

## Decision

We will operate a **HYBRID GitHub control plane** consisting of two components:

### 1. GitHub App (Identity + Permission Anchor)

**Purpose**: Establish identity and authorization

**Responsibilities**:
- Authenticate Foreman as a recognized GitHub App
- Provide scoped permissions (repo, pull_request, issues)
- Serve as the permission boundary and audit anchor
- Enable revocable access control

**What it is NOT**:
- NOT the execution surface
- NOT embedded in Foreman runtime
- NOT a privileged control inside agent process

### 2. MCP Service (Governed Execution Surface + Audit Point)

**Purpose**: Provide governed GitHub operation capabilities

**Responsibilities**:
- Expose GitHub operations as MCP tools for Foreman
- Enforce safety rules before ALL operations (CI green, QA approval, compliance checks)
- Log all actions to Governance Memory
- Validate operations against governance rules
- Block operations that violate safety guarantees
- Maintain complete audit trail

**Architecture**:
- Deployed **independently** of Foreman
- Must be reachable at runtime
- Provides tool discoverability
- Enforces safety layer before GitHub mutations
- Integrates with existing governance infrastructure

**Available Tools**:
1. `mcp_github_merge_pr` - Merge PR with safety validation
2. `mcp_github_close_issue` - Close issue with documentation
3. `mcp_github_add_labels` - Add labels to issues/PRs
4. `mcp_github_remove_labels` - Remove labels
5. `mcp_github_comment` - Post comment with secrets detection

---

## Non-Negotiable Requirements

### 1. MCP as First-Class Control Plane Service

**Requirement**: MCP is a first-class Control Plane service. It is deployed independently of Foreman and must be reachable at runtime.

**Implications**:
- MCP is infrastructure, not a feature
- MCP availability is a prerequisite for autonomous operation
- If MCP is unavailable, Foreman MUST halt and classify as Infrastructure Gap
- MCP lifecycle is managed separately from Foreman deployment

### 2. Safety Enforcement is Absolute

**Requirement**: All GitHub operations MUST pass safety validation before execution

**Safety Checks Required**:
- CI status must be GREEN (all required checks passing)
- Branch protection rules respected (required reviews, status checks)
- QA approval label present (`qa-approved`)
- Compliance approval label present (`compliance-approved`)
- No merge conflicts
- No secrets in comments
- All governance rules validated

**No Bypass Mechanism**: There is NO way to bypass safety checks. Operations that fail safety validation are blocked and escalated to human.

### 3. Complete Audit Trail

**Requirement**: All MCP operations logged to Governance Memory

**Audit Log Contents**:
- Operation type (merge_pr, close_issue, etc.)
- Actor (foreman)
- Target (owner/repo/number)
- Timestamp
- Result (success/failure)
- Safety check results (pass/fail for each check)
- Reason for failure (if applicable)

**Audit Guarantees**:
- All operations logged (cannot be disabled)
- Logs are immutable (no deletion)
- Logs include safety check details
- Failed operations logged with reasons

### 4. Governance Supremacy Maintained

**Requirement**: MCP enforces Governance Supremacy Rule (GSR), not bypasses it

**GSR Enforcement**:
- QA failures block merge (100% green required)
- Architecture rules enforced
- Quality Integrity Contract (QIC) validated
- No merge with failing tests
- No merge with lint errors
- No test debt permitted

**Integration Points**:
- MCP integrates with existing GitHub mutations module
- Uses Governance Memory for audit trail
- Respects QIC/QIEL requirements
- Validates against all governance rules

---

## Rationale

### Why Hybrid (GitHub App + MCP Service)?

#### 1. Long-Running Autonomous Execution

**Challenge**: Foreman may run for hours or days completing complex waves

**Solution**: 
- GitHub App provides persistent identity
- MCP Service provides execution capability
- Separation enables long-running operations without embedding privileged control in agent

#### 2. Tool Discoverability, Auditability, Safety Enforcement

**Challenge**: Need discoverable, auditable, safe GitHub operations

**Solution**:
- MCP provides structured tool interface
- All operations flow through safety validation layer
- Complete audit trail in Governance Memory
- Tools are discoverable at runtime

#### 3. Future Multi-Agent / Multi-Repo Scalability

**Challenge**: Future may require multiple agents across multiple repositories

**Solution**:
- MCP Service can serve multiple Foreman instances
- GitHub App scales to multiple repositories
- Centralized governance enforcement point
- Shared audit trail and safety layer

#### 4. Avoid Embedding Privileged Control Inside Foreman Runtime

**Challenge**: Embedding GitHub control in Foreman creates security risks

**Solution**:
- MCP Service runs independently
- Foreman consumes tools at runtime
- Permission boundary enforced at MCP layer
- Foreman cannot bypass safety checks

### Why NOT Alternatives?

#### ❌ Direct GitHub API in Foreman

**Problems**:
- Embeds privileged control in agent runtime
- No independent safety validation layer
- Audit trail scattered across logs
- Difficult to revoke or modify permissions
- No tool discoverability
- Cannot serve multiple agents

#### ❌ GitHub Actions Workflows Only

**Problems**:
- Cannot handle complex autonomous decision-making
- No runtime tool discovery
- Limited error handling and escalation
- No integration with Foreman's governance memory
- Cannot adapt to dynamic execution context

#### ❌ Human-Only Control (Status Quo)

**Problems**:
- Breaks autonomous operation promise
- Requires human intervention for every PR
- Blocks overnight/weekend execution
- Prevents true autonomous lifecycle completion

---

## Architecture Integration

### Data Flow: Autonomous PR Merge

```
1. Foreman completes QA validation (100% green)
   ↓
2. Foreman creates PR via GitHub API
   ↓
3. Foreman calls MCP tool: mcp_github_merge_pr(owner, repo, prNumber)
   ↓
4. MCP Server validates input parameters
   ↓
5. MCP Safety Layer checks:
   - CI status via GitHub API (must be green)
   - Branch protection rules (reviews, status checks)
   - QA approval label (qa-approved present)
   - Compliance approval label (compliance-approved present)
   - Merge conflicts (must be none)
   ↓
6. If ALL safety checks pass:
   - MCP calls GitHub mutations.mergePR()
   - MCP logs operation to Governance Memory
   - MCP returns success result to Foreman
   ↓
7. If ANY safety check fails:
   - MCP returns error with specific reason
   - MCP logs blocked operation to Governance Memory
   - Foreman escalates to human if needed
   ↓
8. Foreman calls MCP tool: mcp_github_close_issue(owner, repo, issueNumber, reason)
   ↓
9. Issue closed with documentation
   ↓
10. Lifecycle COMPLETE (no human intervention)
```

### Integration with Existing Infrastructure

**MCP Service integrates with**:
- `lib/github/mutations.ts` - Existing GitHub operations module
- `lib/foreman/memory/governance-memory.ts` - Audit logging
- `lib/foreman/dispatch.ts` - Autonomous lifecycle orchestration
- `lib/foreman/pr/auto-merge.ts` - PR merge automation

**Configuration**:
- Environment variable: `GITHUB_MCP_TOKEN` (GitHub App token)
- MCP availability checked at runtime
- If unavailable: Foreman halts and classifies Infrastructure Gap

---

## Consequences

### Positive Consequences

1. **✅ True Autonomous Operation**
   - Foreman completes full lifecycle without human clicks
   - Architecture → Red QA → Build → Validate → Merge → Close → DONE
   - Overnight/weekend execution possible

2. **✅ Safety Guarantees Enforced**
   - No merge without CI green
   - No merge without QA/compliance approval
   - All operations validated against governance rules
   - Complete audit trail maintained

3. **✅ Governance Supremacy Maintained**
   - GSR still absolute
   - QIC/QIEL still enforced
   - 100% QA passing still required
   - No weakening of quality standards

4. **✅ Scalability Foundation**
   - MCP can serve multiple agents
   - Centralized governance enforcement
   - Independent deployment and lifecycle
   - Tool discoverability for future builders

5. **✅ Infrastructure Classification**
   - Infrastructure gap identified and addressed
   - Autonomous promise fulfilled
   - No governance dilution
   - No product behavior changes

### Negative Consequences / Trade-offs

1. **Additional Infrastructure Dependency**
   - MCP Service must be deployed and maintained
   - Foreman requires MCP availability to operate autonomously
   - Infrastructure failure point (mitigated by deployment monitoring)

2. **Increased Complexity**
   - Two components (GitHub App + MCP Service) instead of one
   - Additional configuration required (GITHUB_MCP_TOKEN)
   - More moving parts to monitor and maintain

3. **Token Management Required**
   - GitHub App token must be securely managed
   - Token rotation and expiration handling needed
   - Permission scoping must be maintained

### Mitigation Strategies

**For Infrastructure Dependency**:
- Deploy MCP with high availability
- Monitor MCP health and availability
- Alert on MCP unavailability
- Graceful degradation (escalate to human if MCP down)

**For Increased Complexity**:
- Comprehensive documentation (MCP Control Plane Guide)
- Clear architecture diagrams
- Automated health checks
- Integration tests for full flow

**For Token Management**:
- Secure environment variable storage
- Token rotation procedures
- Minimal permission scoping
- Audit token usage in Governance Memory

---

## Implementation Status

### Phase 1: MCP Server Implementation ✅ COMPLETE

- [x] Created MCP server module (`lib/mcp/server.ts`)
- [x] Implemented safety validation layer (`lib/mcp/safety.ts`)
- [x] Integrated with GitHub mutations module
- [x] Added comprehensive tests
- [x] Documented MCP architecture

### Phase 2: Foreman Integration ✅ COMPLETE

- [x] Updated dispatch logic to check MCP availability
- [x] Integrated MCP tools in auto-merge flow
- [x] Added autonomous issue closure
- [x] Updated completion flow

### Phase 3: Validation ✅ COMPLETE

- [x] Infrastructure tests passing
- [x] Autonomous lifecycle validated
- [x] Audit logging verified
- [x] Safety enforcement tested

### Phase 4: Documentation ✅ COMPLETE

- [x] MCP usage guide (`docs/mcp-control-plane-guide.md`)
- [x] Architecture documentation (`architecture/mcp-control-plane-architecture.md`)
- [x] Safety guarantees documented
- [x] Audit procedures documented

**Current Status**: Implementation complete. MCP Control Plane operational.

**ADR Status**: This ADR documents the decision that was implemented. No further implementation required in this issue.

---

## Related Documents

### Architecture

- `/architecture/mcp-control-plane-architecture.md` - Complete architecture specification
- `/architecture/mcp-control-plane-checklist-validation.md` - Architecture checklist validation
- `/docs/mcp-control-plane-guide.md` - User guide and usage documentation

### Implementation

- `/lib/mcp/server.ts` - MCP server implementation
- `/lib/mcp/safety.ts` - Safety validation layer
- `/lib/mcp/config.ts` - MCP configuration
- `/lib/foreman/dispatch.ts` - Foreman integration

### Tests

- `/tests/mcp/server.test.ts` - Unit tests for MCP tools
- `/tests/mcp/safety.test.ts` - Safety validation tests
- `/tests/mcp/integration.test.ts` - Integration tests
- `/tests/mcp/e2e.test.ts` - End-to-end autonomous lifecycle tests

### Governance

- `.github/foreman/agent-contract.md` - Foreman constitutional contract
- `/BUILD_PHILOSOPHY.md` - Build philosophy (unchanged by MCP)
- `/foreman/constitution/CS2_ARCHITECTURE_APPROVAL_WORKFLOW.md` - Architecture approval process

### Evidence

- `/evidence/implementation/MCP_CONTROL_PLANE_IMPLEMENTATION_SUMMARY.md` - Implementation summary
- `/evidence/build-history/MCP_CONTROL_PLANE_VALIDATION_REPORT.md` - Validation report

---

## Acceptance Criteria

This ADR is **ACCEPTED** when:

1. ✅ **ADR Document Created**: This constitutional decision record exists and is complete
2. ✅ **Implementation Complete**: MCP Control Plane implemented and operational (already complete)
3. ✅ **Foreman Can Complete Full Lifecycle**: Issue assigned → Architecture → Red QA → Build → Validate → Merge → Close → DONE (already validated)
4. ✅ **Safety Guarantees Enforced**: All safety checks active and blocking unsafe operations (already tested)
5. ✅ **Audit Trail Maintained**: All MCP operations logged to Governance Memory (already implemented)
6. ✅ **100% GREEN Infrastructure Tests**: All MCP tests passing (already verified)

**All acceptance criteria met. This ADR documents the accepted decision.**

---

## Future Considerations

### Potential Enhancements

1. **Multi-Repository Support**
   - MCP could be extended to serve multiple repositories
   - Centralized governance across multiple Foreman instances
   - Shared safety validation and audit trail

2. **Additional GitHub Operations**
   - Create issues, PRs programmatically
   - Manage project boards
   - Handle release management
   - Repository configuration management

3. **Enhanced Safety Checks**
   - Code quality metrics (coverage, complexity)
   - Security scanning results
   - Performance benchmarks
   - Documentation completeness

4. **Advanced Audit Capabilities**
   - Real-time audit dashboards
   - Anomaly detection in operations
   - Compliance reporting
   - Governance drift detection

### Evolution Path

**This ADR establishes the foundation for autonomous GitHub control.**

Future ADRs may extend this decision to address topics such as:
- Multi-repository MCP control plane support
- Enhanced safety validation rules and metrics
- MCP tool extensibility framework
- Advanced audit and anomaly detection capabilities

**This ADR remains the constitutional anchor for all GitHub control plane decisions.**

---

## Version History

- **v1.0** (2025-12-14): Initial ADR documenting Hybrid GitHub Control Plane decision
- **Status**: ACCEPTED
- **Authority**: Maturion Engineering Leadership (Johan)
- **Implementation**: Complete (MCP Control Plane operational)

---

## Constitutional Authority

This ADR has constitutional authority:

- **Immutable**: Cannot be reversed without new ADR and constitutional review
- **Binding**: All future GitHub control plane decisions must align with this architecture
- **Governance**: MCP Control Plane is governed by Governance Supremacy Rule (GSR)
- **Protected**: This file is protected by CS1 (Guardrail Integrity Validation)

**Modification Process**: Any changes to this decision require:
1. New ADR proposing change
2. Constitutional review
3. Human approval (Johan)
4. Update to this document with version increment

---

## Summary

**Decision**: Operate Hybrid GitHub Control Plane (GitHub App + MCP Service)

**Rationale**: Enable autonomous lifecycle completion with safety guarantees and complete audit trail

**Status**: ACCEPTED and IMPLEMENTED

**Authority**: Constitutional decision by Maturion Engineering Leadership

**Non-Negotiable**: MCP is first-class infrastructure; safety enforcement absolute; governance supremacy maintained

**Result**: Foreman can complete full autonomous lifecycles without human intervention while maintaining all governance guarantees

---

**This is a constitutional decision record. It documents an accepted architectural decision with binding authority.**
