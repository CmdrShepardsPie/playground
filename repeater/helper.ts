import * as _fs from "fs";
import { promisify } from "util";

export const fs = {
  exists: promisify(_fs.exists),
  mkdir: promisify(_fs.mkdir),
  readFile: promisify(_fs.readFile),
  readdir: promisify(_fs.readdir),
  writeFile: promisify(_fs.writeFile),
};

export function getTextOrNumber(el: Element) {
  const value = getText(el);
  const num = getNumber(value);
  return !isNaN(num) ? num : value;
}

export function getNumber(text: string, reg: RegExp = /([-+]?\d*\.?\d*)/g) {
  let result = NaN;
  if (text && text.match) {
    const match = reg.exec(text);
    // console.log('match', match);
    if (match) {
      result = parseFloat(match[1]);
    }
  }
  return result;
}

export function getText(el: Element) {
  if (el) {
    let text: string = el.innerHTML;
    if (text) {
      text = text.replace(/<script>.*<\/script>/g, " ");
      text = text.replace(/<[^>]*>/g, " ");
      return text.trim();
    }
  }
  return "";
}

export function wait(ms: number, fn?: any) {
  // console.log('wait', ms);
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        resolve(fn && await fn());
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
}

export async function makeDirs(path: string) {
  let tempPath = `.`;
  for (const dir of path.split(`/`)) {
    if (/\./.test(dir)) {
      break;
    }
    tempPath = `${tempPath}/${dir}`;
    if (!(await fs.exists(tempPath))) {
      await fs.mkdir(tempPath);
    }
  }
}

export async function dirExists(path: string) {
  let tempPath = `.`;
  let exists = true;
  for (const dir of path.split(`/`)) {
    tempPath = `${tempPath}/${dir}`;
    exists = await fs.exists(tempPath);
    if (!exists) {
      break;
    }
  }
  return exists;
}

export interface IObject<T> {
  [index: string]: T;
}
