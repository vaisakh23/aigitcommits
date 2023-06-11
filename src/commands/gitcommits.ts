import { getStagedChanges } from "../utils/getStagedChanges.js";
import { generateCommitMessage } from "../utils/openai.js";

export default async () => {
  const gitDiff = await getStagedChanges();
  const commit_msg = await generateCommitMessage(gitDiff)
  console.log(commit_msg.data.choices[0].message?.content)
};
