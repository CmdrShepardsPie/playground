import { Subscription } from 'rxjs/Subscription';
import ICommandOutput from './i.command-output';

export default interface ICommandInput<InType> {
  use(input: ICommandOutput<InType>): Subscription;
  remove(subscription: Subscription): void;
  clear(): void;
}
