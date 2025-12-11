/**
 * Jest Migration Red QA Suite
 * 
 * This test suite validates the complete Jest + next/jest migration architecture.
 * These tests are DESIGNED TO FAIL initially (Red QA) because the architecture
 * exists but the implementation does not yet.
 * 
 * Build Philosophy: Architecture → Red QA → Build to Green
 * 
 * When a builder implements the architecture, these tests will turn green,
 * indicating successful implementation.
 */

import { describe, test } from 'node:test'
import { assert } from '../dashboard/test-utils'
import * as fs from 'fs'
import * as path from 'path'

describe('Jest Migration - Configuration', () => {
  test('jest.config.js exists in root', () => {
    const jestConfigPath = path.join(process.cwd(), 'jest.config.js')
    assert(fs.existsSync(jestConfigPath), 'jest.config.js must exist in repository root')
  })

  test('jest.config.js uses next/jest', () => {
    const jestConfigPath = path.join(process.cwd(), 'jest.config.js')
    if (!fs.existsSync(jestConfigPath)) {
      throw new Error('jest.config.js not found')
    }
    const content = fs.readFileSync(jestConfigPath, 'utf-8')
    assert(content.includes('next/jest'), 'jest.config.js must use next/jest preset')
    assert(content.includes('createJestConfig'), 'jest.config.js must use createJestConfig from next/jest')
  })

  test('jest.config.js configures test environment', () => {
    const jestConfigPath = path.join(process.cwd(), 'jest.config.js')
    if (!fs.existsSync(jestConfigPath)) {
      throw new Error('jest.config.js not found')
    }
    const content = fs.readFileSync(jestConfigPath, 'utf-8')
    assert(content.includes('jest-environment-jsdom'), 'must use jest-environment-jsdom')
  })

  test('jest.config.js configures module mapping', () => {
    const jestConfigPath = path.join(process.cwd(), 'jest.config.js')
    if (!fs.existsSync(jestConfigPath)) {
      throw new Error('jest.config.js not found')
    }
    const content = fs.readFileSync(jestConfigPath, 'utf-8')
    assert(content.includes('moduleNameMapper'), 'must configure moduleNameMapper')
    assert(content.includes('@/'), 'must map @/ alias')
  })

  test('jest.config.js configures test patterns', () => {
    const jestConfigPath = path.join(process.cwd(), 'jest.config.js')
    if (!fs.existsSync(jestConfigPath)) {
      throw new Error('jest.config.js not found')
    }
    const content = fs.readFileSync(jestConfigPath, 'utf-8')
    assert(content.includes('testMatch'), 'must configure testMatch pattern')
    assert(content.includes('tests/**/*.test.ts'), 'must match .test.ts files')
  })

  test('jest.config.js configures coverage collection', () => {
    const jestConfigPath = path.join(process.cwd(), 'jest.config.js')
    if (!fs.existsSync(jestConfigPath)) {
      throw new Error('jest.config.js not found')
    }
    const content = fs.readFileSync(jestConfigPath, 'utf-8')
    assert(content.includes('collectCoverageFrom'), 'must configure coverage collection')
    assert(content.includes('lib/**'), 'must collect coverage from lib')
    assert(content.includes('app/**'), 'must collect coverage from app')
    assert(content.includes('components/**'), 'must collect coverage from components')
  })
})

describe('Jest Migration - Setup File', () => {
  test('jest.setup.js exists in root', () => {
    const setupPath = path.join(process.cwd(), 'jest.setup.js')
    assert(fs.existsSync(setupPath), 'jest.setup.js must exist in repository root')
  })

  test('jest.setup.js imports testing library', () => {
    const setupPath = path.join(process.cwd(), 'jest.setup.js')
    if (!fs.existsSync(setupPath)) {
      throw new Error('jest.setup.js not found')
    }
    const content = fs.readFileSync(setupPath, 'utf-8')
    assert(
      content.includes('@testing-library/jest-dom'),
      'must import @testing-library/jest-dom'
    )
  })

  test('jest.setup.js mocks Next.js router', () => {
    const setupPath = path.join(process.cwd(), 'jest.setup.js')
    if (!fs.existsSync(setupPath)) {
      throw new Error('jest.setup.js not found')
    }
    const content = fs.readFileSync(setupPath, 'utf-8')
    assert(content.includes('next/navigation'), 'must mock next/navigation')
    assert(content.includes('useRouter'), 'must mock useRouter')
    assert(content.includes('usePathname'), 'must mock usePathname')
    assert(content.includes('useSearchParams'), 'must mock useSearchParams')
  })

  test('jest.setup.js configures environment variables', () => {
    const setupPath = path.join(process.cwd(), 'jest.setup.js')
    if (!fs.existsSync(setupPath)) {
      throw new Error('jest.setup.js not found')
    }
    const content = fs.readFileSync(setupPath, 'utf-8')
    assert(content.includes('GITHUB_TOKEN'), 'must set test GITHUB_TOKEN')
    assert(content.includes('OPENAI_API_KEY'), 'must set test OPENAI_API_KEY')
  })
})

describe('Jest Migration - Package Dependencies', () => {
  test('package.json includes Jest', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.devDependencies?.jest !== undefined,
      'jest must be in devDependencies'
    )
  })

  test('package.json includes jest-environment-jsdom', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.devDependencies?.['jest-environment-jsdom'] !== undefined,
      'jest-environment-jsdom must be in devDependencies'
    )
  })

  test('package.json includes @testing-library/jest-dom', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.devDependencies?.['@testing-library/jest-dom'] !== undefined,
      '@testing-library/jest-dom must be in devDependencies'
    )
  })

  test('package.json includes @testing-library/react', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.devDependencies?.['@testing-library/react'] !== undefined,
      '@testing-library/react must be in devDependencies'
    )
  })

  test('package.json test script uses Jest', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.scripts?.test === 'jest',
      'test script must use jest command'
    )
  })

  test('package.json has test:watch script', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.scripts?.['test:watch'] !== undefined,
      'must have test:watch script'
    )
    assert(
      pkg.scripts?.['test:watch'].includes('jest'),
      'test:watch must use jest'
    )
  })

  test('package.json has test:coverage script', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.scripts?.['test:coverage'] !== undefined,
      'must have test:coverage script'
    )
    assert(
      pkg.scripts?.['test:coverage'].includes('--coverage'),
      'test:coverage must include --coverage flag'
    )
  })

  test('package.json has test:ci script', () => {
    const packagePath = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
    assert(
      pkg.scripts?.['test:ci'] !== undefined,
      'must have test:ci script'
    )
    assert(
      pkg.scripts?.['test:ci'].includes('--ci'),
      'test:ci must include --ci flag'
    )
  })
})

describe('Jest Migration - Test Utilities Compatibility', () => {
  test('test-utils.ts maintains assert function', () => {
    const utilsPath = path.join(process.cwd(), 'tests/dashboard/test-utils.ts')
    const content = fs.readFileSync(utilsPath, 'utf-8')
    assert(
      content.includes('export function assert'),
      'must export assert function for backward compatibility'
    )
  })

  test('test-utils.ts maintains assertInRange function', () => {
    const utilsPath = path.join(process.cwd(), 'tests/dashboard/test-utils.ts')
    const content = fs.readFileSync(utilsPath, 'utf-8')
    assert(
      content.includes('export function assertInRange'),
      'must export assertInRange function for backward compatibility'
    )
  })

  test('test-utils.ts maintains loadFixture function', () => {
    const utilsPath = path.join(process.cwd(), 'tests/dashboard/test-utils.ts')
    const content = fs.readFileSync(utilsPath, 'utf-8')
    assert(
      content.includes('export function loadFixture'),
      'must export loadFixture function for backward compatibility'
    )
  })
})

describe('Jest Migration - Functional Validation', () => {
  test('Jest can be imported', () => {
    try {
      require('jest')
      console.log('✓ Jest is importable')
    } catch (e) {
      throw new Error('Jest must be installed and importable')
    }
  })

  test('Jest environment jsdom can be imported', () => {
    try {
      require('jest-environment-jsdom')
      console.log('✓ jest-environment-jsdom is importable')
    } catch (e) {
      throw new Error('jest-environment-jsdom must be installed and importable')
    }
  })

  test('@testing-library/jest-dom can be imported', () => {
    try {
      // Check if the module exists (it requires Jest context with expect)
      const modulePath = require.resolve('@testing-library/jest-dom')
      assert(modulePath.length > 0, '@testing-library/jest-dom module must exist')
      console.log('✓ @testing-library/jest-dom is importable')
    } catch (e) {
      throw new Error('@testing-library/jest-dom must be installed and importable')
    }
  })

  test('@testing-library/react can be imported', () => {
    try {
      require('@testing-library/react')
      console.log('✓ @testing-library/react is importable')
    } catch (e) {
      throw new Error('@testing-library/react must be installed and importable')
    }
  })
})

describe('Jest Migration - Architecture Compliance', () => {
  test('Architecture document exists', () => {
    const archPath = path.join(process.cwd(), 'architecture/infra/testing/jest-migration.md')
    assert(
      fs.existsSync(archPath),
      'Jest migration architecture document must exist'
    )
  })

  test('Architecture document is complete', () => {
    const archPath = path.join(process.cwd(), 'architecture/infra/testing/jest-migration.md')
    if (!fs.existsSync(archPath)) {
      throw new Error('Architecture document not found')
    }
    const content = fs.readFileSync(archPath, 'utf-8')
    
    // Verify all required sections exist
    assert(content.includes('## 1. Purpose'), 'must have Purpose section')
    assert(content.includes('## 2. System Overview'), 'must have System Overview')
    assert(content.includes('## 3. Core Components'), 'must have Core Components')
    assert(content.includes('## 5. Migration Strategy'), 'must have Migration Strategy')
    assert(content.includes('## 6. Governance Integration'), 'must have Governance Integration')
    assert(content.includes('## 7. Error Handling'), 'must have Error Handling')
    assert(content.includes('## 9. Acceptance Criteria'), 'must have Acceptance Criteria')
  })
})

console.log('\n=== RED QA SUITE: Jest Migration ===')
console.log('This suite tests the architecture specification.')
console.log('Expected: Most/all tests should FAIL (RED QA state)')
console.log('Build Philosophy: These failures define what needs to be built.')
console.log('Builder task: Make ALL these tests GREEN by implementing the architecture.')
console.log('=========================================\n')
