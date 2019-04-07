(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-logger", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var log = node_logger_1.createLog("Audio Helpers");
    function mixBuffers(mix) {
        // Convert buffer into number array so we have free reign to use any precision
        var numberArrays = mix.in.map(function (p) { return read16LEToNumberArray(p.buffer); });
        var maxLength = numberArrays[0].length;
        // Find shortest array
        numberArrays.forEach(function (nums, x) {
            if (nums.length < maxLength) {
                maxLength = nums.length;
            }
            log(chalk_1.default.green("In Buffer"), x, "samples", nums.length, "length", (nums.length / 16000).toFixed(2), "seconds");
        });
        // Normalize and truncate
        numberArrays.forEach(function (nums, i) {
            var mixIn = mix.in[i];
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
        var mixedNumberArray = new Array(maxLength);
        var _loop_1 = function (i) {
            var mixed = 0;
            numberArrays.forEach(function (nums) { return (mixed += nums[i % nums.length]); });
            mixedNumberArray[i] = mixed / numberArrays.length;
        };
        for (var i = 0; i < maxLength; i += 1) {
            _loop_1(i);
        }
        if (mix.out.normalize) {
            normalize(mixedNumberArray, "Out");
        }
        if (mix.out.gain) {
            boost(mixedNumberArray, mix.out.gain, "Out");
        }
        // Numbers are going to be 16 bit integers but Buffer is going to be 8 bit integers
        var outBuffer = new Buffer(maxLength * 2);
        log(chalk_1.default.green("Out Buffer"), "samples", outBuffer.length / 2, "length", (maxLength / 16000).toFixed(2), "seconds");
        mixedNumberArray.forEach(function (num, i) { return outBuffer.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(num))), i * 2); });
        return outBuffer;
    }
    exports.mixBuffers = mixBuffers;
    function read16LEToNumberArray(pcmData) {
        var numArray = [];
        for (var i = 0; i < pcmData.length; i += 2) {
            var num = pcmData.readInt16LE(i);
            numArray.push(num);
        }
        return numArray;
    }
    function normalize(inNumberArray, id) {
        var length = inNumberArray.length;
        var limit = (Math.pow(2, 16) / 2) - 1;
        var peak = 0;
        for (var i = 0; i < length; i++) {
            var value = Math.abs(inNumberArray[i]);
            if (value > peak) {
                peak = value;
            }
        }
        var amp = limit / peak;
        for (var i = 0; i < length; i++) {
            inNumberArray[i] = inNumberArray[i] * amp;
        }
        log(chalk_1.default.blue("Normalized"), id !== undefined ? id : "", "peak", peak, "amplification", amp.toFixed(2) + " x");
    }
    function boost(inNumberArray, gainDb, id) {
        var ratio = Math.pow(10, gainDb / 10);
        var length = inNumberArray.length;
        for (var i = 0; i < length; i++) {
            inNumberArray[i] = inNumberArray[i] * ratio;
        }
        log(chalk_1.default.yellow("Boosted"), id !== undefined ? id : "", "gain", gainDb + " db");
    }
});
