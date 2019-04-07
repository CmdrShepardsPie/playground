(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chalk_1 = require("chalk");
    var lastMessageInline = false;
    var lastContext;
    var bgColors = [
        // "bgBlack",
        "bgRed",
        "bgGreen",
        "bgYellow",
        "bgBlue",
        "bgMagenta",
        "bgCyan",
    ];
    var lastColor = 0;
    function createOut(context, color) {
        if (!color) {
            color = bgColors[lastColor];
            lastColor += 1;
            if (lastColor >= bgColors.length) {
                lastColor = 0;
            }
        }
        return { log: createLog(context, color), write: createWrite(context, color) };
    }
    exports.createOut = createOut;
    function createLog(context, color) {
        if (!color) {
            color = bgColors[lastColor];
            lastColor += 1;
            if (lastColor >= bgColors.length) {
                lastColor = 0;
            }
        }
        // @ts-ignore
        var chalkColorFn = chalk_1.default[color];
        return function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            msg = msg.map(prepIfJson);
            // if (lastContext !== context) {
            //   createEmptyLine();
            // }
            if (lastMessageInline) {
                createEmptyLine();
            }
            var args = [chalkColorFn(context + ":")].concat(msg);
            console.log.apply(console, args);
            lastMessageInline = false;
            lastContext = context;
        };
    }
    exports.createLog = createLog;
    function createWrite(context, color) {
        if (!color) {
            color = bgColors[lastColor];
            lastColor += 1;
            if (lastColor >= bgColors.length) {
                lastColor = 0;
            }
        }
        // @ts-ignore
        var chalkColorFn = chalk_1.default[color];
        return function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (!lastMessageInline) {
                process.stdout.write(chalkColorFn(context + ":") + " ");
            }
            if (lastMessageInline && lastContext !== context) {
                createEmptyLine();
                process.stdout.write(chalkColorFn(context + ":") + " ");
            }
            process.stdout.write(msg.join(" "));
            lastMessageInline = true;
            lastContext = context;
        };
    }
    exports.createWrite = createWrite;
    function createThrowError(context) {
        var color = bgColors[lastColor];
        lastColor += 1;
        if (lastColor >= bgColors.length) {
            lastColor = 0;
        }
        // @ts-ignore
        var chalkColorFn = chalk_1.default[color];
        return function (type) {
            var msg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                msg[_i - 1] = arguments[_i];
            }
            console.log.apply(console, [chalkColorFn(context + ":"), chalk_1.default.red(type + " Error:")].concat(msg));
            process.exit(1);
        };
    }
    exports.createThrowError = createThrowError;
    function prepIfJson(t) {
        if (t instanceof Error) {
            return t;
        }
        if (typeof t === "string") {
            try {
                t = JSON.parse(t);
            }
            catch (e) {
                /* no empty */
            }
        }
        if (typeof t === "object") {
            try {
                t = JSON.stringify(t, null, 4);
                t = colorizeJsonString(t);
            }
            catch (e) {
                /* no empty */
            }
        }
        return t;
    }
    function colorizeJsonString(json) {
        // Strings
        json = json.replace(/(\s+)("[^"]*")(,?[\r\n])/gi, "$1" + chalk_1.default.yellow("$2") + "$3");
        // booleans, numbers, etc.
        json = json.replace(/(\s+)([^"[{\]}][^[\]{}"\n\r,]*)(,?[\r\n])/gi, "$1" + chalk_1.default.cyan("$2") + "$3");
        // Keys
        json = json.replace(/("[^"]*"):/gi, chalk_1.default.magenta("$1") + ":");
        return json;
    }
    function createEmptyLine() {
        console.log();
    }
});
