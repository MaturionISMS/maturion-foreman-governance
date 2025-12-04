import { NextRequest, NextResponse } from 'next/server'
import { loadGovernanceRules, interpretGovernance } from '@/lib/foreman/interpret-governance'
import { runBuildWave } from '@/lib/foreman/run-build-wave'
import { runSelfTest } from '@/lib/foreman/run-self-test'
import { applyFileChanges } from '@/lib/foreman/apply-file-changes'

/**
 * Foreman Run API
 * Manually trigger Foreman tasks
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskName, params = {} } = body
    
    console.log('Running Foreman task:', taskName)
    console.log('Parameters:', params)
    
    let result
    
    // Route to matching function in lib/foreman/*
    switch (taskName) {
      case 'interpret-governance':
        if (params.owner && params.repo) {
          const rules = await loadGovernanceRules(params.owner, params.repo)
          result = await interpretGovernance(rules, params.context || {})
        } else {
          return NextResponse.json(
            { ok: false, error: 'Missing required params: owner, repo' },
            { status: 400 }
          )
        }
        break
      
      case 'run-build-wave':
        result = await runBuildWave(params.waveConfig || {})
        break
      
      case 'run-self-test':
        result = await runSelfTest()
        break
      
      case 'apply-file-changes':
        if (params.owner && params.repo && params.branch && params.changes) {
          result = await applyFileChanges(
            params.owner,
            params.repo,
            params.branch,
            params.changes,
            params.commitMessage || 'Apply file changes'
          )
        } else {
          return NextResponse.json(
            { ok: false, error: 'Missing required params: owner, repo, branch, changes' },
            { status: 400 }
          )
        }
        break
      
      default:
        return NextResponse.json(
          { ok: false, error: `Unknown task: ${taskName}` },
          { status: 400 }
        )
    }
    
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    console.error('Foreman run error:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to run Foreman task' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Foreman run endpoint',
    method: 'POST only',
    availableTasks: [
      'interpret-governance',
      'run-build-wave',
      'run-self-test',
      'apply-file-changes'
    ],
    example: {
      taskName: 'run-self-test',
      params: {}
    }
  })
}
