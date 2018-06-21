/// <reference types="node" />
import * as _fs from "fs";
export declare const fs: {
    exists: typeof _fs.exists.__promisify__;
    mkdir: typeof _fs.mkdir.__promisify__;
    readFile: typeof _fs.readFile.__promisify__;
    readdir: typeof _fs.readdir.__promisify__;
    writeFile: typeof _fs.writeFile.__promisify__;
};
export declare function getTextOrNumber(el: Element): string | number;
export declare function getNumber(text: string, reg?: RegExp): number;
export declare function getText(el: Element): string;
export declare function wait(ms: number, fn?: any): Promise<{}>;
export declare function makeDirs(path: string): Promise<void>;
export declare function dirExists(path: string): Promise<boolean>;
export interface IObject<T> {
    [index: string]: T;
}
//# sourceMappingURL=helper.d.ts.map