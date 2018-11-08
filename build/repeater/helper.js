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
            text = text.replace(/<script>.*<\/script>/g, " ");
            text = text.replace(/<[^>]*>/g, " ");
            return text.trim();
        }
    }
    return "";
}
exports.getText = getText;
