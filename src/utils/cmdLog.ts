import { getConfig } from "./config.js";

export class CmdLogs {
  static commitMsg(msg: string) {
    console.log(msg);
    process.exit(1);
  }

  static result(msg: string) {
    console.log(msg);
    process.exit(1);
  }

  static info(msg: string) {
    console.log(msg);
    process.exit(1);
  }

  static async openaiError(err: any) {
    const { OPENAI_KEY } = await getConfig("OPENAI_KEY");
    console.log(`${err.code} \nyour key ${OPENAI_KEY}`);
    process.exit(1);
  }

  static errMsg(msg: string) {
    console.log(msg);
    process.exit(1);
  }
}
