/**
 * Quality Integrity Watchdog (QIW)
 * 
 * Monitors build, lint, test, deployment simulation, and runtime logs
 * to ensure quality integrity before QA can pass.
 * 
 * Implements Quality Integrity Contract enforcement:
 * - QIW-1: Build Log Monitoring
 * - QIW-2: Lint Log Monitoring
 * - QIW-3: Test Log Monitoring
 * - QIW-4: Deployment Simulation Monitoring
 * - QIW-5: Governance Memory Integration
 * 
 * CRITICAL: Per QIEL Environment Alignment:
 * - All thresholds are sourced from lib/foreman/qiel-config.ts
 * - Identical configuration as GitHub Actions
 * - Zero drift tolerance
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  QIWReport,
  QIWChannelResult,
  QIWAnomaly,
  QIWChannel,
  QIWSeverity,
  QIWConfig,
  GovernanceMemoryQIWEntry
} from '@/types/watchdog'
import { QIEL_CONFIG } from '../qiel-config'

/**
 * Default QIW configuration (now sourced from unified config)
 */
const DEFAULT_CONFIG: QIWConfig = {
  enabledChannels: QIEL_CONFIG.qiw.enabledChannels as unknown as QIWChannel[],
  blockOnCritical: QIEL_CONFIG.qiw.blockOnCritical,
  blockOnErrors: QIEL_CONFIG.qiw.blockOnErrors,
  blockOnWarnings: QIEL_CONFIG.qiw.blockOnWarnings,
  logsDir: '/tmp',
  writeGovernanceMemory: true
}

/**
 * Error patterns for different log types
 * Based on Quality Integrity Contract and unified config
 * Memoized to avoid recreating RegExp objects on every access
 */
const ERROR_PATTERNS: Record<QIWChannel, RegExp[]> = (() => {
  const patterns: Partial<Record<QIWChannel, RegExp[]>> = {};
  patterns.build = QIEL_CONFIG.qiw.errorPatterns.build.map(p => new RegExp(p, 'i'));
  patterns.lint = QIEL_CONFIG.qiw.errorPatterns.lint.map(p => new RegExp(p, 'i'));
  patterns.test = QIEL_CONFIG.qiw.errorPatterns.test.map(p => new RegExp(p, 'i'));
  patterns.deployment_simulation = QIEL_CONFIG.qiw.errorPatterns.deployment_simulation.map(p => new RegExp(p, 'i'));
  patterns.runtime_initialization = QIEL_CONFIG.qiw.errorPatterns.runtime_initialization.map(p => new RegExp(p, 'i'));
  return patterns as Record<QIWChannel, RegExp[]>;
})();

/**
 * Warning patterns for different log types (from unified config)
 * Memoized to avoid recreating RegExp objects on every access
 */
const WARNING_PATTERNS: Record<QIWChannel, RegExp[]> = (() => {
  const patterns: Partial<Record<QIWChannel, RegExp[]>> = {};
  patterns.build = QIEL_CONFIG.qiw.warningPatterns.build.map(p => new RegExp(p, 'i'));
  patterns.lint = QIEL_CONFIG.qiw.warningPatterns.lint.map(p => new RegExp(p, 'i'));
  patterns.test = QIEL_CONFIG.qiw.warningPatterns.test.map(p => new RegExp(p, 'i'));
  patterns.deployment_simulation = QIEL_CONFIG.qiw.warningPatterns.deployment_simulation.map(p => new RegExp(p, 'i'));
  patterns.runtime_initialization = QIEL_CONFIG.qiw.warningPatterns.runtime_initialization.map(p => new RegExp(p, 'i'));
  return patterns as Record<QIWChannel, RegExp[]>;
})();

/**
 * Generate unique anomaly ID
 */
function generateAnomalyId(): string {
  // Use timestamp + random to ensure uniqueness
  return `qiw-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
}

/**
 * Get context lines around a log line
 */
function getContext(lines: string[], index: number, contextSize: number = 2): string {
  const start = Math.max(0, index - contextSize)
  const end = Math.min(lines.length, index + contextSize + 1)
  return lines.slice(start, end).join('\n')
}

/**
 * Monitor a specific channel (log file)
 */
export function monitorChannel(
  channel: QIWChannel,
  logFilePath: string,
  config: QIWConfig = DEFAULT_CONFIG
): QIWChannelResult {
  const result: QIWChannelResult = {
    channel,
    passed: true,
    logFile: logFilePath,
    logExists: false,
    anomalies: [],
    errorCount: 0,
    warningCount: 0,
    summary: '',
    checkedAt: new Date().toISOString()
  }

  // Check if log file exists
  if (!fs.existsSync(logFilePath)) {
    result.summary = `Log file not found: ${logFilePath}`
    result.passed = false
    
    // Missing log file is a critical anomaly
    result.anomalies.push({
      id: generateAnomalyId(),
      channel,
      severity: 'critical',
      description: 'Required log file is missing',
      logFile: logFilePath,
      lineNumber: 0,
      logLine: '',
      pattern: 'missing_log_file',
      recommendation: `Ensure ${channel} process creates log file at ${logFilePath}`,
      blocksQA: true,
      detectedAt: new Date().toISOString()
    })
    
    return result
  }

  result.logExists = true

  try {
    const content = fs.readFileSync(logFilePath, 'utf-8')
    const lines = content.split('\n')
    
    const errorPatterns = ERROR_PATTERNS[channel] || []
    const warningPatterns = WARNING_PATTERNS[channel] || []

    // Scan each line for errors and warnings
    lines.forEach((line, index) => {
      const lineNumber = index + 1
      
      // Check for errors
      for (const pattern of errorPatterns) {
        if (pattern.test(line)) {
          result.errorCount++
          
          const anomaly: QIWAnomaly = {
            id: generateAnomalyId(),
            channel,
            severity: 'error',
            description: `Error detected in ${channel} log`,
            logFile: logFilePath,
            lineNumber,
            logLine: line.trim(),
            context: getContext(lines, index),
            pattern: pattern.source,
            recommendation: determineRecommendation(channel, line, 'error'),
            blocksQA: config.blockOnErrors,
            detectedAt: new Date().toISOString()
          }
          
          result.anomalies.push(anomaly)
          break // Only match first pattern per line
        }
      }
      
      // Check for warnings
      for (const pattern of warningPatterns) {
        if (pattern.test(line)) {
          result.warningCount++
          
          const anomaly: QIWAnomaly = {
            id: generateAnomalyId(),
            channel,
            severity: 'warning',
            description: `Warning detected in ${channel} log`,
            logFile: logFilePath,
            lineNumber,
            logLine: line.trim(),
            context: getContext(lines, index),
            pattern: pattern.source,
            recommendation: determineRecommendation(channel, line, 'warning'),
            blocksQA: config.blockOnWarnings,
            detectedAt: new Date().toISOString()
          }
          
          result.anomalies.push(anomaly)
          break // Only match first pattern per line
        }
      }
    })

    // Determine pass/fail
    result.passed = result.errorCount === 0 && 
                    (!config.blockOnWarnings || result.warningCount === 0)

    // Generate summary
    if (result.passed) {
      result.summary = `${channel} log passed: ${result.errorCount} errors, ${result.warningCount} warnings`
    } else {
      const issues: string[] = []
      if (result.errorCount > 0) {
        issues.push(`${result.errorCount} errors`)
      }
      if (result.warningCount > 0 && config.blockOnWarnings) {
        issues.push(`${result.warningCount} warnings`)
      }
      result.summary = `${channel} log FAILED: ${issues.join(', ')}`
    }

  } catch (error) {
    result.summary = `Failed to parse ${channel} log: ${error}`
    result.passed = false
    
    result.anomalies.push({
      id: generateAnomalyId(),
      channel,
      severity: 'critical',
      description: 'Failed to parse log file',
      logFile: logFilePath,
      lineNumber: 0,
      logLine: '',
      pattern: 'parse_error',
      recommendation: `Fix log file format or permissions: ${error}`,
      blocksQA: true,
      detectedAt: new Date().toISOString()
    })
  }

  return result
}

/**
 * Determine recommendation for an anomaly
 */
function determineRecommendation(
  channel: QIWChannel,
  logLine: string,
  severity: 'error' | 'warning'
): string {
  // TypeScript errors
  if (logLine.includes('TS') && /TS\d{4}/.test(logLine)) {
    return 'Fix TypeScript error - check type definitions and usage'
  }
  
  // Module not found
  if (/module not found|cannot find module/i.test(logLine)) {
    return 'Install missing dependency or fix import path'
  }
  
  // Deprecated API
  if (/deprecated/i.test(logLine)) {
    return 'Update to use non-deprecated API or whitelist if intentional'
  }
  
  // Test failures
  if (channel === 'test' && /fail/i.test(logLine)) {
    return 'Fix failing test - check test assertions and implementation'
  }
  
  // Build failures
  if (channel === 'build' && /build failed/i.test(logLine)) {
    return 'Fix build error - check compilation errors and dependencies'
  }
  
  // Lint errors
  if (channel === 'lint') {
    return 'Fix linting issue - follow code style guidelines or update eslint config'
  }
  
  // Generic recommendation
  if (severity === 'error') {
    return `Fix error in ${channel} - review log context and address the issue`
  } else {
    return `Address warning in ${channel} - review and fix or whitelist if acceptable`
  }
}

/**
 * Run complete QIW monitoring
 */
export function runQIWMonitoring(
  config: Partial<QIWConfig> = {}
): QIWReport {
  const fullConfig: QIWConfig = {
    ...DEFAULT_CONFIG,
    ...config
  }

  console.log('[QIW] Starting Quality Integrity Watchdog monitoring...')

  const channelResults: QIWChannelResult[] = []
  const allAnomalies: QIWAnomaly[] = []

  // Monitor each enabled channel
  for (const channel of fullConfig.enabledChannels) {
    const logFileName = getLogFileName(channel)
    const logFilePath = path.join(fullConfig.logsDir, logFileName)
    
    console.log(`[QIW] Monitoring ${channel} log: ${logFilePath}`)
    
    const channelResult = monitorChannel(channel, logFilePath, fullConfig)
    channelResults.push(channelResult)
    allAnomalies.push(...channelResult.anomalies)
  }

  // Calculate totals
  const criticalCount = allAnomalies.filter(a => a.severity === 'critical').length
  const errorCount = allAnomalies.filter(a => a.severity === 'error').length
  const warningCount = allAnomalies.filter(a => a.severity === 'warning').length

  // Determine if QA should be blocked
  const qaBlocked = 
    (fullConfig.blockOnCritical && criticalCount > 0) ||
    (fullConfig.blockOnErrors && errorCount > 0) ||
    (fullConfig.blockOnWarnings && warningCount > 0) ||
    !channelResults.every(r => r.passed)

  // Generate recommendations
  const recommendations = generateRecommendations(allAnomalies)

  // Overall pass/fail
  const passed = !qaBlocked && channelResults.every(r => r.passed)

  // Generate summary
  const summary = passed
    ? '✅ QIW: ALL CHECKS PASSED - Quality Integrity maintained'
    : `❌ QIW: FAILED - ${allAnomalies.length} anomalies detected (${criticalCount} critical, ${errorCount} errors, ${warningCount} warnings)`

  const report: QIWReport = {
    passed,
    qaBlocked,
    channels: channelResults,
    allAnomalies,
    criticalCount,
    errorCount,
    warningCount,
    summary,
    recommendations,
    generatedAt: new Date().toISOString(),
    buildSequenceId: fullConfig.buildSequenceId,
    projectId: fullConfig.projectId
  }

  console.log(`[QIW] ${summary}`)
  console.log(`[QIW] QA Blocked: ${qaBlocked}`)

  // Write to governance memory if enabled
  if (fullConfig.writeGovernanceMemory && !passed) {
    writeGovernanceMemory(report, fullConfig)
  }

  return report
}

/**
 * Get log file name for a channel
 */
function getLogFileName(channel: QIWChannel): string {
  switch (channel) {
    case 'build':
      return 'build.log'
    case 'lint':
      return 'lint.log'
    case 'test':
      return 'test.log'
    case 'deployment_simulation':
      return 'deployment-simulation.log'
    case 'runtime_initialization':
      return 'runtime-init.log'
    default:
      return `${channel}.log`
  }
}

/**
 * Generate recommendations from anomalies
 */
function generateRecommendations(anomalies: QIWAnomaly[]): string[] {
  const recommendations = new Set<string>()
  
  for (const anomaly of anomalies) {
    recommendations.add(anomaly.recommendation)
  }
  
  // Add general recommendations based on anomaly patterns
  const criticalCount = anomalies.filter(a => a.severity === 'critical').length
  const errorCount = anomalies.filter(a => a.severity === 'error').length
  
  if (criticalCount > 0) {
    recommendations.add('Address all critical issues immediately - QA cannot proceed')
  }
  
  if (errorCount > 3) {
    recommendations.add('Multiple errors detected - review entire build/test pipeline')
  }
  
  const missingLogs = anomalies.filter(a => a.pattern === 'missing_log_file')
  if (missingLogs.length > 0) {
    recommendations.add('Ensure all build/lint/test processes create proper log files')
  }
  
  return Array.from(recommendations)
}

/**
 * Write QIW events to governance memory
 */
function writeGovernanceMemory(
  report: QIWReport,
  config: QIWConfig
): void {
  console.log('[QIW] Writing governance memory entries...')
  
  const memoryDir = path.join(process.cwd(), 'memory', 'global')
  const memoryFile = path.join(memoryDir, 'qiw-events.json')
  
  // Ensure memory directory exists
  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true })
  }
  
  // Load existing events
  let events: GovernanceMemoryQIWEntry[] = []
  if (fs.existsSync(memoryFile)) {
    try {
      events = JSON.parse(fs.readFileSync(memoryFile, 'utf-8'))
    } catch (error) {
      console.error('[QIW] Failed to load existing QIW events:', error)
    }
  }
  
  // Add new events for each critical/error anomaly
  for (const anomaly of report.allAnomalies) {
    if (anomaly.severity === 'critical' || anomaly.severity === 'error') {
      const entry: GovernanceMemoryQIWEntry = {
        whatFailed: anomaly.description,
        where: `${anomaly.logFile}:${anomaly.lineNumber}`,
        why: analyzeRootCause(anomaly),
        recommendedFix: anomaly.recommendation,
        missingArchitectureRule: determineMissingRule(anomaly),
        channel: anomaly.channel,
        severity: anomaly.severity,
        timestamp: anomaly.detectedAt,
        buildSequenceId: report.buildSequenceId,
        projectId: report.projectId
      }
      
      events.push(entry)
    }
  }
  
  // Save updated events
  try {
    fs.writeFileSync(memoryFile, JSON.stringify(events, null, 2), 'utf-8')
    console.log(`[QIW] Wrote ${report.allAnomalies.length} events to governance memory`)
  } catch (error) {
    console.error('[QIW] Failed to write governance memory:', error)
  }
}

/**
 * Analyze root cause of an anomaly
 */
function analyzeRootCause(anomaly: QIWAnomaly): string {
  if (anomaly.pattern === 'missing_log_file') {
    return `${anomaly.channel} process did not create expected log file`
  }
  
  if (anomaly.logLine.includes('TS') && /TS\d{4}/.test(anomaly.logLine)) {
    return 'TypeScript compilation error - type safety violation'
  }
  
  if (/module not found|cannot find module/i.test(anomaly.logLine)) {
    return 'Missing dependency or incorrect import path'
  }
  
  if (/deprecated/i.test(anomaly.logLine)) {
    return 'Use of deprecated API - needs migration'
  }
  
  if (anomaly.channel === 'test' && /fail/i.test(anomaly.logLine)) {
    return 'Test assertion failed - implementation does not match expectation'
  }
  
  if (anomaly.channel === 'build') {
    return 'Build process error - compilation or bundling failure'
  }
  
  if (anomaly.channel === 'lint') {
    return 'Code quality issue - violates linting rules'
  }
  
  return 'Quality integrity violation detected in logs'
}

/**
 * Determine missing architecture rule
 */
function determineMissingRule(anomaly: QIWAnomaly): string | undefined {
  if (anomaly.pattern === 'missing_log_file') {
    return 'All build/lint/test processes MUST create log files for QIW monitoring'
  }
  
  if (anomaly.channel === 'test' && /skip/i.test(anomaly.logLine)) {
    return 'Tests MUST NOT be skipped without explicit documentation'
  }
  
  if (/deprecated/i.test(anomaly.logLine)) {
    return 'Deprecated APIs MUST be migrated or explicitly whitelisted'
  }
  
  if (anomaly.severity === 'critical') {
    return 'Critical issues MUST block QA and deployment'
  }
  
  return undefined
}

/**
 * Generate QIW report markdown
 */
export function generateQIWReportMarkdown(report: QIWReport): string {
  const sections: string[] = []
  
  sections.push('# Quality Integrity Watchdog (QIW) Report\n')
  sections.push(`**Timestamp**: ${report.generatedAt}\n`)
  sections.push(`**Overall Status**: ${report.passed ? '✅ PASSED' : '❌ FAILED'}\n`)
  sections.push(`**QA Blocked**: ${report.qaBlocked ? '🚫 YES' : '✅ NO'}\n`)
  sections.push(`**Summary**: ${report.summary}\n`)
  
  sections.push('## Anomaly Summary\n')
  sections.push(`- **Critical**: ${report.criticalCount}`)
  sections.push(`- **Errors**: ${report.errorCount}`)
  sections.push(`- **Warnings**: ${report.warningCount}`)
  sections.push(`- **Total**: ${report.allAnomalies.length}\n`)
  
  sections.push('## Channel Results\n')
  for (const channel of report.channels) {
    sections.push(`### ${channel.channel}\n`)
    sections.push(`- **Status**: ${channel.passed ? '✅ PASSED' : '❌ FAILED'}`)
    sections.push(`- **Log File**: ${channel.logFile}`)
    sections.push(`- **Log Exists**: ${channel.logExists ? 'Yes' : 'No'}`)
    sections.push(`- **Errors**: ${channel.errorCount}`)
    sections.push(`- **Warnings**: ${channel.warningCount}`)
    sections.push(`- **Summary**: ${channel.summary}\n`)
    
    if (channel.anomalies.length > 0) {
      sections.push('**Anomalies**:\n')
      for (const anomaly of channel.anomalies) {
        sections.push(`- [${anomaly.severity.toUpperCase()}] Line ${anomaly.lineNumber}: ${anomaly.logLine}`)
        sections.push(`  - Recommendation: ${anomaly.recommendation}`)
      }
      sections.push('')
    }
  }
  
  if (report.recommendations.length > 0) {
    sections.push('## Recommendations\n')
    report.recommendations.forEach((rec, idx) => {
      sections.push(`${idx + 1}. ${rec}`)
    })
    sections.push('')
  }
  
  return sections.join('\n')
}
