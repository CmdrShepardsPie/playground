import "rxjs/add/operator/share";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import ICommandOutput from "./i.command-output";
export default abstract class CommandOutput<OutType> implements ICommandOutput<OutType> {
    protected subject: Subject<OutType>;
    protected observable: Observable<OutType>;
    constructor(subject?: Subject<OutType>, observable?: Observable<OutType>);
    readonly output: Observable<OutType>;
    protected emit(value: OutType): void;
}
//# sourceMappingURL=command-output.d.ts.map