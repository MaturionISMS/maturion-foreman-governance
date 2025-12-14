const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
    '<rootDir>/tests/**/*.test.tsx',
  ],
  // Exclude tests that use node:test runner
  testPathIgnorePatterns: [
    '/node_modules/',
    // Files using node:test are run separately via tsx/node (see package.json test:* scripts)
    // Attempting to run them with Jest causes "must contain at least one test" errors
    // QIC tests that use node:test
    'tests/qic/architecture-integrity\\.test\\.ts$',
    'tests/qic/cs1-guardrail-integration\\.test\\.ts$',
    'tests/qic/cs6-external-builder-protection\\.test\\.ts$',
    'tests/qic/env-diff\\.test\\.ts$',
    'tests/qic/guardrails\\.test\\.ts$',
    'tests/qic/incident-feedback\\.test\\.ts$',
    'tests/qic/mcp-configuration\\.test\\.ts$',
    'tests/qic/performance-integrity\\.test\\.ts$',
    'tests/qic/qic-loader\\.test\\.ts$',
    'tests/qic/qiel-alignment\\.test\\.ts$',
    'tests/qic/qiel-system\\.test\\.ts$',
    'tests/qic/ui-wiring\\.test\\.ts$',
    'tests/qic/zero-warning-governance\\.test\\.ts$',
    // Other directories with node:test files
    'tests/analytics/',
    'tests/architecture/',
    'tests/build-philosophy/',
    'tests/builder-ecosystem-v1.1/',
    'tests/builder-memory/',
    'tests/builder-network/',
    'tests/builder-runtime/',
    'tests/cognition/',
    'tests/consolidation/',
    'tests/context/',
    'tests/dashboard/',
    'tests/fct01/',
    'tests/feedback/',
    'tests/foreman/',
    'tests/github-mutations/',
    'tests/governance/',
    'tests/gsr/',
    'tests/infra/',
    'tests/local-builder/',
    'tests/memory-drift/',
    'tests/memory-fabric/',
    'tests/memory-retirement/',
    'tests/model-scaling/',
    'tests/overnight-execution/',
    'tests/parking-station/',
    'tests/performance/',
    'tests/pr-gatekeeper/',
    'tests/qa/',
    'tests/qa-structural/',
    'tests/reasoning/',
    'tests/retirement/',
    'tests/runtime/',
    'tests/watchdog/',
    'tests/wiring-integrity/',
  ],
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
