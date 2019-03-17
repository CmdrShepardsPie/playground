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
    exports.__esModule = true;
    require("rxjs/add/operator/share");
    var Subject_1 = require("rxjs/Subject");
    var CommandOutput = /** @class */ (function () {
        // protected subject: Subject<OutType>;
        // protected observable: Observable<OutType>;
        function CommandOutput(subject, observable) {
            if (subject === void 0) { subject = new Subject_1.Subject(); }
            if (observable === void 0) { observable = subject.share(); }
            this.subject = subject;
            this.observable = observable;
        }
        Object.defineProperty(CommandOutput.prototype, "output", {
            get: function () {
                return this.observable;
            },
            enumerable: true,
            configurable: true
        });
        CommandOutput.prototype.emit = function (value) {
            this.subject && this.subject.next(value);
        };
        return CommandOutput;
    }());
    exports["default"] = CommandOutput;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1vdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWJzdHJhY3QvY29tbWFuZC1vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxtQ0FBaUM7SUFFakMsd0NBQXVDO0lBR3ZDO1FBQ0UsdUNBQXVDO1FBQ3ZDLDZDQUE2QztRQUU3Qyx1QkFBc0IsT0FBeUMsRUFBWSxVQUFpRDtZQUF0Ryx3QkFBQSxFQUFBLGNBQWdDLGlCQUFPLEVBQUU7WUFBWSwyQkFBQSxFQUFBLGFBQWtDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFBdEcsWUFBTyxHQUFQLE9BQU8sQ0FBa0M7WUFBWSxlQUFVLEdBQVYsVUFBVSxDQUF1QztRQUFHLENBQUM7UUFFaEksc0JBQVcsaUNBQU07aUJBQWpCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN6QixDQUFDOzs7V0FBQTtRQUVTLDRCQUFJLEdBQWQsVUFBZSxLQUFjO1lBQzNCLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FBQyxBQWJELElBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zaGFyZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwicnhqcy9TdWJqZWN0XCI7XG5pbXBvcnQgSUNvbW1hbmRPdXRwdXQgZnJvbSBcIi4vaS5jb21tYW5kLW91dHB1dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21tYW5kT3V0cHV0PE91dFR5cGU+IGltcGxlbWVudHMgSUNvbW1hbmRPdXRwdXQ8T3V0VHlwZT4ge1xuICAvLyBwcm90ZWN0ZWQgc3ViamVjdDogU3ViamVjdDxPdXRUeXBlPjtcbiAgLy8gcHJvdGVjdGVkIG9ic2VydmFibGU6IE9ic2VydmFibGU8T3V0VHlwZT47XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN1YmplY3Q6IFN1YmplY3Q8T3V0VHlwZT4gPSBuZXcgU3ViamVjdCgpLCBwcm90ZWN0ZWQgb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxPdXRUeXBlPiA9IHN1YmplY3Quc2hhcmUoKSkge31cblxuICBwdWJsaWMgZ2V0IG91dHB1dCgpOiBPYnNlcnZhYmxlPE91dFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5vYnNlcnZhYmxlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtaXQodmFsdWU6IE91dFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnN1YmplY3QgJiYgdGhpcy5zdWJqZWN0Lm5leHQodmFsdWUpO1xuICB9XG59XG4iXX0=