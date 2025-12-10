#!/usr/bin/env tsx

/**
 * GitHub Token Validation Script
 * 
 * Tests if the configured GITHUB_TOKEN has proper access to:
 * 1. GitHub API (basic authentication)
 * 2. MaturionISMS organization
 * 3. maturion-isms repository
 * 4. Required permissions for Foreman operation
 * 
 * Usage:
 *   npx tsx scripts/validate-github-token.ts
 * 
 * Or with custom token:
 *   GITHUB_TOKEN=ghp_your_token npx tsx scripts/validate-github-token.ts
 */

import { Octokit } from 'octokit';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function success(message: string) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function error(message: string) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function warning(message: string) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function info(message: string) {
  console.log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
}

function section(message: string) {
  console.log(`\n${colors.blue}━━━ ${message} ━━━${colors.reset}\n`);
}

async function validateToken() {
  section('GitHub Token Validation');

  // Check if token is configured
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    error('GITHUB_TOKEN environment variable is not set');
    console.log('\nPlease set GITHUB_TOKEN in your .env.local file or as an environment variable.');
    console.log('Example: GITHUB_TOKEN=ghp_your_token_here');
    process.exit(1);
  }

  info(`Token format: ${token.startsWith('ghp_') ? 'Classic PAT (ghp_...)' : token.startsWith('github_pat_') ? 'Fine-grained PAT (github_pat_...)' : 'Unknown format'}`);

  // Determine token type
  const tokenType = token.startsWith('ghp_') 
    ? 'Classic Personal Access Token'
    : token.startsWith('github_pat_')
    ? 'Fine-Grained Personal Access Token'
    : 'Unknown token type';
  
  info(`Token type: ${tokenType}`);

  const octokit = new Octokit({ auth: token });

  // Test 1: Basic API access
  section('Test 1: Basic GitHub API Access');
  try {
    const { data: user } = await octokit.rest.users.getAuthenticated();
    success(`Authenticated as: ${user.login}`);
    info(`Account type: ${user.type}`);
    info(`Account created: ${user.created_at}`);
  } catch (err: any) {
    error('Failed to authenticate with GitHub API');
    console.error(`Error: ${err.message}`);
    if (err.status === 401) {
      console.log('\n🔍 Diagnosis: Token is invalid or expired');
      console.log('Solution: Generate a new token and update GITHUB_TOKEN');
    }
    process.exit(1);
  }

  // Test 2: Organization access
  section('Test 2: MaturionISMS Organization Access');
  
  let userLogin: string;
  
  try {
    const { data: org } = await octokit.rest.orgs.get({ org: 'MaturionISMS' });
    success(`Can access MaturionISMS organization`);
    info(`Organization name: ${org.name || org.login}`);
    info(`Organization ID: ${org.id}`);
    
    // Check if user is member (reuse user data from Test 1)
    const { data: user } = await octokit.rest.users.getAuthenticated();
    userLogin = user.login;
    
    try {
      await octokit.rest.orgs.checkMembershipForUser({
        org: 'MaturionISMS',
        username: userLogin,
      });
      success('You are a member of MaturionISMS organization');
    } catch {
      warning('You are not a member of MaturionISMS (this may be normal for fine-grained tokens)');
    }
  } catch (err: any) {
    error('Failed to access MaturionISMS organization');
    console.error(`Error: ${err.message}`);
    if (err.status === 404) {
      console.log('\n🔍 Diagnosis: Organization not found or token lacks access');
      console.log('Solution: Ensure your token has organization access enabled');
    }
    process.exit(1);
  }

  // Test 3: Repository access (maturion-isms)
  section('Test 3: maturion-isms Repository Access');
  try {
    const { data: repo } = await octokit.rest.repos.get({
      owner: 'MaturionISMS',
      repo: 'maturion-isms',
    });
    success(`Can access maturion-isms repository`);
    info(`Repository name: ${repo.full_name}`);
    info(`Private: ${repo.private ? 'Yes' : 'No'}`);
    info(`Default branch: ${repo.default_branch}`);
  } catch (err: any) {
    error('Failed to access maturion-isms repository');
    console.error(`Error: ${err.message}`);
    if (err.status === 404) {
      console.log('\n🔍 Diagnosis: Repository not found or token lacks access');
      console.log('\nPossible causes:');
      console.log('1. Fine-grained token needs organization approval');
      console.log('2. Token does not have "All repositories" access');
      console.log('3. Repository name is incorrect');
      console.log('\nSolutions:');
      console.log('• For fine-grained tokens: Request and approve organization access');
      console.log('• Go to: https://github.com/settings/tokens');
      console.log('• Edit your token and ensure "All repositories" is selected');
      console.log('• Check organization approval status at:');
      console.log('  https://github.com/organizations/MaturionISMS/settings/personal-access-tokens/pending_requests');
      console.log('• Or use a classic PAT instead: https://github.com/settings/tokens/new');
    } else if (err.status === 403) {
      console.log('\n🔍 Diagnosis: Token has access but lacks permissions');
      console.log('Solution: Ensure token has "Contents: Read" permission');
    }
    process.exit(1);
  }

  // Test 4: Read repository contents
  section('Test 4: Read Repository Contents');
  try {
    const { data: contents } = await octokit.rest.repos.getContent({
      owner: 'MaturionISMS',
      repo: 'maturion-isms',
      path: '',
    });
    success(`Can read maturion-isms repository contents`);
    if (Array.isArray(contents)) {
      info(`Found ${contents.length} files/directories in root`);
    }
  } catch (err: any) {
    error('Failed to read repository contents');
    console.error(`Error: ${err.message}`);
    if (err.status === 403) {
      console.log('\n🔍 Diagnosis: Token lacks "Contents: Read" permission');
      console.log('Solution: Edit token and enable "Contents: Read and write" permission');
    }
    process.exit(1);
  }

  // Test 5: Check specific governance directory (if exists)
  section('Test 5: Governance Repository Access (maturion-ai-foreman)');
  try {
    const { data: govRepo } = await octokit.rest.repos.get({
      owner: 'MaturionISMS',
      repo: 'maturion-ai-foreman',
    });
    success(`Can access maturion-ai-foreman governance repository`);
    
    // Try to read foreman/ directory
    try {
      const { data: foremanDir } = await octokit.rest.repos.getContent({
        owner: 'MaturionISMS',
        repo: 'maturion-ai-foreman',
        path: 'foreman',
      });
      success(`Can read foreman/ governance directory`);
      if (Array.isArray(foremanDir)) {
        info(`Found ${foremanDir.length} governance files`);
      }
    } catch (dirErr: any) {
      warning('Could not read foreman/ directory (may not exist in this repo)');
    }
  } catch (err: any) {
    warning('maturion-ai-foreman repository not accessible (may not exist yet)');
    info('This is not critical if you are using local behavior files');
  }

  // Test 6: Check token permissions (if API supports it)
  section('Test 6: Token Permissions');
  try {
    // For fine-grained tokens, we can inspect the scopes
    const { headers } = await octokit.request('GET /user');
    const scopes = headers['x-oauth-scopes'];
    
    if (scopes) {
      success('Token scopes detected');
      const scopeList = scopes.split(', ').filter(Boolean);
      if (scopeList.length > 0) {
        scopeList.forEach(scope => info(`  - ${scope}`));
        
        // Check for required scopes
        const requiredScopes = ['repo'];
        const hasAllRequired = requiredScopes.every(req => 
          scopeList.some(scope => scope === req || scope.startsWith(req + ':'))
        );
        
        if (hasAllRequired) {
          success('Token has required scopes for Foreman operation');
        } else {
          warning('Token may be missing some required scopes');
          console.log('Required scopes: repo (or more granular permissions)');
        }
      } else {
        info('Fine-grained token detected (scopes determined by resource permissions)');
      }
    } else {
      info('Cannot determine token scopes (this is normal for fine-grained tokens)');
      info('Permissions are determined by repository access settings');
    }
    
    // Additional check for fine-grained tokens: organization permissions
    if (tokenType === 'Fine-Grained Personal Access Token') {
      console.log('\n⚠️  Important for fine-grained tokens:');
      console.log('Fine-grained tokens require ORGANIZATION PERMISSIONS to access org repos.');
      console.log('\nTo add organization permissions:');
      console.log('1. Go to: https://github.com/settings/tokens');
      console.log('2. Edit your token');
      console.log('3. Scroll to "Organization permissions"');
      console.log('4. Add "Members: Read-only" permission');
      console.log('5. Regenerate token and update GITHUB_TOKEN');
      console.log('\nWithout organization permissions, you will get 404 errors on org repositories!');
      console.log('See: ADD_ORGANIZATION_PERMISSIONS.md for detailed instructions\n');
    }
  } catch (err) {
    warning('Could not check token permissions details');
  }

  // Test 7: Test write access (if safe to do so)
  section('Test 7: Write Permissions Check');
  info('Skipping actual write test to avoid unintended modifications');
  info('Write permissions will be tested during actual Foreman operation');
  warning('If Foreman fails to create PRs or update files, check "Contents: Read and write" permission');

  // Final summary
  section('Validation Summary');
  success('All critical tests passed!');
  console.log('\n✅ Your GitHub token is correctly configured for Foreman operation.\n');
  console.log('Next steps:');
  console.log('1. Ensure token is set in Vercel environment variables (if deploying)');
  console.log('2. Run Foreman status check: curl http://localhost:3000/api/foreman/status');
  console.log('3. Test behavior file loading by starting the application');
  console.log('4. Enable autonomous mode if desired: MATURION_AUTONOMOUS_MODE=true\n');
  
  info('For troubleshooting help, see: docs/GITHUB_TOKEN_TROUBLESHOOTING.md');
}

// Run validation
validateToken().catch(err => {
  console.error('\n❌ Unexpected error during validation:');
  console.error(err);
  process.exit(1);
});
