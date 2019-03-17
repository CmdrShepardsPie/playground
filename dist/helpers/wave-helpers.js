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
        define(["require", "exports", "fs-helpers", "helpers", "node-logger", "chalk", "fs", "path", "wav"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var fs_helpers_1 = require("fs-helpers");
    var helpers_1 = require("helpers");
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var fs = require("fs");
    var path = require("path");
    var wav = require("wav");
    var log = node_logger_1.createLog("Wave Helpers");
    function readWaveFile(filename) {
        var _this = this;
        log(chalk_1["default"].cyan("Read Wave File"), filename);
        return new Promise(function (resolve) {
            var file = fs.createReadStream(path.join("asr samples", filename + ".wav"));
            var reader = new wav.Reader();
            reader.on("format", function (format) { return __awaiter(_this, void 0, void 0, function () {
                var bufferData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, helpers_1.streamToBuffer(reader)];
                        case 1:
                            bufferData = _a.sent();
                            resolve({ buffer: bufferData, format: format });
                            return [2 /*return*/];
                    }
                });
            }); });
            file.pipe(reader);
        });
    }
    exports.readWaveFile = readWaveFile;
    function writeWaveFile(filename, buffer) {
        var _this = this;
        log(chalk_1["default"].cyan("Write Wave File"), filename);
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var dumpPath, outputFileStream, audioStream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dumpPath = path.join("output", "audio", filename);
                        return [4 /*yield*/, fs_helpers_1.makeDirs(dumpPath)];
                    case 1:
                        _a.sent();
                        outputFileStream = new wav.FileWriter(dumpPath, {
                            sampleRate: 16000,
                            channels: 1,
                            bitDepth: 16
                        });
                        audioStream = helpers_1.bufferToStream(buffer);
                        audioStream.pipe(outputFileStream);
                        outputFileStream.on("end", function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                resolve();
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    exports.writeWaveFile = writeWaveFile;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvd2F2ZS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5Q0FBbUQ7SUFDbkQsbUNBQXVEO0lBQ3ZELDJDQUFzQztJQUV0QywrQkFBMEI7SUFDMUIsdUJBQXlCO0lBQ3pCLDJCQUE2QjtJQUM3Qix5QkFBMkI7SUFFM0IsSUFBTSxHQUFHLEdBQUcsdUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV0QyxTQUFnQixZQUFZLENBQUMsUUFBZ0I7UUFBN0MsaUJBV0M7UUFWQyxHQUFHLENBQUMsa0JBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN6QixJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUssUUFBUSxTQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQU8sTUFBbUI7Ozs7Z0NBQ3pCLHFCQUFNLHdCQUFjLENBQUMsTUFBTSxDQUFDLEVBQUE7OzRCQUF6QyxVQUFVLEdBQUcsU0FBNEI7NEJBQy9DLE9BQU8sQ0FBQyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQyxDQUFDOzs7O2lCQUN2QyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVhELG9DQVdDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLFFBQWdCLEVBQUUsTUFBYztRQUE5RCxpQkFrQkM7UUFqQkMsR0FBRyxDQUFDLGtCQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU87Ozs7Ozt3QkFDekIsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDeEQscUJBQU0scUJBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQXhCLFNBQXdCLENBQUM7d0JBQ25CLGdCQUFnQixHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ3BELFVBQVUsRUFBRSxLQUFLOzRCQUNqQixRQUFRLEVBQUUsQ0FBQzs0QkFDWCxRQUFRLEVBQUUsRUFBRTt5QkFDYixDQUFDLENBQUM7d0JBRUcsV0FBVyxHQUFHLHdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzNDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFFbkMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFPLElBQVM7O2dDQUN6QyxPQUFPLEVBQUUsQ0FBQzs7OzZCQUNYLENBQUMsQ0FBQzs7OzthQUNKLENBQUMsQ0FBQztJQUNMLENBQUM7SUFsQkQsc0NBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHttYWtlRGlycywgcmVhZEZpbGVBc3luY30gZnJvbSBcImZzLWhlbHBlcnNcIjtcbmltcG9ydCB7YnVmZmVyVG9TdHJlYW0sIHN0cmVhbVRvQnVmZmVyfSBmcm9tIFwiaGVscGVyc1wiO1xuaW1wb3J0IHtjcmVhdGVMb2d9IGZyb20gXCJub2RlLWxvZ2dlclwiO1xuaW1wb3J0IHtJV2F2ZUZvcm1hdH0gZnJvbSBcIkBpbnRlcmZhY2VzL2kud2F2ZS1mb3JtYXRcIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgd2F2IGZyb20gXCJ3YXZcIjtcblxuY29uc3QgbG9nID0gY3JlYXRlTG9nKFwiV2F2ZSBIZWxwZXJzXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFdhdmVGaWxlKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHsgYnVmZmVyOiBCdWZmZXIsIGZvcm1hdDogSVdhdmVGb3JtYXQgfT4ge1xuICBsb2coY2hhbGsuY3lhbihcIlJlYWQgV2F2ZSBGaWxlXCIpLCBmaWxlbmFtZSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHBhdGguam9pbihcImFzciBzYW1wbGVzXCIsIGAke2ZpbGVuYW1lfS53YXZgKSk7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IHdhdi5SZWFkZXIoKTtcbiAgICByZWFkZXIub24oXCJmb3JtYXRcIiwgYXN5bmMgKGZvcm1hdDogSVdhdmVGb3JtYXQpID0+IHtcbiAgICAgIGNvbnN0IGJ1ZmZlckRhdGEgPSBhd2FpdCBzdHJlYW1Ub0J1ZmZlcihyZWFkZXIpO1xuICAgICAgcmVzb2x2ZSh7YnVmZmVyOiBidWZmZXJEYXRhLCBmb3JtYXR9KTtcbiAgICB9KTtcbiAgICBmaWxlLnBpcGUocmVhZGVyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZVdhdmVGaWxlKGZpbGVuYW1lOiBzdHJpbmcsIGJ1ZmZlcjogQnVmZmVyKSB7XG4gIGxvZyhjaGFsay5jeWFuKFwiV3JpdGUgV2F2ZSBGaWxlXCIpLCBmaWxlbmFtZSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IGR1bXBQYXRoID0gcGF0aC5qb2luKFwib3V0cHV0XCIsIFwiYXVkaW9cIiwgZmlsZW5hbWUpO1xuICAgIGF3YWl0IG1ha2VEaXJzKGR1bXBQYXRoKTtcbiAgICBjb25zdCBvdXRwdXRGaWxlU3RyZWFtID0gbmV3IHdhdi5GaWxlV3JpdGVyKGR1bXBQYXRoLCB7XG4gICAgICBzYW1wbGVSYXRlOiAxNjAwMCxcbiAgICAgIGNoYW5uZWxzOiAxLFxuICAgICAgYml0RGVwdGg6IDE2LFxuICAgIH0pO1xuXG4gICAgY29uc3QgYXVkaW9TdHJlYW0gPSBidWZmZXJUb1N0cmVhbShidWZmZXIpO1xuICAgIGF1ZGlvU3RyZWFtLnBpcGUob3V0cHV0RmlsZVN0cmVhbSk7XG5cbiAgICBvdXRwdXRGaWxlU3RyZWFtLm9uKFwiZW5kXCIsIGFzeW5jIChkYXRhOiBhbnkpID0+IHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=