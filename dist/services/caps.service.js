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
    var CapsService = /** @class */ (function (_super) {
        __extends(CapsService, _super);
        function CapsService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CapsService.prototype.listen = function (value) {
            this.emit(value.toUpperCase());
        };
        return CapsService;
    }(command_link_1.default));
    exports.default = CapsService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2NhcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx3REFBa0Q7SUFFbEQ7UUFBeUMsK0JBQW1CO1FBQTVEOztRQUlBLENBQUM7UUFIVyw0QkFBTSxHQUFoQixVQUFpQixLQUFhO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNILGtCQUFDO0lBQUQsQ0FBQyxBQUpELENBQXlDLHNCQUFXLEdBSW5EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1hbmRMaW5rIGZyb20gXCIuL2Fic3RyYWN0L2NvbW1hbmQtbGlua1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXBzU2VydmljZSBleHRlbmRzIENvbW1hbmRMaW5rPHN0cmluZz4ge1xuICBwcm90ZWN0ZWQgbGlzdGVuKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXQodmFsdWUudG9VcHBlckNhc2UoKSk7XG4gIH1cbn1cbiJdfQ==