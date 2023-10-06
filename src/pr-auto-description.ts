const getDescriptionFormat = () => {
  return [
    '\t## What?',
    '\t## Why?',
    '\t## How?',
    '\t## Testing?',
    '\t## Anything Else?',
  ].join('\n');
};

export const getPrompt = (
) => [
    'Generate a concise pull request description written in present tense using the following summaries of a code diff with the given specifications below:',
  'Include a what: explanation of the changes made.',
  'Include a how: point out significant design decisions.',
  'Output the response in the following format:',
  getDescriptionFormat(),
    'Your responses will be passed directly into the pull request description or comments.',
].filter(Boolean).join('\n');