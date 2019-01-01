"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_helpers_1 = require("@helpers/fs-helpers");
const helpers_1 = require("@helpers/helpers");
const node_logger_1 = require("@helpers/node-logger");
const chalk_1 = require("chalk");
const log = node_logger_1.createLog("Group By");
async function doIt(groupBy, inFileName, outFileName) {
    const fileData = await fs_helpers_1.readFileAsync(inFileName);
    const repeaters = JSON.parse(fileData.toString());
    log(chalk_1.default.green("Process"), chalk_1.default.blue("Group"), groupBy, chalk_1.default.yellow("In"), inFileName, chalk_1.default.cyan("Out"), outFileName);
    const grouped = group(groupBy, repeaters);
    await fs_helpers_1.writeToJsonAndCsv(outFileName, grouped);
}
function group(groupBy, repeaters) {
    const keyedGroups = {};
    repeaters.forEach((repeater) => {
        const keyVal = repeater[groupBy];
        if (keyVal !== undefined && keyVal !== null) {
            if (!keyedGroups[keyVal]) {
                keyedGroups[keyVal] = [];
            }
            keyedGroups[keyVal].push(repeater);
        }
    });
    const sorting = Object.entries(keyedGroups);
    sorting.sort((a, b) => {
        const aMi = helpers_1.numberToString(a[1][0].Mi, 3, 3);
        const bMi = helpers_1.numberToString(b[1][0].Mi, 3, 3);
        const aNumRepeaters = helpers_1.numberToString(100 - a[1].length, 3, 3);
        const bNumRepeaters = helpers_1.numberToString(100 - b[1].length, 3, 3);
        const aGroupName = a[0];
        const bGroupName = b[0];
        const aFrequency = helpers_1.numberToString(a[1][0].Frequency, 3, 3);
        const bFrequency = helpers_1.numberToString(b[1][0].Frequency, 3, 3);
        const aStr = `${aMi} ${aNumRepeaters} ${aGroupName} ${aFrequency}`;
        const bStr = `${bMi} ${bNumRepeaters} ${bGroupName} ${bFrequency}`;
        return aStr > bStr ? 1 : aStr < bStr ? -1 : 0;
    });
    return sorting.reduce((prev, curr) => [...prev, ...curr[1]], []);
}
async function start() {
    const coFiles = (await fs_helpers_1.readdirAsync("./repeaters/data/CO/")).map((f) => `CO/${f}`);
    const utFiles = (await fs_helpers_1.readdirAsync("./repeaters/data/UT/")).map((f) => `UT/${f}`);
    const nmFiles = (await fs_helpers_1.readdirAsync("./repeaters/data/NM/")).map((f) => `NM/${f}`);
    const allFiles = [...coFiles, ...utFiles, ...nmFiles].filter((f) => /\.json$/.test(f)).map((f) => f.replace(".json", ""));
    for (const file of allFiles) {
        await doIt("Call", `repeaters/data/${file}.json`, `repeaters/groups/${file} - Call`);
    }
}
exports.default = start();
