#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import gitcommits from "./commands/gitcommits.js";
import config from "./commands/config.js";

yargs(hideBin(process.argv))
  .usage("usage: $0 <command> [<options>]")
  .command(
    "$0",
    "gitcommits",
    (yargs) => {
      return yargs.option("all", {
        describe: "stage all files for commit",
      });
    },
    gitcommits
  )
  .command(
    "config [key] [value]",
    "Manage configuration",
    (yargs) => {
      return yargs
        .option("get", {
          describe: "get key value",
        })
        .positional("key", {
          type: "string",
        })
        .positional("value", {
          type: "string",
        });
    },
    config
  )
  .strict()
  .help()
  .alias("help", "h")
  .parse();
