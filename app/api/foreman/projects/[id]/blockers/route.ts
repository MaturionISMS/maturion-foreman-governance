/**
 * Project Blockers API Endpoint
 * GET /api/foreman/projects/[id]/blockers
 * Returns blocker list with severity indicators
 */

import { NextRequest, NextResponse } from 'next/server'
import { getProject, getDashboardBlockers } from '@/lib/foreman/projects'

interface RouteContext {
  params: {
    id: string
  }
}

/**
 * GET /api/foreman/projects/[id]/blockers
 * Returns blocker list + severity indicators
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const projectId = context.params.id

    // Validate project ID
    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project ID is required'
        },
        { status: 400 }
      )
    }

    // Load project
    const project = await getProject(projectId)

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: `Project not found: ${projectId}`
        },
        { status: 404 }
      )
    }

    // Get blockers
    const blockers = await getDashboardBlockers(project)

    // Calculate blocker statistics
    const activeBlockers = blockers.filter(b => !b.resolvedAt)
    const resolvedBlockers = blockers.filter(b => b.resolvedAt)
    
    const severityCounts = {
      critical: activeBlockers.filter(b => b.severity === 'critical').length,
      high: activeBlockers.filter(b => b.severity === 'high').length,
      medium: activeBlockers.filter(b => b.severity === 'medium').length,
      low: activeBlockers.filter(b => b.severity === 'low').length
    }

    console.info(`[Blockers API] Retrieved blockers for project: ${projectId} (${activeBlockers.length} active, ${resolvedBlockers.length} resolved)`)

    return NextResponse.json({
      projectId: project.id,
      projectName: project.name,
      blockers,
      summary: {
        total: blockers.length,
        active: activeBlockers.length,
        resolved: resolvedBlockers.length,
        severityCounts
      }
    })

  } catch (error) {
    console.error('[Blockers API] Error retrieving blockers:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
