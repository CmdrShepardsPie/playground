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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const _csv = __importStar(require("csv"));
    const _fs = __importStar(require("fs"));
    const util_1 = require("util");
    const fs = {
        exists: util_1.promisify(_fs.exists),
        writeFile: util_1.promisify(_fs.writeFile),
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir),
        mkdir: util_1.promisify(_fs.mkdir),
    };
    const parseAsync = util_1.promisify(_csv.parse);
    const stringifyAsync = util_1.promisify(_csv.stringify);
    const baseChirp = {
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
        .then(async (files) => {
        const contents = await Promise.all(files.filter((b) => /\.json/.test(b)).map((f) => fs.readFile(`./${f}`)));
        const data = contents.reduce((prev, next) => {
            return [...prev, ...JSON.parse(next.toString())];
        }, []);
        data.sort((a, b) => a.Frequency - b.Frequency);
        let lastIndex = 0, lastFreq = 0;
        const chirpList = data.map((station, i) => {
            const freqRound = Math.floor(station.Frequency - 100);
            if (freqRound - lastFreq > 1) {
                lastFreq = freqRound;
                lastIndex = i;
            }
            const shortIndex = ((i - lastIndex) + 1).toString();
            // if (shortIndex.length > 1) {
            //   shortIndex = shortIndex[1];
            // }
            const name = station.Frequency.toString().replace(".", "");
            const Name = `${name}`;
            const chirp = {
                ...baseChirp,
                Location: i,
                Frequency: station.Frequency,
                Name: `${station.Name ? station.Name.substring(0, 1) : shortIndex} ${Name}`,
            };
            return chirp;
        });
        const options = {
            header: true,
        };
        const chirpCsv = await stringifyAsync(chirpList, options);
        return fs.writeFile(`./simplex.csv`, chirpCsv);
    });
});
