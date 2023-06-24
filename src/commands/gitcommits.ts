import { CmdLogs } from "../utils/cmdLog.js";
import { getConfig } from "../utils/config.js";
import { commitWith, getStagedChanges, stageAll } from "../utils/git.js";
import { generateCommitMessage } from "../utils/openai.js";
import prompts from 'prompts';

const gitcommits = async (args: any) => {
  if (args.all) await stageAll();
  await getConfig("OPENAI_KEY");
  const gitDiff = await getStagedChanges();
  if (!gitDiff) {
    CmdLogs.errMsg(
      "No staged changes found", "stage all changes with the `--all` flag."
    );
  }
  const commit_msg = await generateCommitMessage(gitDiff);
  if (!commit_msg) {
    CmdLogs.info("No commit messages were generated. Try again.");
    return;
  }
  CmdLogs.commitMsg(commit_msg);
  const response = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: 'Use this commit message?',
    initial: false
  });
  if (response.confirmed) {
    commitWith(commit_msg)
    CmdLogs.success("Successfully committed")
  } else {
    CmdLogs.result("Commit cancelled")
  }
};
export default gitcommits;
