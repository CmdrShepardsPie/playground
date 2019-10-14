// tslint:disable:max-classes-per-file
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
    const node_logger_1 = require("node-logger");
    const chalk_1 = require("chalk");
    const stream = require("stream");
    const log = node_logger_1.createLog("Helpers");
    function wait(ms, fn) {
        log(chalk_1.default.green("Wait"), ms);
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    resolve(fn && (await fn()));
                }
                catch (e) {
                    reject(e);
                }
            }, ms);
        });
    }
    exports.wait = wait;
    function stringToNumber(str) {
        const nonNumber = /[^0-9.]*/gi;
        const decimal = /\./gi;
        const fixed = str.replace(nonNumber, "");
        const num = decimal.test(fixed) ? parseFloat(fixed) : parseInt(fixed, 10);
        if (!isNaN(num)) {
            return num;
        }
        return str;
    }
    exports.stringToNumber = stringToNumber;
    function numberToString(num, major, minor) {
        let str = num.toString();
        const split = str.split(".");
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
        let parsedTemplate = template;
        const tempRegex = /\{([^}]*)\}/gi;
        let match = tempRegex.exec(template);
        while (match) {
            const rawVal = params[match[1]];
            if (rawVal !== undefined) {
                const parsedVal = buildTemplateString(rawVal, params);
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
        const prototypes = [];
        let prototype = constructor;
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
        let data = message;
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
        let subData = { ...data };
        let loop = true;
        while (loop) {
            loop = false;
            const entries = Object.entries(subData);
            for (const entry of entries) {
                const key = entry[0];
                const value = entry[1];
                if (typeof value === "object" && !Array.isArray(value)) {
                    delete subData[key];
                    const valueWithKeynames = {};
                    Object.entries(value).forEach((subEntry) => {
                        valueWithKeynames[`${key}.${subEntry[0]}`] = subEntry[1];
                    });
                    subData = { ...subData, ...valueWithKeynames };
                    loop = true;
                }
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
        return new Promise((resolve, reject) => {
            const buffers = [];
            inStream.on("error", (err) => { log(chalk_1.default.red("Error"), err); reject(err); });
            inStream.on("data", (data) => { log(chalk_1.default.yellow("Data"), data.length); buffers.push(data); });
            inStream.on("end", () => { log(chalk_1.default.green("End")); resolve(Buffer.concat(buffers)); });
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
        const outStream = new stream.Duplex();
        outStream.push(buffer);
        outStream.push(null);
        return outStream;
    }
    exports.bufferToStream = bufferToStream;
});
//# sourceMappingURL=helpers.js.map