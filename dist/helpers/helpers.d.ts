/// <reference types="node" />
import * as stream from "stream";
export declare function wait(ms: number, fn?: any): Promise<unknown>;
export declare function stringToNumber(str: string): string | number;
export declare function numberToString(num: number, major?: number, minor?: number): string;
export declare function buildTemplateString(template: string, params: any): string;
export declare function numberBounds(current: number, min: number, max: number): number;
export interface IStringKeys<P> {
    [index: string]: P;
}
export interface INumberKeys<P> {
    [index: number]: P;
}
export declare function stringKeys<T>(inValue: T): T & IStringKeys<number>;
export declare function getPrototypeStack<T extends Function>(constructor: T): T[];
export declare function bufferOrJson(data: Buffer | object): Buffer | string;
export declare function messageToJSON(message: any): any;
export declare function flattenObject(data: IStringKeys<any>): IStringKeys<any>;
export declare function streamToBuffer(inStream: stream): Promise<Buffer>;
export declare function bufferToStream(buffer: Buffer): stream.Duplex;
//# sourceMappingURL=helpers.d.ts.map