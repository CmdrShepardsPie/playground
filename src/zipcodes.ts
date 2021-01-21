import 'module-alias/register';

import fs from 'fs';
import path from 'path';
import {createOut} from '@helpers/log-helpers';
import {parseAsync} from '@helpers/csv-helpers';
import {URL} from 'url';

const {log, write } = createOut('zipcodes');

const sourceZipFolder = './data/sourcezips';
const targetZipFolder = './data/targetzips';

const sqlStart = 'INSERT INTO `zip_codes` (`zip`, `primary_city`, `state`, `county`, `timezone`, `area_codes`, `latitude`, `longitude`, `country`, `estimated_population`)\nVALUES';

const sqlEnd = '';

async function start() {
  const dirFiles = await fs.promises.readdir(path.resolve(`${sourceZipFolder}`));
  log('start', 'dirFiles', dirFiles);

  let sqlBody: string[] = [];
  let fileNumber = 1;

  for (const fileName of dirFiles) {
    const rows = await load(fileName);
    for (const row of rows) {

      sqlBody.push(`\t(${buildSqlRow(row)})`);

      if (sqlBody.length >= 10000) {
        const fileNumberPad = `00${fileNumber}`.substr(-3);
        const body = [sqlStart, sqlBody.join(',\n') + ';', sqlEnd].join('\n');

        log('write', 'rows', sqlBody.length, `${targetZipFolder}/zip_codes_UK_${fileNumberPad}.sql`);

        await fs.promises.writeFile(path.resolve(`${targetZipFolder}/zip_codes_UK_${fileNumberPad}.sql`), body);

        sqlBody = [];
        fileNumber++;
      }
    }

  }

  if (sqlBody.length > 0) {
    const fileNumberPad = `00${fileNumber}`.substr(-3);
    const body = [sqlStart, sqlBody.join(',\n') + ';', sqlEnd].join('\n');

    log('write', 'rows', sqlBody.length, `${targetZipFolder}/zip_codes_UK_${fileNumberPad}.sql`);

    await fs.promises.writeFile(path.resolve(`${targetZipFolder}/zip_codes_UK_${fileNumberPad}.sql`), body);

    sqlBody = [];
    fileNumber++;
  }
}

async function load(fileName: string): Promise<TargetZipcode[]> {
  const fullPath = path.resolve(`${sourceZipFolder}/${fileName}`);
  log('load', 'fullPath', fullPath);
  const raw = await readFile(fullPath);
  const sourceZips = await parseFile(raw);
  return sourceZips.map((d) => convertZipcode(d));
}

async function readFile(fullPath: string | Buffer | URL | fs.promises.FileHandle): Promise<Buffer> {
  log('readFile', 'fullPath', fullPath);
  return await fs.promises.readFile(fullPath);
}

async function parseFile(raw: string | Buffer): Promise<SourceZipcode[]> {
  // write('P');
  return await parseAsync(raw, {columns: true, cast: true});
}

function convertZipcode(source: SourceZipcode): TargetZipcode {
  // write('C');
  return {
    zip: source.Postcode,
    primary_city: source.District.replace(/'/g, `\\'`),
    state: source.County.replace(/'/g, `\\'`),
    county: source.Ward.replace(/'/g, `\\'`),
    timezone: null,
    area_codes: null,
    latitude: source.Latitude.toString(),
    longitude: source.Longitude.toString(),
    country: source.Country,
    estimated_population: typeof source.Population === 'number' ? source.Population : null,
  }
}

function buildSqlRow(row: TargetZipcode) {
  const template = [];
  template.push(row.zip ? `'${row.zip}'` : 'NULL');
  template.push(row.primary_city ? `'${row.primary_city}'` : 'NULL');
  template.push(row.state ? `'${row.state}'` : 'NULL');
  template.push(row.county ? `'${row.county}'` : 'NULL');
  template.push(row.timezone ? `'${row.timezone}'` : 'NULL');
  template.push(row.area_codes ? `'${row.area_codes}'` : 'NULL');
  template.push(row.latitude ? `'${row.latitude}'` : 'NULL');
  template.push(row.longitude ? `'${row.longitude}'` : 'NULL');
  template.push(row.country ? `'${row.country}'` : 'NULL');
  template.push(typeof row.estimated_population === 'number' ? `${row.estimated_population}` : 'NULL');
  return template.join(',');
}
export default start();


export interface TargetZipcode {
  zip: string | null;
  primary_city: string | null;
  state: string | null;
  county: string | null;
  timezone: string | null;
  area_codes: string | null;
  latitude: string | null;
  longitude: string | null;
  country: string | null;
  estimated_population: number | null;
}

export interface SourceZipcode {
  Postcode:                         string;
  'In Use?':                        InUse;
  Latitude:                         number;
  Longitude:                        number;
  Easting:                          number;
  Northing:                         number;
  'Grid Ref':                       string;
  County:                           string;
  District:                         string;
  Ward:                             string;
  'District Code':                  string;
  'Ward Code':                      string;
  Country:                          Country;
  'County Code':                    string;
  Constituency:                     string;
  Introduced:                       Date;
  Terminated:                       string;
  Parish:                           string;
  'National Park':                  NationalPark;
  Population:                       number | string;
  Households:                       number | string;
  'Built up area':                  string;
  'Built up sub-division':          string;
  'Lower layer super output area':  string;
  'Rural/urban':                    string;
  Region:                           string;
  Altitude:                         number;
  'London zone':                    number | string;
  'LSOA Code':                      string;
  'Local authority':                string;
  'MSOA Code':                      string;
  'Middle layer super output area': string;
  'Parish Code':                    string;
  'Census output area':             string;
  'Constituency Code':              string;
  'Index of Multiple Deprivation':  number;
  Quality:                          number;
  'User Type':                      number;
  'Last updated':                   Date;
  'Nearest station':                string;
  'Distance to station':            number | string;
  'Postcode area':                  string;
  'Postcode district':              string;
  'Police force':                   string;
  'Water company':                  string;
  'Plus Code':                      string;
  'Average Income':                 number | string;
  'Sewage Company':                 SewageCompany;
  'Travel To Work Area':            string;
}

export enum Country {
  England = 'England',
  NorthernIreland = 'Northern Ireland',
  Scotland = 'Scotland',
  Wales = 'Wales',
}

export enum InUse {
  Yes = 'Yes',
}

export enum NationalPark {
  BreconBeaconsNationalPark = 'Brecon Beacons National Park',
  Empty = '',
}

export enum SewageCompany {
  Empty = '',
  NorthumbrianWater = 'Northumbrian Water',
  SouthernWater = 'Southern Water',
  ThamesWater = 'Thames Water',
}
