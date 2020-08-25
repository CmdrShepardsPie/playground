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
//# sourceMappingURL=wave-helpers.js.map