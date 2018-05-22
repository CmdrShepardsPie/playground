var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    const _csv = require("csv");
    const _fs = require("fs");
    const util_1 = require("util");
    const fs = {
        exists: util_1.promisify(_fs.exists),
        writeFile: util_1.promisify(_fs.writeFile),
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir),
        mkdir: util_1.promisify(_fs.mkdir)
    };
    const parseAsync = util_1.promisify(_csv.parse);
    const stringifyAsync = util_1.promisify(_csv.stringify);
    const baseChirp = {
        Location: -1,
        Name: '',
        Frequency: 0,
        Duplex: '',
        Offset: 0,
        Tone: '',
        rToneFreq: 88.5,
        cToneFreq: 88.5,
        DtcsCode: 23,
        DtcsRxCode: 23,
        DtcsPolarity: 'NN',
        Mode: 'FM',
        TStep: 5,
        Comment: ''
    };
    exports.default = fs.readdir('./')
        .then((files) => __awaiter(this, void 0, void 0, function* () {
        const contents = yield Promise.all(files.filter(b => /\.json/.test(b)).map(f => fs.readFile(`./${f}`)));
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
            let shortIndex = ((i - lastIndex) + 1).toString();
            // if (shortIndex.length > 1) {
            //   shortIndex = shortIndex[1];
            // }
            const name = station.Frequency.toString().replace('.', '');
            const Name = `${name}`;
            const chirp = Object.assign({}, baseChirp, { Location: i, Frequency: station.Frequency, Name: `${station.Name ? station.Name.substring(0, 1) : shortIndex} ${Name}` });
            return chirp;
        });
        const options = {
            header: true,
        };
        const chirpCsv = yield stringifyAsync(chirpList, options);
        return fs.writeFile(`./simplex.csv`, chirpCsv);
    }));
});
//# sourceMappingURL=make-chirp.js.map