const getDescriptionFormat = () => {
  return [
    '\t## Code Suggestions',
    '\t## What?',
    '\t## Why?',
  ].join('\n');
};

export const getPrompt = (
) => [
  'Generate an array of code suggestions for the following code diff with the given specifications below:',
  'Include a what: explanation of the suggestion.',
  'Include a why: a justification for the suggestion. Point out security, performance, or design issues.',
  'For each suggestion, output the response in the following format:',
  getDescriptionFormat(),
].filter(Boolean).join('\n');