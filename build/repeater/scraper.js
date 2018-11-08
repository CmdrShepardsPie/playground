"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const jsdom_1 = require("jsdom");
const helper_1 = require("./helper");
class Scraper {
    constructor(location, distance) {
        this.location = location;
        this.distance = distance;
        this.data = [];
        this.url = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(location.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
        console.log();
        console.log("new Scraper", location, distance);
    }
    async process() {
        console.log("Getting", this.url);
        const parts = this.location.toString().split(`,`);
        const baseKey = `${(parts[1] || ".").trim()}/${parts[0].trim()}.html`;
        const page = await this.getUrl(this.url, baseKey);
        const dom = new jsdom_1.JSDOM(page);
        await this.getRepeaterList(dom.window.document);
        return this.data;
    }
    async getRepeaterList(document) {
        const table = document.querySelector("table.w3-table.w3-striped.w3-responsive");
        if (table) {
            const rows = [...table.querySelectorAll("tbody > tr")];
            const headerRow = rows.shift();
            if (headerRow) {
                const headerCells = [...headerRow.querySelectorAll("th")];
                const headers = headerCells.map((th) => helper_1.getText(th));
                for (const row of rows) {
                    const data = {};
                    const cells = [...row.querySelectorAll("td")];
                    cells.forEach((td, index) => data[headers[index]] = helper_1.getTextOrNumber(td));
                    const link = cells[0].querySelector("a");
                    if (link) {
                        Object.assign(data, await this.getRepeaterDetails(link.href));
                    }
                    this.data.push(data);
                }
            }
        }
    }
    async getRepeaterDetails(href) {
        console.log();
        console.log("Getting", href);
        const urlParams = href.split("?")[1];
        const keyParts = urlParams.match(/state_id=(\d+)&ID=(\d+)/) || [];
        const key = `${keyParts[1]}/${keyParts[2]}.html`;
        const page = await this.getUrl(`https://www.repeaterbook.com/repeaters/${href}`, key);
        const dom = new jsdom_1.JSDOM(page);
        const table = dom.window.document.querySelector("table.w3-table.w3-responsive");
        const data = {};
        if (table) {
            const rows = [...table.querySelectorAll("tbody > tr")];
            for (const row of rows) {
                const cells = [...row.querySelectorAll("td")];
                const title = helper_1.getText(cells[0]);
                const value = helper_1.getTextOrNumber(cells[1]);
                data[title.split(":")[0]] = value;
            }
        }
        return data;
    }
    async getCache(key) {
        console.log("getCache", key);
        const file = `_cache/${key}`;
        if (await helper_1.dirExists(file)) {
            return (await helper_1.fs.readFile(file)).toString();
        }
    }
    async setCache(key, value) {
        console.log("setCache", key);
        const file = `_cache/${key}`;
        await helper_1.makeDirs(file);
        return helper_1.fs.writeFile(file, value);
    }
    async getUrl(url, cacheKey) {
        console.log("getUrl", url);
        const cache = await this.getCache(cacheKey || url);
        if (cache) {
            console.log("Cached", cacheKey || url);
            return cache;
        }
        else {
            const waitTime = 1000 + (Math.random() * 1000);
            console.log("Waiting", waitTime, "Getting", url);
            const request = (await helper_1.wait(waitTime, () => axios_1.default.get(url)));
            console.log("Downloaded", cacheKey || url);
            // console.log("request", request);
            const data = request.data;
            await this.setCache(cacheKey || url, data);
            return data;
        }
    }
}
exports.default = Scraper;
