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
        await fs.writeFile(`repeaters/${place} ${distance}.csv`, csv);
    }
    exports.save = save;
    exports.default = (async () => {
        for (let i = 0; i <= 100; i++) {
            await save('Denver, CO', i);
            await save('Colorado Springs, CO', i);
            await save('Woodland Park, CO', i);
            await save('Idaho Springs, CO', i);
            await save('Boulder, CO', i);
            await save('Ouray, CO', i);
            await save('Buena Vista, CO', i);
            await save('Moab, UT', i);
        }
    })();
});
//# sourceMappingURL=get-repeaters.js.map