(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-logger", "csv-helpers", "helpers", "chalk", "fs", "path", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_logger_1 = require("node-logger");
    const csv_helpers_1 = require("csv-helpers");
    const helpers_1 = require("helpers");
    const chalk_1 = require("chalk");
    const _fs = require("fs");
    const path = require("path");
    const util_1 = require("util");
    const log = node_logger_1.createLog("FS Helpers");
    exports.existsAsync = util_1.promisify(_fs.exists);
    exports.mkdirAsync = util_1.promisify(_fs.mkdir);
    exports.readFileAsync = util_1.promisify(_fs.readFile);
    exports.readdirAsync = util_1.promisify(_fs.readdir);
    exports.writeFileAsync = util_1.promisify(_fs.writeFile);
    exports.statAsync = util_1.promisify(_fs.stat);
    async function makeDirs(filePath) {
        log(chalk_1.default.green("Make Dirs"), filePath);
        let tempPath = `.`;
        for (const dir of filePath.split(/[/\\]/)) {
            if (/\./.test(dir)) {
                break;
            }
            tempPath = path.join(tempPath, dir);
            if (!(await exports.existsAsync(tempPath))) {
                // log(chalk.blue("make"), tempPath);
                try {
                    await exports.mkdirAsync(tempPath);
                }
                catch (e) {
                    log(chalk_1.default.red(e));
                }
            }
        }
    }
    exports.makeDirs = makeDirs;
    async function dirExists(filePath) {
        // log(chalk.green("Dir Exists"), filePath);
        let tempPath = `.`;
        let exists = true;
        for (const dir of filePath.split(/[/\\]/)) {
            tempPath = path.join(tempPath, dir);
            exists = await exports.existsAsync(tempPath);
            if (!exists) {
                break;
            }
        }
        return exists;
    }
    exports.dirExists = dirExists;
    async function writeToJsonAndCsv(filename, jsonData, csvData = jsonData) {
        // log(chalk.green("Write to Json and CSV"), filename);
        const jsonString = JSON.stringify(jsonData, null, 2);
        const jsonName = `${filename}.json`;
        await makeDirs(jsonName);
        await exports.writeFileAsync(jsonName, jsonString);
        const csvPrep = Array.isArray(csvData) ?
            csv_helpers_1.fillArrayObjects(csvData.map((r) => helpers_1.flattenObject(r))) :
            [helpers_1.flattenObject(csvData)];
        const csvString = await csv_helpers_1.stringifyAsync(csvPrep, { header: true });
        const csvName = `${filename}.csv`;
        await exports.writeFileAsync(csvName, csvString);
    }
    exports.writeToJsonAndCsv = writeToJsonAndCsv;
    function splitExtension(filename) {
        log(chalk_1.default.green("Split Extension"), filename);
        const name = filename.substring(0, filename.lastIndexOf("."));
        const ext = filename.substring(filename.lastIndexOf(".") + 1);
        return { name, ext };
    }
    exports.splitExtension = splitExtension;
    async function getAllFilesFromDirectory(directory, extension) {
        log(chalk_1.default.green("Get All Files from Directory"), directory, extension);
        const files = [];
        const fileNames = await exports.readdirAsync(directory);
        const extMatch = new RegExp(`${extension}$`);
        for (const fileName of fileNames) {
            const file = path.join(directory, fileName);
            const stat = await exports.statAsync(file);
            if (stat.isFile() && (!extension || file.match(extMatch))) {
                // log("Get All Files From Directory", chalk.green("reading"), file);
                const data = await exports.readFileAsync(file, "utf8");
                files.push(JSON.parse(data));
            }
            else {
                // log("Get All Files From Directory", chalk.red("skipped"), file);
            }
        }
        return files;
    }
    exports.getAllFilesFromDirectory = getAllFilesFromDirectory;
});
// Not used, so commented out to avoid confusion
// export async function dump(url: string, data: any) {
//   console.log("dump", url);
//   const parts = url.split(/[\/?:]/g);
//   let path = `../spectrum-guide-twc-dump`;
//   for (const part of parts) {
//     if (!(await fs.existsAsync(path))) {
//       await fs.mkdirAsync(path);
//     }
//     path = path.join(path, part);
//   }
//   await fs.writeFileAsync(`${path}.json`, JSON.stringify(data, null, 2));
// }
