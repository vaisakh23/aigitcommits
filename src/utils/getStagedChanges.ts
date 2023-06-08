import { execa } from "execa";

export const getStagedChanges = async () => {
  const { stdout: gitDiff } = await execa("git", ["diff", "--cached"]);
  return gitDiff;
};
