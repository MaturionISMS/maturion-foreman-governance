import { github } from "./client";
import { readdir, readFile } from "fs/promises";
import { join } from "path";

export type ForemanBehaviourFile = {
  path: string;
  content: string;
};

/**
 * Default governance repository configuration
 * Foreman governance lives at: maturion-ai-foreman/foreman/
 */
const DEFAULT_GOVERNANCE_REPO_OWNER = 'MaturionISMS';
const DEFAULT_GOVERNANCE_REPO_NAME = 'maturion-ai-foreman';
const DEFAULT_GOVERNANCE_DIR = 'foreman';

/**
 * Load Foreman behavior files from the governance repository.
 * 
 * Correct architecture:
 * - Foreman governance lives at: maturion-ai-foreman/foreman/
 * - Foreman App is only the supervisor, not the governance source
 * - Governance files include:
 *   - identity.md
 *   - roles-and-duties.md
 *   - privacy-guardrails.md
 *   - memory-model.md
 *   - command-grammar.md
 *   - runtime-maturion-profile.md
 *   - runtime-memory-ingestion.md
 * 
 * Loading priority:
 * 1. External GitHub repository (configured via env vars or defaults)
 * 2. Local foreman/ directory (development/testing fallback only)
 */
export async function loadForemanBehaviourFiles(): Promise<ForemanBehaviourFile[]> {
  // Use environment variables or default to governance repository
  const owner = process.env.FOREMAN_BEHAVIOUR_REPO_OWNER || DEFAULT_GOVERNANCE_REPO_OWNER;
  const repo = process.env.FOREMAN_BEHAVIOUR_REPO_NAME || DEFAULT_GOVERNANCE_REPO_NAME;
  const basePath = process.env.FOREMAN_BEHAVIOUR_DIR || DEFAULT_GOVERNANCE_DIR;

  // Load from GitHub governance repository (default behavior)
  console.log(`[Behavior] Loading behavior files from GitHub repository: ${owner}/${repo}/${basePath}`);
  try {
    return await loadFromGitHub(owner, repo, basePath);
  } catch (error) {
    console.warn('[Behavior] Failed to load from GitHub repository:', error);
    console.warn('[Behavior] Falling back to local foreman/ directory (development mode)');
    return loadFromLocalDirectory();
  }
}

/**
 * Load behavior files from external GitHub repository
 */
async function loadFromGitHub(
  owner: string,
  repo: string,
  basePath: string
): Promise<ForemanBehaviourFile[]> {
  const { data } = await github.rest.repos.getContent({
    owner,
    repo,
    path: basePath,
  });

  if (!Array.isArray(data)) {
    throw new Error(`Expected directory at ${basePath}.`);
  }

  const files: ForemanBehaviourFile[] = [];

  for (const item of data) {
    if (item.type === "file" && item.download_url) {
      const res = await fetch(item.download_url);
      files.push({
        path: item.path,
        content: await res.text(),
      });
    }
  }

  return files;
}

/**
 * Load behavior files from local foreman/ directory
 */
async function loadFromLocalDirectory(): Promise<ForemanBehaviourFile[]> {
  const foremanDir = join(process.cwd(), 'foreman');
  const files: ForemanBehaviourFile[] = [];

  try {
    // Recursively load all .md files from foreman/ directory
    await loadMarkdownFiles(foremanDir, foremanDir, files);
  } catch (error) {
    console.error('[Behavior] Failed to load local behavior files:', error);
    throw new Error('Could not load behavior files from local directory. Ensure foreman/ directory exists.');
  }

  if (files.length === 0) {
    throw new Error('No behavior files found in local foreman/ directory');
  }

  console.log(`[Behavior] Loaded ${files.length} behavior files from local directory`);
  return files;
}

/**
 * Recursively load all markdown files from a directory
 */
async function loadMarkdownFiles(
  dir: string,
  baseDir: string,
  files: ForemanBehaviourFile[]
): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively load from subdirectories
      await loadMarkdownFiles(fullPath, baseDir, files);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Load markdown file
      const content = await readFile(fullPath, 'utf-8');
      const relativePath = fullPath.substring(baseDir.length + 1);
      
      files.push({
        path: relativePath,
        content,
      });
    }
  }
}
