var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
    exports.__esModule = true;
    var node_logger_1 = require("node-logger");
    var csv_helpers_1 = require("csv-helpers");
    var helpers_1 = require("helpers");
    var chalk_1 = require("chalk");
    var _fs = require("fs");
    var path = require("path");
    var util_1 = require("util");
    var log = node_logger_1.createLog("FS Helpers");
    exports.existsAsync = util_1.promisify(_fs.exists);
    exports.mkdirAsync = util_1.promisify(_fs.mkdir);
    exports.readFileAsync = util_1.promisify(_fs.readFile);
    exports.readdirAsync = util_1.promisify(_fs.readdir);
    exports.writeFileAsync = util_1.promisify(_fs.writeFile);
    exports.statAsync = util_1.promisify(_fs.stat);
    function makeDirs(filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, tempPath, _b, _c, dir, e_2, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        log(chalk_1["default"].green("Make Dirs"), filePath);
                        tempPath = ".";
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, 10, 11]);
                        _b = __values(filePath.split(/[/\\]/)), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 8];
                        dir = _c.value;
                        if (/\./.test(dir)) {
                            return [3 /*break*/, 8];
                        }
                        tempPath = path.join(tempPath, dir);
                        return [4 /*yield*/, exports.existsAsync(tempPath)];
                    case 3:
                        if (!!(_d.sent())) return [3 /*break*/, 7];
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, exports.mkdirAsync(tempPath)];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _d.sent();
                        log(chalk_1["default"].red(e_2));
                        return [3 /*break*/, 7];
                    case 7:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    }
    exports.makeDirs = makeDirs;
    function dirExists(filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, tempPath, exists, _b, _c, dir, e_3_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tempPath = ".";
                        exists = true;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _b = __values(filePath.split(/[/\\]/)), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 5];
                        dir = _c.value;
                        tempPath = path.join(tempPath, dir);
                        return [4 /*yield*/, exports.existsAsync(tempPath)];
                    case 3:
                        exists = _d.sent();
                        if (!exists) {
                            return [3 /*break*/, 5];
                        }
                        _d.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, exists];
                }
            });
        });
    }
    exports.dirExists = dirExists;
    function writeToJsonAndCsv(filename, jsonData, csvData) {
        if (csvData === void 0) { csvData = jsonData; }
        return __awaiter(this, void 0, void 0, function () {
            var jsonString, jsonName, csvPrep, csvString, csvName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonString = JSON.stringify(jsonData, null, 2);
                        jsonName = filename + ".json";
                        return [4 /*yield*/, makeDirs(jsonName)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, exports.writeFileAsync(jsonName, jsonString)];
                    case 2:
                        _a.sent();
                        csvPrep = Array.isArray(csvData) ?
                            csv_helpers_1.fillArrayObjects(csvData.map(function (r) { return helpers_1.flattenObject(r); })) :
                            [helpers_1.flattenObject(csvData)];
                        return [4 /*yield*/, csv_helpers_1.stringifyAsync(csvPrep, { header: true })];
                    case 3:
                        csvString = _a.sent();
                        csvName = filename + ".csv";
                        return [4 /*yield*/, exports.writeFileAsync(csvName, csvString)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.writeToJsonAndCsv = writeToJsonAndCsv;
    function splitExtension(filename) {
        log(chalk_1["default"].green("Split Extension"), filename);
        var name = filename.substring(0, filename.lastIndexOf("."));
        var ext = filename.substring(filename.lastIndexOf(".") + 1);
        return { name: name, ext: ext };
    }
    exports.splitExtension = splitExtension;
    function getAllFilesFromDirectory(directory, extension) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, files, fileNames, extMatch, fileNames_1, fileNames_1_1, fileName, file, stat, data, e_4_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(chalk_1["default"].green("Get All Files from Directory"), directory, extension);
                        files = [];
                        return [4 /*yield*/, exports.readdirAsync(directory)];
                    case 1:
                        fileNames = _b.sent();
                        extMatch = new RegExp(extension + "$");
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 9, 10]);
                        fileNames_1 = __values(fileNames), fileNames_1_1 = fileNames_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!fileNames_1_1.done) return [3 /*break*/, 7];
                        fileName = fileNames_1_1.value;
                        file = path.join(directory, fileName);
                        return [4 /*yield*/, exports.statAsync(file)];
                    case 4:
                        stat = _b.sent();
                        if (!(stat.isFile() && (!extension || file.match(extMatch)))) return [3 /*break*/, 6];
                        return [4 /*yield*/, exports.readFileAsync(file, "utf8")];
                    case 5:
                        data = _b.sent();
                        files.push(JSON.parse(data));
                        return [3 /*break*/, 6];
                    case 6:
                        fileNames_1_1 = fileNames_1.next();
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (fileNames_1_1 && !fileNames_1_1.done && (_a = fileNames_1["return"])) _a.call(fileNames_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, files];
                }
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2ZzLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwyQ0FBc0M7SUFFdEMsMkNBQTZEO0lBQzdELG1DQUFzQztJQUN0QywrQkFBMEI7SUFDMUIsd0JBQTBCO0lBQzFCLDJCQUE2QjtJQUM3Qiw2QkFBaUM7SUFFakMsSUFBTSxHQUFHLEdBQUcsdUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV2QixRQUFBLFdBQVcsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxRQUFBLFVBQVUsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxRQUFBLGFBQWEsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxRQUFBLFlBQVksR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxRQUFBLGNBQWMsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxRQUFBLFNBQVMsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU3QyxTQUFzQixRQUFRLENBQUMsUUFBZ0I7Ozs7Ozt3QkFDN0MsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUVwQyxRQUFRLEdBQUcsR0FBRyxDQUFDOzs7O3dCQUNELEtBQUEsU0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O3dCQUE5QixHQUFHO3dCQUNaLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs0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c0NvbnRlbnQiOlsiaW1wb3J0IHtjcmVhdGVMb2d9IGZyb20gXCJub2RlLWxvZ2dlclwiO1xuXG5pbXBvcnQge2ZpbGxBcnJheU9iamVjdHMsIHN0cmluZ2lmeUFzeW5jfSBmcm9tIFwiY3N2LWhlbHBlcnNcIjtcbmltcG9ydCB7ZmxhdHRlbk9iamVjdH0gZnJvbSBcImhlbHBlcnNcIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCAqIGFzIF9mcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gXCJ1dGlsXCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkZTIEhlbHBlcnNcIik7XG5cbmV4cG9ydCBjb25zdCBleGlzdHNBc3luYyA9IHByb21pc2lmeShfZnMuZXhpc3RzKTtcbmV4cG9ydCBjb25zdCBta2RpckFzeW5jID0gcHJvbWlzaWZ5KF9mcy5ta2Rpcik7XG5leHBvcnQgY29uc3QgcmVhZEZpbGVBc3luYyA9IHByb21pc2lmeShfZnMucmVhZEZpbGUpO1xuZXhwb3J0IGNvbnN0IHJlYWRkaXJBc3luYyA9IHByb21pc2lmeShfZnMucmVhZGRpcik7XG5leHBvcnQgY29uc3Qgd3JpdGVGaWxlQXN5bmMgPSBwcm9taXNpZnkoX2ZzLndyaXRlRmlsZSk7XG5leHBvcnQgY29uc3Qgc3RhdEFzeW5jID0gcHJvbWlzaWZ5KF9mcy5zdGF0KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1ha2VEaXJzKGZpbGVQYXRoOiBzdHJpbmcpIHtcbiAgbG9nKGNoYWxrLmdyZWVuKFwiTWFrZSBEaXJzXCIpLCBmaWxlUGF0aCk7XG5cbiAgbGV0IHRlbXBQYXRoID0gYC5gO1xuICBmb3IgKGNvbnN0IGRpciBvZiBmaWxlUGF0aC5zcGxpdCgvWy9cXFxcXS8pKSB7XG4gICAgaWYgKC9cXC4vLnRlc3QoZGlyKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRlbXBQYXRoID0gcGF0aC5qb2luKHRlbXBQYXRoLCBkaXIpO1xuICAgIGlmICghKGF3YWl0IGV4aXN0c0FzeW5jKHRlbXBQYXRoKSkpIHtcbiAgICAgIC8vIGxvZyhjaGFsay5ibHVlKFwibWFrZVwiKSwgdGVtcFBhdGgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbWtkaXJBc3luYyh0ZW1wUGF0aCk7XG4gICAgICB9IGNhdGNoIChlKSB7IGxvZyhjaGFsay5yZWQoZSkpOyB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXJFeGlzdHMoZmlsZVBhdGg6IHN0cmluZykge1xuICAvLyBsb2coY2hhbGsuZ3JlZW4oXCJEaXIgRXhpc3RzXCIpLCBmaWxlUGF0aCk7XG5cbiAgbGV0IHRlbXBQYXRoID0gYC5gO1xuICBsZXQgZXhpc3RzID0gdHJ1ZTtcbiAgZm9yIChjb25zdCBkaXIgb2YgZmlsZVBhdGguc3BsaXQoL1svXFxcXF0vKSkge1xuICAgIHRlbXBQYXRoID0gcGF0aC5qb2luKHRlbXBQYXRoLCBkaXIpO1xuICAgIGV4aXN0cyA9IGF3YWl0IGV4aXN0c0FzeW5jKHRlbXBQYXRoKTtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBleGlzdHM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZVRvSnNvbkFuZENzdihmaWxlbmFtZTogc3RyaW5nLCBqc29uRGF0YTogYW55LCBjc3ZEYXRhOiBhbnkgPSBqc29uRGF0YSkge1xuICAvLyBsb2coY2hhbGsuZ3JlZW4oXCJXcml0ZSB0byBKc29uIGFuZCBDU1ZcIiksIGZpbGVuYW1lKTtcblxuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoanNvbkRhdGEsIG51bGwsIDIpO1xuICBjb25zdCBqc29uTmFtZSA9IGAke2ZpbGVuYW1lfS5qc29uYDtcbiAgYXdhaXQgbWFrZURpcnMoanNvbk5hbWUpO1xuICBhd2FpdCB3cml0ZUZpbGVBc3luYyhqc29uTmFtZSwganNvblN0cmluZyk7XG5cbiAgY29uc3QgY3N2UHJlcCA9IEFycmF5LmlzQXJyYXkoY3N2RGF0YSkgP1xuICAgIGZpbGxBcnJheU9iamVjdHMoY3N2RGF0YS5tYXAoKHI6IGFueSkgPT4gZmxhdHRlbk9iamVjdChyKSkpIDpcbiAgICBbZmxhdHRlbk9iamVjdChjc3ZEYXRhKV07XG4gIGNvbnN0IGNzdlN0cmluZyA9IGF3YWl0IHN0cmluZ2lmeUFzeW5jKGNzdlByZXAsIHtoZWFkZXI6IHRydWV9KTtcbiAgY29uc3QgY3N2TmFtZSA9IGAke2ZpbGVuYW1lfS5jc3ZgO1xuICBhd2FpdCB3cml0ZUZpbGVBc3luYyhjc3ZOYW1lLCBjc3ZTdHJpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRFeHRlbnNpb24oZmlsZW5hbWU6IHN0cmluZykge1xuICBsb2coY2hhbGsuZ3JlZW4oXCJTcGxpdCBFeHRlbnNpb25cIiksIGZpbGVuYW1lKTtcblxuICBjb25zdCBuYW1lID0gZmlsZW5hbWUuc3Vic3RyaW5nKDAsIGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiLlwiKSk7XG4gIGNvbnN0IGV4dCA9IGZpbGVuYW1lLnN1YnN0cmluZyhmaWxlbmFtZS5sYXN0SW5kZXhPZihcIi5cIikgKyAxKTtcbiAgcmV0dXJuIHsgbmFtZSwgZXh0IH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxGaWxlc0Zyb21EaXJlY3Rvcnk8VD4oZGlyZWN0b3J5OiBzdHJpbmcsIGV4dGVuc2lvbj86IHN0cmluZyk6IFByb21pc2U8VFtdPiB7XG4gIGxvZyhjaGFsay5ncmVlbihcIkdldCBBbGwgRmlsZXMgZnJvbSBEaXJlY3RvcnlcIiksIGRpcmVjdG9yeSwgZXh0ZW5zaW9uKTtcblxuICBjb25zdCBmaWxlcyA9IFtdO1xuICBjb25zdCBmaWxlTmFtZXMgPSBhd2FpdCByZWFkZGlyQXN5bmMoZGlyZWN0b3J5KTtcbiAgY29uc3QgZXh0TWF0Y2ggPSBuZXcgUmVnRXhwKGAke2V4dGVuc2lvbn0kYCk7XG4gIGZvciAoY29uc3QgZmlsZU5hbWUgb2YgZmlsZU5hbWVzKSB7XG4gICAgY29uc3QgZmlsZSA9IHBhdGguam9pbihkaXJlY3RvcnksIGZpbGVOYW1lKTtcbiAgICBjb25zdCBzdGF0ID0gYXdhaXQgc3RhdEFzeW5jKGZpbGUpO1xuICAgIGlmIChzdGF0LmlzRmlsZSgpICYmICghZXh0ZW5zaW9uIHx8IGZpbGUubWF0Y2goZXh0TWF0Y2gpKSkge1xuICAgICAgLy8gbG9nKFwiR2V0IEFsbCBGaWxlcyBGcm9tIERpcmVjdG9yeVwiLCBjaGFsay5ncmVlbihcInJlYWRpbmdcIiksIGZpbGUpO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlYWRGaWxlQXN5bmMoZmlsZSwgXCJ1dGY4XCIpO1xuICAgICAgZmlsZXMucHVzaChKU09OLnBhcnNlKGRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbG9nKFwiR2V0IEFsbCBGaWxlcyBGcm9tIERpcmVjdG9yeVwiLCBjaGFsay5yZWQoXCJza2lwcGVkXCIpLCBmaWxlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZpbGVzO1xufVxuXG4vLyBOb3QgdXNlZCwgc28gY29tbWVudGVkIG91dCB0byBhdm9pZCBjb25mdXNpb25cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBkdW1wKHVybDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbi8vICAgY29uc29sZS5sb2coXCJkdW1wXCIsIHVybCk7XG4vLyAgIGNvbnN0IHBhcnRzID0gdXJsLnNwbGl0KC9bXFwvPzpdL2cpO1xuLy8gICBsZXQgcGF0aCA9IGAuLi9zcGVjdHJ1bS1ndWlkZS10d2MtZHVtcGA7XG4vLyAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJ0cykge1xuLy8gICAgIGlmICghKGF3YWl0IGZzLmV4aXN0c0FzeW5jKHBhdGgpKSkge1xuLy8gICAgICAgYXdhaXQgZnMubWtkaXJBc3luYyhwYXRoKTtcbi8vICAgICB9XG4vLyAgICAgcGF0aCA9IHBhdGguam9pbihwYXRoLCBwYXJ0KTtcbi8vICAgfVxuLy8gICBhd2FpdCBmcy53cml0ZUZpbGVBc3luYyhgJHtwYXRofS5qc29uYCwgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpO1xuLy8gfVxuIl19