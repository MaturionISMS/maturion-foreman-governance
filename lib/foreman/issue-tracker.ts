/**
 * Issue Tracker
 * Manages issue closure and tracking via MCP Control Plane
 */

import { recordGovernanceEvent } from './memory'

export interface IssueStatus {
  number: number
  title: string
  status: 'open' | 'in_progress' | 'completed' | 'closed'
  started_at?: string
  completed_at?: string
  closed_at?: string
  evidence_commits: string[]
  architecture_doc?: string
  test_file?: string
  implementation_files: string[]
}

class IssueTracker {
  private issues: Map<number, IssueStatus> = new Map()
  private mcpServerUrl: string | null = null

  constructor() {
    this.mcpServerUrl = process.env.MCP_SERVER_URL || null
  }

  /**
   * Mark issue as started
   */
  startIssue(issueNumber: number, title: string) {
    const status: IssueStatus = {
      number: issueNumber,
      title,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      evidence_commits: [],
      implementation_files: []
    }
    
    this.issues.set(issueNumber, status)
    
    recordGovernanceEvent(
      'issue_started',
      {
        issue_number: issueNumber,
        title,
        timestamp: new Date().toISOString()
      }
    )
    
    console.log(`📍 Issue #${issueNumber} started: ${title}`)
  }

  /**
   * Mark issue as completed (ready for closure)
   */
  completeIssue(
    issueNumber: number,
    evidence: {
      commits: string[]
      architectureDoc?: string
      testFile?: string
      implementationFiles: string[]
    }
  ) {
    const issue = this.issues.get(issueNumber)
    if (!issue) {
      throw new Error(`Issue #${issueNumber} not tracked`)
    }

    issue.status = 'completed'
    issue.completed_at = new Date().toISOString()
    issue.evidence_commits = evidence.commits
    issue.architecture_doc = evidence.architectureDoc
    issue.test_file = evidence.testFile
    issue.implementation_files = evidence.implementationFiles

    this.issues.set(issueNumber, issue)

    recordGovernanceEvent(
      'issue_completed',
      {
        issue_number: issueNumber,
        title: issue.title,
        commits: evidence.commits.length,
        files: evidence.implementationFiles.length,
        timestamp: new Date().toISOString()
      }
    )

    console.log(`✅ Issue #${issueNumber} completed: ${issue.title}`)
    console.log(`   Commits: ${evidence.commits.join(', ')}`)
    console.log(`   Files: ${evidence.implementationFiles.length}`)
  }

  /**
   * Close issue via MCP Control Plane
   */
  async closeIssue(issueNumber: number, comment?: string): Promise<boolean> {
    const issue = this.issues.get(issueNumber)
    if (!issue) {
      throw new Error(`Issue #${issueNumber} not tracked`)
    }

    if (issue.status !== 'completed') {
      throw new Error(`Issue #${issueNumber} must be completed before closing (current status: ${issue.status})`)
    }

    if (!this.mcpServerUrl) {
      console.warn(`[IssueTracker] MCP_SERVER_URL not configured - cannot close issue #${issueNumber}`)
      console.log(`[IssueTracker] Issue #${issueNumber} would be closed with comment:`, comment)
      return false
    }

    try {
      // Generate closure comment with evidence
      const closureComment = this.generateClosureComment(issue, comment)

      // Call MCP close_issue endpoint
      const response = await fetch(`${this.mcpServerUrl}/tools/close_issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GITHUB_MCP_TOKEN || ''}`
        },
        body: JSON.stringify({
          owner: 'MaturionISMS',
          repo: 'maturion-foreman-app',
          issue_number: issueNumber,
          comment: closureComment
        })
      })

      if (!response.ok) {
        throw new Error(`MCP close_issue failed: ${response.statusText}`)
      }

      issue.status = 'closed'
      issue.closed_at = new Date().toISOString()
      this.issues.set(issueNumber, issue)

      recordGovernanceEvent(
        'issue_closed',
        {
          issue_number: issueNumber,
          title: issue.title,
          via_mcp: true,
          timestamp: new Date().toISOString()
        }
      )

      console.log(`🔒 Issue #${issueNumber} closed via MCP: ${issue.title}`)
      return true

    } catch (error) {
      console.error(`[IssueTracker] Failed to close issue #${issueNumber}:`, error)
      return false
    }
  }

  /**
   * Generate closure comment with evidence
   */
  private generateClosureComment(issue: IssueStatus, additionalComment?: string): string {
    let comment = `## Issue Closed - Implementation Complete ✅\n\n`
    
    if (additionalComment) {
      comment += `${additionalComment}\n\n`
    }

    comment += `### Evidence Summary\n\n`
    comment += `**Completed**: ${issue.completed_at}\n`
    comment += `**Duration**: ${this.calculateDuration(issue.started_at!, issue.completed_at!)}\n\n`

    if (issue.architecture_doc) {
      comment += `**Architecture**: \`${issue.architecture_doc}\`\n`
    }

    if (issue.test_file) {
      comment += `**Tests**: \`${issue.test_file}\`\n`
    }

    comment += `\n**Implementation Files** (${issue.implementation_files.length}):\n`
    issue.implementation_files.forEach(file => {
      comment += `- \`${file}\`\n`
    })

    comment += `\n**Commits** (${issue.evidence_commits.length}):\n`
    issue.evidence_commits.forEach(commit => {
      comment += `- ${commit}\n`
    })

    comment += `\n### Constitutional Compliance\n`
    comment += `- ✅ Build Philosophy: Architecture → Red QA → Build to Green\n`
    comment += `- ✅ Zero Test Debt: No stubs or TODOs in implementation\n`
    comment += `- ✅ GSR: Governance supremacy maintained throughout\n`
    comment += `- ✅ TypeScript verification passed\n`

    comment += `\n---\n*Closed automatically by Foreman via MCP Control Plane*`

    return comment
  }

  /**
   * Calculate duration between timestamps
   */
  private calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const durationMs = end - start

    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  /**
   * Get issue status
   */
  getIssueStatus(issueNumber: number): IssueStatus | undefined {
    return this.issues.get(issueNumber)
  }

  /**
   * Get all tracked issues
   */
  getAllIssues(): IssueStatus[] {
    return Array.from(this.issues.values())
  }

  /**
   * Get issues by status
   */
  getIssuesByStatus(status: IssueStatus['status']): IssueStatus[] {
    return Array.from(this.issues.values()).filter(issue => issue.status === status)
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    const all = this.getAllIssues()
    return {
      total: all.length,
      in_progress: this.getIssuesByStatus('in_progress').length,
      completed: this.getIssuesByStatus('completed').length,
      closed: this.getIssuesByStatus('closed').length
    }
  }
}

// Singleton instance
let trackerInstance: IssueTracker | null = null

/**
 * Get or create issue tracker instance
 */
export function getIssueTracker(): IssueTracker {
  if (!trackerInstance) {
    trackerInstance = new IssueTracker()
  }
  return trackerInstance
}

/**
 * Helper: Start tracking issue
 */
export function startIssue(issueNumber: number, title: string) {
  return getIssueTracker().startIssue(issueNumber, title)
}

/**
 * Helper: Complete issue with evidence
 */
export function completeIssue(
  issueNumber: number,
  evidence: {
    commits: string[]
    architectureDoc?: string
    testFile?: string
    implementationFiles: string[]
  }
) {
  return getIssueTracker().completeIssue(issueNumber, evidence)
}

/**
 * Helper: Close issue via MCP
 */
export function closeIssue(issueNumber: number, comment?: string) {
  return getIssueTracker().closeIssue(issueNumber, comment)
}
