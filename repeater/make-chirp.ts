import "module-alias/register";

import {readFileAsync, writeToJsonAndCsv} from "@helpers/fs-helpers";
import {createLog} from "@helpers/node-logger";
import chalk from "chalk";
import {IRepeater} from "./modules/i.repeater";

const log = createLog("Make Chirp");

interface IChirp {
  Location: number;
  Name: string;
  Frequency: number;
  Duplex: string;
  Offset: number;
  Tone: string;
  rToneFreq: number;
  cToneFreq: number;
  DtcsCode: number;
  DtcsRxCode: number;
  DtcsPolarity: string;
  Mode: string;
  TStep: number;
  Comment: string;
  [index: string]: any;
}

const chirp = {
  Location: "",
  Name: "",
  Frequency: "",
  Duplex: "",
  Offset: "",
  Tone: "",
  rToneFreq: "",
  cToneFreq: "",
  DtcsCode: "",
  DtcsRxCode: "",
  DtcsPolarity: "NN",
  Mode: "FM",
  TStep: 5,
  Comment: "",
};

async function doIt(file: string) {
  const fileData = await readFileAsync(`repeaters/${file}.json`);
  const repeaters = JSON.parse(fileData.toString()) as IRepeater[];

  const mapped = repeaters
    .filter((r) => r.Call && r.Use === "OPEN" && r["Op Status"] === "On-Air") // &&
    //   r.Frequency > 100 && r.Frequency < 500 &&
    //   !r["D-STAR Enabled"] && !r["DMR Enabled"] && !r["P25 Digital Enabled"] && !r["YSF Digital Enabled"] &&
    //   !/D\d/.test(r.Tone.toString()))
    .map((d, i) => ({ ...makeRow(d), Location: i }));

  return await writeToJsonAndCsv(`repeaters/chirp/${file}`, mapped);
}

function makeRow(item: IRepeater) {
  const DTCS = /D(\d+)/;

  const isDigital = Object.entries(item).filter((a) => /Enabled/.test(a[0])).length > 0;
  const isNarrow = Object.entries(item).filter((a) => /Narrow/i.test(a[1] as string)).length > 0;

  const Name = item.Call.substr(-3) + "" +
    item.Location;
      // .split(/[ ,]/)
      // .filter((g) => g)
      // .map((g) => g[0].toUpperCase() + g.substr(1).toLowerCase())
      // .join(" ");

  const Frequency = item.Frequency;
  const Duplex = item.Offset > 0 ? "+" : item.Offset < 0 ? "-" : "";
  const Offset = Math.abs(item.Offset);
  const UplinkTone = item["Uplink Tone"] || item.Tone;
  const DownlinkTone = item["Downlink Tone"];
  let cToneFreq: any = "";
  let rToneFreq: any = "";
  let DtcsCode: any = "";
  let DtcsRxCode: any = "";
  let Tone = "";
  const Mode = isDigital ? "DIG" : isNarrow ? "NFM" : "FM";
  const Comment = `${item["ST/PR"]} ${item.County} ${item.Location} ${item.Call} ${item.Frequency}`;

  if (typeof UplinkTone === "number") {
    rToneFreq = UplinkTone;
    cToneFreq = UplinkTone;
    Tone = "Tone";
  } else {
    const d = DTCS.exec(UplinkTone);
    if (d && d[1]) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsCode = n;
        DtcsRxCode = n;
        Tone = "DTCS";
      }
    }
  }

  if (typeof DownlinkTone === "number") {
    cToneFreq = DownlinkTone;
    // TODO: Uncomment, temporarily disable tones to test over-filtering
    // Tone = "TSQL";
  } else if (DownlinkTone !== undefined) {
    const d = DTCS.exec(DownlinkTone);
    if (d && d[1]) {
      const n = parseInt(d[1], 10);
      if (!isNaN(n)) {
        DtcsRxCode = n;
        // TODO: Uncomment, temporarily disable tones to test over-filtering
        // Tone = "DTCS";
      }
    }
  }

  if (Tone === "TSQL" && rToneFreq !== cToneFreq) {
    if (!rToneFreq) {
      // console.log('No rToneFreq', Name, Frequency, rToneFreq, cToneFreq, Comment);
      // Tone = '';
    } else {
      // console.log('Cross', Name, Frequency, rToneFreq, cToneFreq, Comment);
      // TODO: Uncomment, temporarily disable tones to test over-filtering
      // Tone = "Cross";
    }
  }

  cToneFreq = cToneFreq || 88.5;
  rToneFreq = rToneFreq || 88.5;
  DtcsCode = DtcsCode || 23;
  DtcsRxCode = DtcsRxCode || 23;

  const row: IChirp = {
    ...chirp as any,
    // Location,
    Name,
    Frequency,
    Duplex,
    Offset,
    rToneFreq,
    cToneFreq,
    DtcsCode,
    DtcsRxCode,
    Tone,
    Mode,
    Comment,
  };
  // log(chalk.green("Made Row"), row);
  return row;
}

async function start() {
  await doIt("groups/CO/Colorado Springs - Call");
  await doIt("data/CO/Colorado Springs");
}

export default start();
