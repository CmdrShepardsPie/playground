import "module-alias/register";

import {parseAsync} from "@helpers/csv-helpers";
import {readFileAsync, writeToJsonAndCsv} from "@helpers/fs-helpers";
import {numberToString} from "@helpers/helpers";
import {createLog} from "@helpers/node-logger";
import chalk from "chalk";
import Scraper from "./modules/scraper";

const log = createLog("Get Repeaters");

async function save(place: string | number, distance: number) {
  log(chalk.green("Save"), place, distance);

  const scraper = new Scraper(place, distance);

  const result = await scraper.process();

  const columns: any = {};
  result.forEach((row) => {
    Object.entries(row).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      if (!columns[key]) {
        columns[key] = [];
      }
      if (columns[key].indexOf(value) === -1) {
        columns[key].push(value);
      }
    });
  });

  result.forEach((row) => {
    Object.entries(row).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      if (columns[key].length === 1 && columns[key][0] === "" && value === "") {
        // @ts-ignore
        row[key] = "yes";
      }
    });
  });

  result.sort((a, b) => {
    const aMi = numberToString(a.Mi, 3, 3);
    const bMi = numberToString(b.Mi, 3, 3);
    const aName = a.Call;
    const bName = b.Call;
    const aFrequency = numberToString(a.Frequency, 3, 3);
    const bFrequency = numberToString(b.Frequency, 3, 3);
    const aStr = `${aMi} ${aName} ${aFrequency}`;
    const bStr = `${bMi} ${bName} ${bFrequency}`;
    return aStr > bStr ? 1 : aStr < bStr ? -1 : 0;
  });
  // result.sort((a: any, b: any) => {(a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
  // result.sort((a: any, b: any) => (a.Frequency - b.Frequency));
  // result.sort((a: any, b: any) => (a.Mi - b.Mi));

  // console.log(place, distance, result.length);

  const parts = place.toString().split(`,`);
  const subPlace = `${(parts[1] || ".").trim()}/${parts[0].trim()}`;

  log(chalk.yellow("Results"), result.length, subPlace);

  await writeToJsonAndCsv(`repeaters/data/${subPlace}`, result);
}

async function start() {
}
export default (async () => {
  const countyFileData = await readFileAsync("./repeater/Colorado_County_Seats.csv");
  const countyData = await parseAsync(countyFileData, { columns: true });
  const cities: string[] = countyData.map((c: any) => `${c["County Seat"]}, CO`);
  // cities.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
  // return;
  while (cities.length) {
    const name = cities.shift();
    if (name) {
      await save(name, 200);
    }
  }
  await save("Socorro, NM", 200);
  await save("Moab, UT", 200);
})();

// export default start();
