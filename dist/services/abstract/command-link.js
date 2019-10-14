// tslint:disable:max-classes-per-file
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
    const Subject_1 = require("rxjs/Subject");
    const command_input_1 = require("./command-input");
    const command_output_1 = require("./command-output");
    class CommandLink {
        constructor() {
            this.subject = new Subject_1.Subject();
            this.commandInput = new CommandInputed(this.listen.bind(this));
            this.commandOutput = new CommandOutputed(this.subject);
        }
        get output() {
            return this.commandOutput.output;
        }
        use(input) {
            return this.commandInput.use(input);
        }
        remove(subscription) {
            return this.commandInput.remove(subscription);
        }
        clear() {
            return this.commandInput.clear();
        }
        emit(value) {
            this.subject && this.subject.next(value);
        }
    }
    exports.default = CommandLink;
    // Make a concrete version of CommandInput to be instantiated in CommandLink above
    class CommandInputed extends command_input_1.default {
        constructor(listener) {
            super();
            this.listener = listener;
        }
        listen(value) {
            this.listener && this.listener(value);
        }
    }
    // Make a concrete version of CommandOutput to be instantiated in CommandLink above
    class CommandOutputed extends command_output_1.default {
    }
});
//# sourceMappingURL=command-link.js.map