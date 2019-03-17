import { IWaveFormat } from "@interfaces/i.wave-format";
export declare function readWaveFile(filename: string): Promise<{
    buffer: Buffer;
    format: IWaveFormat;
}>;
export declare function writeWaveFile(filename: string, buffer: Buffer): Promise<{}>;
//# sourceMappingURL=wave-helpers.d.ts.map