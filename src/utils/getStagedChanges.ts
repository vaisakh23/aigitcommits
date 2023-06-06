import { execa } from "execa";

export const getStagedChanges = async () => {
  const { stdout: changes } = await execa("git", ["diff", "--cached"]);
  return changes
};
