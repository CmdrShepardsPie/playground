(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseHRL = void 0;
    function parseHRL(text) {
        const data = {};
        const sectionHeaderRegex = /^(#(?:[a-z]|[A-Z]|[0-9]|[;.-])*#)(.*)?/gim;
        let result = [];
        // tslint:disable:no-conditional-assignment
        while ((result = sectionHeaderRegex.exec(text)) !== null) {
            // create section in data
            const sectionKey = result[1].split(";")[0].replace(/#/g, "");
            const sectionTitles = result[2].split("#");
            const sectionValues = getSectionValues(sectionKey, text);
            if (sectionValues.length > 1) {
                // it's an array of objects
                data[sectionKey] = [];
                for (const item of sectionValues) {
                    data[sectionKey].push(pairTitleVal(item, sectionTitles));
                }
            }
            else if (sectionValues.length === 1) {
                // it's an object
                data[sectionKey] = pairTitleVal(sectionValues[0], sectionTitles);
            }
        }
        return data;
    }
    exports.parseHRL = parseHRL;
    function getSectionValues(key, text) {
        const values = [];
        const regexStr = "^(?:" + key + "#{1})(.*)?";
        const valueRegex = new RegExp(regexStr, "gim");
        let result = [];
        while ((result = valueRegex.exec(text)) !== null) {
            values.push(result[1].split("#"));
        }
        return values;
    }
    function pairTitleVal(itemVals, sectionTitles) {
        const obj = {};
        sectionTitles.forEach((title, index) => {
            obj[title] = itemVals[index];
        });
        return obj;
    }
});
