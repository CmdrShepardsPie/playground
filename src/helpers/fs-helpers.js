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
            var tempPath, _i, _a, dir, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        log(chalk_1.default.green("Make Dirs"), filePath);
                        tempPath = ".";
                        _i = 0, _a = filePath.split(/[/\\]/);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        dir = _a[_i];
                        if (/\./.test(dir)) {
                            return [3 /*break*/, 7];
                        }
                        tempPath = path.join(tempPath, dir);
                        return [4 /*yield*/, exports.existsAsync(tempPath)];
                    case 2:
                        if (!!(_b.sent())) return [3 /*break*/, 6];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, exports.mkdirAsync(tempPath)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        log(chalk_1.default.red(e_1));
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    exports.makeDirs = makeDirs;
    function dirExists(filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var tempPath, exists, _i, _a, dir;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tempPath = ".";
                        exists = true;
                        _i = 0, _a = filePath.split(/[/\\]/);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        dir = _a[_i];
                        tempPath = path.join(tempPath, dir);
                        return [4 /*yield*/, exports.existsAsync(tempPath)];
                    case 2:
                        exists = _b.sent();
                        if (!exists) {
                            return [3 /*break*/, 4];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, exists];
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
        log(chalk_1.default.green("Split Extension"), filename);
        var name = filename.substring(0, filename.lastIndexOf("."));
        var ext = filename.substring(filename.lastIndexOf(".") + 1);
        return { name: name, ext: ext };
    }
    exports.splitExtension = splitExtension;
    function getAllFilesFromDirectory(directory, extension) {
        return __awaiter(this, void 0, void 0, function () {
            var files, fileNames, extMatch, _i, fileNames_1, fileName, file, stat, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log(chalk_1.default.green("Get All Files from Directory"), directory, extension);
                        files = [];
                        return [4 /*yield*/, exports.readdirAsync(directory)];
                    case 1:
                        fileNames = _a.sent();
                        extMatch = new RegExp(extension + "$");
                        _i = 0, fileNames_1 = fileNames;
                        _a.label = 2;
                    case 2:
                        if (!(_i < fileNames_1.length)) return [3 /*break*/, 6];
                        fileName = fileNames_1[_i];
                        file = path.join(directory, fileName);
                        return [4 /*yield*/, exports.statAsync(file)];
                    case 3:
                        stat = _a.sent();
                        if (!(stat.isFile() && (!extension || file.match(extMatch)))) return [3 /*break*/, 5];
                        return [4 /*yield*/, exports.readFileAsync(file, "utf8")];
                    case 4:
                        data = _a.sent();
                        files.push(JSON.parse(data));
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, files];
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
