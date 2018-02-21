import { Subject } from 'rxjs/Subject';

export enum Commands {
  Question,
  Left,
  Right,
  Up,
  Down,
  ChannelUp,
  ChannelDown,
  LastChannel,
  VolumeUp,
  VolumeDown,
  Safe,
  Grid,
  Player,
  Mute,
  Menu,
  Guide,
  Options,
  Record,
  Info,
  Select,
  Back,
  Exit,
  Reset
}

import * as Keys from './keycodes.json';
// "Invert" the key/val pair so we can do a reverse lookup
Object.entries(Keys).forEach(entry => {
  const key = entry[0].toString();
  const val = entry[1].toString();
  if (!Keys[val] || (typeof Keys[val] === 'string' && Keys[val].length > key.length)) {
    Keys[val] = key;
  }
});
export { Keys };
//
// export interface ICommandChain<I, O = I> {
//   input<T>(input: CommandChain<T, I>): void;
//   clear(): void;
// }
// implements ICommandChain<I, O>
import { Observable, pipe } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/share';

export abstract class CommandChain<I, O = I> {
  protected subject: Subject<O>;
  protected observable: Observable<O>;
  protected subscribers: Subscription[] = [];

  constructor() {
    this.subject = new Subject();
    this.observable = this.subject.share();
  }

  protected get output(): Observable<O> {
    return this.observable;
  }

  public use<T>(input: CommandChain<T, I>) {
    const subscriber = input.output.subscribe(this.listen && this.listen.bind(this));
    this.subscribers.push(subscriber);
    return subscriber;
  }

  public clear() {
    while (this.subscribers.length) {
      const sub = this.subscribers.pop();
      sub && sub.unsubscribe();
    }
  }

  public remove(subscriber: Subscription) {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      subscriber.unsubscribe();
      this.subscribers.splice(index, 1);
    }
  }

  protected abstract listen(value: I): void;

  protected emit(value: O): void {
    this.subject.next(value);
  }
}
