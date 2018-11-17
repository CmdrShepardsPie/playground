import "module-alias/register";

import {readFileAsync, writeToJsonAndCsv} from "@helpers/fs-helpers";
import {numberToString} from "@helpers/helpers";
import {createLog} from "@helpers/node-logger";
import chalk from "chalk";
import {mapDir} from "./helper";
import {IRepeater} from "./i.repeater";

const log = createLog("Get Repeaters");

async function doIt(file: string) {
  const fileData = await readFileAsync(`./repeaters/data/CO/${file}.json`); // await getAllFilesFromDirectory("./repeaters/data/CO/", ".json") as IRepeater[];
  const repeaters = JSON.parse(fileData.toString()) as IRepeater[];
  const calls: { [index: string]: IRepeater[] } = {};
  repeaters.forEach((repeater) => {
    log(chalk.green("Repeater"), repeater.Call);
    // if (repeater.Call && repeater.Use === "OPEN" && repeater["Op Status"] === "On-Air" &&
    //   repeater.Frequency > 100 && repeater.Frequency < 500 &&
    //   !repeater["D-STAR Enabled"] && !repeater["DMR Enabled"] && !repeater["P25 Digital Enabled"] && !repeater["YSF Digital Enabled"] &&
    //   !/D\d/.test(repeater.Tone.toString())) {
    if (!calls[repeater.Call]) {
      calls[repeater.Call] = [];
    }
    calls[repeater.Call].push(repeater);
    // }
  });
  const groups = Object.entries(calls);
  groups.sort((a, b) => {
    // const aStr = `${numberToString(a[1].length, 3, 3)} ${numberToString(300 - a[1][0].Mi, 3, 3)}`;
    const aStr = `${numberToString(300 - a[1][0].Mi, 3, 3)} ${numberToString(a[1].length, 3, 3)} `;
    const bStr = `${numberToString(300 - b[1][0].Mi, 3, 3)} ${numberToString(b[1].length, 3, 3)} `;
    log(aStr, bStr);
    return aStr < bStr ? 1 : aStr > bStr ? -1 : 0;
  });

  groups.forEach((entry) => {
    // entry[1].sort((a, b) => {
    //   const aStr = `${mapDir(a.Dir.substr(-2))} ${numberToString(300 - a.Mi, 3, 3)}`;
    //   const bStr = `${mapDir(b.Dir.substr(-2))} ${numberToString(300 - b.Mi, 3, 3)}`;
    //   log(aStr, bStr);
    //   return aStr < bStr ? 1 : aStr > bStr ? -1 : 0;
    //   // return (mapDir(b.Dir.substr(-2)) * b.Mi) - (mapDir(a.Dir.substr(-2)) * a.Mi);
    // });
    const call = entry[0];
    const matches = entry[1];
    log(chalk.blue(call), matches.length);
  });
  const sorted = groups.reduce((prev, curr) => [...prev, ...curr[1]], [] as IRepeater[]);

  // sorted.forEach((s) => {
  //   const name = s.Location
  //     .split(/[ ,]/)
  //     .filter((g) => g)
  //     .map((g) => g[0].toUpperCase() + g.substr(1, 4).toLowerCase())
  //     .join("");
  //
  //   // s.Call = `${s.Call.substr(-3)} ${s.Dir.substr(-2)}`;
  //   // s.Call = `${s.Call.substr(-3)} ${name}`;
  //   s.Call = `${name}`;
  // });

  await writeToJsonAndCsv(`repeaters/groups/${file}`, sorted);
}

export default doIt("Colorado Springs");
