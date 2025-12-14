# GitHub App Authentication Setup Guide

This guide explains how to set up GitHub App authentication for the MCP Control Plane.

## Why GitHub App Authentication?

GitHub App authentication is the **preferred and recommended** method for authenticating the MCP Control Plane because it provides:

- **Better Security**: Scoped permissions per installation
- **Auditability**: Installation ID tracked in all operations  
- **Revocability**: Can revoke app access without changing tokens
- **Automatic Token Refresh**: Installation tokens refresh automatically
- **Organization-wide Deployment**: Single app for multiple repositories

## Prerequisites

- Organization admin access to create GitHub Apps
- Access to repository environment variables

## Step 1: Create a GitHub App

1. Navigate to your GitHub organization settings:
   ```
   https://github.com/organizations/YOUR_ORG/settings/apps
   ```

2. Click "New GitHub App"

3. Configure the app:
   - **Name**: `Maturion MCP Control Plane` (or your preferred name)
   - **Homepage URL**: Your organization or repository URL
   - **Webhook**: Uncheck "Active" (not needed for MCP)

4. Set **Repository Permissions**:
   - **Contents**: Read
   - **Issues**: Read & Write
   - **Pull requests**: Read & Write
   - **Metadata**: Read (automatically granted)

5. Set **Where can this GitHub App be installed?**:
   - Select "Only on this account"

6. Click "Create GitHub App"

## Step 2: Generate and Save Private Key

1. After creating the app, scroll to "Private keys" section

2. Click "Generate a private key"

3. A `.pem` file will download - **save this securely**

4. The private key will look like:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   MIIEpAIBAAKCAQEA...
   ...
   -----END RSA PRIVATE KEY-----
   ```

## Step 3: Install the App

1. In the app settings, click "Install App" in the left sidebar

2. Click "Install" next to your organization

3. Choose repositories:
   - Select "All repositories" OR
   - Select specific repositories where MCP will operate

4. Click "Install"

5. After installation, note the **Installation ID** from the URL:
   ```
   https://github.com/organizations/YOUR_ORG/settings/installations/12345678
                                                                      ^^^^^^^^
                                                                  Installation ID
   ```

## Step 4: Configure Environment Variables

Add these environment variables to your MCP runtime:

```bash
# GitHub App Configuration (PREFERRED)
GITHUB_APP_ID=123456                    # From app settings page
GITHUB_APP_INSTALLATION_ID=87654321     # From installation URL
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
...
-----END RSA PRIVATE KEY-----"          # From downloaded .pem file
```

**Important**: 
- Preserve newlines in the private key
- Use quotes around the private key value
- Keep the private key secure and never commit it to version control

### Alternative: Using .env file

For local development, create a `.env` file:

```bash
GITHUB_APP_ID=123456
GITHUB_APP_INSTALLATION_ID=87654321
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAw7Zdfmece8iaB0kiTY8pCtiBtzbptB6jRYj+A2zD7XxA+jPF
# ... rest of key ...
-----END RSA PRIVATE KEY-----"
```

### For Secrets Managers

If using AWS Secrets Manager, Azure Key Vault, or similar:

1. Store the private key as a secret
2. Load it in your application startup
3. Set the environment variable programmatically

## Step 5: Verify Configuration

Test the configuration:

```bash
# Run MCP tests
npm test -- tests/mcp/github-app-integration.test.ts
npm test -- tests/github/github-app-client.test.ts
```

Or test manually with a script:

```typescript
import { GitHubAppClient } from '@/lib/github'

const client = new GitHubAppClient({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  installationId: process.env.GITHUB_APP_INSTALLATION_ID!
})

// Test token generation
const token = await client.getInstallationToken()
console.log('✓ Token obtained:', token.substring(0, 20) + '...')

// Test Octokit
const octokit = await client.getOctokit()
const { data: user } = await octokit.rest.users.getAuthenticated()
console.log('✓ Authenticated as:', user.login)
```

## Step 6: Migrate from Legacy Token (If Applicable)

If you're currently using `GITHUB_MCP_TOKEN`:

1. Set up GitHub App as described above
2. Keep both configured during transition period
3. The system will automatically prefer GitHub App
4. Remove `GITHUB_MCP_TOKEN` once verified
5. Legacy token support will be removed in a future version

## Troubleshooting

### Error: "GitHub authentication token not configured"

**Cause**: Neither GitHub App nor legacy token is configured

**Solution**: Set either GitHub App variables OR `GITHUB_MCP_TOKEN`

### Error: "Failed to generate JWT"

**Cause**: Private key is invalid or incorrectly formatted

**Solutions**:
- Verify the private key includes `-----BEGIN RSA PRIVATE KEY-----` header
- Check that newlines are preserved
- Ensure no extra spaces or characters
- Re-generate the private key if needed

### Error: "Failed to authenticate with GitHub App"

**Cause**: App ID, installation ID, or permissions incorrect

**Solutions**:
- Verify App ID matches the one in GitHub settings
- Verify Installation ID from the installation URL
- Check app is installed on the target repositories
- Verify app has required permissions (Contents, Issues, PRs)

### Warning: "Using legacy token auth (deprecated)"

**Cause**: GitHub App not configured, falling back to token

**Solution**: Set up GitHub App authentication as primary method

## Security Best Practices

1. **Never commit the private key** to version control
2. **Rotate the private key** periodically (generate new one, update env vars)
3. **Use minimal permissions** - only grant what MCP needs
4. **Monitor audit logs** - check installation activity regularly
5. **Revoke compromised keys immediately** - generate new private key
6. **Use secrets managers** in production (AWS/Azure/HashiCorp Vault)

## Permissions Reference

The GitHub App needs these permissions:

| Resource | Permission | Purpose |
|----------|------------|---------|
| Contents | Read | Check CI status, read files |
| Issues | Read & Write | Close issues, manage labels, comment |
| Pull requests | Read & Write | Merge PRs, manage labels, comment |
| Metadata | Read | Repository metadata (automatic) |

## Support

For issues or questions:
- Check logs for detailed error messages
- Verify all environment variables are set correctly
- Run test suite to validate configuration
- Consult the architecture document: `/architecture/github-app-auth-architecture.md`

## References

- [GitHub Apps Documentation](https://docs.github.com/en/apps)
- [Authenticating as a GitHub App](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app)
- [MCP Control Plane Architecture](/architecture/mcp-control-plane-architecture.md)
- [GitHub App Auth Architecture](/architecture/github-app-auth-architecture.md)
