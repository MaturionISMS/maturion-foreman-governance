/**
 * QIW (Quality Integrity Watchdog) Analytics API Endpoint
 * GET /api/foreman/analytics/qiw
 * Returns quality integrity watchdog analytics and status
 */

import { NextRequest, NextResponse } from 'next/server'
import { runQIWMonitoring } from '@/lib/foreman/watchdog/quality-integrity-watchdog'
import * as fs from 'fs'
import * as path from 'path'
import { 
  GovernanceMemoryQIWEntry, 
  QIWDashboardData,
  QIWChannelResult,
  QIWReport
} from '@/types/watchdog'

/**
 * GET /api/foreman/analytics/qiw
 * Returns QIW analytics including:
 * - Latest QIW report
 * - Recent anomalies
 * - Trends over time
 * - Channel health status
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[QIW Analytics API] Generating QIW analytics...')
    
    // Get logs directory from environment or default to /tmp
    const logsDir = process.env.QIW_LOGS_DIR || '/tmp'
    
    // Run QIW monitoring
    const latestReport = runQIWMonitoring({
      logsDir,
      blockOnCritical: true,
      blockOnErrors: true,
      blockOnWarnings: false,
      writeGovernanceMemory: true,
      enabledChannels: ['build', 'lint', 'test']
    })
    
    // Load QIW events from governance memory
    const memoryFile = path.join(process.cwd(), 'memory', 'global', 'qiw-events.json')
    let qiwEvents: GovernanceMemoryQIWEntry[] = []
    
    if (fs.existsSync(memoryFile)) {
      try {
        qiwEvents = JSON.parse(fs.readFileSync(memoryFile, 'utf-8'))
      } catch (error) {
        console.error('[QIW Analytics API] Failed to load QIW events:', error)
      }
    }
    
    // Get recent anomalies (last 10)
    const recentAnomalies = latestReport.allAnomalies.slice(-10)
    
    // Calculate trends (last 7 days)
    const trends = calculateTrends(qiwEvents)
    
    // Calculate channel health
    const channelHealth = latestReport.channels.map(channel => ({
      channel: channel.channel,
      status: determineChannelStatus(channel),
      lastChecked: channel.checkedAt
    }))
    
    // Determine overall status
    const status = determineOverallStatus(latestReport)
    
    const dashboardData: QIWDashboardData = {
      status,
      latestReport,
      recentAnomalies,
      trends,
      channelHealth
    }
    
    console.log('[QIW Analytics API] QIW analytics generated successfully')
    
    return NextResponse.json(dashboardData)
    
  } catch (error) {
    console.error('[QIW Analytics API] Error generating QIW analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Calculate trends from QIW events
 */
function calculateTrends(events: GovernanceMemoryQIWEntry[]): QIWDashboardData['trends'] {
  const trends: QIWDashboardData['trends'] = []
  const now = new Date()
  
  // Generate data for last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)
    
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    
    // Filter events for this day
    const dayEvents = events.filter(e => {
      const eventDate = new Date(e.timestamp)
      return eventDate >= date && eventDate < nextDate
    })
    
    trends.push({
      date: date.toISOString().split('T')[0],
      criticalCount: dayEvents.filter(e => e.severity === 'critical').length,
      errorCount: dayEvents.filter(e => e.severity === 'error').length,
      warningCount: dayEvents.filter(e => e.severity === 'warning').length
    })
  }
  
  return trends
}

/**
 * Determine channel status
 */
function determineChannelStatus(channel: QIWChannelResult): 'healthy' | 'warning' | 'error' | 'critical' {
  if (!channel.passed) {
    if (channel.errorCount > 0) {
      return 'error'
    }
    if (channel.warningCount > 0) {
      return 'warning'
    }
    if (!channel.logExists) {
      return 'critical'
    }
    return 'error'
  }
  return 'healthy'
}

/**
 * Determine overall QIW status
 */
function determineOverallStatus(report: QIWReport): 'healthy' | 'warning' | 'error' | 'critical' {
  if (report.criticalCount > 0) {
    return 'critical'
  }
  if (report.errorCount > 0) {
    return 'error'
  }
  if (report.warningCount > 0) {
    return 'warning'
  }
  return 'healthy'
}
