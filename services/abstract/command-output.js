import "rxjs/add/operator/share";
import { Subject } from "rxjs/Subject";
export default class CommandOutput {
    // protected subject: Subject<OutType>;
    // protected observable: Observable<OutType>;
    constructor(subject = new Subject(), observable = subject.share()) {
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
//# sourceMappingURL=command-output.js.map