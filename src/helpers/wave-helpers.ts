import {IWaveFormat} from "@interfaces/i.wave-format";
import chalk from "chalk";
import * as fs from "fs";
import {makeDirs} from "fs-helpers";
import {bufferToStream, streamToBuffer} from "helpers";
import {createLog} from "node-logger";
import * as path from "path";
import * as wav from "wav";

const log = createLog("Wave Helpers");

export function readWaveFile(filename: string): Promise<{ buffer: Buffer, format: IWaveFormat }> {
  log(chalk.cyan("Read Wave File"), filename);
  return new Promise((resolve) => {
    const file = fs.createReadStream(path.join("asr samples", `${filename}.wav`));
    const reader = new wav.Reader();
    reader.on("format", async (format: IWaveFormat) => {
      const bufferData = await streamToBuffer(reader);
      resolve({buffer: bufferData, format});
    });
    file.pipe(reader);
  });
}

export function writeWaveFile(filename: string, buffer: Buffer) {
  log(chalk.cyan("Write Wave File"), filename);
  return new Promise(async (resolve) => {
    const dumpPath = path.join("output", "audio", filename);
    await makeDirs(dumpPath);
    const outputFileStream = new wav.FileWriter(dumpPath, {
      sampleRate: 16000,
      channels: 1,
      bitDepth: 16,
    });

    const audioStream = bufferToStream(buffer);
    audioStream.pipe(outputFileStream);

    outputFileStream.on("end", async (data: any) => {
      resolve();
    });
  });
}
