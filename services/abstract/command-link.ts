// tslint:disable:max-classes-per-file

import ICommandOutput from './i.command-output';
import ICommandLink from './i.command-link';
import CommandInput from './command-input';
import CommandOutput from './command-output';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

export default abstract class CommandLink<InType, OutType = InType> implements ICommandLink<InType, OutType> {
  protected subject: Subject<OutType> = new Subject();
  protected commandInput = new CommandInputed<InType>(this.listen.bind(this));
  protected commandOutput = new CommandOutputed<OutType>(this.subject);

  public get output(): Observable<OutType> {
    return this.commandOutput.output;
  }

  public use(input: ICommandOutput<InType>): Subscription {
    return this.commandInput.use(input);
  }

  public remove(subscription: Subscription): void {
    return this.commandInput.remove(subscription);
  }

  public clear(): void {
    return this.commandInput.clear();
  }

  protected emit(value: OutType): void {
    this.subject && this.subject.next(value);
  }

  protected abstract listen(value: InType): void;
}

// Make a concrete version of CommandInput to be instantiated in CommandLink above
class CommandInputed<InType> extends CommandInput<InType> {
  constructor(private listener: (value: InType) => void) {
    super();
  }
  protected listen(value: InType): void {
    this.listener && this.listener(value);
  }
}

// Make a concrete version of CommandOutput to be instantiated in CommandLink above
class CommandOutputed<OutType> extends CommandOutput<OutType> {}
