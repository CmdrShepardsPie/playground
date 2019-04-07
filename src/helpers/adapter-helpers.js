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
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var log = node_logger_1.createLog("Adapter Helpers");
    var EventHandlers;
    (function (EventHandlers) {
        EventHandlers["Ready"] = "ready";
        EventHandlers["Close"] = "close";
        EventHandlers["Error"] = "error";
    })(EventHandlers = exports.EventHandlers || (exports.EventHandlers = {}));
    function setupAdapter(currentAdapter, eventHandlers) {
        log(chalk_1.default.cyan("Setup Adapter"));
        Object.entries(eventHandlers).forEach(function (entry) {
            var name = entry[0];
            var handler = entry[1];
            currentAdapter.on(name, handler.bind(undefined, currentAdapter));
        });
        currentAdapter.open();
        return currentAdapter;
    }
    exports.setupAdapter = setupAdapter;
});
