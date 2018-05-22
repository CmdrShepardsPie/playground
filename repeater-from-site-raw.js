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
            window.setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    resolve(fn && (yield fn()));
                }
                catch (e) {
                    reject(e);
                }
            }), ms);
        });
    }
    function getraw(cityOrZip, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            const proximityUrl = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(cityOrZip.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
            const page = yield axios_1.default.get(proximityUrl);
            const dom = new jsdom_1.JSDOM(page.data);
            const allData = [];
            yield getListTables(dom, cityOrZip, allData);
        });
    }
    function getListTables(dom, cityOrZip, allData) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('getListTables', dom);
            const tables = dom.window.document.querySelectorAll('table.w3-table.w3-striped.w3-responsive');
            for (const table of tables) {
                yield getTableRows(table, cityOrZip, allData);
            }
        });
    }
    function getTableRows(table, cityOrZip, allData) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('getTableRows', table);
            const rows = [...table.querySelectorAll('tbody > tr')];
            for (const row of rows) {
                yield getRowCells(row, cityOrZip, allData);
            }
        });
    }
    function getRowCells(row, cityOrZip, allData) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield getNewPage(href, distance, cityOrZip, allData);
                }
            }
        });
    }
    function getNewPage(href, distance, cityOrZip, allData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log();
            // console.log('getNewPage', href);
            const cached = cache[href];
            let dom;
            if (cached) {
                console.log('Got cache', href);
                dom = cached;
            }
            else {
                const page = yield axios_1.default.get(`https://www.repeaterbook.com/repeaters/${href}`);
                dom = new jsdom_1.JSDOM(page.data);
                cache[href] = dom;
                console.log('Stored cache', href);
            }
            const data = {};
            Object.assign(data, yield getInnerTables(dom, data));
            allData.push(data);
            const columns = {};
            allData.forEach((d, i) => {
                Object.entries(d).forEach(entry => {
                    const key = entry[0];
                    columns[key] = '';
                });
            });
            allData.forEach((d, i) => {
                allData[i] = Object.assign({}, columns, d);
            });
            console.log(`Adding (${allData.length})`, cityOrZip);
            console.log(JSON.stringify(data));
            fs.writeFileSync(`./repeater-data/raw-${cityOrZip}.csv`, stringify(allData, options));
        });
    }
    function getInnerTables(dom, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('getInnerTables', dom);
            const tables = dom.window.document.querySelectorAll('table.w3-table.w3-responsive');
            // const data: IRepeater = {} as IRepeater;
            Object.assign(data, yield getInnerRows(tables[0], data));
            // for (const table of tables) {
            //   Object.assign(data, await getInnerRows(table, data));
            // }
            return data;
        });
    }
    function getInnerRows(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('getInnerRows', table);
            const rows = table.querySelectorAll('tbody > tr');
            // const data: IRepeater = {} as IRepeater;
            for (const row of rows) {
                Object.assign(data, yield getInnerCells(row, data));
            }
            return data;
        });
    }
    function getInnerCells(row, data) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    const totalRepeaters = [];
    function start() {
        return __awaiter(this, void 0, void 0, function* () {
            // await getraw('Colorado Springs, CO', 50);
            // await getraw('Monument, CO', 50);
            // await getraw('Larkspur, CO', 50);
            // await getraw('Castle Rock, CO', 50);
            // await getraw('Centennial, CO', 50);
            // await getraw('Denver, CO', 50);
            yield getraw('Colorado Springs, CO', 100);
            yield getraw('Denver, CO', 100);
        });
    }
    exports.default = start();
});
//# sourceMappingURL=repeater-from-site-raw.js.map