import * as _csv from 'csv';
import * as _fs from 'fs';
import { promisify } from 'util';
import { save } from './get-repeaters';
// import * as data from './repeaters/json/Denver, CO.json';

const fs = {
  exists: promisify(_fs.exists),
  writeFile: promisify(_fs.writeFile),
  readFile: promisify(_fs.readFile)
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

// const Frequency = /([-+]?\d+\.?\d*)/;
// const CC = /CC(\d+)/;
// const Tone = /(\d+\.?\d*)/;

export async function read(files: string[], name: string, limit = 0) {
  console.log('read', files, name, limit);
  const fileContents = await Promise.all(files.map(f => fs.readFile(`repeaters/json/${f}.json`)));

  let data = fileContents.reduce((prev, curr) => ([...prev, ...JSON.parse(curr.toString())]), [] as any[]);
  data.sort((a: any, b: any) => (a.Mi - b.Mi));

  data = data.filter(a => a.Use === 'OPEN');

  const mapped = data.map((d: any) => makeRow(d));

  let dupes = 0;
  for (let x = 0; x < mapped.length; x++) {
    const outer = JSON.stringify(mapped[x]);
    for (let y = x + 1; y < mapped.length; y++) {
      if (y === x) {
        throw new Error('y === x');
      }
      const inner = JSON.stringify(mapped[y]);
      if (inner === outer) {
        // console.log();
        // console.log('Dupe', y, inner);
        mapped.splice(y, 1);
        y -= 1;
        dupes += 1;
      }
    }
  }

  for (let x = 0; x < mapped.length; x++) {
    const outer = JSON.stringify(mapped[x]);
    for (let y = x + 1; y < mapped.length; y++) {
      if (y === x) {
        throw new Error('y === x');
      }
      const inner = JSON.stringify(mapped[y]);
      if (inner === outer) {
        console.log();
        console.log('Dupe', y, inner);
        mapped.splice(y, 1);
        y -= 1;
        dupes += 1;
      }
    }
  }

  console.log(name, 'Deduped', dupes);

  mapped.forEach((m: IRepeater, i: number) => m.Location = i);

  if (limit) {
    mapped.splice(limit);
  }

  const options = {
    header: true
  };

  const csv = await stringifyAsync(mapped, options);

  return Promise.all([
    fs.writeFile(`chirp/csv/${name}.csv`, csv),
    fs.writeFile(`chirp/json/${name}.json`, JSON.stringify(mapped))
  ]);
}

function makeRow(item: any) {
  const DTCS = /D(\d+)/;

  const isDigital = Object.entries(item).filter(a => /Enabled/.test(a[0])).length > 0;
  const isNarrow = Object.entries(item).filter(a => /Narrow/i.test(a[1] as string)).length > 0;

  // const Location = 0;
  const Name = item.Call;
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
  const Comment = `${item.Location}`;

  if (typeof UplinkTone === 'number') {
    rToneFreq = UplinkTone;
    Tone = 'Tone';
  } else {
    const d = DTCS.exec(UplinkTone);
    if (d) {
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
    if (d) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsRxCode = n;
        Tone = 'DTCS';
      }
    }
  }

  if (Tone === 'TSQL' && rToneFreq !== cToneFreq) {
    if (!rToneFreq) {
      console.log('No rToneFreq', Name, Frequency, rToneFreq, cToneFreq, Comment);
      // Tone = '';
    } else {
      console.log('Cross', Name, Frequency, rToneFreq, cToneFreq, Comment);
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

export default (Promise.all(
  [
    read([
      'Denver, CO',
      'Littleton, CO',
      'Bailey, CO',
      'Grant, CO',
      'Jefferson, CO',
      'Como, CO',
      'Fairplay, CO',
      'Antero Junction, CO',
      'Buena Vista, CO',
      'Nathrop, CO',
      'Salida, CO',
      'Monarch, CO',
      'Sargents, CO',
      'Parlin, CO',
      'Gunnison, CO',
      'Cimarron, CO',
      'Montrose, CO',
      'Loghill Village, CO',
      'Ridgway, CO',
      'Norwood, CO',
      'Redvale, CO',
      'Naturita, CO',
      'Bedrock, CO',
      'Paradox, CO',
      'La Sal, UT',
      'Spanish Valley, UT',
      'Moab, UT'
    ],'long-way', 300),

    read([
      'Lakewood, CO',
      'Keystone, CO',
      'Breckenridge, CO',
      'Vail, CO',
      'Avon, CO',
      'Glenwood Springs, CO',
      'Rifle, CO',
      'Palisade, CO',
      'Grand Junction, CO',
      'Fruita, CO',
      'Thompson, UT',
      'Crescent Junction, UT'
    ],'short-way', 300),
  ]
));
