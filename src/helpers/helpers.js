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
    Object.defineProperty(exports, "__esModule", { value: true });
    var node_logger_1 = require("node-logger");
    var chalk_1 = require("chalk");
    var stream = require("stream");
    var log = node_logger_1.createLog("Helpers");
    function wait(ms, fn) {
        var _this = this;
        log(chalk_1.default.green("Wait"), ms);
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
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                _loop_1(entry);
            }
        }
        return subData;
    }
    exports.flattenObject = flattenObject;
    function streamToBuffer(inStream) {
        log(chalk_1.default.yellow("Stream to Buffer"));
        if (!(inStream instanceof stream.PassThrough)) {
            log(chalk_1.default.red("Not a PassThrough stream"));
        }
        else {
            log(chalk_1.default.green("Is a PassThrough stream"));
        }
        if (!(inStream instanceof stream.Stream)) {
            log(chalk_1.default.red("Not a Stream stream"));
        }
        else {
            log(chalk_1.default.green("Is a Stream stream"));
        }
        if (!(inStream instanceof stream.Duplex)) {
            log(chalk_1.default.red("Not a Duplex stream"));
        }
        else {
            log(chalk_1.default.green("Is a Duplex stream"));
        }
        if (!(inStream instanceof stream.Writable)) {
            log(chalk_1.default.red("Not a Writable stream"));
        }
        else {
            log(chalk_1.default.green("Is a Writable stream"));
        }
        if (!(inStream instanceof stream.Readable)) {
            log(chalk_1.default.red("Not a Readable stream"));
        }
        else {
            log(chalk_1.default.green("Is a Readable stream"));
        }
        if (!(inStream instanceof stream.Transform)) {
            log(chalk_1.default.red("Not a Transform stream"));
        }
        else {
            log(chalk_1.default.green("Is a Transform stream"));
        }
        return new Promise(function (resolve, reject) {
            var buffers = [];
            inStream.on("error", function (err) { log(chalk_1.default.red("Error"), err); reject(err); });
            inStream.on("data", function (data) { log(chalk_1.default.yellow("Data"), data.length); buffers.push(data); });
            inStream.on("end", function () { log(chalk_1.default.green("End")); resolve(Buffer.concat(buffers)); });
        });
    }
    exports.streamToBuffer = streamToBuffer;
    function bufferToStream(buffer) {
        log(chalk_1.default.yellow("Buffer to Stream"));
        if (!(buffer instanceof Buffer)) {
            log(chalk_1.default.red("Not a Buffer"));
        }
        else {
            log(chalk_1.default.green("Is a Buffer"));
        }
        if (!(buffer instanceof Int8Array)) {
            log(chalk_1.default.red("Not a Int8Array"));
        }
        else {
            log(chalk_1.default.green("Is a Int8Array"));
        }
        if (!(buffer instanceof Uint8ClampedArray)) {
            log(chalk_1.default.red("Not a Uint8ClampedArray"));
        }
        else {
            log(chalk_1.default.green("Is a Uint8ClampedArray"));
        }
        if (!(buffer instanceof Uint8Array)) {
            log(chalk_1.default.red("Not a Uint8Array"));
        }
        else {
            log(chalk_1.default.green("Is a Uint8Array"));
        }
        if (!(buffer instanceof Uint16Array)) {
            log(chalk_1.default.red("Not a Uint16Array"));
        }
        else {
            log(chalk_1.default.green("Is a Uint16Array"));
        }
        if (!(buffer instanceof Uint32Array)) {
            log(chalk_1.default.red("Not a Uint32Array"));
        }
        else {
            log(chalk_1.default.green("Is a Uint32Array"));
        }
        if (!(buffer instanceof Float32Array)) {
            log(chalk_1.default.red("Not a Float32Array"));
        }
        else {
            log(chalk_1.default.green("Is a Float32Array"));
        }
        if (!(buffer instanceof Float64Array)) {
            log(chalk_1.default.red("Not a Float64Array"));
        }
        else {
            log(chalk_1.default.green("Is a Float64Array"));
        }
        var outStream = new stream.Duplex();
        outStream.push(buffer);
        outStream.push(null);
        return outStream;
    }
    exports.bufferToStream = bufferToStream;
});
