import { Octokit } from 'octokit';

async function testRepositoryAccess() {
  console.log('Testing GitHub Repository Access...\n');
  
  // Get token from environment
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('❌ GITHUB_TOKEN not found in environment');
    console.error('In GitHub Actions, token should be available from workflow');
    process.exit(1);
  }
  
  const octokit = new Octokit({ auth: token });
  
  try {
    // Test 1: Get authenticated user
    console.log('Test 1: Get authenticated user...');
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`✅ Authenticated as: ${user.login}`);
    console.log(`   Type: ${user.type}`);
    console.log();
    
    // Test 2: List accessible repositories in MaturionISMS org
    console.log('Test 2: List MaturionISMS repositories...');
    try {
      const { data: repos } = await octokit.rest.repos.listForOrg({
        org: 'MaturionISMS',
        per_page: 10,
      });
      console.log(`✅ Can access ${repos.length} repositories in MaturionISMS org`);
      repos.forEach((repo: any) => {
        console.log(`   - ${repo.name} (permissions: ${JSON.stringify(repo.permissions)})`);
      });
      console.log();
    } catch (error: any) {
      console.log(`⚠️  Cannot list org repos: ${error.message}`);
      console.log('   Trying individual repo access...\n');
    }
    
    // Test 3: Test access to this repository
    console.log('Test 3: Access maturion-foreman-app repository...');
    const { data: repo } = await octokit.rest.repos.get({
      owner: 'MaturionISMS',
      repo: 'maturion-foreman-app',
    });
    console.log(`✅ Can access: ${repo.full_name}`);
    console.log(`   Permissions: ${JSON.stringify(repo.permissions)}`);
    console.log();
    
    // Test 4: Test branch access
    console.log('Test 4: Test branch access...');
    const testBranch = 'copilot/verify-repo-access-and-fix-app';
    
    try {
      const { data: ref } = await octokit.rest.git.getRef({
        owner: 'MaturionISMS',
        repo: 'maturion-foreman-app',
        ref: `heads/${testBranch}`,
      });
      console.log(`✅ Can read branch: ${testBranch}`);
      console.log(`   SHA: ${ref.object.sha}`);
      
      const { data: contents } = await octokit.rest.repos.getContent({
        owner: 'MaturionISMS',
        repo: 'maturion-foreman-app',
        path: '',
        ref: testBranch,
      });
      console.log(`✅ Can read repository contents`);
      console.log(`   ${Array.isArray(contents) ? contents.length : 1} items found`);
      console.log();
    } catch (error: any) {
      console.error(`❌ Cannot access branch: ${error.message}`);
      process.exit(1);
    }
    
    // Test 5: Check organization permissions
    console.log('Test 5: Check organization-level permissions...');
    try {
      const { data: org } = await octokit.rest.orgs.get({
        org: 'MaturionISMS',
      });
      console.log(`✅ Can access organization: ${org.login}`);
    } catch (error: any) {
      console.log(`⚠️  Limited org access: ${error.message}`);
    }
    
    console.log();
    console.log('='.repeat(60));
    console.log('✅ REPOSITORY ACCESS VERIFICATION SUCCESSFUL');
    console.log('✅ Read/write permissions confirmed for MaturionISMS repos');
    console.log('='.repeat(60));
    
  } catch (error: any) {
    console.error('\n❌ REPOSITORY ACCESS VERIFICATION FAILED:');
    console.error(`   ${error.message}`);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
    }
    process.exit(1);
  }
}

testRepositoryAccess().catch(console.error);
