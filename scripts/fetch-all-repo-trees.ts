#!/usr/bin/env tsx

/**
 * Fetch Repository Trees Script
 * 
 * This script fetches the tree structure of all MaturionISMS repositories
 * and generates a comprehensive markdown document with visual tree representations.
 * 
 * Usage:
 *   npx tsx scripts/fetch-all-repo-trees.ts
 * 
 * Requirements:
 *   - GITHUB_TOKEN environment variable must be set
 *   - GitHub token must have access to MaturionISMS private repositories
 */

import { Octokit } from 'octokit';
import * as fs from 'fs';
import * as path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG = 'MaturionISMS';

const REPOSITORIES = [
  'maturion-ai-foreman',
  'PartPulse',
  'maturion-foreman-app',
  'maturion-local-builder',
  'maturion-isms',
  'maturion-copilot-builders',
];

interface TreeNode {
  path: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

interface RepoInfo {
  name: string;
  description: string;
  language: string | null;
  default_branch: string;
  html_url: string;
  private: boolean;
}

async function fetchRepoInfo(octokit: Octokit, repo: string): Promise<RepoInfo | null> {
  try {
    const { data } = await octokit.repos.get({
      owner: ORG,
      repo,
    });

    return {
      name: data.name,
      description: data.description || 'No description',
      language: data.language,
      default_branch: data.default_branch,
      html_url: data.html_url,
      private: data.private,
    };
  } catch (error: any) {
    console.error(`Error fetching repo info for ${repo}:`, error.message);
    return null;
  }
}

async function fetchRepoTree(
  octokit: Octokit,
  repo: string,
  branch: string = 'main'
): Promise<TreeNode[] | null> {
  try {
    // Get the tree recursively
    const { data } = await octokit.git.getTree({
      owner: ORG,
      repo,
      tree_sha: branch,
      recursive: 'true',
    });

    return data.tree as TreeNode[];
  } catch (error: any) {
    console.error(`Error fetching tree for ${repo}:`, error.message);
    return null;
  }
}

function buildTreeStructure(nodes: TreeNode[], maxDepth: number = 3): string {
  // Filter out common ignored directories
  const ignoredDirs = [
    'node_modules',
    '.git',
    '__pycache__',
    'dist',
    'build',
    '.next',
    'coverage',
    '.vercel',
  ];

  const filteredNodes = nodes.filter((node) => {
    const pathParts = node.path.split('/');
    return !pathParts.some((part) => ignoredDirs.includes(part));
  });

  // Build tree structure
  const tree: any = {};

  filteredNodes.forEach((node) => {
    const parts = node.path.split('/');
    if (parts.length > maxDepth) return;

    let current = tree;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {
          type: index === parts.length - 1 ? node.type : 'tree',
          children: {},
        };
      }
      current = current[part].children;
    });
  });

  // Convert tree to string representation
  function treeToString(obj: any, prefix: string = '', isLast: boolean = true): string {
    let result = '';
    const keys = Object.keys(obj);

    keys.forEach((key, index) => {
      const isLastItem = index === keys.length - 1;
      const node = obj[key];
      const connector = isLastItem ? '└── ' : '├── ';
      const extension = node.type === 'tree' ? '/' : '';

      result += `${prefix}${connector}${key}${extension}\n`;

      if (Object.keys(node.children).length > 0) {
        const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
        result += treeToString(node.children, newPrefix, isLastItem);
      }
    });

    return result;
  }

  return treeToString(tree);
}

async function generateMarkdown(): Promise<string> {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  let markdown = `# MaturionISMS Repository Tree Breakdown\n\n`;
  markdown += `**Generated**: ${new Date().toISOString().split('T')[0]}\n\n`;
  markdown += `This document provides a comprehensive tree breakdown of all repositories in the MaturionISMS organization.\n\n`;
  markdown += `---\n\n`;

  // Generate overview table
  markdown += `## Repository Overview\n\n`;
  markdown += `| Repository | Language | Description | Status |\n`;
  markdown += `|-----------|----------|-------------|--------|\n`;

  const repoInfos: (RepoInfo | null)[] = [];

  for (const repo of REPOSITORIES) {
    const info = await fetchRepoInfo(octokit, repo);
    repoInfos.push(info);

    if (info) {
      const status = info.private ? 'Private' : 'Public';
      markdown += `| ${info.name} | ${info.language || '-'} | ${info.description} | ${status} |\n`;
    } else {
      markdown += `| ${repo} | - | Not accessible | - |\n`;
    }
  }

  markdown += `\n---\n\n`;

  // Generate tree for each repository
  for (let i = 0; i < REPOSITORIES.length; i++) {
    const repo = REPOSITORIES[i];
    const info = repoInfos[i];

    markdown += `## ${i + 1}. ${repo}\n\n`;

    if (info) {
      markdown += `**Repository**: [${ORG}/${info.name}](${info.html_url})\n`;
      if (info.language) markdown += `**Language**: ${info.language}\n`;
      markdown += `**Description**: ${info.description}\n`;
      markdown += `**Status**: ${info.private ? 'Private' : 'Public'}\n\n`;

      console.log(`Fetching tree for ${repo}...`);
      const tree = await fetchRepoTree(octokit, repo, info.default_branch);

      if (tree && tree.length > 0) {
        markdown += `### Tree Structure\n\n`;
        markdown += `\`\`\`\n`;
        markdown += `${repo}/\n`;
        markdown += buildTreeStructure(tree, 3);
        markdown += `\`\`\`\n\n`;

        // Stats
        const files = tree.filter((n) => n.type === 'blob').length;
        const dirs = tree.filter((n) => n.type === 'tree').length;
        markdown += `**Statistics**: ${files} files, ${dirs} directories\n\n`;
      } else {
        markdown += `### Tree Structure\n\n`;
        markdown += `*Unable to fetch tree structure*\n\n`;
      }
    } else {
      markdown += `*Repository not accessible or does not exist*\n\n`;
    }

    markdown += `---\n\n`;
  }

  // Add relationship diagram
  markdown += `## Repository Relationships\n\n`;
  markdown += `\`\`\`\n`;
  markdown += `┌─────────────────────────────────────────────────────────────┐\n`;
  markdown += `│                     MaturionISMS Ecosystem                   │\n`;
  markdown += `└─────────────────────────────────────────────────────────────┘\n`;
  markdown += `                              │\n`;
  markdown += `                 ┌────────────┴────────────┐\n`;
  markdown += `                 │                         │\n`;
  markdown += `        ┌────────▼────────┐       ┌───────▼────────┐\n`;
  markdown += `        │  maturion-isms  │       │   PartPulse    │\n`;
  markdown += `        │  (Main Monorepo)│       │ (Part Distrib) │\n`;
  markdown += `        └────────┬────────┘       └────────────────┘\n`;
  markdown += `                 │\n`;
  markdown += `    ┌────────────┼────────────┐\n`;
  markdown += `    │            │            │\n`;
  markdown += `┌───▼───────┐ ┌──▼──────────┐ ┌▼────────────────┐\n`;
  markdown += `│maturion-ai│ │maturion-    │ │maturion-copilot-│\n`;
  markdown += `│-foreman   │ │foreman-app  │ │builders         │\n`;
  markdown += `│(Python)   │ │(TypeScript) │ │(Builder Agents) │\n`;
  markdown += `└───────────┘ └──┬──────────┘ └─────────────────┘\n`;
  markdown += `                 │\n`;
  markdown += `          ┌──────▼──────────┐\n`;
  markdown += `          │maturion-local-  │\n`;
  markdown += `          │builder          │\n`;
  markdown += `          │(Desktop App)    │\n`;
  markdown += `          └─────────────────┘\n`;
  markdown += `\`\`\`\n\n`;

  markdown += `---\n\n`;
  markdown += `**Note**: Tree structures are limited to 3 levels deep for readability.\n`;
  markdown += `Common directories like \`node_modules\`, \`.git\`, and \`dist\` are excluded.\n`;

  return markdown;
}

async function main() {
  try {
    console.log('Fetching repository trees from MaturionISMS organization...\n');

    const markdown = await generateMarkdown();

    const outputPath = path.join(
      __dirname,
      '..',
      'docs',
      'REPOSITORY_TREE_BREAKDOWN.md'
    );

    fs.writeFileSync(outputPath, markdown);

    console.log(`\n✅ Tree breakdown generated successfully!`);
    console.log(`📄 Output: ${outputPath}`);
  } catch (error: any) {
    console.error('❌ Error generating tree breakdown:', error.message);
    process.exit(1);
  }
}

main();
