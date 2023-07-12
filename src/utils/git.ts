import { execa } from "execa";

const excludeFromDiff = (path: string) => `:(exclude)${path}`;

const filesToExclude = [
  "package-lock.json",
  "pnpm-lock.yaml",
  "*.lock",
  "public",
].map(excludeFromDiff);

export const getStagedChanges = async () => {
  const { stdout: gitDiff } = await execa("git", [
    "diff",
    "--cached",
    "--diff-algorithm=minimal",
    ...filesToExclude,
  ]);
  return gitDiff;
};

export const stageAll = async () => await execa("git", ["add", "--all"]);

export const commitWith = async (msg: string) => {
  await execa("git", ["commit", "-m", msg]);
};
