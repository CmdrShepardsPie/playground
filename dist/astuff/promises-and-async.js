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
                        if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
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
                        .then(finished)
                        .catch(handleError);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZXMtYW5kLWFzeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FzdHVmZi9wcm9taXNlcy1hbmQtYXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVMsUUFBUSxDQUFDLEtBQUs7SUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0IsT0FBTyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7QUFDdEMsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEtBQUs7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUIsT0FBTyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDckMsQ0FBQztBQUVELHFHQUFxRztBQUNyRyxpSEFBaUg7QUFDakgsc0ZBQXNGO0FBQ3RGLFNBQVMscUJBQXFCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPO0lBQ3ZELHVFQUF1RTtJQUN2RSxJQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUU1RSxVQUFVLENBQUM7UUFDVCx5REFBeUQ7UUFDekQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxPQUFPLElBQUksVUFBVSxFQUFFO1lBQzFCLFVBQVUsQ0FBQyxLQUFL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RSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLEVBQUE7O29CQUQ5SCxxSEFBcUg7b0JBQ3JILE1BQU0sR0FBRyxTQUFxSCxDQUFDO29CQUMvSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFbEQscUJBQU0sb0JBQW9CLEVBQUUsRUFBQTs7b0JBQTVCLFNBQTRCLENBQUM7b0JBR3BCLHFCQUFNLDBCQUEwQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxFQUFBOztvQkFEbkgsMEdBQTBHO29CQUMxRyxNQUFNLEdBQUcsU0FBMEcsQ0FBQztvQkFDcEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUVoRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUVkLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0NBQ2pCO0FBRUQsU0FBUyxvQkFBb0I7SUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBRXJELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELGNBQWMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmluaXNoZWQodmFsdWUpIHtcbiAgY29uc29sZS5sb2coXCJGaW5pc2hlZFwiLCB2YWx1ZSk7XG4gIHJldHVybiBcIkZpbmlzaGVkIGhhbmRsZWQ6IFwiICsgdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKHZhbHVlKSB7XG4gIGNvbnNvbGUubG9nKCdcIkVycm9yXCInLCB2YWx1ZSk7XG4gIHJldHVybiAnXCJFcnJvclwiIGhhbmRsZWQ6ICcgKyB2YWx1ZTtcbn1cblxuLy8gRG8gU29tZXRoaW5nIEV2ZW50dWFsbHkgdGFrZXMgYSB2YWx1ZSBvZiBhbnkgdHlwZSwgYW4gb25GaW5pc2hlZCBjYWxsYmFjaywgYW5kIGFuIG9uRXJyb3IgY2FsbGJhY2tcbi8vIEFmdGVyIGEgcmFuZG9tIGFtb3VudCBvZiB0aW1lLCBvbkZpbmlzaGVkIG9yIG9uRXJyb3Igd2lsbCBiZSBjYWxsZWQsIHdpdGggJ3ZhbHVlJyBiZWluZyBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXG4vLyBVc2luZyBUaW1lb3V0IHRvIHNpbXVsYXRlIGFuIGFzeW5jaHJvbm91cyBjYWxsIChzdWNoIGFzIGFuIEhUVFAgb3IgZmlsZXN5c3RlbSBjYWxsKVxuZnVuY3Rpb24gZG9Tb21ldGhpbmdFdmVudHVhbGx5KHZhbHVlLCBvbkZpbmlzaGVkLCBvbkVycm9yKSB7XG4gIC8vIFJhbmRvbWx5IHdhaXQgYmV0d2VlbiA1MDAgYW5kIDIwMDBtcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gIGNvbnN0IHdhaXQgPSA1MDAgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoMjAwMCAtIDUwMCkpO1xuICBjb25zb2xlLmxvZyhcIlN0YXJ0XCIsIFwiZG9Tb21ldGhpbmdFdmVudHVhbGx5XCIsIHZhbHVlLCBcIndhaXRpbmdcIiwgd2FpdCwgXCJtc1wiKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyBSYW5kb21seSBkZXRlcm1pbmUgaWYgdGhpcyB3aWxsIGNhbGwgZmluaXNoZWQgb3IgZXJyb3JcbiAgICBjb25zdCBpc0Vycm9yID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNSkgPT09IDA7XG5cbiAgICBpZiAoIWlzRXJyb3IgJiYgb25GaW5pc2hlZCkge1xuICAgICAgb25GaW5pc2hlZCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc0Vycm9yICYmIG9uRXJyb3IpIHtcbiAgICAgIG9uRXJyb3IodmFsdWUpO1xuICAgIH1cblxuICB9LCB3YWl0KTtcbn1cblxuZnVuY3Rpb24gZG9Tb21ldGhpbmdXaXRoQVByb21pc2UodmFsdWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkb1NvbWV0aGluZ0V2ZW50dWFsbHkodmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkb1NvbWV0aGluZ1VzaW5nQXN5bmModmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkb1NvbWV0aGluZ1dpdGhBUHJvbWlzZSh2YWx1ZSk7XG4gICAgcmV0dXJuIGZpbmlzaGVkKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGhhbmRsZUVycm9yKGVycm9yKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBkb011bHRpcGxlVGhpbmdzQXRUaGVTYW1lVGltZSh2YWx1ZXMpIHtcbiAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHZhbHVlcy5tYXAoKHZhbCkgPT4gZG9Tb21ldGhpbmdVc2luZ0FzeW5jKHZhbCkpLFxuICApO1xuICByZXR1cm4gcmVzdWx0cztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9NdWx0aXBsZVRoaW5nc09uZUF0QVRpbWUodmFsdWVzKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgZm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG4gICAgcmVzdWx0cy5wdXNoKGF3YWl0IGRvU29tZXRoaW5nVXNpbmdBc3luYyh2YWwpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9BbGxUaGVUaGluZ3MoKSB7XG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuXG4gIGNvbnNvbGUubG9nKCk7XG4gIGNvbnNvbGUubG9nKFwiU3RhcnRcIik7XG4gIGNvbnNvbGUubG9nKCk7XG5cbiAgYXdhaXQgYXN5bmNXYWl0Rm9yS2V5UHJlc3MoKTtcblxuICAvLyBSdW4gRG8gU29tZXRoaW5nIEV2ZW50dWFsbHkgdXNpbmcgY2FsbGJhY2tzXG4gIG91dHB1dCA9IGRvU29tZXRoaW5nRXZlbnR1YWxseSgnUnVuIFwiQ2FsbGJhY2tcIicsIGZpbmlzaGVkLCBoYW5kbGVFcnJvcik7XG4gIGNvbnNvbGUubG9nKCdSdW4gXCJDYWxsYmFja1wiJywgXCJSZXR1cm5zOlwiLCBvdXRwdXQpO1xuXG4gIGF3YWl0IGFzeW5jV2FpdEZvcktleVByZXNzKCk7XG5cbiAgLy8gUnVuIERvIFNvbWV0aGluZyBFdmVudHVhbGx5IHVzaW5nIGEgUHJvbWlzZVxuICAvLyBTaW5jZSB0aGlzIGlzIGEgUHJvbWlzZSwgeW91IGNvdWxkIHVzZSBhd2FpdCwgYnV0IHRoaXMgaXMgc2hvd2luZyBob3cgeW91IHdvdWxkIG5vcm1hbGx5IGhhbmRsZSBhIHByb21pc2VcbiAgb3V0cHV0ID0gZG9Tb21ldGhpbmdXaXRoQVByb21pc2UoJ1J1biBcIlByb21pc2VcIicpXG4gICAgLnRoZW4oZmluaXNoZWQpXG4gICAgLmNhdGNoKGhhbmRsZUVycm9yKTtcbiAgY29uc29sZS5sb2coJ1J1biBcIlByb21pc2VcIicsIFwiUmV0dXJuczpcIiwgb3V0cHV0KTtcblxuICBhd2FpdCBhc3luY1dhaXRGb3JLZXlQcmVzcygpO1xuXG4gIC8vIFJ1biBEbyBTb21ldGhpbmcgRXZlbnR1YWxseSB1c2luZyBBc3luYyAod2hpY2ggaXMgYSBQcm9taXNlIGJ1dCBhcHBlYXJzIHRvIGV4ZWN1dGUgc3luY2hyb25vdXNseSlcbiAgb3V0cHV0ID0gYXdhaXQgZG9Tb21ldGhpbmdVc2luZ0FzeW5jKCdSdW4gXCJBc3luY1wiJyk7XG4gIGNvbnNvbGUubG9nKCdSdW4gXCJBc3luY1wiJywgXCJSZXR1cm5zOlwiLCBvdXRwdXQpO1xuXG4gIGF3YWl0IGFzeW5jV2FpdEZvcktleVByZXNzKCk7XG5cbiAgLy8gUnVuIERvIFNvbWV0aGluZyBFdmVudHVhbGx5IGZvciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5IHdpdGhvdXQgd2FpdGluZyBmb3IgZWFjaCB0byBmaW5pc2ggYmVmb3JlIHN0YXJ0aW5nIHRoZSBuZXh0XG4gIG91dHB1dCA9IGF3YWl0IGRvTXVsdGlwbGVUaGluZ3NBdFRoZVNhbWVUaW1lKFsnUnVuIFwiUGFyYWxsZWxcIiAxJywgJ1J1biBcIlBhcmFsbGVsXCIgMicsICdSdW4gXCJQYXJhbGxlbFwiIDMnLCAnUnVuIFwiUGFyYWxsZWxcIiA0J10pO1xuICBjb25zb2xlLmxvZygnUnVuIFwiUGFyYWxsZWxcIicsIFwiUmV0dXJuczpcIiwgb3V0cHV0KTtcblxuICBhd2FpdCBhc3luY1dhaXRGb3JLZXlQcmVzcygpO1xuXG4gIC8vIFJ1biBEbyBTb21ldGhpbmcgRXZlbnR1YWxseSBmb3IgZWFjaCBpdGVtIGluIHRoZSBhcnJheSBidXQgZG9uJ3Qgc3RhcnQgdGhlIG5leHQgdW50aWwgZWFjaCBoYXMgZmluaXNoZWRcbiAgb3V0cHV0ID0gYXdhaXQgZG9NdWx0aXBsZVRoaW5nc09uZUF0QVRpbWUoWydSdW4gXCJTZXJpYWxcIiAxJywgJ1J1biBcIlNlcmlhbFwiIDInLCAnUnVuIFwiU2VyaWFsXCIgMycsICdSdW4gXCJTZXJpYWxcIiA0J10pO1xuICBjb25zb2xlLmxvZygnUnVuIFwiU2VyaWFsXCInLCBcIlJldHVybnM6XCIsIG91dHB1dCk7XG5cbiAgY29uc29sZS5sb2coKTtcbiAgY29uc29sZS5sb2coXCJEb25lXCIpO1xuICBjb25zb2xlLmxvZygpO1xuXG4gIHByb2Nlc3MuZXhpdCgwKTtcbn1cblxuZnVuY3Rpb24gYXN5bmNXYWl0Rm9yS2V5UHJlc3MoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiKFByZXNzIGFueSBrZXkgdG8gZG8gc3RhcnQgbmV4dCB0ZXN0KVwiKTtcblxuICAgIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG4gICAgcHJvY2Vzcy5zdGRpbi5vbihcImRhdGFcIiwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5kb0FsbFRoZVRoaW5ncygpO1xuIl19