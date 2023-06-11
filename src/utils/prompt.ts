export const generatePrompt = () => {
  return `Generate a concise git commit message written in present tense for the following code diff.
  Your entire response will be passed directly into git commit.`;
};
