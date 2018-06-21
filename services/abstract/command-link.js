// tslint:disable:max-classes-per-file
import { Subject } from "rxjs/Subject";
import CommandInput from "./command-input";
import CommandOutput from "./command-output";
export default class CommandLink {
    constructor() {
        this.subject = new Subject();
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
// Make a concrete version of CommandInput to be instantiated in CommandLink above
class CommandInputed extends CommandInput {
    constructor(listener) {
        super();
        this.listener = listener;
    }
    listen(value) {
        this.listener && this.listener(value);
    }
}
// Make a concrete version of CommandOutput to be instantiated in CommandLink above
class CommandOutputed extends CommandOutput {
}
//# sourceMappingURL=command-link.js.map