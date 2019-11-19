var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/command-output"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const command_output_1 = __importDefault(require("./abstract/command-output"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMva2V5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSwrRUFBc0Q7SUFFdEQsTUFBcUIsVUFBVyxTQUFRLHdCQUFxQjtRQUMzRDtZQUNFLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUU1QixJQUFJLEtBQUssRUFBRTtnQkFDVCxnRUFBZ0U7Z0JBQ2hFLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDcEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEI7Z0JBQ0Qsd0VBQXdFO2dCQUN4RSw2Q0FBNkM7Z0JBQzdDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFZiwrQkFBK0I7Z0JBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTFCLHlCQUF5QjtnQkFDekIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDdkIseUJBQXlCO29CQUN6QixJQUFJLEdBQUcsS0FBSyxRQUFRLEVBQUU7d0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDaEI7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FDRjtJQTNCRCw2QkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWFuZE91dHB1dCBmcm9tIFwiLi9hYnN0cmFjdC9jb21tYW5kLW91dHB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5U2VydmljZSBleHRlbmRzIENvbW1hbmRPdXRwdXQ8c3RyaW5nPiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgY29uc3Qgc3RkaW4gPSBwcm9jZXNzLnN0ZGluO1xyXG5cclxuICAgIGlmIChzdGRpbikge1xyXG4gICAgICAvLyB3aXRob3V0IHRoaXMsIHdlIHdvdWxkIG9ubHkgZ2V0IHN0cmVhbXMgb25jZSBlbnRlciBpcyBwcmVzc2VkXHJcbiAgICAgIGlmIChzdGRpbi5zZXRSYXdNb2RlKSB7XHJcbiAgICAgICAgc3RkaW4uc2V0UmF3TW9kZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICAvLyByZXN1bWUgc3RkaW4gaW4gdGhlIHBhcmVudCBwcm9jZXNzIChub2RlIGFwcCB3b24ndCBxdWl0IGFsbCBieSBpdHNlbGZcclxuICAgICAgLy8gdW5sZXNzIGFuIGVycm9yIG9yIHByb2Nlc3MuZXhpdCgpIGhhcHBlbnMpXHJcbiAgICAgIHN0ZGluLnJlc3VtZSgpO1xyXG5cclxuICAgICAgLy8gaSBkb24ndCB3YW50IGJpbmFyeSwgZG8geW91P1xyXG4gICAgICBzdGRpbi5zZXRFbmNvZGluZyhcInV0ZjhcIik7XHJcblxyXG4gICAgICAvLyBvbiBhbnkgZGF0YSBpbnRvIHN0ZGluXHJcbiAgICAgIHN0ZGluLm9uKFwiZGF0YVwiLCAoa2V5KSA9PiB7XHJcbiAgICAgICAgLy8gY3RybC1jICggZW5kIG9mIHRleHQgKVxyXG4gICAgICAgIGlmIChrZXkgPT09IFwiXFx1MDAwM1wiKSB7XHJcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KGtleSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=