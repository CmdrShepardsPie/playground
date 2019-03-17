"use strict";
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
function finished(value) {
    console.log("Finished", value);
    return "Finished handled: " + value;
}
function handleError(value) {
    console.log('"Error"', value);
    return '"Error" handled: ' + value;
}
// Do Something Eventually takes a value of any type, an onFinished callback, and an onError callback
// After a random amount of time, onFinished or onError will be called, with 'value' being passed to the callback
// Using Timeout to simulate an asynchronous call (such as an HTTP or filesystem call)
function doSomethingEventually(value, onFinished, onError) {
    // Randomly wait between 500 and 2000ms to invoke the callback function
    var wait = 500 + Math.round(Math.random() * (2000 - 500));
    console.log("Start", "doSomethingEventually", value, "waiting", wait, "ms");
    setTimeout(function () {
        // Randomly determine if this will call finished or error
        var isError = Math.round(Math.random() * 5) === 0;
        if (!isError && onFinished) {
            onFinished(value);
        }
        else if (isError && onError) {
            onError(value);
        }
    }, wait);
}
function doSomethingWithAPromise(value) {
    return new Promise(function (resolve, reject) {
        doSomethingEventually(value, resolve, reject);
    });
}
function doSomethingUsingAsync(value) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, doSomethingWithAPromise(value)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, finished(result)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, handleError(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doMultipleThingsAtTheSameTime(values) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(values.map(function (val) { return doSomethingUsingAsync(val); }))];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
function doMultipleThingsOneAtATime(values) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, results, values_1, values_1_1, val, _b, _c, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    values_1 = __values(values), values_1_1 = values_1.next();
                    _d.label = 2;
                case 2:
                    if (!!values_1_1.done) return [3 /*break*/, 5];
                    val = values_1_1.value;
                    _c = (_b = results).push;
                    return [4 /*yield*/, doSomethingUsingAsync(val)];
                case 3:
                    _c.apply(_b, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    values_1_1 = values_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1["return"])) _a.call(values_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, results];
            }
        });
    });
}
function doAllTheThings() {
    return __awaiter(this, void 0, void 0, function () {
        var output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    output = "";
                    console.log();
                    console.log("Start");
                    console.log();
                    return [4 /*yield*/, asyncWaitForKeyPress()];
                case 1:
                    _a.sent();
                    // Run Do Something Eventually using callbacks
                    output = doSomethingEventually('Run "Callback"', finished, handleError);
                    console.log('Run "Callback"', "Returns:", output);
                    return [4 /*yield*/, asyncWaitForKeyPress()];
                case 2:
                    _a.sent();
                    // Run Do Something Eventually using a Promise
                    // Since this is a Promise, you could use await, but this is showing how you would normally handle a promise
                    output = doSomethingWithAPromise('Run "Promise"')
                        .then(finished)["catch"](handleError);
                    console.log('Run "Promise"', "Returns:", output);
                    return [4 /*yield*/, asyncWaitForKeyPress()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, doSomethingUsingAsync('Run "Async"')];
                case 4:
                    // Run Do Something Eventually using Async (which is a Promise but appears to execute synchronously)
                    output = _a.sent();
                    console.log('Run "Async"', "Returns:", output);
                    return [4 /*yield*/, asyncWaitForKeyPress()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, doMultipleThingsAtTheSameTime(['Run "Parallel" 1', 'Run "Parallel" 2', 'Run "Parallel" 3', 'Run "Parallel" 4'])];
                case 6:
                    // Run Do Something Eventually for each item in the array without waiting for each to finish before starting the next
                    output = _a.sent();
                    console.log('Run "Parallel"', "Returns:", output);
                    return [4 /*yield*/, asyncWaitForKeyPress()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, doMultipleThingsOneAtATime(['Run "Serial" 1', 'Run "Serial" 2', 'Run "Serial" 3', 'Run "Serial" 4'])];
                case 8:
                    // Run Do Something Eventually for each item in the array but don't start the next until each has finished
                    output = _a.sent();
                    console.log('Run "Serial"', "Returns:", output);
                    console.log();
                    console.log("Done");
                    console.log();
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
function asyncWaitForKeyPress() {
    return new Promise(function (resolve) {
        console.log("(Press any key to do start next test)");
        process.stdin.resume();
        process.stdin.on("data", resolve);
    });
}
doAllTheThings();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZXMtYW5kLWFzeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FzdHVmZi9wcm9taXNlcy1hbmQtYXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVMsUUFBUSxDQUFDLEtBQUs7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0IsT0FBTyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDdEMsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQUs7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsT0FBTyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDckMsQ0FBQztBQUVELHFHQUFxRztBQUNyRyxpSEFBaUg7QUFDakgsc0ZBQXNGO0FBQ3RGLFNBQVMscUJBQXFCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPO0lBQ3ZELHVFQUF1RTtJQUN2RSxJQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUU1RSxVQUFVLENBQUM7UUFDVCx5REFBeUQ7UUFDekQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxPQUFPLElBQUksVUFBVSxFQUFFO1lBQzFCLFVBQVUsQ0FBQyxLQUFL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LEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxFQUFBOztvQkFEOUgscUhBQXFIO29CQUNySCxNQUFNLEdBQUcsU0FBcUgsQ0FBQztvQkFDL0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBRWxELHFCQUFNLG9CQUFvQixFQUFFLEVBQUE7O29CQUE1QixTQUE0QixDQUFDO29CQUdwQixxQkFBTSwwQkFBMEIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUMsRUFBQTs7b0JBRG5ILDBHQUEwRztvQkFDMUcsTUFBTSxHQUFHLFNBQTBHLENBQUM7b0JBQ3BILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFaEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFFZCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztDQUNqQjtBQUVELFNBQVMsb0JBQW9CO0lBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUVyRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGZpbmlzaGVkKHZhbHVlKSB7XG4gIGNvbnNvbGUubG9nKFwiRmluaXNoZWRcIiwgdmFsdWUpO1xuICByZXR1cm4gXCJGaW5pc2hlZCBoYW5kbGVkOiBcIiArIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcih2YWx1ZSkge1xuICBjb25zb2xlLmxvZygnXCJFcnJvclwiJywgdmFsdWUpO1xuICByZXR1cm4gJ1wiRXJyb3JcIiBoYW5kbGVkOiAnICsgdmFsdWU7XG59XG5cbi8vIERvIFNvbWV0aGluZyBFdmVudHVhbGx5IHRha2VzIGEgdmFsdWUgb2YgYW55IHR5cGUsIGFuIG9uRmluaXNoZWQgY2FsbGJhY2ssIGFuZCBhbiBvbkVycm9yIGNhbGxiYWNrXG4vLyBBZnRlciBhIHJhbmRvbSBhbW91bnQgb2YgdGltZSwgb25GaW5pc2hlZCBvciBvbkVycm9yIHdpbGwgYmUgY2FsbGVkLCB3aXRoICd2YWx1ZScgYmVpbmcgcGFzc2VkIHRvIHRoZSBjYWxsYmFja1xuLy8gVXNpbmcgVGltZW91dCB0byBzaW11bGF0ZSBhbiBhc3luY2hyb25vdXMgY2FsbCAoc3VjaCBhcyBhbiBIVFRQIG9yIGZpbGVzeXN0ZW0gY2FsbClcbmZ1bmN0aW9uIGRvU29tZXRoaW5nRXZlbnR1YWxseSh2YWx1ZSwgb25GaW5pc2hlZCwgb25FcnJvcikge1xuICAvLyBSYW5kb21seSB3YWl0IGJldHdlZW4gNTAwIGFuZCAyMDAwbXMgdG8gaW52b2tlIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICBjb25zdCB3YWl0ID0gNTAwICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKDIwMDAgLSA1MDApKTtcbiAgY29uc29sZS5sb2coXCJTdGFydFwiLCBcImRvU29tZXRoaW5nRXZlbnR1YWxseVwiLCB2YWx1ZSwgXCJ3YWl0aW5nXCIsIHdhaXQsIFwibXNcIik7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gUmFuZG9tbHkgZGV0ZXJtaW5lIGlmIHRoaXMgd2lsbCBjYWxsIGZpbmlzaGVkIG9yIGVycm9yXG4gICAgY29uc3QgaXNFcnJvciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDUpID09PSAwO1xuXG4gICAgaWYgKCFpc0Vycm9yICYmIG9uRmluaXNoZWQpIHtcbiAgICAgIG9uRmluaXNoZWQodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoaXNFcnJvciAmJiBvbkVycm9yKSB7XG4gICAgICBvbkVycm9yKHZhbHVlKTtcbiAgICB9XG5cbiAgfSwgd2FpdCk7XG59XG5cbmZ1bmN0aW9uIGRvU29tZXRoaW5nV2l0aEFQcm9taXNlKHZhbHVlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZG9Tb21ldGhpbmdFdmVudHVhbGx5KHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9Tb21ldGhpbmdVc2luZ0FzeW5jKHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9Tb21ldGhpbmdXaXRoQVByb21pc2UodmFsdWUpO1xuICAgIHJldHVybiBmaW5pc2hlZChyZXN1bHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBoYW5kbGVFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9NdWx0aXBsZVRoaW5nc0F0VGhlU2FtZVRpbWUodmFsdWVzKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICB2YWx1ZXMubWFwKCh2YWwpID0+IGRvU29tZXRoaW5nVXNpbmdBc3luYyh2YWwpKSxcbiAgKTtcbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvTXVsdGlwbGVUaGluZ3NPbmVBdEFUaW1lKHZhbHVlcykge1xuICBjb25zdCByZXN1bHRzID0gW107XG4gIGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuICAgIHJlc3VsdHMucHVzaChhd2FpdCBkb1NvbWV0aGluZ1VzaW5nQXN5bmModmFsKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRvQWxsVGhlVGhpbmdzKCkge1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcblxuICBjb25zb2xlLmxvZygpO1xuICBjb25zb2xlLmxvZyhcIlN0YXJ0XCIpO1xuICBjb25zb2xlLmxvZygpO1xuXG4gIGF3YWl0IGFzeW5jV2FpdEZvcktleVByZXNzKCk7XG5cbiAgLy8gUnVuIERvIFNvbWV0aGluZyBFdmVudHVhbGx5IHVzaW5nIGNhbGxiYWNrc1xuICBvdXRwdXQgPSBkb1NvbWV0aGluZ0V2ZW50dWFsbHkoJ1J1biBcIkNhbGxiYWNrXCInLCBmaW5pc2hlZCwgaGFuZGxlRXJyb3IpO1xuICBjb25zb2xlLmxvZygnUnVuIFwiQ2FsbGJhY2tcIicsIFwiUmV0dXJuczpcIiwgb3V0cHV0KTtcblxuICBhd2FpdCBhc3luY1dhaXRGb3JLZXlQcmVzcygpO1xuXG4gIC8vIFJ1biBEbyBTb21ldGhpbmcgRXZlbnR1YWxseSB1c2luZyBhIFByb21pc2VcbiAgLy8gU2luY2UgdGhpcyBpcyBhIFByb21pc2UsIHlvdSBjb3VsZCB1c2UgYXdhaXQsIGJ1dCB0aGlzIGlzIHNob3dpbmcgaG93IHlvdSB3b3VsZCBub3JtYWxseSBoYW5kbGUgYSBwcm9taXNlXG4gIG91dHB1dCA9IGRvU29tZXRoaW5nV2l0aEFQcm9taXNlKCdSdW4gXCJQcm9taXNlXCInKVxuICAgIC50aGVuKGZpbmlzaGVkKVxuICAgIC5jYXRjaChoYW5kbGVFcnJvcik7XG4gIGNvbnNvbGUubG9nKCdSdW4gXCJQcm9taXNlXCInLCBcIlJldHVybnM6XCIsIG91dHB1dCk7XG5cbiAgYXdhaXQgYXN5bmNXYWl0Rm9yS2V5UHJlc3MoKTtcblxuICAvLyBSdW4gRG8gU29tZXRoaW5nIEV2ZW50dWFsbHkgdXNpbmcgQXN5bmMgKHdoaWNoIGlzIGEgUHJvbWlzZSBidXQgYXBwZWFycyB0byBleGVjdXRlIHN5bmNocm9ub3VzbHkpXG4gIG91dHB1dCA9IGF3YWl0IGRvU29tZXRoaW5nVXNpbmdBc3luYygnUnVuIFwiQXN5bmNcIicpO1xuICBjb25zb2xlLmxvZygnUnVuIFwiQXN5bmNcIicsIFwiUmV0dXJuczpcIiwgb3V0cHV0KTtcblxuICBhd2FpdCBhc3luY1dhaXRGb3JLZXlQcmVzcygpO1xuXG4gIC8vIFJ1biBEbyBTb21ldGhpbmcgRXZlbnR1YWxseSBmb3IgZWFjaCBpdGVtIGluIHRoZSBhcnJheSB3aXRob3V0IHdhaXRpbmcgZm9yIGVhY2ggdG8gZmluaXNoIGJlZm9yZSBzdGFydGluZyB0aGUgbmV4dFxuICBvdXRwdXQgPSBhd2FpdCBkb011bHRpcGxlVGhpbmdzQXRUaGVTYW1lVGltZShbJ1J1biBcIlBhcmFsbGVsXCIgMScsICdSdW4gXCJQYXJhbGxlbFwiIDInLCAnUnVuIFwiUGFyYWxsZWxcIiAzJywgJ1J1biBcIlBhcmFsbGVsXCIgNCddKTtcbiAgY29uc29sZS5sb2coJ1J1biBcIlBhcmFsbGVsXCInLCBcIlJldHVybnM6XCIsIG91dHB1dCk7XG5cbiAgYXdhaXQgYXN5bmNXYWl0Rm9yS2V5UHJlc3MoKTtcblxuICAvLyBSdW4gRG8gU29tZXRoaW5nIEV2ZW50dWFsbHkgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgYnV0IGRvbid0IHN0YXJ0IHRoZSBuZXh0IHVudGlsIGVhY2ggaGFzIGZpbmlzaGVkXG4gIG91dHB1dCA9IGF3YWl0IGRvTXVsdGlwbGVUaGluZ3NPbmVBdEFUaW1lKFsnUnVuIFwiU2VyaWFsXCIgMScsICdSdW4gXCJTZXJpYWxcIiAyJywgJ1J1biBcIlNlcmlhbFwiIDMnLCAnUnVuIFwiU2VyaWFsXCIgNCddKTtcbiAgY29uc29sZS5sb2coJ1J1biBcIlNlcmlhbFwiJywgXCJSZXR1cm5zOlwiLCBvdXRwdXQpO1xuXG4gIGNvbnNvbGUubG9nKCk7XG4gIGNvbnNvbGUubG9nKFwiRG9uZVwiKTtcbiAgY29uc29sZS5sb2coKTtcblxuICBwcm9jZXNzLmV4aXQoMCk7XG59XG5cbmZ1bmN0aW9uIGFzeW5jV2FpdEZvcktleVByZXNzKCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIihQcmVzcyBhbnkga2V5IHRvIGRvIHN0YXJ0IG5leHQgdGVzdClcIik7XG5cbiAgICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuICAgIHByb2Nlc3Muc3RkaW4ub24oXCJkYXRhXCIsIHJlc29sdmUpO1xuICB9KTtcbn1cblxuZG9BbGxUaGVUaGluZ3MoKTtcbiJdfQ==