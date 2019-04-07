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
        define(["require", "exports", "module-alias/register", "./fs-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("module-alias/register");
    var fs_helpers_1 = require("./fs-helpers");
    // const base = 2551;
    function start() {
        return __awaiter(this, void 0, void 0, function () {
            var frequency, duration, tone;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        frequency = 44100;
                        duration = 10;
                        tone = 1000;
                        return [4 /*yield*/, fs_helpers_1.makeDirs("audio-output")];
                    case 1:
                        _a.sent();
                        // let i = 15 * 2;
                        // while (i > 1) {
                        //   await generate(frequency, duration, tone, i, 15);
                        //   i = Math.round(i / 2);
                        // }
                        return [4 /*yield*/, generate(frequency, duration, tone, 32)];
                    case 2:
                        // let i = 15 * 2;
                        // while (i > 1) {
                        //   await generate(frequency, duration, tone, i, 15);
                        //   i = Math.round(i / 2);
                        // }
                        _a.sent();
                        return [4 /*yield*/, generate(frequency, duration, tone, 16)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, generate(frequency, duration, tone, 8)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, generate(frequency, duration, tone, 4)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, generate(frequency, duration, tone, 2)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function generate(frequency, duration, tone, outBits) {
        return __awaiter(this, void 0, void 0, function () {
            var outLevel, samples, buffer, arr, base, i, val, dither, ditherLength, ditherPeak, x, top_1, bottom, i, oldVal, newVal, rounded, error, x, index, dith;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outLevel = (Math.pow(2, outBits - 1) / 2);
                        samples = frequency * duration;
                        if (outBits > 16) {
                            buffer = new Buffer(samples * 4);
                        }
                        else if (outBits > 8) {
                            buffer = new Buffer(samples * 2);
                        }
                        else {
                            buffer = new Buffer(samples);
                        }
                        arr = [];
                        base = frequency / (Math.PI * 2);
                        // generate
                        for (i = 0; i < samples; i++) {
                            val = Math.sin(i * ((tone) / base));
                            arr.push(val);
                        }
                        dither = [];
                        ditherLength = 4;
                        ditherPeak = 32 / outBits;
                        console.log("Dither Length", ditherLength, "Dither Peak", ditherPeak);
                        for (x = 0; x < ditherLength; x++) {
                            top_1 = ditherPeak * ((x + 1) / ditherLength);
                            bottom = (ditherLength * 4);
                            dither.push(top_1 / bottom);
                            console.log(top_1 + " / " + bottom);
                        }
                        dither.sort(function (a, b) { return b - a; });
                        console.log("Dithering", outBits, "bits to", dither);
                        // mix
                        for (i = 0; i < samples; i++) {
                            oldVal = arr[i];
                            newVal = oldVal * outLevel;
                            rounded = Math.round(newVal);
                            error = newVal - rounded;
                            arr[i] = rounded;
                            for (x = 0; x < dither.length; x++) {
                                index = i + x + 1;
                                dith = dither[x];
                                if (arr[index] !== undefined) {
                                    arr[index] += error * dith;
                                }
                            }
                            if (outBits > 16) {
                                buffer.writeInt32LE(rounded, i * 4);
                            }
                            else if (outBits > 8) {
                                buffer.writeInt16LE(rounded, i * 2);
                            }
                            else {
                                buffer.writeInt8(rounded, i);
                            }
                        }
                        return [4 /*yield*/, fs_helpers_1.writeFileAsync("./audio-output/tone-" + frequency + "-" + tone + "-" + outBits + ".pcm", buffer)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.default = start();
});
