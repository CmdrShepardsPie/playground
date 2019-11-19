var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "csv", "fs", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _csv = __importStar(require("csv"));
    const _fs = __importStar(require("fs"));
    const util_1 = require("util");
    const fs = {
        exists: util_1.promisify(_fs.exists),
        writeFile: util_1.promisify(_fs.writeFile),
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir),
        mkdir: util_1.promisify(_fs.mkdir),
    };
    const parseAsync = util_1.promisify(_csv.parse);
    const stringifyAsync = util_1.promisify(_csv.stringify);
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
    exports.default = fs.readdir("./")
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZS1jaGlycC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yYWRpby9tYWtlLWNoaXJwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLDBDQUE0QjtJQUM1Qix3Q0FBMEI7SUFDMUIsK0JBQStCO0lBRS9CLE1BQU0sRUFBRSxHQUFHO1FBQ1QsTUFBTSxFQUFFLGdCQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUM3QixTQUFTLEVBQUUsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ25DLFFBQVEsRUFBRSxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxFQUFFLGdCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUMvQixLQUFLLEVBQUUsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0tBQzVCLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxNQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQTBCakQsTUFBTSxTQUFTLEdBQVc7UUFDeEIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNaLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLENBQUM7UUFDWixNQUFNLEVBQUUsRUFBRTtRQUNWLE1BQU0sRUFBRSxDQUFDO1FBQ1QsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxJQUFJO1FBQ2YsUUFBUSxFQUFFLEVBQUU7UUFDWixVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRSxJQUFJO1FBQ2xCLElBQUksRUFBRSxJQUFJO1FBQ1YsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7SUFFRixrQkFBZSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztTQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUcsTUFBTSxJQUFJLEdBQWUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN0RCxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFFLEVBQWdCLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUNmLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDZixNQUFNLFNBQVMsR0FBYSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0RCxJQUFJLFNBQVMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUM1QixRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUNyQixTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7WUFDRCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELCtCQUErQjtZQUMvQixnQ0FBZ0M7WUFDaEMsSUFBSTtZQUNKLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFXO2dCQUNwQixHQUFHLFNBQVM7Z0JBQ1osUUFBUSxFQUFFLENBQUM7Z0JBQ1gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUM1QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7YUFDNUUsQ0FBQztZQUNGLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRztZQUNkLE1BQU0sRUFBRSxJQUFJO1NBRWIsQ0FBQztRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBYyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX2NzdiBmcm9tIFwiY3N2XCI7XG5pbXBvcnQgKiBhcyBfZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQge3Byb21pc2lmeX0gZnJvbSBcInV0aWxcIjtcblxuY29uc3QgZnMgPSB7XG4gIGV4aXN0czogcHJvbWlzaWZ5KF9mcy5leGlzdHMpLFxuICB3cml0ZUZpbGU6IHByb21pc2lmeShfZnMud3JpdGVGaWxlKSxcbiAgcmVhZEZpbGU6IHByb21pc2lmeShfZnMucmVhZEZpbGUpLFxuICByZWFkZGlyOiBwcm9taXNpZnkoX2ZzLnJlYWRkaXIpLFxuICBta2RpcjogcHJvbWlzaWZ5KF9mcy5ta2RpciksXG59O1xuXG5jb25zdCBwYXJzZUFzeW5jID0gcHJvbWlzaWZ5KF9jc3YucGFyc2UpO1xuY29uc3Qgc3RyaW5naWZ5QXN5bmMgPSBwcm9taXNpZnkoX2Nzdi5zdHJpbmdpZnkpO1xuXG5pbnRlcmZhY2UgSUNoaXJwIHtcbiAgTG9jYXRpb246IG51bWJlcjtcbiAgTmFtZTogc3RyaW5nO1xuICBGcmVxdWVuY3k6IG51bWJlcjtcbiAgRHVwbGV4OiBzdHJpbmc7XG4gIE9mZnNldDogbnVtYmVyO1xuICBUb25lOiBzdHJpbmc7XG4gIHJUb25lRnJlcTogbnVtYmVyO1xuICBjVG9uZUZyZXE6IG51bWJlcjtcbiAgRHRjc0NvZGU6IG51bWJlcjtcbiAgRHRjc1J4Q29kZTogbnVtYmVyO1xuICBEdGNzUG9sYXJpdHk6IHN0cmluZztcbiAgTW9kZTogc3RyaW5nO1xuICBUU3RlcDogbnVtYmVyO1xuICBDb21tZW50OiBzdHJpbmc7XG5cbiAgW2luZGV4OiBzdHJpbmddOiBhbnk7XG59XG5cbmludGVyZmFjZSBJU3RhdGlvbiB7XG4gIEZyZXF1ZW5jeTogbnVtYmVyO1xuICBOYW1lPzogc3RyaW5nO1xufVxuXG5jb25zdCBiYXNlQ2hpcnA6IElDaGlycCA9IHtcbiAgTG9jYXRpb246IC0xLFxuICBOYW1lOiBcIlwiLFxuICBGcmVxdWVuY3k6IDAsXG4gIER1cGxleDogXCJcIixcbiAgT2Zmc2V0OiAwLFxuICBUb25lOiBcIlwiLFxuICByVG9uZUZyZXE6IDg4LjUsXG4gIGNUb25lRnJlcTogODguNSxcbiAgRHRjc0NvZGU6IDIzLFxuICBEdGNzUnhDb2RlOiAyMyxcbiAgRHRjc1BvbGFyaXR5OiBcIk5OXCIsXG4gIE1vZGU6IFwiRk1cIixcbiAgVFN0ZXA6IDUsXG4gIENvbW1lbnQ6IFwiXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmcy5yZWFkZGlyKFwiLi9cIilcbiAgLnRoZW4oYXN5bmMgKGZpbGVzKSA9PiB7XG4gICAgY29uc3QgY29udGVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChmaWxlcy5maWx0ZXIoKGIpID0+IC9cXC5qc29uLy50ZXN0KGIpKS5tYXAoKGYpID0+IGZzLnJlYWRGaWxlKGAuLyR7Zn1gKSkpO1xuICAgIGNvbnN0IGRhdGE6IElTdGF0aW9uW10gPSBjb250ZW50cy5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHtcbiAgICAgIHJldHVybiBbLi4ucHJldiwgLi4uSlNPTi5wYXJzZShuZXh0LnRvU3RyaW5nKCkpXTtcbiAgICB9LCBbXSBhcyBJU3RhdGlvbltdKTtcbiAgICBkYXRhLnNvcnQoKGEsIGIpID0+IGEuRnJlcXVlbmN5IC0gYi5GcmVxdWVuY3kpO1xuICAgIGxldCBsYXN0SW5kZXggPSAwLFxuICAgICAgbGFzdEZyZXEgPSAwO1xuICAgIGNvbnN0IGNoaXJwTGlzdDogSUNoaXJwW10gPSBkYXRhLm1hcCgoc3RhdGlvbiwgaSkgPT4ge1xuICAgICAgY29uc3QgZnJlcVJvdW5kID0gTWF0aC5mbG9vcihzdGF0aW9uLkZyZXF1ZW5jeSAtIDEwMCk7XG4gICAgICBpZiAoZnJlcVJvdW5kIC0gbGFzdEZyZXEgPiAxKSB7XG4gICAgICAgIGxhc3RGcmVxID0gZnJlcVJvdW5kO1xuICAgICAgICBsYXN0SW5kZXggPSBpO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2hvcnRJbmRleCA9ICgoaSAtIGxhc3RJbmRleCkgKyAxKS50b1N0cmluZygpO1xuICAgICAgLy8gaWYgKHNob3J0SW5kZXgubGVuZ3RoID4gMSkge1xuICAgICAgLy8gICBzaG9ydEluZGV4ID0gc2hvcnRJbmRleFsxXTtcbiAgICAgIC8vIH1cbiAgICAgIGNvbnN0IG5hbWUgPSBzdGF0aW9uLkZyZXF1ZW5jeS50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpO1xuICAgICAgY29uc3QgTmFtZSA9IGAke25hbWV9YDtcbiAgICAgIGNvbnN0IGNoaXJwOiBJQ2hpcnAgPSB7XG4gICAgICAgIC4uLmJhc2VDaGlycCxcbiAgICAgICAgTG9jYXRpb246IGksXG4gICAgICAgIEZyZXF1ZW5jeTogc3RhdGlvbi5GcmVxdWVuY3ksXG4gICAgICAgIE5hbWU6IGAke3N0YXRpb24uTmFtZSA/IHN0YXRpb24uTmFtZS5zdWJzdHJpbmcoMCwgMSkgOiBzaG9ydEluZGV4fSAke05hbWV9YCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gY2hpcnA7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgaGVhZGVyOiB0cnVlLFxuXG4gICAgfTtcblxuICAgIGNvbnN0IGNoaXJwQ3N2ID0gYXdhaXQgc3RyaW5naWZ5QXN5bmMoY2hpcnBMaXN0LCBvcHRpb25zKTtcblxuICAgIHJldHVybiBmcy53cml0ZUZpbGUoYC4vc2ltcGxleC5jc3ZgLCBjaGlycENzdik7XG4gIH0pO1xuIl19