import gpsDistance from 'gps-distance';
export declare function wait<T = void>(ms: number, fn?: () => (T | Promise<T>)): Promise<T>;
export declare function numberToString(num: number, major?: number, minor?: number): string;
export declare function flattenObject(data: any): any;
export declare function splitCoordinates(input: string): gpsDistance.Point;
export declare function checkCoordinates(point: gpsDistance.Point): boolean;
export declare const secondMS: number;
export declare const minuteMS: number;
export declare const hourMS: number;
export declare const dayMS: number;
export declare const weekMS: number;
//# sourceMappingURL=helpers.d.ts.map