import fs from "fs/promises";
import path from "path";
import os from "os";
import { CmdLogs } from "./cmdLog.js";

const configPath = path.join(os.homedir(), ".gitcommit");

const configParsers = {
  OPENAI_KEY(value: string) {
    if (!value) {
      CmdLogs.errMsg(
        "Please set your OpenAI API key via `gitcommit config OPENAI_KEY=<your token>`"
      );
    }
    if (!value.startsWith('sk-')) {
      CmdLogs.errMsg("Please provide a valid Api key.")
    }
    return value;
  },
};

type ConfigKeys = keyof typeof configParsers;

const fileExist = (configPath: string) =>
  fs.lstat(configPath).then(
    () => true,
    () => false
  );

const readConfigFile = async () => {
  const configExist = await fileExist(configPath);
  if (!configExist) {
    return Object.create(null);
  }
  const config = await fs.readFile(configPath, "utf8");
  return JSON.parse(config);
};

export const validConfigKey = (key: PropertyKey) => {
  const { hasOwnProperty } = Object.prototype;
  return hasOwnProperty.call(configParsers, key);
};

export const getConfig = async (keys?: ConfigKeys | ConfigKeys[]) => {
  if (typeof keys === "string") keys = [keys];
  if (!keys) keys = Object.keys(configParsers) as ConfigKeys[];

  const config = await readConfigFile();
  const parsedConfig: Record<string, unknown> = {};

  for (const key of keys) {
    const parser = configParsers[key];
    const value = config[key];
    parsedConfig[key] = parser(value);
  }
  return parsedConfig;
};

export const setConfigs = async (key: string, value: string) => {
  const config = await readConfigFile();
  if (!validConfigKey(key)) {
    CmdLogs.errMsg(`Invalid config property: ${key}`);
  }
  config[key] = configParsers[key as ConfigKeys](value);
  await fs.writeFile(configPath, JSON.stringify(config), "utf8");
};
