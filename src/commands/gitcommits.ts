import { CmdLogs } from "../utils/cmdLog.js";
import { getStagedChanges, stageAll } from "../utils/git .js";
import { generateCommitMessage } from "../utils/openai.js";

const gitcommits = async (args: any) => {
  if (args.all) await stageAll();
  const gitDiff = await getStagedChanges();
  if (!gitDiff) {
    CmdLogs.errMsg("No staged changes found \nstage all changes with the `--all` flag.");
  }
  const commit_msg = await generateCommitMessage(gitDiff);
  if (!commit_msg) {
    CmdLogs.info("No commit messages were generated. Try again.");
  } else {
    CmdLogs.commitMsg(commit_msg)
  }
};
export default gitcommits;
