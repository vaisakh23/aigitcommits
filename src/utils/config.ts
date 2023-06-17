import fs from "fs/promises";
import path from "path";
import os from "os";

const configPath = path.join(os.homedir(), ".gitcommits");

export const getConfig = async () => {
  const fileExist = await fs.lstat(configPath).then(
    () => true,
    () => false
  );
  if (!fileExist) {
    return Object.create(null);
  }
  const config = await fs.readFile(configPath, "utf8");
  return JSON.parse(config);
};

export const setConfigs = async (key: string, value: string) => {
  const config = await getConfig();
  (config as any)[key] = value;
  await fs.writeFile(configPath, JSON.stringify(config), "utf8");
};
