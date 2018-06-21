import { IObject } from "./helper";
export default class Scraper {
    private location;
    private distance;
    private data;
    private url;
    constructor(location: string | number, distance: number);
    process(): Promise<IObject<string | number>[]>;
    private getRepeaterList;
    private getRepeaterDetails;
    private getCache;
    private setCache;
    private getUrl;
}
//# sourceMappingURL=scraper.d.ts.map