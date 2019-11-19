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
        define(["require", "exports", "xlsx"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const xlsx = __importStar(require("xlsx"));
    async function readXLXS(filename) {
        const outData = {};
        const fileData = await xlsx.readFile(filename);
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const cellRegex = /([a-z]+)([0-9]+)/i;
        for (const sheetName of fileData.SheetNames) {
            // console.log("Sheet name", sheetName);
            const headers = [];
            const allData = [];
            const sheet = fileData.Sheets[sheetName];
            const cellNames = Object.keys(sheet);
            let row;
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
                    }
                    else {
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
    exports.readXLXS = readXLXS;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZGF0YS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLDJDQUE2QjtJQUV0QixLQUFLLFVBQVUsUUFBUSxDQUFJLFFBQWdCO1FBQ2hELE1BQU0sT0FBTyxHQUEyQixFQUFFLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sT0FBTyxHQUFHLDRCQUE0QixDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDO1FBQ3RDLEtBQUssTUFBTSxTQUFTLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUMzQyx3Q0FBd0M7WUFDeEMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxHQUFRLENBQUM7WUFDYixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtnQkFDaEMsc0NBQXNDO2dCQUN0QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7d0JBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNMLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTs0QkFDdEIsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNuQjt3QkFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUNwQztpQkFDRjthQUNGO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3pGLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDOUI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBckNELDRCQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHhsc3ggZnJvbSBcInhsc3hcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWFkWExYUzxTPihmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTx7IFtzOiBzdHJpbmddOiBTW10gfT4ge1xyXG4gIGNvbnN0IG91dERhdGE6IHsgW3M6IHN0cmluZ106IGFueVtdIH0gPSB7fTtcclxuICBjb25zdCBmaWxlRGF0YSA9IGF3YWl0IHhsc3gucmVhZEZpbGUoZmlsZW5hbWUpO1xyXG5cclxuICBjb25zdCBsZXR0ZXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xyXG4gIGNvbnN0IGNlbGxSZWdleCA9IC8oW2Etel0rKShbMC05XSspL2k7XHJcbiAgZm9yIChjb25zdCBzaGVldE5hbWUgb2YgZmlsZURhdGEuU2hlZXROYW1lcykge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJTaGVldCBuYW1lXCIsIHNoZWV0TmFtZSk7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gW107XHJcbiAgICBjb25zdCBhbGxEYXRhID0gW107XHJcbiAgICBjb25zdCBzaGVldCA9IGZpbGVEYXRhLlNoZWV0c1tzaGVldE5hbWVdO1xyXG4gICAgY29uc3QgY2VsbE5hbWVzID0gT2JqZWN0LmtleXMoc2hlZXQpO1xyXG4gICAgbGV0IHJvdzogYW55O1xyXG4gICAgZm9yIChjb25zdCBjZWxsTmFtZSBvZiBjZWxsTmFtZXMpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJDZWxsIG5hbWVcIiwgY2VsbE5hbWUpO1xyXG4gICAgICBjb25zdCBtYXRjaCA9IGNlbGxOYW1lLm1hdGNoKGNlbGxSZWdleCk7XHJcbiAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbklkID0gbWF0Y2hbMV07XHJcbiAgICAgICAgY29uc3Qgcm93SWQgPSBtYXRjaFsyXTtcclxuICAgICAgICBjb25zdCBjZWxsID0gc2hlZXRbY2VsbE5hbWVdO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gY2VsbC52O1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbk51bWJlciA9IGxldHRlcnMuaW5kZXhPZihjb2x1bW5JZCk7XHJcbiAgICAgICAgaWYgKHJvd0lkID09PSBcIjFcIikge1xyXG4gICAgICAgICAgaGVhZGVycy5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKGNvbHVtbk51bWJlciA9PT0gMCkge1xyXG4gICAgICAgICAgICByb3cgPSB7fTtcclxuICAgICAgICAgICAgYWxsRGF0YS5wdXNoKHJvdyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByb3dbaGVhZGVyc1tjb2x1bW5OdW1iZXJdXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXCJHb3RcIiwgaGVhZGVycy5sZW5ndGgsIFwiQ29sdW1uc1wiLCBhbGxEYXRhLmxlbmd0aCwgXCJSb3dzXCIsIFwiRnJvbVwiLCBzaGVldE5hbWUpO1xyXG4gICAgb3V0RGF0YVtzaGVldE5hbWVdID0gYWxsRGF0YTtcclxuICB9XHJcbiAgcmV0dXJuIG91dERhdGE7XHJcbn1cclxuIl19