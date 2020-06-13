var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "xlsx"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readXLXS = void 0;
    const xlsx = __importStar(require("xlsx"));
    async function readXLXS(filename) {
        const outData = {};
        const fileData = await xlsx.readFile(filename);
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const cellRegex = /([a-z]+)([0-9]+)/i;
        for (const sheetName of fileData.SheetNames) {
            // console.log("Sheet name", sheetName);
            const headers = [];
            const allData = [];
            const sheet = fileData.Sheets[sheetName];
            const cellNames = Object.keys(sheet);
            let row;
            for (const cellName of cellNames) {
                // console.log("Cell name", cellName);
                const match = cellName.match(cellRegex);
                if (match) {
                    const columnId = match[1];
                    const rowId = match[2];
                    const cell = sheet[cellName];
                    const value = cell.v;
                    const columnNumber = letters.indexOf(columnId);
                    if (rowId === "1") {
                        headers.push(value);
                    }
                    else {
                        if (columnNumber === 0) {
                            row = {};
                            allData.push(row);
                        }
                        row[headers[columnNumber]] = value;
                    }
                }
            }
            console.log("Got", headers.length, "Columns", allData.length, "Rows", "From", sheetName);
            outData[sheetName] = allData;
        }
        return outData;
    }
    exports.readXLXS = readXLXS;
});
