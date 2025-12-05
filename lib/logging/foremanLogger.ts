/**
 * Foreman Logger
 * Centralized logging for Foreman operations with telemetry
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogEntry {
  timestamp: Date
  level: LogLevel
  category: string
  message: string
  metadata?: Record<string, any>
}

export interface ChatCommandLog {
  timestamp: Date
  organisationId: string
  conversationId: string
  command: string
  parsedActions: any[]
  autonomyMode: boolean
}

export interface BuilderSelectionLog {
  timestamp: Date
  taskId: string
  builder: string
  reason: string
  organisationId: string
}

export interface ExecutionPhaseLog {
  timestamp: Date
  sequenceId: string
  phase: string
  status: 'started' | 'completed' | 'failed'
  duration?: number
  metadata?: Record<string, any>
}

export interface QAResultLog {
  timestamp: Date
  taskId: string
  qaStatus: 'passed' | 'failed' | 'warning'
  checks: any[]
  organisationId: string
}

export interface PROutcomeLog {
  timestamp: Date
  sequenceId: string
  prUrl?: string
  status: 'created' | 'failed'
  filesChanged: string[]
  organisationId: string
}

export interface ErrorLog {
  timestamp: Date
  errorType: string
  message: string
  stack?: string
  context?: Record<string, any>
}

export interface DegradedModeLog {
  timestamp: Date
  reason: string
  affectedSystems: string[]
  recoveryAction?: string
}

export interface PilotBuildLog {
  timestamp: Date
  waveId: string
  repoTarget: string
  status: 'started' | 'builder_selected' | 'qa_result' | 'pr_created' | 'completed' | 'failed'
  builder?: 'local' | 'copilot'
  qaResult?: 'passed' | 'failed'
  prUrl?: string
  error?: string
}

class ForemanLogger {
  private logs: LogEntry[] = []
  private readonly MAX_LOGS = 10000 // Limit to prevent memory leaks

  /**
   * Log a general message
   */
  log(level: LogLevel, category: string, message: string, metadata?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      category,
      message,
      metadata,
    }

    this.logs.push(entry)

    // Implement basic log rotation to prevent memory leaks
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS)
    }

    // Console output with color coding
    const prefix = `[Foreman][${category}]`
    const formattedMessage = `${prefix} ${message}`

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, metadata || '')
        break
      case LogLevel.INFO:
        console.log(formattedMessage, metadata || '')
        break
      case LogLevel.WARN:
        console.warn(formattedMessage, metadata || '')
        break
      case LogLevel.ERROR:
        console.error(formattedMessage, metadata || '')
        break
    }
  }

  /**
   * Log chat command
   */
  logChatCommand(log: ChatCommandLog) {
    this.log(LogLevel.INFO, 'ChatCommand', `Command received: ${log.command}`, {
      organisationId: log.organisationId,
      conversationId: log.conversationId,
      actionsCount: log.parsedActions.length,
      autonomyMode: log.autonomyMode,
    })
  }

  /**
   * Log parsed actions
   */
  logParsedActions(actions: any[], conversationId: string) {
    this.log(LogLevel.INFO, 'ParsedActions', `Parsed ${actions.length} actions`, {
      conversationId,
      actions: actions.map(a => ({ type: a.type, module: a.params?.module })),
    })
  }

  /**
   * Log builder selection
   */
  logBuilderSelection(log: BuilderSelectionLog) {
    this.log(LogLevel.INFO, 'BuilderSelection', `Selected builder: ${log.builder}`, {
      taskId: log.taskId,
      reason: log.reason,
      organisationId: log.organisationId,
    })
  }

  /**
   * Log execution phase
   */
  logExecutionPhase(log: ExecutionPhaseLog) {
    const message = `Phase ${log.phase}: ${log.status}`
    this.log(LogLevel.INFO, 'ExecutionPhase', message, {
      sequenceId: log.sequenceId,
      duration: log.duration,
      ...log.metadata,
    })
  }

  /**
   * Log QA results
   */
  logQAResults(log: QAResultLog) {
    const level = log.qaStatus === 'failed' ? LogLevel.ERROR : LogLevel.INFO
    this.log(level, 'QAResults', `QA ${log.qaStatus} for task ${log.taskId}`, {
      checks: log.checks,
      organisationId: log.organisationId,
    })
  }

  /**
   * Log PR outcome
   */
  logPROutcome(log: PROutcomeLog) {
    const level = log.status === 'failed' ? LogLevel.ERROR : LogLevel.INFO
    const message = log.status === 'created' 
      ? `PR created: ${log.prUrl}` 
      : 'PR creation failed'
    
    this.log(level, 'PROutcome', message, {
      sequenceId: log.sequenceId,
      filesChanged: log.filesChanged,
      organisationId: log.organisationId,
    })
  }

  /**
   * Log error
   */
  logError(log: ErrorLog) {
    this.log(LogLevel.ERROR, 'Error', `${log.errorType}: ${log.message}`, {
      stack: log.stack,
      context: log.context,
    })
  }

  /**
   * Log degraded mode event
   */
  logDegradedMode(log: DegradedModeLog) {
    this.log(LogLevel.WARN, 'DegradedMode', `System degraded: ${log.reason}`, {
      affectedSystems: log.affectedSystems,
      recoveryAction: log.recoveryAction,
    })
  }

  /**
   * Log pilot build event
   */
  logPilotBuild(log: PilotBuildLog) {
    const level = log.status === 'failed' ? LogLevel.ERROR : LogLevel.INFO
    const statusMap = {
      started: 'Pilot build started',
      builder_selected: `Builder selected: ${log.builder}`,
      qa_result: `QA ${log.qaResult}`,
      pr_created: `PR created: ${log.prUrl}`,
      completed: 'Pilot build completed',
      failed: 'Pilot build failed',
    }
    
    this.log(level, 'PilotBuild', statusMap[log.status], {
      waveId: log.waveId,
      repoTarget: log.repoTarget,
      builder: log.builder,
      qaResult: log.qaResult,
      prUrl: log.prUrl,
      error: log.error,
    })
  }

  /**
   * Get recent logs
   */
  getRecentLogs(limit: number = 100): LogEntry[] {
    return this.logs.slice(-limit)
  }

  /**
   * Get logs by category
   */
  getLogsByCategory(category: string): LogEntry[] {
    return this.logs.filter(log => log.category === category)
  }

  /**
   * Clear logs (for testing)
   */
  clearLogs() {
    this.logs = []
  }
}

// Export singleton instance
export const foremanLogger = new ForemanLogger()
