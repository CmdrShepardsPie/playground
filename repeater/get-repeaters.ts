import * as _csv from 'csv';
import * as _fs from 'fs';
import Scraper from './scraper';
import { promisify } from 'util';
import { IObject } from './helper';

const fs = {
  exists: promisify(_fs.exists),
  writeFile: promisify(_fs.writeFile),
  readFile: promisify(_fs.readFile),
  readdir: promisify(_fs.readdir)
};
const stringifyAsync = promisify(_csv.stringify);

export async function save(place: string | number, distance: number) {
  console.log();

  console.log(place, distance);

  const scraper = new Scraper(place, distance);

  const result = await scraper.process();

  result.sort((a: any, b: any) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
  result.sort((a: any, b: any) => (a.Frequency - b.Frequency));
  result.sort((a: any, b: any) => (a.Mi - b.Mi));

  console.log(place, distance, result.length);

  await fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result));

  const options = {
    header: true
  };

  const headers: IObject<boolean> = {};

  result.forEach(item => {
    Object.entries(item).forEach(entry => {
      headers[entry[0]] = true;
    });
  });
  result.forEach(item => {
    Object.entries(headers).forEach(entry => {
      if (!item[entry[0]]) {
        item[entry[0]] = typeof item[entry[0]];
      }
    });
  });

  const csv = await stringifyAsync(result, options);
  await fs.writeFile(`repeaters/csv/${place}.csv`, csv);
}

export default (async () => {
  // Update existing files
  // const allFiles = await fs.readdir('./repeaters/json');
  // allFiles.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
  // while (allFiles.length) {
  //   const file = allFiles.shift();
  //   if (file) {
  //     const name = file.replace('./repeaters/json', '').replace('.json', '');
  //     await save(name, 200);
  //   }
  // }
  const cities = [
    // 'Denver, CO',
    // 'Lakewood, CO',
    // 'Keystone, CO',
    // 'Breckenridge, CO',
    // 'Vail, CO',
    // 'Avon, CO',
    // 'Glenwood Springs, CO',
    // 'Rifle, CO',
    // 'Palisade, CO',
    // 'Grand Junction, CO',
    // 'Fruita, CO',
    // 'Thompson, UT',
    // 'Crescent Junction, UT',
    // 'Moab, UT',
    //
    // 'Denver, CO',
    // 'Buena Vista, CO',
    // 'Salida, CO',
    // 'Monarch, CO',
    // 'Gunnison, CO',
    // 'Montrose, CO',
    // 'Ouray, CO',
    // 'Naturita, CO',
    // 'La Sal, UT',
    // 'Moab, UT',
    //
    // 'Denver, CO',
    // 'Buena Vista, CO',
    // 'Salida, CO',
    // 'Saguache, CO',
    // 'Center, CO',
    // 'Del Norte, CO',
    // 'Pagosa Springs, CO',
    // 'Bayfield, CO',
    // 'Durango, CO',
    // 'Mancos, CO',
    // 'Dolores, CO',
    // 'Dove Creek, CO',
    // 'Monticello, UT',
    // 'Moab, UT',

    'Hotchkiss, CO'
  ];
  while (cities.length) {
    const name = cities.shift();
    if (name) {
      await save(name, 200);
    }
  }
})();
