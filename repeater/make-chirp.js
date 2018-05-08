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
    // const Frequency = /([-+]?\d+\.?\d*)/;
    // const CC = /CC(\d+)/;
    // const Tone = /(\d+\.?\d*)/;
    async function read(files, name, limit = 0, offset = 0, reSort, filter) {
        console.log('read', files, name, limit);
        const fileContents = await Promise.all(files.map(f => fs.readFile(`repeaters/json/${f}.json`)));
        let data = fileContents.reduce((prev, curr) => ([...prev, ...JSON.parse(curr.toString())]), []);
        data.sort((a, b) => (a.Mi - b.Mi));
        data = data.filter(a => a.Use === 'OPEN' && a['Op Status'] !== 'Off-Air');
        if (filter) {
            Object.entries(filter).forEach(e => {
                data = data.filter(a => new RegExp(e[1]).test(a[e[0]]));
            });
        }
        const nets = data
            .filter(d => !!d.Nets)
            .map(item => ({ Name: `${item.Call} ${item.Frequency}`, Location: `${item['ST/PR']} ${item.County} ${item.Location}`, Nets: item.Nets }));
        const mapped = data
            .map(d => makeRow(d))
            .filter(d => d.Mode !== 'DIG' && d.Frequency > 100 && d.Frequency < 500);
        let dupes = 0;
        for (let x = 0; x < mapped.length; x++) {
            const outer = JSON.stringify(mapped[x]);
            for (let y = x + 1; y < mapped.length; y++) {
                if (y === x) {
                    throw new Error('y === x');
                }
                const inner = JSON.stringify(mapped[y]);
                if (inner === outer) {
                    // console.log();
                    // console.log('Dupe', y, inner);
                    mapped.splice(y, 1);
                    y -= 1;
                    dupes += 1;
                }
            }
        }
        for (let x = 0; x < mapped.length; x++) {
            const outer = JSON.stringify(mapped[x]);
            for (let y = x + 1; y < mapped.length; y++) {
                if (y === x) {
                    throw new Error('y === x');
                }
                const inner = JSON.stringify(mapped[y]);
                if (inner === outer) {
                    console.log();
                    console.log('Dupe', y, inner);
                    mapped.splice(y, 1);
                    y -= 1;
                    dupes += 1;
                }
            }
        }
        console.log(name, 'Deduped', dupes);
        console.log(name, mapped.length);
        mapped.splice(limit);
        if (reSort) {
            mapped.sort((a, b) => a[reSort] > b[reSort] ? 1 : a[reSort] < b[reSort] ? -1 : 0);
        }
        mapped.forEach((m, i) => m.Location = i + offset);
        const options = {
            header: true
        };
        if (!(await fs.exists(`chirp/csv/${count}/`))) {
            await fs.mkdir(`chirp/csv/${count}/`);
        }
        if (!(await fs.exists(`chirp/json/${count}/`))) {
            await fs.mkdir(`chirp/json/${count}/`);
        }
        if (!(await fs.exists(`chirp/csv/nets/`))) {
            await fs.mkdir(`chirp/csv/nets/`);
        }
        if (!(await fs.exists(`chirp/json/nets/`))) {
            await fs.mkdir(`chirp/json/nets/`);
        }
        const netsCsv = await stringifyAsync(nets, options);
        await Promise.all([
            fs.writeFile(`chirp/csv/nets/${name}.csv`, netsCsv),
            fs.writeFile(`chirp/json/nets/${name}.json`, JSON.stringify(nets))
        ]);
        const csv = await stringifyAsync(mapped, options);
        return Promise.all([
            fs.writeFile(`chirp/csv/${count}/${name}.csv`, csv),
            fs.writeFile(`chirp/json/${count}/${name}.json`, JSON.stringify(mapped))
        ]);
    }
    exports.read = read;
    function makeRow(item) {
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
        const Comment = `${item['ST/PR']} ${item.County} ${item.Location} ${item.Call} ${item.Frequency}`;
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
    // const count = 128 - 57;
    const count = 200 - 57;
    const allIndividualFiles = fs.readdir('./repeaters/json')
        .then(files => Promise.all(files.map(f => {
        const name = f.replace('./repeaters/json', '').replace('.json', '');
        console.log('name', name);
        return read([name], `${name}`, count, 57, 'Comment');
    })));
    const allCombinedFiles = fs.readdir('./repeaters/json')
        .then(files => {
        const cities = files.map(f => f.replace('./repeaters/json', '').replace('.json', ''));
        return read(cities, `_all`, count, 57, 'Comment');
    });
    exports.default = (Promise.all([
        read([
            'Denver, CO',
            'Lakewood, CO',
            'Keystone, CO',
            'Breckenridge, CO',
            'Vail, CO',
            'Avon, CO',
            'Glenwood Springs, CO',
            'Rifle, CO',
            'Palisade, CO',
            'Grand Junction, CO',
            'Fruita, CO',
            'Thompson, UT',
            'Crescent Junction, UT',
            'Moab, UT'
        ], `_I-70`, count, 57, 'Comment'),
        read([
            'Denver, CO',
            'Buena Vista, CO',
            'Salida, CO',
            'Monarch, CO',
            'Gunnison, CO',
            'Montrose, CO',
            'Ouray, CO',
            'Naturita, CO',
            'La Sal, UT',
            'Moab, UT'
        ], `_US-50`, count, 57, 'Comment'),
        read([
            'Denver, CO',
            'Buena Vista, CO',
            'Salida, CO',
            'Saguache, CO',
            'Center, CO',
            'Del Norte, CO',
            'Pagosa Springs, CO',
            'Bayfield, CO',
            'Durango, CO',
            'Mancos, CO',
            'Dolores, CO',
            'Dove Creek, CO',
            'Monticello, UT',
            'Moab, UT'
        ], `_US-160`, count, 57, 'Comment'),
        read([
            'Denver, CO',
            'Moab, UT'
        ], `_Den-Moab`, count, 57, 'Comment'),
        allIndividualFiles,
        allCombinedFiles,
    ]));
});
//# sourceMappingURL=make-chirp.js.map