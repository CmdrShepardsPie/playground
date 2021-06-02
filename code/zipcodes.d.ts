import 'module-alias/register';
declare const _default: Promise<void>;
export default _default;
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
    Postcode: string;
    'In Use?': InUse;
    Latitude: number;
    Longitude: number;
    Easting: number;
    Northing: number;
    'Grid Ref': string;
    County: string;
    District: string;
    Ward: string;
    'District Code': string;
    'Ward Code': string;
    Country: Country;
    'County Code': string;
    Constituency: string;
    Introduced: Date;
    Terminated: string;
    Parish: string;
    'National Park': NationalPark;
    Population: number | string;
    Households: number | string;
    'Built up area': string;
    'Built up sub-division': string;
    'Lower layer super output area': string;
    'Rural/urban': string;
    Region: string;
    Altitude: number;
    'London zone': number | string;
    'LSOA Code': string;
    'Local authority': string;
    'MSOA Code': string;
    'Middle layer super output area': string;
    'Parish Code': string;
    'Census output area': string;
    'Constituency Code': string;
    'Index of Multiple Deprivation': number;
    Quality: number;
    'User Type': number;
    'Last updated': Date;
    'Nearest station': string;
    'Distance to station': number | string;
    'Postcode area': string;
    'Postcode district': string;
    'Police force': string;
    'Water company': string;
    'Plus Code': string;
    'Average Income': number | string;
    'Sewage Company': SewageCompany;
    'Travel To Work Area': string;
}
export declare enum Country {
    England = "England",
    NorthernIreland = "Northern Ireland",
    Scotland = "Scotland",
    Wales = "Wales"
}
export declare enum InUse {
    Yes = "Yes"
}
export declare enum NationalPark {
    BreconBeaconsNationalPark = "Brecon Beacons National Park",
    Empty = ""
}
export declare enum SewageCompany {
    Empty = "",
    NorthumbrianWater = "Northumbrian Water",
    SouthernWater = "Southern Water",
    ThamesWater = "Thames Water"
}
//# sourceMappingURL=zipcodes.d.ts.map