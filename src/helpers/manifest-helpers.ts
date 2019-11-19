import {IManifest} from "@interfaces/i.manifest";
import chalk from "chalk";
import {readFileAsync} from "fs-helpers";
import {createLog} from "node-logger";

const log = createLog("Manifest Helpers");

export async function getManifest(path: string): Promise<IManifest[]> {
  log(chalk.cyan("Get Manifest"), path);
  const manifestStr = await readFileAsync(path, "utf8");
  return JSON.parse(manifestStr);
}
