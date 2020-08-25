var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk", "node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    const node_logger_1 = require("node-logger");
    const log = node_logger_1.createLog("Audio Helpers");
    function mixBuffers(mix) {
        // Convert buffer into number array so we have free reign to use any precision
        const numberArrays = mix.in.map((p) => read16LEToNumberArray(p.buffer));
        let maxLength = numberArrays[0].length;
        // Find shortest array
        numberArrays.forEach((nums, x) => {
            if (nums.length < maxLength) {
                maxLength = nums.length;
            }
            log(chalk_1.default.green("In Buffer"), x, "samples", nums.length, "length", (nums.length / 16000).toFixed(2), "seconds");
        });
        // Normalize and truncate
        numberArrays.forEach((nums, i) => {
            const mixIn = mix.in[i];
            if (nums.length > maxLength) {
                nums.splice(maxLength);
            }
            if (mixIn.normalize) {
                normalize(nums, i);
            }
            if (mixIn.gain) {
                boost(nums, mixIn.gain, i);
            }
        });
        // Mixing
        const mixedNumberArray = new Array(maxLength);
        for (let i = 0; i < maxLength; i += 1) {
            let mixed = 0;
            numberArrays.forEach((nums) => (mixed += nums[i % nums.length]));
            mixedNumberArray[i] = mixed / numberArrays.length;
        }
        if (mix.out.normalize) {
            normalize(mixedNumberArray, "Out");
        }
        if (mix.out.gain) {
            boost(mixedNumberArray, mix.out.gain, "Out");
        }
        // Numbers are going to be 16 bit integers but Buffer is going to be 8 bit integers
        const outBuffer = new Buffer(maxLength * 2);
        log(chalk_1.default.green("Out Buffer"), "samples", outBuffer.length / 2, "length", (maxLength / 16000).toFixed(2), "seconds");
        mixedNumberArray.forEach((num, i) => outBuffer.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(num))), i * 2));
        return outBuffer;
    }
    exports.mixBuffers = mixBuffers;
    function read16LEToNumberArray(pcmData) {
        const numArray = [];
        for (let i = 0; i < pcmData.length; i += 2) {
            const num = pcmData.readInt16LE(i);
            numArray.push(num);
        }
        return numArray;
    }
    function normalize(inNumberArray, id) {
        const length = inNumberArray.length;
        const limit = (Math.pow(2, 16) / 2) - 1;
        let peak = 0;
        for (let i = 0; i < length; i++) {
            const value = Math.abs(inNumberArray[i]);
            if (value > peak) {
                peak = value;
            }
        }
        const amp = limit / peak;
        for (let i = 0; i < length; i++) {
            inNumberArray[i] = inNumberArray[i] * amp;
        }
        log(chalk_1.default.blue("Normalized"), id !== undefined ? id : "", "peak", peak, "amplification", amp.toFixed(2) + " x");
    }
    function boost(inNumberArray, gainDb, id) {
        const ratio = Math.pow(10, gainDb / 10);
        const length = inNumberArray.length;
        for (let i = 0; i < length; i++) {
            inNumberArray[i] = inNumberArray[i] * ratio;
        }
        log(chalk_1.default.yellow("Boosted"), id !== undefined ? id : "", "gain", gainDb + " db");
    }
});
//# sourceMappingURL=audio-helpers.js.map