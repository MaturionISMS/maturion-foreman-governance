/**
 * Chat Executor
 * Receives actions from chat route, converts to build tasks, routes via dispatch
 */

import { ForemanAction } from '@/types/foreman'
import { BuilderType, BuilderRequest } from '@/types/builder'
import { BuildSequenceConfig } from '@/types/build-sequence'
import { dispatchBuilderTask, executeBuilderTask, isAutonomousModeEnabled } from './dispatch'
import { runBuildSequence } from './build-sequence'
import { foremanLogger, LogLevel } from '@/lib/logging/foremanLogger'
import { runSelfTest } from './run-self-test'

export interface ChatExecutionResult {
  success: boolean
  sequenceId?: string
  taskIds?: string[]
  prUrl?: string
  error?: string
  statusUpdates: ChatStatusUpdate[]
}

export interface ChatStatusUpdate {
  timestamp: Date
  status: 'planning' | 'selecting_builder' | 'running' | 'qa_phase' | 'opening_pr' | 'complete' | 'error'
  message: string
  metadata?: Record<string, any>
}

/**
 * Execute actions from chat interface
 */
export async function executeChatActions(
  actions: ForemanAction[],
  organisationId: string,
  conversationId: string
): Promise<ChatExecutionResult> {
  const statusUpdates: ChatStatusUpdate[] = []
  const taskIds: string[] = []

  try {
    // Log chat command
    foremanLogger.logChatCommand({
      timestamp: new Date(),
      organisationId,
      conversationId,
      command: actions.map(a => a.type).join(', '),
      parsedActions: actions,
      autonomyMode: isAutonomousModeEnabled(),
    })

    // Add planning status
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: 'Planning build...',
    })

    // Check autonomy mode
    const autonomousMode = isAutonomousModeEnabled()
    
    if (!autonomousMode) {
      // In manual mode, create tasks but don't execute
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Waiting for admin approval. Autonomy mode is disabled.',
      })

      return {
        success: false,
        statusUpdates,
        error: 'Autonomy mode disabled. Tasks require manual approval.',
      }
    }

    // Process each action
    for (const action of actions) {
      if (action.type === 'RUN_BUILD_WAVE') {
        // Execute build wave
        const result = await executeBuildWave(
          action,
          organisationId,
          statusUpdates
        )
        if (result.sequenceId) {
          return {
            success: true,
            sequenceId: result.sequenceId,
            prUrl: result.prUrl,
            statusUpdates,
          }
        }
      } else if (action.type === 'SELF_TEST') {
        // Execute self-test
        const result = await executeSelfTest(organisationId, statusUpdates)
        return {
          success: result.success,
          statusUpdates,
        }
      } else if (action.type === 'TRIGGER_BUILDER_TASK' || action.type === 'BUILDER_TASK') {
        // Execute builder task
        const result = await executeBuilderAction(
          action,
          organisationId,
          statusUpdates
        )
        if (result.taskId) {
          taskIds.push(result.taskId)
        }
      } else if (action.type === 'CREATE_FEATURE') {
        // Execute feature creation (build sequence)
        const result = await executeFeatureCreation(
          action,
          organisationId,
          statusUpdates
        )
        if (result.sequenceId) {
          return {
            success: true,
            sequenceId: result.sequenceId,
            prUrl: result.prUrl,
            statusUpdates,
          }
        }
      } else if (action.type === 'QA_RUN') {
        // Execute QA run
        const result = await executeQARun(
          action,
          organisationId,
          statusUpdates
        )
        if (result.taskId) {
          taskIds.push(result.taskId)
        }
      }
    }

    // Add complete status
    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: 'Build complete',
    })

    return {
      success: true,
      taskIds,
      statusUpdates,
    }
  } catch (error) {
    foremanLogger.logError({
      timestamp: new Date(),
      errorType: 'ChatExecutionError',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      context: { organisationId, conversationId, actionsCount: actions.length },
    })

    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Execution failed',
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      statusUpdates,
    }
  }
}

/**
 * Execute build wave action
 */
async function executeBuildWave(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ sequenceId?: string; prUrl?: string }> {
  statusUpdates.push({
    timestamp: new Date(),
    status: 'planning',
    message: `Planning build wave: ${action.params.wave}`,
  })

  const config: BuildSequenceConfig = {
    organisationId,
    triggerSource: 'issue_command',
    triggerContext: {
      wave: action.params.wave,
      module: action.params.module,
    },
    autonomousBuildEnabled: true,
  }

  statusUpdates.push({
    timestamp: new Date(),
    status: 'selecting_builder',
    message: 'Selecting builders...',
  })

  const sequence = await runBuildSequence(config)

  foremanLogger.logExecutionPhase({
    timestamp: new Date(),
    sequenceId: sequence.id,
    phase: 'build_wave',
    status: sequence.status === 'completed' ? 'completed' : 'failed',
  })

  if (sequence.status === 'completed') {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: 'Build wave completed successfully',
      metadata: {
        sequenceId: sequence.id,
        tasksCompleted: sequence.tasks.length,
      },
    })

    return {
      sequenceId: sequence.id,
      prUrl: sequence.prUrl,
    }
  }

  return {}
}

/**
 * Execute self-test action
 */
async function executeSelfTest(
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean }> {
  statusUpdates.push({
    timestamp: new Date(),
    status: 'running',
    message: 'Running self-test...',
  })

  const result = await runSelfTest()

  foremanLogger.log(
    result.success ? LogLevel.INFO : LogLevel.ERROR,
    'SelfTest',
    `Self-test ${result.success ? 'passed' : 'failed'}`,
    {
      checksRun: result.checks.length,
      passed: result.checks.filter(c => c.status === 'passed').length,
      failed: result.checks.filter(c => c.status === 'failed').length,
    }
  )

  statusUpdates.push({
    timestamp: new Date(),
    status: result.success ? 'complete' : 'error',
    message: result.success ? 'Self-test passed' : 'Self-test failed',
    metadata: {
      checks: result.checks.length,
      passed: result.checks.filter(c => c.status === 'passed').length,
      failed: result.checks.filter(c => c.status === 'failed').length,
    },
  })

  return { success: result.success }
}

/**
 * Execute builder action
 */
async function executeBuilderAction(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ taskId?: string }> {
  const builder = (action.params.builder || 'api') as BuilderType
  
  statusUpdates.push({
    timestamp: new Date(),
    status: 'selecting_builder',
    message: `${builder} builder selected`,
  })

  foremanLogger.logBuilderSelection({
    timestamp: new Date(),
    taskId: 'pending',
    builder,
    reason: 'Chat command',
    organisationId,
  })

  const request: BuilderRequest = {
    module: action.params.module || 'chat-task',
    taskDescription: action.params.task_description || action.params.instruction || 'Chat-triggered task',
    organisationId,
    context: action.params.context || {},
  }

  statusUpdates.push({
    timestamp: new Date(),
    status: 'running',
    message: `${builder} builder is active`,
  })

  const task = await dispatchBuilderTask(builder, request)
  
  foremanLogger.logExecutionPhase({
    timestamp: new Date(),
    sequenceId: task.id,
    phase: 'builder_task',
    status: 'started',
  })

  // Execute if already approved (autonomous mode)
  if (task.approved) {
    await executeBuilderTask(task.id)
    
    statusUpdates.push({
      timestamp: new Date(),
      status: 'qa_phase',
      message: 'Running QA phase...',
    })

    // QA is handled by executeBuilderTask
    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: 'Builder task complete',
    })
  }

  return { taskId: task.id }
}

/**
 * Execute feature creation (build sequence)
 */
async function executeFeatureCreation(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ sequenceId?: string; prUrl?: string }> {
  statusUpdates.push({
    timestamp: new Date(),
    status: 'planning',
    message: `Planning feature: ${action.params.feature}`,
  })

  const config: BuildSequenceConfig = {
    organisationId,
    triggerSource: 'issue_command',
    triggerContext: {
      module: action.params.module,
      feature: action.params.feature,
    },
    autonomousBuildEnabled: true,
  }

  const sequence = await runBuildSequence(config)

  if (sequence.status === 'completed') {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: 'Feature created successfully',
      metadata: {
        sequenceId: sequence.id,
      },
    })

    return {
      sequenceId: sequence.id,
      prUrl: sequence.prUrl,
    }
  }

  return {}
}

/**
 * Execute QA run
 */
async function executeQARun(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ taskId?: string }> {
  statusUpdates.push({
    timestamp: new Date(),
    status: 'qa_phase',
    message: `Running QA on: ${action.params.target}`,
  })

  const request: BuilderRequest = {
    module: 'qa-validation',
    taskDescription: `Run QA validation on ${action.params.target}`,
    organisationId,
    context: {
      target: action.params.target,
    },
  }

  const task = await dispatchBuilderTask('qa', request)

  if (task.approved) {
    await executeBuilderTask(task.id)
    
    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: 'QA run complete',
    })
  }

  return { taskId: task.id }
}
