# Wave 0 Deliverable: Builder Contract & Repository Alignment

**Status**: ✅ COMPLETE  
**Date**: 2025-12-15  
**Objective**: Enable compliant builder operation without automation dependency

---

## Executive Summary

Wave 0 is **COMPLETE**. The Maturion Foreman App repository now has:

1. ✅ **Canonical Builder Agent Contract** - Universal specification for all builders
2. ✅ **Repository Structure Alignment** - Clear navigation and organization
3. ✅ **Evidence Standards** - Templates and schemas for build documentation
4. ✅ **Human Operator Procedures** - Step-by-step manual build guide
5. ✅ **Builder Discovery System** - Registry and compliance validation

**Key Outcome**: A human (you, Johan) can now act as the builder using these instructions, and later the system can automate the same process without reinterpretation.

---

## What Was Created

### 1. Canonical Builder Agent Contract
**Location**: `.github/agents/builder-agent.md`

**Contents**:
- Identity and purpose
- Constitutional authority chain
- Build to Green protocol (ONLY valid instruction)
- Pre-build validation requirements (4 checks)
- Final validation requirements (6 checks)
- Governance enforcement (GSR, QIC, Zero Test Debt)
- Boundaries and constraints
- Protected paths (immutable files)
- Evidence requirements
- Build instructions template
- Communication protocol
- Escalation procedures
- Human operator instructions
- OPOJD compliance
- Quality standards
- Forbidden actions
- Success criteria

**Size**: ~28,000 characters  
**Sections**: 19 major sections

**Purpose**: This is the **definitive specification** for what a builder is, what it does, and what it must never do.

---

### 2. Builder Ecosystem Manifest
**Location**: `foreman/builders/MANIFEST.md`

**Contents**:
- Builder registry (Internal, Maturion, Human)
- Protocol compliance requirements
- Builder discovery rules
- Builder selection rules
- Communication channels
- Repository structure reference
- Compliance validation checklist
- Builder lifecycle management
- Performance tracking
- Incident logging

**Purpose**: Central registry of all builders and their capabilities.

---

### 3. Repository Structure Guide
**Location**: `foreman/builders/REPOSITORY_STRUCTURE.md`

**Contents**:
- Complete directory structure overview
- Constitutional and governance file locations
- Architecture document locations
- QA/test suite locations
- Source code organization patterns
- Evidence output locations
- Protected paths documentation
- Navigation patterns
- Path validation rules
- Troubleshooting

**Purpose**: Builders (human or automated) know exactly where everything is and how to navigate the repository.

---

### 4. Human Operator Guide
**Location**: `foreman/builders/HUMAN_OPERATOR_GUIDE.md`

**Contents**:
- Prerequisites checklist
- Step-by-step procedure (11 steps)
- Validation procedures
- Evidence creation instructions
- Iteration workflow
- Final validation checklist
- Commit and PR procedures
- Operational checklist (printable)
- Common issues and solutions
- Quick command reference

**Purpose**: You (or any authorized person) can follow this guide to manually execute a "Build to Green" task exactly as an automated builder would.

---

### 5. Evidence Templates
**Location**: `foreman/evidence/templates/`

**Files Created**:
- `build-initiation.schema.json` - JSON schema for build start
- `build-initiation.template.json` - Example template
- `validation-results.schema.json` - JSON schema for validation
- `validation-results.template.json` - Example template
- `iteration.schema.json` - JSON schema for iterations
- `iteration.template.json` - Example template
- `completion-report.template.md` - Markdown template for completion

**Purpose**: Standardized formats for documenting every aspect of a build, ensuring complete evidence trail.

---

## How the System Works

### The Flow

```
1. Foreman designs architecture
   ↓
2. Foreman creates Red QA (failing tests)
   ↓
3. Foreman issues "Build to Green" instruction
   ↓
4. Builder validates instruction (4 checks)
   ↓
5. If valid → Builder executes build iterations
   If invalid → Builder rejects with specific error
   ↓
6. Builder makes tests pass one by one
   ↓
7. Builder validates 100% green (6 checks)
   ↓
8. Builder creates evidence trail
   ↓
9. Builder reports completion to Foreman
   ↓
10. Foreman validates and approves merge
```

### The Builder Constraint: "Build to Green ONLY"

Builders **ONLY** accept instructions in this exact format:

```
BUILD TO GREEN

Architecture Reference: <path>
QA Suite Location: <path>
QA Current Status: RED (X tests failing)
Acceptance Criteria: <criteria>
```

**Any other format → REJECTED**

This enforces:
- Architecture must exist first
- QA must exist and be RED first
- No "build feature X" without proper foundation
- Build Philosophy is always followed

### The 4 Pre-Build Validations

Before accepting any task, builder validates:

1. ✅ **Instruction format** - Must be "Build to Green"
2. ✅ **Architecture exists** - Document is accessible and complete
3. ✅ **QA suite exists** - Tests are accessible and RED
4. ✅ **Acceptance criteria defined** - Clear completion criteria

**If ANY fails → Task REJECTED → Foreman must fix**

### The 6 Final Validations

Before reporting "QA is Green", builder validates:

1. ✅ **QA Completeness** - 100% passing, zero failures, zero debt
2. ✅ **Build Quality** - TypeScript, lint, build all pass
3. ✅ **Interface Integrity** - QIC-7 compliance
4. ✅ **Zero Test Debt** - No skips, stubs, or incomplete tests
5. ✅ **Protected Paths** - No constitutional files modified
6. ✅ **Evidence Trail** - Complete documentation

**If ANY fails → Continue iteration, do NOT report green**

---

## Governance Enforcement

### Governance Supremacy Rule (GSR)

Builders enforce GSR absolutely:

- **100% QA passing** - No partial passes (301/303 = FAILURE)
- **Zero test debt** - No "will fix later"
- **Architecture conformance** - Follow exactly, no deviations
- **Constitutional protection** - Never modify protected files

### Zero Test Debt Rule

Test debt triggers immediate action:

```
TEST DEBT DETECTED → STOP → FIX → RE-RUN → VERIFY → CONTINUE
```

**Forms of test debt:**
- Failing tests
- Skipped tests (.skip(), .todo())
- Incomplete tests (stubs, no assertions)
- Incomplete test infrastructure
- Hidden test debt

**No exceptions. No deferrals.**

### Quality Integrity Contract (QIC)

Builders maintain:
- Build integrity (zero hidden failures)
- Lint integrity (zero errors, zero warnings)
- Runtime integrity (no blocked routes)
- Type integrity (full TypeScript compliance)
- Test integrity (100% passing, zero debt)

---

## Protected Paths (Immutable)

These paths can **NEVER** be modified by builders:

```
.github/workflows/
.github/foreman/agent-contract.md
.github/agents/foreman.agent.md
BUILD_PHILOSOPHY.md
foreman/constitution/
foreman/architecture-design-checklist.md
foreman/builder-specs/build-to-green-rule.md
foreman/governance/
docs/governance/
maturion/philosophy-tree.md
```

**Modification attempt → HALT + ESCALATE + CS2 approval required**

---

## Evidence Requirements

Every build generates complete evidence trail:

```
foreman/evidence/builds/<task-id>/
├── build-initiation.json       # Task start evidence
├── validation-results.json     # Pre-build validation
├── iterations/
│   ├── iteration-001.json      # First iteration
│   ├── iteration-002.json      # Second iteration
│   └── ...
├── final-validation.json       # Final checks
├── qa-results.json             # Complete QA results
└── completion-report.md        # Human-readable report
```

**Purpose**: Proves that Build Philosophy was followed, process was correct, and quality was achieved.

---

## How to Use This (For Johan)

### Option 1: Manual Operation (Now)

1. **Read the Human Operator Guide**
   - Location: `foreman/builders/HUMAN_OPERATOR_GUIDE.md`
   - Follow step-by-step

2. **When you need to build something:**
   - Wait for Foreman to issue "Build to Green"
   - Validate the instruction
   - Follow the 11-step procedure
   - Create evidence as you go
   - Report completion

3. **Benefits:**
   - You control the process
   - You verify the instructions work
   - You validate the evidence format
   - You confirm governance is enforced

### Option 2: Automated Operation (Future)

Once manual process is validated:

1. **Implement automated builder**
   - Use canonical builder contract as spec
   - Follow exact same process
   - Generate same evidence format
   - Report same completion format

2. **Benefits:**
   - Faster execution
   - No human intervention needed
   - Same quality guarantees
   - Same governance enforcement

**The contract is the same. Only execution is automated.**

---

## Testing the System

### Recommended Test Procedure

1. **Select a simple build task**
   - Small feature
   - Few components
   - Clear requirements

2. **Have Foreman create:**
   - Architecture document
   - Red QA tests
   - "Build to Green" instruction

3. **You (Johan) act as builder:**
   - Follow human operator guide
   - Execute all steps
   - Create all evidence
   - Report completion

4. **Validate:**
   - Did instruction format work?
   - Was validation clear?
   - Was architecture sufficient?
   - Were tests good?
   - Was evidence useful?
   - Did governance work?

5. **Adjust if needed:**
   - Update guides
   - Clarify procedures
   - Fix any gaps

**Once this works manually, automation becomes straightforward.**

---

## Key Design Decisions

### 1. "Build to Green ONLY"

**Decision**: Builders refuse all instructions except "Build to Green"

**Rationale**:
- Forces architecture first
- Forces QA creation first
- Prevents random code generation
- Enforces Build Philosophy

**Impact**: Foreman MUST do its job (architect + QA) before builder can work.

### 2. Pre-Build Validation

**Decision**: 4 mandatory checks before accepting task

**Rationale**:
- Catch problems early
- Prevent wasted effort
- Enforce completeness
- Clear error messages

**Impact**: Invalid instructions are rejected immediately with specific reason.

### 3. Final Validation

**Decision**: 6 mandatory checks before reporting green

**Rationale**:
- Ensure true 100% green
- Catch interface issues
- Verify zero test debt
- Confirm quality

**Impact**: "Green" means truly green, not "mostly working".

### 4. Complete Evidence Trail

**Decision**: Document every iteration and validation

**Rationale**:
- Proves process was followed
- Enables learning
- Supports governance
- Due process verification

**Impact**: Every build is auditable and traceable.

### 5. Human-First Design

**Decision**: Human operator procedures first, automation second

**Rationale**:
- Validates instructions work
- Proves process is sound
- Allows iteration before automation
- Human confirms governance

**Impact**: You can use this TODAY, automation can come later.

---

## Success Metrics

### How to Know This Works

**Manual Operation Success:**
- [ ] Human can follow guide without confusion
- [ ] Instruction format is clear
- [ ] Validation catches real issues
- [ ] Evidence is useful
- [ ] Completion is obvious
- [ ] Quality is guaranteed

**Automated Operation Success:**
- [ ] Builder accepts valid instructions
- [ ] Builder rejects invalid instructions
- [ ] Builder enforces governance
- [ ] Builder creates complete evidence
- [ ] Builder delivers 100% green
- [ ] Builder never bypasses rules

**Governance Success:**
- [ ] Zero partial passes accepted
- [ ] Zero test debt created
- [ ] Zero constitutional violations
- [ ] 100% evidence completeness
- [ ] Zero quality escapes

---

## Next Steps

### Immediate (This Week)

1. **Review documents**
   - Read canonical builder contract
   - Read human operator guide
   - Understand the flow

2. **Select test case**
   - Pick a simple feature
   - Define in 1-2 hours of work
   - Clear acceptance criteria

3. **Test manual operation**
   - Follow guide exactly
   - Note any issues
   - Validate evidence format
   - Confirm governance works

### Near-Term (Next Sprint)

1. **Refine based on feedback**
   - Update guides if needed
   - Clarify procedures
   - Fix any gaps

2. **Document patterns**
   - What works well
   - What's challenging
   - Best practices

3. **Prepare for automation**
   - Identify automation points
   - Design builder implementation
   - Plan deployment

### Long-Term (Future Sprints)

1. **Implement automated builder**
   - Follow canonical contract
   - Same process, automated
   - Same evidence format

2. **Validate automation**
   - Run parallel (human + automated)
   - Compare results
   - Verify governance

3. **Full autonomy**
   - Automated builder operational
   - Foreman orchestrates end-to-end
   - Quality guaranteed

---

## Questions and Answers

### Q: Can I modify the builder contract?

**A**: Yes, via governance process:
1. Identify need for change
2. Document rationale
3. Update contract
4. Update builders
5. Validate changes

**Note**: Contract is versioned. Changes are tracked.

### Q: What if architecture is insufficient?

**A**: Builder escalates:
1. Attempts implementation
2. Discovers gap
3. Documents issue
4. Reports to Foreman
5. Waits for updated architecture

**Builder does NOT guess or interpret.**

### Q: What if tests are wrong?

**A**: Builder escalates:
1. Identifies test issue
2. Documents the problem
3. Reports to Foreman
4. Waits for corrected tests

**Builder does NOT modify tests without approval.**

### Q: Can builder add features not in architecture?

**A**: Absolutely not. Builder:
- Only builds what architecture defines
- Only builds what QA tests
- Nothing more, nothing less

**"Feature not in QA = Don't build it"**

### Q: What if 100% green is taking too long?

**A**: After 3+ iterations with no progress:
1. Builder STOPS
2. Documents attempts
3. Analyzes issue
4. Escalates to Foreman
5. Suggests remediation

**Builder does NOT continue indefinitely.**

---

## Technical Notes

### File Formats

**Evidence files**: JSON (machine-readable) + Markdown (human-readable)

**Schemas**: JSON Schema Draft 07 for validation

**Templates**: Filled-in examples showing correct format

### Validation

All evidence should validate against schemas:

```bash
# Validate build initiation
npx ajv validate -s foreman/evidence/templates/build-initiation.schema.json \
  -d foreman/evidence/builds/task-001/build-initiation.json
```

### Storage

Evidence is:
- Stored in repository
- Committed with code changes
- Part of PR
- Available for audit

**Do NOT store in external systems.**

---

## Conclusion

**Wave 0 is COMPLETE.** ✅

The Maturion Foreman App now has:
- ✅ Canonical builder contract
- ✅ Repository structure aligned
- ✅ Evidence standards defined
- ✅ Human operator procedures complete
- ✅ Governance enforcement documented

**You can now:**
1. Act as the builder yourself (manual)
2. Validate the process works
3. Refine based on experience
4. Prepare for automation

**The builder contract is ready for use.**

**Next:** Test the system with a simple build task, validate it works as designed, then proceed to automation when ready.

---

**Prepared By**: Foreman  
**Date**: 2025-12-15  
**Version**: 1.0.0  
**Status**: DELIVERED

---

*This completes Wave 0: Builder Contract & Repository Alignment.*

---

*END OF SUMMARY*
