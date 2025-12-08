/**
 * GitHub Governance Validation Layer
 * 
 * Implements governance rails for GitHub mutations to ensure:
 * - QA enforcement (100% pass required)
 * - Compliance enforcement (secrets detection, org validation)
 * - Approval workflow (for sensitive operations)
 * - Mutation logging (complete audit trail)
 */

import {
  PRConfig,
  GovernanceApproval,
  QAResultsSummary,
  ComplianceResultsSummary,
  GovernanceViolationError,
  ComplianceViolationError,
  GovernanceApprovalRequiredError,
} from '@/types/github-events'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'

/**
 * Rail 1: QA Enforcement
 * Validates that QA results meet governance requirements
 */
export async function validateQA(qaResults: QAResultsSummary): Promise<void> {
  console.log('[GitHub Governance] Validating QA results...')
  
  if (!qaResults.passed) {
    const failureMessage = `QA FAILED: ${qaResults.passedChecks}/${qaResults.totalChecks} checks passed. Governance Supremacy Rule requires 100% QA pass.`
    
    // Log governance violation
    await logGovernanceEvent({
      type: 'github_mutation_blocked',
      severity: 'critical',
      description: failureMessage,
      metadata: {
        qaResults,
        blockReason: 'qa_failed',
      },
    })
    
    throw new GovernanceViolationError(failureMessage)
  }
  
  // Check for blockers even if QA passed
  if (qaResults.blockers && qaResults.blockers.length > 0) {
    const blockerMessage = `QA BLOCKED: ${qaResults.blockers.length} blocking issue(s) detected: ${qaResults.blockers.join(', ')}`
    
    await logGovernanceEvent({
      type: 'github_mutation_blocked',
      severity: 'critical',
      description: blockerMessage,
      metadata: {
        qaResults,
        blockReason: 'qa_blockers',
      },
    })
    
    throw new GovernanceViolationError(blockerMessage)
  }
  
  console.log('[GitHub Governance] ✓ QA validation passed')
}

/**
 * Rail 2: Compliance Enforcement
 * Validates compliance requirements (secrets detection, org validation)
 */
export async function validateCompliance(
  complianceResults: ComplianceResultsSummary
): Promise<void> {
  console.log('[GitHub Governance] Validating compliance...')
  
  // Check for specific violations first (more informative error messages)
  if (complianceResults.secretsDetected) {
    const secretsMessage = 'COMPLIANCE FAILED: Secrets detected in content'
    
    await logGovernanceEvent({
      type: 'github_mutation_blocked',
      severity: 'critical',
      description: secretsMessage,
      metadata: {
        complianceResults,
        blockReason: 'secrets_detected',
      },
    })
    
    throw new ComplianceViolationError(secretsMessage)
  }
  
  if (!complianceResults.orgValidated) {
    const orgMessage = 'COMPLIANCE FAILED: Organization not validated'
    
    await logGovernanceEvent({
      type: 'github_mutation_blocked',
      severity: 'high',
      description: orgMessage,
      metadata: {
        complianceResults,
        blockReason: 'org_not_validated',
      },
    })
    
    throw new ComplianceViolationError(orgMessage)
  }
  
  // Finally check overall passed status
  if (!complianceResults.passed) {
    const failureMessage = 'COMPLIANCE FAILED: Compliance checks did not pass'
    
    await logGovernanceEvent({
      type: 'github_mutation_blocked',
      severity: 'critical',
      description: failureMessage,
      metadata: {
        complianceResults,
        blockReason: 'compliance_failed',
      },
    })
    
    throw new ComplianceViolationError(failureMessage)
  }
  
  console.log('[GitHub Governance] ✓ Compliance validation passed')
}

/**
 * Rail 3: Approval Workflow
 * Validates governance approval for sensitive operations
 */
export async function validateApproval(
  approval: GovernanceApproval | undefined,
  requiredRoles: string[] = ['admin', 'governance-owner']
): Promise<void> {
  console.log('[GitHub Governance] Validating approval...')
  
  if (!approval || !approval.approvedBy) {
    const message = 'APPROVAL REQUIRED: Governance approval required for this operation'
    
    await logGovernanceEvent({
      type: 'github_mutation_blocked',
      severity: 'high',
      description: message,
      metadata: {
        blockReason: 'approval_missing',
        requiredRoles,
      },
    })
    
    throw new GovernanceApprovalRequiredError(message)
  }
  
  // In a real implementation, we would check the approver's role
  // For now, we'll assume the approval is valid if it has an approvedBy field
  // const approverRole = await getApproverRole(approval.approvedBy)
  // if (!requiredRoles.includes(approverRole)) {
  //   throw new GovernanceApprovalRequiredError(
  //     `Insufficient permissions: ${approverRole} not in ${requiredRoles.join(', ')}`
  //   )
  // }
  
  console.log('[GitHub Governance] ✓ Approval validation passed')
}

/**
 * Rail 4: Secrets Detection
 * Scans text content for potential secrets
 */
export async function detectSecrets(text: string): Promise<{
  found: boolean
  patterns: string[]
}> {
  console.log('[GitHub Governance] Scanning for secrets...')
  
  const secretPatterns = [
    // GitHub tokens (gh prefix patterns)
    { pattern: /gh[p|s|o|u|r]_[a-zA-Z0-9]{36,}/g, name: 'GITHUB_TOKEN' },
    // AWS keys (AKIA prefix)
    { pattern: /AKIA[0-9A-Z]{16}/g, name: 'AWS_KEY' },
    // Private keys (PEM format)
    { pattern: /-----BEGIN [A-Z ]+PRIVATE KEY-----/g, name: 'PRIVATE_KEY' },
    // JWT tokens (three base64 segments)
    { pattern: /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, name: 'JWT_TOKEN' },
    // OpenAI API keys (sk- prefix)
    { pattern: /sk-[a-zA-Z0-9]{32,}/g, name: 'OPENAI_KEY' },
    // Generic passwords (with assignment operator)
    { pattern: /password\s*[=:]\s*["']?[\w!@#$%^&*()_+\-=]{8,}/gi, name: 'PASSWORD' },
    // Generic secrets (with assignment operator)
    { pattern: /secret\s*[=:]\s*["']?[\w!@#$%^&*()_+\-=]{8,}/gi, name: 'SECRET' },
    // API keys with common prefixes
    { pattern: /api[_-]?key\s*[=:]\s*["']?[\w\-]{20,}["']?/gi, name: 'API_KEY' },
  ]
  
  const foundPatterns: string[] = []
  
  for (const { pattern, name } of secretPatterns) {
    if (pattern.test(text)) {
      foundPatterns.push(name)
    }
  }
  
  if (foundPatterns.length > 0) {
    console.log(`[GitHub Governance] ⚠️ Secrets detected: ${foundPatterns.join(', ')}`)
  } else {
    console.log('[GitHub Governance] ✓ No secrets detected')
  }
  
  return {
    found: foundPatterns.length > 0,
    patterns: foundPatterns,
  }
}

/**
 * Rail 4: Organization Validation
 * Validates that the organization is authorized
 */
export async function validateOrganisation(owner: string): Promise<boolean> {
  console.log('[GitHub Governance] Validating organization...')
  
  // In a real implementation, this would check against an authorized org list
  // For now, we'll accept all organizations
  const authorizedOrgs = process.env.AUTHORIZED_GITHUB_ORGS?.split(',') || []
  
  // If no orgs configured, accept all
  if (authorizedOrgs.length === 0) {
    console.log('[GitHub Governance] ✓ Organization validation skipped (no restrictions)')
    return true
  }
  
  const isAuthorized = authorizedOrgs.includes(owner)
  
  if (isAuthorized) {
    console.log('[GitHub Governance] ✓ Organization validated')
  } else {
    console.log(`[GitHub Governance] ⚠️ Organization not authorized: ${owner}`)
  }
  
  return isAuthorized
}

/**
 * Validate PR Creation Request
 * Combines all governance rails for PR creation
 */
export async function validatePRCreation(config: PRConfig): Promise<void> {
  console.log('[GitHub Governance] Validating PR creation request...')
  
  // Rail 1: QA Enforcement
  await validateQA(config.metadata.qaResults)
  
  // Rail 2: Compliance Enforcement
  await validateCompliance(config.metadata.complianceResults)
  
  // Rail 4: Secrets Detection in PR body
  const secretsResult = await detectSecrets(config.body)
  if (secretsResult.found) {
    throw new ComplianceViolationError(
      `Cannot create PR: Secrets detected in PR body (${secretsResult.patterns.join(', ')})`
    )
  }
  
  // Rail 4: Organization Validation
  const orgValidated = await validateOrganisation(config.owner)
  if (!orgValidated) {
    throw new ComplianceViolationError(
      `Cannot create PR: Organization ${config.owner} not validated`
    )
  }
  
  console.log('[GitHub Governance] ✓ PR creation validation passed')
}

/**
 * Validate Issue Comment Request
 * Validates comment text for secrets and compliance
 */
export async function validateIssueComment(
  owner: string,
  body: string
): Promise<void> {
  console.log('[GitHub Governance] Validating issue comment...')
  
  // Secrets detection
  const secretsResult = await detectSecrets(body)
  if (secretsResult.found) {
    throw new ComplianceViolationError(
      `Cannot post comment: Secrets detected (${secretsResult.patterns.join(', ')})`
    )
  }
  
  // Organization validation
  const orgValidated = await validateOrganisation(owner)
  if (!orgValidated) {
    throw new ComplianceViolationError(
      `Cannot post comment: Organization ${owner} not validated`
    )
  }
  
  console.log('[GitHub Governance] ✓ Issue comment validation passed')
}

/**
 * Validate Issue Closure Request
 * Ensures issues can only be closed with proper governance
 */
export async function validateIssueClosure(
  reason: string,
  linkedPRs?: number[]
): Promise<void> {
  console.log('[GitHub Governance] Validating issue closure...')
  
  // Ensure a reason is provided
  if (!reason || reason.trim().length === 0) {
    throw new GovernanceViolationError(
      'Cannot close issue: Closure reason is required'
    )
  }
  
  // In a real implementation, we would check if linked PRs are merged
  // or if the issue is marked as wontfix/duplicate/invalid
  // For now, we'll accept any valid reason
  
  console.log('[GitHub Governance] ✓ Issue closure validation passed')
}

/**
 * Validate Branch Protection Update
 * Requires governance approval for branch protection changes
 */
export async function validateBranchProtectionUpdate(
  approval: GovernanceApproval | undefined
): Promise<void> {
  console.log('[GitHub Governance] Validating branch protection update...')
  
  // Rail 3: Approval required for branch protection changes
  await validateApproval(approval, ['admin', 'governance-owner'])
  
  console.log('[GitHub Governance] ✓ Branch protection update validation passed')
}
