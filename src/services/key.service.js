var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/command-output"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var command_output_1 = require("./abstract/command-output");
    var KeyService = /** @class */ (function (_super) {
        __extends(KeyService, _super);
        function KeyService() {
            var _this = _super.call(this) || this;
            var stdin = process.stdin;
            if (stdin) {
                // without this, we would only get streams once enter is pressed
                if (stdin.setRawMode) {
                    stdin.setRawMode(true);
                }
                // resume stdin in the parent process (node app won't quit all by itself
                // unless an error or process.exit() happens)
                stdin.resume();
                // i don't want binary, do you?
                stdin.setEncoding("utf8");
                // on any data into stdin
                stdin.on("data", function (key) {
                    // ctrl-c ( end of text )
                    if (key === "\u0003") {
                        process.exit();
                    }
                    _this.emit(key);
                });
            }
            return _this;
        }
        return KeyService;
    }(command_output_1.default));
    exports.default = KeyService;
});
