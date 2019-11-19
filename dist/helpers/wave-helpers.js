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
        define(["require", "exports", "chalk", "fs", "fs-helpers", "helpers", "node-logger", "path", "wav"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    const fs = __importStar(require("fs"));
    const fs_helpers_1 = require("fs-helpers");
    const helpers_1 = require("helpers");
    const node_logger_1 = require("node-logger");
    const path = __importStar(require("path"));
    const wav = __importStar(require("wav"));
    const log = node_logger_1.createLog("Wave Helpers");
    function readWaveFile(filename) {
        log(chalk_1.default.cyan("Read Wave File"), filename);
        return new Promise((resolve) => {
            const file = fs.createReadStream(path.join("asr samples", `${filename}.wav`));
            const reader = new wav.Reader();
            reader.on("format", async (format) => {
                const bufferData = await helpers_1.streamToBuffer(reader);
                resolve({ buffer: bufferData, format });
            });
            file.pipe(reader);
        });
    }
    exports.readWaveFile = readWaveFile;
    function writeWaveFile(filename, buffer) {
        log(chalk_1.default.cyan("Write Wave File"), filename);
        return new Promise(async (resolve) => {
            const dumpPath = path.join("output", "audio", filename);
            await fs_helpers_1.makeDirs(dumpPath);
            const outputFileStream = new wav.FileWriter(dumpPath, {
                sampleRate: 16000,
                channels: 1,
                bitDepth: 16,
            });
            const audioStream = helpers_1.bufferToStream(buffer);
            audioStream.pipe(outputFileStream);
            outputFileStream.on("end", async (data) => {
                resolve();
            });
        });
    }
    exports.writeWaveFile = writeWaveFile;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F2ZS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvd2F2ZS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLGtEQUEwQjtJQUMxQix1Q0FBeUI7SUFDekIsMkNBQW9DO0lBQ3BDLHFDQUF1RDtJQUN2RCw2Q0FBc0M7SUFDdEMsMkNBQTZCO0lBQzdCLHlDQUEyQjtJQUUzQixNQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXRDLFNBQWdCLFlBQVksQ0FBQyxRQUFnQjtRQUMzQyxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxRQUFRLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQW1CLEVBQUUsRUFBRTtnQkFDaEQsTUFBTSxVQUFVLEdBQUcsTUFBTSx3QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVhELG9DQVdDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLFFBQWdCLEVBQUUsTUFBYztRQUM1RCxHQUFHLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ25DLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4RCxNQUFNLHFCQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUNwRCxVQUFVLEVBQUUsS0FBSztnQkFDakIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDLENBQUM7WUFFSCxNQUFNLFdBQVcsR0FBRyx3QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVuQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFTLEVBQUUsRUFBRTtnQkFDN0MsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWxCRCxzQ0FrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lXYXZlRm9ybWF0fSBmcm9tIFwiQGludGVyZmFjZXMvaS53YXZlLWZvcm1hdFwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQge21ha2VEaXJzfSBmcm9tIFwiZnMtaGVscGVyc1wiO1xuaW1wb3J0IHtidWZmZXJUb1N0cmVhbSwgc3RyZWFtVG9CdWZmZXJ9IGZyb20gXCJoZWxwZXJzXCI7XG5pbXBvcnQge2NyZWF0ZUxvZ30gZnJvbSBcIm5vZGUtbG9nZ2VyXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyB3YXYgZnJvbSBcIndhdlwiO1xuXG5jb25zdCBsb2cgPSBjcmVhdGVMb2coXCJXYXZlIEhlbHBlcnNcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkV2F2ZUZpbGUoZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8eyBidWZmZXI6IEJ1ZmZlciwgZm9ybWF0OiBJV2F2ZUZvcm1hdCB9PiB7XG4gIGxvZyhjaGFsay5jeWFuKFwiUmVhZCBXYXZlIEZpbGVcIiksIGZpbGVuYW1lKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0ocGF0aC5qb2luKFwiYXNyIHNhbXBsZXNcIiwgYCR7ZmlsZW5hbWV9LndhdmApKTtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgd2F2LlJlYWRlcigpO1xuICAgIHJlYWRlci5vbihcImZvcm1hdFwiLCBhc3luYyAoZm9ybWF0OiBJV2F2ZUZvcm1hdCkgPT4ge1xuICAgICAgY29uc3QgYnVmZmVyRGF0YSA9IGF3YWl0IHN0cmVhbVRvQnVmZmVyKHJlYWRlcik7XG4gICAgICByZXNvbHZlKHtidWZmZXI6IGJ1ZmZlckRhdGEsIGZvcm1hdH0pO1xuICAgIH0pO1xuICAgIGZpbGUucGlwZShyZWFkZXIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlV2F2ZUZpbGUoZmlsZW5hbWU6IHN0cmluZywgYnVmZmVyOiBCdWZmZXIpIHtcbiAgbG9nKGNoYWxrLmN5YW4oXCJXcml0ZSBXYXZlIEZpbGVcIiksIGZpbGVuYW1lKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3QgZHVtcFBhdGggPSBwYXRoLmpvaW4oXCJvdXRwdXRcIiwgXCJhdWRpb1wiLCBmaWxlbmFtZSk7XG4gICAgYXdhaXQgbWFrZURpcnMoZHVtcFBhdGgpO1xuICAgIGNvbnN0IG91dHB1dEZpbGVTdHJlYW0gPSBuZXcgd2F2LkZpbGVXcml0ZXIoZHVtcFBhdGgsIHtcbiAgICAgIHNhbXBsZVJhdGU6IDE2MDAwLFxuICAgICAgY2hhbm5lbHM6IDEsXG4gICAgICBiaXREZXB0aDogMTYsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhdWRpb1N0cmVhbSA9IGJ1ZmZlclRvU3RyZWFtKGJ1ZmZlcik7XG4gICAgYXVkaW9TdHJlYW0ucGlwZShvdXRwdXRGaWxlU3RyZWFtKTtcblxuICAgIG91dHB1dEZpbGVTdHJlYW0ub24oXCJlbmRcIiwgYXN5bmMgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==