import * as _fs from "fs";
import { promisify } from "util";

export const existsAsync = promisify(_fs.exists);
export const mkdirAsync = promisify(_fs.mkdir);
export const readFileAsync = promisify(_fs.readFile);
export const readdirAsync = promisify(_fs.readdir);
export const writeFileAsync = promisify(_fs.writeFile);

export async function makeDirs(path: string) {
  // log(chalk.green("Make dirs"), path);
  let tempPath = `.`;
  for (const dir of path.split(/[/\\]/)) {
    if (/\./.test(dir)) {
      break;
    }
    tempPath = `${tempPath}/${dir}`;
    if (!(await existsAsync(tempPath))) {
      // log(chalk.blue("make"), tempPath);
      try {
        await mkdirAsync(tempPath);
      } catch (e) { }
    }
  }
}

export async function dirExists(path: string) {
  let tempPath = `.`;
  let exists = true;
  for (const dir of path.split(/[/\\]/)) {
    tempPath = `${tempPath}/${dir}`;
    exists = await existsAsync(tempPath);
    if (!exists) {
      break;
    }
  }
  return exists;
}

export async function writeToJsonAndCsv(filename: string, jsonData: any, csvData: any = jsonData) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  const jsonName = `${filename}.json`;
  await makeDirs(jsonName);
  await writeFileAsync(jsonName, jsonString);

  // const csvPrep = Array.isArray(csvData) ?
  //   fillArrayObjects(csvData.map((r: any) => flattenObject(r))) :
  //   [flattenObject(csvData)];
  // const csvString = await stringifyAsync(csvPrep, {header: true});
  // const csvName = `${filename}.csv`;
  // await writeFileAsync(csvName, csvString);
}

export function splitExtension(filename: string) {
  const name = filename.substring(0, filename.lastIndexOf("."));
  const ext = filename.substring(filename.lastIndexOf(".") + 1);
  return { name, ext };
}

// Not used, so commented out to avoid confusion
// export async function dump(url: string, data: any) {
//   console.log("dump", url);
//   const parts = url.split(/[\/?:]/g);
//   let path = `../spectrum-guide-twc-dump`;
//   for (const part of parts) {
//     if (!(await fs.existsAsync(path))) {
//       await fs.mkdirAsync(path);
//     }
//     path = `${path}/${part}`;
//   }
//   await fs.writeFileAsync(`${path}.json`, JSON.stringify(data, null, 2));
// }
