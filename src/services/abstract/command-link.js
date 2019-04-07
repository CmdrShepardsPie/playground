// tslint:disable:max-classes-per-file
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
        define(["require", "exports", "rxjs/Subject", "./command-input", "./command-output"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subject_1 = require("rxjs/Subject");
    var command_input_1 = require("./command-input");
    var command_output_1 = require("./command-output");
    var CommandLink = /** @class */ (function () {
        function CommandLink() {
            this.subject = new Subject_1.Subject();
            this.commandInput = new CommandInputed(this.listen.bind(this));
            this.commandOutput = new CommandOutputed(this.subject);
        }
        Object.defineProperty(CommandLink.prototype, "output", {
            get: function () {
                return this.commandOutput.output;
            },
            enumerable: true,
            configurable: true
        });
        CommandLink.prototype.use = function (input) {
            return this.commandInput.use(input);
        };
        CommandLink.prototype.remove = function (subscription) {
            return this.commandInput.remove(subscription);
        };
        CommandLink.prototype.clear = function () {
            return this.commandInput.clear();
        };
        CommandLink.prototype.emit = function (value) {
            this.subject && this.subject.next(value);
        };
        return CommandLink;
    }());
    exports.default = CommandLink;
    // Make a concrete version of CommandInput to be instantiated in CommandLink above
    var CommandInputed = /** @class */ (function (_super) {
        __extends(CommandInputed, _super);
        function CommandInputed(listener) {
            var _this = _super.call(this) || this;
            _this.listener = listener;
            return _this;
        }
        CommandInputed.prototype.listen = function (value) {
            this.listener && this.listener(value);
        };
        return CommandInputed;
    }(command_input_1.default));
    // Make a concrete version of CommandOutput to be instantiated in CommandLink above
    var CommandOutputed = /** @class */ (function (_super) {
        __extends(CommandOutputed, _super);
        function CommandOutputed() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CommandOutputed;
    }(command_output_1.default));
});
