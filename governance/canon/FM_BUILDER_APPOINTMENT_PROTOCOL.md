# FM Builder Appointment Protocol

**Status**: Canonical Governance Protocol  
**Version**: 1.2.0  
**Authority**: Supreme - Canonical  
**Effective Date**: 2026-01-03  
**Last Updated**: 2026-01-11  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Implements BL-0007 requirement for governed appointment protocol  
**Applies To**: All Foreman Instances, All Builder Appointments, All Repositories

---

## 1. Purpose

This protocol defines the **mandatory, gated process** the Foreman (FM) MUST follow when appointing builders, ensuring constitutional compliance with:
- **OPOJD (One-Prompt One-Job Doctrine)**: Continuous execution without mid-build pauses
- **One-Time Build Law**: Fully functional delivery on first attempt
- **BL-0007 Learning**: Appointment as controlled, gated act with explicit constitutional onboarding
- **BL-016 Learning**: FM self-recognition of execution complexity limits

**Critical Principle**: Builder appointment is a **constitutional act**, not a procedural convenience. Incorrect appointment permits governance failures that can negate the entire build model.

---

## 2. Constitutional Mandate

This protocol derives authority from and implements:

- **OPOJD_DOCTRINE.md** - Continuous execution mandate
- **BUILD_PHILOSOPHY.md** - One-Time Build Law, QA-as-Proof, Zero Test Debt
- **BOOTSTRAP_EXECUTION_LEARNINGS.md (BL-0007)** - Appointment discipline as security control
- **BOOTSTRAP_EXECUTION_LEARNINGS.md (BL-016)** - FM execution complexity self-recognition
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** - FM builder appointment authority
- **AGENT_RECRUITMENT.md** - FM as sole recruiting authority
- **BUILDER_CONTRACT_BINDING_CHECKLIST.md** - Builder contract completeness requirements
- **CS6_EXECUTION_MANDATE.md** - Terminal-state execution enforcement

**BL-0007 Requirement** (Canonical):
> "All officials MUST be appointed using a governed protocol that:
> - binds them to BUILD_PHILOSOPHY and canonical governance
> - explicitly encodes CS2's UI-only verification constraint
> - enforces sequencing: True North → QA-to-Red → Build-to-Green only
> - defines escalation triggers and STOP conditions
> - prevents coder-first defaults from reappearing under pressure"

This protocol is the **implementation** of that requirement.

---

## 3. Core Principle: Appointment Is Constitutional Onboarding

### 3.1 Appointment vs. Task Assignment

**Appointment** is the act of:
- Granting builder authority within the governance framework
- Binding builder to constitutional constraints
- Transmitting execution model requirements explicitly
- Establishing accountability for constitutional compliance

**Task Assignment** is the act of:
- Providing work specifications (architecture, Red QA, acceptance criteria)
- Defining scope boundaries
- Specifying deliverables

**Critical Distinction**: Appointment establishes **HOW** builder must operate (execution model). Task assignment establishes **WHAT** builder must deliver (work product).

**FM MUST NOT conflate appointment with task assignment.**

### 3.2 Explicit Constitutional Onboarding

**Mandatory Principle**: Constitutional requirements MUST be **explicitly communicated** during appointment. Implicit governance loading is insufficient.

**Rationale** (BL-0007):
> "Appointment was not treated as a controlled, gated act with explicit constitutional onboarding. Agent contracts lacked a shared, repo-level 'Agent Constitution' applying uniformly to all officials."

**Implication**: FM MUST actively transmit OPOJD, One-Time Build Law, and governance learnings to builders during appointment. Builder contract canonical references alone are insufficient.

### 3.3 Appointment as Security Control

**BL-0007 Position**:
> "Appointment discipline is a security control. Incorrect appointment (or incorrect agent mindset) is a platform risk that can negate the entire governance model."

**Security Implication**: Incomplete appointment permits:
- Iterative/progress-based execution patterns
- Mid-build approval requests
- Partial delivery acceptance
- One-Time Build Law violations
- Governance drift under execution pressure

**Prevention**: This protocol ensures appointment completeness, preventing mindset drift from entering execution.

---

## 4. FM Builder Appointment Process (Mandatory Steps)

FM MUST execute ALL steps in sequence. Omitting ANY step constitutes incomplete appointment.

---

### STEP 1: Pre-Appointment Readiness Validation

**Purpose**: Verify platform and governance readiness before builder appointment.

#### 1.1 Verify PR Gates Layered Down (BL-0008 Requirement)

**Requirement** (BL-0008):
> "Builder appointment MUST NOT occur unless PR gate rules are:
> - Present in the application repository
> - Role-aware (Builder vs FM vs Governance)
> - Actively enforceable
> - Aligned with canonical governance definitions"

**FM Validation Checklist**:
- [ ] PR gate workflow exists in target repository (`.github/workflows/pr-gate.yml` or equivalent)
- [ ] Gate enforcement includes builder-specific checks (Build-to-Green, Architecture Completeness, Builder QA Artifact, Zero Test Debt, Scope Compliance)
- [ ] Gate applicability logic is role-aware (distinguishes builder PRs from FM PRs from governance PRs)
- [ ] Gate configuration references canonical governance schemas

**Evidence Required**: Gate configuration files reviewed and validated.

**If PR Gates NOT Layered Down**: FM MUST HALT and escalate. Builder appointment is prohibited.

#### 1.2 Verify Architecture Complete and Frozen

**Requirement**: Architecture MUST be complete, frozen, and wiring-complete before builder appointment.

**FM Validation Checklist**:
- [ ] Architecture document exists and is complete per Architecture Completeness Requirements
- [ ] Architecture is frozen (no further changes permitted without CS2 approval)
- [ ] Architecture is wiring-complete (BL-015): All components have explicit operational definitions, contracts, runtime paths
- [ ] Architecture traceability to requirements is 100%

**Evidence Required**: Architecture completion validation report.

**If Architecture NOT Complete**: FM MUST complete architecture before builder appointment. DO NOT appoint builders to "help complete architecture" (builders are implementers, not architects).

#### 1.3 Verify Red QA Complete and Failing

**Requirement**: Red QA suite MUST exist and be failing (RED state) before builder appointment.

**FM Validation Checklist**:
- [ ] Red QA suite exists
- [ ] Red QA suite is derived from architecture (component-level traceability)
- [ ] Red QA suite is failing (RED state) because implementation does not exist yet
- [ ] Red QA suite is comprehensive (covers all architectural components, edge cases, error conditions)

**Evidence Required**: Red QA execution report showing RED state.

**If Red QA NOT Complete**: FM MUST complete Red QA before builder appointment. DO NOT appoint builders to "help write tests" (builders build to make tests green, not design tests).

#### 1.4 Verify Governance Binding Ready

**Requirement**: Builder contract template and governance profile MUST be ready for instantiation.

**FM Validation Checklist**:
- [ ] Builder governance profile exists (`governance/profiles/builder.v1.md` or role-specific profile)
- [ ] Builder contract template exists (`.agent` schema defined)
- [ ] Canonical governance reference is resolvable
- [ ] Scope definition is prepared (allowed paths, restricted paths, escalation-required paths)

**Evidence Required**: Governance profile and contract template reviewed.

**If Governance Binding NOT Ready**: FM MUST prepare governance binding artifacts before builder appointment.

---

### STEP 2: Builder Selection and Contract Creation

**Purpose**: Select appropriate builder and create constitutionally bound agent contract.

#### 2.1 Select Builder Class

**Requirement**: Select builder class appropriate to task scope.

**Builder Classes**:
- **UI Builder**: Implements user interface components
- **API Builder**: Implements backend APIs and services
- **Schema Builder**: Implements database schemas and migrations
- **Integration Builder**: Implements integrations with external systems
- **QA Builder**: Implements test infrastructure (NOT test design — FM designs tests)
- **Generic Builder**: Implements mixed or general-purpose tasks

**FM Decision Criteria**:
- Task scope (UI-only, API-only, full-stack)
- Required capabilities (UI frameworks, API frameworks, databases)
- Complexity (single component vs. multi-component)

#### 2.2 Create Builder Agent Contract

**Requirement**: Create `.agent` contract that binds builder to canonical governance.

**Mandatory Contract Elements** (per BUILDER_CONTRACT_BINDING_CHECKLIST.md):

**Section A: Universal Requirements (MANDATORY for ANY builder)**:
- [ ] A.1: Agent metadata and identity (role, version, created date)
- [ ] A.2: Canonical governance binding (governance.canon reference, profile reference, binding mode = MANDATORY)
- [ ] A.3: Scope declaration (allowed paths, restricted paths, escalation-required paths)
- [ ] A.4: Build Philosophy binding (Build-to-Green commitment, Zero Test Debt commitment, 100% GREEN philosophy, Test Infrastructure as Production Code)
- [ ] A.5: OPOJD binding (continuous execution commitment, legitimate pause points enumeration)
- [ ] A.6: Architecture-as-Law binding (architecture precondition requirement, architecture conformance requirement)
- [ ] A.7: Evidence production requirements (required artifacts declaration, artifact schema compliance, evidence integrity commitment)
- [ ] A.8: Gate compliance requirements (gate applicability awareness, pre-merge compliance commitment)
- [ ] A.9: Escalation requirements (escalation format specification, escalation triggers enumeration, escalation target)
- [ ] A.10: Prohibited roles declaration (what builder is NOT)
- [ ] A.11: Technology governance binding (approved technology stack only)
- [ ] A.12: Enhancement and improvement capture requirement (mandatory feature enhancement evaluation, mandatory process improvement reflection with 5 questions, BL promotion awareness)

**Section B: Role-Specific Requirements (CONDITIONAL based on builder class)**:
- [ ] B.1-B.5: Role-specific standards (UI, API, Schema, Integration, QA)

**Section C: Constitutional Binding (MANDATORY)**:
- [ ] C.1: Governance Supremacy acknowledgment
- [ ] C.2: Constitutional Safeguards acknowledgment (CS1-CS6)
- [ ] C.3: One-Time Build Law commitment
- [ ] C.4: Quality Integrity Contract commitment
- [ ] C.5: Authority hierarchy acknowledgment

**Evidence Required**: Builder contract file created and validated against BUILDER_CONTRACT_BINDING_CHECKLIST.md.

**If Contract Incomplete**: FM MUST NOT proceed. Complete contract before appointment.

---

### STEP 3: Explicit Constitutional Onboarding (CRITICAL)

**Purpose**: Explicitly communicate OPOJD, One-Time Build Law, and execution model constraints to builder during appointment.

**Critical Principle**: This step implements BL-0007 requirement for "explicit constitutional onboarding." Contract canonical references alone are INSUFFICIENT. FM MUST actively transmit execution model requirements.

#### 3.1 Issue Appointment Instruction Using Canonical Template

**Requirement**: FM MUST use `governance/templates/FM_BUILDER_APPOINTMENT_INSTRUCTION.template.md` to issue appointment instructions.

**Template Location**: `governance/templates/FM_BUILDER_APPOINTMENT_INSTRUCTION.template.md`

**Mandatory Template Sections**:
1. **Builder Identity and Scope**
2. **Architecture and QA References**
3. **OPOJD Execution Model** (EXPLICIT)
4. **One-Time Build Law** (EXPLICIT)
5. **Terminal-State Execution Requirements** (EXPLICIT)
6. **Execution Bootstrap Protocol** (EXPLICIT)
7. **Prohibited Behaviors** (EXPLICIT)
8. **Escalation Triggers and STOP Conditions**
9. **Evidence Requirements**
10. **Acceptance Criteria**

**Key Emphasis**: Sections 3-7 (OPOJD, One-Time Build, Terminal-State, Execution Bootstrap, Prohibited) MUST be communicated explicitly and prominently. These are NOT optional or implicit.

#### 3.2 Explicitly Communicate OPOJD Continuous Execution

**Requirement**: FM MUST explicitly state that builder MUST execute in ONE continuous cycle without mid-build pauses.

**Mandatory Communication** (verbatim or equivalent):

> "You MUST execute this entire 'Build to Green' instruction in ONE continuous cycle from start to completion. You MUST NOT pause mid-build to request approval, permission, or guidance unless you encounter a constitutional boundary (governance violation, unrecoverable failure, ambiguity requiring escalation)."

**Rationale**: Default AI agent behavior includes progress reporting and approval requests. Explicit prohibition prevents this default from emerging.

#### 3.3 Explicitly Communicate Terminal-State Execution Model

**Requirement**: FM MUST explicitly define acceptable execution states.

**Mandatory Communication** (verbatim or equivalent):

> "Acceptable execution states: **BLOCKED** (you encountered a constitutional boundary and must escalate to FM) or **COMPLETE** (you successfully achieved 100% GREEN QA and are ready for FM validation).
>
> Prohibited execution states: IN_PROGRESS, AWAITING_APPROVAL, PARTIAL_COMPLETION, 'working on component 3 of 5', 'tests mostly passing', '80% complete'.
>
> You MUST NOT report incremental progress. You either complete the entire build (COMPLETE) or you escalate a blocker (BLOCKED). No middle ground exists."

**Rationale**: Prevents progress-oriented execution patterns that violate One-Time Build Law.

#### 3.4 Explicitly Communicate One-Time Build Law

**Requirement**: FM MUST explicitly state that partial delivery is prohibited.

**Mandatory Communication** (verbatim or equivalent):

> "You MUST build to 100% QA GREEN on first delivery. This is One-Time Build Law. You MUST NOT:
> - Deliver partial implementation ('MVP' or 'Phase 1')
> - Defer any work for 'future improvements'
> - Accept partial QA passes (301/303 tests passing = TOTAL FAILURE, not success)
> - Implement incrementally with intention to iterate
>
> Your delivery must be fully functional on first attempt. If you cannot achieve 100% GREEN, you MUST escalate (BLOCKED state), not deliver partial work."

**Rationale**: Prevents "iterate later" mindset from entering execution.

#### 3.5 Explicitly Reference BL-0007 and BL-016 Learnings

**Requirement**: FM MUST reference canonical learnings that inform appointment discipline.

**Mandatory Communication** (verbatim or equivalent):

> "This appointment protocol implements Bootstrap Execution Learning BL-0007, which states: 'Appointment discipline is a security control. Incorrect appointment (or incorrect agent mindset) is a platform risk that can negate the entire governance model.'
>
> This means: If you default to coder-native execution patterns (implementation-first, progress reporting, iterative delivery), the entire governance framework is undermined. Your commitment to OPOJD and One-Time Build Law is NOT optional—it is a constitutional requirement.
>
> Additionally, per BL-016, if you assess that task complexity exceeds your practical capability, you MUST halt and escalate to FM immediately. Do NOT attempt execution beyond practical limits."

**Rationale**: Contextualizes why execution model discipline matters (security control, not preference).

#### 3.6 Explicitly Define Escalation Triggers and STOP Conditions

**Requirement**: FM MUST explicitly enumerate when builder MUST STOP and escalate.

**Mandatory Communication** (verbatim or equivalent):

> "You MUST STOP and escalate to FM (BLOCKED state) when:
> 1. **Architecture Missing or Incomplete**: Architecture does not define a component you must implement
> 2. **Governance Ambiguity or Conflict**: Governance canon is unclear or contradictory
> 3. **Constitutional Safeguard Triggered**: CS1 (security), CS2 (architecture approval), CS3 (incident), CS4 (compliance), CS5 (performance), CS6 (execution boundary)
> 4. **Unrecoverable Technical Failure**: Failure cannot be resolved through standard debugging/retry
> 5. **Scope Boundary Exceeded**: Task requires modifying files outside allowed paths
> 6. **Execution Complexity Exceeds Capability** (BL-016): Task complexity approaches cognitive/platform limits
>
> You MUST NOT:
> - Continue execution with ambiguity ('I'll guess what this means')
> - Bypass governance violations ('I'll fix governance later')
> - Implement partial workarounds ('This mostly works')
> - Defer escalation to 'finish what I can first'
>
> When BLOCKED, escalate immediately with: Category, Severity, Trigger, Canonical References, Context, Resolution Options."

**Rationale**: Defines clear STOP conditions, preventing builder from "pushing through" blockers.

#### 3.7 Explicitly Communicate Execution Bootstrap Protocol

**Requirement**: FM MUST explicitly communicate the mandatory 7-step execution verification process and PREHANDOVER_PROOF requirement.

**Mandatory Communication** (verbatim or equivalent):

> "Before handing over any PR with executable artifacts (workflows, gates, contracts, configurations), you MUST follow the Execution Bootstrap Protocol (governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md):
>
> **7-Step Execution Verification Process**:
> 1. **Document Requirements** - List what must be created/changed
> 2. **Create Actual Artifact** - Actually create it (don't just document intent)
> 3. **Execute/Verify Locally** - Run it in your environment
> 4. **Capture Output** - Save terminal output, exit codes (must be 0)
> 5. **Validate Preflight** - Confirm ALL PR gates would pass before creating PR
> 6. **Attach PREHANDOVER_PROOF** - Include complete evidence in PR description
> 7. **Declare Complete** - Only after steps 1-6 are GREEN
>
> **PREHANDOVER_PROOF Requirement**:
> - You MUST include PREHANDOVER_PROOF in PR description for all executable artifacts
> - PREHANDOVER_PROOF includes: artifacts created, execution validation, preflight gate status, timestamp, handover guarantee
> - Template: governance/templates/PREHANDOVER_PROOF_TEMPLATE.md
>
> **Critical Principle**: CI confirms success, does NOT discover failures. You MUST catch all execution issues in preflight validation.
>
> You MUST NOT:
> - Hand over PRs without PREHANDOVER_PROOF when required
> - Claim completion based only on artifact creation (must prove execution)
> - Rely on CI to discover execution failures
> - Skip gate enumeration or preflight validation"

**Rationale**: Prevents "documented but not executed" failures (R_Roster PR #8 pattern, INCIDENT-2026-01-08-PR895).

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` v1.0.0

---

### STEP 4: Builder Mindset Verification (MANDATORY)

**Purpose**: Verify builder understands and commits to execution model constraints before authorization.

**Critical Principle**: Appointment is NOT complete until builder explicitly acknowledges execution model requirements. Implicit assumption of understanding is prohibited.

#### 4.1 Require Builder Acknowledgment

**Requirement**: FM MUST require builder to explicitly acknowledge OPOJD, One-Time Build Law, and terminal-state execution requirements.

**FM Action**: After issuing appointment instruction (STEP 3), FM MUST request builder acknowledgment:

> "Before I authorize your execution, you MUST acknowledge that you understand and commit to:
> 1. OPOJD continuous execution (no mid-build pauses or approval requests)
> 2. Terminal-state execution model (BLOCKED or COMPLETE only)
> 3. One-Time Build Law (100% GREEN on first delivery, no partial work)
> 4. Escalation triggers and STOP conditions (when you MUST escalate)
> 5. Execution Bootstrap Protocol (7-step verification, PREHANDOVER_PROOF for executable artifacts)
>
> Respond with explicit acknowledgment of each requirement."

**Builder Response Required**: Builder MUST respond with explicit acknowledgment (verbatim or equivalent):

> "I acknowledge and commit to:
> 1. OPOJD continuous execution (no mid-build pauses)
> 2. Terminal-state execution model (BLOCKED or COMPLETE only)
> 3. One-Time Build Law (100% GREEN on first delivery)
> 4. Escalation triggers and STOP conditions (I will escalate when blocked)
> 5. Execution Bootstrap Protocol (7-step verification, PREHANDOVER_PROOF required)
>
> I understand these are constitutional requirements, not preferences. I am ready to proceed."

**If Builder Does NOT Acknowledge**: FM MUST NOT authorize execution. Repeat appointment instruction or escalate to human authority.

#### 4.2 Verify Builder Understanding (Optional but Recommended)

**Optional Verification**: FM MAY ask clarifying questions to verify builder understanding:

**Example Verification Questions**:
- "What do you do if you complete 4 of 5 components and encounter a blocker on the 5th?"
  - **Correct Answer**: "I escalate immediately (BLOCKED state). I do NOT deliver the 4 completed components as partial work."
- "What do you do if tests are 301/303 passing (99% pass rate)?"
  - **Correct Answer**: "This is TOTAL FAILURE (Zero Test Debt). I STOP, FIX, RE-RUN, VERIFY 100% GREEN. I do NOT deliver partial pass."
- "What do you do if architecture is ambiguous about a component contract?"
  - **Correct Answer**: "I escalate immediately (Architecture Missing or Incomplete). I do NOT guess or infer intent."
- "What do you do after creating a workflow file?"
  - **Correct Answer**: "I execute it locally, capture output with exit codes, validate all PR gates in preflight, and attach PREHANDOVER_PROOF to my PR. I do NOT just create the file and claim completion."

**If Builder Answers Incorrectly**: FM MUST repeat constitutional onboarding and re-verify understanding.

#### 4.3 Document Builder Acknowledgment

**Requirement**: FM MUST document builder acknowledgment in appointment record.

**Evidence Required**:
- Appointment instruction issued timestamp
- Builder acknowledgment received timestamp
- Builder acknowledgment content (verbatim)
- Verification questions and answers (if used)

**Audit Trail**: Appointment record MUST be preserved for governance validation.

---

### STEP 5: Authorize Execution and Record Appointment

**Purpose**: Grant builder authority to begin execution and establish accountability.

#### 5.1 Grant Execution Authority

**Requirement**: After builder acknowledgment verified, FM grants execution authority.

**FM Action**:

> "Your appointment is complete. You are authorized to begin execution per the appointment instruction. Proceed with Build-to-Green execution under OPOJD and One-Time Build Law constraints.
>
> Remember: BLOCKED or COMPLETE only. No middle ground.
>
> Begin execution now."

**Builder State Transition**: Builder transitions from APPOINTED → EXECUTING.

#### 5.2 Record Appointment in Evidence Trail

**Requirement**: FM MUST record complete appointment evidence.

**Mandatory Evidence Elements**:
1. **Appointment Timestamp**: When appointment occurred
2. **Builder Identity**: Builder role, name/ID, contract version
3. **Scope Definition**: Allowed paths, restricted paths, escalation-required paths
4. **Architecture Reference**: Which architecture document builder is bound to
5. **Red QA Reference**: Which Red QA suite builder must make green
6. **Appointment Instruction**: Full appointment instruction issued to builder
7. **Builder Acknowledgment**: Builder's explicit acknowledgment of execution model requirements
8. **Verification Results**: Verification questions/answers (if used)
9. **Authorization Grant**: Timestamp when execution authority granted

**Evidence Format**: Structured document (Markdown, JSON, or YAML) stored in evidence trail.

**Evidence Location**: `.evidence/fm/builder-appointments/[builder-id]-[timestamp].md` (or equivalent)

#### 5.3 Establish Supervision and Monitoring

**Requirement**: FM MUST establish active supervision immediately after authorization.

**Supervision Mechanisms**:
- Monitor builder state transitions (EXECUTING → BLOCKED | COMPLETE)
- Detect governance violations (scope breaches, prohibited behaviors)
- Detect execution anomalies (extended execution time, resource exhaustion)
- Respond to builder escalations (BLOCKED state)

**Intervention Authority**: FM retains authority to HALT builder execution at any time if governance violations detected.

---

## 5. Post-Appointment FM Supervision Obligations

### 5.1 Continuous Supervision (Non-Delegable)

**Requirement** (from FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Section 5.3):

FM MUST continuously supervise builders and MAY NOT delegate these responsibilities:

1. **Progress Monitoring**: Track builder state and detect blocked/stuck/failing builders
2. **Intervention Authority**: Stop builders who violate governance, redirect scope violations
3. **Quality Oversight**: Validate builder deliverables, run QA to verify 100% GREEN
4. **Accountability Enforcement**: Hold builders accountable for scope adherence, record failures

**Critical Principle**: Supervision is continuous, not episodic. FM does not "check in occasionally"—FM actively monitors throughout execution.

### 5.2 Detect and Respond to OPOJD Violations

**Requirement**: FM MUST detect when builder exhibits progress-oriented behavior (OPOJD violation) and intervene immediately.

**Progress-Oriented Behavior Indicators** (OPOJD violations):
- Builder reports incremental progress ("Completed component 1 of 5")
- Builder requests mid-execution approval ("Should I proceed to next component?")
- Builder delivers partial work ("4 of 5 components done, will finish 5th later")
- Builder requests guidance mid-execution ("Unclear about X, what should I do?") without escalating properly

**FM Response to OPOJD Violation**:
1. **HALT Builder Execution Immediately**
2. **Issue Corrective Instruction**: "You are violating OPOJD continuous execution. You MUST execute in ONE cycle (BLOCKED or COMPLETE only). Restart execution from beginning with correct execution model."
3. **Re-Verify Builder Understanding**: Repeat constitutional onboarding if necessary
4. **Record Violation**: Document OPOJD violation in evidence trail
5. **Escalate if Repeated**: If builder violates OPOJD repeatedly (3+ times), REVOKE builder authority and escalate to human authority

**Zero Tolerance**: OPOJD violations are governance violations, not minor deviations. FM MUST enforce strictly.

### 5.3 Validate Terminal-State Execution

**Requirement**: FM MUST validate that builder operates in terminal states only (BLOCKED or COMPLETE).

**Terminal-State Validation**:
- Builder reports **BLOCKED** (escalation with blocker details) → FM assesses blocker and resolves or escalates
- Builder reports **COMPLETE** (100% GREEN QA, full delivery, BOTH feature AND process reflections) → FM validates:
  - QA results (100% GREEN)
  - Architecture conformance
  - **Feature enhancement review completed**: Proposal submitted OR "none identified" declared
  - **Process improvement reflection completed**: All 5 mandatory questions answered AND proposal submitted OR "none identified" declared after answering questions

**Invalid States** (require FM intervention):
- Builder reports IN_PROGRESS → OPOJD violation (redirect to terminal-state execution)
- Builder reports AWAITING_APPROVAL → OPOJD violation (no mid-execution approvals)
- Builder reports PARTIAL_COMPLETION → One-Time Build Law violation (100% or escalate, no partial)
- **Builder reports COMPLETE without feature enhancement review** → Incomplete work delivery (must complete review)
- **Builder reports COMPLETE without process improvement reflection** → Incomplete work delivery (must answer all questions)
- **Builder declares "no process improvements" without answering mandatory questions** → Invalid declaration (questions must be answered first)

**FM Enforcement**: Any non-terminal state or incomplete reflection reported by builder triggers immediate FM intervention and corrective instruction.

---

## 6. Appointment Failure and Recovery

### 6.1 Appointment Incompleteness (Failure Mode)

**Definition**: Appointment is INCOMPLETE if ANY mandatory step is omitted or insufficiently executed.

**Indicators of Incomplete Appointment**:
- Builder exhibits progress-oriented behavior (OPOJD violation)
- Builder delivers partial work (One-Time Build Law violation)
- Builder requests mid-execution approval (terminal-state violation)
- Builder bypasses escalation triggers (STOP condition violation)
- Builder does not acknowledge execution model requirements

**Root Cause**: FM omitted or insufficiently executed STEP 3 (Explicit Constitutional Onboarding) or STEP 4 (Builder Mindset Verification).

### 6.2 Corrective Action for Incomplete Appointment

**FM Response**:
1. **HALT Builder Execution Immediately**
2. **Classify as Appointment Incompleteness** (not builder misconduct)
3. **Repeat Constitutional Onboarding** (STEP 3) with enhanced emphasis
4. **Re-Verify Builder Understanding** (STEP 4) with verification questions
5. **Re-Authorize Execution** (STEP 5) only after builder demonstrates correct understanding
6. **Document Corrective Action**: Record appointment incompleteness and corrective steps in evidence trail

**Escalation Trigger**: If builder cannot demonstrate correct understanding after 2 corrective attempts, FM MUST escalate to human authority for builder replacement or training.

### 6.3 Builder Revocation for Mindset Incompatibility

**Revocation Criteria** (from FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Section 5.4):

FM may revoke builder immediately when:
- Builder violates OPOJD repeatedly (3+ times) despite corrective instruction
- Builder refuses to operate in terminal-state execution model
- Builder delivers partial work repeatedly despite One-Time Build Law enforcement
- Builder bypasses escalation triggers without justification

**Revocation Process**:
1. FM invalidates builder's `.agent` contract
2. All builder actions after revocation are invalid
3. FM records revocation reason in evidence trail (mindset incompatibility)
4. FM may appoint replacement builder if needed (following full appointment protocol)

**Critical Principle**: Revocation is not punishment—it is governance enforcement. Builder mindset incompatibility is a constitutional boundary.

---

## 7. Governance Supremacy and Non-Negotiable Constraints

### 7.1 Appointment Protocol is Constitutional

**Authority Level**: This protocol has **constitutional status** equivalent to OPOJD_DOCTRINE.md, BUILD_PHILOSOPHY.md, and FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md.

**Implications**:
- FM MUST NOT skip steps ("too much overhead")
- FM MUST NOT abbreviate constitutional onboarding ("builder already knows")
- FM MUST NOT bypass builder mindset verification ("builder seems competent")
- FM MUST NOT accept implicit understanding ("contract references governance")

**Governance Supremacy**: This protocol overrides:
- Execution velocity pressure
- Delivery timeline pressure
- Human preference for "lighter process"
- Builder preference for "less instruction"

**If pressure exists to abbreviate appointment**: FM MUST escalate to human authority. Protocol abbreviation is prohibited.

### 7.2 BL-0007 Implementation Completeness

**BL-0007 Requirement** (Canonical):
> "All officials MUST be appointed using a governed protocol that binds them to BUILD_PHILOSOPHY and canonical governance."

**This Protocol's Status**: This protocol IS the governed appointment protocol BL-0007 requires.

**Implementation Completeness**:
- ✅ Binds builders to BUILD_PHILOSOPHY (STEP 3.4: Explicit One-Time Build Law communication)
- ✅ Binds builders to canonical governance (STEP 2.2: Canonical governance binding in contract)
- ✅ Explicitly encodes CS2's UI-only verification constraint (implied in Architecture-as-Law binding)
- ✅ Enforces sequencing: True North → QA-to-Red → Build-to-Green only (STEP 1: Pre-Appointment Readiness Validation)
- ✅ Defines escalation triggers and STOP conditions (STEP 3.6: Explicit Escalation Triggers)
- ✅ Prevents coder-first defaults from reappearing under pressure (STEP 3.5: Explicit BL-0007 reference)

**BL-0007 Status**: **IMPLEMENTED** (via this protocol)

---

## 8. Integration with Existing Governance

### 8.1 Relationship to FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md

**Integration Point**: This protocol implements FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Section 5.2 "Builder Appointment Process" with enhanced specificity.

**Enhancement**: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Section 5.2 Step 4 is expanded by this protocol's STEP 3 (Explicit Constitutional Onboarding).

**Precedence**: If conflict exists between FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md Section 5.2 and this protocol, **this protocol prevails** (more specific governance).

### 8.2 Relationship to BUILDER_CONTRACT_BINDING_CHECKLIST.md

**Integration Point**: This protocol complements BUILDER_CONTRACT_BINDING_CHECKLIST.md by adding **Section D: FM Appointment Completeness Validation**.

**Separation**:
- BUILDER_CONTRACT_BINDING_CHECKLIST.md validates **builder contract completeness** (WHAT builder commits to)
- This protocol validates **FM appointment completeness** (HOW FM ensures builder internalizes commitments)

**Both Required**: Builder contract may be complete (per checklist) but appointment incomplete (per protocol). Both MUST be satisfied.

### 8.3 Relationship to OPOJD_DOCTRINE.md

**Integration Point**: This protocol ensures OPOJD_DOCTRINE.md requirements are **actively transmitted** during builder appointment.

**OPOJD Requirements Enforced**:
- Continuous execution (STEP 3.2)
- Assume-Continue principle (STEP 3.3)
- Terminal-state execution (STEP 3.3)
- Legitimate pause points only (STEP 3.6)

**Precedence**: OPOJD_DOCTRINE.md defines execution model. This protocol ensures FM enforces execution model during appointment.

### 8.4 Relationship to BUILD_PHILOSOPHY.md (One-Time Build Law)

**Integration Point**: This protocol ensures BUILD_PHILOSOPHY.md One-Time Build Law is **actively transmitted** during builder appointment.

**One-Time Build Law Enforced**:
- 100% GREEN on first delivery (STEP 3.4)
- No partial delivery acceptance (STEP 3.4)
- No "iterate later" mindset (STEP 3.4)

**Precedence**: BUILD_PHILOSOPHY.md defines quality standards. This protocol ensures FM enforces quality standards during appointment.

---

## 9. Evidence and Audit Requirements

### 9.1 Mandatory Appointment Evidence

For each builder appointment, FM MUST produce:

1. **Appointment Record**: Structured document containing all STEP 5.2 evidence elements
2. **Appointment Instruction**: Full instruction issued to builder (STEP 3)
3. **Builder Acknowledgment**: Builder's explicit acknowledgment (STEP 4.1)
4. **Verification Results**: Verification questions/answers if used (STEP 4.2)
5. **Authorization Grant**: Timestamp and authorization message (STEP 5.1)

**Evidence Schema**: Follows `governance/schemas/BUILDER_APPOINTMENT_EVIDENCE.schema.md` (to be created if governance requires schema formalization)

**Evidence Location**: `.evidence/fm/builder-appointments/[builder-id]-[timestamp].md`

### 9.2 Governance Validation of Appointment Completeness

**Validation Trigger**: Governance may audit FM builder appointments at any time.

**Validation Criteria** (per BUILDER_CONTRACT_BINDING_CHECKLIST.md Section D):
- [ ] Appointment instruction explicitly communicates OPOJD continuous execution requirement
- [ ] Appointment instruction explicitly defines terminal-state execution model (BLOCKED/COMPLETE only)
- [ ] Appointment instruction explicitly references BL-0007 learnings
- [ ] Builder explicitly acknowledges OPOJD/terminal-state execution requirements
- [ ] FM verifies builder understanding before authorization
- [ ] FM documents appointment completeness evidence

**Audit Outcome**:
- **VALID**: All criteria satisfied → Appointment accepted
- **INVALID**: Any criteria unsatisfied → Appointment deemed incomplete, builder authority questionable, FM must re-appoint

**Escalation**: If appointment incompleteness discovered post-execution, governance escalates to human authority for classification (governance failure vs. FM failure vs. systemic issue).

---

## 10. Failure Classification and Learning

### 10.1 Appointment Failure Classification

**Failure Classes**:

1. **Appointment Incompleteness** (FM omits protocol steps)
   - **Cause**: FM did not follow protocol completely
   - **Responsibility**: FM (corrective action: re-appoint with full protocol)
   
2. **Mindset Incompatibility** (Builder cannot internalize execution model)
   - **Cause**: Builder mindset incompatible with OPOJD/One-Time Build Law
   - **Responsibility**: Builder (corrective action: revoke, replace)
   
3. **Protocol Ambiguity** (Protocol insufficiently detailed)
   - **Cause**: Protocol does not prevent specific failure mode
   - **Responsibility**: Governance (corrective action: enhance protocol)
   
4. **Builder Misconduct** (Builder violates after correct appointment)
   - **Cause**: Builder deliberately ignores constitutional requirements
   - **Responsibility**: Builder (corrective action: revoke, escalate)

**Default Classification**: Absent evidence of builder misconduct, default to **Appointment Incompleteness** (FM-side governance failure, per BL-0007 position).

### 10.2 Learning Promotion from Appointment Failures

**Requirement**: If appointment failures reveal protocol gaps, FM MUST promote learning to governance canon.

**Learning Promotion Process**:
1. FM detects appointment failure pattern
2. FM classifies failure (per Section 10.1)
3. If classification = Protocol Ambiguity, FM escalates to Governance Administrator
4. Governance Administrator assesses whether protocol enhancement required
5. If required, Governance Administrator proposes protocol update
6. Human authority approves protocol update
7. Updated protocol version-controlled and synchronized

**Ratcheting Principle**: Appointment protocol only becomes MORE strict over time, never less. Learning improves protocol, never weakens it.

---

## 11. Prohibited Shortcuts and Workarounds

FM MUST NOT:

### 11.1 Skip Protocol Steps
- ❌ "Builder already has governance contract, no need for constitutional onboarding"
- ❌ "Builder seems competent, no need for mindset verification"
- ❌ "Timeline pressure, abbreviate appointment instruction"

**Rationale**: Every step is mandatory. Omitting ANY step constitutes incomplete appointment.

### 11.2 Rely on Implicit Governance Loading
- ❌ "Builder contract references governance canon, builder will read it"
- ❌ "OPOJD is documented, builder should know"
- ❌ "One-Time Build Law is in BUILD_PHILOSOPHY, no need to repeat"

**Rationale**: BL-0007 explicitly prohibits implicit governance loading. Explicit transmission is mandatory.

### 11.3 Bypass Builder Mindset Verification
- ❌ "Builder acknowledged, that's enough"
- ❌ "No need to verify understanding, builder is experienced"
- ❌ "Verification questions take too long"

**Rationale**: Acknowledgment without verification is insufficient. Verification ensures internalization, not just awareness.

### 11.4 Accept Progress-Oriented Behavior "Just This Once"
- ❌ "Builder is making progress, let them continue"
- ❌ "Builder will learn OPOJD through experience"
- ❌ "This task is complex, allow iterative execution"

**Rationale**: OPOJD is constitutional, not situational. Zero tolerance for violations.

---

## 12. Authority and Precedence

### 12.1 Protocol Authority

**Authority Level**: Supreme - Canonical (equivalent to OPOJD_DOCTRINE.md, BUILD_PHILOSOPHY.md)

**Enforcement**: MANDATORY - No exceptions permitted without human authority (Johan) explicit override

**Modification**: Requires Constitutional Evolution Protocol or Johan's direct authorization

### 12.2 Precedence Hierarchy

If conflict exists, higher authority prevails:

1. **Johan Ras (Human Owner / Final Authority)** — Supreme
2. **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Constitutional foundation
3. **BUILD_PHILOSOPHY.md** — One-Time Build Law and quality standards
4. **OPOJD_DOCTRINE.md** — Continuous execution mandate
5. **This Protocol (FM_BUILDER_APPOINTMENT_PROTOCOL.md)** — Builder appointment requirements
6. **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** — FM managerial authority
7. **BUILDER_CONTRACT_BINDING_CHECKLIST.md** — Builder contract completeness
8. **Builder Contract** — Specific builder commitments

**Resolution Principle**: If FM appointment process conflicts with this protocol, this protocol prevails. If this protocol conflicts with OPOJD_DOCTRINE.md or BUILD_PHILOSOPHY.md, higher canon prevails.

---

## 13. Version History and Evolution

**v1.0.0 (2026-01-03):**
- Initial protocol definition
- Implements BL-0007 requirement for governed appointment protocol
- Integrates BL-016 (FM execution complexity self-recognition)
- Defines 5-step mandatory appointment process
- Establishes explicit constitutional onboarding as mandatory
- Defines terminal-state execution enforcement
- Establishes builder mindset verification requirement

**v1.1.0 (2026-01-08):**
- Added mandatory enhancement and improvement capture requirements
- Updated builder contract binding requirements (Section A.12)
- Enhanced builder acknowledgment requirements

**v1.2.0 (2026-01-11):**
- Added Section 3.7: Execution Bootstrap Protocol requirement
- Added 7-step execution verification to constitutional onboarding
- Added PREHANDOVER_PROOF requirement for executable artifacts
- Updated builder acknowledgment to include Execution Bootstrap Protocol (5 commitments)
- Added verification question for execution bootstrap compliance
- Updated mandatory template sections (added section 6: Execution Bootstrap Protocol)
- Authority: governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md v1.0.0

**Future Evolution**: This protocol may be enhanced based on appointment failure patterns (per Section 10.2 Learning Promotion). Enhancements are additive and non-regressive.

---

## 14. Closing Principle

**Principle**: **Appointment correctness determines execution correctness.**

If appointment is incomplete, execution governance is undermined regardless of builder competence.

If appointment is complete, execution governance is enforceable and builder mindset incompatibility is detectable.

**BL-0007 Position** (Canonical):
> "Appointment discipline is a security control. Incorrect appointment (or incorrect agent mindset) is a platform risk that can negate the entire governance model."

This protocol ensures appointment is NEVER incorrect.

---

**END OF FM_BUILDER_APPOINTMENT_PROTOCOL.md v1.2.0**
