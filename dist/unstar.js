"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
        var e_1, _a, podcasts, podcasts_1, podcasts_1_1, podcast, i, nonstars, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    podcasts = __spread(document.querySelectorAll(".podcast")).reverse();
                    if (!(podcasts && podcasts.length)) return [3 /*break*/, 14];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, 12, 13]);
                    podcasts_1 = __values(podcasts), podcasts_1_1 = podcasts_1.next();
                    _b.label = 2;
                case 2:
                    if (!!podcasts_1_1.done) return [3 /*break*/, 10];
                    podcast = podcasts_1_1.value;
                    return [4 /*yield*/, wait(100)];
                case 3:
                    _b.sent();
                    console.log("Podcast: ", podcast.innerText.replace(/[\n\r]/g, "  "));
                    podcast.querySelector(".podcast_text").click();
                    i = 0;
                    _b.label = 4;
                case 4:
                    if (!(i < 100000)) return [3 /*break*/, 7];
                    return [4 /*yield*/, wait(100)];
                case 5:
                    _b.sent();
                    nonstars = document.querySelectorAll(".episode_star");
                    if (nonstars && nonstars.length) {
                        return [3 /*break*/, 7];
                    }
                    _b.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, doit()];
                case 8:
                    _b.sent();
                    podcast.parentNode.removeChild(podcast);
                    _b.label = 9;
                case 9:
                    podcasts_1_1 = podcasts_1.next();
                    return [3 /*break*/, 2];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (podcasts_1_1 && !podcasts_1_1.done && (_a = podcasts_1.return)) _a.call(podcasts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 13:
                    wait(10, unstar);
                    _b.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Vuc3Rhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQTBCO0FBQzFCLDhDQUE4QztBQUM5QywrQkFBK0I7QUFDL0IsY0FBYztBQUNkLHVDQUF1QztBQUN2QyxzQkFBc0I7QUFDdEIscUJBQXFCO0FBQ3JCLFVBQVU7QUFDVixjQUFjO0FBQ2QsUUFBUTtBQUNSLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVKLFNBQWUsSUFBSTs7Ozs7O29CQUNSLENBQUMsR0FBRyxDQUFDOzs7eUJBQUUsQ0FBQSxDQUFDLEdBQUcsTUFBTSxDQUFBO29CQUN4QixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUFmLFNBQWUsQ0FBQztvQkFDVixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDdkQsd0JBQU07cUJBQ1A7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7b0JBUFMsQ0FBQyxFQUFFLENBQUE7OztvQkFVdEIsQ0FBQyxHQUFHLENBQUM7Ozt5QkFBRSxDQUFBLENBQUMsR0FBRyxNQUFNLENBQUE7b0JBQ3hCLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQTs7b0JBQWYsU0FBZSxDQUFDO29CQUNWLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNSLHdCQUFNO3FCQUNQO29CQUNLLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzNELElBQUksSUFBSSxFQUFFO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUM5RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ2Q7b0JBQ0QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7OztvQkFYTixDQUFDLEVBQUUsQ0FBQTs7Ozs7O0NBYWhDO0FBRUQsU0FBZSxNQUFNOzs7Ozs7b0JBQ2IsUUFBUSxHQUFHLFNBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDO3lCQUNsRSxDQUFBLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFBLEVBQTNCLHlCQUEyQjs7OztvQkFFUCxhQUFBLFNBQUEsUUFBUSxDQUFBOzs7O29CQUFuQixPQUFPO29CQUNoQixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUFmLFNBQWUsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLE9BQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXRDLENBQUMsR0FBRyxDQUFDOzs7eUJBQUUsQ0FBQSxDQUFDLEdBQUcsTUFBTSxDQUFBO29CQUN4QixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUFmLFNBQWUsQ0FBQztvQkFDVixRQUFRLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM1RCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO3dCQUMvQix3QkFBTTtxQkFDUDs7O29CQUx5QixDQUFDLEVBQUUsQ0FBQTs7d0JBUS9CLHFCQUFNLElBQUksRUFBRSxFQUFBOztvQkFBWixTQUFZLENBQUM7b0JBRWIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUUxQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Q0FFcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmdW5jdGlvbiB3YWl0KG1zLCBmbikge1xuLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy8gICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuLy8gICAgICAgdHJ5IHtcbi8vICAgICAgICAgcmVzb2x2ZShmbiAmJiAoYXdhaXQgZm4oKSkpO1xuLy8gICAgICAgfSBjYXRjaCAoZSkge1xuLy8gICAgICAgICByZWplY3QoZSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSwgbXMpO1xuLy8gICB9KTtcbi8vIH1cblxuYXN5bmMgZnVuY3Rpb24gZG9pdCgpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwMDA7IGkrKykge1xuICAgIGF3YWl0IHdhaXQoMTAwKTtcbiAgICBjb25zdCBzaG93TW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hvd19tb3JlXCIpO1xuICAgIGlmICghc2hvd01vcmUgfHwgc2hvd01vcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmctaGlkZVwiKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiU2hvdyBtb3JlXCIpO1xuICAgIHNob3dNb3JlLmNsaWNrKCk7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDAwMDsgaSsrKSB7XG4gICAgYXdhaXQgd2FpdCgxMDApO1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXBpc29kZV9yb3dcIik7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBzdGFyID0gcm93LnF1ZXJ5U2VsZWN0b3IoXCIuZXBpc29kZV9zdGFyLmlzX3N0YXJyZWRcIik7XG4gICAgaWYgKHN0YXIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhcjogXCIsIHJvdy5pbm5lclRleHQucmVwbGFjZSgvW1xcblxccl0vZywgXCIgIFwiKSk7XG4gICAgICBzdGFyLmNsaWNrKCk7XG4gICAgfVxuICAgIHJvdy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvdyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdW5zdGFyKCkge1xuICBjb25zdCBwb2RjYXN0cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvZGNhc3RcIildLnJldmVyc2UoKTtcbiAgaWYgKHBvZGNhc3RzICYmIHBvZGNhc3RzLmxlbmd0aCkge1xuXG4gICAgZm9yIChjb25zdCBwb2RjYXN0IG9mIHBvZGNhc3RzKSB7XG4gICAgICBhd2FpdCB3YWl0KDEwMCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlBvZGNhc3Q6IFwiLCBwb2RjYXN0LmlubmVyVGV4dC5yZXBsYWNlKC9bXFxuXFxyXS9nLCBcIiAgXCIpKTtcbiAgICAgIHBvZGNhc3QucXVlcnlTZWxlY3RvcihcIi5wb2RjYXN0X3RleHRcIikuY2xpY2soKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwMDA7IGkrKykge1xuICAgICAgICBhd2FpdCB3YWl0KDEwMCk7XG4gICAgICAgIGNvbnN0IG5vbnN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lcGlzb2RlX3N0YXJcIik7XG4gICAgICAgIGlmIChub25zdGFycyAmJiBub25zdGFycy5sZW5ndGgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBkb2l0KCk7XG5cbiAgICAgIHBvZGNhc3QucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwb2RjYXN0KTtcbiAgICB9XG4gICAgd2FpdCgxMCwgdW5zdGFyKTtcbiAgfVxufVxuIl19