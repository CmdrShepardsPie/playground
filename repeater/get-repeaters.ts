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
  await fs.writeFile(`repeaters/${place}.csv`, csv);
}

export default (async () => {
  for (let i = 0; i <= 200; i++) {
    await save('Colorado Springs, CO', i);
    await save('Monument, CO', i);
    await save('Castle Rock, CO', i);
    await save('Castle Pines, CO', i);
    await save('Centennial, CO', i);
    await save('Parker, CO', i);
    await save('Lakewood, CO', i);
    await save('Denver, CO', i);
    await save('Golden, CO', i);
    await save('Idaho Springs, CO', i);
    await save('Evergreen, CO', i);
    await save('Lone Tree, CO', i);
    await save('Empire, CO', i);
    await save('Silverthorne, CO', i);
    await save('Frisco, CO', i);
    await save('Vail, CO', i);
    await save('Avon, CO', i);
    await save('Edwards, CO', i);
    await save('Eagle, CO', i);
    await save('Gypsum, CO', i);
    await save('Glenwood Springs, CO', i);
    await save('New Castle, CO', i);
    await save('Silt, CO', i);
    await save('Rifle, CO', i);
    await save('Grand Junction, CO', i);
    await save('Fruita, CO', i);
    await save('Moab, UT', i);
    await save('Boulder, CO', i);
    await save('Buena Vista, CO', i);
    await save('Woodland Park, CO', i);
    await save('Ouray, CO', i);
  }
})();
