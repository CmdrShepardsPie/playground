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
        define(["require", "exports", "./abstract/command-input"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var command_input_1 = require("./abstract/command-input");
    var OutputService = /** @class */ (function (_super) {
        __extends(OutputService, _super);
        function OutputService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OutputService.prototype.listen = function (value) {
            process.stdout.write(value);
        };
        return OutputService;
    }(command_input_1.default));
    exports.default = OutputService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvb3V0cHV0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMERBQW9EO0lBRXBEO1FBQTJDLGlDQUFvQjtRQUEvRDs7UUFJQSxDQUFDO1FBSFcsOEJBQU0sR0FBaEIsVUFBaUIsS0FBYTtZQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQUFDLEFBSkQsQ0FBMkMsdUJBQVksR0FJdEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWFuZElucHV0IGZyb20gXCIuL2Fic3RyYWN0L2NvbW1hbmQtaW5wdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3V0cHV0U2VydmljZSBleHRlbmRzIENvbW1hbmRJbnB1dDxzdHJpbmc+IHtcbiAgcHJvdGVjdGVkIGxpc3Rlbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodmFsdWUpO1xuICB9XG59XG4iXX0=