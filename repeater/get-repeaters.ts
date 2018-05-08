import * as _csv from 'csv';
import * as _fs from 'fs';
import Scraper from './scraper';
import { promisify } from 'util';
import { IObject } from './helper';

const fs = {
  exists: promisify(_fs.exists),
  writeFile: promisify(_fs.writeFile),
  readFile: promisify(_fs.readFile),
  readdir: promisify(_fs.readdir),
  mkdir: promisify(_fs.mkdir)
};
const stringifyAsync = promisify(_csv.stringify);

export async function save(place: string | number, distance: number) {
  const options = {
    header: true
  };

  console.log();

  console.log(place, distance);

  const scraper = new Scraper(place, distance);

  const result = await scraper.process();

  result.sort((a: any, b: any) => (a.Call > b.Call ? 1 : a.Call < b.Call ? -1 : 0));
  result.sort((a: any, b: any) => (a.Frequency - b.Frequency));
  result.sort((a: any, b: any) => (a.Mi - b.Mi));

  console.log(place, distance, result.length);

  await fs.writeFile(`repeaters/json/${place}.json`, JSON.stringify(result));

  if (!(await fs.exists(`repeaters/csv/location/`))) {
    await fs.mkdir(`repeaters/csv/location/`);
  }
  if (!(await fs.exists(`repeaters/json/location/`))) {
    await fs.mkdir(`repeaters/json/location/`);
  }
  if (!(await fs.exists(`repeaters/csv/sponsors-and-affiliates/`))) {
    await fs.mkdir(`repeaters/csv/sponsors-and-affiliates/`);
  }
  if (!(await fs.exists(`repeaters/json/sponsors-and-affiliates/`))) {
    await fs.mkdir(`repeaters/json/sponsors-and-affiliates/`);
  }

  for (const item of result) {
    // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/`))) {
    //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/`);
    // }
    // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/`))) {
    //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/`);
    // }
    //
    // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/`))) {
    //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/`);
    // }
    // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/${item.County}/`))) {
    //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/${item.County}/`);
    // }
    //
    // if (!(await fs.exists(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/${item.Location}/`))) {
    //   await fs.mkdir(`repeaters/csv/individual/${item['ST/PR']}/${item.County}/${item.Location}/`);
    // }
    // if (!(await fs.exists(`repeaters/json/individual/${item['ST/PR']}/${item.County}/${item.Location}/`))) {
    //   await fs.mkdir(`repeaters/json/individual/${item['ST/PR']}/${item.County}/${item.Location}/`);
    // }

    const location = (item.Location as string).split(',')[0];
    if (!(await fs.exists(`repeaters/json/location/${item['ST/PR']}, ${location}/`))) {
      await fs.mkdir(`repeaters/json/location/${item['ST/PR']}, ${location}/`);
    }
    await fs.writeFile(`repeaters/json/location/${item['ST/PR']}, ${location}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));

    if (!(await fs.exists(`repeaters/csv/location/${item['ST/PR']}, ${location}/`))) {
      await fs.mkdir(`repeaters/csv/location/${item['ST/PR']}, ${location}/`);
    }
    await fs.writeFile(`repeaters/csv/location/${item['ST/PR']}, ${location}/${item.Call} ${item.Frequency}.csv`, await stringifyAsync([item], options));

    const affiliate = (item.Affiliate as string || '').replace(/\//g, ' ');
    if (affiliate) {
      if (!(await fs.exists(`repeaters/json/sponsors-and-affiliates/${affiliate}/`))) {
        await fs.mkdir(`repeaters/json/sponsors-and-affiliates/${affiliate}/`);
      }
      await fs.writeFile(`repeaters/json/sponsors-and-affiliates/${affiliate}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));

      if (!(await fs.exists(`repeaters/csv/sponsors-and-affiliates/${affiliate}/`))) {
        await fs.mkdir(`repeaters/csv/sponsors-and-affiliates/${affiliate}/`);
      }
      await fs.writeFile(`repeaters/csv/sponsors-and-affiliates/${affiliate}/${item.Call} ${item.Frequency}.csv`, await stringifyAsync([item], options));
    }

    const sponsor = (item.Sponsor as string || '').replace(/\//g, ' ');
    if (sponsor) {
      if (!(await fs.exists(`repeaters/json/sponsors-and-affiliates/${sponsor}/`))) {
        await fs.mkdir(`repeaters/json/sponsors-and-affiliates/${sponsor}/`);
      }
      await fs.writeFile(`repeaters/json/sponsors-and-affiliates/${sponsor}/${item.Call} ${item.Frequency}.json`, JSON.stringify(item));

      if (!(await fs.exists(`repeaters/csv/sponsors-and-affiliates/${sponsor}/`))) {
        await fs.mkdir(`repeaters/csv/sponsors-and-affiliates/${sponsor}/`);
      }
      await fs.writeFile(`repeaters/csv/sponsors-and-affiliates/${sponsor}/${item.Call} ${item.Frequency}.csv`, await stringifyAsync([item], options));
    }

  }

  const headers: IObject<boolean> = {};

  result.forEach(item => {
    Object.entries(item).forEach(entry => {
      headers[entry[0]] = true;
    });
  });
  result.forEach(item => {
    Object.entries(headers).forEach(entry => {
      if (item[entry[0]] === undefined) {
        item[entry[0]] = '';
      }
    });
  });

  await fs.writeFile(`repeaters/csv/${place}.csv`, await stringifyAsync(result, options));
}

export default (async () => {
  // Update existing files
  let allFiles = await fs.readdir('./repeaters/json');
  allFiles = allFiles.filter(b => /\.json/.test(b))
  allFiles.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);
  while (allFiles.length) {
    const file = allFiles.shift();
    if (file) {
      const name = file.replace('./repeaters/json', '').replace('.json', '');
      await save(name, 200);
    }
  }
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

    // 'Hotchkiss, CO'
  ];
  // while (cities.length) {
  //   const name = cities.shift();
  //   if (name) {
  //     await save(name, 200);
  //   }
  // }
})();
