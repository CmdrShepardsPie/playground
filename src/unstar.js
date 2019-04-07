// function wait(ms, fn) {
//   return new Promise((resolve, reject) => {
//     setTimeout(async () => {
//       try {
//         resolve(fn && (await fn()));
//       } catch (e) {
//         reject(e);
//       }
//     }, ms);
//   });
// }
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
function doit() {
    return __awaiter(this, void 0, void 0, function () {
        var i, showMore, i, row, star;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 100000)) return [3 /*break*/, 4];
                    return [4 /*yield*/, wait(100)];
                case 2:
                    _a.sent();
                    showMore = document.querySelector(".show_more");
                    if (!showMore || showMore.classList.contains("ng-hide")) {
                        return [3 /*break*/, 4];
                    }
                    console.log("Show more");
                    showMore.click();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < 100000)) return [3 /*break*/, 8];
                    return [4 /*yield*/, wait(100)];
                case 6:
                    _a.sent();
                    row = document.querySelector(".episode_row");
                    if (!row) {
                        return [3 /*break*/, 8];
                    }
                    star = row.querySelector(".episode_star.is_starred");
                    if (star) {
                        console.log("Star: ", row.innerText.replace(/[\n\r]/g, "  "));
                        star.click();
                    }
                    row.parentNode.removeChild(row);
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function unstar() {
    return __awaiter(this, void 0, void 0, function () {
        var podcasts, _i, podcasts_1, podcast, i, nonstars;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    podcasts = document.querySelectorAll(".podcast").slice().reverse();
                    if (!(podcasts && podcasts.length)) return [3 /*break*/, 10];
                    _i = 0, podcasts_1 = podcasts;
                    _a.label = 1;
                case 1:
                    if (!(_i < podcasts_1.length)) return [3 /*break*/, 9];
                    podcast = podcasts_1[_i];
                    return [4 /*yield*/, wait(100)];
                case 2:
                    _a.sent();
                    console.log("Podcast: ", podcast.innerText.replace(/[\n\r]/g, "  "));
                    podcast.querySelector(".podcast_text").click();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < 100000)) return [3 /*break*/, 6];
                    return [4 /*yield*/, wait(100)];
                case 4:
                    _a.sent();
                    nonstars = document.querySelectorAll(".episode_star");
                    if (nonstars && nonstars.length) {
                        return [3 /*break*/, 6];
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, doit()];
                case 7:
                    _a.sent();
                    podcast.parentNode.removeChild(podcast);
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 1];
                case 9:
                    wait(10, unstar);
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
