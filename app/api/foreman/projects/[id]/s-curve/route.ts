/**
 * Project S-Curve API Endpoint
 * GET /api/foreman/projects/[id]/s-curve
 * Returns S-curve time series data for UI graphing
 */

import { NextRequest, NextResponse } from 'next/server'
import { getProject, getDashboardSCurve } from '@/lib/foreman/projects'

interface RouteContext {
  params: {
    id: string
  }
}

/**
 * GET /api/foreman/projects/[id]/s-curve
 * Returns S-curve time series for UI graphing
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

    // Generate S-curve data
    const sCurveData = await getDashboardSCurve(project)

    console.info(`[S-Curve API] Generated S-curve data for project: ${projectId} (${sCurveData.length} points)`)

    return NextResponse.json({
      projectId: project.id,
      projectName: project.name,
      data: sCurveData
    })

  } catch (error) {
    console.error('[S-Curve API] Error generating S-curve:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
