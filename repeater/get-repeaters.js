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
        readdir: util_1.promisify(_fs.readdir),
        mkdir: util_1.promisify(_fs.mkdir)
    };
    const stringifyAsync = util_1.promisify(_csv.stringify);
    function save(place, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                header: true
            };
            console.log();
            console.log(place, distance);
            const scraper = new scraper_1.default(place, distance);
            const result = yield scraper.process();
            result.sort((a, b) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
            result.sort((a, b) => (a.Frequency - b.Frequency));
            result.sort((a, b) => (a.Mi - b.Mi));
            console.log(place, distance, result.length);
            yield fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result));
            if (!(yield fs.exists(`repeaters/csv/location/`))) {
                yield fs.mkdir(`repeaters/csv/location/`);
            }
            if (!(yield fs.exists(`repeaters/json/location/`))) {
                yield fs.mkdir(`repeaters/json/location/`);
            }
            if (!(yield fs.exists(`repeaters/csv/sponsors-and-affiliates/`))) {
                yield fs.mkdir(`repeaters/csv/sponsors-and-affiliates/`);
            }
            if (!(yield fs.exists(`repeaters/json/sponsors-and-affiliates/`))) {
                yield fs.mkdir(`repeaters/json/sponsors-and-affiliates/`);
            }
            for (const item of result) {
                // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/`))) {
                //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/`);
                // }
                // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/`))) {
                //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/`);
                // }
                //
                // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/`))) {
                //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/`);
                // }
                // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/${item.County}/`))) {
                //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/${item.County}/`);
                // }
                //
                // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/${item.Location}/`))) {
                //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/${item.Location}/`);
                // }
                // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/${item.County}/${item.Location}/`))) {
                //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/${item.County}/${item.Location}/`);
                // }
                const location = item.Location.split(',')[0];
                if (!(yield fs.exists(`repeaters/json/location/${item['ST/PR']}, ${location}/`))) {
                    yield fs.mkdir(`repeaters/json/location/${item['ST/PR']}, ${location}/`);
                }
                yield fs.writeFile(`repeaters/json/location/${item['ST/PR']}, ${location}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));
                if (!(yield fs.exists(`repeaters/csv/location/${item['ST/PR']}, ${location}/`))) {
                    yield fs.mkdir(`repeaters/csv/location/${item['ST/PR']}, ${location}/`);
                }
                yield fs.writeFile(`repeaters/csv/location/${item['ST/PR']}, ${location}/${item.Call} ${item.Frequency}.csv`, yield stringifyAsync([item], options));
                const affiliate = (item.Affiliate || '').replace(/\//g, ' ');
                if (affiliate) {
                    if (!(yield fs.exists(`repeaters/json/sponsors-and-affiliates/${affiliate}/`))) {
                        yield fs.mkdir(`repeaters/json/sponsors-and-affiliates/${affiliate}/`);
                    }
                    yield fs.writeFile(`repeaters/json/sponsors-and-affiliates/${affiliate}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));
                    if (!(yield fs.exists(`repeaters/csv/sponsors-and-affiliates/${affiliate}/`))) {
                        yield fs.mkdir(`repeaters/csv/sponsors-and-affiliates/${affiliate}/`);
                    }
                    yield fs.writeFile(`repeaters/csv/sponsors-and-affiliates/${affiliate}/${item.Call} ${item.Frequency}.csv`, yield stringifyAsync([item], options));
                }
                const sponsor = (item.Sponsor || '').replace(/\//g, ' ');
                if (sponsor) {
                    if (!(yield fs.exists(`repeaters/json/sponsors-and-affiliates/${sponsor}/`))) {
                        yield fs.mkdir(`repeaters/json/sponsors-and-affiliates/${sponsor}/`);
                    }
                    yield fs.writeFile(`repeaters/json/sponsors-and-affiliates/${sponsor}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));
                    if (!(yield fs.exists(`repeaters/csv/sponsors-and-affiliates/${sponsor}/`))) {
                        yield fs.mkdir(`repeaters/csv/sponsors-and-affiliates/${sponsor}/`);
                    }
                    yield fs.writeFile(`repeaters/csv/sponsors-and-affiliates/${sponsor}/${item.Call} ${item.Frequency}.csv`, yield stringifyAsync([item], options));
                }
            }
            const headers = {};
            result.forEach(item => {
                Object.entries(item).forEach(entry => {
                    headers[entry[0]] = true;
                });
            });
            result.forEach(item => {
                Object.entries(headers).forEach(entry => {
                    if (item[entry[0]] === undefined) {
                        item[entry[0]] = '';
                    }
                });
            });
            yield fs.writeFile(`repeaters/csv/${place}.csv`, yield stringifyAsync(result, options));
        });
    }
    exports.save = save;
    exports.default = (() => __awaiter(this, void 0, void 0, function* () {
        // Update existing files
        let allFiles = yield fs.readdir('./repeaters/json');
        allFiles = allFiles.filter(b => /\.json/.test(b));
        allFiles.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
        while (allFiles.length) {
            const file = allFiles.shift();
            if (file) {
                const name = file.replace('./repeaters/json', '').replace('.json', '');
                yield save(name, 200);
            }
        }
        const cities = [
            'Denver, CO',
            'Golden, CO',
            'Genesee, CO',
            'Idaho Springs, CO',
            'Downieville, CO',
            'Lawson, CO',
            'Georgetown, CO',
            'Dillon, CO',
            'Silverthorne, CO',
            'Frisco, CO',
            'Copper Mountain, CO',
            'Vail, CO',
            'Avon, CO',
            'Edwards, CO',
            'Wolcott, CO',
            'Eagle, CO',
            'Gypsum, CO',
            'Dotsero, CO',
            'Glenwood Springs, CO',
            'Chacra, CO',
            'New Castle, CO',
            'Silt, CO',
            'Rifle, CO',
            'Rulison, CO',
            'Parachute, CO',
            'De Beque, CO',
            'Palisade, CO',
            'Grand Junction, CO',
            'Fruita, CO',
            'Loma, CO',
            'Cisco, UT',
            'Dewey, UT',
            'Castle Valley, UT',
            'Spanish Valley, UT',
            'La Sal, UT',
            'Thompson, UT',
            'Crescent Junction, UT',
            'Moab, UT'
        ];
        while (cities.length) {
            const name = cities.shift();
            if (name) {
                yield save(name, 200);
            }
        }
    }))();
});
//# sourceMappingURL=get-repeaters.js.map