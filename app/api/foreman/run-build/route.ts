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
import { generateBuildReport, saveBuildReport } from '@/lib/foreman/build-report'

interface RunBuildRequest {
  organisationId: string
  triggerSource?: 'webhook' | 'issue_command' | 'scheduled'
  triggerContext?: any
  autonomousBuildEnabled?: boolean
  skipArchitectureAnalysis?: boolean
  // Pilot wave options
  pilotWave?: boolean
  waveNumber?: number
  feature?: string
  // PR creation options
  createPR?: boolean
  owner?: string
  repo?: string
  branch?: string
  baseBranch?: string
  // Report generation options
  generateReport?: boolean
}

interface RunBuildResponse {
  success: boolean
  sequenceId?: string
  status?: BuildSequenceStatus
  message?: string
  prUrl?: string
  reportPath?: string
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
      pilotWave = false,
      waveNumber,
      feature,
      createPR = false,
      owner,
      repo,
      branch,
      baseBranch = 'main',
      generateReport = true
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
      autonomousBuildEnabled,
      pilotWave,
      waveNumber,
      feature
    })
    
    // Merge pilot wave context into trigger context
    const mergedTriggerContext = {
      ...triggerContext,
      pilotWave,
      waveNumber,
      feature
    }
    
    // Configure build sequence
    const config: BuildSequenceConfig = {
      organisationId,
      triggerSource,
      triggerContext: mergedTriggerContext,
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
    
    // Generate build report
    let reportPath: string | undefined
    
    if (generateReport) {
      try {
        const gitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_SHA || 'unknown'
        const foremanVersion = process.env.npm_package_version || '0.1.0'
        
        if (gitSha === 'unknown') {
          console.warn('[RunBuild] Git SHA not available from environment variables')
        }
        
        const report = generateBuildReport(sequence, {
          pilotWave,
          waveNumber,
          feature,
          gitSha,
          foremanVersion
        })
        
        const filename = pilotWave 
          ? `FOREMAN_PILOT_BUILD_REPORT.md`
          : `FOREMAN_BUILD_REPORT_${sequence.id}.md`
        
        reportPath = saveBuildReport(report, filename)
        
        console.log('[RunBuild] Build report generated:', reportPath)
        
      } catch (reportError) {
        console.error('[RunBuild] Failed to generate report:', reportError)
        // Don't fail the entire build sequence if report generation fails
      }
    }
    
    // Optionally create PR
    let prUrl: string | undefined
    
    if (createPR && owner && repo && branch) {
      try {
        // Assemble PR context
        const prContext = assemblePRContext(
          sequence.tasks,
          sequence.qaResults,
          pilotWave 
            ? `Pilot Build Wave ${waveNumber || 1}: ${feature || 'Feature Implementation'}`
            : `Build sequence ${sequence.id} implementation`
        )
        
        // Create pull request
        // NOTE: PR Gatekeeper is enforced in build-sequence.ts before this point
        // The gatekeeper check in createPullRequest is a safety net
        prUrl = await createPullRequest(
          owner,
          repo,
          branch,
          baseBranch,
          prContext,
          {
            buildId: sequence.id,
            sequenceId: sequence.id,
            skipGatekeeperCheck: false, // Always enforce gatekeeper
          }
        )
        
        sequence.prUrl = prUrl
        
        console.log('[RunBuild] Pull request created:', prUrl)
        
      } catch (prError) {
        console.error('[RunBuild] Failed to create PR:', prError)
        console.error('[RunBuild] This may indicate a governance violation or QIEL failure')
        
        // PR creation failure is now a critical error - don't silently swallow it
        // The build sequence should have been blocked earlier if QIEL failed
        // If we get here with a PR error, it's likely a GitHub API issue
        const errorMessage = prError instanceof Error ? prError.message : 'Unknown error'
        
        // Check if this is a governance block
        if (errorMessage.includes('PR blocked by governance')) {
          console.error('[RunBuild] CRITICAL: PR blocked by governance after build completion')
          console.error('[RunBuild] This indicates the PR Gatekeeper was not enforced in build-sequence.ts')
          
          // Fail the entire request to surface the governance issue
          return NextResponse.json<RunBuildResponse>(
            {
              success: false,
              error: errorMessage,
              message: 'PR creation blocked by governance enforcement'
            },
            { status: 403 } // Forbidden - governance violation
          )
        }
        
        // For other errors (e.g., GitHub API issues), log but don't fail the build
        console.warn('[RunBuild] PR creation failed but build sequence completed')
      }
    }
    
    return NextResponse.json<RunBuildResponse>({
      success: true,
      sequenceId: sequence.id,
      status: sequence.status,
      prUrl,
      reportPath,
      message: sequence.status === 'awaiting_approval'
        ? 'Build sequence created. Tasks await manual approval.'
        : pilotWave
        ? `Pilot Build Wave ${waveNumber || 1} completed successfully.`
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
