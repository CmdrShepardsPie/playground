import * as parse from 'csv-parse/lib/sync';
import * as stringify from 'csv-stringify/lib/sync';
import * as fs from 'fs';

interface IRepeaters {
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
}

const file = fs.readFileSync(`./RepeaterBook_CHIRP_1804152042.csv`);
const text = file.toString();
const data: IRepeaters[] = parse(text, { columns: true, auto_parse: true });
const noMatch = [];
const looseMatch = [];
const closeMatch = [];
const exactMatch = [];
const repeaters = [];

for (let x = 0; x < data.length; x++) {
  const xRow = data[x];
  let loose = false;
  let close = false;
  let exact = false;

  for (let y = x + 1; y < data.length; y++) {
    const yRow = data[y];
    if (xRow.Frequency === yRow.Frequency && xRow.Offset === yRow.Offset && xRow.Duplex === yRow.Duplex) {
      loose = true;
      console.log(`Loose Match`);
      if (xRow.Tone === yRow.Tone && xRow.rToneFreq === yRow.rToneFreq && xRow.cToneFreq === yRow.cToneFreq && xRow.DtcsCode === yRow.DtcsCode) {
        close = true;
        console.log(`Close Match`);
        if (xRow.Name === yRow.Name) {
          exact  = true;
          console.log(`Exact Match`);
        }
      }
      console.log(JSON.stringify(xRow));
      console.log(JSON.stringify(yRow));
    }
    if (exact) {
      data.splice(y, 1);
      y -= 1;
      exactMatch.push(yRow);
    } else if (close) {
      // data.splice(y, 1);
      // y -= 1;
      closeMatch.push(yRow);
    } else if (loose) {
      // data.splice(y, 1);
      // y -= 1;
      looseMatch.push(yRow);
    } else {
      noMatch.push(yRow);
    }
  }
  if (exact) {
    // data.splice(x, 1);
    // x--;
    exactMatch.push(xRow);
  } else if (close) {
    // data.splice(x, 1);
    // x--;
    closeMatch.push(xRow);
  } else if (loose) {
    // data.splice(x, 1);
    // x--;
    looseMatch.push(xRow);
  } else {
    noMatch.push(xRow);
  }
}

data.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0);
data.sort((a, b) => a.DtcsCode - b.DtcsCode);
data.sort((a, b) => a.rToneFreq - b.rToneFreq);
data.sort((a, b) => a.Frequency - b.Frequency);

data.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0);
data.sort((a, b) => a.DtcsCode - b.DtcsCode);
data.sort((a, b) => a.rToneFreq - b.rToneFreq);
data.sort((a, b) => a.Frequency - b.Frequency);

data.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0);
data.sort((a, b) => a.DtcsCode - b.DtcsCode);
data.sort((a, b) => a.rToneFreq - b.rToneFreq);
data.sort((a, b) => a.Frequency - b.Frequency);

data.sort((a, b) => a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0);
data.sort((a, b) => a.DtcsCode - b.DtcsCode);
data.sort((a, b) => a.rToneFreq - b.rToneFreq);
data.sort((a, b) => a.Frequency - b.Frequency);

data.forEach((d, i) => {
  d.Location = i;
  if (d.cToneFreq !== 88.5 || (d.rToneFreq === 88.5 && d.Tone === 'Tone')) {
    d.Tone = 'TSQL';
  }
  // d.DtcsRxCode = d.DtcsCode;
});
const options = {
  header: true
};

fs.writeFileSync(`./noMatch.csv`, stringify(noMatch, options));
fs.writeFileSync(`./looseMatch.csv`, stringify(looseMatch, options));
fs.writeFileSync(`./closeMatch.csv`, stringify(closeMatch, options));
fs.writeFileSync(`./exactMatch.csv`, stringify(exactMatch, options));
fs.writeFileSync(`./data.csv`, stringify(data, options));
