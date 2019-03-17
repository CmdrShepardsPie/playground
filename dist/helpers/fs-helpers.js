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
            var e_1, _a, tempPath, _b, _c, dir, e_2, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        log(chalk_1.default.green("Make Dirs"), filePath);
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
                        log(chalk_1.default.red(e_2));
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
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
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
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
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
        log(chalk_1.default.green("Split Extension"), filename);
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
                        log(chalk_1.default.green("Get All Files from Directory"), directory, extension);
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
                            if (fileNames_1_1 && !fileNames_1_1.done && (_a = fileNames_1.return)) _a.call(fileNames_1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMtaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2ZzLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwyQ0FBc0M7SUFFdEMsMkNBQTZEO0lBQzdELG1DQUFzQztJQUN0QywrQkFBMEI7SUFDMUIsd0JBQTBCO0lBQzFCLDJCQUE2QjtJQUM3Qiw2QkFBaUM7SUFFakMsSUFBTSxHQUFHLEdBQUcsdUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV2QixRQUFBLFdBQVcsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxRQUFBLFVBQVUsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxRQUFBLGFBQWEsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxRQUFBLFlBQVksR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxRQUFBLGNBQWMsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxRQUFBLFNBQVMsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU3QyxTQUFzQixRQUFRLENBQUMsUUFBZ0I7Ozs7Ozt3QkFDN0MsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBRXBDLFFBQVEsR0FBRyxHQUFHLENBQUM7Ozs7d0JBQ0QsS0FBQSxTQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7Ozs7d0JBQTlCLEdBQUc7d0JBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUNsQix3QkFBTTt5QkFDUDt3QkFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzlCLHFCQUFNLG1CQUFXLENBQUMsUUFBUSxDQUFDLEVBQUE7OzZCQUE3QixDQUFDLENBQUMsU0FBMkIsQ0FBQyxFQUE5Qix3QkFBOEI7Ozs7d0JBRzlCLHFCQUFNLGtCQUFVLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUExQixTQUEwQixDQUFDOzs7O3dCQUNmLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBR3JDO0lBaEJELDRCQWdCQztJQUVELFNBQXNCLFNBQVMsQ0FBQyxRQUFnQjs7Ozs7O3dCQUcxQyxRQUFRLEdBQUcsR0FBRyxDQUFDO3dCQUNmLE1BQU0sR0FBRyxJQUFJLENBQUM7Ozs7d0JBQ0EsS0FBQSxTQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7Ozs7d0JBQTlCLEdBQUc7d0JBQ1osUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUMzQixxQkFBTSxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBcEMsTUFBTSxHQUFHLFNBQTJCLENBQUM7d0JBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsd0JBQU07eUJBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBRUgsc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2Y7SUFiRCw4QkFhQztJQUVELFNBQXNCLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsUUFBYSxFQUFFLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsa0JBQXVCOzs7Ozs7d0JBR3hGLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLFFBQVEsR0FBTSxRQUFRLFVBQU8sQ0FBQzt3QkFDcEMscUJBQU0sUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBeEIsU0FBd0IsQ0FBQzt3QkFDekIscUJBQU0sc0JBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUE7O3dCQUExQyxTQUEwQyxDQUFDO3dCQUVyQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzRCQUN0Qyw4QkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsdUJBQWEsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0QsQ0FBQyx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ1QscUJBQU0sNEJBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBQTs7d0JBQXpELFNBQVMsR0FBRyxTQUE2Qzt3QkFDekQsT0FBTyxHQUFNLFFBQVEsU0FBTSxDQUFDO3dCQUNsQyxxQkFBTSxzQkFBYyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQXhDLFNBQXdDLENBQUM7Ozs7O0tBQzFDO0lBZEQsOENBY0M7SUFFRCxTQUFnQixjQUFjLENBQUMsUUFBZ0I7UUFDN0MsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU5QyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFORCx3Q0FNQztJQUVELFNBQXNCLHdCQUF3QixDQUFJLFNBQWlCLEVBQUUsU0FBa0I7Ozs7Ozt3QkFDckYsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBRWpFLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ0MscUJBQU0sb0JBQVksQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQXpDLFNBQVMsR0FBRyxTQUE2Qjt3QkFDekMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFJLFNBQVMsTUFBRyxDQUFDLENBQUM7Ozs7d0JBQ3RCLGNBQUEsU0FBQSxTQUFTLENBQUE7Ozs7d0JBQXJCLFFBQVE7d0JBQ1gsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUMvQixxQkFBTSxpQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBNUIsSUFBSSxHQUFHLFNBQXFCOzZCQUM5QixDQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxFQUFyRCx3QkFBcUQ7d0JBRTFDLHFCQUFNLHFCQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBeEMsSUFBSSxHQUFHLFNBQWlDO3dCQUM5QyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFLakMsc0JBQU8sS0FBSyxFQUFDOzs7O0tBQ2Q7SUFsQkQsNERBa0JDOztBQUVELGdEQUFnRDtBQUNoRCx1REFBdUQ7QUFDdkQsOEJBQThCO0FBQzlCLHdDQUF3QztBQUN4Qyw2Q0FBNkM7QUFDN0MsZ0NBQWdDO0FBQ2hDLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsUUFBUTtBQUNSLG9DQUFvQztBQUNwQyxNQUFNO0FBQ04sNEVBQTRFO0FBQzVFLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZUxvZ30gZnJvbSBcIm5vZGUtbG9nZ2VyXCI7XG5cbmltcG9ydCB7ZmlsbEFycmF5T2JqZWN0cywgc3RyaW5naWZ5QXN5bmN9IGZyb20gXCJjc3YtaGVscGVyc1wiO1xuaW1wb3J0IHtmbGF0dGVuT2JqZWN0fSBmcm9tIFwiaGVscGVyc1wiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0ICogYXMgX2ZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcInV0aWxcIjtcblxuY29uc3QgbG9nID0gY3JlYXRlTG9nKFwiRlMgSGVscGVyc1wiKTtcblxuZXhwb3J0IGNvbnN0IGV4aXN0c0FzeW5jID0gcHJvbWlzaWZ5KF9mcy5leGlzdHMpO1xuZXhwb3J0IGNvbnN0IG1rZGlyQXN5bmMgPSBwcm9taXNpZnkoX2ZzLm1rZGlyKTtcbmV4cG9ydCBjb25zdCByZWFkRmlsZUFzeW5jID0gcHJvbWlzaWZ5KF9mcy5yZWFkRmlsZSk7XG5leHBvcnQgY29uc3QgcmVhZGRpckFzeW5jID0gcHJvbWlzaWZ5KF9mcy5yZWFkZGlyKTtcbmV4cG9ydCBjb25zdCB3cml0ZUZpbGVBc3luYyA9IHByb21pc2lmeShfZnMud3JpdGVGaWxlKTtcbmV4cG9ydCBjb25zdCBzdGF0QXN5bmMgPSBwcm9taXNpZnkoX2ZzLnN0YXQpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFrZURpcnMoZmlsZVBhdGg6IHN0cmluZykge1xuICBsb2coY2hhbGsuZ3JlZW4oXCJNYWtlIERpcnNcIiksIGZpbGVQYXRoKTtcblxuICBsZXQgdGVtcFBhdGggPSBgLmA7XG4gIGZvciAoY29uc3QgZGlyIG9mIGZpbGVQYXRoLnNwbGl0KC9bL1xcXFxdLykpIHtcbiAgICBpZiAoL1xcLi8udGVzdChkaXIpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdGVtcFBhdGggPSBwYXRoLmpvaW4odGVtcFBhdGgsIGRpcik7XG4gICAgaWYgKCEoYXdhaXQgZXhpc3RzQXN5bmModGVtcFBhdGgpKSkge1xuICAgICAgLy8gbG9nKGNoYWxrLmJsdWUoXCJtYWtlXCIpLCB0ZW1wUGF0aCk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBta2RpckFzeW5jKHRlbXBQYXRoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgbG9nKGNoYWxrLnJlZChlKSk7IH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpckV4aXN0cyhmaWxlUGF0aDogc3RyaW5nKSB7XG4gIC8vIGxvZyhjaGFsay5ncmVlbihcIkRpciBFeGlzdHNcIiksIGZpbGVQYXRoKTtcblxuICBsZXQgdGVtcFBhdGggPSBgLmA7XG4gIGxldCBleGlzdHMgPSB0cnVlO1xuICBmb3IgKGNvbnN0IGRpciBvZiBmaWxlUGF0aC5zcGxpdCgvWy9cXFxcXS8pKSB7XG4gICAgdGVtcFBhdGggPSBwYXRoLmpvaW4odGVtcFBhdGgsIGRpcik7XG4gICAgZXhpc3RzID0gYXdhaXQgZXhpc3RzQXN5bmModGVtcFBhdGgpO1xuICAgIGlmICghZXhpc3RzKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV4aXN0cztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlVG9Kc29uQW5kQ3N2KGZpbGVuYW1lOiBzdHJpbmcsIGpzb25EYXRhOiBhbnksIGNzdkRhdGE6IGFueSA9IGpzb25EYXRhKSB7XG4gIC8vIGxvZyhjaGFsay5ncmVlbihcIldyaXRlIHRvIEpzb24gYW5kIENTVlwiKSwgZmlsZW5hbWUpO1xuXG4gIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShqc29uRGF0YSwgbnVsbCwgMik7XG4gIGNvbnN0IGpzb25OYW1lID0gYCR7ZmlsZW5hbWV9Lmpzb25gO1xuICBhd2FpdCBtYWtlRGlycyhqc29uTmFtZSk7XG4gIGF3YWl0IHdyaXRlRmlsZUFzeW5jKGpzb25OYW1lLCBqc29uU3RyaW5nKTtcblxuICBjb25zdCBjc3ZQcmVwID0gQXJyYXkuaXNBcnJheShjc3ZEYXRhKSA/XG4gICAgZmlsbEFycmF5T2JqZWN0cyhjc3ZEYXRhLm1hcCgocjogYW55KSA9PiBmbGF0dGVuT2JqZWN0KHIpKSkgOlxuICAgIFtmbGF0dGVuT2JqZWN0KGNzdkRhdGEpXTtcbiAgY29uc3QgY3N2U3RyaW5nID0gYXdhaXQgc3RyaW5naWZ5QXN5bmMoY3N2UHJlcCwge2hlYWRlcjogdHJ1ZX0pO1xuICBjb25zdCBjc3ZOYW1lID0gYCR7ZmlsZW5hbWV9LmNzdmA7XG4gIGF3YWl0IHdyaXRlRmlsZUFzeW5jKGNzdk5hbWUsIGNzdlN0cmluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdEV4dGVuc2lvbihmaWxlbmFtZTogc3RyaW5nKSB7XG4gIGxvZyhjaGFsay5ncmVlbihcIlNwbGl0IEV4dGVuc2lvblwiKSwgZmlsZW5hbWUpO1xuXG4gIGNvbnN0IG5hbWUgPSBmaWxlbmFtZS5zdWJzdHJpbmcoMCwgZmlsZW5hbWUubGFzdEluZGV4T2YoXCIuXCIpKTtcbiAgY29uc3QgZXh0ID0gZmlsZW5hbWUuc3Vic3RyaW5nKGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpO1xuICByZXR1cm4geyBuYW1lLCBleHQgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbEZpbGVzRnJvbURpcmVjdG9yeTxUPihkaXJlY3Rvcnk6IHN0cmluZywgZXh0ZW5zaW9uPzogc3RyaW5nKTogUHJvbWlzZTxUW10+IHtcbiAgbG9nKGNoYWxrLmdyZWVuKFwiR2V0IEFsbCBGaWxlcyBmcm9tIERpcmVjdG9yeVwiKSwgZGlyZWN0b3J5LCBleHRlbnNpb24pO1xuXG4gIGNvbnN0IGZpbGVzID0gW107XG4gIGNvbnN0IGZpbGVOYW1lcyA9IGF3YWl0IHJlYWRkaXJBc3luYyhkaXJlY3RvcnkpO1xuICBjb25zdCBleHRNYXRjaCA9IG5ldyBSZWdFeHAoYCR7ZXh0ZW5zaW9ufSRgKTtcbiAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBmaWxlTmFtZXMpIHtcbiAgICBjb25zdCBmaWxlID0gcGF0aC5qb2luKGRpcmVjdG9yeSwgZmlsZU5hbWUpO1xuICAgIGNvbnN0IHN0YXQgPSBhd2FpdCBzdGF0QXN5bmMoZmlsZSk7XG4gICAgaWYgKHN0YXQuaXNGaWxlKCkgJiYgKCFleHRlbnNpb24gfHwgZmlsZS5tYXRjaChleHRNYXRjaCkpKSB7XG4gICAgICAvLyBsb2coXCJHZXQgQWxsIEZpbGVzIEZyb20gRGlyZWN0b3J5XCIsIGNoYWxrLmdyZWVuKFwicmVhZGluZ1wiKSwgZmlsZSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVhZEZpbGVBc3luYyhmaWxlLCBcInV0ZjhcIik7XG4gICAgICBmaWxlcy5wdXNoKEpTT04ucGFyc2UoZGF0YSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsb2coXCJHZXQgQWxsIEZpbGVzIEZyb20gRGlyZWN0b3J5XCIsIGNoYWxrLnJlZChcInNraXBwZWRcIiksIGZpbGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmlsZXM7XG59XG5cbi8vIE5vdCB1c2VkLCBzbyBjb21tZW50ZWQgb3V0IHRvIGF2b2lkIGNvbmZ1c2lvblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGR1bXAodXJsOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuLy8gICBjb25zb2xlLmxvZyhcImR1bXBcIiwgdXJsKTtcbi8vICAgY29uc3QgcGFydHMgPSB1cmwuc3BsaXQoL1tcXC8/Ol0vZyk7XG4vLyAgIGxldCBwYXRoID0gYC4uL3NwZWN0cnVtLWd1aWRlLXR3Yy1kdW1wYDtcbi8vICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG4vLyAgICAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzQXN5bmMocGF0aCkpKSB7XG4vLyAgICAgICBhd2FpdCBmcy5ta2RpckFzeW5jKHBhdGgpO1xuLy8gICAgIH1cbi8vICAgICBwYXRoID0gcGF0aC5qb2luKHBhdGgsIHBhcnQpO1xuLy8gICB9XG4vLyAgIGF3YWl0IGZzLndyaXRlRmlsZUFzeW5jKGAke3BhdGh9Lmpzb25gLCBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSk7XG4vLyB9XG4iXX0=