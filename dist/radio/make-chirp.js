var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "csv", "fs", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var _csv = require("csv");
    var _fs = require("fs");
    var util_1 = require("util");
    var fs = {
        exists: util_1.promisify(_fs.exists),
        writeFile: util_1.promisify(_fs.writeFile),
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir),
        mkdir: util_1.promisify(_fs.mkdir),
    };
    var parseAsync = util_1.promisify(_csv.parse);
    var stringifyAsync = util_1.promisify(_csv.stringify);
    var baseChirp = {
        Location: -1,
        Name: "",
        Frequency: 0,
        Duplex: "",
        Offset: 0,
        Tone: "",
        rToneFreq: 88.5,
        cToneFreq: 88.5,
        DtcsCode: 23,
        DtcsRxCode: 23,
        DtcsPolarity: "NN",
        Mode: "FM",
        TStep: 5,
        Comment: "",
    };
    exports.default = fs.readdir("./")
        .then(function (files) { return __awaiter(_this, void 0, void 0, function () {
        var contents, data, lastIndex, lastFreq, chirpList, options, chirpCsv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(files.filter(function (b) { return /\.json/.test(b); }).map(function (f) { return fs.readFile("./" + f); }))];
                case 1:
                    contents = _a.sent();
                    data = contents.reduce(function (prev, next) {
                        return __spread(prev, JSON.parse(next.toString()));
                    }, []);
                    data.sort(function (a, b) { return a.Frequency - b.Frequency; });
                    lastIndex = 0, lastFreq = 0;
                    chirpList = data.map(function (station, i) {
                        var freqRound = Math.floor(station.Frequency - 100);
                        if (freqRound - lastFreq > 1) {
                            lastFreq = freqRound;
                            lastIndex = i;
                        }
                        var shortIndex = ((i - lastIndex) + 1).toString();
                        // if (shortIndex.length > 1) {
                        //   shortIndex = shortIndex[1];
                        // }
                        var name = station.Frequency.toString().replace(".", "");
                        var Name = "" + name;
                        var chirp = __assign({}, baseChirp, { Location: i, Frequency: station.Frequency, Name: (station.Name ? station.Name.substring(0, 1) : shortIndex) + " " + Name });
                        return chirp;
                    });
                    options = {
                        header: true,
                    };
                    return [4 /*yield*/, stringifyAsync(chirpList, options)];
                case 2:
                    chirpCsv = _a.sent();
                    return [2 /*return*/, fs.writeFile("./simplex.csv", chirpCsv)];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS1jaGlycC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yYWRpby9tYWtlLWNoaXJwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxpQkE4RkE7O0lBOUZBLDBCQUE0QjtJQUM1Qix3QkFBMEI7SUFDMUIsNkJBQWlDO0lBRWpDLElBQU0sRUFBRSxHQUFHO1FBQ1QsTUFBTSxFQUFFLGdCQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUM3QixTQUFTLEVBQUUsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ25DLFFBQVEsRUFBRSxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxFQUFFLGdCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMvQixLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0tBQzVCLENBQUM7SUFFRixJQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQXlCakQsSUFBTSxTQUFTLEdBQVc7UUFDeEIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLENBQUM7UUFDWixNQUFNLEVBQUUsRUFBRTtRQUNWLE1BQU0sRUFBRSxDQUFDO1FBQ1QsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxJQUFJO1FBQ2YsUUFBUSxFQUFFLEVBQUU7UUFDWixVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRSxJQUFJO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7SUFFRixrQkFBZSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUM1QixJQUFJLENBQUMsVUFBTyxLQUFLOzs7O3dCQUNDLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQUssQ0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxFQUFBOztvQkFBckcsUUFBUSxHQUFHLFNBQTBGO29CQUNyRyxJQUFJLEdBQWUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJO3dCQUNsRCxnQkFBWSxJQUFJLEVBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRztvQkFDckQsQ0FBQyxFQUFFLEVBQWdCLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQXpCLENBQXlCLENBQUMsQ0FBQztvQkFDM0MsU0FBUyxHQUFHLENBQUMsRUFDZixRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNULFNBQVMsR0FBYSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzlDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsSUFBSSxTQUFTLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRTs0QkFDNUIsUUFBUSxHQUFHLFNBQVMsQ0FBQzs0QkFDckIsU0FBUyxHQUFHLENBQUMsQ0FBQzt5QkFDZjt3QkFDRCxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNwRCwrQkFBK0I7d0JBQy9CLGdDQUFnQzt3QkFDaEMsSUFBSTt3QkFDSixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzNELElBQU0sSUFBSSxHQUFHLEtBQUcsSUFBTSxDQUFDO3dCQUN2QixJQUFNLEtBQUssZ0JBQ04sU0FBUyxJQUNaLFFBQVEsRUFBRSxDQUFDLEVBQ1gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQzVCLElBQUksRUFBRSxDQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxVQUFJLElBQU0sR0FDNUUsQ0FBQzt3QkFDRixPQUFPLEtBQUssQ0FBQztvQkFDZixDQUFDLENBQUMsQ0FBQztvQkFFRyxPQUFPLEdBQUc7d0JBQ2QsTUFBTSxFQUFFLElBQUk7cUJBRWIsQ0FBQztvQkFFZSxxQkFBTSxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFBOztvQkFBbkQsUUFBUSxHQUFHLFNBQXdDO29CQUV6RCxzQkFBTyxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsRUFBQzs7O1NBQ2hELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9jc3YgZnJvbSBcImNzdlwiO1xuaW1wb3J0ICogYXMgX2ZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcInV0aWxcIjtcblxuY29uc3QgZnMgPSB7XG4gIGV4aXN0czogcHJvbWlzaWZ5KF9mcy5leGlzdHMpLFxuICB3cml0ZUZpbGU6IHByb21pc2lmeShfZnMud3JpdGVGaWxlKSxcbiAgcmVhZEZpbGU6IHByb21pc2lmeShfZnMucmVhZEZpbGUpLFxuICByZWFkZGlyOiBwcm9taXNpZnkoX2ZzLnJlYWRkaXIpLFxuICBta2RpcjogcHJvbWlzaWZ5KF9mcy5ta2RpciksXG59O1xuXG5jb25zdCBwYXJzZUFzeW5jID0gcHJvbWlzaWZ5KF9jc3YucGFyc2UpO1xuY29uc3Qgc3RyaW5naWZ5QXN5bmMgPSBwcm9taXNpZnkoX2Nzdi5zdHJpbmdpZnkpO1xuXG5pbnRlcmZhY2UgSUNoaXJwIHtcbiAgTG9jYXRpb246IG51bWJlcjtcbiAgTmFtZTogc3RyaW5nO1xuICBGcmVxdWVuY3k6IG51bWJlcjtcbiAgRHVwbGV4OiBzdHJpbmc7XG4gIE9mZnNldDogbnVtYmVyO1xuICBUb25lOiBzdHJpbmc7XG4gIHJUb25lRnJlcTogbnVtYmVyO1xuICBjVG9uZUZyZXE6IG51bWJlcjtcbiAgRHRjc0NvZGU6IG51bWJlcjtcbiAgRHRjc1J4Q29kZTogbnVtYmVyO1xuICBEdGNzUG9sYXJpdHk6IHN0cmluZztcbiAgTW9kZTogc3RyaW5nO1xuICBUU3RlcDogbnVtYmVyO1xuICBDb21tZW50OiBzdHJpbmc7XG4gIFtpbmRleDogc3RyaW5nXTogYW55O1xufVxuXG5pbnRlcmZhY2UgSVN0YXRpb24ge1xuICBGcmVxdWVuY3k6IG51bWJlcjtcbiAgTmFtZT86IHN0cmluZztcbn1cblxuY29uc3QgYmFzZUNoaXJwOiBJQ2hpcnAgPSB7XG4gIExvY2F0aW9uOiAtMSxcbiAgTmFtZTogXCJcIixcbiAgRnJlcXVlbmN5OiAwLFxuICBEdXBsZXg6IFwiXCIsXG4gIE9mZnNldDogMCxcbiAgVG9uZTogXCJcIixcbiAgclRvbmVGcmVxOiA4OC41LFxuICBjVG9uZUZyZXE6IDg4LjUsXG4gIER0Y3NDb2RlOiAyMyxcbiAgRHRjc1J4Q29kZTogMjMsXG4gIER0Y3NQb2xhcml0eTogXCJOTlwiLFxuICBNb2RlOiBcIkZNXCIsXG4gIFRTdGVwOiA1LFxuICBDb21tZW50OiBcIlwiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnMucmVhZGRpcihcIi4vXCIpXG4gIC50aGVuKGFzeW5jIChmaWxlcykgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoZmlsZXMuZmlsdGVyKChiKSA9PiAvXFwuanNvbi8udGVzdChiKSkubWFwKChmKSA9PiBmcy5yZWFkRmlsZShgLi8ke2Z9YCkpKTtcbiAgICBjb25zdCBkYXRhOiBJU3RhdGlvbltdID0gY29udGVudHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PiB7XG4gICAgICByZXR1cm4gWyAuLi5wcmV2LCAuLi5KU09OLnBhcnNlKG5leHQudG9TdHJpbmcoKSkgXTtcbiAgICB9LCBbXSBhcyBJU3RhdGlvbltdKTtcbiAgICBkYXRhLnNvcnQoKGEsIGIpID0+IGEuRnJlcXVlbmN5IC0gYi5GcmVxdWVuY3kpO1xuICAgIGxldCBsYXN0SW5kZXggPSAwLFxuICAgICAgbGFzdEZyZXEgPSAwO1xuICAgIGNvbnN0IGNoaXJwTGlzdDogSUNoaXJwW10gPSBkYXRhLm1hcCgoc3RhdGlvbiwgaSkgPT4ge1xuICAgICAgY29uc3QgZnJlcVJvdW5kID0gTWF0aC5mbG9vcihzdGF0aW9uLkZyZXF1ZW5jeSAtIDEwMCk7XG4gICAgICBpZiAoZnJlcVJvdW5kIC0gbGFzdEZyZXEgPiAxKSB7XG4gICAgICAgIGxhc3RGcmVxID0gZnJlcVJvdW5kO1xuICAgICAgICBsYXN0SW5kZXggPSBpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2hvcnRJbmRleCA9ICgoaSAtIGxhc3RJbmRleCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgLy8gaWYgKHNob3J0SW5kZXgubGVuZ3RoID4gMSkge1xuICAgICAgLy8gICBzaG9ydEluZGV4ID0gc2hvcnRJbmRleFsxXTtcbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IG5hbWUgPSBzdGF0aW9uLkZyZXF1ZW5jeS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpO1xuICAgICAgY29uc3QgTmFtZSA9IGAke25hbWV9YDtcbiAgICAgIGNvbnN0IGNoaXJwOiBJQ2hpcnAgPSB7XG4gICAgICAgIC4uLmJhc2VDaGlycCxcbiAgICAgICAgTG9jYXRpb246IGksXG4gICAgICAgIEZyZXF1ZW5jeTogc3RhdGlvbi5GcmVxdWVuY3ksXG4gICAgICAgIE5hbWU6IGAke3N0YXRpb24uTmFtZSA/IHN0YXRpb24uTmFtZS5zdWJzdHJpbmcoMCwgMSkgOiBzaG9ydEluZGV4fSAke05hbWV9YCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gY2hpcnA7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgaGVhZGVyOiB0cnVlLFxuXG4gICAgfTtcblxuICAgIGNvbnN0IGNoaXJwQ3N2ID0gYXdhaXQgc3RyaW5naWZ5QXN5bmMoY2hpcnBMaXN0LCBvcHRpb25zKTtcblxuICAgIHJldHVybiBmcy53cml0ZUZpbGUoYC4vc2ltcGxleC5jc3ZgLCBjaGlycENzdik7XG4gIH0pO1xuIl19