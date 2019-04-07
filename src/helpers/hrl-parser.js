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
    function parseHRL(text) {
        var data = {};
        var sectionHeaderRegex = /^(#(?:[a-z]|[A-Z]|[0-9]|[;.-])*#)(.*)?/gim;
        var result = [];
        // tslint:disable:no-conditional-assignment
        while ((result = sectionHeaderRegex.exec(text)) !== null) {
            // create section in data
            var sectionKey = result[1].split(";")[0].replace(/#/g, "");
            var sectionTitles = result[2].split("#");
            var sectionValues = getSectionValues(sectionKey, text);
            if (sectionValues.length > 1) {
                // it's an array of objects
                data[sectionKey] = [];
                for (var _i = 0, sectionValues_1 = sectionValues; _i < sectionValues_1.length; _i++) {
                    var item = sectionValues_1[_i];
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
        var values = [];
        var regexStr = "^(?:" + key + "#{1})(.*)?";
        var valueRegex = new RegExp(regexStr, "gim");
        var result = [];
        while ((result = valueRegex.exec(text)) !== null) {
            values.push(result[1].split("#"));
        }
        return values;
    }
    function pairTitleVal(itemVals, sectionTitles) {
        var obj = {};
        sectionTitles.forEach(function (title, index) {
            obj[title] = itemVals[index];
        });
        return obj;
    }
});
