import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import CommandInput from "./command-input";
import CommandOutput from "./command-output";
import ICommandLink from "./i.command-link";
import ICommandOutput from "./i.command-output";
export default abstract class CommandLink<InType, OutType = InType> implements ICommandLink<InType, OutType> {
    protected subject: Subject<OutType>;
    protected commandInput: CommandInputed<InType>;
    protected commandOutput: CommandOutputed<OutType>;
    readonly output: Observable<OutType>;
    use(input: ICommandOutput<InType>): Subscription;
    remove(subscription: Subscription): void;
    clear(): void;
    protected emit(value: OutType): void;
    protected abstract listen(value: InType): void;
}
declare class CommandInputed<InType> extends CommandInput<InType> {
    private listener;
    constructor(listener: (value: InType) => void);
    protected listen(value: InType): void;
}
declare class CommandOutputed<OutType> extends CommandOutput<OutType> {
}
export {};
//# sourceMappingURL=command-link.d.ts.map