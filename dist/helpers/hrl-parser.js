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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function parseHRL(text) {
        var e_1, _a;
        var data = {};
        var sectionHeaderRegex = /^(#(?:[a-z]|[A-Z]|[0-9]|[;.-])*#)(.*)?/gim;
        var result = [];
        // tslint:disable:no-conditional-assignment
        while ((result = sectionHeaderRegex.exec(text)) !== null) {
            // create section in data
            var sectionKey = result[1].split(";")[0].replace(/#/g, "");
            var sectionTitles = result[2].split("#");
            var sectionValues = getSectionValues(sectionKey, text);
            if (sectionValues.length > 1) {
                // it's an array of objects
                data[sectionKey] = [];
                try {
                    for (var sectionValues_1 = __values(sectionValues), sectionValues_1_1 = sectionValues_1.next(); !sectionValues_1_1.done; sectionValues_1_1 = sectionValues_1.next()) {
                        var item = sectionValues_1_1.value;
                        data[sectionKey].push(pairTitleVal(item, sectionTitles));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (sectionValues_1_1 && !sectionValues_1_1.done && (_a = sectionValues_1["return"])) _a.call(sectionValues_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else if (sectionValues.length === 1) {
                // it's an object
                data[sectionKey] = pairTitleVal(sectionValues[0], sectionTitles);
            }
        }
        return data;
    }
    exports.parseHRL = parseHRL;
    function getSectionValues(key, text) {
        var values = [];
        var regexStr = "^(?:" + key + "#{1})(.*)?";
        var valueRegex = new RegExp(regexStr, "gim");
        var result = [];
        while ((result = valueRegex.exec(text)) !== null) {
            values.push(result[1].split("#"));
        }
        return values;
    }
    function pairTitleVal(itemVals, sectionTitles) {
        var obj = {};
        sectionTitles.forEach(function (title, index) {
            obj[title] = itemVals[index];
        });
        return obj;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHJsLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2hybC1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsU0FBZ0IsUUFBUSxDQUFJLElBQVk7O1FBQ3RDLElBQU0sSUFBSSxHQUFRLEVBQUUsQ0FBQztRQUNyQixJQUFNLGtCQUFrQixHQUFHLDJDQUEyQyxDQUFDO1FBQ3ZFLElBQUksTUFBTSxHQUFpQixFQUFFLENBQUM7UUFDOUIsMkNBQTJDO1FBQzNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3hELHlCQUF5QjtZQUN6QixJQUFNLFVBQVUsR0FBVyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckUsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFNLGFBQWEsR0FBZSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckUsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDNUIsMkJBQTJCO2dCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDOztvQkFDdEIsS0FBbUIsSUFBQSxrQkFBQSxTQUFBLGFBQWEsQ0FBQSw0Q0FBQSx1RUFBRTt3QkFBN0IsSUFBTSxJQUFJLDBCQUFBO3dCQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO3FCQUMxRDs7Ozs7Ozs7O2FBQ0Y7aUJBQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDckMsaUJBQWlCO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUNsRTtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBdEJELDRCQXNCQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsR0FBVyxFQUFFLElBQVk7UUFDakQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBQzdDLElBQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLFlBQVksQ0FBQyxRQUFlLEVBQUUsYUFBdUI7UUFDNUQsSUFBTSxHQUFHLEdBQXlCLEVBQUUsQ0FBQztRQUNyQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBYSxFQUFFLEtBQWE7WUFDakQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBwYXJzZUhSTDxTPih0ZXh0OiBzdHJpbmcpOiBTIHtcbiAgY29uc3QgZGF0YTogYW55ID0ge307XG4gIGNvbnN0IHNlY3Rpb25IZWFkZXJSZWdleCA9IC9eKCMoPzpbYS16XXxbQS1aXXxbMC05XXxbOy4tXSkqIykoLiopPy9naW07XG4gIGxldCByZXN1bHQ6IGFueVtdIHwgbnVsbCA9IFtdO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1jb25kaXRpb25hbC1hc3NpZ25tZW50XG4gIHdoaWxlICgocmVzdWx0ID0gc2VjdGlvbkhlYWRlclJlZ2V4LmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgLy8gY3JlYXRlIHNlY3Rpb24gaW4gZGF0YVxuICAgIGNvbnN0IHNlY3Rpb25LZXk6IHN0cmluZyA9IHJlc3VsdFsxXS5zcGxpdChcIjtcIilbMF0ucmVwbGFjZSgvIy9nLCBcIlwiKTtcbiAgICBjb25zdCBzZWN0aW9uVGl0bGVzID0gcmVzdWx0WzJdLnNwbGl0KFwiI1wiKTtcbiAgICBjb25zdCBzZWN0aW9uVmFsdWVzOiBzdHJpbmdbXVtdID0gZ2V0U2VjdGlvblZhbHVlcyhzZWN0aW9uS2V5LCB0ZXh0KTtcbiAgICBpZiAoc2VjdGlvblZhbHVlcy5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBpdCdzIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgIGRhdGFbc2VjdGlvbktleV0gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBzZWN0aW9uVmFsdWVzKSB7XG4gICAgICAgIGRhdGFbc2VjdGlvbktleV0ucHVzaChwYWlyVGl0bGVWYWwoaXRlbSwgc2VjdGlvblRpdGxlcykpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2VjdGlvblZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIGl0J3MgYW4gb2JqZWN0XG4gICAgICBkYXRhW3NlY3Rpb25LZXldID0gcGFpclRpdGxlVmFsKHNlY3Rpb25WYWx1ZXNbMF0sIHNlY3Rpb25UaXRsZXMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VjdGlvblZhbHVlcyhrZXk6IHN0cmluZywgdGV4dDogc3RyaW5nKTogc3RyaW5nW11bXSB7XG4gIGNvbnN0IHZhbHVlcyA9IFtdO1xuICBjb25zdCByZWdleFN0ciA9IFwiXig/OlwiICsga2V5ICsgXCIjezF9KSguKik/XCI7XG4gIGNvbnN0IHZhbHVlUmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4U3RyLCBcImdpbVwiKTtcbiAgbGV0IHJlc3VsdDogYW55W10gfCBudWxsID0gW107XG4gIHdoaWxlICgocmVzdWx0ID0gdmFsdWVSZWdleC5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgIHZhbHVlcy5wdXNoKHJlc3VsdFsxXS5zcGxpdChcIiNcIikpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIHBhaXJUaXRsZVZhbChpdGVtVmFsczogYW55W10sIHNlY3Rpb25UaXRsZXM6IHN0cmluZ1tdKToge1trZXk6IHN0cmluZ106IHN0cmluZ30ge1xuICBjb25zdCBvYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gIHNlY3Rpb25UaXRsZXMuZm9yRWFjaCgodGl0bGU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIG9ialt0aXRsZV0gPSBpdGVtVmFsc1tpbmRleF07XG4gIH0pO1xuICByZXR1cm4gb2JqO1xufVxuIl19