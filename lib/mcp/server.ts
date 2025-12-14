/**
 * MCP Server Implementation
 * 
 * Provides Model Context Protocol server for GitHub autonomous operations.
 * Exposes tools for:
 * - Merging PRs
 * - Closing issues
 * - Adding/removing labels
 * - Posting comments
 * 
 * All operations enforce safety rules and log to Governance Memory.
 */

import { MCPConfig, validateMCPConfig, getMCPConfig } from './config'
import { validateMergeSafety, validateIssueCloseSafety, validateCommentSafety, SafetyCheckResult } from './safety'
import { mergePR, closeIssue, labelIssue, commentOnIssue } from '@/lib/github/mutations'
import { logGovernanceEvent } from '@/lib/foreman/memory/governance-memory'
import { GitHubAppClient } from '@/lib/github'

/**
 * MCP Tool Response
 */
export interface MCPToolResponse {
  success: boolean
  result?: any
  error?: string
  reason?: string
  safetyChecksFailed?: string[]
  audit: AuditLogEntry
}

/**
 * Audit Log Entry (Enhanced with GitHub App context)
 */
export interface AuditLogEntry {
  operation: string
  actor: string
  
  // GitHub App context
  githubApp?: {
    appId: string
    installationId: string
  }
  
  target: {
    owner: string
    repo: string
    number: number
  }
  timestamp: string
  result: 'success' | 'failure'
  safetyChecks?: SafetyCheckResult
  errorDetails?: string
}

/**
 * MCP Server State (Enhanced with auth method tracking)
 */
interface MCPServerState {
  initialized: boolean
  config: MCPConfig
  tools: string[]
  activeOperations: number
  lastOperationTimestamp: string
  authMethod?: 'github-app' | 'legacy-token'
  authenticationTested?: boolean
  githubAppClient?: GitHubAppClient
}

let serverState: MCPServerState = {
  initialized: false,
  config: getMCPConfig(),
  tools: [],
  activeOperations: 0,
  lastOperationTimestamp: ''
}

/**
 * Initialize MCP Server
 */
export async function initializeMCPServer(config: MCPConfig): Promise<MCPServerState> {
  // Validate config
  const validation = validateMCPConfig(config)
  if (!validation.valid) {
    throw new Error(`MCP initialization failed: ${validation.errors.join(', ')}`)
  }

  // Determine auth method
  let authMethod: 'github-app' | 'legacy-token'
  let githubAppClient: GitHubAppClient | undefined
  let authenticationTested = false

  if (config.githubApp) {
    // Prefer GitHub App authentication
    authMethod = 'github-app'
    
    try {
      githubAppClient = new GitHubAppClient(config.githubApp)
      
      // Test authentication by fetching a token
      await githubAppClient.getInstallationToken()
      authenticationTested = true
      
      console.log('[MCP Server] Initialized with GitHub App authentication')
      console.log(`[MCP Server] App ID: ${config.githubApp.appId}, Installation ID: ${config.githubApp.installationId}`)
    } catch (error: any) {
      throw new Error(`Failed to authenticate with GitHub App: ${error.message}`)
    }
  } else if (config.githubToken) {
    // Fall back to legacy token (with deprecation warning)
    authMethod = 'legacy-token'
    console.warn('[MCP Server] Using legacy token auth (deprecated)')
    console.warn('[MCP Server] Please migrate to GitHub App authentication')
  } else {
    throw new Error('Either GitHub App or GitHub token is required')
  }

  serverState = {
    initialized: true,
    config,
    tools: [
      'mcp_github_merge_pr',
      'mcp_github_enable_auto_merge',
      'mcp_github_close_issue',
      'mcp_github_add_labels',
      'mcp_github_remove_labels',
      'mcp_github_comment'
    ],
    activeOperations: 0,
    lastOperationTimestamp: '',
    authMethod,
    authenticationTested,
    githubAppClient
  }

  console.log('[MCP Server] Initialized with', serverState.tools.length, 'tools')

  return serverState
}

/**
 * List available MCP tools
 */
export function listTools(): string[] {
  return serverState.tools
}

/**
 * Get MCP server status
 */
export async function getMCPStatus(): Promise<{
  available: boolean
  configured: boolean
  tokenPresent: boolean
  initialized: boolean
}> {
  const token = process.env.GITHUB_MCP_TOKEN || ''
  
  return {
    available: token !== '',
    configured: token !== '',
    tokenPresent: token !== '',
    initialized: serverState.initialized
  }
}

/**
 * Create audit log entry (Enhanced with GitHub App context)
 */
async function createAuditLog(
  operation: string,
  target: { owner: string; repo: string; number: number },
  result: 'success' | 'failure',
  safetyChecks?: SafetyCheckResult,
  errorDetails?: string
): Promise<AuditLogEntry> {
  const audit: AuditLogEntry = {
    operation,
    actor: 'foreman',
    target,
    timestamp: new Date().toISOString(),
    result,
    safetyChecks,
    errorDetails
  }

  // Add GitHub App context if using app-based auth
  if (serverState.authMethod === 'github-app' && serverState.config.githubApp) {
    audit.githubApp = {
      appId: serverState.config.githubApp.appId,
      installationId: serverState.config.githubApp.installationId
    }
  }

  // Log to Governance Memory if enabled
  if (serverState.config.auditLogging.logToGovernanceMemory) {
    await logGovernanceEvent({
      type: 'mcp_operation',
      severity: result === 'failure' ? 'high' : 'low',
      description: `MCP operation: ${operation} ${result}`,
      metadata: audit
    })
  }

  return audit
}

/**
 * Execute MCP tool: mcp_github_merge_pr
 */
async function executeMergePR(params: {
  owner: string
  repo: string
  prNumber: number
  mergeMethod: 'merge' | 'squash' | 'rebase'
}): Promise<MCPToolResponse> {
  // Validate parameters
  if (!params.owner) throw new Error('Missing required parameter: owner')
  if (!params.repo) throw new Error('Missing required parameter: repo')
  if (!params.prNumber) throw new Error('Missing required parameter: prNumber')
  if (typeof params.prNumber !== 'number') throw new Error('prNumber must be a number')

  const target = { owner: params.owner, repo: params.repo, number: params.prNumber }

  try {
    // Run safety checks
    const safetyResult = await validateMergeSafety({
      owner: params.owner,
      repo: params.repo,
      prNumber: params.prNumber,
      config: serverState.config.safetyChecks,
      githubToken: serverState.config.githubToken,
      githubAppClient: serverState.githubAppClient
    })

    if (!safetyResult.passed) {
      const audit = await createAuditLog('merge_pr', target, 'failure', safetyResult)
      
      return {
        success: false,
        error: 'SAFETY_CHECK_FAILED',
        reason: safetyResult.blockingReasons.join(', '),
        safetyChecksFailed: safetyResult.blockingReasons,
        audit
      }
    }

    // Execute merge
    await mergePR(
      params.owner,
      params.repo,
      params.prNumber,
      params.mergeMethod,
      { 
        approvedBy: 'foreman', 
        reason: 'Autonomous merge - all safety checks passed',
        timestamp: new Date().toISOString() 
      }
    )

    const audit = await createAuditLog('merge_pr', target, 'success', safetyResult)

    return {
      success: true,
      result: { merged: true },
      audit
    }

  } catch (error: any) {
    const audit = await createAuditLog('merge_pr', target, 'failure', undefined, error.message)
    
    return {
      success: false,
      error: error.status === 404 ? 'GITHUB_API_ERROR' : 'SYSTEM_ERROR',
      reason: error.message,
      audit
    }
  }
}

/**
 * Execute MCP tool: mcp_github_close_issue
 */
async function executeCloseIssue(params: {
  owner: string
  repo: string
  issueNumber: number
  reason: string
  linkedPRs?: number[]
}): Promise<MCPToolResponse> {
  // Validate parameters
  if (!params.owner) throw new Error('Missing required parameter: owner')
  if (!params.repo) throw new Error('Missing required parameter: repo')
  if (!params.issueNumber) throw new Error('Missing required parameter: issueNumber')
  if (!params.reason || params.reason.trim() === '') throw new Error('Closure reason is required')

  const target = { owner: params.owner, repo: params.repo, number: params.issueNumber }

  try {
    // Run safety checks
    const safetyResult = await validateIssueCloseSafety(params)

    if (!safetyResult.passed) {
      const audit = await createAuditLog('close_issue', target, 'failure', safetyResult)
      
      return {
        success: false,
        error: 'SAFETY_CHECK_FAILED',
        reason: safetyResult.blockingReasons.join(', '),
        safetyChecksFailed: safetyResult.blockingReasons,
        audit
      }
    }

    // Execute close
    await closeIssue(
      params.owner,
      params.repo,
      params.issueNumber,
      params.reason,
      params.linkedPRs
    )

    const audit = await createAuditLog('close_issue', target, 'success', safetyResult)

    return {
      success: true,
      result: { closed: true },
      audit
    }

  } catch (error: any) {
    const audit = await createAuditLog('close_issue', target, 'failure', undefined, error.message)
    
    return {
      success: false,
      error: 'GITHUB_API_ERROR',
      reason: error.message,
      audit
    }
  }
}

/**
 * Execute MCP tool: mcp_github_add_labels
 */
async function executeAddLabels(params: {
  owner: string
  repo: string
  issueNumber: number
  labels: string[]
}): Promise<MCPToolResponse> {
  // Validate parameters
  if (!params.owner) throw new Error('Missing required parameter: owner')
  if (!params.repo) throw new Error('Missing required parameter: repo')
  if (!params.issueNumber) throw new Error('Missing required parameter: issueNumber')
  if (!params.labels || params.labels.length === 0) throw new Error('At least one label is required')

  const target = { owner: params.owner, repo: params.repo, number: params.issueNumber }

  try {
    // Execute label addition
    await labelIssue(
      params.owner,
      params.repo,
      params.issueNumber,
      params.labels
    )

    const audit = await createAuditLog('add_labels', target, 'success')

    return {
      success: true,
      result: { labelsAdded: params.labels },
      audit
    }

  } catch (error: any) {
    const audit = await createAuditLog('add_labels', target, 'failure', undefined, error.message)
    
    return {
      success: false,
      error: 'GITHUB_API_ERROR',
      reason: error.message,
      audit
    }
  }
}

/**
 * Execute MCP tool: mcp_github_remove_labels
 */
async function executeRemoveLabels(params: {
  owner: string
  repo: string
  issueNumber: number
  labels: string[]
}): Promise<MCPToolResponse> {
  // Validate parameters
  if (!params.owner) throw new Error('Missing required parameter: owner')
  if (!params.repo) throw new Error('Missing required parameter: repo')
  if (!params.issueNumber) throw new Error('Missing required parameter: issueNumber')
  if (!params.labels || params.labels.length === 0) throw new Error('At least one label is required')

  const target = { owner: params.owner, repo: params.repo, number: params.issueNumber }

  try {
    // Note: This is a placeholder implementation. In production, this would use:
    // await octokit.rest.issues.removeLabel() for each label
    // For now, return not implemented error to avoid false positives
    const audit = await createAuditLog('remove_labels', target, 'failure', undefined, 'Not implemented')

    return {
      success: false,
      error: 'NOT_IMPLEMENTED',
      reason: 'Label removal not yet implemented. Use GitHub API directly or implement in mutations module.',
      audit
    }

  } catch (error: any) {
    const audit = await createAuditLog('remove_labels', target, 'failure', undefined, error.message)
    
    return {
      success: false,
      error: 'GITHUB_API_ERROR',
      reason: error.message,
      audit
    }
  }
}

/**
 * Execute MCP tool: mcp_github_comment
 */
async function executeComment(params: {
  owner: string
  repo: string
  issueNumber: number
  body: string
}): Promise<MCPToolResponse> {
  // Validate parameters
  if (!params.owner) throw new Error('Missing required parameter: owner')
  if (!params.repo) throw new Error('Missing required parameter: repo')
  if (!params.issueNumber) throw new Error('Missing required parameter: issueNumber')
  if (!params.body || params.body.trim() === '') throw new Error('Comment body cannot be empty')

  const target = { owner: params.owner, repo: params.repo, number: params.issueNumber }

  try {
    // Run safety checks
    const safetyResult = await validateCommentSafety(params)

    if (!safetyResult.passed) {
      const audit = await createAuditLog('comment', target, 'failure', safetyResult)
      
      return {
        success: false,
        error: 'SAFETY_CHECK_FAILED',
        reason: safetyResult.blockingReasons.join(', '),
        safetyChecksFailed: safetyResult.blockingReasons,
        audit
      }
    }

    // Execute comment
    const comment = await commentOnIssue(
      params.owner,
      params.repo,
      params.issueNumber,
      params.body
    )

    const audit = await createAuditLog('comment', target, 'success', safetyResult)

    return {
      success: true,
      result: { commentId: comment.id },
      audit
    }

  } catch (error: any) {
    const audit = await createAuditLog('comment', target, 'failure', undefined, error.message)
    
    return {
      success: false,
      error: error.message.includes('Secrets detected') ? 'SAFETY_CHECK_FAILED' : 'GITHUB_API_ERROR',
      reason: error.message,
      audit
    }
  }
}

/**
 * Execute MCP tool by name
 */
export async function executeTool(toolName: string, parameters: any): Promise<MCPToolResponse> {
  serverState.activeOperations++
  serverState.lastOperationTimestamp = new Date().toISOString()

  try {
    switch (toolName) {
      case 'mcp_github_merge_pr':
        return await executeMergePR(parameters)
      case 'mcp_github_close_issue':
        return await executeCloseIssue(parameters)
      case 'mcp_github_add_labels':
        return await executeAddLabels(parameters)
      case 'mcp_github_remove_labels':
        return await executeRemoveLabels(parameters)
      case 'mcp_github_comment':
        return await executeComment(parameters)
      default:
        throw new Error(`Unknown tool: ${toolName}`)
    }
  } finally {
    serverState.activeOperations--
  }
}
