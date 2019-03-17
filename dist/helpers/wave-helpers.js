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
    Object.defineProperty(exports, "__esModule", { value: true });
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
        log(chalk_1.default.cyan("Read Wave File"), filename);
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
        log(chalk_1.default.cyan("Write Wave File"), filename);
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
                            bitDepth: 16,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvd2F2ZS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5Q0FBbUQ7SUFDbkQsbUNBQXVEO0lBQ3ZELDJDQUFzQztJQUV0QywrQkFBMEI7SUFDMUIsdUJBQXlCO0lBQ3pCLDJCQUE2QjtJQUM3Qix5QkFBMkI7SUFFM0IsSUFBTSxHQUFHLEdBQUcsdUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV0QyxTQUFnQixZQUFZLENBQUMsUUFBZ0I7UUFBN0MsaUJBV0M7UUFWQyxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3pCLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBSyxRQUFRLFNBQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBTyxNQUFtQjs7OztnQ0FDekIscUJBQU0sd0JBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQTs7NEJBQXpDLFVBQVUsR0FBRyxTQUE0Qjs0QkFDL0MsT0FBTyxDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLFFBQUEsRUFBQyxDQUFDLENBQUM7Ozs7aUJBQ3ZDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBWEQsb0NBV0M7SUFFRCxTQUFnQixhQUFhLENBQUMsUUFBZ0IsRUFBRSxNQUFjO1FBQTlELGlCQWtCQztRQWpCQyxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPOzs7Ozs7d0JBQ3pCLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3hELHFCQUFNLHFCQUFRLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUF4QixTQUF3QixDQUFDO3dCQUNuQixnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNwRCxVQUFVLEVBQUUsS0FBSzs0QkFDakIsUUFBUSxFQUFFLENBQUM7NEJBQ1gsUUFBUSxFQUFFLEVBQUU7eUJBQ2IsQ0FBQyxDQUFDO3dCQUVHLFdBQVcsR0FBRyx3QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMzQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBRW5DLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBTyxJQUFTOztnQ0FDekMsT0FBTyxFQUFFLENBQUM7Ozs2QkFDWCxDQUFDLENBQUM7Ozs7YUFDSixDQUFDLENBQUM7SUFDTCxDQUFDO0lBbEJELHNDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7bWFrZURpcnMsIHJlYWRGaWxlQXN5bmN9IGZyb20gXCJmcy1oZWxwZXJzXCI7XG5pbXBvcnQge2J1ZmZlclRvU3RyZWFtLCBzdHJlYW1Ub0J1ZmZlcn0gZnJvbSBcImhlbHBlcnNcIjtcbmltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwibm9kZS1sb2dnZXJcIjtcbmltcG9ydCB7SVdhdmVGb3JtYXR9IGZyb20gXCJAaW50ZXJmYWNlcy9pLndhdmUtZm9ybWF0XCI7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIHdhdiBmcm9tIFwid2F2XCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIldhdmUgSGVscGVyc1wiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRXYXZlRmlsZShmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTx7IGJ1ZmZlcjogQnVmZmVyLCBmb3JtYXQ6IElXYXZlRm9ybWF0IH0+IHtcbiAgbG9nKGNoYWxrLmN5YW4oXCJSZWFkIFdhdmUgRmlsZVwiKSwgZmlsZW5hbWUpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBmaWxlID0gZnMuY3JlYXRlUmVhZFN0cmVhbShwYXRoLmpvaW4oXCJhc3Igc2FtcGxlc1wiLCBgJHtmaWxlbmFtZX0ud2F2YCkpO1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyB3YXYuUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9uKFwiZm9ybWF0XCIsIGFzeW5jIChmb3JtYXQ6IElXYXZlRm9ybWF0KSA9PiB7XG4gICAgICBjb25zdCBidWZmZXJEYXRhID0gYXdhaXQgc3RyZWFtVG9CdWZmZXIocmVhZGVyKTtcbiAgICAgIHJlc29sdmUoe2J1ZmZlcjogYnVmZmVyRGF0YSwgZm9ybWF0fSk7XG4gICAgfSk7XG4gICAgZmlsZS5waXBlKHJlYWRlcik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVXYXZlRmlsZShmaWxlbmFtZTogc3RyaW5nLCBidWZmZXI6IEJ1ZmZlcikge1xuICBsb2coY2hhbGsuY3lhbihcIldyaXRlIFdhdmUgRmlsZVwiKSwgZmlsZW5hbWUpO1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBkdW1wUGF0aCA9IHBhdGguam9pbihcIm91dHB1dFwiLCBcImF1ZGlvXCIsIGZpbGVuYW1lKTtcbiAgICBhd2FpdCBtYWtlRGlycyhkdW1wUGF0aCk7XG4gICAgY29uc3Qgb3V0cHV0RmlsZVN0cmVhbSA9IG5ldyB3YXYuRmlsZVdyaXRlcihkdW1wUGF0aCwge1xuICAgICAgc2FtcGxlUmF0ZTogMTYwMDAsXG4gICAgICBjaGFubmVsczogMSxcbiAgICAgIGJpdERlcHRoOiAxNixcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1ZGlvU3RyZWFtID0gYnVmZmVyVG9TdHJlYW0oYnVmZmVyKTtcbiAgICBhdWRpb1N0cmVhbS5waXBlKG91dHB1dEZpbGVTdHJlYW0pO1xuXG4gICAgb3V0cHV0RmlsZVN0cmVhbS5vbihcImVuZFwiLCBhc3luYyAoZGF0YTogYW55KSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19