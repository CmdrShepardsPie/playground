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
    class StringService extends command_link_1.default {
        listen(value) {
            this.emit(value.toString());
        }
    }
    exports.default = StringService;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc3RyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSwyRUFBa0Q7SUFFbEQsTUFBcUIsYUFBYyxTQUFRLHNCQUEyQjtRQUMxRCxNQUFNLENBQUMsS0FBYTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FDRjtJQUpELGdDQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1hbmRMaW5rIGZyb20gXCIuL2Fic3RyYWN0L2NvbW1hbmQtbGlua1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nU2VydmljZSBleHRlbmRzIENvbW1hbmRMaW5rPG51bWJlciwgc3RyaW5nPiB7XHJcbiAgcHJvdGVjdGVkIGxpc3Rlbih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLmVtaXQodmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==