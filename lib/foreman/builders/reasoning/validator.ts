/**
 * Reasoning Validator - ES5 Compatible
 */

import { ReasoningChain, ReasoningStep } from './framework'

function contains(str: string, substring: string): boolean {
  return str.indexOf(substring) >= 0
}

export interface ChainValidationResult {
  valid: boolean
  complete: boolean
  coherent: boolean
  traceable: boolean
  errors: string[]
}

export interface Fallacy {
  type: string
  step: string
  description: string
}

export interface TraceabilityResult {
  traceable: boolean
  brokenLinks: string[]
}

export class ReasoningValidator {
  validateChain(chain: ReasoningChain): ChainValidationResult {
    const errors: string[] = []

    let hasAnalysis = false
    let hasDecisionOrAction = false

    for (let i = 0; i < chain.steps.length; i++) {
      if (chain.steps[i].type === 'analysis') hasAnalysis = true
      if (chain.steps[i].type === 'decision' || chain.steps[i].type === 'action') hasDecisionOrAction = true
    }

    if (!hasAnalysis) {
      errors.push('Missing analysis step')
    }

    if (!hasDecisionOrAction && chain.steps.length < 2) {
      errors.push('Chain appears incomplete - needs decision or action step')
    }

    const hasDisconnectedSteps = this.checkCoherence(chain.steps)
    if (hasDisconnectedSteps) {
      errors.push('Chain has disconnected or illogical steps')
    }

    const traceability = this.verifyTraceability(chain)
    if (!traceability.traceable) {
      for (let i = 0; i < traceability.brokenLinks.length; i++) {
        errors.push(traceability.brokenLinks[i])
      }
    }

    return {
      valid: errors.length === 0,
      complete: hasAnalysis && hasDecisionOrAction,
      coherent: !hasDisconnectedSteps,
      traceable: traceability.traceable,
      errors
    }
  }

  detectLogicalFallacies(chain: ReasoningChain): Fallacy[] {
    const fallacies: Fallacy[] = []

    for (let i = 0; i < chain.steps.length; i++) {
      const step = chain.steps[i]
      const reasoning = step.reasoning.toLowerCase()

      if (contains(reasoning, 'everyone does') || contains(reasoning, 'everyone else')) {
        fallacies.push({
          type: 'appeal_to_popularity',
          step: step.id,
          description: 'Reasoning based on popularity rather than merit'
        })
      }
    }

    return fallacies
  }

  verifyTraceability(chain: ReasoningChain): TraceabilityResult {
    const brokenLinks: string[] = []

    for (let i = 1; i < chain.steps.length; i++) {
      const prevStep = chain.steps[i - 1]
      const currStep = chain.steps[i]

      const isConnected = this.stepsAreConnected(prevStep, currStep)

      if (!isConnected) {
        brokenLinks.push('Step ' + i + ' (' + currStep.id + ') does not trace from step ' + (i - 1) + ' (' + prevStep.id + ')')
      }
    }

    return {
      traceable: brokenLinks.length === 0,
      brokenLinks
    }
  }

  private checkCoherence(steps: ReasoningStep[]): boolean {
    for (let i = 0; i < steps.length; i++) {
      const lower = steps[i].reasoning.toLowerCase()
      if (contains(lower, 'just do') || contains(lower, 'just implement')) {
        return true
      }
    }
    return false
  }

  private stepsAreConnected(prev: ReasoningStep, curr: ReasoningStep): boolean {
    const prevOutputStr = JSON.stringify(prev.output).toLowerCase()
    const currReasoningStr = curr.reasoning.toLowerCase()

    if (contains(prevOutputStr, 'analyzed') && contains(currReasoningStr, 'based on')) {
      return true
    }

    return this.hasOverlappingTerms(prevOutputStr, currReasoningStr)
  }

  private hasOverlappingTerms(str1: string, str2: string): boolean {
    const terms1 = str1.split(/\W+/).filter(function(t) { return t.length > 4 })
    const terms2 = str2.split(/\W+/).filter(function(t) { return t.length > 4 })

    for (let i = 0; i < terms2.length; i++) {
      if (terms1.indexOf(terms2[i]) >= 0) {
        return true
      }
    }

    return false
  }
}
