/**
 * Build Cycle Orchestrator Route
 * Triggered by webhooks, issue commands, or scheduled checks
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  runBuildSequence, 
  getBuildSequence, 
  listBuildSequences 
} from '@/lib/foreman/build-sequence'
import { BuildSequenceConfig, BuildSequenceStatus } from '@/types/build-sequence'
import { assemblePRContext, createPullRequest } from '@/lib/github/pr-builder'

interface RunBuildRequest {
  organisationId: string
  triggerSource?: 'webhook' | 'issue_command' | 'scheduled'
  triggerContext?: any
  autonomousBuildEnabled?: boolean
  skipArchitectureAnalysis?: boolean
  // PR creation options
  createPR?: boolean
  owner?: string
  repo?: string
  branch?: string
  baseBranch?: string
}

interface RunBuildResponse {
  success: boolean
  sequenceId?: string
  status?: BuildSequenceStatus
  message?: string
  prUrl?: string
  error?: string
}

/**
 * POST /api/foreman/run-build
 * Start a new build sequence
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RunBuildRequest
    const { 
      organisationId, 
      triggerSource = 'issue_command',
      triggerContext,
      autonomousBuildEnabled,
      skipArchitectureAnalysis,
      createPR = false,
      owner,
      repo,
      branch,
      baseBranch = 'main'
    } = body
    
    // Validate required fields
    if (!organisationId) {
      return NextResponse.json<RunBuildResponse>(
        {
          success: false,
          error: 'Missing required field: organisationId'
        },
        { status: 400 }
      )
    }
    
    // Validate PR creation requirements
    if (createPR && (!owner || !repo || !branch)) {
      return NextResponse.json<RunBuildResponse>(
        {
          success: false,
          error: 'PR creation requires: owner, repo, branch'
        },
        { status: 400 }
      )
    }
    
    console.log('[RunBuild] Starting build sequence:', {
      organisationId,
      triggerSource,
      autonomousBuildEnabled
    })
    
    // Configure build sequence
    const config: BuildSequenceConfig = {
      organisationId,
      triggerSource,
      triggerContext,
      autonomousBuildEnabled,
      skipArchitectureAnalysis
    }
    
    // Run build sequence
    const sequence = await runBuildSequence(config)
    
    console.log('[RunBuild] Build sequence completed:', {
      sequenceId: sequence.id,
      status: sequence.status,
      tasksCreated: sequence.tasks.length,
      qaResults: sequence.qaResults.length
    })
    
    // Optionally create PR
    let prUrl: string | undefined
    
    if (createPR && owner && repo && branch) {
      try {
        // Assemble PR context
        const prContext = assemblePRContext(
          sequence.tasks,
          sequence.qaResults,
          `Build sequence ${sequence.id} implementation`
        )
        
        // Create pull request
        prUrl = await createPullRequest(
          owner,
          repo,
          branch,
          baseBranch,
          prContext
        )
        
        sequence.prUrl = prUrl
        
        console.log('[RunBuild] Pull request created:', prUrl)
        
      } catch (prError) {
        console.error('[RunBuild] Failed to create PR:', prError)
        // Don't fail the entire build sequence if PR creation fails
      }
    }
    
    return NextResponse.json<RunBuildResponse>({
      success: true,
      sequenceId: sequence.id,
      status: sequence.status,
      prUrl,
      message: sequence.status === 'awaiting_approval'
        ? 'Build sequence created. Tasks await manual approval.'
        : 'Build sequence completed successfully.'
    })
    
  } catch (error) {
    console.error('[RunBuild] Build sequence error:', error)
    return NextResponse.json<RunBuildResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/foreman/run-build
 * Get build sequence status or list sequences
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sequenceId = searchParams.get('sequenceId')
  const organisationId = searchParams.get('organisationId')
  const status = searchParams.get('status') as BuildSequenceStatus | null
  
  try {
    if (sequenceId) {
      // Get specific sequence
      const sequence = getBuildSequence(sequenceId)
      
      if (!sequence) {
        return NextResponse.json<RunBuildResponse>(
          {
            success: false,
            error: 'Build sequence not found'
          },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        sequence
      })
    }
    
    // List sequences with optional filters
    const filter: {
      organisationId?: string
      status?: BuildSequenceStatus
    } = {}
    
    if (organisationId) {
      filter.organisationId = organisationId
    }
    
    if (status) {
      filter.status = status
    }
    
    const sequences = listBuildSequences(filter)
    
    return NextResponse.json({
      success: true,
      count: sequences.length,
      sequences: sequences.map(s => ({
        id: s.id,
        organisationId: s.organisationId,
        status: s.status,
        tasksCount: s.tasks.length,
        qaResultsCount: s.qaResults.length,
        prUrl: s.prUrl,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        completedAt: s.completedAt
      }))
    })
    
  } catch (error) {
    console.error('[RunBuild] Error fetching build sequences:', error)
    return NextResponse.json<RunBuildResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
