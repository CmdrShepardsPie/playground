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
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir)
    };
    const stringifyAsync = util_1.promisify(_csv.stringify);
    async function save(place, distance) {
        console.log();
        console.log(place, distance);
        const scraper = new scraper_1.default(place, distance);
        const result = await scraper.process();
        result.sort((a, b) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
        result.sort((a, b) => (a.Frequency - b.Frequency));
        result.sort((a, b) => (a.Mi - b.Mi));
        console.log(place, distance, result.length);
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
    }
    exports.save = save;
    exports.default = (async () => {
        // Update existing files
        // const allFiles = await fs.readdir('./repeaters/json');
        // allFiles.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
        // while (allFiles.length) {
        //   const file = allFiles.shift();
        //   if (file) {
        //     const name = file.replace('./repeaters/json', '').replace('.json', '');
        //     await save(name, 200);
        //   }
        // }
        const cities = [
            // 'Denver, CO',
            // 'Lakewood, CO',
            // 'Keystone, CO',
            // 'Breckenridge, CO',
            // 'Vail, CO',
            // 'Avon, CO',
            // 'Glenwood Springs, CO',
            // 'Rifle, CO',
            // 'Palisade, CO',
            // 'Grand Junction, CO',
            // 'Fruita, CO',
            // 'Thompson, UT',
            // 'Crescent Junction, UT',
            // 'Moab, UT',
            //
            // 'Denver, CO',
            // 'Buena Vista, CO',
            // 'Salida, CO',
            // 'Monarch, CO',
            // 'Gunnison, CO',
            // 'Montrose, CO',
            // 'Ouray, CO',
            // 'Naturita, CO',
            // 'La Sal, UT',
            // 'Moab, UT',
            //
            // 'Denver, CO',
            // 'Buena Vista, CO',
            // 'Salida, CO',
            // 'Saguache, CO',
            // 'Center, CO',
            // 'Del Norte, CO',
            // 'Pagosa Springs, CO',
            // 'Bayfield, CO',
            // 'Durango, CO',
            // 'Mancos, CO',
            // 'Dolores, CO',
            // 'Dove Creek, CO',
            // 'Monticello, UT',
            // 'Moab, UT',
            'Hotchkiss, CO'
        ];
        while (cities.length) {
            const name = cities.shift();
            if (name) {
                await save(name, 200);
            }
        }
    })();
});
//# sourceMappingURL=get-repeaters.js.map