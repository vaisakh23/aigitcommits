import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "./prompt.js";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_API_KEY,
  })
);

export const generateCommitMessage = async (gitDiff: string) => {
  const commit_msg = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: generatePrompt(),
      },
      { role: "user", content: gitDiff },
    ],
  });
  return commit_msg;
};
