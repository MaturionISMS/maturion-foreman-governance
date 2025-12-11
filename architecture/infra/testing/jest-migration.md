# Jest + next/jest Test Infrastructure Migration Architecture

**Version:** 1.0  
**Status:** Architecture Design - Ready for Red QA  
**Owner:** Foreman  
**Created:** 2025-12-11  
**Wave:** Modernization Wave Alpha - Phase 1

---

## 1. Purpose

This architecture defines the complete migration from the current `tsx` test runner to Jest with Next.js integration (`next/jest`). This modernization establishes a production-grade testing infrastructure that:

- Provides Next.js-aware testing capabilities (components, API routes, server actions)
- Enables comprehensive test coverage with proper mocking
- Integrates seamlessly with CI/CD pipelines
- Supports both unit and integration testing
- Maintains compatibility with existing test suites
- Enforces 100% QA governance standards

---

## 2. System Overview

### Current State
```
Test Runner: tsx (TypeScript direct execution)
- Simple but limited
- No Next.js-specific features
- No built-in mocking framework
- No coverage reporting
- Uses Node's native test runner
```

### Target State
```
Test Runner: Jest + next/jest
- Full Next.js integration
- Advanced mocking (components, modules, API routes)
- Code coverage built-in
- Snapshot testing
- Parallel execution
- Watch mode
- CI/CD optimized
```

### Migration Path
```
Phase 1: Architecture + Red QA
Phase 2: Jest Configuration
Phase 3: Test Utilities Migration
Phase 4: Test Suite Migration
Phase 5: Validation + Green QA
```

---

## 3. Core Components

### 3.1 Jest Configuration
**File:** `/jest.config.js`

```javascript
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
```

**Purpose:**
- Configure Jest with Next.js preset
- Define test patterns and paths
- Setup module path mapping
- Configure coverage collection

### 3.2 Jest Setup File
**File:** `/jest.setup.js`

```javascript
// Custom matchers and global test configuration
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock environment variables
process.env.GITHUB_TOKEN = 'test-token'
process.env.OPENAI_API_KEY = 'test-key'
```

**Purpose:**
- Initialize testing utilities
- Configure global mocks
- Setup environment for tests

### 3.3 Test Utilities
**File:** `/tests/test-utils.ts`

```typescript
// Existing utilities adapted for Jest
export function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`)
  }
}

export function assertInRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): void {
  if (value < min || value > max) {
    throw new Error(
      `${fieldName} ${value} is not in range [${min}, ${max}]`
    )
  }
}

export function loadFixture(filename: string): any {
  const fs = require('fs')
  const path = require('path')
  const fixturePath = path.join(__dirname, 'fixtures', filename)
  return JSON.parse(fs.readFileSync(fixturePath, 'utf-8'))
}
```

**Purpose:**
- Maintain backward compatibility with existing tests
- Provide utility functions for testing
- Support fixture loading

### 3.4 Package Dependencies
**Updates to:** `/package.json`

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:dashboard": "jest tests/dashboard",
    "test:drift": "jest tests/memory-drift",
    "test:qa": "jest tests/qa",
    "test:qic": "jest tests/qic",
    "test:governance": "jest tests/governance",
    "test:all": "jest --coverage"
  }
}
```

**Purpose:**
- Add Jest and testing library dependencies
- Update test scripts to use Jest
- Provide granular test execution options

---

## 4. Data Models

### 4.1 Jest Test Structure
```typescript
// Standard Jest test pattern
import { describe, test, expect } from '@jest/globals'

describe('Component/Module Name', () => {
  test('should do something specific', () => {
    // Arrange
    const input = setupTestData()
    
    // Act
    const result = functionUnderTest(input)
    
    // Assert
    expect(result).toBeDefined()
    expect(result.property).toBe(expectedValue)
  })
})
```

### 4.2 Next.js Component Test
```typescript
import { render, screen } from '@testing-library/react'
import Component from '@/components/Component'

describe('Component', () => {
  test('renders correctly', () => {
    render(<Component prop="value" />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

---

## 5. Migration Strategy

### 5.1 Backward Compatibility
**Approach:**
- Preserve existing test structure
- Maintain test utility functions
- Keep fixture loading pattern
- Support existing assertions

**Rationale:**
- Minimize code churn
- Reduce migration risk
- Maintain test coverage during migration

### 5.2 Test Suite Migration Order
```
1. Test utilities (test-utils.ts)
2. Smallest test suites first (dashboard)
3. Medium suites (governance, qa)
4. Large suites (qic, memory)
5. Complex suites (builder-network)
```

### 5.3 Validation Per Suite
For each migrated suite:
1. Run with Jest
2. Verify all tests pass
3. Check coverage reports
4. Validate no regressions
5. Update documentation

---

## 6. Governance Integration

### 6.1 QA Standards
- **100% Green QA Required:** All tests must pass before merge
- **No Warning Tolerance:** Jest warnings treated as failures
- **Coverage Tracking:** Establish baseline, track improvements
- **CI Integration:** Tests run on every PR

### 6.2 Quality Integrity Contract (QIC) Compliance
- Jest must detect all test failures
- No silent failures allowed
- Build fails if any test fails
- Coverage reports generated and archived

### 6.3 CS1-CS6 Alignment
- **CS1:** Test infrastructure is immutable once established
- **CS2:** Architecture approved before implementation
- **CS3:** Test failures trigger incident workflow
- **CS4:** Failed test runs generate alerts
- **CS5:** Test performance monitored and optimized
- **CS6:** Builders implement tests, don't design them

---

## 7. Error Handling

### 7.1 Test Execution Errors
**Scenario:** Jest fails to start
**Handling:**
- Check Jest configuration validity
- Verify dependencies installed
- Check for conflicting Node.js versions
- Log detailed error to governance memory

### 7.2 Test Failures
**Scenario:** Tests fail after migration
**Handling:**
- Identify root cause (migration issue vs. real bug)
- Rollback if migration problem
- Fix if real bug discovered
- Update architecture if gap found

### 7.3 Performance Issues
**Scenario:** Tests run slower than tsx
**Handling:**
- Enable parallel execution
- Optimize test setup/teardown
- Use test-specific configurations
- Profile and optimize hot paths

---

## 8. Testing Strategy

### 8.1 Migration Validation Tests
Create tests to verify migration success:

```typescript
// tests/infra/jest-migration.test.ts
describe('Jest Migration Validation', () => {
  test('Jest is properly configured', () => {
    expect(jest).toBeDefined()
  })
  
  test('Next.js mocks work', () => {
    const { useRouter } = require('next/navigation')
    const router = useRouter()
    expect(router.push).toBeDefined()
  })
  
  test('Module resolution works', () => {
    // Import using @ alias
    expect(() => require('@/lib/foreman/projects/dashboard')).not.toThrow()
  })
})
```

### 8.2 Regression Tests
Ensure no existing functionality breaks:
- All dashboard tests pass
- All governance tests pass
- All QIC tests pass
- All memory tests pass

### 8.3 New Capability Tests
Validate new Jest features work:
- Snapshot testing
- Mock functions
- Coverage reporting
- Watch mode

---

## 9. Acceptance Criteria

### 9.1 Architecture Checklist Validation
- [x] Purpose clearly defined
- [x] System overview with current/target state
- [x] Core components specified with file locations
- [x] Data models and patterns defined
- [x] Migration strategy documented
- [x] Governance integration specified
- [x] Error handling comprehensive
- [x] Testing strategy complete
- [x] Acceptance criteria measurable

### 9.2 Migration Success Criteria
- [ ] Jest + next/jest installed and configured
- [ ] All existing tests migrated and passing
- [ ] Test scripts updated in package.json
- [ ] No regressions in test coverage
- [ ] CI/CD pipeline updated and working
- [ ] Documentation updated
- [ ] Zero test failures
- [ ] Zero Jest warnings

### 9.3 Quality Gates
- [ ] 100% of migrated tests pass
- [ ] Jest configuration validated
- [ ] Coverage reports generated
- [ ] Performance acceptable (< 2x tsx time)
- [ ] All test utilities work correctly

---

## 10. Rollback Plan

### 10.1 Rollback Triggers
- More than 10% of tests fail after migration
- Critical test infrastructure failure
- Performance degradation > 3x
- CI/CD pipeline breaks

### 10.2 Rollback Steps
1. Restore package.json to pre-migration state
2. Remove Jest configuration files
3. Verify tsx tests still work
4. Document rollback reasons
5. Update architecture with lessons learned

---

## 11. Success Metrics

### 11.1 Quantitative Metrics
- Test execution time: Target < 2x tsx baseline
- Test reliability: 0 flaky tests
- Coverage accuracy: Full HTML reports generated
- CI/CD performance: Tests complete in < 5 minutes

### 11.2 Qualitative Metrics
- Developer experience improved
- Next.js features testable
- Debugging easier with better error messages
- Mock capabilities enhanced

---

## 12. Next Steps (Post-Migration)

After successful migration:
1. Expand test coverage using Jest features
2. Add snapshot tests for components
3. Implement coverage thresholds
4. Create test templates for new features
5. Document best practices guide

---

## Architecture Approval

**Status:** Ready for Red QA Creation  
**Next Phase:** Create comprehensive Red QA suite to validate this architecture  
**Build Philosophy Stage:** Architecture Complete → Red QA Creation → Build to Green

This architecture defines EVERY aspect needed for the Jest migration. Red QA will now test that implementation matches this specification exactly.

---

**END OF ARCHITECTURE DOCUMENT**
