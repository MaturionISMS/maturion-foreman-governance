# Secrets Management Philosophy

## Zero-Trust Secrets Model

The Maturion system follows a **zero-trust** approach to secrets management. No secret is ever trusted to persist in code, logs, or any location where it could be exposed.

## Core Principles

### 1. No Secrets in Code

**Rule**: Secrets NEVER appear in source code, ever.

**Rationale**: Code is version-controlled, shared, and potentially public. Secrets in code are compromised secrets.

**Enforcement**:
- QA Builder scans all code for secret patterns
- Build sequences fail if secrets detected
- Regular expression patterns detect common secret formats

**Examples of Forbidden Practices**:
```typescript
// ❌ NEVER DO THIS
const apiKey = "sk_live_abc123def456"
const dbPassword = "my_secret_password"
const privateKey = "-----BEGIN RSA PRIVATE KEY-----\n..."

// ✅ ALWAYS DO THIS
const apiKey = process.env.STRIPE_API_KEY
const dbPassword = process.env.DATABASE_PASSWORD
const privateKey = process.env.GITHUB_PRIVATE_KEY
```

### 2. Environment-Based Secrets

**Rule**: All secrets loaded from environment variables at runtime.

**Implementation**:
- Production: Secrets stored in Vercel Environment Variables
- Development: Secrets in `.env.local` (gitignored)
- Testing: Secrets in `.env.test` (gitignored)

**Example**:
```typescript
// lib/stripe.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
})
```

**Environment Variable Validation**:
```typescript
// Validate required secrets at startup
const requiredSecrets = [
  'GITHUB_APP_ID',
  'GITHUB_APP_PRIVATE_KEY',
  'OPENAI_API_KEY'
]

for (const secret of requiredSecrets) {
  if (!process.env[secret]) {
    throw new Error(`Missing required secret: ${secret}`)
  }
}
```

### 3. Scoped Secret Access

**Rule**: Each component receives ONLY the secrets it needs.

**Builder Secret Scoping**:
- **UI Builder**: No secrets needed (client-side safe)
- **API Builder**: API keys for services it integrates
- **Schema Builder**: Database credentials (if schema migration)
- **Integration Builder**: Third-party service credentials
- **QA Builder**: No production secrets (test credentials only)

**Implementation**:
```typescript
// Builders receive scoped secret access
function executeBuilderTask(builder: BuilderType, secrets: BuilderSecrets) {
  // Builder only sees secrets in its scope
  const scopedSecrets = filterSecretsForBuilder(builder, secrets)
  // Execute with limited secret access
}
```

### 4. No Secrets in Logs

**Rule**: Secrets NEVER appear in application logs, console output, or error messages.

**Enforcement**:
```typescript
// ❌ NEVER LOG SECRETS
console.log('API Key:', process.env.STRIPE_SECRET_KEY)
console.error('Auth failed:', { password: userPassword })

// ✅ REDACT SECRETS IN LOGS
console.log('API Key:', '[REDACTED]')
console.error('Auth failed:', { password: '[REDACTED]' })
```

**Automatic Redaction**:
```typescript
function safeLog(message: string, data?: any) {
  const redacted = redactSecrets(data)
  console.log(message, redacted)
}

function redactSecrets(obj: any): any {
  const secretKeys = ['password', 'secret', 'key', 'token', 'credential']
  // Replace secret values with '[REDACTED]'
  // Return sanitized object
}
```

### 5. No Secrets in PR Descriptions

**Rule**: Pull request titles and descriptions NEVER contain secrets.

**Enforcement**:
- PR assembly scans descriptions for secret patterns
- Automatically redact if secrets detected
- Fail PR creation if high-confidence secret found

**Example**:
```typescript
// Before PR creation
function sanitizePRDescription(description: string): string {
  // Remove API keys, passwords, tokens
  return description.replace(/sk_live_\w+/g, '[REDACTED_API_KEY]')
                   .replace(/ghp_\w+/g, '[REDACTED_TOKEN]')
                   // ... more patterns
}
```

## Secret Categories

### GitHub App Credentials

**Secrets**:
- `GITHUB_APP_ID`: Application ID
- `GITHUB_APP_PRIVATE_KEY`: Private key for JWT generation
- `GITHUB_APP_INSTALLATION_ID`: Installation ID for API access
- `GITHUB_WEBHOOK_SECRET`: Secret for webhook signature validation

**Usage**: GitHub API authentication and webhook verification

**Storage**: Vercel environment variables (production), `.env.local` (development)

**Rotation Schedule**: Annually or on compromise

### OpenAI API Credentials

**Secrets**:
- `OPENAI_API_KEY`: API key for GPT-4 access

**Usage**: AI-powered architecture analysis and task generation

**Storage**: Vercel environment variables (production), `.env.local` (development)

**Rotation Schedule**: Quarterly

### GitHub Personal Access Token

**Secrets**:
- `GITHUB_TOKEN`: Personal access token for behavior file loading

**Usage**: Read access to behavior repository

**Storage**: Vercel environment variables (production), `.env.local` (development)

**Rotation Schedule**: Quarterly

**Note**: This token only needs read access to the behavior repository. Scope it minimally.

### Database Credentials (Future)

**Secrets**:
- `DATABASE_URL`: Connection string for persistent storage

**Usage**: Build sequence and task persistence

**Storage**: Vercel environment variables with connection pooling

**Rotation Schedule**: Quarterly

## Secret Rotation Rules

### Rotation Schedule

**Mandatory Rotation**:
- **Quarterly**: OpenAI API keys, GitHub tokens
- **Annually**: GitHub App private keys
- **On Compromise**: Immediate rotation if secret exposed

**Rotation Process**:
1. Generate new secret in service provider
2. Update environment variables in production
3. Verify new secret works
4. Revoke old secret
5. Document rotation in audit log

### Rotation Automation (Future)

Implement automated secret rotation:
```typescript
async function rotateSecret(secretName: string) {
  // 1. Generate new secret via API
  const newSecret = await generateNewSecret(secretName)
  
  // 2. Update environment variable
  await updateEnvironmentVariable(secretName, newSecret)
  
  // 3. Verify new secret works
  await verifySecretWorks(secretName, newSecret)
  
  // 4. Revoke old secret
  await revokeOldSecret(secretName)
  
  // 5. Log rotation
  console.log(`[Secrets] Rotated ${secretName}`)
}
```

## Secret Detection Patterns

QA Builder detects secrets using pattern matching:

### API Key Patterns

```typescript
const apiKeyPatterns = [
  /sk_live_[a-zA-Z0-9]{24,}/,      // Stripe live keys
  /sk_test_[a-zA-Z0-9]{24,}/,      // Stripe test keys
  /ghp_[a-zA-Z0-9]{36,}/,          // GitHub personal access tokens
  /ghs_[a-zA-Z0-9]{36,}/,          // GitHub OAuth tokens
  /AKIA[0-9A-Z]{16}/,              // AWS access keys
  /AIza[0-9A-Za-z\-_]{35}/,        // Google API keys
]
```

### Private Key Patterns

```typescript
const privateKeyPatterns = [
  /-----BEGIN RSA PRIVATE KEY-----/,
  /-----BEGIN PRIVATE KEY-----/,
  /-----BEGIN OPENSSH PRIVATE KEY-----/,
]
```

### Password Patterns

```typescript
const passwordPatterns = [
  /password\s*=\s*['"][^'"]+['"]/i,
  /pwd\s*=\s*['"][^'"]+['"]/i,
  /secret\s*=\s*['"][^'"]+['"]/i,
]
```

### Detection Implementation

```typescript
function detectSecrets(code: string): SecretDetection[] {
  const detections: SecretDetection[] = []
  
  for (const pattern of allSecretPatterns) {
    const matches = code.match(pattern)
    if (matches) {
      detections.push({
        pattern: pattern.toString(),
        match: matches[0],
        type: 'potential_secret',
        severity: 'high'
      })
    }
  }
  
  return detections
}
```

## Secret Storage Best Practices

### Development Environment

**File**: `.env.local` (gitignored)

**Example**:
```bash
# .env.local (NEVER commit this file)
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
GITHUB_APP_INSTALLATION_ID=987654
GITHUB_WEBHOOK_SECRET=your_webhook_secret
OPENAI_API_KEY=sk-proj-...
```

**Protection**:
```bash
# .gitignore
.env.local
.env*.local
*.pem
*.key
```

### Production Environment

**Platform**: Vercel Environment Variables

**Access**:
1. Vercel Dashboard → Project Settings
2. Environment Variables tab
3. Add each secret individually
4. Scope to Production, Preview, or Development

**Encryption**: Vercel encrypts all environment variables at rest

### Staging/Testing Environment

**File**: `.env.test` (gitignored)

**Use Test Credentials**:
```bash
# .env.test
STRIPE_SECRET_KEY=sk_test_...  # Test mode key, not production
OPENAI_API_KEY=sk-proj-...      # Separate test account
```

**Never use production secrets in testing.**

## Secret Access Audit

Log all secret access for security audits:

```typescript
function accessSecret(secretName: string, requester: string): string {
  // Log access
  console.log(`[Secrets] ${requester} accessed ${secretName}`)
  
  // Increment access counter
  secretAccessMetrics.increment(secretName)
  
  // Return secret value
  return process.env[secretName] || ''
}
```

## Incident Response

If a secret is exposed:

### Step 1: Immediate Revocation

- Revoke the exposed secret in the service provider immediately
- Do NOT wait for rotation schedule

### Step 2: Generate Replacement

- Generate new secret
- Update environment variables
- Verify new secret works

### Step 3: Audit Exposure

- Determine how secret was exposed
- Check if secret was used maliciously
- Review access logs

### Step 4: Remediation

- Fix the code/process that exposed the secret
- Add detection to prevent recurrence
- Document incident

### Step 5: Notification

- Notify security team
- File incident report
- Update security procedures

## Secret Management Checklist

Before deploying any code:

- [ ] No hardcoded secrets in code
- [ ] All secrets loaded from environment variables
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in logs or error messages
- [ ] Secret detection patterns up to date
- [ ] QA Builder configured to scan for secrets
- [ ] Rotation schedule documented
- [ ] Incident response plan in place

## Future Enhancements

### Secrets Management Service

Integrate with dedicated secrets management:
- **AWS Secrets Manager**: Enterprise secret storage
- **HashiCorp Vault**: Secret rotation and access control
- **Azure Key Vault**: Microsoft Azure integration

### Dynamic Secret Injection

Generate short-lived secrets on-demand:
- Builder tasks receive temporary credentials
- Credentials expire after task completion
- No long-lived secrets in builder processes

### Automated Secret Scanning

Continuous monitoring for secret exposure:
- Pre-commit hooks scan for secrets
- CI/CD pipeline blocks commits with secrets
- GitHub secret scanning alerts on exposure

---

*This secrets management philosophy ensures zero-trust handling of credentials, preventing exposure through systematic detection, rotation, and access control.*
