// tslint:disable:max-classes-per-file
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
        define(["require", "exports", "chalk", "node-logger", "stream"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    const node_logger_1 = require("node-logger");
    const stream = __importStar(require("stream"));
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
            inStream.on("error", (err) => {
                log(chalk_1.default.red("Error"), err);
                reject(err);
            });
            inStream.on("data", (data) => {
                log(chalk_1.default.yellow("Data"), data.length);
                buffers.push(data);
            });
            inStream.on("end", () => {
                log(chalk_1.default.green("End"));
                resolve(Buffer.concat(buffers));
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQXNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXRDLGtEQUEwQjtJQUMxQiw2Q0FBc0M7SUFDdEMsK0NBQWlDO0lBRWpDLE1BQU0sR0FBRyxHQUFHLHVCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFakMsU0FBZ0IsSUFBSSxDQUFDLEVBQVUsRUFBRSxFQUFRO1FBQ3ZDLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNwQixJQUFJO29CQUNGLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDN0I7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBWEQsb0JBV0M7SUFFRCxTQUFnQixjQUFjLENBQUMsR0FBVztRQUN4QyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQVRELHdDQVNDO0lBRUQsU0FBZ0IsY0FBYyxDQUFDLEdBQVcsRUFBRSxLQUFjLEVBQUUsS0FBYztRQUN4RSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDOUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFDRCxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDaEI7WUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFO2dCQUM5QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUMzQjtZQUNELEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBdEJELHdDQXNCQztJQUVELDhDQUE4QztJQUM5Qyw2RUFBNkU7SUFDN0UscUNBQXFDO0lBQ3JDLDRFQUE0RTtJQUM1RSxzRUFBc0U7SUFDdEUsb0JBQW9CO0lBQ3BCLE1BQU07SUFDTixtQkFBbUI7SUFDbkIsZ0RBQWdEO0lBQ2hELG9DQUFvQztJQUNwQyx3QkFBd0I7SUFDeEIscUJBQXFCO0lBQ3JCLDZFQUE2RTtJQUM3RSxRQUFRO0lBQ1IsT0FBTztJQUVQLDZDQUE2QztJQUM3QyxxRUFBcUU7SUFDckUsZ0RBQWdEO0lBQ2hELDJDQUEyQztJQUMzQyxvR0FBb0c7SUFDcEcsK0VBQStFO0lBQy9FLG1EQUFtRDtJQUNuRCx5REFBeUQ7SUFDekQsd0NBQXdDO0lBQ3hDLDZFQUE2RTtJQUM3RSwwREFBMEQ7SUFDMUQsV0FBVztJQUNYLG1FQUFtRTtJQUNuRSxRQUFRO0lBQ1IsUUFBUTtJQUNSLHFGQUFxRjtJQUVyRixvQkFBb0I7SUFDcEIsSUFBSTtJQUVKLFNBQWdCLG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsTUFBVztRQUMvRCxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDOUIsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ2xDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLEVBQUU7WUFDWixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUN4QixNQUFNLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3RELGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUNyQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQzFCLFNBQVMsQ0FDVixDQUFDO2FBQ0g7WUFDRCxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFoQkQsa0RBZ0JDO0lBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQWUsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUNwRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUZELG9DQUVDO0lBVUQsU0FBZ0IsVUFBVSxDQUFJLE9BQVU7UUFDdEMsT0FBTyxPQUErQyxDQUFDO0lBQ3pELENBQUM7SUFGRCxnQ0FFQztJQUlELFNBQWdCLGlCQUFpQixDQUMvQixXQUFjO1FBRWQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQztRQUM1QixPQUFPLFNBQVMsRUFBRTtZQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFFcEIsQ0FBQztJQVhELDhDQVdDO0lBRUQsU0FBZ0IsWUFBWSxDQUFDLElBQXFCO1FBQ2hELE9BQU8sSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZELG9DQUVDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLE9BQVk7UUFDeEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUk7Z0JBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDNUI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7YUFDbkQ7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBRWQsQ0FBQztJQVhELHNDQVdDO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLElBQXNCO1FBQ2xELElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksT0FBTyxHQUFxQixFQUFDLEdBQUcsSUFBSSxFQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxFQUFFO1lBQ1gsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNiLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLEVBQUU7Z0JBQzNCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3RELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixNQUFNLGlCQUFpQixHQUFRLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDekMsaUJBQWlCLENBQUMsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNELENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sR0FBRyxFQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsaUJBQWlCLEVBQUMsQ0FBQztvQkFDN0MsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDYjthQUNGO1NBQ0Y7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBeEJELHNDQXdCQztJQUVELFNBQWdCLGNBQWMsQ0FBQyxRQUFnQjtRQUM3QyxHQUFHLENBQUMsZUFBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsUUFBUSxZQUFZLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3QyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEMsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLFlBQVksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxZQUFZLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUMsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLFlBQVksTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBaUIsRUFBRSxDQUFDO1lBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzNCLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNCLEdBQUcsQ0FBQyxlQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztZQUNILFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQS9DRCx3Q0ErQ0M7SUFFRCxTQUFnQixjQUFjLENBQUMsTUFBYztRQUMzQyxHQUFHLENBQUMsZUFBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLEdBQUcsQ0FBQyxlQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksU0FBUyxDQUFDLEVBQUU7WUFDbEMsR0FBRyxDQUFDLGVBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksaUJBQWlCLENBQUMsRUFBRTtZQUMxQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxVQUFVLENBQUMsRUFBRTtZQUNuQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxXQUFXLENBQUMsRUFBRTtZQUNwQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxXQUFXLENBQUMsRUFBRTtZQUNwQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxZQUFZLENBQUMsRUFBRTtZQUNyQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sWUFBWSxZQUFZLENBQUMsRUFBRTtZQUNyQyxHQUFHLENBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBOUNELHdDQThDQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlXG5cbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwibm9kZS1sb2dnZXJcIjtcbmltcG9ydCAqIGFzIHN0cmVhbSBmcm9tIFwic3RyZWFtXCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkhlbHBlcnNcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiB3YWl0KG1zOiBudW1iZXIsIGZuPzogYW55KSB7XG4gIGxvZyhjaGFsay5ncmVlbihcIldhaXRcIiksIG1zKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc29sdmUoZm4gJiYgKGF3YWl0IGZuKCkpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH0sIG1zKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb051bWJlcihzdHI6IHN0cmluZykge1xuICBjb25zdCBub25OdW1iZXIgPSAvW14wLTkuXSovZ2k7XG4gIGNvbnN0IGRlY2ltYWwgPSAvXFwuL2dpO1xuICBjb25zdCBmaXhlZCA9IHN0ci5yZXBsYWNlKG5vbk51bWJlciwgXCJcIik7XG4gIGNvbnN0IG51bSA9IGRlY2ltYWwudGVzdChmaXhlZCkgPyBwYXJzZUZsb2F0KGZpeGVkKSA6IHBhcnNlSW50KGZpeGVkLCAxMCk7XG4gIGlmICghaXNOYU4obnVtKSkge1xuICAgIHJldHVybiBudW07XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlclRvU3RyaW5nKG51bTogbnVtYmVyLCBtYWpvcj86IG51bWJlciwgbWlub3I/OiBudW1iZXIpIHtcbiAgbGV0IHN0ciA9IG51bS50b1N0cmluZygpO1xuICBjb25zdCBzcGxpdCA9IHN0ci5zcGxpdChcIi5cIik7XG4gIGlmIChtYWpvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHNwbGl0WzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNwbGl0WzBdID0gXCIwXCI7XG4gICAgfVxuICAgIHdoaWxlIChzcGxpdFswXS5sZW5ndGggPCBtYWpvcikge1xuICAgICAgc3BsaXRbMF0gPSBcIjBcIiArIHNwbGl0WzBdO1xuICAgIH1cbiAgICBzdHIgPSBzcGxpdC5qb2luKFwiLlwiKTtcbiAgfVxuICBpZiAobWlub3IgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChzcGxpdFsxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzcGxpdFsxXSA9IFwiMFwiO1xuICAgIH1cbiAgICB3aGlsZSAoc3BsaXRbMV0ubGVuZ3RoIDwgbWlub3IpIHtcbiAgICAgIHNwbGl0WzFdID0gc3BsaXRbMV0gKyBcIjBcIjtcbiAgICB9XG4gICAgc3RyID0gc3BsaXQuam9pbihcIi5cIik7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cblxuLy8gQEFsd2F5c1RoaXMgaXMga2luZGEgYnJva2VuIGFzIGl0IHR1cm5zIG91dFxuLy8gV0FSTklORzogQWx3YXlzVGhpcyBtb2RpZmllcyB0aGUgb2JqZWN0IHByb3RvdHlwZSB3aGljaCBjYW4gY2F1c2UgcHJvYmxlbXNcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbi8vIGV4cG9ydCBmdW5jdGlvbiBBbHdheXNUaGlzPFQgZXh0ZW5kcyBGdW5jdGlvbj4oY29uc3RydWNvbnN0cnVjdG9yOiBUKTogVDtcbi8vIGV4cG9ydCBmdW5jdGlvbiBBbHdheXNUaGlzPFQgZXh0ZW5kcyB7IG5ldyAoLi4uYXJnczogYW55W10pOiB7fSB9Pihcbi8vICAgY29uc3RydWN0b3I6IFQsXG4vLyApIHtcbi8vICAgbGV0IHNlbGY6IGFueTtcbi8vICAgY29uc3Qgd3JhcHBlciA9IGNsYXNzIGV4dGVuZHMgY29uc3RydWN0b3Ige1xuLy8gICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4vLyAgICAgICBzdXBlciguLi5hcmdzKTtcbi8vICAgICAgIHNlbGYgPSB0aGlzO1xuLy8gICAgICAgLy8gY29uc29sZS5sb2coXCJBbHdheXNUaGlzXCIsIFwiY29uc3RydWN0b3JcIiwgY29uc3RydWN0b3IubmFtZSwgc2VsZik7XG4vLyAgICAgfVxuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbi8vICAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhwcm90b3R5cGUpO1xuLy8gICBPYmplY3Qua2V5cyhkZXNjcmlwdG9ycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4vLyAgICAgY29uc3QgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JzW2tleV07XG4vLyAgICAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiYga2V5ICE9PSBcImNvbnN0cnVjdG9yXCIgJiYga2V5ICE9PSBcInByb3RvdHlwZVwiKSB7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFsd2F5c1RoaXNcIiwgXCJmdW5jdGlvblwiLCBjb25zdHJ1Y3Rvci5uYW1lLCBrZXksIHNlbGYpO1xuLy8gICAgICAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4vLyAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b25seS1hcnJvdy1mdW5jdGlvbnNcbi8vICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBbHdheXNUaGlzXCIsIFwiY2FsbFwiLCBjb25zdHJ1Y3Rvci5uYW1lLCBrZXksIHNlbGYpO1xuLy8gICAgICAgICByZXR1cm4gb3JpZ2luYWxGdW5jdGlvbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuLy8gICAgICAgfTtcbi8vICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3cmFwcGVyLnByb3RvdHlwZSwga2V5LCBkZXNjcmlwdG9yKTtcbi8vICAgICB9XG4vLyAgIH0pO1xuLy8gICAvLyBjb25zb2xlLmxvZyhcIkFwcGx5VGhpc1wiLCBcIndyYXBwZXJcIiwgd3JhcHBlciwgXCJwcm90b3R5cGVcIiwgd3JhcHBlci5wcm90b3R5cGUpO1xuXG4vLyAgIHJldHVybiB3cmFwcGVyO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZVN0cmluZyh0ZW1wbGF0ZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICBsZXQgcGFyc2VkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgY29uc3QgdGVtcFJlZ2V4ID0gL1xceyhbXn1dKilcXH0vZ2k7XG4gIGxldCBtYXRjaCA9IHRlbXBSZWdleC5leGVjKHRlbXBsYXRlKTtcbiAgd2hpbGUgKG1hdGNoKSB7XG4gICAgY29uc3QgcmF3VmFsID0gcGFyYW1zW21hdGNoWzFdXTtcbiAgICBpZiAocmF3VmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHBhcnNlZFZhbCA9IGJ1aWxkVGVtcGxhdGVTdHJpbmcocmF3VmFsLCBwYXJhbXMpO1xuICAgICAgcGFyc2VkVGVtcGxhdGUgPSBwYXJzZWRUZW1wbGF0ZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKG1hdGNoWzBdLCBcImdpXCIpLFxuICAgICAgICBwYXJzZWRWYWwsXG4gICAgICApO1xuICAgIH1cbiAgICBtYXRjaCA9IHRlbXBSZWdleC5leGVjKHRlbXBsYXRlKTtcbiAgfVxuICByZXR1cm4gcGFyc2VkVGVtcGxhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJCb3VuZHMoY3VycmVudDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCBjdXJyZW50KSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0cmluZ0tleXM8UD4ge1xuICBbaW5kZXg6IHN0cmluZ106IFA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU51bWJlcktleXM8UD4ge1xuICBbaW5kZXg6IG51bWJlcl06IFA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdLZXlzPFQ+KGluVmFsdWU6IFQpIHtcbiAgcmV0dXJuIGluVmFsdWUgYXMgdHlwZW9mIGluVmFsdWUgJiBJU3RyaW5nS2V5czxudW1iZXI+O1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvdG90eXBlU3RhY2s8VCBleHRlbmRzIEZ1bmN0aW9uPihjb25zdHJ1Y3RvcjogVCk6IFRbXTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm90b3R5cGVTdGFjazxUIGV4dGVuZHMgbmV3KC4uLmFyZ3M6IGFueVtdKSA9PiB7fT4oXG4gIGNvbnN0cnVjdG9yOiBULFxuKTogVFtdIHtcbiAgY29uc3QgcHJvdG90eXBlcyA9IFtdO1xuICBsZXQgcHJvdG90eXBlID0gY29uc3RydWN0b3I7XG4gIHdoaWxlIChwcm90b3R5cGUpIHtcbiAgICBwcm90b3R5cGVzLnB1c2gocHJvdG90eXBlKTtcbiAgICBwcm90b3R5cGUgPSBwcm90b3R5cGUucHJvdG90eXBlO1xuICB9XG4gIHJldHVybiBwcm90b3R5cGVzO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJPckpzb24oZGF0YTogQnVmZmVyIHwgb2JqZWN0KTogQnVmZmVyIHwgc3RyaW5nIHtcbiAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBCdWZmZXIgPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNzYWdlVG9KU09OKG1lc3NhZ2U6IGFueSkge1xuICBsZXQgZGF0YSA9IG1lc3NhZ2U7XG4gIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHRyeSB7XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvdWxkIG5vdCBwYXJzZUhSTCBtZXNzYWdlIGFzIEpTT05cIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBkYXRhO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KGRhdGE6IElTdHJpbmdLZXlzPGFueT4pIHtcbiAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuICBsZXQgc3ViRGF0YTogSVN0cmluZ0tleXM8YW55PiA9IHsuLi5kYXRhfTtcbiAgbGV0IGxvb3AgPSB0cnVlO1xuICB3aGlsZSAobG9vcCkge1xuICAgIGxvb3AgPSBmYWxzZTtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc3ViRGF0YSk7XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBjb25zdCBrZXkgPSBlbnRyeVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbMV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBkZWxldGUgc3ViRGF0YVtrZXldO1xuICAgICAgICBjb25zdCB2YWx1ZVdpdGhLZXluYW1lczogYW55ID0ge307XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5mb3JFYWNoKChzdWJFbnRyeSkgPT4ge1xuICAgICAgICAgIHZhbHVlV2l0aEtleW5hbWVzW2Ake2tleX0uJHtzdWJFbnRyeVswXX1gXSA9IHN1YkVudHJ5WzFdO1xuICAgICAgICB9KTtcbiAgICAgICAgc3ViRGF0YSA9IHsuLi5zdWJEYXRhLCAuLi52YWx1ZVdpdGhLZXluYW1lc307XG4gICAgICAgIGxvb3AgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3ViRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVhbVRvQnVmZmVyKGluU3RyZWFtOiBzdHJlYW0pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBsb2coY2hhbGsueWVsbG93KFwiU3RyZWFtIHRvIEJ1ZmZlclwiKSk7XG4gIGlmICghKGluU3RyZWFtIGluc3RhbmNlb2Ygc3RyZWFtLlBhc3NUaHJvdWdoKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBQYXNzVGhyb3VnaCBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgUGFzc1Rocm91Z2ggc3RyZWFtXCIpKTtcbiAgfVxuICBpZiAoIShpblN0cmVhbSBpbnN0YW5jZW9mIHN0cmVhbS5TdHJlYW0pKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFN0cmVhbSBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgU3RyZWFtIHN0cmVhbVwiKSk7XG4gIH1cbiAgaWYgKCEoaW5TdHJlYW0gaW5zdGFuY2VvZiBzdHJlYW0uRHVwbGV4KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBEdXBsZXggc3RyZWFtXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIER1cGxleCBzdHJlYW1cIikpO1xuICB9XG4gIGlmICghKGluU3RyZWFtIGluc3RhbmNlb2Ygc3RyZWFtLldyaXRhYmxlKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBXcml0YWJsZSBzdHJlYW1cIikpO1xuICB9IGVsc2Uge1xuICAgIGxvZyhjaGFsay5ncmVlbihcIklzIGEgV3JpdGFibGUgc3RyZWFtXCIpKTtcbiAgfVxuICBpZiAoIShpblN0cmVhbSBpbnN0YW5jZW9mIHN0cmVhbS5SZWFkYWJsZSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgUmVhZGFibGUgc3RyZWFtXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFJlYWRhYmxlIHN0cmVhbVwiKSk7XG4gIH1cbiAgaWYgKCEoaW5TdHJlYW0gaW5zdGFuY2VvZiBzdHJlYW0uVHJhbnNmb3JtKSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBUcmFuc2Zvcm0gc3RyZWFtXCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFRyYW5zZm9ybSBzdHJlYW1cIikpO1xuICB9XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgYnVmZmVyczogVWludDhBcnJheVtdID0gW107XG4gICAgaW5TdHJlYW0ub24oXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICBsb2coY2hhbGsucmVkKFwiRXJyb3JcIiksIGVycik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICBpblN0cmVhbS5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgIGxvZyhjaGFsay55ZWxsb3coXCJEYXRhXCIpLCBkYXRhLmxlbmd0aCk7XG4gICAgICBidWZmZXJzLnB1c2goZGF0YSk7XG4gICAgfSk7XG4gICAgaW5TdHJlYW0ub24oXCJlbmRcIiwgKCkgPT4ge1xuICAgICAgbG9nKGNoYWxrLmdyZWVuKFwiRW5kXCIpKTtcbiAgICAgIHJlc29sdmUoQnVmZmVyLmNvbmNhdChidWZmZXJzKSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyVG9TdHJlYW0oYnVmZmVyOiBCdWZmZXIpIHtcbiAgbG9nKGNoYWxrLnllbGxvdyhcIkJ1ZmZlciB0byBTdHJlYW1cIikpO1xuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIEJ1ZmZlclwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBCdWZmZXJcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIEludDhBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgSW50OEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIEludDhBcnJheVwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFVpbnQ4Q2xhbXBlZEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQ4Q2xhbXBlZEFycmF5XCIpKTtcbiAgfVxuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBVaW50OEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQ4QXJyYXlcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIFVpbnQxNkFycmF5KSkge1xuICAgIGxvZyhjaGFsay5yZWQoXCJOb3QgYSBVaW50MTZBcnJheVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBVaW50MTZBcnJheVwiKSk7XG4gIH1cbiAgaWYgKCEoYnVmZmVyIGluc3RhbmNlb2YgVWludDMyQXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIFVpbnQzMkFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIFVpbnQzMkFycmF5XCIpKTtcbiAgfVxuICBpZiAoIShidWZmZXIgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpKSB7XG4gICAgbG9nKGNoYWxrLnJlZChcIk5vdCBhIEZsb2F0MzJBcnJheVwiKSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSXMgYSBGbG9hdDMyQXJyYXlcIikpO1xuICB9XG4gIGlmICghKGJ1ZmZlciBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheSkpIHtcbiAgICBsb2coY2hhbGsucmVkKFwiTm90IGEgRmxvYXQ2NEFycmF5XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2coY2hhbGsuZ3JlZW4oXCJJcyBhIEZsb2F0NjRBcnJheVwiKSk7XG4gIH1cbiAgY29uc3Qgb3V0U3RyZWFtID0gbmV3IHN0cmVhbS5EdXBsZXgoKTtcbiAgb3V0U3RyZWFtLnB1c2goYnVmZmVyKTtcbiAgb3V0U3RyZWFtLnB1c2gobnVsbCk7XG4gIHJldHVybiBvdXRTdHJlYW07XG59XG4iXX0=