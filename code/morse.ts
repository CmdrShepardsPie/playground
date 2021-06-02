console.log();

const morse = require("./morse.json");

function getValue(code) {
  const parts = code.split("");
  let value = (parts.length - 1) * 1;
  parts.forEach((p) => {
    if (p === ".") {
      value += 1;
    } else if (p === "-") {
      value += 3;
    } else {
      console.log("Wrong Symbol");
    }
  });
  return value;
}

const m = morse.map((o) => ({Letter: o.Letter, Code: o.Code, Value: getValue(o.Code)}));

m.sort((a, b) => a.Value - b.Value);

m.forEach((t, i) => {
  if (i > 0 && m[i - 1].Value !== t.Value) {
    console.log();
  }
  console.log(t.Letter, t.Value, t.Code);
});

console.log();
