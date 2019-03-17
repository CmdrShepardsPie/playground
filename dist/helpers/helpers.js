// tslint:disable:max-classes-per-file
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        define(["require", "exports", "node-logger", "chalk", "stream"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var stream = require("stream");
    var log = node_logger_1.createLog("Helpers");
    function wait(ms, fn) {
        var _this = this;
        log(chalk_1["default"].green("Wait"), ms);
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, e_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            _a = resolve;
                            _b = fn;
                            if (!_b) return [3 /*break*/, 2];
                            return [4 /*yield*/, fn()];
                        case 1:
                            _b = (_c.sent());
                            _c.label = 2;
                        case 2:
                            _a.apply(void 0, [_b]);
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _c.sent();
                            reject(e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }, ms);
        });
    }
    exports.wait = wait;
    function stringToNumber(str) {
        var nonNumber = /[^0-9.]*/gi;
        var decimal = /\./gi;
        var fixed = str.replace(nonNumber, "");
        var num = decimal.test(fixed) ? parseFloat(fixed) : parseInt(fixed, 10);
        if (!isNaN(num)) {
            return num;
        }
        return str;
    }
    exports.stringToNumber = stringToNumber;
    function numberToString(num, major, minor) {
        var str = num.toString();
        var split = str.split(".");
        if (major !== undefined) {
            if (split[0] === undefined) {
                split[0] = "0";
            }
            while (split[0].length < major) {
                split[0] = "0" + split[0];
            }
            str = split.join(".");
        }
        if (minor !== undefined) {
            if (split[1] === undefined) {
                split[1] = "0";
            }
            while (split[1].length < minor) {
                split[1] = split[1] + "0";
            }
            str = split.join(".");
        }
        return str;
    }
    exports.numberToString = numberToString;
    // @AlwaysThis is kinda broken as it turns out
    // WARNING: AlwaysThis modifies the object prototype which can cause problems
    // tslint:disable-next-line:ban-types
    // export function AlwaysThis<T extends Function>(construconstructor: T): T;
    // export function AlwaysThis<T extends { new (...args: any[]): {} }>(
    //   constructor: T,
    // ) {
    //   let self: any;
    //   const wrapper = class extends constructor {
    //     constructor(...args: any[]) {
    //       super(...args);
    //       self = this;
    //       // console.log("AlwaysThis", "constructor", constructor.name, self);
    //     }
    //   };
    //   const prototype = constructor.prototype;
    //   const descriptors = Object.getOwnPropertyDescriptors(prototype);
    //   Object.keys(descriptors).forEach((key) => {
    //     const descriptor = descriptors[key];
    //     if (typeof descriptor.value === "function" && key !== "constructor" && key !== "prototype") {
    //       // console.log("AlwaysThis", "function", constructor.name, key, self);
    //       const originalFunction = descriptor.value;
    //       // tslint:disable-next-line:only-arrow-functions
    //       descriptor.value = function() {
    //         // console.log("AlwaysThis", "call", constructor.name, key, self);
    //         return originalFunction.apply(self, arguments);
    //       };
    //       Object.defineProperty(wrapper.prototype, key, descriptor);
    //     }
    //   });
    //   // console.log("ApplyThis", "wrapper", wrapper, "prototype", wrapper.prototype);
    //   return wrapper;
    // }
    function buildTemplateString(template, params) {
        var parsedTemplate = template;
        var tempRegex = /\{([^}]*)\}/gi;
        var match = tempRegex.exec(template);
        while (match) {
            var rawVal = params[match[1]];
            if (rawVal !== undefined) {
                var parsedVal = buildTemplateString(rawVal, params);
                parsedTemplate = parsedTemplate.replace(new RegExp(match[0], "gi"), parsedVal);
            }
            match = tempRegex.exec(template);
        }
        return parsedTemplate;
    }
    exports.buildTemplateString = buildTemplateString;
    function numberBounds(current, min, max) {
        return Math.max(min, Math.min(max, current));
    }
    exports.numberBounds = numberBounds;
    function stringKeys(inValue) {
        return inValue;
    }
    exports.stringKeys = stringKeys;
    function getPrototypeStack(constructor) {
        var prototypes = [];
        var prototype = constructor;
        while (prototype) {
            prototypes.push(prototype);
            prototype = prototype.prototype;
        }
        return prototypes;
    }
    exports.getPrototypeStack = getPrototypeStack;
    function bufferOrJson(data) {
        return data instanceof Buffer ? data : JSON.stringify(data, null, 2);
    }
    exports.bufferOrJson = bufferOrJson;
    function messageToJSON(message) {
        var data = message;
        if (typeof message === "string") {
            try {
                data = JSON.parse(message);
            }
            catch (e) {
                console.log("could not parseHRL message as JSON");
            }
        }
        return data;
    }
    exports.messageToJSON = messageToJSON;
    function flattenObject(data) {
        var e_2, _a;
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            return data;
        }
        var subData = __assign({}, data);
        var loop = true;
        while (loop) {
            loop = false;
            var entries = Object.entries(subData);
            var _loop_1 = function (entry) {
                var key = entry[0];
                var value = entry[1];
                if (typeof value === "object" && !Array.isArray(value)) {
                    delete subData[key];
                    var valueWithKeynames_1 = {};
                    Object.entries(value).forEach(function (subEntry) {
                        valueWithKeynames_1[key + "." + subEntry[0]] = subEntry[1];
                    });
                    subData = __assign({}, subData, valueWithKeynames_1);
                    loop = true;
                }
            };
            try {
                for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                    var entry = entries_1_1.value;
                    _loop_1(entry);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1["return"])) _a.call(entries_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return subData;
    }
    exports.flattenObject = flattenObject;
    function streamToBuffer(inStream) {
        log(chalk_1["default"].yellow("Stream to Buffer"));
        if (!(inStream instanceof stream.PassThrough)) {
            log(chalk_1["default"].red("Not a PassThrough stream"));
        }
        else {
            log(chalk_1["default"].green("Is a PassThrough stream"));
        }
        if (!(inStream instanceof stream.Stream)) {
            log(chalk_1["default"].red("Not a Stream stream"));
        }
        else {
            log(chalk_1["default"].green("Is a Stream stream"));
        }
        if (!(inStream instanceof stream.Duplex)) {
            log(chalk_1["default"].red("Not a Duplex stream"));
        }
        else {
            log(chalk_1["default"].green("Is a Duplex stream"));
        }
        if (!(inStream instanceof stream.Writable)) {
            log(chalk_1["default"].red("Not a Writable stream"));
        }
        else {
            log(chalk_1["default"].green("Is a Writable stream"));
        }
        if (!(inStream instanceof stream.Readable)) {
            log(chalk_1["default"].red("Not a Readable stream"));
        }
        else {
            log(chalk_1["default"].green("Is a Readable stream"));
        }
        if (!(inStream instanceof stream.Transform)) {
            log(chalk_1["default"].red("Not a Transform stream"));
        }
        else {
            log(chalk_1["default"].green("Is a Transform stream"));
        }
        return new Promise(function (resolve, reject) {
            var buffers = [];
            inStream.on("error", function (err) { log(chalk_1["default"].red("Error"), err); reject(err); });
            inStream.on("data", function (data) { log(chalk_1["default"].yellow("Data"), data.length); buffers.push(data); });
            inStream.on("end", function () { log(chalk_1["default"].green("End")); resolve(Buffer.concat(buffers)); });
        });
    }
    exports.streamToBuffer = streamToBuffer;
    function bufferToStream(buffer) {
        log(chalk_1["default"].yellow("Buffer to Stream"));
        if (!(buffer instanceof Buffer)) {
            log(chalk_1["default"].red("Not a Buffer"));
        }
        else {
            log(chalk_1["default"].green("Is a Buffer"));
        }
        if (!(buffer instanceof Int8Array)) {
            log(chalk_1["default"].red("Not a Int8Array"));
        }
        else {
            log(chalk_1["default"].green("Is a Int8Array"));
        }
        if (!(buffer instanceof Uint8ClampedArray)) {
            log(chalk_1["default"].red("Not a Uint8ClampedArray"));
        }
        else {
            log(chalk_1["default"].green("Is a Uint8ClampedArray"));
        }
        if (!(buffer instanceof Uint8Array)) {
            log(chalk_1["default"].red("Not a Uint8Array"));
        }
        else {
            log(chalk_1["default"].green("Is a Uint8Array"));
        }
        if (!(buffer instanceof Uint16Array)) {
            log(chalk_1["default"].red("Not a Uint16Array"));
        }
        else {
            log(chalk_1["default"].green("Is a Uint16Array"));
        }
        if (!(buffer instanceof Uint32Array)) {
            log(chalk_1["default"].red("Not a Uint32Array"));
        }
        else {
            log(chalk_1["default"].green("Is a Uint32Array"));
        }
        if (!(buffer instanceof Float32Array)) {
            log(chalk_1["default"].red("Not a Float32Array"));
        }
        else {
            log(chalk_1["default"].green("Is a Float32Array"));
        }
        if (!(buffer instanceof Float64Array)) {
            log(chalk_1["default"].red("Not a Float64Array"));
        }
        else {
            log(chalk_1["default"].green("Is a Float64Array"));
        }
        var outStream = new stream.Duplex();
        outStream.push(buffer);
        outStream.push(null);
        return outStream;
    }
    exports.bufferToStream = bufferToStream;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQXNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUV0QywyQ0FBc0M7SUFDdEMsK0JBQTBCO0lBQzFCLCtCQUFpQztJQUVqQyxJQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWpDLFNBQWdCLElBQUksQ0FBQyxFQUFVLEVBQUUsRUFBUTtRQUF6QyxpQkFXQztRQVZDLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsVUFBVSxDQUFDOzs7Ozs7NEJBRVAsS0FBQSxPQUFPLENBQUE7NEJBQUMsS0FBQSxFQUFFLENBQUE7cUNBQUYsd0JBQUU7NEJBQUsscUJBQU0sRUFBRSxFQUFFLEVBQUE7OzRCQUFYLEtBQUEsQ0FBQyxTQUFVLENBQUMsQ0FBQTs7OzRCQUExQixzQkFBMkIsQ0FBQzs7Ozs0QkFFNUIsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDOzs7OztpQkFFYixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBWEQsb0JBV0M7SUFFRCxTQUFnQixjQUFjLENBQUMsR0FBVztRQUN4QyxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFDL0IsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQVRELHdDQVNDO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEdBQVcsRUFBRSxLQUFjLEVBQUUsS0FBYztRQUN4RSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDOUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFDRCxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDaEI7WUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFO2dCQUM5QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMzQjtZQUNELEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBdEJELHdDQXNCQztJQUNELDhDQUE4QztJQUM5Qyw2RUFBNkU7SUFDN0UscUNBQXFDO0lBQ3JDLDRFQUE0RTtJQUM1RSxzRUFBc0U7SUFDdEUsb0JBQW9CO0lBQ3BCLE1BQU07SUFDTixtQkFBbUI7SUFDbkIsZ0RBQWdEO0lBQ2hELG9DQUFvQztJQUNwQyx3QkFBd0I7SUFDeEIscUJBQXFCO0lBQ3JCLDZFQUE2RTtJQUM3RSxRQUFRO0lBQ1IsT0FBTztJQUVQLDZDQUE2QztJQUM3QyxxRUFBcUU7SUFDckUsZ0RBQWdEO0lBQ2hELDJDQUEyQztJQUMzQyxvR0FBb0c7SUFDcEcsK0VBQStFO0lBQy9FLG1EQUFtRDtJQUNuRCx5REFBeUQ7SUFDekQsd0NBQXdDO0lBQ3hDLDZFQUE2RTtJQUM3RSwwREFBMEQ7SUFDMUQsV0FBVztJQUNYLG1FQUFtRTtJQUNuRSxRQUFRO0lBQ1IsUUFBUTtJQUNSLHFGQUFxRjtJQUVyRixvQkFBb0I7SUFDcEIsSUFBSTtJQUVKLFNBQWdCLG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsTUFBVztRQUMvRCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLEVBQUU7WUFDWixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixJQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUNyQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQzFCLFNBQVMsQ0FDVixDQUFDO2FBQ0g7WUFDRCxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFoQkQsa0RBZ0JDO0lBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQWUsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUNwRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUZELG9DQUVDO0lBVUQsU0FBZ0IsVUFBVSxDQUFJLE9BQVU7UUFDdEMsT0FBTyxPQUErQyxDQUFDO0lBQ3pELENBQUM7SUFGRCxnQ0FFQztJQUlELFNBQWdCLGlCQUFpQixDQUMvQixXQUFjO1FBRWQsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQztRQUM1QixPQUFPLFNBQVMsRUFBRTtZQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFFcEIsQ0FBQztJQVhELDhDQVdDO0lBRUQsU0FBZ0IsWUFBWSxDQUFDLElBQXFCO1FBQ2hELE9BQU8sSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZELG9DQUVDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLE9BQVk7UUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUk7Z0JBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7YUFDbkQ7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBRWQsQ0FBQztJQVhELHNDQVdDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLElBQXNCOztRQUNsRCxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLE9BQU8sZ0JBQXlCLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixPQUFPLElBQUksRUFBRTtZQUNYLElBQUksR0FBRyxLQUFLLENBQUM7WUFDYixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUM3QixLQUFLO2dCQUNkLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3RELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixJQUFNLG1CQUFpQixHQUFRLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO3dCQUNyQyxtQkFBaUIsQ0FBSSxHQUFHLFNBQUksUUFBUSxDQUFDLENBQUMsQ0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLGdCQUFPLE9BQU8sRUFBSyxtQkFBaUIsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLEdBQUcsSUFBSSxDQUFDO2lCQUNiOzs7Z0JBWEgsS0FBb0IsSUFBQSxZQUFBLFNBQUEsT0FBTyxDQUFBLGdDQUFBO29CQUF0QixJQUFNLEtBQUssb0JBQUE7NEJBQUwsS0FBSztpQkFZZjs7Ozs7Ozs7O1NBQ0Y7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBeEJELHNDQXdCQztJQUVELFNBQWdCLGNBQWMsQ0FBQyxRQUFnQjtRQUM3QyxHQUFHLENBQUMsa0JBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDN0MsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEMsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEMsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUMsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUMsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDM0MsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxJQUFNLE9BQU8sR0FBaUIsRUFBRSxDQUFDO1lBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBRyxJQUFPLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsSUFBSSxJQUFPLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0YsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsY0FBUSxHQUFHLENBQUMsa0JBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF0Q0Qsd0NBc0NDO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLE1BQWM7UUFDM0MsR0FBRyxDQUFDLGtCQUFLLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksTUFBTSxDQUFDLEVBQUU7WUFDL0IsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLFNBQVMsQ0FBQyxFQUFFO1lBQ2xDLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksaUJBQWlCLENBQUMsRUFBRTtZQUMxQyxHQUFHLENBQUMsa0JBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxHQUFHLENBQUMsa0JBQUssQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLFVBQVUsQ0FBQyxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksV0FBVyxDQUFDLEVBQUU7WUFDcEMsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxXQUFXLENBQUMsRUFBRTtZQUNwQyxHQUFHLENBQUMsa0JBQUssQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxHQUFHLENBQUMsa0JBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLFlBQVksQ0FBQyxFQUFFO1lBQ3JDLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksWUFBWSxDQUFDLEVBQUU7WUFDckMsR0FBRyxDQUFDLGtCQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELElBQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBOUNELHdDQThDQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlXG5cbmltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwibm9kZS1sb2dnZXJcIjtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCAqIGFzIHN0cmVhbSBmcm9tIFwic3RyZWFtXCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkhlbHBlcnNcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0KG1zOiBudW1iZXIsIGZuPzogYW55KSB7XG4gIGxvZyhjaGFsay5ncmVlbihcIldhaXRcIiksIG1zKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmUoZm4gJiYgKGF3YWl0IGZuKCkpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH0sIG1zKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb051bWJlcihzdHI6IHN0cmluZykge1xuICBjb25zdCBub25OdW1iZXIgPSAvW14wLTkuXSovZ2k7XG4gIGNvbnN0IGRlY2ltYWwgPSAvXFwuL2dpO1xuICBjb25zdCBmaXhlZCA9IHN0ci5yZXBsYWNlKG5vbk51bWJlciwgXCJcIik7XG4gIGNvbnN0IG51bSA9IGRlY2ltYWwudGVzdChmaXhlZCkgPyBwYXJzZUZsb2F0KGZpeGVkKSA6IHBhcnNlSW50KGZpeGVkLCAxMCk7XG4gIGlmICghaXNOYU4obnVtKSkge1xuICAgIHJldHVybiBudW07XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlclRvU3RyaW5nKG51bTogbnVtYmVyLCBtYWpvcj86IG51bWJlciwgbWlub3I/OiBudW1iZXIpIHtcbiAgbGV0IHN0ciA9IG51bS50b1N0cmluZygpO1xuICBjb25zdCBzcGxpdCA9IHN0ci5zcGxpdChcIi5cIik7XG4gIGlmIChtYWpvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHNwbGl0WzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNwbGl0WzBdID0gXCIwXCI7XG4gICAgfVxuICAgIHdoaWxlIChzcGxpdFswXS5sZW5ndGggPCBtYWpvcikge1xuICAgICAgc3BsaXRbMF0gPSBcIjBcIiArIHNwbGl0WzBdO1xuICAgIH1cbiAgICBzdHIgPSBzcGxpdC5qb2luKFwiLlwiKTtcbiAgfVxuICBpZiAobWlub3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChzcGxpdFsxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzcGxpdFsxXSA9IFwiMFwiO1xuICAgIH1cbiAgICB3aGlsZSAoc3BsaXRbMV0ubGVuZ3RoIDwgbWlub3IpIHtcbiAgICAgIHNwbGl0WzFdID0gc3BsaXRbMV0gKyBcIjBcIjtcbiAgICB9XG4gICAgc3RyID0gc3BsaXQuam9pbihcIi5cIik7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cbi8vIEBBbHdheXNUaGlzIGlzIGtpbmRhIGJyb2tlbiBhcyBpdCB0dXJucyBvdXRcbi8vIFdBUk5JTkc6IEFsd2F5c1RoaXMgbW9kaWZpZXMgdGhlIG9iamVjdCBwcm90b3R5cGUgd2hpY2ggY2FuIGNhdXNlIHByb2JsZW1zXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG4vLyBleHBvcnQgZnVuY3Rpb24gQWx3YXlzVGhpczxUIGV4dGVuZHMgRnVuY3Rpb24+KGNvbnN0cnVjb25zdHJ1Y3RvcjogVCk6IFQ7XG4vLyBleHBvcnQgZnVuY3Rpb24gQWx3YXlzVGhpczxUIGV4dGVuZHMgeyBuZXcgKC4uLmFyZ3M6IGFueVtdKToge30gfT4oXG4vLyAgIGNvbnN0cnVjdG9yOiBULFxuLy8gKSB7XG4vLyAgIGxldCBzZWxmOiBhbnk7XG4vLyAgIGNvbnN0IHdyYXBwZXIgPSBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbi8vICAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuLy8gICAgICAgc3VwZXIoLi4uYXJncyk7XG4vLyAgICAgICBzZWxmID0gdGhpcztcbi8vICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWx3YXlzVGhpc1wiLCBcImNvbnN0cnVjdG9yXCIsIGNvbnN0cnVjdG9yLm5hbWUsIHNlbGYpO1xuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICBjb25zdCBwcm90b3R5cGUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4vLyAgIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMocHJvdG90eXBlKTtcbi8vICAgT2JqZWN0LmtleXMoZGVzY3JpcHRvcnMpLmZvckVhY2goKGtleSkgPT4ge1xuLy8gICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9yc1trZXldO1xuLy8gICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gXCJmdW5jdGlvblwiICYmIGtleSAhPT0gXCJjb25zdHJ1Y3RvclwiICYmIGtleSAhPT0gXCJwcm90b3R5cGVcIikge1xuLy8gICAgICAgLy8gY29uc29sZS5sb2coXCJBbHdheXNUaGlzXCIsIFwiZnVuY3Rpb25cIiwgY29uc3RydWN0b3IubmFtZSwga2V5LCBzZWxmKTtcbi8vICAgICAgIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuLy8gICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm9ubHktYXJyb3ctZnVuY3Rpb25zXG4vLyAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQWx3YXlzVGhpc1wiLCBcImNhbGxcIiwgY29uc3RydWN0b3IubmFtZSwga2V5LCBzZWxmKTtcbi8vICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRnVuY3Rpb24uYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbi8vICAgICAgIH07XG4vLyAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod3JhcHBlci5wcm90b3R5cGUsIGtleSwgZGVzY3JpcHRvcik7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vICAgLy8gY29uc29sZS5sb2coXCJBcHBseVRoaXNcIiwgXCJ3cmFwcGVyXCIsIHdyYXBwZXIsIFwicHJvdG90eXBlXCIsIHdyYXBwZXIucHJvdG90eXBlKTtcblxuLy8gICByZXR1cm4gd3JhcHBlcjtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGVTdHJpbmcodGVtcGxhdGU6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgbGV0IHBhcnNlZFRlbXBsYXRlID0gdGVtcGxhdGU7XG4gIGNvbnN0IHRlbXBSZWdleCA9IC9cXHsoW159XSopXFx9L2dpO1xuICBsZXQgbWF0Y2ggPSB0ZW1wUmVnZXguZXhlYyh0ZW1wbGF0ZSk7XG4gIHdoaWxlIChtYXRjaCkge1xuICAgIGNvbnN0IHJhd1ZhbCA9IHBhcmFtc1ttYXRjaFsxXV07XG4gICAgaWYgKHJhd1ZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBwYXJzZWRWYWwgPSBidWlsZFRlbXBsYXRlU3RyaW5nKHJhd1ZhbCwgcGFyYW1zKTtcbiAgICAgIHBhcnNlZFRlbXBsYXRlID0gcGFyc2VkVGVtcGxhdGUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChtYXRjaFswXSwgXCJnaVwiKSxcbiAgICAgICAgcGFyc2VkVmFsLFxuICAgICAgKTtcbiAgICB9XG4gICAgbWF0Y2ggPSB0ZW1wUmVnZXguZXhlYyh0ZW1wbGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZFRlbXBsYXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyQm91bmRzKGN1cnJlbnQ6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgY3VycmVudCkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTdHJpbmdLZXlzPFA+IHtcbiAgW2luZGV4OiBzdHJpbmddOiBQO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElOdW1iZXJLZXlzPFA+IHtcbiAgW2luZGV4OiBudW1iZXJdOiBQO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nS2V5czxUPihpblZhbHVlOiBUKSB7XG4gIHJldHVybiBpblZhbHVlIGFzIHR5cGVvZiBpblZhbHVlICYgSVN0cmluZ0tleXM8bnVtYmVyPjtcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvdHlwZVN0YWNrPFQgZXh0ZW5kcyBGdW5jdGlvbj4oY29uc3RydWN0b3I6IFQpOiBUW107XG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG90eXBlU3RhY2s8VCBleHRlbmRzIHsgbmV3KC4uLmFyZ3M6IGFueVtdKToge30gfT4oXG4gIGNvbnN0cnVjdG9yOiBULFxuKTogVFtdIHtcbiAgY29uc3QgcHJvdG90eXBlcyA9IFtdO1xuICBsZXQgcHJvdG90eXBlID0gY29uc3RydWN0b3I7XG4gIHdoaWxlIChwcm90b3R5cGUpIHtcbiAgICBwcm90b3R5cGVzLnB1c2gocHJvdG90eXBlKTtcbiAgICBwcm90b3R5cGUgPSBwcm90b3R5cGUucHJvdG90eXBlO1xuICB9XG4gIHJldHVybiBwcm90b3R5cGVzO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJPckpzb24oZGF0YTogQnVmZmVyIHwgb2JqZWN0KTogQnVmZmVyIHwgc3RyaW5nIHtcbiAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBCdWZmZXIgPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNzYWdlVG9KU09OKG1lc3NhZ2U6IGFueSkge1xuICBsZXQgZGF0YSA9IG1lc3NhZ2U7XG4gIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvdWxkIG5vdCBwYXJzZUhSTCBtZXNzYWdlIGFzIEpTT05cIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KGRhdGE6IElTdHJpbmdLZXlzPGFueT4pIHtcbiAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuICBsZXQgc3ViRGF0YTogSVN0cmluZ0tleXM8YW55PiA9IHsuLi5kYXRhfTtcbiAgbGV0IGxvb3AgPSB0cnVlO1xuICB3aGlsZSAobG9vcCkge1xuICAgIGxvb3AgPSBmYWxzZTtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc3ViRGF0YSk7XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBjb25zdCBrZXkgPSBlbnRyeVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbMV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBkZWxldGUgc3ViRGF0YVtrZXldO1xuICAgICAgICBjb25zdCB2YWx1ZVdpdGhLZXluYW1lczogYW55ID0ge307XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChzdWJFbnRyeSkgPT4ge1xuICAgICAgICAgIHZhbHVlV2l0aEtleW5hbWVzW2Ake2tleX0uJHtzdWJFbnRyeVswXX1gXSA9IHN1YkVudHJ5WzFdO1xuICAgICAgICB9KTtcbiAgICAgICAgc3ViRGF0YSA9IHsuLi5zdWJEYXRhLCAuLi52YWx1ZVdpdGhLZXluYW1lc307XG4gICAgICAgIGxvb3AgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3ViRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVhbVRvQnVmZmVyKGluU3RyZWFtOiBzdHJlYW0pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBsb2coY2hhbGsueWVsbG93KFwiU3RyZWFtIHRvIEJ1ZmZlclwiKSk7XG4gIGlmICghKGluU3RyZWFtIGluc3RhbmNlb2Ygc3RyZWFtLlBhc3NUaHJvdWdoKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBQYXNzVGhyb3VnaCBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgUGFzc1Rocm91Z2ggc3RyZWFtXCIpKTtcbiAgfVxuICBpZiAoIShpblN0cmVhbSBpbnN0YW5jZW9mIHN0cmVhbS5TdHJlYW0pKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFN0cmVhbSBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgU3RyZWFtIHN0cmVhbVwiKSk7XG4gIH1cbiAgaWYgKCEoaW5TdHJlYW0gaW5zdGFuY2VvZiBzdHJlYW0uRHVwbGV4KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBEdXBsZXggc3RyZWFtXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIER1cGxleCBzdHJlYW1cIikpO1xuICB9XG4gIGlmICghKGluU3RyZWFtIGluc3RhbmNlb2Ygc3RyZWFtLldyaXRhYmxlKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBXcml0YWJsZSBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgV3JpdGFibGUgc3RyZWFtXCIpKTtcbiAgfVxuICBpZiAoIShpblN0cmVhbSBpbnN0YW5jZW9mIHN0cmVhbS5SZWFkYWJsZSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgUmVhZGFibGUgc3RyZWFtXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFJlYWRhYmxlIHN0cmVhbVwiKSk7XG4gIH1cbiAgaWYgKCEoaW5TdHJlYW0gaW5zdGFuY2VvZiBzdHJlYW0uVHJhbnNmb3JtKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBUcmFuc2Zvcm0gc3RyZWFtXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFRyYW5zZm9ybSBzdHJlYW1cIikpO1xuICB9XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgYnVmZmVyczogVWludDhBcnJheVtdID0gW107XG4gICAgaW5TdHJlYW0ub24oXCJlcnJvclwiLCAoZXJyKSA9PiB7IGxvZyhjaGFsay5yZWQoXCJFcnJvclwiKSwgZXJyKTsgcmVqZWN0KGVycik7IH0pO1xuICAgIGluU3RyZWFtLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4geyBsb2coY2hhbGsueWVsbG93KFwiRGF0YVwiKSwgZGF0YS5sZW5ndGgpOyBidWZmZXJzLnB1c2goZGF0YSk7IH0pO1xuICAgIGluU3RyZWFtLm9uKFwiZW5kXCIsICgpID0+IHsgbG9nKGNoYWxrLmdyZWVuKFwiRW5kXCIpKTsgcmVzb2x2ZShCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpKTsgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyVG9TdHJlYW0oYnVmZmVyOiBCdWZmZXIpIHtcbiAgbG9nKGNoYWxrLnllbGxvdyhcIkJ1ZmZlciB0byBTdHJlYW1cIikpO1xuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIEJ1ZmZlclwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBCdWZmZXJcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIEludDhBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgSW50OEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIEludDhBcnJheVwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFVpbnQ4Q2xhbXBlZEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQ4Q2xhbXBlZEFycmF5XCIpKTtcbiAgfVxuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBVaW50OEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQ4QXJyYXlcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQxNkFycmF5KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBVaW50MTZBcnJheVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBVaW50MTZBcnJheVwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgVWludDMyQXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFVpbnQzMkFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQzMkFycmF5XCIpKTtcbiAgfVxuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIEZsb2F0MzJBcnJheVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBGbG9hdDMyQXJyYXlcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgRmxvYXQ2NEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIEZsb2F0NjRBcnJheVwiKSk7XG4gIH1cbiAgY29uc3Qgb3V0U3RyZWFtID0gbmV3IHN0cmVhbS5EdXBsZXgoKTtcbiAgb3V0U3RyZWFtLnB1c2goYnVmZmVyKTtcbiAgb3V0U3RyZWFtLnB1c2gobnVsbCk7XG4gIHJldHVybiBvdXRTdHJlYW07XG59XG4iXX0=