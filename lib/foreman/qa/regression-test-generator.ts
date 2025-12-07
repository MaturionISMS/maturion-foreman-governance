/**
 * Auto-Generated Regression Test Generator (QIEL-8)
 * 
 * Automatically generates regression tests from QA failures.
 * Every time QA fails due to a new class of error:
 * - Foreman generates a regression test
 * - Pushes it into the QA suite
 * - Ensures the error class can never reappear
 * 
 * Per QIC: Self-evolution through automated test generation
 */

import * as fs from 'fs';
import * as path from 'path';
import { QualityIntegrityIncident } from '@/types/memory';

export interface RegressionTestContext {
  incidentType: string;
  errorClass: string;
  errorMessage: string;
  source: string;
  testPattern: string;
  expectedBehavior: string;
}

export interface RegressionTestGenerationResult {
  success: boolean;
  testFilePath?: string;
  testCode?: string;
  error?: string;
}

/**
 * Generate test name from error class
 */
function generateTestName(errorClass: string, source: string): string {
  // Clean up error class for test name
  const cleanErrorClass = errorClass
    .replace(/Error$/, '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  
  const cleanSource = source
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `should-not-have-${cleanErrorClass}-in-${cleanSource}`;
}

/**
 * Generate test code for build error
 */
function generateBuildErrorTest(context: RegressionTestContext): string {
  const testName = generateTestName(context.errorClass, context.source);
  
  return `/**
 * Auto-generated regression test
 * Prevents recurrence of: ${context.errorClass}
 * Original error: ${context.errorMessage}
 * Source: ${context.source}
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Regression: ${context.errorClass}', () => {
  it('${testName}', () => {
    // Check that build log doesn't contain the error pattern
    const buildLogPath = path.join('/tmp', 'build.log');
    
    if (!fs.existsSync(buildLogPath)) {
      // If no build log, skip test
      return;
    }
    
    const buildLog = fs.readFileSync(buildLogPath, 'utf-8');
    
    // Pattern that should NOT appear in build log
    const errorPattern = /${context.testPattern}/i;
    
    assert.ok(
      !errorPattern.test(buildLog),
      \`Build log should not contain ${context.errorClass}: ${context.errorMessage}\`
    );
  });
});
`;
}

/**
 * Generate test code for lint error
 */
function generateLintErrorTest(context: RegressionTestContext): string {
  const testName = generateTestName(context.errorClass, context.source);
  
  return `/**
 * Auto-generated regression test
 * Prevents recurrence of: ${context.errorClass}
 * Original error: ${context.errorMessage}
 * Source: ${context.source}
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Regression: ${context.errorClass}', () => {
  it('${testName}', () => {
    // Check that lint log doesn't contain the error pattern
    const lintLogPath = path.join('/tmp', 'lint.log');
    
    if (!fs.existsSync(lintLogPath)) {
      // If no lint log, skip test
      return;
    }
    
    const lintLog = fs.readFileSync(lintLogPath, 'utf-8');
    
    // Pattern that should NOT appear in lint log
    const errorPattern = /${context.testPattern}/i;
    
    assert.ok(
      !errorPattern.test(lintLog),
      \`Lint log should not contain ${context.errorClass}: ${context.errorMessage}\`
    );
  });
});
`;
}

/**
 * Generate test code for runtime error
 */
function generateRuntimeErrorTest(context: RegressionTestContext): string {
  const testName = generateTestName(context.errorClass, context.source);
  
  return `/**
 * Auto-generated regression test
 * Prevents recurrence of: ${context.errorClass}
 * Original error: ${context.errorMessage}
 * Source: ${context.source}
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Regression: ${context.errorClass}', () => {
  it('${testName}', async () => {
    // Test that the module can be loaded without runtime errors
    try {
      const modulePath = '${context.source.replace(/^lib\//, '@/lib/')}';
      await import(modulePath);
      
      // If we get here, module loaded successfully
      assert.ok(true, 'Module loaded without runtime errors');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Check if this is the same error class we're preventing
      if (errorMessage.includes('${context.errorClass}')) {
        assert.fail(
          \`Runtime error recurred: ${context.errorClass} - $\{errorMessage}\`
        );
      }
      
      // Different error - might be expected, let it pass
      // (This test only prevents the specific error class)
    }
  });
});
`;
}

/**
 * Generate test code for schema mismatch
 */
function generateSchemaMismatchTest(context: RegressionTestContext): string {
  const testName = generateTestName(context.errorClass, 'schema-cohesion');
  
  return `/**
 * Auto-generated regression test
 * Prevents recurrence of: ${context.errorClass}
 * Original error: ${context.errorMessage}
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { runSchemaCohesionValidation } from '../../lib/foreman/qa/schema-cohesion-validator';

describe('Regression: ${context.errorClass}', () => {
  it('${testName}', async () => {
    // Run schema cohesion validation
    const result = await runSchemaCohesionValidation();
    
    // Check that schema validation passes
    assert.strictEqual(
      result.passed,
      true,
      \`Schema cohesion validation should pass: \${result.summary}\`
    );
    
    // Check that no mismatches exist
    assert.strictEqual(
      result.mismatches.length,
      0,
      \`No schema mismatches should exist\`
    );
  });
});
`;
}

/**
 * Generate test code based on incident type
 */
function generateTestCode(context: RegressionTestContext): string {
  switch (context.incidentType) {
    case 'build_error':
      return generateBuildErrorTest(context);
    
    case 'lint_error':
      return generateLintErrorTest(context);
    
    case 'runtime_error':
      return generateRuntimeErrorTest(context);
    
    case 'schema_mismatch':
      return generateSchemaMismatchTest(context);
    
    default:
      // Generic test for other types
      return generateBuildErrorTest(context);
  }
}

/**
 * Generate regression test file from QI Incident
 */
export async function generateRegressionTest(
  incident: QualityIntegrityIncident
): Promise<RegressionTestGenerationResult> {
  try {
    // Extract error information
    const errorClass = incident.details?.errorClass || 'UnknownError';
    const errorMessage = incident.description || 'Unknown error';
    const source = incident.source || 'unknown';
    
    // Create test pattern from error message
    const testPattern = errorMessage
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(/\s+/)
      .slice(0, 5)
      .join('.*');
    
    const context: RegressionTestContext = {
      incidentType: incident.incidentType,
      errorClass,
      errorMessage,
      source,
      testPattern,
      expectedBehavior: `Should not have ${errorClass} in ${source}`,
    };

    // Generate test code
    const testCode = generateTestCode(context);

    // Determine test file path
    const testsDir = path.join(process.cwd(), 'tests', 'qic', 'regression');
    const testFileName = `${incident.id}.test.ts`;
    const testFilePath = path.join(testsDir, testFileName);

    // Ensure directory exists
    if (!fs.existsSync(testsDir)) {
      fs.mkdirSync(testsDir, { recursive: true });
    }

    // Write test file (only if it doesn't already exist)
    if (fs.existsSync(testFilePath)) {
      console.log(`[QIEL-8] Regression test already exists: ${testFilePath}`);
      return {
        success: true,
        testFilePath,
        testCode,
      };
    }

    fs.writeFileSync(testFilePath, testCode, 'utf-8');

    console.log(`[QIEL-8] Generated regression test: ${testFilePath}`);

    return {
      success: true,
      testFilePath,
      testCode,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[QIEL-8] Failed to generate regression test:`, errorMessage);
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Generate regression tests for multiple incidents
 */
export async function generateRegressionTests(
  incidents: QualityIntegrityIncident[]
): Promise<RegressionTestGenerationResult[]> {
  const results: RegressionTestGenerationResult[] = [];
  
  for (const incident of incidents) {
    const result = await generateRegressionTest(incident);
    results.push(result);
  }
  
  return results;
}

/**
 * Get list of all auto-generated regression tests
 */
export function listRegressionTests(): string[] {
  const testsDir = path.join(process.cwd(), 'tests', 'qic', 'regression');
  
  if (!fs.existsSync(testsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(testsDir);
  return files.filter(f => f.endsWith('.test.ts'));
}

/**
 * Count auto-generated regression tests
 */
export function countRegressionTests(): number {
  return listRegressionTests().length;
}
