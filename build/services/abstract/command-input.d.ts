import { Subscription } from "rxjs/Subscription";
import ICommandInput from "./i.command-input";
import ICommandOutput from "./i.command-output";
export default abstract class CommandInput<InType> implements ICommandInput<InType> {
    protected subscriptions: Subscription[];
    use(input: ICommandOutput<InType>): any;
    clear(): void;
    remove(subscription: Subscription): void;
    protected abstract listen(value: InType): void;
}
//# sourceMappingURL=command-input.d.ts.map