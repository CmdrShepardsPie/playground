var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
    exports.__esModule = true;
    var xlsx = require("xlsx");
    function readXLXS(filename) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, outData, fileData, letters, cellRegex, _c, _d, sheetName, headers, allData_1, sheet, cellNames, row, cellNames_1, cellNames_1_1, cellName, match, columnId, rowId, cell, value, columnNumber;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        outData = {};
                        return [4 /*yield*/, xlsx.readFile(filename)];
                    case 1:
                        fileData = _e.sent();
                        letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        cellRegex = /([a-z]+)([0-9]+)/i;
                        try {
                            for (_c = __values(fileData.SheetNames), _d = _c.next(); !_d.done; _d = _c.next()) {
                                sheetName = _d.value;
                                headers = [];
                                allData_1 = [];
                                sheet = fileData.Sheets[sheetName];
                                cellNames = Object.keys(sheet);
                                row = void 0;
                                try {
                                    for (cellNames_1 = __values(cellNames), cellNames_1_1 = cellNames_1.next(); !cellNames_1_1.done; cellNames_1_1 = cellNames_1.next()) {
                                        cellName = cellNames_1_1.value;
                                        match = cellName.match(cellRegex);
                                        if (match) {
                                            columnId = match[1];
                                            rowId = match[2];
                                            cell = sheet[cellName];
                                            value = cell.v;
                                            columnNumber = letters.indexOf(columnId);
                                            if (rowId === "1") {
                                                headers.push(value);
                                            }
                                            else {
                                                if (columnNumber === 0) {
                                                    row = {};
                                                    allData_1.push(row);
                                                }
                                                row[headers[columnNumber]] = value;
                                            }
                                        }
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (cellNames_1_1 && !cellNames_1_1.done && (_b = cellNames_1["return"])) _b.call(cellNames_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                                console.log("Got", headers.length, "Columns", allData_1.length, "Rows", "From", sheetName);
                                outData[sheetName] = allData_1;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, outData];
                }
            });
        });
    }
    exports.readXLXS = readXLXS;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZGF0YS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMkJBQTZCO0lBRTdCLFNBQXNCLFFBQVEsQ0FBSSxRQUFnQjs7Ozs7O3dCQUMxQyxPQUFPLEdBQTJCLEVBQUUsQ0FBQzt3QkFDMUIscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQXhDLFFBQVEsR0FBRyxTQUE2Qjt3QkFFeEMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO3dCQUN2QyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7OzRCQUN0QyxLQUF3QixLQUFBLFNBQUEsUUFBUSxDQUFDLFVBQVUsQ0FBQSw0Q0FBRTtnQ0FBbEMsU0FBUztnQ0FFWixPQUFPLEdBQUcsRUFBRSxDQUFDO2dDQUNiLFlBQVUsRUFBRSxDQUFDO2dDQUNiLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNuQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDakMsR0FBRyxTQUFLLENBQUM7O29DQUNiLEtBQXVCLGNBQUEsU0FBQSxTQUFTLENBQUEsK0ZBQUU7d0NBQXZCLFFBQVE7d0NBRVgsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7d0NBQ3hDLElBQUksS0FBSyxFQUFFOzRDQUNILFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NENBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NENBQ2pCLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7NENBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRDQUNmLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRDQUMvQyxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7Z0RBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NkNBQ3JCO2lEQUFNO2dEQUNMLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTtvREFDdEIsR0FBRyxHQUFHLEVBQUUsQ0FBQztvREFDVCxTQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lEQUNuQjtnREFDRCxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDOzZDQUNwQzt5Q0FDRjtxQ0FDRjs7Ozs7Ozs7O2dDQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztnQ0FDekYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQU8sQ0FBQzs2QkFDOUI7Ozs7Ozs7Ozt3QkFDRCxzQkFBTyxPQUFPLEVBQUM7Ozs7S0FDaEI7SUFyQ0QsNEJBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgeGxzeCBmcm9tIFwieGxzeFwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZFhMWFM8Uz4oZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8eyBbczogc3RyaW5nXTogU1tdIH0+IHtcbiAgY29uc3Qgb3V0RGF0YTogeyBbczogc3RyaW5nXTogYW55W10gfSA9IHt9O1xuICBjb25zdCBmaWxlRGF0YSA9IGF3YWl0IHhsc3gucmVhZEZpbGUoZmlsZW5hbWUpO1xuXG4gIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XG4gIGNvbnN0IGNlbGxSZWdleCA9IC8oW2Etel0rKShbMC05XSspL2k7XG4gIGZvciAoY29uc3Qgc2hlZXROYW1lIG9mIGZpbGVEYXRhLlNoZWV0TmFtZXMpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNoZWV0IG5hbWVcIiwgc2hlZXROYW1lKTtcbiAgICBjb25zdCBoZWFkZXJzID0gW107XG4gICAgY29uc3QgYWxsRGF0YSA9IFtdO1xuICAgIGNvbnN0IHNoZWV0ID0gZmlsZURhdGEuU2hlZXRzW3NoZWV0TmFtZV07XG4gICAgY29uc3QgY2VsbE5hbWVzID0gT2JqZWN0LmtleXMoc2hlZXQpO1xuICAgIGxldCByb3c6IGFueTtcbiAgICBmb3IgKGNvbnN0IGNlbGxOYW1lIG9mIGNlbGxOYW1lcykge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJDZWxsIG5hbWVcIiwgY2VsbE5hbWUpO1xuICAgICAgY29uc3QgbWF0Y2ggPSBjZWxsTmFtZS5tYXRjaChjZWxsUmVnZXgpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbklkID0gbWF0Y2hbMV07XG4gICAgICAgIGNvbnN0IHJvd0lkID0gbWF0Y2hbMl07XG4gICAgICAgIGNvbnN0IGNlbGwgPSBzaGVldFtjZWxsTmFtZV07XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY2VsbC52O1xuICAgICAgICBjb25zdCBjb2x1bW5OdW1iZXIgPSBsZXR0ZXJzLmluZGV4T2YoY29sdW1uSWQpO1xuICAgICAgICBpZiAocm93SWQgPT09IFwiMVwiKSB7XG4gICAgICAgICAgaGVhZGVycy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29sdW1uTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICByb3cgPSB7fTtcbiAgICAgICAgICAgIGFsbERhdGEucHVzaChyb3cpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb3dbaGVhZGVyc1tjb2x1bW5OdW1iZXJdXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiR290XCIsIGhlYWRlcnMubGVuZ3RoLCBcIkNvbHVtbnNcIiwgYWxsRGF0YS5sZW5ndGgsIFwiUm93c1wiLCBcIkZyb21cIiwgc2hlZXROYW1lKTtcbiAgICBvdXREYXRhW3NoZWV0TmFtZV0gPSBhbGxEYXRhO1xuICB9XG4gIHJldHVybiBvdXREYXRhO1xufVxuIl19