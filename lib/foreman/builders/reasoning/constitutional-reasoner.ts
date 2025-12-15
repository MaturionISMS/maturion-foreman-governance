/**
 * Constitutional Reasoner - ES5 Compatible
 */

import { ReasoningChain } from './framework'

function contains(str: string, substring: string): boolean {
  return str.indexOf(substring) >= 0
}

export interface ValidationResult {
  valid: boolean
  violations: string[]
  warnings: string[]
}

export interface ConstitutionalValidationResult {
  buildPhilosophyCompliant: boolean
  gsrCompliant: boolean
  zeroTestDebtCompliant: boolean
  opodjCompliant: boolean
  overallCompliant: boolean
  violations: string[]
}

export class ConstitutionalReasoner {
  validateBuildPhilosophy(chain: ReasoningChain): ValidationResult {
    const violations: string[] = []
    const warnings: string[] = []

    for (let i = 0; i < chain.steps.length; i++) {
      const step = chain.steps[i]
      const lower = step.reasoning.toLowerCase()

      if (contains(lower, 'code first') || contains(lower, 'tests later')) {
        violations.push('Build Philosophy violation: Architecture and tests must come before implementation')
      }

      if (contains(lower, 'will add tests later')) {
        violations.push('Build Philosophy violation: Tests must be created before implementation (Red QA)')
      }
    }

    return { valid: violations.length === 0, violations, warnings }
  }

  validateGovernanceSupremacy(chain: ReasoningChain): ValidationResult {
    const violations: string[] = []
    const warnings: string[] = []

    for (let i = 0; i < chain.steps.length; i++) {
      const step = chain.steps[i]
      const lower = step.reasoning.toLowerCase()

      if ((contains(lower, 'skip') || contains(lower, 'bypass')) && !step.governanceCheck.compliant) {
        violations.push('GSR violation: Cannot bypass governance for speed or convenience')
      }

      if (contains(lower, 'user needs') && contains(lower, 'failing')) {
        violations.push('GSR violation: User urgency cannot override failing tests')
      }
    }

    return { valid: violations.length === 0, violations, warnings }
  }

  validateZeroTestDebt(chain: ReasoningChain): ValidationResult {
    const violations: string[] = []
    const warnings: string[] = []

    for (let i = 0; i < chain.steps.length; i++) {
      const step = chain.steps[i]
      const lower = step.reasoning.toLowerCase()

      if (contains(lower, '.skip()') || contains(lower, 'skip test') || contains(lower, 'disable test')) {
        violations.push('Zero Test Debt violation: Cannot skip or disable tests')
      }

      if (contains(lower, 'will fix later') || contains(lower, 'todo') || contains(lower, 'temporary')) {
        violations.push('Zero Test Debt violation: No temporary test skips or TODOs allowed')
      }

      if (contains(lower, 'stub') && contains(lower, 'test')) {
        violations.push('Zero Test Debt violation: Test stubs are not complete tests')
      }
    }

    for (let i = 0; i < chain.violations.length; i++) {
      const v = chain.violations[i].toLowerCase()
      if (contains(v, 'test debt') || contains(v, 'zero_test_debt')) {
        violations.push(chain.violations[i])
      }
    }

    return { valid: violations.length === 0, violations, warnings }
  }

  validateOPOJD(chain: ReasoningChain): ValidationResult {
    const violations: string[] = []
    const warnings: string[] = []

    for (let i = 0; i < chain.steps.length; i++) {
      const step = chain.steps[i]
      const lower = step.reasoning.toLowerCase()

      if (contains(lower, 'partial') || contains(lower, 'incomplete')) {
        warnings.push('OPOJD consideration: Task should be completed fully in one execution')
      }

      if (contains(lower, 'will finish') || contains(lower, 'continue later')) {
        violations.push('OPOJD violation: One-Prompt One-Job requires full completion')
      }
    }

    return { valid: violations.length === 0, violations, warnings }
  }

  validateConstitutional(chain: ReasoningChain): ConstitutionalValidationResult {
    const buildPhilosophy = this.validateBuildPhilosophy(chain)
    const gsr = this.validateGovernanceSupremacy(chain)
    const zeroTestDebt = this.validateZeroTestDebt(chain)
    const opojd = this.validateOPOJD(chain)

    const allViolations: string[] = []
    allViolations.push(...buildPhilosophy.violations)
    allViolations.push(...gsr.violations)
    allViolations.push(...zeroTestDebt.violations)
    allViolations.push(...opojd.violations)

    return {
      buildPhilosophyCompliant: buildPhilosophy.valid,
      gsrCompliant: gsr.valid,
      zeroTestDebtCompliant: zeroTestDebt.valid,
      opodjCompliant: opojd.valid,
      overallCompliant: allViolations.length === 0,
      violations: allViolations
    }
  }
}
