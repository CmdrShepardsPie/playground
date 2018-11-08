"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_output_1 = require("./abstract/command-output");
class KeyService extends command_output_1.default {
    constructor() {
        super();
        const stdin = process.stdin;
        if (stdin) {
            // without this, we would only get streams once enter is pressed
            if (stdin.setRawMode) {
                stdin.setRawMode(true);
            }
            // resume stdin in the parent process (node app won't quit all by itself
            // unless an error or process.exit() happens)
            stdin.resume();
            // i don't want binary, do you?
            stdin.setEncoding("utf8");
            // on any data into stdin
            stdin.on("data", (key) => {
                // ctrl-c ( end of text )
                if (key === "\u0003") {
                    process.exit();
                }
                this.emit(key);
            });
        }
    }
}
exports.default = KeyService;
//# sourceMappingURL=key.service.js.map