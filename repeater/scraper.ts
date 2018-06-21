import axios from "axios";
import { JSDOM } from "jsdom";
import { dirExists, fs, getText, getTextOrNumber, IObject, makeDirs, wait } from "./helper";

export default class Scraper {
  private data: Array<IObject<string | number>> = [];
  private url: string;

  constructor(private location: string | number, private distance: number) {
    this.url = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(location.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
    console.log();
    console.log("new Scraper", location, distance);
  }

  public async process() {
    console.log("Getting", this.url);
    const parts = this.location.toString().split(`,`);
    const baseKey = `${(parts[1] || ".").trim()}/${parts[0].trim()}.html`;
    const page = await this.getUrl(this.url, baseKey);
    const dom = new JSDOM(page);
    await this.getRepeaterList(dom.window.document);
    return this.data;
  }

  private async getRepeaterList(document: Document) {
    const table = document.querySelector("table.w3-table.w3-striped.w3-responsive");
    if (table) {
      const rows = [...table.querySelectorAll("tbody > tr")];
      const headerRow = rows.shift();
      if (headerRow) {
        const headerCells = [...headerRow.querySelectorAll("th")];
        const headers = headerCells.map((th) => getText(th));
        for (const row of rows) {
          const data: IObject<string | number> = {};
          const cells = [...row.querySelectorAll("td")];
          cells.forEach((td, index) => data[headers[index]] = getTextOrNumber(td));
          const link = cells[0].querySelector("a");
          if (link) {
            Object.assign(data, await this.getRepeaterDetails(link.href));
          }
          this.data.push(data);
        }
      }
    }
  }

  private async getRepeaterDetails(href: string) {
    console.log();
    console.log("Getting", href);
    const urlParams = href.split("?")[1];
    const keyParts = urlParams.match(/state_id=(\d+)&ID=(\d+)/) || [];
    const key = `${keyParts[1]}/${keyParts[2]}.html`;
    const page = await this.getUrl(`https://www.repeaterbook.com/repeaters/${href}`, key);
    const dom = new JSDOM(page);
    const table = dom.window.document.querySelector("table.w3-table.w3-responsive");
    const data: IObject<string | number> = {};
    if (table) {
      const rows = [...table.querySelectorAll("tbody > tr")];
      for (const row of rows) {
        const cells = [...row.querySelectorAll("td")];
        const title = getText(cells[0]);
        const value = getTextOrNumber(cells[1]);
        data[title.split(":")[0]] = value;
      }
    }
    return data;
  }

  private async getCache(key: string) {
    console.log("getCache", key);
    const file = `_cache/${key}`;
    if (await dirExists(file)) {
      return (await fs.readFile(file)).toString();
    }
  }

  private async setCache(key: string, value: any) {
    console.log("setCache", key);
    const file = `_cache/${key}`;
    await makeDirs(file);
    return fs.writeFile(file, value);
  }

  private async getUrl(url: string, cacheKey?: string): Promise<string> {
    console.log("getUrl", url);
    const cache = await this.getCache(cacheKey || url);
    if (cache) {
      console.log("Cached", cacheKey || url);
      return cache;
    } else {
      const waitTime = 1000 + (Math.random() * 1000);
      console.log("Waiting", waitTime, "Getting", url);
      const request: any = (await wait(waitTime, () => axios.get(url)));
      console.log("Downloaded", cacheKey || url);
      // console.log("request", request);
      const data = request.data;
      await this.setCache(cacheKey || url, data);
      return data;
    }
  }
}
