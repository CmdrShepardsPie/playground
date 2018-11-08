import * as xlsx from "xlsx";

export async function readXLXS<S>(filename: string): Promise<{ [s: string]: S[] }> {
  const outData: { [s: string]: any[] } = {};
  const fileData = await xlsx.readFile(filename);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cellRegex = /([a-z]+)([0-9]+)/i;
  for (const sheetName of fileData.SheetNames) {
    // console.log("Sheet name", sheetName);
    const headers = [];
    const allData = [];
    const sheet = fileData.Sheets[sheetName];
    const cellNames = Object.keys(sheet);
    let row: any;
    for (const cellName of cellNames) {
      // console.log("Cell name", cellName);
      const match = cellName.match(cellRegex);
      if (match) {
        const columnId = match[1];
        const rowId = match[2];
        const cell = sheet[cellName];
        const value = cell.v;
        const columnNumber = letters.indexOf(columnId);
        if (rowId === "1") {
          headers.push(value);
        } else {
          if (columnNumber === 0) {
            row = {};
            allData.push(row);
          }
          row[headers[columnNumber]] = value;
        }
      }
    }
    console.log("Got", headers.length, "Columns", allData.length, "Rows", "From", sheetName);
    outData[sheetName] = allData;
  }
  return outData;
}
