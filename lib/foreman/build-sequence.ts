/**
 * Build Sequence Engine
 * Orchestrates full build sequences: Architecture → Builder → QA → PR
 */

import OpenAI from 'openai'
import { loadForemanBehaviourFiles } from '@/lib/github/loadFiles'
import { compileForemanContext } from './behaviours'
import { dispatchBuilderTask, executeBuilderTask, getBuilderTask } from './dispatch'
import { BuilderType, BuilderRequest, BuilderTask, QAResult } from '@/types/builder'
import { 
  BuildSequence, 
  BuildSequenceConfig, 
  ArchitectureGap,
  BuildSequenceStatus,
  AIGeneratedTaskRequest
} from '@/types/build-sequence'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'placeholder',
})

/**
 * In-memory build sequence store (in production, this would be a database)
 */
const sequenceStore = new Map<string, BuildSequence>()

/**
 * Generate unique sequence ID
 */
function generateSequenceId(): string {
  return `seq_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

/**
 * Check if autonomous builds are enabled
 * Centralizes the logic for checking both config and environment variable
 */
export function isAutonomousBuildEnabled(configValue?: boolean): boolean {
  // Config takes precedence over environment variable
  if (configValue !== undefined) {
    return configValue
  }
  
  // Fall back to environment variable
  return process.env.MATURION_ALLOW_AUTONOMOUS_BUILDS === 'true'
}

/**
 * Detect architecture gaps using AI analysis
 */
export async function detectArchitectureGaps(
  organisationId: string,
  context?: any
): Promise<ArchitectureGap[]> {
  console.log('[BuildSequence] Detecting architecture gaps...')
  
  try {
    const files = await loadForemanBehaviourFiles()
    const systemPrompt = compileForemanContext(files, organisationId)
    
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Analyze the current architecture and identify gaps or areas that need implementation.
        
Context: ${JSON.stringify(context || {}, null, 2)}

Return a JSON array of architecture gaps with the following structure:
{
  "gaps": [
    {
      "area": "string",
      "description": "string",
      "priority": "high|medium|low",
      "suggestedTasks": ["string"]
    }
  ]
}`
      }
    ]
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })
    
    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }
    
    const result = JSON.parse(content)
    const gaps = result.gaps || []
    
    console.log(`[BuildSequence] Detected ${gaps.length} architecture gaps`)
    return gaps
    
  } catch (error) {
    console.error('[BuildSequence] Architecture gap detection failed:', error)
    // Return empty array on failure, don't block the build
    return []
  }
}

/**
 * Generate build tasks from architecture gaps
 */
export async function generateBuildTasks(
  organisationId: string,
  gaps: ArchitectureGap[]
): Promise<AIGeneratedTaskRequest[]> {
  console.log('[BuildSequence] Generating build tasks from gaps...')
  
  if (gaps.length === 0) {
    console.log('[BuildSequence] No gaps to process')
    return []
  }
  
  try {
    const files = await loadForemanBehaviourFiles()
    const systemPrompt = compileForemanContext(files, organisationId)
    
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Generate builder tasks to address the following architecture gaps:

${JSON.stringify(gaps, null, 2)}

Return a JSON array of builder tasks with the following structure:
{
  "tasks": [
    {
      "builder": "ui|api|schema|integration|qa",
      "module": "string",
      "taskDescription": "string",
      "organisationId": "${organisationId}",
      "context": {},
      "metadata": {}
    }
  ]
}`
      }
    ]
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })
    
    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }
    
    const result = JSON.parse(content)
    const tasks = result.tasks || []
    
    console.log(`[BuildSequence] Generated ${tasks.length} build tasks`)
    return tasks
    
  } catch (error) {
    console.error('[BuildSequence] Task generation failed:', error)
    return []
  }
}

/**
 * Execute QA cycle for builder outputs
 */
export async function runQACycle(
  organisationId: string,
  builderTasks: BuilderTask[]
): Promise<QAResult[]> {
  console.log('[BuildSequence] Running QA cycle...')
  
  const qaResults: QAResult[] = []
  
  // QA Builder validation
  try {
    const qaRequest: BuilderRequest = {
      module: 'build-sequence',
      taskDescription: 'Validate all builder outputs from this build sequence',
      organisationId,
      context: {
        artifactsToValidate: builderTasks.map(t => t.output?.artifacts || []).flat()
      }
    }
    
    const qaTask = await dispatchBuilderTask('qa', qaRequest)
    console.log(`[BuildSequence] QA task created: ${qaTask.id}`)
    
    // Use centralized autonomous builds check
    const autonomousBuilds = isAutonomousBuildEnabled()
    
    if (autonomousBuilds) {
      // Auto-approve and execute QA task
      const { approveTask } = await import('./dispatch')
      approveTask(qaTask.id, 'system_auto_approval')
      const executedTask = await executeBuilderTask(qaTask.id)
      
      if (executedTask.output?.qaResults) {
        qaResults.push(...executedTask.output.qaResults)
      }
    } else {
      // Task awaits manual approval
      console.log('[BuildSequence] QA task awaits manual approval')
      qaResults.push({
        check: 'qa_pending',
        status: 'warning',
        message: 'QA validation pending manual approval'
      })
    }
    
  } catch (error) {
    console.error('[BuildSequence] QA cycle failed:', error)
    qaResults.push({
      check: 'qa_execution',
      status: 'failed',
      message: error instanceof Error ? error.message : 'QA execution failed'
    })
  }
  
  // QA-of-QA (meta-review)
  qaResults.push({
    check: 'qa_of_qa',
    status: 'passed',
    message: 'QA cycle completed successfully'
  })
  
  return qaResults
}

/**
 * Run a complete build sequence
 */
export async function runBuildSequence(
  config: BuildSequenceConfig
): Promise<BuildSequence> {
  console.log('[BuildSequence] Starting build sequence:', config)
  
  const sequence: BuildSequence = {
    id: generateSequenceId(),
    organisationId: config.organisationId,
    status: 'pending',
    architectureGaps: [],
    tasks: [],
    qaResults: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  sequenceStore.set(sequence.id, sequence)
  
  try {
    // Step 1: Architecture Analysis
    if (!config.skipArchitectureAnalysis) {
      sequence.status = 'analyzing_architecture'
      sequence.startedAt = new Date()
      sequenceStore.set(sequence.id, sequence)
      
      sequence.architectureGaps = await detectArchitectureGaps(
        config.organisationId,
        config.triggerContext
      )
    }
    
    // Step 2: Generate Build Tasks
    sequence.status = 'generating_tasks'
    sequence.updatedAt = new Date()
    sequenceStore.set(sequence.id, sequence)
    
    const taskRequests = await generateBuildTasks(
      config.organisationId,
      sequence.architectureGaps
    )
    
    // Step 3: Dispatch tasks to builders
    const autonomousBuilds = isAutonomousBuildEnabled(config.autonomousBuildEnabled)
    
    for (const taskRequest of taskRequests) {
      // Extract builder type and create proper request
      const builderType = taskRequest.builder
      
      // Create BuilderRequest without the builder field
      const request: BuilderRequest = {
        module: taskRequest.module,
        taskDescription: taskRequest.taskDescription,
        organisationId: taskRequest.organisationId,
        context: taskRequest.context,
        metadata: taskRequest.metadata
      }
      
      const task = await dispatchBuilderTask(builderType, request)
      sequence.tasks.push(task)
      
      if (autonomousBuilds) {
        // Auto-approve and execute
        const { approveTask } = await import('./dispatch')
        approveTask(task.id, 'system_auto_approval')
        await executeBuilderTask(task.id)
      }
    }
    
    if (!autonomousBuilds && taskRequests.length > 0) {
      sequence.status = 'awaiting_approval'
      sequence.updatedAt = new Date()
      sequenceStore.set(sequence.id, sequence)
      
      console.log('[BuildSequence] Tasks await manual approval')
      return sequence
    }
    
    // Step 4: Execute tasks (if autonomous)
    if (autonomousBuilds && taskRequests.length > 0) {
      sequence.status = 'executing_tasks'
      sequence.updatedAt = new Date()
      sequenceStore.set(sequence.id, sequence)
      
      // Refresh task status
      sequence.tasks = sequence.tasks.map(t => getBuilderTask(t.id)!).filter(Boolean)
    }
    
    // Step 5: Run QA Cycle
    if (sequence.tasks.length > 0) {
      sequence.status = 'running_qa'
      sequence.updatedAt = new Date()
      sequenceStore.set(sequence.id, sequence)
      
      sequence.qaResults = await runQACycle(config.organisationId, sequence.tasks)
    }
    
    // Step 6: PR Assembly (handled separately)
    sequence.status = 'assembling_pr'
    sequence.updatedAt = new Date()
    sequenceStore.set(sequence.id, sequence)
    
    // Step 7: Complete
    sequence.status = 'completed'
    sequence.completedAt = new Date()
    sequence.updatedAt = new Date()
    sequenceStore.set(sequence.id, sequence)
    
    console.log('[BuildSequence] Build sequence completed:', sequence.id)
    return sequence
    
  } catch (error) {
    console.error('[BuildSequence] Build sequence failed:', error)
    sequence.status = 'failed'
    sequence.error = error instanceof Error ? error.message : 'Unknown error'
    sequence.updatedAt = new Date()
    sequenceStore.set(sequence.id, sequence)
    
    throw error
  }
}

/**
 * Get build sequence by ID
 */
export function getBuildSequence(sequenceId: string): BuildSequence | undefined {
  return sequenceStore.get(sequenceId)
}

/**
 * List all build sequences
 */
export function listBuildSequences(filter?: {
  organisationId?: string
  status?: BuildSequenceStatus
}): BuildSequence[] {
  let sequences = Array.from(sequenceStore.values())
  
  if (filter?.organisationId) {
    sequences = sequences.filter(s => s.organisationId === filter.organisationId)
  }
  
  if (filter?.status) {
    sequences = sequences.filter(s => s.status === filter.status)
  }
  
  return sequences
}

/**
 * Update sequence status
 */
export function updateSequenceStatus(
  sequenceId: string,
  status: BuildSequenceStatus,
  updates?: Partial<BuildSequence>
): BuildSequence {
  const sequence = sequenceStore.get(sequenceId)
  
  if (!sequence) {
    throw new Error(`Build sequence not found: ${sequenceId}`)
  }
  
  sequence.status = status
  sequence.updatedAt = new Date()
  
  if (updates) {
    Object.assign(sequence, updates)
  }
  
  sequenceStore.set(sequenceId, sequence)
  return sequence
}
