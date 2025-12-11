/**
 * CS5 Test: No TODO Comments Policy
 * 
 * Constitutional test ensuring ZERO TODO comments in production code.
 * This is a ZERO-TOLERANCE policy enforced at the governance level.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';

describe('CS5: No TODO Comments Policy', () => {
  const SOURCE_DIRS = ['app', 'lib', 'components', 'types'];
  const EXCLUDE_PATTERNS = ['node_modules', '.next', 'dist', 'out', '.git', '.test.', '.spec.'];

  async function scanForPattern(
    dir: string,
    pattern: RegExp,
    fileTypes: string[] = ['.ts', '.tsx', '.js', '.jsx']
  ): Promise<{ file: string; line: number; content: string }[]> {
    const results: { file: string; line: number; content: string }[] = [];

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (!EXCLUDE_PATTERNS.some(p => entry.name.includes(p))) {
            results.push(...(await scanForPattern(fullPath, pattern, fileTypes)));
          }
        } else if (entry.isFile()) {
          const hasValidExt = fileTypes.some(ext => entry.name.endsWith(ext));
          const isExcluded = EXCLUDE_PATTERNS.some(p => fullPath.includes(p));

          if (hasValidExt && !isExcluded) {
            const content = await fs.readFile(fullPath, 'utf-8');
            const lines = content.split('\n');

            lines.forEach((line, index) => {
              if (pattern.test(line)) {
                results.push({
                  file: fullPath,
                  line: index + 1,
                  content: line.trim(),
                });
              }
            });
          }
        }
      }
    } catch (error) {
      // Directory might not exist
    }

    return results;
  }

  describe('TODO Comments', () => {
    it('should have ZERO TODO comments in production code', async () => {
      const todoPattern = /\bTODO\b/i;
      let allTodos: { file: string; line: number; content: string }[] = [];

      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const todos = await scanForPattern(dirPath, todoPattern);
        allTodos.push(...todos);
      }

      if (allTodos.length > 0) {
        const summary = allTodos.slice(0, 10).map(t =>
          `  ${path.relative(process.cwd(), t.file)}:${t.line} - ${t.content}`
        ).join('\n');

        console.error(`❌ POLICY VIOLATION: Found ${allTodos.length} TODO comment(s):`);
        console.error(summary);
        if (allTodos.length > 10) {
          console.error(`  ... and ${allTodos.length - 10} more`);
        }
        console.error('\n📋 REQUIRED ACTION:');
        console.error('  1. Remove TODO comments');
        console.error('  2. Create Parking Station entries for deferred work');
        console.error('  3. Fix issues immediately if critical');

        assert.fail(`TODO comments not allowed - found ${allTodos.length} violation(s)`);
      }

      console.log('✓ ZERO TODO comments - Policy compliant');
    });
  });

  describe('FIXME Comments', () => {
    it('should have ZERO FIXME comments in production code', async () => {
      const fixmePattern = /\bFIXME\b/i;
      let allFixmes: { file: string; line: number; content: string }[] = [];

      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const fixmes = await scanForPattern(dirPath, fixmePattern);
        allFixmes.push(...fixmes);
      }

      if (allFixmes.length > 0) {
        const summary = allFixmes.slice(0, 10).map(f =>
          `  ${path.relative(process.cwd(), f.file)}:${f.line} - ${f.content}`
        ).join('\n');

        console.error(`❌ POLICY VIOLATION: Found ${allFixmes.length} FIXME comment(s):`);
        console.error(summary);
        if (allFixmes.length > 10) {
          console.error(`  ... and ${allFixmes.length - 10} more`);
        }
        console.error('\n📋 REQUIRED ACTION:');
        console.error('  1. Fix the issues');
        console.error('  2. Remove FIXME comments');
        console.error('  3. Create Parking Station entries if needed');

        assert.fail(`FIXME comments not allowed - found ${allFixmes.length} violation(s)`);
      }

      console.log('✓ ZERO FIXME comments - Policy compliant');
    });
  });

  describe('HACK Comments', () => {
    it('should have ZERO HACK comments in production code', async () => {
      const hackPattern = /\bHACK\b/i;
      let allHacks: { file: string; line: number; content: string }[] = [];

      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const hacks = await scanForPattern(dirPath, hackPattern);
        allHacks.push(...hacks);
      }

      if (allHacks.length > 0) {
        const summary = allHacks.slice(0, 10).map(h =>
          `  ${path.relative(process.cwd(), h.file)}:${h.line} - ${h.content}`
        ).join('\n');

        console.error(`❌ POLICY VIOLATION: Found ${allHacks.length} HACK comment(s):`);
        console.error(summary);
        if (allHacks.length > 10) {
          console.error(`  ... and ${allHacks.length - 10} more`);
        }
        console.error('\n📋 REQUIRED ACTION:');
        console.error('  1. Refactor hacks into proper solutions');
        console.error('  2. Remove HACK comments');
        console.error('  3. Ensure code quality standards are met');

        assert.fail(`HACK comments not allowed - found ${allHacks.length} violation(s)`);
      }

      console.log('✓ ZERO HACK comments - Policy compliant');
    });
  });

  describe('Temporary Code', () => {
    it('should have ZERO temporary code markers', async () => {
      const tempPattern = /\b(TEMP|temporary fix|temporary workaround|quick and dirty)\b/i;
      let allTemp: { file: string; line: number; content: string }[] = [];

      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const temp = await scanForPattern(dirPath, tempPattern);
        allTemp.push(...temp);
      }

      if (allTemp.length > 0) {
        const summary = allTemp.slice(0, 10).map(t =>
          `  ${path.relative(process.cwd(), t.file)}:${t.line} - ${t.content}`
        ).join('\n');

        console.error(`❌ POLICY VIOLATION: Found ${allTemp.length} temporary code marker(s):`);
        console.error(summary);
        if (allTemp.length > 10) {
          console.error(`  ... and ${allTemp.length - 10} more`);
        }
        console.error('\n📋 REQUIRED ACTION:');
        console.error('  1. Make temporary code permanent');
        console.error('  2. Refactor to production quality');
        console.error('  3. Remove temporary markers');

        assert.fail(`Temporary code markers not allowed - found ${allTemp.length} violation(s)`);
      }

      console.log('✓ ZERO temporary code markers - Policy compliant');
    });
  });

  describe('Deferred Optimization', () => {
    it('should have ZERO "optimize later" comments', async () => {
      const optimizePattern = /(optimize later|improve performance|performance TODO)/i;
      let allOptimize: { file: string; line: number; content: string }[] = [];

      for (const dir of SOURCE_DIRS) {
        const dirPath = path.join(process.cwd(), dir);
        const optimize = await scanForPattern(dirPath, optimizePattern);
        allOptimize.push(...optimize);
      }

      if (allOptimize.length > 0) {
        const summary = allOptimize.slice(0, 10).map(o =>
          `  ${path.relative(process.cwd(), o.file)}:${o.line} - ${o.content}`
        ).join('\n');

        console.error(`❌ POLICY VIOLATION: Found ${allOptimize.length} deferred optimization marker(s):`);
        console.error(summary);
        if (allOptimize.length > 10) {
          console.error(`  ... and ${allOptimize.length - 10} more`);
        }
        console.error('\n📋 REQUIRED ACTION:');
        console.error('  1. Optimize now, not later');
        console.error('  2. Remove optimization markers');
        console.error('  3. Create Parking Station entry if complex');

        assert.fail(`Deferred optimization markers not allowed - found ${allOptimize.length} violation(s)`);
      }

      console.log('✓ ZERO deferred optimization markers - Policy compliant');
    });
  });

  describe('Policy Enforcement', () => {
    it('should enforce policy through Parking Station', async () => {
      const parkingStationPath = path.join(process.cwd(), 'memory/parking-station');

      try {
        await fs.access(parkingStationPath);
        console.log('✓ Parking Station exists for deferred work tracking');
      } catch {
        console.warn('⚠️ Parking Station directory should exist');
      }
    });

    it('should document policy enforcement', () => {
      console.log('\n📜 CS5 NO TODO POLICY:');
      console.log('  - TODO comments are FORBIDDEN');
      console.log('  - FIXME comments are FORBIDDEN');
      console.log('  - HACK comments are FORBIDDEN');
      console.log('  - Temporary code markers are FORBIDDEN');
      console.log('  - Deferred optimization markers are FORBIDDEN');
      console.log('\n✅ Use Parking Station for deferred work');
      console.log('✅ Fix issues before commit');
      console.log('✅ Write production-quality code');
    });
  });
});

console.log('\n✅ CS5 No TODO Comments Policy tests completed');
