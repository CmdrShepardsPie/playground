"use strict";
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
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance();
utterThis.volume = 2;
var letters = "QWERTYUIOPASDFGHJKLZXCVBNM";
function say(text, voice, pitch, rate) {
    console.log("say", text, voice, pitch, rate);
    return new Promise(function (resolve) {
        utterThis.onend = function () {
            console.log("say end");
            resolve();
        };
        utterThis.onpause = function () {
            console.log("say pause");
            resolve();
        };
        utterThis.onerror = function () {
            console.log("say error");
            resolve();
        };
        utterThis.onboundary = function () {
            console.log("say boundary");
            // resolve();
        };
        utterThis.text = text;
        utterThis.voice = voice;
        utterThis.pitch = pitch;
        utterThis.rate = rate;
        // console.log('speak start');
        synth.speak(utterThis);
        // console.log('speak end');
    });
}
//
// function wait(ms, fn) {
//   console.log('wait', ms);
//   return new Promise((resolve, reject) => {
//     window.setTimeout(async () => {
//       try {
//         resolve(fn && await fn());
//       } catch (e) {
//         reject(e);
//       }
//     }, ms);
//   });
// }
function next(number) {
    var _this = this;
    var waitFor = number || Math.random() * 60 * 60 * 1000;
    console.log("next", waitFor);
    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        var voices, voicenum, voice, pitch, rate, words, max, i, number_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    voices = synth.getVoices();
                    voicenum = Math.floor(Math.random() * voices.length);
                    voice = voices[voicenum];
                    pitch = Math.random();
                    rate = Math.random();
                    words = [];
                    max = Math.round((Math.random() * Math.random() * Math.random() * 20));
                    for (i = 0; i < max; i++) {
                        number_1 = Math.floor(Math.random() * Math.random() * Math.random() * 126);
                        if (number_1 >= 100) {
                            number_1 = letters[number_1 - 100];
                            console.log("Using letter", number_1);
                        }
                        if (typeof number_1 === "number" && Math.floor(Math.random() * 10) === 0) {
                            number_1 = number_1 * -1;
                            console.log("Using negative", number_1);
                        }
                        if (Math.floor(Math.random() * 10) === 0) {
                            number_1 = number_1 + Math.random();
                            if (typeof number_1 === "number") {
                                number_1 = number_1.toFixed(Math.floor(Math.random() * 10));
                            }
                            console.log("Using decimal", number_1);
                        }
                        if (i === 0 && Math.floor(Math.random() * 10) === 0) {
                            number_1 = "Repeat after me";
                        }
                        if (i === max - 1 && Math.floor(Math.random() * 10) === 0) {
                            number_1 = "That's number wang";
                        }
                        words.push(number_1);
                    }
                    if (!words.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, say(words.join(". "), voice, pitch, rate)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    // await wait(400);
                    next();
                    return [2 /*return*/];
            }
        });
    }); }, waitFor);
}
next(1000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXN0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbnVtYmVyLXN0YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztBQUNyQyxJQUFNLFNBQVMsR0FBRyxJQUFJLHdCQUF3QixFQUFFLENBQUM7QUFDakQsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDckIsSUFBTSxPQUFPLEdBQUcsNEJBQTRCLENBQUM7QUFFN0MsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSTtJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztRQUN6QixTQUFTLENBQUMsS0FBSyxHQUFHO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUM7UUFDRixTQUFTLENBQUMsT0FBTyxHQUFHO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUM7UUFDRixTQUFTLENBQUMsT0FBTyxHQUFHO1lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUM7UUFDRixTQUFTLENBQUMsVUFBVSxHQUFHO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUIsYUFBYTtRQUNmLENBQUMsQ0FBQztRQUNGLFNBQVMsQ0FBQyxJQUFJLEdB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RDs0QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFNLENBQUMsQ0FBQzt5QkFDdEM7d0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDbkQsUUFBTSxHQUFHLGlCQUFpQixDQUFDO3lCQUM1Qjt3QkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDekQsUUFBTSxHQUFHLG9CQUFvQixDQUFDO3lCQUMvQjt3QkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQU0sQ0FBQyxDQUFDO3FCQUNwQjt5QkFDRyxLQUFLLENBQUMsTUFBTSxFQUFaLHdCQUFZO29CQUNkLHFCQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUEvQyxTQUErQyxDQUFDOzs7b0JBRWxELG1CQUFtQjtvQkFDbkIsSUFBSSxFQUFFLENBQUM7Ozs7U0FDUixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN5bnRoID0gd2luZG93LnNwZWVjaFN5bnRoZXNpcztcbmNvbnN0IHV0dGVyVGhpcyA9IG5ldyBTcGVlY2hTeW50aGVzaXNVdHRlcmFuY2UoKTtcbnV0dGVyVGhpcy52b2x1bWUgPSAyO1xuY29uc3QgbGV0dGVycyA9IFwiUVdFUlRZVUlPUEFTREZHSEpLTFpYQ1ZCTk1cIjtcblxuZnVuY3Rpb24gc2F5KHRleHQsIHZvaWNlLCBwaXRjaCwgcmF0ZSkge1xuICBjb25zb2xlLmxvZyhcInNheVwiLCB0ZXh0LCB2b2ljZSwgcGl0Y2gsIHJhdGUpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB1dHRlclRoaXMub25lbmQgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcInNheSBlbmRcIik7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfTtcbiAgICB1dHRlclRoaXMub25wYXVzZSA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2F5IHBhdXNlXCIpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG4gICAgdXR0ZXJUaGlzLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcInNheSBlcnJvclwiKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9O1xuICAgIHV0dGVyVGhpcy5vbmJvdW5kYXJ5ID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJzYXkgYm91bmRhcnlcIik7XG4gICAgICAvLyByZXNvbHZlKCk7XG4gICAgfTtcbiAgICB1dHRlclRoaXMudGV4dCA9IHRleHQ7XG4gICAgdXR0ZXJUaGlzLnZvaWNlID0gdm9pY2U7XG4gICAgdXR0ZXJUaGlzLnBpdGNoID0gcGl0Y2g7XG4gICAgdXR0ZXJUaGlzLnJhdGUgPSByYXRlO1xuICAgIC8vIGNvbnNvbGUubG9nKCdzcGVhayBzdGFydCcpO1xuICAgIHN5bnRoLnNwZWFrKHV0dGVyVGhpcyk7XG4gICAgLy8gY29uc29sZS5sb2coJ3NwZWFrIGVuZCcpO1xuICB9KTtcbn1cbi8vXG4vLyBmdW5jdGlvbiB3YWl0KG1zLCBmbikge1xuLy8gICBjb25zb2xlLmxvZygnd2FpdCcsIG1zKTtcbi8vICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vICAgICB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4vLyAgICAgICB0cnkge1xuLy8gICAgICAgICByZXNvbHZlKGZuICYmIGF3YWl0IGZuKCkpO1xuLy8gICAgICAgfSBjYXRjaCAoZSkge1xuLy8gICAgICAgICByZWplY3QoZSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSwgbXMpO1xuLy8gICB9KTtcbi8vIH1cblxuZnVuY3Rpb24gbmV4dChudW1iZXIpIHtcbiAgY29uc3Qgd2FpdEZvciA9IG51bWJlciB8fCBNYXRoLnJhbmRvbSgpICogNjAgKiA2MCAqIDEwMDA7XG4gIGNvbnNvbGUubG9nKFwibmV4dFwiLCB3YWl0Rm9yKTtcbiAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgdm9pY2VzID0gc3ludGguZ2V0Vm9pY2VzKCk7XG4gICAgY29uc3Qgdm9pY2VudW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2b2ljZXMubGVuZ3RoKTtcbiAgICBjb25zdCB2b2ljZSA9IHZvaWNlc1t2b2ljZW51bV07XG4gICAgLy8gY29uc3QgcGl0Y2ggPSAwLjE7XG4gICAgLy8gY29uc3QgcmF0ZSA9IDAuNTtcbiAgICBjb25zdCBwaXRjaCA9IE1hdGgucmFuZG9tKCk7XG4gICAgY29uc3QgcmF0ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgLy8gY29uc29sZS5sb2coJ3ZvaWNlJywgdm9pY2VudW0sIHZvaWNlLCBwaXRjaCwgcmF0ZSk7XG4gICAgY29uc3Qgd29yZHMgPSBbXTtcbiAgICBjb25zdCBtYXggPSBNYXRoLnJvdW5kKChNYXRoLnJhbmRvbSgpICogTWF0aC5yYW5kb20oKSAqIE1hdGgucmFuZG9tKCkgKiAyMCkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLnJhbmRvbSgpICogTWF0aC5yYW5kb20oKSAqIDEyNik7XG4gICAgICBpZiAobnVtYmVyID49IDEwMCkge1xuICAgICAgICBudW1iZXIgPSBsZXR0ZXJzW251bWJlciAtIDEwMF07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgbGV0dGVyXCIsIG51bWJlcik7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG51bWJlciA9PT0gXCJudW1iZXJcIiAmJiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgPT09IDApIHtcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyICogLTE7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgbmVnYXRpdmVcIiwgbnVtYmVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgPT09IDApIHtcbiAgICAgICAgbnVtYmVyID0gbnVtYmVyICsgTWF0aC5yYW5kb20oKTtcbiAgICAgICAgaWYgKHR5cGVvZiBudW1iZXIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBudW1iZXIgPSBudW1iZXIudG9GaXhlZChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNpbmcgZGVjaW1hbFwiLCBudW1iZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPT09IDAgJiYgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApID09PSAwKSB7XG4gICAgICAgIG51bWJlciA9IGBSZXBlYXQgYWZ0ZXIgbWVgO1xuICAgICAgfVxuICAgICAgaWYgKGkgPT09IG1heCAtIDEgJiYgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApID09PSAwKSB7XG4gICAgICAgIG51bWJlciA9IGBUaGF0J3MgbnVtYmVyIHdhbmdgO1xuICAgICAgfVxuICAgICAgd29yZHMucHVzaChudW1iZXIpO1xuICAgIH1cbiAgICBpZiAod29yZHMubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBzYXkod29yZHMuam9pbihcIi4gXCIpLCB2b2ljZSwgcGl0Y2gsIHJhdGUpO1xuICAgIH1cbiAgICAvLyBhd2FpdCB3YWl0KDQwMCk7XG4gICAgbmV4dCgpO1xuICB9LCB3YWl0Rm9yKTtcbn1cblxubmV4dCgxMDAwKTtcbiJdfQ==