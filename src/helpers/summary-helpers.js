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
    function createSummaryTemplate(promptCount) {
        return {
            totalPrompts: promptCount,
            level3Accuracy: {
                Nuance: 0,
                TivoGoogle: 0,
                TivoNuance: 0,
            },
            services: {
                Nuance: createServiceTemplate(),
                TivoGoogle: createServiceTemplate(),
                TivoNuance: createServiceTemplate(),
            },
        };
    }
    exports.createSummaryTemplate = createSummaryTemplate;
    function createServiceTemplate() {
        return {
            1: { count: 0, percent: 0, errors: [] },
            2: { count: 0, percent: 0, errors: [] },
            3: { count: 0, percent: 0, errors: [] },
            total: { count: 0, percent: 0 },
        };
    }
    exports.createServiceTemplate = createServiceTemplate;
    function roundToHundreth(val) {
        return Math.floor(val * 100) / 100;
    }
    exports.roundToHundreth = roundToHundreth;
});
