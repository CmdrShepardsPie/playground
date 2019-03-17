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
        define(["require", "exports", "./abstract/command-link"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var command_link_1 = require("./abstract/command-link");
    var StringService = /** @class */ (function (_super) {
        __extends(StringService, _super);
        function StringService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StringService.prototype.listen = function (value) {
            this.emit(value.toString());
        };
        return StringService;
    }(command_link_1["default"]));
    exports["default"] = StringService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc3RyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsd0RBQWtEO0lBRWxEO1FBQTJDLGlDQUEyQjtRQUF0RTs7UUFJQSxDQUFDO1FBSFcsOEJBQU0sR0FBaEIsVUFBaUIsS0FBYTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFDSCxvQkFBQztJQUFELENBQUMsQUFKRCxDQUEyQyx5QkFBVyxHQUlyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tYW5kTGluayBmcm9tIFwiLi9hYnN0cmFjdC9jb21tYW5kLWxpbmtcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nU2VydmljZSBleHRlbmRzIENvbW1hbmRMaW5rPG51bWJlciwgc3RyaW5nPiB7XG4gIHByb3RlY3RlZCBsaXN0ZW4odmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZW1pdCh2YWx1ZS50b1N0cmluZygpKTtcbiAgfVxufVxuIl19