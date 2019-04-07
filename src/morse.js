console.log();
var morse = require("./morse.json");
function getValue(code) {
    var parts = code.split("");
    var value = (parts.length - 1) * 1;
    parts.forEach(function (p) {
        if (p === ".") {
            value += 1;
        }
        else if (p === "-") {
            value += 3;
        }
        else {
            console.log("Wrong Symbol");
        }
    });
    return value;
}
var m = morse.map(function (o) { return ({ Letter: o.Letter, Code: o.Code, Value: getValue(o.Code) }); });
m.sort(function (a, b) { return a.Value - b.Value; });
m.forEach(function (t, i) {
    if (i > 0 && m[i - 1].Value !== t.Value) {
        console.log();
    }
    console.log(t.Letter, t.Value, t.Code);
});
console.log();
