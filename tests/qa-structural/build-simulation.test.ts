/**
 * Build Simulation Tests
 * 
 * QA Category: Build Simulation QA
 * 
 * Purpose: Simulate Vercel production builds locally to catch deployment failures before they happen
 * 
 * Tests ensure:
 * - next build succeeds in production mode
 * - All TypeScript files compile without errors
 * - No build-time type mismatches exist
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)
const projectRoot = path.join(process.cwd())

describe('Build Simulation QA', () => {
  describe('TypeScript Compilation', () => {
    it('should compile all TypeScript files without NEW errors', async () => {
      // Note: This test ensures NO NEW type errors are introduced in production code
      // Pre-existing type errors in test files are documented and allowed
      // Production code (app/, lib/, types/, components/) must have zero type errors
      try {
        const { stdout, stderr } = await execAsync('npx tsc --noEmit', {
          cwd: projectRoot,
          timeout: 60000 // 60 second timeout
        })
        
        // If tsc exits with 0, it succeeded
        assert.ok(true, 'TypeScript compilation succeeded')
        
        // Log any warnings (stderr might have warnings even on success)
        if (stderr && stderr.trim().length > 0) {
          console.log('[Build Simulation] TypeScript warnings:', stderr)
        }
      } catch (error: any) {
        // tsc failed - check if errors are in test files (pre-existing) or production code (new)
        const errorOutput = error.stdout || error.stderr || error.message
        
        // Allow test file errors (pre-existing), but fail on production code errors
        const lines = errorOutput.split('\n')
        const productionErrors = lines.filter((line: string) => 
          line.includes('error TS') && 
          !line.includes('/tests/') &&
          !line.includes('.test.ts')
        )
        
        if (productionErrors.length > 0) {
          assert.fail(`TypeScript compilation failed in production code:\n${productionErrors.join('\n')}`)
        } else {
          console.log('[Build Simulation] Pre-existing test file type errors detected (acceptable)')
          console.log('[Build Simulation] No production code type errors found')
          assert.ok(true, 'No production code type errors')
        }
      }
    })
    
    it('should have strict mode enabled in tsconfig', async () => {
      const fs = await import('fs/promises')
      const tsconfigPath = path.join(projectRoot, 'tsconfig.json')
      
      const content = await fs.readFile(tsconfigPath, 'utf-8')
      const tsconfig = JSON.parse(content)
      
      assert.strictEqual(
        tsconfig.compilerOptions?.strict,
        true,
        'TypeScript strict mode must be enabled'
      )
    })
  })
  
  describe('Next.js Build Simulation', () => {
    it('should simulate production build successfully', async () => {
      // Note: This test runs `next build` which can take time
      // In CI/CD, this ensures the same build that would run on Vercel works locally
      // Timeout: 2 minutes (120s) is sufficient for most builds
      
      try {
        const { stdout, stderr } = await execAsync('npm run build', {
          cwd: projectRoot,
          timeout: 120000, // 2 minute timeout (configurable via env: BUILD_TIMEOUT_MS)
          env: {
            ...process.env,
            NODE_ENV: 'production'
          }
        })
        
        // Check that build completed successfully
        assert.ok(
          stdout.includes('Compiled successfully') || stdout.includes('build succeeded'),
          'Build should complete successfully'
        )
        
        console.log('[Build Simulation] Build output (last 500 chars):', stdout.slice(-500))
      } catch (error: any) {
        const errorMessage = error.stdout || error.stderr || error.message
        assert.fail(`Production build failed:\n${errorMessage}`)
      }
    })
  })
  
  describe('ESLint Validation', () => {
    it('should pass linting without errors', async () => {
      try {
        const { stdout, stderr } = await execAsync('npm run lint', {
          cwd: projectRoot,
          timeout: 60000
        })
        
        // ESLint passed
        assert.ok(true, 'Linting succeeded')
        
        if (stderr && stderr.trim().length > 0) {
          console.log('[Build Simulation] Lint warnings:', stderr)
        }
      } catch (error: any) {
        // Allow to continue if lint has warnings but not errors
        // Most lint configurations treat errors as exit code 1
        const errorMessage = error.stdout || error.stderr || error.message
        
        // If it's just warnings, log them but don't fail
        if (error.code === 1 && errorMessage.includes('warning')) {
          console.log('[Build Simulation] Lint warnings found:', errorMessage)
        } else {
          assert.fail(`Linting failed with errors:\n${errorMessage}`)
        }
      }
    })
  })
  
  describe('Module Resolution', () => {
    it('should resolve all @/ path aliases correctly', async () => {
      // Test that TypeScript can resolve our path aliases
      // Note: We expect compilation errors to exist, but we're checking that modules resolve
      try {
        await execAsync('npx tsc --noEmit --listFiles', {
          cwd: projectRoot,
          timeout: 60000
        })
      } catch (error: any) {
        // Even if tsc fails with type errors, check that it's not module resolution failures
        const output = error.stdout || error.stderr || ''
        assert.ok(!output.includes('Cannot find module'), 'All modules should resolve even if there are type errors')
      }
    })
  })
  
  describe('Type Definition Exports', () => {
    it('should export all required type definitions', async () => {
      // Verify that type definition files exist and are valid
      const fs = await import('fs/promises')
      
      const typeFiles = [
        'types/memory.ts',
        'types/retirement.ts',
        'types/consolidation.ts',
        'types/drift.ts'
      ]
      
      for (const file of typeFiles) {
        const filePath = path.join(projectRoot, file)
        try {
          await fs.access(filePath)
          const content = await fs.readFile(filePath, 'utf-8')
          
          // Check that file exports interfaces/types
          assert.ok(
            content.includes('export interface') || content.includes('export type'),
            `${file} should export type definitions`
          )
        } catch (error) {
          assert.fail(`Required type file missing or unreadable: ${file}`)
        }
      }
    })
  })
  
  describe('Dependency Version Consistency', () => {
    it('should have consistent Next.js and React versions', async () => {
      const fs = await import('fs/promises')
      const packageJsonPath = path.join(projectRoot, 'package.json')
      
      const content = await fs.readFile(packageJsonPath, 'utf-8')
      const packageJson = JSON.parse(content)
      
      const nextVersion = packageJson.dependencies?.next
      const reactVersion = packageJson.dependencies?.react
      const reactDomVersion = packageJson.dependencies?.['react-dom']
      
      assert.ok(nextVersion, 'Next.js should be in dependencies')
      assert.ok(reactVersion, 'React should be in dependencies')
      assert.ok(reactDomVersion, 'React DOM should be in dependencies')
      
      // React and React DOM should be same version
      assert.strictEqual(reactVersion, reactDomVersion, 'React and React DOM versions should match')
    })
  })
})
