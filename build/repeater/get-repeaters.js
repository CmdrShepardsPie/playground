"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const csv_helpers_1 = require("@helpers/csv-helpers");
const fs_helpers_1 = require("@helpers/fs-helpers");
const helpers_1 = require("@helpers/helpers");
const node_logger_1 = require("@helpers/node-logger");
const chalk_1 = require("chalk");
const scraper_1 = require("./modules/scraper");
const log = node_logger_1.createLog("Get Repeaters");
async function save(place, distance) {
    log(chalk_1.default.green("Save"), place, distance);
    const scraper = new scraper_1.default(place, distance);
    const result = await scraper.process();
    const columns = {};
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
                row[key] = "yes";
            }
        });
    });
    result.sort((a, b) => {
        const aMi = helpers_1.numberToString(a.Mi, 3, 3);
        const bMi = helpers_1.numberToString(b.Mi, 3, 3);
        const aName = a.Call;
        const bName = b.Call;
        const aFrequency = helpers_1.numberToString(a.Frequency, 3, 3);
        const bFrequency = helpers_1.numberToString(b.Frequency, 3, 3);
        const aStr = `${aMi} ${aName} ${aFrequency}`;
        const bStr = `${bMi} ${bName} ${bFrequency}`;
        return aStr > bStr ? 1 : aStr < bStr ? -1 : 0;
    });
    const parts = place.toString().split(`,`);
    const subPlace = `${(parts[1] || ".").trim()}/${parts[0].trim()}`;
    log(chalk_1.default.yellow("Results"), result.length, subPlace);
    await fs_helpers_1.writeToJsonAndCsv(`repeaters/data/${subPlace}`, result);
}
async function start() {
}
exports.default = (async () => {
    const countyFileData = await fs_helpers_1.readFileAsync("./repeater/Colorado_County_Seats.csv");
    const countyData = await csv_helpers_1.parseAsync(countyFileData, { columns: true });
    const cities = countyData.map((c) => `${c["County Seat"]}, CO`);
    while (cities.length) {
        const name = cities.shift();
        if (name) {
            await save(name, 200);
        }
    }
    await save("Socorro, NM", 200);
    await save("Moab, UT", 200);
})();
