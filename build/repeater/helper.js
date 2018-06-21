(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _fs = require("fs");
    const util_1 = require("util");
    exports.fs = {
        exists: util_1.promisify(_fs.exists),
        mkdir: util_1.promisify(_fs.mkdir),
        readFile: util_1.promisify(_fs.readFile),
        readdir: util_1.promisify(_fs.readdir),
        writeFile: util_1.promisify(_fs.writeFile),
    };
    function getTextOrNumber(el) {
        const value = getText(el);
        const num = getNumber(value);
        return !isNaN(num) ? num : value;
    }
    exports.getTextOrNumber = getTextOrNumber;
    function getNumber(text, reg = /([-+]?\d*\.?\d*)/g) {
        let result = NaN;
        if (text && text.match) {
            const match = reg.exec(text);
            // console.log('match', match);
            if (match) {
                result = parseFloat(match[1]);
            }
        }
        return result;
    }
    exports.getNumber = getNumber;
    function getText(el) {
        if (el) {
            let text = el.innerHTML;
            if (text) {
                text = text.replace(/<script>.*<\/script>/g, " ");
                text = text.replace(/<[^>]*>/g, " ");
                return text.trim();
            }
        }
        return "";
    }
    exports.getText = getText;
    function wait(ms, fn) {
        // console.log('wait', ms);
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    resolve(fn && await fn());
                }
                catch (e) {
                    reject(e);
                }
            }, ms);
        });
    }
    exports.wait = wait;
    async function makeDirs(path) {
        let tempPath = `.`;
        for (const dir of path.split(`/`)) {
            if (/\./.test(dir)) {
                break;
            }
            tempPath = `${tempPath}/${dir}`;
            if (!(await exports.fs.exists(tempPath))) {
                await exports.fs.mkdir(tempPath);
            }
        }
    }
    exports.makeDirs = makeDirs;
    async function dirExists(path) {
        let tempPath = `.`;
        let exists = true;
        for (const dir of path.split(`/`)) {
            tempPath = `${tempPath}/${dir}`;
            exists = await exports.fs.exists(tempPath);
            if (!exists) {
                break;
            }
        }
        return exists;
    }
    exports.dirExists = dirExists;
});
//# sourceMappingURL=helper.js.map