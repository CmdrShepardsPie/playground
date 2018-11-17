function getNumber(reg, text) {
  if (text && text.match) {
    const match = text.match(reg);
    return parseFloat(match[match.length - 1], 10);
  }
  return NaN;
}
const allData = [];
// MyGMRS
// const tables = document.querySelectorAll('table.advancedSearchTable');
// RepeaterBook
const tables = document.querySelectorAll("table.w3-table.w3-striped.w3-responsive");
tables.forEach((table, tableIndex) => {
  const rows = table.querySelectorAll("tbody > tr");
  rows.forEach((row, rowIndex) => {
    const data = {
      Location: allData.length + 1,
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

    const cells = row.querySelectorAll("td");
    cells.forEach((cell, cellIndex) => {
      const Frequency = /([-+]?\d+\.?\d*)/;
      const CC = /CC(\d+)/;
      const DTSC = /D(\d+)/;
      const Tone = /(\d+\.?\d*)/;
      const text = cell.innerText;
      switch (cellIndex) {
        case 0:
          // Frequency
          data.Frequency = getNumber(Frequency, text);
          break;
        case 1:
          const number = getNumber(Frequency, text);
          // Offset
          if (number > 0) {
            data.Duplex = "+";
            data.Offset = number;
          } else if (number < 0) {
            data.Duplex = "-";
            data.Offset = Math.abs(number);
          }
          break;
        case 2:
          // Tone
          if (CC.test(text)) {
            data.Mode = "DIG";
          }
          if (DTSC.test(text)) {
            const number = getNumber(DTSC, text);
            data.DtcsCode = number;
            data.DtscRxCode = number;
            data.Tone = "DTCS";
          } else if (!CC.test(text) && !DTSC.test(text) && Tone.test(text)) {
            const number = getNumber(Tone, text);
            data.rToneFreq = number;
            data.cToneFreq = number;
            data.Tone = "Tone";
          }
          break;
        case 3:
          // Call
          data.Name = text;
          break;
        case 4:
          // Location
          data.Comment = text;
          break;
        case 5:
          // State
          data.Comment = `${data.Comment} ${text}`;
          break;
        case 6:
          // Use
          data.Comment = `${data.Comment} ${text}`;
          break;
        case 7:
          // VOIP
          data.Comment = `${data.Comment} ${text}`;
          break;
      }
      // } else {
      //   switch (cellIndex) {
      //     case 0:
      //       // Location
      //       data.Comment = text;
      //       break;
      //     case 1:
      //       // Status
      //       break;
      //     case 2:
      //       break;
      //   }
      // }
      // switch (x) {
      //   case 0:
      //     // Frequency
      //     data.Frequency = numberFilter;
      //     break;
      //   case 1:
      //     // Offset
      //     data.Duplex = numberFilter < 0 ? '-' : '+';
      //     data.Offset = Math.abs(numberFilter);
      //     break;
      //   case 2:
      //     // Tone
      //     const isDTSC = /D\d+/;
      //     if (isDTSC.test(text)) {
      //       data.Tone = 'DTSC'
      //     }
      //     break;
      //   case 3:
      //     // Call
      //     break;
      //   case 4:
      //     // Location
      //     break;
      //   case 5:
      //     // ST/PR
      //     break;
      //   case 6:
      //     // Use
      //     break;
      //   case 7:
      //     // VOIP
      //     break;
      //   case 8:
      //     // Mi
      //     break;
      //   case 9:
      //     // Status
      //     break;
      // }
    });
    allData.push(data);
  });
});
// allData.sort((a, b) => a.Frequency - b.Frequency);
// allData.forEach((a, i) => a.Location = i);
JSON.stringify(allData);
