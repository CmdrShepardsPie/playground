import * as _csv from "csv";
import * as _fs from "fs";
import { promisify } from "util";
const fs = {
    exists: promisify(_fs.exists),
    writeFile: promisify(_fs.writeFile),
    readFile: promisify(_fs.readFile),
    readdir: promisify(_fs.readdir),
    mkdir: promisify(_fs.mkdir),
};
const parseAsync = promisify(_csv.parse);
const stringifyAsync = promisify(_csv.stringify);
const baseChirp = {
    Location: -1,
    Name: "",
    Frequency: 0,
    Duplex: "",
    Offset: 0,
    Tone: "",
    rToneFreq: 88.5,
    cToneFreq: 88.5,
    DtcsCode: 23,
    DtcsRxCode: 23,
    DtcsPolarity: "NN",
    Mode: "FM",
    TStep: 5,
    Comment: "",
};
export default fs.readdir("./")
    .then(async (files) => {
    const contents = await Promise.all(files.filter((b) => /\.json/.test(b)).map((f) => fs.readFile(`./${f}`)));
    const data = contents.reduce((prev, next) => {
        return [...prev, ...JSON.parse(next.toString())];
    }, []);
    data.sort((a, b) => a.Frequency - b.Frequency);
    let lastIndex = 0, lastFreq = 0;
    const chirpList = data.map((station, i) => {
        const freqRound = Math.floor(station.Frequency - 100);
        if (freqRound - lastFreq > 1) {
            lastFreq = freqRound;
            lastIndex = i;
        }
        const shortIndex = ((i - lastIndex) + 1).toString();
        // if (shortIndex.length > 1) {
        //   shortIndex = shortIndex[1];
        // }
        const name = station.Frequency.toString().replace(".", "");
        const Name = `${name}`;
        const chirp = {
            ...baseChirp,
            Location: i,
            Frequency: station.Frequency,
            Name: `${station.Name ? station.Name.substring(0, 1) : shortIndex} ${Name}`,
        };
        return chirp;
    });
    const options = {
        header: true,
    };
    const chirpCsv = await stringifyAsync(chirpList, options);
    return fs.writeFile(`./simplex.csv`, chirpCsv);
});
//# sourceMappingURL=make-chirp.js.map