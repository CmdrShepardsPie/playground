(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs/add/operator/share", "rxjs/Subject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("rxjs/add/operator/share");
    const Subject_1 = require("rxjs/Subject");
    class CommandOutput {
        // protected subject: Subject<OutType>;
        // protected observable: Observable<OutType>;
        constructor(subject = new Subject_1.Subject(), observable = subject.share()) {
            this.subject = subject;
            this.observable = observable;
        }
        get output() {
            return this.observable;
        }
        emit(value) {
            this.subject && this.subject.next(value);
        }
    }
    exports.default = CommandOutput;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1vdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWJzdHJhY3QvY29tbWFuZC1vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQ0FBaUM7SUFFakMsMENBQXFDO0lBR3JDLE1BQThCLGFBQWE7UUFDekMsdUNBQXVDO1FBQ3ZDLDZDQUE2QztRQUU3QyxZQUFzQixVQUE0QixJQUFJLGlCQUFPLEVBQUUsRUFBWSxhQUFrQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQXRHLFlBQU8sR0FBUCxPQUFPLENBQWtDO1lBQVksZUFBVSxHQUFWLFVBQVUsQ0FBdUM7UUFDNUgsQ0FBQztRQUVELElBQVcsTUFBTTtZQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO1FBRVMsSUFBSSxDQUFDLEtBQWM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQ0Y7SUFkRCxnQ0FjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3NoYXJlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anMvU3ViamVjdFwiO1xuaW1wb3J0IElDb21tYW5kT3V0cHV0IGZyb20gXCIuL2kuY29tbWFuZC1vdXRwdXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQ29tbWFuZE91dHB1dDxPdXRUeXBlPiBpbXBsZW1lbnRzIElDb21tYW5kT3V0cHV0PE91dFR5cGU+IHtcbiAgLy8gcHJvdGVjdGVkIHN1YmplY3Q6IFN1YmplY3Q8T3V0VHlwZT47XG4gIC8vIHByb3RlY3RlZCBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE91dFR5cGU+O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdWJqZWN0OiBTdWJqZWN0PE91dFR5cGU+ID0gbmV3IFN1YmplY3QoKSwgcHJvdGVjdGVkIG9ic2VydmFibGU6IE9ic2VydmFibGU8T3V0VHlwZT4gPSBzdWJqZWN0LnNoYXJlKCkpIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgb3V0cHV0KCk6IE9ic2VydmFibGU8T3V0VHlwZT4ge1xuICAgIHJldHVybiB0aGlzLm9ic2VydmFibGU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZW1pdCh2YWx1ZTogT3V0VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc3ViamVjdCAmJiB0aGlzLnN1YmplY3QubmV4dCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==