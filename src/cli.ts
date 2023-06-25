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
        describe: "Stage changes in files for the commit",
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
          describe: "To get the config value for the given key",
        })
        .positional("key", {
          type: "string",
          default: false,
        })
        .positional("value", {
          type: "string",
        })
        .requiresArg("get");
    },
    config
  )
  .fail((msg, err, yargs) => {
    console.log(msg || err.message);
    console.log(yargs.help());
    process.exit(1);
  })
  .strict()
  .help()
  .alias("help", "h")
  .parse();
