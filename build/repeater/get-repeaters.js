(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "csv", "util", "./helper", "./scraper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _csv = require("csv");
    const util_1 = require("util");
    const helper_1 = require("./helper");
    const scraper_1 = require("./scraper");
    const stringifyAsync = util_1.promisify(_csv.stringify);
    async function save(place, distance) {
        const options = {
            header: true,
        };
        console.log();
        console.log(place, distance);
        const scraper = new scraper_1.default(place, distance);
        const result = await scraper.process();
        result.sort((a, b) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
        result.sort((a, b) => (a.Frequency - b.Frequency));
        result.sort((a, b) => (a.Mi - b.Mi));
        console.log(place, distance, result.length);
        const parts = place.toString().split(`,`);
        const subPlace = `${(parts[1] || ".").trim()}/${parts[0].trim()}`;
        const jsonPath = `repeaters/json/${subPlace}.json`;
        await helper_1.makeDirs(jsonPath);
        await helper_1.fs.writeFile(jsonPath, JSON.stringify(result));
        const headers = {};
        result.forEach((item) => {
            Object.entries(item).forEach((entry) => {
                headers[entry[0]] = true;
            });
        });
        result.forEach((item) => {
            Object.entries(headers).forEach((entry) => {
                if (item[entry[0]] === undefined) {
                    item[entry[0]] = "";
                }
            });
        });
        const csvPath = `repeaters/csv/${subPlace}.csv`;
        await helper_1.makeDirs(csvPath);
        await helper_1.fs.writeFile(csvPath, await stringifyAsync(result, options));
        // if (!(await fs.exists(`repeaters/csv/location/`))) {
        //   await fs.mkdir(`repeaters/csv/location/`);
        // }
        // if (!(await fs.exists(`repeaters/json/location/`))) {
        //   await fs.mkdir(`repeaters/json/location/`);
        // }
        // if (!(await fs.exists(`repeaters/csv/sponsors-and-affiliates/`))) {
        //   await fs.mkdir(`repeaters/csv/sponsors-and-affiliates/`);
        // }
        // if (!(await fs.exists(`repeaters/json/sponsors-and-affiliates/`))) {
        //   await fs.mkdir(`repeaters/json/sponsors-and-affiliates/`);
        // }
        // for (const item of result) {
        //   // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/`))) {
        //   //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/`);
        //   // }
        //   // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/`))) {
        //   //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/`);
        //   // }
        //   //
        //   // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/`))) {
        //   //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/`);
        //   // }
        //   // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/${item.County}/`))) {
        //   //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/${item.County}/`);
        //   // }
        //   //
        //   // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/${item.Location}/`))) {
        //   //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/${item.Location}/`);
        //   // }
        //   // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/${item.County}/${item.Location}/`))) {
        //   //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/${item.County}/${item.Location}/`);
        //   // }
        //   const location = (item.Location as string).split(",")[0];
        //   if (!(await fs.exists(`repeaters/json/location/${item["ST/PR"]}, ${location}/`))) {
        //     await fs.mkdir(`repeaters/json/location/${item["ST/PR"]}, ${location}/`);
        //   }
        //   await fs.writeFile(`repeaters/json/location/${item["ST/PR"]}, ${location}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));
        //   if (!(await fs.exists(`repeaters/csv/location/${item["ST/PR"]}, ${location}/`))) {
        //     await fs.mkdir(`repeaters/csv/location/${item["ST/PR"]}, ${location}/`);
        //   }
        //   await fs.writeFile(`repeaters/csv/location/${item["ST/PR"]}, ${location}/${item.Call} ${item.Frequency}.csv`, await stringifyAsync([item], options));
        //   const affiliate = (item.Affiliate as string || "").replace(/\//g, " ");
        //   if (affiliate) {
        //     if (!(await fs.exists(`repeaters/json/sponsors-and-affiliates/${affiliate}/`))) {
        //       await fs.mkdir(`repeaters/json/sponsors-and-affiliates/${affiliate}/`);
        //     }
        //     await fs.writeFile(`repeaters/json/sponsors-and-affiliates/${affiliate}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));
        //     if (!(await fs.exists(`repeaters/csv/sponsors-and-affiliates/${affiliate}/`))) {
        //       await fs.mkdir(`repeaters/csv/sponsors-and-affiliates/${affiliate}/`);
        //     }
        //     await fs.writeFile(`repeaters/csv/sponsors-and-affiliates/${affiliate}/${item.Call} ${item.Frequency}.csv`, await stringifyAsync([item], options));
        //   }
        //   const sponsor = (item.Sponsor as string || "").replace(/\//g, " ");
        //   if (sponsor) {
        //     if (!(await fs.exists(`repeaters/json/sponsors-and-affiliates/${sponsor}/`))) {
        //       await fs.mkdir(`repeaters/json/sponsors-and-affiliates/${sponsor}/`);
        //     }
        //     await fs.writeFile(`repeaters/json/sponsors-and-affiliates/${sponsor}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));
        //     if (!(await fs.exists(`repeaters/csv/sponsors-and-affiliates/${sponsor}/`))) {
        //       await fs.mkdir(`repeaters/csv/sponsors-and-affiliates/${sponsor}/`);
        //     }
        //     await fs.writeFile(`repeaters/csv/sponsors-and-affiliates/${sponsor}/${item.Call} ${item.Frequency}.csv`, await stringifyAsync([item], options));
        //   }
        // }
    }
    exports.save = save;
    exports.default = (async () => {
        // Update existing files
        // let allFiles = await fs.readdir("./repeaters/json");
        // allFiles = allFiles.filter((b) => /\.json/.test(b));
        // allFiles.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
        // while (allFiles.length) {
        //   const file = allFiles.shift();
        //   if (file) {
        //     const name = file.replace("./repeaters/json", "").replace(".json", "");
        //     await save(name, 200);
        //   }
        // }
        const cities = [
            "Worden, MT"
            // "Laramie, WY",
            // "Denver, CO",
            // "Golden, CO",
            // "Genesee, CO",
            // "Idaho Springs, CO",
            // "Downieville, CO",
            // "Lawson, CO",
            // "Georgetown, CO",
            // "Dillon, CO",
            // "Silverthorne, CO",
            // "Frisco, CO",
            // "Copper Mountain, CO",
            // "Vail, CO",
            // "Avon, CO",
            // "Edwards, CO",
            // "Wolcott, CO",
            // "Eagle, CO",
            // "Gypsum, CO",
            // "Dotsero, CO",
            // "Glenwood Springs, CO",
            // "Chacra, CO",
            // "New Castle, CO",
            // "Silt, CO",
            // "Rifle, CO",
            // "Rulison, CO",
            // "Parachute, CO",
            // "De Beque, CO",
            // "Palisade, CO",
            // "Grand Junction, CO",
            // "Fruita, CO",
            // "Loma, CO",
            // "Cisco, UT",
            // "Dewey, UT",
            // "Castle Valley, UT",
            // "Spanish Valley, UT",
            // "La Sal, UT",
            // "Thompson, UT",
            // "Crescent Junction, UT",
            // "Moab, UT",
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