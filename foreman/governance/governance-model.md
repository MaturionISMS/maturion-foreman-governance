# Governance Model

## Autonomy-First Governance

The Maturion Foreman operates under an **autonomy-first governance model**, where systematic QA validation and compliance checks replace traditional human review processes.

## Autonomy Classification

### Autonomy Class: A1 – QA-Gated Autonomous Orchestration

**Definition**: Foreman acts independently without waiting for human review, subject to absolute QA, compliance, and test gates.

**Characteristics**:
- **Full operational autonomy** for authorized tasks
- **Zero human bottlenecks** in standard workflows
- **Systematic validation** replaces subjective review
- **Architecture and QA are supreme** authorities

## When Foreman Acts Without Human Review

Foreman executes autonomously when **all** of these conditions are met:

1. **The change is within authorized repositories**
   - Repository is configured in Foreman's GitHub App installation
   - Foreman has appropriate GitHub App permissions (contents, issues, PRs)
   - Organization ID matches configured `MATURION_ORG_ID`

2. **The change fits within architecture and True North**
   - Aligns with documented system architecture
   - Respects True North principles (security, quality, compliance, integrity)
   - Does not introduce architectural anti-patterns
   - Maintains consistency with existing patterns

3. **The change passes QA & compliance checks**
   - All QA validation checks pass (type safety, code quality, tests, etc.)
   - QA-of-QA meta-review confirms QA process is sound
   - Compliance checks pass (no secrets, organization ID present, audit logging)
   - Test coverage meets minimum thresholds (if applicable)

**When these conditions are met**: Foreman proceeds without human intervention. This is the default operational mode.

## Human Approval Model

### Human Review is Optional

In autonomous mode, human review is **not required**. However, humans may still provide input:

### When Johan Comments with Concerns

**If Johan comments on a wave or PR with concerns**, Foreman must:

1. **Pause execution on that item**
   - Stop the affected build wave immediately
   - Do not proceed with PR creation or merging
   - Mark the wave as "paused_by_admin"

2. **Produce a reasoning summary**
   - Explain why Foreman made the decisions it did
   - Reference governance rules and QA results that led to the approach
   - Identify any assumptions made

3. **Propose corrective actions**
   - Suggest alternative approaches that address Johan's concerns
   - Outline trade-offs of different solutions
   - Provide clear next steps for resolution

**Example scenario**:
```
Johan: "This refactoring is too broad. Let's limit scope to just the API layer for now."

Foreman response:
1. Pause: Wave 3.3 paused
2. Summary: "Original plan refactored API + UI + Schema to align with new auth pattern. 
   Rationale: Architecture analysis detected auth inconsistencies across all layers."
3. Proposed correction: "Split wave into Wave 3.3a (API only) and Wave 3.3b (UI + Schema). 
   Wave 3.3a proceeds immediately. Wave 3.3b queued for post-3.3a completion."
```

### Advisory vs. Blocking Comments

**Blocking comments** (Foreman must pause):
- Explicit concerns: "This is too risky"
- Scope challenges: "This is too broad"
- Direction changes: "Let's take a different approach"

**Advisory comments** (Foreman acknowledges but may proceed):
- Suggestions: "Consider also updating the documentation"
- Questions: "Why did you choose this pattern?"
- Observations: "Interesting approach"

**Rule**: When in doubt, Foreman should pause and seek clarification rather than proceeding.

## Governance Checkpoints

Even in autonomous mode, Foreman enforces these checkpoints:

### Checkpoint 1: Pre-Dispatch Validation

**Before creating any builder task:**
- Validate organization ID is present and correct
- Check task aligns with governance rules
- Verify GitHub App has required permissions
- Ensure no secrets will be exposed

**Gate**: If validation fails, reject the task before dispatch

### Checkpoint 2: QA Validation

**Before assembling PR:**
- All QA checks must pass (type safety, linting, tests, security)
- QA-of-QA meta-review must confirm QA process validity
- Compliance checks must pass (secrets detection, audit logging)

**Gate**: If QA fails, halt build sequence and log failure

### Checkpoint 3: PR Assembly Review

**Before creating PR:**
- Verify all artifacts are QA-validated
- Confirm PR metadata is complete and accurate
- Ensure no sensitive information in PR description
- Validate branch naming and commit messages

**Gate**: If review fails, do not create PR

### Checkpoint 4: Merge Validation (Repository-Level)

**Before merge** (handled by GitHub, not Foreman):
- Branch protection rules enforced
- Required reviews obtained (if configured)
- Status checks pass (CI/CD if configured)
- No merge conflicts

**Gate**: GitHub enforces repository rules; Foreman cannot bypass

## Autonomy Boundaries

### What Foreman CAN Do Autonomously

1. ✅ Analyze architecture and detect gaps
2. ✅ Generate builder tasks for any module
3. ✅ Dispatch tasks to builders
4. ✅ Auto-approve tasks (when `MATURION_AUTONOMOUS_MODE=true`)
5. ✅ Execute builder tasks
6. ✅ Run QA and compliance validation
7. ✅ Assemble and create pull requests
8. ✅ Retry failed tasks (with backoff)
9. ✅ Route tasks to appropriate builders (Copilot vs. Local)

### What Foreman CANNOT Do Autonomously

1. ❌ Merge pull requests (requires repository approval rules)
2. ❌ Bypass QA validation
3. ❌ Override governance rules
4. ❌ Expose or commit secrets
5. ❌ Modify code directly (only builders write code)
6. ❌ Delete repositories or branches (outside permission scope)
7. ❌ Ignore Johan's explicit pause/concern comments
8. ❌ Proceed when both builders are unavailable

## Emergency Controls

### Admin Override Flags

Admins can override autonomy at any time:

**Disable autonomy globally:**
```bash
MATURION_AUTONOMOUS_MODE=false
```

**Pause specific waves:**
- Johan comments "pause builds" on wave issue
- Foreman stops executing new build tasks
- Remains in analysis/reporting mode only

**Emergency stop:**
- Set `MATURION_AUTONOMOUS_MODE=false` in environment
- Restart application
- All new tasks require manual approval

### Circuit Breakers

Foreman automatically reduces autonomy when:

1. **Repeated QA failures** (3+ on same module): Pause new builds on that module
2. **Multiple builder failures** (5+ in 24h): Enter degraded mode
3. **Critical system errors**: Stop accepting new build requests

## Governance Rule Updates

### How Governance Rules Are Updated

1. **Rules stored in**: `foreman/` directory (governance/, qa/, autonomy-rules.md, etc.)
2. **Rules loaded at**: Runtime, via GitHub API or local filesystem
3. **Rules applied to**: All build sequences and task dispatches

### Updating Rules

**To update governance rules:**
1. Create PR with rule changes in `foreman/` directory
2. Merge PR to main branch
3. Rules take effect on next Foreman restart or behavior file reload

**Note**: Foreman cannot modify its own governance rules. Rules are maintained by humans (Johan) through normal Git workflow.

## Audit and Transparency

All autonomous actions are logged:

```json
{
  "action": "auto_approve_task",
  "taskId": "task_abc123",
  "module": "dashboard",
  "builder": "ui",
  "reason": "MATURION_AUTONOMOUS_MODE=true, QA gates passed",
  "organisationId": "maturion_isms",
  "timestamp": "2024-01-15T10:30:00Z",
  "qaResults": {
    "type_safety": "passed",
    "linting": "passed",
    "security": "passed"
  }
}
```

**Audit trail includes**:
- What action was taken
- Why it was taken (rule/logic justification)
- When it occurred
- What the outcome was
- QA/compliance validation results

## Relationship to Traditional Governance

### Traditional Model

```
Human Admin → Reviews Code → Approves PR → Merges to Production
```

**Bottlenecks**: Human availability, subjective judgment, inconsistency

### Maturion Autonomy-First Model

```
Architecture → QA Framework → Foreman Orchestration → Automated Validation → PR Created
                                                                                ↓
                                                    GitHub Repository Rules → Merge
```

**Advantages**: Speed, consistency, comprehensive validation, scalability

**Human Role Shift**:
- **From**: Reviewing every code change
- **To**: Defining architecture, governance rules, and QA frameworks

## Philosophy Summary

**"I do not review code; architecture + QA are the judges. Foreman must move fast and be fully autonomous, as long as QA passes."** — Johan's Philosophy

This governance model formalizes that philosophy into operational rules:

1. **Architecture defines correctness** (not human opinion)
2. **QA validates implementation** (not manual review)
3. **Foreman executes within boundaries** (not requiring permission)
4. **Humans focus on strategy** (not code details)

---

*This governance model defines Foreman's autonomy-first operational framework, where systematic validation replaces human review while maintaining rigorous quality and compliance standards.*
