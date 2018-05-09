import * as _csv from 'csv';
import * as _fs from 'fs';
import { promisify } from 'util';
import { save } from './get-repeaters';
import { IObject } from './helper';
// import * as data from './repeaters/json/Denver, CO.json';

const fs = {
  exists: promisify(_fs.exists),
  writeFile: promisify(_fs.writeFile),
  readFile: promisify(_fs.readFile),
  readdir: promisify(_fs.readdir),
  mkdir: promisify(_fs.mkdir)
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
  Location: '',
  Name: '',
  Frequency: '',
  Duplex: '',
  Offset: '',
  Tone: '',
  rToneFreq: '',
  cToneFreq: '',
  DtcsCode: '',
  DtcsRxCode: '',
  DtcsPolarity: 'NN',
  Mode: 'FM',
  TStep: 5,
  Comment: ''
};

async function combine() {
  const allData: any[] = [];

  console.log('Getting directory');

  const allFiles = (await fs.readdir('./repeaters/json')).filter(b => /\.json/.test(b));

  console.log('Reading files');

  await Promise.all(allFiles.map(async file => {
    const contents = await fs.readFile(`./repeaters/json/${file}`);
    const data = JSON.parse(contents.toString());
    allData.push(...data.map((d: any) => makeRow(d, 'Sponsor')));
    allData.push(...data.map((d: any) => makeRow(d, 'Affiliate')));
  }));

  console.log('Deduping');

  for (let x = 0; x < allData.length; x++) {
    const outer = JSON.stringify(allData[x]);
    for (let y = x + 1; y < allData.length; y++) {
      if (y === x) {
        throw new Error('y === x');
      }
      const inner = JSON.stringify(allData[y]);
      if (inner === outer) {
        allData.splice(y, 1);
        y -= 1;
      }
    }
  }

  console.log('Reducing');

  const bigData = allData.reduce((prev, next) => {
    if (!prev[next.Comment]) {
      prev[next.Comment] = [];
    }
    prev[next.Comment].push(next);
    return prev;
  }, {} as any);

  console.log('Grouping');

  const groups = Object.entries(bigData).map(entry => ({ name: entry[0], count: (entry[1] as any).length }));

  console.log('Sorting');

  groups.sort((a: any, b: any) => b.count - a.count);

  console.log(groups);

  const options = {
    header: true
  };

  console.log('Saving');

  if (!(await fs.exists(`chirp/csv/networks/`))) {
    await fs.mkdir(`chirp/csv/networks/`);
  }
  if (!(await fs.exists(`chirp/json/networks/`))) {
    await fs.mkdir(`chirp/json/networks/`);
  }

  await Promise.all(Object.entries(bigData).map(async entry => {

    const csv = await stringifyAsync(entry[1], options);

    return Promise.all([
      fs.writeFile(`chirp/csv/networks/${entry[0].replace(/\//g, ' ')}.csv`, csv),
      fs.writeFile(`chirp/json/networks/${entry[0].replace(/\//g, ' ')}.json`, JSON.stringify(entry[1]))
    ]);

  }));
}

function makeRow(item: any, comment: string) {
  const DTCS = /D(\d+)/;

  const isDigital = Object.entries(item).filter(a => /Enabled/.test(a[0])).length > 0;
  const isNarrow = Object.entries(item).filter(a => /Narrow/i.test(a[1] as string)).length > 0;

  // const Location = 0;
  const Name = `${item.Call} ${item.Frequency}`;
  const Frequency = item.Frequency;
  const Duplex = item.Offset > 0 ? '+' : item.Offset < 0 ? '-' : '';
  const Offset = Math.abs(item.Offset);
  const UplinkTone = item['Uplink Tone'] || item.Tone;
  const DownlinkTone = item['Downlink Tone'];
  let cToneFreq: any = '';
  let rToneFreq: any = '';
  let DtcsCode: any = '';
  let DtcsRxCode: any = '';
  let Tone = '';
  const Mode = isDigital ? 'DIG' : isNarrow ? 'NFM' : 'FM';
  const Comment = `${item[comment]}`;

  if (typeof UplinkTone === 'number') {
    rToneFreq = UplinkTone;
    Tone = 'Tone';
  } else {
    const d = DTCS.exec(UplinkTone);
    if (d && d[1]) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsCode = n;
        Tone = 'DTCS';
      }
    }
  }

  if (typeof DownlinkTone === 'number') {
    cToneFreq = DownlinkTone;
    Tone = 'TSQL';
  } else {
    const d = DTCS.exec(DownlinkTone);
    if (d && d[1]) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsRxCode = n;
        Tone = 'DTCS';
      }
    }
  }

  if (Tone === 'TSQL' && rToneFreq !== cToneFreq) {
    if (!rToneFreq) {
      // console.log('No rToneFreq', Name, Frequency, rToneFreq, cToneFreq, Comment);
      // Tone = '';
    } else {
      // console.log('Cross', Name, Frequency, rToneFreq, cToneFreq, Comment);
      Tone = 'Cross';
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
    Comment
  };
  return row;
}

export default combine();
