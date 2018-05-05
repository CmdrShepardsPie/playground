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
        const options = {
            header: true
        };
        const csv = await stringifyAsync(result, options);
        return Promise.all([
            fs.writeFile(`repeaters/csv/${place}.csv`, csv),
            fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result))
        ]);
    }
    exports.save = save;
    exports.default = (async () => {
        for (let i = 200; i <= 200; i++) {
            await save('Colorado Springs, CO', i);
            await save('Monument, CO', i);
            await save('Castle Rock, CO', i);
            await save('Castle Pines, CO', i);
            await save('Centennial, CO', i);
            await save('Parker, CO', i);
            await save('Lakewood, CO', i);
            await save('Denver, CO', i);
            await save('Golden, CO', i);
            await save('Idaho Springs, CO', i);
            await save('Evergreen, CO', i);
            await save('Lone Tree, CO', i);
            await save('Empire, CO', i);
            await save('Silverthorne, CO', i);
            await save('Frisco, CO', i);
            await save('Vail, CO', i);
            await save('Avon, CO', i);
            await save('Edwards, CO', i);
            await save('Eagle, CO', i);
            await save('Gypsum, CO', i);
            await save('Glenwood Springs, CO', i);
            await save('New Castle, CO', i);
            await save('Silt, CO', i);
            await save('Rifle, CO', i);
            await save('Grand Junction, CO', i);
            await save('Fruita, CO', i);
            await save('Moab, UT', i);
            await save('Boulder, CO', i);
            await save('Buena Vista, CO', i);
            await save('Woodland Park, CO', i);
            await save('Ouray, CO', i);
        }
    })();
});
//# sourceMappingURL=get-repeaters.js.map