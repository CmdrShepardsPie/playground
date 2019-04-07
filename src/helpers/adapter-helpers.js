(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node-logger", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_logger_1 = require("node-logger");
    const chalk_1 = require("chalk");
    const log = node_logger_1.createLog("Adapter Helpers");
    var EventHandlers;
    (function (EventHandlers) {
        EventHandlers["Ready"] = "ready";
        EventHandlers["Close"] = "close";
        EventHandlers["Error"] = "error";
    })(EventHandlers = exports.EventHandlers || (exports.EventHandlers = {}));
    function setupAdapter(currentAdapter, eventHandlers) {
        log(chalk_1.default.cyan("Setup Adapter"));
        Object.entries(eventHandlers).forEach((entry) => {
            const name = entry[0];
            const handler = entry[1];
            currentAdapter.on(name, handler.bind(undefined, currentAdapter));
        });
        currentAdapter.open();
        return currentAdapter;
    }
    exports.setupAdapter = setupAdapter;
});
