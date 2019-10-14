(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/command-link"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const command_link_1 = require("./abstract/command-link");
    class CapsService extends command_link_1.default {
        listen(value) {
            this.emit(value.toUpperCase());
        }
    }
    exports.default = CapsService;
});
//# sourceMappingURL=caps.service.js.map