#!/usr/bin/env node
/**
 * Script to document QIC/QIEL/QII incidents that should be closed
 * 
 * Purpose: Remove all auto-generated incident issues that represent 
 * environmental misalignment (now solved via QIEL Environment Alignment + Drift Detector Enforcement)
 * 
 * This script generates a report of all quality-integrity issues that should be closed.
 * 
 * Requirements:
 * - Node.js runtime
 * - Can be run with: npx tsx scripts/close-qii-incidents.ts
 * 
 * Note: This script requires GitHub API access with issues:write permission to actually close issues.
 * The Copilot agent environment does not have permission to modify issues directly.
 */

interface QIIssue {
  number: number;
  title: string;
  created_at: string;
  labels: string[];
}

// List of all quality-integrity issues identified for closure
// Source: GitHub API search for label:quality-integrity state:open
const qualityIntegrityIssues: QIIssue[] = [
  { number: 239, title: "🚨 Quality Integrity Incident - main - eaefdbf7392444623736d6fb543d195e0bb636cd", created_at: "2025-12-08T12:27:52Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 237, title: "🚨 Quality Integrity Incident - 233/merge - 9180874437c994d4b63a6be8cb036e9f9d871dea", created_at: "2025-12-08T12:20:27Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 234, title: "🚨 Quality Integrity Incident - main - 53d63ef42aaa95885082e1cc32d370afea6fea68", created_at: "2025-12-08T11:50:00Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 231, title: "🚨 Quality Integrity Incident - 229/merge - b46ca1688e01d895c557c9dcb6d8d42b0ea0aa7b", created_at: "2025-12-08T11:44:39Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 230, title: "🚨 Quality Integrity Incident - main - fbe4eea2714b478463ddc12c556cf83520f2e95c", created_at: "2025-12-08T11:15:21Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 227, title: "🚨 Quality Integrity Incident - main - 97cbc8b8278adcb05e877240bdfbcccae6746f2c", created_at: "2025-12-08T10:37:00Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 224, title: "🚨 Quality Integrity Incident - 217/merge - 8c7b0d71469218ae2a26808a0d05cf57ac037e6f", created_at: "2025-12-08T10:30:34Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 223, title: "🚨 Quality Integrity Incident - 217/merge - 8c7b0d71469218ae2a26808a0d05cf57ac037e6f", created_at: "2025-12-08T10:30:29Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 222, title: "🚨 Quality Integrity Incident - 217/merge - aa7f9ee54292d37fa628290908fcbdb7219b2566", created_at: "2025-12-08T09:35:54Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 221, title: "🚨 Quality Integrity Incident - 217/merge - 69619b5b39ed1c50b41e056d0e70d3f705b6c83a", created_at: "2025-12-08T08:57:29Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 220, title: "🚨 Quality Integrity Incident - 217/merge - 6dacdd420382031e959c3796e1dafb81e7d47cc5", created_at: "2025-12-08T08:18:34Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 219, title: "🚨 Quality Integrity Incident - 217/merge - 6dacdd420382031e959c3796e1dafb81e7d47cc5", created_at: "2025-12-08T08:18:34Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 218, title: "🚨 Quality Integrity Incident - main - 32c8f512746b981028d18525a3a19ffcb17b1463", created_at: "2025-12-08T07:59:21Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 215, title: "🚨 Quality Integrity Incident - 211/merge - 543df06faaf30f78dfc187b1b4ccab4b37f332b5", created_at: "2025-12-08T07:53:08Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 214, title: "🚨 Quality Integrity Incident - 211/merge - 543df06faaf30f78dfc187b1b4ccab4b37f332b5", created_at: "2025-12-08T07:52:45Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 213, title: "🚨 Quality Integrity Incident - 211/merge - d1502aad6037a2ec67d62b2a88fbbfce61219485", created_at: "2025-12-08T07:17:22Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 212, title: "🚨 Quality Integrity Incident - main - fe46e45bc406cc0e82d8e58371d6478bf6758831", created_at: "2025-12-08T06:36:42Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 209, title: "🚨 Quality Integrity Incident - 205/merge - 819328839b1c5da3e75b563f93b613caae8780ec", created_at: "2025-12-08T06:31:44Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 208, title: "🚨 Quality Integrity Incident - main - 220911b81e47bc1c743d4a2fd67296a9e5f3c03b", created_at: "2025-12-08T06:07:01Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 207, title: "🚨 Quality Integrity Incident - 201/merge - 233291bfbac068d8d63388fb85cd0ebca056cda4", created_at: "2025-12-08T06:03:33Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 206, title: "🚨 Quality Integrity Incident - 201/merge - 233291bfbac068d8d63388fb85cd0ebca056cda4", created_at: "2025-12-08T06:03:32Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 203, title: "🚨 Quality Integrity Incident - main - 0a12cde80168393ac70ac906c003258a3b03f0ea", created_at: "2025-12-07T16:23:59Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 202, title: "🚨 Quality Integrity Incident - main - ea6097d9300001b94055dbb3e366d01e59ef9608", created_at: "2025-12-07T16:23:22Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 200, title: "🚨 Quality Integrity Incident - 194/merge - eb8fa7b222cf7286e489cfe2db125aac28f0fe7b", created_at: "2025-12-07T16:20:23Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 199, title: "🚨 Quality Integrity Incident - 194/merge - eb8fa7b222cf7286e489cfe2db125aac28f0fe7b", created_at: "2025-12-07T16:20:20Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 198, title: "🚨 Quality Integrity Incident - main - 1979a4a1f49e9134c0a3e478d89721cb09b6c969", created_at: "2025-12-07T16:20:13Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 197, title: "🚨 Quality Integrity Incident - 190/merge - 79832bccc89ee4b8f6c2010001db01681086e99e", created_at: "2025-12-07T16:20:01Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 195, title: "🚨 Quality Integrity Incident - 185/merge - 7a284283135597332c545a107cfa905842efcd0c", created_at: "2025-12-07T15:52:32Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 192, title: "🚨 Quality Integrity Incident - main - 08b8cc9dacc18ca6e9bfe30547bdcd2062c8eff4", created_at: "2025-12-07T15:32:05Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 191, title: "🚨 Quality Integrity Incident - 181/merge - 0441920f8ab17852a8affa05e5845c038183aa04", created_at: "2025-12-07T15:22:55Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 186, title: "🚨 Quality Integrity Incident - main - 3586fb89b1054a3dee53fc88d9645c4bc47a10a5", created_at: "2025-12-07T13:43:33Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 184, title: "🚨 Quality Integrity Incident - 178/merge - 62bb42eb77a6b989125774da72f9f33aa7f1419e", created_at: "2025-12-07T13:38:54Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 183, title: "🚨 Quality Integrity Incident - 178/merge - 62bb42eb77a6b989125774da72f9f33aa7f1419e", created_at: "2025-12-07T13:38:53Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 182, title: "🚨 Quality Integrity Incident - main - a80a680917475e13ad4684db94eb2f33fab43836", created_at: "2025-12-07T13:24:03Z", labels: ["quality-integrity", "qiel", "automated"] },
  { number: 180, title: "🚨 Quality Integrity Incident - 171/merge - 8c783818210e47616fc96c49c07aaa52bab0be39", created_at: "2025-12-07T13:20:30Z", labels: ["quality-integrity", "qiel", "automated"] },
];

const closureComment = `## Resolution

This Quality Integrity Incident issue has been resolved via:

**QIEL Environment Alignment + Drift Detector Enforcement**

### Background

This issue was auto-generated during a period of environmental misalignment between development and CI environments. The root causes have been identified and resolved:

1. ✅ Environment alignment completed
2. ✅ Drift Detector enforcement active
3. ✅ QIEL validation stabilized

### Impact

- Issue Type: Environmental Misalignment (Historical)
- Status: **RESOLVED**
- Resolution Date: 2025-12-08

These incidents no longer represent actionable quality issues and are being closed as part of the QIC/QIEL incident consolidation effort.

---

_This issue closure is part of [Issue #256](https://github.com/MaturionISMS/maturion-foreman-app/issues/256) - QIC/QIEL/QII Incident Consolidation & Removal_
`;

/**
 * Generate a report of all issues to be closed
 */
function generateReport(): void {
  console.log("=".repeat(80));
  console.log("QIC/QIEL/QII INCIDENT CONSOLIDATION REPORT");
  console.log("=".repeat(80));
  console.log();
  console.log(`Total Issues to Close: ${qualityIntegrityIssues.length}`);
  console.log(`Resolution Status: "Resolved via QIEL Environment Alignment + Drift Detector Enforcement"`);
  console.log();
  console.log("Issues List:");
  console.log("-".repeat(80));
  
  qualityIntegrityIssues.forEach((issue, index) => {
    console.log(`${index + 1}. Issue #${issue.number}`);
    console.log(`   Title: ${issue.title}`);
    console.log(`   Created: ${issue.created_at}`);
    console.log(`   Labels: ${issue.labels.join(", ")}`);
    console.log();
  });
  
  console.log("=".repeat(80));
  console.log("CLOSURE COMMENT TO BE USED:");
  console.log("=".repeat(80));
  console.log(closureComment);
  console.log("=".repeat(80));
  console.log();
  console.log("NEXT STEPS:");
  console.log("1. Verify all issues are incident-related (not functional issues)");
  console.log("2. Use GitHub CLI or API to close these issues with the above comment");
  console.log("3. Example command:");
  console.log('   gh issue close <issue_number> --comment "..."');
  console.log();
  console.log("Acceptance Criteria:");
  console.log("✓ All incident issues closed (Expected: 35, Found: " + qualityIntegrityIssues.length + ")");
  console.log("✓ No functional issues removed");
  console.log("✓ Only true build/governance/constitutional issues remain");
  console.log("=".repeat(80));
}

// Execute if run directly
if (require.main === module) {
  generateReport();
}

export { qualityIntegrityIssues, closureComment, generateReport };
