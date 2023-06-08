import { Configuration, OpenAIApi } from "openai";
import { getStagedChanges } from "../utils/getStagedChanges.js";

export default async () => {
  const gitDiff = await getStagedChanges();
  const openai = new OpenAIApi(
    new Configuration({ apiKey: process.env.OPENAI_API_KEY })
  );
  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Generate a concise git commit message written in present tense for the following code diff.
        Your entire response will be passed directly into git commit.`,
      },
      { role: "user", content: gitDiff },
    ],
  });
};
