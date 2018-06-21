import * as _csv from "csv";
import * as _fs from "fs";
import { promisify } from "util";
import { save } from "./get-repeaters";
import { IObject, wait } from "./helper";
// import * as data from './repeaters/json/Denver, CO.json';

const fs = {
  exists: promisify(_fs.exists),
  writeFile: promisify(_fs.writeFile),
  readFile: promisify(_fs.readFile),
  readdir: promisify(_fs.readdir),
  mkdir: promisify(_fs.mkdir),
};

const parseAsync = promisify(_csv.parse);
const stringifyAsync = promisify(_csv.stringify);

interface IRepeater {
  Location: number;
  Name: string;
  Frequency: number;
  Duplex: string;
  Offset: number;
  Tone: string;
  rToneFreq: number;
  cToneFreq: number;
  DtcsCode: number;
  DtcsRxCode: number;
  DtcsPolarity: string;
  Mode: string;
  TStep: number;
  Comment: string;
  [index: string]: any;
}

const repeater = {
  Location: "",
  Name: "",
  Frequency: "",
  Duplex: "",
  Offset: "",
  Tone: "",
  rToneFreq: "",
  cToneFreq: "",
  DtcsCode: "",
  DtcsRxCode: "",
  DtcsPolarity: "NN",
  Mode: "FM",
  TStep: 5,
  Comment: "",
};

async function combine() {
  let last = -1;
  let show = true;
  const progressInterval = setInterval(() => {
    show = true;
  }, 1000);

  const aliases: any = {};
  const allData: any[] = [];

  console.log("\nGetting directory");

  const allFiles = (await fs.readdir("./repeaters/json")).filter((b) => /\.json/.test(b));

  console.log("\nReading files", allFiles);

  await Promise.all(allFiles.map(async (file) => {
    const contents = await fs.readFile(`./repeaters/json/${file}`);
    const data = JSON.parse(contents.toString());

    allData.push(...data.map((d: any) => makeRow(d, "Sponsor")).filter((d: any) => !!d.Comment));
    allData.push(...data.map((d: any) => makeRow(d, "Affiliate")).filter((d: any) => !!d.Comment));
    allData.push(...data.map((d: any) => makeRow(d, "Call")).filter((d: any) => !!d.Comment));
  }));

  last = -1;
  show = true;
  console.log("\nDeduping", allData.length);
  console.log(`0% (0/${allData.length})`);
  for (let x = 0; x < allData.length; x++) {
    const outer = JSON.stringify(allData[x]);
    for (let y = x + 1; y < allData.length; y++) {
      if (y === x) {
        throw new Error("y === x");
      }
      const inner = JSON.stringify(allData[y]);
      if (inner === outer) {
        allData.splice(y, 1);
        y -= 1;
      }
    }
    await wait(0);
    if (show) {
      const progress = (x / allData.length) * 100;
      show = false;
      console.log(`${progress.toFixed(4)}% (${x}/${allData.length}) ${x - last} per second`);
      last = x;
    }
  }
  console.log(`100% (${allData.length}/${allData.length})`);

  last = -1;
  show = true;
  console.log("\nMerging Comments", allData.length);
  console.log(`0% (0/${allData.length})`);
  for (const data of allData) {
    const x = allData.indexOf(data);
    if (!aliases[data.Comment]) {
      aliases[data.Comment] = [];
    }

    const aliasEntries = Object.entries(aliases);
    for (const entry of aliasEntries) {
      const name = entry[0];
      const aliasList = entry[1];
      if (data.Comment && name && (new RegExp(name, "i").test(data.Comment) || new RegExp(data.Comment, "i").test(name))) {
        // console.log(`Found alias for ${data.Comment}: ${name}`);
        if (aliases[data.Comment].indexOf(data) === -1) {
          aliases[data.Comment].push(data);
        }
        if (aliases[name].indexOf(data) === -1) {
          aliases[name].push(data);
        }
      }
    }
    await wait(0);
    if (show) {
      const progress = (x / allData.length) * 100;
      show = false;
      console.log(`${progress.toFixed(4)}% (${x}/${allData.length}) ${x - last} per second (${aliasEntries.length} aliases)`);
      last = x;
    }
  }
  console.log(`100% (${allData.length}/${allData.length})`);

  last = -1;
  show = true;
  console.log("\nMerging Comments", allData.length);
  console.log(`0% (0/${allData.length})`);
  for (const data of allData) {
    const x = allData.indexOf(data);
    if (!aliases[data.Comment]) {
      aliases[data.Comment] = [];
    }

    const aliasEntries = Object.entries(aliases);
    for (const entry of aliasEntries) {
      const name = entry[0];
      const aliasList = entry[1];
      if (data.Comment && name && (new RegExp(name, "i").test(data.Comment) || new RegExp(data.Comment, "i").test(name))) {
        // console.log(`Found alias for ${data.Comment}: ${name}`);
        if (aliases[data.Comment].indexOf(data) === -1) {
          aliases[data.Comment].push(data);
        }
        if (aliases[name].indexOf(data) === -1) {
          aliases[name].push(data);
        }
      }
    }
    await wait(0);
    if (show) {
      const progress = (x / allData.length) * 100;
      show = false;
      console.log(`${progress.toFixed(4)}% (${x}/${allData.length}) ${x - last} per second (${aliasEntries.length} aliases)`);
      last = x;
    }
  }
  console.log(`100% (${allData.length}/${allData.length})`);

  last = -1;
  show = true;
  console.log("\nMerging Comments", allData.length);
  console.log(`0% (0/${allData.length})`);
  for (const data of allData) {
    const x = allData.indexOf(data);
    if (!aliases[data.Comment]) {
      aliases[data.Comment] = [];
    }

    const aliasEntries = Object.entries(aliases);
    for (const entry of aliasEntries) {
      const name = entry[0];
      const aliasList = entry[1];
      if (data.Comment && name && (new RegExp(name, "i").test(data.Comment) || new RegExp(data.Comment, "i").test(name))) {
        // console.log(`Found alias for ${data.Comment}: ${name}`);
        if (aliases[data.Comment].indexOf(data) === -1) {
          aliases[data.Comment].push(data);
        }
        if (aliases[name].indexOf(data) === -1) {
          aliases[name].push(data);
        }
      }
    }
    await wait(0);
    if (show) {
      const progress = (x / allData.length) * 100;
      show = false;
      console.log(`${progress.toFixed(4)}% (${x}/${allData.length}) ${x - last} per second (${aliasEntries.length} aliases)`);
      last = x;
    }
  }
  console.log(`100% (${allData.length}/${allData.length})`);

  console.log("\nReducing");

  const bigData = allData.reduce((prev, next) => {
    if (!prev[next.Comment]) {
      prev[next.Comment] = [];
    }
    prev[next.Comment].push(next);
    return prev;
  }, {} as any);

  // console.log('\nGrouping');
  //
  // const groups = aliases; // Object.entries(bigData).map(entry => ({ name: entry[0], count: (entry[1] as any).length }));
  //
  // console.log('\nSorting');
  //
  // groups.sort((a: any, b: any) => b.length - a.length);
  //
  // console.log(groups);

  const options = {
    header: true,
  };

  console.log("\nSaving");

  if (!(await fs.exists(`chirp/csv/networks/`))) {
    await fs.mkdir(`chirp/csv/networks/`);
  }
  if (!(await fs.exists(`chirp/json/networks/`))) {
    await fs.mkdir(`chirp/json/networks/`);
  }

  await Promise.all(Object.entries(aliases).map(async (entry) => {

    const name = entry[0];
    const list = entry[1] as any[];
    if (list.length > 1) {
      console.log(`Generating ${name}`);
      const csv = await stringifyAsync(list, options);
      console.log(` Writing ${name}`);
      await Promise.all([
        fs.writeFile(`chirp/csv/networks/${name.replace(/\//g, " ")}.csv`, csv),
        fs.writeFile(`chirp/json/networks/${name.replace(/\//g, " ")}.json`, JSON.stringify(list)),
      ]);
      console.log(`  Finished ${name}`);
    }
  }));
  console.log(`Saved`);
  clearInterval(progressInterval);
}

function makeRow(item: any, comment: string) {
  const DTCS = /D(\d+)/;

  const isDigital = Object.entries(item).filter((a) => /Enabled/.test(a[0])).length > 0;
  const isNarrow = Object.entries(item).filter((a) => /Narrow/i.test(a[1] as string)).length > 0;

  // const Location = 0;
  const Name = `${item.Call} ${item.Frequency}`;
  const Frequency = item.Frequency;
  const Duplex = item.Offset > 0 ? "+" : item.Offset < 0 ? "-" : "";
  const Offset = Math.abs(item.Offset);
  const UplinkTone = item["Uplink Tone"] || item.Tone;
  const DownlinkTone = item["Downlink Tone"];
  let cToneFreq: any = "";
  let rToneFreq: any = "";
  let DtcsCode: any = "";
  let DtcsRxCode: any = "";
  let Tone = "";
  const Mode = isDigital ? "DIG" : isNarrow ? "NFM" : "FM";
  const Comment = item[comment];

  if (typeof UplinkTone === "number") {
    rToneFreq = UplinkTone;
    Tone = "Tone";
  } else {
    const d = DTCS.exec(UplinkTone);
    if (d && d[1]) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsCode = n;
        Tone = "DTCS";
      }
    }
  }

  if (typeof DownlinkTone === "number") {
    cToneFreq = DownlinkTone;
    Tone = "TSQL";
  } else {
    const d = DTCS.exec(DownlinkTone);
    if (d && d[1]) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsRxCode = n;
        Tone = "DTCS";
      }
    }
  }

  if (Tone === "TSQL" && rToneFreq !== cToneFreq) {
    if (!rToneFreq) {
      // console.log('No rToneFreq', Name, Frequency, rToneFreq, cToneFreq, Comment);
      // Tone = '';
    } else {
      // console.log('Cross', Name, Frequency, rToneFreq, cToneFreq, Comment);
      Tone = "Cross";
    }
  }

  cToneFreq = cToneFreq || 88.5;
  rToneFreq = rToneFreq || 88.5;
  DtcsCode = DtcsCode || 23;
  DtcsRxCode = DtcsRxCode || 23;

  const row: IRepeater = {
    ...repeater as any,
    // Location,
    Name,
    Frequency,
    Duplex,
    Offset,
    rToneFreq,
    cToneFreq,
    DtcsCode,
    DtcsRxCode,
    Tone,
    Mode,
    Comment,
  };
  return row;
}

export default combine();
