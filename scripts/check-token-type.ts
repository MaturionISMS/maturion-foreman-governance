#!/usr/bin/env tsx

/**
 * Quick Token Type Checker
 * 
 * Quickly identifies what type of GitHub token you have
 * and provides next steps.
 * 
 * Usage:
 *   npx tsx scripts/check-token-type.ts
 */

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function header(text: string) {
  console.log(`\n${colors.bold}${colors.blue}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}  ${text}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}═══════════════════════════════════════════════════════${colors.reset}\n`);
}

function info(text: string) {
  console.log(`${colors.cyan}ℹ️  ${text}${colors.reset}`);
}

function success(text: string) {
  console.log(`${colors.green}✅ ${text}${colors.reset}`);
}

function warning(text: string) {
  console.log(`${colors.yellow}⚠️  ${text}${colors.reset}`);
}

function error(text: string) {
  console.log(`${colors.red}❌ ${text}${colors.reset}`);
}

function main() {
  header('GitHub Token Type Checker');

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    error('GITHUB_TOKEN is not set in environment');
    console.log('\n📋 Next steps:');
    console.log('1. Make sure you have a .env.local file');
    console.log('2. Add your GitHub token to it:');
    console.log('   GITHUB_TOKEN=your_token_here');
    console.log('3. Run this script again\n');
    process.exit(1);
  }

  console.log('Token detected in environment!\n');

  // Analyze token type
  let tokenType = 'Unknown';
  let needsOrgPermissions = false;
  let recommendations: string[] = [];

  if (token.startsWith('ghp_')) {
    tokenType = 'Classic Personal Access Token';
    needsOrgPermissions = false;
    
    success('Token Type: Classic Personal Access Token');
    console.log('\n📌 About Classic Tokens:');
    console.log('   • Use scopes (like "repo") instead of granular permissions');
    console.log('   • Do NOT have an "Organization permissions" section');
    console.log('   • The "repo" scope automatically includes organization access');
    console.log('   • Simpler to configure and use');
    
    console.log('\n✅ Good News:');
    console.log('   Classic tokens DO NOT need organization permissions!');
    console.log('   The "repo" scope already includes everything you need.');
    
    console.log('\n🔍 If you\'re getting 404 errors with a classic token:');
    recommendations = [
      'The issue is NOT missing organization permissions',
      'Check if repository exists: https://github.com/MaturionISMS/maturion-isms',
      'Verify your token has "repo" scope selected',
      'Make sure token is not expired',
      'Check if token value in .env.local is correct and complete',
    ];
  } else if (token.startsWith('github_pat_')) {
    tokenType = 'Fine-Grained Personal Access Token';
    needsOrgPermissions = true;
    
    warning('Token Type: Fine-Grained Personal Access Token');
    console.log('\n📌 About Fine-Grained Tokens:');
    console.log('   • Use granular permissions instead of scopes');
    console.log('   • REQUIRE both repository AND organization permissions');
    console.log('   • Must set "Resource owner" to organization');
    console.log('   • More complex but more secure');
    
    console.log('\n⚠️  Important:');
    console.log('   Fine-grained tokens NEED organization permissions to access org repos!');
    
    console.log('\n🔍 To add organization permissions:');
    recommendations = [
      'Go to: https://github.com/settings/tokens?type=beta',
      'Edit your token',
      'Set "Resource owner" to "MaturionISMS" (NOT your personal account)',
      'Scroll to "Organization permissions" (should appear after setting resource owner)',
      'Set "Members" to "Read-only"',
      'Click "Update permissions"',
      'Click "Regenerate token" and copy new value',
      'Update .env.local with new token value',
    ];
    
    console.log('\n💡 Can\'t find Organization Permissions?');
    console.log('   See: CANNOT_SEE_ORG_PERMISSIONS.md');
    console.log('   The "Resource owner" must be set to MaturionISMS for org permissions to appear!');
  } else {
    tokenType = 'Unknown or Invalid Format';
    error('Token Type: Unknown format');
    console.log('\n⚠️  Token doesn\'t match expected formats:');
    console.log('   • Classic tokens start with: ghp_');
    console.log('   • Fine-grained tokens start with: github_pat_');
    console.log(`   • Your token starts with: ${token.substring(0, 12)}...`);
    
    recommendations = [
      'Verify you copied the complete token (they\'re very long)',
      'Check for extra spaces or characters',
      'Generate a new token if current one seems invalid',
      'Use classic token for simplicity: https://github.com/settings/tokens/new',
    ];
  }

  // Summary
  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log(`${colors.bold}📊 SUMMARY${colors.reset}\n`);
  console.log(`Token Type: ${colors.bold}${tokenType}${colors.reset}`);
  console.log(`Organization Permissions Required: ${needsOrgPermissions ? `${colors.yellow}YES${colors.reset}` : `${colors.green}NO${colors.reset}`}`);
  
  console.log(`\n${colors.bold}📋 NEXT STEPS:${colors.reset}\n`);
  recommendations.forEach((rec, i) => {
    console.log(`   ${i + 1}. ${rec}`);
  });

  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log(`${colors.bold}🧪 RUN FULL VALIDATION:${colors.reset}\n`);
  console.log('   npm run validate:github-token\n');
  console.log('This will test your token against GitHub\'s API and show exact errors.\n');

  // Recommendations based on type
  if (tokenType === 'Classic Personal Access Token') {
    console.log(`${colors.bold}💡 RECOMMENDATION:${colors.reset}\n`);
    console.log('   Your classic token should already work for organization repositories.');
    console.log('   If you\'re getting 404 errors, run the validation script above to diagnose.\n');
  } else if (tokenType === 'Fine-Grained Personal Access Token') {
    console.log(`${colors.bold}💡 RECOMMENDATION:${colors.reset}\n`);
    console.log('   Fine-grained tokens need organization permissions.');
    console.log('   Follow the steps above, or create a classic token for simplicity.\n');
    console.log('   See: ADD_ORGANIZATION_PERMISSIONS.md for detailed instructions\n');
  }

  console.log(`${colors.bold}📚 DOCUMENTATION:${colors.reset}\n`);
  console.log('   START_HERE.md - Overview');
  console.log('   CANNOT_SEE_ORG_PERMISSIONS.md - If org permissions not visible');
  console.log('   ADD_ORGANIZATION_PERMISSIONS.md - How to add org permissions');
  console.log('   README_SOLUTION.md - Quick summary\n');
}

main();
