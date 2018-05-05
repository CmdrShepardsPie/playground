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
    // import * as data from './repeaters/json/Denver, CO.json';
    const fs = {
        exists: util_1.promisify(_fs.exists),
        writeFile: util_1.promisify(_fs.writeFile),
        readFile: util_1.promisify(_fs.readFile)
    };
    const parseAsync = util_1.promisify(_csv.parse);
    const stringifyAsync = util_1.promisify(_csv.stringify);
    const repeater = {
        Location: 0,
        Name: '',
        Frequency: 0,
        Duplex: '',
        Offset: 0,
        Tone: '',
        rToneFreq: 0,
        // cToneFreq: 0,
        DtcsCode: 0,
        DtcsRxCode: 0,
        DtcsPolarity: 'NN',
        Mode: 'FM',
        TStep: 5,
        Comment: ''
    };
    // const Frequency = /([-+]?\d+\.?\d*)/;
    // const CC = /CC(\d+)/;
    // const Tone = /(\d+\.?\d*)/;
    async function read(file) {
        console.log('read', file);
        const contents = await fs.readFile(`repeaters/json/${file}.json`);
        const data = JSON.parse(contents.toString());
        const mapped = data.map((d) => makeRow(d));
        mapped.forEach((m, i) => m.Location = i);
        const options = {
            header: true
        };
        const csv = await stringifyAsync(mapped, options);
        return Promise.all([
            fs.writeFile(`chirp/csv/${file}.csv`, csv),
            fs.writeFile(`chirp/json/${file}.json`, JSON.stringify(mapped))
        ]);
    }
    exports.read = read;
    function makeRow(item) {
        const DTCS = /D(\d+)/;
        // const Location = 0;
        const Name = item.Call;
        const Frequency = item.Frequency;
        const Duplex = item.Offset > 0 ? '+' : item.Offset < 0 ? '-' : '';
        const Offset = Math.abs(item.Offset);
        const UplinkTone = item['Uplink Tone'];
        const DownlinkTone = item['Downlink Tone'];
        let cToneFreq = 0;
        let rToneFreq = 0;
        let DtcsCode = 0;
        let DtcsRxCode = 0;
        let Tone = '';
        const Mode = 'FM';
        if (typeof UplinkTone === 'number') {
            rToneFreq = UplinkTone;
            Tone = 'Tone';
        }
        else {
            const d = DTCS.exec(UplinkTone);
            if (d) {
                const n = parseInt(d[1], 10);
                if (!isNaN(n)) {
                    DtcsCode = n;
                    Tone = 'DTCS';
                }
            }
        }
        if (typeof DownlinkTone === 'number') {
            cToneFreq = DownlinkTone;
            Tone = 'TSQL';
        }
        else {
            const d = DTCS.exec(DownlinkTone);
            if (d) {
                const n = parseInt(d[1], 10);
                if (!isNaN(n)) {
                    DtcsRxCode = n;
                    Tone = 'DTCS';
                }
            }
        }
        cToneFreq = cToneFreq || 88.5;
        rToneFreq = rToneFreq || 88.5;
        DtcsCode = DtcsCode || 23;
        DtcsRxCode = DtcsRxCode || 23;
        const row = {
            ...repeater,
            // Location,
            Name,
            Frequency,
            Duplex,
            Offset,
            rToneFreq,
            cToneFreq,
            DtcsCode,
            DtcsRxCode,
            Tone,
            Mode,
        };
        return row;
    }
    exports.default = (async () => read('Denver, CO'))();
});
//# sourceMappingURL=make-chirp.js.map