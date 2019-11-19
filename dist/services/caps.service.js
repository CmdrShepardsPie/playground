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
    class CapsService extends command_link_1.default {
        listen(value) {
            this.emit(value.toUpperCase());
        }
    }
    exports.default = CapsService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2NhcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDJFQUFrRDtJQUVsRCxNQUFxQixXQUFZLFNBQVEsc0JBQW1CO1FBQ2hELE1BQU0sQ0FBQyxLQUFhO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUNGO0lBSkQsOEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWFuZExpbmsgZnJvbSBcIi4vYWJzdHJhY3QvY29tbWFuZC1saW5rXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXBzU2VydmljZSBleHRlbmRzIENvbW1hbmRMaW5rPHN0cmluZz4ge1xyXG4gIHByb3RlY3RlZCBsaXN0ZW4odmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5lbWl0KHZhbHVlLnRvVXBwZXJDYXNlKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=