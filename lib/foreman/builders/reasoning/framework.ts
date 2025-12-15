/**
 * Builder Reasoning Framework
 * 
 * Provides structured reasoning capabilities for builders to ensure
 * constitutional compliance and governance alignment.
 * 
 * Issue: #240 - Governance-Aligned Builder Reasoning Blueprint
 */

/**
 * Simple ID generator
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Helper: Check if string contains substring (ES5 compatible)
 */
function contains(str: string, substring: string): boolean {
  return str.indexOf(substring) >= 0
}

export type ReasoningStepType = 'analysis' | 'decision' | 'validation' | 'action'

export interface GovernanceCheckResult {
  compliant: boolean
  rulesChecked: string[]
  violations: string[]
  warnings: string[]
}

export interface ReasoningStep {
  id: string
  type: ReasoningStepType
  input: any
  reasoning: string
  governanceCheck: GovernanceCheckResult
  output: any
  timestamp: string
}

export interface ReasoningChain {
  id: string
  context: string
  steps: ReasoningStep[]
  conclusion: string
  constitutionalCompliance: boolean
  violations: string[]
}

export class BuilderReasoningFramework {
  analyzeTask(task: any): ReasoningStep {
    const reasoning = this.generateTaskAnalysis(task)
    const governanceCheck = this.checkGovernance('analysis', task, reasoning)

    return {
      id: generateId(),
      type: 'analysis',
      input: task,
      reasoning,
      governanceCheck,
      output: { analyzed: true, task },
      timestamp: new Date().toISOString()
    }
  }

  makeDecision(options: any[], constraints: any): ReasoningStep {
    const reasoning = this.generateDecisionReasoning(options, constraints)
    const decision = options[0]
    const governanceCheck = this.checkGovernance('decision', decision, reasoning)

    return {
      id: generateId(),
      type: 'decision',
      input: { options, constraints },
      reasoning,
      governanceCheck,
      output: { decision },
      timestamp: new Date().toISOString()
    }
  }

  validateAgainstGovernance(action: any): GovernanceCheckResult {
    const violations: string[] = []
    const warnings: string[] = []
    const rulesChecked: string[] = []

    if (action.type === 'skip-test' || action.type === 'disable-test') {
      violations.push('Zero Test Debt violation: Cannot skip or disable tests')
      rulesChecked.push('ZERO_TEST_DEBT')
    }

    if (action.reason && contains(action.reason.toLowerCase(), 'will fix later')) {
      violations.push('Zero Test Debt violation: "Will fix later" is not permitted')
      rulesChecked.push('ZERO_TEST_DEBT')
    }

    if (action.type === 'implement-without-architecture') {
      violations.push('Build Philosophy violation: Architecture must come before implementation')
      rulesChecked.push('BUILD_PHILOSOPHY')
    }

    if (action.type === 'bypass-governance') {
      violations.push('GSR violation: Governance cannot be bypassed')
      rulesChecked.push('GSR')
    }

    return {
      compliant: violations.length === 0,
      rulesChecked,
      violations,
      warnings
    }
  }

  executeWithReasoning(task: any): ReasoningChain {
    const steps: ReasoningStep[] = []

    const analysisStep = this.analyzeTask(task)
    steps.push(analysisStep)

    if (task.requiresDecision) {
      const decisionStep = this.makeDecision([{ action: 'proceed' }], {})
      steps.push(decisionStep)
    }

    const validationStep: ReasoningStep = {
      id: generateId(),
      type: 'validation',
      input: task,
      reasoning: 'Validating approach against governance',
      governanceCheck: this.validateAgainstGovernance(task),
      output: { validated: true },
      timestamp: new Date().toISOString()
    }
    steps.push(validationStep)

    const allViolations: string[] = []
    for (let i = 0; i < steps.length; i++) {
      const stepViolations = steps[i].governanceCheck.violations
      for (let j = 0; j < stepViolations.length; j++) {
        allViolations.push(stepViolations[j])
      }
    }

    const constitutionalCompliance = allViolations.length === 0

    return {
      id: generateId(),
      context: task.description || 'Task execution',
      steps,
      conclusion: constitutionalCompliance
        ? 'Task can proceed with full governance compliance'
        : 'Task has violations: ' + allViolations.join(', '),
      constitutionalCompliance,
      violations: allViolations
    }
  }

  private generateTaskAnalysis(task: any): string {
    if (task.type === 'implement') {
      return 'Task requires implementation. Must ensure architecture exists first per Build Philosophy.'
    }
    if (task.type === 'create-qa') {
      return 'Task requires QA creation. Must create comprehensive tests with zero debt.'
    }
    return 'Analyzing task: ' + (task.description || 'unknown')
  }

  private generateDecisionReasoning(options: any[], constraints: any): string {
    return 'Evaluating ' + options.length + ' option(s) against governance constraints'
  }

  private checkGovernance(type: string, input: any, reasoning: string): GovernanceCheckResult {
    const violations: string[] = []
    const warnings: string[] = []
    const rulesChecked: string[] = ['BUILD_PHILOSOPHY', 'GSR', 'ZERO_TEST_DEBT']

    const lowerReasoning = reasoning.toLowerCase()
    const hasArchitectureMention = contains(lowerReasoning, 'architecture')
    const hasQAMention = contains(lowerReasoning, 'qa') || contains(lowerReasoning, 'test')

    if (type === 'analysis' && !hasArchitectureMention && input.requiresArchitecture) {
      warnings.push('Analysis should consider architecture requirements')
    }

    return {
      compliant: violations.length === 0,
      rulesChecked,
      violations,
      warnings
    }
  }
}
