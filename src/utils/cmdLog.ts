import { getConfig } from "./config.js";
import chalk from "chalk";

const { log } = console;
const { red, green, cyan, blue } = chalk;

export class CmdLogs {
  static success(msg: string, msg2?: string) {
    log(green(msg));
    if (msg2) log(msg2);
    process.exit(1);
  }

  static commitMsg(msg: string) {
    log("commit msg: ", green(msg));
  }

  static result(msg: string, msg2?: string) {
    log(blue(msg));
    if (msg2) log(msg2);
    process.exit(1);
  }

  static info(msg: string, msg2?: string) {
    log(cyan(msg));
    if (msg2) log(msg2);
    process.exit(1);
  }

  static async openaiError(err: any) {
    const { OPENAI_KEY } = await getConfig("OPENAI_KEY");
    log(red(`${err.code}`));
    log("your key ", cyan(`${OPENAI_KEY}`));
    process.exit(1);
  }

  static errMsg(msg: string, msg2?: string) {
    log(red.bold(msg));
    if (msg2) log(msg2);
    process.exit(1);
  }
}
