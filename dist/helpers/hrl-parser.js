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
    Object.defineProperty(exports, "__esModule", { value: true });
    function parseHRL(text) {
        const data = {};
        const sectionHeaderRegex = /^(#(?:[a-z]|[A-Z]|[0-9]|[;.-])*#)(.*)?/gim;
        let result = [];
        // tslint:disable:no-conditional-assignment
        while ((result = sectionHeaderRegex.exec(text)) !== null) {
            // create section in data
            const sectionKey = result[1].split(";")[0].replace(/#/g, "");
            const sectionTitles = result[2].split("#");
            const sectionValues = getSectionValues(sectionKey, text);
            if (sectionValues.length > 1) {
                // it's an array of objects
                data[sectionKey] = [];
                for (const item of sectionValues) {
                    data[sectionKey].push(pairTitleVal(item, sectionTitles));
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
        const values = [];
        const regexStr = "^(?:" + key + "#{1})(.*)?";
        const valueRegex = new RegExp(regexStr, "gim");
        let result = [];
        while ((result = valueRegex.exec(text)) !== null) {
            values.push(result[1].split("#"));
        }
        return values;
    }
    function pairTitleVal(itemVals, sectionTitles) {
        const obj = {};
        sectionTitles.forEach((title, index) => {
            obj[title] = itemVals[index];
        });
        return obj;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHJsLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2hybC1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxTQUFnQixRQUFRLENBQUksSUFBWTtRQUN0QyxNQUFNLElBQUksR0FBUSxFQUFFLENBQUM7UUFDckIsTUFBTSxrQkFBa0IsR0FBRywyQ0FBMkMsQ0FBQztRQUN2RSxJQUFJLE1BQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzlCLDJDQUEyQztRQUMzQyxPQUFPLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN4RCx5QkFBeUI7WUFDekIsTUFBTSxVQUFVLEdBQVcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsTUFBTSxhQUFhLEdBQWUsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JFLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxNQUFNLElBQUksSUFBSSxhQUFhLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO2lCQUMxRDthQUNGO2lCQUFNLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JDLGlCQUFpQjtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDbEU7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQXRCRCw0QkFzQkM7SUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQVcsRUFBRSxJQUFZO1FBQ2pELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLFFBQVEsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLEdBQWlCLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUyxZQUFZLENBQUMsUUFBZSxFQUFFLGFBQXVCO1FBQzVELE1BQU0sR0FBRyxHQUEyQixFQUFFLENBQUM7UUFDdkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUNyRCxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSFJMPFM+KHRleHQ6IHN0cmluZyk6IFMge1xuICBjb25zdCBkYXRhOiBhbnkgPSB7fTtcbiAgY29uc3Qgc2VjdGlvbkhlYWRlclJlZ2V4ID0gL14oIyg/OlthLXpdfFtBLVpdfFswLTldfFs7Li1dKSojKSguKik/L2dpbTtcbiAgbGV0IHJlc3VsdDogYW55W10gfCBudWxsID0gW107XG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLWNvbmRpdGlvbmFsLWFzc2lnbm1lbnRcbiAgd2hpbGUgKChyZXN1bHQgPSBzZWN0aW9uSGVhZGVyUmVnZXguZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcbiAgICAvLyBjcmVhdGUgc2VjdGlvbiBpbiBkYXRhXG4gICAgY29uc3Qgc2VjdGlvbktleTogc3RyaW5nID0gcmVzdWx0WzFdLnNwbGl0KFwiO1wiKVswXS5yZXBsYWNlKC8jL2csIFwiXCIpO1xuICAgIGNvbnN0IHNlY3Rpb25UaXRsZXMgPSByZXN1bHRbMl0uc3BsaXQoXCIjXCIpO1xuICAgIGNvbnN0IHNlY3Rpb25WYWx1ZXM6IHN0cmluZ1tdW10gPSBnZXRTZWN0aW9uVmFsdWVzKHNlY3Rpb25LZXksIHRleHQpO1xuICAgIGlmIChzZWN0aW9uVmFsdWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIGl0J3MgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgZGF0YVtzZWN0aW9uS2V5XSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHNlY3Rpb25WYWx1ZXMpIHtcbiAgICAgICAgZGF0YVtzZWN0aW9uS2V5XS5wdXNoKHBhaXJUaXRsZVZhbChpdGVtLCBzZWN0aW9uVGl0bGVzKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzZWN0aW9uVmFsdWVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gaXQncyBhbiBvYmplY3RcbiAgICAgIGRhdGFbc2VjdGlvbktleV0gPSBwYWlyVGl0bGVWYWwoc2VjdGlvblZhbHVlc1swXSwgc2VjdGlvblRpdGxlcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBnZXRTZWN0aW9uVmFsdWVzKGtleTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiBzdHJpbmdbXVtdIHtcbiAgY29uc3QgdmFsdWVzID0gW107XG4gIGNvbnN0IHJlZ2V4U3RyID0gXCJeKD86XCIgKyBrZXkgKyBcIiN7MX0pKC4qKT9cIjtcbiAgY29uc3QgdmFsdWVSZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTdHIsIFwiZ2ltXCIpO1xuICBsZXQgcmVzdWx0OiBhbnlbXSB8IG51bGwgPSBbXTtcbiAgd2hpbGUgKChyZXN1bHQgPSB2YWx1ZVJlZ2V4LmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgdmFsdWVzLnB1c2gocmVzdWx0WzFdLnNwbGl0KFwiI1wiKSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuZnVuY3Rpb24gcGFpclRpdGxlVmFsKGl0ZW1WYWxzOiBhbnlbXSwgc2VjdGlvblRpdGxlczogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgY29uc3Qgb2JqOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gIHNlY3Rpb25UaXRsZXMuZm9yRWFjaCgodGl0bGU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIG9ialt0aXRsZV0gPSBpdGVtVmFsc1tpbmRleF07XG4gIH0pO1xuICByZXR1cm4gb2JqO1xufVxuIl19