# Approval Rules and Governance

## Core Principle: Admin Approval is Optional

The Maturion system is designed for **autonomous operation**. While admin approval capabilities exist for conservative workflows, the system's default posture is **QA-governed autonomy**. Admin approval is a configuration option, not a requirement.

## Approval Modes

### Autonomous Mode (Recommended)

**Configuration**: `MATURION_ALLOW_AUTONOMOUS_BUILDS=true`

**Behavior**:
- All builder tasks are auto-approved by system (`system_auto_approval`)
- Build sequences run end-to-end without human intervention
- Tasks transition: `pending_approval` → `approved` → `running` → `completed`
- QA validation remains mandatory (autonomy ≠ bypassing quality)

**Benefits**:
- **High Velocity**: No human bottlenecks in the build process
- **Consistency**: System applies rules uniformly, every time
- **Scalability**: Can handle high volumes of concurrent builds
- **Reliability**: Reduces human error and delays

**When to Use**:
- Established codebases with proven QA frameworks
- Organizations that trust their governance rules
- High-throughput development workflows
- Teams practicing continuous delivery

### Manual Approval Mode

**Configuration**: `MATURION_ALLOW_AUTONOMOUS_BUILDS=false` (default for safety)

**Behavior**:
- Builder tasks pause at `pending_approval` state
- Admin must explicitly approve via `/api/admin/approve`
- Each task reviewed individually before execution
- Build sequences await approval at task creation

**Benefits**:
- **Human Oversight**: Admin reviews every code change
- **Learning Phase**: Observe system behavior before trusting
- **High-Risk Changes**: Extra caution for critical systems
- **Compliance**: Some regulations require human approval

**When to Use**:
- Initial system rollout (learning phase)
- Highly regulated environments
- Changes to critical infrastructure
- New or unproven governance rules

## Approval Workflow (Manual Mode)

### Step 1: Task Creation

When Foreman dispatches a builder task:
```json
{
  "id": "task_123456",
  "builder": "ui",
  "module": "dashboard",
  "taskDescription": "Create dashboard component",
  "status": "pending_approval",
  "approved": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Step 2: Admin Review

Admin queries pending tasks:
```bash
GET /api/admin/approve?pending=true
```

Response:
```json
{
  "success": true,
  "count": 3,
  "tasks": [
    {
      "id": "task_123456",
      "builder": "ui",
      "module": "dashboard",
      "taskDescription": "Create dashboard component",
      "status": "pending_approval",
      "organisationId": "org_123"
    }
  ]
}
```

### Step 3: Approval Decision

Admin approves the task:
```bash
POST /api/admin/approve
{
  "taskId": "task_123456",
  "action": "approve",
  "adminId": "admin_user_123",
  "executeImmediately": true
}
```

Or rejects it:
```bash
POST /api/admin/approve
{
  "taskId": "task_123456",
  "action": "reject",
  "adminId": "admin_user_123",
  "reason": "Requires architecture review first"
}
```

### Step 4: Execution

If approved with `executeImmediately: true`:
- Task status → `approved`
- Builder executes immediately
- Task status → `running` → `completed` or `failed`

## Approval Authority

### System Auto-Approval

**Authority**: Foreman system itself
**Identifier**: `system_auto_approval`
**Conditions**: Only in autonomous mode
**Scope**: All builder tasks
**Audit Trail**: Logged as system approval

### Human Admin Approval

**Authority**: Organization admin users
**Identifier**: Admin user ID (e.g., `admin_user_123`)
**Conditions**: Any approval mode
**Scope**: Individual tasks or batch approval
**Audit Trail**: Logged with admin identifier and timestamp

### QA-Based Auto-Approval (Future)

**Authority**: QA Builder validation results
**Identifier**: `qa_auto_approval`
**Conditions**: Task passes pre-flight QA checks
**Scope**: Low-risk tasks only
**Audit Trail**: Includes QA check results

## Governance Checkpoints

Even in autonomous mode, governance checkpoints remain active:

### Pre-Dispatch Validation

Before creating any builder task:
1. **Organization ID Required**: Must be present and valid
2. **Builder Capability Check**: Task type must be supported
3. **Input Validation**: All required fields present
4. **Governance Rules**: Compliance with loaded governance rules

### Post-Execution Validation

After builder task completes:
1. **QA Validation**: All code passes QA Builder checks
2. **Type Safety**: TypeScript compilation succeeds
3. **Security Scan**: No obvious vulnerabilities introduced
4. **Standards Compliance**: Code follows project standards

### PR Assembly Validation

Before creating pull request:
1. **QA Results**: All QA checks passed
2. **Artifact Integrity**: All artifacts well-formed
3. **No Secrets**: No secrets in code or descriptions
4. **Branch Rules**: Follows repository branch policies

## Governance Override Rules

**There are NO governance overrides.**

Governance rules are absolute. Neither human admins nor Foreman can bypass:
- QA validation requirements
- Secret protection rules
- Organization ID requirements
- Compliance policies

**Rationale**: Governance ensures system integrity. Overrides would undermine the trust model.

## Approval Escalation

### When Tasks Require Escalation

Certain conditions trigger automatic escalation:

1. **QA Failures**: Task passed approval but failed QA
2. **Critical Errors**: Builder encountered critical exception
3. **Security Concerns**: Potential security issue detected
4. **Governance Violations**: Rule violation during execution

### Escalation Process

1. **Halt Execution**: Stop the build sequence
2. **Log Incident**: Capture full context and error details
3. **Notify Admin**: Surface in admin dashboard/API
4. **Require Manual Review**: Human must investigate and decide
5. **No Auto-Retry**: Do not retry without human approval

## Audit Trail Requirements

All approval actions must be auditable:

### Logged Information

For every approval:
- Task ID
- Approver ID (system or admin)
- Approval timestamp
- Approval mode (auto or manual)
- Execution result
- Any errors encountered

### Audit Access

Audit logs accessible via:
- Application logs (Vercel runtime logs in production)
- Admin API endpoints (future enhancement)
- Task detail queries (`GET /api/admin/approve?taskId=<id>`)

### Retention

Logs retained according to:
- Platform retention policy (Vercel: rolling logs)
- Future: Dedicated audit database
- Compliance: Must meet regulatory requirements

## Approval Best Practices

### For Autonomous Mode

1. **Start with Manual**: Begin in manual mode to observe behavior
2. **Test Governance**: Ensure governance rules are robust
3. **Monitor QA**: Watch QA pass rates before enabling autonomy
4. **Gradual Rollout**: Enable autonomy for low-risk projects first
5. **Keep QA Strict**: Never disable QA validation

### For Manual Mode

1. **Timely Review**: Review pending tasks promptly (don't block velocity)
2. **Batch Approval**: Use batch approval for related tasks
3. **Clear Rejection Reasons**: Always explain why a task was rejected
4. **Trust the System**: Don't micro-manage; trust governance and QA
5. **Plan Transition**: Work toward autonomous mode over time

## Default Configuration

**System Default**: `MATURION_ALLOW_AUTONOMOUS_BUILDS=false`

**Rationale**: Safe default for new deployments. Teams can opt into autonomy once comfortable.

**Recommendation**: Once governance rules are proven and QA is reliable, switch to autonomous mode for maximum velocity.

## Approval API Reference

### Query Pending Tasks

```
GET /api/admin/approve?pending=true
GET /api/admin/approve?status=pending_approval
```

### Query Specific Task

```
GET /api/admin/approve?taskId=task_123456
```

### Approve Task

```
POST /api/admin/approve
{
  "taskId": "task_123456",
  "action": "approve",
  "adminId": "admin_user_123",
  "executeImmediately": true
}
```

### Reject Task

```
POST /api/admin/approve
{
  "taskId": "task_123456",
  "action": "reject",
  "adminId": "admin_user_123",
  "reason": "Optional rejection reason"
}
```

### Batch Approval (Future)

```
POST /api/admin/approve/batch
{
  "taskIds": ["task_1", "task_2", "task_3"],
  "action": "approve",
  "adminId": "admin_user_123"
}
```

## Approval Philosophy

**Admin approval is a transitional mechanism.**

The ultimate goal is **autonomous operation under QA governance**. Human approval introduces:
- Bottlenecks (humans are slower than machines)
- Inconsistency (humans apply rules subjectively)
- Fatigue (humans tire and make mistakes)
- Cost (human time is expensive)

**QA validation is superior to human review** for:
- Consistency (same rules, every time)
- Thoroughness (checks never skipped)
- Speed (instant validation)
- Scalability (handles any volume)

**Therefore**: Use manual approval sparingly, trust QA enforcement heavily, and migrate to autonomous mode as soon as governance and QA frameworks are proven.

---

*This approval rules document defines governance checkpoints, approval modes, and the philosophy of QA-first, architecture-first validation over manual human review.*
