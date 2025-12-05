/**
 * Pilot Build QA Check
 * Simple QA validation for pilot builds in the sandbox
 */

import * as fs from 'fs';
import * as path from 'path';

export interface PilotQAResult {
  passed: boolean;
  checks: Array<{
    name: string;
    status: 'passed' | 'failed';
    message: string;
  }>;
  summary: string;
}

/**
 * Run QA checks on the pilot build sandbox
 */
export async function runPilotQA(sandboxPath: string = 'sandbox'): Promise<PilotQAResult> {
  const checks: PilotQAResult['checks'] = [];
  
  // Check 1: Verify PILOT_BUILD_NOTES.md exists
  const notesPath = path.join(process.cwd(), sandboxPath, 'PILOT_BUILD_NOTES.md');
  const notesExists = fs.existsSync(notesPath);
  
  checks.push({
    name: 'PILOT_BUILD_NOTES.md exists',
    status: notesExists ? 'passed' : 'failed',
    message: notesExists 
      ? 'Pilot build notes file found' 
      : 'Pilot build notes file not found',
  });
  
  if (notesExists) {
    // Check 2: Verify file contains required content
    const content = fs.readFileSync(notesPath, 'utf-8');
    const hasTitle = content.includes('# Pilot Build Notes');
    const hasPurpose = content.includes('## Purpose');
    const hasLastBuild = content.includes('## Last Build');
    
    checks.push({
      name: 'Required sections present',
      status: hasTitle && hasPurpose && hasLastBuild ? 'passed' : 'failed',
      message: hasTitle && hasPurpose && hasLastBuild
        ? 'All required sections found in pilot build notes'
        : 'Missing required sections in pilot build notes',
    });
    
    // Check 3: Verify file has been updated by Foreman
    const hasTimestamp = content.includes('Last updated') && !content.includes('Never');
    
    checks.push({
      name: 'Foreman timestamp check',
      status: hasTimestamp ? 'passed' : 'failed',
      message: hasTimestamp
        ? 'File has been updated by Foreman with timestamp'
        : 'File has not been updated by Foreman yet (this is OK for initial setup)',
    });
  }
  
  // Determine overall pass/fail
  const allPassed = checks.every(check => check.status === 'passed');
  const criticalChecksPassed = checks.slice(0, 2).every(check => check.status === 'passed');
  
  // Allow timestamp check to fail for initial setup
  const passed = criticalChecksPassed;
  
  const summary = passed
    ? `Pilot QA passed: ${checks.filter(c => c.status === 'passed').length}/${checks.length} checks`
    : `Pilot QA failed: ${checks.filter(c => c.status === 'failed').length}/${checks.length} checks failed`;
  
  return {
    passed,
    checks,
    summary,
  };
}

/**
 * Update pilot build notes with build information
 */
export async function updatePilotBuildNotes(
  builderUsed: string,
  status: 'success' | 'failed',
  qaResult: 'passed' | 'failed' | 'pending',
  sandboxPath: string = 'sandbox'
): Promise<void> {
  const notesPath = path.join(process.cwd(), sandboxPath, 'PILOT_BUILD_NOTES.md');
  
  if (!fs.existsSync(notesPath)) {
    throw new Error('PILOT_BUILD_NOTES.md not found');
  }
  
  const content = fs.readFileSync(notesPath, 'utf-8');
  const timestamp = new Date().toISOString();
  
  // Update the Last Build section
  const lastBuildPattern = /## Last Build\n\n[\s\S]*?(?=\n---)/;
  
  if (!lastBuildPattern.test(content)) {
    throw new Error('PILOT_BUILD_NOTES.md does not have the expected "## Last Build" section format');
  }
  
  const updatedContent = content.replace(
    lastBuildPattern,
    `## Last Build

**Status**: ${status}  
**Last updated by Foreman**: ${timestamp}  
**Builder**: ${builderUsed}  
**QA Result**: ${qaResult}`
  );
  
  fs.writeFileSync(notesPath, updatedContent, 'utf-8');
}
