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
                        return prev.concat(JSON.parse(next.toString()));
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
