"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_link_1 = require("./abstract/command-link");
class NumberService extends command_link_1.default {
    listen(value) {
        this.emit(parseInt(value, 10));
    }
}
exports.default = NumberService;
