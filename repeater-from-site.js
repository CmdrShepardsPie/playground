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
    function getNumber(reg, text) {
        if (text && text.match) {
            const match = text.match(reg) || [];
            return parseFloat(match[match.length - 1]);
        }
        return 0;
    }
    function getText(el) {
        let text = el.innerHTML;
        if (text) {
            text = text.replace(/<[^>]*>/g, '');
            return text.trim();
        }
        return '';
    }
    function wait(ms, fn) {
        // console.log('wait', ms);
        return new Promise((resolve, reject) => {
            window.setTimeout(async () => {
                try {
                    resolve(fn && await fn());
                }
                catch (e) {
                    reject(e);
                }
            }, ms);
        });
    }
    async function getit(cityOrZip, distance, allData = [], fileName) {
        // console.log('getit');
        const page = await axios_1.default.get(`https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(cityOrZip.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`);
        const dom = new jsdom_1.JSDOM(page.data);
        await getListTables(dom, cityOrZip, allData, fileName);
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
        // console.log('getNewPage', href);
        const page = await axios_1.default.get(`https://www.repeaterbook.com/repeaters/${href}`);
        const dom = new jsdom_1.JSDOM(page.data);
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
        console.log();
        let find = 
        // false;
        // /*
        allData.find(item => 
        // item.Name === data.Name &&
        item.Frequency === data.Frequency &&
            item.Duplex === data.Duplex &&
            item.Offset === data.Offset &&
            item.Tone === data.Tone &&
            item.rToneFreq === data.rToneFreq &&
            item.cToneFreq === data.cToneFreq &&
            item.DtcsCode === data.DtcsCode &&
            item.DtscRxCode === data.DtscRxCode &&
            item.Mode === data.Mode);
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
        // */
        if (!find) {
            allData.push(data);
            allData.sort((a, b) => a.Distance - b.Distance);
            allData.forEach((d, i) => d.Location = i);
            console.log(`Adding (${allData.length})`, cityOrZip);
            console.log(JSON.stringify(data));
            const options = {
                header: true
            };
            fs.writeFileSync(`./repeater-data/repeaters-${fileName || cityOrZip}.csv`, stringify(allData, options));
        }
    }
    async function getInnerTables(dom, data) {
        // console.log('getInnerTables', dom);
        const tables = dom.window.document.querySelectorAll('table.w3-table.w3-responsive');
        // const data: IRepeater = {} as IRepeater;
        for (const table of tables) {
            Object.assign(data, await getInnerRows(table, data));
        }
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
        if (cells[0] && cells[1]) {
            const name = getText(cells[0]);
            const value = getText(cells[1]);
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
                case 'Call:': {
                    const cell = cells[1];
                    const anchor = cell.querySelector('a');
                    data.Name = anchor ? getText(anchor) : getText(cell);
                    break;
                }
                case 'County:':
                case 'Use:':
                case 'Op Status:':
                // case 'Coverage':
                case 'Sponsor:':
                case 'Coordination:': {
                    const cell = cells[1];
                    data.Comment = !data.Comment ? '' : data.Comment + ' | ';
                    data.Comment = data.Comment + getText(cell);
                    break;
                }
                case 'D-STAR Enabled':
                case 'DMR Enabled':
                    data.Mode = 'DIG';
            }
        }
        if (cells[0] && /Last update:/.test(getText(cells[0]))) {
            const cell = cells[0];
            data.Comment = !data.Comment ? '' : data.Comment + ' | ';
            let text = getText(cell);
            text = text.replace(/Last update:/, '');
            data.Comment = data.Comment + text.trim();
        }
        return data;
    }
    const totalRepeaters = [];
    exports.default = [
        getit(80203, 100),
        getit(80920, 100),
    ];
});
//# sourceMappingURL=repeater-from-site.js.map