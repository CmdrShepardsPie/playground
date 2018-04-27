(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                text = text.replace(/<script>.*<\/script>/g, ' ');
                text = text.replace(/<[^>]*>/g, ' ');
                return text.trim();
            }
        }
        return '';
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
});
//# sourceMappingURL=helper.js.map