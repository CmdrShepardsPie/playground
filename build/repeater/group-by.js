"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_helpers_1 = require("@helpers/fs-helpers");
const helpers_1 = require("@helpers/helpers");
const node_logger_1 = require("@helpers/node-logger");
const chalk_1 = require("chalk");
const log = node_logger_1.createLog("Get Repeaters");
async function doIt(file) {
    const fileData = await fs_helpers_1.readFileAsync(`./repeaters/data/CO/${file}.json`);
    const repeaters = JSON.parse(fileData.toString());
    const calls = {};
    repeaters.forEach((repeater) => {
        log(chalk_1.default.green("Repeater"), repeater.Call);
        if (!calls[repeater.Call]) {
            calls[repeater.Call] = [];
        }
        calls[repeater.Call].push(repeater);
    });
    const groups = Object.entries(calls);
    groups.sort((a, b) => {
        const aStr = `${helpers_1.numberToString(300 - a[1][0].Mi, 3, 3)} ${helpers_1.numberToString(a[1].length, 3, 3)} `;
        const bStr = `${helpers_1.numberToString(300 - b[1][0].Mi, 3, 3)} ${helpers_1.numberToString(b[1].length, 3, 3)} `;
        log(aStr, bStr);
        return aStr < bStr ? 1 : aStr > bStr ? -1 : 0;
    });
    groups.forEach((entry) => {
        const call = entry[0];
        const matches = entry[1];
        log(chalk_1.default.blue(call), matches.length);
    });
    const sorted = groups.reduce((prev, curr) => [...prev, ...curr[1]], []);
    await fs_helpers_1.writeToJsonAndCsv(`repeaters/groups/${file}`, sorted);
}
exports.default = doIt("Colorado Springs");
