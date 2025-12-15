/**
 * Strict Builder Handover Contract (SBHC) - Core Types and Interfaces
 * Issue #241 - Wave 0 (Builder Constitutional Systems)
 */

export interface HandoverContract {
  // Identity
  contract_id: string
  foreman_id: string
  builder_id: string
  issue_number: number
  issue_title: string
  
  // Context
  task_description: string
  architecture_doc: string  // REQUIRED before handover
  test_requirements: string[]
  implementation_requirements: string[]
  
  // Governance
  governance_constraints: {
    zero_test_debt: boolean
    build_philosophy_compliance: boolean
    gsr_enforcement: boolean
    opojd_requirements: string[]
  }
  
  // Success Criteria
  success_criteria: {
    tests_passing: boolean
    architecture_compliance: boolean
    zero_debt_maintained: boolean
    evidence_provided: string[]
  }
  
  // Accountability
  handover_timestamp: string
  acceptance_timestamp?: string
  completion_timestamp?: string
  builder_acceptance_signature: string
  
  // Status
  status: 'proposed' | 'accepted' | 'in_progress' | 'completed' | 'rejected'
  rejection_reason?: string
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export interface Evidence {
  architecture_compliance: {
    document: string
    compliance_percentage: number
    deviations: string[]
  }
  test_evidence: {
    test_file: string
    passing: boolean
    coverage: number
  }
  implementation: {
    files: string[]
    commits: string[]
    lines_of_code: number
  }
  governance_verification: {
    gsr_compliant: boolean
    zero_debt: boolean
    build_philosophy: boolean
  }
}

export interface BuilderAssignment {
  issue_number: number
  issue_title: string
  task_description: string
  architecture_doc: string
  builder_id: string
  foreman_id: string
}

/**
 * Contract Validator
 * Validates handover contracts before builder assignment
 */
export class ContractValidator {
  /**
   * Validate complete contract
   */
  validate(contract: HandoverContract): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // Validate architecture exists
    if (!this.validateArchitectureExists(contract.architecture_doc)) {
      errors.push('Architecture document is required before handover')
    }

    // Validate success criteria are measurable
    if (!this.validateSuccessCriteriaMeasurable(contract.success_criteria)) {
      errors.push('Success criteria must be measurable and unambiguous')
    }

    // Validate governance constraints are explicit
    if (!this.validateGovernanceComplete(contract.governance_constraints)) {
      errors.push('Governance constraints must be explicitly defined')
    }

    // Validate test requirements specified
    if (!contract.test_requirements || contract.test_requirements.length === 0) {
      errors.push('Test requirements must be specified')
    }

    // Validate implementation requirements specified
    if (!contract.implementation_requirements || contract.implementation_requirements.length === 0) {
      errors.push('Implementation requirements must be specified')
    }

    // Check for ambiguous terms
    const ambiguousTerms = this.detectAmbiguousTerms(contract)
    if (ambiguousTerms.length > 0) {
      warnings.push(`Potentially ambiguous terms detected: ${ambiguousTerms.join(', ')}`)
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * Validate architecture document exists
   */
  validateArchitectureExists(docPath: string): boolean {
    if (!docPath || docPath.trim() === '') {
      return false
    }
    // In production, would check file system
    // For now, just validate non-empty path
    return true
  }

  /**
   * Validate success criteria are measurable
   */
  validateSuccessCriteriaMeasurable(criteria: HandoverContract['success_criteria']): boolean {
    // All criteria fields must be defined
    if (typeof criteria.tests_passing !== 'boolean') return false
    if (typeof criteria.architecture_compliance !== 'boolean') return false
    if (typeof criteria.zero_debt_maintained !== 'boolean') return false
    if (!Array.isArray(criteria.evidence_provided)) return false
    return true
  }

  /**
   * Validate governance constraints are complete
   */
  validateGovernanceComplete(constraints: HandoverContract['governance_constraints']): boolean {
    if (typeof constraints.zero_test_debt !== 'boolean') return false
    if (typeof constraints.build_philosophy_compliance !== 'boolean') return false
    if (typeof constraints.gsr_enforcement !== 'boolean') return false
    if (!Array.isArray(constraints.opojd_requirements)) return false
    return true
  }

  /**
   * Detect ambiguous terms in contract
   */
  private detectAmbiguousTerms(contract: HandoverContract): string[] {
    const ambiguous: string[] = []
    const ambiguousKeywords = ['maybe', 'probably', 'should', 'could', 'might', 'perhaps', 'if possible']
    
    const textToCheck = [
      contract.task_description,
      ...contract.test_requirements,
      ...contract.implementation_requirements,
      ...contract.governance_constraints.opojd_requirements
    ].join(' ').toLowerCase()

    for (const keyword of ambiguousKeywords) {
      if (textToCheck.indexOf(keyword) !== -1) {
        ambiguous.push(keyword)
      }
    }

    return ambiguous
  }
}

/**
 * Handover Manager
 * Manages contract lifecycle and builder handovers
 */
export class HandoverManager {
  private contracts: { [key: string]: HandoverContract } = {}
  private validator: ContractValidator

  constructor() {
    this.validator = new ContractValidator()
  }

  /**
   * Create contract from builder assignment
   */
  createContract(assignment: BuilderAssignment): HandoverContract {
    const contractId = this.generateContractId(assignment.issue_number)
    
    const contract: HandoverContract = {
      contract_id: contractId,
      foreman_id: assignment.foreman_id,
      builder_id: assignment.builder_id,
      issue_number: assignment.issue_number,
      issue_title: assignment.issue_title,
      task_description: assignment.task_description,
      architecture_doc: assignment.architecture_doc,
      test_requirements: [],
      implementation_requirements: [],
      governance_constraints: {
        zero_test_debt: true,
        build_philosophy_compliance: true,
        gsr_enforcement: true,
        opojd_requirements: ['Complete context provided', 'Clear success criteria', 'Explicit governance']
      },
      success_criteria: {
        tests_passing: true,
        architecture_compliance: true,
        zero_debt_maintained: true,
        evidence_provided: ['Architecture compliance', 'Test results', 'Implementation files', 'Governance verification']
      },
      handover_timestamp: new Date().toISOString(),
      builder_acceptance_signature: '',
      status: 'proposed'
    }

    return contract
  }

  /**
   * Validate and propose contract
   */
  validateAndPropose(contract: HandoverContract): ValidationResult {
    const validation = this.validator.validate(contract)
    
    if (validation.valid) {
      this.contracts[contract.contract_id] = contract
      console.log(`[HandoverManager] Contract ${contract.contract_id} proposed for Issue #${contract.issue_number}`)
    } else {
      console.error(`[HandoverManager] Contract validation failed:`, validation.errors)
    }
    
    return validation
  }

  /**
   * Builder accepts contract
   */
  acceptContract(contractId: string, builderId: string): void {
    const contract = this.contracts[contractId]
    if (!contract) {
      throw new Error(`Contract ${contractId} not found`)
    }

    if (contract.builder_id !== builderId) {
      throw new Error(`Builder ${builderId} not authorized for contract ${contractId}`)
    }

    contract.status = 'accepted'
    contract.acceptance_timestamp = new Date().toISOString()
    contract.builder_acceptance_signature = `${builderId}-${Date.now()}`
    
    this.contracts[contractId] = contract
    console.log(`[HandoverManager] Contract ${contractId} accepted by ${builderId}`)
  }

  /**
   * Builder rejects contract with reason
   */
  rejectContract(contractId: string, reason: string): void {
    const contract = this.contracts[contractId]
    if (!contract) {
      throw new Error(`Contract ${contractId} not found`)
    }

    if (!reason || reason.trim() === '') {
      throw new Error('Rejection reason is required')
    }

    contract.status = 'rejected'
    contract.rejection_reason = reason
    
    this.contracts[contractId] = contract
    console.log(`[HandoverManager] Contract ${contractId} rejected: ${reason}`)
  }

  /**
   * Mark contract as in progress
   */
  markInProgress(contractId: string): void {
    const contract = this.contracts[contractId]
    if (!contract) {
      throw new Error(`Contract ${contractId} not found`)
    }

    if (contract.status !== 'accepted') {
      throw new Error(`Contract ${contractId} must be accepted before starting (current: ${contract.status})`)
    }

    contract.status = 'in_progress'
    this.contracts[contractId] = contract
    console.log(`[HandoverManager] Contract ${contractId} in progress`)
  }

  /**
   * Mark contract as completed with evidence
   */
  markCompleted(contractId: string, evidence: Evidence): void {
    const contract = this.contracts[contractId]
    if (!contract) {
      throw new Error(`Contract ${contractId} not found`)
    }

    if (contract.status !== 'in_progress') {
      throw new Error(`Contract ${contractId} must be in progress to complete (current: ${contract.status})`)
    }

    // Verify evidence against success criteria
    const verified = this.verifyEvidence(contract, evidence)
    if (!verified) {
      throw new Error(`Evidence does not meet contract ${contractId} success criteria`)
    }

    contract.status = 'completed'
    contract.completion_timestamp = new Date().toISOString()
    
    this.contracts[contractId] = contract
    console.log(`[HandoverManager] Contract ${contractId} completed`)
  }

  /**
   * Get contract status
   */
  getContractStatus(contractId: string): HandoverContract | undefined {
    return this.contracts[contractId]
  }

  /**
   * Get all contracts
   */
  getAllContracts(): HandoverContract[] {
    const contractsArray: HandoverContract[] = []
    for (const key in this.contracts) {
      if (this.contracts.hasOwnProperty(key)) {
        contractsArray.push(this.contracts[key])
      }
    }
    return contractsArray
  }

  /**
   * Verify evidence meets contract criteria
   */
  private verifyEvidence(contract: HandoverContract, evidence: Evidence): boolean {
    const criteria = contract.success_criteria

    // Check tests passing
    if (criteria.tests_passing && !evidence.test_evidence.passing) {
      return false
    }

    // Check architecture compliance
    if (criteria.architecture_compliance && evidence.architecture_compliance.compliance_percentage < 100) {
      return false
    }

    // Check zero debt
    if (criteria.zero_debt_maintained && !evidence.governance_verification.zero_debt) {
      return false
    }

    // Check governance compliance
    if (!evidence.governance_verification.gsr_compliant) {
      return false
    }

    if (!evidence.governance_verification.build_philosophy) {
      return false
    }

    return true
  }

  /**
   * Generate unique contract ID
   */
  private generateContractId(issueNumber: number): string {
    const timestamp = Date.now()
    return `CONTRACT-${issueNumber}-${timestamp}`
  }
}

/**
 * Evidence Collector
 * Collects and validates completion evidence
 */
export class EvidenceCollector {
  /**
   * Collect evidence for contract completion
   */
  collectEvidence(
    architectureDoc: string,
    testFile: string,
    implementationFiles: string[],
    commits: string[]
  ): Evidence {
    return {
      architecture_compliance: {
        document: architectureDoc,
        compliance_percentage: 100, // Would calculate in production
        deviations: []
      },
      test_evidence: {
        test_file: testFile,
        passing: true, // Would check in production
        coverage: 100 // Would calculate in production
      },
      implementation: {
        files: implementationFiles,
        commits: commits,
        lines_of_code: this.countLinesOfCode(implementationFiles)
      },
      governance_verification: {
        gsr_compliant: true,
        zero_debt: true,
        build_philosophy: true
      }
    }
  }

  /**
   * Count lines of code (simplified)
   */
  private countLinesOfCode(files: string[]): number {
    // In production, would read and count actual files
    return files.length * 100 // Estimate
  }
}

// Singleton instances
let handoverManagerInstance: HandoverManager | null = null

/**
 * Get HandoverManager singleton
 */
export function getHandoverManager(): HandoverManager {
  if (!handoverManagerInstance) {
    handoverManagerInstance = new HandoverManager()
  }
  return handoverManagerInstance
}
