"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_link_1 = require("./abstract/command-link");
class StringService extends command_link_1.default {
    listen(value) {
        this.emit(value.toString());
    }
}
exports.default = StringService;
