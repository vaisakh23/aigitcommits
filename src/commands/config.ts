import { getConfig, setConfigs } from "../utils/config.js";

const config = async (args: any) => {
  if (args.get) {
    const config = await getConfig();
    console.log(config[args.get])
    return
  }
  setConfigs(args.key, args.value)
  return 
};

export default config;
