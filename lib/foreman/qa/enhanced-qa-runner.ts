/**
 * Enhanced QA Runner
 * 
 * Integrates all QA checks:
 * - Log parsing QA
 * - Zero-warning policy
 * - Vercel deployment simulation
 * - Quality Integrity Contract enforcement
 * 
 * This is the main QA entry point that enforces the complete
 * Quality Integrity Contract.
 */

import {
  parseAllLogs,
  validateLogsExist,
  generateLogParsingReport,
} from './log-parsing-qa';
import {
  runZeroWarningPolicy,
  generateZeroWarningReport,
} from './zero-warning-policy';
import {
  runVercelSimulation,
  generateVercelSimulationReport,
} from './vercel-simulation-qa';
import { recordQAMiss } from '../memory/qa-miss-tracker';
import {
  runQIWMonitoring,
  generateQIWReportMarkdown
} from '../watchdog/quality-integrity-watchdog';
import { QIWReport } from '@/types/watchdog';
import * as fs from 'fs';

export interface EnhancedQAResult {
  passed: boolean;
  timestamp: string;
  checks: {
    logsExist: boolean;
    logParsingPassed: boolean;
    zeroWarningPassed: boolean;
    vercelSimulationPassed: boolean;
    qiwPassed: boolean;
  };
  logParsing: ReturnType<typeof parseAllLogs>;
  zeroWarning: ReturnType<typeof runZeroWarningPolicy>;
  vercelSimulation: ReturnType<typeof runVercelSimulation>;
  qiwReport: QIWReport;
  overallSummary: string;
  blockersFound: string[];
  reportMarkdown: string;
}

/**
 * Run complete enhanced QA suite
 */
export function runEnhancedQA(options?: {
  projectDir?: string;
  logsDir?: string;
  skipVercelSimulation?: boolean;
  buildSequenceId?: string;
  projectId?: string;
}): EnhancedQAResult {
  const {
    projectDir = process.cwd(),
    logsDir = '/tmp',
    skipVercelSimulation = false,
    buildSequenceId,
    projectId,
  } = options || {};

  console.log('[Enhanced QA] Starting comprehensive QA checks...');

  const timestamp = new Date().toISOString();
  const blockersFound: string[] = [];

  // Step 1: Validate logs exist
  console.log('[Enhanced QA] Step 1: Validating log files exist...');
  const logsValidation = validateLogsExist(logsDir);
  const logsExist = logsValidation.allExist;

  if (!logsExist) {
    const message = `Missing required log files: ${logsValidation.missing.join(', ')}`;
    blockersFound.push(message);
    console.error(`[Enhanced QA] ${message}`);

    // Record as QA miss if logs are missing
    recordQAMiss({
      missedSignal: {
        errorType: 'missing_logs',
        errorMessage: message,
        logFile: 'N/A',
        impactLevel: 'critical',
      },
      rootCause: {
        category: 'log_not_checked',
        description: 'Required log files were not created',
        whyMissed: 'Build/lint/test process did not create expected log files',
      },
      architecturalGap: {
        gapType: 'missing_log_validation',
        description: 'QA must verify all required logs are created',
        documentationNeeded: ['log creation requirements'],
        architectureUpdate: 'Add log file existence validation to QA pipeline',
      },
      qaGap: {
        checkMissing: 'Log file existence check',
        checkType: 'validation',
        howToDetect: 'Check for /tmp/build.log, /tmp/lint.log, /tmp/test.log',
        implementationPlan: 'Add validateLogsExist to QA pipeline',
      },
      enforcementRuleAdded: {
        ruleType: 'validation_step',
        ruleName: 'require_log_files',
        ruleDescription: 'All QA runs must verify log files exist',
        implementation: 'validateLogsExist() in enhanced-qa-runner.ts',
        filesModified: ['lib/foreman/qa/enhanced-qa-runner.ts'],
        verificationMethod: 'Check logs exist before parsing',
      },
      preventionStatus: 'implemented',
      buildSequenceId,
      projectId,
    });
  }

  // Step 2: Log parsing
  console.log('[Enhanced QA] Step 2: Parsing logs for errors and warnings...');
  const logParsing = parseAllLogs(logsDir);
  const logParsingPassed = logParsing.allPassed;

  if (!logParsingPassed) {
    blockersFound.push(logParsing.summary);
    console.error(`[Enhanced QA] ${logParsing.summary}`);
  }

  // Step 3: Zero-warning policy
  console.log('[Enhanced QA] Step 3: Enforcing zero-warning policy...');
  const zeroWarning = runZeroWarningPolicy(logsDir);
  const zeroWarningPassed = zeroWarning.passed;

  if (!zeroWarningPassed) {
    blockersFound.push(zeroWarning.summary);
    console.error(`[Enhanced QA] ${zeroWarning.summary}`);
  }

  // Step 4: Vercel simulation (optional)
  let vercelSimulation: ReturnType<typeof runVercelSimulation>;
  let vercelSimulationPassed = true;

  if (!skipVercelSimulation) {
    console.log('[Enhanced QA] Step 4: Running Vercel deployment simulation...');
    vercelSimulation = runVercelSimulation(projectDir);
    vercelSimulationPassed = vercelSimulation.passed;

    if (!vercelSimulationPassed) {
      blockersFound.push(vercelSimulation.summary);
      console.error(`[Enhanced QA] ${vercelSimulation.summary}`);
    }
  } else {
    console.log('[Enhanced QA] Step 4: Vercel simulation skipped');
    vercelSimulation = {
      passed: true,
      productionBuildPassed: true,
      productionLintPassed: true,
      strictModePassed: true,
      buildOutputValid: true,
      errors: [],
      warnings: [],
      summary: 'Vercel simulation skipped',
    };
  }

  // Step 5: Quality Integrity Watchdog (QIW)
  console.log('[Enhanced QA] Step 5: Running Quality Integrity Watchdog...');
  const qiwReport = runQIWMonitoring({
    logsDir,
    projectDir,
    buildSequenceId,
    projectId,
    blockOnCritical: true,
    blockOnErrors: true,
    blockOnWarnings: false,
    writeGovernanceMemory: true,
    enabledChannels: ['build', 'lint', 'test']
  });
  const qiwPassed = qiwReport.passed;

  if (!qiwPassed) {
    blockersFound.push(qiwReport.summary);
    console.error(`[Enhanced QA] ${qiwReport.summary}`);
    
    // Add specific QIW blockers
    if (qiwReport.qaBlocked) {
      blockersFound.push(`QIW detected ${qiwReport.allAnomalies.length} quality integrity violations`);
    }
  }

  // Determine overall pass/fail
  const passed =
    logsExist &&
    logParsingPassed &&
    zeroWarningPassed &&
    vercelSimulationPassed &&
    qiwPassed;

  const overallSummary = passed
    ? '✅ Enhanced QA: ALL CHECKS PASSED - Quality Integrity Contract satisfied'
    : `❌ Enhanced QA: FAILED - ${blockersFound.length} blockers found`;

  console.log(`[Enhanced QA] ${overallSummary}`);

  // Generate comprehensive report
  const reportSections: string[] = [];
  reportSections.push('# Enhanced QA Report\n');
  reportSections.push(`**Timestamp**: ${timestamp}\n`);
  reportSections.push(`**Overall Status**: ${passed ? '✅ PASSED' : '❌ FAILED'}\n`);
  reportSections.push(`**Summary**: ${overallSummary}\n`);

  if (blockersFound.length > 0) {
    reportSections.push('## Blockers Found\n');
    blockersFound.forEach((blocker, idx) => {
      reportSections.push(`${idx + 1}. ${blocker}`);
    });
    reportSections.push('');
  }

  reportSections.push('---\n');
  reportSections.push(generateLogParsingReport(logParsing));
  reportSections.push('\n---\n');
  reportSections.push(generateZeroWarningReport(zeroWarning));

  if (!skipVercelSimulation) {
    reportSections.push('\n---\n');
    reportSections.push(generateVercelSimulationReport(vercelSimulation));
  }

  // Add QIW report
  reportSections.push('\n---\n');
  reportSections.push(generateQIWReportMarkdown(qiwReport));

  const reportMarkdown = reportSections.join('\n');

  return {
    passed,
    timestamp,
    checks: {
      logsExist,
      logParsingPassed,
      zeroWarningPassed,
      vercelSimulationPassed,
      qiwPassed,
    },
    logParsing,
    zeroWarning,
    vercelSimulation,
    qiwReport,
    overallSummary,
    blockersFound,
    reportMarkdown,
  };
}

/**
 * Quick QA check (logs only, skip Vercel simulation)
 */
export function runQuickQA(logsDir: string = '/tmp'): EnhancedQAResult {
  return runEnhancedQA({
    logsDir,
    skipVercelSimulation: true,
  });
}

/**
 * Full QA check (including Vercel simulation)
 */
export function runFullQA(
  projectDir: string = process.cwd(),
  logsDir: string = '/tmp'
): EnhancedQAResult {
  return runEnhancedQA({
    projectDir,
    logsDir,
    skipVercelSimulation: false,
  });
}

/**
 * Save QA report to file
 */
export function saveQAReport(
  result: EnhancedQAResult,
  outputPath: string
): void {
  fs.writeFileSync(outputPath, result.reportMarkdown, 'utf-8');
  console.log(`[Enhanced QA] Report saved to ${outputPath}`);
}
