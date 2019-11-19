var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-logger", "chalk", "csv-helpers", "fs", "helpers", "path", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_logger_1 = require("node-logger");
    const chalk_1 = __importDefault(require("chalk"));
    const csv_helpers_1 = require("csv-helpers");
    const _fs = __importStar(require("fs"));
    const helpers_1 = require("helpers");
    const path = __importStar(require("path"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2ZzLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNkNBQXNDO0lBRXRDLGtEQUEwQjtJQUMxQiw2Q0FBNkQ7SUFDN0Qsd0NBQTBCO0lBQzFCLHFDQUFzQztJQUN0QywyQ0FBNkI7SUFDN0IsK0JBQStCO0lBRS9CLE1BQU0sR0FBRyxHQUFHLHVCQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFdkIsUUFBQSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsUUFBQSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsUUFBQSxhQUFhLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsUUFBQSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsUUFBQSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsUUFBQSxTQUFTLEdBQUcsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEMsS0FBSyxVQUFVLFFBQVEsQ0FBQyxRQUFnQjtRQUM3QyxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV4QyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsTUFBTTthQUNQO1lBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxDQUFDLE1BQU0sbUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO2dCQUNsQyxxQ0FBcUM7Z0JBQ3JDLElBQUk7b0JBQ0YsTUFBTSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QjtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBbEJELDRCQWtCQztJQUVNLEtBQUssVUFBVSxTQUFTLENBQUMsUUFBZ0I7UUFDOUMsNENBQTRDO1FBRTVDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwQyxNQUFNLEdBQUcsTUFBTSxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTTthQUNQO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBYkQsOEJBYUM7SUFFTSxLQUFLLFVBQVUsaUJBQWlCLENBQUMsUUFBZ0IsRUFBRSxRQUFhLEVBQUUsVUFBZSxRQUFRO1FBQzlGLHVEQUF1RDtRQUV2RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxRQUFRLEdBQUcsR0FBRyxRQUFRLE9BQU8sQ0FBQztRQUNwQyxNQUFNLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixNQUFNLHNCQUFjLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0Qyw4QkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyx1QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUMsdUJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sNEJBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLE9BQU8sR0FBRyxHQUFHLFFBQVEsTUFBTSxDQUFDO1FBQ2xDLE1BQU0sc0JBQWMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQWRELDhDQWNDO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLFFBQWdCO1FBQzdDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFOUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RCxPQUFPLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQ3JCLENBQUM7SUFORCx3Q0FNQztJQUVNLEtBQUssVUFBVSx3QkFBd0IsQ0FBSSxTQUFpQixFQUFFLFNBQWtCO1FBQ3JGLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXZFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixNQUFNLFNBQVMsR0FBRyxNQUFNLG9CQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLEtBQUssTUFBTSxRQUFRLElBQUksU0FBUyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtnQkFDekQscUVBQXFFO2dCQUNyRSxNQUFNLElBQUksR0FBRyxNQUFNLHFCQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxtRUFBbUU7YUFDcEU7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQWxCRCw0REFrQkM7O0FBRUQsZ0RBQWdEO0FBQ2hELHVEQUF1RDtBQUN2RCw4QkFBOEI7QUFDOUIsd0NBQXdDO0FBQ3hDLDZDQUE2QztBQUM3QyxnQ0FBZ0M7QUFDaEMsMkNBQTJDO0FBQzNDLG1DQUFtQztBQUNuQyxRQUFRO0FBQ1Isb0NBQW9DO0FBQ3BDLE1BQU07QUFDTiw0RUFBNEU7QUFDNUUsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwibm9kZS1sb2dnZXJcIjtcblxuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IHtmaWxsQXJyYXlPYmplY3RzLCBzdHJpbmdpZnlBc3luY30gZnJvbSBcImNzdi1oZWxwZXJzXCI7XG5pbXBvcnQgKiBhcyBfZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQge2ZsYXR0ZW5PYmplY3R9IGZyb20gXCJoZWxwZXJzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQge3Byb21pc2lmeX0gZnJvbSBcInV0aWxcIjtcblxuY29uc3QgbG9nID0gY3JlYXRlTG9nKFwiRlMgSGVscGVyc1wiKTtcblxuZXhwb3J0IGNvbnN0IGV4aXN0c0FzeW5jID0gcHJvbWlzaWZ5KF9mcy5leGlzdHMpO1xuZXhwb3J0IGNvbnN0IG1rZGlyQXN5bmMgPSBwcm9taXNpZnkoX2ZzLm1rZGlyKTtcbmV4cG9ydCBjb25zdCByZWFkRmlsZUFzeW5jID0gcHJvbWlzaWZ5KF9mcy5yZWFkRmlsZSk7XG5leHBvcnQgY29uc3QgcmVhZGRpckFzeW5jID0gcHJvbWlzaWZ5KF9mcy5yZWFkZGlyKTtcbmV4cG9ydCBjb25zdCB3cml0ZUZpbGVBc3luYyA9IHByb21pc2lmeShfZnMud3JpdGVGaWxlKTtcbmV4cG9ydCBjb25zdCBzdGF0QXN5bmMgPSBwcm9taXNpZnkoX2ZzLnN0YXQpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZURpcnMoZmlsZVBhdGg6IHN0cmluZykge1xuICBsb2coY2hhbGsuZ3JlZW4oXCJNYWtlIERpcnNcIiksIGZpbGVQYXRoKTtcblxuICBsZXQgdGVtcFBhdGggPSBgLmA7XG4gIGZvciAoY29uc3QgZGlyIG9mIGZpbGVQYXRoLnNwbGl0KC9bL1xcXFxdLykpIHtcbiAgICBpZiAoL1xcLi8udGVzdChkaXIpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGVtcFBhdGggPSBwYXRoLmpvaW4odGVtcFBhdGgsIGRpcik7XG4gICAgaWYgKCEoYXdhaXQgZXhpc3RzQXN5bmModGVtcFBhdGgpKSkge1xuICAgICAgLy8gbG9nKGNoYWxrLmJsdWUoXCJtYWtlXCIpLCB0ZW1wUGF0aCk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBta2RpckFzeW5jKHRlbXBQYXRoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nKGNoYWxrLnJlZChlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJFeGlzdHMoZmlsZVBhdGg6IHN0cmluZykge1xuICAvLyBsb2coY2hhbGsuZ3JlZW4oXCJEaXIgRXhpc3RzXCIpLCBmaWxlUGF0aCk7XG5cbiAgbGV0IHRlbXBQYXRoID0gYC5gO1xuICBsZXQgZXhpc3RzID0gdHJ1ZTtcbiAgZm9yIChjb25zdCBkaXIgb2YgZmlsZVBhdGguc3BsaXQoL1svXFxcXF0vKSkge1xuICAgIHRlbXBQYXRoID0gcGF0aC5qb2luKHRlbXBQYXRoLCBkaXIpO1xuICAgIGV4aXN0cyA9IGF3YWl0IGV4aXN0c0FzeW5jKHRlbXBQYXRoKTtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBleGlzdHM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZVRvSnNvbkFuZENzdihmaWxlbmFtZTogc3RyaW5nLCBqc29uRGF0YTogYW55LCBjc3ZEYXRhOiBhbnkgPSBqc29uRGF0YSkge1xuICAvLyBsb2coY2hhbGsuZ3JlZW4oXCJXcml0ZSB0byBKc29uIGFuZCBDU1ZcIiksIGZpbGVuYW1lKTtcblxuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoanNvbkRhdGEsIG51bGwsIDIpO1xuICBjb25zdCBqc29uTmFtZSA9IGAke2ZpbGVuYW1lfS5qc29uYDtcbiAgYXdhaXQgbWFrZURpcnMoanNvbk5hbWUpO1xuICBhd2FpdCB3cml0ZUZpbGVBc3luYyhqc29uTmFtZSwganNvblN0cmluZyk7XG5cbiAgY29uc3QgY3N2UHJlcCA9IEFycmF5LmlzQXJyYXkoY3N2RGF0YSkgP1xuICAgIGZpbGxBcnJheU9iamVjdHMoY3N2RGF0YS5tYXAoKHI6IGFueSkgPT4gZmxhdHRlbk9iamVjdChyKSkpIDpcbiAgICBbZmxhdHRlbk9iamVjdChjc3ZEYXRhKV07XG4gIGNvbnN0IGNzdlN0cmluZyA9IGF3YWl0IHN0cmluZ2lmeUFzeW5jKGNzdlByZXAsIHtoZWFkZXI6IHRydWV9KTtcbiAgY29uc3QgY3N2TmFtZSA9IGAke2ZpbGVuYW1lfS5jc3ZgO1xuICBhd2FpdCB3cml0ZUZpbGVBc3luYyhjc3ZOYW1lLCBjc3ZTdHJpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRFeHRlbnNpb24oZmlsZW5hbWU6IHN0cmluZykge1xuICBsb2coY2hhbGsuZ3JlZW4oXCJTcGxpdCBFeHRlbnNpb25cIiksIGZpbGVuYW1lKTtcblxuICBjb25zdCBuYW1lID0gZmlsZW5hbWUuc3Vic3RyaW5nKDAsIGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gIGNvbnN0IGV4dCA9IGZpbGVuYW1lLnN1YnN0cmluZyhmaWxlbmFtZS5sYXN0SW5kZXhPZihcIi5cIikgKyAxKTtcbiAgcmV0dXJuIHtuYW1lLCBleHR9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsRmlsZXNGcm9tRGlyZWN0b3J5PFQ+KGRpcmVjdG9yeTogc3RyaW5nLCBleHRlbnNpb24/OiBzdHJpbmcpOiBQcm9taXNlPFRbXT4ge1xuICBsb2coY2hhbGsuZ3JlZW4oXCJHZXQgQWxsIEZpbGVzIGZyb20gRGlyZWN0b3J5XCIpLCBkaXJlY3RvcnksIGV4dGVuc2lvbik7XG5cbiAgY29uc3QgZmlsZXMgPSBbXTtcbiAgY29uc3QgZmlsZU5hbWVzID0gYXdhaXQgcmVhZGRpckFzeW5jKGRpcmVjdG9yeSk7XG4gIGNvbnN0IGV4dE1hdGNoID0gbmV3IFJlZ0V4cChgJHtleHRlbnNpb259JGApO1xuICBmb3IgKGNvbnN0IGZpbGVOYW1lIG9mIGZpbGVOYW1lcykge1xuICAgIGNvbnN0IGZpbGUgPSBwYXRoLmpvaW4oZGlyZWN0b3J5LCBmaWxlTmFtZSk7XG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IHN0YXRBc3luYyhmaWxlKTtcbiAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiAoIWV4dGVuc2lvbiB8fCBmaWxlLm1hdGNoKGV4dE1hdGNoKSkpIHtcbiAgICAgIC8vIGxvZyhcIkdldCBBbGwgRmlsZXMgRnJvbSBEaXJlY3RvcnlcIiwgY2hhbGsuZ3JlZW4oXCJyZWFkaW5nXCIpLCBmaWxlKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZWFkRmlsZUFzeW5jKGZpbGUsIFwidXRmOFwiKTtcbiAgICAgIGZpbGVzLnB1c2goSlNPTi5wYXJzZShkYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGxvZyhcIkdldCBBbGwgRmlsZXMgRnJvbSBEaXJlY3RvcnlcIiwgY2hhbGsucmVkKFwic2tpcHBlZFwiKSwgZmlsZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmaWxlcztcbn1cblxuLy8gTm90IHVzZWQsIHNvIGNvbW1lbnRlZCBvdXQgdG8gYXZvaWQgY29uZnVzaW9uXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZHVtcCh1cmw6IHN0cmluZywgZGF0YTogYW55KSB7XG4vLyAgIGNvbnNvbGUubG9nKFwiZHVtcFwiLCB1cmwpO1xuLy8gICBjb25zdCBwYXJ0cyA9IHVybC5zcGxpdCgvW1xcLz86XS9nKTtcbi8vICAgbGV0IHBhdGggPSBgLi4vc3BlY3RydW0tZ3VpZGUtdHdjLWR1bXBgO1xuLy8gICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcbi8vICAgICBpZiAoIShhd2FpdCBmcy5leGlzdHNBc3luYyhwYXRoKSkpIHtcbi8vICAgICAgIGF3YWl0IGZzLm1rZGlyQXN5bmMocGF0aCk7XG4vLyAgICAgfVxuLy8gICAgIHBhdGggPSBwYXRoLmpvaW4ocGF0aCwgcGFydCk7XG4vLyAgIH1cbi8vICAgYXdhaXQgZnMud3JpdGVGaWxlQXN5bmMoYCR7cGF0aH0uanNvbmAsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcbi8vIH1cbiJdfQ==