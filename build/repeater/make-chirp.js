"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const fs_helpers_1 = require("@helpers/fs-helpers");
const node_logger_1 = require("@helpers/node-logger");
const log = node_logger_1.createLog("Make Chirp");
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
async function doIt(file) {
    const fileData = await fs_helpers_1.readFileAsync(`repeaters/${file}.json`);
    const repeaters = JSON.parse(fileData.toString());
    const mapped = repeaters
        .map((d, i) => ({ ...makeRow(d), Location: i }));
    return await fs_helpers_1.writeToJsonAndCsv(`repeaters/chirp/${file}`, mapped);
}
function makeRow(item) {
    const DTCS = /D(\d+)/;
    const isDigital = Object.entries(item).filter((a) => /Enabled/.test(a[0])).length > 0;
    const isNarrow = Object.entries(item).filter((a) => /Narrow/i.test(a[1])).length > 0;
    const Name = item.Call.substr(-3) + " " +
        item.Location;
    const Frequency = item.Frequency;
    const Duplex = item.Offset > 0 ? "+" : item.Offset < 0 ? "-" : "";
    const Offset = Math.abs(item.Offset);
    const UplinkTone = item["Uplink Tone"] || item.Tone;
    const DownlinkTone = item["Downlink Tone"];
    let cToneFreq = "";
    let rToneFreq = "";
    let DtcsCode = "";
    let DtcsRxCode = "";
    let Tone = "";
    const Mode = isDigital ? "DIG" : isNarrow ? "NFM" : "FM";
    const Comment = `${item["ST/PR"]} ${item.County} ${item.Location} ${item.Call} ${item.Frequency}`;
    if (typeof UplinkTone === "number") {
        rToneFreq = UplinkTone;
        cToneFreq = UplinkTone;
        Tone = "Tone";
    }
    else {
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
    }
    else if (DownlinkTone !== undefined) {
        const d = DTCS.exec(DownlinkTone);
        if (d && d[1]) {
            const n = parseInt(d[1], 10);
            if (!isNaN(n)) {
                DtcsRxCode = n;
            }
        }
    }
    if (Tone === "TSQL" && rToneFreq !== cToneFreq) {
        if (!rToneFreq) {
        }
        else {
        }
    }
    cToneFreq = cToneFreq || 88.5;
    rToneFreq = rToneFreq || 88.5;
    DtcsCode = DtcsCode || 23;
    DtcsRxCode = DtcsRxCode || 23;
    const row = {
        ...chirp,
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
    return row;
}
async function start() {
    await doIt("groups/CO/Colorado Springs - Call");
    await doIt("data/CO/Colorado Springs");
}
exports.default = start();
