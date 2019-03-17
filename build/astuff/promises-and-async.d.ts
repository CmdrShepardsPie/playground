declare function finished(value: any): string;
declare function handleError(value: any): string;
declare function doSomethingEventually(value: any, onFinished: any, onError: any): void;
declare function doSomethingWithAPromise(value: any): Promise<{}>;
declare function doSomethingUsingAsync(value: any): Promise<string>;
declare function doMultipleThingsAtTheSameTime(values: any): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
declare function doMultipleThingsOneAtATime(values: any): Promise<string[]>;
declare function doAllTheThings(): Promise<void>;
declare function asyncWaitForKeyPress(): Promise<{}>;
//# sourceMappingURL=promises-and-async.d.ts.map