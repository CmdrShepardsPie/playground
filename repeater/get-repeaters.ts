import * as _csv from 'csv';
import * as _fs from 'fs';
import Scraper from './scraper';
import { promisify } from 'util';
import { IObject } from './helper';
const fs = {
  exists: promisify(_fs.exists),
  writeFile: promisify(_fs.writeFile),
  readFile: promisify(_fs.readFile)
};
const stringifyAsync = promisify(_csv.stringify);

export async function save(place: string | number, distance: number) {
  const scraper = new Scraper(place, distance);

  const result = await scraper.process();

  result.sort((a: any, b: any) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
  result.sort((a: any, b: any) => (a.Frequency - b.Frequency));
  result.sort((a: any, b: any) => (a.Mi - b.Mi));

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
  // return Promise.all([
  //   fs.writeFile(`repeaters/csv/${place}.csv`, csv),
  //   fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result))
  // ]);
}

export default (async () => {
  for (let i = 200; i <= 200; i++) {
    await save('Denver, CO', i);
    await save('Littleton, CO', i);
    await save('Bailey, CO', i);
    await save('Grant, CO', i);
    await save('Jefferson, CO', i);
    await save('Como, CO', i);
    await save('Fairplay, CO', i);
    await save('Antero Junction, CO', i);
    await save('Buena Vista, CO', i);
    await save('Nathrop, CO', i);
    await save('Salida, CO', i);
    await save('Monarch, CO', i);
    await save('Sargents, CO', i);
    await save('Parlin, CO', i);
    await save('Gunnison, CO', i);
    await save('Cimarron, CO', i);
    await save('Montrose, CO', i);
    await save('Loghill Village, CO', i);
    await save('Ridgway, CO', i);
    await save('Norwood, CO', i);
    await save('Redvale, CO', i);
    await save('Naturita, CO', i);
    await save('Bedrock, CO', i);
    await save('Paradox, CO', i);
    await save('La Sal, UT', i);
    await save('Spanish Valley, UT', i);
    await save('Moab, UT', i);

    await save('Lakewood, CO', i);
    await save('Keystone, CO', i);
    await save('Breckenridge, CO', i);
    await save('Vail, CO', i);
    await save('Avon, CO', i);
    await save('Glenwood Springs, CO', i);
    await save('Rifle, CO', i);
    await save('Palisade, CO', i);
    await save('Grand Junction, CO', i);
    await save('Fruita, CO', i);
    await save('Thompson, UT', i);
    await save('Crescent Junction, UT', i);

  }
})();
