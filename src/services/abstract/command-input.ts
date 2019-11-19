import { Subscription } from "rxjs/Subscription";
import ICommandInput from "./i.command-input";
import ICommandOutput from "./i.command-output";

export default abstract class CommandInput<InType> implements ICommandInput<InType> {
  protected subscriptions: Subscription[] = [];

  public use(input: ICommandOutput<InType>) {
    const subscriber = input.output.subscribe(this.listen && this.listen.bind(this));
    this.subscriptions.push(subscriber);
    return subscriber;
  }

  public clear() {
    while (this.subscriptions.length) {
      const sub = this.subscriptions.pop();
      sub && sub.unsubscribe();
    }
  }

  public remove(subscription: Subscription) {
    const index = this.subscriptions.indexOf(subscription);
    if (index > -1) {
      subscription.unsubscribe();
      this.subscriptions.splice(index, 1);
    }
  }

  protected abstract listen(value: InType): void;
}
