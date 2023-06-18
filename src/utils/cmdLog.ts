export class CmdLogs {
  static errMsg(msg: string) {
    console.log(msg);
    process.exit(1);
  }
}
