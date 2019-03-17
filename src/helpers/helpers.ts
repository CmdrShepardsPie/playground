// tslint:disable:max-classes-per-file

import {createLog} from "node-logger";
import chalk from "chalk";
import * as stream from "stream";

const log = createLog("Helpers");

export function wait(ms: number, fn?: any) {
  log(chalk.green("Wait"), ms);
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        resolve(fn && (await fn()));
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
}

export function stringToNumber(str: string) {
  const nonNumber = /[^0-9.]*/gi;
  const decimal = /\./gi;
  const fixed = str.replace(nonNumber, "");
  const num = decimal.test(fixed) ? parseFloat(fixed) : parseInt(fixed, 10);
  if (!isNaN(num)) {
    return num;
  }
  return str;
}

export function numberToString(num: number, major?: number, minor?: number) {
  let str = num.toString();
  const split = str.split(".");
  if (major !== undefined) {
    if (split[0] === undefined) {
      split[0] = "0";
    }
    while (split[0].length < major) {
      split[0] = "0" + split[0];
    }
    str = split.join(".");
  }
  if (minor !== undefined) {
    if (split[1] === undefined) {
      split[1] = "0";
    }
    while (split[1].length < minor) {
      split[1] = split[1] + "0";
    }
    str = split.join(".");
  }
  return str;
}
// @AlwaysThis is kinda broken as it turns out
// WARNING: AlwaysThis modifies the object prototype which can cause problems
// tslint:disable-next-line:ban-types
// export function AlwaysThis<T extends Function>(construconstructor: T): T;
// export function AlwaysThis<T extends { new (...args: any[]): {} }>(
//   constructor: T,
// ) {
//   let self: any;
//   const wrapper = class extends constructor {
//     constructor(...args: any[]) {
//       super(...args);
//       self = this;
//       // console.log("AlwaysThis", "constructor", constructor.name, self);
//     }
//   };

//   const prototype = constructor.prototype;
//   const descriptors = Object.getOwnPropertyDescriptors(prototype);
//   Object.keys(descriptors).forEach((key) => {
//     const descriptor = descriptors[key];
//     if (typeof descriptor.value === "function" && key !== "constructor" && key !== "prototype") {
//       // console.log("AlwaysThis", "function", constructor.name, key, self);
//       const originalFunction = descriptor.value;
//       // tslint:disable-next-line:only-arrow-functions
//       descriptor.value = function() {
//         // console.log("AlwaysThis", "call", constructor.name, key, self);
//         return originalFunction.apply(self, arguments);
//       };
//       Object.defineProperty(wrapper.prototype, key, descriptor);
//     }
//   });
//   // console.log("ApplyThis", "wrapper", wrapper, "prototype", wrapper.prototype);

//   return wrapper;
// }

export function buildTemplateString(template: string, params: any) {
  let parsedTemplate = template;
  const tempRegex = /\{([^}]*)\}/gi;
  let match = tempRegex.exec(template);
  while (match) {
    const rawVal = params[match[1]];
    if (rawVal !== undefined) {
      const parsedVal = buildTemplateString(rawVal, params);
      parsedTemplate = parsedTemplate.replace(
        new RegExp(match[0], "gi"),
        parsedVal,
      );
    }
    match = tempRegex.exec(template);
  }
  return parsedTemplate;
}

export function numberBounds(current: number, min: number, max: number) {
  return Math.max(min, Math.min(max, current));
}

export interface IStringKeys<P> {
  [index: string]: P;
}

export interface INumberKeys<P> {
  [index: number]: P;
}

export function stringKeys<T>(inValue: T) {
  return inValue as typeof inValue & IStringKeys<number>;
}

// tslint:disable-next-line:ban-types
export function getPrototypeStack<T extends Function>(constructor: T): T[];
export function getPrototypeStack<T extends { new(...args: any[]): {} }>(
  constructor: T,
): T[] {
  const prototypes = [];
  let prototype = constructor;
  while (prototype) {
    prototypes.push(prototype);
    prototype = prototype.prototype;
  }
  return prototypes;

}

export function bufferOrJson(data: Buffer | object): Buffer | string {
  return data instanceof Buffer ? data : JSON.stringify(data, null, 2);
}

export function messageToJSON(message: any) {
  let data = message;
  if (typeof message === "string") {
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.log("could not parseHRL message as JSON");
    }
  }
  return data;

}

export function flattenObject(data: IStringKeys<any>) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return data;
  }
  let subData: IStringKeys<any> = {...data};
  let loop = true;
  while (loop) {
    loop = false;
    const entries = Object.entries(subData);
    for (const entry of entries) {
      const key = entry[0];
      const value = entry[1];
      if (typeof value === "object" && !Array.isArray(value)) {
        delete subData[key];
        const valueWithKeynames: any = {};
        Object.entries(value).forEach((subEntry) => {
          valueWithKeynames[`${key}.${subEntry[0]}`] = subEntry[1];
        });
        subData = {...subData, ...valueWithKeynames};
        loop = true;
      }
    }
  }
  return subData;
}

export function streamToBuffer(inStream: stream): Promise<Buffer> {
  log(chalk.yellow("Stream to Buffer"));
  if (!(inStream instanceof stream.PassThrough)) {
    log(chalk.red("Not a PassThrough stream"));
  } else {
    log(chalk.green("Is a PassThrough stream"));
  }
  if (!(inStream instanceof stream.Stream)) {
    log(chalk.red("Not a Stream stream"));
  } else {
    log(chalk.green("Is a Stream stream"));
  }
  if (!(inStream instanceof stream.Duplex)) {
    log(chalk.red("Not a Duplex stream"));
  } else {
    log(chalk.green("Is a Duplex stream"));
  }
  if (!(inStream instanceof stream.Writable)) {
    log(chalk.red("Not a Writable stream"));
  } else {
    log(chalk.green("Is a Writable stream"));
  }
  if (!(inStream instanceof stream.Readable)) {
    log(chalk.red("Not a Readable stream"));
  } else {
    log(chalk.green("Is a Readable stream"));
  }
  if (!(inStream instanceof stream.Transform)) {
    log(chalk.red("Not a Transform stream"));
  } else {
    log(chalk.green("Is a Transform stream"));
  }
  return new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    inStream.on("error", (err) => { log(chalk.red("Error"), err); reject(err); });
    inStream.on("data", (data) => { log(chalk.yellow("Data"), data.length); buffers.push(data); });
    inStream.on("end", () => { log(chalk.green("End")); resolve(Buffer.concat(buffers)); });
  });
}

export function bufferToStream(buffer: Buffer) {
  log(chalk.yellow("Buffer to Stream"));
  if (!(buffer instanceof Buffer)) {
    log(chalk.red("Not a Buffer"));
  } else {
    log(chalk.green("Is a Buffer"));
  }
  if (!(buffer instanceof Int8Array)) {
    log(chalk.red("Not a Int8Array"));
  } else {
    log(chalk.green("Is a Int8Array"));
  }
  if (!(buffer instanceof Uint8ClampedArray)) {
    log(chalk.red("Not a Uint8ClampedArray"));
  } else {
    log(chalk.green("Is a Uint8ClampedArray"));
  }
  if (!(buffer instanceof Uint8Array)) {
    log(chalk.red("Not a Uint8Array"));
  } else {
    log(chalk.green("Is a Uint8Array"));
  }
  if (!(buffer instanceof Uint16Array)) {
    log(chalk.red("Not a Uint16Array"));
  } else {
    log(chalk.green("Is a Uint16Array"));
  }
  if (!(buffer instanceof Uint32Array)) {
    log(chalk.red("Not a Uint32Array"));
  } else {
    log(chalk.green("Is a Uint32Array"));
  }
  if (!(buffer instanceof Float32Array)) {
    log(chalk.red("Not a Float32Array"));
  } else {
    log(chalk.green("Is a Float32Array"));
  }
  if (!(buffer instanceof Float64Array)) {
    log(chalk.red("Not a Float64Array"));
  } else {
    log(chalk.green("Is a Float64Array"));
  }
  const outStream = new stream.Duplex();
  outStream.push(buffer);
  outStream.push(null);
  return outStream;
}
