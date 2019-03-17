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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuLXRvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXVkaW8vZ2VuLXRvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGlDQUErQjtJQUUvQiwyQ0FBc0Q7SUFFdEQscUJBQXFCO0lBRXJCLFNBQWUsS0FBSzs7Ozs7O3dCQUNaLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ2xCLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFFbEIscUJBQU0scUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBQTs7d0JBQTlCLFNBQThCLENBQUM7d0JBQy9CLGtCQUFrQjt3QkFDbEIsa0JBQWtCO3dCQUNsQixzREFBc0Q7d0JBQ3RELDJCQUEyQjt3QkFDM0IsSUFBSTt3QkFDSixxQkFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUE7O3dCQUw3QyxrQkFBa0I7d0JBQ2xCLGtCQUFrQjt3QkFDbEIsc0RBQXNEO3dCQUN0RCwyQkFBMkI7d0JBQzNCLElBQUk7d0JBQ0osU0FBNkMsQ0FBQzt3QkFDOUMscUJBQU0sUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFBOzt3QkFBN0MsU0FBNkMsQ0FBQzt3QkFDOUMscUJBQU0sUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFBOzt3QkFBNUMsU0FBNEMsQ0FBQzt3QkFDN0MscUJBQU0sUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFBOzt3QkFBNUMsU0FBNEMsQ0FBQzt3QkFDN0MscUJBQU0sUUFBUSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FB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RyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNsQixJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN2QixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7b0NBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO2lDQUM1Qjs2QkFDRjs0QkFFRCxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7Z0NBQ2hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs2QkFDckM7aUNBQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dDQUN0QixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NkJBQ3JDO2lDQUFNO2dDQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzZCQUM5Qjt5QkFDRjt3QkFFRCxxQkFBTSwyQkFBYyxDQUFDLHlCQUF1QixTQUFTLFNBQUksSUFBSSxTQUFJLE9BQU8sU0FBTSxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBdkYsU0FBdUYsQ0FBQzs7Ozs7S0FDekY7SUFFRCxrQkFBZSxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm1vZHVsZS1hbGlhcy9yZWdpc3RlclwiO1xuXG5pbXBvcnQge21ha2VEaXJzLCB3cml0ZUZpbGVBc3luY30gZnJvbSBcIi4vZnMtaGVscGVyc1wiO1xuXG4vLyBjb25zdCBiYXNlID0gMjU1MTtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGNvbnN0IGZyZXF1ZW5jeSA9IDQ0MTAwO1xuICBjb25zdCBkdXJhdGlvbiA9IDEwOyAvLyBzZWNvbmRzXG4gIGNvbnN0IHRvbmUgPSAxMDAwO1xuXG4gIGF3YWl0IG1ha2VEaXJzKFwiYXVkaW8tb3V0cHV0XCIpO1xuICAvLyBsZXQgaSA9IDE1ICogMjtcbiAgLy8gd2hpbGUgKGkgPiAxKSB7XG4gIC8vICAgYXdhaXQgZ2VuZXJhdGUoZnJlcXVlbmN5LCBkdXJhdGlvbiwgdG9uZSwgaSwgMTUpO1xuICAvLyAgIGkgPSBNYXRoLnJvdW5kKGkgLyAyKTtcbiAgLy8gfVxuICBhd2FpdCBnZW5lcmF0ZShmcmVxdWVuY3ksIGR1cmF0aW9uLCB0b25lLCAzMik7XG4gIGF3YWl0IGdlbmVyYXRlKGZyZXF1ZW5jeSwgZHVyYXRpb24sIHRvbmUsIDE2KTtcbiAgYXdhaXQgZ2VuZXJhdGUoZnJlcXVlbmN5LCBkdXJhdGlvbiwgdG9uZSwgOCk7XG4gIGF3YWl0IGdlbmVyYXRlKGZyZXF1ZW5jeSwgZHVyYXRpb24sIHRvbmUsIDQpO1xuICBhd2FpdCBnZW5lcmF0ZShmcmVxdWVuY3ksIGR1cmF0aW9uLCB0b25lLCAyKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGUoZnJlcXVlbmN5OiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIsIHRvbmU6IG51bWJlciwgb3V0Qml0czogbnVtYmVyKSB7XG4gIGNvbnN0IG91dExldmVsID0gKE1hdGgucG93KDIsIG91dEJpdHMgLSAxKSAvIDIpO1xuXG4gIGNvbnN0IHNhbXBsZXMgPSBmcmVxdWVuY3kgKiBkdXJhdGlvbjtcblxuICBsZXQgYnVmZmVyO1xuICBpZiAob3V0Qml0cyA+IDE2KSB7XG4gICAgYnVmZmVyID0gbmV3IEJ1ZmZlcihzYW1wbGVzICogNCk7XG4gIH0gZWxzZSBpZiAob3V0Qml0cyA+IDgpIHtcbiAgICBidWZmZXIgPSBuZXcgQnVmZmVyKHNhbXBsZXMgKiAyKTtcbiAgfSBlbHNlIHtcbiAgICBidWZmZXIgPSBuZXcgQnVmZmVyKHNhbXBsZXMpO1xuICB9XG5cbiAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBiYXNlID0gZnJlcXVlbmN5IC8gKE1hdGguUEkgKiAyKTtcblxuICAvLyBnZW5lcmF0ZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZXM7IGkgKyspIHtcbiAgICAvLyB0b25lID0gKGkgLyBkdXJhdGlvbikgLyAyO1xuICAgIGNvbnN0IHZhbCA9IE1hdGguc2luKGkgKiAoKHRvbmUpIC8gYmFzZSkpO1xuICAgIGFyci5wdXNoKHZhbCk7XG4gIH1cblxuICAvLyBjb25zdCBkaXRoZXIgPSBbXG4gIC8vICAgNyAvIDE2LFxuICAvLyAgIDMgLyAxNiwgNSAvIDE2LCAxIC8gMTYsXG4gIC8vIF07XG4gIC8vIGNvbnN0IGRpdGhlciA9IFtcbiAgLy8gICA3IC8gNDgsIDUgLyA0OCxcbiAgLy8gICAzIC8gNDgsIDUgLyA0OCwgNyAvIDQ4LCA1IC8gNDgsIDMgLyA0OCxcbiAgLy8gICAxIC8gNDgsIDMgLyA0OCwgNSAvIDQ4LCAzIC8gNDgsIDEgLyA0OCxcbiAgLy8gXTtcbiAgY29uc3QgZGl0aGVyOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBkaXRoZXJMZW5ndGggPSA0O1xuICBjb25zdCBkaXRoZXJQZWFrID0gMzIgLyBvdXRCaXRzO1xuICBjb25zb2xlLmxvZyhcIkRpdGhlciBMZW5ndGhcIiwgZGl0aGVyTGVuZ3RoLCBcIkRpdGhlciBQZWFrXCIsIGRpdGhlclBlYWspO1xuICBmb3IgKGxldCB4ID0gMDsgeCA8IGRpdGhlckxlbmd0aDsgeCArKykge1xuICAgIGNvbnN0IHRvcCA9IGRpdGhlclBlYWsgKiAoKHggKyAxKSAvIGRpdGhlckxlbmd0aCk7XG4gICAgY29uc3QgYm90dG9tID0gKGRpdGhlckxlbmd0aCAqIDQpO1xuICAgIGRpdGhlci5wdXNoKCB0b3AgLyBib3R0b20gKTtcbiAgICBjb25zb2xlLmxvZyhgJHt0b3B9IC8gJHtib3R0b219YCk7XG4gIH1cbiAgZGl0aGVyLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcbiAgY29uc29sZS5sb2coXCJEaXRoZXJpbmdcIiwgb3V0Qml0cywgXCJiaXRzIHRvXCIsIGRpdGhlcik7XG4gIC8vIG1peFxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZXM7IGkgKyspIHtcbiAgICBjb25zdCBvbGRWYWwgPSBhcnJbaV07XG4gICAgY29uc3QgbmV3VmFsID0gb2xkVmFsICogb3V0TGV2ZWw7XG4gICAgY29uc3Qgcm91bmRlZCA9IE1hdGgucm91bmQobmV3VmFsKTtcbiAgICBjb25zdCBlcnJvciA9IG5ld1ZhbCAtIHJvdW5kZWQ7XG5cbiAgICBhcnJbaV0gPSByb3VuZGVkO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZGl0aGVyLmxlbmd0aDsgeCArKykge1xuICAgICAgY29uc3QgaW5kZXggPSBpICsgeCArIDE7XG4gICAgICBjb25zdCBkaXRoID0gZGl0aGVyW3hdO1xuICAgICAgaWYgKGFycltpbmRleF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcnJbaW5kZXhdICs9IGVycm9yICogZGl0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3V0Qml0cyA+IDE2KSB7XG4gICAgICBidWZmZXIud3JpdGVJbnQzMkxFKHJvdW5kZWQsIGkgKiA0KTtcbiAgICB9IGVsc2UgaWYgKG91dEJpdHMgPiA4KSB7XG4gICAgICBidWZmZXIud3JpdGVJbnQxNkxFKHJvdW5kZWQsIGkgKiAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyLndyaXRlSW50OChyb3VuZGVkLCBpKTtcbiAgICB9XG4gIH1cblxuICBhd2FpdCB3cml0ZUZpbGVBc3luYyhgLi9hdWRpby1vdXRwdXQvdG9uZS0ke2ZyZXF1ZW5jeX0tJHt0b25lfS0ke291dEJpdHN9LnBjbWAsIGJ1ZmZlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0KCk7XG4iXX0=