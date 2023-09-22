const getCommitTypesDescription = () => {
  return [
    `\tdocs: 'Documentation only changes'`,
    `\tstyle: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'`,
    `\trefactor: 'A code change that neither fixes a bug nor adds a feature'`,
    `\tperf: 'A code change that improves performance'`,
    `\ttest: 'Adding missing tests or correcting existing tests'`,
    `\tbuild: 'Changes that affect the build system or external dependencies'`,
    `\tci: 'Changes to our CI configuration files and scripts'`,
    `\tchore: "Other changes that don't modify src or test files"`,
    `\trevert: 'Reverts a previous commit'`,
    `\tfeat: 'A new feature'`,
    `\tfix: 'A bug fix'`,
  ].join('\n');
};

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
  locale: string,
  commits: string[],
) => [
  'Generate a concise pull request description written in present tense for the following code diff with the given specifications below:',
  `Message language: ${locale}`,
  `Format: Markdown`,
  `Commit list:`,
  commits.map(commit => `\t${commit}`).join('\n'),
  'Include a what: explanation of the changes made.',
  'Include a how: point out significant design decisions.',
  'Your entire response will be passed directly into the pull request description.',
  'Consider the following commit preffixes:',
  getCommitTypesDescription(),
    'Output the response in the following format:',
  getDescriptionFormat(),
].filter(Boolean).join('\n');