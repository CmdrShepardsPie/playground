"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_output_1 = require("./abstract/command-output");
class KeyService extends command_output_1.default {
    constructor() {
        super();
        const stdin = process.stdin;
        if (stdin) {
            if (stdin.setRawMode) {
                stdin.setRawMode(true);
            }
            stdin.resume();
            stdin.setEncoding("utf8");
            stdin.on("data", (key) => {
                if (key === "\u0003") {
                    process.exit();
                }
                this.emit(key);
            });
        }
    }
}
exports.default = KeyService;
