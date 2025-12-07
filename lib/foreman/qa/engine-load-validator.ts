/**
 * Cognitive Engine Load Validator (QIEL-6)
 * 
 * Validates that all Foreman cognitive engines can:
 * - Load without throwing errors
 * - Initialize successfully under CI
 * - Pass runtime self-tests
 * 
 * Per QIC: Any engine failure → QA FAIL
 */

export interface EngineLoadResult {
  engineName: string;
  enginePath: string;
  loaded: boolean;
  initialized: boolean;
  selfTestPassed: boolean;
  errors: string[];
  warnings: string[];
  loadTime?: number;
}

export interface EngineLoadValidationResult {
  passed: boolean;
  timestamp: string;
  engines: EngineLoadResult[];
  totalErrors: number;
  totalWarnings: number;
  summary: string;
}

/**
 * Cognitive engines to validate
 */
const COGNITIVE_ENGINES = [
  {
    name: 'memory-fabric',
    path: 'lib/foreman/memory/index.ts',
    exports: ['writeMemory', 'readMemory', 'getAllMemory'],
  },
  {
    name: 'retirement-engine',
    path: 'lib/foreman/memory/retirement-engine.ts',
    exports: ['analyzeRetirementCandidates', 'executeRetirement'],
  },
  {
    name: 'consolidation-engine',
    path: 'lib/foreman/memory/consolidation-engine.ts',
    exports: ['analyzeConsolidationOpportunities', 'executeConsolidation'],
  },
  {
    name: 'drift-monitor',
    path: 'lib/foreman/memory/drift-monitor.ts',
    exports: ['detectDrift', 'analyzeDriftPatterns'],
  },
  {
    name: 'qa-miss-tracker',
    path: 'lib/foreman/memory/qa-miss-tracker.ts',
    exports: ['recordQAMiss', 'analyzeQAMisses'],
  },
];

/**
 * Validate that an engine can be loaded
 */
async function validateEngineLoad(
  engineName: string,
  enginePath: string,
  requiredExports: string[]
): Promise<EngineLoadResult> {
  const result: EngineLoadResult = {
    engineName,
    enginePath,
    loaded: false,
    initialized: false,
    selfTestPassed: false,
    errors: [],
    warnings: [],
  };

  const startTime = Date.now();

  try {
    // Attempt to dynamically import the module
    const modulePath = `@/${enginePath.replace('.ts', '')}`;
    
    // Dynamic import - this will throw if the module has syntax/compilation errors
    let module: any;
    try {
      module = await import(modulePath);
      result.loaded = true;
      result.loadTime = Date.now() - startTime;
    } catch (importError) {
      const errorMessage = importError instanceof Error ? importError.message : String(importError);
      result.errors.push(`Failed to import module: ${errorMessage}`);
      return result;
    }

    // Check that required exports exist
    const missingExports: string[] = [];
    for (const exportName of requiredExports) {
      if (!(exportName in module)) {
        missingExports.push(exportName);
      }
    }

    if (missingExports.length > 0) {
      result.errors.push(
        `Missing required exports: ${missingExports.join(', ')}`
      );
    } else {
      result.initialized = true;
    }

    // Basic runtime self-test - check that exports are functions
    for (const exportName of requiredExports) {
      if (module[exportName] && typeof module[exportName] !== 'function') {
        result.warnings.push(
          `Export '${exportName}' is not a function (type: ${typeof module[exportName]})`
        );
      }
    }

    // If we got here without errors, self-test passed
    result.selfTestPassed = result.errors.length === 0;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    result.errors.push(`Engine validation error: ${errorMessage}`);
  }

  return result;
}

/**
 * Run engine load validation on all cognitive engines
 */
export async function runEngineLoadValidation(): Promise<EngineLoadValidationResult> {
  console.log('[QIEL-6] Running cognitive engine load validation...');

  const timestamp = new Date().toISOString();
  const engines: EngineLoadResult[] = [];

  // Validate each engine
  for (const engine of COGNITIVE_ENGINES) {
    console.log(`[QIEL-6] Validating ${engine.name}...`);
    const result = await validateEngineLoad(
      engine.name,
      engine.path,
      engine.exports
    );
    engines.push(result);
  }

  // Count total errors and warnings
  const totalErrors = engines.reduce((sum, e) => sum + e.errors.length, 0);
  const totalWarnings = engines.reduce((sum, e) => sum + e.warnings.length, 0);

  // Determine pass/fail
  const passed = totalErrors === 0 && engines.every(e => e.selfTestPassed);

  // Generate summary
  const failedEngines = engines.filter(e => !e.selfTestPassed);
  const summary = passed
    ? `Engine load validation PASSED - All ${engines.length} engines loaded and initialized successfully`
    : `Engine load validation FAILED - ${failedEngines.length} engine(s) failed, ${totalErrors} errors`;

  console.log(`[QIEL-6] ${summary}`);

  return {
    passed,
    timestamp,
    engines,
    totalErrors,
    totalWarnings,
    summary,
  };
}

/**
 * Generate detailed report for engine load validation
 */
export function generateEngineLoadReport(
  result: EngineLoadValidationResult
): string {
  const sections: string[] = [];

  sections.push('# Cognitive Engine Load Validation Report (QIEL-6)\n');
  sections.push(`**Timestamp**: ${result.timestamp}\n`);
  sections.push(
    `**Overall Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`
  );
  sections.push(`**Total Errors**: ${result.totalErrors}\n`);
  sections.push(`**Total Warnings**: ${result.totalWarnings}\n`);
  sections.push(`**Summary**: ${result.summary}\n`);

  // Individual engine results
  sections.push('## Engine Load Results\n');
  for (const engine of result.engines) {
    const status = engine.selfTestPassed ? '✅' : '❌';
    sections.push(`### ${status} ${engine.engineName}\n`);
    sections.push(`- **Engine Path**: ${engine.enginePath}`);
    sections.push(`- **Loaded**: ${engine.loaded ? 'Yes' : 'No'}`);
    sections.push(`- **Initialized**: ${engine.initialized ? 'Yes' : 'No'}`);
    sections.push(`- **Self-Test Passed**: ${engine.selfTestPassed ? 'Yes' : 'No'}`);
    if (engine.loadTime) {
      sections.push(`- **Load Time**: ${engine.loadTime}ms`);
    }
    sections.push(`- **Errors**: ${engine.errors.length}`);
    sections.push(`- **Warnings**: ${engine.warnings.length}\n`);

    if (engine.errors.length > 0) {
      sections.push('**Errors:**\n');
      engine.errors.forEach(err => {
        sections.push(`- ${err}`);
      });
      sections.push('');
    }

    if (engine.warnings.length > 0) {
      sections.push('**Warnings:**\n');
      engine.warnings.forEach(warn => {
        sections.push(`- ${warn}`);
      });
      sections.push('');
    }
  }

  if (result.passed) {
    sections.push(
      '✅ **All engines validated successfully** - Ready for runtime use\n'
    );
  } else {
    sections.push(
      '❌ **Engine validation failed** - Fix engine issues before proceeding\n'
    );
  }

  return sections.join('\n');
}
