var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
    exports.writeWaveFile = exports.readWaveFile = void 0;
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
