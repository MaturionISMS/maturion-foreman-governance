/**
 * CS8.3 - Autonomous Issue Creation Policies
 * 
 * Foreman may open new issues only when:
 * - Governance or architecture detects a gap
 * - A systemic failure is discovered
 * - Constitutional learning requires persistence
 * 
 * Forbidden:
 * - Self-assigned "feature requests"
 * - Architecture redesign without approval
 * - Builder-level directives
 */

import { logAutonomousAction } from './pilot-log'

/**
 * Issue creation reason
 */
export enum IssueCreationReason {
  GOVERNANCE_GAP = 'governance_gap',
  ARCHITECTURE_GAP = 'architecture_gap',
  SYSTEMIC_FAILURE = 'systemic_failure',
  CONSTITUTIONAL_LEARNING = 'constitutional_learning',
  SECURITY_VULNERABILITY = 'security_vulnerability',
  QUALITY_DEGRADATION = 'quality_degradation'
}

/**
 * Issue priority
 */
export enum IssuePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

/**
 * Issue proposal
 */
export interface IssueProposal {
  title: string
  description: string
  reason: IssueCreationReason
  priority: IssuePriority
  evidence: string[]
  relatedIncidents?: string[]
  recommendedActions: string[]
  constitutionalImpact: string
}

/**
 * Issue creation decision
 */
export interface IssueCreationDecision {
  allowed: boolean
  reason: string
  requiresApproval: boolean
  approvers?: string[]
  blockReason?: string
}

/**
 * Forbidden issue types
 */
const FORBIDDEN_ISSUE_TYPES = [
  'feature request',
  'enhancement',
  'optimization',
  'refactoring',
  'builder directive',
  'architecture redesign'
]

/**
 * Autonomous Issue Creation Policy Engine
 */
export class IssueCreationPolicyEngine {
  /**
   * Evaluate if Foreman can create an issue
   */
  evaluate(proposal: IssueProposal): IssueCreationDecision {
    // Check if issue type is forbidden
    const lowerTitle = proposal.title.toLowerCase()
    const lowerDescription = proposal.description.toLowerCase()
    
    for (const forbiddenType of FORBIDDEN_ISSUE_TYPES) {
      if (lowerTitle.includes(forbiddenType) || lowerDescription.includes(forbiddenType)) {
        const decision: IssueCreationDecision = {
          allowed: false,
          reason: `Issue type "${forbiddenType}" is not allowed for autonomous creation`,
          requiresApproval: false,
          blockReason: 'Forbidden issue type - Foreman cannot self-assign feature requests or architectural changes'
        }
        
        this.logDecision(proposal, decision)
        return decision
      }
    }
    
    // Check if reason is valid
    if (!this.isValidReason(proposal.reason)) {
      const decision: IssueCreationDecision = {
        allowed: false,
        reason: 'Invalid issue creation reason',
        requiresApproval: false,
        blockReason: 'Issue reason does not meet autonomous creation criteria'
      }
      
      this.logDecision(proposal, decision)
      return decision
    }
    
    // Check if sufficient evidence is provided
    if (proposal.evidence.length === 0) {
      const decision: IssueCreationDecision = {
        allowed: false,
        reason: 'Insufficient evidence for issue creation',
        requiresApproval: false,
        blockReason: 'No evidence provided - autonomous issues require concrete evidence'
      }
      
      this.logDecision(proposal, decision)
      return decision
    }
    
    // Governance gaps allow automatic creation
    if (proposal.reason === IssueCreationReason.GOVERNANCE_GAP) {
      const decision: IssueCreationDecision = {
        allowed: true,
        reason: 'Governance gap detected - autonomous creation allowed',
        requiresApproval: false
      }
      
      this.logDecision(proposal, decision)
      return decision
    }
    
    // Architecture gaps require approval
    if (proposal.reason === IssueCreationReason.ARCHITECTURE_GAP) {
      const decision: IssueCreationDecision = {
        allowed: true,
        reason: 'Architecture gap detected - requires approval before implementation',
        requiresApproval: true,
        approvers: ['Johan', 'Technical Lead']
      }
      
      this.logDecision(proposal, decision)
      return decision
    }
    
    // Systemic failures allow automatic creation if critical
    if (proposal.reason === IssueCreationReason.SYSTEMIC_FAILURE) {
      if (proposal.priority === IssuePriority.CRITICAL || proposal.priority === IssuePriority.HIGH) {
        const decision: IssueCreationDecision = {
          allowed: true,
          reason: 'Critical systemic failure - autonomous creation allowed',
          requiresApproval: false
        }
        
        this.logDecision(proposal, decision)
        return decision
      } else {
        const decision: IssueCreationDecision = {
          allowed: true,
          reason: 'Non-critical systemic failure - requires approval',
          requiresApproval: true,
          approvers: ['Technical Lead']
        }
        
        this.logDecision(proposal, decision)
        return decision
      }
    }
    
    // Constitutional learning allows automatic creation
    if (proposal.reason === IssueCreationReason.CONSTITUTIONAL_LEARNING) {
      const decision: IssueCreationDecision = {
        allowed: true,
        reason: 'Constitutional learning captured - autonomous creation allowed',
        requiresApproval: false
      }
      
      this.logDecision(proposal, decision)
      return decision
    }
    
    // Security vulnerabilities always allowed
    if (proposal.reason === IssueCreationReason.SECURITY_VULNERABILITY) {
      const decision: IssueCreationDecision = {
        allowed: true,
        reason: 'Security vulnerability detected - autonomous creation allowed',
        requiresApproval: false
      }
      
      this.logDecision(proposal, decision)
      return decision
    }
    
    // Quality degradation requires evidence of pattern
    if (proposal.reason === IssueCreationReason.QUALITY_DEGRADATION) {
      if (proposal.relatedIncidents && proposal.relatedIncidents.length >= 3) {
        const decision: IssueCreationDecision = {
          allowed: true,
          reason: 'Quality degradation pattern detected (3+ incidents) - autonomous creation allowed',
          requiresApproval: false
        }
        
        this.logDecision(proposal, decision)
        return decision
      } else {
        const decision: IssueCreationDecision = {
          allowed: false,
          reason: 'Insufficient evidence for quality degradation (need 3+ related incidents)',
          requiresApproval: false,
          blockReason: 'Not enough evidence - quality degradation requires pattern of incidents'
        }
        
        this.logDecision(proposal, decision)
        return decision
      }
    }
    
    // Default: deny
    const decision: IssueCreationDecision = {
      allowed: false,
      reason: 'Issue does not meet autonomous creation criteria',
      requiresApproval: false,
      blockReason: 'Issue type not covered by autonomous creation policies'
    }
    
    this.logDecision(proposal, decision)
    return decision
  }
  
  /**
   * Validate issue creation reason
   */
  private isValidReason(reason: IssueCreationReason): boolean {
    return Object.values(IssueCreationReason).includes(reason)
  }
  
  /**
   * Log issue creation decision
   */
  private logDecision(proposal: IssueProposal, decision: IssueCreationDecision): void {
    logAutonomousAction({
      timestamp: new Date().toISOString(),
      actionType: 'Issue Creation',
      decision: decision.allowed ? (decision.requiresApproval ? 'escalated' : 'allowed') : 'denied',
      constitutionalLayer: 'CS8 - Issue Creation Policies',
      requiredApprovals: decision.approvers,
      details: `Proposal: "${proposal.title}" | Reason: ${proposal.reason} | Priority: ${proposal.priority}`,
      outcome: decision.allowed 
        ? (decision.requiresApproval ? `Requires approval from: ${decision.approvers?.join(', ')}` : 'Issue creation allowed')
        : `Blocked: ${decision.blockReason}`
    })
  }
  
  /**
   * Create issue template
   */
  createIssueTemplate(proposal: IssueProposal): string {
    return `# ${proposal.title}

## Reason for Creation
${proposal.reason}

## Priority
${proposal.priority}

## Evidence
${proposal.evidence.map((e, i) => `${i + 1}. ${e}`).join('\n')}

${proposal.relatedIncidents && proposal.relatedIncidents.length > 0 ? `
## Related Incidents
${proposal.relatedIncidents.map((id, i) => `${i + 1}. Incident #${id}`).join('\n')}
` : ''}

## Recommended Actions
${proposal.recommendedActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

## Constitutional Impact
${proposal.constitutionalImpact}

---
*This issue was created autonomously by Foreman under CS8 Issue Creation Policies.*
*Creation Reason: ${proposal.reason}*
`
  }
  
  /**
   * Validate issue proposal completeness
   */
  validateProposal(proposal: IssueProposal): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!proposal.title || proposal.title.trim().length === 0) {
      errors.push('Title is required')
    }
    
    if (!proposal.description || proposal.description.trim().length === 0) {
      errors.push('Description is required')
    }
    
    if (!proposal.reason) {
      errors.push('Reason is required')
    }
    
    if (!proposal.priority) {
      errors.push('Priority is required')
    }
    
    if (!proposal.evidence || proposal.evidence.length === 0) {
      errors.push('At least one piece of evidence is required')
    }
    
    if (!proposal.recommendedActions || proposal.recommendedActions.length === 0) {
      errors.push('At least one recommended action is required')
    }
    
    if (!proposal.constitutionalImpact || proposal.constitutionalImpact.trim().length === 0) {
      errors.push('Constitutional impact analysis is required')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
}

/**
 * Singleton instance
 */
let policyEngineInstance: IssueCreationPolicyEngine | null = null

/**
 * Get the issue creation policy engine instance
 */
export function getIssueCreationPolicyEngine(): IssueCreationPolicyEngine {
  if (!policyEngineInstance) {
    policyEngineInstance = new IssueCreationPolicyEngine()
  }
  return policyEngineInstance
}

/**
 * Convenience function to evaluate issue creation
 */
export function evaluateIssueCreation(proposal: IssueProposal): IssueCreationDecision {
  const engine = getIssueCreationPolicyEngine()
  return engine.evaluate(proposal)
}
