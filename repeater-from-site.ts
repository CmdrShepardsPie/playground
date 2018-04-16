import axios from 'axios';
import * as stringify from 'csv-stringify/lib/sync';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';

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
  DtscRxCode: number;
  DtcsPolarity: string;
  Mode: string;
  TStep: number;
  Comment: string;
  Distance: number;
}
const Frequency = /([-+]?\d+\.?\d*)/;
const CC = /CC(\d+)/;
const DTSC = /D(\d+)/;
const Tone = /(\d+\.?\d*)/;

function getNumber(reg: RegExp, text: string) {
  if (text && text.match) {
    const match = text.match(reg) || [];
    return parseFloat(match[match.length - 1]);
  }
  return 0;
}

function getText(el: any) {
  let text: string = el.innerText || el.innerHTML;
  if (text) {
    text = text.replace(/<[^>]*>/g, '');
    return text.trim();
  }
  return '';
}

function wait(ms: number, fn: any) {
  // console.log('wait', ms);
  return new Promise((resolve, reject) => {
    window.setTimeout(async () => {
      try {
        resolve(fn && await fn());
      } catch (e) {
        reject(e);
      }
    }, ms);
  });
}

const allData: IRepeater[] = [];
const options = {
  header: true
};

async function getit() {
  // console.log('getit');
  const page = await axios.get(`https://www.repeaterbook.com/repeaters/prox_result.php?city=80920&distance=100&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`);
  const dom = new JSDOM(page.data);
  await getListTables(dom);
}

async function getListTables(dom: JSDOM) {
  // console.log('getListTables', dom);
  const tables = dom.window.document.querySelectorAll('table.w3-table.w3-striped.w3-responsive');
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    await getTableRows(table);
  }
}

async function getTableRows(table: Element) {
  // console.log('getTableRows', table);
  const rows = [...table.querySelectorAll('tbody > tr')];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    await getRowCells(row);
  }
}

async function getRowCells(row: Element) {
  if (!row)
    return;
  // console.log('getRowCells', row);
  const cells = row.querySelectorAll('td');
  const first = cells[0];
  const miles = cells[8];
  if (first) {
    let distance = 0;
    if (miles) {
      distance = getNumber(Tone, getText(miles));
    }
    const anchor = first.querySelector('a');
    if (anchor) {
      const href = anchor.href;
      await getNewPage(href, distance);
    }
  }
}

async function getNewPage(href: string, distance: number) {
  // console.log('getNewPage', href);
  const page = await axios.get(`https://www.repeaterbook.com/repeaters/${href}`);
  const dom = new JSDOM(page.data);
  const data: IRepeater = {
    Location: allData.length + 1,
    Name: '',
    Frequency: 0,
    Duplex: '',
    Offset: 0,
    Tone: '',
    rToneFreq: 0,
    cToneFreq: 0,
    DtcsCode: 0,
    DtscRxCode: 0,
    DtcsPolarity: 'NN',
    Mode: 'FM',
    TStep: 5,
    Comment: '',
    Distance: distance
  };
  Object.assign(data, await getInnerTables(dom, data));
  if (data.rToneFreq) {
    data.Tone = 'Tone';
  } else {
    data.rToneFreq = 88.5;
  }
  if (data.cToneFreq) {
    data.Tone = 'TSQL';
  } else {
    data.cToneFreq = 88.5;
  }
  if (data.DtcsCode) {
    data.Tone = 'DTCS';
  } else {
    data.DtcsCode = 23;
  }
  if (data.DtscRxCode) {
    data.Tone = 'DTCS';
  } else {
    data.DtscRxCode = 23;
  }
  console.log();
  let find =
    // false;
    // /*
    allData.find(item =>
      // item.Name === data.Name &&
      item.Frequency === data.Frequency &&
      item.Duplex === data.Duplex &&
      item.Offset === data.Offset &&
      item.Tone === data.Tone &&
      item.rToneFreq === data.rToneFreq &&
      item.cToneFreq === data.cToneFreq &&
      item.DtcsCode === data.DtcsCode &&
      item.DtscRxCode === data.DtscRxCode
    );
  if (find) {
    console.log('Dupe found');
    console.log(JSON.stringify(find));
  }
  if (find && data.Distance < find.Distance) {
    const index = allData.indexOf(find);
    console.log(`Dupe is further away (${data.Distance}/${find.Distance}) (${index}/${allData.length})`);
    allData.splice(index, 1);
    find = undefined;
  }
  // */
  if (!find) {
    allData.push(data);
    allData.sort((a, b) => a.Distance - b.Distance);
    allData.forEach((d, i) => d.Location = i);
    console.log(`Adding (${allData.length})`);
    console.log(JSON.stringify(data));
    // console.log('write');
    fs.writeFileSync(`./allData.csv`, stringify(allData, options));
  }
}

async function getInnerTables(dom: JSDOM, data: IRepeater) {
  // console.log('getInnerTables', dom);
  const tables = dom.window.document.querySelectorAll('table.w3-table.w3-responsive');
  // const data: IRepeater = {} as IRepeater;
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    Object.assign(data, await getInnerRows(table, data));
  }
  return data;
}

async function getInnerRows(table: Element, data: IRepeater) {
  // console.log('getInnerRows', table);
  const rows = table.querySelectorAll('tbody > tr');
  // const data: IRepeater = {} as IRepeater;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    Object.assign(data, await getInnerCells(row, data));
  }
  return data;
}

async function getInnerCells(row: Element, data: IRepeater) {
  // console.log('getInnerCells', row);
  const cells = row.querySelectorAll('td');
  // const data: IRepeater = {} as IRepeater;
  if (cells[0] && cells[1]) {
    const name = getText(cells[0]);
    const value = getText(cells[1]);
    // console.log(name, value);
    switch (name) {
      case 'Downlink:':
        data.Frequency = getNumber(Frequency, value);
        break;
      case 'Offset:':
        const num = getNumber(Frequency, value);
        if (num > 0) {
          data.Duplex = '+';
          data.Offset = num;
        } else if (num < 0) {
          data.Duplex = '-';
          data.Offset = Math.abs(num);
        }
        break;
      case 'Uplink Tone:': {
        const t = getNumber(Tone, value);
        const d = getNumber(DTSC, value);
        const c = getNumber(CC, value);
        if (!d && !c) {
          data.rToneFreq = t;
        } else if (d && !c) {
          data.DtcsCode = d;
        }
        break;
      }
      case 'Downlink Tone:': {
        const t = getNumber(Tone, value);
        const d = getNumber(DTSC, value);
        const c = getNumber(CC, value);
        if (!d && !c) {
          data.cToneFreq = t;
        } else if (d && !c) {
          data.DtscRxCode = d;
        }
        break;
      }
      case 'Call:': {
        const cell = cells[1];
        const anchor = cell.querySelector('a');
        if (anchor) {
          data.Name = getText(anchor);
        } else {
          data.Name = getText(cell);
        }
        break;
      }
      case 'County:':
      case 'Use:':
      case 'Op Status:':
      // case 'Coverage':
      case 'Sponsor:':
      case 'Coordination:': {
        const cell = cells[1];
        let anchor = cell.lastElementChild;
        if (anchor && anchor.childElementCount) {
          anchor = anchor.lastElementChild;
        }
        if (anchor && anchor.childElementCount) {
          anchor = anchor.lastElementChild;
        }
        if (anchor && anchor.childElementCount) {
          anchor = anchor.lastElementChild;
        }
        if (!data.Comment) {
          data.Comment = '';
        } else {
          data.Comment = data.Comment + ' | ';
        }
        if (anchor && getText(anchor)) {
          data.Comment = data.Comment + getText(anchor);
        } else if (getText(cell)) {
          data.Comment = data.Comment + getText(cell);
        }
        break;
      }
    }
  }
  if (cells[0] && /Last update:/.test(getText(cells[0]))) {
    const cell = cells[0];
    let anchor = cell.lastElementChild;
    if (anchor && anchor.childElementCount) {
      anchor = anchor.lastElementChild;
    }
    if (anchor && anchor.childElementCount) {
      anchor = anchor.lastElementChild;
    }
    if (anchor && anchor.childElementCount) {
      anchor = anchor.lastElementChild;
    }
    if (!data.Comment) {
      data.Comment = '';
    } else {
      data.Comment = data.Comment + ' | ';
    }
    if (anchor && getText(anchor)) {
      let text = getText(anchor);
      text = text.replace(/Last update:/, '');
      data.Comment = data.Comment + text.trim();
    } else if (getText(cell)) {
      let text = getText(cell);
      text = text.replace(/Last update:/, '');
      data.Comment = data.Comment + text.trim();
    }
  }
  return data;

}

export default getit();
