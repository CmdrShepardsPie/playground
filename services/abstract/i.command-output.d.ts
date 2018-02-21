import { Observable } from 'rxjs/Observable';

export default interface ICommandOutput<OutType> {
  output: Observable<OutType>;
}
