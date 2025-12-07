# Configuration Directory

## Local Builder Configuration

### `local-builder.json`

This configuration file controls the local builder fallback system.

**Important Notes:**

1. **local_repo_path**: This path is system-specific. Update it to match your local environment:
   - Windows: `D:/AI_Projects/Foreman true north and Qa files/maturion-foreman-app`
   - Linux/Mac: `/home/user/projects/maturion-foreman-app`
   - Or use an environment variable: Set `LOCAL_BUILDER_REPO_PATH` in your environment

2. **Timeout Configuration**:
   - `health_check_timeout_ms`: Timeout for health checks (default: 5000ms)
   - `execution_timeout_ms`: Timeout for builder execution (default: 300000ms = 5 minutes)

3. **Deployment**: In production, consider using environment variables or a configuration management system to handle environment-specific paths.

### Example Usage

```bash
# Set environment variable for local repo path
export LOCAL_BUILDER_REPO_PATH="/path/to/your/repo"

# Or use the default from config file
# The system will use config file values if env vars are not set
```
