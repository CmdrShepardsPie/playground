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
    Object.defineProperty(exports, "__esModule", { value: true });
    var command_link_1 = require("./abstract/command-link");
    var NumberService = /** @class */ (function (_super) {
        __extends(NumberService, _super);
        function NumberService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NumberService.prototype.listen = function (value) {
            this.emit(parseInt(value, 10));
        };
        return NumberService;
    }(command_link_1.default));
    exports.default = NumberService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbnVtYmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsd0RBQWtEO0lBRWxEO1FBQTJDLGlDQUEyQjtRQUF0RTs7UUFJQSxDQUFDO1FBSFcsOEJBQU0sR0FBaEIsVUFBaUIsS0FBYTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQUFDLEFBSkQsQ0FBMkMsc0JBQVcsR0FJckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWFuZExpbmsgZnJvbSBcIi4vYWJzdHJhY3QvY29tbWFuZC1saW5rXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlclNlcnZpY2UgZXh0ZW5kcyBDb21tYW5kTGluazxzdHJpbmcsIG51bWJlcj4ge1xuICBwcm90ZWN0ZWQgbGlzdGVuKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXQocGFyc2VJbnQodmFsdWUsIDEwKSk7XG4gIH1cbn1cbiJdfQ==