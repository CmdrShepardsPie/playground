"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_helpers_1 = require("@helpers/fs-helpers");
const helpers_1 = require("@helpers/helpers");
const node_logger_1 = require("@helpers/node-logger");
const axios_1 = require("axios");
const chalk_1 = require("chalk");
const jsdom_1 = require("jsdom");
const helper_1 = require("./helper");
const log = node_logger_1.createLog("Scraper");
class Scraper {
    constructor(location, distance) {
        this.location = location;
        this.distance = distance;
        this.data = [];
        log(chalk_1.default.green("New Scraper"), location, distance);
        this.url = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(location.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
    }
    async process() {
        log(chalk_1.default.green("Process"));
        const parts = this.location.toString().split(`,`);
        const baseKey = `${(parts[1] || ".").trim()}/${parts[0].trim()}.html`;
        const page = await this.getUrl(this.url, baseKey);
        const dom = new jsdom_1.JSDOM(page);
        await this.getRepeaterList(dom.window.document);
        return this.data;
    }
    async getRepeaterList(document) {
        log(chalk_1.default.green("Get Repeater List"));
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
        log(chalk_1.default.green("Get Repeater Details"), href);
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
        log(chalk_1.default.green("Get Cache"), key);
        const file = `repeaters/_cache/${key}`;
        if (await fs_helpers_1.dirExists(file)) {
            return (await fs_helpers_1.readFileAsync(file)).toString();
        }
    }
    async setCache(key, value) {
        log(chalk_1.default.green("Set Cache"), key);
        const file = `repeaters/_cache/${key}`;
        await fs_helpers_1.makeDirs(file);
        return fs_helpers_1.writeFileAsync(file, value);
    }
    async getUrl(url, cacheKey) {
        log(chalk_1.default.green("Get URL"), url, cacheKey);
        const cache = await this.getCache(cacheKey || url);
        if (cache) {
            log(chalk_1.default.yellow("Cached"), url, cacheKey);
            return cache;
        }
        else {
            const waitTime = (Math.random() * 5000);
            await helpers_1.wait(waitTime);
            log(chalk_1.default.yellow("Get"), url);
            const request = await axios_1.default.get(url);
            log(chalk_1.default.green("Got"), url);
            const data = request.data;
            await this.setCache(cacheKey || url, data);
            return data;
        }
    }
}
exports.default = Scraper;
