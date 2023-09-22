import * as core from '@actions/core';
import * as github from '@actions/github';

export type Repo = typeof github.context.repo;
export type PullRequest = Required<typeof github.context.payload>['pull_request'];

export const getOctokit = () => {
  const githubToken = core.getInput('github-token', { required: true });
  const octokit = github.getOctokit(githubToken);
  return octokit;
};

export const getRepo = () => {
  const repo = github.context.repo;
  return repo;
};

export const getPullRequest = () => {
  const pullRequest = github.context.payload.pull_request;
  return pullRequest;
};

export const getBranch = () => {
  const pullRequest = getPullRequest();
  const branch = String(pullRequest?.head.ref);
  return branch;
};

export const updatePullRequestDescription = async (
  repo: Repo,
  pullRequest: PullRequest,
  description: string
) => {
  const octokit = getOctokit();

  await octokit.rest.pulls.update({
    owner: repo.owner,
    repo: repo.repo,
    pull_number: pullRequest.number,
    body: description,
  });
};
