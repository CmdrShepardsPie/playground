var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "csv", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _csv = require("csv");
    var util_1 = require("util");
    exports.parseAsync = util_1.promisify(_csv.parse);
    exports.stringifyAsync = util_1.promisify(_csv.stringify);
    function fillArrayObjects(inArray) {
        var outArray = inArray.slice();
        var keys = {};
        outArray.forEach(function (item) {
            var entries = Object.entries(item);
            entries.forEach(function (entry) {
                keys[entry[0]] = true;
            });
        });
        outArray.forEach(function (item, index) {
            item = __assign({}, item);
            outArray[index] = item;
            Object.keys(keys).forEach(function (key) {
                // @ts-ignore
                item[key] = item[key];
            });
        });
        return outArray;
    }
    exports.fillArrayObjects = fillArrayObjects;
});
