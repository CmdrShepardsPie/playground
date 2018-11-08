import "module-alias/register";

import {fillArrayObjects, parseAsync, stringifyAsync} from "@helpers/csv-helpers";
import {makeDirs, readFileAsync, writeFileAsync, writeToJsonAndCsv} from "@helpers/fs-helpers";
import {createLog} from "@helpers/node-logger";
import chalk from "chalk";
import Scraper from "./scraper";

const log = createLog("Get Repeaters");

export async function save(place: string | number, distance: number) {
  log(chalk.green("Save"), place, distance);

  const scraper = new Scraper(place, distance);

  const result = await scraper.process();

  result.sort((a: any, b: any) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
  result.sort((a: any, b: any) => (a.Frequency - b.Frequency));
  result.sort((a: any, b: any) => (a.Mi - b.Mi));

  // console.log(place, distance, result.length);

  const parts = place.toString().split(`,`);
  const subPlace = `${(parts[1] || ".").trim()}/${parts[0].trim()}`;

  log(chalk.yellow("Results"), result.length, subPlace);

  await writeToJsonAndCsv(`repeaters/data/${subPlace}`, result);
}

export default (async () => {
  const countyFileData = await readFileAsync("./repeater/Colorado_County_Seats.csv");
  const countyData = await parseAsync(countyFileData, { columns: true });
  const cities: string[] = countyData.map((c: any) => `${c["County Seat"]}, CO`);
  // return;
  while (cities.length) {
    const name = cities.shift();
    if (name) {
      await save(name, 200);
    }
  }
})();
