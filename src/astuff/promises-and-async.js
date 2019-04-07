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
        var results, _i, values_1, val, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    results = [];
                    _i = 0, values_1 = values;
                    _c.label = 1;
                case 1:
                    if (!(_i < values_1.length)) return [3 /*break*/, 4];
                    val = values_1[_i];
                    _b = (_a = results).push;
                    return [4 /*yield*/, doSomethingUsingAsync(val)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
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
