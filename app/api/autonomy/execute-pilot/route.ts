/**
 * Autonomy Pilot Execution API Endpoint
 * 
 * POST /api/autonomy/execute-pilot
 * 
 * Executes the autonomous pilot flow for a selected issue.
 * 
 * Body:
 * {
 *   "owner": "MaturionISMS",
 *   "repo": "maturion-foreman-app",
 *   "issueNumber": 123
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { executeAutonomousPilot, PilotIssue } from '@/lib/foreman/autonomy/execution-flow'
import { Octokit } from 'octokit'

async function getGitHubClient(): Promise<Octokit> {
  const token = process.env.GITHUB_MCP_TOKEN || process.env.GITHUB_TOKEN
  
  if (!token) {
    throw new Error('GitHub authentication token not configured')
  }
  
  return new Octokit({ auth: token })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { owner, repo, issueNumber } = body
    
    if (!owner || !repo || !issueNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: owner, repo, issueNumber' },
        { status: 400 }
      )
    }
    
    // Fetch issue from GitHub
    const octokit = await getGitHubClient()
    const { data: issueData } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber
    })
    
    // Convert to PilotIssue format
    const issue: PilotIssue = {
      number: issueData.number,
      title: issueData.title,
      labels: issueData.labels.map((label: any) => 
        typeof label === 'string' ? label : label.name || ''
      ),
      body: issueData.body || '',
      state: issueData.state
    }
    
    // Execute autonomous pilot
    const result = await executeAutonomousPilot(owner, repo, issue)
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 500
    })
  } catch (error: any) {
    console.error('[Pilot Execution API] Error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to execute autonomous pilot',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
