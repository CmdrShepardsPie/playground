// const fs = require('fs');
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var base = {
    Location: 0,
    Name: null,
    Frequency: null,
    Duplex: null,
    Offset: 0,
    Tone: null,
    rToneFreq: 88.5,
    cToneFreq: 88.5,
    DtcsCode: 23,
    DtscRxCode: 23,
    DtcsPolarity: "NN",
    Mode: "FM",
    TStep: 5,
    Comment: "Colorado Council of Amateur Radio Clubs (CCARC)",
};
function leadingZeroes(number, count) {
    var num = number.toString();
    while (num.length <= count) {
        num = "0" + num;
    }
    return num;
}
var allData = [];
var names = ["2m", "1.25m", "70cm"];
names.forEach(function (name) {
    console.log("Starting", name);
    var data = JSON.parse(fs.readFileSync("./" + name + ".json"));
    data.sort(function (a, b) { return a.Frequency - b.Frequency; });
    data.forEach(function (p, i) {
        var d = __assign({}, base, p);
        d.Location = allData.length;
        d.Name = (name.substring(0, 4) + "-" + (p.Name || leadingZeroes(i + 1, 1)));
        console.log(i, d);
        allData.push(d);
    });
    console.log("Finished", name);
});
fs.writeFileSync("./radio-out.json", JSON.stringify(allData));
