/**
 * GitHub Types
 * Type definitions for GitHub API interactions
 */

export interface GitHubWebhookEvent {
  action?: string
  repository?: GitHubRepository
  sender?: GitHubUser
  issue?: GitHubIssue
  pull_request?: GitHubPullRequest
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  owner: GitHubUser
  private: boolean
  html_url: string
  description?: string
  fork: boolean
  default_branch: string
}

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body?: string
  state: 'open' | 'closed'
  user: GitHubUser
  created_at: string
  updated_at: string
  html_url: string
}

export interface GitHubPullRequest {
  id: number
  number: number
  title: string
  body?: string
  state: 'open' | 'closed'
  user: GitHubUser
  head: GitHubBranch
  base: GitHubBranch
  created_at: string
  updated_at: string
  html_url: string
}

export interface GitHubBranch {
  ref: string
  sha: string
  repo: GitHubRepository
}

export interface GitHubAppConfig {
  appId: string
  privateKey: string
  installationId: string
  webhookSecret: string
}

export interface GitHubInstallationToken {
  token: string
  expires_at: string
}
