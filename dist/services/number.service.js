var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/command-link"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const command_link_1 = __importDefault(require("./abstract/command-link"));
    class NumberService extends command_link_1.default {
        listen(value) {
            this.emit(parseInt(value, 10));
        }
    }
    exports.default = NumberService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbnVtYmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSwyRUFBa0Q7SUFFbEQsTUFBcUIsYUFBYyxTQUFRLHNCQUEyQjtRQUMxRCxNQUFNLENBQUMsS0FBYTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQ0Y7SUFKRCxnQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tYW5kTGluayBmcm9tIFwiLi9hYnN0cmFjdC9jb21tYW5kLWxpbmtcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlclNlcnZpY2UgZXh0ZW5kcyBDb21tYW5kTGluazxzdHJpbmcsIG51bWJlcj4ge1xyXG4gIHByb3RlY3RlZCBsaXN0ZW4odmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5lbWl0KHBhcnNlSW50KHZhbHVlLCAxMCkpO1xyXG4gIH1cclxufVxyXG4iXX0=