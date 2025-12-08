/**
 * Test utilities for GitHub Mutations tests
 */

import { strict as assert } from 'node:assert'

/**
 * Assert helper
 */
export function assertTrue(condition: boolean, message: string): void {
  assert(condition, message)
}

/**
 * Assert in range helper
 */
export function assertInRange(
  value: number,
  min: number,
  max: number,
  message?: string
): void {
  const msg = message || `Expected ${value} to be between ${min} and ${max}`
  assert(value >= min && value <= max, msg)
}

/**
 * Mock GitHub API response
 */
export interface MockGitHubResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

/**
 * Mock Octokit instance for testing
 */
export class MockOctokit {
  public calls: Array<{
    method: string
    endpoint: string
    params: any
  }> = []

  public responses: Map<string, any> = new Map()
  public errors: Map<string, Error> = new Map()

  /**
   * Set a mock response for a specific endpoint
   */
  setResponse(endpoint: string, response: any): void {
    this.responses.set(endpoint, response)
  }

  /**
   * Set a mock error for a specific endpoint
   */
  setError(endpoint: string, error: Error): void {
    this.errors.set(endpoint, error)
  }

  /**
   * Get recorded calls
   */
  getCalls(method?: string): Array<any> {
    if (method) {
      return this.calls.filter(c => c.method === method)
    }
    return this.calls
  }

  /**
   * Clear recorded calls
   */
  clearCalls(): void {
    this.calls = []
  }

  /**
   * Mock REST API
   */
  rest = {
    issues: {
      update: async (params: any) => {
        this.calls.push({ method: 'issues.update', endpoint: 'issues', params })
        const error = this.errors.get('issues.update')
        if (error) throw error
        return { data: this.responses.get('issues.update') || { ...params } }
      },
      createComment: async (params: any) => {
        this.calls.push({ method: 'issues.createComment', endpoint: 'issues', params })
        const error = this.errors.get('issues.createComment')
        if (error) throw error
        return {
          data: this.responses.get('issues.createComment') || {
            id: Math.floor(Math.random() * 10000),
            body: params.body,
            user: { login: 'foreman', id: 1 },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            html_url: `https://github.com/${params.owner}/${params.repo}/issues/${params.issue_number}#comment-1`,
          },
        }
      },
      addLabels: async (params: any) => {
        this.calls.push({ method: 'issues.addLabels', endpoint: 'issues', params })
        const error = this.errors.get('issues.addLabels')
        if (error) throw error
        return { data: this.responses.get('issues.addLabels') || params.labels }
      },
      addAssignees: async (params: any) => {
        this.calls.push({ method: 'issues.addAssignees', endpoint: 'issues', params })
        const error = this.errors.get('issues.addAssignees')
        if (error) throw error
        return { data: this.responses.get('issues.addAssignees') || params.assignees }
      },
    },
    pulls: {
      create: async (params: any) => {
        this.calls.push({ method: 'pulls.create', endpoint: 'pulls', params })
        const error = this.errors.get('pulls.create')
        if (error) throw error
        return {
          data: this.responses.get('pulls.create') || {
            number: Math.floor(Math.random() * 1000),
            title: params.title,
            body: params.body,
            state: 'open',
            html_url: `https://github.com/${params.owner}/${params.repo}/pull/1`,
            head: { ref: params.head, sha: 'abc123' },
            base: { ref: params.base, sha: 'def456' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        }
      },
      update: async (params: any) => {
        this.calls.push({ method: 'pulls.update', endpoint: 'pulls', params })
        const error = this.errors.get('pulls.update')
        if (error) throw error
        return {
          data: this.responses.get('pulls.update') || {
            number: params.pull_number,
            ...params,
            html_url: `https://github.com/${params.owner}/${params.repo}/pull/${params.pull_number}`,
          },
        }
      },
      requestReviewers: async (params: any) => {
        this.calls.push({ method: 'pulls.requestReviewers', endpoint: 'pulls', params })
        const error = this.errors.get('pulls.requestReviewers')
        if (error) throw error
        return { data: this.responses.get('pulls.requestReviewers') || params.reviewers }
      },
    },
    repos: {
      updateBranchProtection: async (params: any) => {
        this.calls.push({ method: 'repos.updateBranchProtection', endpoint: 'repos', params })
        const error = this.errors.get('repos.updateBranchProtection')
        if (error) throw error
        return { data: this.responses.get('repos.updateBranchProtection') || params }
      },
      deleteBranchProtection: async (params: any) => {
        this.calls.push({ method: 'repos.deleteBranchProtection', endpoint: 'repos', params })
        const error = this.errors.get('repos.deleteBranchProtection')
        if (error) throw error
        return { data: this.responses.get('repos.deleteBranchProtection') || {} }
      },
    },
  }
}

/**
 * Create mock QA results
 */
export function createMockQAResults(passed: boolean = true) {
  return {
    passed,
    totalChecks: 10,
    passedChecks: passed ? 10 : 7,
    blockers: passed ? [] : ['Test failure in auth.test.ts'],
  }
}

/**
 * Create mock compliance results
 */
export function createMockComplianceResults(passed: boolean = true) {
  return {
    passed,
    secretsDetected: !passed,
    orgValidated: passed,
  }
}

/**
 * Create mock PR metadata
 */
export function createMockPRMetadata() {
  return {
    buildSequenceId: 'seq_test_123',
    qaResults: createMockQAResults(),
    complianceResults: createMockComplianceResults(),
    linkedIssues: [42],
    builders: ['ui-builder'],
    governanceTags: ['qa-approved', 'compliance-approved'],
  }
}

/**
 * Create mock PR config
 */
export function createMockPRConfig() {
  return {
    owner: 'test-owner',
    repo: 'test-repo',
    head: 'feature/test',
    base: 'main',
    title: 'Test PR',
    body: 'Test PR body',
    metadata: createMockPRMetadata(),
  }
}

/**
 * Create mock governance approval
 */
export function createMockGovernanceApproval() {
  return {
    approvedBy: 'admin-user',
    reason: 'Test approval',
    timestamp: new Date().toISOString(),
    role: 'admin',
  }
}
