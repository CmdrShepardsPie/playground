var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    exports.__esModule = true;
    var command_output_1 = require("./abstract/command-output");
    var KeyService = /** @class */ (function (_super) {
        __extends(KeyService, _super);
        function KeyService() {
            var _this = _super.call(this) || this;
            var stdin = process.stdin;
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
                stdin.on("data", function (key) {
                    // ctrl-c ( end of text )
                    if (key === "\u0003") {
                        process.exit();
                    }
                    _this.emit(key);
                });
            }
            return _this;
        }
        return KeyService;
    }(command_output_1["default"]));
    exports["default"] = KeyService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMva2V5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNERBQXNEO0lBRXREO1FBQXdDLDhCQUFxQjtRQUMzRDtZQUFBLFlBQ0UsaUJBQU8sU0F3QlI7WUF2QkMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUU1QixJQUFJLEtBQUssRUFBRTtnQkFDVCxnRUFBZ0U7Z0JBQ2hFLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDcEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEI7Z0JBQ0Qsd0VBQXdFO2dCQUN4RSw2Q0FBNkM7Z0JBQzdDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFZiwrQkFBK0I7Z0JBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTFCLHlCQUF5QjtnQkFDekIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHO29CQUNuQix5QkFBeUI7b0JBQ3pCLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTt3QkFDcEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3FCQUNoQjtvQkFDRCxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQzthQUNKOztRQUNILENBQUM7UUFDSCxpQkFBQztJQUFELENBQUMsQUEzQkQsQ0FBd0MsMkJBQWEsR0EyQnBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1hbmRPdXRwdXQgZnJvbSBcIi4vYWJzdHJhY3QvY29tbWFuZC1vdXRwdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5U2VydmljZSBleHRlbmRzIENvbW1hbmRPdXRwdXQ8c3RyaW5nPiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3Qgc3RkaW4gPSBwcm9jZXNzLnN0ZGluO1xuXG4gICAgaWYgKHN0ZGluKSB7XG4gICAgICAvLyB3aXRob3V0IHRoaXMsIHdlIHdvdWxkIG9ubHkgZ2V0IHN0cmVhbXMgb25jZSBlbnRlciBpcyBwcmVzc2VkXG4gICAgICBpZiAoc3RkaW4uc2V0UmF3TW9kZSkge1xuICAgICAgICBzdGRpbi5zZXRSYXdNb2RlKHRydWUpO1xuICAgICAgfVxuICAgICAgLy8gcmVzdW1lIHN0ZGluIGluIHRoZSBwYXJlbnQgcHJvY2VzcyAobm9kZSBhcHAgd29uJ3QgcXVpdCBhbGwgYnkgaXRzZWxmXG4gICAgICAvLyB1bmxlc3MgYW4gZXJyb3Igb3IgcHJvY2Vzcy5leGl0KCkgaGFwcGVucylcbiAgICAgIHN0ZGluLnJlc3VtZSgpO1xuXG4gICAgICAvLyBpIGRvbid0IHdhbnQgYmluYXJ5LCBkbyB5b3U/XG4gICAgICBzdGRpbi5zZXRFbmNvZGluZyhcInV0ZjhcIik7XG5cbiAgICAgIC8vIG9uIGFueSBkYXRhIGludG8gc3RkaW5cbiAgICAgIHN0ZGluLm9uKFwiZGF0YVwiLCAoa2V5KSA9PiB7XG4gICAgICAgIC8vIGN0cmwtYyAoIGVuZCBvZiB0ZXh0IClcbiAgICAgICAgaWYgKGtleSA9PT0gXCJcXHUwMDAzXCIpIHtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoa2V5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19