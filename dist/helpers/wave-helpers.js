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
    const chalk_1 = require("chalk");
    const fs = require("fs");
    const fs_helpers_1 = require("fs-helpers");
    const helpers_1 = require("helpers");
    const node_logger_1 = require("node-logger");
    const path = require("path");
    const wav = require("wav");
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