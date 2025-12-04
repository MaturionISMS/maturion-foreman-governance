/**
 * GitHub Client
 * Handles GitHub API interactions and authentication
 * 
 * TODO: Migrate GitHubClient from lib/github.ts to this file to consolidate GitHub client logic
 * For now, this re-exports the existing implementation to avoid duplication
 */

// Re-export the existing GitHubClient for now
export { GitHubClient, githubClient } from '@/lib/github'
export type { GitHubConfig } from '@/lib/github'
