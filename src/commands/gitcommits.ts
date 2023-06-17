import { getStagedChanges } from "../utils/getStagedChanges.js";
import { generateCommitMessage } from "../utils/openai.js";

const gitcommits = async (args: any) => {
  const gitDiff = await getStagedChanges();
  const commit_msg = await generateCommitMessage(gitDiff);
  console.log(commit_msg.data.choices[0].message?.content);
};
export default gitcommits;
