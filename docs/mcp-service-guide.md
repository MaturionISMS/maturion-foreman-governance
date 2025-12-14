# MCP Service Guide

## Overview

The MCP (Model Context Protocol) Service provides a standalone REST API for autonomous GitHub operations. It can run independently from the main Foreman application.

## Features

- **REST API Contract**: Standard HTTP endpoints for health, tool discovery, and execution
- **Authentication**: Bearer token authentication for security
- **Audit Logging**: All operations logged to Governance Memory
- **Health Monitoring**: Dependency checks for GitHub API and Governance Memory
- **Containerization**: Docker support for easy deployment
- **Safe Failure Modes**: Graceful degradation when dependencies unavailable

## Quick Start

### Prerequisites

- Node.js 20+
- GitHub Personal Access Token with required permissions
- API key for service authentication

### Environment Variables

**Required:**
- `MCP_API_KEY` - API key for authenticating requests to the service
- `GITHUB_MCP_TOKEN` - GitHub token for API operations

**Optional:**
- `MCP_PORT` - Server port (default: 3100)
- `MCP_HOST` - Server host (default: 0.0.0.0)
- `MCP_REQUIRE_CI_GREEN` - Require CI green before merge (default: true)
- `MCP_RESPECT_BRANCH_PROTECTION` - Respect branch protection (default: true)
- `MCP_REQUIRE_QA_APPROVAL` - Require QA approval (default: true)
- `MCP_REQUIRE_COMPLIANCE_APPROVAL` - Require compliance approval (default: true)
- `MCP_LOG_ALL_ACTIONS` - Log all requests (default: true)
- `MCP_LOG_TO_GOVERNANCE_MEMORY` - Log to governance memory (default: true)

### GitHub Token Permissions

The `GITHUB_MCP_TOKEN` requires:
- `repo` scope (for private repositories)
- `pull_request: write` (to merge PRs)
- `issues: write` (to close issues and manage labels)
- `contents: read` (to check CI status)

### Running Locally

```bash
# Install dependencies
npm install

# Set environment variables
export MCP_API_KEY="your-secret-api-key"
export GITHUB_MCP_TOKEN="ghp_your_github_token"

# Start service
npm run mcp:serve
```

The service will start on http://localhost:3100

### Running with Node

```bash
# Set environment variables
export MCP_API_KEY="your-secret-api-key"
export GITHUB_MCP_TOKEN="ghp_your_github_token"

# Run directly
node lib/mcp/standalone-server.js
```

### Running with Docker

```bash
# Build image
docker build -f Dockerfile.mcp -t mcp-service:latest .

# Run container
docker run -d \
  -e MCP_API_KEY="your-secret-api-key" \
  -e GITHUB_MCP_TOKEN="ghp_your_github_token" \
  -p 3100:3100 \
  --name mcp-service \
  mcp-service:latest

# Check health
curl http://localhost:3100/health

# Stop container
docker stop mcp-service

# Remove container
docker rm mcp-service
```

## API Reference

### GET /health

Check service health and dependencies.

**Authentication:** None required (public endpoint)

**Response:**
```json
{
  "status": "ok",
  "uptime": 123,
  "timestamp": "2025-12-14T12:00:00.000Z",
  "dependencies": {
    "github": {
      "status": "ok",
      "authenticated": true,
      "rateLimitRemaining": 4500
    },
    "governanceMemory": {
      "status": "ok",
      "writable": true
    }
  },
  "version": "0.1.0",
  "config": {
    "safetyChecksEnabled": true,
    "auditLoggingEnabled": true
  }
}
```

**Status Codes:**
- `200` - Service healthy
- `503` - Service degraded or error

**Health Status Values:**
- `ok` - All dependencies healthy
- `degraded` - Some dependencies failing but service operational
- `error` - Critical dependencies failing

### GET /tools

Discover available MCP tools.

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `format` - Response format: `summary` (default) or `detailed`

**Request:**
```bash
curl http://localhost:3100/tools \
  -H "Authorization: Bearer your-api-key"
```

**Response (Summary):**
```json
{
  "tools": [
    "mcp_github_merge_pr",
    "mcp_github_close_issue",
    "mcp_github_add_labels",
    "mcp_github_remove_labels",
    "mcp_github_comment"
  ],
  "count": 5,
  "timestamp": "2025-12-14T12:00:00.000Z"
}
```

**Response (Detailed):**
```json
{
  "tools": [
    {
      "name": "mcp_github_merge_pr",
      "description": "Merge a pull request with safety validation",
      "parameters": {
        "owner": {
          "type": "string",
          "required": true,
          "description": "Repository owner"
        },
        "repo": {
          "type": "string",
          "required": true,
          "description": "Repository name"
        },
        "prNumber": {
          "type": "number",
          "required": true,
          "description": "PR number"
        },
        "mergeMethod": {
          "type": "string",
          "required": true,
          "description": "Merge method (merge|squash|rebase)"
        }
      },
      "safetyChecks": [
        "CI green",
        "Branch protection",
        "QA approval",
        "Compliance approval",
        "No conflicts"
      ]
    }
  ],
  "count": 1,
  "timestamp": "2025-12-14T12:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `401` - Missing or invalid API key

### POST /execute

Execute an MCP tool.

**Authentication:** Required (Bearer token)

**Request:**
```bash
curl -X POST http://localhost:3100/execute \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "mcp_github_comment",
    "parameters": {
      "owner": "MaturionISMS",
      "repo": "maturion-foreman-app",
      "issueNumber": 1,
      "body": "Test comment"
    }
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "result": {
    "commentId": 123456789
  },
  "audit": {
    "operation": "comment",
    "actor": "foreman",
    "target": {
      "owner": "MaturionISMS",
      "repo": "maturion-foreman-app",
      "number": 1
    },
    "timestamp": "2025-12-14T12:00:00.000Z",
    "result": "success",
    "executionTimeMs": 245
  }
}
```

**Response (Failure - Safety Check):**
```json
{
  "success": false,
  "error": "SAFETY_CHECK_FAILED",
  "reason": "CI status is not green",
  "safetyChecksFailed": [
    "CI status is not green"
  ],
  "audit": {
    "operation": "merge_pr",
    "actor": "foreman",
    "target": {
      "owner": "MaturionISMS",
      "repo": "maturion-foreman-app",
      "number": 123
    },
    "timestamp": "2025-12-14T12:00:00.000Z",
    "result": "failure",
    "executionTimeMs": 567
  }
}
```

**Status Codes:**
- `200` - Execution completed (check `success` field in body)
- `400` - Invalid request (unknown tool, missing parameters)
- `401` - Missing or invalid API key
- `500` - Server error

**Error Codes:**
- `INVALID_TOOL` - Unknown tool name
- `INVALID_PARAMETERS` - Missing or invalid parameters
- `SAFETY_CHECK_FAILED` - Safety checks blocked operation
- `GITHUB_API_ERROR` - GitHub API error
- `SYSTEM_ERROR` - Internal server error

## Available Tools

### mcp_github_merge_pr

Merge a pull request with full safety validation.

**Parameters:**
- `owner` (string, required) - Repository owner
- `repo` (string, required) - Repository name
- `prNumber` (number, required) - PR number
- `mergeMethod` (string, required) - Merge method: `merge`, `squash`, or `rebase`

**Safety Checks:**
- CI status must be green
- Branch protection rules respected
- QA approved (label)
- Compliance approved (label)
- No merge conflicts

### mcp_github_close_issue

Close an issue with documentation.

**Parameters:**
- `owner` (string, required) - Repository owner
- `repo` (string, required) - Repository name
- `issueNumber` (number, required) - Issue number
- `reason` (string, required) - Closure reason
- `linkedPRs` (array, optional) - Linked PR numbers

**Safety Checks:**
- Resolution documented

### mcp_github_add_labels

Add labels to issue or PR.

**Parameters:**
- `owner` (string, required) - Repository owner
- `repo` (string, required) - Repository name
- `issueNumber` (number, required) - Issue/PR number
- `labels` (array, required) - Labels to add

### mcp_github_comment

Post comment on issue or PR.

**Parameters:**
- `owner` (string, required) - Repository owner
- `repo` (string, required) - Repository name
- `issueNumber` (number, required) - Issue/PR number
- `body` (string, required) - Comment body

**Safety Checks:**
- No secrets in comment body

## Monitoring

### Health Check

Use the `/health` endpoint for monitoring:

```bash
# Basic health check
curl http://localhost:3100/health

# With jq for parsed output
curl -s http://localhost:3100/health | jq '.status'
```

### Docker Health Check

Docker automatically runs health checks:

```bash
# Check container health
docker ps

# View health check logs
docker inspect --format='{{json .State.Health}}' mcp-service
```

### Kubernetes Health Probes

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3100
  initialDelaySeconds: 10
  periodSeconds: 30

readinessProbe:
  httpGet:
    path: /health
    port: 3100
  initialDelaySeconds: 5
  periodSeconds: 10
```

## Security

### API Key Management

- Store `MCP_API_KEY` securely (environment variable, secrets manager)
- Never commit API keys to source control
- Rotate API keys regularly
- Use different keys for different environments

### GitHub Token Security

- Use fine-grained personal access tokens when possible
- Limit token permissions to minimum required
- Set token expiration
- Rotate tokens regularly

### Network Security

- Run service behind firewall
- Use HTTPS in production (reverse proxy recommended)
- Restrict access by IP if possible
- Monitor for unauthorized access attempts

## Troubleshooting

### Service Won't Start

**Problem:** `Missing required environment variable: MCP_API_KEY`

**Solution:** Set the required environment variables:
```bash
export MCP_API_KEY="your-api-key"
export GITHUB_MCP_TOKEN="ghp_your_token"
```

**Problem:** `Port 3100 already in use`

**Solution:** Use a different port:
```bash
export MCP_PORT=3101
npm run mcp:serve
```

### Health Check Fails

**Problem:** `GitHub status: error, authenticated: false`

**Solution:** Check GitHub token:
- Verify token is valid
- Check token hasn't expired
- Verify token has required permissions

**Problem:** `Governance Memory status: error, writable: false`

**Solution:** Check file system permissions and module availability

### Authentication Fails

**Problem:** `401 Unauthorized`

**Solution:** 
- Verify `Authorization` header is present
- Check header format: `Authorization: Bearer your-api-key`
- Verify API key matches `MCP_API_KEY` environment variable

### Execution Fails

**Problem:** `SAFETY_CHECK_FAILED`

**Solution:** Check which safety checks failed and resolve:
- CI not green: Wait for CI to pass
- QA not approved: Add `qa-approved` label
- Compliance not approved: Add `compliance-approved` label

## Production Deployment

### Recommended Setup

1. **Reverse Proxy**: Use nginx or similar for HTTPS
2. **Process Manager**: Use systemd or Docker for auto-restart
3. **Monitoring**: Set up health check monitoring
4. **Logging**: Configure log aggregation
5. **Secrets Management**: Use secrets manager for keys

### Systemd Service

```ini
[Unit]
Description=MCP Service
After=network.target

[Service]
Type=simple
User=mcp
WorkingDirectory=/opt/mcp
Environment="MCP_API_KEY=your-api-key"
Environment="GITHUB_MCP_TOKEN=ghp_your_token"
ExecStart=/usr/bin/node /opt/mcp/lib/mcp/standalone-server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name mcp.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Version History

- **v1.0** (2025-12-14): Initial release
  - REST API with /health, /tools, /execute
  - Bearer token authentication
  - Audit logging
  - Docker support
