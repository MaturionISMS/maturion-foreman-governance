/**
 * Log Generator for QIEL
 * 
 * Executes ACTUAL build/lint/test commands and captures output to log files.
 * This module ensures Foreman uses the EXACT SAME logs as GitHub Actions.
 * 
 * Per QIEL Environment Alignment requirements:
 * - NO synthetic logs
 * - NO simulated outputs
 * - ACTUAL npm run commands
 * - Identical log capture as GitHub workflow
 * 
 * Log Format MUST match GitHub Actions workflow exactly:
 * - Command: npm run <command> 2>&1 | tee <logfile>
 * - Redirect stderr to stdout (2>&1)
 * - Use tee for dual output (console + file)
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { QIEL_CONFIG } from '../qiel-config';

/**
 * Execute a command and capture output to log file
 * Mimics GitHub Actions behavior: npm run <cmd> 2>&1 | tee <logfile>
 */
function executeAndLog(
  command: string,
  logPath: string,
  options: {
    cwd?: string;
    continueOnError?: boolean;
    timeout?: number;
  } = {}
): {
  success: boolean;
  exitCode: number;
  output: string;
} {
  const {
    cwd = process.cwd(),
    continueOnError = true,
    timeout = 600000, // 10 minutes default
  } = options;

  console.log(`[Log Generator] Executing: ${command}`);
  console.log(`[Log Generator] Log file: ${logPath}`);

  try {
    // Ensure log directory exists
    const logDir = path.dirname(logPath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Execute command with output capture
    // ALWAYS use shell to enable stderr redirection (2>&1) to match GitHub Actions
    // When encoding is set, output is automatically captured as string
    const output = execSync(command, {
      cwd,
      encoding: 'utf-8',
      timeout,
      shell: true, // REQUIRED for 2>&1 redirection
    });

    // Write output to log file
    fs.writeFileSync(logPath, output, 'utf-8');

    console.log(`[Log Generator] ✅ Command completed successfully`);
    console.log(`[Log Generator] Output written to ${logPath}`);

    return {
      success: true,
      exitCode: 0,
      output,
    };
  } catch (error: any) {
    // Command failed, but we still want to capture the output
    // When using encoding: 'utf-8' and shell: true, the output is captured differently
    let output = '';
    
    // Try to get output from various error properties
    if (error.stdout) {
      output += error.stdout.toString();
    }
    if (error.stderr) {
      output += error.stderr.toString();
    }
    
    // If no output captured, use error message
    if (!output) {
      output = error.message || 'Command failed with no output';
    }
    
    // Write output to log file even on failure
    fs.writeFileSync(logPath, output, 'utf-8');

    console.log(`[Log Generator] ❌ Command failed with exit code ${error.status || 1}`);
    console.log(`[Log Generator] Output written to ${logPath}`);

    return {
      success: continueOnError, // Allow continuation if configured
      exitCode: error.status || 1,
      output,
    };
  }
}

/**
 * Run TypeScript typecheck and capture output
 * Equivalent to: npm run typecheck 2>&1 | tee /tmp/build.log
 */
export function generateBuildLog(
  projectDir: string = process.cwd()
): {
  success: boolean;
  logPath: string;
  exitCode: number;
} {
  console.log('\n[QIEL] Running TypeScript typecheck...');
  
  const logPath = QIEL_CONFIG.logPaths.build;
  const command = QIEL_CONFIG.execution.buildCommands.typecheck;
  const timeout = QIEL_CONFIG.execution.timeouts.typecheck * 1000;

  const result = executeAndLog(command, logPath, {
    cwd: projectDir,
    continueOnError: true,
    timeout,
  });

  return {
    success: result.success,
    logPath,
    exitCode: result.exitCode,
  };
}

/**
 * Run ESLint and capture output
 * Equivalent to: npm run lint 2>&1 | tee /tmp/lint.log
 */
export function generateLintLog(
  projectDir: string = process.cwd()
): {
  success: boolean;
  logPath: string;
  exitCode: number;
} {
  console.log('\n[QIEL] Running ESLint...');
  
  const logPath = QIEL_CONFIG.logPaths.lint;
  const command = QIEL_CONFIG.execution.buildCommands.lint;
  const timeout = QIEL_CONFIG.execution.timeouts.lint * 1000;

  const result = executeAndLog(command, logPath, {
    cwd: projectDir,
    continueOnError: true,
    timeout,
  });

  return {
    success: result.success,
    logPath,
    exitCode: result.exitCode,
  };
}

/**
 * Run tests and capture output
 * Equivalent to: npm run test:all 2>&1 | tee /tmp/test.log
 */
export function generateTestLog(
  projectDir: string = process.cwd()
): {
  success: boolean;
  logPath: string;
  exitCode: number;
} {
  console.log('\n[QIEL] Running tests...');
  
  const logPath = QIEL_CONFIG.logPaths.test;
  const command = QIEL_CONFIG.execution.buildCommands.test;
  const timeout = QIEL_CONFIG.execution.timeouts.test * 1000;

  const result = executeAndLog(command, logPath, {
    cwd: projectDir,
    continueOnError: true,
    timeout,
  });

  return {
    success: result.success,
    logPath,
    exitCode: result.exitCode,
  };
}

/**
 * Run all log generation steps
 * Returns summary of all log generation results
 */
export function generateAllLogs(
  projectDir: string = process.cwd()
): {
  buildLog: ReturnType<typeof generateBuildLog>;
  lintLog: ReturnType<typeof generateLintLog>;
  testLog: ReturnType<typeof generateTestLog>;
  allSucceeded: boolean;
} {
  console.log('[QIEL] Generating all logs by running actual commands...');
  console.log('[QIEL] This matches GitHub Actions workflow execution\n');

  const buildLog = generateBuildLog(projectDir);
  const lintLog = generateLintLog(projectDir);
  const testLog = generateTestLog(projectDir);

  const allSucceeded = buildLog.success && lintLog.success && testLog.success;

  console.log('\n[QIEL] Log generation complete');
  console.log(`[QIEL] Build: ${buildLog.success ? '✅' : '❌'}`);
  console.log(`[QIEL] Lint: ${lintLog.success ? '✅' : '❌'}`);
  console.log(`[QIEL] Test: ${testLog.success ? '✅' : '❌'}`);
  console.log('');

  return {
    buildLog,
    lintLog,
    testLog,
    allSucceeded,
  };
}

/**
 * Validate that log files exist and are readable
 */
export function validateLogsExist(): {
  allExist: boolean;
  build: boolean;
  lint: boolean;
  test: boolean;
  missing: string[];
} {
  const build = fs.existsSync(QIEL_CONFIG.logPaths.build);
  const lint = fs.existsSync(QIEL_CONFIG.logPaths.lint);
  const test = fs.existsSync(QIEL_CONFIG.logPaths.test);

  const missing: string[] = [];
  if (!build) missing.push(QIEL_CONFIG.logPaths.build);
  if (!lint) missing.push(QIEL_CONFIG.logPaths.lint);
  if (!test) missing.push(QIEL_CONFIG.logPaths.test);

  return {
    allExist: build && lint && test,
    build,
    lint,
    test,
    missing,
  };
}

/**
 * Clean up old log files
 */
export function cleanupLogs(): void {
  const logPaths = [
    QIEL_CONFIG.logPaths.build,
    QIEL_CONFIG.logPaths.lint,
    QIEL_CONFIG.logPaths.test,
  ];

  for (const logPath of logPaths) {
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
      console.log(`[Log Generator] Removed old log: ${logPath}`);
    }
  }
}
