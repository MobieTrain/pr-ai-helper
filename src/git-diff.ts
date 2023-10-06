import { PullRequest, Repo, getOctokit } from "./github";

export const getCommits = async (repo: Repo, pullRequest: PullRequest) => {
  const octokit = getOctokit();
  const commits = await octokit.rest.pulls.listCommits({
    owner: repo.owner,
    repo: repo.repo,
    pull_number: pullRequest.number,
  });

  const messages = commits.data.map((commit) => commit.commit.message);

  return messages;
}

export const getDiffChunks = async (repo: Repo, pullRequest: PullRequest) => {
  const octokit = getOctokit();
  const diffFile = await octokit.rest.pulls.get({
    owner: repo.owner,
    repo: repo.repo,
    pull_number: pullRequest.number,
    mediaType: {
      format: 'diff'
    }
  });

  const diff = diffFile.data as unknown as string;
  return diff.split('diff --git');
};