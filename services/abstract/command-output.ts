import ICommandOutput from './i.command-output';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

export default abstract class CommandOutput<OutType> implements ICommandOutput<OutType> {
  // protected subject: Subject<OutType>;
  // protected observable: Observable<OutType>;

  constructor(protected subject: Subject<OutType> = new Subject(), protected observable: Observable<OutType> = subject.share()) {}

  public get output(): Observable<OutType> {
    return this.observable;
  }

  protected emit(value: OutType): void {
    this.subject && this.subject.next(value);
  }
}
