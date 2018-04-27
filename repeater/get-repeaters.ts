import * as _csv from 'csv';
import * as _fs from 'fs';
import Scraper from './scraper';
import { promisify } from 'util';
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

  const options = {
    header: true
  };

  const csv = await stringifyAsync(result, options);
  await fs.writeFile(`repeaters/${place} ${distance}.csv`, csv);
}

export default (async () => {
  for (let i = 0; i <= 100; i++) {
    await save('Denver, CO', i);
    await save('Colorado Springs, CO', i);
    await save('Woodland Park, CO', i);
    await save('Idaho Springs, CO', i);
    await save('Boulder, CO', i);
    await save('Ouray, CO', i);
    await save('Buena Vista, CO', i);
    await save('Moab, UT', i);
  }
})();
