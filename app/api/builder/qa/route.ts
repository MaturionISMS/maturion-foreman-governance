/**
 * QA Builder API Endpoint
 * Receives requests to create tests and validate builder outputs
 */

import { NextRequest, NextResponse } from 'next/server'
import { dispatchBuilderTask, getBuilderTask } from '@/lib/foreman/dispatch'
import { BuilderRequest, BuilderResponse } from '@/types/builder'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { module, taskDescription, organisationId } = body as BuilderRequest
    
    if (!module || !taskDescription || !organisationId) {
      return NextResponse.json<BuilderResponse>(
        {
          success: false,
          status: 'error',
          error: 'Missing required fields: module, taskDescription, organisationId'
        },
        { status: 400 }
      )
    }
    
    // Dispatch task to QA builder (requires approval)
    const task = await dispatchBuilderTask('qa', {
      module,
      taskDescription,
      organisationId,
      context: body.context,
      metadata: body.metadata
    })
    
    console.log('[QA Builder] Task created:', task.id)
    
    // Return task ID and pending approval status
    return NextResponse.json<BuilderResponse>({
      success: true,
      taskId: task.id,
      status: task.status,
      message: 'QA builder task created. Awaiting admin approval.'
    })
    
  } catch (error) {
    console.error('[QA Builder] Error:', error)
    return NextResponse.json<BuilderResponse>(
      {
        success: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const taskId = searchParams.get('taskId')
  
  if (taskId) {
    // Get specific task
    const task = getBuilderTask(taskId)
    
    if (!task) {
      return NextResponse.json<BuilderResponse>(
        {
          success: false,
          status: 'error',
          error: 'Task not found'
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json<BuilderResponse>({
      success: true,
      taskId: task.id,
      status: task.status,
      output: task.output
    })
  }
  
  // Return endpoint info
  return NextResponse.json({
    builder: 'qa',
    description: 'QA Builder - Creates tests and validates builder outputs',
    method: 'POST',
    requiredFields: ['module', 'taskDescription', 'organisationId'],
    optionalFields: ['context', 'metadata', 'testSpecs', 'artifactsToValidate'],
    example: {
      module: 'users',
      taskDescription: 'Create unit tests for user service',
      organisationId: 'org_123',
      context: {
        testTypes: ['unit', 'integration'],
        coverage: 80
      }
    }
  })
}
