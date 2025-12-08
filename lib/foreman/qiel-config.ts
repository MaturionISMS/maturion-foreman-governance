/**
 * QIEL Configuration Unification Layer
 * 
 * This module provides the SINGLE SOURCE OF TRUTH for all QIEL configuration.
 * Both Foreman's internal QA pipeline and GitHub's merge-queue QIEL pipeline
 * MUST use this exact configuration to ensure identical results.
 * 
 * Per True North Philosophy and One Build Law:
 * - Configuration defined once, consumed everywhere
 * - Zero drift between environments
 * - Zero configuration duplication
 * 
 * This file is parsed by:
 * - Foreman QA runner (lib/foreman/qa/)
 * - GitHub Actions QIEL workflow (.github/workflows/qiel.yml)
 * - Environment diff tool (foreman qa:diff)
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Node.js runtime version - MUST match across all environments
 */
export const NODE_VERSION = '20';

/**
 * Log file paths - MUST be identical in all environments
 */
export const LOG_PATHS = {
  build: '/tmp/build.log',
  lint: '/tmp/lint.log',
  test: '/tmp/test.log',
  deploymentSimulation: '/tmp/deployment-simulation.log',
  runtimeInit: '/tmp/runtime-init.log',
} as const;

/**
 * QIW (Quality Integrity Watchdog) Configuration
 * Anomaly detection thresholds and patterns
 */
export const QIW_CONFIG = {
  // Channels to monitor
  enabledChannels: [
    'build',
    'lint',
    'test',
    'deployment_simulation',
    'runtime_initialization',
  ] as const,

  // Blocking behavior - GSR-QA-STRICT-001: STRICT MODE
  blockOnCritical: true,
  blockOnErrors: true,
  blockOnWarnings: true, // STRICT: All warnings block QA

  // Error detection patterns (RegExp strings for serialization)
  errorPatterns: {
    build: [
      '\\bERROR\\b',
      '\\bError:',
      'Build failed',
      'Compilation error',
      'Failed to compile',
      'TypeError:',
      'ReferenceError:',
      'SyntaxError:',
      'error TS\\d{4}:',
      'Module not found',
      'Cannot find module',
      'Unexpected token',
    ],
    lint: [
      '\\berror\\b',
      '✖',
      '\\d+:\\d+\\s+error',
    ],
    test: [
      '\\bFAIL\\b',
      '\\bfailed\\b',
      '\\bERROR\\b',
      'TypeError:',
      'ReferenceError:',
      'AssertionError:',
      'Test.*failed',
      '\\d+ failing',
    ],
    deployment_simulation: [
      '\\bERROR\\b',
      'Build failed',
      'Deployment failed',
      'Failed to start',
      'Error:',
    ],
    runtime_initialization: [
      '\\bERROR\\b',
      'TypeError:',
      'ReferenceError:',
      'Failed to initialize',
      'Unhandled.*exception',
    ],
  },

  // Warning detection patterns
  warningPatterns: {
    build: [
      '\\bWARN\\b',
      '\\bWarning:',
      '⚠',
      'warning TS\\d{4}:',
      'deprecated',
    ],
    lint: [
      '\\bwarning\\b',
      '⚠',
      '\\d+:\\d+\\s+warning',
    ],
    test: [
      '\\bskipped\\b',
      '\\bpending\\b',
      '\\bWARN\\b',
    ],
    deployment_simulation: [
      '\\bWARN\\b',
      '\\bWarning:',
    ],
    runtime_initialization: [
      '\\bWARN\\b',
      '\\bWarning:',
    ],
  },

  // Deprecated API detection patterns
  deprecatedApiPatterns: [
    'deprecated',
    'DeprecationWarning',
    'DEPRECATED',
    'will be removed',
    'is deprecated',
    'use .* instead',
  ],

  // Stale pattern detection
  stalePatternThresholdDays: 180,
} as const;

/**
 * Drift Monitor Configuration
 * Memory fabric stability thresholds
 */
export const DRIFT_CONFIG = {
  // Enabled drift checks
  enabledChecks: [
    'schema_drift',
    'version_drift',
    'contradiction_drift',
    'staleness_drift',
    'cross_agent_drift',
    'project_drift',
    'pattern_drift',
    'governance_drift',
    'agent_experience_drift',
  ] as const,

  // Staleness thresholds (in days)
  stalenessThresholds: {
    reasoningPatterns: 180,  // 6 months
    architectureLessons: 365, // 1 year
    issues: 90,              // 3 months
    projectMemory: 30,       // 1 month
  },

  // Severity thresholds
  severityThresholds: {
    critical: {
      description: 'Execution must halt',
      blockExecution: true,
    },
    error: {
      description: 'Needs immediate attention',
      blockExecution: true,
      threshold: 3, // Block if >= 3 errors
    },
    warning: {
      description: 'Should be reviewed',
      blockExecution: false,
    },
    info: {
      description: 'Informational only',
      blockExecution: false,
    },
  },

  // Contradiction detection
  contradictionRules: {
    confidence: {
      high: 0.8,
      medium: 0.5,
      low: 0.3,
    },
    blockOnHighConfidence: true,
  },

  // Cross-agent drift detection
  crossAgentDriftThreshold: 0.1, // 10% difference triggers warning

  // Governance drift - schema version
  memoryVersion: '1.0.0',
  schemaVersion: '1.0.0',

  // Blocking behavior - GSR-QA-STRICT-001: STRICT MODE
  blockOnCritical: true,
  blockOnMultipleErrors: true,
  errorThreshold: 1, // STRICT: Block on ANY error (changed from 3)
} as const;

/**
 * QIEL Execution Configuration
 * What gets run and in what order
 */
export const QIEL_EXECUTION_CONFIG = {
  // Quick QIEL (for PRs)
  quick: {
    skipDeploymentSimulation: true,
    skipEngineValidation: true,
    requiredChecks: [
      'logs_exist',
      'build_logs_passed',
      'lint_logs_passed',
      'test_logs_passed',
      'zero_warning_passed',
      'schema_cohesion_passed',
    ],
  },

  // Full QIEL (for main/develop branches)
  full: {
    skipDeploymentSimulation: false,
    skipEngineValidation: false,
    requiredChecks: [
      'logs_exist',
      'build_logs_passed',
      'lint_logs_passed',
      'test_logs_passed',
      'zero_warning_passed',
      'deployment_simulation_passed',
      'schema_cohesion_passed',
      'engine_load_passed',
    ],
  },

  // Build commands - MUST match GitHub workflow exactly
  buildCommands: {
    typecheck: 'npm run typecheck',
    lint: 'npm run lint',
    test: 'npm run test:all',
    build: 'npm run build',
  },

  // Log capture - exact same format as GitHub Actions
  logFormat: {
    redirectStderr: true,  // 2>&1
    tee: true,            // pipe to tee for dual output
    timestampFormat: 'ISO-8601',
  },

  // Timeout configuration (seconds)
  timeouts: {
    typecheck: 300,  // 5 minutes
    lint: 180,       // 3 minutes
    test: 600,       // 10 minutes
    build: 600,      // 10 minutes
  },
} as const;

/**
 * Governance Memory Integration
 */
export const GOVERNANCE_CONFIG = {
  // QI Incident thresholds
  qiIncidentThresholds: {
    maxIncidentsPerDay: 10,
    maxIncidentsPerWeek: 50,
    criticalIncidentBlockThreshold: 1, // Block on any critical incident
  },

  // Memory fabric structure
  memoryPaths: {
    global: 'memory/global',
    foreman: 'memory/foreman',
    projects: 'memory/projects',
  },

  // Schema paths
  schemaPaths: {
    historicalIssues: 'memory/schemas/historical-issues-schema.json',
    knowledgeBase: 'memory/schemas/knowledge-base-schema.json',
    reasoningPatterns: 'memory/schemas/reasoning-patterns-schema.json',
    projectMemory: 'memory/schemas/project-memory-schema.json',
  },

  // Governance rule enforcement
  ruleEnforcement: {
    strict: ['memory-rules', 'governance-model'],
    advisory: ['best-practices'],
  },
} as const;

/**
 * Environment Configuration
 * Runtime environment expectations
 */
export const ENVIRONMENT_CONFIG = {
  // Node.js version
  nodeVersion: NODE_VERSION,

  // Required environment variables
  requiredEnvVars: [
    // Add any required env vars here
  ],

  // Optional environment variables
  optionalEnvVars: [
    'GITHUB_TOKEN',
    'OPENAI_API_KEY',
  ],

  // NPM registry
  npmRegistry: 'https://registry.npmjs.org/',

  // Working directory expectations
  workingDirectory: process.cwd(),

  // Git requirements
  git: {
    requireCleanWorkingTree: false,
    requireMainBranch: false,
  },
} as const;

/**
 * Complete QIEL Configuration
 * Exports everything as a single object for easy consumption
 */
export const QIEL_CONFIG = {
  version: '1.0.0',
  nodeVersion: NODE_VERSION,
  logPaths: LOG_PATHS,
  qiw: QIW_CONFIG,
  drift: DRIFT_CONFIG,
  execution: QIEL_EXECUTION_CONFIG,
  governance: GOVERNANCE_CONFIG,
  environment: ENVIRONMENT_CONFIG,
} as const;

/**
 * Load GitHub workflow configuration and validate it matches
 * Returns differences if any exist
 */
export function validateGitHubWorkflowAlignment(): {
  aligned: boolean;
  differences: string[];
} {
  const differences: string[] = [];

  try {
    const workflowPath = path.join(process.cwd(), '.github/workflows/qiel.yml');
    
    if (!fs.existsSync(workflowPath)) {
      differences.push('GitHub workflow file not found: .github/workflows/qiel.yml');
      return { aligned: false, differences };
    }

    const workflowContent = fs.readFileSync(workflowPath, 'utf-8');

    // ========================================
    // ONE FILE ARCHITECTURE VALIDATION
    // ========================================
    // Per the One QIEL File principle, the workflow should ONLY run
    // "npm run qiel:full" and NOT have hardcoded individual commands.
    // This ensures zero drift between local and CI execution.
    
    // 1. Check Node version - extracts major version only (e.g., "20" from "20.0.0")
    const nodeVersionMatch = workflowContent.match(/node-version:\s*['"]?(\d+)(?:\.\d+(?:\.\d+)?)?['"]?/);
    const workflowMajorVersion = nodeVersionMatch ? nodeVersionMatch[1] : null;
    
    if (workflowMajorVersion && workflowMajorVersion !== NODE_VERSION) {
      differences.push(
        `Node version mismatch: Config=${NODE_VERSION}, Workflow=${workflowMajorVersion}`
      );
    }

    // 2. Check that workflow uses npm run qiel:full (ONE COMMAND)
    if (!workflowContent.includes('npm run qiel:full')) {
      differences.push('Workflow must run "npm run qiel:full" to ensure ONE FILE architecture');
    }

    // 3. Check that workflow does NOT have hardcoded individual commands (NO DUPLICATION)
    // Look for the old pattern of running typecheck/lint/test separately
    const hasHardcodedTypecheck = workflowContent.match(/run:.*npm run typecheck.*2>&1.*tee/);
    const hasHardcodedLint = workflowContent.match(/run:.*npm run lint.*2>&1.*tee/);
    const hasHardcodedTest = workflowContent.match(/run:.*npm run test:all.*2>&1.*tee/);
    
    if (hasHardcodedTypecheck) {
      differences.push('Workflow has hardcoded "npm run typecheck" command - violates ONE FILE principle');
    }
    
    if (hasHardcodedLint) {
      differences.push('Workflow has hardcoded "npm run lint" command - violates ONE FILE principle');
    }
    
    if (hasHardcodedTest) {
      differences.push('Workflow has hardcoded "npm run test:all" command - violates ONE FILE principle');
    }

    // 4. Verify the workflow includes the ONE FILE architecture comment
    if (!workflowContent.includes('ONE QIEL FILE') && !workflowContent.includes('one file')) {
      differences.push('Workflow should document the ONE FILE architecture principle');
    }

  } catch (error) {
    differences.push(`Error validating workflow: ${error}`);
  }

  return {
    aligned: differences.length === 0,
    differences,
  };
}

/**
 * Generate a configuration report for environment comparison
 */
export function generateConfigReport(): string {
  const report: string[] = [];

  report.push('# QIEL Configuration Report');
  report.push('');
  report.push(`**Configuration Version**: ${QIEL_CONFIG.version}`);
  report.push(`**Node Version**: ${QIEL_CONFIG.nodeVersion}`);
  report.push(`**Generated**: ${new Date().toISOString()}`);
  report.push('');

  report.push('## Log Paths');
  Object.entries(QIEL_CONFIG.logPaths).forEach(([key, value]) => {
    report.push(`- **${key}**: \`${value}\``);
  });
  report.push('');

  report.push('## QIW Configuration');
  report.push(`- **Enabled Channels**: ${QIEL_CONFIG.qiw.enabledChannels.join(', ')}`);
  report.push(`- **Block on Critical**: ${QIEL_CONFIG.qiw.blockOnCritical}`);
  report.push(`- **Block on Errors**: ${QIEL_CONFIG.qiw.blockOnErrors}`);
  report.push(`- **Block on Warnings**: ${QIEL_CONFIG.qiw.blockOnWarnings}`);
  report.push('');

  report.push('## Drift Monitor Configuration');
  report.push(`- **Enabled Checks**: ${QIEL_CONFIG.drift.enabledChecks.join(', ')}`);
  report.push(`- **Memory Version**: ${QIEL_CONFIG.drift.memoryVersion}`);
  report.push(`- **Schema Version**: ${QIEL_CONFIG.drift.schemaVersion}`);
  report.push(`- **Block on Critical**: ${QIEL_CONFIG.drift.blockOnCritical}`);
  report.push(`- **Error Threshold**: ${QIEL_CONFIG.drift.errorThreshold}`);
  report.push('');

  report.push('## Staleness Thresholds (days)');
  Object.entries(QIEL_CONFIG.drift.stalenessThresholds).forEach(([key, value]) => {
    report.push(`- **${key}**: ${value}`);
  });
  report.push('');

  report.push('## QIEL Execution');
  report.push('### Quick Mode');
  report.push(`- **Skip Deployment Simulation**: ${QIEL_CONFIG.execution.quick.skipDeploymentSimulation}`);
  report.push(`- **Skip Engine Validation**: ${QIEL_CONFIG.execution.quick.skipEngineValidation}`);
  report.push(`- **Required Checks**: ${QIEL_CONFIG.execution.quick.requiredChecks.join(', ')}`);
  report.push('');
  
  report.push('### Full Mode');
  report.push(`- **Skip Deployment Simulation**: ${QIEL_CONFIG.execution.full.skipDeploymentSimulation}`);
  report.push(`- **Skip Engine Validation**: ${QIEL_CONFIG.execution.full.skipEngineValidation}`);
  report.push(`- **Required Checks**: ${QIEL_CONFIG.execution.full.requiredChecks.join(', ')}`);
  report.push('');

  report.push('## Build Commands');
  Object.entries(QIEL_CONFIG.execution.buildCommands).forEach(([key, value]) => {
    report.push(`- **${key}**: \`${value}\``);
  });
  report.push('');

  report.push('## GitHub Workflow Alignment');
  const validation = validateGitHubWorkflowAlignment();
  if (validation.aligned) {
    report.push('✅ **Status**: ALIGNED');
  } else {
    report.push('❌ **Status**: MISALIGNED');
    report.push('');
    report.push('**Differences**:');
    validation.differences.forEach((diff) => {
      report.push(`- ${diff}`);
    });
  }
  report.push('');

  return report.join('\n');
}

/**
 * Export configuration as JSON for external consumption
 */
export function exportConfigAsJSON(): string {
  return JSON.stringify(QIEL_CONFIG, null, 2);
}

/**
 * Default export
 */
export default QIEL_CONFIG;
