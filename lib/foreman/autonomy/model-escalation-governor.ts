/**
 * CS8.2 - Model Escalation Governor
 * 
 * Rules for when Foreman can escalate AI models:
 * - Architecture analysis → escalate
 * - Large doc ingestion → escalate
 * - Governance reasoning → escalate
 * - Mutation execution → allowed only on validated models
 * - Hard blocked → hallucination-prone models
 */

import { logAutonomousAction } from './pilot-log'

/**
 * Available AI models
 */
export type AIModel = 
  | 'gpt-3.5-turbo'
  | 'gpt-4'
  | 'gpt-4.1'
  | 'gpt-4.1-turbo'
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-5.1'
  | 'gpt-5.1-large'

/**
 * Model tier classification
 */
export enum ModelTier {
  BASIC = 'basic',           // gpt-3.5-turbo, gpt-4o-mini
  STANDARD = 'standard',     // gpt-4, gpt-4.1
  ADVANCED = 'advanced',     // gpt-4.1-turbo, gpt-4o
  PREMIUM = 'premium',       // gpt-5.1
  ULTIMATE = 'ultimate'      // gpt-5.1-large
}

/**
 * Task complexity classification
 */
export enum TaskComplexity {
  SIMPLE = 'simple',               // < 1k tokens, straightforward logic
  MODERATE = 'moderate',           // 1k-8k tokens, moderate reasoning
  COMPLEX = 'complex',             // 8k-60k tokens, complex reasoning
  VERY_COMPLEX = 'very_complex',   // 60k+ tokens, multi-step analysis
  ARCHITECTURAL = 'architectural'  // Architecture synthesis, constitutional analysis
}

/**
 * Task type classification
 */
export enum TaskType {
  ANALYSIS = 'analysis',
  ARCHITECTURE = 'architecture',
  CODE_GENERATION = 'code_generation',
  GOVERNANCE_REASONING = 'governance_reasoning',
  DOCUMENT_INGESTION = 'document_ingestion',
  MUTATION = 'mutation',
  ORCHESTRATION = 'orchestration',
  CONSTITUTIONAL_ANALYSIS = 'constitutional_analysis'
}

/**
 * Model escalation decision
 */
export interface EscalationDecision {
  currentModel: AIModel
  recommendedModel: AIModel
  shouldEscalate: boolean
  reason: string
  blocked: boolean
  blockReason?: string
}

/**
 * Task characteristics for escalation decision
 */
export interface TaskCharacteristics {
  type: TaskType
  complexity: TaskComplexity
  tokenCount: number
  requiresArchitecture: boolean
  requiresGovernance: boolean
  isMutation: boolean
  description: string
}

/**
 * Model Escalation Governor
 */
export class ModelEscalationGovernor {
  private modelTiers: Map<AIModel, ModelTier> = new Map([
    ['gpt-3.5-turbo', ModelTier.BASIC],
    ['gpt-4o-mini', ModelTier.BASIC],
    ['gpt-4', ModelTier.STANDARD],
    ['gpt-4.1', ModelTier.STANDARD],
    ['gpt-4.1-turbo', ModelTier.ADVANCED],
    ['gpt-4o', ModelTier.ADVANCED],
    ['gpt-5.1', ModelTier.PREMIUM],
    ['gpt-5.1-large', ModelTier.ULTIMATE]
  ])
  
  private hallucinationProneModels: AIModel[] = [
    'gpt-3.5-turbo' // Known to be more prone to hallucination
  ]
  
  /**
   * Evaluate if model escalation is needed
   */
  evaluate(
    currentModel: AIModel,
    task: TaskCharacteristics
  ): EscalationDecision {
    // Check if current model is blocked for mutations
    if (task.isMutation && this.hallucinationProneModels.includes(currentModel)) {
      const decision: EscalationDecision = {
        currentModel,
        recommendedModel: 'gpt-4.1',
        shouldEscalate: true,
        reason: 'Hallucination-prone model blocked for mutations',
        blocked: true,
        blockReason: 'Model not validated for mutation operations'
      }
      
      this.logEscalation(task, decision)
      return decision
    }
    
    // Check token count escalation rules
    if (task.tokenCount > 60000) {
      const recommended = this.getModelForComplexity(TaskComplexity.VERY_COMPLEX)
      if (this.shouldEscalate(currentModel, recommended)) {
        const decision: EscalationDecision = {
          currentModel,
          recommendedModel: recommended,
          shouldEscalate: true,
          reason: `Token count exceeds 60k (${task.tokenCount} tokens)`,
          blocked: false
        }
        
        this.logEscalation(task, decision)
        return decision
      }
    } else if (task.tokenCount > 8000) {
      const recommended = this.getModelForComplexity(TaskComplexity.COMPLEX)
      if (this.shouldEscalate(currentModel, recommended)) {
        const decision: EscalationDecision = {
          currentModel,
          recommendedModel: recommended,
          shouldEscalate: true,
          reason: `Token count exceeds 8k (${task.tokenCount} tokens)`,
          blocked: false
        }
        
        this.logEscalation(task, decision)
        return decision
      }
    }
    
    // Check task type escalation rules
    if (task.type === TaskType.ARCHITECTURE || task.requiresArchitecture) {
      const recommended: AIModel = 'gpt-5.1-large'
      if (this.shouldEscalate(currentModel, recommended)) {
        const decision: EscalationDecision = {
          currentModel,
          recommendedModel: recommended,
          shouldEscalate: true,
          reason: 'Architecture analysis requires premium model',
          blocked: false
        }
        
        this.logEscalation(task, decision)
        return decision
      }
    }
    
    if (task.type === TaskType.GOVERNANCE_REASONING || task.requiresGovernance) {
      const recommended: AIModel = 'gpt-4.1-turbo'
      if (this.shouldEscalate(currentModel, recommended)) {
        const decision: EscalationDecision = {
          currentModel,
          recommendedModel: recommended,
          shouldEscalate: true,
          reason: 'Governance reasoning requires advanced model',
          blocked: false
        }
        
        this.logEscalation(task, decision)
        return decision
      }
    }
    
    if (task.type === TaskType.CONSTITUTIONAL_ANALYSIS) {
      const recommended: AIModel = 'gpt-5.1'
      if (this.shouldEscalate(currentModel, recommended)) {
        const decision: EscalationDecision = {
          currentModel,
          recommendedModel: recommended,
          shouldEscalate: true,
          reason: 'Constitutional analysis requires premium model',
          blocked: false
        }
        
        this.logEscalation(task, decision)
        return decision
      }
    }
    
    if (task.type === TaskType.DOCUMENT_INGESTION && task.tokenCount > 10000) {
      const recommended: AIModel = 'gpt-4.1-turbo'
      if (this.shouldEscalate(currentModel, recommended)) {
        const decision: EscalationDecision = {
          currentModel,
          recommendedModel: recommended,
          shouldEscalate: true,
          reason: 'Large document ingestion requires advanced model',
          blocked: false
        }
        
        this.logEscalation(task, decision)
        return decision
      }
    }
    
    // Check complexity-based escalation
    const recommendedForComplexity = this.getModelForComplexity(task.complexity)
    if (this.shouldEscalate(currentModel, recommendedForComplexity)) {
      const decision: EscalationDecision = {
        currentModel,
        recommendedModel: recommendedForComplexity,
        shouldEscalate: true,
        reason: `Task complexity (${task.complexity}) requires higher model tier`,
        blocked: false
      }
      
      this.logEscalation(task, decision)
      return decision
    }
    
    // No escalation needed
    return {
      currentModel,
      recommendedModel: currentModel,
      shouldEscalate: false,
      reason: 'Current model is adequate for task',
      blocked: false
    }
  }
  
  /**
   * Get recommended model for complexity level
   */
  private getModelForComplexity(complexity: TaskComplexity): AIModel {
    switch (complexity) {
      case TaskComplexity.SIMPLE:
        return 'gpt-4.1'
      case TaskComplexity.MODERATE:
        return 'gpt-4.1'
      case TaskComplexity.COMPLEX:
        return 'gpt-4.1-turbo'
      case TaskComplexity.VERY_COMPLEX:
        return 'gpt-5.1'
      case TaskComplexity.ARCHITECTURAL:
        return 'gpt-5.1-large'
    }
  }
  
  /**
   * Determine if escalation should occur
   */
  private shouldEscalate(current: AIModel, recommended: AIModel): boolean {
    const currentTier = this.modelTiers.get(current)
    const recommendedTier = this.modelTiers.get(recommended)
    
    if (!currentTier || !recommendedTier) {
      return false
    }
    
    const tierOrder = [
      ModelTier.BASIC,
      ModelTier.STANDARD,
      ModelTier.ADVANCED,
      ModelTier.PREMIUM,
      ModelTier.ULTIMATE
    ]
    
    const currentIndex = tierOrder.indexOf(currentTier)
    const recommendedIndex = tierOrder.indexOf(recommendedTier)
    
    return recommendedIndex > currentIndex
  }
  
  /**
   * Log escalation decision
   */
  private logEscalation(task: TaskCharacteristics, decision: EscalationDecision): void {
    logAutonomousAction({
      timestamp: new Date().toISOString(),
      actionType: 'Model Escalation',
      decision: decision.blocked ? 'denied' : (decision.shouldEscalate ? 'escalated' : 'allowed'),
      constitutionalLayer: 'CS8 - Model Escalation Governor',
      modelEscalation: decision.shouldEscalate ? {
        from: decision.currentModel,
        to: decision.recommendedModel,
        reason: decision.reason
      } : undefined,
      details: `Task: ${task.description} (${task.type}, ${task.complexity}, ${task.tokenCount} tokens)`,
      outcome: decision.blocked 
        ? `Model blocked: ${decision.blockReason}` 
        : (decision.shouldEscalate 
          ? `Escalated to ${decision.recommendedModel}` 
          : 'No escalation needed')
    })
  }
  
  /**
   * Check if a model is allowed for mutation operations
   */
  isModelValidForMutation(model: AIModel): boolean {
    return !this.hallucinationProneModels.includes(model)
  }
  
  /**
   * Get model tier
   */
  getModelTier(model: AIModel): ModelTier | undefined {
    return this.modelTiers.get(model)
  }
  
  /**
   * Get all models in a tier
   */
  getModelsInTier(tier: ModelTier): AIModel[] {
    const models: AIModel[] = []
    for (const [model, modelTier] of this.modelTiers.entries()) {
      if (modelTier === tier) {
        models.push(model)
      }
    }
    return models
  }
}

/**
 * Singleton instance
 */
let governorInstance: ModelEscalationGovernor | null = null

/**
 * Get the model escalation governor instance
 */
export function getModelEscalationGovernor(): ModelEscalationGovernor {
  if (!governorInstance) {
    governorInstance = new ModelEscalationGovernor()
  }
  return governorInstance
}

/**
 * Convenience function to evaluate escalation
 */
export function evaluateModelEscalation(
  currentModel: AIModel,
  task: TaskCharacteristics
): EscalationDecision {
  const governor = getModelEscalationGovernor()
  return governor.evaluate(currentModel, task)
}
