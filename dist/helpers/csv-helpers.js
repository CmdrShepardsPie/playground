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
        define(["require", "exports", "csv", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _csv = __importStar(require("csv"));
    const util_1 = require("util");
    exports.parseAsync = util_1.promisify(_csv.parse);
    exports.stringifyAsync = util_1.promisify(_csv.stringify);
    function fillArrayObjects(inArray) {
        const outArray = [...inArray];
        const keys = {};
        outArray.forEach((item) => {
            const entries = Object.entries(item);
            entries.forEach((entry) => {
                keys[entry[0]] = true;
            });
        });
        outArray.forEach((item, index) => {
            item = { ...item };
            outArray[index] = item;
            Object.keys(keys).forEach((key) => {
                // @ts-ignore
                item[key] = item[key];
            });
        });
        return outArray;
    }
    exports.fillArrayObjects = fillArrayObjects;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3N2LWhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9jc3YtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwwQ0FBNEI7SUFDNUIsK0JBQStCO0lBTWxCLFFBQUEsVUFBVSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLFFBQUEsY0FBYyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXhELFNBQWdCLGdCQUFnQixDQUFDLE9BQWlCO1FBQ2hELE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUM5QixNQUFNLElBQUksR0FBeUIsRUFBRSxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQixJQUFJLEdBQUcsRUFBQyxHQUFHLElBQUksRUFBQyxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDaEMsYUFBYTtnQkFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBbEJELDRDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9jc3YgZnJvbSBcImNzdlwiO1xuaW1wb3J0IHtwcm9taXNpZnl9IGZyb20gXCJ1dGlsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ0tleXM8UD4ge1xuICBbaW5kZXg6IHN0cmluZ106IFA7XG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZUFzeW5jID0gcHJvbWlzaWZ5KF9jc3YucGFyc2UpO1xuZXhwb3J0IGNvbnN0IHN0cmluZ2lmeUFzeW5jID0gcHJvbWlzaWZ5KF9jc3Yuc3RyaW5naWZ5KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGxBcnJheU9iamVjdHMoaW5BcnJheTogb2JqZWN0W10pIHtcbiAgY29uc3Qgb3V0QXJyYXkgPSBbLi4uaW5BcnJheV07XG4gIGNvbnN0IGtleXM6IElTdHJpbmdLZXlzPGJvb2xlYW4+ID0ge307XG4gIG91dEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoaXRlbSk7XG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAga2V5c1tlbnRyeVswXV0gPSB0cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgb3V0QXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBpdGVtID0gey4uLml0ZW19O1xuICAgIG91dEFycmF5W2luZGV4XSA9IGl0ZW07XG4gICAgT2JqZWN0LmtleXMoa2V5cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBpdGVtW2tleV0gPSBpdGVtW2tleV07XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb3V0QXJyYXk7XG59XG4iXX0=