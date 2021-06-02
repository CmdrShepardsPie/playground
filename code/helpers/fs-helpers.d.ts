/// <reference types="node" />
import { Stats } from 'fs';
export declare const existsAsync: (path: string) => Promise<boolean>;
export declare const mkdirAsync: (path: string) => Promise<void>;
export declare const readFileAsync: (path: string | number) => Promise<Buffer>;
export declare const readdirAsync: (path: string) => Promise<string[]>;
export declare const writeFileAsync: (path: string | number, data: any) => Promise<void>;
export declare const statAsync: (arg1: string) => Promise<Stats>;
export declare function makeDirs(filePath: string): Promise<void>;
export declare function dirExists(filePath: string): Promise<boolean>;
export declare function writeToJson(filename: string, jsonData: any | any[]): Promise<void>;
export declare function writeToCsv(filename: string, csvData: any | any[], header?: boolean): Promise<void>;
export declare function readFromJson<T>(filename: string): Promise<T>;
export declare function readFromCsv<T>(filename: string, columns?: boolean, cast?: boolean): Promise<T[]>;
export declare function splitExtension(filename: string): {
    ext: string;
    name: string;
    path: string;
};
export declare function getAllFilesInDirectory(directory: string, extension?: string, subdirectories?: number): Promise<string[]>;
//# sourceMappingURL=fs-helpers.d.ts.map