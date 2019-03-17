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
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                }
                finally { if (e_2) throw e_2.error; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQXNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUV0QywyQ0FBc0M7SUFDdEMsK0JBQTBCO0lBQzFCLCtCQUFpQztJQUVqQyxJQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWpDLFNBQWdCLElBQUksQ0FBQyxFQUFVLEVBQUUsRUFBUTtRQUF6QyxpQkFXQztRQVZDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxVQUFVLENBQUM7Ozs7Ozs0QkFFUCxLQUFBLE9BQU8sQ0FBQTs0QkFBQyxLQUFBLEVBQUUsQ0FBQTtxQ0FBRix3QkFBRTs0QkFBSyxxQkFBTSxFQUFFLEVBQUUsRUFBQTs7NEJBQVgsS0FBQSxDQUFDLFNBQVUsQ0FBQyxDQUFBOzs7NEJBQTFCLHNCQUEyQixDQUFDOzs7OzRCQUU1QixNQUFNLENBQUMsR0FBQyxDQUFDLENBQUM7Ozs7O2lCQUViLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFYRCxvQkFXQztJQUVELFNBQWdCLGNBQWMsQ0FBQyxHQUFXO1FBQ3hDLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQztRQUMvQixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFL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dEMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUE5Q0Qsd0NBOENDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcblxuaW1wb3J0IHtjcmVhdGVMb2d9IGZyb20gXCJub2RlLWxvZ2dlclwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0ICogYXMgc3RyZWFtIGZyb20gXCJzdHJlYW1cIjtcblxuY29uc3QgbG9nID0gY3JlYXRlTG9nKFwiSGVscGVyc1wiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXQobXM6IG51bWJlciwgZm4/OiBhbnkpIHtcbiAgbG9nKGNoYWxrLmdyZWVuKFwiV2FpdFwiKSwgbXMpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzb2x2ZShmbiAmJiAoYXdhaXQgZm4oKSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfSwgbXMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvTnVtYmVyKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IG5vbk51bWJlciA9IC9bXjAtOS5dKi9naTtcbiAgY29uc3QgZGVjaW1hbCA9IC9cXC4vZ2k7XG4gIGNvbnN0IGZpeGVkID0gc3RyLnJlcGxhY2Uobm9uTnVtYmVyLCBcIlwiKTtcbiAgY29uc3QgbnVtID0gZGVjaW1hbC50ZXN0KGZpeGVkKSA/IHBhcnNlRmxvYXQoZml4ZWQpIDogcGFyc2VJbnQoZml4ZWQsIDEwKTtcbiAgaWYgKCFpc05hTihudW0pKSB7XG4gICAgcmV0dXJuIG51bTtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyVG9TdHJpbmcobnVtOiBudW1iZXIsIG1ham9yPzogbnVtYmVyLCBtaW5vcj86IG51bWJlcikge1xuICBsZXQgc3RyID0gbnVtLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHNwbGl0ID0gc3RyLnNwbGl0KFwiLlwiKTtcbiAgaWYgKG1ham9yICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoc3BsaXRbMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgc3BsaXRbMF0gPSBcIjBcIjtcbiAgICB9XG4gICAgd2hpbGUgKHNwbGl0WzBdLmxlbmd0aCA8IG1ham9yKSB7XG4gICAgICBzcGxpdFswXSA9IFwiMFwiICsgc3BsaXRbMF07XG4gICAgfVxuICAgIHN0ciA9IHNwbGl0LmpvaW4oXCIuXCIpO1xuICB9XG4gIGlmIChtaW5vciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHNwbGl0WzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNwbGl0WzFdID0gXCIwXCI7XG4gICAgfVxuICAgIHdoaWxlIChzcGxpdFsxXS5sZW5ndGggPCBtaW5vcikge1xuICAgICAgc3BsaXRbMV0gPSBzcGxpdFsxXSArIFwiMFwiO1xuICAgIH1cbiAgICBzdHIgPSBzcGxpdC5qb2luKFwiLlwiKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufVxuLy8gQEFsd2F5c1RoaXMgaXMga2luZGEgYnJva2VuIGFzIGl0IHR1cm5zIG91dFxuLy8gV0FSTklORzogQWx3YXlzVGhpcyBtb2RpZmllcyB0aGUgb2JqZWN0IHByb3RvdHlwZSB3aGljaCBjYW4gY2F1c2UgcHJvYmxlbXNcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbi8vIGV4cG9ydCBmdW5jdGlvbiBBbHdheXNUaGlzPFQgZXh0ZW5kcyBGdW5jdGlvbj4oY29uc3RydWNvbnN0cnVjdG9yOiBUKTogVDtcbi8vIGV4cG9ydCBmdW5jdGlvbiBBbHdheXNUaGlzPFQgZXh0ZW5kcyB7IG5ldyAoLi4uYXJnczogYW55W10pOiB7fSB9Pihcbi8vICAgY29uc3RydWN0b3I6IFQsXG4vLyApIHtcbi8vICAgbGV0IHNlbGY6IGFueTtcbi8vICAgY29uc3Qgd3JhcHBlciA9IGNsYXNzIGV4dGVuZHMgY29uc3RydWN0b3Ige1xuLy8gICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4vLyAgICAgICBzdXBlciguLi5hcmdzKTtcbi8vICAgICAgIHNlbGYgPSB0aGlzO1xuLy8gICAgICAgLy8gY29uc29sZS5sb2coXCJBbHdheXNUaGlzXCIsIFwiY29uc3RydWN0b3JcIiwgY29uc3RydWN0b3IubmFtZSwgc2VsZik7XG4vLyAgICAgfVxuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbi8vICAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhwcm90b3R5cGUpO1xuLy8gICBPYmplY3Qua2V5cyhkZXNjcmlwdG9ycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4vLyAgICAgY29uc3QgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JzW2tleV07XG4vLyAgICAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiYga2V5ICE9PSBcImNvbnN0cnVjdG9yXCIgJiYga2V5ICE9PSBcInByb3RvdHlwZVwiKSB7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFsd2F5c1RoaXNcIiwgXCJmdW5jdGlvblwiLCBjb25zdHJ1Y3Rvci5uYW1lLCBrZXksIHNlbGYpO1xuLy8gICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4vLyAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b25seS1hcnJvdy1mdW5jdGlvbnNcbi8vICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBbHdheXNUaGlzXCIsIFwiY2FsbFwiLCBjb25zdHJ1Y3Rvci5uYW1lLCBrZXksIHNlbGYpO1xuLy8gICAgICAgICByZXR1cm4gb3JpZ2luYWxGdW5jdGlvbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuLy8gICAgICAgfTtcbi8vICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3cmFwcGVyLnByb3RvdHlwZSwga2V5LCBkZXNjcmlwdG9yKTtcbi8vICAgICB9XG4vLyAgIH0pO1xuLy8gICAvLyBjb25zb2xlLmxvZyhcIkFwcGx5VGhpc1wiLCBcIndyYXBwZXJcIiwgd3JhcHBlciwgXCJwcm90b3R5cGVcIiwgd3JhcHBlci5wcm90b3R5cGUpO1xuXG4vLyAgIHJldHVybiB3cmFwcGVyO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZVN0cmluZyh0ZW1wbGF0ZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICBsZXQgcGFyc2VkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgY29uc3QgdGVtcFJlZ2V4ID0gL1xceyhbXn1dKilcXH0vZ2k7XG4gIGxldCBtYXRjaCA9IHRlbXBSZWdleC5leGVjKHRlbXBsYXRlKTtcbiAgd2hpbGUgKG1hdGNoKSB7XG4gICAgY29uc3QgcmF3VmFsID0gcGFyYW1zW21hdGNoWzFdXTtcbiAgICBpZiAocmF3VmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFZhbCA9IGJ1aWxkVGVtcGxhdGVTdHJpbmcocmF3VmFsLCBwYXJhbXMpO1xuICAgICAgcGFyc2VkVGVtcGxhdGUgPSBwYXJzZWRUZW1wbGF0ZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKG1hdGNoWzBdLCBcImdpXCIpLFxuICAgICAgICBwYXJzZWRWYWwsXG4gICAgICApO1xuICAgIH1cbiAgICBtYXRjaCA9IHRlbXBSZWdleC5leGVjKHRlbXBsYXRlKTtcbiAgfVxuICByZXR1cm4gcGFyc2VkVGVtcGxhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJCb3VuZHMoY3VycmVudDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCBjdXJyZW50KSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ0tleXM8UD4ge1xuICBbaW5kZXg6IHN0cmluZ106IFA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU51bWJlcktleXM8UD4ge1xuICBbaW5kZXg6IG51bWJlcl06IFA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdLZXlzPFQ+KGluVmFsdWU6IFQpIHtcbiAgcmV0dXJuIGluVmFsdWUgYXMgdHlwZW9mIGluVmFsdWUgJiBJU3RyaW5nS2V5czxudW1iZXI+O1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG90eXBlU3RhY2s8VCBleHRlbmRzIEZ1bmN0aW9uPihjb25zdHJ1Y3RvcjogVCk6IFRbXTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm90b3R5cGVTdGFjazxUIGV4dGVuZHMgeyBuZXcoLi4uYXJnczogYW55W10pOiB7fSB9PihcbiAgY29uc3RydWN0b3I6IFQsXG4pOiBUW10ge1xuICBjb25zdCBwcm90b3R5cGVzID0gW107XG4gIGxldCBwcm90b3R5cGUgPSBjb25zdHJ1Y3RvcjtcbiAgd2hpbGUgKHByb3RvdHlwZSkge1xuICAgIHByb3RvdHlwZXMucHVzaChwcm90b3R5cGUpO1xuICAgIHByb3RvdHlwZSA9IHByb3RvdHlwZS5wcm90b3R5cGU7XG4gIH1cbiAgcmV0dXJuIHByb3RvdHlwZXM7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlck9ySnNvbihkYXRhOiBCdWZmZXIgfCBvYmplY3QpOiBCdWZmZXIgfCBzdHJpbmcge1xuICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIEJ1ZmZlciA/IGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lc3NhZ2VUb0pTT04obWVzc2FnZTogYW55KSB7XG4gIGxldCBkYXRhID0gbWVzc2FnZTtcbiAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY291bGQgbm90IHBhcnNlSFJMIG1lc3NhZ2UgYXMgSlNPTlwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5PYmplY3QoZGF0YTogSVN0cmluZ0tleXM8YW55Pikge1xuICBpZiAoIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG4gIGxldCBzdWJEYXRhOiBJU3RyaW5nS2V5czxhbnk+ID0gey4uLmRhdGF9O1xuICBsZXQgbG9vcCA9IHRydWU7XG4gIHdoaWxlIChsb29wKSB7XG4gICAgbG9vcCA9IGZhbHNlO1xuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzdWJEYXRhKTtcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgIGNvbnN0IGtleSA9IGVudHJ5WzBdO1xuICAgICAgY29uc3QgdmFsdWUgPSBlbnRyeVsxXTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGRlbGV0ZSBzdWJEYXRhW2tleV07XG4gICAgICAgIGNvbnN0IHZhbHVlV2l0aEtleW5hbWVzOiBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmVudHJpZXModmFsdWUpLmZvckVhY2goKHN1YkVudHJ5KSA9PiB7XG4gICAgICAgICAgdmFsdWVXaXRoS2V5bmFtZXNbYCR7a2V5fS4ke3N1YkVudHJ5WzBdfWBdID0gc3ViRW50cnlbMV07XG4gICAgICAgIH0pO1xuICAgICAgICBzdWJEYXRhID0gey4uLnN1YkRhdGEsIC4uLnZhbHVlV2l0aEtleW5hbWVzfTtcbiAgICAgICAgbG9vcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdWJEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyZWFtVG9CdWZmZXIoaW5TdHJlYW06IHN0cmVhbSk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGxvZyhjaGFsay55ZWxsb3coXCJTdHJlYW0gdG8gQnVmZmVyXCIpKTtcbiAgaWYgKCEoaW5TdHJlYW0gaW5zdGFuY2VvZiBzdHJlYW0uUGFzc1Rocm91Z2gpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFBhc3NUaHJvdWdoIHN0cmVhbVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBQYXNzVGhyb3VnaCBzdHJlYW1cIikpO1xuICB9XG4gIGlmICghKGluU3RyZWFtIGluc3RhbmNlb2Ygc3RyZWFtLlN0cmVhbSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgU3RyZWFtIHN0cmVhbVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBTdHJlYW0gc3RyZWFtXCIpKTtcbiAgfVxuICBpZiAoIShpblN0cmVhbSBpbnN0YW5jZW9mIHN0cmVhbS5EdXBsZXgpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIER1cGxleCBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgRHVwbGV4IHN0cmVhbVwiKSk7XG4gIH1cbiAgaWYgKCEoaW5TdHJlYW0gaW5zdGFuY2VvZiBzdHJlYW0uV3JpdGFibGUpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFdyaXRhYmxlIHN0cmVhbVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBXcml0YWJsZSBzdHJlYW1cIikpO1xuICB9XG4gIGlmICghKGluU3RyZWFtIGluc3RhbmNlb2Ygc3RyZWFtLlJlYWRhYmxlKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBSZWFkYWJsZSBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgUmVhZGFibGUgc3RyZWFtXCIpKTtcbiAgfVxuICBpZiAoIShpblN0cmVhbSBpbnN0YW5jZW9mIHN0cmVhbS5UcmFuc2Zvcm0pKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFRyYW5zZm9ybSBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgVHJhbnNmb3JtIHN0cmVhbVwiKSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBidWZmZXJzOiBVaW50OEFycmF5W10gPSBbXTtcbiAgICBpblN0cmVhbS5vbihcImVycm9yXCIsIChlcnIpID0+IHsgbG9nKGNoYWxrLnJlZChcIkVycm9yXCIpLCBlcnIpOyByZWplY3QoZXJyKTsgfSk7XG4gICAgaW5TdHJlYW0ub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7IGxvZyhjaGFsay55ZWxsb3coXCJEYXRhXCIpLCBkYXRhLmxlbmd0aCk7IGJ1ZmZlcnMucHVzaChkYXRhKTsgfSk7XG4gICAgaW5TdHJlYW0ub24oXCJlbmRcIiwgKCkgPT4geyBsb2coY2hhbGsuZ3JlZW4oXCJFbmRcIikpOyByZXNvbHZlKEJ1ZmZlci5jb25jYXQoYnVmZmVycykpOyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJUb1N0cmVhbShidWZmZXI6IEJ1ZmZlcikge1xuICBsb2coY2hhbGsueWVsbG93KFwiQnVmZmVyIHRvIFN0cmVhbVwiKSk7XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgQnVmZmVyXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIEJ1ZmZlclwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgSW50OEFycmF5KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBJbnQ4QXJyYXlcIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgSW50OEFycmF5XCIpKTtcbiAgfVxuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBVaW50OENsYW1wZWRBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgVWludDhDbGFtcGVkQXJyYXlcIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgVWludDhDbGFtcGVkQXJyYXlcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFVpbnQ4QXJyYXlcIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgVWludDhBcnJheVwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgVWludDE2QXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFVpbnQxNkFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQxNkFycmF5XCIpKTtcbiAgfVxuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBVaW50MzJBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgVWludDMyQXJyYXlcIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgVWludDMyQXJyYXlcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgRmxvYXQzMkFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIEZsb2F0MzJBcnJheVwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBGbG9hdDY0QXJyYXlcIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgRmxvYXQ2NEFycmF5XCIpKTtcbiAgfVxuICBjb25zdCBvdXRTdHJlYW0gPSBuZXcgc3RyZWFtLkR1cGxleCgpO1xuICBvdXRTdHJlYW0ucHVzaChidWZmZXIpO1xuICBvdXRTdHJlYW0ucHVzaChudWxsKTtcbiAgcmV0dXJuIG91dFN0cmVhbTtcbn1cbiJdfQ==