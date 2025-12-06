/**
 * Project Dashboard API Endpoint
 * GET /api/foreman/projects/[id]/dashboard
 * Returns complete dashboard data for a project
 */

import { NextRequest, NextResponse } from 'next/server'
import { getProject, generateDashboardResponse } from '@/lib/foreman/projects'

interface RouteContext {
  params: {
    id: string
  }
}

/**
 * GET /api/foreman/projects/[id]/dashboard
 * Returns full DashboardResponse object
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

    // Generate dashboard response
    const dashboard = await generateDashboardResponse(project)

    console.info(`[Dashboard API] Generated dashboard for project: ${projectId}`)

    return NextResponse.json(dashboard)

  } catch (error) {
    console.error('[Dashboard API] Error generating dashboard:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
