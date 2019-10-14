declare function finished(value: any): string;
declare function handleError(value: any): string;
declare function doSomethingEventually(value: any, onFinished: any, onError: any): void;
declare function doSomethingWithAPromise(value: any): Promise<unknown>;
declare function doSomethingUsingAsync(value: any): Promise<string>;
declare function doMultipleThingsAtTheSameTime(values: any): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
declare function doMultipleThingsOneAtATime(values: any): Promise<string[]>;
declare function doAllTheThings(): Promise<void>;
declare function asyncWaitForKeyPress(): Promise<unknown>;
//# sourceMappingURL=promises-and-async.d.ts.map