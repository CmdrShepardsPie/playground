function getNumber(reg, text) {
  if (text && text.match) {
    const match = text.match(reg);
    return parseFloat(match[match.length - 1], 10);
  }
  return NaN;
}
function getText(reg, text) {
  if (text && text.match) {
    const match = text.match(reg);
    return match[match.length - 1];
  }
}
const allData = [];
const tables = document.querySelectorAll("table.advancedSearchTable");
tables.forEach((table, tableIndex) => {
  const data = {
    Location: allData.length + 31,
    Name: null,
    Frequency: null,
    Duplex: "",
    Offset: 0,
    Tone: null,
    rToneFreq: 88.5,
    cToneFreq: 88.5,
    DtcsCode: 23,
    DtscRxCode: 23,
    DtcsPolarity: "NN",
    Mode: "FM",
    TStep: 5,
    // Skip: null,
    Comment: null,
    // URCALL: null,
    // RPT1CALL: null,
    // RPT2CALL: null,
    // DVCODE: null
  };
  const rows = table.querySelectorAll("tbody > tr");
  rows.forEach((row, rowIndex) => {

    const cells = row.querySelectorAll("td");
    cells.forEach((cell, cellIndex) => {
      const subName = /"([^"]*)"/;
      const Frequency = /([-+]?\d+\.?\d*)/;
      // const CC = /CC(\d+)/;
      const DTSC = /(\d+) DPL/;
      const Tone = /(\d+\.?\d*) Hz/;
      const text = cell.innerText;
      if (rowIndex % 2 === 0) {
      switch (cellIndex) {
        case 0:
          // Name
          if ((subName.test(text))) {
            data.Name = getText(subName, text);
          } else {
            data.Name = text;
          }
          break;
        case 1:
          // Frequency
          data.Frequency = getNumber(Frequency, text);
          break;
        case 2:
          // Tone
          if (DTSC.test(text)) {
            const number = getNumber(DTSC, text);
            data.DtcsCode = number;
            data.DtscRxCode = number;
            data.Tone = "DTCS";
          } else if (Tone.test(text)) {
            const number = getNumber(Tone, text);
            data.rToneFreq = number;
            data.cToneFreq = number;
            data.Tone = "Tone";
          }
          break;
      }
      } else {
        switch (cellIndex) {
          case 0:
            // Location
            data.Comment = text;
            break;
          case 1:
            // Open
            data.Comment = `${data.Comment} ${text}`;
            break;
        }
      }
    });
  });
  allData.push(data);
});
// allData.sort((a, b) => a.Frequency - b.Frequency);
// allData.forEach((a, i) => a.Location = i);
JSON.stringify(allData);
