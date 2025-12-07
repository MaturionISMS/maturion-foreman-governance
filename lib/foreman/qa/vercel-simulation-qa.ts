/**
 * Vercel Deployment Simulation QA
 * 
 * Simulates Vercel deployment environment to catch deployment failures
 * before they reach production.
 * 
 * Runs:
 * - Production build (next build)
 * - Production lint (next lint --strict)
 * - Strict mode validation
 * - Build output validation
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export interface VercelSimulationResult {
  passed: boolean;
  productionBuildPassed: boolean;
  productionLintPassed: boolean;
  strictModePassed: boolean;
  buildOutputValid: boolean;
  errors: string[];
  warnings: string[];
  summary: string;
}

/**
 * Run production build simulation
 */
function runProductionBuild(
  projectDir: string
): { passed: boolean; output: string; errors: string[] } {
  const errors: string[] = [];
  let output = '';

  try {
    // Run next build
    output = execSync('npm run build', {
      cwd: projectDir,
      encoding: 'utf-8',
      stdio: 'pipe',
      env: {
        ...process.env,
        NODE_ENV: 'production',
      },
    });

    // Check output for errors
    if (
      output.includes('Build failed') ||
      output.includes('Failed to compile') ||
      output.includes('ERROR')
    ) {
      errors.push('Production build contains errors');
    }

    return { passed: errors.length === 0, output, errors };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    errors.push(`Production build failed: ${errorMessage}`);
    return { passed: false, output, errors };
  }
}

/**
 * Run production lint simulation
 */
function runProductionLint(
  projectDir: string
): { passed: boolean; output: string; errors: string[] } {
  const errors: string[] = [];
  let output = '';

  try {
    // Run next lint with strict mode
    output = execSync('npm run lint', {
      cwd: projectDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    // Check output for errors
    if (output.includes('error') || output.includes('✖')) {
      errors.push('Production lint contains errors');
    }

    return { passed: errors.length === 0, output, errors };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    errors.push(`Production lint failed: ${errorMessage}`);
    return { passed: false, output, errors };
  }
}

/**
 * Validate TypeScript strict mode
 */
function validateStrictMode(
  projectDir: string
): { passed: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check tsconfig.json for strict mode
  const tsconfigPath = path.join(projectDir, 'tsconfig.json');

  if (!fs.existsSync(tsconfigPath)) {
    errors.push('tsconfig.json not found');
    return { passed: false, errors };
  }

  try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

    // Check for strict mode settings
    const compilerOptions = tsconfig.compilerOptions || {};

    if (!compilerOptions.strict) {
      errors.push('TypeScript strict mode is not enabled');
    }

    // Run TypeScript compiler check
    try {
      execSync('npx tsc --noEmit', {
        cwd: projectDir,
        encoding: 'utf-8',
        stdio: 'pipe',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('error TS')) {
        errors.push(`TypeScript strict mode errors: ${errorMessage}`);
      }
    }

    return { passed: errors.length === 0, errors };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    errors.push(`Failed to validate strict mode: ${errorMessage}`);
    return { passed: false, errors };
  }
}

/**
 * Validate build output artifacts
 */
function validateBuildOutput(
  projectDir: string
): { passed: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for .next directory
  const nextDir = path.join(projectDir, '.next');
  if (!fs.existsSync(nextDir)) {
    errors.push('.next build directory not found');
    return { passed: false, errors };
  }

  // Check for required build artifacts
  const requiredArtifacts = [
    '.next/BUILD_ID',
    '.next/build-manifest.json',
    '.next/routes-manifest.json',
  ];

  for (const artifact of requiredArtifacts) {
    const artifactPath = path.join(projectDir, artifact);
    if (!fs.existsSync(artifactPath)) {
      errors.push(`Required build artifact not found: ${artifact}`);
    }
  }

  // Check for broken imports in build manifest
  const buildManifestPath = path.join(projectDir, '.next/build-manifest.json');
  if (fs.existsSync(buildManifestPath)) {
    try {
      const manifest = JSON.parse(
        fs.readFileSync(buildManifestPath, 'utf-8')
      );
      // Basic validation - manifest should have pages
      if (!manifest.pages || Object.keys(manifest.pages).length === 0) {
        errors.push('Build manifest contains no pages');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      errors.push(`Failed to parse build manifest: ${errorMessage}`);
    }
  }

  return { passed: errors.length === 0, errors };
}

/**
 * Run complete Vercel deployment simulation
 */
export function runVercelSimulation(
  projectDir: string = process.cwd()
): VercelSimulationResult {
  console.log('[Vercel Simulation] Starting deployment simulation...');

  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // Step 1: Production build
  console.log('[Vercel Simulation] Running production build...');
  const buildResult = runProductionBuild(projectDir);
  const productionBuildPassed = buildResult.passed;
  allErrors.push(...buildResult.errors);

  // Step 2: Production lint
  console.log('[Vercel Simulation] Running production lint...');
  const lintResult = runProductionLint(projectDir);
  const productionLintPassed = lintResult.passed;
  allErrors.push(...lintResult.errors);

  // Step 3: Strict mode validation
  console.log('[Vercel Simulation] Validating strict mode...');
  const strictResult = validateStrictMode(projectDir);
  const strictModePassed = strictResult.passed;
  allErrors.push(...strictResult.errors);

  // Step 4: Build output validation
  console.log('[Vercel Simulation] Validating build output...');
  const outputResult = validateBuildOutput(projectDir);
  const buildOutputValid = outputResult.passed;
  allErrors.push(...outputResult.errors);

  // Determine overall pass/fail
  const passed =
    productionBuildPassed &&
    productionLintPassed &&
    strictModePassed &&
    buildOutputValid;

  const summary = passed
    ? 'Vercel simulation: PASSED - All deployment checks successful'
    : `Vercel simulation: FAILED - ${allErrors.length} issues found`;

  console.log(`[Vercel Simulation] ${summary}`);

  return {
    passed,
    productionBuildPassed,
    productionLintPassed,
    strictModePassed,
    buildOutputValid,
    errors: allErrors,
    warnings: allWarnings,
    summary,
  };
}

/**
 * Generate detailed report for Vercel simulation
 */
export function generateVercelSimulationReport(
  result: VercelSimulationResult
): string {
  const sections: string[] = [];

  sections.push('# Vercel Deployment Simulation Report\n');
  sections.push(
    `**Overall Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`
  );
  sections.push(`**Summary**: ${result.summary}\n`);

  sections.push('## Simulation Checks\n');
  sections.push(
    `- **Production Build**: ${result.productionBuildPassed ? '✅ PASSED' : '❌ FAILED'}`
  );
  sections.push(
    `- **Production Lint**: ${result.productionLintPassed ? '✅ PASSED' : '❌ FAILED'}`
  );
  sections.push(
    `- **Strict Mode**: ${result.strictModePassed ? '✅ PASSED' : '❌ FAILED'}`
  );
  sections.push(
    `- **Build Output Valid**: ${result.buildOutputValid ? '✅ PASSED' : '❌ FAILED'}\n`
  );

  if (result.errors.length > 0) {
    sections.push('## Errors\n');
    result.errors.forEach((error, idx) => {
      sections.push(`${idx + 1}. ${error}`);
    });
    sections.push('');
  }

  if (result.warnings.length > 0) {
    sections.push('## Warnings\n');
    result.warnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.passed) {
    sections.push(
      '✅ **Deployment simulation passed** - Ready for Vercel deployment\n'
    );
  } else {
    sections.push(
      '❌ **Deployment simulation failed** - Fix issues before deploying\n'
    );
  }

  return sections.join('\n');
}
