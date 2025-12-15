/**
 * Automated Progress Reporter
 * Provides heartbeat mechanism for continuous execution visibility
 */

import { recordGovernanceEvent } from './memory'

export interface ProgressReport {
  timestamp: string
  phase: string
  progress_percentage: number
  completed_items: string[]
  in_progress_items: string[]
  queued_items: string[]
  blockers: string[]
  last_commit?: string
  constitutional_compliance: {
    gsr: boolean
    opojd: boolean
    build_philosophy: boolean
    zero_test_debt: boolean
  }
}

export interface HeartbeatConfig {
  interval_minutes: number
  enabled: boolean
  report_to_mcp: boolean
  report_to_dashboard: boolean
}

class ProgressReporter {
  private config: HeartbeatConfig
  private intervalId: NodeJS.Timeout | null = null
  private currentReport: ProgressReport | null = null

  constructor(config: HeartbeatConfig) {
    this.config = config
  }

  /**
   * Start automated progress reporting
   */
  start(initialReport: ProgressReport) {
    if (!this.config.enabled) {
      console.log('[ProgressReporter] Heartbeat disabled')
      return
    }

    this.currentReport = initialReport
    console.log(`[ProgressReporter] Starting heartbeat - interval: ${this.config.interval_minutes} minutes`)

    // Send initial report immediately
    this.sendReport(initialReport)

    // Set up interval for ongoing reports
    const intervalMs = this.config.interval_minutes * 60 * 1000
    this.intervalId = setInterval(() => {
      if (this.currentReport) {
        this.sendReport(this.currentReport)
      }
    }, intervalMs)
  }

  /**
   * Update current progress state
   */
  updateProgress(report: ProgressReport) {
    this.currentReport = report
    
    // Record in governance memory
    recordGovernanceEvent(
      'progress_update',
      {
        phase: report.phase,
        progress: report.progress_percentage,
        completed: report.completed_items.length,
        in_progress: report.in_progress_items.length,
        queued: report.queued_items.length,
        blockers: report.blockers.length,
        timestamp: new Date().toISOString()
      }
    )
  }

  /**
   * Send progress report via configured channels
   */
  private async sendReport(report: ProgressReport) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔄 FOREMAN PROGRESS REPORT - HEARTBEAT')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`⏰ Timestamp: ${report.timestamp}`)
    console.log(`📊 Phase: ${report.phase}`)
    console.log(`📈 Progress: ${report.progress_percentage}%`)
    console.log(`✅ Completed: ${report.completed_items.length} items`)
    console.log(`🔄 In Progress: ${report.in_progress_items.length} items`)
    console.log(`📋 Queued: ${report.queued_items.length} items`)
    console.log(`🚫 Blockers: ${report.blockers.length}`)
    
    if (report.completed_items.length > 0) {
      console.log('\n✅ Recently Completed:')
      report.completed_items.slice(-5).forEach(item => console.log(`  - ${item}`))
    }
    
    if (report.in_progress_items.length > 0) {
      console.log('\n🔄 Currently Active:')
      report.in_progress_items.forEach(item => console.log(`  - ${item}`))
    }
    
    if (report.blockers.length > 0) {
      console.log('\n🚫 Active Blockers:')
      report.blockers.forEach(blocker => console.log(`  - ${blocker}`))
    }

    console.log('\n🏛️ Constitutional Compliance:')
    console.log(`  GSR: ${report.constitutional_compliance.gsr ? '✅' : '❌'}`)
    console.log(`  OPOJD: ${report.constitutional_compliance.opojd ? '✅' : '❌'}`)
    console.log(`  Build Philosophy: ${report.constitutional_compliance.build_philosophy ? '✅' : '❌'}`)
    console.log(`  Zero Test Debt: ${report.constitutional_compliance.zero_test_debt ? '✅' : '❌'}`)
    
    if (report.last_commit) {
      console.log(`\n📝 Last Commit: ${report.last_commit}`)
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    // Report to MCP if enabled
    if (this.config.report_to_mcp) {
      await this.reportToMCP(report)
    }

    // Report to dashboard if enabled
    if (this.config.report_to_dashboard) {
      await this.reportToDashboard(report)
    }
  }

  /**
   * Send progress report to MCP Control Plane
   */
  private async reportToMCP(report: ProgressReport) {
    try {
      const mcpServerUrl = process.env.MCP_SERVER_URL
      if (!mcpServerUrl) {
        console.log('[ProgressReporter] MCP_SERVER_URL not configured, skipping MCP report')
        return
      }

      // This would call MCP comment API to post progress updates
      // For now, just log that we would report
      console.log('[ProgressReporter] Would report to MCP:', {
        phase: report.phase,
        progress: report.progress_percentage
      })
    } catch (error) {
      console.error('[ProgressReporter] Failed to report to MCP:', error)
    }
  }

  /**
   * Send progress report to FM Dashboard
   */
  private async reportToDashboard(report: ProgressReport) {
    try {
      // This would update FM dashboard state
      // For now, just log that we would report
      console.log('[ProgressReporter] Would report to Dashboard:', {
        phase: report.phase,
        progress: report.progress_percentage
      })
    } catch (error) {
      console.error('[ProgressReporter] Failed to report to Dashboard:', error)
    }
  }

  /**
   * Stop automated reporting
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
      console.log('[ProgressReporter] Heartbeat stopped')
    }
  }

  /**
   * Force immediate progress report
   */
  async reportNow(report?: ProgressReport) {
    const reportToSend = report || this.currentReport
    if (reportToSend) {
      await this.sendReport(reportToSend)
    }
  }
}

// Singleton instance
let reporterInstance: ProgressReporter | null = null

/**
 * Initialize progress reporter with config
 */
export function initializeProgressReporter(config: HeartbeatConfig): ProgressReporter {
  if (reporterInstance) {
    reporterInstance.stop()
  }
  
  reporterInstance = new ProgressReporter(config)
  return reporterInstance
}

/**
 * Get current reporter instance
 */
export function getProgressReporter(): ProgressReporter | null {
  return reporterInstance
}

/**
 * Create progress report from current state
 */
export function createProgressReport(
  phase: string,
  completedItems: string[],
  inProgressItems: string[],
  queuedItems: string[],
  blockers: string[] = [],
  lastCommit?: string
): ProgressReport {
  const totalItems = completedItems.length + inProgressItems.length + queuedItems.length
  const progressPercentage = totalItems > 0 
    ? Math.round((completedItems.length / totalItems) * 100)
    : 0

  return {
    timestamp: new Date().toISOString(),
    phase,
    progress_percentage: progressPercentage,
    completed_items: completedItems,
    in_progress_items: inProgressItems,
    queued_items: queuedItems,
    blockers,
    last_commit: lastCommit,
    constitutional_compliance: {
      gsr: true, // Updated by actual validation
      opojd: true,
      build_philosophy: true,
      zero_test_debt: true
    }
  }
}
