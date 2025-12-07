# Governance Supremacy Rule (GSR)

## True North → Governance Model → Universal Enforcement

This document defines the **Governance Supremacy Rule (GSR)** — an architectural doctrine that ensures governance rules apply universally, including to the governance system itself.

## Philosophy

**"No system is exempt from the rules it imposes."**

This rule ensures that:
- Governance enforcement applies recursively to all components
- The Foreman system validates itself using the same rules it imposes on others
- No loopholes, exceptions, or grandfather clauses exist
- Quality standards are demonstrated by example

## The Problem GSR Solves

### Anti-Pattern: Self-Exemption

Without GSR, systems often exempt themselves from their own rules:

❌ **Bad**: "Our QA tool doesn't need QA because it's the QA tool" (circular dependency excuse)  
❌ **Bad**: "We can skip validation on governance code because it validates other code"  
❌ **Bad**: "Testing the test framework is too complex, so we don't do it"  

This creates:
- Hidden quality debt in critical systems
- False confidence in governance effectiveness
- Loopholes that undermine the entire governance model
- A culture of "rules for thee, but not for me"

### Solution: Universal Recursive Enforcement

✅ **Good**: Foreman runs QIEL on itself  
✅ **Good**: Test frameworks have their own comprehensive test suites  
✅ **Good**: QA systems undergo the same QA they enforce on others  
✅ **Good**: Governance code is governed by governance rules  

## GSR Principles

### 1. Recursive Application

**Rule**: Governance enforcement MUST apply to all components that enforce governance.

**Examples**:
- QIEL (Quality Integrity Enforcement Layer) runs on the Foreman repository
- QIW (Quality Integrity Watchdog) monitors its own logs
- CDW (Conflict Detection Watchdog) detects conflicts in watchdog configuration
- Memory systems validate their own memory integrity

### 2. No Circular Dependency Excuses

**Rule**: Claims of "circular dependency" MUST be validated before being accepted as grounds for exemption.

**Valid Circular Dependencies**:
- A compiler compiling itself requires bootstrapping
- A build tool building itself may need a binary seed

**Invalid Circular Dependency Claims**:
- ❌ "QA tool testing itself" - NOT circular, this is validation
- ❌ "Governance enforcing governance" - NOT circular, this is consistency
- ❌ "Quality checker checking quality" - NOT circular, this is self-validation

**Distinction**: 
- **Circular dependency** = A requires B, B requires A (deadlock)
- **Recursive validation** = A validates A using A's own rules (consistency check)

### 3. Same Standards for All

**Rule**: The Foreman system MUST meet the same quality standards it enforces on projects.

**Implementation**:
- Same QIEL checks run on Foreman PRs
- Same zero-warning policy applies
- Same QIC (Quality Integrity Contract) exit criteria
- Same governance memory tracking
- Same incident reporting

### 4. Demonstrated Excellence

**Rule**: Foreman demonstrates quality by example, not by exception.

**Rationale**:
- If Foreman can't pass its own quality checks, why should others trust them?
- If QIEL is too strict for Foreman, it's too strict for everyone
- If governance creates overhead for Foreman, it creates overhead everywhere

**Outcome**: By validating itself, Foreman proves that its standards are:
- Achievable
- Valuable
- Non-burdensome
- Effective

## GSR Implementation

### In Code

**GitHub Actions Workflow** (`.github/workflows/qiel.yml`):

```yaml
name: QIEL - Quality Integrity Enforcement

on:
  pull_request:
    branches: [ main, develop ]

permissions:
  contents: read
  issues: write
  pull-requests: write

jobs:
  qiel-enforcement:
    name: Quality Integrity Enforcement Layer
    runs-on: ubuntu-latest
    steps:
      - name: Run QIEL
        run: npm run qiel:quick
```

**Key Points**:
- Runs on ALL PRs (no exceptions)
- Has necessary permissions to create incidents
- Uses same QIEL runner as downstream projects

### In Documentation

All governance documents reference GSR:
- Quality Integrity Contract → cites GSR
- Deployment Governance → enforces GSR
- Memory Rules → applies GSR to memory validation
- Error Recovery → GSR applies to error handling

### In Watchdogs

**CDW (Conflict Detection Watchdog)** specifically watches for GSR violations:

```typescript
// CDW checks for self-exemption attempts
if (component.isGovernanceComponent && component.skipsValidation) {
  reportGSRViolation({
    component: component.name,
    violation: 'self_exemption',
    severity: 'critical',
    message: 'Governance component attempting to skip validation'
  });
}
```

## GSR Exit Criteria

### For Foreman Repository

A PR to Foreman can only merge when:

✅ QIEL runs successfully (not skipped, not exempted)  
✅ All quality checks pass (same as required for downstream projects)  
✅ Zero errors or warnings in build/lint/test logs  
✅ QIC exit criteria met  
✅ No GSR violations detected by CDW  
✅ Governance memory logs any incidents  

### For Governance Changes

Changes to governance rules MUST:

✅ Apply the new rule to Foreman immediately  
✅ Validate that Foreman can meet the new standard  
✅ Update all affected systems simultaneously  
✅ Demonstrate the rule works by passing it  

**No grace periods** - if a new rule is too strict for Foreman, it's too strict for everyone.

## GSR Violations

### Detection

CDW monitors for:

1. **Self-Exemption Attempts**
   - Governance code skipping validation
   - Workflows with `if: repository != 'foreman'` conditions
   - Special cases for governance components

2. **Invalid Circular Dependency Claims**
   - Claims without technical justification
   - Exemptions based on "it's too hard"
   - Recursive validation labeled as circular

3. **Permission Gaps**
   - Workflows lacking necessary permissions
   - Validation disabled due to permission issues
   - Workarounds to avoid validation

### Response

When GSR violation is detected:

1. **Immediate Block**: PR cannot merge
2. **Incident Creation**: QI incident created in governance memory
3. **Escalation**: Architecture review required
4. **Fix Required**: Either fix the violation or update the rule

## GSR Benefits

### For Foreman

- **Trust**: Users trust a system that validates itself
- **Quality**: Forces Foreman to maintain high standards
- **Dogfooding**: Catches issues early by using own tools
- **Evolution**: Rules improve when applied to rulemakers

### For Downstream Projects

- **Confidence**: If Foreman passes, the standards are achievable
- **Fairness**: Everyone follows the same rules
- **Support**: Issues in QIEL/QIW get fixed because Foreman uses them
- **Alignment**: Governance stays practical, not theoretical

### For Architecture

- **Consistency**: No special cases or exceptions
- **Simplicity**: One set of rules, universally applied
- **Reliability**: Governance system is itself governed
- **Evolution**: Self-validation drives continuous improvement

## GSR Integration with Other Doctrines

### One Build

GSR ensures "One Build" includes governance:
- Foreman uses same build process it recommends
- No separate "governance build" with different rules

### True North

GSR is part of True North:
- Universal standards (not conditional)
- Quality applies everywhere (including governance)
- No compromises on core principles

### Zero Legacy

GSR prevents legacy exemptions:
- Old governance code gets same validation
- No "but this was written before QIEL" excuses
- Retroactive application of new rules

### QA Must Be 100% Green

GSR enforces this on Foreman itself:
- Foreman's QA must be 100% green
- No yellow builds for governance code
- Sets the example for downstream projects

## Conclusion

The Governance Supremacy Rule ensures that:

1. **Foreman validates itself** using the same tools it provides
2. **No circular dependency excuses** are accepted without validation
3. **Quality standards are universal**, including for governance code
4. **Excellence is demonstrated**, not just mandated

**This is not a burden - it's a feature.** By subjecting itself to the same governance it enforces, Foreman proves that its standards are both achievable and valuable.

---

*GSR: Because the best governance governs itself.*
