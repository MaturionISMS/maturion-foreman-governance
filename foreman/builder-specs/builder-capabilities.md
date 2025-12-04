# Builder Capabilities Specification

## Overview

The Maturion system employs five specialized builder agents, each with distinct capabilities, permissions, and responsibilities. This document defines the technical specifications for each builder.

## Builder Registry

| Builder Type | Primary Function | Code Writing | API Endpoint |
|--------------|------------------|--------------|--------------|
| UI Builder | User interface components | Yes | `/api/builder/ui` |
| API Builder | Backend endpoints and services | Yes | `/api/builder/api` |
| Schema Builder | Type definitions and schemas | Yes | `/api/builder/schema` |
| Integration Builder | External service integrations | Yes | `/api/builder/integration` |
| QA Builder | Testing and validation | Yes (tests) | `/api/builder/qa` |

## UI Builder

### Capabilities

The UI Builder specializes in creating and maintaining user interface components.

**Supported Task Types**:
- `create_component` - Generate new React components
- `update_component` - Modify existing components
- `create_page` - Create new Next.js pages
- `update_page` - Update existing pages
- `create_layout` - Generate layout components
- `update_styles` - Modify CSS/Tailwind styles

### Input Format

**Required Fields**:
- `module` (string): Component or page module name
- `taskDescription` (string): Clear description of UI requirements
- `organisationId` (string): Organization identifier

**Optional Fields**:
- `context.framework` (string): UI framework (default: "React")
- `context.features` (array): List of features to implement
- `context.styling` (string): Styling approach ("CSS", "Tailwind", "CSS Modules")
- `metadata.priority` (string): Task priority level

### Output Format

**Artifacts**:
- Type: `code`
- Files: `.tsx`, `.jsx`, `.css`, `.module.css`
- Metadata: Component dependencies, props interface

**Example Output**:
```json
{
  "success": true,
  "artifacts": [
    {
      "type": "code",
      "name": "DashboardComponent",
      "path": "components/Dashboard.tsx",
      "content": "/* Component code */",
      "metadata": {
        "dependencies": ["react", "recharts"],
        "props": "DashboardProps"
      }
    }
  ]
}
```

### Permissions

- **Read**: Repository contents (to analyze existing components)
- **Write**: Component files in `components/`, `app/` directories
- **Execute**: Type checking, linting

---

## API Builder

### Capabilities

The API Builder creates backend services, endpoints, and middleware.

**Supported Task Types**:
- `create_endpoint` - Generate new API routes
- `update_endpoint` - Modify existing routes
- `create_service` - Build service layer functions
- `update_service` - Update service logic
- `create_middleware` - Generate Express/Next.js middleware
- `update_middleware` - Modify middleware

### Input Format

**Required Fields**:
- `module` (string): API module or service name
- `taskDescription` (string): API requirements
- `organisationId` (string): Organization identifier

**Optional Fields**:
- `context.endpoints` (array): List of endpoints to create
- `context.methods` (array): HTTP methods ("GET", "POST", "PUT", "DELETE")
- `context.authentication` (boolean): Require auth for endpoints
- `context.validation` (object): Input validation rules

### Output Format

**Artifacts**:
- Type: `code`
- Files: `.ts` (route handlers, services, middleware)
- Metadata: Endpoint paths, methods, request/response schemas

**Example Output**:
```json
{
  "success": true,
  "artifacts": [
    {
      "type": "code",
      "name": "UserEndpoints",
      "path": "app/api/users/route.ts",
      "content": "/* API route code */",
      "metadata": {
        "endpoints": [
          {"path": "/api/users", "method": "GET"},
          {"path": "/api/users", "method": "POST"}
        ]
      }
    }
  ]
}
```

### Permissions

- **Read**: Repository contents, existing API files
- **Write**: API routes in `app/api/`, service files in `lib/`
- **Execute**: TypeScript compilation, API testing

---

## Schema Builder

### Capabilities

The Schema Builder manages type definitions, database schemas, and data models.

**Supported Task Types**:
- `create_type` - Generate TypeScript type definitions
- `update_type` - Modify type definitions
- `create_schema` - Create database schemas
- `update_schema` - Update schema definitions
- `create_migration` - Generate database migrations
- `validate_schema` - Validate schema integrity

### Input Format

**Required Fields**:
- `module` (string): Schema module name (e.g., "users", "orders")
- `taskDescription` (string): Schema requirements
- `organisationId` (string): Organization identifier

**Optional Fields**:
- `context.fields` (array): Field definitions
- `context.relationships` (array): Relations to other schemas
- `context.validation` (object): Validation rules
- `context.database` (string): Target database ("postgres", "mongodb", etc.)

### Output Format

**Artifacts**:
- Type: `schema`
- Files: `.ts` (type definitions), `.sql` (migrations)
- Metadata: Field types, constraints, indexes

**Example Output**:
```json
{
  "success": true,
  "artifacts": [
    {
      "type": "schema",
      "name": "UserType",
      "path": "types/user.ts",
      "content": "export interface User { ... }",
      "metadata": {
        "fields": ["id", "name", "email"],
        "constraints": ["email unique"]
      }
    }
  ]
}
```

### Permissions

- **Read**: Existing type files, schema definitions
- **Write**: Type files in `types/`, schema files
- **Execute**: Type checking, schema validation

---

## Integration Builder

### Capabilities

The Integration Builder creates integrations with external services and APIs.

**Supported Task Types**:
- `create_integration` - Build new service integration
- `update_integration` - Modify existing integration
- `create_client` - Generate API client
- `update_client` - Update client implementation
- `create_webhook` - Create webhook handler
- `update_webhook` - Modify webhook logic

### Input Format

**Required Fields**:
- `module` (string): Integration module (e.g., "stripe", "sendgrid")
- `taskDescription` (string): Integration requirements
- `organisationId` (string): Organization identifier

**Optional Fields**:
- `context.service` (string): External service name
- `context.features` (array): Features to integrate
- `context.authentication` (object): Auth configuration
- `context.webhookEvents` (array): Webhook events to handle

### Output Format

**Artifacts**:
- Type: `code`
- Files: `.ts` (client, webhooks, utilities)
- Metadata: API endpoints, event handlers, config requirements

**Example Output**:
```json
{
  "success": true,
  "artifacts": [
    {
      "type": "code",
      "name": "StripeIntegration",
      "path": "lib/integrations/stripe.ts",
      "content": "/* Stripe client code */",
      "metadata": {
        "requiredEnvVars": ["STRIPE_SECRET_KEY"],
        "webhookEvents": ["payment_intent.succeeded"]
      }
    }
  ]
}
```

### Permissions

- **Read**: Integration files, configuration
- **Write**: Integration files in `lib/integrations/`
- **Execute**: Integration tests

---

## QA Builder

### Capabilities

The QA Builder validates all code outputs and ensures quality standards.

**Supported Task Types**:
- `create_test` - Generate test files
- `update_test` - Modify existing tests
- `run_tests` - Execute test suites
- `validate_output` - Validate builder artifacts
- `qa_review` - Quality review of code
- `qa_of_qa_review` - Meta-review of QA process

### Input Format

**Required Fields**:
- `module` (string): Module being tested
- `taskDescription` (string): QA requirements
- `organisationId` (string): Organization identifier

**Optional Fields**:
- `context.testTypes` (array): Test types ("unit", "integration", "e2e")
- `context.coverage` (number): Target code coverage percentage
- `context.artifactsToValidate` (array): Artifacts from other builders

### Output Format

**Artifacts**:
- Type: `test` or `documentation`
- Files: `.test.ts`, `.spec.ts`
- QA Results: Validation results with pass/fail status

**Example Output**:
```json
{
  "success": true,
  "artifacts": [
    {
      "type": "test",
      "name": "UserServiceTests",
      "path": "lib/__tests__/users.test.ts",
      "content": "/* Test code */"
    }
  ],
  "qaResults": [
    {
      "check": "type_safety",
      "status": "passed",
      "message": "All types are properly defined"
    },
    {
      "check": "code_quality",
      "status": "passed",
      "message": "Code meets quality standards"
    }
  ]
}
```

### Permissions

- **Read**: All repository contents (for validation)
- **Write**: Test files in `__tests__/`, `.test.ts` files
- **Execute**: Test runners, linters, type checkers

### QA Validation Checks

The QA Builder performs these standard checks:

1. **Type Safety**: All code properly typed
2. **Code Quality**: Linting rules satisfied
3. **Test Coverage**: Minimum coverage thresholds met
4. **Security**: No obvious vulnerabilities
5. **Performance**: No obvious performance issues
6. **Documentation**: Code is documented
7. **Standards Compliance**: Follows project standards

### QA-of-QA Meta-Review

The QA Builder also performs meta-review:
- Are QA checks comprehensive?
- Are validation criteria appropriate?
- Are test cases thorough?
- Is the QA process itself sound?

---

## Builder Capability Manifest

Each builder publishes a capability manifest accessible via code:

```typescript
import { getBuilderCapability } from '@/lib/builder/capabilities'

const uiCapability = getBuilderCapability('ui')
// Returns: BuilderCapability object with full specifications
```

## Common Patterns Across Builders

### Input Validation

All builders validate:
1. Required fields present
2. Field types correct
3. Organization ID valid
4. Task type supported

### Error Handling

All builders follow error handling pattern:
1. Catch exceptions gracefully
2. Return structured error response
3. Log errors for debugging
4. Set task status to `failed`

### Artifact Standards

All artifacts include:
- `type`: Artifact type classification
- `name`: Human-readable artifact name
- `path`: File path in repository
- `content`: Actual code or schema content
- `metadata`: Additional context

### GitHub App Integration

All code-writing builders:
1. Use GitHub App for authentication
2. Create changes on feature branches
3. Respect repository permissions
4. Include commit messages

---

*This specification defines the capabilities, interfaces, and behaviors of all builder agents in the Maturion system.*
