# Constitutional QA - Immutable Quality Standards

## Purpose

Constitutional QA defines the **minimum acceptable quality standards** that cannot be bypassed, weakened, or negotiated. These standards are constitutional because they protect:

1. **System Integrity** - Core architectural principles
2. **Governance Authority** - Foreman's autonomy boundaries
3. **Quality Baseline** - Non-negotiable quality floor
4. **Security Posture** - Immutable security requirements
5. **Operational Safety** - Protection against regressions

---

## Constitutional Categories (CS1-CS5)

### CS1: Guardrail Integrity Validation

**Constitutional Principle**: Governance files are immutable and protected

**Why This Matters**:
- Foreman's authority is defined in governance files
- Unauthorized changes could grant excessive permissions
- Governance drift undermines the entire system
- Immutability prevents gradual erosion of standards

**Protected Files**:
- `.github/foreman/agent-contract.md` - Foreman's constitutional contract
- `.github/workflows/qic.yml` - Quality enforcement workflow
- `.github/workflows/qiel.yml` - QA integration workflow
- `foreman/constitution/guardrails.json` - Immutable path definitions
- `foreman/constitution/**` - Constitutional documents

**Enforcement**:
- Tests verify files exist and are valid
- Tests verify no workflows modify governance files
- Tests verify guardrails define required protections
- Tests verify `.gitignore` doesn't exclude governance

**Violation Consequences**:
- PR fails immediately
- No merge possible
- Manual intervention required
- Constitutional review triggered

---

### CS2: Architecture Change Approval Enforcement

**Constitutional Principle**: Architecture changes require explicit human approval

**Why This Matters**:
- Architecture defines system boundaries and contracts
- Unauthorized changes can break integrations
- Silent architecture drift is catastrophic
- Foreman must not self-approve architectural decisions

**Protected Patterns**:
- `docs/architecture/**` - Architecture documentation
- Major system boundaries
- External contracts and APIs
- Cross-system integrations

**Approval Requirements**:
1. Architecture Change Request issue must exist
2. PR must link to the ACR issue
3. PR must include `Architecture-Change-Approval: true` metadata
4. Human reviewer must explicitly approve
5. Foreman cannot self-approve

**Enforcement**:
- Tests verify architecture directory exists (if applicable)
- Tests verify no automated architecture modification
- Tests verify approval workflow exists or is documented
- Tests verify CODEOWNERS prevents automated approval
- Tests verify PR templates require issue linkage

**Acceptable Exceptions**: None. All architecture changes require approval.

---

### CS3: Incident Feedback Loop Validation

**Constitutional Principle**: Deployments must trigger user verification and incident tracking

**Why This Matters**:
- Automated deployment can silently fail
- User-visible regressions must be detected
- Incidents must be tracked to prevent recurrence
- Lessons learned must be captured

**Required Components**:
1. **Deployment Triggers Verification**
   - Every deployment creates a "Verification Required" issue
   - Issue includes verification categories
   - User must confirm deployment success or report issues

2. **Verification Categories**
   - "Not Visible" - Feature not visible to users
   - "Not Functional" - Feature visible but broken
   - "Incorrect Behavior" - Feature works but incorrectly
   - "Resolved" - Feature works as expected

3. **Incident Lifecycle**
   - Incidents are tracked in memory fabric
   - Incidents have defined states: open → investigating → resolved → verified → closed
   - Incidents cannot auto-close without user confirmation
   - Each incident has severity: critical, high, medium, low, info

4. **Lessons Learned**
   - Resolved incidents generate lessons-learned documents
   - Lessons are stored in `memory/lessons-learned/`
   - Foreman incorporates lessons into future decisions

**Enforcement**:
- Tests verify incident infrastructure exists
- Tests verify verification categories are defined
- Tests verify deployment workflow triggers feedback
- Tests verify lessons-learned can be generated
- Tests verify incidents cannot auto-close

**Violation Consequences**:
- Deployments without verification tracking fail QIC
- Silent failures undermine trust in automation

---

### CS5: Performance Fix Enforcement

**Constitutional Principle**: No TODOs, no lazy fixes, no obvious inefficiencies

**Why This Matters**:
- TODO comments are technical debt
- Deferred work accumulates and is forgotten
- "Quick fixes" become permanent
- Code quality degrades over time without enforcement

**Prohibited Patterns**:
- `TODO:` comments
- `FIXME:` comments
- `HACK:` comments (hard fail)
- "optimize later" comments
- "temporary fix" comments
- "quick and dirty" solutions
- Commented-out code blocks

**Required Actions**:
1. **Immediate Fix**: Resolve the issue in the current PR
2. **Parking Station Entry**: Create entry in `memory/parking-station/` for deferred work
3. **Issue Creation**: Create tracked issue for future resolution

**Parking Station Requirements**:
- Clear description of deferred work
- Rationale for deferring
- Acceptance criteria for completion
- Priority and timeline estimate

**Enforcement Levels**:
- ⚠️ **Warning**: TODO, FIXME, "optimize later" (must track in Parking Station)
- ❌ **Hard Fail**: HACK comments (must refactor immediately)

**Acceptable Exceptions**: None. All lazy patterns must be resolved or tracked.

---

## WIE: Wiring Integrity Enforcement

**Constitutional Principle**: UI → API → Context → Model flow must be correctly wired

**Why This Matters**:
- Bypassing context engine defeats large prompt support
- Deprecated routes create maintenance burden
- Incorrect wiring causes silent failures
- Observability requires logging checkpoints

**Required Wiring**:
```
User Input (UI)
  ↓
/api/foreman/chat (API Route)
  ↓
prompt-compressor (Compression)
  ↓
file-processor (File Handling)
  ↓
context-manager (Context Building)
  ↓
model-escalation (Model Selection)
  ↓
OpenAI API (Execution)
```

**Prohibited Patterns**:
- ❌ UI calling deprecated routes (`/api/chat`, `/api/agent`)
- ❌ API route bypassing context-manager
- ❌ Direct OpenAI calls without compression
- ❌ Large prompts disabled
- ❌ Missing wiring checkpoints

**Enforcement**:
- Tests verify UI calls correct route
- Tests verify API invokes all required components
- Tests verify deprecated routes don't exist
- Tests verify context engine cannot be bypassed
- Tests verify observability checkpoints exist

---

## Constitutional Review Process

### When Changes Require Review

Constitutional QA changes require review when:
1. Adding new constitutional category
2. Removing existing check
3. Weakening enforcement
4. Creating exceptions or bypasses
5. Modifying governance files

### Review Requirements

1. **Proposal Document**:
   - Clear rationale for change
   - Impact analysis
   - Alternatives considered
   - Risks and mitigations

2. **Approval Chain**:
   - Technical review (architecture impact)
   - Security review (if applicable)
   - Governance review (constitutional impact)
   - Final approval from authorized human

3. **Documentation Updates**:
   - Update this document
   - Update QIC_RULES.md
   - Update agent-contract.md (if applicable)
   - Update test documentation

### Prohibited Changes

The following changes are NEVER allowed:
- Removing CS1 (Guardrail Integrity)
- Weakening governance file protection
- Allowing Foreman to self-approve architecture
- Disabling incident feedback loop
- Allowing TODO/HACK comments without tracking

---

## Enforcement Architecture

### Test Infrastructure

```
tests/qic/
├── ui-wiring.test.ts           # WIE enforcement
├── guardrails.test.ts          # CS1 enforcement
├── architecture-integrity.test.ts  # CS2 enforcement
├── incident-feedback.test.ts   # CS3 enforcement
└── performance-integrity.test.ts   # CS5 enforcement
```

### Workflow Integration

```yaml
# .github/workflows/qic.yml
- Run QIEL Full Validation
- Run Wiring Integrity Tests (WIE)
- Run Guardrail Integrity Tests (CS1)
- Run Architecture Integrity Tests (CS2)
- Run Incident Feedback Tests (CS3)
- Run Performance Integrity Tests (CS5)
- Generate Summary (must all pass)
```

### Failure Handling

```
ANY failure → PR blocked
NO exceptions
NO bypasses
NO "temporary" allowances
```

---

## Constitutional Guarantees

These guarantees are immutable:

1. **No PR merges without passing all constitutional checks**
2. **No human can bypass constitutional checks** (even maintainers)
3. **No workflow can disable constitutional checks**
4. **No "emergency" exceptions to constitutional rules**
5. **Constitutional checks can only strengthen, never weaken**

---

## Evolution and Improvement

### How to Strengthen Constitutional QA

1. Add new checks to existing categories
2. Add new constitutional categories (with justification)
3. Increase enforcement level (warning → error)
4. Add automated remediation

### How to Handle Edge Cases

1. **Document the edge case** in this file
2. **Create specific test** for the edge case
3. **Define clear resolution** (fix or track)
4. **Never create general bypass**

---

## Relationship to Other Governance

### Agent Contract

`agent-contract.md` defines:
- Foreman's identity and purpose
- Operational authority and boundaries
- Builder orchestration rules
- Governance Supremacy Rule

Constitutional QA **enforces** the agent contract through automated tests.

### True North Philosophy

True North defines:
- One QA, One Build, One Handover
- Zero drift between environments
- Forward evolution only
- Quality as non-negotiable

Constitutional QA **implements** True North through immutable standards.

### QIC Rules

QIC Rules define:
- Specific test categories
- Execution procedures
- Failure handling
- Local execution

Constitutional QA **establishes the principles** that QIC Rules implement.

---

## Summary

Constitutional QA is not:
- A checklist to optimize
- A suggestion to consider
- A guideline to follow "when possible"
- A target to approach

Constitutional QA is:
- **Law** - Must be followed absolutely
- **Immutable** - Cannot be weakened or bypassed
- **Enforced** - Automated checks prevent violations
- **Constitutional** - Changes require extraordinary justification

**When in doubt, the answer is NO.**

Protect the constitution. Enforce the standards. Maintain the integrity.
