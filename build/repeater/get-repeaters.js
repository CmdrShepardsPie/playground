"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_helpers_1 = require("@helpers/fs-helpers");
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
    result.sort((a, b) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
    result.sort((a, b) => (a.Frequency - b.Frequency));
    result.sort((a, b) => (a.Mi - b.Mi));
    const parts = place.toString().split(`,`);
    const subPlace = `${(parts[1] || ".").trim()}/${parts[0].trim()}`;
    log(chalk_1.default.yellow("Results"), result.length, subPlace);
    await fs_helpers_1.writeToJsonAndCsv(`repeaters/data/${subPlace}`, result);
}
async function start() {
    await save("Socorro, NM", 200);
    await save("Moab, UT", 200);
}
exports.default = start();
