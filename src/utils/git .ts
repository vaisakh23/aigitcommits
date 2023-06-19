import { execa } from "execa";

export const getStagedChanges = async () => {
  const { stdout: gitDiff } = await execa("git", ["diff", "--cached"]);
  return gitDiff;
};

export const stageAll = async () => await execa("git", ["add", "--all"]);
