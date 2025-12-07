/**
 * Quality Integrity Watchdog (QIW) Types
 * 
 * Type definitions for the Quality Integrity Watchdog system
 * that monitors build, lint, test, deployment, and runtime logs.
 */

/**
 * QIW Channel - type of log being monitored
 */
export type QIWChannel = 
  | 'build'
  | 'lint'
  | 'test'
  | 'deployment_simulation'
  | 'runtime_initialization'

/**
 * QIW Severity - criticality of detected anomaly
 */
export type QIWSeverity = 'critical' | 'error' | 'warning' | 'info'

/**
 * QIW Anomaly - detected issue in logs
 */
export interface QIWAnomaly {
  /** Unique anomaly ID */
  id: string
  
  /** Channel where anomaly was detected */
  channel: QIWChannel
  
  /** Severity of the anomaly */
  severity: QIWSeverity
  
  /** Description of the anomaly */
  description: string
  
  /** Log file path */
  logFile: string
  
  /** Line number in log where anomaly was found */
  lineNumber: number
  
  /** The actual log line */
  logLine: string
  
  /** Context around the anomaly (surrounding lines) */
  context?: string
  
  /** Pattern that matched the anomaly */
  pattern: string
  
  /** Recommended fix for the anomaly */
  recommendation: string
  
  /** Whether this anomaly blocks QA */
  blocksQA: boolean
  
  /** Timestamp when anomaly was detected */
  detectedAt: string
}

/**
 * QIW Channel Result - result of monitoring a specific channel
 */
export interface QIWChannelResult {
  /** Channel that was monitored */
  channel: QIWChannel
  
  /** Whether the channel passed monitoring */
  passed: boolean
  
  /** Log file path */
  logFile: string
  
  /** Whether log file exists */
  logExists: boolean
  
  /** Anomalies detected in this channel */
  anomalies: QIWAnomaly[]
  
  /** Total errors found */
  errorCount: number
  
  /** Total warnings found */
  warningCount: number
  
  /** Summary message */
  summary: string
  
  /** Timestamp when channel was checked */
  checkedAt: string
}

/**
 * QIW Report - complete watchdog monitoring report
 */
export interface QIWReport {
  /** Overall pass/fail status */
  passed: boolean
  
  /** Whether QA should be blocked */
  qaBlocked: boolean
  
  /** Results for each monitored channel */
  channels: QIWChannelResult[]
  
  /** All anomalies across all channels */
  allAnomalies: QIWAnomaly[]
  
  /** Total critical anomalies */
  criticalCount: number
  
  /** Total error anomalies */
  errorCount: number
  
  /** Total warning anomalies */
  warningCount: number
  
  /** Overall summary */
  summary: string
  
  /** Recommendations for fixing issues */
  recommendations: string[]
  
  /** Timestamp when report was generated */
  generatedAt: string
  
  /** Build sequence ID (if available) */
  buildSequenceId?: string
  
  /** Project ID (if available) */
  projectId?: string
}

/**
 * QIW Configuration - watchdog monitoring settings
 */
export interface QIWConfig {
  /** Channels to monitor */
  enabledChannels: QIWChannel[]
  
  /** Whether to block QA on critical anomalies */
  blockOnCritical: boolean
  
  /** Whether to block QA on errors */
  blockOnErrors: boolean
  
  /** Whether to block QA on warnings */
  blockOnWarnings: boolean
  
  /** Directory where logs are stored */
  logsDir: string
  
  /** Whether to write governance memory entries */
  writeGovernanceMemory: boolean
  
  /** Project directory */
  projectDir?: string
  
  /** Build sequence ID */
  buildSequenceId?: string
  
  /** Project ID */
  projectId?: string
}

/**
 * Governance Memory QIW Entry - entry written to governance memory
 */
export interface GovernanceMemoryQIWEntry {
  /** What failed */
  whatFailed: string
  
  /** Where it failed (log file, line number) */
  where: string
  
  /** Why it failed (root cause analysis) */
  why: string
  
  /** Recommended fix */
  recommendedFix: string
  
  /** Missing architecture rule that would have prevented this */
  missingArchitectureRule?: string
  
  /** Channel where failure occurred */
  channel: QIWChannel
  
  /** Severity of failure */
  severity: QIWSeverity
  
  /** Timestamp */
  timestamp: string
  
  /** Build sequence ID */
  buildSequenceId?: string
  
  /** Project ID */
  projectId?: string
}

/**
 * QIW Dashboard Data - data for displaying in dashboard
 */
export interface QIWDashboardData {
  /** Current QIW status */
  status: 'healthy' | 'warning' | 'error' | 'critical'
  
  /** Latest QIW report */
  latestReport: QIWReport | null
  
  /** Recent anomalies (last 10) */
  recentAnomalies: QIWAnomaly[]
  
  /** Anomaly trends over time */
  trends: {
    date: string
    criticalCount: number
    errorCount: number
    warningCount: number
  }[]
  
  /** Channel health status */
  channelHealth: {
    channel: QIWChannel
    status: 'healthy' | 'warning' | 'error' | 'critical'
    lastChecked: string
  }[]
}
