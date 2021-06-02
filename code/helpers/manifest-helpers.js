var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk", "fs-helpers", "node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getManifest = void 0;
    const chalk_1 = __importDefault(require("chalk"));
    const fs_helpers_1 = require("fs-helpers");
    const node_logger_1 = require("node-logger");
    const log = node_logger_1.createLog("Manifest Helpers");
    async function getManifest(path) {
        log(chalk_1.default.cyan("Get Manifest"), path);
        const manifestStr = await fs_helpers_1.readFileAsync(path, "utf8");
        return JSON.parse(manifestStr);
    }
    exports.getManifest = getManifest;
});
//# sourceMappingURL=manifest-helpers.js.map