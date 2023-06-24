import { CmdLogs } from "../utils/cmdLog.js";
import { getConfig, setConfigs, validConfigKey } from "../utils/config.js";

const config = async (args: any) => {
  const { get, key, value } = args;
  if (get && validConfigKey(get)) {
    const config = await getConfig(get);
    CmdLogs.result(config[get] as string);
  } else if (key && key.startsWith("sk-")) {
    await setConfigs("OPENAI_KEY", key);
    CmdLogs.success("Config added");
  } else if (key && !validConfigKey(key)) {
    CmdLogs.errMsg(`Invalid config property: ${key}`);
  }
  if (key && value) {
    await setConfigs(key, value);
    CmdLogs.success("Config added");
  } else {
    CmdLogs.errMsg("Missing params \nusage: aigitcommit config <key> <value>");
  }
};

export default config;
