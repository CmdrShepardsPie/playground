var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/command-input"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const command_input_1 = __importDefault(require("./abstract/command-input"));
    class OutputService extends command_input_1.default {
        listen(value) {
            process.stdout.write(value);
        }
    }
    exports.default = OutputService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvb3V0cHV0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw2RUFBb0Q7SUFFcEQsTUFBcUIsYUFBYyxTQUFRLHVCQUFvQjtRQUNuRCxNQUFNLENBQUMsS0FBYTtZQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0Y7SUFKRCxnQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tYW5kSW5wdXQgZnJvbSBcIi4vYWJzdHJhY3QvY29tbWFuZC1pbnB1dFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3V0cHV0U2VydmljZSBleHRlbmRzIENvbW1hbmRJbnB1dDxzdHJpbmc+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcclxuICB9XHJcbn1cclxuIl19