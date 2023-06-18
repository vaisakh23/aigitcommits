import { CmdLogs } from "../utils/cmdLog.js";
import { getStagedChanges } from "../utils/getStagedChanges.js";
import { generateCommitMessage } from "../utils/openai.js";

const gitcommits = async (args: any) => {
  const gitDiff = await getStagedChanges();
  if (!gitDiff) {
    CmdLogs.errMsg("No staged changes found. Stage your changes manually.");
  }
  const commit_msg = await generateCommitMessage(gitDiff);
  if (!commit_msg) {
    CmdLogs.info("No commit messages were generated. Try again.");
  } else {
    CmdLogs.commitMsg(commit_msg)
  }
};
export default gitcommits;
