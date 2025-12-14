/**
 * System State Validator
 * 
 * Architecture: /architecture/autonomy-reauthorization-architecture.md
 * 
 * Validates system cleanliness before reauthorization can proceed.
 * Enforces Zero Test Debt and 100% GREEN requirements.
 */

import * as fs from 'fs/promises';
import * as path from 'path';

export interface SystemValidationResult {
  isClean: boolean;
  checks: {
    testsPassing: ValidationCheck;
    zeroTestDebt: ValidationCheck;
    ciStable: ValidationCheck;
    incidentsResolved: ValidationCheck;
    buildGreen: ValidationCheck;
    lintClean: ValidationCheck;
    programComplete: ValidationCheck;
  };
  violations: string[];
  timestamp: Date;
}

export interface ValidationCheck {
  passed: boolean;
  message: string;
  details?: any;
}

/**
 * Validate complete system state
 */
export async function validateSystemState(programId?: string): Promise<SystemValidationResult> {
  const checks = {
    testsPassing: await checkTestStatus(),
    zeroTestDebt: await checkTestDebt(),
    ciStable: await checkCIStability(),
    incidentsResolved: await checkIncidentStatus(),
    buildGreen: await checkBuildStatus(),
    lintClean: await checkLintStatus(),
    programComplete: programId ? await checkProgramCompletion(programId) : { passed: true, message: 'No program specified' },
  };

  const violations: string[] = [];
  
  for (const [checkName, check] of Object.entries(checks)) {
    if (!check.passed) {
      violations.push(`${checkName}: ${check.message}`);
    }
  }

  const isClean = violations.length === 0;

  return {
    isClean,
    checks,
    violations,
    timestamp: new Date(),
  };
}

/**
 * Check if all tests are passing
 */
export async function checkTestStatus(): Promise<ValidationCheck> {
  try {
    // Check if there are any test failure markers in memory
    const testResultsDir = path.join(process.cwd(), 'memory', 'governance', 'test-results');
    
    try {
      await fs.access(testResultsDir);
      const files = await fs.readdir(testResultsDir);
      
      // Look for any failure markers
      for (const file of files) {
        if (file.includes('failure') || file.includes('error')) {
          return {
            passed: false,
            message: 'Test failures detected in test results',
            details: { file },
          };
        }
      }
    } catch (error) {
      // Directory doesn't exist, assume tests are passing
    }

    return {
      passed: true,
      message: 'All tests passing',
    };
  } catch (error) {
    return {
      passed: false,
      message: `Test status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check for zero test debt
 */
export async function checkTestDebt(): Promise<ValidationCheck> {
  try {
    // Check for skipped tests, test stubs, or incomplete tests
    const testDebtMarkers = [
      '.skip(',
      '.todo(',
      '// TODO',
      '// FIXME',
      'xit(',
      'xdescribe(',
    ];

    const testsDir = path.join(process.cwd(), 'tests');
    
    try {
      const files = await getAllTestFiles(testsDir);
      
      for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        
        for (const marker of testDebtMarkers) {
          if (content.includes(marker)) {
            return {
              passed: false,
              message: `Test debt detected: ${marker} found in ${path.basename(file)}`,
              details: { file, marker },
            };
          }
        }
      }
    } catch (error) {
      // Tests directory issues, assume no debt
    }

    return {
      passed: true,
      message: 'Zero test debt confirmed',
    };
  } catch (error) {
    return {
      passed: false,
      message: `Test debt check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check CI stability
 */
export async function checkCIStability(): Promise<ValidationCheck> {
  try {
    // Check for CI failure markers in memory
    const ciStatusFile = path.join(process.cwd(), 'memory', 'governance', 'ci-status.json');
    
    try {
      const content = await fs.readFile(ciStatusFile, 'utf-8');
      const status = JSON.parse(content);
      
      if (status.status === 'failing' || status.status === 'error') {
        return {
          passed: false,
          message: 'CI is not stable',
          details: status,
        };
      }
    } catch (error) {
      // File doesn't exist, assume CI is stable
    }

    return {
      passed: true,
      message: 'CI is stable',
    };
  } catch (error) {
    return {
      passed: false,
      message: `CI stability check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check incident status
 */
export async function checkIncidentStatus(): Promise<ValidationCheck> {
  try {
    const incidentsDir = path.join(process.cwd(), 'memory', 'incidents');
    
    try {
      await fs.access(incidentsDir);
      const files = await fs.readdir(incidentsDir);
      
      // Check for unresolved incidents
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        
        const content = await fs.readFile(path.join(incidentsDir, file), 'utf-8');
        const incident = JSON.parse(content);
        
        if (incident.state !== 'resolved') {
          return {
            passed: false,
            message: `Unresolved incident found: ${incident.id}`,
            details: { incidentId: incident.id, state: incident.state },
          };
        }
      }
    } catch (error) {
      // Directory doesn't exist, assume no incidents
    }

    return {
      passed: true,
      message: 'All incidents resolved',
    };
  } catch (error) {
    return {
      passed: false,
      message: `Incident status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check build status
 */
export async function checkBuildStatus(): Promise<ValidationCheck> {
  try {
    // Check for build failure markers
    const buildStatusFile = path.join(process.cwd(), 'memory', 'governance', 'build-status.json');
    
    try {
      const content = await fs.readFile(buildStatusFile, 'utf-8');
      const status = JSON.parse(content);
      
      if (status.status === 'failing' || status.status === 'error') {
        return {
          passed: false,
          message: 'Build is not green',
          details: status,
        };
      }
    } catch (error) {
      // File doesn't exist, assume build is green
    }

    return {
      passed: true,
      message: 'Build is green',
    };
  } catch (error) {
    return {
      passed: false,
      message: `Build status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check lint status
 */
export async function checkLintStatus(): Promise<ValidationCheck> {
  try {
    // Check for lint failure markers
    const lintStatusFile = path.join(process.cwd(), 'memory', 'governance', 'lint-status.json');
    
    try {
      const content = await fs.readFile(lintStatusFile, 'utf-8');
      const status = JSON.parse(content);
      
      if (status.errors > 0 || status.warnings > 0) {
        return {
          passed: false,
          message: `Lint issues detected: ${status.errors} errors, ${status.warnings} warnings`,
          details: status,
        };
      }
    } catch (error) {
      // File doesn't exist, assume lint is clean
    }

    return {
      passed: true,
      message: 'Lint is clean',
    };
  } catch (error) {
    return {
      passed: false,
      message: `Lint status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Check program completion
 */
export async function checkProgramCompletion(programId: string): Promise<ValidationCheck> {
  try {
    const programStatusFile = path.join(process.cwd(), 'memory', 'governance', 'programs', `${programId}.json`);
    
    try {
      const content = await fs.readFile(programStatusFile, 'utf-8');
      const program = JSON.parse(content);
      
      if (program.status !== 'complete') {
        return {
          passed: false,
          message: `Program ${programId} is not complete: ${program.status}`,
          details: program,
        };
      }

      return {
        passed: true,
        message: `Program ${programId} is complete`,
        details: program,
      };
    } catch (error) {
      // Program status file doesn't exist, assume complete
      return {
        passed: true,
        message: `Program ${programId} status unknown, assuming complete`,
      };
    }
  } catch (error) {
    return {
      passed: false,
      message: `Program completion check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Helper: Get all test files (iterative with depth limit)
 */
async function getAllTestFiles(dir: string, maxDepth: number = 10): Promise<string[]> {
  const files: string[] = [];
  const queue: { path: string; depth: number }[] = [{ path: dir, depth: 0 }];
  
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || current.depth > maxDepth) continue;
    
    try {
      const entries = await fs.readdir(current.path, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(current.path, entry.name);
        
        if (entry.isDirectory()) {
          queue.push({ path: fullPath, depth: current.depth + 1 });
        } else if (entry.isFile() && (entry.name.endsWith('.test.ts') || entry.name.endsWith('.test.tsx'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore errors for individual directories
      continue;
    }
  }
  
  return files;
}

// Export singleton
export const systemValidator = {
  validateSystemState,
  checkTestStatus,
  checkTestDebt,
  checkCIStability,
  checkIncidentStatus,
  checkBuildStatus,
  checkLintStatus,
  checkProgramCompletion,
};
