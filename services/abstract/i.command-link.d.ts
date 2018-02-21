import ICommandInput from './i.command-input';
import ICommandOutput from './i.command-output';

export default interface ICommandLink<InType, OutType = InType> extends ICommandInput<InType>, ICommandOutput<OutType> {}
