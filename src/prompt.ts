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

export const getInitialPrompt = (locale: string, commits: string[]) => [
  'I want you to act as a software engineer. Your job is to improve the quality of pull requests.',
  'I want you to consider the following specifications for your answers:',
  `Message language: ${locale}`,
  `Format: GitHub Markdown`,
  `Commit list:`,
  commits.map(commit => `\t${commit}`).join('\n'),
  'Consider the following commit preffixes:',
  getCommitTypesDescription(),
].filter(Boolean).join('\n');

export const composePrompts = (...prompts: string[]) => prompts.join('\n\n');