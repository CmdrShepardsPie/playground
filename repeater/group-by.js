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
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir),
        mkdir: util_1.promisify(_fs.mkdir)
    };
    const parseAsync = util_1.promisify(_csv.parse);
    const stringifyAsync = util_1.promisify(_csv.stringify);
    const repeater = {
        Location: '',
        Name: '',
        Frequency: '',
        Duplex: '',
        Offset: '',
        Tone: '',
        rToneFreq: '',
        cToneFreq: '',
        DtcsCode: '',
        DtcsRxCode: '',
        DtcsPolarity: 'NN',
        Mode: 'FM',
        TStep: 5,
        Comment: ''
    };
    async function combine() {
        const allData = [];
        console.log('Getting directory');
        const allFiles = (await fs.readdir('./repeaters/json')).filter(b => /\.json/.test(b));
        console.log('Reading files');
        await Promise.all(allFiles.map(async (file) => {
            const contents = await fs.readFile(`./repeaters/json/${file}`);
            const data = JSON.parse(contents.toString());
            allData.push(...data.map((d) => makeRow(d, 'Sponsor')));
            allData.push(...data.map((d) => makeRow(d, 'Affiliate')));
        }));
        console.log('Deduping');
        for (let x = 0; x < allData.length; x++) {
            const outer = JSON.stringify(allData[x]);
            for (let y = x + 1; y < allData.length; y++) {
                if (y === x) {
                    throw new Error('y === x');
                }
                const inner = JSON.stringify(allData[y]);
                if (inner === outer) {
                    allData.splice(y, 1);
                    y -= 1;
                }
            }
        }
        console.log('Reducing');
        const bigData = allData.reduce((prev, next) => {
            if (!prev[next.Comment]) {
                prev[next.Comment] = [];
            }
            prev[next.Comment].push(next);
            return prev;
        }, {});
        console.log('Grouping');
        const groups = Object.entries(bigData).map(entry => ({ name: entry[0], count: entry[1].length }));
        console.log('Sorting');
        groups.sort((a, b) => b.count - a.count);
        console.log(groups);
        const options = {
            header: true
        };
        console.log('Saving');
        if (!(await fs.exists(`chirp/csv/networks/`))) {
            await fs.mkdir(`chirp/csv/networks/`);
        }
        if (!(await fs.exists(`chirp/json/networks/`))) {
            await fs.mkdir(`chirp/json/networks/`);
        }
        await Promise.all(Object.entries(bigData).map(async (entry) => {
            const csv = await stringifyAsync(entry[1], options);
            return Promise.all([
                fs.writeFile(`chirp/csv/networks/${entry[0].replace(/\//g, ' ')}.csv`, csv),
                fs.writeFile(`chirp/json/networks/${entry[0].replace(/\//g, ' ')}.json`, JSON.stringify(entry[1]))
            ]);
        }));
    }
    function makeRow(item, comment) {
        const DTCS = /D(\d+)/;
        const isDigital = Object.entries(item).filter(a => /Enabled/.test(a[0])).length > 0;
        const isNarrow = Object.entries(item).filter(a => /Narrow/i.test(a[1])).length > 0;
        // const Location = 0;
        const Name = `${item.Call} ${item.Frequency}`;
        const Frequency = item.Frequency;
        const Duplex = item.Offset > 0 ? '+' : item.Offset < 0 ? '-' : '';
        const Offset = Math.abs(item.Offset);
        const UplinkTone = item['Uplink Tone'] || item.Tone;
        const DownlinkTone = item['Downlink Tone'];
        let cToneFreq = '';
        let rToneFreq = '';
        let DtcsCode = '';
        let DtcsRxCode = '';
        let Tone = '';
        const Mode = isDigital ? 'DIG' : isNarrow ? 'NFM' : 'FM';
        const Comment = `${item[comment]}`;
        if (typeof UplinkTone === 'number') {
            rToneFreq = UplinkTone;
            Tone = 'Tone';
        }
        else {
            const d = DTCS.exec(UplinkTone);
            if (d && d[1]) {
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
            if (d && d[1]) {
                const n = parseInt(d[1], 10);
                if (!isNaN(n)) {
                    DtcsRxCode = n;
                    Tone = 'DTCS';
                }
            }
        }
        if (Tone === 'TSQL' && rToneFreq !== cToneFreq) {
            if (!rToneFreq) {
                // console.log('No rToneFreq', Name, Frequency, rToneFreq, cToneFreq, Comment);
                // Tone = '';
            }
            else {
                // console.log('Cross', Name, Frequency, rToneFreq, cToneFreq, Comment);
                Tone = 'Cross';
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
            Comment
        };
        return row;
    }
    exports.default = combine();
});
//# sourceMappingURL=group-by.js.map