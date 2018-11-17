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
class CommandInputed extends command_input_1.default {
    constructor(listener) {
        super();
        this.listener = listener;
    }
    listen(value) {
        this.listener && this.listener(value);
    }
}
class CommandOutputed extends command_output_1.default {
}
