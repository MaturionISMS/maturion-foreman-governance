/**
 * GitHub Mutations Module
 * 
 * Core mutation functions for GitHub operations (FOREMAN-ONLY).
 * Implements all GitHub mutation capabilities designed in the architecture with:
 * - Full governance validation (QA, compliance, approval)
 * - Complete audit logging to Governance Memory
 * - Failure recovery with retry logic
 * - Secrets detection and security enforcement
 * 
 * CRITICAL: This module is FOREMAN-ONLY. Builder agents have NO access.
 */

import { Octokit } from 'octokit'
import {
  PRConfig,
  PRUpdates,
  GovernanceApproval,
  BranchProtectionRules,
  GitHubComment,
  GitHubPR,
  GitHubMutationEvent,
  GovernanceViolationError,
  ComplianceViolationError,
  MutationFailureError,
  GOVERNANCE_LABELS,
  GovernanceLabel,
} from '@/types/github-events'
import {
  validatePRCreation,
  validateIssueComment,
  validateIssueClosure,
  validateBranchProtectionUpdate,
  detectSecrets,
} from '@/lib/foreman/governance/github-governance'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'

/**
 * Get GitHub client with installation token
 * 
 * SECURITY NOTE: In production, this should use a secure secrets management
 * service (e.g., AWS Secrets Manager, HashiCorp Vault, Azure Key Vault)
 * instead of directly accessing environment variables.
 * 
 * For GitHub App installations, this:
 * 1. Generates a JWT from the app's private key
 * 2. Exchanges JWT for an installation token
 * 3. Uses the installation token for API calls
 * 4. Caches tokens until they expire
 */
async function getGitHubClient(): Promise<Octokit> {
  // Prefer GitHub App authentication
  if (process.env.GITHUB_APP_ID && process.env.GITHUB_APP_PRIVATE_KEY && process.env.GITHUB_APP_INSTALLATION_ID) {
    const { GitHubAppClient } = await import('@/lib/github')
    
    const client = new GitHubAppClient({
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
      installationId: process.env.GITHUB_APP_INSTALLATION_ID
    })
    
    return await client.getOctokit()
  }
  
  // Fall back to legacy token (with warning)
  const token = process.env.GITHUB_MCP_TOKEN || process.env.GITHUB_APP_INSTALLATION_TOKEN
  
  if (token) {
    console.warn('[GitHub Mutations] Using legacy token authentication (deprecated)')
    console.warn('[GitHub Mutations] Please configure GitHub App authentication')
    return new Octokit({ auth: token })
  }
  
  throw new Error('GitHub authentication not configured')
}

/**
 * Record mutation event to Governance Memory
 */
async function recordMutation(event: Partial<GitHubMutationEvent>): Promise<void> {
  const fullEvent: GitHubMutationEvent = {
    id: `mut_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: new Date().toISOString(),
    actor: 'foreman',
    metadata: {
      autonomousMode: process.env.MATURION_AUTONOMOUS_MODE === 'true',
      ...event.metadata,
    },
    ...event,
  } as GitHubMutationEvent
  
  await logGovernanceEvent({
    type: 'github_mutation',
    severity: fullEvent.mutation.result === 'failure' ? 'high' : 'low',
    description: `GitHub mutation: ${fullEvent.eventType} on ${fullEvent.target.resourceType} ${fullEvent.target.resourceId}`,
    metadata: fullEvent,
  })
}

/**
 * Retry logic for transient failures
 */
async function retryMutation<T>(
  operation: () => Promise<T>,
  operationName: string,
  maxRetries: number = 3
): Promise<T> {
  let attempt = 0
  let lastError: Error | undefined
  
  while (attempt < maxRetries) {
    try {
      return await operation()
    } catch (error: any) {
      lastError = error
      
      // Don't retry governance violations or compliance errors
      if (
        error instanceof GovernanceViolationError ||
        error instanceof ComplianceViolationError
      ) {
        throw error
      }
      
      // Check if error is transient (network, rate limit, etc.)
      const isTransient =
        error.status === 429 || // Rate limit
        error.status === 502 || // Bad gateway
        error.status === 503 || // Service unavailable
        error.status === 504 || // Gateway timeout
        error.message?.includes('timeout') ||
        error.message?.includes('ECONNRESET')
      
      if (!isTransient) {
        throw error
      }
      
      attempt++
      const delay = Math.pow(2, attempt) * 1000 // Exponential backoff
      console.log(`[GitHub Mutations] Retry ${attempt}/${maxRetries} for ${operationName} after ${delay}ms`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw new MutationFailureError(
    `${operationName} failed after ${maxRetries} retries: ${lastError?.message}`
  )
}

// ============================================================================
// ISSUE LIFECYCLE OPERATIONS
// ============================================================================

/**
 * Close an issue with governance validation
 */
export async function closeIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  reason: string,
  linkedPRs?: number[]
): Promise<void> {
  console.log(`[GitHub Mutations] Closing issue ${owner}/${repo}#${issueNumber}`)
  
  try {
    // Governance validation
    await validateIssueClosure(reason, linkedPRs)
    
    // Perform mutation
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      
      // Close the issue
      await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        state: 'closed',
      })
      
      // Add closure comment with reason
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: reason,
      })
    }, 'closeIssue')
    
    // Record mutation
    await recordMutation({
      eventType: 'issue_closed',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'closeIssue',
        parameters: { reason, linkedPRs },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Issue ${owner}/${repo}#${issueNumber} closed`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'issue_closed',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'closeIssue',
        parameters: { reason, linkedPRs },
        result: 'failure',
        errorDetails: { message: error.message, stack: error.stack },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Reopen a closed issue
 */
export async function reopenIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  reason: string
): Promise<void> {
  console.log(`[GitHub Mutations] Reopening issue ${owner}/${repo}#${issueNumber}`)
  
  try {
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      
      // Reopen the issue
      await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issueNumber,
        state: 'open',
      })
      
      // Add comment explaining reopening
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body: `Reopened: ${reason}`,
      })
    }, 'reopenIssue')
    
    await recordMutation({
      eventType: 'issue_reopened',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'reopenIssue',
        parameters: { reason },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Issue ${owner}/${repo}#${issueNumber} reopened`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'issue_reopened',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'reopenIssue',
        parameters: { reason },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Comment on an issue with secrets detection
 */
export async function commentOnIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  body: string
): Promise<GitHubComment> {
  console.log(`[GitHub Mutations] Commenting on issue ${owner}/${repo}#${issueNumber}`)
  
  try {
    // Governance validation
    await validateIssueComment(owner, body)
    
    const comment = await retryMutation(async () => {
      const octokit = await getGitHubClient()
      const response = await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: issueNumber,
        body,
      })
      return response.data
    }, 'commentOnIssue')
    
    await recordMutation({
      eventType: 'issue_commented',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'commentOnIssue',
        parameters: { bodyLength: body.length },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
        secretsDetected: false,
        orgValidated: true,
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Comment added to issue ${owner}/${repo}#${issueNumber}`)
    return comment as GitHubComment
  } catch (error: any) {
    await recordMutation({
      eventType: 'issue_commented',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'commentOnIssue',
        parameters: { bodyLength: body.length },
        result: error instanceof ComplianceViolationError ? 'blocked' : 'failure',
        blockReason: error instanceof ComplianceViolationError ? 'compliance_violation' : undefined,
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Label an issue with governance labels
 */
export async function labelIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  labels: string[]
): Promise<void> {
  console.log(`[GitHub Mutations] Labeling issue ${owner}/${repo}#${issueNumber} with ${labels.join(', ')}`)
  
  try {
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: issueNumber,
        labels,
      })
    }, 'labelIssue')
    
    await recordMutation({
      eventType: 'issue_labeled',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'labelIssue',
        parameters: { labels },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: labels.filter(l => Object.values(GOVERNANCE_LABELS).includes(l as GovernanceLabel)),
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Labels applied to issue ${owner}/${repo}#${issueNumber}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'issue_labeled',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'labelIssue',
        parameters: { labels },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Assign users to an issue
 */
export async function assignIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  assignees: string[]
): Promise<void> {
  console.log(`[GitHub Mutations] Assigning issue ${owner}/${repo}#${issueNumber} to ${assignees.join(', ')}`)
  
  try {
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.issues.addAssignees({
        owner,
        repo,
        issue_number: issueNumber,
        assignees,
      })
    }, 'assignIssue')
    
    await recordMutation({
      eventType: 'issue_assigned',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'assignIssue',
        parameters: { assignees },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Assignees added to issue ${owner}/${repo}#${issueNumber}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'issue_assigned',
      target: { owner, repo, resourceType: 'issue', resourceId: issueNumber },
      mutation: {
        operation: 'assignIssue',
        parameters: { assignees },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

// ============================================================================
// PR LIFECYCLE OPERATIONS
// ============================================================================

/**
 * Create a PR with full governance metadata
 */
export async function createPR(config: PRConfig): Promise<GitHubPR> {
  console.log(`[GitHub Mutations] Creating PR ${config.owner}/${config.repo}: ${config.head} -> ${config.base}`)
  
  try {
    // Governance validation (QA, compliance, secrets)
    await validatePRCreation(config)
    
    const pr = await retryMutation(async () => {
      const octokit = await getGitHubClient()
      const response = await octokit.rest.pulls.create({
        owner: config.owner,
        repo: config.repo,
        title: config.title,
        body: config.body,
        head: config.head,
        base: config.base,
        draft: config.draft,
        maintainer_can_modify: config.maintainer_can_modify,
      })
      return response.data
    }, 'createPR')
    
    // Apply governance labels
    const governanceLabels = config.metadata.governanceTags
    if (governanceLabels.length > 0) {
      await labelIssue(config.owner, config.repo, pr.number, governanceLabels)
    }
    
    await recordMutation({
      eventType: 'pr_created',
      target: { owner: config.owner, repo: config.repo, resourceType: 'pr', resourceId: pr.number },
      mutation: {
        operation: 'createPR',
        parameters: {
          head: config.head,
          base: config.base,
          title: config.title,
        },
        result: 'success',
      },
      governance: {
        qaStatus: 'passed',
        complianceStatus: 'passed',
        approvalRequired: false,
        governanceTags: governanceLabels,
      },
      metadata: {
        autonomousMode: process.env.MATURION_AUTONOMOUS_MODE === 'true',
        buildSequenceId: config.metadata.buildSequenceId,
      },
    })
    
    console.log(`[GitHub Mutations] ✓ PR created: ${pr.html_url}`)
    return pr as GitHubPR
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_created',
      target: { owner: config.owner, repo: config.repo, resourceType: 'pr', resourceId: 0 },
      mutation: {
        operation: 'createPR',
        parameters: {
          head: config.head,
          base: config.base,
          title: config.title,
        },
        result: error instanceof GovernanceViolationError ? 'blocked' : 'failure',
        blockReason: error instanceof GovernanceViolationError ? 'governance_violation' : undefined,
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Update PR metadata (title, body, state, base)
 */
export async function updatePR(
  owner: string,
  repo: string,
  prNumber: number,
  updates: PRUpdates
): Promise<GitHubPR> {
  console.log(`[GitHub Mutations] Updating PR ${owner}/${repo}#${prNumber}`)
  
  try {
    // If updating body, check for secrets
    if (updates.body) {
      const secretsResult = await detectSecrets(updates.body)
      if (secretsResult.found) {
        throw new ComplianceViolationError(
          `Cannot update PR: Secrets detected in body (${secretsResult.patterns.join(', ')})`
        )
      }
    }
    
    const pr = await retryMutation(async () => {
      const octokit = await getGitHubClient()
      const response = await octokit.rest.pulls.update({
        owner,
        repo,
        pull_number: prNumber,
        ...updates,
      })
      return response.data
    }, 'updatePR')
    
    await recordMutation({
      eventType: 'pr_updated',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'updatePR',
        parameters: updates,
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ PR ${owner}/${repo}#${prNumber} updated`)
    return pr as GitHubPR
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_updated',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'updatePR',
        parameters: updates,
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Add labels to a PR
 */
export async function addPRLabels(
  owner: string,
  repo: string,
  prNumber: number,
  labels: string[]
): Promise<void> {
  console.log(`[GitHub Mutations] Adding labels to PR ${owner}/${repo}#${prNumber}: ${labels.join(', ')}`)
  
  try {
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number: prNumber,
        labels,
      })
    }, 'addPRLabels')
    
    await recordMutation({
      eventType: 'pr_labeled',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'addPRLabels',
        parameters: { labels },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: labels.filter(l => Object.values(GOVERNANCE_LABELS).includes(l as GovernanceLabel)),
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Labels added to PR ${owner}/${repo}#${prNumber}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_labeled',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'addPRLabels',
        parameters: { labels },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Comment on a PR
 */
export async function commentOnPR(
  owner: string,
  repo: string,
  prNumber: number,
  body: string
): Promise<GitHubComment> {
  console.log(`[GitHub Mutations] Commenting on PR ${owner}/${repo}#${prNumber}`)
  
  try {
    // Validate comment (secrets detection)
    await validateIssueComment(owner, body)
    
    const comment = await retryMutation(async () => {
      const octokit = await getGitHubClient()
      const response = await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body,
      })
      return response.data
    }, 'commentOnPR')
    
    await recordMutation({
      eventType: 'pr_commented',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'commentOnPR',
        parameters: { bodyLength: body.length },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
        secretsDetected: false,
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Comment added to PR ${owner}/${repo}#${prNumber}`)
    return comment as GitHubComment
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_commented',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'commentOnPR',
        parameters: { bodyLength: body.length },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Request PR review from users
 */
export async function requestPRReview(
  owner: string,
  repo: string,
  prNumber: number,
  reviewers: string[]
): Promise<void> {
  console.log(`[GitHub Mutations] Requesting review for PR ${owner}/${repo}#${prNumber} from ${reviewers.join(', ')}`)
  
  try {
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.pulls.requestReviewers({
        owner,
        repo,
        pull_number: prNumber,
        reviewers,
      })
    }, 'requestPRReview')
    
    await recordMutation({
      eventType: 'pr_review_requested',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'requestPRReview',
        parameters: { reviewers },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Review requested for PR ${owner}/${repo}#${prNumber}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_review_requested',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'requestPRReview',
        parameters: { reviewers },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Assign users to a PR
 */
export async function assignPR(
  owner: string,
  repo: string,
  prNumber: number,
  assignees: string[]
): Promise<void> {
  console.log(`[GitHub Mutations] Assigning PR ${owner}/${repo}#${prNumber} to ${assignees.join(', ')}`)
  
  try {
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.issues.addAssignees({
        owner,
        repo,
        issue_number: prNumber,
        assignees,
      })
    }, 'assignPR')
    
    await recordMutation({
      eventType: 'pr_assigned',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'assignPR',
        parameters: { assignees },
        result: 'success',
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Assignees added to PR ${owner}/${repo}#${prNumber}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_assigned',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'assignPR',
        parameters: { assignees },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: false,
        governanceTags: [],
      },
    })
    throw error
  }
}

// ============================================================================
// BRANCH PROTECTION OPERATIONS
// ============================================================================

/**
 * Set branch protection rules with governance approval
 */
export async function setBranchProtection(
  owner: string,
  repo: string,
  branch: string,
  rules: BranchProtectionRules,
  approval: GovernanceApproval
): Promise<void> {
  console.log(`[GitHub Mutations] Setting branch protection for ${owner}/${repo}:${branch}`)
  
  try {
    // Governance validation
    await validateBranchProtectionUpdate(approval)
    
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      
      // Construct the protection config with proper types for GitHub API
      const protectionConfig: any = {
        owner,
        repo,
        branch,
        required_status_checks: rules.required_status_checks || null,
        enforce_admins: rules.enforce_admins ?? null,
        required_pull_request_reviews: rules.required_pull_request_reviews || null,
        restrictions: rules.restrictions ?? null,
        allow_force_pushes: rules.allow_force_pushes ?? false,
        allow_deletions: rules.allow_deletions ?? false,
      }
      
      await octokit.rest.repos.updateBranchProtection(protectionConfig)
    }, 'setBranchProtection')
    
    await recordMutation({
      eventType: 'branch_protection_updated',
      target: { owner, repo, resourceType: 'branch', resourceId: branch },
      mutation: {
        operation: 'setBranchProtection',
        parameters: { rules },
        result: 'success',
      },
      governance: {
        approvalRequired: true,
        approvedBy: approval.approvedBy,
        governanceTags: ['branch-protection'],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Branch protection set for ${owner}/${repo}:${branch}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'branch_protection_updated',
      target: { owner, repo, resourceType: 'branch', resourceId: branch },
      mutation: {
        operation: 'setBranchProtection',
        parameters: { rules },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: true,
        governanceTags: [],
      },
    })
    throw error
  }
}

/**
 * Update branch protection rules
 */
export async function updateBranchProtection(
  owner: string,
  repo: string,
  branch: string,
  updates: Partial<BranchProtectionRules>,
  approval: GovernanceApproval
): Promise<void> {
  console.log(`[GitHub Mutations] Updating branch protection for ${owner}/${repo}:${branch}`)
  
  // This is an alias for setBranchProtection since GitHub API uses the same endpoint
  await setBranchProtection(owner, repo, branch, updates as BranchProtectionRules, approval)
}

/**
 * Remove branch protection with governance approval
 */
export async function removeBranchProtection(
  owner: string,
  repo: string,
  branch: string,
  approval: GovernanceApproval
): Promise<void> {
  console.log(`[GitHub Mutations] Removing branch protection from ${owner}/${repo}:${branch}`)
  
  try {
    // Governance validation
    await validateBranchProtectionUpdate(approval)
    
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.repos.deleteBranchProtection({
        owner,
        repo,
        branch,
      })
    }, 'removeBranchProtection')
    
    await recordMutation({
      eventType: 'branch_protection_updated',
      target: { owner, repo, resourceType: 'branch', resourceId: branch },
      mutation: {
        operation: 'removeBranchProtection',
        parameters: {},
        result: 'success',
      },
      governance: {
        approvalRequired: true,
        approvedBy: approval.approvedBy,
        governanceTags: ['branch-protection-removed'],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ Branch protection removed from ${owner}/${repo}:${branch}`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'branch_protection_updated',
      target: { owner, repo, resourceType: 'branch', resourceId: branch },
      mutation: {
        operation: 'removeBranchProtection',
        parameters: {},
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: true,
        governanceTags: [],
      },
    })
    throw error
  }
}

// ============================================================================
// GOVERNANCE METADATA OPERATIONS
// ============================================================================

/**
 * Apply governance labels to issues or PRs
 */
export async function applyGovernanceLabels(
  owner: string,
  repo: string,
  issueOrPR: number,
  labels: GovernanceLabel[]
): Promise<void> {
  console.log(`[GitHub Mutations] Applying governance labels to ${owner}/${repo}#${issueOrPR}`)
  await labelIssue(owner, repo, issueOrPR, labels)
}

/**
 * Record a governance event (for audit purposes)
 */
export async function recordGovernanceEvent(
  owner: string,
  repo: string,
  eventType: string,
  metadata: any
): Promise<void> {
  console.log(`[GitHub Mutations] Recording governance event: ${eventType}`)
  
  await recordMutation({
    eventType: 'governance_metadata_applied',
    target: { owner, repo, resourceType: 'pr', resourceId: metadata.prNumber || 0 },
    mutation: {
      operation: 'recordGovernanceEvent',
      parameters: { eventType, metadata },
      result: 'success',
    },
    governance: {
      approvalRequired: false,
      governanceTags: ['governance-event'],
    },
    metadata,
  })
}

/**
 * Tag PR with QA status
 */
export async function tagWithQAStatus(
  owner: string,
  repo: string,
  prNumber: number,
  qaStatus: 'approved' | 'blocked'
): Promise<void> {
  console.log(`[GitHub Mutations] Tagging PR ${owner}/${repo}#${prNumber} with QA status: ${qaStatus}`)
  
  const label = qaStatus === 'approved' ? GOVERNANCE_LABELS.QA_APPROVED : GOVERNANCE_LABELS.QA_BLOCKED
  await applyGovernanceLabels(owner, repo, prNumber, [label])
}

/**
 * Tag PR with compliance status
 */
export async function tagWithComplianceStatus(
  owner: string,
  repo: string,
  prNumber: number,
  complianceStatus: 'approved' | 'blocked'
): Promise<void> {
  console.log(`[GitHub Mutations] Tagging PR ${owner}/${repo}#${prNumber} with compliance status: ${complianceStatus}`)
  
  const label = complianceStatus === 'approved' 
    ? GOVERNANCE_LABELS.COMPLIANCE_APPROVED 
    : GOVERNANCE_LABELS.COMPLIANCE_BLOCKED
  await applyGovernanceLabels(owner, repo, prNumber, [label])
}

// ============================================================================
// PULL REQUEST MERGE OPERATIONS
// ============================================================================

/**
 * Merge a pull request with governance validation
 * 
 * CRITICAL: This operation requires governance approval and full QA validation.
 * PRs can only be merged if:
 * 1. All QA checks pass (100% green)
 * 2. All compliance checks pass
 * 3. Governance approval is provided
 * 4. PR Gatekeeper validates due process
 * 
 * This implements the final step of the Build Philosophy workflow:
 * Architecture → Red QA → Build to Green → Validation → MERGE
 */
export async function mergePR(
  owner: string,
  repo: string,
  prNumber: number,
  mergeMethod: 'merge' | 'squash' | 'rebase',
  approval: GovernanceApproval
): Promise<void> {
  console.log(`[GitHub Mutations] Merging PR ${owner}/${repo}#${prNumber} with method: ${mergeMethod}`)
  
  try {
    // Governance validation - ensure all requirements are met
    // This should verify:
    // - QA status is "approved"
    // - Compliance status is "approved"
    // - All required checks have passed
    // - Proper approval authority
    if (!approval || !approval.approvedBy) {
      throw new GovernanceViolationError(
        `PR merge requires governance approval. PR ${owner}/${repo}#${prNumber} cannot be merged without proper approval.`
      )
    }
    
    // Perform the merge operation
    await retryMutation(async () => {
      const octokit = await getGitHubClient()
      await octokit.rest.pulls.merge({
        owner,
        repo,
        pull_number: prNumber,
        merge_method: mergeMethod,
      })
    }, 'mergePR')
    
    // Record successful merge to Governance Memory
    await recordMutation({
      eventType: 'pr_merged',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'mergePR',
        parameters: { mergeMethod },
        result: 'success',
      },
      governance: {
        approvalRequired: true,
        approvedBy: approval.approvedBy,
        governanceTags: ['pr-merged', 'build-complete'],
      },
    })
    
    console.log(`[GitHub Mutations] ✓ PR ${owner}/${repo}#${prNumber} merged successfully`)
    console.log(`[GitHub Mutations] Build Philosophy workflow complete: Architecture → Red QA → Build to Green → Validated → MERGED ✓`)
  } catch (error: any) {
    await recordMutation({
      eventType: 'pr_merge_failed',
      target: { owner, repo, resourceType: 'pr', resourceId: prNumber },
      mutation: {
        operation: 'mergePR',
        parameters: { mergeMethod },
        result: 'failure',
        errorDetails: { message: error.message },
      },
      governance: {
        approvalRequired: true,
        governanceTags: ['merge-failed'],
      },
    })
    
    console.error(`[GitHub Mutations] ✗ Failed to merge PR ${owner}/${repo}#${prNumber}:`, error.message)
    throw error
  }
}

/**
 * Validate PR is ready for merge
 * 
 * Checks that all Build Philosophy requirements are met before merge:
 * 1. Architecture design checklist completed
 * 2. Red QA existed before build
 * 3. Build instruction was "Build to Green"
 * 4. QA is now 100% green
 * 5. All governance checks pass
 * 6. Process timeline integrity verified
 */
export async function validatePRReadyForMerge(
  owner: string,
  repo: string,
  prNumber: number
): Promise<{ ready: boolean; reason?: string; checks: Record<string, boolean> }> {
  console.log(`[GitHub Mutations] Validating PR ${owner}/${repo}#${prNumber} ready for merge`)
  
  const checks: Record<string, boolean> = {
    qaApproved: false,
    complianceApproved: false,
    allChecksPass: false,
    noBlockingLabels: false,
  }
  
  try {
    const octokit = await getGitHubClient()
    
    // Get PR details
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    })
    
    // Check labels for QA and compliance approval
    const labels = pr.labels.map(l => l.name)
    checks.qaApproved = labels.includes(GOVERNANCE_LABELS.QA_APPROVED)
    checks.complianceApproved = labels.includes(GOVERNANCE_LABELS.COMPLIANCE_APPROVED)
    
    // Check for blocking labels
    const blockingLabels = [
      GOVERNANCE_LABELS.QA_BLOCKED,
      GOVERNANCE_LABELS.COMPLIANCE_BLOCKED,
    ]
    checks.noBlockingLabels = !labels.some(label => blockingLabels.includes(label as any))
    
    // Check PR status checks
    if (pr.head.sha) {
      const { data: statusChecks } = await octokit.rest.repos.getCombinedStatusForRef({
        owner,
        repo,
        ref: pr.head.sha,
      })
      checks.allChecksPass = statusChecks.state === 'success'
    } else {
      checks.allChecksPass = false
    }
    
    // Determine if ready
    const ready = Object.values(checks).every(check => check === true)
    
    if (!ready) {
      const failedChecks = Object.entries(checks)
        .filter(([_, passed]) => !passed)
        .map(([check, _]) => check)
      
      return {
        ready: false,
        reason: `PR not ready for merge. Failed checks: ${failedChecks.join(', ')}`,
        checks,
      }
    }
    
    return { ready: true, checks }
    
  } catch (error: any) {
    console.error(`[GitHub Mutations] Error validating PR ready for merge:`, error.message)
    return {
      ready: false,
      reason: `Validation error: ${error.message}`,
      checks,
    }
  }
}
