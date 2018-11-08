import {dirExists, makeDirs, readFileAsync, writeFileAsync} from "@helpers/fs-helpers";
import {wait} from "@helpers/helpers";
import {createLog} from "@helpers/node-logger";
import Axios from "axios";
import chalk from "chalk";
import { JSDOM } from "jsdom";
import { getText, getTextOrNumber, IObject } from "./helper";

const log = createLog("Scraper");

export default class Scraper {
  private data: Array<IObject<string | number>> = [];
  private url: string;

  constructor(private location: string | number, private distance: number) {
    log(chalk.green("New Scraper"), location, distance);
    this.url = `https://www.repeaterbook.com/repeaters/prox_result.php?city=${encodeURIComponent(location.toString())}&distance=${distance}&Dunit=m&band1=%25&band2=&freq=&call=&features=&status_id=%25&use=%25&order=%60state_id%60%2C+%60loc%60%2C+%60call%60+ASC`;
  }

  public async process() {
    log(chalk.green("Process"));

    const parts = this.location.toString().split(`,`);
    const baseKey = `${(parts[1] || ".").trim()}/${parts[0].trim()}.html`;
    const page = await this.getUrl(this.url, baseKey);
    const dom = new JSDOM(page);
    await this.getRepeaterList(dom.window.document);
    return this.data;
  }

  private async getRepeaterList(document: Document) {
    log(chalk.green("Get Repeater List"));

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
    log(chalk.green("Get Repeater Details"), href);

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
    log(chalk.green("Get Cache"), key);

    const file = `repeaters/_cache/${key}`;
    if (await dirExists(file)) {
      return (await readFileAsync(file)).toString();
    }
  }

  private async setCache(key: string, value: any) {
    log(chalk.green("Set Cache"), key);

    const file = `repeaters/_cache/${key}`;
    await makeDirs(file);
    return writeFileAsync(file, value);
  }

  private async getUrl(url: string, cacheKey?: string): Promise<string> {
    log(chalk.green("Get URL"), url, cacheKey);

    const cache = await this.getCache(cacheKey || url);
    if (cache) {
      log(chalk.yellow("Cached"), url, cacheKey);
      return cache;
    } else {
      const waitTime = (Math.random() * 5000);

      await wait(waitTime);
      log(chalk.yellow("Get"), url);
      const request = await Axios.get(url);
      log(chalk.green("Got"), url);

      const data = request.data;
      await this.setCache(cacheKey || url, data);
      return data;
    }
  }
}
