(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs/add/operator/share", "rxjs/Subject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("rxjs/add/operator/share");
    var Subject_1 = require("rxjs/Subject");
    var CommandOutput = /** @class */ (function () {
        // protected subject: Subject<OutType>;
        // protected observable: Observable<OutType>;
        function CommandOutput(subject, observable) {
            if (subject === void 0) { subject = new Subject_1.Subject(); }
            if (observable === void 0) { observable = subject.share(); }
            this.subject = subject;
            this.observable = observable;
        }
        Object.defineProperty(CommandOutput.prototype, "output", {
            get: function () {
                return this.observable;
            },
            enumerable: true,
            configurable: true
        });
        CommandOutput.prototype.emit = function (value) {
            this.subject && this.subject.next(value);
        };
        return CommandOutput;
    }());
    exports.default = CommandOutput;
});
