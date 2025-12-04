/**
 * Admin Approval API Endpoint
 * Handles approval/rejection of builder tasks
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  approveTask, 
  rejectTask, 
  getBuilderTask, 
  listBuilderTasks,
  executeBuilderTask,
  validateGovernanceRules
} from '@/lib/foreman/dispatch'
import { BuilderTaskStatus, BuilderType } from '@/types/builder'

interface ApprovalRequest {
  taskId: string
  action: 'approve' | 'reject'
  adminId: string
  reason?: string
  executeImmediately?: boolean
}

interface ApprovalResponse {
  success: boolean
  taskId?: string
  status?: BuilderTaskStatus
  message?: string
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ApprovalRequest
    const { taskId, action, adminId, reason, executeImmediately = false } = body
    
    // Validate required fields
    if (!taskId || !action || !adminId) {
      return NextResponse.json<ApprovalResponse>(
        {
          success: false,
          error: 'Missing required fields: taskId, action, adminId'
        },
        { status: 400 }
      )
    }
    
    // Validate action
    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json<ApprovalResponse>(
        {
          success: false,
          error: 'Invalid action. Must be "approve" or "reject"'
        },
        { status: 400 }
      )
    }
    
    // Get task
    const task = getBuilderTask(taskId)
    if (!task) {
      return NextResponse.json<ApprovalResponse>(
        {
          success: false,
          error: `Task not found: ${taskId}`
        },
        { status: 404 }
      )
    }
    
    // Validate governance rules
    if (!validateGovernanceRules(task)) {
      return NextResponse.json<ApprovalResponse>(
        {
          success: false,
          error: 'Task violates governance rules'
        },
        { status: 403 }
      )
    }
    
    let updatedTask
    
    if (action === 'approve') {
      // Approve task
      updatedTask = approveTask(taskId, adminId)
      
      console.log('[Admin] Task approved:', {
        taskId,
        approvedBy: adminId,
        builder: task.builder,
        module: task.module
      })
      
      // Optionally execute immediately
      if (executeImmediately) {
        console.log('[Admin] Executing task immediately:', taskId)
        updatedTask = await executeBuilderTask(taskId)
      }
      
      return NextResponse.json<ApprovalResponse>({
        success: true,
        taskId: updatedTask.id,
        status: updatedTask.status,
        message: executeImmediately 
          ? `Task approved and executed by ${adminId}`
          : `Task approved by ${adminId}. Ready for execution.`
      })
      
    } else {
      // Reject task
      updatedTask = rejectTask(taskId, adminId, reason)
      
      console.log('[Admin] Task rejected:', {
        taskId,
        rejectedBy: adminId,
        reason: reason || 'No reason provided'
      })
      
      return NextResponse.json<ApprovalResponse>({
        success: true,
        taskId: updatedTask.id,
        status: updatedTask.status,
        message: `Task rejected by ${adminId}`
      })
    }
    
  } catch (error) {
    console.error('[Admin] Approval error:', error)
    return NextResponse.json<ApprovalResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const taskId = searchParams.get('taskId')
  const status = searchParams.get('status') as BuilderTaskStatus | null
  const pendingOnly = searchParams.get('pending') === 'true'
  
  if (taskId) {
    // Get specific task
    const task = getBuilderTask(taskId)
    
    if (!task) {
      return NextResponse.json<ApprovalResponse>(
        {
          success: false,
          error: 'Task not found'
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      task
    })
  }
  
  // List tasks (with optional filters)
  const filter: {
    builder?: BuilderType
    status?: BuilderTaskStatus
    approved?: boolean
  } = {}
  
  if (status) {
    filter.status = status
  }
  
  if (pendingOnly) {
    filter.status = 'pending_approval'
    filter.approved = false
  }
  
  const tasks = listBuilderTasks(filter)
  
  return NextResponse.json({
    success: true,
    count: tasks.length,
    tasks: tasks.map(t => ({
      id: t.id,
      builder: t.builder,
      module: t.module,
      taskDescription: t.taskDescription,
      status: t.status,
      approved: t.approved,
      approvedBy: t.approvedBy,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }))
  })
}
