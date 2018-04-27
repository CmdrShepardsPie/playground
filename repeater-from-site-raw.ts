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
  [index: string]: any;
}
const Frequency = /([-+]?\d+\.?\d*)/;
const CC = /CC(\d+)/;
const DTSC = /D(\d+)/;
const Tone = /(\d+\.?\d*)/;

const cache: any = {};

const options = {
  header: true
};

function getNumber(reg: RegExp, text: string) {
  if (text && text.match) {
    const match = text.match(reg) || [];
    return parseFloat(match[match.length - 1]);
  }
  return 0;
}

function getText(el: Element) {
  if (el) {
    let text: string = el.innerHTML;
    if (text) {
      text = text.replace(/<script>.*<\/script>/, ' ');
      text = text.replace(/<[^>]*>/g, ' ');
      return text.trim();
    }
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

async function getraw(cityOrZip: string | number, distance: number) {
  const proximityUrl = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(cityOrZip.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
  const page = await axios.get(proximityUrl);
  const dom = new JSDOM(page.data);
  const allData: any[] = [];
  await getListTables(dom, cityOrZip, allData);
}

async function getListTables(dom: JSDOM, cityOrZip: string | number, allData: any[]) {
  // console.log('getListTables', dom);
  const tables = dom.window.document.querySelectorAll('table.w3-table.w3-striped.w3-responsive');
  for (const table of tables) {
    await getTableRows(table, cityOrZip, allData);
  }
}

async function getTableRows(table: Element, cityOrZip: string | number, allData: any[]) {
  // console.log('getTableRows', table);
  const rows = [...table.querySelectorAll('tbody > tr')];
  for (const row of rows) {
    await getRowCells(row, cityOrZip, allData);
  }
}

async function getRowCells(row: Element, cityOrZip: string | number, allData: any[]) {
  if (!row) {
    return;
  }
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
      await getNewPage(href, distance, cityOrZip, allData);
    }
  }
}

async function getNewPage(href: string, distance: number, cityOrZip: string | number, allData: any[]) {
  console.log();
  // console.log('getNewPage', href);
  const cached = cache[href];
  let dom;
  if (cached) {
    console.log('Got cache', href);
    dom = cached;
  } else {
    const page = await axios.get(`https://www.repeaterbook.com/repeaters/${href}`);
    dom = new JSDOM(page.data);
    cache[href] = dom;
    console.log('Stored cache', href);
  }
  const data: any = {};
  Object.assign(data, await getInnerTables(dom, data));

  allData.push(data);

  const columns: { [index: string]: string } = {};
  allData.forEach((d, i) => {
    Object.entries(d).forEach(entry => {
      const key = entry[0];
      columns[key] = '';
    });
  });
  allData.forEach((d, i) => {
    allData[i] = { ...columns, ...d };
  });
  console.log(`Adding (${allData.length})`, cityOrZip);
  console.log(JSON.stringify(data));
  fs.writeFileSync(`./repeater-data/raw-${cityOrZip}.csv`, stringify(allData, options));

}

async function getInnerTables(dom: JSDOM, data: IRepeater) {
  // console.log('getInnerTables', dom);
  const tables = dom.window.document.querySelectorAll('table.w3-table.w3-responsive');
  // const data: IRepeater = {} as IRepeater;
  Object.assign(data, await getInnerRows(tables[0], data));
  // for (const table of tables) {
  //   Object.assign(data, await getInnerRows(table, data));
  // }
  return data;
}

async function getInnerRows(table: Element, data: IRepeater) {
  // console.log('getInnerRows', table);
  const rows = table.querySelectorAll('tbody > tr');
  // const data: IRepeater = {} as IRepeater;
  for (const row of rows) {
    Object.assign(data, await getInnerCells(row, data));
  }
  return data;
}

async function getInnerCells(row: Element, data: IRepeater) {
  // console.log('getInnerCells', row);
  const cells = row.querySelectorAll('td');
  // const data: IRepeater = {} as IRepeater;
  const name = getText(cells[0]);
  const value = getText(cells[1]);
  const split = name.split(':');
  split[0] = split[0] && split[0].trim();
  split[1] = split[1] && split[1].trim();
  data[split[0] || name.replace(':', '')] = split[1] || value;
  return data;
}

const totalRepeaters: IRepeater[] = [];

async function start() {
  // await getraw('Colorado Springs, CO', 50);
  // await getraw('Monument, CO', 50);
  // await getraw('Larkspur, CO', 50);
  // await getraw('Castle Rock, CO', 50);
  // await getraw('Centennial, CO', 50);
  // await getraw('Denver, CO', 50);

  await getraw('Colorado Springs, CO', 100);
  await getraw('Denver, CO', 100);

}

export default start();
