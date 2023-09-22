import * as core from '@actions/core';
import { getDescription } from "./ai";
import { getCommits, getDiff } from "./git-diff";
import { getBranch, getPullRequest, getRepo, updatePullRequestDescription } from './github';
import { getPrompt } from "./prompt";

(async () => {
  try {
    const repo = getRepo();
    const pullRequest = getPullRequest();
    if (!pullRequest) throw new Error('No pull request found');

    const commits = await getCommits(repo, pullRequest);
    const diff = await getDiff(repo, pullRequest);
    core.info(`Diff:\n\n${diff}\n\nGenerating prompt...`);

    const prompt = getPrompt('en', commits);
    core.info(`Prompt:\n\n${prompt}\n\nGenerating description...`);

    const detailedDescription = await getDescription(prompt, diff);

    const branch = getBranch();
    const description = `## Ticket\n\n${branch}\n\n${detailedDescription}`;
    core.info(`Description:\n\n${description}`);

    if (!description) throw new Error('No description generated');

    await updatePullRequestDescription(repo, pullRequest, description);

  } catch (error) {
    core.setFailed((error as Error).message);
  }
})();