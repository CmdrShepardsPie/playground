declare function LockThat(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function LockThis<T extends Function>(constructor: T): T;
declare class Something {
    private foo;
    doIt(someVar?: string): string;
}
declare abstract class Blah {
    protected something: string;
    protected other: string;
    saySomething(): string;
    otherThing(): string;
}
declare class Spoon extends Blah {
    protected something: string;
    saySomething(): string;
}
declare const its: Spoon;
//# sourceMappingURL=decorator.d.ts.map