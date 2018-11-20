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
        const aMi = helpers_1.numberToString(300 - a[1][0].Mi, 3, 3);
        const bMi = helpers_1.numberToString(300 - b[1][0].Mi, 3, 3);
        const aNumRepeaters = helpers_1.numberToString(a[1].length, 3, 3);
        const bNumRepeaters = helpers_1.numberToString(b[1].length, 3, 3);
        const aGroupName = a[0];
        const bGroupName = b[0];
        const aStr = `${aMi} ${aNumRepeaters} ${aGroupName}`;
        const bStr = `${bMi} ${bNumRepeaters} ${bGroupName}`;
        return aStr < bStr ? 1 : aStr > bStr ? -1 : 0;
    });
    return sorting.reduce((prev, curr) => [...prev, ...curr[1]], []);
}
async function start() {
    await doIt("Call", "repeaters/data/CO/Colorado Springs.json", "repeaters/groups/CO/Colorado Springs - Call");
    await doIt("Call", "repeaters/data/CO/Colorado Springs.json", "repeaters/groups/CO/Colorado Springs - Call");
}
exports.default = start();
