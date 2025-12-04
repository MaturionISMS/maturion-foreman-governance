/**
 * Foreman Behaviours
 * Defines behavioral patterns and policies for Foreman task execution
 */

export interface BehaviourRule {
  id: string
  name: string
  description: string
  condition: (context: any) => boolean
  action: (context: any) => Promise<any>
}

export interface BehaviourContext {
  event?: string
  payload?: any
  metadata?: Record<string, any>
}

/**
 * Behaviour registry for managing rules
 */
export class BehaviourRegistry {
  private rules: Map<string, BehaviourRule>

  constructor() {
    this.rules = new Map()
  }

  /**
   * Register a new behaviour rule
   */
  register(rule: BehaviourRule): void {
    this.rules.set(rule.id, rule)
    console.log(`Registered behaviour: ${rule.name}`)
  }

  /**
   * Unregister a behaviour rule
   */
  unregister(ruleId: string): void {
    this.rules.delete(ruleId)
    console.log(`Unregistered behaviour: ${ruleId}`)
  }

  /**
   * Get a behaviour rule by ID
   */
  get(ruleId: string): BehaviourRule | undefined {
    return this.rules.get(ruleId)
  }

  /**
   * Evaluate and execute matching behaviours
   */
  async evaluate(context: BehaviourContext): Promise<any[]> {
    // TODO: Implement behaviour evaluation logic
    console.log('Evaluating behaviours for context:', context)
    
    const results: any[] = []
    
    for (const rule of Array.from(this.rules.values())) {
      if (rule.condition(context)) {
        console.log(`Executing behaviour: ${rule.name}`)
        const result = await rule.action(context)
        results.push(result)
      }
    }
    
    return results
  }

  /**
   * List all registered behaviours
   */
  list(): BehaviourRule[] {
    return Array.from(this.rules.values())
  }
}

export const behaviourRegistry = new BehaviourRegistry()

/**
 * Helper function to create a behaviour rule
 */
export function createBehaviour(
  id: string,
  name: string,
  description: string,
  condition: (context: any) => boolean,
  action: (context: any) => Promise<any>
): BehaviourRule {
  return { id, name, description, condition, action }
}
