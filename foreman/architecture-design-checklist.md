# Architecture Design Checklist

## Purpose

This checklist ensures that **every architecture design is complete** before QA creation and building begins. An incomplete architecture leads to incomplete QA, which leads to incomplete builds, which leads to non-functional UIs and systems.

**Rule**: Foreman MUST validate architecture against this checklist before creating QA.

**If ANY item is missing → Architecture is incomplete → STOP and complete it**

---

## Checklist Categories

### 1. User Interface (UI) Architecture

**For every UI component or page, architecture must specify:**

- [ ] **Component Structure**
  - Component hierarchy (parent/child relationships)
  - Component names and file locations
  - Props and prop types for each component
  - State management approach (local, context, global)

- [ ] **Visual Design**
  - Layout structure (flex, grid, positioning)
  - Responsive behavior (mobile, tablet, desktop)
  - Styling approach (Tailwind classes, CSS modules, etc.)
  - Color scheme and theming
  - Typography specifications
  - Spacing and padding standards

- [ ] **User Interactions**
  - All clickable elements and their actions
  - Form inputs and validation rules
  - Keyboard navigation support
  - Focus management
  - Hover states and animations

- [ ] **Data Display**
  - What data is displayed where
  - Data formatting rules (dates, numbers, currencies)
  - Empty states (no data available)
  - Loading states (data fetching in progress)
  - Error states (data fetch failed)

- [ ] **User Flows**
  - Step-by-step user journey through the feature
  - Navigation paths between pages/components
  - Success paths (happy path)
  - Error paths (what happens when things go wrong)
  - Cancel/back actions

- [ ] **Accessibility (a11y)**
  - ARIA labels for all interactive elements
  - Semantic HTML usage
  - Keyboard accessibility
  - Screen reader support
  - Color contrast compliance
  - Focus indicators

---

### 2. API Architecture

**For every API endpoint, architecture must specify:**

- [ ] **Endpoint Definition**
  - Full endpoint path (e.g., `/api/projects/:id`)
  - HTTP method (GET, POST, PUT, DELETE, PATCH)
  - Route location in codebase
  - Handler function name and location

- [ ] **Request Specification**
  - Required headers
  - Optional headers
  - URL parameters and their types
  - Query parameters and their types
  - Request body schema (if applicable)
  - Content-Type requirements

- [ ] **Response Specification**
  - Success response schema (200, 201, etc.)
  - Success response examples
  - Error response schemas (400, 401, 404, 500, etc.)
  - Error response examples
  - Response headers

- [ ] **Authentication & Authorization**
  - Authentication requirement (yes/no)
  - Authentication method (JWT, session, API key)
  - Authorization rules (who can access)
  - Permission checks required

- [ ] **Data Validation**
  - Input validation rules
  - Sanitization requirements
  - Validation error messages
  - Business logic validations

- [ ] **Error Handling**
  - All possible error conditions
  - Error codes and messages
  - Error recovery strategies
  - Logging requirements

- [ ] **Performance Considerations**
  - Expected response time
  - Caching strategy (if applicable)
  - Rate limiting (if applicable)
  - Pagination (if applicable)

---

### 3. Data Architecture

**For every data model, architecture must specify:**

- [ ] **Schema Definition**
  - All fields and their types
  - Required vs optional fields
  - Default values
  - Field constraints (min, max, regex, enum)
  - Unique constraints

- [ ] **Relationships**
  - Related models (one-to-one, one-to-many, many-to-many)
  - Foreign key relationships
  - Cascade delete behavior
  - Join strategies

- [ ] **Data Storage**
  - Storage mechanism (database, file, cache, memory)
  - Table/collection names
  - Indexes required for performance
  - Partitioning strategy (if applicable)

- [ ] **Data Lifecycle**
  - Creation logic
  - Update logic
  - Deletion logic (soft delete vs hard delete)
  - Archival strategy
  - Data retention policies

- [ ] **Data Validation**
  - Type validation
  - Business rule validation
  - Cross-field validation
  - Uniqueness checks

- [ ] **Data Migrations**
  - Migration strategy for schema changes
  - Backward compatibility requirements
  - Data transformation logic
  - Rollback strategy

---

### 4. State Management Architecture

**For application state, architecture must specify:**

- [ ] **State Location**
  - Where state lives (component, context, Redux, Zustand, etc.)
  - State initialization
  - State persistence (if applicable)

- [ ] **State Shape**
  - Complete state object structure
  - Nested state organization
  - State types/interfaces

- [ ] **State Operations**
  - How state is read
  - How state is updated
  - State update patterns (immutable updates)
  - Derived state calculations

- [ ] **State Synchronization**
  - Server-client sync strategy
  - Optimistic updates (if applicable)
  - Conflict resolution
  - Refresh/refetch logic

---

### 5. Integration Architecture

**For external service integrations, architecture must specify:**

- [ ] **Service Identification**
  - Service name and purpose
  - Service documentation/API reference
  - Authentication method
  - Base URL and endpoints used

- [ ] **Integration Points**
  - Where in the app integration occurs
  - What triggers integration calls
  - Data sent to service
  - Data received from service

- [ ] **Error Handling**
  - Retry logic
  - Timeout handling
  - Fallback behavior
  - Error user messaging

- [ ] **Configuration**
  - Required environment variables
  - Service-specific settings
  - Rate limits and quotas
  - Webhook configurations (if applicable)

---

### 6. Security Architecture

**For all features, architecture must specify:**

- [ ] **Authentication**
  - Authentication mechanisms used
  - Session management
  - Token handling
  - Logout functionality

- [ ] **Authorization**
  - Role-based access control
  - Permission definitions
  - Protected routes/endpoints
  - Authorization checks location

- [ ] **Data Protection**
  - Sensitive data identification
  - Encryption requirements (at rest, in transit)
  - PII handling
  - Data masking/redaction

- [ ] **Input Sanitization**
  - XSS prevention
  - SQL injection prevention
  - CSRF protection
  - Input validation and sanitization

- [ ] **Secrets Management**
  - How secrets are stored
  - How secrets are accessed
  - Secret rotation strategy
  - No hardcoded secrets verification

---

### 7. Error Handling Architecture

**For all features, architecture must specify:**

- [ ] **Error Types**
  - List all possible error conditions
  - Error categorization (user error, system error, network error)
  - Error severity levels

- [ ] **Error Detection**
  - How errors are detected
  - Validation points
  - Exception boundaries

- [ ] **Error Communication**
  - User-facing error messages
  - Developer error messages (logs)
  - Error codes/identifiers
  - Error message formatting

- [ ] **Error Recovery**
  - Retry strategies
  - Fallback behaviors
  - Graceful degradation
  - User recovery actions

- [ ] **Error Logging**
  - What to log
  - Where to log
  - Log format and structure
  - Error tracking integration (if applicable)

---

### 8. Performance Architecture

**For all features, architecture must specify:**

- [ ] **Performance Requirements**
  - Expected load (users, requests/sec)
  - Response time targets
  - Resource usage limits (memory, CPU)

- [ ] **Optimization Strategies**
  - Caching strategy (client-side, server-side, CDN)
  - Lazy loading requirements
  - Code splitting approach
  - Asset optimization

- [ ] **Performance Monitoring**
  - Metrics to track
  - Performance budgets
  - Monitoring tools integration
  - Alert thresholds

---

### 9. Testing Architecture

**For all features, architecture must specify:**

- [ ] **Test Coverage Strategy**
  - Unit tests: What to test
  - Integration tests: What to test
  - E2E tests: What to test
  - Target coverage percentages

- [ ] **Test Data**
  - Test data requirements
  - Mock data specifications
  - Test database seeding
  - Test environment setup

- [ ] **Test Scenarios**
  - Happy path scenarios
  - Error path scenarios
  - Edge cases to test
  - Performance test scenarios

- [ ] **Test Infrastructure**
  - Testing frameworks to use
  - Test utilities needed
  - CI/CD integration
  - Test environment configuration

---

### 10. Deployment Architecture

**For all features, architecture must specify:**

- [ ] **Build Configuration**
  - Build steps
  - Environment variables needed
  - Build optimization settings
  - Build artifacts produced

- [ ] **Deployment Strategy**
  - Deployment method (Vercel, Docker, etc.)
  - Deployment environments (dev, staging, prod)
  - Rollout strategy (all-at-once, canary, blue-green)
  - Rollback procedure

- [ ] **Environment Configuration**
  - Environment-specific settings
  - Feature flags (if applicable)
  - Configuration validation

- [ ] **Post-Deployment**
  - Health checks
  - Smoke tests
  - Monitoring setup
  - Alerting configuration

---

### 11. Documentation Architecture

**For all features, architecture must specify:**

- [ ] **Code Documentation**
  - JSDoc/TSDoc comments for public APIs
  - Complex logic explanations
  - Type definitions documentation

- [ ] **User Documentation**
  - Feature usage instructions (if applicable)
  - API documentation (if applicable)
  - Configuration guides

- [ ] **Developer Documentation**
  - Setup instructions
  - Development workflow
  - Troubleshooting guides
  - Architecture diagrams

---

## Checklist Usage by Foreman

### Step 1: Receive Requirement
Johan provides a new requirement or feature request.

### Step 2: Design Architecture
Foreman designs comprehensive architecture addressing the requirement.

### Step 3: Validate Against Checklist
**Foreman goes through each relevant category:**

```
For each checklist category:
  - Is this category relevant to the requirement? 
    - If YES: 
      - Go through each item in category
      - Verify architecture includes this item
      - If MISSING: Add to architecture
    - If NO: 
      - Mark category as N/A for this requirement
```

### Step 4: Completeness Gate
**Only proceed if:**
- All relevant checklist items are addressed in architecture
- All items have sufficient detail for builders to implement
- No ambiguity or missing information

**If ANY item is incomplete:**
- STOP
- Complete the architecture
- Re-validate against checklist

### Step 5: Document Checklist Validation
Create validation report:
```markdown
## Architecture Checklist Validation

Requirement: [Requirement description]

### Relevant Categories:
- [x] UI Architecture - Complete
- [x] API Architecture - Complete
- [x] Data Architecture - Complete
- [x] State Management - Complete
- [x] Security Architecture - Complete
- [x] Error Handling - Complete
- [x] Testing Architecture - Complete
- [ ] Integration Architecture - N/A (no external integrations)
- [ ] Performance Architecture - Standard (no special requirements)
- [x] Deployment Architecture - Complete
- [x] Documentation Architecture - Complete

### Validation Result: ✅ PASS
All relevant checklist items are addressed in architecture.
Architecture is complete and ready for QA creation.
```

### Step 6: Proceed to QA Creation
Only after checklist validation passes, Foreman creates QA suite.

---

## Checklist Evolution (Learning Loop)

### When to Update Checklist

Update this checklist when:
1. **UI/Production issue reveals missing aspect**
   - Issue found: Dashboard doesn't show loading states
   - Root cause: "Loading states" not in checklist
   - Action: Add "Loading states" to UI Architecture section

2. **New pattern emerges**
   - Multiple features need similar aspect
   - Pattern becomes standard requirement
   - Action: Add pattern to relevant category

3. **Technology changes**
   - New framework/tool adopted
   - New requirements introduced
   - Action: Update checklist to include new aspects

4. **Governance changes**
   - New security requirements
   - New compliance requirements
   - Action: Add to Security or relevant category

### Update Process

1. Identify missing aspect
2. Determine which category it belongs to
3. Add specific, measurable checklist item
4. Document WHY it was added (reference to issue/incident)
5. Update this file via PR
6. Communicate update to all agents

### Checklist Maintenance

- Review quarterly for relevance
- Remove obsolete items (with documentation why)
- Refine wording for clarity
- Add examples where helpful

---

## Examples: Checklist in Practice

### Example 1: Dashboard Feature

**Requirement**: "Create a dashboard showing project health metrics"

**Checklist Validation**:

✅ **UI Architecture**
- Component structure: Dashboard component, MetricCard components, LoadingSpinner
- Visual design: 3-column grid, responsive collapse to 1 column on mobile
- User interactions: Hover on cards shows details, click opens detail view
- Data display: Shows metrics, loading spinner during fetch, "No projects" empty state
- User flows: Load → Show loading → Display metrics OR show error
- Accessibility: ARIA labels on all cards, keyboard navigation

✅ **API Architecture**
- Endpoint: GET /api/projects/health
- Response: { projects: [...], metrics: {...} }
- Error handling: 401 auth error, 500 server error
- Authentication: Required (JWT)

✅ **Data Architecture**
- Model: ProjectHealth { id, name, health_score, last_updated }
- Storage: Fetched from API, cached in React Query
- Validation: health_score between 0-100

✅ **State Management**
- React Query manages data fetching and caching
- Local state for selected metric card
- Automatic refetch every 30 seconds

✅ **Error Handling**
- Network error: "Failed to load metrics. Retry?"
- Auth error: Redirect to login
- No data: "No projects found. Create one?"

✅ **Testing Architecture**
- Unit tests: MetricCard rendering, calculations
- Integration tests: API data fetching
- E2E test: Dashboard loads and displays metrics

**Result**: Architecture complete ✅ → Proceed to QA creation

---

### Example 2: Missing Checklist Item (Learning)

**Requirement**: "Add user profile page"

**Initial Architecture**: ✅ (passed checklist)

**After Build**: UI doesn't show loading state during profile fetch

**Root Cause Analysis**:
- Checklist had "Loading states" in UI section ✅
- But was MISSED during validation ❌
- Builder built what architecture specified
- Architecture didn't specify loading states
- Checklist item was there but Foreman didn't catch it

**Action**:
1. This is a **Foreman validation error**, not checklist error
2. Foreman must be more thorough in checklist validation
3. Improve validation process (automated checks?)
4. Fix current architecture to include loading states
5. Create red QA for loading states
6. Build to green

**Prevention**: Better checklist validation by Foreman

---

## Conclusion

**This checklist is the guarantee of complete architecture.**

Complete architecture → Complete QA → Complete builds → One-time fully functional builds

**Foreman's commitment**: 
- Never skip checklist validation
- Never proceed with incomplete architecture
- Always document validation results
- Always update checklist when gaps found

**This checklist evolves with every build, making each build better than the last.**

---

*Version*: 1.0  
*Owner*: Foreman  
*Authority*: Build Philosophy  
*Status*: Active and Enforced  
*Last Updated*: 2025-12-10
