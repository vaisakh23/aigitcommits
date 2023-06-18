import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "./prompt.js";
import { getConfig } from "./config.js";
import { CmdLogs } from "./cmdLog.js";

const initOpenAi = (config: any) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: config.OPENAI_KEY,
    })
  );
  return openai;
};

export const generateCommitMessage = async (gitDiff: string) => {
  try {
    const config = await getConfig("OPENAI_KEY");
    const openai = initOpenAi(config);
    const response = await openai?.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: generatePrompt(),
        },
        { role: "user", content: gitDiff },
      ],
    });
    return response?.data.choices[0].message?.content;
  } catch (err: any) {
    if (err.response) {
      await CmdLogs.openaiError(err.response.data.error);
    } else {
      CmdLogs.errMsg("Failed to connect OpenAI");
    }
  }
};
