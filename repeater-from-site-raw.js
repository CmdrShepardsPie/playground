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
    function getNumber(reg, text) {
        if (text && text.match) {
            const match = text.match(reg) || [];
            return parseFloat(match[match.length - 1]);
        }
        return 0;
    }
    function getText(el) {
        if (el) {
            let text = el.innerHTML;
            if (text) {
                text = text.replace(/<script>.*<\/script>/, ' ');
                text = text.replace(/<[^>]*>/g, ' ');
                return text.trim();
            }
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
    async function getraw(cityOrZip, distance) {
        const proximityUrl = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(cityOrZip.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
        const page = await axios_1.default.get(proximityUrl);
        const dom = new jsdom_1.JSDOM(page.data);
        const allData = [];
        await getListTables(dom, cityOrZip, allData);
    }
    async function getListTables(dom, cityOrZip, allData) {
        // console.log('getListTables', dom);
        const tables = dom.window.document.querySelectorAll('table.w3-table.w3-striped.w3-responsive');
        for (const table of tables) {
            await getTableRows(table, cityOrZip, allData);
        }
    }
    async function getTableRows(table, cityOrZip, allData) {
        // console.log('getTableRows', table);
        const rows = [...table.querySelectorAll('tbody > tr')];
        for (const row of rows) {
            await getRowCells(row, cityOrZip, allData);
        }
    }
    async function getRowCells(row, cityOrZip, allData) {
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
                await getNewPage(href, distance, cityOrZip, allData);
            }
        }
    }
    async function getNewPage(href, distance, cityOrZip, allData) {
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
        const data = {};
        Object.assign(data, await getInnerTables(dom, data));
        allData.push(data);
        const columns = {};
        allData.forEach((d, i) => {
            Object.entries(d).forEach(entry => {
                const key = entry[0];
                columns[key] = '';
            });
        });
        allData.forEach((d, i) => {
            allData[i] = { ...columns, ...d };
        });
        console.log(`Adding (${allData.length})`, cityOrZip);
        console.log(JSON.stringify(data));
        fs.writeFileSync(`./repeater-data/raw-${cityOrZip}.csv`, stringify(allData, options));
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
        return data;
    }
    const totalRepeaters = [];
    async function start() {
        // await getraw('Colorado Springs, CO', 50);
        // await getraw('Monument, CO', 50);
        // await getraw('Larkspur, CO', 50);
        // await getraw('Castle Rock, CO', 50);
        // await getraw('Centennial, CO', 50);
        // await getraw('Denver, CO', 50);
        await getraw('Colorado Springs, CO', 100);
        await getraw('Denver, CO', 100);
    }
    exports.default = start();
});
//# sourceMappingURL=repeater-from-site-raw.js.map