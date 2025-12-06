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
import { getPilotWave } from './pilot-waves'
import { runPilotQA, updatePilotBuildNotes } from './pilot-qa-check'
import { getRepoConfig } from '@/lib/config/repoRegistry'
import { loadMemoryBeforeAction, writeMemoryAfterAction, recordMilestoneCompletion } from './memory'
import { 
  createProject, 
  updateProject, 
  getProject, 
  findProjectByName,
  completeMilestone,
  getDashboardData,
  getProjectDetail
} from './projects/registry'
import { transitionToPhase, blockProject } from './projects/lifecycle'
import { Project, ProjectPhase } from '@/types/project'
import { MemoryEvent } from '@/types/memory'

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
    // Load memory before action (Memory Before Action doctrine)
    await loadMemoryBeforeAction('foreman', {
      tags: ['wave_completion', 'qa_failure', 'error_escalation'],
      organisationId,
    })

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
    
    // Define safe actions that can execute even without autonomy mode
    const safeActionsSet = new Set([
      'CREATE_PROJECT',
      'GET_PROJECT_STATUS',
      'GET_PROJECT_DASHBOARD',
      'UPDATE_MILESTONES',
      'RECORD_BLOCKER',
      'SELF_TEST',
      'QA_RUN',
    ])
    
    const allActionsSafe = actions.every(action => safeActionsSet.has(action.type))
    
    if (!autonomousMode && !allActionsSafe) {
      // In manual mode, only safe actions can execute
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
      // ========== Project Lifecycle Actions ==========
      if (action.type === 'CREATE_PROJECT') {
        const result = await executeCreateProject(action, organisationId, statusUpdates)
        if (result.projectId) {
          return {
            success: true,
            statusUpdates,
            taskIds: [result.projectId],
          }
        }
      } else if (action.type === 'UPDATE_PHASE') {
        const result = await executeUpdatePhase(action, organisationId, statusUpdates)
        return {
          success: result.success,
          statusUpdates,
        }
      } else if (action.type === 'UPDATE_MILESTONES') {
        const result = await executeUpdateMilestones(action, organisationId, statusUpdates)
        return {
          success: result.success,
          statusUpdates,
        }
      } else if (action.type === 'RECORD_BLOCKER') {
        const result = await executeRecordBlocker(action, organisationId, statusUpdates)
        return {
          success: result.success,
          statusUpdates,
        }
      } else if (action.type === 'GET_PROJECT_STATUS') {
        const result = await executeGetProjectStatus(action, organisationId, statusUpdates)
        return {
          success: result.success,
          statusUpdates,
        }
      } else if (action.type === 'GET_PROJECT_DASHBOARD') {
        const result = await executeGetProjectDashboard(action, organisationId, statusUpdates)
        return {
          success: result.success,
          statusUpdates,
        }
      }
      // ========== Build and QA Actions ==========
      else if (action.type === 'RUN_BUILD_WAVE') {
        // Check if this is a pilot wave by looking up wave configuration
        const waveName = action.params.wave as string
        const pilotWave = waveName ? getPilotWave(waveName) : null
        const isPilotWave = pilotWave?.isPilot === true
        
        if (isPilotWave) {
          // Execute pilot build
          const result = await executePilotBuild(
            action,
            organisationId,
            statusUpdates
          )
          return {
            success: result.success,
            statusUpdates,
            taskIds: result.taskIds,
          }
        } else {
          // Execute regular build wave
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

/**
 * Execute pilot build action
 */
async function executePilotBuild(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean; taskIds?: string[] }> {
  const taskIds: string[] = []
  
  try {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: 'Pilot build started...',
    })
    
    // Get pilot wave configuration
    const pilotWave = getPilotWave('pilot_foreman_sandbox')
    
    if (!pilotWave) {
      throw new Error('Pilot wave configuration not found')
    }
    
    const repoConfig = getRepoConfig(pilotWave.repoTarget)
    
    if (!repoConfig) {
      throw new Error(`Repository configuration not found for ${pilotWave.repoTarget}`)
    }
    
    // Log pilot build start
    foremanLogger.logPilotBuild({
      timestamp: new Date(),
      waveId: pilotWave.id,
      repoTarget: pilotWave.repoTarget,
      status: 'started',
    })
    
    statusUpdates.push({
      timestamp: new Date(),
      status: 'selecting_builder',
      message: 'Dispatching to builder...',
    })
    
    // For pilot builds, we'll simulate builder selection
    // In a real implementation, this would route to actual Copilot or Local Builder
    const builderUsed = 'copilot' // Default to Copilot for pilot builds
    
    foremanLogger.logPilotBuild({
      timestamp: new Date(),
      waveId: pilotWave.id,
      repoTarget: pilotWave.repoTarget,
      status: 'builder_selected',
      builder: builderUsed,
    })
    
    statusUpdates.push({
      timestamp: new Date(),
      status: 'running',
      message: `${builderUsed} builder is active`,
      metadata: { builder: builderUsed },
    })
    
    // Execute pilot wave actions
    for (const waveAction of pilotWave.actions) {
      if (waveAction.type === 'modify_file' && waveAction.path) {
        // Update pilot build notes
        await updatePilotBuildNotes(
          builderUsed,
          'success',
          'pending', // Will be updated after QA
          'sandbox'
        )
      } else if (waveAction.type === 'qa_run') {
        statusUpdates.push({
          timestamp: new Date(),
          status: 'qa_phase',
          message: 'Running QA...',
        })
        
        // Run pilot QA
        const qaResult = await runPilotQA('sandbox')
        
        // Update build notes with QA result
        await updatePilotBuildNotes(
          builderUsed,
          qaResult.passed ? 'success' : 'failed',
          qaResult.passed ? 'passed' : 'failed',
          'sandbox'
        )
        
        foremanLogger.logPilotBuild({
          timestamp: new Date(),
          waveId: pilotWave.id,
          repoTarget: pilotWave.repoTarget,
          status: 'qa_result',
          qaResult: qaResult.passed ? 'passed' : 'failed',
        })
        
        if (!qaResult.passed) {
          throw new Error(`Pilot QA failed: ${qaResult.summary}`)
        }
        
        statusUpdates.push({
          timestamp: new Date(),
          status: 'qa_phase',
          message: `QA ${qaResult.passed ? 'passed' : 'failed'}: ${qaResult.summary}`,
          metadata: { qaResult: qaResult.passed ? 'passed' : 'failed' },
        })
      }
    }
    
    // Note: PR creation would be handled by the build sequence in a real implementation
    // For pilot builds, we're just validating the pipeline
    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: 'Pilot build complete ✅',
      metadata: {
        filesChanged: ['sandbox/PILOT_BUILD_NOTES.md'],
        builderUsed,
      },
    })
    
    foremanLogger.logPilotBuild({
      timestamp: new Date(),
      waveId: pilotWave.id,
      repoTarget: pilotWave.repoTarget,
      status: 'completed',
    })
    
    return { success: true, taskIds }
  } catch (error) {
    foremanLogger.logPilotBuild({
      timestamp: new Date(),
      waveId: 'pilot_foreman_sandbox',
      repoTarget: 'foreman_app_sandbox',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: `Pilot build failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    })
    
    return { success: false }
  }
}

// ============================================================================
// Project Lifecycle Action Handlers
// ============================================================================

/**
 * Execute CREATE_PROJECT action
 */
async function executeCreateProject(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean; projectId?: string }> {
  try {
    const { name, description, owner, conceptData, tags, priority, estimatedCompletion } = action.params

    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: `Creating project: ${name}`,
    })

    // Create project in registry
    const result = await createProject({
      name,
      description,
      owner,
      organisationId,
      conceptData,
      tags,
      priority,
      estimatedCompletion,
    })

    if (!result.success || !result.data) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: `Failed to create project: ${result.error}`,
      })
      return { success: false }
    }

    const project = result.data

    // Write memory entry for project creation
    const memoryEvent: MemoryEvent = {
      type: 'project_state_transition',
      scope: 'project',
      description: `Project created: ${project.name}`,
      data: {
        projectId: project.id,
        projectName: project.name,
        phase: project.phase,
        owner: project.owner,
      },
      timestamp: new Date().toISOString(),
      createdBy: 'foreman',
    }

    await writeMemoryAfterAction(memoryEvent, {
      projectId: project.id,
      organisationId,
    })

    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: `Project created successfully: ${project.name} (${project.id})`,
      metadata: { projectId: project.id, projectName: project.name },
    })

    foremanLogger.log(
      LogLevel.INFO,
      'ProjectLifecycle',
      `Project created: ${project.name} (${project.id})`,
      { organisationId, projectId: project.id }
    )

    return { success: true, projectId: project.id }
  } catch (error) {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create project',
    })
    return { success: false }
  }
}

/**
 * Execute UPDATE_PHASE action
 */
async function executeUpdatePhase(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean }> {
  try {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: `Updating project phase to: ${action.params.phase}`,
    })

    // Get project by ID or name
    let project: Project | null = null
    if (action.params.projectId) {
      project = await getProject(action.params.projectId)
    } else if (action.params.projectName) {
      project = await findProjectByName(action.params.projectName)
    }

    if (!project) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Project not found',
      })
      return { success: false }
    }

    // Transition to new phase
    const transitionResult = transitionToPhase(project, action.params.phase as ProjectPhase, 'foreman')

    if (!transitionResult.success) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: `Phase transition failed: ${transitionResult.error}`,
        metadata: { prerequisites: transitionResult.prerequisites },
      })
      return { success: false }
    }

    // Save updated project
    await updateProject(project.id, { phase: action.params.phase as ProjectPhase })

    // Write memory entry for phase transition
    const memoryEvent: MemoryEvent = {
      type: 'project_state_transition',
      scope: 'project',
      description: `Phase transition: ${transitionResult.previousPhase} → ${transitionResult.newPhase}`,
      data: {
        projectId: project.id,
        projectName: project.name,
        previousPhase: transitionResult.previousPhase,
        newPhase: transitionResult.newPhase,
        milestonesUpdated: transitionResult.milestonesUpdated,
      },
      timestamp: new Date().toISOString(),
      createdBy: 'foreman',
    }

    await writeMemoryAfterAction(memoryEvent, {
      projectId: project.id,
      organisationId,
    })

    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: `Phase updated: ${transitionResult.previousPhase} → ${transitionResult.newPhase}`,
      metadata: { projectId: project.id },
    })

    foremanLogger.log(
      LogLevel.INFO,
      'ProjectLifecycle',
      `Phase transition: ${project.name} (${transitionResult.previousPhase} → ${transitionResult.newPhase})`,
      { organisationId, projectId: project.id }
    )

    return { success: true }
  } catch (error) {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update phase',
    })
    return { success: false }
  }
}

/**
 * Execute UPDATE_MILESTONES action
 */
async function executeUpdateMilestones(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean }> {
  try {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: `Completing milestone: ${action.params.milestoneName || action.params.milestoneId}`,
    })

    // Get project by ID or name
    let project: Project | null = null
    if (action.params.projectId) {
      project = await getProject(action.params.projectId)
    } else if (action.params.projectName) {
      project = await findProjectByName(action.params.projectName)
    }

    if (!project) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Project not found',
      })
      return { success: false }
    }

    // Find milestone by ID or name
    let milestoneId = action.params.milestoneId
    if (!milestoneId && action.params.milestoneName) {
      const milestone = project.milestones.find(
        m => m.name.toLowerCase() === action.params.milestoneName.toLowerCase()
      )
      if (milestone) {
        milestoneId = milestone.id
      }
    }

    if (!milestoneId) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Milestone not found',
      })
      return { success: false }
    }

    // Complete milestone
    const result = await completeMilestone({
      projectId: project.id,
      milestoneId,
      completedBy: action.params.completedBy,
    })

    if (!result.success) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: `Failed to complete milestone: ${result.error}`,
      })
      return { success: false }
    }

    const milestone = project.milestones.find(m => m.id === milestoneId)

    // Write memory entry for milestone completion
    if (milestone) {
      await recordMilestoneCompletion(
        milestone.name,
        {
          projectId: project.id,
          projectName: project.name,
          milestoneId: milestone.id,
          phase: milestone.phase,
          completedBy: action.params.completedBy,
        },
        {
          projectId: project.id,
          organisationId,
        }
      )
    }

    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: `Milestone completed: ${milestone?.name || milestoneId}`,
      metadata: { projectId: project.id, milestoneId },
    })

    foremanLogger.log(
      LogLevel.INFO,
      'ProjectLifecycle',
      `Milestone completed: ${project.name} - ${milestone?.name}`,
      { organisationId, projectId: project.id, milestoneId }
    )

    return { success: true }
  } catch (error) {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to update milestone',
    })
    return { success: false }
  }
}

/**
 * Execute RECORD_BLOCKER action
 */
async function executeRecordBlocker(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean }> {
  try {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: `Recording blocker: ${action.params.description}`,
    })

    // Get project by ID or name
    let project: Project | null = null
    if (action.params.projectId) {
      project = await getProject(action.params.projectId)
    } else if (action.params.projectName) {
      project = await findProjectByName(action.params.projectName)
    }

    if (!project) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Project not found',
      })
      return { success: false }
    }

    // Add blocker to project
    blockProject(project, action.params.description)

    // Update blocker with category and severity if provided
    if (project.blockers && project.blockers.length > 0) {
      const latestBlocker = project.blockers[project.blockers.length - 1]
      if (action.params.category) {
        latestBlocker.category = action.params.category
      }
      if (action.params.severity) {
        latestBlocker.severity = action.params.severity
      }
    }

    // Save updated project
    await updateProject(project.id, { status: 'blocked' })

    // Write memory entry for blocker
    const memoryEvent: MemoryEvent = {
      type: 'error_escalation',
      scope: 'project',
      description: `Blocker added: ${action.params.description}`,
      data: {
        projectId: project.id,
        projectName: project.name,
        blockerDescription: action.params.description,
        category: action.params.category || 'technical',
        severity: action.params.severity || 'medium',
      },
      timestamp: new Date().toISOString(),
      createdBy: 'foreman',
    }

    await writeMemoryAfterAction(memoryEvent, {
      projectId: project.id,
      organisationId,
    })

    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: `Blocker recorded: ${action.params.description}`,
      metadata: { projectId: project.id },
    })

    foremanLogger.log(
      LogLevel.WARN,
      'ProjectLifecycle',
      `Blocker recorded: ${project.name} - ${action.params.description}`,
      { organisationId, projectId: project.id }
    )

    return { success: true }
  } catch (error) {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to record blocker',
    })
    return { success: false }
  }
}

/**
 * Execute GET_PROJECT_STATUS action
 */
async function executeGetProjectStatus(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean }> {
  try {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: 'Retrieving project status...',
    })

    // Get project by ID or name
    let project: Project | null = null
    if (action.params.projectId) {
      project = await getProject(action.params.projectId)
    } else if (action.params.projectName) {
      project = await findProjectByName(action.params.projectName)
    }

    if (!project) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Project not found',
      })
      return { success: false }
    }

    // Get project detail view
    const detail = await getProjectDetail(project.id)

    if (!detail) {
      statusUpdates.push({
        timestamp: new Date(),
        status: 'error',
        message: 'Failed to retrieve project details',
      })
      return { success: false }
    }

    statusUpdates.push({
      timestamp: new Date(),
      status: 'complete',
      message: `Project Status: ${project.name}`,
      metadata: {
        projectId: project.id,
        phase: project.phase,
        status: project.status,
        progress: project.progressPercentage,
        nextMilestone: detail.nextMilestone?.name,
        blockers: detail.currentBlockers.length,
      },
    })

    foremanLogger.log(
      LogLevel.INFO,
      'ProjectLifecycle',
      `Project status retrieved: ${project.name}`,
      { organisationId, projectId: project.id }
    )

    return { success: true }
  } catch (error) {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to get project status',
    })
    return { success: false }
  }
}

/**
 * Execute GET_PROJECT_DASHBOARD action
 */
async function executeGetProjectDashboard(
  action: ForemanAction,
  organisationId: string,
  statusUpdates: ChatStatusUpdate[]
): Promise<{ success: boolean }> {
  try {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'planning',
      message: 'Generating project dashboard...',
    })

    if (action.params.projectId || action.params.projectName) {
      // Get specific project detail
      let project: Project | null = null
      if (action.params.projectId) {
        project = await getProject(action.params.projectId)
      } else if (action.params.projectName) {
        project = await findProjectByName(action.params.projectName)
      }

      if (!project) {
        statusUpdates.push({
          timestamp: new Date(),
          status: 'error',
          message: 'Project not found',
        })
        return { success: false }
      }

      const detail = await getProjectDetail(project.id)

      statusUpdates.push({
        timestamp: new Date(),
        status: 'complete',
        message: `Dashboard for: ${project.name}`,
        metadata: {
          projectId: project.id,
          view: 'detail',
          detail,
        },
      })
    } else {
      // Get overview dashboard
      const dashboard = await getDashboardData()

      statusUpdates.push({
        timestamp: new Date(),
        status: 'complete',
        message: 'Project Dashboard Overview',
        metadata: {
          view: 'overview',
          dashboard,
        },
      })
    }

    foremanLogger.log(
      LogLevel.INFO,
      'ProjectLifecycle',
      'Project dashboard generated',
      { organisationId }
    )

    return { success: true }
  } catch (error) {
    statusUpdates.push({
      timestamp: new Date(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to get project dashboard',
    })
    return { success: false }
  }
}
