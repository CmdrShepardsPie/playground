"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_input_1 = require("./abstract/command-input");
class OutputService extends command_input_1.default {
    listen(value) {
        process.stdout.write(value);
    }
}
exports.default = OutputService;
