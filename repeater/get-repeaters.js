(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "csv", "fs", "./scraper", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _csv = require("csv");
    const _fs = require("fs");
    const scraper_1 = require("./scraper");
    const util_1 = require("util");
    const fs = {
        exists: util_1.promisify(_fs.exists),
        writeFile: util_1.promisify(_fs.writeFile),
        readFile: util_1.promisify(_fs.readFile)
    };
    const stringifyAsync = util_1.promisify(_csv.stringify);
    async function save(place, distance) {
        const scraper = new scraper_1.default(place, distance);
        const result = await scraper.process();
        result.sort((a, b) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
        result.sort((a, b) => (a.Frequency - b.Frequency));
        result.sort((a, b) => (a.Mi - b.Mi));
        await fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result));
        const options = {
            header: true
        };
        const headers = {};
        result.forEach(item => {
            Object.entries(item).forEach(entry => {
                headers[entry[0]] = true;
            });
        });
        result.forEach(item => {
            Object.entries(headers).forEach(entry => {
                if (!item[entry[0]]) {
                    item[entry[0]] = typeof item[entry[0]];
                }
            });
        });
        const csv = await stringifyAsync(result, options);
        await fs.writeFile(`repeaters/csv/${place}.csv`, csv);
        // return Promise.all([
        //   fs.writeFile(`repeaters/csv/${place}.csv`, csv),
        //   fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result))
        // ]);
    }
    exports.save = save;
    exports.default = (async () => {
        for (let i = 200; i <= 200; i++) {
            await save('Denver, CO', i);
            await save('Littleton, CO', i);
            await save('Bailey, CO', i);
            await save('Grant, CO', i);
            await save('Jefferson, CO', i);
            await save('Como, CO', i);
            await save('Fairplay, CO', i);
            await save('Antero Junction, CO', i);
            await save('Buena Vista, CO', i);
            await save('Nathrop, CO', i);
            await save('Salida, CO', i);
            await save('Monarch, CO', i);
            await save('Sargents, CO', i);
            await save('Parlin, CO', i);
            await save('Gunnison, CO', i);
            await save('Cimarron, CO', i);
            await save('Montrose, CO', i);
            await save('Loghill Village, CO', i);
            await save('Ridgway, CO', i);
            await save('Norwood, CO', i);
            await save('Redvale, CO', i);
            await save('Naturita, CO', i);
            await save('Bedrock, CO', i);
            await save('Paradox, CO', i);
            await save('La Sal, UT', i);
            await save('Spanish Valley, UT', i);
            await save('Moab, UT', i);
            await save('Lakewood, CO', i);
            await save('Keystone, CO', i);
            await save('Breckenridge, CO', i);
            await save('Vail, CO', i);
            await save('Avon, CO', i);
            await save('Glenwood Springs, CO', i);
            await save('Rifle, CO', i);
            await save('Palisade, CO', i);
            await save('Grand Junction, CO', i);
            await save('Fruita, CO', i);
            await save('Thompson, UT', i);
            await save('Crescent Junction, UT', i);
        }
    })();
});
//# sourceMappingURL=get-repeaters.js.map