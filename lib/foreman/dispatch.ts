/**
 * Foreman → Builder Dispatch Logic
 * Handles routing of tasks to appropriate builders with governance enforcement
 */

import { BuilderType, BuilderRequest, BuilderTask, BuilderTaskStatus } from '@/types/builder'
import { getBuilderCapability, isTaskTypeSupported } from '@/lib/builder/capabilities'

/**
 * In-memory task store (in production, this would be a database)
 */
const taskStore = new Map<string, BuilderTask>()

/**
 * Generate unique task ID
 */
function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

/**
 * Dispatch a task to a builder
 * This enforces governance rules and requires admin approval
 */
export async function dispatchBuilderTask(
  builder: BuilderType,
  request: BuilderRequest
): Promise<BuilderTask> {
  console.log(`[Dispatch] Dispatching task to ${builder} builder`)
  
  // Validate organisation ID is present
  if (!request.organisationId) {
    throw new Error('organisation_id is required for all builder tasks')
  }
  
  // Validate builder capability
  const capability = getBuilderCapability(builder)
  if (!capability) {
    throw new Error(`Unknown builder type: ${builder}`)
  }
  
  // Validate required fields
  const requiredFields = capability.inputFormat.required
  for (const field of requiredFields) {
    if (!(field in request) || !request[field as keyof BuilderRequest]) {
      throw new Error(`Missing required field: ${field}`)
    }
  }
  
  // Create task in pending approval state
  const task: BuilderTask = {
    id: generateTaskId(),
    builder,
    module: request.module,
    taskDescription: request.taskDescription,
    status: 'pending_approval',
    approved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    input: {
      ...request,
      context: request.context || {},
      metadata: request.metadata || {}
    }
  }
  
  // Store task
  taskStore.set(task.id, task)
  
  console.log(`[Dispatch] Task ${task.id} created and awaiting approval`)
  console.log(`[Dispatch] Task details:`, {
    builder: task.builder,
    module: task.module,
    description: task.taskDescription
  })
  
  return task
}

/**
 * Get task by ID
 */
export function getBuilderTask(taskId: string): BuilderTask | undefined {
  return taskStore.get(taskId)
}

/**
 * List all tasks
 */
export function listBuilderTasks(filter?: {
  builder?: BuilderType
  status?: BuilderTaskStatus
  approved?: boolean
}): BuilderTask[] {
  let tasks = Array.from(taskStore.values())
  
  if (filter?.builder) {
    tasks = tasks.filter(t => t.builder === filter.builder)
  }
  
  if (filter?.status) {
    tasks = tasks.filter(t => t.status === filter.status)
  }
  
  if (filter?.approved !== undefined) {
    tasks = tasks.filter(t => t.approved === filter.approved)
  }
  
  return tasks
}

/**
 * Update task status
 */
export function updateTaskStatus(
  taskId: string,
  status: BuilderTaskStatus,
  output?: any
): BuilderTask {
  const task = taskStore.get(taskId)
  
  if (!task) {
    throw new Error(`Task not found: ${taskId}`)
  }
  
  task.status = status
  task.updatedAt = new Date()
  
  if (output) {
    task.output = output
  }
  
  taskStore.set(taskId, task)
  console.log(`[Dispatch] Task ${taskId} status updated to: ${status}`)
  
  return task
}

/**
 * Approve a task
 * This is called by the admin approval endpoint
 */
export function approveTask(
  taskId: string,
  approvedBy: string
): BuilderTask {
  const task = taskStore.get(taskId)
  
  if (!task) {
    throw new Error(`Task not found: ${taskId}`)
  }
  
  if (task.approved) {
    throw new Error(`Task ${taskId} is already approved`)
  }
  
  task.approved = true
  task.approvedBy = approvedBy
  task.approvedAt = new Date()
  task.status = 'approved'
  task.updatedAt = new Date()
  
  taskStore.set(taskId, task)
  console.log(`[Dispatch] Task ${taskId} approved by: ${approvedBy}`)
  
  return task
}

/**
 * Reject a task
 */
export function rejectTask(
  taskId: string,
  rejectedBy: string,
  reason?: string
): BuilderTask {
  const task = taskStore.get(taskId)
  
  if (!task) {
    throw new Error(`Task not found: ${taskId}`)
  }
  
  task.status = 'rejected'
  task.updatedAt = new Date()
  task.error = reason || 'Task rejected by admin'
  
  taskStore.set(taskId, task)
  console.log(`[Dispatch] Task ${taskId} rejected by: ${rejectedBy}`)
  
  return task
}

/**
 * Execute an approved task
 * This delegates to the actual builder (GitHub App or OpenAI)
 */
export async function executeBuilderTask(taskId: string): Promise<BuilderTask> {
  const task = taskStore.get(taskId)
  
  if (!task) {
    throw new Error(`Task not found: ${taskId}`)
  }
  
  if (!task.approved) {
    throw new Error(`Task ${taskId} has not been approved`)
  }
  
  if (task.status !== 'approved') {
    throw new Error(`Task ${taskId} is not in approved state (current: ${task.status})`)
  }
  
  console.log(`[Dispatch] Executing task ${taskId} with builder: ${task.builder}`)
  
  // Update status to running
  task.status = 'running'
  task.updatedAt = new Date()
  taskStore.set(taskId, task)
  
  try {
    // TODO: Actual builder execution logic
    // This would call GitHub API or OpenAI API depending on builder type
    // For now, we simulate success
    
    const output = {
      success: true,
      data: {
        message: `Task executed by ${task.builder} builder`,
        taskId: task.id
      },
      artifacts: [],
      qaResults: []
    }
    
    task.status = 'completed'
    task.output = output
    task.updatedAt = new Date()
    
    console.log(`[Dispatch] Task ${taskId} completed successfully`)
  } catch (error) {
    task.status = 'failed'
    task.error = error instanceof Error ? error.message : 'Unknown error'
    task.updatedAt = new Date()
    
    console.error(`[Dispatch] Task ${taskId} failed:`, error)
  }
  
  taskStore.set(taskId, task)
  return task
}

/**
 * Validate governance rules for a task
 * This enforces that builders never write code without approval
 */
export function validateGovernanceRules(task: BuilderTask): boolean {
  // Rule 1: Task must have organisation_id
  if (!task.input?.organisationId) {
    console.error('[Governance] Violation: Missing organisation_id')
    return false
  }
  
  // Rule 2: Task must be approved before execution
  if (!task.approved && task.status !== 'pending_approval') {
    console.error('[Governance] Violation: Task execution without approval')
    return false
  }
  
  // Rule 3: Task must have valid builder type
  const validBuilders: BuilderType[] = ['ui', 'api', 'schema', 'integration', 'qa']
  if (!validBuilders.includes(task.builder)) {
    console.error('[Governance] Violation: Invalid builder type')
    return false
  }
  
  // Rule 4: All code-writing tasks must go through QA
  const codeWritingBuilders: BuilderType[] = ['ui', 'api', 'schema', 'integration']
  if (codeWritingBuilders.includes(task.builder) && task.status === 'completed') {
    if (!task.output?.qaResults || task.output.qaResults.length === 0) {
      console.warn('[Governance] Warning: Code-writing task completed without QA results')
      // This is a warning, not a blocker for now
    }
  }
  
  console.log('[Governance] All governance rules passed for task:', task.id)
  return true
}
