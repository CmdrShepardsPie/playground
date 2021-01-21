var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "module-alias/register", "fs", "path", "@helpers/log-helpers", "@helpers/csv-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SewageCompany = exports.NationalPark = exports.InUse = exports.Country = void 0;
    require("module-alias/register");
    const fs_1 = __importDefault(require("fs"));
    const path_1 = __importDefault(require("path"));
    const log_helpers_1 = require("@helpers/log-helpers");
    const csv_helpers_1 = require("@helpers/csv-helpers");
    const { log, write } = log_helpers_1.createOut('zipcodes');
    const dataRoot = './data/zipcodes';
    const sqlStart = 'INSERT INTO `zip_codes` (`zip`, `primary_city`, `state`, `county`, `timezone`, `area_codes`, `latitude`, `longitude`, `country`, `estimated_population`)\nVALUES';
    const sqlEnd = '';
    async function start() {
        const dirFiles = await fs_1.default.promises.readdir(path_1.default.resolve(`${dataRoot}`));
        log('start', 'dirFiles', dirFiles);
        let sqlBody = [];
        let fileNumber = 1;
        for (const fileName of dirFiles) {
            const rows = await load(fileName);
            for (const row of rows) {
                sqlBody.push(`\t(${buildSqlRow(row)})`);
                if (sqlBody.length >= 2000) {
                    const fileNumberPad = `00${fileNumber}`.substr(-3);
                    const body = [sqlStart, sqlBody.join(',\n') + ';', sqlEnd].join('\n');
                    log('write', 'rows', sqlBody.length, `./data/zipout/zip_codes_UK_${fileNumberPad}.sql`);
                    await fs_1.default.promises.writeFile(path_1.default.resolve(`./data/zipout/zip_codes_UK_${fileNumberPad}.sql`), body);
                    sqlBody = [];
                    fileNumber++;
                }
            }
        }
        if (sqlBody.length > 0) {
            const fileNumberPad = `00${fileNumber}`.substr(-3);
            const body = [sqlStart, sqlBody.join(',\n') + ';', sqlEnd].join('\n');
            log('write', 'rows', sqlBody.length, `./data/zipout/zip_codes_UK_${fileNumberPad}.sql`);
            await fs_1.default.promises.writeFile(path_1.default.resolve(`./data/zipout/zip_codes_UK_${fileNumberPad}.sql`), body);
            sqlBody = [];
            fileNumber++;
        }
    }
    async function load(fileName) {
        const fullPath = path_1.default.resolve(`${dataRoot}/${fileName}`);
        log('load', 'fullPath', fullPath);
        const raw = await readFile(fullPath);
        const sourceZips = await parseFile(raw);
        return sourceZips.map((d) => convertZipcode(d));
    }
    async function readFile(fullPath) {
        log('readFile', 'fullPath', fullPath);
        return await fs_1.default.promises.readFile(fullPath);
    }
    async function parseFile(raw) {
        // write('P');
        return await csv_helpers_1.parseAsync(raw, { columns: true, cast: true });
    }
    function convertZipcode(source) {
        // write('C');
        return {
            zip: source.Postcode,
            primary_city: source.District.replace(`'`, `\\'`),
            state: source.County.replace(`'`, `\\'`),
            county: source.Ward.replace(`'`, `\\'`),
            timezone: null,
            area_codes: null,
            latitude: source.Latitude.toString(),
            longitude: source.Longitude.toString(),
            country: source.Country,
            estimated_population: typeof source.Population === 'number' ? source.Population : null,
        };
    }
    function buildSqlRow(row) {
        const template = [];
        template.push(row.zip ? `'${row.zip}'` : 'NULL');
        template.push(row.primary_city ? `'${row.primary_city}'` : 'NULL');
        template.push(row.state ? `'${row.state}'` : 'NULL');
        template.push(row.county ? `'${row.county}'` : 'NULL');
        template.push(row.timezone ? `'${row.timezone}'` : 'NULL');
        template.push(row.area_codes ? `'${row.area_codes}'` : 'NULL');
        template.push(row.latitude ? `'${row.latitude}'` : 'NULL');
        template.push(row.longitude ? `'${row.longitude}'` : 'NULL');
        template.push(row.country ? `'${row.country}'` : 'NULL');
        template.push(typeof row.estimated_population === 'number' ? `${row.estimated_population}` : 'NULL');
        return template.join(',');
    }
    exports.default = start();
    var Country;
    (function (Country) {
        Country["England"] = "England";
        Country["NorthernIreland"] = "Northern Ireland";
        Country["Scotland"] = "Scotland";
        Country["Wales"] = "Wales";
    })(Country = exports.Country || (exports.Country = {}));
    var InUse;
    (function (InUse) {
        InUse["Yes"] = "Yes";
    })(InUse = exports.InUse || (exports.InUse = {}));
    var NationalPark;
    (function (NationalPark) {
        NationalPark["BreconBeaconsNationalPark"] = "Brecon Beacons National Park";
        NationalPark["Empty"] = "";
    })(NationalPark = exports.NationalPark || (exports.NationalPark = {}));
    var SewageCompany;
    (function (SewageCompany) {
        SewageCompany["Empty"] = "";
        SewageCompany["NorthumbrianWater"] = "Northumbrian Water";
        SewageCompany["SouthernWater"] = "Southern Water";
        SewageCompany["ThamesWater"] = "Thames Water";
    })(SewageCompany = exports.SewageCompany || (exports.SewageCompany = {}));
});
