var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/command-input"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const command_input_1 = __importDefault(require("./abstract/command-input"));
    class OutputService extends command_input_1.default {
        listen(value) {
            process.stdout.write(value);
        }
    }
    exports.default = OutputService;
});
//# sourceMappingURL=output.service.js.map