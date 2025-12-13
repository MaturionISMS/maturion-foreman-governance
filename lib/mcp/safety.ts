/**
 * MCP Safety Validation Layer
 * 
 * Enforces safety rules before GitHub operations to ensure:
 * - CI is green
 * - Branch protection rules are respected
 * - QA approval is present
 * - Compliance approval is present
 * - No merge conflicts
 * - No secrets in comments
 */

import { Octokit } from 'octokit'
import { MCPConfig } from './config'
import { detectSecrets } from '@/lib/foreman/governance/github-governance'

export interface SafetyCheckResult {
  passed: boolean
  checks: {
    ciStatus?: { passed: boolean; details: string }
    branchProtection?: { passed: boolean; details: string }
    qaApproval?: { passed: boolean; details: string }
    complianceApproval?: { passed: boolean; details: string }
    mergeConflicts?: { passed: boolean; details: string }
  }
  blockingReasons: string[]
  secretsDetected?: boolean
}

/**
 * Get GitHub client
 */
function getGitHubClient(githubToken: string): Octokit {
  return new Octokit({ auth: githubToken })
}

/**
 * Validate merge safety
 */
export async function validateMergeSafety(params: {
  owner: string
  repo: string
  prNumber: number
  config: MCPConfig['safetyChecks']
  githubToken?: string
}): Promise<SafetyCheckResult> {
  const result: SafetyCheckResult = {
    passed: false,
    checks: {},
    blockingReasons: []
  }

  // Reject bypass attempts - validate entire params object structure
  const paramKeys = Object.keys(params)
  const suspiciousKeys = paramKeys.filter(key => 
    key.toLowerCase().includes('bypass') || 
    key.toLowerCase().includes('skip') ||
    key.toLowerCase().includes('force') ||
    key.toLowerCase().includes('override')
  )
  
  if (suspiciousKeys.length > 0) {
    throw new Error(`Safety bypass is not allowed. Suspicious parameters detected: ${suspiciousKeys.join(', ')}`)
  }

  const githubToken = params.githubToken || process.env.GITHUB_MCP_TOKEN || ''
  if (!githubToken) {
    throw new Error('GitHub token is required')
  }

  const octokit = getGitHubClient(githubToken)

  try {
    // Get PR details
    const { data: pr } = await octokit.rest.pulls.get({
      owner: params.owner,
      repo: params.repo,
      pull_number: params.prNumber
    })

    // Check 1: CI Status
    if (params.config.requireCIGreen) {
      try {
        const { data: status } = await octokit.rest.repos.getCombinedStatusForRef({
          owner: params.owner,
          repo: params.repo,
          ref: pr.head.sha
        })

        const ciPassed = status.state === 'success'
        result.checks.ciStatus = {
          passed: ciPassed,
          details: ciPassed ? 'All checks passed' : `CI status: ${status.state}`
        }

        if (!ciPassed) {
          result.blockingReasons.push('CI status is not green')
        }
      } catch (error: any) {
        result.checks.ciStatus = {
          passed: false,
          details: `Failed to check CI status: ${error.message}`
        }
        result.blockingReasons.push('CI status check failed')
      }
    }

    // Check 2: QA Approval
    if (params.config.requireQAApproval) {
      const labels = pr.labels.map(l => l.name)
      const hasQAApproval = labels.includes('qa-approved')
      const hasQABlocked = labels.includes('qa-blocked')

      let qaCheckPassed = hasQAApproval && !hasQABlocked
      let qaDetails = ''

      if (!hasQAApproval) {
        qaDetails = 'QA approval label missing'
        result.blockingReasons.push('QA approval label missing')
      } else if (hasQABlocked) {
        qaDetails = 'QA blocked label present'
        result.blockingReasons.push('QA blocked label present')
        qaCheckPassed = false
      } else {
        qaDetails = 'QA approved'
      }

      result.checks.qaApproval = {
        passed: qaCheckPassed,
        details: qaDetails
      }
    }

    // Check 3: Compliance Approval
    if (params.config.requireComplianceApproval) {
      const labels = pr.labels.map(l => l.name)
      const hasComplianceApproval = labels.includes('compliance-approved')
      const hasComplianceBlocked = labels.includes('compliance-blocked')

      let complianceCheckPassed = hasComplianceApproval && !hasComplianceBlocked
      let complianceDetails = ''

      if (!hasComplianceApproval) {
        complianceDetails = 'Compliance approval label missing'
        result.blockingReasons.push('Compliance approval label missing')
      } else if (hasComplianceBlocked) {
        complianceDetails = 'Compliance blocked label present'
        result.blockingReasons.push('Compliance blocked')
        complianceCheckPassed = false
      } else {
        complianceDetails = 'Compliance approved'
      }

      result.checks.complianceApproval = {
        passed: complianceCheckPassed,
        details: complianceDetails
      }
    }

    // Check 4: Branch Protection
    if (params.config.respectBranchProtection) {
      try {
        const { data: protection } = await octokit.rest.repos.getBranchProtection({
          owner: params.owner,
          repo: params.repo,
          branch: pr.base.ref
        })

        // Check if reviews are required
        if (protection.required_pull_request_reviews) {
          const requiredReviews = protection.required_pull_request_reviews.required_approving_review_count || 0
          
          if (requiredReviews > 0) {
            const { data: reviews } = await octokit.rest.pulls.listReviews({
              owner: params.owner,
              repo: params.repo,
              pull_number: params.prNumber
            })

            const approvedReviews = reviews.filter(r => r.state === 'APPROVED').length

            const branchProtectionPassed = approvedReviews >= requiredReviews
            result.checks.branchProtection = {
              passed: branchProtectionPassed,
              details: branchProtectionPassed 
                ? `${approvedReviews} reviews (required: ${requiredReviews})`
                : `Insufficient reviews: ${approvedReviews}/${requiredReviews}`
            }

            if (!branchProtectionPassed) {
              result.blockingReasons.push('Insufficient reviews')
            }
          } else {
            result.checks.branchProtection = {
              passed: true,
              details: 'No review requirements'
            }
          }
        } else {
          result.checks.branchProtection = {
            passed: true,
            details: 'No branch protection'
          }
        }
      } catch (error: any) {
        // No branch protection configured
        if (error.status === 404) {
          result.checks.branchProtection = {
            passed: true,
            details: 'No branch protection rules'
          }
        } else {
          result.checks.branchProtection = {
            passed: false,
            details: `Failed to check branch protection: ${error.message}`
          }
          result.blockingReasons.push('Branch protection check failed')
        }
      }
    }

    // Check 5: Merge Conflicts
    const mergeable = pr.mergeable
    const mergeableState = pr.mergeable_state

    const noConflicts = mergeable !== false && mergeableState !== 'dirty'
    result.checks.mergeConflicts = {
      passed: noConflicts,
      details: noConflicts ? 'No conflicts' : 'PR has merge conflicts'
    }

    if (!noConflicts) {
      result.blockingReasons.push('PR has merge conflicts')
    }

    // Determine overall result
    result.passed = result.blockingReasons.length === 0

  } catch (error: any) {
    result.passed = false
    result.blockingReasons.push(`Safety validation error: ${error.message}`)
  }

  return result
}

/**
 * Validate issue close safety
 */
export async function validateIssueCloseSafety(params: {
  owner: string
  repo: string
  issueNumber: number
  reason: string
  linkedPRs?: number[]
}): Promise<SafetyCheckResult> {
  const result: SafetyCheckResult = {
    passed: true,
    checks: {},
    blockingReasons: []
  }

  // Check reason is provided
  if (!params.reason || params.reason.trim() === '') {
    result.passed = false
    result.blockingReasons.push('Closure reason is required')
  }

  return result
}

/**
 * Validate comment safety
 */
export async function validateCommentSafety(params: {
  owner: string
  repo: string
  issueNumber: number
  body: string
}): Promise<SafetyCheckResult> {
  const result: SafetyCheckResult = {
    passed: true,
    checks: {},
    blockingReasons: [],
    secretsDetected: false
  }

  // Check for secrets
  try {
    const secretsResult = await detectSecrets(params.body)
    
    if (secretsResult.found) {
      result.passed = false
      result.secretsDetected = true
      result.blockingReasons.push('Secrets detected in comment')
    }
  } catch (error: any) {
    // If secrets detection fails, err on the side of caution
    result.passed = false
    result.blockingReasons.push(`Secrets detection failed: ${error.message}`)
  }

  return result
}
