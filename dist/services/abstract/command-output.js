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
    const Subject_1 = require("rxjs/Subject");
    class CommandOutput {
        // protected subject: Subject<OutType>;
        // protected observable: Observable<OutType>;
        constructor(subject = new Subject_1.Subject(), observable = subject.share()) {
            this.subject = subject;
            this.observable = observable;
        }
        get output() {
            return this.observable;
        }
        emit(value) {
            this.subject && this.subject.next(value);
        }
    }
    exports.default = CommandOutput;
});
