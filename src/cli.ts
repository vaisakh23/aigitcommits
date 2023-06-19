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
        alias: "a",
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
        .usage("usage: $0 config [<options>]")
        .option("get", {
          alias: "g",
          describe: "get key value",
        })
        .positional("key", {
          type: "string",
          default: false
        })
        .positional("value", {
          type: "string",
        })
        .requiresArg("get")
        .fail((msg, err, yargs) => {
          console.log("Sorry, no component name was given.");
          console.log(yargs.help())
        });
    },
    config
  )
  .strict()
  .help()
  .alias("help", "h")
  .parse();
