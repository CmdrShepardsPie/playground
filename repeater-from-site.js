(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "csv-stringify/lib/sync", "fs", "jsdom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const axios_1 = require("axios");
    const stringify = require("csv-stringify/lib/sync");
    const fs = require("fs");
    const jsdom_1 = require("jsdom");
    const Frequency = /([-+]?\d+\.?\d*)/;
    const CC = /CC(\d+)/;
    const DTSC = /D(\d+)/;
    const Tone = /(\d+\.?\d*)/;
    const cache = {};
    const options = {
        header: true
    };
    async function getit(cityOrZip, distance, allData = [], fileName, limit) {
        // console.log('getit');
        const routeUrl = `https://www.repeaterbook.com/repeaters/TravelSearch.php?region=US&route=${encodeURIComponent(cityOrZip.toString())}&state_id=08&band=%25&order=freq`;
        const proximityUrl = ;
        const page = await axios_1.default.get(proximityUrl);
        const dom = new jsdom_1.JSDOM(page.data);
        await getListTables(dom, cityOrZip, allData, fileName);
        if (limit) {
            allData.splice(limit);
            allData.sort((a, b) => a.Distance - b.Distance);
            allData.sort((a, b) => a.Frequency - b.Frequency);
            allData.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0);
            allData.forEach((d, i) => {
                d.Location = i;
            });
            fs.writeFileSync(`./repeater-data/repeaters-${fileName || cityOrZip}-${limit}.csv`, stringify(allData, options));
        }
    }
    async function getListTables(dom, cityOrZip, allData, fileName) {
        // console.log('getListTables', dom);
        const tables = dom.window.document.querySelectorAll('table.w3-table.w3-striped.w3-responsive');
        for (const table of tables) {
            await getTableRows(table, cityOrZip, allData, fileName);
        }
    }
    async function getTableRows(table, cityOrZip, allData, fileName) {
        // console.log('getTableRows', table);
        const rows = [...table.querySelectorAll('tbody > tr')];
        for (const row of rows) {
            await getRowCells(row, cityOrZip, allData, fileName);
        }
    }
    async function getRowCells(row, cityOrZip, allData, fileName) {
        if (!row) {
            return;
        }
        // console.log('getRowCells', row);
        const cells = row.querySelectorAll('td');
        const first = cells[0];
        const miles = cells[8];
        if (first) {
            let distance = 0;
            if (miles) {
                distance = getNumber(Tone, getText(miles));
            }
            const anchor = first.querySelector('a');
            if (anchor) {
                const href = anchor.href;
                await getNewPage(href, distance, cityOrZip, allData, fileName);
            }
        }
    }
    async function getNewPage(href, distance, cityOrZip, allData, fileName) {
        console.log();
        // console.log('getNewPage', href);
        const cached = cache[href];
        let dom;
        if (cached) {
            console.log('Got cache', href);
            dom = cached;
        }
        else {
            const page = await axios_1.default.get(`https://www.repeaterbook.com/repeaters/${href}`);
            dom = new jsdom_1.JSDOM(page.data);
            cache[href] = dom;
            console.log('Stored cache', href);
        }
        const data = {
            Location: allData.length + 1,
            Name: '',
            Frequency: 0,
            Duplex: '',
            Offset: 0,
            Tone: '',
            rToneFreq: 0,
            cToneFreq: 0,
            DtcsCode: 0,
            DtscRxCode: 0,
            DtcsPolarity: 'NN',
            Mode: 'FM',
            TStep: 5,
            Comment: '',
            Distance: distance
        };
        Object.assign(data, await getInnerTables(dom, data));
        if (data.rToneFreq) {
            data.Tone = 'Tone';
        }
        else {
            data.rToneFreq = 88.5;
        }
        if (data.cToneFreq) {
            data.Tone = 'TSQL';
        }
        else {
            data.cToneFreq = 88.5;
        }
        if (data.DtcsCode) {
            data.Tone = 'DTCS';
        }
        else {
            data.DtcsCode = 23;
        }
        if (data.DtscRxCode) {
            data.Tone = 'DTCS';
        }
        else {
            data.DtscRxCode = data.DtcsCode;
        }
        // const allCaps = /[A-Z0-9]{2,}/;
        const testCaps = /[A-Z]/g;
        const makeCaps = /[A-Z0-9]/g;
        function getName(val) {
            if (val) {
                if (testCaps.test(val)) {
                    const match = val.match(makeCaps);
                    if (match && match.length) {
                        const join = match.join('');
                        if (join && join.length > 1) {
                            if (join.length > 4 && join.substring(0, join.length / 2) === join.substring(join.length / 2)) {
                                return join.substring(0, join.length / 2);
                            }
                            return join;
                        }
                    }
                }
            }
        }
        const source = getName(data['Web Links']) ||
            getName(data['Web links']) ||
            getName(data.Affiliate) ||
            getName(data.Sponsor);
        data.Name = source || data.Call;
        if (data.Name) {
            data.Name = data.Name + ' ';
        }
        data.Name = data.Name + data.Frequency.toFixed(3);
        let find = 
        //   false;
        // /*
        allData.find(item => item.Name === data.Name &&
            item.Frequency === data.Frequency &&
            item.Duplex === data.Duplex &&
            item.Offset === data.Offset &&
            item.Tone === data.Tone &&
            item.rToneFreq === data.rToneFreq &&
            item.cToneFreq === data.cToneFreq &&
            item.DtcsCode === data.DtcsCode &&
            item.DtscRxCode === data.DtscRxCode &&
            item.Mode === data.Mode);
        // */
        if (find) {
            console.log('Dupe found', cityOrZip);
            console.log(JSON.stringify(find));
        }
        if (find && data.Distance < find.Distance) {
            const index = allData.indexOf(find);
            console.log(`Dupe is further away (${data.Distance}/${find.Distance}) (${index}/${allData.length})`, cityOrZip);
            allData.splice(index, 1);
            find = undefined;
        }
        data.Comment = data.Comment.replace(/\n{2,}/g, '\n');
        data.Comment = data.Comment.replace(/ {2,}/g, ' ');
        if (!find) {
            allData.push(data);
            allData.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0);
            allData.sort((a, b) => a.Frequency - b.Frequency);
            allData.sort((a, b) => a.Distance - b.Distance);
            const columns = {};
            allData.forEach((d, i) => {
                Object.entries(d).forEach(entry => {
                    const key = entry[0];
                    columns[key] = '';
                });
                d.Location = i;
            });
            allData.forEach((d, i) => {
                allData[i] = { ...columns, ...d };
            });
            console.log(`Adding (${allData.length})`, cityOrZip);
            console.log(JSON.stringify(data));
            fs.writeFileSync(`./repeater-data/repeaters-${fileName || cityOrZip}.csv`, stringify(allData, options));
        }
    }
    async function getInnerTables(dom, data) {
        // console.log('getInnerTables', dom);
        const tables = dom.window.document.querySelectorAll('table.w3-table.w3-responsive');
        // const data: IRepeater = {} as IRepeater;
        Object.assign(data, await getInnerRows(tables[0], data));
        // for (const table of tables) {
        //   Object.assign(data, await getInnerRows(table, data));
        // }
        return data;
    }
    async function getInnerRows(table, data) {
        // console.log('getInnerRows', table);
        const rows = table.querySelectorAll('tbody > tr');
        // const data: IRepeater = {} as IRepeater;
        for (const row of rows) {
            Object.assign(data, await getInnerCells(row, data));
        }
        return data;
    }
    async function getInnerCells(row, data) {
        // console.log('getInnerCells', row);
        const cells = row.querySelectorAll('td');
        // const data: IRepeater = {} as IRepeater;
        const name = getText(cells[0]);
        const value = getText(cells[1]);
        const split = name.split(':');
        split[0] = split[0] && split[0].trim();
        split[1] = split[1] && split[1].trim();
        data[split[0] || name.replace(':', '')] = split[1] || value;
        // console.log(name, value);
        switch (name) {
            case 'Downlink:':
                data.Frequency = getNumber(Frequency, value);
                break;
            case 'Offset:':
                const num = getNumber(Frequency, value);
                if (num > 0) {
                    data.Duplex = '+';
                    data.Offset = num;
                }
                else if (num < 0) {
                    data.Duplex = '-';
                    data.Offset = Math.abs(num);
                }
                break;
            case 'Uplink Tone:': {
                const t = getNumber(Tone, value);
                const d = getNumber(DTSC, value);
                const c = getNumber(CC, value);
                if (!d && !c) {
                    data.rToneFreq = t;
                }
                else if (d && !c) {
                    data.DtcsCode = d;
                }
                break;
            }
            case 'Downlink Tone:': {
                const t = getNumber(Tone, value);
                const d = getNumber(DTSC, value);
                const c = getNumber(CC, value);
                if (!d && !c) {
                    data.cToneFreq = t;
                }
                else if (d && !c) {
                    data.DtscRxCode = d;
                }
                break;
            }
            case 'D-STAR Enabled':
            case 'DMR Enabled':
            case 'YSF Digital Enabled':
                data.Mode = 'DIG';
                break;
        }
        return data;
    }
    const totalRepeaters = [];
    async function start() {
        // await getit('Colorado Springs, CO', 50);
        // await getit('Monument, CO', 50);
        // await getit('Larkspur, CO', 50);
        // await getit('Castle Rock, CO', 50);
        // await getit('Centennial, CO', 50);
        // await getit('Denver, CO', 50);
        await getit('Colorado Springs, CO', 100, totalRepeaters, 'cos-den', 200 - 56);
        await getit('Denver, CO', 100, totalRepeaters, 'cos-den', 200 - 56);
        await getit('Colorado Springs, CO', 100, totalRepeaters, 'cos-den', 128 - 56);
        await getit('Denver, CO', 100, totalRepeaters, 'cos-den', 128 - 56);
    }
    exports.default = start();
});
//# sourceMappingURL=repeater-from-site.js.map