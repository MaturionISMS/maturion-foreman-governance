# Builder Ecosystem Manifest

## Purpose

This manifest defines the builder ecosystem for the Maturion platform. It provides:
- Builder discovery and registration
- Builder capabilities and specializations
- Builder location and access information
- Builder governance and compliance status

## Builder Registry

### 1. Internal Foreman Builder

**Name**: Internal Foreman Builder  
**Type**: Repository-specific builder  
**Repository**: `maturion-foreman-app`  
**Agent Definition**: `.github/agents/builder.agent.md`  
**Status**: ✅ Active and Operational  
**Protocol Version**: Builder Protocol v1.0  
**Capabilities**:
- TypeScript/JavaScript development
- React/Next.js components
- Node.js backend services
- Test implementation (Jest, Vitest)
- Build tooling (npm, vite)

**Scope**:
- ONLY operates within `maturion-foreman-app` repository
- Implements Foreman's internal features
- Maintains Foreman's codebase

**Authority**: Subordinate to Foreman

---

### 2. Maturion Builder (Production ISMS/App)

**Name**: Maturion Builder  
**Type**: Production application builder  
**Repository**: External (to be deployed)  
**Agent Definition**: `.github/agents/maturion-builder.agent.md`  
**Status**: ⚠️ Defined but not yet operational  
**Protocol Version**: Builder Protocol v1.0  
**Capabilities**:
- Full-stack application development
- ISMS-specific components
- Multi-tenant architecture
- Security and compliance features
- Production-grade code

**Scope**:
- Operates in production ISMS repositories
- Implements business features
- Maintains production codebase

**Authority**: Subordinate to Foreman

**Note**: This builder will be operational after Wave 0 completion.

---

### 3. Human Builder (Manual Operation)

**Name**: Human Builder (Johan or designated operator)  
**Type**: Human-operated builder  
**Repository**: Any  
**Agent Definition**: `.github/agents/builder-agent.md` (Canonical contract)  
**Status**: ✅ Active and Operational  
**Protocol Version**: Builder Protocol v1.0  
**Capabilities**:
- Any technology stack
- Complex problem solving
- Architectural interpretation
- Manual validation and verification

**Scope**:
- Can operate in any repository
- Follows "Build to Green" protocol manually
- Uses canonical builder contract as guide

**Authority**: Subordinate to Foreman (in context of builds)

**Usage**: See Section XI "Human Operator Instructions" in canonical builder contract.

---

## Builder Protocol Compliance

All builders MUST comply with:

1. **Build Philosophy** (`/BUILD_PHILOSOPHY.md`)
   - Architecture → Red QA → Build to Green
   - 100% QA passing required
   - Zero test debt mandatory

2. **Canonical Builder Contract** (`.github/agents/builder-agent.md`)
   - "Build to Green" ONLY instruction format
   - Pre-build validation requirements
   - Final validation requirements
   - Evidence trail requirements

3. **Governance Supremacy Rule** (`/foreman/governance/governance-supremacy-rule.md`)
   - 100% QA passing is absolute
   - No partial passes accepted
   - Governance overrides all

4. **Build to Green Rule** (`/foreman/builder-specs/build-to-green-rule.md`)
   - Validation logic requirements
   - Error response formats
   - Iteration process

5. **Quality Integrity Contract** (`/foreman/qa/quality-integrity-contract.md`)
   - Quality anchor points
   - Build integrity
   - Lint integrity
   - Runtime integrity

## Builder Discovery

### For Foreman

To discover available builders:

1. Read this manifest
2. Check each builder's status
3. Select appropriate builder based on:
   - Repository match
   - Capability match
   - Status (active/operational)

### For Builders

To register as a builder:

1. Implement canonical builder contract
2. Pass builder compliance validation
3. Submit registration PR to this manifest
4. Await Foreman approval

## Builder Selection Rules

Foreman selects builders based on:

1. **Repository Match**
   - Internal Foreman Builder: `maturion-foreman-app` only
   - Maturion Builder: Production repositories only
   - Human Builder: Any repository

2. **Capability Match**
   - Task requires TypeScript → Internal or Maturion Builder
   - Task requires manual judgment → Human Builder
   - Task is complex → Human Builder

3. **Status**
   - Prefer operational builders
   - Fall back to human builder if automated builder unavailable

4. **Load**
   - Check builder availability
   - Distribute load if multiple builders capable

## Builder Communication Channels

### Internal Foreman Builder
- **Method**: Direct function calls within same process
- **Protocol**: TypeScript interfaces
- **Response Time**: Immediate

### Maturion Builder
- **Method**: API calls (when operational)
- **Protocol**: REST API with JSON payloads
- **Response Time**: TBD

### Human Builder
- **Method**: GitHub issue/PR comments + direct communication
- **Protocol**: Markdown-formatted instructions
- **Response Time**: Variable (manual operation)

## Repository Structure for Builders

Builders need access to these locations:

### Architecture Documents
```
foreman/architecture/
  ├── <feature-name>-architecture.md
  ├── <feature-name>-checklist-validation.md
  └── ...
```

### QA/Test Suites
```
tests/qa/<feature-name>/
  ├── <test-file-1>.test.ts
  ├── <test-file-2>.test.ts
  └── ...
```

### Evidence Output
```
foreman/evidence/builds/<task-id>/
  ├── build-initiation.json
  ├── validation-results.json
  ├── iterations/
  ├── final-validation.json
  └── completion-report.md
```

### Governance References
```
BUILD_PHILOSOPHY.md
.github/foreman/agent-contract.md
foreman/architecture-design-checklist.md
foreman/builder-specs/build-to-green-rule.md
foreman/governance/governance-supremacy-rule.md
foreman/qa/quality-integrity-contract.md
```

## Builder Compliance Validation

Before a builder can be marked as operational, it must pass:

### Validation Checklist

- [ ] Implements canonical builder contract
- [ ] Accepts ONLY "Build to Green" instructions
- [ ] Validates architecture exists
- [ ] Validates QA suite exists and is RED
- [ ] Validates acceptance criteria defined
- [ ] Refuses invalid instructions with proper error format
- [ ] Maintains evidence trail
- [ ] Reports completion correctly
- [ ] Reports escalations correctly
- [ ] Enforces Zero Test Debt
- [ ] Enforces 100% QA passing
- [ ] Protects constitutional files
- [ ] Follows OPOJD (One-Prompt One-Job Doctrine)
- [ ] Executes continuously without unnecessary pauses
- [ ] Escalates appropriately

### Validation Process

1. Submit builder implementation
2. Foreman reviews against canonical contract
3. Test with sample "Build to Green" instructions
4. Verify error handling
5. Verify evidence generation
6. Verify governance compliance
7. If all checks pass → Mark as operational
8. If any check fails → Return for corrections

## Builder Lifecycle

### 1. Registration
- Builder submitted for review
- Compliance validation performed
- Status: ⚠️ Pending validation

### 2. Validation
- Foreman tests builder
- Checks canonical contract compliance
- Status: ⚠️ Under validation

### 3. Operational
- All checks passed
- Approved for production use
- Status: ✅ Active and operational

### 4. Deprecated
- Builder being phased out
- Use discouraged but still functional
- Status: ⚠️ Deprecated

### 5. Retired
- Builder no longer operational
- Do not use
- Status: ❌ Retired

## Future Builders

### Potential Additions

The following builders may be added in the future:

1. **UI Builder** - Specialized for React/UI components
2. **API Builder** - Specialized for backend services
3. **Schema Builder** - Specialized for data models
4. **Integration Builder** - Specialized for external integrations
5. **Test Builder** - Specialized for test implementation

Each would follow the canonical builder contract with specialization in their domain.

## Governance Integration

### Builder Monitoring

Foreman monitors builders for:
- Compliance with canonical contract
- Quality of builds delivered
- Evidence trail completeness
- Escalation patterns
- Governance violations

### Builder Performance

Track for each builder:
- Total builds completed
- Success rate (QA green on first try)
- Average iterations per build
- Average time per build
- Escalation rate

### Builder Incidents

Log builder governance incidents:
- Accepted invalid instructions
- Delivered builds with test debt
- Delivered builds with partial QA passes
- Modified protected files
- Violated OPOJD

## Support and Troubleshooting

### For Builders

If you encounter issues:

1. Review canonical builder contract
2. Check troubleshooting guide (Section XI)
3. Verify instruction format
4. Check governance compliance
5. If still blocked → Escalate to Foreman

### For Foreman

If builder misbehaves:

1. Check builder compliance status
2. Review builder's recent builds
3. Check for pattern of violations
4. If recurring issue → Mark builder as non-compliant
5. Update builder or remove from operational status

## Version and Status

**Version**: 1.0.0  
**Status**: Active  
**Last Updated**: 2025-12-15  
**Maintained By**: Foreman

**Changelog**:
- 1.0.0 (2025-12-15): Initial builder ecosystem manifest

---

*END OF BUILDER ECOSYSTEM MANIFEST*
