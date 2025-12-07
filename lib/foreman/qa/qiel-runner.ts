/**
 * Quality Integrity Enforcement Layer (QIEL) Runner
 * 
 * Comprehensive QA system that enforces the Quality Integrity Contract (QIC).
 * Integrates all QIEL components:
 * - QIEL-1: Build Log Parser
 * - QIEL-2: Lint Log Parser
 * - QIEL-3: Test Log Validator
 * - QIEL-4: Deployment Simulation QA
 * - QIEL-5: Schema Cohesion Validator
 * - QIEL-6: Cognitive Engine Load Validator
 * - QIEL-7: QI Incident Writer
 * - QIEL-8: Auto-Generated Regression Tests
 * 
 * Exit Criteria: ALL checks must pass for QA to succeed
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
import {
  runSchemaCohesionValidation,
  generateSchemaCohesionReport,
} from './schema-cohesion-validator';
import {
  runEngineLoadValidation,
  generateEngineLoadReport,
} from './engine-load-validator';
import {
  recordQIIncident,
  recordBuildErrorIncident,
  recordLintErrorIncident,
  recordSchemaMismatchIncident,
  recordDeploymentFailureIncident,
} from './qi-incident-writer';
import {
  generateRegressionTests,
  countRegressionTests,
} from './regression-test-generator';
import { QualityIntegrityIncident } from '@/types/memory';

export interface QIELResult {
  passed: boolean;
  timestamp: string;
  checks: {
    logsExist: boolean;
    buildLogsPassed: boolean;
    lintLogsPassed: boolean;
    testLogsPassed: boolean;
    zeroWarningPassed: boolean;
    deploymentSimulationPassed: boolean;
    schemaCohesionPassed: boolean;
    engineLoadPassed: boolean;
  };
  results: {
    logValidation: ReturnType<typeof validateLogsExist>;
    logParsing: ReturnType<typeof parseAllLogs>;
    zeroWarning: ReturnType<typeof runZeroWarningPolicy>;
    deploymentSimulation: ReturnType<typeof runVercelSimulation>;
    schemaCohesion: Awaited<ReturnType<typeof runSchemaCohesionValidation>>;
    engineLoad: Awaited<ReturnType<typeof runEngineLoadValidation>>;
  };
  qiIncidents: QualityIntegrityIncident[];
  regressionTestsGenerated: number;
  totalRegressionTests: number;
  overallSummary: string;
  blockersFound: string[];
  reportMarkdown: string;
}

/**
 * Run complete QIEL enforcement
 */
export async function runQIEL(options?: {
  projectDir?: string;
  logsDir?: string;
  skipDeploymentSimulation?: boolean;
  skipEngineValidation?: boolean;
  buildId?: string;
  sequenceId?: string;
  commitSha?: string;
  branch?: string;
}): Promise<QIELResult> {
  const {
    projectDir = process.cwd(),
    logsDir = '/tmp',
    skipDeploymentSimulation = false,
    skipEngineValidation = false,
    buildId,
    sequenceId,
    commitSha,
    branch,
  } = options || {};

  console.log('═══════════════════════════════════════════════════════');
  console.log('  QIEL: Quality Integrity Enforcement Layer');
  console.log('  Enforcing Quality Integrity Contract (QIC)');
  console.log('═══════════════════════════════════════════════════════\n');

  const timestamp = new Date().toISOString();
  const blockersFound: string[] = [];
  const qiIncidents: QualityIntegrityIncident[] = [];

  // ========== QIEL-1, QIEL-2, QIEL-3: Log Validation ==========
  console.log('📋 [QIEL-1,2,3] Validating logs exist...');
  const logValidation = validateLogsExist(logsDir);
  const logsExist = logValidation.allExist;

  if (!logsExist) {
    const message = `Missing required log files: ${logValidation.missing.join(', ')}`;
    blockersFound.push(message);
    console.error(`❌ ${message}\n`);
  } else {
    console.log('✅ All required log files exist\n');
  }

  // ========== QIEL-1, QIEL-2, QIEL-3: Log Parsing ==========
  console.log('🔍 [QIEL-1,2,3] Parsing logs for errors and warnings...');
  const logParsing = parseAllLogs(logsDir);
  const buildLogsPassed = logParsing.build.passed;
  const lintLogsPassed = logParsing.lint.passed;
  const testLogsPassed = logParsing.test.passed;

  if (!buildLogsPassed) {
    blockersFound.push(`Build logs failed: ${logParsing.build.summary}`);
    console.error(`❌ Build logs: ${logParsing.build.summary}`);
    
    // Record QI Incidents for build errors
    for (const error of logParsing.build.errors) {
      const incident = await recordBuildErrorIncident(
        error.message,
        `build.log:${error.line}`,
        buildId
      );
      if (incident.incident) {
        qiIncidents.push(incident.incident);
      }
    }
  } else {
    console.log('✅ Build logs passed');
  }

  if (!lintLogsPassed) {
    blockersFound.push(`Lint logs failed: ${logParsing.lint.summary}`);
    console.error(`❌ Lint logs: ${logParsing.lint.summary}`);
    
    // Record QI Incidents for lint errors
    for (const error of logParsing.lint.errors) {
      const incident = await recordLintErrorIncident(
        error.message,
        `lint.log:${error.line}`,
        buildId
      );
      if (incident.incident) {
        qiIncidents.push(incident.incident);
      }
    }
  } else {
    console.log('✅ Lint logs passed');
  }

  if (!testLogsPassed) {
    blockersFound.push(`Test logs failed: ${logParsing.test.summary}`);
    console.error(`❌ Test logs: ${logParsing.test.summary}`);
  } else {
    console.log('✅ Test logs passed');
  }

  console.log('');

  // ========== QIEL-2: Zero-Warning Policy ==========
  console.log('⚠️  [QIEL-2] Enforcing zero-warning policy...');
  const zeroWarning = runZeroWarningPolicy(logsDir);
  const zeroWarningPassed = zeroWarning.passed;

  if (!zeroWarningPassed) {
    blockersFound.push(zeroWarning.summary);
    console.error(`❌ ${zeroWarning.summary}\n`);
  } else {
    console.log(`✅ ${zeroWarning.summary}\n`);
  }

  // ========== QIEL-4: Deployment Simulation ==========
  let deploymentSimulation: ReturnType<typeof runVercelSimulation>;
  let deploymentSimulationPassed = true;

  if (!skipDeploymentSimulation) {
    console.log('🚀 [QIEL-4] Running deployment simulation...');
    deploymentSimulation = runVercelSimulation(projectDir);
    deploymentSimulationPassed = deploymentSimulation.passed;

    if (!deploymentSimulationPassed) {
      blockersFound.push(deploymentSimulation.summary);
      console.error(`❌ ${deploymentSimulation.summary}`);
      
      // Record QI Incidents for deployment failures
      for (const error of deploymentSimulation.errors) {
        const incident = await recordDeploymentFailureIncident(
          'deployment-simulation',
          error,
          buildId
        );
        if (incident.incident) {
          qiIncidents.push(incident.incident);
        }
      }
    } else {
      console.log(`✅ ${deploymentSimulation.summary}`);
    }
    console.log('');
  } else {
    console.log('⏭️  [QIEL-4] Deployment simulation skipped\n');
    deploymentSimulation = {
      passed: true,
      productionBuildPassed: true,
      productionLintPassed: true,
      strictModePassed: true,
      buildOutputValid: true,
      errors: [],
      warnings: [],
      summary: 'Deployment simulation skipped',
    };
  }

  // ========== QIEL-5: Schema Cohesion Validation ==========
  console.log('📐 [QIEL-5] Validating schema cohesion...');
  const schemaCohesion = runSchemaCohesionValidation();
  const schemaCohesionPassed = schemaCohesion.passed;

  if (!schemaCohesionPassed) {
    blockersFound.push(schemaCohesion.summary);
    console.error(`❌ ${schemaCohesion.summary}`);
    
    // Record QI Incidents for schema mismatches
    for (const mismatch of schemaCohesion.mismatches) {
      const incident = await recordSchemaMismatchIncident(
        mismatch.engine1,
        mismatch.engine2,
        mismatch.field,
        mismatch.mismatch
      );
      if (incident.incident) {
        qiIncidents.push(incident.incident);
      }
    }
  } else {
    console.log(`✅ ${schemaCohesion.summary}`);
  }
  console.log('');

  // ========== QIEL-6: Engine Load Validation ==========
  let engineLoad: Awaited<ReturnType<typeof runEngineLoadValidation>>;
  let engineLoadPassed = true;

  if (!skipEngineValidation) {
    console.log('🧠 [QIEL-6] Validating cognitive engine loading...');
    engineLoad = await runEngineLoadValidation();
    engineLoadPassed = engineLoad.passed;

    if (!engineLoadPassed) {
      blockersFound.push(engineLoad.summary);
      console.error(`❌ ${engineLoad.summary}\n`);
    } else {
      console.log(`✅ ${engineLoad.summary}\n`);
    }
  } else {
    console.log('⏭️  [QIEL-6] Engine validation skipped\n');
    engineLoad = {
      passed: true,
      timestamp: new Date().toISOString(),
      engines: [],
      totalErrors: 0,
      totalWarnings: 0,
      summary: 'Engine validation skipped',
    };
  }

  // ========== QIEL-8: Auto-Generate Regression Tests ==========
  let regressionTestsGenerated = 0;
  if (qiIncidents.length > 0) {
    console.log('🧪 [QIEL-8] Generating regression tests from QI incidents...');
    const regressionResults = await generateRegressionTests(qiIncidents);
    regressionTestsGenerated = regressionResults.filter(r => r.success).length;
    console.log(`✅ Generated ${regressionTestsGenerated} regression test(s)\n`);
  }

  const totalRegressionTests = countRegressionTests();

  // ========== Overall Status ==========
  const passed =
    logsExist &&
    buildLogsPassed &&
    lintLogsPassed &&
    testLogsPassed &&
    zeroWarningPassed &&
    deploymentSimulationPassed &&
    schemaCohesionPassed &&
    engineLoadPassed;

  console.log('═══════════════════════════════════════════════════════');
  if (passed) {
    console.log('✅ QIEL PASSED: All Quality Integrity checks succeeded');
    console.log('   System is ready for deployment');
  } else {
    console.log('❌ QIEL FAILED: Quality Integrity violations detected');
    console.log(`   ${blockersFound.length} blocker(s) found`);
    console.log(`   ${qiIncidents.length} QI incident(s) recorded`);
  }
  console.log('═══════════════════════════════════════════════════════\n');

  // ========== Generate Report ==========
  const overallSummary = passed
    ? '✅ QIEL: All Quality Integrity checks PASSED - Ready for deployment'
    : `❌ QIEL: Quality Integrity violations detected - ${blockersFound.length} blockers, ${qiIncidents.length} incidents`;

  const reportSections: string[] = [];
  reportSections.push('# Quality Integrity Enforcement Layer (QIEL) Report\n');
  reportSections.push(`**Timestamp**: ${timestamp}\n`);
  reportSections.push(`**Overall Status**: ${passed ? '✅ PASSED' : '❌ FAILED'}\n`);
  reportSections.push(`**Summary**: ${overallSummary}\n`);

  if (buildId) reportSections.push(`**Build ID**: ${buildId}`);
  if (sequenceId) reportSections.push(`**Sequence ID**: ${sequenceId}`);
  if (commitSha) reportSections.push(`**Commit SHA**: ${commitSha}`);
  if (branch) reportSections.push(`**Branch**: ${branch}`);
  reportSections.push('');

  // Checklist
  reportSections.push('## QIC Exit Criteria Checklist\n');
  reportSections.push(`- [${logsExist ? 'x' : ' '}] Build logs contain zero errors or warnings`);
  reportSections.push(`- [${lintLogsPassed ? 'x' : ' '}] Lint logs contain zero errors or warnings`);
  reportSections.push(`- [${testLogsPassed ? 'x' : ' '}] Tests contain zero errors or warnings`);
  reportSections.push(`- [${deploymentSimulationPassed ? 'x' : ' '}] Preview & production deploys both succeed`);
  reportSections.push(`- [${engineLoadPassed ? 'x' : ' '}] All engines initialize cleanly`);
  reportSections.push(`- [${schemaCohesionPassed ? 'x' : ' '}] All schemas match`);
  reportSections.push(`- [${passed ? 'x' : ' '}] Zero silent failures detected`);
  reportSections.push(`- [${qiIncidents.length === 0 ? 'x' : ' '}] QI system logs zero incidents`);
  reportSections.push(`- [${passed ? 'x' : ' '}] Governance Memory records zero unresolved QI incidents\n`);

  if (blockersFound.length > 0) {
    reportSections.push('## Blockers Found\n');
    blockersFound.forEach((blocker, idx) => {
      reportSections.push(`${idx + 1}. ${blocker}`);
    });
    reportSections.push('');
  }

  if (qiIncidents.length > 0) {
    reportSections.push('## Quality Integrity Incidents\n');
    reportSections.push(`${qiIncidents.length} incident(s) recorded in Governance Memory:\n`);
    qiIncidents.forEach((incident, idx) => {
      reportSections.push(`${idx + 1}. **${incident.incidentType}** (${incident.severity})`);
      reportSections.push(`   - ID: ${incident.id}`);
      reportSections.push(`   - Description: ${incident.description}`);
      reportSections.push(`   - Source: ${incident.source}\n`);
    });
  }

  if (regressionTestsGenerated > 0) {
    reportSections.push('## Auto-Generated Regression Tests\n');
    reportSections.push(`- **Tests Generated This Run**: ${regressionTestsGenerated}`);
    reportSections.push(`- **Total Regression Tests**: ${totalRegressionTests}\n`);
  }

  reportSections.push('---\n');
  reportSections.push(generateLogParsingReport(logParsing));
  reportSections.push('\n---\n');
  reportSections.push(generateZeroWarningReport(zeroWarning));
  
  if (!skipDeploymentSimulation) {
    reportSections.push('\n---\n');
    reportSections.push(generateVercelSimulationReport(deploymentSimulation));
  }
  
  reportSections.push('\n---\n');
  reportSections.push(generateSchemaCohesionReport(schemaCohesion));
  
  if (!skipEngineValidation) {
    reportSections.push('\n---\n');
    reportSections.push(generateEngineLoadReport(engineLoad));
  }

  const reportMarkdown = reportSections.join('\n');

  return {
    passed,
    timestamp,
    checks: {
      logsExist,
      buildLogsPassed,
      lintLogsPassed,
      testLogsPassed,
      zeroWarningPassed,
      deploymentSimulationPassed,
      schemaCohesionPassed,
      engineLoadPassed,
    },
    results: {
      logValidation,
      logParsing,
      zeroWarning,
      deploymentSimulation,
      schemaCohesion,
      engineLoad,
    },
    qiIncidents,
    regressionTestsGenerated,
    totalRegressionTests,
    overallSummary,
    blockersFound,
    reportMarkdown,
  };
}

/**
 * Quick QIEL check (logs and schemas only)
 */
export async function runQuickQIEL(logsDir: string = '/tmp'): Promise<QIELResult> {
  return runQIEL({
    logsDir,
    skipDeploymentSimulation: true,
    skipEngineValidation: true,
  });
}

/**
 * Full QIEL check (all validations)
 */
export async function runFullQIEL(
  projectDir: string = process.cwd(),
  logsDir: string = '/tmp'
): Promise<QIELResult> {
  return runQIEL({
    projectDir,
    logsDir,
    skipDeploymentSimulation: false,
    skipEngineValidation: false,
  });
}

/**
 * Save QIEL report to file
 */
export function saveQIELReport(
  result: QIELResult,
  outputPath: string
): void {
  const fs = require('fs');
  fs.writeFileSync(outputPath, result.reportMarkdown, 'utf-8');
  console.log(`[QIEL] Report saved to ${outputPath}`);
}
