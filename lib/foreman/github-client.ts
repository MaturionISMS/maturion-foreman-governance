// lib/foreman/github-client.ts

import { Octokit } from "octokit";

if (!process.env.GITHUB_TOKEN) {
  throw new Error("Missing GITHUB_TOKEN in environment variables.");
}

export const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Close an issue
export async function closeIssue(owner: string, repo: string, issueNumber: number) {
  return await github.rest.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    state: "closed",
  });
}

// Add a comment to an issue
export async function commentOnIssue(owner: string, repo: string, issueNumber: number, body: string) {
  return await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
}

// Add labels to an issue
export async function addLabels(owner: string, repo: string, issueNumber: number, labels: string[]) {
  return await github.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels,
  });
}
