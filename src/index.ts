import * as core from '@actions/core';
import { getCompletionContent, getSummarizedCodeDiff } from "./ai";
import { getCommits, getDiffChunks } from "./git-diff";
import { getBranch, getPullRequest, getRepo, updatePullRequestDescription } from './github';
import { getPrompt as getDescriptionPrompt } from "./pr-auto-description";
import { composePrompts, getInitialPrompt } from "./prompt";

(async () => {
  try {
    const repo = getRepo();
    const pullRequest = getPullRequest();
    if (!pullRequest) throw new Error('No pull request found');

    const commits = await getCommits(repo, pullRequest);
    const diffChunks = await getDiffChunks(repo, pullRequest);
    core.info(`Diff:\n\n${diffChunks}\n\nGenerating prompt...`);

    const initialPrompt = getInitialPrompt('en', commits);
    const descriptionPrompt = getDescriptionPrompt();

    const prompt = composePrompts(initialPrompt, descriptionPrompt, ...diffChunks);
    core.info(`Prompt:\n\n${prompt}\n\nGetting completions...`);

    const summaries = await getSummarizedCodeDiff(diffChunks, [initialPrompt]);

    const detailedDescription = await getCompletionContent(summaries, [initialPrompt, descriptionPrompt]);

    const branch = getBranch();
    const description = `## Ticket\n\n${branch}\n\n${detailedDescription}`;
    core.info(`Description:\n\n${description}`);

    if (!description) throw new Error('No description generated');

    await updatePullRequestDescription(repo, pullRequest, description);

  } catch (error) {
    core.setFailed((error as Error).message);
  }
})();